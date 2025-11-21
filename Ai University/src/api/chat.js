// /api/chat.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const payload = {
      contents: {
        parts: {
          text: `Answer this in short with dark humor flavor and only answer: ${message}`,
        },
      },
    };

    const options = {
      headers: {
        // eslint-disable-next-line no-undef
        "x-goog-api-key": process.env.GOOGLE_API_KEY, // Use environment variable here
      },
    };

    const { data } = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      payload,
      options
    );

    const result = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ response: result });
  } catch (err) {
    console.error(err.response?.data || err.message);

    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Too many requests. Please wait a few seconds." });
    }

    if (err.response?.status === 403) {
      return res.status(403).json({ error: "API quota exceeded. Try again later." });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
