import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { numberLatex } from '../../batx1-zientziak-integralak/lab/numbers'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { CONSTANTS_BASES, CONSTANTS_CASES, CONSTANTS_LIMITS, constantsChallenges, constantsExtra, constantsPrediction, curveAt, curveLatex, initialConstantsState, rightSlope, setConstants, slopeAt, target, throughPoint, type ConstantsState } from './constants'
import { denominatorLatex, FRACTION_CASES, FRACTION_LIMITS, fractionA, fractionB, fractionChallenges, fractionExtra, fractionMatches, fractionPrediction, initialFractionState, integralLatex, pieces, piecesLatex, rational, rationalLatex, setFraction, type FractionState } from './fractions'
import { initialPartsState, maxSteps, PARTS_INTEGRANDS, PARTS_SETUP, partsChallenges, partsExtra, partsPrediction, setParts, type PartsChoice, type PartsIntegrand, type PartsState } from './parts'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — the three tools of
   this unit: choose u and dv, partial fractions and two constants. Each
   asks for a guess before it shows the result. The boards carry numbers
   and formulas only (the svg is left to right); the words go in the
   readout. The helpers (curvePath, Grid, useClip) are copies of those of
   Integralak 1.º, which does not export them. Logic in parts.ts,
   fractions.ts and constants.ts.
   ========================================================================== */

const BLUE = '#2f6fdb'
const RED = '#c4432a'
const VIOLET = '#7b52c7'
const GRID_LINE = '#e6dfd2'

/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 2) => dec(value, language, digits).replace('-', '−')
const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** Board text with the trigonometric names of the language (sen in Spanish) */
const named = (text: string, language: UnitLanguage) => (language === 'es' ? text.replace(/\bsin\b/g, 'sen') : text)

/** A curve as an SVG path, broken where it leaves the band */
function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number], step = 0.02): string {
    const [low, high] = yLimit
    const margin = (high - low) / 2
    let path = ''
    let open = false
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        if (!Number.isFinite(y) || y < low - margin || y > high + margin) {
            open = false
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
    }
    return path
}

