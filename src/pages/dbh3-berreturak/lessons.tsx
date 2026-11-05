import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    ErrorsFigure,
    IntervalsFigure,
    IrrationalFigure,
    PowersFigure,
    RadicalOpsFigure,
    RealLineFigure,
    RootsFigure,
    RoundingFigure,
    ScientificFigure,
    ScientificOpsFigure,
    SimplifyFigure
} from '../dbh4-aplikatuak-errealak/figures'
import { PowerRulesFigure } from '../dbh4-akademikoak-potentziak/figures'
import { powersLessonChecks, type PowersTopicId } from './lessonChecks'
import { powersLessonTexts } from './lessonTexts'

/* ==========================================================================
   Berreturak eta erroak · 3. DBH — stages and lessons, following the order
   of Santillana 3.º ESO unit 2 (powers with integer exponents, scientific
   notation, roots and radicals, the real numbers, approximations and
   errors) and the powers and radicals of Anaya 3.º ESO unit 2. Exercises
   are original: the books only fix the scope and the order.
   ========================================================================== */

export type PowersStageId = 'powers' | 'scientific' | 'roots' | 'reals' | 'approx'

export const powersStages: UnitStage[] = [
    { id: 'powers', tone: 'blue', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' } },
    { id: 'scientific', tone: 'violet', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' } },
    { id: 'roots', tone: 'mustard', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', en: 'Roots and radicals', ar: 'الجذور والجذريات' } },
    { id: 'reals', tone: 'coral', title: { eu: 'Zenbaki errealak', es: 'Números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' } },
    { id: 'approx', tone: 'green', title: { eu: 'Hurbilketak eta errorea', es: 'Aproximaciones y error', en: 'Approximations and error', ar: 'التقريب والخطأ' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Powers ---------- */
    {
        id: 'power-sign',
        stage: 'powers',
        title: say('Berretura eta zeinua', 'Potencia y signo', 'القوة والإشارة', 'Power and sign'),
        goal: say('Berreturak biderketa errepikatu gisa idaztea eta oinarri negatiboen zeinua zuzen ateratzea.', 'Escribir una potencia como producto repetido y acertar con el signo cuando la base es negativa.', 'كتابة القوة على شكل ضرب متكرر وتحديد الإشارة عندما يكون الأساس سالبًا.', 'Write a power as a repeated product and get the sign right when the base is negative.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'multiply-divide', title: { eu: 'Biderketa eta zatiketa: zeinuen araua', es: 'Producto y cociente: regla de los signos', en: 'Product and quotient: rule of signs', ar: 'الضرب والقسمة: قاعدة الإشارات' } }],
        problem: same('$(-2)^{5}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi biderketa gisa.', 'Escríbela como producto.', 'اكتبها ضربًا.', 'Write it as a product.'), math: same('$(-2)\\cdot(-2)\\cdot(-2)\\cdot(-2)\\cdot(-2)$') },
            { text: say('Zenbatu faktore negatiboak: 5, bakoitia.', 'Cuenta los factores negativos: 5, impar.', 'عدّ العوامل السالبة: 5، فردي.', 'Count the negative factors: 5, odd.'), math: say('Zeinua: negatiboa', 'Signo: negativo', 'الإشارة: سالبة', 'Sign: negative') },
            { text: say('Biderkatu balio absolutuak.', 'Multiplica los valores absolutos.', 'اضرب القيم المطلقة.', 'Multiply the absolute values.'), math: same('$2^{5}=32\\quad\\to\\quad -32$') }
        ],
        takeaway: say('Oinarri negatiboa: berretzaile bikoitia positibo, bakoitia negatibo. $-5^{2}\\neq(-5)^{2}$.', 'Base negativa: exponente par da positivo, impar da negativo. $-5^{2}\\neq(-5)^{2}$.', 'أساس سالب: الأس الزوجي موجب والفردي سالب. $-5^{2}\\neq(-5)^{2}$.', 'Negative base: an even exponent gives positive, an odd one negative. $-5^{2}\\neq(-5)^{2}$.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'negative-zero',
        stage: 'powers',
        title: say('Berretzaile zero eta negatiboa', 'Exponente cero y negativo', 'الأس صفر والأس السالب', 'Zero and negative exponents'),
        goal: say('$a^{0}=1$ eta $a^{-n}=\\frac{1}{a^{n}}$ erabiltzea, oinarri zatikiekin ere.', 'Usar $a^{0}=1$ y $a^{-n}=\\frac{1}{a^{n}}$, también con bases fraccionarias.', 'استعمال $a^{0}=1$ و$a^{-n}=\\frac{1}{a^{n}}$ حتى مع الأسس الكسرية.', 'Use $a^{0}=1$ and $a^{-n}=\\frac{1}{a^{n}}$, including with fractional bases.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'mul-div', title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' } }],
        problem: same('$\\left(-\\frac{1}{2}\\right)^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman zatikiari eta berretzailea positibo.', 'Da la vuelta a la fracción y el exponente pasa a positivo.', 'اقلب الكسر واجعل الأس موجبًا.', 'Turn the fraction upside down and the exponent becomes positive.'), math: same('$(-2)^{3}$') },
            { text: say('Berretzaile bakoitia: zeinua negatiboa.', 'Exponente impar: signo negativo.', 'أس فردي: إشارة سالبة.', 'Odd exponent: negative sign.'), math: same('$-2^{3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$-8$') }
        ],
        takeaway: say('Zero berretzailea: $5^{0}=1$. Berretzaile negatiboa: alderantzizkoa, ez emaitza negatiboa.', 'Exponente cero: $5^{0}=1$. Exponente negativo: el inverso, no un resultado negativo.', 'الأس صفر: $5^{0}=1$. الأس السالب: المقلوب لا نتيجة سالبة.', 'Zero exponent: $5^{0}=1$. Negative exponent: the reciprocal, not a negative result.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'power-rules',
        stage: 'powers',
        title: say('Berreturen propietateak', 'Propiedades de las potencias', 'خصائص القوى', 'Properties of powers'),
        goal: say('Propietateak erabiltzea berreturak berretura bakarrean laburtzeko.', 'Usar las propiedades para reducir varias potencias a una sola.', 'استعمال الخصائص لاختصار عدة قوى في قوة واحدة.', 'Use the properties to combine several powers into one.'),
        needs: [{ unit: 'dbh2/zatikiak', topic: 'powers', title: { eu: 'Zatikien berreturak', es: 'Potencias de fracciones', en: 'Powers of fractions', ar: 'قوى الكسور' } }],
        problem: same('$\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goian, oinarri bera: batu berretzaileak.', 'Arriba, misma base: suma los exponentes.', 'في البسط الأساس نفسه: اجمع الأسس.', 'On top, same base: add the exponents.'), math: same('$\\frac{3^{5-2}}{3^{4}}=\\frac{3^{3}}{3^{4}}$') },
            { text: say('Zatitzean, kendu berretzaileak.', 'Al dividir, resta los exponentes.', 'عند القسمة اطرح الأسس.', 'When dividing, subtract the exponents.'), math: same('$3^{3-4}=3^{-1}$') },
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'الأس السالب: المقلوب.', 'Negative exponent: the reciprocal.'), math: same('$\\frac{1}{3}$') }
        ],
        takeaway: say('Oinarri bera: biderkatzean batu, zatitzean kendu, berreturaren berreturan biderkatu.', 'Misma base: al multiplicar suma, al dividir resta, en la potencia de potencia multiplica.', 'الأساس نفسه: في الضرب اجمع، وفي القسمة اطرح، وفي قوة القوة اضرب.', 'Same base: when multiplying, add; when dividing, subtract; for a power of a power, multiply.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },

    /* ---------- 2. Scientific notation ---------- */
    {
        id: 'sci-write',
        stage: 'scientific',
        title: say('Zenbakiak idazkera zientifikoan', 'Escribir en notación científica', 'الكتابة بالترميز العلمي', 'Writing in scientific notation'),
        goal: say('Zenbaki oso handiak eta oso txikiak $a\\cdot 10^{n}$ forman idaztea, eta alderantziz.', 'Escribir números muy grandes y muy pequeños como $a\\cdot 10^{n}$, y al revés.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا على صورة $a\\cdot 10^{n}$ والعكس.', 'Write very large and very small numbers as $a\\cdot 10^{n}$, and the other way round.'),
        problem: same('$0{,}000\\,072$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eraman koma zifra esanguratsu bakarra gelditu arte.', 'Mueve la coma hasta dejar una sola cifra distinta de 0 delante.', 'حرّك الفاصلة حتى يبقى رقم واحد غير صفر قبلها.', 'Move the decimal point until only one non-zero digit is left in front of it.'), math: same('$7{,}2$') },
            { text: say('Zenbatu jauziak: 5, eskuinera.', 'Cuenta los saltos: 5, a la derecha.', 'عدّ القفزات: 5 نحو اليمين.', 'Count the jumps: 5, to the right.'), math: same('$10^{-5}$') },
            { text: say('Idatzi.', 'Escribe el resultado.', 'اكتب النتيجة.', 'Write the result.'), math: same('$7{,}2\\cdot 10^{-5}$') }
        ],
        takeaway: say('Handia: berretzaile positiboa. Txikia: berretzaile negatiboa. Komaren aurretik zifra bakarra, 0 ez dena.', 'Grande: exponente positivo. Pequeño: exponente negativo. Delante de la coma, una sola cifra distinta de 0.', 'الكبير: أس موجب. الصغير: أس سالب. قبل الفاصلة رقم واحد غير صفر.', 'Large: positive exponent. Small: negative exponent. In front of the decimal point, one non-zero digit only.'),
        figure: (language) => <ScientificFigure language={language} />
    },
    {
        id: 'sci-compare',
        stage: 'scientific',
        title: say('Magnitude-ordena eta konparaketa', 'Orden de magnitud y comparación', 'رتبة المقدار والمقارنة', 'Order of magnitude and comparison'),
        goal: say('Idazkera zientifikoko zenbakiak konparatzea eta ordenatzea, eta magnitude-ordena ezagutzea.', 'Comparar y ordenar números en notación científica y reconocer el orden de magnitud.', 'مقارنة وترتيب الأعداد المكتوبة بالترميز العلمي ومعرفة رتبة المقدار.', 'Compare and order numbers in scientific notation, and recognise the order of magnitude.'),
        problem: say('$8\\cdot 10^{-4}$ eta $2\\cdot 10^{-3}$', '$8\\cdot 10^{-4}$ y $2\\cdot 10^{-3}$', '$8\\cdot 10^{-4}$ و$2\\cdot 10^{-3}$', '$8\\cdot 10^{-4}$ and $2\\cdot 10^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu berretzaileak: $-4$ eta $-3$.', 'Compara los exponentes: $-4$ y $-3$.', 'قارن الأسين: $-4$ و$-3$.', 'Compare the exponents: $-4$ and $-3$.'), math: same('$-3>-4$') },
            { text: say('Berretzaile handiena duena handiagoa da.', 'El que tiene mayor exponente es mayor.', 'صاحب الأس الأكبر هو الأكبر.', 'The one with the larger exponent is larger.'), math: same('$2\\cdot 10^{-3}>8\\cdot 10^{-4}$') },
            { text: say('Egiaztatu hamartarrekin.', 'Comprueba con decimales.', 'تحقق بالأعداد العشرية.', 'Check with decimals.'), math: same('$0{,}002>0{,}0008$') }
        ],
        takeaway: say('Lehenik berretzaileak, gero zenbakiak. Berretzaileak magnitude-ordena ematen du.', 'Primero los exponentes, después los números. El exponente da el orden de magnitud.', 'أولًا الأسس ثم الأعداد. الأس يعطي رتبة المقدار.', 'First the exponents, then the numbers. The exponent gives the order of magnitude.')
    },
    {
        id: 'sci-ops',
        stage: 'scientific',
        title: say('Eragiketak idazkera zientifikoan', 'Operaciones en notación científica', 'العمليات بالترميز العلمي', 'Operations in scientific notation'),
        goal: say('Idazkera zientifikoko zenbakiak biderkatzea, zatitzea, batzea eta kentzea.', 'Multiplicar, dividir, sumar y restar números en notación científica.', 'ضرب وقسمة وجمع وطرح الأعداد بالترميز العلمي.', 'Multiply, divide, add and subtract numbers in scientific notation.'),
        problem: same('$(6\\cdot 10^{5}):(3\\cdot 10^{-2})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu zenbakiak.', 'Divide los números.', 'اقسم العددين.', 'Divide the numbers.'), math: same('$6:3=2$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسين.', 'Subtract the exponents.'), math: same('$5-(-2)=7$') },
            { text: say('Idatzi emaitza.', 'Escribe el resultado.', 'اكتب النتيجة.', 'Write the result.'), math: same('$2\\cdot 10^{7}$') }
        ],
        takeaway: say('Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', 'Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', 'في الضرب اجمع الأسس، وفي القسمة اطرحها؛ وللجمع الأس نفسه.', 'When multiplying, add the exponents; when dividing, subtract them; to add, use the same exponent.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },

    /* ---------- 3. Roots and radicals ---------- */
    {
        id: 'roots',
        stage: 'roots',
        title: say('Erro karratuak eta kuboak', 'Raíces cuadradas y cúbicas', 'الجذور التربيعية والتكعيبية', 'Square and cube roots'),
        goal: say('Erro zehatzak eta ez-zehatzak bereiztea, eta berreturaren alderantzizko eragiketa gisa ulertzea.', 'Distinguir raíces exactas e inexactas y entender la raíz como operación inversa de la potencia.', 'التمييز بين الجذور الصحيحة وغير الصحيحة وفهم الجذر عملية عكسية للقوة.', 'Distinguish exact from inexact roots, and understand a root as the inverse operation of a power.'),
        problem: same('$\\sqrt{196}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zer zenbakik emango du 196 karratura jasota? Egin tanteoa: $14^{2}$.', '¿Qué número elevado al cuadrado da 196? Tantea: $14^{2}$.', 'أي عدد مربعه 196؟ جرّب: $14^{2}$.', 'What number squared gives 196? Try $14^{2}$.'), math: same('$14\\cdot 14=196$') },
            { text: say('Erro karratua positiboa da.', 'La raíz cuadrada es positiva.', 'الجذر التربيعي موجب.', 'The square root is positive.'), math: same('$\\sqrt{196}=14$') }
        ],
        takeaway: say('Erroa berreturaren alderantzizkoa da. Karratu perfektuak ez diren zenbakien erroak ez dira zehatzak.', 'La raíz es la inversa de la potencia. Si no es cuadrado perfecto, la raíz no es exacta.', 'الجذر هو عكس القوة. وإذا لم يكن مربعًا كاملًا فالجذر غير صحيح.', 'The root is the inverse of the power. If it is not a perfect square, the root is not exact.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'extract',
        stage: 'roots',
        title: say('Faktoreak erroitik ateratzea', 'Sacar factores de la raíz', 'إخراج العوامل من الجذر', 'Taking factors out of a root'),
        goal: say('Errokizuna faktore lehenetan deskonposatu eta karratu perfektuak erroitik ateratzea.', 'Descomponer el radicando en factores primos y sacar de la raíz los cuadrados perfectos.', 'تحليل ما تحت الجذر إلى عوامل أولية وإخراج المربعات الكاملة.', 'Break the radicand down into prime factors and take the perfect squares out of the root.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'factorization', title: { eu: 'Biderkagai lehenetan deskonposatzea', es: 'Descomposición en factores primos', en: 'Prime factorisation', ar: 'التحليل إلى عوامل أولية' } }],
        problem: same('$\\sqrt{180}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$180=2^{2}\\cdot 3^{2}\\cdot 5$') },
            { text: say('Atera bikoteak.', 'Saca los pares.', 'أخرج الأزواج.', 'Take out the pairs.'), math: same('$\\sqrt{2^{2}\\cdot 3^{2}\\cdot 5}=2\\cdot 3\\cdot\\sqrt{5}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$6\\sqrt{5}$') }
        ],
        takeaway: say('Faktorizatu eta atera bikoteak. Errokizunak ezin du karratu perfekturik izan.', 'Factoriza y saca los pares. El radicando no puede quedar con un cuadrado perfecto.', 'حلّل وأخرج الأزواج. ولا يجوز أن يبقى مربع كامل تحت الجذر.', 'Factorise and take out the pairs. The radicand cannot be left with a perfect square.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'introduce',
        stage: 'roots',
        title: say('Faktoreak erroan sartzea', 'Meter factores en la raíz', 'إدخال العوامل في الجذر', 'Putting factors inside a root'),
        goal: say('Erroaren aurreko faktorea errokizunean sartzea, adierazpenak konparatzeko.', 'Introducir el factor de delante dentro del radicando para comparar expresiones.', 'إدخال العامل الذي أمام الجذر تحت الجذر لمقارنة العبارات.', 'Put the factor in front inside the radicand to compare expressions.'),
        problem: same('$4\\sqrt{3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jaso aurreko faktorea karratura.', 'Eleva al cuadrado el factor de delante.', 'ارفع العامل الذي في الأمام إلى التربيع.', 'Square the factor in front.'), math: same('$4^{2}=16$') },
            { text: say('Biderkatu errokizunarekin.', 'Multiplícalo por el radicando.', 'اضربه في ما تحت الجذر.', 'Multiply it by the radicand.'), math: same('$16\\cdot 3=48$') },
            { text: say('Sartu erroan.', 'Mételo en la raíz.', 'أدخله تحت الجذر.', 'Put it inside the root.'), math: same('$4\\sqrt{3}=\\sqrt{48}$') }
        ],
        takeaway: say('Aurreko faktorea karratura jaso eta errokizunarekin biderkatu. Konparatzeko erabilgarria.', 'El factor de delante se eleva al cuadrado y se multiplica por el radicando. Útil para comparar.', 'يُرفع العامل الأمامي إلى التربيع ويُضرب في ما تحت الجذر. مفيد للمقارنة.', 'The factor in front is squared and multiplied by the radicand. Useful for comparing.')
    },
    {
        id: 'radical-ops',
        stage: 'roots',
        title: say('Batuketa eta biderketa erradikalekin', 'Sumar y multiplicar radicales', 'جمع وضرب الجذور', 'Adding and multiplying radicals'),
        goal: say('Erradikal antzekoak batzea eta kentzea, eta erroak biderkatzea eta zatitzea.', 'Sumar y restar radicales semejantes, y multiplicar y dividir raíces.', 'جمع وطرح الجذور المتشابهة وضرب الجذور وقسمتها.', 'Add and subtract like radicals, and multiply and divide roots.'),
        problem: same('$\\sqrt{50}-\\sqrt{8}+\\sqrt{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak erro bakoitzetik.', 'Saca factores de cada raíz.', 'أخرج العوامل من كل جذر.', 'Take factors out of each root.'), math: same('$5\\sqrt{2}-2\\sqrt{2}+\\sqrt{2}$') },
            { text: say('Antzekoak dira: eragin koefizienteekin.', 'Son semejantes: opera los coeficientes.', 'متشابهة: اعمل على المعاملات.', 'They are like radicals: work with the coefficients.'), math: same('$(5-2+1)\\sqrt{2}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$4\\sqrt{2}$') }
        ],
        takeaway: say('Antzekoak bakarrik batzen dira. Erroak ez dira errokizunak batuz batzen.', 'Solo se suman los semejantes. Las raíces no se suman sumando los radicandos.', 'لا تُجمع إلا المتشابهة. ولا تُجمع الجذور بجمع ما تحتها.', 'Only like radicals are added. Roots are not added by adding the radicands.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    },

    /* ---------- 4. Real numbers ---------- */
    {
        id: 'irrational',
        stage: 'reals',
        title: say('Zenbaki arrazionalak eta irrazionalak', 'Números racionales e irracionales', 'الأعداد النسبية وغير النسبية', 'Rational and irrational numbers'),
        goal: say('Zenbaki bat arrazionala edo irrazionala den erabakitzea.', 'Decidir si un número es racional o irracional.', 'تحديد ما إذا كان العدد نسبيًا أم غير نسبي.', 'Decide whether a number is rational or irrational.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'decimal-kinds', title: { eu: 'Zatikiak eta zenbaki hamartarrak', es: 'Fracciones y números decimales', en: 'Fractions and decimal numbers', ar: 'الكسور والأعداد العشرية' } }],
        problem: same('$\\sqrt{81},\\ \\sqrt{15},\\ 0{,}\\overline{45}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\sqrt{81}=9$: arrazionala.', '$\\sqrt{81}=9$: racional.', '$\\sqrt{81}=9$: نسبي.', '$\\sqrt{81}=9$: rational.'), math: same('$9=\\frac{9}{1}$') },
            { text: say('$15$ ez da karratu perfektua: irrazionala.', '$15$ no es cuadrado perfecto: irracional.', '$15$ ليس مربعًا كاملًا: غير نسبي.', '$15$ is not a perfect square: irrational.'), math: same('$\\sqrt{15}=3{,}87\\ldots$') },
            { text: say('Hamartar periodikoa: arrazionala.', 'Decimal periódico: racional.', 'عشري دوري: نسبي.', 'Recurring decimal: rational.'), math: same('$0{,}\\overline{45}=\\frac{5}{11}$') }
        ],
        takeaway: say('Arrazionala: zatiki bat, hamartar zehatza edo periodikoa. Irrazionala: infinitua eta periodorik gabea.', 'Racional: una fracción, decimal exacto o periódico. Irracional: infinitas cifras sin periodo.', 'النسبي: كسر، عشري صحيح أو دوري. غير النسبي: أرقام لا نهائية بلا دور.', 'Rational: a fraction, with a terminating or recurring decimal. Irrational: infinitely many digits with no repeating pattern.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'real-line',
        stage: 'reals',
        title: say('Zuzen erreala', 'La recta real', 'المستقيم الحقيقي', 'The real number line'),
        goal: say('Zenbaki errealak zuzenean kokatzea, irrazionalak eraikuntza geometrikoz ere.', 'Situar números reales en la recta, también los irracionales con una construcción geométrica.', 'تمثيل الأعداد الحقيقية على المستقيم ومنها غير النسبية بإنشاء هندسي.', 'Place real numbers on the number line, including irrational numbers, using a geometric construction.'),
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'hypotenuse', title: { eu: 'Hipotenusa kalkulatu', es: 'Calcular la hipotenusa', en: 'Calculate the hypotenuse', ar: 'حساب الوتر' } }],
        problem: same('$\\sqrt{5}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi karratuen batura: $5=2^{2}+1^{2}$.', 'Escribe como suma de cuadrados: $5=2^{2}+1^{2}$.', 'اكتب كمجموع مربعين: $5=2^{2}+1^{2}$.', 'Write as a sum of squares: $5=2^{2}+1^{2}$.'), math: same('$\\sqrt{5}=\\sqrt{2^{2}+1^{2}}$') },
            { text: say('Eraiki aldeak $2$ eta $1$ dituen triangelu zuzena.', 'Construye el triángulo rectángulo de catetos $2$ y $1$.', 'ارسم المثلث القائم الذي ضلعاه $2$ و$1$.', 'Construct the right-angled triangle with legs $2$ and $1$.'), math: say('Hipotenusa: $\\sqrt{5}$', 'Hipotenusa: $\\sqrt{5}$', 'الوتر: $\\sqrt{5}$', 'Hypotenuse: $\\sqrt{5}$') },
            { text: say('Eraman hipotenusa zuzenera konpasarekin.', 'Lleva la hipotenusa a la recta con el compás.', 'انقل الوتر إلى المستقيم بالفرجار.', 'Transfer the hypotenuse to the number line with the compass.'), math: same('$\\sqrt{5}\\approx 2{,}24$') }
        ],
        takeaway: say('Zenbaki erreal bakoitza zuzeneko puntu bat da. Irrazionalak Pitagorasekin eraikitzen dira.', 'Cada número real es un punto de la recta. Los irracionales se construyen con Pitágoras.', 'كل عدد حقيقي نقطة على المستقيم. وتُنشأ غير النسبية بفيثاغورس.', 'Every real number is a point on the number line. Irrational numbers can be constructed using Pythagoras.'),
        figure: (language) => <RealLineFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'reals',
        title: say('Tarteak', 'Intervalos', 'الفترات', 'Intervals'),
        goal: say('Tarteak idaztea eta irakurtzea: itxiak, irekiak eta erdi-irekiak.', 'Escribir y leer intervalos: cerrados, abiertos y semiabiertos.', 'كتابة وقراءة الفترات: مغلقة ومفتوحة ونصف مفتوحة.', 'Write and read intervals: closed, open and half-open.'),
        problem: same('$[-1,\\,4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerreko muturra sartzen da (kortxete itxia).', 'El extremo izquierdo entra (corchete cerrado).', 'الطرف الأيسر داخل (قوس مغلق).', 'The left endpoint is included (square bracket).'), math: same('$-1\\le x$') },
            { text: say('Eskuineko muturra ez da sartzen (parentesi irekia).', 'El extremo derecho no entra (paréntesis abierto).', 'الطرف الأيمن غير داخل (قوس مفتوح).', 'The right endpoint is not included (round bracket).'), math: same('$x<4$') },
            { text: say('Luzera: $4-(-1)$.', 'Longitud: $4-(-1)$.', 'الطول: $4-(-1)$.', 'Length: $4-(-1)$.'), math: same('$5$') }
        ],
        takeaway: say('Kortxetea: muturra sartzen da. Parentesia: ez da sartzen. Luzera: muturra ken hasiera.', 'Corchete: el extremo entra. Paréntesis: no entra. Longitud: final menos principio.', 'القوس المربع: الطرف داخل. القوس العادي: غير داخل. الطول: النهاية ناقص البداية.', 'Square bracket: the endpoint is included. Round bracket: it is not. Length: end minus start.'),
        figure: (language) => <IntervalsFigure language={language} />
    },

    /* ---------- 5. Approximations and error ---------- */
    {
        id: 'rounding',
        stage: 'approx',
        title: say('Trunkatzea eta biribiltzea', 'Truncar y redondear', 'البتر والتقريب', 'Truncating and rounding'),
        goal: say('Zenbaki bat trunkatzea eta biribiltzea hamarrenetara, ehunenetara eta milaenetara.', 'Truncar y redondear un número a las décimas, centésimas y milésimas.', 'بتر عدد وتقريبه إلى الأعشار والأجزاء من مئة والأجزاء من ألف.', 'Truncate and round a number to one, two or three decimal places.'),
        problem: say('$\\sqrt{7}=2{,}6457\\ldots$ milaenetara', '$\\sqrt{7}=2{,}6457\\ldots$ a las milésimas', '$\\sqrt{7}=2{,}6457\\ldots$ إلى الأجزاء من ألف', '$\\sqrt{7}=2{,}6457\\ldots$ to three decimal places'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mantendu hiru hamartar: $2{,}645$.', 'Conserva tres decimales: $2{,}645$.', 'احتفظ بثلاثة أرقام عشرية: $2{,}645$.', 'Keep three decimal places: $2{,}645$.'), math: say('Kendu den lehen zifra: 7', 'Primera cifra suprimida: 7', 'أول رقم محذوف: 7', 'First digit dropped: 7') },
            { text: say('Trunkatuz: moztu.', 'Truncando: se corta.', 'بالبتر: نقطع.', 'Truncating: cut it off.'), math: same('$2{,}645$') },
            { text: say('Biribilduz: $7\\ge 5$, gehitu $1$.', 'Redondeando: $7\\ge 5$, suma $1$.', 'بالتقريب: $7\\ge 5$ أضف $1$.', 'Rounding: $7\\ge 5$, add $1$.'), math: same('$2{,}646$') }
        ],
        takeaway: say('Trunkatu: moztu. Biribildu: kendutako lehen zifra $\\ge 5$ bada, gehitu $1$.', 'Truncar: cortar. Redondear: si la primera cifra suprimida es $\\ge 5$, suma $1$.', 'البتر: قطع. التقريب: إذا كان أول رقم محذوف $\\ge 5$ أضف $1$.', 'Truncate: cut off. Round: if the first digit dropped is $\\ge 5$, add $1$.'),
        figure: (language) => <RoundingFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y relativo', 'الخطأ المطلق والنسبي', 'Absolute and relative error'),
        goal: say('Hurbilketa batean egindako errorea neurtzea, absolutua eta erlatiboa.', 'Medir el error cometido en una aproximación, absoluto y relativo.', 'قياس الخطأ المرتكب في تقريب ما، المطلق والنسبي.', 'Measure the error made in an approximation: absolute and relative.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' } }],
        problem: say('Zehatza $40$ da, hurbilketa $39$', 'Valor exacto $40$, aproximación $39$', 'القيمة الصحيحة $40$ والتقريب $39$', 'Exact value $40$, approximation $39$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errore absolutua.', 'Error absoluto.', 'الخطأ المطلق.', 'Absolute error.'), math: same('$E_{a}=|40-39|=1$') },
            { text: say('Zatitu zenbaki zehatzaz.', 'Divide entre el valor exacto.', 'اقسم على القيمة الصحيحة.', 'Divide by the exact value.'), math: same('$E_{r}=\\frac{1}{40}$') },
            { text: say('Hamartar edo ehuneko.', 'Decimal o porcentaje.', 'عشري أو نسبة مئوية.', 'Decimal or percentage.'), math: same('$0{,}025=2{,}5\\,\\%$') }
        ],
        takeaway: say('Absolutua: distantzia. Erlatiboa: absolutua zatitu zehatzaz. Erlatiboak neurriarekin konparatzen du.', 'Absoluto: la distancia. Relativo: el absoluto entre el exacto. El relativo compara con lo que se mide.', 'المطلق: المسافة. النسبي: المطلق على الصحيح. والنسبي يقارن بما نقيسه.', 'Absolute: the distance. Relative: the absolute error divided by the exact value. The relative error compares it with what is being measured.'),
        figure: (language) => <ErrorsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const powersTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...powersLessonTexts[topic.id as PowersTopicId], ...powersLessonChecks[topic.id as PowersTopicId] }))
