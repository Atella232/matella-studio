import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Aljebra (1. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type AlgebraGameId = 'race' | 'balance' | 'memory' | 'tiles' | 'detective'

export const ALGEBRA_GAME_RECORDS_KEY = 'matella-aljebra-dbh1-game-records'

export const algebraGames: GameInfo<AlgebraGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aljebraren lasterketa', es: 'Carrera de álgebra', en: 'Algebra race', ar: 'سباق الجبر' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 8101, stage: 'language', title: { eu: 'Hizkuntza eta balioa', es: 'Lenguaje y valor', en: 'Language and value', ar: 'اللغة والقيمة' }, description: { eu: 'Esaldiak itzuli eta balioak kalkulatu.', es: 'Traduce frases y calcula valores.', en: 'Translate phrases and work out values.', ar: 'ترجم الجمل واحسب القيم.' } },
            { progressId: 8102, stage: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' }, description: { eu: 'Maila eta monomio antzekoak.', es: 'Grado y monomios semejantes.', en: 'Degree and like monomials.', ar: 'الدرجة ووحيدات الحد المتشابهة.' } },
            { progressId: 8103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Laburtu eta biderkatu.', es: 'Reduce y multiplica.', en: 'Simplify and multiply.', ar: 'بسّط واضرب.' } },
            { progressId: 8104, stage: 'equations', title: { eu: 'Ekuazio errazak', es: 'Ecuaciones sencillas', en: 'Simple equations', ar: 'معادلات بسيطة' }, description: { eu: 'Urrats bakarra: batu, kendu, biderkatu, zatitu.', es: 'Un solo paso: sumar, restar, multiplicar, dividir.', en: 'One step: add, subtract, multiply, divide.', ar: 'خطوة واحدة: جمع وطرح وضرب وقسمة.' } },
            { progressId: 8105, stage: 'equations', title: { eu: 'Bi urratseko ekuazioak', es: 'Ecuaciones de dos pasos', en: 'Two-step equations', ar: 'معادلات بخطوتين' }, description: { eu: 'ax + b = c eta x bi ataletan.', es: 'ax + b = c y x en los dos miembros.', en: 'ax + b = c, and x on both sides.', ar: 'ax + b = c و x في الطرفين.' } }
        ]
    },
    {
        id: 'balance',
        title: { eu: 'Balantza azkarra', es: 'Balanza rápida', en: 'Quick balance', ar: 'الميزان السريع' },
        tagline: { eu: 'Zortzi ekuazio jarraian: idatzi x ahalik eta azkarren. Akats bakoitzak denbora kentzen du.', es: 'Ocho ecuaciones seguidas: escribe x lo más rápido que puedas. Cada error cuesta tiempo.', en: 'Eight equations in a row: write x as fast as you can. Each mistake costs time.', ar: 'ثماني معادلات متتالية: اكتب x بأسرع ما يمكن. كل خطأ يكلّف وقتًا.' },
        skills: { eu: 'Ekuazioak ebaztea', es: 'Resolver ecuaciones', en: 'Solve equations', ar: 'حل المعادلات' },
        levels: [
            { progressId: 8201, stage: 'equations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', en: 'Add and subtract', ar: 'الجمع والطرح' }, description: { eu: 'x + 5 = 12, x − 3 = 4…', es: 'x + 5 = 12, x − 3 = 4…', en: 'x + 5 = 12, x − 3 = 4…', ar: 'x + 5 = 12، x − 3 = 4…' } },
            { progressId: 8202, stage: 'equations', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', en: 'Multiply and divide', ar: 'الضرب والقسمة' }, description: { eu: '4x = 20, x/3 = 5, 2x + 1 = 9…', es: '4x = 20, x/3 = 5, 2x + 1 = 9…', en: '4x = 20, x/3 = 5, 2x + 1 = 9…', ar: '4x = 20، x/3 = 5، 2x + 1 = 9…' } },
            { progressId: 8203, stage: 'equations', title: { eu: 'x bi ataletan', es: 'x en los dos miembros', en: 'x on both sides', ar: 'x في الطرفين' }, description: { eu: '5x − 4 = 3x + 6 bezalakoak.', es: 'Como 5x − 4 = 3x + 6.', en: 'For example, 5x − 4 = 3x + 6.', ar: 'مثل 5x − 4 = 3x + 6.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: adierazpen bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: una expresión y su resultado.', en: 'Find the cards that are worth the same: an expression and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عبارة وناتجها.' },
        skills: { eu: 'Laburtu, ordeztu eta biderkatu', es: 'Reducir, sustituir y multiplicar', en: 'Simplify, substitute and multiply', ar: 'التبسيط والتعويض والضرب' },
        levels: [
            { progressId: 8301, stage: 'operations', title: { eu: 'Laburtu', es: 'Reducir', en: 'Simplify', ar: 'التبسيط' }, description: { eu: '3x + 2x ↔ 5x', es: '3x + 2x ↔ 5x', en: '3x + 2x ↔ 5x', ar: '3x + 2x ↔ 5x' } },
            { progressId: 8302, stage: 'language', title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', en: 'Numerical value', ar: 'القيمة العددية' }, description: { eu: '2x + 1 (x = 3) ↔ 7', es: '2x + 1 (x = 3) ↔ 7', en: '2x + 1 (x = 3) ↔ 7', ar: '2x + 1 (x = 3) ↔ 7' } },
            { progressId: 8303, stage: 'operations', title: { eu: 'Biderketak', es: 'Productos', en: 'Products', ar: 'الضرب' }, description: { eu: '2x · 3x² ↔ 6x³', es: '2x · 3x² ↔ 6x³', en: '2x · 3x² ↔ 6x³', ar: '2x · 3x² ↔ 6x³' } }
        ]
    },
    {
        id: 'tiles',
        title: { eu: 'Fitxa aljebraikoak', es: 'Fichas algebraicas', en: 'Algebra tiles', ar: 'القطع الجبرية' },
        tagline: { eu: 'Laburtu adierazpena; gero, fitxak motaka eta bikoteak ezabatuta.', es: 'Reduce la expresión; luego, las fichas por tipos y las parejas anuladas.', en: 'Simplify the expression; then the tiles by kind with the pairs cancelled.', ar: 'اختصر العبارة، ثم القطع حسب النوع مع إلغاء الأزواج.' },
        skills: { eu: 'Gai antzekoak', es: 'Términos semejantes', en: 'Like terms', ar: 'الحدود المتشابهة' },
        levels: [
            { progressId: 8401, stage: 'monomials', title: { eu: 'Batuketak', es: 'Sumas', en: 'Additions', ar: 'الجمع' }, description: { eu: 'x-ak eta zenbakiak.', es: 'Las x y los números.', en: 'The x terms and the numbers.', ar: 'الحدود ذات x والأعداد.' } },
            { progressId: 8402, stage: 'operations', title: { eu: 'Kenketak ere bai', es: 'También restas', en: 'Subtractions too', ar: 'والطرح أيضًا' }, description: { eu: 'Fitxa negatiboak.', es: 'Fichas negativas.', en: 'Negative tiles.', ar: 'قطع سالبة.' } },
            { progressId: 8403, stage: 'operations', title: { eu: 'x² ere bai', es: 'También x²', en: 'x² too', ar: 'و x² أيضًا' }, description: { eu: 'Hiru fitxa mota.', es: 'Tres tipos de fichas.', en: 'Three kinds of tiles.', ar: 'ثلاثة أنواع من القطع.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aljebraren detektibea', es: 'Detective de álgebra', en: 'Algebra detective', ar: 'مخبر الجبر' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Aljebran akats tipikoak', es: 'Errores típicos de álgebra', en: 'Common algebra mistakes', ar: 'الأخطاء الشائعة في الجبر' },
        levels: [
            { progressId: 8501, stage: 'language', title: { eu: 'Balioa eta antzekoak', es: 'Valor y semejantes', en: 'Value and like terms', ar: 'القيمة والحدود المتشابهة' }, description: { eu: 'Ordeztu eta laburtu.', es: 'Sustituir y reducir.', en: 'Substituting and simplifying.', ar: 'التعويض والاختصار.' } },
            { progressId: 8502, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Biderkatu, batu eta parentesiak.', es: 'Multiplicar, sumar y paréntesis.', en: 'Multiplying, adding and brackets.', ar: 'الضرب والجمع والأقواس.' } },
            { progressId: 8503, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Gaiak aldez aldatu.', es: 'Transponer términos.', en: 'Moving terms across.', ar: 'نقل الحدود.' } }
        ]
    }
]

export const algebraGameProgressIds: number[] = levelProgressIds(algebraGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const algebraGameSlugs: Record<AlgebraGameId, string> = { race: 'lasterketa', balance: 'balantza', memory: 'memoria', tiles: 'fitxak', detective: 'detektibea' }

export function algebraGameModeForPath(pathname: string): AlgebraGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['balanza', 'balantza'].includes(game)) return 'balance'
    if (['fitxak', 'fichas'].includes(game)) return 'tiles'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
