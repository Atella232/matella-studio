import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { proportionDbh4ApGames } from '../../dbh4-aplikatuak-proportzionaltasuna/games/info.ts'
import type { GizMoneyStageId } from '../lessons.tsx'

/* ==========================================================================
   Merkataritza-aritmetika (Batxilergoa 1 · Gizarte Zientziak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star. Three games of its own (which offer is
   better, the table with gaps and the detective), the race and the memory,
   and two games of 4. DBH aplikatuak kept as they are there (the bank and
   the till), with the stages and progress ids of this unit.
   ========================================================================== */

export type GizMoneyGameId = 'race' | 'offer' | 'gaps' | 'detective' | 'memory' | 'bank' | 'till'

export const GIZ_MONEY_GAME_RECORDS_KEY = 'matella-merkataritza-batx1g-game-records'

/** A game of 4. DBH aplikatuak with its texts and levels, the stages and progress ids of this unit */
function reused(id: GizMoneyGameId, stages: GizMoneyStageId[], firstId: number): GameInfo<GizMoneyGameId> {
    const source = proportionDbh4ApGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const gizMoneyGames: GameInfo<GizMoneyGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Diruaren lasterketa', es: 'Carrera del dinero', en: 'Money race', ar: 'سباق المال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 131401, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Indizeak, kateak eta hasierako prezioa.', es: 'Índices, cadenas y precio inicial.', en: 'Indexes, chains and the starting price.', ar: 'المؤشرات والسلاسل والسعر الأصلي.' } },
            { progressId: 131402, stage: 'interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', en: 'Compound interest', ar: 'الفائدة المركبة' }, description: { eu: 'Azken kapitala eta urteak.', es: 'Capital final y años.', en: 'Final capital and years.', ar: 'رأس المال النهائي والسنوات.' } },
            { progressId: 131403, stage: 'tae', title: { eu: 'Urteko tasa baliokidea', es: 'La TAE', en: 'The APR', ar: 'المعدل السنوي المكافئ' }, description: { eu: 'Aldiak eta gastuak.', es: 'Periodos y gastos.', en: 'Periods and costs.', ar: 'الفترات والمصاريف.' } },
            { progressId: 131404, stage: 'savings', title: { eu: 'Aurrezkia', es: 'Ahorro', en: 'Saving', ar: 'الادخار' }, description: { eu: 'Progresio geometrikoak eta baturak.', es: 'Progresiones geométricas y sumas.', en: 'Geometric progressions and sums.', ar: 'المتتاليات الهندسية والمجاميع.' } },
            { progressId: 131405, stage: 'loans', title: { eu: 'Maileguak', es: 'Préstamos', en: 'Loans', ar: 'القروض' }, description: { eu: 'Interesak, amortizazioa eta ezeztapena.', es: 'Intereses, amortización y cancelación.', en: 'Interest, repayment and early repayment.', ar: 'الفوائد والإطفاء والإلغاء.' } }
        ]
    },
    {
        id: 'offer',
        title: { eu: 'Zein eskaintza da hobea?', es: '¿Qué oferta es mejor?', en: 'Which offer is better?', ar: 'أيّ العرضين أفضل؟' },
        tagline: { eu: 'Bi gordailu edo bi mailegu: ez begiratu iragarritako interesari, urteko tasa baliokideari baizik.', es: 'Dos depósitos o dos préstamos: no mires el interés anunciado, sino la TAE.', en: 'Two deposits or two loans: do not look at the advertised interest, but at the APR.', ar: 'وديعتان أو قرضان: لا تنظر إلى الفائدة المعلنة بل إلى المعدل السنوي المكافئ.' },
        skills: { eu: 'Urteko tasa baliokidea', es: 'La TAE', en: 'The APR', ar: 'المعدل السنوي المكافئ' },
        levels: [
            { progressId: 131501, stage: 'tae', title: { eu: 'Gordailuak', es: 'Depósitos', en: 'Deposits', ar: 'الودائع' }, description: { eu: 'Interes bera, ordainketa desberdina.', es: 'Mismo interés, distinto pago.', en: 'Same interest, different payment.', ar: 'الفائدة نفسها بدفع مختلف.' } },
            { progressId: 131502, stage: 'tae', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Interes handiagoa ez da beti hobea.', es: 'Más interés no siempre es mejor.', en: 'More interest is not always better.', ar: 'الفائدة الأكبر ليست الأفضل دائمًا.' } },
            { progressId: 131503, stage: 'tae', title: { eu: 'Gastuak dituzten maileguak', es: 'Préstamos con gastos', en: 'Loans with costs', ar: 'قروض بمصاريف' }, description: { eu: 'Urteko tasa baliokide txikiena.', es: 'La TAE más baja.', en: 'The lowest APR.', ar: 'أدنى معدل سنوي مكافئ.' } }
        ]
    },
    {
        id: 'gaps',
        title: { eu: 'Hutsuneak dituen taula', es: 'La tabla con huecos', en: 'The table with gaps', ar: 'الجدول الناقص' },
        tagline: { eu: 'Amortizazio-taula bati gelaxka bat falta zaio: aukeratu zein den.', es: 'A una tabla de amortización le falta una casilla: elige cuál es.', en: 'A repayment table is missing a cell: choose which value it is.', ar: 'ينقص جدولَ إطفاء خانةٌ: اختر قيمتها.' },
        skills: { eu: 'Amortizazio-taulak', es: 'Tablas de amortización', en: 'Repayment tables', ar: 'جداول الإطفاء' },
        levels: [
            { progressId: 131601, stage: 'loans', title: { eu: 'Interesak', es: 'Intereses', en: 'Interest', ar: 'الفوائد' }, description: { eu: 'Zorra bider interesa.', es: 'La deuda por el interés.', en: 'The debt times the interest.', ar: 'الدين مضروبًا في الفائدة.' } },
            { progressId: 131602, stage: 'loans', title: { eu: 'Amortizazioa', es: 'Amortización', en: 'Repayment', ar: 'الإطفاء' }, description: { eu: 'Urtekoa ken interesak.', es: 'La anualidad menos los intereses.', en: 'The payment minus the interest.', ar: 'الدفعة ناقص الفوائد.' } },
            { progressId: 131603, stage: 'loans', title: { eu: 'Zor bizia', es: 'Deuda pendiente', en: 'Outstanding debt', ar: 'الدين المتبقي' }, description: { eu: 'Zorra ken amortizazioa.', es: 'La deuda menos la amortización.', en: 'The debt minus the repayment.', ar: 'الدين ناقص الإطفاء.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Diruaren detektibea', es: 'Detective del dinero', en: 'Money detective', ar: 'مخبر المال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 131701, stage: 'interest', title: { eu: 'Ehunekoak eta interesa', es: 'Porcentajes e interés', en: 'Percentages and interest', ar: 'النسب والفائدة' }, description: { eu: 'Kateak, hasierako prezioa eta aldiak.', es: 'Cadenas, precio inicial y periodos.', en: 'Chains, starting price and periods.', ar: 'السلاسل والسعر الأصلي والفترات.' } },
            { progressId: 131702, stage: 'tae', title: { eu: 'Tasa eta denbora', es: 'TAE y tiempo', en: 'APR and time', ar: 'المعدل والزمن' }, description: { eu: 'Nominala, gastuak eta urteak.', es: 'Nominal, gastos y años.', en: 'Nominal, costs and years.', ar: 'الاسمي والمصاريف والسنوات.' } },
            { progressId: 131703, stage: 'loans', title: { eu: 'Aurrezkia eta maileguak', es: 'Ahorro y préstamos', en: 'Saving and loans', ar: 'الادخار والقروض' }, description: { eu: 'Baturak, planak eta taulak.', es: 'Sumas, planes y tablas.', en: 'Sums, plans and tables.', ar: 'المجاميع والخطط والجداول.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ehunekoa eta bere indizea, hazkunde-faktorea eta bere balioa, edo batura eta bere emaitza.', es: 'Encuentra las parejas: un porcentaje y su índice, un factor de crecimiento y su valor, o una suma y su resultado.', en: 'Find the pairs: a percentage and its index, a growth factor and its value, or a sum and its result.', ar: 'جد الأزواج: نسبة ومؤشرها، أو عامل نمو وقيمته، أو مجموع وناتجه.' },
        skills: { eu: 'Indizeak, faktoreak eta baturak', es: 'Índices, factores y sumas', en: 'Indexes, factors and sums', ar: 'المؤشرات والعوامل والمجاميع' },
        levels: [
            { progressId: 131801, stage: 'percent', title: { eu: 'Indizeak', es: 'Índices', en: 'Indexes', ar: 'المؤشرات' }, description: { eu: '+15 % ↔ 1,15', es: '+15 % ↔ 1,15', en: '+15% ↔ 1.15', ar: '+15 % ↔ 1.15' } },
            { progressId: 131802, stage: 'tae', title: { eu: 'Faktoreak', es: 'Factores', en: 'Factors', ar: 'العوامل' }, description: { eu: '1,02² ↔ 1,0404', es: '1,02² ↔ 1,0404', en: '1.02² ↔ 1.0404', ar: '1.02² ↔ 1.0404' } },
            { progressId: 131803, stage: 'savings', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: '3 + 6 + 12 ↔ 21', es: '3 + 6 + 12 ↔ 21', en: '3 + 6 + 12 ↔ 21', ar: '3 + 6 + 12 ↔ 21' } }
        ]
    },
    reused('bank', ['interest', 'interest', 'interest'], 131811),
    reused('till', ['percent', 'percent', 'percent'], 131821)
]

export const gizMoneyGameProgressIds: number[] = levelProgressIds(gizMoneyGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizMoneyGameSlugs: Record<GizMoneyGameId, string> = { race: 'lasterketa', offer: 'eskaintza', gaps: 'hutsuneak', detective: 'detektibea', memory: 'memoria', bank: 'bankua', till: 'kutxa' }

export function gizMoneyGameModeForPath(pathname: string): GizMoneyGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['eskaintza', 'oferta'].includes(game)) return 'offer'
    if (['hutsuneak', 'huecos'].includes(game)) return 'gaps'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['bankua', 'banco'].includes(game)) return 'bank'
    if (['kutxa', 'caja'].includes(game)) return 'till'
    return 'hub'
}
