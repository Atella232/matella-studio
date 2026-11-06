import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../text'
import { applyMachine, COMPOSITION_LIMITS, compositionChallenges, compositionExtra, compositionPrediction, fAfterG, gAfterF, initialCompositionState, MACHINE_LABEL, MACHINE_LATEX, MACHINES, setComposition, type CompositionState, type MachineId } from './composition'
import { cutsOfProbe, initialMirrorState, isKept, keptIsInjective, MIRROR_LIMITS, mirrorChallenges, mirrorExtra, mirrorLatex, mirrorPrediction, mirrorValue, setMirror, sideLatex, type MirrorFamily, type MirrorSide, type MirrorState } from './mirror'
import { decimalTenths, floorOf, initialStairsState, setStairs, STAIRS_LIMITS, stairsChallenges, stairsExtra, stairsPrediction, tenthsLatex, type StairsKind, type StairsState } from './stairs'
import { BASE_POINT, baseLatex, baseValue, initialTransformState, INNER_FACTORS, movedPoint, OUTER_FACTORS, setTransform, TRANSFORM_LIMITS, transformChallenges, transformExtra, transformLatex, transformPrediction, transformValue, type TransformBase, type TransformState } from './transform'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — the four tools of this
   unit: the transformation workshop (a point P that a formula moves), two
   machines in a row in both orders, the mirror y = x with a cut and a
   horizontal line, and the staircase of E(x). Each asks for a prediction
   before it shows the result, and each moves with ▶. Logic in
   transform.ts, composition.ts, mirror.ts and stairs.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for LaTeX, whole or with two decimals at most */
const tex = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))

