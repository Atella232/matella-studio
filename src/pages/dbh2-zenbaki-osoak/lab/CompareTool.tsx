import { useState } from 'react'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NumberLine } from '../figures'
import { signed } from '../format'
import { compareChallenges, initialCompareState, LINE_LIMITS, relationOf, setCompareValue, type CompareState, type IntegerToolProps, type Relation } from './labTools'

const relations: Relation[] = ['<', '=', '>']

export function CompareTool(props: IntegerToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompareState>(initialCompareState)
    const { first, second, guess } = state
    const truth = relationOf(first, second)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Lehen zenbakia (a)', es: 'Primer número (a)', ar: 'العدد الأول (a)' })} value={first} min={LINE_LIMITS.min} max={LINE_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setCompareValue(current, 'first', next))} language={props.language} />
            <Stepper label={l({ eu: 'Bigarren zenbakia (b)', es: 'Segundo número (b)', ar: 'العدد الثاني (b)' })} value={second} min={LINE_LIMITS.min} max={LINE_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setCompareValue(current, 'second', next))} language={props.language} />
        </>
    )

    const readout = guess && (
        <>
            <span className="fraction-v2-lab-readout-main" dir="ltr">{signed(first)} {truth} {signed(second)}</span>
            <span className="fraction-v2-lab-readout-note">
                {guess === truth
                    ? l({ eu: 'Asmatu duzu! Begiratu zuzenean: eskuinean dagoena da handiena.', es: '¡Acertaste! Mira la recta: el que está más a la derecha es el mayor.', ar: 'أصبت! انظر إلى الخط: العدد الواقع إلى اليمين هو الأكبر.' })
                    : l({ eu: 'Ez da hori. Begiratu zuzenean zein dagoen eskuinerago.', es: 'No es eso. Mira en la recta cuál está más a la derecha.', ar: 'ليس كذلك. انظر إلى الخط: أيهما يقع إلى اليمين أكثر؟' })}
            </span>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout || undefined} challenges={compareChallenges} state={state}>
            <div className="integers-lab-compare">
                <p className="integers-lab-question">{l({ eu: 'Zein ikur doa erdian?', es: '¿Qué signo va en medio?', ar: 'أي رمز يوضع في الوسط؟' })}</p>
                <div className="integers-lab-guess" dir="ltr">
                    <strong>{signed(first)}</strong>
                    {relations.map((relation) => (
                        <button
                            type="button"
                            aria-pressed={guess === relation}
                            className={guess === relation ? (relation === truth ? 'right' : 'wrong') : ''}
                            onClick={() => setState((current) => ({ ...current, guess: relation }))}
                            key={relation}
                        >
                            {relation}
                        </button>
                    ))}
                    <strong>{signed(second)}</strong>
                </div>
                {guess ? (
                    <div className="integers-lab-figure">
                        <NumberLine
                            min={LINE_LIMITS.min}
                            max={LINE_LIMITS.max}
                            points={[
                                { value: first, label: `a = ${signed(first)}` },
                                { value: second, label: `b = ${signed(second)}`, tone: 'second', raise: Math.abs(first - second) < 4 }
                            ]}
                            language={props.language}
                        />
                    </div>
                ) : (
                    <p className="fraction-v2-lab-tip">{l({ eu: 'Aukeratu ikur bat zuzena ikusteko.', es: 'Elige un signo para ver la recta.', ar: 'اختر رمزًا لرؤية الخط.' })}</p>
                )}
            </div>
        </ToolFrame>
    )
}
