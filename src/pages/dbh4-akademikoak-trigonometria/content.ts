import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from './text.ts'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — diagnostic, guided practice,
   exercise bank and challenges, after Anaya 4.º Académicas unit 7 (the legs
   48 and 71, the angle of 37° with the opposite leg 87, the triangle
   37-50-32°, the double observation 50°-25°-10 m, sen 86°, tg α = 5,83,
   1837°) and Santillana 4.º Académicas unit 7 (sen α = 7/25, the
   lighthouse at 30°, the goal at 38°, the window at 45°, the isosceles
   triangle of 15°, the related angles of 120°, 210°, 315°, the radians).
   Every closed answer is a single number without the unit: ratios,
   lengths and areas rounded as the prompt says, angles in degrees.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
const THOUSANDTHS = say('Hurbildu milarenetara.', 'Aproxima a las milésimas.', 'قرّب إلى الأجزاء من ألف.')
const TENTHS = say('Eman angelua gradutan, hamarrenetara hurbilduta.', 'Da el ángulo en grados, aproximado a las décimas.', 'أعطِ الزاوية بالدرجات مقرّبة إلى الأعشار.')
/** A prompt followed by an instruction (rounding) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

export const trigonometryDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5501,
        prompt: say('Triangelu angeluzuzen batean, angelu zorrotz baten sinua da…', 'En un triángulo rectángulo, el seno de un ángulo agudo es…', 'في مثلث قائم، جيب زاوية حادة هو…'),
        options: [
            say('aurkako katetoa zati hipotenusa', 'el cateto opuesto entre la hipotenusa', 'الضلع المقابل على الوتر'),
            say('ondoko katetoa zati hipotenusa', 'el cateto contiguo entre la hipotenusa', 'الضلع المجاور على الوتر'),
            say('aurkako katetoa zati ondokoa', 'el cateto opuesto entre el contiguo', 'الضلع المقابل على المجاور')
        ],
        correctIndex: 0,
        explanation: same('$\\sen\\alpha=\\dfrac{3}{5}$ (3, 4, 5)'),
        topic: 'right-ratios'
    },
    {
        id: 5502,
        prompt: same('$\\sen 30°=$'),
        options: [same('$\\frac{\\sqrt{3}}{2}$'), same('$\\frac{1}{2}$'), same('$1$')],
        correctIndex: 1,
        explanation: say('Triangelu aldeberdin-erdia: hipotenusa 2 eta aurkako katetoa 1.', 'Medio triángulo equilátero: hipotenusa 2 y cateto opuesto 1.', 'نصف مثلث متساوي الأضلاع: الوتر 2 والمقابل 1.'),
        topic: 'notable-angles'
    },
    {
        id: 5503,
        prompt: same('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=$'),
        options: [same('$0$'), same('$\\tg\\alpha$'), same('$1$')],
        correctIndex: 2,
        explanation: say('Pitagoras 1eko hipotenusa duen triangeluan.', 'Pitágoras en el triángulo de hipotenusa 1.', 'فيثاغورس في المثلث الذي وتره 1.'),
        topic: 'fundamental'
    },
    {
        id: 5504,
        prompt: say('Angelu zorrotz baten sinua…', 'El seno de un ángulo agudo…', 'جيب زاوية حادة…'),
        options: [
            same('$= 2$'),
            say('0 eta 1 artean dago', 'está entre 0 y 1', 'محصور بين 0 و1'),
            say('triangeluaren tamainaren mende dago', 'depende del tamaño del triángulo', 'يتوقف على حجم المثلث')
        ],
        correctIndex: 1,
        explanation: say('Katetoa hipotenusa baino txikiagoa da, eta triangelu antzeko guztietan zatiketa bera da.', 'El cateto es menor que la hipotenusa, y en todos los triángulos semejantes el cociente es el mismo.', 'الضلع القائم أصغر من الوتر، والقسمة نفسها في كل المثلثات المتشابهة.'),
        topic: 'ratio-properties'
    },
    {
        id: 5505,
        prompt: say('Hipotenusa 10 da eta angelu bat 30°. Angelu horren aurkako katetoak neurtzen du…', 'La hipotenusa mide 10 y un ángulo 30°. El cateto opuesto a ese ángulo mide…', 'الوتر 10 وإحدى الزاويتين 30°. الضلع المقابل لهذه الزاوية طوله…'),
        options: [same('$5$'), same('$10\\sqrt{3}$'), same('$20$')],
        correctIndex: 0,
        explanation: same('$10\\cdot\\sen 30°=10\\cdot\\frac{1}{2}=5$'),
        topic: 'side-angle'
    },
    {
        id: 5506,
        prompt: say('Goratze-angelua ikus-lerroak … osatzen duen angelua da.', 'El ángulo de elevación es el que forma la visual con…', 'زاوية الارتفاع هي الزاوية التي يصنعها خط النظر مع…'),
        options: [say('bertikalarekin', 'la vertical', 'الخط العمودي'), say('objektuarekin', 'el objeto', 'الجسم'), say('horizontalarekin', 'la horizontal', 'الخط الأفقي')],
        correctIndex: 2,
        explanation: say('Horizontaletik gora neurtzen da; beheratze-angelua, horizontaletik behera.', 'Se mide desde la horizontal hacia arriba; el de depresión, hacia abajo.', 'تُقاس من الأفقي نحو الأعلى؛ وزاوية الانخفاض نحو الأسفل.'),
        topic: 'elevation'
    },
    {
        id: 5507,
        prompt: say('II. koadranteko angelu baten kosinua…', 'El coseno de un ángulo del II cuadrante es…', 'جيب تمام زاوية من الربع الثاني…'),
        options: [say('positiboa', 'positivo', 'موجب'), say('negatiboa', 'negativo', 'سالب'), say('zero', 'cero', 'صفر')],
        correctIndex: 1,
        explanation: say('Puntuaren abzisa negatiboa da II. koadrantean.', 'La abscisa del punto es negativa en el II cuadrante.', 'فاصلة النقطة سالبة في الربع الثاني.'),
        topic: 'unit-circle'
    },
    {
        id: 5508,
        prompt: same('$180°=$'),
        options: [same('$2\\pi\\text{ rad}$'), same('$1\\text{ rad}$'), same('$\\pi\\text{ rad}$')],
        correctIndex: 2,
        explanation: same('$360°=2\\pi\\text{ rad}$'),
        topic: 'radians'
    }
]

export const trigonometryPractice: PracticeItem[] = [
    /* ---------- Ratios of an acute angle ---------- */
    {
        id: 1, stage: 'ratios',
        prompt: say('Triangelu angeluzuzen baten katetoak 7 cm eta 24 cm dira. Kalkulatu $\\sen\\alpha$, $\\alpha$ 7 cm-ko katetoaren aurkako angelua izanik.', 'Los catetos de un triángulo rectángulo miden 7 cm y 24 cm. Calcula $\\sen\\alpha$, siendo $\\alpha$ el ángulo opuesto al cateto de 7 cm.', 'ضلعا مثلث قائم 7 سم و24 سم. احسب $\\sen\\alpha$ حيث $\\alpha$ الزاوية المقابلة للضلع 7 سم.'),
        expected: v('0,28'),
        hint: say('Lehenik hipotenusa, Pitagorasekin.', 'Primero la hipotenusa, con Pitágoras.', 'أولًا الوتر بفيثاغورس.'),
        explanation: same('$\\sqrt{7^{2}+24^{2}}=25\\qquad \\sen\\alpha=\\frac{7}{25}=0{,}28$')
    },
    {
        id: 2, stage: 'ratios',
        prompt: with_(say('Triangelu angeluzuzen baten hipotenusa 13 cm da eta katetoetako bat 5 cm. Kalkulatu $\\tg\\alpha$, $\\alpha$ 5 cm-ko katetoaren aurkako angelua izanik.', 'La hipotenusa de un triángulo rectángulo mide 13 cm y uno de los catetos 5 cm. Calcula $\\tg\\alpha$, siendo $\\alpha$ el ángulo opuesto al cateto de 5 cm.', 'وتر مثلث قائم 13 سم وأحد ضلعيه القائمين 5 سم. احسب $\\tg\\alpha$ حيث $\\alpha$ الزاوية المقابلة للضلع 5 سم.'), HUNDREDTHS),
        expected: v('0,42'),
        hint: say('Ondoko katetoa: $\\sqrt{13^{2}-5^{2}}$.', 'El cateto contiguo: $\\sqrt{13^{2}-5^{2}}$.', 'المجاور: $\\sqrt{13^{2}-5^{2}}$.'),
        explanation: same('$\\sqrt{13^{2}-5^{2}}=12\\qquad \\tg\\alpha=\\frac{5}{12}\\approx 0{,}42$')
    },
    {
        id: 3, stage: 'ratios',
        prompt: say('Kalkulatu kalkulagailurik gabe: $\\sen 30°+\\cos 60°$.', 'Calcula sin calculadora: $\\sen 30°+\\cos 60°$.', 'احسب دون آلة حاسبة: $\\sen 30°+\\cos 60°$.'),
        expected: n(1),
        hint: say('Biak triangelu aldeberdin-erditik ateratzen dira.', 'Los dos salen del medio triángulo equilátero.', 'كلاهما من نصف المثلث المتساوي الأضلاع.'),
        explanation: same('$\\frac{1}{2}+\\frac{1}{2}=1$')
    },
    {
        id: 4, stage: 'ratios',
        prompt: say('$\\cos 20°\\approx 0{,}94$ bada, zenbat da $\\sen 70°$?', 'Si $\\cos 20°\\approx 0{,}94$, ¿cuánto vale $\\sen 70°$?', 'إذا كان $\\cos 20°\\approx 0{,}94$، فكم $\\sen 70°$؟'),
        expected: v('0,94'),
        hint: say('20° eta 70° osagarriak dira.', '20° y 70° son complementarios.', '20° و70° متتامّتان.'),
        explanation: same('$\\sen 70°=\\cos(90°-70°)=\\cos 20°\\approx 0{,}94$')
    },

    /* ---------- Fundamental relations ---------- */
    {
        id: 5, stage: 'identities',
        prompt: say('$\\alpha$ zorrotza da eta $\\sen\\alpha=0{,}8$. Kalkulatu $\\cos\\alpha$.', '$\\alpha$ es agudo y $\\sen\\alpha=0{,}8$. Calcula $\\cos\\alpha$.', '$\\alpha$ حادة و$\\sen\\alpha=0{,}8$. احسب $\\cos\\alpha$.'),
        expected: v('0,6'),
        hint: same('$\\cos^{2}\\alpha=1-\\sen^{2}\\alpha$'),
        explanation: same('$\\cos^{2}\\alpha=1-0{,}64=0{,}36\\qquad \\cos\\alpha=\\sqrt{0{,}36}=0{,}6$')
    },
    {
        id: 6, stage: 'identities',
        prompt: with_(say('$\\alpha$ zorrotza da, $\\sen\\alpha=0{,}8$ eta $\\cos\\alpha=0{,}6$. Kalkulatu $\\tg\\alpha$.', '$\\alpha$ es agudo, $\\sen\\alpha=0{,}8$ y $\\cos\\alpha=0{,}6$. Calcula $\\tg\\alpha$.', '$\\alpha$ حادة و$\\sen\\alpha=0{,}8$ و$\\cos\\alpha=0{,}6$. احسب $\\tg\\alpha$.'), HUNDREDTHS),
        expected: v('1,33'),
        hint: same('$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$'),
        explanation: same('$\\tg\\alpha=\\frac{0{,}8}{0{,}6}=\\frac{4}{3}\\approx 1{,}33$')
    },
    {
        id: 7, stage: 'identities',
        prompt: with_(say('Kalkulatu $\\tg 22°$ kalkulagailuarekin.', 'Calcula $\\tg 22°$ con la calculadora.', 'احسب $\\tg 22°$ بالآلة الحاسبة.'), THOUSANDTHS),
        expected: v('0,404'),
        hint: say('DEG moduan: tan 22.', 'En modo DEG: tan 22.', 'بوضع DEG: tan 22.'),
        explanation: same('$\\tg 22°=0{,}40402\\ldots\\approx 0{,}404$')
    },
    {
        id: 8, stage: 'identities',
        prompt: with_(say('$\\alpha$ zorrotza da eta $\\cos\\alpha=0{,}42$. Aurkitu $\\alpha$ kalkulagailuarekin.', '$\\alpha$ es agudo y $\\cos\\alpha=0{,}42$. Halla $\\alpha$ con la calculadora.', '$\\alpha$ حادة و$\\cos\\alpha=0{,}42$. أوجد $\\alpha$ بالآلة الحاسبة.'), TENTHS),
        expected: v('65,2'),
        hint: say('SHIFT cos 0,42.', 'SHIFT cos 0,42.', 'SHIFT cos 0.42.'),
        explanation: same('$\\alpha=\\cos^{-1}0{,}42\\approx 65{,}17°\\approx 65{,}2°$')
    },

    /* ---------- Solving right triangles ---------- */
    {
        id: 9, stage: 'solving',
        prompt: say('Triangelu angeluzuzen baten hipotenusa 10 cm da eta angelu zorrotz bat 30°. Zenbat neurtzen du angelu horren aurkako katetoak?', 'La hipotenusa de un triángulo rectángulo mide 10 cm y un ángulo agudo 30°. ¿Cuánto mide el cateto opuesto a ese ángulo?', 'وتر مثلث قائم 10 سم وإحدى زاويتيه الحادتين 30°. كم طول الضلع المقابل لهذه الزاوية؟'),
        expected: n(5),
        hint: same('$\\sen 30°=\\frac{x}{10}$'),
        explanation: same('$x=10\\cdot\\sen 30°=10\\cdot\\frac{1}{2}=5$')
    },
    {
        id: 10, stage: 'solving',
        prompt: with_(say('Triangelu angeluzuzen batean angelu bat 40° da eta haren ondoko katetoa 8 cm. Kalkulatu aurkako katetoa.', 'En un triángulo rectángulo un ángulo mide 40° y su cateto contiguo 8 cm. Calcula el cateto opuesto.', 'في مثلث قائم زاوية قياسها 40° والضلع المجاور لها 8 سم. احسب الضلع المقابل.'), HUNDREDTHS),
        expected: v('6,71'),
        hint: say('Bi katetoak: tangentea.', 'Los dos catetos: la tangente.', 'الضلعان القائمان: الظل.'),
        explanation: same('$x=8\\cdot\\tg 40°\\approx 6{,}71$')
    },
    {
        id: 11, stage: 'solving',
        prompt: with_(say('Triangelu angeluzuzen baten katetoak 6 cm eta 8 cm dira. Kalkulatu 6 cm-ko katetoaren aurkako angelua.', 'Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. Calcula el ángulo opuesto al cateto de 6 cm.', 'ضلعا مثلث قائم 6 سم و8 سم. احسب الزاوية المقابلة للضلع 6 سم.'), TENTHS),
        expected: v('36,9'),
        hint: same('$\\tg\\alpha=\\frac{6}{8}$'),
        explanation: same('$\\tg\\alpha=\\frac{6}{8}=0{,}75\\qquad \\alpha\\approx 36{,}87°\\approx 36{,}9°$')
    },
    {
        id: 12, stage: 'solving',
        prompt: with_(say('Dorre baten oinarritik 50 m-ra, goialdea 35°-ko goratze-angeluarekin ikusten da. Zein da dorrearen altuera?', 'A 50 m del pie de una torre, su punta se ve con un ángulo de elevación de 35°. ¿Qué altura tiene la torre?', 'على بعد 50 م من قاعدة برج تُرى قمته بزاوية ارتفاع 35°. ما ارتفاع البرج؟'), HUNDREDTHS),
        expected: v('35,01'),
        hint: same('$\\tg 35°=\\frac{h}{50}$'),
        explanation: same('$h=50\\cdot\\tg 35°\\approx 35{,}01$')
    },

    /* ---------- Heights, distances and areas ---------- */
    {
        id: 13, stage: 'problems',
        prompt: say('Triangelu baten bi aldeak 8 cm eta 10 cm dira, eta haien arteko angelua 30°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 8 cm y 10 cm y forman un ángulo de 30°. Calcula su área.', 'ضلعان في مثلث طولاهما 8 سم و10 سم والزاوية بينهما 30°. احسب مساحته.'),
        expected: n(20),
        hint: same('$\\frac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$'),
        explanation: same('$\\frac{1}{2}\\cdot 8\\cdot 10\\cdot\\frac{1}{2}=20$')
    },
    {
        id: 14, stage: 'problems',
        prompt: say('ABC triangeluan $AB=12$ cm eta $A=30°$. Kalkulatu B-tik AC aldera doan altuera.', 'En el triángulo ABC, $AB=12$ cm y $A=30°$. Calcula la altura desde B sobre el lado AC.', 'في المثلث ABC: $AB=12$ سم و$A=30°$. احسب الارتفاع من B على الضلع AC.'),
        expected: n(6),
        hint: say('Altuera AB hipotenusa duen triangeluaren katetoa da.', 'La altura es un cateto del triángulo de hipotenusa AB.', 'الارتفاع ضلع قائم في المثلث الذي وتره AB.'),
        explanation: same('$h=12\\cdot\\sen 30°=12\\cdot\\frac{1}{2}=6$')
    },
    {
        id: 15, stage: 'problems',
        prompt: with_(say('Triangelu isoszele baten alde berdinak 10 cm dira eta oinarriko angeluak 70°. Kalkulatu altuera.', 'Un triángulo isósceles tiene los lados iguales de 10 cm y los ángulos de la base de 70°. Calcula su altura.', 'مثلث متساوي الساقين طول كل من ساقيه 10 سم وزاويتا القاعدة 70°. احسب ارتفاعه.'), HUNDREDTHS),
        expected: v('9,4'),
        hint: say('Altuerak bi triangelu angeluzuzen sortzen ditu, hipotenusa 10 izanik.', 'La altura forma dos triángulos rectángulos de hipotenusa 10.', 'الارتفاع يكوّن مثلثين قائمين وترهما 10.'),
        explanation: same('$h=10\\cdot\\sen 70°\\approx 9{,}397\\approx 9{,}40$')
    },
    {
        id: 16, stage: 'problems',
        prompt: with_(say('Zuhaitz baten goialdea 45°-ko angeluarekin ikusten da; 10 m urrundu ondoren, 30°-koarekin. Kalkulatu zuhaitzaren altuera.', 'La copa de un árbol se ve con un ángulo de 45°; tras alejarse 10 m, con uno de 30°. Calcula la altura del árbol.', 'تُرى قمة شجرة بزاوية 45°، وبعد الابتعاد 10 م بزاوية 30°. احسب ارتفاع الشجرة.'), HUNDREDTHS),
        expected: v('13,66'),
        hint: same('$y=x\\cdot\\tg 45°=x\\qquad y=(x+10)\\cdot\\tg 30°$'),
        explanation: same('$x=(x+10)\\cdot\\frac{\\sqrt{3}}{3}\\ \\to\\ x=\\frac{10\\sqrt{3}}{3-\\sqrt{3}}=5\\sqrt{3}+5\\approx 13{,}66$')
    },

    /* ---------- The unit circle ---------- */
    {
        id: 17, stage: 'circle',
        prompt: say('$\\sen\\alpha=0{,}6$ eta $\\alpha$ II. koadrantean dago. Kalkulatu $\\cos\\alpha$.', '$\\sen\\alpha=0{,}6$ y $\\alpha$ está en el II cuadrante. Calcula $\\cos\\alpha$.', '$\\sen\\alpha=0{,}6$ و$\\alpha$ في الربع الثاني. احسب $\\cos\\alpha$.'),
        expected: v('-0,8'),
        hint: say('II. koadrantean kosinua negatiboa da.', 'En el II cuadrante el coseno es negativo.', 'في الربع الثاني جيب التمام سالب.'),
        explanation: same('$\\cos^{2}\\alpha=1-0{,}36=0{,}64\\qquad \\cos\\alpha=-0{,}8$')
    },
    {
        id: 18, stage: 'circle',
        prompt: say('Kalkulatu $\\cos 120°$-ren balio zehatza.', 'Calcula el valor exacto de $\\cos 120°$.', 'احسب القيمة المضبوطة لـ $\\cos 120°$.'),
        expected: v('-0,5'),
        hint: same('$120°=180°-60°$'),
        explanation: same('$\\cos 120°=-\\cos 60°=-\\frac{1}{2}=-0{,}5$')
    },
    {
        id: 19, stage: 'circle',
        prompt: say('0° eta 360° arteko zein angeluk ditu 1837°-ren arrazoi berak?', '¿Qué ángulo entre 0° y 360° tiene las mismas razones que 1837°?', 'أي زاوية بين 0° و360° لها نسب 1837° نفسها؟'),
        expected: n(37),
        hint: say('Kendu buelta osoak: zatitu 360z.', 'Quita las vueltas completas: divide entre 360.', 'احذف الدورات الكاملة: اقسم على 360.'),
        explanation: same('$1837=5\\cdot 360+37$')
    },
    {
        id: 20, stage: 'circle',
        prompt: say('Zenbat gradu dira $\\frac{3\\pi}{4}$ rad?', '¿Cuántos grados son $\\frac{3\\pi}{4}$ rad?', 'كم درجة تساوي $\\frac{3\\pi}{4}$ rad؟'),
        expected: n(135),
        hint: say('Ordezkatu π-ren ordez 180°.', 'Sustituye π por 180°.', 'عوّض π بـ 180°.'),
        explanation: same('$\\frac{3\\cdot 180}{4}=135$')
    }
]

