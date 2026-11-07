import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Label, Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { applyGauss, GAUSS_LIMITS, GAUSS_NAMES, gaussChallenges, gaussExtra, gaussPrediction, gaussSolution, gaussVerdict, initialGaussState, isTriangular, loadGaussSystem, operationLatex, pivotLeft, previewRow, rowLatex, setGauss, swapGauss, type GaussState } from './gaussMachine'
import { criticalA, initialParameterState, PARAMETER_LIMITS, PARAMETER_SYSTEMS, parameterChallenges, parameterExtra, parameterKind, parameterPrediction, parameterSolution, parameterSystemLatex, reducedLatex, setParameter, type ParameterState } from './parameterSlider'
import { checkLatex, equationText, FAMILIES, FAMILY_BOX, familyChallenges, familyExtra, familyLatex, familyPoint, familyPrediction, initialFamilyState, lambdaRange, setFamily, type FamilyState } from './solutionFamily'

/* ==========================================================================
   Ekuazio-sistemak · Batxilergoa 1 · Zientziak — the three tools of this
   unit: the Gauss machine (row operations on an augmented matrix), the
   parameter slider (a and b turn two lines from crossing to parallel or
   to the same line) and the family of solutions (λ slides a solution
   along a straight line). Each asks for a prediction before it shows the
   result; the family moves with ▶. Logic in gaussMachine.ts,
   parameterSlider.ts and solutionFamily.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A fraction in LaTeX: 3, -\\frac{1}{2} */
const texFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
/** A fraction as plain text for the drawing: 3, −1/2 */
const plainFraction = (value: FractionValue) => (value.denominator === 1 ? minus(value.numerator) : `${value.numerator < 0 ? '−' : ''}${Math.abs(value.numerator)}/${value.denominator}`)

function QuickButtons({ buttons }: { buttons: Array<{ label: string; disabled?: boolean; onClick: () => void }> }) {
    return (
        <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            {buttons.map((button) => <button key={button.label} type="button" disabled={button.disabled} onClick={button.onClick}>{button.label}</button>)}
        </div>
    )
}

/* ---------- L1. The Gauss machine ---------- */

const verdictText = (state: GaussState): LocalizedText | null => {
    if (!isTriangular(state.rows)) return null
    const verdict = gaussVerdict(state.rows)
    if (verdict === 'none') return say('Mailakatuta: bateraezina, soluziorik ez.', 'Escalonado: incompatible, sin solución.', 'درجي: غير متوافق، لا حل.', 'Triangular: inconsistent, no solution.')
    if (verdict === 'infinite') return say('Mailakatuta: bateragarri indeterminatua, infinitu soluzio.', 'Escalonado: compatible indeterminado, infinitas soluciones.', 'درجي: متوافق غير محدد، ما لا نهاية من الحلول.', 'Triangular: consistent and dependent, infinitely many solutions.')
    const solution = gaussSolution(state.rows)!
    const point = `(${solution.map(plainFraction).join(', ')})`
    return say(`Mailakatuta: soluzio bat, ${point}.`, `Escalonado: una solución, ${point}.`, `درجي: حل واحد ${point}.`, `Triangular: one solution, ${point}.`)
}

