import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak (4. DBH akademikoak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star.
   ========================================================================== */

export type PowersGameId = 'race' | 'memory'

export const POWERS_GAME_RECORDS_KEY = 'matella-potentziak-dbh4ak-game-records'

export const powersGames: GameInfo<PowersGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Berreturen lasterketa', es: 'Carrera de potencias', ar: 'سباق القوى' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 62101, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: 'Berretzaile negatiboak, faktorizazioa eta idazkera zientifikoa.', es: 'Exponentes negativos, factorización y notación científica.', ar: 'الأسس السالبة والتحليل والترميز العلمي.' } },
            { progressId: 62102, stage: 'radicals', title: { eu: 'Erradikalak', es: 'Radicales', ar: 'الجذور' }, description: { eu: 'Erroak, berretzaile zatikiak eta indize komuna.', es: 'Raíces, exponentes fraccionarios e índice común.', ar: 'الجذور والأسس الكسرية والدليل المشترك.' } },
            { progressId: 62103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: 'Atera, batu, biderkatu eta sartu.', es: 'Sacar, sumar, multiplicar e introducir.', ar: 'الإخراج والجمع والضرب والإدخال.' } },
            { progressId: 62104, stage: 'rationalize', title: { eu: 'Arrazionalizatu', es: 'Racionalizar', ar: 'الإنطاق' }, description: { eu: '√b, ⁿ√bᵐ eta konjokatua.', es: '√b, ⁿ√bᵐ y el conjugado.', ar: '√b وⁿ√bᵐ والمرافق.' } },
            { progressId: 62105, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', ar: 'اللوغاريتمات' }, description: { eu: 'Definizioa, oinarria, propietateak eta tarteak.', es: 'Definición, base, propiedades y acotación.', ar: 'التعريف والأساس والخصائص والحصر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere balioarekin.', es: 'Une cada expresión con su valor.', ar: 'صِل كل عبارة بقيمتها.' },
        skills: { eu: 'Berretzaile zatikiak, erroak eta logaritmoak', es: 'Exponentes fraccionarios, raíces y logaritmos', ar: 'الأسس الكسرية والجذور واللوغاريتمات' },
        levels: [
            { progressId: 62201, stage: 'radicals', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', ar: 'الأسس الكسرية' }, description: { eu: '8^(2/3) ↔ 4', es: '8^(2/3) ↔ 4', ar: '8^(2/3) ↔ 4' } },
            { progressId: 62202, stage: 'operations', title: { eu: 'Faktoreak atera', es: 'Sacar factores', ar: 'إخراج العوامل' }, description: { eu: '∛54 ↔ 3∛2', es: '∛54 ↔ 3∛2', ar: '∛54 ↔ 3∛2' } },
            { progressId: 62203, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 32 ↔ 5', es: 'log₂ 32 ↔ 5', ar: 'log₂ 32 ↔ 5' } }
        ]
    }
]

export const powersGameProgressIds: number[] = levelProgressIds(powersGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const powersGameSlugs: Record<PowersGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function powersGameModeForPath(pathname: string): PowersGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