/** A light grid with the axes and the numbers every `xStep` / `yStep` units */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number }) {
    const xs = Array.from({ length: Math.floor(xMax) - Math.ceil(xMin) + 1 }, (_, i) => Math.ceil(xMin) + i)
    const ys = Array.from({ length: Math.floor(yMax) - Math.ceil(yMin) + 1 }, (_, i) => Math.ceil(yMin) + i)
    const axisY = Y(Math.min(yMax, Math.max(yMin, 0)))
    const axisX = X(Math.min(xMax, Math.max(xMin, 0)))
    return (
        <g>
            <rect x={X(xMin)} y={Y(yMax)} width={X(xMax) - X(xMin)} height={Y(yMin) - Y(yMax)} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke={GRID_LINE} strokeWidth={1} />)}
            {ys.filter((y) => y % yStep === 0).map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke={GRID_LINE} strokeWidth={1} />)}
            <line x1={X(xMin)} x2={X(xMax)} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => x !== 0 && x % xStep === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={axisY + 14} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(x)}</text>)}
            {ys.filter((y) => y !== 0 && y % yStep === 0).map((y) => <text key={`ty${y}`} x={axisX - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/** A clip path for a plotting area, so that curves stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

/** A formula on the board, left to right, with a light halo so that it reads over the grid */
const BoardText = ({ x, y, children, color = INK, anchor = 'start', size = 14 }: { x: number; y: number; children: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} paintOrder="stroke" stroke={PAPER} strokeWidth={4} strokeLinejoin="round">{children}</text>
)

const SIGN_LABELS = {
    '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'),
    '=': say('Zero', 'Cero', 'صفر', 'Zero'),
    '>': say('Positiboa', 'Positivo', 'موجب', 'Positive')
}

/* ---------- L1. Choose u and dv ---------- */

const OUTCOME_LABELS = {
    '<': say('Errazagoa', 'Más fácil', 'أسهل', 'Easier'),
    '=': say('Berdina', 'Igual', 'مثله', 'The same'),
    '>': say('Zailagoa', 'Más difícil', 'أصعب', 'Harder')
}
const OUTCOME_COLORS = { '<': GREEN, '=': VIOLET, '>': RED }

export function PartsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PartsState>(initialPartsState)
    const setup = PARTS_SETUP[state.integrand]
    const choice = state.choice
    const shown = choice !== null && state.prediction !== null
    const branch = choice === null ? null : setup.branches[choice]
    const top = choice === null ? 1 : maxSteps(state.integrand, choice)
    const choose = (value: PartsChoice) => setState((s) => setParts(s, { choice: value }))
    const factorName = (index: 0 | 1) => named(setup.board[index], props.language)
    const controls = (
        <>
            <Segmented<PartsIntegrand> label={l(say('Integrala', 'Integral', 'التكامل', 'Integral'))} value={state.integrand} options={PARTS_INTEGRANDS.map((id) => ({ value: id, label: named(`${PARTS_SETUP[id].board[0]} · ${PARTS_SETUP[id].board[1]}`, props.language) }))} onChange={(integrand) => setState((s) => setParts(s, { integrand }))} />
            <Segmented<'none' | '0' | '1'> label={l(say('u =', 'u =', 'u =', 'u ='))} value={choice === null ? 'none' : choice === 0 ? '0' : '1'} options={[{ value: '0', label: factorName(0) }, { value: '1', label: factorName(1) }]} onChange={(value) => value !== 'none' && choose(value === '0' ? 0 : 1)} />
            <Stepper label={l(say('Zatika aplikatu: aldiz', 'Partes aplicadas: veces', 'مرات تطبيق التجزئة', 'Times parts is applied'))} value={state.steps} min={1} max={top} onChange={(value) => setState((s) => setParts(s, { steps: value }))} language={props.language} />
        </>
    )
    const loc = (latex: string) => localize(props.language, latex)
    const outcome = branch?.outcome ?? '<'
    const notes = {
        '<': say('Integral berria errazagoa da: polinomioaren maila jaitsi egin da edo logaritmoa desagertu da. Jarraitu integral berehalako bat izan arte.', 'La integral nueva es más fácil: ha bajado el grado del polinomio o ha desaparecido el logaritmo. Sigue hasta llegar a una inmediata.', 'التكامل الجديد أسهل: نزلت درجة كثير الحدود أو اختفى اللوغاريتم. تابع حتى تصل إلى تكامل مباشر.', 'The new integral is easier: the degree of the polynomial went down or the logarithm disappeared. Go on until you reach a basic one.'),
        '>': say('Integral berria zailagoa da: maila igo egin da. Aukeratu beste faktorea u gisa.', 'La integral nueva es más difícil: el grado ha subido. Elige el otro factor como u.', 'التكامل الجديد أصعب: ارتفعت الدرجة. اختر العامل الآخر u.', 'The new integral is harder: the degree went up. Choose the other factor as u.'),
        '=': say('Integral berria mota berekoa da. Aplikatu berriro, u mota bera hartuta: hasierako I itzultzen da, eta askatu egiten da.', 'La integral nueva es del mismo tipo. Aplica otra vez con el mismo tipo de u: vuelve la I de partida, y se despeja.', 'التكامل الجديد من النوع نفسه. طبّق مرة أخرى بالنوع نفسه من u: يعود I الأصلي ونجده.', 'The new integral is of the same kind. Apply again with the same kind of u: the starting I comes back, and you solve for it.')
    }
    // The integral first, then each step as its right-hand side (= …): the lines fit a phone
    const cyclic = branch !== null && branch.lines[0].startsWith('I=')
    const lines = branch === null ? [] : [
        `u=${setup.factors[choice!]}\\qquad ${branch.du}`,
        `dv=${setup.factors[1 - choice!]}\\,dx\\qquad ${branch.v}`,
        `${cyclic ? 'I=' : ''}\\int ${setup.latex}\\,dx`,
        ...branch.lines.slice(0, state.steps),
        ...(state.steps === top && branch.final ? [`${cyclic ? 'I' : ''}=${branch.final}`] : [])
    ].map(loc)
    const readout = choice === null
        ? <Readout latex={[loc(`\\int ${setup.latex}\\,dx`)]} note={l(say('Ukitu faktore bat: hori izango da u, eta bestea dv.', 'Toca un factor: será u, y el otro, dv.', 'المس عاملًا: سيكون u والآخر dv.', 'Tap a factor: it will be u, and the other one dv.'))} />
        : (
            <Predict
                language={props.language}
                question={say(
                    `Ikusi aurretik: $u=${setup.factors[choice]}$ hartuta, $\\int v\\,du$ integral berria errazagoa, berdina ala zailagoa izango da?`,
                    `Antes de verlo: con $u=${setup.factors[choice]}$, ¿la integral nueva $\\int v\\,du$ será más fácil, igual o más difícil?`,
                    `قبل أن ترى: مع $u=${setup.factors[choice]}$ هل سيكون التكامل الجديد $\\int v\\,du$ أسهل أو مثله أو أصعب؟`,
                    `Before you see it: with $u=${setup.factors[choice]}$, will the new integral $\\int v\\,du$ be easier, the same or harder?`
                )}
                labels={OUTCOME_LABELS}
                actual={partsPrediction(state)}
                choice={state.prediction}
                tip={say('Deribatu u: sinplifikatzen da? Eta integratu dv: badakizu?', 'Deriva u: ¿se simplifica? E integra dv: ¿sabes hacerlo?', 'اشتق u: هل يبسط؟ وكامل dv: هل تعرف؟', 'Differentiate u: does it get simpler? And integrate dv: can you?')}
                onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
            >
                <Readout latex={lines} note={l(notes[outcome])} />
            </Predict>
        )
    const chipX = [86, 214]
    const chain = branch?.chain ?? [`${setup.board[0]} · ${setup.board[1]}`]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={partsChallenges} extraChallenges={partsExtra} state={state}>
            <Board height={205} label={l(say(`∫ ${setup.board[0]} · ${setup.board[1]} dx: u eta dv aukeratu, eta integral berriak`, `∫ ${setup.board[0]} · ${setup.board[1]} dx: elegir u y dv, y las integrales nuevas`, `∫ ${setup.board[0]} · ${setup.board[1]} dx: اختيار u و dv والتكاملات الجديدة`, `∫ ${setup.board[0]} · ${setup.board[1]} dx: choosing u and dv, and the new integrals`))}>
                <text x={56} y={58} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK}>∫</text>
                {([0, 1] as const).map((index) => {
                    const isU = choice === index
                    const isDv = choice !== null && choice !== index
                    return (
                        <g key={index} onClick={() => choose(index)} style={{ cursor: 'pointer' }} role="button" aria-label={`u = ${factorName(index)}`}>
                            <rect x={chipX[index]} y={26} width={96} height={44} rx={12} fill={isU ? STAGE_TINT : PAPER} stroke={isU ? STAGE : isDv ? BLUE : INK} strokeWidth={isU || isDv ? 2.6 : 1.6} />
                            <text x={chipX[index] + 48} y={54} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{factorName(index)}</text>
                            {(isU || isDv) && <text x={chipX[index] + 48} y={18} textAnchor="middle" fontSize={14} fontWeight={700} fill={isU ? STAGE : BLUE}>{isU ? 'u' : 'dv'}</text>}
                        </g>
                    )
                })}
                <text x={198} y={54} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>·</text>
                <text x={318} y={54} textAnchor="start" fontSize={17} fontWeight={700} fill={INK}>dx</text>
                {choice !== null && Array.from({ length: state.steps }, (_, i) => {
                    const y = 92 + i * 56
                    const color = OUTCOME_COLORS[outcome]
                    return (
                        <g key={i}>
                            <line x1={180} x2={180} y1={y - 16} y2={y} stroke={MUTED} strokeWidth={1.6} />
                            <path d={`M174 ${y - 6} L180 ${y} L186 ${y - 6}`} fill="none" stroke={MUTED} strokeWidth={1.6} />
                            <rect x={70} y={y + 4} width={220} height={38} rx={10} fill={PAPER} stroke={shown ? color : MUTED} strokeWidth={shown ? 2.4 : 1.4} strokeDasharray={shown ? undefined : '5 4'} />
                            {shown
                                ? <text x={180} y={y + 29} textAnchor="middle" fontSize={16} fontWeight={700} fill={color}>{`∫ ${named(chain[i + 1], props.language)} dx`}</text>
                                : <Hidden x={180} y={y + 31} size={20} />}
                        </g>
                    )
                })}
            </Board>
            <PlayButton label={l(say('Zatika berriro', 'Otra vez por partes', 'بالتجزئة مرة أخرى', 'By parts again'))} disabled={!shown || state.steps >= top} playing={false} onPlay={() => setState((s) => setParts(s, { steps: s.steps + 1 }))} />
        </ToolFrame>
    )
}

