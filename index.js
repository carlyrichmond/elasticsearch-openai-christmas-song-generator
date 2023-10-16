async function getChatAnswer() {
  const question = document.getElementById("question-input").value;
  
  // Add loading message
  const responseElement = document.getElementById("chat-response");
  responseElement.innerText = "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do..."

  let answer = "Dave, my mind is going. I can feel it."; 

  try {
    const encodedQuestion = encodeURIComponent(question);
    const response = await fetch(`http://localhost:3000/chat?question=${encodedQuestion}`);

    answer = await response.text();

  } catch (error) {
    console.log("Unable to get document");
  }

  responseElement.innerText = answer;
}
