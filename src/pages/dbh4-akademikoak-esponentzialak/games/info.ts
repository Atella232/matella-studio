import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak (4. DBH
   akademikoak) games: the list shown in the hub, with levels and the unit
   progress id each level earns with its first star.
   ========================================================================== */

export type ExponentialAkGameId = 'race' | 'memory'

export const EXPONENTIAL_AK_GAME_RECORDS_KEY = 'matella-esponentzialak-dbh4ak-game-records'

export const exponentialAkGames: GameInfo<ExponentialAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Berretura eta uhinen lasterketa', es: 'Carrera de potencias y ondas', en: 'Powers and waves race', ar: 'سباق القوى والموجات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 80101, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Balioak, asintotak eta oinarria.', es: 'Valores, asíntotas y base.', en: 'Values, asymptotes and base.', ar: 'القيم والمقاربات والأساس.' } },
            { progressId: 80102, stage: 'growth', title: { eu: 'Hazkundea', es: 'Crecimiento', en: 'Growth', ar: 'النمو' }, description: { eu: 'Interes konposatua, erdibizitza eta ekuazioak.', es: 'Interés compuesto, semivida y ecuaciones.', en: 'Compound interest, half-life and equations.', ar: 'الفائدة المركبة وعمر النصف والمعادلات.' } },
            { progressId: 80103, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Balioak, izate-eremuak eta ebaki-puntuak.', es: 'Valores, dominios y cortes.', en: 'Values, domains and intercepts.', ar: 'القيم والمجالات ونقاط التقاطع.' } },
            { progressId: 80104, stage: 'trigonometric', title: { eu: 'Sinua eta kosinua', es: 'Seno y coseno', en: 'Sine and cosine', ar: 'الجيب وجيب التمام' }, description: { eu: 'Radianak, balio ohikoak eta zeroak.', es: 'Radianes, valores habituales y ceros.', en: 'Radians, common values and zeros.', ar: 'الراديان والقيم المألوفة والأصفار.' } },
            { progressId: 80105, stage: 'transforms', title: { eu: 'Uhinak', es: 'Ondas', en: 'Waves', ar: 'الموجات' }, description: { eu: 'Maximoak, periodoak eta anplitudeak.', es: 'Máximos, periodos y amplitudes.', en: 'Maxima, periods and amplitudes.', ar: 'القيم العظمى والأدوار والسعات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Berreturak, logaritmoak eta periodoak', es: 'Potencias, logaritmos y periodos', en: 'Powers, logarithms and periods', ar: 'القوى واللوغاريتمات والأدوار' },
        levels: [
            { progressId: 80201, stage: 'exponential', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', en: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } },
            { progressId: 80202, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 32 ↔ 5', es: 'log₂ 32 ↔ 5', en: 'log₂ 32 ↔ 5', ar: 'log₂ 32 ↔ 5' } },
            { progressId: 80203, stage: 'transforms', title: { eu: 'Periodoak', es: 'Periodos', en: 'Periods', ar: 'الأدوار' }, description: { eu: 'cos 3x ↔ 2π/3', es: 'cos 3x ↔ 2π/3', en: 'cos 3x ↔ 2π/3', ar: 'cos 3x ↔ 2π/3' } }
        ]
    }
]

export const exponentialAkGameProgressIds: number[] = levelProgressIds(exponentialAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const exponentialAkGameSlugs: Record<ExponentialAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function exponentialAkGameModeForPath(pathname: string): ExponentialAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
