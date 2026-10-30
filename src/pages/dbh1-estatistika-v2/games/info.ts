import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star.
   ========================================================================== */

export type StatisticsGameId = 'race' | 'mean' | 'memory'

export const STATISTICS_GAME_RECORDS_KEY = 'matella-estatistika-dbh1-game-records'

export const statisticsGames: GameInfo<StatisticsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera de estadística', en: 'Statistics race', ar: 'سباق الإحصاء' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu: maiztasunak, sektoreak, batez bestekoa, mediana eta probabilitatea', es: 'Cinco circuitos: frecuencias, sectores, media, mediana y probabilidad', en: 'Five circuits: frequencies, pie charts, mean, median and probability', ar: 'خمس حلبات: التكرارات والقطاعات والمتوسط والوسيط والاحتمال' },
        levels: [
            { progressId: 12101, stage: 'tables', title: { eu: 'Maiztasunak', es: 'Frecuencias', en: 'Frequencies', ar: 'التكرارات' }, description: { eu: 'Maiztasun erlatiboa eta ehunekoak.', es: 'Frecuencia relativa y porcentajes.', en: 'Relative frequency and percentages.', ar: 'التكرار النسبي والنسب المئوية.' } },
            { progressId: 12102, stage: 'graphs', title: { eu: 'Sektore-diagramak', es: 'Diagramas de sectores', en: 'Pie charts', ar: 'المخططات الدائرية' }, description: { eu: 'Sektoreen angeluak.', es: 'Los ángulos de los sectores.', en: 'The angles of the sectors.', ar: 'زوايا القطاعات.' } },
            { progressId: 12103, stage: 'parameters', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'Batu eta zatitu.', es: 'Sumar y dividir.', en: 'Add up and divide.', ar: 'اجمع واقسم.' } },
            { progressId: 12104, stage: 'parameters', title: { eu: 'Mediana, moda eta ibiltartea', es: 'Mediana, moda y rango', en: 'Median, mode and range', ar: 'الوسيط والمنوال والمدى' }, description: { eu: 'Ordenatu, zenbatu eta kendu.', es: 'Ordenar, contar y restar.', en: 'Sort, count and subtract.', ar: 'رتّب وعُدّ واطرح.' } },
            { progressId: 12105, stage: 'probability', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Dadoak eta poltsak: Laplaceren erregela.', es: 'Dados y bolsas: la regla de Laplace.', en: 'Dice and bags: Laplace\'s rule.', ar: 'نرد وأكياس: قاعدة لابلاس.' } }
        ]
    },
    {
        id: 'mean',
        title: { eu: 'Batez bestekoaren begia', es: 'Ojo para la media', en: 'Eye for the mean', ar: 'عين المتوسط' },
        tagline: { eu: 'Datu batzuk ikusi eta asmatu non dagoen haien oreka-puntua. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Mira unos datos y estima dónde está su punto de equilibrio. Cuanto más cerca, más puntos.', en: 'Look at some values and estimate where their balance point is. The closer you are, the more points you get.', ar: 'انظر إلى بعض البيانات وقدّر نقطة توازنها. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Batez bestekoaren estimazioa', es: 'Estimación de la media', en: 'Estimating the mean', ar: 'تقدير المتوسط' },
        levels: [
            { progressId: 12201, stage: 'parameters', title: { eu: '4 datu, 0tik 10era', es: '4 datos, de 0 a 10', en: '4 values, from 0 to 10', ar: '4 قيم، من 0 إلى 10' }, description: { eu: 'Batez besteko osoak.', es: 'Medias enteras.', en: 'Integer means.', ar: 'متوسطات صحيحة.' } },
            { progressId: 12202, stage: 'parameters', title: { eu: '5 datu, 0tik 10era', es: '5 datos, de 0 a 10', en: '5 values, from 0 to 10', ar: '5 قيم، من 0 إلى 10' }, description: { eu: 'Hamartarrak ere bai.', es: 'También decimales.', en: 'Decimals too.', ar: 'وأعداد عشرية أيضًا.' } },
            { progressId: 12203, stage: 'parameters', title: { eu: '7 datu, 0tik 20ra', es: '7 datos, de 0 a 20', en: '7 values, from 0 to 20', ar: '7 قيم، من 0 إلى 20' }, description: { eu: 'Datu gehiago, lerro luzeagoa.', es: 'Más datos, línea más larga.', en: 'More values, longer line.', ar: 'بيانات أكثر وخط أطول.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: kalkulu bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un cálculo y su resultado.', en: 'Find the cards that are worth the same: a calculation and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عملية وناتجها.' },
        skills: { eu: 'Ehunekoak, batez bestekoak eta probabilitateak', es: 'Porcentajes, medias y probabilidades', en: 'Percentages, means and probabilities', ar: 'النسب المئوية والمتوسطات والاحتمالات' },
        levels: [
            { progressId: 12301, stage: 'tables', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: '5/20 ↔ 25 %', es: '5/20 ↔ 25 %', en: '5/20 ↔ 25 %', ar: '5/20 ↔ 25 %' } },
            { progressId: 12302, stage: 'parameters', title: { eu: 'Batez bestekoak', es: 'Medias', en: 'Means', ar: 'المتوسطات' }, description: { eu: '(4 + 8) : 2 ↔ 6', es: '(4 + 8) : 2 ↔ 6', en: '(4 + 8) : 2 ↔ 6', ar: '(4 + 8) : 2 ↔ 6' } },
            { progressId: 12303, stage: 'probability', title: { eu: 'Dadoaren probabilitateak', es: 'Probabilidades del dado', en: 'Probabilities for the die', ar: 'احتمالات النرد' }, description: { eu: 'P({2, 4, 6}) ↔ 1/2', es: 'P({2, 4, 6}) ↔ 1/2', en: 'P({2, 4, 6}) ↔ 1/2', ar: 'P({2, 4, 6}) ↔ 1/2' } }
        ]
    }
]

export const statisticsGameProgressIds: number[] = levelProgressIds(statisticsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsGameSlugs: Record<StatisticsGameId, string> = { race: 'lasterketa', mean: 'batez-bestekoa', memory: 'memoria' }

export function statisticsGameModeForPath(pathname: string): StatisticsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['media', 'batez-bestekoa'].includes(game)) return 'mean'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
