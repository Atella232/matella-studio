import type { LocalizedText, UnitTopic } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'
import type { FractionStageId, TheoryTopicId } from './content.ts'
import { fractionLessonTexts } from './lessonTexts.ts'

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

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<TheoryTopic, 'explanation' | 'example'>[] = [
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
        figureAfterSteps: true,
        title: { eu: 'Zatiki propioak, inpropioak eta mistoak', es: 'Fracciones propias, impropias y mixtas', en: 'Proper, improper and mixed fractions', ar: 'الكسور الحقيقية وغير الحقيقية والأعداد الكسرية' },
        goal: {
            eu: 'Zatiki inpropio bat zenbaki misto bihurtzea eta alderantziz, eta zenbaki-zuzenean kokatzea.',
            es: 'Pasar una fracción impropia a número mixto y al revés, y situarla en la recta.',
            en: 'Convert an improper fraction into a mixed number and back, and place it on the number line.',
            ar: 'تحويل الكسر غير الحقيقي إلى عدد كسري وبالعكس، ووضعه على خط الأعداد.'
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
                math: '$6\\cdot 12=8\\cdot 9=72\\ \\Rightarrow\\ \\frac{6}{8}=\\frac{9}{12}$'
            },
            {
                title: { eu: 'Kontuz: batzeak ez du balio', es: 'Cuidado: sumar no sirve', en: 'Careful: adding does not work', ar: 'انتبه: الجمع لا يصلح' },
                text: { eu: 'Bi gaiei zenbaki bera batuz gero, balioa aldatzen da.', es: 'Si sumas el mismo número a los dos términos, el valor cambia.', en: 'If you add the same number to both terms, the value changes.', ar: 'إذا أضفت العدد نفسه إلى الحدّين تتغير القيمة.' },
                math: '$\\frac{1+1}{2+1}=\\frac{2}{3}\\neq\\frac{1}{2}$'
            }
        ],
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
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'gcd', title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', en: 'Greatest common divisor (GCD)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' } }],
        figureAfterSteps: true,
        title: { eu: 'Sinplifikazioa eta zatiki laburtezina', es: 'Simplificación y fracción irreducible', en: 'Simplifying and the simplest form', ar: 'التبسيط والكسر غير القابل للاختزال' },
        goal: {
            eu: 'Zatiki bat bere forma laburrenean idaztea, urratsez urrats edo ZKHrekin.',
            es: 'Escribir una fracción en su forma más reducida, paso a paso o con el m.c.d.',
            en: 'Write a fraction in its simplest form, step by step or using the GCD.',
            ar: 'كتابة الكسر في أبسط صورة، خطوة بخطوة أو باستعمال ق.م.أ.'
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
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'compare', title: { eu: 'Zenbaki osoak alderatzea', es: 'Comparar números enteros', en: 'Compare integers', ar: 'مقارنة الأعداد الصحيحة' } }],
        title: { eu: 'Konparazioa eta ordena', es: 'Comparación y orden', en: 'Comparison and order', ar: 'المقارنة والترتيب' },
        goal: {
            eu: 'Zatiki positiboak eta negatiboak estrategia egokiaz alderatzea eta ordenatzea.',
            es: 'Comparar y ordenar fracciones positivas y negativas eligiendo una estrategia adecuada.',
            en: 'Compare and order positive and negative fractions by choosing a suitable strategy.',
            ar: 'مقارنة الكسور الموجبة والسالبة وترتيبها باختيار استراتيجية مناسبة.'
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
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' } }],
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' },
        goal: {
            eu: 'Izendatzaile komun egokia aukeratu eta zeinuekin zuzen jardutea.',
            es: 'Elegir un denominador común adecuado y operar correctamente con signos.',
            en: 'Choose a suitable common denominator and work correctly with signs.',
            ar: 'اختيار مقام مشترك مناسب وإجراء العمليات بالإشارات الصحيحة.'
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
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'multiply-divide', title: { eu: 'Biderketa eta zatiketa: zeinuen araua', es: 'Producto y cociente: regla de los signos', en: 'Product and quotient: rule of signs', ar: 'الضرب والقسمة: قاعدة الإشارات' } }],
        title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' },
        goal: {
            eu: 'Zatikiak biderkatzea eta zatitzea, aurretik sinplifikatuz eta alderantzizkoa erabiliz.',
            es: 'Multiplicar y dividir fracciones, simplificando antes y usando la inversa.',
            en: 'Multiply and divide fractions, simplifying first and using the reciprocal.',
            ar: 'ضرب الكسور وقسمتها مع الاختصار المسبق واستعمال المقلوب.'
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
        takeaway: { eu: 'Zatitzeko: alderantzikatu bigarrena eta biderkatu.', es: 'Para dividir: invierte la segunda y multiplica.', en: 'To divide: flip the second fraction and multiply.', ar: 'للقسمة: اقلب الكسر الثاني ثم اضرب.' }
    },
    {
        id: 'combined',
        stage: 'operations',
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'combined', title: { eu: 'Eragiketa konbinatuak eta kako zuzenak', es: 'Operaciones combinadas y corchetes', en: 'Combined operations and square brackets', ar: 'العمليات المركبة والأقواس المعقوفة' } }],
        title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', en: 'Combined operations', ar: 'العمليات المركبة' },
        goal: { eu: 'Eragiketen hierarkia errespetatuz kalkulatzea.', es: 'Calcular respetando la jerarquía de operaciones.', en: 'Calculate following the order of operations.', ar: 'الحساب مع احترام ترتيب العمليات.' },
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
        takeaway: { eu: 'Ez egin dena batera: idatzi tarteko urratsak.', es: 'No lo hagas todo de una vez: escribe los pasos intermedios.', en: 'Do not do it all at once: write the intermediate steps.', ar: 'لا تنجز كل شيء دفعة واحدة؛ اكتب الخطوات الوسيطة.' }
    },
    {
        id: 'powers',
        stage: 'operations',
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'powers', title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' } }],
        title: { eu: 'Zatikien berreturak', es: 'Potencias de fracciones', en: 'Powers of fractions', ar: 'قوى الكسور' },
        goal: { eu: 'Zatiki bat berretzea, oinarriaren zeinua eta berretzailearen paritatea kontrolatuz.', es: 'Elevar una fracción a una potencia controlando el signo de la base y la paridad del exponente.', en: 'Raise a fraction to a power, checking the sign of the base and whether the exponent is even or odd.', ar: 'رفع كسر إلى قوة مع ضبط إشارة الأساس وزوجية الأس.' },
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
        takeaway: {
            eu: 'Zatiki propio positibo bat berretzean, txikiagoa egiten da: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            es: 'Al elevar una fracción propia positiva, se hace más pequeña: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            en: 'When you raise a positive proper fraction to a power, it gets smaller: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            ar: 'عند رفع كسر حقيقي موجب إلى قوة يصغر: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.'
        }
    },
    {
        id: 'fraction-of',
        stage: 'proportionality',
        title: { eu: 'Kantitate baten zatikia', es: 'Fracción de una cantidad', en: 'Fraction of a quantity', ar: 'كسر من كمية' },
        goal: { eu: 'Zati bat, guztizkoa edo falta den kantitatea aurkitzea.', es: 'Encontrar una parte, el total o la cantidad que falta.', en: 'Find a part, the total or the amount that is missing.', ar: 'إيجاد الجزء أو الكل أو الكمية الناقصة.' },
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
        takeaway: { eu: 'Identifikatu galderak zatia ala guztizkoa eskatzen duen.', es: 'Identifica si la pregunta pide la parte o el total.', en: 'Identify whether the question asks for the part or the total.', ar: 'حدّد هل المطلوب هو الجزء أم الكل.' }
    },
    {
        id: 'percentages',
        stage: 'proportionality',
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'fraction-division', title: { eu: 'Zatikia zatiketa gisa: zehatza edo periodikoa', es: 'La fracción como división: exacto o periódico', en: 'A fraction as a division: terminating or recurring', ar: 'الكسر قسمةً: منتهٍ أو دوري' } }],
        title: { eu: 'Zatikiak, hamartarrak eta ehunekoak', es: 'Fracciones, decimales y porcentajes', en: 'Fractions, decimals and percentages', ar: 'الكسور والأعداد العشرية والنسب المئوية' },
        goal: { eu: 'Hiru adierazpenen artean zehaztasuna galdu gabe bihurtzea.', es: 'Convertir entre las tres representaciones sin perder exactitud.', en: 'Convert between the three forms without losing accuracy.', ar: 'التحويل بين التمثيلات الثلاثة من دون فقدان الدقة.' },
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
        takeaway: { eu: '“=” eta “≈” ez dira gauza bera.', es: '“=” y “≈” no significan lo mismo.', en: '“=” and “≈” do not mean the same thing.', ar: 'الرمزان “=” و“≈” لا يعنيان الشيء نفسه.' }
    },
    {
        id: 'proportionality',
        stage: 'proportionality',
        figureAfterSteps: true,
        title: { eu: 'Ehunekoak eta proportzionaltasuna', es: 'Porcentajes y proporcionalidad', en: 'Percentages and proportionality', ar: 'النسب المئوية والتناسب' },
        goal: {
            eu: 'Proportzionaltasun zuzeneko buruketak unitateko balioaz eta proportzioz ebaztea.',
            es: 'Resolver problemas de proporcionalidad directa con el valor unitario y con proporciones.',
            en: 'Solve direct proportion problems using the unit value and using proportions.',
            ar: 'حلّ مسائل التناسب الطردي باستعمال قيمة الوحدة والتناسب.'
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
        takeaway: {
            eu: 'Testuinguruan, emaitzaren unitatea eta arrazoizkotasuna ere egiaztatu.',
            es: 'En contexto, comprueba también la unidad y si el resultado es razonable.',
            en: 'In context, also check the unit and whether the result is reasonable.',
            ar: 'في المسائل السياقية تحقّق أيضًا من الوحدة ومن معقولية النتيجة.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts); index.tsx adds the drawings, the typical mistake and «Check it» */
export const theoryTopics: TheoryTopic[] = baseTopics.map((topic) => ({ ...topic, ...fractionLessonTexts[topic.id] }))
