
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');

  // Mensaje de advertencia
  function mostrarAdvertencia(mensaje) {
    let advertencia = document.getElementById('advertencia-login');
    if (!advertencia) {
      advertencia = document.createElement('div');
      advertencia.id = 'advertencia-login';
      advertencia.className = 'alert alert-danger mt-3';
      loginForm.prepend(advertencia);
    }
    advertencia.textContent = mensaje;
  }

  // Elimina advertencia
  function eliminarAdvertencia() {
    const advertencia = document.getElementById('advertencia-login');
    if (advertencia) advertencia.remove();
  }

  loginForm.addEventListener('submit', function (e) {
    eliminarAdvertencia();

    let valido = true;

    // Validar campos vacíos
    if (!usuarioInput.value.trim()) {
      usuarioInput.classList.add('is-invalid');
      usuarioInput.nextElementSibling.textContent = 'Por favor ingresa tu usuario o correo.';
      valido = false;
    } else {
      usuarioInput.classList.remove('is-invalid');
      usuarioInput.nextElementSibling.textContent = '';
    }

    if (!passwordInput.value.trim()) {
      passwordInput.classList.add('is-invalid');
      passwordInput.nextElementSibling.textContent = 'Por favor ingresa tu contraseña.';
      valido = false;
    } else {
      passwordInput.classList.remove('is-invalid');
      passwordInput.nextElementSibling.textContent = '';
    }

    if (!valido) {
      mostrarAdvertencia('Por favor completa todos los campos.');
      e.preventDefault();
      return;
    }
    // Si todo está bien, el formulario se envía normalmente y el servidor valida las credenciales
  });

  // Elimina el rojo al escribir
  [usuarioInput, passwordInput].forEach(input => {
    input.addEventListener('input', function () {
      input.classList.remove('is-invalid');
      input.nextElementSibling.textContent = '';
      eliminarAdvertencia();
    });
  });
});