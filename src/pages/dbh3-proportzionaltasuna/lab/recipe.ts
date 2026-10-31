import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · La receta y la despensa: a sponge cake for 4 people (flour, eggs,
   milk, sugar). Every ingredient is directly proportional to the number of
   people, with its own constant. The pantry holds a fixed amount of each,
   so the ingredient that runs out first decides how many people can eat:
   the smallest of the pantry / recipe · 4. The learner chooses the people
   and the pantry, and predicts whether the pantry runs short, is just
   enough or has some left over. Pure state logic.
   ========================================================================== */

export type IngredientId = 'flour' | 'eggs' | 'milk' | 'sugar'

export interface Ingredient {
    id: IngredientId
    /** Amount for 4 people */
    forFour: number
    unit: 'g' | 'ml' | ''
    name: LocalizedText
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const RECIPE_PEOPLE = 4
export const INGREDIENTS: Ingredient[] = [
    { id: 'flour', forFour: 300, unit: 'g', name: say('irin', 'harina', 'الطحين', 'flour') },
    { id: 'eggs', forFour: 3, unit: '', name: say('arrautza', 'huevos', 'البيض', 'eggs') },
    { id: 'milk', forFour: 200, unit: 'ml', name: say('esne', 'leche', 'الحليب', 'milk') },
    { id: 'sugar', forFour: 120, unit: 'g', name: say('azukre', 'azúcar', 'السكر', 'sugar') }
]

/** Three pantries: in each one a different ingredient runs out first */
export const PANTRIES: Record<IngredientId, number>[] = [
    { flour: 1000, eggs: 6, milk: 1000, sugar: 500 },
    { flour: 900, eggs: 12, milk: 1000, sugar: 600 },
    { flour: 2000, eggs: 18, milk: 500, sugar: 1000 }
]

export const PEOPLE_LIMITS = { min: 1, max: 24 } as const

export interface RecipeState {
    people: number
    pantry: number
    prediction: Prediction | null
}

export const initialRecipeState: RecipeState = { people: 4, pantry: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setRecipe(state: RecipeState, patch: Partial<Omit<RecipeState, 'prediction'>>): RecipeState {
    const people = clamp(patch.people ?? state.people, PEOPLE_LIMITS.min, PEOPLE_LIMITS.max)
    const pantry = clamp(patch.pantry ?? state.pantry, 0, PANTRIES.length - 1)
    const same = people === state.people && pantry === state.pantry
    return { people, pantry, prediction: same ? state.prediction : null }
}

/** Amount of an ingredient for `people`: forFour · people / 4 */
export const amountFor = (ingredient: Ingredient, people: number) => (ingredient.forFour * people) / RECIPE_PEOPLE
/** People that the pantry can feed with this ingredient (not rounded) */
export const peopleWith = (ingredient: Ingredient, pantry: number) => (PANTRIES[pantry][ingredient.id] * RECIPE_PEOPLE) / ingredient.forFour
/** The most people the pantry can feed, and the ingredient that runs out first */
export function recipeLimit(pantry: number): { people: number; ingredient: Ingredient } {
    let best = INGREDIENTS[0]
    for (const ingredient of INGREDIENTS) if (peopleWith(ingredient, pantry) < peopleWith(best, pantry)) best = ingredient
    return { people: Math.floor(peopleWith(best, pantry) + 1e-9), ingredient: best }
}
/** Some ingredient is short (<), the pantry is just enough for one of them (=), or something is left of each (>) */
export function recipePrediction(state: RecipeState): Prediction {
    const exact = peopleWith(recipeLimit(state.pantry).ingredient, state.pantry)
    return compareTo(exact, state.people)
}

export const recipeChallenges: LabChallenge<RecipeState>[] = [
    { id: 87401, prompt: say('Lortu errezetak 9 arrautza eramatea.', 'Consigue que la receta lleve 9 huevos.', 'اجعل الوصفة تحتاج 9 بيضات.', 'Make the recipe need 9 eggs.'), hint: say('4 lagunentzat 3 arrautza. $\\frac{9}{3}=3$: hiru aldiz lagun gehiago.', 'Para 4 personas, 3 huevos. $\\frac{9}{3}=3$: el triple de personas.', 'لأربعة أشخاص 3 بيضات. $\\frac{9}{3}=3$: ثلاثة أضعاف الأشخاص.', 'For 4 people, 3 eggs. $\\frac{9}{3}=3$: three times as many people.'), isSolved: (state) => state.people === 12 },
    { id: 87402, prompt: say('1. despentsarekin, zenbat lagunentzat egin daiteke gehienez? Jarri kopuru hori.', 'Con la despensa 1, ¿para cuántas personas se puede cocinar como mucho? Pon ese número.', 'بالمخزن 1، لكم شخصًا يمكن الطبخ على الأكثر؟ ضع هذا العدد.', 'With pantry 1, what is the most people you can cook for? Set that number.'), hint: say('Arrautzak dira lehenak amaitzen: 6 arrautza.', 'Los huevos son lo primero que se acaba: 6 huevos.', 'البيض أول ما ينفد: 6 بيضات.', 'The eggs run out first: 6 eggs.'), isSolved: (state) => state.pantry === 0 && state.people === 8 },
    { id: 87403, prompt: say('2. despentsarekin, zenbat lagunentzat gehienez?', 'Con la despensa 2, ¿para cuántas personas como mucho?', 'بالمخزن 2، لكم شخصًا على الأكثر؟', 'With pantry 2, for how many people at most?'), hint: say('Irina: $\\frac{900\\cdot 4}{300}=12$.', 'Harina: $\\frac{900\\cdot 4}{300}=12$.', 'الطحين: $\\frac{900\\cdot 4}{300}=12$.', 'Flour: $\\frac{900\\cdot 4}{300}=12$.'), isSolved: (state) => state.pantry === 1 && state.people === 12 },
    { id: 87404, prompt: say('3. despentsarekin, zenbat lagunentzat gehienez?', 'Con la despensa 3, ¿para cuántas personas como mucho?', 'بالمخزن 3، لكم شخصًا على الأكثر؟', 'With pantry 3, for how many people at most?'), hint: say('Esnea: $\\frac{500\\cdot 4}{200}=10$.', 'Leche: $\\frac{500\\cdot 4}{200}=10$.', 'الحليب: $\\frac{500\\cdot 4}{200}=10$.', 'Milk: $\\frac{500\\cdot 4}{200}=10$.'), isSolved: (state) => state.pantry === 2 && state.people === 10 },
    { id: 87405, prompt: say('Lortu errezetak justu 450 g irin eramatea.', 'Consigue que la receta lleve justo 450 g de harina.', 'اجعل الوصفة تحتاج 450 غ من الطحين تمامًا.', 'Make the recipe need exactly 450 g of flour.'), hint: say('Lagun bakoitzeko $300\\mathbin{:}4=75$ g.', 'Por persona, $300\\mathbin{:}4=75$ g.', 'لكل شخص $300\\mathbin{:}4=75$ غ.', 'Per person, $300\\mathbin{:}4=75$ g.'), isSolved: (state) => state.people === 6 }
]

const UNITS: Record<Ingredient['unit'], LocalizedText> = { g: say('g', 'g', 'غ', 'g'), ml: say('ml', 'ml', 'مل', 'ml'), '': say('', '', '', '') }

/** «450 g irin», «450 g de harina», «9 huevos»: an amount of an ingredient in a sentence */
export function quantityText(ingredient: Ingredient, amount: number, language: keyof LocalizedText): string {
    if (ingredient.unit === '') return `${amount} ${ingredient.name[language]}`
    const unit = UNITS[ingredient.unit][language]
    return language === 'es' ? `${amount} ${unit} de ${ingredient.name.es}` : `${amount} ${unit} ${ingredient.name[language]}`
}

/** Endless practice: an amount of one ingredient to reach */
const recipeMaker: LabChallengeMaker<RecipeState> = (random) => {
    for (;;) {
        const ingredient = INGREDIENTS[randomInt(random, 0, INGREDIENTS.length - 1)]
        const people = randomInt(random, 2, 24)
        const amount = amountFor(ingredient, people)
        if (!Number.isInteger(amount) || people === 4) continue
        const q = (language: keyof LocalizedText) => quantityText(ingredient, amount, language)
        const four = (language: keyof LocalizedText) => quantityText(ingredient, ingredient.forFour, language)
        return {
            prompt: say(`Lortu errezetak ${q('eu')} eramatea.`, `Consigue que la receta lleve ${q('es')}.`, `اجعل الوصفة تحتاج ${q('ar')}.`, `Make the recipe need ${q('en')}.`),
            hint: say(`4 lagunentzat: ${four('eu')}. Kalkulatu lagun bakoitzarena.`, `Para 4 personas: ${four('es')}. Calcula lo de una persona.`, `لأربعة أشخاص: ${four('ar')}. احسب ما يلزم الشخص الواحد.`, `For 4 people: ${four('en')}. Work out the amount for one person.`),
            isSolved: (state) => state.people === people,
            solution: { people, pantry: 0, prediction: null }
        }
    }
}

export const recipeExtra = freshFrom(initialRecipeState, recipeMaker)
