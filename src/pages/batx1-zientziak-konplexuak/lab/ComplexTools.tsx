import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Prediction.css'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, SECOND, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../text'
import { argumentOf, complexLatex, complexPlain, modulus, type Complex } from './complex'
import { imageOf, initialPlaneState, PLANE_LIMIT, planeChallenges, planeExtra, planePrediction, setPlane, setPlanePrediction, type PlaneShow, type PlaneState, type Quadrant } from './plane'
import { firstQuadrantCount, initialRootsState, radiusOf, ROOT_LIMITS, ROOT_MODULI, rootArguments, rootModulus, rootsChallenges, rootsExtra, rootsPrediction, setRoots, type RootsState } from './roots'
import { initialTurnState, MULTIPLIERS, multiplierOf, productOf, setTurn, stretch, TURN_LIMIT, turnAngle, turnChallenges, turnExtra, turnPrediction, type TurnState } from './turn'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — the three tools of this
   unit: the complex plane (z with its opposite or its conjugate, its
   modulus and its argument), multiplying is turning (z · w turns z by the
   argument of w and stretches it by |w|) and the roots make a polygon
   (the n n-th roots of w on a circle). Each asks for a prediction before
   it shows the result, and each moves with ▶. Logic in plane.ts, turn.ts
   and roots.ts.
   ========================================================================== */

const D = Math.PI / 180
type Point = [number, number]
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(degrees * D), cy - r * Math.sin(degrees * D)]
/** A number on a board, with two decimals at most and a true minus sign */
const num = (value: number, language: UnitLanguage) => dec(value, language, 2).replace(/^-/, '−')
/** An angle in degrees for LaTeX: 33{,}69° */
const texDegrees = (value: number, language: UnitLanguage) => `${texDec(value, language, 2)}°`
/** The decimal point of a number written by complexLatex or complexPlain, as each language writes it */
const decimals = (text: string, language: UnitLanguage, latex: boolean) => (language === 'en' || language === 'ar' ? text : text.replace(/(\d)\.(\d)/g, latex ? '$1{,}$2' : '$1,$2'))
/** = for a value with no decimals, ≈ otherwise */
const equalsOrNear = (value: number, language: UnitLanguage) => (Math.abs(value * 100 - Math.round(value * 100)) < 1e-9 ? `=${texDec(value, language, 2)}` : `\\approx ${texDec(value, language, 2)}`)

/** An arc at v from screen angle `from` to `to` (degrees, counterclockwise when to > from) */
function Arc({ v, r, from, to, color, width = 2.4 }: { v: Point; r: number; from: number; to: number; color: string; width?: number }) {
    if (Math.abs(to - from) < 0.5) return null
    if (Math.abs(to - from) >= 359.5) return <circle cx={v[0]} cy={v[1]} r={r} fill="none" stroke={color} strokeWidth={width} />
    const [a, b] = to > from ? [from, to] : [to, from]
    const start = polar(v, r, a)
    const end = polar(v, r, b)
    const large = b - a > 180 ? 1 : 0
    return <path d={`M${start[0].toFixed(1)} ${start[1].toFixed(1)} A${r} ${r} 0 ${large} 0 ${end[0].toFixed(1)} ${end[1].toFixed(1)}`} fill="none" stroke={color} strokeWidth={width} />
}

