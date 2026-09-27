import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { formatNatural } from '../format'
import { addRomanSymbol, initialRomanState, removeRomanSymbol, ROMAN_MAX_LENGTH, ROMAN_SYMBOLS, ROMAN_VALUES, romanChallenges, romanVerdict, type NaturalsToolProps, type RomanState } from './labTools'

export function RomanTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RomanState>(initialRomanState)
    const symbols = state.written.split('') as Array<keyof typeof ROMAN_VALUES>
    const verdict = romanVerdict(state.written)

    const controls = (
        <>
            <div className="naturals-roman-keys" role="group" aria-label={l({ eu: 'Ikurrak', es: 'Símbolos', ar: 'الرموز' })}>
                {ROMAN_SYMBOLS.map((symbol) => (
                    <button type="button" onClick={() => setState((current) => addRomanSymbol(current, symbol))} disabled={state.written.length >= ROMAN_MAX_LENGTH} key={symbol}>
                        <strong>{symbol}</strong>
                        <small>{formatNatural(ROMAN_VALUES[symbol])}</small>
                    </button>
                ))}
            </div>
            <div className="naturals-roman-edit">
                <button type="button" className="fraction-v2-secondary" onClick={() => setState(removeRomanSymbol)} disabled={state.written === ''}>{l({ eu: '⌫ Ezabatu azkena', es: '⌫ Borrar el último', ar: '⌫ احذف الأخير' })}</button>
                <button type="button" className="fraction-v2-secondary" onClick={() => setState({ written: '' })} disabled={state.written === ''}>{l({ eu: 'Garbitu', es: 'Borrar todo', ar: 'امسح الكل' })}</button>
            </div>
        </>
    )

    const readout = state.written === ''
        ? <span className="fraction-v2-lab-readout-note">{l({ eu: 'Sakatu ikurrak zenbaki bat idazteko.', es: 'Pulsa los símbolos para escribir un número.', ar: 'اضغط الرموز لكتابة عدد.' })}</span>
        : verdict.value !== null
            ? (
                <>
                    <span className="fraction-v2-lab-readout-main"><MathText text={`$\\mathrm{${state.written}}=${formatNatural(verdict.value)}$`} /></span>
                    <span className="fraction-v2-lab-readout-note">{l({ eu: 'Ondo idatzita dago.', es: 'Está bien escrito.', ar: 'مكتوب بشكل صحيح.' })}</span>
                </>
            )
            : (
                <span className="fraction-v2-lab-readout-note naturals-lab-warning">
                    {verdict.suggestion
                        ? l({ eu: `Horrela ez da idazten. Kantitate hori ${verdict.suggestion} idazten da.`, es: `Así no se escribe. Esa cantidad se escribe ${verdict.suggestion}.`, ar: `لا يُكتب هكذا. هذه الكمية تُكتب ${verdict.suggestion}.` })
                        : l({ eu: 'Horrela ez da idazten. Berrikusi arauak.', es: 'Así no se escribe. Repasa las reglas.', ar: 'لا يُكتب هكذا. راجع القواعد.' })}
                </span>
            )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={romanChallenges} state={state}>
            <div className="naturals-roman-tiles" dir="ltr" aria-live="polite">
                {symbols.length === 0 && <span className="naturals-roman-empty">—</span>}
                {symbols.map((symbol, index) => {
                    const value = ROMAN_VALUES[symbol]
                    const subtracts = value < (ROMAN_VALUES[symbols[index + 1]] ?? 0)
                    return (
                        <span className={`naturals-roman-tile ${subtracts ? 'minus' : ''}`} key={index}>
                            <strong>{symbol}</strong>
                            <small>{subtracts ? '−' : '+'}{formatNatural(value)}</small>
                        </span>
                    )
                })}
            </div>
        </ToolFrame>
    )
}
