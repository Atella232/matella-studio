import type { LocalizedText } from './content'

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard'

export interface ExerciseItemData {
    id: number
    difficulty: ExerciseDifficulty
    question: LocalizedText
    solution: LocalizedText
}

export interface ExerciseSectionData {
    id: string
    title: LocalizedText
    icon: string
    color: string
    count: number
    items: ExerciseItemData[]
}

export const algebraExerciseSections: ExerciseSectionData[] = [
    {
        "id": "lenguaje",
        "title": {
            "eu": "Hizkuntza aljebraikoa",
            "es": "Lenguaje algebraico",
            "ar": "اللغة الجبرية"
        },
        "icon": "🔤",
        "color": "#6366f1",
        "count": 9,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "Idatzi adierazpen aljebraiko bat: \"\\(x\\)-ren hirukoitza gehi 5\".",
                    "es": "Escribe una expresi\u00f3n algebraica: \"el triple de \\(x\\) m\u00e1s 5\".",
                    "ar": "\u0627\u0643\u062a\u0628 \u062a\u0639\u0628\u064a\u0631\u064b\u0627 \u062c\u0628\u0631\u064a\u064b\u0627: \"\u062b\u0644\u0627\u062b\u0629 \u0623\u0645\u062b\u0627\u0644 \\(x\\) \u0632\u0627\u0626\u062f 5\"."
                },
                "solution": {
                    "eu": "\\(3x + 5\\)",
                    "es": "\\(3x + 5\\)",
                    "ar": "\\(3x + 5\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "Sarak \\(x\\) urte ditu. Nola adierazten da Rosak 2 urte gehiago dituela?",
                    "es": "Sara tiene \\(x\\) a\u00f1os. \u00bfC\u00f3mo se expresa que Rosa tiene 2 a\u00f1os m\u00e1s?",
                    "ar": "\u0633\u0627\u0631\u0629 \u0639\u0645\u0631\u0647\u0627 \\(x\\) \u0633\u0646\u0629. \u0643\u064a\u0641 \u0646\u0639\u0628\u0631 \u0623\u0646 \u0631\u0648\u0632\u0627 \u0623\u0643\u0628\u0631 \u0628\u0633\u0646\u062a\u064a\u0646\u061f"
                },
                "solution": {
                    "eu": "\\(x + 2\\)",
                    "es": "\\(x + 2\\)",
                    "ar": "\\(x + 2\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": {
                    "eu": "Adierazi: \"zenbaki baten erdia 3 unitate handituta\".",
                    "es": "Expresa: \"la mitad de un n\u00famero aumentado en 3 unidades\".",
                    "ar": "\u0639\u0628\u0651\u0631 \u0639\u0646: \"\u0646\u0635\u0641 \u0639\u062f\u062f \u0645\u0636\u0627\u0641\u064b\u0627 \u0625\u0644\u064a\u0647 3 \u0648\u062d\u062f\u0627\u062a\"."
                },
                "solution": {
                    "eu": "\\(\\dfrac{x+3}{2}\\)",
                    "es": "\\(\\dfrac{x+3}{2}\\)",
                    "ar": "\\(\\dfrac{x+3}{2}\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "easy",
                "question": {
                    "eu": "Langile batek \\(x\\) \u20ac base eta 15 \u20ac aparteko ordu \\(n\\) bakoitzeko kobratzen du. Guztira?",
                    "es": "Un trabajador cobra \\(x\\) \u20ac base y 15 \u20ac por hora extra \\(n\\). \u00bfTotal?",
                    "ar": "\u0639\u0627\u0645\u0644 \u064a\u062a\u0642\u0627\u0636\u0649 \\(x\\) \u20ac \u0631\u0627\u062a\u0628\u064b\u0627 \u0623\u0633\u0627\u0633\u064a\u064b\u0627 \u0648 15 \u20ac \u0644\u0643\u0644 \u0633\u0627\u0639\u0629 \u0625\u0636\u0627\u0641\u064a\u0629 \\(n\\). \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a\u061f"
                },
                "solution": {
                    "eu": "\\(x + 15n\\)",
                    "es": "\\(x + 15n\\)",
                    "ar": "\\(x + 15n\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "Idatzi hizkuntza aljebraikoan: \"\\(y\\)-ren hirukoitza baino bost unitate handiagoa\".",
                    "es": "Escribe en lenguaje algebraico: \"cinco unidades mayor que el triple de \\(y\\)\".",
                    "ar": "\u0627\u0643\u062a\u0628 \u0628\u0627\u0644\u062c\u0628\u0631: \"\u0623\u0643\u0628\u0631 \u0628\u062e\u0645\u0633 \u0648\u062d\u062f\u0627\u062a \u0645\u0646 \u062b\u0644\u0627\u062b\u0629 \u0623\u0645\u062b\u0627\u0644 \\(y\\)\"."
                },
                "solution": {
                    "eu": "\\(3y + 5\\)",
                    "es": "\\(3y + 5\\)",
                    "ar": "\\(3y + 5\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "medium",
                "question": {
                    "eu": "Merkatarik batek 100 kamiseta erosten ditu \\(C\\) preziotan (guztira), \\(v\\) unitateko saltzen ditu \\(G\\) gastuarekin. Idatzi irabaziak.",
                    "es": "Un comerciante compra 100 camisetas a precio \\(C\\) (total), las vende a \\(v\\) c/u con gastos \\(G\\). Escribe los beneficios.",
                    "ar": "\u062a\u0627\u062c\u0631 \u064a\u0634\u062a\u0631\u064a 100 \u0642\u0645\u064a\u0635 \u0628\u0633\u0639\u0631 \\(C\\) (\u0625\u062c\u0645\u0627\u0644\u064a)\u060c \u064a\u0628\u064a\u0639\u0647\u0627 \u0628\u0640 \\(v\\) \u0644\u0644\u0642\u0637\u0639\u0629 \u0628\u0645\u0635\u0627\u0631\u064a\u0641 \\(G\\). \u0627\u0643\u062a\u0628 \u0627\u0644\u0631\u0628\u062d."
                },
                "solution": {
                    "eu": "\\(B = 100v - C - G\\)",
                    "es": "\\(B = 100v - C - G\\)",
                    "ar": "\\(B = 100v - C - G\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "medium",
                "question": {
                    "eu": "Itzuli: \"\\(a\\) eta \\(b\\)-ren baturaren karratua\".",
                    "es": "Traduce: \"el cuadrado de la suma de \\(a\\) y \\(b\\)\".",
                    "ar": "\u062a\u0631\u062c\u0645: \"\u0645\u0631\u0628\u0639 \u0645\u062c\u0645\u0648\u0639 \\(a\\) \u0648 \\(b\\)\"."
                },
                "solution": {
                    "eu": "\\((a+b)^2\\)",
                    "es": "\\((a+b)^2\\)",
                    "ar": "\\((a+b)^2\\)"
                }
            },
            {
                "id": 8,
                "difficulty": "hard",
                "question": {
                    "eu": "Soldata gordina: \\(B = 900 + 3a + 10b\\) (\\(a\\)=antzinatasuna, \\(b\\)=aparteko orduak). Kalkulatu \\(a=8\\) eta \\(b=21\\) bada.",
                    "es": "Sueldo bruto: \\(B = 900 + 3a + 10b\\) (\\(a\\)=antig\u00fcedad, \\(b\\)=horas extra). Calcula si \\(a=8\\) y \\(b=21\\).",
                    "ar": "\u0627\u0644\u0631\u0627\u062a\u0628 \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a: \\(B = 900 + 3a + 10b\\) (\\(a\\)=\u0627\u0644\u0623\u0642\u062f\u0645\u064a\u0629\u060c \\(b\\)=\u0633\u0627\u0639\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629). \u0627\u062d\u0633\u0628 \u0625\u0630\u0627 \\(a=8\\) \u0648 \\(b=21\\)."
                },
                "solution": {
                    "eu": "\\(900 + 3\\cdot8 + 10\\cdot21 = 900+24+210 = 1134\\) \u20ac",
                    "es": "\\(900 + 3\\cdot8 + 10\\cdot21 = 900+24+210 = 1134\\) \u20ac",
                    "ar": "\\(900 + 3\\cdot8 + 10\\cdot21 = 900+24+210 = 1134\\) \u20ac"
                }
            },
            {
                "id": 9,
                "difficulty": "hard",
                "question": {
                    "eu": "\\(S = (B+16n)\\cdot0{,}82\\). \\(B=1000\\) eta \\(n=5\\) bada, kalkulatu soldata garbia.",
                    "es": "\\(S = (B+16n)\\cdot0{,}82\\). Si \\(B=1000\\) y \\(n=5\\), calcula el sueldo neto.",
                    "ar": "\\(S = (B+16n)\\cdot0{,}82\\). \u0625\u0630\u0627 \\(B=1000\\) \u0648 \\(n=5\\)\u060c \u0627\u062d\u0633\u0628 \u0627\u0644\u0631\u0627\u062a\u0628 \u0627\u0644\u0635\u0627\u0641\u064a."
                },
                "solution": {
                    "eu": "\\(S = (1000+80)\\cdot0{,}82 = 1080\\cdot0{,}82 = 885{,}60\\) \u20ac",
                    "es": "\\(S = (1000+80)\\cdot0{,}82 = 1080\\cdot0{,}82 = 885{,}60\\) \u20ac",
                    "ar": "\\(S = (1000+80)\\cdot0{,}82 = 1080\\cdot0{,}82 = 885{,}60\\) \u20ac"
                }
            }
        ]
    },
    {
        "id": "monomios",
        "title": {
            "eu": "Monomioak",
            "es": "Monomios",
            "ar": "الحدود الأحادية"
        },
        "icon": "🔷",
        "color": "#06b6d4",
        "count": 8,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "Adierazi \\(5x^2yz\\)-ren koefizientea, zati literala eta gradua.",
                    "es": "Indica coeficiente, parte literal y grado de \\(5x^2yz\\).",
                    "ar": "\u0623\u0634\u0631 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0627\u0645\u0644 \u0648\u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u062d\u0631\u0641\u064a \u0648\u062f\u0631\u062c\u0629 \\(5x^2yz\\)."
                },
                "solution": {
                    "eu": "Koefizientea: \\(5\\) | Zati literala: \\(x^2yz\\) | Gradua: \\(4\\)",
                    "es": "Coeficiente: \\(5\\) | Parte literal: \\(x^2yz\\) | Grado: \\(4\\)",
                    "ar": "المعامل: \\(5\\) | الجزء الحرفي: \\(x^2yz\\) | الدرجة: \\(4\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "Zein da \\(-3ab^2c^3\\)-ren gradua?",
                    "es": "\u00bfCu\u00e1l es el grado de \\(-3ab^2c^3\\)?",
                    "ar": "\u0645\u0627 \u0647\u064a \u062f\u0631\u062c\u0629 \\(-3ab^2c^3\\)\u061f"
                },
                "solution": {
                    "eu": "\\(1+2+3=6\\)",
                    "es": "\\(1+2+3=6\\)",
                    "ar": "\\(1+2+3=6\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": {
                    "eu": "Idatzi \\(-4x^2y\\)-ren aurkakoa.",
                    "es": "Escribe el opuesto de \\(-4x^2y\\).",
                    "ar": "\u0627\u0643\u062a\u0628 \u0645\u0639\u0643\u0648\u0633 \\(-4x^2y\\)."
                },
                "solution": {
                    "eu": "\\(4x^2y\\)",
                    "es": "\\(4x^2y\\)",
                    "ar": "\\(4x^2y\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "easy",
                "question": {
                    "eu": "Antzerakoak dira \\(-3ab^2\\) eta \\(2ab^2\\)? Arrazoitu.",
                    "es": "\u00bfSon semejantes \\(-3ab^2\\) y \\(2ab^2\\)? Justifica.",
                    "ar": "\u0647\u0644 \\(-3ab^2\\) \u0648 \\(2ab^2\\) \u062d\u062f\u0648\u062f \u0645\u062a\u0645\u0627\u062b\u0644\u0629\u061f \u0639\u0644\u0644."
                },
                "solution": {
                    "eu": "Bai, zati literal bera dute: \\(ab^2\\).",
                    "es": "S\u00ed, tienen la misma parte literal \\(ab^2\\)",
                    "ar": "نعم، لهما الجزء الحرفي نفسه: \\(ab^2\\)."
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "Zeintzu dira antzerakoak? \\(3x^2\\), \\(-2x^2\\), \\(5xy\\), \\(x^2\\), \\(-7xy\\)",
                    "es": "\u00bfCu\u00e1les son semejantes entre s\u00ed? \\(3x^2\\), \\(-2x^2\\), \\(5xy\\), \\(x^2\\), \\(-7xy\\)",
                    "ar": "\u0623\u064a\u0647\u0627 \u0645\u062a\u0645\u0627\u062b\u0644\u0629\u061f \\(3x^2\\)\u060c \\(-2x^2\\)\u060c \\(5xy\\)\u060c \\(x^2\\)\u060c \\(-7xy\\)"
                },
                "solution": {
                    "eu": "\\(3x^2, -2x^2, x^2\\) antzekoak dira. \\(5xy\\) eta \\(-7xy\\) ere antzekoak dira.",
                    "es": "\\(3x^2, -2x^2, x^2\\) son semejantes entre s\u00ed. \\(5xy\\) y \\(-7xy\\) son semejantes entre s\u00ed.",
                    "ar": "\\(3x^2, -2x^2, x^2\\) حدود متشابهة. و\\(5xy\\) و \\(-7xy\\) حدود متشابهة أيضًا."
                }
            },
            {
                "id": 6,
                "difficulty": "easy",
                "question": {
                    "eu": "Osatu: \\(6n^4\\) monomio: koefizientea ___, zati literala ___, gradua ___.",
                    "es": "Completa: monomio \\(6n^4\\): coeficiente ___, parte literal ___, grado ___.",
                    "ar": "\u0623\u0643\u0645\u0644: \u0627\u0644\u062d\u062f \\(6n^4\\): \u0627\u0644\u0645\u0639\u0627\u0645\u0644 ___\u060c \u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u062d\u0631\u0641\u064a ___\u060c \u0627\u0644\u062f\u0631\u062c\u0629 ___."
                },
                "solution": {
                    "eu": "Koefizientea: \\(6\\) | Zati literala: \\(n^4\\) | Gradua: \\(4\\)",
                    "es": "Coeficiente: \\(6\\) | Parte literal: \\(n^4\\) | Grado: \\(4\\)",
                    "ar": "المعامل: \\(6\\) | الجزء الحرفي: \\(n^4\\) | الدرجة: \\(4\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "medium",
                "question": {
                    "eu": "Ahal da monomio bat eta bere aurkakoa antzerakoak ez izatea?",
                    "es": "\u00bfPuede un monomio y su opuesto no ser semejantes?",
                    "ar": "\u0647\u0644 \u064a\u0645\u0643\u0646 \u0644\u062d\u062f \u0623\u062d\u0627\u062f\u064a \u0648\u0645\u0639\u0643\u0648\u0633\u0647 \u0623\u0644\u0627 \u064a\u0643\u0648\u0646\u0627 \u0645\u062a\u0645\u0627\u062b\u0644\u064a\u0646\u061f"
                },
                "solution": {
                    "eu": "Ez. Beti zati literal bera dute.",
                    "es": "No. Siempre tienen la misma parte literal.",
                    "ar": "لا. لهما دائمًا الجزء الحرفي نفسه."
                }
            },
            {
                "id": 8,
                "difficulty": "medium",
                "question": {
                    "eu": "Idatzi 3. graduko bi monomio antzerako \\(x\\) eta \\(y\\)-tan.",
                    "es": "Escribe dos monomios semejantes de grado 3 en \\(x\\) e \\(y\\).",
                    "ar": "\u0627\u0643\u062a\u0628 \u062d\u062f\u064a\u0646 \u0623\u062d\u0627\u062f\u064a\u064a\u0646 \u0645\u062a\u0645\u0627\u062b\u0644\u064a\u0646 \u0645\u0646 \u0627\u0644\u062f\u0631\u062c\u0629 3 \u0641\u064a \\(x\\) \u0648 \\(y\\)."
                },
                "solution": {
                    "eu": "Adibidez: \\(2x^2y\\) eta \\(-5x^2y\\) (\\(x^2y\\) zati literala duen edozein bikote).",
                    "es": "Ej: \\(2x^2y\\) y \\(-5x^2y\\) (cualquier par con parte literal \\(x^2y\\))",
                    "ar": "مثال: \\(2x^2y\\) و \\(-5x^2y\\) (أي زوج له الجزء الحرفي \\(x^2y\\))."
                }
            }
        ]
    },
    {
        "id": "opmonomios",
        "title": {
            "eu": "Monomioen eragiketak",
            "es": "Operaciones con monomios",
            "ar": "عمليات الحدود الأحادية"
        },
        "icon": "⚡",
        "color": "#10b981",
        "count": 10,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "\\(3x + 5x + 2x\\)",
                    "es": "\\(3x + 5x + 2x\\)",
                    "ar": "\\(3x + 5x + 2x\\)"
                },
                "solution": {
                    "eu": "\\(10x\\)",
                    "es": "\\(10x\\)",
                    "ar": "\\(10x\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "\\(8x^2 - 3x^2\\)",
                    "es": "\\(8x^2 - 3x^2\\)",
                    "ar": "\\(8x^2 - 3x^2\\)"
                },
                "solution": {
                    "eu": "\\(5x^2\\)",
                    "es": "\\(5x^2\\)",
                    "ar": "\\(5x^2\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": {
                    "eu": "\\(4x^2 \\cdot 3x^3\\)",
                    "es": "\\(4x^2 \\cdot 3x^3\\)",
                    "ar": "\\(4x^2 \\cdot 3x^3\\)"
                },
                "solution": {
                    "eu": "\\(12x^5\\)",
                    "es": "\\(12x^5\\)",
                    "ar": "\\(12x^5\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "easy",
                "question": {
                    "eu": "\\(15x^5 \\div 3x^2\\)",
                    "es": "\\(15x^5 \\div 3x^2\\)",
                    "ar": "\\(15x^5 \\div 3x^2\\)"
                },
                "solution": {
                    "eu": "\\(5x^3\\)",
                    "es": "\\(5x^3\\)",
                    "ar": "\\(5x^3\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "\\(3x^2 \\cdot (-2x^3)\\)",
                    "es": "\\(3x^2 \\cdot (-2x^3)\\)",
                    "ar": "\\(3x^2 \\cdot (-2x^3)\\)"
                },
                "solution": {
                    "eu": "\\(-6x^5\\)",
                    "es": "\\(-6x^5\\)",
                    "ar": "\\(-6x^5\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((-2a^2)(3a^3)\\)",
                    "es": "\\((-2a^2)(3a^3)\\)",
                    "ar": "\\((-2a^2)(3a^3)\\)"
                },
                "solution": {
                    "eu": "\\(-6a^5\\)",
                    "es": "\\(-6a^5\\)",
                    "ar": "\\(-6a^5\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "medium",
                "question": {
                    "eu": "\\(-8a^6 \\div 4a^2\\)",
                    "es": "\\(-8a^6 \\div 4a^2\\)",
                    "ar": "\\(-8a^6 \\div 4a^2\\)"
                },
                "solution": {
                    "eu": "\\(-2a^4\\)",
                    "es": "\\(-2a^4\\)",
                    "ar": "\\(-2a^4\\)"
                }
            },
            {
                "id": 8,
                "difficulty": "medium",
                "question": {
                    "eu": "Sinplifikatu: \\(\\dfrac{6x^2y}{2xy}\\)",
                    "es": "Simplifica: \\(\\dfrac{6x^2y}{2xy}\\)",
                    "ar": "\u0628\u0633\u0651\u0637: \\(\\dfrac{6x^2y}{2xy}\\)"
                },
                "solution": {
                    "eu": "\\(3x\\)",
                    "es": "\\(3x\\)",
                    "ar": "\\(3x\\)"
                }
            },
            {
                "id": 9,
                "difficulty": "medium",
                "question": {
                    "eu": "\\(4a^3b^2 \\cdot 2a^2\\)",
                    "es": "\\(4a^3b^2 \\cdot 2a^2\\)",
                    "ar": "\\(4a^3b^2 \\cdot 2a^2\\)"
                },
                "solution": {
                    "eu": "\\(8a^5b^2\\)",
                    "es": "\\(8a^5b^2\\)",
                    "ar": "\\(8a^5b^2\\)"
                }
            },
            {
                "id": 10,
                "difficulty": "hard",
                "question": {
                    "eu": "Egia ala gezurra: a) \\(2a+2a=4a^2\\) b) \\(x^2 \\cdot x^3=x^5\\) c) \\(8x^2y \\div 4xy = 2x\\)",
                    "es": "Verdadero o falso: a) \\(2a+2a=4a^2\\) b) \\(x^2 \\cdot x^3=x^5\\) c) \\(8x^2y \\div 4xy = 2x\\)",
                    "ar": "\u0635\u062d \u0623\u0645 \u062e\u0637\u0623: a) \\(2a+2a=4a^2\\) b) \\(x^2 \\cdot x^3=x^5\\) c) \\(8x^2y \\div 4xy = 2x\\)"
                },
                "solution": {
                    "eu": "a) Gezurra: \\(2a+2a=4a\\) | b) Egia | c) Egia",
                    "es": "a) Falso: \\(2a+2a=4a\\) | b) Verdadero | c) Verdadero",
                    "ar": "a) خطأ: \\(2a+2a=4a\\) | b) صحيح | c) صحيح"
                }
            }
        ]
    },
    {
        "id": "polinomios",
        "title": {
            "eu": "Polinomioak",
            "es": "Polinomios",
            "ar": "كثيرات الحدود"
        },
        "icon": "📈",
        "color": "#f472b6",
        "count": 8,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "Adierazi \\(P(x)=11x^3-5x^2-3x+7\\)-ren gradua eta gai independentea.",
                    "es": "Indica grado y t\u00e9rmino independiente de \\(P(x)=11x^3-5x^2-3x+7\\).",
                    "ar": "\u0623\u0634\u0631 \u0625\u0644\u0649 \u062f\u0631\u062c\u0629 \u0648\u062d\u062f \u0645\u0633\u062a\u0642\u0644 \\(P(x)=11x^3-5x^2-3x+7\\)."
                },
                "solution": {
                    "eu": "Gradua: \\(3\\) | Gai independentea: \\(7\\)",
                    "es": "Grado: \\(3\\) | T\u00e9rmino independiente: \\(7\\)",
                    "ar": "الدرجة: \\(3\\) | الحد المستقل: \\(7\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "Ba al du gai independenterik \\(Q(x)=-2x^4+7x^2-x\\)-k? Zein da bere gradua?",
                    "es": "\u00bfTiene t\u00e9rmino independiente \\(Q(x)=-2x^4+7x^2-x\\)? \u00bfCu\u00e1l es su grado?",
                    "ar": "\u0647\u0644 \u0644\u0640 \\(Q(x)=-2x^4+7x^2-x\\) \u062d\u062f \u0645\u0633\u062a\u0642\u0644\u061f \u0645\u0627 \u0647\u064a \u062f\u0631\u062c\u062a\u0647\u061f"
                },
                "solution": {
                    "eu": "Ez du gai independenterik. Gradua: \\(4\\)",
                    "es": "No tiene t\u00e9rmino independiente. Grado: \\(4\\)",
                    "ar": "ليس له حد مستقل. الدرجة: \\(4\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": {
                    "eu": "Kalkulatu \\(P(2)\\) eta \\(P(-1)\\) \\(P(x)=x^2-3x+1\\) izanik.",
                    "es": "Calcula \\(P(2)\\) y \\(P(-1)\\) siendo \\(P(x)=x^2-3x+1\\).",
                    "ar": "\u0627\u062d\u0633\u0628 \\(P(2)\\) \u0648 \\(P(-1)\\) \u0625\u0630\u0627 \\(P(x)=x^2-3x+1\\)."
                },
                "solution": {
                    "eu": "\\(P(2)=4-6+1=-1\\) | \\(P(-1)=1+3+1=5\\)",
                    "es": "\\(P(2)=4-6+1=-1\\) | \\(P(-1)=1+3+1=5\\)",
                    "ar": "\\(P(2)=4-6+1=-1\\) | \\(P(-1)=1+3+1=5\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "easy",
                "question": {
                    "eu": "Idatzi \\(Q(x)=-2x^4+7x^2-x\\)-ren polinomio aurkakoa.",
                    "es": "Escribe el polinomio opuesto de \\(Q(x)=-2x^4+7x^2-x\\).",
                    "ar": "\u0627\u0643\u062a\u0628 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u062d\u062f\u0648\u062f \u0627\u0644\u0645\u0639\u0627\u0643\u0633 \u0644\u0640 \\(Q(x)=-2x^4+7x^2-x\\)."
                },
                "solution": {
                    "eu": "\\(-Q(x)=2x^4-7x^2+x\\)",
                    "es": "\\(-Q(x)=2x^4-7x^2+x\\)",
                    "ar": "\\(-Q(x)=2x^4-7x^2+x\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "Kalkulatu \\(P(a{,}b)=3ab^2-5a+3b\\) \\(a=2, b=-1\\) bada.",
                    "es": "Calcula \\(P(a{,}b)=3ab^2-5a+3b\\) para \\(a=2, b=-1\\).",
                    "ar": "\u0627\u062d\u0633\u0628 \\(P(a{,}b)=3ab^2-5a+3b\\) \u0625\u0630\u0627 \\(a=2, b=-1\\)."
                },
                "solution": {
                    "eu": "\\(3\\cdot2\\cdot1 - 5\\cdot2 + 3\\cdot(-1) = 6-10-3=-7\\)",
                    "es": "\\(3\\cdot2\\cdot1 - 5\\cdot2 + 3\\cdot(-1) = 6-10-3=-7\\)",
                    "ar": "\\(3\\cdot2\\cdot1 - 5\\cdot2 + 3\\cdot(-1) = 6-10-3=-7\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "medium",
                "question": {
                    "eu": "Kalkulatu \\(P(0), P(1), P(-1)\\) \\(P(x)=x^3-x^2+3x-1\\) bada.",
                    "es": "Calcula \\(P(0), P(1), P(-1)\\) para \\(P(x)=x^3-x^2+3x-1\\).",
                    "ar": "\u0627\u062d\u0633\u0628 \\(P(0), P(1), P(-1)\\) \u0625\u0630\u0627 \\(P(x)=x^3-x^2+3x-1\\)."
                },
                "solution": {
                    "eu": "\\(P(0)=-1\\) | \\(P(1)=2\\) | \\(P(-1)=-6\\)",
                    "es": "\\(P(0)=-1\\) | \\(P(1)=2\\) | \\(P(-1)=-6\\)",
                    "ar": "\\(P(0)=-1\\) | \\(P(1)=2\\) | \\(P(-1)=-6\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "medium",
                "question": {
                    "eu": "Ba al du gai independenterik \\(P(x)=-7xy^2-2x^3y+9x\\)-k?",
                    "es": "\u00bfTiene t\u00e9rmino independiente \\(P(x)=-7xy^2-2x^3y+9x\\)?",
                    "ar": "\u0647\u0644 \u0644\u0640 \\(P(x)=-7xy^2-2x^3y+9x\\) \u062d\u062f \u0645\u0633\u062a\u0642\u0644\u061f"
                },
                "solution": {
                    "eu": "Ez. Gai guztiek aldagaiak dituzte.",
                    "es": "No. Ning\u00fan t\u00e9rmino carece de variables.",
                    "ar": "لا. كل حد يحتوي على متغيرات."
                }
            },
            {
                "id": 8,
                "difficulty": "hard",
                "question": {
                    "eu": "Kalkulatu \\(Q(-1)\\) \\(Q(x)=4x^4-x+2\\) izanik.",
                    "es": "Calcula \\(Q(-1)\\) siendo \\(Q(x)=4x^4-x+2\\).",
                    "ar": "\u0627\u062d\u0633\u0628 \\(Q(-1)\\) \u0625\u0630\u0627 \\(Q(x)=4x^4-x+2\\)."
                },
                "solution": {
                    "eu": "\\(4\\cdot1-(-1)+2=4+1+2=7\\)",
                    "es": "\\(4\\cdot1-(-1)+2=4+1+2=7\\)",
                    "ar": "\\(4\\cdot1-(-1)+2=4+1+2=7\\)"
                }
            }
        ]
    },
    {
        "id": "oppolinomios",
        "title": {
            "eu": "Polinomioen eragiketak",
            "es": "Operaciones con polinomios",
            "ar": "عمليات كثيرات الحدود"
        },
        "icon": "🔢",
        "color": "#f59e0b",
        "count": 10,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "Batu \\(P=x^3-4x^2+2x\\) eta \\(Q=-2-2x^2+3x^3\\).",
                    "es": "Suma \\(P=x^3-4x^2+2x\\) y \\(Q=-2-2x^2+3x^3\\).",
                    "ar": "\u0627\u062c\u0645\u0639 \\(P=x^3-4x^2+2x\\) \u0648 \\(Q=-2-2x^2+3x^3\\)."
                },
                "solution": {
                    "eu": "\\(4x^3-6x^2+2x-2\\)",
                    "es": "\\(4x^3-6x^2+2x-2\\)",
                    "ar": "\\(4x^3-6x^2+2x-2\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": {
                    "eu": "Kendu \\(P-Q\\), \\(P=x^3-4x^2+2x\\) eta \\(Q=3x^3-2x^2+1\\) izanik.",
                    "es": "Resta \\(P-Q\\) con \\(P=x^3-4x^2+2x\\) y \\(Q=3x^3-2x^2+1\\).",
                    "ar": "اطرح \\(P-Q\\)، حيث \\(P=x^3-4x^2+2x\\) و \\(Q=3x^3-2x^2+1\\)."
                },
                "solution": {
                    "eu": "\\(-2x^3-2x^2+2x-1\\)",
                    "es": "\\(-2x^3-2x^2+2x-1\\)",
                    "ar": "\\(-2x^3-2x^2+2x-1\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": {
                    "eu": "Biderkatu: \\(3x^2 \\cdot (-2-x^3+x)\\)",
                    "es": "Multiplica: \\(3x^2 \\cdot (-2-x^3+x)\\)",
                    "ar": "اضرب: \\(3x^2 \\cdot (-2-x^3+x)\\)"
                },
                "solution": {
                    "eu": "\\(-6x^2-3x^5+3x^3\\)",
                    "es": "\\(-6x^2-3x^5+3x^3\\)",
                    "ar": "\\(-6x^2-3x^5+3x^3\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "easy",
                "question": {
                    "eu": "\\((x+1)(x-2)\\)",
                    "es": "\\((x+1)(x-2)\\)",
                    "ar": "\\((x+1)(x-2)\\)"
                },
                "solution": {
                    "eu": "\\(x^2-x-2\\)",
                    "es": "\\(x^2-x-2\\)",
                    "ar": "\\(x^2-x-2\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((2x-1)(x-1)\\)",
                    "es": "\\((2x-1)(x-1)\\)",
                    "ar": "\\((2x-1)(x-1)\\)"
                },
                "solution": {
                    "eu": "\\(2x^2-3x+1\\)",
                    "es": "\\(2x^2-3x+1\\)",
                    "ar": "\\(2x^2-3x+1\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((2x-3)(3x-2)\\)",
                    "es": "\\((2x-3)(3x-2)\\)",
                    "ar": "\\((2x-3)(3x-2)\\)"
                },
                "solution": {
                    "eu": "\\(6x^2-13x+6\\)",
                    "es": "\\(6x^2-13x+6\\)",
                    "ar": "\\(6x^2-13x+6\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((10x^5+8x^3-6x^2+12x) \\div 2x\\)",
                    "es": "\\((10x^5+8x^3-6x^2+12x) \\div 2x\\)",
                    "ar": "\\((10x^5+8x^3-6x^2+12x) \\div 2x\\)"
                },
                "solution": {
                    "eu": "\\(5x^4+4x^2-3x+6\\)",
                    "es": "\\(5x^4+4x^2-3x+6\\)",
                    "ar": "\\(5x^4+4x^2-3x+6\\)"
                }
            },
            {
                "id": 8,
                "difficulty": "hard",
                "question": {
                    "eu": "Kalkulatu \\(A+B+C\\): \\(A=3x^3-6x^2+4x-2\\), \\(B=x^3-3x+1\\), \\(C=2x^2+4x-5\\).",
                    "es": "Calcula \\(A+B+C\\): \\(A=3x^3-6x^2+4x-2\\), \\(B=x^3-3x+1\\), \\(C=2x^2+4x-5\\).",
                    "ar": "احسب \\(A+B+C\\): \\(A=3x^3-6x^2+4x-2\\)، \\(B=x^3-3x+1\\)، \\(C=2x^2+4x-5\\)."
                },
                "solution": {
                    "eu": "\\(4x^3-4x^2+5x-6\\)",
                    "es": "\\(4x^3-4x^2+5x-6\\)",
                    "ar": "\\(4x^3-4x^2+5x-6\\)"
                }
            },
            {
                "id": 9,
                "difficulty": "medium",
                "question": {
                    "eu": "\\(2x^2 \\cdot (5x^2+3x+4)\\)",
                    "es": "\\(2x^2 \\cdot (5x^2+3x+4)\\)",
                    "ar": "\\(2x^2 \\cdot (5x^2+3x+4)\\)"
                },
                "solution": {
                    "eu": "\\(10x^4+6x^3+8x^2\\)",
                    "es": "\\(10x^4+6x^3+8x^2\\)",
                    "ar": "\\(10x^4+6x^3+8x^2\\)"
                }
            },
            {
                "id": 10,
                "difficulty": "hard",
                "question": {
                    "eu": "\\((x+1)(x^2-x-1)\\)",
                    "es": "\\((x+1)(x^2-x-1)\\)",
                    "ar": "\\((x+1)(x^2-x-1)\\)"
                },
                "solution": {
                    "eu": "\\(x^3-2x-1\\)",
                    "es": "\\(x^3-2x-1\\)",
                    "ar": "\\(x^3-2x-1\\)"
                }
            }
        ]
    },
    {
        "id": "notables",
        "title": {
            "eu": "Produktu nabarmenak",
            "es": "Productos notables",
            "ar": "المنتجات الشهيرة"
        },
        "icon": "⭐",
        "color": "#8b5cf6",
        "count": 10,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "\\((x+3)^2\\)",
                    "es": "\\((x+3)^2\\)",
                    "ar": "\\((x+3)^2\\)"
                },
                "solution": {
                    "eu": "\\(x^2+6x+9\\)",
                    "es": "\\(x^2+6x+9\\)",
                    "ar": "\\(x^2+6x+9\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "\\((2x-5)^2\\)",
                    "es": "\\((2x-5)^2\\)",
                    "ar": "\\((2x-5)^2\\)"
                },
                "solution": {
                    "eu": "\\(4x^2-20x+25\\)",
                    "es": "\\(4x^2-20x+25\\)",
                    "ar": "\\(4x^2-20x+25\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": {
                    "eu": "\\((x+4)(x-4)\\)",
                    "es": "\\((x+4)(x-4)\\)",
                    "ar": "\\((x+4)(x-4)\\)"
                },
                "solution": {
                    "eu": "\\(x^2-16\\)",
                    "es": "\\(x^2-16\\)",
                    "ar": "\\(x^2-16\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((3x+2)^2\\)",
                    "es": "\\((3x+2)^2\\)",
                    "ar": "\\((3x+2)^2\\)"
                },
                "solution": {
                    "eu": "\\(9x^2+12x+4\\)",
                    "es": "\\(9x^2+12x+4\\)",
                    "ar": "\\(9x^2+12x+4\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((5x-1)^2\\)",
                    "es": "\\((5x-1)^2\\)",
                    "ar": "\\((5x-1)^2\\)"
                },
                "solution": {
                    "eu": "\\(25x^2-10x+1\\)",
                    "es": "\\(25x^2-10x+1\\)",
                    "ar": "\\(25x^2-10x+1\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "medium",
                "question": {
                    "eu": "\\((2x+3)(2x-3)\\)",
                    "es": "\\((2x+3)(2x-3)\\)",
                    "ar": "\\((2x+3)(2x-3)\\)"
                },
                "solution": {
                    "eu": "\\(4x^2-9\\)",
                    "es": "\\(4x^2-9\\)",
                    "ar": "\\(4x^2-9\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "hard",
                "question": {
                    "eu": "\\((2x^3+5x)^2\\)",
                    "es": "\\((2x^3+5x)^2\\)",
                    "ar": "\\((2x^3+5x)^2\\)"
                },
                "solution": {
                    "eu": "\\(4x^6+20x^4+25x^2\\)",
                    "es": "\\(4x^6+20x^4+25x^2\\)",
                    "ar": "\\(4x^6+20x^4+25x^2\\)"
                }
            },
            {
                "id": 8,
                "difficulty": "medium",
                "question": {
                    "eu": "Faktorizatu: \\(x^2+6x+9\\)",
                    "es": "Factoriza: \\(x^2+6x+9\\)",
                    "ar": "حلّل إلى عوامل: \\(x^2+6x+9\\)"
                },
                "solution": {
                    "eu": "\\((x+3)^2\\)",
                    "es": "\\((x+3)^2\\)",
                    "ar": "\\((x+3)^2\\)"
                }
            },
            {
                "id": 9,
                "difficulty": "medium",
                "question": {
                    "eu": "Faktorizatu: \\(4x^2-25\\)",
                    "es": "Factoriza: \\(4x^2-25\\)",
                    "ar": "حلّل إلى عوامل: \\(4x^2-25\\)"
                },
                "solution": {
                    "eu": "\\((2x+5)(2x-5)\\)",
                    "es": "\\((2x+5)(2x-5)\\)",
                    "ar": "\\((2x+5)(2x-5)\\)"
                }
            },
            {
                "id": 10,
                "difficulty": "hard",
                "question": {
                    "eu": "Kalkulatu buruz \\(99 \\times 101\\), produktu nabarmenak erabiliz.",
                    "es": "Calcula mentalmente \\(99 \\times 101\\) usando productos notables.",
                    "ar": "احسب ذهنيًا \\(99 \\times 101\\) باستعمال المنتجات الشهيرة."
                },
                "solution": {
                    "eu": "\\((100-1)(100+1)=100^2-1^2=10000-1=9999\\)",
                    "es": "\\((100-1)(100+1)=100^2-1^2=10000-1=9999\\)",
                    "ar": "\\((100-1)(100+1)=100^2-1^2=10000-1=9999\\)"
                }
            }
        ]
    },
    {
        "id": "factor",
        "title": {
            "eu": "Faktore komuna",
            "es": "Factor común",
            "ar": "العامل المشترك"
        },
        "icon": "🔑",
        "color": "#ec4899",
        "count": 8,
        "items": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": {
                    "eu": "Atera faktore komuna: \\(6x+9\\)",
                    "es": "Extrae factor com\u00fan: \\(6x+9\\)",
                    "ar": "استخرج العامل المشترك: \\(6x+9\\)"
                },
                "solution": {
                    "eu": "\\(3(2x+3)\\)",
                    "es": "\\(3(2x+3)\\)",
                    "ar": "\\(3(2x+3)\\)"
                }
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": {
                    "eu": "Atera faktore komuna: \\(4x^2+8x\\)",
                    "es": "Extrae factor com\u00fan: \\(4x^2+8x\\)",
                    "ar": "استخرج العامل المشترك: \\(4x^2+8x\\)"
                },
                "solution": {
                    "eu": "\\(4x(x+2)\\)",
                    "es": "\\(4x(x+2)\\)",
                    "ar": "\\(4x(x+2)\\)"
                }
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": {
                    "eu": "Atera faktore komuna: \\(5x^2+10xy+15x\\)",
                    "es": "Extrae factor com\u00fan: \\(5x^2+10xy+15x\\)",
                    "ar": "استخرج العامل المشترك: \\(5x^2+10xy+15x\\)"
                },
                "solution": {
                    "eu": "\\(5x(x+2y+3)\\)",
                    "es": "\\(5x(x+2y+3)\\)",
                    "ar": "\\(5x(x+2y+3)\\)"
                }
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": {
                    "eu": "Atera faktore komuna: \\(2a^2-8ab+4a^2b^2\\)",
                    "es": "Extrae factor com\u00fan: \\(2a^2-8ab+4a^2b^2\\)",
                    "ar": "استخرج العامل المشترك: \\(2a^2-8ab+4a^2b^2\\)"
                },
                "solution": {
                    "eu": "\\(2a(a-4b+2ab^2)\\)",
                    "es": "\\(2a(a-4b+2ab^2)\\)",
                    "ar": "\\(2a(a-4b+2ab^2)\\)"
                }
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": {
                    "eu": "Atera faktore komuna: \\(6a^2b+3ab^2-9ab\\)",
                    "es": "Extrae factor com\u00fan: \\(6a^2b+3ab^2-9ab\\)",
                    "ar": "استخرج العامل المشترك: \\(6a^2b+3ab^2-9ab\\)"
                },
                "solution": {
                    "eu": "\\(3ab(2a+b-3)\\)",
                    "es": "\\(3ab(2a+b-3)\\)",
                    "ar": "\\(3ab(2a+b-3)\\)"
                }
            },
            {
                "id": 6,
                "difficulty": "hard",
                "question": {
                    "eu": "Sinplifikatu: \\(\\dfrac{3x}{2x+xy}\\)",
                    "es": "Simplifica: \\(\\dfrac{3x}{2x+xy}\\)",
                    "ar": "بسّط: \\(\\dfrac{3x}{2x+xy}\\)"
                },
                "solution": {
                    "eu": "\\(\\dfrac{3x}{x(2+y)}=\\dfrac{3}{2+y}\\)",
                    "es": "\\(\\dfrac{3x}{x(2+y)}=\\dfrac{3}{2+y}\\)",
                    "ar": "\\(\\dfrac{3x}{x(2+y)}=\\dfrac{3}{2+y}\\)"
                }
            },
            {
                "id": 7,
                "difficulty": "hard",
                "question": {
                    "eu": "Sinplifikatu: \\(\\dfrac{4a}{4a+8b}\\)",
                    "es": "Simplifica: \\(\\dfrac{4a}{4a+8b}\\)",
                    "ar": "بسّط: \\(\\dfrac{4a}{4a+8b}\\)"
                },
                "solution": {
                    "eu": "\\(\\dfrac{4a}{4(a+2b)}=\\dfrac{a}{a+2b}\\)",
                    "es": "\\(\\dfrac{4a}{4(a+2b)}=\\dfrac{a}{a+2b}\\)",
                    "ar": "\\(\\dfrac{4a}{4(a+2b)}=\\dfrac{a}{a+2b}\\)"
                }
            },
            {
                "id": 8,
                "difficulty": "medium",
                "question": {
                    "eu": "Atera faktore komuna: \\(x+x^2-x^3\\)",
                    "es": "Extrae factor com\u00fan: \\(x+x^2-x^3\\)",
                    "ar": "استخرج العامل المشترك: \\(x+x^2-x^3\\)"
                },
                "solution": {
                    "eu": "\\(x(1+x-x^2)\\)",
                    "es": "\\(x(1+x-x^2)\\)",
                    "ar": "\\(x(1+x-x^2)\\)"
                }
            }
        ]
    }
]
