import { GoogleGenerativeAI } from '@google/generative-ai';

export const GeminiLyrics = async (req, res) => {
  const { songName, artist } = req.body;

  if (!songName || !artist) {
    return res.status(400).json({ error: 'Song name and artist are required' });
  }

  const apiKey = process.env.GEMINI_AI_KEY;
  if (!apiKey) {
    return res.status(200).json({ lyrics: `Lyrics not available (Gemini API key is not configured for "${songName}" by ${artist})` });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Give me the full song lyrics of "${songName}" by ${artist}. Only the lyrics, no additional commentary or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lyrics = response.text();

    res.json({ lyrics });
  } catch (error) {
    console.error('Gemini error:', error.message || error);
    res.status(500).json({ error: 'Failed to generate lyrics using Gemini' });
  }
};