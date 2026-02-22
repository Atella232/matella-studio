document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operacionSelect = document.getElementById('operacion');
    const calcularBtn = document.querySelector('.calculadora-naturales button');
    const resultadoP = document.getElementById('resultado');

    if (calcularBtn) {
        calcularBtn.addEventListener('click', () => {
            const num1 = parseFloat(num1Input.value);
            const num2 = parseFloat(num2Input.value);
            const operacion = operacionSelect.value;
            let resultado;

            if (isNaN(num1) || isNaN(num2)) {
                resultadoP.textContent = 'Emaitza: Sartu baliozko zenbakiak';
                return;
            }

            switch (operacion) {
                case '+':
                    resultado = num1 + num2;
                    break;
                case '-':
                    resultado = num1 - num2;
                    break;
                case '*':
                    resultado = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        resultadoP.textContent = 'Emaitza: Ezin da zati zero egin';
                        return;
                    }
                    resultado = num1 / num2;
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
            { pregunta: 'Zein da 5 eta 7 arteko biderketa?', respuestaCorrecta: 35, opciones: [30, 35, 25, 40] },
            { pregunta: 'Zein da 15 ken 8?', respuestaCorrecta: 7, opciones: [5, 6, 7, 8] },
            { pregunta: 'Zein da 12 gehi 9?', respuestaCorrecta: 21, opciones: [20, 21, 22, 23] },
            { pregunta: 'Zein da 24 zati 3?', respuestaCorrecta: 8, opciones: [6, 7, 8, 9] },
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