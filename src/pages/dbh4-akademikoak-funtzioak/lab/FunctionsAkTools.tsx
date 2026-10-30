import { useId, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { signed } from '../../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { sampled } from '../../dbh4-aplikatuak-funtzioak/functions'
import {
    CUBIC_LIMIT,
    cubicLatex,
    cubicValue,
    distinctRoots,
    domainFunctionLatex,
    domainPieces,
    domainsChallenges,
    domainsRight,
    initialDomainsState,
    initialJoinState,
    initialParityState,
    initialRootsState,
    joinChallenges,
    joinPresets,
    joinValues,
    K_LIMIT,
    livePieces,
    PARITY_LIMIT,
    parityChallenges,
    parityLatex,
    parityOf,
    parityValue,
    pieceSigns,
    polynomialLatex,
    ROOT_LIMIT,
    rootsChallenges,
    setDomains,
    setJoin,
    setParity,
    setRoot,
    signIntervals,
    togglePiece,
    type DomainKind,
    type DomainsState,
    type JoinState,
    type ParityState,
    type RootsState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'

/** A number for the readouts and steppers: the language's decimal mark (a point in Arabic and English), true minus sign */
const plain = (language: string, value: number) => signed(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
/** The same in LaTeX */
const latexNumber = (language: string, value: number) => {
    const rounded = Math.round(value * 1000) / 1000
    return String(rounded).replace('.', language === 'ar' ? '.' : '{,}')
}

/** Keeps a short formula left to right inside Arabic text */
const ltr = (text: string) => `\u2066${text}\u2069`

/* ---------- Building a domain ---------- */

export function DomainsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const groupId = useId()
    const [state, setState] = useState<DomainsState>(initialDomainsState)
    const { r, t, sign } = state
    const truth = domainPieces(state)
    const live = livePieces(state)
    const n = (value: number) => signed(value)
    const pieceLabels = state.r === state.t
        ? ['', `x = ${n(r)}`, '', '', '']
        : ['', `x = ${n(r)}`, `(${n(r)}, ${n(t)})`, `x = ${n(t)}`, '']
    pieceLabels[0] = `(−∞, ${n(r)})`
    pieceLabels[4] = `(${n(t)}, +∞)`
    const kinds: Array<{ value: DomainKind; label: string }> = [
        { value: 'fraction', label: ltr('1 / P') },
        { value: 'root', label: ltr('√P') },
        { value: 'rootDenominator', label: ltr('1 / √P') }
    ]
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', en: 'Function', ar: 'الدالة' })} value={state.kind} options={kinds} onChange={(kind) => setState((s) => setDomains(s, { kind }))} />
            <Segmented label={l({ eu: 'x²-ren zeinua', es: 'Signo de x²', en: 'Sign of x²', ar: 'إشارة x²' })} value={String(sign)} options={[{ value: '1', label: '+' }, { value: '-1', label: '−' }]} onChange={(value) => setState((s) => setDomains(s, { sign: value === '-1' ? -1 : 1 }))} />
            <Stepper label={l({ eu: 'Lehen erroa', es: 'Primera raíz', en: 'First root', ar: 'الجذر الأول' })} value={r} min={-ROOT_LIMIT} max={ROOT_LIMIT} format={signed} onChange={(value) => setState((s) => setDomains(s, { r: value }))} language={props.language} />
            <Stepper label={l({ eu: 'Bigarren erroa', es: 'Segunda raíz', en: 'Second root', ar: 'الجذر الثاني' })} value={t} min={-ROOT_LIMIT} max={ROOT_LIMIT} format={signed} onChange={(value) => setState((s) => setDomains(s, { t: value }))} language={props.language} />
            <div className="fraction-v2-segmented" role="group" aria-labelledby={groupId}>
                <span id={groupId} className="fraction-v2-stepper-label">{l({ eu: 'Izate-eremuan dago (sakatu)', es: 'Está en el dominio (pulsa)', en: 'It is in the domain (tap)', ar: 'داخل المجال (اضغط)' })}</span>
                <div dir="ltr" style={{ flexWrap: 'wrap' }}>
                    {live.map((piece) => (
                        <button type="button" key={piece} dir="ltr" aria-pressed={state.picks[piece]} onClick={() => setState((s) => togglePiece(s, piece))}>{pieceLabels[piece]}</button>
                    ))}
                </div>
            </div>
        </>
    )
    const signs = pieceSigns(state)
    const signText = (value: number) => (value > 0 ? '+' : value < 0 ? '−' : '0')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${domainFunctionLatex(state)}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$P(x)=${polynomialLatex(state)}$`} /></span>
            <span className="fraction-v2-lab-readout-note" dir="ltr">
                {l({ eu: 'P-ren zeinua', es: 'Signo de P', en: 'Sign of P', ar: 'إشارة P' })}{': '}{live.map((piece) => signText(signs[piece])).join('  ')}
                {domainsRight(state) ? ` · ${l({ eu: 'Izate-eremua ✓', es: 'Dominio ✓', en: 'Domain ✓', ar: 'المجال ✓' })}` : ''}
            </span>
        </>
    )
    const box = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 }
    const p = (x: number) => (sign * (x - r) * (x - t)) / 2
    // Picked intervals as thick bands on the X axis, picked roots as filled dots
    const bands: Array<[number, number, number]> = [[0, box.xMin - 1, r], [2, r, t], [4, t, box.xMax + 1]]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={domainsChallenges} state={state}>
            <Plane box={box} cell={26} yUnit={2} label={l({ eu: 'P-ren grafikoa eta izate-eremua X ardatzean', es: 'La gráfica de P y el dominio sobre el eje X', en: 'The graph of P and the domain on the x-axis', ar: 'رسم P والمجال على محور X' })}>
                {(map) => (
                    <g>
                        <defs><clipPath id={`${groupId}-clip`}><rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} /></clipPath></defs>
                        <PlanePath map={map} points={sampled(p, box.xMin, box.xMax)} color={INK} width={2.4} dashed clip={`url(#${groupId}-clip)`} />
                        {bands.filter(([piece]) => live.includes(piece) && state.picks[piece]).map(([piece, from, to]) => (
                            <line key={piece} x1={map.x(Math.max(box.xMin, from))} y1={map.y(0)} x2={map.x(Math.min(box.xMax, to))} y2={map.y(0)} stroke={truth[piece] ? GREEN : SECOND} strokeWidth={8} strokeLinecap="butt" opacity={0.75} />
                        ))}
                        {[...new Set([r, t])].map((root, index) => {
                            const piece = index === 0 ? 1 : 3
                            return <PlanePoint key={root} map={map} point={[root, 0]} color={state.picks[piece] ? (truth[piece] ? GREEN : SECOND) : SECOND} radius={6} hollow={!state.picks[piece]} />
                        })}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Joining two pieces ---------- */

export function JoinTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<JoinState>(initialJoinState)
    const piece = joinPresets[state.preset]
    const { left, right, jump } = joinValues(state)
    const k = state.k
    const box = { xMin: -3, xMax: 6, yMin: -3, yMax: 9 }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', en: 'Function', ar: 'الدالة' })} value={String(state.preset)} options={joinPresets.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => setJoin(s, { preset: Number(next) }))} />
            <Stepper label="k" value={k} min={-K_LIMIT} max={K_LIMIT} step={0.5} format={(value) => plain(props.language, value)} onChange={(value) => setState((s) => setJoin(s, { k: value }))} language={props.language} />
        </>
    )
    const leftSign = piece.leftCloses ? '\\le' : '<'
    const rightSign = piece.leftCloses ? '>' : '\\ge'
    const cases = `f(x)=\\begin{cases}${piece.leftLatex} & x${leftSign}${piece.at}\\\\ ${piece.rightLatex} & x${rightSign}${piece.at}\\end{cases}`
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${cases}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={l({ eu: `Ezkerra: $${latexNumber(props.language, left)}$ · eskuina: $${latexNumber(props.language, right)}$`, es: `Izquierda: $${latexNumber(props.language, left)}$ · derecha: $${latexNumber(props.language, right)}$`, en: `Left: $${latexNumber(props.language, left)}$ · right: $${latexNumber(props.language, right)}$`, ar: `اليسار: $${latexNumber(props.language, left)}$ · اليمين: $${latexNumber(props.language, right)}$` })} /></span>
            <span className="fraction-v2-lab-readout-note">
                {jump === 0
                    ? l({ eu: 'Jarraitua ✓', es: 'Continua ✓', en: 'Continuous ✓', ar: 'متصلة ✓' })
                    : l({ eu: `Jauzia: ${plain(props.language, jump)}`, es: `Salto: ${plain(props.language, jump)}`, en: `Jump: ${plain(props.language, jump)}`, ar: `القفزة: ${plain(props.language, jump)}` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={joinChallenges} state={state}>
            <Plane box={box} cell={24} label={l({ eu: 'Bi zatiak eta haien lotunea', es: 'Los dos trozos y su unión', en: 'The two pieces and their junction', ar: 'الجزآن ونقطة التقائهما' })}>
                {(map) => {
                    const clip = `url(#join-clip-${state.preset})`
                    return (
                        <g>
                            <defs><clipPath id={`join-clip-${state.preset}`}><rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} /></clipPath></defs>
                            <line x1={map.x(piece.at)} y1={map.y(box.yMin)} x2={map.x(piece.at)} y2={map.y(box.yMax)} stroke={INK} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.5} />
                            <PlanePath map={map} points={sampled((x) => piece.left(x, k), box.xMin, piece.at)} color={STAGE} width={3.6} clip={clip} />
                            <PlanePath map={map} points={sampled((x) => piece.right(x, k), piece.at, box.xMax)} color={GREEN} width={3.6} clip={clip} />
                            {jump === 0
                                ? <PlanePoint map={map} point={[piece.at, left]} color={SECOND} radius={6.5} />
                                : (
                                    <g>
                                        <PlanePoint map={map} point={[piece.at, left]} color={STAGE} radius={6} hollow={!piece.leftCloses} />
                                        <PlanePoint map={map} point={[piece.at, right]} color={GREEN} radius={6} hollow={piece.leftCloses} />
                                    </g>
                                )}
                        </g>
                    )
                }}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- A cubic from its roots ---------- */

export function RootsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RootsState>(initialRootsState)
    const [r, s, t] = state.roots
    const factor = (root: number) => (root === 0 ? 'x' : `(x${root > 0 ? '-' : '+'}${Math.abs(root)})`)
    const d = -r * s * t
    const intervals = signIntervals(state)
    const bound = (value: number | null, side: 'from' | 'to') => (value === null ? (side === 'from' ? '-\\infty' : '+\\infty') : String(value))
    const positive = intervals.filter((item) => item.sign > 0).map((item) => `(${bound(item.from, 'from')},\\,${bound(item.to, 'to')})`).join('\\cup')
    const controls = (
        <>
            {[0, 1, 2].map((index) => (
                <Stepper key={index} label={l({ eu: `${index + 1}. erroa`, es: `Raíz ${index + 1}`, en: `Root ${index + 1}`, ar: `الجذر ${index + 1}` })} value={state.roots[index]} min={-CUBIC_LIMIT} max={CUBIC_LIMIT} format={signed} onChange={(value) => setState((current) => setRoot(current, index, value))} language={props.language} />
            ))}
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$y=${[r, s, t].map(factor).join('')}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${cubicLatex(state)}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Y ardatza: $(0,\\,${d})$ · $f>0$: $${positive}$`, es: `Eje Y: $(0,\\,${d})$ · $f>0$: $${positive}$`, en: `y-axis: $(0,\\,${d})$ · $f>0$: $${positive}$`, ar: `محور Y: $(0,\\,${d})$ · $f>0$: $${positive}$` })} /></span>
        </>
    )
    const box = { xMin: -5, xMax: 5, yMin: -4, yMax: 4 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rootsChallenges} state={state}>
            <Plane box={box} cell={28} yUnit={4} label={l({ eu: 'Kubikoa, haren erroak eta haren zeinua', es: 'La cúbica, sus raíces y su signo', en: 'The cubic, its roots and its sign', ar: 'الدالة التكعيبية وجذورها وإشارتها' })}>
                {(map) => (
                    <g>
                        <defs><clipPath id="roots-clip"><rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} /></clipPath></defs>
                        {intervals.map((item, index) => (
                            <line key={index} x1={map.x(item.from ?? box.xMin)} y1={map.y(0)} x2={map.x(item.to ?? box.xMax)} y2={map.y(0)} stroke={item.sign > 0 ? GREEN : SECOND} strokeWidth={7} opacity={0.55} />
                        ))}
                        <PlanePath map={map} points={sampled((x) => cubicValue(state, x) / 4, box.xMin, box.xMax, 0.02)} color={STAGE} width={3.4} clip="url(#roots-clip)" />
                        {distinctRoots(state).map((root) => <PlanePoint key={root} map={map} point={[root, 0]} color={SECOND} radius={6} />)}
                        {Math.abs(d / 4) <= box.yMax && <PlanePoint map={map} point={[0, d / 4]} color={MUSTARD} radius={6} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Even, odd or neither ---------- */

export function ParityTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParityState>(initialParityState)
    const parity = parityOf(state)
    const mirror = parityLatex({ a: -state.a, b: state.b, c: -state.c, d: state.d }).replace('y=', 'f(-x)=')
    const names = {
        even: l({ eu: 'Bikoitia: f(−x) = f(x)', es: 'Par: f(−x) = f(x)', en: 'Even: f(−x) = f(x)', ar: 'زوجية: f(−x) = f(x)' }),
        odd: l({ eu: 'Bakoitia: f(−x) = −f(x)', es: 'Impar: f(−x) = −f(x)', en: 'Odd: f(−x) = −f(x)', ar: 'فردية: f(−x) = −f(x)' }),
        both: l({ eu: 'Bikoitia eta bakoitia (y = 0)', es: 'Par e impar (y = 0)', en: 'Even and odd (y = 0)', ar: 'زوجية وفردية (y = 0)' }),
        neither: l({ eu: 'Ez bikoitia ez bakoitia', es: 'Ni par ni impar', en: 'Neither even nor odd', ar: 'لا زوجية ولا فردية' })
    }
    const step = (key: keyof ParityState, label: string) => (
        <Stepper label={label} value={state[key]} min={-PARITY_LIMIT} max={PARITY_LIMIT} format={signed} onChange={(value) => setState((s) => setParity(s, { [key]: value }))} language={props.language} />
    )
    const controls = (
        <>
            {step('a', 'x³')}
            {step('b', 'x²')}
            {step('c', 'x')}
            {step('d', l({ eu: 'gai askea', es: 'término independiente', en: 'Constant term', ar: 'الحد الثابت' }))}
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${parityLatex(state)}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${mirror}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{names[parity]}</span>
        </>
    )
    const box = { xMin: -4, xMax: 4, yMin: -5, yMax: 5 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={parityChallenges} state={state}>
            <Plane box={box} cell={28} label={l({ eu: 'Grafikoa (lerro jarraitua) eta haren ispilua Y ardatzean (marratua)', es: 'La gráfica (continua) y su reflejo en el eje Y (discontinua)', en: 'The graph (solid line) and its reflection in the y-axis (dashed line).', ar: 'الرسم (متصل) وانعكاسه في محور Y (متقطع)' })}>
                {(map) => (
                    <g>
                        <defs><clipPath id="parity-clip"><rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} /></clipPath></defs>
                        <PlanePath map={map} points={sampled((x) => parityValue(state, -x), box.xMin, box.xMax, 0.02)} color={SECOND} width={3} dashed clip="url(#parity-clip)" />
                        <PlanePath map={map} points={sampled((x) => parityValue(state, x), box.xMin, box.xMax, 0.02)} color={STAGE} width={3.4} clip="url(#parity-clip)" />
                        {Math.abs(state.d) <= box.yMax && <PlanePoint map={map} point={[0, state.d]} color={INK} radius={4.5} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}
