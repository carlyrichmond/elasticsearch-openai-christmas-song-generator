const express = require("express");
const cors = require("cors");

const { getTopDocumentForQuestion } = require("./util/elasticsearch");
const { getChatAnswerFromDocument } = require("./util/openai");

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
      const response = await getTopDocumentForQuestion(question);
      const document = response.hits?.hits[0];

      if (document) {
        //const completions = await getChatAnswerFromDocument(decodedQuestion, document._source.solution.text);
        //solution = completions.choices[0].text;
        solution = `

        To embed a Kibana dashboard in your JavaScript application, you will need to follow these steps:
        
        1. In your Kibana dashboard, go to the Share menu (top right corner) and select Embed this Dashboard.
        2. Copy the iframe code that is generated.
        3. In your JavaScript application, create a <iframe> tag and set the src attribute to the copied iframe code.
        4. Set the xpack.security.sameSiteCookies property in your Kibana configuration file to None.
        5. Make sure that the browser you are using supports SameSite cookies.
        6. Reload your JavaScript application and the Kibana dashboard should now be embedded in it.`
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
