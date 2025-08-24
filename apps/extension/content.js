// Content Script for Beyond Meanings Extension
// Handles text selection detection and floating popup management

let floatingPopup = null;
let selectedText = "";
let selectionPosition = null;
let isPopupVisible = false;
let apiKey = null;
let currentResearchId = null;
let pollingInterval = null;

// Initialize content script
(function initialize() {
  console.log("Beyond Meanings content script loaded");

  // Get API key from storage
  getApiKey();

  // Set up event listeners
  setupEventListeners();

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(handleMessage);
})();

function setupEventListeners() {
  // Listen for text selection
  document.addEventListener("mouseup", handleTextSelection);
  document.addEventListener("keyup", handleTextSelection);

  // Hide popup when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (floatingPopup && !floatingPopup.contains(e.target)) {
      hideFloatingPopup();
    }
  });

  // Hide popup on scroll
  document.addEventListener("scroll", () => {
    if (isPopupVisible) {
      hideFloatingPopup();
    }
  });

  // Hide popup on window resize
  window.addEventListener("resize", () => {
    if (isPopupVisible) {
      hideFloatingPopup();
    }
  });

  // Hide popup on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPopupVisible) {
      hideFloatingPopup();
    }
  });
}

async function getApiKey() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: "get-api-key",
    });

    if (response && response.success) {
      apiKey = response.apiKey;
    }
  } catch (error) {
    console.error("Error getting API key:", error);
  }
}

function handleMessage(message, sender, sendResponse) {
  console.log("Content script received message:", message);

  switch (message.action) {
    case "trigger-lookup":
      handleTriggerLookup(message);
      break;

    default:
      console.warn("Unknown message action:", message.action);
  }
}

function handleTextSelection(e) {
  // Don't interfere if popup is already visible
  if (isPopupVisible) {
    return;
  }

  const selection = window.getSelection();
  const text = selection.toString().trim();

  if (text && text.length > 2) {
    selectedText = text;
    selectionPosition = getSelectionPosition(selection);
  } else {
    selectedText = "";
    selectionPosition = null;
  }
}

