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
  const subject = req.query.subject;
  const artist = req.query.artist;
  const songTitle = req.query.title;
  let song;

  if (subject && songTitle) {
    const decodedSubject = decodeURIComponent(subject);
    const decodedArtist = decodeURIComponent(artist);
    const decodedSongTitle = decodeURIComponent(songTitle);

    try {
      const response = await getTopDocumentsForSongTitle(decodedSongTitle);
      const document = response.hits?.hits[0];

      if (document) {
        song = await getChristmasSongFromLyrics(decodedSubject, decodedArtist, document._source.lyrics);
      }
    } catch(e) {
      console.log(e);
      song = "Do they know it's Christmas time at all?"
    }
  }

  res.send(song);
});

app.listen(port, () => {
  console.log(`Generating Christmas songs on port ${port}`);
});
