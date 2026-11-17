import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bivarGames } from '../../batx1-zientziak-bidimentsionala/games/info.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Gizarte Zientziak) games:
   the list shown in the hub, with levels and the unit progress id each
   level earns with its first star. Three games of its own (which r?,
   predict with the line and the detective), the race and the memory; and
   two borrowed with their texts and levels but the progress ids of this
   unit: the sign of the covariance of 1.º Ciencias and «guess the
   correlation» of 4. DBH. «Which lines?» of Ciencias is not borrowed: it
   writes the line of X on Y as x = …, and this unit solves it for y.
   ========================================================================== */

export type SocialBivarGameId = 'race' | 'which-r' | 'predict' | 'detective' | 'memory' | 'sign' | 'cloud'

export const SOCIAL_BIVAR_GAME_RECORDS_KEY = 'matella-bidimentsionala-batx1g-game-records'

const signSource = bivarGames.find((game) => game.id === 'sign')!
const cloudSource = bivarGames.find((game) => game.id === 'cloud')!

export const socialBivarGames: GameInfo<SocialBivarGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Bidimentsionalaren lasterketa', es: 'Carrera bidimensional', en: 'Two-variable race', ar: 'سباق ثنائي المتغير' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 138401, stage: 'cloud', title: { eu: 'Hodeia', es: 'La nube', en: 'The cloud', ar: 'السحابة' }, description: { eu: 'Grabitate-zentroa eta biderkadurak.', es: 'Centro de gravedad y productos.', en: 'Centre of gravity and products.', ar: 'مركز الثقل والجداءات.' } },
            { progressId: 138402, stage: 'parameters', title: { eu: 'Kobariantza eta r', es: 'Covarianza y r', en: 'Covariance and r', ar: 'التغاير وr' }, description: { eu: 'Baturak, r eta unitateak.', es: 'Sumas, r y unidades.', en: 'Sums, r and units.', ar: 'المجاميع وr والوحدات.' } },
            { progressId: 138403, stage: 'regression', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda eta estimazioak.', es: 'Pendiente y estimaciones.', en: 'Slope and estimates.', ar: 'الميل والتقديرات.' } },
            { progressId: 138404, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Bi zuzenak eta grabitate-zentroa.', es: 'Las dos rectas y el centro de gravedad.', en: 'The two lines and the centre of gravity.', ar: 'المستقيمان ومركز الثقل.' } },
            { progressId: 138405, stage: 'tables', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'Baldintzazkoak, independentzia eta marjinalak.', es: 'Condicionadas, independencia y marginales.', en: 'Conditionals, independence and marginals.', ar: 'الشرطية والاستقلال والهامشية.' } }
        ]
    },
    {
        id: 'which-r',
        title: { eu: 'Zein r dagokio?', es: '¿Qué r le toca?', en: 'Which r fits?', ar: 'أي r يناسبها؟' },
        tagline: { eu: 'Puntu-hodei bat eta hiru koefiziente: aukeratu bereari dagokiona.', es: 'Una nube de puntos y tres coeficientes: elige el que le corresponde.', en: 'A scatter plot and three coefficients: choose the one that belongs to it.', ar: 'سحابة نقاط وثلاثة معاملات: اختر الذي يناسبها.' },
        skills: { eu: 'r begiz irakurtzea', es: 'Leer r a ojo', en: 'Reading r by eye', ar: 'قراءة r بالنظر' },
        levels: [
            { progressId: 138501, stage: 'cloud', title: { eu: 'Sendoa ala ahula', es: 'Fuerte o débil', en: 'Strong or weak', ar: 'قوي أم ضعيف' }, description: { eu: 'Eta zeinua.', es: 'Y el signo.', en: 'And the sign.', ar: 'والإشارة.' } },
            { progressId: 138502, stage: 'cloud', title: { eu: 'Hiru indar', es: 'Tres fuerzas', en: 'Three strengths', ar: 'ثلاث قوى' }, description: { eu: 'Zeinu berarekin.', es: 'Con el mismo signo.', en: 'With the same sign.', ar: 'بالإشارة نفسها.' } },
            { progressId: 138503, stage: 'cloud', title: { eu: 'Gertu', es: 'Muy cerca', en: 'Close call', ar: 'متقاربة' }, description: { eu: 'Zeinua tranpa da.', es: 'El signo es una trampa.', en: 'The sign is a trap.', ar: 'الإشارة فخ.' } }
        ]
    },
    {
        id: 'predict',
        title: { eu: 'Aurreikusi zuzenarekin', es: 'Predice con la recta', en: 'Predict with the line', ar: 'توقّع بالمستقيم' },
        tagline: { eu: 'Erregresio-zuzen batekin, estimatu y eta erabaki fidagarria den.', es: 'Con una recta de regresión, estima y y decide si es fiable.', en: 'With a regression line, estimate y and decide whether it is reliable.', ar: 'بمستقيم انحدار قدّر y وقرّر هل التقدير موثوق.' },
        skills: { eu: 'Estimazioak eta fidagarritasuna', es: 'Estimaciones y fiabilidad', en: 'Estimates and reliability', ar: 'التقديرات وموثوقيتها' },
        levels: [
            { progressId: 138601, stage: 'regression', title: { eu: 'Barruan ala urrun', es: 'Dentro o lejos', en: 'Inside or far', ar: 'داخل أم بعيد' }, description: { eu: 'r handiarekin.', es: 'Con r grande.', en: 'With a large r.', ar: 'مع r كبير.' } },
            { progressId: 138602, stage: 'regression', title: { eu: 'r txikia ere bai', es: 'También r pequeño', en: 'Small r too', ar: 'r صغير أيضًا' }, description: { eu: 'Bi gauza begiratu.', es: 'Mira dos cosas.', en: 'Look at two things.', ar: 'انظر إلى أمرين.' } },
            { progressId: 138603, stage: 'problems', title: { eu: 'Zuzena zuk', es: 'La recta, tú', en: 'You make the line', ar: 'المستقيم عليك' }, description: { eu: 'x̄, ȳ, σx² eta σxy datuekin.', es: 'Con x̄, ȳ, σx² y σxy.', en: 'With x̄, ȳ, σx² and σxy.', ar: 'بمعرفة x̄ وȳ وσx² وσxy.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 138701, stage: 'parameters', title: { eu: 'Kobariantza eta r', es: 'Covarianza y r', en: 'Covariance and r', ar: 'التغاير وr' }, description: { eu: 'Batez bestekoak, bariantzak eta unitateak.', es: 'Medias, varianzas y unidades.', en: 'Means, variances and units.', ar: 'المتوسطات والتباينات والوحدات.' } },
            { progressId: 138702, stage: 'regression', title: { eu: 'Erregresio-zuzenak', es: 'Rectas de regresión', en: 'Regression lines', ar: 'مستقيمات الانحدار' }, description: { eu: 'Maldak, estimazioak eta r².', es: 'Pendientes, estimaciones y r².', en: 'Slopes, estimates and r².', ar: 'الميول والتقديرات وr².' } },
            { progressId: 138703, stage: 'tables', title: { eu: 'Taulak eta r', es: 'Tablas y r', en: 'Tables and r', ar: 'الجداول وr' }, description: { eu: 'Baldintzazkoak, marjinalak eta zeinua.', es: 'Condicionadas, marginales y el signo.', en: 'Conditionals, marginals and the sign.', ar: 'الشرطية والهامشية والإشارة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: σxy eta σx·σy haien r-rekin, zuzen bat eta x haien ŷ-rekin, edo bi malda haien r²-rekin.', es: 'Encuentra las parejas: σxy y σx·σy con su r, una recta y una x con su ŷ, o dos pendientes con su r².', en: 'Find the pairs: σxy and σx·σy with their r, a line and an x with their ŷ, or two slopes with their r².', ar: 'جد الأزواج: σxy وσx·σy مع r، أو مستقيم وx مع ŷ، أو ميلان مع r².' },
        skills: { eu: 'r, estimazioak eta bi zuzenak', es: 'r, estimaciones y las dos rectas', en: 'r, estimates and both lines', ar: 'r والتقديرات والمستقيمان' },
        levels: [
            { progressId: 138801, stage: 'parameters', title: { eu: 'r kalkulatzea', es: 'Calcular r', en: 'Working out r', ar: 'حساب r' }, description: { eu: '6 / (2 · 5) ↔ r = 0,6', es: '6 / (2 · 5) ↔ r = 0,6', en: '6 / (2 · 5) ↔ r = 0.6', ar: '6 / (2 · 5) ↔ r = 0.6' } },
            { progressId: 138802, stage: 'regression', title: { eu: 'Estimazioak', es: 'Estimaciones', en: 'Estimates', ar: 'التقديرات' }, description: { eu: 'y = 2x + 1, x = 3 ↔ ŷ = 7', es: 'y = 2x + 1, x = 3 ↔ ŷ = 7', en: 'y = 2x + 1, x = 3 ↔ ŷ = 7', ar: 'y = 2x + 1, x = 3 ↔ ŷ = 7' } },
            { progressId: 138803, stage: 'problems', title: { eu: 'Bi zuzenak', es: 'Las dos rectas', en: 'Both lines', ar: 'المستقيمان' }, description: { eu: 'm = 0,5, m′ = 2 ↔ r² = 0,25', es: 'm = 0,5, m′ = 2 ↔ r² = 0,25', en: 'm = 0.5, m′ = 2 ↔ r² = 0.25', ar: 'm = 0.5, m′ = 2 ↔ r² = 0.25' } }
        ]
    },
    // The sign of the covariance of 1.º Ciencias, with this unit's progress ids
    { ...signSource, id: 'sign', levels: signSource.levels.map((level, index) => ({ ...level, progressId: 138811 + index })) },
    // «Guess the correlation» of 4. DBH, with this unit's progress ids
    { ...cloudSource, id: 'cloud', levels: cloudSource.levels.map((level, index) => ({ ...level, stage: 'cloud', progressId: 138821 + index })) }
]

export const socialBivarGameProgressIds: number[] = levelProgressIds(socialBivarGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const socialBivarGameSlugs: Record<SocialBivarGameId, string> = { race: 'lasterketa', 'which-r': 'zein-r', predict: 'aurreikusi', detective: 'detektibea', memory: 'memoria', sign: 'zeinua', cloud: 'hodeia' }

export function socialBivarGameModeForPath(pathname: string): SocialBivarGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zein-r', 'que-r'].includes(game)) return 'which-r'
    if (['aurreikusi', 'predice'].includes(game)) return 'predict'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zeinua', 'signo'].includes(game)) return 'sign'
    if (['hodeia', 'nube'].includes(game)) return 'cloud'
    return 'hub'
}
