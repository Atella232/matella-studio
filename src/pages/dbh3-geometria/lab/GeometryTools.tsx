import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, say, SECOND, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { enlargeChallenges, enlargedArea, enlargedPerimeter, enlargeExtra, enlargePrediction, FACTORS, initialEnlargeState, setEnlarge, setEnlargePrediction, SHAPE_SIZES, SHAPES, type EnlargeState, type ShapeId } from './enlarge'
import { angleAt, CENTRAL, initialInscribedState, inscribedAngle, inscribedChallenges, inscribedExtra, inscribedPrediction, onNearArc, pointA, pointB, setInscribed, setInscribedPrediction, type InscribedState } from './inscribed'
import { initialLadderState, LADDER_LENGTHS, ladderChallenges, ladderDrop, ladderExtra, ladderPrediction, ladderTop, setLadder, setLadderPrediction, type LadderState } from './ladder'
import { A, B, C_LIMITS, initialNotableState, NOTABLE_KINDS, notableChallenges, notableExtra, notableLines, notablePlace, notablePoint, notablePrediction, setNotable, setNotablePrediction, type NotableKind, type NotableState } from './notable'

/* ==========================================================================
   Planoko geometria · 3. DBH — the four tools of this unit: the inscribed
   angle, the notable points of a triangle, the ladder against the wall
   and the enlarged copy. Each asks for a prediction before it shows the
   result, and each moves with ▶. Logic in the .ts files next to this one;
   the board, the readout and the prediction come from Segidak 3. DBH.
   Letters and numbers on the boards are SVG text of their own.
   ========================================================================== */

const degrees = (value: number) => `${value}°`

/* ---------- L1. The inscribed angle ---------- */

