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
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 54101, stage: 'concept', title: { eu: 'Kontzeptua', es: 'Concepto', ar: 'المفهوم' }, description: { eu: 'Irudiak, tarifak eta aurreirudiak.', es: 'Imágenes, tarifas y antiimágenes.', ar: 'الصور والتعريفات والأصول.' } },
            { progressId: 54102, stage: 'domain', title: { eu: 'Izate-eremua', es: 'Dominio', ar: 'المجال' }, description: { eu: 'Zatikiak, erroak eta ebakidurak.', es: 'Fracciones, raíces y cortes.', ar: 'الكسور والجذور والتقاطعات.' } },
            { progressId: 54103, stage: 'change', title: { eu: 'Hazkundea', es: 'Crecimiento', ar: 'التزايد' }, description: { eu: 'BAT, abiadurak eta muturrak.', es: 'T.V.M., velocidades y extremos.', ar: 'المعدل والسرعات والقيم القصوى.' } },
            { progressId: 54104, stage: 'properties', title: { eu: 'Propietateak', es: 'Propiedades', ar: 'الخصائص' }, description: { eu: 'Periodoak, aparkalekuak eta erdiak.', es: 'Periodos, aparcamientos y mitades.', ar: 'الأدوار والمواقف والأنصاف.' } },
            { progressId: 54105, stage: 'study', title: { eu: 'Azterketa', es: 'Estudio', ar: 'الدراسة' }, description: { eu: 'Grafikoak eskalarekin eta kutxa.', es: 'Gráficas con escala y la caja.', ar: 'رسوم بتدريج والعلبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu funtzio bakoitza bere emaitzarekin.', es: 'Une cada función con su resultado.', ar: 'صِل كل دالة بنتيجتها.' },
        skills: { eu: 'Irudiak, izate-eremuak eta BAT', es: 'Imágenes, dominios y T.V.M.', ar: 'الصور والمجالات والمعدل' },
        levels: [
            { progressId: 54201, stage: 'concept', title: { eu: 'Irudiak', es: 'Imágenes', ar: 'الصور' }, description: { eu: 'x² − 3, x = −2 ↔ 1', es: 'x² − 3, x = −2 ↔ 1', ar: 'x² − 3, x = −2 ↔ 1' } },
            { progressId: 54202, stage: 'domain', title: { eu: 'Izate-eremuak', es: 'Dominios', ar: 'المجالات' }, description: { eu: '√(x − 2) ↔ [2, +∞)', es: '√(x − 2) ↔ [2, +∞)', ar: '√(x − 2) ↔ [2, +∞)' } },
            { progressId: 54203, stage: 'change', title: { eu: 'BAT', es: 'T.V.M.', ar: 'المعدل' }, description: { eu: 'x², [1, 3] ↔ 4', es: 'x², [1, 3] ↔ 4', ar: 'x², [1, 3] ↔ 4' } }
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
