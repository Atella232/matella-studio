import type { LocalizedText, UnitTopic } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'
import type { FractionStageId, TheoryTopicId } from './content.ts'

/* ==========================================================================
   Zatikiak · 2. DBH — lessons
   Each lesson explains the idea, breaks it into numbered steps (a method)
   or independent facts (cases and warnings), and ends with a worked example.
   The figures are attached in index.tsx so this file stays plain data.
   ========================================================================== */

export interface TheoryTopic extends Omit<UnitTopic, 'figure'> {
    id: TheoryTopicId
    stage: FractionStageId
}

/** The same formula in every language, with a decimal point instead of the comma in Arabic */
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, en: latex, ar: latex.replace(/\{,\}/g, '.') })

export const theoryTopics: TheoryTopic[] = [
    {
        id: 'meaning',
        stage: 'meaning',
        title: { eu: 'Zer adierazten du zatiki batek?', es: '¿Qué representa una fracción?', en: 'What does a fraction represent?', ar: 'ماذا يمثّل الكسر؟' },
        goal: {
            eu: 'Zatikia zati gisa, zatiketa gisa eta zenbaki gisa interpretatzea.',
            es: 'Interpretar una fracción como parte, como cociente y como número.',
            en: 'Interpret a fraction as a part, as a quotient and as a number.',
            ar: 'تفسير الكسر بوصفه جزءًا وقسمةً وعددًا.'
        },
        explanation: {
            eu: 'Zatiki batek bi gai ditu. Izendatzaileak (behean) adierazten du unitatea zenbat zati berdinetan banatzen den; zenbakitzaileak (goian), zenbat zati hartzen diren. Zatiki bera hiru modutara irakur daiteke: osoaren zati gisa, zatiketa baten emaitza gisa eta zenbaki-zuzeneko puntu jakin bat gisa.',
            es: 'Una fracción tiene dos términos. El denominador (abajo) indica en cuántas partes iguales se divide la unidad; el numerador (arriba), cuántas de esas partes se toman. La misma fracción se puede leer de tres maneras: como parte de un todo, como el resultado de una división y como un punto concreto de la recta numérica.',
            en: 'A fraction has two terms. The denominator (bottom) shows how many equal parts the whole is divided into; the numerator (top) shows how many of those parts are taken. The same fraction can be read in three ways: as part of a whole, as the result of a division and as a particular point on the number line.',
            ar: 'للكسر حدّان. يبيّن المقام (في الأسفل) عدد الأجزاء المتساوية التي تُقسم إليها الوحدة، ويبيّن البسط (في الأعلى) عدد الأجزاء المأخوذة. ويمكن قراءة الكسر نفسه بثلاث طرق: جزءًا من كل، وناتجَ قسمة، ونقطةً محددة على خط الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Osoaren zati bat', es: 'Parte de un todo', en: 'Part of a whole', ar: 'جزء من كل' },
                text: { eu: 'Txokolate-tableta bat 4 zati berdinetan banatu eta 3 hartzen badituzu, tabletaren $\\frac{3}{4}$ hartu duzu.', es: 'Si divides una tableta de chocolate en 4 trozos iguales y tomas 3, has tomado $\\frac{3}{4}$ de la tableta.', en: 'If you divide a chocolate bar into 4 equal pieces and take 3, you have taken $\\frac{3}{4}$ of the bar.', ar: 'إذا قسمت لوح شوكولاتة إلى 4 قطع متساوية وأخذت 3 منها، فقد أخذت $\\frac{3}{4}$ اللوح.' }
            },
            {
                title: { eu: 'Zatiketa bat', es: 'Una división', en: 'A division', ar: 'قسمة' },
                text: { eu: '3 pizza 4 lagunen artean banatzen badira, bakoitzak $\\frac{3}{4}$ pizza jaten du. Zatikia zatiketa bat da.', es: 'Si se reparten 3 pizzas entre 4 personas, cada una come $\\frac{3}{4}$ de pizza. La fracción es una división.', en: 'If 3 pizzas are shared between 4 people, each one eats $\\frac{3}{4}$ of a pizza. The fraction is a division.', ar: 'إذا وُزّعت 3 بيتزا على 4 أشخاص، يأكل كل واحد $\\frac{3}{4}$ بيتزا. فالكسر قسمة.' },
                math: dec('$\\frac{3}{4}=3\\div 4=0{,}75$')
            },
            {
                title: { eu: 'Zenbaki bat', es: 'Un número', en: 'A number', ar: 'عدد' },
                text: { eu: '$\\frac{3}{4}$ zenbaki-zuzenean dago, 0 eta 1 artean, 1etik hurbilago. Zenbakitzailea izendatzailea baino handiagoa bada, zatikiak 1 baino gehiago balio du.', es: '$\\frac{3}{4}$ ocupa un punto de la recta, entre 0 y 1, más cerca de 1. Si el numerador es mayor que el denominador, la fracción vale más que 1.', en: '$\\frac{3}{4}$ is a point on the number line, between 0 and 1, closer to 1. If the numerator is bigger than the denominator, the fraction is worth more than 1.', ar: 'يقع $\\frac{3}{4}$ على خط الأعداد بين 0 و1، وهو أقرب إلى 1. وإذا كان البسط أكبر من المقام كانت قيمة الكسر أكبر من 1.' },
                math: '$0<\\frac{3}{4}<1<\\frac{5}{4}$'
            },
            {
                title: { eu: 'Zatiak berdinak izan behar dira', es: 'Las partes deben ser iguales', en: 'The parts must be equal', ar: 'يجب أن تكون الأجزاء متساوية' },
                text: { eu: 'Tableta tamaina desberdineko 4 zatitan hausten bada, zati bakoitza ez da laurden bat. Izendatzaileak zati berdinak eskatzen ditu.', es: 'Si la tableta se rompe en 4 trozos de distinto tamaño, cada trozo no es un cuarto. El denominador exige partes iguales.', en: 'If the bar is broken into 4 pieces of different sizes, each piece is not a quarter. The denominator requires equal parts.', ar: 'إذا انكسر اللوح إلى 4 قطع مختلفة الحجم فليست كل قطعة ربعًا. فالمقام يشترط أجزاء متساوية.' }
            }
        ],
        example: dec('$\\frac{5}{8}\\;\\rightarrow\\;5\\div 8=0{,}625$'),
        takeaway: {
            eu: 'Izendatzailea: zenbat zati berdin. Zenbakitzailea: zenbat hartzen diren.',
            es: 'Denominador: en cuántas partes iguales. Numerador: cuántas se toman.',
            en: 'Denominator: into how many equal parts. Numerator: how many are taken.',
            ar: 'المقام: كم جزءًا متساويًا. البسط: كم جزءًا نأخذ.'
        }
    },
    {
        id: 'representation',
        stage: 'meaning',
        title: { eu: 'Zatiki propioak, inpropioak eta mistoak', es: 'Fracciones propias, impropias y mixtas', en: 'Proper, improper and mixed fractions', ar: 'الكسور الحقيقية وغير الحقيقية والأعداد الكسرية' },
        goal: {
            eu: 'Zatiki inpropio bat zenbaki misto bihurtzea eta alderantziz, eta zenbaki-zuzenean kokatzea.',
            es: 'Pasar una fracción impropia a número mixto y al revés, y situarla en la recta.',
            en: 'Convert an improper fraction into a mixed number and back, and place it on the number line.',
            ar: 'تحويل الكسر غير الحقيقي إلى عدد كسري وبالعكس، ووضعه على خط الأعداد.'
        },
        explanation: {
            eu: 'Zenbakitzailea izendatzailea baino txikiagoa bada, zatikia propioa da eta 1 baino gutxiago balio du. Handiagoa bada, inpropioa da: unitate osoak ditu, eta zenbaki misto gisa idatz daiteke, hau da, zenbaki oso bat gehi zatiki propio bat. Zenbakitzailearen eta izendatzailearen arteko zatiketa osoak unitateak (zatidura) eta soberan geratzen dena (hondarra) ematen ditu.',
            es: 'Si el numerador es menor que el denominador, la fracción es propia y vale menos que 1. Si es mayor, es impropia: contiene unidades completas y se puede escribir como número mixto, es decir, un número entero más una fracción propia. La división entera del numerador entre el denominador da las unidades (cociente) y lo que sobra (resto).',
            en: 'If the numerator is smaller than the denominator, the fraction is proper and worth less than 1. If it is bigger, it is improper: it contains whole units and can be written as a mixed number, that is, an integer plus a proper fraction. The integer division of the numerator by the denominator gives the whole units (quotient) and what is left over (remainder).',
            ar: 'إذا كان البسط أصغر من المقام فالكسر حقيقي وقيمته أقل من 1. وإذا كان أكبر فهو غير حقيقي: يحتوي وحدات كاملة ويمكن كتابته عددًا كسريًا، أي عددًا صحيحًا مع كسر حقيقي. وتعطي القسمة الصحيحة للبسط على المقام عدد الوحدات (الناتج) وما يتبقى (الباقي).'
        },
        problem: { eu: 'Idatzi $\\frac{17}{5}$ zenbaki misto gisa.', es: 'Escribe $\\frac{17}{5}$ como número mixto.', en: 'Write $\\frac{17}{5}$ as a mixed number.', ar: 'اكتب $\\frac{17}{5}$ عددًا كسريًا.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', en: 'Divide the numerator by the denominator.', ar: 'اقسم البسط على المقام.' },
                math: '$17=5\\cdot 3+2$'
            },
            {
                text: { eu: 'Zatidura unitate osoak dira.', es: 'El cociente son las unidades completas.', en: 'The quotient is the number of whole units.', ar: 'الناتج هو عدد الوحدات الكاملة.' },
                math: '$3$'
            },
            {
                text: { eu: 'Hondarra soberan dagoen zatiaren zenbakitzailea da; izendatzailea ez da aldatzen.', es: 'El resto es el numerador de la parte que sobra; el denominador no cambia.', en: 'The remainder is the numerator of the part left over; the denominator stays the same.', ar: 'الباقي هو بسط الجزء المتبقي، والمقام لا يتغير.' },
                math: '$\\frac{17}{5}=3\\frac{2}{5}$'
            },
            {
                text: { eu: 'Itzultzeko: biderkatu unitateak izendatzaileaz eta batu zenbakitzailea.', es: 'Para volver: multiplica las unidades por el denominador y suma el numerador.', en: 'To go back: multiply the whole units by the denominator and add the numerator.', ar: 'للعودة: اضرب الوحدات في المقام وأضف البسط.' },
                math: '$3\\frac{2}{5}=\\frac{3\\cdot 5+2}{5}=\\frac{17}{5}$'
            }
        ],
        example: dec('$\\frac{17}{5}=3\\frac{2}{5}=3{,}4$'),
        takeaway: { eu: 'Adierazpena aldatzen da; balioa ez.', es: 'Cambia la representación, no el valor.', en: 'The way it is written changes, not the value.', ar: 'يتغيّر التمثيل ولا تتغيّر القيمة.' }
    },
    {
        id: 'equivalence',
        stage: 'equivalence',
        title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', en: 'Equivalent fractions', ar: 'الكسور المتكافئة' },
        goal: {
            eu: 'Itxura desberdina baina balio bera duten zatikiak sortzea eta ezagutzea.',
            es: 'Construir y reconocer fracciones con distinta apariencia y el mismo valor.',
            en: 'Build and recognise fractions that look different but have the same value.',
            ar: 'تكوين الكسور المختلفة في الشكل والمتساوية في القيمة والتعرّف عليها.'
        },
        explanation: {
            eu: 'Bi zatiki baliokideak dira kantitate bera adierazten badute, zenbaki desberdinekin idatzita egon arren. Zenbakitzailea eta izendatzailea zero ez den zenbaki berarekin biderkatuz (anplifikatu) edo zatituz (sinplifikatu) lortzen dira. Bi zatiki baliokideak diren jakiteko, biderkadura gurutzatuak alderatzen dira.',
            es: 'Dos fracciones son equivalentes si representan la misma cantidad, aunque se escriban con números distintos. Se obtienen multiplicando (amplificar) o dividiendo (simplificar) numerador y denominador por el mismo número distinto de cero. Para saber si dos fracciones son equivalentes, se comparan los productos cruzados.',
            en: 'Two fractions are equivalent if they represent the same amount, even if they are written with different numbers. You get them by multiplying (scaling up) or dividing (simplifying) the numerator and denominator by the same non-zero number. To check whether two fractions are equivalent, compare their cross products.',
            ar: 'يكون الكسران متكافئين إذا مثّلا الكمية نفسها وإن كُتبا بأعداد مختلفة. ونحصل عليهما بضرب البسط والمقام في العدد نفسه غير الصفري (التوسيع) أو بقسمتهما عليه (التبسيط). ولمعرفة هل الكسران متكافئان نقارن حاصلَي الضرب التبادلي.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Anplifikatu', es: 'Amplificar', en: 'Expanding', ar: 'التوسيع' },
                text: { eu: 'Biderkatu bi gaiak zenbaki berarekin: zatiak txikiagoak dira, baina gehiago hartzen dituzu.', es: 'Multiplica los dos términos por el mismo número: los trozos son más pequeños, pero tomas más.', en: 'Multiply both terms by the same number: the pieces are smaller, but you take more of them.', ar: 'اضرب الحدّين في العدد نفسه: تصغر الأجزاء لكنك تأخذ عددًا أكبر منها.' },
                math: '$\\frac{3}{4}=\\frac{3\\cdot 2}{4\\cdot 2}=\\frac{6}{8}$'
            },
            {
                title: { eu: 'Sinplifikatu', es: 'Simplificar', en: 'Simplify', ar: 'التبسيط' },
                text: { eu: 'Zatitu bi gaiak zatitzaile komun batez.', es: 'Divide los dos términos entre un divisor común.', en: 'Divide both terms by a common divisor.', ar: 'اقسم الحدّين على قاسم مشترك.' },
                math: '$\\frac{45}{60}=\\frac{45\\div 15}{60\\div 15}=\\frac{3}{4}$'
            },
            {
                title: { eu: 'Biderkadura gurutzatuak', es: 'Productos cruzados', en: 'Cross products', ar: 'الضرب التبادلي' },
                text: { eu: '$\\frac{a}{b}$ eta $\\frac{c}{d}$ baliokideak dira $a\\cdot d=b\\cdot c$ denean.', es: '$\\frac{a}{b}$ y $\\frac{c}{d}$ son equivalentes cuando $a\\cdot d=b\\cdot c$.', en: '$\\frac{a}{b}$ and $\\frac{c}{d}$ are equivalent when $a\\cdot d=b\\cdot c$.', ar: 'يتكافأ $\\frac{a}{b}$ و$\\frac{c}{d}$ عندما $a\\cdot d=b\\cdot c$.' },
                math: '$\\frac{6}{8}=\\frac{9}{12}:\\ 6\\cdot 12=8\\cdot 9=72$'
            },
            {
                title: { eu: 'Kontuz: batzeak ez du balio', es: 'Cuidado: sumar no sirve', en: 'Careful: adding does not work', ar: 'انتبه: الجمع لا يصلح' },
                text: { eu: 'Bi gaiei zenbaki bera batuz gero, balioa aldatzen da.', es: 'Si sumas el mismo número a los dos términos, el valor cambia.', en: 'If you add the same number to both terms, the value changes.', ar: 'إذا أضفت العدد نفسه إلى الحدّين تتغير القيمة.' },
                math: '$\\frac{1+1}{2+1}=\\frac{2}{3}\\neq\\frac{1}{2}$'
            }
        ],
        example: '$\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}=\\frac{45}{60}$',
        takeaway: {
            eu: 'Zenbaki bera goian eta behean, biderkatuz edo zatituz: balioa ez da aldatzen.',
            es: 'El mismo número arriba y abajo, multiplicando o dividiendo: el valor no cambia.',
            en: 'Multiplying or dividing the top and bottom by the same number: the value does not change.',
            ar: 'العدد نفسه في الأعلى والأسفل، ضربًا أو قسمةً: القيمة لا تتغير.'
        }
    },
    {
        id: 'simplification',
        stage: 'equivalence',
        title: { eu: 'Sinplifikazioa eta zatiki laburtezina', es: 'Simplificación y fracción irreducible', en: 'Simplifying and the simplest form', ar: 'التبسيط والكسر غير القابل للاختزال' },
        goal: {
            eu: 'Zatiki bat bere forma laburrenean idaztea, urratsez urrats edo ZKHrekin.',
            es: 'Escribir una fracción en su forma más reducida, paso a paso o con el m.c.d.',
            en: 'Write a fraction in its simplest form, step by step or using the GCD.',
            ar: 'كتابة الكسر في أبسط صورة، خطوة بخطوة أو باستعمال ق.م.أ.'
        },
        explanation: {
            eu: 'Zatiki bat laburtezina da zenbakitzaileak eta izendatzaileak 1 baino ez dutenean zatitzaile komun. Pixkanaka sinplifika daiteke, zatitzaile komun txikiez zatituz (2, 3, 5…), edo urrats bakarrean, bi gaiak haien ZKHz zatituz. Zatikia negatiboa bada, zeinua aurrean edo zenbakitzailean idazten da.',
            es: 'Una fracción es irreducible cuando numerador y denominador solo tienen el 1 como divisor común. Se puede simplificar poco a poco, dividiendo entre divisores comunes pequeños (2, 3, 5…), o en un solo paso, dividiendo los dos términos entre su m.c.d. Si la fracción es negativa, el signo se escribe delante o en el numerador.',
            en: 'A fraction is in its simplest form when its numerator and denominator only have 1 as a common divisor. You can simplify step by step, dividing by small common divisors (2, 3, 5…), or in one step, dividing both terms by their GCD. If the fraction is negative, the sign is written in front or on the numerator.',
            ar: 'يكون الكسر غير قابل للاختزال عندما لا يكون للبسط والمقام قاسم مشترك سوى 1. ويمكن تبسيطه تدريجيًا بالقسمة على قواسم مشتركة صغيرة (2، 3، 5…) أو في خطوة واحدة بقسمة الحدّين على قاسمهما المشترك الأكبر. وإذا كان الكسر سالبًا تُكتب الإشارة أمامه أو في البسط.'
        },
        problem: { eu: 'Sinplifikatu $\\frac{-84}{126}$ zatiki laburtezina lortu arte.', es: 'Simplifica $\\frac{-84}{126}$ hasta obtener la fracción irreducible.', en: 'Simplify $\\frac{-84}{126}$ until you get the fraction in its simplest form.', ar: 'بسّط $\\frac{-84}{126}$ إلى أبسط صورة.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Kalkulatu zenbakitzailearen eta izendatzailearen ZKH (zeinurik gabe).', es: 'Calcula el m.c.d. del numerador y del denominador (sin el signo).', en: 'Calculate the GCD of the numerator and the denominator (without the sign).', ar: 'احسب ق.م.أ للبسط والمقام (من دون الإشارة).' },
                math: notation('$@GCD(84,126)=42$')
            },
            {
                text: { eu: 'Zatitu bi gaiak ZKHz.', es: 'Divide los dos términos entre el m.c.d.', en: 'Divide both terms by the GCD.', ar: 'اقسم الحدّين على ق.م.أ.' },
                math: '$\\frac{-84}{126}=\\frac{-84\\div 42}{126\\div 42}=\\frac{-2}{3}$'
            },
            {
                text: { eu: 'Egiaztatu: 2k eta 3k 1 baino ez dute zatitzaile komun. Zatiki laburtezina da.', es: 'Comprueba: 2 y 3 solo tienen el 1 como divisor común. Es irreducible.', en: 'Check: 2 and 3 only have 1 as a common divisor. It is in its simplest form.', ar: 'تحقّق: لا قاسم مشتركًا لـ 2 و3 سوى 1. فالكسر غير قابل للاختزال.' },
                math: '$-\\frac{2}{3}$'
            }
        ],
        example: '$\\frac{84}{126}=\\frac{42}{63}=\\frac{14}{21}=\\frac{2}{3}$',
        takeaway: {
            eu: 'Sinplifikatu azken emaitza beti. ZKHrekin urrats bakarrean iristen zara.',
            es: 'Simplifica siempre el resultado final. Con el m.c.d. llegas en un solo paso.',
            en: 'Always simplify the final result. With the GCD you get there in one step.',
            ar: 'بسّط النتيجة النهائية دائمًا. وبالقاسم المشترك الأكبر تصل في خطوة واحدة.'
        }
    },
    {
        id: 'ordering',
        stage: 'ordering',
        title: { eu: 'Konparazioa eta ordena', es: 'Comparación y orden', en: 'Comparison and order', ar: 'المقارنة والترتيب' },
        goal: {
            eu: 'Zatiki positiboak eta negatiboak estrategia egokiaz alderatzea eta ordenatzea.',
            es: 'Comparar y ordenar fracciones positivas y negativas eligiendo una estrategia adecuada.',
            en: 'Compare and order positive and negative fractions by choosing a suitable strategy.',
            ar: 'مقارنة الكسور الموجبة والسالبة وترتيبها باختيار استراتيجية مناسبة.'
        },
        explanation: {
            eu: 'Begiratu lehenik zeinuari: zatiki negatibo oro edozein positibo baino txikiagoa da. Izendatzaile bera badute, zenbakitzaile handiena duena da handiena. Izendatzaileak desberdinak badira, bihurtu izendatzaile komunera edo alderatu biderkadura gurutzatuak. Negatiboen artean, zerotik hurbilen dagoena da handiena.',
            es: 'Mira primero el signo: toda fracción negativa es menor que cualquier positiva. Si tienen el mismo denominador, es mayor la de mayor numerador. Si los denominadores son distintos, pásalas a denominador común o compara los productos cruzados. Entre negativas, es mayor la que está más cerca de 0.',
            en: 'First look at the sign: every negative fraction is smaller than any positive one. If they have the same denominator, the one with the bigger numerator is greater. If the denominators are different, change them to a common denominator or compare the cross products. Between negative fractions, the one closer to 0 is greater.',
            ar: 'انظر أولًا إلى الإشارة: كل كسر سالب أصغر من أي كسر موجب. وإذا تساوت المقامات فالأكبر هو صاحب البسط الأكبر. وإذا اختلفت فحوّلها إلى مقام مشترك أو قارن حاصلَي الضرب التبادلي. وبين الكسور السالبة يكون الأكبر هو الأقرب إلى 0.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Izendatzaile bera', es: 'Mismo denominador', en: 'Same denominator', ar: 'المقام نفسه' },
                text: { eu: 'Zati mota bera: zenbat eta gehiago hartu, handiagoa.', es: 'Mismo tipo de trozo: cuantos más tomes, mayor.', en: 'Same type of piece: the more you take, the bigger the fraction.', ar: 'الأجزاء من النوع نفسه: كلما أخذت أكثر كان الكسر أكبر.' },
                math: '$\\frac{3}{7}<\\frac{5}{7}$'
            },
            {
                title: { eu: 'Zenbakitzaile bera', es: 'Mismo numerador', en: 'Same numerator', ar: 'البسط نفسه' },
                text: { eu: 'Izendatzailea zenbat eta txikiagoa, orduan eta handiagoak zatiak.', es: 'Cuanto menor es el denominador, más grandes son los trozos.', en: 'The smaller the denominator, the bigger the pieces.', ar: 'كلما صغر المقام كبرت الأجزاء.' },
                math: '$\\frac{2}{3}>\\frac{2}{5}$'
            },
            {
                title: { eu: 'Izendatzaile komuna', es: 'Denominador común', en: 'Common denominator', ar: 'مقام مشترك' },
                text: { eu: 'Bihurtu biak izendatzaile berera eta alderatu zenbakitzaileak.', es: 'Pasa las dos al mismo denominador y compara los numeradores.', en: 'Change both to the same denominator and compare the numerators.', ar: 'حوّل الكسرين إلى المقام نفسه وقارن البسطين.' },
                math: '$\\frac{5}{6}=\\frac{15}{18}>\\frac{14}{18}=\\frac{7}{9}$'
            },
            {
                title: { eu: 'Negatiboak', es: 'Negativas', en: 'Negative', ar: 'الكسور السالبة' },
                text: { eu: '$\\frac{2}{3}<\\frac{3}{4}$ denez, $-\\frac{2}{3}$ zerotik hurbilago dago eta handiagoa da.', es: 'Como $\\frac{2}{3}<\\frac{3}{4}$, $-\\frac{2}{3}$ está más cerca de 0 y es mayor.', en: 'As $\\frac{2}{3}<\\frac{3}{4}$, $-\\frac{2}{3}$ is closer to 0 and is bigger.', ar: 'بما أن $\\frac{2}{3}<\\frac{3}{4}$ فإن $-\\frac{2}{3}$ أقرب إلى 0 وهو الأكبر.' },
                math: '$-\\frac{3}{4}<-\\frac{2}{3}$'
            },
            {
                title: { eu: 'Beti dago beste bat tartean', es: 'Siempre hay otra en medio', en: 'There is always another one in between', ar: 'يوجد دائمًا كسر بينهما' },
                text: {
                    eu: 'Bi zatiki desberdinen artean beti dago beste bat. Eraman izendatzaile komunera; tartean hutsunerik ez badago, bikoiztu bien gaiak.',
                    es: 'Entre dos fracciones distintas siempre hay otra. Pásalas a denominador común; si no queda hueco en medio, multiplica por 2 los términos de las dos.',
                    en: 'Between two different fractions there is always another one. Change them to a common denominator; if there is no gap in between, multiply both terms of both fractions by 2.',
                    ar: 'بين كسرين مختلفين يوجد دائمًا كسر آخر. حوّلهما إلى مقام مشترك، وإن لم يبقَ فراغ بينهما فاضرب حدّي كل منهما في 2.'
                },
                math: '$\\frac{1}{3}=\\frac{4}{12}<\\frac{5}{12}<\\frac{6}{12}=\\frac{1}{2}$'
            }
        ],
        example: '$-\\frac{3}{4}<-\\frac{2}{3}<\\frac{1}{4}<\\frac{5}{6}$',
        takeaway: {
            eu: 'Metodoa baino garrantzitsuagoa da konparazioa arrazoitzea.',
            es: 'Más importante que el método es poder justificar la comparación.',
            en: 'More important than the method is being able to justify the comparison.',
            ar: 'الأهم من الطريقة هو القدرة على تبرير المقارنة.'
        }
    },
    {
        id: 'add-subtract',
        stage: 'operations',
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' },
        goal: {
            eu: 'Izendatzaile komun egokia aukeratu eta zeinuekin zuzen jardutea.',
            es: 'Elegir un denominador común adecuado y operar correctamente con signos.',
            en: 'Choose a suitable common denominator and work correctly with signs.',
            ar: 'اختيار مقام مشترك مناسب وإجراء العمليات بالإشارات الصحيحة.'
        },
        explanation: {
            eu: 'Zati mota bereko zatiak baino ezin dira batu: laurdenak laurdenekin, seirenak seirenekin. Izendatzaile bera badute, zenbakitzaileak batu edo kentzen dira eta izendatzailea mantentzen da. Desberdinak badira, lehenik zatiki baliokideak sortzen dira izendatzaile komun batekin; txikiena izendatzaileen MKT da.',
            es: 'Solo se pueden sumar trozos del mismo tipo: cuartos con cuartos, sextos con sextos. Si tienen el mismo denominador, se suman o restan los numeradores y se mantiene el denominador. Si son distintos, primero se buscan fracciones equivalentes con un denominador común; el más pequeño es el m.c.m. de los denominadores.',
            en: 'You can only add pieces of the same kind: quarters with quarters, sixths with sixths. If they have the same denominator, you add or subtract the numerators and keep the denominator. If they are different, first find equivalent fractions with a common denominator; the smallest one is the LCM of the denominators.',
            ar: 'لا نجمع إلا أجزاء من النوع نفسه: أرباعًا مع أرباع وأسداسًا مع أسداس. فإذا تساوت المقامات نجمع البسوط أو نطرحها ونُبقي المقام. وإذا اختلفت نكوّن أولًا كسورًا مكافئة بمقام مشترك، وأصغره هو المضاعف المشترك الأصغر للمقامات.'
        },
        problem: { eu: 'Kalkulatu $\\frac{5}{6}-\\frac{1}{4}$.', es: 'Calcula $\\frac{5}{6}-\\frac{1}{4}$.', en: 'Calculate $\\frac{5}{6}-\\frac{1}{4}$.', ar: 'احسب $\\frac{5}{6}-\\frac{1}{4}$.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Kalkulatu izendatzaileen MKT: hori izango da izendatzaile komuna.', es: 'Calcula el m.c.m. de los denominadores: será el denominador común.', en: 'Calculate the LCM of the denominators: it will be the common denominator.', ar: 'احسب م.م.أ للمقامات: سيكون هو المقام المشترك.' },
                math: notation('$@LCM(6,4)=12$')
            },
            {
                text: { eu: 'Bihurtu zatiki bakoitza izendatzaile hori duen baliokide batean.', es: 'Convierte cada fracción en una equivalente con ese denominador.', en: 'Convert each fraction into an equivalent one with that denominator.', ar: 'حوّل كل كسر إلى كسر مكافئ بهذا المقام.' },
                math: '$\\frac{5}{6}=\\frac{10}{12}\\qquad\\frac{1}{4}=\\frac{3}{12}$'
            },
            {
                text: { eu: 'Batu edo kendu zenbakitzaileak; izendatzailea ez da aldatzen.', es: 'Suma o resta los numeradores; el denominador no cambia.', en: 'Add or subtract the numerators; the denominator does not change.', ar: 'اجمع البسوط أو اطرحها، والمقام لا يتغير.' },
                math: '$\\frac{10}{12}-\\frac{3}{12}=\\frac{10-3}{12}=\\frac{7}{12}$'
            },
            {
                text: { eu: 'Sinplifikatu, ahal bada. 7k eta 12k ez dute zatitzaile komunik: zatiki laburtezina da.', es: 'Simplifica, si se puede. 7 y 12 no tienen divisores comunes: ya es irreducible.', en: 'Simplify, if you can. 7 and 12 have no common divisors: it is already in its simplest form.', ar: 'بسّط إن أمكن. لا قاسم مشتركًا لـ 7 و12، فالكسر في أبسط صورة.' },
                math: '$\\frac{7}{12}$'
            }
        ],
        example: '$\\frac{5}{6}-\\frac{1}{4}=\\frac{10}{12}-\\frac{3}{12}=\\frac{7}{12}$',
        takeaway: {
            eu: 'Izendatzaile komuna lehenik; sinplifikazioa azkenik. Izendatzaileak ez dira batzen.',
            es: 'Denominador común primero; simplificación al final. Los denominadores no se suman.',
            en: 'Common denominator first; simplify at the end. The denominators are not added.',
            ar: 'المقام المشترك أولًا، والتبسيط أخيرًا. لا نجمع المقامات.'
        }
    },
    {
        id: 'multiply-divide',
        stage: 'operations',
        title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' },
        goal: {
            eu: 'Zatikiak biderkatzea eta zatitzea, aurretik sinplifikatuz eta alderantzizkoa erabiliz.',
            es: 'Multiplicar y dividir fracciones, simplificando antes y usando la inversa.',
            en: 'Multiply and divide fractions, simplifying first and using the reciprocal.',
            ar: 'ضرب الكسور وقسمتها مع الاختصار المسبق واستعمال المقلوب.'
        },
        explanation: {
            eu: 'Biderketan ez da izendatzaile komunik behar: zenbakitzailea zenbakitzailearekin eta izendatzailea izendatzailearekin biderkatzen dira. Zatiki baten alderantzizkoa gaiak trukatuta lortzen da, eta biak biderkatuta 1 ematen dute. Zatiki batez zatitzea haren alderantzizkoaz biderkatzea da. Zeinuen erregela zenbaki osoena bera da.',
            es: 'Para multiplicar no hace falta denominador común: se multiplica numerador por numerador y denominador por denominador. La inversa de una fracción se obtiene intercambiando sus términos, y el producto de las dos es 1. Dividir entre una fracción es multiplicar por su inversa. La regla de los signos es la misma que con los enteros.',
            en: 'To multiply, you do not need a common denominator: multiply numerator by numerator and denominator by denominator. The reciprocal of a fraction is obtained by swapping its terms, and the product of the two is 1. Dividing by a fraction is multiplying by its reciprocal. The rule of signs is the same as for integers.',
            ar: 'لا نحتاج في الضرب إلى مقام مشترك: نضرب البسط في البسط والمقام في المقام. ونحصل على مقلوب الكسر بتبديل حدّيه، وحاصل ضربهما 1. والقسمة على كسر هي الضرب في مقلوبه. وقاعدة الإشارات هي نفسها في الأعداد الصحيحة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Biderkatu', es: 'Multiplicar', en: 'Multiply', ar: 'الضرب' },
                text: { eu: 'Goikoak elkarren artean, behekoak elkarren artean.', es: 'Los de arriba entre sí y los de abajo entre sí.', en: 'Multiply the tops together and the bottoms together.', ar: 'البسط في البسط، والمقام في المقام.' },
                math: '$\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{2\\cdot 3}{3\\cdot 4}=\\frac{6}{12}=\\frac{1}{2}$'
            },
            {
                title: { eu: 'Sinplifikatu aurretik', es: 'Simplifica antes', en: 'Simplify first', ar: 'اختصر قبل الضرب' },
                text: { eu: 'Zenbakitzaile batek eta izendatzaile batek zatitzaile komuna badute, zatitu biderkatu aurretik: zenbakiak txikiak geratzen dira.', es: 'Si un numerador y un denominador tienen un divisor común, divide antes de multiplicar: los números se quedan pequeños.', en: 'If a numerator and a denominator have a common divisor, divide before multiplying: the numbers stay small.', ar: 'إذا كان لبسطٍ ومقامٍ قاسم مشترك فاقسمهما قبل الضرب لتبقى الأعداد صغيرة.' },
                math: '$\\frac{4}{9}\\cdot\\frac{15}{8}=\\frac{1\\cdot 5}{3\\cdot 2}=\\frac{5}{6}$'
            },
            {
                title: { eu: 'Alderantzizkoa', es: 'La inversa', en: 'The reciprocal', ar: 'المقلوب' },
                text: { eu: '$\\frac{a}{b}$-ren alderantzizkoa $\\frac{b}{a}$ da. 0k ez du alderantzizkorik.', es: 'La inversa de $\\frac{a}{b}$ es $\\frac{b}{a}$. El 0 no tiene inversa.', en: 'The reciprocal of $\\frac{a}{b}$ is $\\frac{b}{a}$. Zero has no reciprocal.', ar: 'مقلوب $\\frac{a}{b}$ هو $\\frac{b}{a}$. والصفر ليس له مقلوب.' },
                math: '$\\frac{8}{15}\\cdot\\frac{15}{8}=1$'
            },
            {
                title: { eu: 'Zatitu', es: 'Dividir', en: 'Divide', ar: 'القسمة' },
                text: { eu: 'Zenbat zortziren sartzen dira $\\frac{3}{4}$-n? Sei. Zatitzea alderantzizkoaz biderkatzea da.', es: '¿Cuántos octavos caben en $\\frac{3}{4}$? Seis. Dividir es multiplicar por la inversa.', en: 'How many eighths fit into $\\frac{3}{4}$? Six. Dividing is multiplying by the reciprocal.', ar: 'كم ثُمنًا في $\\frac{3}{4}$؟ ستة. فالقسمة ضرب في المقلوب.' },
                math: '$\\frac{3}{4}\\div\\frac{1}{8}=\\frac{3}{4}\\cdot\\frac{8}{1}=6$'
            }
        ],
        example: '$-\\frac{4}{9}\\div\\frac{8}{15}=-\\frac{4}{9}\\cdot\\frac{15}{8}=-\\frac{5}{6}$',
        takeaway: { eu: 'Zatitzeko: alderantzikatu bigarrena eta biderkatu.', es: 'Para dividir: invierte la segunda y multiplica.', en: 'To divide: flip the second fraction and multiply.', ar: 'للقسمة: اقلب الكسر الثاني ثم اضرب.' }
    },
    {
        id: 'combined',
        stage: 'operations',
        title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', en: 'Combined operations', ar: 'العمليات المركبة' },
        goal: { eu: 'Eragiketen hierarkia errespetatuz kalkulatzea.', es: 'Calcular respetando la jerarquía de operaciones.', en: 'Calculate following the order of operations.', ar: 'الحساب مع احترام ترتيب العمليات.' },
        explanation: {
            eu: 'Zatikiekin, zenbaki osoekin bezala, eragiketek ordena jakin bat dute. Ordena hori ez errespetatzea da akatsik ohikoena: $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ adierazpenean, lehenik biderketa egin behar da, ez batuketa. Maila bereko eragiketak ezkerretik eskuinera egiten dira. Idatzi urrats bakoitza lerro batean.',
            es: 'Con fracciones, igual que con enteros, las operaciones tienen un orden. No respetarlo es el error más frecuente: en $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ hay que hacer primero el producto, no la suma. Las operaciones del mismo nivel se hacen de izquierda a derecha. Escribe cada paso en una línea.',
            en: 'With fractions, as with integers, operations follow an order. Not following it is the most common mistake: in $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ you must do the multiplication first, not the addition. Operations of the same level are done from left to right. Write each step on its own line.',
            ar: 'للعمليات على الكسور ترتيب كما في الأعداد الصحيحة، وعدم احترامه هو الخطأ الأكثر شيوعًا: في $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ نبدأ بالضرب لا بالجمع. وتُنجز العمليات من المستوى نفسه من اليسار إلى اليمين. اكتب كل خطوة في سطر.'
        },
        problem: { eu: 'Kalkulatu $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.', es: 'Calcula $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.', en: 'Calculate $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.', ar: 'احسب $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            {
                title: { eu: 'Parentesiak', es: 'Paréntesis', en: 'Brackets', ar: 'الأقواس' },
                text: { eu: 'Lehenik, parentesien barrukoa.', es: 'Primero, lo que hay dentro de los paréntesis.', en: 'First, what is inside the parentheses.', ar: 'أولًا ما بداخل الأقواس.' },
                math: '$\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$'
            },
            {
                title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' },
                text: { eu: 'Gero, berreturak.', es: 'Después, las potencias.', en: 'Then, the powers.', ar: 'ثم القوى.' },
                math: '$\\left(\\frac{1}{2}\\right)^{2}=\\frac{1}{4}$'
            },
            {
                title: { eu: 'Biderketak eta zatiketak', es: 'Multiplicaciones y divisiones', en: 'Multiplication and division', ar: 'الضرب والقسمة' },
                text: { eu: 'Ezkerretik eskuinera.', es: 'De izquierda a derecha.', en: 'From left to right.', ar: 'من اليسار إلى اليمين.' },
                math: '$\\frac{1}{6}\\cdot 3=\\frac{1}{2}$'
            },
            {
                title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' },
                text: { eu: 'Azkenik, ezkerretik eskuinera.', es: 'Por último, de izquierda a derecha.', en: 'Last, from left to right.', ar: 'وأخيرًا من اليسار إلى اليمين.' },
                math: '$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$'
            }
        ],
        example: '$\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}=\\frac{1}{6}\\cdot 3+\\frac{1}{4}=\\frac{3}{4}$',
        takeaway: { eu: 'Ez egin dena batera: idatzi tarteko urratsak.', es: 'No lo hagas todo de una vez: escribe los pasos intermedios.', en: 'Do not do it all at once: write the intermediate steps.', ar: 'لا تنجز كل شيء دفعة واحدة؛ اكتب الخطوات الوسيطة.' }
    },
    {
        id: 'powers',
        stage: 'operations',
        title: { eu: 'Zatikien berreturak', es: 'Potencias de fracciones', en: 'Powers of fractions', ar: 'قوى الكسور' },
        goal: { eu: 'Zatiki bat berretzea, oinarriaren zeinua eta berretzailearen paritatea kontrolatuz.', es: 'Elevar una fracción a una potencia controlando el signo de la base y la paridad del exponente.', en: 'Raise a fraction to a power, checking the sign of the base and whether the exponent is even or odd.', ar: 'رفع كسر إلى قوة مع ضبط إشارة الأساس وزوجية الأس.' },
        explanation: {
            eu: 'Zatiki baten berretura zatikia bere buruarekin behin baino gehiagotan biderkatzea da; horregatik, zenbakitzailea eta izendatzailea berretzen dira. Oinarria negatiboa bada, berretzaile bikoitiak emaitza positiboa ematen du eta bakoitiak negatiboa. Parentesiek adierazten dute zeinua berreturaren barruan dagoen ala ez.',
            es: 'Una potencia de una fracción es multiplicar la fracción por sí misma varias veces; por eso se elevan el numerador y el denominador. Si la base es negativa, un exponente par da resultado positivo y uno impar, negativo. Los paréntesis indican si el signo forma parte de la base.',
            en: 'A power of a fraction means multiplying the fraction by itself several times; that is why the numerator and the denominator are both raised to the power. If the base is negative, an even exponent gives a positive result and an odd one gives a negative result. The brackets show whether the sign is part of the base.',
            ar: 'قوة الكسر هي ضربه في نفسه عدة مرات، ولذلك نرفع البسط والمقام إلى القوة. وإذا كان الأساس سالبًا كانت النتيجة موجبة للأس الزوجي وسالبة للأس الفردي. وتبيّن الأقواس هل الإشارة جزء من الأساس.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Gaiak berretu', es: 'Se elevan los dos términos', en: 'Both terms are raised to the power', ar: 'نرفع الحدّين' },
                text: { eu: 'Hiru aldiz biderkatu, beraz goian $2^{3}$ eta behean $3^{3}$.', es: 'Se multiplica tres veces, así que arriba queda $2^{3}$ y abajo $3^{3}$.', en: 'It is multiplied three times, so the top becomes $2^{3}$ and the bottom $3^{3}$.', ar: 'نضرب ثلاث مرات، فيصبح في الأعلى $2^{3}$ وفي الأسفل $3^{3}$.' },
                math: '$\\left(\\frac{2}{3}\\right)^{3}=\\frac{2}{3}\\cdot\\frac{2}{3}\\cdot\\frac{2}{3}=\\frac{8}{27}$'
            },
            {
                title: { eu: 'Berretzaile bikoitia', es: 'Exponente par', en: 'Even exponent', ar: 'أس زوجي' },
                text: { eu: 'Bi negatibo biderkatuta, positiboa.', es: 'Dos negativos multiplicados dan positivo.', en: 'Two negatives multiplied give a positive.', ar: 'حاصل ضرب سالبين موجب.' },
                math: '$\\left(-\\frac{3}{5}\\right)^{2}=\\frac{9}{25}$'
            },
            {
                title: { eu: 'Berretzaile bakoitia', es: 'Exponente impar', en: 'Odd exponent', ar: 'أس فردي' },
                text: { eu: 'Zeinua negatiboa geratzen da.', es: 'El signo queda negativo.', en: 'The sign stays negative.', ar: 'تبقى الإشارة سالبة.' },
                math: '$\\left(-\\frac{1}{2}\\right)^{3}=-\\frac{1}{8}$'
            },
            {
                title: { eu: 'Parentesirik gabe', es: 'Sin paréntesis', en: 'Without brackets', ar: 'من دون أقواس' },
                text: { eu: 'Zeinua ez da berretzen: aurrean geratzen da.', es: 'El signo no se eleva: se queda delante.', en: 'The sign is not raised: it stays in front.', ar: 'الإشارة لا تُرفع إلى القوة بل تبقى في الأمام.' },
                math: '$-\\left(\\frac{3}{5}\\right)^{2}=-\\frac{9}{25}$'
            }
        ],
        example: '$\\left(-\\frac{3}{5}\\right)^{2}=\\frac{9}{25}\\qquad -\\left(\\frac{3}{5}\\right)^{2}=-\\frac{9}{25}$',
        takeaway: {
            eu: 'Zatiki propio bat berretzean, txikiagoa egiten da: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            es: 'Al elevar una fracción propia, se hace más pequeña: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            en: 'When you raise a proper fraction to a power, it gets smaller: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            ar: 'عند رفع كسر حقيقي إلى قوة يصغر: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.'
        }
    },
    {
        id: 'fraction-of',
        stage: 'proportionality',
        title: { eu: 'Kantitate baten zatikia', es: 'Fracción de una cantidad', en: 'Fraction of a quantity', ar: 'كسر من كمية' },
        goal: { eu: 'Zati bat, guztizkoa edo falta den kantitatea aurkitzea.', es: 'Encontrar una parte, el total o la cantidad que falta.', en: 'Find a part, the total or the amount that is missing.', ar: 'إيجاد الجزء أو الكل أو الكمية الناقصة.' },
        explanation: {
            eu: 'Kantitate baten zatikia kalkulatzeko, kantitatea izendatzaileaz zatitzen da (zati bakoitzaren balioa) eta emaitza zenbakitzaileaz biderkatzen da. Hori zatikiaz biderkatzearen berdina da. Alderantzizko galderan zatia ezaguna da eta guztizkoa bilatzen da: zati baten balioa aurkitu eta izendatzaileaz biderkatzen da.',
            es: 'Para calcular una fracción de una cantidad, se divide la cantidad entre el denominador (el valor de cada parte) y el resultado se multiplica por el numerador. Es lo mismo que multiplicar por la fracción. En la pregunta inversa se conoce la parte y se busca el total: se halla el valor de una parte y se multiplica por el denominador.',
            en: 'To work out a fraction of a quantity, divide the quantity by the denominator (the value of each part) and multiply the result by the numerator. It is the same as multiplying by the fraction. In the reverse question, you know the part and look for the total: find the value of one part and multiply it by the denominator.',
            ar: 'لحساب كسر من كمية نقسم الكمية على المقام (قيمة كل جزء) ثم نضرب الناتج في البسط، وهذا هو نفسه الضرب في الكسر. وفي السؤال المعاكس نعرف الجزء ونبحث عن الكل: نجد قيمة جزء واحد ثم نضربها في المقام.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatia', es: 'La parte', en: 'The part', ar: 'الجزء' },
                text: { eu: '120ren $\\frac{3}{8}$: zortziren bat 15 da, eta hiru, 45.', es: '$\\frac{3}{8}$ de 120: un octavo es 15 y tres octavos, 45.', en: '$\\frac{3}{8}$ of 120: one eighth is 15 and three eighths are 45.', ar: '$\\frac{3}{8}$ من 120: الثُّمن 15، وثلاثة أثمان 45.' },
                math: { eu: '$\\frac{3}{8}\\cdot 120=\\frac{3\\cdot 120}{8}=45$', es: '$\\frac{3}{8}\\text{ de }120=\\frac{3\\cdot 120}{8}=45$', en: '$\\frac{3}{8}\\text{ of }120=\\frac{3\\cdot 120}{8}=45$', ar: '$\\frac{3}{8}\\cdot 120=\\frac{3\\cdot 120}{8}=45$' }
            },
            {
                title: { eu: 'Guztizkoa', es: 'El total', en: 'The total', ar: 'الكل' },
                text: { eu: '$\\frac{3}{8}$ 45 badira, zortziren bat $45\\div 3=15$ da, eta osoa $8\\cdot 15=120$.', es: 'Si $\\frac{3}{8}$ son 45, un octavo es $45\\div 3=15$ y el total, $8\\cdot 15=120$.', en: 'If $\\frac{3}{8}$ is 45, one eighth is $45\\div 3=15$ and the total is $8\\cdot 15=120$.', ar: 'إذا كان $\\frac{3}{8}$ يساوي 45 فالثُّمن $45\\div 3=15$ والكل $8\\cdot 15=120$.' },
                math: '$45\\div\\frac{3}{8}=120$'
            },
            {
                title: { eu: 'Falta dena', es: 'Lo que queda', en: 'What is left', ar: 'المتبقي' },
                text: { eu: '$\\frac{3}{8}$ gastatu bada, $\\frac{5}{8}$ geratzen da.', es: 'Si se ha gastado $\\frac{3}{8}$, queda $\\frac{5}{8}$.', en: 'If $\\frac{3}{8}$ has been spent, $\\frac{5}{8}$ is left.', ar: 'إذا صُرف $\\frac{3}{8}$ يبقى $\\frac{5}{8}$.' },
                math: '$1-\\frac{3}{8}=\\frac{5}{8}\\qquad\\frac{5}{8}\\cdot 120=75$'
            },
            {
                title: { eu: 'Zatiki baten zatikia', es: 'Fracción de una fracción', en: 'Fraction of a fraction', ar: 'كسر من كسر' },
                text: { eu: '$\\frac{3}{4}$-ren erdia: zatikiak biderkatzen dira.', es: 'La mitad de $\\frac{3}{4}$: se multiplican las fracciones.', en: 'Half of $\\frac{3}{4}$: multiply the fractions.', ar: 'نصف $\\frac{3}{4}$: نضرب الكسرين.' },
                math: '$\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}$'
            }
        ],
        example: { eu: '$\\frac{3}{8}\\cdot 120=45\\qquad 45\\div\\frac{3}{8}=120$', es: '$\\frac{3}{8}\\text{ de }120=45\\qquad 45\\div\\frac{3}{8}=120$', en: '$\\frac{3}{8}\\text{ of }120=45\\qquad 45\\div\\frac{3}{8}=120$', ar: '$\\frac{3}{8}\\cdot 120=45\\qquad 45\\div\\frac{3}{8}=120$' },
        takeaway: { eu: 'Identifikatu galderak zatia ala guztizkoa eskatzen duen.', es: 'Identifica si la pregunta pide la parte o el total.', en: 'Identify whether the question asks for the part or the total.', ar: 'حدّد هل المطلوب هو الجزء أم الكل.' }
    },
    {
        id: 'percentages',
        stage: 'proportionality',
        title: { eu: 'Zatikiak, hamartarrak eta ehunekoak', es: 'Fracciones, decimales y porcentajes', en: 'Fractions, decimals and percentages', ar: 'الكسور والأعداد العشرية والنسب المئوية' },
        goal: { eu: 'Hiru adierazpenen artean zehaztasuna galdu gabe bihurtzea.', es: 'Convertir entre las tres representaciones sin perder exactitud.', en: 'Convert between the three forms without losing accuracy.', ar: 'التحويل بين التمثيلات الثلاثة من دون فقدان الدقة.' },
        explanation: {
            eu: 'Zatiki bat, hamartar bat eta ehuneko bat balio bera idazteko hiru modu izan daitezke. Ehunekoa 100 izendatzailea duen zatikia da: %35 ehuneko 35 da. Zatikia hamartar bihurtzeko, zenbakitzailea izendatzaileaz zatitzen da; hamartarra ehuneko bihurtzeko, 100ez biderkatzen da. Zatiketa amaitzen ez bada, hamartar periodikoa da, eta biribiltzean hurbilketa bat idazten da, ez balio zehatza.',
            es: 'Una fracción, un decimal y un porcentaje pueden ser tres formas de escribir el mismo valor. Un porcentaje es una fracción de denominador 100: 35 % son 35 de cada 100. Para pasar una fracción a decimal, se divide el numerador entre el denominador; para pasar un decimal a porcentaje, se multiplica por 100. Si la división no termina, el decimal es periódico, y al redondear se escribe una aproximación, no el valor exacto.',
            en: 'A fraction, a decimal and a percentage can be three ways of writing the same value. A percentage is a fraction with denominator 100: 35% means 35 out of every 100. To change a fraction into a decimal, divide the numerator by the denominator; to change a decimal into a percentage, multiply by 100. If the division does not end, the decimal is recurring, and when you round it you write an approximation, not the exact value.',
            ar: 'يمكن أن يكون الكسر والعدد العشري والنسبة المئوية ثلاث طرق لكتابة القيمة نفسها. النسبة المئوية كسر مقامه 100: ‏35٪ تعني 35 من كل 100. ولتحويل كسر إلى عدد عشري نقسم البسط على المقام، ولتحويل العدد العشري إلى نسبة مئوية نضربه في 100. وإذا لم تنتهِ القسمة فالعدد العشري دوري، وعند التقريب نكتب قيمة تقريبية لا القيمة الدقيقة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatikia → hamartarra', es: 'Fracción → decimal', en: 'Fraction → decimal', ar: 'كسر ← عدد عشري' },
                text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', en: 'Divide the numerator by the denominator.', ar: 'اقسم البسط على المقام.' },
                math: dec('$\\frac{3}{8}=3\\div 8=0{,}375$')
            },
            {
                title: { eu: 'Hamartarra → ehunekoa', es: 'Decimal → porcentaje', en: 'Decimal → percentage', ar: 'عدد عشري ← نسبة مئوية' },
                text: { eu: 'Biderkatu 100ez.', es: 'Multiplica por 100.', en: 'Multiply by 100.', ar: 'اضرب في 100.' },
                math: { eu: '$0{,}375\\cdot 100=\\%\\,37{,}5$', es: '$0{,}375\\cdot 100=37{,}5\\,\\%$', en: '$0{,}375\\cdot 100=37{,}5\\,\\%$', ar: '$0.375\\cdot 100=37.5\\,\\%$' }
            },
            {
                title: { eu: 'Ehunekoa → zatikia', es: 'Porcentaje → fracción', en: 'Percentage → fraction', ar: 'نسبة مئوية ← كسر' },
                text: { eu: 'Idatzi 100 izendatzailearekin eta sinplifikatu.', es: 'Escríbelo sobre 100 y simplifica.', en: 'Write it over 100 and simplify.', ar: 'اكتبها على 100 ثم بسّط.' },
                math: { eu: '$\\%\\,35=\\frac{35}{100}=\\frac{7}{20}$', es: '$35\\,\\%=\\frac{35}{100}=\\frac{7}{20}$', en: '$35\\,\\%=\\frac{35}{100}=\\frac{7}{20}$', ar: '$35\\,\\%=\\frac{35}{100}=\\frac{7}{20}$' }
            },
            {
                title: { eu: 'Periodikoak', es: 'Periódicos', en: 'Recurring', ar: 'الأعداد الدورية' },
                text: { eu: '$\\frac{1}{3}$ ez da 0,33: 3 zifra amaigabe errepikatzen da. 0,33 hurbilketa da.', es: '$\\frac{1}{3}$ no es 0,33: la cifra 3 se repite sin fin. 0,33 es una aproximación.', en: '$\\frac{1}{3}$ is not 0.33: the digit 3 repeats forever. 0.33 is an approximation.', ar: '$\\frac{1}{3}$ ليس 0.33: يتكرر الرقم 3 بلا نهاية، و0.33 قيمة تقريبية.' },
                math: dec('$\\frac{1}{3}=0{,}\\overline{3}\\approx 0{,}33$')
            },
            {
                title: { eu: 'Zehatza, hutsa ala mistoa', es: 'Exacto, puro o mixto', en: 'Exact, pure or mixed', ar: 'منتهٍ أم دوري بحت أم مختلط' },
                text: {
                    eu: 'Sinplifikatu eta deskonposatu izendatzailea. 2 eta 5 bakarrik: zehatza. Ez 2 ez 5: periodiko hutsa (periodoa komaren ondoren hasten da). 2 edo 5 eta beste faktore bat: periodiko mistoa (lehenik aurreperiodoa).',
                    es: 'Simplifica y descompón el denominador. Solo 2 y 5: exacto. Ni 2 ni 5: periódico puro (el periodo empieza justo después de la coma). 2 o 5 y otro factor: periódico mixto (primero va el anteperiodo).',
                    en: 'Simplify and do the prime factorisation of the denominator. Only 2s and 5s: exact. Neither 2 nor 5: pure recurring (the repeating part starts right after the decimal point). 2 or 5 and another factor: mixed recurring (the non-repeating part comes first).',
                    ar: 'اختزل الكسر وحلّل المقام. 2 و5 فقط: منتهٍ. لا 2 ولا 5: دوري بحت (يبدأ الدور بعد الفاصلة مباشرة). 2 أو 5 مع عامل آخر: دوري مختلط (يأتي ما قبل الدور أولًا).'
                },
                math: dec('$\\frac{3}{8}=0{,}375\\quad \\frac{2}{3}=0{,}\\overline{6}\\quad \\frac{5}{6}=0{,}8\\overline{3}$')
            }
        ],
        example: { eu: '$\\frac{3}{8}=0{,}375=\\%\\,37{,}5$', es: '$\\frac{3}{8}=0{,}375=37{,}5\\,\\%$', en: '$\\frac{3}{8}=0{,}375=37{,}5\\,\\%$', ar: '$\\frac{3}{8}=0.375=37.5\\,\\%$' },
        takeaway: { eu: '“=” eta “≈” ez dira gauza bera.', es: '“=” y “≈” no significan lo mismo.', en: '“=” and “≈” do not mean the same thing.', ar: 'الرمزان “=” و“≈” لا يعنيان الشيء نفسه.' }
    },
    {
        id: 'proportionality',
        stage: 'proportionality',
        title: { eu: 'Ehunekoak eta proportzionaltasuna', es: 'Porcentajes y proporcionalidad', en: 'Percentages and proportionality', ar: 'النسب المئوية والتناسب' },
        goal: {
            eu: 'Proportzionaltasun zuzeneko buruketak unitateko balioaz eta proportzioz ebaztea.',
            es: 'Resolver problemas de proporcionalidad directa con el valor unitario y con proporciones.',
            en: 'Solve direct proportion problems using the unit value and using proportions.',
            ar: 'حلّ مسائل التناسب الطردي باستعمال قيمة الوحدة والتناسب.'
        },
        explanation: {
            eu: 'Bi magnitude zuzenki proportzionalak dira bat zenbaki batez biderkatzean bestea ere zenbaki berberaz biderkatzen bada: koaderno kopurua bikoizten bada, prezioa ere bai. Haien arteko zatidura konstantea da. Buruketak bi modutara ebatz daitezke: unitatera laburtuz (unitate baten balioa kalkulatuz) edo bi arrazoi berdinak diren proportzio bat planteatuz. Ehuneko bat aplikatzea proportzionaltasun kasu bat da.',
            es: 'Dos magnitudes son directamente proporcionales si al multiplicar una por un número, la otra queda multiplicada por el mismo número: si se duplica el número de cuadernos, se duplica el precio. Su cociente es constante. Los problemas se pueden resolver de dos formas: reduciendo a la unidad (calculando el valor de una unidad) o planteando una proporción, en la que dos razones son iguales. Aplicar un porcentaje es un caso de proporcionalidad.',
            en: 'Two quantities are in direct proportion if, when one is multiplied by a number, the other is multiplied by the same number: if the number of notebooks doubles, the price doubles. Their quotient is constant. You can solve these problems in two ways: by reducing to the unit (working out the value of one unit) or by setting up a proportion, in which two ratios are equal. Applying a percentage is a case of proportionality.',
            ar: 'تكون كميتان متناسبتين طرديًا إذا ضُربت إحداهما في عدد فتُضرب الأخرى في العدد نفسه: إذا تضاعف عدد الدفاتر تضاعف الثمن. وحاصل قسمتهما ثابت. ويمكن حل المسائل بطريقتين: بالرجوع إلى الوحدة (حساب قيمة وحدة واحدة) أو بكتابة تناسب تتساوى فيه نسبتان. وتطبيق نسبة مئوية حالة من حالات التناسب.'
        },
        problem: { eu: '3 koaderno 7,50 € badira, zenbat balio dute 5 koadernok?', es: 'Si 3 cuadernos cuestan 7,50 €, ¿cuánto cuestan 5 cuadernos?', en: 'If 3 notebooks cost €7.50, how much do 5 notebooks cost?', ar: 'إذا كان ثمن 3 دفاتر 7.50€، فما ثمن 5 دفاتر؟' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Egiaztatu proportzionaltasun zuzena dela: koaderno bikoitzak, prezio bikoitza.', es: 'Comprueba que es proporcionalidad directa: el doble de cuadernos cuesta el doble.', en: 'Check that it is direct proportion: twice as many notebooks cost twice as much.', ar: 'تحقّق أنه تناسب طردي: ضعف الدفاتر بضعف الثمن.' }
            },
            {
                text: { eu: 'Kalkulatu unitate baten balioa: 3 koaderno 7,50 € badira, bat 2,50 €.', es: 'Calcula el valor de una unidad: si 3 cuadernos cuestan 7,50 €, uno cuesta 2,50 €.', en: 'Work out the value of one unit: if 3 notebooks cost €7.50, one costs €2.50.', ar: 'احسب قيمة الوحدة: إذا كان ثمن 3 دفاتر 7.50€ فثمن الواحد 2.50€.' },
                math: dec('$7{,}50\\div 3=2{,}50$')
            },
            {
                text: { eu: 'Biderkatu eskatutako kantitateaz.', es: 'Multiplica por la cantidad pedida.', en: 'Multiply by the quantity asked for.', ar: 'اضرب في الكمية المطلوبة.' },
                math: dec('$5\\cdot 2{,}50=12{,}50$')
            },
            {
                text: { eu: 'Edo planteatu proportzio bat eta ebatzi.', es: 'O plantea una proporción y resuélvela.', en: 'Or set up a proportion and solve it.', ar: 'أو اكتب تناسبًا وحلّه.' },
                math: dec('$\\frac{3}{7{,}50}=\\frac{5}{x}\\;\\rightarrow\\;x=\\frac{5\\cdot 7{,}50}{3}=12{,}50$')
            }
        ],
        example: { eu: '$80\\text{ren }\\%\\,35=\\frac{35}{100}\\cdot 80=28$', es: '$35\\,\\%\\text{ de }80=\\frac{35}{100}\\cdot 80=28$', en: '$35\\,\\%\\text{ of }80=\\frac{35}{100}\\cdot 80=28$', ar: '$\\frac{35}{100}\\cdot 80=28$' },
        takeaway: {
            eu: 'Testuinguruan, emaitzaren unitatea eta arrazoizkotasuna ere egiaztatu.',
            es: 'En contexto, comprueba también la unidad y si el resultado es razonable.',
            en: 'In context, also check the unit and whether the result is reasonable.',
            ar: 'في المسائل السياقية تحقّق أيضًا من الوحدة ومن معقولية النتيجة.'
        }
    }
]
