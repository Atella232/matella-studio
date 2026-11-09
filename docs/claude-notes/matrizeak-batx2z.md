# Matrizeak · 2.º Bachillerato Ciencias

Primer tema de 2.º Ciencias (curso `batx2-zientziak`, tema `matrices`), primero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Ciencias»).

- **Carpeta:** `src/pages/batx2-zientziak-matrizeak`
- **`storagePrefix`:** `matella-matrizeak-batx2z`
- **Rama:** `feat/matrizeak-batx2z`, cortada de `main` 2a27cff
- **Bloque de ids:** 116000–116999 (diagnóstico 116001–116008, laboratorio propio 116101–116399, juegos 116401–116899)
- **Servidor de pruebas:** puerto 5181 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U1 «Matrices» (solucionario; la capa de texto de las fórmulas está rota: se leyó por las marcas de página y algunas páginas como imagen) y Anaya Matemáticas II U1 «Álgebra de matrices» (solucionario). Exámenes de EBAU del País Vasco 2019–2022 para el estilo (la primera parte siempre es de álgebra: inversa según un parámetro, Mⁿ, sistemas con parámetro).
- **Textos y ejercicios:** todos propios. Del libro solo se saca el alcance.
- **Frontera con los otros dos temas del bloque:** aquí la inversa solo por Gauss-Jordan (y por sistema en 2 × 2) y el rango solo por Gauss; «¿tiene inversa según k?» se decide por el rango. Determinantes, adjunta y rango por menores van en `determinanteak`; Rouché, Cramer y discusión de sistemas, en `sistemak`.

## En curso

- 2026-11-09: fuentes leídas (ficha fuera del repositorio, en `~/Documents/Matella-fuentes/batx2z-algebra/`). Propuesta de diseño mandada al dueño; **se espera su respuesta antes de escribir código.**
- Siguiente paso: con su elección, fase 1+2 (lecciones con las diez mejoras de la teoría, diagnóstico, práctica, retos y banco). Antes de escribir las 15 lecciones, probar una lección con un producto de matrices contra `latex-math.ts`, el test de sufijos y el de orden de fórmulas.
