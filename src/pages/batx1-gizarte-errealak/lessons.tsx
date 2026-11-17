import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { bachRealsTopics } from '../batx1-zientziak-errealak/lessons'
import { FractionalFigure } from '../dbh4-akademikoak-potentziak/figures'
import { NumberSetsFigure, ScientificFigure } from '../dbh4-aplikatuak-errealak/figures'
import { DigitsLogFigure } from './figures'
import { gizRealsLessonChecks, type GizRealsTopicId } from './lessonChecks'
import { gizRealsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak — stages and lessons.
   The scope and the order follow unit 1 of Anaya Matemáticas aplicadas a
   las Ciencias Sociales I: sets and language, the real line, radicals,
   logarithms, and approximations with scientific notation. There is no
   binomial theorem. Eleven lessons are those of the 1.º Ciencias twin
   (batx1-zientziak-errealak), imported unchanged in another stage; five are
   of this unit, with social and economic contexts.
   ========================================================================== */

export type GizRealsStageId = 'numbers' | 'line' | 'radicals' | 'logs' | 'errors'

export const gizRealsStages: UnitStage[] = [
    { id: 'numbers', tone: 'blue', title: { eu: 'Zenbakiak eta multzoak', es: 'Números y conjuntos', en: 'Numbers and sets', ar: 'الأعداد والمجموعات' } },
    { id: 'line', tone: 'violet', title: { eu: 'Zuzen erreala', es: 'La recta real', en: 'The real line', ar: 'المستقيم الحقيقي' } },
    { id: 'radicals', tone: 'coral', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', en: 'Roots and radicals', ar: 'الجذور' } },
    { id: 'logs', tone: 'green', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' } },
    { id: 'errors', tone: 'mustard', title: { eu: 'Hurbilketak eta idazkera zientifikoa', es: 'Aproximaciones y notación científica', en: 'Approximations and scientific notation', ar: 'التقريب والترميز العلمي' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** A lesson of 1.º Ciencias, unchanged, in a stage of this unit */
function borrowed(id: string, stage: GizRealsStageId): UnitTopic {
    const topic = bachRealsTopics.find((item) => item.id === id)
    if (!topic) throw new Error(`No lesson ${id} in batx1-zientziak-errealak`)
    return { ...topic, stage }
}

/** The five lessons of this unit, without what they tell (lessonTexts.ts) */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Numbers and sets ---------- */
    {
        id: 'number-kinds',
        stage: 'numbers',
        title: say('Zenbakiak sailkatzea', 'Clasificar los números', 'تصنيف الأعداد', 'Classifying numbers'),
        goal: say('Zenbaki bat zein multzotakoa den ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$) erabakitzea, eta errealak ez direnak ezagutzea.', 'Decidir a qué conjuntos ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$) pertenece un número y reconocer los que no son reales.', 'تحديد المجموعات ($\\mathbb{N}$ و$\\mathbb{Z}$ و$\\mathbb{Q}$ و$\\mathbb{R}$) التي ينتمي إليها عدد، والتعرّف على الأعداد غير الحقيقية.', 'Decide which sets ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$) a number belongs to and recognise the ones that are not real.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'number-sets', title: { eu: 'Zenbaki errealak eta multzoak', es: 'Los números reales y sus conjuntos', en: 'Real numbers and their sets', ar: 'الأعداد الحقيقية ومجموعاتها' } }
        ],
        problem: say('Sailkatu $-6$, $\\frac{3}{8}$, $\\sqrt{25}$, $\\sqrt{11}$, $1{,}\\overline{2}$ eta $\\sqrt{-4}$.', 'Clasifica $-6$, $\\frac{3}{8}$, $\\sqrt{25}$, $\\sqrt{11}$, $1{,}\\overline{2}$ y $\\sqrt{-4}$.', 'صنّف $-6$ و$\\frac{3}{8}$ و$\\sqrt{25}$ و$\\sqrt{11}$ و$1{,}\\overline{2}$ و$\\sqrt{-4}$.', 'Classify $-6$, $\\frac{3}{8}$, $\\sqrt{25}$, $\\sqrt{11}$, $1{,}\\overline{2}$ and $\\sqrt{-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, sinplifikatu ahal dena.', 'Primero, simplifica lo que se pueda.', 'أولًا، بسّط ما يمكن تبسيطه.', 'First, simplify whatever you can.'), math: same('$\\sqrt{25}=5\\qquad 1{,}\\overline{2}=\\frac{11}{9}$') },
            { text: say('5 arrunta da; $-6$ osoa da, baina ez arrunta.', 'El 5 es natural; el $-6$ es entero, pero no natural.', 'العدد 5 طبيعي، و$-6$ صحيح لكنه ليس طبيعيًا.', '5 is natural; $-6$ is an integer, but not natural.'), math: same('$5\\in\\mathbb{N}\\qquad -6\\in\\mathbb{Z}$') },
            { text: say('Zatikiak arrazionalak dira; $\\sqrt{11}$ ez da zehatza: irrazionala. Eta $\\sqrt{-4}$ ez da erreala.', 'Las fracciones son racionales; $\\sqrt{11}$ no es exacta: irracional. Y $\\sqrt{-4}$ no es real.', 'الكسور نسبية، و$\\sqrt{11}$ ليس تامًا فهو غير نسبي. و$\\sqrt{-4}$ ليس حقيقيًا.', 'Fractions are rational; $\\sqrt{11}$ is not exact: irrational. And $\\sqrt{-4}$ is not real.'), math: same('$\\frac{3}{8},\\ \\frac{11}{9}\\in\\mathbb{Q}\\qquad \\sqrt{11}\\in\\mathbb{R}-\\mathbb{Q}$') }
        ],
        takeaway: say('$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. Arrazional bat zatiki bat da (hamartar zehatza edo periodikoa); irrazional bat, ez. Zenbaki negatibo baten indize bikoitiko erroa ez da erreala.', '$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. Un racional es una fracción (decimal exacto o periódico); un irracional, no. La raíz de índice par de un negativo no es real.', '$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. العدد النسبي كسر (عشري منتهٍ أو دوري)، وغير النسبي ليس كذلك. والجذر ذو الدليل الزوجي لعدد سالب ليس حقيقيًا.', '$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. A rational number is a fraction (a decimal that ends or recurs); an irrational one is not. An even root of a negative number is not real.'),
        figure: (language) => <NumberSetsFigure language={language} />
    },
    {
        id: 'set-language',
        stage: 'numbers',
        title: say('Hitzetatik ikurretara', 'Del lenguaje a los símbolos', 'من الكلمات إلى الرموز', 'From words to symbols'),
        goal: say('Multzo bat ikurrekin idaztea, hitzekin irakurtzea eta haren elementuak zenbatzea.', 'Escribir un conjunto con símbolos, leerlo con palabras y contar sus elementos.', 'كتابة مجموعة بالرموز وقراءتها بالكلمات وعدّ عناصرها.', 'Write a set with symbols, read it in words and count its elements.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'intervals', title: { eu: 'Tarteak eta zuzenerdiak', es: 'Intervalos y semirrectas', en: 'Intervals and half-lines', ar: 'الفترات وأنصاف المستقيمات' } }
        ],
        problem: say('Idatzi ikurrekin «$-2$ baino handiagoak eta 5 baino txikiagoak edo berdinak diren zenbaki osoak», eta esan zenbat elementu dituen.', 'Escribe con símbolos «los enteros mayores que $-2$ y menores o iguales que 5» y di cuántos elementos tiene.', 'اكتب بالرموز «الأعداد الصحيحة الأكبر من $-2$ والأصغر من 5 أو المساوية له»، وقل كم عنصرًا فيها.', 'Write with symbols «the integers greater than $-2$ and less than or equal to 5» and say how many elements it has.'),
        stepsKind: 'steps',
        steps: [
            { text: say('«Zenbaki osoak»: erreferentzia-multzoa $\\mathbb{Z}$ da.', '«Enteros»: el conjunto de referencia es $\\mathbb{Z}$.', '«الأعداد الصحيحة»: المجموعة المرجعية هي $\\mathbb{Z}$.', '«Integers»: the reference set is $\\mathbb{Z}$.'), math: same('$\\{x\\in\\mathbb{Z}\\mid \\ldots\\}$') },
            { text: say('«Handiagoa»: $<$, berdina gabe; «txikiagoa edo berdina»: $\\le$.', '«Mayor que»: $<$, sin igual; «menor o igual»: $\\le$.', '«أكبر من»: $<$ بلا مساواة، و«أصغر من أو يساوي»: $\\le$.', '«Greater than»: $<$, with no equals; «less than or equal»: $\\le$.'), math: same('$\\{x\\in\\mathbb{Z}\\mid -2<x\\le 5\\}$') },
            { text: say('Zerrendatu: $-2$ ez dago, eta 5 bai. Zazpi elementu dira.', 'Haz la lista: el $-2$ no entra y el 5 sí. Son siete elementos.', 'اكتب القائمة: $-2$ لا يدخل و5 يدخل. إنها سبعة عناصر.', 'List them: $-2$ is not in and 5 is. There are seven elements.'), math: same('$\\{-1,0,1,2,3,4,5\\}$') }
        ],
        takeaway: say('«Handiagoa» eta «txikiagoa»: $<$, muturra kanpoan; «edo berdina»: $\\le$, muturra barruan. Barraren aurreko multzoak ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{R}$) zein zenbaki zenbatzen diren esaten du.', '«Mayor» y «menor»: $<$, el extremo fuera; «o igual»: $\\le$, el extremo dentro. El conjunto de antes de la barra ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{R}$) dice qué números se cuentan.', '«أكبر» و«أصغر»: $<$ والطرف خارج، و«أو يساوي»: $\\le$ والطرف داخل. والمجموعة قبل الخط ($\\mathbb{N}$ أو $\\mathbb{Z}$ أو $\\mathbb{R}$) تحدد الأعداد التي تُعدّ.', '«Greater» and «less»: $<$, the endpoint out; «or equal»: $\\le$, the endpoint in. The set before the bar ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{R}$) says which numbers count.')
    },

    /* ---------- 3. Roots and radicals ---------- */
    {
        id: 'radical-power',
        stage: 'radicals',
        title: say('Erroak berretura gisa', 'Raíces como potencias', 'الجذور على صورة قوى', 'Roots as powers'),
        goal: say('Erroak berretzaile zatikiko berretura gisa idaztea, sinplifikatzeko eta indize desberdineko erroak biderkatzeko.', 'Escribir raíces como potencias de exponente fraccionario para simplificarlas y multiplicar raíces de distinto índice.', 'كتابة الجذور على صورة قوى ذات أس كسري لتبسيطها ولضرب جذور مختلفة الدليل.', 'Write roots as powers with fractional exponents to simplify them and to multiply roots with different indexes.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'fractional', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', en: 'Fractional exponents', ar: 'الأسس الكسرية' } }
        ],
        problem: say('Idatzi erro bakar gisa $\\sqrt{x}\\cdot\\sqrt[3]{x^{2}}$.', 'Escribe como una sola raíz $\\sqrt{x}\\cdot\\sqrt[3]{x^{2}}$.', 'اكتب على صورة جذر واحد $\\sqrt{x}\\cdot\\sqrt[3]{x^{2}}$.', 'Write $\\sqrt{x}\\cdot\\sqrt[3]{x^{2}}$ as a single root.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erro bakoitza berretura bat da: indizea behean, berretzailea goian.', 'Cada raíz es una potencia: el índice abajo, el exponente arriba.', 'كل جذر قوة: الدليل في الأسفل والأس في الأعلى.', 'Each root is a power: the index below, the exponent above.'), math: same('$\\sqrt{x}=x^{\\frac{1}{2}}\\qquad \\sqrt[3]{x^{2}}=x^{\\frac{2}{3}}$') },
            { text: say('Oinarri bereko berreturak biderkatzean, berretzaileak batzen dira.', 'Al multiplicar potencias de la misma base, se suman los exponentes.', 'عند ضرب قوى لها الأساس نفسه تُجمع الأسس.', 'When you multiply powers with the same base, add the exponents.'), math: same('$\\frac{1}{2}+\\frac{2}{3}=\\frac{7}{6}$') },
            { text: say('Itzuli erro batera, eta atera ahal dena.', 'Vuelve a una raíz y saca lo que se pueda.', 'ارجع إلى جذر وأخرج ما يمكن إخراجه.', 'Go back to a root and take out what you can.'), math: same('$x^{\\frac{7}{6}}=\\sqrt[6]{x^{7}}=x\\sqrt[6]{x}$') }
        ],
        takeaway: say('$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: indizea izendatzailea da. Berreturekin ohi bezala egiten da (biderkatzean, berretzaileak batu), eta berretzailearen zatikia sinplifikatzen da.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: el índice es el denominador. Con potencias se opera como siempre (al multiplicar, se suman los exponentes) y se simplifica la fracción del exponente.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: الدليل هو المقام. ونجري العمليات على القوى كالمعتاد (عند الضرب تُجمع الأسس) ونبسّط كسر الأس.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: the index is the denominator. Powers work as usual (when multiplying, add the exponents) and the fraction in the exponent is simplified.'),
        figure: (language) => <FractionalFigure language={language} />
    },

    /* ---------- 4. Logarithms ---------- */
    {
        id: 'log-integer',
        stage: 'logs',
        title: say('Logaritmo baten zati osoa', 'La parte entera de un logaritmo', 'الجزء الصحيح من اللوغاريتم', 'The whole-number part of a logarithm'),
        goal: say('Logaritmo bat zein bi zenbaki osoren artean dagoen kalkulagailurik gabe jakitea, eta haren balioa oinarri-aldaketarekin kalkulatzea.', 'Saber sin calculadora entre qué dos enteros está un logaritmo y calcular su valor con el cambio de base.', 'معرفة العددين الصحيحين اللذين يقع بينهما اللوغاريتم دون آلة حاسبة، وحساب قيمته بتغيير الأساس.', 'Tell without a calculator which two integers a logarithm lies between, and work out its value with the change of base.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'change-base', title: { eu: 'Oinarri-aldaketa eta kalkulagailua', es: 'Cambio de base y calculadora', en: 'Change of base and calculator', ar: 'تغيير الأساس والآلة الحاسبة' } }
        ],
        problem: say('Kalkulagailurik gabe, zein bi zenbaki osoren artean dago $\\log_2 90$? Gero, kalkulatu kalkulagailuarekin.', 'Sin calculadora, ¿entre qué dos enteros está $\\log_2 90$? Después, calcúlalo con la calculadora.', 'دون آلة حاسبة، بين أيّ عددين صحيحين يقع $\\log_2 90$؟ ثم احسبه بالآلة الحاسبة.', 'Without a calculator, which two integers is $\\log_2 90$ between? Then work it out with a calculator.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu 90 inguratzen duten 2 zenbakiaren berreturak.', 'Busca las potencias de 2 que rodean al 90.', 'ابحث عن قوى 2 التي تحيط بالعدد 90.', 'Find the powers of 2 around 90.'), math: same('$2^{6}=64<90<128=2^{7}$') },
            { text: say('Beraz, logaritmoa 6 eta 7 artean dago.', 'Así que el logaritmo está entre 6 y 7.', 'إذن اللوغاريتم بين 6 و7.', 'So the logarithm is between 6 and 7.'), math: same('$6<\\log_2 90<7$') },
            { text: say('Kalkulagailuarekin, oinarri-aldaketa.', 'Con la calculadora, el cambio de base.', 'بالآلة الحاسبة، تغيير الأساس.', 'With the calculator, the change of base.'), math: same('$\\log_2 90=\\frac{\\log 90}{\\log 2}\\approx 6{,}49$') }
        ],
        takeaway: say('$\\log_a N$ zenbakia $k$ eta $k+1$ artean dago $a^{k}\\le N<a^{k+1}$ bada. 10 oinarrian, $\\log N$ logaritmoaren zati osoa $N$ zenbakiaren zifra kopurua ken bat da. Kalkulagailuarekin: $\\log_a N=\\frac{\\log N}{\\log a}$.', '$\\log_a N$ está entre $k$ y $k+1$ si $a^{k}\\le N<a^{k+1}$. En base 10, la parte entera de $\\log N$ es el número de cifras de $N$ menos uno. Con calculadora: $\\log_a N=\\frac{\\log N}{\\log a}$.', 'يقع $\\log_a N$ بين $k$ و$k+1$ إذا كان $a^{k}\\le N<a^{k+1}$. وفي الأساس 10 يكون الجزء الصحيح من $\\log N$ هو عدد أرقام $N$ ناقص واحد. وبالآلة الحاسبة: $\\log_a N=\\frac{\\log N}{\\log a}$.', '$\\log_a N$ is between $k$ and $k+1$ if $a^{k}\\le N<a^{k+1}$. In base 10, the whole-number part of $\\log N$ is the number of digits of $N$ minus one. With a calculator: $\\log_a N=\\frac{\\log N}{\\log a}$.'),
        figure: (language) => <DigitsLogFigure language={language} />
    },

    /* ---------- 5. Approximations and scientific notation ---------- */
    {
        id: 'big-numbers',
        stage: 'errors',
        title: say('Ekonomiako zifra handiak', 'Las grandes cifras de la economía', 'الأرقام الكبيرة في الاقتصاد', 'The big figures of the economy'),
        goal: say('Datu ekonomikoak idazkera zientifikoan idaztea, konparatzea eta haiekin eragiketak egitea.', 'Escribir datos económicos en notación científica, compararlos y operar con ellos.', 'كتابة البيانات الاقتصادية بالترميز العلمي ومقارنتها وإجراء العمليات عليها.', 'Write economic data in scientific notation, compare them and work with them.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' } }
        ],
        problem: say('Hiri batek $2{,}5\\cdot 10^{5}$ biztanle ditu, eta udalak $1{,}5\\cdot 10^{9}$ euro gastatzen ditu urtean. Zenbat gastatzen du biztanle bakoitzeko?', 'Una ciudad tiene $2{,}5\\cdot 10^{5}$ habitantes y su ayuntamiento gasta $1{,}5\\cdot 10^{9}$ euros al año. ¿Cuánto gasta por habitante?', 'في مدينة $2{,}5\\cdot 10^{5}$ ساكن، وتنفق بلديتها $1{,}5\\cdot 10^{9}$ يورو في السنة. كم تنفق على كل ساكن؟', 'A city has $2{,}5\\cdot 10^{5}$ inhabitants and its council spends $1{,}5\\cdot 10^{9}$ euros a year. How much does it spend per inhabitant?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu mantisak eta kendu berretzaileak.', 'Divide las mantisas y resta los exponentes.', 'اقسم الأجزاء العشرية واطرح الأسس.', 'Divide the mantissas and subtract the exponents.'), math: same('$\\frac{1{,}5\\cdot 10^{9}}{2{,}5\\cdot 10^{5}}=0{,}6\\cdot 10^{4}$') },
            { text: say('Mantisak 1 eta 10 artean egon behar du: koma eskuinera, berretzailea bat jaisten da.', 'La mantisa debe estar entre 1 y 10: la coma va a la derecha y el exponente baja uno.', 'يجب أن يكون الجزء العشري بين 1 و10: تتحرك الفاصلة إلى اليمين وينقص الأس واحدًا.', 'The mantissa must be between 1 and 10: the decimal point moves right and the exponent goes down by one.'), math: same('$0{,}6\\cdot 10^{4}=6\\cdot 10^{3}$') },
            { text: say('Eurotan: 6000 euro biztanle bakoitzeko.', 'En euros: 6000 euros por habitante.', 'باليورو: 6000 يورو لكل ساكن.', 'In euros: €6,000 per inhabitant.'), math: same('$6\\cdot 10^{3}=6000$') }
        ],
        takeaway: say('Idazkera zientifikoa: $a\\cdot 10^{n}$, $1\\le a<10$ izanik. Biderkatzean, mantisak biderkatu eta berretzaileak batu; zatitzean, zatitu eta kendu. Mantisa $[1,10)$ tartetik ateratzen bada, mugitu koma eta orekatu berretzailea.', 'Notación científica: $a\\cdot 10^{n}$ con $1\\le a<10$. Al multiplicar, se multiplican las mantisas y se suman los exponentes; al dividir, se dividen y se restan. Si la mantisa se sale de $[1,10)$, mueve la coma y compensa el exponente.', 'الترميز العلمي: $a\\cdot 10^{n}$ حيث $1\\le a<10$. عند الضرب نضرب الأجزاء العشرية ونجمع الأسس، وعند القسمة نقسم ونطرح. وإذا خرج الجزء العشري من $[1,10)$ نحرك الفاصلة ونعوّض في الأس.', 'Scientific notation: $a\\cdot 10^{n}$ with $1\\le a<10$. To multiply, multiply the mantissas and add the exponents; to divide, divide and subtract. If the mantissa leaves $[1,10)$, move the decimal point and make up for it in the exponent.'),
        figure: (language) => <ScientificFigure language={language} />
    }
]

const own = (id: GizRealsTopicId): UnitTopic => {
    const topic = ownTopics.find((item) => item.id === id)!
    return { ...topic, ...gizRealsLessonTexts[id], ...gizRealsLessonChecks[id] }
}

/** The sixteen lessons in the order of the book */
export const gizRealsTopics: UnitTopic[] = [
    borrowed('sets', 'numbers'),
    own('number-kinds'),
    own('set-language'),
    borrowed('interval-sets', 'line'),
    borrowed('absolute-value', 'line'),
    borrowed('neighbourhoods', 'line'),
    own('radical-power'),
    borrowed('radical-ops', 'radicals'),
    borrowed('rationalize', 'radicals'),
    borrowed('logarithms', 'logs'),
    own('log-integer'),
    borrowed('log-unknown', 'logs'),
    borrowed('significant', 'errors'),
    borrowed('relative', 'errors'),
    own('big-numbers'),
    borrowed('scientific-errors', 'errors')
]
