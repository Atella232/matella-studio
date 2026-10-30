import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturak eta erroak · 3. DBH — diagnostic, guided practice, exercise
   bank and challenges, after Santillana 3.º ESO unit 2 and Anaya 3.º ESO
   unit 2 (the books fix the scope and the order; every number and context
   here is original). Every closed answer is a single number or a fraction:
   when the result is a radical or a power of ten, the question asks for
   one of its numbers.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.', 'Give it as a fraction.')
/** A prompt followed by an instruction (rounding, fraction) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    en: [prompt.en, ...rules.map((rule) => rule.en)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})
/** «Formula. How much is a?» in the three languages */
const howMuch = (formula: string, letter = 'a') => say(`${formula}. Zenbat da $${letter}$?`, `${formula}. ¿Cuánto vale $${letter}$?`, `${formula}. كم تساوي $${letter}$؟`, `${formula}. What is the value of $${letter}$?`)
const calc = (formula: string) => say(`Kalkulatu ${formula}.`, `Calcula ${formula}.`, `احسب ${formula}.`, `Work out ${formula}.`)

export const powersDiagnostic: DiagnosticQuestion[] = [
    {
        id: 3601,
        prompt: calc('$-3^{2}$'),
        options: [same('$9$'), same('$-9$'), same('$-6$')],
        correctIndex: 1,
        explanation: say('Berretzaileak oinarriari bakarrik eragiten dio, ez zeinuari: $-3^{2}=-(3\\cdot 3)=-9$. $(-3)^{2}$ izango balitz, $9$ litzateke.', 'El exponente solo afecta al número 3: $-3^{2}=-(3\\cdot 3)=-9$. Con $(-3)^{2}$ saldría $9$.', 'لا يؤثر الأس إلا في العدد 3: $-3^{2}=-(3\\cdot 3)=-9$. ولو كان $(-3)^{2}$ لخرج $9$.', 'The exponent only applies to the number 3: $-3^{2}=-(3\\cdot 3)=-9$. With $(-3)^{2}$ you would get $9$.'),
        topic: 'power-sign'
    },
    {
        id: 3602,
        prompt: calc('$\\left(\\frac{1}{2}\\right)^{-3}$'),
        options: [same('$8$'), same('$\\frac{1}{8}$'), same('$-8$')],
        correctIndex: 0,
        explanation: say('Berretzaile negatiboa: buelta eman zatikiari. $\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$.', 'Exponente negativo: se da la vuelta a la fracción. $\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$.', 'الأس السالب: نقلب الكسر. $\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$.', 'Negative exponent: turn the fraction upside down. $\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$.'),
        topic: 'negative-zero'
    },
    {
        id: 3603,
        prompt: calc('$3^{5}\\cdot 3^{-2}$'),
        options: [same('$3^{7}$'), same('$3^{-10}$'), same('$3^{3}$')],
        correctIndex: 2,
        explanation: say('Oinarri bera: berretzaileak batu, $5+(-2)=3$.', 'Misma base: se suman los exponentes, $5+(-2)=3$.', 'الأساس نفسه: نجمع الأسين، $5+(-2)=3$.', 'Same base: add the exponents, $5+(-2)=3$.'),
        topic: 'power-rules'
    },
    {
        id: 3604,
        prompt: say('Nola idazten da $0{,}000\\,072$ idazkera zientifikoan?', '¿Cómo se escribe $0{,}000\\,072$ en notación científica?', 'كيف يُكتب $0{,}000\\,072$ بالترميز العلمي؟', 'How do you write $0{,}000\\,072$ in scientific notation?'),
        options: [same('$72\\cdot 10^{-6}$'), same('$7{,}2\\cdot 10^{-5}$'), same('$7{,}2\\cdot 10^{5}$')],
        correctIndex: 1,
        explanation: say('Komaren aurretik zifra bakarra, 0 ez dena: 5 jauzi eskuinera, berretzaile negatiboa.', 'Una sola cifra distinta de 0 delante de la coma: 5 saltos a la derecha, exponente negativo.', 'رقم واحد غير صفر قبل الفاصلة: 5 قفزات إلى اليمين، أس سالب.', 'Only one non-zero digit in front of the decimal point: 5 places to the right, negative exponent.'),
        topic: 'sci-write'
    },
    {
        id: 3605,
        prompt: say('Idazkera zientifikoan, zenbat da $(4\\cdot 10^{6})(5\\cdot 10^{3})$?', 'En notación científica, ¿cuánto es $(4\\cdot 10^{6})(5\\cdot 10^{3})$?', 'بالترميز العلمي، كم يساوي $(4\\cdot 10^{6})(5\\cdot 10^{3})$؟', 'In scientific notation, what is $(4\\cdot 10^{6})(5\\cdot 10^{3})$?'),
        options: [same('$2\\cdot 10^{10}$'), same('$2\\cdot 10^{9}$'), same('$9\\cdot 10^{9}$')],
        correctIndex: 0,
        explanation: say('$4\\cdot 5=20$ eta $6+3=9$: $20\\cdot 10^{9}=2\\cdot 10^{10}$.', '$4\\cdot 5=20$ y $6+3=9$: $20\\cdot 10^{9}=2\\cdot 10^{10}$.', '$4\\cdot 5=20$ و$6+3=9$: $20\\cdot 10^{9}=2\\cdot 10^{10}$.', '$4\\cdot 5=20$ and $6+3=9$: $20\\cdot 10^{9}=2\\cdot 10^{10}$.'),
        topic: 'sci-ops'
    },
    {
        id: 3606,
        prompt: calc('$\\sqrt{50}$'),
        options: [same('$25\\sqrt{2}$'), same('$10\\sqrt{5}$'), same('$5\\sqrt{2}$')],
        correctIndex: 2,
        explanation: say('$50=5^{2}\\cdot 2$, beraz $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$, así que $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$ إذن $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$, so $\\sqrt{50}=5\\sqrt{2}$.'),
        topic: 'extract'
    },
    {
        id: 3607,
        prompt: say('Zein da zenbaki irrazionala?', '¿Cuál es un número irracional?', 'أي عدد غير نسبي؟', 'Which is an irrational number?'),
        options: [same('$\\sqrt{49}$'), same('$\\frac{22}{7}$'), same('$\\sqrt{7}$')],
        correctIndex: 2,
        explanation: say('$\\sqrt{49}=7$ eta $\\frac{22}{7}$ arrazionalak dira. $7$ ez da karratu perfektua: $\\sqrt{7}$ irrazionala da.', '$\\sqrt{49}=7$ y $\\frac{22}{7}$ son racionales. $7$ no es cuadrado perfecto: $\\sqrt{7}$ es irracional.', '$\\sqrt{49}=7$ و$\\frac{22}{7}$ نسبيان. العدد $7$ ليس مربعًا كاملًا: $\\sqrt{7}$ غير نسبي.', '$\\sqrt{49}=7$ and $\\frac{22}{7}$ are rational. $7$ is not a perfect square: $\\sqrt{7}$ is irrational.'),
        topic: 'irrational'
    },
    {
        id: 3608,
        prompt: say('Biribildu $3{,}4567$ ehunenetara.', 'Redondea $3{,}4567$ a las centésimas.', 'قرّب $3{,}4567$ إلى الأجزاء من مئة.', 'Round $3{,}4567$ to the nearest hundredth.'),
        options: [same('$3{,}45$'), same('$3{,}457$'), same('$3{,}46$')],
        correctIndex: 2,
        explanation: say('Kendu den lehen zifra $6$ da, $5$ baino handiagoa: ehunenekoari $1$ gehitu, $3{,}46$.', 'La primera cifra suprimida es $6$, mayor que $5$: se suma $1$ a las centésimas, $3{,}46$.', 'أول رقم محذوف هو $6$ أكبر من $5$: نضيف $1$ إلى الأجزاء من مئة فنحصل على $3{,}46$.', 'The first digit dropped is $6$, bigger than $5$: add $1$ to the hundredths, $3{,}46$.'),
        topic: 'rounding'
    }
]

