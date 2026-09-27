import { fraction, type AnswerForm, type FractionValue } from './math/fraction.ts'
import type { LocalizedText, StageTone, UnitLanguage, UnitSection } from '../../features/unit-v2/types.ts'

export { normalizeUnitLanguage as normalizePrototypeLanguage, pickText, unitSections as prototypeSections } from '../../features/unit-v2/types.ts'
export type { LocalizedText } from '../../features/unit-v2/types.ts'
export type PrototypeLanguage = UnitLanguage
export type FractionStageId = 'meaning' | 'equivalence' | 'ordering' | 'operations' | 'proportionality'
export type TheoryTopicId = 'meaning' | 'representation' | 'equivalence' | 'simplification' | 'ordering' | 'add-subtract' | 'multiply-divide' | 'combined' | 'powers' | 'fraction-of' | 'percentages' | 'proportionality'
export type PrototypeSection = UnitSection

export interface LearningStage {
    id: FractionStageId
    tone: StageTone
    icon: string
    color: string
    title: LocalizedText
    goal: LocalizedText
    explanation: LocalizedText
    example: string
    takeaway: LocalizedText
}

export interface PracticeItem {
    id: number
    stage: FractionStageId
    prompt: LocalizedText
    expression?: string
    expected: FractionValue
    /** Written form required by the prompt; defaults to any equivalent value */
    answerForm?: AnswerForm
    hint: LocalizedText
    explanation: LocalizedText
}

export interface ChallengeItem extends PracticeItem {
    points: number
    context: 'starter' | 'advanced' | 'master'
}

