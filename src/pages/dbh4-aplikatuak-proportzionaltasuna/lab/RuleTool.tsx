import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import '../../dbh2-zatikiak-prototype/lab/Prediction.css'
import { readMoneyAnswer } from '../answers'
import { roundedAnswer } from './percentBar'
import {
    chooseRelation,
    expectedRuleAnswer,
    initialRuleState,
    relationRight,
    RULE_VALUE_MAX,
    ruleAnswered,
    ruleChallenges,
    ruleExtra,
    ruleFactor,
    ruleResult,
    ruleSlip,
    setRule,
    trueRelation,
    unitValue,
    type RuleContext,
    type RuleMethod,
    type RuleRelation,
    type RuleState
} from './ruleOfThree'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const SUCCESS_TINT = 'var(--success-tint, #d6eddf)'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })

/** Each situation: its button, its two magnitudes (row names, short) and why the relation is what it is */
const contexts: Record<RuleContext, { label: Text; first: Text; second: Text; why: Text }> = {
    price: { label: say('Erosketa', 'Compra', 'الشراء'), first: say('kg', 'kg', 'كغ'), second: say('€', '€', '€'), why: say('Kilo bikoitzak euro bikoitz balio du.', 'El doble de kilos cuesta el doble de euros.', 'ضعف الكيلوغرامات يكلّف ضعف اليوروهات.') },
    distance: { label: say('Bizikleta', 'Bici', 'الدراجة'), first: say('min', 'min', 'د'), second: say('km', 'km', 'كم'), why: say('Denbora bikoitzean bide bikoitza egiten da.', 'En el doble de tiempo se recorre el doble.', 'في ضعف الزمن تُقطع ضعف المسافة.') },
    workers: { label: say('Obra', 'Obra', 'البناء'), first: say('langile', 'obreros', 'عمّال'), second: say('egun', 'días', 'أيام'), why: say('Langile bikoitzek egunen erdia behar dute.', 'El doble de obreros tarda la mitad de días.', 'ضعف العمّال يحتاجون نصف الأيام.') },
    speed: { label: say('Bidaia', 'Viaje', 'الرحلة'), first: say('km/h', 'km/h', 'كم/س'), second: say('h', 'h', 'س'), why: say('Abiadura bikoitzean denboraren erdia behar da.', 'Al doble de velocidad se tarda la mitad.', 'بضعف السرعة يلزم نصف الزمن.') },
    food: { label: say('Janaria', 'Comida', 'الطعام'), first: say('pertsona', 'personas', 'أشخاص'), second: say('egun', 'días', 'أيام'), why: say('Pertsona bikoitzek egunen erdian amaitzen dute janaria.', 'El doble de personas acaba la comida en la mitad de días.', 'ضعف الأشخاص ينهون الطعام في نصف الأيام.') },
    cows: { label: say('Bazka', 'Pasto', 'المرعى'), first: say('behi', 'vacas', 'أبقار'), second: say('egun', 'días', 'أيام'), why: say('Behi bikoitzek egunen erdian amaitzen dute bazka.', 'El doble de vacas acaba el pasto en la mitad de días.', 'ضعف الأبقار ينهي المرعى في نصف الأيام.') },
    tap: { label: say('Txorrota', 'Grifo', 'الصنبور'), first: say('l/min', 'l/min', 'ل/د'), second: say('min', 'min', 'د'), why: say('Emari bikoitzeko txorrotak denboraren erdia behar du.', 'Un grifo con el doble de caudal tarda la mitad.', 'صنبور بضعف التدفق يحتاج نصف الزمن.') }
}

const relationNames: Record<RuleRelation, Text> = { direct: say('Zuzena', 'Directa', 'طردية'), inverse: say('Alderantzizkoa', 'Inversa', 'عكسية') }

/** A value in a cell or on an arrow: 2,5 (2.5 in Arabic), a fraction 5/3 when it has no short decimal, ≈ for a rounded result */
function valueText(language: string, value: FractionValue, allowFraction = false) {
    const exact = toExactDecimal(value, language === 'ar' ? '.' : ',')
    if (exact !== null && (exact.split(/[.,]/)[1] ?? '').length <= 2) return exact
    if (allowFraction) return `${value.numerator}/${value.denominator}`
    const { value: rounded } = roundedAnswer(value)
    return `≈ ${toExactDecimal(rounded, language === 'ar' ? '.' : ',')}`
}
const latexValue = (value: FractionValue) => {
    const { value: shown } = roundedAnswer(value)
    return toExactDecimal(shown, ',')!.replace(',', '{,}')
}

