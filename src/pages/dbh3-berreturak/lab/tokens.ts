import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   L1 · Fichas de factores: aᵐ · aⁿ : aᵖ drawn as tokens. The numerator holds
   m + n tokens, the denominator p; the pairs that meet cancel, and what is
   left over, above or below the bar, is the exponent of the result.
   Pure state logic; the component is in BerreturakTools.tsx.
   ========================================================================== */

export const TOKEN_BASES = [2, 3, 5] as const
export const TOKEN_LIMITS = { m: 6, n: 6, p: 10 } as const

export interface TokensState {
    /** Index in TOKEN_BASES */
    base: number
    m: number
    n: number
    p: number
}

export const initialTokensState: TokensState = { base: 0, m: 2, n: 1, p: 0 }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const setTokens = (state: TokensState, patch: Partial<TokensState>): TokensState => ({
    base: clamp(patch.base ?? state.base, 0, TOKEN_BASES.length - 1),
    m: clamp(patch.m ?? state.m, 0, TOKEN_LIMITS.m),
    n: clamp(patch.n ?? state.n, 0, TOKEN_LIMITS.n),
    p: clamp(patch.p ?? state.p, 0, TOKEN_LIMITS.p)
})

/** Exponent of the result: m + n − p */
export const tokensNet = (state: TokensState) => state.m + state.n - state.p

/** Tokens in the numerator and the denominator that cancel in pairs */
export const tokensCancelled = (state: TokensState) => Math.min(state.m + state.n, state.p)

/** The value of the result, as numerator and denominator (the base is small, so it stays exact) */
export function tokensValue(state: TokensState): { numerator: number; denominator: number } {
    const base = TOKEN_BASES[state.base]
    const net = tokensNet(state)
    return net >= 0 ? { numerator: base ** net, denominator: 1 } : { numerator: 1, denominator: base ** -net }
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const tokensChallenges: LabChallenge<TokensState>[] = [
    { id: 36101, prompt: say('Lortu emaitza $a^{5}$ izatea.', 'Consigue que el resultado sea $a^{5}$.', 'اجعل النتيجة $a^{5}$.', 'Get the result to be $a^{5}$.'), hint: say('Zenbakitzailean $m+n$ fitxa eta izendatzailean $p$: $m+n-p=5$.', 'Con $m+n$ fichas arriba y $p$ abajo: $m+n-p=5$.', 'مع $m+n$ رقاقة في البسط و$p$ في المقام: $m+n-p=5$.', 'With $m+n$ counters on top and $p$ at the bottom: $m+n-p=5$.'), isSolved: (state) => tokensNet(state) === 5 },
    { id: 36102, prompt: say('Lortu emaitza $1$ izatea, zenbakitzailean fitxak daudela.', 'Consigue que el resultado sea $1$ habiendo fichas arriba.', 'اجعل النتيجة $1$ مع وجود رقاقات في البسط.', 'Get the result to be $1$ while there are counters on top.'), hint: say('Fitxa guztiak parekatu behar dira: $a^{0}=1$.', 'Todas las fichas deben emparejarse: $a^{0}=1$.', 'يجب أن تتقابل كل الرقاقات: $a^{0}=1$.', 'All the counters must pair up: $a^{0}=1$.'), isSolved: (state) => tokensNet(state) === 0 && state.m + state.n > 0 },
    { id: 36103, prompt: say('Lortu emaitza $a^{-3}=\\frac{1}{a^{3}}$ izatea.', 'Consigue que el resultado sea $a^{-3}=\\frac{1}{a^{3}}$.', 'اجعل النتيجة $a^{-3}=\\frac{1}{a^{3}}$.', 'Get the result to be $a^{-3}=\\frac{1}{a^{3}}$.'), hint: say('Hiru fitxa gehiago behar dituzu behean goian baino.', 'Necesitas tres fichas más abajo que arriba.', 'تحتاج إلى ثلاث رقاقات في الأسفل أكثر من الأعلى.', 'You need three more counters at the bottom than on top.'), isSolved: (state) => tokensNet(state) === -3 },
    { id: 36104, prompt: say('Lortu $a^{2}$ hiru kutxak $0$ ez direla.', 'Consigue $a^{2}$ con las tres cajas distintas de $0$.', 'احصل على $a^{2}$ والصناديق الثلاثة كلها غير $0$.', 'Get $a^{2}$ with the three boxes all different from $0$.'), hint: say('Adibidez, $m=3$, $n=2$ eta $p=3$.', 'Por ejemplo, $m=3$, $n=2$ y $p=3$.', 'مثلًا $m=3$ و$n=2$ و$p=3$.', 'For example, $m=3$, $n=2$ and $p=3$.'), isSolved: (state) => state.m > 0 && state.n > 0 && state.p > 0 && tokensNet(state) === 2 },
    { id: 36105, prompt: say('Lortu $a^{-1}$, $m=n$ izanik.', 'Consigue $a^{-1}$ con $m=n$.', 'احصل على $a^{-1}$ مع $m=n$.', 'Get $a^{-1}$ with $m=n$.'), hint: say('$2m-p=-1$, beraz $p=2m+1$.', '$2m-p=-1$, así que $p=2m+1$.', '$2m-p=-1$ إذن $p=2m+1$.', '$2m-p=-1$, so $p=2m+1$.'), isSolved: (state) => state.m === state.n && tokensNet(state) === -1 }
]

const exponentText = (exponent: number) => `$a^{${exponent}}$`

/** Endless practice: reach a given exponent. It never starts already solved. */
export const tokensExtra: LabChallengeMaker<TokensState> = (random) => {
    for (;;) {
        const target = randomInt(random, -4, 6)
        const m = randomInt(random, 0, 5)
        const n = randomInt(random, 0, 5)
        const p = m + n - target
        if (p < 0 || p > TOKEN_LIMITS.p) continue
        const solution = setTokens(initialTokensState, { m, n, p, base: pick(random, [0, 1, 2]) })
        if (tokensNet(initialTokensState) === target) continue
        return {
            prompt: say(`Lortu emaitza ${exponentText(target)} izatea.`, `Consigue que el resultado sea ${exponentText(target)}.`, `اجعل النتيجة ${exponentText(target)}.`, `Get the result to be ${exponentText(target)}.`),
            hint: say(`$m+n-p=${target}$: adibidez $m=${m}$, $n=${n}$, $p=${p}$.`, `$m+n-p=${target}$: por ejemplo $m=${m}$, $n=${n}$, $p=${p}$.`, `$m+n-p=${target}$: مثلًا $m=${m}$ و$n=${n}$ و$p=${p}$.`, `$m+n-p=${target}$: for example $m=${m}$, $n=${n}$, $p=${p}$.`),
            isSolved: (state) => tokensNet(state) === target,
            solution
        }
    }
}
