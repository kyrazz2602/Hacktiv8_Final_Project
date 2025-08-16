class ChatApp {
  constructor() {
    this.chatForm = document.getElementById('chat-form');
    this.userInput = document.getElementById('user-input');
    this.chatBox = document.getElementById('chat-box');
    this.sendButton = document.querySelector('#chat-form button');
    
    this.conversationHistory = [];
    this.isLoading = false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.addWelcomeMessage();
    this.focusInput();
  }

  setupEventListeners() {
    // Form submission
    this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Input events for better UX
    this.userInput.addEventListener('input', () => this.handleInputChange());
    this.userInput.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Auto-resize input (if textarea)
    if (this.userInput.tagName === 'TEXTAREA') {
      this.userInput.addEventListener('input', () => this.autoResize());
    }
  }

  addWelcomeMessage() {
    const welcomeMessage = {
      role: 'model',
      content: 'Hello! I\'m your AI assistant. How can I help you today? You can ask me anything or request a poem!'
    };
    this.appendMessage(welcomeMessage.role, welcomeMessage.content);
    this.conversationHistory.push(welcomeMessage);
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const userMessage = this.userInput.value.trim();
    if (!userMessage) return;

    // Add user message
    this.appendMessage('user', userMessage);
    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    // Clear input and update UI
    this.userInput.value = '';
    this.handleInputChange();
    this.setLoadingState(true);

    // Show typing indicator
    const typingIndicator = this.appendTypingIndicator();

    try {
      const response = await this.sendMessage(userMessage);
      
      // Remove typing indicator and add response
      this.removeTypingIndicator(typingIndicator);
      this.appendMessage('model', response);
      this.conversationHistory.push({ role: 'model', content: response });

    } catch (error) {
      console.error('Chat error:', error);
      
      // Remove typing indicator and show error
      this.removeTypingIndicator(typingIndicator);
      const errorMessage = this.getErrorMessage(error);
      this.appendMessage('model', errorMessage, 'error');
      this.conversationHistory.push({ role: 'model', content: errorMessage });
    } finally {
      this.setLoadingState(false);
      this.focusInput();
    }
  }

  async sendMessage(message) {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: this.conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || 'Sorry, no response received.';
  }

  appendMessage(role, content, type = 'normal') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role, type);
    
    // Sanitize content and handle line breaks
    const sanitizedContent = this.sanitizeContent(content);
    messageElement.innerHTML = sanitizedContent;
    
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString();
    messageElement.appendChild(timestamp);
    
    this.chatBox.appendChild(messageElement);
    this.scrollToBottom();
    
    // Add animation
    setTimeout(() => messageElement.classList.add('visible'), 10);
    
    return messageElement;
  }

  appendTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'model', 'typing-indicator');
    typingElement.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="timestamp">${new Date().toLocaleTimeString()}</div>
    `;
    
    this.chatBox.appendChild(typingElement);
    this.scrollToBottom();
    
    return typingElement;
  }

  removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.remove();
    }
  }

  sanitizeContent(content) {
    // Basic XSS protection
    const div = document.createElement('div');
    div.textContent = content;
    
    // Convert line breaks to <br> tags
    return div.innerHTML.replace(/\n/g, '<br>');
  }

  getErrorMessage(error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment before sending another message.';
    }
    
    if (error.message.includes('429')) {
      return 'Rate limit exceeded. Please try again in a few minutes.';
    }
    
    return 'Sorry, something went wrong. Please try again.';
  }

  handleInputChange() {
    const hasText = this.userInput.value.trim().length > 0;
    this.sendButton.disabled = !hasText || this.isLoading;
    this.sendButton.classList.toggle('disabled', !hasText || this.isLoading);
  }

  handleKeydown(e) {
    // Allow Enter to submit, but Shift+Enter for new line if it's a textarea
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.chatForm.dispatchEvent(new Event('submit'));
    }
  }

  autoResize() {
    this.userInput.style.height = 'auto';
    this.userInput.style.height = Math.min(this.userInput.scrollHeight, 120) + 'px';
  }

  setLoadingState(loading) {
    this.isLoading = loading;
    this.sendButton.disabled = loading;
    this.userInput.disabled = loading;
    
    if (loading) {
      this.sendButton.innerHTML = '<span class="spinner"></span> Sending...';
    } else {
      this.sendButton.innerHTML = 'Send';
    }
  }

  focusInput() {
    this.userInput.focus();
  }

  scrollToBottom() {
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  // Utility methods
  clearChat() {
    this.chatBox.innerHTML = '';
    this.conversationHistory = [];
    this.addWelcomeMessage();
  }

  exportChat() {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: this.conversationHistory
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const chatApp = new ChatApp();
  
  // Expose app instance globally for debugging
  window.chatApp = chatApp;
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      chatApp.chatForm.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      chatApp.focusInput();
    }
  });
});