export const powersPractice: PracticeItem[] = [
    /* ---------- Powers ---------- */
    { id: 1, stage: 'powers', prompt: calc('$-5^{2}$'), expected: n(-25), hint: say('Berretzaileak oinarriari bakarrik eragiten dio.', 'El exponente solo afecta a la base.', 'الأس يؤثر في الأساس فقط.', 'The exponent only applies to the base.'), explanation: same('$-5^{2}=-(5\\cdot 5)=-25$') },
    { id: 2, stage: 'powers', prompt: with_(calc('$(-2)^{-3}$'), AS_FRACTION), expected: f(-1, 8), hint: say('Berretzaile negatiboa: alderantzizkoa. Bakoitia: negatiboa.', 'Exponente negativo: el inverso. Impar: negativo.', 'أس سالب: المقلوب. وفردي: سالب.', 'Negative exponent: the reciprocal. Odd exponent: negative.'), explanation: same('$\\frac{1}{(-2)^{3}}=-\\frac{1}{8}$') },
    { id: 3, stage: 'powers', prompt: with_(calc('$\\left(\\frac{5}{3}\\right)^{-2}$'), AS_FRACTION), expected: f(9, 25), hint: say('Buelta eman zatikiari.', 'Da la vuelta a la fracción.', 'اقلب الكسر.', 'Turn the fraction upside down.'), explanation: same('$\\left(\\frac{3}{5}\\right)^{2}=\\frac{9}{25}$') },
    { id: 4, stage: 'powers', prompt: calc('$\\frac{5^{4}\\cdot 5^{-6}}{5^{-3}}$'), expected: n(5), hint: say('Batu goiko berretzaileak eta kendu behekoa.', 'Suma los exponentes de arriba y resta el de abajo.', 'اجمع أسس البسط واطرح أس المقام.', 'Add the exponents on top and subtract the one on the bottom.'), explanation: same('$5^{4-6+3}=5^{1}=5$') },

    /* ---------- Scientific notation ---------- */
    { id: 5, stage: 'scientific', prompt: howMuch('$4\\,500\\,000=4{,}5\\cdot 10^{n}$', 'n'), expected: n(6), hint: say('Zenbatu komaren jauziak ezkerrera.', 'Cuenta los saltos de la coma a la izquierda.', 'عدّ قفزات الفاصلة نحو اليسار.', 'Count how many places the decimal point moves to the left.'), explanation: same('$4\\,500\\,000=4{,}5\\cdot 10^{6}$') },
    { id: 6, stage: 'scientific', prompt: howMuch('$0{,}00032=3{,}2\\cdot 10^{n}$', 'n'), expected: n(-4), hint: say('Koma eskuinera mugitzen da: berretzaile negatiboa.', 'La coma se mueve a la derecha: exponente negativo.', 'الفاصلة تتحرك نحو اليمين: أس سالب.', 'The decimal point moves to the right: negative exponent.'), explanation: same('$0{,}00032=3{,}2\\cdot 10^{-4}$') },
    { id: 7, stage: 'scientific', prompt: howMuch('$(2\\cdot 10^{5})(3\\cdot 10^{-2})=a\\cdot 10^{3}$'), expected: n(6), hint: say('Biderkatu zenbakiak eta batu berretzaileak.', 'Multiplica los números y suma los exponentes.', 'اضرب العددين واجمع الأسين.', 'Multiply the numbers and add the exponents.'), explanation: same('$6\\cdot 10^{5-2}=6\\cdot 10^{3}$') },
    { id: 8, stage: 'scientific', prompt: howMuch('$3{,}2\\cdot 10^{4}+8\\cdot 10^{3}=a\\cdot 10^{4}$'), expected: n(4), hint: say('Idatzi $8\\cdot 10^{3}=0{,}8\\cdot 10^{4}$.', 'Escribe $8\\cdot 10^{3}=0{,}8\\cdot 10^{4}$.', 'اكتب $8\\cdot 10^{3}=0{,}8\\cdot 10^{4}$.', 'Write $8\\cdot 10^{3}=0{,}8\\cdot 10^{4}$.'), explanation: same('$(3{,}2+0{,}8)\\cdot 10^{4}=4\\cdot 10^{4}$') },

    /* ---------- Roots and radicals ---------- */
    { id: 9, stage: 'roots', prompt: calc('$\\sqrt{169}$'), expected: n(13), hint: say('Zer zenbaki karratura jasota 169 da?', '¿Qué número al cuadrado da 169?', 'أي عدد مربعه 169؟', 'What number squared gives 169?'), explanation: same('$13^{2}=169$') },
    { id: 10, stage: 'roots', prompt: howMuch('$\\sqrt{72}=a\\sqrt{2}$'), expected: n(6), hint: say('$72=2^{3}\\cdot 3^{2}$.', '$72=2^{3}\\cdot 3^{2}$.', '$72=2^{3}\\cdot 3^{2}$.', '$72=2^{3}\\cdot 3^{2}$.'), explanation: same('$\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=6\\sqrt{2}$') },
    { id: 11, stage: 'roots', prompt: howMuch('$3\\sqrt{5}=\\sqrt{n}$', 'n'), expected: n(45), hint: say('Jaso $3$ karratura eta biderkatu errokizunarekin.', 'Eleva 3 al cuadrado y multiplica por 5.', 'ارفع 3 إلى التربيع واضرب في 5.', 'Square 3 and multiply by 5.'), explanation: same('$3\\sqrt{5}=\\sqrt{9\\cdot 5}=\\sqrt{45}$') },
    { id: 12, stage: 'roots', prompt: howMuch('$5\\sqrt{3}-2\\sqrt{3}+\\sqrt{3}=a\\sqrt{3}$'), expected: n(4), hint: say('Antzekoak dira: batu koefizienteak.', 'Son semejantes: suma los coeficientes.', 'متشابهة: اجمع المعاملات.', 'They are like terms: add the coefficients.'), explanation: same('$(5-2+1)\\sqrt{3}=4\\sqrt{3}$') },

    /* ---------- Real numbers ---------- */
    { id: 13, stage: 'reals', prompt: say('Hauetako zenbat dira irrazionalak: $\\sqrt{9}$, $\\sqrt{10}$, $\\pi$, $0{,}25$, $\\frac{1}{3}$, $\\sqrt{2}$?', '¿Cuántos de estos son irracionales: $\\sqrt{9}$, $\\sqrt{10}$, $\\pi$, $0{,}25$, $\\frac{1}{3}$, $\\sqrt{2}$?', 'كم من هذه الأعداد غير نسبي: $\\sqrt{9}$ و$\\sqrt{10}$ و$\\pi$ و$0{,}25$ و$\\frac{1}{3}$ و$\\sqrt{2}$؟', 'How many of these are irrational: $\\sqrt{9}$, $\\sqrt{10}$, $\\pi$, $0{,}25$, $\\frac{1}{3}$, $\\sqrt{2}$?'), expected: n(3), hint: say('$\\sqrt{9}=3$, $0{,}25=\\frac{1}{4}$.', '$\\sqrt{9}=3$, $0{,}25=\\frac{1}{4}$.', '$\\sqrt{9}=3$ و$0{,}25=\\frac{1}{4}$.', '$\\sqrt{9}=3$, $0{,}25=\\frac{1}{4}$.'), explanation: say('$\\sqrt{10}$, $\\pi$ eta $\\sqrt{2}$ dira irrazionalak: 3.', 'Son irracionales $\\sqrt{10}$, $\\pi$ y $\\sqrt{2}$: 3.', 'غير النسبية هي $\\sqrt{10}$ و$\\pi$ و$\\sqrt{2}$: 3.', '$\\sqrt{10}$, $\\pi$ and $\\sqrt{2}$ are irrational: 3.') },
    { id: 14, stage: 'reals', prompt: say('$\\sqrt{40}$ bi zenbaki osoren artean dago: $n<\\sqrt{40}<n+1$. Zenbat da $n$?', '$\\sqrt{40}$ está entre dos enteros consecutivos: $n<\\sqrt{40}<n+1$. ¿Cuánto vale $n$?', '$\\sqrt{40}$ بين عددين صحيحين متتاليين: $n<\\sqrt{40}<n+1$. كم يساوي $n$؟', '$\\sqrt{40}$ is between two consecutive integers: $n<\\sqrt{40}<n+1$. What is $n$?'), expected: n(6), hint: say('$6^{2}=36$ eta $7^{2}=49$.', '$6^{2}=36$ y $7^{2}=49$.', '$6^{2}=36$ و$7^{2}=49$.', '$6^{2}=36$ and $7^{2}=49$.'), explanation: same('$36<40<49\\to 6<\\sqrt{40}<7$') },
    { id: 15, stage: 'reals', prompt: say('Zenbat zenbaki oso daude $[-2,\\,5)$ tartean?', '¿Cuántos números enteros hay en el intervalo $[-2,\\,5)$?', 'كم عددًا صحيحًا في الفترة $[-2,\\,5)$؟', 'How many integers are there in the interval $[-2,\\,5)$?'), expected: n(7), hint: say('$-2$ sartzen da, $5$ ez.', 'El $-2$ entra, el $5$ no.', 'العدد $-2$ داخل و$5$ ليس داخلًا.', '$-2$ is included, $5$ is not.'), explanation: same('$-2,\\,-1,\\,0,\\,1,\\,2,\\,3,\\,4\\to 7$') },
    { id: 16, stage: 'reals', prompt: say('Zenbat da $[-3,\\,4{,}5]$ tartearen luzera?', '¿Cuánto mide la longitud del intervalo $[-3,\\,4{,}5]$?', 'كم طول الفترة $[-3,\\,4{,}5]$؟', 'What is the length of the interval $[-3,\\,4{,}5]$?'), expected: v('7,5'), hint: say('Luzera: $b-a$.', 'Longitud: $b-a$.', 'الطول: $b-a$.', 'Length: $b-a$.'), explanation: same('$4{,}5-(-3)=7{,}5$') },

    /* ---------- Approximations and error ---------- */
    { id: 17, stage: 'approx', prompt: say('Biribildu $5{,}6382$ ehunenetara.', 'Redondea $5{,}6382$ a las centésimas.', 'قرّب $5{,}6382$ إلى الأجزاء من مئة.', 'Round $5{,}6382$ to the nearest hundredth.'), expected: v('5,64'), hint: say('Kendu den lehen zifra $8$ da.', 'La primera cifra suprimida es $8$.', 'أول رقم محذوف هو $8$.', 'The first digit dropped is $8$.'), explanation: same('$5{,}6382\\approx 5{,}64$') },
    { id: 18, stage: 'approx', prompt: say('Trunkatu $7{,}8999$ ehunenetara.', 'Trunca $7{,}8999$ a las centésimas.', 'ابتر $7{,}8999$ إلى الأجزاء من مئة.', 'Truncate $7{,}8999$ to the hundredths.'), expected: v('7,89'), hint: say('Trunkatzea mozteko da, ez gehitzeko.', 'Truncar es cortar, no sumar.', 'البتر هو القطع لا الإضافة.', 'Truncating means cutting off, not adding.'), explanation: same('$7{,}8999\\to 7{,}89$') },
    { id: 19, stage: 'approx', prompt: say('$2{,}47$ hamarrenetara biribiltzen da, $2{,}5$. Zenbat da errore absolutua?', 'Se redondea $2{,}47$ a las décimas: $2{,}5$. ¿Cuánto es el error absoluto?', 'قُرّب $2{,}47$ إلى الأعشار فصار $2{,}5$. كم الخطأ المطلق؟', '$2{,}47$ is rounded to the nearest tenth: $2{,}5$. What is the absolute error?'), expected: v('0,03'), hint: say('Kendu bi zenbakiak: balio absolutua.', 'Resta los dos números: valor absoluto.', 'اطرح العددين: القيمة المطلقة.', 'Subtract the two numbers and take the absolute value.'), explanation: same('$|2{,}47-2{,}5|=0{,}03$') },
    { id: 20, stage: 'approx', prompt: say('Neurketa zehatza $50$ da eta neurtutakoa $48$. Zenbat da errore erlatiboa (hamartarra)?', 'El valor exacto es $50$ y se midió $48$. ¿Cuánto es el error relativo (decimal)?', 'القيمة الصحيحة $50$ والمقيسة $48$. كم الخطأ النسبي (عشريًا)؟', 'The exact value is $50$ and the measured value is $48$. What is the relative error (as a decimal)?'), expected: v('0,04'), hint: say('Errore absolutua zatitu zenbaki zehatzaz.', 'Divide el error absoluto entre el valor exacto.', 'اقسم الخطأ المطلق على القيمة الصحيحة.', 'Divide the absolute error by the exact value.'), explanation: same('$\\frac{|50-48|}{50}=\\frac{2}{50}=0{,}04$') }
]

