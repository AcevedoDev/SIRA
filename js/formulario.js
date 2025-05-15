function mostrarCamposAdicionales() {
    const perfilSeleccionado = document.getElementById("perfil").value;
    const razonVisitaTextarea = document.getElementById("razonVisita"); // Declaración única de la variable
    // Oculta todos los campos adicionales
    document.getElementById("camposAdministrativo").style.display = "none";
    document.getElementById("camposEstudiante").style.display = "none";
    document.getElementById("camposEgresado").style.display = "none";
    document.getElementById("camposInstructor").style.display = "none";
    document.getElementById("camposOtro").style.display = "none";

    //Restablece la validez de los campos
    const camposEstudianteFicha = document.getElementById("ficha");
    if (camposEstudianteFicha) {
        camposEstudianteFicha.required = false;
    }
    const camposEstudiantePrograma = document.getElementById("programa");
    if (camposEstudiantePrograma) {
        camposEstudiantePrograma.required = false;
    }
    const camposEgresadoAnioGraduacion = document.getElementById("anioGraduacion");
    if (camposEgresadoAnioGraduacion) {
        camposEgresadoAnioGraduacion.required = false;
    }
    const camposInstructorTipoContrato = document.getElementById("tipoContrato");
    if (camposInstructorTipoContrato) {
        camposInstructorTipoContrato.required = false;
    }
    const camposInstructorAreaEnsenanza = document.getElementById("areaEnsenanzaInstructor");
    if (camposInstructorAreaEnsenanza) {
        camposInstructorAreaEnsenanza.required = false;
    }
    const camposOtroDescripcion = document.getElementById("descripcionOtro");
    if (camposOtroDescripcion) {
        camposOtroDescripcion.required = false;
    }
    const cargoAdministrativoSelect = document.getElementById("cargoAdministrativo");
    if (cargoAdministrativoSelect) {
        cargoAdministrativoSelect.required = false;
    }

    if (razonVisitaTextarea) {
        razonVisitaTextarea.required = false;
    }

    // Muestra los campos correspondientes al perfil seleccionado
    if (perfilSeleccionado === "administrativo") {
        document.getElementById("camposAdministrativo").style.display = "block";
        if (cargoAdministrativoSelect) {
            cargoAdministrativoSelect.required = true;
        }
    } else if (perfilSeleccionado === "estudiante") {
        document.getElementById("camposEstudiante").style.display = "block";
        if (camposEstudianteFicha) {
            camposEstudianteFicha.required = true;
        }
        if (camposEstudiantePrograma) {
            camposEstudiantePrograma.required = true;
        }
    } else if (perfilSeleccionado === "egresado") {
        document.getElementById("camposEgresado").style.display = "block";
        if (camposEgresadoAnioGraduacion) {
            camposEgresadoAnioGraduacion.required = true;
        }
        if (razonVisitaTextarea) {
            razonVisitaTextarea.required = true;
        }
    } else if (perfilSeleccionado === "instructor") {
        document.getElementById("camposInstructor").style.display = "block";
        if (camposInstructorTipoContrato) {
            camposInstructorTipoContrato.required = true;
        }
        if (camposInstructorAreaEnsenanza) {
            camposInstructorAreaEnsenanza.required = true;
        }
    } else if (perfilSeleccionado === "otro") {
        document.getElementById("camposOtro").style.display = "block";
        if (camposOtroDescripcion) {
            camposOtroDescripcion.required = true;
        }
        if (razonVisitaTextarea) {
            razonVisitaTextarea.required = true;
        }
    }
}
// Validación del formulario con Bootstrap
(function () {
    'use strict'

    // Obtener el formulario al que queremos añadir la validación de Bootstrap
    var formulario = document.querySelector('.needs-validation')

    formulario.addEventListener('submit', function (event) {
        if (!formulario.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        formulario.classList.add('was-validated')
    }, false)
})()

//Al hacer scroll la nav y el footer se ocultan
  let lastScrollTop = 0;
  const navbar = document.getElementById('mainNavbar');
  const footer = document.getElementById('mainFooter');

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll hacia abajo: ocultar navbar y footer
      navbar.classList.add('navbar-hidden');
      footer.classList.add('footer-hidden');
    } else {
      // Scroll hacia arriba: mostrar navbar y footer
      navbar.classList.remove('navbar-hidden');
      footer.classList.remove('footer-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
  });


  // LOADING 

window.addEventListener('load', function() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('hide');
    setTimeout(() => overlay.style.display = 'none', 400);
  });
  