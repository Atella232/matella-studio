# Piezas gráficas del kit de Instagram

Todo vive en `promo/instagram/kit/` (en el Mac del dueño; `promo/` no está en git).

- `kit.js`: cada pieza es una función que devuelve un SVG completo, registrada con
  `add('carpeta/nombre.png', ancho, alto, draw)`. El idioma va en la URL (`?lang=eu|es|en|ar`).
  Ayudantes que reutilizar: `bg`, `box`, `chip`, `stk` (pegatina), `logo`, `hd` (titular), `tx`, `mth`
  (matemáticas). Colores `C.*` y `STAGE`: de `promo/engine.js`.
- `kit-texts.js`: los textos traducidos. La **clave es el euskera exacto** que pasa por `TR()`.
- `traducciones.py`: el diccionario `T = {"euskera": ("es", "en", "ar")}` y el generador de `kit-texts.js`.
- `keys.json`: lista de las cadenas en euskera que usa el kit (la escribe `build.mjs`).
- `build.mjs`: renderiza los PNG con Chrome sin cabeza.

## Añadir una pieza nueva

1. En `kit.js`, `add('calendario/…png', 1080, 1350, () => …)` con los ayudantes de arriba; todo texto visible
   pasa por `TR('texto en euskera')`.
2. Genera en euskera para que `keys.json` recoja las cadenas nuevas:

   ```bash
   LANGS=eu node promo/instagram/kit/build.mjs <filtro-del-id>
   ```

3. Añade a `T` de `traducciones.py` una entrada por cadena nueva (es, en, ar) y ejecútalo:
   `python3 promo/instagram/kit/traducciones.py` (escribe `kit-texts.js`).
4. Renderiza los cuatro idiomas: `node promo/instagram/kit/build.mjs <filtro>` (`LANGS="ar"` para uno solo).
   Salen en `promo/instagram/cuenta-<idioma>/`.
5. **Comprueba cada PNG a tamaño real**, sobre todo el árabe.

## Trampas (todas ya resueltas en el kit; revísalas tras editar)

- Árabe: titulares y párrafos con `direction="rtl"` y alineados a la derecha; las fórmulas en un solo
  tramo LTR; `+`/`−` ante una cifra llevan una marca LRM (`SIGNF`); el `؟` final se separa de la fórmula; las
  filas con icono se espejan (`mir()`).
- Las cifras dentro de texto Atkinson se dibujan con Fraunces (opsz 36): el cero tachado de Atkinson parece ∅.
- En inglés y árabe la coma separa los miles (`NUMF`: 1.230 → 1,230).
- Las cadenas que son solo fórmulas no se traducen. Una fórmula con una palabra dentro necesita su clave.

## Vídeo para reels

- Explicativos: `promo/explicaciones/2dbh-<unidad>-<etapa>-<idioma>.mp4` (skill `matella-video-explicativo`).
- Promo vertical de 32,5 s en los cuatro idiomas: `promo/instagram/build.sh [eu ar …]`.
- Portadas de reel: piezas `portadas-reels/` del kit.
