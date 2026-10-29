---
name: matella-redes
description: Planifica y prepara contenido de redes sociales de Matella (Instagram en euskera, castellano, inglés y árabe): ideas a partir de la propia web, calendario escalonado, textos por idioma con hashtags, piezas gráficas del kit y reels, y revisión mecánica de los textos. Úsala SIEMPRE que el dueño hable de Instagram, redes, «una publicación / carrusel / reel / historia», «qué publico esta semana», «las cuentas de Matella», «un post sobre la unidad X», «textos para las otras cuentas», aunque no diga «redes». Claude no inicia sesión ni publica: el dueño sube el material.
---

# Redes de Matella

Hay cuatro cuentas de Instagram (eu, es, en, ar) con su kit de lanzamiento ya montado. Esta skill cubre lo que
viene después: **qué publicar cada semana y cómo dejarlo listo para que el dueño solo tenga que subirlo.**

Claude no puede iniciar sesión ni publicar. Entrega archivos y textos; el dueño los sube. Los usuarios de
las cuentas que aparecen en `promo/instagram/PLAN.md` (`@matella_es`, `@matella_en`, `@matella_ar`; el
euskera tenía `@matella` ocupado) los comprobó alguien por la página pública: no los des por buenos, los
confirma él.

**El generador de piezas solo funciona en el Mac del dueño**: `promo/` no está en git. Planificar y
escribir textos se puede hacer en cualquier sitio. Identidad visual: [../matella-marca/SKILL.md](../matella-marca/SKILL.md)
y su sección «Redes sociales» de `formatos.md`.

## Pilares de contenido (los de `PLAN.md`)

1. **Cómo funciona:** una unidad en etapas, con diagnóstico al principio y retos al final.
2. **Laboratorios:** una demostración corta e interactiva (mover un deslizador, cambiar un valor).
3. **Juegos y retos:** un reto corto; la serie semanal *Erronka* (reto hoy, respuesta mañana en historias) y
   *Galdera* (pregunta rápida).
4. **Para docentes:** el marco DUA y la alineación curricular, tal como los describe la propia web.

Ritmo por cuenta: **1 reel y 1 carrusel a la semana**, más historias si hay tiempo. Euskera primero; las
demás cuentas **adaptan** el contenido, no lo traducen palabra por palabra. **No publiques el mismo reel
en las cuatro cuentas el mismo día**: escalona los días y cambia la descripción.

## Flujo

1. **Busca la idea en material real.** Lo más fácil y honesto: un laboratorio, un juego o un reto de una
   unidad (`content.ts` de la unidad: retos y ejercicios son originales y públicos), o uno de los
   vídeos explicativos (`promo/explicaciones/*.mp4`, hechos con `matella-video-explicativo`; ya son
   verticales 1080×1920 y valen como reel). Para capturas de la web usa el navegador integrado, a 375 px.
2. **Elige formato** (tabla abajo) y pilar; no repitas el mismo pilar dos veces seguidas.
3. **Escribe los textos en euskera** y después adapta es, en y ar. Un archivo por publicación, con
   encabezados `## eu`, `## es`, `## en`, `## ar` (gancho en la primera línea, llamada a `matella.net`,
   hashtags `#Matella` + uno o dos del idioma). Ejemplos de tono y de hashtags en `PLAN.md` y
   `cuenta-es/TEXTOS.md`.
4. **Revisa lo mecánico:**

   ```bash
   export PATH=$PATH:$HOME/pinokio/bin/miniconda/bin
   node .claude/skills/matella-redes/scripts/revisar-textos.mjs textos.md
   ```

   Mira que estén los cuatro idiomas, el enlace, la notación (`%35` eu, `35 %` es, `35%` en/ar; decimales con
   coma en eu/es y con punto en en/ar) y que no haya cifras de personas sin comprobar.
5. **Prepara la pieza gráfica** si hace falta: reutiliza una del kit o añade una nueva
   ([references/piezas.md](references/piezas.md)). Revisa el PNG a tamaño real, en los cuatro idiomas.
6. **Entrega** una carpeta por publicación (imágenes, vídeo y `textos.md`) y un calendario de días
   propuestos. Propón `promo/instagram/calendario/AAAA-MM-DD-tema/`; si el dueño prefiere otra, la suya.

## Formatos

| Pieza | Medida | Notas |
|---|---|---|
| Publicación / carrusel | 1080 × 1350 (4:5) | El perfil la recorta a 3:4: deja ~84 px de margen lateral |
| Reel, historia, destacada | 1080 × 1920 | Reel: los vídeos explicativos y el promo vertical ya cumplen |
| Foto de perfil | 1080 × 1080 | Se recorta en círculo |

## Reglas

- **No inventes** testimonios, cifras de alumnado, resultados ni «ya lo usan X colegios». Si hay un dato, que
  esté comprobado y lo diga el dueño. El revisor avisa de las cifras de personas.
- **Árabe e inglés:** los escribe Claude y no los ha revisado una persona nativa. Dilo al entregar y no los
  des por publicables sin esa lectura. El inglés además: la web puede no tener todavía versión en inglés;
  comprueba antes de prometerla.
- Sé fiel a la web: no anuncies unidades, juegos o herramientas que no estén publicados
  (`matella-publicar-y-cerrar` dice qué está en vivo).
- Menores: no publiques capturas con trabajos o datos de alumnos reales (ni siquiera sin nombre).
- Hashtags y descripciones: la plataforma cambia sus límites; compruébalos en la app antes de afirmar uno.
