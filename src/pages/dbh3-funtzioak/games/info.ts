import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzioak (3. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star. Four games
   belong to this topic (which graph it is, the story of a walk, the signs
   of a graph and the functions detective); the race and the memory are
   shared engines. Level descriptions are plain text.
   ========================================================================== */

export type Functions3GameId = 'race' | 'match' | 'story' | 'signs' | 'detective' | 'memory'

export const FUNCTIONS3_GAME_RECORDS_KEY = 'matella-funtzioak-dbh3-game-records'

export const functions3Games: GameInfo<Functions3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Functions race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 55101, stage: 'graphs', title: { eu: 'Balioak', es: 'Valores', en: 'Values', ar: 'القيم' }, description: { eu: 'f(x) eta definizio-eremua.', es: 'f(x) y dominio.', en: 'f(x) and domain.', ar: 'قيمة الدالة والمجال.' } },
            { progressId: 55102, stage: 'features', title: { eu: 'Ezaugarriak', es: 'Características', en: 'Features', ar: 'الخصائص' }, description: { eu: 'Ebaki-puntuak eta bira-puntuak.', es: 'Cortes y puntos de giro.', en: 'Cuts and turning points.', ar: 'التقاطعات ونقاط التحوّل.' } },
            { progressId: 55103, stage: 'linear', title: { eu: 'Linealak', es: 'Lineales', en: 'Linear', ar: 'الخطية' }, description: { eu: 'Malda eta proportzioak.', es: 'Pendiente y proporciones.', en: 'Slope and proportion.', ar: 'الميل والتناسب.' } },
            { progressId: 55104, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'n, ebakidurak eta tarifak.', es: 'n, cortes y tarifas.', en: 'n, crossings and prices.', ar: 'الجزء المقطوع والتقاطعات والتعريفات.' } },
            { progressId: 55105, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina eta ebazpenak.', es: 'Vértice y soluciones.', en: 'Vertex and solutions.', ar: 'الرأس والحلول.' } }
        ]
    },
    {
        id: 'match',
        title: { eu: 'Zein grafiko da?', es: '¿Qué gráfica es?', en: 'Which graph is it?', ar: 'أي تمثيل هذا؟' },
        tagline: { eu: 'Grafiko bat: aukeratu bere ekuazioa.', es: 'Una gráfica: elige su ecuación.', en: 'A graph: pick its equation.', ar: 'تمثيل بياني: اختر معادلته.' },
        skills: { eu: 'Grafikoa eta formula lotzea', es: 'Unir gráfica y fórmula', en: 'Linking graph and formula', ar: 'الربط بين التمثيل والصيغة' },
        levels: [
            { progressId: 55301, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda osoak.', es: 'Pendientes enteras.', en: 'Whole slopes.', ar: 'ميول صحيحة.' } },
            { progressId: 55302, stage: 'lines', title: { eu: 'Malda zatikiak', es: 'Pendientes fraccionarias', en: 'Fraction slopes', ar: 'ميول كسرية' }, description: { eu: 'Bi edo hiru eskuinera, gora edo behera.', es: 'Dos o tres a la derecha, arriba o abajo.', en: 'Two or three to the right, up or down.', ar: 'اثنان أو ثلاثة إلى اليمين، صعودًا أو نزولًا.' } },
            { progressId: 55303, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Irekiera eta erpina.', es: 'Abertura y vértice.', en: 'Opening and vertex.', ar: 'الانفتاح والرأس.' } }
        ]
    },
    {
        id: 'story',
        title: { eu: 'Ibilaldiaren istorioa', es: 'La historia del paseo', en: 'The story of a walk', ar: 'قصة النزهة' },
        tagline: { eu: 'Ibilaldi bat hitzez: aukeratu hura kontatzen duen grafikoa.', es: 'Un paseo contado con palabras: elige la gráfica que lo cuenta.', en: 'A walk told in words: pick the graph that tells it.', ar: 'نزهة موصوفة بالكلمات: اختر التمثيل الذي يرويها.' },
        skills: { eu: 'Grafikoak irakurtzea', es: 'Leer gráficas', en: 'Reading graphs', ar: 'قراءة التمثيلات' },
        levels: [
            { progressId: 55401, stage: 'graphs', title: { eu: 'Hiru zati', es: 'Tres tramos', en: 'Three stretches', ar: 'ثلاثة أجزاء' }, description: { eu: 'Gora, horizontal, behera.', es: 'Sube, horizontal, baja.', en: 'Up, flat, down.', ar: 'صعود وأفقي ونزول.' } },
            { progressId: 55402, stage: 'features', title: { eu: 'Azkar ala poliki', es: 'Deprisa o despacio', en: 'Fast or slow', ar: 'بسرعة أم ببطء' }, description: { eu: 'Malda handia ala txikia.', es: 'Pendiente grande o pequeña.', en: 'Steep or gentle.', ar: 'ميل كبير أم صغير.' } },
            { progressId: 55403, stage: 'features', title: { eu: 'Lau zati', es: 'Cuatro tramos', en: 'Four stretches', ar: 'أربعة أجزاء' }, description: { eu: 'Istorio luzeagoak.', es: 'Historias más largas.', en: 'Longer stories.', ar: 'قصص أطول.' } }
        ]
    },
    {
        id: 'signs',
        title: { eu: 'Zeinuen ehiztaria', es: 'Cazador de signos', en: 'Sign hunter', ar: 'صائد الإشارات' },
        tagline: { eu: 'Grafiko bat: esan bere koefizienteen zeinuak.', es: 'Una gráfica: di los signos de sus coeficientes.', en: 'A graph: say the signs of its coefficients.', ar: 'تمثيل بياني: قل إشارات معاملاته.' },
        skills: { eu: 'Koefizienteak grafikoan', es: 'Coeficientes en la gráfica', en: 'Coefficients on the graph', ar: 'المعاملات في التمثيل' },
        levels: [
            { progressId: 55501, stage: 'linear', title: { eu: 'm eta n', es: 'm y n', en: 'm and n', ar: 'الميل والجزء المقطوع' }, description: { eu: 'Malda eta Y ardatza.', es: 'Pendiente y eje Y.', en: 'Slope and Y axis.', ar: 'الميل ومحور Y.' } },
            { progressId: 55502, stage: 'quadratic', title: { eu: 'a eta c', es: 'a y c', en: 'a and c', ar: 'المعاملان \u2066a\u2069 و\u2066c\u2069' }, description: { eu: 'Irekiera eta Y ardatza.', es: 'Abertura y eje Y.', en: 'Opening and Y axis.', ar: 'الانفتاح ومحور Y.' } },
            { progressId: 55503, stage: 'quadratic', title: { eu: 'Erpinaren aldea', es: 'El lado del vértice', en: 'The side of the vertex', ar: 'جهة الرأس' }, description: { eu: 'Irekiera eta erpina.', es: 'Abertura y vértice.', en: 'Opening and vertex.', ar: 'الانفتاح والرأس.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Funtzioen detektibea', es: 'Detective de funciones', en: 'Functions detective', ar: 'مخبر الدوال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Funtzioetako akats tipikoak', es: 'Errores típicos de funciones', en: 'Common mistakes with functions', ar: 'الأخطاء الشائعة في الدوال' },
        levels: [
            { progressId: 55601, stage: 'features', title: { eu: 'Grafikoak', es: 'Gráficas', en: 'Graphs', ar: 'التمثيلات' }, description: { eu: 'Balioak, ebaki-puntuak eta maximoak.', es: 'Valores, cortes y máximos.', en: 'Values, cuts and maxima.', ar: 'القيم والتقاطعات والعظمى.' } },
            { progressId: 55602, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda, n eta ebakidurak.', es: 'Pendiente, n y cortes.', en: 'Slope, n and crossings.', ar: 'الميل والجزء المقطوع والتقاطعات.' } },
            { progressId: 55603, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina eta diskriminatzailea.', es: 'Vértice y discriminante.', en: 'Vertex and discriminant.', ar: 'الرأس والمميّز.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu funtzio bakoitza bere datuarekin.', es: 'Une cada función con su dato.', en: 'Match each function with its value.', ar: 'صِل كل دالة بمعطاها.' },
        skills: { eu: 'Funtzioak buruz', es: 'Funciones de cabeza', en: 'Functions in your head', ar: 'الدوال ذهنيًا' },
        levels: [
            { progressId: 55201, stage: 'graphs', title: { eu: 'Balioak', es: 'Valores', en: 'Values', ar: 'القيم' }, description: { eu: 'Funtzioa eta x ↔ y', es: 'Función y x ↔ y', en: 'Function and x ↔ y', ar: 'الدالة و\u2066x ↔ y\u2069' } },
            { progressId: 55202, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Zuzena ↔ m eta n', es: 'Recta ↔ m y n', en: 'Line ↔ m and n', ar: 'المستقيم ↔ \u2066m\u2069 و\u2066n\u2069' } },
            { progressId: 55203, stage: 'quadratic', title: { eu: 'Erpinak', es: 'Vértices', en: 'Vertices', ar: 'الرؤوس' }, description: { eu: 'Parabola ↔ erpina', es: 'Parábola ↔ vértice', en: 'Parabola ↔ vertex', ar: 'القطع ↔ الرأس' } }
        ]
    }
]

export const functions3GameProgressIds: number[] = levelProgressIds(functions3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const functions3GameSlugs: Record<Functions3GameId, string> = { race: 'lasterketa', match: 'zein-grafiko', story: 'istorioa', signs: 'zeinuak', detective: 'detektibea', memory: 'memoria' }

export function functions3GameModeForPath(pathname: string): Functions3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zein-grafiko', 'que-grafica'].includes(game)) return 'match'
    if (['istorioa', 'historia'].includes(game)) return 'story'
    if (['zeinuak', 'signos'].includes(game)) return 'signs'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
