import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polinomioak (4. DBH aplikatuak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type PolynomialsGameId = 'race' | 'memory' | 'hunt' | 'divisible' | 'detective'

export const POLYNOMIALS_GAME_RECORDS_KEY = 'matella-polinomioak-dbh4ap-game-records'

export const polynomialsGames: GameInfo<PolynomialsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Polinomioen lasterketa', es: 'Carrera de polinomios', en: 'Polynomials race', ar: 'سباق الحدوديات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 46101, stage: 'monomials', title: { eu: 'Monomioak eta balioak', es: 'Monomios y valores', en: 'Monomials and values', ar: 'وحيدات الحد والقيم' }, description: { eu: 'Zenbakizko balioa eta monomioen eragiketak.', es: 'Valor numérico y operaciones con monomios.', en: 'Numerical value and operations with monomials.', ar: 'القيمة العددية وعمليات وحيدات الحد.' } },
            { progressId: 46102, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Kenketa, biderketak eta identitateak.', es: 'Resta, productos e identidades.', en: 'Subtraction, products and identities.', ar: 'الطرح والضرب والمتطابقات.' } },
            { progressId: 46103, stage: 'division', title: { eu: 'Ruffini', es: 'Ruffini', en: 'Ruffini', ar: 'روفيني' }, description: { eu: 'Hondarra, zatidura eta zatiketa zehatzak.', es: 'Resto, cociente y divisiones exactas.', en: 'Remainder, quotient and exact divisions.', ar: 'الباقي وخارج القسمة والقسمة التامة.' } },
            { progressId: 46104, stage: 'factor', title: { eu: 'Erroak eta faktoreak', es: 'Raíces y factores', en: 'Roots and factors', ar: 'الجذور والعوامل' }, description: { eu: 'Erro osoak eta faktore komuna.', es: 'Raíces enteras y factor común.', en: 'Integer roots and common factor.', ar: 'الجذور الصحيحة والعامل المشترك.' } },
            { progressId: 46105, stage: 'expressions', title: { eu: 'Adierazpenak', es: 'Expresiones', en: 'Expressions', ar: 'العبارات' }, description: { eu: 'Zatiki aljebraikoak, sinplifikatu eta problemak.', es: 'Fracciones algebraicas, simplificar y problemas.', en: 'Algebraic fractions, simplifying and problems.', ar: 'الكسور الجبرية والتبسيط والمسائل.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Identitateak, faktore komuna eta hondarrak', es: 'Identidades, factor común y restos', en: 'Identities, common factor and remainders.', ar: 'المتطابقات والعامل المشترك والبواقي' },
        levels: [
            { progressId: 46201, stage: 'operations', title: { eu: 'Identitate nabarmenak', es: 'Igualdades notables', en: 'Remarkable identities', ar: 'المتطابقات الشهيرة' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', en: '(x + 3)² ↔ x² + 6x + 9', ar: '(x + 3)² ↔ x² + 6x + 9' } },
            { progressId: 46202, stage: 'factor', title: { eu: 'Faktore komuna', es: 'Factor común', en: 'Common factor', ar: 'العامل المشترك' }, description: { eu: '4x² + 8x ↔ 4x(x + 2)', es: '4x² + 8x ↔ 4x(x + 2)', en: '4x² + 8x ↔ 4x(x + 2)', ar: '4x² + 8x ↔ 4x(x + 2)' } },
            { progressId: 46203, stage: 'division', title: { eu: 'Hondarraren teorema', es: 'Teorema del resto', en: 'Remainder theorem', ar: 'مبرهنة الباقي' }, description: { eu: '(x² − 3x + 1) : (x − 2) ↔ R = −1', es: '(x² − 3x + 1) : (x − 2) ↔ R = −1', en: '(x² − 3x + 1) : (x − 2) ↔ R = −1', ar: '(x² − 3x + 1) : (x − 2) ↔ R = −1' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Erroen ehiza', es: 'Caza de raíces', en: 'Root hunt', ar: 'صيد الجذور' },
        tagline: { eu: 'Probatu gai askearen zatitzaileak Ruffinirekin polinomioa guztiz faktorizatu arte.', es: 'Prueba los divisores del término independiente con Ruffini hasta factorizar del todo.', en: 'Try the divisors of the constant term with Ruffini until the polynomial is fully factorised.', ar: 'جرّب قواسم الحد الثابت بروفيني حتى يتحلّل كثير الحدود كليًا.' },
        skills: { eu: 'Ruffini eta faktorizazioa', es: 'Ruffini y factorización', en: 'Ruffini and factorising', ar: 'روفيني والتحليل' },
        levels: [
            { progressId: 46301, stage: 'factor', title: { eu: 'Hiru erro', es: 'Tres raíces', en: 'Three roots', ar: 'ثلاثة جذور' }, description: { eu: '3. mailakoa, erro desberdinak.', es: 'Grado 3, raíces distintas.', en: 'Degree 3, different roots.', ar: 'الدرجة 3 بجذور مختلفة.' } },
            { progressId: 46302, stage: 'factor', title: { eu: 'Koefiziente nagusia', es: 'Coeficiente principal', en: 'Leading coefficient', ar: 'المعامل الرئيسي' }, description: { eu: 'Erro errepikatuak eta a ≠ 1.', es: 'Raíces repetidas y a ≠ 1.', en: 'Repeated roots and a ≠ 1.', ar: 'جذور متكررة وa ≠ 1.' } },
            { progressId: 46303, stage: 'factor', title: { eu: 'Lau erro', es: 'Cuatro raíces', en: 'Four roots', ar: 'أربعة جذور' }, description: { eu: '4. mailakoa.', es: 'Grado 4.', en: 'Degree 4.', ar: 'الدرجة 4.' } }
        ]
    },
    {
        id: 'divisible',
        title: { eu: 'x − a-z zatigarria', es: 'Divisible por x − a', en: 'Divisible by x − a', ar: 'قابل للقسمة على x − a' },
        tagline: { eu: 'Aurkitu k, hondarra 0 izan dadin: hondarraren teorema.', es: 'Halla k para que el resto sea 0: el teorema del resto.', en: 'Find k so that the remainder is 0: the remainder theorem.', ar: 'أوجد k ليكون الباقي 0: مبرهنة الباقي.' },
        skills: { eu: 'Hondarraren teorema', es: 'Teorema del resto', en: 'Remainder theorem', ar: 'مبرهنة الباقي' },
        levels: [
            { progressId: 46401, stage: 'division', title: { eu: 'Gai askea', es: 'Término independiente', en: 'Constant term', ar: 'الحد الثابت' }, description: { eu: 'x² + bx + k', es: 'x² + bx + k', en: 'x² + bx + k', ar: 'x² + bx + k' } },
            { progressId: 46402, stage: 'division', title: { eu: 'x-ren koefizientea', es: 'Coeficiente de x', en: 'Coefficient of x', ar: 'معامل x' }, description: { eu: 'x³ + … + kx + c', es: 'x³ + … + kx + c', en: 'x³ + … + kx + c', ar: 'x³ + … + kx + c' } },
            { progressId: 46403, stage: 'division', title: { eu: 'Edozein lekutan', es: 'En cualquier sitio', en: 'Anywhere', ar: 'في أي موضع' }, description: { eu: 'k edozein koefizientetan.', es: 'k en cualquier coeficiente.', en: 'k in any coefficient.', ar: 'k في أي معامل.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Polinomioen detektibea', es: 'Detective de polinomios', en: 'Polynomials detective', ar: 'مخبر كثيرات الحدود' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Polinomioetako akats tipikoak', es: 'Errores típicos con polinomios', en: 'Common mistakes with polynomials', ar: 'الأخطاء الشائعة في كثيرات الحدود' },
        levels: [
            { progressId: 46501, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Parentesiak, biderketak eta berreturak.', es: 'Paréntesis, productos y potencias.', en: 'Brackets, products and powers.', ar: 'الأقواس والجداءات والقوى.' } },
            { progressId: 46502, stage: 'division', title: { eu: 'Zatiketa eta hondarra', es: 'División y resto', en: 'Division and remainder', ar: 'القسمة والباقي' }, description: { eu: 'Ruffini eta hondarraren teorema.', es: 'Ruffini y teorema del resto.', en: 'Ruffini and the remainder theorem.', ar: 'روفيني ومبرهنة الباقي.' } },
            { progressId: 46503, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorising', ar: 'التحليل' }, description: { eu: 'Erroak, faktore komuna eta identitateak.', es: 'Raíces, factor común e identidades.', en: 'Roots, common factor and special products.', ar: 'الجذور والعامل المشترك والمتطابقات.' } }
        ]
    }
]

export const polynomialsGameProgressIds: number[] = levelProgressIds(polynomialsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomialsGameSlugs: Record<PolynomialsGameId, string> = { race: 'lasterketa', memory: 'memoria', hunt: 'erroak', divisible: 'zatigarria', detective: 'detektibea' }

export function polynomialsGameModeForPath(pathname: string): PolynomialsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['erroak', 'raices'].includes(game)) return 'hunt'
    if (['zatigarria', 'divisible'].includes(game)) return 'divisible'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