export const trigonometryChallenges: ChallengeItem[] = [
    /* ---------- Ratios of an acute angle ---------- */
    {
        id: 101, stage: 'ratios', points: 10, context: 'starter',
        prompt: say('Triangelu angeluzuzen baten katetoak 9 cm eta 12 cm dira. Kalkulatu 9 cm-ko katetoaren aurkako angeluaren sinua.', 'Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. Calcula el seno del ángulo opuesto al cateto de 9 cm.', 'ضلعا مثلث قائم 9 سم و12 سم. احسب جيب الزاوية المقابلة للضلع 9 سم.'),
        expected: v('0,6'),
        hint: say('Hipotenusa: 9, 12 eta ? (3, 4, 5 bider 3).', 'Hipotenusa: 9, 12 y ? (3, 4, 5 por 3).', 'الوتر: 9 و12 و؟ (3 و4 و5 مضروبة في 3).'),
        explanation: same('$\\sqrt{9^{2}+12^{2}}=15\\qquad \\frac{9}{15}=0{,}6$')
    },
    {
        id: 102, stage: 'ratios', points: 20, context: 'advanced',
        prompt: say('3 m-ko zutoin batek $\\sqrt{3}$ m-ko itzala du. Zer angelu osatzen dute eguzki-izpiek lurrarekin?', 'Un poste de 3 m da una sombra de $\\sqrt{3}$ m. ¿Qué ángulo forman los rayos del sol con el suelo?', 'عمود طوله 3 م ظله $\\sqrt{3}$ م. ما الزاوية التي تصنعها أشعة الشمس مع الأرض؟'),
        expected: n(60),
        hint: same('$\\tg\\alpha=\\frac{3}{\\sqrt{3}}$'),
        explanation: same('$\\tg\\alpha=\\frac{3}{\\sqrt{3}}=\\sqrt{3}\\ \\to\\ \\alpha=60°$')
    },
    {
        id: 103, stage: 'ratios', points: 30, context: 'master',
        prompt: say('Kalkulatu kalkulagailurik gabe: $(\\sen 60°)^{2}+\\tg 45°\\cdot\\cos 60°$.', 'Calcula sin calculadora: $(\\sen 60°)^{2}+\\tg 45°\\cdot\\cos 60°$.', 'احسب دون آلة حاسبة: $(\\sen 60°)^{2}+\\tg 45°\\cdot\\cos 60°$.'),
        expected: v('1,25'),
        hint: same('$\\sen 60°=\\frac{\\sqrt{3}}{2}\\qquad \\tg 45°=1$'),
        explanation: same('$\\frac{3}{4}+1\\cdot\\frac{1}{2}=\\frac{5}{4}=1{,}25$')
    },

    /* ---------- Fundamental relations ---------- */
    {
        id: 104, stage: 'identities', points: 10, context: 'starter',
        prompt: say('$\\alpha$ zorrotza da eta $\\cos\\alpha=0{,}28$. Kalkulatu $\\sen\\alpha$.', '$\\alpha$ es agudo y $\\cos\\alpha=0{,}28$. Calcula $\\sen\\alpha$.', '$\\alpha$ حادة و$\\cos\\alpha=0{,}28$. احسب $\\sen\\alpha$.'),
        expected: v('0,96'),
        hint: same('$\\sen^{2}\\alpha=1-\\cos^{2}\\alpha$'),
        explanation: same('$\\sen^{2}\\alpha=1-0{,}0784=0{,}9216\\qquad \\sqrt{0{,}9216}=0{,}96$')
    },
    {
        id: 105, stage: 'identities', points: 20, context: 'advanced',
        prompt: say('$\\alpha$ zorrotza da eta $\\tg\\alpha=0{,}75$. Kalkulatu $\\cos\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=0{,}75$. Calcula $\\cos\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=0{,}75$. احسب $\\cos\\alpha$.'),
        expected: v('0,8'),
        hint: same('$1+\\tg^{2}\\alpha=\\frac{1}{\\cos^{2}\\alpha}$'),
        explanation: same('$1+0{,}5625=1{,}5625\\qquad \\cos^{2}\\alpha=\\frac{1}{1{,}5625}=0{,}64\\qquad \\cos\\alpha=0{,}8$')
    },
    {
        id: 106, stage: 'identities', points: 30, context: 'master',
        prompt: say('$\\alpha$ eta $\\beta$ zorrotzak dira, $\\sen\\alpha=0{,}3$ eta $\\cos\\beta=0{,}3$. Zenbat da $\\alpha+\\beta$, gradutan?', '$\\alpha$ y $\\beta$ son agudos, $\\sen\\alpha=0{,}3$ y $\\cos\\beta=0{,}3$. ¿Cuánto vale $\\alpha+\\beta$, en grados?', '$\\alpha$ و$\\beta$ حادتان، $\\sen\\alpha=0{,}3$ و$\\cos\\beta=0{,}3$. كم $\\alpha+\\beta$ بالدرجات؟'),
        expected: n(90),
        hint: say('Zein angeluk du $\\alpha$-ren sinua kosinu gisa?', '¿Qué ángulo tiene como coseno el seno de $\\alpha$?', 'أي زاوية جيب تمامها هو جيب $\\alpha$؟'),
        explanation: say('$\\cos(90°-\\alpha)=\\sen\\alpha=0{,}3=\\cos\\beta$, beraz $\\beta=90°-\\alpha$ eta $\\alpha+\\beta=90°$.', '$\\cos(90°-\\alpha)=\\sen\\alpha=0{,}3=\\cos\\beta$, así que $\\beta=90°-\\alpha$ y $\\alpha+\\beta=90°$.', '$\\cos(90°-\\alpha)=\\sen\\alpha=0{,}3=\\cos\\beta$، إذن $\\beta=90°-\\alpha$ و$\\alpha+\\beta=90°$.')
    },

    /* ---------- Solving right triangles ---------- */
    {
        id: 107, stage: 'solving', points: 10, context: 'starter',
        prompt: say('Triangelu angeluzuzen baten hipotenusa 20 cm da eta angelu zorrotz bat 60°. Zenbat neurtzen du angelu horren ondoko katetoak?', 'La hipotenusa de un triángulo rectángulo mide 20 cm y un ángulo agudo 60°. ¿Cuánto mide el cateto contiguo a ese ángulo?', 'وتر مثلث قائم 20 سم وإحدى زاويتيه الحادتين 60°. كم طول الضلع المجاور لهذه الزاوية؟'),
        expected: n(10),
        hint: same('$\\cos 60°=\\frac{x}{20}$'),
        explanation: same('$x=20\\cdot\\cos 60°=20\\cdot\\frac{1}{2}=10$')
    },
    {
        id: 108, stage: 'solving', points: 20, context: 'advanced',
        prompt: with_(say('5 m-ko eskailera bat horma bati bermatuta dago eta lurrarekin 70° osatzen ditu. Zer altueratara iristen da?', 'Una escalera de 5 m está apoyada en una pared y forma 70° con el suelo. ¿A qué altura llega?', 'سُلّم طوله 5 م مسنود إلى حائط ويصنع 70° مع الأرض. إلى أي ارتفاع يصل؟'), HUNDREDTHS),
        expected: v('4,7'),
        hint: say('Eskailera hipotenusa da eta altuera aurkako katetoa.', 'La escalera es la hipotenusa y la altura el cateto opuesto.', 'السُّلّم هو الوتر والارتفاع هو المقابل.'),
        explanation: same('$h=5\\cdot\\sen 70°\\approx 4{,}698\\approx 4{,}70$')
    },
    {
        id: 109, stage: 'solving', points: 30, context: 'master',
        prompt: with_(say('Triangelu isoszele baten oinarria 6 cm da, eta alde berdinek 30°-ko angelua osatzen dute. Kalkulatu azalera.', 'Un triángulo isósceles tiene 6 cm de base, y sus lados iguales forman un ángulo de 30°. Calcula su área.', 'مثلث متساوي الساقين قاعدته 6 سم، وساقاه تصنعان زاوية 30°. احسب مساحته.'), HUNDREDTHS),
        expected: v('33,59'),
        hint: say('Altuerak 30°-ko angelua bi 15°-kotan eta oinarria 3 eta 3 cm-tan zatitzen ditu.', 'La altura parte el ángulo de 30° en dos de 15° y la base en 3 y 3 cm.', 'الارتفاع يقسم الزاوية 30° إلى زاويتين 15° والقاعدة إلى 3 و3 سم.'),
        explanation: same('$\\tg 15°=\\frac{3}{h}\\ \\to\\ h\\approx 11{,}196\\qquad \\frac{6\\cdot 11{,}196}{2}\\approx 33{,}59$')
    },

    /* ---------- Heights, distances and areas ---------- */
    {
        id: 110, stage: 'problems', points: 10, context: 'starter',
        prompt: say('Triangelu baten bi aldeak 4 cm eta 5 cm dira, eta haien arteko angelua 30°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 4 cm y 5 cm y forman un ángulo de 30°. Calcula su área.', 'ضلعان في مثلث طولاهما 4 سم و5 سم والزاوية بينهما 30°. احسب مساحته.'),
        expected: n(5),
        hint: same('$\\sen 30°=\\frac{1}{2}$'),
        explanation: same('$\\frac{1}{2}\\cdot 4\\cdot 5\\cdot\\frac{1}{2}=5$')
    },
    {
        id: 111, stage: 'problems', points: 20, context: 'advanced',
        prompt: with_(say('ABC triangeluan $AB=37$ cm, $AC=50$ cm eta $A=32°$. Kalkulatu BC.', 'En el triángulo ABC, $AB=37$ cm, $AC=50$ cm y $A=32°$. Calcula BC.', 'في المثلث ABC: $AB=37$ سم و$AC=50$ سم و$A=32°$. احسب BC.'), HUNDREDTHS),
        expected: v('27,04'),
        hint: say('Marraztu B-tiko altuera: $h=37\\cdot\\sen 32°$.', 'Traza la altura desde B: $h=37\\cdot\\sen 32°$.', 'ارسم الارتفاع من B: $h=37\\cdot\\sen 32°$.'),
        explanation: same('$h\\approx 19{,}61\\qquad 50-37\\cdot\\cos 32°\\approx 18{,}62\\qquad \\sqrt{19{,}61^{2}+18{,}62^{2}}\\approx 27{,}04$')
    },
    {
        id: 112, stage: 'problems', points: 30, context: 'master',
        prompt: with_(say('Zuhaitz baten goialdea 50°-ko angeluarekin ikusten da; 10 m urrundu ondoren, 25°-koarekin. Kalkulatu zuhaitzaren altuera.', 'La copa de un árbol se ve con un ángulo de 50°; tras alejarse 10 m, con uno de 25°. Calcula la altura del árbol.', 'تُرى قمة شجرة بزاوية 50°، وبعد الابتعاد 10 م بزاوية 25°. احسب ارتفاع الشجرة.'), HUNDREDTHS),
        expected: v('7,66'),
        hint: same('$y=x\\cdot\\tg 50°\\qquad y=(x+10)\\cdot\\tg 25°$'),
        explanation: same('$x\\cdot 1{,}1918=(x+10)\\cdot 0{,}4663\\ \\to\\ x\\approx 6{,}43\\qquad y\\approx 6{,}43\\cdot 1{,}1918\\approx 7{,}66$')
    },

    /* ---------- The unit circle ---------- */
    {
        id: 113, stage: 'circle', points: 10, context: 'starter',
        prompt: say('Kalkulatu $\\sen 210°$-ren balio zehatza.', 'Calcula el valor exacto de $\\sen 210°$.', 'احسب القيمة المضبوطة لـ $\\sen 210°$.'),
        expected: v('-0,5'),
        hint: same('$210°=180°+30°$'),
        explanation: same('$\\sen 210°=-\\sen 30°=-\\frac{1}{2}=-0{,}5$')
    },
    {
        id: 114, stage: 'circle', points: 20, context: 'advanced',
        prompt: say('$\\tg\\alpha=-1$ eta $\\alpha$ IV. koadrantean dago, 0° eta 360° artean. Zenbat da $\\alpha$?', '$\\tg\\alpha=-1$ y $\\alpha$ está en el IV cuadrante, entre 0° y 360°. ¿Cuánto mide $\\alpha$?', '$\\tg\\alpha=-1$ و$\\alpha$ في الربع الرابع بين 0° و360°. كم قياس $\\alpha$؟'),
        expected: n(315),
        hint: same('$\\tg 45°=1$'),
        explanation: same('$\\alpha=360°-45°=315°$')
    },
    {
        id: 115, stage: 'circle', points: 30, context: 'master',
        prompt: with_(say('$\\cos\\alpha=-0{,}6$ eta $\\alpha$ III. koadrantean dago. Kalkulatu $\\tg\\alpha$.', '$\\cos\\alpha=-0{,}6$ y $\\alpha$ está en el III cuadrante. Calcula $\\tg\\alpha$.', '$\\cos\\alpha=-0{,}6$ و$\\alpha$ في الربع الثالث. احسب $\\tg\\alpha$.'), HUNDREDTHS),
        expected: v('1,33'),
        hint: say('III. koadrantean sinua ere negatiboa da.', 'En el III cuadrante el seno también es negativo.', 'في الربع الثالث الجيب سالب أيضًا.'),
        explanation: same('$\\sen\\alpha=-\\sqrt{1-0{,}36}=-0{,}8\\qquad \\tg\\alpha=\\frac{-0{,}8}{-0{,}6}=\\frac{4}{3}\\approx 1{,}33$')
    }
]

