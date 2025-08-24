// Configuration
const API_BASE_URL = "http://localhost:3000/api"; // Change to production URL when ready
const API_KEY_STORAGE_KEY = "beyondMeaningsApiKey";

// DOM Elements
let apiKeyInput;
let validateBtn;
let errorMessage;
let successMessage;
let setupForm;
let setupComplete;
let resetBtn;
let apiKeyStatus;

// Initialize popup
document.addEventListener("DOMContentLoaded", async () => {
  initializeElements();
  await checkExistingApiKey();
  setupEventListeners();
});

function initializeElements() {
  apiKeyInput = document.getElementById("api-key");
  validateBtn = document.getElementById("validate-btn");
  errorMessage = document.getElementById("error-message");
  successMessage = document.getElementById("success-message");
  setupForm = document.getElementById("setup-form");
  setupComplete = document.getElementById("setup-complete");
  resetBtn = document.getElementById("reset-btn");
  apiKeyStatus = document.querySelector(".api-key-status");
}

async function checkExistingApiKey() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: "get-api-key",
    });

    if (response && response.success && response.apiKey) {
      showSetupComplete();
      // Optionally validate the existing key in the background
      validateExistingKey(response.apiKey);
    }
  } catch (error) {
    console.error("Error checking existing API key:", error);
  }
}

async function validateExistingKey(apiKey) {
  try {
    const response = await chrome.runtime.sendMessage({
      action: "validate-api-key",
      apiKey: apiKey,
    });

    if (response && response.success && response.valid) {
      updateApiKeyStatus("valid", "API key is valid");
    } else {
      updateApiKeyStatus("invalid", "API key may be invalid");
    }
  } catch (error) {
    console.error("Error validating existing key:", error);
    updateApiKeyStatus("invalid", "Unable to validate API key");
  }
}

function updateApiKeyStatus(status, message) {
  if (!apiKeyStatus) return;

  const statusDot = apiKeyStatus.querySelector(".status-dot");
  const statusText = apiKeyStatus.querySelector("span");

  if (statusDot && statusText) {
    statusDot.className = `status-dot ${status}`;
    statusText.textContent = message;
    apiKeyStatus.style.display = "flex";
  }
}

function setupEventListeners() {
  validateBtn.addEventListener("click", handleValidateClick);
  resetBtn.addEventListener("click", handleResetClick);

  // Allow Enter key to trigger validation
  apiKeyInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !validateBtn.disabled) {
      handleValidateClick();
    }
  });

  // Clear messages when typing
  apiKeyInput.addEventListener("input", () => {
    hideMessages();
    validateApiKeyFormat();
  });

  // Auto-focus API key input
  if (apiKeyInput && setupForm.style.display !== "none") {
    apiKeyInput.focus();
  }
}

function validateApiKeyFormat() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    validateBtn.disabled = true;
    return;
  }

  if (apiKey.length < 20) {
    validateBtn.disabled = true;
    return;
  }

  if (!apiKey.startsWith("beyond-")) {
    showError('API key must start with "beyond-"');
    validateBtn.disabled = true;
    return;
  }

  validateBtn.disabled = false;
  hideMessages();
}

async function handleValidateClick() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showError("Please enter an API key");
    apiKeyInput.focus();
    return;
  }

  if (!apiKey.startsWith("beyond-")) {
    showError('API key must start with "beyond-"');
    apiKeyInput.focus();
    return;
  }

  if (apiKey.length < 20) {
    showError("API key appears to be too short");
    apiKeyInput.focus();
    return;
  }

  await validateApiKey(apiKey);
}

