import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import type { Point } from '../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { standardStars } from './equations'
import { createHalfRounds, HALF_BOX, HALF_ROUNDS, inequalityLatex, inRegion, regionPoints, type HalfRound, type Inequality } from './halfPlanes'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   Touch the solution (4. DBH systems of inequalities): tap a whole point
   that satisfies every inequality; then the boundary lines and the whole
   points of the region are drawn.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'

/** Two points of the boundary line ax + by = c across the box */
function boundary({ a, b, c }: Inequality): Point[] {
    if (b === 0) return [[c / a, HALF_BOX.yMin - 1], [c / a, HALF_BOX.yMax + 1]]
    return [HALF_BOX.xMin - 1, HALF_BOX.xMax + 1].map((x) => [x, (c - a * x) / b] as const)
}

function TouchPlay({ round, language, onAnswer, answered }: RoundProps<HalfRound>) {
    const l = useGameText(language)
    const [point, setPoint] = useState<Point | null>(null)
    const right = point !== null && inRegion(round, point[0], point[1])
    const system = round.inequalities.length === 1 ? inequalityLatex(round.inequalities[0]) : `\\begin{cases}${round.inequalities.map(inequalityLatex).join('\\\\')}\\end{cases}`
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Sakatu soluzioko puntu bat (koordenatu osoak):', 'Pulsa un punto de la solución (coordenadas enteras):', 'اضغط نقطة من الحل (إحداثيات صحيحة):', 'Tap a point of the solution (whole coordinates):'))}
                <strong>{formula(system, language)}</strong>
            </p>
            <div className="func2-plane">
                <Plane box={HALF_BOX} cell={22} labelStep={2} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))} onPick={answered ? undefined : (picked) => setPoint(picked)}>
                    {(map, clip) => (
                        <g>
                            {answered && regionPoints(round).map(([x, y]) => <circle key={`${x}-${y}`} cx={map.x(x)} cy={map.y(y)} r="4" fill={GREEN} opacity="0.45" />)}
                            {answered && round.inequalities.map((inequality, index) => <PlanePath key={index} map={map} points={boundary(inequality)} color="var(--blue, #2f5fb3)" width={2.5} dashed={inequality.sign === '<' || inequality.sign === '>'} clip={clip} />)}
                            {point && <PlanePoint map={map} point={point} color={answered ? (right ? GREEN : RED) : 'var(--blue, #2f5fb3)'} radius={7} />}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="dbh4-readout" dir="ltr">{point ? formula(`(${point[0]},\\,${point[1]})`, language) : '—'}</p>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={!point} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {l(say('Puntu berdeak soluzioan daude. Marra etena: muga ez dago barruan.', 'Los puntos verdes están en la solución. Línea a trazos: el borde no entra.', 'النقاط الخضراء في الحل. الخط المتقطع: الحد غير داخل.', 'The green points are in the solution. Dashed line: the edge is not included.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function TouchSolutionGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HALF_ROUNDS,
                rules: [
                    say('Desberdintza bakoitzak planoa bitan zatitzen du. Soluzioa denek betetzen duten eskualdea da.', 'Cada inecuación parte el plano en dos. La solución es la región que cumple todas.', 'كل متباينة تقسم المستوى إلى قسمين. والحل هو المنطقة التي تحققها كلها.', 'Each inequality cuts the plane in two. The solution is the region that satisfies all of them.'),
                    say('Probatu puntu bat: ordeztu eta begiratu desberdintza betetzen den.', 'Prueba un punto: sustituye y mira si se cumple la desigualdad.', 'جرّب نقطة: عوّض وانظر هل تتحقق المتباينة.', 'Test a point: substitute and see whether the inequality holds.'),
                    say(`${HALF_ROUNDS} sistema maila bakoitzean.`, `${HALF_ROUNDS} sistemas por nivel.`, `${HALF_ROUNDS} أنظمة في كل مستوى.`, `${HALF_ROUNDS} systems per level.`)
                ],
                create: createHalfRounds,
                stars: standardStars(HALF_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TouchPlay
            }}
        />
    )
}

/** The art of the game */
export function TouchArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <polygon points="40,110 180,110 110,20" fill="var(--success-tint, #d9efe2)" />
            <line x1="20" y1="110" x2="200" y2="110" stroke="var(--blue, #2f5fb3)" strokeWidth="3" />
            <line x1="30" y1="120" x2="120" y2="8" stroke="var(--blue, #2f5fb3)" strokeWidth="3" strokeDasharray="8 6" />
            <line x1="100" y1="8" x2="190" y2="120" stroke="var(--blue, #2f5fb3)" strokeWidth="3" />
            <circle cx="110" cy="76" r="8" fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth="2" />
        </svg>
    )
}