/* ---------- L2. Partial fractions ---------- */

export function FractionsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FractionState>(initialFractionState)
    const shown = state.prediction !== null
    const spec = state.spec
    const caseIndex = FRACTION_CASES.findIndex((item) => item === spec || (item.kind === spec.kind && item.a === spec.a && item.b === spec.b && item.A === spec.A && item.B === spec.B))
    const [xMin, xMax, yMin, yMax] = [-4, 4, -6, 6]
    const X = (x: number) => 30 + (x - xMin) * 37.5
    const Y = (y: number) => 30 + (yMax - y) * (200 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 200)
    const A = fractionA(state)
    const B = fractionB(state)
    const matches = fractionMatches(state)
    const half = (value: number) => num(value / 2, props.language, 1)
    const controls = (
        <>
            <Segmented<string> label={l(say('Zatikia', 'Fracción', 'الكسر', 'Fraction'))} value={String(caseIndex < 0 ? 'other' : caseIndex)} options={FRACTION_CASES.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(value) => setState((s) => setFraction(s, { spec: FRACTION_CASES[Number(value)] }))} />
            <Stepper label="A" value={state.halfA} min={FRACTION_LIMITS.half.min} max={FRACTION_LIMITS.half.max} format={half} onChange={(value) => setState((s) => setFraction(s, { halfA: value }))} language={props.language} />
            <Stepper label="B" value={state.halfB} min={FRACTION_LIMITS.half.min} max={FRACTION_LIMITS.half.max} format={half} onChange={(value) => setState((s) => setFraction(s, { halfB: value }))} language={props.language} />
        </>
    )
    const note = matches
        ? say('Batura R funtzioaren gainean dago puntu guztietan: hori da deskonposizioa. Zatiki sinple bakoitza bere aldetik integratzen da.', 'La suma cae encima de R en todos los puntos: esa es la descomposición. Cada fracción simple se integra por separado.', 'المجموع ينطبق على R في كل النقاط: هذا هو التفكيك. ونكامل كل كسر بسيط على حدة.', 'The sum lies on top of R at every point: that is the decomposition. Each partial fraction is integrated on its own.')
        : say('Oraindik ez datoz bat. Estali erro baten faktorea, eta ordeztu x erro horrekin: hori da haren koefizientea.', 'Todavía no coinciden. Tapa el factor de una raíz y sustituye x por esa raíz: ese es su coeficiente.', 'لم يتطابقا بعد. غطِّ عامل جذر وعوّض x بذلك الجذر: هذا معامله.', 'They do not match yet. Cover the factor of one root and put that root in for x: that is its coefficient.')
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Ikusi aurretik: $${rationalLatex(spec)}$ funtzioan, $A$ negatiboa, zero ala positiboa izango da?`,
                `Antes de verlo: en $${rationalLatex(spec)}$, ¿$A$ será negativo, cero o positivo?`,
                `قبل أن ترى: في $${rationalLatex(spec)}$ هل سيكون $A$ سالبًا أو صفرًا أو موجبًا؟`,
                `Before you see it: in $${rationalLatex(spec)}$, will $A$ be negative, zero or positive?`
            )}
            labels={SIGN_LABELS}
            actual={fractionPrediction(state)}
            choice={state.prediction}
            tip={say('Estali $x-a$ faktorea, eta ordeztu $x=a$ gainerakoan.', 'Tapa el factor $x-a$ y sustituye $x=a$ en lo que queda.', 'غطِّ العامل $x-a$ وعوّض $x=a$ في الباقي.', 'Cover the factor $x-a$ and put $x=a$ in what is left.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[rationalLatex(spec), `S(x)=${piecesLatex(spec, A, B)}`, ...(matches ? [integralLatex(spec)] : [])]} note={l(note)} />
        </Predict>
    )
    const roots = spec.kind === 'simple' ? [spec.a, spec.b] : [spec.a]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={fractionChallenges} extraChallenges={fractionExtra} state={state}>
            <Board height={262} label={l(say(`R funtzioaren grafikoa eta A eta B zatikien batura, ${denominatorLatex(spec)} izendatzailearekin`, `La gráfica de R y la suma de las fracciones A y B, con denominador ${denominatorLatex(spec)}`, `منحنى R ومجموع الكسرين A و B بالمقام ${denominatorLatex(spec)}`, `The graph of R and the sum of the fractions A and B, with denominator ${denominatorLatex(spec)}`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={2} />
                {roots.map((root) => <line key={root} x1={X(root)} x2={X(root)} y1={Y(yMax)} y2={Y(yMin)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />)}
                <g clipPath={clip.url}>
                    <path d={curvePath((x) => rational(spec, x), xMin, xMax, X, Y, [yMin, yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={6} strokeOpacity={0.45} strokeLinejoin="round" />
                    {shown && <path d={curvePath((x) => pieces(spec, A, B, x), xMin, xMax, X, Y, [yMin, yMax], 0.01)} fill="none" stroke={VIOLET} strokeWidth={2.4} strokeDasharray={matches ? undefined : '6 4'} strokeLinejoin="round" />}
                </g>
                <BoardText x={34} y={20} color={INK}>{`A = ${half(state.halfA)}`}</BoardText>
                <BoardText x={130} y={20} color={INK}>{`B = ${half(state.halfB)}`}</BoardText>
                {shown
                    ? <BoardText x={326} y={20} anchor="end" color={matches ? GREEN : VIOLET} size={matches ? 18 : 14}>{matches ? '✓' : 'S(x)'}</BoardText>
                    : <Hidden x={316} y={24} size={22} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Two constants ---------- */

export function ConstantsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ConstantsState>(initialConstantsState)
    const shown = state.prediction !== null
    const spec = state.spec
    const caseIndex = CONSTANTS_CASES.findIndex((item) => item.base === spec.base && item.x0 === spec.x0 && item.k1 === spec.k1 && item.k2 === spec.k2)
    const { x0, y0, m } = target(spec)
    const [xMin, xMax, yMin, yMax] = [-3, 3, -6, 8]
    const X = (x: number) => 30 + (x - xMin) * 50
    const Y = (y: number) => 30 + (yMax - y) * (210 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 210)
    const playback = usePlayback(`${caseIndex}-${spec.base}-${spec.x0}-${state.k1}-${state.k2}`, 3000)
    const k2 = playback.progress !== null && playback.progress < 1 ? Math.round(CONSTANTS_LIMITS.k.min + playback.progress * (CONSTANTS_LIMITS.k.max - CONSTANTS_LIMITS.k.min)) : state.k2
    const through = throughPoint(state)
    const slope = rightSlope(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Problema', 'Problema', 'المسألة', 'Problem'))} value={String(caseIndex < 0 ? 'other' : caseIndex)} options={CONSTANTS_CASES.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(value) => setState((s) => setConstants(s, { spec: CONSTANTS_CASES[Number(value)] }))} />
            <Stepper label="k₁" value={state.k1} min={CONSTANTS_LIMITS.k.min} max={CONSTANTS_LIMITS.k.max} format={(value) => minus(value)} onChange={(value) => setState((s) => setConstants(s, { k1: value }))} language={props.language} />
            <Stepper label="k₂" value={state.k2} min={CONSTANTS_LIMITS.k.min} max={CONSTANTS_LIMITS.k.max} format={(value) => minus(value)} onChange={(value) => setState((s) => setConstants(s, { k2: value }))} language={props.language} />
        </>
    )
    const note: LocalizedText = through && slope
        ? say('Kurbak P puntutik pasatzen du eskatutako maldarekin: hori da funtzio bakarra.', 'La curva pasa por P con la pendiente pedida: es la única función.', 'يمر المنحنى بالنقطة P بالميل المطلوب: إنها الدالة الوحيدة.', 'The curve goes through P with the slope asked for: it is the only function.')
        : slope
            ? say('x₀ puntuko malda dagoeneko m da: igo edo jaitsi kurba k₂ konstantearekin.', 'La pendiente en x₀ ya es m: sube o baja la curva con k₂.', 'الميل عند x₀ يساوي m الآن: ارفع المنحنى أو اخفضه بـ k₂.', 'The slope at x₀ is already m: move the curve up or down with k₂.')
            : through
                ? say('P puntutik pasatzen da, baina malda ez da m: aldatu k₁, eta gero doitu berriro k₂.', 'Pasa por P, pero la pendiente no es m: cambia k₁ y luego ajusta otra vez k₂.', 'يمر بـ P لكن الميل ليس m: غيّر k₁ ثم اضبط k₂ من جديد.', 'It goes through P, but the slope is not m: change k₁ and then adjust k₂ again.')
                : say('k₁ konstanteak malda aldatzen du, eta k₂ konstanteak kurba igo edo jaitsi. Lehenik malda.', 'k₁ cambia la pendiente y k₂ sube o baja la curva. Primero la pendiente.', 'k₁ يغيّر الميل و k₂ يرفع المنحنى أو يخفضه. الميل أولًا.', 'k₁ changes the slope and k₂ moves the curve up or down. The slope first.')
    const base = CONSTANTS_BASES[spec.base]
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Ikusi aurretik: $f'(${x0})=${m}$ izateko, $k_1$ negatiboa, zero ala positiboa izango da?`,
                `Antes de verlo: para que $f'(${x0})=${m}$, ¿$k_1$ será negativo, cero o positivo?`,
                `قبل أن ترى: ليكون $f'(${x0})=${m}$ هل سيكون $k_1$ سالبًا أو صفرًا أو موجبًا؟`,
                `Before you see it: for $f'(${x0})=${m}$, will $k_1$ be negative, zero or positive?`
            )}
            labels={SIGN_LABELS}
            actual={constantsPrediction(state)}
            choice={state.prediction}
            tip={say(`Konparatu $m$ eta $${base.latex}$ funtzioaren malda $x=${x0}$ puntuan.`, `Compara $m$ con la pendiente de $${base.latex}$ en $x=${x0}$.`, `قارن $m$ بميل $${base.latex}$ عند $x=${x0}$.`, `Compare $m$ with the slope of $${base.latex}$ at $x=${x0}$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f''(x)=${base.second}`, curveLatex(spec.base, state.k1, state.k2), `f'(${x0})=${numberLatex(slopeAt(spec.base, state.k1, x0))}\\qquad f(${x0})=${numberLatex(curveAt(spec.base, state.k1, state.k2, x0))}`]} note={l(note)} />
        </Predict>
    )
    const stroke = 0.7
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={constantsChallenges} extraChallenges={constantsExtra} state={state}>
            <Board height={262} label={l(say(`f kurba, P(${x0}, ${y0}) puntua eta m = ${m} malda`, `La curva f, el punto P(${x0}, ${y0}) y la pendiente m = ${m}`, `المنحنى f والنقطة P(${x0}, ${y0}) والميل m = ${m}`, `The curve f, the point P(${x0}, ${y0}) and the slope m = ${m}`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={2} />
                <g clipPath={clip.url}>
                    <line x1={X(x0 - stroke)} y1={Y(y0 - m * stroke)} x2={X(x0 + stroke)} y2={Y(y0 + m * stroke)} stroke={RED} strokeWidth={4} strokeLinecap="round" strokeOpacity={0.55} />
                    <path d={curvePath((x) => curveAt(spec.base, state.k1, k2, x), xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <circle cx={X(x0)} cy={Y(y0)} r={5.5} fill={RED} stroke={PAPER} strokeWidth={1.4} />
                <BoardText x={X(x0) + 8} y={Y(y0) - 8} color={RED}>P</BoardText>
                <BoardText x={34} y={20}>{`k₁ = ${minus(state.k1)}`}</BoardText>
                <BoardText x={130} y={20}>{`k₂ = ${minus(k2)}`}</BoardText>
                {shown
                    ? <BoardText x={326} y={20} anchor="end" color={through && slope ? GREEN : MUTED} size={through && slope ? 18 : 14}>{through && slope ? '✓' : `m = ${minus(m)}`}</BoardText>
                    : <Hidden x={316} y={24} size={22} />}
            </Board>
            <PlayButton label={l(say('Ibili familia k₂ aldatuz', 'Recorre la familia con k₂', 'تجوّل في العائلة بتغيير k₂', 'Run through the family with k₂'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
