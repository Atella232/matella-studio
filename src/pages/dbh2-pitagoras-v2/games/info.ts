import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Pitagorasen teorema (2. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type PythagorasGameId = 'race' | 'memory'

export const PYTHAGORAS_GAME_RECORDS_KEY = 'matella-pitagoras-dbh2-game-records'

export const pythagorasGames: GameInfo<PythagorasGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Pitagorasen lasterketa', es: 'Carrera de Pitágoras', en: 'Pythagoras race', ar: 'سباق فيثاغورس' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 24101, stage: 'theorem', title: { eu: 'Teorema', es: 'El teorema', en: 'The theorem', ar: 'النظرية' }, description: { eu: 'Karratuak eta hirukoteak.', es: 'Cuadrados y ternas.', en: 'Squares and Pythagorean triples.', ar: 'المربعات والثلاثيات.' } },
            { progressId: 24102, stage: 'sides', title: { eu: 'Aldeak', es: 'Lados', en: 'Sides', ar: 'الأضلاع' }, description: { eu: 'Hipotenusa eta katetoak.', es: 'Hipotenusa y catetos.', en: 'Hypotenuse and legs.', ar: 'الوتر والضلعان القائمان.' } },
            { progressId: 24103, stage: 'plane', title: { eu: 'Irudi lauak', es: 'Figuras planas', en: 'Flat shapes', ar: 'الأشكال المستوية' }, description: { eu: 'Altuerak, diagonalak eta erronboak.', es: 'Alturas, diagonales y rombos.', en: 'Heights, diagonals and rhombuses.', ar: 'الارتفاعات والأقطار والمعيّنات.' } },
            { progressId: 24104, stage: 'circle', title: { eu: 'Zirkunferentzia', es: 'Circunferencia', en: 'Circumference', ar: 'الدائرة' }, description: { eu: 'Kordak eta ukitzaileak.', es: 'Cuerdas y tangentes.', en: 'Chords and tangents.', ar: 'الأوتار والمماسات.' } },
            { progressId: 24105, stage: 'space', title: { eu: 'Espazioa eta problemak', es: 'Espacio y problemas', en: 'Space and problems', ar: 'الفضاء والمسائل' }, description: { eu: 'Kaxak, sarea eta eskailerak.', es: 'Cajas, cuadrícula y escaleras.', en: 'Boxes, grids and ladders.', ar: 'الصناديق والشبكة والسلالم.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Erroak, hipotenusak eta katetoak', es: 'Raíces, hipotenusas y catetos', en: 'Square roots, hypotenuses and legs', ar: 'الجذور والأوتار والأضلاع القائمة' },
        levels: [
            { progressId: 24201, stage: 'theorem', title: { eu: 'Erro karratuak', es: 'Raíces cuadradas', en: 'Square roots', ar: 'الجذور التربيعية' }, description: { eu: '√169 ↔ 13', es: '√169 ↔ 13', en: '√169 ↔ 13', ar: '√169 ↔ 13' } },
            { progressId: 24202, stage: 'sides', title: { eu: 'Hipotenusa', es: 'Hipotenusa', en: 'Hypotenuse', ar: 'الوتر' }, description: { eu: '√(6² + 8²) ↔ 10', es: '√(6² + 8²) ↔ 10', en: '√(6² + 8²) ↔ 10', ar: '√(6² + 8²) ↔ 10' } },
            { progressId: 24203, stage: 'sides', title: { eu: 'Katetoa', es: 'Cateto', en: 'Leg', ar: 'الضلع القائم' }, description: { eu: '√(13² − 5²) ↔ 12', es: '√(13² − 5²) ↔ 12', en: '√(13² − 5²) ↔ 12', ar: '√(13² − 5²) ↔ 12' } }
        ]
    }
]

export const pythagorasGameProgressIds: number[] = levelProgressIds(pythagorasGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const pythagorasGameSlugs: Record<PythagorasGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function pythagorasGameModeForPath(pathname: string): PythagorasGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
