import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polinomioak (3. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star. Four games
   belong to this topic (hunting like terms, completing a special product,
   Ruffini's table one box at a time and the polynomials detective); the
   race and the memory are shared engines.
   ========================================================================== */

export type Polynomials3GameId = 'race' | 'alike' | 'identity' | 'ruffini' | 'detective' | 'memory'

export const POLYNOMIALS3_GAME_RECORDS_KEY = 'matella-polinomioak-dbh3-game-records'

export const polynomials3Games: GameInfo<Polynomials3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Polinomioen lasterketa', es: 'Carrera de polinomios', en: 'Polynomials race', ar: 'سباق كثيرات الحدود' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 92101, stage: 'algebra', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' }, description: { eu: 'Balioa, maila eta biderkadura.', es: 'Valor, grado y producto.', en: 'Value, degree and product.', ar: 'القيمة والدرجة والضرب.' } },
            { progressId: 92102, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Batu, kendu eta biderkatu.', es: 'Sumar, restar y multiplicar.', en: 'Adding, subtracting and multiplying.', ar: 'الجمع والطرح والضرب.' } },
            { progressId: 92103, stage: 'identities', title: { eu: 'Identitateak', es: 'Identidades', en: 'Special products', ar: 'المتطابقات' }, description: { eu: 'Karratuak eta batura bider kendura.', es: 'Cuadrados y suma por diferencia.', en: 'Squares and sum times difference.', ar: 'المربعات ومجموع في فرق.' } },
            { progressId: 92104, stage: 'ruffini', title: { eu: 'Ruffini', es: 'Ruffini', en: 'Ruffini', ar: 'روفيني' }, description: { eu: 'Hondarrak eta erroak.', es: 'Restos y raíces.', en: 'Remainders and roots.', ar: 'البواقي والجذور.' } },
            { progressId: 92105, stage: 'factor', title: { eu: 'Faktorizatu', es: 'Factorizar', en: 'Factorising', ar: 'التحليل' }, description: { eu: 'Faktore komuna eta identitateak.', es: 'Factor común e identidades.', en: 'Common factor and special products.', ar: 'العامل المشترك والمتطابقات.' } }
        ]
    },
    {
        id: 'alike',
        title: { eu: 'Antzekoen ehiza', es: 'La caza de semejantes', en: 'Hunting like terms', ar: 'صيد المتشابهات' },
        tagline: { eu: 'Bederatzi monomiotatik, aurkitu antzeko guztiak.', es: 'Entre nueve monomios, encuentra todos los semejantes.', en: 'Among nine monomials, find every like term.', ar: 'بين تسعة وحيدات حد جد كل المتشابهات.' },
        skills: { eu: 'Monomio antzekoak ezagutzea', es: 'Reconocer monomios semejantes', en: 'Recognising like terms', ar: 'التعرّف على وحيدات الحد المتشابهة' },
        levels: [
            { progressId: 92301, stage: 'algebra', title: { eu: 'Letra bat', es: 'Una letra', en: 'One letter', ar: 'حرف واحد' }, description: { eu: 'x, x², x³…', es: 'x, x², x³…', en: 'x, x², x³…', ar: 'x و \u2066x²\u2069 و \u2066x³\u2069…' } },
            { progressId: 92302, stage: 'algebra', title: { eu: 'Bi letra', es: 'Dos letras', en: 'Two letters', ar: 'حرفان' }, description: { eu: 'x²y ez da xy²', es: 'x²y no es xy²', en: 'x²y is not xy²', ar: '\u2066x²y\u2069 ليس \u2066xy²\u2069' } },
            { progressId: 92303, stage: 'algebra', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Koefiziente bera, berretzaile desberdina.', es: 'Mismo coeficiente, otro exponente.', en: 'The same coefficient, another exponent.', ar: 'المعامل نفسه وأس آخر.' } }
        ]
    },
    {
        id: 'identity',
        title: { eu: 'Osatu identitatea', es: 'Completa la identidad', en: 'Complete the identity', ar: 'أكمل المتطابقة' },
        tagline: { eu: 'Identitate nabarmen batean pieza bat falta da: aukeratu ona.', es: 'A una identidad notable le falta una pieza: elige la buena.', en: 'A special product is missing a piece: choose the right one.', ar: 'تنقص متطابقةً شهيرة قطعة: اختر الصحيحة.' },
        skills: { eu: 'Identitate nabarmenak garatu eta faktorizatu', es: 'Desarrollar y factorizar identidades notables', en: 'Expanding and factorising special products', ar: 'نشر المتطابقات الشهيرة وتحليلها' },
        levels: [
            { progressId: 92401, stage: 'identities', title: { eu: 'Batura karratura', es: 'Suma al cuadrado', en: 'Square of a sum', ar: 'مربع مجموع' }, description: { eu: '(x + a)²', es: '(x + a)²', en: '(x + a)²', ar: '\u2066(x\u00a0+\u00a0a)²\u2069' } },
            { progressId: 92402, stage: 'identities', title: { eu: 'Zeinuak', es: 'Signos', en: 'Signs', ar: 'الإشارات' }, description: { eu: '(x − a)² eta (x + a)(x − a)', es: '(x − a)² y (x + a)(x − a)', en: '(x − a)² and (x + a)(x − a)', ar: '\u2066(x\u00a0−\u00a0a)²\u2069 و\u2066(x\u00a0+\u00a0a)(x\u00a0−\u00a0a)\u2069' } },
            { progressId: 92403, stage: 'factor', title: { eu: 'Alderantziz', es: 'Al revés', en: 'The other way round', ar: 'بالعكس' }, description: { eu: 'Faktorizatu identitateekin.', es: 'Factorizar con identidades.', en: 'Factorising with special products.', ar: 'التحليل بالمتطابقات.' } }
        ]
    },
    {
        id: 'ruffini',
        title: { eu: 'Ruffiniren taula', es: 'La tabla de Ruffini', en: 'Ruffini\'s table', ar: 'جدول روفيني' },
        tagline: { eu: 'Bete taula lauki bakoitza bere aldetik: biderkatu eta batu.', es: 'Rellena la tabla casilla a casilla: multiplica y suma.', en: 'Fill in the table box by box: multiply and add.', ar: 'املأ الجدول خانةً خانة: اضرب واجمع.' },
        skills: { eu: 'Ruffiniren erregela eta hondarra', es: 'La regla de Ruffini y el resto', en: 'Ruffini\'s rule and the remainder', ar: 'قاعدة روفيني والباقي' },
        levels: [
            { progressId: 92501, stage: 'ruffini', title: { eu: '2. maila', es: 'Grado 2', en: 'Degree 2', ar: 'الدرجة 2' }, description: { eu: 'x − a zatitzailea.', es: 'Divisor x − a.', en: 'Divisor x − a.', ar: 'المقسوم عليه \u2066x\u00a0−\u00a0a\u2069.' } },
            { progressId: 92502, stage: 'ruffini', title: { eu: '3. maila', es: 'Grado 3', en: 'Degree 3', ar: 'الدرجة 3' }, description: { eu: 'x + a zatitzailea.', es: 'Divisor x + a.', en: 'Divisor x + a.', ar: 'المقسوم عليه \u2066x\u00a0+\u00a0a\u2069.' } },
            { progressId: 92503, stage: 'ruffini', title: { eu: 'Zeroak', es: 'Con ceros', en: 'With zeros', ar: 'مع أصفار' }, description: { eu: 'Falta diren mailak.', es: 'Grados que faltan.', en: 'Missing degrees.', ar: 'درجات ناقصة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Polinomioen detektibea', es: 'Detective de polinomios', en: 'Polynomials detective', ar: 'مخبر كثيرات الحدود' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Polinomioetako akats tipikoak', es: 'Errores típicos de polinomios', en: 'Common mistakes with polynomials', ar: 'الأخطاء الشائعة في كثيرات الحدود' },
        levels: [
            { progressId: 92601, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Antzekoak, berretzaileak eta zeinuak.', es: 'Semejantes, exponentes y signos.', en: 'Like terms, exponents and signs.', ar: 'المتشابهات والأسس والإشارات.' } },
            { progressId: 92602, stage: 'identities', title: { eu: 'Identitateak', es: 'Identidades', en: 'Special products', ar: 'المتطابقات' }, description: { eu: 'Erdiko gaia eta zeinuak.', es: 'El término del medio y los signos.', en: 'The middle term and the signs.', ar: 'الحد الأوسط والإشارات.' } },
            { progressId: 92603, stage: 'factor', title: { eu: 'Ruffini eta faktorizazioa', es: 'Ruffini y factorización', en: 'Ruffini and factorising', ar: 'روفيني والتحليل' }, description: { eu: 'a zeinua, hondarra eta zatikiak.', es: 'El signo de a, el resto y fracciones.', en: 'The sign of a, the remainder and fractions.', ar: 'إشارة a والباقي والكسور.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere emaitzarekin.', es: 'Une cada expresión con su resultado.', en: 'Match each expression with its result.', ar: 'صِل كل عبارة بنتيجتها.' },
        skills: { eu: 'Monomioak, identitateak eta faktorizazioa buruz', es: 'Monomios, identidades y factorización de cabeza', en: 'Monomials, special products and factorising in your head', ar: 'وحيدات الحد والمتطابقات والتحليل ذهنيًا' },
        levels: [
            { progressId: 92201, stage: 'algebra', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' }, description: { eu: '2x² · 3x ↔ 6x³', es: '2x² · 3x ↔ 6x³', en: '2x² · 3x ↔ 6x³', ar: '\u20662x²\u00a0·\u00a03x\u2069 ↔ \u20666x³\u2069' } },
            { progressId: 92202, stage: 'identities', title: { eu: 'Karratuak', es: 'Cuadrados', en: 'Squares', ar: 'المربعات' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', en: '(x + 3)² ↔ x² + 6x + 9', ar: '\u2066(x\u00a0+\u00a03)²\u2069 ↔ \u2066x²\u00a0+\u00a06x\u00a0+\u00a09\u2069' } },
            { progressId: 92203, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorising', ar: 'التحليل' }, description: { eu: 'x² − 25 ↔ (x + 5)(x − 5)', es: 'x² − 25 ↔ (x + 5)(x − 5)', en: 'x² − 25 ↔ (x + 5)(x − 5)', ar: '\u2066x²\u00a0−\u00a025\u2069 ↔ \u2066(x\u00a0+\u00a05)(x\u00a0−\u00a05)\u2069' } }
        ]
    }
]

export const polynomials3GameProgressIds: number[] = levelProgressIds(polynomials3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomials3GameSlugs: Record<Polynomials3GameId, string> = { race: 'lasterketa', alike: 'antzekoak', identity: 'identitatea', ruffini: 'ruffini', detective: 'detektibea', memory: 'memoria' }

export function polynomials3GameModeForPath(pathname: string): Polynomials3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['antzekoak', 'semejantes'].includes(game)) return 'alike'
    if (['identitatea', 'identidad'].includes(game)) return 'identity'
    if (game === 'ruffini') return 'ruffini'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
