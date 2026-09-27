import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NumberLine } from '../figures'
import { signed } from '../format'
import { describeLineValue, initialLineState, LINE_LIMITS, lineChallenges, setLineValue, type IntegerToolProps, type LineContext, type LineState } from './labTools'

const unitOf: Record<LineContext, string> = { plain: '', temperature: ' °C', floors: '', sea: ' m' }

export function LineTool(props: IntegerToolProps & { challenges?: LabChallenge<LineState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LineState>(initialLineState)
    const { context, value } = state
    const written = `${signed(value)}${unitOf[context]}`

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Egoera', es: 'Situación', ar: 'الموقف' })}
                value={context}
                options={[
                    { value: 'plain', label: l({ eu: 'Zuzena', es: 'Recta', ar: 'الخط' }) },
                    { value: 'temperature', label: l({ eu: 'Termometroa', es: 'Termómetro', ar: 'ميزان الحرارة' }) },
                    { value: 'floors', label: l({ eu: 'Eraikina', es: 'Edificio', ar: 'المبنى' }) },
                    { value: 'sea', label: l({ eu: 'Itsasoa', es: 'Mar', ar: 'البحر' }) }
                ]}
                onChange={(next) => setState((current) => ({ ...current, context: next }))}
            />
            <Stepper
                label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })}
                value={value}
                min={LINE_LIMITS.min}
                max={LINE_LIMITS.max}
                format={(next) => signed(next)}
                onChange={(next) => setState((current) => setLineValue(current, next))}
                language={props.language}
            />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Zuzenean sakatu edo arrastatu ere egin dezakezu.', es: 'También puedes pulsar o arrastrar sobre la recta.', ar: 'يمكنك أيضًا الضغط على الخط أو السحب عليه.' })}</p>
        </>
    )

    const readout = (
        <span className="fraction-v2-lab-readout-main integers-lab-reading">
            <strong dir="ltr">{written}</strong>
            <span>{l(describeLineValue(context, value))}</span>
        </span>
    )

    const zeroName = {
        plain: { eu: 'Zeroa', es: 'El cero', ar: 'الصفر' },
        temperature: { eu: '0 °C', es: '0 °C', ar: '0 °م' },
        floors: { eu: 'Behe solairua = 0', es: 'Planta baja = 0', ar: 'الطابق الأرضي = 0' },
        sea: { eu: 'Itsas maila = 0', es: 'Nivel del mar = 0', ar: 'مستوى سطح البحر = 0' }
    }[context]

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? lineChallenges} state={state}>
            <div className="integers-lab-figure">
                <NumberLine
                    min={LINE_LIMITS.min}
                    max={LINE_LIMITS.max}
                    points={[{ value, label: written }]}
                    spans={value === 0 ? [] : [{ from: 0, to: value, tone: value < 0 ? 'second' : 'stage' }]}
                    caption={l(zeroName)}
                    braces
                    onPick={(next) => setState((current) => setLineValue(current, next))}
                    language={props.language}
                />
            </div>
        </ToolFrame>
    )
}
