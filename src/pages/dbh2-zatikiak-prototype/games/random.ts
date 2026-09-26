/**
 * Seeded randomness for the games: every round is generated from a seed, so the
 * tests can replay exactly what a student saw and check that it is valid.
 */
export type Random = () => number

/** mulberry32: tiny, fast and good enough for shuffling exercises */
export function createRandom(seed: number): Random {
    let state = seed >>> 0
    return () => {
        state = (state + 0x6d2b79f5) >>> 0
        let value = state
        value = Math.imul(value ^ (value >>> 15), value | 1)
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296
    }
}

export function randomSeed(): number {
    return Math.floor(Math.random() * 2 ** 31)
}

/** Integer in [min, max] */
export function randomInt(random: Random, min: number, max: number): number {
    return min + Math.floor(random() * (max - min + 1))
}

export function pick<Item>(random: Random, items: readonly Item[]): Item {
    return items[Math.floor(random() * items.length)]
}

export function shuffle<Item>(random: Random, items: readonly Item[]): Item[] {
    const result = [...items]
    for (let index = result.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1))
        ;[result[index], result[swap]] = [result[swap], result[index]]
    }
    return result
}
