const numeroPersonaje = document.getElementById("numero");
const botonEnviar = document.getElementById("botoncito");
let numeroInput;
let urlRM = "";

const contenedor = document.getElementById("contenedor");

botonEnviar.addEventListener("click", probarFetch); //se recomienda hacerlo desde aqui

function probarFetch() {
  numeroInput = parseInt(numeroPersonaje.value); //poner siempre dentro de la funcion

  urlRM = `https://rickandmortyapi.com/api/character/${numeroInput}`;

  numeroPersonaje.value = ""; //para que se limpie el input

  fetch(urlRM)
    //.then(res => res.json())
    .then((res) => res.json())
    .then((data) => {
      console.log(data); //muestra los datos de ese personaje en especifico
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function verTodos() {
  urlRM = "https://rickandmortyapi.com/api/character"; ///?page=${numPagina}

  numeroPersonaje.value = ""; //no hace falta

  fetch(urlRM)
    //.then(res => res.json())
    .then((res) => res.json())
    .then((data) => {
      // for of facilita recorrer los elementos de un array
      // primero nombras el elemento ('perso') y después el conjunto del array (data.results)
      // bucle for..of para recorrer uno a uno (a cada uno le llamamos 'perso')
      for (let perso of data.results) {
        //pruebas de visualizar informacionen consola:
        console.log(data.results);
        console.log(data.results[0]); //primer personaje (tiene id:1)
        console.log(data.results[0].status); //muestra status del primer personaje
        console.log(data.results[0].species); //muestra especie del primer personaje

        // aqui se recorren todos uno a uno y se pueden ir añadiendo

        // crear fondo tarjeta (div)
        let card = document.createElement("div"); //crear el div, en HTML: <div></div>
        card.classList.add("card"); //y sobre ese div, añadir estilo CSS clase 'card'

        // crear elemento imagen
        let imagenPersonaje = document.createElement("img"); // en HTML <img>
        imagenPersonaje.src = perso.image; // src=url de la imagen:
        //  "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg"

        // crear elemento parrafo
        let nombrePersonaje = document.createElement("p"); // en HTML <p></p>
        nombrePersonaje.innerText = perso.name;

        //añadir imagen y texto a la tarjeta:
        card.appendChild(imagenPersonaje);
        card.appendChild(nombrePersonaje);

        // añadir la tarjeta al contenedor:
        contenedor.appendChild(card);
      }

      /* for each para cada uno llama a una función. No funciona bien con async/await
      data.results.forEach(perso => {
        console.log(perso.name);
      });*/
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
