const cursosPorCiclo = {
  "Primer ciclo": [
    "Vida universitaria y gestión del conocimiento",
    "Lógico matemático",
    "Redacción e interpretación de textos",
    "Geometría analítica y álgebra lineal",
    "Química",
    "Introducción a la ingeniería civil",
    "Geología general"
  ],
  "Segundo ciclo": [
    "Inglés I",
    "Filosofía",
    "Realidad nacional",
    "Comunicación y medios digitales",
    "Cálculo Diferencial",
    "Física I",
    "Tecnología de los materiales y del concreto"
  ],
  "Tercer ciclo": [
    "Inglés II",
    "Interculturalidad",
    "Pensamiento crítico, creativo y emprendimiento",
    "Cálculo integral",
    "Estática",
    "Física II",
    "Diseño gráfico de ingeniería I"
  ],
  "Cuarto ciclo": [
    "Ciudadanía global y desarrollo sostenible",
    "Estadística básica I",
    "Cálculo numérico",
    "Dinámica",
    "Topografía",
    "Resistencia de materiales I",
    "Diseño gráfico de ingeniería II"
  ]
};

const dependencias = {
  "Geometría analítica y álgebra lineal": ["Cálculo Diferencial", "Diseño gráfico de ingeniería I", "Estadística básica I"],
  "Química": ["Tecnología de los materiales y del concreto"],
  "Geología general": ["Mecánica de suelos I", "Curso integrado de ingeniería civil I"],
  "Inglés I": ["Inglés II"],
  "Cálculo Diferencial": ["Cálculo integral"],
  "Física I": ["Estática", "Física II"],
  "Tecnología de los materiales y del concreto": ["Construcción I", "Curso integrado de ingeniería civil I", "Curso integrador de ingeniería III"],
  "Cálculo integral": ["Cálculo numérico"],
  "Estática": ["Dinámica", "Resistencia de materiales I"],
  "Física II": ["Resistencia de materiales I"],
  "Diseño gráfico de ingeniería I": ["Topografía", "Diseño gráfico de ingeniería II", "Curso integrado de ingeniería civil I"],
  "Estadística básica I": ["Estadística básica II"]
};

let estado = {};

function guardarProgreso() {
  localStorage.setItem("estadoCursos", JSON.stringify(estado));
}

function cargarProgreso() {
  const guardado = localStorage.getItem("estadoCursos");
  if (guardado) estado = JSON.parse(guardado);
}

function crearMalla() {
  cargarProgreso();
  const contenedor = document.getElementById("contenedor-malla");
  contenedor.innerHTML = "";

  Object.entries(cursosPorCiclo).forEach(([ciclo, cursos]) => {
    const divCiclo = document.createElement("div");
    divCiclo.className = "ciclo";

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    titulo.onclick = () => cursosDiv.style.display = cursosDiv.style.display === "none" ? "flex" : "none";
    divCiclo.appendChild(titulo);

    const cursosDiv = document.createElement("div");
    cursosDiv.className = "cursos";

    cursos.forEach(nombre => {
      const cursoDiv = document.createElement("div");
      cursoDiv.className = "curso";
      cursoDiv.textContent = nombre;

      if (!estado[nombre]) {
        estado[nombre] = {
          aprobado: false,
          bloqueado: dependencias[nombre]?.length > 0
        };
      }

      actualizarEstiloCurso(cursoDiv, nombre);

      cursoDiv.onclick = () => aprobarCurso(nombre);
      cursosDiv.appendChild(cursoDiv);
    });

    divCiclo.appendChild(cursosDiv);
    contenedor.appendChild(divCiclo);
  });
}

function actualizarEstiloCurso(div, nombre) {
  div.classList.remove("bloqueado", "aprobado");
  if (estado[nombre].aprobado) div.classList.add("aprobado");
  else if (estado[nombre].bloqueado) div.classList.add("bloqueado");
}

function aprobarCurso(nombre) {
  if (estado[nombre].bloqueado || estado[nombre].aprobado) return;
  estado[nombre].aprobado = true;

  Object.entries(dependencias).forEach(([pre, siguientes]) => {
    siguientes.forEach(dep => {
      if (dependencias[dep]) {
        const requisitos = dependencias[dep];
        const aprobados = requisitos.every(req => estado[req]?.aprobado);
        if (aprobados) estado[dep].bloqueado = false;
      }
    });
  });

  guardarProgreso();
  crearMalla();
}

function reiniciarMalla() {
  if (confirm("¿Estás segura de reiniciar tu malla? Esto borrará tu progreso.")) {
    localStorage.removeItem("estadoCursos");
    estado = {};
    crearMalla();
  }
}

document.getElementById("resetBtn").onclick = reiniciarMalla;

crearMalla();
