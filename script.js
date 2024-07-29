const exercises = [
  { description: "Do 10 push-ups", image: "https://via.placeholder.com/150?text=Push-ups" },
  { description: "Run in place for 1 minute", image: "https://via.placeholder.com/150?text=Run+in+place" },
  { description: "Do 15 squats", image: "https://via.placeholder.com/150?text=Squats" },
  { description: "Hold a plank for 30 seconds", image: "https://via.placeholder.com/150?text=Plank" },
  { description: "Do 20 jumping jacks", image: "https://via.placeholder.com/150?text=Jumping+jacks" },
  { description: "Do 10 burpees", image: "https://via.placeholder.com/150?text=Burpees" },
  { description: "Run around the block", image: "https://via.placeholder.com/150?text=Run" },
  { description: "Hold a wall sit for 1 minute", image: "https://via.placeholder.com/150?text=Wall+sit" },
  { description: "Do 15 lunges on each leg", image: "https://via.placeholder.com/150?text=Lunges" },
  { description: "Do a 30-second mountain climber", image: "https://via.placeholder.com/150?text=Mountain+climber" }
];

let currentPlayer = 1;
let exerciseCount = [0, 0];
let players = ["Player 1", "Player 2"];

document.getElementById('startGame').addEventListener('click', () => {
  players[0] = document.getElementById('player1').value || "Player 1";
  players[1] = document.getElementById('player2').value || "Player 2";
  document.getElementById('turnIndicator').innerText = `${players[0]}'s Turn`;
  document.getElementById('startGame').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
});

document.getElementById('generateExercise').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[randomIndex];
  document.getElementById('exerciseDisplay').innerText = exercise.description;
  document.getElementById('exerciseImage').innerHTML = `<img src="${exercise.image}" alt="${exercise.description}" class="mx-auto mt-4">`;
  document.getElementById('actionButtons').classList.remove('hidden');
  document.getElementById('generateExercise').classList.add('hidden');
});

document.getElementById('continueBtn').addEventListener('click', () => {
  exerciseCount[currentPlayer - 1]++;
  updateStats();
  switchPlayer();
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('actionButtons').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
});

document.getElementById('giveUpBtn').addEventListener('click', () => {
  document.getElementById('result').innerText = `You have lost, ${players[currentPlayer - 1]} with a 35cm arm!`;
  resetGame();
});

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById('turnIndicator').innerText = `${players[currentPlayer - 1]}'s Turn`;
}

function updateStats() {
  document.getElementById('player1Stats').innerText = `${players[0]} Exercises: ${exerciseCount[0]}`;
  document.getElementById('player2Stats').innerText = `${players[1]} Exercises: ${exerciseCount[1]}`;
}

function resetGame() {
  currentPlayer = 1;
  exerciseCount = [0, 0];
  players = ["Player 1", "Player 2"];
  document.getElementById('turnIndicator').innerText = `Player 1's Turn`;
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('actionButtons').classList.add('hidden');
  document.getElementById('generateExercise').classList.add('hidden');
  document.getElementById('startGame').classList.remove('hidden');
  updateStats();
}
