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

let exerciseCount = 0;
let round = 1;

document.getElementById('generateExercise').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[randomIndex];
  document.getElementById('exerciseDisplay').innerText = exercise.description;
  document.getElementById('exerciseImage').innerHTML = `<img src="${exercise.image}" alt="${exercise.description}" class="mx-auto mt-4">`;
  document.getElementById('actionButtons').classList.remove('hidden');
});

document.getElementById('continueBtn').addEventListener('click', () => {
  exerciseCount++;
  round++;
  document.getElementById('result').innerText = `Exercises performed: ${exerciseCount}`;
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('roundCounter').innerText = `Round: ${round}`;
  document.getElementById('actionButtons').classList.add('hidden');
});

document.getElementById('giveUpBtn').addEventListener('click', () => {
  document.getElementById('result').innerText = `You performed ${exerciseCount} exercises. Better luck next time!`;
  document.getElementById('exerciseDisplay').innerText = '';
  document.getElementById('exerciseImage').innerHTML = '';
  document.getElementById('actionButtons').classList.add('hidden');
  exerciseCount = 0;
  round = 1;
  document.getElementById('roundCounter').innerText = `Round: ${round}`;
});
