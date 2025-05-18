import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export const GeminiLyrics = async (req, res) => {
  const { songName, artist } = req.body;

  if (!songName || !artist) {
    return res.status(400).json({ error: 'Song name and artist are required' });
  }

  try {
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