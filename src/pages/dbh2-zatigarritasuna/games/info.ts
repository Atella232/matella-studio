import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zatigarritasuna games: the list shown in the hub, with levels and the unit
   progress id each level earns with its first star.
   ========================================================================== */

export type DivisibilityGameId = 'race' | 'hunt' | 'factor' | 'memory'

export const DIVISIBILITY_GAME_RECORDS_KEY = 'matella-zatigarritasuna-dbh2-game-records'

export const divisibilityGames: GameInfo<DivisibilityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zatigarritasunaren lasterketa', es: 'Carrera de divisibilidad', en: 'Divisibility race', ar: 'سباق قابلية القسمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 2101, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' }, description: { eu: 'Nor da nor-en multiploa, eta zenbat zatitzaile.', es: 'Quién es múltiplo de quién y cuántos divisores hay.', en: 'Which number is a multiple of which, and how many divisors there are.', ar: 'من مضاعف لمن، وكم عدد القواسم.' } },
            { progressId: 2102, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', en: 'Divisibility rules', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9, 10 eta 11: zatiketarik gabe.', es: '2, 3, 5, 9, 10 y 11: sin dividir.', en: '2, 3, 5, 9, 10 and 11: without dividing.', ar: '2 و3 و5 و9 و10 و11: دون قسمة.' } },
            { progressId: 2103, stage: 'primes', title: { eu: 'Lehenak eta faktorizazioa', es: 'Primos y factorización', en: 'Primes and factorisation', ar: 'الأعداد الأولية والتحليل' }, description: { eu: 'Lehena ala konposatua, eta deskonposizioak.', es: 'Primo o compuesto, y descomposiciones.', en: 'Prime or composite, and factorisations.', ar: 'أولي أم مؤلف، والتحليل.' } },
            { progressId: 2104, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ وم.م.أ' }, description: { eu: 'Ez nahastu: komunak ala guztiak?', es: 'No los confundas: ¿comunes o todos?', en: 'Don\'t mix them up: common or all?', ar: 'لا تخلط بينهما: المشتركة أم الكل؟' } },
            { progressId: 2105, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Lauzak, poltsak, autobusak eta argiak.', es: 'Baldosas, bolsas, autobuses y luces.', en: 'Tiles, bags, buses and lights.', ar: 'بلاط وأكياس وحافلات وأضواء.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', en: 'Number hunt', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', en: 'Press all the numbers that meet the condition, as fast as possible and without making any mistakes.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Multiploak, irizpideak eta lehenak', es: 'Múltiplos, criterios y primos', en: 'Multiples, divisibility rules and primes', ar: 'المضاعفات والقواعد والأعداد الأولية' },
        levels: [
            { progressId: 2201, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' }, description: { eu: '«6ren multiploak», «36ren zatitzaileak»…', es: '«Múltiplos de 6», «divisores de 36»…', en: '“Multiples of 6”, “divisors of 36”…', ar: '«مضاعفات 6»، «قواسم 36»…' } },
            { progressId: 2202, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', en: 'Divisibility rules', ar: 'القواعد' }, description: { eu: 'Hiru zifrako zenbakiak: 3, 9, 11…', es: 'Números de tres cifras: 3, 9, 11…', en: 'Three-digit numbers: 3, 9, 11…', ar: 'أعداد من ثلاثة أرقام: 3، 9، 11…' } },
            { progressId: 2203, stage: 'primes', title: { eu: 'Lehenak eta bikoitzak', es: 'Primos y dobles criterios', en: 'Primes and combined rules', ar: 'الأولية والقواعد المزدوجة' }, description: { eu: 'Lehenak, eta «2rekin eta 3rekin» bezalakoak.', es: 'Primos, y condiciones como «por 2 y por 3».', en: 'Primes, and conditions such as “divisible by 2 and by 3”.', ar: 'الأعداد الأولية وشروط مثل «على 2 و3».' } }
        ]
    },
    {
        id: 'factor',
        title: { eu: 'Deskonposaketa azkarra', es: 'Descomposición rápida', en: 'Quick factorisation', ar: 'التحليل السريع' },
        tagline: { eu: 'Sakatu zenbakia zehazki zatitzen duten lehenak 1era iritsi arte. Erlojuaren aurka!', es: 'Pulsa los primos que dividen exactamente al número hasta llegar a 1. ¡Contra el reloj!', en: 'Press the primes that divide the number exactly until you reach 1. Against the clock!', ar: 'اضغط الأعداد الأولية التي تقسم العدد قسمة تامة حتى تصل إلى 1. ضد الساعة!' },
        skills: { eu: 'Biderkagai lehenak', es: 'Factores primos', en: 'Prime factors', ar: 'العوامل الأولية' },
        levels: [
            { progressId: 2301, stage: 'primes', title: { eu: '100 arte', es: 'Hasta 100', en: 'Up to 100', ar: 'حتى 100' }, description: { eu: '2, 3 eta 5 lehenak.', es: 'Primos 2, 3 y 5.', en: 'Primes 2, 3 and 5.', ar: 'الأعداد الأولية 2 و3 و5.' } },
            { progressId: 2302, stage: 'primes', title: { eu: '1 000 arte', es: 'Hasta 1 000', en: 'Up to 1,000', ar: 'حتى 1 000' }, description: { eu: '7 ere agertzen da.', es: 'También aparece el 7.', en: '7 also appears.', ar: 'ويظهر 7 أيضًا.' } },
            { progressId: 2303, stage: 'primes', title: { eu: 'Zenbaki handiak', es: 'Números grandes', en: 'Large numbers', ar: 'أعداد كبيرة' }, description: { eu: '11 eta 13 ere bai, 10 000 arte.', es: 'También 11 y 13, hasta 10 000.', en: '11 and 13 too, up to 10,000.', ar: 'و11 و13 أيضًا، حتى 10 000.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: zenbaki bat eta bere deskonposizioa, edo ZKH/MKT bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un número y su descomposición, o un m.c.d./m.c.m. y su resultado.', en: 'Find the cards that are worth the same: a number and its factorisation, or a GCD or LCM and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عدد وتحليله، أو ق.م.أ/م.م.أ وناتجه.' },
        skills: { eu: 'Faktorizazioa, ZKH eta MKT', es: 'Factorización, m.c.d. y m.c.m.', en: 'Factorisation, GCD and LCM', ar: 'التحليل وق.م.أ وم.م.أ' },
        levels: [
            { progressId: 2401, stage: 'primes', title: { eu: 'Zenbakia eta deskonposizioa', es: 'Número y descomposición', en: 'Number and factorisation', ar: 'العدد وتحليله' }, description: { eu: '6 bikote: 72 ↔ 2³ · 3².', es: '6 parejas: 72 ↔ 2³ · 3².', en: '6 pairs: 72 ↔ 2³ · 3²', ar: '6 أزواج: 72 ↔ 2³ · 3².' } },
            { progressId: 2402, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ وم.م.أ' }, description: { eu: '8 bikote. Kontuz: bikote bereko ZKH eta MKT biak daude.', es: '8 parejas. Cuidado: están el m.c.d. y el m.c.m. de la misma pareja.', en: '8 pairs. Careful: both the GCD and the LCM of the same pair are there.', ar: '8 أزواج. انتبه: ق.م.أ وم.م.أ للزوج نفسه كلاهما موجود.' } },
            { progressId: 2403, stage: 'primes', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zenbakia, deskonposizioa eta biderketa bat.', es: '6 tríos: número, descomposición y una multiplicación.', en: '6 trios: number, factorisation and a multiplication.', ar: '6 ثلاثيات: العدد وتحليله وعملية ضرب.' } }
        ]
    }
]

export const divisibilityGameProgressIds: number[] = levelProgressIds(divisibilityGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const divisibilityGameSlugs: Record<DivisibilityGameId, string> = { race: 'lasterketa', hunt: 'ehiza', factor: 'deskonposaketa', memory: 'memoria' }

export function divisibilityGameModeForPath(pathname: string): DivisibilityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['caza', 'ehiza'].includes(game)) return 'hunt'
    if (['descomposicion', 'deskonposaketa'].includes(game)) return 'factor'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
