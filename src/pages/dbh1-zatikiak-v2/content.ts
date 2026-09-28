import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'

/* ==========================================================================
   Zatikiak · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges. Exercises follow Santillana 1.º ESO unit 3 (cheese boxes,
   sponge cakes, the garrafa, the stickers) and Anaya units 7 and 8
   (fraction of a quantity, the part that is left). Only positive
   fractions. Division is written with ':' as in class; @LCM becomes MKT
   or m.c.m.
   ========================================================================== */

/** Text per language; formulas inside may use the @LCM/@GCD notation */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu: notation(eu).eu, es: notation(es).es, ar: notation(ar).ar })
const same = (value: string): LocalizedText => notation(value)

export const fractionsIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1001,
        prompt: say('Pizza bat 8 zati berdinetan moztu da eta 3 jan dira. Zer zatiki jan da?', 'Una pizza se ha cortado en 8 partes iguales y se han comido 3. ¿Qué fracción se ha comido?', 'قُطّعت بيتزا إلى 8 أجزاء متساوية وأُكل 3. ما الكسر الذي أُكل؟'),
        options: [same('$\\frac{8}{3}$'), same('$\\frac{3}{8}$'), same('$\\frac{5}{8}$')],
        correctIndex: 1,
        explanation: say('Izendatzailea: 8 zati guztira. Zenbakitzailea: 3 jan dira. $\\frac{5}{8}$ geratzen dena da.', 'Denominador: 8 partes en total. Numerador: se han comido 3. $\\frac{5}{8}$ es lo que queda.', 'المقام: 8 أجزاء في المجموع. البسط: أُكل 3. أما $\\frac{5}{8}$ فهو المتبقي.'),
        topic: 'what'
    },
    {
        id: 1002,
        prompt: say('Zenbat balio du $\\frac{3}{4}$ zatikiak?', '¿Cuánto vale la fracción $\\frac{3}{4}$?', 'كم قيمة الكسر $\\frac{3}{4}$؟'),
        options: [same('$0{,}34$'), same('$1{,}33$'), same('$0{,}75$')],
        correctIndex: 2,
        explanation: say('$3\\mathbin{:}4=0{,}75$. Zatikia zenbakitzailea zati izendatzailea da.', '$3\\mathbin{:}4=0{,}75$. La fracción es el numerador entre el denominador.', '$3\\mathbin{:}4=0.75$. الكسر هو البسط مقسومًا على المقام.'),
        topic: 'division'
    },
    {
        id: 1003,
        prompt: say('Zein zatiki da 1 baino handiagoa?', '¿Qué fracción es mayor que 1?', 'أي كسر أكبر من 1؟'),
        options: [same('$\\frac{7}{9}$'), same('$\\frac{9}{7}$'), same('$\\frac{7}{7}$')],
        correctIndex: 1,
        explanation: say('$\\frac{9}{7}$ inpropioa da: zenbakitzailea izendatzailea baino handiagoa da. $\\frac{7}{7}=1$.', '$\\frac{9}{7}$ es impropia: el numerador es mayor que el denominador. $\\frac{7}{7}=1$.', '$\\frac{9}{7}$ غير حقيقي: البسط أكبر من المقام. و$\\frac{7}{7}=1$.'),
        topic: 'types'
    },
    {
        id: 1004,
        prompt: say('Nola idazten da $\\frac{11}{4}$ zenbaki misto gisa?', '¿Cómo se escribe $\\frac{11}{4}$ como número mixto?', 'كيف يُكتب $\\frac{11}{4}$ عددًا كسريًا؟'),
        options: [same('$2\\frac{3}{4}$'), same('$3\\frac{2}{4}$'), same('$1\\frac{1}{4}$')],
        correctIndex: 0,
        explanation: same('$11=4\\cdot 2+3$, $\\frac{11}{4}=2\\frac{3}{4}$'),
        topic: 'mixed'
    },
    {
        id: 1005,
        prompt: say('Zein da $\\frac{2}{5}$ zatikiaren baliokidea?', '¿Cuál es equivalente a $\\frac{2}{5}$?', 'أي كسر يكافئ $\\frac{2}{5}$؟'),
        options: [same('$\\frac{4}{7}$'), same('$\\frac{6}{15}$'), same('$\\frac{5}{2}$')],
        correctIndex: 1,
        explanation: say('$2\\cdot 15=30$ eta $5\\cdot 6=30$: biderkadura gurutzatuak berdinak dira. $\\frac{4}{7}$-n bi gaiei 2 batu zaie, ez biderkatu.', '$2\\cdot 15=30$ y $5\\cdot 6=30$: los productos cruzados son iguales. En $\\frac{4}{7}$ se ha sumado 2 a los dos términos, no multiplicado.', '$2\\cdot 15=30$ و$5\\cdot 6=30$: الضرب التبادلي متساوٍ. وفي $\\frac{4}{7}$ أُضيف 2 إلى الحدّين بدل الضرب.'),
        topic: 'equivalent'
    },
    {
        id: 1006,
        prompt: say('Zein da handiena?', '¿Cuál es la mayor?', 'أيها الأكبر؟'),
        options: [same('$\\frac{2}{3}$'), same('$\\frac{3}{4}$'), same('$\\frac{1}{2}$')],
        correctIndex: 1,
        explanation: same('$\\frac{2}{3}=\\frac{8}{12}$, $\\frac{3}{4}=\\frac{9}{12}$, $\\frac{1}{2}=\\frac{6}{12}$'),
        topic: 'compare'
    },
    {
        id: 1007,
        prompt: say('Zenbat da $\\frac{1}{2}+\\frac{1}{4}$?', '¿Cuánto es $\\frac{1}{2}+\\frac{1}{4}$?', 'كم يساوي $\\frac{1}{2}+\\frac{1}{4}$؟'),
        options: [same('$\\frac{2}{6}$'), same('$\\frac{3}{4}$'), same('$\\frac{1}{6}$')],
        correctIndex: 1,
        explanation: say('$\\frac{1}{2}=\\frac{2}{4}$, beraz $\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$. Izendatzaileak ez dira batzen.', '$\\frac{1}{2}=\\frac{2}{4}$, así que $\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$. Los denominadores no se suman.', '$\\frac{1}{2}=\\frac{2}{4}$، إذن $\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$. لا نجمع المقامات.'),
        topic: 'add-different'
    },
    {
        id: 1008,
        prompt: say('Zenbat da 20ren $\\frac{3}{4}$?', '¿Cuánto es $\\frac{3}{4}$ de 20?', 'كم يساوي $\\frac{3}{4}$ من 20؟'),
        options: [same('$15$'), same('$5$'), same('$12$')],
        correctIndex: 0,
        explanation: say('$20\\mathbin{:}4=5$ eta $5\\cdot 3=15$. 5 laurden bat da.', '$20\\mathbin{:}4=5$ y $5\\cdot 3=15$. 5 es solo un cuarto.', '$20\\mathbin{:}4=5$ و$5\\cdot 3=15$. أما 5 فهو ربع واحد فقط.'),
        topic: 'fraction-of'
    }
]

