const express = require("express");
const cors = require("cors");

const { getTopDocumentsForSongTitle } = require("./util/elasticsearch");
const { getChristmasSongFromLyrics } = require("./util/langchain");

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Happy Holidays!");
});

app.get("/generate", async (req, res) => {
  const subject = req.query.subject ? decodeURIComponent(req.query.subject): '';
  const adjective = req.query.adjective ? decodeURIComponent(req.query.adjective): '';
  const food = req.query.food ? decodeURIComponent(req.query.food): '';
  const gift = req.query.gift ? decodeURIComponent(req.query.gift): '';
  
  const songTitle = req.query.title? decodeURIComponent(req.query.title): '';

  let song;

  try {
    const response = await getTopDocumentsForSongTitle(songTitle);
    const document = response.hits?.hits[0];

    if (document) {
      song = await getChristmasSongFromLyrics(subject, adjective, food, gift, document._source.lyrics);
    }
  } catch(e) {
    console.log(e);
    song = "Do they know it's Christmas time at all?"
  }

  res.send(song);
});

app.listen(port, () => {
  console.log(`Generating Christmas songs on port ${port}`);
});
