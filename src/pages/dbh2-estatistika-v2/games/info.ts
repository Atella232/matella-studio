import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (2. DBH) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first star.
   Three games belong to this topic (the missing card, pack the bag and the
   statistics detective); the race and the memory are shared engines.
   ========================================================================== */

export type StatisticsGameId = 'race' | 'missing' | 'bag' | 'detective' | 'memory'

export const STATISTICS_GAME_RECORDS_KEY = 'matella-estatistika-dbh2-game-records'

export const statisticsGames: GameInfo<StatisticsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Datuen lasterketa', es: 'Carrera de datos', en: 'Data race', ar: 'سباق البيانات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 35101, stage: 'tables', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'Maiztasun metatuak eta klase-markak.', es: 'Frecuencias acumuladas y marcas de clase.', en: 'Cumulative frequencies and class midpoints.', ar: 'التكرارات المتجمّعة ومراكز الفئات.' } },
            { progressId: 35102, stage: 'graphs', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'التمثيلات' }, description: { eu: 'Ehunekoak, graduak eta pertsonak.', es: 'Porcentajes, grados y personas.', en: 'Percentages, degrees and people.', ar: 'النسب والدرجات والأشخاص.' } },
            { progressId: 35103, stage: 'centre', title: { eu: 'Erdigunea', es: 'Centralización', en: 'Central tendency', ar: 'النزعة المركزية' }, description: { eu: 'Batez bestekoa eta mediana tauletatik.', es: 'Media y mediana desde tablas.', en: 'Mean and median from tables.', ar: 'المتوسط والوسيط من الجداول.' } },
            { progressId: 35104, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'Ibiltartea, desbideratzea eta kuartilak.', es: 'Recorrido, desviación y cuartiles.', en: 'Range, deviation and quartiles.', ar: 'المدى والانحراف والربيعيات.' } },
            { progressId: 35105, stage: 'chance', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Aurkako gertaera, dadoak eta txanponak.', es: 'Suceso contrario, dados y monedas.', en: 'Complementary event, dice and coins.', ar: 'الحدث المعاكس والنرد وقطع النقود.' } }
        ]
    },
    {
        id: 'missing',
        title: { eu: 'Falta den txartela', es: 'La carta que falta', en: 'The missing card', ar: 'البطاقة الناقصة' },
        tagline: { eu: 'Txartel bat buruz behera dago: aurkitu zein den, batez bestekoa edo mediana bat etortzeko.', es: 'Una carta está boca abajo: descubre cuál es para que cuadre la media o la mediana.', en: 'One card is face down: work out which it is so that the mean or the median fits.', ar: 'بطاقة مقلوبة: اكتشف قيمتها ليتطابق المتوسط أو الوسيط.' },
        skills: { eu: 'Batez bestekoa, mediana eta maiztasun-taulak', es: 'Media, mediana y tablas de frecuencias', en: 'Mean, median and frequency tables', ar: 'المتوسط والوسيط وجداول التكرار' },
        levels: [
            { progressId: 35301, stage: 'centre', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'Bost nota, bat ezkutuan.', es: 'Cinco notas, una oculta.', en: 'Five marks, one hidden.', ar: 'خمس علامات، واحدة مخفية.' } },
            { progressId: 35302, stage: 'centre', title: { eu: 'Mediana', es: 'La mediana', en: 'The median', ar: 'الوسيط' }, description: { eu: 'Sei datu: erdiko biak.', es: 'Seis datos: los dos centrales.', en: 'Six data: the two middle ones.', ar: 'ست قيم: القيمتان الوسطيان.' } },
            { progressId: 35303, stage: 'centre', title: { eu: 'Maiztasun-taula', es: 'Tabla de frecuencias', en: 'Frequency table', ar: 'جدول التكرار' }, description: { eu: 'Maiztasun bat falta da.', es: 'Falta una frecuencia.', en: 'A frequency is missing.', ar: 'ينقص تكرار.' } }
        ]
    },
    {
        id: 'bag',
        title: { eu: 'Prestatu poltsa', es: 'Prepara la bolsa', en: 'Pack the bag', ar: 'جهّز الكيس' },
        tagline: { eu: 'Sartu bola gorriak, urdinak eta berdeak, poltsak txartelaren probabilitateak izan ditzan.', es: 'Mete bolas rojas, azules y verdes para que la bolsa tenga las probabilidades de la tarjeta.', en: 'Put in red, blue and green balls so that the bag has the probabilities on the card.', ar: 'ضع كرات حمراء وزرقاء وخضراء ليحقق الكيس احتمالات البطاقة.' },
        skills: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace’s rule', ar: 'قاعدة لابلاس' },
        levels: [
            { progressId: 35401, stage: 'chance', title: { eu: 'Probabilitate bat', es: 'Una probabilidad', en: 'One probability', ar: 'احتمال واحد' }, description: { eu: 'Kolore bakar baten probabilitatea.', es: 'La probabilidad de un color.', en: 'The probability of one colour.', ar: 'احتمال لون واحد.' } },
            { progressId: 35402, stage: 'chance', title: { eu: 'Bi probabilitate', es: 'Dos probabilidades', en: 'Two probabilities', ar: 'احتمالان' }, description: { eu: 'Gorria eta urdina aldi berean.', es: 'Roja y azul a la vez.', en: 'Red and blue at once.', ar: 'الحمراء والزرقاء معًا.' } },
            { progressId: 35403, stage: 'chance', title: { eu: 'Aurkakoa eta bikoitza', es: 'Contrario y doble', en: 'Opposite and double', ar: 'المعاكس والضعف' }, description: { eu: '«Ez berdea» eta «gorria bikoitza».', es: '«No verde» y «roja el doble».', en: '“Not green” and “red twice as likely”.', ar: '«ليست خضراء» و«الحمراء الضعف».' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Estatistika eta probabilitateko akats tipikoak', es: 'Errores típicos de estadística y probabilidad', en: 'Common mistakes in statistics and probability', ar: 'الأخطاء الشائعة في الإحصاء والاحتمال' },
        levels: [
            { progressId: 35501, stage: 'tables', title: { eu: 'Taulak eta grafikoak', es: 'Tablas y gráficos', en: 'Tables and charts', ar: 'الجداول والتمثيلات' }, description: { eu: 'Maiztasunak, ehunekoak eta sektoreak.', es: 'Frecuencias, porcentajes y sectores.', en: 'Frequencies, percentages and sectors.', ar: 'التكرارات والنسب والقطاعات.' } },
            { progressId: 35502, stage: 'centre', title: { eu: 'Zentralizazioa', es: 'Centralización', en: 'Central tendency', ar: 'النزعة المركزية' }, description: { eu: 'Batez bestekoa, mediana eta moda.', es: 'Media, mediana y moda.', en: 'Mean, median and mode.', ar: 'المتوسط والوسيط والمنوال.' } },
            { progressId: 35503, stage: 'chance', title: { eu: 'Ibiltartea eta zoria', es: 'Recorrido y azar', en: 'Range and chance', ar: 'المدى والصدفة' }, description: { eu: 'Ibiltartea, Laplace, aurkakoa eta dadoak.', es: 'Recorrido, Laplace, contrario y dados.', en: 'Range, Laplace, opposite and dice.', ar: 'المدى ولابلاس والمعاكس والنرد.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Sektoreak, batez bestekoak eta probabilitateak', es: 'Sectores, medias y probabilidades', en: 'Sectors, means and probabilities', ar: 'القطاعات والمتوسطات والاحتمالات' },
        levels: [
            { progressId: 35201, stage: 'graphs', title: { eu: 'Sektoreak', es: 'Sectores', en: 'Pie chart', ar: 'القطاعات' }, description: { eu: '% 25 ↔ 90°', es: '25 % ↔ 90°', en: '25% ↔ 90°', ar: '25 % ↔ 90°' } },
            { progressId: 35202, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', en: 'Means', ar: 'المتوسطات' }, description: { eu: '(3 + 5 + 7) : 3 ↔ 5', es: '(3 + 5 + 7) : 3 ↔ 5', en: '(3 + 5 + 7) : 3 ↔ 5', ar: '(3 + 5 + 7) : 3 ↔ 5' } },
            { progressId: 35203, stage: 'chance', title: { eu: 'Probabilitateak', es: 'Probabilidades', en: 'Probabilities', ar: 'الاحتمالات' }, description: { eu: '1 − 3/8 ↔ 5/8', es: '1 − 3/8 ↔ 5/8', en: '1 − 3/8 ↔ 5/8', ar: '1 − 3/8 ↔ 5/8' } }
        ]
    }
]

export const statisticsGameProgressIds: number[] = levelProgressIds(statisticsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsGameSlugs: Record<StatisticsGameId, string> = { race: 'lasterketa', missing: 'txartela', bag: 'poltsa', detective: 'detektibea', memory: 'memoria' }

export function statisticsGameModeForPath(pathname: string): StatisticsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['txartela', 'carta'].includes(game)) return 'missing'
    if (['poltsa', 'bolsa'].includes(game)) return 'bag'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
