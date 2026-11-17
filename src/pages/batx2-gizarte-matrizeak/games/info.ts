import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { matrizeakGames } from '../../batx2-zientziak-matrizeak/games/info.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (which product computes it, the
   hidden receipt and the matrix detective), «Solve for X» of the Ciencias
   twin with ids of this unit, the race and the memory. Block of ids:
   141401–141899.
   ========================================================================== */

export type GizarteMatrizeakGameId = 'race' | 'which-product' | 'hidden-ticket' | 'solve-x' | 'detective' | 'memory'

export const GIZARTE_MATRIZEAK_GAME_RECORDS_KEY = 'matella-matrizeak-batx2g-game-records'

const twin = (id: 'race' | 'solve-x') => matrizeakGames.find((game) => game.id === id)!
const renumber = (game: GameInfo<string>, first: number) => game.levels.map((level, index) => ({ ...level, progressId: first + index }))

/** What each circuit asks here: no combinations nor commuting matrices, and tables, receipts and systems of this unit */
const RACE_DESCRIPTIONS: Array<GameInfo['levels'][number]['description'] | undefined> = [
    { eu: 'Taulak, elementuak eta simetria.', es: 'Tablas, elementos y simetría.', en: 'Tables, entries and symmetry.', ar: 'الجداول والعناصر والتماثل.' },
    { eu: 'kA + B, errenkada bider zutabe, tiketak eta eskaerak.', es: 'kA + B, fila por columna, tickets y pedidos.', en: 'kA + B, row by column, receipts and orders.', ar: 'kA + B وصفّ في عمود والفواتير والطلبات.' },
    { eu: 'Heina eta m kritikoa.', es: 'Rango y m crítico.', en: 'Rank and critical m.', ar: 'الرتبة وm الحرج.' },
    undefined,
    { eu: 'AX = B, X eta Y, eta sistemak forma matrizialean.', es: 'AX = B, X e Y, y sistemas en forma matricial.', en: 'AX = B, X and Y, and systems in matrix form.', ar: 'AX = B وX وY والأنظمة في الشكل المصفوفي.' }
]

