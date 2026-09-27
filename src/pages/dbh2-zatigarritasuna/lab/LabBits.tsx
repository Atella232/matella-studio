import { useId, useState, type ComponentProps } from 'react'
import { ResultAnswer } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'

/** A typed whole number, applied when it is valid (Enter or leaving the field) */
export function NumberField({ label, value, min, max, onChange, language }: {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
    language: UnitLanguage
}) {
    const l = useLabText(language)
    const id = useId()
    const [text, setText] = useState(String(value))
    const [shown, setShown] = useState(value)
    // Keep the field in step when the value changes from outside (e.g. a random number)
    if (shown !== value) {
        setShown(value)
        setText(String(value))
    }
    const parsed = Number(text.replace(/\s/g, ''))
    const valid = /^\d+$/.test(text.replace(/\s/g, '')) && parsed >= min && parsed <= max
    const apply = () => { if (valid && parsed !== value) onChange(parsed) }
    return (
        <div className="divisibility-number-field">
            <label htmlFor={id} className="fraction-v2-stepper-label">{label}</label>
            <div>
                <input id={id} value={text} inputMode="numeric" autoComplete="off" onChange={(event) => setText(event.target.value)} onBlur={apply} onKeyDown={(event) => { if (event.key === 'Enter') apply() }} aria-invalid={!valid} />
                <button type="button" className="fraction-v2-secondary" onClick={apply} disabled={!valid}>{l({ eu: 'Erabili', es: 'Usar', ar: 'استخدم' })}</button>
            </div>
            {!valid && <small>{l({ eu: `Idatzi ${min} eta ${max} arteko zenbaki oso bat.`, es: `Escribe un número entero entre ${min} y ${max}.`, ar: `اكتب عددًا صحيحًا بين ${min} و${max}.` })}</small>}
        </div>
    )
}

/** "Your result" for whole-number answers */
export function WholeAnswer(props: Omit<ComponentProps<typeof ResultAnswer>, 'placeholder' | 'unreadable'>) {
    return (
        <ResultAnswer
            {...props}
            placeholder={{ eu: 'Adib.: 12', es: 'Ej.: 12', ar: 'مثال: 12' }}
            unreadable={{ eu: 'Idatzi zenbaki oso bat, adibidez 12.', es: 'Escribe un número entero, por ejemplo 12.', ar: 'اكتب عددًا صحيحًا، مثل 12.' }}
        />
    )
}
