import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak (4. DBH akademikoak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type PolynomialsGameId = 'race' | 'memory'

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
    }
]

export const polynomialsGameProgressIds: number[] = levelProgressIds(polynomialsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomialsGameSlugs: Record<PolynomialsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function polynomialsGameModeForPath(pathname: string): PolynomialsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
