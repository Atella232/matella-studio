import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (2. DBH) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type StatisticsGameId = 'race' | 'memory'

export const STATISTICS_GAME_RECORDS_KEY = 'matella-estatistika-dbh2-game-records'

export const statisticsGames: GameInfo<StatisticsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Datuen lasterketa', es: 'Carrera de datos', ar: 'سباق البيانات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 35101, stage: 'tables', title: { eu: 'Taulak', es: 'Tablas', ar: 'الجداول' }, description: { eu: 'Maiztasun metatuak eta klase-markak.', es: 'Frecuencias acumuladas y marcas de clase.', ar: 'التكرارات المتجمّعة ومراكز الفئات.' } },
            { progressId: 35102, stage: 'graphs', title: { eu: 'Grafikoak', es: 'Gráficos', ar: 'التمثيلات' }, description: { eu: 'Ehunekoak, graduak eta pertsonak.', es: 'Porcentajes, grados y personas.', ar: 'النسب والدرجات والأشخاص.' } },
            { progressId: 35103, stage: 'centre', title: { eu: 'Erdigunea', es: 'Centralización', ar: 'النزعة المركزية' }, description: { eu: 'Batez bestekoa eta mediana tauletatik.', es: 'Media y mediana desde tablas.', ar: 'المتوسط والوسيط من الجداول.' } },
            { progressId: 35104, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', ar: 'التشتت' }, description: { eu: 'Ibiltartea, desbideratzea eta kuartilak.', es: 'Recorrido, desviación y cuartiles.', ar: 'المدى والانحراف والربيعيات.' } },
            { progressId: 35105, stage: 'chance', title: { eu: 'Probabilitatea', es: 'Probabilidad', ar: 'الاحتمال' }, description: { eu: 'Aurkako gertaera, dadoak eta txanponak.', es: 'Suceso contrario, dados y monedas.', ar: 'الحدث المعاكس والنرد وقطع النقود.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Sektoreak, batez bestekoak eta probabilitateak', es: 'Sectores, medias y probabilidades', ar: 'القطاعات والمتوسطات والاحتمالات' },
        levels: [
            { progressId: 35201, stage: 'graphs', title: { eu: 'Sektoreak', es: 'Sectores', ar: 'القطاعات' }, description: { eu: '% 25 ↔ 90°', es: '25 % ↔ 90°', ar: '25 % ↔ 90°' } },
            { progressId: 35202, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', ar: 'المتوسطات' }, description: { eu: '(3 + 5 + 7) : 3 ↔ 5', es: '(3 + 5 + 7) : 3 ↔ 5', ar: '(3 + 5 + 7) : 3 ↔ 5' } },
            { progressId: 35203, stage: 'chance', title: { eu: 'Probabilitateak', es: 'Probabilidades', ar: 'الاحتمالات' }, description: { eu: '1 − 3/8 ↔ 5/8', es: '1 − 3/8 ↔ 5/8', ar: '1 − 3/8 ↔ 5/8' } }
        ]
    }
]

export const statisticsGameProgressIds: number[] = levelProgressIds(statisticsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsGameSlugs: Record<StatisticsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function statisticsGameModeForPath(pathname: string): StatisticsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
