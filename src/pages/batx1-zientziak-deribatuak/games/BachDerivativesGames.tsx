import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Plane, PlaneLine, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import './BachDerivativesGames.css'
import { CURVE_BOX, curveSlope, curveValue } from './curves'
import { createMatchRounds, derivativeOf, graphLatex, graphValue, MATCH_ROUNDS, type Graph, type MatchRound } from './match'
import { createSlopeRounds, pointName, SLOPE_ROUNDS, type SlopeQuestion, type SlopeRound } from './slopes'
import { createTangentRounds, TANGENT_LIMIT, TANGENT_ROUNDS, tangentLatex, type TangentRound } from './tangent'

/* ==========================================================================
   ¿Qué pendiente?, Empareja f y f′ and Tangente exacta (Deribatuak,
   Batxilergoa 1 · Zientziak): the first two choose among three points or
   three graphs; the third builds a line with two steppers and sees it on
   the graph. After each answer the tangents and the formulas come in.
   ========================================================================== */

/** A formula in the language's trigonometric names */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const BLUE = 'var(--blue, #2f6fdb)'
const RED = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'
const POINT_COLORS = ['#7b52c7', '#e0a100', '#267b53']
type Point = [number, number]

/** A curve sampled in real values, broken where it is not defined, leaves the band or jumps */
function sampled(fn: (x: number) => number, from: number, to: number, limit: number, step = 0.02): Point[][] {
    const parts: Point[][] = []
    let current: Point[] = []
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const previous = current[current.length - 1]
        if (!Number.isFinite(y) || Math.abs(y) > limit || (previous && Math.abs(y - previous[1]) > limit)) {
            if (current.length > 1) parts.push(current)
            current = []
            continue
        }
        current.push([x, y])
    }
    if (current.length > 1) parts.push(current)
    return parts
}

const number = (value: number, language: UnitLanguage) => texDec(value, language, 2)

/* ---------- ¿Qué pendiente? ---------- */

const QUESTION_TEXT: Record<SlopeQuestion, LocalizedText> = {
    zero: say('Zein puntutan da $f\'(x)=0$?', '¿En qué punto es $f\'(x)=0$?', 'عند أي نقطة يكون $f\'(x)=0$؟', 'At which point is $f\'(x)=0$?'),
    positive: say('Zein puntutan da $f\'(x)>0$?', '¿En qué punto es $f\'(x)>0$?', 'عند أي نقطة يكون $f\'(x)>0$؟', 'At which point is $f\'(x)>0$?'),
    negative: say('Zein puntutan da $f\'(x)<0$?', '¿En qué punto es $f\'(x)<0$?', 'عند أي نقطة يكون $f\'(x)<0$؟', 'At which point is $f\'(x)<0$?'),
    greatest: say('Zein puntutan da malda handiena?', '¿En qué punto es mayor la pendiente?', 'عند أي نقطة يكون الميل أكبر؟', 'At which point is the slope greatest?'),
    smallest: say('Zein puntutan da malda txikiena (negatiboena)?', '¿En qué punto es menor la pendiente (la más negativa)?', 'عند أي نقطة يكون الميل أصغر (الأشد سلبية)؟', 'At which point is the slope smallest (the most negative)?'),
    parallel: say('Zein puntutan da zuzen ukitzailea marratutako zuzenaren paraleloa?', '¿En qué punto es la tangente paralela a la recta discontinua?', 'عند أي نقطة يكون المماس موازيًا للمستقيم المتقطع؟', 'At which point is the tangent parallel to the dashed line?')
}

