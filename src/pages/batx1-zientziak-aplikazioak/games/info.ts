import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Deribatuaren aplikazioak (Batxilergoa 1 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Four games of its own (rises or falls, hunt the
   extrema, ∪ or ∩ and the detective), the race and the memory.
   ========================================================================== */

export type BachApplicationsGameId = 'race' | 'updown' | 'extrema' | 'shape' | 'detective' | 'memory'

export const BACH_APPLICATIONS_GAME_RECORDS_KEY = 'matella-aplikazioak-batx1z-game-records'

export const bachApplicationsGames: GameInfo<BachApplicationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aplikazioen lasterketa', es: 'Carrera de aplicaciones', en: 'Applications race', ar: 'سباق التطبيقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 111401, stage: 'monotony', title: { eu: 'Hazkundea', es: 'Crecimiento', en: 'Increase', ar: 'التزايد' }, description: { eu: 'Non bihurtzen den eta parametroak.', es: 'Dónde gira y parámetros.', en: 'Where it turns and parameters.', ar: 'أين ينعطف والوسائط.' } },
            { progressId: 111402, stage: 'extremes', title: { eu: 'Maximoak eta minimoak', es: 'Máximos y mínimos', en: 'Maxima and minima', ar: 'العظمى والصغرى' }, description: { eu: 'Muturraren x, haren balioa eta f″.', es: 'La x del extremo, su valor y f″.', en: 'The x of the extremum, its value and f″.', ar: 'إحداثي x للقيمة القصوى وقيمتها وf″.' } },
            { progressId: 111403, stage: 'curvature', title: { eu: 'Kurbadura', es: 'Curvatura', en: 'Concavity', ar: 'التقعّر' }, description: { eu: 'Inflexio-puntuak eta parametroak.', es: 'Puntos de inflexión y parámetros.', en: 'Points of inflection and parameters.', ar: 'نقاط الانعطاف والوسائط.' } },
            { progressId: 111404, stage: 'optimization', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' }, description: { eu: 'Biderkadura, tartea eta mozkina.', es: 'Producto, intervalo y beneficio.', en: 'Product, interval and profit.', ar: 'الجداء والفترة والربح.' } },
            { progressId: 111405, stage: 'graphs', title: { eu: 'Irudikapena', es: 'Representación', en: 'Sketching', ar: 'الرسم' }, description: { eu: 'Muturrak zenbatu, asintotak eta esponentzialak.', es: 'Contar extremos, asíntotas y exponenciales.', en: 'Counting extrema, asymptotes and exponentials.', ar: 'عدّ القيم القصوى والمقاربات والأسية.' } }
        ]
    },
    {
        id: 'updown',
        title: { eu: 'Igo ala jaitsi', es: 'Sube o baja', en: 'Up or down', ar: 'تصعد أم تنزل' },
        tagline: { eu: 'f′ deribatuaren zeinu-taula eta hiru grafiko: zein da f?', es: 'La tabla de signos de f′ y tres gráficas: ¿cuál es f?', en: 'The sign chart of f′ and three graphs: which one is f?', ar: 'جدول إشارات f′ وثلاثة رسوم: أيها f؟' },
        skills: { eu: 'f′ deribatuaren zeinutik f funtzioaren forma', es: 'Del signo de f′ a la forma de f', en: 'From the sign of f′ to the shape of f', ar: 'من إشارة f′ إلى شكل f' },
        levels: [
            { progressId: 111501, stage: 'monotony', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Zeinu-aldaketa bakarra.', es: 'Un solo cambio de signo.', en: 'A single change of sign.', ar: 'تغير واحد في الإشارة.' } },
            { progressId: 111502, stage: 'monotony', title: { eu: 'Kubikoak', es: 'Cúbicas', en: 'Cubics', ar: 'الدوال التكعيبية' }, description: { eu: 'Bi zeinu-aldaketa.', es: 'Dos cambios de signo.', en: 'Two changes of sign.', ar: 'تغيران في الإشارة.' } },
            { progressId: 111503, stage: 'extremes', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Puntu lauak eta izate-eremuko zuloak.', es: 'Puntos planos y huecos del dominio.', en: 'Flat points and gaps in the domain.', ar: 'نقاط مستوية وفراغات في المجال.' } }
        ]
    },
    {
        id: 'extrema',
        title: { eu: 'Ehizatu muturrak', es: 'Caza los extremos', en: 'Hunt the extrema', ar: 'اصطد القيم القصوى' },
        tagline: { eu: 'Grafikoa f′ da, ez f: zein puntutan du f funtzioak maximoa, minimoa edo bat ere ez?', es: 'La gráfica es f′, no f: ¿en qué punto tiene f un máximo, un mínimo o ninguno?', en: 'The graph is f′, not f: at which point does f have a maximum, a minimum or neither?', ar: 'الرسم هو f′ لا f: عند أي نقطة لـ f قيمة عظمى أو صغرى أو لا هذه ولا تلك؟' },
        skills: { eu: 'f′ deribatuaren grafikoa irakurtzea', es: 'Leer la gráfica de f′', en: 'Reading the graph of f′', ar: 'قراءة رسم f′' },
        levels: [
            { progressId: 111601, stage: 'extremes', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'f′ deribatuak bi zero ditu.', es: 'f′ tiene dos ceros.', en: 'f′ has two zeros.', ar: 'لـ f′ صفران.' } },
            { progressId: 111602, stage: 'extremes', title: { eu: 'Kubikoak', es: 'Cúbicas', en: 'Cubics', ar: 'الدوال التكعيبية' }, description: { eu: 'f′ deribatuak hiru zero ditu.', es: 'f′ tiene tres ceros.', en: 'f′ has three zeros.', ar: 'لـ f′ ثلاثة أصفار.' } },
            { progressId: 111603, stage: 'extremes', title: { eu: 'Zero bikoitzak', es: 'Ceros dobles', en: 'Double zeros', ar: 'الأصفار المضاعفة' }, description: { eu: 'f′ deribatuak ardatza ukitu besterik ez du egiten.', es: 'f′ solo toca el eje.', en: 'f′ only touches the axis.', ar: 'f′ تلمس المحور فقط.' } }
        ]
    },
    {
        id: 'shape',
        title: { eu: '∪ ala ∩?', es: '¿∪ o ∩?', en: '∪ or ∩?', ar: '∪ أم ∩؟' },
        tagline: { eu: 'Puntu batean, kurba ahurra (∪) da, ganbila (∩) ala inflexio-puntu bat?', es: 'En un punto, ¿la curva es cóncava (∪), convexa (∩) o un punto de inflexión?', en: 'At a point, is the curve concave up (∪), concave down (∩) or a point of inflection?', ar: 'عند نقطة، هل المنحنى مقعّر نحو الأعلى (∪) أو نحو الأسفل (∩) أو نقطة انعطاف؟' },
        skills: { eu: 'Kurbadura f″ deribatuarekin', es: 'La curvatura con f″', en: 'Concavity with f″', ar: 'التقعّر بـ f″' },
        levels: [
            { progressId: 111651, stage: 'curvature', title: { eu: 'Grafikoak', es: 'Gráficas', en: 'Graphs', ar: 'الرسوم' }, description: { eu: 'Begiratu kurbari.', es: 'Mira la curva.', en: 'Look at the curve.', ar: 'انظر إلى المنحنى.' } },
            { progressId: 111652, stage: 'curvature', title: { eu: 'f″ formula', es: 'La fórmula de f″', en: 'The formula of f″', ar: 'صيغة f″' }, description: { eu: 'f″ deribatuaren zeinua puntuan.', es: 'El signo de f″ en el punto.', en: 'The sign of f″ at the point.', ar: 'إشارة f″ عند النقطة.' } },
            { progressId: 111653, stage: 'curvature', title: { eu: 'f funtziotik', es: 'Desde f', en: 'From f', ar: 'من f' }, description: { eu: 'Deribatu bi aldiz.', es: 'Deriva dos veces.', en: 'Differentiate twice.', ar: 'اشتق مرتين.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aplikazioen detektibea', es: 'Detective de aplicaciones', en: 'Applications detective', ar: 'مخبر التطبيقات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 111701, stage: 'monotony', title: { eu: 'Hazkundea eta muturrak', es: 'Crecimiento y extremos', en: 'Increase and extrema', ar: 'التزايد والقيم القصوى' }, description: { eu: 'f ala f′, zuloak, x³ eta f″.', es: 'f o f′, huecos, x³ y f″.', en: 'f or f′, gaps, x³ and f″.', ar: 'f أم f′، والفراغات، وx³، وf″.' } },
            { progressId: 111702, stage: 'curvature', title: { eu: 'Kurbadura eta koefizienteak', es: 'Curvatura y coeficientes', en: 'Concavity and coefficients', ar: 'التقعّر والمعاملات' }, description: { eu: 'x⁴, f′ ala f″, eta puntuaren altuera.', es: 'x⁴, f′ o f″, y la altura del punto.', en: 'x⁴, f′ or f″, and the height of the point.', ar: 'x⁴، وf′ أم f″، وارتفاع النقطة.' } },
            { progressId: 111703, stage: 'optimization', title: { eu: 'Optimizazioa eta grafikoak', es: 'Optimización y gráficas', en: 'Optimisation and graphs', ar: 'الاستمثال والرسوم' }, description: { eu: 'Ertzak, x ala balioa, perimetroa eta zuloak.', es: 'Bordes, x o valor, perímetro y huecos.', en: 'Edges, x or value, perimeter and gaps.', ar: 'الطرفان، وx أم القيمة، والمحيط، والفراغات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren puntu edo balio garrantzitsua.', es: 'Encuentra las parejas: una función y su punto o valor clave.', en: 'Find the pairs: a function and its key point or value.', ar: 'اعثر على الأزواج: دالة ونقطتها أو قيمتها المهمة.' },
        skills: { eu: 'Muturrak, inflexioak eta optimoak', es: 'Extremos, inflexiones y óptimos', en: 'Extrema, inflections and optima', ar: 'القيم القصوى والانعطاف والقيم المثلى' },
        levels: [
            { progressId: 111801, stage: 'extremes', title: { eu: 'Muturrak', es: 'Extremos', en: 'Extrema', ar: 'القيم القصوى' }, description: { eu: 'x² − 6x ↔ x = 3', es: 'x² − 6x ↔ x = 3', en: 'x² − 6x ↔ x = 3', ar: 'x² − 6x ↔ x = 3' } },
            { progressId: 111802, stage: 'curvature', title: { eu: 'Inflexioak', es: 'Inflexiones', en: 'Inflections', ar: 'الانعطاف' }, description: { eu: 'x³ − 6x² ↔ x = 2', es: 'x³ − 6x² ↔ x = 2', en: 'x³ − 6x² ↔ x = 2', ar: 'x³ − 6x² ↔ x = 2' } },
            { progressId: 111803, stage: 'optimization', title: { eu: 'Optimoak', es: 'Óptimos', en: 'Optima', ar: 'القيم المثلى' }, description: { eu: 'x(10 − x) ↔ 25', es: 'x(10 − x) ↔ 25', en: 'x(10 − x) ↔ 25', ar: 'x(10 − x) ↔ 25' } }
        ]
    }
]

export const bachApplicationsGameProgressIds: number[] = levelProgressIds(bachApplicationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachApplicationsGameSlugs: Record<BachApplicationsGameId, string> = { race: 'lasterketa', updown: 'gora-behera', extrema: 'muturrak', shape: 'kurbadura', detective: 'detektibea', memory: 'memoria' }

export function bachApplicationsGameModeForPath(pathname: string): BachApplicationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['gora-behera', 'sube-baja'].includes(game)) return 'updown'
    if (['muturrak', 'extremos'].includes(game)) return 'extrema'
    if (['kurbadura', 'curvatura'].includes(game)) return 'shape'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
