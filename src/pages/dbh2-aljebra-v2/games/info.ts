import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Aljebra (2. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star. Three games
   belong to this topic (the quick expansion, the pyramid of monomials and
   the algebra detective); the race and the memory are shared engines.
   ========================================================================== */

export type AlgebraGameId = 'race' | 'expand' | 'pyramid' | 'detective' | 'memory'

export const ALGEBRA_GAME_RECORDS_KEY = 'matella-aljebra-dbh2-game-records'

export const algebraGames: GameInfo<AlgebraGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aljebraren lasterketa', es: 'Carrera de álgebra', en: 'Algebra race', ar: 'سباق الجبر' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 27101, stage: 'language', title: { eu: 'Balioak eta segidak', es: 'Valores y series', en: 'Values and sequences', ar: 'القيم والمتتاليات' }, description: { eu: 'Zenbakizko balioa eta gai orokorra.', es: 'Valor numérico y término general.', en: 'Numerical value and nth term.', ar: 'القيمة العددية والحد العام.' } },
            { progressId: 27102, stage: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' }, description: { eu: 'Batu, biderkatu eta zatitu.', es: 'Sumar, multiplicar y dividir.', en: 'Add, multiply and divide.', ar: 'الجمع والضرب والقسمة.' } },
            { progressId: 27103, stage: 'polynomials', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' }, description: { eu: 'Kenketa eta biderketak.', es: 'Resta y productos.', en: 'Subtraction and multiplication.', ar: 'الطرح والضرب.' } },
            { progressId: 27104, stage: 'products', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', en: 'Special products', ar: 'المتطابقات الشهيرة' }, description: { eu: 'Karratuak eta batura bider kendura.', es: 'Cuadrados y suma por diferencia.', en: 'Squares and sum times difference.', ar: 'المربعات ومجموع في فرق.' } },
            { progressId: 27105, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorisation', ar: 'التحليل' }, description: { eu: 'Faktore komuna eta karratuak.', es: 'Factor común y cuadrados.', en: 'Common factor and squares.', ar: 'العامل المشترك والمربعات.' } }
        ]
    },
    {
        id: 'expand',
        title: { eu: 'Garapen azkarra', es: 'Desarrollo rápido', en: 'Quick expansion', ar: 'النشر السريع' },
        tagline: { eu: 'Biderkadura bat ikusi eta idatzi x-ren koefizientea edo gai askea, garapen osoa idatzi gabe.', es: 'Mira un producto y escribe el coeficiente de x o el término independiente, sin escribir todo el desarrollo.', en: 'Look at a product and write the coefficient of x or the constant term, without writing out the whole expansion.', ar: 'انظر إلى جداء واكتب معامل x أو الحد الثابت دون كتابة النشر كاملًا.' },
        skills: { eu: 'Biderketak eta biderkadura nabarmenak buruz', es: 'Productos y productos notables de cabeza', en: 'Products and special products in your head', ar: 'الجداءات والمتطابقات ذهنيًا' },
        levels: [
            { progressId: 27201, stage: 'polynomials', title: { eu: '(x + a)(x + b)', es: '(x + a)(x + b)', en: '(x + a)(x + b)', ar: '(x + a)(x + b)' }, description: { eu: 'Batu eta biderkatu a eta b.', es: 'Suma y multiplica a y b.', en: 'Add and multiply a and b.', ar: 'اجمع a وb واضربهما.' } },
            { progressId: 27202, stage: 'products', title: { eu: 'Karratuak eta batura bider kendura', es: 'Cuadrados y suma por diferencia', en: 'Squares and sum times difference', ar: 'المربعات ومجموع في فرق' }, description: { eu: '(x ± a)² eta (x + a)(x − a).', es: '(x ± a)² y (x + a)(x − a).', en: '(x ± a)² and (x + a)(x − a).', ar: '(x ± a)² و(x + a)(x − a).' } },
            { progressId: 27203, stage: 'products', title: { eu: 'Denak nahastuta', es: 'Todos mezclados', en: 'All mixed up', ar: 'الكل مختلط' }, description: { eu: 'x-ren koefizienteak ere bai: (3x − 2)².', es: 'También con coeficiente en x: (3x − 2)².', en: 'Also with a coefficient of x: (3x − 2)².', ar: 'ومع معامل لـ x أيضًا: (3x − 2)².' } }
        ]
    },
    {
        id: 'pyramid',
        title: { eu: 'Monomioen piramidea', es: 'La pirámide de monomios', en: 'The monomial pyramid', ar: 'هرم وحيدات الحد' },
        tagline: { eu: 'Adreilu bakoitza azpiko bien batura edo biderkadura da: bete hutsuneak.', es: 'Cada ladrillo es la suma o el producto de los dos de debajo: rellena los huecos.', en: 'Each brick is the sum or the product of the two below it: fill in the gaps.', ar: 'كل لبنة مجموع اللبنتين تحتها أو جداؤهما: املأ الفراغات.' },
        skills: { eu: 'Monomioak batu, biderkatu eta zatitu', es: 'Sumar, multiplicar y dividir monomios', en: 'Adding, multiplying and dividing monomials', ar: 'جمع وحيدات الحد وضربها وقسمتها' },
        levels: [
            { progressId: 27401, stage: 'monomials', title: { eu: 'Batuketen piramidea', es: 'Pirámide de sumas', en: 'Addition pyramid', ar: 'هرم الجمع' }, description: { eu: 'Antzekoak batu eta kendu.', es: 'Sumar y restar semejantes.', en: 'Adding and subtracting like terms.', ar: 'جمع المتشابهة وطرحها.' } },
            { progressId: 27402, stage: 'monomials', title: { eu: 'Biderketen piramidea', es: 'Pirámide de productos', en: 'Multiplication pyramid', ar: 'هرم الضرب' }, description: { eu: 'Koefizienteak biderkatu, berretzaileak batu.', es: 'Coeficientes por coeficientes, exponentes sumados.', en: 'Coefficients multiplied, exponents added.', ar: 'نضرب المعاملات ونجمع الأسس.' } },
            { progressId: 27403, stage: 'monomials', title: { eu: 'Behera ere bai', es: 'También hacia abajo', en: 'Downwards too', ar: 'نحو الأسفل أيضًا' }, description: { eu: 'Monomioak zatitu.', es: 'Dividir monomios.', en: 'Dividing monomials.', ar: 'قسمة وحيدات الحد.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aljebraren detektibea', es: 'Detective de álgebra', en: 'Algebra detective', ar: 'مخبر الجبر' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Aljebrako akats tipikoak', es: 'Errores típicos de álgebra', en: 'Common algebra mistakes', ar: 'الأخطاء الشائعة في الجبر' },
        levels: [
            { progressId: 27501, stage: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' }, description: { eu: 'Antzekoak, berreturak eta zenbakizko balioa.', es: 'Semejantes, potencias y valor numérico.', en: 'Like terms, powers and numerical value.', ar: 'المتشابهة والقوى والقيمة العددية.' } },
            { progressId: 27502, stage: 'polynomials', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' }, description: { eu: 'Parentesiak, biderketak eta zatiketak.', es: 'Paréntesis, productos y cocientes.', en: 'Brackets, products and quotients.', ar: 'الأقواس والجداءات وخوارج القسمة.' } },
            { progressId: 27503, stage: 'factor', title: { eu: 'Nabarmenak eta faktore komuna', es: 'Notables y factor común', en: 'Special products and common factor', ar: 'المتطابقات والعامل المشترك' }, description: { eu: 'Karratuak eta faktore komuna ateratzea.', es: 'Cuadrados y sacar factor común.', en: 'Squares and taking out a common factor.', ar: 'المربعات وإخراج العامل المشترك.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: adierazpen bat eta bere garapena edo faktorizazioa.', es: 'Encuentra las cartas que valen lo mismo: una expresión y su desarrollo o su factorización.', en: 'Find the cards that have the same value: an expression and its expansion or its factorisation.', ar: 'جد البطاقات ذات القيمة نفسها: عبارة ونشرها أو تحليلها.' },
        skills: { eu: 'Monomioak, biderkadura nabarmenak eta faktore komuna', es: 'Monomios, productos notables y factor común', en: 'Monomials, special products and common factor', ar: 'وحيدات الحد والمتطابقات والعامل المشترك' },
        levels: [
            { progressId: 27301, stage: 'monomials', title: { eu: 'Monomioen biderketa', es: 'Producto de monomios', en: 'Multiplying monomials', ar: 'ضرب وحيدات الحد' }, description: { eu: '3x² · 2x³ ↔ 6x⁵', es: '3x² · 2x³ ↔ 6x⁵', en: '3x² · 2x³ ↔ 6x⁵', ar: '3x² · 2x³ ↔ 6x⁵' } },
            { progressId: 27302, stage: 'products', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', en: 'Special products', ar: 'المتطابقات الشهيرة' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', en: '(x + 3)² ↔ x² + 6x + 9', ar: '(x + 3)² ↔ x² + 6x + 9' } },
            { progressId: 27303, stage: 'factor', title: { eu: 'Faktore komuna', es: 'Factor común', en: 'Common factor', ar: 'العامل المشترك' }, description: { eu: '4x² + 8x ↔ 4x(x + 2)', es: '4x² + 8x ↔ 4x(x + 2)', en: '4x² + 8x ↔ 4x(x + 2)', ar: '4x² + 8x ↔ 4x(x + 2)' } }
        ]
    }
]

export const algebraGameProgressIds: number[] = levelProgressIds(algebraGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const algebraGameSlugs: Record<AlgebraGameId, string> = { race: 'lasterketa', expand: 'garapena', pyramid: 'piramidea', detective: 'detektibea', memory: 'memoria' }

export function algebraGameModeForPath(pathname: string): AlgebraGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['desarrollo', 'garapena'].includes(game)) return 'expand'
    if (['piramidea', 'piramide'].includes(game)) return 'pyramid'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
