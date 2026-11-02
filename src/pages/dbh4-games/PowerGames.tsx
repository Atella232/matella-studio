import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { standardStars } from './equations'
import { argumentLatex, createLogRounds, createRadicalRounds, EXPONENT_STEPS, exponentLatex, exponentValue, expressionLatex, LOG_ROUNDS, logQuestionLatex, primeFactors, RADICAL_ROUNDS, radicalLatex, simplify, type Exponent, type LogRound, type RadicalRound } from './radicals'
import './Dbh4Games.css'

/* ==========================================================================
   Simplify the radical and Find the exponent (4. DBH academic powers):
   the answer is set first; then the prime factors leave the root in
   groups, or the ladder of powers shows where the logarithm lands.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const GROUP_COLOURS = ['#fbebc0', '#d9efe2', '#dde7f7', '#f6d5cc']

/* ---------- Simplify the radical ---------- */

/** The prime factors of one radicand inside a root sign, the groups of n coloured and copied outside */
function FactorRow({ radicand, index, y }: { radicand: number; index: number; y: number }) {
    const factors = primeFactors(radicand)
    // Each group of `index` equal factors gets a colour; the rest stay plain
    const colours: Array<string | null> = factors.map(() => null)
    const outside: Array<[number, string]> = []
    let start = 0
    while (start < factors.length) {
        let end = start
        while (end < factors.length && factors[end] === factors[start]) end += 1
        for (let group = 0; group + index <= end - start; group += index) {
            const colour = GROUP_COLOURS[outside.length % GROUP_COLOURS.length]
            for (let place = 0; place < index; place += 1) colours[start + group + place] = colour
            outside.push([factors[start], colour])
        }
        start = end
    }
    const tile = 26
    const left = 8 + outside.length * (tile + 4) + 18
    return (
        <g>
            {outside.map(([prime, colour], position) => (
                <g key={position}>
                    <rect x={8 + position * (tile + 4)} y={y} width={tile} height={tile} rx="6" fill={colour} stroke={INK} strokeWidth="1.6" />
                    <text x={8 + position * (tile + 4) + tile / 2} y={y + 18} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{prime}</text>
                </g>
            ))}
            <path d={`M ${left - 16} ${y + 16} L ${left - 11} ${y + 13} L ${left - 5} ${y + tile + 4} L ${left + 1} ${y - 5} L ${left + factors.length * (tile + 3) + 4} ${y - 5}`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
            {index > 2 && <text x={left - 14} y={y + 6} fontSize="11" fontWeight="700" fill={INK}>{index}</text>}
            {factors.map((prime, position) => (
                <g key={position} opacity={colours[position] ? 0.55 : 1}>
                    <rect x={left + 4 + position * (tile + 3)} y={y} width={tile} height={tile} rx="6" fill={colours[position] ?? 'var(--card, #fffcf6)'} stroke={INK} strokeWidth="1.6" strokeDasharray={colours[position] ? '3 2' : undefined} />
                    <text x={left + 4 + position * (tile + 3) + tile / 2} y={y + 18} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{prime}</text>
                </g>
            ))}
        </g>
    )
}

function RadicalPlay({ round, language, onAnswer, answered }: RoundProps<RadicalRound>) {
    const l = useGameText(language)
    const [outside, setOutside] = useState(1)
    const [inside, setInside] = useState(round.terms[0].radicand)
    const right = outside === round.outside && inside === round.inside
    const largest = Math.max(...round.terms.map((term) => term.radicand))
    const steps = round.terms.map((term) => {
        const simple = simplify(term.radicand, round.index)
        return `${term.coefficient === 1 ? '' : `${term.coefficient}\\cdot `}${radicalLatex(round.index, 1, term.radicand)}=${radicalLatex(round.index, term.coefficient * simple.outside, simple.inside)}`
    })
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Sinplifikatu:', 'Simplifica:', 'بسّط:', 'Simplify:'))}
                <strong className="dbh4-big-formula">{formula(expressionLatex(round), language)}</strong>
            </p>
            {answered && (
                <svg className="dbh4-scene dbh4-scene-short" viewBox={`0 0 320 ${round.terms.length * 46 + 16}`} direction="ltr" aria-hidden="true">
                    {round.terms.map((term, position) => <FactorRow key={position} radicand={term.radicand} index={round.index} y={16 + position * 46} />)}
                </svg>
            )}
            <p className="dbh4-readout" dir="ltr">{formula(`${expressionLatex(round)}=${radicalLatex(round.index, outside, inside)}`, language)}</p>
            {!answered && (
                <>
                    {/* In the order of a·ⁿ√b, also in Arabic */}
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={l(say('Kanpoan', 'Fuera', 'خارج الجذر', 'Outside'))} value={outside} min={1} max={60} onChange={setOutside} language={language} />
                        <Stepper label={l(say('Barruan', 'Dentro', 'داخل الجذر', 'Inside'))} value={inside} min={1} max={largest} onChange={setInside} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {steps.map((step, position) => <span key={position} className="dbh4-worked">{formula(step, language)}</span>)}
                    {round.terms.length > 1 && <span className="dbh4-worked">{formula(`${expressionLatex(round)}=${radicalLatex(round.index, round.outside, round.inside)}`, language)}</span>}
                    {l(round.index === 2
                        ? say('Bikote bakoitzetik faktore bat ateratzen da errotik.', 'De cada pareja sale un factor fuera de la raíz.', 'من كل زوج يخرج عامل من الجذر.', 'From each pair, one factor comes out of the root.')
                        : say(`${round.index} faktore berdineko talde bakoitzetik bat ateratzen da.`, `De cada grupo de ${round.index} factores iguales sale uno.`, `من كل مجموعة من ${round.index} عوامل متساوية يخرج عامل واحد.`, `From each group of ${round.index} equal factors, one comes out.`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function RadicalGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RADICAL_ROUNDS,
                rules: [
                    say('Deskonposatu errokizuna faktore lehenetan.', 'Descompón el radicando en factores primos.', 'حلّل ما تحت الجذر إلى عوامل أولية.', 'Break the radicand into prime factors.'),
                    say('Erro karratuan, bikote bakoitzetik faktore bat ateratzen da; erro kubikoan, hirukote bakoitzetik.', 'En la raíz cuadrada sale un factor de cada pareja; en la cúbica, de cada trío.', 'في الجذر التربيعي يخرج عامل من كل زوج، وفي التكعيبي من كل ثلاثة.', 'In a square root one factor comes out of each pair; in a cube root, of each three.'),
                    say('Batuketetan, sinplifikatu gai bakoitza eta batu errokizun bera dutenak.', 'En las sumas, simplifica cada término y suma los de igual radicando.', 'في الجمع بسّط كل حد واجمع ما له نفس ما تحت الجذر.', 'In sums, simplify each term and add those with the same radicand.')
                ],
                create: createRadicalRounds,
                stars: standardStars(RADICAL_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: RadicalPlay
            }}
        />
    )
}

/* ---------- Find the exponent ---------- */

const sameExponent = (a: Exponent, b: Exponent) => Math.abs(exponentValue(a) - exponentValue(b)) < 1e-9

function LogPlay({ round, language, onAnswer, answered }: RoundProps<LogRound>) {
    const l = useGameText(language)
    const zero = EXPONENT_STEPS.findIndex(([numerator]) => numerator === 0)
    const [step, setStep] = useState(zero)
    const [base, setBase] = useState(1)
    const [power, setPower] = useState(0)
    const exponent = EXPONENT_STEPS[step]
    const right = round.unknown === 'exponent' ? sameExponent(exponent, round.exponent) : round.unknown === 'base' ? base === round.base : power === round.exponent[0]
    const answerLatex = round.unknown === 'exponent'
        ? `\\log_{${round.base}}${argumentLatex(round.base, round.exponent)}=${exponentLatex(exponent)}`
        : round.unknown === 'base'
            ? `x=${base}`
            : `x=${round.base ** power}`
    // The ladder: the powers of the base around the answer (for the base, the same power of 2, 3, 4…)
    const rungs: Array<{ latex: string; mark: 'right' | 'chosen' | null }> = round.unknown === 'base'
        ? [2, 3, 4, 5, 6, 10].map((candidate) => ({ latex: `${candidate}^{${exponentLatex(round.exponent)}}=${candidate ** exponentValue(round.exponent)}`, mark: candidate === round.base ? 'right' : candidate === base ? 'chosen' : null }))
        : (round.unknown === 'argument' ? Array.from({ length: 7 }, (_, k) => [k, 1] as Exponent) : EXPONENT_STEPS.filter(([, denominator]) => denominator === 1 || round.exponent[1] === denominator))
            .filter((candidate) => Math.abs(exponentValue(candidate) - exponentValue(round.exponent)) <= 3)
            .map((candidate) => ({
                latex: `${round.base}^{${exponentLatex(candidate)}}=${argumentLatex(round.base, candidate)}`,
                mark: sameExponent(candidate, round.exponent) ? 'right' : (round.unknown === 'exponent' ? sameExponent(candidate, exponent) : candidate[0] === power) ? 'chosen' : null
            }))
    return (
        <>
            <p className="prop3-prompt">
                {round.unknown === 'exponent' ? l(say('Zein da logaritmoa?', '¿Cuánto vale el logaritmo?', 'ما قيمة اللوغاريتم؟', 'What is the logarithm?')) : l(say('Aurkitu x:', 'Halla x:', 'أوجد x:', 'Find x:'))}
                <strong className="dbh4-big-formula">{formula(logQuestionLatex(round), language)}</strong>
            </p>
            <p className="dbh4-readout" dir="ltr">{formula(answerLatex, language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers">
                        {round.unknown === 'exponent' && <Stepper label={l(say('Berretzailea', 'Exponente', 'الأس', 'Exponent'))} value={step} min={0} max={EXPONENT_STEPS.length - 1} format={(value) => { const [numerator, denominator] = EXPONENT_STEPS[value]; return denominator === 1 ? String(numerator).replace('-', '−') : `${numerator < 0 ? '−' : ''}${Math.abs(numerator)}/${denominator}` }} onChange={setStep} language={language} />}
                        {round.unknown === 'base' && <Stepper label={l(say('Oinarria', 'Base', 'الأساس', 'Base'))} value={base} min={1} max={10} onChange={setBase} language={language} />}
                        {round.unknown === 'argument' && <Stepper label={`x = ${round.base}^k`} value={power} min={0} max={8} format={(value) => `${round.base ** value}`} onChange={setPower} language={language} />}
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <>
                    <ol className="dbh4-ladder" dir="ltr">
                        {[...rungs].reverse().map((rung, position) => <li key={position} className={rung.mark ?? ''}>{formula(rung.latex, language)}</li>)}
                    </ol>
                    <RoundVerdict right={right} language={language}>
                        {formula(`${round.base}^{${exponentLatex(round.exponent)}}=${argumentLatex(round.base, round.exponent)}\\ \\Leftrightarrow\\ \\log_{${round.base}}${argumentLatex(round.base, round.exponent)}=${exponentLatex(round.exponent)}`, language)}
                    </RoundVerdict>
                </>
            )}
        </>
    )
}

export function LogGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LOG_ROUNDS,
                rules: [
                    say('$\\log_{b}N=x$ esan nahi du $b^{x}=N$.', '$\\log_{b}N=x$ quiere decir $b^{x}=N$.', '$\\log_{b}N=x$ يعني $b^{x}=N$.', '$\\log_{b}N=x$ means $b^{x}=N$.'),
                    say('Berretzaile negatiboak zatikiak ematen ditu; zatikizkoak, erroak.', 'Los exponentes negativos dan fracciones; los fraccionarios, raíces.', 'الأسس السالبة تعطي كسورًا، والكسرية تعطي جذورًا.', 'Negative exponents give fractions; fractional ones give roots.'),
                    say('Egiaztatu ondoren, oinarriaren berreturen eskailera agertuko da.', 'Al comprobar aparecerá la escalera de potencias de la base.', 'بعد التحقق يظهر سلّم قوى الأساس.', 'After checking, the ladder of powers of the base appears.')
                ],
                create: createLogRounds,
                stars: standardStars(LOG_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: LogPlay
            }}
        />
    )
}

/** The art of the powers games */
export function PowerArt({ game }: { game: 'radical' | 'log' }) {
    if (game === 'radical') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="14" y="44" width="30" height="30" rx="6" fill="#fbebc0" stroke="var(--ink)" strokeWidth="2" />
                <text x="29" y="65" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink)">2</text>
                <path d="M 54 64 L 60 60 L 68 84 L 76 36 L 206 36" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
                {['2', '2', '3'].map((label, index) => (
                    <g key={index} opacity={index < 2 ? 0.55 : 1}>
                        <rect x={84 + index * 38} y="44" width="30" height="30" rx="6" fill={index < 2 ? '#fbebc0' : 'var(--card, #fffcf6)'} stroke="var(--ink)" strokeWidth="2" strokeDasharray={index < 2 ? '4 3' : undefined} />
                        <text x={99 + index * 38} y="65" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink)">{label}</text>
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="60" y1="8" x2="60" y2="112" stroke="var(--ink)" strokeWidth="3" />
            <line x1="160" y1="8" x2="160" y2="112" stroke="var(--ink)" strokeWidth="3" />
            {['2⁰ = 1', '2¹ = 2', '2² = 4', '2³ = 8'].map((label, index) => (
                <g key={label}>
                    <rect x="60" y={92 - index * 26} width="100" height="18" fill={index === 3 ? 'var(--success-tint, #d9efe2)' : 'var(--paper-deep)'} stroke="var(--ink)" strokeWidth="2" />
                    <text x="110" y={106 - index * 26} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{label}</text>
                </g>
            ))}
        </svg>
    )
}
