import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak · 2. DBH — diagnostic, guided practice, exercise bank and
   challenges from Santillana 2.º ESO unit 6 and Anaya 2.º ESO unit 7.
   Answers are the value of x (or of the unknown asked for); with two
   solutions, the prompt says which one to write.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const equationsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 2601,
        prompt: say('x = 2 ebazpena al da $3x-1=5$ ekuazioan?', '¿Es x = 2 solución de $3x-1=5$?', 'هل x = 2 حل للمعادلة $3x-1=5$؟'),
        options: [say('Bai', 'Sí', 'نعم'), say('Ez', 'No', 'لا'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن المعرفة')],
        correctIndex: 0,
        explanation: say('Ordeztuta: $3\\cdot 2-1=5$. Bi atalak berdinak dira.', 'Sustituyendo: $3\\cdot 2-1=5$. Los dos miembros son iguales.', 'بالتعويض: $3\\cdot 2-1=5$. الطرفان متساويان.'),
        topic: 'meaning'
    },
    {
        id: 2602,
        prompt: say('Zein da $x^{2}+6x-x^{2}=7x-1$ ekuazioaren maila?', '¿Cuál es el grado de la ecuación $x^{2}+6x-x^{2}=7x-1$?', 'ما درجة المعادلة $x^{2}+6x-x^{2}=7x-1$؟'),
        options: [same('$2$'), same('$1$'), same('$0$')],
        correctIndex: 1,
        explanation: say('Laburtuta, $x^{2}$ desagertzen da: $6x=7x-1$. Lehen mailakoa da.', 'Al reducir, $x^{2}$ desaparece: $6x=7x-1$. Es de primer grado.', 'عند التبسيط يختفي $x^{2}$: $6x=7x-1$. إنها من الدرجة الأولى.'),
        topic: 'elements'
    },
    {
        id: 2603,
        prompt: say('Ebatzi $5x-4=2x+11$.', 'Resuelve $5x-4=2x+11$.', 'حلّ $5x-4=2x+11$.'),
        options: [same('$x=5$'), same('$x=\\frac{7}{3}$'), same('$x=15$')],
        correctIndex: 0,
        explanation: same('$5x-2x=11+4\\ \\to\\ 3x=15\\ \\to\\ x=5$'),
        topic: 'simple'
    },
    {
        id: 2604,
        prompt: say('Ebatzi $2(x+3)=x+10$.', 'Resuelve $2(x+3)=x+10$.', 'حلّ $2(x+3)=x+10$.'),
        options: [same('$x=7$'), same('$x=4$'), same('$x=2$')],
        correctIndex: 1,
        explanation: say('$2x+6=x+10$, beraz $x=4$. (7 ateratzen da 3 parentesitik biderkatu gabe.)', '$2x+6=x+10$, así que $x=4$. (Sale 7 si no se multiplica el 3 del paréntesis.)', '$2x+6=x+10$، إذن $x=4$. (ينتج 7 إذا لم نضرب 3 داخل القوس.)'),
        topic: 'brackets'
    },
    {
        id: 2605,
        prompt: say('Ebatzi $\\frac{x}{2}+\\frac{x}{3}=5$.', 'Resuelve $\\frac{x}{2}+\\frac{x}{3}=5$.', 'حلّ $\\frac{x}{2}+\\frac{x}{3}=5$.'),
        options: [same('$x=1$'), same('$x=30$'), same('$x=6$')],
        correctIndex: 2,
        explanation: say('Bider 6: $3x+2x=30$, $5x=30$, $x=6$.', 'Por 6: $3x+2x=30$, $5x=30$, $x=6$.', 'في 6: $3x+2x=30$، $5x=30$، $x=6$.'),
        topic: 'lcm'
    },
    {
        id: 2606,
        prompt: say('«Zenbaki baten hirukoitzari 8 kenduta, 25 lortzen da.» Zein da ekuazioa?', '«Si al triple de un número le restas 8, obtienes 25.» ¿Cuál es la ecuación?', '«إذا طرحت 8 من ثلاثة أضعاف عدد تحصل على 25.» ما المعادلة؟'),
        options: [same('$3(x-8)=25$'), same('$3x-8=25$'), same('$8-3x=25$')],
        correctIndex: 1,
        explanation: say('Lehenik hirukoitza, $3x$, eta gero 8 kendu.', 'Primero el triple, $3x$, y después se resta 8.', 'أولًا ثلاثة الأضعاف $3x$ ثم نطرح 8.'),
        topic: 'problem-steps'
    },
    {
        id: 2607,
        prompt: say('Ebatzi $x^{2}-9=0$.', 'Resuelve $x^{2}-9=0$.', 'حلّ $x^{2}-9=0$.'),
        options: [same('$x=3$'), same('$x=\\pm 3$'), same('$x=\\pm 9$')],
        correctIndex: 1,
        explanation: say('$x^{2}=9$: bi ebazpen, $3$ eta $-3$, biak baitira karratuan 9.', '$x^{2}=9$: dos soluciones, $3$ y $-3$, porque las dos al cuadrado dan 9.', '$x^{2}=9$: حلان، $3$ و$-3$، لأن مربع كل منهما 9.'),
        topic: 'incomplete'
    },
    {
        id: 2608,
        prompt: say('Zenbat ebazpen ditu $x^{2}+2x+5=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}+2x+5=0$?', 'كم حلًّا للمعادلة $x^{2}+2x+5=0$؟'),
        options: [same('$2$'), same('$1$'), same('$0$')],
        correctIndex: 2,
        explanation: say('$\\Delta=2^{2}-4\\cdot 1\\cdot 5=-16$: negatiboa, ez dago ebazpenik.', '$\\Delta=2^{2}-4\\cdot 1\\cdot 5=-16$: negativo, no hay solución.', '$\\Delta=2^{2}-4\\cdot 1\\cdot 5=-16$: سالب، لا حل.'),
        topic: 'formula'
    }
]

