import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './BachVectorsGames.css'
import { createKindRounds, isKindChoice, KIND_ROUNDS, VALUE_KINDS, type KindRound, type ValueKind } from './kind'
import { createPolygonRounds, POLYGON_ROUNDS, vertices, type Point, type PolygonRound } from './polygon'

/* ==========================================================================
   Zenbakia ala bektorea? and Biderkadurak poligonoan (Bektoreak,
   Batxilergoa 1 · Zientziak): the first asks whether an expression gives
   a number, a vector or makes no sense, and then for its value; the
   second draws a regular polygon with two vectors and asks for their dot
   product, then moves one so both leave the same point.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const pairLatex = ([x, y]: [number, number]) => `(${x},${y})`

/* ---------- Number or vector? ---------- */

const KIND_LABELS: Record<ValueKind, LocalizedText> = {
    number: say('Zenbaki bat', 'Un número', 'عدد', 'A number'),
    vector: say('Bektore bat', 'Un vector', 'متجه', 'A vector'),
    nonsense: say('Ez du zentzurik', 'No tiene sentido', 'بلا معنى', 'It makes no sense')
}

const KIND_REASONS: Record<ValueKind, LocalizedText> = {
    number: say('Zenbaki bat da: biderkadura eskalarrak eta moduluek zenbakiak ematen dituzte.', 'Es un número: los productos escalares y los módulos dan números.', 'إنه عدد: الجداءات السلمية والأطوال تعطي أعدادًا.', 'It is a number: dot products and magnitudes give numbers.'),
    vector: say('Bektore bat da: zenbaki bat bider bektore bat, edo bektoreen batura.', 'Es un vector: un número por un vector, o una suma de vectores.', 'إنه متجه: عدد في متجه أو مجموع متجهات.', 'It is a vector: a number times a vector, or a sum of vectors.'),
    nonsense: say('Ez du zentzurik: ezin dira zenbaki bat eta bektore bat batu.', 'No tiene sentido: no se pueden sumar un número y un vector.', 'بلا معنى: لا يمكن جمع عدد ومتجه.', 'It makes no sense: you cannot add a number and a vector.')
}

