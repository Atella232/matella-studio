import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — diagnostic,
   guided practice, exercise bank and challenges, after Santillana 4.º
   Académicas unit 2 and the radicals and logarithms of Anaya 4.º
   Académicas unit 1 (the proton, the Sun, ∛3240, the conjugates of √3 − √2
   and √2 − √5, log₅ 0,04, log₁₂ 144, log₅ 20, the earthquake scale). Every
   closed answer is a single number or a fraction: when the result is a
   radical, the question asks for one of its numbers.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.')
/** A prompt followed by an instruction (rounding, fraction) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})
/** «Formula. How much is a?» in the three languages */
const howMuch = (formula: string, letter = 'a') => say(`${formula}. Zenbat da $${letter}$?`, `${formula}. ¿Cuánto vale $${letter}$?`, `${formula}. كم تساوي $${letter}$؟`)
const calc = (formula: string) => say(`Kalkulatu ${formula}.`, `Calcula ${formula}.`, `احسب ${formula}.`)

export const powersDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5001,
        prompt: calc('$(-2)^{-3}$'),
        options: [same('$-\\frac{1}{8}$'), same('$8$'), same('$-8$')],
        correctIndex: 0,
        explanation: say('Berretzaile negatiboa: alderantzizkoa. Bakoitia: negatiboa. $\\frac{1}{(-2)^{3}}=-\\frac{1}{8}$.', 'Exponente negativo: el inverso. Impar: negativo. $\\frac{1}{(-2)^{3}}=-\\frac{1}{8}$.', 'الأس السالب: المقلوب. والفردي سالب. $\\frac{1}{(-2)^{3}}=-\\frac{1}{8}$.'),
        topic: 'integer-powers'
    },
    {
        id: 5002,
        prompt: calc('$2^{5}\\cdot 2^{-2}$'),
        options: [same('$2^{-10}$'), same('$2^{3}$'), same('$2^{7}$')],
        correctIndex: 1,
        explanation: say('Oinarri bera: berretzaileak batu, $5+(-2)=3$.', 'Misma base: se suman los exponentes, $5+(-2)=3$.', 'الأساس نفسه: نجمع الأسين، $5+(-2)=3$.'),
        topic: 'power-rules'
    },
    {
        id: 5003,
        prompt: say('Nola idazten da $0{,}00052$ idazkera zientifikoan?', '¿Cómo se escribe $0{,}00052$ en notación científica?', 'كيف يُكتب $0{,}00052$ بالترميز العلمي؟'),
        options: [same('$52\\cdot 10^{-5}$'), same('$5{,}2\\cdot 10^{4}$'), same('$5{,}2\\cdot 10^{-4}$')],
        correctIndex: 2,
        explanation: say('Komaren aurretik zifra bakarra, 0 ez dena: 4 jauzi eskuinera, berretzaile negatiboa.', 'Una sola cifra distinta de 0 delante de la coma: 4 saltos a la derecha, exponente negativo.', 'رقم واحد غير صفر قبل الفاصلة: 4 قفزات إلى اليمين، أس سالب.'),
        topic: 'scientific'
    },
    {
        id: 5004,
        prompt: calc('$8^{\\frac{2}{3}}$'),
        options: [same('$4$'), same('$\\frac{16}{3}$'), same('$512$')],
        correctIndex: 0,
        explanation: same('$(\\sqrt[3]{8})^{2}=2^{2}=4$'),
        topic: 'fractional'
    },
    {
        id: 5005,
        prompt: say('Zein erradikal da $\\sqrt{2}$-ren baliokidea?', '¿Qué radical es equivalente a $\\sqrt{2}$?', 'أي جذر يكافئ $\\sqrt{2}$؟'),
        options: [same('$\\sqrt[4]{2}$'), same('$\\sqrt[6]{8}$'), same('$\\sqrt[6]{2}$')],
        correctIndex: 1,
        explanation: say('Indizea eta berretzailea 3z biderkatu: $\\sqrt{2}=\\sqrt[6]{2^{3}}=\\sqrt[6]{8}$.', 'Multiplica índice y exponente por 3: $\\sqrt{2}=\\sqrt[6]{2^{3}}=\\sqrt[6]{8}$.', 'اضرب الدليل والأس في 3: $\\sqrt{2}=\\sqrt[6]{2^{3}}=\\sqrt[6]{8}$.'),
        topic: 'equivalent'
    },
    {
        id: 5006,
        prompt: calc('$\\sqrt{18}+\\sqrt{8}$'),
        options: [same('$\\sqrt{26}$'), same('$13\\sqrt{2}$'), same('$5\\sqrt{2}$')],
        correctIndex: 2,
        explanation: say('Atera faktoreak: $3\\sqrt{2}+2\\sqrt{2}=5\\sqrt{2}$. Erroak ez dira batzen errokizunak batuz.', 'Saca factores: $3\\sqrt{2}+2\\sqrt{2}=5\\sqrt{2}$. Las raíces no se suman sumando los radicandos.', 'أخرج العوامل: $3\\sqrt{2}+2\\sqrt{2}=5\\sqrt{2}$. لا تُجمع الجذور بجمع ما تحتها.'),
        topic: 'add-radicals'
    },
    {
        id: 5007,
        prompt: say('Arrazionalizatu $\\frac{1}{\\sqrt{2}}$.', 'Racionaliza $\\frac{1}{\\sqrt{2}}$.', 'أنطِق $\\frac{1}{\\sqrt{2}}$.'),
        options: [same('$\\frac{\\sqrt{2}}{2}$'), same('$\\sqrt{2}$'), same('$\\frac{1}{2}$')],
        correctIndex: 0,
        explanation: same('$\\frac{1\\cdot\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$'),
        topic: 'rationalize-square'
    },
    {
        id: 5008,
        prompt: calc('$\\log_3 81$'),
        options: [same('$27$'), same('$4$'), same('$\\frac{1}{4}$')],
        correctIndex: 1,
        explanation: say('$3^{4}=81$ denez, $\\log_3 81=4$. Logaritmoa berretzailea da.', 'Como $3^{4}=81$, $\\log_3 81=4$. El logaritmo es el exponente.', 'بما أن $3^{4}=81$ فإن $\\log_3 81=4$. اللوغاريتم هو الأس.'),
        topic: 'log-definition'
    }
]

