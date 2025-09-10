# 🤖 Gemini AI Chatbot

Sebuah aplikasi chatbot modern dan elegan yang menggunakan Google Gemini AI untuk memberikan respons yang cerdas dan bermanfaat. Aplikasi ini dibangun dengan Node.js, Express, dan Google Generative AI API dengan UI yang responsif dan user-friendly.

## 🖼️ Screenshots

### Dark Mode
![UI Dark Mode](UI%20Chatbot/Figure%20UI%20Dark%20Mode.png)

## 🚀 Fitur Utama

### 🎨 **Modern UI/UX**
- **Dark/Light Theme**: Toggle tema gelap dan terang dengan animasi smooth
- **Beautiful Animations**: Animasi yang halus dan menarik untuk semua interaksi
- **Gradient Backgrounds**: Desain modern dengan gradient yang eye-catching

### 💬 **Chat Experience**
- **Real-time Chat**: Interface chat yang responsif dan intuitif
- **Typing Indicators**: Indikator saat AI sedang "berpikir"
- **Suggestion Chips**: Tombol saran untuk memulai percakapan

### 🤖 **AI Features**
- **Google Gemini 2.0 Flash**: Menggunakan model AI terbaru untuk respons yang cepat dan akurat
- **Context Awareness**: AI memahami konteks percakapan

### 🛠️ **Technical Features**
- **CORS Support**: Mendukung Cross-Origin Resource Sharing
- **Error Handling**: Error handling yang comprehensive
- **Environment Configuration**: Konfigurasi melalui environment variables
- **Static File Serving**: Optimized static file serving

## 📋 Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Google AI API Key (Gemini)

## 🛠️ Instalasi

1. **Clone atau download project ini**
   ```bash
   git clone <https://github.com/kyrazz2602/Hacktiv8_Final_Project.git>
   cd Final_Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   - Buat file `.env` di root directory
   - Tambahkan konfigurasi berikut:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Dapatkan Google AI API Key**
   - Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Buat API key baru
   - Copy API key ke file `.env`

## 🚀 Menjalankan Aplikasi

1. **Start server**
   ```bash
   npm start
   ```
   atau
   ```bash
   node index.js
   ```

2. **Akses aplikasi**
   - Buka browser dan kunjungi: `http://localhost:3000`
   - Aplikasi akan berjalan di port yang ditentukan di file `.env`

## 🎮 Cara Menggunakan

### 1. **Interface Utama**
- **Header**: Menampilkan logo dan tombol toggle theme/clear chat
- **Welcome Screen**: Tampilan awal dengan suggestion chips
- **Chat Area**: Area percakapan dengan scroll otomatis
- **Input Area**: Form untuk mengetik pesan dengan tombol voice dan send

### 2. **Fitur Interaksi**
- **Toggle Theme**: Klik ikon bulan/matahari untuk ganti tema
- **Clear Chat**: Klik ikon trash untuk hapus riwayat chat
- **Suggestion Chips**: Klik chip untuk memulai percakapan
- **Voice Input**: Klik ikon microphone untuk input suara (coming soon)
- **Send Message**: Klik ikon paper plane atau tekan Enter

### 3. **Format Pesan**
- **User Messages**: Tampil di kanan dengan gradient biru
- **AI Responses**: Tampil di kiri dengan background abu-abu
- **Code Blocks**: Syntax highlighting dengan tombol copy
- **Markdown**: Support untuk bold, italic, link, list, table
- **Loading State**: Animasi spinner saat AI sedang berpikir

## 📡 API Endpoints

### POST /chat

