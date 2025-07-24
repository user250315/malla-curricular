// scripts.js

const cursos = {
  "Vida universitaria y gestión del conocimiento": [],
  "Lógico matemático": [],
  "Redacción e interpretación de textos": [],
  "Geometría analítica y álgebra lineal": ["Cálculo Diferencial", "Diseño gráfico de ingeniería I", "Estadística básica I"],
  "Química": ["Tecnología de los materiales y del concreto"],
  "Introducción a la ingeniería civil": [],
  "Geología general": ["Mecánica de suelos I", "Curso integrado de ingeniería civil I"],

  "Inglés I": ["Inglés II"],
  "Filosofía": [],
  "Realidad nacional": [],
  "Comunicación y medios digitales": [],
  "Cálculo Diferencial": ["Cálculo integral"],
  "Física I": ["Estática", "Física II"],
  "Tecnología de los materiales y del concreto": ["Construcción I", "Curso integrado de ingeniería civil I", "Curso integrador de ingeniería III"],

  "Inglés II": [],
  "Interculturalidad": [],
  "Pensamiento crítico, creativo y emprendimiento": [],
  "Cálculo integral": ["Cálculo numérico"],
  "Estática": ["Dinámica", "Resistencia de materiales I"],
  "Física II": ["Resistencia de materiales I"],
  "Diseño gráfico de ingeniería I": ["Topografía", "Diseño gráfico de ingeniería II", "Curso integrado de ingeniería civil I"],

  "Ciudadanía global y desarrollo sostenible": [],
  "Estadística básica I": ["Estadística básica II"],
  "Cálculo numérico": [],
  "Dinámica": ["Instalaciones eléctricas, sanitarias, de gas y electromecánicas", "Mecánica de fluidos"],
  "Topografía": ["Geodesia Satelital", "Mecánica de suelos I", "Curso integrado de ingeniería civil I"],
  "Resistencia de materiales I": ["Estructura y cargas", "Resistencia de materiales II", "Curso integrado de ingeniería civil I"],
  "Diseño gráfico de ingeniería II": ["Instalaciones eléctricas, sanitarias, de gas y electromecánicas", "Caminos", "Curso integrador de ingeniería II"],

  "Estadística básica II": ["Metodología de la investigación", "Diseño de experimentos y herramientas para la investigación"],
  "Geodesia Satelital": [],
  "Estructura y cargas": ["Curso integrador de ingeniería II"],
  "Mecánica de suelos I": ["Mecánica de suelos II", "Caminos"],
  "Resistencia de materiales II": ["Análisis estructural I"],
  "Construcción I": ["Curso integrado de ingeniería civil I", "Construcción II"],
  "Curso integrado de ingeniería civil I": ["Elaboración y evaluación de proyectos en ingeniería", "Curso integrador de ingeniería II"],

  "Metodología de la investigación": ["Redacción científica"],
  "Instalaciones eléctricas, sanitarias, de gas y electromecánicas": ["Curso integrador de ingeniería II", "Curso integrado de ingeniería civil III"],
  "Construcción II": ["Elaboración y evaluación de proyectos en ingeniería", "Curso integrador de ingeniería II"],
  "Análisis estructural I": ["Análisis estructural II", "Concreto armado I"],
  "Mecánica de fluidos": ["Hidráulica de canales y tuberías", "Hidrología general", "Agua y alcantarillado", "Obras Hidráulicas"],
  "Mecánica de suelos II": ["Pavimentos", "Curso integrador de ingeniería II"],
  "Caminos": ["Pavimentos", "Puentes y obras de arte"],

  "Redacción científica": [],
  "Elaboración y evaluación de proyectos en ingeniería": ["Costos, presupuesto y programación de obras", "Curso integrado de ingeniería civil III"],
  "Análisis estructural II": ["Vulnerabilidad e ingeniería sismorresistente", "Curso integrador de ingeniería II", "Diseño en acero y madera", "Puentes y obras de arte"],
  "Concreto armado I": ["Concreto armado II", "Curso integrador de ingeniería II"],
  "Hidráulica de canales y tuberías": ["Agua y alcantarillado", "Obras Hidráulicas"],
  "Hidrología general": [],
  "Pavimentos": [],

  "Diseño de experimentos y herramientas para la investigación": ["Trabajo de investigación I"],
  "Ética y profesionalismo": [],
  "Vulnerabilidad e ingeniería sismorresistente": [],
  "Concreto armado II": ["Puentes y obras de arte"],
  "Agua y alcantarillado": [],
  "Costos, presupuesto y programación de obras": ["Curso integrado de ingeniería civil III"],
  "Curso integrador de ingeniería II": ["Gestión de la calidad y productividad en construcción", "Curso integrado de ingeniería civil III"],

  "Trabajo de investigación I": ["Trabajo de investigación II"],
  "Legislación para la ingeniería civil": [],
  "Diseño en acero y madera": [],
  "Puentes y obras de arte": [],
  "Obras Hidráulicas": [],
  "Electivo 1": [],
  "Electivo 2": [],

  "Trabajo de investigación II": [],
  "Gestión de la calidad y productividad en construcción": [],
  "Prácticas Pre – profesionales": [],
  "Curso integrado de ingeniería civil III": [],
  "Electivo 3": [],
  "Electivo 4": []
};

const estado = {};

function crearMalla() {
  const contenedor = document.getElementById("contenedor-malla");
  Object.keys(cursos).forEach(nombre => {
    const div = document.createElement("div");
    div.className = "curso bloqueado";
    div.textContent = nombre;
    div.onclick = () => aprobarCurso(nombre);
    estado[nombre] = { aprobado: false, bloqueado: cursos[nombre].length > 0 };
    if (estado[nombre].bloqueado === false) div.classList.remove("bloqueado");
    contenedor.appendChild(div);
  });
}

function aprobarCurso(nombre) {
  const divs = document.querySelectorAll(".curso");
  const div = Array.from(divs).find(d => d.textContent === nombre);
  if (estado[nombre].bloqueado || estado[nombre].aprobado) return;
  estado[nombre].aprobado = true;
  div.classList.add("aprobado");

  Object.entries(cursos).forEach(([curso, requisitos]) => {
    if (requisitos.includes(nombre)) {
      const pendientes = requisitos.filter(req => !estado[req].aprobado);
      if (pendientes.length === 0) {
        const divCurso = Array.from(divs).find(d => d.textContent === curso);
        divCurso.classList.remove("bloqueado");
        estado[curso].bloqueado = false;
      }
    }
  });
}

crearMalla();
