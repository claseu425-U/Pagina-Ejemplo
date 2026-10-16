const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");

btnMenu.addEventListener("click", () => {
  menu.classList.toggle("abierto");
  btnMenu.classList.toggle("activo");    // anima las rayitas
});

// cerrar el menú al hacer clic en un enlace
document.querySelectorAll("#menu a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
    btnMenu.classList.remove("activo");
  });
});

const titulos = document.querySelectorAll(".accordion .titulo");

titulos.forEach(titulo => {
  titulo.addEventListener("click", () => {
    const item = titulo.parentElement;

    // cerrar los demás (quitar esta línea si se quieren varios abiertos)
    document.querySelectorAll(".accordion .item").forEach(otro => {
      if (otro !== item) otro.classList.remove("activo");
    });

    item.classList.toggle("activo");
  });
});

 
// Carga dinamica de articles 

const servicios = [
  { titulo: "Lavado",   precio: 8000,  img: "img/s1.jpg" },
  { titulo: "Pulido",   precio: 15000, img: "img/s2.jpg" },
  { titulo: "Encerado", precio: 12000, img: "img/s3.jpg" }
  // agrega más objetos hasta tener las seis tarjetas
];

const contenedor = document.querySelector("#cards");

function pintarCards(lista) {
  contenedor.innerHTML = "";           // limpiar antes de dibujar
  lista.forEach(s => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    art.innerHTML = `
    //   <img src="${s.img}" alt="${s.titulo}">
      <h3>${s.titulo}</h3>
      <p>₡${s.precio}</p>`;
    contenedor.appendChild(art);
  });
}


  if (contenedor) pintarCards(servicios);

const slides = document.querySelectorAll(".slide");
let actual = 0;

function mostrar(i) {
  slides.forEach(s => s.classList.remove("activa"));
  slides[i].classList.add("activa");
}

if (slides.length > 0) {            // solo en la página que tiene carrusel
  document.querySelector("#siguiente").addEventListener("click", () => {
    actual = (actual + 1) % slides.length;     // vuelve a 0 al final
    mostrar(actual);
  });

  document.querySelector("#anterior").addEventListener("click", () => {
    actual = (actual - 1 + slides.length) % slides.length;
    mostrar(actual);
  });
}

//Validacion contact form

const form = document.querySelector(".formulario");

if (form) {                          // solo en contacto
  form.addEventListener("submit", (e) => {
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    let errores = [];

    if (nombre === "") errores.push("El nombre es obligatorio.");
    if (!correo.includes("@")) errores.push("El correo no es válido.");

   

    if (errores.length > 0) {
      e.preventDefault();                       // detiene el envío
      document.querySelector("#mensajes").textContent = errores.join(" ");
    }
  });
}