import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { determinanteakChallenges, determinanteakDiagnostic, determinanteakExerciseBank, determinanteakPractice } from '../batx2-zientziak-determinanteak/content.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — diagnostic, guided
   practice, challenges and exercise bank. The exercises of calculation
   come from the Ciencias twin (imported and renumbered, never copied or
   edited), without determinants of order 4, equations of degree 2 or 3
   with determinants and areas, which the Sociales books leave out. Those
   of this unit are bundles whose prices can or cannot be found, cofactors
   and expansions with numbers of their own, and the style of the Basque
   exam of Matemáticas Aplicadas a las CCSS II (an inverse that depends on
   a parameter).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)

const work = (formula: string) => say(`Kalkulatu ${formula}.`, `Calcula ${formula}.`, `احسب ${formula}.`, `Work out ${formula}.`)
const byZeros = (formula: string) => say(`Kalkulatu ${formula}, zeroak eginez.`, `Calcula ${formula} haciendo ceros.`, `احسب ${formula} بصنع الأصفار.`, `Work out ${formula} by making zeros.`)
const alongColumn = (formula: string, column: number) => say(`Kalkulatu ${formula}, ${column}. zutabearen arabera garatuz.`, `Calcula ${formula} desarrollando por la columna ${column}.`, `احسب ${formula} بالنشر حسب العمود ${column}.`, `Work out ${formula} by expanding along column ${column}.`)
const alongRow = (formula: string, row: number) => say(`Kalkulatu ${formula}, ${row}. errenkadaren arabera garatuz.`, `Calcula ${formula} desarrollando por la fila ${row}.`, `احسب ${formula} بالنشر حسب الصف ${row}.`, `Work out ${formula} by expanding along row ${row}.`)

const twinDiagnostic = (id: number) => determinanteakDiagnostic.find((question) => question.id === id)!
const twinPractice = (id: number) => determinanteakPractice.find((item) => item.id === id)!
const twinChallenge = (id: number) => determinanteakChallenges.find((item) => item.id === id)!
const twinBank = (id: number) => determinanteakExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!

export const gizarteDeterminanteakDiagnostic: DiagnosticQuestion[] = [
    { ...twinDiagnostic(117001), id: 142001 },
    { ...twinDiagnostic(117002), id: 142002 },
    { ...twinDiagnostic(117003), id: 142003 },
    { ...twinDiagnostic(117004), id: 142004 },
    { ...twinDiagnostic(117005), id: 142005 },
    { ...twinDiagnostic(117006), id: 142006 },
    { ...twinDiagnostic(117007), id: 142007 },
    {
        id: 142008,
        prompt: say(
            'Sorta batek 3 kilo arroz eta 2 kilo garbantzu ditu, eta besteak 6 kilo arroz eta 4 kilo garbantzu. Bi sorten prezioak jakinda, ondoriozta al daiteke kilo bakoitzaren prezioa?',
            'Un lote trae 3 kilos de arroz y 2 de garbanzos, y otro, 6 kilos de arroz y 4 de garbanzos. Sabiendo lo que cuestan los dos lotes, ¿se puede averiguar el precio de cada kilo?',
            'مجموعة فيها 3 كيلوغرامات من الأرز وكيلوغرامان من الحمص، وأخرى فيها 6 كيلوغرامات من الأرز و4 من الحمص. إذا عرفنا سعر المجموعتين، هل يمكن معرفة سعر كل كيلوغرام؟',
            'One bundle has 3 kilos of rice and 2 of chickpeas, and another 6 kilos of rice and 4 of chickpeas. Knowing what the two bundles cost, can the price of each kilo be found?'
        ),
        options: [
            say('Bai, bi sorta daudelako', 'Sí, porque hay dos lotes', 'نعم، لأن هناك مجموعتين', 'Yes, because there are two bundles'),
            say('Ez: $|A|=0$', 'No: $|A|=0$', 'لا: $|A|=0$', 'No: $|A|=0$'),
            say('Arrozarena bakarrik', 'Solo el del arroz', 'سعر الأرز فقط', 'Only the price of rice')
        ],
        correctIndex: 1,
        explanation: say(
            '$|A|=3\\cdot 4-2\\cdot 6=0$: bigarren sorta lehenaren bikoitza da.',
            '$|A|=3\\cdot 4-2\\cdot 6=0$: el segundo lote es el doble del primero.',
            '$|A|=3\\cdot 4-2\\cdot 6=0$: المجموعة الثانية ضعف الأولى.',
            '$|A|=3\\cdot 4-2\\cdot 6=0$: the second bundle is twice the first.'
        ),
        topic: 'unique-prices'
    }
]

