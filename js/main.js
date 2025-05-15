//CODIGO FUNCIONAL

//Función para buscar aprendiz y mostrar datos
function buscarRegistro() {
  const id = document.getElementById('inputIdentificacion').value.trim();
  if (!id) {
    alert('Por favor ingrese una identificación');
    return;
  }

  fetch('buscar_aprendiz.php?id=' + encodeURIComponent(id))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const aprendiz = data.data; 
        document.getElementById('nombreUsuario').innerText = aprendiz.NOMBRE_COMPLETO || '';
        document.getElementById('programa').innerText = aprendiz.PROGRAMA || '';
        document.getElementById('aprendizId').value = aprendiz.IDENTIFICACION || '';
        document.getElementById('horaEntrada').innerText = aprendiz.HORA_ENTRADA || '';
        document.getElementById('horaSalida').innerText = aprendiz.HORA_SALIDA || '';
        document.getElementById('observacion').value = aprendiz.OBSERVACION || '';

        // **AÑADIDO: actualizar enlace "Ver historial" con el ID correcto**
        const enlaceHistorial = document.getElementById('enlaceHistorial');
        if (enlaceHistorial) {
          enlaceHistorial.href = 'perfil.html?id=' + encodeURIComponent(aprendiz.IDENTIFICACION);
        }

        // Marcar checkboxes si ya tiene horas válidas (no vacías ni "00:00:00")
        const checkIngreso = document.getElementById('checkIngreso');
        const checkSalida = document.getElementById('checkSalida');
        const observacion = document.getElementById('observacion');
        const btnEnviar = document.getElementById('btnEnviar');

        const tieneEntrada = aprendiz.HORA_ENTRADA && aprendiz.HORA_ENTRADA !== "00:00:00";
        const tieneSalida = aprendiz.HORA_SALIDA && aprendiz.HORA_SALIDA !== "00:00:00";

        // Checkboxes: marcar y deshabilitar si ya tiene hora correspondiente
        checkIngreso.checked = tieneEntrada;
        checkIngreso.disabled = tieneEntrada;
        checkSalida.checked = tieneSalida;
        checkSalida.disabled = tieneSalida;

        // Observación: deshabilitar si ya hay una guardada
        if (aprendiz.OBSERVACION && aprendiz.OBSERVACION.trim() !== '') {
          observacion.setAttribute('disabled', 'disabled');
        } else {
          observacion.removeAttribute('disabled');
        }

        // El botón solo se deshabilita si ya tiene entrada Y salida
        if (tieneEntrada && tieneSalida) {
          btnEnviar.setAttribute('disabled', 'disabled');
        } else {
          btnEnviar.removeAttribute('disabled');
        }

      } else {
        alert(data.message);

        // Limpiar campos si no encontrado
        document.getElementById('nombreUsuario').innerText = '';
        document.getElementById('programa').innerText = '';
        document.getElementById('aprendizId').value = '';
        document.getElementById('horaEntrada').innerText = '';
        document.getElementById('horaSalida').innerText = '';
        document.getElementById('observacion').value = '';
        document.getElementById('checkIngreso').checked = false;
        document.getElementById('checkSalida').checked = false;
        document.getElementById('checkIngreso').disabled = false;
        document.getElementById('checkSalida').disabled = false;
        document.getElementById('observacion').removeAttribute('disabled');
        document.getElementById('btnEnviar').removeAttribute('disabled');

        // **AÑADIDO: restablecer enlace "Ver historial" a valor por defecto**
        const enlaceHistorial = document.getElementById('enlaceHistorial');
        if (enlaceHistorial) {
          enlaceHistorial.href = 'perfil.html?id=0000';
        }
      }
    })
    .catch(() => alert('Error al buscar aprendiz'));
}

// Función para guardar registro en historial
function guardarRegistro() {
  const id = document.getElementById('aprendizId').value;
  if (!id) {
    alert('Primero busca un aprendiz válido');
    return;
  }

  const checkIngreso = document.getElementById('checkIngreso').checked;
  const checkSalida = document.getElementById('checkSalida').checked;

  if (!checkIngreso && !checkSalida) {
    alert('Debes marcar al menos una opción: Ingresó o Salió');
    return;
  }

  // Obtener hora actual en formato HH:MM:SS
  const now = new Date();
  const horaActual = now.toTimeString().slice(0, 8);

  const observacion = document.getElementById('observacion').value;

  // Preparar datos para enviar en formato application/x-www-form-urlencoded
  const data = new URLSearchParams();
  data.append('id', id);
  data.append('checkIngreso', checkIngreso);
  data.append('checkSalida', checkSalida);
  data.append('horaEntrada', checkIngreso ? horaActual : '');
  data.append('horaSalida', checkSalida ? horaActual : '');
  data.append('observacion', observacion);
  console.log(data.toString());
  fetch('guardar_historial.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: data.toString()
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      alert(result.message);
      // Deshabilitar textarea y botón para evitar más ediciones
      document.getElementById('observacion').setAttribute('disabled', 'disabled');
      document.getElementById('btnEnviar').setAttribute('disabled', 'disabled');
    } else {
      alert('Error: ' + result.message);
    }
  })
  .catch(() => alert('Error al guardar registro'));
}

// Asignar eventos a botones
document.getElementById('btnBuscar').addEventListener('click', buscarRegistro);
document.getElementById('btnEnviar').addEventListener('click', function(e) {
  e.preventDefault();
  guardarRegistro();
});



 // Ejemplo: función para llenar los datos del offcanvas
  function cargarDatosOffcanvas() {
    document.getElementById('offcanvasNombreUsuario').textContent = document.getElementById('nombreUsuario').textContent;
    document.getElementById('offcanvasIdentificacion').textContent = document.getElementById('identificación').textContent;
    document.getElementById('offcanvasCelular').textContent = document.getElementById('celular').textContent;
    document.getElementById('offcanvasPerfil').textContent = document.getElementById('perfil').textContent;
    document.getElementById('offcanvasCorreo').textContent = document.getElementById('correo').textContent;
  }
  // Llama a la función cuando se muestre el offcanvas
  document.getElementById('userPanel').addEventListener('show.bs.offcanvas', cargarDatosOffcanvas);





//PARA VER EL HISTORIAL HOY!!!!!!!!!!!!!!!!!!



  // Redireccionar al historial del día al hacer clic en el botón "Hoy"
document.querySelector('.btn-outline-secondary').addEventListener('click', function() {
  // Redirecciona a la página historialXdia.html
  window.location.href = 'historialXdia.html';
});


//BOTON TODOS HISTORIAL

document.getElementById('btnTodos').addEventListener('click', function() {
  window.location.href = 'historialTodos.html';
});



// LOADING 

window.addEventListener('load', function() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('hide');
  setTimeout(() => overlay.style.display = 'none', 400);
});



  