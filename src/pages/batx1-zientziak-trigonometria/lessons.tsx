import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CrossingsFigure,
    DoubleAngleFigure,
    EquationCircleFigure,
    FerrisFigure,
    FormulaSignsFigure,
    HalfAngleFigure,
    IdentityFigure,
    KnownRatiosFigure,
    PhaseFigure,
    RadiansFigure,
    SixRatiosFigure,
    SumAnglesFigure,
    SumToProductFigure
} from './figures'
import { trigonometryLessonChecks, type TrigonometryTopicId } from './lessonChecks'
import { trigonometryLessonTexts } from './lessonTexts'
import { localizeNames, same, say } from './text'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 · Zientziak —
   stages and lessons. The scope follows unit 5 of Anaya Matemáticas I
   (sum and difference, double and half angle, sums into products,
   equations, the radian and the graphs) and the first half of unit 4 of
   Santillana 1.º Bachillerato Ciencias (the radian, sec, cosec and cotg,
   the formulas and the equations). What 4. DBH académicas already taught
   (the radian, the graphs with amplitude and period) comes back as a short
   review with «Review first» links. Inside formulas \sen, \tg, \cosec and
   \cotg are written in each language's names (text.ts); lessonTexts.ts and
   lessonChecks.ts write \sin, \tan, \csc and \cot and localizeNames turns
   them into those names. Equations are solved in degrees between 0° and
   360°; the graphs use radians.
   ========================================================================== */

export type TrigonometryStageId = 'ratios' | 'sums' | 'double' | 'equations' | 'functions'