export const equationsPractice: PracticeItem[] = [
    { id: 1, stage: 'basics', prompt: say('Zenbat izan behar du k-k, x = 2 izan dadin $kx+3=11$ ekuazioaren ebazpena?', '¿Cuánto tiene que valer k para que x = 2 sea solución de $kx+3=11$?', 'كم يجب أن تكون k ليكون x = 2 حلًّا لـ $kx+3=11$؟'), expected: fraction(4), hint: say('Ordeztu x = 2.', 'Sustituye x = 2.', 'عوّض x = 2.'), explanation: say('$2k+3=11$, $2k=8$, $k=4$.', '$2k+3=11$, $2k=8$, $k=4$.', '$2k+3=11$، $2k=8$، $k=4$.') },
    { id: 2, stage: 'basics', prompt: say('Ebatzi buruz: $x+7=15$.', 'Resuelve de cabeza: $x+7=15$.', 'حلّ ذهنيًا: $x+7=15$.'), expected: fraction(8), hint: say('Zenbat falta zaio 7ri 15 izateko?', '¿Cuánto le falta a 7 para 15?', 'كم ينقص 7 ليصبح 15؟'), explanation: same('$x=15-7=8$') },
    { id: 3, stage: 'basics', prompt: say('Ebatzi: $3x=21$.', 'Resuelve: $3x=21$.', 'حلّ: $3x=21$.'), expected: fraction(7), hint: say('3a zatitzen pasatzen da.', 'El 3 pasa dividiendo.', 'ينتقل 3 قاسمًا.'), explanation: same('$x=21\\mathbin{:}3=7$') },
    { id: 4, stage: 'basics', prompt: say('Ebatzi: $\\frac{x}{5}=3$.', 'Resuelve: $\\frac{x}{5}=3$.', 'حلّ: $\\frac{x}{5}=3$.'), expected: fraction(15), hint: say('5a biderkatzen pasatzen da.', 'El 5 pasa multiplicando.', 'ينتقل 5 ضاربًا.'), explanation: same('$x=3\\cdot 5=15$') },
    { id: 5, stage: 'first-degree', prompt: say('Ebatzi $5x-4=2x+11$.', 'Resuelve $5x-4=2x+11$.', 'حلّ $5x-4=2x+11$.'), expected: fraction(5), hint: say('x-ak ezkerrera, zenbakiak eskuinera.', 'Las x a la izquierda, los números a la derecha.', 'x إلى اليسار والأعداد إلى اليمين.'), explanation: same('$3x=15\\ \\to\\ x=15\\mathbin{:}3=5$') },
    { id: 6, stage: 'first-degree', prompt: say('Ebatzi $4x-7=3-x$.', 'Resuelve $4x-7=3-x$.', 'حلّ $4x-7=3-x$.'), expected: fraction(2), hint: say('−x batzen pasatzen da.', 'El −x pasa sumando.', 'ينتقل −x جامعًا.'), explanation: same('$5x=10\\ \\to\\ x=10\\mathbin{:}5=2$') },
    { id: 7, stage: 'first-degree', prompt: say('Ebatzi $3(x-2)-(x-4)=8$.', 'Resuelve $3(x-2)-(x-4)=8$.', 'حلّ $3(x-2)-(x-4)=8$.'), expected: fraction(5), hint: say('Minusaren atzean zeinuak aldatu.', 'Tras el menos cambian los signos.', 'بعد الناقص تتغيّر الإشارات.'), explanation: same('$3x-6-x+4=8\\ \\to\\ 2x=10\\ \\to\\ x=5$') },
    { id: 8, stage: 'first-degree', prompt: say('Ebatzi $5(x-1)=3x+9$.', 'Resuelve $5(x-1)=3x+9$.', 'حلّ $5(x-1)=3x+9$.'), expected: fraction(7), hint: say('Lehenik parentesia: $5x-5$.', 'Primero el paréntesis: $5x-5$.', 'القوس أولًا: $5x-5$.'), explanation: same('$5x-5=3x+9\\ \\to\\ 2x=14\\ \\to\\ x=7$') },
    { id: 9, stage: 'denominators', prompt: say('Ebatzi $\\frac{x}{3}+2=7$.', 'Resuelve $\\frac{x}{3}+2=7$.', 'حلّ $\\frac{x}{3}+2=7$.'), expected: fraction(15), hint: say('Biderkatu gai guztiak 3z.', 'Multiplica todos los términos por 3.', 'اضرب كل الحدود في 3.'), explanation: same('$x+6=21\\ \\to\\ x=21-6=15$') },
    { id: 10, stage: 'denominators', prompt: say('Ebatzi $\\frac{x}{2}+\\frac{x}{3}=5$.', 'Resuelve $\\frac{x}{2}+\\frac{x}{3}=5$.', 'حلّ $\\frac{x}{2}+\\frac{x}{3}=5$.'), expected: fraction(6), hint: say('MKT(2, 3) = 6.', 'm.c.m.(2, 3) = 6.', 'م.م.أ(2، 3) = 6.'), explanation: same('$3x+2x=30\\ \\to\\ x=30\\mathbin{:}5=6$') },
    { id: 11, stage: 'denominators', prompt: say('Ebatzi $\\frac{2x-1}{5}=3$.', 'Resuelve $\\frac{2x-1}{5}=3$.', 'حلّ $\\frac{2x-1}{5}=3$.'), expected: fraction(8), hint: say('Biderkatu 5ez.', 'Multiplica por 5.', 'اضرب في 5.'), explanation: same('$2x-1=15\\ \\to\\ x=16\\mathbin{:}2=8$') },
    { id: 12, stage: 'denominators', prompt: say('Ebatzi $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', 'Resuelve $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', 'حلّ $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.'), expected: fraction(7), hint: say('MKT = 4; kontuz bigarren zatikiaren aurreko minusarekin.', 'm.c.m. = 4; cuidado con el menos delante de la segunda fracción.', 'م.م.أ = 4؛ انتبه للناقص قبل الكسر الثاني.'), explanation: same('$2(x+1)-(x-3)=12\\ \\to\\ x+5=12\\ \\to\\ x=7$') },
    { id: 13, stage: 'problems', prompt: say('Zenbaki baten hirukoitzari 8 kenduta, 25 lortzen da. Zein da zenbakia?', 'Si al triple de un número le restas 8, obtienes 25. ¿Qué número es?', 'إذا طرحت 8 من ثلاثة أضعاف عدد تحصل على 25. ما العدد؟'), expected: fraction(11), hint: say('$3x-8=25$', '$3x-8=25$', '$3x-8=25$'), explanation: same('$3x=33\\ \\to\\ x=33\\mathbin{:}3=11$') },
    { id: 14, stage: 'problems', prompt: say('Aitak semeak baino 30 urte gehiago ditu, eta 5 urte barru semearen adinaren hirukoitza izango du. Zenbat urte ditu semeak?', 'Un padre tiene 30 años más que su hijo y dentro de 5 años tendrá el triple de su edad. ¿Cuántos años tiene el hijo?', 'الأب أكبر من ابنه بـ 30 سنة، وبعد 5 سنوات سيكون عمره ثلاثة أضعاف عمر الابن. كم عمر الابن؟'), expected: fraction(10), hint: say('$x+35=3(x+5)$', '$x+35=3(x+5)$', '$x+35=3(x+5)$'), explanation: same('$x+35=3x+15\\ \\to\\ 2x=20\\ \\to\\ x=10$') },
    { id: 15, stage: 'problems', prompt: say('Laukizuzen bat zabalera baino 3 m luzeagoa da eta perimetroa 30 m da. Zenbat metro ditu zabalerak?', 'Un rectángulo es 3 m más largo que ancho y su perímetro mide 30 m. ¿Cuántos metros mide el ancho?', 'مستطيل طوله أكبر من عرضه بـ 3 م ومحيطه 30 م. كم مترًا عرضه؟'), expected: fraction(6), hint: say('$2x+2(x+3)=30$', '$2x+2(x+3)=30$', '$2x+2(x+3)=30$'), explanation: same('$4x+6=30\\ \\to\\ x=24\\mathbin{:}4=6$') },
    { id: 16, stage: 'problems', prompt: say('Kontzertu baterako sarreren heren bat lehen egunean saldu zen, laurden bat bigarrenean eta gainerako 200ak hirugarrenean. Zenbat sarrera zeuden?', 'De las entradas de un concierto, un tercio se vendió el primer día, un cuarto el segundo y las 200 restantes el tercero. ¿Cuántas entradas había?', 'بيع ثلث تذاكر حفلة في اليوم الأول وربعها في الثاني والـ 200 الباقية في الثالث. كم تذكرة كانت؟'), expected: fraction(480), hint: say('$\\frac{x}{3}+\\frac{x}{4}+200=x$', '$\\frac{x}{3}+\\frac{x}{4}+200=x$', '$\\frac{x}{3}+\\frac{x}{4}+200=x$'), explanation: same('$4x+3x+2\\,400=12x\\ \\to\\ 5x=2\\,400\\ \\to\\ x=2\\,400\\mathbin{:}5=480$') },
    { id: 17, stage: 'quadratic', prompt: say('Ebatzi $x^{2}-49=0$. Idatzi ebazpen positiboa.', 'Resuelve $x^{2}-49=0$. Escribe la solución positiva.', 'حلّ $x^{2}-49=0$. اكتب الحل الموجب.'), expected: fraction(7), hint: say('$x^{2}=49$', '$x^{2}=49$', '$x^{2}=49$'), explanation: say('$x^{2}=49$, beraz $x=7$ edo $x=-7$.', '$x^{2}=49$, así que $x=7$ o $x=-7$.', '$x^{2}=49$، إذن $x=7$ أو $x=-7$.') },
    { id: 18, stage: 'quadratic', prompt: say('Ebatzi $x^{2}-5x=0$. Idatzi 0 ez den ebazpena.', 'Resuelve $x^{2}-5x=0$. Escribe la solución que no es 0.', 'حلّ $x^{2}-5x=0$. اكتب الحل غير الصفري.'), expected: fraction(5), hint: say('Atera x faktore komun gisa.', 'Saca x factor común.', 'أخرج x عاملًا مشتركًا.'), explanation: say('$x(x-5)=0$: $x=0$ edo $x=5$.', '$x(x-5)=0$: $x=0$ o $x=5$.', '$x(x-5)=0$: $x=0$ أو $x=5$.') },
    { id: 19, stage: 'quadratic', prompt: say('Ebatzi $x^{2}-5x+6=0$. Idatzi ebazpen handiena.', 'Resuelve $x^{2}-5x+6=0$. Escribe la solución mayor.', 'حلّ $x^{2}-5x+6=0$. اكتب الحل الأكبر.'), expected: fraction(3), hint: say('$\\Delta=25-24=1$', '$\\Delta=25-24=1$', '$\\Delta=25-24=1$'), explanation: same('$x=\\frac{5+1}{2}=3$') },
    { id: 20, stage: 'quadratic', prompt: say('Kalkulatu $x^{2}+2x-8=0$ ekuazioaren diskriminatzailea.', 'Calcula el discriminante de $x^{2}+2x-8=0$.', 'احسب مميّز المعادلة $x^{2}+2x-8=0$.'), expected: fraction(36), hint: say('$b^{2}-4ac$, c = −8.', '$b^{2}-4ac$, con c = −8.', '$b^{2}-4ac$ مع c = −8.'), explanation: same('$2^{2}-4\\cdot 1\\cdot(-8)=4+32=36$') }
]

