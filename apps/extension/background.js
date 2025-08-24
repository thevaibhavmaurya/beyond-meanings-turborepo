// Background Service Worker for Beyond Meanings Extension

const API_BASE_URL = "http://localhost:3000/api";
const API_KEY_STORAGE_KEY = "beyondMeaningsApiKey";

// Install event - setup initial state
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Beyond Meanings extension installed:", details.reason);
});

// Handle keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "trigger-lookup") {
    console.log("Trigger lookup command received");

    try {
      // Get the active tab
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!activeTab) {
        console.error("No active tab found");
        return;
      }

      // Check if we have a valid API key
      const result = await chrome.storage.local.get([API_KEY_STORAGE_KEY]);
      const apiKey = result[API_KEY_STORAGE_KEY];

      if (!apiKey) {
        // Open popup to set up API key
        chrome.action.openPopup();
        return;
      }

      // Send message to content script to handle the lookup
      chrome.tabs
        .sendMessage(activeTab.id, {
          action: "trigger-lookup",
          apiKey: apiKey,
        })
        .catch((error) => {
          console.error("Error sending message to content script:", error);
          // Try to inject content script if it's not already injected
          injectContentScript(activeTab.id);
        });
    } catch (error) {
      console.error("Error in trigger-lookup command:", error);
    }
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  switch (message.action) {
    case "lookup-text":
      handleLookupRequest(message, sendResponse);
      return true; // Keep the message channel open for async response

    case "get-api-key":
      handleGetApiKey(sendResponse);
      return true;

    case "validate-api-key":
      handleValidateApiKey(message.apiKey, sendResponse);
      return true;

    case "save-api-key":
      handleSaveApiKey(message.apiKey, sendResponse);
      return true;

    case "check-status":
      handleStatusCheck(message, sendResponse);
      return true;

    default:
      console.warn("Unknown message action:", message.action);
  }
});

// Inject content script into tab if not already injected
async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });

    await chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ["floating-popup.css"],
    });

    console.log("Content script injected successfully");

    // Retry sending the message after injection
    setTimeout(() => {
      chrome.tabs
        .sendMessage(tabId, {
          action: "trigger-lookup",
        })
        .catch((error) => {
          console.error("Error sending message after injection:", error);
        });
    }, 100);
  } catch (error) {
    console.error("Error injecting content script:", error);
  }
}

// Handle lookup request from content script
async function handleLookupRequest(message, sendResponse) {
  const { text, apiKey } = message;

  if (!text || !apiKey) {
    sendResponse({
      success: false,
      error: "Missing text or API key",
    });
    return;
  }

  try {
    // Make initial lookup request
    const lookupResponse = await fetch(`${API_BASE_URL}/research/lookup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        query: text,
      }),
    });

    const data = await lookupResponse.json();
    console.log("Lookup response:", data);

    if (!lookupResponse.ok) {
      if (lookupResponse.status === 401 || lookupResponse.status === 403) {
        sendResponse({
          success: false,
          error: "Invalid API key. Please update your API key.",
          needsApiKeyUpdate: true,
        });
        return;
      }

      const errorText = await lookupResponse.text();
      sendResponse({
        success: false,
        error: `API request failed: ${lookupResponse.status} ${lookupResponse.statusText}`,
        details: errorText,
      });
      return;
    }

    const lookupData = await lookupResponse.json();
    console.log("Lookup response:", lookupData);

    if (!lookupData.success || !lookupData.data?.research_id) {
      sendResponse({
        success: false,
        error: "Invalid response from lookup API",
        details: lookupData,
      });
      return;
    }

    // Return the research ID immediately
    sendResponse({
      success: true,
      data: {
        research_id: lookupData.data.research_id,
        status: lookupData.data.status || "PROCESSING",
      },
    });
  } catch (error) {
    console.error("Error in lookup request:", error);
    sendResponse({
      success: false,
      error: "Network error or server unavailable",
      details: error.message,
    });
  }
}

// Handle status check request
async function handleStatusCheck(message, sendResponse) {
  const { research_id, apiKey } = message;

  if (!research_id || !apiKey) {
    sendResponse({
      success: false,
      error: "Missing research ID or API key",
    });
    return;
  }

  try {
    const statusResponse = await fetch(
      `${API_BASE_URL}/research/status?research_id=${research_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      },
    );

    if (!statusResponse.ok) {
      if (statusResponse.status === 401 || statusResponse.status === 403) {
        sendResponse({
          success: false,
          error: "Invalid API key during status check",
          needsApiKeyUpdate: true,
        });
        return;
      }

      const errorText = await statusResponse.text();
      sendResponse({
        success: false,
        error: `Status check failed: ${statusResponse.status} ${statusResponse.statusText}`,
        details: errorText,
      });
      return;
    }

    const statusData = await statusResponse.json();
    console.log("Status check response:", statusData);

    if (!statusData.success) {
      sendResponse({
        success: false,
        error: "Failed to get research status",
        details: statusData,
      });
      return;
    }

    sendResponse({
      success: true,
      data: statusData.data,
    });
  } catch (error) {
    console.error("Error in status check:", error);
    sendResponse({
      success: false,
      error: "Network error during status check",
      details: error.message,
    });
  }
}

// Handle get API key request
async function handleGetApiKey(sendResponse) {
  try {
    const result = await chrome.storage.local.get([API_KEY_STORAGE_KEY]);
    sendResponse({
      success: true,
      apiKey: result[API_KEY_STORAGE_KEY] || null,
    });
  } catch (error) {
    console.error("Error getting API key:", error);
    sendResponse({
      success: false,
      error: "Failed to retrieve API key",
    });
  }
}

// Handle save API key request
async function handleSaveApiKey(apiKey, sendResponse) {
  try {
    await chrome.storage.local.set({ [API_KEY_STORAGE_KEY]: apiKey });
    sendResponse({
      success: true,
    });
  } catch (error) {
    console.error("Error saving API key:", error);
    sendResponse({
      success: false,
      error: "Failed to save API key",
    });
  }
}

// Handle API key validation request
async function handleValidateApiKey(apiKey, sendResponse) {
  if (!apiKey) {
    sendResponse({
      success: false,
      error: "No API key provided",
    });
    return;
  }

  try {
    // Use a simple endpoint to validate the API key
    const response = await fetch(`${API_BASE_URL}/api-key/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });

    if (response.ok) {
      const data = await response.json();
      sendResponse({
        success: true,
        valid: true,
        message: "API key is valid",
      });
    } else if (response.status === 401 || response.status === 403) {
      sendResponse({
        success: true,
        valid: false,
        message: "Invalid API key",
      });
    } else {
      // Other errors might indicate server issues, not invalid key
      const errorText = await response.text();
      sendResponse({
        success: false,
        error: `Validation failed: ${response.status} ${response.statusText}`,
        details: errorText,
      });
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    sendResponse({
      success: false,
      error: "Network error during validation",
      details: error.message,
    });
  }
}

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Beyond Meanings extension started");
});

// Handle tab updates (optional - for future features)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Could be used to re-inject content scripts if needed
  if (changeInfo.status === "complete") {
    // Tab finished loading
  }
});

// Cleanup on suspend
chrome.runtime.onSuspend.addListener(() => {
  console.log("Beyond Meanings extension suspending");
});
