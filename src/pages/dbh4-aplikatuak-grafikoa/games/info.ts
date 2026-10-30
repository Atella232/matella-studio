import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio baten grafikoa (4. DBH aplikatuak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type GraphsGameId = 'race' | 'memory'

export const GRAPHS_GAME_RECORDS_KEY = 'matella-grafikoa-dbh4ap-game-records'

export const graphsGames: GameInfo<GraphsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Grafikoen lasterketa', es: 'Carrera de gráficas', en: 'Graph race', ar: 'سباق البيانات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 58101, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Straight lines', ar: 'المستقيمات' }, description: { eu: 'Maldak, ebakidurak eta ereduak.', es: 'Pendientes, cortes y modelos.', en: 'Slopes, intercepts and models.', ar: 'الميول والتقاطعات والنماذج.' } },
            { progressId: 58102, stage: 'lines', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Bi puntu, n eta ebaki-puntuak.', es: 'Dos puntos, n y puntos de corte.', en: 'Two points, n and intercepts.', ar: 'نقطتان وn ونقاط التقاطع.' } },
            { progressId: 58103, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Balioak, erpinak eta erroak.', es: 'Valores, vértices y raíces.', en: 'Values, vertices and roots.', ar: 'القيم والرؤوس والجذور.' } },
            { progressId: 58104, stage: 'inverse', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'k, asintotak eta erroak.', es: 'k, asíntotas y raíces.', en: 'k, asymptotes and square roots.', ar: 'k والمقاربات والجذور.' } },
            { progressId: 58105, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Berreturak, hazkundea eta azalera handiena.', es: 'Potencias, crecimiento y área máxima.', en: 'Powers, growth and maximum area.', ar: 'القوى والنمو والمساحة العظمى.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere emaitzarekin.', es: 'Une cada expresión con su resultado.', en: 'Match each expression with its result.', ar: 'صِل كل عبارة بنتيجتها.' },
        skills: { eu: 'Maldak, erpinak eta berreturak', es: 'Pendientes, vértices y potencias', en: 'Slopes, vertices and powers', ar: 'الميول والرؤوس والقوى' },
        levels: [
            { progressId: 58201, stage: 'lines', title: { eu: 'Maldak', es: 'Pendientes', en: 'Slopes', ar: 'الميول' }, description: { eu: '(1, 2) (3, 8) ↔ m = 3', es: '(1, 2) (3, 8) ↔ m = 3', en: '(1, 2) (3, 8) ↔ m = 3', ar: '(1, 2) (3, 8) ↔ m = 3' } },
            { progressId: 58202, stage: 'quadratic', title: { eu: 'Erpinak', es: 'Vértices', en: 'Vertices', ar: 'الرؤوس' }, description: { eu: 'x² − 4x + 3 ↔ V(2, −1)', es: 'x² − 4x + 3 ↔ V(2, −1)', en: 'x² − 4x + 3 ↔ V(2, −1)', ar: 'x² − 4x + 3 ↔ V(2, −1)' } },
            { progressId: 58203, stage: 'exponential', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', en: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } }
        ]
    }
]

export const graphsGameProgressIds: number[] = levelProgressIds(graphsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const graphsGameSlugs: Record<GraphsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function graphsGameModeForPath(pathname: string): GraphsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
