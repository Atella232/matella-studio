import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { Bach2gDerivativesStageId } from '../lessons.tsx'

/* ==========================================================================
   Deribatuak (Batxilergoa 2 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with
   its first star. Two games of its own (what does the next one cost?,
   match f and f′), the detective with the mistakes of this unit, the race
   and the memory.
   ========================================================================== */

export type Bach2gDerivativesGameId = 'race' | 'next-cost' | 'match-slope' | 'detective' | 'memory'

export const BACH2G_DERIVATIVES_GAME_RECORDS_KEY = 'matella-deribatuak-batx2g-game-records'

const level = (progressId: number, stage: Bach2gDerivativesStageId, title: [string, string, string, string], description: [string, string, string, string]) => ({
    progressId,
    stage,
    title: { eu: title[0], es: title[1], ar: title[2], en: title[3] },
    description: { eu: description[0], es: description[1], ar: description[2], en: description[3] }
})

export const bach2gDerivativesGames: GameInfo<Bach2gDerivativesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Deribatuen lasterketa', es: 'Carrera de derivadas', en: 'Derivatives race', ar: 'سباق المشتقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            level(146401, 'rate', ['T.V.M.', 'T.V.M.', 'معدل التغير', 'Average rate'], ['Tarteak eta limitea.', 'Intervalos y límite.', 'الفترات والنهاية.', 'Intervals and the limit.']),
            level(146402, 'point', ['Puntu batean', 'En un punto', 'عند نقطة', 'At a point'], ['Malda eta zuzen ukitzailea.', 'Pendiente y tangente.', 'الميل والمماس.', 'Slope and tangent.']),
            level(146403, 'rules', ['Erregelak', 'Reglas', 'القواعد', 'Rules'], ['Polinomioak, biderkadura eta zatidura.', 'Polinomios, producto y cociente.', 'الحدوديات والجداء وخارج القسمة.', 'Polynomials, product and quotient.']),
            level(146404, 'chain', ['Katea', 'Cadena', 'السلسلة', 'Chain'], ['Berreturak, e eta ln.', 'Potencias, e y ln.', 'القوى وe وln.', 'Powers, e and ln.']),
            level(146405, 'economy', ['Ekonomia', 'Economía', 'الاقتصاد', 'Economy'], ["f'', hurrengo unitatea eta lotura leuna.", "f'', la unidad siguiente y la unión suave.", "‏f'' والوحدة التالية والالتقاء الأملس.", "f'', the next unit and the smooth joint."])
        ]
    },
    {
        id: 'next-cost',
        title: { eu: 'Zenbat kostatzen da hurrengoa?', es: '¿Cuánto cuesta la siguiente?', en: 'What does the next one cost?', ar: 'كم تكلّف التالية؟' },
        tagline: { eu: 'Kostu, diru-sarrera edo irabazi bat eta produkzio bat: aukeratu hurrengo unitateak zenbat kostatzen edo ekartzen duen.', es: 'Un coste, un ingreso o un beneficio y una producción: elige cuánto cuesta o aporta la unidad siguiente.', en: 'A cost, an income or a profit and a production: pick what the next unit costs or brings in.', ar: 'تكلفة أو إيراد أو ربح وإنتاج: اختر كم تكلّف الوحدة التالية أو كم تضيف.' },
        skills: { eu: 'Deribatua hurrengo unitatearen kostu gisa', es: 'La derivada como lo que cuesta la unidad siguiente', en: 'The derivative as the cost of the next unit', ar: 'المشتقة بوصفها تكلفة الوحدة التالية' },
        levels: [
            level(146501, 'economy', ['Kostu koadratikoak', 'Costes cuadráticos', 'تكاليف تربيعية', 'Quadratic costs'], ['C = ax² + bx + F.', 'C = ax² + bx + F.', 'C = ax² + bx + F.', 'C = ax² + bx + F.']),
            level(146502, 'chain', ['Erroak eta logaritmoak', 'Raíces y logaritmos', 'الجذور واللوغاريتمات', 'Roots and logarithms'], ['Eskala-ekonomiak.', 'Economías de escala.', 'وفورات الحجم.', 'Economies of scale.']),
            level(146503, 'economy', ['Diru-sarrerak eta irabazia', 'Ingresos y beneficio', 'الإيراد والربح', 'Income and profit'], ["I' eta B' = I' − C'.", "I' y B' = I' − C'.", "‏I' و‏B' = I' − C'.", "I' and B' = I' − C'."])
        ]
    },
    {
        id: 'match-slope',
        title: { eu: 'Lotu f eta f′', es: 'Une f con f′', en: 'Match f with f′', ar: 'صِل f بـ f′' },
        tagline: { eu: 'Funtzio baten formula eta hiru grafiko: zein da haren deribatuarena?', es: 'La fórmula de una función y tres gráficas: ¿cuál es la de su derivada?', en: 'A formula and three graphs: which one is its derivative?', ar: 'صيغة دالة وثلاثة تمثيلات: أيها تمثيل مشتقتها؟' },
        skills: { eu: 'Deribatua kalkulatu eta irakurri', es: 'Calcular y leer la derivada', en: 'Work out and read the derivative', ar: 'حساب المشتقة وقراءتها' },
        levels: [
            level(146601, 'rules', ['Parabolak', 'Parábolas', 'القطوع المكافئة', 'Parabolas'], ["f' zuzen bat da.", "f' es una recta.", "‏f' مستقيم.", "f' is a line."]),
            level(146602, 'rules', ['Kubikoak', 'Cúbicas', 'التكعيبية', 'Cubics'], ["f' parabola bat da.", "f' es una parábola.", "‏f' قطع مكافئ.", "f' is a parabola."]),
            level(146603, 'chain', ['e eta ln', 'e y ln', 'e وln', 'e and ln'], ['Barrukoaren deribatua ez ahaztu.', 'No olvides la derivada de dentro.', 'لا تنس مشتقة الداخل.', 'Do not forget the inside.'])
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Deribatuen detektibea', es: 'Detective de derivadas', en: 'Derivatives detective', ar: 'مخبر المشتقات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: 'Deribatuen akats ohikoak', es: 'Los errores típicos de las derivadas', en: 'The typical mistakes with derivatives', ar: 'الأخطاء الشائعة في المشتقات' },
        levels: [
            level(146701, 'point', ['Tasa eta puntua', 'Tasa y punto', 'المعدل والنقطة', 'Rate and point'], ['Zatitu, malda eta h.', 'Dividir, pendiente y h.', 'القسمة والميل وh.', 'Dividing, slope and h.']),
            level(146702, 'chain', ['Erregelak', 'Reglas', 'القواعد', 'Rules'], ['Biderkadura, katea eta ln.', 'Producto, cadena y ln.', 'الجداء والسلسلة وln.', 'Product, chain and ln.']),
            level(146703, 'economy', ['Ekonomia', 'Economía', 'الاقتصاد', 'Economy'], ["Batez bestekoa, lotunea, f'' eta eᵏᵗ.", "Medio, unión, f'' y eᵏᵗ.", "المتوسط والالتقاء و‏f'' وeᵏᵗ.", "Average, joint, f'' and eᵏᵗ."])
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Deribatuen memoria', es: 'Memoria de derivadas', en: 'Derivatives memory', ar: 'ذاكرة المشتقات' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere deribatua.', es: 'Encuentra las parejas: una función y su derivada.', en: 'Find the pairs: a function and its derivative.', ar: 'اعثر على الأزواج: دالة ومشتقتها.' },
        skills: { eu: 'Berreturak, katea eta hurrengo unitatea', es: 'Potencias, cadena y unidad siguiente', en: 'Powers, chain and the next unit', ar: 'القوى والسلسلة والوحدة التالية' },
        levels: [
            level(146801, 'rules', ['Berreturak', 'Potencias', 'القوى', 'Powers'], ['xⁿ eta polinomioak.', 'xⁿ y polinomios.', 'xⁿ والحدوديات.', 'xⁿ and polynomials.']),
            level(146802, 'chain', ['Katea', 'Cadena', 'السلسلة', 'Chain'], ['Berreturak, e eta ln.', 'Potencias, e y ln.', 'القوى وe وln.', 'Powers, e and ln.']),
            level(146803, 'economy', ['Hurrengo unitatea', 'Unidad siguiente', 'الوحدة التالية', 'Next unit'], ["C'(x) zenbaki gisa.", "C'(x) como número.", "‏C'(x) عددًا.", "C'(x) as a number."])
        ]
    }
]

export const bach2gDerivativesGameProgressIds: number[] = levelProgressIds(bach2gDerivativesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2gDerivativesGameSlugs: Record<Bach2gDerivativesGameId, string> = { race: 'lasterketa', 'next-cost': 'hurrengoa', 'match-slope': 'lotu', detective: 'detektibea', memory: 'memoria' }

export function bach2gDerivativesGameModeForPath(pathname: string): Bach2gDerivativesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['hurrengoa', 'la-siguiente'].includes(game)) return 'next-cost'
    if (['lotu', 'une'].includes(game)) return 'match-slope'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
