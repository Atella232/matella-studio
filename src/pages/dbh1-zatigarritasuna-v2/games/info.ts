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

export type IntroDivisibilityGameId = 'race' | 'hunt' | 'factor' | 'memory'

export const INTRO_DIVISIBILITY_GAME_RECORDS_KEY = 'matella-zatigarritasuna-dbh1-game-records'

export const introDivisibilityGames: GameInfo<IntroDivisibilityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zatigarritasunaren lasterketa', es: 'Carrera de divisibilidad', ar: 'سباق قابلية القسمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 4101, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' }, description: { eu: 'Multiploak, zatitzaileak eta soberan geratzen dena.', es: 'Múltiplos, divisores y lo que sobra.', ar: 'المضاعفات والقواسم وما يبقى.' } },
            { progressId: 4102, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9 eta 10: zatiketarik gabe.', es: '2, 3, 5, 9 y 10: sin dividir.', ar: '2 و3 و5 و9 و10: دون قسمة.' } },
            { progressId: 4103, stage: 'primes', title: { eu: 'Lehenak eta deskonposizioa', es: 'Primos y descomposición', ar: 'الأعداد الأولية والتحليل' }, description: { eu: 'Lehena ala konposatua, eta deskonposizioak.', es: 'Primo o compuesto, y descomposiciones.', ar: 'أولي أم مؤلف، والتحليل.' } },
            { progressId: 4104, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ وم.م.أ' }, description: { eu: 'Ez nahastu: handiena ala txikiena?', es: 'No los confundas: ¿el mayor o el menor?', ar: 'لا تخلط بينهما: الأكبر أم الأصغر؟' } },
            { progressId: 4105, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', ar: 'المسائل' }, description: { eu: 'Lauzak, poltsak, autobusak eta argiak.', es: 'Baldosas, bolsas, autobuses y luces.', ar: 'بلاط وأكياس وحافلات وأضواء.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Multiploak, irizpideak eta lehenak', es: 'Múltiplos, criterios y primos', ar: 'المضاعفات والقواعد والأعداد الأولية' },
        levels: [
            { progressId: 4201, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' }, description: { eu: '«4ren multiploak», «24ren zatitzaileak»…', es: '«Múltiplos de 4», «divisores de 24»…', ar: '«مضاعفات 4»، «قواسم 24»…' } },
            { progressId: 4202, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9 eta 10, 200 arte.', es: '2, 3, 5, 9 y 10, hasta 200.', ar: '2 و3 و5 و9 و10، حتى 200.' } },
            { progressId: 4203, stage: 'primes', title: { eu: 'Lehenak eta bikoitzak', es: 'Primos y dobles criterios', ar: 'الأولية والقواعد المزدوجة' }, description: { eu: 'Lehenak 100 arte, eta «2rekin eta 3rekin» bezalakoak.', es: 'Primos hasta 100, y condiciones como «por 2 y por 3».', ar: 'الأعداد الأولية حتى 100 وشروط مثل «على 2 و3».' } }
        ]
    },
    {
        id: 'factor',
        title: { eu: 'Deskonposaketa azkarra', es: 'Descomposición rápida', ar: 'التحليل السريع' },
        tagline: { eu: 'Sakatu zenbakia zehazki zatitzen duten lehenak 1era iritsi arte. Erlojuaren aurka!', es: 'Pulsa los primos que dividen exactamente al número hasta llegar a 1. ¡Contra el reloj!', ar: 'اضغط الأعداد الأولية التي تقسم العدد قسمة تامة حتى تصل إلى 1. ضد الساعة!' },
        skills: { eu: 'Biderkagai lehenak', es: 'Factores primos', ar: 'العوامل الأولية' },
        levels: [
            { progressId: 4301, stage: 'primes', title: { eu: '2 eta 3', es: 'El 2 y el 3', ar: '2 و3' }, description: { eu: '100 arteko zenbakiak.', es: 'Números hasta 100.', ar: 'أعداد حتى 100.' } },
            { progressId: 4302, stage: 'primes', title: { eu: '5 ere bai', es: 'También el 5', ar: 'و5 أيضًا' }, description: { eu: '200 arteko zenbakiak.', es: 'Números hasta 200.', ar: 'أعداد حتى 200.' } },
            { progressId: 4303, stage: 'primes', title: { eu: '7 ere bai', es: 'También el 7', ar: 'و7 أيضًا' }, description: { eu: '500 arteko zenbakiak.', es: 'Números hasta 500.', ar: 'أعداد حتى 500.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: zenbaki bat eta bere deskonposizioa, edo ZKH/MKT bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un número y su descomposición, o un m.c.d./m.c.m. y su resultado.', ar: 'جد البطاقات ذات القيمة نفسها: عدد وتحليله، أو ق.م.أ/م.م.أ وناتجه.' },
        skills: { eu: 'Deskonposizioa, ZKH eta MKT', es: 'Descomposición, m.c.d. y m.c.m.', ar: 'التحليل وق.م.أ وم.م.أ' },
        levels: [
            { progressId: 4401, stage: 'primes', title: { eu: 'Zenbakia eta deskonposizioa', es: 'Número y descomposición', ar: 'العدد وتحليله' }, description: { eu: '6 bikote: 36 ↔ 2² · 3².', es: '6 parejas: 36 ↔ 2² · 3².', ar: '6 أزواج: 36 ↔ 2² · 3².' } },
            { progressId: 4402, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ وم.م.أ' }, description: { eu: '8 bikote. Kontuz: bikote bereko ZKH eta MKT biak daude.', es: '8 parejas. Cuidado: están el m.c.d. y el m.c.m. de la misma pareja.', ar: '8 أزواج. انتبه: ق.م.أ وم.م.أ للزوج نفسه كلاهما موجود.' } },
            { progressId: 4403, stage: 'primes', title: { eu: 'Hirukoteak', es: 'Tríos', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zenbakia, deskonposizioa eta biderketa bat.', es: '6 tríos: número, descomposición y una multiplicación.', ar: '6 ثلاثيات: العدد وتحليله وعملية ضرب.' } }
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
export const introDivisibilityGameSlugs: Record<IntroDivisibilityGameId, string> = { race: 'lasterketa', hunt: 'ehiza', factor: 'deskonposaketa', memory: 'memoria' }

export function introDivisibilityGameModeForPath(pathname: string): IntroDivisibilityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['caza', 'ehiza'].includes(game)) return 'hunt'
    if (['descomposicion', 'deskonposaketa'].includes(game)) return 'factor'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
