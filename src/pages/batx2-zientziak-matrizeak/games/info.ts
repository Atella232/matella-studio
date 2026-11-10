import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Zientziak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star. Four games of its own (dimension dominoes, solve for X, giant
   power and the matrix detective), the race and the memory. Block of ids:
   116401–116899.
   ========================================================================== */

export type MatrizeakGameId = 'race' | 'dominoes' | 'solve-x' | 'big-power' | 'detective' | 'memory'

export const MATRIZEAK_GAME_RECORDS_KEY = 'matella-matrizeak-batx2z-game-records'

export const matrizeakGames: GameInfo<MatrizeakGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Matrizeen lasterketa', es: 'Carrera de matrices', en: 'Matrix race', ar: 'سباق المصفوفات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 116401, stage: 'basics', title: { eu: 'Matrizeak eta motak', es: 'Matrices y tipos', en: 'Matrices and kinds', ar: 'المصفوفات وأنواعها' }, description: { eu: 'Elementuak, dimentsioak eta simetria.', es: 'Elementos, dimensiones y simetría.', en: 'Entries, sizes and symmetry.', ar: 'العناصر والأبعاد والتماثل.' } },
            { progressId: 116402, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'kA + B, errenkada bider zutabe eta grafoak.', es: 'kA + B, fila por columna y grafos.', en: 'kA + B, row by column and graphs.', ar: 'kA + B وصفّ في عمود والبيانات.' } },
            { progressId: 116403, stage: 'rank', title: { eu: 'Heina', es: 'Rango', en: 'Rank', ar: 'الرتبة' }, description: { eu: 'Heina, m kritikoa eta konbinazioak.', es: 'Rango, m crítico y combinaciones.', en: 'Rank, critical m and combinations.', ar: 'الرتبة وm الحرج والتراكيب.' } },
            { progressId: 116404, stage: 'inverse', title: { eu: 'Alderantzizkoa eta berreturak', es: 'Inversa y potencias', en: 'Inverse and powers', ar: 'المعكوس والقوى' }, description: { eu: 'A⁻¹ matrizearen elementu bat, k singularra eta Aⁿ.', es: 'Un elemento de A⁻¹, k singular y Aⁿ.', en: 'An entry of A⁻¹, a singular k and Aⁿ.', ar: 'عنصر من A⁻¹ وk المنفرد وAⁿ.' } },
            { progressId: 116405, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'AX = B, X eta Y, eta trukatzen direnak.', es: 'AX = B, X e Y, y las que conmutan.', en: 'AX = B, X and Y, and commuting ones.', ar: 'AX = B وX وY والمتبادلة.' } }
        ]
    },
    {
        id: 'dominoes',
        title: { eu: 'Dimentsioen dominoa', es: 'Dominó de dimensiones', en: 'Size dominoes', ar: 'دومينو الأبعاد' },
        tagline: { eu: 'Fitxa bakoitza m × n matrize bat da: aukeratu biderkadura posible egiten duena eta eskatutako dimentsioa ematen duena.', es: 'Cada ficha es una matriz m × n: elige la que hace posible el producto y da la dimensión pedida.', en: 'Each tile is an m × n matrix: choose the one that makes the product possible and gives the size asked for.', ar: 'كل قطعة مصفوفة m × n: اختر التي تجعل الضرب ممكنًا وتعطي الأبعاد المطلوبة.' },
        skills: { eu: 'Noiz biderka daiteke, eta zer ateratzen da', es: 'Cuándo se puede multiplicar y qué sale', en: 'When you can multiply and what comes out', ar: 'متى يمكن الضرب وما الناتج' },
        levels: [
            { progressId: 116501, stage: 'operations', title: { eu: 'Bi fitxa', es: 'Dos fichas', en: 'Two tiles', ar: 'قطعتان' }, description: { eu: 'A · ? = m × p', es: 'A · ? = m × p', en: 'A · ? = m × p', ar: 'A · ? = m × p' } },
            { progressId: 116502, stage: 'operations', title: { eu: 'Hiru fitxa', es: 'Tres fichas', en: 'Three tiles', ar: 'ثلاث قطع' }, description: { eu: 'A · ? · C katea', es: 'La cadena A · ? · C', en: 'The chain A · ? · C', ar: 'السلسلة A · ? · C' } },
            { progressId: 116503, stage: 'operations', title: { eu: 'Irauliekin', es: 'Con traspuestas', en: 'With transposes', ar: 'مع المنقولات' }, description: { eu: 'AᵗB, ABᵗ… edo ezin da', es: 'AᵗB, ABᵗ… o no se puede', en: 'AᵗB, ABᵗ… or it cannot be done', ar: 'AᵗB وABᵗ… أو لا يمكن' } }
        ]
    },
    {
        id: 'solve-x',
        title: { eu: 'Askatu X', es: 'Despeja la X', en: 'Solve for X', ar: 'استخرج X' },
        tagline: { eu: 'Matrize-ekuazio bat eta X askatzeko lau modu: bakarra da zuzena. Kontuz aldearekin!', es: 'Una ecuación matricial y cuatro formas de despejar X: solo una es buena. ¡Cuidado con el lado!', en: 'A matrix equation and four ways to solve for X: only one is right. Mind the side!', ar: 'معادلة مصفوفية وأربع طرق لاستخراج X: واحدة فقط صحيحة. انتبه للجهة!' },
        skills: { eu: 'A⁻¹ alde egokitik eta faktore komuna', es: 'A⁻¹ por el lado correcto y factor común', en: 'A⁻¹ on the right side and common factors', ar: 'A⁻¹ من الجهة الصحيحة والعامل المشترك' },
        levels: [
            { progressId: 116601, stage: 'equations', title: { eu: 'Matrize bat', es: 'Una matriz', en: 'One matrix', ar: 'مصفوفة واحدة' }, description: { eu: 'AX = B, XA = B, AX + B = C', es: 'AX = B, XA = B, AX + B = C', en: 'AX = B, XA = B, AX + B = C', ar: 'AX = B وXA = B وAX + B = C' } },
            { progressId: 116602, stage: 'equations', title: { eu: 'Faktore komuna', es: 'Factor común', en: 'Common factor', ar: 'العامل المشترك' }, description: { eu: 'AX + X = B: (A + I)X', es: 'AX + X = B: (A + I)X', en: 'AX + X = B: (A + I)X', ar: 'AX + X = B: (A + I)X' } },
            { progressId: 116603, stage: 'equations', title: { eu: 'Bi aldeetatik', es: 'Por los dos lados', en: 'On both sides', ar: 'من الجهتين' }, description: { eu: 'AXB = C, AXA = B', es: 'AXB = C, AXA = B', en: 'AXB = C, AXA = B', ar: 'AXB = C وAXA = B' } }
        ]
    },
    {
        id: 'big-power',
        title: { eu: 'Berretura erraldoia', es: 'Potencia gigante', en: 'Giant power', ar: 'القوة العملاقة' },
        tagline: { eu: 'A, A² eta A³ ikusiko dituzu: aurkitu eredua eta aukeratu A²⁰²⁶ edo antzeko berretura erraldoi bat.', es: 'Verás A, A² y A³: encuentra el patrón y elige A²⁰²⁶ u otra potencia gigante.', en: 'You will see A, A² and A³: find the pattern and choose A²⁰²⁶ or another giant power.', ar: 'سترى A وA² وA³: جد النمط واختر A²⁰²⁶ أو قوة عملاقة أخرى.' },
        skills: { eu: 'Errepikatzen diren berreturak eta ereduak', es: 'Potencias que se repiten y patrones', en: 'Powers that repeat and patterns', ar: 'القوى المتكررة والأنماط' },
        levels: [
            { progressId: 116701, stage: 'inverse', title: { eu: 'A² = I', es: 'A² = I', en: 'A² = I', ar: 'A² = I' }, description: { eu: 'Bikoitia ala bakoitia?', es: '¿Par o impar?', en: 'Even or odd?', ar: 'زوجي أم فردي؟' } },
            { progressId: 116702, stage: 'inverse', title: { eu: 'Zikloak', es: 'Ciclos', en: 'Cycles', ar: 'الدورات' }, description: { eu: 'A³ = I edo A⁴ = I: hondarra', es: 'A³ = I o A⁴ = I: el resto', en: 'A³ = I or A⁴ = I: the remainder', ar: 'A³ = I أو A⁴ = I: الباقي' } },
            { progressId: 116703, stage: 'inverse', title: { eu: 'n barruan', es: 'Con n dentro', en: 'With n inside', ar: 'مع n في الداخل' }, description: { eu: '(1 a / 0 1)ⁿ eta antzekoak', es: '(1 a / 0 1)ⁿ y parecidas', en: '(1 a / 0 1)ⁿ and the like', ar: '(1 a / 0 1)ⁿ وما يشبهها' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Matrizeen detektibea', es: 'Detective de matrices', en: 'Matrix detective', ar: 'مخبر المصفوفات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 116801, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Elementuz elementu, AB = BA, kA', es: 'Casilla a casilla, AB = BA, kA', en: 'Entry by entry, AB = BA, kA', ar: 'عنصرًا عنصرًا وAB = BA وkA' } },
            { progressId: 116802, stage: 'inverse', title: { eu: 'Heina eta alderantzizkoa', es: 'Rango e inversa', en: 'Rank and inverse', ar: 'الرتبة والمعكوس' }, description: { eu: 'Errenkadak zenbatu, m − 3, 1/a', es: 'Contar filas, m − 3, 1/a', en: 'Counting rows, m − 3, 1/a', ar: 'عدّ الصفوف وm − 3 و1/a' } },
            { progressId: 116803, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Aldea, A + 1, (AB)⁻¹', es: 'El lado, A + 1, (AB)⁻¹', en: 'The side, A + 1, (AB)⁻¹', ar: 'الجهة وA + 1 و(AB)⁻¹' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: errenkada bat bider zutabe bat eta haren emaitza, matrize bat eta haren iraulia, edo matrize bat eta haren alderantzizkoa.', es: 'Encuentra las parejas: una fila por una columna y su resultado, una matriz y su traspuesta, o una matriz y su inversa.', en: 'Find the pairs: a row times a column and its result, a matrix and its transpose, or a matrix and its inverse.', ar: 'جد الأزواج: صفّ في عمود وناتجه، أو مصفوفة ومنقولها، أو مصفوفة ومعكوسها.' },
        skills: { eu: 'Biderkadura, iraulia eta alderantzizkoa', es: 'Producto, traspuesta e inversa', en: 'Product, transpose and inverse', ar: 'الضرب والمنقول والمعكوس' },
        levels: [
            { progressId: 116851, stage: 'operations', title: { eu: 'Errenkada bider zutabe', es: 'Fila por columna', en: 'Row by column', ar: 'صفّ في عمود' }, description: { eu: '(a b)(c / d) ↔ ac + bd', es: '(a b)(c / d) ↔ ac + bd', en: '(a b)(c / d) ↔ ac + bd', ar: '(a b)(c / d) ↔ ac + bd' } },
            { progressId: 116852, stage: 'basics', title: { eu: 'Iraulia', es: 'Traspuesta', en: 'Transpose', ar: 'المنقول' }, description: { eu: 'A ↔ Aᵗ', es: 'A ↔ Aᵗ', en: 'A ↔ Aᵗ', ar: 'A ↔ Aᵗ' } },
            { progressId: 116853, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', en: 'Inverse', ar: 'المعكوس' }, description: { eu: 'A ↔ A⁻¹', es: 'A ↔ A⁻¹', en: 'A ↔ A⁻¹', ar: 'A ↔ A⁻¹' } }
        ]
    }
]

export const matrizeakGameProgressIds: number[] = levelProgressIds(matrizeakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const matrizeakGameSlugs: Record<MatrizeakGameId, string> = { race: 'lasterketa', dominoes: 'dominoa', 'solve-x': 'askatu-x', 'big-power': 'berretura-erraldoia', detective: 'detektibea', memory: 'memoria' }

export function matrizeakGameModeForPath(pathname: string): MatrizeakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['dominoa', 'domino'].includes(game)) return 'dominoes'
    if (['askatu-x', 'despeja-la-x'].includes(game)) return 'solve-x'
    if (['berretura-erraldoia', 'potencia-gigante'].includes(game)) return 'big-power'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
