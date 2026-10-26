import type { ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import type { LocalizedText } from '../content'
import type { Relation, ToolProps } from './labTools'
import { useLabText } from './useLabText'
import './Prediction.css'

const RELATIONS: Relation[] = ['<', '=', '>']

const defaultLabels: Record<Relation, LocalizedText> = {
    '<': { eu: 'Txikiagoa', es: 'Menor', ar: 'أصغر' },
    '=': { eu: 'Berdina', es: 'Igual', ar: 'يساوي' },
    '>': { eu: 'Handiagoa', es: 'Mayor', ar: 'أكبر' }
}

/**
 * "Predict before you calculate": the learner first says whether the result
 * will be less than, equal to or greater than a reference; the answer field
 * (the children) opens once there is a prediction.
 */
export function PredictionStep({
    language,
    question,
    labels = defaultLabels,
    actual,
    choice,
    tip,
    wait,
    onChoose,
    children
}: {
    language: ToolProps['language']
    question: LocalizedText
    labels?: Record<Relation, LocalizedText>
    /** Where the result really is */
    actual: Relation
    choice: Relation | null
    /** Why, shown after the prediction */
    tip: LocalizedText
    /** What to do before predicting; by default, «predict, then write the result» */
    wait?: LocalizedText
    onChoose: (relation: Relation) => void
    children: ReactNode
}) {
    const l = useLabText(language)
    const right = choice === actual
    return (
        <>
            <div className="prediction">
                <p className="prediction-question"><MathText text={l(question)} /></p>
                <div className="prediction-options" role="group" aria-label={l({ eu: 'Zure iragarpena', es: 'Tu predicción', ar: 'توقّعك' })}>
                    {RELATIONS.map((relation) => (
                        <button
                            type="button"
                            key={relation}
                            aria-pressed={choice === relation}
                            className={choice === null ? '' : relation === actual ? 'right' : relation === choice ? 'wrong' : ''}
                            disabled={choice !== null}
                            onClick={() => onChoose(relation)}
                        >
                            {l(labels[relation])}
                        </button>
                    ))}
                </div>
                {choice !== null && (
                    <p className={`prediction-feedback ${right ? 'right' : 'wrong'}`} aria-live="polite">
                        <strong>{right ? l({ eu: 'Ondo pentsatuta!', es: '¡Bien pensado!', ar: 'أحسنت التفكير!' }) : l({ eu: 'Ez da horrela.', es: 'No es así.', ar: 'ليس كذلك.' })}</strong>{' '}
                        <MathText text={l(tip)} />
                    </p>
                )}
            </div>
            {choice === null
                ? <p className="prediction-wait">{l(wait ?? { eu: 'Iragarri lehenik; gero idatzi emaitza.', es: 'Primero predice; después escribe el resultado.', ar: 'توقّع أولًا، ثم اكتب النتيجة.' })}</p>
                : children}
        </>
    )
}
