import { fixMojibake } from '../../utils/fixText'

export type AlgebraLang = 'eu' | 'es' | 'ar'

export interface LocalizedText {
    eu: string
    es: string
    ar: string
}

export interface TheoryBlock {
    heading: LocalizedText
    paragraphs: LocalizedText[]
    bullets?: LocalizedText[]
    formula?: string
    examples?: LocalizedText[]
    note?: LocalizedText
}

export interface TheorySectionData {
    id: string
    title: LocalizedText
    icon: string
    color: string
    blocks: TheoryBlock[]
}

export interface MissionData {
    id: number
    difficulty: 'hasiberria' | 'aurreratua' | 'maisu'
    title: LocalizedText
    description: LocalizedText
    hint: LocalizedText
    success: LocalizedText
    error: LocalizedText
    answer: string[]
    points: number
}

export interface QuizQuestion {
    category: 'monomios' | 'polinomios' | 'mixed'
    question: LocalizedText
    options: LocalizedText[]
    answer: number
}

export const algebraHome = {
    title: {
        eu: 'Aljebra DBH 2',
        es: 'Ãlgebra 2Âº ESO',
        ar: 'Ø§Ù„Ø¬Ø¨Ø± 2 DBH'
    },
    subtitle: {
        eu: 'Ikasi hizkuntza aljebraikoa zentzuz',
        es: 'Aprende lenguaje algebraico con sentido',
        ar: 'ØªØ¹Ù„Ù‘Ù… Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¬Ø¨Ø±ÙŠØ© Ø¨ÙÙ‡Ù…'
    },
    description: {
        eu: 'Algebra 2 DBH proiektuko eduki osoa Matellaren markan berrantolatuta: teoria txarteletan, laborategi interaktiboa, erronkak eta joku azkarrak.',
        es: 'Todo el contenido del proyecto Algebra 2 DBH, reorganizado dentro de la marca Matella: teorÃ­a en tarjetas, laboratorio interactivo, retos y juegos rÃ¡pidos.',
        ar: 'ÙƒÙ„ Ù…Ø­ØªÙˆÙ‰ Ù…Ø´Ø±ÙˆØ¹ Algebra 2 DBH Ù…Ø¹Ø§Ø¯ ØªÙ†Ø¸ÙŠÙ…Ù‡ Ø¯Ø§Ø®Ù„ Ù‡ÙˆÙŠØ© Matella: Ù†Ø¸Ø±ÙŠØ© Ø¨Ø¨Ø·Ø§Ù‚Ø§ØªØŒ Ù…Ø®ØªØ¨Ø± ØªÙØ§Ø¹Ù„ÙŠØŒ ØªØ­Ø¯ÙŠØ§Øª ÙˆØ£Ù„Ø¹Ø§Ø¨ Ø³Ø±ÙŠØ¹Ø©.'
    },
    featureTheory: {
        eu: 'Hizkuntza aljebraikoa, monomioak, polinomioak, produktu nabarmenak eta faktore komuna txartel bidez landuta.',
        es: 'Lenguaje algebraico, monomios, polinomios, productos notables y factor comÃºn trabajados con tarjetas expandibles.',
        ar: 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¬Ø¨Ø±ÙŠØ© ÙˆØ§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠØ© ÙˆÙƒØ«ÙŠØ±Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯ ÙˆØ§Ù„Ù…ØªØ·Ø§Ø¨Ù‚Ø§Øª Ø§Ù„Ø´Ù‡ÙŠØ±Ø© ÙˆØ§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ ÙÙŠ Ø¨Ø·Ø§Ù‚Ø§Øª Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙˆØ³ÙŠØ¹.'
    },
    featureLab: {
        eu: 'Balio numerikoaren kalkulagailua, monomioen analizatzailea, produktu nabarmenen bisorea eta faktore komunaren laguntzailea.',
        es: 'Calculadora de valor numÃ©rico, analizador de monomios, visor de productos notables y asistente de factor comÃºn.',
        ar: 'Ø­Ø§Ø³Ø¨Ø© Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø¹Ø¯Ø¯ÙŠØ©ØŒ Ù…Ø­Ù„Ù„ Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠØ©ØŒ Ø¹Ø§Ø±Ø¶ Ø§Ù„Ù…ØªØ·Ø§Ø¨Ù‚Ø§Øª Ø§Ù„Ø´Ù‡ÙŠØ±Ø© ÙˆÙ…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ.'
    },
    featureMissions: {
        eu: 'Ariketak eta egoera gidatuak hiru mailatan antolatuta, pausoz pauso pentsatzeko.',
        es: 'Ejercicios y situaciones guiadas organizadas en tres niveles para pensar paso a paso.',
        ar: 'ØªÙ…Ø§Ø±ÙŠÙ† ÙˆÙ…ÙˆØ§Ù‚Ù Ù…ÙˆØ¬Ù‡Ø© Ù…Ù†Ø¸Ù…Ø© ÙÙŠ Ø«Ù„Ø§Ø«Ø© Ù…Ø³ØªÙˆÙŠØ§Øª Ù„Ù„ØªÙÙƒÙŠØ± Ø®Ø·ÙˆØ© Ø®Ø·ÙˆØ©.'
    },
    featureGames: {
        eu: 'Quiz dinamikoak eta partida azkarrak, ikasitakoa modu arinean sendotzeko.',
        es: 'Quizzes dinÃ¡micos y partidas rÃ¡pidas para afianzar lo aprendido de forma ligera.',
        ar: 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠØ© ÙˆØ¬ÙˆÙ„Ø§Øª Ø³Ø±ÙŠØ¹Ø© Ù„ØªØ±Ø³ÙŠØ® Ù…Ø§ ØªÙ… ØªØ¹Ù„Ù…Ù‡ Ø¨Ø·Ø±ÙŠÙ‚Ø© Ø®ÙÙŠÙØ©.'
    }
}

