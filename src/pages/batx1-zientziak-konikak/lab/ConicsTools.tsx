import { useState, type ReactNode } from 'react'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { PlaneGrid } from '../../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUTED, PAPER, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { directrixChallenges, directrixExtra, directrixPrediction, DIRECTRIX_LIMITS, focusOf, halfLatex, initialDirectrixState, parabolaValue, setDirectrix, type DirectrixState } from './directrix'
import { angleRange, curvePoints, directrixX, eccentricityChallenges, eccentricityExtra, eccentricityPrediction, eLatex, initialEccentricityState, pointOf, QUARTERS, setEccentricity, toDirectrix, toFocus, type EccentricityState } from './eccentricity'
import { bSquare, ellipseValue, gardenerChallenges, gardenerExtra, gardenerLatex, gardenerPrediction, GARDENER_LIMITS, initialGardenerState, setGardener, stringSum, type GardenerState, type Pair } from './gardener'

/* ==========================================================================
   Leku geometrikoak eta konikak · Batxilergoa 1 · Zientziak — the three
   tools of this unit: the gardener's ellipse (two nails and a string),
   the focus and the directrix of a parabola, and the eccentricity that
   turns a circle into an ellipse, a parabola and a hyperbola. Each asks
   for a prediction before it shows the result, and ▶ draws the curve.
   Logic in gardener.ts, directrix.ts and eccentricity.ts. Formulas sit in
   their own <text> (left to right in every language).
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** √n in LaTeX, as a whole number when it is a perfect square */
const rootLatex = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
const isWhole = (value: number) => Math.abs(value - Math.round(value)) < 1e-9
/** = and the whole number, or ≈ and two decimals */
const valueLatex = (value: number, language: UnitLanguage) => (isWhole(value) ? `=${Math.round(value)}` : `\\approx ${texDec(value, language, 2)}`)

/** A Cartesian board: the grid, its axes and what is drawn on it */
function PlaneBoard({ box, cell, height, label, children }: { box: PlaneBox; cell: number; height: number; label: string; children: (map: PlaneMap, clip: string) => ReactNode }) {
    const width = (box.xMax - box.xMin) * cell
    const map = planeMap(box, cell, (360 - width) / 2, 34)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <Board height={height} label={label}>
            <defs>{clipPath}</defs>
            <rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} fill={PAPER} />
            <PlaneGrid map={map} labelStep={2} />
            {children(map, clip)}
        </Board>
    )
}

/** A dot with its name */
function Dot({ map, point, name, color, dx = 8, dy = -8 }: { map: PlaneMap; point: [number, number]; name: string; color: string; dx?: number; dy?: number }) {
    const [x, y] = [map.x(point[0]), map.y(point[1])]
    return (
        <g>
            <circle cx={x} cy={y} r={5.5} fill={color} stroke={INK} strokeWidth={1.2} />
            <text x={x + dx} y={y + dy} textAnchor={dx < 0 ? 'end' : 'start'} fontSize={15} fontWeight={700} fill={color}>{name}</text>
        </g>
    )
}

/** A path through plane points */
function Path({ map, points, color, width = 3, dashed = false }: { map: PlaneMap; points: Array<[number, number]>; color: string; width?: number; dashed?: boolean }) {
    if (points.length < 2) return null
    const d = points.map(([x, y], index) => `${index ? 'L' : 'M'}${map.x(x).toFixed(1)} ${map.y(y).toFixed(1)}`).join(' ')
    return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} strokeLinejoin="round" strokeLinecap="round" />
}

const segment = (map: PlaneMap, from: [number, number], to: [number, number], color: string, width = 2.4, dashed = false) => (
    <line x1={map.x(from[0])} y1={map.y(from[1])} x2={map.x(to[0])} y2={map.y(to[1])} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 4' : undefined} strokeLinecap="round" />
)

