import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachLimitsGames } from '../../batx1-zientziak-limiteak/games/info.ts'
import type { SocLimitsStageId } from '../lessons.tsx'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 1 · Gizarte Zientziak) games:
   two of their own (and in the long run?, join the pieces) and the
   detective, the race and the memory, and three games of the Ciencias
   twin with their texts and levels but this unit's stages and progress
   ids: indeterminate or not? (its first two levels: the third is 1^∞ and
   the number e, left out), hunt the asymptotes and which discontinuity?
   (its first two levels: the third has E(x)).
   ========================================================================== */

export type SocLimitsGameId = 'race' | 'long' | 'join' | 'detective' | 'memory' | 'forms' | 'asymptote' | 'discontinuity'

export const SOC_LIMITS_GAME_RECORDS_KEY = 'matella-limiteak-batx1g-game-records'

function reused(id: SocLimitsGameId, stages: SocLimitsStageId[], firstId: number): GameInfo<SocLimitsGameId> {
    const source = bachLimitsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.slice(0, stages.length).map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const socLimitsGames: GameInfo<SocLimitsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Limiteen lasterketa', es: 'Carrera de límites', en: 'Limits race', ar: 'سباق النهايات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 135401, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: 'Mailak eta aˣ, 0 < a < 1.', es: 'Grados y aˣ con 0 < a < 1.', en: 'Degrees and aˣ with 0 < a < 1.', ar: 'الدرجات وaˣ مع 0 < a < 1.' } },
            { progressId: 135402, stage: 'more-infinity', title: { eu: 'Kasu gehiago', es: 'Más casos', en: 'More cases', ar: 'حالات أخرى' }, description: { eu: '−∞, erroak eta batez besteko kostua.', es: '−∞, raíces y coste medio.', en: '−∞, roots and average cost.', ar: '−∞ والجذور والتكلفة المتوسطة.' } },
            { progressId: 135403, stage: 'point', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: 'Alboko limiteak eta 0/0.', es: 'Límites laterales y 0/0.', en: 'One-sided limits and 0/0.', ar: 'النهايتان الجانبيتان و0/0.' } },
            { progressId: 135404, stage: 'continuity', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' }, description: { eu: 'Parametroa, zuloa eta jauzia.', es: 'Parámetro, agujero y salto.', en: 'Parameter, hole and jump.', ar: 'الوسيط والثقب والقفزة.' } },
            { progressId: 135405, stage: 'asymptotes', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: 'Bertikala, horizontala eta zeiharra.', es: 'Vertical, horizontal y oblicua.', en: 'Vertical, horizontal and oblique.', ar: 'الرأسي والأفقي والمائل.' } }
        ]
    },
    {
        id: 'long',
        title: { eu: 'Eta epe luzera?', es: '¿Y a la larga?', en: 'And in the long run?', ar: 'وعلى المدى البعيد؟' },
        tagline: { eu: 'Funtzio bat eta nora doan x: aukeratu zer egiten duen epe luzera, zenbaki bat, 0, +∞ ala −∞.', es: 'Una función y hacia dónde va x: elige qué hace a la larga, un número, 0, +∞ o −∞.', en: 'A function and where x goes: choose what it does in the long run, a number, 0, +∞ or −∞.', ar: 'دالة وإلى أين يتجه x: اختر ماذا تفعل على المدى البعيد: عددًا أو 0 أو +∞ أو −∞.' },
        skills: { eu: 'Limiteak infinituan', es: 'Límites en el infinito', en: 'Limits at infinity', ar: 'النهايات عند اللانهاية' },
        levels: [
            { progressId: 135501, stage: 'infinity', title: { eu: 'Polinomioak eta aˣ', es: 'Polinomios y aˣ', en: 'Polynomials and aˣ', ar: 'الحدوديات وaˣ' }, description: { eu: 'Maila handieneko gaiak agintzen du.', es: 'Manda el término de mayor grado.', en: 'The highest-degree term rules.', ar: 'الحد ذو الدرجة الأكبر يحكم.' } },
            { progressId: 135502, stage: 'infinity', title: { eu: 'Zatidurak', es: 'Cocientes', en: 'Quotients', ar: 'خوارج القسمة' }, description: { eu: 'Mailak eta batez besteko kostua.', es: 'Grados y coste medio.', en: 'Degrees and average cost.', ar: 'الدرجات والتكلفة المتوسطة.' } },
            { progressId: 135503, stage: 'more-infinity', title: { eu: '−∞ eta erroak', es: '−∞ y raíces', en: '−∞ and roots', ar: '−∞ والجذور' }, description: { eu: 'Maila bikoitia ala bakoitia.', es: 'Grado par o impar.', en: 'Even or odd degree.', ar: 'درجة زوجية أو فردية.' } }
        ]
    },
    {
        id: 'join',
        title: { eu: 'Lotu zatiak', es: 'Empalma los trozos', en: 'Join the pieces', ar: 'صِل الأجزاء' },
        tagline: { eu: 'Bi zatiko funtzio bat eta k parametroa: probatu txartelak eta aurkitu jauzia ezabatzen duena.', es: 'Una función de dos trozos y un parámetro k: prueba las tarjetas y encuentra la que borra el salto.', en: 'A two-piece function and a parameter k: try the cards and find the one that removes the jump.', ar: 'دالة من جزأين ووسيط k: جرّب البطاقات وجد التي تزيل القفزة.' },
        skills: { eu: 'Jarraitutasuna lotura-puntuan', es: 'Continuidad en el punto de unión', en: 'Continuity at the joining point', ar: 'الاتصال عند نقطة الوصل' },
        levels: [
            { progressId: 135551, stage: 'continuity', title: { eu: 'Bi zuzen', es: 'Dos rectas', en: 'Two lines', ar: 'مستقيمان' }, description: { eu: 'k bigarren zatian.', es: 'k en el segundo trozo.', en: 'k in the second piece.', ar: 'k في الجزء الثاني.' } },
            { progressId: 135552, stage: 'continuity', title: { eu: 'Parabola eta zuzena', es: 'Parábola y recta', en: 'Parabola and line', ar: 'قطع مكافئ ومستقيم' }, description: { eu: 'k gehigarri edo koefiziente.', es: 'k sumando o como coeficiente.', en: 'k added or as a coefficient.', ar: 'k مضافًا أو معاملًا.' } },
            { progressId: 135553, stage: 'continuity', title: { eu: 'Tarifak', es: 'Tarifas', en: 'Tariffs', ar: 'التعرفات' }, description: { eu: 'Euroak eta tarteak.', es: 'Euros y tramos.', en: 'Euros and bands.', ar: 'اليورو والشرائح.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Limiteen detektibea', es: 'Detective de límites', en: 'Limits detective', ar: 'مخبر النهايات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 135701, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: '∞/∞, koefizienteak, (−x)² eta erroak.', es: '∞/∞, coeficientes, (−x)² y raíces.', en: '∞/∞, coefficients, (−x)² and roots.', ar: '∞/∞ والمعاملات و(−x)² والجذور.' } },
            { progressId: 135702, stage: 'point', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: '0/0, f(a), k/0 eta faktorizazioa.', es: '0/0, f(a), k/0 y la factorización.', en: '0/0, f(a), k/0 and factorising.', ar: '0/0 وf(a) وk/0 والتحليل.' } },
            { progressId: 135703, stage: 'asymptotes', title: { eu: 'Jarraitutasuna eta asintotak', es: 'Continuidad y asíntotas', en: 'Continuity and asymptotes', ar: 'الاتصال والمقاربات' }, description: { eu: 'Zatiak, zuloak, adarrak eta kostuak.', es: 'Trozos, agujeros, ramas y costes.', en: 'Pieces, holes, branches and costs.', ar: 'الأجزاء والثقوب والفروع والتكاليف.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: limite bat eta haren balioa, edo funtzio bat eta haren asintotak.', es: 'Encuentra las parejas: un límite y su valor, o una función y sus asíntotas.', en: 'Find the pairs: a limit and its value, or a function and its asymptotes.', ar: 'اعثر على الأزواج: نهاية وقيمتها، أو دالة ومقارباتها.' },
        skills: { eu: 'Limiteak eta asintotak', es: 'Límites y asíntotas', en: 'Limits and asymptotes', ar: 'النهايات والمقاربات' },
        levels: [
            { progressId: 135801, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: '(3x² + 1)/x² ↔ 3', es: '(3x² + 1)/x² ↔ 3', en: '(3x² + 1)/x² ↔ 3', ar: '(3x² + 1)/x² ↔ 3' } },
            { progressId: 135802, stage: 'point', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: '(x² − 4)/(x − 2) ↔ 4', es: '(x² − 4)/(x − 2) ↔ 4', en: '(x² − 4)/(x − 2) ↔ 4', ar: '(x² − 4)/(x − 2) ↔ 4' } },
            { progressId: 135803, stage: 'asymptotes', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: '(2x + 1)/(x − 3) ↔ x = 3, y = 2', es: '(2x + 1)/(x − 3) ↔ x = 3, y = 2', en: '(2x + 1)/(x − 3) ↔ x = 3, y = 2', ar: '(2x + 1)/(x − 3) ↔ x = 3, y = 2' } }
        ]
    },
    reused('forms', ['point', 'infinity'], 135811),
    reused('asymptote', ['asymptotes', 'asymptotes', 'asymptotes'], 135821),
    reused('discontinuity', ['continuity', 'continuity'], 135831)
]

export const socLimitsGameProgressIds: number[] = levelProgressIds(socLimitsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const socLimitsGameSlugs: Record<SocLimitsGameId, string> = { race: 'lasterketa', long: 'epe-luzera', join: 'lotu', detective: 'detektibea', memory: 'memoria', forms: 'indeterminazioak', asymptote: 'asintotak', discontinuity: 'etenuneak' }

export function socLimitsGameModeForPath(pathname: string): SocLimitsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['epe-luzera', 'a-la-larga'].includes(game)) return 'long'
    if (['lotu', 'empalma'].includes(game)) return 'join'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['indeterminazioak', 'indeterminaciones'].includes(game)) return 'forms'
    if (['asintotak', 'asintotas'].includes(game)) return 'asymptote'
    if (['etenuneak', 'discontinuidades'].includes(game)) return 'discontinuity'
    return 'hub'
}
