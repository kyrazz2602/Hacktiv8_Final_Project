document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const welcomeMessage = document.getElementById("welcome-message");
  const loadingOverlay = document.getElementById("loading-overlay");
  const themeToggle = document.getElementById("theme-toggle");
  const clearChatBtn = document.getElementById("clear-chat");
  const voiceButton = document.getElementById("voice-button");
  const sendButton = document.getElementById("send-button");
  const suggestionChips = document.querySelectorAll(".suggestion-chip");

  // State management
  let conversationHistory = [];
  let isDarkTheme = localStorage.getItem("theme") === "dark";
  let isRecording = false;
  let recognition = null;

  // Initialize the app
  initializeApp();

  function initializeApp() {
    // Set initial theme
    setTheme(isDarkTheme);

    // Initialize voice recognition
    initializeVoiceRecognition();

    // Add event listeners
    setupEventListeners();

    // Add entrance animation
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  }

  function setupEventListeners() {
    // Form submission
    chatForm.addEventListener("submit", handleFormSubmit);

    // Theme toggle
    themeToggle.addEventListener("click", toggleTheme);

    // Clear chat
    clearChatBtn.addEventListener("click", clearChat);

    // Voice button
    voiceButton.addEventListener("click", toggleVoiceRecording);

    // Suggestion chips
    suggestionChips.forEach((chip) => {
      chip.addEventListener("click", handleSuggestionClick);
    });

    // Input events
    userInput.addEventListener("input", handleInputChange);
    userInput.addEventListener("keydown", handleKeyDown);

    // Auto-resize input
    userInput.addEventListener("input", autoResizeInput);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    sendMessage(userMessage);
  }

  function handleSuggestionClick(e) {
    const suggestion = e.target.dataset.suggestion;
    if (suggestion) {
      sendMessage(suggestion);
    }
  }

  function handleInputChange() {
    const hasText = userInput.value.trim().length > 0;
    sendButton.disabled = !hasText;

    if (hasText) {
      sendButton.style.transform = "scale(1.05)";
    } else {
      sendButton.style.transform = "scale(1)";
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const userMessage = userInput.value.trim();
      if (userMessage) {
        sendMessage(userMessage);
      }
    }
  }

  function autoResizeInput() {
    userInput.style.height = "auto";
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
  }

  async function sendMessage(message) {
    // Hide welcome message and show chat
    if (welcomeMessage && !welcomeMessage.classList.contains("hidden")) {
      welcomeMessage.classList.add("fade-out");
      setTimeout(() => {
        welcomeMessage.classList.add("hidden");
        chatBox.classList.add("active");
      }, 300);
    }

    // Add user message to UI and history
    appendMessage("user", message);
    conversationHistory.push({ role: "user", content: message });
    userInput.value = "";
    userInput.style.height = "auto";
    sendButton.disabled = true;

    // Show loading state
    showLoading(true);
    const thinkingMessage = appendMessage("model", "Thinking...", "typing");

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server.");
      }

      const data = await response.json();
      const botResponse = data.response || "Sorry, no response received.";

      // Replace thinking message with actual response
      replaceMessage(thinkingMessage, botResponse);
      conversationHistory.push({ role: "model", content: botResponse });

      // Add typing animation to the response
      typeMessage(thinkingMessage, botResponse);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      replaceMessage(thinkingMessage, errorMessage);
      conversationHistory.push({ role: "model", content: errorMessage });
    } finally {
      showLoading(false);
    }
  }

  function appendMessage(role, content, className = "") {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", role);
    if (className) messageElement.classList.add(className);

    // Add timestamp
    const timestamp = document.createElement("div");
    timestamp.classList.add("message-timestamp");
    timestamp.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timestamp.style.fontSize = "0.75rem";
    timestamp.style.opacity = "0.7";
    timestamp.style.marginTop = "0.5rem";

    messageElement.textContent = content;
    messageElement.appendChild(timestamp);

    chatBox.appendChild(messageElement);
    scrollToBottom();

    return messageElement;
  }

  function replaceMessage(messageElement, newContent) {
    messageElement.classList.remove("typing");
    messageElement.textContent = newContent;

    // Add timestamp
    const timestamp = document.createElement("div");
    timestamp.classList.add("message-timestamp");
    timestamp.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timestamp.style.fontSize = "0.75rem";
    timestamp.style.opacity = "0.7";
    timestamp.style.marginTop = "0.5rem";

    messageElement.appendChild(timestamp);
  }

  function typeMessage(messageElement, content) {
    messageElement.textContent = "";
    let index = 0;

    function typeChar() {
      if (index < content.length) {
        messageElement.textContent += content.charAt(index);
        index++;
        setTimeout(typeChar, 20 + Math.random() * 30); // Random typing speed
      } else {
        // Add timestamp when typing is complete
        const timestamp = document.createElement("div");
        timestamp.classList.add("message-timestamp");
        timestamp.textContent = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timestamp.style.fontSize = "0.75rem";
        timestamp.style.opacity = "0.7";
        timestamp.style.marginTop = "0.5rem";
        messageElement.appendChild(timestamp);
      }
    }

    typeChar();
  }

  function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showLoading(show) {
    if (show) {
      loadingOverlay.classList.add("active");
    } else {
      loadingOverlay.classList.remove("active");
    }
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    setTheme(isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");

    // Animate theme toggle button
    const icon = themeToggle.querySelector("i");
    icon.style.transform = "rotate(180deg)";
    setTimeout(() => {
      icon.style.transform = "rotate(0deg)";
    }, 300);
  }

  function setTheme(isDark) {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    const icon = themeToggle.querySelector("i");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  }

  function clearChat() {
    // Animate clear button
    clearChatBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      clearChatBtn.style.transform = "scale(1)";
    }, 150);

    // Show confirmation dialog
    if (confirm("Are you sure you want to clear the chat?")) {
      // Clear chat with animation
      const messages = chatBox.querySelectorAll(".message");
      messages.forEach((message, index) => {
        setTimeout(() => {
          message.style.transform = "translateX(-100%)";
          message.style.opacity = "0";
          setTimeout(() => message.remove(), 300);
        }, index * 50);
      });

      // Reset state
      conversationHistory = [];

      // Show welcome message again
      setTimeout(() => {
        chatBox.classList.remove("active");
        welcomeMessage.classList.remove("hidden", "fade-out");
      }, messages.length * 50 + 300);
    }
  }

  function initializeVoiceRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        isRecording = true;
        voiceButton.style.background = "var(--accent-error)";
        voiceButton.style.color = "white";
        voiceButton.querySelector("i").className = "fas fa-stop";
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        handleInputChange();
      };

      recognition.onend = () => {
        isRecording = false;
        voiceButton.style.background = "var(--bg-secondary)";
        voiceButton.style.color = "var(--text-secondary)";
        voiceButton.querySelector("i").className = "fas fa-microphone";
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        isRecording = false;
        voiceButton.style.background = "var(--bg-secondary)";
        voiceButton.style.color = "var(--text-secondary)";
        voiceButton.querySelector("i").className = "fas fa-microphone";
      };
    } else {
      voiceButton.style.display = "none";
    }
  }

  function toggleVoiceRecording() {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }

  // Add some interactive animations
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".message");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      userInput.focus();
    }

    // Escape to clear input
    if (e.key === "Escape") {
      userInput.value = "";
      handleInputChange();
      userInput.blur();
    }
  });

  // Add smooth scroll behavior
  chatBox.addEventListener("scroll", () => {
    const isAtBottom =
      chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 10;
    if (isAtBottom) {
      chatBox.style.scrollBehavior = "smooth";
    }
  });

  // Add message hover effects
  chatBox.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("message")) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "var(--shadow-lg)";
    }
  });

  chatBox.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("message")) {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "none";
    }
  });

  // Initialize with focus on input
  setTimeout(() => {
    userInput.focus();
  }, 500);
});