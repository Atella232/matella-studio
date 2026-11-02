import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { standardStars } from './equations'
import { createJumpRounds, createLinesRounds, JUMP_ROUNDS, jumpLanding, K_RANGE, lineLatex, linePoints, LINES_ROUNDS, VECTOR_BOX, withK, type JumpRound, type LinesRound, type Pair } from './vectors'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   The vector jump and Find k (4. DBH academic vectors and lines): two
   numbers are set first; then the arrows or the lines are drawn.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const BLUE = 'var(--blue, #2f5fb3)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const CORAL = 'var(--coral, #d9502e)'
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const pair = ([x, y]: Pair) => `(${x},${y})`
const same = (a: Pair, b: Pair) => a[0] === b[0] && a[1] === b[1]

type PlaneMap = { x: (value: number) => number; y: (value: number) => number }

/** An arrow on the plane from one point to another */
function Arrow({ map, from, to, colour, dashed, clip }: { map: PlaneMap; from: Pair; to: Pair; colour: string; dashed?: boolean; clip?: string }) {
    const [x1, y1, x2, y2] = [map.x(from[0]), map.y(from[1]), map.x(to[0]), map.y(to[1])]
    const length = Math.hypot(x2 - x1, y2 - y1)
    if (length < 1) return null
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = `${x2},${y2} ${x2 - 11 * ux - 5 * uy},${y2 - 11 * uy + 5 * ux} ${x2 - 11 * ux + 5 * uy},${y2 - 11 * uy - 5 * ux}`
    return (
        <g clipPath={clip}>
            <line x1={x1} y1={y1} x2={x2 - 8 * ux} y2={y2 - 8 * uy} stroke={colour} strokeWidth="3" strokeDasharray={dashed ? '6 4' : undefined} />
            <polygon points={head} fill={colour} />
        </g>
    )
}

function Label({ map, at, text, colour = INK }: { map: PlaneMap; at: Pair; text: string; colour?: string }) {
    return <text x={map.x(at[0]) + 7} y={map.y(at[1]) - 7} fontSize="14" fontWeight="700" fill={colour}>{text}</text>
}

/* ---------- The vector jump ---------- */

function JumpPlay({ round, language, onAnswer, answered }: RoundProps<JumpRound>) {
    const l = useGameText(language)
    const [p, setP] = useState(0)
    const [q, setQ] = useState(0)
    const right = same([p, q], round.answer)
    const landing = jumpLanding(round, [p, q])
    const truth = jumpLanding(round, round.answer)
    const colour = answered ? (right ? GREEN : RED) : BLUE
    const range = round.kind === 'combination' ? 4 : 12
    const names = round.kind === 'vector' ? ['x', 'y'] : round.kind === 'mirror' ? ['x', 'y'] : ['a', 'b']
    const prompt = round.kind === 'vector'
        ? say('Aurkitu $\\overrightarrow{AB}$ bektorea.', 'Halla el vector $\\overrightarrow{AB}$.', 'أوجد المتجه $\\overrightarrow{AB}$.', 'Find the vector $\\overrightarrow{AB}$.')
        : round.kind === 'mirror'
            ? say('M da AB zuzenkiaren erdiko puntua. Aurkitu B.', 'M es el punto medio del segmento AB. Halla B.', 'M منتصف القطعة AB. أوجد B.', 'M is the midpoint of the segment AB. Find B.')
            : say(`Aurkitu a eta b, $a\\vec{u}+b\\vec{v}=\\vec{w}$ izan dadin: $\\vec{u}=${pair(round.u)}$, $\\vec{v}=${pair(round.v)}$, $\\vec{w}=${pair(round.w)}$.`, `Halla a y b para que $a\\vec{u}+b\\vec{v}=\\vec{w}$: $\\vec{u}=${pair(round.u)}$, $\\vec{v}=${pair(round.v)}$, $\\vec{w}=${pair(round.w)}$.`, `أوجد a وb بحيث $a\\vec{u}+b\\vec{v}=\\vec{w}$: $\\vec{u}=${pair(round.u)}$ و$\\vec{v}=${pair(round.v)}$ و$\\vec{w}=${pair(round.w)}$.`, `Find a and b so that $a\\vec{u}+b\\vec{v}=\\vec{w}$: $\\vec{u}=${pair(round.u)}$, $\\vec{v}=${pair(round.v)}$, $\\vec{w}=${pair(round.w)}$.`)
    const readout = round.kind === 'vector' ? `\\overrightarrow{AB}=${pair([p, q])}` : round.kind === 'mirror' ? `B=${pair([p, q])}` : `${p}\\vec{u}${q < 0 ? '' : '+'}${q}\\vec{v}=${pair(landing)}`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            <div className="func2-plane">
                <Plane box={VECTOR_BOX} cell={22} labelStep={2} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))}>
                    {(map, clip) => (
                        <g>
                            {round.kind === 'vector' && (
                                <g>
                                    {answered && <Arrow map={map} from={round.a} to={round.b} colour={GREEN} dashed={!right} clip={clip} />}
                                    {answered && <Arrow map={map} from={round.a} to={landing} colour={colour} clip={clip} />}
                                    <PlanePoint map={map} point={round.a} color={BLUE} radius={6} />
                                    <PlanePoint map={map} point={round.b} color={CORAL} radius={6} />
                                    <Label map={map} at={round.a} text={`A${pair(round.a)}`} colour={BLUE} />
                                    <Label map={map} at={round.b} text={`B${pair(round.b)}`} colour={CORAL} />
                                </g>
                            )}
                            {round.kind === 'mirror' && (
                                <g>
                                    {answered && <PlanePath map={map} points={[round.a, truth]} color={GREEN} width={2.5} clip={clip} />}
                                    <PlanePoint map={map} point={round.a} color={BLUE} radius={6} />
                                    <PlanePoint map={map} point={round.m} color={INK} radius={5} />
                                    <Label map={map} at={round.a} text={`A${pair(round.a)}`} colour={BLUE} />
                                    <Label map={map} at={round.m} text={`M${pair(round.m)}`} />
                                    {answered && <PlanePoint map={map} point={truth} color={GREEN} radius={6} />}
                                    {(p !== 0 || q !== 0) && <PlanePoint map={map} point={landing} color={colour} radius={6} />}
                                </g>
                            )}
                            {round.kind === 'combination' && (
                                <g>
                                    <Arrow map={map} from={[0, 0]} to={round.u} colour={BLUE} />
                                    <Arrow map={map} from={[0, 0]} to={round.v} colour={CORAL} />
                                    <Label map={map} at={round.u} text="u" colour={BLUE} />
                                    <Label map={map} at={round.v} text="v" colour={CORAL} />
                                    <PlanePoint map={map} point={round.w} color={INK} radius={6} />
                                    <Label map={map} at={round.w} text="w" />
                                    {answered && !right && <Arrow map={map} from={[0, 0]} to={[round.answer[0] * round.u[0], round.answer[0] * round.u[1]]} colour={GREEN} dashed clip={clip} />}
                                    {answered && !right && <Arrow map={map} from={[round.answer[0] * round.u[0], round.answer[0] * round.u[1]]} to={round.w} colour={GREEN} dashed clip={clip} />}
                                    {answered && <Arrow map={map} from={[0, 0]} to={[p * round.u[0], p * round.u[1]]} colour={colour} clip={clip} />}
                                    {answered && <Arrow map={map} from={[p * round.u[0], p * round.u[1]]} to={landing} colour={colour} clip={clip} />}
                                </g>
                            )}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="dbh4-readout" dir="ltr">{formula(readout, language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={names[0]} value={p} min={-range} max={range} format={signed} onChange={setP} language={language} />
                        <Stepper label={names[1]} value={q} min={-range} max={range} format={signed} onChange={setQ} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.kind === 'vector' && formula(`\\overrightarrow{AB}=B-A=(${round.b[0]}-${round.a[0] < 0 ? `(${round.a[0]})` : round.a[0]},${round.b[1]}-${round.a[1] < 0 ? `(${round.a[1]})` : round.a[1]})=${pair(round.answer)}`, language)}
                    {round.kind === 'mirror' && formula(`B=2M-A=(2\\cdot ${round.m[0] < 0 ? `(${round.m[0]})` : round.m[0]}-${round.a[0] < 0 ? `(${round.a[0]})` : round.a[0]},\\,2\\cdot ${round.m[1] < 0 ? `(${round.m[1]})` : round.m[1]}-${round.a[1] < 0 ? `(${round.a[1]})` : round.a[1]})=${pair(round.answer)}`, language)}
                    {round.kind === 'combination' && formula(`${round.answer[0]}\\vec{u}${round.answer[1] < 0 ? '' : '+'}${round.answer[1]}\\vec{v}=${pair(round.w)}`, language)}
                </RoundVerdict>
            )}
        </>
    )
}

