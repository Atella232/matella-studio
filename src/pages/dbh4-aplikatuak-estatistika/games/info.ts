import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (4. DBH aplikatuak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star.
   ========================================================================== */

export type StatisticsGameId = 'race' | 'memory' | 'box' | 'cloud' | 'detective'

export const STATISTICS_GAME_RECORDS_KEY = 'matella-estatistika-dbh4ap-game-records'

export const statisticsGames: GameInfo<StatisticsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera estadística', en: 'Statistics race', ar: 'السباق الإحصائي' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 60101, stage: 'data', title: { eu: 'Datuak', es: 'Datos', en: 'Data', ar: 'البيانات' }, description: { eu: 'Zabalerak, klase-markak eta sektoreak.', es: 'Amplitudes, marcas de clase y sectores.', en: 'Class widths, class marks and sectors.', ar: 'أطوال الفئات ومراكزها والقطاعات.' } },
            { progressId: 60102, stage: 'centre', title: { eu: 'Posizioa', es: 'Posición', en: 'Position', ar: 'الموقع' }, description: { eu: 'Batez bestekoa, pertzentilak eta biboteak.', es: 'Media, percentiles y bigotes.', en: 'Mean, percentiles and whiskers.', ar: 'المتوسط والمئينات والشاربان.' } },
            { progressId: 60103, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'Bariantza, σ eta CV.', es: 'Varianza, σ y CV.', en: 'Variance, σ and CV.', ar: 'التباين وσ وCV.' } },
            { progressId: 60104, stage: 'two', title: { eu: 'Bi aldagai', es: 'Dos variables', en: 'Two variables', ar: 'متغيران' }, description: { eu: 'Estimazioak eta r.', es: 'Estimaciones y r.', en: 'Estimates and r.', ar: 'التقديرات وr.' } },
            { progressId: 60105, stage: 'chance', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Bildura, zuhaitzak eta baldintzatuak.', es: 'Unión, árboles y condicionadas.', en: 'Union, tree diagrams and conditional probability.', ar: 'الاتحاد والأشجار والمشروط.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu datu bakoitza bere emaitzarekin.', es: 'Une cada dato con su resultado.', en: 'Match each data item with its result.', ar: 'صِل كل معطى بنتيجته.' },
        skills: { eu: 'Biboteak, CV eta zuhaitzak', es: 'Bigotes, CV y árboles', en: 'Whiskers, CV and tree diagrams', ar: 'الشاربان وCV والأشجار' },
        levels: [
            { progressId: 60201, stage: 'centre', title: { eu: 'Biboteak', es: 'Bigotes', en: 'Whiskers', ar: 'الشاربان' }, description: { eu: 'Q₁ = 4, Q₃ = 8 ↔ 14', es: 'Q₁ = 4, Q₃ = 8 ↔ 14', en: 'Q₁ = 4, Q₃ = 8 ↔ 14', ar: 'Q₁ = 4, Q₃ = 8 ↔ 14' } },
            { progressId: 60202, stage: 'spread', title: { eu: 'Aldakuntza', es: 'Variación', en: 'Variation', ar: 'الاختلاف' }, description: { eu: 'x̄ = 50, σ = 4 ↔ 8 %', es: 'x̄ = 50, σ = 4 ↔ 8 %', en: 'x̄ = 50, σ = 4 ↔ 8%', ar: 'x̄ = 50, σ = 4 ↔ 8 %' } },
            { progressId: 60203, stage: 'chance', title: { eu: 'Zuhaitzak', es: 'Árboles', en: 'Tree diagrams', ar: 'الأشجار' }, description: { eu: '2/5 · 3/4 ↔ 3/10', es: '2/5 · 3/4 ↔ 3/10', en: '2/5 · 3/4 ↔ 3/10', ar: '2/5 · 3/4 ↔ 3/10' } }
        ]
    },
    {
        id: 'box',
        title: { eu: 'Eraiki kaxa-diagrama', es: 'Construye el diagrama de caja', en: 'Build the box plot', ar: 'ارسم مخطط الصندوق' },
        tagline: { eu: 'Datuak puntuetan: jarri Q₁, mediana eta Q₃, eta kaxa mugituko da.', es: 'Datos en puntos: coloca Q₁, la mediana y Q₃, y la caja se moverá.', en: 'Data as dots: place Q₁, the median and Q₃, and the box moves.', ar: 'بيانات على شكل نقاط: ضع Q₁ والوسيط وQ₃ فيتحرك الصندوق.' },
        skills: { eu: 'Kuartilak eta kaxa-diagramak', es: 'Cuartiles y diagramas de caja', en: 'Quartiles and box plots', ar: 'الربيعيات ومخططات الصندوق' },
        levels: [
            { progressId: 60301, stage: 'centre', title: { eu: 'Datu kopuru bakoitia', es: 'Número impar de datos', en: 'An odd number of data', ar: 'عدد فردي من البيانات' }, description: { eu: 'Kuartilak datuak dira.', es: 'Los cuartiles son datos.', en: 'The quartiles are data.', ar: 'الربيعيات قيم من البيانات.' } },
            { progressId: 60302, stage: 'centre', title: { eu: 'Datu kopuru bikoitia', es: 'Número par de datos', en: 'An even number of data', ar: 'عدد زوجي من البيانات' }, description: { eu: 'Batzuetan, bi daturen batez bestekoa.', es: 'A veces, la media de dos datos.', en: 'Sometimes the mean of two data.', ar: 'أحيانًا متوسط قيمتين.' } },
            { progressId: 60303, stage: 'centre', title: { eu: 'Datu asko', es: 'Muchos datos', en: 'Many data', ar: 'بيانات كثيرة' }, description: { eu: 'Errepikatutako balioak.', es: 'Valores repetidos.', en: 'Repeated values.', ar: 'قيم متكررة.' } }
        ]
    },
    {
        id: 'cloud',
        title: { eu: 'Asmatu korrelazioa', es: 'Adivina la correlación', en: 'Guess the correlation', ar: 'خمّن الارتباط' },
        tagline: { eu: 'Puntu-hodei bat: nolakoa da korrelazioa? Gero, erregresio-zuzena eta r agertuko dira.', es: 'Una nube de puntos: ¿cómo es la correlación? Luego aparecen la recta de regresión y r.', en: 'A scatter plot: what is the correlation like? Then the regression line and r appear.', ar: 'سحابة نقاط: كيف هو الارتباط؟ ثم يظهر مستقيم الانحدار وr.' },
        skills: { eu: 'Korrelazioa eta erregresioa', es: 'Correlación y regresión', en: 'Correlation and regression', ar: 'الارتباط والانحدار' },
        levels: [
            { progressId: 60401, stage: 'two', title: { eu: 'Zeinua', es: 'El signo', en: 'The sign', ar: 'الإشارة' }, description: { eu: 'Positiboa, ez dago edo negatiboa.', es: 'Positiva, nula o negativa.', en: 'Positive, none or negative.', ar: 'موجب أو لا ارتباط أو سالب.' } },
            { progressId: 60402, stage: 'two', title: { eu: 'Sendoa ala ahula', es: 'Fuerte o débil', en: 'Strong or weak', ar: 'قوي أم ضعيف' }, description: { eu: 'Bost aukera.', es: 'Cinco opciones.', en: 'Five options.', ar: 'خمسة خيارات.' } },
            { progressId: 60403, stage: 'two', title: { eu: 'Estimazioak', es: 'Estimaciones', en: 'Estimates', ar: 'التقديرات' }, description: { eu: 'Estimatu ŷ begiz.', es: 'Estima ŷ a ojo.', en: 'Estimate ŷ by eye.', ar: 'قدّر ŷ بالعين.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Estatistikako akats tipikoak', es: 'Errores típicos de estadística', en: 'Common mistakes in statistics', ar: 'الأخطاء الشائعة في الإحصاء' },
        levels: [
            { progressId: 60501, stage: 'centre', title: { eu: 'Zentralizazioa', es: 'Centralización', en: 'Centre', ar: 'النزعة المركزية' }, description: { eu: 'Datu taldekatuak, taldeak eta kuartilak.', es: 'Datos agrupados, grupos y cuartiles.', en: 'Grouped data, groups and quartiles.', ar: 'البيانات المجمّعة والمجموعات والربيعيات.' } },
            { progressId: 60502, stage: 'spread', title: { eu: 'Sakabanatzea', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'Bariantza, σ eta CV.', es: 'Varianza, σ y CV.', en: 'Variance, σ and CV.', ar: 'التباين وσ وCV.' } },
            { progressId: 60503, stage: 'two', title: { eu: 'Bi aldagai', es: 'Dos variables', en: 'Two variables', ar: 'متغيران' }, description: { eu: 'Erregresioa eta laginak.', es: 'Regresión y muestras.', en: 'Regression and samples.', ar: 'الانحدار والعينات.' } }
        ]
    }
]

export const statisticsGameProgressIds: number[] = levelProgressIds(statisticsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsGameSlugs: Record<StatisticsGameId, string> = { race: 'lasterketa', memory: 'memoria', box: 'kaxa', cloud: 'korrelazioa', detective: 'detektibea' }

export function statisticsGameModeForPath(pathname: string): StatisticsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['kaxa', 'caja'].includes(game)) return 'box'
    if (['korrelazioa', 'correlacion'].includes(game)) return 'cloud'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