/* ---------- Guided practice: four per stage ---------- */

const ownPractice: Record<string, Omit<PracticeItem, 'id'>> = {
    cofactor: {
        stage: 'expansion',
        prompt: say(
            '$A=\\begin{pmatrix}3&1&2\\\\0&4&1\\\\2&5&0\\end{pmatrix}$ matrizean, aurkitu $A_{12}$ adjuntua.',
            'En $A=\\begin{pmatrix}3&1&2\\\\0&4&1\\\\2&5&0\\end{pmatrix}$, halla el adjunto $A_{12}$.',
            'في $A=\\begin{pmatrix}3&1&2\\\\0&4&1\\\\2&5&0\\end{pmatrix}$ أوجد المتمم الجبري $A_{12}$.',
            'In $A=\\begin{pmatrix}3&1&2\\\\0&4&1\\\\2&5&0\\end{pmatrix}$, find the cofactor $A_{12}$.'
        ),
        expected: n(2),
        hint: say('Ezabatu 1. errenkada eta 2. zutabea; $1+2$ bakoitia da.', 'Tacha la fila 1 y la columna 2; $1+2$ es impar.', 'احذف الصف 1 والعمود 2؛ $1+2$ فردي.', 'Strike out row 1 and column 2; $1+2$ is odd.'),
        explanation: same('$A_{12}=-\\begin{vmatrix}0&1\\\\2&0\\end{vmatrix}=-(0-2)=2$')
    },
    expand: {
        stage: 'expansion',
        prompt: alongColumn('$\\begin{vmatrix}1&2&0\\\\3&1&0\\\\4&5&2\\end{vmatrix}$', 3),
        expected: n(-10),
        hint: say('3. zutabean $a_{33}=2$ elementuak bakarrik balio du, eta haren zeinua plus da.', 'En la columna 3 solo cuenta $a_{33}=2$, y su signo es más.', 'في العمود 3 لا يُحسب إلا $a_{33}=2$، وإشارته موجبة.', 'In column 3 only $a_{33}=2$ counts, and its sign is plus.'),
        explanation: same('$2\\cdot\\begin{vmatrix}1&2\\\\3&1\\end{vmatrix}=2\\cdot(-5)=-10$')
    },
    prices: {
        stage: 'inverse',
        prompt: say(
            'Kilo bat arroz eta 2 kilo dilista dituen sortak 8 euro balio du, eta 2 kilo arroz eta 5 kilo dilista dituenak, 19 euro. Zenbat balio du arroz-kiloak?',
            'Un lote de 1 kilo de arroz y 2 de lentejas cuesta 8 €, y otro de 2 kilos de arroz y 5 de lentejas, 19 €. ¿Cuánto cuesta el kilo de arroz?',
            'مجموعة من كيلوغرام أرز وكيلوغرامين من العدس تكلّف 8 €، وأخرى من كيلوغرامين أرز و5 من العدس تكلّف 19 €. كم سعر كيلوغرام الأرز؟',
            'A bundle of 1 kilo of rice and 2 of lentils costs €8, and another of 2 kilos of rice and 5 of lentils costs €19. How much is a kilo of rice?'
        ),
        expected: n(2),
        hint: same('$|A|=1\\cdot 5-2\\cdot 2=1$'),
        explanation: same('$A^{-1}=\\begin{pmatrix}5&-2\\\\-2&1\\end{pmatrix}\\qquad x=5\\cdot 8-2\\cdot 19=2$')
    }
}

const practiceOrder: Array<number | string> = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 'cofactor', 'expand',
    13, 14, 15, 16,
    17, 18, 20, 'prices'
]

export const gizarteDeterminanteakPractice: PracticeItem[] = practiceOrder.map((key, index) => (typeof key === 'number' ? { ...twinPractice(key), id: index + 1 } : { ...ownPractice[key], id: index + 1 }))

/* ---------- Challenges: three per stage ---------- */

