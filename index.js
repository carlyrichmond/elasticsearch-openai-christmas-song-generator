async function getSong() {
  const subject = document.getElementById("subject-input").value;
  const adjective = document.getElementById("adjective-input").value;
  const food = document.getElementById("food-input").value;
  const gift = document.getElementById("gift-input").value;

  const songTitle = document.getElementById("song-title-input").value;
  
  // Add loading message
  const responseElement = document.getElementById("song-response");
  responseElement.innerText = "Generating..."

  let answer = "Try again later. Happy Holidays!"; 

  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedAdjective = encodeURIComponent(adjective);
    const encodedFood = encodeURIComponent(food);
    const encodedGift = encodeURIComponent(gift);

    const encodedSongTitle = encodeURIComponent(songTitle);

    const response = await fetch(`http://localhost:3000/generate?subject=${encodedSubject}&adjective=${encodedAdjective}&food=${encodedFood}&gift=${encodedGift}&title=${encodedSongTitle}`);

    answer = await response.text();

  } catch (error) {
    console.log("Unable to get document");
  }

  responseElement.innerText = answer;
}
