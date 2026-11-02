import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import {
    binomialLatex, createDivisibleRounds, createHuntRounds, createSimplifyRounds, DIVISIBLE_ROUNDS, divisibleStars, divisorsOf, factoredLatex, HUNT_MISSES, HUNT_ROUNDS, huntStars, K_MAX, K_MIN,
    patternLatex, polyLatex, ruffini, SIMPLIFY_ROUNDS, simplifyStars, withK, type Coefficients, type DivisibleRound, type HuntRound, type SimplifyRound
} from './polynomials'
import './Dbh4Games.css'

/* ==========================================================================
   The polynomial games of 4. DBH: the root hunt (both tracks), divisible by
   x − a (applied) and simplify the fraction (academic), all in the shared
   RoundGame.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))

/** A Ruffini table: the coefficients, the root, the products and the results */
function RuffiniTable({ coefficients, root }: { coefficients: Coefficients; root: number }) {
    const { row, remainder } = ruffini(coefficients, root)
    const products = [null, ...row.slice(0, -1).map((value) => value * root)]
    return (
        <table className="dbh4-ruffini" dir="ltr">
            <tbody>
                <tr><th />{coefficients.map((coefficient, index) => <td key={index}>{signed(coefficient)}</td>)}</tr>
                <tr><th>{signed(root)}</th>{products.map((product, index) => <td key={index}>{product === null ? '' : signed(product)}</td>)}</tr>
                <tr className="result"><th />{row.map((value, index) => <td key={index} className={index === row.length - 1 ? (remainder === 0 ? 'zero' : 'rest') : ''}>{signed(value)}</td>)}</tr>
            </tbody>
        </table>
    )
}

/* ---------- The root hunt ---------- */

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<HuntRound>) {
    const l = useGameText(language)
    const [rest, setRest] = useState<Coefficients>(round.coefficients)
    const [found, setFound] = useState<number[]>([])
    const [missed, setMissed] = useState<number[]>([])
    const [last, setLast] = useState<{ coefficients: Coefficients; root: number } | null>(null)
    const done = rest.length <= 2
    const lost = missed.length > HUNT_MISSES

    const finishIfDone = (nextRest: Coefficients, nextMissed: number[]) => {
        if (nextRest.length <= 2) onAnswer(nextMissed.length <= HUNT_MISSES)
        else if (nextMissed.length > HUNT_MISSES) onAnswer(false)
    }
    const tryRoot = (candidate: number) => {
        if (answered || done || lost) return
        const { quotient, remainder } = ruffini(rest, candidate)
        setLast({ coefficients: rest, root: candidate })
        if (remainder === 0) {
            const nextFound = [...found, candidate]
            setRest(quotient)
            setFound(nextFound)
            finishIfDone(quotient, missed)
        } else {
            const nextMissed = [...missed, candidate]
            setMissed(nextMissed)
            finishIfDone(rest, nextMissed)
        }
    }
    const current = `${found.map((root) => `(${binomialLatex(root)})`).join('')}${rest.length > 1 ? (found.length > 0 ? `(${polyLatex(rest)})` : polyLatex(rest)) : ''}`
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Faktorizatu Ruffini erabiliz:', 'Factoriza con Ruffini:', 'حلّل باستعمال روفيني:', 'Factorise with Ruffini:'))}
                <strong>{formula(polyLatex(round.coefficients), language)}</strong>
            </p>
            {found.length > 0 && <p className="dbh4-readout" dir="ltr">{formula(current, language)}</p>}
            {!answered && (
                <div className="dbh4-candidates" dir="ltr" role="group" aria-label={l(say('Hautagaiak', 'Candidatos', 'المرشحون', 'Candidates'))}>
                    {divisorsOf(rest[rest.length - 1]).map((candidate) => (
                        <button key={candidate} type="button" disabled={missed.includes(candidate)} className={missed.includes(candidate) ? 'missed' : found.includes(candidate) ? 'found' : ''} onClick={() => tryRoot(candidate)}>{signed(candidate)}</button>
                    ))}
                </div>
            )}
            {last && <RuffiniTable coefficients={last.coefficients} root={last.root} />}
            {!answered && <p className="dbh4-hint">{l(say(`Hutsegiteak: ${missed.length} (gehienez ${HUNT_MISSES})`, `Fallos: ${missed.length} (como mucho ${HUNT_MISSES})`, `الأخطاء: ${missed.length} (على الأكثر ${HUNT_MISSES})`, `Misses: ${missed.length} (at most ${HUNT_MISSES})`))}</p>}
            {answered && (
                <RoundVerdict right={missed.length <= HUNT_MISSES} language={language}>
                    {formula(`${polyLatex(round.coefficients)}=${factoredLatex(round.leading, round.roots)}`, language)}
                </RoundVerdict>
            )}
        </>
    )
}