export function InscribedTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<InscribedState>(initialInscribedState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.central}-${state.p}`, 6000)
    // ▶ takes P once round the circle, starting where it is
    const p = playback.playing ? state.p + (playback.progress ?? 0) * 360 : state.p
    const angle = playback.playing ? angleAt(state.central, p) : inscribedAngle(state)
    const R = 100
    const X = (deg: number) => 180 + R * Math.cos((deg * Math.PI) / 180)
    const Y = (deg: number) => 130 - R * Math.sin((deg * Math.PI) / 180)
    const a = pointA(state.central)
    const b = pointB(state.central)
    const near = onNearArc({ central: state.central, p: ((Math.round(p) % 360) + 360) % 360 })
    const controls = (
        <>
            <Stepper label={l(say('Angelu zentrala', 'Ángulo central', 'الزاوية المركزية', 'Central angle'))} value={state.central} min={CENTRAL.min} max={CENTRAL.max} step={CENTRAL.step} format={degrees} onChange={(central) => setState((s) => setInscribed(s, { central }))} language={props.language} />
            <Stepper label={l(say('P puntuaren posizioa', 'Posición de P', 'موضع P', 'Position of P'))} value={state.p} min={0} max={350} step={10} format={degrees} onChange={(value) => setState((s) => setInscribed(s, { p: value }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P$ puntuko angelua zorrotza, zuzena ala kamutsa izango da?', 'Antes de verlo: ¿el ángulo en $P$ será agudo, recto u obtuso?', 'قبل رؤيتها: هل تكون الزاوية عند $P$ حادة أم قائمة أم منفرجة؟', 'Before you see it: will the angle at $P$ be acute, right or obtuse?')}
            labels={{ '<': say('Zorrotza', 'Agudo', 'حادة', 'Acute'), '=': say('Zuzena', 'Recto', 'قائمة', 'Right'), '>': say('Kamutsa', 'Obtuso', 'منفرجة', 'Obtuse') }}
            actual={inscribedPrediction(state)}
            choice={state.prediction}
            tip={say('Goiko arkuan, $P$ puntuko angelua zentralaren erdia da; beheko arkuan, $180°$ ken erdi hori.', 'En el arco de arriba, el ángulo en $P$ es la mitad del central; en el de abajo, $180°$ menos esa mitad.', 'على القوس العلوي الزاوية عند $P$ نصف المركزية، وعلى السفلي $180°$ ناقص ذلك النصف.', 'On the top arc, the angle at $P$ is half the central one; on the bottom arc, $180°$ minus that half.')}
            onChoose={(prediction) => setState((s) => setInscribedPrediction(s, prediction))}
        >
            <Readout
                latex={near ? [`180°-\\frac{${state.central}°}{2}=${texDec(angle, props.language, 1)}°`] : [`\\frac{${state.central}°}{2}=${texDec(angle, props.language, 1)}°`]}
                note={l(near
                    ? say('$P$ arku hartuan dago: angelua kamutsa da.', '$P$ está en el arco abarcado: el ángulo es obtuso.', '$P$ على القوس المحصور: الزاوية منفرجة.', '$P$ is on the spanned arc: the angle is obtuse.')
                    : say('$P$ mugitu arku berean: angelua ez da aldatzen.', 'Mueve $P$ por el mismo arco: el ángulo no cambia.', 'حرّك $P$ على القوس نفسه: الزاوية لا تتغيّر.', 'Move $P$ along the same arc: the angle does not change.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={inscribedChallenges} extraChallenges={inscribedExtra} state={state}>
            <Board height={260} label={l(say(`Zirkunferentzia: angelu zentrala ${state.central}°`, `Circunferencia: ángulo central ${state.central}°`, `دائرة: الزاوية المركزية ${state.central}°`, `Circle: central angle ${state.central}°`))}>
                <circle cx={180} cy={130} r={R} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                <path d={`M180 130 L${X(a)} ${Y(a)} A ${R} ${R} 0 ${state.central > 180 ? 1 : 0} 0 ${X(b)} ${Y(b)} Z`} fill={MUSTARD_TINT} stroke="none" opacity={0.8} />
                <line x1={180} y1={130} x2={X(a)} y2={Y(a)} stroke={MUSTARD} strokeWidth={2.4} />
                <line x1={180} y1={130} x2={X(b)} y2={Y(b)} stroke={MUSTARD} strokeWidth={2.4} />
                {shown && (
                    <>
                        <line x1={X(p)} y1={Y(p)} x2={X(a)} y2={Y(a)} stroke={SECOND} strokeWidth={2.4} />
                        <line x1={X(p)} y1={Y(p)} x2={X(b)} y2={Y(b)} stroke={SECOND} strokeWidth={2.4} />
                    </>
                )}
                <circle cx={180} cy={130} r={4} fill={INK} />
                {[[a, 'A'], [b, 'B']].map(([deg, name]) => (
                    <g key={name}>
                        <circle cx={X(Number(deg))} cy={Y(Number(deg))} r={5} fill={INK} />
                        <text x={180 + (R + 16) * Math.cos((Number(deg) * Math.PI) / 180)} y={130 - (R + 16) * Math.sin((Number(deg) * Math.PI) / 180) + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{name}</text>
                    </g>
                ))}
                <circle cx={X(p)} cy={Y(p)} r={7} fill={SECOND} stroke={INK} strokeWidth={1.4} />
                <text x={180 + (R + 18) * Math.cos((p * Math.PI) / 180)} y={130 - (R + 18) * Math.sin((p * Math.PI) / 180) + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>P</text>
                <text x={188} y={124} fontSize={13} fontWeight={700} fill={MUSTARD}>{degrees(state.central)}</text>
                {shown ? <text x={20} y={250} fontSize={16} fontWeight={700} fill={SECOND}>{`∠P = ${dec(angle, props.language, 1)}°`}</text> : <Hidden x={30} y={245} />}
            </Board>
            <PlayButton label={l(say('Eraman P bueltan', 'Da la vuelta con P', 'دُر بـ P', 'Take P round'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The notable points ---------- */

const KIND_NAMES: Record<NotableKind, ReturnType<typeof say>> = {
    circumcentre: say('Zirkunzentroa', 'Circuncentro', 'المحيطة', 'Circumcentre'),
    incentre: say('Inzentroa', 'Incentro', 'المحاطة', 'Incentre'),
    centroid: say('Barizentroa', 'Baricentro', 'الثقل', 'Centroid'),
    orthocentre: say('Ortozentroa', 'Ortocentro', 'الارتفاعات', 'Orthocentre')
}

const LINE_NAMES: Record<NotableKind, ReturnType<typeof say>> = {
    circumcentre: say('erdibitzaileak', 'mediatrices', 'المنصّفات العمودية', 'perpendicular bisectors'),
    incentre: say('erdikariak', 'bisectrices', 'منصّفات الزوايا', 'angle bisectors'),
    centroid: say('medianak', 'medianas', 'المتوسطات', 'medians'),
    orthocentre: say('altuerak', 'alturas', 'الارتفاعات', 'altitudes')
}

export function NotableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<NotableState>(initialNotableState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.kind}-${state.c.join(',')}`, 2400)
    const unit = 24
    const X = (x: number) => 30 + (x + 3) * unit
    const Y = (y: number) => 20 + (9 - y) * unit
    const point = notablePoint(state.kind, state.c)
    const lines = notableLines(state.kind, state.c, point)
    const visibleLines = playback.playing ? Math.floor((playback.progress ?? 0) * 3.999) + 1 : 3
    const inView = point[0] >= -3 && point[0] <= 9 && point[1] >= -3 && point[1] <= 9
    const radius = state.kind === 'circumcentre' ? Math.hypot(point[0], point[1]) : state.kind === 'incentre' ? point[1] : 0
    const place = notablePlace(state)
    const controls = (
        <>
            <Segmented label={l(say('Puntua', 'Punto', 'النقطة', 'Point'))} value={state.kind} options={NOTABLE_KINDS.map((kind) => ({ value: kind, label: l(KIND_NAMES[kind]) }))} onChange={(kind) => setState((s) => setNotable(s, { kind: kind as NotableKind }))} />
            <Stepper label={l(say('C erpina: x', 'Vértice C: x', 'الرأس C: x', 'Vertex C: x'))} value={state.c[0]} min={C_LIMITS.x.min} max={C_LIMITS.x.max} onChange={(x) => setState((s) => setNotable(s, { x }))} language={props.language} />
            <Stepper label={l(say('C erpina: y', 'Vértice C: y', 'الرأس C: y', 'Vertex C: y'))} value={state.c[1]} min={C_LIMITS.y.min} max={C_LIMITS.y.max} onChange={(y) => setState((s) => setNotable(s, { y }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Marraztu aurretik: puntua triangeluaren barruan, alde batean ala kanpoan egongo da?', 'Antes de dibujarlo: ¿el punto quedará dentro del triángulo, sobre un lado o fuera?', 'قبل الرسم: هل تقع النقطة داخل المثلث أم على ضلع أم خارجه؟', 'Before it is drawn: will the point be inside the triangle, on a side or outside?')}
            labels={{ '<': say('Barruan', 'Dentro', 'داخله', 'Inside'), '=': say('Alde batean', 'Sobre un lado', 'على ضلع', 'On a side'), '>': say('Kanpoan', 'Fuera', 'خارجه', 'Outside') }}
            actual={notablePrediction(state)}
            choice={state.prediction}
            tip={say('Inzentroa eta barizentroa beti barruan daude. Zirkunzentroa eta ortozentroa kanpora ateratzen dira triangelua kamutsa denean.', 'El incentro y el baricentro siempre están dentro. El circuncentro y el ortocentro salen fuera cuando el triángulo es obtusángulo.', 'مركز الدائرة المحاطة ومركز الثقل داخله دائمًا. ومركز الدائرة المحيطة وملتقى الارتفاعات يخرجان عندما يكون المثلث منفرجًا.', 'The incentre and the centroid are always inside. The circumcentre and the orthocentre go outside when the triangle is obtuse.')}
            onChoose={(prediction) => setState((s) => setNotablePrediction(s, prediction))}
        >
            <Readout
                latex={[`(${texDec(point[0], props.language)}${props.language === 'eu' || props.language === 'es' ? ';' : ','}\\ ${texDec(point[1], props.language)})`]}
                note={l(place === 'inside'
                    ? say(`Hiru ${LINE_NAMES[state.kind].eu} triangeluaren barruan elkartzen dira.`, `Las tres ${LINE_NAMES[state.kind].es} se cortan dentro del triángulo.`, `تتلاقى ${LINE_NAMES[state.kind].ar} الثلاثة داخل المثلث.`, `The three ${LINE_NAMES[state.kind].en} meet inside the triangle.`)
                    : place === 'side'
                        ? say('Puntua triangeluaren ertzean dago.', 'El punto está en el borde del triángulo.', 'النقطة على حافة المثلث.', 'The point is on the edge of the triangle.')
                        : say('Puntua triangelutik kanpo dago: triangelua kamutsa da.', 'El punto está fuera del triángulo: es obtusángulo.', 'النقطة خارج المثلث: المثلث منفرج.', 'The point is outside the triangle: it is obtuse.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={notableChallenges} extraChallenges={notableExtra} state={state}>
            <Board height={340} label={l(say(`Triangelua A(0, 0), B(6, 0), C(${state.c.join(', ')})`, `Triángulo A(0, 0), B(6, 0), C(${state.c.join(', ')})`, `المثلث A(0, 0)، B(6, 0)، C(${state.c.join(', ')})`, `Triangle A(0, 0), B(6, 0), C(${state.c.join(', ')})`))}>
                <defs><clipPath id="geometria-notable-clip"><rect x={X(-3)} y={Y(9)} width={12 * unit} height={12 * unit} /></clipPath></defs>
                {Array.from({ length: 13 }, (_, i) => i - 3).map((value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={Y(9)} y2={Y(-3)} stroke={value === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />
                        <line y1={Y(value)} y2={Y(value)} x1={X(-3)} x2={X(9)} stroke={value === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />
                    </g>
                ))}
                <polygon points={[A, B, state.c].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
                <g clipPath="url(#geometria-notable-clip)">
                    {shown && radius > 0 && <circle cx={X(point[0])} cy={Y(point[1])} r={radius * unit} fill="none" stroke={GREEN} strokeWidth={1.6} strokeDasharray="5 4" />}
                    {shown && lines.slice(0, visibleLines).map(([p, q], index) => <line key={index} x1={X(p[0])} y1={Y(p[1])} x2={X(q[0])} y2={Y(q[1])} stroke={SECOND} strokeWidth={1.8} />)}
                    {shown && inView && !playback.playing && <circle cx={X(point[0])} cy={Y(point[1])} r={6} fill={GREEN} stroke={INK} strokeWidth={1.4} />}
                </g>
                {[[A, 'A'], [B, 'B'], [state.c, 'C']].map(([[x, y], name]) => (
                    <g key={String(name)}>
                        <circle cx={X(Number(x))} cy={Y(Number(y))} r={5} fill={INK} />
                        <text x={X(Number(x)) + (name === 'A' ? -14 : 8)} y={Y(Number(y)) + (name === 'C' ? -8 : 18)} fontSize={16} fontWeight={700} fill={INK}>{String(name)}</text>
                    </g>
                ))}
                {!shown && <Hidden x={X(3)} y={Y(7)} />}
                {shown && !inView && <text x={180} y={334} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{`(${dec(point[0], props.language, 1)}${props.language === 'eu' || props.language === 'es' ? ';' : ','} ${dec(point[1], props.language, 1)}) ↓`}</text>}
            </Board>
            <PlayButton label={l(say('Marraztu zuzenak', 'Dibuja las rectas', 'ارسم المستقيمات', 'Draw the lines'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The ladder ---------- */

export function LadderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LadderState>(initialLadderState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.length}-${state.foot}`, 2600)
    // ▶ lets the ladder slide from its place to the floor
    const foot = playback.playing ? state.foot + (playback.progress ?? 0) * (state.length - 0.3 - state.foot) : state.foot
    const top = ladderTop(state.length, foot)
    const scale = 190 / state.length
    const wall = 300
    const floor = 225
    const controls = (
        <>
            <Segmented label={l(say('Eskailera (m)', 'Escalera (m)', 'السلّم (م)', 'Ladder (m)'))} value={String(state.length)} options={LADDER_LENGTHS.map((length) => ({ value: String(length), label: String(length) }))} onChange={(length) => setState((s) => setLadder(s, { length: Number(length) }))} />
            <Stepper label={l(say('Oina hormatik (m)', 'Pie a la pared (m)', 'القدم عن الجدار (م)', 'Foot from the wall (m)'))} value={state.foot} min={1} max={state.length - 1} onChange={(value) => setState((s) => setLadder(s, { foot: value }))} language={props.language} />
        </>
    )
    const drop = ladderDrop(state)
    const readout = (
        <Predict
            language={props.language}
            question={say('Oina metro bat urrunago eramaten baduzu, goiko muturra metro bat baino gutxiago, metro bat ala gehiago jaitsiko da?', 'Si alejas el pie un metro más, ¿la parte de arriba bajará menos de un metro, un metro o más?', 'إذا أبعدت القدم مترًا آخر، هل ينزل الطرف العلوي أقل من متر أم مترًا أم أكثر؟', 'If you move the foot one more metre out, will the top come down less than a metre, one metre or more?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Metro bat', 'Un metro', 'مترًا', 'One metre'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={ladderPrediction(state)}
            choice={state.prediction}
            tip={say(`Hormatik hurbil gutxi jaisten da; urrun, asko. Hemen: ${dec(drop, props.language)} m.`, `Cerca de la pared baja poco; lejos, mucho. Aquí: ${dec(drop, props.language)} m.`, `قرب الجدار ينزل قليلًا، وبعيدًا كثيرًا. هنا: ${dec(drop, props.language)} م.`, `Near the wall it drops little; far away, a lot. Here: ${dec(drop, props.language)} m.`)}
            onChoose={(prediction) => setState((s) => setLadderPrediction(s, prediction))}
        >
            <Readout
                latex={[`h=\\sqrt{${state.length}^{2}-${state.foot}^{2}}${Number.isInteger(ladderTop(state.length, state.foot)) ? '=' : '\\approx '}${texDec(ladderTop(state.length, state.foot), props.language)}`]}
                note={l(say(`Eskailera hipotenusa da (${state.length} m); horma eta lurra, katetoak.`, `La escalera es la hipotenusa (${state.length} m); la pared y el suelo, los catetos.`, `السلّم هو الوتر (${state.length} م)، والجدار والأرض الضلعان القائمان.`, `The ladder is the hypotenuse (${state.length} m); the wall and the floor are the legs.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={ladderChallenges} extraChallenges={ladderExtra} state={state}>
            <Board height={250} label={l(say(`${state.length} m-ko eskailera, oina ${state.foot} m-ra`, `Escalera de ${state.length} m con el pie a ${state.foot} m`, `سلّم طوله ${state.length} م وقدمه على بعد ${state.foot} م`, `A ${state.length} m ladder with its foot ${state.foot} m out`))}>
                <rect x={wall} y={20} width={22} height={floor - 20} fill="#ece6da" stroke={INK} strokeWidth={1.6} />
                <line x1={20} x2={340} y1={floor} y2={floor} stroke={INK} strokeWidth={2.4} />
                <line x1={wall - foot * scale} y1={floor} x2={wall} y2={floor - top * scale} stroke={MUSTARD} strokeWidth={6} strokeLinecap="round" />
                <path d={`M${wall - 12} ${floor} v-12 h12`} fill="none" stroke={INK} strokeWidth={1.2} />
                <text x={wall - (foot * scale) / 2} y={floor + 20} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{`${dec(foot, props.language, 1)} m`}</text>
                {shown ? <text x={wall - 8} y={floor - (top * scale) / 2} textAnchor="end" fontSize={15} fontWeight={700} fill={SECOND}>{`${dec(top, props.language, 1)} m`}</text> : <Hidden x={wall - 30} y={floor - 90} />}
            </Board>
            <PlayButton label={l(say('Utzi irristatzen', 'Deja que resbale', 'دعه ينزلق', 'Let it slide'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The enlarged copy ---------- */

const SHAPE_LABELS: Record<ShapeId, ReturnType<typeof say>> = {
    rectangle: say('Laukizuzena', 'Rectángulo', 'مستطيل', 'Rectangle'),
    triangle: say('Triangelua', 'Triángulo', 'مثلث', 'Triangle'),
    step: say('Eskailera', 'Escalera', 'درج', 'Step')
}

/** The outline of each shape in grid units, y upwards */
const OUTLINES: Record<ShapeId, Array<[number, number]>> = {
    rectangle: [[0, 0], [4, 0], [4, 2], [0, 2]],
    triangle: [[0, 0], [4, 0], [0, 3]],
    step: [[0, 0], [3, 0], [3, 1], [2, 1], [2, 2], [0, 2]]
}

function Shape({ shape, k, x, y, unit, colour, tint }: { shape: ShapeId; k: number; x: number; y: number; unit: number; colour: string; tint: string }) {
    return <polygon points={OUTLINES[shape].map(([px, py]) => `${x + px * k * unit},${y - py * k * unit}`).join(' ')} fill={tint} stroke={colour} strokeWidth={2.4} strokeLinejoin="round" />
}

export function EnlargeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<EnlargeState>(initialEnlargeState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.shape}-${state.k}`, 1800)
    // ▶ grows the copy from k = 1 to the chosen factor
    const k = playback.playing ? 1 + (playback.progress ?? 0) * (state.k - 1) : state.k
    const unit = 18
    const floor = 210
    const { area, perimeter } = SHAPE_SIZES[state.shape]
    const controls = (
        <>
            <Segmented label={l(say('Irudia', 'Figura', 'الشكل', 'Shape'))} value={state.shape} options={SHAPES.map((shape) => ({ value: shape, label: l(SHAPE_LABELS[shape]) }))} onChange={(shape) => setState((s) => setEnlarge(s, { shape: shape as ShapeId }))} />
            <Segmented label={l(say('Arrazoia k', 'Razón k', 'النسبة k', 'Factor k'))} value={String(state.k)} options={FACTORS.map((factor) => ({ value: String(factor), label: dec(factor, props.language, 1) }))} onChange={(factor) => setState((s) => setEnlarge(s, { k: Number(factor) }))} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: kopiaren azalera jatorrizkoa bider $k=${texDec(state.k, props.language, 1)}$ baino txikiagoa, berdina ala handiagoa izango da?`, `Antes de verlo: ¿el área de la copia será menor, igual o mayor que la original por $k=${texDec(state.k, props.language, 1)}$?`, `قبل رؤيتها: هل تكون مساحة النسخة أصغر من الأصلية في $k=${texDec(state.k, props.language, 1)}$ أم مساوية أم أكبر؟`, `Before you see it: will the copy's area be less than, equal to or more than the original times $k=${texDec(state.k, props.language, 1)}$?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'مساوية', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={enlargePrediction(state)}
            choice={state.prediction}
            tip={say('Karratu txiki bakoitza $k$ aldiz luzeagoa eta $k$ aldiz zabalagoa bihurtzen da: azalera bider $k^{2}$.', 'Cada cuadradito se hace $k$ veces más largo y $k$ veces más ancho: el área va por $k^{2}$.', 'يصير كل مربع صغير أطول $k$ مرة وأعرض $k$ مرة: المساحة في $k^{2}$.', 'Every small square becomes $k$ times longer and $k$ times wider: the area goes by $k^{2}$.')}
            onChoose={(prediction) => setState((s) => setEnlargePrediction(s, prediction))}
        >
            <Readout
                latex={[`P=${perimeter}\\cdot ${texDec(state.k, props.language, 1)}=${texDec(enlargedPerimeter(state), props.language)}`, `A=${area}\\cdot ${texDec(state.k, props.language, 1)}^{2}=${texDec(enlargedArea(state), props.language)}`]}
                note={l(say('Perimetroa bider $k$; azalera bider $k^{2}$.', 'El perímetro, por $k$; el área, por $k^{2}$.', 'المحيط في $k$؛ والمساحة في $k^{2}$.', 'The perimeter, times $k$; the area, times $k^{2}$.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={enlargeChallenges} extraChallenges={enlargeExtra} state={state}>
            <Board height={232} label={l(say(`Kopia, k = ${state.k}`, `Copia con k = ${state.k}`, `نسخة بـ k = ${state.k}`, `Copy with k = ${state.k}`))}>
                {Array.from({ length: 20 }, (_, i) => <line key={`v${i}`} x1={12 + i * unit} x2={12 + i * unit} y1={20} y2={floor} stroke="var(--line, #e6dfd1)" strokeWidth={1} />)}
                {Array.from({ length: 11 }, (_, i) => <line key={`h${i}`} x1={12} x2={354} y1={floor - i * unit} y2={floor - i * unit} stroke="var(--line, #e6dfd1)" strokeWidth={1} />)}
                <Shape shape={state.shape} k={1} x={12 + unit} y={floor} unit={unit} colour={STAGE} tint={STAGE_TINT} />
                {shown ? <Shape shape={state.shape} k={k} x={12 + 6 * unit} y={floor} unit={unit} colour={GREEN} tint={GREEN_TINT} /> : <Hidden x={12 + 12 * unit} y={floor - 60} />}
                <text x={12 + unit} y={floor + 18} fontSize={14} fontWeight={700} fill={STAGE}>k = 1</text>
                {shown && <text x={12 + 6 * unit} y={floor + 18} fontSize={14} fontWeight={700} fill={GREEN}>{`k = ${dec(k, props.language, 1)}`}</text>}
            </Board>
            <PlayButton label={l(say('Handitu', 'Amplía', 'كبّر', 'Enlarge'))} disabled={!shown || state.k === 1} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
