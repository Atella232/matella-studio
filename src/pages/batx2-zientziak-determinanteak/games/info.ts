import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Determinanteak (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Two games of its own (what happens to the determinant, zero
   without working it out) and the detective of determinants, plus the
   race and the memory. Block of ids: 117401–117899.
   ========================================================================== */

export type DeterminanteakGameId = 'race' | 'what-happens' | 'zero-or-not' | 'detective' | 'memory'

export const DETERMINANTEAK_GAME_RECORDS_KEY = 'matella-determinanteak-batx2z-game-records'

export const determinanteakGames: GameInfo<DeterminanteakGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Determinanteen lasterketa', es: 'Carrera de determinantes', en: 'Determinant race', ar: 'سباق المحددات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 117401, stage: 'orders', title: { eu: '2. eta 3. ordenak', es: 'Orden 2 y 3', en: 'Order 2 and 3', ar: 'الرتبتان 2 و3' }, description: { eu: 'ad − bc, Sarrus eta x ezezaguna.', es: 'ad − bc, Sarrus y la x desconocida.', en: 'ad − bc, Sarrus and the unknown x.', ar: 'ad − bc وساروس وx المجهول.' } },
            { progressId: 117402, stage: 'properties', title: { eu: 'Propietateak', es: 'Propiedades', en: 'Properties', ar: 'الخواص' }, description: { eu: '|kA|, errenkaden eragiketak eta |AB|.', es: '|kA|, operaciones de filas y |AB|.', en: '|kA|, row operations and |AB|.', ar: '|kA| وعمليات الصفوف و|AB|.' } },
            { progressId: 117403, stage: 'expansion', title: { eu: 'Adjuntuak eta garapena', es: 'Adjuntos y desarrollo', en: 'Cofactors and expansion', ar: 'المتممات والنشر' }, description: { eu: 'Adjuntu bat, zero asko dituen lerroa eta 4. ordena.', es: 'Un adjunto, la línea con ceros y el orden 4.', en: 'A cofactor, the line with zeros and order 4.', ar: 'متمم جبري والخط ذو الأصفار والرتبة 4.' } },
            { progressId: 117404, stage: 'rank', title: { eu: 'Heina menoreekin', es: 'Rango con menores', en: 'Rank with minors', ar: 'الرتبة بالمحددات الصغرى' }, description: { eu: 'Heina eta heina jaisten duen parametroa.', es: 'El rango y el parámetro que lo baja.', en: 'The rank and the parameter that lowers it.', ar: 'الرتبة والوسيط الذي يخفضها.' } },
            { progressId: 117405, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', en: 'Inverse', ar: 'المعكوس' }, description: { eu: 'A⁻¹ matrizearen elementu bat, alderantzizkorik gabeko m, eta |X|.', es: 'Un elemento de A⁻¹, la m sin inversa y |X|.', en: 'An entry of A⁻¹, the m with no inverse and |X|.', ar: 'عنصر من A⁻¹ وm دون معكوس و|X|.' } }
        ]
    },
    {
        id: 'what-happens',
        title: { eu: 'Zer gertatzen zaio determinanteari?', es: '¿Qué le pasa al determinante?', en: 'What happens to the determinant?', ar: 'ماذا يحدث للمحدد؟' },
        tagline: { eu: '|A| ezagutzen duzu. Matrizeari zerbait egiten zaio: aukeratu determinante berria, kalkulatu gabe.', es: 'Conoces |A|. A la matriz le hacen algo: elige el nuevo determinante sin calcularlo.', en: 'You know |A|. Something is done to the matrix: choose the new determinant without working it out.', ar: 'تعرف |A|. يُجرى شيء على المصفوفة: اختر المحدد الجديد دون حسابه.' },
        skills: { eu: 'Determinanteen propietateak', es: 'Las propiedades de los determinantes', en: 'The properties of determinants', ar: 'خواص المحددات' },
        levels: [
            { progressId: 117501, stage: 'properties', title: { eu: 'Errenkadak', es: 'Filas', en: 'Rows', ar: 'الصفوف' }, description: { eu: 'Trukatu, biderkatu, batu, irauli', es: 'Cambiar, multiplicar, sumar, trasponer', en: 'Swap, multiply, add, transpose', ar: 'تبديل وضرب وجمع ونقل' } },
            { progressId: 117502, stage: 'properties', title: { eu: 'Matrize osoa', es: 'La matriz entera', en: 'The whole matrix', ar: 'المصفوفة كلها' }, description: { eu: '|kA|, |A⁻¹|, |A²|, |AB|', es: '|kA|, |A⁻¹|, |A²|, |AB|', en: '|kA|, |A⁻¹|, |A²|, |AB|', ar: '|kA| و|A⁻¹| و|A²| و|AB|' } },
            { progressId: 117503, stage: 'properties', title: { eu: 'Letrekin', es: 'Con letras', en: 'With letters', ar: 'بالحروف' }, description: { eu: 'Determinante bat beste batetik', es: 'Un determinante a partir de otro', en: 'One determinant from another', ar: 'محدد انطلاقًا من آخر' } }
        ]
    },
    {
        id: 'zero-or-not',
        title: { eu: 'Zero, kalkulatu gabe?', es: '¿Cero sin calcular?', en: 'Zero without working it out?', ar: 'صفر دون حساب؟' },
        tagline: { eu: 'Begiratu errenkadei: bata bestearen multiploa edo besteen konbinazioa bada, determinantea zero da. Bestela, ez.', es: 'Mira las filas: si una es múltiplo o combinación de las otras, el determinante es cero. Si no, no.', en: 'Look at the rows: if one is a multiple or a combination of the others, the determinant is zero. If not, it is not.', ar: 'انظر إلى الصفوف: إذا كان أحدها مضاعفًا لغيره أو تركيبًا من الصفوف الأخرى فالمحدد صفر، وإلا فلا.' },
        skills: { eu: 'Errenkada berdinak, proportzionalak eta konbinazioak', es: 'Filas iguales, proporcionales y combinaciones', en: 'Equal and proportional rows, and combinations', ar: 'الصفوف المتساوية والمتناسبة والتراكيب' },
        levels: [
            { progressId: 117601, stage: 'orders', title: { eu: 'Multiploak', es: 'Múltiplos', en: 'Multiples', ar: 'المضاعفات' }, description: { eu: 'E₂ = E₁, E₃ = 2E₁', es: 'E₂ = E₁, E₃ = 2E₁', en: 'E₂ = E₁, E₃ = 2E₁', ar: 'E₂ = E₁ وE₃ = 2E₁' } },
            { progressId: 117602, stage: 'orders', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التراكيب' }, description: { eu: 'E₃ = E₁ + E₂', es: 'E₃ = E₁ + E₂', en: 'E₃ = E₁ + E₂', ar: 'E₃ = E₁ + E₂' } },
            { progressId: 117603, stage: 'orders', title: { eu: 'Tranpekin', es: 'Con trampas', en: 'With traps', ar: 'مع فخاخ' }, description: { eu: 'Ia-ia zero', es: 'Casi cero', en: 'Almost zero', ar: 'صفر تقريبًا' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Determinanteen detektibea', es: 'Detective de determinantes', en: 'Determinant detective', ar: 'مخبر المحددات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 117801, stage: 'properties', title: { eu: 'Kalkulua eta propietateak', es: 'Cálculo y propiedades', en: 'Working out and properties', ar: 'الحساب والخواص' }, description: { eu: 'ad + bc, Sarrus, |kA|, |A + B|', es: 'ad + bc, Sarrus, |kA|, |A + B|', en: 'ad + bc, Sarrus, |kA|, |A + B|', ar: 'ad + bc وساروس و|kA| و|A + B|' } },
            { progressId: 117802, stage: 'expansion', title: { eu: 'Adjuntuak eta eragiketak', es: 'Adjuntos y operaciones', en: 'Cofactors and operations', ar: 'المتممات والعمليات' }, description: { eu: 'Zeinua, trukea, 2E₂ − E₁, elementua', es: 'El signo, el cambio, 2E₂ − E₁, el elemento', en: 'The sign, the swap, 2E₂ − E₁, the entry', ar: 'الإشارة والتبديل و2E₂ − E₁ والعنصر' } },
            { progressId: 117803, stage: 'inverse', title: { eu: 'Heina eta alderantzizkoa', es: 'Rango e inversa', en: 'Rank and inverse', ar: 'الرتبة والمعكوس' }, description: { eu: 'Irauli gabe, menore bat, m², |A⁻¹|', es: 'Sin trasponer, un menor, m², |A⁻¹|', en: 'No transpose, one minor, m², |A⁻¹|', ar: 'دون نقل ومحدد أصغر وm² و|A⁻¹|' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: determinante bat eta haren balioa, matrize triangeluar bat eta diagonalaren biderkadura, edo matrize bat eta haren matrize adjuntua.', es: 'Encuentra las parejas: un determinante y su valor, una matriz triangular y el producto de su diagonal, o una matriz y su adjunta.', en: 'Find the pairs: a determinant and its value, a triangular matrix and the product of its diagonal, or a matrix and its adjugate.', ar: 'جد الأزواج: محدد وقيمته، أو مصفوفة مثلثية وحاصل ضرب قطرها، أو مصفوفة ومرافقتها.' },
        skills: { eu: 'Determinantea, triangeluarrak eta adjuntua', es: 'Determinante, triangulares y adjunta', en: 'Determinant, triangular matrices and adjugate', ar: 'المحدد والمثلثية والمرافقة' },
        levels: [
            { progressId: 117851, stage: 'orders', title: { eu: '2. ordena', es: 'Orden 2', en: 'Order 2', ar: 'الرتبة 2' }, description: { eu: '|A| ↔ ad − bc', es: '|A| ↔ ad − bc', en: '|A| ↔ ad − bc', ar: '|A| ↔ ad − bc' } },
            { progressId: 117852, stage: 'properties', title: { eu: 'Triangeluarrak', es: 'Triangulares', en: 'Triangular', ar: 'المثلثية' }, description: { eu: 'Diagonalaren biderkadura', es: 'El producto de la diagonal', en: 'The product of the diagonal', ar: 'حاصل ضرب القطر' } },
            { progressId: 117853, stage: 'inverse', title: { eu: 'Adjuntua', es: 'Adjunta', en: 'Adjugate', ar: 'المرافقة' }, description: { eu: 'A ↔ Adj(A)', es: 'A ↔ Adj(A)', en: 'A ↔ Adj(A)', ar: 'A ↔ Adj(A)' } }
        ]
    }
]

export const determinanteakGameProgressIds: number[] = levelProgressIds(determinanteakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const determinanteakGameSlugs: Record<DeterminanteakGameId, string> = { race: 'lasterketa', 'what-happens': 'zer-gertatzen-zaio', 'zero-or-not': 'zero-kalkulatu-gabe', detective: 'detektibea', memory: 'memoria' }

export function determinanteakGameModeForPath(pathname: string): DeterminanteakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zer-gertatzen-zaio', 'que-le-pasa'].includes(game)) return 'what-happens'
    if (['zero-kalkulatu-gabe', 'cero-sin-calcular'].includes(game)) return 'zero-or-not'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
