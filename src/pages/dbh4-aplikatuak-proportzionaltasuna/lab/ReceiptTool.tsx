import { useId, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { readMoneyAnswer } from '../answers'
import {
    couponTotals,
    expectedReceiptAnswer,
    initialReceiptState,
    moveReceiptStep,
    RECEIPT_COUPON_MAX,
    RECEIPT_DISCOUNT_MAX,
    RECEIPT_PRICE_MAX,
    RECEIPT_VATS,
    receiptAnswered,
    receiptChallenges,
    receiptExtra,
    receiptLatex,
    receiptLines,
    receiptTotal,
    receiptValid,
    setReceipt,
    stepIndex,
    stepUsed,
    type ReceiptState,
    type ReceiptStep
} from './receipt'
import { roundedAnswer } from './percentBar'
import './Receipt.css'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #b42318)'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })

/** Euros on a receipt: always two decimals, 64,00 (64.00 in Arabic), with a real minus sign */
function money(language: string, value: FractionValue, sign = false) {
    const cents = Math.round(toNumber(value) * 100)
    const text = (Math.abs(cents) / 100).toFixed(2)
    const prefix = sign ? (cents < 0 ? '−' : '+') : cents < 0 ? '−' : ''
    return `${prefix}${language === 'ar' ? text : text.replace('.', ',')}`
}

/** Amounts and signs stay left to right inside an Arabic page («? €», «−16.00») */
const ltr = (text: string) => `\u2066${text}\u2069`

/** An index on the receipt: 0,8 or 1,21 (0.8 or 1.21 in Arabic) */
const decimal = (language: string, value: FractionValue) => (language === 'ar' ? String(toNumber(value)) : String(toNumber(value)).replace('.', ','))

const stepNames: Record<ReceiptStep, Text> = {
    discount: say('Deskontua', 'Descuento', 'الخصم'),
    vat: say('BEZa', 'IVA', 'الضريبة'),
    coupon: say('Kupoia', 'Cupón', 'القسيمة')
}

/** What a line says on the receipt: «Descuento 20 %», «IVA 21 %», «Cupón 5 €» */
function lineName(state: ReceiptState, step: ReceiptStep): Text {
    if (step === 'discount') return say(`Deskontua % ${state.discount}`, `Descuento ${state.discount} %`, `الخصم ${state.discount}٪`)
    if (step === 'vat') return say(`BEZa % ${state.vat}`, `IVA ${state.vat} %`, `الضريبة ${state.vat}٪`)
    return say(`Kupoia ${state.coupon} €`, `Cupón ${state.coupon} €`, `القسيمة ${state.coupon} €`)
}

/** The three lines in order, each with buttons to move it up or down */
function OrderList({ state, language, onMove }: { state: ReceiptState; language: LabToolProps['language']; onMove: (step: ReceiptStep, direction: -1 | 1) => void }) {
    const l = useLabText(language)
    const labelId = useId()
    return (
        <div className="receipt-order" role="group" aria-labelledby={labelId}>
            <span id={labelId} className="fraction-v2-stepper-label">{l(say('Tiketaren ordena', 'Orden del tique', 'ترتيب الإيصال'))}</span>
            <ol>
                {state.order.map((step, position) => (
                    <li key={step} className={stepUsed(state, step) ? '' : 'unused'}>
                        <span>{l(lineName(state, step))}</span>
                        <button type="button" aria-label={`${l(say('Igo', 'Subir', 'إلى الأعلى'))}: ${l(stepNames[step])}`} disabled={position === 0} onClick={() => onMove(step, -1)}>↑</button>
                        <button type="button" aria-label={`${l(say('Jaitsi', 'Bajar', 'إلى الأسفل'))}: ${l(stepNames[step])}`} disabled={position === state.order.length - 1} onClick={() => onMove(step, 1)}>↓</button>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export function ReceiptTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const ar = props.language === 'ar'
    const [state, setState] = useState<ReceiptState>(initialReceiptState)
    const set = (patch: Parameters<typeof setReceipt>[1]) => setState((current) => setReceipt(current, patch))
    const controls = (
        <>
            <NumberField label={l(say('Prezioa BEZik gabe (€)', 'Precio sin IVA (€)', 'السعر دون ضريبة (€)'))} value={state.price} min={1} max={RECEIPT_PRICE_MAX} onChange={(price) => set({ price })} language={props.language} />
            <NumberField label={l(say('Deskontua (%)', 'Descuento (%)', 'الخصم (٪)'))} value={state.discount} min={0} max={RECEIPT_DISCOUNT_MAX} onChange={(discount) => set({ discount })} language={props.language} />
            <Segmented label={l(say('BEZa', 'IVA', 'الضريبة'))} value={String(state.vat)} options={RECEIPT_VATS.map((vat) => ({ value: String(vat), label: ar ? `${vat}٪` : props.language === 'eu' ? `% ${vat}` : `${vat} %` }))} onChange={(vat) => set({ vat: Number(vat) })} />
            <NumberField label={l(say('Kupoia (€)', 'Cupón (€)', 'القسيمة (€)'))} value={state.coupon} min={0} max={RECEIPT_COUPON_MAX} onChange={(coupon) => set({ coupon })} language={props.language} />
            <OrderList state={state} language={props.language} onMove={(step, direction) => setState((current) => moveReceiptStep(current, step, direction))} />
        </>
    )

    const valid = receiptValid(state)
    const solved = receiptAnswered(state)
    const shown = valid && (solved || state.revealed)
    const lines = receiptLines(state)
    const total = receiptTotal(state)

    let readout: ReactNode
    if (!valid) {
        readout = (
            <span className="fraction-v2-lab-readout-note">
                {l(say('Kupoia ordaintzeko geratzen dena baino handiagoa da: aldatu bere tokia edo txikitu.', 'El cupón es mayor que lo que queda por pagar: cámbialo de sitio o bájalo.', 'القسيمة أكبر مما بقي للدفع: غيّر مكانها أو قلّلها.'))}
            </span>
        )
    } else {
        const latex = receiptLatex(state)
        const swap = state.discount > 0
            ? say(' Deskontua eta BEZa trukatuz gero, guztira berdina da: biderkatzean, ordenak ez du axola.', ' Si cambias el descuento y el IVA de sitio, el total es el mismo: multiplicar no depende del orden.', ' إذا بدّلت مكاني الخصم والضريبة يبقى المجموع نفسه: الضرب لا يتعلق بالترتيب.')
            : say('', '', '')
        const places = couponTotals(state).map((value) => (value ? `${money(props.language, value)} €` : '—'))
        const couponNote = state.coupon > 0
            ? say(
                ` Kupoia hasieran: ${places[0]}; erdian: ${places[1]}; amaieran: ${places[2]}.`,
                ` Con el cupón al principio pagarías ${places[0]}; en medio, ${places[1]}; al final, ${places[2]}.`,
                ` بالقسيمة في البداية تدفع \u2066${places[0]}\u2069، وفي الوسط \u2066${places[1]}\u2069، وفي النهاية \u2066${places[2]}\u2069.`
            )
            : say('', '', '')
        readout = (
            <>
                <ResultAnswer
                    language={props.language}
                    state={state}
                    expected={expectedReceiptAnswer(state)}
                    placeholder={say('Adib.: 77,44', 'Ej.: 77,44', '\u206677.44\u2069')}
                    unreadable={say('Idatzi zenbaki bat, adibidez 77,44.', 'Escribe un número, por ejemplo 77,44.', 'اكتب عددًا، مثل 77.44.')}
                    normalizeInput={readMoneyAnswer}
                    onChange={(patch) => setState((current) => ({ ...current, ...patch }))}
                />
                {roundedAnswer(total).rounded && !shown && <span className="fraction-v2-lab-readout-note">{l(say('Biribildu zentimoetara.', 'Redondea a los céntimos.', 'قرّب إلى السنتات.'))}</span>}
                {shown && (
                    <>
                        <span className="fraction-v2-lab-readout-main"><MathText text={`$${ar ? latex.replace(/\{,\}/g, '.') : latex}$`} /></span>
                        <span className="fraction-v2-lab-readout-note">{`${l(say('Aldaketa bakoitzak bere indizeaz biderkatzen du; kupoiak euroak kentzen ditu.', 'Cada cambio multiplica por su índice; el cupón resta euros.', 'كل تغيّر يضرب في مؤشره؛ والقسيمة تطرح يوروهات.'))}${l(swap)}${l(couponNote)}`.trim()}</span>
                    </>
                )}
            </>
        )
    }

    // The receipt, names on the left and amounts on the right in every language (Label keeps Arabic names readable)
    const rowHeight = 30
    const top = 56
    const height = top + rowHeight * (lines.length + 1) + 66
    const totalY = top + rowHeight * (lines.length + 1) + 26
    // The torn bottom edge, from right to left: 15 teeth of 20 units
    const zigzag = Array.from({ length: 15 }, () => 'l-10 8 l-10 -8').join(' ')
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={receiptChallenges} extraChallenges={receiptExtra} state={state}>
            <svg viewBox={`0 0 320 ${height}`} direction="ltr" role="img" aria-label={l(say('Erosketaren tiketa', 'El tique de la compra', 'إيصال الشراء'))} style={{ display: 'block', width: '100%', maxWidth: 460, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
                <path d={`M10 6 H310 V${height - 16} ${zigzag} Z`} fill="#fffcf6" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
                <text x={160} y={36} textAnchor="middle" fontSize={15} fontWeight={700} letterSpacing={3} fill={MUTED}>{l(say('TIKETA', 'TIQUE', 'إيصال'))}</text>

                <Label x={24} y={top + 20} fontSize={15} fill={INK}>{l(say('Prezioa BEZik gabe', 'Precio sin IVA', 'السعر دون ضريبة'))}</Label>
                <text x={296} y={top + 20} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>{ltr(money(props.language, fraction(state.price)))}</text>

                {lines.map((line, row) => {
                    const y = top + rowHeight * (row + 1) + 20
                    const index = stepIndex(state, line.step)
                    const operation = index ? `· ${decimal(props.language, index)}` : `− ${state.coupon}`
                    const color = line.step === 'vat' ? GREEN : RED
                    return (
                        <g key={line.step}>
                            <Label x={24} y={y} fontSize={15} fill={INK}>{l(lineName(state, line.step))}</Label>
                            <text x={214} y={y} textAnchor="end" fontSize={15} fontWeight={700} fill={shown ? color : STAGE}>{ltr(shown ? money(props.language, line.change, true) : operation)}</text>
                            <text x={296} y={y} textAnchor="end" fontSize={16} fontWeight={700} fill={shown ? INK : MUTED}>{ltr(shown ? money(props.language, line.after) : '?')}</text>
                        </g>
                    )
                })}

                <line x1={20} x2={300} y1={totalY - 24} y2={totalY - 24} stroke={INK} strokeWidth={1.2} strokeDasharray="4 4" />
                <Label x={24} y={totalY} fontSize={18} fontWeight={700} fill={INK}>{l(say('GUZTIRA', 'TOTAL', 'المجموع'))}</Label>
                <text x={296} y={totalY} textAnchor="end" fontSize={19} fontWeight={700} fill={shown ? GREEN : INK}>{ltr(shown ? `${money(props.language, total)} €` : '? €')}</text>
            </svg>
        </ToolFrame>
    )
}
