import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { binomial, factorial, variations } from './combinatorics.ts'
import { tex } from './geometryDetective.ts'

/* ==========================================================================
   Konbinatoriaren detektibea (4. DBH academic): a worked count of three
   lines with one wrong line. Level 1: counting (two choices added, a
   repetition forgotten, n!/k! taken as (n/k)!); level 2: models (the order
   ignored or counted when it should not, repeated digits not divided out);
   level 3: combinations (Pascal's rule with the wrong index, two groups
   added, three different objects counted with repetition).
   ========================================================================== */

export type CombinatoricsDetectiveError =
    | 'product-sum'
    | 'repetition-ignored'
    | 'factorial-divide'
    | 'order-ignored'
    | 'order-counted'
    | 'anagram-no-repeat'
    | 'pascal-index'
    | 'committee-sum'
    | 'repetition-counted'

export const combinatoricsDetectiveLevels: CombinatoricsDetectiveError[][] = [
    ['product-sum', 'repetition-ignored', 'factorial-divide'],
    ['order-ignored', 'order-counted', 'anagram-no-repeat'],
    ['pascal-index', 'committee-sum', 'repetition-counted']
]

export const COMBINATORICS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    model: say('Eredua', 'Modelo', 'النموذج', 'Model'),
    principle: say('Biderketaren printzipioa', 'Principio de multiplicación', 'مبدأ الضرب', 'Multiplication principle'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    simplify: say('Sinplifikatu', 'Simplifica', 'بسّط', 'Simplify'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    groups: say('Taldeak', 'Grupos', 'المجموعات', 'Groups')
}

export const combinatoricsDetectiveNames: Record<CombinatoricsDetectiveError, LocalizedText> = {
    'product-sum': say('Batu egin du, biderkatu beharrean', 'Sumó en vez de multiplicar', 'جمع بدل أن يضرب', 'Added instead of multiplying'),
    'repetition-ignored': say('Errepikatu daitekeen arren, aukerak gutxitu ditu', 'Quitó opciones aunque se puede repetir', 'أنقص الخيارات مع أن التكرار مسموح', 'Took options away although repetition is allowed'),
    'factorial-divide': say('$\\frac{n!}{k!}$ eta $\\left(\\frac{n}{k}\\right)!$ berdinak direla pentsatu du', 'Pensó que $\\frac{n!}{k!}$ es $\\left(\\frac{n}{k}\\right)!$', 'ظن أن $\\frac{n!}{k!}$ يساوي $\\left(\\frac{n}{k}\\right)!$', 'Thought $\\frac{n!}{k!}$ is $\\left(\\frac{n}{k}\\right)!$'),
    'order-ignored': say('Ordenak axola du, baina konbinazioak erabili ditu', 'El orden importa, pero usó combinaciones', 'الترتيب مهم لكنه استعمل التوافيق', 'The order matters, but used combinations'),
    'order-counted': say('Ordenak ez du axola, baina aldakuntzak erabili ditu', 'El orden no importa, pero usó variaciones', 'الترتيب غير مهم لكنه استعمل التراتيب', 'The order does not matter, but used variations'),
    'anagram-no-repeat': say('Errepikatutako zifrak ez ditu kontuan hartu', 'No tuvo en cuenta las cifras repetidas', 'لم يراعِ الأرقام المكررة', 'Did not allow for the repeated digits'),
    'pascal-index': say('Pascalen arauan behekoa gaizki jarri du', 'Puso mal el número de abajo en la regla de Pascal', 'أخطأ في العدد السفلي في قاعدة باسكال', 'Put the wrong bottom number in Pascal\'s rule'),
    'committee-sum': say('Bi taldeak batu ditu, biderkatu beharrean', 'Sumó los dos grupos en vez de multiplicar', 'جمع المجموعتين بدل الضرب', 'Added the two groups instead of multiplying'),
    'repetition-counted': say('Errepikapena onartu du, ezin denean', 'Admitió repetición cuando no se puede', 'سمح بالتكرار وهو غير مسموح', 'Allowed repetition where it is not possible')
}

export const combinatoricsDetectiveTips: Record<CombinatoricsDetectiveError, LocalizedText> = {
    'product-sum': say('Bi aukera bata bestearen ondoren: $a\\cdot b$.', 'Dos elecciones una tras otra: $a\\cdot b$.', 'اختياران متتاليان: $a\\cdot b$.', 'Two choices one after another: $a\\cdot b$.'),
    'repetition-ignored': say('Errepikatu badaiteke, kutxa guztietan aukera berak: $n^{k}$.', 'Si se puede repetir, en todas las casillas las mismas opciones: $n^{k}$.', 'إذا جاز التكرار ففي كل الخانات الخيارات نفسها: $n^{k}$.', 'If repetition is allowed, every box has the same options: $n^{k}$.'),
    'factorial-divide': say('$\\frac{8!}{5!}=8\\cdot 7\\cdot 6$: faktoreak sinplifikatzen dira.', '$\\frac{8!}{5!}=8\\cdot 7\\cdot 6$: se simplifican los factores.', '$\\frac{8!}{5!}=8\\cdot 7\\cdot 6$: تُختصر العوامل.', '$\\frac{8!}{5!}=8\\cdot 7\\cdot 6$: the factors cancel.'),
    'order-ignored': say('Postuak, karguak edo kodeak: ordenak axola du, $\\frac{n!}{(n-k)!}$.', 'Puestos, cargos o códigos: el orden importa, $\\frac{n!}{(n-k)!}$.', 'المراكز والمناصب والرموز: الترتيب مهم، $\\frac{n!}{(n-k)!}$.', 'Places, posts or codes: order matters, $\\frac{n!}{(n-k)!}$.'),
    'order-counted': say('Taldeak edo multzoak: ordenak ez du axola, $\\binom{n}{k}$.', 'Grupos o conjuntos: el orden no importa, $\\binom{n}{k}$.', 'المجموعات: الترتيب غير مهم، $\\binom{n}{k}$.', 'Groups or sets: order does not matter, $\\binom{n}{k}$.'),
    'anagram-no-repeat': say('Errepikatzen direnen faktorialez zatitu: $\\frac{n!}{a!\\cdot b!}$.', 'Divide entre los factoriales de las repetidas: $\\frac{n!}{a!\\cdot b!}$.', 'اقسم على مضروبات المكرَّرات: $\\frac{n!}{a!\\cdot b!}$.', 'Divide by the factorials of the repeated ones: $\\frac{n!}{a!\\cdot b!}$.'),
    'pascal-index': say('$\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.', '$\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.', '$\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.', '$\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.'),
    'committee-sum': say('Bi aukera bata bestearen ondoren: biderkatu.', 'Dos elecciones una tras otra: se multiplican.', 'اختياران متتاليان: نضرب.', 'Two choices one after the other: multiply.'),
    'repetition-counted': say('Objektu desberdinak: aukera bat gutxiago kutxa bakoitzean.', 'Objetos distintos: una opción menos en cada casilla.', 'أشياء مختلفة: خيار أقل في كل خانة.', 'Different objects: one option fewer in each box.')
}

type Built = Omit<WorkedCase<CombinatoricsDetectiveError>, 'options'>

const descending = (n: number, k: number) => Array.from({ length: k }, (_, index) => n - index).join('\\cdot ')

function build(random: Random, error: CombinatoricsDetectiveError): Built | null {
    switch (error) {
        case 'product-sum': {
            const [a, b] = [randomInt(random, 3, 6), randomInt(random, 3, 7)]
            return {
                problem: say(`Menu batean $${a}$ lehen plater eta $${b}$ bigarren daude. Zenbat menu desberdin?`, `Un menú tiene $${a}$ primeros y $${b}$ segundos. ¿Cuántos menús distintos hay?`, `في قائمة طعام $${a}$ أطباق أولى و$${b}$ أطباق ثانية. كم وجبة مختلفة؟`, `A menu has $${a}$ starters and $${b}$ mains. How many different meals are there?`),
                lines: [line(LABELS.groups, `${a},\\ ${b}`), line(LABELS.principle, `${a}+${b}`), line(LABELS.result, `${a + b}`)],
                wrong: 1, error, fix: `${a}\\cdot ${b}=${a * b}`, right: a * b, reached: a + b
            }
        }
        case 'repetition-ignored': {
            const n = pick(random, [5, 6, 10])
            const k = randomInt(random, 3, 4)
            return {
                problem: say(`$${k}$ zifrako kode bat, $${n}$ zifra posiblerekin, zifrak errepika daitezke. Zenbat kode?`, `Un código de $${k}$ cifras con $${n}$ cifras posibles, que se pueden repetir. ¿Cuántos códigos hay?`, `رمز من $${k}$ أرقام بـ$${n}$ أرقام ممكنة يمكن تكرارها. كم رمزًا؟`, `A $${k}$-digit code with $${n}$ possible digits, which can repeat. How many codes are there?`),
                lines: [line(LABELS.model, `\\frac{${n}!}{${n - k}!}`), line(LABELS.substitute, descending(n, k)), line(LABELS.result, tex(variations(n, k)))],
                wrong: 0, error, fix: `${n}^{${k}}=${tex(n ** k)}`, right: n ** k, reached: variations(n, k)
            }
        }
        case 'factorial-divide': {
            const k = pick(random, [2, 3, 4])
            const ratio = pick(random, [2, 3])
            const n = k * ratio
            if (n > 10) return null
            return {
                problem: say(`Kalkulatu: $\\frac{${n}!}{${k}!}$`, `Calcula: $\\frac{${n}!}{${k}!}$`, `احسب: $\\frac{${n}!}{${k}!}$`, `Work out: $\\frac{${n}!}{${k}!}$`),
                lines: [line(LABELS.simplify, `\\frac{${n}!}{${k}!}=\\left(\\frac{${n}}{${k}}\\right)!`), line(LABELS.substitute, `${ratio}!`), line(LABELS.result, `${factorial(ratio)}`)],
                wrong: 0, error, fix: `${descending(n, n - k)}=${tex(variations(n, n - k))}`, right: variations(n, n - k), reached: factorial(ratio)
            }
        }
        case 'order-ignored': {
            const n = randomInt(random, 6, 10)
            return {
                problem: say(`$${n}$ korrikalaritik, zenbat modutara bana daitezke urrea, zilarra eta brontzea?`, `Entre $${n}$ corredores, ¿de cuántas formas se reparten oro, plata y bronce?`, `بين $${n}$ عدّائين، بكم طريقة توزَّع الذهبية والفضية والبرونزية؟`, `Among $${n}$ runners, in how many ways can gold, silver and bronze be given out?`),
                lines: [line(LABELS.model, `\\binom{${n}}{3}`), line(LABELS.substitute, `\\frac{${descending(n, 3)}}{3\\cdot 2\\cdot 1}`), line(LABELS.result, `${binomial(n, 3)}`)],
                wrong: 0, error, fix: `\\frac{${n}!}{${n - 3}!}=${descending(n, 3)}=${variations(n, 3)}`, right: variations(n, 3), reached: binomial(n, 3)
            }
        }
        case 'order-counted': {
            const n = randomInt(random, 6, 10)
            const k = randomInt(random, 2, 3)
            return {
                problem: say(`$${n}$ lagunetatik $${k}$ aukeratu behar dira talde baterako. Zenbat talde?`, `De $${n}$ amigos se eligen $${k}$ para un equipo. ¿Cuántos equipos hay?`, `من $${n}$ أصدقاء نختار $${k}$ لفريق. كم فريقًا؟`, `From $${n}$ friends, $${k}$ are chosen for a team. How many teams are there?`),
                lines: [line(LABELS.model, `\\frac{${n}!}{${n - k}!}`), line(LABELS.substitute, descending(n, k)), line(LABELS.result, `${variations(n, k)}`)],
                wrong: 0, error, fix: `\\binom{${n}}{${k}}=\\frac{${descending(n, k)}}{${k}!}=${binomial(n, k)}`, right: binomial(n, k), reached: variations(n, k)
            }
        }
        case 'anagram-no-repeat': {
            const [a, b] = pick(random, [[2, 2], [3, 2], [2, 1], [3, 1]] as Array<[number, number]>)
            const digits = [...Array(a).fill(1), ...Array(b).fill(2), 3]
            const n = digits.length
            const repeatsLatex = [a, b].filter((count) => count > 1).map((count) => `${count}!`).join('\\cdot ')
            const right = factorial(n) / [a, b].reduce((product, count) => product * factorial(count), 1)
            return {
                problem: say(`Zenbat zenbaki desberdin egin daitezke zifra hauek guztiak erabilita? $${digits.join(',\\ ')}$`, `¿Cuántos números distintos se forman usando todas estas cifras? $${digits.join(',\\ ')}$`, `كم عددًا مختلفًا نكوّن باستعمال كل هذه الأرقام؟ $${digits.join(',\\ ')}$`, `How many different numbers can be made using all these digits? $${digits.join(',\\ ')}$`),
                lines: [line(LABELS.model, `${n}!`), line(LABELS.substitute, descending(n, n)), line(LABELS.result, `${factorial(n)}`)],
                wrong: 0, error, fix: `\\frac{${n}!}{${repeatsLatex}}=${right}`, right, reached: factorial(n)
            }
        }
        case 'pascal-index': {
            const n = randomInt(random, 5, 8)
            const k = randomInt(random, 1, n - 3)
            const right = binomial(n + 1, k + 1)
            const reached = binomial(n + 1, k)
            if (right === reached) return null
            return {
                problem: say(`Kalkulatu Pascalen arauarekin: $\\binom{${n}}{${k}}+\\binom{${n}}{${k + 1}}$`, `Calcula con la regla de Pascal: $\\binom{${n}}{${k}}+\\binom{${n}}{${k + 1}}$`, `احسب بقاعدة باسكال: $\\binom{${n}}{${k}}+\\binom{${n}}{${k + 1}}$`, `Work out with Pascal's rule: $\\binom{${n}}{${k}}+\\binom{${n}}{${k + 1}}$`),
                lines: [line(LABELS.rule, `\\binom{${n + 1}}{${k}}`), line(LABELS.substitute, `\\frac{${n + 1}!}{${k}!\\cdot ${n + 1 - k}!}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `\\binom{${n + 1}}{${k + 1}}=${right}`, right, reached
            }
        }
        case 'committee-sum': {
            const [boys, girls] = [randomInt(random, 4, 7), randomInt(random, 3, 6)]
            const [b, g] = [2, pick(random, [1, 2])]
            const [left, rightGroup] = [binomial(boys, b), binomial(girls, g)]
            return {
                problem: say(`Batzorde bat: $${boys}$ mutiletatik $${b}$ eta $${girls}$ neskatatik $${g}$. Zenbat batzorde?`, `Una comisión: $${b}$ de $${boys}$ chicos y $${g}$ de $${girls}$ chicas. ¿Cuántas comisiones hay?`, `لجنة: $${b}$ من $${boys}$ فتيان و$${g}$ من $${girls}$ فتيات. كم لجنة؟`, `A committee: $${b}$ of $${boys}$ boys and $${g}$ of $${girls}$ girls. How many committees are there?`),
                lines: [line(LABELS.groups, `\\binom{${boys}}{${b}}=${left},\\ \\binom{${girls}}{${g}}=${rightGroup}`), line(LABELS.principle, `${left}+${rightGroup}`), line(LABELS.result, `${left + rightGroup}`)],
                wrong: 1, error, fix: `${left}\\cdot ${rightGroup}=${left * rightGroup}`, right: left * rightGroup, reached: left + rightGroup
            }
        }
        case 'repetition-counted': {
            const n = randomInt(random, 4, 7)
            const k = 3
            return {
                problem: say(`$${n}$ liburu desberdinetatik $3$ apal batean jarri behar dira ordenan. Zenbat modutara?`, `De $${n}$ libros distintos, se colocan $3$ en orden en una estantería. ¿De cuántas formas?`, `من $${n}$ كتب مختلفة نضع $3$ بالترتيب على رف. بكم طريقة؟`, `From $${n}$ different books, $3$ are placed in order on a shelf. In how many ways?`),
                lines: [line(LABELS.model, `${n}^{${k}}`), line(LABELS.substitute, `${n}\\cdot ${n}\\cdot ${n}`), line(LABELS.result, `${n ** k}`)],
                wrong: 0, error, fix: `${descending(n, k)}=${variations(n, k)}`, right: variations(n, k), reached: n ** k
            }
        }
    }
}

export const createCombinatoricsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, combinatoricsDetectiveLevels[levelIndex], COMBINATORICS_DETECTIVE_CASES, build)
