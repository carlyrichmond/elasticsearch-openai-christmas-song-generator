const openai = require("langchain/llms/openai");

const apiKey = process.env.OPENAI_API_KEY;
const llm = new openai.OpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9
});

  async function getChristmasSongFromDocuments(question, documents) {
    const prompt = `Answer this question ${question} using these documents ${documents}`;
    return llm.predict(prompt);
  }

  module.exports = { getChristmasSongFromDocuments: getChristmasSongFromDocuments }