/** A curve as an SVG path, broken where it does not exist or jumps */
function curvePath(fn: (x: number) => number | null, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: number): string {
    let path = ''
    let open = false
    let previous: number | null = null
    for (let x = from; x <= to + 1e-9; x += 0.04) {
        const y = fn(x)
        if (y === null || Math.abs(y) > yLimit || (previous !== null && Math.abs(y - previous) > yLimit)) {
            open = false
            previous = y === null || Math.abs(y) > yLimit ? null : y
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
        previous = y
    }
    return path
}

/** A light grid with axes and every other number */
function Grid({ xMin, xMax, yMin, yMax, X, Y, step = 2 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; step?: number }) {
    const xs = Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i)
    const ys = Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i)
    return (
        <g>
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={X(xMin)} x2={X(xMax)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.4} />
            <line x1={X(0)} x2={X(0)} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => x !== 0 && x % step === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 13} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(x)}</text>)}
            {ys.filter((y) => y !== 0 && y % step === 0).map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/* ---------- L1. The transformation workshop ---------- */

const BASE_LABEL: Record<TransformBase, string> = { sqrt: '√x', square: 'x²', abs: '|x|', exp: '2ˣ', inverse: '1/x' }

export function TransformTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TransformState>(initialTransformState)
    const shown = state.prediction !== null
    const X = (x: number) => 20 + (x + 8) * 20
    const Y = (y: number) => 20 + (7 - y) * 20
    const [p, q] = BASE_POINT[state.base]
    const [px, py] = movedPoint(state)
    const playback = usePlayback(`${state.base}-${state.A}-${state.B}-${state.c}-${state.k}`, 1200)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const inside = Math.abs(px) <= 8 && Math.abs(py) <= 7
    const tx = p + (px - p) * progress
    const ty = q + (py - q) * progress
    const controls = (
        <>
            <Segmented<TransformBase> label={l(say('Funtzio ama', 'Función madre', 'الدالة الأم', 'Mother function'))} value={state.base} options={(['sqrt', 'square', 'abs', 'exp', 'inverse'] as TransformBase[]).map((base) => ({ value: base, label: BASE_LABEL[base] }))} onChange={(base) => setState((s) => setTransform(s, { base }))} />
            <Segmented<string> label={l(say('A (kanpoan)', 'A (fuera)', 'A (في الخارج)', 'A (outside)'))} value={String(state.A)} options={OUTER_FACTORS.map((A) => ({ value: String(A), label: minus(A) }))} onChange={(A) => setState((s) => setTransform(s, { A: Number(A) }))} />
            <Segmented<string> label={l(say('B (barruan)', 'B (dentro)', 'B (في الداخل)', 'B (inside)'))} value={String(state.B)} options={INNER_FACTORS.map((B) => ({ value: String(B), label: minus(B) }))} onChange={(B) => setState((s) => setTransform(s, { B: Number(B) }))} />
            <Stepper label={l(say('c (barruan batzen da)', 'c (se suma dentro)', 'c (يُضاف في الداخل)', 'c (added inside)'))} value={state.c} min={TRANSFORM_LIMITS.c.min} max={TRANSFORM_LIMITS.c.max} format={minus} onChange={(c) => setState((s) => setTransform(s, { c }))} language={props.language} />
            <Stepper label={l(say('k (kanpoan batzen da)', 'k (se suma fuera)', 'k (يُضاف في الخارج)', 'k (added outside)'))} value={state.k} min={TRANSFORM_LIMITS.k.min} max={TRANSFORM_LIMITS.k.max} format={minus} onChange={(k) => setState((s) => setTransform(s, { k }))} language={props.language} />
        </>
    )
    const moved = `P(${p},${q})\\ \\to\\ P'(${tex(px, props.language)},${tex(py, props.language)})`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${transformLatex(state)}$ funtzioan, nora doa $P(${p},${q})$ puntua?`, `Antes de verlo: en $${transformLatex(state)}$, ¿hacia dónde va el punto $P(${p},${q})$?`, `قبل أن ترى: في $${transformLatex(state)}$ إلى أين تذهب النقطة $P(${p},${q})$؟`, `Before you see it: in $${transformLatex(state)}$, where does the point $P(${p},${q})$ go?`)}
            labels={{ '<': say('Ezkerrera', 'A la izquierda', 'إلى اليسار', 'To the left'), '=': say('Bertikal berean', 'En la misma vertical', 'على الخط الرأسي نفسه', 'Same vertical'), '>': say('Eskuinera', 'A la derecha', 'إلى اليمين', 'To the right') }}
            actual={transformPrediction(state)}
            choice={state.prediction}
            tip={say('Barrukoak alderantziz egiten du: $x+3$ eginda, puntua 3 unitate ezkerrera doa; $2x$ eginda, Y ardatzera erdira hurbiltzen da; $-x$ eginda, Y ardatzean islatzen da.', 'Lo de dentro actúa al revés: con $x+3$ el punto va 3 a la izquierda; con $2x$ se acerca al eje Y a la mitad de distancia; con $-x$ se refleja en el eje Y.', 'ما بالداخل يعمل بالعكس: مع $x+3$ تذهب النقطة 3 إلى اليسار، ومع $2x$ تقترب من محور Y إلى نصف المسافة، ومع $-x$ تنعكس في محور Y.', 'The inside works the other way round: with $x+3$ the point goes 3 to the left; with $2x$ it moves halfway towards the y-axis; with $-x$ it is reflected in the y-axis.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[transformLatex(state), moved]} note={l(inside
                ? say('Lehenik barrukoa ($x$ aldagaian), eta gero kanpokoa ($y$ aldagaian): biderkatu eta batu.', 'Primero lo de dentro (en la $x$) y después lo de fuera (en la $y$): multiplicar y sumar.', 'أولًا ما بالداخل (في $x$) ثم ما بالخارج (في $y$): الضرب ثم الجمع.', 'First the inside (on $x$) and then the outside (on $y$): multiply and add.')
                : say('$P\'$ puntua taulatik kanpo geratzen da.', 'El punto $P\'$ queda fuera del tablero.', 'النقطة $P\'$ خارج اللوحة.', 'The point $P\'$ is off the board.'))} />
        </Predict>
    )
    const basePath = curvePath((x) => baseValue(state.base, x), -8, 8, X, Y, 8)
    const newPath = curvePath((x) => transformValue(state, x), -8, 8, X, Y, 8)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={transformChallenges} extraChallenges={transformExtra} state={state}>
            <Board height={322} label={l(say(`${baseLatex(state.base)} eta ${transformLatex(state)}`, `${baseLatex(state.base)} y ${transformLatex(state)}`, `${baseLatex(state.base)} و${transformLatex(state)}`, `${baseLatex(state.base)} and ${transformLatex(state)}`))}>
                <rect x={20} y={20} width={320} height={280} fill={PAPER} />
                <Grid xMin={-8} xMax={8} yMin={-7} yMax={7} X={X} Y={Y} />
                <path d={basePath} fill="none" stroke={MUTED} strokeWidth={2.4} strokeDasharray="6 5" />
                {shown && progress >= 1 && <path d={newPath} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />}
                <circle cx={X(p)} cy={Y(q)} r={6} fill={SECOND} stroke={PAPER} strokeWidth={1.5} />
                <text x={X(p) + 8} y={Y(q) - 8} fontSize={14} fontWeight={700} fill={SECOND}>P</text>
                {shown && Math.abs(tx) <= 8 && Math.abs(ty) <= 7 && (
                    <g>
                        <line x1={X(p)} y1={Y(q)} x2={X(tx)} y2={Y(ty)} stroke={GREEN} strokeWidth={1.6} strokeDasharray="4 3" />
                        <circle cx={X(tx)} cy={Y(ty)} r={7} fill={GREEN} stroke={PAPER} strokeWidth={1.5} />
                        <text x={X(tx) + 9} y={Y(ty) + 16} fontSize={14} fontWeight={700} fill={GREEN}>P′</text>
                    </g>
                )}
                {!shown && <Hidden x={300} y={50} />}
                <text x={180} y={316} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE} direction="ltr">{shown ? `y = A · f(Bx + c) + k` : BASE_LABEL[state.base]}</text>
            </Board>
            <PlayButton label={l(say('Mugitu P', 'Mueve P', 'حرّك P', 'Move P'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. Two machines in a row ---------- */

function MachineBox({ x, y, label, color, name }: { x: number; y: number; label: string; color: string; name: string }) {
    return (
        <g>
            <rect x={x - 34} y={y - 20} width={68} height={40} rx={9} fill={PAPER} stroke={color} strokeWidth={2.2} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={color} direction="ltr">{label}</text>
            <text x={x} y={y - 26} textAnchor="middle" fontSize={13} fontWeight={700} fill={color}>{name}</text>
        </g>
    )
}

export function CompositionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompositionState>(initialCompositionState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.f}-${state.g}-${state.input}`, 1600)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const x = state.input
    const top = [x, applyMachine(state.g, x), fAfterG(state, x)]
    const bottom = [x, applyMachine(state.f, x), gAfterF(state, x)]
    const options = MACHINES.map((machine) => ({ value: machine, label: MACHINE_LABEL[machine] }))
    const controls = (
        <>
            <Segmented<MachineId> label={l(say('f makina', 'Máquina f', 'الآلة f', 'Machine f'))} value={state.f} options={options} onChange={(f) => setState((s) => setComposition(s, { f }))} />
            <Segmented<MachineId> label={l(say('g makina', 'Máquina g', 'الآلة g', 'Machine g'))} value={state.g} options={options} onChange={(g) => setState((s) => setComposition(s, { g }))} />
            <Stepper label={l(say('Sarrera x', 'Entrada x', 'المدخل x', 'Input x'))} value={state.input} min={COMPOSITION_LIMITS.input.min} max={COMPOSITION_LIMITS.input.max} format={minus} onChange={(input) => setState((s) => setComposition(s, { input }))} language={props.language} />
        </>
    )
    const call = (value: number) => `(${value})`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $x=${x}$ denean, $f(x)=${MACHINE_LATEX[state.f]}$ eta $g(x)=${MACHINE_LATEX[state.g]}$ izanik, zein da handiagoa, goikoa, $(f\\circ g)(x)$, ala behekoa, $(g\\circ f)(x)$?`, `Antes de verlo: con $x=${x}$, $f(x)=${MACHINE_LATEX[state.f]}$ y $g(x)=${MACHINE_LATEX[state.g]}$, ¿qué sale mayor, arriba, $(f\\circ g)(x)$, o abajo, $(g\\circ f)(x)$?`, `قبل أن ترى: مع $x=${x}$ و$f(x)=${MACHINE_LATEX[state.f]}$ و$g(x)=${MACHINE_LATEX[state.g]}$، أيهما أكبر: الأعلى $(f\\circ g)(x)$ أم الأسفل $(g\\circ f)(x)$؟`, `Before you see it: with $x=${x}$, $f(x)=${MACHINE_LATEX[state.f]}$ and $g(x)=${MACHINE_LATEX[state.g]}$, which comes out larger, the top one, $(f\\circ g)(x)$, or the bottom one, $(g\\circ f)(x)$?`)}
            labels={{ '<': say('Behekoa handiagoa', 'Mayor abajo', 'الأسفل أكبر', 'Bottom is larger'), '=': say('Berdinak', 'Iguales', 'متساويان', 'The same'), '>': say('Goikoa handiagoa', 'Mayor arriba', 'الأعلى أكبر', 'Top is larger') }}
            actual={compositionPrediction(state)}
            choice={state.prediction}
            tip={say('$f\\circ g$ eginda, $x$ zenbakia $g$ makinan sartzen da lehenik; $g\\circ f$ eginda, $f$ makinan. Ordena aldatzeak emaitza aldatzen du gehienetan.', 'En $f\\circ g$, $x$ entra primero en $g$; en $g\\circ f$, primero en $f$. Cambiar el orden casi siempre cambia el resultado.', 'في $f\\circ g$ يدخل $x$ أولًا في $g$، وفي $g\\circ f$ أولًا في $f$. وتغيير الترتيب يغيّر النتيجة في أغلب الأحيان.', 'In $f\\circ g$, $x$ goes into $g$ first; in $g\\circ f$, into $f$ first. Changing the order almost always changes the result.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`(f\\circ g)${call(x)}=f${call(top[1])}=${top[2]}`, `(g\\circ f)${call(x)}=g${call(bottom[1])}=${bottom[2]}`]} note={l(top[2] === bottom[2]
                ? say('Bi ordenek gauza bera ematen dute zenbaki honekin.', 'Con este número, los dos órdenes dan lo mismo.', 'مع هذا العدد يعطي الترتيبان الشيء نفسه.', 'With this number, both orders give the same.')
                : say('Ordenak garrantzia du: $f\\circ g\\neq g\\circ f$.', 'El orden importa: $f\\circ g\\neq g\\circ f$.', 'الترتيب مهم: $f\\circ g\\neq g\\circ f$.', 'The order matters: $f\\circ g\\neq g\\circ f$.'))} />
        </Predict>
    )
    const columns = [28, 100, 180, 260, 332]
    const row = (y: number, values: number[], first: MachineId, second: MachineId, firstName: string, secondName: string, color: string, title: string) => {
        const along = progress * 4
        const token = Math.min(4, along)
        const segment = Math.min(3, Math.floor(token))
        const tokenX = columns[segment] + (columns[segment + 1] - columns[segment]) * (token - segment)
        return (
            <g>
                <text x={10} y={y - 34} fontSize={14} fontWeight={700} fill={color} direction="ltr">{title}</text>
                <line x1={columns[0] + 14} x2={columns[4] - 18} y1={y} y2={y} stroke={MUTED} strokeWidth={1.6} />
                <text x={columns[0]} y={y + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{minus(values[0])}</text>
                <MachineBox x={columns[1]} y={y} label={MACHINE_LABEL[first]} color={color} name={firstName} />
                <rect x={columns[2] - 22} y={y - 15} width={44} height={30} rx={8} fill={shown && progress >= 0.5 ? STAGE_TINT : PAPER} stroke={MUTED} strokeWidth={1.2} />
                {shown && progress >= 0.5 ? <text x={columns[2]} y={y + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{minus(values[1])}</text> : <Hidden x={columns[2]} y={y + 7} size={18} />}
                <MachineBox x={columns[3]} y={y} label={MACHINE_LABEL[second]} color={color} name={secondName} />
                <rect x={columns[4] - 24} y={y - 17} width={48} height={34} rx={9} fill={shown && progress >= 1 ? GREEN_TINT : PAPER} stroke={shown && progress >= 1 ? GREEN : MUTED} strokeWidth={1.6} />
                {shown && progress >= 1 ? <text x={columns[4]} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={GREEN}>{minus(values[2])}</text> : <Hidden x={columns[4]} y={y + 7} size={18} />}
                {shown && progress > 0 && progress < 1 && <circle cx={tokenX} cy={y} r={7} fill={MUSTARD} stroke={INK} strokeWidth={1.2} />}
            </g>
        )
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={compositionChallenges} extraChallenges={compositionExtra} state={state}>
            <Board height={230} label={l(say('f ∘ g goian eta g ∘ f behean', 'f ∘ g arriba y g ∘ f abajo', 'f ∘ g في الأعلى وg ∘ f في الأسفل', 'f ∘ g on top and g ∘ f below'))}>
                {row(76, top, state.g, state.f, 'g', 'f', STAGE, 'f ∘ g')}
                {row(186, bottom, state.f, state.g, 'f', 'g', SECOND, 'g ∘ f')}
            </Board>
            <PlayButton label={l(say('Sartu x', 'Mete la x', 'أدخل x', 'Feed in x'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The mirror y = x ---------- */

const FAMILY_LABEL: Record<MirrorFamily, string> = { parabola: 'x²', abs: '|x|', exp: '2ˣ', line: '2x' }

export function MirrorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const shown = state.prediction !== null
    const X = (x: number) => 30 + (x + 6) * 25
    const Y = (y: number) => 20 + (6 - y) * 25
    const playback = usePlayback(`${state.family}-${state.v}-${state.w}-${state.side}-${state.cut}`, 1400)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const injective = keptIsInjective(state)
    const cuts = cutsOfProbe(state)
    const kept = (x: number) => (isKept(state, x) ? mirrorValue(state, x) : null)
    // The kept part folded over y = x: each (x, y) travels to (y, x)
    const folded = (() => {
        let path = ''
        let open = false
        for (let x = -6; x <= 6.001; x += 0.04) {
            const y = kept(x)
            if (y === null || Math.abs(y) > 7) {
                open = false
                continue
            }
            const fx = x + (y - x) * progress
            const fy = y + (x - y) * progress
            if (Math.abs(fx) > 7 || Math.abs(fy) > 7) {
                open = false
                continue
            }
            path += `${open ? 'L' : 'M'} ${X(fx).toFixed(1)} ${Y(fy).toFixed(1)} `
            open = true
        }
        return path
    })()
    const controls = (
        <>
            <Segmented<MirrorFamily> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.family} options={(['parabola', 'abs', 'exp', 'line'] as MirrorFamily[]).map((family) => ({ value: family, label: FAMILY_LABEL[family] }))} onChange={(family) => setState((s) => setMirror(s, { family }))} />
            <Stepper label={l(say('v (eskuinera)', 'v (a la derecha)', 'v (إلى اليمين)', 'v (to the right)'))} value={state.v} min={MIRROR_LIMITS.v.min} max={MIRROR_LIMITS.v.max} format={minus} onChange={(v) => setState((s) => setMirror(s, { v }))} language={props.language} />
            <Stepper label={l(say('w (gora)', 'w (hacia arriba)', 'w (إلى الأعلى)', 'w (up)'))} value={state.w} min={MIRROR_LIMITS.w.min} max={MIRROR_LIMITS.w.max} format={minus} onChange={(w) => setState((s) => setMirror(s, { w }))} language={props.language} />
            <Segmented<MirrorSide> label={l(say('Zer gorde', 'Qué te quedas', 'ماذا تحتفظ', 'What you keep'))} value={state.side} options={[{ value: 'all', label: l(say('Dena', 'Todo', 'الكل', 'All')) }, { value: 'right', label: 'x ≥ c' }, { value: 'left', label: 'x ≤ c' }]} onChange={(side) => setState((s) => setMirror(s, { side }))} />
            <Stepper label={l(say('Mozketa c', 'Corte c', 'القطع c', 'Cut c'))} value={state.cut} min={MIRROR_LIMITS.cut.min} max={MIRROR_LIMITS.cut.max} format={minus} onChange={(cut) => setState((s) => setMirror(s, { cut }))} language={props.language} />
            <Stepper label={l(say('Zuzena y = h', 'Recta y = h', 'المستقيم y = h', 'Line y = h'))} value={state.probe} min={MIRROR_LIMITS.probe.min} max={MIRROR_LIMITS.probe.max} format={minus} onChange={(probe) => setState((s) => setMirror(s, { probe }))} language={props.language} />
        </>
    )
    const keptLatex = sideLatex(state)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $y=${state.probe}$ zuzenak zenbat aldiz mozten du gordetzen duzun zatia?`, `Antes de verlo: ¿cuántas veces corta la recta $y=${state.probe}$ la parte que te quedas?`, `قبل أن ترى: كم مرة يقطع المستقيم $y=${state.probe}$ الجزء الذي تحتفظ به؟`, `Before you see it: how many times does the line $y=${state.probe}$ cut the part you keep?`)}
            labels={{ '<': say('Behin ere ez', 'Ninguna', 'ولا مرة', 'Never'), '=': say('Behin', 'Una', 'مرة واحدة', 'Once'), '>': say('Bi aldiz', 'Dos', 'مرتين', 'Twice') }}
            actual={mirrorPrediction(state)}
            choice={state.prediction}
            tip={say('Zuzen horizontal batek bi aldiz mozten badu, bi $x$ desberdinek irudi bera dute: ez dago alderantzizkorik. Gorde adar bat bakarrik.', 'Si una recta horizontal la corta dos veces, dos $x$ distintos tienen la misma imagen: no hay inversa. Quédate con una sola rama.', 'إذا قطعها مستقيم أفقي مرتين فلقيمتين مختلفتين لـ $x$ الصورة نفسها: لا توجد عكسية. احتفظ بفرع واحد.', 'If a horizontal line cuts it twice, two different $x$ have the same image: there is no inverse. Keep a single branch.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={keptLatex ? [mirrorLatex(state), keptLatex] : [mirrorLatex(state)]} note={l(injective
                ? say('Gordetako zatia injektiboa da: $y=x$ zuzenean duen islapena alderantzizko funtzioa da.', 'La parte que te quedas es inyectiva: su reflejo en $y=x$ es la función inversa.', 'الجزء المحتفظ به متباين: انعكاسه في $y=x$ هو الدالة العكسية.', 'The part you keep is injective: its reflection in $y=x$ is the inverse function.')
                : say('Zuzen horizontal batek bi aldiz moz dezake: islapena ez da funtzioa.', 'Una recta horizontal puede cortarla dos veces: su reflejo no es una función.', 'يمكن لمستقيم أفقي أن يقطعها مرتين: انعكاسها ليس دالة.', 'A horizontal line can cut it twice: its reflection is not a function.'))} />
        </Predict>
    )
    const fullPath = curvePath((x) => mirrorValue(state, x), -6, 6, X, Y, 7)
    const keptPath = curvePath(kept, -6, 6, X, Y, 7)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mirrorChallenges} extraChallenges={mirrorExtra} state={state}>
            <Board height={340} label={l(say(`${mirrorLatex(state)} eta haren islapena y = x zuzenean`, `${mirrorLatex(state)} y su reflejo en y = x`, `${mirrorLatex(state)} وانعكاسها في y = x`, `${mirrorLatex(state)} and its reflection in y = x`))}>
                <rect x={30} y={20} width={300} height={300} fill={PAPER} />
                <Grid xMin={-6} xMax={6} yMin={-6} yMax={6} X={X} Y={Y} />
                <line x1={X(-6)} y1={Y(-6)} x2={X(6)} y2={Y(6)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
                <text x={X(5.6)} y={Y(5.6) + 16} textAnchor="end" fontSize={12} fill={MUTED} direction="ltr">y = x</text>
                <path d={fullPath} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="3 4" />
                <path d={keptPath} fill="none" stroke={STAGE} strokeWidth={3.4} />
                {state.side !== 'all' && <line x1={X(state.cut)} x2={X(state.cut)} y1={Y(6)} y2={Y(-6)} stroke={STAGE} strokeWidth={1.4} strokeDasharray="2 3" />}
                <line x1={X(-6)} x2={X(6)} y1={Y(state.probe)} y2={Y(state.probe)} stroke={MUSTARD} strokeWidth={2} />
                {shown && cuts.filter((x) => Math.abs(x) <= 6).map((x, index) => <circle key={index} cx={X(x)} cy={Y(state.probe)} r={6} fill={SECOND} stroke={PAPER} strokeWidth={1.5} />)}
                {shown && <path d={folded} fill="none" stroke={injective ? GREEN : SECOND} strokeWidth={3} strokeDasharray={injective ? undefined : '7 4'} opacity={0.9} />}
                {!shown && <Hidden x={300} y={300} />}
            </Board>
            <PlayButton label={l(say('Islatu y = x zuzenean', 'Refleja en y = x', 'اعكس في y = x', 'Reflect in y = x'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The staircase of E(x) ---------- */

export function StairsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<StairsState>(initialStairsState)
    const shown = state.prediction !== null
    const floor = state.kind === 'floor'
    const X = (x: number) => 20 + (x + 4) * 40
    const Y = (y: number) => (floor ? 160 - y * 35 : 250 - y * 200)
    const x = state.probe / 10
    const whole = floorOf(state.probe)
    const part = decimalTenths(state.probe)
    const playback = usePlayback(`${state.kind}-${state.probe}`, 1400)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const walker = -4 + (x + 4) * progress
    const walkerY = floor ? Math.floor(walker + 1e-9) : walker - Math.floor(walker + 1e-9)
    const number = (tenths: number) => dec(tenths / 10, props.language, 1)
    const controls = (
        <>
            <Segmented<StairsKind> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.kind} options={[{ value: 'floor', label: 'E(x)' }, { value: 'decimal', label: 'x − E(x)' }]} onChange={(kind) => setState((s) => setStairs(s, { kind }))} />
            <Stepper label={l(say('Zunda x', 'Sonda x', 'المسبار x', 'Probe x'))} value={state.probe} min={STAIRS_LIMITS.probe.min} max={STAIRS_LIMITS.probe.max} format={(tenths) => number(tenths).replace('-', '−')} onChange={(probe) => setState((s) => setStairs(s, { probe }))} language={props.language} />
        </>
    )
    /** The probe for LaTeX: {,} for the comma (MathText writes the point in English), the point in Arabic */
    const xl = props.language === 'ar' ? tenthsLatex(state.probe).replace('{,}', '.') : tenthsLatex(state.probe)
    const partLatex = props.language === 'ar' ? tenthsLatex(part).replace('{,}', '.') : tenthsLatex(part)
    const half = say('0,5', '0,5', '0.5', '0.5')
    const readout = (
        <Predict
            language={props.language}
            question={floor
                ? say(`Ikusi aurretik: zein zenbaki oso da $E(${xl})$?`, `Antes de verlo: ¿qué entero es $E(${xl})$?`, `قبل أن ترى: ما العدد الصحيح $E(${xl})$؟`, `Before you see it: which whole number is $E(${xl})$?`)
                : say(`Ikusi aurretik: $${xl}$ zenbakiaren zati hamartarra 0,5 baino txikiagoa, berdina ala handiagoa da?`, `Antes de verlo: ¿la parte decimal de $${xl}$ es menor, igual o mayor que 0,5?`, `قبل أن ترى: هل الجزء الكسري لـ $${xl}$ أصغر من 0.5 أم يساويه أم أكبر منه؟`, `Before you see it: is the fractional part of $${xl}$ less than, equal to or greater than 0.5?`)}
            labels={floor
                ? { '<': say('Ezkerreko osoa', 'El entero de su izquierda', 'الصحيح الذي على يساره', 'The whole number to its left'), '=': say('Bera, osoa delako', 'Él mismo: ya es entero', 'هو نفسه: إنه صحيح', 'Itself: it is whole'), '>': say('Eskuineko osoa', 'El entero de su derecha', 'الصحيح الذي على يمينه', 'The whole number to its right') }
                : { '<': say(`${half.eu} baino txikiagoa`, `Menor que ${half.es}`, `أصغر من ${half.ar}`, `Less than ${half.en}`), '=': say(`${half.eu} da`, `Es ${half.es}`, `يساوي ${half.ar}`, `It is ${half.en}`), '>': say(`${half.eu} baino handiagoa`, `Mayor que ${half.es}`, `أكبر من ${half.ar}`, `Greater than ${half.en}`) }}
            actual={stairsPrediction(state)}
            choice={state.prediction}
            tip={say('$E(x)$ funtzioak beti beherantz biribiltzen du, baita negatiboekin ere: $E(-2{,}4)=-3$, ez $-2$. Zati hamartarra $x-E(x)$ da, eta beti dago 0 eta 1 artean.', '$E(x)$ siempre redondea hacia abajo, también con negativos: $E(-2{,}4)=-3$, no $-2$. La parte decimal es $x-E(x)$ y está siempre entre 0 y 1.', '$E(x)$ تقرّب دائمًا إلى الأسفل حتى مع السالبة: $E(-2{,}4)=-3$ لا $-2$. والجزء الكسري هو $x-E(x)$ ويقع دائمًا بين 0 و1.', '$E(x)$ always rounds down, with negatives too: $E(-2{,}4)=-3$, not $-2$. The fractional part is $x-E(x)$ and always lies between 0 and 1.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={floor ? [`E(${xl})=${whole}`] : [`${xl}-E(${xl})=${xl}-(${whole})=${partLatex}`]} note={l(floor
                ? say(`$${whole}\\le ${xl}<${whole + 1}$: eskailerak ${minus(whole)} balioa du hor.`, `$${whole}\\le ${xl}<${whole + 1}$: la escalera está en ${minus(whole)}.`, `$${whole}\\le ${xl}<${whole + 1}$: الدرج عند ${minus(whole)}.`, `$${whole}\\le ${xl}<${whole + 1}$: the staircase is at ${minus(whole)}.`)
                : say('Zerra: maila bakoitzean 0 balioan hasten da eta 1 baliora iritsi gabe igotzen da.', 'La sierra: en cada peldaño empieza en 0 y sube sin llegar a 1.', 'المنشار: في كل درجة يبدأ من 0 ويصعد دون أن يبلغ 1.', 'The saw: on each step it starts at 0 and rises without reaching 1.'))} />
        </Predict>
    )
    const steps = Array.from({ length: 8 }, (_, i) => i - 4)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={stairsChallenges} extraChallenges={stairsExtra} state={state}>
            <Board height={floor ? 320 : 290} label={l(say(floor ? 'y = E(x) eskailera' : 'y = x − E(x) zerra', floor ? 'La escalera y = E(x)' : 'La sierra y = x − E(x)', floor ? 'درج y = E(x)' : 'منشار y = x − E(x)', floor ? 'The staircase y = E(x)' : 'The saw y = x − E(x)'))}>
                <rect x={20} y={10} width={320} height={floor ? 300 : 270} fill={PAPER} />
                {floor ? <Grid xMin={-4} xMax={4} yMin={-4} yMax={4} X={X} Y={Y} step={1} /> : (
                    <g>
                        {steps.concat([4]).map((n) => <line key={n} x1={X(n)} x2={X(n)} y1={Y(0)} y2={Y(1)} stroke="#e6dfd2" strokeWidth={1} />)}
                        <line x1={X(-4)} x2={X(4)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.4} />
                        <line x1={X(-4)} x2={X(4)} y1={Y(1)} y2={Y(1)} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                        <line x1={X(0)} x2={X(0)} y1={Y(-0.2)} y2={Y(1.1)} stroke={INK} strokeWidth={1.4} />
                        {steps.concat([4]).filter((n) => n !== 0).map((n) => <text key={n} x={X(n)} y={Y(0) + 14} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(n)}</text>)}
                        <text x={X(0) - 5} y={Y(1) + 4} textAnchor="end" fontSize={11} fill={MUTED}>1</text>
                    </g>
                )}
                {steps.map((n) => (
                    <g key={n}>
                        <line x1={X(n)} x2={X(n + 1)} y1={floor ? Y(n) : Y(0)} y2={floor ? Y(n) : Y(1)} stroke={STAGE} strokeWidth={3.2} />
                        <circle cx={X(n)} cy={floor ? Y(n) : Y(0)} r={4.5} fill={STAGE} />
                        <circle cx={X(n + 1)} cy={floor ? Y(n) : Y(1)} r={4.5} fill={PAPER} stroke={STAGE} strokeWidth={2} />
                    </g>
                ))}
                <line x1={X(x)} x2={X(x)} y1={floor ? Y(4.3) : Y(1.15)} y2={floor ? Y(-4.3) : Y(-0.15)} stroke={INK} strokeWidth={1.6} strokeDasharray="4 3" />
                {shown && progress >= 1 && <circle cx={X(x)} cy={floor ? Y(whole) : Y(part / 10)} r={7} fill={SECOND} stroke={PAPER} strokeWidth={1.6} />}
                {shown && progress > 0 && progress < 1 && <circle cx={X(walker)} cy={Y(walkerY)} r={6} fill={MUSTARD} stroke={INK} strokeWidth={1.2} />}
                {!shown && <Hidden x={X(x) + (x > 2 ? -18 : 18)} y={floor ? Y(Math.min(3, Math.max(-3, whole))) : Y(0.5)} size={20} />}
            </Board>
            <PlayButton label={l(say('Ibili eskaileran', 'Recorre la escalera', 'امشِ على الدرج', 'Walk the stairs'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