export function GaussMachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GaussState>(initialGaussState)
    const shown = state.prediction !== null
    const preview = previewRow(state)
    const left = pivotLeft(state)
    const column = state.source === 0 ? 'x' : 'y'
    const X = (index: number) => 92 + index * 56 + (index === 3 ? 18 : 0)
    const rowY = (index: number) => 62 + index * 40
    const verdict = verdictText(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.system)} options={GAUSS_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(system) => setState((s) => loadGaussSystem(s, Number(system)))} />
            <Segmented<string> label={l(say('Aldatzen dena', 'Cambia', 'يتغيّر', 'Changes'))} value={String(state.target)} options={[{ value: '1', label: 'E2' }, { value: '2', label: 'E3' }]} onChange={(target) => setState((s) => setGauss(s, { target: Number(target) as 1 | 2 }))} />
            <Segmented<string> label={l(say('Erabiltzen dena', 'Usa', 'يستعمل', 'Uses'))} value={String(state.source)} options={state.target === 1 ? [{ value: '0', label: 'E1' }] : [{ value: '0', label: 'E1' }, { value: '1', label: 'E2' }]} onChange={(source) => setState((s) => setGauss(s, { source: Number(source) as 0 | 1 }))} />
            <Stepper label="m" value={state.m} min={GAUSS_LIMITS.m.min} max={GAUSS_LIMITS.m.max} onChange={(m) => setState((s) => setGauss(s, { m }))} language={props.language} />
            <Stepper label="k" value={state.k} min={GAUSS_LIMITS.k.min} max={GAUSS_LIMITS.k.max} onChange={(k) => setState((s) => setGauss(s, { k }))} language={props.language} />
        </>
    )
    const op = operationLatex(state)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${op}$ eginda, zer geratzen da $${column}$ zutabean?`, `Antes de verlo: con $${op}$, ¿qué queda en la columna de $${column}$?`, `قبل أن ترى: بالعملية $${op}$ ماذا يبقى في عمود $${column}$؟`, `Before you see it: with $${op}$, what is left in the column of $${column}$?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'عدد سالب', 'Negative'), '=': say('0', '0', 'صفر', '0'), '>': say('Positiboa', 'Positivo', 'عدد موجب', 'Positive') }}
            actual={gaussPrediction(state)}
            choice={state.prediction}
            tip={say('m bider aldatzen den errenkadako zenbakia gehi k bider erabiltzen denekoa. 0 izan dadin, biek aurkakoak izan behar dute.', 'm por el número de la fila que cambia más k por el de la fila que usa. Para que dé 0, los dos productos tienen que ser opuestos.', 'm ضرب عدد الصف الذي يتغيّر زائد k ضرب عدد الصف المستعمل. ليكون الناتج صفرًا يجب أن يكون الجداءان متعاكسين.', 'm times the number of the changing row plus k times that of the row used. For 0, the two products must be opposites.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${op}\\ \\to\\ ${rowLatex(preview)}`]}
                note={l(left === 0
                    ? say('Zero bat: aplikatu eragiketa.', 'Un cero: aplica la operación.', 'صفر: طبّق العملية.', 'A zero: apply the operation.')
                    : say('Ez da 0: aldatu m edo k, edo aplikatu hala ere.', 'No es 0: cambia m o k, o aplícala de todos modos.', 'ليس صفرًا: غيّر m أو k، أو طبّقها على أي حال.', 'It is not 0: change m or k, or apply it anyway.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gaussChallenges} extraChallenges={gaussExtra} state={state}>
            <Board height={verdict ? 274 : 246} label={l(say(`${GAUSS_NAMES[state.system]} sistemaren matrize zabaldua`, `Matriz ampliada del sistema ${GAUSS_NAMES[state.system]}`, `المصفوفة الموسعة للنظام ${GAUSS_NAMES[state.system]}`, `Augmented matrix of system ${GAUSS_NAMES[state.system]}`))}>
                {['x', 'y', 'z'].map((name, index) => <text key={name} x={X(index)} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED} fontStyle="italic">{name}</text>)}
                <line x1={X(2) + 33} x2={X(2) + 33} y1={40} y2={rowY(2) + 16} stroke={INK} strokeWidth={1.6} />
                {state.rows.map((row, index) => {
                    const role = index === state.target ? 'target' : index === state.source ? 'source' : null
                    return (
                        <g key={index}>
                            {role && <rect x={46} y={rowY(index) - 20} width={300} height={32} rx={8} fill={role === 'target' ? MUSTARD_TINT : STAGE_TINT} />}
                            <text x={26} y={rowY(index) + 2} textAnchor="middle" fontSize={14} fontWeight={700} fill={role === 'target' ? SECOND : role === 'source' ? STAGE : INK}>{`E${index + 1}`}</text>
                            {row.map((value, c) => {
                                const zero = value === 0 && c < 3 && c < index
                                return <text key={c} x={X(c)} y={rowY(index) + 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={zero ? GREEN : c === 3 ? SECOND : INK}>{minus(value)}</text>
                            })}
                        </g>
                    )
                })}
                <line x1={20} x2={340} y1={rowY(2) + 24} y2={rowY(2) + 24} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                <text x={26} y={rowY(3) + 14} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{`E${state.target + 1}′`}</text>
                {preview.map((value, c) => {
                    const pivot = c === state.source
                    if (!shown) return pivot ? <Hidden key={c} x={X(c)} y={rowY(3) + 18} size={22} /> : <text key={c} x={X(c)} y={rowY(3) + 14} textAnchor="middle" fontSize={17} fill={MUTED} opacity={0.5}>·</text>
                    return (
                        <g key={c}>
                            {pivot && <rect x={X(c) - 22} y={rowY(3) - 8} width={44} height={30} rx={8} fill={value === 0 ? GREEN_TINT : SECOND_TINT} stroke={value === 0 ? GREEN : SECOND} strokeWidth={1.6} />}
                            <text x={X(c)} y={rowY(3) + 14} textAnchor="middle" fontSize={17} fontWeight={700} fill={pivot ? (value === 0 ? GREEN : SECOND) : INK}>{minus(value)}</text>
                        </g>
                    )
                })}
                <text x={180} y={rowY(3) + 46} textAnchor="middle" fontSize={13} fill={MUTED} direction="ltr">{`${state.m === 1 ? '' : state.m}E${state.target + 1} ${state.k < 0 ? '−' : '+'} ${Math.abs(state.k) === 1 ? '' : Math.abs(state.k)}E${state.source + 1}`}</text>
                {verdict && (
                    <g>
                        <rect x={20} y={rowY(3) + 56} width={320} height={34} rx={10} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />
                        <Label x={180} y={rowY(3) + 78} textAnchor="middle" fontSize={13} fontWeight={700} fill={GREEN}>{l(verdict)}</Label>
                    </g>
                )}
            </Board>
            <QuickButtons buttons={[{ label: `✓ ${l(say('Aplikatu eragiketa', 'Aplicar la operación', 'طبّق العملية', 'Apply the operation'))}`, disabled: !shown, onClick: () => setState((s) => applyGauss(s)) }]} />
            <QuickButtons buttons={[
                { label: 'E1 ↔ E2', onClick: () => setState((s) => swapGauss(s, 0)) },
                { label: 'E2 ↔ E3', onClick: () => setState((s) => swapGauss(s, 1)) },
                { label: l(say('Hasieratik', 'De nuevo', 'من جديد', 'Start again')), disabled: state.steps === 0, onClick: () => setState((s) => loadGaussSystem(s, s.system)) }
            ]} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0' }}>{l(say(`Eragiketak: ${state.steps}`, `Operaciones: ${state.steps}`, `العمليات: ${state.steps}`, `Operations: ${state.steps}`))}</p>
        </ToolFrame>
    )
}

/* ---------- L2. The parameter slider ---------- */

/** The line ax + by = c across the box, clipped */
function LineOf({ map, a, b, c, color, dashed = false, clip }: { map: PlaneMap; a: number; b: number; c: number; color: string; dashed?: boolean; clip: string }) {
    const { xMin, xMax, yMin, yMax } = map.box
    const points: Array<[number, number]> = b !== 0
        ? [[xMin - 1, (c - a * (xMin - 1)) / b], [xMax + 1, (c - a * (xMax + 1)) / b]]
        : [[c / a, yMin - 1], [c / a, yMax + 1]]
    return <PlanePath map={map} points={points} color={color} width={3.2} dashed={dashed} clip={clip} />
}

export function ParameterSliderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParameterState>(initialParameterState)
    const shown = state.prediction !== null
    const { q, r, s } = PARAMETER_SYSTEMS[state.system]
    const kind = parameterKind(state)
    const solution = parameterSolution(state)
    const [first, second] = parameterSystemLatex(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.system)} options={PARAMETER_SYSTEMS.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(system) => setState((current) => setParameter(current, { system: Number(system) }))} />
            <Stepper label="a" value={state.a} min={PARAMETER_LIMITS.a.min} max={PARAMETER_LIMITS.a.max} onChange={(a) => setState((current) => setParameter(current, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={PARAMETER_LIMITS.b.min} max={PARAMETER_LIMITS.b.max} onChange={(b) => setState((current) => setParameter(current, { b }))} language={props.language} />
        </>
    )
    const verdict = kind === 'one' && solution
        ? say(`Bateragarri determinatua: ebaki-puntua $(${solution.map(texFraction).join(',\\ ')})$ da.`, `Compatible determinado: se cortan en $(${solution.map(texFraction).join(',\\ ')})$.`, `متوافق محدد: يتقاطعان في $(${solution.map(texFraction).join(',\\ ')})$.`, `Consistent and independent: they cross at $(${solution.map(texFraction).join(',\\ ')})$.`)
        : kind === 'none'
            ? say(`$a=${criticalA(state.system)}$ denean, $y$ ezezagunaren koefizientea 0 da: zuzen paraleloak, bateraezina.`, `Con $a=${criticalA(state.system)}$ el coeficiente de $y$ es 0: rectas paralelas, incompatible.`, `مع $a=${criticalA(state.system)}$ يكون معامل $y$ صفرًا: مستقيمان متوازيان، غير متوافق.`, `With $a=${criticalA(state.system)}$ the coefficient of $y$ is 0: parallel lines, inconsistent.`)
            : say('Bi ekuazioek gauza bera diote: zuzen bera, bateragarri indeterminatua.', 'Las dos ecuaciones dicen lo mismo: la misma recta, compatible indeterminado.', 'المعادلتان تقولان الشيء نفسه: المستقيم نفسه، متوافق غير محدد.', 'Both equations say the same thing: the same line, consistent and dependent.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $a=${state.a}$ eta $b=${state.b}$ direla, zenbat soluzio ditu?`, `Antes de verlo: con $a=${state.a}$ y $b=${state.b}$, ¿cuántas soluciones tiene?`, `قبل أن ترى: مع $a=${state.a}$ و$b=${state.b}$ كم حلًّا له؟`, `Before you see it: with $a=${state.a}$ and $b=${state.b}$, how many solutions does it have?`)}
            labels={{ '<': say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), '=': say('Bat', 'Una', 'حل واحد', 'One'), '>': say('Infinitu', 'Infinitas', 'ما لا نهاية', 'Infinitely many') }}
            actual={parameterPrediction(state)}
            choice={state.prediction}
            tip={say(`Egin $E_2-${s}E_1$: $y$ ezezagunaren koefizientea $a-${s * q}$ da. 0 bada, begiratu eskuineko zenbakiari.`, `Haz $E_2-${s}E_1$: el coeficiente de $y$ es $a-${s * q}$. Si es 0, mira el número de la derecha.`, `أجرِ $E_2-${s}E_1$: معامل $y$ هو $a-${s * q}$. وإذا كان صفرًا فانظر إلى العدد في اليمين.`, `Do $E_2-${s}E_1$: the coefficient of $y$ is $a-${s * q}$. If it is 0, look at the number on the right.`)}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={[`${first}\\qquad ${second}`, `E_2-${s}E_1\\ \\to\\ ${reducedLatex(state)}`]} note={l(verdict)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={parameterChallenges} extraChallenges={parameterExtra} state={state}>
            <Plane box={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }} cell={30} label={l(say('Sistemaren bi zuzenak', 'Las dos rectas del sistema', 'مستقيما النظام', 'The two lines of the system'))}>
                {(map, clip) => (
                    <g>
                        <LineOf map={map} a={1} b={q} c={r} color={STAGE} clip={clip} />
                        {shown && <LineOf map={map} a={s} b={state.a} c={state.b} color={SECOND} dashed clip={clip} />}
                        {shown && solution && Math.abs(solution[0].numerator / solution[0].denominator) <= 5 && Math.abs(solution[1].numerator / solution[1].denominator) <= 5 && <PlanePoint map={map} point={[solution[0].numerator / solution[0].denominator, solution[1].numerator / solution[1].denominator]} color={GREEN} radius={7} />}
                        {!shown && <Hidden x={map.x(3)} y={map.y(3.5)} size={34} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- L3. The family of solutions ---------- */

export function SolutionFamilyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FamilyState>(initialFamilyState)
    const shown = state.prediction !== null
    const [min, max] = lambdaRange(state.family)
    const playback = usePlayback(`${state.family}-${state.lambda}`, 2400)
    // While ▶ runs, λ sweeps the whole range; then it goes back to the learner's λ
    const lambda = playback.playing && playback.progress !== null ? min + (max - min) * playback.progress : state.lambda
    const point = familyPoint(state.family, lambda)
    const integerPoint = familyPoint(state.family, state.lambda)
    const family = FAMILIES[state.family]
    const controls = (
        <>
            <Segmented<string> label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.family)} options={FAMILIES.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(value) => setState((s) => setFamily(s, { family: Number(value) }))} />
            <Stepper label="λ" value={state.lambda} min={min} max={max} onChange={(value) => setState((s) => setFamily(s, { lambda: value }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $\\lambda$ handitzean, zer egiten du $y$ koordenatuak?', 'Antes de verlo: cuando $\\lambda$ aumenta, ¿qué hace $y$?', 'قبل أن ترى: عندما يزداد $\\lambda$ ماذا يحدث لـ $y$؟', 'Before you see it: when $\\lambda$ grows, what does $y$ do?')}
            labels={{ '<': say('Txikitu', 'Baja', 'ينقص', 'Goes down'), '=': say('Ez da aldatzen', 'No cambia', 'لا يتغيّر', 'Stays the same'), '>': say('Handitu', 'Sube', 'يزداد', 'Goes up') }}
            actual={familyPrediction(state)}
            choice={state.prediction}
            tip={say('Askatu $y$ bigarren ekuazioan, $z=\\lambda$ dela: $\\lambda$ zenbakiaren aurreko zenbakiak esaten du.', 'Despeja $y$ en la segunda ecuación con $z=\\lambda$: lo dice el número que multiplica a $\\lambda$.', 'اعزل $y$ في المعادلة الثانية مع $z=\\lambda$: العدد الذي يضرب $\\lambda$ يخبرك.', 'Solve the second equation for $y$ with $z=\\lambda$: the number in front of $\\lambda$ tells you.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[familyLatex(state.family), `\\lambda=${state.lambda}\\ \\to\\ (${integerPoint.join(',\\ ')})`, ...family.rows.map((row) => checkLatex(row, integerPoint))]}
                note={l(say('Bi ekuazioak betetzen dira, $\\lambda$ edozein dela.', 'Las dos ecuaciones se cumplen, sea cual sea $\\lambda$.', 'تتحقق المعادلتان أيًّا كانت $\\lambda$.', 'Both equations hold, whatever $\\lambda$ is.'))}
            />
        </Predict>
    )
    const ends = [familyPoint(state.family, min), familyPoint(state.family, max)]
    const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={familyChallenges} extraChallenges={familyExtra} state={state}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 24px', fontWeight: 700, color: INK, direction: 'ltr', margin: '0 0 6px' }}>{family.rows.map((row) => <span key={equationText(row)}>{equationText(row)}</span>)}</div>
            <Plane box={{ xMin: -FAMILY_BOX, xMax: FAMILY_BOX, yMin: -FAMILY_BOX, yMax: FAMILY_BOX }} cell={25} labelStep={2} label={l(say('Soluzioak xy planotik ikusita', 'Las soluciones vistas desde el plano xy', 'الحلول كما تُرى من المستوى xy', 'The solutions seen from the xy-plane'))}>
                {(map, clip) => (
                    <g>
                        {shown && <PlanePath map={map} points={[[ends[0][0], ends[0][1]], [ends[1][0], ends[1][1]]]} color={STAGE} width={3} dashed clip={clip} />}
                        {shown && ticks.map((tick) => {
                            const [x, y] = familyPoint(state.family, tick)
                            return <circle key={tick} cx={map.x(x)} cy={map.y(y)} r={3.5} fill={PAPER} stroke={STAGE} strokeWidth={1.6} />
                        })}
                        <PlanePoint map={map} point={[point[0], point[1]]} color={GREEN} radius={8} name={`z = ${minus(Math.round(point[2] * 10) / 10)}`} dx={10} dy={-10} />
                        {!shown && <Hidden x={map.x(4)} y={map.y(4)} size={34} />}
                    </g>
                )}
            </Plane>
            <PlayButton label={l(say('Mugitu λ', 'Mover λ', 'حرّك λ', 'Move λ'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say(`λ: ${minus(min)} … ${minus(max)}`, `λ: de ${minus(min)} a ${minus(max)}`, `λ: من ${minus(min)} إلى ${minus(max)}`, `λ: from ${minus(min)} to ${minus(max)}`))}</p>
        </ToolFrame>
    )
}
