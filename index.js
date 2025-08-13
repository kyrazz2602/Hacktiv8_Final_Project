// import dependencies yang kita butuhkan di file ini
// CommonJS --> const genai = require("@google/genai");
// const { GoogleGenAI } = genai;
import { GoogleGenAI } from "@google/genai"; // ESModule (ESM)
import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";

const { PORT } = process.env;

// init Express-nya
const app = express();

// tambahkan middleware-nya ke dalam app
app.use(cors()); // CORS: Cross-Origin Resource Sharing
app.use(express.json()); // membolehkan request dengan Content-Type: application/json

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({}); // instantiate sebuah class menjadi sebuah instance object di variable `ai`

// tambahkan route handler
// request untuk POST /chat
// http://localhost:3000/chat --> POST
// JSON body: { prompt: "" }
app.post('/chat', async (req, res) => {
  // guard clause (satpam)
  if (!req.body) {
    // lempar 400
    return res.status(400).send("Tidak ada request body nih!");
  }

  const { prompt } = req.body;

  // kasih satpam lagi buat periksa isi prompt-nya
  if (!prompt) {
    return res.status(400).send("Tidak ada prompt nih!");
  }

  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    })

    return res.status(200).send(aiResponse.text);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// membuat app-nya "mendengar" port [PORT]
app.listen(PORT, () => {
  console.log("I LOVE YOU " + PORT);
});