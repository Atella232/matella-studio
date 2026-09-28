import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebra · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges, from Santillana 1.º ESO unit 6 (translation tables, value
   tables, monomial tables, equations by trial and by transposing) and
   Anaya unit 10 (problems with equations). Answers are numbers: a value,
   a coefficient, a degree or the solution of an equation; expressions are
   answered in the open bank exercises.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value })
const solveIt = (latex: string): LocalizedText => say(`Ebatzi: ${latex}`, `Resuelve: ${latex}`, `حلّ: ${latex}`)

export const algebraIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1101,
        prompt: say('Nola idazten da «zenbaki baten hirukoitza ken 2»?', '¿Cómo se escribe «el triple de un número menos 2»?', 'كيف تُكتب «ثلاثة أضعاف عدد ناقص 2»؟'),
        options: [same('$3(x-2)$'), same('$3x-2$'), same('$x^{3}-2$')],
        correctIndex: 1,
        explanation: say('Lehenik hirukoitza ($3x$) eta gero 2 kendu. $3(x-2)$ «kenketaren hirukoitza» da; $x^{3}$, kuboa.', 'Primero el triple ($3x$) y después se resta 2. $3(x-2)$ es «el triple de la resta»; $x^{3}$, el cubo.', 'أولًا ثلاثة الأضعاف ($3x$) ثم نطرح 2. أما $3(x-2)$ فهو «ثلاثة أضعاف الفرق»، و$x^{3}$ هو المكعب.'),
        topic: 'translate'
    },
    {
        id: 1102,
        prompt: say('Zenbat balio du $2x+1$ adierazpenak $x=4$ denean?', '¿Cuánto vale $2x+1$ para $x=4$?', 'كم قيمة $2x+1$ عندما $x=4$؟'),
        options: [same('$9$'), same('$25$'), same('$7$')],
        correctIndex: 0,
        explanation: same('$2\\cdot 4+1=8+1=9$'),
        topic: 'value'
    },
    {
        id: 1103,
        prompt: say('Zein da $-4x^{2}y$ monomioaren maila?', '¿Cuál es el grado del monomio $-4x^{2}y$?', 'ما درجة وحيد الحد $-4x^{2}y$؟'),
        options: [same('$2$'), same('$-4$'), same('$3$')],
        correctIndex: 2,
        explanation: say('Berretzaileen batura: $2+1=3$. −4 koefizientea da.', 'Suma de exponentes: $2+1=3$. −4 es el coeficiente.', 'مجموع الأسس: $2+1=3$. أما −4 فهو المعامل.'),
        topic: 'monomial'
    },
    {
        id: 1104,
        prompt: say('Zein da $3x^{2}$ monomioaren antzekoa?', '¿Cuál es semejante a $3x^{2}$?', 'أيها يشابه $3x^{2}$؟'),
        options: [same('$3x$'), same('$-5x^{2}$'), same('$3y^{2}$')],
        correctIndex: 1,
        explanation: say('Zati literal bera: $x^{2}$. Koefizienteak ez du axola.', 'Misma parte literal: $x^{2}$. El coeficiente no importa.', 'الجزء الحرفي نفسه: $x^{2}$. المعامل لا يهم.'),
        topic: 'like-terms'
    },
    {
        id: 1105,
        prompt: say('Zenbat da $5x+2x-x$?', '¿Cuánto es $5x+2x-x$?', 'كم يساوي $5x+2x-x$؟'),
        options: [same('$6x$'), same('$7x$'), same('$6x^{3}$')],
        correctIndex: 0,
        explanation: say('$5+2-1=6$: $6x$. Batzean berretzaileak ez dira aldatzen.', '$5+2-1=6$: $6x$. Al sumar, los exponentes no cambian.', '$5+2-1=6$: $6x$. عند الجمع لا تتغيّر الأسس.'),
        topic: 'add-monomials'
    },
    {
        id: 1106,
        prompt: say('Zenbat da $2x\\cdot 3x^{2}$?', '¿Cuánto es $2x\\cdot 3x^{2}$?', 'كم يساوي $2x\\cdot 3x^{2}$؟'),
        options: [same('$5x^{3}$'), same('$6x^{2}$'), same('$6x^{3}$')],
        correctIndex: 2,
        explanation: say('Koefizienteak biderkatu ($2\\cdot 3=6$) eta berretzaileak batu ($1+2=3$).', 'Multiplica los coeficientes ($2\\cdot 3=6$) y suma los exponentes ($1+2=3$).', 'اضرب المعاملات ($2\\cdot 3=6$) واجمع الأسس ($1+2=3$).'),
        topic: 'multiply-monomials'
    },
    {
        id: 1107,
        prompt: say('Zein da $x+7=12$ ekuazioaren ebazpena?', '¿Cuál es la solución de $x+7=12$?', 'ما حل $x+7=12$؟'),
        options: [same('$x=19$'), same('$x=5$'), same('$x=-5$')],
        correctIndex: 1,
        explanation: say('+7 kentzen pasatzen da: $x=12-7=5$.', 'El +7 pasa restando: $x=12-7=5$.', 'ينتقل +7 مطروحًا: $x=12-7=5$.'),
        topic: 'transpose'
    },
    {
        id: 1108,
        prompt: say('Zein da $3x=15$ ekuazioaren ebazpena?', '¿Cuál es la solución de $3x=15$?', 'ما حل $3x=15$؟'),
        options: [same('$x=12$'), same('$x=45$'), same('$x=5$')],
        correctIndex: 2,
        explanation: say('3a zatitzen pasatzen da: $x=15\\mathbin{:}3=5$.', 'El 3 pasa dividiendo: $x=15\\mathbin{:}3=5$.', 'ينتقل 3 قاسمًا: $x=15\\mathbin{:}3=5$.'),
        topic: 'transpose'
    }
]

