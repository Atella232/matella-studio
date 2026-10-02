import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna (1. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type ProportionGameId = 'race' | 'memory'

export const PROPORTION_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh1-game-records'

export const proportionGames: GameInfo<ProportionGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 16101, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', ar: 'النسب' }, description: { eu: 'Arrazoiaren balioa eta proportzioak.', es: 'El valor de la razón y las proporciones.', ar: 'قيمة النسبة والتناسبات.' } },
            { progressId: 16102, stage: 'direct', title: { eu: 'Zuzena', es: 'Directa', ar: 'طردي' }, description: { eu: 'Zatitu eta biderkatu.', es: 'Divide y multiplica.', ar: 'اقسم واضرب.' } },
            { progressId: 16103, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', ar: 'عكسي' }, description: { eu: 'Biderkatu eta zatitu.', es: 'Multiplica y divide.', ar: 'اضرب واقسم.' } },
            { progressId: 16104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' }, description: { eu: 'Zatia, ehunekoa eta osoa.', es: 'La parte, el porcentaje y el total.', ar: 'الجزء والنسبة والكل.' } },
            { progressId: 16105, stage: 'changes', title: { eu: 'Beherapenak eta igoerak', es: 'Rebajas y subidas', ar: 'التخفيضات والزيادات' }, description: { eu: 'Azken prezioa.', es: 'El precio final.', ar: 'السعر النهائي.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Ehunekoak eta proportzioak', es: 'Porcentajes y proporciones', ar: 'النسب المئوية والتناسبات' },
        levels: [
            { progressId: 16201, stage: 'percent', title: { eu: 'Ehunekoaren formak', es: 'Las formas del porcentaje', ar: 'صيغ النسبة المئوية' }, description: { eu: '25 % ↔ 1/4 · 9 % ↔ 0,09', es: '25 % ↔ 1/4 · 9 % ↔ 0,09', ar: '25٪ ↔ 1/4 · 9٪ ↔ 0.09' } },
            { progressId: 16202, stage: 'percent', title: { eu: 'Kantitate baten ehunekoa', es: 'Porcentaje de una cantidad', ar: 'نسبة من كمية' }, description: { eu: '20 % · 50 ↔ 10', es: '20 % · 50 ↔ 10', ar: '20٪ · 50 ↔ 10' } },
            { progressId: 16203, stage: 'ratios', title: { eu: 'Proportzioak', es: 'Proporciones', ar: 'التناسبات' }, description: { eu: '3/6 = 7/x ↔ x = 14', es: '3/6 = 7/x ↔ x = 14', ar: '3/6 = 7/x ↔ x = 14' } }
        ]
    }
]

export const proportionGameProgressIds: number[] = levelProgressIds(proportionGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionGameSlugs: Record<ProportionGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function proportionGameModeForPath(pathname: string): ProportionGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
