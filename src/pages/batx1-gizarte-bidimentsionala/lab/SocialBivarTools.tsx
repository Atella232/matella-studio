import { useRef, useState, type PointerEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, say, SECOND, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { initialRelationState, relationChallenges, relationExtra, relationPoints, relationPrediction, relationR, rLatex, RELATION_LIMITS, setRelation, type RelationState } from './relation'
import { estimate, initialReliableState, RELIABLE_LIMITS, RELIABLE_X, reliableChallenges, reliableExtra, reliablePoints, reliablePrediction, reliableR, setReliable, type ReliableState } from './reliable'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the two
   tools of this unit: «functional or statistical?» (ten points around a
   line, with a slope and a noise that the learner sets; ▶ makes the noise
   grow from nothing) and «reliable or not?» (two clouds with the same
   regression line and different r, and an x dragged along the axis to
   estimate). Each asks for a prediction before the result. Logic in
   relation.ts and reliable.ts.
   ========================================================================== */

const minus = (text: string) => text.replace(/^-/, '−')

/* ---------- L1. Functional or statistical? ---------- */

const RX = (value: number) => 30 + (value - 0.5) * 31
const RY = (value: number) => 196 - value * 17

export function RelationTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RelationState>(initialRelationState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.slope}-${state.noise}`, 3000)
    // While ▶ runs, the noise grows from nothing to the learner's own
    const noise = playback.playing && playback.progress !== null ? state.noise * playback.progress : state.noise
    const points = relationPoints({ slope: state.slope, noise })
    const r = relationR({ slope: state.slope, noise })
    const b = state.slope / 2
    const controls = (
        <>
            <Segmented<string> label={l(say('Zuzena', 'Recta', 'المستقيم', 'Line'))} value={String(state.slope)} options={[-2, -1, 0, 1, 2].map((value) => ({ value: String(value), label: value === 0 ? '0' : `${value < 0 ? '−' : '+'}${dec(Math.abs(value) / 2, props.language, 1)}` }))} onChange={(value) => setState((s) => setRelation(s, { slope: Number(value) }))} />
            <Stepper label={l(say('Zarata', 'Ruido', 'التشويش', 'Noise'))} value={state.noise} min={RELATION_LIMITS.noise.min} max={RELATION_LIMITS.noise.max} format={(value) => dec(value / 2, props.language, 1)} onChange={(value) => setState((s) => setRelation(s, { noise: value }))} language={props.language} />
        </>
    )
    const prediction = relationPrediction(state)
    const note = prediction === '='
        ? say('Puntu guztiak zuzenaren gainean: erlazio funtzionala.', 'Todos los puntos sobre la recta: relación funcional.', 'كل النقاط على المستقيم: علاقة دالية.', 'All the points on the line: a functional relation.')
        : prediction === '>'
            ? say('Zuzenetik hurbil: korrelazio sendoa.', 'Pegados a la recta: correlación fuerte.', 'ملتصقة بالمستقيم: ارتباط قوي.', 'Close to the line: a strong correlation.')
            : say('Zuzenetik urrun: korrelazio ahula.', 'Lejos de la recta: correlación débil.', 'بعيدة عن المستقيم: ارتباط ضعيف.', 'Far from the line: a weak correlation.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: nolakoa izango da erlazioa?', 'Antes de verlo: ¿cómo será la relación?', 'قبل أن ترى: كيف ستكون العلاقة؟', 'Before you see it: what will the relation be like?')}
            labels={{ '<': say('Estatistiko ahula', 'Estadística débil', 'إحصائية ضعيفة', 'Weak statistical'), '=': say('Funtzionala', 'Funcional', 'دالية', 'Functional'), '>': say('Estatistiko sendoa', 'Estadística fuerte', 'إحصائية قوية', 'Strong statistical') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Sendoa da $|r|\\ge 0{,}8$ denean. Zaratak puntuak zuzenetik urruntzen ditu; maldak ez du indarra aldatzen, zeinua baizik.', 'Es fuerte cuando $|r|\\ge 0{,}8$. El ruido aleja los puntos de la recta; la pendiente no cambia la fuerza, sino el signo.', 'يكون قويًّا عندما $|r|\\ge 0{,}8$. التشويش يبعد النقاط عن المستقيم، والميل لا يغيّر القوة بل الإشارة.', 'It is strong when $|r|\\ge 0{,}8$. The noise moves the points away from the line; the slope does not change the strength, but the sign.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={[`r\\approx ${rLatex(r)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={relationChallenges} extraChallenges={relationExtra} state={state}>
            <Board height={226} label={l(say('Hamar puntu zuzen baten inguruan', 'Diez puntos alrededor de una recta', 'عشر نقاط حول مستقيم', 'Ten points around a line'))}>
                {[0, 2, 4, 6, 8, 10].map((value) => <line key={`g${value}`} x1={RX(0.5)} x2={RX(10.5)} y1={RY(value)} y2={RY(value)} stroke={MUTED} strokeWidth={0.5} strokeDasharray="3 4" />)}
                <line x1={RX(0.5)} x2={RX(10.5)} y1={RY(0)} y2={RY(0)} stroke={INK} strokeWidth={1.6} />
                <line x1={RX(0.5)} x2={RX(0.5)} y1={RY(0)} y2={RY(10.6)} stroke={INK} strokeWidth={1.6} />
                {[2, 4, 6, 8, 10].map((value) => <text key={`x${value}`} x={RX(value)} y={RY(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>)}
                <line x1={RX(0.5)} x2={RX(10.5)} y1={RY(5 + b * (0.5 - 5.5))} y2={RY(5 + b * (10.5 - 5.5))} stroke={SECOND} strokeWidth={2} strokeDasharray={shown ? undefined : '6 5'} />
                {points.map(([x, y], index) => <circle key={index} cx={RX(x)} cy={RY(Math.max(-0.4, Math.min(10.6, y)))} r={6} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />)}
                {shown && <text x={RX(10.4)} y={RY(10)} textAnchor="end" fontSize={15} fontWeight={700} fill={SECOND}>{`r ≈ ${minus(dec(Math.round(r * 100) / 100, props.language, 2))}`}</text>}
                {!shown && <Hidden x={RX(9.6)} y={RY(9.4)} size={26} />}
            </Board>
            <PlayButton label={l(say('Hazi zarata zerotik', 'Haz crecer el ruido desde cero', 'زِد التشويش من الصفر', 'Grow the noise from zero'))} disabled={!shown || state.noise === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. Reliable or not? ---------- */

const EX = (value: number) => 24 + value * 13.4
const EY = (value: number) => 186 - value * 11
const RELIABLE_HEIGHT = 236

export function ReliableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ReliableState>(initialReliableState)
    const shown = state.prediction !== null
    const points = reliablePoints(state.data)
    const r = reliableR(state.data)
    const y = estimate(state.x)
    const dragging = useRef(false)
    const moveTo = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - box.left) / box.width) * 360
        setState((s) => setReliable(s, { x: (x - 24) / 13.4 }))
    }
    const controls = (
        <>
            <Segmented<string> label={l(say('Datuak', 'Datos', 'البيانات', 'Data'))} value={String(state.data)} options={[{ value: '0', label: l(say('Sendoak', 'Fuertes', 'قوية', 'Strong')) }, { value: '1', label: l(say('Ahulak', 'Débiles', 'ضعيفة', 'Weak')) }]} onChange={(value) => setState((s) => setReliable(s, { data: Number(value) }))} />
            <Stepper label="x" value={state.x} min={RELIABLE_LIMITS.min} max={RELIABLE_LIMITS.max} onChange={(value) => setState((s) => setReliable(s, { x: value }))} language={props.language} />
        </>
    )
    const prediction = reliablePrediction(state)
    const note = prediction === '>'
        ? say('Fidagarria: $|r|$ handia da, eta x datuen barruan dago.', 'Fiable: $|r|$ es grande y x está dentro de los datos.', 'موثوق: $|r|$ كبير وx داخل البيانات.', 'Reliable: $|r|$ is large and x is within the data.')
        : prediction === '='
            ? say('Ez oso fidagarria: x datuetatik kanpo dago, gertu bada ere.', 'Poco fiable: x está fuera de los datos, aunque cerca.', 'قليل الموثوقية: x خارج البيانات وإن كانت قريبة.', 'Not very reliable: x is outside the data, though close.')
            : Math.abs(r) < 0.75
                ? say('Ez da fidagarria: $|r|$ txikiegia da, puntuak zuzenetik urrun.', 'No es fiable: $|r|$ es demasiado pequeño, los puntos están lejos de la recta.', 'غير موثوق: $|r|$ صغير جدًّا والنقاط بعيدة عن المستقيم.', 'Not reliable: $|r|$ is too small, the points are far from the line.')
                : say('Ez da fidagarria: x datuetatik oso urrun dago.', 'No es fiable: x está muy lejos de los datos.', 'غير موثوق: x بعيدة جدًّا عن البيانات.', 'Not reliable: x is very far from the data.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: fidagarria izango al da estimazioa?', 'Antes de verlo: ¿será fiable la estimación?', 'قبل أن ترى: هل سيكون التقدير موثوقًا؟', 'Before you see it: will the estimate be reliable?')}
            labels={{ '<': say('Batere ez', 'Nada', 'إطلاقًا', 'Not at all'), '=': say('Gutxi', 'Poco', 'قليلًا', 'A little'), '>': say('Bai', 'Sí', 'نعم', 'Yes') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Bi gauza begiratu: $|r|$ 1 zenbakitik hurbil dagoen, eta x datuen tartearen barruan dagoen.', 'Mira dos cosas: si $|r|$ está cerca de 1 y si x está dentro del intervalo de los datos.', 'انظر إلى أمرين: هل $|r|$ قريب من 1، وهل x داخل مجال البيانات.', 'Look at two things: whether $|r|$ is close to 1 and whether x is within the range of the data.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={[`\\hat{y}=1+0{,}5\\cdot ${state.x}=${texDec(y, props.language, 1)}`, `r\\approx ${texDec(r, props.language, 2)}`]} note={l(note)} />
        </Predict>
    )
    const [low, high] = [RELIABLE_X[0], RELIABLE_X.at(-1)!]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={reliableChallenges} extraChallenges={reliableExtra} state={state}>
            <div
                style={{ touchAction: 'none', cursor: 'ew-resize' }}
                onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); moveTo(event) }}
                onPointerMove={(event) => { if (dragging.current) moveTo(event) }}
                onPointerUp={() => { dragging.current = false }}
                onPointerCancel={() => { dragging.current = false }}
            >
                <Board height={RELIABLE_HEIGHT} label={l(say('Familien errenta eta kulturako gastua', 'Renta de las familias y gasto en cultura', 'دخل الأسر وإنفاقها على الثقافة', 'Family income and spending on culture'))}>
                    {shown && (
                        <g>
                            <rect x={EX(low)} y={EY(14)} width={EX(high) - EX(low)} height={EY(0) - EY(14)} fill={GREEN_TINT} opacity={0.7} />
                            <rect x={EX(low - 2)} y={EY(14)} width={EX(low) - EX(low - 2)} height={EY(0) - EY(14)} fill={MUSTARD_TINT} opacity={0.7} />
                            <rect x={EX(high)} y={EY(14)} width={EX(high + 2) - EX(high)} height={EY(0) - EY(14)} fill={MUSTARD_TINT} opacity={0.7} />
                        </g>
                    )}
                    <line x1={EX(0)} x2={EX(24.5)} y1={EY(0)} y2={EY(0)} stroke={INK} strokeWidth={1.6} />
                    <line x1={EX(0)} x2={EX(0)} y1={EY(0)} y2={EY(14.5)} stroke={INK} strokeWidth={1.6} />
                    {[0, 4, 8, 12, 16, 20, 24].map((value) => <text key={`x${value}`} x={EX(value)} y={EY(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>)}
                    {[4, 8, 12].map((value) => <text key={`y${value}`} x={EX(0) - 5} y={EY(value) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{value}</text>)}
                    <line x1={EX(0)} x2={EX(24)} y1={EY(estimate(0))} y2={EY(estimate(24))} stroke={SECOND} strokeWidth={2} />
                    {points.map(([a, b], index) => <circle key={index} cx={EX(a)} cy={EY(b)} r={6} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />)}
                    <line x1={EX(state.x)} x2={EX(state.x)} y1={EY(0)} y2={EY(y)} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />
                    <circle cx={EX(state.x)} cy={EY(y)} r={7} fill={shown ? (prediction === '>' ? GREEN : prediction === '=' ? MUSTARD : SECOND) : PAPER} stroke={INK} strokeWidth={1.8} />
                    <circle cx={EX(state.x)} cy={EY(0) + 30} r={10} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={EX(state.x)} y={EY(0) + 34} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>{state.x}</text>
                    <Label x={EX(24)} y={EY(14) + 4} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{l(say('x: errenta · y: gastua', 'x: renta · y: gasto', 'x: الدخل · y: الإنفاق', 'x: income · y: spending'))}</Label>
                    {shown && <text x={EX(state.x) + (state.x > 18 ? -10 : 10)} y={EY(y) - 10} textAnchor={state.x > 18 ? 'end' : 'start'} fontSize={13} fontWeight={700} fill={INK}>{`ŷ = ${dec(y, props.language, 1)}`}</text>}
                    {!shown && <Hidden x={EX(state.x) + 18} y={EY(y) - 8} size={22} />}
                    {shown && <text x={EX(0) + 6} y={EY(14) + 4} fontSize={12} fontWeight={700} fill={SECOND}>{`r ≈ ${dec(r, props.language, 2)}`}</text>}
                </Board>
            </div>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Arrastatu x ardatzean zehar.', 'Arrastra x por el eje.', 'اسحب x على المحور.', 'Drag x along the axis.'))}</p>
        </ToolFrame>
    )
}