export const powersPractice: PracticeItem[] = [
    /* ---------- Powers ---------- */
    { id: 1, stage: 'powers', prompt: with_(calc('$\\left(\\frac{3}{2}\\right)^{-2}$'), AS_FRACTION), expected: f(4, 9), hint: say('Buelta eman zatikiari.', 'Da la vuelta a la fracción.', 'اقلب الكسر.'), explanation: same('$\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}$') },
    { id: 2, stage: 'powers', prompt: calc('$\\frac{2^{5}\\cdot 2^{-3}}{2^{-1}}$'), expected: n(8), hint: say('Batu goiko berretzaileak eta kendu behekoa.', 'Suma los exponentes de arriba y resta el de abajo.', 'اجمع أسس البسط واطرح أس المقام.'), explanation: same('$2^{5-3+1}=2^{3}=8$') },
    { id: 3, stage: 'powers', prompt: calc('$\\frac{6^{2}\\cdot 9}{3^{3}\\cdot 2}$'), expected: n(6), hint: say('Faktorizatu: $6=2\\cdot 3$ eta $9=3^{2}$.', 'Factoriza: $6=2\\cdot 3$ y $9=3^{2}$.', 'حلّل: $6=2\\cdot 3$ و$9=3^{2}$.'), explanation: same('$\\frac{2^{2}\\cdot 3^{2}\\cdot 3^{2}}{3^{3}\\cdot 2}=2\\cdot 3=6$') },
    { id: 4, stage: 'powers', prompt: say('Kalkulatu $(6{,}4\\cdot 10^{5})\\cdot(5\\cdot 10^{-6})$ eta idatzi zenbaki hamartar gisa.', 'Calcula $(6{,}4\\cdot 10^{5})\\cdot(5\\cdot 10^{-6})$ y escríbelo como número decimal.', 'احسب $(6{,}4\\cdot 10^{5})\\cdot(5\\cdot 10^{-6})$ واكتبه عددًا عشريًا.'), expected: v('3,2'), hint: say('Biderkatu zenbakiak eta batu berretzaileak.', 'Multiplica los números y suma los exponentes.', 'اضرب العددين واجمع الأسين.'), explanation: same('$32\\cdot 10^{-1}=3{,}2$') },

    /* ---------- Radicals ---------- */
    { id: 5, stage: 'radicals', prompt: calc('$\\sqrt[5]{-243}$'), expected: n(-3), hint: say('Indize bakoitia: erroak errokizunaren zeinua du.', 'Índice impar: la raíz tiene el signo del radicando.', 'دليل فردي: للجذر إشارة ما تحته.'), explanation: same('$(-3)^{5}=-243$') },
    { id: 6, stage: 'radicals', prompt: with_(calc('$16^{-\\frac{3}{4}}$'), AS_FRACTION), expected: f(1, 8), hint: say('Lehenik $\\sqrt[4]{16}=2$, gero berretzailea.', 'Primero $\\sqrt[4]{16}=2$, luego el exponente.', 'أولًا $\\sqrt[4]{16}=2$ ثم الأس.'), explanation: same('$\\frac{1}{(\\sqrt[4]{16})^{3}}=\\frac{1}{2^{3}}=\\frac{1}{8}$') },
    { id: 7, stage: 'radicals', prompt: howMuch('$\\sqrt[6]{2^{4}}=\\sqrt[n]{2^{2}}$', 'n'), expected: n(3), hint: say('Zatitu indizea eta berretzailea 2z.', 'Divide índice y exponente entre 2.', 'اقسم الدليل والأس على 2.'), explanation: same('$\\sqrt[6]{2^{4}}=\\sqrt[3]{2^{2}}$') },
    { id: 8, stage: 'radicals', prompt: say('Zein da $\\sqrt{2}$, $\\sqrt[3]{3}$ eta $\\sqrt[4]{5}$-en indize komun txikiena?', '¿Cuál es el menor índice común de $\\sqrt{2}$, $\\sqrt[3]{3}$ y $\\sqrt[4]{5}$?', 'ما أصغر دليل مشترك لـ $\\sqrt{2}$ و$\\sqrt[3]{3}$ و$\\sqrt[4]{5}$؟'), expected: n(12), hint: say('Indizeen m.k.t.-a.', 'El m.c.m. de los índices.', 'المضاعف المشترك الأصغر للأدلة.'), explanation: same('$\\text{m.c.m.}(2,3,4)=12$') },

    /* ---------- Operations ---------- */
    { id: 9, stage: 'operations', prompt: howMuch('$\\sqrt[3]{3240}=a\\sqrt[3]{15}$'), expected: n(6), hint: say('$3240=2^{3}\\cdot 3^{4}\\cdot 5$.', '$3240=2^{3}\\cdot 3^{4}\\cdot 5$.', '$3240=2^{3}\\cdot 3^{4}\\cdot 5$.'), explanation: same('$\\sqrt[3]{2^{3}\\cdot 3^{3}\\cdot 15}=6\\sqrt[3]{15}$') },
    { id: 10, stage: 'operations', prompt: howMuch('$\\sqrt{18}-\\sqrt{50}+\\sqrt{2}-\\sqrt{8}=a\\sqrt{2}$'), expected: n(-3), hint: say('Atera faktore bakoitza: $\\sqrt{18}=3\\sqrt{2}$…', 'Saca factores en cada una: $\\sqrt{18}=3\\sqrt{2}$…', 'أخرج العوامل من كل جذر: $\\sqrt{18}=3\\sqrt{2}$…'), explanation: same('$3\\sqrt{2}-5\\sqrt{2}+\\sqrt{2}-2\\sqrt{2}=-3\\sqrt{2}$') },
    { id: 11, stage: 'operations', prompt: howMuch('$\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{n}$', 'n'), expected: n(72), hint: say('Indize komuna: 6.', 'Índice común: 6.', 'الدليل المشترك: 6.'), explanation: same('$\\sqrt[6]{2^{3}}\\cdot\\sqrt[6]{3^{2}}=\\sqrt[6]{72}$') },
    { id: 12, stage: 'operations', prompt: calc('$\\sqrt[3]{\\sqrt{64}}$'), expected: n(2), hint: say('Erroaren erroa: biderkatu indizeak.', 'Raíz de raíz: multiplica los índices.', 'جذر الجذر: اضرب الأدلة.'), explanation: same('$\\sqrt[3]{\\sqrt{64}}=\\sqrt[6]{64}=2$') },

    /* ---------- Rationalizing ---------- */
    { id: 13, stage: 'rationalize', prompt: howMuch('$\\frac{10}{\\sqrt{5}}=a\\sqrt{5}$'), expected: n(2), hint: say('Biderkatu goian eta behean $\\sqrt{5}$-ez.', 'Multiplica arriba y abajo por $\\sqrt{5}$.', 'اضرب البسط والمقام في $\\sqrt{5}$.'), explanation: same('$\\frac{10\\sqrt{5}}{5}=2\\sqrt{5}$') },
    { id: 14, stage: 'rationalize', prompt: howMuch('$\\frac{8}{3\\sqrt{2}}=\\frac{a\\sqrt{2}}{3}$'), expected: n(4), hint: say('Nahikoa da $\\sqrt{2}$-z biderkatzea.', 'Basta con multiplicar por $\\sqrt{2}$.', 'يكفي الضرب في $\\sqrt{2}$.'), explanation: same('$\\frac{8\\sqrt{2}}{3\\cdot 2}=\\frac{4\\sqrt{2}}{3}$') },
    { id: 15, stage: 'rationalize', prompt: howMuch('$\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{n}}{2}$', 'n'), expected: n(4), hint: say('Osatu berretzailea 3raino: biderkatu $\\sqrt[3]{2^{2}}$-z.', 'Completa el exponente hasta 3: multiplica por $\\sqrt[3]{2^{2}}$.', 'أكمل الأس حتى 3: اضرب في $\\sqrt[3]{2^{2}}$.'), explanation: same('$\\frac{5\\sqrt[3]{2^{2}}}{\\sqrt[3]{2^{3}}}=\\frac{5\\sqrt[3]{4}}{2}$') },
    { id: 16, stage: 'rationalize', prompt: howMuch('$\\frac{2}{\\sqrt{3}-1}=\\sqrt{3}+a$'), expected: n(1), hint: say('Biderkatu konjokatuaz: $\\sqrt{3}+1$.', 'Multiplica por el conjugado: $\\sqrt{3}+1$.', 'اضرب في المرافق: $\\sqrt{3}+1$.'), explanation: same('$\\frac{2(\\sqrt{3}+1)}{3-1}=\\sqrt{3}+1$') },

    /* ---------- Logarithms ---------- */
    { id: 17, stage: 'logarithms', prompt: calc('$\\log_2 128$'), expected: n(7), hint: say('Zenbatera jaso 2 128 lortzeko?', '¿A qué hay que elevar 2 para obtener 128?', 'إلى أي قوة نرفع 2 لنحصل على 128؟'), explanation: same('$2^{7}=128$') },
    { id: 18, stage: 'logarithms', prompt: calc('$\\log_5 0{,}04$'), expected: n(-2), hint: say('$0{,}04=\\frac{1}{25}$.', '$0{,}04=\\frac{1}{25}$.', '$0{,}04=\\frac{1}{25}$.'), explanation: same('$5^{-2}=\\frac{1}{25}=0{,}04$') },
    { id: 19, stage: 'logarithms', prompt: calc('$\\log_{12} 18+\\log_{12} 4+\\log_{12} 2$'), expected: n(2), hint: say('Logaritmoen batura: biderkaduraren logaritmoa.', 'Suma de logaritmos: logaritmo del producto.', 'مجموع اللوغاريتمات: لوغاريتم الضرب.'), explanation: same('$\\log_{12}(18\\cdot 4\\cdot 2)=\\log_{12} 144\\qquad 12^{2}=144$') },
    { id: 20, stage: 'logarithms', prompt: with_(calc('$\\log_5 20$'), HUNDREDTHS), expected: v('1,86'), hint: say('Oinarri-aldaketa: $\\frac{\\log 20}{\\log 5}$.', 'Cambio de base: $\\frac{\\log 20}{\\log 5}$.', 'تغيير الأساس: $\\frac{\\log 20}{\\log 5}$.'), explanation: same('$\\frac{\\log 20}{\\log 5}\\approx\\frac{1{,}301}{0{,}699}\\approx 1{,}86$') }
]

