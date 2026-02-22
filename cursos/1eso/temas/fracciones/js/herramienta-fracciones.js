document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const den1Input = document.getElementById('den1');
    const num2Input = document.getElementById('num2');
    const den2Input = document.getElementById('den2');
    const operacionSelect = document.getElementById('operacion');
    const calcularBtn = document.querySelector('.calculadora-fracciones button');
    const resultadoP = document.getElementById('resultado');

    if (calcularBtn) {
        calcularBtn.addEventListener('click', () => {
            const num1 = parseFloat(num1Input.value);
            const den1 = parseFloat(den1Input.value);
            const num2 = parseFloat(num2Input.value);
            const den2 = parseFloat(den2Input.value);
            const operacion = operacionSelect.value;
            let resultado;

            if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
                resultadoP.textContent = 'Emaitza: Sartu baliozko zenbakiak';
                return;
            }

            if (den1 === 0 || den2 === 0) {
                resultadoP.textContent = 'Emaitza: Izendatzailea ezin da zero izan';
                return;
            }

            switch (operacion) {
                case '+':
                    resultado = `${num1 * den2 + num2 * den1}/${den1 * den2}`;
                    break;
                case '-':
                    resultado = `${num1 * den2 - num2 * den1}/${den1 * den2}`;
                    break;
                case '*':
                    resultado = `${num1 * num2}/${den1 * den2}`;
                    break;
                case '/':
                    resultado = `${num1 * den2}/${den1 * num2}`;
                    break;
            }
            resultadoP.textContent = `Emaitza: ${resultado}`;
        });
    }

    const preguntaQuizP = document.getElementById('pregunta-quiz');
    const opcionesQuizDiv = document.querySelector('.opciones-quiz');
    const resultadoQuizP = document.getElementById('resultado-quiz');

    if (preguntaQuizP) {
        const preguntas = [
            { pregunta: 'Zein da 1/2 + 1/4?', respuestaCorrecta: '3/4', opciones: ['1/3', '3/4', '2/6', '1/4'] },
            { pregunta: 'Zein da 2/3 * 3/4?', respuestaCorrecta: '6/12', opciones: ['5/7', '6/12', '8/9', '1/2'] },
            { pregunta: 'Zein da 1/2 / 1/4?', respuestaCorrecta: '4/2', opciones: ['1/8', '2/4', '4/2', '1/2'] },
        ];

        let preguntaActual = 0;

        function cargarPregunta() {
            preguntaQuizP.textContent = preguntas[preguntaActual].pregunta;
            opcionesQuizDiv.innerHTML = '';
            preguntas[preguntaActual].opciones.forEach(opcion => {
                const boton = document.createElement('button');
                boton.textContent = opcion;
                boton.onclick = () => verificarRespuesta(opcion);
                opcionesQuizDiv.appendChild(boton);
            });
            resultadoQuizP.textContent = '';
        }

        function verificarRespuesta(respuesta) {
            if (respuesta === preguntas[preguntaActual].respuestaCorrecta) {
                resultadoQuizP.textContent = 'Zuzena!';
                resultadoQuizP.style.color = 'green';
            } else {
                resultadoQuizP.textContent = 'Okerra. Saiatu berriro.';
                resultadoQuizP.style.color = 'red';
            }
            preguntaActual = (preguntaActual + 1) % preguntas.length;
            setTimeout(cargarPregunta, 2000);
        }

        cargarPregunta();
    }
});
