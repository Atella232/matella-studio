import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import { globalExtremes, graphXRange, graphZeros, lineLatex, lineXIntercept, localExtremes, numberLatex, pointLatex, quadrantText, signed, storyGraphs, trendWord, type Point } from '../functions'
import { Plane, PlaneGuides, PlanePath, PlanePoint } from '../plane'
import {
    flatStretch,
    hitsTwice,
    initialLineState,
    initialPlaneState,
    initialReadingState,
    initialRelationState,
    initialSlopeState,
    initialTableState,
    isSamePoint,
    LINE_LIMITS,
    lineChallenges,
    lineHits,
    PLANE_LIMIT,
    planeChallenges,
    planeQuadrant,
    readingChallenges,
    readingInfo,
    RELATION_LIMIT,
    relationChallenges,
    relations,
    SLOPE_LIMIT,
    setFormula,
    setLine,
    setLineParams,
    setPlanePoint,
    setReadingGraph,
    setReadingX,
    setRelation,
    setSlopePoint,
    setVerdict,
    slopeChallenges,
    slopeOf,
    TABLE_LIMIT,
    tableChallenges,
    tableFormulas,
    tableValue,
    triedValues,
    tryX,
    type LineState,
    type PlaneState,
    type ReadingState,
    type RelationState,
    type SlopeState,
    type TableState,
    type Verdict
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'

/** Decimal comma (decimal point in Arabic) for the steppers */
const decimal = (language: string, value: number) => signed(value).replace('.', language === 'ar' ? '.' : ',')

/* ---------- The plane and its quadrants ---------- */

export function PlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlaneState>(initialPlaneState)
    const point: Point = [state.x, state.y]
    const quadrant = planeQuadrant(state)
    const controls = (
        <>
            <Stepper label="x" value={state.x} min={-PLANE_LIMIT} max={PLANE_LIMIT} format={signed} onChange={(x) => setState((current) => setPlanePoint(current, { x }))} language={props.language} />
            <Stepper label="y" value={state.y} min={-PLANE_LIMIT} max={PLANE_LIMIT} format={signed} onChange={(y) => setState((current) => setPlanePoint(current, { y }))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Planoan klik eginda ere kokatu dezakezu puntua.', es: 'También puedes colocar el punto pulsando en el plano.', ar: 'يمكنك أيضًا وضع النقطة بالنقر على المستوى.' })}</p>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$A${pointLatex(point)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{l(quadrantText(point))}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={planeChallenges} state={state}>
            <Plane box={{ xMin: -PLANE_LIMIT, xMax: PLANE_LIMIT, yMin: -PLANE_LIMIT, yMax: PLANE_LIMIT }} cell={28} label={`A(${signed(state.x)}, ${signed(state.y)})`} onPick={([x, y]) => setState((current) => setPlanePoint(current, { x, y }))}>
                {(map) => (
                    <g>
                        {quadrant > 0 && (
                            <rect
                                x={quadrant === 1 || quadrant === 4 ? map.x(0) : map.x(-PLANE_LIMIT)}
                                y={quadrant === 1 || quadrant === 2 ? map.y(PLANE_LIMIT) : map.y(0)}
                                width={map.width / 2}
                                height={map.height / 2}
                                fill={STAGE_TINT}
                                opacity={0.7}
                            />
                        )}
                        {[1, 2, 3, 4].map((q) => (
                            <text key={q} x={map.x(q === 1 || q === 4 ? PLANE_LIMIT - 0.6 : -PLANE_LIMIT + 0.6)} y={map.y(q === 1 || q === 2 ? PLANE_LIMIT - 0.9 : -PLANE_LIMIT + 0.6)} textAnchor={q === 1 || q === 4 ? 'end' : 'start'} fontSize={16} fontWeight={700} fill={INK} opacity={0.35}>{['I', 'II', 'III', 'IV'][q - 1]}</text>
                        ))}
                        <PlaneGuides map={map} point={point} />
                        <PlanePoint map={map} point={point} name="A" dx={9} dy={-9} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Function or not ---------- */

export function RelationTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RelationState>(initialRelationState)
    const current = relations[state.relation]
    const hits = lineHits(state)
    const twice = hitsTwice(state)
    const verdict = state.verdicts[state.relation] ?? 'none'
    const controls = (
        <>
            <Segmented label={l({ eu: 'Erlazioa', es: 'Relación', ar: 'العلاقة' })} value={String(state.relation)} options={relations.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => setRelation(s, Number(next)))} />
            <Stepper label={l({ eu: 'Zuzen bertikala: x =', es: 'Recta vertical: x =', ar: 'الخط الرأسي: x =' })} value={state.k} min={-RELATION_LIMIT} max={RELATION_LIMIT} format={signed} onChange={(k) => setState((s) => setLine(s, k))} language={props.language} />
            <Segmented
                label={l({ eu: 'Zure erabakia', es: 'Tu decisión', ar: 'قرارك' })}
                value={verdict}
                options={[
                    { value: 'none', label: '?' },
                    { value: 'yes', label: l({ eu: 'Funtzioa', es: 'Función', ar: 'دالة' }) },
                    { value: 'no', label: l({ eu: 'Ez da', es: 'No es', ar: 'ليست' }) }
                ]}
                onChange={(next) => setState((s) => setVerdict(s, next === 'none' ? null : (next as Verdict)))}
            />
        </>
    )
    const readout = (
        <span className="fraction-v2-lab-readout-note">
            {hits.length === 0
                ? l({ eu: `x = ${signed(state.k)} zuzenak ez du punturik ebakitzen.`, es: `La recta x = ${signed(state.k)} no corta ningún punto.`, ar: `الخط x = ${signed(state.k)} لا يقطع أي نقطة.` })
                : twice
                    ? l({ eu: `x = ${signed(state.k)} zuzenak ${hits.length} puntu ebakitzen ditu: x berak bi irteera ditu, ez da funtzioa.`, es: `La recta x = ${signed(state.k)} corta ${hits.length} puntos: la misma x tiene dos salidas, no es función.`, ar: `الخط x = ${signed(state.k)} يقطع ${hits.length} نقاط: لـ x نفسها مخرجان فليست دالة.` })
                    : l({ eu: `x = ${signed(state.k)} zuzenak puntu bat ebakitzen du: irteera bakarra.`, es: `La recta x = ${signed(state.k)} corta un punto: una sola salida.`, ar: `الخط x = ${signed(state.k)} يقطع نقطة واحدة: مخرج واحد.` })}
        </span>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={relationChallenges} state={state}>
            <Plane box={{ xMin: -5, xMax: 5, yMin: -4, yMax: 5 }} cell={30} label={l({ eu: `${state.relation + 1}. erlazioa`, es: `Relación ${state.relation + 1}`, ar: `العلاقة ${state.relation + 1}` })}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[state.k, -4], [state.k, 5]]} color={twice ? SECOND : STAGE} width={3} dashed />
                        {current.points.map((point) => {
                            const onLine = point[0] === state.k
                            return <PlanePoint key={`${point[0]},${point[1]}`} map={map} point={point} color={onLine ? SECOND : STAGE} radius={onLine ? 8 : 6} />
                        })}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Table, formula and points ---------- */

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TableState>(initialTableState)
    const formula = tableFormulas[state.formula]
    const value = tableValue(state)
    const tried = triedValues(state)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', ar: 'الدالة' })} value={String(state.formula)} options={tableFormulas.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => setFormula(s, Number(next)))} />
            <Stepper label="x =" value={state.x} min={-TABLE_LIMIT} max={TABLE_LIMIT} format={signed} onChange={(x) => setState((s) => tryX(s, x))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: `Probatutako balioak: ${tried.length}`, es: `Valores probados: ${tried.length}`, ar: `القيم المجرَّبة: ${tried.length}` })}</p>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula.latex}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$x=${state.x}\\ \\to\\ y=${formula.steps(state.x)}=${value}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$(${state.x},\\,${value})$`} /></span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tableChallenges} state={state}>
            <div className="functions-lab-table-wrap" dir="ltr">
                <table className="functions-lab-table">
                    <tbody>
                        <tr><th scope="row"><i>x</i></th>{tried.map((x) => <td key={x} className={x === state.x ? 'current' : ''}>{signed(x)}</td>)}</tr>
                        <tr><th scope="row"><i>y</i></th>{tried.map((x) => <td key={x} className={x === state.x ? 'current' : ''}>{signed(formula.apply(x))}</td>)}</tr>
                    </tbody>
                </table>
            </div>
            <Plane box={{ xMin: -4, xMax: 4, yMin: -6, yMax: 8 }} cell={20} label={l({ eu: `${formula.latex.replace(/[{}]/g, '')} funtzioaren puntuak`, es: `Puntos de ${formula.latex.replace(/[{}]/g, '')}`, ar: `نقاط ${formula.latex.replace(/[{}]/g, '')}` })} labelStep={2}>
                {(map) => (
                    <g>
                        {tried.map((x) => <PlanePoint key={x} map={map} point={[x, formula.apply(x)]} color={x === state.x ? SECOND : STAGE} radius={x === state.x ? 7 : 5} />)}
                        <PlaneGuides map={map} point={[state.x, value]} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Reading a graph ---------- */

export function ReadingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ReadingState>(initialReadingState)
    const [marks, setMarks] = useState<'off' | 'on'>('off')
    const graph = storyGraphs[state.graph]
    const [from, to] = graphXRange(graph)
    const info = readingInfo(state)
    const flat = flatStretch(state)
    const ys = graph.points.map((point) => point[1])
    const box = { xMin: Math.min(0, from), xMax: to, yMin: Math.min(0, ...ys), yMax: Math.max(...ys) + 1 }
    const cell = Math.max(20, Math.min(36, Math.floor(300 / (box.yMax - box.yMin)), Math.floor(440 / (box.xMax - box.xMin))))
    const { maxima, minima } = localExtremes(graph.points)
    const { max, min } = globalExtremes(graph.points)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Grafikoa', es: 'Gráfica', ar: 'الرسم' })} value={String(state.graph)} options={storyGraphs.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState(setReadingGraph(Number(next)))} />
            <Stepper label={l({ eu: 'Kurtsorea: x =', es: 'Cursor: x =', ar: 'المؤشر: x =' })} value={state.x} min={from} max={to} format={signed} onChange={(x) => setState((s) => setReadingX(s, x))} language={props.language} />
            <Segmented label={l({ eu: 'Muturrak eta ebakidurak', es: 'Extremos y cortes', ar: 'القيم القصوى والتقاطعات' })} value={marks} options={[{ value: 'off', label: l({ eu: 'Ezkutatu', es: 'Ocultar', ar: 'إخفاء' }) }, { value: 'on', label: l({ eu: 'Erakutsi', es: 'Mostrar', ar: 'إظهار' }) }]} onChange={setMarks} />
        </>
    )
    const tags: string[] = []
    if (info.isMax) tags.push(l({ eu: 'maximoa', es: 'máximo', ar: 'قيمة عظمى' }))
    if (info.isMin) tags.push(l({ eu: 'minimoa', es: 'mínimo', ar: 'قيمة صغرى' }))
    if (info.isZero) tags.push(l({ eu: 'X ardatzeko ebakidura', es: 'corte con el eje X', ar: 'تقاطع مع محور X' }))
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$f(${state.x})=${info.y}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {l({ eu: `Hemendik aurrera ${l(trendWord[info.trend])} da`, es: `A partir de aquí es ${l(trendWord[info.trend])}`, ar: `من هنا تكون ${l(trendWord[info.trend])}` })}
                {flat ? l({ eu: ` (x = ${flat.from} eta ${flat.to} artean berdin)`, es: ` (igual entre x = ${flat.from} y ${flat.to})`, ar: ` (ثابتة بين x = ${flat.from} و${flat.to})` }) : ''}
                {tags.length > 0 ? ` · ${tags.join(' · ')}` : ''}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={readingChallenges} state={state}>
            <p className="functions-lab-caption"><strong>{l(graph.title)}</strong> · {l(graph.xLabel)} / {l(graph.yLabel)}</p>
            <Plane box={box} cell={cell} label={l(graph.title)} xName={l(graph.xLabel).length <= 2 ? l(graph.xLabel) : 'x'} yName={l(graph.yLabel).length <= 2 ? l(graph.yLabel) : 'y'}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.6} />
                        {marks === 'on' && maxima.map((point) => <PlanePoint key={`M${point[0]}`} map={map} point={point} color={SECOND} radius={6} name={point[0] === max[0] ? 'max' : undefined} dx={0} dy={-12} anchor="middle" fontSize={13} />)}
                        {marks === 'on' && minima.map((point) => <PlanePoint key={`m${point[0]}`} map={map} point={point} color={GREEN} radius={6} name={point[0] === min[0] ? 'min' : undefined} dx={0} dy={20} anchor="middle" fontSize={13} />)}
                        {marks === 'on' && graphZeros(graph.points).map((x) => <PlanePoint key={`z${x}`} map={map} point={[x, 0]} color={MUSTARD} radius={6} />)}
                        <PlaneGuides map={map} point={[state.x, info.y]} />
                        <PlanePoint map={map} point={[state.x, info.y]} color={SECOND} radius={7.5} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Slope between two points ---------- */

export function SlopeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlopeState>(initialSlopeState)
    const [a, b] = [state.a, state.b]
    const slope = slopeOf(state)
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const stepper = (which: 'a' | 'b', axis: 0 | 1, label: string) => (
        <Stepper label={label} value={state[which][axis]} min={-SLOPE_LIMIT} max={SLOPE_LIMIT} format={signed} onChange={(value) => setState((s) => setSlopePoint(s, which, axis, value))} language={props.language} />
    )
    const controls = (
        <>
            {stepper('a', 0, 'A: x₁')}
            {stepper('a', 1, 'A: y₁')}
            {stepper('b', 0, 'B: x₂')}
            {stepper('b', 1, 'B: y₂')}
        </>
    )
    const behaviour = slope === null
        ? l({ eu: 'Δx = 0: zuzen bertikala. Ez du maldarik eta ez da funtzioa.', es: 'Δx = 0: recta vertical. No tiene pendiente y no es función.', ar: 'Δx = 0: خط رأسي. لا ميل له وليس دالة.' })
        : dy === 0
            ? l({ eu: 'm = 0: zuzen horizontala (funtzio konstantea).', es: 'm = 0: recta horizontal (función constante).', ar: 'm = 0: خط أفقي (دالة ثابتة).' })
            : dy * dx > 0
                ? l({ eu: 'm > 0: zuzena gorakorra da.', es: 'm > 0: la recta es creciente.', ar: 'm > 0: الخط متزايد.' })
                : l({ eu: 'm < 0: zuzena beherakorra da.', es: 'm < 0: la recta es decreciente.', ar: 'm < 0: الخط متناقص.' })
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                {slope === null || isSamePoint(state)
                    ? <MathText text={`$\\Delta x=${dx}\\qquad \\Delta y=${dy}$`} />
                    : <MathText text={`$m=\\frac{\\Delta y}{\\Delta x}=\\frac{${dy}}{${dx}}=${toLatex(slope)}$`} />}
            </span>
            <span className="fraction-v2-lab-readout-note">{isSamePoint(state) ? l({ eu: 'A eta B puntu bera dira: mugitu bat.', es: 'A y B son el mismo punto: mueve uno.', ar: 'A وB النقطة نفسها: حرّك إحداهما.' }) : behaviour}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={slopeChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={28} label={`A(${signed(a[0])}, ${signed(a[1])}) · B(${signed(b[0])}, ${signed(b[1])})`}>
                {(map, clip) => (
                    <g>
                        {!isSamePoint(state) && slope !== null && <PlanePath map={map} points={[[-7, a[1] + ((-7 - a[0]) * dy) / dx], [7, a[1] + ((7 - a[0]) * dy) / dx]]} color={STAGE} width={3.4} clip={clip} />}
                        {!isSamePoint(state) && slope === null && <PlanePath map={map} points={[[a[0], -7], [a[0], 7]]} color={SECOND} width={3.4} clip={clip} />}
                        {slope !== null && !isSamePoint(state) && <PlanePath map={map} points={[a, [b[0], a[1]], b]} color={SECOND} width={2.4} dashed clip={clip} />}
                        {slope !== null && dx !== 0 && <text x={map.x((a[0] + b[0]) / 2)} y={map.y(a[1]) + (dy >= 0 ? 18 : -8)} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{`Δx = ${signed(dx)}`}</text>}
                        {slope !== null && dy !== 0 && <text x={map.x(b[0]) + (dx >= 0 ? 8 : -8)} y={map.y((a[1] + b[1]) / 2)} textAnchor={dx >= 0 ? 'start' : 'end'} fontSize={14} fontWeight={700} fill={SECOND}>{`Δy = ${signed(dy)}`}</text>}
                        <PlanePoint map={map} point={a} color={INK} name="A" radius={6} dx={-9} dy={-9} anchor="end" />
                        <PlanePoint map={map} point={b} color={INK} name="B" radius={6} dx={9} dy={-9} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The line y = mx + n ---------- */

export function LineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LineState>(initialLineState)
    const { m, n } = state
    const xIntercept = lineXIntercept(m, n)
    const controls = (
        <>
            <Stepper label="m" value={m} min={LINE_LIMITS.m.min} max={LINE_LIMITS.m.max} step={0.5} format={(value) => decimal(props.language, value)} onChange={(value) => setState((s) => setLineParams(s, { m: value }))} language={props.language} />
            <Stepper label="n" value={n} min={LINE_LIMITS.n.min} max={LINE_LIMITS.n.max} format={signed} onChange={(value) => setState((s) => setLineParams(s, { n: value }))} language={props.language} />
        </>
    )
    const kind = m === 0
        ? l({ eu: 'm = 0: funtzio konstantea, zuzen horizontala.', es: 'm = 0: función constante, recta horizontal.', ar: 'm = 0: دالة ثابتة، خط أفقي.' })
        : n === 0
            ? l({ eu: 'n = 0: proportzionaltasun zuzeneko funtzioa, jatorritik pasatzen da.', es: 'n = 0: función de proporcionalidad directa, pasa por el origen.', ar: 'n = 0: دالة تناسب طردي، تمر بنقطة الأصل.' })
            : m > 0
                ? l({ eu: 'm > 0: zuzena gorakorra da.', es: 'm > 0: la recta es creciente.', ar: 'm > 0: الخط متزايد.' })
                : l({ eu: 'm < 0: zuzena beherakorra da.', es: 'm < 0: la recta es decreciente.', ar: 'm < 0: الخط متناقص.' })
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${lineLatex(m, n)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{kind}</span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={l({ eu: `Y ardatza: $(0,\\,${numberLatex(n)})$`, es: `Eje Y: $(0,\\,${numberLatex(n)})$`, ar: `محور Y: $(0,\\,${numberLatex(n)})$` })} />
                {' · '}
                {xIntercept === null
                    ? l({ eu: n === 0 ? 'X ardatza: zuzena bera da' : 'X ardatza: ez du ebakitzen', es: n === 0 ? 'Eje X: coincide con él' : 'Eje X: no lo corta', ar: n === 0 ? 'محور X: ينطبق عليه' : 'محور X: لا يقطعه' })
                    : <MathText text={l({ eu: `X ardatza: $(${numberLatex(xIntercept)},\\,0)$`, es: `Eje X: $(${numberLatex(xIntercept)},\\,0)$`, ar: `محور X: $(${numberLatex(xIntercept)},\\,0)$` })} />}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lineChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -7, yMax: 7 }} cell={26} label={lineLatex(m, n).replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '$1/$2')}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-7, -7 * m + n], [7, 7 * m + n]]} color={STAGE} width={3.6} clip={clip} />
                        {xIntercept !== null && Math.abs(xIntercept) <= 6 && <PlanePoint map={map} point={[xIntercept, 0]} color={GREEN} radius={6.5} />}
                        {Math.abs(n) <= 7 && <PlanePoint map={map} point={[0, n]} color={SECOND} radius={6.5} name={`(0, ${signed(n)})`} dx={10} dy={n >= 0 ? -8 : 18} fontSize={13} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}
