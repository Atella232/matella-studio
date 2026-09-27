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
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })

export const theoryTopics: TheoryTopic[] = [
    {
        id: 'meaning',
        stage: 'meaning',
        title: { eu: 'Zer adierazten du zatiki batek?', es: '¿Qué representa una fracción?', ar: 'ماذا يمثّل الكسر؟' },
        goal: {
            eu: 'Zatikia zati gisa, zatiketa gisa eta zenbaki gisa interpretatzea.',
            es: 'Interpretar una fracción como parte, como cociente y como número.',
            ar: 'تفسير الكسر بوصفه جزءًا وقسمةً وعددًا.'
        },
        explanation: {
            eu: 'Zatiki batek bi gai ditu. Izendatzaileak (behean) adierazten du unitatea zenbat zati berdinetan banatzen den; zenbakitzaileak (goian), zenbat zati hartzen diren. Zatiki bera hiru modutara irakur daiteke: osoaren zati gisa, zatiketa baten emaitza gisa eta zenbaki-zuzeneko puntu jakin bat gisa.',
            es: 'Una fracción tiene dos términos. El denominador (abajo) indica en cuántas partes iguales se divide la unidad; el numerador (arriba), cuántas de esas partes se toman. La misma fracción se puede leer de tres maneras: como parte de un todo, como el resultado de una división y como un punto concreto de la recta numérica.',
            ar: 'للكسر حدّان. يبيّن المقام (في الأسفل) عدد الأجزاء المتساوية التي تُقسم إليها الوحدة، ويبيّن البسط (في الأعلى) عدد الأجزاء المأخوذة. ويمكن قراءة الكسر نفسه بثلاث طرق: جزءًا من كل، وناتجَ قسمة، ونقطةً محددة على خط الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Osoaren zati bat', es: 'Parte de un todo', ar: 'جزء من كل' },
                text: { eu: 'Txokolate-tableta bat 4 zati berdinetan banatu eta 3 hartzen badituzu, tabletaren $\\frac{3}{4}$ hartu duzu.', es: 'Si divides una tableta de chocolate en 4 trozos iguales y tomas 3, has tomado $\\frac{3}{4}$ de la tableta.', ar: 'إذا قسمت لوح شوكولاتة إلى 4 قطع متساوية وأخذت 3 منها، فقد أخذت $\\frac{3}{4}$ اللوح.' }
            },
            {
                title: { eu: 'Zatiketa bat', es: 'Una división', ar: 'قسمة' },
                text: { eu: '3 pizza 4 lagunen artean banatzen badira, bakoitzak $\\frac{3}{4}$ pizza jaten du. Zatikia zatiketa bat da.', es: 'Si se reparten 3 pizzas entre 4 personas, cada una come $\\frac{3}{4}$ de pizza. La fracción es una división.', ar: 'إذا وُزّعت 3 بيتزا على 4 أشخاص، يأكل كل واحد $\\frac{3}{4}$ بيتزا. فالكسر قسمة.' },
                math: dec('$\\frac{3}{4}=3\\div 4=0{,}75$')
            },
            {
                title: { eu: 'Zenbaki bat', es: 'Un número', ar: 'عدد' },
                text: { eu: '$\\frac{3}{4}$ zenbaki-zuzenean dago, 0 eta 1 artean, 1etik hurbilago. Zenbakitzailea izendatzailea baino handiagoa bada, zatikiak 1 baino gehiago balio du.', es: '$\\frac{3}{4}$ ocupa un punto de la recta, entre 0 y 1, más cerca de 1. Si el numerador es mayor que el denominador, la fracción vale más que 1.', ar: 'يقع $\\frac{3}{4}$ على خط الأعداد بين 0 و1، وهو أقرب إلى 1. وإذا كان البسط أكبر من المقام كانت قيمة الكسر أكبر من 1.' },
                math: '$0<\\frac{3}{4}<1<\\frac{5}{4}$'
            },
            {
                title: { eu: 'Zatiak berdinak izan behar dira', es: 'Las partes deben ser iguales', ar: 'يجب أن تكون الأجزاء متساوية' },
                text: { eu: 'Tableta tamaina desberdineko 4 zatitan hausten bada, zati bakoitza ez da laurden bat. Izendatzaileak zati berdinak eskatzen ditu.', es: 'Si la tableta se rompe en 4 trozos de distinto tamaño, cada trozo no es un cuarto. El denominador exige partes iguales.', ar: 'إذا انكسر اللوح إلى 4 قطع مختلفة الحجم فليست كل قطعة ربعًا. فالمقام يشترط أجزاء متساوية.' }
            }
        ],
        example: dec('$\\frac{5}{8}\\;\\rightarrow\\;5\\div 8=0{,}625$'),
        takeaway: {
            eu: 'Izendatzailea: zenbat zati berdin. Zenbakitzailea: zenbat hartzen diren.',
            es: 'Denominador: en cuántas partes iguales. Numerador: cuántas se toman.',
            ar: 'المقام: كم جزءًا متساويًا. البسط: كم جزءًا نأخذ.'
        }
    },
    {
        id: 'representation',
        stage: 'meaning',
        title: { eu: 'Zatiki propioak, inpropioak eta mistoak', es: 'Fracciones propias, impropias y mixtas', ar: 'الكسور الحقيقية وغير الحقيقية والأعداد الكسرية' },
        goal: {
            eu: 'Zatiki inpropio bat zenbaki misto bihurtzea eta alderantziz, eta zenbaki-zuzenean kokatzea.',
            es: 'Pasar una fracción impropia a número mixto y al revés, y situarla en la recta.',
            ar: 'تحويل الكسر غير الحقيقي إلى عدد كسري وبالعكس، ووضعه على خط الأعداد.'
        },
        explanation: {
            eu: 'Zenbakitzailea izendatzailea baino txikiagoa bada, zatikia propioa da eta 1 baino gutxiago balio du. Handiagoa bada, inpropioa da: unitate osoak ditu, eta zenbaki misto gisa idatz daiteke, hau da, zenbaki oso bat gehi zatiki propio bat. Zenbakitzailearen eta izendatzailearen arteko zatiketa osoak unitateak (zatidura) eta soberan geratzen dena (hondarra) ematen ditu.',
            es: 'Si el numerador es menor que el denominador, la fracción es propia y vale menos que 1. Si es mayor, es impropia: contiene unidades completas y se puede escribir como número mixto, es decir, un número entero más una fracción propia. La división entera del numerador entre el denominador da las unidades (cociente) y lo que sobra (resto).',
            ar: 'إذا كان البسط أصغر من المقام فالكسر حقيقي وقيمته أقل من 1. وإذا كان أكبر فهو غير حقيقي: يحتوي وحدات كاملة ويمكن كتابته عددًا كسريًا، أي عددًا صحيحًا مع كسر حقيقي. وتعطي القسمة الصحيحة للبسط على المقام عدد الوحدات (الناتج) وما يتبقى (الباقي).'
        },
        problem: { eu: 'Idatzi $\\frac{17}{5}$ zenbaki misto gisa.', es: 'Escribe $\\frac{17}{5}$ como número mixto.', ar: 'اكتب $\\frac{17}{5}$ عددًا كسريًا.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', ar: 'اقسم البسط على المقام.' },
                math: '$17=5\\cdot 3+2$'
            },
            {
                text: { eu: 'Zatidura unitate osoak dira.', es: 'El cociente son las unidades completas.', ar: 'الناتج هو عدد الوحدات الكاملة.' },
                math: '$3$'
            },
            {
                text: { eu: 'Hondarra soberan dagoen zatiaren zenbakitzailea da; izendatzailea ez da aldatzen.', es: 'El resto es el numerador de la parte que sobra; el denominador no cambia.', ar: 'الباقي هو بسط الجزء المتبقي، والمقام لا يتغير.' },
                math: '$\\frac{17}{5}=3\\frac{2}{5}$'
            },
            {
                text: { eu: 'Itzultzeko: biderkatu unitateak izendatzaileaz eta batu zenbakitzailea.', es: 'Para volver: multiplica las unidades por el denominador y suma el numerador.', ar: 'للعودة: اضرب الوحدات في المقام وأضف البسط.' },
                math: '$3\\frac{2}{5}=\\frac{3\\cdot 5+2}{5}=\\frac{17}{5}$'
            }
        ],
        example: dec('$\\frac{17}{5}=3\\frac{2}{5}=3{,}4$'),
        takeaway: { eu: 'Adierazpena aldatzen da; balioa ez.', es: 'Cambia la representación, no el valor.', ar: 'يتغيّر التمثيل ولا تتغيّر القيمة.' }
    },
    {
        id: 'equivalence',
        stage: 'equivalence',
        title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', ar: 'الكسور المتكافئة' },
        goal: {
            eu: 'Itxura desberdina baina balio bera duten zatikiak sortzea eta ezagutzea.',
            es: 'Construir y reconocer fracciones con distinta apariencia y el mismo valor.',
            ar: 'تكوين الكسور المختلفة في الشكل والمتساوية في القيمة والتعرّف عليها.'
        },
        explanation: {
            eu: 'Bi zatiki baliokideak dira kantitate bera adierazten badute, zenbaki desberdinekin idatzita egon arren. Zenbakitzailea eta izendatzailea zero ez den zenbaki berarekin biderkatuz (anplifikatu) edo zatituz (sinplifikatu) lortzen dira. Bi zatiki baliokideak diren jakiteko, biderkadura gurutzatuak alderatzen dira.',
            es: 'Dos fracciones son equivalentes si representan la misma cantidad, aunque se escriban con números distintos. Se obtienen multiplicando (amplificar) o dividiendo (simplificar) numerador y denominador por el mismo número distinto de cero. Para saber si dos fracciones son equivalentes, se comparan los productos cruzados.',
            ar: 'يكون الكسران متكافئين إذا مثّلا الكمية نفسها وإن كُتبا بأعداد مختلفة. ونحصل عليهما بضرب البسط والمقام في العدد نفسه غير الصفري (التوسيع) أو بقسمتهما عليه (التبسيط). ولمعرفة هل الكسران متكافئان نقارن حاصلَي الضرب التبادلي.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Anplifikatu', es: 'Amplificar', ar: 'التوسيع' },
                text: { eu: 'Biderkatu bi gaiak zenbaki berarekin: zatiak txikiagoak dira, baina gehiago hartzen dituzu.', es: 'Multiplica los dos términos por el mismo número: los trozos son más pequeños, pero tomas más.', ar: 'اضرب الحدّين في العدد نفسه: تصغر الأجزاء لكنك تأخذ عددًا أكبر منها.' },
                math: '$\\frac{3}{4}=\\frac{3\\cdot 2}{4\\cdot 2}=\\frac{6}{8}$'
            },
            {
                title: { eu: 'Sinplifikatu', es: 'Simplificar', ar: 'التبسيط' },
                text: { eu: 'Zatitu bi gaiak zatitzaile komun batez.', es: 'Divide los dos términos entre un divisor común.', ar: 'اقسم الحدّين على قاسم مشترك.' },
                math: '$\\frac{45}{60}=\\frac{45\\div 15}{60\\div 15}=\\frac{3}{4}$'
            },
            {
                title: { eu: 'Biderkadura gurutzatuak', es: 'Productos cruzados', ar: 'الضرب التبادلي' },
                text: { eu: '$\\frac{a}{b}$ eta $\\frac{c}{d}$ baliokideak dira $a\\cdot d=b\\cdot c$ denean.', es: '$\\frac{a}{b}$ y $\\frac{c}{d}$ son equivalentes cuando $a\\cdot d=b\\cdot c$.', ar: 'يتكافأ $\\frac{a}{b}$ و$\\frac{c}{d}$ عندما $a\\cdot d=b\\cdot c$.' },
                math: '$\\frac{6}{8}=\\frac{9}{12}:\\ 6\\cdot 12=8\\cdot 9=72$'
            },
            {
                title: { eu: 'Kontuz: batzeak ez du balio', es: 'Cuidado: sumar no sirve', ar: 'انتبه: الجمع لا يصلح' },
                text: { eu: 'Bi gaiei zenbaki bera batuz gero, balioa aldatzen da.', es: 'Si sumas el mismo número a los dos términos, el valor cambia.', ar: 'إذا أضفت العدد نفسه إلى الحدّين تتغير القيمة.' },
                math: '$\\frac{1+1}{2+1}=\\frac{2}{3}\\neq\\frac{1}{2}$'
            }
        ],
        example: '$\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}=\\frac{45}{60}$',
        takeaway: {
            eu: 'Zenbaki bera goian eta behean, biderkatuz edo zatituz: balioa ez da aldatzen.',
            es: 'El mismo número arriba y abajo, multiplicando o dividiendo: el valor no cambia.',
            ar: 'العدد نفسه في الأعلى والأسفل، ضربًا أو قسمةً: القيمة لا تتغير.'
        }
    },
    {
        id: 'simplification',
        stage: 'equivalence',
        title: { eu: 'Sinplifikazioa eta zatiki laburtezina', es: 'Simplificación y fracción irreducible', ar: 'التبسيط والكسر غير القابل للاختزال' },
        goal: {
            eu: 'Zatiki bat bere forma laburrenean idaztea, urratsez urrats edo ZKHrekin.',
            es: 'Escribir una fracción en su forma más reducida, paso a paso o con el m.c.d.',
            ar: 'كتابة الكسر في أبسط صورة، خطوة بخطوة أو باستعمال ق.م.أ.'
        },
        explanation: {
            eu: 'Zatiki bat laburtezina da zenbakitzaileak eta izendatzaileak 1 baino ez dutenean zatitzaile komun. Pixkanaka sinplifika daiteke, zatitzaile komun txikiez zatituz (2, 3, 5…), edo urrats bakarrean, bi gaiak haien ZKHz zatituz. Zatikia negatiboa bada, zeinua aurrean edo zenbakitzailean idazten da.',
            es: 'Una fracción es irreducible cuando numerador y denominador solo tienen el 1 como divisor común. Se puede simplificar poco a poco, dividiendo entre divisores comunes pequeños (2, 3, 5…), o en un solo paso, dividiendo los dos términos entre su m.c.d. Si la fracción es negativa, el signo se escribe delante o en el numerador.',
            ar: 'يكون الكسر غير قابل للاختزال عندما لا يكون للبسط والمقام قاسم مشترك سوى 1. ويمكن تبسيطه تدريجيًا بالقسمة على قواسم مشتركة صغيرة (2، 3، 5…) أو في خطوة واحدة بقسمة الحدّين على قاسمهما المشترك الأكبر. وإذا كان الكسر سالبًا تُكتب الإشارة أمامه أو في البسط.'
        },
        problem: { eu: 'Sinplifikatu $\\frac{-84}{126}$ zatiki laburtezina lortu arte.', es: 'Simplifica $\\frac{-84}{126}$ hasta obtener la fracción irreducible.', ar: 'بسّط $\\frac{-84}{126}$ إلى أبسط صورة.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Kalkulatu zenbakitzailearen eta izendatzailearen ZKH (zeinurik gabe).', es: 'Calcula el m.c.d. del numerador y del denominador (sin el signo).', ar: 'احسب ق.م.أ للبسط والمقام (من دون الإشارة).' },
                math: notation('$@GCD(84,126)=42$')
            },
            {
                text: { eu: 'Zatitu bi gaiak ZKHz.', es: 'Divide los dos términos entre el m.c.d.', ar: 'اقسم الحدّين على ق.م.أ.' },
                math: '$\\frac{-84}{126}=\\frac{-84\\div 42}{126\\div 42}=\\frac{-2}{3}$'
            },
            {
                text: { eu: 'Egiaztatu: 2k eta 3k 1 baino ez dute zatitzaile komun. Zatiki laburtezina da.', es: 'Comprueba: 2 y 3 solo tienen el 1 como divisor común. Es irreducible.', ar: 'تحقّق: لا قاسم مشتركًا لـ 2 و3 سوى 1. فالكسر غير قابل للاختزال.' },
                math: '$-\\frac{2}{3}$'
            }
        ],
        example: '$\\frac{84}{126}=\\frac{42}{63}=\\frac{14}{21}=\\frac{2}{3}$',
        takeaway: {
            eu: 'Sinplifikatu azken emaitza beti. ZKHrekin urrats bakarrean iristen zara.',
            es: 'Simplifica siempre el resultado final. Con el m.c.d. llegas en un solo paso.',
            ar: 'بسّط النتيجة النهائية دائمًا. وبالقاسم المشترك الأكبر تصل في خطوة واحدة.'
        }
    },
    {
        id: 'ordering',
        stage: 'ordering',
        title: { eu: 'Konparazioa eta ordena', es: 'Comparación y orden', ar: 'المقارنة والترتيب' },
        goal: {
            eu: 'Zatiki positiboak eta negatiboak estrategia egokiaz alderatzea eta ordenatzea.',
            es: 'Comparar y ordenar fracciones positivas y negativas eligiendo una estrategia adecuada.',
            ar: 'مقارنة الكسور الموجبة والسالبة وترتيبها باختيار استراتيجية مناسبة.'
        },
        explanation: {
            eu: 'Begiratu lehenik zeinuari: zatiki negatibo oro edozein positibo baino txikiagoa da. Izendatzaile bera badute, zenbakitzaile handiena duena da handiena. Izendatzaileak desberdinak badira, bihurtu izendatzaile komunera edo alderatu biderkadura gurutzatuak. Negatiboen artean, zerotik hurbilen dagoena da handiena.',
            es: 'Mira primero el signo: toda fracción negativa es menor que cualquier positiva. Si tienen el mismo denominador, es mayor la de mayor numerador. Si los denominadores son distintos, pásalas a denominador común o compara los productos cruzados. Entre negativas, es mayor la que está más cerca de 0.',
            ar: 'انظر أولًا إلى الإشارة: كل كسر سالب أصغر من أي كسر موجب. وإذا تساوت المقامات فالأكبر هو صاحب البسط الأكبر. وإذا اختلفت فحوّلها إلى مقام مشترك أو قارن حاصلَي الضرب التبادلي. وبين الكسور السالبة يكون الأكبر هو الأقرب إلى 0.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Izendatzaile bera', es: 'Mismo denominador', ar: 'المقام نفسه' },
                text: { eu: 'Zati mota bera: zenbat eta gehiago hartu, handiagoa.', es: 'Mismo tipo de trozo: cuantos más tomes, mayor.', ar: 'الأجزاء من النوع نفسه: كلما أخذت أكثر كان الكسر أكبر.' },
                math: '$\\frac{3}{7}<\\frac{5}{7}$'
            },
            {
                title: { eu: 'Zenbakitzaile bera', es: 'Mismo numerador', ar: 'البسط نفسه' },
                text: { eu: 'Izendatzailea zenbat eta txikiagoa, orduan eta handiagoak zatiak.', es: 'Cuanto menor es el denominador, más grandes son los trozos.', ar: 'كلما صغر المقام كبرت الأجزاء.' },
                math: '$\\frac{2}{3}>\\frac{2}{5}$'
            },
            {
                title: { eu: 'Izendatzaile komuna', es: 'Denominador común', ar: 'مقام مشترك' },
                text: { eu: 'Bihurtu biak izendatzaile berera eta alderatu zenbakitzaileak.', es: 'Pasa las dos al mismo denominador y compara los numeradores.', ar: 'حوّل الكسرين إلى المقام نفسه وقارن البسطين.' },
                math: '$\\frac{5}{6}=\\frac{15}{18}>\\frac{14}{18}=\\frac{7}{9}$'
            },
            {
                title: { eu: 'Negatiboak', es: 'Negativas', ar: 'الكسور السالبة' },
                text: { eu: '$\\frac{2}{3}<\\frac{3}{4}$ denez, $-\\frac{2}{3}$ zerotik hurbilago dago eta handiagoa da.', es: 'Como $\\frac{2}{3}<\\frac{3}{4}$, $-\\frac{2}{3}$ está más cerca de 0 y es mayor.', ar: 'بما أن $\\frac{2}{3}<\\frac{3}{4}$ فإن $-\\frac{2}{3}$ أقرب إلى 0 وهو الأكبر.' },
                math: '$-\\frac{3}{4}<-\\frac{2}{3}$'
            }
        ],
        example: '$-\\frac{3}{4}<-\\frac{2}{3}<\\frac{1}{4}<\\frac{5}{6}$',
        takeaway: {
            eu: 'Metodoa baino garrantzitsuagoa da konparazioa arrazoitzea.',
            es: 'Más importante que el método es poder justificar la comparación.',
            ar: 'الأهم من الطريقة هو القدرة على تبرير المقارنة.'
        }
    },
    {
        id: 'add-subtract',
        stage: 'operations',
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', ar: 'الجمع والطرح' },
        goal: {
            eu: 'Izendatzaile komun egokia aukeratu eta zeinuekin zuzen jardutea.',
            es: 'Elegir un denominador común adecuado y operar correctamente con signos.',
            ar: 'اختيار مقام مشترك مناسب وإجراء العمليات بالإشارات الصحيحة.'
        },
        explanation: {
            eu: 'Zati mota bereko zatiak baino ezin dira batu: laurdenak laurdenekin, seirenak seirenekin. Izendatzaile bera badute, zenbakitzaileak batu edo kentzen dira eta izendatzailea mantentzen da. Desberdinak badira, lehenik zatiki baliokideak sortzen dira izendatzaile komun batekin; txikiena izendatzaileen MKT da.',
            es: 'Solo se pueden sumar trozos del mismo tipo: cuartos con cuartos, sextos con sextos. Si tienen el mismo denominador, se suman o restan los numeradores y se mantiene el denominador. Si son distintos, primero se buscan fracciones equivalentes con un denominador común; el más pequeño es el m.c.m. de los denominadores.',
            ar: 'لا نجمع إلا أجزاء من النوع نفسه: أرباعًا مع أرباع وأسداسًا مع أسداس. فإذا تساوت المقامات نجمع البسوط أو نطرحها ونُبقي المقام. وإذا اختلفت نكوّن أولًا كسورًا مكافئة بمقام مشترك، وأصغره هو المضاعف المشترك الأصغر للمقامات.'
        },
        problem: { eu: 'Kalkulatu $\\frac{5}{6}-\\frac{1}{4}$.', es: 'Calcula $\\frac{5}{6}-\\frac{1}{4}$.', ar: 'احسب $\\frac{5}{6}-\\frac{1}{4}$.' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Kalkulatu izendatzaileen MKT: hori izango da izendatzaile komuna.', es: 'Calcula el m.c.m. de los denominadores: será el denominador común.', ar: 'احسب م.م.أ للمقامات: سيكون هو المقام المشترك.' },
                math: notation('$@LCM(6,4)=12$')
            },
            {
                text: { eu: 'Bihurtu zatiki bakoitza izendatzaile hori duen baliokide batean.', es: 'Convierte cada fracción en una equivalente con ese denominador.', ar: 'حوّل كل كسر إلى كسر مكافئ بهذا المقام.' },
                math: '$\\frac{5}{6}=\\frac{10}{12}\\qquad\\frac{1}{4}=\\frac{3}{12}$'
            },
            {
                text: { eu: 'Batu edo kendu zenbakitzaileak; izendatzailea ez da aldatzen.', es: 'Suma o resta los numeradores; el denominador no cambia.', ar: 'اجمع البسوط أو اطرحها، والمقام لا يتغير.' },
                math: '$\\frac{10}{12}-\\frac{3}{12}=\\frac{10-3}{12}=\\frac{7}{12}$'
            },
            {
                text: { eu: 'Sinplifikatu, ahal bada. 7k eta 12k ez dute zatitzaile komunik: zatiki laburtezina da.', es: 'Simplifica, si se puede. 7 y 12 no tienen divisores comunes: ya es irreducible.', ar: 'بسّط إن أمكن. لا قاسم مشتركًا لـ 7 و12، فالكسر في أبسط صورة.' },
                math: '$\\frac{7}{12}$'
            }
        ],
        example: '$\\frac{5}{6}-\\frac{1}{4}=\\frac{10}{12}-\\frac{3}{12}=\\frac{7}{12}$',
        takeaway: {
            eu: 'Izendatzaile komuna lehenik; sinplifikazioa azkenik. Izendatzaileak ez dira batzen.',
            es: 'Denominador común primero; simplificación al final. Los denominadores no se suman.',
            ar: 'المقام المشترك أولًا، والتبسيط أخيرًا. لا نجمع المقامات.'
        }
    },
    {
        id: 'multiply-divide',
        stage: 'operations',
        title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', ar: 'الضرب والقسمة' },
        goal: {
            eu: 'Zatikiak biderkatzea eta zatitzea, aurretik sinplifikatuz eta alderantzizkoa erabiliz.',
            es: 'Multiplicar y dividir fracciones, simplificando antes y usando la inversa.',
            ar: 'ضرب الكسور وقسمتها مع الاختصار المسبق واستعمال المقلوب.'
        },
        explanation: {
            eu: 'Biderketan ez da izendatzaile komunik behar: zenbakitzailea zenbakitzailearekin eta izendatzailea izendatzailearekin biderkatzen dira. Zatiki baten alderantzizkoa gaiak trukatuta lortzen da, eta biak biderkatuta 1 ematen dute. Zatiki batez zatitzea haren alderantzizkoaz biderkatzea da. Zeinuen erregela zenbaki osoena bera da.',
            es: 'Para multiplicar no hace falta denominador común: se multiplica numerador por numerador y denominador por denominador. La inversa de una fracción se obtiene intercambiando sus términos, y el producto de las dos es 1. Dividir entre una fracción es multiplicar por su inversa. La regla de los signos es la misma que con los enteros.',
            ar: 'لا نحتاج في الضرب إلى مقام مشترك: نضرب البسط في البسط والمقام في المقام. ونحصل على مقلوب الكسر بتبديل حدّيه، وحاصل ضربهما 1. والقسمة على كسر هي الضرب في مقلوبه. وقاعدة الإشارات هي نفسها في الأعداد الصحيحة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Biderkatu', es: 'Multiplicar', ar: 'الضرب' },
                text: { eu: 'Goikoak elkarren artean, behekoak elkarren artean.', es: 'Los de arriba entre sí y los de abajo entre sí.', ar: 'البسط في البسط، والمقام في المقام.' },
                math: '$\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{2\\cdot 3}{3\\cdot 4}=\\frac{6}{12}=\\frac{1}{2}$'
            },
            {
                title: { eu: 'Sinplifikatu aurretik', es: 'Simplifica antes', ar: 'اختصر قبل الضرب' },
                text: { eu: 'Zenbakitzaile batek eta izendatzaile batek zatitzaile komuna badute, zatitu biderkatu aurretik: zenbakiak txikiak geratzen dira.', es: 'Si un numerador y un denominador tienen un divisor común, divide antes de multiplicar: los números se quedan pequeños.', ar: 'إذا كان لبسطٍ ومقامٍ قاسم مشترك فاقسمهما قبل الضرب لتبقى الأعداد صغيرة.' },
                math: '$\\frac{4}{9}\\cdot\\frac{15}{8}=\\frac{1\\cdot 5}{3\\cdot 2}=\\frac{5}{6}$'
            },
            {
                title: { eu: 'Alderantzizkoa', es: 'La inversa', ar: 'المقلوب' },
                text: { eu: '$\\frac{a}{b}$-ren alderantzizkoa $\\frac{b}{a}$ da. 0k ez du alderantzizkorik.', es: 'La inversa de $\\frac{a}{b}$ es $\\frac{b}{a}$. El 0 no tiene inversa.', ar: 'مقلوب $\\frac{a}{b}$ هو $\\frac{b}{a}$. والصفر ليس له مقلوب.' },
                math: '$\\frac{8}{15}\\cdot\\frac{15}{8}=1$'
            },
            {
                title: { eu: 'Zatitu', es: 'Dividir', ar: 'القسمة' },
                text: { eu: 'Zenbat zortziren sartzen dira $\\frac{3}{4}$-n? Sei. Zatitzea alderantzizkoaz biderkatzea da.', es: '¿Cuántos octavos caben en $\\frac{3}{4}$? Seis. Dividir es multiplicar por la inversa.', ar: 'كم ثُمنًا في $\\frac{3}{4}$؟ ستة. فالقسمة ضرب في المقلوب.' },
                math: '$\\frac{3}{4}\\div\\frac{1}{8}=\\frac{3}{4}\\cdot\\frac{8}{1}=6$'
            }
        ],
        example: '$-\\frac{4}{9}\\div\\frac{8}{15}=-\\frac{4}{9}\\cdot\\frac{15}{8}=-\\frac{5}{6}$',
        takeaway: { eu: 'Zatitzeko: alderantzikatu bigarrena eta biderkatu.', es: 'Para dividir: invierte la segunda y multiplica.', ar: 'للقسمة: اقلب الكسر الثاني ثم اضرب.' }
    },
    {
        id: 'combined',
        stage: 'operations',
        title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', ar: 'العمليات المركبة' },
        goal: { eu: 'Eragiketen hierarkia errespetatuz kalkulatzea.', es: 'Calcular respetando la jerarquía de operaciones.', ar: 'الحساب مع احترام ترتيب العمليات.' },
        explanation: {
            eu: 'Zatikiekin, zenbaki osoekin bezala, eragiketek ordena jakin bat dute. Ordena hori ez errespetatzea da akatsik ohikoena: $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ adierazpenean, lehenik biderketa egin behar da, ez batuketa. Maila bereko eragiketak ezkerretik eskuinera egiten dira. Idatzi urrats bakoitza lerro batean.',
            es: 'Con fracciones, igual que con enteros, las operaciones tienen un orden. No respetarlo es el error más frecuente: en $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ hay que hacer primero el producto, no la suma. Las operaciones del mismo nivel se hacen de izquierda a derecha. Escribe cada paso en una línea.',
            ar: 'للعمليات على الكسور ترتيب كما في الأعداد الصحيحة، وعدم احترامه هو الخطأ الأكثر شيوعًا: في $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$ نبدأ بالضرب لا بالجمع. وتُنجز العمليات من المستوى نفسه من اليسار إلى اليمين. اكتب كل خطوة في سطر.'
        },
        problem: { eu: 'Kalkulatu $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.', es: 'Calcula $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.', ar: 'احسب $\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            {
                title: { eu: 'Parentesiak', es: 'Paréntesis', ar: 'الأقواس' },
                text: { eu: 'Lehenik, parentesien barrukoa.', es: 'Primero, lo que hay dentro de los paréntesis.', ar: 'أولًا ما بداخل الأقواس.' },
                math: '$\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$'
            },
            {
                title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' },
                text: { eu: 'Gero, berreturak.', es: 'Después, las potencias.', ar: 'ثم القوى.' },
                math: '$\\left(\\frac{1}{2}\\right)^{2}=\\frac{1}{4}$'
            },
            {
                title: { eu: 'Biderketak eta zatiketak', es: 'Multiplicaciones y divisiones', ar: 'الضرب والقسمة' },
                text: { eu: 'Ezkerretik eskuinera.', es: 'De izquierda a derecha.', ar: 'من اليسار إلى اليمين.' },
                math: '$\\frac{1}{6}\\cdot 3=\\frac{1}{2}$'
            },
            {
                title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' },
                text: { eu: 'Azkenik, ezkerretik eskuinera.', es: 'Por último, de izquierda a derecha.', ar: 'وأخيرًا من اليسار إلى اليمين.' },
                math: '$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$'
            }
        ],
        example: '$\\left(\\frac{1}{2}-\\frac{1}{3}\\right)\\cdot 3+\\left(\\frac{1}{2}\\right)^{2}=\\frac{1}{6}\\cdot 3+\\frac{1}{4}=\\frac{3}{4}$',
        takeaway: { eu: 'Ez egin dena batera: idatzi tarteko urratsak.', es: 'No lo hagas todo de una vez: escribe los pasos intermedios.', ar: 'لا تنجز كل شيء دفعة واحدة؛ اكتب الخطوات الوسيطة.' }
    },
    {
        id: 'powers',
        stage: 'operations',
        title: { eu: 'Zatikien berreturak', es: 'Potencias de fracciones', ar: 'قوى الكسور' },
        goal: { eu: 'Zatiki bat berretzea, oinarriaren zeinua eta berretzailearen paritatea kontrolatuz.', es: 'Elevar una fracción a una potencia controlando el signo de la base y la paridad del exponente.', ar: 'رفع كسر إلى قوة مع ضبط إشارة الأساس وزوجية الأس.' },
        explanation: {
            eu: 'Zatiki baten berretura zatikia bere buruarekin behin baino gehiagotan biderkatzea da; horregatik, zenbakitzailea eta izendatzailea berretzen dira. Oinarria negatiboa bada, berretzaile bikoitiak emaitza positiboa ematen du eta bakoitiak negatiboa. Parentesiek adierazten dute zeinua berreturaren barruan dagoen ala ez.',
            es: 'Una potencia de una fracción es multiplicar la fracción por sí misma varias veces; por eso se elevan el numerador y el denominador. Si la base es negativa, un exponente par da resultado positivo y uno impar, negativo. Los paréntesis indican si el signo forma parte de la base.',
            ar: 'قوة الكسر هي ضربه في نفسه عدة مرات، ولذلك نرفع البسط والمقام إلى القوة. وإذا كان الأساس سالبًا كانت النتيجة موجبة للأس الزوجي وسالبة للأس الفردي. وتبيّن الأقواس هل الإشارة جزء من الأساس.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Gaiak berretu', es: 'Se elevan los dos términos', ar: 'نرفع الحدّين' },
                text: { eu: 'Hiru aldiz biderkatu, beraz goian $2^{3}$ eta behean $3^{3}$.', es: 'Se multiplica tres veces, así que arriba queda $2^{3}$ y abajo $3^{3}$.', ar: 'نضرب ثلاث مرات، فيصبح في الأعلى $2^{3}$ وفي الأسفل $3^{3}$.' },
                math: '$\\left(\\frac{2}{3}\\right)^{3}=\\frac{2}{3}\\cdot\\frac{2}{3}\\cdot\\frac{2}{3}=\\frac{8}{27}$'
            },
            {
                title: { eu: 'Berretzaile bikoitia', es: 'Exponente par', ar: 'أس زوجي' },
                text: { eu: 'Bi negatibo biderkatuta, positiboa.', es: 'Dos negativos multiplicados dan positivo.', ar: 'حاصل ضرب سالبين موجب.' },
                math: '$\\left(-\\frac{3}{5}\\right)^{2}=\\frac{9}{25}$'
            },
            {
                title: { eu: 'Berretzaile bakoitia', es: 'Exponente impar', ar: 'أس فردي' },
                text: { eu: 'Zeinua negatiboa geratzen da.', es: 'El signo queda negativo.', ar: 'تبقى الإشارة سالبة.' },
                math: '$\\left(-\\frac{1}{2}\\right)^{3}=-\\frac{1}{8}$'
            },
            {
                title: { eu: 'Parentesirik gabe', es: 'Sin paréntesis', ar: 'من دون أقواس' },
                text: { eu: 'Zeinua ez da berretzen: aurrean geratzen da.', es: 'El signo no se eleva: se queda delante.', ar: 'الإشارة لا تُرفع إلى القوة بل تبقى في الأمام.' },
                math: '$-\\left(\\frac{3}{5}\\right)^{2}=-\\frac{9}{25}$'
            }
        ],
        example: '$\\left(-\\frac{3}{5}\\right)^{2}=\\frac{9}{25}\\qquad -\\left(\\frac{3}{5}\\right)^{2}=-\\frac{9}{25}$',
        takeaway: {
            eu: 'Zatiki propio bat berretzean, txikiagoa egiten da: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            es: 'Al elevar una fracción propia, se hace más pequeña: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.',
            ar: 'عند رفع كسر حقيقي إلى قوة يصغر: $\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}<\\frac{2}{3}$.'
        }
    },
    {
        id: 'fraction-of',
        stage: 'proportionality',
        title: { eu: 'Kantitate baten zatikia', es: 'Fracción de una cantidad', ar: 'كسر من كمية' },
        goal: { eu: 'Zati bat, guztizkoa edo falta den kantitatea aurkitzea.', es: 'Encontrar una parte, el total o la cantidad que falta.', ar: 'إيجاد الجزء أو الكل أو الكمية الناقصة.' },
        explanation: {
            eu: 'Kantitate baten zatikia kalkulatzeko, kantitatea izendatzaileaz zatitzen da (zati bakoitzaren balioa) eta emaitza zenbakitzaileaz biderkatzen da. Hori zatikiaz biderkatzearen berdina da. Alderantzizko galderan zatia ezaguna da eta guztizkoa bilatzen da: zati baten balioa aurkitu eta izendatzaileaz biderkatzen da.',
            es: 'Para calcular una fracción de una cantidad, se divide la cantidad entre el denominador (el valor de cada parte) y el resultado se multiplica por el numerador. Es lo mismo que multiplicar por la fracción. En la pregunta inversa se conoce la parte y se busca el total: se halla el valor de una parte y se multiplica por el denominador.',
            ar: 'لحساب كسر من كمية نقسم الكمية على المقام (قيمة كل جزء) ثم نضرب الناتج في البسط، وهذا هو نفسه الضرب في الكسر. وفي السؤال المعاكس نعرف الجزء ونبحث عن الكل: نجد قيمة جزء واحد ثم نضربها في المقام.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatia', es: 'La parte', ar: 'الجزء' },
                text: { eu: '120ren $\\frac{3}{8}$: zortziren bat 15 da, eta hiru, 45.', es: '$\\frac{3}{8}$ de 120: un octavo es 15 y tres octavos, 45.', ar: '$\\frac{3}{8}$ من 120: الثُّمن 15، وثلاثة أثمان 45.' },
                math: { eu: '$\\frac{3}{8}\\cdot 120=\\frac{3\\cdot 120}{8}=45$', es: '$\\frac{3}{8}\\text{ de }120=\\frac{3\\cdot 120}{8}=45$', ar: '$\\frac{3}{8}\\cdot 120=\\frac{3\\cdot 120}{8}=45$' }
            },
            {
                title: { eu: 'Guztizkoa', es: 'El total', ar: 'الكل' },
                text: { eu: '$\\frac{3}{8}$ 45 badira, zortziren bat $45\\div 3=15$ da, eta osoa $8\\cdot 15=120$.', es: 'Si $\\frac{3}{8}$ son 45, un octavo es $45\\div 3=15$ y el total, $8\\cdot 15=120$.', ar: 'إذا كان $\\frac{3}{8}$ يساوي 45 فالثُّمن $45\\div 3=15$ والكل $8\\cdot 15=120$.' },
                math: '$45\\div\\frac{3}{8}=120$'
            },
            {
                title: { eu: 'Falta dena', es: 'Lo que queda', ar: 'المتبقي' },
                text: { eu: '$\\frac{3}{8}$ gastatu bada, $\\frac{5}{8}$ geratzen da.', es: 'Si se ha gastado $\\frac{3}{8}$, queda $\\frac{5}{8}$.', ar: 'إذا صُرف $\\frac{3}{8}$ يبقى $\\frac{5}{8}$.' },
                math: '$1-\\frac{3}{8}=\\frac{5}{8}\\qquad\\frac{5}{8}\\cdot 120=75$'
            },
            {
                title: { eu: 'Zatiki baten zatikia', es: 'Fracción de una fracción', ar: 'كسر من كسر' },
                text: { eu: '$\\frac{3}{4}$-ren erdia: zatikiak biderkatzen dira.', es: 'La mitad de $\\frac{3}{4}$: se multiplican las fracciones.', ar: 'نصف $\\frac{3}{4}$: نضرب الكسرين.' },
                math: '$\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}$'
            }
        ],
        example: { eu: '$\\frac{3}{8}\\cdot 120=45\\qquad 45\\div\\frac{3}{8}=120$', es: '$\\frac{3}{8}\\text{ de }120=45\\qquad 45\\div\\frac{3}{8}=120$', ar: '$\\frac{3}{8}\\cdot 120=45\\qquad 45\\div\\frac{3}{8}=120$' },
        takeaway: { eu: 'Identifikatu galderak zatia ala guztizkoa eskatzen duen.', es: 'Identifica si la pregunta pide la parte o el total.', ar: 'حدّد هل المطلوب هو الجزء أم الكل.' }
    },
    {
        id: 'percentages',
        stage: 'proportionality',
        title: { eu: 'Zatikiak, hamartarrak eta ehunekoak', es: 'Fracciones, decimales y porcentajes', ar: 'الكسور والأعداد العشرية والنسب المئوية' },
        goal: { eu: 'Hiru adierazpenen artean zehaztasuna galdu gabe bihurtzea.', es: 'Convertir entre las tres representaciones sin perder exactitud.', ar: 'التحويل بين التمثيلات الثلاثة من دون فقدان الدقة.' },
        explanation: {
            eu: 'Zatiki bat, hamartar bat eta ehuneko bat balio bera idazteko hiru modu izan daitezke. Ehunekoa 100 izendatzailea duen zatikia da: %35 ehuneko 35 da. Zatikia hamartar bihurtzeko, zenbakitzailea izendatzaileaz zatitzen da; hamartarra ehuneko bihurtzeko, 100ez biderkatzen da. Zatiketa amaitzen ez bada, hamartar periodikoa da, eta biribiltzean hurbilketa bat idazten da, ez balio zehatza.',
            es: 'Una fracción, un decimal y un porcentaje pueden ser tres formas de escribir el mismo valor. Un porcentaje es una fracción de denominador 100: 35 % son 35 de cada 100. Para pasar una fracción a decimal, se divide el numerador entre el denominador; para pasar un decimal a porcentaje, se multiplica por 100. Si la división no termina, el decimal es periódico, y al redondear se escribe una aproximación, no el valor exacto.',
            ar: 'يمكن أن يكون الكسر والعدد العشري والنسبة المئوية ثلاث طرق لكتابة القيمة نفسها. النسبة المئوية كسر مقامه 100: ‏35٪ تعني 35 من كل 100. ولتحويل كسر إلى عدد عشري نقسم البسط على المقام، ولتحويل العدد العشري إلى نسبة مئوية نضربه في 100. وإذا لم تنتهِ القسمة فالعدد العشري دوري، وعند التقريب نكتب قيمة تقريبية لا القيمة الدقيقة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatikia → hamartarra', es: 'Fracción → decimal', ar: 'كسر ← عدد عشري' },
                text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', ar: 'اقسم البسط على المقام.' },
                math: dec('$\\frac{3}{8}=3\\div 8=0{,}375$')
            },
            {
                title: { eu: 'Hamartarra → ehunekoa', es: 'Decimal → porcentaje', ar: 'عدد عشري ← نسبة مئوية' },
                text: { eu: 'Biderkatu 100ez.', es: 'Multiplica por 100.', ar: 'اضرب في 100.' },
                math: { eu: '$0{,}375\\cdot 100=\\%\\,37{,}5$', es: '$0{,}375\\cdot 100=37{,}5\\,\\%$', ar: '$0.375\\cdot 100=37.5\\,\\%$' }
            },
            {
                title: { eu: 'Ehunekoa → zatikia', es: 'Porcentaje → fracción', ar: 'نسبة مئوية ← كسر' },
                text: { eu: 'Idatzi 100 izendatzailearekin eta sinplifikatu.', es: 'Escríbelo sobre 100 y simplifica.', ar: 'اكتبها على 100 ثم بسّط.' },
                math: { eu: '$\\%\\,35=\\frac{35}{100}=\\frac{7}{20}$', es: '$35\\,\\%=\\frac{35}{100}=\\frac{7}{20}$', ar: '$35\\,\\%=\\frac{35}{100}=\\frac{7}{20}$' }
            },
            {
                title: { eu: 'Periodikoak', es: 'Periódicos', ar: 'الأعداد الدورية' },
                text: { eu: '$\\frac{1}{3}$ ez da 0,33: 3 zifra amaigabe errepikatzen da. 0,33 hurbilketa da.', es: '$\\frac{1}{3}$ no es 0,33: la cifra 3 se repite sin fin. 0,33 es una aproximación.', ar: '$\\frac{1}{3}$ ليس 0.33: يتكرر الرقم 3 بلا نهاية، و0.33 قيمة تقريبية.' },
                math: dec('$\\frac{1}{3}=0{,}\\overline{3}\\approx 0{,}33$')
            }
        ],
        example: { eu: '$\\frac{3}{8}=0{,}375=\\%\\,37{,}5$', es: '$\\frac{3}{8}=0{,}375=37{,}5\\,\\%$', ar: '$\\frac{3}{8}=0.375=37.5\\,\\%$' },
        takeaway: { eu: '“=” eta “≈” ez dira gauza bera.', es: '“=” y “≈” no significan lo mismo.', ar: 'الرمزان “=” و“≈” لا يعنيان الشيء نفسه.' }
    },
    {
        id: 'proportionality',
        stage: 'proportionality',
        title: { eu: 'Ehunekoak eta proportzionaltasuna', es: 'Porcentajes y proporcionalidad', ar: 'النسب المئوية والتناسب' },
        goal: {
            eu: 'Proportzionaltasun zuzeneko buruketak unitateko balioaz eta proportzioz ebaztea.',
            es: 'Resolver problemas de proporcionalidad directa con el valor unitario y con proporciones.',
            ar: 'حلّ مسائل التناسب الطردي باستعمال قيمة الوحدة والتناسب.'
        },
        explanation: {
            eu: 'Bi magnitude zuzenki proportzionalak dira bat zenbaki batez biderkatzean bestea ere zenbaki berberaz biderkatzen bada: koaderno kopurua bikoizten bada, prezioa ere bai. Haien arteko zatidura konstantea da. Buruketak bi modutara ebatz daitezke: unitatera laburtuz (unitate baten balioa kalkulatuz) edo bi arrazoi berdinak diren proportzio bat planteatuz. Ehuneko bat aplikatzea proportzionaltasun kasu bat da.',
            es: 'Dos magnitudes son directamente proporcionales si al multiplicar una por un número, la otra queda multiplicada por el mismo número: si se duplica el número de cuadernos, se duplica el precio. Su cociente es constante. Los problemas se pueden resolver de dos formas: reduciendo a la unidad (calculando el valor de una unidad) o planteando una proporción, en la que dos razones son iguales. Aplicar un porcentaje es un caso de proporcionalidad.',
            ar: 'تكون كميتان متناسبتين طرديًا إذا ضُربت إحداهما في عدد فتُضرب الأخرى في العدد نفسه: إذا تضاعف عدد الدفاتر تضاعف الثمن. وحاصل قسمتهما ثابت. ويمكن حل المسائل بطريقتين: بالرجوع إلى الوحدة (حساب قيمة وحدة واحدة) أو بكتابة تناسب تتساوى فيه نسبتان. وتطبيق نسبة مئوية حالة من حالات التناسب.'
        },
        problem: { eu: '3 koaderno 7,50 € badira, zenbat balio dute 5 koadernok?', es: 'Si 3 cuadernos cuestan 7,50 €, ¿cuánto cuestan 5 cuadernos?', ar: 'إذا كان ثمن 3 دفاتر 7.50€، فما ثمن 5 دفاتر؟' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Egiaztatu proportzionaltasun zuzena dela: koaderno bikoitzak, prezio bikoitza.', es: 'Comprueba que es proporcionalidad directa: el doble de cuadernos cuesta el doble.', ar: 'تحقّق أنه تناسب طردي: ضعف الدفاتر بضعف الثمن.' }
            },
            {
                text: { eu: 'Kalkulatu unitate baten balioa: 3 koaderno 7,50 € badira, bat 2,50 €.', es: 'Calcula el valor de una unidad: si 3 cuadernos cuestan 7,50 €, uno cuesta 2,50 €.', ar: 'احسب قيمة الوحدة: إذا كان ثمن 3 دفاتر 7.50€ فثمن الواحد 2.50€.' },
                math: dec('$7{,}50\\div 3=2{,}50$')
            },
            {
                text: { eu: 'Biderkatu eskatutako kantitateaz.', es: 'Multiplica por la cantidad pedida.', ar: 'اضرب في الكمية المطلوبة.' },
                math: dec('$5\\cdot 2{,}50=12{,}50$')
            },
            {
                text: { eu: 'Edo planteatu proportzio bat eta ebatzi.', es: 'O plantea una proporción y resuélvela.', ar: 'أو اكتب تناسبًا وحلّه.' },
                math: dec('$\\frac{3}{7{,}50}=\\frac{5}{x}\\;\\rightarrow\\;x=\\frac{5\\cdot 7{,}50}{3}=12{,}50$')
            }
        ],
        example: { eu: '$80\\text{ren }\\%\\,35=\\frac{35}{100}\\cdot 80=28$', es: '$35\\,\\%\\text{ de }80=\\frac{35}{100}\\cdot 80=28$', ar: '$\\frac{35}{100}\\cdot 80=28$' },
        takeaway: {
            eu: 'Testuinguruan, emaitzaren unitatea eta arrazoizkotasuna ere egiaztatu.',
            es: 'En contexto, comprueba también la unidad y si el resultado es razonable.',
            ar: 'في المسائل السياقية تحقّق أيضًا من الوحدة ومن معقولية النتيجة.'
        }
    }
]
