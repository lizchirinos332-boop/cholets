// ==============================================================
// PASO 10 — Selección de elementos del DOM
// querySelector() busca en el HTML el primer elemento que coincide
// con el selector CSS indicado, para poder leerlo o modificarlo.
// ==============================================================
const edificio = document.querySelector("#cholet");
const controlesPisos = document.querySelector("#controles-pisos");
console.log(edificio);
console.log(controlesPisos);

const botonesPiso = document.querySelectorAll("#controles-pisos button");
const pisosDiv = document.querySelectorAll(".piso");


// ==============================================================
// Función de apoyo: mostrar mensajes de estado en el chip superior
// ==============================================================
function mostrarEstado(mensaje) {
  const estado = document.querySelector("#estadoSistema");
  if (estado) {
    estado.textContent = mensaje;
  }
}

// ==============================================================
// Bitácora: guarda un historial de eventos en pantalla (multimedia
// e integración final — muestra que el sistema reacciona en el tiempo)
// ==============================================================
function registrarEnBitacora(mensaje, esAlerta = false) {
  const bitacora = document.querySelector("#bitacora");
  if (!bitacora) return;

  const hora = new Date().toLocaleTimeString();
  const linea = document.createElement("p");
  linea.classList.add("bitacora-linea");
  if (esAlerta) linea.classList.add("alerta");
  linea.innerHTML = `<span>${hora}</span>${mensaje}`;
  bitacora.prepend(linea);
}


// ==============================================================
// PASO 12-14 — Formulario: registro y validación
// ==============================================================
const formulario = document.querySelector("#formCholet");
const mensajeFormulario = document.querySelector("#mensajeFormulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const email = document.querySelector("#email").value.trim();
  const nombreCholet = document.querySelector("#nombreCholet").value.trim();
  const descripcion = document.querySelector("#descripcion").value.trim();

  mensajeFormulario.classList.remove("error");

  if (nombre.length < 3) {
    mensajeFormulario.textContent = "El nombre debe tener al menos 3 caracteres.";
    mensajeFormulario.classList.add("error");
    return;
  }
  if (!email.includes("@")) {
    mensajeFormulario.textContent = "Ingrese un correo válido.";
    mensajeFormulario.classList.add("error");
    return;
  }
  if (nombreCholet.length < 3) {
    mensajeFormulario.textContent = "El nombre del cholet es demasiado corto.";
    mensajeFormulario.classList.add("error");
    return;
  }
  if (descripcion.length < 10) {
    mensajeFormulario.textContent = "La descripción debe tener al menos 10 caracteres.";
    mensajeFormulario.classList.add("error");
    return;
  }

  mensajeFormulario.textContent = `Cholet "${nombreCholet}" registrado correctamente.`;
  mostrarEstado(`Cholet registrado: ${nombreCholet}`);
  registrarEnBitacora(`Registro completado para "${nombreCholet}".`);
  formulario.reset();
});


// ==============================================================
// PASO 15-16 — Arreglo de objetos: sensores IoT del cholet
// ==============================================================
const sensores = [
  { id: 1, nombre: "Sensor de lluvia", tipo: "ambiental", piso: 1, estado: "activo", valor: 72, unidad: "%" },
  { id: 2, nombre: "Sensor de humedad", tipo: "ambiental", piso: 1, estado: "activo", valor: 65, unidad: "%" },
  { id: 3, nombre: "Panel solar", tipo: "energía", piso: 2, estado: "activo", valor: 850, unidad: "W" },
  { id: 4, nombre: "Medidor de agua", tipo: "agua", piso: 2, estado: "activo", valor: 120, unidad: "L" },
  { id: 5, nombre: "Sensor de movimiento", tipo: "seguridad", piso: 3, estado: "activo", valor: 1, unidad: "detecciones" },
  { id: 6, nombre: "Cámara de seguridad", tipo: "seguridad", piso: 3, estado: "activo", valor: 98, unidad: "%" },
  { id: 7, nombre: "Alarma", tipo: "seguridad", piso: 4, estado: "inactivo", valor: 0, unidad: "eventos" },
  { id: 8, nombre: "Bomba de agua", tipo: "agua", piso: 4, estado: "activo", valor: 45, unidad: "%" }
];
// Los valores son simulados y no representan mediciones reales.