/** A grid of whole units around o, with the axes called Re and Im */
function Grid({ o, unit, limit }: { o: Point; unit: number; limit: number }) {
    const values = Array.from({ length: 2 * limit + 1 }, (_, index) => index - limit)
    const far = limit * unit
    return (
        <g>
            {values.map((value) => (
                <g key={value}>
                    <line x1={o[0] + value * unit} y1={o[1] - far} x2={o[0] + value * unit} y2={o[1] + far} stroke="#e3ddd0" strokeWidth={1} />
                    <line x1={o[0] - far} y1={o[1] - value * unit} x2={o[0] + far} y2={o[1] - value * unit} stroke="#e3ddd0" strokeWidth={1} />
                </g>
            ))}
            <line x1={o[0] - far - 8} y1={o[1]} x2={o[0] + far + 8} y2={o[1]} stroke={MUTED} strokeWidth={1.4} />
            <line x1={o[0]} y1={o[1] + far + 8} x2={o[0]} y2={o[1] - far - 8} stroke={MUTED} strokeWidth={1.4} />
            <text x={o[0] + far + 8} y={o[1] + 14} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>Re</text>
            <text x={o[0] + 5} y={o[1] - far - 1} fontSize={12} fontWeight={700} fill={MUTED}>Im</text>
            {[-limit, limit].map((value) => <text key={`x${value}`} x={o[0] + value * unit} y={o[1] + 14} textAnchor="middle" fontSize={11} fill={MUTED}>{value < 0 ? `−${-value}` : value}</text>)}
            {[-limit, limit].map((value) => <text key={`y${value}`} x={o[0] - 5} y={o[1] - value * unit + 4} textAnchor="end" fontSize={11} fill={MUTED}>{value < 0 ? `−${-value}i` : `${value}i`}</text>)}
        </g>
    )
}

/** A prediction with its own choices (the quadrants), with the same look as the other predictions */
function ChoicePredict<Choice extends string | number>({ language, question, options, actual, choice, tip, onChoose, children }: {
    language: UnitLanguage
    question: LocalizedText
    options: Array<{ value: Choice; label: LocalizedText }>
    actual: Choice
    choice: Choice | null
    tip: LocalizedText
    onChoose: (choice: Choice) => void
    children: ReactNode
}) {
    const l = useLabText(language)
    const right = choice === actual
    return (
        <>
            <div className="prediction">
                <p className="prediction-question"><MathText text={l(question)} /></p>
                <div className="prediction-options" role="group" aria-label={l(say('Zure iragarpena', 'Tu predicción', 'توقّعك', 'Your prediction'))}>
                    {options.map((option) => (
                        <button type="button" key={option.value} aria-pressed={choice === option.value} className={choice === null ? '' : option.value === actual ? 'right' : option.value === choice ? 'wrong' : ''} disabled={choice !== null} onClick={() => onChoose(option.value)}>
                            {l(option.label)}
                        </button>
                    ))}
                </div>
                {choice !== null && (
                    <p className={`prediction-feedback ${right ? 'right' : 'wrong'}`} aria-live="polite">
                        <strong>{right ? l(say('Ondo pentsatuta!', '¡Bien pensado!', 'أحسنت التفكير!', 'Good thinking!')) : l(say('Ez da horrela.', 'No es así.', 'ليس كذلك.', 'That’s not right.'))}</strong>{' '}
                        <MathText text={l(tip)} />
                    </p>
                )}
            </div>
            {choice === null ? <p className="prediction-wait">{l(say('Iragarri lehenik; gero ikusiko duzu emaitza.', 'Primero predice; después verás el resultado.', 'توقّع أولًا، ثم سترى النتيجة.', 'First predict; then you will see the result.'))}</p> : children}
        </>
    )
}

/** |z| = √(a² + b²) for LaTeX, with its value */
function modulusLine(z: Complex, language: UnitLanguage) {
    const square = (value: number) => (value < 0 ? `(${value})^2` : `${value}^2`)
    const value = modulus(z)
    const inside = z[0] ** 2 + z[1] ** 2
    const root = Number.isInteger(value) ? `=${value}` : `=\\sqrt{${inside}}\\approx ${texDec(value, language, 2)}`
    return `|{z}|=\\sqrt{${square(z[0])}+${square(z[1])}}${root}`
}

/* ---------- L1. The complex plane ---------- */

const QUADRANTS: Array<{ value: Quadrant; label: LocalizedText }> = [
    { value: 1, label: say('1.a', '1.º', 'الأول', '1st') },
    { value: 2, label: say('2.a', '2.º', 'الثاني', '2nd') },
    { value: 3, label: say('3.a', '3.º', 'الثالث', '3rd') },
    { value: 4, label: say('4.a', '4.º', 'الرابع', '4th') },
    { value: 0, label: say('Ardatzean', 'Eje', 'محور', 'Axis') }
]