function huntConfig(game: GameInfo, art: ReactNode): RoundGameConfig<HuntRound> {
    return {
        game,
        art,
        rounds: HUNT_ROUNDS,
        rules: [
            say('Erro osoak gai askearen zatitzaileen artean daude: probatu Ruffinirekin.', 'Las raíces enteras están entre los divisores del término independiente: pruébalas con Ruffini.', 'الجذور الصحيحة بين قواسم الحد الثابت: جرّبها بروفيني.', 'The whole roots are among the divisors of the constant term: try them with Ruffini.'),
            say('Hondarra 0 bada, erroa da; probatu berriro: erro bera bi aldiz egon daiteke.', 'Si el resto es 0, es raíz; vuelve a probar: una raíz puede repetirse.', 'إذا كان الباقي 0 فهو جذر؛ جرّب مجددًا: قد يتكرر الجذر.', 'If the remainder is 0, it is a root; try again: a root can repeat.'),
            say(`Asmatzeko, gehienez hutsegite ${HUNT_MISSES}.`, `Para acertar, como mucho ${HUNT_MISSES} fallo.`, `للنجاح خطأ واحد على الأكثر.`, `To win, at most ${HUNT_MISSES} miss.`)
        ],
        create: createHuntRounds,
        stars: huntStars,
        starsNote: say('3 izar: 4 · 2 izar: 3 · izar 1: 2', '3 estrellas: 4 · 2: 3 · 1: 2', '3 نجوم: 4 · 2: 3 · 1: 2', '3 stars: 4 · 2: 3 · 1: 2'),
        Round: HuntPlay
    }
}

export function RootHuntGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return <RoundGame {...props} config={huntConfig(game, art)} />
}

/* ---------- Divisible by x − a ---------- */

function DivisiblePlay({ round, language, onAnswer, answered }: RoundProps<DivisibleRound>) {
    const l = useGameText(language)
    const [k, setK] = useState(0)
    const set = (value: number) => !answered && setK(Math.max(K_MIN, Math.min(K_MAX, Math.round(value))))
    const right = k === round.k
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Aurkitu k, polinomioa zatigarria izan dadin:', 'Halla k para que el polinomio sea divisible:', 'أوجد k ليكون كثير الحدود قابلًا للقسمة:', 'Find k so that the polynomial is divisible:'))}
                <strong>{formula(`(${patternLatex(round.pattern)})\\div(${binomialLatex(round.root)})`, language)}</strong>
            </p>
            {!answered && (
                <div className="solids2-controls">
                    <input type="range" min={K_MIN} max={K_MAX} value={k} onChange={(event) => set(Number(event.target.value))} aria-label="k" />
                    <Stepper label="k" value={k} min={K_MIN} max={K_MAX} format={signed} onChange={set} language={language} />
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Zatitu', 'Divide', 'اقسم', 'Divide'))}</button>
                </div>
            )}
            {answered && <RuffiniTable coefficients={withK(round, k)} root={round.root} />}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(`k=${round.k}`, language)}{' '}
                    {l(say('Hondarraren teorema:', 'Teorema del resto:', 'مبرهنة الباقي:', 'Remainder theorem:'))} {formula(`P(${round.root})=0`, language)}
                </RoundVerdict>
            )}
        </>
    )
}

function divisibleConfig(game: GameInfo, art: ReactNode): RoundGameConfig<DivisibleRound> {
    return {
        game,
        art,
        rounds: DIVISIBLE_ROUNDS,
        rules: [
            say('$P(x)$ zatigarria da $x-a$ binomioaz hondarra 0 denean, hau da, $P(a)=0$ denean.', '$P(x)$ es divisible entre $x-a$ si el resto es 0, es decir, si $P(a)=0$.', 'يقبل $P(x)$ القسمة على $x-a$ إذا كان الباقي 0، أي $P(a)=0$.', '$P(x)$ is divisible by $x-a$ when the remainder is 0, that is, when $P(a)=0$.'),
            say('Aukeratu k eta zatitu: orduan ikusiko duzu Ruffiniren taula.', 'Elige k y divide: entonces verás la tabla de Ruffini.', 'اختر k واقسم: عندها سترى جدول روفيني.', 'Choose k and divide: then you will see the Ruffini table.'),
            say(`${DIVISIBLE_ROUNDS} polinomio maila bakoitzean.`, `${DIVISIBLE_ROUNDS} polinomios por nivel.`, `${DIVISIBLE_ROUNDS} كثيرات حدود في كل مستوى.`, `${DIVISIBLE_ROUNDS} polynomials per level.`)
        ],
        create: createDivisibleRounds,
        stars: divisibleStars,
        starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
        Round: DivisiblePlay
    }
}

