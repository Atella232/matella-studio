import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { inequalityLatex, interval, intervalLatex, type Interval } from '../dbh4-aplikatuak-errealak/reals'
import { createIntervalRounds, INTERVAL_MAX, INTERVAL_MIN, INTERVAL_ROUNDS, intervalStars, sameInterval, type IntervalRound, type IntervalTrack } from './intervals'
import './Dbh4Games.css'

/* ==========================================================================
   Build the interval (4. DBH, applied and academic): the number line, two
   ends with steppers, ±∞ and open or closed brackets; the notation is
   written as the interval is built. In the shared RoundGame.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />

const X0 = 20
const STEP = 14
const at = (value: number) => X0 + (value - INTERVAL_MIN) * STEP

/** The number line from −10 to 10 with the set drawn on it */
export function IntervalLine({ value, tone = 'var(--blue, #2f5fb3)' }: { value: Interval; tone?: string }) {
    const left = value.from === null ? at(INTERVAL_MIN) - 12 : at(value.from)
    const right = value.to === null ? at(INTERVAL_MAX) + 12 : at(value.to)
    const end = (x: number, closed: boolean) => <circle cx={x} cy="30" r="6" fill={closed ? tone : 'var(--card)'} stroke={tone} strokeWidth="2.5" />
    return (
        <svg className="dbh4-line" viewBox="0 0 340 60" role="img" aria-hidden="true">
            <line x1="6" y1="30" x2="334" y2="30" stroke="var(--ink)" strokeWidth="2" />
            {Array.from({ length: INTERVAL_MAX - INTERVAL_MIN + 1 }, (_, index) => INTERVAL_MIN + index).map((tick) => (
                <g key={tick}>
                    <line x1={at(tick)} y1={tick % 5 === 0 ? 23 : 26} x2={at(tick)} y2={tick % 5 === 0 ? 37 : 34} stroke="var(--ink)" strokeWidth={tick === 0 ? 2 : 1.2} />
                    {tick % 2 === 0 && <text x={at(tick)} y="54" textAnchor="middle" fontSize="11" fill="var(--muted)" direction="ltr">{tick < 0 ? `−${-tick}` : tick}</text>}
                </g>
            ))}
            {right > left && <line x1={left} y1="30" x2={right} y2="30" stroke={tone} strokeWidth="6" strokeLinecap="round" opacity="0.85" />}
            {value.from === null && <path d={`M ${left - 4} 30 l 10 -7 v 14 Z`} fill={tone} />}
            {value.to === null && <path d={`M ${right + 4} 30 l -10 -7 v 14 Z`} fill={tone} />}
            {value.from !== null && end(left, value.closedFrom)}
            {value.to !== null && end(right, value.closedTo)}
        </svg>
    )
}

function EndControls({ side, infinite, closed, value, onInfinite, onClosed, onValue, language }: {
    side: 'from' | 'to'
    infinite: boolean
    closed: boolean
    value: number
    onInfinite: () => void
    onClosed: () => void
    onValue: (value: number) => void
    language: UnitLanguage
}) {
    const l = useGameText(language)
    const brackets = side === 'from' ? ['[', '('] : [']', ')']
    return (
        <div className="dbh4-end" dir={language === 'ar' ? 'rtl' : undefined}>
            <span className="dbh4-end-title">{side === 'from' ? l(say('Ezkerreko muturra', 'Extremo izquierdo', 'الطرف الأيسر', 'Left end')) : l(say('Eskuineko muturra', 'Extremo derecho', 'الطرف الأيمن', 'Right end'))}</span>
            {!infinite && <Stepper label={l(say('Zenbakia', 'Número', 'العدد', 'Number'))} value={value} min={INTERVAL_MIN} max={INTERVAL_MAX} format={(current) => (current < 0 ? `−${-current}` : String(current))} onChange={onValue} language={language} />}
            <div className="dbh4-end-buttons" dir="ltr">
                <button type="button" aria-pressed={infinite} onClick={onInfinite}>{side === 'from' ? '−∞' : '+∞'}</button>
                {!infinite && <button type="button" aria-label={closed ? l(say('Itxia', 'Cerrado', 'مغلق', 'Closed')) : l(say('Irekia', 'Abierto', 'مفتوح', 'Open'))} onClick={onClosed}>{closed ? brackets[0] : brackets[1]}</button>}
            </div>
        </div>
    )
}

