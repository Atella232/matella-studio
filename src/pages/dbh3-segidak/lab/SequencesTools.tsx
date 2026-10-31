import { useState, type ReactNode } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toNumber } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { StickSquares } from '../figures'
import { BAR_FIRSTS, BAR_PIECES_MAX, BAR_RATIOS, barChallenges, barExtra, barLimit, barPartial, barPiece, barPrediction, initialBarState, setBar, type BarState } from './endlessBar'
import { BOUNCE_HEIGHTS, BOUNCE_N_MAX, BOUNCE_RATIOS, bounceChallenges, bounceExtra, bounceHeight, bouncePrediction, bounceStart, initialBounceState, setBounce, type BounceState } from './bounce'
import { FROG_LIMITS, frogChallenges, frogExtra, frogPrediction, frogTerm, initialFrogState, setFrog, type FrogState } from './frog'
import { GAUSS_LIMITS, gaussChallenges, gaussExtra, gaussLast, gaussPrediction, gaussSum, initialGaussState, setGauss, type GaussState } from './gaussBars'
import { Board, Hidden, PlayButton, Predict, Readout } from './LabParts'
import { dec, GREEN, INK, MUSTARD, MUSTARD_TINT, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from './labStyle'
import { setPrediction } from './prediction'
import { initialSticksState, isArithmetic, PATTERNS, patternFormula, patternTerm, setSticks, STICKS_N_MAX, sticksChallenges, sticksExtra, sticksPrediction, sticksValue, type SticksState } from './sticks'

/* ==========================================================================
   Segidak · 3. DBH — the five tools of this unit: the stick patterns, the
   frog on the number line, Gauss's bars, the bouncing ball and the bar
   that never fills up. Each asks for a prediction before it shows the
   result; the frog, the bars, the ball and the endless bar move with ▶.
   Logic in the .ts files next to this one.
   ========================================================================== */

const fracLatex = (numerator: number, denominator: number) => (denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`)

/* ---------- L1. Stick patterns ---------- */

function PatternDrawing({ pattern, n }: { pattern: number; n: number }) {
    const id = PATTERNS[pattern]
    if (id === 'squares') {
        const side = Math.min(26, 320 / n)
        return <StickSquares x={(360 - n * side) / 2} y={30} n={n} side={side} />
    }
    if (id === 'triangles') {
        const side = Math.min(44, 600 / (n + 1))
        const h = side * 0.87
        const x0 = (360 - ((n + 1) * side) / 2) / 2
        const lines: ReactNode[] = []
        for (let i = 0; i < n; i += 1) {
            const left = x0 + (i * side) / 2
            const up = i % 2 === 0
            const [a, b, c] = up ? [[left, 30 + h], [left + side, 30 + h], [left + side / 2, 30]] : [[left, 30], [left + side, 30], [left + side / 2, 30 + h]]
            lines.push(<polygon key={i} points={`${a.join(',')} ${b.join(',')} ${c.join(',')}`} fill="none" stroke={STAGE} strokeWidth={3.5} strokeLinejoin="round" />)
        }
        return <g>{lines}</g>
    }
    if (id === 'stairs') {
        const size = Math.min(20, 300 / n, 112 / n)
        const x0 = (360 - n * size) / 2
        return (
            <g>
                {Array.from({ length: n }, (_, column) => Array.from({ length: column + 1 }, (_, row) => (
                    <rect key={`${column}-${row}`} x={x0 + column * size} y={30 + (n - 1 - row) * size} width={size} height={size} fill={MUSTARD_TINT} stroke={MUSTARD} strokeWidth={1.4} />
                )))}
            </g>
        )
    }
    const size = Math.min(14, 112 / n)
    const x0 = (360 - n * size) / 2
    return (
        <g>
            {Array.from({ length: n * n }, (_, index) => <rect key={index} x={x0 + (index % n) * size} y={30 + Math.floor(index / n) * size} width={size} height={size} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.2} />)}
        </g>
    )
}

const patternNames = [say('Karratuak', 'Cuadrados', 'مربعات', 'Squares'), say('Triangeluak', 'Triángulos', 'مثلثات', 'Triangles'), say('Eskailera', 'Escalera', 'درج', 'Staircase'), say('Karratu handia', 'Cuadrado grande', 'مربع كبير', 'Big square')]

export function SticksTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SticksState>(initialSticksState)
    const id = PATTERNS[state.pattern]
    const shown = state.prediction !== null
    const value = sticksValue(state)
    const firsts = [1, 2, 3, 4, 5].map((k) => patternTerm(id, k))
    const controls = (
        <>
            <Segmented label={l(say('Patroia', 'Patrón', 'النمط', 'Pattern'))} value={String(state.pattern)} options={patternNames.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(pattern) => setState((s) => setSticks(s, { pattern: Number(pattern) }))} />
            <Stepper label={l(say('Urratsa n', 'Paso n', 'الخطوة n', 'Step n'))} value={state.n} min={1} max={STICKS_N_MAX} onChange={(n) => setState((s) => setSticks(s, { n }))} language={props.language} />
        </>
    )
    const arithmetic = isArithmetic(id)
    const note = arithmetic
        ? l(say(`Urrats bakoitzean ${firsts[1] - firsts[0]} gehitzen dira: progresio aritmetikoa, $d=${firsts[1] - firsts[0]}$.`, `En cada paso se añaden ${firsts[1] - firsts[0]}: progresión aritmética de diferencia $d=${firsts[1] - firsts[0]}$.`, `في كل خطوة يُضاف ${firsts[1] - firsts[0]}: متتالية حسابية فرقها $d=${firsts[1] - firsts[0]}$.`, `${firsts[1] - firsts[0]} are added at each step: an arithmetic progression with $d=${firsts[1] - firsts[0]}$.`))
        : l(say('Urrats bakoitzean aurrekoan baino gehiago gehitzen dira: ez da progresio aritmetikoa.', 'En cada paso se añaden más que en el anterior: no es una progresión aritmética.', 'في كل خطوة يُضاف أكثر من السابقة: ليست متتالية حسابية.', 'More are added at each step than at the one before: it is not an arithmetic progression.'))
    const readout = (
        <Predict
            language={props.language}
            question={say('Emaitza ikusi aurretik: urrats batetik hurrengora, zenbat gehitzen da aldiro?', 'Antes de ver el resultado: de un paso al siguiente, ¿cuánto se añade cada vez?', 'قبل رؤية النتيجة: من خطوة إلى التالية، كم يُضاف كل مرة؟', 'Before you see the result: from one step to the next, how much is added each time?')}
            labels={{ '<': say('Gero eta gutxiago', 'Cada vez menos', 'أقل فأقل', 'Less each time'), '=': say('Beti berdin', 'Siempre lo mismo', 'المقدار نفسه دائمًا', 'Always the same'), '>': say('Gero eta gehiago', 'Cada vez más', 'أكثر فأكثر', 'More each time') }}
            actual={sticksPrediction(state)}
            choice={state.prediction}
            tip={arithmetic
                ? say('Makila edo bloke kopuru bera gehitzen da beti: lerro bat bezala hazten da.', 'Siempre se añade el mismo número de piezas: crece como una recta.', 'يُضاف دائمًا العدد نفسه من القطع: ينمو كخط مستقيم.', 'The same number of pieces is always added: it grows like a straight line.')
                : say('Urrats bakoitzean zutabe edo errenkada luzeago bat gehitzen da.', 'En cada paso se añade una columna o una fila más larga.', 'في كل خطوة يُضاف عمود أو صف أطول.', 'At each step a longer column or row is added.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[patternFormula[id], `a_{${state.n}}=${value}`]} note={note} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={sticksChallenges} extraChallenges={sticksExtra} state={state}>
            <Board height={232} label={l(say(`${state.n}. urratsa: ${value} elementu`, `Paso ${state.n}: ${value} elementos`, `الخطوة ${state.n}: ${value} عنصرًا`, `Step ${state.n}: ${value} items`))}>
                <PatternDrawing pattern={state.pattern} n={state.n} />
                {[1, 2, 3, 4, 5].map((k, index) => (
                    <g key={k}>
                        <rect x={24 + index * 54} y={166} width={50} height={28} fill={STAGE_TINT} stroke={INK} strokeWidth={1.2} />
                        <text x={49 + index * 54} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{shown || k === 1 ? firsts[index] : '?'}</text>
                        <text x={49 + index * 54} y={160} textAnchor="middle" fontSize={12} fill={MUTED}>{`a${'₁₂₃₄₅'[index]}`}</text>
                    </g>
                ))}
                <text x={318} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>…</text>
                <Label x={180} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{`a${String(state.n).split('').map((digit) => '₀₁₂₃₄₅₆₇₈₉'[Number(digit)]).join('')} = ${shown ? value : '?'}`}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The frog on the number line ---------- */

export function FrogTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FrogState>(initialFrogState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a1}-${state.d}-${state.n}`, 500 * Math.max(1, state.n - 1) + 300)
    const terms = Array.from({ length: state.n }, (_, k) => frogTerm(state, k + 1))
    const low = Math.min(...terms, 0) - 2
    const high = Math.max(...terms, 0) + 2
    const x = (value: number) => 24 + ((value - low) / (high - low)) * 312
    // While ▶ runs the frog goes jump by jump; otherwise it waits on the last term
    const reached = playback.progress === null ? state.n - 1 : Math.min(state.n - 1, playback.progress * (state.n - 1))
    const whole = Math.floor(reached)
    const part = reached - whole
    const frogX = whole >= state.n - 1 ? x(terms[state.n - 1]) : x(terms[whole]) + part * (x(terms[whole + 1]) - x(terms[whole]))
    const frogY = 104 - Math.sin(part * Math.PI) * 34
    const step = (high - low) > 40 ? 10 : (high - low) > 20 ? 5 : 2
    const ticks = Array.from({ length: Math.floor(high / step) - Math.ceil(low / step) + 1 }, (_, i) => (Math.ceil(low / step) + i) * step)
    const controls = (
        <>
            <Stepper label={l(say('Lehen gaia a₁', 'Primer término a₁', 'الحد الأول a₁', 'First term a₁'))} value={state.a1} min={FROG_LIMITS.a1.min} max={FROG_LIMITS.a1.max} onChange={(a1) => setState((s) => setFrog(s, { a1 }))} language={props.language} />
            <Stepper label={l(say('Diferentzia d', 'Diferencia d', 'الفرق d', 'Difference d'))} value={state.d} min={FROG_LIMITS.d.min} max={FROG_LIMITS.d.max} onChange={(d) => setState((s) => setFrog(s, { d }))} language={props.language} />
            <Stepper label={l(say('Gaia n', 'Término n', 'الحد n', 'Term n'))} value={state.n} min={FROG_LIMITS.n.min} max={FROG_LIMITS.n.max} onChange={(n) => setState((s) => setFrog(s, { n }))} language={props.language} />
        </>
    )
    const value = frogTerm(state)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Emaitza ikusi aurretik: $a_{${state.n}}$ gaia $a_{1}$ baino handiagoa izango da?`, `Antes de ver el resultado: ¿$a_{${state.n}}$ será mayor que $a_{1}$?`, `قبل رؤية النتيجة: هل يكون $a_{${state.n}}$ أكبر من $a_{1}$؟`, `Before you see the result: will $a_{${state.n}}$ be greater than $a_{1}$?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Berdina', 'Igual', 'يساويه', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={frogPrediction(state)}
            choice={state.prediction}
            tip={say('$d$ zenbakiaren zeinuak erabakitzen du: positiboa bada gora, negatiboa bada behera, zero bada geldirik.', 'Lo decide el signo de $d$: si es positivo sube, si es negativo baja, si es cero se queda quieta.', 'تحدّده إشارة $d$: إذا كانت موجبة يصعد، وإذا كانت سالبة ينزل، وإذا كانت صفرًا يبقى مكانه.', 'The sign of $d$ decides it: if positive it goes up, if negative it goes down, if zero it stays put.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`a_{${state.n}}=a_{1}+(${state.n}-1)\\cdot d`, `a_{${state.n}}=${state.a1}+${state.n - 1}\\cdot(${state.d})=${value}`]} note={l(say(`${state.n - 1} jauzi, bakoitza ${state.d}.`, `${state.n - 1} saltos de ${state.d} cada uno.`, `${state.n - 1} قفزة طول كل منها ${state.d}.`, `${state.n - 1} jumps of ${state.d} each.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={frogChallenges} extraChallenges={frogExtra} state={state}>
            <Board height={160} label={l(say(`Igela ${state.a1} zenbakitik, ${state.d} jauziekin`, `La rana desde ${state.a1}, con saltos de ${state.d}`, `الضفدع من ${state.a1} بقفزات ${state.d}`, `The frog from ${state.a1}, with jumps of ${state.d}`))}>
                <line x1={18} x2={342} y1={112} y2={112} stroke={INK} strokeWidth={2} />
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line x1={x(tick)} x2={x(tick)} y1={106} y2={118} stroke={INK} strokeWidth={1.2} />
                        <text x={x(tick)} y={136} textAnchor="middle" fontSize={13} fill={MUTED}>{tick}</text>
                    </g>
                ))}
                {shown && terms.slice(0, Math.min(terms.length, whole + 1)).map((term, k) => (
                    <g key={k}>
                        <circle cx={x(term)} cy={112} r={4.5} fill={SECOND} />
                        {k > 0 && state.d !== 0 && <path d={`M${x(terms[k - 1])} 106 Q ${(x(terms[k - 1]) + x(term)) / 2} 70 ${x(term)} 106`} fill="none" stroke={STAGE} strokeWidth={1.6} strokeDasharray="4 3" />}
                    </g>
                ))}
                <circle cx={x(state.a1)} cy={112} r={6} fill={STAGE} stroke={INK} strokeWidth={1.2} />
                {shown
                    ? <g><ellipse cx={frogX} cy={frogY} rx={13} ry={9} fill={GREEN} stroke={INK} strokeWidth={1.4} /><circle cx={frogX - 5} cy={frogY - 7} r={3} fill="#fff" stroke={INK} /><circle cx={frogX + 5} cy={frogY - 7} r={3} fill="#fff" stroke={INK} /></g>
                    : <Hidden x={180} y={60} />}
                {shown && <text x={frogX} y={frogY - 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{value}</text>}
            </Board>
            <PlayButton label={l(say('Jauzi egin', 'Saltar', 'اقفز', 'Jump'))} disabled={!shown || state.n === 1} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. Gauss's bars ---------- */

export function GaussTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GaussState>(initialGaussState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a1}-${state.d}-${state.n}`, 1800)
    // The reversed copy comes down from the top while ▶ runs; it stays once it has landed
    const copy = !shown ? 0 : playback.progress === null ? 0 : playback.progress
    const last = gaussLast(state)
    const column = state.a1 + last
    const width = Math.min(26, 300 / state.n)
    const x0 = (360 - state.n * width) / 2
    const scale = 170 / column
    const base = 200
    const controls = (
        <>
            <Stepper label={l(say('Lehen gaia a₁', 'Primer término a₁', 'الحد الأول a₁', 'First term a₁'))} value={state.a1} min={GAUSS_LIMITS.a1.min} max={GAUSS_LIMITS.a1.max} onChange={(a1) => setState((s) => setGauss(s, { a1 }))} language={props.language} />
            <Stepper label={l(say('Diferentzia d', 'Diferencia d', 'الفرق d', 'Difference d'))} value={state.d} min={GAUSS_LIMITS.d.min} max={GAUSS_LIMITS.d.max} onChange={(d) => setState((s) => setGauss(s, { d }))} language={props.language} />
            <Stepper label={l(say('Gai kopurua n', 'Número de términos n', 'عدد الحدود n', 'Number of terms n'))} value={state.n} min={GAUSS_LIMITS.n.min} max={GAUSS_LIMITS.n.max} onChange={(n) => setState((s) => setGauss(s, { n }))} language={props.language} />
        </>
    )
    const sum = gaussSum(state)
    const readout = (
        <Predict
            language={props.language}
            question={say('Emaitza ikusi aurretik: batura 100 baino handiagoa izango da?', 'Antes de ver el resultado: ¿la suma será mayor que 100?', 'قبل رؤية النتيجة: هل يكون المجموع أكبر من 100؟', 'Before you see the result: will the sum be greater than 100?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Justu 100', 'Justo 100', '100 تمامًا', 'Exactly 100'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={gaussPrediction(state)}
            choice={state.prediction}
            tip={say(`Lehena eta azkena batuta: $${state.a1}+${last}=${column}$, eta ${state.n} gai daude.`, `Primero y último suman $${state.a1}+${last}=${column}$, y hay ${state.n} términos.`, `الأول والأخير مجموعهما $${state.a1}+${last}=${column}$ وعدد الحدود ${state.n}.`, `The first and last add up to $${state.a1}+${last}=${column}$, and there are ${state.n} terms.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`S_{${state.n}}=\\frac{(${state.a1}+${last})\\cdot ${state.n}}{2}`, `S_{${state.n}}=\\frac{${column * state.n}}{2}=${texDec(sum, props.language)}`]} note={l(say(`Zutabe bakoitzak ${column} balio du: errektangeluak bi batura ditu.`, `Cada columna mide ${column}: el rectángulo son dos sumas.`, `كل عمود طوله ${column}: والمستطيل يساوي مجموعين.`, `Each column measures ${column}: the rectangle is two sums.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gaussChallenges} extraChallenges={gaussExtra} state={state}>
            <Board height={236} label={l(say(`${state.n} gai, ${state.a1} zenbakitik ${last} zenbakira`, `${state.n} términos, de ${state.a1} a ${last}`, `${state.n} حدود من ${state.a1} إلى ${last}`, `${state.n} terms, from ${state.a1} to ${last}`))}>
                {Array.from({ length: state.n }, (_, k) => {
                    const term = state.a1 + k * state.d
                    const mirror = column - term
                    const x = x0 + k * width
                    const top = base - term * scale
                    return (
                        <g key={k}>
                            <rect x={x} y={top} width={width - 2} height={term * scale} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.3} />
                            {width >= 20 && <text x={x + width / 2 - 1} y={base - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={STAGE}>{term}</text>}
                            {copy > 0 && (
                                <g transform={`translate(0 ${-(1 - copy) * 200})`} opacity={Math.min(1, copy * 1.4)}>
                                    <rect x={x} y={top - mirror * scale} width={width - 2} height={mirror * scale} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.3} />
                                    {width >= 20 && <text x={x + width / 2 - 1} y={top - mirror * scale + 13} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND}>{mirror}</text>}
                                </g>
                            )}
                        </g>
                    )
                })}
                <line x1={x0 - 4} x2={x0 + state.n * width + 2} y1={base} y2={base} stroke={INK} strokeWidth={2} />
                {copy >= 1 && <text x={x0 + state.n * width + 10} y={base - 82} fontSize={15} fontWeight={700} fill={MUSTARD}>{column}</text>}
                <Label x={180} y={226} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{shown ? `S = ${dec(sum, props.language)}` : 'S = ?'}</Label>
            </Board>
            <PlayButton label={l(say('Jarri buruz behera', 'Darle la vuelta', 'اقلبها', 'Turn it upside down'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The bouncing ball ---------- */

export function BounceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BounceState>(initialBounceState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.height}-${state.ratio}-${state.n}`, 700 * state.n + 400)
    const start = bounceStart(state)
    const [p, q] = BOUNCE_RATIOS[state.ratio]
    const floor = 196
    const scale = 168 / 256
    const slot = 300 / (state.n + 1)
    const xs = Array.from({ length: state.n + 1 }, (_, k) => 40 + k * slot)
    // While ▶ runs, the ball travels arc by arc
    const flight = playback.progress === null ? null : playback.progress * state.n
    let ballX = xs[0]
    let ballY = floor - start * scale - 10
    if (flight !== null) {
        const k = Math.min(state.n - 1, Math.floor(flight))
        const t = flight - k
        const peak = bounceHeight(state, k + 1) * scale
        ballX = xs[k] + t * (xs[k + 1] - xs[k])
        ballY = floor - 10 - Math.sin(t * Math.PI) * peak
    }
    const controls = (
        <>
            <Segmented label={l(say('Hasierako altuera (cm)', 'Altura inicial (cm)', 'الارتفاع الأولي (سم)', 'Starting height (cm)'))} value={String(state.height)} options={BOUNCE_HEIGHTS.map((height, index) => ({ value: String(index), label: String(height) }))} onChange={(height) => setState((s) => setBounce(s, { height: Number(height) }))} />
            <Segmented label={l(say('Arrazoia r', 'Razón r', 'الأساس r', 'Ratio r'))} value={String(state.ratio)} options={BOUNCE_RATIOS.map(([num, den], index) => ({ value: String(index), label: `${num}/${den}` }))} onChange={(ratio) => setState((s) => setBounce(s, { ratio: Number(ratio) }))} />
            <Stepper label={l(say('Errebotea n', 'Bote n', 'الارتداد n', 'Bounce n'))} value={state.n} min={1} max={BOUNCE_N_MAX} onChange={(n) => setState((s) => setBounce(s, { n }))} language={props.language} />
        </>
    )
    const value = bounceHeight(state)
    const exact = Math.abs(value - Math.round(value * 100) / 100) < 1e-9
    const readout = (
        <Predict
            language={props.language}
            question={say(`Emaitza ikusi aurretik: ${state.n}. errebotean, hasierako altueraren erdia baino gehiago igoko da?`, `Antes de ver el resultado: en el bote ${state.n}, ¿subirá más de la mitad de la altura inicial?`, `قبل رؤية النتيجة: في الارتداد ${state.n} هل ترتفع أكثر من نصف الارتفاع الأولي؟`, `Before you see the result: on bounce ${state.n}, will it rise more than half the starting height?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Justu erdia', 'Justo la mitad', 'النصف تمامًا', 'Exactly half'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={bouncePrediction(state)}
            choice={state.prediction}
            tip={say(`$r^{${state.n}}=\\left(${fracLatex(p, q)}\\right)^{${state.n}}=${fracLatex(p ** state.n, q ** state.n)}$ alderatu $\\frac{1}{2}$ zenbakiarekin.`, `Compara $r^{${state.n}}=\\left(${fracLatex(p, q)}\\right)^{${state.n}}=${fracLatex(p ** state.n, q ** state.n)}$ con $\\frac{1}{2}$.`, `قارن $r^{${state.n}}=\\left(${fracLatex(p, q)}\\right)^{${state.n}}=${fracLatex(p ** state.n, q ** state.n)}$ بـ $\\frac{1}{2}$.`, `Compare $r^{${state.n}}=\\left(${fracLatex(p, q)}\\right)^{${state.n}}=${fracLatex(p ** state.n, q ** state.n)}$ with $\\frac{1}{2}$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`h_{${state.n}}=${start}\\cdot\\left(${fracLatex(p, q)}\\right)^{${state.n}}`, `h_{${state.n}}${exact ? '=' : '\\approx '}${texDec(value, props.language)}`]} note={l(say('Errebote bakoitzean altuera bider r: progresio geometrikoa.', 'En cada bote la altura se multiplica por r: progresión geométrica.', 'في كل ارتداد يُضرب الارتفاع في r: متتالية هندسية.', 'At each bounce the height is multiplied by r: a geometric progression.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bounceChallenges} extraChallenges={bounceExtra} state={state}>
            <Board height={232} label={l(say(`Pilota ${start} cm-tik, r = ${p}/${q}`, `Pelota desde ${start} cm, r = ${p}/${q}`, `كرة من ${start} سم، r = ${p}/${q}`, `Ball from ${start} cm, r = ${p}/${q}`))}>
                <line x1={14} x2={346} y1={floor} y2={floor} stroke={INK} strokeWidth={2.5} />
                <line x1={14} x2={346} y1={floor - (start / 2) * scale} y2={floor - (start / 2) * scale} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 5" />
                <text x={346} y={floor - (start / 2) * scale - 5} textAnchor="end" fontSize={12} fill={MUTED}>{dec(start / 2, props.language, 1)}</text>
                {xs.map((x, k) => {
                    const height = bounceHeight(state, k) * scale
                    const visible = k === 0 || shown
                    return (
                        <g key={k}>
                            <rect x={x - 7} y={floor - height} width={14} height={height} fill={k === state.n ? SECOND_TINT : STAGE_TINT} stroke={k === state.n ? SECOND : STAGE} strokeWidth={1.3} opacity={visible ? 1 : 0.15} />
                            <text x={x} y={floor + 18} textAnchor="middle" fontSize={12} fill={MUTED}>{k}</text>
                            {visible && <text x={k === 0 ? x + 12 : x} y={k === 0 ? floor - height + 12 : floor - height - 6} textAnchor={k === 0 ? 'start' : 'middle'} fontSize={12} fontWeight={700} fill={k === state.n ? SECOND : STAGE}>{dec(bounceHeight(state, k), props.language, 1)}</text>}
                        </g>
                    )
                })}
                {!shown && <Hidden x={xs[state.n]} y={floor - 40} size={22} />}
                <circle cx={ballX} cy={ballY} r={9} fill={MUSTARD} stroke={INK} strokeWidth={1.5} />
            </Board>
            <PlayButton label={l(say('Bota pilota', 'Soltar la pelota', 'أسقط الكرة', 'Drop the ball'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. The bar that never fills up ---------- */

export function EndlessBarTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BarState>(initialBarState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.first}-${state.ratio}`, 3000)
    const pieces = playback.progress === null ? state.pieces : Math.max(1, Math.ceil(playback.progress * BAR_PIECES_MAX))
    const limit = toNumber(barLimit(state))
    const span = Math.max(2, Math.ceil(limit * 1.15 * 2) / 2)
    const x = (value: number) => 24 + (value / span) * 312
    const partial = toNumber(barPartial(state, pieces))
    const [fn, fd] = BAR_FIRSTS[state.first]
    const [rn, rd] = BAR_RATIOS[state.ratio]
    const limitValue = barLimit(state)
    const limitLatex = fracLatex(limitValue.numerator, limitValue.denominator)
    const controls = (
        <>
            <Segmented label={l(say('Lehen gaia a₁', 'Primer término a₁', 'الحد الأول a₁', 'First term a₁'))} value={String(state.first)} options={BAR_FIRSTS.map(([num, den], index) => ({ value: String(index), label: `${num}/${den}` }))} onChange={(first) => setState((s) => setBar(s, { first: Number(first) }))} />
            <Segmented label={l(say('Arrazoia r', 'Razón r', 'الأساس r', 'Ratio r'))} value={String(state.ratio)} options={BAR_RATIOS.map(([num, den], index) => ({ value: String(index), label: `${num}/${den}` }))} onChange={(ratio) => setState((s) => setBar(s, { ratio: Number(ratio) }))} />
            <Stepper label={l(say('Zatiak', 'Trozos', 'القطع', 'Pieces'))} value={state.pieces} min={1} max={BAR_PIECES_MAX} onChange={(next) => setState((s) => setBar(s, { pieces: next }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Emaitza ikusi aurretik: batura infinitua 1 baino handiagoa izango da?', 'Antes de ver el resultado: ¿la suma infinita será mayor que 1?', 'قبل رؤية النتيجة: هل يكون المجموع اللانهائي أكبر من 1؟', 'Before you see the result: will the infinite sum be greater than 1?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Justu 1', 'Justo 1', '1 تمامًا', 'Exactly 1'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={barPrediction(state)}
            choice={state.prediction}
            tip={say('Batura infinitua $\\frac{a_{1}}{1-r}$ da: alderatu $a_{1}$ eta $1-r$.', 'La suma infinita es $\\frac{a_{1}}{1-r}$: compara $a_{1}$ con $1-r$.', 'المجموع اللانهائي $\\frac{a_{1}}{1-r}$: قارن $a_{1}$ بـ $1-r$.', 'The infinite sum is $\\frac{a_{1}}{1-r}$: compare $a_{1}$ with $1-r$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`S=\\frac{${fracLatex(fn, fd)}}{1-${fracLatex(rn, rd)}}=${limitLatex}`, `S_{${pieces}}\\approx ${texDec(partial, props.language, 4)}`]} note={l(say(`Falta dena: ${dec(limit - partial, props.language, 4)}. Zati bakoitzarekin txikiagoa da, baina ez da inoiz zero.`, `Lo que falta: ${dec(limit - partial, props.language, 4)}. Con cada trozo es menor, pero nunca es cero.`, `الباقي: ${dec(limit - partial, props.language, 4)}. يصغر مع كل قطعة لكنه لا يصير صفرًا أبدًا.`, `What is missing: ${dec(limit - partial, props.language, 4)}. It gets smaller with each piece, but it is never zero.`))} />
        </Predict>
    )
    const colours = [STAGE_TINT, MUSTARD_TINT, SECOND_TINT, '#d9efe2']
    // Where each piece starts and how long it is, laid end to end
    const lengths = Array.from({ length: pieces }, (_, k) => toNumber(barPiece(state, k + 1)))
    const starts = lengths.map((_, k) => lengths.slice(0, k).reduce((sum, length) => sum + length, 0))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={barChallenges} extraChallenges={barExtra} state={state}>
            <Board height={170} label={l(say(`${pieces} zati: a₁ = ${fn}/${fd}, r = ${rn}/${rd}`, `${pieces} trozos: a₁ = ${fn}/${fd}, r = ${rn}/${rd}`, `${pieces} قطع: a₁ = ${fn}/${fd} و r = ${rn}/${rd}`, `${pieces} pieces: a₁ = ${fn}/${fd}, r = ${rn}/${rd}`))}>
                <rect x={x(0)} y={60} width={x(span) - x(0)} height={36} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
                {lengths.map((length, k) => <rect key={k} x={x(starts[k])} y={60} width={Math.max(0.6, x(starts[k] + length) - x(starts[k]))} height={36} fill={colours[k % colours.length]} stroke={INK} strokeWidth={1} />)}
                {Array.from({ length: Math.round(span * 2) + 1 }, (_, i) => i / 2).map((tick) => (
                    <g key={tick}>
                        <line x1={x(tick)} x2={x(tick)} y1={100} y2={108} stroke={INK} strokeWidth={1.2} />
                        <text x={x(tick)} y={124} textAnchor="middle" fontSize={12} fill={MUTED}>{dec(tick, props.language, 1)}</text>
                    </g>
                ))}
                <line x1={x(1)} x2={x(1)} y1={46} y2={110} stroke={INK} strokeWidth={2} />
                {shown && (
                    <g>
                        <line x1={x(limit)} x2={x(limit)} y1={36} y2={110} stroke={GREEN} strokeWidth={2.5} />
                        <text x={x(limit)} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={GREEN}>{`S = ${limitValue.numerator}/${limitValue.denominator}`}</text>
                    </g>
                )}
                <Label x={180} y={154} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{`${l(say('Batura', 'Suma', 'المجموع', 'Sum'))}: ${dec(partial, props.language, 4)}`}</Label>
            </Board>
            <PlayButton label={l(say('Gehitu zatiak', 'Añadir trozos', 'أضف القطع', 'Add pieces'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
