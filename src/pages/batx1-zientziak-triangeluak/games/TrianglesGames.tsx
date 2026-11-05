import { useState, type PointerEvent, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { localize } from '../../dbh4-akademikoak-trigonometria/text'
import { compassCuts } from '../lab/compass'
import './TrianglesGames.css'
import { COUNT_ROUNDS, countWorking, createCountRounds, isCountChoice, type CountRound, type TriangleCount } from './count'
import { checkMove, createPiecesRounds, isAngle, offeredMoves, PIECES, PIECES_ROUNDS, solutionMoves, type Move, type MoveProblem, type Piece, type PiecesRound, type Tool } from './pieces'
import { createStationRounds, flagIsClose, MAP, metres, STATION_ROUNDS, toMetres, type StationRound } from './station'

/* ==========================================================================
   Zenbat triangelu?, Zatika ebatzi and Aurkitu igorlea (Triangeluen
   ebazpena, Batxilergoa 1 · Zientziak): how many triangles two sides and
   an opposite angle give, with the compass drawn after the answer; a
   triangle finished piece by piece with 180°, the sine rule or the cosine
   rule; and a radio station found from two angles, with a flag on the map
   and then the sine rule.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const D = Math.PI / 180
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f5fb3)'
const CORAL = 'var(--error, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
type Point = [number, number]
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/** A formula in the language's notation (\sen and \tg in its names, its decimal mark) */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
/** A number for LaTeX with the decimal comma (MathText writes the point in English and Arabic) */
const tex = (value: number, digits: number) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', '{,}')
/** A number in a drawing: the comma in Basque and Spanish, the point in English and Arabic */
const num = (value: number, digits: number, language: UnitLanguage) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'eu' || language === 'es' ? ',' : '.')

/* ---------- How many triangles? ---------- */

