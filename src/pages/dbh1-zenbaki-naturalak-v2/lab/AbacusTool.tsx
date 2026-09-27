import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { formatNatural } from '../format'
import { ABACUS_MAX, abacusChallenges, abacusDigits, initialAbacusState, PLACES, setAbacus, stepPlace, type AbacusState, type NaturalsToolProps } from './labTools'
import { placeNames } from './text'

export function AbacusTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AbacusState>(initialAbacusState)
    const digits = abacusDigits(state.value)
    const names = placeNames[props.language]
    const parts = digits
        .map((digit, index) => digit * 10 ** (PLACES - 1 - index))
        .filter((value) => value > 0)
        .map(formatNatural)

    const controls = (
        <>
            <NumberField label={l({ eu: 'Idatzi zenbaki bat', es: 'Escribe un número', ar: 'اكتب عددًا' })} value={state.value} min={0} max={ABACUS_MAX} format={formatNatural} onChange={(next) => setState(setAbacus(next))} language={props.language} />
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(setAbacus(0))}>{l({ eu: 'Hustu taula', es: 'Vaciar la tabla', ar: 'أفرغ الجدول' })}</button>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Erabili ▲ eta ▼ zutabe bakoitzean unitate bat gehitu edo kentzeko.', es: 'Usa ▲ y ▼ en cada columna para añadir o quitar una unidad de ese orden.', ar: 'استعمل ▲ و▼ في كل عمود لإضافة وحدة من تلك المرتبة أو إزالتها.' })}</p>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main naturals-lab-big" dir="ltr">{formatNatural(state.value)}</span>
            <span className="fraction-v2-lab-readout-note naturals-lab-scroll">
                <MathText text={`$${formatNatural(state.value)}=${parts.length > 0 ? parts.join('+') : '0'}$`} />
            </span>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={abacusChallenges} state={state}>
            <div className="naturals-abacus" dir="ltr">
                {digits.map((digit, index) => {
                    const place = PLACES - 1 - index
                    return (
                        <div className={`naturals-abacus-column ${state.lastPlace === place ? 'last' : ''}`} key={place}>
                            <span className="naturals-abacus-name">{names[place]}</span>
                            <button type="button" aria-label={`${l({ eu: 'Gehitu', es: 'Añadir', ar: 'أضف' })}: ${names[place]}`} onClick={() => setState((current) => stepPlace(current, place, 1))} disabled={state.value + 10 ** place > ABACUS_MAX}>▲</button>
                            <span className="naturals-abacus-digit">{digit}</span>
                            <button type="button" aria-label={`${l({ eu: 'Kendu', es: 'Quitar', ar: 'أزل' })}: ${names[place]}`} onClick={() => setState((current) => stepPlace(current, place, -1))} disabled={state.value - 10 ** place < 0}>▼</button>
                            <span className="naturals-abacus-beads" aria-hidden="true">
                                {Array.from({ length: digit }, (_, bead) => <i key={bead} />)}
                            </span>
                        </div>
                    )
                })}
            </div>
        </ToolFrame>
    )
}
