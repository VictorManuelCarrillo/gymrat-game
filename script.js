const exercises = [
  /* Ejercicios: abdomen, espalda, hombros, pecho, piernas, triceps */
  { description: 'Air Bike en el suelo X10', image: './public/ejercicios/abdomen/air_bike_en_el_suelo.png' },
  { description: 'Crunch de Rana X5', image: './public/ejercicios/abdomen/crunch_de_rana.png' },
  { description: 'Dead Bug X5', image: './public/ejercicios/abdomen/dead_bug.png' },
  { description: 'Giro Ruso X6', image: './public/ejercicios/abdomen/giro_ruso.png' },
  { description: 'Hollow Hold X6', image: './public/ejercicios/abdomen/hollow_hold.png' },
  { description: 'Inch Worm X3', image: './public/ejercicios/abdomen/inch_worm.png' },
  { description: 'Plancha a una pierna X10s', image: './public/ejercicios/abdomen/plancha_a_una_pierna.png' },
  { description: 'Plancha de rodillas X10s', image: './public/ejercicios/abdomen/plancha_de_rodillas.png' },
  { description: 'Plancha lateral X5s', image: './public/ejercicios/abdomen/plancha_lateral.png' },
  { description: 'Twist Superman X6', image: './public/ejercicios/espalda/twist_superman.png' },
  { description: 'Brazos en circulo X10', image: './public/ejercicios/hombros/brazos_en_circulos.png' },
  { description: 'Pike Push-ups X10', image: './public/ejercicios/hombros/pike_push-up.png' },
  { description: 'Flexiones X5', image: './public/ejercicios/pecho/flexion.png' },
  { description: 'Flexiones abiertas X5', image: './public/ejercicios/pecho/flexion_abierta.png' },
  { description: 'Flexiones contra la pared X5', image: './public/ejercicios/pecho/flexion_contra_la_pared.png' },
  { description: 'Flexiones superman X5', image: './public/ejercicios/pecho/flexion_superman.png' },
  { description: 'Fondo con silla X5', image: './public/ejercicios/pecho/fondo_con_silla.png' },
  { description: 'Sentadillas de pistola X5', image: './public/ejercicios/piernas/sentadilla_de_pistola.png' },
  { description: 'Sentadillas de reverencia X5', image: './public/ejercicios/piernas/sentadilla_de_reverencia.png' },
  { description: 'Sentadillas sumo X5', image: './public/ejercicios/piernas/sentadilla_sumo.png' },
  { description: 'Sentadillas con salto X5', image: './public/ejercicios/piernas/sentadillas_con_salto.png' },
  { description: 'Zancadas caminando X5', image: './public/ejercicios/piernas/zancadas_caminando.png' },
  { description: 'Flexiones Diamante X5', image: './public/ejercicios/triceps/flexion_diamante.png' },
  { description: 'Flexiones Diamante de rodillas X5', image: './public/ejercicios/triceps/flexion_diamante_de_rodillas.png' },
  { description: 'Fondos en banco plano X5', image: './public/ejercicios/triceps/fondo_en_banco_plano.png' },
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
  document.getElementById('playerStats').classList.remove('hidden');
  document.getElementById('endGame').classList.remove('hidden');
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
  const player1StatsText = `Ejercicios hechos por ${players[0]}: <span class="text-green-500"> + ${exercisesDone[0]}</span> <span class="text-red-500"> - ${exercisesFailed[0]}</span>`;
  const player2StatsText = `Ejercicios hechos por ${players[1]}: <span class="text-green-500"> + ${exercisesDone[1]}</span> <span class="text-red-500"> - ${exercisesFailed[1]}</span>`;
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
  document.getElementById('result').innerText = ''; 
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('timerText').innerText = '01:00';
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
    
    const circle = document.querySelector('.timer-circle');
    if (timeLeft <= totalTime / 3) {
      circle.style.stroke = 'red'; // Cambia a rojo
    } else if (timeLeft <= (2 * totalTime) / 3) {
      circle.style.stroke = 'yellow'; // Cambia a amarillo
    } else {
      circle.style.stroke = 'green'; // Mantiene verde
    }

    circle.style.strokeDashoffset = 282.6 - (282.6 / totalTime) * (totalTime - timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      exerciseFailed();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  const winner = exercisesDone[0] > exercisesDone[1] ? players[0] : players[1];
  
  const victoryMessages = [
    `¡Eres el más fuerte, ${winner}!!!`,
    `¡Mira que mamado está ${winner}!!!`,
    `¡Hazme un hijo, ${winner}!!!`,
    `¡Tu marido ${winner}, es el más mamado!!!`,
    `¡Mira al, ${winner} con su brazo de 45!!`,
    `¡El ${winner} si comió frijoles!!!`,
  ];

  const randomIndex = Math.floor(Math.random() * victoryMessages.length);
  const randomMessage = victoryMessages[randomIndex];

  document.getElementById('winnerText').innerText = randomMessage;
  document.getElementById('winnerModal').style.display = 'flex';
  launchConfetti();
}

function launchConfetti() {
  const duration = 10 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 15, spread: 360, ticks: 300, zIndex: 12 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