/** The ray from A, the side b to C and, once answered, the compass of side a and its cuts */
function CompassScene({ round, answered, language }: { round: CountRound; answered: boolean; language: UnitLanguage }) {
    const u = 16
    const baseY = 186
    const cosA = Math.cos(round.A * D)
    const A: Point = [22 + Math.max(0, -round.b * cosA) * u, baseY]
    const C: Point = [A[0] + round.b * cosA * u, baseY - round.b * Math.sin(round.A * D) * u]
    const cuts = compassCuts(round).map((cut): Point => [A[0] + cut * u, baseY])
    const { height } = countWorking(round)
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 214" direction="ltr" aria-hidden="true">
            <defs><clipPath id="triangles-count-scene"><rect x={0} y={0} width={340} height={214} rx={14} /></clipPath></defs>
            <line x1={A[0]} y1={baseY} x2={332} y2={baseY} stroke={INK} strokeWidth={2} />
            {answered && cuts.map((B, index) => <polygon key={index} points={points([A, B, C])} fill={index === cuts.length - 1 ? 'var(--blue-tint, #dde7f7)' : 'var(--mustard-tint, #fbebc0)'} opacity={0.8} />)}
            <line x1={C[0]} y1={C[1]} x2={C[0]} y2={baseY} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth={3} />
            {answered && <circle cx={C[0]} cy={C[1]} r={round.a * u} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" clipPath="url(#triangles-count-scene)" />}
            {answered && cuts.map((B, index) => <line key={index} x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={index === cuts.length - 1 ? BLUE : CORAL} strokeWidth={3} />)}
            {answered && cuts.map((B, index) => <circle key={index} cx={B[0]} cy={B[1]} r={5} fill={index === cuts.length - 1 ? BLUE : CORAL} />)}
            <circle cx={A[0]} cy={A[1]} r={4} fill={INK} />
            <circle cx={C[0]} cy={C[1]} r={4} fill={INK} />
            <text x={A[0]} y={baseY + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>A</text>
            <text x={C[0]} y={C[1] - 9} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>C</text>
            <text x={A[0] + 26} y={baseY - 8} fontSize={13} fontWeight={700} fill={CORAL}>{`${round.A}°`}</text>
            <text x={(A[0] + C[0]) / 2 - 8} y={(A[1] + C[1]) / 2} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>{`b = ${round.b}`}</text>
            {round.drawing === 'height' && <text x={C[0] + 6} y={(C[1] + baseY) / 2} fontSize={13} fontWeight={700} fill={MUTED}>{`h ≈ ${num(height, 2, language)}`}</text>}
            <line x1={332 - round.a * u} y1={14} x2={332} y2={14} stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
            <text x={332} y={34} textAnchor="end" fontSize={14} fontWeight={700} fill={CORAL}>{`a = ${round.a}`}</text>
        </svg>
    )
}

const COUNT_LABELS: Record<TriangleCount, LocalizedText> = {
    0: say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'),
    1: say('Bat', 'Uno', 'واحد', 'One'),
    2: say('Bi', 'Dos', 'اثنان', 'Two')
}

function CountPlay({ round, language, onAnswer, answered }: RoundProps<CountRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<TriangleCount | null>(null)
    const { sine, angles } = countWorking(round)
    const choose = (count: TriangleCount) => {
        if (answered) return
        setChoice(count)
        onAnswer(isCountChoice(round, count))
    }
    const data = `a=${round.a},\\quad b=${round.b},\\quad A=${round.A}°`
    const working = round.A < 90 || round.count > 0 ? `\\sen B=\\dfrac{${round.b}\\cdot\\sen ${round.A}°}{${round.a}}\\approx ${tex(sine, 3)}` : null
    const why = round.count === 0
        ? (sine > 1
            ? say('$a$ altuera baino laburragoa da: ez da zuzenera iristen.', '$a$ es más corto que la altura: no llega a la recta.', '$a$ أقصر من الارتفاع: لا يصل إلى المستقيم.', '$a$ is shorter than the height: it does not reach the line.')
            : say('A kamutsa da eta $a<b$: ebakidura A-ren atzean geratzen da.', 'A es obtuso y $a<b$: el corte queda detrás de A.', 'A منفرجة و$a<b$: يقع التقاطع خلف A.', 'A is obtuse and $a<b$: the cut falls behind A.'))
        : round.count === 2
            ? say('$a$ altuera eta $b$ artean dago: bi ebakidura.', '$a$ está entre la altura y $b$: dos cortes.', '$a$ بين الارتفاع و$b$: تقاطعان.', '$a$ is between the height and $b$: two cuts.')
            : round.a === round.b
                ? say('$a=b$: beste ebakidura A-n bertan dago; triangelu isoszele bakarra.', '$a=b$: el otro corte cae en el propio A; un solo triángulo, isósceles.', '$a=b$: يقع التقاطع الآخر عند A نفسها؛ مثلث واحد متساوي الساقين.', '$a=b$: the other cut falls on A itself; a single isosceles triangle.')
            : angles.length === 1 && Math.abs(angles[0] - 90) < 1e-9
                ? say('$a$ altuera bera da: konpasak ukitu besterik ez du egiten.', '$a$ mide lo mismo que la altura: el compás solo toca.', '$a$ يساوي الارتفاع: الفرجار يلمس فقط.', '$a$ is as long as the height: the compass only touches.')
                : say('Ebakidura bakarra A-ren aurrean.', 'Un solo corte delante de A.', 'تقاطع واحد أمام A.', 'A single cut in front of A.')
    const anglesLatex = angles.length === 2 ? `B_1\\approx ${tex(angles[1], 1)}°\\qquad B_2\\approx ${tex(angles[0], 1)}°` : angles.length === 1 ? `B\\approx ${tex(angles[0], 1)}°` : null
    return (
        <>
            <p className="prop3-prompt">{l(say('Zenbat triangelu daude datu hauekin?', '¿Cuántos triángulos hay con estos datos?', 'كم مثلثًا توجد بهذه المعطيات؟', 'How many triangles are there with these data?'))}</p>
            <div className="dbh4-big-formula tri-big" dir="ltr">{formula(data, language)}</div>
            {(round.drawing !== 'none' || answered) && <CompassScene round={round} answered={answered} language={language} />}
            <div className="prop3-options tri-three">
                {([0, 1, 2] as TriangleCount[]).map((count) => {
                    const mark = !answered ? '' : count === round.count ? 'right' : count === choice ? 'wrong' : ''
                    return <button key={count} type="button" disabled={answered} className={mark} onClick={() => choose(count)}>{l(COUNT_LABELS[count])}</button>
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice === round.count} language={language}>
                    {working && <span className="dbh4-worked">{formula(working, language)}</span>}
                    {anglesLatex && <span className="dbh4-worked">{formula(anglesLatex, language)}</span>}
                    <span className="dbh4-worked"><MathText text={l(why)} /></span>
                </RoundVerdict>
            )}
        </>
    )
}

export function CountGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: COUNT_ROUNDS,
                rules: [
                    say('Bi alde, $a$ eta $b$, eta $a$ aldearen aurkako A angelua ematen dira.', 'Se dan dos lados, $a$ y $b$, y el ángulo A opuesto a $a$.', 'يُعطى ضلعان $a$ و$b$ والزاوية A المقابلة لـ $a$.', 'You are given two sides, $a$ and $b$, and the angle A opposite $a$.'),
                    say('Esan zenbat triangelu dauden: bat ere ez, bat edo bi.', 'Di cuántos triángulos hay: ninguno, uno o dos.', 'قل كم مثلثًا يوجد: لا شيء أو واحد أو اثنان.', 'Say how many triangles there are: none, one or two.'),
                    say('Gero, $a$ aldearen konpasa C-tik marraztuko da.', 'Después se dibuja el compás del lado $a$ desde C.', 'ثم يُرسم فرجار الضلع $a$ من C.', 'Then the compass of side $a$ is drawn from C.')
                ],
                create: createCountRounds,
                stars: standardStars(COUNT_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: CountPlay
            }}
        />
    )
}

