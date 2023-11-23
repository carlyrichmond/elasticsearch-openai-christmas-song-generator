const openai = require("langchain/chat_models/openai");
const prompts = require("langchain/prompts");

const apiKey = process.env.OPENAI_API_KEY;
const chatModel = new openai.ChatOpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9
});

  async function getChristmasSongFromLyrics(subject, adjective, food, gift, lyrics) {
    const chatPrompts = prompts.ChatPromptTemplate.fromMessages([
      ["system", "You are a Christmas song generator that takes user input and generates a song in the style of the provided song"],
      ["human", "Write a {adjective} Christmas song about {subject}"],
      ["human", "Include at least one reference to eating {food} and receiving {gift}"],
      ["human", "Write the song in the style of these lyrics: {lyrics}"],
    ]);

    const formattedChatPrompts = await chatPrompts.formatMessages({
      subject: subject,
      adjective: adjective,
      food: food,
      gift: gift,
      lyrics: lyrics
    });

    const messages = await chatModel.predictMessages(formattedChatPrompts);

    return messages.content;

  }

  module.exports = { getChristmasSongFromLyrics: getChristmasSongFromLyrics }