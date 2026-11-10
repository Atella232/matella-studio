# Banaketak · 2.º Bachillerato Ciencias

Tema 14 de 2.º Ciencias (curso `batx2-zientziak`, tema `binomial-normal`), segundo y último del bloque «Probabilidad» del reparto en paralelo (ver `bachillerato.md`). Solo Ciencias; las piezas de binomial y normal se dejan exportadas para 1.º y 2.º Sociales.

- **Carpeta:** `src/pages/batx2-zientziak-banaketak`
- **`storagePrefix`:** `matella-banaketak-batx2z`
- **Rama:** `feat/banaketak-batx2z`, cortada de `feat/probabilitatea-batx2z`
- **Bloque de ids:** 129000–129999 (diagnóstico 129001–129008, laboratorio propio 129101–129399, juegos 129401–129899)
- **Servidor de pruebas:** puerto 5185 (el mismo `.claude/launch.json` del bloque)

## Fuentes

Santillana 2.º Bach Ciencias U14 «Distribuciones binomial y normal» (solucionario, pp. 342–362; la página 18 del PDF tiene el texto roto) + Anaya 2.º Bach Ciencias U14 «Distribuciones de probabilidad» (solucionario, pp. 413–435); estilo de problemas de la EBAU del País Vasco, Matemáticas II 2017–2022 (normal con porcentajes, normal inversa, binomial y su aproximación con n grande). Ficha y textos fuera del repositorio, en `~/Documents/Matella-fuentes/batx2z-probabilitatea/`.

**Lo que ya existe:** números combinatorios y Tartaglia (4.º ak Combinatoria), esperanza (4.º ak Probabilidad), media, σ y puntuación típica de datos (1.º Ciencias Estadística), independencia y regla del producto (tema 13 de este bloque). Lo nuevo: variable aleatoria discreta (función de probabilidad, de distribución, μ y σ), binomial, variable continua y función de densidad, normal con su tabla, tipificación y búsqueda inversa, y la aproximación de la binomial por la normal con corrección de continuidad.

## Propuesta enviada al dueño (2026-11-10)

Ver el mensaje de la sesión. 15 lecciones en 5 etapas (repaso, variable discreta, binomial, continua y normal, aproximación); L1–L5 y J1–J4 propios; la tabla N(0, 1) calculada con código y comprobada en los tests.

## En curso

- Fuentes leídas, propuesta enviada; **esperando la elección del dueño**.
- Siguiente paso: fase 1 (lecciones con las diez mejoras, diagnóstico, práctica, retos, banco y figuras), con un módulo `normal.ts` que calcule Φ y la tabla.
