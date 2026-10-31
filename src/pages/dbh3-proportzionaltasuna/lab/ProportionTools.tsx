import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { PredictionStep } from '../../dbh2-zatikiak-prototype/lab/PredictionStep'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Gear } from '../figures'
import { GEAR_LIMITS, gearsChallenges, gearsExtra, gearsPrediction, gearsRpmB, gearsTeethPerMinute, initialGearsState, setGears, type GearsState } from './gears'
import { groupedLatex, initialMapState, MAP_HALVES, MAP_SCALES, mapCentimetres, mapChallenges, mapExtra, mapPrediction, mapRealCentimetres, mapRealMetres, setMap, type MapState } from './mapScale'
import { setPrediction, type Prediction } from './prediction'
import { amountFor, INGREDIENTS, initialRecipeState, PANTRIES, PEOPLE_LIMITS, peopleWith, recipeChallenges, recipeExtra, recipeLimit, recipePrediction, setRecipe, type RecipeState } from './recipe'
import { initialRectangleState, RECTANGLE_LIMITS, rectangleBase, rectangleChallenges, rectangleExtra, rectangleHeight, rectanglePrediction, rectangleY, setRectangle, type RectangleState } from './rectangle'

/* ==========================================================================
   Proportzionaltasuna · 3. DBH — the four tools of this unit: the gear
   wheels, the rectangle that stretches, the map with its scale and the
   recipe with its pantry. Each asks for a prediction before it shows the
   result; the gears and the rectangle can be run with ▶. Every drawing is
   360 wide so that it can be read on a phone. Logic in the .ts files.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'
const GREEN = 'var(--success, #267b53)'
const PAPER = 'var(--card, #fffcf6)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A number with the language's decimal mark: the comma in Basque and Spanish, the point in English and Arabic */
const dec = (value: number, language: UnitLanguage, digits = 2) => {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits)
    return language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))
}
/** A number for LaTeX: {,} for the comma (MathText writes the point in English), the point in Arabic */
const texDec = (value: number, language: UnitLanguage, digits = 2) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'ar' ? '.' : '{,}')
const exact = (value: number) => Math.abs(value - Math.round(value * 100) / 100) < 1e-9
const seeAfter = say('Iragarri lehenik; gero ikusiko duzu emaitza.', 'Primero predice; después verás el resultado.', 'توقّع أولًا، ثم سترى النتيجة.', 'First predict; then you will see the result.')

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

/** The worked result, one line per formula so that none overflows on a phone, and a note */
function Readout({ latex, note }: { latex: string | string[]; note: string }) {
    return (
        <>
            {(Array.isArray(latex) ? latex : [latex]).map((line) => <span key={line} className="fraction-v2-lab-readout-main"><MathText text={`$${line}$`} /></span>)}
            <span className="fraction-v2-lab-readout-note"><MathText text={note} /></span>
        </>
    )
}

function Predict({ language, question, labels, actual, choice, tip, onChoose, children }: {
    language: UnitLanguage
    question: LocalizedText
    labels: Record<Prediction, LocalizedText>
    actual: Prediction
    choice: Prediction | null
    tip: LocalizedText
    onChoose: (prediction: Prediction) => void
    children: ReactNode
}) {
    return <PredictionStep language={language} question={question} labels={labels} actual={actual} choice={choice} tip={tip} wait={seeAfter} onChoose={onChoose}>{children}</PredictionStep>
}

function PlayButton({ label, disabled, playing, onPlay }: { label: string; disabled: boolean; playing: boolean; onPlay: () => void }) {
    return (
        <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <button type="button" onClick={onPlay} disabled={disabled || playing}>{`▶ ${label}`}</button>
        </div>
    )
}

/** «irin» as a row label: «Irin» */
const capitalised = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const Hidden = ({ x, y, size = 26 }: { x: number; y: number; size?: number }) => <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={MUTED} opacity={0.65}>?</text>

/* ---------- L1. Gear wheels ---------- */

