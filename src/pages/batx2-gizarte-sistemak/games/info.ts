import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { sistemakGames } from '../../batx2-zientziak-sistemak/games/info.ts'

/* ==========================================================================
   Sistemak (Batxilergoa 2 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (how many solutions the business
   has, translate the sentence and the detective of systems), «Rouché
   express» and «Cramer's columns» of the Ciencias twin with ids of this
   unit, the race and the memory. The homogeneous stage of the twin is
   part of the stage «cramer» here. Block of ids: 143401–143899.
   ========================================================================== */

export type GizarteSistemakGameId = 'race' | 'business' | 'translate' | 'rouche-express' | 'cramer-columns' | 'detective' | 'memory'

export const GIZARTE_SISTEMAK_GAME_RECORDS_KEY = 'matella-sistemak-batx2g-game-records'

type TwinId = 'race' | 'rouche-express' | 'cramer-columns' | 'memory'
const twin = (id: TwinId) => sistemakGames.find((game) => game.id === id)!
const stageHere = (stage: string) => (stage === 'homogeneous' ? 'cramer' : stage)
const renumber = (game: GameInfo<string>, first: number) => game.levels.map((level, index) => ({ ...level, stage: stageHere(level.stage), progressId: first + index }))
const borrowed = <Id extends TwinId>(id: Id, first: number): GameInfo<Id> => ({ ...twin(id), id, levels: renumber(twin(id), first) })

/** The first circuit here has bundles instead of three lines */
const raceLevels = renumber(twin('race'), 143401).map((level, index) => (index === 0
    ? { ...level, description: { eu: 'Heinak, parametroak eta sorten prezioak.', es: 'Rangos, parámetros y el precio de un lote.', en: 'Ranks, parameters and the price of a bundle.', ar: 'الرتب والوسائط وثمن مجموعة.' } }
    : index === 4
        ? { ...level, description: { eu: 'Batura eta kendura, soluzio emana eta inbertsioak.', es: 'Suma y diferencia, una solución dada e inversiones.', en: 'Sum and difference, a given solution and investments.', ar: 'المجموع والفرق وحل معطى والاستثمارات.' } }
        : level))

