// Objeto Pelicula
function Pelicula(nombre, descripcion, genero, anio, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.genero = genero;
    this.anio = anio;
    this.imagen = imagen;
}

// Crear algunas películas de terror de zombies
var pelicula1 = new Pelicula(
    "La noche de los muertos vivientes",
    "Un grupo de personas se refugia en una casa para sobrevivir a un ataque de zombies.",
    "Terror/Zombies",
    1968,
    "IMAGENES/film1.jpg"
);

var pelicula2 = new Pelicula(
    "Guerra Mundial Z",
    "Un exinvestigador de la ONU viaja por el mundo para detener una pandemia zombie.",
    "Terror/Zombies",
    2013,
    "IMAGENES/film2.jpg"
);

var pelicula3 = new Pelicula(
    "28 semanas después",
    "Seis meses después del brote inicial, Londres intenta repoblarse, pero el virus vuelve a propagarse.",
    "Terror/Zombies",
    2007,
    "IMAGENES/film3.jpg"
);

var pelicula4 = new Pelicula(
    "REC",
    "Una reportera y su camarógrafo quedan atrapados en un edificio infectado por un virus mortal.",
    "Terror/Zombies",
    2007,
    "IMAGENES/film4.jpg"
);

var pelicula5 = new Pelicula(
    "El amanecer de los muertos",
    "Un grupo de personas se refugia en un centro comercial para sobrevivir a una invasión zombie.",
    "Terror/Zombies",
    2004,
    "IMAGENES/film5.jpg"
);

var pelicula6 = new Pelicula(
    "Train to Busan",
    "Pasajeros de un tren luchan por sobrevivir a un brote zombie en Corea del Sur.",
    "Terror/Zombies",
    2016,
    "IMAGENES/film6.jpg"
);

// Objeto Filmoteca
var filmoteca = {
    peliculas: [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5, pelicula6]
};

// Método para agregar una película a la filmoteca
filmoteca.agregarPelicula = function(nombre, descripcion, genero, anio, imagen) {
    var nuevaPelicula = new Pelicula(nombre, descripcion, genero, anio, imagen);
    this.peliculas.push(nuevaPelicula);
};

// Guardar en localStorage
function guardarFilmoteca() {
    localStorage.setItem('filmoteca', JSON.stringify(filmoteca.peliculas));
}
// Cargar desde localStorage
function cargarFilmoteca() {
    var guardadas = localStorage.getItem('filmoteca');
    if (guardadas) {
        var pelis = JSON.parse(guardadas);
        filmoteca.peliculas = pelis.map(function(p) {
            return new Pelicula(p.nombre, p.descripcion, p.genero, p.anio, p.imagen);
        });
    }
}

// Mostrar las películas en consola
console.log(filmoteca);

// Función para mostrar las películas en la web
function mostrarPeliculas() {
    var contenedor = document.getElementById('peliculas-container');
    contenedor.innerHTML = '';
    filmoteca.peliculas.forEach(function(pelicula, i) {
        var tarjeta = document.createElement('div');
        tarjeta.className = 'pelicula-card';
        tarjeta.innerHTML = `
            <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
            <h2>${pelicula.nombre}</h2>
            <p><strong>Género:</strong> ${pelicula.genero}</p>
            <p><strong>Año:</strong> ${pelicula.anio}</p>
            <p>${pelicula.descripcion}</p>
            <button class="btn-borrar" data-indice="${i}">Borrar</button>
            <button class="btn-editar" data-indice="${i}">Editar</button>
        `;
        contenedor.appendChild(tarjeta);
    });
    // Añadir evento a los botones de borrar
    var botonesBorrar = document.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach(function(btn) {
        btn.onclick = function() {
            var indice = parseInt(this.getAttribute('data-indice'));
            filmoteca.peliculas.splice(indice, 1);
            guardarFilmoteca();
            mostrarPeliculas();
        };
    });
    // Añadir evento a los botones de editar
    var botonesEditar = document.querySelectorAll('.btn-editar');
    botonesEditar.forEach(function(btn) {
        btn.onclick = function() {
            var indice = parseInt(this.getAttribute('data-indice'));
            var peli = filmoteca.peliculas[indice];
            // Mostrar el formulario con los datos de la película a editar
            document.getElementById('form-campos').style.display = 'block';
            document.getElementById('nombre').value = peli.nombre;
            document.getElementById('descripcion').value = peli.descripcion;
            document.getElementById('genero').value = peli.genero;
            document.getElementById('anio').value = peli.anio;
            document.getElementById('imagen').value = peli.imagen;
            document.getElementById('btn-mostrar-form').disabled = true;
            // Hacer scroll suave al formulario
            document.getElementById('form-campos').scrollIntoView({behavior: 'smooth'});
            // Cambiar el evento del botón aceptar para editar
            var btnAceptar = document.getElementById('btn-aceptar');
            btnAceptar.onclick = function() {
                var nombre = document.getElementById('nombre').value;
                var descripcion = document.getElementById('descripcion').value;
                var genero = document.getElementById('genero').value;
                var anio = parseInt(document.getElementById('anio').value);
                var imagen = document.getElementById('imagen').value;
                if(nombre && descripcion && genero && anio && imagen) {
                    filmoteca.peliculas[indice] = new Pelicula(nombre, descripcion, genero, anio, imagen);
                    guardarFilmoteca();
                    mostrarPeliculas();
                    document.getElementById('form-campos').style.display = 'none';
                    document.getElementById('btn-mostrar-form').disabled = false;
                    document.getElementById('nombre').value = '';
                    document.getElementById('descripcion').value = '';
                    document.getElementById('genero').value = '';
                    document.getElementById('anio').value = '';
                    document.getElementById('imagen').value = '';
                } else {
                    alert('Por favor, rellena todos los campos.');
                }
            };
        };
    });
}

// Mostrar las películas al cargar la página
window.onload = function() {
    cargarFilmoteca();
    mostrarPeliculas();
    // Modificar los lugares donde se agregan, editan o borran películas para guardar
    var btnMostrarForm = document.getElementById('btn-mostrar-form');
    var formCampos = document.getElementById('form-campos');
    var btnAceptar = document.getElementById('btn-aceptar');

    btnMostrarForm.onclick = function() {
        formCampos.style.display = 'block';
        btnMostrarForm.disabled = true;
        btnAceptar.onclick = function() {
            var nombre = document.getElementById('nombre').value;
            var descripcion = document.getElementById('descripcion').value;
            var genero = document.getElementById('genero').value;
            var anio = parseInt(document.getElementById('anio').value);
            var imagen = document.getElementById('imagen').value;
            if(nombre && descripcion && genero && anio && imagen) {
                filmoteca.agregarPelicula(nombre, descripcion, genero, anio, imagen);
                guardarFilmoteca();
                mostrarPeliculas();
                formCampos.style.display = 'none';
                btnMostrarForm.disabled = false;
                document.getElementById('nombre').value = '';
                document.getElementById('descripcion').value = '';
                document.getElementById('genero').value = '';
                document.getElementById('anio').value = '';
                document.getElementById('imagen').value = '';
            } else {
                alert('Por favor, rellena todos los campos.');
            }
        };
    };
};