const calculate = (latex: string): LocalizedText => say(`Kalkulatu eta sinplifikatu: ${latex}`, `Calcula y simplifica: ${latex}`, `احسب وبسّط: ${latex}`)

export const fractionsIntroPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'meaning',
        prompt: say('Gazta-kutxa batek 8 zati ditu eta Jonek 3 jan ditu. Zer zatiki geratzen da kutxan?', 'Una caja de quesitos tiene 8 porciones y Juan se ha comido 3. ¿Qué fracción queda en la caja?', 'في علبة جبن 8 قطع وأكل خوان 3. ما الكسر المتبقي في العلبة؟'),
        expected: fraction(5, 8),
        hint: say('Zenbat zati geratzen dira? Eta guztira zenbat?', '¿Cuántas porciones quedan? ¿Y cuántas hay en total?', 'كم قطعة بقيت؟ وكم في المجموع؟'),
        explanation: same('$8-3=5$, $\\frac{5}{8}$')
    },
    {
        id: 2,
        stage: 'meaning',
        prompt: say('Idatzi zenbaki gisa «bost zortziren» zatikia.', 'Escribe con números la fracción «cinco octavos».', 'اكتب بالأرقام الكسر «خمسة أثمان».'),
        expected: fraction(5, 8),
        answerForm: 'simplified',
        hint: say('Zenbakitzailea: bost. Izendatzailea: zortzi.', 'Numerador: cinco. Denominador: ocho.', 'البسط: خمسة. المقام: ثمانية.'),
        explanation: same('$\\frac{5}{8}$')
    },
    {
        id: 3,
        stage: 'meaning',
        prompt: say('Kalkulatu $\\frac{9}{15}$ zatikiaren balioa zenbaki hamartar gisa.', 'Calcula el valor de $\\frac{9}{15}$ como número decimal.', 'احسب قيمة $\\frac{9}{15}$ عددًا عشريًا.'),
        expected: fraction(3, 5),
        hint: say('Zatitu zenbakitzailea izendatzaileaz.', 'Divide el numerador entre el denominador.', 'اقسم البسط على المقام.'),
        explanation: say('$9\\mathbin{:}15=0{,}6$', '$9\\mathbin{:}15=0{,}6$', '$9\\mathbin{:}15=0.6$')
    },
    {
        id: 4,
        stage: 'meaning',
        prompt: say('3 pizza 4 lagunen artean banatu dira zati berdinetan. Zenbat pizza jan du bakoitzak?', 'Se reparten 3 pizzas entre 4 personas a partes iguales. ¿Cuánta pizza come cada una?', 'وُزّعت 3 بيتزا على 4 أشخاص بالتساوي. كم بيتزا يأكل كل واحد؟'),
        expected: fraction(3, 4),
        hint: say('Banatzea = zatitzea: $3\\mathbin{:}4$.', 'Repartir = dividir: $3\\mathbin{:}4$.', 'التوزيع = القسمة: $3\\mathbin{:}4$.'),
        explanation: say('$3\\mathbin{:}4=\\frac{3}{4}=0{,}75$ pizza.', '$3\\mathbin{:}4=\\frac{3}{4}=0{,}75$ pizzas.', '$3\\mathbin{:}4=\\frac{3}{4}=0.75$ بيتزا.')
    },
    {
        id: 5,
        stage: 'types',
        prompt: say('Idatzi $\\frac{17}{5}$ zenbaki misto gisa.', 'Escribe $\\frac{17}{5}$ como número mixto.', 'اكتب $\\frac{17}{5}$ عددًا كسريًا.'),
        expected: fraction(17, 5),
        answerForm: 'mixed',
        hint: say('Zatitu 17 : 5. Zatidura unitateak dira; hondarra, zenbakitzaile berria.', 'Divide 17 : 5. El cociente son las unidades; el resto, el nuevo numerador.', 'اقسم 17 : 5. الناتج هو الوحدات، والباقي هو البسط الجديد.'),
        explanation: same('$17=5\\cdot 3+2$, $\\frac{17}{5}=3\\frac{2}{5}$')
    },
    {
        id: 6,
        stage: 'types',
        prompt: say('Idatzi $2\\frac{1}{3}$ zatiki gisa.', 'Escribe $2\\frac{1}{3}$ como fracción.', 'اكتب $2\\frac{1}{3}$ كسرًا.'),
        expected: fraction(7, 3),
        answerForm: 'simplified',
        hint: say('Biderkatu unitateak izendatzaileaz eta batu zenbakitzailea.', 'Multiplica las unidades por el denominador y suma el numerador.', 'اضرب الوحدات في المقام وأضف البسط.'),
        explanation: same('$2\\frac{1}{3}=\\frac{2\\cdot 3+1}{3}=\\frac{7}{3}$')
    },
    {
        id: 7,
        stage: 'types',
        prompt: say('Zenbat unitate oso ditu $\\frac{23}{6}$ zatikiak?', '¿Cuántas unidades completas contiene $\\frac{23}{6}$?', 'كم وحدة كاملة في $\\frac{23}{6}$؟'),
        expected: fraction(3),
        hint: say('Zenbat aldiz sartzen da 6 23n?', '¿Cuántas veces cabe 6 en 23?', 'كم مرة يدخل 6 في 23؟'),
        explanation: say('$23=6\\cdot 3+5$: 3 unitate oso eta $\\frac{5}{6}$.', '$23=6\\cdot 3+5$: 3 unidades completas y $\\frac{5}{6}$.', '$23=6\\cdot 3+5$: ‏3 وحدات كاملة و$\\frac{5}{6}$.')
    },
    {
        id: 8,
        stage: 'types',
        prompt: say('Zer zatiki dago zenbaki-zuzenean, 1 eta 2 artean, unitatea 4 zatitan banatu eta zerotik 7 zati aurreratuta?', '¿Qué fracción está en la recta si divides cada unidad en 4 partes y avanzas 7 partes desde el cero?', 'ما الكسر على المستقيم إذا قسمت كل وحدة إلى 4 أجزاء وتقدّمت 7 أجزاء من الصفر؟'),
        expected: fraction(7, 4),
        hint: say('Izendatzailea: unitatearen zatiak. Zenbakitzailea: aurreratutako zatiak.', 'Denominador: partes de la unidad. Numerador: partes avanzadas.', 'المقام: أجزاء الوحدة. البسط: الأجزاء التي تقدّمناها.'),
        explanation: same('$\\frac{7}{4}=1\\frac{3}{4}$')
    },
    {
        id: 9,
        stage: 'equivalence',
        prompt: say('Aurkitu falta den zenbakia: $\\frac{3}{5}=\\frac{\\square}{20}$.', 'Halla el número que falta: $\\frac{3}{5}=\\frac{\\square}{20}$.', 'أوجد العدد الناقص: $\\frac{3}{5}=\\frac{\\square}{20}$.'),
        expected: fraction(12),
        hint: say('5etik 20ra biderkatu da. Zenbatez?', 'De 5 a 20 se ha multiplicado. ¿Por cuánto?', 'من 5 إلى 20 ضربنا. في كم؟'),
        explanation: same('$\\frac{3}{5}=\\frac{3\\cdot 4}{5\\cdot 4}=\\frac{12}{20}$')
    },
    {
        id: 10,
        stage: 'equivalence',
        prompt: say('Sinplifikatu $\\frac{24}{32}$ zatiki laburtezina lortu arte.', 'Simplifica $\\frac{24}{32}$ hasta la fracción irreducible.', 'بسّط $\\frac{24}{32}$ حتى أبسط صورة.'),
        expected: fraction(3, 4),
        answerForm: 'simplified',
        hint: say('Biak 8ren multiploak dira.', 'Los dos son múltiplos de 8.', 'كلاهما مضاعف لـ 8.'),
        explanation: same('$\\frac{24}{32}=\\frac{24\\mathbin{:}8}{32\\mathbin{:}8}=\\frac{3}{4}$')
    },
    {
        id: 11,
        stage: 'equivalence',
        prompt: say('Aurkitu falta den zenbakia: $\\frac{8}{\\square}=\\frac{2}{3}$.', 'Halla el número que falta: $\\frac{8}{\\square}=\\frac{2}{3}$.', 'أوجد العدد الناقص: $\\frac{8}{\\square}=\\frac{2}{3}$.'),
        expected: fraction(12),
        hint: say('Biderkadura gurutzatuak: $8\\cdot 3=2\\cdot\\square$.', 'Productos cruzados: $8\\cdot 3=2\\cdot\\square$.', 'الضرب التبادلي: $8\\cdot 3=2\\cdot\\square$.'),
        explanation: same('$8\\cdot 3=24=2\\cdot 12$')
    },
    {
        id: 12,
        stage: 'equivalence',
        prompt: say('Zein da handiena: $\\frac{5}{6}$, $\\frac{3}{4}$ ala $\\frac{2}{3}$? Idatzi zatikia.', '¿Cuál es la mayor: $\\frac{5}{6}$, $\\frac{3}{4}$ o $\\frac{2}{3}$? Escribe la fracción.', 'أيها الأكبر: $\\frac{5}{6}$ أم $\\frac{3}{4}$ أم $\\frac{2}{3}$؟ اكتب الكسر.'),
        expected: fraction(5, 6),
        hint: say('Eraman denak 12 izendatzailera.', 'Pásalas todas a denominador 12.', 'حوّلها كلها إلى المقام 12.'),
        explanation: same('$\\frac{10}{12}>\\frac{9}{12}>\\frac{8}{12}$')
    },
    {
        id: 13,
        stage: 'operations',
        prompt: calculate('$\\frac{2}{9}+\\frac{4}{9}$'),
        expected: fraction(2, 3),
        answerForm: 'simplified',
        hint: say('Izendatzaile bera: batu zenbakitzaileak.', 'Mismo denominador: suma los numeradores.', 'المقام نفسه: اجمع البسوط.'),
        explanation: same('$\\frac{2}{9}+\\frac{4}{9}=\\frac{6}{9}=\\frac{2}{3}$')
    },
    {
        id: 14,
        stage: 'operations',
        prompt: calculate('$\\frac{5}{6}-\\frac{1}{4}$'),
        expected: fraction(7, 12),
        answerForm: 'simplified',
        hint: say('Izendatzaile komuna: $@LCM(6,4)=12$.', 'Denominador común: $@LCM(6,4)=12$.', 'المقام المشترك: $@LCM(6,4)=12$.'),
        explanation: same('$\\frac{10}{12}-\\frac{3}{12}=\\frac{7}{12}$')
    },
    {
        id: 15,
        stage: 'operations',
        prompt: calculate('$\\frac{3}{4}\\cdot\\frac{2}{9}$'),
        expected: fraction(1, 6),
        answerForm: 'simplified',
        hint: say('Goikoak goikoekin, behekoak behekoekin.', 'Arriba con arriba, abajo con abajo.', 'الأعلى في الأعلى والأسفل في الأسفل.'),
        explanation: same('$\\frac{3\\cdot 2}{4\\cdot 9}=\\frac{6}{36}=\\frac{1}{6}$')
    },
    {
        id: 16,
        stage: 'operations',
        prompt: calculate('$\\frac{2}{5}\\mathbin{:}\\frac{4}{15}$'),
        expected: fraction(3, 2),
        answerForm: 'simplified',
        hint: say('Gurutzean: $2\\cdot 15$ eta $5\\cdot 4$.', 'En cruz: $2\\cdot 15$ y $5\\cdot 4$.', 'تبادليًا: $2\\cdot 15$ و$5\\cdot 4$.'),
        explanation: same('$\\frac{2\\cdot 15}{5\\cdot 4}=\\frac{30}{20}=\\frac{3}{2}$')
    },
    {
        id: 17,
        stage: 'operations',
        prompt: calculate('$3\\cdot\\frac{2}{7}$'),
        expected: fraction(6, 7),
        answerForm: 'simplified',
        hint: say('Zenbakiak zenbakitzailea bakarrik biderkatzen du.', 'El número solo multiplica al numerador.', 'العدد يضرب البسط فقط.'),
        explanation: same('$3\\cdot\\frac{2}{7}=\\frac{6}{7}$')
    },
    {
        id: 18,
        stage: 'problems',
        prompt: say('Zenbat da 45en $\\frac{2}{9}$?', '¿Cuánto es $\\frac{2}{9}$ de 45?', 'كم يساوي $\\frac{2}{9}$ من 45؟'),
        expected: fraction(10),
        hint: say('Zatitu 9z eta biderkatu 2z.', 'Divide entre 9 y multiplica por 2.', 'اقسم على 9 واضرب في 2.'),
        explanation: same('$45\\mathbin{:}9\\cdot 2=5\\cdot 2=10$')
    },
    {
        id: 19,
        stage: 'problems',
        prompt: say('Klase batean 28 ikasle daude eta $\\frac{3}{7}$ neskak dira. Zenbat mutil daude?', 'En una clase hay 28 alumnos y $\\frac{3}{7}$ son chicas. ¿Cuántos chicos hay?', 'في صف 28 تلميذًا، و$\\frac{3}{7}$ منهم بنات. كم ولدًا في الصف؟'),
        expected: fraction(16),
        hint: say('Mutilak: $1-\\frac{3}{7}=\\frac{4}{7}$.', 'Chicos: $1-\\frac{3}{7}=\\frac{4}{7}$.', 'الأولاد: $1-\\frac{3}{7}=\\frac{4}{7}$.'),
        explanation: say('$28\\mathbin{:}7\\cdot 4=16$ mutil (eta 12 neska).', '$28\\mathbin{:}7\\cdot 4=16$ chicos (y 12 chicas).', '$28\\mathbin{:}7\\cdot 4=16$ ولدًا (و12 بنتًا).')
    },
    {
        id: 20,
        stage: 'problems',
        prompt: say('Mariak liburu baten $\\frac{1}{4}$ irakurri du astelehenean eta $\\frac{1}{3}$ asteartean. Liburuaren zer zati irakurri du guztira?', 'María ha leído $\\frac{1}{4}$ de un libro el lunes y $\\frac{1}{3}$ el martes. ¿Qué fracción del libro ha leído en total?', 'قرأت ماريا $\\frac{1}{4}$ كتاب يوم الاثنين و$\\frac{1}{3}$ يوم الثلاثاء. ما الكسر الذي قرأته من الكتاب في المجموع؟'),
        expected: fraction(7, 12),
        answerForm: 'simplified',
        hint: say('Batu bi zatikiak: izendatzaile komuna 12.', 'Suma las dos fracciones: denominador común 12.', 'اجمع الكسرين: المقام المشترك 12.'),
        explanation: same('$\\frac{1}{4}+\\frac{1}{3}=\\frac{3}{12}+\\frac{4}{12}=\\frac{7}{12}$')
    }
]

