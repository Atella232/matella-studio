import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   The combinatorics games of 4. DBH academic:
   · Does order matter?: a situation; say whether the order matters and
     whether elements can repeat, and choose how many there are. The
     decision tree lights the path and its formula. Level 1: variations or
     combinations; level 2: with repetition and permutations too; level 3:
     every model with bigger numbers.
   · The box method: k boxes, one stepper each; the product of the boxes
     must be the count. Level 1: with repetition; level 2: without;
     level 3: with a condition (the first digit not 0, an even number, a
     vowel first) that is filled first.
   ========================================================================== */

export type Model = 'variations' | 'repetition' | 'permutations' | 'combinations'

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
export const variations = (n: number, k: number) => factorial(n) / factorial(n - k)
export const binomial = (n: number, k: number) => variations(n, k) / factorial(k)

export function modelCount(model: Model, n: number, k: number): number {
    if (model === 'repetition') return n ** k
    if (model === 'permutations') return factorial(n)
    if (model === 'combinations') return binomial(n, k)
    return variations(n, k)
}

/** Does the order matter, can elements repeat */
export const MODEL_ANSWERS: Record<Model, { order: boolean; repeat: boolean }> = {
    variations: { order: true, repeat: false },
    permutations: { order: true, repeat: false },
    repetition: { order: true, repeat: true },
    combinations: { order: false, repeat: false }
}

/* ---------- Does order matter? ---------- */

export const MODEL_ROUNDS = 6

type Situation = { model: Model; text: (n: number, k: number) => LocalizedText; n: [number, number]; k: [number, number] }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const SITUATIONS: Situation[] = [
    { model: 'variations', n: [5, 10], k: [3, 3], text: (n) => say(`Lasterketa batean $${n}$ korrikalari daude. Zenbat modutara bana daitezke urrea, zilarra eta brontzea?`, `En una carrera hay $${n}$ corredores. ¿De cuántas formas se pueden repartir el oro, la plata y el bronce?`, `في سباق $${n}$ عدّائين. بكم طريقة توزَّع الذهبية والفضية والبرونزية؟`, `A race has $${n}$ runners. In how many ways can gold, silver and bronze be given out?`) },
    { model: 'variations', n: [6, 12], k: [2, 2], text: (n) => say(`$${n}$ ikasleko talde batean ordezkaria eta idazkaria aukeratu behar dira. Zenbat modutara?`, `En una clase de $${n}$ alumnos hay que elegir delegado y secretario. ¿De cuántas formas?`, `في صف من $${n}$ تلميذًا نختار مندوبًا وأمين سر. بكم طريقة؟`, `In a class of $${n}$ students a representative and a secretary are chosen. In how many ways?`) },
    { model: 'combinations', n: [6, 12], k: [2, 4], text: (n, k) => say(`$${n}$ lagunetatik $${k}$ aukeratu behar dira talde baterako. Zenbat talde desberdin?`, `De $${n}$ amigos hay que elegir $${k}$ para un equipo. ¿Cuántos equipos distintos hay?`, `من $${n}$ أصدقاء نختار $${k}$ لفريق. كم فريقًا مختلفًا؟`, `From $${n}$ friends, $${k}$ are chosen for a team. How many different teams are there?`) },
    { model: 'combinations', n: [5, 10], k: [2, 2], text: (n) => say(`Bilera batean $${n}$ pertsona daude eta bakoitzak beste guztiei eskua ematen die. Zenbat esku-emate?`, `En una reunión hay $${n}$ personas y cada una da la mano a todas las demás. ¿Cuántos apretones de manos hay?`, `في اجتماع $${n}$ أشخاص ويصافح كل منهم الجميع. كم مصافحة؟`, `At a meeting there are $${n}$ people and each shakes hands with all the others. How many handshakes are there?`) },
    { model: 'combinations', n: [6, 9], k: [3, 3], text: (n) => say(`Izozki-dendan $${n}$ zapore daude. Zenbat modutara aukera daitezke $3$ zapore desberdin kopa baterako?`, `En la heladería hay $${n}$ sabores. ¿De cuántas formas se pueden elegir $3$ sabores distintos para una copa?`, `في محل البوظة $${n}$ نكهات. بكم طريقة نختار $3$ نكهات مختلفة لكأس؟`, `An ice-cream shop has $${n}$ flavours. In how many ways can $3$ different flavours be chosen for a cup?`) },
    { model: 'repetition', n: [10, 10], k: [3, 4], text: (_, k) => say(`$${k}$ zifrako giltzarrapo baten kodea (zerotik bederatzira, errepikatu daitezke). Zenbat kode?`, `El código de un candado de $${k}$ cifras (del 0 al 9, se pueden repetir). ¿Cuántos códigos hay?`, `رمز قفل من $${k}$ أرقام (من 0 إلى 9 ويمكن التكرار). كم رمزًا؟`, `The code of a $${k}$-digit padlock (0 to 9, digits can repeat). How many codes are there?`) },
    { model: 'repetition', n: [3, 3], k: [4, 6], text: (_, k) => say(`Kiniela batean $${k}$ partida daude eta bakoitzean 1, X edo 2. Zenbat emaitza-zerrenda?`, `En una quiniela hay $${k}$ partidos y en cada uno 1, X o 2. ¿Cuántas columnas distintas hay?`, `في ورقة توقعات $${k}$ مباريات ولكل منها 1 أو X أو 2. كم عمودًا مختلفًا؟`, `A football pool has $${k}$ matches, each 1, X or 2. How many different columns are there?`) },
    { model: 'repetition', n: [4, 6], k: [3, 3], text: (n) => say(`$3$ marrako bandera bat $${n}$ koloretatik egiten da, koloreak errepika daitezke. Zenbat bandera?`, `Una bandera de $3$ franjas se hace con $${n}$ colores, que se pueden repetir. ¿Cuántas banderas hay?`, `علم من $3$ أشرطة يُصنع من $${n}$ ألوان ويمكن تكرارها. كم علمًا؟`, `A flag with $3$ stripes is made from $${n}$ colours, which can repeat. How many flags are there?`) },
    { model: 'permutations', n: [4, 7], k: [0, 0], text: (n) => say(`$${n}$ lagun ilaran jarri behar dira argazki baterako. Zenbat modutara?`, `$${n}$ amigos se colocan en fila para una foto. ¿De cuántas formas?`, `يقف $${n}$ أصدقاء في صف لصورة. بكم طريقة؟`, `$${n}$ friends line up for a photo. In how many ways?`) },
    { model: 'permutations', n: [4, 6], k: [0, 0], text: (n) => say(`$${n}$ liburu desberdin apal batean jarri behar dira. Zenbat ordenatan?`, `Hay que colocar $${n}$ libros distintos en una estantería. ¿En cuántos órdenes?`, `نضع $${n}$ كتب مختلفة على رف. بكم ترتيبًا؟`, `$${n}$ different books go on a shelf. In how many orders?`) }
]