/* ---------- Solve it piece by piece ---------- */

const TOOL_LABELS: Record<Tool, LocalizedText> = {
    sum: say('180°', '180°', '180°', '180°'),
    sines: say('Sinuak', 'Senos', 'الجيوب', 'Sines'),
    cosine: say('Kosinua', 'Coseno', 'جيب التمام', 'Cosine')
}

const PROBLEMS: Record<MoveProblem, LocalizedText> = {
    'two-angles': say('180°-rekin beste bi angeluak behar dira.', 'Con 180° hacen falta los otros dos ángulos.', 'مع 180° تلزم الزاويتان الأخريان.', 'With 180° you need the other two angles.'),
    'no-pair': say('Sinuekin alde–aurkako angelu bikote ezagun bat behar da.', 'Con los senos hace falta una pareja lado–ángulo opuesto conocida.', 'مع الجيوب يلزم ثنائي معروف من ضلع وزاوية مقابلة.', 'With the sines you need a known side–opposite angle pair.'),
    'opposite-unknown': say('Sinuekin, piezaren aurkakoa ezagutu behar da.', 'Con los senos hay que conocer lo opuesto a esa pieza.', 'مع الجيوب يجب معرفة ما يقابل هذه القطعة.', 'With the sines you must know what is opposite that piece.'),
    ambiguous: say('Arriskutsua: alde handiago baten angelua kamutsa izan liteke, eta kalkulagailuak zorrotza ematen du. Erabili kosinua.', 'Peligroso: el ángulo de un lado mayor podría ser obtuso, y la calculadora da el agudo. Usa el coseno.', 'خطر: قد تكون زاوية الضلع الأكبر منفرجة والآلة الحاسبة تعطي الحادة. استعمل جيب التمام.', 'Risky: the angle of a longer side could be obtuse, and the calculator gives the acute one. Use the cosine.'),
    'two-sides-angle': say('Kosinuarekin alde bat lortzeko, beste bi aldeak eta haien arteko angelua behar dira.', 'Para un lado con el coseno hacen falta los otros dos lados y el ángulo que forman.', 'لإيجاد ضلع بجيب التمام يلزم الضلعان الآخران والزاوية بينهما.', 'For a side with the cosine you need the other two sides and the angle between them.'),
    'three-sides': say('Kosinuarekin angelu bat lortzeko, hiru aldeak behar dira.', 'Para un ángulo con el coseno hacen falta los tres lados.', 'لإيجاد زاوية بجيب التمام تلزم الأضلاع الثلاثة.', 'For an angle with the cosine you need the three sides.')
}

