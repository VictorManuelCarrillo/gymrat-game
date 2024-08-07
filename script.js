const exercises = [
  { description: 'Lagartijas X 5', image: './public/img/lagartija.png' },
  { description: 'Lagartijas abiertas X 5', image: './public/img/lagartija_abierta.png' },
{ description: 'fondos con silla', image: './public/img/fondos_con_silla.png' },
];

let currentPlayer = 1;
let exerciseCount = [0, 0];
let players = ['Jugador 1', 'Jugador 2'];

document.getElementById('startGame').addEventListener('click', () => {
  players[0] = document.getElementById('player1').value || 'Jugador 1';
  players[1] = document.getElementById('player2').value || 'Jugador 2';
  document.getElementById('turnIndicator').innerText = `Turno de ${players[0]}`;
  document.getElementById('startGame').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
});

document.getElementById('generateExercise').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[randomIndex];
  document.getElementById('exerciseDisplay').innerText = exercise.description;
  document.getElementById(
    'exerciseImage'
  ).innerHTML = `<img src="${exercise.image}" alt="${exercise.description}" class="exercise-image mx-auto mt-4" loading="lazy">`;
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
  document.getElementById('result').innerText = `¡Has perdido, ${players[currentPlayer - 1]} con un brazo de 35cm!`;
  resetGame();
});

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById('turnIndicator').innerText = `Turno de ${players[currentPlayer - 1]}`;
}

function updateStats() {
  document.getElementById('player1Stats').innerText = `Ejercicios del ${players[0]}: ${exerciseCount[0]}`;
  document.getElementById('player2Stats').innerText = `Ejercicios del ${players[1]}: ${exerciseCount[1]}`;
}

function resetGame() {
  currentPlayer = 1;
  exerciseCount = [0, 0];
  players = ['Jugador 1', 'Jugador 2'];
  document.getElementById('turnIndicator').innerText = `Turno del Jugador 1`;
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('actionButtons').classList.add('hidden');
  document.getElementById('generateExercise').classList.add('hidden');
  document.getElementById('startGame').classList.remove('hidden');
  updateStats();
}
