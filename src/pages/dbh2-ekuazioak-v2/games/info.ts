import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak (2. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type EquationsGameId = 'race' | 'solve' | 'memory'

export const EQUATIONS_GAME_RECORDS_KEY = 'matella-ekuazioak-dbh2-game-records'

export const equationsGames: GameInfo<EquationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 29101, stage: 'basics', title: { eu: 'Ekuazio errazak', es: 'Ecuaciones sencillas', ar: 'معادلات بسيطة' }, description: { eu: 'ax + b = c', es: 'ax + b = c', ar: 'ax + b = c' } },
            { progressId: 29102, stage: 'first-degree', title: { eu: 'Bi ataletan eta parentesiekin', es: 'En los dos miembros y con paréntesis', ar: 'في الطرفين وبالأقواس' }, description: { eu: 'x bi ataletan, k(x + m).', es: 'x en los dos miembros, k(x + m).', ar: 'x في الطرفين، k(x + m).' } },
            { progressId: 29103, stage: 'denominators', title: { eu: 'Izendatzaileak', es: 'Denominadores', ar: 'المقامات' }, description: { eu: 'MKTa eta zatikiaren aurreko minusa.', es: 'El m.c.m. y el menos delante de la fracción.', ar: 'م.م.أ والناقص قبل الكسر.' } },
            { progressId: 29104, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', ar: 'المسائل' }, description: { eu: 'Zenbakiak, adinak eta perimetroak.', es: 'Números, edades y perímetros.', ar: 'أعداد وأعمار ومحيطات.' } },
            { progressId: 29105, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' }, description: { eu: 'Osatugabeak eta formula orokorra.', es: 'Incompletas y fórmula general.', ar: 'الناقصة والصيغة العامة.' } }
        ]
    },
    {
        id: 'solve',
        title: { eu: 'Ebatzi azkar', es: 'Resuelve rápido', ar: 'حلّ بسرعة' },
        tagline: { eu: 'Zortzi ekuazio segidan: idatzi x-ren balioa ahalik eta azkarren. Akats bakoitzak denbora kentzen dizu.', es: 'Ocho ecuaciones seguidas: escribe el valor de x lo más rápido posible. Cada fallo te quita tiempo.', ar: 'ثماني معادلات متتالية: اكتب قيمة x بأسرع ما يمكن. كل خطأ يكلّفك وقتًا.' },
        skills: { eu: 'Lehen eta bigarren mailako ekuazioak ebaztea', es: 'Resolver ecuaciones de primer y segundo grado', ar: 'حل معادلات الدرجتين الأولى والثانية' },
        levels: [
            { progressId: 29201, stage: 'first-degree', title: { eu: 'Lehen maila', es: 'Primer grado', ar: 'الدرجة الأولى' }, description: { eu: 'ax + b = c eta x bi ataletan.', es: 'ax + b = c y x en los dos miembros.', ar: 'ax + b = c وx في الطرفين.' } },
            { progressId: 29202, stage: 'denominators', title: { eu: 'Parentesiak eta izendatzaileak', es: 'Paréntesis y denominadores', ar: 'الأقواس والمقامات' }, description: { eu: 'Urrats gehiagoko ekuazioak.', es: 'Ecuaciones con más pasos.', ar: 'معادلات بخطوات أكثر.' } },
            { progressId: 29203, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' }, description: { eu: 'Idatzi ebazpen handiena.', es: 'Escribe la solución mayor.', ar: 'اكتب الحل الأكبر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ekuazio bat eta bere ebazpena.', es: 'Encuentra las parejas: una ecuación y su solución.', ar: 'جد الأزواج: معادلة وحلها.' },
        skills: { eu: 'Ebazpenak buruz aurkitzea', es: 'Encontrar soluciones de cabeza', ar: 'إيجاد الحلول ذهنيًا' },
        levels: [
            { progressId: 29301, stage: 'first-degree', title: { eu: 'Lehen maila', es: 'Primer grado', ar: 'الدرجة الأولى' }, description: { eu: '2x + 3 = 11 ↔ x = 4', es: '2x + 3 = 11 ↔ x = 4', ar: '2x + 3 = 11 ↔ x = 4' } },
            { progressId: 29302, stage: 'denominators', title: { eu: 'Izendatzaileak', es: 'Denominadores', ar: 'المقامات' }, description: { eu: '(x + 1)/3 = 2 ↔ x = 5', es: '(x + 1)/3 = 2 ↔ x = 5', ar: '(x + 1)/3 = 2 ↔ x = 5' } },
            { progressId: 29303, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' }, description: { eu: 'x² = 49 ↔ x = ±7', es: 'x² = 49 ↔ x = ±7', ar: 'x² = 49 ↔ x = ±7' } }
        ]
    }
]

export const equationsGameProgressIds: number[] = levelProgressIds(equationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equationsGameSlugs: Record<EquationsGameId, string> = { race: 'lasterketa', solve: 'ebatzi', memory: 'memoria' }

export function equationsGameModeForPath(pathname: string): EquationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['resolver', 'ebatzi'].includes(game)) return 'solve'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
