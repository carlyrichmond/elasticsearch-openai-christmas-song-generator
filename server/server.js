const express = require("express");
const cors = require("cors");

const { getTopDocumentsForQuestion } = require("./util/elasticsearch");
const { getChristmasSongFromDocuments } = require("./util/langchain");

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("I am the H.A.L 9000. You may call me Hal.");
});

app.get("/chat", async (req, res) => {
  const question = req.query.question;
  let solution;

  if (question) {
    const decodedQuestion = decodeURIComponent(question);

    try {
      const response = await getTopDocumentsForQuestion(question);
      const document = response.hits?.hits[0];

      if (document) {
        solution = await getChristmasSongFromDocuments(decodedQuestion, document._source.solution.text);
      }
    } catch(e) {
      console.log(e);
      solution = "I can't let you do that Dave."
    }
  }

  res.send(solution);
});

app.listen(port, () => {
  console.log(`Hal is listening on port ${port}`);
});