Mengirim pesan ke AI dan menerima respons.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Halo, bagaimana kabar?"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Halo! Saya baik-baik saja, terima kasih sudah bertanya. Bagaimana dengan Anda?",
  "format": "markdown"
}
```

## 🏗️ Struktur Project

```
Final_Project/
├── index.js                    # Main server file (Express.js backend)
├── package.json                # Dependencies dan scripts
├── .env                        # Environment variables (buat sendiri)
├── requirements.txt            # Dependencies list dengan versi
├── README.md                   # Dokumentasi project
├── public/                     # Static files untuk frontend
│   ├── index.html              # Main HTML dengan modern UI
│   ├── script.js               # Frontend JavaScript logic
│   └── style.css               # CSS dengan dark/light theme
├── UI Chatbot/                 # Screenshots dan assets UI
│   ├── FIgure Generate.png     # Screenshot light mode
│   └── Figure UI Dark Mode.png # Screenshot dark mode
└── node_modules/               # Dependencies
```

## 🎯 Teknologi yang Digunakan

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Google Generative AI**: AI integration
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling dengan CSS variables
- **Vanilla JavaScript**: Pure JS tanpa framework
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter & Fira Code)

### AI & API
- **Google Gemini 2.0 Flash**: Latest AI model
- **RESTful API**: Clean API design
- **JSON**: Data exchange format

## 🔧 Konfigurasi

### Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `PORT` | Port untuk menjalankan server | 3000 |
| `GEMINI_API_KEY` | Google AI API Key | Required |

### Model Configuration

Aplikasi menggunakan model `gemini-2.0-flash` yang dapat diubah di file `index.js` pada baris 55:

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
```

## 🛡️ Keamanan

- API key disimpan di environment variables untuk keamanan
- Validasi input untuk mencegah error
- Error handling yang proper
- CORS diaktifkan untuk keamanan cross-origin

## 🐛 Troubleshooting

### Error: GEMINI_API_KEY tidak ditemukan
- Pastikan file `.env` ada di root directory
- Pastikan `GEMINI_API_KEY` sudah diisi dengan benar
- Restart server setelah mengubah file `.env`

### Error: Port sudah digunakan
- Ubah `PORT` di file `.env` ke port lain
- Atau hentikan proses yang menggunakan port tersebut

### Error: CORS
- Pastikan frontend dan backend berjalan di domain yang sama
- Atau konfigurasi CORS sesuai kebutuhan

## 📝 Dependencies

- **@google/generative-ai**: Google AI SDK untuk integrasi Gemini
- **express**: Web framework untuk Node.js
- **cors**: Middleware untuk Cross-Origin Resource Sharing
- **dotenv**: Load environment variables dari file .env
- **multer**: Middleware untuk handling multipart/form-data

## 🤝 Kontribusi

1. Fork project ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini menggunakan lisensi ISC. Lihat file `package.json` untuk detail lebih lanjut.

## 👨‍💻 Author

Dibuat sebagai Final Project untuk Hacktiv8.

## 🚀 Development

### Menjalankan dalam Mode Development
```bash
# Install dependencies
npm install

# Start server dengan auto-reload (jika menggunakan nodemon)
npm run dev

# Atau start biasa
node index.js
```

### Customization
- **Theme Colors**: Edit CSS variables di `public/style.css`
- **AI Model**: Ubah model di `index.js` baris 55
- **UI Components**: Modifikasi HTML di `public/index.html`
- **Styling**: Customize CSS di `public/style.css`

## 🌐 Deployment

### Heroku
```bash
# Install Heroku CLI
# Login ke Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set PORT=3000

# Deploy
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login dan deploy
railway login
railway init
railway up
```

## 📊 Performance

- **Load Time**: < 2 detik untuk first load
- **Response Time**: < 3 detik untuk AI response
- **Bundle Size**: Minimal dependencies untuk performa optimal
- **Mobile Optimized**: Responsive design untuk semua device

## 🔒 Security

- **API Key Protection**: Environment variables untuk keamanan
- **Input Validation**: Validasi input untuk mencegah injection
- **CORS Configuration**: Proper CORS setup
- **Error Handling**: Tidak expose sensitive information

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

## 🎉 Acknowledgments

- **Google AI**: Untuk Gemini API yang powerful
- **Express.js**: Web framework yang reliable
- **Font Awesome**: Icons yang beautiful
- **Google Fonts**: Typography yang modern
