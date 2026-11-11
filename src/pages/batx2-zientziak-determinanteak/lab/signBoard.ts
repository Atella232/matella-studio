import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { cofactor, cofactorSign, det } from '../determinant.ts'

/* ==========================================================================
   L3 · Zeinuen taula (El tablero de signos): a 3 × 3 or 4 × 4 determinant
   with the chessboard of cofactor signs. The learner picks the row or
   column to expand along and predicts how many cofactors it needs (1, 2,
   3 or more): a 0 in the line saves one. Then the terms a·A are shown,
   each cofactor with its sign, and their sum, which is the same for every
   line. The line with most zeros is the one to choose.
   ========================================================================== */

export type LineKind = 'row' | 'column'
export interface Line { kind: LineKind; index: number }

export interface SignBoardState {
    preset: number
    line: Line
    prediction: Prediction | null
    /** The lines whose expansion has been shown, as «row-0», «column-2» */
    tried: string[]
}

export const SIGN_PRESETS: number[][][] = [
    [[1, 0, 2], [4, 0, 3], [2, 5, 1]],
    [[2, 1, 0], [0, 3, 0], [4, 1, 2]],
    [[1, 0, 2, 3], [0, 0, 4, 0], [2, 1, 0, 1], [3, 0, 1, 2]],
    [[1, 2, 3], [4, 5, 6], [7, 8, 10]]
]
export const SIGN_NAMES = ['A', 'B', 'C', 'D'] as const

export const lineKey = (line: Line) => `${line.kind}-${line.index}`
export const loadSignPreset = (preset: number): SignBoardState => ({ preset, line: { kind: 'row', index: 0 }, prediction: null, tried: [] })
export const initialSignBoardState = loadSignPreset(0)

const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator
export const sizeOfPreset = (preset: number) => SIGN_PRESETS[preset].length
export const presetDet = (preset: number) => value(det(SIGN_PRESETS[preset]))

/** The entries of a line, with their places */
export function lineEntries(preset: number, line: Line): Array<{ row: number; column: number; entry: number }> {
    const matrix = SIGN_PRESETS[preset]
    return matrix.map((_, k) => {
        const row = line.kind === 'row' ? line.index : k
        const column = line.kind === 'row' ? k : line.index
        return { row, column, entry: matrix[row][column] }
    })
}

/** The terms a·A of the expansion along a line (the zeros included, with their cofactor) */
export function expansion(preset: number, line: Line): Array<{ row: number; column: number; entry: number; sign: 1 | -1; cofactor: number }> {
    return lineEntries(preset, line).map(({ row, column, entry }) => ({ row, column, entry, sign: cofactorSign(row, column) as 1 | -1, cofactor: value(cofactor(SIGN_PRESETS[preset], row, column)) }))
}

/** How many cofactors the line needs: one per entry that is not 0 */
export const cofactorsNeeded = (preset: number, line: Line) => lineEntries(preset, line).filter(({ entry }) => entry !== 0).length
export const currentCount = (state: Pick<SignBoardState, 'preset' | 'line'>) => cofactorsNeeded(state.preset, state.line)
/** 1, 2, or 3 and more */
export const signBoardPrediction = (state: SignBoardState): Prediction => compareTo(Math.min(currentCount(state), 3), 2)

export const allLines = (preset: number): Line[] => (['row', 'column'] as const).flatMap((kind) => Array.from({ length: sizeOfPreset(preset) }, (_, index) => ({ kind, index })))
export const fewestCofactors = (preset: number) => Math.min(...allLines(preset).map((line) => cofactorsNeeded(preset, line)))

