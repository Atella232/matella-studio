import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   P-J2 · Ordenak axola du? (¿Importa el orden?): a situation to count (a
   committee, a podium, a PIN, a queue…) and four answers: arrangement
   (order, no repetition), arrangement with repetition, permutation (all
   of them in order) or combination (no order). Level 1 mixes only
   arrangements and combinations, the classic doubt; level 2 all four;
   level 3 asks for the number itself among the counts each model would
   give. Pure logic.
   ========================================================================== */

export const ORDER_ROUNDS = 6

export type CountModel = 'V' | 'VR' | 'P' | 'C'
export const COUNT_MODELS: CountModel[] = ['V', 'VR', 'P', 'C']

export interface OrderRound {
    model: CountModel
    n: number
    k: number
    situation: LocalizedText
    /** Level 3: three counts to choose from, the right one first before shuffling */
    options: number[]
}

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
export const arrangements = (n: number, k: number) => factorial(n) / factorial(n - k)
export const combinations = (n: number, k: number) => arrangements(n, k) / factorial(k)

export function countOf(model: CountModel, n: number, k: number): number {
    if (model === 'V') return arrangements(n, k)
    if (model === 'VR') return n ** k
    if (model === 'P') return factorial(n)
    return combinations(n, k)
}

/** The count in LaTeX: V_{8,3}=336 */
export function countLatex(round: Pick<OrderRound, 'model' | 'n' | 'k'>): string {
    const { model, n, k } = round
    const value = countOf(model, n, k)
    if (model === 'V') return `V_{${n},${k}}=${value}`
    if (model === 'VR') return `VR_{${n},${k}}=${n}^{${k}}=${value}`
    if (model === 'P') return `P_{${n}}=${n}!=${value}`
    return `C_{${n},${k}}=${value}`
}