export const powersChallenges: ChallengeItem[] = [
    { id: 101, stage: 'powers', points: 10, context: 'starter', prompt: with_(calc('$\\frac{(-3)^{4}\\cdot 3^{-2}}{(-3)^{3}}$'), AS_FRACTION), expected: f(-1, 3), hint: say('$(-3)^{4}=3^{4}$ eta $(-3)^{3}=-3^{3}$.', '$(-3)^{4}=3^{4}$ y $(-3)^{3}=-3^{3}$.', '$(-3)^{4}=3^{4}$ و$(-3)^{3}=-3^{3}$.'), explanation: same('$\\frac{3^{4}\\cdot 3^{-2}}{-3^{3}}=-3^{-1}=-\\frac{1}{3}$') },
    { id: 102, stage: 'powers', points: 20, context: 'advanced', prompt: howMuch('$2^{x}=\\frac{8^{3}}{4^{-2}}$', 'x'), expected: n(13), hint: say('Idatzi dena 2ren berretura gisa.', 'Escríbelo todo como potencias de 2.', 'اكتب كل شيء قوى للعدد 2.'), explanation: same('$\\frac{2^{9}}{2^{-4}}=2^{13}$') },
    { id: 103, stage: 'powers', points: 30, context: 'master', prompt: say('Lurretik Eguzkira $1{,}49\\cdot 10^{8}$ km daude, eta argiak $3\\cdot 10^{5}$ km egiten ditu segundoko. Zenbat segundo behar ditu Eguzkiaren argiak Lurrera iristeko? Hurbildu unitateetara.', 'De la Tierra al Sol hay $1{,}49\\cdot 10^{8}$ km, y la luz recorre $3\\cdot 10^{5}$ km por segundo. ¿Cuántos segundos tarda la luz del Sol en llegar a la Tierra? Aproxima a las unidades.', 'بين الأرض والشمس $1{,}49\\cdot 10^{8}$ كم، ويقطع الضوء $3\\cdot 10^{5}$ كم في الثانية. كم ثانية يحتاج ضوء الشمس ليصل إلى الأرض؟ قرّب إلى الآحاد.'), expected: n(497), hint: say('Zatitu: zenbakiak zatitu eta berretzaileak kendu.', 'Divide: los números entre sí y resta los exponentes.', 'اقسم: العددين واطرح الأسين.'), explanation: same('$\\frac{1{,}49\\cdot 10^{8}}{3\\cdot 10^{5}}\\approx 0{,}4967\\cdot 10^{3}\\approx 497$') },
    { id: 104, stage: 'radicals', points: 10, context: 'starter', prompt: calc('$27^{\\frac{2}{3}}$'), expected: n(9), hint: say('Lehenik $\\sqrt[3]{27}$.', 'Primero $\\sqrt[3]{27}$.', 'أولًا $\\sqrt[3]{27}$.'), explanation: same('$(\\sqrt[3]{27})^{2}=3^{2}=9$') },
    { id: 105, stage: 'radicals', points: 20, context: 'advanced', prompt: howMuch('$\\sqrt[3]{4}$ eta $\\sqrt[4]{6}$ konparatzeko, $\\sqrt[4]{6}=\\sqrt[12]{n}$ idazten da', 'n'), expected: n(216), hint: say('Indizea 3z biderkatu, berretzailea ere bai.', 'Multiplica el índice por 3, y el exponente también.', 'اضرب الدليل في 3 والأس كذلك.'), explanation: same('$\\sqrt[4]{6}=\\sqrt[12]{6^{3}}=\\sqrt[12]{216}$') },
    { id: 106, stage: 'radicals', points: 30, context: 'master', prompt: calc('$\\sqrt{(\\sqrt[3]{5^{2}})^{6}}$'), expected: n(25), hint: say('Idatzi berretzaile zatikiekin.', 'Escríbelo con exponentes fraccionarios.', 'اكتبه بأسس كسرية.'), explanation: same('$\\left(5^{\\frac{2}{3}\\cdot 6}\\right)^{\\frac{1}{2}}=5^{2}=25$') },
    { id: 107, stage: 'operations', points: 10, context: 'starter', prompt: howMuch('$\\sqrt{10}-9\\sqrt{10}+4\\sqrt{10}=a\\sqrt{10}$'), expected: n(-4), hint: say('Antzekoak: batu koefizienteak.', 'Semejantes: suma los coeficientes.', 'متشابهة: اجمع المعاملات.'), explanation: same('$(1-9+4)\\sqrt{10}=-4\\sqrt{10}$') },
    { id: 108, stage: 'operations', points: 20, context: 'advanced', prompt: howMuch('$\\sqrt[4]{3}\\cdot\\sqrt[6]{9}\\cdot\\sqrt{3}=3^{\\frac{p}{12}}$', 'p'), expected: n(13), hint: say('$\\sqrt[6]{9}=3^{\\frac{2}{6}}$. Batu berretzaileak.', '$\\sqrt[6]{9}=3^{\\frac{2}{6}}$. Suma los exponentes.', '$\\sqrt[6]{9}=3^{\\frac{2}{6}}$. اجمع الأسس.'), explanation: same('$3^{\\frac{1}{4}+\\frac{1}{3}+\\frac{1}{2}}=3^{\\frac{13}{12}}$') },
    { id: 109, stage: 'operations', points: 30, context: 'master', prompt: howMuch('$(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})+(\\sqrt{2}+1)^{2}=p+q\\sqrt{2}$, $p$ eta $q$ osoak izanik', 'p'), expected: n(5), hint: say('Batura bider kenketa eta batura baten karratua.', 'Suma por diferencia y cuadrado de una suma.', 'المجموع في الفرق ومربع المجموع.'), explanation: same('$5-3+2+2\\sqrt{2}+1=5+2\\sqrt{2}$') },
    { id: 110, stage: 'rationalize', points: 10, context: 'starter', prompt: howMuch('$\\frac{12}{\\sqrt{6}}=a\\sqrt{6}$'), expected: n(2), hint: say('Biderkatu goian eta behean $\\sqrt{6}$-z.', 'Multiplica arriba y abajo por $\\sqrt{6}$.', 'اضرب البسط والمقام في $\\sqrt{6}$.'), explanation: same('$\\frac{12\\sqrt{6}}{6}=2\\sqrt{6}$') },
    { id: 111, stage: 'rationalize', points: 20, context: 'advanced', prompt: howMuch('$\\frac{8}{\\sqrt[4]{8}}=a\\sqrt[4]{2}$'), expected: n(4), hint: say('$8=2^{3}$: osatu $2^{4}$-raino.', '$8=2^{3}$: completa hasta $2^{4}$.', '$8=2^{3}$: أكمل حتى $2^{4}$.'), explanation: same('$\\frac{8\\sqrt[4]{2}}{2}=4\\sqrt[4]{2}$') },
    { id: 112, stage: 'rationalize', points: 30, context: 'master', prompt: howMuch('$\\frac{-1}{\\sqrt{2}-\\sqrt{5}}=\\frac{\\sqrt{2}+\\sqrt{5}}{n}$', 'n'), expected: n(3), hint: say('Konjokatua: $\\sqrt{2}+\\sqrt{5}$. Izendatzailea $2-5$.', 'Conjugado: $\\sqrt{2}+\\sqrt{5}$. El denominador, $2-5$.', 'المرافق: $\\sqrt{2}+\\sqrt{5}$. والمقام $2-5$.'), explanation: same('$\\frac{-(\\sqrt{2}+\\sqrt{5})}{2-5}=\\frac{\\sqrt{2}+\\sqrt{5}}{3}$') },
    { id: 113, stage: 'logarithms', points: 10, context: 'starter', prompt: howMuch('$\\log_b 216=3$', 'b'), expected: n(6), hint: say('$b^{3}=216$.', '$b^{3}=216$.', '$b^{3}=216$.'), explanation: same('$6^{3}=216$') },
    { id: 114, stage: 'logarithms', points: 20, context: 'advanced', prompt: with_(howMuch('$\\log_x \\frac{1}{125}=3$', 'x'), AS_FRACTION), expected: f(1, 5), hint: say('$x^{3}=\\frac{1}{125}$.', '$x^{3}=\\frac{1}{125}$.', '$x^{3}=\\frac{1}{125}$.'), explanation: same('$\\left(\\frac{1}{5}\\right)^{3}=\\frac{1}{125}\\to x=\\frac{1}{5}$') },
    { id: 115, stage: 'logarithms', points: 30, context: 'master', prompt: say('$\\log 2=0{,}301$ hartuta, kalkulatu $\\log 40$.', 'Tomando $\\log 2=0{,}301$, calcula $\\log 40$.', 'إذا أخذنا $\\log 2=0{,}301$ فاحسب $\\log 40$.'), expected: v('1,602'), hint: say('$40=2^{2}\\cdot 10$.', '$40=2^{2}\\cdot 10$.', '$40=2^{2}\\cdot 10$.'), explanation: same('$\\log 40=2\\log 2+1=2\\cdot 0{,}301+1=1{,}602$') }
]

