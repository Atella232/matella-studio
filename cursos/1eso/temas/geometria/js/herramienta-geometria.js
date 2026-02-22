document.addEventListener('DOMContentLoaded', () => {
    const formaSelect = document.getElementById('figura');
    const lado1Input = document.getElementById('lado1');
    const lado2Input = document.getElementById('lado2');
    const calcularBtn = document.querySelector('.calculadora-geometria button');
    const resultadoP = document.getElementById('resultado');

    if (calcularBtn) {
        calcularBtn.addEventListener('click', () => {
            const figura = formaSelect.value;
            const lado1 = parseFloat(lado1Input.value);
            const lado2 = parseFloat(lado2Input.value);
            let resultado;

            if (isNaN(lado1)) {
                resultadoP.textContent = 'Emaitza: Sartu baliozko zenbaki bat gutxienez';
                return;
            }

            switch (figura) {
                case 'triangulo':
                    if (isNaN(lado2)) {
                        resultadoP.textContent = 'Emaitza: Sartu altuera';
                        return;
                    }
                    resultado = (lado1 * lado2) / 2;
                    resultadoP.textContent = `Triangeluaren azalera: ${resultado.toFixed(2)} u²`;
                    break;
                case 'cuadrado':
                    resultado = lado1 * lado1;
                    resultadoP.textContent = `Karratuaren azalera: ${resultado.toFixed(2)} u²`;
                    break;
                case 'rectangulo':
                    if (isNaN(lado2)) {
                        resultadoP.textContent = 'Emaitza: Sartu altuera';
                        return;
                    }
                    resultado = lado1 * lado2;
                    resultadoP.textContent = `Laukizuzenaren azalera: ${resultado.toFixed(2)} u²`;
                    break;
                case 'circulo':
                    resultado = Math.PI * lado1 * lado1;
                    resultadoP.textContent = `Zirkuluaren azalera: ${resultado.toFixed(2)} u²`;
                    break;
            }
        });
    }

    const preguntaQuizP = document.getElementById('pregunta-quiz');
    const opcionesQuizDiv = document.querySelector('.opciones-quiz');
    const resultadoQuizP = document.getElementById('resultado-quiz');

    if (preguntaQuizP) {
        const preguntas = [
            { pregunta: 'Zenbat gradu ditu angelu zuzenak?', respuestaCorrecta: 90, opciones: [45, 90, 180, 360] },
            { pregunta: 'Zein da triangelu baten barne-angeluen batura?', respuestaCorrecta: 180, opciones: [90, 180, 270, 360] },
            { pregunta: 'Zenbat alde ditu karratu batek?', respuestaCorrecta: 4, opciones: [3, 4, 5, 6] },
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
