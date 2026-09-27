import { useId, useState } from 'react'
import type { UnitLanguage } from '../types'
import { useLabText } from './useLabText'

/** A typed whole number, applied when it is valid (Enter or leaving the field) */
export function NumberField({ label, value, min, max, onChange, language, format = String }: {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
    language: UnitLanguage
    /** How the value is shown in the field, e.g. 15.000 */
    format?: (value: number) => string
}) {
    const l = useLabText(language)
    const id = useId()
    const [text, setText] = useState(format(value))
    const [shown, setShown] = useState(value)
    // Keep the field in step when the value changes from outside (e.g. a random number)
    if (shown !== value) {
        setShown(value)
        setText(format(value))
    }
    // Spaces are ignored, and so are points that group digits in threes (15.000)
    const trimmed = text.trim()
    const digits = /^\d{1,3}(?:[.\s]\d{3})+$/.test(trimmed) ? trimmed.replace(/\D/g, '') : trimmed.replace(/\s/g, '')
    const parsed = Number(digits)
    const valid = /^\d+$/.test(digits) && parsed >= min && parsed <= max
    const apply = () => { if (valid && parsed !== value) onChange(parsed) }
    return (
        <div className="fraction-v2-number-field">
            <label htmlFor={id} className="fraction-v2-stepper-label">{label}</label>
            <div>
                <input id={id} value={text} inputMode="numeric" autoComplete="off" onChange={(event) => setText(event.target.value)} onBlur={apply} onKeyDown={(event) => { if (event.key === 'Enter') apply() }} aria-invalid={!valid} />
                <button type="button" className="fraction-v2-secondary" onClick={apply} disabled={!valid}>{l({ eu: 'Erabili', es: 'Usar', ar: 'استخدم' })}</button>
            </div>
            {!valid && <small>{l({ eu: `Idatzi ${format(min)} eta ${format(max)} arteko zenbaki oso bat.`, es: `Escribe un número entero entre ${format(min)} y ${format(max)}.`, ar: `اكتب عددًا صحيحًا بين ${format(min)} و${format(max)}.` })}</small>}
        </div>
    )
}