// ==============================================================
// PASO 17 — Recorrer el array de sensores (dos formas)
// ==============================================================
sensores.forEach(function (sensor) {
  console.log(sensor.nombre);
  console.log(sensor.valor);
});

for (let i = 0; i < sensores.length; i++) {
  console.log(sensores[i].nombre);
}


// ==============================================================
// PASO 18 — Mostrar los sensores dinámicamente en el HTML
// ==============================================================
const listaSensores = document.querySelector("#listaSensores");

function mostrarSensores(lista) {
  listaSensores.innerHTML = "";

  if (lista.length === 0) {
    listaSensores.innerHTML = `<p class="sensor-vacio">Este piso no tiene sensores registrados.</p>`;
    return;
  }

  lista.forEach(function (sensor) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("sensor");
    if (sensor.estado === "alerta") {
      tarjeta.classList.add("estado-alerta");
    }

    tarjeta.innerHTML = `
      <h3>${sensor.nombre}</h3>
      <div class="sensor-linea"><span>Tipo</span><span>${sensor.tipo}</span></div>
      <div class="sensor-linea"><span>Piso</span><span>${sensor.piso}</span></div>
      <div class="sensor-linea"><span>Estado</span><span>${sensor.estado}</span></div>
      <div class="sensor-linea"><span>Valor</span><span class="sensor-valor">${sensor.valor} ${sensor.unidad}</span></div>
    `;
    listaSensores.appendChild(tarjeta);
  });
}

// Mostrar todos los sensores al cargar la página
mostrarSensores(sensores);


// ==============================================================
// PASO 19 — Filtrar sensores por piso
// ==============================================================
function obtenerSensoresPorPiso(numeroPiso) {
  return sensores.filter(function (sensor) {
    return sensor.piso === numeroPiso;
  });
}


// ==============================================================
// PASO 21-22 — Efecto Pop-up 3D: resalta el piso seleccionado
// ==============================================================
function activarPopUp(numeroPiso) {
  pisosDiv.forEach(function (elemento) {
    elemento.classList.remove("expandido");
    if (Number(elemento.dataset.piso) === numeroPiso) {
      elemento.classList.add("expandido");
    }
  });
}

function marcarBotonActivo(numeroPiso) {
  botonesPiso.forEach(function (boton) {
    boton.classList.toggle("activo", Number(boton.dataset.piso) === numeroPiso);
  });
}


// ==============================================================
// PASO 20/37 — Conectar pisos y botones con el filtro de sensores
// (event delegation: un solo listener por contenedor)
// ==============================================================
function seleccionarPiso(numeroPiso) {
  const sensoresPiso = obtenerSensoresPorPiso(numeroPiso);
  mostrarSensores(sensoresPiso);
  activarPopUp(numeroPiso);
  marcarBotonActivo(numeroPiso);
  mostrarEstado(`Piso ${numeroPiso} seleccionado.`);
  registrarEnBitacora(`Piso ${numeroPiso} seleccionado (${sensoresPiso.length} sensores).`);
}

document.querySelector("#controles-pisos").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    seleccionarPiso(Number(event.target.dataset.piso));
  }
});

document.querySelector("#cholet").addEventListener("click", function (event) {
  const piso = event.target.closest(".piso");
  if (piso) {
    seleccionarPiso(Number(piso.dataset.piso));
  }
});


// ==============================================================
// PASO 28-30 — Contador con setInterval y clearInterval
// ==============================================================
let intervaloSimulacion;
let segundos = 0;

