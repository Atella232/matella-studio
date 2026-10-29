---
name: matella-diagnostico-errores
description: Analiza el trabajo de los alumnos (fotos o texto de exámenes y ejercicios, o una hoja de resultados por ejercicio), clasifica cada fallo por tipo de error con el vocabulario de errores típicos que ya usa Matella, resume la clase y convierte lo que se repite en refuerzo para clase y en distractores y casos nuevos para los juegos de la web. Úsala SIEMPRE que el dueño (profesor) hable de «corregir», «ver qué fallan», «errores típicos de mis alumnos», «cómo ha salido el examen», «qué refuerzo hago» o pase fotos/hojas de trabajos de alumnos, aunque no diga «diagnóstico».
---

# Diagnóstico de errores

Lo que se equivocan tus alumnos es la información más valiosa que tiene Matella, y hoy no vuelve a la web.
Esta skill cierra el círculo: **trabajos reales → errores clasificados → refuerzo en clase y juegos mejores.**
Las respuestas incorrectas de la carrera y las líneas del «detective de errores» ya están organizadas por
códigos de error (hay 47 tablas de explicaciones en `src/pages/*/games/race.ts` y `detective.ts`): se usa ese
mismo vocabulario, así lo que descubras se enchufa directamente a los juegos.

## Privacidad primero

Son datos de menores. El repositorio es público y la memoria de Claude persiste entre sesiones:

- Trabaja con **códigos de alumno** (A01, A02…), nunca con nombres. Si una foto trae nombre, ignóralo, no lo
  copies a ningún sitio y, si puedes, pide al dueño que lo tape o recorte antes de pasarla. Cada
  conversación debe verse sin saber de quién es cada trabajo: el dueño es quien relaciona código y nombre.
- Los trabajos, las fotos y los CSV **no se guardan en el repositorio ni en la memoria** (ni nombres, ni
  notas, ni capturas). Se dejan en una carpeta del dueño fuera del repo (propón
  `~/Documents/Matella-diagnosticos/<fecha>-<tema>/`) o en la carpeta temporal de la sesión.
- Lo que sí se puede guardar en el repo son los **resultados sin personas**: un error nuevo con su
  explicación, un distractor, un caso del detective.
- Recuérdale una vez al dueño que compruebe la norma de su centro sobre pasar trabajos de alumnos a
  herramientas de IA, y que anonimizar antes de compartir es lo más seguro.
- El informe por alumno solo se hace si lo pide, con códigos, y se lo entregas a él.

## Flujo

1. **Entiende la tarea.** Qué examen o ejercicios, de qué unidad y curso, cuántos alumnos, qué formato
   trae (fotos, PDF, texto, Word o una hoja con aciertos). Si hay enunciado y solución del dueño, úsalos; si
   no, resuelve cada ejercicio tú **con código** (no de cabeza) para tener la respuesta correcta exacta.
2. **Carga el vocabulario de errores de la unidad:**

   ```bash
   export PATH=$PATH:$HOME/pinokio/bin/miniconda/bin
   node .claude/skills/matella-diagnostico-errores/scripts/taxonomia-unidad.mjs dbh2-ekuazioak-v2
   ```

   (`--all` lista las unidades; el nombre es el de la carpeta de `src/pages/`.) Cada código trae su nombre y
   su explicación en castellano. Algunas unidades heredan códigos de otra (se indica); léela también.
3. **Clasifica cada respuesta de cada alumno**: `ok`, `error` + código, `blanco` o `ilegible`.
   - Mira la respuesta final **y** los pasos: el mismo resultado malo puede venir de errores distintos.
   - Distingue **conceptual** (el planteamiento es otro) de **de cálculo** (`calculation`): el segundo no
     pide refuerzo de concepto.
   - Si ningún código encaja, propón uno nuevo con el prefijo `nuevo:` (`nuevo:divide-solo-un-lado`), con una
     frase de qué hizo el alumno. Antes de crearlo, mira si no es uno existente con otro aspecto.
   - Si la letra no se lee, `ilegible`: **no adivines**. Una clasificación dudosa se marca con «?» en la nota.
4. **Apunta la clasificación** en un CSV (una fila por alumno y ejercicio):

   ```csv
   alumno_id,ejercicio,resultado,codigo_error,nota
   A01,2,error,transpose-sign,pasó +3 como +3
   ```

5. **Resume la clase:**

   ```bash
   node .claude/skills/matella-diagnostico-errores/scripts/resumen-errores.mjs errores.csv --titulo "Examen de ecuaciones" > informe.md
   ```

   Da el acierto por ejercicio y los errores más frecuentes (veces, alumnos, ejercicios, ejemplo), y avisa
   si hay pocos alumnos, errores sin clasificar o un `alumno_id` que parece un nombre.
6. **Interpreta con cuidado.** Cuenta los 3 errores que más pesan y qué idea del tema falla detrás de cada
   uno. Con menos de ~8 alumnos son indicios, no conclusiones; con letra difícil, pide al dueño que
   compruebe a mano los 5 casos más frecuentes antes de decidir nada.
7. **Devuelve utilidad** (propón; haz solo lo que el dueño elija):
   - **Refuerzo para clase:** una ficha corta por error frecuente, con el Gogoratu que lo corrige y
     ejercicios que lo provocan, hecha con la skill `matella-materiales-imprimibles`.
   - **Mejoras para la web:** distractores nuevos, líneas para el detective y casos para la caja de «error
     típico» de las lecciones. Está en [references/anadir-errores-a-la-web.md](references/anadir-errores-a-la-web.md).
     Si son varias piezas, preséntalas como el menú J (juegos) / M (mejoras) y, si aprueba, constrúyelas
     con `matella-nueva-unidad` y publica con `matella-publicar-y-cerrar`.

## Qué entregar

Un informe breve en castellano (o euskera, si lo pide): acierto por ejercicio, top de errores con su
explicación, 2–3 recomendaciones de qué trabajar en clase y qué cambiar en la web. Di siempre cuántas
respuestas dudaste o no pudiste leer. No conviertas notas ni nombres en etiquetas sobre alumnos concretos.