function getSelectionPosition(selection) {
  if (selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

async function handleTriggerLookup(message) {
  // Update API key if provided in message
  if (message.apiKey) {
    apiKey = message.apiKey;
  }

  // Check if we have an API key
  if (!apiKey) {
    showNotification(
      "Please set up your API key first by clicking the extension icon.",
      "error",
    );
    return;
  }

  // Check if we have selected text
  if (!selectedText) {
    showNotification(
      "Please select some text first, then press Ctrl+I.",
      "error",
    );
    return;
  }

  // Show popup with loading state
  showFloatingPopup(selectedText, { loading: true });

  // Start the lookup process
  try {
    await startResearchLookup(selectedText);
  } catch (error) {
    console.error("Error in lookup process:", error);
    showError("Failed to start research. Please try again.");
    hideFloatingPopup();
  }
}

async function startResearchLookup(text) {
  try {
    // Step 1: Start the lookup request
    const lookupResponse = await chrome.runtime.sendMessage({
      action: "lookup-text",
      text: text,
      apiKey: apiKey,
    });

    if (!lookupResponse.success) {
      if (lookupResponse.needsApiKeyUpdate) {
        showNotification(
          "API key is invalid. Please update it by clicking the extension icon.",
          "error",
        );
        hideFloatingPopup();
        return;
      } else {
        showError(lookupResponse.error || "Failed to start research");
        hideFloatingPopup();
        return;
      }
    }

    currentResearchId = lookupResponse.data.research_id;
    console.log("Research started with ID:", currentResearchId);

    // Update popup to show processing state
    updateFloatingPopupProcessing({
      research_id: currentResearchId,
      status: "PROCESSING",
    });

    // Step 2: Start polling for status
    startStatusPolling();
  } catch (error) {
    console.error("Error in startResearchLookup:", error);
    showError("Network error. Please try again.");
    hideFloatingPopup();
  }
}

function startStatusPolling() {
  if (!currentResearchId) {
    console.error("No research ID available for polling");
    return;
  }

  let attemptCount = 0;
  const maxAttempts = 60; // 60 seconds max
  const pollInterval = 3000; // 2 seconds

  pollingInterval = setInterval(async () => {
    attemptCount++;
    console.log(
      `Polling attempt ${attemptCount}/${maxAttempts} for research ID: ${currentResearchId}`,
    );

    try {
      const statusResponse = await chrome.runtime.sendMessage({
        action: "check-status",
        research_id: currentResearchId,
        apiKey: apiKey,
      });

      if (!statusResponse.success) {
        console.error("Status check failed:", statusResponse.error);
        if (attemptCount >= maxAttempts) {
          stopPolling();
          showError("Research timeout. Please try again.");
          hideFloatingPopup();
        }
        return;
      }

      const jobStatus = statusResponse.data?.job_status;
      console.log("Job status:", jobStatus);

      switch (jobStatus) {
        case "COMPLETED":
          stopPolling();
          handleResearchCompleted(statusResponse.data);
          break;

        case "FAILED":
          stopPolling();
          showError("Research failed. Please try again.");
          hideFloatingPopup();
          break;

        case "PROCESSING":
          // Continue polling
          if (attemptCount >= maxAttempts) {
            stopPolling();
            showError("Research timeout. Please try again.");
            hideFloatingPopup();
          }
          break;

        default:
          console.warn("Unknown job status:", jobStatus);
          if (attemptCount >= maxAttempts) {
            stopPolling();
            showError("Unknown research status. Please try again.");
            hideFloatingPopup();
          }
          break;
      }
    } catch (error) {
      console.error("Error during status polling:", error);
      if (attemptCount >= maxAttempts) {
        stopPolling();
        showError("Network error during research. Please try again.");
        hideFloatingPopup();
      }
    }
  }, pollInterval);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

function handleResearchCompleted(data) {
  console.log("Research completed:", data);

  if (!data || !data.data || !data.data.content) {
    showError("Research completed but no data received");
    hideFloatingPopup();
    return;
  }

  const researchData = data.data;
  const content = researchData.content;

  // Filter out tabs with no meaningful content
  const validTabs = (content.tabs || []).filter(
    (tab) =>
      tab &&
      tab.content &&
      tab.content.trim() &&
      !tab.content.includes("No relevant") &&
      !tab.content.includes("not found") &&
      !tab.content.includes("Client error"),
  );

  // Update popup with completed research data
  updateFloatingPopup({
    status: "COMPLETED",
    research_id: currentResearchId,
    query: content.query || researchData.query || selectedText,
    tabs: validTabs,
    primary_summary: content.primary_summary || "",
    tools_used: content.tools_used || [],
  });
}

function showFloatingPopup(text, data = {}) {
  hideFloatingPopup();

  if (!selectionPosition) {
    showError("Could not determine text position");
    return;
  }

  // Create popup container
  floatingPopup = document.createElement("div");
  floatingPopup.id = "beyond-meanings-popup";
  floatingPopup.className = "beyond-meanings-popup";

  // Position popup
  positionPopup();

  // Create popup content
  if (data.loading) {
    floatingPopup.innerHTML = createLoadingContent(text);
  } else {
    floatingPopup.innerHTML = createPopupContent(text, data);
  }

  // Add popup to page
  document.body.appendChild(floatingPopup);
  isPopupVisible = true;

  // Add event listeners
  addPopupEventListeners();

  // Animate in
  requestAnimationFrame(() => {
    floatingPopup.classList.add("visible");
  });
}

function positionPopup() {
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  let left = selectionPosition.x + scrollX - 210; // Center popup on selection
  let top = selectionPosition.y + scrollY - 20; // Position above selection

  // Adjust position to stay within viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const popupWidth = 420;
  const popupHeight = 400;

  // Horizontal positioning
  if (left < 10) left = 10;
  if (left + popupWidth > viewportWidth - 10)
    left = viewportWidth - popupWidth - 10;

  // Vertical positioning
  let positionBelow = false;
  if (top < scrollY + 10) {
    // Position below selection if there's no room above
    top = selectionPosition.y + selectionPosition.height + scrollY + 15;
    positionBelow = true;
  }

  if (top + popupHeight > scrollY + viewportHeight - 10) {
    if (!positionBelow) {
      top = scrollY + viewportHeight - popupHeight - 10;
    } else {
      // If positioning below would also overflow, position above anyway
      top = selectionPosition.y + scrollY - popupHeight - 15;
      positionBelow = false;
    }
  }

  floatingPopup.style.left = `${left}px`;
  floatingPopup.style.top = `${top}px`;

  // Add class for arrow positioning
  if (positionBelow) {
    floatingPopup.classList.add("position-below");
  }
}

function updateFloatingPopup(data) {
  if (!floatingPopup) return;

  floatingPopup.innerHTML = createPopupContent(selectedText, data);
  addPopupEventListeners();
}

function updateFloatingPopupProcessing(data) {
  if (!floatingPopup) return;

  floatingPopup.innerHTML = createProcessingContent(selectedText, data);
  addPopupEventListeners();
}

function addPopupEventListeners() {
  if (!floatingPopup) return;

  // Close button
  const closeBtn = floatingPopup.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", hideFloatingPopup);
  }

  // Tab buttons
  const tabBtns = floatingPopup.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.target.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  if (!floatingPopup) return;

  // Remove active class from all tabs and panels
  floatingPopup
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  floatingPopup
    .querySelectorAll(".tab-panel")
    .forEach((panel) => panel.classList.remove("active"));

  // Add active class to selected tab and panel
  const activeBtn = floatingPopup.querySelector(`[data-tab="${tabId}"]`);
  const activePanel = floatingPopup.querySelector(`#${tabId}`);

  if (activeBtn) activeBtn.classList.add("active");
  if (activePanel) activePanel.classList.add("active");
}

function hideFloatingPopup() {
  // Stop any ongoing polling
  stopPolling();

  if (floatingPopup) {
    floatingPopup.classList.remove("visible");
    setTimeout(() => {
      if (floatingPopup && floatingPopup.parentNode) {
        floatingPopup.parentNode.removeChild(floatingPopup);
      }
      floatingPopup = null;
      isPopupVisible = false;
      currentResearchId = null;
    }, 200);
  }
}

function createLoadingContent(text) {
  return `
        <div class="popup-header">
            <div class="popup-title">
                Beyond Meanings
            </div>
            <button class="close-btn" type="button" aria-label="Close">×</button>
        </div>
        <div class="popup-body">
            <div class="selected-text">
                ${escapeHtml(text.substring(0, 150))}${text.length > 150 ? "..." : ""}
            </div>
            <div class="loading-message">
                <div class="loading-spinner">⟳</div>
                <div class="loading-text">Initializing research...</div>
                <div class="loading-subtext">This may take a few moments</div>
            </div>
        </div>
    `;
}

function createProcessingContent(text, data) {
  return `
        <div class="popup-header">
            <div class="popup-title">
                Beyond Meanings
            </div>
            <button class="close-btn" type="button" aria-label="Close">×</button>
        </div>
        <div class="popup-body">
            <div class="selected-text">
                ${escapeHtml(text.substring(0, 150))}${text.length > 150 ? "..." : ""}
            </div>
            <div class="status-indicator">
                <div class="status-dot processing"></div>
                <span>Research in progress...</span>
            </div>
            <div class="loading-message">
                <div class="loading-spinner">⟳</div>
                <div class="loading-text">Analyzing and gathering information</div>
                <div class="loading-subtext">Research ID: ${data.research_id || "Unknown"}</div>
            </div>
        </div>
    `;
}

function createPopupContent(text, data) {
  if (!data || (!data.tabs && !data.content)) {
    return createErrorContent("No data received");
  }

  const tabs = data.tabs || data.content?.tabs || [];
  const primarySummary =
    data.primary_summary || data.content?.primary_summary || "";
  const toolsUsed = data.tools_used || data.content?.tools_used || [];
  const query = data.query || data.content?.query || text;

  let tabsHtml = "";
  let panelsHtml = "";

  if (tabs && tabs.length > 0) {
    tabs.forEach((tab, index) => {
      const active = index === 0 ? "active" : "";
      const tabId = `tab-${index}`;

      tabsHtml += `
                <button class="tab-btn ${active}" data-tab="${tabId}">
                    ${escapeHtml(tab.title)}
                </button>
            `;

      // Handle content formatting - check if it's markdown or plain text
      let contentHtml = "";
      if (!tab.content || tab.content.trim() === "") {
        contentHtml = `<p class="no-content">No content available for this source</p>`;
      } else if (tab.content.includes("**") && tab.content.includes("\n")) {
        // Handle markdown-like content by converting basic formatting
        contentHtml = formatMarkdownContent(tab.content);
      } else {
        contentHtml = `<p>${escapeHtml(tab.content)}</p>`;
      }

      panelsHtml += `
                <div class="tab-panel ${active}" id="${tabId}">
                    <div class="section-header">
                        <span class="section-title">${escapeHtml(tab.title)}</span>
                        <span class="section-source">${escapeHtml(tab.source)}</span>
                    </div>
                    <div class="section-body">
                        ${contentHtml}
                    </div>
                </div>
            `;
    });
  } else {
    tabsHtml = "";
    panelsHtml =
      '<div class="no-content">No detailed information available from external sources</div>';
  }

  let primarySummaryHtml = "";
  if (primarySummary) {
    primarySummaryHtml = `
            <div class="primary-summary">
                <h3>Summary</h3>
                <p>${escapeHtml(primarySummary)}</p>
            </div>
        `;
  }

  let toolsUsedHtml = "";
  if (toolsUsed && toolsUsed.length > 0) {
    const toolTags = toolsUsed
      .map(
        (tool) =>
          `<span class="tool-tag">${escapeHtml(tool.replace(/_/g, " ").replace(" Tool", ""))}</span>`,
      )
      .join("");

    toolsUsedHtml = `
            <div class="tools-used">
                <h4>Sources Consulted</h4>
                <div class="tools-list">
                    ${toolTags}
                </div>
            </div>
        `;
  }

  return `
        <div class="popup-header">
            <div class="popup-title">
                Beyond Meanings
            </div>
            <button class="close-btn" type="button" aria-label="Close">×</button>
        </div>
        <div class="popup-body">
            <div class="selected-text">
                ${escapeHtml(text)}
            </div>
            <div class="status-indicator">
                <div class="status-dot completed"></div>
                <span>Research completed</span>
            </div>
            ${primarySummaryHtml}
            ${
              tabs.length > 0
                ? `
                <div class="tabs">
                    ${tabsHtml}
                </div>
                <div class="tab-panels">
                    ${panelsHtml}
                </div>
            `
                : `<div class="no-content">No detailed information available from external sources</div>`
            }
            ${toolsUsedHtml}
        </div>
    `;
}

function createErrorContent(error) {
  return `
        <div class="popup-header">
            <div class="popup-title error">
                <div class="popup-logo">!</div>
                Error
            </div>
            <button class="close-btn" type="button" aria-label="Close">×</button>
        </div>
        <div class="popup-body">
            <div class="error-message">
                ${escapeHtml(error)}
            </div>
        </div>
    `;
}

function showError(message) {
  showNotification(message, "error");
}

function showNotification(message, type = "error") {
  // Remove existing notifications
  const existing = document.querySelectorAll(".beyond-meanings-notification");
  existing.forEach((el) => el.remove());

  // Create new notification
  const notification = document.createElement("div");
  notification.className = `beyond-meanings-notification ${type}`;
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  // Auto-remove after delay
  setTimeout(
    () => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    },
    type === "error" ? 5000 : 3000,
  );
}

function formatMarkdownContent(content) {
  if (!content || content.trim() === "")
    return "<p class='no-content'>No content available</p>";

  // Convert basic markdown formatting to HTML
  let html = escapeHtml(content);

  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert links [text](url) to <a> tags
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  // Handle numbered lists and bullet points
  const lines = html.split("\n");
  let formattedLines = [];
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      if (inList) {
        formattedLines.push("</ul>");
        inList = false;
      }
      formattedLines.push("");
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.match(/^\d+\.\s/)) {
      if (!inList) {
        formattedLines.push("<ul>");
        inList = true;
      }
      const content = trimmed.replace(/^- |^\d+\.\s*/, "");
      formattedLines.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        formattedLines.push("</ul>");
        inList = false;
      }
      if (trimmed) {
        formattedLines.push(`<p>${trimmed}</p>`);
      }
    }
  }

  if (inList) {
    formattedLines.push("</ul>");
  }

  const result = formattedLines.join("");
  return result || "<p class='no-content'>No content available</p>";
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
