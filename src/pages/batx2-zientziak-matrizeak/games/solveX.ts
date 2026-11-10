import { shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J2 · Askatu X (Despeja la X): a matrix equation and four ways of writing
   X; only one is right. The wrong ones are the typical slips: A⁻¹ on the
   wrong side, a «division» or a subtraction instead of the inverse, the 1
   that should be I, the inverses of a product in the wrong order. Level 1:
   one matrix (AX = B, XA = B, AX + B = C…). Level 2: a common factor
   (AX + X = B → (A + I)X = B). Level 3: matrices on both sides of X. The
   tests check, with numbers, that only the right option solves the
   equation.
   ========================================================================== */

export const SOLVE_ROUNDS = 5

interface Template {
    equation: string
    right: string
    wrong: [string, string, string]
    why: LocalizedText
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const left = say('$A$ matrizea $X$ matrizearen ezkerrean dago: $A^{-1}$ ezkerretik biderkatzen da.', '$A$ está a la izquierda de $X$: se multiplica por $A^{-1}$ por la izquierda.', '$A$ على يسار $X$: نضرب في $A^{-1}$ من اليسار.', '$A$ is on the left of $X$: multiply by $A^{-1}$ on the left.')
const right = say('$A$ matrizea $X$ matrizearen eskuinean dago: $A^{-1}$ eskuinetik biderkatzen da.', '$A$ está a la derecha de $X$: se multiplica por $A^{-1}$ por la derecha.', '$A$ على يمين $X$: نضرب في $A^{-1}$ من اليمين.', '$A$ is on the right of $X$: multiply by $A^{-1}$ on the right.')
const factor = say('$X=IX$ idatzi eta atera $X$ faktore komun gisa: $I$, ez 1.', 'Escribe $X=IX$ y saca $X$ factor común: $I$, no 1.', 'اكتب $X=IX$ وأخرج $X$ عاملًا مشتركًا: $I$ لا 1.', 'Write $X=IX$ and take $X$ out as a common factor: $I$, not 1.')
const both = say('Biderkatu ezkerretik ezkerrekoaren alderantzizkoaz, eta eskuinetik eskuinekoarenaz.', 'Multiplica por la izquierda por la inversa de la de la izquierda, y por la derecha por la de la derecha.', 'اضرب من اليسار في معكوس التي على اليسار، ومن اليمين في معكوس التي على اليمين.', 'Multiply on the left by the inverse of the left one, and on the right by that of the right one.')

export const SOLVE_TEMPLATES: Template[][] = [
    [
        { equation: 'AX=B', right: 'X=A^{-1}B', wrong: ['X=BA^{-1}', 'X=B-A', 'X=\\frac{B}{A}'], why: left },
        { equation: 'XA=B', right: 'X=BA^{-1}', wrong: ['X=A^{-1}B', 'X=B-A', 'X=BA'], why: right },
        { equation: 'AX+B=C', right: 'X=A^{-1}(C-B)', wrong: ['X=(C-B)A^{-1}', 'X=A^{-1}C-B', 'X=A^{-1}(C+B)'], why: left },
        { equation: 'XA-B=C', right: 'X=(B+C)A^{-1}', wrong: ['X=A^{-1}(B+C)', 'X=(C-B)A^{-1}', 'X=CA^{-1}+B'], why: right },
        { equation: '2X+A=B', right: 'X=\\frac{1}{2}(B-A)', wrong: ['X=2(B-A)', 'X=\\frac{1}{2}(A-B)', 'X=\\frac{1}{2}B-A'], why: say('Hemen ez dago alderantzizkorik: pasatu $A$ beste aldera eta zatitu 2 zenbakiaz.', 'Aquí no hace falta inversa: pasa $A$ al otro lado y divide entre 2.', 'لا حاجة هنا إلى معكوس: انقل $A$ إلى الطرف الآخر واقسم على 2.', 'No inverse needed here: move $A$ to the other side and divide by 2.') }
    ],
    [
        { equation: 'AX+X=B', right: 'X=(A+I)^{-1}B', wrong: ['X=(A+1)^{-1}B', 'X=B(A+I)^{-1}', 'X=A^{-1}B-I'], why: factor },
        { equation: 'XA-X=B', right: 'X=B(A-I)^{-1}', wrong: ['X=(A-I)^{-1}B', 'X=B(A-1)^{-1}', 'X=BA^{-1}+I'], why: factor },
        { equation: 'AX=2X+B', right: 'X=(A-2I)^{-1}B', wrong: ['X=(A+2I)^{-1}B', 'X=(A-2)^{-1}B', 'X=B(A-2I)^{-1}'], why: factor },
        { equation: 'XA+2X=B', right: 'X=B(A+2I)^{-1}', wrong: ['X=(A+2I)^{-1}B', 'X=B(A+2)^{-1}', 'X=B(A-2I)^{-1}'], why: factor },
        { equation: 'AX-X=B', right: 'X=(A-I)^{-1}B', wrong: ['X=(A-1)^{-1}B', 'X=B(A-I)^{-1}', 'X=(A+I)^{-1}B'], why: factor }
    ],
    [
        { equation: 'AXB=C', right: 'X=A^{-1}CB^{-1}', wrong: ['X=B^{-1}CA^{-1}', 'X=CA^{-1}B^{-1}', 'X=A^{-1}B^{-1}C'], why: both },
        { equation: 'AXA=B', right: 'X=A^{-1}BA^{-1}', wrong: ['X=(A^{-1})^2B', 'X=B(A^{-1})^2', 'X=ABA'], why: both },
        { equation: 'AX=BA', right: 'X=A^{-1}BA', wrong: ['X=B', 'X=ABA^{-1}', 'X=A^{-1}B^{-1}A'], why: left },
        { equation: 'XAB=C', right: 'X=CB^{-1}A^{-1}', wrong: ['X=CA^{-1}B^{-1}', 'X=A^{-1}B^{-1}C', 'X=B^{-1}A^{-1}C'], why: say('$(AB)^{-1}=B^{-1}A^{-1}$: ordena aldatzen da.', '$(AB)^{-1}=B^{-1}A^{-1}$: el orden cambia.', '$(AB)^{-1}=B^{-1}A^{-1}$: يتغيّر الترتيب.', '$(AB)^{-1}=B^{-1}A^{-1}$: the order changes.') },
        { equation: 'ABX=C', right: 'X=B^{-1}A^{-1}C', wrong: ['X=A^{-1}B^{-1}C', 'X=CB^{-1}A^{-1}', 'X=CA^{-1}B^{-1}'], why: say('Lehenik $A^{-1}$ ezkerretik, gero $B^{-1}$: $X=B^{-1}A^{-1}C$.', 'Primero $A^{-1}$ por la izquierda, después $B^{-1}$: $X=B^{-1}A^{-1}C$.', 'أولًا $A^{-1}$ من اليسار ثم $B^{-1}$: $X=B^{-1}A^{-1}C$.', 'First $A^{-1}$ on the left, then $B^{-1}$: $X=B^{-1}A^{-1}C$.') }
    ]
]

export interface SolveRound {
    level: number
    equation: string
    options: string[]
    answer: number
    why: LocalizedText
}

/** Every template of the level once, in a new order, with its options shuffled */
export function createSolveRounds(random: Random, level: number): SolveRound[] {
    const templates = SOLVE_TEMPLATES[level] ?? SOLVE_TEMPLATES[0]
    return shuffle(random, templates).slice(0, SOLVE_ROUNDS).map((template) => {
        const options = shuffle(random, [template.right, ...template.wrong])
        return { level, equation: template.equation, options, answer: options.indexOf(template.right), why: template.why }
    })
}
