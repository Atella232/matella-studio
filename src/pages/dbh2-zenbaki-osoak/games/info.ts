import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki osoak games: the list shown in the hub, with levels and the unit
   progress id each level earns with its first star.
   ========================================================================== */

export type IntegerGameId = 'race' | 'pyramid' | 'memory' | 'order'

export const INTEGER_GAME_RECORDS_KEY = 'matella-zenbaki-osoak-dbh2-game-records'

export const integerGames: GameInfo<IntegerGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki osoen lasterketa', es: 'Carrera de enteros', en: 'Integer race', ar: 'سباق الأعداد الصحيحة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, zeinu-akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores de signo le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward; sign mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، وأخطاء الإشارة تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 2101, stage: 'absolute', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', en: 'Absolute value and opposite', ar: 'القيمة المطلقة والمعاكس' }, description: { eu: 'Distantziak eta zeinu-aldaketak.', es: 'Distancias y cambios de signo.', en: 'Distances and sign changes.', ar: 'المسافات وتغيير الإشارة.' } },
            { progressId: 2102, stage: 'ordering', title: { eu: 'Konparatu', es: 'Comparar', en: 'Compare', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'El mayor, el menor y el que está entre dos.', en: 'The greatest, the least and the one in between.', ar: 'الأكبر والأصغر والواقع بين عددين.' } },
            { progressId: 2103, stage: 'addsub', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', en: 'Add and subtract', ar: 'الجمع والطرح' }, description: { eu: 'Parentesiak, modu laburtua eta kateak.', es: 'Paréntesis, forma abreviada y cadenas.', en: 'Brackets, short form and chains.', ar: 'الأقواس والصيغة المختصرة والسلاسل.' } },
            { progressId: 2104, stage: 'muldiv', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', en: 'Multiply and divide', ar: 'الضرب والقسمة' }, description: { eu: 'Zeinuen araua, faktore askorekin ere.', es: 'La regla de los signos, también con varios factores.', en: 'The rule of signs, also with several factors.', ar: 'قاعدة الإشارات، ومع عدة عوامل أيضًا.' } },
            { progressId: 2105, stage: 'muldiv', title: { eu: 'Hierarkia', es: 'Jerarquía', en: 'Order of operations', ar: 'أولوية العمليات' }, description: { eu: 'Eragiketa konbinatuak eta parentesiak.', es: 'Operaciones combinadas y paréntesis.', en: 'Combined operations and brackets.', ar: 'العمليات المركبة والأقواس.' } }
        ]
    },
    {
        id: 'pyramid',
        title: { eu: 'Piramidea', es: 'Pirámide', en: 'Pyramid', ar: 'الهرم' },
        tagline: { eu: 'Adreilu bakoitza azpiko bien batura da. Bete hutsuneak goitik behera edo behetik gora.', es: 'Cada ladrillo es la suma de los dos de abajo. Rellena los huecos hacia arriba o hacia abajo.', en: 'Each brick is the sum of the two below it. Fill in the gaps upwards or downwards.', ar: 'كل طوبة هي مجموع الطوبتين تحتها. املأ الفراغات صعودًا أو نزولًا.' },
        skills: { eu: 'Batuketak, kenketak eta biderketak', es: 'Sumas, restas y productos', en: 'Additions, subtractions and products', ar: 'الجمع والطرح والضرب' },
        levels: [
            { progressId: 2201, stage: 'addsub', title: { eu: 'Batu gora', es: 'Suma hacia arriba', en: 'Add upwards', ar: 'اجمع صعودًا' }, description: { eu: 'Hiru solairu: oinarria ezaguna da.', es: 'Tres pisos: conoces la base.', en: 'Three rows: you know the base.', ar: 'ثلاثة طوابق: القاعدة معروفة.' } },
            { progressId: 2202, stage: 'addsub', title: { eu: 'Kendu behera', es: 'Resta hacia abajo', en: 'Subtract downwards', ar: 'اطرح نزولًا' }, description: { eu: 'Lau solairu: oinarriko adreilu batzuk falta dira.', es: 'Cuatro pisos: faltan ladrillos de la base.', en: 'Four rows: some bricks from the base are missing.', ar: 'أربعة طوابق: تنقص بعض طوبات القاعدة.' } },
            { progressId: 2203, stage: 'muldiv', title: { eu: 'Biderketa-piramidea', es: 'Pirámide de productos', en: 'Product pyramid', ar: 'هرم الضرب' }, description: { eu: 'Adreilu bakoitza azpiko bien biderkadura da.', es: 'Cada ladrillo es el producto de los dos de abajo.', en: 'Each brick is the product of the two below it.', ar: 'كل طوبة هي حاصل ضرب الطوبتين تحتها.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: eragiketa bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: una operación y su resultado.', en: 'Find the cards that are worth the same: an operation and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عملية وناتجها.' },
        skills: { eu: 'Balio absolutua, aurkakoa eta zeinuak', es: 'Valor absoluto, opuesto y signos', en: 'Absolute value, opposite and signs', ar: 'القيمة المطلقة والمعاكس والإشارات' },
        levels: [
            { progressId: 2301, stage: 'absolute', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', en: 'Absolute value and opposite', ar: 'القيمة المطلقة والمعاكس' }, description: { eu: '6 bikote. Kontuz: |−4| ez da Aur(4).', es: '6 parejas. Cuidado: |−4| no es Op(4).', en: '6 pairs. Careful: |−4| is not Op(4).', ar: '6 أزواج. انتبه: ⁦|−4|⁩ ليس معاكس 4.' } },
            { progressId: 2302, stage: 'addsub', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' }, description: { eu: '8 bikote, zeinu tranpekin.', es: '8 parejas con trampas de signo.', en: '8 pairs with sign traps.', ar: '8 أزواج مع فخاخ الإشارة.' } },
            { progressId: 2303, stage: 'muldiv', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: biderketa, zatiketa eta emaitza.', es: '6 tríos: producto, cociente y resultado.', en: '6 trios: product, quotient and result.', ar: '6 ثلاثيات: ضرب وقسمة وناتج.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ilara', es: 'En fila', en: 'In a row', ar: 'في صف' },
        tagline: { eu: 'Sakatu zenbakiak ordenan, txikienetik handienera (edo alderantziz), ahalik eta azkarren.', es: 'Pulsa los números en orden, de menor a mayor (o al revés), lo más rápido que puedas.', en: 'Press the numbers in order, from least to greatest (or the other way round), as fast as you can.', ar: 'اضغط الأعداد بالترتيب، من الأصغر إلى الأكبر (أو العكس)، بأسرع ما يمكن.' },
        skills: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', en: 'Comparison and order', ar: 'المقارنة والترتيب' },
        levels: [
            { progressId: 2401, stage: 'ordering', title: { eu: '−10etik 10era', es: 'De −10 a 10', en: 'From −10 to 10', ar: 'من ⁦−10⁩ إلى 10' }, description: { eu: 'Sei zenbaki, txikienetik handienera.', es: 'Seis números, de menor a mayor.', en: 'Six numbers, from least to greatest.', ar: 'ستة أعداد، من الأصغر إلى الأكبر.' } },
            { progressId: 2402, stage: 'ordering', title: { eu: 'Bi norabideak', es: 'En los dos sentidos', en: 'In both directions', ar: 'في الاتجاهين' }, description: { eu: 'Zortzi zenbaki, −30etik 30era; batzuetan handienetik hasita.', es: 'Ocho números de −30 a 30; a veces empezando por el mayor.', en: 'Eight numbers from −30 to 30; sometimes starting with the largest.', ar: 'ثمانية أعداد من ⁦−30⁩ إلى 30؛ أحيانًا نبدأ بالأكبر.' } },
            { progressId: 2403, stage: 'muldiv', title: { eu: 'Eragiketak ordenan', es: 'Operaciones en orden', en: 'Operations in order', ar: 'عمليات بالترتيب' }, description: { eu: 'Kalkulatu buruz eta ordenatu: |−6|, Aur(3), (−2)·(+3)…', es: 'Calcula de cabeza y ordena: |−6|, Op(3), (−2)·(+3)…', en: 'Work out in your head and order: |−6|, Op(3), (−2)·(+3)…', ar: 'احسب ذهنيًا ورتّب: ⁦|−6|⁩، معاكس 3، ⁦(−2)·(+3)⁩…' } }
        ]
    }
]

export const integerGameProgressIds: number[] = levelProgressIds(integerGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const integerGameSlugs: Record<IntegerGameId, string> = { race: 'lasterketa', pyramid: 'piramidea', memory: 'memoria', order: 'ilara' }

export function integerGameModeForPath(pathname: string): IntegerGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['piramide', 'piramidea'].includes(game)) return 'pyramid'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['fila', 'ilara'].includes(game)) return 'order'
    return 'hub'
}
