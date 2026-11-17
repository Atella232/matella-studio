import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { Bach2gIntegralsStageId } from '../lessons.tsx'

/* ==========================================================================
   Integralak (Batxilergoa 2 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Two games of its own (which antiderivative is it?, signed
   area), the detective with the mistakes of this unit, the race and the
   memory.
   ========================================================================== */

export type Bach2gIntegralsGameId = 'race' | 'primitive' | 'signed' | 'detective' | 'memory'

export const BACH2G_INTEGRALS_GAME_RECORDS_KEY = 'matella-integralak-batx2g-game-records'

const level = (progressId: number, stage: Bach2gIntegralsStageId, title: [string, string, string, string], description: [string, string, string, string]) => ({
    progressId,
    stage,
    title: { eu: title[0], es: title[1], ar: title[2], en: title[3] },
    description: { eu: description[0], es: description[1], ar: description[2], en: description[3] }
})

export const bach2gIntegralsGames: GameInfo<Bach2gIntegralsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Integralen lasterketa', es: 'Carrera de integrales', en: 'Integrals race', ar: 'سباق التكاملات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            level(149401, 'primitives', ['Jatorrizkoak', 'Primitivas', 'الدوال الأصلية', 'Antiderivatives'], ['Berreturak eta C.', 'Potencias y C.', 'القوى وC.', 'Powers and C.']),
            level(149402, 'composite', ['Konposatuak', 'Compuestas', 'المركبة', 'Compound'], ['Katea, ln eta e.', 'Cadena, ln y e.', 'السلسلة وln وe.', 'Chain, ln and e.']),
            level(149403, 'definite', ['Mugatua', 'Definida', 'المحدد', 'Definite'], ['Barrow eta propietateak.', 'Barrow y propiedades.', 'بارو والخواص.', 'Barrow and properties.']),
            level(149404, 'areas', ['Azalerak', 'Áreas', 'المساحات', 'Areas'], ['Ardatza eta bi kurba.', 'Eje y dos curvas.', 'المحور ومنحنيان.', 'Axis and two curves.']),
            level(149405, 'economy', ['Ekonomia', 'Economía', 'الاقتصاد', 'Economy'], ['Kostuak, salmentak eta diru-sarrerak.', 'Costes, ventas e ingresos.', 'التكاليف والمبيعات والإيراد.', 'Costs, sales and income.'])
        ]
    },
    {
        id: 'primitive',
        title: { eu: 'Zein da jatorrizkoa?', es: '¿Qué primitiva es?', en: 'Which antiderivative is it?', ar: 'أي دالة أصلية هي؟' },
        tagline: { eu: 'Funtzio bat eta lau hautagai: aukeratu jatorrizkoa, deribatuz egiaztatuta.', es: 'Una función y cuatro candidatas: elige la primitiva comprobando al derivar.', en: 'A function and four candidates: pick the antiderivative, checking by differentiating.', ar: 'دالة وأربعة مرشحين: اختر الدالة الأصلية متحققًا بالاشتقاق.' },
        skills: { eu: 'Berehalako integralak', es: 'Integrales inmediatas', en: 'Immediate integrals', ar: 'التكاملات الفورية' },
        levels: [
            level(149501, 'primitives', ['Berreturak', 'Potencias', 'القوى', 'Powers'], ['Berretzailea igo eta zatitu.', 'Subir el exponente y dividir.', 'ارفع الأس واقسم.', 'Raise the exponent and divide.']),
            level(149502, 'primitives', ['e eta 1/x', 'e y 1/x', 'e و1/x', 'e and 1/x'], ['Esponentziala eta logaritmoa.', 'Exponencial y logaritmo.', 'الأسية واللوغاريتم.', 'Exponential and logarithm.']),
            level(149503, 'composite', ['Katea', 'Cadena', 'السلسلة', 'Chain'], ["f'·fⁿ eta f'/f.", "f'·fⁿ y f'/f.", "‏f'·fⁿ و‏f'/f.", "f'·fⁿ and f'/f."])
        ]
    },
    {
        id: 'signed',
        title: { eu: 'Azalera zeinuarekin', es: 'Área con signo', en: 'Signed area', ar: 'المساحة بالإشارة' },
        tagline: { eu: 'Integral baten balioa: azalera da, zeinuz aldatu behar da ala tartea zatitu?', es: 'El valor de una integral: ¿es el área, hay que cambiarle el signo o partir el intervalo?', en: 'The value of an integral: is it the area, does its sign need changing or must the interval be split?', ar: 'قيمة تكامل: هل هي المساحة، أم يجب تغيير إشارتها، أم تقسيم الفترة؟' },
        skills: { eu: 'Integrala eta azalera bereiztu', es: 'Distinguir integral y área', en: 'Tell integral and area apart', ar: 'التمييز بين التكامل والمساحة' },
        levels: [
            level(149601, 'areas', ['Zuzenak', 'Rectas', 'المستقيمات', 'Lines'], ['Ebaki-puntu bat.', 'Un corte.', 'نقطة تقاطع واحدة.', 'One crossing.']),
            level(149602, 'areas', ['Parabolak', 'Parábolas', 'القطوع المكافئة', 'Parabolas'], ['Bi ebaki-puntu.', 'Dos cortes.', 'نقطتا تقاطع.', 'Two crossings.']),
            level(149603, 'areas', ['Nahastuta', 'Mezcladas', 'مختلطة', 'Mixed'], ['Kubikoak eta parabolak.', 'Cúbicas y parábolas.', 'التكعيبية والقطوع المكافئة.', 'Cubics and parabolas.'])
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Integralen detektibea', es: 'Detective de integrales', en: 'Integrals detective', ar: 'مخبر التكاملات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: 'Integraletako akats ohikoak', es: 'Los errores típicos con integrales', en: 'The typical mistakes with integrals', ar: 'الأخطاء الشائعة في التكاملات' },
        levels: [
            level(149701, 'primitives', ['Jatorrizkoak', 'Primitivas', 'الدوال الأصلية', 'Antiderivatives'], ['Zatitu, deribatua, C eta e.', 'Dividir, derivada, C y e.', 'القسمة والمشتقة وC وe.', 'Dividing, derivative, C and e.']),
            level(149702, 'definite', ['Mugatua', 'Definida', 'المحدد', 'Definite'], ['Barrow, katea, zabalera eta tarteak.', 'Barrow, cadena, anchura e intervalos.', 'بارو والسلسلة والعرض والفترات.', 'Barrow, chain, width and intervals.']),
            level(149703, 'economy', ['Azalerak eta ekonomia', 'Áreas y economía', 'المساحات والاقتصاد', 'Areas and economy'], ['Zeinua, goikoa, kostu finkoa eta erritmoa.', 'Signo, arriba, coste fijo y ritmo.', 'الإشارة والأعلى والتكلفة الثابتة والوتيرة.', 'Sign, top, fixed cost and rate.'])
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Integralen memoria', es: 'Memoria de integrales', en: 'Integrals memory', ar: 'ذاكرة التكاملات' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren jatorrizkoa.', es: 'Encuentra las parejas: una función y su primitiva.', en: 'Find the pairs: a function and its antiderivative.', ar: 'اعثر على الأزواج: دالة ودالتها الأصلية.' },
        skills: { eu: 'Berreturak, e, ln eta katea', es: 'Potencias, e, ln y cadena', en: 'Powers, e, ln and chain', ar: 'القوى وe وln والسلسلة' },
        levels: [
            level(149801, 'primitives', ['Berreturak', 'Potencias', 'القوى', 'Powers'], ['xⁿ.', 'xⁿ.', 'xⁿ.', 'xⁿ.']),
            level(149802, 'primitives', ['e eta 1/x', 'e y 1/x', 'e و1/x', 'e and 1/x'], ['eᵏˣ eta k/x.', 'eᵏˣ y k/x.', 'eᵏˣ وk/x.', 'eᵏˣ and k/x.']),
            level(149803, 'composite', ['Katea', 'Cadena', 'السلسلة', 'Chain'], ["f'·fⁿ eta f'/f.", "f'·fⁿ y f'/f.", "‏f'·fⁿ و‏f'/f.", "f'·fⁿ and f'/f."])
        ]
    }
]

export const bach2gIntegralsGameProgressIds: number[] = levelProgressIds(bach2gIntegralsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2gIntegralsGameSlugs: Record<Bach2gIntegralsGameId, string> = { race: 'lasterketa', primitive: 'jatorrizkoa', signed: 'zeinua', detective: 'detektibea', memory: 'memoria' }

export function bach2gIntegralsGameModeForPath(pathname: string): Bach2gIntegralsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['jatorrizkoa', 'primitiva'].includes(game)) return 'primitive'
    if (['zeinua', 'signo'].includes(game)) return 'signed'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