export const algebraIntroPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'language',
        prompt: say('Zure adina x da. Zenbat urte izango dituzu 4 urte barru, x = 12 bada?', 'Tu edad es x. ¿Cuántos años tendrás dentro de 4 años si x = 12?', 'عمرك x. كم سيكون عمرك بعد 4 سنوات إذا كان x = 12؟'),
        expected: fraction(16),
        hint: say('4 urte barru: $x+4$.', 'Dentro de 4 años: $x+4$.', 'بعد 4 سنوات: $x+4$.'),
        explanation: same('$x+4=12+4=16$')
    },
    {
        id: 2,
        stage: 'language',
        prompt: say('Kalkulatu $3x-5$ adierazpenaren balioa $x=-2$ denean.', 'Halla el valor de $3x-5$ para $x=-2$.', 'احسب قيمة $3x-5$ عندما $x=-2$.'),
        expected: fraction(-11),
        hint: say('Ordeztu parentesiekin: $3\\cdot(-2)-5$.', 'Sustituye con paréntesis: $3\\cdot(-2)-5$.', 'عوّض بين قوسين: $3\\cdot(-2)-5$.'),
        explanation: same('$3\\cdot(-2)-5=-6-5=-11$')
    },
    {
        id: 3,
        stage: 'language',
        prompt: say('Kalkulatu $x^{2}+1$ adierazpenaren balioa $x=3$ denean.', 'Halla el valor de $x^{2}+1$ para $x=3$.', 'احسب قيمة $x^{2}+1$ عندما $x=3$.'),
        expected: fraction(10),
        hint: say('Lehenik berretura: $3^{2}=9$.', 'Primero la potencia: $3^{2}=9$.', 'القوة أولًا: $3^{2}=9$.'),
        explanation: same('$3^{2}+1=9+1=10$')
    },
    {
        id: 4,
        stage: 'language',
        prompt: say('Laukizuzen baten aldeak $a=5$ eta $b=3$ dira. Kalkulatu perimetroa: $P=2a+2b$.', 'Los lados de un rectángulo miden $a=5$ y $b=3$. Calcula el perímetro: $P=2a+2b$.', 'ضلعا مستطيل $a=5$ و$b=3$. احسب المحيط: $P=2a+2b$.'),
        expected: fraction(16),
        hint: say('Ordeztu bi letrak.', 'Sustituye las dos letras.', 'عوّض الحرفين.'),
        explanation: same('$2\\cdot 5+2\\cdot 3=10+6=16$')
    },
    {
        id: 5,
        stage: 'monomials',
        prompt: say('Zein da $-3ab^{2}c$ monomioaren koefizientea?', '¿Cuál es el coeficiente del monomio $-3ab^{2}c$?', 'ما معامل وحيد الحد $-3ab^{2}c$؟'),
        expected: fraction(-3),
        hint: say('Koefizientea zenbakia da, zeinuarekin.', 'El coeficiente es el número, con su signo.', 'المعامل هو العدد بإشارته.'),
        explanation: say('Koefizientea −3 da, eta zati literala $ab^{2}c$.', 'El coeficiente es −3 y la parte literal, $ab^{2}c$.', 'المعامل −3 والجزء الحرفي $ab^{2}c$.')
    },
    {
        id: 6,
        stage: 'monomials',
        prompt: say('Zein da $-3ab^{2}c$ monomioaren maila?', '¿Cuál es el grado del monomio $-3ab^{2}c$?', 'ما درجة وحيد الحد $-3ab^{2}c$؟'),
        expected: fraction(4),
        hint: say('Batu letra guztien berretzaileak; a-k eta c-k 1 dute.', 'Suma los exponentes de todas las letras; a y c tienen 1.', 'اجمع أسس كل الحروف؛ أس a وأس c يساوي 1.'),
        explanation: same('$1+2+1=4$')
    },
    {
        id: 7,
        stage: 'monomials',
        prompt: say('Zein da $6x^{3}-5x^{2}+2x-4$ polinomioaren maila?', '¿Cuál es el grado del polinomio $6x^{3}-5x^{2}+2x-4$?', 'ما درجة الحدودية $6x^{3}-5x^{2}+2x-4$؟'),
        expected: fraction(3),
        hint: say('Maila handieneko gaia: $6x^{3}$.', 'El término de mayor grado: $6x^{3}$.', 'الحد الأعلى درجة: $6x^{3}$.'),
        explanation: say('Maila 3 da. Gai askea −4 da.', 'El grado es 3. El término independiente es −4.', 'الدرجة 3. والحد الثابت −4.')
    },
    {
        id: 8,
        stage: 'monomials',
        prompt: say('Zein da $-2x^{2}+3x-1$ polinomioaren gai askea?', '¿Cuál es el término independiente de $-2x^{2}+3x-1$?', 'ما الحد الثابت في $-2x^{2}+3x-1$؟'),
        expected: fraction(-1),
        hint: say('Letrarik gabeko gaia, bere zeinuarekin.', 'El término sin letras, con su signo.', 'الحد الخالي من الحروف بإشارته.'),
        explanation: same('$-1$')
    },
    {
        id: 9,
        stage: 'operations',
        prompt: say('Laburtu $5ab+3ab-2ab$. Zein da emaitzaren koefizientea?', 'Reduce $5ab+3ab-2ab$. ¿Cuál es el coeficiente del resultado?', 'بسّط $5ab+3ab-2ab$. ما معامل الناتج؟'),
        expected: fraction(6),
        hint: say('Batu eta kendu koefizienteak: $5+3-2$.', 'Suma y resta los coeficientes: $5+3-2$.', 'اجمع المعاملات واطرحها: $5+3-2$.'),
        explanation: same('$5ab+3ab-2ab=6ab$')
    },
    {
        id: 10,
        stage: 'operations',
        prompt: say('Laburtu $6x^{2}-7x+2x^{2}-x$. Zein da $x^{2}$-ren koefizientea?', 'Reduce $6x^{2}-7x+2x^{2}-x$. ¿Cuál es el coeficiente de $x^{2}$?', 'بسّط $6x^{2}-7x+2x^{2}-x$. ما معامل $x^{2}$؟'),
        expected: fraction(8),
        hint: say('Bildu $x^{2}$-ak: $6x^{2}+2x^{2}$.', 'Agrupa las $x^{2}$: $6x^{2}+2x^{2}$.', 'اجمع حدود $x^{2}$: $6x^{2}+2x^{2}$.'),
        explanation: same('$6x^{2}-7x+2x^{2}-x=8x^{2}-8x$')
    },
    {
        id: 11,
        stage: 'operations',
        prompt: say('Biderkatu $(-3a)\\cdot(-4a^{2})$. Zein da koefizientea?', 'Multiplica $(-3a)\\cdot(-4a^{2})$. ¿Cuál es el coeficiente?', 'اضرب $(-3a)\\cdot(-4a^{2})$. ما المعامل؟'),
        expected: fraction(12),
        hint: say('Minus bider minus, plus.', 'Menos por menos, más.', 'سالب في سالب يساوي موجبًا.'),
        explanation: same('$(-3a)\\cdot(-4a^{2})=12a^{3}$')
    },
    {
        id: 12,
        stage: 'operations',
        prompt: say('Kendu parentesiak: $2(x+1)+3x$. Zein da x-ren koefizientea emaitzan?', 'Quita los paréntesis: $2(x+1)+3x$. ¿Cuál es el coeficiente de x en el resultado?', 'احذف الأقواس: $2(x+1)+3x$. ما معامل x في الناتج؟'),
        expected: fraction(5),
        hint: say('$2(x+1)=2x+2$.', '$2(x+1)=2x+2$.', '$2(x+1)=2x+2$.'),
        explanation: same('$2x+2+3x=5x+2$')
    },
    {
        id: 13,
        stage: 'equations',
        prompt: solveIt('$x-7=3$'),
        expected: fraction(10),
        hint: say('−7 batzen pasatzen da.', 'El −7 pasa sumando.', 'ينتقل −7 مجموعًا.'),
        explanation: same('$x=3+7=10$')
    },
    {
        id: 14,
        stage: 'equations',
        prompt: solveIt('$4x+5=13$'),
        expected: fraction(2),
        hint: say('Lehenik 5a kentzen, gero 4a zatitzen.', 'Primero el 5 restando, después el 4 dividiendo.', 'أولًا 5 مطروحًا، ثم 4 قاسمًا.'),
        explanation: same('$4x=8$, $x=2$')
    },
    {
        id: 15,
        stage: 'equations',
        prompt: solveIt('$\\frac{x}{3}-2=3$'),
        expected: fraction(15),
        hint: say('2a batzen pasa, eta gero 3a biderkatzen.', 'Pasa el 2 sumando y después el 3 multiplicando.', 'انقل 2 مجموعًا ثم 3 ضاربًا.'),
        explanation: same('$\\frac{x}{3}=5$, $x=15$')
    },
    {
        id: 16,
        stage: 'equations',
        prompt: solveIt('$x+8=3x-6$'),
        expected: fraction(7),
        hint: say('x-ak eskuinera edo ezkerrera: $8+6=3x-x$.', 'Las x a un lado: $8+6=3x-x$.', 'ضع الـ x في طرف: $8+6=3x-x$.'),
        explanation: same('$14=2x$, $x=7$')
    },
    {
        id: 17,
        stage: 'equations',
        prompt: solveIt('$3(x-3)=5(x-1)-6x$'),
        expected: fraction(1),
        hint: say('Lehenik kendu parentesiak: $3x-9=5x-5-6x$.', 'Primero quita los paréntesis: $3x-9=5x-5-6x$.', 'احذف الأقواس أولًا: $3x-9=5x-5-6x$.'),
        explanation: same('$3x-9=-x-5$, $4x=4$, $x=1$')
    },
    {
        id: 18,
        stage: 'problems',
        prompt: say('Zenbaki baten bikoitza gehi 7 eta 25 da. Zein da zenbakia?', 'El doble de un número más 7 es 25. ¿Qué número es?', 'ضعف عدد زائد 7 يساوي 25. ما العدد؟'),
        expected: fraction(9),
        hint: say('Ekuazioa: $2x+7=25$.', 'Ecuación: $2x+7=25$.', 'المعادلة: $2x+7=25$.'),
        explanation: same('$2x=18$, $x=9$')
    },
    {
        id: 19,
        stage: 'problems',
        prompt: say('Bi zenbaki jarraitu batuta 25 ematen dute. Zein da txikiena?', 'Dos números consecutivos suman 25. ¿Cuál es el menor?', 'مجموع عددين متتاليين 25. ما الأصغر؟'),
        expected: fraction(12),
        hint: say('Zenbakiak: $x$ eta $x+1$.', 'Los números: $x$ y $x+1$.', 'العددان: $x$ و$x+1$.'),
        explanation: same('$x+(x+1)=25$, $2x=24$, $x=12$')
    },
    {
        id: 20,
        stage: 'problems',
        prompt: say('Anek Jonek baino 5 urte gehiago ditu, eta bien artean 31 urte dituzte. Zenbat urte ditu Jonek?', 'Ana tiene 5 años más que Jon, y entre los dos tienen 31. ¿Cuántos años tiene Jon?', 'آنا أكبر من جون بـ 5 سنوات، ومجموع عمريهما 31. كم عمر جون؟'),
        expected: fraction(13),
        hint: say('Jon: $x$. Ane: $x+5$.', 'Jon: $x$. Ana: $x+5$.', 'جون: $x$. آنا: $x+5$.'),
        explanation: same('$x+(x+5)=31$, $2x=26$, $x=13$')
    }
]

