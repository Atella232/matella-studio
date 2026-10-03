import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Irudi lauak (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star.
   ========================================================================== */

export type FiguresGameId = 'race' | 'memory'

export const FIGURES_GAME_RECORDS_KEY = 'matella-figurak-dbh1-game-records'

export const figuresGames: GameInfo<FiguresGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Irudien lasterketa', es: 'Carrera de figuras', ar: 'سباق الأشكال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 18101, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', ar: 'المضلعات' }, description: { eu: 'Diagonalak eta angeluak.', es: 'Diagonales y ángulos.', ar: 'الأقطار والزوايا.' } },
            { progressId: 18102, stage: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', ar: 'المثلثات' }, description: { eu: 'Isoszeleak, aldeak eta zirkunferentzia.', es: 'Isósceles, lados y circunferencia.', ar: 'متساوي الساقين والأضلاع والدائرة.' } },
            { progressId: 18103, stage: 'quadrilaterals', title: { eu: 'Laukiak', es: 'Cuadriláteros', ar: 'الرباعيات' }, description: { eu: 'Angeluak eta simetria-ardatzak.', es: 'Ángulos y ejes de simetría.', ar: 'الزوايا ومحاور التناظر.' } },
            { progressId: 18104, stage: 'circles', title: { eu: 'Zirkunferentziak', es: 'Circunferencias', ar: 'الدوائر' }, description: { eu: 'Ukitzaileak eta angeluak.', es: 'Tangentes y ángulos.', ar: 'التماس والزوايا.' } },
            { progressId: 18105, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', ar: 'المساحات' }, description: { eu: 'Sektoreak, koroak eta L formak.', es: 'Sectores, coronas y figuras en L.', ar: 'القطاعات والحلقات والأشكال L.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Poligonoen angeluak eta diagonalak', es: 'Ángulos y diagonales de polígonos', ar: 'زوايا المضلعات وأقطارها' },
        levels: [
            { progressId: 18201, stage: 'polygons', title: { eu: 'Angeluen batura', es: 'Suma de ángulos', ar: 'مجموع الزوايا' }, description: { eu: '(5 − 2) · 180° ↔ 540°', es: '(5 − 2) · 180° ↔ 540°', ar: '(5 − 2) · 180° ↔ 540°' } },
            { progressId: 18202, stage: 'polygons', title: { eu: 'Angelu zentrala', es: 'Ángulo central', ar: 'الزاوية المركزية' }, description: { eu: '360° : 8 ↔ 45°', es: '360° : 8 ↔ 45°', ar: '360° : 8 ↔ 45°' } },
            { progressId: 18203, stage: 'polygons', title: { eu: 'Diagonalak', es: 'Diagonales', ar: 'الأقطار' }, description: { eu: '6 · 3 : 2 ↔ 9', es: '6 · 3 : 2 ↔ 9', ar: '6 · 3 : 2 ↔ 9' } }
        ]
    }
]

export const figuresGameProgressIds: number[] = levelProgressIds(figuresGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const figuresGameSlugs: Record<FiguresGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function figuresGameModeForPath(pathname: string): FiguresGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