export const equationsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'basics', context: 'starter', points: 10, prompt: say('$4x=20$ eta $4x-5=k$ baliokideak dira. Zenbat da k?', '$4x=20$ y $4x-5=k$ son equivalentes. ¿Cuánto vale k?', '$4x=20$ و$4x-5=k$ متكافئتان. كم k؟'), expected: fraction(15), hint: say('Ebazpen bera dute: x = 5.', 'Tienen la misma solución: x = 5.', 'لهما الحل نفسه: x = 5.'), explanation: same('$4\\cdot 5-5=15$') },
    { id: 102, stage: 'first-degree', context: 'starter', points: 10, prompt: say('Ebatzi $2(x+3)=x+10$.', 'Resuelve $2(x+3)=x+10$.', 'حلّ $2(x+3)=x+10$.'), expected: fraction(4), hint: say('$2x+6=x+10$', '$2x+6=x+10$', '$2x+6=x+10$'), explanation: same('$2x-x=10-6=4$') },
    { id: 103, stage: 'denominators', context: 'starter', points: 10, prompt: say('Ebatzi $\\frac{x}{4}-\\frac{x}{6}=1$.', 'Resuelve $\\frac{x}{4}-\\frac{x}{6}=1$.', 'حلّ $\\frac{x}{4}-\\frac{x}{6}=1$.'), expected: fraction(12), hint: say('MKT(4, 6) = 12.', 'm.c.m.(4, 6) = 12.', 'م.م.أ(4، 6) = 12.'), explanation: same('$3x-2x=12\\ \\to\\ x=12$') },
    { id: 104, stage: 'problems', context: 'starter', points: 10, prompt: say('Hiru zenbaki jarraituren batura 48 da. Zein da txikiena?', 'La suma de tres números consecutivos es 48. ¿Cuál es el menor?', 'مجموع ثلاثة أعداد متتالية 48. ما أصغرها؟'), expected: fraction(15), hint: say('$x+(x+1)+(x+2)=48$', '$x+(x+1)+(x+2)=48$', '$x+(x+1)+(x+2)=48$'), explanation: same('$3x+3=48\\ \\to\\ x=45\\mathbin{:}3=15$') },
    { id: 105, stage: 'problems', context: 'advanced', points: 20, prompt: say('Rosak bere aitak baino 25 urte gutxiago ditu, eta bere semeak baino 26 urte gehiago. Hiruren artean 98 urte dituzte. Zenbat urte ditu Rosak?', 'Rosa tiene 25 años menos que su padre y 26 más que su hijo. Entre los tres suman 98 años. ¿Cuántos años tiene Rosa?', 'روزا أصغر من أبيها بـ 25 سنة وأكبر من ابنها بـ 26 سنة. مجموع أعمارهم 98 سنة. كم عمر روزا؟'), expected: fraction(33), hint: say('Rosa: x. Aita: x + 25. Semea: x − 26.', 'Rosa: x. Padre: x + 25. Hijo: x − 26.', 'روزا: x. الأب: x + 25. الابن: x − 26.'), explanation: same('$3x-1=98\\ \\to\\ x=99\\mathbin{:}3=33$') },
    { id: 106, stage: 'problems', context: 'advanced', points: 20, prompt: say('Sagar-kilo batek laranja-kilo batek baino 0,50 € gehiago balio du. Martak 3 kilo laranja eta kilo bat sagar erosi ditu 5,30 €-an. Zenbat balio du laranja-kilo batek?', 'Un kilo de manzanas cuesta 0,50 € más que uno de naranjas. Marta ha comprado 3 kilos de naranjas y uno de manzanas por 5,30 €. ¿Cuánto cuesta el kilo de naranjas?', 'كيلو التفاح أغلى من كيلو البرتقال بـ 0.50 €. اشترت مارتا 3 كيلو برتقال وكيلو تفاح بـ 5.30 €. كم ثمن كيلو البرتقال؟'), expected: fraction(12, 10), hint: say('$3x+(x+0{,}5)=5{,}3$', '$3x+(x+0{,}5)=5{,}3$', '$3x+(x+0{,}5)=5{,}3$'), explanation: same('$4x=4{,}8\\ \\to\\ x=4{,}8\\mathbin{:}4=1{,}2$') },
    { id: 107, stage: 'denominators', context: 'advanced', points: 20, prompt: say('Ebatzi $\\frac{x-1}{2}-\\frac{x+2}{3}=1$.', 'Resuelve $\\frac{x-1}{2}-\\frac{x+2}{3}=1$.', 'حلّ $\\frac{x-1}{2}-\\frac{x+2}{3}=1$.'), expected: fraction(13), hint: say('Bider 6: $3(x-1)-2(x+2)=6$.', 'Por 6: $3(x-1)-2(x+2)=6$.', 'في 6: $3(x-1)-2(x+2)=6$.'), explanation: same('$3x-3-2x-4=6\\ \\to\\ x=6+7=13$') },
    { id: 108, stage: 'quadratic', context: 'advanced', points: 20, prompt: say('Karratu baten azalera 81 cm² da. Zenbat cm ditu aldeak?', 'El área de un cuadrado es 81 cm². ¿Cuántos cm mide el lado?', 'مساحة مربع 81 سم². كم سنتيمترًا ضلعه؟'), expected: fraction(9), hint: say('$x^{2}=81$; aldea ezin da negatiboa izan.', '$x^{2}=81$; el lado no puede ser negativo.', '$x^{2}=81$؛ الضلع لا يكون سالبًا.'), explanation: say('$x^{2}=81$: $x=9$ ($-9$ ez du balio luzera gisa).', '$x^{2}=81$: $x=9$ ($-9$ no vale como longitud).', '$x^{2}=81$: $x=9$ ($-9$ لا يصلح طولًا).') },
    { id: 109, stage: 'first-degree', context: 'advanced', points: 20, prompt: say('Zein k-rekin da $3(x+2)=3x+k$ identitate bat?', '¿Con qué valor de k es $3(x+2)=3x+k$ una identidad?', 'بأي قيمة لـ k تكون $3(x+2)=3x+k$ متطابقة؟'), expected: fraction(6), hint: say('Kendu parentesia eta konparatu.', 'Quita el paréntesis y compara.', 'احذف القوس وقارن.'), explanation: say('$3x+6=3x+k$ beti egia izateko, $k=6$: $0x=0$.', 'Para que $3x+6=3x+k$ sea siempre cierta, $k=6$: $0x=0$.', 'لتكون $3x+6=3x+k$ صحيحة دائمًا يجب $k=6$: $0x=0$.') },
    { id: 110, stage: 'problems', context: 'master', points: 30, prompt: say('Txirrindulari batek A-tik B-ra 15 km/h-ko abiaduran egin du; oinezko batek, 5 km/h-an, ordubete gehiago behar izan du. Zenbat ordu behar izan ditu txirrindulariak?', 'Un ciclista ha ido de A a B a 15 km/h y un peatón, a 5 km/h, ha tardado una hora más. ¿Cuántas horas ha tardado el ciclista?', 'قطع دراج المسافة من A إلى B بسرعة 15 كم/س، واستغرق راجل بسرعة 5 كم/س ساعة أكثر. كم ساعة استغرق الدراج؟'), expected: fraction(1, 2), hint: say('Distantzia bera: $15x=5(x+1)$.', 'La misma distancia: $15x=5(x+1)$.', 'المسافة نفسها: $15x=5(x+1)$.'), explanation: same('$15x=5x+5\\ \\to\\ 10x=5\\ \\to\\ x=5\\mathbin{:}10=0{,}5$') },
    { id: 111, stage: 'quadratic', context: 'master', points: 30, prompt: say('Bi zenbaki natural jarraituren biderkadura 132 da. Zein da txikiena?', 'El producto de dos números naturales consecutivos es 132. ¿Cuál es el menor?', 'جداء عددين طبيعيين متتاليين 132. ما الأصغر؟'), expected: fraction(11), hint: say('$x(x+1)=132$', '$x(x+1)=132$', '$x(x+1)=132$'), explanation: say('$x^{2}+x-132=0$, $\\Delta=1+528=529$, $x=\\frac{-1+23}{2}=11$. Egiaztatu: $11\\cdot 12=132$.', '$x^{2}+x-132=0$, $\\Delta=1+528=529$, $x=\\frac{-1+23}{2}=11$. Comprueba: $11\\cdot 12=132$.', '$x^{2}+x-132=0$، $\\Delta=1+528=529$، $x=\\frac{-1+23}{2}=11$. تحقّق: $11\\cdot 12=132$.') },
    { id: 112, stage: 'quadratic', context: 'master', points: 30, prompt: say('Laukizuzen bat zabalera baino 3 cm luzeagoa da, eta azalera 40 cm² da. Zenbat cm ditu zabalerak?', 'Un rectángulo es 3 cm más largo que ancho y su área es 40 cm². ¿Cuántos cm mide el ancho?', 'مستطيل طوله أكبر من عرضه بـ 3 سم ومساحته 40 سم². كم سنتيمترًا عرضه؟'), expected: fraction(5), hint: say('$x(x+3)=40$', '$x(x+3)=40$', '$x(x+3)=40$'), explanation: say('$x^{2}+3x-40=0$, $\\Delta=9+160=169$, $x=\\frac{-3+13}{2}=5$. Egiaztatu: $5\\cdot 8=40$.', '$x^{2}+3x-40=0$, $\\Delta=9+160=169$, $x=\\frac{-3+13}{2}=5$. Comprueba: $5\\cdot 8=40$.', '$x^{2}+3x-40=0$، $\\Delta=9+160=169$، $x=\\frac{-3+13}{2}=5$. تحقّق: $5\\cdot 8=40$.') }
]

