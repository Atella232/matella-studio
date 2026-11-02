import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak (4. DBH akademikoak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star.
   ========================================================================== */

export type PolynomialAkGameId = 'race' | 'memory' | 'laser' | 'match' | 'detective'

export const POLYNOMIAL_AK_GAME_RECORDS_KEY = 'matella-polinomikoak-dbh4ak-game-records'

export const polynomialAkGames: GameInfo<PolynomialAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zuzen eta kurben lasterketa', es: 'Carrera de rectas y curvas', en: 'Straight lines and curves race', ar: 'سباق المستقيمات والمنحنيات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 78101, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Straight lines', ar: 'المستقيمات' }, description: { eu: 'Malda, jatorriko ordenatua eta X ardatzarekiko ebakidura.', es: 'Pendiente, ordenada en el origen y corte con el eje X.', en: 'Slope, y-intercept and x-intercept.', ar: 'الميل والجزء المقطوع والتقاطع مع محور X.' } },
            { progressId: 78102, stage: 'parabolas', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina, maximoak eta minimoak, erroak.', es: 'Vértice, máximos y mínimos, raíces.', en: 'Vertex, maxima and minima, roots.', ar: 'الرأس والقيم العظمى والصغرى والجذور.' } },
            { progressId: 78103, stage: 'shifts', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' }, description: { eu: 'Forma kanonikoa, a parametroa, ebakidurak eta ukitzaileak.', es: 'Forma canónica, el parámetro a, cortes y tangentes.', en: 'Vertex form, the parameter a, intersections and tangents.', ar: 'الصورة القانونية والوسيط a والتقاطعات والمماسات.' } },
            { progressId: 78104, stage: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' }, description: { eu: 'Irudiak, erpinak, ekuazioak eta islatutako maximoak.', es: 'Imágenes, picos, ecuaciones y máximos reflejados.', en: 'Images, vertices, equations and reflected maxima.', ar: 'الصور والرؤوس والمعادلات والقيم العظمى المنعكسة.' } },
            { progressId: 78105, stage: 'rational', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'k, alderantzizko proportzionaltasuna eta asintotak.', es: 'k, proporcionalidad inversa y asíntotas.', en: 'k, inverse proportion and asymptotes.', ar: 'k والتناسب العكسي والمقاربات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Maldak, erpinak eta asintotak', es: 'Pendientes, vértices y asíntotas', en: 'Slopes, vertices and asymptotes', ar: 'الميول والرؤوس والمقاربات' },
        levels: [
            { progressId: 78201, stage: 'lines', title: { eu: 'Bi puntu eta malda', es: 'Dos puntos y la pendiente', en: 'Two points and the slope', ar: 'نقطتان والميل' }, description: { eu: '(1, 2) · (3, 8) ↔ 3', es: '(1, 2) · (3, 8) ↔ 3', en: '(1, 2) · (3, 8) ↔ 3', ar: '(1, 2) · (3, 8) ↔ 3' } },
            { progressId: 78202, stage: 'parabolas', title: { eu: 'Parabola eta erpina', es: 'Parábola y vértice', en: 'Parabola and vertex', ar: 'القطع ورأسه' }, description: { eu: 'x² − 6x + 5 ↔ (3, −4)', es: 'x² − 6x + 5 ↔ (3, −4)', en: 'x² − 6x + 5 ↔ (3, −4)', ar: 'x² − 6x + 5 ↔ (3, −4)' } },
            { progressId: 78203, stage: 'rational', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: '(2x + 1)/(x − 1) ↔ x = 1, y = 2', es: '(2x + 1)/(x − 1) ↔ x = 1, y = 2', en: '(2x + 1)/(x − 1) ↔ x = 1, y = 2', ar: '(2x + 1)/(x − 1) ↔ x = 1, y = 2' } }
        ]
    },
    {
        id: 'laser',
        title: { eu: 'Kurben laserra', es: 'Láser de curvas', en: 'Curve laser', ar: 'ليزر المنحنيات' },
        tagline: { eu: 'Doitu kurbaren parametroak eta jaurti: jomuga guztiak jo behar ditu.', es: 'Ajusta los parámetros de la curva y dispara: tiene que dar en todas las dianas.', en: 'Set the parameters of the curve and fire: it has to hit every target.', ar: 'اضبط معاملات المنحنى وأطلق: يجب أن يصيب كل الأهداف.' },
        skills: { eu: 'Parametroak eta grafikoak', es: 'Parámetros y gráficas', en: 'Parameters and graphs', ar: 'المعاملات والتمثيلات' },
        levels: [
            { progressId: 78301, stage: 'parabolas', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'y = a(x − h)² + k', es: 'y = a(x − h)² + k', en: 'y = a(x − h)² + k', ar: 'y = a(x − h)² + k' } },
            { progressId: 78302, stage: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' }, description: { eu: 'y = a|x − h| + k', es: 'y = a|x − h| + k', en: 'y = a|x − h| + k', ar: 'y = a|x − h| + k' } },
            { progressId: 78303, stage: 'rational', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'y = a/(x − h) + k', es: 'y = a/(x − h) + k', en: 'y = a/(x − h) + k', ar: 'y = a/(x − h) + k' } }
        ]
    },
    {
        id: 'match',
        title: { eu: 'Zein formula da?', es: '¿Qué fórmula es?', en: 'Which formula?', ar: 'أي صيغة؟' },
        tagline: { eu: 'Grafiko bat eta lau formula: aukeratu ona.', es: 'Una gráfica y cuatro fórmulas: elige la buena.', en: 'A graph and four formulas: choose the right one.', ar: 'تمثيل وأربع صيغ: اختر الصحيحة.' },
        skills: { eu: 'Grafikoak eta formulak lotzea', es: 'Relacionar gráficas y fórmulas', en: 'Matching graphs and formulas', ar: 'ربط التمثيلات بالصيغ' },
        levels: [
            { progressId: 78401, stage: 'lines', title: { eu: 'Zuzenak eta parabolak', es: 'Rectas y parábolas', en: 'Lines and parabolas', ar: 'المستقيمات والقطوع' }, description: { eu: 'Lekualdatuak.', es: 'Trasladadas.', en: 'Shifted.', ar: 'مُزاحة.' } },
            { progressId: 78402, stage: 'shifts', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Shifts', ar: 'الإزاحات' }, description: { eu: '|x − h| eta (x − h)².', es: '|x − h| y (x − h)².', en: '|x − h| and (x − h)².', ar: '|x − h| و(x − h)².' } },
            { progressId: 78403, stage: 'rational', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'y = a/(x − h) + k', es: 'y = a/(x − h) + k', en: 'y = a/(x − h) + k', ar: 'y = a/(x − h) + k' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Grafikoen detektibea', es: 'Detective de gráficas', en: 'Graphs detective', ar: 'مخبر التمثيلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Grafiko eta funtzioetako akats tipikoak', es: 'Errores típicos con gráficas y funciones', en: 'Common mistakes with graphs and functions', ar: 'الأخطاء الشائعة في التمثيلات والدوال' },
        levels: [
            { progressId: 78501, stage: 'parabolas', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina eta ebakidurak.', es: 'Vértice y cortes.', en: 'Vertex and cuts.', ar: 'الرأس والتقاطعات.' } },
            { progressId: 78502, stage: 'shifts', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Shifts', ar: 'الإزاحات' }, description: { eu: 'f(x − a), 2f(x) eta |x − h|.', es: 'f(x − a), 2f(x) y |x − h|.', en: 'f(x − a), 2f(x) and |x − h|.', ar: 'f(x − a) و2f(x) و|x − h|.' } },
            { progressId: 78503, stage: 'rational', title: { eu: 'Asintotak eta zuzenak', es: 'Asíntotas y rectas', en: 'Asymptotes and lines', ar: 'المقاربات والمستقيمات' }, description: { eu: 'Hiperbolak eta zuzenak.', es: 'Hipérbolas y rectas.', en: 'Hyperbolas and lines.', ar: 'الزائدة والمستقيمات.' } }
        ]
    }
]

export const polynomialAkGameProgressIds: number[] = levelProgressIds(polynomialAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomialAkGameSlugs: Record<PolynomialAkGameId, string> = { race: 'lasterketa', memory: 'memoria', laser: 'laserra', match: 'formula', detective: 'detektibea' }

export function polynomialAkGameModeForPath(pathname: string): PolynomialAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['laserra', 'laser'].includes(game)) return 'laser'
    if (['formula', 'formula-grafica'].includes(game)) return 'match'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