function KindPlay({ round, language, onAnswer, answered }: RoundProps<KindRound>) {
    const l = useGameText(language)
    const [kind, setKind] = useState<ValueKind | null>(null)
    const [value, setValue] = useState<string | null>(null)
    const chooseKind = (choice: ValueKind) => {
        if (answered || kind !== null) return
        setKind(choice)
        // A wrong kind ends the round; so does a right «no sense», which has no value to pick
        if (choice !== round.kind || choice === 'nonsense') onAnswer(choice === round.kind)
    }
    const chooseValue = (option: string) => {
        if (answered || value !== null) return
        setValue(option)
        onAnswer(option === round.answer)
    }
    const right = isKindChoice(round, kind, value)
    return (
        <>
            <p className="bach-vec-data" dir="ltr">{formula(`\\vec{u}=${pairLatex(round.u)}\\quad \\vec{v}=${pairLatex(round.v)}\\quad \\vec{w}=${pairLatex(round.w)}`, language)}</p>
            <div className="dbh4-big-formula bach-vec-big" dir="ltr">{formula(round.latex, language)}</div>
            <p className="prop3-prompt">{l(say('Zer ematen du?', '¿Qué da?', 'ماذا تعطي؟', 'What does it give?'))}</p>
            <div className="prop3-options bach-vec-kinds">
                {VALUE_KINDS.map((option) => (
                    <button key={option} type="button" disabled={answered || kind !== null} className={kind === null && !answered ? '' : option === round.kind ? 'right' : option === kind ? 'wrong' : ''} onClick={() => chooseKind(option)}>{l(KIND_LABELS[option])}</button>
                ))}
            </div>
            {kind !== null && kind === round.kind && round.kind !== 'nonsense' && (
                <>
                    <p className="prop3-prompt">{l(say('Zenbat da?', '¿Cuánto vale?', 'كم تساوي؟', 'What is it?'))}</p>
                    <div className="prop3-options bach-vec-values" dir="ltr">
                        {round.options.map((option) => (
                            <button key={option} type="button" disabled={answered} className={!answered ? '' : option === round.answer ? 'right' : option === value ? 'wrong' : ''} onClick={() => chooseValue(option)}>{formula(option, language)}</button>
                        ))}
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <MathText text={l(KIND_REASONS[round.kind])} />
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function KindGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: KIND_ROUNDS,
                rules: [
                    say('Adierazpen bakoitzak zenbaki bat edo bektore bat ematen du, edo ez du zentzurik.', 'Cada expresión da un número o un vector, o no tiene sentido.', 'كل عبارة تعطي عددًا أو متجهًا، أو تكون بلا معنى.', 'Each expression gives a number or a vector, or it makes no sense.'),
                    say('Biderkadura eskalarra eta modulua zenbakiak dira; zenbaki bat bider bektore bat, bektore bat.', 'El producto escalar y el módulo son números; un número por un vector, un vector.', 'الجداء السلمي والطول عددان؛ وعدد في متجه متجه.', 'The dot product and the magnitude are numbers; a number times a vector is a vector.'),
                    say('Asmatzen baduzu, aukeratu haren balioa.', 'Si aciertas, elige su valor.', 'إذا أصبت فاختر قيمتها.', 'If you get it right, choose its value.')
                ],
                create: createKindRounds,
                stars: standardStars(KIND_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: KindPlay
            }}
        />
    )
}

/* ---------- Products in the polygon ---------- */

/** The polygon of a round fitted into a 300 × 250 drawing */
function PolygonDrawing({ round, answered, label }: { round: PolygonRound; answered: boolean; label: string }) {
    const points = vertices(round.shape, round.side)
    const [a, b] = round.first
    const [c, d] = round.second
    const v: Point = [points[d][0] - points[c][0], points[d][1] - points[c][1]]
    const moved = a !== c
    // The second vector moved to the start of the first one is drawn after answering: the frame leaves room for it from the start
    const end: Point = [points[a][0] + v[0], points[a][1] + v[1]]
    const xs = [...Object.values(points).map((p) => p[0]), end[0]]
    const ys = [...Object.values(points).map((p) => p[1]), end[1]]
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
    const scale = Math.min(220 / (maxX - minX), 170 / (maxY - minY))
    const offsetX = 150 - ((minX + maxX) / 2) * scale
    const offsetY = 130 + ((minY + maxY) / 2) * scale
    const at = ([x, y]: Point): Point => [offsetX + x * scale, offsetY - y * scale]
    const corners = Object.entries(points).filter(([name]) => name !== 'O').map(([, point]) => point)
    const centre: Point = [corners.reduce((sum, p) => sum + p[0], 0) / corners.length, corners.reduce((sum, p) => sum + p[1], 0) / corners.length]
    const outline = round.shape === 'hexagon' ? ['A', 'B', 'C', 'D', 'E', 'F'] : round.shape === 'square' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C']
    const arrow = (from: Point, to: Point, color: string, dashed = false, key = '') => {
        const [x1, y1] = at(from)
        const [x2, y2] = at(to)
        const length = Math.hypot(x2 - x1, y2 - y1)
        const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
        const base: Point = [x2 - ux * 13, y2 - uy * 13]
        return (
            <g key={key}>
                <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={dashed ? 2.4 : 4} strokeDasharray={dashed ? '6 4' : undefined} strokeLinecap="round" />
                <polygon points={`${x2},${y2} ${base[0] - uy * 6},${base[1] + ux * 6} ${base[0] + uy * 6},${base[1] - ux * 6}`} fill={color} />
            </g>
        )
    }
    return (
        <svg className="bach-vec-polygon" viewBox="0 0 300 260" role="img" aria-label={label} direction="ltr">
            <polygon points={outline.map((name) => at(points[name]).join(',')).join(' ')} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth={2} />
            {round.shape === 'hexagon' && <circle cx={at(points.O)[0]} cy={at(points.O)[1]} r={3.5} fill="var(--ink)" />}
            {answered && moved && arrow(points[a], end, 'var(--coral, #c4432a)', true, 'moved')}
            {arrow(points[a], points[b], 'var(--blue, #2f6fdb)', false, 'u')}
            {arrow(points[c], points[d], 'var(--coral, #c4432a)', false, 'v')}
            {Object.entries(points).map(([name, point]) => {
                const [x, y] = at(point)
                const away: Point = name === 'O' ? [0, 1] : [point[0] - centre[0], point[1] - centre[1]]
                const length = Math.hypot(away[0], away[1]) || 1
                return <text key={name} x={x + (away[0] / length) * 16} y={y - (away[1] / length) * 16 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--ink)">{name}</text>
            })}
            {answered && <text x={150} y={252} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--coral, #c4432a)">{`α = ${round.angle}°`}</text>}
            {!answered && <text x={150} y={252} textAnchor="middle" fontSize={15} fill="var(--muted)">{`|${a}${b}| · |${c}${d}| · cos α`}</text>}
        </svg>
    )
}

function PolygonPlay({ round, language, onAnswer, answered }: RoundProps<PolygonRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const choose = (option: string) => {
        if (answered) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    const shape = round.shape === 'square'
        ? say(`Alde ${round.side} duen $ABCD$ karratua`, `Cuadrado $ABCD$ de lado ${round.side}`, `مربع $ABCD$ طول ضلعه ${round.side}`, `Square $ABCD$ with side ${round.side}`)
        : round.shape === 'triangle'
            ? say(`Alde ${round.side} duen $ABC$ triangelu aldeberdina`, `Triángulo equilátero $ABC$ de lado ${round.side}`, `مثلث متساوي الأضلاع $ABC$ طول ضلعه ${round.side}`, `Equilateral triangle $ABC$ with side ${round.side}`)
            : say(`Alde ${round.side} eta $O$ zentroa dituen hexagono erregularra`, `Hexágono regular de lado ${round.side} y centro $O$`, `سداسي منتظم طول ضلعه ${round.side} ومركزه $O$`, `Regular hexagon with side ${round.side} and centre $O$`)
    const product = `\\overrightarrow{${round.first.join('')}}\\cdot\\overrightarrow{${round.second.join('')}}`
    const moved = round.first[0] !== round.second[0]
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(shape)} /></p>
            <PolygonDrawing round={round} answered={answered} label={l(shape).replace(/\$/g, '')} />
            <div className="dbh4-big-formula bach-vec-big" dir="ltr">{formula(`${product}=\\ ?`, language)}</div>
            <div className="prop3-options bach-vec-values" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {moved && <MathText text={l(say('Bigarren bektorea lekualdatu da (marra etena), lehenengoaren puntu beretik atera dadin.', 'El segundo vector se ha trasladado (a trazos) para que salga del mismo punto que el primero.', 'نُقل المتجه الثاني (المتقطع) ليخرج من نقطة الأول نفسها.', 'The second vector has been moved (dashed) so that it leaves the same point as the first one.'))} />}
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function PolygonGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: POLYGON_ROUNDS,
                rules: [
                    say('Poligonoa erregularra da: alde guztiak eta angelu guztiak berdinak.', 'El polígono es regular: todos los lados y todos los ángulos iguales.', 'المضلع منتظم: كل الأضلاع وكل الزوايا متساوية.', 'The polygon is regular: all sides and all angles are equal.'),
                    say('$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, bi bektoreak puntu beretik ateratzen direla.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, con los dos vectores saliendo del mismo punto.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ والمتجهان خارجان من النقطة نفسها.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, with both vectors leaving the same point.'),
                    say('Bata bestea amaitzen den lekuan hasten bada, lekualdatu: kanpoko angelua da.', 'Si uno empieza donde acaba el otro, trasládalo: es el ángulo exterior.', 'إذا بدأ أحدهما حيث ينتهي الآخر فانقله: إنها الزاوية الخارجية.', 'If one starts where the other ends, move it: it is the outer angle.')
                ],
                create: createPolygonRounds,
                stars: standardStars(POLYGON_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: PolygonPlay
            }}
        />
    )
}