export const powersChallenges: ChallengeItem[] = [
    { id: 101, stage: 'powers', points: 10, context: 'starter', prompt: calc('$(-2)^{4}\\cdot(-2)^{-2}$'), expected: n(4), hint: say('Oinarri bera: batu berretzaileak.', 'Misma base: suma los exponentes.', 'الأساس نفسه: اجمع الأسس.', 'Same base: add the exponents.'), explanation: same('$(-2)^{2}=4$') },
    { id: 102, stage: 'powers', points: 20, context: 'advanced', prompt: howMuch('$3^{x}=\\frac{81^{2}}{27}$', 'x'), expected: n(5), hint: say('Idatzi dena $3$ oinarriko berreturen bidez: $81=3^{4}$, $27=3^{3}$.', 'Escríbelo todo con potencias de 3: $81=3^{4}$, $27=3^{3}$.', 'اكتب كل شيء قوى للعدد 3: $81=3^{4}$ و$27=3^{3}$.', 'Write everything as powers of 3: $81=3^{4}$, $27=3^{3}$.'), explanation: same('$\\frac{3^{8}}{3^{3}}=3^{5}$') },
    { id: 103, stage: 'powers', points: 30, context: 'master', prompt: say('Laborategi batean bakterio-kultibo bat orduro bikoizten da, eta orain $640$ bakterio daude. Zenbat zeuden duela $4$ ordu?', 'En un laboratorio un cultivo de bacterias se duplica cada hora y ahora hay $640$. ¿Cuántas había hace $4$ horas?', 'في مختبر يتضاعف مزرعة بكتيريا كل ساعة وفيها الآن $640$. كم كان عددها قبل $4$ ساعات؟', 'In a lab, a culture of bacteria doubles every hour, and there are now $640$. How many were there $4$ hours ago?'), expected: n(40), hint: say('Duela 4 ordu: zatitu $2^{4}$ berreturaz.', 'Hace 4 horas: divide entre $2^{4}$.', 'قبل 4 ساعات: اقسم على $2^{4}$.', '4 hours ago: divide by $2^{4}$.'), explanation: same('$640\\cdot 2^{-4}=\\frac{640}{16}=40$') },
    { id: 104, stage: 'scientific', points: 10, context: 'starter', prompt: howMuch('$(5\\cdot 10^{-3})(4\\cdot 10^{7})=a\\cdot 10^{5}$'), expected: n(2), hint: say('$5\\cdot 4=20=2\\cdot 10$.', '$5\\cdot 4=20=2\\cdot 10$.', '$5\\cdot 4=20=2\\cdot 10$.', '$5\\cdot 4=20=2\\cdot 10$.'), explanation: same('$20\\cdot 10^{4}=2\\cdot 10^{5}$') },
    { id: 105, stage: 'scientific', points: 20, context: 'advanced', prompt: howMuch('$\\frac{6\\cdot 10^{8}}{3\\cdot 10^{-4}}=a\\cdot 10^{12}$'), expected: n(2), hint: say('Zatitu zenbakiak eta kendu berretzaileak.', 'Divide los números y resta los exponentes.', 'اقسم العددين واطرح الأسين.', 'Divide the numbers and subtract the exponents.'), explanation: same('$2\\cdot 10^{8-(-4)}=2\\cdot 10^{12}$') },
    { id: 106, stage: 'scientific', points: 30, context: 'master', prompt: say('Eguzkitik Jupiterrera $7{,}8\\cdot 10^{8}$ km daude, eta argiak $3\\cdot 10^{5}$ km egiten ditu segundoko. Zenbat segundo behar ditu argiak?', 'Del Sol a Júpiter hay $7{,}8\\cdot 10^{8}$ km, y la luz recorre $3\\cdot 10^{5}$ km por segundo. ¿Cuántos segundos tarda la luz?', 'من الشمس إلى المشتري $7{,}8\\cdot 10^{8}$ كم والضوء يقطع $3\\cdot 10^{5}$ كم في الثانية. كم ثانية يستغرق الضوء؟', 'The distance from the Sun to Jupiter is $7{,}8\\cdot 10^{8}$ km, and light travels $3\\cdot 10^{5}$ km per second. How many seconds does light take?'), expected: n(2600), hint: say('Zatitu distantzia abiaduraz.', 'Divide la distancia entre la velocidad.', 'اقسم المسافة على السرعة.', 'Divide the distance by the speed.'), explanation: same('$\\frac{7{,}8\\cdot 10^{8}}{3\\cdot 10^{5}}=2{,}6\\cdot 10^{3}=2600$ s') },
    { id: 107, stage: 'roots', points: 10, context: 'starter', prompt: calc('$\\sqrt{2^{6}\\cdot 3^{2}}$'), expected: n(24), hint: say('Erroak berretzaileak erdiratzen ditu.', 'La raíz reduce a la mitad los exponentes.', 'الجذر يختزل الأسس إلى النصف.', 'The root halves the exponents.'), explanation: same('$2^{3}\\cdot 3=8\\cdot 3=24$') },
    { id: 108, stage: 'roots', points: 20, context: 'advanced', prompt: howMuch('$\\sqrt{300}=a\\sqrt{3}$'), expected: n(10), hint: say('$300=3\\cdot 100$.', '$300=3\\cdot 100$.', '$300=3\\cdot 100$.', '$300=3\\cdot 100$.'), explanation: same('$\\sqrt{100\\cdot 3}=10\\sqrt{3}$') },
    { id: 109, stage: 'roots', points: 30, context: 'master', prompt: say('Karratu baten azalera $98$ cm² da. Aldearen luzera $a\\sqrt{2}$ cm da. Zenbat da $a$?', 'Un cuadrado tiene área $98$ cm². Su lado mide $a\\sqrt{2}$ cm. ¿Cuánto vale $a$?', 'مربع مساحته $98$ سم². طول ضلعه $a\\sqrt{2}$ سم. كم يساوي $a$؟', 'A square has an area of $98$ cm². Its side is $a\\sqrt{2}$ cm. What is $a$?'), expected: n(7), hint: say('Aldea azalearen erro karratua da.', 'El lado es la raíz cuadrada del área.', 'الضلع هو الجذر التربيعي للمساحة.', 'The side is the square root of the area.'), explanation: same('$\\sqrt{98}=\\sqrt{7^{2}\\cdot 2}=7\\sqrt{2}$') },
    { id: 110, stage: 'reals', points: 10, context: 'starter', prompt: say('$\\sqrt{1},\\,\\sqrt{2},\\,\\sqrt{3},\\ldots,\\sqrt{20}$ erroetatik zenbat dira arrazionalak?', 'De $\\sqrt{1},\\,\\sqrt{2},\\,\\sqrt{3},\\ldots,\\sqrt{20}$, ¿cuántas son racionales?', 'من $\\sqrt{1},\\,\\sqrt{2},\\,\\sqrt{3},\\ldots,\\sqrt{20}$ كم جذرًا نسبيًا؟', 'Of $\\sqrt{1},\\,\\sqrt{2},\\,\\sqrt{3},\\ldots,\\sqrt{20}$, how many are rational?'), expected: n(4), hint: say('Karratu perfektuak: $1,\\,4,\\,9,\\ldots$', 'Cuadrados perfectos: $1,\\,4,\\,9,\\ldots$', 'المربعات الكاملة: $1,\\,4,\\,9,\\ldots$', 'Perfect squares: $1,\\,4,\\,9,\\ldots$'), explanation: same('$\\sqrt{1},\\,\\sqrt{4},\\,\\sqrt{9},\\,\\sqrt{16}\\to 4$') },
    { id: 111, stage: 'reals', points: 20, context: 'advanced', prompt: say('Zenbat zenbaki oso daude $(\\sqrt{5},\\,\\sqrt{50})$ tartean?', '¿Cuántos números enteros hay en el intervalo $(\\sqrt{5},\\,\\sqrt{50})$?', 'كم عددًا صحيحًا في الفترة $(\\sqrt{5},\\,\\sqrt{50})$؟', 'How many integers are there in the interval $(\\sqrt{5},\\,\\sqrt{50})$?'), expected: n(5), hint: say('$\\sqrt{5}\\approx 2{,}2$ eta $\\sqrt{50}\\approx 7{,}1$.', '$\\sqrt{5}\\approx 2{,}2$ y $\\sqrt{50}\\approx 7{,}1$.', '$\\sqrt{5}\\approx 2{,}2$ و$\\sqrt{50}\\approx 7{,}1$.', '$\\sqrt{5}\\approx 2{,}2$ and $\\sqrt{50}\\approx 7{,}1$.'), explanation: same('$3,\\,4,\\,5,\\,6,\\,7\\to 5$') },
    { id: 112, stage: 'reals', points: 30, context: 'master', prompt: say('$[a,\\,6)$ tartearen luzera $8{,}5$ da. Zenbat da $a$?', 'El intervalo $[a,\\,6)$ tiene longitud $8{,}5$. ¿Cuánto vale $a$?', 'طول الفترة $[a,\\,6)$ يساوي $8{,}5$. كم يساوي $a$؟', 'The interval $[a,\\,6)$ has a length of $8{,}5$. What is $a$?'), expected: v('-2,5'), hint: say('$6-a=8{,}5$.', '$6-a=8{,}5$.', '$6-a=8{,}5$.', '$6-a=8{,}5$.'), explanation: same('$a=6-8{,}5=-2{,}5$') },
    { id: 113, stage: 'approx', points: 10, context: 'starter', prompt: say('Biribildu $\\sqrt{2}=1{,}41421\\ldots$ milaenetara.', 'Redondea $\\sqrt{2}=1{,}41421\\ldots$ a las milésimas.', 'قرّب $\\sqrt{2}=1{,}41421\\ldots$ إلى الأجزاء من ألف.', 'Round $\\sqrt{2}=1{,}41421\\ldots$ to the nearest thousandth.'), expected: v('1,414'), hint: say('Kendu den lehen zifra $2$ da.', 'La primera cifra suprimida es $2$.', 'أول رقم محذوف هو $2$.', 'The first digit dropped is $2$.'), explanation: same('$1{,}414$') },
    { id: 114, stage: 'approx', points: 20, context: 'advanced', prompt: say('$3{,}14159$ milaenetara trunkatzen da. Zenbat da errore absolutua?', 'Se trunca $3{,}14159$ a las milésimas. ¿Cuánto es el error absoluto?', 'ابتُر $3{,}14159$ إلى الأجزاء من ألف. كم الخطأ المطلق؟', '$3{,}14159$ is truncated to the thousandths. What is the absolute error?'), expected: v('0,00059'), hint: say('Trunkatuta $3{,}141$ gelditzen da.', 'Truncado queda $3{,}141$.', 'مبتورًا يصبح $3{,}141$.', 'Truncated, it is $3{,}141$.'), explanation: same('$3{,}14159-3{,}141=0{,}00059$') },
    { id: 115, stage: 'approx', points: 30, context: 'master', prompt: say('Zenbaki zehatz bat $80$ da, eta defektuzko hurbilketa batean errore erlatiboa $0{,}025$ da. Zenbat balio du hurbilketak?', 'Un valor exacto es $80$ y se aproxima por defecto con error relativo $0{,}025$. ¿Cuánto vale la aproximación?', 'قيمة صحيحة $80$ قُرّبت بالنقصان بخطأ نسبي $0{,}025$. كم قيمة التقريب؟', 'An exact value is $80$ and it is approximated from below, with a relative error of $0{,}025$. What is the approximation?'), expected: n(78), hint: say('Errore absolutua: $80\\cdot 0{,}025$.', 'El error absoluto es $80\\cdot 0{,}025$.', 'الخطأ المطلق هو $80\\cdot 0{,}025$.', 'The absolute error is $80\\cdot 0{,}025$.'), explanation: same('$E_{a}=80\\cdot 0{,}025=2\\to 80-2=78$') }
]

