const openai = require("langchain/llms/openai");

const apiKey = process.env.OPENAI_API_KEY;
const llm = new openai.OpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9
});

  async function getChristmasSongFromLyrics(subject, artist, lyrics) {
    const prompt = `Write a Christmas song about ${subject} in the style of ${artist} using these song lyrics for inspiration ${lyrics}`;
    return llm.predict(prompt);
  }

  module.exports = { getChristmasSongFromLyrics: getChristmasSongFromLyrics }