function iniciarContador() {
  if (intervaloSimulacion) {
    clearInterval(intervaloSimulacion);
  }
  intervaloSimulacion = setInterval(() => {
    segundos++;
    const spanSegundos = document.querySelector("#segundos");
    if (spanSegundos) {
      spanSegundos.textContent = segundos;
    }
  }, 1000);
}

function detenerContador() {
  clearInterval(intervaloSimulacion);
}


// ==============================================================
// PASO 31 — setTimeout: mensaje diferido
// ==============================================================
function mostrarAlerta() {
  setTimeout(function () {
    mostrarEstado("Se detectó un evento en el sistema IoT.");
    registrarEnBitacora("Evento detectado en el sistema IoT.", true);
  }, 3000);
}


// ==============================================================
// PASO 34 — Determinar el estado de un sensor según su valor
// ==============================================================
function actualizarEstadoSensor(sensor) {
  if (sensor.valor > 90) {
    sensor.estado = "alerta";
  } else {
    sensor.estado = "activo";
  }
}

// Aplicar el estado inicial a todos los sensores
sensores.forEach(function (sensor) {
  actualizarEstadoSensor(sensor);
});


// ==============================================================
// PASO 35-36 — Simular un evento IoT aleatorio
// ==============================================================
function simularEventoIoT() {
  const indice = Math.floor(Math.random() * sensores.length);
  const sensor = sensores[indice];
  sensor.valor = Math.floor(Math.random() * 101);
  actualizarEstadoSensor(sensor);
  mostrarSensores(sensores);

  if (sensor.estado === "alerta") {
    mostrarEstado(`Alerta: ${sensor.nombre}`);
    registrarEnBitacora(`Alerta en ${sensor.nombre} (piso ${sensor.piso}): ${sensor.valor} ${sensor.unidad}`, true);
  } else {
    registrarEnBitacora(`${sensor.nombre} actualizado: ${sensor.valor} ${sensor.unidad}`);
  }
}


// ==============================================================
// PASO 38 — Manejo de errores al mostrar sensores
// ==============================================================
try {
  mostrarSensores(sensores);
} catch (error) {
  console.error("Error al mostrar sensores:", error);
  mostrarEstado("Ocurrió un error al cargar los sensores.");
}


// ==============================================================
// PASO 39 — Control correcto del intervalo de simulación
// ==============================================================
let intervalo = null;

function iniciarSimulacion() {
  if (intervalo !== null) {
    return; // evita crear un segundo intervalo si ya hay uno activo
  }
  intervalo = setInterval(simularEventoIoT, 2000);
  mostrarEstado("Simulación IoT iniciada.");
  registrarEnBitacora("Simulación IoT iniciada.");
}

function detenerSimulacion() {
  clearInterval(intervalo);
  intervalo = null;
  mostrarEstado("Simulación IoT detenida.");
  registrarEnBitacora("Simulación IoT detenida.");
}


// ==============================================================
// PASO 25-27 — Control de video (Estudiante 3)
// ==============================================================
const video = document.querySelector("#videoCholet");

document.querySelector("#btnPlayVideo").addEventListener("click", () => video.play());
document.querySelector("#btnPauseVideo").addEventListener("click", () => video.pause());
document.querySelector("#btnMuteVideo").addEventListener("click", () => {
  video.muted = !video.muted;
});

// ==============================================================
// PASO 26-27 — Control de audio (Estudiante 3)
// ==============================================================
const audio = document.querySelector("#audioCholet");

document.querySelector("#btnPlayAudio").addEventListener("click", () => audio.play());
document.querySelector("#btnPauseAudio").addEventListener("click", () => audio.pause());
document.querySelector("#btnMuteAudio").addEventListener("click", () => {
  audio.muted = !audio.muted;
});

// ==============================================================
// Botones de control de la simulación (contador + eventos IoT)
// ==============================================================
document.querySelector("#btnIniciarSimulacion").addEventListener("click", () => {
  iniciarContador();
  iniciarSimulacion();
});

document.querySelector("#btnDetenerSimulacion").addEventListener("click", () => {
  detenerContador();
  detenerSimulacion();
});
