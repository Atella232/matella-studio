document.addEventListener('DOMContentLoaded', () => {
    const generarEjercicioBtn = document.getElementById('generar-ejercicio');
    const problemaMatematicoDiv = document.getElementById('problema-matematico');
    const comprobarRespuestaBtn = document.getElementById('comprobar-respuesta');
    const mostrarSolucionBtn = document.getElementById('mostrar-solucion');
    const mensajeResultadoP = document.getElementById('mensaje-resultado');
    const explicacionSolucionDiv = document.getElementById('explicacion-solucion');

    if (!generarEjercicioBtn) return; // Si no estamos en la página correcta, no hacer nada

    let ejercicioActual = {
        ecuacion: "",
        solucion: 0
    };

    function generarNumero(max) {
        return Math.floor(Math.random() * (max * 2 + 1)) - max;
    }

    function generarEjercicio() {
        // Generar una ecuación simple del tipo ax + b = c
        let a, b, c, x;
        a = generarNumero(5) + 1; // Coeficiente de x (evitar 0)
        x = generarNumero(10);
        b = generarNumero(20);
        c = a * x + b;

        ejercicioActual.ecuacion = `${a}x + ${b} = ${c}`;
        ejercicioActual.solucion = x;

        // Mostrar el ejercicio
        problemaMatematicoDiv.innerHTML = `
            <span>${a}x + ${b} = ${c}</span>
            <input type="text" id="respuesta-usuario" placeholder="x = ?">
        `;

        // Limpiar resultados anteriores
        mensajeResultadoP.textContent = '';
        explicacionSolucionDiv.textContent = '';
        document.getElementById('respuesta-usuario').value = '';
        document.getElementById('respuesta-usuario').focus();
    }

    function comprobarRespuesta() {
        const respuestaUsuario = parseInt(document.getElementById('respuesta-usuario').value);
        if (isNaN(respuestaUsuario)) {
            mensajeResultadoP.textContent = 'Por favor, introduce un número.';
            mensajeResultadoP.style.color = 'orange';
            return;
        }

        if (respuestaUsuario === ejercicioActual.solucion) {
            mensajeResultadoP.textContent = '¡Correcto!';
            mensajeResultadoP.style.color = 'var(--quiz-feedback-correct-text)';
            mostrarSolucion();
        } else {
            mensajeResultadoP.textContent = 'Incorrecto. ¡Inténtalo de nuevo!';
            mensajeResultadoP.style.color = 'var(--quiz-feedback-incorrect-text)';
        }
    }

    function mostrarSolucion() {
        explicacionSolucionDiv.innerHTML = `
            <p><b>Ecuación:</b> ${ejercicioActual.ecuacion}</p>
            <p><b>Solución:</b> x = ${ejercicioActual.solucion}</p>
        `;
    }

    // Event Listeners
    generarEjercicioBtn.addEventListener('click', generarEjercicio);
    comprobarRespuestaBtn.addEventListener('click', comprobarRespuesta);
    mostrarSolucionBtn.addEventListener('click', mostrarSolucion);

    // Generar el primer ejercicio al cargar la página
    generarEjercicio();
});
