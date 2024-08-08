const exercises = [
  { description: 'Lagartijas X 5', image: './public/img/lagartija.png' },
  { description: 'Lagartijas abiertas X 5', image: './public/img/lagartija_abierta.png' },
  { description: 'Fondos con silla', image: './public/img/fondos_con_silla.png' },
  { description: 'Fondos con silla', image: './public/img/fondos_con_silla.png' },
];

let currentPlayer = 1;
let exerciseCount = [0, 0];
let exercisesDone = [0, 0];
let exercisesFailed = [0, 0];
let players = ['Jugador 1', 'Jugador 2'];
let timerInterval;
let timerTimeout;
let totalTime = 60;
let timeLeft = totalTime;

document.getElementById('startGame').addEventListener('click', () => {
  players[0] = document.getElementById('player1').value || 'Jugador 1';
  players[1] = document.getElementById('player2').value || 'Jugador 2';
  document.getElementById('turnIndicator').innerText = `Turno de ${players[0]}`;
  document.getElementById('startGame').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
  document.getElementById('playerStats').classList.remove('hidden'); // Mostrar las estadísticas al iniciar el juego
  document.getElementById('endGame').classList.remove('hidden'); // Mostrar el botón de terminar entrenamiento
  updateStats();
});

document.getElementById('generateExercise').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[randomIndex];
  document.getElementById('exerciseDisplay').innerText = exercise.description;
  document.getElementById('exerciseImage').innerHTML = `<img src="${exercise.image}" alt="${exercise.description}" class="exercise-image mx-auto mt-4" loading="lazy">`;
  document.getElementById('actionButtons').classList.remove('hidden');
  document.getElementById('generateExercise').classList.add('hidden');
  startTimer();
});

document.getElementById('continueBtn').addEventListener('click', () => {
  exerciseDone();
});

document.getElementById('giveUpBtn').addEventListener('click', () => {
  exerciseFailed();
});

document.getElementById('endGame').addEventListener('click', () => {
  endGame();
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('winnerModal').style.display = 'none';
  resetGame();
});

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById('turnIndicator').innerText = `Turno de ${players[currentPlayer - 1]}`;
}

function updateStats() {
  const player1StatsText = `Ejercicios hechos por ${players[0]}: <span class="text-green-500">${exercisesDone[0]}</span> <span class="text-red-500">${exercisesFailed[0]}</span>`;
  const player2StatsText = `Ejercicios hechos por ${players[1]}: <span class="text-green-500">${exercisesDone[1]}</span> <span class="text-red-500">${exercisesFailed[1]}</span>`;
  document.getElementById('playerStatsText').innerHTML = `${player1StatsText}<br>${player2StatsText}`;
}

function resetGame() {
  currentPlayer = 1;
  exerciseCount = [0, 0];
  exercisesDone = [0, 0];
  exercisesFailed = [0, 0];
  players = ['Jugador 1', 'Jugador 2'];
  document.getElementById('turnIndicator').innerText = `Turno del Jugador 1`;
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('actionButtons').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
  document.getElementById('startGame').classList.remove('hidden');
  document.getElementById('generateExercise').classList.add('hidden');
  document.getElementById('playerStats').classList.add('hidden');
  document.getElementById('endGame').classList.add('hidden');
  updateStats();
}

function exerciseDone() {
  exercisesDone[currentPlayer - 1]++;
  endTurn();
}

function exerciseFailed() {
  exercisesFailed[currentPlayer - 1]++;
  endTurn();
}

function endTurn() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('timerText').innerText = '01:00';
  timeLeft = totalTime;
  document.getElementById('actionButtons').classList.add('hidden');
  document.getElementById('generateExercise').classList.remove('hidden');
  updateStats();
  switchPlayer();
}

function startTimer() {
  timeLeft = totalTime;
  document.getElementById('timer').classList.remove('hidden');
  timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timerText').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      document.querySelector('.timer-circle').style.strokeDashoffset = 282.6 - (282.6 / totalTime) * (totalTime - timeLeft);
  }, 1000);
  timerTimeout = setTimeout(() => {
      exerciseFailed();
  }, totalTime * 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  const winner = exercisesDone[0] > exercisesDone[1] ? players[0] : players[1];
  document.getElementById('winnerText').innerText = `¡Eres el más fuerte ${winner}!!!`;
  document.getElementById('winnerModal').style.display = 'flex';
}
