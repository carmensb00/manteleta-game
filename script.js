let preguntas = [];

function cargarPreguntas() {
  fetch('preguntasDemo.csv')
    .then(response => response.text())
    .then(data => {
      const lineas = data.split('\n').slice(1); // saltamos cabecera
      preguntas = lineas
        .map(l => l.trim())
        .filter(l => l)
        .map(l => l.replace(/^"|"$/g, '')); // quitamos comillas
    })
    .catch(error => {
      document.getElementById('pregunta').textContent = 'Error al cargar las preguntas.';
      console.error(error);
    });
}

function mostrarPregunta() {
  if (preguntas.length === 0) return;
  const i = Math.floor(Math.random() * preguntas.length);
  document.getElementById('pregunta').textContent = preguntas[i];
}

// Mostrar una pregunta al pulsar "Comenzar juego"
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('pregunta').style.display = 'block';
  document.getElementById('nextBtn').style.display = 'inline-block';
  mostrarPregunta();
});

// Mostrar siguiente pregunta
document.getElementById('nextBtn').addEventListener('click', mostrarPregunta);

// Cargar preguntas cuando se carga la página (pero sin mostrar aún)
window.addEventListener('DOMContentLoaded', cargarPreguntas);