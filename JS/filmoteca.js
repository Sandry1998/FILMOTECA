// Objeto Pelicula 
function Pelicula(nombre, descripcion, genero, anio, imagen, visto) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.genero = genero;
    this.anio = anio;
    this.imagen = imagen;
    this.visto = visto || false;
}

// Películas iniciales
var peliculas = [
    new Pelicula("La noche de los muertos vivientes", "Un grupo de personas se refugia en una casa para sobrevivir a un ataque de zombies.", "Terror/Zombies", 1968, "IMAGENES/film1.jpg"),
    new Pelicula("Guerra Mundial Z", "Un exinvestigador de la ONU viaja por el mundo para detener una pandemia zombie.", "Terror/Zombies", 2013, "IMAGENES/film2.jpg"),
    new Pelicula("28 semanas después", "Seis meses después del brote inicial, Londres intenta repoblarse, pero el virus vuelve a propagarse.", "Terror/Zombies", 2007, "IMAGENES/film3.jpg"),
    new Pelicula("REC", "Una reportera y su camarógrafo quedan atrapados en un edificio infectado por un virus mortal.", "Terror/Zombies", 2007, "IMAGENES/film4.jpg"),
    new Pelicula("El amanecer de los muertos", "Un grupo de personas se refugia en un centro comercial para sobrevivir a una invasión zombie.", "Terror/Zombies", 2004, "IMAGENES/film5.jpg"),
    new Pelicula("Train to Busan", "Pasajeros de un tren luchan por sobrevivir a un brote zombie en Corea del Sur.", "Terror/Zombies", 2016, "IMAGENES/film6.jpg")
];

// Cargar películas desde localStorage si existen
if(localStorage.getItem('filmoteca')){
    peliculas = JSON.parse(localStorage.getItem('filmoteca')).map(function(p){
        return new Pelicula(p.nombre, p.descripcion, p.genero, p.anio, p.imagen, p.visto);
    });
}

// Mostrar películas en el HTML
function mostrarPeliculas() {
    var cont = document.getElementById('peliculas-container');
    cont.innerHTML = '';
    peliculas.forEach(function(p, i) {
        var div = document.createElement('div');
        div.className = 'pelicula-card';
        var visto = p.visto ? '<span style="color:#bfa14a;font-weight:bold;">(Visto)</span>' : '';
        var iconoVisto = p.visto ? 'IMAGENES/hide.png' : 'IMAGENES/view.png';
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h2>${p.nombre} ${visto}</h2>
            <p><strong>Género:</strong> ${p.genero}</p>
            <p><strong>Año:</strong> ${p.anio}</p>
            <p>${p.descripcion}</p>
            <div style="display:flex; justify-content:center; gap:10px; margin-top:12px;">
                <button type="button" class="btn-accion" onclick="borrarPelicula(${i})">Borrar</button>
                <button type="button" class="btn-accion" onclick="editarPelicula(${i})">Editar</button>
            </div>
            <div style="display:flex; justify-content:center; margin-top:18px;">
                <button type="button" class="btn-accion" onclick="marcarVisto(${i})" style="background:none;box-shadow:none;padding:0;margin:0;">
                    <img src="${iconoVisto}" alt="Visto" style="height:44px;vertical-align:middle;background:none;border:none;">
                </button>
            </div>
        `;
        cont.appendChild(div);
    });
    localStorage.setItem('filmoteca', JSON.stringify(peliculas));
}

// Agregar película
function agregarPelicula(nombre, descripcion, genero, anio, imagen) {
    peliculas.push(new Pelicula(nombre, descripcion, genero, anio, imagen));
    mostrarPeliculas();
}

// Borrar película
function borrarPelicula(i) {
    peliculas.splice(i, 1);
    mostrarPeliculas();
}

// Marcar como visto
function marcarVisto(i) {
    peliculas[i].visto = !peliculas[i].visto;
    mostrarPeliculas();
}

// Editar película
function editarPelicula(i) {
    var p = peliculas[i];
    document.getElementById('form-campos').style.display = 'block';
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('descripcion').value = p.descripcion;
    document.getElementById('genero').value = p.genero;
    document.getElementById('anio').value = p.anio;
    document.getElementById('imagen').value = p.imagen;
    document.getElementById('btn-mostrar-form').disabled = true;
    document.getElementById('form-campos').scrollIntoView({behavior: 'smooth'});
    var btnAceptar = document.getElementById('btn-aceptar');
    btnAceptar.onclick = function() {
        var nombre = document.getElementById('nombre').value;
        var descripcion = document.getElementById('descripcion').value;
        var genero = document.getElementById('genero').value;
        var anio = parseInt(document.getElementById('anio').value);
        var imagen = document.getElementById('imagen').value;
        if(nombre && descripcion && genero && anio && imagen) {
            peliculas[i] = new Pelicula(nombre, descripcion, genero, anio, imagen, p.visto);
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
}

// Al cargar la página
window.onload = function() {
    mostrarPeliculas();
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
                agregarPelicula(nombre, descripcion, genero, anio, imagen);
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