export const trigonometryStages: UnitStage[] = [
    { id: 'ratios', tone: 'blue', title: { eu: 'Sei arrazoiak', es: 'Las seis razones', en: 'The six ratios', ar: 'النسب الست' } },
    { id: 'sums', tone: 'violet', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Sums and differences', ar: 'المجموع والفرق' } },
    { id: 'double', tone: 'mustard', title: { eu: 'Bikoitza eta erdia', es: 'Doble y mitad', en: 'Double and half', ar: 'الضعف والنصف' } },
    { id: 'equations', tone: 'coral', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' } },
    { id: 'functions', tone: 'green', title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The six ratios ---------- */
    {
        id: 'radians-review',
        stage: 'ratios',
        title: say('Graduak eta radianak', 'Grados y radianes', 'الدرجات والراديان', 'Degrees and radians'),
        goal: say('Angeluak graduetatik radianetara eta alderantziz pasatzea, funtzioen grafikoetan erabiltzeko.', 'Pasar ángulos de grados a radianes y al revés, para usarlos en las gráficas de las funciones.', 'تحويل الزوايا من الدرجات إلى الراديان والعكس لاستعمالها في تمثيل الدوال.', 'Convert angles from degrees to radians and back, to use them in the graphs of the functions.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'radians', title: { eu: 'Radiana', es: 'El radián', en: 'The radian', ar: 'الراديان' } },
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'trig-values', title: { eu: 'Angeluak radianetan', es: 'Ángulos en radianes', en: 'Angles in radians', ar: 'الزوايا بالراديان' } }
        ],
        problem: say('Pasatu 135° radianetara, eta $\\frac{7\\pi}{6}$ rad gradutara.', 'Pasa 135° a radianes y $\\frac{7\\pi}{6}$ rad a grados.', 'حوّل 135° إلى الراديان و$\\frac{7\\pi}{6}$ rad إلى الدرجات.', 'Convert 135° to radians and $\\frac{7\\pi}{6}$ rad to degrees.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Radianetara: bider $\\frac{\\pi}{180}$.', 'A radianes: por $\\frac{\\pi}{180}$.', 'إلى الراديان: في $\\frac{\\pi}{180}$.', 'To radians: times $\\frac{\\pi}{180}$.'), math: same('$135°=135\\cdot\\frac{\\pi}{180}=\\frac{3\\pi}{4}$') },
            { text: say('Gradutara: π ordez 180° jarri.', 'A grados: cambia π por 180°.', 'إلى الدرجات: ضع 180° مكان π.', 'To degrees: put 180° in place of π.'), math: same('$\\frac{7\\pi}{6}=\\frac{7\\cdot 180°}{6}=210°$') }
        ],
        takeaway: say('$180°=\\pi$ rad: radianetara pasatzeko, bider $\\frac{\\pi}{180}$; gradutara itzultzeko, bider $\\frac{180}{\\pi}$.', '$180°=\\pi$ rad: para pasar a radianes, por $\\frac{\\pi}{180}$; para volver a grados, por $\\frac{180}{\\pi}$.', '$180°=\\pi$ rad: للتحويل إلى الراديان اضرب في $\\frac{\\pi}{180}$، وللعودة إلى الدرجات اضرب في $\\frac{180}{\\pi}$.', '$180°=\\pi$ rad: to convert to radians, times $\\frac{\\pi}{180}$; to go back to degrees, times $\\frac{180}{\\pi}$.'),
        figure: (language) => <RadiansFigure language={language} />
    },
    {
        id: 'reciprocal',
        stage: 'ratios',
        figureAfterSteps: true,
        title: say('Sekantea, kosekantea eta kotangentea', 'Secante, cosecante y cotangente', 'القاطع وقاطع التمام وظل التمام', 'Secant, cosecant and cotangent'),
        goal: say('Hiru arrazoi alderantzizkoak kalkulatzea eta $1+\\tg^2\\alpha=\\sec^2\\alpha$ erlazioa erabiltzea.', 'Calcular las tres razones inversas y usar la relación $1+\\tg^2\\alpha=\\sec^2\\alpha$.', 'حساب النسب المقلوبة الثلاث واستعمال العلاقة $1+\\tg^2\\alpha=\\sec^2\\alpha$.', 'Work out the three reciprocal ratios and use the identity $1+\\tan^2\\alpha=\\sec^2\\alpha$.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'quadrant-ratios', title: { eu: 'Arrazoiak lau koadranteetan', es: 'Razones en los cuatro cuadrantes', en: 'Ratios in the four quadrants', ar: 'النسب في الأرباع الأربعة' } }
        ],
        problem: say('$\\cos\\alpha=\\frac{3}{5}$ da, eta α laugarren koadrantean dago. Kalkulatu $\\sec\\alpha$, $\\cosec\\alpha$ eta $\\cotg\\alpha$.', '$\\cos\\alpha=\\frac{3}{5}$ y α está en el cuarto cuadrante. Halla $\\sec\\alpha$, $\\cosec\\alpha$ y $\\cotg\\alpha$.', '$\\cos\\alpha=\\frac{3}{5}$ وα في الربع الرابع. أوجد $\\sec\\alpha$ و$\\cosec\\alpha$ و$\\cotg\\alpha$.', '$\\cos\\alpha=\\frac{3}{5}$ and α is in the fourth quadrant. Find $\\sec\\alpha$, $\\csc\\alpha$ and $\\cot\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sinua, laugarren koadrantean negatiboa.', 'El seno, negativo en el cuarto cuadrante.', 'الجيب سالب في الربع الرابع.', 'The sine, negative in the fourth quadrant.'), math: same('$\\sen\\alpha=-\\frac{4}{5}$') },
            { text: say('Sekantea, kosinuaren alderantzizkoa.', 'La secante, inversa del coseno.', 'القاطع مقلوب جيب التمام.', 'The secant, the reciprocal of the cosine.'), math: same('$\\sec\\alpha=\\frac{1}{\\cos\\alpha}=\\frac{5}{3}$') },
            { text: say('Kosekantea eta kotangentea.', 'La cosecante y la cotangente.', 'قاطع التمام وظل التمام.', 'The cosecant and the cotangent.'), math: same('$\\cosec\\alpha=-\\frac{5}{4}\\qquad\\cotg\\alpha=-\\frac{3}{4}$') }
        ],
        takeaway: say('$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$, $\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$ eta $\\cotg\\alpha=\\frac{1}{\\tg\\alpha}$; gainera, $1+\\tg^2\\alpha=\\sec^2\\alpha$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$, $\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$ y $\\cotg\\alpha=\\frac{1}{\\tg\\alpha}$; además, $1+\\tg^2\\alpha=\\sec^2\\alpha$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$ و$\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$ و$\\cotg\\alpha=\\frac{1}{\\tg\\alpha}$، وكذلك $1+\\tg^2\\alpha=\\sec^2\\alpha$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$, $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$ and $\\cot\\alpha=\\frac{1}{\\tan\\alpha}$; also, $1+\\tan^2\\alpha=\\sec^2\\alpha$.'),
        figure: (language) => <SixRatiosFigure language={language} />
    },
    {
        id: 'identities',
        stage: 'ratios',
        title: say('Identitateak frogatzea', 'Demostrar identidades', 'إثبات المتطابقات', 'Proving identities'),
        goal: say('Identitate trigonometrikoak frogatzea eta adierazpenak sinplifikatzea, dena sinuz eta kosinuz idatzita.', 'Demostrar identidades trigonométricas y simplificar expresiones escribiéndolo todo con senos y cosenos.', 'إثبات المتطابقات المثلثية وتبسيط العبارات بكتابة كل شيء بالجيب وجيب التمام.', 'Prove trigonometric identities and simplify expressions by writing everything with sines and cosines.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'fundamental', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', en: 'Fundamental relationships', ar: 'العلاقات الأساسية' } }
        ],
        problem: say('Frogatu $\\tg\\alpha+\\cotg\\alpha=\\sec\\alpha\\cdot\\cosec\\alpha$.', 'Demuestra que $\\tg\\alpha+\\cotg\\alpha=\\sec\\alpha\\cdot\\cosec\\alpha$.', 'أثبت أن $\\tg\\alpha+\\cotg\\alpha=\\sec\\alpha\\cdot\\cosec\\alpha$.', 'Prove that $\\tan\\alpha+\\cot\\alpha=\\sec\\alpha\\cdot\\csc\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi dena sinuz eta kosinuz.', 'Escribe todo con senos y cosenos.', 'اكتب كل شيء بالجيب وجيب التمام.', 'Write everything with sines and cosines.'), math: same('$\\tg\\alpha+\\cotg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}+\\frac{\\cos\\alpha}{\\sen\\alpha}$') },
            { text: say('Izendatzaile komuna.', 'Común denominador.', 'مقام مشترك.', 'A common denominator.'), math: same('$=\\frac{\\sen^2\\alpha+\\cos^2\\alpha}{\\sen\\alpha\\cos\\alpha}$') },
            { text: say('Zenbakitzailea 1 da.', 'El numerador vale 1.', 'البسط يساوي 1.', 'The numerator is 1.'), math: same('$=\\frac{1}{\\cos\\alpha}\\cdot\\frac{1}{\\sen\\alpha}=\\sec\\alpha\\cdot\\cosec\\alpha$') }
        ],
        takeaway: say('Identitate bat frogatzeko, hartu alde bat, idatzi sinuz eta kosinuz, eta erabili $\\sen^2\\alpha+\\cos^2\\alpha=1$ beste aldera iritsi arte.', 'Para demostrar una identidad, parte de un lado, escríbelo con senos y cosenos y usa $\\sen^2\\alpha+\\cos^2\\alpha=1$ hasta llegar al otro.', 'لإثبات متطابقة ابدأ من طرف واكتبه بالجيب وجيب التمام واستعمل $\\sen^2\\alpha+\\cos^2\\alpha=1$ حتى تصل إلى الطرف الآخر.', 'To prove an identity, start from one side, write it with sines and cosines and use $\\sin^2\\alpha+\\cos^2\\alpha=1$ until you reach the other side.'),
        figure: (language) => <IdentityFigure language={language} />
    },

    /* ---------- 2. Sums and differences ---------- */
    {
        id: 'sum-formulas',
        stage: 'sums',
        title: say('Batuketaren sinua eta kosinua', 'Seno y coseno de una suma', 'جيب مجموع زاويتين وجيب تمامه', 'Sine and cosine of a sum'),
        goal: say('Batuketaren formulak erabiltzea angelu baten arrazoi zehatzak kalkulagailurik gabe lortzeko.', 'Usar las fórmulas de la suma para obtener sin calculadora las razones exactas de un ángulo.', 'استعمال صيغ المجموع لإيجاد النسب الدقيقة لزاوية دون آلة حاسبة.', 'Use the sum formulas to get the exact ratios of an angle without a calculator.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'notable-angles', title: { eu: '30°, 45° eta 60°', es: '30°, 45° y 60°', en: '30°, 45° and 60°', ar: '30° و45° و60°' } }
        ],
        problem: say('Kalkulatu $\\sen 75°$ kalkulagailurik gabe.', 'Calcula $\\sen 75°$ sin calculadora.', 'احسب $\\sen 75°$ دون آلة حاسبة.', 'Work out $\\sin 75°$ without a calculator.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi angelu nabarmenen batura gisa.', 'Escríbelo como suma de ángulos notables.', 'اكتبها مجموعَ زاويتين شهيرتين.', 'Write it as a sum of notable angles.'), math: same('$75°=45°+30°$') },
            { text: say('Batuketaren sinuaren formula.', 'La fórmula del seno de la suma.', 'صيغة جيب المجموع.', 'The formula for the sine of a sum.'), math: same('$\\sen 75°=\\sen 45°\\cos 30°+\\cos 45°\\sen 30°$') },
            { text: say('Ordezkatu eta biderkatu.', 'Sustituye y multiplica.', 'عوّض واضرب.', 'Substitute and multiply.'), math: same('$\\begin{gathered}\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}\\\\ =\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\end{gathered}$') }
        ],
        takeaway: say('$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$ eta $\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: kosinuak zeinua aldatzen du.', '$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$ y $\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: el coseno cambia el signo.', '$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$ و$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: جيب التمام يغيّر الإشارة.', '$\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$ and $\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$: the cosine changes the sign.'),
        figure: (language) => <SumAnglesFigure language={language} />
    },
    {
        id: 'difference-tangent',
        stage: 'sums',
        title: say('Kenketa eta tangentea', 'La resta y la tangente', 'الفرق والظل', 'The difference and the tangent'),
        goal: say('Kenketaren formulak eta batuketaren eta kenketaren tangentea erabiltzea.', 'Usar las fórmulas de la resta y la tangente de una suma y de una resta.', 'استعمال صيغ الفرق وظل المجموع وظل الفرق.', 'Use the difference formulas and the tangent of a sum and of a difference.'),
        problem: say('Kalkulatu $\\tg 15°$ kalkulagailurik gabe.', 'Calcula $\\tg 15°$ sin calculadora.', 'احسب $\\tg 15°$ دون آلة حاسبة.', 'Work out $\\tan 15°$ without a calculator.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi kenketa gisa.', 'Escríbelo como una resta.', 'اكتبها فرقًا.', 'Write it as a difference.'), math: same('$15°=45°-30°$') },
            { text: say('Kenketaren tangentea.', 'La tangente de la resta.', 'ظل الفرق.', 'The tangent of the difference.'), math: same('$\\tg(45°-30°)=\\frac{\\tg 45°-\\tg 30°}{1+\\tg 45°\\cdot\\tg 30°}$') },
            { text: say('Ordezkatu: $\\tg 30°=\\frac{\\sqrt{3}}{3}$.', 'Sustituye: $\\tg 30°=\\frac{\\sqrt{3}}{3}$.', 'عوّض: $\\tg 30°=\\frac{\\sqrt{3}}{3}$.', 'Substitute: $\\tan 30°=\\frac{\\sqrt{3}}{3}$.'), math: same('$\\frac{1-\\frac{\\sqrt{3}}{3}}{1+\\frac{\\sqrt{3}}{3}}=2-\\sqrt{3}$') }
        ],
        takeaway: say('$\\tg(\\alpha\\pm\\beta)=\\frac{\\tg\\alpha\\pm\\tg\\beta}{1\\mp\\tg\\alpha\\,\\tg\\beta}$. Kenketan, sinuaren eta tangentearen zeinua − bihurtzen da, eta kosinuarena +.', '$\\tg(\\alpha\\pm\\beta)=\\frac{\\tg\\alpha\\pm\\tg\\beta}{1\\mp\\tg\\alpha\\,\\tg\\beta}$. En la resta, el signo del seno y el de la tangente pasan a −, y el del coseno a +.', '$\\tg(\\alpha\\pm\\beta)=\\frac{\\tg\\alpha\\pm\\tg\\beta}{1\\mp\\tg\\alpha\\,\\tg\\beta}$. في الفرق تصير إشارة الجيب والظل − وإشارة جيب التمام +.', '$\\tan(\\alpha\\pm\\beta)=\\frac{\\tan\\alpha\\pm\\tan\\beta}{1\\mp\\tan\\alpha\\,\\tan\\beta}$. In the difference, the sign of the sine and of the tangent turns into −, and that of the cosine into +.'),
        figure: (language) => <FormulaSignsFigure language={language} />
    },
    {
        id: 'known-ratios',
        stage: 'sums',
        figureAfterSteps: true,
        title: say('Arrazoi ezagunekin batzea', 'Sumar con razones conocidas', 'المجموع بنسب معلومة', 'Adding with known ratios'),
        goal: say('Bi angeluren arrazoi batetik abiatuta, haien batuketaren edo kenketaren arrazoiak kalkulatzea.', 'Calcular las razones de la suma o de la resta de dos ángulos a partir de una razón de cada uno.', 'حساب نسب مجموع زاويتين أو فرقهما انطلاقًا من نسبة لكل منهما.', 'Work out the ratios of the sum or the difference of two angles from one ratio of each.'),
        problem: say('α eta β zorrotzak dira, $\\sen\\alpha=\\frac{3}{5}$ eta $\\cos\\beta=\\frac{5}{13}$. Kalkulatu $\\sen(\\alpha+\\beta)$.', 'α y β son agudos, $\\sen\\alpha=\\frac{3}{5}$ y $\\cos\\beta=\\frac{5}{13}$. Halla $\\sen(\\alpha+\\beta)$.', 'α وβ حادتان، و$\\sen\\alpha=\\frac{3}{5}$ و$\\cos\\beta=\\frac{5}{13}$. أوجد $\\sen(\\alpha+\\beta)$.', 'α and β are acute, $\\sin\\alpha=\\frac{3}{5}$ and $\\cos\\beta=\\frac{5}{13}$. Find $\\sin(\\alpha+\\beta)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu lau arrazoiak, positiboak.', 'Completa las cuatro razones, positivas.', 'أكمل النسب الأربع، وهي موجبة.', 'Complete the four ratios, all positive.'), math: same('$\\cos\\alpha=\\frac{4}{5}\\qquad\\sen\\beta=\\frac{12}{13}$') },
            { text: say('Batuketaren sinua.', 'El seno de la suma.', 'جيب المجموع.', 'The sine of the sum.'), math: same('$\\sen(\\alpha+\\beta)=\\frac{3}{5}\\cdot\\frac{5}{13}+\\frac{4}{5}\\cdot\\frac{12}{13}$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$=\\frac{15+48}{65}=\\frac{63}{65}$') }
        ],
        takeaway: say('Lehenik, osatu α eta β angeluen sinua eta kosinua, $\\sen^2+\\cos^2=1$ erlazioarekin eta koadrantearekin; gero, formula.', 'Primero completa el seno y el coseno de α y de β, con $\\sen^2+\\cos^2=1$ y el cuadrante; después, la fórmula.', 'أكمل أولًا جيب α وβ وجيب تمامهما بـ $\\sen^2+\\cos^2=1$ والربع، ثم الصيغة.', 'First complete the sine and cosine of α and β, with $\\sin^2+\\cos^2=1$ and the quadrant; then the formula.'),
        figure: (language) => <KnownRatiosFigure language={language} />
    },

    /* ---------- 3. Double and half angle ---------- */
    {
        id: 'double-angle',
        stage: 'double',
        title: say('Angelu bikoitza', 'El ángulo doble', 'ضعف الزاوية', 'The double angle'),
        goal: say('$2\\alpha$ angeluaren arrazoiak α-renetatik kalkulatzea.', 'Calcular las razones de $2\\alpha$ a partir de las de α.', 'حساب نسب $2\\alpha$ من نسب α.', 'Work out the ratios of $2\\alpha$ from those of α.'),
        problem: say('$\\sen\\alpha=\\frac{3}{5}$ da, eta α bigarren koadrantean dago. Kalkulatu $\\sen 2\\alpha$ eta $\\cos 2\\alpha$.', '$\\sen\\alpha=\\frac{3}{5}$ y α está en el segundo cuadrante. Halla $\\sen 2\\alpha$ y $\\cos 2\\alpha$.', '$\\sen\\alpha=\\frac{3}{5}$ وα في الربع الثاني. أوجد $\\sen 2\\alpha$ و$\\cos 2\\alpha$.', '$\\sin\\alpha=\\frac{3}{5}$ and α is in the second quadrant. Find $\\sin 2\\alpha$ and $\\cos 2\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kosinua, bigarren koadrantean negatiboa.', 'El coseno, negativo en el segundo cuadrante.', 'جيب التمام سالب في الربع الثاني.', 'The cosine, negative in the second quadrant.'), math: same('$\\cos\\alpha=-\\frac{4}{5}$') },
            { text: say('Angelu bikoitzaren sinua.', 'El seno del ángulo doble.', 'جيب ضعف الزاوية.', 'The sine of the double angle.'), math: same('$\\sen 2\\alpha=2\\cdot\\frac{3}{5}\\cdot\\left(-\\frac{4}{5}\\right)=-\\frac{24}{25}$') },
            { text: say('Haren kosinua.', 'Su coseno.', 'جيب تمامها.', 'Its cosine.'), math: same('$\\cos 2\\alpha=\\frac{16}{25}-\\frac{9}{25}=\\frac{7}{25}$') }
        ],
        takeaway: say('$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$ eta $\\cos 2\\alpha=\\cos^2\\alpha-\\sen^2\\alpha=1-2\\sen^2\\alpha=2\\cos^2\\alpha-1$.', '$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$ y $\\cos 2\\alpha=\\cos^2\\alpha-\\sen^2\\alpha=1-2\\sen^2\\alpha=2\\cos^2\\alpha-1$.', '$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$ و$\\cos 2\\alpha=\\cos^2\\alpha-\\sen^2\\alpha=1-2\\sen^2\\alpha=2\\cos^2\\alpha-1$.', '$\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha$ and $\\cos 2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha=1-2\\sin^2\\alpha=2\\cos^2\\alpha-1$.'),
        figure: (language) => <DoubleAngleFigure language={language} />
    },
    {
        id: 'half-angle',
        stage: 'double',
        title: say('Angelu erdia', 'El ángulo mitad', 'نصف الزاوية', 'The half angle'),
        goal: say('$\\frac{\\alpha}{2}$ angeluaren arrazoiak $\\cos\\alpha$ kosinutik kalkulatzea, zeinua ondo aukeratuta.', 'Calcular las razones de $\\frac{\\alpha}{2}$ a partir de $\\cos\\alpha$, eligiendo bien el signo.', 'حساب نسب $\\frac{\\alpha}{2}$ من $\\cos\\alpha$ مع اختيار الإشارة الصحيحة.', 'Work out the ratios of $\\frac{\\alpha}{2}$ from $\\cos\\alpha$, choosing the sign carefully.'),
        problem: say('$\\cos\\alpha=-\\frac{7}{25}$ da, eta α bigarren koadrantean dago. Kalkulatu $\\sen\\frac{\\alpha}{2}$ eta $\\cos\\frac{\\alpha}{2}$.', '$\\cos\\alpha=-\\frac{7}{25}$ y α está en el segundo cuadrante. Halla $\\sen\\frac{\\alpha}{2}$ y $\\cos\\frac{\\alpha}{2}$.', '$\\cos\\alpha=-\\frac{7}{25}$ وα في الربع الثاني. أوجد $\\sen\\frac{\\alpha}{2}$ و$\\cos\\frac{\\alpha}{2}$.', '$\\cos\\alpha=-\\frac{7}{25}$ and α is in the second quadrant. Find $\\sin\\frac{\\alpha}{2}$ and $\\cos\\frac{\\alpha}{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\frac{\\alpha}{2}$ lehen koadrantean dago: zeinuak +.', '$\\frac{\\alpha}{2}$ está en el primer cuadrante: signos +.', '$\\frac{\\alpha}{2}$ في الربع الأول: الإشارات +.', '$\\frac{\\alpha}{2}$ is in the first quadrant: + signs.'), math: same('$45°<\\frac{\\alpha}{2}<90°$') },
            { text: say('Angelu erdiaren sinua.', 'El seno del ángulo mitad.', 'جيب نصف الزاوية.', 'The sine of the half angle.'), math: same('$\\sen\\frac{\\alpha}{2}=\\sqrt{\\frac{1+\\frac{7}{25}}{2}}=\\frac{4}{5}$') },
            { text: say('Haren kosinua.', 'Su coseno.', 'جيب تمامها.', 'Its cosine.'), math: same('$\\cos\\frac{\\alpha}{2}=\\sqrt{\\frac{1-\\frac{7}{25}}{2}}=\\frac{3}{5}$') }
        ],
        takeaway: say('$\\sen\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1-\\cos\\alpha}{2}}$ eta $\\cos\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1+\\cos\\alpha}{2}}$; zeinua, $\\frac{\\alpha}{2}$ angeluaren koadrantearena.', '$\\sen\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1-\\cos\\alpha}{2}}$ y $\\cos\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1+\\cos\\alpha}{2}}$; el signo, el del cuadrante de $\\frac{\\alpha}{2}$.', '$\\sen\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1-\\cos\\alpha}{2}}$ و$\\cos\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1+\\cos\\alpha}{2}}$؛ والإشارة إشارة ربع $\\frac{\\alpha}{2}$.', '$\\sin\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1-\\cos\\alpha}{2}}$ and $\\cos\\frac{\\alpha}{2}=\\pm\\sqrt{\\frac{1+\\cos\\alpha}{2}}$; the sign is that of the quadrant of $\\frac{\\alpha}{2}$.'),
        figure: (language) => <HalfAngleFigure language={language} />
    },
    {
        id: 'sum-to-product',
        stage: 'double',
        title: say('Baturak biderkadura bihurtzea', 'Sumas en productos', 'تحويل المجاميع إلى جداءات', 'Sums into products'),
        goal: say('Bi sinuren edo bi kosinuren batura edo kendura biderkadura bihurtzea, kalkulatzeko eta faktorizatzeko.', 'Transformar en producto la suma o la resta de dos senos o de dos cosenos, para calcular y para factorizar.', 'تحويل مجموع جيبين أو جيبي تمام أو فرقهما إلى جداء، للحساب وللتحليل.', 'Turn the sum or the difference of two sines or two cosines into a product, to calculate and to factorise.'),
        problem: say('Kalkulatu $\\sen 75°+\\sen 15°$ kalkulagailurik gabe.', 'Calcula $\\sen 75°+\\sen 15°$ sin calculadora.', 'احسب $\\sen 75°+\\sen 15°$ دون آلة حاسبة.', 'Work out $\\sin 75°+\\sin 15°$ without a calculator.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi sinuren batura.', 'La suma de dos senos.', 'مجموع جيبين.', 'The sum of two sines.'), math: same('$\\sen A+\\sen B=2\\sen\\frac{A+B}{2}\\cos\\frac{A-B}{2}$') },
            { text: say('Batura-erdia 45° eta kendura-erdia 30°.', 'La semisuma es 45° y la semidiferencia, 30°.', 'نصف المجموع 45° ونصف الفرق 30°.', 'The half-sum is 45° and the half-difference 30°.'), math: same('$\\sen 75°+\\sen 15°=2\\sen 45°\\cos 30°$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$2\\cdot\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2}=\\frac{\\sqrt{6}}{2}$') }
        ],
        takeaway: say('$\\sen A+\\sen B=2\\sen\\frac{A+B}{2}\\cos\\frac{A-B}{2}$ eta $\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$: batura-erdia eta kendura-erdia.', '$\\sen A+\\sen B=2\\sen\\frac{A+B}{2}\\cos\\frac{A-B}{2}$ y $\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$: la semisuma y la semidiferencia.', '$\\sen A+\\sen B=2\\sen\\frac{A+B}{2}\\cos\\frac{A-B}{2}$ و$\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$: نصف المجموع ونصف الفرق.', '$\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$ and $\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$: the half-sum and the half-difference.'),
        figure: (language) => <SumToProductFigure language={language} />
    },

    /* ---------- 4. Equations ---------- */
    {
        id: 'basic-equations',
        stage: 'equations',
        figureAfterSteps: true,
        title: say('Oinarrizko ekuazioak', 'Ecuaciones elementales', 'المعادلات الأساسية', 'Basic equations'),
        goal: say('Ekuazio trigonometriko errazak ebaztea: bira bateko soluzioak eta soluzio orokorra.', 'Resolver ecuaciones trigonométricas sencillas: las soluciones de una vuelta y la solución general.', 'حل المعادلات المثلثية البسيطة: حلول دورة واحدة والحل العام.', 'Solve simple trigonometric equations: the solutions in one turn and the general solution.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'inverse-angles', title: { eu: 'Kalkulagailua eta beste angelua', es: 'La calculadora y el otro ángulo', en: 'The calculator and the other angle', ar: 'الآلة الحاسبة والزاوية الأخرى' } }
        ],
        problem: say('Ebatzi $2\\cos x+1=0$.', 'Resuelve $2\\cos x+1=0$.', 'حُلّ $2\\cos x+1=0$.', 'Solve $2\\cos x+1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu kosinua.', 'Despeja el coseno.', 'اعزل جيب التمام.', 'Solve for the cosine.'), math: same('$\\cos x=-\\frac{1}{2}$') },
            { text: say('Kosinu negatiboa: bigarren eta hirugarren koadranteak.', 'Coseno negativo: segundo y tercer cuadrantes.', 'جيب تمام سالب: الربعان الثاني والثالث.', 'Negative cosine: second and third quadrants.'), math: same('$x=120°\\qquad x=240°$') },
            { text: say('Bira bakoitzak soluzioak errepikatzen ditu.', 'Cada vuelta repite las soluciones.', 'كل دورة تكرر الحلول.', 'Each turn repeats the solutions.'), math: same('$\\begin{gathered}x=120°+k\\cdot 360°\\\\ x=240°+k\\cdot 360°\\end{gathered}$') }
        ],
        takeaway: say('Aurkitu bira bateko bi soluzioak (α eta 180° − α sinuarentzat; α eta 360° − α kosinuarentzat) eta gehitu $k\\cdot 360°$.', 'Halla las dos soluciones de una vuelta (α y 180° − α para el seno; α y 360° − α para el coseno) y añade $k\\cdot 360°$.', 'أوجد حلّي دورة واحدة (α و180° − α للجيب؛ α و360° − α لجيب التمام) وأضف $k\\cdot 360°$.', 'Find the two solutions in one turn (α and 180° − α for the sine; α and 360° − α for the cosine) and add $k\\cdot 360°$.'),
        figure: (language) => <EquationCircleFigure language={language} kind="basic" />
    },
    {
        id: 'quadratic-equations',
        stage: 'equations',
        figureAfterSteps: true,
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية', 'Quadratic equations'),
        goal: say('Arrazoi baten bigarren mailako ekuazioak ebaztea, aldagai-aldaketarekin eta oinarrizko erlazioarekin.', 'Resolver ecuaciones de segundo grado en una razón, con un cambio de variable y la relación fundamental.', 'حل معادلات الدرجة الثانية في نسبة واحدة بتغيير المتغير والعلاقة الأساسية.', 'Solve quadratic equations in one ratio, with a change of variable and the fundamental identity.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'change-variable', title: { eu: 'Aldagai-aldaketa', es: 'Cambio de variable', en: 'Change of variable', ar: 'تغيير المتغير' } }
        ],
        problem: say('Ebatzi $2\\sen^2x-\\sen x-1=0$, 0°-tik 360°-ra.', 'Resuelve $2\\sen^2x-\\sen x-1=0$ entre 0° y 360°.', 'حُلّ $2\\sen^2x-\\sen x-1=0$ بين 0° و360°.', 'Solve $2\\sin^2x-\\sin x-1=0$ between 0° and 360°.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketa: $t=\\sen x$.', 'Cambio: $t=\\sen x$.', 'التغيير: $t=\\sen x$.', 'Change: $t=\\sin x$.'), math: same('$2t^2-t-1=0\\ \\to\\ t=1,\\ t=-\\frac{1}{2}$') },
            { text: say('$\\sen x=1$ bira bakarrean.', '$\\sen x=1$ una sola vez por vuelta.', '$\\sen x=1$ مرة واحدة في الدورة.', '$\\sin x=1$ once per turn.'), math: same('$x=90°$') },
            { text: say('$\\sen x=-\\frac{1}{2}$, hirugarren eta laugarren koadranteetan.', '$\\sen x=-\\frac{1}{2}$, en el tercer y el cuarto cuadrantes.', '$\\sen x=-\\frac{1}{2}$ في الربعين الثالث والرابع.', '$\\sin x=-\\frac{1}{2}$, in the third and fourth quadrants.'), math: same('$x=210°\\qquad x=330°$') }
        ],
        takeaway: say('Arrazoi bakarra badago, egin $t=\\sen x$ aldaketa eta ebatzi bigarren mailakoa; bi badaude, eraman dena bakarrera $\\sen^2x+\\cos^2x=1$ erlazioarekin. $[-1,1]$ tartetik kanpoko $t$ batek ez du soluziorik ematen.', 'Si solo aparece una razón, cambia $t=\\sen x$ y resuelve la de segundo grado; si aparecen dos, pásalo todo a una con $\\sen^2x+\\cos^2x=1$. Un $t$ fuera de $[-1,1]$ no da solución.', 'إذا ظهرت نسبة واحدة فضع $t=\\sen x$ وحُلّ معادلة الدرجة الثانية؛ وإذا ظهرت نسبتان فحوّل كل شيء إلى واحدة بـ $\\sen^2x+\\cos^2x=1$. وقيمة $t$ خارج $[-1,1]$ لا تعطي حلًّا.', 'If only one ratio appears, set $t=\\sin x$ and solve the quadratic; if two appear, turn everything into one with $\\sin^2x+\\cos^2x=1$. A $t$ outside $[-1,1]$ gives no solution.'),
        figure: (language) => <EquationCircleFigure language={language} kind="quadratic" />
    },
    {
        id: 'formula-equations',
        stage: 'equations',
        figureAfterSteps: true,
        title: say('Formulak dituzten ekuazioak', 'Ecuaciones con fórmulas', 'معادلات بالصيغ', 'Equations with formulas'),
        goal: say('Angelu bikoitzak edo baturak dituzten ekuazioak ebaztea, formulekin eta faktorizatuz.', 'Resolver ecuaciones con ángulos dobles o sumas usando las fórmulas y factorizando.', 'حل معادلات فيها زوايا مضاعفة أو مجاميع باستعمال الصيغ والتحليل.', 'Solve equations with double angles or sums by using the formulas and factorising.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'high-degree', title: { eu: 'Hiru mailako edo handiagoko ekuazioak', es: 'Ecuaciones de grado tres o más', en: 'Equations of degree three or more', ar: 'معادلات الدرجة الثالثة فما فوق' } }
        ],
        problem: say('Ebatzi $\\sen 2x=\\cos x$, 0°-tik 360°-ra.', 'Resuelve $\\sen 2x=\\cos x$ entre 0° y 360°.', 'حُلّ $\\sen 2x=\\cos x$ بين 0° و360°.', 'Solve $\\sin 2x=\\cos x$ between 0° and 360°.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Angelu bikoitzaren formula, eta dena ezkerrera.', 'La fórmula del ángulo doble, y todo a la izquierda.', 'صيغة ضعف الزاوية، وكل شيء إلى اليسار.', 'The double-angle formula, and everything on the left.'), math: same('$2\\sen x\\cos x-\\cos x=0$') },
            { text: say('Atera $\\cos x$ faktore komun gisa: ez zatitu.', 'Saca $\\cos x$ factor común: no dividas.', 'أخرج $\\cos x$ عاملًا مشتركًا: لا تقسم.', 'Take $\\cos x$ out as a common factor: do not divide.'), math: same('$\\cos x\\,(2\\sen x-1)=0$') },
            { text: say('Faktore bakoitza 0.', 'Cada factor igual a 0.', 'كل عامل يساوي 0.', 'Each factor equal to 0.'), math: same('$\\begin{gathered}\\cos x=0\\ \\to\\ x=90°,\\ 270°\\\\ \\sen x=\\frac{1}{2}\\ \\to\\ x=30°,\\ 150°\\end{gathered}$') }
        ],
        takeaway: say('Angelu bikoitzekin edo baturekin, erabili formulak angelu mota bakarra gera dadin; gero, faktorizatu. Ez zatitu $\\cos x$ arrazoiaz: $\\cos x=0$ duten soluzioak galduko zenituzke.', 'Con ángulos dobles o sumas, usa las fórmulas para que quede una sola clase de ángulo; después, factoriza. No dividas entre $\\cos x$: perderías las soluciones con $\\cos x=0$.', 'مع الزوايا المضاعفة أو المجاميع استعمل الصيغ ليبقى نوع واحد من الزوايا، ثم حلّل. لا تقسم على $\\cos x$: ستضيع الحلول التي فيها $\\cos x=0$.', 'With double angles or sums, use the formulas so that only one kind of angle is left; then factorise. Do not divide by $\\cos x$: you would lose the solutions with $\\cos x=0$.'),
        figure: (language) => <EquationCircleFigure language={language} kind="factored" />
    },

    /* ---------- 5. Functions ---------- */
    {
        id: 'trig-graphs',
        stage: 'functions',
        figureAfterSteps: true,
        title: say('Sinuaren, kosinuaren eta tangentearen grafikoak', 'Las gráficas del seno, el coseno y la tangente', 'تمثيل الجيب وجيب التمام والظل', 'The graphs of sine, cosine and tangent'),
        goal: say('Funtzio trigonometrikoen grafikoak irakurtzea: periodoa, ibiltartea eta ebakidurak.', 'Leer las gráficas de las funciones trigonométricas: periodo, recorrido y cortes.', 'قراءة تمثيلات الدوال المثلثية: الدور والمدى ونقاط التقاطع.', 'Read the graphs of the trigonometric functions: period, range and crossings.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'sine', title: { eu: 'Sinu funtzioa', es: 'La función seno', en: 'The sine function', ar: 'دالة الجيب' } },
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'tangent', title: { eu: 'Tangente funtzioa', es: 'La función tangente', en: 'The tangent function', ar: 'دالة الظل' } }
        ],
        problem: say('Zenbat aldiz ebakitzen du $y=\\sen x$ grafikoak $y=\\frac{1}{2}$ zuzena, 0 eta $4\\pi$ artean?', '¿Cuántas veces corta la gráfica de $y=\\sen x$ a la recta $y=\\frac{1}{2}$ entre 0 y $4\\pi$?', 'كم مرة يقطع تمثيل $y=\\sen x$ المستقيم $y=\\frac{1}{2}$ بين 0 و$4\\pi$؟', 'How many times does the graph of $y=\\sin x$ cross the line $y=\\frac{1}{2}$ between 0 and $4\\pi$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen periodoan, bi ebakidura.', 'En el primer periodo, dos cortes.', 'في الدور الأول تقاطعان.', 'In the first period, two crossings.'), math: same('$x=\\frac{\\pi}{6}\\qquad x=\\frac{5\\pi}{6}$') },
            { text: say('Sinua $2\\pi$ bakoitzean errepikatzen da.', 'El seno se repite cada $2\\pi$.', 'يتكرر الجيب كل $2\\pi$.', 'The sine repeats every $2\\pi$.'), math: same('$x=\\frac{13\\pi}{6}\\qquad x=\\frac{17\\pi}{6}$') },
            { text: say('Bi periodo: 4 ebakidura.', 'Dos periodos: 4 cortes.', 'دوران: 4 تقاطعات.', 'Two periods: 4 crossings.'), math: same('$2\\cdot 2=4$') }
        ],
        takeaway: say('$\\sen x$ eta $\\cos x$: periodoa $2\\pi$, ibiltartea $[-1,1]$. $\\tg x$: periodoa $\\pi$, eta ez du baliorik $\\cos x=0$ denean.', '$\\sen x$ y $\\cos x$: periodo $2\\pi$, recorrido $[-1,1]$. $\\tg x$: periodo $\\pi$, y no existe donde $\\cos x=0$.', '$\\sen x$ و$\\cos x$: الدور $2\\pi$ والمدى $[-1,1]$. و$\\tg x$: الدور $\\pi$، ولا توجد حيث $\\cos x=0$.', '$\\sin x$ and $\\cos x$: period $2\\pi$, range $[-1,1]$. $\\tan x$: period $\\pi$, and it does not exist where $\\cos x=0$.'),
        figure: (language) => <CrossingsFigure language={language} />
    },
    {
        id: 'transformations',
        stage: 'functions',
        figureAfterSteps: true,
        title: say('Anplitudea, periodoa eta desfasea', 'Amplitud, periodo y desfase', 'السعة والدور وانزياح الطور', 'Amplitude, period and phase shift'),
        goal: say('$y=A\\sen(Bx+C)+D$ funtzioaren anplitudea, periodoa, desfasea eta ardatza aurkitzea.', 'Hallar la amplitud, el periodo, el desfase y el eje de $y=A\\sen(Bx+C)+D$.', 'إيجاد السعة والدور وانزياح الطور والمحور للدالة $y=A\\sen(Bx+C)+D$.', 'Find the amplitude, the period, the phase shift and the axis of $y=A\\sin(Bx+C)+D$.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'period', title: { eu: 'Sinu funtzioaren periodoa', es: 'El periodo de la función seno', en: 'The period of the sine function', ar: 'دور دالة الجيب' } }
        ],
        problem: say('Aurkitu $y=3\\sen\\left(2x-\\frac{\\pi}{3}\\right)$ funtzioaren anplitudea, periodoa eta desfasea.', 'Halla la amplitud, el periodo y el desfase de $y=3\\sen\\left(2x-\\frac{\\pi}{3}\\right)$.', 'أوجد سعة الدالة $y=3\\sen\\left(2x-\\frac{\\pi}{3}\\right)$ ودورها وانزياح طورها.', 'Find the amplitude, the period and the phase shift of $y=3\\sin\\left(2x-\\frac{\\pi}{3}\\right)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Anplitudea: $A$ zenbakiaren balio absolutua.', 'La amplitud: el valor absoluto de $A$.', 'السعة: القيمة المطلقة لـ $A$.', 'The amplitude: the absolute value of $A$.'), math: same('$A=3$') },
            { text: say('Periodoa: $2\\pi$ zati $B$.', 'El periodo: $2\\pi$ entre $B$.', 'الدور: $2\\pi$ على $B$.', 'The period: $2\\pi$ divided by $B$.'), math: same('$\\frac{2\\pi}{2}=\\pi$') },
            { text: say('Desfasea: barrukoa 0 den lekua.', 'El desfase: donde lo de dentro vale 0.', 'انزياح الطور: حيث ما في الداخل يساوي 0.', 'The phase shift: where the inside is 0.'), math: same('$2x-\\frac{\\pi}{3}=0\\ \\to\\ x=\\frac{\\pi}{6}$') }
        ],
        takeaway: say('$y=A\\sen(Bx+C)+D$ funtzioan: anplitudea $|A|$, periodoa $\\frac{2\\pi}{B}$, ardatza $y=D$; uhina $Bx+C=0$ denean hasten da.', 'En $y=A\\sen(Bx+C)+D$: amplitud $|A|$, periodo $\\frac{2\\pi}{B}$, eje $y=D$; la onda empieza donde $Bx+C=0$.', 'في $y=A\\sen(Bx+C)+D$: السعة $|A|$ والدور $\\frac{2\\pi}{B}$ والمحور $y=D$؛ وتبدأ الموجة حيث $Bx+C=0$.', 'In $y=A\\sin(Bx+C)+D$: amplitude $|A|$, period $\\frac{2\\pi}{B}$, axis $y=D$; the wave starts where $Bx+C=0$.'),
        figure: (language) => <PhaseFigure language={language} />
    },
    {
        id: 'periodic-models',
        stage: 'functions',
        figureAfterSteps: true,
        title: say('Fenomeno periodikoak', 'Fenómenos periódicos', 'الظواهر الدورية', 'Periodic phenomena'),
        goal: say('Errepikatzen den fenomeno bat (noria, marea) funtzio trigonometriko batekin adieraztea eta haren balioak kalkulatzea.', 'Describir un fenómeno que se repite (una noria, la marea) con una función trigonométrica y calcular sus valores.', 'وصف ظاهرة متكررة (دولاب، مدّ وجزر) بدالة مثلثية وحساب قيمها.', 'Describe something that repeats (a Ferris wheel, the tide) with a trigonometric function and work out its values.'),
        problem: say('20 m-ko diametroko noria baten zentroa lurretik 12 m-ra dago, eta 30 s-tan bira bat egiten du. Kabina baten altuera $h(t)=12-10\\cdot\\cos(12°\\cdot t)$ da. Zer altueratan dago 5 s-ren buruan?', 'Una noria de 20 m de diámetro tiene el centro a 12 m del suelo y da una vuelta cada 30 s. La altura de una cabina es $h(t)=12-10\\cdot\\cos(12°\\cdot t)$. ¿A qué altura está a los 5 s?', 'دولاب قطره 20 م ومركزه على ارتفاع 12 م ويدور دورة كل 30 ث. ارتفاع عربة $h(t)=12-10\\cdot\\cos(12°\\cdot t)$. ما ارتفاعها بعد 5 ث؟', 'A Ferris wheel 20 m across has its centre 12 m above the ground and turns once every 30 s. The height of a cabin is $h(t)=12-10\\cdot\\cos(12°\\cdot t)$. How high is it after 5 s?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Anplitudea erradioa da, eta ardatza zentroa.', 'La amplitud es el radio y el eje, el centro.', 'السعة هي نصف القطر والمحور هو المركز.', 'The amplitude is the radius and the axis is the centre.'), math: same('$A=10\\qquad D=12$') },
            { text: say('Segundo bakoitzean biratzen den angelua.', 'El ángulo que gira cada segundo.', 'الزاوية التي يدورها كل ثانية.', 'The angle it turns each second.'), math: same('$\\frac{360°}{30}=12°$') },
            { text: say('Ordezkatu $t=5$.', 'Sustituye $t=5$.', 'عوّض $t=5$.', 'Substitute $t=5$.'), math: same('$h(5)=12-10\\cdot\\cos 60°=7$') }
        ],
        takeaway: say('Errepikatzen den fenomeno bat $y=D+A\\cos(B\\cdot t)$ da: D batez besteko balioa, A maximoaren eta minimoaren arteko aldearen erdia, eta B, 360° zati periodoa.', 'Un fenómeno que se repite es $y=D+A\\cos(B\\cdot t)$: D es el valor medio, A la mitad de la diferencia entre máximo y mínimo y B, 360° entre el periodo.', 'الظاهرة المتكررة هي $y=D+A\\cos(B\\cdot t)$: D القيمة الوسطى، وA نصف الفرق بين القيمة العظمى والصغرى، وB هي 360° على الدور.', 'Something that repeats is $y=D+A\\cos(B\\cdot t)$: D is the mean value, A half the difference between maximum and minimum, and B is 360° divided by the period.'),
        figure: (language) => <FerrisFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's names */
export const trigonometryTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(trigonometryLessonTexts[topic.id as TrigonometryTopicId]),
    ...localizeNames(trigonometryLessonChecks[topic.id as TrigonometryTopicId])
}))
