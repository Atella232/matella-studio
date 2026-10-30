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
        title: { eu: 'Berreturen lasterketa', es: 'Carrera de potencias', en: 'Powers race', ar: 'سباق القوى' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 62101, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Berretzaile negatiboak, faktorizazioa eta idazkera zientifikoa.', es: 'Exponentes negativos, factorización y notación científica.', en: 'Negative exponents, factorisation and scientific notation.', ar: 'الأسس السالبة والتحليل والترميز العلمي.' } },
            { progressId: 62102, stage: 'radicals', title: { eu: 'Erradikalak', es: 'Radicales', en: 'Radicals', ar: 'الجذور' }, description: { eu: 'Erroak, berretzaile zatikiak eta indize komuna.', es: 'Raíces, exponentes fraccionarios e índice común.', en: 'Roots, fractional exponents and common index.', ar: 'الجذور والأسس الكسرية والدليل المشترك.' } },
            { progressId: 62103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Atera, batu, biderkatu eta sartu.', es: 'Sacar, sumar, multiplicar e introducir.', en: 'Take out, add, multiply and bring in.', ar: 'الإخراج والجمع والضرب والإدخال.' } },
            { progressId: 62104, stage: 'rationalize', title: { eu: 'Arrazionalizatu', es: 'Racionalizar', en: 'Rationalise', ar: 'الإنطاق' }, description: { eu: '√b, ⁿ√bᵐ eta konjokatua.', es: '√b, ⁿ√bᵐ y el conjugado.', en: '√b, ⁿ√bᵐ and the conjugate.', ar: '√b وⁿ√bᵐ والمرافق.' } },
            { progressId: 62105, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Definizioa, oinarria, propietateak eta tarteak.', es: 'Definición, base, propiedades y acotación.', en: 'Definition, base, properties and bounds.', ar: 'التعريف والأساس والخصائص والحصر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere balioarekin.', es: 'Une cada expresión con su valor.', en: 'Match each expression with its value.', ar: 'صِل كل عبارة بقيمتها.' },
        skills: { eu: 'Berretzaile zatikiak, erroak eta logaritmoak', es: 'Exponentes fraccionarios, raíces y logaritmos', en: 'Fractional exponents, roots and logarithms', ar: 'الأسس الكسرية والجذور واللوغاريتمات' },
        levels: [
            { progressId: 62201, stage: 'radicals', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', en: 'Fractional exponents', ar: 'الأسس الكسرية' }, description: { eu: '8^(2/3) ↔ 4', es: '8^(2/3) ↔ 4', en: '8^(2/3) ↔ 4', ar: '8^(2/3) ↔ 4' } },
            { progressId: 62202, stage: 'operations', title: { eu: 'Faktoreak atera', es: 'Sacar factores', en: 'Take factors out', ar: 'إخراج العوامل' }, description: { eu: '∛54 ↔ 3∛2', es: '∛54 ↔ 3∛2', en: '∛54 ↔ 3∛2', ar: '∛54 ↔ 3∛2' } },
            { progressId: 62203, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 32 ↔ 5', es: 'log₂ 32 ↔ 5', en: 'log₂ 32 ↔ 5', ar: 'log₂ 32 ↔ 5' } }
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
