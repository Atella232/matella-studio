import type { CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { toLatex, toMixedText, toNumber, toText, type FractionValue } from '../math/fraction'

export function FractionModel({ value, label }: { value: FractionValue; label: string }) {
    // Keep the parts the learner chose: 4/6 must be drawn in sixths, not simplified to thirds
    const sign = value.denominator < 0 ? -1 : 1
    const normalized = { numerator: value.numerator * sign, denominator: Math.abs(value.denominator) }
    const absoluteNumerator = Math.abs(normalized.numerator)
    const unitCount = Math.max(1, Math.ceil(absoluteNumerator / normalized.denominator))
    const units = Array.from({ length: unitCount }, (_, unitIndex) => unitIndex)
    const segments = Array.from({ length: normalized.denominator }, (_, segmentIndex) => segmentIndex)

    return (
        <div className="fraction-v2-model-wrap">
            <div
                className={`fraction-v2-model ${normalized.numerator < 0 ? 'negative' : ''}`}
                role="img"
                aria-label={`${label}: ${normalized.numerator}/${normalized.denominator}`}
            >
                {normalized.numerator < 0 && <span className="fraction-v2-sign" aria-hidden="true">−</span>}
                <div className="fraction-v2-units" aria-hidden="true">
                    {units.map((unitIndex) => (
                        <div
                            className="fraction-v2-unit"
                            style={{ '--parts': normalized.denominator } as CSSProperties}
                            key={unitIndex}
                        >
                            {segments.map((segmentIndex) => {
                                const position = unitIndex * normalized.denominator + segmentIndex
                                return <span className={position < absoluteNumerator ? 'filled' : ''} key={segmentIndex} />
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <MathText text={`$${normalized.denominator === 1 ? normalized.numerator : `${normalized.numerator < 0 ? '-' : ''}\\frac{${absoluteNumerator}}{${normalized.denominator}}`}$`} />
            {absoluteNumerator > normalized.denominator && (
                <span className="fraction-v2-mixed">{toMixedText(normalized)}</span>
            )}
        </div>
    )
}

export function NumberLineModel({ value, label }: { value: FractionValue; label: string }) {
    const numericValue = toNumber(value)
    const minimum = Math.floor(Math.min(0, numericValue)) - 1
    const maximum = Math.ceil(Math.max(0, numericValue)) + 1
    const position = ((numericValue - minimum) / (maximum - minimum)) * 100

    return (
        <div className="fraction-v2-number-line" role="img" aria-label={`${label}: ${toText(value)}`}>
            <span className="fraction-v2-line-start">{minimum}</span>
            <span className="fraction-v2-line-end">{maximum}</span>
            <span className="fraction-v2-line-marker" style={{ insetInlineStart: `${position}%` }}>
                <MathText text={`$${toLatex(value)}$`} />
            </span>
        </div>
    )
}
