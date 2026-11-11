import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachApplicationsGames } from '../../batx1-zientziak-aplikazioak/games/info.ts'
import { bachLimitsGames } from '../../batx1-zientziak-limiteak/games/info.ts'
import type { Bach2SketchStageId } from '../lessons.tsx'

/* ==========================================================================
   Adierazpena (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (which graph is it?, read the
   derivative, asymptotes in sight) and the detective, the race and the
   memory, and two games of 1.º (up or down? from Aplikazioak and hunt the
   asymptotes from Limiteak), with their texts and levels but the stages
   and progress ids of this unit.
   ========================================================================== */

export type Bach2SketchGameId = 'race' | 'graph' | 'read' | 'sight' | 'detective' | 'memory' | 'updown' | 'asymptote'

export const BACH2_SKETCH_GAME_RECORDS_KEY = 'matella-adierazpena-batx2z-game-records'

/** A 1.º game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: 'updown' | 'asymptote', stages: Bach2SketchStageId[], firstId: number): GameInfo<Bach2SketchGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bach2SketchGames: GameInfo<Bach2SketchGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Adierazpenaren lasterketa', es: 'Carrera de la representación', en: 'Curve-sketching race', ar: 'سباق التمثيل البياني' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 125401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Asintota bertikalak, horizontalak eta zeiharrak.', es: 'Asíntotas verticales, horizontales y oblicuas.', en: 'Vertical, horizontal and oblique asymptotes.', ar: 'المقاربات الرأسية والأفقية والمائلة.' } },
            { progressId: 125402, stage: 'study', title: { eu: 'Aurretiko azterketa', es: 'Estudio previo', en: 'The study first', ar: 'الدراسة المسبقة' }, description: { eu: 'Simetria, periodoa eta izate-eremuaren ertza.', es: 'Simetría, periodo y borde del dominio.', en: 'Symmetry, period and the edge of the domain.', ar: 'التناظر والدور وحافة المجال.' } },
            { progressId: 125403, stage: 'explog', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Maximoa, logaritmoaren asintota eta horizontala.', es: 'Máximo, asíntota del logaritmo y horizontal.', en: 'Maximum, the asymptote of a logarithm and a horizontal one.', ar: 'القيمة العظمى ومقارب اللوغاريتم والأفقي.' } },
            { progressId: 125404, stage: 'roots', title: { eu: 'Erroak eta zatiak', es: 'Raíces y trozos', en: 'Roots and pieces', ar: 'الجذور والأجزاء' }, description: { eu: 'Zeiharra errotik, uhinaren maximoa eta jarraitutasuna.', es: 'Oblicua con raíz, máximo de la onda y continuidad.', en: 'An oblique with a root, the top of a wave and continuity.', ar: 'مائل مع جذر وقمة الموجة والاتصال.' } },
            { progressId: 125405, stage: 'reading', title: { eu: 'Grafikoak irakurtzea', es: 'Leer gráficas', en: 'Reading graphs', ar: 'قراءة الرسوم' }, description: { eu: 'Puntak, maximoa eta inflexioa f′ deribatutik.', es: 'Picos, máximo e inflexión a partir de f′.', en: 'Corners, maximum and inflection from f′.', ar: 'الزوايا والقيمة العظمى والانعطاف انطلاقًا من f′.' } }
        ]
    },
    {
        id: 'graph',
        title: { eu: 'Zein grafiko da?', es: '¿Qué gráfica es?', en: 'Which graph is it?', ar: 'أي رسم هو؟' },
        tagline: { eu: 'Formula bat eta hiru zirriborro: aukeratu berea izate-eremuari, asintotei, zeinuari edo simetriari begiratuta.', es: 'Una fórmula y tres esbozos: elige el suyo mirando el dominio, las asíntotas, el signo o la simetría.', en: 'A formula and three sketches: choose its own by looking at the domain, the asymptotes, the sign or the symmetry.', ar: 'صيغة وثلاثة رسوم تقريبية: اختر رسمها بالنظر إلى المجال أو المقاربات أو الإشارة أو التناظر.' },
        skills: { eu: 'Grafikoa marraztu gabe ezagutzea', es: 'Reconocer la gráfica sin dibujarla', en: 'Recognising the graph without drawing it', ar: 'التعرف إلى الرسم دون رسمه' },
        levels: [
            { progressId: 125501, stage: 'review', title: { eu: 'Arrazionalak', es: 'Racionales', en: 'Rational', ar: 'الكسرية' }, description: { eu: 'Hiperbolak, kubikoak eta funtzio bikoitiak.', es: 'Hipérbolas, cúbicas y funciones pares.', en: 'Hyperbolas, cubics and even functions.', ar: 'قطوع زائدة ودوال تكعيبية وزوجية.' } },
            { progressId: 125502, stage: 'explog', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الأسية واللوغاريتمات' }, description: { eu: 'Erroak, logaritmoak eta kanpaia.', es: 'Raíces, logaritmos y la campana.', en: 'Roots, logarithms and the bell.', ar: 'الجذور واللوغاريتمات والجرس.' } },
            { progressId: 125503, stage: 'reading', title: { eu: 'Denak', es: 'Todo', en: 'Everything', ar: 'الكل' }, description: { eu: 'Balio absolutua eta uhinak ere bai.', es: 'También valor absoluto y ondas.', en: 'Absolute values and waves too.', ar: 'والقيمة المطلقة والموجات أيضًا.' } }
        ]
    },
    {
        id: 'read',
        title: { eu: 'Irakurri deribatua', es: 'Lee la derivada', en: 'Read the derivative', ar: 'اقرأ المشتقة' },
        tagline: { eu: 'f′ deribatuaren grafikoa, ez f funtzioarena: non da f gorakorra, non du maximoa, non inflexioa?', es: 'La gráfica de f′, no la de f: ¿dónde crece f, dónde tiene su máximo, dónde la inflexión?', en: 'The graph of f′, not of f: where does f increase, where is its maximum, where is the inflection?', ar: 'رسم f′ لا رسم f: أين تتزايد f، وأين قيمتها العظمى، وأين انعطافها؟' },
        skills: { eu: 'f′ deribatuaren zeinua eta muturrak', es: 'El signo y los extremos de f′', en: 'The sign and the extrema of f′', ar: 'إشارة f′ وقيمها القصوى' },
        levels: [
            { progressId: 125601, stage: 'reading', title: { eu: 'Muturrak', es: 'Extremos', en: 'Extrema', ar: 'القيم القصوى' }, description: { eu: 'f′ zuzena edo parabola.', es: 'f′ recta o parábola.', en: 'f′ a line or a parabola.', ar: 'f′ مستقيم أو قطع مكافئ.' } },
            { progressId: 125602, stage: 'reading', title: { eu: 'Hazkundea eta inflexioa', es: 'Crecimiento e inflexión', en: 'Increase and inflection', ar: 'التزايد والانعطاف' }, description: { eu: 'Tarteak eta erpina.', es: 'Intervalos y vértice.', en: 'Intervals and the vertex.', ar: 'الفترات والرأس.' } },
            { progressId: 125603, stage: 'reading', title: { eu: 'Zenbat mutur?', es: '¿Cuántos extremos?', en: 'How many extrema?', ar: 'كم قيمة قصوى؟' }, description: { eu: 'f′ deribatuak ardatza ukitzen badu, ez dago muturrik.', es: 'Si f′ solo toca el eje, no hay extremo.', en: 'If f′ only touches the axis, there is no extremum.', ar: 'إذا لمست f′ المحور فقط فلا قيمة قصوى.' } }
        ]
    },
    {
        id: 'sight',
        title: { eu: 'Asintotak begi-bistan', es: 'Asíntotas a la vista', en: 'Asymptotes in sight', ar: 'المقاربات في الأفق' },
        tagline: { eu: 'Funtzio bat eta asintota-zerrenda bat: aukeratu osoa eta zuzena den zerrenda.', es: 'Una función y tres listas de asíntotas: elige la que está completa y bien.', en: 'A function and three lists of asymptotes: choose the one that is complete and right.', ar: 'دالة وثلاث قوائم من المقاربات: اختر القائمة الكاملة الصحيحة.' },
        skills: { eu: 'Ez falta, ez soberan', es: 'Que no falte ni sobre ninguna', en: 'None missing, none too many', ar: 'لا ناقص ولا زائد' },
        levels: [
            { progressId: 125651, stage: 'review', title: { eu: 'Arrazionalak', es: 'Racionales', en: 'Rational', ar: 'الكسرية' }, description: { eu: 'Bertikalak, horizontalak eta zeiharrak.', es: 'Verticales, horizontales y oblicuas.', en: 'Vertical, horizontal and oblique.', ar: 'رأسية وأفقية ومائلة.' } },
            { progressId: 125652, stage: 'explog', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الأسية واللوغاريتمات' }, description: { eu: 'Alde batekoak ere bai.', es: 'También las de un solo lado.', en: 'One-sided ones too.', ar: 'وذات الجهة الواحدة أيضًا.' } },
            { progressId: 125653, stage: 'roots', title: { eu: 'Erroak eta denak', es: 'Raíces y todo', en: 'Roots and everything', ar: 'الجذور والكل' }, description: { eu: 'Zeihar bat alde bakoitzean.', es: 'Una oblicua a cada lado.', en: 'An oblique one on each side.', ar: 'مقارب مائل في كل جهة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Adierazpenaren detektibea', es: 'Detective de la representación', en: 'Curve-sketching detective', ar: 'مخبر التمثيل البياني' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: '2. mailako akats ohikoak', es: 'Los errores típicos de 2.º', en: 'The typical mistakes of 2nd year', ar: 'الأخطاء الشائعة في السنة الثانية' },
        levels: [
            { progressId: 125701, stage: 'study', title: { eu: 'Aurretiko azterketa', es: 'Estudio previo', en: 'The study first', ar: 'الدراسة المسبقة' }, description: { eu: 'Zuloak, simetria, posizioa eta zeiharra.', es: 'Agujeros, simetría, posición y oblicua.', en: 'Holes, symmetry, position and oblique.', ar: 'الفجوات والتناظر والوضع والمائل.' } },
            { progressId: 125702, stage: 'roots', title: { eu: 'Familiak', es: 'Familias', en: 'Families', ar: 'العائلات' }, description: { eu: 'Logaritmoa, esponentziala, erroa eta periodoa.', es: 'Logaritmo, exponencial, raíz y periodo.', en: 'Logarithm, exponential, root and period.', ar: 'اللوغاريتم والأسية والجذر والدور.' } },
            { progressId: 125703, stage: 'reading', title: { eu: 'Grafikoak irakurtzea', es: 'Leer gráficas', en: 'Reading graphs', ar: 'قراءة الرسوم' }, description: { eu: 'f(|x|), f′ deribatuaren erpina, ukitzeak eta puntak.', es: 'f(|x|), vértice de f′, roces y picos.', en: 'f(|x|), the vertex of f′, touches and corners.', ar: 'f(|x|) ورأس f′ والتماس والزوايا.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Adierazpenaren memoria', es: 'Memoria de la representación', en: 'Curve-sketching memory', ar: 'ذاكرة التمثيل البياني' },
        tagline: { eu: 'Egin bikoteak: funtzio bat eta bere asintota, edo balio absolutu bat eta bere puntak.', es: 'Haz parejas: una función y su asíntota, o un valor absoluto y sus picos.', en: 'Make pairs: a function and its asymptote, or an absolute value and its corners.', ar: 'كوّن أزواجًا: دالة ومقاربها، أو قيمة مطلقة وزواياها.' },
        skills: { eu: 'Asintotak eta puntak begiratu batean', es: 'Asíntotas y picos de un vistazo', en: 'Asymptotes and corners at a glance', ar: 'المقاربات والزوايا بنظرة' },
        levels: [
            { progressId: 125801, stage: 'review', title: { eu: 'Bertikalak', es: 'Verticales', en: 'Vertical', ar: 'الرأسية' }, description: { eu: '1/(x − 3) ↔ x = 3', es: '1/(x − 3) ↔ x = 3', en: '1/(x − 3) ↔ x = 3', ar: '1/(x − 3) ↔ x = 3' } },
            { progressId: 125802, stage: 'study', title: { eu: 'Horizontalak eta zeiharrak', es: 'Horizontales y oblicuas', en: 'Horizontal and oblique', ar: 'الأفقية والمائلة' }, description: { eu: 'x²/(x − 1) ↔ y = x + 1', es: 'x²/(x − 1) ↔ y = x + 1', en: 'x²/(x − 1) ↔ y = x + 1', ar: 'x²/(x − 1) ↔ y = x + 1' } },
            { progressId: 125803, stage: 'reading', title: { eu: 'Puntak', es: 'Picos', en: 'Corners', ar: 'الزوايا' }, description: { eu: '|x² − 1| ↔ x = ±1', es: '|x² − 1| ↔ x = ±1', en: '|x² − 1| ↔ x = ±1', ar: '|x² − 1| ↔ x = ±1' } }
        ]
    },
    reused(bachApplicationsGames.find((game) => game.id === 'updown')!, 'updown', ['reading', 'reading', 'reading'], 125811),
    reused(bachLimitsGames.find((game) => game.id === 'asymptote')!, 'asymptote', ['review', 'review', 'review'], 125821)
]

export const bach2SketchGameProgressIds: number[] = levelProgressIds(bach2SketchGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2SketchGameSlugs: Record<Bach2SketchGameId, string> = { race: 'lasterketa', graph: 'grafikoa', read: 'deribatua', sight: 'asintotak', detective: 'detektibea', memory: 'memoria', updown: 'gora-behera', asymptote: 'ehizatu' }

export function bach2SketchGameModeForPath(pathname: string): Bach2SketchGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['grafikoa', 'grafica'].includes(game)) return 'graph'
    if (['deribatua', 'derivada'].includes(game)) return 'read'
    if (['asintotak', 'asintotas'].includes(game)) return 'sight'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['gora-behera', 'sube-baja'].includes(game)) return 'updown'
    if (['ehizatu', 'caza'].includes(game)) return 'asymptote'
    return 'hub'
}
