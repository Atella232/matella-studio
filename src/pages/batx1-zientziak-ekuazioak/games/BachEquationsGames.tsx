import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './BachEquationsGames.css'
import { breakpoints, createSignsRounds, isSignsChoice, signsLatex, SIGNS_ROUNDS, solutionLatex, stretchSigns, type SignsRound } from './signs'
import { CANDIDATE_VERDICTS, createValidRounds, isValidChoice, VALID_ROUNDS, verdictOf, type Candidate, type CandidateVerdict, type ValidRound } from './valid'

/* ==========================================================================
   Baliozkoa ala faltsua? and Bete zeinuen taula (Ekuazioak eta
   inekuazioak, Batxilergoa 1 · Zientziak): the first shows an equation
   already solved and asks, for each candidate, whether it works or why
   not; the second asks for the sign on each stretch of the line and then
   for the solution, with the right ends.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** The big formula with full-size fractions */
const display = (latex: string) => latex.replace(/\\frac/g, '\\dfrac')
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')

/* ---------- Valid or false? ---------- */

const VERDICT_LABELS: Record<CandidateVerdict, LocalizedText> = {
    valid: say('Balio du', 'Vale', 'يصلح', 'It works'),
    denominator: say('Izendatzailea 0', 'Denominador 0', 'المقام 0', 'Denominator 0'),
    sign: say('√ = negatiboa', '√ = negativo', 'جذر = سالب', '√ = negative'),
    domain: say('Negatibo baten log', 'log de un negativo', 'لوغاريتم سالب', 'log of a negative')
}

/** Why a candidate works or not, checked in the first equation */
function candidateReason(round: ValidRound, candidate: Candidate): LocalizedText {
    const v = candidate.value
    const x = `$x=${v}$`
    const { meta } = round
    if (candidate.reason === 'denominator') return say(`${x}: izendatzailea 0 da.`, `${x}: el denominador vale 0.`, `${x}: المقام يساوي 0.`, `${x}: the denominator is 0.`)
    if (candidate.reason === 'sign') {
        const root = `$\\sqrt{${v + meta.p}}=${Math.abs(v + meta.q)}$`
        const other = `$${v + meta.q}$`
        return say(`${x}: ${root}, ez ${other}.`, `${x}: ${root}, no ${other}.`, `${x}: ${root} لا ${other}.`, `${x}: ${root}, not ${other}.`)
    }
    if (candidate.reason === 'domain') {
        const log = `$\\log(${round.kind === 'log-sum' ? v - meta.a : v})$`
        return say(`${x}: ${log} ez dago.`, `${x}: no existe ${log}.`, `${x}: ${log} غير موجود.`, `${x}: ${log} does not exist.`)
    }
    const check = round.kind === 'rational' ? `${v}${signed(-meta.a)}\\ne 0`
        : round.kind === 'radical' ? `\\sqrt{${v + meta.p}}=${v + meta.q}`
            : round.kind === 'log-double' ? `2\\log ${v}=\\log ${v * v}`
                : `\\log ${v + meta.a}+\\log ${v - meta.a}=\\log ${meta.c}`
    return say(`${x}: balio du, $${check}$.`, `${x}: vale, $${check}$.`, `${x}: يصلح، $${check}$.`, `${x}: it works, $${check}$.`)
}

