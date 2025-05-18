import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const OpenAires = async (req, res) => {
  const { songName, artist } = req.body;

  if (!songName || !artist) {
    return res.status(400).json({ error: 'Song name and artist are required' });
  }

  try {
    const prompt = `Give me the full song lyrics of "${songName}" by ${artist}. Only the lyrics, no additional commentary or formatting.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const lyrics = completion.data.choices[0].message.content;
    res.json({ lyrics });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
};
