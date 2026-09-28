import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toNumber } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText } from '../../../features/unit-v2/types'
import {
    AREA_LIMITS,
    angleKind,
    answerArea,
    answerHypotenuse,
    areaChallenges,
    areaOf,
    circleChallenges,
    circleExpected,
    classifyTriangle,
    hypotenuse,
    hypotenuseSquare,
    initialAreaState,
    initialCircleState,
    initialProtractorState,
    initialPythagorasState,
    initialTriangleState,
    isWholeHypotenuse,
    LEG_LIMITS,
    protractorChallenges,
    pythagorasChallenges,
    RADIUS_LIMITS,
    setAngle,
    setArea,
    setCircle,
    setLegs,
    setTriangle,
    thirdAngle,
    triangleChallenges,
    type AngleKind,
    type AreaShape,
    type AreaState,
    type CircleState,
    type ProtractorState,
    type PythagorasState,
    type TriangleByAngles,
    type TriangleBySides,
    type TriangleState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const rad = (degrees: number) => (degrees * Math.PI) / 180
const decimalText = (value: number, language: string) => (language === 'ar' ? String(value) : String(value).replace('.', ','))

const answerTexts = {
    placeholder: { eu: 'Adib.: 31,4', es: 'Ej.: 31,4', ar: 'مثال: 31.4' },
    unreadable: { eu: 'Idatzi zenbaki bat, unitaterik gabe.', es: 'Escribe un número, sin unidades.', ar: 'اكتب عددًا دون وحدات.' }
}

/* ---------- Protractor ---------- */

const angleNames: Record<AngleKind, LocalizedText> = {
    null: { eu: 'angelu nulua', es: 'ángulo nulo', ar: 'زاوية منعدمة' },
    acute: { eu: 'angelu zorrotza', es: 'ángulo agudo', ar: 'زاوية حادة' },
    right: { eu: 'angelu zuzena', es: 'ángulo recto', ar: 'زاوية قائمة' },
    obtuse: { eu: 'angelu kamutsa', es: 'ángulo obtuso', ar: 'زاوية منفرجة' },
    straight: { eu: 'angelu laua', es: 'ángulo llano', ar: 'زاوية مستقيمة' },
    reflex: { eu: 'angelu ahurra (180° baino gehiago)', es: 'ángulo cóncavo (más de 180°)', ar: 'زاوية منعكسة (أكثر من 180°)' },
    full: { eu: 'angelu osoa', es: 'ángulo completo', ar: 'زاوية كاملة' }
}

export function ProtractorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProtractorState>(initialProtractorState)
    const { angle } = state
    const cx = 240
    const cy = 190
    const r = 150
    const end = [cx + r * Math.cos(rad(angle)), cy - r * Math.sin(rad(angle))]
    const arcR = 46
    const arcEnd = [cx + arcR * Math.cos(rad(angle)), cy - arcR * Math.sin(rad(angle))]

    const controls = (
        <>
            <Stepper label={l({ eu: 'Angelua (°)', es: 'Ángulo (°)', ar: 'الزاوية (°)' })} value={angle} min={0} max={360} onChange={(next) => setState((current) => setAngle(current, next))} language={props.language} />
            <Stepper label={l({ eu: 'Urrats handiak', es: 'Pasos grandes', ar: 'خطوات كبيرة' })} value={angle} min={0} max={360} step={15} onChange={(next) => setState((current) => setAngle(current, next))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">{angle}° · {l(angleNames[angleKind(angle)])}</span>
            <span className="fraction-v2-lab-readout-note">
                {angle <= 90 && l({ eu: `Osagarria: ${90 - angle}°. `, es: `Complementario: ${90 - angle}°. `, ar: `المتممة: ${90 - angle}°. ` })}
                {angle <= 180 && l({ eu: `Betegarria: ${180 - angle}°.`, es: `Suplementario: ${180 - angle}°.`, ar: `المكملة: ${180 - angle}°.` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={protractorChallenges} state={state}>
            <div className="geometry-lab-figure">
                <svg viewBox="0 0 480 230" role="img" aria-label={`${angle}°`}>
                    <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill={STAGE_TINT} fillOpacity={0.4} stroke={INK} strokeWidth={1.2} />
                    {Array.from({ length: 19 }, (_, index) => index * 10).map((tick) => (
                        <line key={tick} x1={cx + (r - (tick % 90 === 0 ? 14 : 8)) * Math.cos(rad(tick))} y1={cy - (r - (tick % 90 === 0 ? 14 : 8)) * Math.sin(rad(tick))} x2={cx + r * Math.cos(rad(tick))} y2={cy - r * Math.sin(rad(tick))} stroke={INK} strokeWidth={tick % 90 === 0 ? 2 : 1} />
                    ))}
                    <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={INK} strokeWidth={3} strokeLinecap="round" />
                    <line x1={cx} y1={cy} x2={end[0]} y2={end[1]} stroke={STAGE} strokeWidth={3} strokeLinecap="round" />
                    {angle > 0 && angle < 360 && <path d={`M${cx + arcR} ${cy} A${arcR} ${arcR} 0 ${angle > 180 ? 1 : 0} 0 ${arcEnd[0]} ${arcEnd[1]}`} fill="none" stroke={SECOND} strokeWidth={2.4} />}
                    {angle === 360 && <circle cx={cx} cy={cy} r={arcR} fill="none" stroke={SECOND} strokeWidth={2.4} />}
                    <circle cx={cx} cy={cy} r={5} fill={INK} />
                    <text x={cx + 70 * Math.cos(rad(angle / 2))} y={cy - 70 * Math.sin(rad(angle / 2)) + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>{angle}°</text>
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Triangle builder ---------- */

const byAngles: Record<TriangleByAngles, LocalizedText> = {
    acute: { eu: 'angelu-zorrotza', es: 'acutángulo', ar: 'حاد الزوايا' },
    right: { eu: 'angeluzuzena', es: 'rectángulo', ar: 'قائم الزاوية' },
    obtuse: { eu: 'angelu-kamutsa', es: 'obtusángulo', ar: 'منفرج الزاوية' }
}
const bySides: Record<TriangleBySides, LocalizedText> = {
    equilateral: { eu: 'aldeberdina', es: 'equilátero', ar: 'متساوي الأضلاع' },
    isosceles: { eu: 'isoszelea', es: 'isósceles', ar: 'متساوي الساقين' },
    scalene: { eu: 'eskalenoa', es: 'escaleno', ar: 'مختلف الأضلاع' }
}

export function TriangleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TriangleState>(initialTriangleState)
    const c = thirdAngle(state)
    const kind = classifyTriangle(state)
    // Base AB fixed; C from the law of sines, then scaled to fit
    let points: string | null = null
    if (c !== null) {
        const base = 1
        const ac = (base * Math.sin(rad(state.b))) / Math.sin(rad(c))
        const cxRaw = ac * Math.cos(rad(state.a))
        const cyRaw = ac * Math.sin(rad(state.a))
        const minX = Math.min(0, cxRaw)
        const maxX = Math.max(base, cxRaw)
        const scale = Math.min(380 / (maxX - minX), 180 / Math.max(cyRaw, 0.01))
        const toX = (x: number) => 50 + (x - minX) * scale
        const toY = (y: number) => 205 - y * scale
        points = `${toX(0)},${toY(0)} ${toX(base)},${toY(0)} ${toX(cxRaw)},${toY(cyRaw)}`
    }
    const controls = (
        <>
            <Stepper label="A (°)" value={state.a} min={1} max={179} step={5} onChange={(next) => setState((current) => setTriangle(current, { a: next }))} language={props.language} />
            <Stepper label="B (°)" value={state.b} min={1} max={179} step={5} onChange={(next) => setState((current) => setTriangle(current, { b: next }))} language={props.language} />
            <Stepper label={l({ eu: 'B zehatz (°)', es: 'B fino (°)', ar: 'B بدقة (°)' })} value={state.b} min={1} max={179} onChange={(next) => setState((current) => setTriangle(current, { b: next }))} language={props.language} />
        </>
    )
    const readout = c === null
        ? <span className="fraction-v2-lab-readout-note">{l({ eu: `A + B = ${state.a + state.b}°: 180° edo gehiago. Ez dago triangelurik.`, es: `A + B = ${state.a + state.b}°: 180° o más. No hay triángulo.`, ar: `A + B = ${state.a + state.b}°: ‏180° أو أكثر. لا يوجد مثلث.` })}</span>
        : (
            <>
                <span className="fraction-v2-lab-readout-main"><MathText text={`$C=180^{\\circ}-${state.a}^{\\circ}-${state.b}^{\\circ}=${c}^{\\circ}$`} /></span>
                {kind && <span className="fraction-v2-lab-readout-note">{l({ eu: `Triangelu ${l(byAngles[kind.angles])} eta ${l(bySides[kind.sides])}.`, es: `Triángulo ${l(byAngles[kind.angles])} y ${l(bySides[kind.sides])}.`, ar: `مثلث ${l(byAngles[kind.angles])} و${l(bySides[kind.sides])}.` })}</span>}
            </>
        )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={triangleChallenges} state={state}>
            <div className="geometry-lab-figure">
                <svg viewBox="0 0 480 230" role="img" aria-label={c === null ? '—' : `A ${state.a}°, B ${state.b}°, C ${c}°`}>
                    {points ? <polygon points={points} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" /> : <line x1={50} y1={205} x2={430} y2={205} stroke={INK} strokeWidth={2.4} strokeDasharray="8 6" />}
                    {points && points.split(' ').map((point, index) => {
                        const [x, y] = point.split(',').map(Number)
                        return <text key={index} x={x + (index === 0 ? -16 : index === 1 ? 16 : 0)} y={y + (index === 2 ? -10 : 18)} textAnchor="middle" fontSize={16} fontWeight={700} fill={index === 2 ? SECOND : STAGE}>{['A', 'B', 'C'][index]}</text>
                    })}
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Pythagoras' squares ---------- */

export function PythagorasTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PythagorasState>(initialPythagorasState)
    const { legA, legB } = state
    const whole = isWholeHypotenuse(state)
    // The three squares span 2a + b across and a + 2b down: pick the cell so they fit the box
    const cell = Math.min(14, 440 / (2 * legA + legB), 340 / (legA + 2 * legB))
    const a = legA * cell
    const b = legB * cell
    const ox = 20 + a
    const oy = 10 + a + b
    const controls = (
        <>
            <Stepper label={l({ eu: 'Katetoa b', es: 'Cateto b', ar: 'الضلع b' })} value={legA} min={LEG_LIMITS.min} max={LEG_LIMITS.max} onChange={(next) => setState((current) => setLegs(current, { legA: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Katetoa c', es: 'Cateto c', ar: 'الضلع c' })} value={legB} min={LEG_LIMITS.min} max={LEG_LIMITS.max} onChange={(next) => setState((current) => setLegs(current, { legB: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$a^{2}=${legA}^{2}+${legB}^{2}=${legA ** 2}+${legB ** 2}=${hypotenuseSquare(state)}$`} /></span>
            {whole
                ? <ResultAnswer language={props.language} state={state} expected={fraction(hypotenuse(state))} placeholder={{ eu: 'Adib.: 5', es: 'Ej.: 5', ar: 'مثال: 5' }} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerHypotenuse(current, patch))} />
                : <span className="fraction-v2-lab-readout-note">{l({ eu: `a = √${hypotenuseSquare(state)} ≈ ${decimalText(Math.round(hypotenuse(state) * 100) / 100, 'eu')}: ez da zenbaki osoa. Bilatu kateto-bikote bat hipotenusa osoarekin.`, es: `a = √${hypotenuseSquare(state)} ≈ ${decimalText(Math.round(hypotenuse(state) * 100) / 100, 'es')}: no es entera. Busca una pareja de catetos con hipotenusa entera.`, ar: `a = √${hypotenuseSquare(state)} ≈ ${Math.round(hypotenuse(state) * 100) / 100}: ليس عددًا صحيحًا. ابحث عن زوج أضلاع وتره عدد صحيح.` })}</span>}
        </>
    )
    const hx = -b
    const hy = -a
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pythagorasChallenges} state={state}>
            <div className="geometry-lab-figure">
                <svg viewBox="0 0 480 360" role="img" aria-label={`${legA}² + ${legB}² = ${hypotenuseSquare(state)}`}>
                    <rect x={ox - a} y={oy - a} width={a} height={a} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.4} />
                    <rect x={ox} y={oy} width={b} height={b} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                    <polygon points={`${ox},${oy - a} ${ox + b},${oy} ${ox + b - hy},${oy + hx} ${ox - hy},${oy - a + hx}`} fill="var(--second-tint, #f8dcd0)" stroke={INK} strokeWidth={1.4} />
                    <polygon points={`${ox},${oy} ${ox + b},${oy} ${ox},${oy - a}`} fill="#fffcf6" stroke={INK} strokeWidth={2.4} />
                    <text x={ox - a / 2} y={oy - a / 2 + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{legA ** 2}</text>
                    <text x={ox + b / 2} y={oy + b / 2 + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{legB ** 2}</text>
                    <text x={ox + b / 2 - hy / 2 + 6} y={oy - a / 2 + hx / 2} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{hypotenuseSquare(state)}</text>
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Area grid ---------- */

const shapeNames: Record<AreaShape, LocalizedText> = {
    rectangle: { eu: 'Laukizuzena', es: 'Rectángulo', ar: 'مستطيل' },
    parallelogram: { eu: 'Paralelogramoa', es: 'Paralelogramo', ar: 'متوازي أضلاع' },
    triangle: { eu: 'Triangelua', es: 'Triángulo', ar: 'مثلث' }
}

export function AreaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AreaState>(initialAreaState)
    const { shape, base, height } = state
    const cell = 26
    const columns = 14
    const rows = 10
    const x0 = 20
    const y0 = 20 + rows * cell
    const shift = shape === 'parallelogram' ? 2 : 0
    const points = shape === 'triangle'
        ? `${x0},${y0} ${x0 + base * cell},${y0} ${x0 + Math.round(base / 3) * cell},${y0 - height * cell}`
        : `${x0},${y0} ${x0 + base * cell},${y0} ${x0 + (base + shift) * cell},${y0 - height * cell} ${x0 + shift * cell},${y0 - height * cell}`
    const area = areaOf(state)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Irudia', es: 'Figura', ar: 'الشكل' })} value={shape} options={(['rectangle', 'parallelogram', 'triangle'] as const).map((value) => ({ value, label: l(shapeNames[value]) }))} onChange={(next) => setState((current) => setArea(current, { shape: next }))} />
            <Stepper label={l({ eu: 'Oinarria', es: 'Base', ar: 'القاعدة' })} value={base} min={AREA_LIMITS.min} max={AREA_LIMITS.max} onChange={(next) => setState((current) => setArea(current, { base: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Altuera', es: 'Altura', ar: 'الارتفاع' })} value={height} min={AREA_LIMITS.min} max={AREA_LIMITS.max} onChange={(next) => setState((current) => setArea(current, { height: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            {(state.checked || state.revealed) && <span className="fraction-v2-lab-readout-main"><MathText text={shape === 'triangle' ? `$A=\\frac{${base}\\cdot ${height}}{2}=${decimalText(toNumber(area), props.language)}$` : `$A=${base}\\cdot ${height}=${base * height}$`} /></span>}
            <ResultAnswer language={props.language} state={state} expected={area} placeholder={answerTexts.placeholder} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerArea(current, patch))} />
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={areaChallenges} state={state}>
            <div className="geometry-lab-figure">
                <svg viewBox={`0 0 ${columns * cell + 40} ${rows * cell + 40}`} role="img" aria-label={`${l(shapeNames[shape])} ${base} · ${height}`}>
                    {Array.from({ length: columns * rows }, (_, index) => <rect key={index} x={x0 + (index % columns) * cell} y={20 + Math.floor(index / columns) * cell} width={cell} height={cell} fill="none" stroke="var(--line, #d6cfc2)" strokeWidth={1} />)}
                    <polygon points={points} fill={STAGE_TINT} fillOpacity={0.85} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                    {shape !== 'rectangle' && <line x1={x0 + (shape === 'triangle' ? Math.round(base / 3) : shift) * cell} x2={x0 + (shape === 'triangle' ? Math.round(base / 3) : shift) * cell} y1={y0} y2={y0 - height * cell} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />}
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Circle ---------- */

export function CircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const { radius, ask } = state
    const drawn = 8 + radius * 3.6
    const shown = state.checked || state.revealed
    const expected = circleExpected(state)
    const separator = props.language === 'ar' ? '.' : '{,}'
    const controls = (
        <>
            <Segmented label={l({ eu: 'Kalkulatu', es: 'Calcula', ar: 'احسب' })} value={ask} options={[{ value: 'length', label: l({ eu: 'Luzera (L)', es: 'Longitud (L)', ar: 'الطول (L)' }) }, { value: 'area', label: l({ eu: 'Azalera (A)', es: 'Área (A)', ar: 'المساحة (A)' }) }]} onChange={(next) => setState((current) => setCircle(current, { ask: next }))} />
            <Stepper label={l({ eu: 'Erradioa r', es: 'Radio r', ar: 'نصف القطر r' })} value={radius} min={RADIUS_LIMITS.min} max={RADIUS_LIMITS.max} onChange={(next) => setState((current) => setCircle(current, { radius: next }))} language={props.language} />
        </>
    )
    const formula = ask === 'length' ? `L=2\\cdot 3${separator}14\\cdot ${radius}` : `A=3${separator}14\\cdot ${radius}^{2}`
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}${shown ? `=${decimalText(toNumber(expected), props.language).replace(',', '{,}')}` : ''}$`} /></span>
            <ResultAnswer language={props.language} state={state} expected={expected} placeholder={answerTexts.placeholder} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={circleChallenges} state={state}>
            <div className="geometry-lab-figure">
                <svg viewBox="0 0 480 260" role="img" aria-label={`r = ${radius}`}>
                    <circle cx={240} cy={130} r={drawn} fill={ask === 'area' ? STAGE_TINT : 'none'} stroke={ask === 'length' ? SECOND : INK} strokeWidth={ask === 'length' ? 4 : 2} />
                    <circle cx={240} cy={130} r={4} fill={INK} />
                    <line x1={240} y1={130} x2={240 + drawn} y2={130} stroke={INK} strokeWidth={2.4} />
                    <text x={240 + drawn / 2} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>r = {radius}</text>
                </svg>
            </div>
        </ToolFrame>
    )
}