export const algebraIntroChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'language',
        context: 'starter',
        points: 10,
        prompt: say('Futbol-zelai baten luzera 100 m da eta zabalera 60 m. Kalkulatu perimetroa: $P=x+y+x+y$.', 'Un campo de fútbol mide 100 m de largo y 60 m de ancho. Calcula el perímetro: $P=x+y+x+y$.', 'طول ملعب كرة قدم 100 م وعرضه 60 م. احسب المحيط: $P=x+y+x+y$.'),
        expected: fraction(320),
        hint: say('Ordeztu $x=100$ eta $y=60$.', 'Sustituye $x=100$ e $y=60$.', 'عوّض $x=100$ و$y=60$.'),
        explanation: same('$100+60+100+60=320$')
    },
    {
        id: 102,
        stage: 'language',
        context: 'starter',
        points: 10,
        prompt: say('Kalkulatu $(a+b)^{2}$ balioa $a=2$ eta $b=3$ direnean.', 'Calcula el valor de $(a+b)^{2}$ para $a=2$ y $b=3$.', 'احسب قيمة $(a+b)^{2}$ عندما $a=2$ و$b=3$.'),
        expected: fraction(25),
        hint: say('Lehenik parentesia: $2+3$.', 'Primero el paréntesis: $2+3$.', 'أولًا القوس: $2+3$.'),
        explanation: same('$(2+3)^{2}=5^{2}=25$')
    },
    {
        id: 103,
        stage: 'equations',
        context: 'starter',
        points: 10,
        prompt: solveIt('$11-x=6$'),
        expected: fraction(5),
        hint: say('Zenbat kendu behar zaio 11ri 6 lortzeko?', '¿Cuánto hay que restar a 11 para obtener 6?', 'كم نطرح من 11 لنحصل على 6؟'),
        explanation: same('$11-5=6$, $x=5$')
    },
    {
        id: 104,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('Zenbaki baten hirukoitza gehi 5 eta 26 da. Zein da zenbakia?', 'El triple de un número más 5 es 26. ¿Qué número es?', 'ثلاثة أضعاف عدد زائد 5 يساوي 26. ما العدد؟'),
        expected: fraction(7),
        hint: say('$3x+5=26$', '$3x+5=26$', '$3x+5=26$'),
        explanation: same('$3x=21$, $x=7$')
    },
    {
        id: 105,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: say('Laburtu $3xy-xy+2xy+5x-2y+y+x$ eta kalkulatu balioa $x=1$ eta $y=2$ direnean.', 'Reduce $3xy-xy+2xy+5x-2y+y+x$ y calcula su valor para $x=1$ e $y=2$.', 'بسّط $3xy-xy+2xy+5x-2y+y+x$ واحسب قيمتها عندما $x=1$ و$y=2$.'),
        expected: fraction(12),
        hint: say('Laburtuta: $4xy+6x-y$.', 'Reducida: $4xy+6x-y$.', 'بعد التبسيط: $4xy+6x-y$.'),
        explanation: same('$4\\cdot 1\\cdot 2+6\\cdot 1-2=8+6-2=12$')
    },
    {
        id: 106,
        stage: 'equations',
        context: 'advanced',
        points: 20,
        prompt: solveIt('$3x+2+x=8+2x$'),
        expected: fraction(3),
        hint: say('Laburtu lehen atala: $4x+2$.', 'Reduce el primer miembro: $4x+2$.', 'بسّط الطرف الأول: $4x+2$.'),
        explanation: same('$4x-2x=8-2$, $2x=6$, $x=3$')
    },
    {
        id: 107,
        stage: 'equations',
        context: 'advanced',
        points: 20,
        prompt: solveIt('$3x+8-5x-5=2(x+6)-7x$'),
        expected: fraction(3),
        hint: say('Bi atalak laburtu: $-2x+3=-5x+12$.', 'Reduce los dos miembros: $-2x+3=-5x+12$.', 'بسّط الطرفين: $-2x+3=-5x+12$.'),
        explanation: same('$-2x+5x=12-3$, $3x=9$, $x=3$')
    },
    {
        id: 108,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Laukizuzen baten luzera zabalera baino 4 cm handiagoa da, eta perimetroa 40 cm da. Zenbat cm ditu zabalerak?', 'El largo de un rectángulo mide 4 cm más que el ancho y su perímetro es 40 cm. ¿Cuántos cm mide el ancho?', 'طول مستطيل يزيد على عرضه بـ 4 سم، ومحيطه 40 سم. كم سنتيمترًا عرضه؟'),
        expected: fraction(8),
        hint: say('Zabalera $x$, luzera $x+4$: $2x+2(x+4)=40$.', 'Ancho $x$, largo $x+4$: $2x+2(x+4)=40$.', 'العرض $x$ والطول $x+4$: $2x+2(x+4)=40$.'),
        explanation: same('$4x+8=40$, $4x=32$, $x=8$')
    },
    {
        id: 109,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Hiru zenbaki jarraituren batura 48 da. Zein da handiena?', 'La suma de tres números consecutivos es 48. ¿Cuál es el mayor?', 'مجموع ثلاثة أعداد متتالية 48. ما الأكبر؟'),
        expected: fraction(17),
        hint: say('$x+(x+1)+(x+2)=48$', '$x+(x+1)+(x+2)=48$', '$x+(x+1)+(x+2)=48$'),
        explanation: same('$3x+3=48$, $x=15$, $x+2=17$')
    },
    {
        id: 110,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Aitak 40 urte ditu eta semeak 10. Zenbat urte barru izango du aitak semearen adina bider bi?', 'Un padre tiene 40 años y su hijo 10. ¿Dentro de cuántos años tendrá el padre el doble de la edad del hijo?', 'عمر أب 40 سنة وعمر ابنه 10. بعد كم سنة يصبح عمر الأب ضعف عمر ابنه؟'),
        expected: fraction(20),
        hint: say('x urte barru: $40+x=2(10+x)$.', 'Dentro de x años: $40+x=2(10+x)$.', 'بعد x سنة: $40+x=2(10+x)$.'),
        explanation: same('$40+x=20+2x$, $x=20$')
    },
    {
        id: 111,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Txanpon pila batek eta haren erdiak 24 € balio dute. Zenbat balio du pilak?', 'Un montón de monedas más su mitad valen 24 €. ¿Cuánto vale el montón?', 'كومة نقود مع نصفها تساوي 24 €. كم تساوي الكومة؟'),
        expected: fraction(16),
        hint: say('$x+\\frac{x}{2}=24$: biderkatu dena 2z.', '$x+\\frac{x}{2}=24$: multiplica todo por 2.', '$x+\\frac{x}{2}=24$: اضرب الكل في 2.'),
        explanation: same('$2x+x=48$, $3x=48$, $x=16$')
    },
    {
        id: 112,
        stage: 'equations',
        context: 'master',
        points: 30,
        prompt: solveIt('$5x-3x=20+x$'),
        expected: fraction(20),
        hint: say('Laburtu: $2x=20+x$.', 'Reduce: $2x=20+x$.', 'بسّط: $2x=20+x$.'),
        explanation: same('$2x-x=20$, $x=20$')
    }
]