export const gizarteMatrizeakGames: GameInfo<GizarteMatrizeakGameId>[] = [
    {
        ...twin('race'),
        id: 'race',
        levels: renumber(twin('race'), 141401).map((level, index) => ({ ...level, description: RACE_DESCRIPTIONS[index] ?? level.description }))
    },
    {
        id: 'which-product',
        title: { eu: 'Zein biderkadurak kalkulatzen du?', es: '¿Qué producto lo calcula?', en: 'Which product works it out?', ar: 'أي جداء يحسبه؟' },
        tagline: { eu: 'Istorio batek matrize batzuk izendatzen ditu eta zerbait galdetzen du: aukeratu hori kalkulatzen duen adierazpen bakarra.', es: 'Una historia nombra unas matrices y pregunta algo: elige la única expresión que lo calcula.', en: 'A story names some matrices and asks something: choose the only expression that works it out.', ar: 'قصة تسمّي مصفوفات وتسأل عن شيء: اختر العبارة الوحيدة التي تحسبه.' },
        skills: { eu: 'Ordena, iraulia eta matrizeen esanahia', es: 'El orden, la traspuesta y qué significa cada matriz', en: 'The order, the transpose and what each matrix means', ar: 'الترتيب والمنقول ومعنى كل مصفوفة' },
        levels: [
            { progressId: 141501, stage: 'operations', title: { eu: 'Kopuruak eta prezioak', es: 'Cantidades y precios', en: 'Quantities and prices', ar: 'الكميات والأسعار' }, description: { eu: 'QV, NW, PQ', es: 'QV, NW, PQ', en: 'QV, NW, PQ', ar: 'QV وNW وPQ' } },
            { progressId: 141502, stage: 'operations', title: { eu: 'Irabaziak eta kateak', es: 'Beneficios y cadenas', en: 'Profit and chains', ar: 'الأرباح والسلاسل' }, description: { eu: 'Q(V − C), AB, ABP', es: 'Q(V − C), AB, ABP', en: 'Q(V − C), AB, ABP', ar: 'Q(V − C) وAB وABP' } },
            { progressId: 141503, stage: 'basics', title: { eu: 'Alderantziz emandako datuak', es: 'Datos al revés', en: 'Data the other way round', ar: 'معطيات بالعكس' }, description: { eu: 'QᵗV, VᵗQ, ABᵗ', es: 'QᵗV, VᵗQ, ABᵗ', en: 'QᵗV, VᵗQ, ABᵗ', ar: 'QᵗV وVᵗQ وABᵗ' } }
        ]
    },
    {
        id: 'hidden-ticket',
        title: { eu: 'Tiket ezkutua', es: 'El ticket escondido', en: 'The hidden receipt', ar: 'الفاتورة المخفية' },
        tagline: { eu: 'Bi dendaren tiketa: guztizkoak ikusten dira, baina zenbaki bat estalita dago. Errenkada batek ematen dizu.', es: 'El ticket de dos tiendas: se ven los totales, pero hay un número tapado. Una fila te lo da.', en: 'The receipt of two shops: the totals can be seen, but one number is covered. One row gives it to you.', ar: 'فاتورة متجرين: المجاميع ظاهرة لكن عددًا مغطى. صفّ واحد يعطيك إياه.' },
        skills: { eu: 'Errenkada bider zutabe, alderantziz', es: 'Fila por columna, al revés', en: 'Row by column, backwards', ar: 'صفّ في عمود بالعكس' },
        levels: [
            { progressId: 141601, stage: 'operations', title: { eu: 'Prezio bat', es: 'Un precio', en: 'A price', ar: 'سعر' }, description: { eu: 'Bi produktu', es: 'Dos productos', en: 'Two products', ar: 'منتجان' } },
            { progressId: 141602, stage: 'operations', title: { eu: 'Kopuru bat', es: 'Una cantidad', en: 'A quantity', ar: 'كمية' }, description: { eu: 'Hiru produktu', es: 'Tres productos', en: 'Three products', ar: 'ثلاثة منتجات' } },
            { progressId: 141603, stage: 'operations', title: { eu: 'Kostu bat', es: 'Un coste', en: 'A cost', ar: 'كلفة' }, description: { eu: 'Q(V − C)', es: 'Q(V − C)', en: 'Q(V − C)', ar: 'Q(V − C)' } }
        ]
    },
    { ...twin('solve-x'), id: 'solve-x', levels: renumber(twin('solve-x'), 141701) },
    {
        id: 'detective',
        title: { eu: 'Matrizeen detektibea', es: 'Detective de matrices', en: 'Matrix detective', ar: 'مخبر المصفوفات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 141801, stage: 'operations', title: { eu: 'Taulak eta prezioak', es: 'Tablas y precios', en: 'Tables and prices', ar: 'الجداول والأسعار' }, description: { eu: 'aᵢⱼ, laukiz lauki, QV − C', es: 'aᵢⱼ, casilla a casilla, QV − C', en: 'aᵢⱼ, cell by cell, QV − C', ar: 'aᵢⱼ وخانةً خانة وQV − C' } },
            { progressId: 141802, stage: 'operations', title: { eu: 'Kateak eta eragiketak', es: 'Cadenas y operaciones', en: 'Chains and operations', ar: 'السلاسل والعمليات' }, description: { eu: 'BA, 2Q, Qᵗ', es: 'BA, 2Q, Qᵗ', en: 'BA, 2Q, Qᵗ', ar: 'BA و2Q وQᵗ' } },
            { progressId: 141803, stage: 'equations', title: { eu: 'Forma matriziala', es: 'Forma matricial', en: 'Matrix form', ar: 'الشكل المصفوفي' }, description: { eu: 'Koefizienteak, aldea, A + 1', es: 'Coeficientes, el lado, A + 1', en: 'Coefficients, the side, A + 1', ar: 'المعاملات والجهة وA + 1' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: kopuruak bider prezioak eta guztizkoa, taula bat eta haren iraulia, edo sistema bat eta haren koefiziente-matrizea.', es: 'Encuentra las parejas: cantidades por precios y el total, una tabla y su traspuesta, o un sistema y su matriz de coeficientes.', en: 'Find the pairs: quantities times prices and the total, a table and its transpose, or a system and its coefficient matrix.', ar: 'جد الأزواج: الكميات في الأسعار والمجموع، أو جدول ومنقوله، أو نظام ومصفوفة معاملاته.' },
        skills: { eu: 'Biderkadura, iraulia eta forma matriziala', es: 'Producto, traspuesta y forma matricial', en: 'Product, transpose and matrix form', ar: 'الضرب والمنقول والشكل المصفوفي' },
        levels: [
            { progressId: 141851, stage: 'operations', title: { eu: 'Tiketa', es: 'El ticket', en: 'The receipt', ar: 'الفاتورة' }, description: { eu: '(q₁ q₂)(p₁ / p₂) ↔ guztizkoa', es: '(q₁ q₂)(p₁ / p₂) ↔ total', en: '(q₁ q₂)(p₁ / p₂) ↔ total', ar: '(q₁ q₂)(p₁ / p₂) ↔ المجموع' } },
            { progressId: 141852, stage: 'basics', title: { eu: 'Iraulia', es: 'Traspuesta', en: 'Transpose', ar: 'المنقول' }, description: { eu: 'Q ↔ Qᵗ', es: 'Q ↔ Qᵗ', en: 'Q ↔ Qᵗ', ar: 'Q ↔ Qᵗ' } },
            { progressId: 141853, stage: 'equations', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Sistema ↔ A', es: 'Sistema ↔ A', en: 'System ↔ A', ar: 'النظام ↔ A' } }
        ]
    }
]

export const gizarteMatrizeakGameProgressIds: number[] = levelProgressIds(gizarteMatrizeakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizarteMatrizeakGameSlugs: Record<GizarteMatrizeakGameId, string> = { race: 'lasterketa', 'which-product': 'zein-biderkadura', 'hidden-ticket': 'tiket-ezkutua', 'solve-x': 'askatu-x', detective: 'detektibea', memory: 'memoria' }

export function gizarteMatrizeakGameModeForPath(pathname: string): GizarteMatrizeakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zein-biderkadura', 'que-producto'].includes(game)) return 'which-product'
    if (['tiket-ezkutua', 'ticket-escondido'].includes(game)) return 'hidden-ticket'
    if (['askatu-x', 'despeja-la-x'].includes(game)) return 'solve-x'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
