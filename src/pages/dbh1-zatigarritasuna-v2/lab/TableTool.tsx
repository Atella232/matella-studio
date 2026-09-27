import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { divisorsLatex } from '../../dbh2-zatigarritasuna/lab/acronyms'
import { NumberField, WholeAnswer } from '../../dbh2-zatigarritasuna/lab/LabBits'
import { factorize, factorLatex } from '../../dbh2-zatigarritasuna/math'
import { cellKey, cellRight, divisorTable, initialTableState, setTableEntry, setTableValue, TABLE_LIMITS, tableChallenges, tableComplete, type TableState } from './labTools'

const SUGGESTIONS = [12, 18, 36, 45, 100]

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TableState>(initialTableState)
    const { value } = state
    const table = divisorTable(value)
    const factors = factorize(value)
    const complete = tableComplete(state)
    const found = table ? table.cells.flatMap((cells, row) => cells.filter((_, column) => cellRight(state, row, column))) : []
    const all = table ? table.cells.flat().sort((a, b) => a - b) : []

    const controls = (
        <>
            <NumberField label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })} value={value} min={TABLE_LIMITS.min} max={TABLE_LIMITS.max} onChange={(next) => setState((current) => setTableValue(current, next))} language={props.language} />
            <div className="divisibility-table-suggestions" role="group" aria-label={l({ eu: 'Liburuko zenbakiak', es: 'Números del libro', ar: 'أعداد الكتاب' })}>
                {SUGGESTIONS.map((suggestion) => (
                    <button type="button" aria-pressed={value === suggestion} onClick={() => setState((current) => setTableValue(current, suggestion))} key={suggestion}>{suggestion}</button>
                ))}
            </div>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => setTableValue(current, current.value))}>{l({ eu: 'Garbitu taula', es: 'Borrar la tabla', ar: 'امسح الجدول' })}</button>
        </>
    )

    const readout = table ? (
        <>
            <span className="divisibility-found">
                <MathText text={`$${divisorsLatex(props.language)}(${value})=\\{${all.map((divisor) => (found.includes(divisor) ? String(divisor) : '\\square')).join(',\\ ')}\\}$`} />
                <small>{l({ eu: `${found.length} / ${all.length} gelaxka zuzen`, es: `${found.length} de ${all.length} casillas bien`, ar: `${found.length} من ${all.length} خانات صحيحة` })}</small>
            </span>
            {complete && (
                <>
                    <span className="fraction-v2-lab-readout-note">{l({ eu: `Taula osatuta. Zenbat zatitzaile ditu ${value} zenbakiak?`, es: `Tabla completa. ¿Cuántos divisores tiene ${value}?`, ar: `اكتمل الجدول. كم قاسمًا للعدد ${value}؟` })}</span>
                    <WholeAnswer language={props.language} state={state} expected={{ numerator: all.length, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
                </>
            )}
        </>
    ) : (
        <span className="fraction-v2-lab-readout-note">
            {l({ eu: `${value} zenbakiak hiru lehen desberdin edo gehiago ditu; taula honek bat edo bi lehenekin funtzionatzen du. Aukeratu beste zenbaki bat.`, es: `${value} tiene tres primos distintos o más; esta tabla funciona con uno o dos primos. Elige otro número.`, ar: `للعدد ${value} ثلاثة عوامل أولية مختلفة أو أكثر؛ هذا الجدول يعمل مع عامل أو عاملين. اختر عددًا آخر.` })}
        </span>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tableChallenges} state={state}>
            <div className="divisibility-table-tool" dir="ltr">
                <p className="divisibility-table-factors"><MathText text={`$${value}=${factorLatex(factors)}$`} /></p>
                {table && (
                    <table className="divisibility-table">
                        <thead>
                            <tr>
                                <th scope="col"><span className="sr-only">×</span></th>
                                {table.top.map((top) => <th scope="col" key={top}>{top}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {table.left.map((left, row) => (
                                <tr key={left}>
                                    <th scope="row">· {left}</th>
                                    {table.top.map((top, column) => {
                                        const right = cellRight(state, row, column)
                                        const entry = state.entries[cellKey(row, column)] ?? ''
                                        return (
                                            <td className={right ? 'right' : entry.trim() ? 'wrong' : ''} key={top}>
                                                <input
                                                    inputMode="numeric"
                                                    value={entry}
                                                    readOnly={right}
                                                    aria-label={`${top} · ${left}`}
                                                    onChange={(event) => setState((current) => setTableEntry(current, row, column, event.target.value))}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </ToolFrame>
    )
}