export interface DiagnosticQuestion {
    id: number
    prompt: LocalizedText
    options: LocalizedText[]
    correctIndex: number
    explanation: LocalizedText
    topic: TheoryTopicId
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
    {
        id: 601,
        prompt: { eu: 'Zein adierazpenek du unitatea baino balio handiagoa?', es: '¿Qué expresión tiene un valor mayor que la unidad?', ar: 'أي تعبير قيمته أكبر من الواحد؟' },
        options: [{ eu: '3/7', es: '3/7', ar: '3/7' }, { eu: '7/3', es: '7/3', ar: '7/3' }, { eu: '5/5', es: '5/5', ar: '5/5' }],
        correctIndex: 1,
        explanation: { eu: '7/3 zatiki inpropioa da eta 2 1/3 balio du.', es: '7/3 es impropia y vale 2 1/3.', ar: '7/3 كسر غير حقيقي وقيمته 2 و1/3.' },
        topic: 'representation'
    },
    {
        id: 602,
        prompt: { eu: 'Zein zatiki da 3/4-ren baliokidea?', es: '¿Qué fracción es equivalente a 3/4?', ar: 'أي كسر يكافئ 3/4؟' },
        options: [{ eu: '6/8', es: '6/8', ar: '6/8' }, { eu: '6/7', es: '6/7', ar: '6/7' }, { eu: '9/16', es: '9/16', ar: '9/16' }],
        correctIndex: 0,
        explanation: { eu: 'Zenbakitzailea eta izendatzailea 2z biderkatu dira.', es: 'Se han multiplicado numerador y denominador por 2.', ar: 'ضُرب البسط والمقام في 2.' },
        topic: 'equivalence'
    },
    {
        id: 603,
        prompt: { eu: 'Zein da handiena?', es: '¿Cuál es la mayor?', ar: 'أيها أكبر؟' },
        options: [{ eu: '−2/3', es: '−2/3', ar: '−2/3' }, { eu: '−3/4', es: '−3/4', ar: '−3/4' }, { eu: '−5/6', es: '−5/6', ar: '−5/6' }],
        correctIndex: 0,
        explanation: { eu: 'Negatiboetan zerotik hurbilen dagoena da handiena.', es: 'Entre negativos, el más cercano a cero es el mayor.', ar: 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر.' },
        topic: 'ordering'
    },
    {
        id: 604,
        prompt: { eu: 'Zenbat da 1/3 + 1/6?', es: '¿Cuánto es 1/3 + 1/6?', ar: 'ما ناتج 1/3 + 1/6؟' },
        options: [{ eu: '2/9', es: '2/9', ar: '2/9' }, { eu: '1/2', es: '1/2', ar: '1/2' }, { eu: '2/6', es: '2/6', ar: '2/6' }],
        correctIndex: 1,
        explanation: { eu: '1/3 = 2/6; beraz, 2/6 + 1/6 = 3/6 = 1/2.', es: '1/3 = 2/6; por tanto, 2/6 + 1/6 = 3/6 = 1/2.', ar: '1/3 = 2/6؛ إذن 2/6 + 1/6 = 3/6 = 1/2.' },
        topic: 'add-subtract'
    },
    {
        id: 605,
        prompt: { eu: 'Zenbat da 80ren %25?', es: '¿Cuánto es el 25 % de 80?', ar: 'كم يساوي 25٪ من 80؟' },
        options: [{ eu: '20', es: '20', ar: '20' }, { eu: '25', es: '25', ar: '25' }, { eu: '32', es: '32', ar: '32' }],
        correctIndex: 0,
        explanation: { eu: '%25 = 1/4 eta 80ren laurdena 20 da.', es: '25 % = 1/4 y la cuarta parte de 80 es 20.', ar: '25٪ = 1/4، وربع 80 يساوي 20.' },
        topic: 'percentages'
    },
    {
        id: 606,
        prompt: { eu: '3 koaderno 7,50 € badira, zenbat balio dute 5ek?', es: 'Si 3 cuadernos cuestan 7,50 €, ¿cuánto cuestan 5?', ar: 'إذا كان ثمن 3 دفاتر 7.50€، فما ثمن 5؟' },
        options: [{ eu: '10 €', es: '10 €', ar: '10€' }, { eu: '12,50 €', es: '12,50 €', ar: '12.50€' }, { eu: '15 €', es: '15 €', ar: '15€' }],
        correctIndex: 1,
        explanation: { eu: 'Koaderno bakoitza 2,50 € da; bostek 12,50 € balio dute.', es: 'Cada cuaderno cuesta 2,50 €; cinco cuestan 12,50 €.', ar: 'ثمن الدفتر 2.50€؛ وثمن خمسة دفاتر 12.50€.' },
        topic: 'proportionality'
    }
]

export const learningStages: LearningStage[] = [
    {
        id: 'meaning',
        tone: 'blue',
        icon: '◐',
        color: '#38bdf8',
        title: { eu: 'Zer adierazten du zatiki batek?', es: '¿Qué representa una fracción?', ar: 'ماذا يمثّل الكسر؟' },
        goal: {
            eu: 'Zatikia zati gisa, zatidura gisa eta zenbaki gisa interpretatzea.',
            es: 'Interpretar una fracción como parte, cociente y número.',
            ar: 'تفسير الكسر بوصفه جزءًا وقسمةً وعددًا.'
        },
        explanation: {
            eu: 'Izendatzaileak unitatea zenbat zati berdinetan banatzen den adierazten du; zenbakitzaileak zenbat zati hartzen diren. Balioa zenbaki-zuzenean puntu bakar bat da.',
            es: 'El denominador indica en cuántas partes iguales se divide la unidad; el numerador, cuántas se toman. Su valor es un punto concreto de la recta numérica.',
            ar: 'يبيّن المقام عدد الأجزاء المتساوية للوحدة، ويبيّن البسط عدد الأجزاء المأخوذة. وقيمة الكسر نقطة محددة على خط الأعداد.'
        },
        example: '$\\frac{7}{3}=2\\frac{1}{3}$',
        takeaway: {
            eu: 'Zatiki inpropio batek unitate bat baino gehiago ere adieraz dezake.',
            es: 'Una fracción impropia también puede representar más de una unidad.',
            ar: 'يمكن للكسر غير الحقيقي أن يمثّل أكثر من وحدة.'
        }
    },
    {
        id: 'equivalence',
        tone: 'violet',
        icon: '≡',
        color: '#a78bfa',
        title: { eu: 'Baliokidetasuna eta sinplifikazioa', es: 'Equivalencia y simplificación', ar: 'التكافؤ والتبسيط' },
        goal: {
            eu: 'Itxura desberdina duten baina balio bera duten zatikiak identifikatzea.',
            es: 'Reconocer fracciones con distinta apariencia y el mismo valor.',
            ar: 'تمييز الكسور المختلفة في الشكل والمتساوية في القيمة.'
        },
        explanation: {
            eu: 'Zenbakitzailea eta izendatzailea zero ez den zenbaki berarekin biderkatzeak edo zatitzeak ez du balioa aldatzen.',
            es: 'Multiplicar o dividir numerador y denominador por el mismo número distinto de cero no cambia el valor.',
            ar: 'لا تتغيّر القيمة عند ضرب البسط والمقام أو قسمتهما على العدد نفسه غير الصفري.'
        },
        example: '$\\frac{3}{4}=\\frac{6}{8}=\\frac{45}{60}$',
        takeaway: {
            eu: 'Sinplifikatzea baliokidea den zatiki laburrena aurkitzea da.',
            es: 'Simplificar es encontrar la fracción equivalente más reducida.',
            ar: 'التبسيط هو إيجاد الكسر المكافئ في أبسط صورة.'
        }
    },
    {
        id: 'ordering',
        tone: 'mustard',
        icon: '↔',
        color: '#f59e0b',
        title: { eu: 'Konparazioa eta ordena', es: 'Comparación y orden', ar: 'المقارنة والترتيب' },
        goal: {
            eu: 'Zatiki positiboak eta negatiboak estrategia egokiaz ordenatzea.',
            es: 'Ordenar fracciones positivas y negativas eligiendo una estrategia adecuada.',
            ar: 'ترتيب الكسور الموجبة والسالبة باختيار استراتيجية مناسبة.'
        },
        explanation: {
            eu: 'Izendatzaile komuna, biderketa gurutzatua edo zenbaki-zuzena erabil daitezke. Zeinuari begiratu lehenik: zenbaki negatiboa positiboa baino txikiagoa da.',
            es: 'Puedes usar denominador común, productos cruzados o la recta numérica. Observa primero el signo: todo número negativo es menor que uno positivo.',
            ar: 'يمكن استعمال مقام مشترك أو الضرب التبادلي أو خط الأعداد. ابدأ بالإشارة: كل عدد سالب أصغر من أي عدد موجب.'
        },
        example: '$-\\frac{2}{3}<\\frac{1}{4}<\\frac{5}{6}$',
        takeaway: {
            eu: 'Metodoa baino garrantzitsuagoa da konparazioa arrazoitzea.',
            es: 'Más importante que el método es poder justificar la comparación.',
            ar: 'الأهم من الطريقة هو القدرة على تبرير المقارنة.'
        }
    },
    {
        id: 'operations',
        tone: 'coral',
        icon: '±',
        color: '#fb7185',
        title: { eu: 'Eragiketak eta zeinuak', es: 'Operaciones y signos', ar: 'العمليات والإشارات' },
        goal: {
            eu: 'Batuketak, kenketak, biderketak eta zatiketak zehaztasunez egitea.',
            es: 'Resolver sumas, restas, multiplicaciones y divisiones con exactitud.',
            ar: 'حل الجمع والطرح والضرب والقسمة بدقة.'
        },
        explanation: {
            eu: 'Batuketan eta kenketan izendatzaile komuna behar da. Biderketan zuzenean biderkatzen da; zatiketan, bigarren zatikiaren alderantzizkoarekin biderkatzen da.',
            es: 'Para sumar o restar se necesita denominador común. Para multiplicar se opera en línea; para dividir se multiplica por la inversa de la segunda fracción.',
            ar: 'في الجمع والطرح نحتاج إلى مقام مشترك. وفي الضرب نضرب مباشرة، وفي القسمة نضرب في مقلوب الكسر الثاني.'
        },
        example: '$\\frac{1}{3}-\\frac{5}{6}=-\\frac{1}{2}$',
        takeaway: {
            eu: 'Kalkulu bakoitza emaitza sinplifikatuz eta zeinua egiaztatuz amaitu.',
            es: 'Termina cada cálculo simplificando el resultado y comprobando su signo.',
            ar: 'اختم كل عملية بتبسيط النتيجة والتحقق من إشارتها.'
        }
    },
    {
        id: 'proportionality',
        tone: 'green',
        icon: '%',
        color: '#34d399',
        title: { eu: 'Ehunekoak eta proportzionaltasuna', es: 'Porcentajes y proporcionalidad', ar: 'النسب المئوية والتناسب' },
        goal: {
            eu: 'Zatikiak egoera errealetako ehunekoekin eta proportzioekin lotzea.',
            es: 'Relacionar fracciones con porcentajes y proporciones de situaciones reales.',
            ar: 'ربط الكسور بالنسب المئوية والتناسب في مواقف واقعية.'
        },
        explanation: {
            eu: 'Ehunekoa 100 izendatzailea duen zatikia da. Proportzio batean bi arrazoik balio bera dute; horregatik, unitateko balioa edo baliokidetasuna erabil daiteke.',
            es: 'Un porcentaje es una fracción de denominador 100. En una proporción dos razones tienen el mismo valor, por lo que puedes usar el valor unitario o la equivalencia.',
            ar: 'النسبة المئوية كسر مقامه 100. وفي التناسب تكون نسبتان متساويتين، لذلك يمكن استعمال قيمة الوحدة أو التكافؤ.'
        },
        example: '$35\\%=\\frac{35}{100}=\\frac{7}{20}$',
        takeaway: {
            eu: 'Testuinguruan, emaitzaren unitatea eta arrazoizkotasuna ere egiaztatu.',
            es: 'En contexto, comprueba también la unidad y si el resultado es razonable.',
            ar: 'في المسائل السياقية تحقّق أيضًا من الوحدة ومن معقولية النتيجة.'
        }
    }
]

export { theoryTopics, type TheoryTopic } from './lessons.ts'

export const guidedPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'meaning',
        prompt: { eu: 'Idatzi zenbaki misto gisa.', es: 'Escribe como número mixto.', ar: 'اكتب في صورة عدد كسري.' },
        expression: '$\\frac{7}{3}$',
        expected: fraction(7, 3),
        answerForm: 'mixed',
        hint: { eu: 'Zatitu 7 zati 3.', es: 'Divide 7 entre 3.', ar: 'اقسم 7 على 3.' },
        explanation: { eu: 'Bi unitate oso eta heren bat geratzen dira.', es: 'Hay dos unidades completas y queda un tercio.', ar: 'توجد وحدتان كاملتان ويتبقى ثلث.' }
    },
    {
        id: 2,
        stage: 'equivalence',
        prompt: { eu: 'Sinplifikatu.', es: 'Simplifica.', ar: 'بسّط.' },
        expression: '$\\frac{45}{60}$',
        expected: fraction(3, 4),
        answerForm: 'simplified',
        hint: { eu: 'Zatitu biak 15ez.', es: 'Divide ambos términos entre 15.', ar: 'اقسم البسط والمقام على 15.' },
        explanation: { eu: '$45\\div15=3$ eta $60\\div15=4$.', es: '$45\\div15=3$ y $60\\div15=4$.', ar: '$45\\div15=3$ و$60\\div15=4$.' }
    },
    {
        id: 3,
        stage: 'ordering',
        prompt: { eu: 'Zein da txikiena? Idatzi haren balioa.', es: '¿Cuál es la menor? Escribe su valor.', ar: 'ما الكسر الأصغر؟ اكتب قيمته.' },
        expression: '$-\\frac{2}{3},\\;\\frac{1}{4},\\;\\frac{5}{6}$',
        expected: fraction(-2, 3),
        hint: { eu: 'Begiratu zeinuari lehenik.', es: 'Observa primero el signo.', ar: 'انظر أولًا إلى الإشارة.' },
        explanation: { eu: 'Zerrendako balio negatibo bakarra da.', es: 'Es el único valor negativo de la lista.', ar: 'إنه العدد السالب الوحيد في القائمة.' }
    },
    {
        id: 4,
        stage: 'operations',
        prompt: { eu: 'Kalkulatu eta sinplifikatu.', es: 'Calcula y simplifica.', ar: 'احسب وبسّط.' },
        expression: '$\\frac{1}{3}-\\frac{5}{6}$',
        expected: fraction(-1, 2),
        answerForm: 'simplified',
        hint: { eu: 'Idatzi herenak seiren gisa.', es: 'Escribe los tercios como sextos.', ar: 'حوّل الأثلاث إلى أسداس.' },
        explanation: { eu: '$2/6-5/6=-3/6=-1/2$.', es: '$2/6-5/6=-3/6=-1/2$.', ar: '$2/6-5/6=-3/6=-1/2$.' }
    },
    {
        id: 5,
        stage: 'operations',
        prompt: { eu: 'Kalkulatu eta sinplifikatu.', es: 'Calcula y simplifica.', ar: 'احسب وبسّط.' },
        expression: '$-\\frac{2}{5}\\cdot\\frac{15}{8}$',
        expected: fraction(-3, 4),
        answerForm: 'simplified',
        hint: { eu: 'Sinplifikatu gurutzatuta biderkatu aurretik.', es: 'Simplifica en cruz antes de multiplicar.', ar: 'اختصر تبادليًا قبل الضرب.' },
        explanation: { eu: 'Zeinuak negatiboa ematen du eta balioa $-30/40=-3/4$ da.', es: 'El signo es negativo y el valor es $-30/40=-3/4$.', ar: 'الإشارة سالبة والقيمة $-30/40=-3/4$.' }
    },
    {
        id: 6,
        stage: 'operations',
        prompt: { eu: 'Kalkulatu eta sinplifikatu.', es: 'Calcula y simplifica.', ar: 'احسب وبسّط.' },
        expression: '$\\frac{5}{6}\\div\\left(-\\frac{10}{9}\\right)$',
        expected: fraction(-3, 4),
        answerForm: 'simplified',
        hint: { eu: 'Biderkatu bigarren zatikiaren alderantzizkoarekin.', es: 'Multiplica por la inversa de la segunda fracción.', ar: 'اضرب في مقلوب الكسر الثاني.' },
        explanation: { eu: '$5/6\\cdot(-9/10)=-45/60=-3/4$.', es: '$5/6\\cdot(-9/10)=-45/60=-3/4$.', ar: '$5/6\\cdot(-9/10)=-45/60=-3/4$.' }
    },
    {
        id: 7,
        stage: 'proportionality',
        prompt: { eu: 'Kalkulatu 240ren %35.', es: 'Calcula el 35 % de 240.', ar: 'احسب 35٪ من 240.' },
        expected: fraction(84),
        hint: { eu: 'Biderkatu 240 × 35/100.', es: 'Multiplica 240 × 35/100.', ar: 'اضرب 240 × 35/100.' },
        explanation: { eu: '$240\\cdot35/100=84$.', es: '$240\\cdot35/100=84$.', ar: '$240\\cdot35/100=84$.' }
    },
    {
        id: 8,
        stage: 'proportionality',
        prompt: { eu: '3 koaderno 7,50 € badira, zenbat balio dute 5ek?', es: 'Si 3 cuadernos cuestan 7,50 €, ¿cuánto cuestan 5?', ar: 'إذا كان ثمن 3 دفاتر 7.50€، فما ثمن 5؟' },
        expected: fraction(25, 2),
        hint: { eu: 'Aurkitu koaderno baten prezioa.', es: 'Calcula primero el precio de un cuaderno.', ar: 'احسب أولًا ثمن دفتر واحد.' },
        explanation: { eu: '$7,50\\div3=2,50$ eta $2,50\\cdot5=12,50$.', es: '$7,50\\div3=2,50$ y $2,50\\cdot5=12,50$.', ar: '$7.50\\div3=2.50$ ثم $2.50\\cdot5=12.50$.' }
    },
    {
        id: 9,
        stage: 'equivalence',
        prompt: { eu: '$1/3$ eta $0,33$ arteko diferentzia zehatza kalkulatu.', es: 'Calcula la diferencia exacta entre $1/3$ y $0,33$.', ar: 'احسب الفرق الدقيق بين $1/3$ و$0.33$.' },
        expected: fraction(1, 300),
        hint: { eu: '$0,33=33/100$; erabili 300 izendatzailea.', es: '$0,33=33/100$; usa denominador 300.', ar: '$0.33=33/100$؛ استعمل المقام 300.' },
        explanation: { eu: '$1/3-33/100=100/300-99/300=1/300$. Horregatik $0,33$ hurbilketa da.', es: '$1/3-33/100=100/300-99/300=1/300$. Por eso $0,33$ es una aproximación.', ar: '$1/3-33/100=100/300-99/300=1/300$، لذلك $0.33$ قيمة تقريبية.' }
    },
    {
        id: 10,
        stage: 'proportionality',
        prompt: { eu: 'Kalkulurik egin gabe, hurbildu $198$ren $49/100$ hamarreko hurbilenera.', es: 'Sin hacer el cálculo exacto, estima $49/100$ de $198$ a la decena más cercana.', ar: 'من دون حساب دقيق، قدّر $49/100$ من $198$ إلى أقرب عشرة.' },
        expected: fraction(100),
        hint: { eu: '$49/100\\approx1/2$ eta $198\\approx200$.', es: '$49/100\\approx1/2$ y $198\\approx200$.', ar: '$49/100\\approx1/2$ و$198\\approx200$.' },
        explanation: { eu: 'Erdia 200rena 100 da; emaitza zehatza 97,02 da, beraz estimazioa arrazoizkoa da.', es: 'La mitad de 200 es 100; el valor exacto es 97,02, así que la estimación es razonable.', ar: 'نصف 200 هو 100؛ والقيمة الدقيقة 97.02، لذا فالتقدير معقول.' }
    }
]

