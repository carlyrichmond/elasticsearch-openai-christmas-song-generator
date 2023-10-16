const openai = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const client = new openai.OpenAI(apiKey);

  async function getChatAnswerFromDocuments(question, documents) {
    const prompt = `Answer this question ${question} using these documents ${documents}`;
    return client.chat.completions.create({
        messages: [{ 
            role: "user", 
            content: prompt 
        }],
        model: "gpt-3.5-turbo-0613",
      });
  }

  module.exports = { getChatAnswerFromDocuments }