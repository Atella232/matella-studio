import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { sequencesGames } from '../../dbh3-segidak/games/info.ts'
import type { BachSequencesStageId } from '../lessons.tsx'

/* ==========================================================================
   Segidak (Batxilergoa 1 · Zientziak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star. Three games of its own (where does it go, catch the band and the
   detective), the race and the memory, and three games of 3. DBH kept for
   the review (the hidden pattern, the sorter and Gauss's staircase), with
   their own levels but progress ids of this unit.
   ========================================================================== */

export type BachSequencesGameId = 'race' | 'where' | 'band' | 'detective' | 'memory' | 'hidden' | 'sorter' | 'staircase'

export const BACH_SEQUENCES_GAME_RECORDS_KEY = 'matella-segidak-batx1z-game-records'

/** A 3. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: BachSequencesGameId, stages: BachSequencesStageId[], firstId: number): GameInfo<BachSequencesGameId> {
    const source = sequencesGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachSequencesGames: GameInfo<BachSequencesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Segiden lasterketa', es: 'Carrera de sucesiones', en: 'Sequences race', ar: 'سباق المتتاليات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 100401, stage: 'sequences', title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' }, description: { eu: 'Gai orokorra, errepikapena eta Fibonacci.', es: 'Término general, recurrencia y Fibonacci.', en: 'General term, recursion and Fibonacci.', ar: 'الحد العام والتراجع وفيبوناتشي.' } },
            { progressId: 100402, stage: 'progressions', title: { eu: 'Progresioak', es: 'Progresiones', en: 'Progressions', ar: 'المتتاليات الحسابية والهندسية' }, description: { eu: 'Gaiak eta baturak.', es: 'Términos y sumas.', en: 'Terms and sums.', ar: 'الحدود والمجاميع.' } },
            { progressId: 100403, stage: 'infinite-sums', title: { eu: 'Batura infinituak', es: 'Sumas infinitas', en: 'Infinite sums', ar: 'المجاميع اللانهائية' }, description: { eu: 'S∞, periodoak eta karratuak.', es: 'S∞, periodos y cuadrados.', en: 'S∞, recurring decimals and squares.', ar: 'S∞ والأعداد الدورية والمربعات.' } },
            { progressId: 100404, stage: 'limits', title: { eu: 'Limiteak', es: 'Límites', en: 'Limits', ar: 'النهايات' }, description: { eu: 'Zatidurak eta zein gaitik aurrera.', es: 'Cocientes y a partir de qué término.', en: 'Quotients and from which term on.', ar: 'خوارج القسمة وابتداءً من أيّ حد.' } },
            { progressId: 100405, stage: 'number-e', title: { eu: 'e zenbakia', es: 'El número e', en: 'The number e', ar: 'العدد e' }, description: { eu: 'Berretzaileak eta hazkunde jarraitua.', es: 'Exponentes y crecimiento continuo.', en: 'Exponents and continuous growth.', ar: 'الأسس والنمو المستمر.' } }
        ]
    },
    {
        id: 'where',
        title: { eu: 'Nora doa?', es: '¿Hacia dónde va?', en: 'Where does it go?', ar: 'إلى أين تتجه؟' },
        tagline: { eu: 'Segida bat ikusiko duzu: zenbaki batera, +∞ edo −∞ aldera doa, edo oszilatzen du?', es: 'Verás una sucesión: ¿va a un número, a +∞ o a −∞, o se queda oscilando?', en: 'You will see a sequence: does it go to a number, to +∞ or to −∞, or does it oscillate?', ar: 'سترى متتالية: هل تتجه إلى عدد أو إلى +∞ أو إلى −∞ أم تتذبذب؟' },
        skills: { eu: 'Segida baten limitea', es: 'Límite de una sucesión', en: 'The limit of a sequence', ar: 'نهاية المتتالية' },
        levels: [
            { progressId: 100501, stage: 'limits', title: { eu: 'Zatidurak', es: 'Cocientes', en: 'Quotients', ar: 'خوارج القسمة' }, description: { eu: 'Alderatu mailak.', es: 'Compara los grados.', en: 'Compare the degrees.', ar: 'قارن الدرجتين.' } },
            { progressId: 100502, stage: 'limits', title: { eu: 'Berreturak eta zeinuak', es: 'Potencias y signos', en: 'Powers and signs', ar: 'القوى والإشارات' }, description: { eu: 'rⁿ, (−1)ⁿ eta polinomioak.', es: 'rⁿ, (−1)ⁿ y polinomios.', en: 'rⁿ, (−1)ⁿ and polynomials.', ar: 'rⁿ و(−1)ⁿ وكثيرات الحدود.' } },
            { progressId: 100503, stage: 'number-e', title: { eu: 'e zenbakia', es: 'El número e', en: 'The number e', ar: 'العدد e' }, description: { eu: '(1 + k/n)ⁿ eta senideak.', es: '(1 + k/n)ⁿ y familia.', en: '(1 + k/n)ⁿ and its relatives.', ar: '(1 + k/n)ⁿ وأخواتها.' } }
        ]
    },
    {
        id: 'band',
        title: { eu: 'Harrapatu banda', es: 'Atrapa la banda', en: 'Catch the band', ar: 'التقط الشريط' },
        tagline: { eu: 'Segida bat, bere limitea eta ε: idatzi zein gaitik aurrera geratzen diren gai guztiak bandan.', es: 'Una sucesión, su límite y ε: escribe desde qué término quedan todos en la banda.', en: 'A sequence, its limit and ε: write from which term on they all stay in the band.', ar: 'متتالية ونهايتها وε: اكتب ابتداءً من أيّ حد تبقى كل الحدود في الشريط.' },
        skills: { eu: 'Zein gaitik aurrera?', es: '¿A partir de qué término?', en: 'From which term on?', ar: 'ابتداءً من أيّ حد؟' },
        levels: [
            { progressId: 100601, stage: 'limits', title: { eu: 'L + c/n', es: 'L + c/n', en: 'L + c/n', ar: 'L + c/n' }, description: { eu: 'Distantzia c/n da.', es: 'La distancia es c/n.', en: 'The distance is c/n.', ar: 'المسافة c/n.' } },
            { progressId: 100602, stage: 'limits', title: { eu: 'Zatidurak', es: 'Cocientes', en: 'Quotients', ar: 'خوارج القسمة' }, description: { eu: 'Lehenik kalkulatu distantzia.', es: 'Primero calcula la distancia.', en: 'Work out the distance first.', ar: 'احسب المسافة أولًا.' } },
            { progressId: 100603, stage: 'limits', title: { eu: 'Karratuak eta zeinuak', es: 'Cuadrados y signos', en: 'Squares and signs', ar: 'المربعات والإشارات' }, description: { eu: 'c/n² eta (−1)ⁿ.', es: 'c/n² y (−1)ⁿ.', en: 'c/n² and (−1)ⁿ.', ar: 'c/n² و(−1)ⁿ.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Segiden detektibea', es: 'Detective de sucesiones', en: 'Sequences detective', ar: 'مخبر المتتاليات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 100701, stage: 'progressions', title: { eu: 'Progresioak', es: 'Progresiones', en: 'Progressions', ar: 'المتتاليات الحسابية والهندسية' }, description: { eu: 'Gaiak, baturak eta ehunekoak.', es: 'Términos, sumas y porcentajes.', en: 'Terms, sums and percentages.', ar: 'الحدود والمجاميع والنسب المئوية.' } },
            { progressId: 100702, stage: 'limits', title: { eu: 'Baturak eta limiteak', es: 'Sumas y límites', en: 'Sums and limits', ar: 'المجاميع والنهايات' }, description: { eu: 'S∞, periodoak eta mailak.', es: 'S∞, periodos y grados.', en: 'S∞, recurring decimals and degrees.', ar: 'S∞ والأعداد الدورية والدرجات.' } },
            { progressId: 100703, stage: 'number-e', title: { eu: 'e eta ε', es: 'e y ε', en: 'e and ε', ar: 'e وε' }, description: { eu: 'e zenbakia, N eta hazkunde jarraitua.', es: 'El número e, N y el crecimiento continuo.', en: 'The number e, N and continuous growth.', ar: 'العدد e وN والنمو المستمر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: segida bat eta bere gaia, batura infinitu bat eta bere balioa, edo limite bat eta bere balioa.', es: 'Encuentra las parejas: una sucesión y su término, una suma infinita y su valor, o un límite y su valor.', en: 'Find the pairs: a sequence and its term, an infinite sum and its value, or a limit and its value.', ar: 'اعثر على الأزواج: متتالية وحدّها، أو مجموع لا نهائي وقيمته، أو نهاية وقيمتها.' },
        skills: { eu: 'Gaiak, baturak eta limiteak', es: 'Términos, sumas y límites', en: 'Terms, sums and limits', ar: 'الحدود والمجاميع والنهايات' },
        levels: [
            { progressId: 100801, stage: 'sequences', title: { eu: 'Gaiak', es: 'Términos', en: 'Terms', ar: 'الحدود' }, description: { eu: 'aₙ = 3n + 1, a₄ ↔ 13', es: 'aₙ = 3n + 1, a₄ ↔ 13', en: 'aₙ = 3n + 1, a₄ ↔ 13', ar: 'aₙ = 3n + 1, a₄ ↔ 13' } },
            { progressId: 100802, stage: 'infinite-sums', title: { eu: 'Batura infinituak', es: 'Sumas infinitas', en: 'Infinite sums', ar: 'المجاميع اللانهائية' }, description: { eu: '6 + 3 + … ↔ 12', es: '6 + 3 + … ↔ 12', en: '6 + 3 + … ↔ 12', ar: '6 + 3 + … ↔ 12' } },
            { progressId: 100803, stage: 'limits', title: { eu: 'Limiteak', es: 'Límites', en: 'Limits', ar: 'النهايات' }, description: { eu: 'lim (4n + 1)/(2n) ↔ 2', es: 'lim (4n + 1)/(2n) ↔ 2', en: 'lim (4n + 1)/(2n) ↔ 2', ar: 'lim (4n + 1)/(2n) ↔ 2' } }
        ]
    },
    reused('hidden', ['progressions', 'progressions', 'sequences'], 100811),
    reused('sorter', ['progressions', 'progressions', 'progressions'], 100821),
    reused('staircase', ['progressions', 'progressions', 'progressions'], 100831)
]

export const bachSequencesGameProgressIds: number[] = levelProgressIds(bachSequencesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachSequencesGameSlugs: Record<BachSequencesGameId, string> = { race: 'lasterketa', where: 'nora', band: 'banda', detective: 'detektibea', memory: 'memoria', hidden: 'ezkutua', sorter: 'sailkatu', staircase: 'eskailera' }

export function bachSequencesGameModeForPath(pathname: string): BachSequencesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['nora', 'hacia-donde'].includes(game)) return 'where'
    if (['banda', 'atrapa'].includes(game)) return 'band'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['ezkutua', 'escondido'].includes(game)) return 'hidden'
    if (['sailkatu', 'clasificar'].includes(game)) return 'sorter'
    if (['eskailera', 'escalera'].includes(game)) return 'staircase'
    return 'hub'
}