export function DivisibleGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return <RoundGame {...props} config={divisibleConfig(game, art)} />
}

/* ---------- Simplify the fraction ---------- */

function SimplifyPlay({ round, language, onAnswer, answered }: RoundProps<SimplifyRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.right)
    }
    const lead = round.denominator[0]
    const factored = `\\frac{(${binomialLatex(round.common)})(${binomialLatex(round.top)})}{${lead === 1 ? '' : lead}(${binomialLatex(round.common)})(${binomialLatex(round.bottom)})}`
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Sinplifikatu:', 'Simplifica:', 'بسّط:', 'Simplify:'))}
                <strong>{formula(`\\frac{${polyLatex(round.numerator)}}{${polyLatex(round.denominator)}}`, language)}</strong>
            </p>
            <div className="prop3-options dbh4-fractions" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : index === round.right ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.right} language={language}>
                    {formula(factored, language)}{' '}
                    {l(say('Faktoreak bakarrik sinplifikatzen dira.', 'Solo se simplifican factores.', 'لا تُختصر إلا العوامل.', 'Only factors cancel.'))}
                </RoundVerdict>
            )}
        </>
    )
}

function simplifyConfig(game: GameInfo, art: ReactNode): RoundGameConfig<SimplifyRound> {
    return {
        game,
        art,
        rounds: SIMPLIFY_ROUNDS,
        rules: [
            say('Faktorizatu zenbakitzailea eta izendatzailea, eta sinplifikatu faktore komuna.', 'Factoriza numerador y denominador, y simplifica el factor común.', 'حلّل البسط والمقام واختصر العامل المشترك.', 'Factorise the numerator and the denominator, and cancel the common factor.'),
            say('Kontuz: batugaiak ezin dira sinplifikatu.', 'Cuidado: los sumandos no se pueden simplificar.', 'انتبه: لا تُختصر الحدود المجموعة.', 'Careful: terms of a sum cannot be cancelled.'),
            say(`${SIMPLIFY_ROUNDS} zatiki maila bakoitzean.`, `${SIMPLIFY_ROUNDS} fracciones por nivel.`, `${SIMPLIFY_ROUNDS} كسور في كل مستوى.`, `${SIMPLIFY_ROUNDS} fractions per level.`)
        ],
        create: createSimplifyRounds,
        stars: simplifyStars,
        starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
        Round: SimplifyPlay
    }
}

export function SimplifyGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return <RoundGame {...props} config={simplifyConfig(game, art)} />
}

/** The art of the three games */
export function PolynomialArt({ game }: { game: 'hunt' | 'divisible' | 'simplify' }) {
    if (game === 'simplify') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="48" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">(x−2)(x+3)</text>
                <line x1="40" y1="60" x2="180" y2="60" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="110" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">(x−2)(x−1)</text>
                <line x1="44" y1="54" x2="96" y2="34" stroke="var(--coral)" strokeWidth="3" />
                <line x1="44" y1="96" x2="96" y2="76" stroke="var(--coral)" strokeWidth="3" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="56" y1="20" x2="56" y2="100" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="40" y1="74" x2="200" y2="74" stroke="var(--ink)" strokeWidth="2.5" />
            {['1', '−6', '11', '−6'].map((value, index) => <text key={index} x={78 + index * 36} y="40" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{value}</text>)}
            {['1', '−5', '6', '0'].map((value, index) => <text key={index} x={78 + index * 36} y="96" textAnchor="middle" fontSize="15" fontWeight="700" fill={index === 3 ? 'var(--success, #267b53)' : 'var(--ink)'} direction="ltr">{value}</text>)}
            <text x="36" y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--coral)" direction="ltr">{game === 'divisible' ? 'k?' : '1'}</text>
        </svg>
    )
}