type Template = (n: number, k: number) => LocalizedText

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const SITUATIONS: Record<CountModel, Array<{ n: [number, number]; k: [number, number]; text: Template }>> = {
    V: [
        { n: [6, 12], k: [3, 3], text: (n) => say(`${n} bazkideko elkarte batek lehendakaria, idazkaria eta diruzaina aukeratzen ditu. Zenbat modutan?`, `Una asociación de ${n} socios elige presidente, secretario y tesorero. ¿De cuántas formas?`, `تختار جمعية من ${n} أعضاء رئيسًا وأمينًا للسر وأمينًا للصندوق. بكم طريقة؟`, `An association of ${n} members chooses a president, a secretary and a treasurer. In how many ways?`) },
        { n: [5, 10], k: [3, 3], text: (n) => say(`Lasterketa batean ${n} korrikalari daude. Zenbat modutan bana daitezke urrea, zilarra eta brontzea?`, `En una carrera hay ${n} corredores. ¿De cuántas formas se reparten oro, plata y bronce?`, `في سباق ${n} عدّائين. بكم طريقة توزَّع الذهبية والفضية والبرونزية؟`, `A race has ${n} runners. In how many ways can gold, silver and bronze be given?`) },
        { n: [5, 9], k: [2, 2], text: (n) => say(`${n} ikasleren artean ordezkaria eta ordezkariordea aukeratzen dira. Zenbat modutan?`, `Entre ${n} alumnos se eligen delegado y subdelegado. ¿De cuántas formas?`, `يُختار من بين ${n} طلاب مندوب ونائب مندوب. بكم طريقة؟`, `A delegate and a deputy are chosen among ${n} students. In how many ways?`) }
    ],
    VR: [
        { n: [10, 10], k: [3, 4], text: (_, k) => say(`Zenbat ${k} zifrako PIN kode daude, zifrak errepika badaitezke?`, `¿Cuántos códigos PIN de ${k} cifras hay si las cifras se pueden repetir?`, `كم رمز PIN من ${k} أرقام يوجد إذا جاز تكرار الأرقام؟`, `How many ${k}-digit PIN codes are there if digits can repeat?`) },
        { n: [2, 2], k: [4, 7], text: (_, k) => say(`Inkesta batek bai/ez motako ${k} galdera ditu. Zenbat erantzun-orri desberdin egon daitezke?`, `Una encuesta tiene ${k} preguntas de sí o no. ¿Cuántas hojas de respuestas distintas puede haber?`, `في استطلاع ${k} أسئلة بنعم أو لا. كم ورقة إجابات مختلفة يمكن أن توجد؟`, `A poll has ${k} yes-or-no questions. How many different answer sheets can there be?`) },
        { n: [3, 3], k: [3, 5], text: (_, k) => say(`Kiniela batean ${k} partida daude, bakoitza 1, X edo 2. Zenbat kiniela desberdin daude?`, `Una quiniela tiene ${k} partidos, cada uno con 1, X o 2. ¿Cuántas quinielas distintas hay?`, `في ورقة توقعات ${k} مباريات، لكل منها 1 أو X أو 2. كم ورقة مختلفة توجد؟`, `A pools coupon has ${k} matches, each 1, X or 2. How many different coupons are there?`) }
    ],
    P: [
        { n: [4, 7], k: [0, 0], text: (n) => say(`Zenbat modutan jar daitezke ${n} pertsona ilara batean?`, `¿De cuántas formas se pueden poner ${n} personas en una cola?`, `بكم طريقة يمكن وضع ${n} أشخاص في طابور؟`, `In how many ways can ${n} people stand in a queue?`) },
        { n: [4, 7], k: [0, 0], text: (n) => say(`Publizitate-etenaldi batean ${n} iragarki daude. Zenbat ordenatan eman daitezke?`, `En una pausa publicitaria hay ${n} anuncios. ¿En cuántos órdenes se pueden emitir?`, `في فاصل إعلاني ${n} إعلانات. بكم ترتيبًا يمكن بثّها؟`, `An advertising break has ${n} adverts. In how many orders can they be shown?`) }
    ],
    C: [
        { n: [6, 12], k: [2, 4], text: (n, k) => say(`${n} bizilagunen artean ${k} pertsonako batzorde bat osatzen da. Zenbat batzorde daude?`, `Entre ${n} vecinos se forma una comisión de ${k} personas. ¿Cuántas comisiones hay?`, `تُكوَّن لجنة من ${k} أشخاص من بين ${n} جيران. كم لجنة توجد؟`, `A committee of ${k} people is formed from ${n} neighbours. How many committees are there?`) },
        { n: [6, 10], k: [2, 3], text: (n, k) => say(`Izozki-denda batek ${n} zapore ditu, eta ${k} zapore desberdin hartzen dira. Zenbat aukeraketa daude?`, `Una heladería tiene ${n} sabores y se toman ${k} sabores distintos. ¿Cuántas elecciones hay?`, `في محل مثلجات ${n} نكهات ويُؤخذ ${k} نكهات مختلفة. كم اختيارًا يوجد؟`, `An ice-cream shop has ${n} flavours and you take ${k} different ones. How many choices are there?`) },
        { n: [8, 15], k: [2, 3], text: (n, k) => say(`${k} sari berdin zozketatzen dira ${n} pertsonaren artean. Zenbat irabazle-talde egon daitezke?`, `Se sortean ${k} premios iguales entre ${n} personas. ¿Cuántos grupos de ganadores puede haber?`, `تُجرى قرعة على ${k} جوائز متساوية بين ${n} أشخاص. كم مجموعة فائزين يمكن أن توجد؟`, `${k} equal prizes are drawn among ${n} people. How many groups of winners can there be?`) }
    ]
}

const MODELS_BY_LEVEL: CountModel[][] = [['V', 'C'], ['V', 'VR', 'P', 'C'], ['V', 'VR', 'P', 'C']]

function makeRound(random: Random, model: CountModel): OrderRound | null {
    const template = pick(random, SITUATIONS[model])
    const n = randomInt(random, template.n[0], template.n[1])
    const k = model === 'P' ? n : randomInt(random, template.k[0], template.k[1])
    if (k > n) return null
    const right = countOf(model, n, k)
    // The counts the other models would give, as distractors for level 3
    const others = [arrangements(n, Math.min(k, n)), n ** k, combinations(n, Math.min(k, n)), factorial(n)].filter((value) => value !== right)
    const options = [right, ...[...new Set(others)].slice(0, 2)]
    if (options.length < 3) options.push(right + n)
    return { model, n, k, situation: template.text(n, k), options }
}

/** Six rounds of a level, each model at least once, no two the same situation */
export function createOrderRounds(random: Random, level: number): OrderRound[] {
    const models = MODELS_BY_LEVEL[level] ?? MODELS_BY_LEVEL[0]
    const plan = shuffle(random, Array.from({ length: ORDER_ROUNDS }, (_, index) => models[index % models.length]))
    const rounds: OrderRound[] = []
    for (const model of plan) {
        for (let attempt = 0; attempt < 100; attempt += 1) {
            const round = makeRound(random, model)
            if (!round || rounds.some((other) => other.situation.es === round.situation.es)) continue
            rounds.push({ ...round, options: shuffle(random, round.options) })
            break
        }
    }
    return rounds
}