/** The triangle of the round, scaled into the scene, with each piece's value or a question mark */
function PiecesScene({ round, known, language }: { round: PiecesRound; known: Piece[]; language: UnitLanguage }) {
    const { b, c, A } = round.triangle
    // A at the origin, B at (c, 0), C at (b · cos A, b · sen A), scaled to fit
    const cx = b * Math.cos(A * D)
    const units = Math.max(c, cx) - Math.min(0, cx)
    const scale = Math.min(250 / units, 128 / (b * Math.sin(A * D)))
    const left = (340 - units * scale) / 2 - Math.min(0, cx) * scale
    const pA: Point = [left, 168]
    const pB: Point = [left + c * scale, 168]
    const pC: Point = [left + cx * scale, 168 - b * Math.sin(A * D) * scale]
    const value = (piece: Piece) => {
        if (!known.includes(piece)) return '?'
        const shown = num(round.triangle[piece], isAngle(piece) ? 1 : 2, language)
        return isAngle(piece) ? `${shown}°` : shown
    }
    const color = (piece: Piece) => (!known.includes(piece) ? MUTED : round.known.includes(piece) ? INK : GREEN)
    const mid = (p: Point, q: Point, push: Point): Point => [(p[0] + q[0]) / 2 + push[0], (p[1] + q[1]) / 2 + push[1]]
    const sideLabel: Record<'a' | 'b' | 'c', Point> = { a: mid(pB, pC, [12, -4]), b: mid(pA, pC, [-12, -4]), c: mid(pA, pB, [0, 24]) }
    const angleLabel: Record<'A' | 'B' | 'C', Point> = { A: [pA[0] - 4, pA[1] + 24], B: [pB[0] + 4, pB[1] + 24], C: [pC[0], pC[1] - 12] }
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 204" direction="ltr" aria-hidden="true">
            <polygon points={points([pA, pB, pC])} fill="var(--blue-tint, #dde7f7)" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            {(['a', 'b', 'c'] as const).map((side) => <text key={side} x={sideLabel[side][0]} y={sideLabel[side][1]} textAnchor={side === 'a' ? 'start' : side === 'b' ? 'end' : 'middle'} fontSize={14} fontWeight={700} fill={color(side)}>{`${side} = ${value(side)}`}</text>)}
            {(['A', 'B', 'C'] as const).map((angle) => <text key={angle} x={angleLabel[angle][0]} y={angleLabel[angle][1]} textAnchor="middle" fontSize={14} fontWeight={700} fill={color(angle)}>{`${angle} = ${value(angle)}`}</text>)}
        </svg>
    )
}

