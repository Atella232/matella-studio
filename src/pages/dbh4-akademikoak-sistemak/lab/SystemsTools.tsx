import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Plane, PlaneLine, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { region, type HalfPlane, type Linear, type Point, type Sense } from '../systems'
import {
    CIRCLE_LIMITS,
    circleChallenges,
    circleDiscriminant,
    circlePoints,
    classifyChallenges,
    classifyFirstLines,
    classifyKind,
    classifySolution,
    COEFFICIENT_LIMIT,
    HALF_LIMITS,
    halfPlaneChallenges,
    halfPlaneOf,
    initialCircleState,
    initialClassifyState,
    initialHalfPlaneState,
    initialMixtureState,
    initialRegionState,
    initialShoppingState,
    initialSquaresState,
    initialSubstitutionState,
    isolatedCoefficient,
    isolatedLatex,
    linearLatex,
    mixtureChallenges,
    mixtureScenarios,
    mixtureTotal,
    REGION_LIMITS,
    regionArea,
    regionChallenges,
    regionHalves,
    regionPoints,
    regionVertices,
    setCircle,
    setClassify,
    setHalfPlane,
    setMixture,
    setRegion,
    setShopping,
    setSquares,
    setSubstitution,
    SHOPPING_LIMITS,
    shoppingChallenges,
    shoppingCost,
    shoppingHalves,
    shoppingPoints,
    SQUARES_LIMITS,
    squaresChallenges,
    squaresSolutions,
    squaresValues,
    substituted,
    substitutionChallenges,
    substitutionSystems,
    testPointHolds,
    texFraction,
    type CircleState,
    type ClassifyState,
    type HalfPlaneState,
    type MixtureState,
    type RegionState,
    type ShoppingState,
    type SquaresState,
    type SubstitutionState,
    type Unknown
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const REGION = 'rgba(38, 123, 83, 0.2)'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
/** Negative numbers with the true minus sign */
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const decimal = (value: number, language: UnitLanguage) => signed(Math.round(value * 100) / 100).replace('.', language === 'ar' ? '.' : ',')
/** A point as text, with whole numbers when they are whole */
const pointText = ([x, y]: Point, language: UnitLanguage) => `(${decimal(x, language)}, ${decimal(y, language)})`
/** The plain text of ax + by = c: x + 2y = 3 */
const plain = (latex: string) => latex.replace(/\\le/g, '≤').replace(/\\ge/g, '≥').replace(/([^\s])([+=<>≤≥])/g, '$1 $2 ').replace(/([+=<>≤≥])([^\s])/g, '$1 $2').replace(/-/g, '−').replace(/\s+/g, ' ').trim()
const SENSE_LATEX: Record<Sense, string> = { '≤': '\\le', '<': '<', '≥': '\\ge', '>': '>' }
const SENSES: Sense[] = ['≤', '<', '≥', '>']

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

/** The line ax + by = c, vertical lines included */
function LineOf({ map, line, color, clip, dashed = false }: { map: PlaneMap; line: Linear; color: string; clip: string; dashed?: boolean }) {
    if (line.b !== 0) return <PlaneLine map={map} m={-line.a / line.b} n={line.c / line.b} color={color} clip={clip} width={3} dashed={dashed} />
    const x = line.c / line.a
    return <PlanePath map={map} points={[[x, map.box.yMin - 1], [x, map.box.yMax + 1]]} color={color} width={3} dashed={dashed} clip={clip} />
}

const polygon = (map: PlaneMap, points: Point[]) => points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')

/* ---------- 1. Moving the second line ---------- */

export function ClassifyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ClassifyState>(initialClassifyState)
    const first = classifyFirstLines[state.first]
    const kind = classifyKind(state)
    const solution = classifySolution(state)
    const limit = COEFFICIENT_LIMIT
    const controls = (
        <>
            <Segmented label={l(say('Lehen zuzena', 'Primera recta', 'المستقيم الأول'))} value={String(state.first)} options={classifyFirstLines.map((line, index) => ({ value: String(index), label: plain(linearLatex(line)) }))} onChange={(value) => setState((s) => setClassify(s, { first: Number(value) }))} />
            <Stepper label="a′" value={state.second.a} min={-limit} max={limit} format={signed} onChange={(a) => setState((s) => setClassify(s, { a }))} language={props.language} />
            <Stepper label="b′" value={state.second.b} min={-limit} max={limit} format={signed} onChange={(b) => setState((s) => setClassify(s, { b }))} language={props.language} />
            <Stepper label="c′" value={state.second.c} min={-limit} max={limit} format={signed} onChange={(c) => setState((s) => setClassify(s, { c }))} language={props.language} />
        </>
    )
    const latex = `${linearLatex(first)}\\qquad ${linearLatex(state.second)}`
    const note = kind === 'one' && solution
        ? l(say(`Bateragarri determinatua: ${pointText(solution, props.language)} puntuan ebakitzen dira.`, `Compatible determinado: se cortan en ${pointText(solution, props.language)}.`, `متوافق محدد: يتقاطعان في ${pointText(solution, props.language)}.`))
        : kind === 'none'
            ? l(say('Bateraezina: zuzen paraleloak, ebazpenik ez.', 'Incompatible: rectas paralelas, sin solución.', 'غير متوافق: مستقيمان متوازيان، لا حل.'))
            : l(say('Bateragarri indeterminatua: zuzen bera, infinitu ebazpen.', 'Compatible indeterminado: la misma recta, infinitas soluciones.', 'متوافق غير محدد: المستقيم نفسه، حلول لا نهاية لها.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={classifyChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={24} labelStep={2} label={l(say('Sistemaren bi zuzenak', 'Las dos rectas del sistema', 'مستقيما النظام'))}>
                {(map, clip) => (
                    <g>
                        <LineOf map={map} line={first} color={STAGE} clip={clip} />
                        <LineOf map={map} line={state.second} color={SECOND} clip={clip} dashed />
                        {solution && Math.abs(solution[0]) <= 6 && Math.abs(solution[1]) <= 6 && <PlanePoint map={map} point={solution} color={GREEN} radius={7} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- 2. What to isolate ---------- */

/** k·v with the 1 left out */
const termLatex = (k: ReturnType<typeof fraction>, letter: string) => (k.numerator === k.denominator ? letter : k.numerator === -k.denominator ? `-${letter}` : `${texFraction(k)}${letter}`)

export function SubstitutionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SubstitutionState>(initialSubstitutionState)
    const [first, second] = substitutionSystems[state.system]
    const coefficient = isolatedCoefficient(state)
    const other: Unknown = state.unknown === 'x' ? 'y' : 'x'
    const { k, c, value, solution } = substituted(state)
    const controls = (
        <>
            <Segmented label={l(say('Sistema', 'Sistema', 'النظام'))} value={String(state.system)} options={substitutionSystems.map((_, index) => ({ value: String(index), label: `S${index + 1}` }))} onChange={(value) => setState((s) => setSubstitution(s, { system: Number(value) }))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$${linearLatex(first)}\\qquad ${linearLatex(second)}$`} /></p>
            <Segmented label={l(say('Ekuazioa', 'Ecuación', 'المعادلة'))} value={String(state.equation)} options={[{ value: '0', label: l(say('1.a', '1.ª', 'الأولى')) }, { value: '1', label: l(say('2.a', '2.ª', 'الثانية')) }]} onChange={(value) => setState((s) => setSubstitution(s, { equation: value === '0' ? 0 : 1 }))} />
            <Segmented label={l(say('Askatu', 'Despeja', 'اعزل'))} value={state.unknown} options={[{ value: 'x', label: 'x' }, { value: 'y', label: 'y' }]} onChange={(value) => setState((s) => setSubstitution(s, { unknown: value as Unknown }))} />
        </>
    )
    const latex = isolatedLatex(state)
    const note = Math.abs(coefficient) === 1
        ? l(say(`${state.unknown}-ren koefizientea ${signed(coefficient)} da: ez da zatikirik agertzen.`, `El coeficiente de ${state.unknown} es ${signed(coefficient)}: no salen fracciones.`, `معامل ${state.unknown} هو ${signed(coefficient)}: لا تظهر كسور.`))
        : l(say(`${state.unknown}-ren koefizientea ${signed(coefficient)} da: zatikiak agertzen dira.`, `El coeficiente de ${state.unknown} es ${signed(coefficient)}: salen fracciones.`, `معامل ${state.unknown} هو ${signed(coefficient)}: تظهر كسور.`))
    const steps = [
        { text: say('Askatu', 'Despeja', 'اعزل'), math: latex },
        { text: say('Ordeztu beste ekuazioan', 'Sustituye en la otra ecuación', 'عوّض في المعادلة الأخرى'), math: `${termLatex(k, other)}=${texFraction(c)}` },
        { text: say('Ebatzi', 'Resuelve', 'حلّ'), math: `${other}=${texFraction(value)}` },
        { text: say('Ebazpena', 'La solución', 'الحل'), math: `x=${texFraction(fraction(Math.round(solution[0] * 12), 12))},\\ y=${texFraction(fraction(Math.round(solution[1] * 12), 12))}` }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={substitutionChallenges} state={state}>
            <ol style={{ display: 'grid', gap: 10, margin: 0, padding: 0, listStyle: 'none' }}>
                {steps.map((step, index) => (
                    <li key={index} style={{ display: 'grid', gap: 4, padding: '10px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: index === steps.length - 1 ? '#d6eddf' : index % 2 === 0 ? STAGE_TINT : 'var(--card)' }}>
                        <span style={{ color: MUTED, fontSize: 14 }}>{`${index + 1}. ${l(step.text)}`}</span>
                        <span style={{ fontSize: 20, overflowX: 'auto' }}><MathText text={`$${step.math}$`} /></span>
                    </li>
                ))}
            </ol>
        </ToolFrame>
    )
}

/* ---------- 3. A line against a circle ---------- */

const lineLatex = (m: number, n: number) => `y=${m === 0 ? n : `${m === 1 ? '' : m === -1 ? '-' : m}x${n === 0 ? '' : n < 0 ? n : `+${n}`}`}`

export function CircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const points = circlePoints(state)
    const controls = (
        <>
            <Stepper label={l(say('Erradioa', 'Radio', 'نصف القطر'))} value={state.r} min={CIRCLE_LIMITS.r.min} max={CIRCLE_LIMITS.r.max} onChange={(r) => setState((s) => setCircle(s, { r }))} language={props.language} />
            <Stepper label="m" value={state.m} min={CIRCLE_LIMITS.m.min} max={CIRCLE_LIMITS.m.max} format={signed} onChange={(m) => setState((s) => setCircle(s, { m }))} language={props.language} />
            <Stepper label="n" value={state.n} min={CIRCLE_LIMITS.n.min} max={CIRCLE_LIMITS.n.max} format={signed} onChange={(n) => setState((s) => setCircle(s, { n }))} language={props.language} />
        </>
    )
    const latex = `x^{2}+y^{2}=${state.r * state.r}\\qquad ${lineLatex(state.m, state.n)}`
    const list = points.map((point) => pointText(point, props.language)).join(props.language === 'ar' ? ' و' : props.language === 'eu' ? ' eta ' : ' y ')
    const note = points.length === 0
        ? l(say('Ez dira mozten: sistemak ez du ebazpenik.', 'No se cortan: el sistema no tiene solución.', 'لا يتقاطعان: لا حل للنظام.'))
        : points.length === 1
            ? l(say(`Ukitzailea: ebazpen bakarra, ${list}.`, `Tangente: una sola solución, ${list}.`, `مماس: حل واحد ${list}.`))
            : l(say(`Bi ebazpen: ${list}.`, `Dos soluciones: ${list}.`, `حلّان: ${list}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={circleChallenges} state={state}>
            <Plane box={{ xMin: -7, xMax: 7, yMin: -7, yMax: 7 }} cell={20} labelStep={2} label={l(say('Zirkunferentzia eta zuzena', 'La circunferencia y la recta', 'الدائرة والمستقيم'))}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(0)} cy={map.y(0)} r={state.r * map.cell} fill="none" stroke={STAGE} strokeWidth={3} />
                        <PlaneLine map={map} m={state.m} n={state.n} color={SECOND} clip={clip} width={3} />
                        {points.map((point) => <PlanePoint key={point.join()} map={map} point={point} color={GREEN} radius={6} />)}
                    </g>
                )}
            </Plane>
            <p className="fraction-v2-lab-tip" style={{ textAlign: 'center' }}><MathText text={`$\\Delta=${circleDiscriminant(state)}$`} /></p>
        </ToolFrame>
    )
}

/* ---------- 4. Two squares ---------- */

export function SquaresTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SquaresState>(initialSquaresState)
    const [x2, y2] = squaresValues(state)
    const solutions = squaresSolutions(state)
    const controls = (
        <>
            <Stepper label="A" value={state.A} min={SQUARES_LIMITS.A.min} max={SQUARES_LIMITS.A.max} onChange={(A) => setState((s) => setSquares(s, { A }))} language={props.language} />
            <Stepper label="B" value={state.B} min={SQUARES_LIMITS.B.min} max={SQUARES_LIMITS.B.max} format={signed} onChange={(B) => setState((s) => setSquares(s, { B }))} language={props.language} />
        </>
    )
    const latex = `x^{2}=${texFraction(fraction(state.A + state.B, 2))},\\ y^{2}=${texFraction(fraction(state.A - state.B, 2))}`
    const note = solutions.length === 0
        ? l(say('Karratu bat negatiboa da: ebazpenik ez.', 'Un cuadrado es negativo: no hay solución.', 'أحد المربعين سالب: لا حل.'))
        : l(say(`${solutions.length} ebazpen: ${solutions.map((point) => pointText(point, props.language)).join(' ')}`, `${solutions.length} ${solutions.length === 1 ? 'solución' : 'soluciones'}: ${solutions.map((point) => pointText(point, props.language)).join(' ')}`, `عدد الحلول ${solutions.length}: ${solutions.map((point) => pointText(point, props.language)).join(' ')}`))
    const B = state.B
    const branch = (sign: number): Point[] => Array.from({ length: 121 }, (_, k) => -9 + k * 0.15).map((t) => (B >= 0 ? [sign * Math.sqrt(B + t * t), t] : [t, sign * Math.sqrt(-B + t * t)]))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={squaresChallenges} state={state}>
            <p className="fraction-v2-lab-tip" style={{ textAlign: 'center' }}><MathText text={`$x^{2}+y^{2}=${state.A}\\qquad x^{2}-y^{2}=${state.B}$`} /></p>
            <Plane box={{ xMin: -8, xMax: 8, yMin: -8, yMax: 8 }} cell={17} labelStep={2} label={l(say('Zirkunferentzia eta hiperbola', 'La circunferencia y la hipérbola', 'الدائرة والقطع الزائد'))}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(0)} cy={map.y(0)} r={Math.sqrt(state.A) * map.cell} fill="none" stroke={STAGE} strokeWidth={3} />
                        <PlanePath map={map} points={branch(1)} color={SECOND} width={3} clip={clip} />
                        <PlanePath map={map} points={branch(-1)} color={SECOND} width={3} clip={clip} />
                        {solutions.map((point) => <PlanePoint key={point.join()} map={map} point={point} color={GREEN} radius={6} />)}
                    </g>
                )}
            </Plane>
            <p className="fraction-v2-lab-tip" style={{ textAlign: 'center' }}>{`x² = ${decimal(x2, props.language)} · y² = ${decimal(y2, props.language)}`}</p>
        </ToolFrame>
    )
}

