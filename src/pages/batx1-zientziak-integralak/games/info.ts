import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Integralak (Batxilergoa 1 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (whose antiderivative is it, adjust
   the constant, area by eye and the detective), the race and the memory.
   ========================================================================== */

export type BachIntegralsGameId = 'race' | 'primitive' | 'adjust' | 'estimate' | 'detective' | 'memory'

export const BACH_INTEGRALS_GAME_RECORDS_KEY = 'matella-integralak-batx1z-game-records'

export const bachIntegralsGames: GameInfo<BachIntegralsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Integralen lasterketa', es: 'Carrera de integrales', en: 'Integrals race', ar: 'سباق التكاملات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 112401, stage: 'primitives', title: { eu: 'Jatorrizkoak', es: 'Primitivas', en: 'Antiderivatives', ar: 'الدوال الأصلية' }, description: { eu: 'k konstantea, berretzailea eta koefizientea.', es: 'La constante k, el exponente y el coeficiente.', en: 'The constant k, the exponent and the coefficient.', ar: 'الثابت k والأس والمعامل.' } },
            { progressId: 112402, stage: 'immediate', title: { eu: 'Berehalakoak', es: 'Inmediatas', en: 'Basic', ar: 'المباشرة' }, description: { eu: 'Esponentziala, logaritmoa eta arku tangentea.', es: 'Exponencial, logaritmo y arcotangente.', en: 'Exponential, logarithm and arctangent.', ar: 'الأسية واللوغاريتم وقوس الظل.' } },
            { progressId: 112403, stage: 'compound', title: { eu: 'Konposatuak', es: 'Compuestas', en: 'Composite', ar: 'المركّبة' }, description: { eu: 'Aurretik doan zenbakia doitzea.', es: 'Ajustar el número de delante.', en: 'Adjusting the number in front.', ar: 'ضبط العدد في المقدمة.' } },
            { progressId: 112404, stage: 'definite', title: { eu: 'Integral mugatua', es: 'Integral definida', en: 'Definite integral', ar: 'التكامل المحدد' }, description: { eu: 'Barrow eta tartea zatitzea.', es: 'Barrow y partir el intervalo.', en: 'Barrow and splitting the interval.', ar: 'بارو وتقسيم الفترة.' } },
            { progressId: 112405, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Kurba baten azpian eta bi kurben artean.', es: 'Bajo una curva y entre dos curvas.', en: 'Under a curve and between two curves.', ar: 'تحت منحنى وبين منحنيين.' } }
        ]
    },
    {
        id: 'primitive',
        title: { eu: 'Noren jatorrizkoa da?', es: '¿De quién es la primitiva?', en: 'Whose antiderivative is it?', ar: 'لمن هذه الدالة الأصلية؟' },
        tagline: { eu: 'f funtzioaren grafikoa eta hiru grafiko: zein da F, haren jatorrizkoa?', es: 'La gráfica de f y tres gráficas: ¿cuál es F, su primitiva?', en: 'The graph of f and three graphs: which one is F, its antiderivative?', ar: 'رسم f وثلاثة رسوم: أيها F، دالتها الأصلية؟' },
        skills: { eu: 'f funtzioaren altuera F funtzioaren malda da', es: 'La altura de f es la pendiente de F', en: 'The height of f is the slope of F', ar: 'ارتفاع f هو ميل F' },
        levels: [
            { progressId: 112501, stage: 'primitives', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'f zuzena da; F, parabola.', es: 'f es una recta; F, una parábola.', en: 'f is a line; F, a parabola.', ar: 'f مستقيم، وF قطع مكافئ.' } },
            { progressId: 112502, stage: 'primitives', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'f parabola da; F, kubikoa.', es: 'f es una parábola; F, una cúbica.', en: 'f is a parabola; F, a cubic.', ar: 'f قطع مكافئ، وF تكعيبية.' } },
            { progressId: 112503, stage: 'immediate', title: { eu: 'Elementalak', es: 'Elementales', en: 'Elementary', ar: 'الأساسية' }, description: { eu: 'Sinua, kosinua, esponentziala eta 1/x.', es: 'Seno, coseno, exponencial y 1/x.', en: 'Sine, cosine, exponential and 1/x.', ar: 'الجيب وجيب التمام والأسية و1/x.' } }
        ]
    },
    {
        id: 'adjust',
        title: { eu: 'Doitu konstantea', es: 'Ajusta la constante', en: 'Adjust the constant', ar: 'اضبط الثابت' },
        tagline: { eu: 'Hiru jatorrizko, aurrean zenbaki bat bakarrik aldatzen dutenak: zein da zuzena?', es: 'Tres primitivas que solo cambian en el número de delante: ¿cuál es la buena?', en: 'Three antiderivatives that only differ in the number in front: which one is right?', ar: 'ثلاث دوال أصلية لا تختلف إلا في العدد في المقدمة: أيها الصحيحة؟' },
        skills: { eu: 'Barruan biderkatu, kanpoan zatitu', es: 'Multiplicar dentro, dividir fuera', en: 'Multiply inside, divide outside', ar: 'الضرب في الداخل والقسمة في الخارج' },
        levels: [
            { progressId: 112551, stage: 'compound', title: { eu: 'Barrua lineala', es: 'Dentro lineal', en: 'A linear inside', ar: 'داخل خطي' }, description: { eu: 'e^(kx), cos(kx) eta (kx + b)ⁿ.', es: 'e^(kx), cos(kx) y (kx + b)ⁿ.', en: 'e^(kx), cos(kx) and (kx + b)ⁿ.', ar: 'e^(kx) و cos(kx) و (kx + b)ⁿ.' } },
            { progressId: 112552, stage: 'compound', title: { eu: 'Berredurak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'u′·uⁿ, zenbaki bat falta dela.', es: 'u′·uⁿ con un número que falta.', en: 'u′·uⁿ with a number missing.', ar: 'u′·uⁿ مع عدد ناقص.' } },
            { progressId: 112553, stage: 'compound', title: { eu: 'Logaritmoak eta esponentzialak', es: 'Logaritmos y exponenciales', en: 'Logarithms and exponentials', ar: 'اللوغاريتمات والأسية' }, description: { eu: 'u′/u eta u′·eᵘ.', es: 'u′/u y u′·eᵘ.', en: 'u′/u and u′·eᵘ.', ar: 'u′/u و u′·eᵘ.' } }
        ]
    },
    {
        id: 'estimate',
        title: { eu: 'Azalera begiz', es: 'Área a ojo', en: 'Area by eye', ar: 'المساحة بالعين' },
        tagline: { eu: 'Eremu itzaldu bat karratuen sare batean: zenbatu karratuak eta aukeratu haren azalera.', es: 'Una región sombreada en una cuadrícula: cuenta cuadrados y elige su área.', en: 'A shaded region on a grid: count squares and choose its area.', ar: 'منطقة مظللة على شبكة: عُدّ المربعات واختر مساحتها.' },
        skills: { eu: 'Integrala azalera gisa', es: 'La integral como área', en: 'The integral as an area', ar: 'التكامل بوصفه مساحة' },
        levels: [
            { progressId: 112601, stage: 'definite', title: { eu: 'Zuzenen azpian', es: 'Bajo rectas', en: 'Under lines', ar: 'تحت المستقيمات' }, description: { eu: 'Trapezioak eta triangeluak.', es: 'Trapecios y triángulos.', en: 'Trapezoids and triangles.', ar: 'أشباه منحرف ومثلثات.' } },
            { progressId: 112602, stage: 'definite', title: { eu: 'Parabolen azpian', es: 'Bajo parábolas', en: 'Under parabolas', ar: 'تحت القطوع المكافئة' }, description: { eu: 'Kurba gainean eta azpian.', es: 'Curva por encima y por debajo.', en: 'Curve above and below.', ar: 'منحنى فوق وتحت.' } },
            { progressId: 112603, stage: 'areas', title: { eu: 'Zeinuarekin', es: 'Con signo', en: 'With a sign', ar: 'بالإشارة' }, description: { eu: 'Integrala, azalera ez: azpikoa kendu.', es: 'La integral, no el área: lo de abajo resta.', en: 'The integral, not the area: what is below subtracts.', ar: 'التكامل لا المساحة: ما تحت المحور يُطرح.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Integralen detektibea', es: 'Detective de integrales', en: 'Integrals detective', ar: 'مخبر التكاملات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 112701, stage: 'primitives', title: { eu: 'Jatorrizkoak', es: 'Primitivas', en: 'Antiderivatives', ar: 'الدوال الأصلية' }, description: { eu: 'Zatitzea, k konstantea eta eˣ.', es: 'Dividir, la constante k y eˣ.', en: 'Dividing, the constant k and eˣ.', ar: 'القسمة والثابت k و eˣ.' } },
            { progressId: 112702, stage: 'compound', title: { eu: 'Konposatuak', es: 'Compuestas', en: 'Composite', ar: 'المركّبة' }, description: { eu: 'Doitzea, u′/u eta uⁿ⁺¹.', es: 'Ajustar, u′/u y uⁿ⁺¹.', en: 'Adjusting, u′/u and uⁿ⁺¹.', ar: 'الضبط و u′/u و uⁿ⁺¹.' } },
            { progressId: 112703, stage: 'areas', title: { eu: 'Barrow eta azalerak', es: 'Barrow y áreas', en: 'Barrow and areas', ar: 'بارو والمساحات' }, description: { eu: 'Mugen ordena, zeinua eta ebaki-puntuak.', es: 'Orden de los límites, signo y cortes.', en: 'The order of the limits, the sign and the crossings.', ar: 'ترتيب الحدين والإشارة ونقاط التقاطع.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren jatorrizkoa, edo integral bat eta haren balioa.', es: 'Encuentra las parejas: una función y su primitiva, o una integral y su valor.', en: 'Find the pairs: a function and its antiderivative, or an integral and its value.', ar: 'اعثر على الأزواج: دالة وأصليتها، أو تكامل وقيمته.' },
        skills: { eu: 'Berehalakoak eta Barrow', es: 'Inmediatas y Barrow', en: 'Basic integrals and Barrow', ar: 'التكاملات المباشرة وبارو' },
        levels: [
            { progressId: 112801, stage: 'primitives', title: { eu: 'Berredurak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '6x² ↔ 2x³', es: '6x² ↔ 2x³', en: '6x² ↔ 2x³', ar: '6x² ↔ 2x³' } },
            { progressId: 112802, stage: 'immediate', title: { eu: 'Berehalakoak', es: 'Inmediatas', en: 'Basic', ar: 'المباشرة' }, description: { eu: '1/x ↔ ln |x|', es: '1/x ↔ ln |x|', en: '1/x ↔ ln |x|', ar: '1/x ↔ ln |x|' } },
            { progressId: 112803, stage: 'definite', title: { eu: 'Integral mugatuak', es: 'Integrales definidas', en: 'Definite integrals', ar: 'التكاملات المحددة' }, description: { eu: '∫₀² 2x dx ↔ 4', es: '∫₀² 2x dx ↔ 4', en: '∫₀² 2x dx ↔ 4', ar: '∫₀² 2x dx ↔ 4' } }
        ]
    }
]

export const bachIntegralsGameProgressIds: number[] = levelProgressIds(bachIntegralsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachIntegralsGameSlugs: Record<BachIntegralsGameId, string> = { race: 'lasterketa', primitive: 'jatorrizkoa', adjust: 'doitu', estimate: 'azalera', detective: 'detektibea', memory: 'memoria' }

export function bachIntegralsGameModeForPath(pathname: string): BachIntegralsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['jatorrizkoa', 'primitiva'].includes(game)) return 'primitive'
    if (['doitu', 'ajusta'].includes(game)) return 'adjust'
    if (['azalera', 'area'].includes(game)) return 'estimate'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