function PiecesPlay({ round, language, onAnswer, answered }: RoundProps<PiecesRound>) {
    const l = useGameText(language)
    const [known, setKnown] = useState<Piece[]>(round.known)
    const [mistake, setMistake] = useState<{ move: Move; problem: MoveProblem } | null>(null)
    const play = (move: Move) => {
        if (answered) return
        const problem = checkMove(round, known, move)
        if (problem) {
            setMistake({ move, problem })
            onAnswer(false)
            return
        }
        const next = [...known, move.piece]
        setKnown(next)
        if (next.length === PIECES.length) onAnswer(true)
    }
    const missing = PIECES.filter((piece) => !known.includes(piece))
    const moves = offeredMoves(known)
    const order = solutionMoves(round)
    return (
        <>
            <p className="prop3-prompt">{l(say('Osatu triangelua: aukeratu pieza bat eta hura kalkulatzeko tresna.', 'Completa el triángulo: elige una pieza y la herramienta para calcularla.', 'أكمل المثلث: اختر قطعة والأداة لحسابها.', 'Finish the triangle: choose a piece and the tool to work it out.'))}</p>
            <PiecesScene round={round} known={answered && mistake ? PIECES : known} language={language} />
            {!answered && (
                <div className="tri-moves">
                    {missing.map((piece) => (
                        <div key={piece} className="tri-move-row" role="group" aria-label={piece}>
                            <span className="tri-move-piece" dir="ltr">{formula(piece, language)}</span>
                            {moves.filter((move) => move.piece === piece).map((move) => <button key={move.tool} type="button" onClick={() => play(move)}>{l(TOOL_LABELS[move.tool])}</button>)}
                        </div>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={!mistake} language={language}>
                    {mistake && <span className="dbh4-worked"><MathText text={`${l(say(`$${mistake.move.piece}$, ${TOOL_LABELS[mistake.move.tool].eu.toLowerCase()}:`, `$${mistake.move.piece}$ con ${TOOL_LABELS[mistake.move.tool].es.toLowerCase()}:`, `$${mistake.move.piece}$ بـ${TOOL_LABELS[mistake.move.tool].ar}:`, `$${mistake.move.piece}$ with the ${TOOL_LABELS[mistake.move.tool].en.toLowerCase()}:`))} ${l(PROBLEMS[mistake.problem])}`} /></span>}
                    <span className="dbh4-worked">{l(say('Ordena on bat:', 'Un buen orden:', 'ترتيب جيد:', 'A good order:'))} {order.map((move, index) => <span key={index} className="tri-step" dir="ltr">{formula(move.piece, language)} <small>{l(TOOL_LABELS[move.tool])}</small>{index < order.length - 1 ? ' → ' : ''}</span>)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function PiecesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PIECES_ROUNDS,
                rules: [
                    say('Triangeluaren sei piezetatik hiru ezagutzen dira.', 'Se conocen tres de las seis piezas del triángulo.', 'تُعرف ثلاث من قطع المثلث الست.', 'Three of the six pieces of the triangle are known.'),
                    say('Pieza bakoitza kalkulatzeko, aukeratu tresna: 180°, sinuak edo kosinua. Ezagutzen duzunarekin bakarrik balio du.', 'Para cada pieza elige la herramienta: 180°, senos o coseno. Solo vale con lo que ya sabes.', 'لكل قطعة اختر الأداة: 180° أو الجيوب أو جيب التمام. ولا تصلح إلا بما تعرفه.', 'For each piece choose the tool: 180°, sines or cosine. It only works with what you already know.'),
                    say('Pausu txar batek txanda amaitzen du.', 'Un paso que no se puede dar acaba la ronda.', 'خطوة غير ممكنة تنهي الجولة.', 'A step that cannot be taken ends the round.')
                ],
                create: createPiecesRounds,
                stars: standardStars(PIECES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: PiecesPlay
            }}
        />
    )
}

/* ---------- Find the radio station ---------- */

/** A sight line from a post at a screen angle, drawn up to a share of its length to the station */
function SightLine({ from, to, share, color }: { from: Point; to: Point; share: number; color: string }) {
    const end: Point = [from[0] + (to[0] - from[0]) * share, from[1] + (to[1] - from[1]) * share]
    return <line x1={from[0]} y1={from[1]} x2={end[0]} y2={end[1]} stroke={color} strokeWidth={2.4} strokeDasharray={share < 1 ? '7 5' : undefined} />
}

function StationScene({ round, level, flag, answered, onPick, language }: { round: StationRound; level: number; flag: Point | null; answered: boolean; onPick: (point: Point) => void; language: UnitLanguage }) {
    const A: Point = [MAP.left, MAP.base]
    const B: Point = [MAP.right, MAP.base]
    const share = answered || level === 2 ? 1 : level === 0 ? 0.35 : 0
    const picking = level < 2 && !answered
    const pick = (event: PointerEvent<SVGSVGElement>) => {
        if (!picking) return
        const box = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - box.left) / box.width) * 340
        const y = ((event.clientY - box.top) / box.height) * 270
        onPick([Math.min(330, Math.max(10, x)), Math.min(MAP.base - 4, Math.max(MAP.top, y))])
    }
    const arc = (v: Point, from: number, to: number) => {
        const r = 30
        const start: Point = [v[0] + r * Math.cos(from * D), v[1] - r * Math.sin(from * D)]
        const end: Point = [v[0] + r * Math.cos(to * D), v[1] - r * Math.sin(to * D)]
        return <path d={`M${start[0]} ${start[1]} A${r} ${r} 0 0 0 ${end[0]} ${end[1]}`} fill="none" stroke={CORAL} strokeWidth={2.2} />
    }
    return (
        <svg className={`dbh4-scene${picking ? ' dbh4-pickable' : ''}`} viewBox="0 0 340 270" direction="ltr" aria-hidden="true" onPointerDown={pick}>
            <rect x={6} y={6} width={328} height={MAP.base - 6} rx={10} fill="#d6eddf" opacity={0.6} />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth={3} />
            {share > 0 && <SightLine from={A} to={round.station} share={share} color={BLUE} />}
            {share > 0 && <SightLine from={B} to={round.station} share={share} color={BLUE} />}
            {arc(A, 0, round.alpha)}
            {arc(B, 180 - round.beta, 180)}
            <rect x={A[0] - 7} y={A[1] - 7} width={14} height={14} fill={INK} />
            <rect x={B[0] - 7} y={B[1] - 7} width={14} height={14} fill={INK} />
            <text x={A[0]} y={A[1] + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>A</text>
            <text x={B[0]} y={B[1] + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>B</text>
            <text x={A[0] + 36} y={A[1] - 8} fontSize={14} fontWeight={700} fill={CORAL}>{`${round.alpha}°`}</text>
            <text x={B[0] - 36} y={B[1] - 8} textAnchor="end" fontSize={14} fontWeight={700} fill={CORAL}>{`${round.beta}°`}</text>
            <text x={(A[0] + B[0]) / 2} y={A[1] + 24} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{`${groupDigits(round.base, language)} m`}</text>
            {flag && (
                <g>
                    <line x1={flag[0]} y1={flag[1]} x2={flag[0]} y2={flag[1] - 26} stroke={INK} strokeWidth={2.4} />
                    <polygon points={`${flag[0]},${flag[1] - 26} ${flag[0] + 18},${flag[1] - 20} ${flag[0]},${flag[1] - 14}`} fill={CORAL} />
                    <circle cx={flag[0]} cy={flag[1]} r={3} fill={INK} />
                </g>
            )}
            {(answered || level === 2) && <circle cx={round.station[0]} cy={round.station[1]} r={8} fill={GREEN} stroke={INK} strokeWidth={2} />}
            {(answered || level === 2) && <text x={round.station[0] + 12} y={round.station[1] - 6} fontSize={15} fontWeight={700} fill={GREEN}>E</text>}
        </svg>
    )
}

function StationPlay({ round, level, language, onAnswer, answered }: RoundProps<StationRound>) {
    const l = useGameText(language)
    const [flag, setFlag] = useState<Point | null>(null)
    const [choice, setChoice] = useState<number | null>(null)
    const E = 180 - round.alpha - round.beta
    const working = `AE=\\dfrac{${round.base}\\cdot\\sen ${round.beta}°}{\\sen ${E}°}\\approx ${metres(round.distance)}`
    const right = level === 2 ? choice !== null && metres(choice) === metres(round.distance) : flag !== null && flagIsClose(round, flag, level)
    const missBy = flag ? toMetres(round, Math.hypot(flag[0] - round.station[0], flag[1] - round.station[1])) : 0
    return (
        <>
            <p className="prop3-prompt">
                {level === 2
                    ? l(say('A eta B postuek igorlea angelu hauekin entzuten dute. Zer distantziara dago A-tik?', 'Los puestos A y B oyen la emisora con estos ángulos. ¿A qué distancia está de A?', 'يسمع الموقعان A وB المحطة بهاتين الزاويتين. كم تبعد عن A؟', 'Posts A and B hear the station at these angles. How far is it from A?'))
                    : l(say('A eta B postuek igorlea angelu hauekin entzuten dute. Jarri bandera igorlea dagoen lekuan.', 'Los puestos A y B oyen la emisora con estos ángulos. Pon la bandera donde está la emisora.', 'يسمع الموقعان A وB المحطة بهاتين الزاويتين. ضع العلم حيث المحطة.', 'Posts A and B hear the station at these angles. Put the flag where the station is.'))}
            </p>
            <StationScene round={round} level={level} flag={flag} answered={answered} onPick={setFlag} language={language} />
            {level === 2 && (
                <div className="prop3-options tri-three">
                    {round.options.map((option) => {
                        const mark = !answered ? '' : metres(option) === metres(round.distance) ? 'right' : option === choice ? 'wrong' : ''
                        return <button key={option} type="button" disabled={answered} className={mark} onClick={() => { setChoice(option); onAnswer(metres(option) === metres(round.distance)) }}>{`${groupDigits(metres(option), language)} m`}</button>
                    })}
                </div>
            )}
            {level < 2 && !answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={flag === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`E=180°-${round.alpha}°-${round.beta}°=${E}°`, language)}</span>
                    <span className="dbh4-worked">{formula(working, language)}</span>
                    {level < 2 && <span className="dbh4-worked">{l(say(`Zure bandera ${groupDigits(metres(missBy), 'eu')} m-ra dago.`, `Tu bandera está a ${groupDigits(metres(missBy), 'es')} m.`, `علمك على بعد ${groupDigits(metres(missBy), 'ar')} م.`, `Your flag is ${groupDigits(metres(missBy), 'en')} m away.`))}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function StationGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: STATION_ROUNDS,
                rules: [
                    say('A eta B postuek ez dakite igorlea zer distantziatara dagoen: norabidea bakarrik, oinarriarekin osatzen duen angelua.', 'Los puestos A y B no saben a qué distancia está la emisora: solo la dirección, el ángulo con la base.', 'لا يعرف الموقعان A وB بُعد المحطة: يعرفان الاتجاه فقط، أي الزاوية مع القاعدة.', 'Posts A and B do not know how far the station is: only the direction, the angle with the base.'),
                    say('1. eta 2. mailetan, jarri bandera mapan. 3. mailan, aukeratu AE distantzia.', 'En los niveles 1 y 2, pon la bandera en el mapa. En el nivel 3, elige la distancia AE.', 'في المستويين 1 و2 ضع العلم على الخريطة. وفي المستوى 3 اختر المسافة AE.', 'On levels 1 and 2, put the flag on the map. On level 3, choose the distance AE.'),
                    say('Gero, bi bisualak marrazten dira, eta sinuaren teoremak distantzia ematen du.', 'Después se dibujan las dos visuales y el teorema de los senos da la distancia.', 'ثم يُرسم خطا النظر وتعطي مبرهنة الجيوب المسافة.', 'Then the two sight lines are drawn and the sine rule gives the distance.')
                ],
                create: (random) => createStationRounds(random),
                stars: standardStars(STATION_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: StationPlay
            }}
        />
    )
}