export const fractionsIntroChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'meaning',
        context: 'starter',
        points: 10,
        prompt: say('Bizkotxo bat 6 zati berdinetan moztu da. Mariak 2 zati jan ditu eta bere anaiak beste 1. Bizkotxoaren zer zati jan dute guztira?', 'Un bizcocho se ha cortado en 6 partes iguales. María se ha comido 2 trozos y su hermano otro. ¿Qué fracción del bizcocho se han comido entre los dos?', 'قُطّعت كعكة إلى 6 أجزاء متساوية. أكلت ماريا قطعتين وأخوها قطعة. ما الكسر الذي أكلاه معًا؟'),
        expected: fraction(1, 2),
        hint: say('Zenbat zati jan dituzte? Eta guztira zenbat daude?', '¿Cuántos trozos se han comido? ¿Cuántos hay en total?', 'كم قطعة أكلا؟ وكم في المجموع؟'),
        explanation: same('$\\frac{2}{6}+\\frac{1}{6}=\\frac{3}{6}=\\frac{1}{2}$')
    },
    {
        id: 102,
        stage: 'types',
        context: 'starter',
        points: 10,
        prompt: say('Jonek gazta-kutxa oso bat eta beste baten 3 zati jan ditu (kutxa bakoitzak 8 zati). Idatzi jandakoa zatiki gisa.', 'Juan se ha comido una caja entera de quesitos y 3 porciones de otra (cada caja tiene 8). Escribe lo que ha comido como fracción.', 'أكل خوان علبة جبن كاملة و3 قطع من أخرى (في كل علبة 8 قطع). اكتب ما أكله كسرًا.'),
        expected: fraction(11, 8),
        hint: say('Kutxa osoa $\\frac{8}{8}$ da.', 'La caja entera es $\\frac{8}{8}$.', 'العلبة الكاملة هي $\\frac{8}{8}$.'),
        explanation: same('$\\frac{8}{8}+\\frac{3}{8}=\\frac{11}{8}=1\\frac{3}{8}$')
    },
    {
        id: 103,
        stage: 'equivalence',
        context: 'starter',
        points: 10,
        prompt: say('Jorgek bere 36 kromoen $\\frac{2}{3}$ itsatsi ditu eta Lucasek bereen $\\frac{3}{4}$ (36 ere). Zenbat kromo gehiago itsatsi ditu Lucasek?', 'Jorge ha pegado $\\frac{2}{3}$ de sus 36 cromos y Lucas $\\frac{3}{4}$ de los suyos (también 36). ¿Cuántos cromos más ha pegado Lucas?', 'ألصق خورخي $\\frac{2}{3}$ صوره الـ 36، وألصق لوكاس $\\frac{3}{4}$ صوره (36 أيضًا). كم صورة زيادة ألصق لوكاس؟'),
        expected: fraction(3),
        hint: say('Kalkulatu biak: 36ren $\\frac{2}{3}$ eta 36ren $\\frac{3}{4}$.', 'Calcula las dos: $\\frac{2}{3}$ de 36 y $\\frac{3}{4}$ de 36.', 'احسب الاثنين: $\\frac{2}{3}$ من 36 و$\\frac{3}{4}$ من 36.'),
        explanation: same('$36\\mathbin{:}3\\cdot 2=24$, $36\\mathbin{:}4\\cdot 3=27$, $27-24=3$')
    },
    {
        id: 104,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('12 litroko garrafa baten $\\frac{3}{4}$ bete dira. Zenbat litro daude?', 'Se han llenado $\\frac{3}{4}$ de una garrafa de 12 litros. ¿Cuántos litros hay?', 'مُلئ $\\frac{3}{4}$ قارورة سعتها 12 لترًا. كم لترًا فيها؟'),
        expected: fraction(9),
        hint: say('Laurden bat: $12\\mathbin{:}4$.', 'Un cuarto: $12\\mathbin{:}4$.', 'الربع: $12\\mathbin{:}4$.'),
        explanation: same('$12\\mathbin{:}4\\cdot 3=9$')
    },
    {
        id: 105,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: calculate('$\\frac{1}{2}+\\frac{2}{3}-\\frac{3}{4}$'),
        expected: fraction(5, 12),
        answerForm: 'simplified',
        hint: say('Izendatzaile komuna: $@LCM(2,3,4)=12$.', 'Denominador común: $@LCM(2,3,4)=12$.', 'المقام المشترك: $@LCM(2,3,4)=12$.'),
        explanation: same('$\\frac{6}{12}+\\frac{8}{12}-\\frac{9}{12}=\\frac{5}{12}$')
    },
    {
        id: 106,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: say('Zenbat $\\frac{1}{6}$-eko zati sartzen dira $\\frac{2}{3}$-n?', '¿Cuántos trozos de $\\frac{1}{6}$ caben en $\\frac{2}{3}$?', 'كم قطعة من $\\frac{1}{6}$ في $\\frac{2}{3}$؟'),
        expected: fraction(4),
        hint: say('Zatiketa bat da: $\\frac{2}{3}\\mathbin{:}\\frac{1}{6}$.', 'Es una división: $\\frac{2}{3}\\mathbin{:}\\frac{1}{6}$.', 'إنها قسمة: $\\frac{2}{3}\\mathbin{:}\\frac{1}{6}$.'),
        explanation: same('$\\frac{2}{3}\\mathbin{:}\\frac{1}{6}=\\frac{2\\cdot 6}{3\\cdot 1}=\\frac{12}{3}=4$')
    },
    {
        id: 107,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Anek 30 €-ko pagaren $\\frac{1}{3}$ gastatu du zinean eta $\\frac{1}{5}$ liburu batean. Zenbat euro geratzen zaizkio?', 'Ana ha gastado $\\frac{1}{3}$ de su paga de 30 € en el cine y $\\frac{1}{5}$ en un libro. ¿Cuántos euros le quedan?', 'أنفقت آنه $\\frac{1}{3}$ مصروفها البالغ 30 € في السينما و$\\frac{1}{5}$ في كتاب. كم يورو بقي لها؟'),
        expected: fraction(14),
        hint: say('Gastatutakoa: $\\frac{1}{3}+\\frac{1}{5}$. Geratzen dena: 1 ken hori.', 'Lo gastado: $\\frac{1}{3}+\\frac{1}{5}$. Lo que queda: 1 menos eso.', 'المُنفق: $\\frac{1}{3}+\\frac{1}{5}$. المتبقي: 1 ناقص ذلك.'),
        explanation: same('$\\frac{1}{3}+\\frac{1}{5}=\\frac{8}{15}$, $1-\\frac{8}{15}=\\frac{7}{15}$, $30\\mathbin{:}15\\cdot 7=14$')
    },
    {
        id: 108,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Ibilbide baten $\\frac{3}{5}$ egin ditugu eta 12 km falta dira. Zenbat km ditu ibilbide osoak?', 'Hemos hecho $\\frac{3}{5}$ de un recorrido y faltan 12 km. ¿Cuántos km tiene el recorrido?', 'قطعنا $\\frac{3}{5}$ مسار وبقي 12 كم. كم كيلومترًا طول المسار كله؟'),
        expected: fraction(30),
        hint: say('Falta dena $\\frac{2}{5}$ da: $\\frac{2}{5}$ = 12 km. Zenbat da $\\frac{1}{5}$?', 'Lo que falta es $\\frac{2}{5}$: $\\frac{2}{5}$ = 12 km. ¿Cuánto es $\\frac{1}{5}$?', 'المتبقي $\\frac{2}{5}$: أي $\\frac{2}{5}$ = 12 كم. كم يساوي $\\frac{1}{5}$؟'),
        explanation: same('$1-\\frac{3}{5}=\\frac{2}{5}$, $12\\mathbin{:}2=6$, $6\\cdot 5=30$')
    },
    {
        id: 109,
        stage: 'equivalence',
        context: 'advanced',
        points: 20,
        prompt: say('Idatzi $\\frac{1}{3}$ eta $\\frac{1}{2}$ artean dagoen zatiki bat, 12 izendatzailearekin.', 'Escribe una fracción comprendida entre $\\frac{1}{3}$ y $\\frac{1}{2}$ con denominador 12.', 'اكتب كسرًا بين $\\frac{1}{3}$ و$\\frac{1}{2}$ مقامه 12.'),
        expected: fraction(5, 12),
        hint: say('$\\frac{1}{3}=\\frac{4}{12}$ eta $\\frac{1}{2}=\\frac{6}{12}$.', '$\\frac{1}{3}=\\frac{4}{12}$ y $\\frac{1}{2}=\\frac{6}{12}$.', '$\\frac{1}{3}=\\frac{4}{12}$ و$\\frac{1}{2}=\\frac{6}{12}$.'),
        explanation: same('$\\frac{4}{12}<\\frac{5}{12}<\\frac{6}{12}$')
    },
    {
        id: 110,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Depositu baten $\\frac{2}{5}$ erabili dira goizean eta geratzen denaren erdia arratsaldean. Depositua 50 litrokoa bada, zenbat litro geratzen dira?', 'Por la mañana se usan $\\frac{2}{5}$ de un depósito y por la tarde la mitad de lo que queda. Si el depósito es de 50 litros, ¿cuántos litros quedan?', 'استُعمل صباحًا $\\frac{2}{5}$ خزان، ومساءً نصف المتبقي. إذا كانت سعة الخزان 50 لترًا، فكم لترًا بقي؟'),
        expected: fraction(15),
        hint: say('Goizean: 50ren $\\frac{2}{5}$. Gero kalkulatu geratzen denaren erdia.', 'Por la mañana: $\\frac{2}{5}$ de 50. Después calcula la mitad de lo que queda.', 'صباحًا: $\\frac{2}{5}$ من 50. ثم احسب نصف المتبقي.'),
        explanation: same('$50\\mathbin{:}5\\cdot 2=20$, $50-20=30$, $30\\mathbin{:}2=15$')
    },
    {
        id: 111,
        stage: 'operations',
        context: 'master',
        points: 30,
        prompt: calculate('$\\left(\\frac{3}{4}-\\frac{1}{2}\\right)\\cdot\\frac{8}{5}$'),
        expected: fraction(2, 5),
        answerForm: 'simplified',
        hint: say('Lehenik parentesia.', 'Primero el paréntesis.', 'أولًا القوس.'),
        explanation: same('$\\frac{3}{4}-\\frac{2}{4}=\\frac{1}{4}$, $\\frac{1}{4}\\cdot\\frac{8}{5}=\\frac{8}{20}=\\frac{2}{5}$')
    },
    {
        id: 112,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Liburu baten $\\frac{1}{4}$ irakurri dut lehen egunean eta $\\frac{1}{3}$ bigarrenean. 60 orrialde falta zaizkit. Zenbat orrialde ditu liburuak?', 'He leído $\\frac{1}{4}$ de un libro el primer día y $\\frac{1}{3}$ el segundo. Me faltan 60 páginas. ¿Cuántas páginas tiene el libro?', 'قرأت $\\frac{1}{4}$ كتاب في اليوم الأول و$\\frac{1}{3}$ في الثاني. بقيت لي 60 صفحة. كم صفحة في الكتاب؟'),
        expected: fraction(144),
        hint: say('Irakurritakoa: $\\frac{1}{4}+\\frac{1}{3}=\\frac{7}{12}$. Falta dena, $\\frac{5}{12}$, 60 orrialde dira.', 'Leído: $\\frac{1}{4}+\\frac{1}{3}=\\frac{7}{12}$. Lo que falta, $\\frac{5}{12}$, son 60 páginas.', 'المقروء: $\\frac{1}{4}+\\frac{1}{3}=\\frac{7}{12}$. والمتبقي $\\frac{5}{12}$ هو 60 صفحة.'),
        explanation: same('$1-\\frac{7}{12}=\\frac{5}{12}$, $60\\mathbin{:}5=12$, $12\\cdot 12=144$')
    }
]