export const trigonometryExerciseBank: ExerciseSection[] = [
    {
        id: 'ratios',
        title: say('Angelu zorrotz baten arrazoiak', 'Razones de un ángulo agudo', 'نسب الزاوية الحادة'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Triangelu angeluzuzen baten hipotenusa 10 cm da eta $\\alpha$-ren aurkako katetoa 6 cm. Kalkulatu $\\sen\\alpha$.', 'La hipotenusa de un triángulo rectángulo mide 10 cm y el cateto opuesto a $\\alpha$, 6 cm. Calcula $\\sen\\alpha$.', 'وتر مثلث قائم 10 سم والضلع المقابل لـ $\\alpha$ طوله 6 سم. احسب $\\sen\\alpha$.'), solution: same('$\\sen\\alpha=\\frac{6}{10}=0{,}6$'), answer: { expected: v('0,6') } },
            { id: 2, difficulty: 'easy', question: say('Triangelu berean (hipotenusa 10, aurkakoa 6), kalkulatu $\\cos\\alpha$.', 'En el mismo triángulo (hipotenusa 10, opuesto 6), calcula $\\cos\\alpha$.', 'في المثلث نفسه (الوتر 10 والمقابل 6)، احسب $\\cos\\alpha$.'), solution: same('$\\sqrt{10^{2}-6^{2}}=8\\qquad \\cos\\alpha=\\frac{8}{10}=0{,}8$'), answer: { expected: v('0,8') } },
            { id: 3, difficulty: 'easy', question: say('Zenbat da $\\tg 45°$?', '¿Cuánto vale $\\tg 45°$?', 'كم يساوي $\\tg 45°$؟'), solution: say('Karratu-erdian bi katetoak berdinak dira: $\\tg 45°=\\frac{1}{1}=1$.', 'En medio cuadrado los dos catetos son iguales: $\\tg 45°=\\frac{1}{1}=1$.', 'في نصف المربع الضلعان القائمان متساويان: $\\tg 45°=\\frac{1}{1}=1$.'), answer: { expected: n(1) } },
            { id: 4, difficulty: 'medium', question: with_(say('Triangelu angeluzuzen baten katetoak 20 cm eta 21 cm dira. Kalkulatu 20 cm-ko katetoaren aurkako angeluaren sinua.', 'Los catetos de un triángulo rectángulo miden 20 cm y 21 cm. Calcula el seno del ángulo opuesto al cateto de 20 cm.', 'ضلعا مثلث قائم 20 سم و21 سم. احسب جيب الزاوية المقابلة للضلع 20 سم.'), HUNDREDTHS), solution: same('$\\sqrt{20^{2}+21^{2}}=29\\qquad \\frac{20}{29}\\approx 0{,}69$'), answer: { expected: v('0,69') } },
            { id: 5, difficulty: 'medium', question: with_(say('Kalkulatu $\\cos 30°$ balio zehatzetik abiatuta.', 'Calcula $\\cos 30°$ a partir de su valor exacto.', 'احسب $\\cos 30°$ انطلاقًا من قيمته المضبوطة.'), HUNDREDTHS), solution: same('$\\cos 30°=\\frac{\\sqrt{3}}{2}\\approx 0{,}87$'), answer: { expected: v('0,87') } },
            { id: 6, difficulty: 'medium', question: with_(say('Kalkulatu $\\tg 60°$ balio zehatzetik abiatuta.', 'Calcula $\\tg 60°$ a partir de su valor exacto.', 'احسب $\\tg 60°$ انطلاقًا من قيمته المضبوطة.'), HUNDREDTHS), solution: same('$\\tg 60°=\\sqrt{3}\\approx 1{,}73$'), answer: { expected: v('1,73') } },
            { id: 7, difficulty: 'medium', question: say('$\\alpha$ zorrotza da eta $\\sen\\alpha=0{,}25$. Zenbat da $\\cos(90°-\\alpha)$?', '$\\alpha$ es agudo y $\\sen\\alpha=0{,}25$. ¿Cuánto vale $\\cos(90°-\\alpha)$?', '$\\alpha$ حادة و$\\sen\\alpha=0{,}25$. كم $\\cos(90°-\\alpha)$؟'), solution: say('Osagarriek sinua eta kosinua trukatzen dituzte: $\\cos(90°-\\alpha)=\\sen\\alpha=0{,}25$.', 'Los complementarios intercambian seno y coseno: $\\cos(90°-\\alpha)=\\sen\\alpha=0{,}25$.', 'المتتامّتان تتبادلان الجيب وجيب التمام: $\\cos(90°-\\alpha)=\\sen\\alpha=0{,}25$.'), answer: { expected: v('0,25') } },
            { id: 8, difficulty: 'hard', question: say('Izan al daiteke $\\sen\\alpha=1{,}2$ angelu zorrotz batentzat?', '¿Puede ser $\\sen\\alpha=1{,}2$ para un ángulo agudo?', 'هل يمكن أن يكون $\\sen\\alpha=1{,}2$ لزاوية حادة؟'), solution: say('Ez: sinua katetoa zati hipotenusa da, eta katetoa hipotenusa baino txikiagoa da beti; beraz $\\sen\\alpha<1$.', 'No: el seno es un cateto entre la hipotenusa, y el cateto siempre es menor que la hipotenusa; por tanto $\\sen\\alpha<1$.', 'لا: الجيب ضلع قائم على الوتر، والضلع القائم أصغر من الوتر دائمًا؛ إذن $\\sen\\alpha<1$.') },
            { id: 9, difficulty: 'hard', question: say('8, 15 eta 17ko triangelu angeluzuzenean, kalkulatu 15eko katetoaren aurkako angeluaren tangentea.', 'En el triángulo rectángulo de lados 8, 15 y 17, calcula la tangente del ángulo opuesto al cateto de 15.', 'في المثلث القائم الذي أضلاعه 8 و15 و17، احسب ظل الزاوية المقابلة للضلع 15.'), solution: same('$\\tg\\beta=\\frac{15}{8}=1{,}875$'), answer: { expected: v('1,875') } },
            { id: 10, difficulty: 'hard', question: say('Zergatik ez daude arrazoi trigonometrikoak triangeluaren tamainaren mende?', '¿Por qué las razones trigonométricas no dependen del tamaño del triángulo?', 'لماذا لا تتوقف النسب المثلثية على حجم المثلث؟'), solution: say('Angelu zorrotz bera duten triangelu angeluzuzenak antzekoak dira (bi angelu berdin dituzte), eta triangelu antzekoetan aldeen arteko zatiketak berdinak dira.', 'Los triángulos rectángulos con el mismo ángulo agudo son semejantes (tienen dos ángulos iguales), y en triángulos semejantes los cocientes entre lados son iguales.', 'المثلثات القائمة التي لها الزاوية الحادة نفسها متشابهة (لها زاويتان متساويتان)، وفي المثلثات المتشابهة تتساوى قسمات الأضلاع.') }
        ]
    },
    {
        id: 'identities',
        title: say('Oinarrizko erlazioak', 'Relaciones fundamentales', 'العلاقات الأساسية'),
        items: [
            { id: 11, difficulty: 'easy', question: say('$\\sen\\alpha=0{,}6$ eta $\\cos\\alpha=0{,}8$. Kalkulatu $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ y $\\cos\\alpha=0{,}8$. Calcula $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ و$\\cos\\alpha=0{,}8$. احسب $\\tg\\alpha$.'), solution: same('$\\tg\\alpha=\\frac{0{,}6}{0{,}8}=0{,}75$'), answer: { expected: v('0,75') } },
            { id: 12, difficulty: 'easy', question: say('Izan al daitezke $\\sen\\alpha=0{,}5$ eta $\\cos\\alpha=0{,}5$ angelu bererako?', '¿Pueden ser $\\sen\\alpha=0{,}5$ y $\\cos\\alpha=0{,}5$ para el mismo ángulo?', 'هل يمكن أن يكون $\\sen\\alpha=0{,}5$ و$\\cos\\alpha=0{,}5$ للزاوية نفسها؟'), solution: say('Ez: $0{,}5^{2}+0{,}5^{2}=0{,}5$ da, ez 1.', 'No: $0{,}5^{2}+0{,}5^{2}=0{,}5$, no 1.', 'لا: $0{,}5^{2}+0{,}5^{2}=0{,}5$ وليس 1.') },
            { id: 13, difficulty: 'easy', question: with_(say('Kalkulatu $\\sen 86°$ kalkulagailuarekin.', 'Calcula $\\sen 86°$ con la calculadora.', 'احسب $\\sen 86°$ بالآلة الحاسبة.'), THOUSANDTHS), solution: same('$\\sen 86°=0{,}99756\\ldots\\approx 0{,}998$'), answer: { expected: v('0,998') } },
            { id: 14, difficulty: 'medium', question: say('$\\alpha$ zorrotza da eta $\\cos\\alpha=0{,}96$. Kalkulatu $\\sen\\alpha$.', '$\\alpha$ es agudo y $\\cos\\alpha=0{,}96$. Calcula $\\sen\\alpha$.', '$\\alpha$ حادة و$\\cos\\alpha=0{,}96$. احسب $\\sen\\alpha$.'), solution: same('$\\sen^{2}\\alpha=1-0{,}9216=0{,}0784\\qquad \\sqrt{0{,}0784}=0{,}28$'), answer: { expected: v('0,28') } },
            { id: 15, difficulty: 'medium', question: with_(say('$\\alpha$ zorrotza da eta $\\sen\\alpha=\\frac{5}{13}$. Kalkulatu $\\tg\\alpha$.', '$\\alpha$ es agudo y $\\sen\\alpha=\\frac{5}{13}$. Calcula $\\tg\\alpha$.', '$\\alpha$ حادة و$\\sen\\alpha=\\frac{5}{13}$. احسب $\\tg\\alpha$.'), HUNDREDTHS), solution: same('$\\cos\\alpha=\\sqrt{1-\\frac{25}{169}}=\\frac{12}{13}\\qquad \\tg\\alpha=\\frac{5}{12}\\approx 0{,}42$'), answer: { expected: v('0,42') } },
            { id: 16, difficulty: 'medium', question: with_(say('$\\alpha$ zorrotza da eta $\\tg\\alpha=1$. Kalkulatu $\\cos\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=1$. Calcula $\\cos\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=1$. احسب $\\cos\\alpha$.'), HUNDREDTHS), solution: same('$\\cos^{2}\\alpha=\\frac{1}{1+1}=\\frac{1}{2}\\qquad \\cos\\alpha=\\frac{\\sqrt{2}}{2}\\approx 0{,}71$'), answer: { expected: v('0,71') } },
            { id: 17, difficulty: 'medium', question: with_(say('$\\alpha$ zorrotza da eta $\\tg\\alpha=5{,}83$. Aurkitu $\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=5{,}83$. Halla $\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=5{,}83$. أوجد $\\alpha$.'), TENTHS), solution: same('$\\alpha=\\tan^{-1}5{,}83\\approx 80{,}27°\\approx 80{,}3°$'), answer: { expected: v('80,3') } },
            { id: 18, difficulty: 'hard', question: with_(say('$\\alpha$ zorrotza da eta $\\tg\\alpha=3$. Kalkulatu $\\cos\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=3$. Calcula $\\cos\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=3$. احسب $\\cos\\alpha$.'), HUNDREDTHS), solution: same('$1+9=10\\qquad \\cos^{2}\\alpha=\\frac{1}{10}\\qquad \\cos\\alpha=\\sqrt{0{,}1}\\approx 0{,}32$'), answer: { expected: v('0,32') } },
            { id: 19, difficulty: 'hard', question: say('Idatzi $15°\\,30\'$ gradu hamartarretan.', 'Escribe $15°\\,30\'$ en grados decimales.', 'اكتب $15°\\,30\'$ بالدرجات العشرية.'), solution: same('$30\\mathbin{:}60=0{,}5\\qquad 15+0{,}5=15{,}5$'), answer: { expected: v('15,5') } },
            { id: 20, difficulty: 'hard', question: say('Idatzi $25{,}75°$ gradu eta minututan.', 'Escribe $25{,}75°$ en grados y minutos.', 'اكتب $25{,}75°$ بالدرجات والدقائق.'), solution: say('$0{,}75\\cdot 60=45$, beraz $25°\\,45\'$.', '$0{,}75\\cdot 60=45$, así que $25°\\,45\'$.', '$0{,}75\\cdot 60=45$، إذن $25°\\,45\'$.') }
        ]
    },
    {
        id: 'solving',
        title: say('Triangelu angeluzuzenak', 'Triángulos rectángulos', 'المثلثات القائمة'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Hipotenusa 8 cm da eta angelu zorrotz bat 30°. Zenbat neurtzen du haren aurkako katetoak?', 'La hipotenusa mide 8 cm y un ángulo agudo 30°. ¿Cuánto mide su cateto opuesto?', 'الوتر 8 سم وزاوية حادة 30°. كم طول الضلع المقابل لها؟'), solution: same('$8\\cdot\\sen 30°=8\\cdot\\frac{1}{2}=4$'), answer: { expected: n(4) } },
            { id: 22, difficulty: 'easy', question: say('Leiho bat 45°-ko angeluarekin ikusten da, eraikinetik 7 m-ra. Zer altueratan dago?', 'Una ventana se ve con un ángulo de 45° a 7 m del edificio. ¿A qué altura está?', 'تُرى نافذة بزاوية 45° على بعد 7 م من المبنى. على أي ارتفاع هي؟'), solution: same('$h=7\\cdot\\tg 45°=7\\cdot 1=7$'), answer: { expected: n(7) } },
            { id: 23, difficulty: 'easy', question: say('Triangelu angeluzuzen baten angelu zorrotz bat 37° da. Zenbat da bestea?', 'Un ángulo agudo de un triángulo rectángulo mide 37°. ¿Cuánto mide el otro?', 'زاوية حادة في مثلث قائم قياسها 37°. كم قياس الأخرى؟'), solution: same('$90-37=53$'), answer: { expected: n(53) } },
            { id: 24, difficulty: 'medium', question: with_(say('Triangelu angeluzuzen baten katetoak 48 cm eta 71 cm dira. Kalkulatu 48 cm-ko katetoaren aurkako angelua.', 'Los catetos de un triángulo rectángulo miden 48 cm y 71 cm. Calcula el ángulo opuesto al cateto de 48 cm.', 'ضلعا مثلث قائم 48 سم و71 سم. احسب الزاوية المقابلة للضلع 48 سم.'), TENTHS), solution: same('$\\tg\\alpha=\\frac{48}{71}\\approx 0{,}676\\qquad \\alpha\\approx 34{,}06°\\approx 34{,}1°$'), answer: { expected: v('34,1') } },
            { id: 25, difficulty: 'medium', question: with_(say('Angelu zorrotz bat 37° da eta haren aurkako katetoa 87 m. Kalkulatu hipotenusa.', 'Un ángulo agudo mide 37° y su cateto opuesto 87 m. Calcula la hipotenusa.', 'زاوية حادة قياسها 37° والضلع المقابل لها 87 م. احسب الوتر.'), HUNDREDTHS), solution: same('$a=\\frac{87}{\\sen 37°}\\approx 144{,}56$'), answer: { expected: v('144,56') } },
            { id: 26, difficulty: 'medium', question: with_(say('Jokalari batek 11 m-ra jaurtitzen du baloia, 38°-ko angeluarekin, zuzen-zuzen igotzen dela suposatuta. Zer altueratan iristen da atera?', 'Un jugador chuta desde 11 m con un ángulo de 38°, suponiendo que el balón sube en línea recta. ¿A qué altura llega a la portería?', 'يسدد لاعب من بعد 11 م بزاوية 38°، بفرض أن الكرة تصعد في خط مستقيم. على أي ارتفاع تصل إلى المرمى؟'), HUNDREDTHS), solution: same('$h=11\\cdot\\tg 38°\\approx 8{,}59$'), answer: { expected: v('8,59') } },
            { id: 27, difficulty: 'medium', question: with_(say('50 m-ko itsasargi batetik txalupa bat 30°-ko beheratze-angeluarekin ikusten da. Zer distantziatara dago itsasargiaren oinarritik?', 'Desde un faro de 50 m se ve una barca con un ángulo de depresión de 30°. ¿A qué distancia está del pie del faro?', 'من منارة ارتفاعها 50 م يُرى قارب بزاوية انخفاض 30°. على أي بعد هو من قاعدة المنارة؟'), HUNDREDTHS), solution: same('$d=\\frac{50}{\\tg 30°}=50\\sqrt{3}\\approx 86{,}60$'), answer: { expected: v('86,6') } },
            { id: 28, difficulty: 'hard', question: with_(say('Kometa baten haria 50 m da eta lurrarekin 55° osatzen ditu. Zer altueratan dago kometa?', 'El hilo de una cometa mide 50 m y forma 55° con el suelo. ¿A qué altura está la cometa?', 'خيط طائرة ورقية طوله 50 م ويصنع 55° مع الأرض. على أي ارتفاع هي الطائرة؟'), HUNDREDTHS), solution: same('$h=50\\cdot\\sen 55°\\approx 40{,}96$'), answer: { expected: v('40,96') } },
            { id: 29, difficulty: 'hard', question: with_(say('2 m-ko zutoin batek 3,5 m-ko itzala du. Zer angelu osatzen dute eguzki-izpiek lurrarekin?', 'Un poste de 2 m da una sombra de 3,5 m. ¿Qué ángulo forman los rayos del sol con el suelo?', 'عمود طوله 2 م ظله 3.5 م. ما الزاوية التي تصنعها أشعة الشمس مع الأرض؟'), TENTHS), solution: same('$\\tg\\alpha=\\frac{2}{3{,}5}\\approx 0{,}571\\qquad \\alpha\\approx 29{,}74°\\approx 29{,}7°$'), answer: { expected: v('29,7') } },
            { id: 30, difficulty: 'hard', question: with_(say('Errepide baten seinale batek % 8ko malda adierazten du (100 m horizontalean 8 m igotzen da). Zer angelu osatzen du errepideak horizontalarekin?', 'Una señal indica una pendiente del 8 % (sube 8 m por cada 100 m en horizontal). ¿Qué ángulo forma la carretera con la horizontal?', 'تشير لافتة إلى ميل 8 % (ترتفع 8 م لكل 100 م أفقيًا). ما الزاوية التي يصنعها الطريق مع الأفقي؟'), TENTHS), solution: same('$\\tg\\alpha=\\frac{8}{100}=0{,}08\\qquad \\alpha\\approx 4{,}57°\\approx 4{,}6°$'), answer: { expected: v('4,6') } }
        ]
    },
    {
        id: 'problems',
        title: say('Altuerak, distantziak eta azalerak', 'Alturas, distancias y áreas', 'الارتفاعات والمسافات والمساحات'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Triangelu baten bi aldeak 10 cm eta 12 cm dira, eta haien arteko angelua 30°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 10 cm y 12 cm y forman 30°. Calcula su área.', 'ضلعان في مثلث طولاهما 10 سم و12 سم والزاوية بينهما 30°. احسب مساحته.'), solution: same('$\\frac{1}{2}\\cdot 10\\cdot 12\\cdot\\frac{1}{2}=30$'), answer: { expected: n(30) } },
            { id: 32, difficulty: 'easy', question: say('Triangelu baten bi aldeak 5 cm eta 6 cm dira, eta haien arteko angelua 90°. Kalkulatu azalera formula trigonometrikoarekin.', 'Dos lados de un triángulo miden 5 cm y 6 cm y forman 90°. Calcula su área con la fórmula trigonométrica.', 'ضلعان في مثلث طولاهما 5 سم و6 سم والزاوية بينهما 90°. احسب مساحته بالصيغة المثلثية.'), solution: same('$\\frac{1}{2}\\cdot 5\\cdot 6\\cdot 1=15$'), answer: { expected: n(15) } },
            { id: 33, difficulty: 'medium', question: with_(say('Triangelu baten bi aldeak 6 cm eta 9 cm dira, eta haien arteko angelua 50°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 6 cm y 9 cm y forman 50°. Calcula su área.', 'ضلعان في مثلث طولاهما 6 سم و9 سم والزاوية بينهما 50°. احسب مساحته.'), HUNDREDTHS), solution: same('$\\frac{1}{2}\\cdot 6\\cdot 9\\cdot\\sen 50°\\approx 20{,}68$'), answer: { expected: v('20,68') } },
            { id: 34, difficulty: 'medium', question: with_(say('Paralelogramo baten aldeak 8 cm eta 5 cm dira, eta haien arteko angelua 60°. Kalkulatu azalera.', 'Un paralelogramo tiene lados de 8 cm y 5 cm que forman 60°. Calcula su área.', 'متوازي أضلاع ضلعاه 8 سم و5 سم والزاوية بينهما 60°. احسب مساحته.'), HUNDREDTHS), solution: same('$8\\cdot 5\\cdot\\sen 60°=20\\sqrt{3}\\approx 34{,}64$'), answer: { expected: v('34,64') } },
            { id: 35, difficulty: 'medium', question: with_(say('Kalkulatu 6 cm-ko aldeko pentagono erregular baten azalera, apotema tangentearekin aurkituz.', 'Calcula el área de un pentágono regular de 6 cm de lado, hallando la apotema con la tangente.', 'احسب مساحة مخمس منتظم ضلعه 6 سم، مع إيجاد العامد بالظل.'), HUNDREDTHS), solution: same('$\\text{ap}=\\frac{3}{\\tg 36°}\\approx 4{,}129\\qquad \\frac{30\\cdot 4{,}129}{2}\\approx 61{,}94$'), answer: { expected: v('61,94') } },
            { id: 36, difficulty: 'medium', question: with_(say('ABC triangeluan $AB=10$ cm eta $A=40°$. Kalkulatu B-tik AC aldera doan altuera.', 'En el triángulo ABC, $AB=10$ cm y $A=40°$. Calcula la altura desde B sobre AC.', 'في المثلث ABC: $AB=10$ سم و$A=40°$. احسب الارتفاع من B على AC.'), HUNDREDTHS), solution: same('$h=10\\cdot\\sen 40°\\approx 6{,}43$'), answer: { expected: v('6,43') } },
            { id: 37, difficulty: 'medium', question: with_(say('Dorre baten goialdea 45°-ko angeluarekin ikusten da; 10 m urrundu ondoren, 30°-koarekin. Kalkulatu dorrearen altuera.', 'La punta de una torre se ve con un ángulo de 45°; tras alejarse 10 m, con uno de 30°. Calcula la altura de la torre.', 'تُرى قمة برج بزاوية 45°، وبعد الابتعاد 10 م بزاوية 30°. احسب ارتفاع البرج.'), HUNDREDTHS), solution: same('$h=(h+10)\\cdot\\frac{\\sqrt{3}}{3}\\ \\to\\ h=5\\sqrt{3}+5\\approx 13{,}66$'), answer: { expected: v('13,66') } },
            { id: 38, difficulty: 'hard', question: with_(say('Elkarrengandik 100 m-ra dauden bi lagunek, dorre baten alde banatan, haren goialdea 30°-ko eta 45°-ko angeluekin ikusten dute. Kalkulatu dorrearen altuera.', 'Dos amigos separados 100 m, uno a cada lado de una torre, ven su punta con ángulos de 30° y 45°. Calcula la altura de la torre.', 'صديقان المسافة بينهما 100 م، كل منهما في جهة من برج، يريان قمته بزاويتين 30° و45°. احسب ارتفاع البرج.'), HUNDREDTHS), solution: same('$\\frac{h}{\\tg 30°}+\\frac{h}{\\tg 45°}=100\\ \\to\\ h=\\frac{100}{\\sqrt{3}+1}\\approx 36{,}60$'), answer: { expected: v('36,6') } },
            { id: 39, difficulty: 'hard', question: with_(say('ABC triangeluan $AC=100$ cm, $A=42°$ eta $C=18°$. Kalkulatu B-tik AC aldera doan altuera.', 'En el triángulo ABC, $AC=100$ cm, $A=42°$ y $C=18°$. Calcula la altura desde B sobre AC.', 'في المثلث ABC: $AC=100$ سم و$A=42°$ و$C=18°$. احسب الارتفاع من B على AC.'), HUNDREDTHS), solution: same('$h=x\\cdot\\tg 42°=(100-x)\\cdot\\tg 18°\\ \\to\\ x\\approx 26{,}52\\qquad h\\approx 23{,}88$'), answer: { expected: v('23,88') } },
            { id: 40, difficulty: 'hard', question: say('Zergatik behar dira bi neurketa ibai baten beste aldean dagoen zuhaitz baten altuera kalkulatzeko?', '¿Por qué hacen falta dos mediciones para calcular la altura de un árbol al otro lado de un río?', 'لماذا يلزم قياسان لحساب ارتفاع شجرة على الضفة الأخرى من نهر؟'), solution: say('Bi ezezagun daude, altuera eta oinarrirainoko distantzia, eta angelu bakoitzak ekuazio bakarra ematen du. Bi angeluk eta haien arteko distantziak bi ekuazioko sistema bat osatzen dute.', 'Hay dos incógnitas, la altura y la distancia al pie, y cada ángulo da una sola ecuación. Dos ángulos y la distancia entre ellos forman un sistema de dos ecuaciones.', 'هناك مجهولان، الارتفاع والمسافة إلى القاعدة، وكل زاوية تعطي معادلة واحدة. فالزاويتان والمسافة بينهما تكوّن نظامًا من معادلتين.') }
        ]
    },
    {
        id: 'circle',
        title: say('Zirkunferentzia goniometrikoa', 'La circunferencia goniométrica', 'الدائرة المثلثية'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zenbat da $\\cos 180°$?', '¿Cuánto vale $\\cos 180°$?', 'كم يساوي $\\cos 180°$؟'), solution: say('180°-ko puntua $(-1,0)$ da: $\\cos 180°=-1$.', 'El punto de 180° es $(-1,0)$: $\\cos 180°=-1$.', 'نقطة 180° هي $(-1,0)$: $\\cos 180°=-1$.'), answer: { expected: n(-1) } },
            { id: 42, difficulty: 'easy', question: say('Zein koadrantetan dago 200°-ko angelua, eta zer zeinu ditu haren tangenteak?', '¿En qué cuadrante está el ángulo de 200° y qué signo tiene su tangente?', 'في أي ربع تقع الزاوية 200° وما إشارة ظلها؟'), solution: say('III. koadrantean (180° eta 270° artean); sinua eta kosinua negatiboak dira, beraz tangentea positiboa.', 'En el III cuadrante (entre 180° y 270°); seno y coseno son negativos, así que la tangente es positiva.', 'في الربع الثالث (بين 180° و270°)؛ الجيب وجيب التمام سالبان، إذن الظل موجب.') },
            { id: 43, difficulty: 'easy', question: with_(say('Pasa 90° radianetara, hamartar gisa.', 'Pasa 90° a radianes, en forma decimal.', 'حوّل 90° إلى الراديان في صورة عشرية.'), HUNDREDTHS), solution: same('$90°=\\frac{\\pi}{2}\\approx 1{,}57$'), answer: { expected: v('1,57') } },
            { id: 44, difficulty: 'medium', question: with_(say('Kalkulatu $\\sen 135°$, balio zehatzetik abiatuta.', 'Calcula $\\sen 135°$ a partir de su valor exacto.', 'احسب $\\sen 135°$ انطلاقًا من قيمته المضبوطة.'), HUNDREDTHS), solution: same('$\\sen 135°=\\sen 45°=\\frac{\\sqrt{2}}{2}\\approx 0{,}71$'), answer: { expected: v('0,71') } },
            { id: 45, difficulty: 'medium', question: with_(say('Pasa 150° radianetara, hamartar gisa.', 'Pasa 150° a radianes, en forma decimal.', 'حوّل 150° إلى الراديان في صورة عشرية.'), HUNDREDTHS), solution: same('$150°=\\frac{5\\pi}{6}\\approx 2{,}62$'), answer: { expected: v('2,62') } },
            { id: 46, difficulty: 'medium', question: with_(say('Pasa 2 rad gradutara.', 'Pasa 2 rad a grados.', 'حوّل 2 rad إلى الدرجات.'), TENTHS), solution: same('$2\\cdot\\frac{180°}{\\pi}\\approx 114{,}59°\\approx 114{,}6°$'), answer: { expected: v('114,6') } },
            { id: 47, difficulty: 'medium', question: say('0° eta 360° arteko zein angeluk ditu −30°-ren arrazoi berak?', '¿Qué ángulo entre 0° y 360° tiene las mismas razones que −30°?', 'أي زاوية بين 0° و360° لها نسب −30° نفسها؟'), solution: same('$-30+360=330$'), answer: { expected: n(330) } },
            { id: 48, difficulty: 'medium', question: say('Zenbat da $\\tg 225°$?', '¿Cuánto vale $\\tg 225°$?', 'كم يساوي $\\tg 225°$؟'), solution: say('$225°=180°+45°$, eta tangentea ez da aldatzen: $\\tg 225°=\\tg 45°=1$.', '$225°=180°+45°$, y la tangente no cambia: $\\tg 225°=\\tg 45°=1$.', '$225°=180°+45°$، والظل لا يتغير: $\\tg 225°=\\tg 45°=1$.'), answer: { expected: n(1) } },
            { id: 49, difficulty: 'hard', question: say('$\\cos\\alpha=0{,}8$ eta $\\alpha$ IV. koadrantean dago. Kalkulatu $\\sen\\alpha$.', '$\\cos\\alpha=0{,}8$ y $\\alpha$ está en el IV cuadrante. Calcula $\\sen\\alpha$.', '$\\cos\\alpha=0{,}8$ و$\\alpha$ في الربع الرابع. احسب $\\sen\\alpha$.'), solution: same('$\\sen^{2}\\alpha=1-0{,}64=0{,}36\\qquad \\sen\\alpha=-0{,}6$'), answer: { expected: v('-0,6') } },
            { id: 50, difficulty: 'hard', question: say('Zergatik ez da existitzen $\\tg 90°$?', '¿Por qué no existe $\\tg 90°$?', 'لماذا لا يوجد $\\tg 90°$؟'), solution: say('90°-ko puntua $(0,1)$ da; tangentea $\\frac{y}{x}=\\frac{1}{0}$ litzateke, eta ezin da 0z zatitu.', 'El punto de 90° es $(0,1)$; la tangente sería $\\frac{y}{x}=\\frac{1}{0}$, y no se puede dividir entre 0.', 'نقطة 90° هي $(0,1)$؛ فالظل سيكون $\\frac{y}{x}=\\frac{1}{0}$، ولا تجوز القسمة على 0.') }
        ]
    }
]
