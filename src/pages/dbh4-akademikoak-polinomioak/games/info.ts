import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak (4. DBH akademikoak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type PolynomialsGameId = 'race' | 'memory' | 'hunt' | 'simplify' | 'detective'

export const POLYNOMIALS_GAME_RECORDS_KEY = 'matella-polinomioak-dbh4ak-game-records'

export const polynomialsGames: GameInfo<PolynomialsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Polinomioen lasterketa', es: 'Carrera de polinomios', en: 'Polynomials race', ar: 'سباق الحدوديات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 64101, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Biderkadurak, karratuak, Tartaglia eta P(a).', es: 'Productos, cuadrados, Tartaglia y P(a).', en: 'Products, squares, Tartaglia and P(a).', ar: 'الجداءات والمربعات وتارتاليا وP(a).' } },
            { progressId: 64102, stage: 'division', title: { eu: 'Zatiketa', es: 'División', en: 'Division', ar: 'القسمة' }, description: { eu: 'Hondarra, zatidura, parametroa eta maila.', es: 'Resto, cociente, parámetro y grado.', en: 'Remainder, quotient, parameter and degree.', ar: 'الباقي وخارج القسمة والوسيط والدرجة.' } },
            { progressId: 64103, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorisation', ar: 'التحليل' }, description: { eu: 'Erroak, faktoreak eta m.k.t.-a.', es: 'Raíces, factores y m.c.m.', en: 'Roots, factors and LCM', ar: 'الجذور والعوامل والمضاعف المشترك.' } },
            { progressId: 64104, stage: 'fractions', title: { eu: 'Zatikiak', es: 'Fracciones', en: 'Fractions', ar: 'الكسور' }, description: { eu: 'Balioa, non ez dagoen, sinplifikatu eta baliokideak.', es: 'Valor, dónde no existe, simplificar y equivalentes.', en: 'Value where it is undefined, simplifying and equivalent fractions.', ar: 'القيمة وأين لا يكون معرّفًا والتبسيط والتكافؤ.' } },
            { progressId: 64105, stage: 'operate', title: { eu: 'Eragiketak zatikiekin', es: 'Operaciones con fracciones', en: 'Operations with fractions', ar: 'العمليات على الكسور' }, description: { eu: 'Batu, kendu, biderkatu eta bi txorrota.', es: 'Sumar, restar, multiplicar y dos grifos.', en: 'Add, subtract, multiply and two taps.', ar: 'الجمع والطرح والضرب وصنبوران.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere bikotearekin.', es: 'Une cada expresión con su pareja.', en: 'Match each expression with its pair.', ar: 'صِل كل عبارة بشريكتها.' },
        skills: { eu: 'Identitateak, erroak eta zatikiak', es: 'Identidades, raíces y fracciones', en: 'Identities, roots and fractions', ar: 'المتطابقات والجذور والكسور' },
        levels: [
            { progressId: 64201, stage: 'operations', title: { eu: 'Identitateak', es: 'Identidades', en: 'Identities', ar: 'المتطابقات' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', en: '(x + 3)² ↔ x² + 6x + 9', ar: '(x + 3)² ↔ x² + 6x + 9' } },
            { progressId: 64202, stage: 'factor', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'x² − 5x + 6 ↔ 2, 3', es: 'x² − 5x + 6 ↔ 2, 3', en: 'x² − 5x + 6 ↔ 2, 3', ar: 'x² − 5x + 6 ↔ 2, 3' } },
            { progressId: 64203, stage: 'fractions', title: { eu: 'Sinplifikatu', es: 'Simplificar', en: 'Simplify', ar: 'التبسيط' }, description: { eu: '(x² − 1)/(x + 1) ↔ x − 1', es: '(x² − 1)/(x + 1) ↔ x − 1', en: '(x² − 1)/(x + 1) ↔ x − 1', ar: '(x² − 1)/(x + 1) ↔ x − 1' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Erroen ehiza', es: 'Caza de raíces', en: 'Root hunt', ar: 'صيد الجذور' },
        tagline: { eu: 'Probatu gai askearen zatitzaileak Ruffinirekin polinomioa guztiz faktorizatu arte.', es: 'Prueba los divisores del término independiente con Ruffini hasta factorizar del todo.', en: 'Try the divisors of the constant term with Ruffini until the polynomial is fully factorised.', ar: 'جرّب قواسم الحد الثابت بروفيني حتى يتحلّل كثير الحدود كليًا.' },
        skills: { eu: 'Ruffini eta faktorizazioa', es: 'Ruffini y factorización', en: 'Ruffini and factorising', ar: 'روفيني والتحليل' },
        levels: [
            { progressId: 64301, stage: 'factor', title: { eu: 'Hiru erro', es: 'Tres raíces', en: 'Three roots', ar: 'ثلاثة جذور' }, description: { eu: '3. mailakoa, erro desberdinak.', es: 'Grado 3, raíces distintas.', en: 'Degree 3, different roots.', ar: 'الدرجة 3 بجذور مختلفة.' } },
            { progressId: 64302, stage: 'factor', title: { eu: 'Koefiziente nagusia', es: 'Coeficiente principal', en: 'Leading coefficient', ar: 'المعامل الرئيسي' }, description: { eu: 'Erro errepikatuak eta a ≠ 1.', es: 'Raíces repetidas y a ≠ 1.', en: 'Repeated roots and a ≠ 1.', ar: 'جذور متكررة وa ≠ 1.' } },
            { progressId: 64303, stage: 'factor', title: { eu: 'Lau erro', es: 'Cuatro raíces', en: 'Four roots', ar: 'أربعة جذور' }, description: { eu: '4. mailakoa.', es: 'Grado 4.', en: 'Degree 4.', ar: 'الدرجة 4.' } }
        ]
    },
    {
        id: 'simplify',
        title: { eu: 'Sinplifikatu zatikia', es: 'Simplifica la fracción', en: 'Simplify the fraction', ar: 'اختصر الكسر' },
        tagline: { eu: 'Lau sinplifikazio, bakarra zuzena: faktoreak bai, batugaiak ez.', es: 'Cuatro simplificaciones, solo una buena: factores sí, sumandos no.', en: 'Four simplifications, only one right: factors yes, terms no.', ar: 'أربعة اختصارات صحيح منها واحد: العوامل نعم والحدود لا.' },
        skills: { eu: 'Zatiki aljebraikoak sinplifikatzea', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'اختصار الكسور الجبرية' },
        levels: [
            { progressId: 64401, stage: 'fractions', title: { eu: 'Bi faktore', es: 'Dos factores', en: 'Two factors', ar: 'عاملان' }, description: { eu: '(x − a)(x − b) / (x − a)(x − c)', es: '(x − a)(x − b) / (x − a)(x − c)', en: '(x − a)(x − b) / (x − a)(x − c)', ar: '(x − a)(x − b) / (x − a)(x − c)' } },
            { progressId: 64402, stage: 'fractions', title: { eu: 'Koefizienteekin', es: 'Con coeficientes', en: 'With coefficients', ar: 'مع معاملات' }, description: { eu: 'Izendatzailean a ≠ 1.', es: 'Con a ≠ 1 en el denominador.', en: 'With a ≠ 1 in the denominator.', ar: 'مع a ≠ 1 في المقام.' } },
            { progressId: 64403, stage: 'fractions', title: { eu: 'x faktorea', es: 'El factor x', en: 'The factor x', ar: 'العامل x' }, description: { eu: 'x² − 3x = x(x − 3)', es: 'x² − 3x = x(x − 3)', en: 'x² − 3x = x(x − 3)', ar: 'x² − 3x = x(x − 3)' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Polinomioen detektibea', es: 'Detective de polinomios', en: 'Polynomials detective', ar: 'مخبر كثيرات الحدود' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Polinomioetako akats tipikoak', es: 'Errores típicos con polinomios', en: 'Common mistakes with polynomials', ar: 'الأخطاء الشائعة في كثيرات الحدود' },
        levels: [
            { progressId: 64501, stage: 'division', title: { eu: 'Zatiketa eta hondarra', es: 'División y resto', en: 'Division and remainder', ar: 'القسمة والباقي' }, description: { eu: 'Ruffini eta hondarraren teorema.', es: 'Ruffini y teorema del resto.', en: 'Ruffini and the remainder theorem.', ar: 'روفيني ومبرهنة الباقي.' } },
            { progressId: 64502, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorising', ar: 'التحليل' }, description: { eu: 'Erroak, faktore komuna eta identitateak.', es: 'Raíces, factor común e identidades.', en: 'Roots, common factor and special products.', ar: 'الجذور والعامل المشترك والمتطابقات.' } },
            { progressId: 64503, stage: 'fractions', title: { eu: 'Zatiki aljebraikoak', es: 'Fracciones algebraicas', en: 'Algebraic fractions', ar: 'الكسور الجبرية' }, description: { eu: 'Sinplifikatu, batu eta kendu.', es: 'Simplificar, sumar y restar.', en: 'Simplify, add and subtract.', ar: 'الاختصار والجمع والطرح.' } }
        ]
    }
]

export const polynomialsGameProgressIds: number[] = levelProgressIds(polynomialsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomialsGameSlugs: Record<PolynomialsGameId, string> = { race: 'lasterketa', memory: 'memoria', hunt: 'erroak', simplify: 'sinplifikatu', detective: 'detektibea' }

export function polynomialsGameModeForPath(pathname: string): PolynomialsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['erroak', 'raices'].includes(game)) return 'hunt'
    if (['sinplifikatu', 'simplifica'].includes(game)) return 'simplify'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
