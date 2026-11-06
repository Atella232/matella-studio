import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { vectorsGames } from '../../dbh4-akademikoak-bektoreak/games/info.ts'
import type { BachVectorsStageId } from '../lessons.tsx'

/* ==========================================================================
   Bektoreak (Batxilergoa 1 · Zientziak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star. Three games of its own (number or vector?, products in the
   polygon and the detective), the race and the memory, and two games of
   4. DBH kept for the review (the vector jump and find k), with their
   texts and levels but the stages and progress ids of this unit.
   ========================================================================== */

export type BachVectorsGameId = 'race' | 'kind' | 'polygon' | 'detective' | 'memory' | 'jump' | 'lines'

export const BACH_VECTORS_GAME_RECORDS_KEY = 'matella-bektoreak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'jump' | 'lines', stages: BachVectorsStageId[], firstId: number): GameInfo<BachVectorsGameId> {
    const source = vectorsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachVectorsGames: GameInfo<BachVectorsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Bektoreen lasterketa', es: 'Carrera de vectores', en: 'Vector race', ar: 'سباق المتجهات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 105401, stage: 'vectors', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' }, description: { eu: 'Koordenatuak, modulua eta konbinazioak.', es: 'Coordenadas, módulo y combinaciones.', en: 'Coordinates, magnitude and combinations.', ar: 'المركّبات والطول والتركيبات.' } },
            { progressId: 105402, stage: 'bases', title: { eu: 'Oinarriak', es: 'Bases', en: 'Bases', ar: 'الأساسات' }, description: { eu: 'Paraleloak, koefizienteak eta oinarri bateko koordenatuak.', es: 'Paralelos, coeficientes y coordenadas en una base.', en: 'Parallel vectors, coefficients and coordinates in a basis.', ar: 'التوازي والمعاملات والمركّبات في أساس.' } },
            { progressId: 105403, stage: 'dot', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' }, description: { eu: 'Angeluarekin, poligonoetan eta |u + v|².', es: 'Con el ángulo, en polígonos y |u + v|².', en: 'With the angle, in polygons and |u + v|².', ar: 'بالزاوية وفي المضلعات و|u + v|².' } },
            { progressId: 105404, stage: 'analytic', title: { eu: 'Koordenatuekin', es: 'Con coordenadas', en: 'With coordinates', ar: 'بالمركّبات' }, description: { eu: 'u₁v₁ + u₂v₂, perpendikularrak eta angeluak.', es: 'u₁v₁ + u₂v₂, perpendiculares y ángulos.', en: 'u₁v₁ + u₂v₂, perpendiculars and angles.', ar: 'u₁v₁ + u₂v₂ والتعامد والزوايا.' } },
            { progressId: 105405, stage: 'applications', title: { eu: 'Aplikazioak', es: 'Aplicaciones', en: 'Applications', ar: 'التطبيقات' }, description: { eu: 'Proiekzioak, lana eta erresultanteak.', es: 'Proyecciones, trabajo y resultantes.', en: 'Projections, work and resultants.', ar: 'الإسقاطات والشغل والمحصلات.' } }
        ]
    },
    {
        id: 'kind',
        title: { eu: 'Zenbakia ala bektorea?', es: '¿Número o vector?', en: 'Number or vector?', ar: 'عدد أم متجه؟' },
        tagline: { eu: 'Adierazpen bakoitza: zenbaki bat, bektore bat, ala zentzurik gabea? Gero, haren balioa.', es: 'Cada expresión: ¿un número, un vector o no tiene sentido? Después, su valor.', en: 'Each expression: a number, a vector or does it make no sense? Then, its value.', ar: 'كل عبارة: عدد أم متجه أم بلا معنى؟ ثم قيمتها.' },
        skills: { eu: 'Biderkadura eskalarra zenbaki bat da', es: 'El producto escalar es un número', en: 'The dot product is a number', ar: 'الجداء السلمي عدد' },
        levels: [
            { progressId: 105501, stage: 'dot', title: { eu: 'Oinarrizkoak', es: 'Básicas', en: 'Basic', ar: 'أساسية' }, description: { eu: 'u · v, 2u − v, |u| eta u · u.', es: 'u · v, 2u − v, |u| y u · u.', en: 'u · v, 2u − v, |u| and u · u.', ar: 'u · v و2u − v و|u| وu · u.' } },
            { progressId: 105502, stage: 'dot', title: { eu: 'Nahastuak', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: '(u · v) w, u · (v + w) eta |u| v.', es: '(u · v) w, u · (v + w) y |u| v.', en: '(u · v) w, u · (v + w) and |u| v.', ar: '(u · v) w وu · (v + w) و|u| v.' } },
            { progressId: 105503, stage: 'analytic', title: { eu: 'Denak', es: 'Todas', en: 'All of them', ar: 'الكل' }, description: { eu: '(u · v)(v · w) ere bai.', es: 'También (u · v)(v · w).', en: '(u · v)(v · w) too.', ar: 'و(u · v)(v · w) أيضًا.' } }
        ]
    },
    {
        id: 'polygon',
        title: { eu: 'Biderkadurak poligonoan', es: 'Productos en el polígono', en: 'Products in the polygon', ar: 'الجداءات في المضلع' },
        tagline: { eu: 'Karratu, triangelu edo hexagono batean, bi bektore: aukeratu haien biderkadura eskalarra.', es: 'En un cuadrado, un triángulo o un hexágono, dos vectores: elige su producto escalar.', en: 'In a square, a triangle or a hexagon, two vectors: choose their dot product.', ar: 'في مربع أو مثلث أو سداسي متجهان: اختر جداءهما السلمي.' },
        skills: { eu: 'Bi bektoreren angelua, puntu beretik', es: 'El ángulo de dos vectores, desde el mismo punto', en: 'The angle of two vectors, from the same point', ar: 'زاوية متجهين من النقطة نفسها' },
        levels: [
            { progressId: 105601, stage: 'dot', title: { eu: 'Puntu beretik', es: 'Desde el mismo punto', en: 'From the same point', ar: 'من النقطة نفسها' }, description: { eu: 'AB · AC eta OA · OB.', es: 'AB · AC y OA · OB.', en: 'AB · AC and OA · OB.', ar: 'AB · AC وOA · OB.' } },
            { progressId: 105602, stage: 'dot', title: { eu: 'Bata bestearen ondoren', es: 'Uno tras otro', en: 'One after the other', ar: 'واحد بعد الآخر' }, description: { eu: 'AB · BC: lekualdatu bat.', es: 'AB · BC: traslada uno.', en: 'AB · BC: move one.', ar: 'AB · BC: انقل أحدهما.' } },
            { progressId: 105603, stage: 'dot', title: { eu: 'Diagonalak', es: 'Diagonales', en: 'Diagonals', ar: 'الأقطار' }, description: { eu: 'AC · BD, AD · AB eta gehiago.', es: 'AC · BD, AD · AB y más.', en: 'AC · BD, AD · AB and more.', ar: 'AC · BD وAD · AB وغيرها.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Bektoreen detektibea', es: 'Detective de vectores', en: 'Vectors detective', ar: 'مخبر المتجهات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 105701, stage: 'bases', title: { eu: 'Eragiketak eta oinarriak', es: 'Operaciones y bases', en: 'Operations and bases', ar: 'العمليات والأساسات' }, description: { eu: 'AB, bider zenbaki bat, modulua eta oinarriak.', es: 'AB, por un número, módulo y bases.', en: 'AB, times a number, magnitude and bases.', ar: 'AB والضرب في عدد والطول والأساسات.' } },
            { progressId: 105702, stage: 'dot', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' }, description: { eu: 'Bektorea ala zenbakia, 2u · v eta angeluak.', es: 'Vector o número, 2u · v y ángulos.', en: 'Vector or number, 2u · v and angles.', ar: 'متجه أم عدد و2u · v والزوايا.' } },
            { progressId: 105703, stage: 'applications', title: { eu: 'Unitarioak eta proiekzioak', es: 'Unitarios y proyecciones', en: 'Unit vectors and projections', ar: 'متجهات الوحدة والإسقاطات' }, description: { eu: 'Unitarioa, perpendikularra, angelua eta proiekzioa.', es: 'Unitario, perpendicular, ángulo y proyección.', en: 'Unit vector, perpendicular, angle and projection.', ar: 'متجه الوحدة والعمودي والزاوية والإسقاط.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: eragiketa bat eta bere emaitza.', es: 'Encuentra las parejas: una operación y su resultado.', en: 'Find the pairs: an operation and its result.', ar: 'اعثر على الأزواج: عملية ونتيجتها.' },
        skills: { eu: 'Biderkadura eskalarra, modulua eta perpendikularrak', es: 'Producto escalar, módulo y perpendiculares', en: 'Dot product, magnitude and perpendiculars', ar: 'الجداء السلمي والطول والتعامد' },
        levels: [
            { progressId: 105801, stage: 'analytic', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' }, description: { eu: '(2, 3) · (4, −1) ↔ 5', es: '(2, 3) · (4, −1) ↔ 5', en: '(2, 3) · (4, −1) ↔ 5', ar: '(2, 3) · (4, −1) ↔ 5' } },
            { progressId: 105802, stage: 'analytic', title: { eu: 'Modulua', es: 'Módulo', en: 'Magnitude', ar: 'الطول' }, description: { eu: '|(3, 4)| ↔ 5', es: '|(3, 4)| ↔ 5', en: '|(3, 4)| ↔ 5', ar: '|(3, 4)| ↔ 5' } },
            { progressId: 105803, stage: 'analytic', title: { eu: 'Perpendikularrak', es: 'Perpendiculares', en: 'Perpendiculars', ar: 'التعامد' }, description: { eu: '(k, 2) ⟂ (4, 6) ↔ k = −3', es: '(k, 2) ⟂ (4, 6) ↔ k = −3', en: '(k, 2) ⟂ (4, 6) ↔ k = −3', ar: '(k, 2) ⟂ (4, 6) ↔ k = −3' } }
        ]
    },
    reused('jump', ['vectors', 'vectors', 'bases'], 105811),
    reused('lines', ['bases', 'analytic', 'analytic'], 105821)
]

export const bachVectorsGameProgressIds: number[] = levelProgressIds(bachVectorsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachVectorsGameSlugs: Record<BachVectorsGameId, string> = { race: 'lasterketa', kind: 'zenbakia-bektorea', polygon: 'poligonoa', detective: 'detektibea', memory: 'memoria', jump: 'jauzia', lines: 'k-aurkitu' }

export function bachVectorsGameModeForPath(pathname: string): BachVectorsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zenbakia-bektorea', 'numero-vector'].includes(game)) return 'kind'
    if (['poligonoa', 'poligono'].includes(game)) return 'polygon'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['jauzia', 'salto'].includes(game)) return 'jump'
    if (['k-aurkitu', 'encuentra-k'].includes(game)) return 'lines'
    return 'hub'
}
