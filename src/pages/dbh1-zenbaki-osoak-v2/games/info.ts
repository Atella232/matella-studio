import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { OrderLevel } from '../../dbh2-zenbaki-osoak/games/order.ts'
import type { PyramidLevel } from '../../dbh2-zenbaki-osoak/games/pyramid.ts'

/* ==========================================================================
   Zenbaki osoak (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star. The pyramid
   and the order game are the 2. DBH ones with first-year levels.
   ========================================================================== */

export type IntroGameId = 'race' | 'elevator' | 'pyramid' | 'order' | 'zero' | 'detective'

export const INTRO_GAME_RECORDS_KEY = 'matella-zenbaki-osoak-dbh1-game-records'

export const introGames: GameInfo<IntroGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki osoen lasterketa', es: 'Carrera de enteros', en: 'Integer race', ar: 'سباق الأعداد الصحيحة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, zeinu-akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores de signo le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward; sign mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، وأخطاء الإشارة تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 3101, stage: 'meaning', title: { eu: 'Egoerak', es: 'Situaciones', en: 'Situations', ar: 'المواقف' }, description: { eu: 'Sotoak, termometroak, zorrak eta itsasoa.', es: 'Sótanos, termómetros, deudas y el mar.', en: 'Basements, thermometers, debts and the sea.', ar: 'الأقبية وموازين الحرارة والديون والبحر.' } },
            { progressId: 3102, stage: 'line', title: { eu: 'Konparatu', es: 'Comparar', en: 'Compare', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'El mayor, el menor y el que está entre dos.', en: 'The greatest, the least and the one in between.', ar: 'الأكبر والأصغر والواقع بين عددين.' } },
            { progressId: 3103, stage: 'absolute', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', en: 'Absolute value and opposite', ar: 'القيمة المطلقة والمعاكس' }, description: { eu: 'Distantziak eta zeinu-aldaketak.', es: 'Distancias y cambios de signo.', en: 'Distances and sign changes.', ar: 'المسافات وتغيير الإشارة.' } },
            { progressId: 3104, stage: 'addsub', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', en: 'Add and subtract', ar: 'الجمع والطرح' }, description: { eu: 'Zeinu bera ala desberdina? Eta parentesiak.', es: '¿Mismo signo o distinto? Y paréntesis.', en: 'Same sign or different? And brackets.', ar: 'إشارة واحدة أم مختلفة؟ والأقواس.' } },
            { progressId: 3105, stage: 'muldiv', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', en: 'Multiply and divide', ar: 'الضرب والقسمة' }, description: { eu: 'Zeinuen araua.', es: 'La regla de los signos.', en: 'The rule of signs.', ar: 'قاعدة الإشارات.' } }
        ]
    },
    {
        id: 'elevator',
        title: { eu: 'Igogailua', es: 'El ascensor', en: 'The lift', ar: 'المصعد' },
        tagline: { eu: 'Igogailua gora eta behera doa. Sakatu gelditzen den solairua, ahalik eta azkarren.', es: 'El ascensor sube y baja. Pulsa la planta donde se para, lo más rápido que puedas.', en: 'The lift goes up and down. Press the floor where it stops, as fast as you can.', ar: 'المصعد يصعد وينزل. اضغط الطابق الذي يتوقف فيه بأسرع ما يمكن.' },
        skills: { eu: 'Batuketak eta kenketak egoeretan', es: 'Sumas y restas en situaciones', en: 'Adding and subtracting in situations', ar: 'الجمع والطرح في مواقف' },
        levels: [
            { progressId: 3201, stage: 'addsub', title: { eu: 'Mugimendu bat', es: 'Un movimiento', en: 'One move', ar: 'حركة واحدة' }, description: { eu: 'Igo edo jaitsi behin.', es: 'Sube o baja una vez.', en: 'Go up or down once.', ar: 'اصعد أو انزل مرة واحدة.' } },
            { progressId: 3202, stage: 'addsub', title: { eu: 'Bi mugimendu', es: 'Dos movimientos', en: 'Two moves', ar: 'حركتان' }, description: { eu: 'Igo eta jaitsi, edo alderantziz.', es: 'Sube y baja, o al revés.', en: 'Go up and down, or the other way round.', ar: 'اصعد ثم انزل، أو العكس.' } },
            { progressId: 3203, stage: 'addsub', title: { eu: 'Eraikin handia', es: 'Edificio grande', en: 'Big building', ar: 'مبنى كبير' }, description: { eu: 'Hiru mugimendu, 10 solairu eta 6 soto.', es: 'Tres movimientos, 10 plantas y 6 sótanos.', en: 'Three moves, 10 floors and 6 basements.', ar: 'ثلاث حركات، 10 طوابق و6 أقبية.' } }
        ]
    },
    {
        id: 'pyramid',
        title: { eu: 'Piramidea', es: 'Pirámide', en: 'Pyramid', ar: 'الهرم' },
        tagline: { eu: 'Adreilu bakoitza azpiko bien batura da. Bete hutsuneak.', es: 'Cada ladrillo es la suma de los dos de abajo. Rellena los huecos.', en: 'Each brick is the sum of the two below it. Fill in the gaps.', ar: 'كل طوبة هي مجموع الطوبتين تحتها. املأ الفراغات.' },
        skills: { eu: 'Zenbaki osoen batuketak eta kenketak', es: 'Sumas y restas de enteros', en: 'Adding and subtracting integers', ar: 'جمع الأعداد الصحيحة وطرحها' },
        levels: [
            { progressId: 3301, stage: 'addsub', title: { eu: 'Batu gora', es: 'Suma hacia arriba', en: 'Add upwards', ar: 'اجمع صعودًا' }, description: { eu: 'Hiru solairu, zenbaki txikiak.', es: 'Tres pisos, números pequeños.', en: 'Three levels, small numbers.', ar: 'ثلاثة طوابق، أعداد صغيرة.' } },
            { progressId: 3302, stage: 'addsub', title: { eu: 'Hutsuneak behean', es: 'Huecos abajo', en: 'Gaps at the bottom', ar: 'فراغات في الأسفل' }, description: { eu: 'Oinarriko adreilu batzuk falta dira: kendu.', es: 'Faltan ladrillos de la base: resta.', en: 'Bricks are missing from the base: subtract.', ar: 'تنقص طوبات من القاعدة: اطرح.' } },
            { progressId: 3303, stage: 'addsub', title: { eu: 'Lau solairu', es: 'Cuatro pisos', en: 'Four levels', ar: 'أربعة طوابق' }, description: { eu: 'Oinarria ezaguna da; igo goiraino.', es: 'Conoces la base; sube hasta arriba.', en: 'You know the base; go up to the top.', ar: 'القاعدة معروفة؛ اصعد حتى القمة.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ilara', es: 'En fila', en: 'In a row', ar: 'في صف' },
        tagline: { eu: 'Sakatu zenbakiak ordenan, txikienetik handienera (edo alderantziz), ahalik eta azkarren.', es: 'Pulsa los números en orden, de menor a mayor (o al revés), lo más rápido que puedas.', en: 'Press the numbers in order, from least to greatest (or the other way round), as fast as you can.', ar: 'اضغط الأعداد بالترتيب، من الأصغر إلى الأكبر (أو العكس)، بأسرع ما يمكن.' },
        skills: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', en: 'Comparison and order', ar: 'المقارنة والترتيب' },
        levels: [
            { progressId: 3401, stage: 'line', title: { eu: '−10etik 10era', es: 'De −10 a 10', en: 'From −10 to 10', ar: 'من ⁦−10⁩ إلى 10' }, description: { eu: 'Sei zenbaki, txikienetik handienera.', es: 'Seis números, de menor a mayor.', en: 'Six numbers, from least to greatest.', ar: 'ستة أعداد، من الأصغر إلى الأكبر.' } },
            { progressId: 3402, stage: 'line', title: { eu: 'Bi norabideak', es: 'En los dos sentidos', en: 'In both directions', ar: 'في الاتجاهين' }, description: { eu: 'Zazpi zenbaki, −20tik 20ra; batzuetan handienetik hasita.', es: 'Siete números de −20 a 20; a veces empezando por el mayor.', en: 'Seven numbers from −20 to 20; sometimes starting with the greatest.', ar: 'سبعة أعداد من ⁦−20⁩ إلى 20؛ أحيانًا نبدأ بالأكبر.' } },
            { progressId: 3403, stage: 'absolute', title: { eu: 'Kalkulatu eta ordenatu', es: 'Calcula y ordena', en: 'Calculate and order', ar: 'احسب ورتّب' }, description: { eu: '|−6|, Aur(3), (−2) + (+5)…', es: '|−6|, Op(3), (−2) + (+5)…', en: '|−6|, Opp(3), (−2) + (+5)…', ar: '⁦|−6|⁩، معاكس 3، ⁦(−2) + (+5)⁩…' } }
        ]
    },
    {
        id: 'zero',
        title: { eu: 'Zero bikoteak', es: 'Parejas cero', en: 'Zero pairs', ar: 'أزواج الصفر' },
        tagline: { eu: 'Asmatu emaitza; gero, fitxa positiboak eta negatiboak bikoteka ezabatzen dira.', es: 'Adivina el resultado; luego, las fichas positivas y negativas se anulan por parejas.', en: 'Guess the result; then the positive and negative counters cancel in pairs.', ar: 'خمّن النتيجة، ثم تُلغى القطع الموجبة والسالبة أزواجًا.' },
        skills: { eu: 'Zenbaki osoen batuketak eta kenketak', es: 'Sumas y restas de enteros', en: 'Adding and subtracting integers', ar: 'جمع الأعداد الصحيحة وطرحها' },
        levels: [
            { progressId: 3501, stage: 'addsub', title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', en: 'Different signs', ar: 'إشارتان مختلفتان' }, description: { eu: 'Positibo bat gehi negatibo bat.', es: 'Un positivo más un negativo.', en: 'A positive plus a negative.', ar: 'عدد موجب زائد عدد سالب.' } },
            { progressId: 3502, stage: 'addsub', title: { eu: 'Kenketak', es: 'Restas', en: 'Subtractions', ar: 'الطرح' }, description: { eu: 'Negatibo bat kentzea: aurkakoa batu.', es: 'Restar un negativo: sumar el opuesto.', en: 'Subtracting a negative: add the opposite.', ar: 'طرح عدد سالب: أضف المعاكس.' } },
            { progressId: 3503, stage: 'addsub', title: { eu: 'Kateak', es: 'Cadenas', en: 'Chains', ar: 'سلاسل' }, description: { eu: 'Hiru edo lau gai, parentesiekin.', es: 'Tres o cuatro términos con paréntesis.', en: 'Three or four terms with brackets.', ar: 'ثلاثة أو أربعة حدود مع أقواس.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Zenbaki osoen detektibea', es: 'Detective de enteros', en: 'Integers detective', ar: 'مخبر الأعداد الصحيحة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Zenbaki osoekin akats tipikoak', es: 'Errores típicos con enteros', en: 'Common mistakes with integers', ar: 'الأخطاء الشائعة في الأعداد الصحيحة' },
        levels: [
            { progressId: 3601, stage: 'absolute', title: { eu: 'Ordena eta balio absolutua', es: 'Orden y valor absoluto', en: 'Order and absolute value', ar: 'الترتيب والقيمة المطلقة' }, description: { eu: 'Negatiboak, balio absolutua eta aurkakoa.', es: 'Negativos, valor absoluto y opuesto.', en: 'Negatives, absolute value and opposite.', ar: 'الأعداد السالبة والقيمة المطلقة والمعاكس.' } },
            { progressId: 3602, stage: 'addsub', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' }, description: { eu: 'Zeinu bera, zeinu desberdinak eta negatibo bat kentzea.', es: 'Mismo signo, distinto signo y restar un negativo.', en: 'Same sign, different signs and subtracting a negative.', ar: 'الإشارة نفسها وإشارتان مختلفتان وطرح عدد سالب.' } },
            { progressId: 3603, stage: 'muldiv', title: { eu: 'Biderkadurak eta zatidurak', es: 'Productos y cocientes', en: 'Products and quotients', ar: 'الضرب والقسمة' }, description: { eu: 'Zeinuen araua eta hierarkia.', es: 'La regla de los signos y la jerarquía.', en: 'The sign rule and the order of operations.', ar: 'قاعدة الإشارات وترتيب العمليات.' } }
        ]
    }
]

export const introGameProgressIds: number[] = levelProgressIds(introGames)

/** First-year levels for the 2. DBH pyramid: sums only, small numbers */
export const introPyramidLevels: PyramidLevel[] = [
    { rows: 3, op: 'sum', min: 1, max: 5, hideBase: false },
    { rows: 3, op: 'sum', min: 1, max: 9, hideBase: true },
    { rows: 4, op: 'sum', min: 1, max: 6, hideBase: false }
]

/** First-year levels for the 2. DBH order game */
export const introOrderLevels: OrderLevel[] = [
    { count: 6, min: -10, max: 10, bothWays: false, expressions: null, secondsPerRound: 8 },
    { count: 7, min: -20, max: 20, bothWays: true, expressions: null, secondsPerRound: 10 },
    { count: 6, min: -9, max: 9, bothWays: false, expressions: ['value', 'absolute', 'opposite', 'add', 'subtract'], secondsPerRound: 16 }
]

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const introGameSlugs: Record<IntroGameId, string> = { race: 'lasterketa', elevator: 'igogailua', pyramid: 'piramidea', order: 'ilara', zero: 'zero-bikoteak', detective: 'detektibea' }

export function introGameModeForPath(pathname: string): IntroGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ascensor', 'igogailua'].includes(game)) return 'elevator'
    if (['piramide', 'piramidea'].includes(game)) return 'pyramid'
    if (['fila', 'ilara'].includes(game)) return 'order'
    if (['zero-bikoteak', 'parejas-cero'].includes(game)) return 'zero'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    return 'hub'
}
