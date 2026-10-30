import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzioak (4. DBH akademikoak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type FunctionsAkGameId = 'race' | 'memory'

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
    }
]

export const functionsAkGameProgressIds: number[] = levelProgressIds(functionsAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const functionsAkGameSlugs: Record<FunctionsAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function functionsAkGameModeForPath(pathname: string): FunctionsAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
