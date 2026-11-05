import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { percentGames } from '../../dbh4-akademikoak-errealak/games/info.ts'
import { powersGames } from '../../dbh4-akademikoak-potentziak/games/info.ts'
import type { BachRealsStageId } from '../lessons.tsx'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (the neighbourhood target, the
   hidden coefficient and the detective), the race and the memory, and four
   games of 4. DBH académicas kept for the review (place on the line, build
   the interval, simplify the radical, find the exponent), with their own
   levels but progress ids of this unit.
   ========================================================================== */

export type BachRealsGameId = 'race' | 'target' | 'coefficient' | 'detective' | 'memory' | 'place' | 'intervals' | 'radical' | 'log'

export const BACH_REALS_GAME_RECORDS_KEY = 'matella-errealak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: BachRealsGameId, stages: BachRealsStageId[], firstId: number): GameInfo<BachRealsGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachRealsGames: GameInfo<BachRealsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Errealen lasterketa', es: 'Carrera de los reales', en: 'Real numbers race', ar: 'سباق الأعداد الحقيقية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 99401, stage: 'reals', title: { eu: 'Zenbaki errealak', es: 'Los números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' }, description: { eu: 'Multzoak, periodoak eta hipotenusak.', es: 'Conjuntos, periodos e hipotenusas.', en: 'Sets, recurring decimals and hypotenuses.', ar: 'المجموعات والأعداد الدورية والأوتار.' } },
            { progressId: 99402, stage: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' }, description: { eu: 'Distantziak, soluzioak eta inguruneak.', es: 'Distancias, soluciones y entornos.', en: 'Distances, solutions and neighbourhoods.', ar: 'المسافات والحلول والجوارات.' } },
            { progressId: 99403, stage: 'errors', title: { eu: 'Erroreak', es: 'Errores', en: 'Errors', ar: 'الأخطاء' }, description: { eu: 'Zifra esanguratsuak, borneak eta errore erlatiboa.', es: 'Cifras significativas, cotas y error relativo.', en: 'Significant figures, bounds and relative error.', ar: 'الأرقام المعنوية والحدود والخطأ النسبي.' } },
            { progressId: 99404, stage: 'radicals', title: { eu: 'Erroak eta logaritmoak', es: 'Raíces y logaritmos', en: 'Roots and logarithms', ar: 'الجذور واللوغاريتمات' }, description: { eu: 'Faktoreak atera, arrazionalizatu eta logaritmoak.', es: 'Sacar factores, racionalizar y logaritmos.', en: 'Taking factors out, rationalising and logarithms.', ar: 'إخراج العوامل والإنطاق واللوغاريتمات.' } },
            { progressId: 99405, stage: 'newton-stage', title: { eu: 'Newtonen binomioa', es: 'Binomio de Newton', en: 'The binomial theorem', ar: 'ذات الحدين' }, description: { eu: 'Zenbaki konbinatorioak, gaiak eta koefizienteak.', es: 'Números combinatorios, términos y coeficientes.', en: 'Binomial coefficients, terms and coefficients.', ar: 'الأعداد التوافقية والحدود والمعاملات.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Ingurunea jomugan', es: 'Entorno al blanco', en: 'Neighbourhood on target', ar: 'الجوار في الهدف' },
        tagline: { eu: 'Zuzenean gune bat agertzen da: jarri ingurunearen erdigunea eta erradioa, saiakera bakarrean.', es: 'En la recta aparece una zona: coloca el centro y el radio del entorno, con un solo intento.', en: 'A zone appears on the line: set the centre and the radius of the neighbourhood, with one try.', ar: 'تظهر منطقة على المستقيم: ضع مركز الجوار ونصف قطره بمحاولة واحدة.' },
        skills: { eu: 'Balio absolutua eta inguruneak', es: 'Valor absoluto y entornos', en: 'Absolute value and neighbourhoods', ar: 'القيمة المطلقة والجوارات' },
        levels: [
            { progressId: 99501, stage: 'absolute', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' }, description: { eu: 'Mutur osoak, marraztuta.', es: 'Extremos enteros, dibujados.', en: 'Whole endpoints, drawn.', ar: 'أطراف صحيحة مرسومة.' } },
            { progressId: 99502, stage: 'absolute', title: { eu: 'Erdiak', es: 'Medios', en: 'Halves', ar: 'الأنصاف' }, description: { eu: 'Desberdintza bat, mutur erdiekin.', es: 'Una desigualdad, con extremos en medios.', en: 'An inequality, with endpoints at halves.', ar: 'متباينة بأطراف أنصاف.' } },
            { progressId: 99503, stage: 'absolute', title: { eu: 'Kanpoaldea', es: 'Por fuera', en: 'Outside', ar: 'الخارج' }, description: { eu: '|x − a| ≥ r: bi zuzenerdi.', es: '|x − a| ≥ r: dos semirrectas.', en: '|x − a| ≥ r: two half-lines.', ar: '|x − a| ≥ r: نصفا مستقيم.' } }
        ]
    },
    {
        id: 'coefficient',
        title: { eu: 'Koefiziente ezkutua', es: 'El coeficiente escondido', en: 'The hidden coefficient', ar: 'المعامل المخفي' },
        tagline: { eu: 'Garapen bati koefiziente bat falta zaio: idatzi, zeinua barne.', es: 'A un desarrollo le falta un coeficiente: escríbelo, con su signo.', en: 'An expansion is missing a coefficient: write it, with its sign.', ar: 'ينقص النشرَ معاملٌ: اكتبه مع إشارته.' },
        skills: { eu: 'Newtonen binomioa', es: 'Binomio de Newton', en: 'The binomial theorem', ar: 'ذات الحدين لنيوتن' },
        levels: [
            { progressId: 99601, stage: 'newton-stage', title: { eu: 'Tartaglia', es: 'Tartaglia', en: 'Tartaglia', ar: 'تارتاليا' }, description: { eu: '(x + 1)ⁿ', es: '(x + 1)ⁿ', en: '(x + 1)ⁿ', ar: '(x + 1)ⁿ' } },
            { progressId: 99602, stage: 'newton-stage', title: { eu: 'Zeinuekin', es: 'Con signos', en: 'With signs', ar: 'مع الإشارات' }, description: { eu: '(x ± b)ⁿ', es: '(x ± b)ⁿ', en: '(x ± b)ⁿ', ar: '(x ± b)ⁿ' } },
            { progressId: 99603, stage: 'newton-stage', title: { eu: 'Gai orokorra', es: 'Término general', en: 'General term', ar: 'الحد العام' }, description: { eu: '(a x + b)ⁿ', es: '(a x + b)ⁿ', en: '(a x + b)ⁿ', ar: '(a x + b)ⁿ' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Errealen detektibea', es: 'Detective de los reales', en: 'Real numbers detective', ar: 'مخبر الأعداد الحقيقية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 99701, stage: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' }, description: { eu: 'Soluzioak, distantziak eta erradioak.', es: 'Soluciones, distancias y radios.', en: 'Solutions, distances and radii.', ar: 'الحلول والمسافات وأنصاف الأقطار.' } },
            { progressId: 99702, stage: 'errors', title: { eu: 'Erroreak eta erroak', es: 'Errores y raíces', en: 'Errors and roots', ar: 'الأخطاء والجذور' }, description: { eu: 'Errore erlatiboa, zifrak eta konjokatua.', es: 'Error relativo, cifras y conjugado.', en: 'Relative error, figures and the conjugate.', ar: 'الخطأ النسبي والأرقام والمرافق.' } },
            { progressId: 99703, stage: 'newton-stage', title: { eu: 'Logaritmoak eta binomioa', es: 'Logaritmos y binomio', en: 'Logarithms and the binomial', ar: 'اللوغاريتمات وذات الحدين' }, description: { eu: 'Baturak, berreturak eta gaiak.', es: 'Sumas, potencias y términos.', en: 'Sums, powers and terms.', ar: 'المجاميع والقوى والحدود.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ingurunea eta bere tartea, logaritmoa eta bere balioa, edo zenbaki konbinatorioa eta bere balioa.', es: 'Encuentra las parejas: un entorno y su intervalo, un logaritmo y su valor o un número combinatorio y su valor.', en: 'Find the pairs: a neighbourhood and its interval, a logarithm and its value, or a binomial coefficient and its value.', ar: 'جد الأزواج: جوار وفترته، أو لوغاريتم وقيمته، أو عدد توافقي وقيمته.' },
        skills: { eu: 'Inguruneak, logaritmoak eta zenbaki konbinatorioak', es: 'Entornos, logaritmos y números combinatorios', en: 'Neighbourhoods, logarithms and binomial coefficients', ar: 'الجوارات واللوغاريتمات والأعداد التوافقية' },
        levels: [
            { progressId: 99801, stage: 'absolute', title: { eu: 'Inguruneak', es: 'Entornos', en: 'Neighbourhoods', ar: 'الجوارات' }, description: { eu: '|x − 1| < 3 ↔ (−2, 4)', es: '|x − 1| < 3 ↔ (−2, 4)', en: '|x − 1| < 3 ↔ (−2, 4)', ar: '|x − 1| < 3 ↔ (−2, 4)' } },
            { progressId: 99802, stage: 'radicals', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₃ 9 ↔ 2', es: 'log₃ 9 ↔ 2', en: 'log₃ 9 ↔ 2', ar: 'log₃ 9 ↔ 2' } },
            { progressId: 99803, stage: 'newton-stage', title: { eu: 'Zenbaki konbinatorioak', es: 'Números combinatorios', en: 'Binomial coefficients', ar: 'الأعداد التوافقية' }, description: { eu: 'C(5, 2) ↔ 10', es: 'C(5, 2) ↔ 10', en: 'C(5, 2) ↔ 10', ar: 'C(5, 2) ↔ 10' } }
        ]
    },
    reused(percentGames.find((game) => game.id === 'place')!, 'place', ['reals', 'reals', 'reals'], 99811),
    reused(percentGames.find((game) => game.id === 'intervals')!, 'intervals', ['absolute', 'absolute', 'absolute'], 99821),
    reused(powersGames.find((game) => game.id === 'radical')!, 'radical', ['radicals', 'radicals', 'radicals'], 99831),
    reused(powersGames.find((game) => game.id === 'log')!, 'log', ['radicals', 'radicals', 'radicals'], 99841)
]

export const bachRealsGameProgressIds: number[] = levelProgressIds(bachRealsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachRealsGameSlugs: Record<BachRealsGameId, string> = { race: 'lasterketa', target: 'jomuga', coefficient: 'koefizientea', detective: 'detektibea', memory: 'memoria', place: 'zuzena', intervals: 'tartea', radical: 'erroak', log: 'berretzailea' }

export function bachRealsGameModeForPath(pathname: string): BachRealsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['jomuga', 'diana'].includes(game)) return 'target'
    if (['koefizientea', 'coeficiente'].includes(game)) return 'coefficient'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zuzena', 'recta', 'situar', 'kokatu'].includes(game)) return 'place'
    if (['tartea', 'intervalo'].includes(game)) return 'intervals'
    if (['erroak', 'radicales'].includes(game)) return 'radical'
    if (['berretzailea', 'exponente'].includes(game)) return 'log'
    return 'hub'
}
