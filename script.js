let reservas = [];
let indiceEditar = -1;

function registrarReserva() {
  const nombre = document.getElementById("nombre").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const actividad = document.getElementById("actividad").value;
  const fecha = document.getElementById("fecha").value;

  if (!nombre || !matricula || !actividad || !fecha) {
    alert("Por favor complete todos los campos.");
    return;
  }

  if (!/^[A-Za-z0-9]{8}$/.test(matricula)) {
    alert("La matrícula debe contener exactamente 8 caracteres alfanuméricos.");
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];
  if (fecha < hoy) {
    alert("La fecha debe ser actual o futura.");
    return;
  }

  const reserva = { nombre, matricula, actividad, fecha };

  if (indiceEditar === -1) {
    reservas.push(reserva);
  } else {
    reservas[indiceEditar] = reserva;
    indiceEditar = -1;
    document.getElementById("cancelarBtn").style.display = "none";
  }

  limpiarFormulario();
  mostrarReservas();
}

function mostrarReservas() {
  const tabla = document.getElementById("tablaReservas");
  tabla.innerHTML = "";

  reservas.forEach((r, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.matricula}</td>
        <td>${r.actividad}</td>
        <td>${r.fecha}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editarReserva(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarReserva(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editarReserva(index) {
  const r = reservas[index];
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("matricula").value = r.matricula;
  document.getElementById("actividad").value = r.actividad;
  document.getElementById("fecha").value = r.fecha;
  indiceEditar = index;
  document.getElementById("cancelarBtn").style.display = "inline";
}

function eliminarReserva(index) {
  if (confirm("¿Deseas eliminar esta reserva?")) {
    reservas.splice(index, 1);
    mostrarReservas();
  }
}

function cancelarEdicion() {
  limpiarFormulario();
  indiceEditar = -1;
  document.getElementById("cancelarBtn").style.display = "none";
}

function limpiarFormulario() {
  document.getElementById("formReserva").reset();
}

// Inicial
mostrarReservas();