export const gizarteSistemakGames: GameInfo<GizarteSistemakGameId>[] = [
    { ...twin('race'), id: 'race', levels: raceLevels },
    {
        id: 'business',
        title: { eu: 'Zenbat soluzio ditu negozioak?', es: '¿Cuántas soluciones tiene el negocio?', en: 'How many solutions does the business have?', ar: 'كم حلًّا للتجارة؟' },
        tagline: { eu: 'Sorta batzuen A* matrizea: bat datozen prezioak bat ere ez, bat ala infinitu dira? Azken mailan, aurkitu datuak bat etortzeko prezioa.', es: 'La matriz A* de unos lotes: ¿cuadran ninguno, uno o infinitos juegos de precios? En el último nivel, encuentra el precio que hace cuadrar los datos.', en: 'The matrix A* of some bundles: do none, one or infinitely many sets of prices fit? In the last level, find the price that makes the data fit.', ar: 'المصفوفة A* لمجموعات: هل تتوافق مجموعة أسعار أم لا شيء أم لا نهائية؟ وفي المستوى الأخير جد الثمن الذي يجعل المعطيات تتوافق.' },
        skills: { eu: 'Rouché-Frobenius sortekin', es: 'Rouché-Frobenius con lotes', en: 'Rouché–Frobenius with bundles', ar: 'روشيه-فروبينيوس بالمجموعات' },
        levels: [
            { progressId: 143501, stage: 'rouche', title: { eu: 'Bi produktu', es: 'Dos productos', en: 'Two products', ar: 'منتجان' }, description: { eu: 'Hiru sorta, bi prezio', es: 'Tres lotes, dos precios', en: 'Three bundles, two prices', ar: 'ثلاث مجموعات وسعران' } },
            { progressId: 143502, stage: 'rouche', title: { eu: 'Hiru produktu', es: 'Tres productos', en: 'Three products', ar: 'ثلاثة منتجات' }, description: { eu: 'Hiru sorta, hiru prezio', es: 'Tres lotes, tres precios', en: 'Three bundles, three prices', ar: 'ثلاث مجموعات وثلاثة أسعار' } },
            { progressId: 143503, stage: 'problems', title: { eu: 'Prezio ezkutua', es: 'El precio tapado', en: 'The covered price', ar: 'الثمن المغطى' }, description: { eu: 'Bat datorren prezioa', es: 'El precio que cuadra', en: 'The price that fits', ar: 'الثمن الذي يتوافق' } }
        ]
    },
    {
        id: 'translate',
        title: { eu: 'Itzuli esaldia', es: 'Traduce la frase', en: 'Translate the sentence', ar: 'ترجم الجملة' },
        tagline: { eu: 'Problema baten esaldi bat eta lau ekuazio: bakarrak esaten du esaldiak esaten duena.', es: 'Una frase de un problema y cuatro ecuaciones: solo una dice lo que dice la frase.', en: 'A sentence of a problem and four equations: only one says what the sentence says.', ar: 'جملة من مسألة وأربع معادلات: واحدة فقط تقول ما تقوله الجملة.' },
        skills: { eu: 'Enuntziatutik ekuaziora', es: 'Del enunciado a la ecuación', en: 'From the statement to the equation', ar: 'من النص إلى المعادلة' },
        levels: [
            { progressId: 143601, stage: 'problems', title: { eu: 'Guztira eta bikoitza', es: 'Total y doble', en: 'Total and twice', ar: 'المجموع والضعف' }, description: { eu: 'Guztira, bider k, baino gehiago', es: 'En total, k veces, más que', en: 'In total, k times, more than', ar: 'المجموع وk أضعاف وأكثر من' } },
            { progressId: 143602, stage: 'problems', title: { eu: 'Gutxiago eta erdia', es: 'Menos y mitad', en: 'Less and half', ar: 'أقل ونصف' }, description: { eu: 'Baino gutxiago, erdia, gainditzen du', es: 'Menos que, la mitad, supera', en: 'Less than, half, exceeds', ar: 'أقل من والنصف ويزيد على' } },
            { progressId: 143603, stage: 'problems', title: { eu: 'Arrazoiak eta ehunekoak', es: 'Razones y porcentajes', en: 'Ratios and percentages', ar: 'النسب والنسب المئوية' }, description: { eu: 'Arrazoiak, puntuak, %', es: '2 de cada 3, puntos, %', en: '2 for every 3, points, %', ar: '2 مقابل 3 والنقاط و%' } }
        ]
    },
    borrowed('rouche-express', 143701),
    borrowed('cramer-columns', 143751),
    {
        id: 'detective',
        title: { eu: 'Sistemen detektibea', es: 'Detective de sistemas', en: 'Systems detective', ar: 'مخبر الأنظمة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 143801, stage: 'gauss', title: { eu: 'Gauss', es: 'Gauss', en: 'Gauss', ar: 'غاوس' }, description: { eu: 'Alde bat, azken errenkada, ekuazioak zenbatzea', es: 'Un solo lado, la última fila, contar ecuaciones', en: 'One side only, the last row, counting equations', ar: 'طرف واحد والصف الأخير وعدّ المعادلات' } },
            { progressId: 143802, stage: 'cramer', title: { eu: 'Rouché eta Cramer', es: 'Rouché y Cramer', en: 'Rouché and Cramer', ar: 'روشيه وكرامر' }, description: { eu: 'rg(A*), zutabea, zatiketa', es: 'rg(A*), la columna, la división', en: 'rg(A*), the column, the division', ar: 'rg(A*) والعمود والقسمة' } },
            { progressId: 143803, stage: 'problems', title: { eu: 'Eztabaida eta enuntziatuak', es: 'Discusión y enunciados', en: 'Discussion and statements', ar: 'المناقشة والنصوص' }, description: { eu: 'a − 1, bikoitza, baino gutxiago', es: 'a − 1, el doble, menos que', en: 'a − 1, twice, less than', ar: 'a − 1 والضعف وأقل من' } }
        ]
    },
    borrowed('memory', 143851)
]

export const gizarteSistemakGameProgressIds: number[] = levelProgressIds(gizarteSistemakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizarteSistemakGameSlugs: Record<GizarteSistemakGameId, string> = { race: 'lasterketa', business: 'negozioa', translate: 'itzuli-esaldia', 'rouche-express': 'rouche-espresa', 'cramer-columns': 'cramer-zutabeak', detective: 'detektibea', memory: 'memoria' }

export function gizarteSistemakGameModeForPath(pathname: string): GizarteSistemakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['negozioa', 'el-negocio'].includes(game)) return 'business'
    if (['itzuli-esaldia', 'traduce-la-frase'].includes(game)) return 'translate'
    if (['rouche-espresa', 'rouche-expres'].includes(game)) return 'rouche-express'
    if (['cramer-zutabeak', 'columnas-de-cramer'].includes(game)) return 'cramer-columns'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
