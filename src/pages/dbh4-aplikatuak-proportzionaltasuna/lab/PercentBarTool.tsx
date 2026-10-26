import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { readMoneyAnswer } from '../answers'
import {
    expectedPercentAnswer,
    initialPercentBarState,
    PERCENT_AMOUNT_MAX,
    PERCENT_RATE_MAX,
    percentAnswered,
    percentBarCase,
    percentBarChallenges,
    percentBarExtra,
    percentIndex,
    percentSlip,
    roundedAnswer,
    setPercentBar,
    type PercentBarState,
    type PercentChange,
    type PercentFind
} from './percentBar'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #c4432a)'
const STAGE_TINT = 'var(--stage-tint, #f7e1da)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #b42318)'
const CARD = 'var(--card, #fffcf6)'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })

/** A value for a sentence or a label: 30 000 and 143,99 (143.99 in Arabic); long decimals are rounded with ≈ */
function valueText(language: string, value: FractionValue) {
    const { value: shown, rounded } = roundedAnswer(value)
    const decimal = toExactDecimal(shown, language === 'ar' ? '.' : ',')!
    const grouped = language === 'ar' || Math.abs(toNumber(shown)) < 10000 ? decimal : decimal.replace(/^(\d+)/, (whole) => whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
    return `${rounded ? '≈ ' : ''}${grouped}`
}
/** The same inside LaTeX: 30\,000 and 143{,}99 */
function valueLatex(value: FractionValue) {
    const { value: shown } = roundedAnswer(value)
    const decimal = toExactDecimal(shown, ',')!
    const [whole, decimals] = decimal.split(',')
    const grouped = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    return decimals ? `${grouped}{,}${decimals}` : grouped
}
const relation = (value: FractionValue) => (roundedAnswer(value).rounded ? '\\approx ' : '=')

const findNames: Record<PercentChange, Record<PercentFind, Text>> = {
    of: { part: say('Zatia', 'La parte', 'الجزء'), whole: say('Osoa (% 100)', 'El total (100 %)', 'الكل (100٪)'), percent: say('Ehunekoa', 'El porcentaje', 'النسبة') },
    up: { part: say('Azken prezioa', 'El precio final', 'السعر النهائي'), whole: say('Hasierako prezioa', 'El precio inicial', 'السعر الأصلي'), percent: say('Igoera (%)', 'La subida (%)', 'الزيادة (٪)') },
    down: { part: say('Azken prezioa', 'El precio final', 'السعر النهائي'), whole: say('Hasierako prezioa', 'El precio inicial', 'السعر الأصلي'), percent: say('Beherapena (%)', 'La rebaja (%)', 'التخفيض (٪)') }
}

export function PercentBarTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PercentBarState>(initialPercentBarState)
    const set = (patch: Parameters<typeof setPercentBar>[1]) => setState((current) => setPercentBar(current, patch))
    const { find, change } = state
    const money = change !== 'of'
    const euro = money ? ' €' : ''
    const names = findNames[change]
    const controls = (
        <>
            <Segmented
                label={l(say('Egoera', 'Situación', 'الحالة'))}
                value={change}
                options={[
                    { value: 'of', label: l(say('Ehuneko bat', 'Un % de', 'نسبة من')) },
                    { value: 'up', label: l(say('Igoera', 'Subida', 'زيادة')) },
                    { value: 'down', label: l(say('Beherapena', 'Rebaja', 'تخفيض')) }
                ]}
                onChange={(next) => set({ change: next as PercentChange })}
            />
            <Segmented
                label={l(say('Zer bilatzen duzu?', '¿Qué buscas?', 'ماذا تبحث؟'))}
                value={find}
                options={(['part', 'whole', 'percent'] as const).map((option) => ({ value: option, label: l(names[option]) }))}
                onChange={(next) => set({ find: next as PercentFind })}
            />
            {find !== 'whole' && <NumberField key={`whole-${change}`} label={money ? l(say('Hasierako prezioa (€)', 'Precio inicial (€)', 'السعر الأصلي (€)')) : l(say('Osoa (% 100)', 'Total (100 %)', 'الكل (100٪)'))} value={state.whole} min={1} max={PERCENT_AMOUNT_MAX} onChange={(whole) => set({ whole })} language={props.language} />}
            {find !== 'part' && <NumberField key={`part-${change}`} label={money ? l(say('Azken prezioa (€)', 'Precio final (€)', 'السعر النهائي (€)')) : l(say('Zatia', 'Parte', 'الجزء'))} value={state.part} min={1} max={PERCENT_AMOUNT_MAX} onChange={(part) => set({ part })} language={props.language} />}
            {find !== 'percent' && <NumberField key={`rate-${change}`} label={l(change === 'of' ? say('Ehunekoa (%)', 'Porcentaje (%)', 'النسبة (٪)') : change === 'up' ? say('Igoera (%)', 'Subida (%)', 'الزيادة (٪)') : say('Beherapena (%)', 'Rebaja (%)', 'التخفيض (٪)'))} value={state.rate} min={1} max={PERCENT_RATE_MAX[change]} onChange={(rate) => set({ rate })} language={props.language} />}
        </>
    )

    const situation = percentBarCase(state)
    const solved = percentAnswered(state)
    const shown = solved || state.revealed
    const percent = toNumber(situation.percent)
    const index = valueLatex(percentIndex(state))
    const rateValue = find === 'percent' ? situation.unknown : fraction(state.rate)
    const rateText = valueText(props.language, rateValue)
    const percentText = valueText(props.language, situation.percent)

    let readout: ReactNode
    if (!situation.valid) {
        readout = (
            <span className="fraction-v2-lab-readout-note">
                {l(change === 'up'
                    ? say('Azken prezioa ez da hasierakoa baino handiagoa: ez dago igoerarik. Aukeratu «Beherapena».', 'El precio final no es mayor que el inicial: no hay subida. Elige «Rebaja».', 'السعر النهائي ليس أكبر من الأصلي: لا توجد زيادة. اختر «تخفيض».')
                    : say('Azken prezioa ez da hasierakoa baino txikiagoa: ez dago beherapenik. Aukeratu «Igoera».', 'El precio final no es menor que el inicial: no hay rebaja. Elige «Subida».', 'السعر النهائي ليس أصغر من الأصلي: لا يوجد تخفيض. اختر «زيادة».'))}
            </span>
        )
    } else {
        // Part : total is the index; times 100, the percentage
        const quotient = fraction(situation.percent.numerator, situation.percent.denominator * 100)
        const latex = find === 'part'
            ? `${valueLatex(situation.whole)}\\cdot ${index}${relation(situation.part)}${valueLatex(situation.part)}`
            : find === 'whole'
                ? `${valueLatex(situation.part)}\\mathbin{:}${index}${relation(situation.whole)}${valueLatex(situation.whole)}`
                : `${valueLatex(situation.part)}\\mathbin{:}${valueLatex(situation.whole)}${relation(quotient)}${valueLatex(quotient)}\\ \\to\\ ${roundedAnswer(situation.percent).rounded ? '\\approx ' : ''}${valueLatex(situation.percent)}\\,\\%`
        const idx = index.replace('{,}', props.language === 'ar' ? '.' : ',')
        const meaning = change === 'of'
            ? say(`% ${percentText} hartzea ${idx} zenbakiaz biderkatzea da.`, `El ${percentText} % es multiplicar por ${idx}.`, `أخذ ${percentText}٪ يعني الضرب في ${idx}.`)
            : change === 'up'
                ? say(`% ${rateText} igotzea ${idx} zenbakiaz biderkatzea da: prezio berria lehengoaren % ${percentText} da.`, `Subir un ${rateText} % es multiplicar por ${idx}: el precio nuevo es el ${percentText} % del de antes.`, `رفع ${rateText}٪ يعني الضرب في ${idx}: السعر الجديد هو ${percentText}٪ من القديم.`)
                : say(`% ${rateText} merketzea ${idx} zenbakiaz biderkatzea da: % ${percentText} ordaintzen da.`, `Rebajar un ${rateText} % es multiplicar por ${idx}: se paga el ${percentText} %.`, `تخفيض ${rateText}٪ يعني الضرب في ${idx}: يُدفع ${percentText}٪.`)
        const backwards = find === 'whole' ? say(' Atzera egiteko, zatitu egiten da.', ' Hacia atrás, se divide.', ' وللرجوع إلى الأصل نقسم.') : say('', '', '')
        const rounded = roundedAnswer(situation.unknown).rounded
        const slip = percentSlip(state)
        readout = (
            <>
                <ResultAnswer
                    language={props.language}
                    state={state}
                    expected={expectedPercentAnswer(state)}
                    placeholder={say('Adib.: 112', 'Ej.: 112', '⁦112⁩')}
                    unreadable={say('Idatzi zenbaki bat, adibidez 112 edo 143,99.', 'Escribe un número, por ejemplo 112 o 143,99.', 'اكتب عددًا، مثل 112 أو 143.99.')}
                    normalizeInput={readMoneyAnswer}
                    onChange={(patch) => setState((current) => ({ ...current, ...patch }))}
                />
                {rounded && !shown && <span className="fraction-v2-lab-readout-note">{l(say('Biribildu ehunenetara.', 'Redondea a las centésimas.', 'قرّب إلى أجزاء المئة.'))}</span>}
                {slip && !shown && (
                    <p className="fraction-v2-feedback error">
                        {l(slip === 'added'
                            ? say(`Hori da ohiko akatsa: % ${rateText} lehengo prezioari dagokio, ez azken prezioari. Zatitu indizeaz.`, `Ese es el error típico: el ${rateText} % es del precio de antes, no del precio final. Divide entre el índice.`, `هذا هو الخطأ الشائع: النسبة ${rateText}٪ من السعر القديم لا من السعر النهائي. اقسم على المؤشر.`)
                            : say('Indizeaz biderkatu duzu. % 100 berreskuratzeko, zatitu egin behar da.', 'Has multiplicado por el índice. Para volver al 100 % hay que dividir.', 'ضربت في المؤشر. للرجوع إلى 100٪ يجب أن تقسم.'))}
                    </p>
                )}
                {shown && (
                    <>
                        <span className="fraction-v2-lab-readout-main"><MathText text={`$${props.language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex}$`} /></span>
                        <span className="fraction-v2-lab-readout-note">{`${l(meaning)}${l(backwards)}`}</span>
                    </>
                )}
            </>
        )
    }

    // Both bars on one scale: 300 units for the longer of 100 % and the compared percentage
    const x0 = 30
    const unit = 300 / Math.max(100, percent)
    const full = 100 * unit
    const middle = x0 + full / 2
    const length = Math.max(0, percent) * unit
    const known = (which: PercentFind) => find !== which || shown
    const wholeText = known('whole') ? `${valueText(props.language, situation.whole)}${euro}` : '?'
    const partText = known('part') ? `${valueText(props.language, situation.part)}${euro}` : '?'
    const percentLabel = known('percent') ? `${percentText} %` : '? %'
    const ticks = (y: number, width: number) => Array.from({ length: Math.floor(width / (10 * unit) + 1e-9) }, (_, step) => step + 1)
        .filter((step) => step * 10 * unit < width - 0.5)
        .map((step) => <line key={step} x1={x0 + step * 10 * unit} x2={x0 + step * 10 * unit} y1={y} y2={y + 34} stroke={INK} strokeWidth={0.8} strokeOpacity={0.45} />)
    const tag = change === 'up' ? `+${known('percent') ? rateText : '?'} %` : change === 'down' ? `−${known('percent') ? rateText : '?'} %` : ''
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={percentBarChallenges} extraChallenges={percentBarExtra} state={state}>
            <svg viewBox="0 0 360 206" direction="ltr" role="img" aria-label={l(say('Ehunekoaren barrak', 'Las barras del porcentaje', 'أشرطة النسبة المئوية'))} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
                <text x={x0} y={28} fontSize={15} fontWeight={700} fill={INK}>100 %</text>
                <rect x={x0} y={36} width={full} height={34} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                {ticks(36, full)}
                <text x={x0 + full / 2} y={59} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{wholeText}</text>

                {/* The index takes the 100 % bar to the other one; going back, it divides */}
                <line x1={middle} x2={middle} y1={74} y2={102} stroke={STAGE} strokeWidth={2} />
                <path d={find === 'whole' ? `M${middle} 72 l-5 9 h10 z` : `M${middle} 104 l-5 -9 h10 z`} fill={STAGE} />
                <text x={middle + 9} y={94} fontSize={15} fontWeight={700} fill={STAGE}>{known('percent') ? `${find === 'whole' ? ':' : '·'} ${index.replace('{,}', props.language === 'ar' ? '.' : ',')}` : '· ?'}</text>

                <text x={x0} y={118} fontSize={15} fontWeight={700} fill={INK}>{percentLabel}</text>
                {tag && <text x={x0 + (Math.min(full, length) + Math.max(full, length)) / 2} y={118} textAnchor="middle" fontSize={15} fontWeight={700} fill={change === 'up' ? GREEN : RED}>{tag}</text>}
                <rect x={x0} y={126} width={Math.min(full, length)} height={34} fill={STAGE} fillOpacity={0.45} stroke={INK} strokeWidth={1.6} />
                {length > full && <rect x={x0 + full} y={126} width={length - full} height={34} fill={GREEN} fillOpacity={0.5} stroke={INK} strokeWidth={1.6} />}
                {length < full && <rect x={x0 + length} y={126} width={full - length} height={34} fill={CARD} fillOpacity={0.4} stroke={RED} strokeWidth={1.6} strokeDasharray="5 4" />}
                {ticks(126, length)}
                <text x={x0 + Math.max(length, 60) / 2} y={149} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{partText}</text>

                {known('whole') && (
                    <Label x={x0} y={192} fontSize={14} fontWeight={700} fill={MUTED}>{`${l(say('Zati bakoitza', 'Cada trozo', 'كل قطعة'))}: \u206610 % = ${valueText(props.language, fraction(situation.whole.numerator, situation.whole.denominator * 10))}${euro}\u2069`}</Label>
                )}
            </svg>
        </ToolFrame>
    )
}
