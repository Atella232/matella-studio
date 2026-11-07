import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { applyChain, chainLatex, inverseChain, machineLabel, type Machine } from './machines.ts'

/* ==========================================================================
   J3 · Desegin makina (Deshaz la máquina): f is a chain of two or three
   machines (·2 then +4 is f(x) = 2x + 4). From a set of cards — the
   machines that undo each one and the original machines themselves — the
   learner builds f⁻¹: the opposite operations in the reverse order. Any
   chain that takes every f(x) back to x is right. Level 1: two machines
   (add and multiply); level 2: three; level 3: with x³ or 2ˣ.
   ========================================================================== */

export const UNDO_ROUNDS = 6

export interface UndoRound {
    /** The machines of f, in order */
    chain: Machine[]
    /** The cards offered to build f⁻¹ */
    cards: Machine[]
    /** f(x) in LaTeX */
    formula: string
    /** f⁻¹(x) in LaTeX */
    inverse: string
}

const SAMPLES = [0, 1, 2, 3, 5]

/** Whether the chosen cards, in this order, take every f(x) back to x */
export function undoes(round: Pick<UndoRound, 'chain' | 'cards'>, picked: number[]): boolean {
    if (picked.length !== round.chain.length) return false
    const chosen = picked.map((index) => round.cards[index])
    return SAMPLES.every((x) => {
        const back = applyChain(chosen, applyChain(round.chain, x))
        return Number.isFinite(back) && Math.abs(back - x) < 1e-9
    })
}

function add(random: Random): Machine {
    const n = randomInt(random, 1, 6)
    return { op: 'add', n: pick(random, [n, -n]) }
}
const mul = (random: Random): Machine => ({ op: 'mul', n: randomInt(random, 2, 5) })

function makeChain(random: Random, level: number): Machine[] {
    if (level === 0) return pick(random, [[mul(random), add(random)], [add(random), mul(random)]])
    if (level === 1) return pick(random, [[add(random), mul(random), add(random)], [mul(random), add(random), { op: 'neg' }], [add(random), { op: 'neg' }, mul(random)]])
    return pick(random, [[add(random), { op: 'cube' }, add(random)], [{ op: 'exp2' }, add(random)], [add(random), { op: 'exp2' }], [mul(random), { op: 'cube' }]])
}

const label = (machine: Machine) => machineLabel(machine)

function makeRound(random: Random, level: number): UndoRound | null {
    const chain = makeChain(random, level)
    const inverses = inverseChain(chain)
    // The originals are the tempting wrong cards; a machine that is its own inverse (· (−1)) is offered once
    const cards: Machine[] = [...inverses]
    for (const machine of chain) if (!cards.some((card) => label(card) === label(machine))) cards.push(machine)
    if (new Set(cards.map(label)).size !== cards.length || cards.length < chain.length + 2) return null
    const shuffled = shuffle(random, cards)
    const round: UndoRound = { chain, cards: shuffled, formula: chainLatex(chain), inverse: chainLatex(inverses) }
    // Some order of the cards must work: the inverses in reverse order
    const right = inverses.map((machine) => shuffled.indexOf(machine))
    if (!undoes(round, right)) return null
    return round
}

/** Six different rounds of one level */
export function createUndoRounds(random: Random, level: number): UndoRound[] {
    const rounds: UndoRound[] = []
    for (let attempt = 0; rounds.length < UNDO_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.formula === round.formula)) continue
        rounds.push(round)
    }
    return rounds
}

/** The positions of the right cards, in order (f⁻¹ = the inverses in reverse order) */
export const undoAnswer = (round: UndoRound) => inverseChain(round.chain).map((machine) => round.cards.findIndex((card) => label(card) === label(machine)))
