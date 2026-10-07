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
        title: { eu: 'Polinomioen lasterketa', es: 'Carrera de polinomios', ar: 'سباق الحدوديات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 46101, stage: 'monomials', title: { eu: 'Monomioak eta balioak', es: 'Monomios y valores', ar: 'وحيدات الحد والقيم' }, description: { eu: 'Zenbakizko balioa eta monomioen eragiketak.', es: 'Valor numérico y operaciones con monomios.', ar: 'القيمة العددية وعمليات وحيدات الحد.' } },
            { progressId: 46102, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: 'Kenketa, biderketak eta identitateak.', es: 'Resta, productos e identidades.', ar: 'الطرح والضرب والمتطابقات.' } },
            { progressId: 46103, stage: 'division', title: { eu: 'Ruffini', es: 'Ruffini', ar: 'روفيني' }, description: { eu: 'Hondarra, zatidura eta zatiketa zehatzak.', es: 'Resto, cociente y divisiones exactas.', ar: 'الباقي وخارج القسمة والقسمة التامة.' } },
            { progressId: 46104, stage: 'factor', title: { eu: 'Erroak eta faktoreak', es: 'Raíces y factores', ar: 'الجذور والعوامل' }, description: { eu: 'Erro osoak eta faktore komuna.', es: 'Raíces enteras y factor común.', ar: 'الجذور الصحيحة والعامل المشترك.' } },
            { progressId: 46105, stage: 'expressions', title: { eu: 'Adierazpenak', es: 'Expresiones', ar: 'العبارات' }, description: { eu: 'Zatiki aljebraikoak, sinplifikatu eta problemak.', es: 'Fracciones algebraicas, simplificar y problemas.', ar: 'الكسور الجبرية والتبسيط والمسائل.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Identitateak, faktore komuna eta hondarrak', es: 'Identidades, factor común y restos', ar: 'المتطابقات والعامل المشترك والبواقي' },
        levels: [
            { progressId: 46201, stage: 'operations', title: { eu: 'Identitate nabarmenak', es: 'Igualdades notables', ar: 'المتطابقات الشهيرة' }, description: { eu: '(x + 3)² ↔ x² + 6x + 9', es: '(x + 3)² ↔ x² + 6x + 9', ar: '(x + 3)² ↔ x² + 6x + 9' } },
            { progressId: 46202, stage: 'factor', title: { eu: 'Faktore komuna', es: 'Factor común', ar: 'العامل المشترك' }, description: { eu: '4x² + 8x ↔ 4x(x + 2)', es: '4x² + 8x ↔ 4x(x + 2)', ar: '4x² + 8x ↔ 4x(x + 2)' } },
            { progressId: 46203, stage: 'division', title: { eu: 'Hondarraren teorema', es: 'Teorema del resto', ar: 'مبرهنة الباقي' }, description: { eu: '(x² − 3x + 1) : (x − 2) ↔ R = −1', es: '(x² − 3x + 1) : (x − 2) ↔ R = −1', ar: '(x² − 3x + 1) : (x − 2) ↔ R = −1' } }
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
