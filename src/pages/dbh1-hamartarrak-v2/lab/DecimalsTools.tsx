import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import {
    alignPair,
    answerPair,
    balanceChallenges,
    balancePairs,
    balanceQuotient,
    balanceTerms,
    bringZero,
    checkComma,
    choosePair,
    commaChallenges,
    commaProduct,
    commaProducts,
    compareChallenges,
    comparePairs,
    divisionChallenges,
    divisionStatus,
    divisionSteps,
    DIVISION_LIMITS,
    exact,
    gridChallenges,
    gridValue,
    initialBalanceState,
    initialCommaState,
    initialCompareState,
    initialDivisionState,
    initialGridState,
    initialPlaceState,
    initialRoundingState,
    initialShiftState,
    initialZoomState,
    moveShift,
    multiplyBoth,
    pickCandidate,
    placeChallenges,
    placedText,
    placeText,
    placeValue,
    PLACE_WEIGHTS,
    resetBalance,
    rightSign,
    roundingCandidates,
    roundingChallenges,
    roundingNumbers,
    roundingPlaces,
    setBalancePair,
    setCommaPlaces,
    setCommaProduct,
    setDivision,
    setGrid,
    setPlaceDigit,
    setRoundingNumber,
    setRoundingPlaces,
    setShiftBase,
    setZoomTarget,
    shiftBases,
    shiftChallenges,
    shiftedText,
    SHIFT_LIMIT,
    stepsNeeded,
    tapSegment,
    targetDigit,
    writeExact,
    zoomChallenges,
    zoomDepth,
    zoomFound,
    zoomOut,
    zoomTargets,
    zoomWindow,
    type BalanceState,
    type CommaState,
    type CompareState,
    type DivisionState,
    type GridState,
    type PlaceState,
    type RoundingState,
    type ShiftState,
    type Sign,
    type ZoomState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const MISS = 'var(--coral-tint, #f8ddd5)'

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
/** A number written with the comma, shown with the point in Arabic */
const local = (language: string, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
const latexOf = (text: string) => text.replace(/,/g, '{,}')

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

/* ---------- 1. The hundredths grid ---------- */

export function GridTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GridState>(initialGridState)
    const value = gridValue(state)
    const text = writeExact({ units: value, places: 2 })
    const cell = 22
    const controls = (
        <>
            <Stepper label={l(say('Zutabeak (hamarrenak)', 'Columnas (décimas)', 'الأعمدة (الأعشار)'))} value={state.tenths} min={0} max={10} onChange={(tenths) => setState((s) => setGrid(s, { tenths }))} language={props.language} />
            <Stepper label={l(say('Lauki solteak (ehunenak)', 'Cuadritos sueltos (centésimas)', 'المربعات المنفردة (الأجزاء من مئة)'))} value={state.hundredths} min={0} max={state.tenths === 10 ? 0 : 10} onChange={(hundredths) => setState((s) => setGrid(s, { hundredths }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(text)}=\\frac{${value}}{100}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l(say(`${state.tenths} hamarren eta ${state.hundredths} ehunen = ${value} ehunen`, `${state.tenths} décimas y ${state.hundredths} centésimas = ${value} centésimas`, `${state.tenths} أعشار و${state.hundredths} أجزاء من مئة = ${value} جزءًا من مئة`))}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gridChallenges} state={state}>
            <Board height={250} label={l(say('Ehun laukiko sareta', 'Cuadrícula de cien cuadritos', 'شبكة من مئة مربع'))}>
                {Array.from({ length: 100 }, (_, index) => {
                    const column = Math.floor(index / 10)
                    const row = index % 10
                    const filled = index < value
                    const loose = filled && column === state.tenths
                    return <rect key={index} x={210 + column * cell} y={10 + row * cell} width={cell} height={cell} fill={filled ? (loose ? SECOND : STAGE) : CARD} fillOpacity={filled ? 0.45 : 1} stroke={INK} strokeWidth={0.8} />
                })}
                <rect x={210} y={10} width={cell * 10} height={cell * 10} fill="none" stroke={INK} strokeWidth={2.4} />
                <text x={110} y={130} textAnchor="middle" fontSize={34} fontWeight={700} fill={STAGE}>{local(props.language, text)}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The place-value board ---------- */

export function PlaceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlaceState>(initialPlaceState)
    const heads = { eu: ['E', 'H', 'U', 'h', 'e', 'm'], es: ['C', 'D', 'U', 'd', 'c', 'm'], ar: ['مئات', 'عشرات', 'آحاد', 'أعشار', 'ج. من مئة', 'ج. من ألف'] }[props.language]
    const weights = ['100', '10', '1', '0,1', '0,01', '0,001']
    const cell = 84
    const x = (index: number) => 40 + index * cell + (index >= 3 ? 20 : 0)
    const parts = state.digits.map((digit, index) => (digit === 0 ? null : writeExact({ units: digit * PLACE_WEIGHTS[index], places: 3 }).replace(/0+$/, '').replace(/,$/, ''))).filter((part): part is string => part !== null)
    const controls = (
        <>
            <p className="fraction-v2-lab-tip">{l(say('Sakatu ▲ edo ▼ zutabe bakoitzean.', 'Pulsa ▲ o ▼ en cada columna.', 'اضغط ▲ أو ▼ في كل عمود.'))}</p>
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState({ digits: [0, 0, 0, 0, 0, 0] })}>{l(say('Hustu', 'Vaciar', 'إفراغ'))}</button>
            </div>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(placeText(state))}${parts.length > 1 ? `=${parts.map(latexOf).join('+')}` : ''}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l(say(`${placeValue(state)} milaren`, `${placeValue(state)} milésimas`, `${placeValue(state)} جزءًا من ألف`))}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={placeChallenges} state={state}>
            <Board height={250} label={l(say('Posizioen taula', 'Tablero de posiciones', 'لوحة المنازل'))}>
                {state.digits.map((digit, index) => (
                    <g key={index}>
                        <rect x={x(index)} y={10} width={cell} height={34} fill={index >= 3 ? STAGE_TINT : CARD} stroke={INK} strokeWidth={1.6} />
                        <Label x={x(index) + cell / 2} y={33} textAnchor="middle" fontSize={props.language === 'ar' ? 13 : 17} fontWeight={700} fill={index >= 3 ? STAGE : INK}>{heads[index]}</Label>
                        <g role="button" aria-label={`+1 ${heads[index]}`} style={{ cursor: 'pointer' }} onClick={() => setState((s) => setPlaceDigit(s, index, s.digits[index] + 1))}>
                            <rect x={x(index)} y={48} width={cell} height={34} fill={CARD} stroke={MUTED} strokeWidth={1} rx={6} />
                            <text x={x(index) + cell / 2} y={72} textAnchor="middle" fontSize={18} fill={STAGE}>▲</text>
                        </g>
                        <rect x={x(index)} y={86} width={cell} height={64} fill={CARD} stroke={INK} strokeWidth={1.8} />
                        <text x={x(index) + cell / 2} y={132} textAnchor="middle" fontSize={38} fontWeight={700} fill={INK}>{digit}</text>
                        <g role="button" aria-label={`−1 ${heads[index]}`} style={{ cursor: 'pointer' }} onClick={() => setState((s) => setPlaceDigit(s, index, s.digits[index] - 1))}>
                            <rect x={x(index)} y={154} width={cell} height={34} fill={CARD} stroke={MUTED} strokeWidth={1} rx={6} />
                            <text x={x(index) + cell / 2} y={178} textAnchor="middle" fontSize={18} fill={STAGE}>▼</text>
                        </g>
                        <text x={x(index) + cell / 2} y={214} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{local(props.language, weights[index])}</text>
                    </g>
                ))}
                <text x={x(3) - 10} y={134} textAnchor="middle" fontSize={40} fontWeight={700} fill={SECOND}>{local(props.language, ',')}</text>
                <Label x={320} y={242} textAnchor="middle" fontSize={14} fill={MUTED}>{l(say('Zutabe bakoitzaren balioa', 'Valor de cada columna', 'قيمة كل عمود'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Comparing digit by digit ---------- */

export function CompareTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompareState>(initialCompareState)
    const [left, right] = comparePairs[state.pair]
    const aligned = alignPair(state.pair)
    const answered = state.answers[state.pair]
    const correct = answered === rightSign(state.pair)
    const column = 34
    const startX = 320 - (aligned.left.length * column) / 2
    const original = [left, right]
    const controls = (
        <Segmented label={l(say('Bikotea', 'Pareja', 'الزوج'))} value={String(state.pair)} options={comparePairs.map((_, index) => ({ value: String(index), label: `${index + 1}${state.answers[index] === undefined ? '' : state.answers[index] === rightSign(index) ? ' ✓' : ' ✗'}` }))} onChange={(next) => setState((s) => choosePair(s, Number(next)))} />
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(left)}\\ ${answered ?? '\\square'}\\ ${latexOf(right)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {answered === undefined
                    ? l(say('Aukeratu zeinua: <, = edo >.', 'Elige el signo: <, = o >.', 'اختر الإشارة: < أو = أو >.'))
                    : correct
                        ? l(say('Zuzena! Begiratu nabarmendutako zutabea.', '¡Correcto! Mira la columna marcada.', 'صحيح! انظر إلى العمود المميّز.'))
                        : l(say('Ez. Idatzi biak zifra hamartar kopuru berarekin eta konparatu ezkerretik.', 'No. Escribe los dos con las mismas cifras decimales y compara desde la izquierda.', 'لا. اكتب العددين بالأرقام العشرية نفسها وقارن من اليسار.'))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={compareChallenges} state={state}>
            <Board height={250} label={l(say('Bi zenbaki zutabeka', 'Dos números en columnas', 'عددان في أعمدة'))}>
                {answered !== undefined && aligned.differs !== null && <rect x={startX + aligned.differs * column} y={14} width={column} height={128} rx={8} fill={correct ? STAGE_TINT : MISS} />}
                {[aligned.left, aligned.right].map((text, row) => (
                    <g key={row}>
                        {[...text].map((char, index) => {
                            // Zeros added to match the decimal places show in the second colour once answered
                            const added = answered !== undefined && index >= original[row].trimStart().length + (text.length - text.trimStart().length)
                            return <text key={index} x={startX + index * column + column / 2} y={66 + row * 60} textAnchor="middle" fontSize={38} fontWeight={700} fill={added ? SECOND : INK}>{local(props.language, char)}</text>
                        })}
                    </g>
                ))}
                {(['<', '=', '>'] as Sign[]).map((sign, index) => (
                    <g key={sign} role="button" aria-label={sign} style={{ cursor: 'pointer' }} onClick={() => setState((s) => answerPair(s, sign))}>
                        <rect x={190 + index * 90} y={170} width={78} height={56} rx={12} fill={answered === sign ? (correct ? GREEN : SECOND) : CARD} stroke={INK} strokeWidth={2} />
                        <text x={229 + index * 90} y={208} textAnchor="middle" fontSize={32} fontWeight={700} fill={answered === sign ? CARD : INK}>{sign}</text>
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Zooming in on the line ---------- */

export function ZoomTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ZoomState>(initialZoomState)
    const target = zoomTargets[state.target]
    const depth = zoomDepth(state.target)
    const found = state.digits.length >= depth
    // Once found, stay on the last window with the number inside it
    const { low, places } = zoomWindow(found ? { target: state.target, digits: state.digits.slice(0, -1) } : state)
    const high = { units: low.units + 1, places }
    const x0 = 40
    const x1 = 600
    const segment = (x1 - x0) / 10
    const controls = (
        <>
            <Segmented label={l(say('Zenbakia', 'Número', 'العدد'))} value={String(state.target)} options={zoomTargets.map((item, index) => ({ value: String(index), label: `${local(props.language, item)}${zoomFound(state, index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => setZoomTarget(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={state.digits.length === 0} onClick={() => setState(zoomOut)}>{l(say('Urrundu', 'Alejar', 'تصغير'))}</button>
            </div>
            <p className="fraction-v2-lab-tip">{found ? l(say('Aurkitu duzu!', '¡Lo has encontrado!', 'وجدته!')) : l(say('Sakatu zenbakia dagoen zatia.', 'Pulsa el tramo donde está el número.', 'اضغط الجزء الذي فيه العدد.'))}</p>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, found ? `$${latexOf(target)}$` : `$${latexOf(writeExact(low))}<${latexOf(target)}<${latexOf(writeExact(high))}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.miss !== null
                    ? l(say(`Ez dago ${state.miss}. zatian.`, `No está en el tramo ${state.miss}.`, `ليس في الجزء ${state.miss}.`))
                    : found
                        ? l(say('Zifra hamartar bakoitza zoom bat izan da.', 'Cada cifra decimal ha sido un zoom.', 'كل رقم عشري كان تكبيرًا.'))
                        : l(say(`Zatitu 10etan: ${places + 1}. zifra hamartarra.`, `Divide en 10: cifra decimal ${places + 1}.ª`, `قسّم إلى 10: الرقم العشري ${places + 1}.`))}
            </span>
        </>
    )
    const lowText = writeExact(low)
    const highText = writeExact(high)
    const segmentValue = (index: number) => writeExact({ units: low.units * 10 + index, places: places + 1 })
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zoomChallenges} state={state}>
            <Board height={170} label={l(say('Zenbaki-zuzena zoomarekin', 'Recta numérica con zoom', 'خط الأعداد مع التكبير'))}>
                {!found && Array.from({ length: 10 }, (_, index) => (
                    <rect key={index} x={x0 + index * segment} y={52} width={segment} height={64} fill={state.miss === index ? MISS : index % 2 === 0 ? STAGE_TINT : CARD} opacity={0.8} style={{ cursor: 'pointer' }} onClick={() => setState((s) => tapSegment(s, index))} role="button" aria-label={local(props.language, segmentValue(index))} />
                ))}
                <line x1={x0 - 12} x2={x1 + 12} y1={84} y2={84} stroke={INK} strokeWidth={2.4} pointerEvents="none" />
                {Array.from({ length: 11 }, (_, index) => <line key={index} x1={x0 + index * segment} x2={x0 + index * segment} y1={index % 10 === 0 ? 72 : 77} y2={index % 10 === 0 ? 96 : 91} stroke={INK} strokeWidth={index % 10 === 0 ? 2.4 : 1.4} pointerEvents="none" />)}
                {!found && Array.from({ length: 10 }, (_, index) => <text key={index} x={x0 + (index + 0.5) * segment} y={110} textAnchor="middle" fontSize={15} fill={MUTED} pointerEvents="none">{index}</text>)}
                <text x={x0} y={140} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{local(props.language, lowText)}</text>
                <text x={x1} y={140} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{local(props.language, highText)}</text>
                {found && (
                    <g>
                        <circle cx={x0 + (targetDigit(state.target, depth - 1) / 10) * (x1 - x0)} cy={84} r={9} fill={SECOND} stroke={CARD} strokeWidth={2} />
                        <text x={x0 + (targetDigit(state.target, depth - 1) / 10) * (x1 - x0)} y={50} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{local(props.language, target)}</text>
                    </g>
                )}
                <text x={320} y={26} textAnchor="middle" fontSize={16} fill={MUTED}>{`× ${10 ** state.digits.length}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Rounding ---------- */

export function RoundingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RoundingState>(initialRoundingState)
    const number = roundingNumbers[state.number]
    const value = exact(number)
    const { low, high, right } = roundingCandidates(state.number, state.places)
    const pick = state.picks[`${state.number}-${state.places}`]
    const placeNames = [say('unitateak', 'unidades', 'الآحاد'), say('hamarrenak', 'décimas', 'الأعشار'), say('ehunenak', 'centésimas', 'الأجزاء من مئة')]
    const x0 = 60
    const x1 = 580
    // Position of the number between the two candidates
    const scale = 10 ** (value.places - state.places)
    const offset = (value.units - low.units * scale) / scale
    const xOf = (fraction: number) => x0 + fraction * (x1 - x0)
    const controls = (
        <>
            <Segmented label={l(say('Zenbakia', 'Número', 'العدد'))} value={String(state.number)} options={roundingNumbers.map((item, index) => ({ value: String(index), label: local(props.language, item) }))} onChange={(next) => setState((s) => setRoundingNumber(s, Number(next)))} />
            <Segmented label={l(say('Biribildu', 'Redondear a', 'التقريب إلى'))} value={String(state.places)} options={roundingPlaces(state.number).map((places) => ({ value: String(places), label: l(placeNames[places]) }))} onChange={(next) => setState((s) => setRoundingPlaces(s, Number(next)))} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, pick === right ? `$${latexOf(number)}\\approx ${latexOf(writeExact(right === 'low' ? low : high))}$` : `$${latexOf(number)}\\approx\\ ?$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {pick === undefined
                    ? l(say('Sakatu hurbilen dagoen hautagaia.', 'Pulsa el candidato más cercano.', 'اضغط المرشّح الأقرب.'))
                    : pick === right
                        ? l(say('Zuzena: hurrengo zifrak erabakitzen du (0–4 behera, 5–9 gora).', 'Correcto: decide la cifra siguiente (0–4 abajo, 5–9 arriba).', 'صحيح: يحسم الرقم التالي (0–4 للأسفل، 5–9 للأعلى).'))
                        : l(say('Ez: begiratu erdiko marra. Zenbakia bestetik hurbilago dago.', 'No: mira la raya del medio. El número está más cerca del otro.', 'لا: انظر إلى خط المنتصف. العدد أقرب إلى الآخر.'))}
            </span>
        </>
    )
    const candidate = (side: 'low' | 'high', x: number, text: string) => (
        <g role="button" aria-label={text} style={{ cursor: 'pointer' }} onClick={() => setState((s) => pickCandidate(s, side))}>
            <rect x={x - 56} y={138} width={112} height={48} rx={12} fill={pick === side ? (side === right ? GREEN : SECOND) : CARD} stroke={INK} strokeWidth={2} />
            <text x={x} y={170} textAnchor="middle" fontSize={22} fontWeight={700} fill={pick === side ? CARD : INK}>{local(props.language, text)}</text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={roundingChallenges} state={state}>
            <Board height={200} label={l(say('Bi hautagaien arteko zuzena', 'La recta entre los dos candidatos', 'المستقيم بين المرشّحين'))}>
                <line x1={x0 - 10} x2={x1 + 10} y1={90} y2={90} stroke={INK} strokeWidth={2.4} />
                {Array.from({ length: 11 }, (_, index) => <line key={index} x1={xOf(index / 10)} x2={xOf(index / 10)} y1={index % 10 === 0 ? 78 : 84} y2={index % 10 === 0 ? 102 : 96} stroke={INK} strokeWidth={index % 10 === 0 ? 2.4 : 1.2} />)}
                <line x1={xOf(0.5)} x2={xOf(0.5)} y1={60} y2={110} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 5" />
                <circle cx={xOf(offset)} cy={90} r={9} fill={SECOND} stroke={CARD} strokeWidth={2} />
                <text x={xOf(offset)} y={56} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{local(props.language, number)}</text>
                {candidate('low', x0, writeExact(low))}
                {candidate('high', x1, writeExact(high))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The long division, one zero at a time ---------- */

export function DivisionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DivisionState>(initialDivisionState)
    const { whole, digits, remainders } = divisionSteps(state.dividend, state.divisor, state.steps)
    const status = divisionStatus(state)
    const quotient = `${whole}${digits.length ? `,${digits.join('')}` : ''}${status === 'periodic' ? '…' : ''}`
    const repeated = status === 'periodic' ? remainders[remainders.length - 1] : null
    const controls = (
        <>
            <Stepper label={l(say('Zatikizuna', 'Dividendo', 'المقسوم'))} value={state.dividend} min={DIVISION_LIMITS.dividend.min} max={DIVISION_LIMITS.dividend.max} onChange={(dividend) => setState((s) => setDivision(s, { dividend }))} language={props.language} />
            <Stepper label={l(say('Zatitzailea', 'Divisor', 'المقسوم عليه'))} value={state.divisor} min={DIVISION_LIMITS.divisor.min} max={DIVISION_LIMITS.divisor.max} onChange={(divisor) => setState((s) => setDivision(s, { divisor }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={status !== 'open' || state.steps >= DIVISION_LIMITS.steps} onClick={() => setState(bringZero)}>{l(say('Jaitsi zero bat', 'Baja un cero', 'أنزل صفرًا'))}</button>
            </div>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${state.dividend}\\mathbin{:}${state.divisor}=${latexOf(quotient).replace('…', '\\ldots')}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {status === 'exact'
                    ? l(say('Hondarra 0: hamartar zehatza.', 'Resto 0: decimal exacto.', 'الباقي 0: عدد عشري منتهٍ.'))
                    : status === 'periodic'
                        ? l(say(`${repeated} hondarra errepikatu da: zifrak beti errepikatuko dira. Periodikoa.`, `Se ha repetido el resto ${repeated}: las cifras se repetirán siempre. Periódico.`, `تكرر الباقي ${repeated}: ستتكرر الأرقام دائمًا. دوري.`))
                        : l(say('Hondarra ez da 0: jaitsi zero bat.', 'El resto no es 0: baja un cero.', 'الباقي ليس 0: أنزل صفرًا.'))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={divisionChallenges} state={state}>
            <Board height={90 + remainders.length * 30} label={l(say('Zatiketa luzea', 'La división larga', 'القسمة المطوّلة'))}>
                <text x={150} y={40} textAnchor="end" fontSize={26} fontWeight={700} fill={INK}>{state.dividend}</text>
                <line x1={170} x2={170} y1={14} y2={50} stroke={INK} strokeWidth={2} />
                <line x1={170} x2={420} y1={50} y2={50} stroke={INK} strokeWidth={2} />
                <text x={184} y={40} fontSize={26} fontWeight={700} fill={INK}>{state.divisor}</text>
                <text x={184} y={80} fontSize={26} fontWeight={700} fill={STAGE}>{local(props.language, quotient)}</text>
                {remainders.map((remainder, index) => (
                    <text key={index} x={150} y={80 + index * 30} textAnchor="end" fontSize={20} fontWeight={700} fill={remainder === 0 ? GREEN : remainder === repeated ? SECOND : MUTED}>{index === 0 ? remainder : `${remainders[index - 1] * 10} → ${remainder}`}</text>
                ))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. The jumping comma ---------- */

export function ShiftTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShiftState>(initialShiftState)
    const base = shiftBases[state.base]
    const result = shiftedText(state.base, state.shift)
    const operation = state.shift === 0 ? '' : state.shift > 0 ? `\\cdot ${10 ** state.shift}` : `\\mathbin{:}${10 ** -state.shift}`
    const box = 42
    const chars = [...result]
    const startX = 320 - (chars.length * box) / 2
    const controls = (
        <>
            <Segmented label={l(say('Zenbakia', 'Número', 'العدد'))} value={String(state.base)} options={shiftBases.map((item, index) => ({ value: String(index), label: local(props.language, item) }))} onChange={(next) => setState((s) => setShiftBase(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={state.shift <= -SHIFT_LIMIT} onClick={() => setState((s) => moveShift(s, -1))}>: 10</button>
                <button type="button" disabled={state.shift >= SHIFT_LIMIT} onClick={() => setState((s) => moveShift(s, 1))}>· 10</button>
            </div>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(base)}${operation}=${latexOf(result)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.shift === 0
                    ? l(say('Sakatu · 10 edo : 10.', 'Pulsa · 10 o : 10.', 'اضغط · 10 أو : 10.'))
                    : state.shift > 0
                        ? l(say(`Koma ${state.shift} toki eskuinera.`, `La coma, ${state.shift} lugares a la derecha.`, `الفاصلة ${state.shift} منازل إلى اليمين.`))
                        : l(say(`Koma ${-state.shift} toki ezkerrera.`, `La coma, ${-state.shift} lugares a la izquierda.`, `الفاصلة ${-state.shift} منازل إلى اليسار.`))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={shiftChallenges} state={state}>
            <Board height={130} label={l(say('Koma mugitzen da', 'La coma se mueve', 'الفاصلة تتحرك'))}>
                {chars.map((char, index) => {
                    const comma = char === ','
                    return comma
                        ? <text key={index} x={startX + index * box + box / 2} y={84} textAnchor="middle" fontSize={44} fontWeight={700} fill={SECOND}>{local(props.language, ',')}</text>
                        : (
                            <g key={index}>
                                <rect x={startX + index * box + 3} y={36} width={box - 6} height={58} rx={8} fill={CARD} stroke={INK} strokeWidth={1.6} />
                                <text x={startX + index * box + box / 2} y={78} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK}>{char}</text>
                            </g>
                        )
                })}
                <text x={320} y={120} textAnchor="middle" fontSize={15} fill={MUTED}>{local(props.language, base)}{operation ? (state.shift > 0 ? ` · ${10 ** state.shift}` : ` : ${10 ** -state.shift}`) : ''}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. Where does the comma go? ---------- */

export function CommaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CommaState>(initialCommaState)
    const [a, b] = commaProducts[state.product]
    const { digits, places } = commaProduct(state.product)
    const solved = state.solved.includes(state.product)
    const placed = placedText(state)
    const controls = (
        <>
            <Segmented label={l(say('Biderkadura', 'Producto', 'الضرب'))} value={String(state.product)} options={commaProducts.map(([x, y], index) => ({ value: String(index), label: `${local(props.language, x)} · ${local(props.language, y)}${state.solved.includes(index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => setCommaProduct(s, Number(next)))} />
            <Stepper label={l(say('Emaitzaren zifra hamartarrak', 'Cifras decimales del resultado', 'الأرقام العشرية في الناتج'))} value={state.places} min={0} max={5} onChange={(next) => setState((s) => setCommaPlaces(s, next))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState(checkComma)}>{l(say('Egiaztatu', 'Comprobar', 'تحقق'))}</button>
            </div>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(a)}\\cdot ${latexOf(b)}${solved && state.places === places ? '=' : '\\ \\to\\ '}${latexOf(placed)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.wrong
                    ? l(say('Ez. Zenbatu faktore bakoitzaren zifra hamartarrak eta batu.', 'No. Cuenta las cifras decimales de cada factor y súmalas.', 'لا. عُدّ الأرقام العشرية في كل عامل واجمعها.'))
                    : solved && state.places === places
                        ? l(say(`Zuzena: ${exact(a).places} + ${exact(b).places} = ${places} zifra hamartar.`, `Correcto: ${exact(a).places} + ${exact(b).places} = ${places} cifras decimales.`, `صحيح: ${exact(a).places} + ${exact(b).places} = ${places} أرقام عشرية.`))
                        : l(say(`Komarik gabe: ${digits}. Non jarri koma?`, `Sin coma: ${digits}. ¿Dónde va la coma?`, `بلا فاصلة: ${digits}. أين توضع الفاصلة؟`))}
            </span>
        </>
    )
    const decimalsOf = (text: string) => exact(text).places
    const factor = (text: string, y: number) => {
        const chars = [...text]
        const startX = 330 - chars.length * 24
        const comma = text.indexOf(',')
        return chars.map((char, index) => <text key={index} x={startX + index * 24} y={y} textAnchor="middle" fontSize={30} fontWeight={700} fill={comma >= 0 && index > comma ? SECOND : INK}>{local(props.language, char)}</text>)
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={commaChallenges} state={state}>
            <Board height={230} label={l(say('Biderkadura eta koma', 'El producto y la coma', 'الضرب والفاصلة'))}>
                {factor(a, 46)}
                {factor(b, 90)}
                <text x={200} y={90} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>×</text>
                <line x1={190} x2={330} y1={104} y2={104} stroke={INK} strokeWidth={2.2} />
                {factor(placed, 150)}
                <Label x={460} y={46} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{l(say(`${decimalsOf(a)} zifra hamartar`, `${decimalsOf(a)} cifras decimales`, `${decimalsOf(a)} أرقام عشرية`))}</Label>
                <Label x={460} y={90} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{l(say(`${decimalsOf(b)} zifra hamartar`, `${decimalsOf(b)} cifras decimales`, `${decimalsOf(b)} أرقام عشرية`))}</Label>
                <Label x={460} y={150} textAnchor="middle" fontSize={15} fontWeight={700} fill={state.wrong ? SECOND : solved && state.places === places ? GREEN : MUTED}>{l(say(`${state.places} zifra hamartar`, `${state.places} cifras decimales`, `${state.places} أرقام عشرية`))}</Label>
                <text x={320} y={206} textAnchor="middle" fontSize={15} fill={MUTED}>{`${String(exact(a).units)} · ${String(exact(b).units)} = ${digits}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 9. Taking the comma out of the divisor ---------- */

export function BalanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BalanceState>(initialBalanceState)
    const { dividend, divisor } = balanceTerms(state.pair, state.times)
    const ready = divisor.places === 0
    const quotient = writeExact(balanceQuotient(state.pair))
    const original = balancePairs[state.pair]
    const controls = (
        <>
            <Segmented label={l(say('Zatiketa', 'División', 'القسمة'))} value={String(state.pair)} options={balancePairs.map(([x, y], index) => ({ value: String(index), label: `${local(props.language, x)} : ${local(props.language, y)}${state.cleared.includes(index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => setBalancePair(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={ready} onClick={() => setState(multiplyBoth)}>{l(say('Biak · 10', 'Los dos · 10', 'الاثنان · 10'))}</button>
                <button type="button" disabled={state.times === 0} onClick={() => setState(resetBalance)}>{l(say('Hasieratik', 'Desde el principio', 'من البداية'))}</button>
            </div>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${latexOf(original[0])}\\mathbin{:}${latexOf(original[1])}=${latexOf(writeExact(dividend))}\\mathbin{:}${latexOf(writeExact(divisor))}${ready ? `=${latexOf(quotient)}` : ''}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">
                {ready
                    ? l(say(`Zatitzaileak ez du komarik: ${state.times} aldiz · 10. Zatidura ez da aldatu.`, `El divisor ya no tiene coma: ${state.times} veces · 10. El cociente no ha cambiado.`, `لم يعد للمقسوم عليه فاصلة: ${state.times} مرات · 10. لم يتغيّر الناتج.`))
                    : l(say(`Zatitzaileak ${stepsNeeded(state.pair) - state.times} zifra hamartar ditu oraindik.`, `Al divisor le quedan ${stepsNeeded(state.pair) - state.times} cifras decimales.`, `ما زال للمقسوم عليه ${stepsNeeded(state.pair) - state.times} أرقام عشرية.`))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={balanceChallenges} state={state}>
            <Board height={150} label={l(say('Zatikizuna eta zatitzailea', 'Dividendo y divisor', 'المقسوم والمقسوم عليه'))}>
                <text x={240} y={80} textAnchor="end" fontSize={42} fontWeight={700} fill={STAGE}>{local(props.language, writeExact(dividend))}</text>
                <text x={280} y={80} textAnchor="middle" fontSize={40} fontWeight={700} fill={INK}>:</text>
                <text x={320} y={80} textAnchor="start" fontSize={42} fontWeight={700} fill={ready ? GREEN : SECOND}>{local(props.language, writeExact(divisor))}</text>
                {ready && <text x={600} y={80} textAnchor="end" fontSize={34} fontWeight={700} fill={GREEN}>{`= ${local(props.language, quotient)}`}</text>}
                <text x={320} y={130} textAnchor="middle" fontSize={16} fill={MUTED}>{state.times === 0 ? '' : `· ${10 ** state.times}`}</text>
            </Board>
        </ToolFrame>
    )
}