export const equationsExerciseBank: ExerciseSection[] = [
    {
        id: 'basics',
        title: say('Ekuazioak eta ebazpenak', 'Ecuaciones y soluciones', 'المعادلات والحلول'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Ekuazioa ala identitatea? a) $2x+3=7$; b) $2(x+1)=2x+2$; c) $x+x=2x$; d) $x^{2}=9$.', '¿Ecuación o identidad? a) $2x+3=7$; b) $2(x+1)=2x+2$; c) $x+x=2x$; d) $x^{2}=9$.', 'معادلة أم متطابقة؟ أ) $2x+3=7$؛ ب) $2(x+1)=2x+2$؛ ج) $x+x=2x$؛ د) $x^{2}=9$.'), solution: say('a) ekuazioa; b) identitatea; c) identitatea; d) ekuazioa.', 'a) ecuación; b) identidad; c) identidad; d) ecuación.', 'أ) معادلة؛ ب) متطابقة؛ ج) متطابقة؛ د) معادلة.') },
            { id: 2, difficulty: 'easy', question: say('Idatzi atalak, gaiak, ezezaguna eta maila: $3x-5=x+7$.', 'Escribe miembros, términos, incógnita y grado: $3x-5=x+7$.', 'اكتب الأطراف والحدود والمجهول والدرجة: $3x-5=x+7$.'), solution: say('Atalak: $3x-5$ eta $x+7$. Gaiak: $3x$, $-5$, $x$, $7$. Ezezaguna: x. Maila: 1.', 'Miembros: $3x-5$ y $x+7$. Términos: $3x$, $-5$, $x$, $7$. Incógnita: x. Grado: 1.', 'الطرفان: $3x-5$ و$x+7$. الحدود: $3x$، $-5$، $x$، $7$. المجهول: x. الدرجة: 1.') },
            { id: 3, difficulty: 'medium', question: say('Taldekatu ekuazio baliokideak: a) $4x=20$; b) $3x-1=8$; c) $5x-4=x$; d) $3x=9$; e) $4x-5=15$; f) $4x-4=0$.', 'Agrupa las ecuaciones equivalentes: a) $4x=20$; b) $3x-1=8$; c) $5x-4=x$; d) $3x=9$; e) $4x-5=15$; f) $4x-4=0$.', 'اجمع المعادلات المتكافئة: أ) $4x=20$؛ ب) $3x-1=8$؛ ج) $5x-4=x$؛ د) $3x=9$؛ هـ) $4x-5=15$؛ و) $4x-4=0$.'), solution: say('a eta e (x = 5); b eta d (x = 3); c eta f (x = 1).', 'a y e (x = 5); b y d (x = 3); c y f (x = 1).', 'أ وهـ (x = 5)؛ ب ود (x = 3)؛ ج وو (x = 1).') },
            { id: 4, difficulty: 'medium', question: say('Ebatzi transposatuz: $x-4=6$, $18=3x$, $5-x=0$.', 'Resuelve transponiendo: $x-4=6$, $18=3x$, $5-x=0$.', 'حلّ بالنقل: $x-4=6$، $18=3x$، $5-x=0$.'), solution: same('$x=6+4=10\\qquad x=18\\mathbin{:}3=6\\qquad x=5$') },
            { id: 5, difficulty: 'medium', question: say('Zein da $\\frac{x}{2}-1=5$ ekuazioaren ebazpena?', '¿Cuál es la solución de $\\frac{x}{2}-1=5$?', 'ما حل $\\frac{x}{2}-1=5$؟'), solution: same('$\\frac{x}{2}=6\\ \\to\\ x=6\\cdot 2=12$'), answer: { expected: fraction(12) } },
            { id: 6, difficulty: 'hard', question: say('Aurkitu probatuz $x^{2}+2x+1=4$ ekuazioaren bi ebazpenak. Idatzi positiboa.', 'Encuentra probando las dos soluciones de $x^{2}+2x+1=4$. Escribe la positiva.', 'جد بالتجربة حلّي $x^{2}+2x+1=4$. اكتب الموجب.'), solution: say('$x=1$ ($1+2+1=4$) eta $x=-3$ ($9-6+1=4$).', '$x=1$ ($1+2+1=4$) y $x=-3$ ($9-6+1=4$).', '$x=1$ ($1+2+1=4$) و$x=-3$ ($9-6+1=4$).'), answer: { expected: fraction(1) } }
        ]
    },
    {
        id: 'first-degree',
        title: say('Lehen mailako ekuazioak', 'Ecuaciones de primer grado', 'معادلات الدرجة الأولى'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Ebatzi: a) $3x+2=x+10$; b) $7x-3=4x+9$.', 'Resuelve: a) $3x+2=x+10$; b) $7x-3=4x+9$.', 'حلّ: أ) $3x+2=x+10$؛ ب) $7x-3=4x+9$.'), solution: same('a) $2x=8\\ \\to\\ x=4$; b) $3x=12\\ \\to\\ x=4$') },
            { id: 8, difficulty: 'easy', question: say('Ebatzi $6-2x=x-9$.', 'Resuelve $6-2x=x-9$.', 'حلّ $6-2x=x-9$.'), solution: same('$-3x=-15\\ \\to\\ x=5$'), answer: { expected: fraction(5) } },
            { id: 9, difficulty: 'medium', question: say('Ebatzi $4(x-1)-3(x+2)=0$.', 'Resuelve $4(x-1)-3(x+2)=0$.', 'حلّ $4(x-1)-3(x+2)=0$.'), solution: same('$4x-4-3x-6=0\\ \\to\\ x=10$'), answer: { expected: fraction(10) } },
            { id: 10, difficulty: 'medium', question: say('Ebatzi $2(3x-1)=4(x+2)$.', 'Resuelve $2(3x-1)=4(x+2)$.', 'حلّ $2(3x-1)=4(x+2)$.'), solution: same('$6x-2=4x+8\\ \\to\\ 2x=10\\ \\to\\ x=5$'), answer: { expected: fraction(5) } },
            { id: 11, difficulty: 'medium', question: say('Zenbat ebazpen dituzte? a) $2x+1=2x+4$; b) $2(x+3)=2x+6$.', '¿Cuántas soluciones tienen? a) $2x+1=2x+4$; b) $2(x+3)=2x+6$.', 'كم حلًّا لكل منهما؟ أ) $2x+1=2x+4$؛ ب) $2(x+3)=2x+6$.'), solution: say('a) $0x=3$: bat ere ez. b) $0x=0$: infinitu (identitatea).', 'a) $0x=3$: ninguna. b) $0x=0$: infinitas (identidad).', 'أ) $0x=3$: لا حل. ب) $0x=0$: عدد لا نهائي (متطابقة).') },
            { id: 12, difficulty: 'hard', question: say('Ebatzi $3x-2(x-5)=4-(2x-6)$.', 'Resuelve $3x-2(x-5)=4-(2x-6)$.', 'حلّ $3x-2(x-5)=4-(2x-6)$.'), solution: same('$3x-2x+10=4-2x+6\\ \\to\\ 3x=0\\ \\to\\ x=0$'), answer: { expected: fraction(0) } }
        ]
    },
    {
        id: 'denominators',
        title: say('Izendatzaileak dituzten ekuazioak', 'Ecuaciones con denominadores', 'معادلات بمقامات'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Ebatzi: a) $\\frac{x}{4}=3$; b) $\\frac{x}{2}+1=4$.', 'Resuelve: a) $\\frac{x}{4}=3$; b) $\\frac{x}{2}+1=4$.', 'حلّ: أ) $\\frac{x}{4}=3$؛ ب) $\\frac{x}{2}+1=4$.'), solution: same('a) $x=12$; b) $x+2=8\\ \\to\\ x=6$') },
            { id: 14, difficulty: 'easy', question: say('Ebatzi $\\frac{x+1}{7}=1$.', 'Resuelve $\\frac{x+1}{7}=1$.', 'حلّ $\\frac{x+1}{7}=1$.'), solution: same('$x+1=7\\ \\to\\ x=6$'), answer: { expected: fraction(6) } },
            { id: 15, difficulty: 'medium', question: say('Ebatzi $\\frac{x}{3}+\\frac{x}{6}=3$.', 'Resuelve $\\frac{x}{3}+\\frac{x}{6}=3$.', 'حلّ $\\frac{x}{3}+\\frac{x}{6}=3$.'), solution: same('$2x+x=18\\ \\to\\ x=18\\mathbin{:}3=6$'), answer: { expected: fraction(6) } },
            { id: 16, difficulty: 'medium', question: say('Ebatzi $\\frac{3x}{4}-\\frac{x}{2}=\\frac{5}{4}$.', 'Resuelve $\\frac{3x}{4}-\\frac{x}{2}=\\frac{5}{4}$.', 'حلّ $\\frac{3x}{4}-\\frac{x}{2}=\\frac{5}{4}$.'), solution: same('$3x-2x=5\\ \\to\\ x=5$'), answer: { expected: fraction(5) } },
            { id: 17, difficulty: 'medium', question: say('Ebatzi $\\frac{x-2}{3}=\\frac{x+1}{4}$.', 'Resuelve $\\frac{x-2}{3}=\\frac{x+1}{4}$.', 'حلّ $\\frac{x-2}{3}=\\frac{x+1}{4}$.'), solution: same('$4(x-2)=3(x+1)\\ \\to\\ 4x-8=3x+3\\ \\to\\ x=11$'), answer: { expected: fraction(11) } },
            { id: 18, difficulty: 'hard', question: say('Ebatzi $\\frac{2x+1}{3}-\\frac{x-1}{2}=2$.', 'Resuelve $\\frac{2x+1}{3}-\\frac{x-1}{2}=2$.', 'حلّ $\\frac{2x+1}{3}-\\frac{x-1}{2}=2$.'), solution: same('$2(2x+1)-3(x-1)=12\\ \\to\\ 4x+2-3x+3=12\\ \\to\\ x=7$'), answer: { expected: fraction(7) } }
        ]
    },
    {
        id: 'problems',
        title: say('Buruketak ekuazioekin', 'Problemas con ecuaciones', 'مسائل بالمعادلات'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Zenbaki baten bikoitzari 7 batuta, 31 lortzen da. Zein da zenbakia?', 'Si al doble de un número le sumas 7, obtienes 31. ¿Qué número es?', 'إذا أضفت 7 إلى ضعف عدد تحصل على 31. ما العدد؟'), solution: same('$2x+7=31\\ \\to\\ x=24\\mathbin{:}2=12$'), answer: { expected: fraction(12) } },
            { id: 20, difficulty: 'easy', question: say('Andresek bere ahizparen adinaren hirukoitza du, eta biek batera 20 urte. Zenbat urte ditu ahizpak?', 'Andrés tiene el triple de edad que su hermana y entre los dos suman 20 años. ¿Cuántos años tiene la hermana?', 'عمر أندريس ثلاثة أضعاف عمر أخته ومجموع عمريهما 20 سنة. كم عمر الأخت؟'), solution: same('$x+3x=20\\ \\to\\ x=20\\mathbin{:}4=5$'), answer: { expected: fraction(5) } },
            { id: 21, difficulty: 'medium', question: say('3 marrazki-bloke eta ur-koloreen kutxa bat 30 €-an ordaindu ditut; kutxak bloke batek baino bi aldiz gehiago balio du. Zenbat balio du bloke batek?', 'He pagado 30 € por 3 blocs de dibujo y una caja de acuarelas; la caja cuesta el doble que un bloc. ¿Cuánto cuesta un bloc?', 'دفعت 30 € ثمن 3 دفاتر رسم وعلبة ألوان مائية؛ العلبة ضعف ثمن الدفتر. كم ثمن الدفتر؟'), solution: same('$3x+2x=30\\ \\to\\ x=30\\mathbin{:}5=6$'), answer: { expected: fraction(6) } },
            { id: 22, difficulty: 'medium', question: say('Kilker batek, jauzi bakoitzean, matxinsalto batek baino metro bat gutxiago egiten du; 15 jauzitan kilkerra matxinsaltoa 5 jauzitan bezain urrun iristen da. Zenbat metro egiten ditu matxinsaltoak jauzi bakoitzean?', 'Un grillo avanza en cada salto un metro menos que un saltamontes; en 15 saltos el grillo llega igual de lejos que el saltamontes en 5. ¿Cuántos metros avanza el saltamontes en cada salto?', 'يقفز صرصور في كل قفزة مترًا أقل من الجندب؛ وفي 15 قفزة يصل الصرصور إلى حيث يصل الجندب في 5. كم مترًا يقفز الجندب في كل قفزة؟'), solution: same('$15(x-1)=5x\\ \\to\\ 10x=15\\ \\to\\ x=15\\mathbin{:}10=1{,}5$'), answer: { expected: fraction(3, 2) } },
            { id: 23, difficulty: 'medium', question: say('Zenbaki baten herena bere laurdena gehi 20 da. Zein da zenbakia?', 'La tercera parte de un número es igual a su cuarta parte más 20. ¿Qué número es?', 'ثلث عدد يساوي ربعه زائد 20. ما العدد؟'), solution: same('$\\frac{x}{3}=\\frac{x}{4}+20\\ \\to\\ 4x=3x+240\\ \\to\\ x=240$'), answer: { expected: fraction(240) } },
            { id: 24, difficulty: 'hard', question: say('Ikasgela batean neskak mutilak baino 4 gehiago dira. Mutil bat joan eta 2 neska etorriz gero, neskak mutilen bikoitza lirateke. Zenbat mutil daude?', 'En una clase hay 4 chicas más que chicos. Si se fuera un chico y vinieran 2 chicas, habría el doble de chicas que de chicos. ¿Cuántos chicos hay?', 'في صف عدد البنات أكبر من عدد الأولاد بـ 4. إذا غادر ولد وجاءت بنتان يصبح عدد البنات ضعف عدد الأولاد. كم ولدًا في الصف؟'), solution: same('$x+4+2=2(x-1)\\ \\to\\ x+6=2x-2\\ \\to\\ x=8$'), answer: { expected: fraction(8) } }
        ]
    },
    {
        id: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Idatzi forma orokorrean eta adierazi a, b eta c: $x^{2}-3=2x$.', 'Escribe en forma general e indica a, b y c: $x^{2}-3=2x$.', 'اكتب بالصيغة العامة وحدّد a وb وc: $x^{2}-3=2x$.'), solution: say('$x^{2}-2x-3=0$: a = 1, b = −2, c = −3.', '$x^{2}-2x-3=0$: a = 1, b = −2, c = −3.', '$x^{2}-2x-3=0$: a = 1، b = −2، c = −3.') },
            { id: 26, difficulty: 'easy', question: say('Ebatzi: a) $x^{2}=16$; b) $3x^{2}-27=0$; c) $x^{2}+4=0$.', 'Resuelve: a) $x^{2}=16$; b) $3x^{2}-27=0$; c) $x^{2}+4=0$.', 'حلّ: أ) $x^{2}=16$؛ ب) $3x^{2}-27=0$؛ ج) $x^{2}+4=0$.'), solution: say('a) $x=\\pm 4$; b) $x^{2}=9$, $x=\\pm 3$; c) ebazpenik ez.', 'a) $x=\\pm 4$; b) $x^{2}=9$, $x=\\pm 3$; c) sin solución.', 'أ) $x=\\pm 4$؛ ب) $x^{2}=9$، $x=\\pm 3$؛ ج) لا حل.') },
            { id: 27, difficulty: 'medium', question: say('Ebatzi: a) $x^{2}+5x=0$; b) $9x^{2}-36x=0$.', 'Resuelve: a) $x^{2}+5x=0$; b) $9x^{2}-36x=0$.', 'حلّ: أ) $x^{2}+5x=0$؛ ب) $9x^{2}-36x=0$.'), solution: say('a) $x(x+5)=0$: $x=0$, $x=-5$; b) $9x(x-4)=0$: $x=0$, $x=4$.', 'a) $x(x+5)=0$: $x=0$, $x=-5$; b) $9x(x-4)=0$: $x=0$, $x=4$.', 'أ) $x(x+5)=0$: $x=0$، $x=-5$؛ ب) $9x(x-4)=0$: $x=0$، $x=4$.') },
            { id: 28, difficulty: 'medium', question: say('Ebatzi $x^{2}-7x+10=0$. Idatzi ebazpen handiena.', 'Resuelve $x^{2}-7x+10=0$. Escribe la solución mayor.', 'حلّ $x^{2}-7x+10=0$. اكتب الحل الأكبر.'), solution: same('$\\Delta=49-40=9\\qquad x=\\frac{7+3}{2}=5\\qquad x=\\frac{7-3}{2}=2$'), answer: { expected: fraction(5) } },
            { id: 29, difficulty: 'medium', question: say('Zenbat ebazpen ditu? a) $x^{2}-6x+9=0$; b) $2x^{2}+x+1=0$; c) $x^{2}+x-6=0$.', '¿Cuántas soluciones tiene? a) $x^{2}-6x+9=0$; b) $2x^{2}+x+1=0$; c) $x^{2}+x-6=0$.', 'كم حلًّا لكل منها؟ أ) $x^{2}-6x+9=0$؛ ب) $2x^{2}+x+1=0$؛ ج) $x^{2}+x-6=0$.'), solution: same('a) $36-36=0$: 1; b) $1-8=-7$: 0; c) $1+24=25$: 2') },
            { id: 30, difficulty: 'hard', question: say('Ebatzi $2x^{2}+x-3=0$. Idatzi ebazpen positiboa.', 'Resuelve $2x^{2}+x-3=0$. Escribe la solución positiva.', 'حلّ $2x^{2}+x-3=0$. اكتب الحل الموجب.'), solution: same('$\\Delta=1+24=25\\qquad x=\\frac{-1+5}{4}=1\\qquad x=\\frac{-1-5}{4}=-\\frac{3}{2}$'), answer: { expected: fraction(1) } }
        ]
    }
]