const ownChallenges: Record<string, Omit<ChallengeItem, 'id'>> = {
    sarrusParameter: {
        stage: 'orders',
        points: 30,
        context: 'master',
        prompt: say(
            'Aurkitu $m$, $\\begin{vmatrix}1&2&3\\\\2&1&0\\\\0&3&m\\end{vmatrix}=0$ izan dadin.',
            'Halla $m$ para que $\\begin{vmatrix}1&2&3\\\\2&1&0\\\\0&3&m\\end{vmatrix}=0$.',
            'أوجد $m$ ليكون $\\begin{vmatrix}1&2&3\\\\2&1&0\\\\0&3&m\\end{vmatrix}=0$.',
            'Find $m$ so that $\\begin{vmatrix}1&2&3\\\\2&1&0\\\\0&3&m\\end{vmatrix}=0$.'
        ),
        expected: n(6),
        hint: say('Sarrus: $m$ bi biderkaduratan agertzen da.', 'Sarrus: la $m$ sale en dos productos.', 'ساروس: يظهر $m$ في حاصلين.', 'Sarrus: $m$ turns up in two products.'),
        explanation: same('$(m+0+18)-(0+0+4m)=18-3m=0\\ \\to\\ m=6$')
    },
    column: {
        stage: 'expansion',
        points: 20,
        context: 'advanced',
        prompt: alongColumn('$\\begin{vmatrix}3&0&1\\\\2&0&4\\\\5&1&2\\end{vmatrix}$', 2),
        expected: n(-10),
        hint: say('Zutabe horretan $a_{32}=1$ bakarrik dago, eta $3+2$ bakoitia da.', 'En esa columna solo está $a_{32}=1$, y $3+2$ es impar.', 'في ذلك العمود لا يوجد إلا $a_{32}=1$، و$3+2$ فردي.', 'In that column there is only $a_{32}=1$, and $3+2$ is odd.'),
        explanation: same('$1\\cdot\\left(-\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}\\right)=-(12-2)=-10$')
    },
    row: {
        stage: 'expansion',
        points: 30,
        context: 'master',
        prompt: alongRow('$\\begin{vmatrix}2&1&3\\\\0&3&4\\\\1&5&2\\end{vmatrix}$', 2),
        expected: n(-33),
        hint: say('Bi adjuntu: $A_{22}$ plus zeinuarekin eta $A_{23}$ minus zeinuarekin.', 'Dos adjuntos: $A_{22}$ con signo más y $A_{23}$ con signo menos.', 'متممان: $A_{22}$ بإشارة موجبة و$A_{23}$ بإشارة سالبة.', 'Two cofactors: $A_{22}$ with a plus sign and $A_{23}$ with a minus sign.'),
        explanation: same('$3\\cdot\\begin{vmatrix}2&3\\\\1&2\\end{vmatrix}-4\\cdot\\begin{vmatrix}2&1\\\\1&5\\end{vmatrix}=3-36=-33$')
    },
    threeBundles: {
        stage: 'inverse',
        points: 20,
        context: 'advanced',
        prompt: say(
            'Denda batek hiru produktuko sortak saltzen ditu: $(1,1,1)$, $(1,2,3)$ eta $(2,3,k)$ unitate. Zein $k$ baliotarako ezin dira prezioak ondorioztatu?',
            'Una tienda vende lotes de tres productos con $(1,1,1)$, $(1,2,3)$ y $(2,3,k)$ unidades. ¿Para qué $k$ no se pueden averiguar los precios?',
            'يبيع متجر مجموعات من ثلاثة منتجات فيها $(1,1,1)$ و$(1,2,3)$ و$(2,3,k)$ وحدة. لأي $k$ لا يمكن معرفة الأسعار؟',
            'A shop sells bundles of three products with $(1,1,1)$, $(1,2,3)$ and $(2,3,k)$ units. For which $k$ can the prices not be found?'
        ),
        expected: n(4),
        hint: say('Berdindu $|A|$ zerora.', 'Iguala $|A|$ a cero.', 'ساوِ $|A|$ بالصفر.', 'Set $|A|$ equal to zero.'),
        explanation: say(
            '$|A|=k-4=0\\ \\to\\ k=4$: orduan, 3. sorta beste bien batura da.',
            '$|A|=k-4=0\\ \\to\\ k=4$: entonces el lote 3 es la suma de los otros dos.',
            '$|A|=k-4=0\\ \\to\\ k=4$: عندئذ تكون المجموعة 3 مجموع المجموعتين الأخريين.',
            '$|A|=k-4=0\\ \\to\\ k=4$: then bundle 3 is the sum of the other two.'
        )
    }
}

const challengeOrder: Array<number | string> = [
    101, 102, 'sarrusParameter',
    104, 105, 106,
    107, 'column', 'row',
    110, 111, 112,
    113, 'threeBundles', 115
]