function SlopeGraph({ round, showTangents, language }: { round: SlopeRound; showTangents: boolean; language: UnitLanguage }) {
    const l = useGameText(language)
    const B = CURVE_BOX
    const parts = sampled((x) => curveValue(round.curve, x), -B, B, B * 2)
    return (
        <div className="bach-der-plane">
            <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={28} labelStep={2} maxHeight={300} label={l(say('Funtzioaren grafikoa eta A, B eta C puntuak', 'La gráfica y los puntos A, B y C', 'الرسم والنقاط A وB وC', 'The graph and the points A, B and C'))}>
                {(map, clip) => (
                    <g>
                        {round.line && <PlaneLine map={map} m={round.line[0]} n={round.line[1]} color={MUTED} width={2} dashed clip={clip} />}
                        {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                        {showTangents && round.xs.map((x, index) => {
                            const y = curveValue(round.curve, x)
                            const m = curveSlope(round.curve, x)
                            return <PlanePath key={`t${index}`} map={map} points={[[x - 1.2, y - 1.2 * m], [x + 1.2, y + 1.2 * m]]} color={POINT_COLORS[index]} width={2.6} clip={clip} />
                        })}
                        {round.xs.map((x, index) => <PlanePoint key={index} map={map} point={[x, curveValue(round.curve, x)]} color={POINT_COLORS[index]} radius={6} name={pointName(index)} />)}
                    </g>
                )}
            </Plane>
        </div>
    )
}

function SlopesPlay({ round, language, onAnswer, answered }: RoundProps<SlopeRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(QUESTION_TEXT[round.question])} /></p>
            {round.line && <div className="dbh4-big-formula bach-der-big" dir="ltr">{formula(tangentLatex(round.line[0], round.line[1]), language)}</div>}
            <SlopeGraph round={round} showTangents={answered} language={language} />
            <div className="prop3-options bach-der-points" dir="ltr" role="group" aria-label={l(say('Puntuak', 'Puntos', 'النقاط', 'Points'))}>
                {round.xs.map((_, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <span className="bach-der-dot" style={{ background: POINT_COLORS[index] }} aria-hidden="true" />
                        {pointName(index)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.xs.map((x, index) => `f'_{${pointName(index)}}=${number(curveSlope(round.curve, x), language)}`).join('\\qquad '), language)}</span>
                    <MathText text={l(say('Zuzen ukitzailearen malda da $f\'$ puntu bakoitzean: gorantz positiboa, beherantz negatiboa, horizontala 0.', 'La pendiente de la tangente es $f\'$ en cada punto: hacia arriba positiva, hacia abajo negativa, horizontal 0.', 'ميل المماس هو $f\'$ عند كل نقطة: صاعدًا موجب، ونازلًا سالب، وأفقيًّا 0.', 'The slope of the tangent is $f\'$ at each point: going up positive, going down negative, horizontal 0.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function SlopesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SLOPE_ROUNDS,
                rules: [
                    say('Grafiko bat eta hiru puntu ematen dira: A, B eta C.', 'Te dan una gráfica y tres puntos: A, B y C.', 'يُعطى رسم وثلاث نقاط: A وB وC.', 'You get a graph and three points: A, B and C.'),
                    say('$f\'(a)$ zuzen ukitzailearen malda da: kurba igotzen bada positiboa, jaisten bada negatiboa, eta 0 horizontala bada.', '$f\'(a)$ es la pendiente de la tangente: positiva si la curva sube, negativa si baja y 0 si es horizontal.', '$f\'(a)$ ميل المماس: موجب إذا صعد المنحنى، وسالب إذا نزل، و0 إذا كان أفقيًّا.', '$f\'(a)$ is the slope of the tangent: positive if the curve goes up, negative if it goes down, and 0 if it is horizontal.'),
                    say('Aukeratu galderari erantzuten dion puntua.', 'Elige el punto que responde a la pregunta.', 'اختر النقطة التي تجيب عن السؤال.', 'Choose the point that answers the question.')
                ],
                create: createSlopeRounds,
                stars: standardStars(SLOPE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: SlopesPlay
            }}
        />
    )
}

/* ---------- Empareja f y f′ ---------- */

const OPTION_NAMES = ['A', 'B', 'C']

function GraphPlane({ graph, color, size, label }: { graph: Graph; color: string; size: 'big' | 'small'; label: string }) {
    const B = CURVE_BOX
    const parts = sampled((x) => graphValue(graph, x), -B, B, B * 2)
    return (
        <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={size === 'big' ? 26 : 12} labelStep={size === 'big' ? 2 : 4} labels={size === 'big'} maxHeight={size === 'big' ? 260 : 120} label={label}>
            {(map, clip) => <g>{parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={color} width={size === 'big' ? 3 : 2.6} clip={clip} />)}</g>}
        </Plane>
    )
}

function MatchPlay({ round, language, onAnswer, answered }: RoundProps<MatchRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Hau $f$ da. Zein da $f\'$ funtzioaren grafikoa?', 'Esta es $f$. ¿Cuál es la gráfica de $f\'$?', 'هذه $f$. أي رسم هو رسم $f\'$؟', 'This is $f$. Which one is the graph of $f\'$?'))} /></p>
            <div className="bach-der-plane">
                <GraphPlane graph={round.f} color={BLUE} size="big" label={l(say('f funtzioaren grafikoa', 'La gráfica de f', 'رسم f', 'The graph of f'))} />
            </div>
            <div className="bach-der-options" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((graph, index) => (
                    <button key={index} type="button" disabled={answered} className={`bach-der-option ${!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''}`} onClick={() => choose(index)}>
                        <span className="bach-der-option-name">{OPTION_NAMES[index]}</span>
                        <GraphPlane graph={graph} color={RED} size="small" label={`${OPTION_NAMES[index]}`} />
                        {answered && <span className="bach-der-option-formula">{formula(`y=${graphLatex(graph)}`, language)}</span>}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`f(x)=${graphLatex(round.f)}\\ \\to\\ f'(x)=${graphLatex(derivativeOf(round.f))}`, language)}</span>
                    <MathText text={l(say('$f$ igotzen den tokian, $f\'$ ardatzaren gainean dago; jaisten den tokian, azpian; zuzen ukitzailea horizontala denean, $f\'=0$.', 'Donde $f$ sube, $f\'$ está por encima del eje; donde baja, por debajo; donde la tangente es horizontal, $f\'=0$.', 'حيث تصعد $f$ يكون $f\'$ فوق المحور، وحيث تنزل تحته، وحيث يكون المماس أفقيًّا $f\'=0$.', 'Where $f$ goes up, $f\'$ is above the axis; where it goes down, below; where the tangent is horizontal, $f\'=0$.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function MatchGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MATCH_ROUNDS,
                rules: [
                    say('Goian $f$ funtzioaren grafikoa; behean, hiru grafiko.', 'Arriba, la gráfica de $f$; abajo, tres gráficas.', 'في الأعلى رسم $f$، وفي الأسفل ثلاثة رسوم.', 'Above, the graph of $f$; below, three graphs.'),
                    say('$f\'$ funtzioaren altuera $f$ funtzioaren malda da: positiboa $f$ igotzen denean, 0 zuzen ukitzailea horizontala denean.', 'La altura de $f\'$ es la pendiente de $f$: positiva donde $f$ sube, 0 donde la tangente es horizontal.', 'ارتفاع $f\'$ هو ميل $f$: موجب حيث تصعد $f$، و0 حيث يكون المماس أفقيًّا.', 'The height of $f\'$ is the slope of $f$: positive where $f$ goes up, 0 where the tangent is horizontal.'),
                    say('Aukeratu $f\'$ den grafikoa.', 'Elige la gráfica que es $f\'$.', 'اختر الرسم الذي هو $f\'$.', 'Choose the graph that is $f\'$.')
                ],
                create: createMatchRounds,
                stars: standardStars(MATCH_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: MatchPlay
            }}
        />
    )
}

