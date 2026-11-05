import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { PowersFigure, RadicalOpsFigure, RootsFigure, ScientificOpsFigure, SimplifyFigure } from '../dbh4-aplikatuak-errealak/figures'
import {
    ChangeBaseFigure,
    ConjugateFigure,
    EquivalentFigure,
    FractionalFigure,
    LogDefinitionFigure,
    LogPropertiesFigure,
    PowerRulesFigure,
    RadicalProductFigure,
    RationalizeIndexFigure,
    RationalizeSquareFigure
} from './figures'
import { powersLessonChecks, type PowersTopicId } from './lessonChecks'
import { powersLessonTexts } from './lessonTexts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 2 (powers with integer
   exponents, radicals and fractional exponents, equivalent radicals,
   extracting factors, operations, rationalizing, scientific notation and
   logarithms with their properties) and the radicals and logarithms of
   Anaya 4.º Académicas unit 1. It builds on the 4. DBH aplikatuak reals
   unit (powers, roots, √a simplified, like radicals, rationalizing √b)
   and goes further: any index, common index, products of different
   indexes, the conjugate and logarithms.
   ========================================================================== */

export type PowersStageId = 'powers' | 'radicals' | 'operations' | 'rationalize' | 'logarithms'

export const powersStages: UnitStage[] = [
    { id: 'powers', tone: 'blue', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' } },
    { id: 'radicals', tone: 'violet', title: { eu: 'Erradikalak', es: 'Radicales', en: 'Radicals', ar: 'الجذور' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Eragiketak erradikalekin', es: 'Operaciones con radicales', en: 'Operations with radicals', ar: 'العمليات على الجذور' } },
    { id: 'rationalize', tone: 'coral', title: { eu: 'Arrazionalizatzea', es: 'Racionalizar', en: 'Rationalising', ar: 'إنطاق المقام' } },
    { id: 'logarithms', tone: 'green', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Powers ---------- */
    {
        id: 'integer-powers',
        stage: 'powers',
        title: say('Berretzaile osoko berreturak', 'Potencias de exponente entero', 'القوى ذات الأس الصحيح', 'Powers with integer exponents'),
        goal: say('Berretzaile negatiboak eta zero dituzten berreturak kalkulatzea, oinarri negatiboen zeinua kontuan hartuta.', 'Calcular potencias con exponente negativo o cero, teniendo en cuenta el signo de las bases negativas.', 'حساب القوى ذات الأس السالب أو الصفري، مع مراعاة إشارة الأسس السالبة.', 'Work out powers with a negative or zero exponent, taking into account the sign of negative bases.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'negative-zero', title: { eu: 'Berretzaile zero eta negatiboa', es: 'Exponente cero y negativo', en: 'Zero and negative exponents', ar: 'الأس صفر والأس السالب' } }
        ],
        problem: same('$\\left(-\\frac{2}{3}\\right)^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman zatikiari eta berretzailea positibo.', 'Da la vuelta a la fracción y el exponente pasa a positivo.', 'اقلب الكسر واجعل الأس موجبًا.', 'Turn the fraction upside down and the exponent becomes positive.'), math: same('$\\left(-\\frac{3}{2}\\right)^{3}$') },
            { text: say('Berretzaile bakoitia: zeinua negatiboa.', 'Exponente impar: signo negativo.', 'أس فردي: إشارة سالبة.', 'Odd exponent: negative sign.'), math: same('$-\\frac{3^3}{2^3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$-\\frac{27}{8}$') }
        ],
        takeaway: say('Berretzaile negatiboa: alderantzizkoa. Oinarri negatiboa: bikoitia positibo, bakoitia negatibo.', 'Exponente negativo: el inverso. Base negativa: par positivo, impar negativo.', 'الأس السالب: المقلوب. الأساس السالب: الزوجي موجب والفردي سالب.', 'Negative exponent: the reciprocal. Negative base: even gives positive, odd gives negative.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'power-rules',
        stage: 'powers',
        title: say('Berreturen propietateak', 'Propiedades de las potencias', 'خصائص القوى', 'Properties of powers'),
        goal: say('Berreturen propietateak erabiltzea adierazpenak sinplifikatzeko, oinarriak faktorizatuz.', 'Usar las propiedades de las potencias para simplificar expresiones, factorizando las bases.', 'استعمال خصائص القوى لتبسيط العبارات بتحليل الأسس.', 'Use the properties of powers to simplify expressions by factorising the bases.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'power-rules', title: { eu: 'Berreturen propietateak', es: 'Propiedades de las potencias', en: 'Properties of powers', ar: 'خصائص القوى' } }
        ],
        problem: same('$\\frac{12^3\\cdot 2^{-1}}{18\\cdot 4}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$\\frac{2^6\\cdot 3^3\\cdot 2^{-1}}{2\\cdot 3^2\\cdot 2^2}$') },
            { text: say('Bildu 2 zenbakiaren berretzaileak.', 'Agrupa los exponentes del 2.', 'اجمع أسس العدد 2.', 'Group the exponents of 2.'), math: same('$2^{6-1-1-2}=2^{2}$') },
            { text: say('Eta 3 zenbakiarenak.', 'Y los del 3.', 'وأسس العدد 3.', 'And those of 3.'), math: same('$3^{3-2}=3\\quad\\to\\quad 12$') }
        ],
        takeaway: say('Oinarri bera: biderkatzean batu, zatitzean kendu, berreturaren berreturan biderkatu.', 'Misma base: al multiplicar suma, al dividir resta, en la potencia de potencia multiplica.', 'الأساس نفسه: في الضرب اجمع، وفي القسمة اطرح، وفي قوة القوة اضرب.', 'Same base: when multiplying, add; when dividing, subtract; for a power of a power, multiply.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },
    {
        id: 'scientific',
        stage: 'powers',
        title: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
        goal: say('Zenbaki oso handiak eta oso txikiak idazkera zientifikoan idaztea eta haiekin eragiketak egitea.', 'Escribir números muy grandes y muy pequeños en notación científica y operar con ellos.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا بالترميز العلمي وإجراء العمليات عليها.', 'Write very large and very small numbers in scientific notation and calculate with them.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'sci-ops', title: { eu: 'Eragiketak idazkera zientifikoan', es: 'Operaciones en notación científica', en: 'Operations in scientific notation', ar: 'العمليات بالترميز العلمي' } }
        ],
        problem: same('$(2{,}52\\cdot 10^{4}):(4\\cdot 10^{-6})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu zenbakiak.', 'Divide los números.', 'اقسم العددين.', 'Divide the numbers.'), math: same('$2{,}52:4=0{,}63$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسين.', 'Subtract the exponents.'), math: same('$4-(-6)=10$') },
            { text: say('Egokitu: $0{,}63=6{,}3\\cdot 10^{-1}$.', 'Ajusta: $0{,}63=6{,}3\\cdot 10^{-1}$.', 'اضبط: $0{,}63=6{,}3\\cdot 10^{-1}$.', 'Adjust: $0{,}63=6{,}3\\cdot 10^{-1}$.'), math: same('$6{,}3\\cdot 10^{9}$') }
        ],
        takeaway: say('Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', 'Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', 'في الضرب اجمع الأسس، وفي القسمة اطرحها؛ وللجمع الأس نفسه.', 'When multiplying, add the exponents; when dividing, subtract them; to add, use the same exponent.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },

    /* ---------- 2. Radicals ---------- */
    {
        id: 'roots',
        stage: 'radicals',
        title: say('Erroak eta erradikalak', 'Raíces y radicales', 'الجذور', 'Roots and radicals'),
        goal: say('Edozein indizeko erroak kalkulatzea eta zenbat erro erreal dituzten jakitea.', 'Calcular raíces de cualquier índice y saber cuántas raíces reales tienen.', 'حساب جذور من أي دليل ومعرفة عدد جذورها الحقيقية.', 'Work out roots of any index and know how many real roots they have.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'roots', title: { eu: 'Erro karratuak eta kuboak', es: 'Raíces cuadradas y cúbicas', en: 'Square and cube roots', ar: 'الجذور التربيعية والتكعيبية' } }
        ],
        stepsKind: 'facts',
        steps: [
            { title: say('Indize bakoitia', 'Índice impar', 'دليل فردي', 'Odd index'), text: say('Erro bakarra, errokizunaren zeinuarekin.', 'Una sola raíz, con el signo del radicando.', 'جذر واحد بإشارة ما تحت الجذر.', 'One root, with the same sign as the radicand.'), math: same('$\\sqrt[5]{-32}=-2$') },
            { title: say('Indize bikoitia, errokizun positiboa', 'Índice par, radicando positivo', 'دليل زوجي وما تحت جذر موجب', 'Even index, positive radicand'), text: say('Bi erro aurkako.', 'Dos raíces opuestas.', 'جذران متعاكسان.', 'Two opposite roots.'), math: same('$\\sqrt[4]{625}=\\pm 5$') },
            { title: say('Indize bikoitia, errokizun negatiboa', 'Índice par, radicando negativo', 'دليل زوجي وما تحت جذر سالب', 'Even index, negative radicand'), text: say('Ez dago erro errealik.', 'No hay raíz real.', 'لا جذر حقيقي.', 'There is no real root.'), math: same('$\\sqrt[4]{-256}\\notin\\mathbb{R}$') }
        ],
        takeaway: say('Indize bikoitia eta errokizun negatiboa: ez dago erro errealik.', 'Índice par y radicando negativo: no hay raíz real.', 'دليل زوجي وما تحت جذر سالب: لا جذر حقيقي.', 'Even index and negative radicand: there is no real root.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'fractional',
        stage: 'radicals',
        title: say('Berretzaile zatikiak', 'Exponentes fraccionarios', 'الأسس الكسرية', 'Fractional exponents'),
        goal: say('Erradikalak berretzaile zatikidun berretura gisa idaztea eta alderantziz, eta haiekin kalkulatzea.', 'Escribir radicales como potencias de exponente fraccionario y al revés, y calcular con ellos.', 'كتابة الجذور قوى ذات أس كسري وبالعكس، والحساب بها.', 'Write radicals as powers with fractional exponents and the other way round, and calculate with them.'),
        problem: same('$64^{\\frac{5}{6}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea: 6. erroa.', 'El denominador: raíz sexta.', 'المقام: الجذر السادس.', 'The denominator: sixth root.'), math: same('$\\sqrt[6]{64}=2$') },
            { text: say('Zenbakitzailea: ber 5.', 'El numerador: a la quinta.', 'البسط: أس 5.', 'The numerator: to the fifth power.'), math: same('$2^{5}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$32$') }
        ],
        takeaway: say('Izendatzailea indizea da eta zenbakitzailea berretzailea. Lehenik erroa, gero berretura.', 'El denominador es el índice y el numerador el exponente. Primero la raíz, luego la potencia.', 'المقام هو الدليل والبسط هو الأس. الجذر أولًا ثم القوة.', 'The denominator is the index and the numerator is the exponent. First the root, then the power.'),
        figure: (language) => <FractionalFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'radicals',
        title: say('Erradikal baliokideak', 'Radicales equivalentes', 'الجذور المتكافئة', 'Equivalent radicals'),
        goal: say('Erradikalak sinplifikatzea, indize komunera eramatea eta konparatzea.', 'Simplificar radicales, reducirlos a índice común y compararlos.', 'تبسيط الجذور وردّها إلى دليل مشترك ومقارنتها.', 'Simplify radicals, reduce them to a common index and compare them.'),
        problem: say('Zein da handiagoa, $\\sqrt[3]{5}$ ala $\\sqrt[4]{3}$?', '¿Cuál es mayor, $\\sqrt[3]{5}$ o $\\sqrt[4]{3}$?', 'أيهما أكبر: $\\sqrt[3]{5}$ أم $\\sqrt[4]{3}$؟', 'Which is greater, $\\sqrt[3]{5}$ or $\\sqrt[4]{3}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indize komuna: m.k.t.(3, 4).', 'Índice común: m.c.m.(3, 4).', 'الدليل المشترك: م.م.أ(3، 4).', 'Common index: LCM(3, 4).'), math: same('$12$') },
            { text: say('Idatzi biak 12. erro gisa.', 'Escribe los dos como raíz duodécima.', 'اكتب الاثنين جذرًا ثاني عشر.', 'Write both as twelfth roots.'), math: same('$\\sqrt[12]{5^4}=\\sqrt[12]{625}\\quad \\sqrt[12]{3^3}=\\sqrt[12]{27}$') },
            { text: say('Konparatu errokizunak.', 'Compara los radicandos.', 'قارن ما تحت الجذرين.', 'Compare the radicands.'), math: same('$\\sqrt[3]{5}>\\sqrt[4]{3}$') }
        ],
        takeaway: say('Indizea eta berretzailea zenbaki berberaz zatitu edo biderkatu: erradikal baliokidea.', 'Divide o multiplica índice y exponente por el mismo número: radical equivalente.', 'اقسم الدليل والأس أو اضربهما في العدد نفسه: جذر مكافئ.', 'Divide or multiply the index and the exponent by the same number: equivalent radical.'),
        figure: (language) => <EquivalentFigure language={language} />
    },

    /* ---------- 3. Operations with radicals ---------- */
    {
        id: 'extract',
        stage: 'operations',
        title: say('Faktoreak ateratzea eta sartzea', 'Extraer e introducir factores', 'إخراج العوامل وإدخالها', 'Taking factors out and putting them in'),
        goal: say('Edozein indizeko erroetatik faktoreak ateratzea eta faktoreak erro barruan sartzea.', 'Sacar factores de raíces de cualquier índice e introducir factores dentro de la raíz.', 'إخراج العوامل من جذور أي دليل وإدخال العوامل تحت الجذر.', 'Take factors out of roots of any index and put factors inside the root.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'extract', title: { eu: 'Faktoreak erroitik ateratzea', es: 'Sacar factores de la raíz', en: 'Taking factors out of a root', ar: 'إخراج العوامل من الجذر' } },
            { unit: 'dbh3/potencias-raices', topic: 'introduce', title: { eu: 'Faktoreak erroan sartzea', es: 'Meter factores en la raíz', en: 'Putting factors inside a root', ar: 'إدخال العوامل في الجذر' } }
        ],
        problem: same('$\\sqrt[4]{405}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$405=3^4\\cdot 5$') },
            { text: say('$3^4$ osorik ateratzen da.', '$3^4$ sale entero.', '$3^4$ يخرج كله.', '$3^4$ comes out whole.'), math: same('$\\sqrt[4]{3^4\\cdot 5}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$3\\sqrt[4]{5}$') }
        ],
        takeaway: say('Berretzailea zati indizea: zatidura kanpora, hondarra barruan.', 'Exponente entre índice: el cociente sale, el resto se queda dentro.', 'الأس على الدليل: يخرج خارج القسمة ويبقى الباقي في الداخل.', 'Exponent divided by index: the quotient comes out, the remainder stays inside.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'add-radicals',
        stage: 'operations',
        title: say('Erradikalak batu eta kendu', 'Sumar y restar radicales', 'جمع الجذور وطرحها', 'Adding and subtracting radicals'),
        goal: say('Erradikal antzekoak ezagutzea eta haiek batzea, lehenik faktoreak ateraz.', 'Reconocer radicales semejantes y sumarlos, sacando antes los factores.', 'التعرّف إلى الجذور المتشابهة وجمعها بعد إخراج العوامل.', 'Recognise like radicals and add them, taking out the factors first.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'radical-ops', title: { eu: 'Batuketa eta biderketa erradikalekin', es: 'Sumar y multiplicar radicales', en: 'Adding and multiplying radicals', ar: 'جمع وضرب الجذور' } }
        ],
        problem: same('$\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak.', 'Saca factores.', 'أخرج العوامل.', 'Take out factors.'), math: same('$2\\sqrt{3}+5\\sqrt{3}-3\\sqrt{3}$') },
            { text: say('Batu koefizienteak.', 'Suma los coeficientes.', 'اجمع المعاملات.', 'Add the coefficients.'), math: same('$(2+5-3)\\sqrt{3}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$4\\sqrt{3}$') }
        ],
        takeaway: say('Indize eta errokizun bera dutenak bakarrik batzen dira: koefizienteak batu.', 'Solo se suman los de igual índice y radicando: suma los coeficientes.', 'لا يُجمع إلا ما له الدليل وما تحت الجذر نفسهما: اجمع المعاملات.', 'Only radicals with the same index and radicand are added: add the coefficients.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    },
    {
        id: 'multiply-radicals',
        stage: 'operations',
        title: say('Erradikalak biderkatu, zatitu eta berretu', 'Multiplicar, dividir y elevar radicales', 'ضرب الجذور وقسمتها ورفعها إلى قوة', 'Multiplying, dividing and raising radicals to a power'),
        goal: say('Indize bereko eta indize desberdineko erradikalekin biderketak, zatiketak, berreturak eta erroak egitea.', 'Multiplicar, dividir, elevar y hacer raíces de radicales del mismo y de distinto índice.', 'ضرب الجذور ذات الدليل نفسه ومختلفة الدليل وقسمتها ورفعها إلى قوة وأخذ جذورها.', 'Multiply, divide, raise to a power and take roots of radicals with the same or different indices.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'radical-ops', title: { eu: 'Batuketa eta biderketa erradikalekin', es: 'Sumar y multiplicar radicales', en: 'Adding and multiplying radicals', ar: 'جمع وضرب الجذور' } }
        ],
        problem: same('$\\sqrt[3]{4}\\cdot\\sqrt{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indize komuna: 6.', 'Índice común: 6.', 'الدليل المشترك: 6.', 'Common index: 6.'), math: same('$\\sqrt[6]{4^2}\\cdot\\sqrt[6]{2^3}$') },
            { text: say('Elkartu.', 'Junta.', 'اجمع.', 'Combine.'), math: same('$\\sqrt[6]{2^4\\cdot 2^3}=\\sqrt[6]{2^7}$') },
            { text: say('Atera faktorea.', 'Saca el factor.', 'أخرج العامل.', 'Take out the factor.'), math: same('$2\\sqrt[6]{2}$') }
        ],
        takeaway: say('Indize bera: errokizunak elkartu. Indize desberdinak: lehenik indize komuna.', 'Mismo índice: junta los radicandos. Índices distintos: primero índice común.', 'الدليل نفسه: اجمع ما تحت الجذور. أدلة مختلفة: أولًا دليل مشترك.', 'Same index: combine the radicands. Different indices: first, a common index.'),
        figure: (language) => <RadicalProductFigure language={language} />
    },

    /* ---------- 4. Rationalizing ---------- */
    {
        id: 'rationalize-square',
        stage: 'rationalize',
        figureAfterSteps: true,
        title: say('Erro karratu bat izendatzailean', 'Una raíz cuadrada en el denominador', 'جذر تربيعي في المقام', 'A square root in the denominator'),
        goal: say('Izendatzailean $\\sqrt{b}$ edo $a\\sqrt{b}$ duten zatikiak arrazionalizatzea.', 'Racionalizar fracciones con $\\sqrt{b}$ o $a\\sqrt{b}$ en el denominador.', 'إنطاق كسور في مقامها $\\sqrt{b}$ أو $a\\sqrt{b}$.', 'Rationalise fractions with $\\sqrt{b}$ or $a\\sqrt{b}$ in the denominator.'),
        problem: same('$\\frac{6}{\\sqrt{3}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu goian eta behean $\\sqrt{3}$ erroaz.', 'Multiplica arriba y abajo por $\\sqrt{3}$.', 'اضرب البسط والمقام في $\\sqrt{3}$.', 'Multiply top and bottom by $\\sqrt{3}$.'), math: same('$\\frac{6\\sqrt{3}}{\\sqrt{3}\\cdot\\sqrt{3}}$') },
            { text: say('$\\sqrt{3}\\cdot\\sqrt{3}=3$.', '$\\sqrt{3}\\cdot\\sqrt{3}=3$.', '$\\sqrt{3}\\cdot\\sqrt{3}=3$.', '$\\sqrt{3}\\cdot\\sqrt{3}=3$.'), math: same('$\\frac{6\\sqrt{3}}{3}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$2\\sqrt{3}$') }
        ],
        takeaway: say('Izendatzailean √b: biderkatu goian eta behean √b-z.', 'En el denominador √b: multiplica arriba y abajo por √b.', 'في المقام √b: اضرب البسط والمقام في √b.', 'In the denominator √b: multiply top and bottom by √b.'),
        figure: (language) => <RationalizeSquareFigure language={language} />
    },
    {
        id: 'rationalize-index',
        stage: 'rationalize',
        title: say('Beste indize bateko erro bat izendatzailean', 'Una raíz de otro índice en el denominador', 'جذر من دليل آخر في المقام', 'A root with a different index in the denominator'),
        goal: say('Izendatzailean $\\sqrt[n]{b^m}$ duten zatikiak arrazionalizatzea.', 'Racionalizar fracciones con $\\sqrt[n]{b^m}$ en el denominador.', 'إنطاق كسور في مقامها $\\sqrt[n]{b^m}$.', 'Rationalise fractions with $\\sqrt[n]{b^m}$ in the denominator.'),
        problem: same('$\\frac{6}{\\sqrt[5]{3^2}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu 5 arte: falta da $3^3$.', 'Completa hasta 5: falta $3^3$.', 'أكمل حتى 5: ينقص $3^3$.', 'Complete up to 5: $3^3$ is missing.'), math: same('$\\frac{6\\sqrt[5]{3^3}}{\\sqrt[5]{3^5}}$') },
            { text: say('Izendatzailea 3 da.', 'El denominador es 3.', 'المقام 3.', 'The denominator is 3.'), math: same('$\\frac{6\\sqrt[5]{27}}{3}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$2\\sqrt[5]{27}$') }
        ],
        takeaway: say('Biderkatu indizeraino falta den berretzailea duen erroaz.', 'Multiplica por la raíz con el exponente que falta hasta el índice.', 'اضرب في الجذر ذي الأس الناقص حتى الدليل.', 'Multiply by the root with the missing exponent, up to the index.'),
        figure: (language) => <RationalizeIndexFigure language={language} />
    },
    {
        id: 'conjugate',
        stage: 'rationalize',
        title: say('Konjokatua', 'El conjugado', 'المرافق', 'The conjugate'),
        goal: say('Izendatzailean erroekin batura edo kenketa duten zatikiak konjokatuaz arrazionalizatzea.', 'Racionalizar fracciones con una suma o resta de raíces en el denominador usando el conjugado.', 'إنطاق كسور في مقامها مجموع أو فرق جذور باستعمال المرافق.', 'Rationalise fractions with a sum or difference of roots in the denominator, using the conjugate.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'sum-diff', title: { eu: 'Batura bider kendura', es: 'Suma por diferencia', en: 'Sum times difference', ar: 'مجموع في فرق' } }
        ],
        problem: same('$\\frac{2}{\\sqrt{3}-1}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu konjokatuaz.', 'Multiplica por el conjugado.', 'اضرب في المرافق.', 'Multiply by the conjugate.'), math: same('$\\frac{2(\\sqrt{3}+1)}{(\\sqrt{3}-1)(\\sqrt{3}+1)}$') },
            { text: say('Karratuen kenketa.', 'Diferencia de cuadrados.', 'فرق مربعين.', 'Difference of squares.'), math: same('$\\frac{2(\\sqrt{3}+1)}{3-1}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$\\sqrt{3}+1$') }
        ],
        takeaway: say('Izendatzailean batura edo kenketa: biderkatu konjokatuaz.', 'Suma o resta en el denominador: multiplica por el conjugado.', 'مجموع أو فرق في المقام: اضرب في المرافق.', 'Sum or difference in the denominator: multiply by the conjugate.'),
        figure: (language) => <ConjugateFigure language={language} />
    },

    /* ---------- 5. Logarithms ---------- */
    {
        id: 'log-definition',
        stage: 'logarithms',
        title: say('Logaritmoa', 'El logaritmo', 'اللوغاريتم', 'The logarithm'),
        goal: say('Logaritmo baten definizioa erabiltzea logaritmoak kalkulatzeko eta oinarria aurkitzeko.', 'Usar la definición de logaritmo para calcular logaritmos y hallar la base.', 'استعمال تعريف اللوغاريتم لحساب اللوغاريتمات وإيجاد الأساس.', 'Use the definition of a logarithm to work out logarithms and find the base.'),
        problem: same('$\\log_4 \\frac{1}{8}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Definizioa.', 'Definición.', 'التعريف.', 'Definition.'), math: same('$4^{x}=\\frac{1}{8}$') },
            { text: say('Biak 2 zenbakiaren berretura gisa.', 'Las dos como potencias de 2.', 'الطرفان قوتان للعدد 2.', 'Both as powers of 2.'), math: same('$2^{2x}=2^{-3}$') },
            { text: say('Berdindu berretzaileak.', 'Iguala los exponentes.', 'ساوِ الأسين.', 'Set the exponents equal.'), math: same('$x=-\\frac{3}{2}$') }
        ],
        takeaway: say('Logaritmoa berretzaile bat da: zenbatera jaso oinarria zenbakia lortzeko.', 'El logaritmo es un exponente: a qué hay que elevar la base para obtener el número.', 'اللوغاريتم أس: إلى أي قوة نرفع الأساس لنحصل على العدد.', 'The logarithm is an exponent: what the base must be raised to in order to get the number.'),
        figure: (language) => <LogDefinitionFigure language={language} />
    },
    {
        id: 'log-properties',
        stage: 'logarithms',
        title: say('Logaritmoen propietateak', 'Propiedades de los logaritmos', 'خصائص اللوغاريتمات', 'Properties of logarithms'),
        goal: say('Logaritmoen propietateak erabiltzea adierazpenak kalkulatzeko eta logaritmo bakar gisa idazteko.', 'Usar las propiedades de los logaritmos para calcular expresiones y escribirlas como un solo logaritmo.', 'استعمال خصائص اللوغاريتمات لحساب العبارات وكتابتها لوغاريتمًا واحدًا.', 'Use the properties of logarithms to work out expressions and write them as a single logarithm.'),
        problem: same('$\\log 2+\\log 25-\\log 5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura: biderkadura.', 'Suma: producto.', 'الجمع: ضرب.', 'Sum: product.'), math: same('$\\log(2\\cdot 25)=\\log 50$') },
            { text: say('Kenketa: zatidura.', 'Resta: cociente.', 'الطرح: قسمة.', 'Difference: quotient.'), math: same('$\\log\\frac{50}{5}=\\log 10$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$1$') }
        ],
        takeaway: say('Biderkadura → batura, zatidura → kenketa, berretura → biderketa.', 'Producto → suma, cociente → resta, potencia → producto.', 'الضرب ← جمع، القسمة ← طرح، القوة ← ضرب.', 'Product → sum, quotient → difference, power → product.'),
        figure: (language) => <LogPropertiesFigure language={language} />
    },
    {
        id: 'change-base',
        stage: 'logarithms',
        title: say('Oinarri-aldaketa eta kalkulagailua', 'Cambio de base y calculadora', 'تغيير الأساس والآلة الحاسبة', 'Change of base and calculator'),
        goal: say('Edozein oinarritako logaritmoak kalkulagailuarekin kalkulatzea, oinarri-aldaketaren formularekin.', 'Calcular logaritmos de cualquier base con la calculadora, con la fórmula del cambio de base.', 'حساب لوغاريتمات أي أساس بالآلة الحاسبة بصيغة تغيير الأساس.', 'Work out logarithms of any base with a calculator, using the change of base formula.'),
        problem: say('Ebatzi $3^x=50$ kalkulagailuarekin.', 'Resuelve $3^x=50$ con la calculadora.', 'حُلّ $3^x=50$ بالآلة الحاسبة.', 'Solve $3^x=50$ with a calculator.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Definizioa.', 'Definición.', 'التعريف.', 'Definition.'), math: same('$x=\\log_3 50$') },
            { text: say('Oinarri-aldaketa.', 'Cambio de base.', 'تغيير الأساس.', 'Change of base.'), math: same('$x=\\frac{\\log 50}{\\log 3}$') },
            { text: say('Kalkulagailua: $27<50<81$ denez, 3 eta 4 artean.', 'Calculadora: como $27<50<81$, entre 3 y 4.', 'الآلة: بما أن $27<50<81$ فبين 3 و4.', 'Calculator: since $27<50<81$, it is between 3 and 4.'), math: same('$x\\approx 3{,}56$') }
        ],
        takeaway: say('Edozein oinarri: zatitu bi logaritmo hamartar. Egiaztatu berreturen artean.', 'Cualquier base: divide dos logaritmos decimales. Comprueba entre potencias.', 'أي أساس: اقسم لوغاريتمين عشريين. وتحقّق بين قوتين.', 'Any base: divide two decimal logarithms. Check between powers.'),
        figure: (language) => <ChangeBaseFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const powersTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...powersLessonTexts[topic.id as PowersTopicId], ...powersLessonChecks[topic.id as PowersTopicId] }))
