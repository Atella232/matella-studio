import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { compare } from '../math/fraction'
import {
    initialWallState,
    selectWallPiece,
    setWallMode,
    WALL_DENOMINATORS,
    wallChallenges,
    wallEquivalents,
    type WallPiece,
    type WallState
} from './labTools'
import type { ToolProps } from './ClassicTools'
import { Segmented, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'

const pieceLatex = (piece: WallPiece) => piece.denominator === 1 ? String(piece.numerator) : `\\frac{${piece.numerator}}{${piece.denominator}}`
const pieceValue = (piece: WallPiece) => piece.numerator / piece.denominator

export function WallTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WallState>(initialWallState)
    const { mode, first, second } = state
    const equivalents = mode === 'equivalent' && first ? wallEquivalents(first) : []
    const matchingRows = new Set(equivalents.map((piece) => piece.denominator))

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Modua', es: 'Modo', ar: 'الوضع' })}
                value={mode}
                options={[
                    { value: 'equivalent', label: l({ eu: 'Baliokideak', es: 'Equivalentes', ar: 'المتكافئة' }) },
                    { value: 'compare', label: l({ eu: 'Konparatu', es: 'Comparar', ar: 'مقارنة' }) }
                ]}
                onChange={(next) => setState((current) => setWallMode(current, next))}
            />
            <p className="fraction-v2-lab-tip">
                {mode === 'equivalent'
                    ? l({ eu: 'Sakatu pieza bat: zatikia pieza horren amaieraraino iristen da.', es: 'Pulsa una pieza: la fracción llega hasta el final de esa pieza.', ar: 'اضغط على قطعة: يصل الكسر إلى نهاية تلك القطعة.' })
                    : l({ eu: 'Sakatu bi pieza zatikiak alderatzeko.', es: 'Pulsa dos piezas para comparar las fracciones.', ar: 'اضغط على قطعتين لمقارنة الكسرين.' })}
            </p>
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((current) => ({ ...current, first: null, second: null }))}>{l({ eu: 'Garbitu', es: 'Limpiar', ar: 'مسح' })}</button>
            </div>
        </>
    )

    let readout
    if (!first) {
        readout = <span className="fraction-v2-lab-readout-note">{l({ eu: 'Sakatu hormako pieza bat.', es: 'Pulsa una pieza del muro.', ar: 'اضغط على قطعة من الجدار.' })}</span>
    } else if (mode === 'equivalent') {
        readout = (
            <>
                <span className="fraction-v2-lab-readout-main">
                    {equivalents.map((piece, index) => (
                        <span className="fraction-v2-lab-readout-main" key={piece.denominator}>
                            {index > 0 && <span aria-hidden="true">=</span>}
                            <MathText text={`$${pieceLatex(piece)}$`} />
                        </span>
                    ))}
                </span>
                <span className="fraction-v2-lab-readout-note">
                    {equivalents.length === 1
                        ? l({ eu: 'Hormako beste zatikirik ez du balio bera.', es: 'Ninguna otra fracción del muro vale lo mismo.', ar: 'لا يوجد كسر آخر في الجدار بالقيمة نفسها.' })
                        : l({ eu: `Hormako ${equivalents.length} zatikik balio bera dute.`, es: `${equivalents.length} fracciones del muro valen lo mismo.`, ar: `${equivalents.length} كسور في الجدار لها القيمة نفسها.` })}
                </span>
            </>
        )
    } else if (!second) {
        readout = (
            <>
                <MathText text={`$${pieceLatex(first)}$`} />
                <span className="fraction-v2-lab-readout-note">{l({ eu: 'Aukeratu bigarren pieza.', es: 'Elige la segunda pieza.', ar: 'اختر القطعة الثانية.' })}</span>
            </>
        )
    } else {
        const order = compare(first, second)
        readout = <MathText text={`$${pieceLatex(first)}\\;${order === 0 ? '=' : order < 0 ? '<' : '>'}\\;${pieceLatex(second)}$`} />
    }

    const pieceState = (denominator: number, index: number) => {
        const reach = (index + 1) / denominator
        if (mode === 'equivalent') {
            if (!first) return ''
            if (first.denominator === denominator && first.numerator === index + 1) return 'selected'
            return reach <= pieceValue(first) + 1e-9 ? 'filled' : ''
        }
        if (first && first.denominator === denominator && index < first.numerator) return first.numerator === index + 1 ? 'first selected' : 'first'
        if (second && second.denominator === denominator && index < second.numerator) return second.numerator === index + 1 ? 'second selected' : 'second'
        return ''
    }

    const guides = [first, second].filter((piece): piece is WallPiece => piece !== null)

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={wallChallenges} state={state}>
            <div className={`fraction-v2-wall fraction-v2-wall-${mode}`}>
                {WALL_DENOMINATORS.map((denominator) => (
                    <div className={`fraction-v2-wall-row ${matchingRows.has(denominator) ? 'match' : ''}`} key={denominator}>
                        {Array.from({ length: denominator }, (_, index) => {
                            const status = pieceState(denominator, index)
                            return (
                                <button
                                    type="button"
                                    className={status}
                                    aria-pressed={status.includes('selected')}
                                    aria-label={`${index + 1}/${denominator}`}
                                    onClick={() => setState((current) => selectWallPiece(current, { numerator: index + 1, denominator }))}
                                    key={index}
                                >
                                    <span aria-hidden="true">{denominator === 1 ? '1' : `1/${denominator}`}</span>
                                </button>
                            )
                        })}
                    </div>
                ))}
                {guides.map((piece, index) => (
                    <span
                        className={`fraction-v2-wall-guide ${mode === 'compare' ? (index === 0 ? 'first' : 'second') : ''}`}
                        style={{ left: `${pieceValue(piece) * 100}%` }}
                        key={`${index}-${piece.numerator}-${piece.denominator}`}
                        aria-hidden="true"
                    />
                ))}
            </div>
        </ToolFrame>
    )
}