export const powersExerciseBank: ExerciseSection[] = [
    {
        id: 'powers',
        title: say('Berreturak', 'Potencias', 'القوى', 'Powers'),
        items: [
            { id: 1, difficulty: 'easy', question: calc('$(-3)^{4}$'), solution: same('$(-3)^{4}=81$'), answer: { expected: n(81) } },
            { id: 2, difficulty: 'easy', question: calc('$-3^{4}$'), solution: say('Berretzaileak oinarriari bakarrik eragiten dio, ez zeinuari: $-3^{4}=-81$.', 'El exponente solo afecta al 3: $-3^{4}=-81$.', 'لا يؤثر الأس إلا في 3: $-3^{4}=-81$.', 'The exponent only applies to the 3: $-3^{4}=-81$.'), answer: { expected: n(-81) } },
            { id: 3, difficulty: 'easy', question: with_(calc('$\\left(\\frac{2}{3}\\right)^{3}$'), AS_FRACTION), solution: same('$\\frac{2^{3}}{3^{3}}=\\frac{8}{27}$'), answer: { expected: f(8, 27) } },
            { id: 4, difficulty: 'easy', question: with_(calc('$5^{-2}$'), AS_FRACTION), solution: same('$\\frac{1}{5^{2}}=\\frac{1}{25}$'), answer: { expected: f(1, 25) } },
            { id: 5, difficulty: 'medium', question: calc('$\\left(-\\frac{1}{2}\\right)^{-5}$'), solution: same('$(-2)^{5}=-32$'), answer: { expected: n(-32) } },
            { id: 6, difficulty: 'medium', question: calc('$2^{7}\\cdot 2^{-4}\\cdot 2^{-1}$'), solution: same('$2^{7-4-1}=2^{2}=4$'), answer: { expected: n(4) } },
            { id: 7, difficulty: 'medium', question: calc('$(3^{2})^{-2}\\cdot 3^{5}$'), solution: same('$3^{-4}\\cdot 3^{5}=3^{1}=3$'), answer: { expected: n(3) } },
            { id: 8, difficulty: 'medium', question: calc('$\\frac{6^{3}}{2^{3}}$'), solution: same('$\\left(\\frac{6}{2}\\right)^{3}=3^{3}=27$'), answer: { expected: n(27) } },
            { id: 9, difficulty: 'hard', question: calc('$\\frac{12^{3}\\cdot 9^{-1}}{8\\cdot 3^{-2}}$'), solution: same('$\\frac{2^{6}\\cdot 3^{3}\\cdot 3^{-2}}{2^{3}\\cdot 3^{-2}}=2^{3}\\cdot 3^{3}=216$'), answer: { expected: n(216) } },
            { id: 10, difficulty: 'hard', question: say('$2^{20}$ zenbat aldiz da $2^{17}$ baino handiagoa?', '¿Cuántas veces es mayor $2^{20}$ que $2^{17}$?', 'كم مرة $2^{20}$ أكبر من $2^{17}$؟', 'How many times bigger is $2^{20}$ than $2^{17}$?'), solution: same('$\\frac{2^{20}}{2^{17}}=2^{3}=8$'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'scientific',
        title: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
        items: [
            { id: 11, difficulty: 'easy', question: howMuch('$340\\,000\\,000=3{,}4\\cdot 10^{n}$', 'n'), solution: same('$340\\,000\\,000=3{,}4\\cdot 10^{8}$'), answer: { expected: n(8) } },
            { id: 12, difficulty: 'easy', question: howMuch('$0{,}0000092=9{,}2\\cdot 10^{n}$', 'n'), solution: same('$0{,}0000092=9{,}2\\cdot 10^{-6}$'), answer: { expected: n(-6) } },
            { id: 13, difficulty: 'easy', question: say('Idatzi $5{,}3\\cdot 10^{4}$ zenbaki arrunt gisa.', 'Escribe $5{,}3\\cdot 10^{4}$ como número ordinario.', 'اكتب $5{,}3\\cdot 10^{4}$ عددًا عاديًا.', 'Write $5{,}3\\cdot 10^{4}$ as an ordinary number.'), solution: same('$5{,}3\\cdot 10^{4}=53\\,000$'), answer: { expected: n(53000) } },
            { id: 14, difficulty: 'easy', question: say('Idatzi $6\\cdot 10^{-3}$ zenbaki hamartar gisa.', 'Escribe $6\\cdot 10^{-3}$ como número decimal.', 'اكتب $6\\cdot 10^{-3}$ عددًا عشريًا.', 'Write $6\\cdot 10^{-3}$ as a decimal number.'), solution: same('$6\\cdot 10^{-3}=0{,}006$'), answer: { expected: v('0,006') } },
            { id: 15, difficulty: 'medium', question: howMuch('$(1{,}5\\cdot 10^{6})(4\\cdot 10^{3})=a\\cdot 10^{9}$'), solution: same('$1{,}5\\cdot 4=6\\to 6\\cdot 10^{9}$'), answer: { expected: n(6) } },
            { id: 16, difficulty: 'medium', question: howMuch('$\\frac{9\\cdot 10^{8}}{3\\cdot 10^{-2}}=a\\cdot 10^{10}$'), solution: same('$3\\cdot 10^{8-(-2)}=3\\cdot 10^{10}$'), answer: { expected: n(3) } },
            { id: 17, difficulty: 'medium', question: howMuch('$6{,}3\\cdot 10^{6}-8\\cdot 10^{5}=a\\cdot 10^{6}$'), solution: same('$6{,}3\\cdot 10^{6}-0{,}8\\cdot 10^{6}=5{,}5\\cdot 10^{6}$'), answer: { expected: v('5,5') } },
            { id: 18, difficulty: 'medium', question: say('Birus batek $2{,}5\\cdot 10^{-7}$ m neurtzen du. Zenbat birus sartzen dira milimetro batean ($10^{-3}$ m)? Erantzuna $a\\cdot 10^{3}$ da; eman $a$.', 'Un virus mide $2{,}5\\cdot 10^{-7}$ m. ¿Cuántos caben en un milímetro ($10^{-3}$ m)? La respuesta es $a\\cdot 10^{3}$; da $a$.', 'يبلغ طول فيروس $2{,}5\\cdot 10^{-7}$ م. كم فيروسًا يتسع في ملّيمتر ($10^{-3}$ م)؟ الجواب $a\\cdot 10^{3}$؛ أعطِ $a$.', 'A virus is $2{,}5\\cdot 10^{-7}$ m long. How many fit in one millimetre ($10^{-3}$ m)? The answer is $a\\cdot 10^{3}$; give $a$.'), solution: same('$\\frac{10^{-3}}{2{,}5\\cdot 10^{-7}}=0{,}4\\cdot 10^{4}=4\\cdot 10^{3}$'), answer: { expected: n(4) } },
            { id: 19, difficulty: 'hard', question: howMuch('$\\frac{(2{,}4\\cdot 10^{-3})(5\\cdot 10^{8})}{6\\cdot 10^{2}}=a\\cdot 10^{3}$'), solution: same('$\\frac{12\\cdot 10^{5}}{6\\cdot 10^{2}}=2\\cdot 10^{3}$'), answer: { expected: n(2) } },
            { id: 20, difficulty: 'hard', question: say('Galaxia batek $2\\cdot 10^{11}$ izar ditu, eta bakoitzak $2\\cdot 10^{30}$ kg pisatzen ditu. Masa osoa $a\\cdot 10^{41}$ kg da; eman $a$.', 'Una galaxia tiene $2\\cdot 10^{11}$ estrellas y cada una pesa $2\\cdot 10^{30}$ kg. La masa total es $a\\cdot 10^{41}$ kg; da $a$.', 'في مجرة $2\\cdot 10^{11}$ نجمة ووزن كل نجمة $2\\cdot 10^{30}$ كغ. الكتلة الكلية $a\\cdot 10^{41}$ كغ؛ أعطِ $a$.', 'A galaxy has $2\\cdot 10^{11}$ stars and each one weighs $2\\cdot 10^{30}$ kg. The total mass is $a\\cdot 10^{41}$ kg; give $a$.'), solution: same('$2\\cdot 2\\cdot 10^{11+30}=4\\cdot 10^{41}$'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'roots',
        title: say('Erroak eta erradikalak', 'Raíces y radicales', 'الجذور والجذريات', 'Roots and radicals'),
        items: [
            { id: 21, difficulty: 'easy', question: calc('$\\sqrt{225}$'), solution: same('$15^{2}=225$'), answer: { expected: n(15) } },
            { id: 22, difficulty: 'easy', question: calc('$\\sqrt{0{,}49}$'), solution: same('$0{,}7^{2}=0{,}49$'), answer: { expected: v('0,7') } },
            { id: 23, difficulty: 'easy', question: calc('$\\sqrt[3]{-8}$'), solution: same('$(-2)^{3}=-8$'), answer: { expected: n(-2) } },
            { id: 24, difficulty: 'easy', question: howMuch('$\\sqrt{20}=a\\sqrt{5}$'), solution: same('$\\sqrt{2^{2}\\cdot 5}=2\\sqrt{5}$'), answer: { expected: n(2) } },
            { id: 25, difficulty: 'medium', question: howMuch('$\\sqrt{8}+\\sqrt{18}=a\\sqrt{2}$'), solution: same('$2\\sqrt{2}+3\\sqrt{2}=5\\sqrt{2}$'), answer: { expected: n(5) } },
            { id: 26, difficulty: 'medium', question: howMuch('$\\sqrt{75}-\\sqrt{12}=a\\sqrt{3}$'), solution: same('$5\\sqrt{3}-2\\sqrt{3}=3\\sqrt{3}$'), answer: { expected: n(3) } },
            { id: 27, difficulty: 'medium', question: calc('$\\sqrt{2}\\cdot\\sqrt{18}$'), solution: same('$\\sqrt{36}=6$'), answer: { expected: n(6) } },
            { id: 28, difficulty: 'medium', question: howMuch('$5\\sqrt{2}=\\sqrt{n}$', 'n'), solution: same('$5\\sqrt{2}=\\sqrt{25\\cdot 2}=\\sqrt{50}$'), answer: { expected: n(50) } },
            { id: 29, difficulty: 'hard', question: howMuch('$\\sqrt{12}\\cdot\\sqrt{6}=a\\sqrt{2}$'), solution: same('$\\sqrt{72}=6\\sqrt{2}$'), answer: { expected: n(6) } },
            { id: 30, difficulty: 'hard', question: howMuch('$\\sqrt{45}+\\sqrt{20}-\\sqrt{5}=a\\sqrt{5}$'), solution: same('$3\\sqrt{5}+2\\sqrt{5}-\\sqrt{5}=4\\sqrt{5}$'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'reals',
        title: say('Zenbaki errealak', 'Números reales', 'الأعداد الحقيقية', 'Real numbers'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Hauetako zenbat dira arrazionalak: $3{,}14$, $\\pi$, $\\sqrt{16}$, $0{,}\\overline{3}$, $\\sqrt{3}$?', '¿Cuántos de estos son racionales: $3{,}14$, $\\pi$, $\\sqrt{16}$, $0{,}\\overline{3}$, $\\sqrt{3}$?', 'كم من هذه الأعداد نسبي: $3{,}14$ و$\\pi$ و$\\sqrt{16}$ و$0{,}\\overline{3}$ و$\\sqrt{3}$؟', 'How many of these are rational: $3{,}14$, $\\pi$, $\\sqrt{16}$, $0{,}\\overline{3}$, $\\sqrt{3}$?'), solution: same('$3{,}14,\\ \\sqrt{16}=4,\\ 0{,}\\overline{3}=\\frac{1}{3}\\to 3$'), answer: { expected: n(3) } },
            { id: 32, difficulty: 'easy', question: say('$\\sqrt{50}$ bi zenbaki osoren artean dago: $n<\\sqrt{50}<n+1$. Zenbat da $n$?', '$\\sqrt{50}$ está entre dos enteros consecutivos: $n<\\sqrt{50}<n+1$. ¿Cuánto vale $n$?', '$\\sqrt{50}$ بين عددين صحيحين متتاليين: $n<\\sqrt{50}<n+1$. كم يساوي $n$؟', '$\\sqrt{50}$ is between two consecutive integers: $n<\\sqrt{50}<n+1$. What is $n$?'), solution: same('$49<50<64\\to 7<\\sqrt{50}<8$'), answer: { expected: n(7) } },
            { id: 33, difficulty: 'easy', question: say('Zenbat da $[2,\\,9)$ tartearen luzera?', '¿Cuánto mide la longitud del intervalo $[2,\\,9)$?', 'كم طول الفترة $[2,\\,9)$؟', 'What is the length of the interval $[2,\\,9)$?'), solution: same('$9-2=7$'), answer: { expected: n(7) } },
            { id: 34, difficulty: 'easy', question: say('Zenbat zenbaki oso daude $[-1,\\,4]$ tartean?', '¿Cuántos números enteros hay en $[-1,\\,4]$?', 'كم عددًا صحيحًا في $[-1,\\,4]$؟', 'How many integers are there in $[-1,\\,4]$?'), solution: same('$-1,\\,0,\\,1,\\,2,\\,3,\\,4\\to 6$'), answer: { expected: n(6) } },
            { id: 35, difficulty: 'medium', question: say('Zenbat zenbaki oso daude $(-2,\\,3)$ tartean?', '¿Cuántos números enteros hay en $(-2,\\,3)$?', 'كم عددًا صحيحًا في $(-2,\\,3)$؟', 'How many integers are there in $(-2,\\,3)$?'), solution: same('$-1,\\,0,\\,1,\\,2\\to 4$'), answer: { expected: n(4) } },
            { id: 36, difficulty: 'medium', question: say('$(a,\\,10]$ tartearen luzera $7{,}5$ da. Zenbat da $a$?', 'El intervalo $(a,\\,10]$ tiene longitud $7{,}5$. ¿Cuánto vale $a$?', 'طول الفترة $(a,\\,10]$ يساوي $7{,}5$. كم يساوي $a$؟', 'The interval $(a,\\,10]$ has a length of $7{,}5$. What is $a$?'), solution: same('$10-a=7{,}5\\to a=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 37, difficulty: 'medium', question: say('Zenbat zenbaki oso daude $\\sqrt{2}$ eta $\\sqrt{30}$ artean?', '¿Cuántos números enteros hay entre $\\sqrt{2}$ y $\\sqrt{30}$?', 'كم عددًا صحيحًا بين $\\sqrt{2}$ و$\\sqrt{30}$؟', 'How many integers are there between $\\sqrt{2}$ and $\\sqrt{30}$?'), solution: same('$1{,}4\\ldots<k<5{,}4\\ldots\\to 2,\\,3,\\,4,\\,5\\to 4$'), answer: { expected: n(4) } },
            { id: 38, difficulty: 'medium', question: say('Zein da $[-3,\\,8]$ tartearen erdiko puntua?', '¿Cuál es el punto medio del intervalo $[-3,\\,8]$?', 'ما منتصف الفترة $[-3,\\,8]$؟', 'What is the midpoint of the interval $[-3,\\,8]$?'), solution: same('$\\frac{-3+8}{2}=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 39, difficulty: 'hard', question: say('Aldea $5$ cm duen karratu baten diagonalak $a\\sqrt{2}$ cm neurtzen ditu. Zenbat da $a$?', 'La diagonal de un cuadrado de lado $5$ cm mide $a\\sqrt{2}$ cm. ¿Cuánto vale $a$?', 'قطر مربع طول ضلعه $5$ سم يساوي $a\\sqrt{2}$ سم. كم يساوي $a$؟', 'The diagonal of a square with a side of $5$ cm is $a\\sqrt{2}$ cm. What is $a$?'), solution: same('$d=\\sqrt{5^{2}+5^{2}}=\\sqrt{50}=5\\sqrt{2}$'), answer: { expected: n(5) } },
            { id: 40, difficulty: 'hard', question: say('Karratu baten azalera $12$ cm² da. Aldea $a\\sqrt{3}$ cm da. Zenbat da $a$?', 'Un cuadrado tiene área $12$ cm². Su lado mide $a\\sqrt{3}$ cm. ¿Cuánto vale $a$?', 'مربع مساحته $12$ سم². ضلعه $a\\sqrt{3}$ سم. كم يساوي $a$؟', 'A square has an area of $12$ cm². Its side is $a\\sqrt{3}$ cm. What is $a$?'), solution: same('$\\sqrt{12}=\\sqrt{2^{2}\\cdot 3}=2\\sqrt{3}$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'approx',
        title: say('Hurbilketak eta errorea', 'Aproximaciones y error', 'التقريب والخطأ', 'Approximations and error'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Biribildu $4{,}2863$ ehunenetara.', 'Redondea $4{,}2863$ a las centésimas.', 'قرّب $4{,}2863$ إلى الأجزاء من مئة.', 'Round $4{,}2863$ to the nearest hundredth.'), solution: same('$4{,}2863\\approx 4{,}29$'), answer: { expected: v('4,29') } },
            { id: 42, difficulty: 'easy', question: say('Trunkatu $4{,}2863$ ehunenetara.', 'Trunca $4{,}2863$ a las centésimas.', 'ابتر $4{,}2863$ إلى الأجزاء من مئة.', 'Truncate $4{,}2863$ to the hundredths.'), solution: same('$4{,}2863\\to 4{,}28$'), answer: { expected: v('4,28') } },
            { id: 43, difficulty: 'easy', question: say('Biribildu $0{,}0765$ milaenetara.', 'Redondea $0{,}0765$ a las milésimas.', 'قرّب $0{,}0765$ إلى الأجزاء من ألف.', 'Round $0{,}0765$ to the nearest thousandth.'), solution: same('$0{,}0765\\approx 0{,}077$'), answer: { expected: v('0,077') } },
            { id: 44, difficulty: 'easy', question: say('Biribildu $12{,}95$ hamarrenetara.', 'Redondea $12{,}95$ a las décimas.', 'قرّب $12{,}95$ إلى الأعشار.', 'Round $12{,}95$ to the nearest tenth.'), solution: same('$12{,}95\\approx 13{,}0$'), answer: { expected: n(13) } },
            { id: 45, difficulty: 'medium', question: say('$6{,}48$ hamarrenetara biribiltzen da, $6{,}5$. Zenbat da errore absolutua?', 'Se redondea $6{,}48$ a las décimas: $6{,}5$. ¿Cuánto es el error absoluto?', 'قُرّب $6{,}48$ إلى الأعشار فصار $6{,}5$. كم الخطأ المطلق؟', '$6{,}48$ is rounded to the nearest tenth: $6{,}5$. What is the absolute error?'), solution: same('$|6{,}48-6{,}5|=0{,}02$'), answer: { expected: v('0,02') } },
            { id: 46, difficulty: 'medium', question: say('$9{,}87$ unitateetara trunkatzen da. Zenbat da errore absolutua?', 'Se trunca $9{,}87$ a las unidades. ¿Cuánto es el error absoluto?', 'ابتُر $9{,}87$ إلى الوحدات. كم الخطأ المطلق؟', '$9{,}87$ is truncated to units. What is the absolute error?'), solution: same('$9{,}87-9=0{,}87$'), answer: { expected: v('0,87') } },
            { id: 47, difficulty: 'medium', question: say('Zenbaki zehatza $25$ da eta hurbilketa $24$. Zenbat da errore erlatiboa (hamartarra)?', 'El valor exacto es $25$ y la aproximación $24$. ¿Cuánto es el error relativo (decimal)?', 'القيمة الصحيحة $25$ والتقريب $24$. كم الخطأ النسبي (عشريًا)؟', 'The exact value is $25$ and the approximation is $24$. What is the relative error (as a decimal)?'), solution: same('$\\frac{1}{25}=0{,}04$'), answer: { expected: v('0,04') } },
            { id: 48, difficulty: 'medium', question: say('Zenbaki zehatza $200$ da eta hurbilketa $197$. Zenbat da errore erlatiboa (hamartarra)?', 'El valor exacto es $200$ y la aproximación $197$. ¿Cuánto es el error relativo (decimal)?', 'القيمة الصحيحة $200$ والتقريب $197$. كم الخطأ النسبي (عشريًا)؟', 'The exact value is $200$ and the approximation is $197$. What is the relative error (as a decimal)?'), solution: same('$\\frac{3}{200}=0{,}015$'), answer: { expected: v('0,015') } },
            { id: 49, difficulty: 'hard', question: say('Biribildu $\\sqrt{7}=2{,}6457513\\ldots$ milaenetara.', 'Redondea $\\sqrt{7}=2{,}6457513\\ldots$ a las milésimas.', 'قرّب $\\sqrt{7}=2{,}6457513\\ldots$ إلى الأجزاء من ألف.', 'Round $\\sqrt{7}=2{,}6457513\\ldots$ to the nearest thousandth.'), solution: same('$2{,}6457\\ldots\\approx 2{,}646$'), answer: { expected: v('2,646') } },
            { id: 50, difficulty: 'hard', question: say('Bi neurketa: $10$ m-ko luzera bat $0{,}5$ m-ko errorearekin, eta $100$ m-ko beste bat $1$ m-ko errorearekin. Lehenengoaren errore erlatiboa bigarrenarena baino zenbat aldiz handiagoa da?', 'Dos medidas: una de $10$ m con error de $0{,}5$ m, y otra de $100$ m con error de $1$ m. ¿Cuántas veces es mayor el error relativo de la primera que el de la segunda?', 'قياسان: الأول $10$ م بخطأ $0{,}5$ م، والثاني $100$ م بخطأ $1$ م. كم مرة الخطأ النسبي للأول أكبر من الثاني؟', 'Two measurements: one of $10$ m with an error of $0{,}5$ m, and another of $100$ m with an error of $1$ m. How many times bigger is the relative error of the first than that of the second?'), solution: same('$\\frac{0{,}5}{10}=0{,}05\\quad\\frac{1}{100}=0{,}01\\quad\\frac{0{,}05}{0{,}01}=5$'), answer: { expected: n(5) } }
        ]
    }
]
