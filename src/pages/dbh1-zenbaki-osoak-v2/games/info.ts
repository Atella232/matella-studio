import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { OrderLevel } from '../../dbh2-zenbaki-osoak/games/order.ts'
import type { PyramidLevel } from '../../dbh2-zenbaki-osoak/games/pyramid.ts'

/* ==========================================================================
   Zenbaki osoak (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star. The pyramid
   and the order game are the 2. DBH ones with first-year levels.
   ========================================================================== */

export type IntroGameId = 'race' | 'elevator' | 'pyramid' | 'order'

export const INTRO_GAME_RECORDS_KEY = 'matella-zenbaki-osoak-dbh1-game-records'

export const introGames: GameInfo<IntroGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki osoen lasterketa', es: 'Carrera de enteros', ar: 'سباق الأعداد الصحيحة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, zeinu-akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores de signo le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، وأخطاء الإشارة تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 3101, stage: 'meaning', title: { eu: 'Egoerak', es: 'Situaciones', ar: 'المواقف' }, description: { eu: 'Sotoak, termometroak, zorrak eta itsasoa.', es: 'Sótanos, termómetros, deudas y el mar.', ar: 'الأقبية وموازين الحرارة والديون والبحر.' } },
            { progressId: 3102, stage: 'line', title: { eu: 'Konparatu', es: 'Comparar', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'El mayor, el menor y el que está entre dos.', ar: 'الأكبر والأصغر والواقع بين عددين.' } },
            { progressId: 3103, stage: 'absolute', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', ar: 'القيمة المطلقة والمعاكس' }, description: { eu: 'Distantziak eta zeinu-aldaketak.', es: 'Distancias y cambios de signo.', ar: 'المسافات وتغيير الإشارة.' } },
            { progressId: 3104, stage: 'addsub', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', ar: 'الجمع والطرح' }, description: { eu: 'Zeinu bera ala desberdina? Eta parentesiak.', es: '¿Mismo signo o distinto? Y paréntesis.', ar: 'إشارة واحدة أم مختلفة؟ والأقواس.' } },
            { progressId: 3105, stage: 'muldiv', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', ar: 'الضرب والقسمة' }, description: { eu: 'Zeinuen araua.', es: 'La regla de los signos.', ar: 'قاعدة الإشارات.' } }
        ]
    },
    {
        id: 'elevator',
        title: { eu: 'Igogailua', es: 'El ascensor', ar: 'المصعد' },
        tagline: { eu: 'Igogailua gora eta behera doa. Sakatu gelditzen den solairua, ahalik eta azkarren.', es: 'El ascensor sube y baja. Pulsa la planta donde se para, lo más rápido que puedas.', ar: 'المصعد يصعد وينزل. اضغط الطابق الذي يتوقف فيه بأسرع ما يمكن.' },
        skills: { eu: 'Batuketak eta kenketak egoeretan', es: 'Sumas y restas en situaciones', ar: 'الجمع والطرح في مواقف' },
        levels: [
            { progressId: 3201, stage: 'addsub', title: { eu: 'Mugimendu bat', es: 'Un movimiento', ar: 'حركة واحدة' }, description: { eu: 'Igo edo jaitsi behin.', es: 'Sube o baja una vez.', ar: 'اصعد أو انزل مرة واحدة.' } },
            { progressId: 3202, stage: 'addsub', title: { eu: 'Bi mugimendu', es: 'Dos movimientos', ar: 'حركتان' }, description: { eu: 'Igo eta jaitsi, edo alderantziz.', es: 'Sube y baja, o al revés.', ar: 'اصعد ثم انزل، أو العكس.' } },
            { progressId: 3203, stage: 'addsub', title: { eu: 'Eraikin handia', es: 'Edificio grande', ar: 'مبنى كبير' }, description: { eu: 'Hiru mugimendu, 10 solairu eta 6 soto.', es: 'Tres movimientos, 10 plantas y 6 sótanos.', ar: 'ثلاث حركات، 10 طوابق و6 أقبية.' } }
        ]
    },
    {
        id: 'pyramid',
        title: { eu: 'Piramidea', es: 'Pirámide', ar: 'الهرم' },
        tagline: { eu: 'Adreilu bakoitza azpiko bien batura da. Bete hutsuneak.', es: 'Cada ladrillo es la suma de los dos de abajo. Rellena los huecos.', ar: 'كل طوبة هي مجموع الطوبتين تحتها. املأ الفراغات.' },
        skills: { eu: 'Zenbaki osoen batuketak eta kenketak', es: 'Sumas y restas de enteros', ar: 'جمع الأعداد الصحيحة وطرحها' },
        levels: [
            { progressId: 3301, stage: 'addsub', title: { eu: 'Batu gora', es: 'Suma hacia arriba', ar: 'اجمع صعودًا' }, description: { eu: 'Hiru solairu, zenbaki txikiak.', es: 'Tres pisos, números pequeños.', ar: 'ثلاثة طوابق، أعداد صغيرة.' } },
            { progressId: 3302, stage: 'addsub', title: { eu: 'Hutsuneak behean', es: 'Huecos abajo', ar: 'فراغات في الأسفل' }, description: { eu: 'Oinarriko adreilu batzuk falta dira: kendu.', es: 'Faltan ladrillos de la base: resta.', ar: 'تنقص طوبات من القاعدة: اطرح.' } },
            { progressId: 3303, stage: 'addsub', title: { eu: 'Lau solairu', es: 'Cuatro pisos', ar: 'أربعة طوابق' }, description: { eu: 'Oinarria ezaguna da; igo goiraino.', es: 'Conoces la base; sube hasta arriba.', ar: 'القاعدة معروفة؛ اصعد حتى القمة.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ilara', es: 'En fila', ar: 'في صف' },
        tagline: { eu: 'Sakatu zenbakiak ordenan, txikienetik handienera (edo alderantziz), ahalik eta azkarren.', es: 'Pulsa los números en orden, de menor a mayor (o al revés), lo más rápido que puedas.', ar: 'اضغط الأعداد بالترتيب، من الأصغر إلى الأكبر (أو العكس)، بأسرع ما يمكن.' },
        skills: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', ar: 'المقارنة والترتيب' },
        levels: [
            { progressId: 3401, stage: 'line', title: { eu: '−10etik 10era', es: 'De −10 a 10', ar: 'من ⁦−10⁩ إلى 10' }, description: { eu: 'Sei zenbaki, txikienetik handienera.', es: 'Seis números, de menor a mayor.', ar: 'ستة أعداد، من الأصغر إلى الأكبر.' } },
            { progressId: 3402, stage: 'line', title: { eu: 'Bi norabideak', es: 'En los dos sentidos', ar: 'في الاتجاهين' }, description: { eu: 'Zazpi zenbaki, −20tik 20ra; batzuetan handienetik hasita.', es: 'Siete números de −20 a 20; a veces empezando por el mayor.', ar: 'سبعة أعداد من ⁦−20⁩ إلى 20؛ أحيانًا نبدأ بالأكبر.' } },
            { progressId: 3403, stage: 'absolute', title: { eu: 'Kalkulatu eta ordenatu', es: 'Calcula y ordena', ar: 'احسب ورتّب' }, description: { eu: '|−6|, Aur(3), (−2) + (+5)…', es: '|−6|, Op(3), (−2) + (+5)…', ar: '⁦|−6|⁩، معاكس 3، ⁦(−2) + (+5)⁩…' } }
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
export const introGameSlugs: Record<IntroGameId, string> = { race: 'lasterketa', elevator: 'igogailua', pyramid: 'piramidea', order: 'ilara' }

export function introGameModeForPath(pathname: string): IntroGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ascensor', 'igogailua'].includes(game)) return 'elevator'
    if (['piramide', 'piramidea'].includes(game)) return 'pyramid'
    if (['fila', 'ilara'].includes(game)) return 'order'
    return 'hub'
}
