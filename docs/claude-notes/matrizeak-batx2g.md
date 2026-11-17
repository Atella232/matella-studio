# Matrizeak · 2.º Bachillerato Ciencias Sociales

Primer tema de 2.º Sociales (curso `batx2-gizarte`, tema `matrices`), primero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Sociales»).

- **Carpeta:** `src/pages/batx2-gizarte-matrizeak`
- **`storagePrefix`:** `matella-matrizeak-batx2g`
- **Rama:** `feat/matrizeak-batx2g`, cortada de `main` 286824e
- **Bloque de ids:** 141000–141999 (diagnóstico 141001–141008, laboratorio propio 141101–141399, juegos 141401–141899)
- **Servidor de pruebas:** puerto 5201 (`.claude/launch.json` sin commit)
- **Gemelo:** `batx2-zientziak-matrizeak` (se importa, no se copia ni se edita).

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach CCSS U1 «Matrices» (solucionario; capa de texto rota, leído por las marcas de página y algunas páginas como imagen; mismo orden que el de Ciencias, con más problemas de contexto al final) y Anaya MACS II U2 «Álgebra de matrices» (solucionario; sin la sección de n-uplas de Ciencias y con «Forma matricial de un sistema»). EBAU País Vasco MACS II 2019–2022 para el estilo. Ficha fuera del repositorio: `~/Documents/Matella-fuentes/batx2g-algebra/ficha-matrices.md`.
- **Textos y ejercicios:** todos propios.
- **Frontera con los otros temas del bloque:** aquí la inversa solo por Gauss-Jordan (y por sistema en 2 × 2) y el rango solo por Gauss; «¿inversa según k?» se decide por el rango. La forma matricial $AX=B$ (Anaya §7) solo como «resolver con $A^{-1}$»; la discusión va en `sistemak`. Determinantes y adjunta, en `determinanteak`.
- **Matrices de transición (cuotas de mercado):** no salen en ninguno de los dos libros; se ofrecen como extra.
- **«Antes de empezar»:** solo a `batx1-zientziak/sistemas` (Gauss, matriz ampliada) o a 4.º. El enlace a 1.º Sociales «Álgebra» se pone al fusionar, cuando esté en `main`.

## En curso

- Ficha de fuentes hecha. Propuesta con menú de letras enviada al dueño el 2026-11-17; **esperando su elección**. Nada construido todavía.
- Siguiente paso: con la elección, fases 1+2 (lecciones y contenido), 3 (laboratorio) y 4 (juegos), una por commit.
