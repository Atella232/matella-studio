import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna (4. DBH akademikoak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star.
   ========================================================================== */

export type AreasSimilarityGameId = 'race' | 'memory'

export const AREAS_SIMILARITY_GAME_RECORDS_KEY = 'matella-areak-dbh4ak-game-records'

export const areasSimilarityGames: GameInfo<AreasSimilarityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Azalera eta bolumenen lasterketa', es: 'Carrera de áreas y volúmenes', ar: 'سباق المساحات والحجوم' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 70101, stage: 'plane-areas', title: { eu: 'Irudi lauak', es: 'Figuras planas', ar: 'الأشكال المستوية' }, description: { eu: 'Arkuak, poligonoak, koroak, sektoreak eta segmentuak.', es: 'Arcos, polígonos, coronas, sectores y segmentos.', ar: 'الأقواس والمضلعات والحلقات والقطاعات والقطع.' } },
            { progressId: 70102, stage: 'solid-areas', title: { eu: 'Gorputzen azalerak', es: 'Áreas de cuerpos', ar: 'مساحات الأجسام' }, description: { eu: 'Piramideak, konoak, esfera-erdiak eta zona esferikoak.', es: 'Pirámides, conos, semiesferas y zonas esféricas.', ar: 'الأهرام والمخاريط وأنصاف الكرات والمناطق الكروية.' } },
            { progressId: 70103, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' }, description: { eu: 'Sortzailetik eta apotematik, esferak eta gorputz konposatuak.', es: 'Desde la generatriz y la apotema, esferas y cuerpos compuestos.', ar: 'من الراسم والعامد، والكرات والأجسام المركّبة.' } },
            { progressId: 70104, stage: 'similarity', title: { eu: 'Antzekotasuna', es: 'Semejanza', ar: 'التشابه' }, description: { eu: 'Tales, irudi antzekoak, altuera eta katetoa.', es: 'Tales, figuras semejantes, altura y cateto.', ar: 'طاليس والأشكال المتشابهة والارتفاع والضلع القائم.' } },
            { progressId: 70105, stage: 'ratios', title: { eu: 'Arrazoiak eta eskalak', es: 'Razones y escalas', ar: 'النسب والمقاييس' }, description: { eu: 'k, k² eta k³, enborrak, planoak eta maketak.', es: 'k, k² y k³, troncos, planos y maquetas.', ar: 'k وk² وk³ والجذوع والمخططات والمجسّمات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere emaitzarekin.', es: 'Une cada carta con su resultado.', ar: 'صِل كل بطاقة بنتيجتها.' },
        skills: { eu: 'Altuera, k² eta k³, eta bolumenak π-rekin', es: 'Altura, k² y k³, y volúmenes con π', ar: 'الارتفاع وk² وk³ والحجوم بدلالة π' },
        levels: [
            { progressId: 70201, stage: 'similarity', title: { eu: 'Altueraren teorema', es: 'Teorema de la altura', ar: 'مبرهنة الارتفاع' }, description: { eu: 'm = 4, n = 9 ↔ h = 6', es: 'm = 4, n = 9 ↔ h = 6', ar: 'm = 4, n = 9 ↔ h = 6' } },
            { progressId: 70202, stage: 'ratios', title: { eu: 'k² eta k³', es: 'k² y k³', ar: 'k² وk³' }, description: { eu: 'k = 3, V₂ : V₁ ↔ 27', es: 'k = 3, V₂ : V₁ ↔ 27', ar: 'k = 3, V₂ : V₁ ↔ 27' } },
            { progressId: 70203, stage: 'volumes', title: { eu: 'Bolumenak π-rekin', es: 'Volúmenes con π', ar: 'الحجوم بدلالة π' }, description: { eu: 'π · 3² · 4 : 3 ↔ 12π', es: 'π · 3² · 4 : 3 ↔ 12π', ar: 'π · 3² · 4 : 3 ↔ 12π' } }
        ]
    }
]

export const areasSimilarityGameProgressIds: number[] = levelProgressIds(areasSimilarityGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const areasSimilarityGameSlugs: Record<AreasSimilarityGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function areasSimilarityGameModeForPath(pathname: string): AreasSimilarityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
