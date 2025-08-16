# Gemini AI Chatbot

A modern, feature-rich AI chatbot powered by Google Gemini with a beautiful, responsive interface.

## ✨ Features

- 🤖 **AI-Powered Conversations**: Powered by Google Gemini 2.5 Flash Lite
- 💬 **Real-time Chat**: Smooth, responsive chat interface with typing indicators
- 🎨 **Modern UI**: Beautiful gradient design with animations and dark mode support
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🔒 **Security**: Rate limiting, input validation, and XSS protection
- ⚡ **Performance**: Optimized for speed with efficient error handling
- 🌙 **Dark Mode**: Automatic dark mode detection and support

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gemini-ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## 🏗️ Project Structure

```
Final_Project/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── README.md            # Project documentation
├── public/              # Static files
│   ├── index.html       # Main HTML file
│   ├── script.js        # Frontend JavaScript
│   └── style.css        # Styles and animations
└── .env                 # Environment variables (create this)
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Required |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /chat` - Chat endpoint for AI conversations
- `GET /` - Main application interface

## 🎯 Usage

### Basic Chat
Simply type your message and press Enter to start a conversation with the AI.

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line (if using textarea)
- `Ctrl/Cmd + Enter` - Send message
- `Ctrl/Cmd + K` - Focus input field

### Features
- **Welcome Message**: The AI greets you when you first load the app
- **Typing Indicators**: See when the AI is thinking
- **Error Handling**: Graceful error messages for various scenarios
- **Message History**: Full conversation history maintained during session
- **Timestamps**: Each message shows when it was sent

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation of all inputs
- **XSS Protection**: Content sanitization for user messages
- **CORS Configuration**: Secure cross-origin resource sharing
- **Error Handling**: Safe error messages that don't expose sensitive information

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Adapts to any screen size
- **Dark Mode**: Automatic detection and support
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Loading States**: Visual feedback during API calls
- **Smooth Scrolling**: Auto-scroll to latest messages

## 🚀 Deployment

### Heroku
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
   ```bash
   git push heroku main
   ```

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
docker build -t gemini-chatbot .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key gemini-chatbot
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the AI capabilities
- [Express.js](https://expressjs.com/) for the web framework
- [Hacktiv8](https://hacktiv8.com/) for the learning platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/gemini-ai-chatbot/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ by [Your Name]