export function VectorJumpGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: JUMP_ROUNDS,
                rules: [
                    say('$\\overrightarrow{AB}=B-A$: muturra ken jatorria.', '$\\overrightarrow{AB}=B-A$: extremo menos origen.', '$\\overrightarrow{AB}=B-A$: النهاية ناقص البداية.', '$\\overrightarrow{AB}=B-A$: end minus start.'),
                    say('Erdiko puntua $M=\\frac{A+B}{2}$; beraz $B=2M-A$.', 'El punto medio es $M=\\frac{A+B}{2}$; así que $B=2M-A$.', 'المنتصف $M=\\frac{A+B}{2}$؛ إذن $B=2M-A$.', 'The midpoint is $M=\\frac{A+B}{2}$; so $B=2M-A$.'),
                    say('Jarri bi zenbakiak eta egiaztatu: orduan agertuko dira geziak.', 'Pon los dos números y comprueba: entonces aparecen las flechas.', 'ضع العددين وتحقّق: عندها تظهر الأسهم.', 'Set the two numbers and check: then the arrows appear.')
                ],
                create: createJumpRounds,
                stars: standardStars(JUMP_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: JumpPlay
            }}
        />
    )
}

/* ---------- Find k ---------- */

function LinesPlay({ round, language, onAnswer, answered }: RoundProps<LinesRound>) {
    const l = useGameText(language)
    const [k, setK] = useState(0)
    const right = k === round.k
    const movingLatex = lineLatex(round.moving, { slot: round.slot, text: 'k' })
    const prompt = round.kind === 'parallel'
        ? say('Aurkitu k, bi zuzenak paraleloak izan daitezen:', 'Halla k para que las dos rectas sean paralelas:', 'أوجد k ليكون المستقيمان متوازيين:', 'Find k so that the two lines are parallel:')
        : round.kind === 'perpendicular'
            ? say('Aurkitu k, bi zuzenak perpendikularrak izan daitezen:', 'Halla k para que las dos rectas sean perpendiculares:', 'أوجد k ليكون المستقيمان متعامدين:', 'Find k so that the two lines are perpendicular:')
            : say(`Aurkitu k, zuzena $P${pair(round.point!)}$ puntutik pasa dadin:`, `Halla k para que la recta pase por $P${pair(round.point!)}$:`, `أوجد k ليمرّ المستقيم بالنقطة $P${pair(round.point!)}$:`, `Find k so that the line passes through $P${pair(round.point!)}$:`)
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(prompt)} inline />
                {round.kind !== 'through' && <span className="dbh4-worked">{formula(`r:\\ ${lineLatex(round.fixed)}`, language)}</span>}
                <span className="dbh4-worked">{formula(`s:\\ ${movingLatex}`, language)}</span>
            </p>
            {answered && (
                <div className="func2-plane">
                    <Plane box={VECTOR_BOX} cell={22} labelStep={2} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))}>
                        {(map, clip) => (
                            <g>
                                {round.kind !== 'through' && <PlanePath map={map} points={linePoints(round.fixed)} color={BLUE} width={2.6} clip={clip} />}
                                {!right && <PlanePath map={map} points={linePoints(withK(round, round.k))} color={GREEN} width={2.4} dashed clip={clip} />}
                                {(k !== 0 || round.slot === 'c') && <PlanePath map={map} points={linePoints(withK(round, k))} color={right ? GREEN : RED} width={2.6} clip={clip} />}
                                {round.point && <PlanePoint map={map} point={round.point} color={INK} radius={6} />}
                            </g>
                        )}
                    </Plane>
                </div>
            )}
            <p className="dbh4-readout" dir="ltr">{formula(`s:\\ ${lineLatex(withK(round, k))}`, language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers">
                        <Stepper label="k" value={k} min={-K_RANGE} max={K_RANGE} format={signed} onChange={setK} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.kind === 'parallel' && formula(`\\frac{k}{${round.fixed.a}}=\\frac{${round.moving.b}}{${round.fixed.b}}\\ \\to\\ k=${round.k}`, language)}
                    {round.kind === 'perpendicular' && formula(`${round.fixed.a}\\cdot k+${round.fixed.b < 0 ? `(${round.fixed.b})` : round.fixed.b}\\cdot ${round.moving.b < 0 ? `(${round.moving.b})` : round.moving.b}=0\\ \\to\\ k=${round.k}`, language)}
                    {round.kind === 'through' && formula(`${lineLatex(round.moving, { slot: 'c', text: 'k' }).replace(/x/, `\\cdot ${round.point![0] < 0 ? `(${round.point![0]})` : round.point![0]}`).replace(/y/, `\\cdot ${round.point![1] < 0 ? `(${round.point![1]})` : round.point![1]}`)}\\ \\to\\ k=${round.k}`, language)}
                    {' '}{round.kind === 'parallel'
                        ? l(say('Paraleloak: x eta y-ren koefizienteak proportzionalak.', 'Paralelas: los coeficientes de x e y, proporcionales.', 'متوازيان: معاملا x وy متناسبان.', 'Parallel: the coefficients of x and y are proportional.'))
                        : round.kind === 'perpendicular'
                            ? l(say('Perpendikularrak: bektore normalen biderkadura eskalarra 0 da.', 'Perpendiculares: el producto escalar de los vectores normales es 0.', 'متعامدان: الجداء السلمي للمتجهين الناظمين 0.', 'Perpendicular: the dot product of the normal vectors is 0.'))
                            : l(say('Ordeztu P puntua zuzenaren ekuazioan.', 'Sustituye el punto P en la ecuación de la recta.', 'عوّض النقطة P في معادلة المستقيم.', 'Substitute the point P in the equation of the line.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function FindKGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LINES_ROUNDS,
                rules: [
                    say('$ax+by+c=0$ zuzenaren bektore normala $(a,b)$ da.', 'El vector normal de la recta $ax+by+c=0$ es $(a,b)$.', 'المتجه الناظم للمستقيم $ax+by+c=0$ هو $(a,b)$.', 'The normal vector of the line $ax+by+c=0$ is $(a,b)$.'),
                    say('Paraleloak: normalak proportzionalak. Perpendikularrak: normalen biderkadura eskalarra 0.', 'Paralelas: normales proporcionales. Perpendiculares: producto escalar de las normales 0.', 'متوازيان: الناظمان متناسبان. متعامدان: جداؤهما السلمي 0.', 'Parallel: proportional normals. Perpendicular: the dot product of the normals is 0.'),
                    say('Aukeratu k eta egiaztatu: orduan marraztuko dira zuzenak.', 'Elige k y comprueba: entonces se dibujan las rectas.', 'اختر k وتحقّق: عندها يُرسم المستقيمان.', 'Choose k and check: then the lines are drawn.')
                ],
                create: createLinesRounds,
                stars: standardStars(LINES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: LinesPlay
            }}
        />
    )
}

/** The art of the vectors games */
export function VectorArt({ game }: { game: 'jump' | 'lines' }) {
    if (game === 'jump') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <circle cx="40" cy="92" r="7" fill={BLUE} />
                <circle cx="176" cy="30" r="7" fill={CORAL} />
                <line x1="40" y1="92" x2="164" y2="36" stroke={GREEN} strokeWidth="4" />
                <polygon points="174,31 158,32 164,44" fill={GREEN} />
                <text x="30" y="114" fontSize="16" fontWeight="700" fill="var(--ink)">A</text>
                <text x="184" y="24" fontSize="16" fontWeight="700" fill="var(--ink)">B</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="10" y1="100" x2="200" y2="20" stroke={BLUE} strokeWidth="4" />
            <line x1="30" y1="112" x2="214" y2="35" stroke={GREEN} strokeWidth="4" strokeDasharray="8 6" />
            <text x="100" y="40" fontSize="20" fontWeight="700" fill="var(--ink)" direction="ltr">k = ?</text>
        </svg>
    )
}
