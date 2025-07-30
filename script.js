const colors = ['red','yellow','green','blue','purple','orange'];

let secretCode = [];
let currentGuess = [];
let attempts = 10;

const guessRow = document.getElementById("guessRow");
const feedbackDiv = document.getElementById("feedback");
const attemptsDiv = document.getElementById("attempts");

function generateScreteCode(){
  for(let i = 0; i < 4; i++){
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    secretCode.push(randomColor);
  }
  // console.log(secretCode);
}

function updateGuessRow(){
  guessRow.innerHTML = "";
  for(let i = 0; i < currentGuess.length; i++){
    const div = document.createElement('div');
    div.className = "color";
    div.style.background = currentGuess[i];
    guessRow.appendChild(div);
  }

  for(let i = currentGuess.length; i < 4; i++){
    const div = document.createElement('div');
    div.className = 'slot';
    guessRow.appendChild(div);
  }
}

function checkGuess(){
  if(currentGuess.length !== 4)
    return alert("Select 4 colors first!");

  let guess = [...currentGuess];
  let code = [...secretCode];
  let result = [];

  // Check correct color and position
  for(let i = 0; i < 4; i++){
    if(guess[i] === code[i]){
      result.push("🟩");
      guess[i] = code[i] = null;
    }
  }

  // wrong position
  for(let i = 0; i < 4; i++){
    if(guess[i] && code.includes(guess[i])){
      result.push("🟨");
      code[code.indexOf(guess[i])] = null;
    }
  }

  while(result.length < 4)
    result.push('⬛')

  feedbackDiv.innerHTML += `<div>Guess : ${currentGuess.join(" - ")} | Feedback : ${result.join(" ")}</div>`;
  attempts--;
  attemptsDiv.innerHTML = "Attempts left : " + attempts;

  if(result.join("") === "🟩🟩🟩🟩" ){
    alert("Congratulations ! You broke the code !");
    disableGame();
  }
  else if(attempts === 0){
    alert("Game Over ! Code was : " + secretCode.join(", "));
    disableGame();
  }

  currentGuess = [];
  updateGuessRow();
}

function disableGame(){
  document.querySelectorAll('.color').forEach((btn) => {
    btn.style.pointerEvents = "none"
  });

  document.getElementById("checkBtn").disabled = true;
  document.getElementById("restartBtn").style.display = "inline-block";
}
generateScreteCode();
updateGuessRow();

document.querySelectorAll(".color").forEach((btn) => {
  btn.addEventListener('click', () => {
    if(currentGuess.length < 4){
      currentGuess.push(btn.dataset.color);
      updateGuessRow();
    }
  })
})

 document.getElementById("checkBtn").addEventListener('click', checkGuess);

// 🟩🟧⬛🟨🟨


document.getElementById('restartBtn').addEventListener('click', () => {
  secretCode = [];
  currentGuess =[];
  attempts = 10;
  feedbackDiv.innerHTML = "";
  attemptsDiv.innerHTML = "Attempts left : " + attempts;

  document.querySelectorAll(".color").forEach((btn) => {
    btn.style.pointerEvents = "auto"
  });

  document.getElementById("checkBtn").disabled = false;

  document.getElementById("restartBtn").style.display = "none";

  generateScreteCode();
  updateGuessRow();
})