function IntervalPlay({ round, language, onAnswer, answered }: RoundProps<IntervalRound>) {
    const l = useGameText(language)
    const [from, setFrom] = useState(-2)
    const [to, setTo] = useState(2)
    const [fromInfinite, setFromInfinite] = useState(false)
    const [toInfinite, setToInfinite] = useState(false)
    const [closedFrom, setClosedFrom] = useState(true)
    const [closedTo, setClosedTo] = useState(true)
    const built = interval(fromInfinite ? null : from, toInfinite ? null : to, closedFrom, closedTo)
    const valid = built.from === null || built.to === null || built.from < built.to
    const right = valid && sameInterval(built, round.target)
    const lock = (action: () => void) => () => !answered && action()
    return (
        <>
            <p className="prop3-prompt">
                {round.latex ? <strong>{formula(round.latex, language)}</strong> : l(round.words!)}
            </p>
            <IntervalLine value={answered && !right ? round.target : built} tone={answered ? 'var(--success, #267b53)' : undefined} />
            <p className="dbh4-readout" dir="ltr">{valid ? formula(intervalLatex(built), language) : l(say('Ezkerreko muturrak txikiagoa izan behar du.', 'El extremo izquierdo tiene que ser menor.', 'يجب أن يكون الطرف الأيسر أصغر.', 'The left end has to be smaller.'))}</p>
            {!answered && (
                <>
                    <div className="dbh4-ends">
                        <EndControls side="from" infinite={fromInfinite} closed={closedFrom} value={from} onInfinite={lock(() => setFromInfinite(!fromInfinite))} onClosed={lock(() => setClosedFrom(!closedFrom))} onValue={(value) => !answered && setFrom(value)} language={language} />
                        <EndControls side="to" infinite={toInfinite} closed={closedTo} value={to} onInfinite={lock(() => setToInfinite(!toInfinite))} onClosed={lock(() => setClosedTo(!closedTo))} onValue={(value) => !answered && setTo(value)} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" disabled={!valid} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(`${intervalLatex(round.target)}`, language)}{' '}
                    {formula(inequalityLatex(round.target), language)}
                </RoundVerdict>
            )}
        </>
    )
}

function intervalGameConfig(game: GameInfo, art: ReactNode, track: IntervalTrack): RoundGameConfig<IntervalRound> {
    return {
        game,
        art,
        rounds: INTERVAL_ROUNDS,
        rules: [
            say('Eraiki multzoa zuzenean: aukeratu muturrak eta itxiak ala irekiak diren.', 'Construye el conjunto en la recta: elige los extremos y si son cerrados o abiertos.', 'ابنِ المجموعة على المستقيم: اختر الطرفين وهل هما مغلقان أم مفتوحان.', 'Build the set on the line: choose the ends and whether they are closed or open.'),
            say('$[\\ ]$ itxia: muturra barruan dago. $(\\ )$ irekia: kanpoan.', '$[\\ ]$ cerrado: el extremo está dentro. $(\\ )$ abierto: fuera.', '$[\\ ]$ مغلق: الطرف داخل. $(\\ )$ مفتوح: خارج.', '$[\\ ]$ closed: the end is in. $(\\ )$ open: it is out.'),
            say(`${INTERVAL_ROUNDS} tarte maila bakoitzean; saiakera bat bakoitzeko.`, `${INTERVAL_ROUNDS} intervalos por nivel; un intento en cada uno.`, `${INTERVAL_ROUNDS} فترات في كل مستوى؛ محاولة واحدة لكل فترة.`, `${INTERVAL_ROUNDS} intervals per level; one try each.`)
        ],
        create: (random, level) => createIntervalRounds(random, level, track),
        stars: intervalStars,
        starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
        Round: IntervalPlay
    }
}

/** The game for a unit: its hub entry, its art and its track */
export function IntervalGame({ game, art, track, ...props }: GameProps & { game: GameInfo; art: ReactNode; track: IntervalTrack }) {
    return <RoundGame {...props} config={intervalGameConfig(game, art, track)} />
}

/** The art of the game, the same in every language */
export function IntervalArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="10" y1="70" x2="210" y2="70" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="60" y1="70" x2="160" y2="70" stroke="var(--blue, #2f5fb3)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="60" cy="70" r="8" fill="var(--card)" stroke="var(--blue, #2f5fb3)" strokeWidth="3" />
            <circle cx="160" cy="70" r="8" fill="var(--blue, #2f5fb3)" />
            <text x="110" y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">(−2, 5]</text>
        </svg>
    )
}
