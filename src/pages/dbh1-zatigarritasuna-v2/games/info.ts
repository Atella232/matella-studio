import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { FactorLevel } from '../../dbh2-zatigarritasuna/games/factor.ts'
import { bothRule, byRule, divisorRule, multipleRule, primeRule, type HuntLevel } from '../../dbh2-zatigarritasuna/games/hunt.ts'
import { pick } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Zatigarritasuna (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star. The hunt, the
   factorization and the memory are the 2. DBH games with first-year levels
   (rules for 2, 3, 5, 9 and 10 only, smaller numbers and primes).
   ========================================================================== */

export type IntroDivisibilityGameId = 'race' | 'hunt' | 'factor' | 'memory' | 'rectangles' | 'buses' | 'detective'

export const INTRO_DIVISIBILITY_GAME_RECORDS_KEY = 'matella-zatigarritasuna-dbh1-game-records'

export const introDivisibilityGames: GameInfo<IntroDivisibilityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zatigarritasunaren lasterketa', es: 'Carrera de divisibilidad', en: 'Divisibility race', ar: 'سباق قابلية القسمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 4101, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' }, description: { eu: 'Multiploak, zatitzaileak eta soberan geratzen dena.', es: 'Múltiplos, divisores y lo que sobra.', en: 'Multiples, divisors and what is left over.', ar: 'المضاعفات والقواسم وما يبقى.' } },
            { progressId: 4102, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', en: 'Divisibility rules', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9 eta 10: zatiketarik gabe.', es: '2, 3, 5, 9 y 10: sin dividir.', en: '2, 3, 5, 9 and 10: without dividing.', ar: '2 و3 و5 و9 و10: دون قسمة.' } },
            { progressId: 4103, stage: 'primes', title: { eu: 'Lehenak eta deskonposizioa', es: 'Primos y descomposición', en: 'Primes and factorisation', ar: 'الأعداد الأولية والتحليل' }, description: { eu: 'Lehena ala konposatua, eta deskonposizioak.', es: 'Primo o compuesto, y descomposiciones.', en: 'Prime or composite, and factorisations.', ar: 'أولي أم مؤلف، والتحليل.' } },
            { progressId: 4104, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ وم.م.أ' }, description: { eu: 'Ez nahastu: handiena ala txikiena?', es: 'No los confundas: ¿el mayor o el menor?', en: 'Don\'t mix them up: the greatest or the least?', ar: 'لا تخلط بينهما: الأكبر أم الأصغر؟' } },
            { progressId: 4105, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Lauzak, poltsak, autobusak eta argiak.', es: 'Baldosas, bolsas, autobuses y luces.', en: 'Tiles, bags, buses and lights.', ar: 'بلاط وأكياس وحافلات وأضواء.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', en: 'Number hunt', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', en: 'Press all the numbers that meet the condition, as fast as possible and without making any mistakes.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Multiploak, irizpideak eta lehenak', es: 'Múltiplos, criterios y primos', en: 'Multiples, divisibility rules and primes', ar: 'المضاعفات والقواعد والأعداد الأولية' },
        levels: [
            { progressId: 4201, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' }, description: { eu: '«4ren multiploak», «24ren zatitzaileak»…', es: '«Múltiplos de 4», «divisores de 24»…', en: '“Multiples of 4”, “divisors of 24”…', ar: '«مضاعفات 4»، «قواسم 24»…' } },
            { progressId: 4202, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', en: 'Divisibility rules', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9 eta 10, 200 arte.', es: '2, 3, 5, 9 y 10, hasta 200.', en: '2, 3, 5, 9 and 10, up to 200.', ar: '2 و3 و5 و9 و10، حتى 200.' } },
            { progressId: 4203, stage: 'primes', title: { eu: 'Lehenak eta bikoitzak', es: 'Primos y dobles criterios', en: 'Primes and combined rules', ar: 'الأولية والقواعد المزدوجة' }, description: { eu: 'Lehenak 100 arte, eta «2rekin eta 3rekin» bezalakoak.', es: 'Primos hasta 100, y condiciones como «por 2 y por 3».', en: 'Primes up to 100, and conditions such as “divisible by 2 and by 3”.', ar: 'الأعداد الأولية حتى 100 وشروط مثل «على 2 و3».' } }
        ]
    },
    {
        id: 'factor',
        title: { eu: 'Deskonposaketa azkarra', es: 'Descomposición rápida', en: 'Quick factorisation', ar: 'التحليل السريع' },
        tagline: { eu: 'Sakatu zenbakia zehazki zatitzen duten lehenak 1era iritsi arte. Erlojuaren aurka!', es: 'Pulsa los primos que dividen exactamente al número hasta llegar a 1. ¡Contra el reloj!', en: 'Press the primes that divide the number exactly until you reach 1. Against the clock!', ar: 'اضغط الأعداد الأولية التي تقسم العدد قسمة تامة حتى تصل إلى 1. ضد الساعة!' },
        skills: { eu: 'Biderkagai lehenak', es: 'Factores primos', en: 'Prime factors', ar: 'العوامل الأولية' },
        levels: [
            { progressId: 4301, stage: 'primes', title: { eu: '2 eta 3', es: 'El 2 y el 3', en: 'The 2 and the 3', ar: '2 و3' }, description: { eu: '100 arteko zenbakiak.', es: 'Números hasta 100.', en: 'Numbers up to 100.', ar: 'أعداد حتى 100.' } },
            { progressId: 4302, stage: 'primes', title: { eu: '5 ere bai', es: 'También el 5', en: 'Also the 5', ar: 'و5 أيضًا' }, description: { eu: '200 arteko zenbakiak.', es: 'Números hasta 200.', en: 'Numbers up to 200.', ar: 'أعداد حتى 200.' } },
            { progressId: 4303, stage: 'primes', title: { eu: '7 ere bai', es: 'También el 7', en: 'Also the 7', ar: 'و7 أيضًا' }, description: { eu: '500 arteko zenbakiak.', es: 'Números hasta 500.', en: 'Numbers up to 500.', ar: 'أعداد حتى 500.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: zenbaki bat eta bere deskonposizioa, edo ZKH/MKT bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un número y su descomposición, o un m.c.d./m.c.m. y su resultado.', en: 'Find the cards that are worth the same: a number and its factorisation, or a GCD or LCM and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عدد وتحليله، أو ق.م.أ/م.م.أ وناتجه.' },
        skills: { eu: 'Deskonposizioa, ZKH eta MKT', es: 'Descomposición, m.c.d. y m.c.m.', en: 'Factorisation, GCD and LCM', ar: 'التحليل وق.م.أ وم.م.أ' },
        levels: [
            { progressId: 4401, stage: 'primes', title: { eu: 'Zenbakia eta deskonposizioa', es: 'Número y descomposición', en: 'Number and factorisation', ar: 'العدد وتحليله' }, description: { eu: '6 bikote: 36 ↔ 2² · 3².', es: '6 parejas: 36 ↔ 2² · 3².', en: '6 pairs: 36 ↔ 2² · 3².', ar: '6 أزواج: 36 ↔ 2² · 3².' } },
            { progressId: 4402, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ وم.م.أ' }, description: { eu: '8 bikote. Kontuz: bikote bereko ZKH eta MKT biak daude.', es: '8 parejas. Cuidado: están el m.c.d. y el m.c.m. de la misma pareja.', en: '8 pairs. Careful: both the GCD and the LCM of the same pair are there.', ar: '8 أزواج. انتبه: ق.م.أ وم.م.أ للزوج نفسه كلاهما موجود.' } },
            { progressId: 4403, stage: 'primes', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zenbakia, deskonposizioa eta biderketa bat.', es: '6 tríos: número, descomposición y una multiplicación.', en: '6 trios: number, factorisation and a multiplication.', ar: '6 ثلاثيات: العدد وتحليله وعملية ضرب.' } }
        ]
    },
    {
        id: 'rectangles',
        title: { eu: 'Laukizuzenak', es: 'Rectángulos', en: 'Rectangles', ar: 'المستطيلات' },
        tagline: { eu: 'Zenbat laukizuzen desberdin egin daitezke N lauzarekin? Gero, denak marraztuta.', es: '¿Cuántos rectángulos distintos se forman con N baldosas? Luego, todos dibujados.', en: 'How many different rectangles can be made with N tiles? Then all of them are drawn.', ar: 'كم مستطيلًا مختلفًا نكوّن من N بلاطة؟ ثم نرسمها كلها.' },
        skills: { eu: 'Zatitzaileak bikoteka', es: 'Divisores por parejas', en: 'Divisors in pairs', ar: 'القواسم أزواجًا' },
        levels: [
            { progressId: 4501, stage: 'multiples', title: { eu: 'Zenbaki txikiak', es: 'Números pequeños', en: 'Small numbers', ar: 'أعداد صغيرة' }, description: { eu: '6 eta 24 artean.', es: 'Entre 6 y 24.', en: 'From 6 to 24.', ar: 'بين 6 و24.' } },
            { progressId: 4502, stage: 'multiples', title: { eu: 'Zatitzaile asko', es: 'Muchos divisores', en: 'Many divisors', ar: 'قواسم كثيرة' }, description: { eu: 'Karratuak ere bai: 6 × 6.', es: 'También cuadrados: 6 × 6.', en: 'Squares too: 6 × 6.', ar: 'والمربعات أيضًا: 6 × 6.' } },
            { progressId: 4503, stage: 'primes', title: { eu: 'Zenbat zatitzaile?', es: '¿Cuántos divisores?', en: 'How many divisors?', ar: 'كم قاسمًا؟' }, description: { eu: 'Lehenak eta karratuak barne.', es: 'Con primos y cuadrados.', en: 'Primes and squares included.', ar: 'مع الأعداد الأولية والمربعات.' } }
        ]
    },
    {
        id: 'buses',
        title: { eu: 'Autobusak eta zintak', es: 'Autobuses y cintas', en: 'Buses and ribbons', ar: 'الحافلات والأشرطة' },
        tagline: { eu: 'Noiz elkartzen dira berriro? Zein da zatirik luzeena? Gero, ordutegia edo zintak.', es: '¿Cuándo vuelven a coincidir? ¿Cuál es el trozo más largo? Luego, el horario o las cintas.', en: 'When do they meet again? What is the longest piece? Then the timetable or the ribbons.', ar: 'متى تلتقيان مرة أخرى؟ ما أطول قطعة؟ ثم الجدول الزمني أو الأشرطة.' },
        skills: { eu: 'ZKH eta MKT egoeretan', es: 'm.c.d. y m.c.m. en situaciones', en: 'GCD and LCM in situations', ar: 'ق.م.أ وم.م.أ في مواقف' },
        levels: [
            { progressId: 4601, stage: 'gcd-lcm', title: { eu: 'Autobusak: MKT', es: 'Autobuses: m.c.m.', en: 'Buses: LCM', ar: 'الحافلات: م.م.أ' }, description: { eu: 'Noiz elkartzen dira berriro?', es: '¿Cuándo vuelven a coincidir?', en: 'When do they meet again?', ar: 'متى تلتقيان مرة أخرى؟' } },
            { progressId: 4602, stage: 'gcd-lcm', title: { eu: 'Zintak: ZKH', es: 'Cintas: m.c.d.', en: 'Ribbons: GCD', ar: 'الأشرطة: ق.م.أ' }, description: { eu: 'Zatirik luzeenak, ezer soberan gabe.', es: 'Los trozos más largos sin que sobre nada.', en: 'The longest pieces with nothing left over.', ar: 'أطول القطع دون أن يتبقى شيء.' } },
            { progressId: 4603, stage: 'problems', title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', en: 'GCD or LCM?', ar: 'ق.م.أ أم م.م.أ؟' }, description: { eu: 'Bi egoerak nahastuta.', es: 'Las dos situaciones mezcladas.', en: 'Both situations mixed.', ar: 'الموقفان مختلطان.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Zatigarritasunaren detektibea', es: 'Detective de divisibilidad', en: 'Divisibility detective', ar: 'مخبر قابلية القسمة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Zatigarritasunean akats tipikoak', es: 'Errores típicos de divisibilidad', en: 'Common divisibility mistakes', ar: 'الأخطاء الشائعة في قابلية القسمة' },
        levels: [
            { progressId: 4701, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' }, description: { eu: 'Zatitzaile guztiak eta hiruren irizpidea.', es: 'Todos los divisores y el criterio del 3.', en: 'All the divisors and the rule for 3.', ar: 'كل القواسم وقاعدة القسمة على 3.' } },
            { progressId: 4702, stage: 'primes', title: { eu: 'Zenbaki lehenak', es: 'Números primos', en: 'Prime numbers', ar: 'الأعداد الأولية' }, description: { eu: 'Bata, bia eta zenbaki bakoitiak.', es: 'El 1, el 2 y los impares.', en: '1, 2 and the odd numbers.', ar: 'العدد 1 والعدد 2 والأعداد الفردية.' } },
            { progressId: 4703, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ وم.م.أ' }, description: { eu: 'Berretzaileak eta egoera.', es: 'Los exponentes y la situación.', en: 'The exponents and the situation.', ar: 'الأسس والموقف.' } }
        ]
    }
]

export const introDivisibilityGameProgressIds: number[] = levelProgressIds(introDivisibilityGames)

/** First-year levels for the 2. DBH hunt: no rule for 11, smaller numbers */
export const introHuntLevels: HuntLevel[] = [
    {
        rules: (random) => (random() < 0.5 ? multipleRule(pick(random, [2, 3, 4, 5, 6])) : divisorRule(pick(random, [24, 30, 36, 40, 48]))),
        range: (rule) => (rule.id.startsWith('divisor') ? [1, Number(rule.id.split('-')[1])] : [2, 60]),
        secondsPerRound: 14
    },
    {
        rules: (random) => byRule(pick(random, [2, 3, 5, 9, 10])),
        range: () => [10, 200],
        secondsPerRound: 18
    },
    {
        rules: (random) => (random() < 0.4 ? primeRule : bothRule(...pick(random, [[2, 3], [3, 5], [2, 5]] as Array<[number, number]>))),
        range: (rule) => (rule.id === 'primes' ? [2, 100] : [10, 150]),
        secondsPerRound: 20
    }
]

/** First-year levels for the 2. DBH factorization game */
export const introFactorLevels: FactorLevel[] = [
    { primes: [2, 3], min: 8, max: 100, secondsPerNumber: 7 },
    { primes: [2, 3, 5], min: 12, max: 200, secondsPerNumber: 8 },
    { primes: [2, 3, 5, 7], min: 40, max: 500, secondsPerNumber: 10 }
]

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const introDivisibilityGameSlugs: Record<IntroDivisibilityGameId, string> = { race: 'lasterketa', hunt: 'ehiza', factor: 'deskonposaketa', memory: 'memoria', rectangles: 'laukizuzenak', buses: 'autobusak', detective: 'detektibea' }

export function introDivisibilityGameModeForPath(pathname: string): IntroDivisibilityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['caza', 'ehiza'].includes(game)) return 'hunt'
    if (['descomposicion', 'deskonposaketa'].includes(game)) return 'factor'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['laukizuzenak', 'rectangulos'].includes(game)) return 'rectangles'
    if (['autobusak', 'autobuses'].includes(game)) return 'buses'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    return 'hub'
}