export function chooseSignPreset(state: SignBoardState, preset: number): SignBoardState {
    return preset === state.preset ? state : loadSignPreset(preset)
}
export function chooseLine(state: SignBoardState, line: Line): SignBoardState {
    const index = Math.min(sizeOfPreset(state.preset) - 1, Math.max(0, line.index))
    if (line.kind === state.line.kind && index === state.line.index) return state
    return { ...state, line: { kind: line.kind, index }, prediction: null }
}
/** Making the prediction shows the expansion along this line */
export const markTried = (state: SignBoardState): SignBoardState => {
    const key = lineKey(state.line)
    return state.tried.includes(key) ? state : { ...state, tried: [...state.tried, key] }
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const signBoardChallenges: LabChallenge<SignBoardState>[] = [
    { id: 117201, prompt: say('A determinantean, aukeratu adjuntu bakarra behar duen lerroa.', 'En A, elige la línea que necesita un solo adjunto.', 'في A اختر الخط الذي يحتاج إلى متمم جبري واحد فقط.', 'In A, choose the line that needs only one cofactor.'), hint: say('Bilatu bi zero dituen lerroa: errenkada edo zutabea izan daiteke.', 'Busca la línea con dos ceros: puede ser una fila o una columna.', 'ابحث عن الخط الذي فيه صفران: قد يكون صفًّا أو عمودًا.', 'Look for the line with two zeros: it can be a row or a column.'), isSolved: (state) => state.preset === 0 && currentCount(state) === 1 },
    { id: 117202, prompt: say('B determinantean, aurkitu adjuntu bakarra behar duen errenkada bat.', 'En B, encuentra una fila que necesite un solo adjunto.', 'في B أوجد صفًّا يحتاج إلى متمم جبري واحد فقط.', 'In B, find a row that needs only one cofactor.'), hint: say('Errenkada bat, ez zutabe bat.', 'Una fila, no una columna.', 'صفّ لا عمود.', 'A row, not a column.'), isSolved: (state) => state.preset === 1 && state.line.kind === 'row' && currentCount(state) === 1 },
    { id: 117203, prompt: say('B determinantean, aurkitu adjuntu bakarra behar duen zutabe bat.', 'En B, encuentra una columna que necesite un solo adjunto.', 'في B أوجد عمودًا يحتاج إلى متمم جبري واحد فقط.', 'In B, find a column that needs only one cofactor.'), hint: say('Begiratu goitik behera: zein zutabek ditu bi zero?', 'Mira de arriba abajo: ¿qué columna tiene dos ceros?', 'انظر من الأعلى إلى الأسفل: أي عمود فيه صفران؟', 'Look from top to bottom: which column has two zeros?'), isSolved: (state) => state.preset === 1 && state.line.kind === 'column' && currentCount(state) === 1 },
    { id: 117204, prompt: say('C determinantean (4. ordena), aukeratu adjuntu bakarra behar duen lerro bat.', 'En C (orden 4), elige una línea que necesite un solo adjunto.', 'في C (الرتبة 4) اختر خطًّا يحتاج إلى متمم جبري واحد فقط.', 'In C (order 4), choose a line that needs only one cofactor.'), hint: say('Hiru zero dituen lerroa. Bi daude.', 'La línea con tres ceros. Hay dos.', 'الخط الذي فيه ثلاثة أصفار. يوجد اثنان.', 'The line with three zeros. There are two.'), isSolved: (state) => state.preset === 2 && currentCount(state) === 1 },
    { id: 117205, prompt: say('D determinantean, garatu bi lerro desberdinen arabera, eta egiaztatu emaitza bera dela.', 'En D, desarrolla por dos líneas distintas y comprueba que sale lo mismo.', 'في D انشر حسب خطين مختلفين وتحقق أن النتيجة واحدة.', 'In D, expand along two different lines and check that you get the same.'), hint: say('Iragarri lerro batean, aldatu lerroa eta iragarri berriro.', 'Predice en una línea, cambia de línea y predice otra vez.', 'توقّع في خط، ثم غيّر الخط وتوقّع من جديد.', 'Predict on one line, change line and predict again.'), isSolved: (state) => state.preset === 3 && state.tried.length >= 2 }
]

const kindWords: Record<LineKind, LocalizedText> = {
    row: say('errenkada', 'fila', 'صفًّا', 'row'),
    column: say('zutabe', 'columna', 'عمودًا', 'column')
}

/** Endless practice: the line with fewest cofactors, or a row or a column with a given number of them */
const signBoardMaker: LabChallengeMaker<SignBoardState> = (random) => {
    const preset = randomInt(random, 0, SIGN_PRESETS.length - 1)
    const name = SIGN_NAMES[preset]
    if (randomInt(random, 0, 2) === 0) {
        const fewest = fewestCofactors(preset)
        const line = pick(random, allLines(preset).filter((item) => cofactorsNeeded(preset, item) === fewest))
        return {
            prompt: say(`${name} determinantean, aukeratu adjuntu gutxien behar dituen lerroa.`, `En ${name}, elige la línea que necesita menos adjuntos.`, `في ${name} اختر الخط الذي يحتاج إلى أقل عدد من المتممات الجبرية.`, `In ${name}, choose the line that needs the fewest cofactors.`),
            hint: say('Zenbat eta zero gehiago, orduan eta adjuntu gutxiago.', 'Cuantos más ceros, menos adjuntos.', 'كلما زادت الأصفار قلّت المتممات الجبرية.', 'The more zeros, the fewer cofactors.'),
            isSolved: (state) => state.preset === preset && currentCount(state) === fewest,
            solution: { preset, line, prediction: null, tried: [] }
        }
    }
    const line = pick(random, allLines(preset))
    const count = cofactorsNeeded(preset, line)
    const kind = kindWords[line.kind]
    return {
        prompt: say(
            `${name} determinantean, aurkitu ${count === 1 ? 'adjuntu bakarra behar duen' : `${count} adjuntu behar dituen`} ${kind.eu} bat.`,
            `En ${name}, encuentra una ${kind.es} que necesite ${count === 1 ? 'un solo adjunto' : `${count} adjuntos`}.`,
            `في ${name} أوجد ${kind.ar} يحتاج إلى ${count === 1 ? 'متمم جبري واحد' : count === 2 ? 'متممين جبريين' : `${count} من المتممات الجبرية`}.`,
            `In ${name}, find a ${kind.en} that needs ${count === 1 ? 'only one cofactor' : `${count} cofactors`}.`
        ),
        hint: say('Zenbatu lerroko zenbakiak, zeroak izan ezik.', 'Cuenta los números de la línea que no son 0.', 'عُدّ أعداد الخط التي ليست صفرًا.', 'Count the numbers in the line that are not 0.'),
        isSolved: (state) => state.preset === preset && state.line.kind === line.kind && currentCount(state) === count,
        solution: { preset, line, prediction: null, tried: [] }
    }
}

export const signBoardExtra = freshFrom(initialSignBoardState, signBoardMaker)
