import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzioak (4. DBH aplikatuak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type FunctionsGameId = 'race' | 'memory'

export const FUNCTIONS_GAME_RECORDS_KEY = 'matella-funtzioak-dbh4ap-game-records'

export const functionsGames: GameInfo<FunctionsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Function race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 54101, stage: 'concept', title: { eu: 'Kontzeptua', es: 'Concepto', en: 'Concept', ar: 'المفهوم' }, description: { eu: 'Irudiak, tarifak eta aurreirudiak.', es: 'Imágenes, tarifas y antiimágenes.', en: 'Images, tariffs and preimages.', ar: 'الصور والتعريفات والأصول.' } },
            { progressId: 54102, stage: 'domain', title: { eu: 'Izate-eremua', es: 'Dominio', en: 'Domain', ar: 'المجال' }, description: { eu: 'Zatikiak, erroak eta ebakidurak.', es: 'Fracciones, raíces y cortes.', en: 'Fractions, square roots and intercepts.', ar: 'الكسور والجذور والتقاطعات.' } },
            { progressId: 54103, stage: 'change', title: { eu: 'Hazkundea', es: 'Crecimiento', en: 'Growth', ar: 'التزايد' }, description: { eu: 'BAT, abiadurak eta muturrak.', es: 'T.V.M., velocidades y extremos.', en: 'Average rate of change, speeds and extremes.', ar: 'المعدل والسرعات والقيم القصوى.' } },
            { progressId: 54104, stage: 'properties', title: { eu: 'Propietateak', es: 'Propiedades', en: 'Properties', ar: 'الخصائص' }, description: { eu: 'Periodoak, aparkalekuak eta erdiak.', es: 'Periodos, aparcamientos y mitades.', en: 'Periods, car parks and halves.', ar: 'الأدوار والمواقف والأنصاف.' } },
            { progressId: 54105, stage: 'study', title: { eu: 'Azterketa', es: 'Estudio', en: 'Study', ar: 'الدراسة' }, description: { eu: 'Grafikoak eskalarekin eta kutxa.', es: 'Gráficas con escala y la caja.', en: 'Graphs with a scale and the cardboard box.', ar: 'رسوم بتدريج والعلبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu funtzio bakoitza bere emaitzarekin.', es: 'Une cada función con su resultado.', en: 'Match each function with its result.', ar: 'صِل كل دالة بنتيجتها.' },
        skills: { eu: 'Irudiak, izate-eremuak eta BAT', es: 'Imágenes, dominios y T.V.M.', en: 'Images, domains and average rate of change', ar: 'الصور والمجالات والمعدل' },
        levels: [
            { progressId: 54201, stage: 'concept', title: { eu: 'Irudiak', es: 'Imágenes', en: 'Images', ar: 'الصور' }, description: { eu: 'x² − 3, x = −2 ↔ 1', es: 'x² − 3, x = −2 ↔ 1', en: 'x² − 3, x = −2 ↔ 1', ar: 'x² − 3, x = −2 ↔ 1' } },
            { progressId: 54202, stage: 'domain', title: { eu: 'Izate-eremuak', es: 'Dominios', en: 'Domains', ar: 'المجالات' }, description: { eu: '√(x − 2) ↔ [2, +∞)', es: '√(x − 2) ↔ [2, +∞)', en: '√(x − 2) ↔ [2, +∞)', ar: '√(x − 2) ↔ [2, +∞)' } },
            { progressId: 54203, stage: 'change', title: { eu: 'BAT', es: 'T.V.M.', en: 'Average rate of change', ar: 'المعدل' }, description: { eu: 'x², [1, 3] ↔ 4', es: 'x², [1, 3] ↔ 4', en: 'x², [1, 3] ↔ 4', ar: 'x², [1, 3] ↔ 4' } }
        ]
    }
]

export const functionsGameProgressIds: number[] = levelProgressIds(functionsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const functionsGameSlugs: Record<FunctionsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function functionsGameModeForPath(pathname: string): FunctionsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
