import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { divisors } from '../math'
import { divisorsLatex } from './acronyms'
import { initialRectanglesState, RECTANGLE_LIMITS, rectanglesChallenges, rectangleSplit, setRectangles, type DivisibilityToolProps, type RectanglesState } from './labTools'

export function RectanglesTool(props: DivisibilityToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RectanglesState>(() => setRectangles(initialRectanglesState, {}))
    const { total, perRow } = state
    const { rows, rest } = rectangleSplit(state)
    const exact = rest === 0
    const found = state.found[total] ?? []
    const all = divisors(total)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Karratuak', es: 'Cuadrados', ar: 'المربعات' })} value={total} min={RECTANGLE_LIMITS.min} max={RECTANGLE_LIMITS.max} onChange={(next) => setState((current) => setRectangles(current, { total: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Ilara bakoitzean', es: 'En cada fila', ar: 'في كل صف' })} value={perRow} min={1} max={total} onChange={(next) => setState((current) => setRectangles(current, { perRow: next }))} language={props.language} />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={exact ? `$${total}=${perRow}\\cdot ${rows}$` : `$${total}=${perRow}\\cdot ${rows}+${rest}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {exact
                    ? l({ eu: `Laukizuzena osatu da: ${perRow} eta ${rows} ${total}ren zatitzaileak dira.`, es: `Rectángulo completo: ${perRow} y ${rows} son divisores de ${total}.`, ar: `اكتمل المستطيل: ${perRow} و${rows} قاسمان للعدد ${total}.` })
                    : l({ eu: `${rest} karratu soberan: ${perRow} ez da ${total}ren zatitzailea (hondarra ${rest}).`, es: `Sobran ${rest} cuadrados: ${perRow} no es divisor de ${total} (resto ${rest}).`, ar: `يبقى ${rest} مربعات: ${perRow} ليس قاسمًا للعدد ${total} (الباقي ${rest}).` })}
            </span>
            <span className="divisibility-found">
                <MathText text={`$${divisorsLatex(props.language)}(${total})=\\{${all.map((value) => (found.includes(value) ? String(value) : '\\square')).join(',\\ ')}\\}$`} />
                <small>{l({ eu: `${found.length} / ${all.length} aurkituta`, es: `${found.length} de ${all.length} encontrados`, ar: `وُجد ${found.length} من ${all.length}` })}</small>
            </span>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rectanglesChallenges} state={state}>
            <div className="divisibility-rectangle" style={{ gridTemplateColumns: `repeat(${perRow}, minmax(0, 1fr))`, maxWidth: `${Math.min(perRow, 16) * 34}px` }} role="img" aria-label={exact ? `${rows} · ${perRow}` : `${rows} · ${perRow} + ${rest}`}>
                {Array.from({ length: total }, (_, index) => (
                    <span className={index >= rows * perRow ? 'rest' : ''} key={index} />
                ))}
            </div>
        </ToolFrame>
    )
}
