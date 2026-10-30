import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Antzekotasuna (4. DBH aplikatuak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type SimilarityGameId = 'race' | 'memory'

export const SIMILARITY_GAME_RECORDS_KEY = 'matella-antzekotasuna-dbh4ap-game-records'

export const similarityGames: GameInfo<SimilarityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Antzekotasunaren lasterketa', es: 'Carrera de semejanza', en: 'Similarity race', ar: 'سباق التشابه' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 52101, stage: 'thales', title: { eu: 'Tales', es: 'Tales', en: 'Thales', ar: 'طاليس' }, description: { eu: 'Zati ezezagunak eta banaketak.', es: 'Segmentos desconocidos y repartos.', en: 'Unknown segments and divisions.', ar: 'القطع المجهولة والتقسيمات.' } },
            { progressId: 52102, stage: 'similarity', title: { eu: 'Irudi antzekoak', es: 'Figuras semejantes', en: 'Similar figures', ar: 'الأشكال المتشابهة' }, description: { eu: 'Aldeak, arrazoiak eta homoteziak.', es: 'Lados, razones y homotecias.', en: 'Sides, ratios and homotheties.', ar: 'الأضلاع والنسب والتحاكيات.' } },
            { progressId: 52103, stage: 'ratios', title: { eu: 'r, r² eta r³', es: 'r, r² y r³', en: 'r, r² and r³', ar: 'r وr² وr³' }, description: { eu: 'Perimetroak, azalerak eta bolumenak.', es: 'Perímetros, áreas y volúmenes.', en: 'Perimeters, areas and volumes.', ar: 'المحيطات والمساحات والحجوم.' } },
            { progressId: 52104, stage: 'scales', title: { eu: 'Eskalak', es: 'Escalas', en: 'Scales', ar: 'المقاييس' }, description: { eu: 'Mapak, planoak eta maketak.', es: 'Mapas, planos y maquetas.', en: 'Maps, plans and scale models.', ar: 'الخرائط والمخططات والمجسّمات.' } },
            { progressId: 52105, stage: 'heights', title: { eu: 'Altuerak', es: 'Alturas', en: 'Altitudes', ar: 'الارتفاعات' }, description: { eu: 'Itzalak, ispiluak eta ikus-lerroak.', es: 'Sombras, espejos y líneas de visión.', en: 'Shadows, mirrors and lines of sight.', ar: 'الظلال والمرايا وخطوط النظر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu kalkulu bakoitza bere emaitzarekin.', es: 'Une cada cálculo con su resultado.', en: 'Match each calculation with its result.', ar: 'صِل كل حساب بنتيجته.' },
        skills: { eu: 'Tales, arrazoiak eta eskalak', es: 'Tales, razones y escalas', en: 'Thales, ratios and scales', ar: 'طاليس والنسب والمقاييس' },
        levels: [
            { progressId: 52201, stage: 'thales', title: { eu: 'Tales', es: 'Tales', en: 'Thales', ar: 'طاليس' }, description: { eu: '2/4 = 3/x ↔ x = 6', es: '2/4 = 3/x ↔ x = 6', en: '2/4 = 3/x ↔ x = 6', ar: '2/4 = 3/x ↔ x = 6' } },
            { progressId: 52202, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', en: 'Ratios', ar: 'النسب' }, description: { eu: 'r = 3 → A ↔ × 9', es: 'r = 3 → A ↔ × 9', en: 'r = 3 → A ↔ × 9', ar: 'r = 3 → A ↔ × 9' } },
            { progressId: 52203, stage: 'scales', title: { eu: 'Eskalak', es: 'Escalas', en: 'Scales', ar: 'المقاييس' }, description: { eu: '4 cm, 1:50 000 ↔ 2 km', es: '4 cm, 1:50 000 ↔ 2 km', en: '4 cm, 1:50,000 ↔ 2 km', ar: '4 cm, 1:50 000 ↔ 2 km' } }
        ]
    }
]

export const similarityGameProgressIds: number[] = levelProgressIds(similarityGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const similarityGameSlugs: Record<SimilarityGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function similarityGameModeForPath(pathname: string): SimilarityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
