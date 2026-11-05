import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { localize } from '../text'
import './TrigonometryGames.css'
import { BUILD_ROUNDS, createBuildRounds, fillTemplate, isBuildRight, rightSide, type BuildRound } from './build'
import { createExactRounds, EXACT_ROUNDS, exactWorking, type ExactRound } from './exact'
import { createHuntRounds, HUNT_POINTS, HUNT_ROUNDS, isHuntRight, type HuntRound } from './hunt'

/* ==========================================================================
   Muntatu formula, Ehizatu soluzioak and Balio zehatza (Formula eta
   funtzio trigonometrikoak, Batxilergoa 1 · Zientziak): a formula filled
   gap by gap, the solutions of an equation tapped on a circle with a point
   every 15°, and the exact value of a ratio of an angle that is not
   notable, with the working after the answer.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f5fb3)'
const CORAL = 'var(--error, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')

/** A formula in the language's notation (\sen, \tg, \cosec and \cotg in its names, its decimal mark) */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />

/* ---------- Build the formula ---------- */

function BuildPlay({ round, language, onAnswer, answered }: RoundProps<BuildRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<Array<number | null>>(() => round.gaps.map(() => null))
    const current = chosen.findIndex((choice) => choice === null)
    const choose = (option: number) => {
        if (answered || current < 0) return
        const next = chosen.map((choice, index) => (index === current ? option : choice))
        setChosen(next)
        if (next.every((choice) => choice !== null)) onAnswer(isBuildRight(round, next))
    }
    const right = isBuildRight(round, chosen)
    return (
        <>
            <p className="prop3-prompt">{l(say('Bete hutsuneak banan-banan, formula zuzena izan dadin.', 'Rellena los huecos uno a uno para que la fórmula sea correcta.', 'املأ الفراغات واحدًا تلو الآخر لتصير الصيغة صحيحة.', 'Fill in the gaps one by one so that the formula is right.'))}</p>
            <div className="dbh4-big-formula trig-build-formula" dir="ltr">{formula(`\\displaystyle ${round.left}=${fillTemplate(round, chosen, answered ? null : current)}`, language)}</div>
            {!answered && current >= 0 && (
                <div className={`prop3-options ${round.gaps[current].options.length === 2 ? 'trig-two' : 'trig-three'}`}>
                    {round.gaps[current].options.map((option, index) => (
                        <button key={`${current}-${option}`} type="button" onClick={() => choose(index)} dir="ltr">{formula(`\\displaystyle ${option}`, language)}</button>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {!right && <span className="dbh4-worked">{formula(`\\displaystyle ${round.left}=${rightSide(round)}`, language)}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function BuildGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BUILD_ROUNDS,
                rules: [
                    say('Formula baten ezkerreko aldea ematen da, eta eskuinekoa hutsuneekin.', 'Se da el lado izquierdo de una fórmula y el derecho, con huecos.', 'يُعطى الطرف الأيسر لصيغة والطرف الأيمن بفراغات.', 'You get the left side of a formula and the right side with gaps.'),
                    say('Bete hutsuneak banan-banan: hutsune bakoitzerako, aukeratu pieza bat.', 'Rellena los huecos uno a uno: para cada hueco, elige una pieza.', 'املأ الفراغات واحدًا تلو الآخر: اختر قطعة لكل فراغ.', 'Fill in the gaps one by one: choose a piece for each gap.'),
                    say('Formula ondo dago pieza guztiak zuzenak badira.', 'La fórmula está bien si todas las piezas son correctas.', 'تكون الصيغة صحيحة إذا كانت كل القطع صحيحة.', 'The formula is right if every piece is right.')
                ],
                create: createBuildRounds,
                stars: standardStars(BUILD_ROUNDS),
                starsNote: STARS,
                Round: BuildPlay
            }}
        />
    )
}

/* ---------- Hunt the solutions ---------- */

function HuntCircle({ round, chosen, answered, onToggle, language }: { round: HuntRound; chosen: number[]; answered: boolean; onToggle: (angle: number) => void; language: UnitLanguage }) {
    const l = useGameText(language)
    const O = [170, 170]
    const R = 124
    const at = (angle: number, radius = R) => [O[0] + radius * Math.cos((angle * Math.PI) / 180), O[1] - radius * Math.sin((angle * Math.PI) / 180)]
    return (
        <svg className="dbh4-scene trig-hunt" viewBox="0 0 340 340" direction="ltr" role="group" aria-label={l(say('Zirkunferentzia, puntu bat 15° bakoitzean', 'La circunferencia, con un punto cada 15°', 'الدائرة، بنقطة كل 15°', 'The circle, with a point every 15°'))}>
            <line x1={O[0] - R - 16} y1={O[1]} x2={O[0] + R + 16} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
            <line x1={O[0]} y1={O[1] - R - 16} x2={O[0]} y2={O[1] + R + 16} stroke={MUTED} strokeWidth={1.4} />
            <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth={2.4} />
            {[0, 90, 180, 270].map((angle) => {
                const [x, y] = at(angle, R + 30)
                return <text key={angle} x={angle === 90 || angle === 270 ? x + 26 : x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{`${angle}°`}</text>
            })}
            {HUNT_POINTS.map((angle) => {
                const [x, y] = at(angle)
                const picked = chosen.includes(angle)
                const solution = round.solutions.includes(angle)
                const fill = answered ? (solution ? GREEN : picked ? CORAL : 'var(--card, #fffcf6)') : picked ? BLUE : 'var(--card, #fffcf6)'
                return (
                    <g key={angle} role="button" tabIndex={answered ? -1 : 0} aria-pressed={picked} aria-label={`${angle}°`}
                        onClick={() => !answered && onToggle(angle)}
                        onKeyDown={(event) => { if (!answered && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onToggle(angle) } }}
                        style={{ cursor: answered ? 'default' : 'pointer' }}>
                        <circle cx={x} cy={y} r={15} fill="transparent" />
                        <circle cx={x} cy={y} r={angle % 90 === 0 ? 9 : 7.5} fill={fill} stroke={answered && solution && !picked ? GREEN : INK} strokeWidth={answered && solution && !picked ? 3 : 1.6} strokeDasharray={answered && solution && !picked ? '3 2' : undefined} />
                        {answered && (solution || picked) && <text x={at(angle, R - 24)[0]} y={at(angle, R - 24)[1] + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={solution ? GREEN : CORAL}>{`${angle}°`}</text>}
                    </g>
                )
            })}
        </svg>
    )
}

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<HuntRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number[]>([])
    const toggle = (angle: number) => setChosen((list) => (list.includes(angle) ? list.filter((item) => item !== angle) : [...list, angle]))
    const right = isHuntRight(round, chosen)
    const missing = round.solutions.filter((angle) => !chosen.includes(angle))
    const extra = chosen.filter((angle) => !round.solutions.includes(angle))
    return (
        <>
            <p className="prop3-prompt">{l(say('Ukitu ekuazioaren soluzio guztiak, 0°-tik 360°-ra.', 'Toca todas las soluciones de la ecuación entre 0° y 360°.', 'المس كل حلول المعادلة بين 0° و360°.', 'Tap every solution of the equation between 0° and 360°.'))}</p>
            <div className="dbh4-big-formula trig-hunt-equation" dir="ltr">{formula(round.equation, language)}</div>
            <HuntCircle round={round} chosen={chosen} answered={answered} onToggle={toggle} language={language} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen.length === 0} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`x=${round.solutions.map((angle) => `${angle}°`).join(',\\ ')}`, language)}</span>
                    {missing.length > 0 && <span className="dbh4-worked">{l(say(`Falta zitzaizkizun: ${missing.map((angle) => `${angle}°`).join(', ')}.`, `Te faltaron: ${missing.map((angle) => `${angle}°`).join(', ')}.`, `نقصك: ${missing.map((angle) => `${angle}°`).join('، ')}.`, `You missed: ${missing.map((angle) => `${angle}°`).join(', ')}.`))}</span>}
                    {extra.length > 0 && <span className="dbh4-worked">{l(say(`Ez dira soluzio: ${extra.map((angle) => `${angle}°`).join(', ')}.`, `No son solución: ${extra.map((angle) => `${angle}°`).join(', ')}.`, `ليست حلولًا: ${extra.map((angle) => `${angle}°`).join('، ')}.`, `Not solutions: ${extra.map((angle) => `${angle}°`).join(', ')}.`))}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function HuntGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HUNT_ROUNDS,
                rules: [
                    say('Ekuazio bat eta zirkunferentzia bat ikusiko dituzu, 15° bakoitzean puntu batekin.', 'Verás una ecuación y una circunferencia con un punto cada 15°.', 'سترى معادلة ودائرة فيها نقطة كل 15°.', 'You will see an equation and a circle with a point every 15°.'),
                    say('Ukitu soluzio diren puntu guztiak (berriro ukituta, kendu egiten da) eta egiaztatu.', 'Toca todos los puntos que sean solución (si vuelves a tocar uno, se quita) y comprueba.', 'المس كل النقاط التي هي حلول (وإذا لمستها مرة أخرى تُزال) ثم تحقّق.', 'Tap every point that is a solution (tap it again to remove it) and check.'),
                    say('Soluzio bat falta bada edo bat soberan badago, hutsegitea da.', 'Si falta una solución o sobra una, es un fallo.', 'إذا نقص حل أو زاد حل فهو خطأ.', 'If one solution is missing or one is extra, it is a miss.')
                ],
                create: createHuntRounds,
                stars: standardStars(HUNT_ROUNDS),
                starsNote: STARS,
                Round: HuntPlay
            }}
        />
    )
}

/* ---------- Exact value ---------- */

const NAMES: Record<ExactRound['ratio'], string> = { sin: '\\sen', cos: '\\cos', tan: '\\tg' }

function ExactPlay({ round, language, onAnswer, answered }: RoundProps<ExactRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const asked = `${NAMES[round.ratio]} ${String(round.angle).replace('.', '{,}')}°`
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da balio zehatza?', '¿Cuál es el valor exacto?', 'ما القيمة الدقيقة؟', 'What is the exact value?'))}</p>
            <div className="dbh4-big-formula trig-exact-asked" dir="ltr">{formula(asked, language)}</div>
            <div className="prop3-options trig-two">
                {round.options.map((option, index) => {
                    const mark = !answered ? '' : index === round.right ? 'right' : index === choice ? 'wrong' : ''
                    return <button key={option.latex} type="button" disabled={answered} className={mark} dir="ltr" onClick={() => { setChoice(index); onAnswer(index === round.right) }}>{formula(`\\displaystyle ${option.latex}`, language)}</button>
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice === round.right} language={language}>
                    {exactWorking(round).map((line) => <span key={line} className="dbh4-worked">{formula(`\\displaystyle ${line}`, language)}</span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function ExactGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: EXACT_ROUNDS,
                rules: [
                    say('Angelu ez-nabarmen baten arrazoi bat ikusiko duzu.', 'Verás una razón de un ángulo que no es notable.', 'سترى نسبة زاوية غير شهيرة.', 'You will see a ratio of an angle that is not notable.'),
                    say('Aukeratu haren balio zehatza: begiratu koadranteko zeinua eta zein angelu nabarmenekin idazten den.', 'Elige su valor exacto: mira el signo del cuadrante y con qué ángulos notables se escribe.', 'اختر قيمتها الدقيقة: انظر إلى إشارة الربع وبأي زوايا شهيرة تُكتب.', 'Choose its exact value: look at the sign of the quadrant and which notable angles it is written with.'),
                    say('Gero, kalkulua ikusiko duzu.', 'Después verás el cálculo.', 'ثم سترى الحساب.', 'Then you will see the working.')
                ],
                create: createExactRounds,
                stars: standardStars(EXACT_ROUNDS),
                starsNote: STARS,
                Round: ExactPlay
            }}
        />
    )
}
