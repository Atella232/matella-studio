import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Aljebra (2. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type AlgebraGameId = 'race' | 'expand' | 'memory'

export const ALGEBRA_GAME_RECORDS_KEY = 'matella-aljebra-dbh2-game-records'

export const algebraGames: GameInfo<AlgebraGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aljebraren lasterketa', es: 'Carrera de álgebra', ar: 'سباق الجبر' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 27101, stage: 'language', title: { eu: 'Balioak eta segidak', es: 'Valores y series', ar: 'القيم والمتتاليات' }, description: { eu: 'Zenbakizko balioa eta gai orokorra.', es: 'Valor numérico y término general.', ar: 'القيمة العددية والحد العام.' } },
            { progressId: 27102, stage: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', ar: 'وحيدات الحد' }, description: { eu: 'Batu, biderkatu eta zatitu.', es: 'Sumar, multiplicar y dividir.', ar: 'الجمع والضرب والقسمة.' } },
            { progressId: 27103, stage: 'polynomials', title: { eu: 'Polinomioak', es: 'Polinomios', ar: 'الحدوديات' }, description: { eu: 'Kenketa eta biderketak.', es: 'Resta y productos.', ar: 'الطرح والضرب.' } },
            { progressId: 27104, stage: 'products', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', ar: 'المتطابقات الشهيرة' }, description: { eu: 'Karratuak eta batura bider kendura.', es: 'Cuadrados y suma por diferencia.', ar: 'المربعات ومجموع في فرق.' } },
            { progressId: 27105, stage: 'factor', title: { eu: 'Faktorizazioa', es: 'Factorización', ar: 'التحليل' }, description: { eu: 'Faktore komuna eta karratuak.', es: 'Factor común y cuadrados.', ar: 'العامل المشترك والمربعات.' } }
        ]
    },
    {
        id: 'expand',
        title: { eu: 'Garapen azkarra', es: 'Desarrollo rápido', ar: 'النشر السريع' },
        tagline: { eu: 'Biderkadura bat ikusi eta idatzi x-ren koefizientea edo gai askea, garapen osoa idatzi gabe.', es: 'Mira un producto y escribe el coeficiente de x o el término independiente, sin escribir todo el desarrollo.', ar: 'انظر إلى جداء واكتب معامل x أو الحد الثابت دون كتابة النشر كاملًا.' },
        skills: { eu: 'Biderketak eta biderkadura nabarmenak buruz', es: 'Productos y productos notables de cabeza', ar: 'الجداءات والمتطابقات ذهنيًا' },
        levels: [
            { progressId: 27201, stage: 'polynomials', title: { eu: '(x + a)(x + b)', es: '(x + a)(x + b)', ar: '(x + a)(x + b)' }, description: { eu: 'Batu eta biderkatu a eta b.', es: 'Suma y multiplica a y b.', ar: 'اجمع a وb واضربهما.' } },
            { progressId: 27202, stage: 'products', title: { eu: 'Karratuak eta batura bider kendura', es: 'Cuadrados y suma por diferencia', ar: 'المربعات ومجموع في فرق' }, description: { eu: '(x ± a)² eta (x + a)(x − a).', es: '(x ± a)² y (x + a)(x − a).', ar: '(x ± a)² و(x + a)(x − a).' } },
            { progressId: 27203, stage: 'products', title: { eu: 'Denak nahastuta', es: 'Todos mezclados', ar: 'الكل مختلط' }, description: { eu: 'x-ren koefizienteak ere bai: (3x − 2)².', es: 'También con coeficiente en x: (3x − 2)².', ar: 'ومع معامل لـ x أيضًا: (3x − 2)².' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: adierazpen bat eta bere garapena edo faktorizazioa.', es: 'Encuentra las cartas que valen lo mismo: una expresión y su desarrollo o su factorización.', ar: 'جد البطاقات ذات القيمة نفسها: عبارة ونشرها أو تحليلها.' },
        skills: { eu: 'Monomioak, biderkadura nabarmenak eta faktore komuna', es: 'Monomios, productos notables y factor común', ar: 'وحيدات الحد والمتطابقات والعامل المشترك' },
        levels: [
            { progressId: 27301, stage: 'monomials', title: { eu: 'Monomioen biderketa', es: 'Producto de monomios', ar: 'ضرب وحيدات الحد' }, description: { eu: '3x² · 2x³ ↔ 6x⁵', es: '3x² · 2x³ ↔ 6x⁵', ar: '3x² · 2x³ ↔ 6x⁵' } },
            { progressId: 27302, stage: 'products', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', ar: 'المتطابقات الشهيرة' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', ar: '(x + 3)² ↔ x² + 6x + 9' } },
            { progressId: 27303, stage: 'factor', title: { eu: 'Faktore komuna', es: 'Factor común', ar: 'العامل المشترك' }, description: { eu: '4x² + 8x ↔ 4x(x + 2)', es: '4x² + 8x ↔ 4x(x + 2)', ar: '4x² + 8x ↔ 4x(x + 2)' } }
        ]
    }
]

export const algebraGameProgressIds: number[] = levelProgressIds(algebraGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const algebraGameSlugs: Record<AlgebraGameId, string> = { race: 'lasterketa', expand: 'garapena', memory: 'memoria' }

export function algebraGameModeForPath(pathname: string): AlgebraGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['desarrollo', 'garapena'].includes(game)) return 'expand'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