export interface ModelRound {
    model: Model
    n: number
    k: number
    text: LocalizedText
    options: number[]
    right: number
}

export function createModelRound(random: Random, levelIndex: number): ModelRound {
    for (;;) {
        const pool = SITUATIONS.filter((situation) => (levelIndex === 0 ? situation.model === 'variations' || situation.model === 'combinations' : true))
        const situation = pick(random, pool)
        const scale = levelIndex === 2 ? 2 : 0
        const n = randomInt(random, situation.n[0], Math.min(situation.n[1] + scale, situation.model === 'permutations' ? 8 : 15))
        const k = situation.model === 'permutations' ? n : randomInt(random, situation.k[0], situation.k[1])
        if (k > n) continue
        const right = modelCount(situation.model, n, k)
        // The counts of the other models with the same numbers
        const others = [variations(n, k), binomial(n, k), n ** k, factorial(n), n * k].filter((value) => value !== right)
        const options = shuffle(random, [right, ...shuffle(random, [...new Set(others)]).slice(0, 3)])
        if (options.length < 4 || right > 2_000_000) continue
        return { model: situation.model, n, k, text: situation.text(n, k), options, right: options.indexOf(right) }
    }
}

export function createModelRounds(random: Random, levelIndex: number): ModelRound[] {
    const rounds: ModelRound[] = []
    while (rounds.length < MODEL_ROUNDS) {
        const round = createModelRound(random, levelIndex)
        if (rounds.some((other) => other.text.es === round.text.es)) continue
        rounds.push(round)
    }
    // Both answers to «does order matter?» in every set
    if (new Set(rounds.map((round) => MODEL_ANSWERS[round.model].order)).size < 2) return createModelRounds(random, levelIndex)
    return rounds
}

/** The formula of a model with its numbers: \frac{8!}{5!}, \binom{8}{3}, 10^{4}, 5! */
export function modelLatex(model: Model, n: number, k: number): string {
    if (model === 'repetition') return `${n}^{${k}}`
    if (model === 'permutations') return `${n}!`
    if (model === 'combinations') return `\\binom{${n}}{${k}}=\\frac{${n}!}{${k}!\\cdot ${n - k}!}`
    return `\\frac{${n}!}{${n - k}!}`
}

/* ---------- The box method ---------- */

export const BOXES_ROUNDS = 5
export const BOX_OPTIONS_MAX = 10

export interface BoxesRound {
    text: LocalizedText
    /** One canonical filling, box by box in reading order */
    boxes: number[]
    /** The box filled first (the condition), or null */
    first: number | null
    total: number
}

