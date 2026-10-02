import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { readProportionAnswer } from '../answers'
import {
    cardRight,
    CHANGE_LIMITS,
    changeChallenges,
    changeResult,
    chooseCard,
    chooseProportion,
    chooseStep,
    chooseUnitProblem,
    classifyCard,
    classifyChallenges,
    initialChangeState,
    initialClassifyState,
    initialRatioState,
    initialSolveState,
    initialTableState,
    initialUnitState,
    magnitudePairs,
    proportionProblems,
    RATIO_LIMIT,
    ratioChallenges,
    ratioValue,
    rightSteps,
    setChange,
    setRatio,
    setTableConstant,
    setTableKind,
    solveChallenges,
    solveX,
    TABLE_XS,
    tableChallenges,
    tableConstants,
    tableK,
    tableValues,
    unitChallenges,
    unitProblems,
    unitResults,
    updateSolve,
    type ChangeState,
    type ClassifyState,
    type PairKind,
    type RatioState,
    type SolveState,
    type Step,
    type TableState,
    type UnitState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
/** A value as LaTeX: exact decimal with {,}, or a fraction when it does not end */
const valueLatex = (value: FractionValue) => {
    const text = toExactDecimal(value, ',')
    return text !== null && text.length <= 7 ? text.replace(',', '{,}') : `\\frac{${value.numerator}}{${value.denominator}}`
}
/** A value as plain text in the drawings */
const valueText = (language: string, value: FractionValue) => {
    const text = toExactDecimal(value, language === 'ar' ? '.' : ',')
    return text ?? `${value.numerator}/${value.denominator}`
}

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

/* ---------- 1. The ratio machine ---------- */

export function RatioTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RatioState>(initialRatioState)
    const value = ratioValue(state)
    const max = Math.max(state.antecedent, state.consequent)
    const unit = 560 / max
    const controls = (
        <>
            <Stepper label={l(say('Aurrekaria', 'Antecedente', 'المقدَّم'))} value={state.antecedent} min={1} max={RATIO_LIMIT} onChange={(antecedent) => setState((s) => setRatio(s, { antecedent }))} language={props.language} />
            <Stepper label={l(say('Ondorengoa', 'Consecuente', 'التالي'))} value={state.consequent} min={1} max={RATIO_LIMIT} onChange={(consequent) => setState((s) => setRatio(s, { consequent }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$\\frac{${state.antecedent}}{${state.consequent}}=${valueLatex(value)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l(say(`Aurrekaria ondorengoaren ${valueText('eu', value)} aldiz da.`, `El antecedente es ${valueText('es', value)} veces el consecuente.`, `المقدَّم يساوي ${valueText('ar', value)} من التالي.`))}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={ratioChallenges} state={state}>
            <Board height={150} label={l(say('Bi barra', 'Dos barras', 'شريطان'))}>
                {[state.antecedent, state.consequent].map((count, row) => (
                    <g key={row}>
                        {Array.from({ length: count }, (_, index) => <rect key={index} x={40 + index * unit} y={24 + row * 60} width={unit} height={40} fill={row === 0 ? STAGE : SECOND} fillOpacity={0.35} stroke={INK} strokeWidth={1} />)}
                        <text x={30} y={50 + row * 60} textAnchor="end" fontSize={18} fontWeight={700} fill={row === 0 ? STAGE : SECOND}>{count}</text>
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Solving a proportion ---------- */

export function SolveTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SolveState>(initialSolveState)
    const [a, b, c] = proportionProblems[state.problem]
    const x = solveX(state.problem)
    const shown = state.revealed || state.solved.includes(state.problem)
    const controls = (
        <>
            <Segmented label={l(say('Proportzioa', 'Proporción', 'التناسب'))} value={String(state.problem)} options={proportionProblems.map(([p, q, r], index) => ({ value: String(index), label: `${p}/${q} = ${r}/x${state.solved.includes(index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => chooseProportion(s, Number(next)))} />
            <ResultAnswer
                language={props.language}
                state={state}
                expected={x}
                placeholder={say('Adib.: 14', 'Ej.: 14', 'مثال: 14')}
                unreadable={say('Idatzi zenbaki bat.', 'Escribe un número.', 'اكتب عددًا.')}
                normalizeInput={readProportionAnswer}
                onChange={(patch) => setState((s) => updateSolve(s, patch, readProportionAnswer))}
            />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${a}\\cdot x=${b}\\cdot ${c}=${b * c}${shown ? `\\ \\to\\ x=${b * c}\\mathbin{:}${a}=${valueLatex(x)}` : ''}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l(say('Muturren biderkadura = erdikoen biderkadura.', 'Producto de extremos = producto de medios.', 'حاصل ضرب الطرفين = حاصل ضرب الوسطين.'))}</span>
        </>
    )
    const term = (cx: number, cy: number, text: string, color: string) => (
        <g>
            <circle cx={cx} cy={cy - 12} r={28} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={2} />
            <text x={cx} y={cy} textAnchor="middle" fontSize={34} fontWeight={700} fill={color}>{text}</text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={solveChallenges} state={state}>
            <Board height={170} label={l(say('Proportzioa', 'La proporción', 'التناسب'))}>
                {term(220, 56, String(a), STAGE)}
                <line x1={186} x2={254} y1={78} y2={78} stroke={INK} strokeWidth={3} />
                {term(220, 130, String(b), SECOND)}
                <text x={320} y={92} textAnchor="middle" fontSize={40} fontWeight={700} fill={INK}>=</text>
                {term(420, 56, String(c), SECOND)}
                <line x1={386} x2={454} y1={78} y2={78} stroke={INK} strokeWidth={3} />
                {term(420, 130, shown ? valueText(props.language, x) : 'x', STAGE)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Direct, inverse or neither? ---------- */

export function ClassifyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ClassifyState>(initialClassifyState)
    const pair = magnitudePairs[state.card]
    const answer = state.answers[state.card]
    const kinds: Array<{ kind: PairKind; label: { eu: string; es: string; ar: string }; color: string }> = [
        { kind: 'direct', label: say('Zuzena', 'Directa', 'طردي'), color: STAGE },
        { kind: 'inverse', label: say('Alderantzizkoa', 'Inversa', 'عكسي'), color: SECOND },
        { kind: 'none', label: say('Ez proportzionala', 'No proporcional', 'غير متناسب'), color: MUTED }
    ]
    const controls = (
        <>
            <Segmented label={l(say('Bikotea', 'Pareja', 'الزوج'))} value={String(state.card)} options={magnitudePairs.map((_, index) => ({ value: String(index), label: `${index + 1}${state.answers[index] === undefined ? '' : cardRight(state, index) ? ' ✓' : ' ✗'}` }))} onChange={(next) => setState((s) => chooseCard(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                {kinds.map((item) => <button key={item.kind} type="button" aria-pressed={answer === item.kind} onClick={() => setState((s) => classifyCard(s, item.kind))}>{l(item.label)}</button>)}
            </div>
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" disabled={state.card >= magnitudePairs.length - 1} onClick={() => setState((s) => chooseCard(s, s.card + 1))}>{l(say('Hurrengoa', 'Siguiente', 'التالي'))}</button>
            </div>
        </>
    )
    const right = answer !== undefined && cardRight(state, state.card)
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">{l(pair.text)}</span>
            <span className="fraction-v2-lab-readout-note">
                {answer === undefined
                    ? l(say('Bat bikoiztean, bestea bikoiztu, erdia ala ez dago araurik?', 'Al doblar una, ¿la otra se dobla, se hace la mitad o no hay regla?', 'إذا تضاعف أحدهما، هل يتضاعف الآخر أم ينقص إلى النصف أم لا قاعدة؟'))
                    : right
                        ? l(say('Zuzena!', '¡Correcto!', 'صحيح!'))
                        : l(say('Ez. Pentsatu adibide batean: zer gertatzen da bat bikoiztean?', 'No. Piensa un ejemplo: ¿qué pasa al doblar una?', 'لا. فكّر في مثال: ماذا يحدث إذا تضاعف أحدهما؟'))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={classifyChallenges} state={state}>
            <Board height={190} label={l(say('Bikoteak sailkatuta', 'Parejas clasificadas', 'الأزواج المصنّفة'))}>
                {kinds.map((item, column) => (
                    <g key={item.kind}>
                        <rect x={20 + column * 205} y={10} width={190} height={170} rx={12} fill={CARD} stroke={item.color} strokeWidth={2} />
                        <Label x={115 + column * 205} y={36} textAnchor="middle" fontSize={16} fontWeight={700} fill={item.color}>{l(item.label)}</Label>
                        {magnitudePairs.map((_, card) => card).filter((card) => state.answers[card] === item.kind).map((card, index) => (
                            <g key={card}>
                                <rect x={34 + column * 205 + (index % 4) * 42} y={52 + Math.floor(index / 4) * 42} width={36} height={36} rx={8} fill={cardRight(state, card) ? STAGE_TINT : 'var(--coral-tint, #f8ddd5)'} stroke={card === state.card ? INK : MUTED} strokeWidth={card === state.card ? 2.4 : 1} />
                                <text x={52 + column * 205 + (index % 4) * 42} y={76 + Math.floor(index / 4) * 42} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{card + 1}</text>
                            </g>
                        ))}
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. The table and its graph ---------- */

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TableState>(initialTableState)
    const ys = tableValues(state)
    const k = tableK(state)
    const maxY = Math.max(...ys.map(toNumber))
    const gx = (x: number) => 330 + (x / 6) * 280
    const gy = (y: number) => 200 - (y / maxY) * 170
    const controls = (
        <>
            <Segmented label={l(say('Mota', 'Tipo', 'النوع'))} value={state.kind} options={[{ value: 'direct', label: l(say('Zuzena', 'Directa', 'طردي')) }, { value: 'inverse', label: l(say('Alderantzizkoa', 'Inversa', 'عكسي')) }]} onChange={(kind) => setState(setTableKind(kind as TableState['kind']))} />
            <Segmented label={state.kind === 'direct' ? l(say('Konstantea (arrazoia)', 'Constante (razón)', 'الثابت (النسبة)')) : l(say('Biderkadura', 'Producto', 'حاصل الضرب'))} value={String(state.constant)} options={tableConstants[state.kind].map((text, index) => ({ value: String(index), label: props.language === 'ar' ? text.replace(',', '.') : text }))} onChange={(next) => setState((s) => setTableConstant(s, Number(next)))} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, state.kind === 'direct' ? `$y=${valueLatex(k)}\\cdot x$` : `$x\\cdot y=${valueLatex(k)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{state.kind === 'direct' ? l(say('Puntuak zuzen batean, jatorritik.', 'Los puntos, en una recta desde el origen.', 'النقاط على مستقيم من الأصل.')) : l(say('Puntuak kurba batean: bat handitzean, bestea txikitu.', 'Los puntos, en una curva: al crecer una, la otra decrece.', 'النقاط على منحنى: حين يزيد أحدهما ينقص الآخر.'))}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tableChallenges} state={state}>
            <Board height={230} label={l(say('Taula eta grafikoa', 'Tabla y gráfica', 'الجدول والرسم'))}>
                {TABLE_XS.map((x, index) => (
                    <g key={x}>
                        <rect x={20} y={14 + index * 40} width={90} height={38} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                        <text x={65} y={40 + index * 40} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{x}</text>
                        <rect x={110} y={14 + index * 40} width={120} height={38} fill={CARD} stroke={INK} strokeWidth={1.4} />
                        <text x={170} y={40 + index * 40} textAnchor="middle" fontSize={18} fontWeight={700} fill={state.kind === 'direct' ? STAGE : SECOND}>{valueText(props.language, ys[index])}</text>
                    </g>
                ))}
                <line x1={gx(0)} x2={gx(6) + 10} y1={gy(0)} y2={gy(0)} stroke={INK} strokeWidth={2} />
                <line x1={gx(0)} x2={gx(0)} y1={gy(0)} y2={14} stroke={INK} strokeWidth={2} />
                {TABLE_XS.map((x) => <text key={x} x={gx(x)} y={gy(0) + 20} textAnchor="middle" fontSize={13} fill={MUTED}>{x}</text>)}
                {state.kind === 'direct' && <line x1={gx(0)} y1={gy(0)} x2={gx(6)} y2={gy(toNumber(ys[4]))} stroke={STAGE} strokeWidth={1.6} strokeDasharray="5 5" />}
                {ys.map((y, index) => <circle key={index} cx={gx(TABLE_XS[index])} cy={gy(toNumber(y))} r={7} fill={state.kind === 'direct' ? STAGE : SECOND} stroke={CARD} strokeWidth={2} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Two steps ---------- */

export function UnitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<UnitState>(initialUnitState)
    const problem = unitProblems[state.problem]
    const { one, wanted } = unitResults(state)
    const [rightFirst, rightSecond] = rightSteps(state.problem)
    const firstRight = state.first === rightFirst
    const secondRight = state.second === rightSecond
    const stepButtons = (which: 'first' | 'second', factor: number) => (
        <div className="fraction-v2-lab-quick-actions">
            {(['divide', 'times'] as Step[]).map((step) => (
                <button key={step} type="button" disabled={which === 'second' && !state.first} aria-pressed={state[which] === step} onClick={() => setState((s) => chooseStep(s, which, step))}>{step === 'divide' ? `: ${factor}` : `· ${factor}`}</button>
            ))}
        </div>
    )
    const controls = (
        <>
            <Segmented label={l(say('Problema', 'Problema', 'المسألة'))} value={String(state.problem)} options={unitProblems.map((_, index) => ({ value: String(index), label: `${index + 1}${state.solved.includes(index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => chooseUnitProblem(s, Number(next)))} />
            <p className="fraction-v2-lab-tip">{l(say(`1. urratsa: ${problem.known} → 1`, `Paso 1: ${problem.known} → 1`, `الخطوة 1: ${problem.known} ← 1`))}</p>
            {stepButtons('first', problem.known)}
            <p className="fraction-v2-lab-tip">{l(say(`2. urratsa: 1 → ${problem.wanted}`, `Paso 2: 1 → ${problem.wanted}`, `الخطوة 2: 1 ← ${problem.wanted}`))}</p>
            {stepButtons('second', problem.wanted)}
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">{l(problem.text)}</span>
            <span className="fraction-v2-lab-readout-note">
                {!state.first
                    ? l(say('Aukeratu lehen urratsa: bat bakarrarentzat, zatitu ala biderkatu?', 'Elige el primer paso: para uno solo, ¿dividir o multiplicar?', 'اختر الخطوة الأولى: للواحد، هل نقسم أم نضرب؟'))
                    : !firstRight
                        ? (problem.direct ? l(say('Zuzena da: bat bakarrak gutxiago, zatitu.', 'Es directa: uno solo, menos; divide.', 'إنه طردي: الواحد أقل، فاقسم.')) : l(say('Alderantzizkoa da: bat bakarrak denbora gehiago, biderkatu.', 'Es inversa: uno solo tarda más; multiplica.', 'إنه عكسي: الواحد يحتاج وقتًا أطول، فاضرب.')))
                        : !state.second
                            ? l(say('Orain bigarren urratsa.', 'Ahora el segundo paso.', 'الآن الخطوة الثانية.'))
                            : secondRight
                                ? l(say('Zuzena!', '¡Correcto!', 'صحيح!'))
                                : l(say('Bigarren urratsean alderantzizko eragiketa egiten da.', 'En el segundo paso se hace la operación contraria.', 'في الخطوة الثانية نجري العملية المعاكسة.'))}
            </span>
        </>
    )
    const box = (x: number, top: string, bottom: string, color: string, fill: string) => (
        <g>
            <rect x={x} y={40} width={150} height={100} rx={12} fill={fill} stroke={INK} strokeWidth={1.6} />
            <text x={x + 75} y={80} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{top}</text>
            <text x={x + 75} y={120} textAnchor="middle" fontSize={22} fontWeight={700} fill={color}>{bottom}</text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={unitChallenges} state={state}>
            <Board height={170} label={l(say('Unitatera laburtzea', 'Reducción a la unidad', 'الإرجاع إلى الوحدة'))}>
                {box(20, String(problem.known), `${problem.amount} ${problem.unit}`, INK, CARD)}
                {box(245, '1', one ? `${valueText(props.language, one)} ${problem.unit}` : '?', state.first ? (firstRight ? GREEN : SECOND) : MUTED, '#fbebc0')}
                {box(470, String(problem.wanted), wanted ? `${valueText(props.language, wanted)} ${problem.unit}` : '?', state.second ? (firstRight && secondRight ? GREEN : SECOND) : MUTED, CARD)}
                <text x={207} y={96} textAnchor="middle" fontSize={22} fill={MUTED}>→</text>
                <text x={432} y={96} textAnchor="middle" fontSize={22} fill={MUTED}>→</text>
                {state.first && <text x={207} y={160} textAnchor="middle" fontSize={17} fontWeight={700} fill={firstRight ? GREEN : SECOND}>{state.first === 'divide' ? `: ${problem.known}` : `· ${problem.known}`}</text>}
                {state.second && <text x={432} y={160} textAnchor="middle" fontSize={17} fontWeight={700} fill={secondRight ? GREEN : SECOND}>{state.second === 'divide' ? `: ${problem.wanted}` : `· ${problem.wanted}`}</text>}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Discounts and increases ---------- */

export function ChangeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChangeState>(initialChangeState)
    const { change, final, paid } = changeResult(state)
    const percentText = (value: number) => (props.language === 'eu' ? `% ${value}` : props.language === 'ar' ? `${value}٪` : `${value} %`)
    const scale = 520 / 150
    const controls = (
        <>
            <Segmented label={l(say('Aldaketa', 'Cambio', 'التغيّر'))} value={state.kind} options={[{ value: 'discount', label: l(say('Beherapena', 'Rebaja', 'تخفيض')) }, { value: 'increase', label: l(say('Igoera', 'Subida', 'زيادة')) }]} onChange={(kind) => setState((s) => setChange(s, { kind: kind as ChangeState['kind'] }))} />
            <Stepper label={l(say('Prezioa (€)', 'Precio (€)', 'السعر (€)'))} value={state.price} min={CHANGE_LIMITS.price.min} max={CHANGE_LIMITS.price.max} step={CHANGE_LIMITS.price.step} onChange={(price) => setState((s) => setChange(s, { price }))} language={props.language} />
            <Stepper label={l(say('Ehunekoa (%)', 'Porcentaje (%)', 'النسبة (٪)'))} value={state.percent} min={CHANGE_LIMITS.percent.min} max={CHANGE_LIMITS.percent.max} step={CHANGE_LIMITS.percent.step} onChange={(percent) => setState((s) => setChange(s, { percent }))} language={props.language} />
        </>
    )
    const sign = state.kind === 'discount' ? '-' : '+'
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(props.language, `$${state.price}${sign}${valueLatex(change)}=${valueLatex(final)}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{l(say(`Prezioaren ${percentText(paid)} ordaintzen da: ${state.price} · ${paid} : 100.`, `Se paga el ${percentText(paid)} del precio: ${state.price} · ${paid} : 100.`, `يُدفع ${percentText(paid)} من السعر: ${state.price} · ${paid} : 100.`))}</span>
        </>
    )
    const whole = 100 * scale
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={changeChallenges} state={state}>
            <Board height={150} label={l(say('Prezioaren barra', 'Barra del precio', 'شريط السعر'))}>
                <rect x={40} y={50} width={paid * scale} height={46} fill={state.kind === 'discount' ? GREEN : STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
                <rect x={40} y={50} width={whole} height={46} fill="none" stroke={INK} strokeWidth={2} strokeDasharray={state.kind === 'discount' ? '6 4' : undefined} />
                {state.kind === 'discount' && state.percent > 0 && <rect x={40 + paid * scale} y={50} width={state.percent * scale} height={46} fill={SECOND} fillOpacity={0.3} stroke={INK} strokeWidth={2} />}
                {state.kind === 'increase' && state.percent > 0 && <rect x={40 + whole} y={50} width={state.percent * scale} height={46} fill={SECOND} fillOpacity={0.35} stroke={INK} strokeWidth={2} />}
                <text x={40 + whole} y={40} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{percentText(100)}</text>
                <text x={40 + (paid * scale) / 2} y={80} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{`${valueText(props.language, final)} €`}</text>
                <text x={40 + paid * scale} y={124} textAnchor="middle" fontSize={15} fontWeight={700} fill={state.kind === 'discount' ? GREEN : STAGE}>{percentText(paid)}</text>
            </Board>
        </ToolFrame>
    )
}