export const algebraIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'language',
        title: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi zenbakizko hizkuntzan: a) biren hirukoitza sei da; b) hogei zati bost lau da; c) biren kuboa zortzi da.', 'Expresa con lenguaje numérico: a) el triple de dos es seis; b) veinte dividido entre cinco es cuatro; c) el cubo de dos es ocho.', 'اكتب باللغة العددية: أ) ثلاثة أضعاف اثنين ستة؛ ب) عشرون على خمسة أربعة؛ ج) مكعب اثنين ثمانية.'), solution: same('a) $3\\cdot 2=6$; b) $20\\mathbin{:}5=4$; c) $2^{3}=8$') },
            { id: 2, difficulty: 'easy', question: say('Idatzi hizkuntza aljebraikoan: a) zenbaki baten bikoitza; b) zenbaki bat ken 3; c) zenbaki baten erdia; d) zenbaki baten karratua.', 'Escribe en lenguaje algebraico: a) el doble de un número; b) un número disminuido en 3; c) la mitad de un número; d) el cuadrado de un número.', 'اكتب باللغة الجبرية: أ) ضعف عدد؛ ب) عدد ناقص 3؛ ج) نصف عدد؛ د) مربع عدد.'), solution: same('a) $2x$; b) $x-3$; c) $\\frac{x}{2}$; d) $x^{2}$') },
            { id: 3, difficulty: 'medium', question: say('Idatzi: a) bi zenbakiren baturaren bikoitza; b) zure adina duela 4 urte; c) karratu baten azalera, aldea l bada.', 'Escribe: a) el doble de la suma de dos números; b) tu edad hace 4 años; c) el área de un cuadrado de lado l.', 'اكتب: أ) ضعف مجموع عددين؛ ب) عمرك قبل 4 سنوات؛ ج) مساحة مربع طول ضلعه l.'), solution: same('a) $2(x+y)$; b) $x-4$; c) $l^{2}$') },
            { id: 4, difficulty: 'medium', question: say('Osatu $3x-2$ eta $x^{2}+1$ adierazpenen balioen taula, $x=-1$, $0$ eta $2$ direnean.', 'Completa la tabla de valores de $3x-2$ y $x^{2}+1$ para $x=-1$, $0$ y $2$.', 'أكمل جدول قيم $3x-2$ و$x^{2}+1$ عندما $x=-1$ و$0$ و$2$.'), solution: say('$x=-1$: −5 eta 2. $x=0$: −2 eta 1. $x=2$: 4 eta 5.', '$x=-1$: −5 y 2. $x=0$: −2 y 1. $x=2$: 4 y 5.', '$x=-1$: ‏−5 و2. $x=0$: ‏−2 و1. $x=2$: ‏4 و5.') },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu $5a-2b$ adierazpenaren balioa $a=2$ eta $b=3$ direnean.', 'Calcula el valor de $5a-2b$ para $a=2$ y $b=3$.', 'احسب قيمة $5a-2b$ عندما $a=2$ و$b=3$.'), solution: same('$5\\cdot 2-2\\cdot 3=10-6=4$'), answer: { expected: fraction(4) } },
            { id: 6, difficulty: 'hard', question: say('Kalkulatu $(a+b)^{2}$ balioa $a=-2$ eta $b=-3$ direnean.', 'Calcula el valor de $(a+b)^{2}$ para $a=-2$ y $b=-3$.', 'احسب قيمة $(a+b)^{2}$ عندما $a=-2$ و$b=-3$.'), solution: same('$(-2-3)^{2}=(-5)^{2}=25$'), answer: { expected: fraction(25) } }
        ]
    },
    {
        id: 'monomials',
        title: say('Monomioak eta polinomioak', 'Monomios y polinomios', 'وحيدات الحد والحدوديات'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Idatzi koefizientea eta zati literala: a) $4xyz$; b) $-3ab^{2}c$; c) $-x^{2}$.', 'Escribe el coeficiente y la parte literal: a) $4xyz$; b) $-3ab^{2}c$; c) $-x^{2}$.', 'اكتب المعامل والجزء الحرفي: أ) $4xyz$؛ ب) $-3ab^{2}c$؛ ج) $-x^{2}$.'), solution: say('a) 4 eta $xyz$; b) −3 eta $ab^{2}c$; c) −1 eta $x^{2}$.', 'a) 4 y $xyz$; b) −3 y $ab^{2}c$; c) −1 y $x^{2}$.', 'أ) 4 و$xyz$؛ ب) −3 و$ab^{2}c$؛ ج) −1 و$x^{2}$.') },
            { id: 8, difficulty: 'easy', question: say('Esan maila: a) $2x$; b) $-4a^{2}bc^{3}$; c) $3x^{3}$.', 'Indica el grado: a) $2x$; b) $-4a^{2}bc^{3}$; c) $3x^{3}$.', 'بيّن الدرجة: أ) $2x$؛ ب) $-4a^{2}bc^{3}$؛ ج) $3x^{3}$.'), solution: same('a) 1; b) $2+1+3=6$; c) 3') },
            { id: 9, difficulty: 'medium', question: say('Idatzi bi monomio antzeko hauetako bakoitzerako: a) $-2a^{2}b$; b) $-5x^{3}$; c) $-y^{2}z^{3}$.', 'Escribe dos monomios semejantes a cada uno: a) $-2a^{2}b$; b) $-5x^{3}$; c) $-y^{2}z^{3}$.', 'اكتب وحيدَي حد مشابهين لكل من: أ) $-2a^{2}b$؛ ب) $-5x^{3}$؛ ج) $-y^{2}z^{3}$.'), solution: say('Adibidez: a) $a^{2}b$, $7a^{2}b$; b) $x^{3}$, $2x^{3}$; c) $4y^{2}z^{3}$, $-y^{2}z^{3}$.', 'Por ejemplo: a) $a^{2}b$, $7a^{2}b$; b) $x^{3}$, $2x^{3}$; c) $4y^{2}z^{3}$, $-y^{2}z^{3}$.', 'مثلًا: أ) $a^{2}b$، $7a^{2}b$؛ ب) $x^{3}$، $2x^{3}$؛ ج) $4y^{2}z^{3}$، $-y^{2}z^{3}$.') },
            { id: 10, difficulty: 'medium', question: say('Idatzi gaiak, gai askea eta maila: $-2x^{2}+3x-1$.', 'Escribe los términos, el término independiente y el grado: $-2x^{2}+3x-1$.', 'اكتب الحدود والحد الثابت والدرجة: $-2x^{2}+3x-1$.'), solution: say('Gaiak: $-2x^{2}$, $3x$, $-1$. Gai askea: −1. Maila: 2.', 'Términos: $-2x^{2}$, $3x$, $-1$. Independiente: −1. Grado: 2.', 'الحدود: $-2x^{2}$، $3x$، $-1$. الثابت: −1. الدرجة: 2.') },
            { id: 11, difficulty: 'medium', question: say('Zein da $4ab-2a^{2}b$ polinomioaren maila?', '¿Cuál es el grado de $4ab-2a^{2}b$?', 'ما درجة $4ab-2a^{2}b$؟'), solution: say('$4ab$-k 2 maila du eta $-2a^{2}b$-k 3: polinomioaren maila 3 da.', '$4ab$ tiene grado 2 y $-2a^{2}b$ grado 3: el polinomio es de grado 3.', 'درجة $4ab$ هي 2 ودرجة $-2a^{2}b$ هي 3: درجة الحدودية 3.'), answer: { expected: fraction(3) } },
            { id: 12, difficulty: 'hard', question: say('Idatzi 3 mailako polinomio bat bi gairekin, eta beste bat hiru gairekin eta −5 gai askearekin.', 'Escribe un polinomio de grado 3 con dos términos y otro con tres términos y término independiente −5.', 'اكتب حدودية من الدرجة 3 بحدّين، وأخرى بثلاثة حدود وحدّها الثابت −5.'), solution: say('Adibidez: $x^{3}+2x$ eta $4x^{3}-x-5$.', 'Por ejemplo: $x^{3}+2x$ y $4x^{3}-x-5$.', 'مثلًا: $x^{3}+2x$ و$4x^{3}-x-5$.') }
        ]
    },
    {
        id: 'operations',
        title: say('Monomioekin eragiketak', 'Operaciones con monomios', 'العمليات على وحيدات الحد'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Laburtu: a) $x+x+x+x+x+x$; b) $x^{2}+x^{2}$; c) $5a-2a-4a$; d) $6p+2p+5p$.', 'Reduce: a) $x+x+x+x+x+x$; b) $x^{2}+x^{2}$; c) $5a-2a-4a$; d) $6p+2p+5p$.', 'بسّط: أ) $x+x+x+x+x+x$؛ ب) $x^{2}+x^{2}$؛ ج) $5a-2a-4a$؛ د) $6p+2p+5p$.'), solution: same('a) $6x$; b) $2x^{2}$; c) $-a$; d) $13p$') },
            { id: 14, difficulty: 'easy', question: say('Biderkatu: a) $3a\\cdot 2a$; b) $2x\\cdot 3x\\cdot 4x$; c) $5a\\cdot(-5a^{2})$.', 'Multiplica: a) $3a\\cdot 2a$; b) $2x\\cdot 3x\\cdot 4x$; c) $5a\\cdot(-5a^{2})$.', 'اضرب: أ) $3a\\cdot 2a$؛ ب) $2x\\cdot 3x\\cdot 4x$؛ ج) $5a\\cdot(-5a^{2})$.'), solution: same('a) $6a^{2}$; b) $24x^{3}$; c) $-25a^{3}$') },
            { id: 15, difficulty: 'medium', question: say('Laburtu: $3x^{3}-2x+5x^{2}-x^{3}+4x^{2}$.', 'Reduce: $3x^{3}-2x+5x^{2}-x^{3}+4x^{2}$.', 'بسّط: $3x^{3}-2x+5x^{2}-x^{3}+4x^{2}$.'), solution: same('$2x^{3}+9x^{2}-2x$') },
            { id: 16, difficulty: 'medium', question: say('Zatitu: a) $8x^{2}\\mathbin{:}2x$; b) $-12x^{5}\\mathbin{:}3x^{5}$.', 'Divide: a) $8x^{2}\\mathbin{:}2x$; b) $-12x^{5}\\mathbin{:}3x^{5}$.', 'اقسم: أ) $8x^{2}\\mathbin{:}2x$؛ ب) $-12x^{5}\\mathbin{:}3x^{5}$.'), solution: same('a) $4x$; b) $-4$') },
            { id: 17, difficulty: 'medium', question: say('Kendu parentesiak eta laburtu: a) $2(x-2)$; b) $3(x^{2}+x)+5x$; c) $-4(x^{2}-x)-2x$.', 'Quita los paréntesis y reduce: a) $2(x-2)$; b) $3(x^{2}+x)+5x$; c) $-4(x^{2}-x)-2x$.', 'احذف الأقواس وبسّط: أ) $2(x-2)$؛ ب) $3(x^{2}+x)+5x$؛ ج) $-4(x^{2}-x)-2x$.'), solution: same('a) $2x-4$; b) $3x^{2}+8x$; c) $-4x^{2}+2x$') },
            { id: 18, difficulty: 'hard', question: say('Laburtu $2a-5a+4a-a+10a-6a$ eta kalkulatu balioa $a=3$ denean.', 'Reduce $2a-5a+4a-a+10a-6a$ y calcula su valor para $a=3$.', 'بسّط $2a-5a+4a-a+10a-6a$ واحسب قيمتها عندما $a=3$.'), solution: same('$4a$, $4\\cdot 3=12$'), answer: { expected: fraction(12) } }
        ]
    },
    {
        id: 'equations',
        title: say('Ekuazioak', 'Ecuaciones', 'المعادلات'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Esan zer den bakoitza (berdintza, identitatea edo ekuazioa): a) $6+5=11$; b) $3+x=15$; c) $a+b=b+a$; d) $x+x+x=3x$.', 'Indica qué es cada una (igualdad, identidad o ecuación): a) $6+5=11$; b) $3+x=15$; c) $a+b=b+a$; d) $x+x+x=3x$.', 'بيّن نوع كل منها (مساواة أو متطابقة أو معادلة): أ) $6+5=11$؛ ب) $3+x=15$؛ ج) $a+b=b+a$؛ د) $x+x+x=3x$.'), solution: say('a) zenbakizko berdintza; b) ekuazioa; c) identitatea; d) identitatea.', 'a) igualdad numérica; b) ecuación; c) identidad; d) identidad.', 'أ) مساواة عددية؛ ب) معادلة؛ ج) متطابقة؛ د) متطابقة.') },
            { id: 20, difficulty: 'easy', question: say('Ebatzi buruz: a) $5+x=7$; b) $11-x=6$; c) $9-x=1$.', 'Resuelve mentalmente: a) $5+x=7$; b) $11-x=6$; c) $9-x=1$.', 'حلّ ذهنيًا: أ) $5+x=7$؛ ب) $11-x=6$؛ ج) $9-x=1$.'), solution: same('a) $x=2$; b) $x=5$; c) $x=8$') },
            { id: 21, difficulty: 'medium', question: solveIt('$6x-2x=8$'), solution: same('$4x=8$, $x=2$'), answer: { expected: fraction(2) } },
            { id: 22, difficulty: 'medium', question: solveIt('$8x-5x=12$'), solution: same('$3x=12$, $x=4$'), answer: { expected: fraction(4) } },
            { id: 23, difficulty: 'medium', question: solveIt('$4x-7=3-x$'), solution: same('$5x=10$, $x=2$'), answer: { expected: fraction(2) } },
            { id: 24, difficulty: 'hard', question: solveIt('$2(x+1)=3(x-2)$'), solution: same('$2x+2=3x-6$, $2+6=3x-2x$, $x=8$'), answer: { expected: fraction(8) } }
        ]
    },
    {
        id: 'problems',
        title: say('Buruketak ekuazioekin', 'Problemas con ecuaciones', 'مسائل بالمعادلات'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Zenbaki bati 12 batuz gero, 30 lortzen da. Zein da zenbakia?', 'Si a un número le sumamos 12, obtenemos 30. ¿Qué número es?', 'إذا أضفنا 12 إلى عدد نحصل على 30. ما العدد؟'), solution: same('$x+12=30$, $x=18$'), answer: { expected: fraction(18) } },
            { id: 26, difficulty: 'easy', question: say('Zenbaki baten laurdena 6 da. Zein da zenbakia?', 'La cuarta parte de un número es 6. ¿Qué número es?', 'ربع عدد يساوي 6. ما العدد؟'), solution: same('$\\frac{x}{4}=6$, $x=24$'), answer: { expected: fraction(24) } },
            { id: 27, difficulty: 'medium', question: say('Liburu batek eta koaderno batek 15 € balio dute. Liburuak koadernoak baino 9 € gehiago balio ditu. Zenbat balio du koadernoak?', 'Un libro y un cuaderno cuestan 15 €. El libro cuesta 9 € más que el cuaderno. ¿Cuánto cuesta el cuaderno?', 'كتاب ودفتر ثمنهما 15 €. الكتاب أغلى من الدفتر بـ 9 €. كم ثمن الدفتر؟'), solution: same('$x+(x+9)=15$, $2x=6$, $x=3$'), answer: { expected: fraction(3) } },
            { id: 28, difficulty: 'medium', question: say('Triangelu aldeberdin baten perimetroa 27 cm da. Zenbat cm ditu alde bakoitzak?', 'El perímetro de un triángulo equilátero es 27 cm. ¿Cuánto mide cada lado?', 'محيط مثلث متساوي الأضلاع 27 سم. كم طول كل ضلع؟'), solution: same('$3x=27$, $x=9$'), answer: { expected: fraction(9) } },
            { id: 29, difficulty: 'hard', question: say('Mikelek 3 urte barru izango duen adina duela 4 urte zuenaren bikoitza izango da. Zenbat urte ditu?', 'La edad de Mikel dentro de 3 años será el doble de la que tenía hace 4 años. ¿Cuántos años tiene?', 'عمر ميكيل بعد 3 سنوات سيكون ضعف عمره قبل 4 سنوات. كم عمره الآن؟'), solution: same('$x+3=2(x-4)$, $x+3=2x-8$, $x=11$'), answer: { expected: fraction(11) } },
            { id: 30, difficulty: 'hard', question: say('Gela batean 28 ikasle daude eta mutilak neskak baino 4 gutxiago dira. Zenbat neska daude?', 'En una clase hay 28 alumnos y los chicos son 4 menos que las chicas. ¿Cuántas chicas hay?', 'في صف 28 تلميذًا، والأولاد أقل من البنات بـ 4. كم بنتًا في الصف؟'), solution: same('$x+(x-4)=28$, $2x=32$, $x=16$'), answer: { expected: fraction(16) } }
        ]
    }
]