/* ---------- 5. A half-plane and its test point ---------- */

export function HalfPlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HalfPlaneState>(initialHalfPlaneState)
    const half: HalfPlane = halfPlaneOf(state)
    const box = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    const holds = testPointHolds(state)
    const k = HALF_LIMITS.coefficient
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={-k} max={k} format={signed} onChange={(a) => setState((s) => setHalfPlane(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={-k} max={k} format={signed} onChange={(b) => setState((s) => setHalfPlane(s, { b }))} language={props.language} />
            <Segmented label={l(say('Zeinua', 'Signo', 'الرمز'))} value={state.sense} options={SENSES.map((sense) => ({ value: sense, label: sense }))} onChange={(sense) => setState((s) => setHalfPlane(s, { sense: sense as Sense }))} />
            <Stepper label="c" value={state.c} min={-HALF_LIMITS.c} max={HALF_LIMITS.c} format={signed} onChange={(c) => setState((s) => setHalfPlane(s, { c }))} language={props.language} />
            <Stepper label={l(say('Proba-puntua: x', 'Punto de prueba: x', 'نقطة الاختبار: x'))} value={state.px} min={-HALF_LIMITS.point} max={HALF_LIMITS.point} format={signed} onChange={(px) => setState((s) => setHalfPlane(s, { px }))} language={props.language} />
            <Stepper label={l(say('Proba-puntua: y', 'Punto de prueba: y', 'نقطة الاختبار: y'))} value={state.py} min={-HALF_LIMITS.point} max={HALF_LIMITS.point} format={signed} onChange={(py) => setState((s) => setHalfPlane(s, { py }))} language={props.language} />
        </>
    )
    const value = state.a * state.px + state.b * state.py
    const latex = `${linearLatex(state, SENSE_LATEX[state.sense])}\\qquad ${value}${SENSE_LATEX[state.sense]}${state.c}\\ ${holds ? '\\checkmark' : '\\times'}`
    const onBoundary = value === state.c
    const note = holds
        ? l(say('Proba-puntua ebazpena da: bere erdiplanoa da ebazpena.', 'El punto de prueba es solución: su semiplano es la solución.', 'نقطة الاختبار حل: نصف مستواها هو الحل.'))
        : onBoundary
            ? l(say('Puntua muga-zuzenean dago, eta inekuazio hertsi batean ertza ez dago barruan.', 'El punto está en la recta frontera, y en una inecuación estricta el borde no entra.', 'النقطة على المستقيم الحدّي، وفي المتراجحة الصارمة لا يدخل الحد.'))
            : l(say('Proba-puntua ez da ebazpena: ebazpena beste erdiplanoa da.', 'El punto de prueba no es solución: la solución es el otro semiplano.', 'نقطة الاختبار ليست حلًّا: الحل نصف المستوى الآخر.'))
    const strict = state.sense === '<' || state.sense === '>'
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={halfPlaneChallenges} state={state}>
            <Plane box={box} cell={24} labelStep={2} label={l(say('Erdiplanoa eta proba-puntua', 'El semiplano y el punto de prueba', 'نصف المستوى ونقطة الاختبار'))} onPick={([x, y]) => setState((s) => setHalfPlane(s, { px: Math.round(x), py: Math.round(y) }))}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygon(map, region(box, [half]))} fill={REGION} />
                        <LineOf map={map} line={state} color={SECOND} clip={clip} dashed={strict} />
                        <PlanePoint map={map} point={[state.px, state.py]} color={holds ? GREEN : SECOND} radius={7} name={`(${signed(state.px)}, ${signed(state.py)})`} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- 6. The whole points of the triangle ---------- */

export function RegionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RegionState>(initialRegionState)
    const max = REGION_LIMITS.c.max
    const box = { xMin: 0, xMax: max, yMin: 0, yMax: max }
    const points = regionPoints(state)
    const [vx, vy] = regionVertices(state)
    const area = regionArea(state)
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={REGION_LIMITS.coefficient.min} max={REGION_LIMITS.coefficient.max} onChange={(a) => setState((s) => setRegion(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={REGION_LIMITS.coefficient.min} max={REGION_LIMITS.coefficient.max} onChange={(b) => setState((s) => setRegion(s, { b }))} language={props.language} />
            <Stepper label="c" value={state.c} min={REGION_LIMITS.c.min} max={REGION_LIMITS.c.max} onChange={(c) => setState((s) => setRegion(s, { c }))} language={props.language} />
        </>
    )
    const latex = `${linearLatex(state, '\\le ')}\\qquad (${texFraction(vx)},0)\\ \\ (0,${texFraction(vy)})`
    const areaText = decimal(area.numerator / area.denominator, props.language)
    const note = l(say(`${points.length} puntu oso. Azalera: ${areaText}.`, `${points.length} puntos enteros. Área: ${areaText}.`, `عدد النقاط الصحيحة ${points.length}. المساحة: ${areaText}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={regionChallenges} state={state}>
            <Plane box={box} cell={22} labelStep={2} label={l(say('Triangelua eta haren puntu osoak', 'El triángulo y sus puntos enteros', 'المثلث ونقاطه الصحيحة'))}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygon(map, region(box, regionHalves(state)))} fill={REGION} stroke={GREEN} strokeWidth={2} />
                        <LineOf map={map} line={state} color={SECOND} clip={clip} />
                        {points.map((point) => <circle key={point.join()} cx={map.x(point[0])} cy={map.y(point[1])} r={4} fill={GREEN} stroke="var(--card, #fffcf6)" strokeWidth={1.4} />)}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- 7. How many and how much ---------- */

export function MixtureTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MixtureState>(initialMixtureState)
    const scenario = mixtureScenarios[state.scenario]
    const y = scenario.count - state.x
    const total = mixtureTotal(state)
    const right = total === scenario.total
    const controls = (
        <>
            <Segmented label={l(say('Egoera', 'Situación', 'الحالة'))} value={String(state.scenario)} options={mixtureScenarios.map((item, index) => ({ value: String(index), label: l(item.title) }))} onChange={(value) => setState((s) => setMixture(s, { scenario: Number(value) }))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$x+y=${scenario.count}\\qquad ${scenario.first}x+${scenario.second}y=${scenario.total}$`} /></p>
            <Stepper label={`x (${l(scenario.things[0])})`} value={state.x} min={0} max={scenario.count} step={scenario.step} onChange={(x) => setState((s) => setMixture(s, { x }))} language={props.language} />
        </>
    )
    const latex = `${scenario.first}\\cdot ${state.x}+${scenario.second}\\cdot ${y}=${total}${right ? '' : `\\ne ${scenario.total}`}`
    const gap = total - scenario.total
    const perStep = scenario.first - scenario.second
    const note = right
        ? l(say(`Hori da: x = ${state.x} eta y = ${y}.`, `¡Eso es! x = ${state.x} e y = ${y}.`, `هذا هو: x = ${state.x} وy = ${y}.`))
        : l(say(`${Math.abs(gap)} ${gap > 0 ? 'soberan' : 'falta'}. x bat igotzean, guztizkoa ${signed(perStep)} aldatzen da.`, `${gap > 0 ? 'Sobran' : 'Faltan'} ${Math.abs(gap)}. Al subir x en 1, el total cambia ${signed(perStep)}.`, `${gap > 0 ? 'زائد' : 'ناقص'} ${Math.abs(gap)}. عند زيادة x بواحد يتغيّر المجموع بمقدار ${signed(perStep)}.`))
    const width = 520
    const fill = Math.min(1, total / (scenario.total * 1.6))
    const target = 1 / 1.6
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={mixtureChallenges} state={state}>
            <Board height={190} label={l(say('Bi motak eta guztizkoa', 'Las dos clases y el total', 'الصنفان والمجموع'))}>
                <rect x={60} y={20} width={240} height={64} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.5} />
                <text x={180} y={48} textAnchor="middle" fontSize={15} fill={MUTED}>{l(scenario.things[0])}</text>
                <text x={180} y={74} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{`x = ${state.x}`}</text>
                <rect x={340} y={20} width={240} height={64} rx={14} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.5} />
                <text x={460} y={48} textAnchor="middle" fontSize={15} fill={MUTED}>{l(scenario.things[1])}</text>
                <text x={460} y={74} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>{`y = ${y}`}</text>
                <rect x={60} y={112} width={width} height={28} rx={8} fill="var(--card, #fffcf6)" stroke={INK} strokeWidth={1.4} />
                <rect x={60} y={112} width={width * fill} height={28} rx={8} fill={right ? GREEN : STAGE} opacity={0.75} />
                <line x1={60 + width * target} x2={60 + width * target} y1={104} y2={148} stroke={SECOND} strokeWidth={3} />
                <text x={60 + width * target} y={170} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{`${scenario.total} ${l(scenario.unit)}`}</text>
                <text x={66} y={170} fontSize={15} fill={MUTED}>{`${total} ${l(scenario.unit)}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. A shopping basket ---------- */

export function ShoppingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShoppingState>(initialShoppingState)
    const max = SHOPPING_LIMITS.amount
    const box = { xMin: 0, xMax: max, yMin: 0, yMax: max }
    const cost = shoppingCost(state)
    const affordable = cost <= state.budget
    const controls = (
        <>
            <Stepper label={l(say('Aurrekontua (€)', 'Presupuesto (€)', 'الميزانية (€)'))} value={state.budget} min={SHOPPING_LIMITS.budget.min} max={SHOPPING_LIMITS.budget.max} onChange={(budget) => setState((s) => setShopping(s, { budget }))} language={props.language} />
            <Stepper label={l(say('Ogitartekoa (€)', 'Bocadillo (€)', 'الشطيرة (€)'))} value={state.p} min={SHOPPING_LIMITS.price.min} max={SHOPPING_LIMITS.price.max} onChange={(p) => setState((s) => setShopping(s, { p }))} language={props.language} />
            <Stepper label={l(say('Freskagarria (€)', 'Refresco (€)', 'المشروب (€)'))} value={state.q} min={SHOPPING_LIMITS.price.min} max={SHOPPING_LIMITS.price.max} onChange={(q) => setState((s) => setShopping(s, { q }))} language={props.language} />
            <Stepper label={l(say('x ogitarteko', 'x bocadillos', 'x شطائر'))} value={state.x} min={0} max={max} onChange={(x) => setState((s) => setShopping(s, { x }))} language={props.language} />
            <Stepper label={l(say('y freskagarri', 'y refrescos', 'y مشروبات'))} value={state.y} min={0} max={max} onChange={(y) => setState((s) => setShopping(s, { y }))} language={props.language} />
        </>
    )
    const latex = `${state.p}\\cdot ${state.x}+${state.q}\\cdot ${state.y}=${cost}${affordable ? '\\le' : '>'}${state.budget}`
    const options = shoppingPoints(state).length
    const note = affordable
        ? l(say(`Ordain daiteke${cost === state.budget ? ', eta aurrekontu osoa gastatzen da' : ''}. ${options} erosketa posible daude.`, `Se puede pagar${cost === state.budget ? ' y se gasta todo el presupuesto' : ''}. Hay ${options} compras posibles.`, `يمكن دفعه${cost === state.budget ? ' وتُنفق الميزانية كلها' : ''}. هناك ${options} عملية شراء ممكنة.`))
        : l(say(`Ezin da ordaindu: ${cost - state.budget} € falta dira.`, `No se puede pagar: faltan ${cost - state.budget} €.`, `لا يمكن الدفع: ينقص ${cost - state.budget} €.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={shoppingChallenges} state={state}>
            <Plane box={box} cell={24} labelStep={2} xName="x" yName="y" label={l(say('Ordain daitezkeen erosketak', 'Las compras que se pueden pagar', 'عمليات الشراء الممكنة'))} onPick={([x, y]) => setState((s) => setShopping(s, { x: Math.round(x), y: Math.round(y) }))}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygon(map, region(box, shoppingHalves(state)))} fill={REGION} />
                        <LineOf map={map} line={{ a: state.p, b: state.q, c: state.budget }} color={SECOND} clip={clip} />
                        {shoppingPoints(state).map((point) => <circle key={point.join()} cx={map.x(point[0])} cy={map.y(point[1])} r={3.5} fill={GREEN} />)}
                        <PlanePoint map={map} point={[state.x, state.y]} color={affordable ? GREEN : SECOND} radius={7} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}
