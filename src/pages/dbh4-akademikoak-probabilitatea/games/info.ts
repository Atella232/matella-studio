import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Probabilitatea (4. DBH akademikoak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type ProbabilityAkGameId = 'race' | 'memory'

export const PROBABILITY_AK_GAME_RECORDS_KEY = 'matella-probabilitatea-dbh4ak-game-records'

export const probabilityAkGames: GameInfo<ProbabilityAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Probabilitateen lasterketa', es: 'Carrera de probabilidades', en: 'Probability race', ar: 'سباق الاحتمالات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 86101, stage: 'events', title: { eu: 'Gertaerak', es: 'Sucesos', en: 'Events', ar: 'الأحداث' }, description: { eu: 'Bildura, lagin-espazioa eta aurkakoa.', es: 'Unión, espacio muestral y contrario.', en: 'Union, sample space and complement.', ar: 'الاتحاد وفضاء العيّنة والمعاكس.' } },
            { progressId: 86102, stage: 'probability', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Bi dado, karta-sorta eta bildura.', es: 'Dos dados, la baraja y la unión.', en: 'Two dice, the deck of cards and union.', ar: 'نردان والورق والاتحاد.' } },
            { progressId: 86103, stage: 'compound', title: { eu: 'Esperientzia konposatuak', es: 'Experiencias compuestas', en: 'Compound experiments', ar: 'التجارب المركّبة' }, description: { eu: 'Independenteak, itzuli gabe eta gutxienez behin.', es: 'Independientes, sin devolver y al menos una vez.', en: 'Independent, without replacement and at least once.', ar: 'مستقلة ودون إرجاع ومرة على الأقل.' } },
            { progressId: 86104, stage: 'conditional', title: { eu: 'Baldintzatua', es: 'Condicionada', en: 'Conditional', ar: 'الاحتمال المشروط' }, description: { eu: 'Taulak, formula eta probabilitate osoa.', es: 'Tablas, la fórmula y la probabilidad total.', en: 'Tables, the formula and total probability.', ar: 'الجداول والصيغة والاحتمال الكلي.' } },
            { progressId: 86105, stage: 'counting', title: { eu: 'Zenbatu eta erabaki', es: 'Contar y decidir', en: 'Count and decide', ar: 'العدّ والقرار' }, description: { eu: 'Batera ateratzea, daduak eta itxaropena.', es: 'Sacar a la vez, dados y esperanza.', en: 'Drawing at once, dice and expected value.', ar: 'السحب معًا والنرود والأمل.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Bi dadoren baturak, biderkadurak eta baldintzatuak', es: 'Sumas de dos dados, productos y condicionadas', en: 'Sums of two dice, products and conditional probabilities.', ar: 'مجاميع نردين والجداءات والاحتمالات المشروطة' },
        levels: [
            { progressId: 86201, stage: 'probability', title: { eu: 'Bi dado', es: 'Dos dados', en: 'Two dice', ar: 'نردان' }, description: { eu: 'P(S = 7) ↔ 1/6', es: 'P(S = 7) ↔ 1/6', en: 'P(S = 7) ↔ 1/6', ar: 'P(S = 7) ↔ 1/6' } },
            { progressId: 86202, stage: 'compound', title: { eu: 'Biderkadurak', es: 'Productos', en: 'Products', ar: 'الجداءات' }, description: { eu: '1/2 · 1/6 ↔ 1/12', es: '1/2 · 1/6 ↔ 1/12', en: '1/2 · 1/6 ↔ 1/12', ar: '1/2 · 1/6 ↔ 1/12' } },
            { progressId: 86203, stage: 'conditional', title: { eu: 'Baldintzatuak', es: 'Condicionadas', en: 'Conditional', ar: 'المشروطة' }, description: { eu: '0,12 : 0,3 ↔ 0,4', es: '0,12 : 0,3 ↔ 0,4', en: '0.12 : 0.3 ↔ 0.4', ar: '0.12 : 0.3 ↔ 0.4' } }
        ]
    }
]

export const probabilityAkGameProgressIds: number[] = levelProgressIds(probabilityAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const probabilityAkGameSlugs: Record<ProbabilityAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function probabilityAkGameModeForPath(pathname: string): ProbabilityAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
