import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { applyChain, chainLatex, type Machine } from './machines.ts'

/* ==========================================================================
   J2 · Ordenatu makinak (Ordena las máquinas): a few machine cards and a
   goal; the learner puts them in a row. Level 1: two machines, a number
   and the result it must give; level 2: three machines; level 3: a formula
   h(x) to break down into its machines. Exactly one order reaches the goal
   (checked over every order), so the order is the whole point.
   ========================================================================== */

export const ORDER_ROUNDS = 6

export interface OrderRound {
    /** The cards, in the order they are shown */
    machines: Machine[]
    /** The right order, as positions in `machines` */
    order: number[]
    /** Levels 1 and 2: the number that goes in and the one that must come out */
    input: number | null
    target: number | null
    /** Level 3: the formula to break down */
    formula: string | null
}

/** Every order of the positions 0…n − 1 */
export function permutations(n: number): number[][] {
    if (n <= 1) return [[0]]
    return permutations(n - 1).flatMap((rest) => Array.from({ length: n }, (_, at) => [...rest.slice(0, at), n - 1, ...rest.slice(at)]))
}

const SAMPLES = [-2, -1, 0, 1, 2, 3]

/** The chain in a given order */
export const chainOf = (round: Pick<OrderRound, 'machines'>, order: number[]) => order.map((index) => round.machines[index])

/** Whether an order reaches the goal of the round */
export function reachesGoal(round: OrderRound, order: number[]): boolean {
    if (order.length !== round.machines.length) return false
    const chain = chainOf(round, order)
    if (round.formula === null) return applyChain(chain, round.input ?? 0) === round.target
    const right = chainOf(round, round.order)
    return SAMPLES.every((x) => Math.abs(applyChain(chain, x) - applyChain(right, x)) < 1e-9)
}

function machinePool(random: Random): Machine {
    const kind = pick(random, ['add', 'add', 'mul', 'square', 'neg'] as const)
    if (kind === 'add') {
        const n = randomInt(random, 1, 5)
        return { op: 'add', n: pick(random, [n, -n]) }
    }
    if (kind === 'mul') return { op: 'mul', n: randomInt(random, 2, 4) }
    return { op: kind }
}

const sameCard = (a: Machine, b: Machine) => a.op === b.op && (a.n ?? 0) === (b.n ?? 0)

function makeRound(random: Random, level: number): OrderRound | null {
    const size = level === 0 ? 2 : level === 1 ? 3 : pick(random, [2, 3])
    const chain: Machine[] = []
    while (chain.length < size) {
        const machine = machinePool(random)
        if (chain.some((other) => sameCard(other, machine) || (other.op === machine.op && machine.op !== 'add'))) continue
        chain.push(machine)
    }
    const machines = shuffle(random, chain)
    const order = chain.map((machine) => machines.indexOf(machine))
    if (level < 2) {
        const input = randomInt(random, -3, 4)
        const target = applyChain(chain, input)
        if (Math.abs(target) > 99) return null
        const round: OrderRound = { machines, order, input, target, formula: null }
        const winners = permutations(size).filter((other) => reachesGoal(round, other))
        return winners.length === 1 ? round : null
    }
    const round: OrderRound = { machines, order, input: null, target: null, formula: chainLatex(chain) }
    const winners = permutations(size).filter((other) => reachesGoal(round, other))
    return winners.length === 1 ? round : null
}

/** Six different rounds of one level */
export function createOrderRounds(random: Random, level: number): OrderRound[] {
    const rounds: OrderRound[] = []
    const key = (round: OrderRound) => `${round.formula ?? ''}|${round.input}|${round.target}|${chainOf(round, round.order).map((m) => `${m.op}${m.n ?? ''}`).join(',')}`
    for (let attempt = 0; rounds.length < ORDER_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => key(other) === key(round))) continue
        rounds.push(round)
    }
    return rounds
}

/** The numbers of a chain, step by step: 3 → 5 → 15 */
export const chainValues = (chain: Machine[], input: number) => chain.reduce<number[]>((values, machine) => [...values, applyChain([machine], values[values.length - 1])], [input])
