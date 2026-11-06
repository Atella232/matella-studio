import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { statisticsAkGames } from '../../dbh4-akademikoak-estatistika/games/info.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Three games of its own (who stands out more, which
   histogram and the detective), the race and the memory, and the box plot
   of 4. DBH académicas kept for the review, with its texts and levels but
   the progress ids of this unit.
   ========================================================================== */

export type BachStatsGameId = 'race' | 'standout' | 'histogram' | 'detective' | 'memory' | 'box'

export const BACH_STATS_GAME_RECORDS_KEY = 'matella-estatistika-batx1z-game-records'

const boxSource = statisticsAkGames.find((game) => game.id === 'box')!

export const bachStatsGames: GameInfo<BachStatsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera de estadística', en: 'Statistics race', ar: 'سباق الإحصاء' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 114401, stage: 'data', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'h, F eta sektoreak.', es: 'h, F y sectores.', en: 'h, F and sectors.', ar: 'h وF والقطاعات.' } },
            { progressId: 114402, stage: 'centre', title: { eu: 'Zentralizazioa', es: 'Centralización', en: 'Centre', ar: 'النزعة المركزية' }, description: { eu: 'Batez bestekoa, falta den datua eta tarteak.', es: 'Media, el dato que falta e intervalos.', en: 'Mean, the missing datum and intervals.', ar: 'المتوسط والبيان الناقص والفئات.' } },
            { progressId: 114403, stage: 'position', title: { eu: 'Posizioa', es: 'Posición', en: 'Position', ar: 'الموضع' }, description: { eu: 'Pertzentilak, mugak eta mediana.', es: 'Percentiles, límites y mediana.', en: 'Percentiles, limits and median.', ar: 'المئينات والحدود والوسيط.' } },
            { progressId: 114404, stage: 'spread', title: { eu: 'Sakabanatzea', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'σ, bariantza eta CV.', es: 'σ, varianza y CV.', en: 'σ, variance and CV.', ar: 'σ والتباين وCV.' } },
            { progressId: 114405, stage: 'interpretation', title: { eu: 'Interpretatu', es: 'Interpretar', en: 'Interpret', ar: 'التفسير' }, description: { eu: 'z, x̄ + 3σ eta a·x + b.', es: 'z, x̄ + 3σ y a·x + b.', en: 'z, x̄ + 3σ and a·x + b.', ar: 'z وx̄ + 3σ وa·x + b.' } }
        ]
    },
    {
        id: 'standout',
        title: { eu: 'Nork nabarmentzen du gehiago?', es: '¿Quién destaca más?', en: 'Who stands out more?', ar: 'من يتميّز أكثر؟' },
        tagline: { eu: 'Emaitza bakoitza bere taldean: sakatu gehien nabarmentzen dena, puntuazio tipikoaren arabera.', es: 'Cada resultado en su grupo: toca el que más destaca según su puntuación típica.', en: 'Each result in its own group: tap the one that stands out most by its standard score.', ar: 'كل نتيجة في مجموعتها: المس الأكثر تميّزًا بحسب درجتها المعيارية.' },
        skills: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones típicas', en: 'Standard scores', ar: 'الدرجات المعيارية' },
        levels: [
            { progressId: 114501, stage: 'interpretation', title: { eu: 'Bi nota', es: 'Dos notas', en: 'Two marks', ar: 'علامتان' }, description: { eu: 'Zenbat eta handiagoa, hobe.', es: 'Cuanto más alta, mejor.', en: 'The higher, the better.', ar: 'كلما ارتفعت كان أفضل.' } },
            { progressId: 114502, stage: 'interpretation', title: { eu: 'Denborak', es: 'Tiempos', en: 'Times', ar: 'الأزمنة' }, description: { eu: 'Zenbat eta gutxiago, hobe.', es: 'Cuanto menos, mejor.', en: 'The lower, the better.', ar: 'كلما قلّ كان أفضل.' } },
            { progressId: 114503, stage: 'interpretation', title: { eu: 'Hiru nota', es: 'Tres notas', en: 'Three marks', ar: 'ثلاث علامات' }, description: { eu: 'Hiru talde, hiru batez besteko.', es: 'Tres grupos, tres medias.', en: 'Three groups, three means.', ar: 'ثلاث مجموعات وثلاثة متوسطات.' } }
        ]
    },
    {
        id: 'histogram',
        title: { eu: 'Zein histograma?', es: '¿Qué histograma?', en: 'Which histogram?', ar: 'أي مدرّج؟' },
        tagline: { eu: 'Hiru diagrama, hamarna daturekin: aurkitu sakabanatuena, CV handiena edo neurri jakin batzuk dituena.', es: 'Tres diagramas de diez datos: encuentra el más disperso, el de mayor CV o el que tiene unas medidas dadas.', en: 'Three charts of ten data: find the most spread out, the one with the largest CV or the one with given measures.', ar: 'ثلاثة مخططات بعشرة بيانات: جد الأكثر تشتتًا أو صاحب أكبر CV أو صاحب مقاييس معطاة.' },
        skills: { eu: 'Sakabanatzea begiz', es: 'La dispersión a ojo', en: 'Spread by eye', ar: 'التشتت بالعين' },
        levels: [
            { progressId: 114601, stage: 'spread', title: { eu: 'σ handiena', es: 'La mayor σ', en: 'The largest σ', ar: 'أكبر σ' }, description: { eu: 'Batez besteko bera.', es: 'La misma media.', en: 'The same mean.', ar: 'المتوسط نفسه.' } },
            { progressId: 114602, stage: 'spread', title: { eu: 'CV handiena', es: 'El mayor CV', en: 'The largest CV', ar: 'أكبر CV' }, description: { eu: 'Batez bestekoak mugitzen dira.', es: 'Las medias se mueven.', en: 'The means move.', ar: 'المتوسطات تتحرك.' } },
            { progressId: 114603, stage: 'spread', title: { eu: 'x̄ eta σ', es: 'x̄ y σ', en: 'x̄ and σ', ar: 'x̄ وσ' }, description: { eu: 'Bi neurriak bat etorri behar dira.', es: 'Las dos medidas tienen que coincidir.', en: 'Both measures must match.', ar: 'يجب أن يتطابق المقياسان.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 114701, stage: 'centre', title: { eu: 'Taulak eta zentroa', es: 'Tablas y centro', en: 'Tables and centre', ar: 'الجداول والنزعة المركزية' }, description: { eu: 'Klase-markak, mediana eta falta den datua.', es: 'Marcas de clase, mediana y el dato que falta.', en: 'Class marks, median and the missing datum.', ar: 'مراكز الفئات والوسيط والبيان الناقص.' } },
            { progressId: 114702, stage: 'spread', title: { eu: 'Posizioa eta sakabanatzea', es: 'Posición y dispersión', en: 'Position and spread', ar: 'الموضع والتشتت' }, description: { eu: 'Pertzentilak, mugak, bariantza eta CV.', es: 'Percentiles, límites, varianza y CV.', en: 'Percentiles, limits, variance and CV.', ar: 'المئينات والحدود والتباين وCV.' } },
            { progressId: 114703, stage: 'interpretation', title: { eu: 'Interpretatu', es: 'Interpretar', en: 'Interpret', ar: 'التفسير' }, description: { eu: 'z, x̄ ± 3σ eta datuak aldatzea.', es: 'z, x̄ ± 3σ y transformar los datos.', en: 'z, x̄ ± 3σ and changing the data.', ar: 'z وx̄ ± 3σ وتحويل البيانات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: datuak eta haien batez bestekoa, datu bat eta haren z, edo x̄ eta σ eta haien CV.', es: 'Encuentra las parejas: unos datos y su media, un dato y su z, o x̄ y σ y su CV.', en: 'Find the pairs: some data and their mean, a datum and its z, or x̄ and σ and their CV.', ar: 'جد الأزواج: بيانات ومتوسطها، أو بيان ودرجته z، أو x̄ وσ ومعامل اختلافهما.' },
        skills: { eu: 'Batez bestekoak, z eta CV', es: 'Medias, z y CV', en: 'Means, z and CV', ar: 'المتوسطات وz وCV' },
        levels: [
            { progressId: 114801, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', en: 'Means', ar: 'المتوسطات' }, description: { eu: '2, 4, 9 ↔ x̄ = 5', es: '2, 4, 9 ↔ x̄ = 5', en: '2, 4, 9 ↔ x̄ = 5', ar: '2, 4, 9 ↔ x̄ = 5' } },
            { progressId: 114802, stage: 'interpretation', title: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones típicas', en: 'Standard scores', ar: 'الدرجات المعيارية' }, description: { eu: '(8 − 6) / 1 ↔ z = 2', es: '(8 − 6) / 1 ↔ z = 2', en: '(8 − 6) / 1 ↔ z = 2', ar: '(8 − 6) / 1 ↔ z = 2' } },
            { progressId: 114803, stage: 'spread', title: { eu: 'Aldakuntza', es: 'Variación', en: 'Variation', ar: 'الاختلاف' }, description: { eu: 'x̄ = 20, σ = 2 ↔ CV', es: 'x̄ = 20, σ = 2 ↔ CV', en: 'x̄ = 20, σ = 2 ↔ CV', ar: 'x̄ = 20, σ = 2 ↔ CV' } }
        ]
    },
    // The 4. DBH box plot, with this unit's progress ids
    { ...boxSource, id: 'box', levels: boxSource.levels.map((level, index) => ({ ...level, stage: 'position', progressId: 114811 + index })) }
]

export const bachStatsGameProgressIds: number[] = levelProgressIds(bachStatsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachStatsGameSlugs: Record<BachStatsGameId, string> = { race: 'lasterketa', standout: 'nabarmendu', histogram: 'histograma', detective: 'detektibea', memory: 'memoria', box: 'kaxa' }

export function bachStatsGameModeForPath(pathname: string): BachStatsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['nabarmendu', 'quien-destaca'].includes(game)) return 'standout'
    if (['histograma', 'que-histograma'].includes(game)) return 'histogram'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['kaxa', 'caja'].includes(game)) return 'box'
    return 'hub'
}