export const algebraTheorySections: TheorySectionData[] = [
    {
        id: 'lenguaje',
        title: {
            eu: 'Hizkuntza aljebraikoa',
            es: 'Lenguaje algebraico',
            ar: 'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¬Ø¨Ø±ÙŠØ©'
        },
        icon: 'ðŸ”¤',
        color: '#6366f1',
        blocks: [
            {
                heading: {
                    eu: 'Zer da aljebra?',
                    es: 'Â¿QuÃ© es el Ã¡lgebra?',
                    ar: 'Ù…Ø§ Ù‡Ùˆ Ø§Ù„Ø¬Ø¨Ø±ØŸ'
                },
                paragraphs: [
                    {
                        eu: 'Aljebra matematiken adarra da, eta letrak erabiltzen ditu ezezagunak edo alda daitezkeen kantitateak adierazteko.',
                        es: 'El Ã¡lgebra es la rama de las matemÃ¡ticas que usa letras para representar cantidades desconocidas o variables.',
                        ar: 'Ø§Ù„Ø¬Ø¨Ø± Ù‡Ùˆ ÙØ±Ø¹ Ø§Ù„Ø±ÙŠØ§Ø¶ÙŠØ§Øª Ø§Ù„Ø°ÙŠ ÙŠØ³ØªØ®Ø¯Ù… Ø§Ù„Ø­Ø±ÙˆÙ Ù„ØªÙ…Ø«ÙŠÙ„ ÙƒÙ…ÙŠØ§Øª Ù…Ø¬Ù‡ÙˆÙ„Ø© Ø£Ùˆ Ù…ØªØºÙŠØ±Ø©.'
                    },
                    {
                        eu: 'Horrela, egoera errealak modu orokorrean modelizatu ditzakegu eta arau orokorrak idatzi.',
                        es: 'Gracias a eso podemos modelizar situaciones reales de forma general y escribir reglas generales.',
                        ar: 'ÙˆØ¨Ø°Ù„Ùƒ Ù†Ø³ØªØ·ÙŠØ¹ Ù†Ù…Ø°Ø¬Ø© Ø§Ù„Ù…ÙˆØ§Ù‚Ù Ø§Ù„ÙˆØ§Ù‚Ø¹ÙŠØ© Ø¨Ø´ÙƒÙ„ Ø¹Ø§Ù… ÙˆÙƒØªØ§Ø¨Ø© Ù‚ÙˆØ§Ø¹Ø¯ Ø¹Ø§Ù…Ø©.'
                    }
                ],
                examples: [
                    {
                        eu: 'Langile batek $$x$$ euroko oinarrizko soldata eta aparteko ordu bakoitzeko $$16n$$ kobratzen badu, guztira $$S = x + 16n$$ izango du.',
                        es: 'Si una persona cobra un sueldo base de $$x$$ euros y $$16n$$ euros por horas extra, su salario total es $$S = x + 16n$$.',
                        ar: 'Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ø´Ø®Øµ ÙŠØªÙ‚Ø§Ø¶Ù‰ Ø±Ø§ØªØ¨Ø§Ù‹ Ø£Ø³Ø§Ø³ÙŠØ§Ù‹ Ù‚Ø¯Ø±Ù‡ $$x$$ ÙŠÙˆØ±Ùˆ Ùˆ $$16n$$ ÙŠÙˆØ±Ùˆ Ø¹Ù† Ø§Ù„Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¥Ø¶Ø§ÙÙŠØ©ØŒ ÙØ¥Ù† Ø±Ø§ØªØ¨Ù‡ Ø§Ù„ÙƒÙ„ÙŠ Ù‡Ùˆ $$S = x + 16n$$.'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Aldagaiak eta konstanteak',
                    es: 'Variables y constantes',
                    ar: 'Ø§Ù„Ù…ØªØºÙŠØ±Ø§Øª ÙˆØ§Ù„Ø«ÙˆØ§Ø¨Øª'
                },
                paragraphs: [
                    {
                        eu: 'Aldagaia balio desberdinak har ditzakeen letra da; konstantea, aldiz, zenbaki finkoa da.',
                        es: 'Una variable es una letra que puede tomar distintos valores; una constante es un nÃºmero fijo.',
                        ar: 'Ø§Ù„Ù…ØªØºÙŠØ± Ø­Ø±Ù ÙŠÙ…ÙƒÙ†Ù‡ Ø£Ø®Ø° Ù‚ÙŠÙ… Ù…Ø®ØªÙ„ÙØ©ØŒ Ø£Ù…Ø§ Ø§Ù„Ø«Ø§Ø¨Øª ÙÙ‡Ùˆ Ø¹Ø¯Ø¯ Ø«Ø§Ø¨Øª.'
                    }
                ],
                bullets: [
                    {
                        eu: 'Aldagai arruntak: $$x, y, a, b$$',
                        es: 'Variables tÃ­picas: $$x, y, a, b$$',
                        ar: 'Ù…ØªØºÙŠØ±Ø§Øª Ø´Ø§Ø¦Ø¹Ø©: $$x, y, a, b$$'
                    },
                    {
                        eu: 'Konstante arruntak: $$3, -7, \\pi$$',
                        es: 'Constantes tÃ­picas: $$3, -7, \\pi$$',
                        ar: 'Ø«ÙˆØ§Ø¨Øª Ø´Ø§Ø¦Ø¹Ø©: $$3, -7, \\pi$$'
                    }
                ],
                note: {
                    eu: 'Aljebran trebetasun garrantzitsuena hizkuntza arrunta adierazpen aljebraikora pasatzea da.',
                    es: 'Una de las habilidades clave en Ã¡lgebra es traducir el lenguaje cotidiano a expresiones algebraicas.',
                    ar: 'Ù…Ù† Ø£Ù‡Ù… Ù…Ù‡Ø§Ø±Ø§Øª Ø§Ù„Ø¬Ø¨Ø± ØªØ±Ø¬Ù…Ø© Ø§Ù„Ù„ØºØ© Ø§Ù„ÙŠÙˆÙ…ÙŠØ© Ø¥Ù„Ù‰ ØªØ¹Ø¨ÙŠØ±Ø§Øª Ø¬Ø¨Ø±ÙŠØ©.'
                }
            },
            {
                heading: {
                    eu: 'Itzulpen tipikoak',
                    es: 'Traducciones tÃ­picas',
                    ar: 'ØªØ±Ø¬Ù…Ø§Øª Ø´Ø§Ø¦Ø¹Ø©'
                },
                paragraphs: [
                    {
                        eu: 'Esaldi arruntak adierazpen bihurtzeak gero problemak planteatzeko bidea errazten du.',
                        es: 'Convertir frases habituales en expresiones facilita despuÃ©s el planteamiento de problemas.',
                        ar: 'ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¹Ø¨Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø¹ØªØ§Ø¯Ø© Ø¥Ù„Ù‰ ØªØ¹Ø¨ÙŠØ±Ø§Øª ÙŠØ³Ù‡Ù„ Ù„Ø§Ø­Ù‚Ø§Ù‹ ØµÙŠØ§ØºØ© Ø§Ù„Ù…Ø³Ø§Ø¦Ù„.'
                    }
                ],
                bullets: [
                    {
                        eu: 'Zenbaki baten hirukoitza -> $$3x$$',
                        es: 'El triple de un nÃºmero -> $$3x$$',
                        ar: 'Ø«Ù„Ø§Ø«Ø© Ø£Ù…Ø«Ø§Ù„ Ø¹Ø¯Ø¯ -> $$3x$$'
                    },
                    {
                        eu: 'Zenbaki baten karratua -> $$x^2$$',
                        es: 'El cuadrado de un nÃºmero -> $$x^2$$',
                        ar: 'Ù…Ø±Ø¨Ø¹ Ø¹Ø¯Ø¯ -> $$x^2$$'
                    },
                    {
                        eu: 'Zenbaki baten erdia gehi bost -> $$x/2 + 5$$',
                        es: 'La mitad de un nÃºmero mÃ¡s cinco -> $$x/2 + 5$$',
                        ar: 'Ù†ØµÙ Ø¹Ø¯Ø¯ Ø²Ø§Ø¦Ø¯ Ø®Ù…Ø³Ø© -> $$x/2 + 5$$'
                    }
                ]
            }
        ]
    },
    {
        id: 'monomios',
        title: {
            eu: 'Monomioak',
            es: 'Monomios',
            ar: 'Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠØ©'
        },
        icon: 'ðŸ”·',
        color: '#06b6d4',
        blocks: [
            {
                heading: {
                    eu: 'Monomio baten definizioa',
                    es: 'DefiniciÃ³n de monomio',
                    ar: 'ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ'
                },
                paragraphs: [
                    {
                        eu: 'Monomioa termino bakarreko adierazpen aljebraikoa da: zenbaki eta letren biderkadura, berretzaile oso positiboekin.',
                        es: 'Un monomio es una expresiÃ³n algebraica de un solo tÃ©rmino: producto de nÃºmeros y letras con exponentes enteros positivos.',
                        ar: 'Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ Ù‡Ùˆ ØªØ¹Ø¨ÙŠØ± Ø¬Ø¨Ø±ÙŠ Ø°Ùˆ Ø­Ø¯ ÙˆØ§Ø­Ø¯: Ø­Ø§ØµÙ„ Ø¶Ø±Ø¨ Ø£Ø¹Ø¯Ø§Ø¯ ÙˆØ­Ø±ÙˆÙ Ø¨Ø£Ø³Ø³ ØµØ­ÙŠØ­Ø© Ù…ÙˆØ¬Ø¨Ø©.'
                    }
                ],
                formula: '$$5x^2y,\\ -3ab^2c^3,\\ 7n^4,\\ -2$$'
            }
        ]
    },
    {
        id: 'opmonomios',
        title: {
            eu: 'Monomioen eragiketak',
            es: 'Operaciones con monomios',
            ar: 'Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠØ©'
        },
        icon: 'âš¡',
        color: '#10b981',
        blocks: [
            {
                heading: {
                    eu: 'Batuketa eta kenketa',
                    es: 'Suma y resta',
                    ar: 'Ø§Ù„Ø¬Ù…Ø¹ ÙˆØ§Ù„Ø·Ø±Ø­'
                },
                paragraphs: [
                    {
                        eu: 'Monomio antzekoekin bakarrik batu edo kendu daiteke: koefizienteak eragiten dira eta zati literala mantentzen da.',
                        es: 'Solo se pueden sumar o restar monomios semejantes: se operan los coeficientes y se conserva la parte literal.',
                        ar: 'Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø¬Ù…Ø¹ Ø£Ùˆ Ø·Ø±Ø­ Ø¥Ù„Ø§ Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ù…ØªØ´Ø§Ø¨Ù‡Ø©: Ù†Ø¹Ù…Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª ÙˆÙ†Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø­Ø±ÙÙŠ.'
                    }
                ],
                formula: '$$3x^2 + 5x^2 = 8x^2$$'
            }
        ]
    },
    {
        id: 'polinomios',
        title: {
            eu: 'Polinomioak',
            es: 'Polinomios',
            ar: 'ÙƒØ«ÙŠØ±Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯'
        },
        icon: 'ðŸ“ˆ',
        color: '#f472b6',
        blocks: [
            {
                heading: {
                    eu: 'Zer da polinomio bat?',
                    es: 'Â¿QuÃ© es un polinomio?',
                    ar: 'Ù…Ø§ Ù‡ÙŠ ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ØŸ'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioa monomioen batura da. Monomio bakoitza termino bat da polinomioaren barruan.',
                        es: 'Un polinomio es una suma de monomios. Cada monomio es un tÃ©rmino del polinomio.',
                        ar: 'ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ Ù‡ÙŠ Ù…Ø¬Ù…ÙˆØ¹ Ø­Ø¯ÙˆØ¯ Ø£Ø­Ø§Ø¯ÙŠØ©ØŒ ÙˆÙƒÙ„ Ø­Ø¯ Ø£Ø­Ø§Ø¯ÙŠ ÙŠÙ…Ø«Ù„ Ø­Ø¯Ù‘Ø§Ù‹ Ø¯Ø§Ø®Ù„ ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯.'
                    }
                ],
                formula: '$$P(x) = 3x^4 - 5x^2 + 2x - 7$$'
            },
            {
                heading: {
                    eu: 'Gradua, termino independentea eta balio numerikoa',
                    es: 'Grado, tÃ©rmino independiente y valor numÃ©rico',
                    ar: 'Ø§Ù„Ø¯Ø±Ø¬Ø© ÙˆØ§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³ØªÙ‚Ù„ ÙˆØ§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø¹Ø¯Ø¯ÙŠØ©'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioaren gradua berretzailerik handiena da; termino independentea aldagairik gabeko terminoari deritzo.',
                        es: 'El grado del polinomio es el mayor exponente; el tÃ©rmino independiente es el tÃ©rmino sin variable.',
                        ar: 'Ø¯Ø±Ø¬Ø© ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ Ù‡ÙŠ Ø£ÙƒØ¨Ø± Ø£Ø³ØŒ ÙˆØ§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³ØªÙ‚Ù„ Ù‡Ùˆ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø°ÙŠ Ù„Ø§ ÙŠØ­ØªÙˆÙŠ Ø¹Ù„Ù‰ Ù…ØªØºÙŠØ±.'
                    },
                    {
                        eu: 'Balio numerikoa aldagaiari zenbaki bat emanez kalkulatzen da.',
                        es: 'El valor numÃ©rico se calcula sustituyendo la variable por un nÃºmero.',
                        ar: 'ØªÙØ­Ø³Ø¨ Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø¹Ø¯Ø¯ÙŠØ© Ø¨ØªØ¹ÙˆÙŠØ¶ Ø§Ù„Ù…ØªØºÙŠØ± Ø¨Ø¹Ø¯Ø¯.'
                    }
                ],
                examples: [
                    {
                        eu: '$$P(x)=x^2-3x+1$$ eta $$x=4$$ bada, $$P(4)=16-12+1=5$$.',
                        es: 'Si $$P(x)=x^2-3x+1$$ y $$x=4$$, entonces $$P(4)=16-12+1=5$$.',
                        ar: 'Ø¥Ø°Ø§ ÙƒØ§Ù†Øª $$P(x)=x^2-3x+1$$ Ùˆ $$x=4$$ ÙØ¥Ù† $$P(4)=16-12+1=5$$.'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Polinomio aurkakoa',
                    es: 'Polinomio opuesto',
                    ar: 'ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ù…Ø¹Ø§ÙƒØ³Ø©'
                },
                paragraphs: [
                    {
                        eu: 'Polinomio aurkakoa termino guztien zeinua aldatuz lortzen da.',
                        es: 'El polinomio opuesto se obtiene cambiando el signo de todos los tÃ©rminos.',
                        ar: 'ØªÙØ­ØµÙ„ ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ù…Ø¹Ø§ÙƒØ³Ø© Ø¨ØªØºÙŠÙŠØ± Ø¥Ø´Ø§Ø±Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ø¯ÙˆØ¯.'
                    }
                ],
                formula: '$$P(x)=3x^3-5x+2 \\Rightarrow -P(x)=-3x^3+5x-2$$'
            }
        ]
    },
    {
        id: 'oppolinomios',
        title: {
            eu: 'Polinomioen eragiketak',
            es: 'Operaciones con polinomios',
            ar: 'Ø¹Ù…Ù„ÙŠØ§Øª ÙƒØ«ÙŠØ±Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯'
        },
        icon: 'ðŸ”¢',
        color: '#f59e0b',
        blocks: [
            {
                heading: {
                    eu: 'Batuketa eta kenketa',
                    es: 'Suma y resta',
                    ar: 'Ø§Ù„Ø¬Ù…Ø¹ ÙˆØ§Ù„Ø·Ø±Ø­'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioak batzeko edo kentzeko, termino antzekoak elkartu behar dira.',
                        es: 'Para sumar o restar polinomios hay que agrupar tÃ©rminos semejantes.',
                        ar: 'Ù„Ø¬Ù…Ø¹ Ø£Ùˆ Ø·Ø±Ø­ ÙƒØ«ÙŠØ±Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯ ÙŠØ¬Ø¨ ØªØ¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ù…ØªØ´Ø§Ø¨Ù‡Ø©.'
                    }
                ],
                examples: [
                    {
                        eu: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$',
                        es: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$',
                        ar: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Monomioz eta polinomioz biderkatzea',
                    es: 'MultiplicaciÃ³n por monomio y por polinomio',
                    ar: 'Ø§Ù„Ø¶Ø±Ø¨ ÙÙŠ Ø­Ø¯ Ø£Ø­Ø§Ø¯ÙŠ ÙˆÙÙŠ ÙƒØ«ÙŠØ±Ø© Ø­Ø¯ÙˆØ¯'
                },
                paragraphs: [
                    {
                        eu: 'Banaketa-propietatea aplikatzen da: monomio batek termino guztiak biderkatzen ditu; bi polinomiotan, lehenengoko termino bakoitza bigarreneko guztiekin.',
                        es: 'Se aplica la distributiva: un monomio multiplica todos los tÃ©rminos; con dos polinomios, cada tÃ©rmino del primero multiplica a todos los del segundo.',
                        ar: 'Ù†Ø·Ø¨Ù‚ Ø®Ø§ØµÙŠØ© Ø§Ù„ØªÙˆØ²ÙŠØ¹: Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ ÙŠØ¶Ø±Ø¨ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ø¯ÙˆØ¯ØŒ ÙˆÙ…Ø¹ ÙƒØ«ÙŠØ±ØªÙŠ Ø­Ø¯ÙˆØ¯ ÙŠØ¶Ø±Ø¨ ÙƒÙ„ Ø­Ø¯ Ù…Ù† Ø§Ù„Ø£ÙˆÙ„Ù‰ Ø¬Ù…ÙŠØ¹ Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø«Ø§Ù†ÙŠØ©.'
                    }
                ],
                examples: [
                    {
                        eu: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$',
                        es: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$',
                        ar: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$'
                    },
                    {
                        eu: '$$(x+1)(x-2)=x^2-x-2$$',
                        es: '$$(x+1)(x-2)=x^2-x-2$$',
                        ar: '$$(x+1)(x-2)=x^2-x-2$$'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Monomio baten arteko zatiketa',
                    es: 'DivisiÃ³n entre un monomio',
                    ar: 'Ø§Ù„Ù‚Ø³Ù…Ø© Ø¹Ù„Ù‰ Ø­Ø¯ Ø£Ø­Ø§Ø¯ÙŠ'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioko termino bakoitza monomio berekin zatitzen da.',
                        es: 'Se divide cada tÃ©rmino del polinomio entre el mismo monomio.',
                        ar: 'ÙŠÙÙ‚Ø³Ù… ÙƒÙ„ Ø­Ø¯ Ù…Ù† ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø¹Ù„Ù‰ Ù†ÙØ³ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ.'
                    }
                ],
                formula: '$$(6x^3 - 3x^2 + 12x) : 3x = 2x^2 - x + 4$$'
            }
        ]
    },
    {
        id: 'notables',
        title: {
            eu: 'Produktu nabarmenak',
            es: 'Productos notables',
            ar: 'Ø§Ù„Ù…ØªØ·Ø§Ø¨Ù‚Ø§Øª Ø§Ù„Ø´Ù‡ÙŠØ±Ø©'
        },
        icon: 'â­',
        color: '#8b5cf6',
        blocks: [
            {
                heading: {
                    eu: 'Hiru identitate nagusiak',
                    es: 'Tres identidades bÃ¡sicas',
                    ar: 'Ø«Ù„Ø§Ø« Ù‡ÙˆÙŠØ§Øª Ø£Ø³Ø§Ø³ÙŠØ©'
                },
                paragraphs: [
                    {
                        eu: 'Produktu nabarmenek biderketak azkartzen dituzte eta kalkulu mentala errazten dute.',
                        es: 'Los productos notables agilizan multiplicaciones y facilitan el cÃ¡lculo mental.',
                        ar: 'ØªØ³Ø±Ù‘Ø¹ Ø§Ù„Ù…ØªØ·Ø§Ø¨Ù‚Ø§Øª Ø§Ù„Ø´Ù‡ÙŠØ±Ø© Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¶Ø±Ø¨ ÙˆØªØ³Ù‡Ù‘Ù„ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ø°Ù‡Ù†ÙŠ.'
                    }
                ],
                bullets: [
                    { eu: '$$(a+b)^2 = a^2 + 2ab + b^2$$', es: '$$(a+b)^2 = a^2 + 2ab + b^2$$', ar: '$$(a+b)^2 = a^2 + 2ab + b^2$$' },
                    { eu: '$$(a-b)^2 = a^2 - 2ab + b^2$$', es: '$$(a-b)^2 = a^2 - 2ab + b^2$$', ar: '$$(a-b)^2 = a^2 - 2ab + b^2$$' },
                    { eu: '$$(a+b)(a-b)=a^2-b^2$$', es: '$$(a+b)(a-b)=a^2-b^2$$', ar: '$$(a+b)(a-b)=a^2-b^2$$' }
                ]
            },
            {
                heading: {
                    eu: 'Geometria bidezko interpretazioa',
                    es: 'InterpretaciÃ³n geomÃ©trica',
                    ar: 'ØªÙØ³ÙŠØ± Ù‡Ù†Ø¯Ø³ÙŠ'
                },
                paragraphs: [
                    {
                        eu: '$$(a+b)^2$$ karratu handia lau zatitan bana daiteke: $$a^2$$, bi $$ab$$ laukizuzen eta $$b^2$$.',
                        es: 'El cuadrado grande de lado $$(a+b)$$ se puede dividir en $$a^2$$, dos rectÃ¡ngulos $$ab$$ y $$b^2$$.',
                        ar: 'ÙŠÙ…ÙƒÙ† ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ù…Ø±Ø¨Ø¹ Ø§Ù„ÙƒØ¨ÙŠØ± Ø°ÙŠ Ø§Ù„Ø¶Ù„Ø¹ $$(a+b)$$ Ø¥Ù„Ù‰ $$a^2$$ ÙˆÙ…Ø³ØªØ·ÙŠÙ„ÙŠÙ† $$ab$$ Ùˆ $$b^2$$.'
                    }
                ],
                note: {
                    eu: 'Oroitzeko trikimailua: lehenaren karratua, bikoitza bider produktua, eta bigarrenaren karratua.',
                    es: 'Truco para recordar: cuadrado del primero, doble producto y cuadrado del segundo.',
                    ar: 'Ø­ÙŠÙ„Ø© Ù„Ù„Ø­ÙØ¸: Ù…Ø±Ø¨Ø¹ Ø§Ù„Ø£ÙˆÙ„ØŒ Ø¶Ø¹Ù Ø­Ø§ØµÙ„ Ø§Ù„Ø¶Ø±Ø¨ØŒ ÙˆÙ…Ø±Ø¨Ø¹ Ø§Ù„Ø«Ø§Ù†ÙŠ.'
                }
            }
        ]
    },
    {
        id: 'factor',
        title: {
            eu: 'Faktore komuna',
            es: 'Factor comÃºn',
            ar: 'Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ'
        },
        icon: 'ðŸ”‘',
        color: '#ec4899',
        blocks: [
            {
                heading: {
                    eu: 'Zer da faktore komuna?',
                    es: 'Â¿QuÃ© es el factor comÃºn?',
                    ar: 'Ù…Ø§ Ù‡Ùˆ Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±ÙƒØŸ'
                },
                paragraphs: [
                    {
                        eu: 'Banaketa-propietatearen alderantzizko prozesua da: termino guztietan agertzen den zatia kanpora ateratzen dugu.',
                        es: 'Es el proceso inverso de la distributiva: sacamos fuera la parte que aparece en todos los tÃ©rminos.',
                        ar: 'Ù‡Ùˆ Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ø¹ÙƒØ³ÙŠØ© Ù„Ù„ØªÙˆØ²ÙŠØ¹: Ù†ÙØ®Ø±Ø¬ Ø¥Ù„Ù‰ Ø§Ù„Ø®Ø§Ø±Ø¬ Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø°ÙŠ ÙŠØ¸Ù‡Ø± ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ø¯ÙˆØ¯.'
                    }
                ],
                formula: '$$ax + ay = a(x+y)$$'
            },
            {
                heading: {
                    eu: 'Nola ateratzen da',
                    es: 'CÃ³mo se extrae',
                    ar: 'ÙƒÙŠÙ ÙŠÙØ³ØªØ®Ø±Ø¬'
                },
                paragraphs: [
                    {
                        eu: 'Pausoz pauso eginez, komuna den zatia identifikatu eta parentesi barruan geratzen dena berridazten dugu.',
                        es: 'Si lo hacemos paso a paso, identificamos la parte comun y reescribimos dentro del parentesis lo que queda.',
                        ar: 'إذا فعلنا ذلك خطوة خطوة، نحدد الجزء المشترك ونعيد كتابة ما يبقى داخل القوس.'
                    }
                ],
                bullets: [
                    { eu: 'Bilatu koefiziente guztien zati komun handiena.', es: 'Busca el mÃ¡ximo factor comÃºn numÃ©rico.', ar: 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ø£ÙƒØ¨Ø± Ø¹Ø§Ù…Ù„ Ù…Ø´ØªØ±Ùƒ Ø¹Ø¯Ø¯ÙŠ.' },
                    { eu: 'Hartu aldagai komunak berretzailerik txikienarekin.', es: 'Toma las variables comunes con el menor exponente.', ar: 'Ø®Ø° Ø§Ù„Ù…ØªØºÙŠØ±Ø§Øª Ø§Ù„Ù…Ø´ØªØ±ÙƒØ© Ø¨Ø£ØµØºØ± Ø£Ø³.' },
                    { eu: 'Zatitu termino bakoitza faktore horrekin.', es: 'Divide cada tÃ©rmino entre ese factor.', ar: 'Ø§Ù‚Ø³Ù… ÙƒÙ„ Ø­Ø¯ Ø¹Ù„Ù‰ Ø°Ù„Ùƒ Ø§Ù„Ø¹Ø§Ù…Ù„.' }
                ],
                examples: [
                    { eu: '$$6x + 9 = 3(2x + 3)$$', es: '$$6x + 9 = 3(2x + 3)$$', ar: '$$6x + 9 = 3(2x + 3)$$' },
                    { eu: '$$4x^2 + 8x = 4x(x + 2)$$', es: '$$4x^2 + 8x = 4x(x + 2)$$', ar: '$$4x^2 + 8x = 4x(x + 2)$$' },
                    { eu: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$', es: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$', ar: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$' }
                ]
            }
        ]
    }
]

export const algebraMissions: MissionData[] = [
    {
        id: 1,
        difficulty: 'hasiberria',
        title: { eu: 'Esaldi bat itzuli', es: 'Traduce una frase', ar: 'ØªØ±Ø¬Ù… Ø¹Ø¨Ø§Ø±Ø©' },
        description: { eu: 'â€œZenbaki baten hirukoitza gehi 5â€ nola idatziko zenuke aljebran?', es: 'Â¿CÃ³mo escribirÃ­as en Ã¡lgebra â€œel triple de un nÃºmero mÃ¡s 5â€?', ar: 'ÙƒÙŠÙ ØªÙƒØªØ¨ Ø¬Ø¨Ø±ÙŠØ§Ù‹ â€œØ«Ù„Ø§Ø«Ø© Ø£Ù…Ø«Ø§Ù„ Ø¹Ø¯Ø¯ Ø²Ø§Ø¦Ø¯ 5â€ØŸ' },
        hint: { eu: 'Zenbakia $$x$$ dela hartu.', es: 'Toma el nÃºmero como $$x$$.', ar: 'Ø§Ø¹ØªØ¨Ø± Ø§Ù„Ø¹Ø¯Ø¯ $$x$$.' },
        success: { eu: 'Bikain! $$3x+5$$ da.', es: 'Muy bien. La expresiÃ³n es $$3x+5$$.', ar: 'Ø£Ø­Ø³Ù†Øª. Ø§Ù„ØªØ¹Ø¨ÙŠØ± Ù‡Ùˆ $$3x+5$$.' },
        error: { eu: 'Saiatu berriz: lehen hirukoitza, gero +5.', es: 'IntÃ©ntalo otra vez: primero el triple y despuÃ©s +5.', ar: 'Ø­Ø§ÙˆÙ„ Ù…Ù† Ø¬Ø¯ÙŠØ¯: Ø£ÙˆÙ„Ø§Ù‹ Ø§Ù„Ø«Ù„Ø§Ø«Ø© Ø£Ù…Ø«Ø§Ù„ Ø«Ù… +5.' },
        answer: ['3x+5', '5+3x'],
        points: 10
    },
    {
        id: 2,
        difficulty: 'hasiberria',
        title: { eu: 'Monomioaren gradua', es: 'Grado de un monomio', ar: 'Ø¯Ø±Ø¬Ø© Ø­Ø¯ Ø£Ø­Ø§Ø¯ÙŠ' },
        description: { eu: 'Zein da $$5x^2yz$$ monomioaren gradua?', es: 'Â¿CuÃ¡l es el grado del monomio $$5x^2yz$$?', ar: 'Ù…Ø§ Ø¯Ø±Ø¬Ø© Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ $$5x^2yz$$ØŸ' },
        hint: { eu: 'Berretzaile guztiak batu.', es: 'Suma todos los exponentes.', ar: 'Ø§Ø¬Ù…Ø¹ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø³Ø³.' },
        success: { eu: 'Zuzen! $$2+1+1=4$$.', es: 'Correcto. $$2+1+1=4$$.', ar: 'ØµØ­ÙŠØ­. $$2+1+1=4$$.' },
        error: { eu: 'Kontuz: koefizientea ez da graduan sartzen.', es: 'Ojo: el coeficiente no cuenta para el grado.', ar: 'Ø§Ù†ØªØ¨Ù‡: Ø§Ù„Ù…Ø¹Ø§Ù…Ù„ Ù„Ø§ ÙŠØ¯Ø®Ù„ ÙÙŠ Ø§Ù„Ø¯Ø±Ø¬Ø©.' },
        answer: ['4'],
        points: 10
    },
    {
        id: 3,
        difficulty: 'hasiberria',
        title: { eu: 'Antzeko terminoak', es: 'TÃ©rminos semejantes', ar: 'Ø­Ø¯ÙˆØ¯ Ù…ØªØ´Ø§Ø¨Ù‡Ø©' },
        description: { eu: 'Sinplifikatu: $$3x^2 + 5x^2$$', es: 'Simplifica: $$3x^2 + 5x^2$$', ar: 'Ø¨Ø³Ù‘Ø·: $$3x^2 + 5x^2$$' },
        hint: { eu: 'Koefizienteak batu eta $$x^2$$ mantendu.', es: 'Suma coeficientes y conserva $$x^2$$.', ar: 'Ø§Ø¬Ù…Ø¹ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª ÙˆØ§Ø­ØªÙØ¸ Ø¨Ù€ $$x^2$$.' },
        success: { eu: 'Oso ondo, emaitza $$8x^2$$ da.', es: 'Muy bien, el resultado es $$8x^2$$.', ar: 'Ø¬ÙŠØ¯ Ø¬Ø¯Ø§Ù‹ØŒ Ø§Ù„Ù†ØªÙŠØ¬Ø© Ù‡ÙŠ $$8x^2$$.' },
        error: { eu: 'Ez ahaztu zati literala berdina dela.', es: 'No olvides que la parte literal se mantiene igual.', ar: 'Ù„Ø§ ØªÙ†Ø³ Ø£Ù† Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø­Ø±ÙÙŠ ÙŠØ¨Ù‚Ù‰ ÙƒÙ…Ø§ Ù‡Ùˆ.' },
        answer: ['8x^2', '8x2'],
        points: 10
    },
    {
        id: 4,
        difficulty: 'aurreratua',
        title: { eu: 'Polinomioaren gradua', es: 'Grado de un polinomio', ar: 'Ø¯Ø±Ø¬Ø© ÙƒØ«ÙŠØ±Ø© Ø­Ø¯ÙˆØ¯' },
        description: { eu: 'Zein da $$2x^4 - 3x^2 + x - 5$$ polinomioaren gradua?', es: 'Â¿CuÃ¡l es el grado del polinomio $$2x^4 - 3x^2 + x - 5$$?', ar: 'Ù…Ø§ Ø¯Ø±Ø¬Ø© ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ø­Ø¯ÙˆØ¯ $$2x^4 - 3x^2 + x - 5$$ØŸ' },
        hint: { eu: 'Begiratu berretzailerik handiena.', es: 'Mira el mayor exponente.', ar: 'Ø§Ù†Ø¸Ø± Ø¥Ù„Ù‰ Ø£ÙƒØ¨Ø± Ø£Ø³.' },
        success: { eu: 'Bai, gradua 4 da.', es: 'SÃ­, el grado es 4.', ar: 'Ù†Ø¹Ù…ØŒ Ø§Ù„Ø¯Ø±Ø¬Ø© Ù‡ÙŠ 4.' },
        error: { eu: 'Gradua ez da termino kopurua.', es: 'El grado no es el nÃºmero de tÃ©rminos.', ar: 'Ø§Ù„Ø¯Ø±Ø¬Ø© Ù„ÙŠØ³Øª Ø¹Ø¯Ø¯ Ø§Ù„Ø­Ø¯ÙˆØ¯.' },
        answer: ['4'],
        points: 20
    },
    {
        id: 5,
        difficulty: 'aurreratua',
        title: { eu: 'Balio numerikoa', es: 'Valor numÃ©rico', ar: 'Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø¹Ø¯Ø¯ÙŠØ©' },
        description: { eu: 'Kalkulatu $$P(3)$$, baldin eta $$P(x)=x^2-2x+1$$.', es: 'Calcula $$P(3)$$ si $$P(x)=x^2-2x+1$$.', ar: 'Ø§Ø­Ø³Ø¨ $$P(3)$$ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª $$P(x)=x^2-2x+1$$.' },
        hint: { eu: 'Ordezkatu $$x$$-ren lekuan 3.', es: 'Sustituye $$x$$ por 3.', ar: 'Ø¹ÙˆÙ‘Ø¶ $$x$$ Ø¨Ù€ 3.' },
        success: { eu: 'Emaitza 4 da.', es: 'El resultado es 4.', ar: 'Ø§Ù„Ù†ØªÙŠØ¬Ø© Ù‡ÙŠ 4.' },
        error: { eu: 'Lehenik $$3^2$$ kalkulatu, gero -6 eta +1.', es: 'Primero calcula $$3^2$$, luego -6 y +1.', ar: 'Ø§Ø­Ø³Ø¨ Ø£ÙˆÙ„Ø§Ù‹ $$3^2$$ Ø«Ù… -6 Ø«Ù… +1.' },
        answer: ['4'],
        points: 20
    },
    {
        id: 6,
        difficulty: 'aurreratua',
        title: { eu: 'Produktu nabarmena', es: 'Producto notable', ar: 'Ù…ØªØ·Ø§Ø¨Ù‚Ø© Ø´Ù‡ÙŠØ±Ø©' },
        description: { eu: 'Garatu $$ (x+3)^2 $$', es: 'Desarrolla $$ (x+3)^2 $$', ar: 'Ø§Ù†Ø´Ø± $$ (x+3)^2 $$' },
        hint: { eu: 'Lehenaren karratua, bikoitza bider produktua eta bigarrenaren karratua.', es: 'Cuadrado del primero, doble producto y cuadrado del segundo.', ar: 'Ù…Ø±Ø¨Ø¹ Ø§Ù„Ø£ÙˆÙ„ØŒ Ø¶Ø¹Ù Ø­Ø§ØµÙ„ Ø§Ù„Ø¶Ø±Ø¨ØŒ ÙˆÙ…Ø±Ø¨Ø¹ Ø§Ù„Ø«Ø§Ù†ÙŠ.' },
        success: { eu: 'Bikain: $$x^2+6x+9$$.', es: 'Perfecto: $$x^2+6x+9$$.', ar: 'Ù…Ù…ØªØ§Ø²: $$x^2+6x+9$$.' },
        error: { eu: 'Tarteko terminoa $$2Â·xÂ·3$$ da.', es: 'El tÃ©rmino central es $$2Â·xÂ·3$$.', ar: 'Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£ÙˆØ³Ø· Ù‡Ùˆ $$2Â·xÂ·3$$.' },
        answer: ['x^2+6x+9', 'x2+6x+9'],
        points: 20
    },
    {
        id: 7,
        difficulty: 'maisu',
        title: { eu: 'Faktore komuna 1', es: 'Factor comÃºn 1', ar: 'Ø¹Ø§Ù…Ù„ Ù…Ø´ØªØ±Ùƒ 1' },
        description: { eu: 'Atera faktore komuna: $$4x^2 + 8x$$', es: 'Saca factor comÃºn: $$4x^2 + 8x$$', ar: 'Ø§Ø³ØªØ®Ø±Ø¬ Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ: $$4x^2 + 8x$$' },
        hint: { eu: 'Zenbakizkoa 4 da, eta letra komuna $$x$$.', es: 'El factor numÃ©rico es 4 y la letra comÃºn es $$x$$.', ar: 'Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ø¹Ø¯Ø¯ÙŠ Ù‡Ùˆ 4 ÙˆØ§Ù„Ø­Ø±Ù Ø§Ù„Ù…Ø´ØªØ±Ùƒ Ù‡Ùˆ $$x$$.' },
        success: { eu: 'Zuzen: $$4x(x+2)$$.', es: 'Correcto: $$4x(x+2)$$.', ar: 'ØµØ­ÙŠØ­: $$4x(x+2)$$.' },
        error: { eu: 'Parentesi barruko lehen terminoa $$x$$ da.', es: 'El primer tÃ©rmino dentro del parÃ©ntesis es $$x$$.', ar: 'Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£ÙˆÙ„ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù‚ÙˆØ³ Ù‡Ùˆ $$x$$.' },
        answer: ['4x(x+2)', '4x*(x+2)'],
        points: 30
    },
    {
        id: 8,
        difficulty: 'maisu',
        title: { eu: 'Faktore komuna 2', es: 'Factor comÃºn 2', ar: 'Ø¹Ø§Ù…Ù„ Ù…Ø´ØªØ±Ùƒ 2' },
        description: { eu: 'Atera faktore komuna: $$5x^2 + 10xy + 15x$$', es: 'Saca factor comÃºn: $$5x^2 + 10xy + 15x$$', ar: 'Ø§Ø³ØªØ®Ø±Ø¬ Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ: $$5x^2 + 10xy + 15x$$' },
        hint: { eu: 'Komuna $$5x$$ da.', es: 'El factor comÃºn es $$5x$$.', ar: 'Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ Ù‡Ùˆ $$5x$$.' },
        success: { eu: 'Primeran: $$5x(x+2y+3)$$.', es: 'Muy bien: $$5x(x+2y+3)$$.', ar: 'Ø¬ÙŠØ¯ Ø¬Ø¯Ø§Ù‹: $$5x(x+2y+3)$$.' },
        error: { eu: 'Zatitu termino bakoitza $$5x$$ bidez.', es: 'Divide cada tÃ©rmino entre $$5x$$.', ar: 'Ø§Ù‚Ø³Ù… ÙƒÙ„ Ø­Ø¯ Ø¹Ù„Ù‰ $$5x$$.' },
        answer: ['5x(x+2y+3)', '5x*(x+2y+3)'],
        points: 30
    },
    {
        id: 9,
        difficulty: 'maisu',
        title: { eu: 'Biderketa polinomikoa', es: 'MultiplicaciÃ³n de polinomios', ar: 'Ø¶Ø±Ø¨ ÙƒØ«ÙŠØ±Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯' },
        description: { eu: 'Garatu $$ (x+1)(x-2) $$', es: 'Desarrolla $$ (x+1)(x-2) $$', ar: 'Ø§Ù†Ø´Ø± $$ (x+1)(x-2) $$' },
        hint: { eu: 'Lehenengo polinomioko termino bakoitza bigarreneko guztiekin biderkatu.', es: 'Multiplica cada tÃ©rmino del primero por todos los del segundo.', ar: 'Ø§Ø¶Ø±Ø¨ ÙƒÙ„ Ø­Ø¯ Ù…Ù† Ø§Ù„Ø£ÙˆÙ„Ù‰ ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø«Ø§Ù†ÙŠØ©.' },
        success: { eu: 'Bai: $$x^2-x-2$$.', es: 'Exacto: $$x^2-x-2$$.', ar: 'ØµØ­ÙŠØ­: $$x^2-x-2$$.' },
        error: { eu: '$$xÂ·(-2)=-2x$$ eta $$1Â·x=x$$ gogoratu.', es: 'Recuerda que $$xÂ·(-2)=-2x$$ y $$1Â·x=x$$.', ar: 'ØªØ°ÙƒØ± Ø£Ù† $$xÂ·(-2)=-2x$$ Ùˆ $$1Â·x=x$$.' },
        answer: ['x^2-x-2', 'x2-x-2'],
        points: 40
    }
]

export const algebraQuizQuestions: QuizQuestion[] = [
    {
        category: 'monomios',
        question: { eu: 'Zein da $$5x^2yz$$ monomioaren gradua?', es: 'Â¿CuÃ¡l es el grado del monomio $$5x^2yz$$?', ar: 'Ù…Ø§ Ø¯Ø±Ø¬Ø© Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠ $$5x^2yz$$ØŸ' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '3', es: '3', ar: '3' }, { eu: '4', es: '4', ar: '4' }, { eu: '5', es: '5', ar: '5' }],
        answer: 2
    },
    {
        category: 'monomios',
        question: { eu: 'Sinplifikatu $$3x^2+5x^2$$', es: 'Simplifica $$3x^2+5x^2$$', ar: 'Ø¨Ø³Ù‘Ø· $$3x^2+5x^2$$' },
        options: [{ eu: '$$8x^2$$', es: '$$8x^2$$', ar: '$$8x^2$$' }, { eu: '$$8x^4$$', es: '$$8x^4$$', ar: '$$8x^4$$' }, { eu: '$$15x^2$$', es: '$$15x^2$$', ar: '$$15x^2$$' }, { eu: '$$15x^4$$', es: '$$15x^4$$', ar: '$$15x^4$$' }],
        answer: 0
    },
    {
        category: 'monomios',
        question: { eu: 'Kalkulatu $$3x^2 Â· 4x^3$$', es: 'Calcula $$3x^2 Â· 4x^3$$', ar: 'Ø§Ø­Ø³Ø¨ $$3x^2 Â· 4x^3$$' },
        options: [{ eu: '$$7x^5$$', es: '$$7x^5$$', ar: '$$7x^5$$' }, { eu: '$$12x^5$$', es: '$$12x^5$$', ar: '$$12x^5$$' }, { eu: '$$12x^6$$', es: '$$12x^6$$', ar: '$$12x^6$$' }, { eu: '$$7x^6$$', es: '$$7x^6$$', ar: '$$7x^6$$' }],
        answer: 1
    },
    {
        category: 'polinomios',
        question: { eu: 'Zein da $$2x^4-3x^2+x-5$$ polinomioaren gradua?', es: 'Â¿CuÃ¡l es el grado de $$2x^4-3x^2+x-5$$?', ar: 'Ù…Ø§ Ø¯Ø±Ø¬Ø© $$2x^4-3x^2+x-5$$ØŸ' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '3', es: '3', ar: '3' }, { eu: '4', es: '4', ar: '4' }, { eu: '5', es: '5', ar: '5' }],
        answer: 2
    },
    {
        category: 'polinomios',
        question: { eu: 'Kalkulatu $$P(3)$$, $$P(x)=x^2-2x+1$$ bada.', es: 'Calcula $$P(3)$$ si $$P(x)=x^2-2x+1$$.', ar: 'Ø§Ø­Ø³Ø¨ $$P(3)$$ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª $$P(x)=x^2-2x+1$$.' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '4', es: '4', ar: '4' }, { eu: '6', es: '6', ar: '6' }, { eu: '9', es: '9', ar: '9' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Garatu $$(x+3)^2$$', es: 'Desarrolla $$(x+3)^2$$', ar: 'Ø§Ù†Ø´Ø± $$(x+3)^2$$' },
        options: [{ eu: '$$x^2+3x+9$$', es: '$$x^2+3x+9$$', ar: '$$x^2+3x+9$$' }, { eu: '$$x^2+6x+9$$', es: '$$x^2+6x+9$$', ar: '$$x^2+6x+9$$' }, { eu: '$$x^2+9$$', es: '$$x^2+9$$', ar: '$$x^2+9$$' }, { eu: '$$x^2+6x+6$$', es: '$$x^2+6x+6$$', ar: '$$x^2+6x+6$$' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Atera faktore komuna: $$4x^2+8x$$', es: 'Saca factor comÃºn: $$4x^2+8x$$', ar: 'Ø§Ø³ØªØ®Ø±Ø¬ Ø§Ù„Ø¹Ø§Ù…Ù„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ: $$4x^2+8x$$' },
        options: [{ eu: '$$4(x^2+2x)$$', es: '$$4(x^2+2x)$$', ar: '$$4(x^2+2x)$$' }, { eu: '$$4x(x+2)$$', es: '$$4x(x+2)$$', ar: '$$4x(x+2)$$' }, { eu: '$$8x(x+1)$$', es: '$$8x(x+1)$$', ar: '$$8x(x+1)$$' }, { eu: '$$(4x)^2+2$$', es: '$$(4x)^2+2$$', ar: '$$(4x)^2+2$$' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Kalkulatu $$(a+b)(a-b)$$', es: 'Calcula $$(a+b)(a-b)$$', ar: 'Ø§Ø­Ø³Ø¨ $$(a+b)(a-b)$$' },
        options: [{ eu: '$$a^2+b^2$$', es: '$$a^2+b^2$$', ar: '$$a^2+b^2$$' }, { eu: '$$a^2-2ab+b^2$$', es: '$$a^2-2ab+b^2$$', ar: '$$a^2-2ab+b^2$$' }, { eu: '$$a^2-b^2$$', es: '$$a^2-b^2$$', ar: '$$a^2-b^2$$' }, { eu: '$$a^2+2ab-b^2$$', es: '$$a^2+2ab-b^2$$', ar: '$$a^2+2ab-b^2$$' }],
        answer: 2
    }
]

export function normalizeAlgebraLang(lang?: string): AlgebraLang {
    if (lang?.startsWith('es')) return 'es'
    if (lang?.startsWith('ar')) return 'ar'
    return 'eu'
}

export function pickText(lang: AlgebraLang, text: LocalizedText) {
    return fixMojibake(text[lang])
}

export function pickIcon(icon: string) {
    return fixMojibake(icon)
}

