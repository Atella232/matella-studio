import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import { fraction, toLatex } from '../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import type { Point } from '../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { standardStars } from './equations'
import { createSlopeRounds, meanRate, rightIntervals, SLOPE_MAX, SLOPE_MIN, SLOPE_ROUNDS, type SlopeRound } from './functions'
import { polyLatex, valueAt } from './polynomials'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   The mean slope (4. DBH functions, applied and academic): a function and
   its graph; choose a and b so that the mean rate of change on [a, b] is
   the target. The secant is drawn only after checking.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const X_MIN = -5
const X_MAX = 5
const curve = (coefficients: number[]): Point[] => Array.from({ length: 101 }, (_, index) => {
    const x = X_MIN + (index * (X_MAX - X_MIN)) / 100
    return [x, valueAt(coefficients, x)] as const
})
/** The plane fitted to the function on [−4, 4] */
function boxFor(coefficients: number[]) {
    const values = Array.from({ length: 9 }, (_, index) => valueAt(coefficients, index - 4))
    return { xMin: X_MIN, xMax: X_MAX, yMin: Math.min(-2, Math.floor(Math.min(...values)) - 1), yMax: Math.max(2, Math.ceil(Math.max(...values)) + 1) }
}

function SlopePlay({ round, language, onAnswer, answered }: RoundProps<SlopeRound>) {
    const l = useGameText(language)
    const [a, setA] = useState(0)
    const [b, setB] = useState(1)
    const valid = a < b
    const rate = valid ? meanRate(round.coefficients, a, b) : 0
    const right = valid && Math.abs(rate - round.target) < 1e-9
    const [fa, fb] = [valueAt(round.coefficients, a), valueAt(round.coefficients, b)]
    const example = rightIntervals(round)[0]
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Aukeratu tarte bat, batez besteko aldakuntza-tasa hau izan dezan:', 'Elige un intervalo cuya tasa de variación media sea:', 'اختر فترة يكون معدل تغيّرها المتوسط:', 'Choose an interval whose mean rate of change is:'))}
                <strong>{formula(`${toLatex(fraction(round.target))}`, language)}</strong>
            </p>
            <div className="func2-plane">
                <Plane box={boxFor(round.coefficients)} cell={13} labelStep={boxFor(round.coefficients).yMax - boxFor(round.coefficients).yMin > 16 ? 4 : 2} maxHeight={250} label={l(say('Grafikoa', 'Gráfica', 'التمثيل البياني', 'Graph'))}>
                    {(map, clip) => (
                        <g>
                            <PlanePath map={map} points={curve(round.coefficients)} clip={clip} />
                            {answered && valid && <PlanePath map={map} points={[[a, fa], [b, fb]]} color={right ? 'var(--success, #267b53)' : 'var(--error, #c4432a)'} width={3} clip={clip} />}
                            {valid && <PlanePoint map={map} point={[a, fa]} radius={5} color="var(--coral, #d9502e)" />}
                            {valid && <PlanePoint map={map} point={[b, fb]} radius={5} color="var(--coral, #d9502e)" />}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="dbh4-readout" dir="ltr">{formula(`f(x)=${polyLatex(round.coefficients)}`, language)}</p>
            {!answered && (
                <>
                    <div className="dbh4-ends">
                        <Stepper label="a" value={a} min={SLOPE_MIN} max={SLOPE_MAX} format={signed} onChange={setA} language={language} />
                        <Stepper label="b" value={b} min={SLOPE_MIN} max={SLOPE_MAX} format={signed} onChange={setB} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" disabled={!valid} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(`\\frac{f(${b})-f(${a})}{${b}-${a < 0 ? `(${a})` : a}}=\\frac{${fb}-${fa < 0 ? `(${fa})` : fa}}{${b - a}}=${toLatex(fraction(fb - fa, b - a))}`, language)}
                    {!right && example && <> {l(say('Adibidez:', 'Por ejemplo:', 'مثلًا:', 'For example:'))} {formula(`[${example[0]},\\,${example[1]}]`, language)}</>}
                </RoundVerdict>
            )}
        </>
    )
}

function slopeConfig(game: GameInfo, art: ReactNode): RoundGameConfig<SlopeRound> {
    return {
        game,
        art,
        rounds: SLOPE_ROUNDS,
        rules: [
            say('Batez besteko aldakuntza-tasa: $\\frac{f(b)-f(a)}{b-a}$, tarteko ebakitzailearen malda.', 'La tasa de variación media: $\\frac{f(b)-f(a)}{b-a}$, la pendiente de la secante.', 'معدل التغير المتوسط: $\\frac{f(b)-f(a)}{b-a}$، ميل القاطع.', 'The mean rate of change: $\\frac{f(b)-f(a)}{b-a}$, the slope of the secant.'),
            say('Aukeratu a eta b (a < b) eta egiaztatu: orduan agertuko da ebakitzailea.', 'Elige a y b (a < b) y comprueba: entonces aparecerá la secante.', 'اختر a وb (a < b) وتحقّق: عندها يظهر القاطع.', 'Choose a and b (a < b) and check: then the secant appears.'),
            say('Tarte bat baino gehiago izan daitezke zuzenak.', 'Puede haber más de un intervalo correcto.', 'قد تصح أكثر من فترة.', 'More than one interval can be right.')
        ],
        create: createSlopeRounds,
        stars: standardStars(SLOPE_ROUNDS),
        starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
        Round: SlopePlay
    }
}

export function MeanSlopeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return <RoundGame {...props} config={slopeConfig(game, art)} />
}

/** The art of the function games */
export function FunctionArt({ game }: { game: 'domain' | 'slope' }) {
    if (game === 'domain') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <text x="110" y="38" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">f(x) = √(x − 2)</text>
                <line x1="10" y1="80" x2="210" y2="80" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="90" y1="80" x2="210" y2="80" stroke="var(--blue, #2f5fb3)" strokeWidth="8" strokeLinecap="round" />
                <circle cx="90" cy="80" r="8" fill="var(--blue, #2f5fb3)" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d="M 20 20 Q 110 200 200 20" fill="none" stroke="var(--blue, #2f5fb3)" strokeWidth="4" />
            <line x1="56" y1="66" x2="176" y2="40" stroke="var(--coral)" strokeWidth="3.5" />
            <circle cx="56" cy="66" r="6" fill="var(--coral)" />
            <circle cx="176" cy="40" r="6" fill="var(--coral)" />
        </svg>
    )
}