function ValidPlay({ round, language, onAnswer, answered }: RoundProps<ValidRound>) {
    const l = useGameText(language)
    const [verdicts, setVerdicts] = useState<Array<CandidateVerdict | null>>(() => round.candidates.map(() => null))
    const choose = (index: number, verdict: CandidateVerdict) => !answered && setVerdicts((current) => current.map((item, position) => (position === index ? verdict : item)))
    const right = isValidChoice(round, verdicts)
    return (
        <>
            <div className="dbh4-big-formula bach-eq-big" dir="ltr">{formula(display(round.latex), language)}</div>
            <p className="bach-eq-reduced">{l(say('Ebatzita:', 'Al resolverla:', 'عند حلها:', 'Solving it:'))} {formula(round.reduced, language)}</p>
            <p className="prop3-prompt">{l(say('Hautagai bakoitzak balio du? Ez badu, zergatik?', '¿Vale cada candidata? Si no, ¿por qué?', 'هل يصلح كل مرشح؟ وإن لم يصلح فلماذا؟', 'Does each candidate work? If not, why?'))}</p>
            <div className="bach-eq-candidates">
                {round.candidates.map((candidate, index) => (
                    <div key={candidate.value} className="bach-eq-candidate" role="group" aria-label={`x = ${candidate.value}`}>
                        <div className="bach-eq-candidate-value" dir="ltr">{formula(`x=${candidate.value}`, language)}</div>
                        <div className="bach-eq-verdicts">
                            {CANDIDATE_VERDICTS.map((verdict) => {
                                const mark = !answered ? '' : verdict === verdictOf(candidate) ? 'right' : verdict === verdicts[index] ? 'wrong' : ''
                                return <button key={verdict} type="button" aria-pressed={verdicts[index] === verdict} disabled={answered} className={mark} onClick={() => choose(index, verdict)}>{l(VERDICT_LABELS[verdict])}</button>
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={verdicts.includes(null)} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.candidates.map((candidate) => <span key={candidate.value} className="dbh4-worked"><MathText text={l(candidateReason(round, candidate))} /></span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function ValidGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: VALID_ROUNDS,
                rules: [
                    say('Ekuazio bakoitza ebatzi da, eta hautagai batzuk atera dira.', 'Cada ecuación ya se ha resuelto y han salido unas candidatas.', 'كل معادلة حُلّت وخرج منها مرشحون.', 'Each equation has been solved and some candidates came out.'),
                    say('Esan bakoitzak balio duen edo zergatik ez: izendatzailea 0 da, erroa negatibo baten berdina da edo negatibo baten logaritmoa agertzen da.', 'Di si cada una vale o por qué no: denominador 0, una raíz igual a un negativo o el logaritmo de un negativo.', 'قل هل يصلح كل واحد أو لماذا لا: مقام 0، أو جذر يساوي عددًا سالبًا، أو لوغاريتم عدد سالب.', 'Say whether each one works or why not: denominator 0, a root equal to a negative number, or the logarithm of a negative number.'),
                    say('Egiaztatu hasierako ekuazioan, ez ebatzitakoan.', 'Comprueba en la ecuación inicial, no en la que sale al resolver.', 'تحقّق في المعادلة الأصلية لا في الناتجة.', 'Check in the first equation, not in the one you get when solving.')
                ],
                create: createValidRounds,
                stars: standardStars(VALID_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ValidPlay
            }}
        />
    )
}

/* ---------- Fill in the sign table ---------- */

const signText = (sign: number | null) => (sign === null ? '?' : sign > 0 ? '+' : '−')

function SignsPlay({ round, language, onAnswer, answered }: RoundProps<SignsRound>) {
    const l = useGameText(language)
    const points = breakpoints(round)
    const right = stretchSigns(round)
    const [signs, setSigns] = useState<Array<number | null>>(() => right.map(() => null))
    const [picked, setPicked] = useState<string | null>(null)
    const flip = (index: number) => !answered && setSigns((current) => current.map((sign, position) => (position === index ? (sign === 1 ? -1 : 1) : sign)))
    const ready = !signs.includes(null)
    const choose = (option: string) => {
        if (answered || !ready) return
        setPicked(option)
        onAnswer(isSignsChoice(round, signs, option))
    }
    const solution = solutionLatex(round)
    const closed = round.relation === '\\ge' || round.relation === '\\le'
    const note = round.hole !== null
        ? say(`Izendatzailea 0 da $x=${round.hole}$ denean: zulo bat da, eta ez da inoiz sartzen.`, `El denominador vale 0 en $x=${round.hole}$: es un agujero y nunca entra.`, `المقام يساوي 0 عند $x=${round.hole}$: إنه ثقب ولا يدخل أبدًا.`, `The denominator is 0 at $x=${round.hole}$: it is a hole and is never included.`)
        : closed
            ? say('≥ eta ≤ zeinuekin, erroak sartzen dira.', 'Con ≥ y ≤, las raíces entran.', 'مع ≥ و≤ تدخل الجذور.', 'With ≥ and ≤, the roots are included.')
            : say('> eta < zeinuekin, erroak ez dira sartzen.', 'Con > y <, las raíces no entran.', 'مع > و< لا تدخل الجذور.', 'With > and <, the roots are not included.')
    return (
        <>
            <div className="dbh4-big-formula bach-eq-big" dir="ltr">{formula(display(signsLatex(round)), language)}</div>
            <p className="prop3-prompt">{l(say('Sakatu zati bakoitza bere zeinua jartzeko.', 'Toca cada tramo para poner su signo.', 'المس كل جزء لتضع إشارته.', 'Tap each piece to set its sign.'))}</p>
            <div className="bach-eq-strip" dir="ltr" role="group" aria-label={l(say('Zeinuak', 'Signos', 'الإشارات', 'Signs'))}>
                {signs.map((sign, index) => (
                    <span key={index} className="bach-eq-stretch">
                        <button type="button" className={`bach-eq-sign${!answered ? '' : sign === right[index] ? ' right' : ' wrong'}`} disabled={answered} onClick={() => flip(index)}>
                            {answered && sign !== right[index] ? signText(right[index]) : signText(sign)}
                        </button>
                        {index < points.length && (
                            <span className={`bach-eq-point${points[index] === round.hole ? ' hole' : ''}`}>
                                <span className="bach-eq-dot" aria-hidden="true" />
                                {formula(String(points[index]), language)}
                            </span>
                        )}
                    </span>
                ))}
            </div>
            <p className="prop3-prompt">{l(ready || answered
                ? say('Aukeratu soluzioa:', 'Elige la solución:', 'اختر الحل:', 'Choose the solution:')
                : say('Lehenik jarri zeinu guztiak; gero aukeratu soluzioa.', 'Primero pon todos los signos; después elige la solución.', 'ضع كل الإشارات أولًا، ثم اختر الحل.', 'First set all the signs; then choose the solution.'))}</p>
            <div className="prop3-options bach-eq-solutions" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered || !ready} className={!answered ? '' : option === solution ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>
                        {formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={isSignsChoice(round, signs, picked ?? '')} language={language}>
                    <span className="dbh4-worked">{formula(right.map(signText).join('\\quad '), language)}</span>
                    <span className="dbh4-worked">{formula(solution, language)}</span>
                    <MathText text={l(note)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function SignsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SIGNS_ROUNDS,
                rules: [
                    say('Erroek zuzena zatitan mozten dute.', 'Las raíces cortan la recta en tramos.', 'تقطع الجذور المستقيم إلى أجزاء.', 'The roots cut the line into pieces.'),
                    say('Jarri + edo − zati bakoitzean: proba zati barruko zenbaki bat.', 'Pon + o − en cada tramo: prueba un número de dentro.', 'ضع + أو − على كل جزء: جرّب عددًا من داخله.', 'Put + or − on each piece: try a number inside it.'),
                    say('Gero aukeratu soluzioa, mutur egokiekin.', 'Después elige la solución, con los extremos bien puestos.', 'ثم اختر الحل بطرفين صحيحين.', 'Then choose the solution, with the right ends.')
                ],
                create: createSignsRounds,
                stars: standardStars(SIGNS_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: SignsPlay
            }}
        />
    )
}