export function PlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlaneState>(initialPlaneState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a}-${state.b}-${state.show}`, 1400)
    const z: Complex = [state.a, state.b]
    const image = imageOf(state)
    const opposite = state.show === 'opposite'
    // ▶ moves z to its image; the state does not change
    const t = shown && playback.progress !== null ? playback.progress : 1
    const moving: Complex = [z[0] + (image[0] - z[0]) * t, z[1] + (image[1] - z[1]) * t]
    const O: Point = [180, 132]
    const u = 26
    const point = (value: Complex): Point => [O[0] + value[0] * u, O[1] - value[1] * u]
    const P = point(z)
    const Q = point(moving)
    const angle = argumentOf(z)
    const color = opposite ? SECOND : GREEN
    const name = opposite ? '-{z}' : '\\overline{z}'
    const lines = [
        `{z}=${complexLatex(z)}\\qquad ${name}=${complexLatex(image)}`,
        modulusLine(z, props.language),
        ...(angle === null ? [] : [`\\alpha${equalsOrNear(angle, props.language)}°`])
    ]
    const note = opposite
        ? say('Aurkakoa jatorriarekiko simetrikoa da: bi zeinuak aldatzen dira, eta argumentuari 180° batzen zaizkio.', 'El opuesto es simétrico respecto al origen: cambian los dos signos y el argumento suma 180°.', 'المعاكس متناظر بالنسبة إلى الأصل: تتغير الإشارتان وتزيد العمدة 180°.', 'The opposite is symmetric about the origin: both signs change and the argument goes up by 180°.')
        : say('Konjokatua ardatz errealarekiko simetrikoa da: zati irudikariaren zeinua bakarrik aldatzen da, eta modulua berdina da.', 'El conjugado es simétrico respecto al eje real: solo cambia el signo de la parte imaginaria, y el módulo es el mismo.', 'المرافق متناظر بالنسبة إلى المحور الحقيقي: تتغير إشارة الجزء التخيلي فقط وتبقى الطويلة نفسها.', 'The conjugate is symmetric about the real axis: only the sign of the imaginary part changes, and the modulus is the same.')
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={-PLANE_LIMIT} max={PLANE_LIMIT} onChange={(a) => setState((s) => setPlane(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={-PLANE_LIMIT} max={PLANE_LIMIT} onChange={(b) => setState((s) => setPlane(s, { b }))} language={props.language} />
            <Segmented<PlaneShow> label={l(say('Ikusi', 'Ver', 'اعرض', 'Show'))} value={state.show} options={[{ value: 'conjugate', label: l(say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate')) }, { value: 'opposite', label: l(say('Aurkakoa', 'Opuesto', 'المعاكس', 'Opposite')) }]} onChange={(show) => setState((s) => setPlane(s, { show }))} />
        </>
    )
    const asked = opposite ? say('aurkakoa', 'el opuesto', 'المعاكس', 'the opposite') : say('konjokatua', 'el conjugado', 'المرافق', 'the conjugate')
    const readout = (
        <ChoicePredict<Quadrant>
            language={props.language}
            question={say(`Ikusi aurretik: zein koadrantetan dago ${'${z}'}$ zenbakiaren ${asked.eu}?`, `Antes de verlo: ¿en qué cuadrante cae ${asked.es} de ${'${z}'}$?`, `قبل أن ترى: في أي ربع يقع ${asked.ar} للعدد ${'${z}'}$؟`, `Before you see it: which quadrant does ${asked.en} of ${'${z}'}$ fall in?`)}
            options={QUADRANTS}
            actual={planePrediction(state)}
            choice={state.prediction}
            tip={opposite
                ? say('Aurkakoak bi zeinuak aldatzen ditu: koadrante aurrez aurrekoan geratzen da.', 'El opuesto cambia los dos signos: queda en el cuadrante de enfrente.', 'المعاكس يغيّر الإشارتين: يقع في الربع المقابل.', 'The opposite changes both signs: it ends up in the facing quadrant.')
                : say('Konjokatuak zati irudikariaren zeinua bakarrik aldatzen du: goitik behera edo behetik gora pasatzen da.', 'El conjugado cambia solo el signo de la parte imaginaria: pasa de arriba abajo o de abajo arriba.', 'المرافق يغيّر إشارة الجزء التخيلي فقط: ينتقل من الأعلى إلى الأسفل أو العكس.', 'The conjugate changes only the sign of the imaginary part: it goes from top to bottom or from bottom to top.')}
            onChoose={(prediction) => setState((s) => setPlanePrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </ChoicePredict>
    )
    const imagePoint = point(image)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={planeChallenges} extraChallenges={planeExtra} state={state}>
            <Board height={268} label={l(say(`z = ${complexPlain(z)} planoan, eta haren ${asked.eu}`, `z = ${complexPlain(z)} en el plano, y ${asked.es}`, `z = ${complexPlain(z)} في المستوى، و${asked.ar}`, `z = ${complexPlain(z)} on the plane, and ${asked.en}`))}>
                <Grid o={O} unit={u} limit={PLANE_LIMIT} />
                {angle !== null && <Arc v={O} r={16} from={0} to={angle} color={STAGE} />}
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={STAGE} strokeWidth={2.6} />
                <circle cx={P[0]} cy={P[1]} r={5} fill={STAGE} />
                <text x={6} y={16} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">{`z = ${complexPlain(z)}`}</text>
                {shown ? (
                    <g>
                        <line x1={P[0]} y1={P[1]} x2={imagePoint[0]} y2={imagePoint[1]} stroke={color} strokeWidth={1.6} strokeDasharray="5 4" />
                        <circle cx={Q[0]} cy={Q[1]} r={5} fill={color} />
                        <text x={6} y={33} fontSize={13} fontWeight={700} fill={color} direction="ltr">
                            {opposite ? '−z' : <tspan textDecoration="overline">z</tspan>}
                            {` = ${complexPlain(image)}`}
                        </text>
                    </g>
                ) : <Hidden x={330} y={36} size={22} />}
            </Board>
            <PlayButton label={l(opposite ? say('Eraman aurkakora', 'Llévalo al opuesto', 'انقله إلى المعاكس', 'Take it to the opposite') : say('Eraman konjokatura', 'Llévalo al conjugado', 'انقله إلى المرافق', 'Take it to the conjugate'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. Multiplying is turning ---------- */

export function TurnTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TurnState>(initialTurnState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a}-${state.b}-${state.w}`, 1800)
    const z: Complex = [state.a, state.b]
    const w = multiplierOf(state)
    const product = productOf(state)
    const beta = turnAngle(state)
    const k = stretch(state)
    const alpha = argumentOf(z)
    const r = modulus(z)
    // ▶ turns z by β and stretches it by |w| at the same time; the state does not change
    const t = shown && playback.progress !== null ? playback.progress : 1
    const O: Point = [180, 140]
    const u = 20
    const point = (value: Complex): Point => [O[0] + value[0] * u, O[1] - value[1] * u]
    const moving = alpha === null ? O : polar(O, r * (1 + (k - 1) * t) * u, alpha + beta * t)
    const P = point(z)
    const lines = [
        `w=${w.latex}\\qquad |w|=${w.modulusLatex}`,
        `\\arg w=${beta}°`,
        `{z}\\cdot w=(${complexLatex(z)})\\cdot ${w.latex.startsWith('-') ? `(${w.latex})` : w.latex}`,
        `=${decimals(complexLatex(product), props.language, true)}`
    ]
    const note = say(
        `${'${z}'}\\cdot w$ zenbakiaren modulua $|{z}|$ bider $|w|$ da, eta argumentua ${'${z}'}$ zenbakiarena gehi ${beta}°.`,
        `El módulo de ${'${z}'}\\cdot w$ es $|{z}|$ por $|w|$, y su argumento, el de ${'${z}'}$ más ${beta}°.`,
        `طويلة ${'${z}'}\\cdot w$ هي $|{z}|$ في $|w|$، وعمدته عمدة ${'${z}'}$ زائد ${beta}°.`,
        `The modulus of ${'${z}'}\\cdot w$ is $|{z}|$ times $|w|$, and its argument that of ${'${z}'}$ plus ${beta}°.`
    )
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={-TURN_LIMIT} max={TURN_LIMIT} onChange={(a) => setState((s) => setTurn(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={-TURN_LIMIT} max={TURN_LIMIT} onChange={(b) => setState((s) => setTurn(s, { b }))} language={props.language} />
            <Stepper label="w" value={state.w} min={0} max={MULTIPLIERS.length - 1} format={(index) => MULTIPLIERS[index].plain} onChange={(next) => setState((s) => setTurn(s, { w: next }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $w=${w.latex}$ zenbakiaz biderkatzean, ${'${z}'}$ zenbakiak 90° baino gutxiago, 90° ala gehiago biratzen du?`, `Antes de verlo: al multiplicar por $w=${w.latex}$, ¿${'${z}'}$ gira menos de 90°, 90° o más?`, `قبل أن ترى: عند الضرب في $w=${w.latex}$، هل يدور ${'${z}'}$ أقل من 90° أم 90° أم أكثر؟`, `Before you see it: multiplying by $w=${w.latex}$, does ${'${z}'}$ turn less than 90°, 90° or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('90°', '90°', '90°', '90°'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={turnPrediction(state)}
            choice={state.prediction}
            tip={say('${z}$ zenbakiak $w$ zenbakiaren argumentua biratzen du: $i$ zenbakiarena 90° da, $-1$ zenbakiarena 180° eta $1+i$ zenbakiarena 45°.', '${z}$ gira el argumento de $w$: el de $i$ es 90°, el de $-1$ es 180° y el de $1+i$, 45°.', 'يدور ${z}$ بمقدار عمدة $w$: عمدة $i$ هي 90° و$-1$ هي 180° و$1+i$ هي 45°.', '${z}$ turns by the argument of $w$: that of $i$ is 90°, that of $-1$ is 180° and that of $1+i$ is 45°.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={turnChallenges} extraChallenges={turnExtra} state={state}>
            <Board height={282} label={l(say(`z = ${complexPlain(z)} bider w = ${w.plain}`, `z = ${complexPlain(z)} por w = ${w.plain}`, `z = ${complexPlain(z)} في w = ${w.plain}`, `z = ${complexPlain(z)} times w = ${w.plain}`))}>
                <Grid o={O} unit={u} limit={6} />
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={STAGE} strokeWidth={2.6} />
                <circle cx={P[0]} cy={P[1]} r={5} fill={STAGE} />
                <text x={6} y={16} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">{`z = ${complexPlain(z)}`}</text>
                <text x={6} y={33} fontSize={13} fontWeight={700} fill={INK} direction="ltr">{`w = ${w.plain}`}</text>
                {shown && alpha !== null ? (
                    <g>
                        <Arc v={O} r={24} from={alpha} to={alpha + beta * t} color={GREEN} width={2.6} />
                        <line x1={O[0]} y1={O[1]} x2={moving[0]} y2={moving[1]} stroke={GREEN} strokeWidth={2.6} />
                        <circle cx={moving[0]} cy={moving[1]} r={5} fill={GREEN} />
                        <text x={6} y={50} fontSize={13} fontWeight={700} fill={GREEN} direction="ltr">{`z · w = ${decimals(complexPlain(product), props.language, false)}`}</text>
                    </g>
                ) : <Hidden x={330} y={36} size={22} />}
            </Board>
            <PlayButton label={l(say('Biratu eta luzatu', 'Gira y estira', 'أدِر ومدّ', 'Turn and stretch'))} disabled={!shown || alpha === null} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The roots make a polygon ---------- */

export function RootsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RootsState>(initialRootsState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.n}-${state.m}-${state.theta}`, 2000)
    const R = radiusOf(state)
    const r = rootModulus(state)
    const angles = rootArguments(state)
    // ▶ makes the roots appear one by one; the state does not change
    const visible = shown && playback.progress !== null ? Math.max(1, Math.ceil(playback.progress * state.n)) : state.n
    const O: Point = [150, 140]
    const radius = 96
    const points = angles.map((angle) => polar(O, radius, angle))
    const index = state.n === 2 ? '\\sqrt' : `\\sqrt[${state.n}]`
    const step = 360 / state.n
    const rows: string[] = []
    for (let start = 0; start < angles.length; start += 3) rows.push(angles.slice(start, start + 3).map((angle) => `${Number.isInteger(r) ? r : texDec(r, props.language, 2)}_{${texDegrees(angle, props.language)}}`).join('\\quad '))
    const lines = [
        `w=${R}_{${state.theta}°}\\qquad r=${index}{${R}}${equalsOrNear(r, props.language)}`,
        `\\frac{${state.theta}°+360°\\cdot k}{${state.n}}=${texDegrees(state.theta / state.n, props.language)}+${texDegrees(step, props.language)}\\cdot k`,
        ...rows
    ]
    const count = firstQuadrantCount(state)
    const note = say(
        `${state.n} erroak ${texDec(step, 'eu', 2).replace('{,}', ',')}° banatzen dira: poligono erregular baten erpinak dira. Lehen koadrantearen barruan: ${count}.`,
        `Las ${state.n} raíces se separan ${texDec(step, 'es', 2).replace('{,}', ',')}°: son los vértices de un polígono regular. Dentro del primer cuadrante: ${count}.`,
        `تفصل بين الجذور الـ ${state.n} زاوية ${texDec(step, 'ar', 2)}°: إنها رؤوس مضلع منتظم. داخل الربع الأول: ${count}.`,
        `The ${state.n} roots are ${texDec(step, 'en', 2).replace('{,}', '.')}° apart: they are the vertices of a regular polygon. Inside the first quadrant: ${count}.`
    )
    const controls = (
        <>
            <Stepper label="n" value={state.n} min={ROOT_LIMITS.n.min} max={ROOT_LIMITS.n.max} onChange={(n) => setState((s) => setRoots(s, { n }))} language={props.language} />
            <Stepper label="|w|" value={state.m} min={0} max={ROOT_MODULI.length - 1} format={(value) => String(ROOT_MODULI[value])} onChange={(m) => setState((s) => setRoots(s, { m }))} language={props.language} />
            <Stepper label="arg w" value={state.theta} min={ROOT_LIMITS.theta.min} max={ROOT_LIMITS.theta.max} step={ROOT_LIMITS.theta.step} format={(value) => `${value}°`} onChange={(theta) => setState((s) => setRoots(s, { theta }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $w=${R}_{${state.theta}°}$ zenbakiaren ${state.n} erroetatik, zenbat daude lehen koadrantearen barruan?`, `Antes de verlo: de las ${state.n} raíces de $w=${R}_{${state.theta}°}$, ¿cuántas caen dentro del primer cuadrante?`, `قبل أن ترى: من الجذور الـ ${state.n} للعدد $w=${R}_{${state.theta}°}$، كم جذرًا يقع داخل الربع الأول؟`, `Before you see it: of the ${state.n} roots of $w=${R}_{${state.theta}°}$, how many fall inside the first quadrant?`)}
            labels={{ '<': say('Bat ere ez', 'Ninguna', 'لا شيء', 'None'), '=': say('Bat', 'Una', 'جذر واحد', 'One'), '>': say('Bi edo gehiago', 'Dos o más', 'اثنان أو أكثر', 'Two or more') }}
            actual={rootsPrediction(state)}
            choice={state.prediction}
            tip={say(`Lehen erroa ${texDec(state.theta / state.n, 'eu', 2).replace('{,}', ',')}° angeluan dago, eta hurrengoak ${texDec(step, 'eu', 2).replace('{,}', ',')}° geroago. Ardatz batean dagoen erroa ez da barruan zenbatzen.`, `La primera raíz está en ${texDec(state.theta / state.n, 'es', 2).replace('{,}', ',')}° y las siguientes, cada ${texDec(step, 'es', 2).replace('{,}', ',')}°. Una raíz sobre un eje no cuenta como dentro.`, `الجذر الأول عند ${texDec(state.theta / state.n, 'ar', 2)}° والتالية كل ${texDec(step, 'ar', 2)}°. والجذر الواقع على محور لا يُحسب داخله.`, `The first root is at ${texDec(state.theta / state.n, 'en', 2).replace('{,}', '.')}° and the next ones every ${texDec(step, 'en', 2).replace('{,}', '.')}°. A root on an axis does not count as inside.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const shape = points.slice(0, visible)
    const wTip = polar(O, radius + 22, state.theta)
    const wLabel = polar(O, radius + 34, state.theta)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rootsChallenges} extraChallenges={rootsExtra} state={state}>
            <Board height={282} label={l(say(`w = ${R} modulua eta ${state.theta}°: haren ${state.n} erroak zirkunferentzia batean`, `w de módulo ${R} y ${state.theta}°: sus ${state.n} raíces en una circunferencia`, `w طويلته ${R} وعمدته ${state.theta}°: جذوره الـ ${state.n} على دائرة`, `w with modulus ${R} and ${state.theta}°: its ${state.n} roots on a circle`))}>
                <rect x={O[0]} y={O[1] - radius - 12} width={radius + 12} height={radius + 12} fill={STAGE_TINT} opacity={0.45} />
                <line x1={O[0] - radius - 18} y1={O[1]} x2={O[0] + radius + 18} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
                <line x1={O[0]} y1={O[1] + radius + 18} x2={O[0]} y2={O[1] - radius - 18} stroke={MUTED} strokeWidth={1.4} />
                {(state.theta > 30 && state.theta < 330) && <text x={O[0] + radius + 18} y={O[1] + 14} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>Re</text>}
                {(state.theta < 60 || state.theta > 120) && <text x={O[0] + 5} y={O[1] - radius - 8} fontSize={12} fontWeight={700} fill={MUTED}>Im</text>}
                <circle cx={O[0]} cy={O[1]} r={radius} fill="none" stroke={INK} strokeWidth={1.8} />
                <line x1={O[0]} y1={O[1]} x2={wTip[0]} y2={wTip[1]} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                <text x={wLabel[0]} y={wLabel[1] + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>w</text>
                <text x={262} y={20} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">{`n = ${state.n}`}</text>
                <text x={262} y={38} fontSize={13} fontWeight={700} fill={INK} direction="ltr">{`|w| = ${R}`}</text>
                <text x={262} y={56} fontSize={13} fontWeight={700} fill={INK} direction="ltr">{`r = ${num(r, props.language)}`}</text>
                {shown ? (
                    <g>
                        {shape.length > 2 && <polygon points={shape.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill={SECOND} fillOpacity={0.12} stroke={SECOND} strokeWidth={2} />}
                        {shape.length === 2 && <line x1={shape[0][0]} y1={shape[0][1]} x2={shape[1][0]} y2={shape[1][1]} stroke={SECOND} strokeWidth={2} />}
                        {shape.map(([x, y], position) => {
                            const label = polar(O, radius + 14, angles[position])
                            return (
                                <g key={position}>
                                    <circle cx={x} cy={y} r={5} fill={position === 0 ? STAGE : SECOND} />
                                    <text x={label[0]} y={label[1] + 4} textAnchor={Math.cos(angles[position] * D) > 0.3 ? 'start' : Math.cos(angles[position] * D) < -0.3 ? 'end' : 'middle'} fontSize={11} fontWeight={700} fill={position === 0 ? STAGE : SECOND} direction="ltr">{`${num(angles[position], props.language)}°`}</text>
                                </g>
                            )
                        })}
                    </g>
                ) : <Hidden x={O[0]} y={O[1] + 8} size={26} />}
            </Board>
            <PlayButton label={l(say('Erroz erro', 'Raíz a raíz', 'جذرًا جذرًا', 'Root by root'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
