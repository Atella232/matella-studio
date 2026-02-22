import json

pdf_theory_eu = {
    "title": "Zenbaki Arruntak eta Hamartarrak",
    "subtitle": "Ezagutu Zuzen Zenbakiduna eta Eragiketak",
    "description": "Ikasi zenbaki arruntak eta hamartarrak nola erabili, problemak ebazteko D-P-E metodologiarekin batera.",
    "sections": {
        "arruntak": "Zenbaki Arruntak",
        "hamartarrak": "Zenbaki Hamartarrak",
        "dpe": "D-P-E Metodologia",
        "tips": "Ikasketa Teknikak"
    },
    "arruntak": {
        "title": "Zenbaki Arruntak",
        "description": "Zenbaki arruntak (0, 1, 2, 3...) kantitate osoak adierazteko erabiltzen ditugu.",
        "segidak": {
            "title": "Segidak eta Zuzen Zenbakiduna",
            "text": "Zuzen batean bi zenbaki ezagun baditugu, haien arteko distantzia kalkulatu eta tarte kopuruarekin zatitu."
        },
        "biribiltzea": {
            "title": "Biribiltzea Milakoetara",
            "text": "Eskuineko zenbakia 5 edo handiagoa bada, gehitu bat. 4 edo txikiagoa bada, berdin utzi."
        },
        "eragiketak": {
            "title": "Eragiketa Konbinatuak",
            "text": "Hierarkia: 1. Parentesiak, 2. Biderketak eta zatiketak, 3. Batuketak eta kenketak."
        }
    },
    "hamartarrak": {
        "title": "Zenbaki Hamartarrak",
        "description": "Hamartarrak unitate bat baino txikiagoak diren zatiak adierazteko erabiltzen dira.",
        "zuzena": {
            "title": "Zuzen Zenbakidunean Kokatzea",
            "text": "Beti irudikatu zero bat atzean (adibidez 9,7 -> 9,70) hobeto ikusteko."
        },
        "biribiltzea": {
            "title": "Biribiltzea Hamarrenetara",
            "text": "Ehunena 5 edo handiagoa bada, gehitu bat hamarrenari."
        },
        "eragiketak": {
            "title": "Eragiketen Mekanika",
            "text": "Batuketa/Kenketa: koma guztiak zutabe berean lerrokatu. Biderketa/Zatiketa (10, 100, 1000): Koma mugitu zero kopurua adina eskuinera edo ezkerrera."
        }
    },
    "dpe": {
        "title": "Problemak Ebazteko D-P-E Metodologia",
        "description": "Problema bat ondo ebazteko estruktura hau jarraitu behar da beti:",
        "datuak": {
            "title": "D - Datuak",
            "text": "Testua irakurri eta soilik beharrezkoa den informazio matematikoa atera. Hitz gakoak eta zenbakiak soilik."
        },
        "prozedura": {
            "title": "P - Prozedura",
            "text": "Planteamendu matematikoa garbi idatzi. Ahal bada eragiketa konbinatu bakar batean."
        },
        "erantzuna": {
            "title": "E - Erantzuna",
            "text": "Inoiz ez utzi zenbaki bat bakarrik. Perpaus oso batekin erantzun behar da beti."
        }
    },
    "tips": {
        "title": "Ikasketa Teknikak",
        "description": "Funtzionatzen duten ikuspuntu alternatiboak:",
        "semaforo": {
            "title": "Eragiketa Konbinatuen Semaforoa",
            "text": "Gorriz: parentesiak. Horiz: biderketak/zatiketak. Berdez: batuketak/kenketak."
        },
        "dirua": {
            "title": "Hamartarrak vs. Zentimoak",
            "text": "Hamartarrekin arazoak badaude, pentsatu euro eta zentimotan. Burmuinak dirua hobeto lantzen du."
        },
        "rol": {
            "title": "Rol Jokoa",
            "text": "Eragiketa bat berariazko akats batekin egin eta saiatu akats hori deskubritzen eta zergatia azaltzen."
        }
    }
}

