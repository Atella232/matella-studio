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
        title: { eu: 'Zatigarritasunaren lasterketa', es: 'Carrera de divisibilidad', ar: 'سباق قابلية القسمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 2101, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' }, description: { eu: 'Nor da nor-en multiploa, eta zenbat zatitzaile.', es: 'Quién es múltiplo de quién y cuántos divisores hay.', ar: 'من مضاعف لمن، وكم عدد القواسم.' } },
            { progressId: 2102, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', ar: 'القواعد' }, description: { eu: '2, 3, 5, 9, 10 eta 11: zatiketarik gabe.', es: '2, 3, 5, 9, 10 y 11: sin dividir.', ar: '2 و3 و5 و9 و10 و11: دون قسمة.' } },
            { progressId: 2103, stage: 'primes', title: { eu: 'Lehenak eta faktorizazioa', es: 'Primos y factorización', ar: 'الأعداد الأولية والتحليل' }, description: { eu: 'Lehena ala konposatua, eta deskonposizioak.', es: 'Primo o compuesto, y descomposiciones.', ar: 'أولي أم مؤلف، والتحليل.' } },
            { progressId: 2104, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ وم.م.أ' }, description: { eu: 'Ez nahastu: komunak ala guztiak?', es: 'No los confundas: ¿comunes o todos?', ar: 'لا تخلط بينهما: المشتركة أم الكل؟' } },
            { progressId: 2105, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', ar: 'المسائل' }, description: { eu: 'Lauzak, poltsak, autobusak eta argiak.', es: 'Baldosas, bolsas, autobuses y luces.', ar: 'بلاط وأكياس وحافلات وأضواء.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Multiploak, irizpideak eta lehenak', es: 'Múltiplos, criterios y primos', ar: 'المضاعفات والقواعد والأعداد الأولية' },
        levels: [
            { progressId: 2201, stage: 'multiples', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' }, description: { eu: '«6ren multiploak», «36ren zatitzaileak»…', es: '«Múltiplos de 6», «divisores de 36»…', ar: '«مضاعفات 6»، «قواسم 36»…' } },
            { progressId: 2202, stage: 'criteria', title: { eu: 'Irizpideak', es: 'Criterios', ar: 'القواعد' }, description: { eu: 'Hiru zifrako zenbakiak: 3, 9, 11…', es: 'Números de tres cifras: 3, 9, 11…', ar: 'أعداد من ثلاثة أرقام: 3، 9، 11…' } },
            { progressId: 2203, stage: 'primes', title: { eu: 'Lehenak eta bikoitzak', es: 'Primos y dobles criterios', ar: 'الأولية والقواعد المزدوجة' }, description: { eu: 'Lehenak, eta «2rekin eta 3rekin» bezalakoak.', es: 'Primos, y condiciones como «por 2 y por 3».', ar: 'الأعداد الأولية وشروط مثل «على 2 و3».' } }
        ]
    },
    {
        id: 'factor',
        title: { eu: 'Deskonposaketa azkarra', es: 'Descomposición rápida', ar: 'التحليل السريع' },
        tagline: { eu: 'Sakatu zenbakia zehazki zatitzen duten lehenak 1era iritsi arte. Erlojuaren aurka!', es: 'Pulsa los primos que dividen exactamente al número hasta llegar a 1. ¡Contra el reloj!', ar: 'اضغط الأعداد الأولية التي تقسم العدد قسمة تامة حتى تصل إلى 1. ضد الساعة!' },
        skills: { eu: 'Biderkagai lehenak', es: 'Factores primos', ar: 'العوامل الأولية' },
        levels: [
            { progressId: 2301, stage: 'primes', title: { eu: '100 arte', es: 'Hasta 100', ar: 'حتى 100' }, description: { eu: '2, 3 eta 5 lehenak.', es: 'Primos 2, 3 y 5.', ar: 'الأعداد الأولية 2 و3 و5.' } },
            { progressId: 2302, stage: 'primes', title: { eu: '1 000 arte', es: 'Hasta 1 000', ar: 'حتى 1 000' }, description: { eu: '7 ere agertzen da.', es: 'También aparece el 7.', ar: 'ويظهر 7 أيضًا.' } },
            { progressId: 2303, stage: 'primes', title: { eu: 'Zenbaki handiak', es: 'Números grandes', ar: 'أعداد كبيرة' }, description: { eu: '11 eta 13 ere bai, 10 000 arte.', es: 'También 11 y 13, hasta 10 000.', ar: 'و11 و13 أيضًا، حتى 10 000.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: zenbaki bat eta bere deskonposizioa, edo ZKH/MKT bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un número y su descomposición, o un m.c.d./m.c.m. y su resultado.', ar: 'جد البطاقات ذات القيمة نفسها: عدد وتحليله، أو ق.م.أ/م.م.أ وناتجه.' },
        skills: { eu: 'Faktorizazioa, ZKH eta MKT', es: 'Factorización, m.c.d. y m.c.m.', ar: 'التحليل وق.م.أ وم.م.أ' },
        levels: [
            { progressId: 2401, stage: 'primes', title: { eu: 'Zenbakia eta deskonposizioa', es: 'Número y descomposición', ar: 'العدد وتحليله' }, description: { eu: '6 bikote: 72 ↔ 2³ · 3².', es: '6 parejas: 72 ↔ 2³ · 3².', ar: '6 أزواج: 72 ↔ 2³ · 3².' } },
            { progressId: 2402, stage: 'gcd-lcm', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ وم.م.أ' }, description: { eu: '8 bikote. Kontuz: bikote bereko ZKH eta MKT biak daude.', es: '8 parejas. Cuidado: están el m.c.d. y el m.c.m. de la misma pareja.', ar: '8 أزواج. انتبه: ق.م.أ وم.م.أ للزوج نفسه كلاهما موجود.' } },
            { progressId: 2403, stage: 'primes', title: { eu: 'Hirukoteak', es: 'Tríos', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zenbakia, deskonposizioa eta biderketa bat.', es: '6 tríos: número, descomposición y una multiplicación.', ar: '6 ثلاثيات: العدد وتحليله وعملية ضرب.' } }
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