export const gizarteDeterminanteakChallenges: ChallengeItem[] = challengeOrder.map((key, index) => (typeof key === 'number' ? { ...twinChallenge(key), id: 101 + index } : { ...ownChallenges[key], id: 101 + index }))

/* ---------- Exercise bank: ten per stage ---------- */

const ownBank: Record<string, Omit<ExerciseItem, 'id'>> = {
    bundleDet: {
        difficulty: 'easy',
        question: say(
            'Bi sorta: lehenak 4 kilo sagar eta kilo bat madari ditu, eta bigarrenak 3 kilo sagar eta 2 kilo madari. Kalkulatu kopuruen matrizearen determinantea.',
            'Dos lotes: el primero trae 4 kilos de manzanas y 1 de peras, y el segundo, 3 kilos de manzanas y 2 de peras. Calcula el determinante de la matriz de cantidades.',
            'مجموعتان: الأولى فيها 4 كيلوغرامات من التفاح وكيلوغرام من الإجاص، والثانية 3 كيلوغرامات من التفاح وكيلوغرامان من الإجاص. احسب محدد مصفوفة الكميات.',
            'Two bundles: the first has 4 kilos of apples and 1 of pears, and the second 3 kilos of apples and 2 of pears. Work out the determinant of the matrix of quantities.'
        ),
        solution: same('$\\begin{vmatrix}4&1\\\\3&2\\end{vmatrix}=4\\cdot 2-1\\cdot 3=5$'),
        answer: { expected: n(5) }
    },
    sarrus: {
        difficulty: 'medium',
        question: work('$\\begin{vmatrix}2&0&1\\\\1&3&0\\\\0&1&4\\end{vmatrix}$'),
        solution: same('$(24+0+1)-(0+0+0)=25$'),
        answer: { expected: n(25) }
    },
    parameter: {
        difficulty: 'hard',
        question: say(
            'Aurkitu $m$, $\\begin{vmatrix}m&2&1\\\\0&1&m\\\\1&0&1\\end{vmatrix}=0$ izan dadin.',
            'Halla $m$ para que $\\begin{vmatrix}m&2&1\\\\0&1&m\\\\1&0&1\\end{vmatrix}=0$.',
            'أوجد $m$ ليكون $\\begin{vmatrix}m&2&1\\\\0&1&m\\\\1&0&1\\end{vmatrix}=0$.',
            'Find $m$ so that $\\begin{vmatrix}m&2&1\\\\0&1&m\\\\1&0&1\\end{vmatrix}=0$.'
        ),
        solution: same('$(m+2m+0)-(1+0+0)=3m-1=0\\ \\to\\ m=\\frac{1}{3}$'),
        answer: { expected: n(1, 3) }
    },
    cofactorTwo: {
        difficulty: 'easy',
        question: say(
            'Zenbat da $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$ matrizearen $A_{12}$ adjuntua?',
            '¿Cuánto vale el adjunto $A_{12}$ de $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$?',
            'كم يساوي المتمم الجبري $A_{12}$ للمصفوفة $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$؟',
            'What is the cofactor $A_{12}$ of $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$?'
        ),
        solution: say(
            'Ezabatu 1. errenkada eta 2. zutabea: 2 geratzen da, eta $1+2$ bakoitia denez, $A_{12}=-2$.',
            'Al tachar la fila 1 y la columna 2 queda 2, y como $1+2$ es impar, $A_{12}=-2$.',
            'بحذف الصف 1 والعمود 2 يبقى 2، وبما أن $1+2$ فردي فإن $A_{12}=-2$.',
            'Striking out row 1 and column 2 leaves 2, and since $1+2$ is odd, $A_{12}=-2$.'
        ),
        answer: { expected: n(-2) }
    },
    rowTwo: {
        difficulty: 'medium',
        question: alongRow('$\\begin{vmatrix}1&2&3\\\\0&2&0\\\\4&1&5\\end{vmatrix}$', 2),
        solution: same('$2\\cdot\\begin{vmatrix}1&3\\\\4&5\\end{vmatrix}=2\\cdot(5-12)=-14$'),
        answer: { expected: n(-14) }
    },
    adjugate: {
        difficulty: 'medium',
        question: say(
            'Aurkitu $\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$ matrizearen matrize adjuntua.',
            'Halla la matriz adjunta de $\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$.',
            'أوجد المصفوفة المرافقة للمصفوفة $\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$.',
            'Find the adjugate of $\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$.'
        ),
        solution: say(
            'Elementu bakoitzaren ordez, haren adjuntua: $\\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}$.',
            'Cada elemento se cambia por su adjunto: $\\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}$.',
            'يُستبدل كل عنصر بمتممه الجبري: $\\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}$.',
            'Each entry is replaced by its cofactor: $\\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}$.'
        )
    },
    zeros: {
        difficulty: 'hard',
        question: byZeros('$\\begin{vmatrix}2&4&6\\\\1&3&2\\\\1&1&5\\end{vmatrix}$'),
        solution: say(
            'Atera 2 zenbakia 1. errenkadatik, eta egin $E_2-E_1$ eta $E_3-E_1$: $2\\cdot\\begin{vmatrix}1&2&3\\\\0&1&-1\\\\0&-1&2\\end{vmatrix}=2\\cdot 1=2$.',
            'Saca el 2 de la fila 1 y haz $E_2-E_1$ y $E_3-E_1$: $2\\cdot\\begin{vmatrix}1&2&3\\\\0&1&-1\\\\0&-1&2\\end{vmatrix}=2\\cdot 1=2$.',
            'أخرج 2 من الصف 1 وأجرِ $E_2-E_1$ و$E_3-E_1$: $2\\cdot\\begin{vmatrix}1&2&3\\\\0&1&-1\\\\0&-1&2\\end{vmatrix}=2\\cdot 1=2$.',
            'Take the 2 out of row 1 and do $E_2-E_1$ and $E_3-E_1$: $2\\cdot\\begin{vmatrix}1&2&3\\\\0&1&-1\\\\0&-1&2\\end{vmatrix}=2\\cdot 1=2$.'
        ),
        answer: { expected: n(2) }
    },
    missingCofactor: {
        difficulty: 'hard',
        question: say(
            '3. ordenako $A$ matrizean $|A|=5$ da. Lehen errenkada $(1,2,0)$ da, eta $A_{11}=3$. Zenbat da $A_{12}$?',
            'En una matriz $A$ de orden 3 es $|A|=5$. Su primera fila es $(1,2,0)$ y $A_{11}=3$. ¿Cuánto vale $A_{12}$?',
            'في مصفوفة $A$ من الرتبة 3 يكون $|A|=5$. صفها الأول $(1,2,0)$ و$A_{11}=3$. كم يساوي $A_{12}$؟',
            'In a matrix $A$ of order 3, $|A|=5$. Its first row is $(1,2,0)$ and $A_{11}=3$. What is $A_{12}$?'
        ),
        solution: say(
            'Garatu 1. errenkadaren arabera: $|A|=1\\cdot 3+2\\cdot A_{12}+0=5$; beraz, $A_{12}=1$.',
            'Desarrolla por la fila 1: $|A|=1\\cdot 3+2\\cdot A_{12}+0=5$, así que $A_{12}=1$.',
            'انشر حسب الصف 1: $|A|=1\\cdot 3+2\\cdot A_{12}+0=5$، إذن $A_{12}=1$.',
            'Expand along row 1: $|A|=1\\cdot 3+2\\cdot A_{12}+0=5$, so $A_{12}=1$.'
        ),
        answer: { expected: n(1) }
    },
    bundles: {
        difficulty: 'medium',
        question: say(
            'Sorta batek 2 unitate eta 5 unitate ditu, bi produktutatik, eta 16 euro balio du; besteak 1 eta 3 unitate ditu, eta 9 euro balio du. Badira prezio bakarrak? Zein da lehen produktuaren prezioa?',
            'Un lote con 2 y 5 unidades de dos productos cuesta 16 €, y otro con 1 y 3 unidades, 9 €. ¿Hay precios únicos? ¿Cuál es el precio del primer producto?',
            'مجموعة فيها 2 و5 وحدات من منتجين تكلّف 16 €، وأخرى فيها 1 و3 وحدات تكلّف 9 €. هل الأسعار وحيدة؟ وما سعر المنتج الأول؟',
            'A bundle with 2 and 5 units of two products costs €16, and another with 1 and 3 units costs €9. Are the prices unique? What is the price of the first product?'
        ),
        solution: say(
            '$|A|=2\\cdot 3-5\\cdot 1=1\\neq 0$: bai. $A^{-1}=\\begin{pmatrix}3&-5\\\\-1&2\\end{pmatrix}$, $x=3\\cdot 16-5\\cdot 9=3$ eta $y=-1\\cdot 16+2\\cdot 9=2$.',
            '$|A|=2\\cdot 3-5\\cdot 1=1\\neq 0$: sí. $A^{-1}=\\begin{pmatrix}3&-5\\\\-1&2\\end{pmatrix}$, $x=3\\cdot 16-5\\cdot 9=3$ e $y=-1\\cdot 16+2\\cdot 9=2$.',
            '$|A|=2\\cdot 3-5\\cdot 1=1\\neq 0$: نعم. $A^{-1}=\\begin{pmatrix}3&-5\\\\-1&2\\end{pmatrix}$، و$x=3\\cdot 16-5\\cdot 9=3$ و$y=-1\\cdot 16+2\\cdot 9=2$.',
            '$|A|=2\\cdot 3-5\\cdot 1=1\\neq 0$: yes. $A^{-1}=\\begin{pmatrix}3&-5\\\\-1&2\\end{pmatrix}$, $x=3\\cdot 16-5\\cdot 9=3$ and $y=-1\\cdot 16+2\\cdot 9=2$.'
        ),
        answer: { expected: n(3) }
    },
    exam: {
        difficulty: 'hard',
        question: say(
            'Izan bedi $A=\\begin{pmatrix}1&0&1\\\\1&1&0\\\\0&1&a\\end{pmatrix}$. a) Zein $a$ baliotarako ez du alderantzizkorik? b) $a=1$ denean, kalkulatu $A^{-1}$.',
            'Sea $A=\\begin{pmatrix}1&0&1\\\\1&1&0\\\\0&1&a\\end{pmatrix}$. a) ¿Para qué valor de $a$ no tiene inversa? b) Para $a=1$, calcula $A^{-1}$.',
            'لتكن $A=\\begin{pmatrix}1&0&1\\\\1&1&0\\\\0&1&a\\end{pmatrix}$. أ) لأي قيمة لـ $a$ ليس لها معكوس؟ ب) من أجل $a=1$ احسب $A^{-1}$.',
            'Let $A=\\begin{pmatrix}1&0&1\\\\1&1&0\\\\0&1&a\\end{pmatrix}$. a) For which value of $a$ does it have no inverse? b) For $a=1$, work out $A^{-1}$.'
        ),
        solution: say(
            'a) $|A|=a+1=0\\ \\to\\ a=-1$. b) $|A|=2$ eta $A^{-1}=\\frac{1}{2}\\begin{pmatrix}1&1&-1\\\\-1&1&1\\\\1&-1&1\\end{pmatrix}$.',
            'a) $|A|=a+1=0\\ \\to\\ a=-1$. b) $|A|=2$ y $A^{-1}=\\frac{1}{2}\\begin{pmatrix}1&1&-1\\\\-1&1&1\\\\1&-1&1\\end{pmatrix}$.',
            'أ) $|A|=a+1=0\\ \\to\\ a=-1$. ب) $|A|=2$ و$A^{-1}=\\frac{1}{2}\\begin{pmatrix}1&1&-1\\\\-1&1&1\\\\1&-1&1\\end{pmatrix}$.',
            'a) $|A|=a+1=0\\ \\to\\ a=-1$. b) $|A|=2$ and $A^{-1}=\\frac{1}{2}\\begin{pmatrix}1&1&-1\\\\-1&1&1\\\\1&-1&1\\end{pmatrix}$.'
        ),
        answer: { expected: n(-1) }
    }
}

/** The ten of each stage: the twin's, without order 4, equations of degree 2 or 3 and areas, and this unit's own */
const sectionOrder: Record<string, Array<number | string>> = {
    orders: [1, 2, 3, 'bundleDet', 4, 5, 6, 'sarrus', 8, 'parameter'],
    properties: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    expansion: [21, 22, 'cofactorTwo', 23, 24, 'rowTwo', 'adjugate', 'zeros', 30, 'missingCofactor'],
    rank: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    inverse: [41, 42, 43, 44, 45, 46, 'bundles', 48, 'exam', 50]
}

let bankId = 0
export const gizarteDeterminanteakExerciseBank: ExerciseSection[] = determinanteakExerciseBank.map((section) => ({
    ...section,
    items: sectionOrder[section.id].map((key) => {
        bankId += 1
        return typeof key === 'number' ? { ...twinBank(key), id: bankId } : { ...ownBank[key], id: bankId }
    })
}))
