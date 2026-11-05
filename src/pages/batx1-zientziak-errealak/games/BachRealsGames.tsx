import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './BachRealsGames.css'
import { binomial, binomialLatex, COEFFICIENT_ROUNDS, coefficientOf, createCoefficientRounds, hiddenCoefficient, readCoefficient, termLatex, type CoefficientRound } from './coefficient'
import { createTargetRounds, isTargetHit, TARGET_LIMITS, TARGET_ROUNDS, targetEnds, targetStart, targetStep, type TargetRound } from './target'

/* ==========================================================================
   Ingurunea jomugan and Koefiziente ezkutua (Zenbaki errealak, Batxilergoa
   1 · Zientziak): the neighbourhood is set with two steppers and then
   drawn over the zone; the hidden coefficient is typed, and then the whole
   expansion is shown with C(n, k) · aⁿ⁻ᵏ · bᵏ worked out.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = 'var(--card, #fffcf6)'

/** A number as the language writes it: 2,5 in Basque and Spanish, 2.5 in English and Arabic; − for minus */
const shown = (value: number, language: UnitLanguage) => {
    const text = String(Math.abs(value)).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
    return value < 0 ? `−${text}` : text
}
/** The same number for LaTeX, with {,} for the comma */
const latexNumber = (value: number) => String(value).replace('.', '{,}')

/* ---------- Neighbourhood on target ---------- */

function TargetLine({ round, guess, language }: { round: TargetRound; guess: { centre: number; radius: number } | null; language: UnitLanguage }) {
    const X = (value: number) => 20 + (value + 9) * (320 / 18)
    const y = 70
    const { left, right } = targetEnds(round)
    const outside = round.kind === 'outside'
    const ticks = Array.from({ length: 19 }, (_, i) => i - 9)
    return (
        <svg className="dbh4-scene dbh4-scene-short" viewBox="0 0 360 120" direction="ltr" aria-hidden="true">
            {outside
                ? (
                    <g>
                        <line x1={14} x2={X(left)} y1={y} y2={y} stroke={STAGE} strokeWidth={6} />
                        <line x1={X(right)} x2={346} y1={y} y2={y} stroke={STAGE} strokeWidth={6} />
                    </g>
                )
                : <rect x={X(left)} y={y - 8} width={X(right) - X(left)} height={16} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />}
            <line x1={12} x2={348} y1={y} y2={y} stroke={INK} strokeWidth={1.6} />
            {ticks.map((tick) => (
                <g key={tick}>
                    <line x1={X(tick)} x2={X(tick)} y1={y - 4} y2={y + 4} stroke={INK} strokeWidth={tick === 0 ? 2 : 1} />
                    {tick % 3 === 0 && <text x={X(tick)} y={y + 22} textAnchor="middle" fontSize={12} fill={MUTED}>{shown(tick, language)}</text>}
                </g>
            ))}
            {[left, right].map((end) => <circle key={end} cx={X(end)} cy={y} r={5.5} fill={outside ? STAGE : PAPER} stroke={STAGE} strokeWidth={2.4} />)}
            {round.kind === 'interval' && [left, right].map((end) => <text key={end} x={X(end)} y={y - 16} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{shown(end, language)}</text>)}
            {guess && (
                <g>
                    <line x1={X(guess.centre - guess.radius)} x2={X(guess.centre + guess.radius)} y1={y - 32} y2={y - 32} stroke={SECOND} strokeWidth={3} />
                    <line x1={X(guess.centre - guess.radius)} x2={X(guess.centre - guess.radius)} y1={y - 40} y2={y - 24} stroke={SECOND} strokeWidth={2} />
                    <line x1={X(guess.centre + guess.radius)} x2={X(guess.centre + guess.radius)} y1={y - 40} y2={y - 24} stroke={SECOND} strokeWidth={2} />
                    <circle cx={X(guess.centre)} cy={y - 32} r={4} fill={SECOND} />
                </g>
            )}
        </svg>
    )
}

