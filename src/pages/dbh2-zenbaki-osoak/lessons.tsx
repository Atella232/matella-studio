import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { NumberLine, SignRuleFigure, SituationsFigure } from './figures'
import { integerLessonChecks, type IntegerTopicId } from './lessonChecks'
import { integerLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki osoak · 2. DBH — stages and lessons
   Sequence and vocabulary follow the class textbook (3. gaia "Zenbaki osoak"):
   Z and the number line, absolute value and opposite, comparison, sums and
   subtractions (shorthand and brackets), products, quotients and hierarchy.
   ========================================================================== */

export type IntegerStageId = 'integers' | 'absolute' | 'ordering' | 'addsub' | 'muldiv'

export const integerStages: UnitStage[] = [
    { id: 'integers', tone: 'blue', title: { eu: 'Zenbaki osoak', es: 'Los números enteros', en: 'Integers', ar: 'الأعداد الصحيحة' } },
    { id: 'absolute', tone: 'violet', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', en: 'Absolute value and opposite', ar: 'القيمة المطلقة والعدد المعاكس' } },
    { id: 'ordering', tone: 'mustard', title: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', en: 'Comparison and order', ar: 'المقارنة والترتيب' } },
    { id: 'addsub', tone: 'coral', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' } },
    { id: 'muldiv', tone: 'green', title: { eu: 'Biderketak, zatiketak eta hierarkia', es: 'Productos, cocientes y jerarquía', en: 'Products, quotients and order of operations', ar: 'الضرب والقسمة وأولوية العمليات' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'negatives',
        stage: 'integers',
        title: { eu: 'Zertarako dira zenbaki negatiboak?', es: '¿Para qué sirven los números negativos?', en: 'What are negative numbers for?', ar: 'لماذا نحتاج إلى الأعداد السالبة؟' },
        goal: {
            eu: 'Eguneroko egoerak zenbaki positibo eta negatiboekin adieraztea.',
            es: 'Expresar situaciones cotidianas con números positivos y negativos.',
            en: 'Express everyday situations with positive and negative numbers.',
            ar: 'التعبير عن مواقف يومية بأعداد موجبة وسالبة.'
        },
        takeaway: {
            eu: 'Zeinuak zentzua ematen dio kopuruari: zerotik gora (+) ala zerotik behera (−).',
            es: 'El signo da sentido a la cantidad: por encima de cero (+) o por debajo (−).',
            en: 'The sign gives meaning to the amount: above zero (+) or below zero (−).',
            ar: 'تعطي الإشارة معنى للكمية: فوق الصفر (+) أو تحته (−).'
        },
        figure: (language) => <SituationsFigure language={language} />
    },
    {
        id: 'integer-set',
        stage: 'integers',
        title: { eu: 'ℤ multzoa eta zenbakizko zuzena', es: 'El conjunto ℤ y la recta numérica', en: 'The set ℤ and the number line', ar: 'المجموعة ℤ وخط الأعداد' },
        goal: {
            eu: 'Zenbaki osoak sailkatzea eta zenbakizko zuzenean kokatzea.',
            es: 'Clasificar los números enteros y situarlos en la recta numérica.',
            en: 'Classify integers and place them on the number line.',
            ar: 'تصنيف الأعداد الصحيحة ووضعها على خط الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zenbaki oso positiboak', es: 'Enteros positivos', en: 'Positive integers', ar: 'الأعداد الصحيحة الموجبة' }, text: { eu: 'Zeroaren eskuinean daude. + zeinurik gabe ere idazten dira: +5 = 5.', es: 'Están a la derecha del cero. También se escriben sin el signo +: +5 = 5.', en: 'They are to the right of zero. They can also be written without the + sign: +5 = 5.', ar: 'تقع على يمين الصفر، ويمكن كتابتها دون الإشارة +: ⁦+5⁩ = 5.' }, math: '$+1,\\ +2,\\ +3,\\ \\dots$' },
            { title: { eu: 'Zeroa', es: 'El cero', en: 'Zero', ar: 'الصفر' }, text: { eu: 'Ez da ez positiboa ez negatiboa: zuzenaren erdigunea da.', es: 'No es ni positivo ni negativo: es el centro de la recta.', en: 'It is neither positive nor negative: it is the centre of the number line.', ar: 'ليس موجبًا ولا سالبًا: إنه مركز الخط.' }, math: '$0$' },
            { title: { eu: 'Zenbaki oso negatiboak', es: 'Enteros negativos', en: 'Negative integers', ar: 'الأعداد الصحيحة السالبة' }, text: { eu: 'Zeroaren ezkerrean daude, positiboen distantzia berera.', es: 'Están a la izquierda del cero, a la misma distancia que los positivos.', en: 'They are to the left of zero, at the same distance as the positives.', ar: 'تقع على يسار الصفر، بالمسافات نفسها التي للموجبة.' }, math: '$-1,\\ -2,\\ -3,\\ \\dots$' }
        ],
        takeaway: {
            eu: 'Zeroa da zuzenaren erdigunea: ez da positiboa ez negatiboa.',
            es: 'El cero es el centro de la recta: no es positivo ni negativo.',
            en: 'Zero is the centre of the number line: it is neither positive nor negative.',
            ar: 'الصفر هو مركز الخط: ليس موجبًا ولا سالبًا.'
        },
        figure: (language) => <NumberLine min={-7} max={7} braces language={language} />
    },
    {
        id: 'absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' },
        goal: {
            eu: 'Zenbaki oso baten balio absolutua distantzia gisa ulertzea eta kalkulatzea.',
            es: 'Entender el valor absoluto como una distancia y calcularlo.',
            en: 'Understand absolute value as a distance and calculate it.',
            ar: 'فهم القيمة المطلقة كمسافة وحسابها.'
        },
        takeaway: {
            eu: 'Balio absolutuak «zenbat urrun» esaten du, ez «zein aldetara».',
            es: 'El valor absoluto dice «a qué distancia», no «hacia qué lado».',
            en: 'The absolute value tells you “how far”, not “which way”.',
            ar: 'القيمة المطلقة تخبرنا «كم يبعد» العدد، لا «في أي جهة».'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -5, tone: 'second' }, { value: 4 }]} spans={[{ from: 0, to: -5, tone: 'second', label: '|−5| = 5' }, { from: 0, to: 4, label: '|+4| = 4' }]} />
    },
    {
        id: 'opposite',
        stage: 'absolute',
        title: { eu: 'Zenbaki oso baten aurkakoa', es: 'El opuesto de un número entero', en: 'The opposite of an integer', ar: 'معاكس عدد صحيح' },
        goal: {
            eu: 'Aurkakoa aurkitzea eta balio absolutuarekin lotzea.',
            es: 'Encontrar el opuesto y relacionarlo con el valor absoluto.',
            en: 'Find the opposite and relate it to the absolute value.',
            ar: 'إيجاد المعاكس وربطه بالقيمة المطلقة.'
        },
        takeaway: {
            eu: 'Aurkakoa = zeinua aldatu. Zenbaki bat gehi bere aurkakoa = 0.',
            es: 'Opuesto = cambiar el signo. Un número más su opuesto = 0.',
            en: 'Opposite = change the sign. A number plus its opposite = 0.',
            ar: 'المعاكس = تغيير الإشارة. العدد زائد معاكسه = 0.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -5, tone: 'second', label: '−5' }, { value: 5, label: '+5' }]} spans={[{ from: 0, to: -5, tone: 'second', label: '5' }, { from: 0, to: 5, label: '5' }]} />
    },
    {
        id: 'compare',
        stage: 'ordering',
        title: { eu: 'Zenbaki osoak alderatzea', es: 'Comparar números enteros', en: 'Compare integers', ar: 'مقارنة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso < edo > ikurrekin alderatzea eta arrazoitzea.',
            es: 'Comparar dos enteros con < o > y justificarlo.',
            en: 'Compare two integers using < or > and justify it.',
            ar: 'مقارنة عددين صحيحين بالرمزين < أو > وتبرير ذلك.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa eta negatiboa', es: 'Positivo y negativo', en: 'Positive and negative', ar: 'موجب وسالب' }, text: { eu: 'Edozein positibo edozein negatibo baino handiagoa da.', es: 'Cualquier positivo es mayor que cualquier negativo.', en: 'Any positive is greater than any negative.', ar: 'كل عدد موجب أكبر من أي عدد سالب.' }, math: '$-5<+3$' },
            { title: { eu: 'Zeroa', es: 'El cero', en: 'Zero', ar: 'الصفر' }, text: { eu: 'Zeroa negatibo guztiak baino handiagoa da, eta positibo guztiak baino txikiagoa.', es: 'El cero es mayor que todos los negativos y menor que todos los positivos.', en: 'Zero is greater than all the negatives and less than all the positives.', ar: 'الصفر أكبر من كل الأعداد السالبة وأصغر من كل الموجبة.' }, math: '$-3<0<+2$' },
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: 'Balio absolutu handienekoa da handiena.', es: 'Es mayor el de mayor valor absoluto.', en: 'The one with the greater absolute value is the greater.', ar: 'الأكبر هو صاحب القيمة المطلقة الأكبر.' }, math: '$+3<+5$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: 'Balio absolutu txikienekoa da handiena: zerotik hurbilago dago.', es: 'Es mayor el de menor valor absoluto: está más cerca del cero.', en: 'The one with the smaller absolute value is the greater: it is closer to zero.', ar: 'الأكبر هو صاحب القيمة المطلقة الأصغر: إنه أقرب إلى الصفر.' }, math: '$-4<-2$' }
        ],
        takeaway: {
            eu: 'Negatiboetan, zerotik hurbilago dagoena da handiena: −2 > −4.',
            es: 'Entre negativos, el más cercano al cero es el mayor: −2 > −4.',
            en: 'Between negatives, the one closest to zero is the greater: −2 > −4.',
            ar: 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر: ⁦−2⁩ > ⁦−4⁩.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -4, tone: 'second', label: '−4' }, { value: -2, label: '−2' }]} caption="−4 < −2" />
    },
    {
        id: 'order',
        stage: 'ordering',
        figureAfterSteps: true,
        title: { eu: 'Zenbaki osoak ordenatzea', es: 'Ordenar números enteros', en: 'Order integers', ar: 'ترتيب الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoen zerrenda bat txikienetik handienera eta alderantziz ordenatzea.',
            es: 'Ordenar una lista de enteros de menor a mayor y al revés.',
            en: 'Order a list of integers from smallest to largest and the other way round.',
            ar: 'ترتيب قائمة من الأعداد الصحيحة تصاعديًا وتنازليًا.'
        },
        problem: { eu: 'Ordenatu handienetik txikienera: $+4$, $-10$, $+9$, $-6$, $0$, $+3$, $-8$.', es: 'Ordena de mayor a menor: $+4$, $-10$, $+9$, $-6$, $0$, $+3$, $-8$.', en: 'Order from largest to smallest: $+4$, $-10$, $+9$, $-6$, $0$, $+3$, $-8$.', ar: 'رتّب من الأكبر إلى الأصغر: $+4$، $-10$، $+9$، $-6$، $0$، $+3$، $-8$.' },
        steps: [
            { text: { eu: 'Banatu positiboak alde batean eta negatiboak bestean; zeroa erdian.', es: 'Separa los positivos a un lado y los negativos al otro; el cero, en medio.', en: 'Separate the positives to one side and the negatives to the other; zero goes in the middle.', ar: 'افصل الموجبة في جهة والسالبة في جهة أخرى، والصفر في الوسط.' }, math: '$+4,\\,+9,\\,+3\\quad\\mid\\quad 0\\quad\\mid\\quad -10,\\,-6,\\,-8$' },
            { text: { eu: 'Ordenatu positiboak zenbaki arruntak bezala.', es: 'Ordena los positivos como números naturales.', en: 'Order the positives as natural numbers.', ar: 'رتّب الموجبة كالأعداد الطبيعية.' }, math: '$+9>+4>+3$' },
            { text: { eu: 'Ordenatu negatiboak: balio absolutu txikienekoa da handiena.', es: 'Ordena los negativos: el de menor valor absoluto es el mayor.', en: 'Order the negatives: the one with the smaller absolute value is the greater.', ar: 'رتّب السالبة: صاحب القيمة المطلقة الأصغر هو الأكبر.' }, math: '$-6>-8>-10$' },
            { text: { eu: 'Elkartu dena: positiboak, zeroa eta negatiboak.', es: 'Júntalo todo: positivos, cero y negativos.', en: 'Put it all together: positives, zero and negatives.', ar: 'اجمع الكل: الموجبة ثم الصفر ثم السالبة.' }, math: '$+9>+4>+3>0>-6>-8>-10$' }
        ],
        takeaway: {
            eu: 'Txikienetik handienera: lehenengo negatiboak. Handienetik txikienera: lehenengo positiboak.',
            es: 'De menor a mayor: primero los negativos. De mayor a menor: primero los positivos.',
            en: 'From smallest to largest: first the negatives. From largest to smallest: first the positives.',
            ar: 'تصاعديًا: السالبة أولًا. تنازليًا: الموجبة أولًا.'
        },
        figure: () => <NumberLine min={-10} max={10} points={[-10, -8, -6, 0, 3, 4, 9].map((value) => ({ value, tone: value < 0 ? 'second' as const : 'stage' as const }))} />
    },
    {
        id: 'add',
        stage: 'addsub',
        title: { eu: 'Bi zenbaki osoren batuketa', es: 'Suma de dos números enteros', en: 'Adding two integers', ar: 'جمع عددين صحيحين' },
        goal: {
            eu: 'Zeinu bereko eta zeinu desberdineko zenbakiak batzea.',
            es: 'Sumar enteros del mismo signo y de distinto signo.',
            en: 'Adding integers with the same sign and with different signs.',
            ar: 'جمع أعداد صحيحة لها الإشارة نفسها أو إشارات مختلفة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinu bereko zenbakiak', es: 'Números del mismo signo', en: 'Numbers with the same sign', ar: 'عددان لهما الإشارة نفسها' }, text: { eu: 'Batu balio absolutuak eta jarri zenbakien zeinu bera.', es: 'Suma los valores absolutos y pon el mismo signo de los números.', en: 'Add the absolute values and use the same sign as the numbers.', ar: 'اجمع القيمتين المطلقتين وضع الإشارة نفسها.' }, math: '$(-2)+(-4)=-(2+4)=-6$' },
            { title: { eu: 'Zeinu desberdineko zenbakiak', es: 'Números de distinto signo', en: 'Numbers with different signs', ar: 'عددان مختلفا الإشارة' }, text: { eu: 'Balio absolutu handienari txikiena kendu, eta jarri balio absolutu handiena duenaren zeinua.', es: 'Al valor absoluto mayor réstale el menor y pon el signo del que tiene mayor valor absoluto.', en: 'Subtract the smaller absolute value from the greater one, and use the sign of the number with the greater absolute value.', ar: 'اطرح القيمة المطلقة الصغرى من الكبرى وضع إشارة صاحب القيمة المطلقة الأكبر.' }, math: '$(-8)+(+2)=-(8-2)=-6$' }
        ],
        takeaway: {
            eu: 'Zeinu bera: batu eta zeinua mantendu. Zeinu desberdina: kendu eta handienaren zeinua jarri.',
            es: 'Mismo signo: suma y conserva el signo. Distinto signo: resta y pon el signo del mayor.',
            en: 'Same sign: add and keep the sign. Different signs: subtract and use the sign of the one with the larger absolute value.',
            ar: 'الإشارة نفسها: اجمع واحتفظ بالإشارة. إشارتان مختلفتان: اطرح وضع إشارة الأكبر.'
        },
        figure: () => <NumberLine min={-9} max={3} jumps={[{ from: 0, to: -8, tone: 'second', label: '−8', row: 1 }, { from: -8, to: -6, label: '+2' }]} points={[{ value: -6 }]} caption="(−8) + (+2) = −6" />
    },
    {
        id: 'subtract',
        stage: 'addsub',
        title: { eu: 'Kenketa: aurkakoa batu', es: 'Resta: sumar el opuesto', en: 'Subtraction: adding the opposite', ar: 'الطرح: جمع المعاكس' },
        goal: {
            eu: 'Zenbaki osoen kenketa batuketa bihurtzea.',
            es: 'Convertir una resta de enteros en una suma.',
            en: 'Turn a subtraction of integers into an addition.',
            ar: 'تحويل طرح الأعداد الصحيحة إلى جمع.'
        },
        takeaway: {
            eu: 'Kentzea = aurkakoa batzea.',
            es: 'Restar = sumar el opuesto.',
            en: 'Subtract = add the opposite.',
            ar: 'الطرح = جمع المعاكس.'
        },
        figure: () => <NumberLine min={-4} max={6} jumps={[{ from: 0, to: 4, label: '+4', row: 1 }, { from: 4, to: -3, tone: 'second', label: '−7' }]} points={[{ value: -3, tone: 'second' }]} caption="(+4) − (+7) = (+4) + (−7) = −3" />
    },
    {
        id: 'shorthand',
        stage: 'addsub',
        title: { eu: 'Modu laburtua: parentesiak kentzea', es: 'Forma abreviada: quitar paréntesis', en: 'Short form: removing brackets', ar: 'الصيغة المختصرة: حذف الأقواس' },
        goal: {
            eu: 'Batuketa eta kenketa kateak parentesirik gabe idaztea eta kalkulatzea.',
            es: 'Escribir y calcular cadenas de sumas y restas sin paréntesis.',
            en: 'Write and calculate chains of additions and subtractions without brackets.',
            ar: 'كتابة سلاسل الجمع والطرح دون أقواس وحسابها.'
        },
        steps: [
            { title: { eu: '1. araua · Lehen batugaia', es: 'Regla 1 · Primer sumando', en: 'Rule 1 · First addend', ar: 'القاعدة 1 · الحد الأول' }, text: { eu: 'Lehen batugaiari parentesiak kentzen zaizkio. Positiboa bada, zeinurik gabe idazten da.', es: 'Al primer sumando se le quitan los paréntesis. Si es positivo, se escribe sin signo.', en: 'The brackets are removed from the first addend. If it is positive, it is written without a sign.', ar: 'نحذف أقواس الحد الأول، وإذا كان موجبًا نكتبه دون إشارة.' }, math: '$(+3)+(-7)=3+(-7)$' },
            { title: { eu: '2. araua · Aurretik +', es: 'Regla 2 · Precedido de +', en: 'Rule 2 · Preceded by +', ar: 'القاعدة 2 · تسبقه +' }, text: { eu: 'Aurretik + duen parentesia kentzean, zenbakiak bere zeinua mantentzen du.', es: 'Al quitar un paréntesis precedido de +, el número conserva su signo.', en: 'When you remove brackets preceded by +, the number keeps its sign.', ar: 'عند حذف قوس تسبقه + يحتفظ العدد بإشارته.' }, math: '$(-4)+(-8)=-4-8$' },
            { title: { eu: '3. araua · Aurretik −', es: 'Regla 3 · Precedido de −', en: 'Rule 3 · Preceded by −', ar: 'القاعدة 3 · تسبقه −' }, text: { eu: 'Aurretik − duen parentesia kentzean, aurkakoaren zeinua idazten da.', es: 'Al quitar un paréntesis precedido de −, se escribe el signo del opuesto.', en: 'When you remove brackets preceded by −, write the sign of the opposite.', ar: 'عند حذف قوس تسبقه − نكتب إشارة المعاكس.' }, math: '$(+3)-(-4)=3+4$' },
            { title: { eu: 'Azkenik, kalkulatu', es: 'Por último, calcula', en: 'Finally, calculate', ar: 'أخيرًا، احسب' }, text: { eu: 'Batu positiboak alde batetik eta negatiboak bestetik, eta kendu lehen emaitzari bigarrena.', es: 'Suma los positivos por un lado y los negativos por otro, y resta el segundo resultado al primero.', en: 'Add the positives on one side and the negatives on the other, and subtract the second result from the first.', ar: 'اجمع الموجبة معًا والسالبة معًا، ثم اطرح الناتج الثاني من الأول.' }, math: '$3+9+4-7-5-2=16-14=2$' }
        ],
        takeaway: {
            eu: 'Zeinu berdinak elkarren ondoan: +. Zeinu desberdinak: −.',
            es: 'Signos iguales juntos: +. Signos distintos: −.',
            en: 'Same signs together: +. Different signs: −.',
            ar: 'إشارتان متشابهتان متجاورتان: +. إشارتان مختلفتان: −.'
        }
    },
    {
        id: 'brackets',
        stage: 'addsub',
        title: { eu: 'Parentesidun batuketak eta kenketak', es: 'Sumas y restas con paréntesis', en: 'Additions and subtractions with brackets', ar: 'الجمع والطرح مع الأقواس' },
        goal: {
            eu: 'Parentesiak dituzten batuketa eta kenketak ordena egokian egitea.',
            es: 'Resolver sumas y restas con paréntesis en el orden correcto.',
            en: 'Solve additions and subtractions with brackets in the right order.',
            ar: 'حل عمليات الجمع والطرح ذات الأقواس بالترتيب الصحيح.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Lehenik barrukoa', es: 'Primero lo de dentro', en: 'First the part inside', ar: 'الداخل أولًا' }, text: { eu: 'Egin parentesi barruko eragiketak eta utzi emaitza parentesi artean. Gero kendu parentesiak eta kalkulatu.', es: 'Haz las operaciones de dentro y deja el resultado entre paréntesis. Después quita los paréntesis y calcula.', en: 'Do the operations inside and leave the result in brackets. Then remove the brackets and calculate.', ar: 'أجرِ العمليات داخل الأقواس واترك النتيجة بين قوسين، ثم احذف الأقواس واحسب.' }, math: '$6-(-3+2)=6-(-1)=6+1=7$' },
            { title: { eu: 'Parentesiak kenduz', es: 'Quitando paréntesis', en: 'Removing brackets', ar: 'بحذف الأقواس' }, text: { eu: 'Kendu parentesiak hasieratik. Aurretik − badago, barruko zeinu guztiak aldatzen dira.', es: 'Quita los paréntesis desde el principio. Si van precedidos de −, cambian todos los signos de dentro.', en: 'Remove the brackets from the start. If they are preceded by −, all the signs inside change.', ar: 'احذف الأقواس من البداية. إذا سبقتها − تتغيّر كل الإشارات داخلها.' }, math: '$6-(-3+2)=6+3-2=7$' }
        ],
        takeaway: {
            eu: 'Parentesi baten aurrean − badago, barruko zeinu guztiak aldatzen dira.',
            es: 'Si delante de un paréntesis hay un −, cambian todos los signos de dentro.',
            en: 'If there is a − in front of a bracket, all the signs inside change.',
            ar: 'إذا سبقت القوسَ إشارة − تتغيّر كل الإشارات داخله.'
        }
    },
    {
        id: 'multiply-divide',
        stage: 'muldiv',
        title: { eu: 'Biderketa eta zatiketa: zeinuen araua', es: 'Producto y cociente: regla de los signos', en: 'Product and quotient: rule of signs', ar: 'الضرب والقسمة: قاعدة الإشارات' },
        goal: {
            eu: 'Zenbaki osoak biderkatzea eta zatitzea zeinuen araua erabiliz.',
            es: 'Multiplicar y dividir enteros usando la regla de los signos.',
            en: 'Multiply and divide integers using the rule of signs.',
            ar: 'ضرب الأعداد الصحيحة وقسمتها باستعمال قاعدة الإشارات.'
        },
        steps: [
            { text: { eu: 'Biderkatu edo zatitu balio absolutuak.', es: 'Multiplica o divide los valores absolutos.', en: 'Multiply or divide the absolute values.', ar: 'اضرب القيمتين المطلقتين أو اقسمهما.' }, math: '$\\lvert -12\\rvert \\mathbin{:}\\lvert -4\\rvert =12\\mathbin{:}4=3$' },
            { text: { eu: 'Jarri zeinua: + bi zenbakiek zeinu bera badute; − zeinu desberdina badute.', es: 'Pon el signo: + si los dos tienen el mismo signo; − si tienen signos distintos.', en: 'Write the sign: + if both have the same sign; − if they have different signs.', ar: 'ضع الإشارة: + إذا كانت للعددين الإشارة نفسها، و− إذا اختلفت إشارتاهما.' }, math: '$(-12)\\mathbin{:}(-4)=+3\\qquad (-3)\\cdot(+5)=-15$' },
            { title: { eu: 'Hainbat faktore', es: 'Varios factores', en: 'Several factors', ar: 'عدة عوامل' }, text: { eu: 'Faktore gehiago badaude, egin ezkerretik eskuinera, edo zenbatu negatiboak: kopurua bikoitia bada, emaitza positiboa da.', es: 'Si hay más factores, opera de izquierda a derecha, o cuenta los negativos: si hay un número par, el resultado es positivo.', en: 'If there are more factors, work from left to right, or count the negatives: if there is an even number of them, the result is positive.', ar: 'إذا كانت هناك عوامل أكثر، احسب من اليسار إلى اليمين، أو عُدّ العوامل السالبة: إذا كان عددها زوجيًا فالنتيجة موجبة.' }, math: '$(-2)\\cdot(-3)\\cdot(-1)=-6$' }
        ],
        takeaway: {
            eu: 'Zeinu bera → +. Zeinu desberdina → −.',
            es: 'Mismo signo → +. Distinto signo → −.',
            en: 'Same sign → +. Different signs → −.',
            ar: 'الإشارة نفسها ← +. إشارتان مختلفتان ← −.'
        },
        figure: (language) => <SignRuleFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'muldiv',
        title: { eu: 'Eragiketa konbinatuak eta kako zuzenak', es: 'Operaciones combinadas y corchetes', en: 'Combined operations and square brackets', ar: 'العمليات المركبة والأقواس المعقوفة' },
        goal: {
            eu: 'Eragiketa konbinatuak hierarkia errespetatuz ebaztea.',
            es: 'Resolver operaciones combinadas respetando la jerarquía.',
            en: 'Solve combined operations following the order of operations.',
            ar: 'حل العمليات المركبة مع احترام أولوية العمليات.'
        },
        problem: { eu: 'Kalkulatu $(-4)-[(-8)-(+2)]\\mathbin{:}(-5)+(-6)\\mathbin{:}[(+1)-(-2)]$.', es: 'Calcula $(-4)-[(-8)-(+2)]\\mathbin{:}(-5)+(-6)\\mathbin{:}[(+1)-(-2)]$.', en: 'Calculate $(-4)-[(-8)-(+2)]\\mathbin{:}(-5)+(-6)\\mathbin{:}[(+1)-(-2)]$.', ar: 'احسب $(-4)-[(-8)-(+2)]\\mathbin{:}(-5)+(-6)\\mathbin{:}[(+1)-(-2)]$.' },
        steps: [
            { title: { eu: 'Parentesiak eta kakoak', es: 'Paréntesis y corchetes', en: 'Brackets and square brackets', ar: 'الأقواس' }, text: { eu: 'Parentesi eta kako zuzenen barruko eragiketak, barrutik kanpora.', es: 'Las operaciones dentro de paréntesis y corchetes, de dentro hacia fuera.', en: 'Operations inside brackets and square brackets, from the inside out.', ar: 'العمليات داخل الأقواس والأقواس المعقوفة، من الداخل إلى الخارج.' }, math: '$[(-8)-(+2)]=-10$' },
            { title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', en: 'Multiplying and dividing', ar: 'الضرب والقسمة' }, text: { eu: 'Agertzen diren ordenan, ezkerretik eskuinera.', es: 'En el orden en que aparecen, de izquierda a derecha.', en: 'In the order they appear, from left to right.', ar: 'حسب ترتيب ظهورها، من اليسار إلى اليمين.' }, math: '$(-10)\\mathbin{:}(-5)=+2$' },
            { title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' }, text: { eu: 'Azkenik, horiek ere ezkerretik eskuinera.', es: 'Por último, también de izquierda a derecha.', en: 'Finally, also from left to right.', ar: 'أخيرًا، من اليسار إلى اليمين أيضًا.' }, math: '$(-4)-(+2)+(-2)=-8$' }
        ],
        takeaway: {
            eu: 'Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.',
            es: 'Paréntesis → productos y cocientes → sumas y restas.',
            en: 'Brackets → products and quotients → additions and subtractions.',
            ar: 'الأقواس ← الضرب والقسمة ← الجمع والطرح.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const integerTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...integerLessonTexts[topic.id as IntegerTopicId], ...integerLessonChecks[topic.id as IntegerTopicId] }))
