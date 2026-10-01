import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toLatex, toText } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { LineInterval, LinePoint, RealAxis } from '../realLine'
import { lineMap } from '../realLineMap'
import { commaLatex, contains, decimalKind, divisionRemainders, expansionLatex, generatrixLatex, inequalityLatex, intervalLatex, primeFactors, simplifySqrt, radicalLatex, toScientific } from '../reals'
import {
    DECIMAL_LIMITS,
    INTERVAL_LIMIT,
    POWER_LIMITS,
    RADICAND_LIMITS,
    SCIENTIFIC_LIMIT,
    decimalsChallenges,
    decimalsExpansion,
    generatrixChallenges,
    generatrixExpansion,
    generatrixValue,
    initialDecimalsState,
    initialGeneratrixState,
    initialIntervalsState,
    initialPowersState,
    initialRadicalsState,
    initialRoundingState,
    initialScientificState,
    initialZoomState,
    integersIn,
    intervalOf,
    intervalsChallenges,
    isScientific,
    powerBases,
    powersChallenges,
    powerValue,
    radicalsChallenges,
    roundingChallenges,
    roundingInfo,
    roundingNumbers,
    scientificChallenges,
    scientificMantissa,
    scientificNumbers,
    setDecimals,
    setGeneratrix,
    setIntervals,
    setPowerBase,
    setPowerExponent,
    setRadicand,
    setRounding,
    setScientificExponent,
    setScientificNumber,
    setZoomTarget,
    tapSegment,
    zoomChallenges,
    zoomOut,
    zoomTargets,
    zoomWindow,
    ZOOM_LEVELS,
    type DecimalsState,
    type GeneratrixState,
    type IntervalsState,
    type PowersState,
    type RadicalsState,
    type RoundingState,
    type ScientificState,
    type ZoomState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'

const minus = (text: string) => text.replace(/-/g, '−')
/** A decimal written with the comma, or with the point in Arabic */
const local = (language: string, text: string) => minus(language === 'ar' ? text : text.replace('.', ','))
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

/* ---------- The ladder of powers ---------- */

export function PowersTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PowersState>(initialPowersState)
    const base = powerBases[state.base]
    const value = powerValue(state)
    const exponents = Array.from({ length: POWER_LIMITS.max - POWER_LIMITS.min + 1 }, (_, index) => POWER_LIMITS.max - index)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Oinarria', es: 'Base', ar: 'الأساس' })} value={String(state.base)} options={powerBases.map((item, index) => ({ value: String(index), label: item.label }))} onChange={(next) => setState((s) => setPowerBase(s, Number(next)))} />
            <Stepper label={l({ eu: 'Berretzailea', es: 'Exponente', ar: 'الأس' })} value={state.exponent} min={POWER_LIMITS.min} max={POWER_LIMITS.max} format={(v) => minus(String(v))} onChange={(exponent) => setState((s) => setPowerExponent(s, exponent))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${base.latex}^{${state.exponent}}=${toLatex(value)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.exponent === 0
                    ? l({ eu: 'Berretzailea 0: beti 1.', es: 'Exponente 0: siempre 1.', ar: 'الأس 0: دائمًا 1.' })
                    : state.exponent < 0
                        ? <MathText text={l({ eu: `Berretzaile negatiboa: alderantzizkoa, $\\frac{1}{${base.latex}^{${-state.exponent}}}$.`, es: `Exponente negativo: el inverso, $\\frac{1}{${base.latex}^{${-state.exponent}}}$.`, ar: `أس سالب: المقلوب $\\frac{1}{${base.latex}^{${-state.exponent}}}$.` })} />
                        : l({ eu: `Oinarria ${state.exponent} aldiz biderkatuta.`, es: `La base multiplicada ${state.exponent} veces.`, ar: `الأساس مضروب ${state.exponent} مرات.` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={powersChallenges} state={state}>
            <svg viewBox="0 0 640 150" className="reals-line" role="img" aria-label={`${base.label}^${state.exponent}`}>
                {exponents.map((exponent, index) => {
                    const current = exponent === state.exponent
                    const cell = powerValue({ base: state.base, exponent })
                    const text = minus(toText(cell))
                    return (
                        <g key={exponent}>
                            <rect x={8 + index * 63} y={22} width={58} height={40} rx={9} fill={current ? STAGE : exponent < 0 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={current ? 2.4 : 1.4} />
                            <text x={37 + index * 63} y={48} textAnchor="middle" fontSize={15} fontWeight={700} fill={current ? CARD : INK}>{minus(String(exponent))}</text>
                            <rect x={8 + index * 63} y={70} width={58} height={40} rx={9} fill={CARD} stroke={current ? STAGE : INK} strokeWidth={current ? 2.4 : 1.4} />
                            <text x={37 + index * 63} y={96} textAnchor="middle" fontSize={text.length > 6 ? 11 : 14} fontWeight={700} fill={exponent < 0 ? SECOND : INK}>{text}</text>
                        </g>
                    )
                })}
                <Label x={8} y={14} fontSize={13} fill={MUTED}>{l({ eu: 'berretzailea', es: 'exponente', ar: 'الأس' })}</Label>
                <Label x={632} y={136} textAnchor="end" fontSize={13} fill={MUTED}>{l({ eu: `ezkerretik eskuinera: ${base.label}-z zatitu`, es: `de izquierda a derecha: dividir entre ${base.label}`, ar: `من اليسار إلى اليمين: القسمة على ${base.label}` })}</Label>
            </svg>
        </ToolFrame>
    )
}

/* ---------- From a fraction to its decimal ---------- */

export function DecimalsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DecimalsState>(initialDecimalsState)
    const value = fraction(state.numerator, state.denominator)
    const expansion = decimalsExpansion(state)
    const kind = decimalKind(expansion)
    const remainders = divisionRemainders(value)
    const repeated = remainders.length > 1 && remainders[remainders.length - 1] !== 0 ? remainders[remainders.length - 1] : null
    const steps = remainders.slice(0, 12)
    const factors = primeFactors(value.denominator)
    const kindText = { exact: l({ eu: 'hamartar zehatza', es: 'decimal exacto', ar: 'عشري منتهٍ' }), pure: l({ eu: 'periodiko hutsa', es: 'periódico puro', ar: 'دوري بحت' }), mixed: l({ eu: 'periodiko mistoa', es: 'periódico mixto', ar: 'دوري مختلط' }) }[kind]
    const controls = (
        <>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={state.numerator} min={DECIMAL_LIMITS.numerator.min} max={DECIMAL_LIMITS.numerator.max} onChange={(numerator) => setState((s) => setDecimals(s, { numerator }))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={state.denominator} min={DECIMAL_LIMITS.denominator.min} max={DECIMAL_LIMITS.denominator.max} onChange={(denominator) => setState((s) => setDecimals(s, { denominator }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$\\frac{${state.numerator}}{${state.denominator}}=${expansionLatex(expansion)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {kindText} · {l({ eu: 'izendatzaile laburtezina', es: 'denominador irreducible', ar: 'المقام بعد الاختزال' })}: {value.denominator === 1 ? '1' : `${value.denominator} = ${factors.join(' · ')}`}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={decimalsChallenges} state={state}>
            <div className="reals-lab-table-wrap" dir="ltr">
                <table className="reals-lab-table">
                    <thead>
                        <tr><th scope="col">{l({ eu: 'hondarra', es: 'resto', ar: 'الباقي' })}</th><th scope="col">× 10</th><th scope="col">{l({ eu: 'zifra', es: 'cifra', ar: 'الرقم' })}</th></tr>
                    </thead>
                    <tbody>
                        {steps.filter((remainder) => remainder !== 0).map((remainder, index) => {
                            const isRepeat = repeated !== null && remainder === repeated
                            return (
                                <tr key={index} className={isRepeat ? 'repeat' : ''}>
                                    <td>{remainder}</td>
                                    <td>{remainder * 10}</td>
                                    <td>{Math.floor((remainder * 10) / value.denominator)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p className="functions-lab-caption">
                    {repeated === null
                        ? l({ eu: 'Hondarra 0 izatera iritsi da: zatiketa amaitu da.', es: 'El resto ha llegado a 0: la división termina.', ar: 'وصل الباقي إلى 0: انتهت القسمة.' })
                        : l({ eu: `${repeated} hondarra errepikatu da: hemendik aurrera zifrak errepikatzen dira.`, es: `Se ha repetido el resto ${repeated}: desde ahí las cifras se repiten.`, ar: `تكرر الباقي ${repeated}: ومن هنا تتكرر الأرقام.` })}
                </p>
            </div>
        </ToolFrame>
    )
}

/* ---------- The generating fraction ---------- */

export function GeneratrixTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GeneratrixState>(initialGeneratrixState)
    const expansion = generatrixExpansion(state)
    const value = generatrixValue(state)
    const comma = props.language === 'ar' ? '.' : ','
    const boxes = [
        ...expansion.integer.split('').map((digit) => ({ digit, kind: 'integer' })),
        { digit: comma, kind: 'comma' },
        ...expansion.preperiod.split('').map((digit) => ({ digit, kind: 'pre' })),
        ...expansion.period.split('').map((digit) => ({ digit, kind: 'period' }))
    ]
    const controls = (
        <>
            <Stepper label={l({ eu: 'Zati osoa', es: 'Parte entera', ar: 'الجزء الصحيح' })} value={state.integer} min={0} max={9} onChange={(integer) => setState((s) => setGeneratrix(s, { integer }))} language={props.language} />
            <Segmented label={l({ eu: 'Aurreperiodoko zifrak', es: 'Cifras del anteperiodo', ar: 'أرقام ما قبل الدور' })} value={String(state.preLength)} options={[0, 1, 2].map((length) => ({ value: String(length), label: String(length) }))} onChange={(next) => setState((s) => setGeneratrix(s, { preLength: Number(next) as 0 | 1 | 2 }))} />
            {state.preLength > 0 && <Stepper label={l({ eu: 'Aurreperiodoa', es: 'Anteperiodo', ar: 'ما قبل الدور' })} value={state.pre} min={0} max={10 ** state.preLength - 1} format={(v) => String(v).padStart(state.preLength, '0')} onChange={(pre) => setState((s) => setGeneratrix(s, { pre }))} language={props.language} />}
            <Segmented label={l({ eu: 'Periodoko zifrak', es: 'Cifras del periodo', ar: 'أرقام الدور' })} value={String(state.periodLength)} options={[1, 2].map((length) => ({ value: String(length), label: String(length) }))} onChange={(next) => setState((s) => setGeneratrix(s, { periodLength: Number(next) as 1 | 2 }))} />
            <Stepper label={l({ eu: 'Periodoa', es: 'Periodo', ar: 'الدور' })} value={state.period} min={1} max={10 ** state.periodLength - 1} format={(v) => String(v).padStart(state.periodLength, '0')} onChange={(period) => setState((s) => setGeneratrix(s, { period }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${expansionLatex(expansion)}=${generatrixLatex(expansion)}=${toLatex(value)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: `${'9'.repeat(state.periodLength)}${'0'.repeat(state.preLength)}: 9 bat periodoko zifra bakoitzeko, 0 bat aurreperiodoko bakoitzeko.`, es: `${'9'.repeat(state.periodLength)}${'0'.repeat(state.preLength)}: un 9 por cifra del periodo y un 0 por cifra del anteperiodo.`, ar: `${'9'.repeat(state.periodLength)}${'0'.repeat(state.preLength)}: 9 لكل رقم في الدور و0 لكل رقم قبله.` })}</span>
        </>
    )
    const width = 52
    const start = 320 - (boxes.length * width) / 2
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={generatrixChallenges} state={state}>
            <svg viewBox="0 0 640 150" className="reals-line" role="img" aria-label={expansionLatex(expansion)}>
                {boxes.map((box, index) => {
                    const x = start + index * width
                    if (box.kind === 'comma') return <text key={index} x={x + width / 2} y={86} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK}>{box.digit}</text>
                    const fill = box.kind === 'pre' ? STAGE_TINT : box.kind === 'period' ? MUSTARD_TINT : CARD
                    return (
                        <g key={index}>
                            <rect x={x + 3} y={44} width={width - 6} height={56} rx={9} fill={fill} stroke={INK} strokeWidth={1.6} />
                            <text x={x + width / 2} y={82} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>{box.digit}</text>
                        </g>
                    )
                })}
                {(() => {
                    const first = boxes.findIndex((box) => box.kind === 'period')
                    const x0 = start + first * width + 8
                    const x1 = start + boxes.length * width - 8
                    return <line x1={x0} x2={x1} y1={34} y2={34} stroke={SECOND} strokeWidth={4} />
                })()}
                <text x={start + boxes.length * width + 12} y={82} fontSize={22} fill={MUTED}>…</text>
                <Label x={20} y={130} fontSize={14} fontWeight={700} fill={STAGE}>{l({ eu: '■ aurreperiodoa', es: '■ anteperiodo', ar: '■ ما قبل الدور' })}</Label>
                <Label x={220} y={130} fontSize={14} fontWeight={700} fill={MUSTARD}>{l({ eu: '■ periodoa', es: '■ periodo', ar: '■ الدور' })}</Label>
            </svg>
        </ToolFrame>
    )
}

/* ---------- Zooming in on the real line ---------- */

export function ZoomTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ZoomState>(initialZoomState)
    const target = zoomTargets[state.target]
    const { low, width } = zoomWindow(state)
    const places = state.digits.length + 1
    const map = lineMap(low, low + width, 40, 600, 96)
    const fmt = (value: number) => local(props.language, value.toFixed(state.digits.length))
    const segmentWidth = (map.x1 - map.x0) / 10
    const tap = (segment: number) => setState((s) => tapSegment(s, segment))
    const controls = (
        <>
            <Segmented label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })} value={String(state.target)} options={zoomTargets.map((item, index) => ({ value: String(index), label: item.label }))} onChange={(next) => setState((s) => setZoomTarget(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={state.digits.length === 0} onClick={() => setState(zoomOut)}>{l({ eu: 'Urrundu', es: 'Alejar', ar: 'تصغير' })}</button>
                <button type="button" disabled={state.digits.length === 0} onClick={() => setState((s) => setZoomTarget(s, s.target))}>{l({ eu: 'Hasieratik', es: 'Desde el principio', ar: 'من البداية' })}</button>
            </div>
            <p className="fraction-v2-lab-tip">{state.digits.length >= ZOOM_LEVELS ? l({ eu: 'Lau zoom: nahikoa. Irrazional batek ez du inoiz amaitzen.', es: 'Cuatro zooms: suficiente. Un irracional no termina nunca.', ar: 'أربعة تكبيرات: يكفي. العدد غير النسبي لا ينتهي أبدًا.' }) : l({ eu: 'Sakatu zenbakia dagoen zatia.', es: 'Pulsa el tramo donde está el número.', ar: 'اضغط الجزء الذي فيه العدد.' })}</p>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${target.latex}\\in\\left[${commaLatex(low.toFixed(state.digits.length))};\\ ${commaLatex((low + width).toFixed(state.digits.length))}\\right]$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.miss !== null
                    ? l({ eu: `Ez dago ${state.miss}. zatian. Begiratu puntu gorria.`, es: `No está en el tramo ${state.miss}. Mira el punto rojo.`, ar: `ليس في الجزء ${state.miss}. انظر إلى النقطة الحمراء.` })
                    : l({ eu: `Zabalera: ${local(props.language, String(width))}. Hurrengo hamartarra: ${places}. zifra.`, es: `Anchura: ${local(props.language, String(width))}. Siguiente decimal: cifra ${places}.ª`, ar: `العرض: ${local(props.language, String(width))}. الرقم العشري التالي: الرقم ${places}.` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zoomChallenges} state={state}>
            <svg viewBox="0 0 640 170" className="reals-line" role="img" aria-label={l({ eu: 'Zuzen erreala, zoomarekin', es: 'Recta real con zoom', ar: 'المستقيم الحقيقي مع التكبير' })}>
                {Array.from({ length: 10 }, (_, segment) => (
                    <rect
                        key={segment}
                        x={map.x0 + segment * segmentWidth}
                        y={60}
                        width={segmentWidth}
                        height={72}
                        fill={state.miss === segment ? 'var(--coral-tint, #f8ddd5)' : segment % 2 === 0 ? STAGE_TINT : CARD}
                        opacity={0.75}
                        style={{ cursor: state.digits.length < ZOOM_LEVELS ? 'pointer' : 'default' }}
                        onClick={() => tap(segment)}
                        role="button"
                        aria-label={`${segment}`}
                    />
                ))}
                <RealAxis map={map} step={width / 10} labelEvery={10} arabic={props.language === 'ar'} fontSize={16} />
                {Array.from({ length: 9 }, (_, index) => <text key={index} x={map.x0 + (index + 1) * segmentWidth} y={map.y + 28} textAnchor="middle" fontSize={13} fill={MUTED}>{index + 1}</text>)}
                <text x={map.x0} y={map.y + 28} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{fmt(low)}</text>
                <text x={map.x1} y={map.y + 28} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{fmt(low + width)}</text>
                <LinePoint map={map} value={target.value} name={target.label} />
                {state.digits.length >= ZOOM_LEVELS && <text x={320} y={160} textAnchor="middle" fontSize={15} fill={GREEN} fontWeight={700}>{local(props.language, `${target.label} ≈ ${(Math.floor(target.value * 10 ** ZOOM_LEVELS) / 10 ** ZOOM_LEVELS).toFixed(ZOOM_LEVELS)}…`)}</text>}
                <text x={320} y={24} textAnchor="middle" fontSize={14} fill={MUTED}>{`× ${10 ** state.digits.length}`}</text>
            </svg>
        </ToolFrame>
    )
}

/* ---------- Intervals ---------- */

export function IntervalsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<IntervalsState>(initialIntervalsState)
    const value = intervalOf(state)
    const inside = contains(value, state.probe)
    const count = integersIn(value)
    const map = lineMap(-INTERVAL_LIMIT - 1, INTERVAL_LIMIT + 1, 40, 600, 70)
    const leftOptions = [{ value: 'closed', label: '[' }, { value: 'open', label: '(' }, { value: 'infinite', label: '−∞' }]
    const rightOptions = [{ value: 'closed', label: ']' }, { value: 'open', label: ')' }, { value: 'infinite', label: '+∞' }]
    const controls = (
        <>
            <Segmented label={l({ eu: 'Ezkerreko muturra', es: 'Extremo izquierdo', ar: 'الطرف الأيسر' })} value={state.infiniteFrom ? 'infinite' : state.closedFrom ? 'closed' : 'open'} options={leftOptions} onChange={(next) => setState((s) => setIntervals(s, { infiniteFrom: next === 'infinite', closedFrom: next === 'closed' }))} />
            {!state.infiniteFrom && <Stepper label="a" value={state.from} min={-INTERVAL_LIMIT} max={INTERVAL_LIMIT - 1} format={(v) => minus(String(v))} onChange={(from) => setState((s) => setIntervals(s, { from }))} language={props.language} />}
            <Segmented label={l({ eu: 'Eskuineko muturra', es: 'Extremo derecho', ar: 'الطرف الأيمن' })} value={state.infiniteTo ? 'infinite' : state.closedTo ? 'closed' : 'open'} options={rightOptions} onChange={(next) => setState((s) => setIntervals(s, { infiniteTo: next === 'infinite', closedTo: next === 'closed' }))} />
            {!state.infiniteTo && <Stepper label="b" value={state.to} min={-INTERVAL_LIMIT + 1} max={INTERVAL_LIMIT} format={(v) => minus(String(v))} onChange={(to) => setState((s) => setIntervals(s, { to }))} language={props.language} />}
            <Stepper label={l({ eu: 'Probatu zenbaki bat: x', es: 'Prueba un número: x', ar: 'جرّب عددًا: x' })} value={state.probe} min={-INTERVAL_LIMIT - 1} max={INTERVAL_LIMIT + 1} step={0.5} format={(v) => local(props.language, String(v))} onChange={(probe) => setState((s) => setIntervals(s, { probe }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${intervalLatex(value)}\\qquad ${inequalityLatex(value)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={localLatex(props.language, `$x=${commaLatex(String(state.probe))}\\ ${inside ? '\\in' : '\\notin'}\\ ${intervalLatex(value)}$`)} />
                {' · '}
                {count === null ? l({ eu: 'infinitu zenbaki oso', es: 'infinitos enteros', ar: 'عدد لا نهائي من الأعداد الصحيحة' }) : l({ eu: `${count} zenbaki oso`, es: `${count} números enteros`, ar: `${count} أعداد صحيحة` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={intervalsChallenges} state={state}>
            <svg viewBox="0 0 640 130" className="reals-line" role="img" aria-label={intervalLatex(value)}>
                <RealAxis map={map} arabic={props.language === 'ar'} />
                <LineInterval map={map} value={value} />
                <LinePoint map={map} value={state.probe} name="x" color={inside ? GREEN : SECOND} radius={6} />
            </svg>
        </ToolFrame>
    )
}

/* ---------- Truncating and rounding ---------- */

export function RoundingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RoundingState>(initialRoundingState)
    const number = roundingNumbers[state.number]
    const info = roundingInfo(state)
    const unit = 10 ** -state.places
    const low = Number(info.truncated)
    const map = lineMap(low, low + unit, 60, 580, 92)
    const error = (value: number) => local(props.language, value.toFixed(Math.min(8, state.places + 4)).replace(/0+$/, '').replace(/\.$/, ''))
    const controls = (
        <>
            <Segmented label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })} value={String(state.number)} options={roundingNumbers.map((item, index) => ({ value: String(index), label: props.language === 'ar' ? item.label.replace(',', '.') : item.label }))} onChange={(next) => setState((s) => setRounding(s, { number: Number(next) }))} />
            <Stepper label={l({ eu: 'Hamartar kopurua', es: 'Número de decimales', ar: 'عدد المنازل العشرية' })} value={state.places} min={0} max={4} onChange={(places) => setState((s) => setRounding(s, { places }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-note"><strong>{l({ eu: 'Trunkatuta', es: 'Truncado', ar: 'مبتورًا' })}:</strong> {local(props.language, info.truncated)} · E<sub>a</sub> = {error(info.truncatedError)} · E<sub>r</sub> = {error(info.truncatedError / info.real)}</span>
            <span className="fraction-v2-lab-readout-note"><strong>{l({ eu: 'Biribilduta', es: 'Redondeado', ar: 'مقرّبًا' })}:</strong> {local(props.language, info.rounded)} · E<sub>a</sub> = {error(info.roundedError)} · E<sub>r</sub> = {error(info.roundedError / info.real)}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={roundingChallenges} state={state}>
            <svg viewBox="0 0 640 150" className="reals-line" role="img" aria-label={`${number.label}: ${info.truncated} / ${info.rounded}`}>
                <RealAxis map={map} step={unit / 10} labelEvery={10} arabic={props.language === 'ar'} fontSize={15} />
                <line x1={map.x((2 * low + unit) / 2)} x2={map.x((2 * low + unit) / 2)} y1={map.y - 30} y2={map.y + 10} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" />
                <LinePoint map={map} value={info.real} name={props.language === 'ar' ? number.label.replace(',', '.') : number.label} />
                <circle cx={map.x(Number(info.rounded))} cy={map.y} r={11} fill="none" stroke={GREEN} strokeWidth={3} />
                <Label x={map.x(Number(info.rounded))} y={map.y + 50} textAnchor="middle" fontSize={14} fontWeight={700} fill={GREEN}>{l({ eu: 'biribildua', es: 'redondeo', ar: 'التقريب' })}</Label>
                <Label x={map.x0} y={map.y - 22} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{l({ eu: 'trunkatua', es: 'truncado', ar: 'المبتور' })}</Label>
            </svg>
        </ToolFrame>
    )
}

/* ---------- Scientific notation ---------- */

export function ScientificTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ScientificState>(initialScientificState)
    const item = scientificNumbers[state.number]
    const mantissa = scientificMantissa(state)
    const ok = isScientific(state)
    const target = toScientific(item.text)
    const grouped = (text: string) => local(props.language, text.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/(\.\d*)/, (decimals) => decimals.replace(/ /g, '')))
    const controls = (
        <>
            <Segmented label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })} value={String(state.number)} options={scientificNumbers.map((entry, index) => ({ value: String(index), label: l(entry.what) }))} onChange={(next) => setState((s) => setScientificNumber(s, Number(next)))} />
            <Stepper label={l({ eu: '10en berretzailea', es: 'Exponente de 10', ar: 'أس العدد 10' })} value={state.exponent} min={-SCIENTIFIC_LIMIT} max={SCIENTIFIC_LIMIT} format={(v) => minus(String(v))} onChange={(exponent) => setState((s) => setScientificExponent(s, exponent))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${commaLatex(mantissa)}\\cdot 10^{${state.exponent}}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {ok
                    ? l({ eu: 'Idazkera zientifikoa: komaren aurretik zifra bakarra, ez zero. ✓', es: 'Notación científica: una sola cifra, distinta de cero, delante de la coma. ✓', ar: 'ترميز علمي: رقم واحد غير الصفر قبل الفاصلة. ✓' })
                    : Number(mantissa) >= 10
                        ? l({ eu: 'Zenbakia 10 edo handiagoa da: igo berretzailea.', es: 'El número es 10 o más: sube el exponente.', ar: 'العدد 10 أو أكثر: ارفع الأس.' })
                        : l({ eu: 'Zenbakia 1 baino txikiagoa da: jaitsi berretzailea.', es: 'El número es menor que 1: baja el exponente.', ar: 'العدد أصغر من 1: أنقص الأس.' })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={scientificChallenges} state={state}>
            <div className="reals-scientific">
                <p className="reals-scientific-original" dir="ltr">{grouped(item.text)}</p>
                <p className={`reals-scientific-now ${ok ? 'ok' : ''}`} dir="ltr">{local(props.language, mantissa)} · 10<sup>{minus(String(state.exponent))}</sup></p>
                {ok && <p className="functions-lab-caption" dir="ltr">{local(props.language, target.mantissa)} · 10<sup>{minus(String(target.exponent))}</sup> = {grouped(item.text)}</p>}
            </div>
        </ToolFrame>
    )
}

/* ---------- Radicals ---------- */

export function RadicalsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RadicalsState>(initialRadicalsState)
    const factors = primeFactors(state.n)
    const { outside, inside } = simplifySqrt(state.n)
    // Group the factors: pairs go out, the rest stays inside
    const groups: Array<{ factor: number; pair: boolean }> = []
    const counts = new Map<number, number>()
    for (const factor of factors) counts.set(factor, (counts.get(factor) ?? 0) + 1)
    for (const [factor, count] of counts) {
        for (let pair = 0; pair < Math.floor(count / 2); pair += 1) groups.push({ factor, pair: true })
        if (count % 2 === 1) groups.push({ factor, pair: false })
    }
    const powersLatex = [...counts].map(([factor, count]) => (count === 1 ? String(factor) : `${factor}^{${count}}`)).join('\\cdot ')
    const controls = (
        <>
            <Stepper label={l({ eu: 'Errokizuna (±1)', es: 'Radicando (±1)', ar: 'ما تحت الجذر (±1)' })} value={state.n} min={RADICAND_LIMITS.min} max={RADICAND_LIMITS.max} onChange={(n) => setState((s) => setRadicand(s, n))} language={props.language} />
            <Stepper label={l({ eu: 'Errokizuna (±10)', es: 'Radicando (±10)', ar: 'ما تحت الجذر (±10)' })} value={state.n} min={RADICAND_LIMITS.min} max={RADICAND_LIMITS.max} step={10} onChange={(n) => setState((s) => setRadicand(s, n))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\sqrt{${state.n}}=\\sqrt{${powersLatex}}=${radicalLatex(outside, inside)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {inside === 1
                    ? l({ eu: 'Karratu perfektua: erroa osorik ateratzen da.', es: 'Cuadrado perfecto: la raíz sale entera.', ar: 'مربع كامل: يخرج الجذر كله.' })
                    : outside === 1
                        ? l({ eu: 'Ez dago bikoterik: ezin da sinplifikatu, eta irrazionala da.', es: 'No hay parejas: no se puede simplificar, y es irracional.', ar: 'لا أزواج: لا يمكن التبسيط وهو غير نسبي.' })
                        : l({ eu: `${outside} kanpora, ${inside} barruan.`, es: `${outside} sale fuera y ${inside} se queda dentro.`, ar: `يخرج ${outside} ويبقى ${inside} في الداخل.` })}
            </span>
        </>
    )
    const chip = 92
    const start = 320 - (groups.length * chip) / 2
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={radicalsChallenges} state={state}>
            <svg viewBox="0 0 640 170" className="reals-line" role="img" aria-label={`√${state.n} = ${outside}√${inside}`}>
                <path d={`M${start - 34} 70 l10 -6 l14 40 l18 -78 H${start + groups.length * chip + 10}`} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
                {groups.map((group, index) => (
                    <g key={index}>
                        <rect x={start + index * chip + 4} y={42} width={chip - 8} height={46} rx={11} fill={group.pair ? MUSTARD_TINT : CARD} stroke={group.pair ? MUSTARD : INK} strokeWidth={2} />
                        <text x={start + index * chip + chip / 2} y={72} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{group.pair ? `${group.factor} · ${group.factor}` : group.factor}</text>
                        <text x={start + index * chip + chip / 2} y={124} textAnchor="middle" fontSize={18} fontWeight={700} fill={group.pair ? SECOND : STAGE}>{group.pair ? `↓ ${group.factor}` : '·'}</text>
                    </g>
                ))}
                <text x={320} y={158} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>{inside === 1 ? `√${state.n} = ${outside}` : `√${state.n} = ${outside === 1 ? '' : outside}√${inside}`}</text>
            </svg>
        </ToolFrame>
    )
}