pdf_theory_es = {
    "title": "Números Naturales y Decimales",
    "subtitle": "Descubre la Recta Numérica y las Operaciones",
    "description": "Aprende a usar números naturales y decimales, junto con la metodología D-P-E para resolver problemas.",
    "sections": {
        "arruntak": "Números Naturales",
        "hamartarrak": "Números Decimales",
        "dpe": "Metodología D-P-E",
        "tips": "Técnicas de Estudio"
    },
    "arruntak": {
        "title": "Números Naturales",
        "description": "Usamos los números naturales (0, 1, 2, 3...) para representar cantidades enteras.",
        "segidak": {
            "title": "Secuencias y Recta Numérica",
            "text": "Si tenemos dos números conocidos en una recta, calcula la distancia entre ellos y divide por la cantidad de intervalos."
        },
        "biribiltzea": {
            "title": "Redondeo a Millares",
            "text": "Si el número de la derecha es 5 o mayor, suma uno. Si es 4 o menor, déjalo igual."
        },
        "eragiketak": {
            "title": "Operaciones Combinadas",
            "text": "Jerarquía: 1. Paréntesis, 2. Multiplicaciones y divisiones, 3. Sumas y restas."
        }
    },
    "hamartarrak": {
        "title": "Números Decimales",
        "description": "Los decimales se usan para representar partes más pequeñas que una unidad.",
        "zuzena": {
            "title": "Ubicación en la Recta Numérica",
            "text": "Añade siempre un cero al final (ej. 9,7 -> 9,70) para verlo mejor."
        },
        "biribiltzea": {
            "title": "Redondeo a Décimas",
            "text": "Si la centésima es 5 o mayor, añade uno a la décima."
        },
        "eragiketak": {
            "title": "Mecánica de Operaciones",
            "text": "Suma/Resta: alinea todas las comas en la misma columna. Multiplicación/División (10, 100, 1000): Mueve la coma tantos espacios como ceros a la derecha o izquierda."
        }
    },
    "dpe": {
        "title": "Metodología D-P-E para Resolución de Problemas",
        "description": "Para resolver un problema correctamente, siempre debes seguir esta estructura:",
        "datuak": {
            "title": "D - Datos",
            "text": "Lee el texto y extrae solo la información matemática necesaria. Solo palabras clave y números."
        },
        "prozedura": {
            "title": "P - Procedimiento",
            "text": "Escribe claramente el planteamiento matemático. Si es posible, en una sola operación combinada."
        },
        "erantzuna": {
            "title": "E - Respuesta (Erantzuna)",
            "text": "Nunca dejes un número solo. Siempre debes responder con una frase completa."
        }
    },
    "tips": {
        "title": "Técnicas de Estudio",
        "description": "Enfoques alternativos que funcionan:",
        "semaforo": {
            "title": "El Semáforo de Operaciones Combinadas",
            "text": "Rojo: paréntesis. Amarillo: multiplicaciones/divisiones. Verde: sumas/restas."
        },
        "dirua": {
            "title": "Decimales vs. Céntimos",
            "text": "Si tienes problemas con los decimales, piensa en euros y céntimos. El cerebro procesa mejor el dinero."
        },
        "rol": {
            "title": "Juego de Rol",
            "text": "Realiza una operación con un error intencionado e intenta descubrir ese error y explicar el porqué."
        }
    }
}

# Fix eu.json: add pdfTheory
with open('src/i18n/locales/eu.json', 'r', encoding='utf-8') as f:
    eu_data = json.load(f)

eu_data['zenbakiNaturalak']['pdfTheory'] = pdf_theory_eu
print(f"eu.json zenbakiNaturalak keys after fix: {list(eu_data['zenbakiNaturalak'].keys())}")

with open('src/i18n/locales/eu.json', 'w', encoding='utf-8') as f:
    json.dump(eu_data, f, ensure_ascii=False, indent=4)
print("eu.json written.")

# Fix es.json: add pdfTheory
with open('src/i18n/locales/es.json', 'r', encoding='utf-8') as f:
    es_data = json.load(f)

es_data['zenbakiNaturalak']['pdfTheory'] = pdf_theory_es
print(f"es.json zenbakiNaturalak keys after fix: {list(es_data['zenbakiNaturalak'].keys())}")

with open('src/i18n/locales/es.json', 'w', encoding='utf-8') as f:
    json.dump(es_data, f, ensure_ascii=False, indent=4)
print("es.json written.")

print("\nAll done!")
