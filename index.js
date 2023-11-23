async function getSong() {
  const subject = document.getElementById("subject-input").value;
  const songTitle = document.getElementById("song-title-input").value;
  
  // Add loading message
  const responseElement = document.getElementById("song-response");
  responseElement.innerText = "Generating..."

  let answer = "Do they know it's Christmas time at all?"; 

  try {
    const encodedSubject = encodeURIComponent(subject);

    const encodedSongTitle = encodeURIComponent(songTitle);

    const response = await fetch(`http://localhost:3000/generate?subject=${encodedSubject}&title=${encodedSongTitle}`);

    answer = await response.text();

  } catch (error) {
    console.log("Unable to get document");
  }
  finally {
    responseElement.innerText = answer;
  }
}