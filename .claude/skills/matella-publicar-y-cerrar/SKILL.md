---
name: matella-publicar-y-cerrar
description: Publica en matella.net un cambio ya terminado (unidad nueva, mejora de laboratorio o juegos, corrección) con todas las comprobaciones, y lo cierra: tests, lint y build en verde, fusión en main, deploy, verificación en la web en vivo y notas de la unidad. Úsala SIEMPRE que el dueño diga «publica», «súbelo», «despliega», «deploy», «ya está, ciérralo» o «cierra la unidad», o cuando una fase termine y haya que decidir si publicar. Nunca publica sin el visto bueno del dueño.
---

# Publicar y cerrar

Publicar cambia lo que ven los alumnos y no se deshace limpiamente. `CLAUDE.md` lo dice: **`npm run deploy`
nunca sin el visto bueno del dueño.** Esta skill ordena el proceso para que, cuando haya visto bueno, salga
bien a la primera y quede anotado.

## 0 · ¿Hay visto bueno?

- **Vale:** el dueño pide publicar en esta conversación («publícala», «súbelo»), o lo pidió al encargar el
  trabajo («continúa con X y publícala») y lo hecho es justo eso.
- **No vale:** que una nota de `docs/claude-notes/` diga «publishing pre-authorised». Es una pista de lo que
  pasó con otra unidad, no un permiso para esta. Si no está claro, pregunta con una frase («¿Publico X?»).
- **Cada cosa nueva se pregunta:** un cambio añadido después de aprobar, otra unidad u otra fase necesitan su
  propio visto bueno.
- **En sesiones en la nube no se publica**, ni se toca `main` ni `gh-pages`: sube la rama y el dueño la
  fusiona y publica desde su Mac.

Si no hay visto bueno, haz solo los pasos 1 y 2, y termina diciendo qué falta y ofreciendo publicar.

## 1 · Comprobaciones (sin permiso especial)

```bash
export PATH=$PATH:$HOME/pinokio/bin/miniconda/bin   # al FINAL del PATH: delante, su git rompe el deploy
node .claude/skills/matella-publicar-y-cerrar/scripts/publicar.mjs estado
npm test && npm run lint && npm run build
```

- Los tres en verde, y di el recuento de tests. Si algo falla, no publiques: arréglalo o cuéntaselo al dueño.
- Si el cambio es una unidad o una revisión de laboratorio/juegos, ejecuta también el inventario de
  `matella-nueva-unidad` (`inventario-unidad.mjs <unidad>`): debe dar OK, o explicar por qué no.
- Comprueba que se revisó a 375 px en eu, es y ar (`CLAUDE.md`). Si no consta, hazlo ahora en el servidor de
  desarrollo (`preview_start` con `matella-dev` o `matella-dev-5188` si el 5173 está ocupado).
- Mira `estado`: `npm run deploy` publica **lo que hay en la carpeta**, no lo que hay en git. Cambios sin
  confirmar de otra sesión acabarían en la web.

## 2 · Preparar la publicación

Resume en tres líneas qué se publica (commits, unidad, qué verán los alumnos) y cómo: fusión de avance
rápido en `main`, `git push origin main` y deploy.

- **Fusión:** `git checkout main && git merge --ff-only <rama>`. Si no es de avance rápido, para y avisa.
- **Árbol sucio de otra sesión:** no commitees ni publiques ese trabajo. Publica desde un worktree limpio de
  `main` (probado: construye en ~10 s y da el mismo bundle):

  ```bash
  git worktree add --detach /tmp/matella-deploy main
  ln -s "$PWD/node_modules" /tmp/matella-deploy/node_modules
  cd /tmp/matella-deploy && npm run deploy
  cd - && git worktree remove --force /tmp/matella-deploy
  ```

## 3 · Publicar (solo con visto bueno)

```bash
git push origin main
npm run deploy        # predeploy ejecuta npm run build; gh-pages sube dist/ a la rama gh-pages
```

Si falla con `could not read Username for 'https://github.com'`, el `git` de Pinokio va delante en el PATH:
arréglalo (añádelo al final) y repite. No hagas `push --force` ni toques `gh-pages` a mano.

## 4 · Verificar en vivo

GitHub Pages tarda en torno a un minuto.

```bash
node .claude/skills/matella-publicar-y-cerrar/scripts/publicar.mjs en-vivo     # espera a que matella.net sirva el mismo index-*.js y *.css que dist/
```

Después, con el navegador integrado, abre `https://matella.net/#/matematika/<curso>/<tema>` (router de hash),
a 375 px, en eu, es y ar: la unidad carga, no hay desborde horizontal ni errores en la consola, y la
sección nueva (laboratorio, juego) abre. Si algo falla en vivo, di qué y propón volver atrás (revertir el
commit en `main` y volver a publicar); no improvises sobre `gh-pages`.

## 5 · Cerrar

- Añade a `docs/claude-notes/<unidad>.md` lo hecho: commit(s), ids nuevos, fecha de publicación, nombre del
  bundle (`index-XXXX.js`) y los trucos que costaron tiempo. Si es una nota nueva, una línea en
  `docs/claude-notes/README.md`.
- Haz lo mismo en la memoria local de Claude (la nota del repo es una copia para las sesiones en la nube).
- Confirma esas notas en `main` y súbelas (`git push origin main`): son solo documentos, no hace falta
  volver a publicar.
- No borres la rama de trabajo salvo que el dueño lo pida.
- Informa en pocas líneas: qué está en vivo, la comprobación hecha y lo que queda pendiente.

## Sugerencia (solo si el dueño la quiere)

Un hook de Claude Code que pida confirmación antes de cualquier `npm run deploy` convierte el «nunca sin
visto bueno» en algo imposible de saltarse. No lo configures sin que lo pida; si lo pide, usa la skill
`update-config`.