export const powersExerciseBank: ExerciseSection[] = [
    {
        id: 'powers',
        title: say('Berreturak', 'Potencias', 'القوى'),
        items: [
            { id: 1, difficulty: 'easy', question: calc('$(-2)^{6}$'), solution: same('$(-2)^{6}=64$'), answer: { expected: n(64) } },
            { id: 2, difficulty: 'easy', question: calc('$-2^{6}$'), solution: say('Berretzaileak 2ari bakarrik eragiten dio: $-2^{6}=-64$.', 'El exponente solo afecta al 2: $-2^{6}=-64$.', 'لا يؤثر الأس إلا في 2: $-2^{6}=-64$.'), answer: { expected: n(-64) } },
            { id: 3, difficulty: 'easy', question: with_(calc('$\\left(\\frac{5}{7}\\right)^{2}$'), AS_FRACTION), solution: same('$\\frac{5^{2}}{7^{2}}=\\frac{25}{49}$'), answer: { expected: f(25, 49) } },
            { id: 4, difficulty: 'easy', question: with_(calc('$3^{-4}$'), AS_FRACTION), solution: same('$\\frac{1}{3^{4}}=\\frac{1}{81}$'), answer: { expected: f(1, 81) } },
            { id: 5, difficulty: 'medium', question: howMuch('$\\frac{5^{7}\\cdot 3^{3}\\cdot 6^{4}}{6^{2}\\cdot 3\\cdot 5^{4}}=5^{a}\\cdot 3^{b}\\cdot 6^{c}$'), solution: same('$5^{7-4}\\cdot 3^{3-1}\\cdot 6^{4-2}=5^{3}\\cdot 3^{2}\\cdot 6^{2}$'), answer: { expected: n(3) } },
            { id: 6, difficulty: 'medium', question: calc('$2^{7}\\cdot\\frac{3}{4}\\cdot\\frac{2^{3}}{3^{2}}\\cdot\\left(\\frac{3}{8}\\right)^{2}$'), solution: same('$\\frac{2^{7}\\cdot 3\\cdot 2^{3}\\cdot 3^{2}}{2^{2}\\cdot 3^{2}\\cdot 2^{6}}=2^{2}\\cdot 3=12$'), answer: { expected: n(12) } },
            { id: 7, difficulty: 'medium', question: howMuch('$0{,}04\\cdot 10^{9}=4\\cdot 10^{n}$', 'n'), solution: same('$0{,}04\\cdot 10^{9}=4\\cdot 10^{7}$'), answer: { expected: n(7) } },
            { id: 8, difficulty: 'medium', question: howMuch('$7{,}92\\cdot 10^{6}+3{,}58\\cdot 10^{7}=a\\cdot 10^{7}$'), solution: same('$0{,}792\\cdot 10^{7}+3{,}58\\cdot 10^{7}=4{,}372\\cdot 10^{7}$'), answer: { expected: v('4,372') } },
            { id: 9, difficulty: 'hard', question: howMuch('$6{,}43\\cdot 10^{10}+8{,}113\\cdot 10^{12}-8\\cdot 10^{11}=a\\cdot 10^{12}$'), solution: same('$(6{,}43+811{,}3-80)\\cdot 10^{10}=737{,}73\\cdot 10^{10}=7{,}3773\\cdot 10^{12}$'), answer: { expected: v('7,3773') } },
            { id: 10, difficulty: 'hard', question: with_(say('Protoi baten masa $1{,}672\\cdot 10^{-24}$ g da. Zenbat protoi daude gramo batean? Idatzi $a\\cdot 10^{23}$ eta eman $a$.', 'La masa de un protón es $1{,}672\\cdot 10^{-24}$ g. ¿Cuántos protones hay en un gramo? Escríbelo como $a\\cdot 10^{23}$ y da $a$.', 'كتلة البروتون $1{,}672\\cdot 10^{-24}$ غ. كم بروتونًا في غرام واحد؟ اكتبه $a\\cdot 10^{23}$ وأعطِ $a$.'), HUNDREDTHS), solution: same('$\\frac{1}{1{,}672\\cdot 10^{-24}}\\approx 0{,}598\\cdot 10^{24}\\approx 5{,}98\\cdot 10^{23}$'), answer: { expected: v('5,98') } }
        ]
    },
    {
        id: 'radicals',
        title: say('Erradikalak', 'Radicales', 'الجذور'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu $\\sqrt[4]{1296}$-ren erro positiboa.', 'Calcula la raíz positiva de $\\sqrt[4]{1296}$.', 'احسب الجذر الموجب لـ $\\sqrt[4]{1296}$.'), solution: same('$6^{4}=1296$'), answer: { expected: n(6) } },
            { id: 12, difficulty: 'easy', question: calc('$\\sqrt[5]{-100\\,000}$'), solution: same('$(-10)^{5}=-100\\,000$'), answer: { expected: n(-10) } },
            { id: 13, difficulty: 'easy', question: say('Badu $\\sqrt[4]{-256}$-k erro errealik?', '¿Tiene $\\sqrt[4]{-256}$ raíz real?', 'هل لـ $\\sqrt[4]{-256}$ جذر حقيقي؟'), solution: say('Ez: indizea bikoitia da eta errokizuna negatiboa; ez dago laugarren berretura negatiborik.', 'No: el índice es par y el radicando negativo; ninguna potencia cuarta es negativa.', 'لا: الدليل زوجي وما تحت الجذر سالب؛ لا قوة رابعة سالبة.') },
            { id: 14, difficulty: 'easy', question: calc('$125^{\\frac{1}{3}}$'), solution: same('$\\sqrt[3]{125}=5$'), answer: { expected: n(5) } },
            { id: 15, difficulty: 'medium', question: calc('$36^{\\frac{3}{2}}$'), solution: same('$(\\sqrt{36})^{3}=6^{3}=216$'), answer: { expected: n(216) } },
            { id: 16, difficulty: 'medium', question: with_(calc('$81^{-\\frac{3}{4}}$'), AS_FRACTION), solution: same('$\\frac{1}{(\\sqrt[4]{81})^{3}}=\\frac{1}{3^{3}}=\\frac{1}{27}$'), answer: { expected: f(1, 27) } },
            { id: 17, difficulty: 'medium', question: howMuch('$\\sqrt[10]{3^{4}}=\\sqrt[n]{3^{2}}$', 'n'), solution: same('$3^{\\frac{4}{10}}=3^{\\frac{2}{5}}=\\sqrt[5]{3^{2}}$'), answer: { expected: n(5) } },
            { id: 18, difficulty: 'medium', question: say('Zein da handiagoa, $\\sqrt[3]{51}$ ala $\\sqrt[9]{132\\,650}$?', '¿Cuál es mayor, $\\sqrt[3]{51}$ o $\\sqrt[9]{132\\,650}$?', 'أيهما أكبر: $\\sqrt[3]{51}$ أم $\\sqrt[9]{132\\,650}$؟'), solution: say('Indize komuna 9: $\\sqrt[3]{51}=\\sqrt[9]{51^{3}}=\\sqrt[9]{132\\,651}$. Beraz $\\sqrt[3]{51}$ da handiagoa, oso gutxigatik.', 'Índice común 9: $\\sqrt[3]{51}=\\sqrt[9]{51^{3}}=\\sqrt[9]{132\\,651}$. Así que $\\sqrt[3]{51}$ es mayor, por muy poco.', 'الدليل المشترك 9: $\\sqrt[3]{51}=\\sqrt[9]{51^{3}}=\\sqrt[9]{132\\,651}$. إذن $\\sqrt[3]{51}$ أكبر بفارق ضئيل.') },
            { id: 19, difficulty: 'hard', question: howMuch('$\\sqrt[4]{10}$ eta $\\sqrt[5]{3}$ indize komunera eramanda, $\\sqrt[5]{3}=\\sqrt[20]{n}$', 'n'), solution: same('$\\sqrt[5]{3}=\\sqrt[20]{3^{4}}=\\sqrt[20]{81}$'), answer: { expected: n(81) } },
            { id: 20, difficulty: 'hard', question: howMuch('$\\sqrt[14]{2^{6}}=\\sqrt[7]{2^{m}}$', 'm'), solution: same('$2^{\\frac{6}{14}}=2^{\\frac{3}{7}}=\\sqrt[7]{2^{3}}$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'operations',
        title: say('Eragiketak erradikalekin', 'Operaciones con radicales', 'العمليات على الجذور'),
        items: [
            { id: 21, difficulty: 'easy', question: howMuch('$\\sqrt{98}=a\\sqrt{2}$'), solution: same('$\\sqrt{2\\cdot 7^{2}}=7\\sqrt{2}$'), answer: { expected: n(7) } },
            { id: 22, difficulty: 'easy', question: howMuch('$\\sqrt[3]{48}=a\\sqrt[3]{6}$'), solution: same('$\\sqrt[3]{2^{3}\\cdot 6}=2\\sqrt[3]{6}$'), answer: { expected: n(2) } },
            { id: 23, difficulty: 'easy', question: howMuch('$12\\sqrt{5}-9\\sqrt{5}-\\sqrt{5}=a\\sqrt{5}$'), solution: same('$(12-9-1)\\sqrt{5}=2\\sqrt{5}$'), answer: { expected: n(2) } },
            { id: 24, difficulty: 'medium', question: howMuch('$\\sqrt[4]{176}=a\\sqrt[4]{11}$'), solution: same('$\\sqrt[4]{2^{4}\\cdot 11}=2\\sqrt[4]{11}$'), answer: { expected: n(2) } },
            { id: 25, difficulty: 'medium', question: howMuch('$2\\sqrt[3]{5}=\\sqrt[3]{n}$', 'n'), solution: same('$\\sqrt[3]{2^{3}\\cdot 5}=\\sqrt[3]{40}$'), answer: { expected: n(40) } },
            { id: 26, difficulty: 'medium', question: howMuch('$\\sqrt{2}\\,(\\sqrt{3}-\\sqrt{2})=\\sqrt{6}-a$'), solution: same('$\\sqrt{6}-\\sqrt{4}=\\sqrt{6}-2$'), answer: { expected: n(2) } },
            { id: 27, difficulty: 'medium', question: howMuch('$\\sqrt[3]{81}:\\sqrt[5]{3}:\\sqrt{27}=3^{\\frac{p}{30}}$', 'p'), solution: same('$3^{\\frac{4}{3}-\\frac{1}{5}-\\frac{3}{2}}=3^{-\\frac{11}{30}}\\qquad p=-11$'), answer: { expected: n(-11) } },
            { id: 28, difficulty: 'hard', question: howMuch('$(\\sqrt[3]{\\sqrt{10}})^{4}=\\sqrt[3]{10^{m}}$', 'm'), solution: same('$10^{\\frac{4}{6}}=10^{\\frac{2}{3}}=\\sqrt[3]{10^{2}}$'), answer: { expected: n(2) } },
            { id: 29, difficulty: 'hard', question: howMuch('$\\sqrt{3}\\left(3\\sqrt{2}+\\frac{2\\sqrt{2}}{5}\\right)=\\frac{a}{5}\\sqrt{6}$'), solution: same('$\\sqrt{3}\\left(3+\\frac{2}{5}\\right)\\sqrt{2}=\\frac{17}{5}\\sqrt{6}$'), answer: { expected: n(17) } },
            { id: 30, difficulty: 'hard', question: howMuch('$\\sqrt[6]{(\\sqrt{15})^{3}:(\\sqrt{5})^{3}}=\\sqrt[4]{n}$', 'n'), solution: same('$\\sqrt[6]{3^{\\frac{3}{2}}}=3^{\\frac{3}{12}}=\\sqrt[4]{3}$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'rationalize',
        title: say('Arrazionalizatzea', 'Racionalizar', 'إنطاق المقام'),
        items: [
            { id: 31, difficulty: 'easy', question: howMuch('$\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{a}$'), solution: same('$\\frac{\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$'), answer: { expected: n(2) } },
            { id: 32, difficulty: 'easy', question: howMuch('$\\frac{6}{\\sqrt{2}}=a\\sqrt{2}$'), solution: same('$\\frac{6\\sqrt{2}}{2}=3\\sqrt{2}$'), answer: { expected: n(3) } },
            { id: 33, difficulty: 'easy', question: howMuch('$\\frac{\\sqrt{5}-4}{\\sqrt{6}}=\\frac{\\sqrt{30}-4\\sqrt{6}}{n}$', 'n'), solution: same('$\\frac{(\\sqrt{5}-4)\\sqrt{6}}{6}=\\frac{\\sqrt{30}-4\\sqrt{6}}{6}$'), answer: { expected: n(6) } },
            { id: 34, difficulty: 'medium', question: howMuch('$\\frac{8}{3\\sqrt[4]{8}}=\\frac{4\\sqrt[4]{2}}{a}$'), solution: same('$\\frac{8\\sqrt[4]{2}}{3\\cdot 2}=\\frac{4\\sqrt[4]{2}}{3}$'), answer: { expected: n(3) } },
            { id: 35, difficulty: 'medium', question: howMuch('$\\frac{1}{\\sqrt[3]{9}}=\\frac{\\sqrt[3]{3}}{a}$'), solution: same('$\\frac{\\sqrt[3]{3}}{\\sqrt[3]{3^{3}}}=\\frac{\\sqrt[3]{3}}{3}$'), answer: { expected: n(3) } },
            { id: 36, difficulty: 'medium', question: howMuch('$\\frac{4}{\\sqrt{5}+1}=\\sqrt{5}-a$'), solution: same('$\\frac{4(\\sqrt{5}-1)}{5-1}=\\sqrt{5}-1$'), answer: { expected: n(1) } },
            { id: 37, difficulty: 'medium', question: howMuch('$\\frac{\\sqrt{3}}{\\sqrt{3}+\\sqrt{2}}=a-\\sqrt{6}$'), solution: same('$\\frac{\\sqrt{3}(\\sqrt{3}-\\sqrt{2})}{3-2}=3-\\sqrt{6}$'), answer: { expected: n(3) } },
            { id: 38, difficulty: 'hard', question: howMuch('$\\frac{5}{2\\sqrt{3}-\\sqrt{2}}=\\frac{2\\sqrt{3}+\\sqrt{2}}{a}$'), solution: same('$\\frac{5(2\\sqrt{3}+\\sqrt{2})}{12-2}=\\frac{2\\sqrt{3}+\\sqrt{2}}{2}$'), answer: { expected: n(2) } },
            { id: 39, difficulty: 'hard', question: howMuch('$\\frac{-\\sqrt{10}}{2\\sqrt{2}+\\sqrt{6}}=-2\\sqrt{5}+\\sqrt{n}$', 'n'), solution: same('$\\frac{-\\sqrt{10}(2\\sqrt{2}-\\sqrt{6})}{8-6}=\\frac{-4\\sqrt{5}+2\\sqrt{15}}{2}=-2\\sqrt{5}+\\sqrt{15}$'), answer: { expected: n(15) } },
            { id: 40, difficulty: 'hard', question: howMuch('$\\frac{4}{\\sqrt{3}-5\\sqrt{7}}=\\frac{-\\sqrt{3}-5\\sqrt{7}}{n}$', 'n'), solution: same('$\\frac{4(\\sqrt{3}+5\\sqrt{7})}{3-175}=\\frac{-\\sqrt{3}-5\\sqrt{7}}{43}$'), answer: { expected: n(43) } }
        ]
    },
    {
        id: 'logarithms',
        title: say('Logaritmoak', 'Logaritmos', 'اللوغاريتمات'),
        items: [
            { id: 41, difficulty: 'easy', question: calc('$\\log_7 49$'), solution: same('$7^{2}=49$'), answer: { expected: n(2) } },
            { id: 42, difficulty: 'easy', question: calc('$\\log 10\\,000$'), solution: same('$10^{4}=10\\,000$'), answer: { expected: n(4) } },
            { id: 43, difficulty: 'easy', question: calc('$\\log_2 0{,}0625$'), solution: same('$2^{-4}=\\frac{1}{16}=0{,}0625$'), answer: { expected: n(-4) } },
            { id: 44, difficulty: 'easy', question: calc('$\\ln e^{3}$'), solution: say('$\\ln$-ren oinarria $e$ da: $\\ln e^{3}=3$.', 'La base de $\\ln$ es $e$: $\\ln e^{3}=3$.', 'أساس $\\ln$ هو $e$: $\\ln e^{3}=3$.'), answer: { expected: n(3) } },
            { id: 45, difficulty: 'medium', question: howMuch('$\\log_d 3=\\frac{1}{2}$', 'd'), solution: same('$d^{\\frac{1}{2}}=3\\to d=9$'), answer: { expected: n(9) } },
            { id: 46, difficulty: 'medium', question: with_(howMuch('$\\log_x \\frac{4}{9}=2$', 'x'), AS_FRACTION), solution: same('$x^{2}=\\frac{4}{9}=\\frac{2^{2}}{3^{2}}\\to x=\\frac{2}{3}$'), answer: { expected: f(2, 3) } },
            { id: 47, difficulty: 'medium', question: calc('$\\log 2+\\log 50$'), solution: same('$\\log(2\\cdot 50)=\\log 100=2$'), answer: { expected: n(2) } },
            { id: 48, difficulty: 'medium', question: howMuch('$3\\log_2 5+\\log_2 7=\\log_2 n$', 'n'), solution: same('$\\log_2(5^{3}\\cdot 7)=\\log_2 875$'), answer: { expected: n(875) } },
            { id: 49, difficulty: 'hard', question: with_(calc('$\\log_3 100$'), HUNDREDTHS), solution: same('$\\frac{\\log 100}{\\log 3}\\approx\\frac{2}{0{,}477}\\approx 4{,}19$'), answer: { expected: v('4,19') } },
            { id: 50, difficulty: 'hard', question: say('Sismografo baten eskalan, intentsitatea 1 igotzean energia 10 aldiz handitzen da. 6ko lurrikara bat 2ko bat baino zenbat aldiz handiagoa da?', 'En la escala de un sismógrafo, al subir la intensidad 1 la energía se multiplica por 10. ¿Cuántas veces mayor es un terremoto de intensidad 6 que uno de intensidad 2?', 'في سلّم مقياس الزلازل، عندما تزيد الشدة 1 تُضرب الطاقة في 10. كم مرة يكون زلزال شدته 6 أكبر من زلزال شدته 2؟'), solution: same('$10^{6-2}=10^{4}=10\\,000$'), answer: { expected: n(10000) } }
        ]
    }
]
