import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polinomioak (4. DBH aplikatuak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type PolynomialsGameId = 'race' | 'memory'

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