/* ---------- Tangente exacta ---------- */

function Pick({ name, value, onChange, disabled }: { name: string; value: number; onChange: (value: number) => void; disabled: boolean }) {
    const set = (next: number) => onChange(Math.max(-TANGENT_LIMIT, Math.min(TANGENT_LIMIT, next)))
    return (
        <div className="bach-der-pick" dir="ltr">
            <span className="bach-der-pick-name">{name}</span>
            <button type="button" disabled={disabled} onClick={() => set(value - 1)} aria-label={`${name} − 1`}>−</button>
            <span className="bach-der-pick-value">{value < 0 ? `−${-value}` : value}</span>
            <button type="button" disabled={disabled} onClick={() => set(value + 1)} aria-label={`${name} + 1`}>+</button>
        </div>
    )
}

function TangentPlay({ round, language, onAnswer, answered }: RoundProps<TangentRound>) {
    const l = useGameText(language)
    const [m, setM] = useState(0)
    const [n, setN] = useState(0)
    const right = m === round.m && n === round.n
    const B = CURVE_BOX
    const parts = sampled(round.fn, -B, B, B * 2)
    const fa = round.fn(round.a)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Eraiki zuzen ukitzailea $x=${round.a}$ puntuan.`, `Construye la tangente en $x=${round.a}$.`, `ابنِ المماس عند $x=${round.a}$.`, `Build the tangent at $x=${round.a}$.`))} /></p>
            <div className="dbh4-big-formula bach-der-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="bach-der-plane">
                <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={28} labelStep={2} maxHeight={300} label={l(say('Funtzioa, puntua eta zure zuzena', 'La función, el punto y tu recta', 'الدالة والنقطة ومستقيمك', 'The function, the point and your line'))}>
                    {(map, clip) => (
                        <g>
                            {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                            <PlaneLine map={map} m={m} n={n} color={answered ? (right ? GREEN : RED) : RED} width={2.6} clip={clip} />
                            {answered && !right && <PlaneLine map={map} m={round.m} n={round.n} color={GREEN} width={2.6} dashed clip={clip} />}
                            <PlanePoint map={map} point={[round.a, fa]} color={BLUE} radius={6} />
                        </g>
                    )}
                </Plane>
            </div>
            <div className="bach-der-picks">
                <Pick name="m" value={m} onChange={setM} disabled={answered} />
                <Pick name="n" value={n} onChange={setN} disabled={answered} />
            </div>
            <div className="dbh4-big-formula bach-der-big" dir="ltr">{formula(tangentLatex(m, n), language)}</div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`f(${round.a})=${number(fa, language)}\\qquad f'(${round.a})=${round.m}\\ \\to\\ ${tangentLatex(round.m, round.n)}`, language)}</span>
                    <MathText text={l(say('$m=f\'(a)$, eta $n$ ateratzen da zuzenak $(a,\\,f(a))$ puntutik pasatu behar duelako.', '$m=f\'(a)$, y $n$ sale de que la recta pase por $(a,\\,f(a))$.', '$m=f\'(a)$، و$n$ يأتي من مرور المستقيم بالنقطة $(a,\\,f(a))$.', '$m=f\'(a)$, and $n$ comes from the line going through $(a,\\,f(a))$.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function TangentGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TANGENT_ROUNDS,
                rules: [
                    say('Funtzio bat eta puntu bat ematen dira.', 'Te dan una función y un punto.', 'تُعطى دالة ونقطة.', 'You get a function and a point.'),
                    say('Aukeratu $m$ eta $n$: $m=f\'(a)$ eta zuzenak $(a,\\,f(a))$ puntutik pasatu behar du.', 'Elige $m$ y $n$: $m=f\'(a)$ y la recta tiene que pasar por $(a,\\,f(a))$.', 'اختر $m$ و$n$: $m=f\'(a)$ ويجب أن يمر المستقيم بالنقطة $(a,\\,f(a))$.', 'Choose $m$ and $n$: $m=f\'(a)$ and the line has to go through $(a,\\,f(a))$.'),
                    say('Zure zuzena grafikoan ikusten da; egiaztatu kurba ukitzen duenean.', 'Tu recta se ve en la gráfica; comprueba cuando toque la curva.', 'يظهر مستقيمك على الرسم؛ تحقّق عندما يمس المنحنى.', 'Your line shows on the graph; check when it touches the curve.')
                ],
                create: createTangentRounds,
                stars: standardStars(TANGENT_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TangentPlay
            }}
        />
    )
}
