import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Aljebra (1. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type AlgebraGameId = 'race' | 'balance' | 'memory'

export const ALGEBRA_GAME_RECORDS_KEY = 'matella-aljebra-dbh1-game-records'

export const algebraGames: GameInfo<AlgebraGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aljebraren lasterketa', es: 'Carrera de álgebra', ar: 'سباق الجبر' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 8101, stage: 'language', title: { eu: 'Hizkuntza eta balioa', es: 'Lenguaje y valor', ar: 'اللغة والقيمة' }, description: { eu: 'Esaldiak itzuli eta balioak kalkulatu.', es: 'Traduce frases y calcula valores.', ar: 'ترجم الجمل واحسب القيم.' } },
            { progressId: 8102, stage: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', ar: 'وحيدات الحد' }, description: { eu: 'Maila eta monomio antzekoak.', es: 'Grado y monomios semejantes.', ar: 'الدرجة ووحيدات الحد المتشابهة.' } },
            { progressId: 8103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: 'Laburtu eta biderkatu.', es: 'Reduce y multiplica.', ar: 'بسّط واضرب.' } },
            { progressId: 8104, stage: 'equations', title: { eu: 'Ekuazio errazak', es: 'Ecuaciones sencillas', ar: 'معادلات بسيطة' }, description: { eu: 'Urrats bakarra: batu, kendu, biderkatu, zatitu.', es: 'Un solo paso: sumar, restar, multiplicar, dividir.', ar: 'خطوة واحدة: جمع وطرح وضرب وقسمة.' } },
            { progressId: 8105, stage: 'equations', title: { eu: 'Bi urratseko ekuazioak', es: 'Ecuaciones de dos pasos', ar: 'معادلات بخطوتين' }, description: { eu: 'ax + b = c eta x bi ataletan.', es: 'ax + b = c y x en los dos miembros.', ar: 'ax + b = c و x في الطرفين.' } }
        ]
    },
    {
        id: 'balance',
        title: { eu: 'Balantza azkarra', es: 'Balanza rápida', ar: 'الميزان السريع' },
        tagline: { eu: 'Zortzi ekuazio jarraian: idatzi x ahalik eta azkarren. Akats bakoitzak denbora kentzen du.', es: 'Ocho ecuaciones seguidas: escribe x lo más rápido que puedas. Cada error cuesta tiempo.', ar: 'ثماني معادلات متتالية: اكتب x بأسرع ما يمكن. كل خطأ يكلّف وقتًا.' },
        skills: { eu: 'Ekuazioak ebaztea', es: 'Resolver ecuaciones', ar: 'حل المعادلات' },
        levels: [
            { progressId: 8201, stage: 'equations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', ar: 'الجمع والطرح' }, description: { eu: 'x + 5 = 12, x − 3 = 4…', es: 'x + 5 = 12, x − 3 = 4…', ar: 'x + 5 = 12، x − 3 = 4…' } },
            { progressId: 8202, stage: 'equations', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', ar: 'الضرب والقسمة' }, description: { eu: '4x = 20, x/3 = 5, 2x + 1 = 9…', es: '4x = 20, x/3 = 5, 2x + 1 = 9…', ar: '4x = 20، x/3 = 5، 2x + 1 = 9…' } },
            { progressId: 8203, stage: 'equations', title: { eu: 'x bi ataletan', es: 'x en los dos miembros', ar: 'x في الطرفين' }, description: { eu: '5x − 4 = 3x + 6 bezalakoak.', es: 'Como 5x − 4 = 3x + 6.', ar: 'مثل 5x − 4 = 3x + 6.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: adierazpen bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: una expresión y su resultado.', ar: 'جد البطاقات ذات القيمة نفسها: عبارة وناتجها.' },
        skills: { eu: 'Laburtu, ordeztu eta biderkatu', es: 'Reducir, sustituir y multiplicar', ar: 'التبسيط والتعويض والضرب' },
        levels: [
            { progressId: 8301, stage: 'operations', title: { eu: 'Laburtu', es: 'Reducir', ar: 'التبسيط' }, description: { eu: '3x + 2x ↔ 5x', es: '3x + 2x ↔ 5x', ar: '3x + 2x ↔ 5x' } },
            { progressId: 8302, stage: 'language', title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', ar: 'القيمة العددية' }, description: { eu: '2x + 1 (x = 3) ↔ 7', es: '2x + 1 (x = 3) ↔ 7', ar: '2x + 1 (x = 3) ↔ 7' } },
            { progressId: 8303, stage: 'operations', title: { eu: 'Biderketak', es: 'Productos', ar: 'الضرب' }, description: { eu: '2x · 3x² ↔ 6x³', es: '2x · 3x² ↔ 6x³', ar: '2x · 3x² ↔ 6x³' } }
        ]
    }
]

export const algebraGameProgressIds: number[] = levelProgressIds(algebraGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const algebraGameSlugs: Record<AlgebraGameId, string> = { race: 'lasterketa', balance: 'balantza', memory: 'memoria' }

export function algebraGameModeForPath(pathname: string): AlgebraGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['balanza', 'balantza'].includes(game)) return 'balance'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
