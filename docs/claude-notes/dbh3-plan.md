# 3. DBH: las 8 unidades que faltan (plan del 2026-10-31)

Encargo del dueño (2026-10-31): «haz los 8 temas que faltan de 3 ESO; esmérate en cada unidad, que sean del mismo estilo que Zatikiak 2. DBH». Se construyen sin esperar a que elija del menú L/J (el menú y lo elegido quedan en la nota de cada unidad). **No se publica ni se fusiona en `main` sin su visto bueno.**

## Orden y ramas (apiladas: cada una sale de la anterior)

| # | Tema (`courses.ts`) | Carpeta | Rama | Sale de |
|---|---|---|---|---|
| 1 | `proporcionalidad` | `src/pages/dbh3-proportzionaltasuna` | `feat/proporcionalidad-dbh3` | `main` (6698152) |
| 2 | `sucesiones` | `src/pages/dbh3-segidak` | `feat/sucesiones-dbh3` | 1 |
| 3 | `polinomios` | `src/pages/dbh3-polinomioak` | `feat/polinomios-dbh3` | 2 |
| 4 | `ecuaciones-sistemas` | `src/pages/dbh3-ekuazioak` | `feat/ecuaciones-dbh3` | 3 |
| 5 | `geometria-plana` | `src/pages/dbh3-geometria` | `feat/geometria-dbh3` | 4 |
| 6 | `movimientos-plano` | `src/pages/dbh3-mugimenduak` | `feat/movimientos-dbh3` | 5 |
| 7 | `funciones-lineales` | `src/pages/dbh3-funtzioak` | `feat/funciones-dbh3` | 6 |
| 8 | `estadistica-probabilidad` | `src/pages/dbh3-estatistika` | `feat/estadistica-dbh3` | 7 |

Las ramas van apiladas porque todas tocan `courses.ts`, `paths.ts` y `router/index.tsx`. Al fusionar basta con la última.

## Ids reservados (no hay test global de unicidad)

| Unidad | Diagnóstico | Laboratorio | Juegos |
|---|---|---|---|
| Proporcionalidad | 6401–6408 | 87101–87999 | 88101–88999 |
| Sucesiones | 6501–6508 | 89101–89999 | 90101–90999 |
| Polinomios | 6601–6608 | 91101–91999 | 92101–92999 |
| Ecuaciones y sistemas | 6701–6708 | 93101–93999 | 94101–94999 |
| Geometría del plano | 6801–6808 | 95101–95999 | 96101–96999 |
| Movimientos | 6901–6908 | 97101–97999 | 98101–98999 |
| Funciones lineales | 7001–7008 | 38101–38999 | 55101–55999 |
| Estadística y probabilidad | 7601–7608 | 56101–56999 | 32101–32999 |

Dentro de cada bloque, una centena por herramienta o juego (carrera x101–x105, parejas x201–x203, propios x301…).

## Listón de cada unidad (Zatikiak 2. DBH)

- 5 etapas, 15 lecciones con `mistake` (error típico) y `cases` donde ayudan; figuras de 360 de ancho.
- Diagnóstico 8, práctica 20 (4 por etapa), retos 15 (3 por etapa, 10/20/30 puntos), banco 50 (10 por etapa).
- Al menos 4 herramientas propias (predicción antes del resultado, retos fijos + infinitos, ▶ si hay movimiento) y 4 juegos propios, además de carrera y parejas y de lo prestado.
- Cuatro idiomas (eu, es, en, ar). Tests de contenido, laboratorio y juegos; inventario OK; barrido a 375 px.

## Fuera del encargo

Santillana 3.º U10 «Cuerpos geométricos» no tiene tema en `courses.ts` para 3. DBH: no se ha hecho.
