document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado');
    
    // Elementos de la calculadora
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operacionSelect = document.getElementById('operacion');
    const calcularBtn = document.getElementById('btnCalcular');
    const resultadoP = document.getElementById('resultado-valor');
    const opcionesSelect = document.querySelectorAll('#operacion option');
    
    console.log('Elementos cargados:', {
        num1Input,
        num2Input,
        operacionSelect,
        calcularBtn,
        resultadoP,
        opcionesSelect
    });

    // Textos traducidos
    const textos = {
        error: {
            es: 'Por favor, introduce números válidos',
            eu: 'Mesedez, sartu baliozko zenbakiak'
        },
        si: {
            es: 'Sí',
            eu: 'Bai'
        },
        no: {
            es: 'No',
            eu: 'Ez'
        },
        esDivisible: {
            es: 'es divisible por',
            eu: 'zatigarria da honakoarekin:'
        },
        noEsDivisible: {
            es: 'no es divisible por',
            eu: 'ez da zatigarria honakoarekin:'
        }
    };

    // Función para actualizar textos según el idioma
    function actualizarTextos() {
        const lang = document.documentElement.lang || 'es';
        
        // Actualizar placeholders
        document.querySelectorAll('[data-placeholder-es]').forEach(element => {
            element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
        });
        
        // Actualizar opciones del select
        opcionesSelect.forEach(option => {
            if (option.hasAttribute('data-lang-es')) {
                option.textContent = option.getAttribute(`data-lang-${lang}`);
            }
        });
    }

    // Escuchar cambios de idioma
    document.addEventListener('languageChanged', actualizarTextos);

    // Inicializar textos
    actualizarTextos();

    // Función para realizar el cálculo
    function realizarCalculo() {
        // Mostrar indicador de carga
        const calculadora = document.querySelector('.calculadora');
        calculadora.classList.add('calculating');
        
        // Usar setTimeout para permitir que la interfaz se actualice
        setTimeout(() => {
            try {
                console.log('Botón de calcular clickeado');
                const num1 = parseFloat(num1Input.value);
                const num2 = parseFloat(num2Input.value);
                const operacion = operacionSelect.value;
                const lang = document.documentElement.lang || 'es';
                let resultado;
                
                console.log('Valores:', { num1, num2, operacion, lang });

                if (isNaN(num1) || isNaN(num2)) {
                    console.log('Números no válidos');
                    resultadoP.textContent = textos.error[lang];
                    resultadoP.parentElement.style.borderLeftColor = '#e74c3c';
                    return;
                }

                switch (operacion) {
                    case 'divisibilidad':
                        const esDivisible = num1 % num2 === 0;
                        const textoExplicacion = esDivisible ? textos.esDivisible[lang] : textos.noEsDivisible[lang];
                        const color = esDivisible ? '#27ae60' : '#e74c3c';
                        if (esDivisible) {
                            resultadoP.style.color = '#27ae60';
                            resultadoP.parentElement.style.borderLeftColor = '#27ae60';
                        } else {
                            resultadoP.style.color = '#e74c3c';
                            resultadoP.parentElement.style.borderLeftColor = '#e74c3c';
                        }
                        resultado = `${num1} ${textoExplicacion} ${num2}`;
                        break;
                    case 'mcm':
                        resultado = mcm(num1, num2);
                        resultadoP.style.color = '#000000';
                        resultadoP.parentElement.style.borderLeftColor = '#2ecc71';
                        break;
                    case 'mcd':
                        resultado = mcd(num1, num2);
                        resultadoP.style.color = '#000000';
                        resultadoP.parentElement.style.borderLeftColor = '#2ecc71';
                        break;
                    default:
                        resultado = textos.error[lang];
                }

                console.log('Resultado:', resultado);
                resultadoP.textContent = resultado;
                
                // Establecer color del borde según el resultado
                resultadoP.parentElement.style.borderLeftColor = '#2ecc71';
                
                // Efecto de éxito
                resultadoP.parentElement.style.animation = 'none';
                void resultadoP.parentElement.offsetWidth; // Reiniciar animación
                resultadoP.parentElement.style.animation = 'pulse 0.5s';
                
            } catch (error) {
                console.error('Error en el cálculo:', error);
                resultadoP.textContent = textos.error[lang];
                resultadoP.parentElement.style.borderLeftColor = '#e74c3c';
            } finally {
                // Ocultar indicador de carga
                calculadora.classList.remove('calculating');
            }
        }, 100);
    }

    // Manejar el cálculo
    if (calcularBtn) {
        console.log('Añadiendo event listener al botón de calcular');
        calcularBtn.addEventListener('click', realizarCalculo);
        
        // También permitir calcular con Enter
        [num1Input, num2Input, operacionSelect].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    realizarCalculo();
                }
            });
        });
    } else {
        console.error('No se encontró el botón de calcular');
    }

    function mcm(a, b) {
        return (a * b) / mcd(a, b);
    }

    function mcd(a, b) {
        let t;
        while (b !== 0) {
            t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    const preguntaQuizP = document.getElementById('pregunta-quiz');
    const opcionesQuizDiv = document.querySelector('.opciones-quiz');
    const resultadoQuizP = document.getElementById('resultado-quiz');

    if (preguntaQuizP) {
        const preguntas = [
            { pregunta: '24 zenbakia 6-rekin zatigarria da?', respuestaCorrecta: true, opciones: [true, false] },
            { pregunta: 'Zein da 12 eta 18ren MKT?', respuestaCorrecta: 36, opciones: [12, 18, 36, 72] },
            { pregunta: 'Zein da 12 eta 18ren ZKH?', respuestaCorrecta: 6, opciones: [2, 3, 6, 12] },
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
