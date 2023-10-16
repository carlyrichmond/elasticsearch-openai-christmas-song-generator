const openai = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const client = new openai.OpenAI(apiKey);

  async function getChatAnswerFromDocument(question, document) {
    return client.completions.create({
        model: "gpt-3.5-turbo-instruct",
        max_tokens: 356, // default 16
        prompt: `Answer this question ${question} using only this document ${document}`
      });
  }

  module.exports = { getChatAnswerFromDocument }