# Exámenes y variantes

## Antes de maquetar

- Pregunta (o toma del examen modelo que traiga el dueño): curso, duración, puntuación total (¿10?), si
  se permite calculadora, qué temas entran y con qué peso.
- Las competencias (los códigos «KE») **todavía no están definidas**: el dueño dirá cómo son. Hasta entonces
  no pongas etiquetas de competencia en los ejercicios ni inventes códigos; solo puntos con `.pts`. Cuando
  los definan, se añadirán aquí (la clase `.ke` de `print.css` queda preparada).
- Pide un examen anterior suyo como modelo de formato y de nivel. Imita su estructura, no su texto.

## Estructura

1. Cabecera `.exam-head`: curso, tema, fecha en blanco, `Izena: ____` (nunca un nombre) y, si hay variantes,
   el círculo `.version` con A o B.
2. Ejercicios numerados con puntos, del más fácil al más difícil, con `.answer` / `.answer.tall` del tamaño
   que de verdad necesita la respuesta. Que ningún ejercicio se parta entre páginas (ya lo evita `.ex`).
3. Tabla de puntos al final del enunciado si el dueño la usa.
4. Las soluciones van en un **PDF aparte** (`*-soluzioak.pdf`) cuando es examen, para no repartirlo junto.
   En una ficha de refuerzo sí pueden ir al final del mismo PDF (`.solutions`).

## Variantes A/B

- Mismo orden, misma dificultad por ejercicio; cambian los números (y el contexto si
  hace falta). Evita que B sea el resultado de A con una cifra cambiada: debe pedir lo mismo, no tener la
  misma respuesta.
- Escribe un `gen.mjs` con una lista de parámetros por ejercicio y variante; genera los dos HTML y calcula
  las soluciones con la misma función que usó el enunciado. Después, un `assert` (¿el resultado es
  entero/«bonito» donde debe serlo? ¿no hay ceros que anulen el ejercicio? ¿A y B tienen soluciones
  distintas?).
- Comprueba que los números no hacen el ejercicio trivial ni imposible a mano (por ejemplo, fracciones
  cuyo m.c.m. no pase de 60 si es un examen sin calculadora).

## Criterios de corrección (opcional)

Si el dueño los quiere: por ejercicio, qué da la puntuación completa y qué se descuenta (por ejemplo,
error de cálculo −25 %, falta de unidades −0,25). Que salgan de sus reglas, no de las tuyas.
