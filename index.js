function mostrarModal(mensaje) {
  document.getElementById('modalMensaje').textContent = mensaje;
  document.getElementById('modalAlert').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalAlert').style.display = 'none';
}

function agregarTarea() {
  let nuevaTareaTexto = document.getElementById("nuevaTarea").value;
  if (nuevaTareaTexto === "") {
    mostrarModal("Ingrese una tarea, no puede estar vacía");
    return;
  }

  let nuevaTarea = document.createElement("li");
  let textoTarea = document.createElement("span");
  textoTarea.textContent = nuevaTareaTexto;

  let botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.className = "boton-futurista";
  botonEliminar.onclick = function () {
    nuevaTarea.remove();
    guardarTareas();
  };

  nuevaTarea.appendChild(textoTarea);
  nuevaTarea.appendChild(botonEliminar);
  document.getElementById("listaTareas").appendChild(nuevaTarea);
  document.getElementById("nuevaTarea").value = "";

  guardarTareas();
}

function guardarTareas() {
  let listaTareas = document.getElementById("listaTareas").innerHTML;
  localStorage.setItem("tareas", listaTareas);
}

function cargarTareas() {
  let listaTareasGuardadas = localStorage.getItem("tareas");
  if (listaTareasGuardadas) {
    document.getElementById("listaTareas").innerHTML = listaTareasGuardadas;

    let botonesEliminar = document.querySelectorAll("#listaTareas button");
    botonesEliminar.forEach((boton) => {
      boton.onclick = function () {
        boton.parentElement.remove();
        guardarTareas();
      };
      boton.className = "boton-futurista";
    });
  }
}

document.addEventListener("DOMContentLoaded", cargarTareas);