function TargetPlay({ round, level, language, onAnswer, answered }: RoundProps<TargetRound>) {
    const l = useGameText(language)
    const start = targetStart(round, level)
    const [centre, setCentre] = useState(start.centre)
    const [radius, setRadius] = useState(start.radius)
    const step = targetStep(level)
    const right = isTargetHit(round, centre, radius)
    const { left, right: end } = targetEnds(round)
    const question = round.kind === 'outside'
        ? say('Gune urdina $|x-a|\\ge r$ da. Aurkitu $a$ eta $r$.', 'La zona azul es $|x-a|\\ge r$. Encuentra $a$ y $r$.', 'المنطقة الزرقاء هي $|x-a|\\ge r$. أوجد $a$ و$r$.', 'The blue zone is $|x-a|\\ge r$. Find $a$ and $r$.')
        : round.kind === 'written'
            ? say(`Estali $${latexNumber(left)}<x<${latexNumber(end)}$ ingurune batekin.`, `Cubre $${latexNumber(left)}<x<${latexNumber(end)}$ con un entorno.`, `غطِّ $${latexNumber(left)}<x<${latexNumber(end)}$ بجوار.`, `Cover $${latexNumber(left)}<x<${latexNumber(end)}$ with a neighbourhood.`)
            : say('Estali gune urdina ingurune batekin: aukeratu erdigunea eta erradioa.', 'Cubre la zona azul con un entorno: elige su centro y su radio.', 'غطِّ المنطقة الزرقاء بجوار: اختر مركزه ونصف قطره.', 'Cover the blue zone with a neighbourhood: choose its centre and radius.')
    const format = (value: number) => shown(value, language)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question).replace(/\{,\}/g, language === 'ar' ? '.' : '{,}')} /></p>
            <TargetLine round={round} guess={answered ? { centre, radius } : null} language={language} />
            <p className="dbh4-readout" dir="ltr">{formula(`E(${latexNumber(centre)},${latexNumber(radius)})=(${latexNumber(centre - radius)},${latexNumber(centre + radius)})`, language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={l(say('Erdigunea a', 'Centro a', 'المركز a', 'Centre a'))} value={centre} min={TARGET_LIMITS.centre.min} max={TARGET_LIMITS.centre.max} step={step} format={format} onChange={setCentre} language={language} />
                        <Stepper label={l(say('Erradioa r', 'Radio r', 'نصف القطر r', 'Radius r'))} value={radius} min={step} max={TARGET_LIMITS.radius.max} step={step} format={format} onChange={setRadius} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Jaurti', 'Lanzar', 'أطلق', 'Throw'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`a=\\frac{${latexNumber(left)}+(${latexNumber(end)})}{2}=${latexNumber(round.centre)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`r=\\frac{${latexNumber(end)}-(${latexNumber(left)})}{2}=${latexNumber(round.radius)}`, language)}</span>
                    {l(round.kind === 'outside'
                        ? say('Kanpoaldean ere, erdigunea muturren erdiko puntua da eta erradioa haien distantziaren erdia.', 'También por fuera, el centro es el punto medio de los extremos y el radio, la mitad de su distancia.', 'وفي الخارج أيضًا، المركز منتصف الطرفين ونصف القطر نصف المسافة بينهما.', 'Outside too, the centre is the midpoint of the ends and the radius half their distance.')
                        : say('Erdigunea erdiko puntua da; erradioa, luzeraren erdia.', 'El centro es el punto medio; el radio, la mitad de la longitud.', 'المركز هو المنتصف، ونصف القطر نصف الطول.', 'The centre is the midpoint; the radius, half the length.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function TargetGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TARGET_ROUNDS,
                rules: [
                    say('Zuzenean gune bat ikusiko duzu.', 'Verás una zona en la recta.', 'سترى منطقة على المستقيم.', 'You will see a zone on the line.'),
                    say('Aukeratu ingurunearen erdigunea eta erradioa, eta jaurti: saiakera bakarra.', 'Elige el centro y el radio del entorno y lanza: un solo intento.', 'اختر مركز الجوار ونصف قطره ثم أطلق: محاولة واحدة.', 'Choose the centre and radius of the neighbourhood and throw: one try.'),
                    say('Erdigunea muturren erdiko puntua da, eta erradioa luzeraren erdia.', 'El centro es el punto medio de los extremos, y el radio, la mitad de la longitud.', 'المركز منتصف الطرفين، ونصف القطر نصف الطول.', 'The centre is the midpoint of the ends, and the radius half the length.')
                ],
                create: createTargetRounds,
                stars: standardStars(TARGET_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TargetPlay
            }}
        />
    )
}

/* ---------- The hidden coefficient ---------- */

/** The expansion in rows of three terms, so that it fits on a phone */
function expansionRows(round: CoefficientRound, reveal: boolean): string {
    const terms = Array.from({ length: round.n + 1 }, (_, k) => termLatex(coefficientOf(round, k), round.n - k, k === 0, !reveal && k === round.k))
    const rows: string[] = []
    for (let start = 0; start < terms.length; start += 3) rows.push(terms.slice(start, start + 3).join(''))
    return `\\begin{aligned}${binomialLatex(round)}&=${rows.join('\\\\&\\phantom{=}')}\\end{aligned}`
}

function CoefficientPlay({ round, language, onAnswer, answered }: RoundProps<CoefficientRound>) {
    const l = useGameText(language)
    const [input, setInput] = useState('')
    const [unreadable, setUnreadable] = useState(false)
    const [typed, setTyped] = useState<number | null>(null)
    const value = hiddenCoefficient(round)
    const power = round.n - round.k
    const xPower = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
    const submit = () => {
        const number = readCoefficient(input)
        if (number === null) {
            setUnreadable(true)
            return
        }
        setTyped(number)
        onAnswer(number === value)
    }
    const a = round.a === 1 ? '' : `\\cdot ${round.a}^{${power}}`
    const b = round.b === 1 ? '' : `\\cdot (${round.b})^{${round.k}}`
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein koefiziente dago laukiaren lekuan?', '¿Qué coeficiente va en el lugar del cuadrado?', 'أيّ معامل مكان المربع؟', 'Which coefficient goes in the box?'))}</p>
            <div className="dbh4-big-formula" dir="ltr">{formula(expansionRows(round, answered), language)}</div>
            {!answered && (
                <form className="fraction-v2-race-pit-form bach-coefficient-form" onSubmit={(event) => { event.preventDefault(); submit() }}>
                    <label htmlFor="bach-coefficient-answer">{l(say('Koefizientea', 'Coeficiente', 'المعامل', 'Coefficient'))} {formula(xPower || '1', language)}</label>
                    <div>
                        <input id="bach-coefficient-answer" size={6} value={input} inputMode="numeric" autoComplete="off" placeholder="−12" onChange={(event) => { setInput(event.target.value); setUnreadable(false) }} />
                        <button type="submit" className="fraction-v2-primary" disabled={!input.trim()}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                    {unreadable && <p className="fraction-v2-race-pit-note" role="alert">{l(say('Idatzi zenbaki oso bat, adibidez −12.', 'Escribe un número entero, por ejemplo −12.', 'اكتب عددًا صحيحًا، مثل ⁦−12⁩.', 'Write a whole number, for example −12.'))}</p>}
                </form>
            )}
            {answered && (
                <RoundVerdict right={typed === value} language={language}>
                    <span className="dbh4-worked">{formula(`\\binom{${round.n}}{${round.k}}${a}${b}=${binomial(round.n, round.k)}${round.a === 1 ? '' : `\\cdot ${round.a ** power}`}${round.b === 1 ? '' : `\\cdot (${round.b ** round.k})`}=${value}`, language)}</span>
                    {l(say('Koefizientea: zenbaki konbinatorioa, eta oinarri bakoitza bere berretzailearekin, zeinua barne.', 'El coeficiente: el número combinatorio, y cada base con su exponente, signo incluido.', 'المعامل: العدد التوافقي وكل أساس بأسه، مع الإشارة.', 'The coefficient: the binomial coefficient, and each base with its exponent, sign included.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function CoefficientGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: COEFFICIENT_ROUNDS,
                rules: [
                    say('Garapen bati koefiziente bat falta zaio.', 'A un desarrollo le falta un coeficiente.', 'ينقص النشرَ معاملٌ.', 'An expansion is missing one coefficient.'),
                    say('$x^{n-k}$ gaiaren koefizientea: $\\binom{n}{k}\\cdot a^{n-k}\\cdot b^{k}$.', 'El coeficiente de $x^{n-k}$: $\\binom{n}{k}\\cdot a^{n-k}\\cdot b^{k}$.', 'معامل $x^{n-k}$: $\\binom{n}{k}\\cdot a^{n-k}\\cdot b^{k}$.', 'The coefficient of $x^{n-k}$: $\\binom{n}{k}\\cdot a^{n-k}\\cdot b^{k}$.'),
                    say('Idatzi zeinuarekin: $b$ negatiboa bada, berretzaile bakoitiek zeinua aldatzen dute.', 'Escríbelo con su signo: si $b$ es negativo, los exponentes impares cambian el signo.', 'اكتبه بإشارته: إذا كان $b$ سالبًا فالأسس الفردية تغيّر الإشارة.', 'Write it with its sign: if $b$ is negative, odd exponents change the sign.')
                ],
                create: createCoefficientRounds,
                stars: standardStars(COEFFICIENT_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: CoefficientPlay
            }}
        />
    )
}