const ellipsePoint = (a: number, b: number, t: number): [number, number] => [a * Math.cos(t), b * Math.sin(t)]

/* ---------- L1. The gardener's ellipse ---------- */

const GARDEN_BOX: PlaneBox = { xMin: -7, xMax: 7, yMin: -5, yMax: 5 }

export function GardenerTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GardenerState>(initialGardenerState)
    const { a, c, p } = state
    const b = Math.sqrt(bSquare(state))
    const shown = state.prediction !== null
    const playback = usePlayback(`${a}-${c}`, 2600)
    const progress = shown && playback.progress !== null ? playback.progress : null
    const value = ellipseValue(state)
    const sum = stringSum(state)
    const controls = (
        <>
            <Stepper label="c" value={c} min={0} max={GARDENER_LIMITS.c} onChange={(next) => setState((s) => setGardener(s, { c: next }))} language={props.language} />
            <Stepper label="a" value={a} min={c + 1} max={GARDENER_LIMITS.a} onChange={(next) => setState((s) => setGardener(s, { a: next }))} language={props.language} />
            <Stepper label="P₁" value={p[0]} min={-GARDENER_LIMITS.x} max={GARDENER_LIMITS.x} format={minus} onChange={(x) => setState((s) => setGardener(s, { p: [x, s.p[1]] }))} language={props.language} />
            <Stepper label="P₂" value={p[1]} min={-GARDENER_LIMITS.y} max={GARDENER_LIMITS.y} format={minus} onChange={(y) => setState((s) => setGardener(s, { p: [s.p[0], y] }))} language={props.language} />
        </>
    )
    const where = value < 0
        ? say('$P$ barruan dago: $PF+PF\'<2a$.', '$P$ está dentro: $PF+PF\'<2a$.', '$P$ داخل القطع: $PF+PF\'<2a$.', '$P$ is inside: $PF+PF\'<2a$.')
        : value === 0
            ? say('$P$ elipsearen gainean dago: $PF+PF\'=2a$.', '$P$ está sobre la elipse: $PF+PF\'=2a$.', '$P$ على القطع الناقص: $PF+PF\'=2a$.', '$P$ is on the ellipse: $PF+PF\'=2a$.')
            : say('$P$ kanpoan dago: $PF+PF\'>2a$.', '$P$ está fuera: $PF+PF\'>2a$.', '$P$ خارج القطع: $PF+PF\'>2a$.', '$P$ is outside: $PF+PF\'>2a$.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $PF+PF\'$ batura $2a$ baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: $PF+PF\'$, ¿es menor, igual o mayor que $2a$?', 'قبل أن ترى: هل $PF+PF\'$ أصغر من $2a$ أم يساويه أم أكبر؟', 'Before you see it: is $PF+PF\'$ less than, equal to or more than $2a$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساويه', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={gardenerPrediction(state)}
            choice={state.prediction}
            tip={say('Sokak $2a$ neurtzen du: elipseko puntu guztietan $PF+PF\'=2a$.', 'La cuerda mide $2a$: en todos los puntos de la elipse, $PF+PF\'=2a$.', 'طول الخيط $2a$: في كل نقاط القطع الناقص $PF+PF\'=2a$.', 'The string is $2a$ long: at every point of the ellipse, $PF+PF\'=2a$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[
                    `PF=${rootLatex((p[0] - c) ** 2 + p[1] ** 2)}\\quad PF'=${rootLatex((p[0] + c) ** 2 + p[1] ** 2)}`,
                    `PF+PF'${valueLatex(sum, props.language)}\\quad 2a=${2 * a}`,
                    gardenerLatex(state)
                ]}
                note={l(where)}
            />
        </Predict>
    )
    const traced = progress === null ? 1 : progress
    const pencil = ellipsePoint(a, b, 2 * Math.PI * traced)
    const full = Array.from({ length: 121 }, (_, i) => ellipsePoint(a, b, (2 * Math.PI * i) / 120))
    const drawn = full.slice(0, Math.max(2, Math.round(traced * 120) + 1))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gardenerChallenges} extraChallenges={gardenerExtra} state={state}>
            <PlaneBoard box={GARDEN_BOX} cell={22} height={276} label={l(say(`F(${c}, 0) eta F′(−${c}, 0) fokuak, ${2 * a} luzerako soka eta P(${p[0]}, ${p[1]}) puntua`, `Los focos F(${c}, 0) y F′(−${c}, 0), una cuerda de longitud ${2 * a} y el punto P(${p[0]}, ${p[1]})`, `البؤرتان F(${c}, 0) وF′(−${c}, 0) وخيط طوله ${2 * a} والنقطة P(${p[0]}, ${p[1]})`, `The foci F(${c}, 0) and F′(−${c}, 0), a string of length ${2 * a} and the point P(${p[0]}, ${p[1]})`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {shown && <Path map={map} points={full} color={STAGE} width={1.6} dashed />}
                            {shown && <Path map={map} points={drawn} color={STAGE} width={3.2} />}
                            {shown && segment(map, p, [c, 0], SECOND)}
                            {shown && segment(map, p, [-c, 0], GREEN)}
                            {shown && progress !== null && progress < 1 && (
                                <g>
                                    {segment(map, [c, 0], pencil, MUSTARD, 2)}
                                    {segment(map, [-c, 0], pencil, MUSTARD, 2)}
                                    <circle cx={map.x(pencil[0])} cy={map.y(pencil[1])} r={5} fill={MUSTARD} stroke={INK} strokeWidth={1} />
                                </g>
                            )}
                        </g>
                        <Dot map={map} point={[c, 0]} name="F" color={SECOND} dx={6} dy={-10} />
                        <Dot map={map} point={[-c, 0]} name="F′" color={GREEN} dx={-6} dy={-10} />
                        <Dot map={map} point={p} name="P" color={INK} />
                        <text x={map.x(GARDEN_BOX.xMin) + 6} y={map.y(GARDEN_BOX.yMax) + 18} fontSize={15} fontWeight={700} fill={MUSTARD}>{`2a = ${2 * a}`}</text>
                        {!shown && <Hidden x={map.x(0)} y={map.y(GARDEN_BOX.yMax) + 26} />}
                    </g>
                )}
            </PlaneBoard>
            <PlayButton label={l(say('Marraztu sokarekin', 'Dibujar con la cuerda', 'ارسم بالخيط', 'Draw with the string'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. Focus and directrix ---------- */

const DIRECTRIX_BOX: PlaneBox = { xMin: -4, xMax: 8, yMin: -6, yMax: 6 }

export function DirectrixTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DirectrixState>(initialDirectrixState)
    const { p, point } = state
    const focus = focusOf(state)
    const foot: Pair = [-p / 2, point[1]]
    const shown = state.prediction !== null
    const playback = usePlayback(`${p}`, 2600)
    const progress = shown && playback.progress !== null ? playback.progress : null
    const value = parabolaValue(state)
    const controls = (
        <>
            <Stepper label="p" value={p} min={1} max={DIRECTRIX_LIMITS.p} onChange={(next) => setState((s) => setDirectrix(s, { p: next }))} language={props.language} />
            <Stepper label="P₁" value={point[0]} min={DIRECTRIX_LIMITS.xMin} max={DIRECTRIX_LIMITS.xMax} format={minus} onChange={(x) => setState((s) => setDirectrix(s, { point: [x, s.point[1]] }))} language={props.language} />
            <Stepper label="P₂" value={point[1]} min={-DIRECTRIX_LIMITS.y} max={DIRECTRIX_LIMITS.y} format={minus} onChange={(y) => setState((s) => setDirectrix(s, { point: [s.point[0], y] }))} language={props.language} />
        </>
    )
    /* PF = √((2x − p)² + 4y²) / 2 and PH = |2x + p| / 2 */
    const pfTwice = (2 * point[0] - p) ** 2 + 4 * point[1] ** 2
    const pfLatex = Number.isInteger(Math.sqrt(pfTwice)) ? halfLatex(Math.sqrt(pfTwice)) : `\\frac{\\sqrt{${pfTwice}}}{2}`
    const where = value < 0
        ? say('$P$ fokutik hurbilago dago: parabolaren barruan.', '$P$ está más cerca del foco: dentro de la parábola.', '$P$ أقرب إلى البؤرة: داخل القطع المكافئ.', '$P$ is nearer the focus: inside the parabola.')
        : value === 0
            ? say('$PF=PH$: $P$ parabolaren gainean dago.', '$PF=PH$: $P$ está sobre la parábola.', '$PF=PH$: ‏$P$ على القطع المكافئ.', '$PF=PH$: $P$ is on the parabola.')
            : say('$P$ zuzentzailetik hurbilago dago: parabolatik kanpo.', '$P$ está más cerca de la directriz: fuera de la parábola.', '$P$ أقرب إلى الدليل: خارج القطع المكافئ.', '$P$ is nearer the directrix: outside the parabola.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $PF$ distantzia zuzentzailerako $PH$ distantzia baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: $PF$, ¿es menor, igual o mayor que la distancia $PH$ a la directriz?', 'قبل أن ترى: هل $PF$ أصغر من المسافة $PH$ إلى الدليل أم تساويها أم أكبر؟', 'Before you see it: is $PF$ less than, equal to or more than the distance $PH$ to the directrix?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'تساويها', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={directrixPrediction(state)}
            choice={state.prediction}
            tip={say('Parabolako puntuak fokutik eta zuzentzailetik distantzia berera daude.', 'Los puntos de la parábola están a la misma distancia del foco y de la directriz.', 'نقاط القطع المكافئ على المسافة نفسها من البؤرة والدليل.', 'The points of the parabola are the same distance from the focus and from the directrix.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[
                    `y^2=${2 * p}x\\quad F\\left(${halfLatex(p)},0\\right)\\quad x=-${halfLatex(p)}`,
                    `PF=${pfLatex}\\quad PH=${halfLatex(Math.abs(2 * point[0] + p))}`
                ]}
                note={l(where)}
            />
        </Predict>
    )
    /* The points the ▶ button builds, one per whole height */
    const heights = Array.from({ length: 2 * DIRECTRIX_LIMITS.y + 1 }, (_, i) => i - DIRECTRIX_LIMITS.y)
    const built = progress === null ? heights.length : Math.floor(progress * heights.length)
    const last = built > 0 && built < heights.length ? heights[built - 1] : null
    const curve = Array.from({ length: 97 }, (_, i): [number, number] => {
        const y = -DIRECTRIX_LIMITS.y + (2 * DIRECTRIX_LIMITS.y * i) / 96
        return [(y * y) / (2 * p), y]
    })
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={directrixChallenges} extraChallenges={directrixExtra} state={state}>
            <PlaneBoard box={DIRECTRIX_BOX} cell={24} height={344} label={l(say(`F(${p}/2, 0) fokua, x = −${p}/2 zuzentzailea eta P(${point[0]}, ${point[1]}) puntua`, `El foco F(${p}/2, 0), la directriz x = −${p}/2 y el punto P(${point[0]}, ${point[1]})`, `البؤرة F(${p}/2, 0) والدليل x = −${p}/2 والنقطة P(${point[0]}, ${point[1]})`, `The focus F(${p}/2, 0), the directrix x = −${p}/2 and the point P(${point[0]}, ${point[1]})`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {segment(map, [-p / 2, DIRECTRIX_BOX.yMin], [-p / 2, DIRECTRIX_BOX.yMax], SECOND, 2.6, true)}
                            {shown && progress === null && <Path map={map} points={curve} color={STAGE} width={3.2} />}
                            {shown && progress !== null && heights.slice(0, built).map((y) => {
                                const x = (y * y) / (2 * p)
                                return <circle key={y} cx={map.x(x)} cy={map.y(y)} r={3.6} fill={STAGE} />
                            })}
                            {last !== null && (
                                <g>
                                    {segment(map, [(last * last) / (2 * p), last], focus, MUSTARD, 2)}
                                    {segment(map, [(last * last) / (2 * p), last], [-p / 2, last], MUSTARD, 2)}
                                </g>
                            )}
                            {shown && segment(map, point, focus, GREEN)}
                            {shown && segment(map, point, foot, MUSTARD)}
                        </g>
                        <Dot map={map} point={focus} name="F" color={SECOND} dx={6} dy={-10} />
                        <Dot map={map} point={point} name="P" color={INK} />
                        {shown && <Dot map={map} point={foot} name="H" color={MUSTARD} dx={-8} dy={-8} />}
                        {!shown && <Hidden x={(map.x(point[0]) + map.x(focus[0])) / 2 + 12} y={(map.y(point[1]) + map.y(focus[1])) / 2} size={20} />}
                    </g>
                )}
            </PlaneBoard>
            <PlayButton label={l(say('Eraiki parabola', 'Construir la parábola', 'ابنِ القطع المكافئ', 'Build the parabola'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The eccentricity ---------- */

const ECCENTRICITY_BOX: PlaneBox = { xMin: -9, xMax: 5, yMin: -6, yMax: 6 }

const eText = (k: number) => {
    const divisor = k % 4 === 0 ? 4 : k % 2 === 0 ? 2 : 1
    return 4 / divisor === 1 ? String(k / divisor) : `${k / divisor}/${4 / divisor}`
}

export function EccentricityTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<EccentricityState>(initialEccentricityState)
    const { k, angle } = state
    const shown = state.prediction !== null
    const playback = usePlayback(`${k}`, 2400)
    const progress = shown && playback.progress !== null ? playback.progress : null
    const range = angleRange(k)
    const point = pointOf(state)
    const lineX = directrixX(state)
    const pf = toFocus(state)
    const ph = toDirectrix(state)
    const controls = (
        <>
            <Stepper label="e" value={k} min={0} max={QUARTERS} format={eText} onChange={(next) => setState((s) => setEccentricity(s, { k: next }))} language={props.language} />
            <Stepper label="θ" value={angle} min={range.min} max={range.max} step={30} format={(value) => `${minus(value)}°`} onChange={(next) => setState((s) => setEccentricity(s, { angle: next }))} language={props.language} />
        </>
    )
    const name = k === 0
        ? say('$e=0$: zirkunferentzia; zuzentzailerik ez dago.', '$e=0$: circunferencia; no hay directriz.', '$e=0$: دائرة؛ لا يوجد دليل.', '$e=0$: a circle; there is no directrix.')
        : k < 4
            ? say('$e<1$: elipsea. $P$ fokutik zuzentzailetik baino hurbilago dago.', '$e<1$: elipse. $P$ está más cerca del foco que de la directriz.', '$e<1$: قطع ناقص. ‏$P$ أقرب إلى البؤرة منه إلى الدليل.', '$e<1$: an ellipse. $P$ is nearer the focus than the directrix.')
            : k === 4
                ? say('$e=1$: parabola. $PF=PH$.', '$e=1$: parábola. $PF=PH$.', '$e=1$: قطع مكافئ. $PF=PH$.', '$e=1$: a parabola. $PF=PH$.')
                : say('$e>1$: hiperbola. $P$ zuzentzailetik fokutik baino hurbilago dago.', '$e>1$: hipérbola. $P$ está más cerca de la directriz que del foco.', '$e>1$: قطع زائد. ‏$P$ أقرب إلى الدليل منه إلى البؤرة.', '$e>1$: a hyperbola. $P$ is nearer the directrix than the focus.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: eszentrikotasun honekin, zein konika ateratzen da?', 'Antes de verlo: con esta excentricidad, ¿qué cónica sale?', 'قبل أن ترى: بهذا الاختلاف المركزي، أي قطع مخروطي ينتج؟', 'Before you see it: with this eccentricity, which conic comes out?')}
            labels={{ '<': say('Elipsea', 'Elipse', 'قطع ناقص', 'Ellipse'), '=': say('Parabola', 'Parábola', 'قطع مكافئ', 'Parabola'), '>': say('Hiperbola', 'Hipérbola', 'قطع زائد', 'Hyperbola') }}
            actual={eccentricityPrediction(state)}
            choice={state.prediction}
            tip={say('$e<1$ elipsea (eta $e=0$, zirkunferentzia), $e=1$ parabola eta $e>1$ hiperbola.', '$e<1$ elipse (y $e=0$, circunferencia), $e=1$ parábola y $e>1$ hipérbola.', '$e<1$ قطع ناقص (و$e=0$ دائرة)، و$e=1$ قطع مكافئ، و$e>1$ قطع زائد.', '$e<1$ an ellipse (and $e=0$, a circle), $e=1$ a parabola and $e>1$ a hyperbola.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={ph === null
                    ? [`e=0`, `PF=2`]
                    : [`e=${eLatex(k)}`, `PF${valueLatex(pf, props.language)}\\quad PH${valueLatex(ph, props.language)}`, `\\frac{PF}{PH}=e`]}
                note={l(name)}
            />
        </Predict>
    )
    const curve = curvePoints(k)
    const drawn = progress === null ? curve : curve.slice(0, Math.max(2, Math.round(progress * curve.length)))
    const showLine = lineX !== null && lineX <= ECCENTRICITY_BOX.xMax
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={eccentricityChallenges} extraChallenges={eccentricityExtra} state={state}>
            <PlaneBoard box={ECCENTRICITY_BOX} cell={22} height={320} label={l(say(`F fokua jatorrian, e = ${eText(k)} eszentrikotasuna eta kurbako P puntua (θ = ${angle}°)`, `El foco F en el origen, la excentricidad e = ${eText(k)} y el punto P de la curva (θ = ${angle}°)`, `البؤرة F في الأصل والاختلاف المركزي e = ${eText(k)} والنقطة P من المنحنى (θ = ${angle}°)`, `The focus F at the origin, the eccentricity e = ${eText(k)} and the point P of the curve (θ = ${angle}°)`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {showLine && segment(map, [lineX, ECCENTRICITY_BOX.yMin], [lineX, ECCENTRICITY_BOX.yMax], SECOND, 2.6, true)}
                            {shown && <Path map={map} points={drawn} color={STAGE} width={3.2} />}
                            {segment(map, [0, 0], point, GREEN)}
                            {showLine && segment(map, point, [lineX, point[1]], MUSTARD)}
                        </g>
                        <Dot map={map} point={[0, 0]} name="F" color={SECOND} dx={-8} dy={18} />
                        <Dot map={map} point={point} name="P" color={INK} />
                        {showLine && <text x={map.x(lineX) + 5} y={map.y(ECCENTRICITY_BOX.yMax) + 16} fontSize={14} fontWeight={700} fill={SECOND}>{`x = ${dec(lineX, props.language, 2)}`}</text>}
                        {!shown && <Hidden x={map.x(-5)} y={map.y(3)} />}
                        <text x={map.x(ECCENTRICITY_BOX.xMin) + 6} y={map.y(ECCENTRICITY_BOX.yMin) - 8} fontSize={15} fontWeight={700} fill={MUTED}>{`e = ${eText(k)}`}</text>
                    </g>
                )}
            </PlaneBoard>
            <PlayButton label={l(say('Marraztu kurba', 'Dibujar la curva', 'ارسم المنحنى', 'Draw the curve'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
