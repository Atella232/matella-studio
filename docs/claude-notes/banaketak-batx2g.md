# Banaketak · 2.º Bachillerato Ciencias Sociales

Tema 11 de 2.º Sociales (`binomial-normal`), segundo del bloque «Probabilidad e inferencia». Carpeta `src/pages/batx2-gizarte-banaketak`, `storagePrefix` `matella-banaketak-batx2g`, rama `feat/banaketak-batx2g` (cortada de `feat/probabilitatea-batx2g`), ids 151000–151999, puerto 5203. Fuente: Santillana 2.º Sociales U11 sin su parte de muestreo (ver `probabilitatea-batx2g.md`). Elección del dueño: «las recomendadas» (B-L1 Mil encuestas, B-L2 La franja del k %, B-J1 La nota de corte, B-J2 ¿Quién destaca más?, B-J3 detective; prestadas de Ciencias machine, bell, lookup, approx, juegos area y hunt, carrera y memoria).

## En curso (WIP, sin terminar)

- Hecho y en commit WIP: `critical.ts` (valores críticos con el convenio aprobado: el más cercano de la tabla, punto medio si hay empate: 90 % → 1,645, 99 % → 2,575), `lessons.tsx` (14 lecciones en 4 etapas: discrete, binomial, normal, approximation) y `lessonChecks.ts`.
- Falta: `lessonTexts.ts` (ejemplos planeados en la sesión: P(X≤2) con 0,1–0,4; μ con 1 y 3 a 0,75/0,25; seguro 60 €/1000 € a 0,02; B(8; 0,5); B(4; 0,5) P(X=3); σ de B(900; 0,1)=9; N(50; 5) entre 45 y 55; P(Z>1,2); N(20; 4) P(X<26); 30 en N(25; 2) frente a 70 en N(60; 5); 10 % más alto de N(160; 10) → 172,8; 90 % de N(30; 4) → (23,42; 36,58); B(400; 0,1) → N(40; 6); P(X≤53) con N(50; 5) → 0,7580), `figures.tsx` (14 figuras importadas en lessons.tsx), `content.ts` (151001–151008; 20/15/50 con valores de `below`), `index.tsx`, registro (courses, router, paths; y la línea de `tests/banaketak-batx2z-content.test.ts` que dice que la de Sociales no está activa), tests, laboratorio y juegos. La rama no compila todavía.
- Después: Muestreo (`feat/laginketa-batx2g`) e Inferencia (`feat/inferentzia-batx2g`).
