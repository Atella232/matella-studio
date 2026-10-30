import { useId, useState } from 'react'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { decimalFieldText, readDecimalField } from './decimalInput'

/** Like NumberField, with decimals: applied when it is valid (Enter or leaving the field) */
export function DecimalField({ label, value, min, max, onChange, language, money = false }: {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
    language: UnitLanguage
    /** Euros: shown with two decimals when they have cents */
    money?: boolean
}) {
    const l = useLabText(language)
    const id = useId()
    const format = (number: number) => decimalFieldText(number, language, money)
    const [text, setText] = useState(format(value))
    const [shown, setShown] = useState({ value, language })
    // Keep the field in step when the value changes from outside (e.g. another unknown), or the language (3,2 → 3.2)
    if (shown.value !== value || shown.language !== language) {
        setShown({ value, language })
        setText(format(value))
    }
    const parsed = readDecimalField(text, language)
    const valid = parsed !== null && parsed >= min && parsed <= max
    const apply = () => { if (valid && parsed !== value) onChange(parsed) }
    return (
        <div className="fraction-v2-number-field">
            <label htmlFor={id} className="fraction-v2-stepper-label">{label}</label>
            <div>
                <input id={id} value={text} inputMode="decimal" autoComplete="off" dir="ltr" onChange={(event) => setText(event.target.value)} onBlur={apply} onKeyDown={(event) => { if (event.key === 'Enter') apply() }} aria-invalid={!valid} />
                <button type="button" className="fraction-v2-secondary" onClick={apply} disabled={!valid}>{l({ eu: 'Erabili', es: 'Usar', en: 'Use', ar: 'استخدم' })}</button>
            </div>
            {!valid && <small>{l({ eu: `Idatzi ${format(min)} eta ${format(max)} arteko zenbaki bat, gehienez bi hamartarrekin.`, es: `Escribe un número entre ${format(min)} y ${format(max)}, con dos decimales como mucho.`, en: `Write a number between ${format(min)} and ${format(max)}, with two decimal places at most.`, ar: `اكتب عددًا بين ${format(min)} و${format(max)}، بمنزلتين عشريتين على الأكثر.` })}</small>}
        </div>
    )
}
