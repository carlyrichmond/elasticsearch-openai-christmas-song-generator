

async function getChatAnswer() {
  const question = document.getElementById("question-input").value;
  let answer = "Dave, my mind is going. I can feel it."; // TODO change to be answering document later

  try {
    const response = await fetch('http://localhost:3000/chat', {
        method: "GET",
        params: { question: JSON.stringify(question) }
    });

    answer = await response.text();

  } catch (error) {
    console.log("Unable to get document");
  }

  const responseElement = document.getElementById("chat-response")
  responseElement.innerText = answer;
}