export function createBoxesRound(random: Random, levelIndex: number): BoxesRound {
    for (;;) {
        if (levelIndex === 0) {
            const n = randomInt(random, 2, 6)
            const k = randomInt(random, 3, 4)
            const letters = 'ABCDEF'.slice(0, n).split('').join(', ')
            return {
                text: say(`$${k}$ letrako hitzak (zentzurik gabe ere bai) letra hauekin: ${letters}. Letrak errepika daitezke. Zenbat hitz?`, `Palabras de $${k}$ letras (con o sin sentido) con las letras ${letters}. Las letras se pueden repetir. ¿Cuántas palabras?`, `كلمات من $${k}$ حروف (لها معنى أو لا) بالحروف ${letters}، ويمكن تكرار الحروف. كم كلمة؟`, `Words of $${k}$ letters (meaningful or not) with the letters ${letters}. Letters can repeat. How many words?`),
                boxes: Array(k).fill(n), first: null, total: n ** k
            }
        }
        if (levelIndex === 1) {
            const n = randomInt(random, 5, 9)
            const k = randomInt(random, 3, 4)
            return {
                text: say(`$${n}$ lagunetik, $${k}$ lehen postuak (1., 2., …) banatu behar dira. Inork ezin du bi postu izan. Zenbat modutara?`, `Entre $${n}$ amigos se reparten los $${k}$ primeros puestos (1.º, 2.º, …). Nadie puede tener dos puestos. ¿De cuántas formas?`, `بين $${n}$ أصدقاء نوزّع أول $${k}$ مراكز (الأول، الثاني، …) ولا يأخذ أحد مركزين. بكم طريقة؟`, `Among $${n}$ friends the first $${k}$ places (1st, 2nd, …) are given out. Nobody can have two places. In how many ways?`),
                boxes: Array.from({ length: k }, (_, index) => n - index), first: null, total: variations(n, k)
            }
        }
        const kind = pick(random, ['no-zero', 'even', 'vowel'] as const)
        if (kind === 'no-zero') {
            const k = randomInt(random, 3, 4)
            const boxes = [9, ...Array.from({ length: k - 1 }, (_, index) => 9 - index)]
            return {
                text: say(`Zenbat $${k}$ zifrako zenbaki daude zifra guztiak desberdinak badira? (Ezin dira zeroz hasi.)`, `¿Cuántos números de $${k}$ cifras tienen todas las cifras distintas? (No pueden empezar por 0.)`, `كم عددًا من $${k}$ أرقام كل أرقامه مختلفة؟ (لا يبدأ بالصفر.)`, `How many $${k}$-digit numbers have all their digits different? (They cannot start with 0.)`),
                boxes, first: 0, total: boxes.reduce((product, value) => product * value, 1)
            }
        }
        if (kind === 'even') {
            const n = randomInt(random, 5, 8)
            const evens = Math.floor(n / 2)
            const k = 3
            const boxes = [n - 1, n - 2, evens]
            const digits = Array.from({ length: n }, (_, index) => index + 1).join(', ')
            return {
                text: say(`Zifra hauekin (${digits}), zenbat $${k}$ zifrako zenbaki bikoiti egin daitezke zifrak errepikatu gabe?`, `Con las cifras ${digits}, ¿cuántos números pares de $${k}$ cifras se pueden formar sin repetir cifras?`, `بالأرقام ${digits}، كم عددًا زوجيًا من $${k}$ أرقام نكوّن دون تكرار؟`, `With the digits ${digits}, how many even $${k}$-digit numbers can be made without repeating digits?`),
                boxes, first: 2, total: (n - 1) * (n - 2) * evens
            }
        }
        const n = randomInt(random, 5, 7)
        const vowels = 2
        const k = 3
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].slice(0, n)
        if (!letters.includes('E')) continue
        const boxes = [vowels, n - 1, n - 2]
        return {
            text: say(`Letra hauekin (${letters.join(', ')}), zenbat $${k}$ letrako hitz bokalez hasten dira, letrak errepikatu gabe?`, `Con las letras ${letters.join(', ')}, ¿cuántas palabras de $${k}$ letras empiezan por vocal, sin repetir letras?`, `بالحروف ${letters.join(', ')}، كم كلمة من $${k}$ حروف تبدأ بحرف صوتي دون تكرار؟`, `With the letters ${letters.join(', ')}, how many $${k}$-letter words start with a vowel, without repeating letters?`),
            boxes, first: 0, total: vowels * (n - 1) * (n - 2)
        }
    }
}

export function createBoxesRounds(random: Random, levelIndex: number): BoxesRound[] {
    const rounds: BoxesRound[] = []
    while (rounds.length < BOXES_ROUNDS) {
        const round = createBoxesRound(random, levelIndex)
        if (rounds.some((other) => other.text.es === round.text.es)) continue
        rounds.push(round)
    }
    return rounds
}
