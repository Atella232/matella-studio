import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzioak (4. DBH akademikoak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type FunctionsAkGameId = 'race' | 'memory' | 'domain' | 'slope' | 'detective'

export const FUNCTIONS_AK_GAME_RECORDS_KEY = 'matella-funtzioak-dbh4ak-game-records'

export const functionsAkGames: GameInfo<FunctionsAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Function race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 76101, stage: 'concept', title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' }, description: { eu: 'Irudiak, aurreirudiak eta ibiltartea.', es: 'Imágenes, antiimágenes y recorrido.', en: 'Images, preimages and range.', ar: 'الصور والأصول والمدى.' } },
            { progressId: 76102, stage: 'domain', title: { eu: 'Izate-eremuak', es: 'Dominios', en: 'Domains', ar: 'المجالات' }, description: { eu: 'Zatikiak, erroak eta izendatzaileko erroak.', es: 'Fracciones, raíces y raíces en el denominador.', en: 'Fractions, roots and roots in the denominator.', ar: 'الكسور والجذور والجذور في المقام.' } },
            { progressId: 76103, stage: 'continuity', title: { eu: 'Zatiak', es: 'Trozos', en: 'Pieces', ar: 'الأجزاء' }, description: { eu: 'Zatika definitutako funtzioak, k parametroa, jauziak eta zuloak.', es: 'Funciones a trozos, el parámetro k, saltos y agujeros.', en: 'Piecewise functions, the parameter k, jumps and holes.', ar: 'الدوال على أجزاء والوسيط k والقفزات والثقوب.' } },
            { progressId: 76104, stage: 'features', title: { eu: 'Ebakidurak', es: 'Cortes', en: 'Intercepts', ar: 'التقاطعات' }, description: { eu: 'Ebaki-puntuak, zeinua eta paritatea.', es: 'Puntos de corte, signo y paridad.', en: 'Intercept points, sign and parity.', ar: 'نقاط التقاطع والإشارة والزوجية.' } },
            { progressId: 76105, stage: 'change', title: { eu: 'Aldaketa', es: 'Cambio', en: 'Change', ar: 'التغير' }, description: { eu: 'T.V.M., muturrak, periodoa eta abiadura ertaina.', es: 'T.V.M., extremos, periodo y velocidad media.', en: 'ARC, endpoints, period and average speed.', ar: 'معدل التغير والقيم القصوى والدور والسرعة المتوسطة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Izate-eremuak, irudiak eta T.V.M.', es: 'Dominios, imágenes y T.V.M.', en: 'Domains, images and ARC.', ar: 'المجالات والصور ومعدل التغير' },
        levels: [
            { progressId: 76201, stage: 'domain', title: { eu: 'Funtzioa eta izate-eremua', es: 'Función y dominio', en: 'Function and domain', ar: 'الدالة ومجالها' }, description: { eu: '√(x − 3) ↔ [3, +∞)', es: '√(x − 3) ↔ [3, +∞)', en: '√(x − 3) ↔ [3, +∞)', ar: '√(x − 3) ↔ [3, +∞)' } },
            { progressId: 76202, stage: 'concept', title: { eu: 'Irudiak', es: 'Imágenes', en: 'Images', ar: 'الصور' }, description: { eu: 'x² − 3x, f(−2) ↔ 10', es: 'x² − 3x, f(−2) ↔ 10', en: 'x² − 3x, f(−2) ↔ 10', ar: 'x² − 3x, f(−2) ↔ 10' } },
            { progressId: 76203, stage: 'change', title: { eu: 'T.V.M.', es: 'T.V.M.', en: 'ARC', ar: 'معدل التغير' }, description: { eu: 'x², [1, 3] ↔ 4', es: 'x², [1, 3] ↔ 4', en: 'x², [1, 3] ↔ 4', ar: 'x², [1, 3] ↔ 4' } }
        ]
    },
    {
        id: 'domain',
        title: { eu: 'Margotu eremua', es: 'Pinta el dominio', en: 'Paint the domain', ar: 'لوّن المجال' },
        tagline: { eu: 'Funtzio bat: piztu zuzenean bere eremuko zatiak eta muturrak.', es: 'Una función: enciende en la recta los trozos y extremos de su dominio.', en: 'A function: switch on the pieces and ends of its domain on the line.', ar: 'دالة: أضئ على المستقيم أجزاء مجالها وأطرافه.' },
        skills: { eu: 'Funtzio baten eremua', es: 'El dominio de una función', en: 'The domain of a function', ar: 'مجال الدالة' },
        levels: [
            { progressId: 76301, stage: 'domain', title: { eu: 'Erroak eta zatikiak', es: 'Raíces y fracciones', en: 'Roots and fractions', ar: 'الجذور والكسور' }, description: { eu: '√(x − a), 1/(x − a)', es: '√(x − a), 1/(x − a)', en: '√(x − a), 1/(x − a)', ar: '√(x − a)، 1/(x − a)' } },
            { progressId: 76302, stage: 'domain', title: { eu: 'Bigarren mailakoak', es: 'De segundo grado', en: 'Second degree', ar: 'من الدرجة الثانية' }, description: { eu: '√(x² + bx + c), x/(x² + bx + c)', es: '√(x² + bx + c), x/(x² + bx + c)', en: '√(x² + bx + c), x/(x² + bx + c)', ar: '√(x² + bx + c)، x/(x² + bx + c)' } },
            { progressId: 76303, stage: 'domain', title: { eu: 'Erroa izendatzailean', es: 'Raíz en el denominador', en: 'Root in the denominator', ar: 'الجذر في المقام' }, description: { eu: '1/√(…) eta −x² duten errokizunak.', es: '1/√(…) y radicandos con −x².', en: '1/√(…) and radicands with −x².', ar: '1/√(…) وما تحت الجذر بـ −x².' } }
        ]
    },
    {
        id: 'slope',
        title: { eu: 'Batez besteko malda', es: 'La pendiente media', en: 'The mean slope', ar: 'الميل المتوسط' },
        tagline: { eu: 'Aukeratu batez besteko aldakuntza-tasa jakin bat duen tartea.', es: 'Elige el intervalo con una tasa de variación media dada.', en: 'Choose the interval with a given mean rate of change.', ar: 'اختر الفترة التي لها معدل تغيّر متوسط معطى.' },
        skills: { eu: 'Batez besteko aldakuntza-tasa', es: 'Tasa de variación media', en: 'Mean rate of change', ar: 'معدل التغير المتوسط' },
        levels: [
            { progressId: 76401, stage: 'change', title: { eu: 'x² + c', es: 'x² + c', en: 'x² + c', ar: 'x² + c' }, description: { eu: 'Tasa = a + b.', es: 'Tasa = a + b.', en: 'Rate = a + b.', ar: 'المعدل = a + b.' } },
            { progressId: 76402, stage: 'change', title: { eu: 'x² + bx + c', es: 'x² + bx + c', en: 'x² + bx + c', ar: 'x² + bx + c' }, description: { eu: 'Tasa = a + b + koefizientea.', es: 'Tasa = a + b + coeficiente.', en: 'Rate = a + b + coefficient.', ar: 'المعدل = a + b + المعامل.' } },
            { progressId: 76403, stage: 'change', title: { eu: 'Beherantz zabalduta', es: 'Abiertas hacia abajo', en: 'Opening downwards', ar: 'مفتوحة للأسفل' }, description: { eu: '−x² + bx + c', es: '−x² + bx + c', en: '−x² + bx + c', ar: '−x² + bx + c' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Funtzioen detektibea', es: 'Detective de funciones', en: 'Functions detective', ar: 'مخبر الدوال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Funtzioetako akats tipikoak', es: 'Errores típicos con funciones', en: 'Common mistakes with functions', ar: 'الأخطاء الشائعة في الدوال' },
        levels: [
            { progressId: 76501, stage: 'concept', title: { eu: 'Irudiak eta aurreirudiak', es: 'Imágenes y antiimágenes', en: 'Images and preimages', ar: 'الصور والأصول' }, description: { eu: 'f(k), f(−2), zatikakoak eta f(a + b).', es: 'f(k), f(−2), a trozos y f(a + b).', en: 'f(k), f(−2), piecewise and f(a + b).', ar: 'f(k) وf(−2) والمعرّفة بفروع وf(a + b).' } },
            { progressId: 76502, stage: 'domain', title: { eu: 'Eremuak', es: 'Dominios', en: 'Domains', ar: 'المجالات' }, description: { eu: 'Erroak eta izendatzaileak.', es: 'Raíces y denominadores.', en: 'Roots and denominators.', ar: 'الجذور والمقامات.' } },
            { progressId: 76503, stage: 'change', title: { eu: 'Aldakuntza-tasa', es: 'Tasa de variación', en: 'Rate of change', ar: 'معدل التغير' }, description: { eu: 'Zatiketa, ordena eta irudiak.', es: 'Cociente, orden e imágenes.', en: 'Quotient, order and images.', ar: 'القسمة والترتيب والصور.' } }
        ]
    }
]

export const functionsAkGameProgressIds: number[] = levelProgressIds(functionsAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const functionsAkGameSlugs: Record<FunctionsAkGameId, string> = { race: 'lasterketa', memory: 'memoria', domain: 'eremua', slope: 'malda', detective: 'detektibea' }

export function functionsAkGameModeForPath(pathname: string): FunctionsAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['eremua', 'dominio'].includes(game)) return 'domain'
    if (['malda', 'pendiente'].includes(game)) return 'slope'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
