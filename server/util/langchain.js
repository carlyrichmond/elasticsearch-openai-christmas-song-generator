const openai = require("langchain/llms/openai");

const apiKey = process.env.OPENAI_API_KEY;
const llm = new openai.OpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9
});

  async function getChristmasSongFromLyrics(subject, adjective, food, gift, lyrics) {
    const prompt = `Write a Christmas song about ${subject}, describing Christmas time as ${adjective} including reference to eating ${food} and receiving a ${gift} in the style of the following song lyrics: ${lyrics}`;
    return llm.predict(prompt);
  }

  module.exports = { getChristmasSongFromLyrics: getChristmasSongFromLyrics }