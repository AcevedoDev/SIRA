// Al cargar la página, mostrar el historial completo automáticamente
document.addEventListener('DOMContentLoaded', function() {
    cargarHistorialTodos();
  });
  
  function cargarHistorialTodos() {
    fetch('api_historial_todos.php') // Este endpoint debe devolver TODOS los registros
      .then(response => response.json())
      .then(result => {
        if (!result.success) {
          alert('Error al cargar los registros: ' + result.message);
          return;
        }
  
        const registros = result.data;
        const listGroup = document.querySelector('.list-group');
        listGroup.innerHTML = ''; // Limpiar lista actual
  
        registros.forEach(registro => {
          const fotoUrl = registro.FOTO || 'https://randomuser.me/api/portraits/lego/1.jpg';
  
          const item = document.createElement('a');
          item.href = '#';
          item.className = 'list-group-item list-group-item-action registro-item py-3 d-flex align-items-center';
          item.dataset.id = registro.IDENTIFICACION;
  
          item.innerHTML = `
            <img src="${fotoUrl}" class="profile-img rounded-circle me-3" style="width: 60px; height: 60px; object-fit: cover;" />
            <div class="flex-grow-1">
              <h6 class="mb-1">${registro.NOMBRE_COMPLETO}</h6>
              <small class="text-muted">${registro.PROGRAMA}</small>
            </div>
            <div class="text-center mx-4" style="min-width: 70px;">
              <small class="text-muted d-block mb-1">Fecha</small>
              <span class="fw-bold">${registro.FECHA || '-'}</span>
            </div>
            <div class="text-center mx-4" style="min-width: 70px;">
              <small class="text-muted d-block mb-1">Entrada</small>
              <span class="fw-bold">${registro.HORA_ENTRADA || '-'}</span>
            </div>
            <div class="text-center mx-4" style="min-width: 70px;">
              <small class="text-muted d-block mb-1">Salida</small>
              <span class="fw-bold">${registro.HORA_SALIDA || '-'}</span>
            </div>
            <div class="mx-4" style="min-width: 180px;">
              <textarea class="form-control form-control-sm" placeholder="Escriba la observación" rows="3" readonly>${registro.OBSERVACION || ''}</textarea>
            </div>
            <div class="d-flex flex-column align-items-center mx-3" style="min-width: 80px;">
              <div class="mb-2 text-center">
                <small class="text-muted d-block">Ingresó</small>
                <input type="checkbox" ${registro.ingreso ? 'checked' : ''} disabled />
              </div>
              <div class="text-center">
                <small class="text-muted d-block">Salió</small>
                <input type="checkbox" ${registro.salida ? 'checked' : ''} disabled />
              </div>
            </div>
          `;
  
          listGroup.appendChild(item);
        });
  
      })
      .catch(error => {
        console.error('Error al cargar el historial:', error);
        alert('Error al cargar el historial. Revisa la consola para más detalles.');
      });
  }
  
  // Redirigir al perfil al hacer clic en un registro (solo en historialTodos)
  document.querySelector('.list-group').addEventListener('click', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const item = e.target.closest('.list-group-item');
    if (item) {
      const id = item.dataset.id;
      if (id) {
        window.location.href = `perfil.html?id=${id}`;
      }
    }
  });
  
  // LOADING 

window.addEventListener('load', function() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('hide');
  setTimeout(() => overlay.style.display = 'none', 400);
});