/** Pixels of radius per tooth: the teeth are the same size on both wheels, and the pair fills the board */
const gearScale = (teethA: number, teethB: number) => Math.min(3, 320 / (2 * (teethA + teethB)), 84 / Math.max(teethA, teethB))

export function GearsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const language = props.language
    const [state, setState] = useState<GearsState>(initialGearsState)
    const rpmB = gearsRpmB(state)
    const shown = state.prediction !== null
    // Six seconds of the gears turning, a tenth of a minute
    const playback = usePlayback(`${state.teethA}-${state.teethB}-${state.rpmA}`, 6000)
    const turnsA = playback.progress === null ? 0 : (playback.progress * state.rpmA) / 10
    const turnsB = (turnsA * state.teethA) / state.teethB
    const scale = gearScale(state.teethA, state.teethB)
    const rA = state.teethA * scale
    const rB = state.teethB * scale
    const depthA = Math.min(9, rA * 0.22)
    const gap = Math.max(depthA, Math.min(9, rB * 0.22))
    const width = 2 * rA + 2 * rB + gap
    const cxA = 180 - width / 2 + rA
    const cxB = cxA + rA + rB + gap
    const cy = 98
    const controls = (
        <>
            <Stepper label={l(say('A gurpilaren hortzak', 'Dientes de la rueda A', 'أسنان العجلة A', 'Teeth on wheel A'))} value={state.teethA} min={GEAR_LIMITS.teeth.min} max={GEAR_LIMITS.teeth.max} step={GEAR_LIMITS.teeth.step} onChange={(teethA) => setState((s) => setGears(s, { teethA }))} language={language} />
            <Stepper label={l(say('B gurpilaren hortzak', 'Dientes de la rueda B', 'أسنان العجلة B', 'Teeth on wheel B'))} value={state.teethB} min={GEAR_LIMITS.teeth.min} max={GEAR_LIMITS.teeth.max} step={GEAR_LIMITS.teeth.step} onChange={(teethB) => setState((s) => setGears(s, { teethB }))} language={language} />
            <Stepper label={l(say('A-ren birak minutuko', 'Vueltas de A por minuto', 'دورات A في الدقيقة', 'Turns of A per minute'))} value={state.rpmA} min={GEAR_LIMITS.rpm.min} max={GEAR_LIMITS.rpm.max} step={GEAR_LIMITS.rpm.step} onChange={(rpmA) => setState((s) => setGears(s, { rpmA }))} language={language} />
        </>
    )
    const perMinute = gearsTeethPerMinute(state)
    const rpmText = exact(rpmB) ? `=${texDec(rpmB, language)}` : `\\approx ${texDec(rpmB, language)}`
    const latex = [`${state.teethA}\\cdot ${state.rpmA}=${state.teethB}\\cdot x`, `x=\\frac{${perMinute}}{${state.teethB}}${rpmText}`]
    const note = l(say(
        `Minutuko ${perMinute} hortz igarotzen dira bi gurpiletan. Hortz gutxiago dituen gurpilak bira gehiago egiten ditu.`,
        `Por el punto de contacto pasan ${perMinute} dientes por minuto en las dos ruedas. La rueda con menos dientes da más vueltas.`,
        `يمر في نقطة التماس ${perMinute} سنًّا في الدقيقة في العجلتين. العجلة ذات الأسنان الأقل تدور أكثر.`,
        `${perMinute} teeth pass the contact point every minute on both wheels. The wheel with fewer teeth turns more times.`
    ))
    const readout = (
        <Predict
            language={language}
            question={say('Emaitza ikusi aurretik: B gurpilak A-k baino azkarrago egingo du bira?', 'Antes de ver el resultado: ¿la rueda B girará más rápido que la A?', 'قبل رؤية النتيجة: هل تدور العجلة B أسرع من A؟', 'Before you see the result: will wheel B turn faster than wheel A?')}
            labels={{ '<': say('Mantsoago', 'Más despacio', 'أبطأ', 'More slowly'), '=': say('Berdin', 'Igual', 'بالسرعة نفسها', 'Just as fast'), '>': say('Azkarrago', 'Más rápido', 'أسرع', 'Faster') }}
            actual={gearsPrediction(state)}
            choice={state.prediction}
            tip={say(
                `Hortzak eta birak alderantziz proportzionalak dira: B-k ${state.teethB} hortz ditu eta A-k ${state.teethA}.`,
                `Dientes y vueltas son inversamente proporcionales: B tiene ${state.teethB} dientes y A tiene ${state.teethA}.`,
                `الأسنان والدورات متناسبة عكسيًا: لـ B عدد ${state.teethB} من الأسنان ولـ A عدد ${state.teethA}.`,
                `Teeth and turns are inversely proportional: B has ${state.teethB} teeth and A has ${state.teethA}.`
            )}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={latex} note={note} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gearsChallenges} extraChallenges={gearsExtra} state={state}>
            <Board height={232} label={l(say(`A gurpila, ${state.teethA} hortz, eta B gurpila, ${state.teethB} hortz`, `Rueda A de ${state.teethA} dientes y rueda B de ${state.teethB}`, `العجلة A لها ${state.teethA} سنًّا والعجلة B لها ${state.teethB}`, `Wheel A with ${state.teethA} teeth and wheel B with ${state.teethB}`))}>
                <Gear cx={cxA} cy={cy} radius={rA} teeth={state.teethA} angle={turnsA * 360} color={STAGE} tint={STAGE_TINT} />
                <Gear cx={cxB} cy={cy} radius={rB} teeth={state.teethB} angle={180 / state.teethB - turnsB * 360} color={SECOND} tint={SECOND_TINT} />
                <text x={cxA} y={cy + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>A</text>
                <text x={cxB} y={cy + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>B</text>
                <Label x={90} y={206} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{`A: ${state.rpmA} ${l(say('bira/min', 'vueltas/min', 'دورة/د', 'turns/min'))}`}</Label>
                {shown
                    ? <Label x={270} y={206} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{`B: ${dec(rpmB, language)} ${l(say('bira/min', 'vueltas/min', 'دورة/د', 'turns/min'))}`}</Label>
                    : <Hidden x={270} y={210} size={20} />}
                {playback.progress !== null && (
                    <Label x={180} y={226} textAnchor="middle" fontSize={13} fill={MUTED}>{l(say(`6 s: A ${dec(turnsA, language, 1)} bira · B ${dec(turnsB, language, 1)} bira`, `6 s: A ${dec(turnsA, language, 1)} vueltas · B ${dec(turnsB, language, 1)} vueltas`, `6 ث: A ${dec(turnsA, language, 1)} دورة · B ${dec(turnsB, language, 1)} دورة`, `6 s: A ${dec(turnsA, language, 1)} turns · B ${dec(turnsB, language, 1)} turns`))}</Label>
                )}
            </Board>
            <PlayButton label={l(say('Biratu 6 segundoz', 'Girar 6 segundos', 'أدِرها 6 ثوانٍ', 'Turn for 6 seconds'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The rectangle that stretches ---------- */

const PLOT = { left: 40, right: 340, top: 96, bottom: 286 }

export function RectangleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const language = props.language
    const [state, setState] = useState<RectangleState>(initialRectangleState)
    const inverse = state.mode === 'inverse'
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.mode}-${state.k}`, 3500)
    // While ▶ runs the base sweeps from 1 to 12; otherwise it is the learner's own
    const base = playback.progress === null ? rectangleBase(state) : 1 + playback.progress * 11
    const y = inverse ? state.k / base : state.k * base
    const yMax = inverse ? state.k : 12 * state.k
    const px = (x: number) => PLOT.left + (x / 12) * (PLOT.right - PLOT.left)
    const py = (value: number) => PLOT.bottom - (value / yMax) * (PLOT.bottom - PLOT.top)
    const curve = inverse
        ? Array.from({ length: 45 }, (_, i) => { const x = 1 + (i / 44) * 11; return `${i === 0 ? 'M' : 'L'}${px(x).toFixed(1)} ${py(state.k / x).toFixed(1)}` }).join(' ')
        : `M${px(0)} ${py(0)} L${px(12)} ${py(12 * state.k)}`
    const controls = (
        <>
            <Segmented label={l(say('Zer da finkoa?', '¿Qué queda fijo?', 'ما الثابت؟', 'What stays fixed?'))} value={state.mode} options={[{ value: 'inverse', label: l(say('Azalera', 'El área', 'المساحة', 'The area')) }, { value: 'direct', label: l(say('Altuera', 'La altura', 'الارتفاع', 'The height')) }]} onChange={(mode) => setState((s) => setRectangle(s, { mode }))} />
            <Stepper label={inverse ? l(say('Azalera k', 'Área k', 'المساحة k', 'Area k')) : l(say('Altuera k', 'Altura k', 'الارتفاع k', 'Height k'))} value={state.k} min={RECTANGLE_LIMITS.k.min} max={inverse ? RECTANGLE_LIMITS.k.max : 6} onChange={(k) => setState((s) => setRectangle(s, { k }))} language={language} />
            <Stepper label={l(say('Oinarria x', 'Base x', 'القاعدة x', 'Base x'))} value={state.halves} min={RECTANGLE_LIMITS.halves.min} max={RECTANGLE_LIMITS.halves.max} format={(halves) => dec(halves / 2, language)} onChange={(halves) => setState((s) => setRectangle(s, { halves }))} language={language} />
        </>
    )
    const x0 = rectangleBase(state)
    const y0 = rectangleY(state)
    const yText = exact(y0) ? `=${texDec(y0, language)}` : `\\approx ${texDec(y0, language)}`
    const latex = inverse
        ? `x\\cdot y=${state.k}\\ \\to\\ y=\\frac{${state.k}}{${texDec(x0, language)}}${yText}`
        : `y=${state.k}\\cdot x=${state.k}\\cdot ${texDec(x0, language)}${yText}`
    const note = inverse
        ? l(say('Oinarria bikoiztean, altuera erdira jaisten da: puntuak hiperbola bat marrazten du.', 'Al doblar la base, la altura se queda en la mitad: los puntos dibujan una hipérbola.', 'إذا تضاعفت القاعدة صار الارتفاع نصفه: ترسم النقاط قطعًا زائدًا.', 'When the base doubles, the height halves: the points draw a hyperbola.'))
        : l(say('Oinarria bikoiztean, azalera ere bikoizten da: puntuak jatorritik pasatzen den zuzen batean daude.', 'Al doblar la base, el área también se dobla: los puntos están en una recta que pasa por el origen.', 'إذا تضاعفت القاعدة تضاعفت المساحة: النقاط على مستقيم يمر بالأصل.', 'When the base doubles, the area doubles too: the points lie on a line through the origin.'))
    const readout = (
        <Predict
            language={language}
            question={inverse
                ? say('Azalera finkoa da. Oinarria bikoizten bada, altuera…', 'El área es fija. Si la base se duplica, la altura…', 'المساحة ثابتة. إذا تضاعفت القاعدة فإن الارتفاع…', 'The area is fixed. If the base doubles, the height…')
                : say('Altuera finkoa da. Oinarria bikoizten bada, azalera…', 'La altura es fija. Si la base se duplica, el área…', 'الارتفاع ثابت. إذا تضاعفت القاعدة فإن المساحة…', 'The height is fixed. If the base doubles, the area…')}
            labels={{ '<': say('erdira jaisten da', 'se queda en la mitad', 'تصير نصفها', 'halves'), '=': say('ez da aldatzen', 'no cambia', 'لا تتغير', 'stays the same'), '>': say('bikoizten da', 'se duplica', 'تتضاعف', 'doubles') }}
            actual={rectanglePrediction(state)}
            choice={state.prediction}
            tip={inverse
                ? say('Azalera finkoa denean, oinarria eta altuera alderantziz proportzionalak dira.', 'Con el área fija, base y altura son inversamente proporcionales.', 'عند ثبات المساحة تتناسب القاعدة والارتفاع عكسيًا.', 'With a fixed area, base and height are inversely proportional.')
                : say('Altuera finkoa denean, azalera eta oinarria zuzenki proportzionalak dira.', 'Con la altura fija, el área y la base son directamente proporcionales.', 'عند ثبات الارتفاع تتناسب المساحة والقاعدة طرديًا.', 'With a fixed height, the area and the base are directly proportional.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={latex} note={note} />
        </Predict>
    )
    const ticks = [0, 2, 4, 6, 8, 10, 12]
    // Whole-number ticks, so that every label sits where it says
    const yStep = Math.ceil(yMax / 4)
    const yTicks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep)
    // Direct: the rectangle itself is drawn above the graph, 10 px per unit
    const strip = !inverse && (
        <g>
            <rect x={PLOT.left} y={78 - rectangleHeight({ ...state, halves: Math.round(base * 2) }) * 10} width={base * 10} height={state.k * 10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <Label x={PLOT.left + base * 10 + 8} y={74} fontSize={14} fill={STAGE}>{`${dec(base, language, 1)} · ${state.k}`}</Label>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rectangleChallenges} extraChallenges={rectangleExtra} state={state}>
            <Board height={312} label={l(inverse ? say(`Azalera ${state.k} duten laukizuzenak`, `Rectángulos de área ${state.k}`, `مستطيلات مساحتها ${state.k}`, `Rectangles with area ${state.k}`) : say(`Altuera ${state.k} duten laukizuzenak`, `Rectángulos de altura ${state.k}`, `مستطيلات ارتفاعها ${state.k}`, `Rectangles with height ${state.k}`))}>
                {inverse && <Label x={20} y={24} fontSize={15} fontWeight={700} fill={STAGE}>{l(say(`Azalera beti ${state.k}`, `Área siempre ${state.k}`, `المساحة دائمًا ${state.k}`, `Area always ${state.k}`))}</Label>}
                {strip}
                {inverse && <rect x={px(0)} y={py(y)} width={px(base) - px(0)} height={py(0) - py(y)} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} opacity={0.85} />}
                <line x1={PLOT.left} x2={PLOT.right + 6} y1={PLOT.bottom} y2={PLOT.bottom} stroke={INK} strokeWidth={1.6} />
                <line x1={PLOT.left} x2={PLOT.left} y1={PLOT.bottom} y2={PLOT.top - 8} stroke={INK} strokeWidth={1.6} />
                {ticks.map((tick) => <text key={tick} x={px(tick)} y={PLOT.bottom + 17} textAnchor="middle" fontSize={13} fill={MUTED}>{tick}</text>)}
                {yTicks.map((tick) => <text key={tick} x={PLOT.left - 6} y={py(tick) + 5} textAnchor="end" fontSize={13} fill={MUTED}>{tick}</text>)}
                <text x={PLOT.right + 10} y={PLOT.bottom + 4} fontSize={14} fill={MUTED}>x</text>
                <text x={PLOT.left + 8} y={PLOT.top - 6} fontSize={14} fill={MUTED}>y</text>
                {shown && <path d={curve} fill="none" stroke={inverse ? SECOND : GREEN} strokeWidth={2.4} strokeDasharray={playback.progress === null ? undefined : '5 5'} />}
                <circle cx={px(base)} cy={py(y)} r={6} fill={SECOND} stroke={INK} strokeWidth={1.5} />
                {shown
                    ? <Label x={Math.min(px(base) + 10, 300)} y={Math.max(py(y) - 10, PLOT.top + 4)} fontSize={14} fontWeight={700} fill={SECOND}>{`(${dec(base, language, 1)}, ${dec(y, language, 1)})`}</Label>
                    : <Hidden x={Math.min(px(base) + 18, 330)} y={Math.max(py(y) - 6, PLOT.top + 10)} size={20} />}
            </Board>
            <PlayButton label={l(say('Luzatu oinarria', 'Estirar la base', 'مدّ القاعدة', 'Stretch the base'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The map and its scale ---------- */

const CM = 24

export function MapTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const language = props.language
    const [state, setState] = useState<MapState>(initialMapState)
    const shown = state.prediction !== null
    const n = MAP_SCALES[state.scale]
    const cm = mapCentimetres(state)
    const realCm = mapRealCentimetres(state)
    const metres = mapRealMetres(state)
    const scaleText = (value: number) => (language === 'en' ? value.toLocaleString('en-GB') : String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
    const controls = (
        <>
            <Segmented label={l(say('Eskala', 'Escala', 'المقياس', 'Scale'))} value={String(state.scale)} options={MAP_SCALES.map((scale, index) => ({ value: String(index), label: `1:${scaleText(scale)}` }))} onChange={(scale) => setState((s) => setMap(s, { scale: Number(scale) }))} />
            <Stepper label={l(say('Mapako distantzia (cm)', 'Distancia en el mapa (cm)', 'المسافة على الخريطة (سم)', 'Distance on the map (cm)'))} value={state.halves} min={MAP_HALVES.min} max={MAP_HALVES.max} format={(halves) => dec(halves / 2, language)} onChange={(halves) => setState((s) => setMap(s, { halves }))} language={language} />
        </>
    )
    const km = metres >= 1000 ? `=${texDec(metres / 1000, language, 3)}\\ \\mathrm{km}` : ''
    const latex = [`${texDec(cm, language)}\\cdot ${groupedLatex(n)}=${groupedLatex(realCm)}\\ \\mathrm{cm}`, `${groupedLatex(realCm)}\\ \\mathrm{cm}=${groupedLatex(metres)}\\ \\mathrm{m}${km}`]
    const note = l(say(
        'Eskalak ez du unitatea aldatzen: emaitza cm-tan dago. 100 cm = 1 m eta 1000 m = 1 km.',
        'La escala no cambia la unidad: el resultado sale en cm. 100 cm = 1 m y 1000 m = 1 km.',
        'المقياس لا يغيّر الوحدة: النتيجة بالسنتيمتر. 100 سم = 1 م و1000 م = 1 كم.',
        'The scale does not change the unit: the result comes out in cm. 100 cm = 1 m and 1,000 m = 1 km.'
    ))
    const readout = (
        <Predict
            language={language}
            question={say('Emaitza ikusi aurretik: benetako distantzia 1 km baino gehiago da?', 'Antes de ver el resultado: ¿la distancia real es de más de 1 km?', 'قبل رؤية النتيجة: هل المسافة الحقيقية أكثر من 1 كم؟', 'Before you see the result: is the real distance more than 1 km?')}
            labels={{ '<': say('1 km baino gutxiago', 'Menos de 1 km', 'أقل من 1 كم', 'Less than 1 km'), '=': say('1 km justu', '1 km justo', '1 كم تمامًا', 'Exactly 1 km'), '>': say('1 km baino gehiago', 'Más de 1 km', 'أكثر من 1 كم', 'More than 1 km') }}
            actual={mapPrediction(state)}
            choice={state.prediction}
            tip={say(
                `1 km = 100 000 cm. Mapako cm bakoitzak ${scaleText(n)} cm balio ditu.`,
                `1 km = 100 000 cm. Cada cm del mapa vale ${scaleText(n)} cm.`,
                `1 كم = 100000 سم. وكل سنتيمتر على الخريطة يساوي ${n} سم.`,
                `1 km = 100,000 cm. Each cm on the map is worth ${scaleText(n)} cm.`
            )}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={latex} note={note} />
        </Predict>
    )
    const startX = 30
    const endX = startX + cm * CM
    const realText = metres >= 1000 ? `${dec(metres / 1000, language, 3)} km` : `${metres} m`
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mapChallenges} extraChallenges={mapExtra} state={state}>
            <Board height={236} label={l(say(`Mapa, 1:${scaleText(n)} eskala, ${dec(cm, language)} cm`, `Mapa a escala 1:${scaleText(n)}, ${dec(cm, language)} cm`, `خريطة بمقياس 1:${n}، ${dec(cm, language)} سم`, `Map at a scale of 1:${scaleText(n)}, ${dec(cm, language)} cm`))}>
                <rect x={10} y={10} width={340} height={150} rx={10} fill="#e8f1df" stroke={INK} strokeWidth={1.6} />
                <path d="M10 46 C 70 70, 120 20, 190 52 S 300 90, 350 64" fill="none" stroke="#7fb3e0" strokeWidth={9} strokeLinecap="round" opacity={0.8} />
                <path d="M110 150 l14 -26 l14 26 z M160 150 l18 -34 l18 34 z" fill="#cfd9c1" stroke={MUTED} strokeWidth={1.2} />
                <circle cx={startX} cy={104} r={9} fill={STAGE} stroke={INK} strokeWidth={1.5} />
                <circle cx={endX} cy={104} r={9} fill={SECOND} stroke={INK} strokeWidth={1.5} />
                {/* The ruler: one tick per half centimetre */}
                <rect x={startX} y={114} width={Math.max(cm * CM, 1)} height={16} fill={PAPER} stroke={INK} strokeWidth={1.2} opacity={0.95} />
                {Array.from({ length: state.halves + 1 }, (_, i) => <line key={i} x1={startX + (i * CM) / 2} x2={startX + (i * CM) / 2} y1={114} y2={i % 2 === 0 ? 126 : 120} stroke={INK} strokeWidth={1} />)}
                <text x={Math.max((startX + endX) / 2, 44)} y={86} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{`${dec(cm, language)} cm`}</text>
                <text x={340} y={152} textAnchor="end" fontSize={15} fontWeight={700} fill={INK}>{`1 : ${scaleText(n)}`}</text>
                <Label x={180} y={188} textAnchor="middle" fontSize={15} fill={MUTED}>{l(say('Benetan:', 'En la realidad:', 'في الحقيقة:', 'In real life:'))}</Label>
                {shown
                    ? <text x={180} y={216} textAnchor="middle" fontSize={22} fontWeight={700} fill={metres > 1000 ? SECOND : metres === 1000 ? GREEN : STAGE}>{realText}</text>
                    : <Hidden x={180} y={218} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. The recipe and the pantry ---------- */

export function RecipeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const language = props.language
    const [state, setState] = useState<RecipeState>(initialRecipeState)
    const shown = state.prediction !== null
    const limit = recipeLimit(state.pantry)
    const controls = (
        <>
            <Stepper label={l(say('Lagunak', 'Personas', 'الأشخاص', 'People'))} value={state.people} min={PEOPLE_LIMITS.min} max={PEOPLE_LIMITS.max} onChange={(people) => setState((s) => setRecipe(s, { people }))} language={language} />
            <Segmented label={l(say('Despentsa', 'Despensa', 'المخزن', 'Pantry'))} value={String(state.pantry)} options={PANTRIES.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(pantry) => setState((s) => setRecipe(s, { pantry: Number(pantry) }))} />
        </>
    )
    const stock = PANTRIES[state.pantry][limit.ingredient.id]
    const latex = `\\frac{${stock}\\cdot 4}{${limit.ingredient.forFour}}${exact(peopleWith(limit.ingredient, state.pantry)) ? '=' : '\\approx '}${texDec(peopleWith(limit.ingredient, state.pantry), language, 1)}`
    const note = l(say(
        `Lehenik amaitzen dena: ${limit.ingredient.name.eu}. Gehienez ${limit.people} lagunentzat.`,
        `Lo primero que se acaba: ${limit.ingredient.name.es}. Como mucho, para ${limit.people} personas.`,
        `أول ما ينفد: ${limit.ingredient.name.ar}. لعدد ${limit.people} أشخاص على الأكثر.`,
        `The first thing to run out: ${limit.ingredient.name.en}. For ${limit.people} people at most.`
    ))
    const readout = (
        <Predict
            language={language}
            question={say(`Emaitza ikusi aurretik: despentsa nahikoa da ${state.people} lagunentzat?`, `Antes de ver el resultado: ¿llega la despensa para ${state.people} personas?`, `قبل رؤية النتيجة: هل يكفي المخزن ${state.people} أشخاص؟`, `Before you see the result: is the pantry enough for ${state.people} people?`)}
            labels={{ '<': say('Zerbait falta da', 'Falta algo', 'ينقص شيء', 'Something runs short'), '=': say('Justu-justu', 'Justo', 'بالضبط', 'Just enough'), '>': say('Soberan dago', 'Sobra', 'يزيد', 'There is some left over') }}
            actual={recipePrediction(state)}
            choice={state.prediction}
            tip={say(
                'Osagai bakoitza lagun kopuruarekiko zuzenki proportzionala da, baina bakoitzak bere konstantea du: lehenik amaitzen denak erabakitzen du.',
                'Cada ingrediente es directamente proporcional a las personas, pero con su propia constante: decide el que se acaba primero.',
                'كل مكوّن يتناسب طرديًا مع عدد الأشخاص لكن بثابته الخاص: يقرّر المكوّن الذي ينفد أولًا.',
                'Each ingredient is directly proportional to the number of people, but with its own constant: the one that runs out first decides.'
            )}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={latex} note={note} />
        </Predict>
    )
    const barX = 98
    const barWidth = 170
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={recipeChallenges} extraChallenges={recipeExtra} state={state}>
            <Board height={262} label={l(say(`Bizkotxoa ${state.people} lagunentzat`, `Bizcocho para ${state.people} personas`, `كعكة لعدد ${state.people} أشخاص`, `Sponge cake for ${state.people} people`))}>
                <Label x={180} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{l(say(`Bizkotxoa ${state.people} lagunentzat`, `Bizcocho para ${state.people} personas`, `كعكة لعدد ${state.people} أشخاص`, `Sponge cake for ${state.people} people`))}</Label>
                {INGREDIENTS.map((ingredient, row) => {
                    const y = 50 + row * 52
                    const need = amountFor(ingredient, state.people)
                    const have = PANTRIES[state.pantry][ingredient.id]
                    const fill = Math.min(need / have, 1.45) * barWidth
                    const short = need > have + 1e-9
                    return (
                        <g key={ingredient.id}>
                            <Label x={12} y={y + 15} fontSize={14} fontWeight={700} fill={INK}>{capitalised(l(ingredient.name))}</Label>
                            <rect x={barX} y={y} width={barWidth} height={20} fill={PAPER} stroke={INK} strokeWidth={1.4} />
                            {shown && <rect x={barX} y={y} width={Math.min(fill, barWidth)} height={20} fill={short ? SECOND_TINT : STAGE_TINT} stroke={short ? SECOND : STAGE} strokeWidth={1.4} />}
                            {shown && short && <rect x={barX + barWidth} y={y} width={fill - barWidth} height={20} fill={SECOND} opacity={0.75} />}
                            <text x={barX} y={y + 38} fontSize={13} fontWeight={700} fill={short ? SECOND : STAGE}>{shown ? `${dec(need, language, 1)}${ingredient.unit ? ` ${ingredient.unit}` : ''}` : '?'}</text>
                            <text x={barX + barWidth} y={y + 38} textAnchor="end" fontSize={13} fill={MUTED}>{`/ ${have}${ingredient.unit ? ` ${ingredient.unit}` : ''}`}</text>
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}
