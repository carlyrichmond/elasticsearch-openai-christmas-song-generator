async function getSong() {
  const subject = document.getElementById("subject-input").value;
  const artist = document.getElementById("artist-input").value;
  const songTitle = document.getElementById("song-title-input").value;
  
  // Add loading message
  const responseElement = document.getElementById("song-response");
  responseElement.innerText = "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do..."

  let answer = "Try again later. Happy Holidays!"; 

  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedArtist = encodeURIComponent(artist);
    const encodedSongTitle = encodeURIComponent(songTitle);

    const response = await fetch(`http://localhost:3000/generate?subject=${encodedSubject}&artist=${encodedArtist}&title=${encodedSongTitle}`);

    answer = await response.text();

  } catch (error) {
    console.log("Unable to get document");
  }

  responseElement.innerText = answer;
}
