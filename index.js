// import dependencies yang kita butuhkan di file ini
// CommonJS --> const genai = require("@google/genai");
// const { GoogleGenAI } = genai;
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import express from "express";
import cors from "cors";

const { PORT, GEMINI_API_KEY } = process.env;

// init Express-nya
const app = express();

// tambahkan middleware-nya ke dalam app
app.use(cors()); // CORS: Cross-Origin Resource Sharing
app.use(express.json()); // membolehkan request dengan Content-Type: application/json
app.use(express.static("public"));

// Inisialisasi Google AI.
// Lebih baik untuk meneruskan kunci API secara eksplisit dan memberikan error jika tidak ada.
// Pastikan GEMINI_API_KEY ada di file .env Anda.
if (!GEMINI_API_KEY) {
  console.error(
    "FATAL ERROR: GEMINI_API_KEY tidak ditemukan di environment variables."
  );
  process.exit(1); // Keluar dari aplikasi jika API key tidak ada, karena aplikasi tidak bisa berjalan.
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/// tambahkan route handler
// request untuk POST /chat
// http://localhost:3000/chat --> POST
// JSON body: { prompt: "" }
app.post("/chat", async (req, res) => {
  // guard clause (satpam)
  if (!req.body) {
    // lempar 400
    return res.status(400).send("Tidak ada request body nih!");
  }

  const { messages } = req.body;
  // messages: { role: 'user' | 'model', content: string }[]

  // kasih satpam lagi buat periksa isi prompt-nya
  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .send(
        "Tidak ada pesan nih, atau pesannya nggak beraturan! Pesan harus berupa array berisi role dan juga content"
      );
  }

  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert messages to the format expected by Gemini
    const chat = model.startChat({
      systemInstruction: {
        parts: [
          {
            text: `Anda adalah seorang AI Assistant yang sangat ahli dan berpengalaman dalam berbagai bidang.`,
          },
        ],
      },
    });

    // Send the message and get response
    const lastUserMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const text = response.text();

    // kirim hasil sebagai markdown text
    return res.status(200).json({
      response: text.trim(),
      format: "markdown", // opsional: penanda format
    });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).send(e.message);
  }
});

// membuat app-nya "mendengar" port [PORT]
app.listen(PORT, () => {
  console.log("I LOVE YOU " + PORT);
});