export const fractionsIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'meaning',
        title: say('Zer da zatiki bat?', '¿Qué es una fracción?', 'ما الكسر؟'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi nola irakurtzen diren: a) $\\frac{3}{5}$; b) $\\frac{5}{12}$; c) $\\frac{2}{10}$.', 'Escribe cómo se leen: a) $\\frac{3}{5}$; b) $\\frac{5}{12}$; c) $\\frac{2}{10}$.', 'اكتب كيف تُقرأ: أ) $\\frac{3}{5}$؛ ب) $\\frac{5}{12}$؛ ج) $\\frac{2}{10}$.'), solution: say('a) hiru bosten; b) bost hamabiren; c) bi hamarren.', 'a) tres quintos; b) cinco doceavos; c) dos décimos.', 'أ) ثلاثة أخماس؛ ب) خمسة أجزاء من اثني عشر؛ ج) عُشران.') },
            { id: 2, difficulty: 'easy', question: say('Idatzi zenbakiekin: a) sei hamarren; b) hiru zortziren; c) bi hamaikaren.', 'Escribe con números: a) seis décimos; b) tres octavos; c) dos onceavos.', 'اكتب بالأرقام: أ) ستة أعشار؛ ب) ثلاثة أثمان؛ ج) جزءان من أحد عشر.'), solution: same('a) $\\frac{6}{10}$; b) $\\frac{3}{8}$; c) $\\frac{2}{11}$') },
            { id: 3, difficulty: 'easy', question: say('Mariak 6 zatitan moztutako bizkotxo baten 2 zati jan ditu. Zer zatiki jan du? Marraztu bi modutan.', 'María se ha comido 2 trozos de un bizcocho dividido en 6 partes iguales. ¿Qué fracción se ha comido? Represéntalo de dos formas.', 'أكلت ماريا قطعتين من كعكة مقسّمة إلى 6 أجزاء متساوية. ما الكسر الذي أكلته؟ مثّله بطريقتين.'), solution: say('$\\frac{2}{6}$: adibidez, 6 zatiko zirkulua 2 koloreztaturekin, eta 6 zatiko barra 2 koloreztaturekin.', '$\\frac{2}{6}$: por ejemplo, un círculo en 6 partes con 2 coloreadas y una barra en 6 partes con 2 coloreadas.', '$\\frac{2}{6}$: مثلًا دائرة من 6 أجزاء ملوّن منها 2، وشريط من 6 أجزاء ملوّن منها 2.'), answer: { expected: fraction(2, 6) } },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu zatiki bakoitzaren balioa: a) $\\frac{3}{8}$; b) $\\frac{15}{8}$; c) $\\frac{6}{6}$.', 'Calcula el valor de cada fracción: a) $\\frac{3}{8}$; b) $\\frac{15}{8}$; c) $\\frac{6}{6}$.', 'احسب قيمة كل كسر: أ) $\\frac{3}{8}$؛ ب) $\\frac{15}{8}$؛ ج) $\\frac{6}{6}$.'), solution: say('a) $3\\mathbin{:}8=0{,}375$; b) $15\\mathbin{:}8=1{,}875$; c) $6\\mathbin{:}6=1$', 'a) $3\\mathbin{:}8=0{,}375$; b) $15\\mathbin{:}8=1{,}875$; c) $6\\mathbin{:}6=1$', 'أ) $3\\mathbin{:}8=0.375$؛ ب) $15\\mathbin{:}8=1.875$؛ ج) $6\\mathbin{:}6=1$') },
            { id: 5, difficulty: 'medium', question: say('Klase batean 25 ikasle daude eta 11 mutilak dira. Zer zatiki dira neskak?', 'En una clase hay 25 alumnos y 11 son chicos. ¿Qué fracción son chicas?', 'في صف 25 تلميذًا، منهم 11 ولدًا. ما الكسر الذي تمثّله البنات؟'), solution: same('$25-11=14$, $\\frac{14}{25}$'), answer: { expected: fraction(14, 25) } },
            { id: 6, difficulty: 'hard', question: say('5 pastel 8 lagunen artean banatu dira zati berdinetan. Zenbat pastel jaten du bakoitzak? Eman zatiki eta hamartar gisa.', 'Se reparten 5 pasteles entre 8 personas a partes iguales. ¿Cuánto pastel come cada una? Dalo como fracción y como decimal.', 'وُزّعت 5 كعكات على 8 أشخاص بالتساوي. كم كعكة يأكل كل واحد؟ أعطِ الجواب كسرًا وعددًا عشريًا.'), solution: say('$5\\mathbin{:}8=\\frac{5}{8}=0{,}625$ pastel.', '$5\\mathbin{:}8=\\frac{5}{8}=0{,}625$ pasteles.', '$5\\mathbin{:}8=\\frac{5}{8}=0.625$ كعكة.'), answer: { expected: fraction(5, 8) } }
        ]
    },
    {
        id: 'types',
        title: say('Zatiki motak eta zuzena', 'Tipos de fracciones y la recta', 'أنواع الكسور والمستقيم'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Sailkatu propio, unitate eta inpropiotan: $\\frac{4}{10}$, $\\frac{15}{15}$, $\\frac{9}{4}$, $\\frac{7}{12}$, $\\frac{25}{18}$.', 'Clasifica en propias, iguales a la unidad e impropias: $\\frac{4}{10}$, $\\frac{15}{15}$, $\\frac{9}{4}$, $\\frac{7}{12}$, $\\frac{25}{18}$.', 'صنّف إلى حقيقية ومساوية للواحد وغير حقيقية: $\\frac{4}{10}$، $\\frac{15}{15}$، $\\frac{9}{4}$، $\\frac{7}{12}$، $\\frac{25}{18}$.'), solution: say('Propioak: $\\frac{4}{10}$, $\\frac{7}{12}$. Unitatea: $\\frac{15}{15}$. Inpropioak: $\\frac{9}{4}$, $\\frac{25}{18}$.', 'Propias: $\\frac{4}{10}$, $\\frac{7}{12}$. Unidad: $\\frac{15}{15}$. Impropias: $\\frac{9}{4}$, $\\frac{25}{18}$.', 'الحقيقية: $\\frac{4}{10}$، $\\frac{7}{12}$. الواحد: $\\frac{15}{15}$. غير الحقيقية: $\\frac{9}{4}$، $\\frac{25}{18}$.') },
            { id: 8, difficulty: 'easy', question: say('Idatzi zenbaki misto gisa: a) $\\frac{15}{4}$; b) $\\frac{17}{12}$; c) $\\frac{20}{3}$.', 'Escribe como número mixto: a) $\\frac{15}{4}$; b) $\\frac{17}{12}$; c) $\\frac{20}{3}$.', 'اكتب عددًا كسريًا: أ) $\\frac{15}{4}$؛ ب) $\\frac{17}{12}$؛ ج) $\\frac{20}{3}$.'), solution: same('a) $3\\frac{3}{4}$; b) $1\\frac{5}{12}$; c) $6\\frac{2}{3}$') },
            { id: 9, difficulty: 'medium', question: say('Idatzi zatiki gisa: a) $1\\frac{3}{8}$; b) $2\\frac{4}{5}$; c) $4\\frac{1}{6}$.', 'Escribe como fracción: a) $1\\frac{3}{8}$; b) $2\\frac{4}{5}$; c) $4\\frac{1}{6}$.', 'اكتب كسرًا: أ) $1\\frac{3}{8}$؛ ب) $2\\frac{4}{5}$؛ ج) $4\\frac{1}{6}$.'), solution: same('a) $\\frac{11}{8}$; b) $\\frac{14}{5}$; c) $\\frac{25}{6}$') },
            { id: 10, difficulty: 'medium', question: say('Esan zein bi zenbaki osoren artean dagoen: a) $\\frac{7}{3}$; b) $\\frac{11}{4}$; c) $\\frac{9}{10}$.', 'Di entre qué dos números enteros está: a) $\\frac{7}{3}$; b) $\\frac{11}{4}$; c) $\\frac{9}{10}$.', 'بيّن بين أي عددين صحيحين يقع: أ) $\\frac{7}{3}$؛ ب) $\\frac{11}{4}$؛ ج) $\\frac{9}{10}$.'), solution: say('a) 2 eta 3; b) 2 eta 3; c) 0 eta 1.', 'a) 2 y 3; b) 2 y 3; c) 0 y 1.', 'أ) 2 و3؛ ب) 2 و3؛ ج) 0 و1.') },
            { id: 11, difficulty: 'medium', question: say('Kokatu zuzen batean $\\frac{2}{3}$, $\\frac{3}{3}$ eta $\\frac{5}{3}$. Zenbat zatitan banatzen duzu unitate bakoitza?', 'Sitúa en una recta $\\frac{2}{3}$, $\\frac{3}{3}$ y $\\frac{5}{3}$. ¿En cuántas partes divides cada unidad?', 'ضع على مستقيم $\\frac{2}{3}$ و$\\frac{3}{3}$ و$\\frac{5}{3}$. إلى كم جزءًا تقسم كل وحدة؟'), solution: say('3 zatitan. $\\frac{2}{3}$ 0 eta 1 artean, $\\frac{3}{3}=1$ eta $\\frac{5}{3}=1\\frac{2}{3}$ 1 eta 2 artean.', 'En 3 partes. $\\frac{2}{3}$ entre 0 y 1, $\\frac{3}{3}=1$ y $\\frac{5}{3}=1\\frac{2}{3}$ entre 1 y 2.', 'إلى 3 أجزاء. $\\frac{2}{3}$ بين 0 و1، و$\\frac{3}{3}=1$، و$\\frac{5}{3}=1\\frac{2}{3}$ بين 1 و2.'), answer: { expected: fraction(3) } },
            { id: 12, difficulty: 'hard', question: say('Zenbat laurden daude $3\\frac{1}{4}$ pizzatan?', '¿Cuántos cuartos hay en $3\\frac{1}{4}$ pizzas?', 'كم ربعًا في $3\\frac{1}{4}$ بيتزا؟'), solution: same('$3\\frac{1}{4}=\\frac{3\\cdot 4+1}{4}=\\frac{13}{4}$'), answer: { expected: fraction(13) } }
        ]
    },
    {
        id: 'equivalence',
        title: say('Baliokideak eta alderaketa', 'Equivalentes y comparación', 'التكافؤ والمقارنة'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Baliokideak al dira? a) $\\frac{12}{10}$ eta $\\frac{6}{5}$; b) $\\frac{14}{21}$ eta $\\frac{2}{3}$; c) $\\frac{4}{11}$ eta $\\frac{8}{15}$.', '¿Son equivalentes? a) $\\frac{12}{10}$ y $\\frac{6}{5}$; b) $\\frac{14}{21}$ y $\\frac{2}{3}$; c) $\\frac{4}{11}$ y $\\frac{8}{15}$.', 'هل هي متكافئة؟ أ) $\\frac{12}{10}$ و$\\frac{6}{5}$؛ ب) $\\frac{14}{21}$ و$\\frac{2}{3}$؛ ج) $\\frac{4}{11}$ و$\\frac{8}{15}$.'), solution: say('a) Bai: $12\\cdot 5=60=10\\cdot 6$. b) Bai: $14\\cdot 3=42=21\\cdot 2$. c) Ez: $4\\cdot 15=60$ eta $11\\cdot 8=88$.', 'a) Sí: $12\\cdot 5=60=10\\cdot 6$. b) Sí: $14\\cdot 3=42=21\\cdot 2$. c) No: $4\\cdot 15=60$ y $11\\cdot 8=88$.', 'أ) نعم: $12\\cdot 5=60=10\\cdot 6$. ب) نعم: $14\\cdot 3=42=21\\cdot 2$. ج) لا: $4\\cdot 15=60$ و$11\\cdot 8=88$.') },
            { id: 14, difficulty: 'easy', question: say('Idatzi $\\frac{3}{5}$ zatikiaren hiru baliokide anplifikatuz.', 'Escribe tres fracciones equivalentes a $\\frac{3}{5}$ amplificando.', 'اكتب ثلاثة كسور مكافئة لـ $\\frac{3}{5}$ بالتوسيع.'), solution: same('$\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}=\\frac{12}{20}$') },
            { id: 15, difficulty: 'medium', question: say('Sinplifikatu zatiki laburtezina lortu arte: a) $\\frac{30}{40}$; b) $\\frac{15}{20}$; c) $\\frac{24}{32}$; d) $\\frac{12}{36}$.', 'Simplifica hasta la fracción irreducible: a) $\\frac{30}{40}$; b) $\\frac{15}{20}$; c) $\\frac{24}{32}$; d) $\\frac{12}{36}$.', 'بسّط حتى أبسط صورة: أ) $\\frac{30}{40}$؛ ب) $\\frac{15}{20}$؛ ج) $\\frac{24}{32}$؛ د) $\\frac{12}{36}$.'), solution: same('a) $\\frac{3}{4}$; b) $\\frac{3}{4}$; c) $\\frac{3}{4}$; d) $\\frac{1}{3}$') },
            { id: 16, difficulty: 'medium', question: say('Aurkitu falta den gaia: $\\frac{8}{\\square}=\\frac{16}{32}$.', 'Halla el término que falta: $\\frac{8}{\\square}=\\frac{16}{32}$.', 'أوجد الحد الناقص: $\\frac{8}{\\square}=\\frac{16}{32}$.'), solution: same('$8\\cdot 32=256=16\\cdot 16$'), answer: { expected: fraction(16) } },
            { id: 17, difficulty: 'medium', question: say('Ordenatu txikienetik handienera: $\\frac{3}{4}$, $\\frac{5}{8}$, $\\frac{1}{2}$, $\\frac{7}{8}$.', 'Ordena de menor a mayor: $\\frac{3}{4}$, $\\frac{5}{8}$, $\\frac{1}{2}$, $\\frac{7}{8}$.', 'رتّب من الأصغر إلى الأكبر: $\\frac{3}{4}$، $\\frac{5}{8}$، $\\frac{1}{2}$، $\\frac{7}{8}$.'), solution: same('$\\frac{4}{8}<\\frac{5}{8}<\\frac{6}{8}<\\frac{7}{8}$') },
            { id: 18, difficulty: 'hard', question: say('Jorgek bere kromoen $\\frac{2}{3}$ itsatsi ditu, Aracelik erdia eta Lucasek $\\frac{3}{4}$. Nork itsatsi ditu gehien, denek kromo kopuru bera badute?', 'Jorge ha pegado $\\frac{2}{3}$ de sus cromos, Araceli la mitad y Lucas $\\frac{3}{4}$. Si todos tienen los mismos cromos, ¿quién ha pegado más?', 'ألصق خورخي $\\frac{2}{3}$ صوره، وأراسيلي النصف، ولوكاس $\\frac{3}{4}$. إذا كان لديهم العدد نفسه من الصور، فمن ألصق أكثر؟'), solution: say('$\\frac{8}{12}$, $\\frac{6}{12}$ eta $\\frac{9}{12}$: Lucasek, gero Jorgek eta azkenik Aracelik.', '$\\frac{8}{12}$, $\\frac{6}{12}$ y $\\frac{9}{12}$: Lucas, luego Jorge y por último Araceli.', '$\\frac{8}{12}$ و$\\frac{6}{12}$ و$\\frac{9}{12}$: لوكاس ثم خورخي ثم أراسيلي.') }
        ]
    },
    {
        id: 'operations',
        title: say('Eragiketak', 'Operaciones', 'العمليات'),
        items: [
            { id: 19, difficulty: 'easy', question: calculate('$\\frac{3}{7}+\\frac{2}{7}$'), solution: same('$\\frac{5}{7}$'), answer: { expected: fraction(5, 7), form: 'simplified' } },
            { id: 20, difficulty: 'easy', question: calculate('$\\frac{11}{12}-\\frac{5}{12}$'), solution: same('$\\frac{6}{12}=\\frac{1}{2}$'), answer: { expected: fraction(1, 2), form: 'simplified' } },
            { id: 21, difficulty: 'medium', question: calculate('$\\frac{2}{3}+\\frac{1}{6}$'), solution: same('$\\frac{4}{6}+\\frac{1}{6}=\\frac{5}{6}$'), answer: { expected: fraction(5, 6), form: 'simplified' } },
            { id: 22, difficulty: 'medium', question: calculate('$\\frac{4}{5}\\cdot\\frac{10}{12}$'), solution: same('$\\frac{40}{60}=\\frac{2}{3}$'), answer: { expected: fraction(2, 3), form: 'simplified' } },
            { id: 23, difficulty: 'medium', question: calculate('$\\frac{3}{8}\\mathbin{:}\\frac{9}{4}$'), solution: same('$\\frac{3\\cdot 4}{8\\cdot 9}=\\frac{12}{72}=\\frac{1}{6}$'), answer: { expected: fraction(1, 6), form: 'simplified' } },
            { id: 24, difficulty: 'hard', question: calculate('$2-\\frac{3}{4}+\\frac{1}{6}$'), solution: same('$\\frac{24}{12}-\\frac{9}{12}+\\frac{2}{12}=\\frac{17}{12}$'), answer: { expected: fraction(17, 12), form: 'simplified' } }
        ]
    },
    {
        id: 'problems',
        title: say('Zatikiak eta buruketak', 'Fracciones y problemas', 'الكسور والمسائل'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Kalkulatu: a) 24ren $\\frac{1}{3}$; b) 40ren $\\frac{3}{5}$; c) 60ren $\\frac{5}{6}$.', 'Calcula: a) $\\frac{1}{3}$ de 24; b) $\\frac{3}{5}$ de 40; c) $\\frac{5}{6}$ de 60.', 'احسب: أ) $\\frac{1}{3}$ من 24؛ ب) $\\frac{3}{5}$ من 40؛ ج) $\\frac{5}{6}$ من 60.'), solution: same('a) $24\\mathbin{:}3=8$; b) $40\\mathbin{:}5\\cdot 3=24$; c) $60\\mathbin{:}6\\cdot 5=50$') },
            { id: 26, difficulty: 'easy', question: say('Liburu batek 120 orrialde ditu eta $\\frac{3}{4}$ irakurri ditut. Zenbat orrialde irakurri ditut?', 'Un libro tiene 120 páginas y he leído $\\frac{3}{4}$. ¿Cuántas páginas he leído?', 'في كتاب 120 صفحة، قرأت $\\frac{3}{4}$ منه. كم صفحة قرأت؟'), solution: same('$120\\mathbin{:}4\\cdot 3=90$'), answer: { expected: fraction(90) } },
            { id: 27, difficulty: 'medium', question: say('Gela batean 30 ikasle daude eta $\\frac{2}{5}$ autobusez etortzen dira. Zenbat ez dira autobusez etortzen?', 'En una clase hay 30 alumnos y $\\frac{2}{5}$ vienen en autobús. ¿Cuántos no vienen en autobús?', 'في صف 30 تلميذًا، يأتي $\\frac{2}{5}$ منهم بالحافلة. كم تلميذًا لا يأتي بالحافلة؟'), solution: same('$1-\\frac{2}{5}=\\frac{3}{5}$, $30\\mathbin{:}5\\cdot 3=18$'), answer: { expected: fraction(18) } },
            { id: 28, difficulty: 'medium', question: say('12 litroko garrafa bateko ura 3 litroko ontzietan banatu nahi da. Garrafaren zer zatiki da ontzi bakoitza? Zenbat ontzi behar dira?', 'Se reparte el agua de una garrafa de 12 litros en envases de 3 litros. ¿Qué fracción de la garrafa es cada envase? ¿Cuántos envases hacen falta?', 'يوزَّع ماء قارورة سعتها 12 لترًا على أوعية سعتها 3 لترات. ما الكسر الذي يمثّله كل وعاء من القارورة؟ وكم وعاءً نحتاج؟'), solution: say('$\\frac{3}{12}=\\frac{1}{4}$: 4 ontzi.', '$\\frac{3}{12}=\\frac{1}{4}$: 4 envases.', '$\\frac{3}{12}=\\frac{1}{4}$: ‏4 أوعية.') },
            { id: 29, difficulty: 'hard', question: say('Pagaren $\\frac{1}{4}$ gastatu dut goizean eta $\\frac{1}{2}$ arratsaldean. 5 € geratzen zaizkit. Zenbat zen paga?', 'Me gasto $\\frac{1}{4}$ de la paga por la mañana y $\\frac{1}{2}$ por la tarde. Me quedan 5 €. ¿Cuánto era la paga?', 'أنفقت $\\frac{1}{4}$ مصروفي صباحًا و$\\frac{1}{2}$ مساءً. بقي لي 5 €. كم كان المصروف؟'), solution: same('$\\frac{1}{4}+\\frac{1}{2}=\\frac{3}{4}$, $1-\\frac{3}{4}=\\frac{1}{4}$, $5\\cdot 4=20$'), answer: { expected: fraction(20) } },
            { id: 30, difficulty: 'hard', question: say('Pastel baten $\\frac{3}{8}$ jan ditugu eta geratzen denaren $\\frac{1}{5}$ oparitu dugu. Pastelaren zer zati geratzen da?', 'Nos hemos comido $\\frac{3}{8}$ de una tarta y hemos regalado $\\frac{1}{5}$ de lo que quedaba. ¿Qué fracción de la tarta queda?', 'أكلنا $\\frac{3}{8}$ كعكة وأهدينا $\\frac{1}{5}$ المتبقي. ما الكسر المتبقي من الكعكة؟'), solution: same('$1-\\frac{3}{8}=\\frac{5}{8}$, $\\frac{1}{5}\\cdot\\frac{5}{8}=\\frac{1}{8}$, $\\frac{5}{8}-\\frac{1}{8}=\\frac{4}{8}=\\frac{1}{2}$'), answer: { expected: fraction(1, 2), form: 'simplified' } }
        ]
    }
]