async function validateApiKey(apiKey) {
  setLoading(true);
  hideMessages();
  updateApiKeyStatus("checking", "Validating API key...");

  try {
    const response = await chrome.runtime.sendMessage({
      action: "validate-api-key",
      apiKey: apiKey,
    });

    if (response && response.success) {
      if (response.valid) {
        // Save the validated API key
        const saveResponse = await chrome.runtime.sendMessage({
          action: "save-api-key",
          apiKey: apiKey,
        });

        if (saveResponse && saveResponse.success) {
          updateApiKeyStatus("valid", "API key validated and saved");
          showSuccess("API key validated successfully!");
          setTimeout(() => {
            showSetupComplete();
          }, 1500);
        } else {
          updateApiKeyStatus("invalid", "Failed to save API key");
          showError("Failed to save API key. Please try again.");
        }
      } else {
        updateApiKeyStatus("invalid", "Invalid API key");
        showError("Invalid API key. Please check and try again.");
      }
    } else {
      updateApiKeyStatus("invalid", "Validation failed");
      showError(
        response?.error || "Failed to validate API key. Please try again.",
      );
    }
  } catch (error) {
    console.error("API validation error:", error);
    updateApiKeyStatus("invalid", "Validation error");

    if (error.message.includes("Extension context invalidated")) {
      showError(
        "Extension was reloaded. Please close this popup and try again.",
      );
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      showError(
        "Unable to connect to the server. Please check your internet connection.",
      );
    } else {
      showError(
        "An error occurred while validating the API key. Please try again.",
      );
    }
  } finally {
    setLoading(false);
  }
}

async function handleResetClick() {
  try {
    await chrome.storage.local.remove([API_KEY_STORAGE_KEY]);
    showSetupForm();
    apiKeyInput.value = "";
    hideMessages();
    updateApiKeyStatus("", "");
    apiKeyInput.focus();
  } catch (error) {
    console.error("Error resetting API key:", error);
    showError("Failed to reset API key. Please try again.");
  }
}

function showSetupForm() {
  setupForm.style.display = "block";
  setupComplete.style.display = "none";
  // Auto-focus the input when showing the form
  setTimeout(() => {
    if (apiKeyInput) {
      apiKeyInput.focus();
    }
  }, 100);
}

function showSetupComplete() {
  setupForm.style.display = "none";
  setupComplete.style.display = "block";
}

function setLoading(loading) {
  validateBtn.disabled = loading;
  apiKeyInput.disabled = loading;

  const btnText = validateBtn.querySelector(".btn-text");
  const spinner = validateBtn.querySelector(".loading-spinner");

  if (loading) {
    if (btnText) btnText.style.display = "none";
    if (spinner) spinner.style.display = "inline-block";
    validateBtn.style.cursor = "not-allowed";
  } else {
    if (btnText) btnText.style.display = "inline-block";
    if (spinner) spinner.style.display = "none";
    validateBtn.style.cursor = "pointer";
    // Re-validate format after loading
    validateApiKeyFormat();
  }
}

function showError(message) {
  hideMessages();
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    // Add shake animation for better UX
    errorMessage.style.animation = "none";
    setTimeout(() => {
      errorMessage.style.animation = "shake 0.5s ease-in-out";
    }, 10);
  }

  // Add error styling to input
  if (apiKeyInput) {
    apiKeyInput.style.borderColor = "var(--destructive)";
    setTimeout(() => {
      apiKeyInput.style.borderColor = "";
    }, 3000);
  }
}

function showSuccess(message) {
  hideMessages();
  if (successMessage) {
    successMessage.textContent = message;
    successMessage.style.display = "block";
  }

  // Add success styling to input
  if (apiKeyInput) {
    apiKeyInput.style.borderColor = "var(--primary)";
    setTimeout(() => {
      apiKeyInput.style.borderColor = "";
    }, 2000);
  }
}

function hideMessages() {
  if (errorMessage) {
    errorMessage.style.display = "none";
  }
  if (successMessage) {
    successMessage.style.display = "none";
  }
}

// Add CSS for shake animation
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(style);

// Handle extension errors gracefully
window.addEventListener("error", (event) => {
  console.error("Popup error:", event.error);
  if (event.error?.message?.includes("Extension context invalidated")) {
    showError("Extension was reloaded. Please close this popup and try again.");
  }
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  if (event.reason?.message?.includes("Extension context invalidated")) {
    showError("Extension was reloaded. Please close this popup and try again.");
    event.preventDefault();
  }
});