const auditedChallenges: ChallengeItem[] = [
    {
        id: 104,
        stage: 'equivalence',
        context: 'starter',
        points: 10,
        prompt: { eu: '60 minutuko saio batean 45 minutu erabili dira. Zein zati da?', es: 'En una sesión de 60 minutos se usan 45. ¿Qué fracción representa?', ar: 'استُعملت 45 دقيقة من حصة مدتها 60 دقيقة. ما الكسر؟' },
        expected: fraction(3, 4),
        hint: { eu: 'Idatzi 45/60 eta sinplifikatu.', es: 'Escribe 45/60 y simplifica.', ar: 'اكتب 45/60 ثم بسّط.' },
        explanation: { eu: '$45/60=3/4$.', es: '$45/60=3/4$.', ar: '$45/60=3/4$.' }
    },
    {
        id: 106,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Errezeta baterako 2/3 L behar dira. 2,5 errezeta egiteko, zenbat litro?', es: 'Una receta necesita 2/3 L. ¿Cuántos litros hacen falta para 2,5 recetas?', ar: 'تحتاج الوصفة إلى 2/3 لتر. كم لترًا نحتاج لإعداد 2.5 وصفة؟' },
        expected: fraction(5, 3),
        hint: { eu: 'Biderkatu $2/3\\cdot5/2$.', es: 'Multiplica $2/3\\cdot5/2$.', ar: 'اضرب $2/3\\cdot5/2$.' },
        explanation: { eu: '$2/3\\cdot5/2=5/3$ L.', es: '$2/3\\cdot5/2=5/3$ L.', ar: '$2/3\\cdot5/2=5/3$ لتر.' }
    },
    {
        id: 108,
        stage: 'proportionality',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Ibilbide baten 3/5 21 minutuan egiten dira. Zenbat minutu behar dira osorik?', es: 'Se recorren 3/5 de una ruta en 21 minutos. ¿Cuánto se tarda en completarla?', ar: 'قُطع 3/5 من مسار في 21 دقيقة. كم يستغرق المسار كاملًا؟' },
        expected: fraction(35),
        hint: { eu: 'Aurkitu lehenengo bosten baten denbora.', es: 'Calcula primero el tiempo de un quinto.', ar: 'احسب أولًا زمن الخُمس الواحد.' },
        explanation: { eu: '$21\\div3=7$ eta $7\\cdot5=35$ min.', es: '$21\\div3=7$ y $7\\cdot5=35$ min.', ar: '$21\\div3=7$ ثم $7\\cdot5=35$ دقيقة.' }
    },
    {
        id: 112,
        stage: 'proportionality',
        context: 'master',
        points: 40,
        prompt: {
            eu: 'Ur-biltegi batetik 1/4 erabili da; ondoren, geratzen denaren 1/3; eta gero, geratzen denaren 2/5. Amaieran 1800 L daude. Zenbat zegoen hasieran?',
            es: 'De un depósito se usa 1/4; después, 1/3 de lo que queda; y luego, 2/5 de lo restante. Al final quedan 1800 L. ¿Cuánto había al principio?',
            ar: 'استُعمل ربع خزان، ثم ثلث الباقي، ثم خُمسا ما تبقّى. بقي في النهاية 1800 لتر. كم كانت الكمية في البداية؟'
        },
        expected: fraction(6000),
        hint: { eu: 'Geratzen den zatia $(3/4)(2/3)(3/5)$ da.', es: 'La fracción restante es $(3/4)(2/3)(3/5)$.', ar: 'الكسر المتبقي هو $(3/4)(2/3)(3/5)$.' },
        explanation: { eu: 'Geratzen da $3/10$; beraz, $1800\\div3/10=6000$ L.', es: 'Queda $3/10$; por tanto, $1800\\div3/10=6000$ L.', ar: 'يتبقى $3/10$؛ إذن $1800\\div3/10=6000$ لتر.' }
    }
]

const additionalChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'proportionality',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Baserriak 24 sagar ditu eta uztaren 3/4 bildu dira. Zenbat sagar bildu dira?', es: 'Una granja tiene 24 manzanas y se recogen 3/4 de la cosecha. ¿Cuántas manzanas son?', ar: 'في المزرعة 24 تفاحة، وجُمع 3/4 المحصول. كم تفاحة جُمعت؟' },
        expected: fraction(18),
        hint: { eu: 'Kalkulatu $24\\cdot3/4$.', es: 'Calcula $24\\cdot3/4$.', ar: 'احسب $24\\cdot3/4$.' },
        explanation: { eu: '$24\\div4\\cdot3=18$ sagar.', es: '$24\\div4\\cdot3=18$ manzanas.', ar: '$24\\div4\\cdot3=18$ تفاحة.' }
    },
    {
        id: 102,
        stage: 'operations',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Pizza erdia duzu eta lagun batek beste 1/4 ematen dizu. Zenbat pizza duzu?', es: 'Tienes media pizza y una amiga te da otro cuarto. ¿Cuánta pizza tienes?', ar: 'لديك نصف بيتزا وأعطاك صديق ربعًا آخر. كم لديك؟' },
        expected: fraction(3, 4),
        hint: { eu: 'Bihurtu $1/2$ laurdenetara.', es: 'Convierte $1/2$ en cuartos.', ar: 'حوّل $1/2$ إلى أرباع.' },
        explanation: { eu: '$1/2+1/4=2/4+1/4=3/4$.', es: '$1/2+1/4=2/4+1/4=3/4$.', ar: '$1/2+1/4=2/4+1/4=3/4$.' }
    },
    {
        id: 103,
        stage: 'meaning',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Tarta bat 8 zati berdinetan banatu da eta 3 jan dira. Zer zatiki jan da?', es: 'Una tarta se divide en 8 partes iguales y se comen 3. ¿Qué fracción se ha comido?', ar: 'قُسمت كعكة إلى 8 أجزاء متساوية وأُكلت 3. ما الكسر المأكول؟' },
        expected: fraction(3, 8),
        hint: { eu: 'Jan diren zatiak / zatiak guztira.', es: 'Partes comidas / partes totales.', ar: 'الأجزاء المأكولة / مجموع الأجزاء.' },
        explanation: { eu: '3 zati 8tik: $3/8$.', es: '3 partes de 8: $3/8$.', ar: '3 أجزاء من 8: $3/8$.' }
    },
    {
        id: 105,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Lur baten 1/3 sagarrondoa da eta 1/4 baratzea. Gainerakoaren zer zatiki da larrea?', es: 'De un terreno, 1/3 es manzanal y 1/4 huerta. ¿Qué fracción queda para pasto?', ar: 'خُصص 1/3 أرض لأشجار التفاح و1/4 للحديقة. ما الكسر المتبقي للمرعى؟' },
        expected: fraction(5, 12),
        hint: { eu: 'Kendu $1/3+1/4$ unitatetik.', es: 'Resta $1/3+1/4$ de la unidad.', ar: 'اطرح $1/3+1/4$ من الواحد.' },
        explanation: { eu: '$1-4/12-3/12=5/12$.', es: '$1-4/12-3/12=5/12$.', ar: '$1-4/12-3/12=5/12$.' }
    },
    {
        id: 107,
        stage: 'proportionality',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Ikasleen %60k gainditu du. Zein da zatiki laburtezina?', es: 'El 60 % del alumnado ha aprobado. ¿Cuál es la fracción irreducible?', ar: 'نجح 60٪ من الطلاب. ما الكسر في أبسط صورة؟' },
        expected: fraction(3, 5),
        answerForm: 'simplified',
        hint: { eu: '$60/100$ sinplifikatu.', es: 'Simplifica $60/100$.', ar: 'بسّط $60/100$.' },
        explanation: { eu: '$60/100=3/5$.', es: '$60/100=3/5$.', ar: '$60/100=3/5$.' }
    },
    {
        id: 109,
        stage: 'proportionality',
        context: 'master',
        points: 30,
        prompt: { eu: 'Pilota batek aurreko altueraren 2/3 lortzen du bote bakoitzean. Bigarren botea 8 m bada, zein zen hasierako altuera?', es: 'Una pelota alcanza 2/3 de la altura anterior en cada bote. Si el segundo bote llega a 8 m, ¿cuál era la altura inicial?', ar: 'تصل كرة في كل ارتداد إلى 2/3 الارتفاع السابق. إذا بلغ الارتداد الثاني 8 م، فما الارتفاع الابتدائي؟' },
        expected: fraction(18),
        hint: { eu: 'Egin alderantziz bi aldiz: $8\\div2/3\\div2/3$.', es: 'Trabaja hacia atrás dos veces: $8\\div2/3\\div2/3$.', ar: 'اعمل عكسيًا مرتين: $8\\div2/3\\div2/3$.' },
        explanation: { eu: '$18\\cdot2/3=12$ eta $12\\cdot2/3=8$.', es: '$18\\cdot2/3=12$ y $12\\cdot2/3=8$.', ar: '$18\\cdot2/3=12$ ثم $12\\cdot2/3=8$.' }
    },
    {
        id: 110,
        stage: 'proportionality',
        context: 'master',
        points: 30,
        prompt: { eu: 'Grifo batek 2 ordutan eta besteak 6 ordutan betetzen dute depositua. Zenbat minutu behar dituzte batera?', es: 'Un grifo llena un depósito en 2 horas y otro en 6. ¿Cuántos minutos tardan juntos?', ar: 'يملأ صنبور خزانًا في ساعتين وآخر في 6 ساعات. كم دقيقة يحتاجان معًا؟' },
        expected: fraction(90),
        hint: { eu: 'Orduko erritmoak batu: $1/2+1/6$.', es: 'Suma los ritmos por hora: $1/2+1/6$.', ar: 'اجمع معدلي الملء في الساعة: $1/2+1/6$.' },
        explanation: { eu: 'Batera $2/3$ depositu/ordu; denbora $3/2$ ordu = 90 min.', es: 'Juntos llenan $2/3$ de depósito por hora; tardan $3/2$ h = 90 min.', ar: 'يملآن $2/3$ الخزان في الساعة؛ الزمن $3/2$ ساعة = 90 دقيقة.' }
    },
    {
        id: 111,
        stage: 'proportionality',
        context: 'master',
        points: 30,
        prompt: { eu: 'Soldataren 1/4 alokairuan eta geratzen denaren 1/3 janarian gastatu dira. 600 € geratzen badira, zein zen soldata?', es: 'Se gasta 1/4 del salario en alquiler y 1/3 de lo restante en comida. Si quedan 600 €, ¿cuál era el salario?', ar: 'صُرف 1/4 الراتب على الإيجار و1/3 الباقي على الطعام. إذا بقي 600€، فما الراتب؟' },
        expected: fraction(1200),
        hint: { eu: 'Alokairuaren ondoren $3/4$ geratzen da; horren $2/3$ geratuko da janariaren ondoren.', es: 'Tras el alquiler queda $3/4$; después de la comida queda $2/3$ de esa cantidad.', ar: 'بعد الإيجار يبقى $3/4$، وبعد الطعام يبقى $2/3$ من ذلك.' },
        explanation: { eu: 'Geratzen da $(3/4)(2/3)=1/2$; $600\\div1/2=1200$ €.', es: 'Queda $(3/4)(2/3)=1/2$; $600\\div1/2=1200$ €.', ar: 'يتبقى $(3/4)(2/3)=1/2$؛ $600\\div1/2=1200$ €.' }
    }
]

export const challenges: ChallengeItem[] = [...additionalChallenges, ...auditedChallenges]
    .sort((left, right) => left.id - right.id)
