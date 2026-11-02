import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The own games of 1. DBH proportionality:
   · The recipe: a recipe for P people with three ingredients. Level 1: for
     twice or half the people; level 2: for any number (through one
     person); level 3: how many people a given amount is enough for. The
     options are the usual slips (only multiplied, the other way round,
     only divided). After answering, the bars of the old and the new
     recipe side by side.
   · Paint the percentage: a grid of N squares; tapping a square paints all
     the squares up to it. Level 1: 10 or 20 squares; level 2: 25, 40 or 50
     squares; level 3: a rise or a discount, so the painted part ends above
     or below the whole grid.
   ========================================================================== */

/* ---------- The recipe ---------- */

export const RECIPE_ROUNDS = 5
export type Ingredient = 'flour' | 'sugar' | 'milk'
export const INGREDIENTS: Ingredient[] = ['flour', 'sugar', 'milk']
const PER_PERSON: Record<Ingredient, number[]> = { flour: [40, 50, 60, 75], sugar: [15, 20, 25, 30], milk: [50, 60, 75, 100] }

export interface RecipeRound {
    people: number
    /** Grams or millilitres per person */
    perPerson: Record<Ingredient, number>
    asked: Ingredient
    /** The new number of people (levels 1 and 2) or the people asked for (level 3) */
    target: number
    /** Level 3: the amount of the asked ingredient that there is */
    given: number | null
    answer: number
    options: number[]
}

export const amountFor = (round: RecipeRound, people: number, ingredient = round.asked) => round.perPerson[ingredient] * people

export function createRecipeRound(random: Random, levelIndex: number): RecipeRound {
    for (;;) {
        const people = pick(random, [2, 4, 6, 8])
        const perPerson = { flour: pick(random, PER_PERSON.flour), sugar: pick(random, PER_PERSON.sugar), milk: pick(random, PER_PERSON.milk) }
        const asked = pick(random, INGREDIENTS)
        const target = levelIndex === 0 ? pick(random, [people * 2, people / 2]) : randomInt(random, 3, 12)
        if (target === people || (levelIndex > 0 && (target === people * 2 || target === people / 2))) continue
        const amount = perPerson[asked] * people
        if (levelIndex < 2) {
            const answer = perPerson[asked] * target
            // Only multiplied, the other way round, only the people added or taken away, the people added as grams
            const slips = shuffle(random, [amount * target, (amount * people) / target, perPerson[asked] * Math.abs(target - people), amount + target])
            const options = [...new Set([answer, ...slips.filter((value) => Number.isInteger(value) && value > 0 && value !== answer)])].slice(0, 4).sort((x, y) => x - y)
            if (options.length < 4) continue
            return { people, perPerson, asked, target, given: null, answer, options }
        }
        const given = perPerson[asked] * target
        // Near misses and the old number of people, in a random choice so the answer is not always in the same place
        const near = shuffle(random, [target - 2, target - 1, target + 1, target + 2, target * 2, people].filter((value) => value > 0 && value !== target))
        const options = [...new Set([target, ...near])].slice(0, 4).sort((x, y) => x - y)
        return { people, perPerson, asked, target, given, answer: target, options }
    }
}

export const createRecipeRounds = (random: Random, levelIndex: number) => Array.from({ length: RECIPE_ROUNDS }, () => createRecipeRound(random, levelIndex))

/* ---------- Paint the percentage ---------- */

export const GRID_ROUNDS = 5
export const GRID_COLUMNS = 10

export interface GridRound {
    /** The squares of the whole (100 %) */
    total: number
    percent: number
    /** 'part': paint p % of the grid; 'rise' or 'discount': paint the new price */
    kind: 'part' | 'rise' | 'discount'
    answer: number
    /** Squares drawn: the whole and room for a rise */
    shown: number
}

export function createGridRound(random: Random, levelIndex: number): GridRound {
    for (;;) {
        const total = levelIndex === 0 ? pick(random, [10, 20]) : levelIndex === 1 ? pick(random, [25, 40, 50]) : pick(random, [10, 20, 40])
        const percent = levelIndex === 0 ? pick(random, [10, 20, 30, 40, 50, 60, 70, 80, 90, 25, 75]) : pick(random, [10, 20, 25, 30, 40, 50, 60, 75, 80])
        const part = (total * percent) / 100
        if (!Number.isInteger(part) || part === 0 || part === total) continue
        if (levelIndex < 2) return { total, percent, kind: 'part', answer: part, shown: total }
        const kind = pick(random, ['rise', 'discount'] as const)
        if (percent > 50) continue
        const answer = kind === 'rise' ? total + part : total - part
        return { total, percent, kind, answer, shown: total + Math.ceil(part / GRID_COLUMNS) * GRID_COLUMNS }
    }
}

export const createGridRounds = (random: Random, levelIndex: number) => Array.from({ length: GRID_ROUNDS }, () => createGridRound(random, levelIndex))
