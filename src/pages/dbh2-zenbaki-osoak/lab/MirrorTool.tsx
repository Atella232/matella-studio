import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NumberLine, type NumberLinePoint, type NumberLineSpan } from '../figures'
import { signed } from '../format'
import { oppositeLatex, signedTex as tex, yesNo } from './text'
import { initialMirrorState, LINE_LIMITS, mirrorChallenges, setMirrorValue, type IntegerToolProps, type MirrorState } from './labTools'

export function MirrorTool(props: IntegerToolProps & { challenges?: LabChallenge<MirrorState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const { value, showOpposite } = state
    const distance = Math.abs(value)

    const controls = (
        <>
            <Stepper
                label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })}
                value={value}
                min={LINE_LIMITS.min}
                max={LINE_LIMITS.max}
                format={(next) => signed(next)}
                onChange={(next) => setState((current) => setMirrorValue(current, next))}
                language={props.language}
            />
            <Segmented
                label={l({ eu: 'Aurkakoa erakutsi', es: 'Mostrar el opuesto', ar: 'اعرض المعاكس' })}
                value={showOpposite ? 'yes' : 'no'}
                options={[{ value: 'no', label: yesNo(props.language, false) }, { value: 'yes', label: yesNo(props.language, true) }]}
                onChange={(next) => setState((current) => ({ ...current, showOpposite: next === 'yes' }))}
            />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$\\lvert ${tex(value)}\\rvert =${distance}$`} />
                {showOpposite && <MathText text={`$${oppositeLatex(props.language, tex(value))}=${tex(-value)}$`} />}
            </span>
            {showOpposite && value !== 0 && (
                <span className="fraction-v2-lab-readout-note">
                    {l({ eu: `Biak zerotik ${distance} unitatera daude, eta euren artean ${distance * 2} unitate daude.`, es: `Los dos están a ${distance} unidades del cero, y entre ellos hay ${distance * 2} unidades.`, ar: `كلاهما على بعد ${distance} وحدات من الصفر، والمسافة بينهما ${distance * 2} وحدة.` })}
                </span>
            )}
            {value === 0 && (
                <span className="fraction-v2-lab-readout-note">{l({ eu: 'Zeroa ispiluaren gainean dago: bere aurkakoa bera da.', es: 'El cero está sobre el espejo: es su propio opuesto.', ar: 'الصفر فوق المرآة: إنه معاكس نفسه.' })}</span>
            )}
        </>
    )

    const points: NumberLinePoint[] = [{ value, label: signed(value) }]
    const spans: NumberLineSpan[] = value === 0 ? [] : [{ from: 0, to: value, label: String(distance) }]
    if (showOpposite && value !== 0) {
        points.push({ value: -value, label: signed(-value), tone: 'second' })
        spans.push({ from: 0, to: -value, label: String(distance), tone: 'second' })
    }

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? mirrorChallenges} state={state}>
            <div className="integers-lab-figure">
                <NumberLine
                    min={LINE_LIMITS.min}
                    max={LINE_LIMITS.max}
                    points={points}
                    spans={spans}
                    mirror
                    onPick={(next) => setState((current) => setMirrorValue(current, next))}
                    language={props.language}
                />
            </div>
        </ToolFrame>
    )
}