export function RuleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RuleState>(initialRuleState)
    const set = (patch: Parameters<typeof setRule>[1]) => setState((current) => setRule(current, patch))
    const info = contexts[state.context]
    const first = l(info.first)
    const second = l(info.second)
    const controls = (
        <>
            <Segmented label={l(say('Egoera', 'Situación', 'الحالة'))} value={state.context} options={(Object.keys(contexts) as RuleContext[]).map((context) => ({ value: context, label: l(contexts[context].label) }))} onChange={(context) => set({ context: context as RuleContext })} />
            <NumberField key={`a-${state.context}`} label={l(say(`${first} (datua)`, `${first} (dato)`, `${first} (معلوم)`))} value={state.a} min={1} max={RULE_VALUE_MAX} onChange={(a) => set({ a })} language={props.language} />
            <NumberField key={`b-${state.context}`} label={l(say(`${second} (datua)`, `${second} (dato)`, `${second} (معلوم)`))} value={state.b} min={1} max={RULE_VALUE_MAX} onChange={(b) => set({ b })} language={props.language} />
            <NumberField key={`c-${state.context}`} label={l(say(`${first} (berria)`, `${first} (nuevo)`, `${first} (جديد)`))} value={state.c} min={1} max={RULE_VALUE_MAX} onChange={(c) => set({ c })} language={props.language} />
            <Segmented label={l(say('Metodoa', 'Método', 'الطريقة'))} value={state.method} options={[{ value: 'factor', label: l(say('Hiruko erregela', 'Regla de tres', 'قاعدة الثلاثة')) }, { value: 'unit', label: l(say('Unitatera laburtzea', 'Reducción a la unidad', 'الإرجاع إلى الوحدة')) }]} onChange={(method) => set({ method: method as RuleMethod })} />
        </>
    )

    const relation = trueRelation(state)
    const right = relationRight(state)
    const solved = ruleAnswered(state)
    const shown = right && (solved || state.revealed)
    const result = ruleResult(state)
    const product = state.a * state.b
    const latex = relation === 'direct'
        ? `x=\\frac{${state.b}\\cdot ${state.c}}{${state.a}}${roundedAnswer(result).rounded ? '\\approx ' : '='}${latexValue(result)}`
        : `x=\\frac{${state.a}\\cdot ${state.b}}{${state.c}}${roundedAnswer(result).rounded ? '\\approx ' : '='}${latexValue(result)}`
    const note = relation === 'direct'
        ? say(`Zuzena: zatidura ez da aldatzen, ${valueText('eu', fraction(state.b, state.a))} ${second} ${first} bakoitzeko.`, `Directa: el cociente no cambia, ${valueText('es', fraction(state.b, state.a))} ${second} por cada ${first}.`, `طردي: حاصل القسمة لا يتغيّر، ${valueText('ar', fraction(state.b, state.a))} ${second} لكل ${first}.`)
        : say(`Alderantzizkoa: biderkadura ez da aldatzen, ${state.a} · ${state.b} = ${product}.`, `Inversa: el producto no cambia, ${state.a} · ${state.b} = ${product}.`, `عكسي: حاصل الضرب لا يتغيّر، ⁦${state.a} · ${state.b} = ${product}⁩.`)
    const rounded = roundedAnswer(result).rounded

    const readout = (
        <>
            <div className="prediction">
                <p className="prediction-question">{l(say('Zer erlazio dago bi magnitudeen artean?', '¿Qué relación hay entre las dos magnitudes?', 'ما العلاقة بين المقدارين؟'))}</p>
                <div className="prediction-options" role="group" aria-label={l(say('Erlazioa', 'La relación', 'العلاقة'))}>
                    {(['direct', 'inverse'] as const).map((option) => (
                        <button
                            type="button"
                            key={option}
                            aria-pressed={state.relation === option}
                            className={state.relation === option ? (option === relation ? 'right' : 'wrong') : ''}
                            onClick={() => setState((current) => chooseRelation(current, option))}
                        >
                            {l(relationNames[option])}
                        </button>
                    ))}
                </div>
                {state.relation !== null && (
                    <p className={`prediction-feedback ${right ? 'right' : 'wrong'}`} aria-live="polite">
                        <strong>{right ? l(say('Bai!', '¡Sí!', 'نعم!')) : l(say('Ez. Saiatu berriro.', 'No. Prueba otra vez.', 'لا. حاول مرة أخرى.'))}</strong>{' '}
                        {l(info.why)}
                    </p>
                )}
            </div>
            {right && (
                <>
                    <ResultAnswer
                        language={props.language}
                        state={state}
                        expected={expectedRuleAnswer(state)}
                        placeholder={say('Adib.: 10', 'Ej.: 10', '⁦10⁩')}
                        unreadable={say('Idatzi zenbaki bat, adibidez 10 edo 67,5.', 'Escribe un número, por ejemplo 10 o 67,5.', 'اكتب عددًا، مثل 10 أو 67.5.')}
                        normalizeInput={readMoneyAnswer}
                        onChange={(patch) => setState((current) => ({ ...current, ...patch }))}
                    />
                    {rounded && !shown && <span className="fraction-v2-lab-readout-note">{l(say('Biribildu ehunenetara.', 'Redondea a las centésimas.', 'قرّب إلى أجزاء المئة.'))}</span>}
                    {ruleSlip(state) && !shown && (
                        <p className="fraction-v2-feedback error">
                            {l(relation === 'direct'
                                ? say('Hori alderantzizko erlazioaren emaitza litzateke. Begiratu beheko gezia: goian bezala biderkatzen da.', 'Ese sería el resultado si fuera inversa. Mira la flecha de abajo: se multiplica igual que arriba.', 'هذه نتيجة العلاقة العكسية. انظر إلى السهم السفلي: نضرب كما في الأعلى.')
                                : say('Hori erlazio zuzenaren emaitza litzateke. Begiratu beheko gezia: goian biderkatzen bada, behean zatitzen da.', 'Ese sería el resultado si fuera directa. Mira la flecha de abajo: si arriba se multiplica, abajo se divide.', 'هذه نتيجة العلاقة الطردية. انظر إلى السهم السفلي: إذا ضربنا في الأعلى نقسم في الأسفل.'))}
                        </p>
                    )}
                    {shown && (
                        <>
                            <span className="fraction-v2-lab-readout-main"><MathText text={`$${props.language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex}$`} /></span>
                            <span className="fraction-v2-lab-readout-note">{l(note)}</span>
                        </>
                    )}
                </>
            )}
        </>
    )

    // Two rows (one per magnitude) and a column per value; through the unit there is a middle column for 1
    const columns = state.method === 'factor' ? [150, 292] : [126, 222, 318]
    const top = 72
    const bottom = 150
    const cellWidth = state.method === 'factor' ? 84 : 74
    const k = ruleFactor(state)
    const kText = valueText(props.language, k, true)
    const topRow = state.method === 'factor' ? [String(state.a), String(state.c)] : [String(state.a), '1', String(state.c)]
    const bottomRow = state.method === 'factor'
        ? [String(state.b), shown ? valueText(props.language, result) : 'x']
        : [String(state.b), right ? valueText(props.language, unitValue(state)) : '?', shown ? valueText(props.language, result) : 'x']
    const topArrows = state.method === 'factor' ? [`· ${kText}`] : [`: ${state.a}`, `· ${state.c}`]
    const bottomArrows = !right
        ? topArrows.map(() => '?')
        : state.method === 'factor'
            ? [`${relation === 'direct' ? '·' : ':'} ${kText}`]
            : relation === 'direct' ? [`: ${state.a}`, `· ${state.c}`] : [`· ${state.a}`, `: ${state.c}`]
    const cell = (x: number, y: number, text: string, highlight: boolean, key: string, answer = false) => (
        <g key={key}>
            <rect x={x - cellWidth / 2} y={y} width={cellWidth} height={40} rx={9} fill={answer ? SUCCESS_TINT : highlight ? STAGE_TINT : CARD} stroke={answer ? GREEN : INK} strokeWidth={1.6} />
            <text x={x} y={y + 27} textAnchor="middle" fontSize={text.length > 6 ? 15 : 18} fontWeight={700} fill={text === 'x' || text === '?' ? MUTED : INK}>{text}</text>
        </g>
    )
    const hop = (x1: number, x2: number, y: number, label: string, below: boolean, key: string) => {
        const tip = below ? y + 22 : y - 22
        const color = label === '?' ? MUTED : below && right ? GREEN : STAGE
        return (
            <g key={key}>
                <path d={`M${x1 + 10} ${y} Q ${(x1 + x2) / 2} ${tip} ${x2 - 10} ${y}`} fill="none" stroke={color} strokeWidth={2} />
                <path d={`M${x2 - 10} ${y} l-9 ${below ? 2 : -2} l1 ${below ? 8 : -8} z`} fill={color} />
                <text x={(x1 + x2) / 2} y={below ? tip + 16 : tip - 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={color}>{label}</text>
            </g>
        )
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={ruleChallenges} extraChallenges={ruleExtra} state={state}>
            <svg viewBox="0 0 360 236" direction="ltr" role="img" aria-label={l(say('Gezidun hiruko erregela', 'La regla de tres con flechas', 'قاعدة الثلاثة بالأسهم'))} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
                <Label x={10} y={top + 26} fontSize={15} fontWeight={700} fill={STAGE}>{first}</Label>
                <Label x={10} y={bottom + 26} fontSize={15} fontWeight={700} fill={right ? GREEN : MUTED}>{second}</Label>
                {topRow.map((text, index) => cell(columns[index], top, text, index === 0, `top-${index}`))}
                {bottomRow.map((text, index) => cell(columns[index], bottom, text, index === 0, `bottom-${index}`, shown && index === bottomRow.length - 1))}
                {topArrows.map((label, index) => hop(columns[index], columns[index + 1], top - 4, label, false, `up-${index}`))}
                {bottomArrows.map((label, index) => hop(columns[index], columns[index + 1], bottom + 44, label, true, `down-${index}`))}
            </svg>
        </ToolFrame>
    )
}
