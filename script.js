let preguntas = [];

function cargarPreguntas() {
  fetch('preguntas.csv')
    .then(response => response.text())
    .then(data => {
      const lineas = data.split('\n').slice(1); // saltamos cabecera
      preguntas = lineas
        .map(l => l.trim())
        .filter(l => l)
        .map(l => l.replace(/^"|"$/g, '')); // quitamos comillas
      mostrarPregunta();
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

document.getElementById('nextBtn').addEventListener('click', mostrarPregunta);

window.addEventListener('DOMContentLoaded', cargarPreguntas);
