#!/usr/bin/env bash
# Busca capítulos de libro de texto en el Drive del dueño (carpeta LIBROS) por curso y palabra.
#   buscar-libro.sh <curso> [palabra]        p. ej.  buscar-libro.sh 2_ESO Decimales     |     buscar-libro.sh 4_ESO Trigono
#   buscar-libro.sh --raiz                   solo imprime la carpeta LIBROS
# Cursos: 1_ESO 2_ESO 3_ESO 4_ESO 1_Bach 2_Bach EBAU. Solo lista rutas: no abre los PDF.
# Requiere el Drive montado en este Mac (por eso solo vale en local).
set -euo pipefail
shopt -s nullglob
RAICES=(~/Library/CloudStorage/GoogleDrive-*/Otros\ ordenadores/Mi\ portátil/Ideas/Klase/Matematika/LIBROS)
RAIZ="${RAICES[0]:-}"
if [ -z "$RAIZ" ] || [ ! -d "$RAIZ" ]; then
  echo "No encuentro la carpeta LIBROS (Drive > Otros ordenadores > Mi portátil > Ideas > Klase > Matematika > LIBROS)." >&2
  echo "¿Está el Drive montado? Mira: ls ~/Library/CloudStorage" >&2
  exit 1
fi
if [ "${1:-}" = "--raiz" ]; then echo "$RAIZ"; exit 0; fi
CURSO="${1:?Uso: buscar-libro.sh <curso> [palabra]}"
PALABRA="${2:-}"
find "$RAIZ/$CURSO" -iname "*${PALABRA}*.pdf" 2>/dev/null | sed "s#^$RAIZ/##" | sort
