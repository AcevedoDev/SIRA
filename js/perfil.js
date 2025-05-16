
//CON ESTE CODIGO SE MUESTRA EL HISTORIAL DE LA PERSONA BUSCADA Y APARECE EN PERFIL.HTML

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('inputIdentificacion');
    const enlace = document.getElementById('enlaceHistorial');
    
    if (input && enlace) {
      input.addEventListener('input', function() {
        const valor = input.value.trim();
        if (valor) {
          enlace.href = 'perfil.html?id=' + encodeURIComponent(valor);
        } else {
          enlace.href = 'perfil.html?id=0000'; // O cualquier valor por defecto
        }
      });
    }
  });
  
  

  
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  function cargarHistorial() {
    const id = getQueryParam('id');
    if (!id) {
      alert('No se encontró el ID del aprendiz.');
      return;
    }
  
    fetch('historial_aprendiz.php?id=' + encodeURIComponent(id))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          mostrarDatosPersonales(data.datos);
          mostrarHistorialEnTabla(data.historial);
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert('Error al cargar historial'));
  }
  
  function mostrarDatosPersonales(datos) {
    if (!datos) return;
    document.getElementById('nombreUsuario').innerText = datos.NOMBRE_COMPLETO || '';
    document.getElementById('programa').innerText = datos.PROGRAMA || '';
    document.getElementById('identificación').innerText = datos.IDENTIFICACION || '';
    document.getElementById('celular').innerText = datos.CELULAR || '';
    document.getElementById('perfil').innerText = datos.PERFIL || '';
    document.getElementById('correo').innerText = datos.CORREO || '';
    document.getElementById('ficha').innerText = datos.FICHA || '';
  }
  
  function mostrarHistorialEnTabla(historial) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
  
    if (!historial || historial.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center">Sin registros</td></tr>';
      return;
    }
  
    historial.forEach(reg => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${reg.FECHA}</td>
        <td>Mañana</td>
        <td>${reg.HORA_ENTRADA || '---:--'}</td>
        <td>${reg.HORA_SALIDA || '---:--'}</td>
        <td><textarea disabled>${reg.OBSERVACION || ''}</textarea></td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  document.addEventListener('DOMContentLoaded', cargarHistorial);
  

  // LOADING 

window.addEventListener('load', function() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('hide');
  setTimeout(() => overlay.style.display = 'none', 400);
});
