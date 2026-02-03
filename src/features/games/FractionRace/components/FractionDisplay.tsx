import type { Fraction, MixedNumber } from '../types'
import { isMixedNumber } from '../utils/fractions'

export function FractionDisplay({ fraction }: { fraction: Fraction | MixedNumber }) {
    const isCheckNegative = 'isNegative' in fraction && fraction.isNegative;

    if (isMixedNumber(fraction)) {
        return (
            <span className={`fraction-display mixed ${isCheckNegative ? 'negative' : ''}`}>
                {isCheckNegative && <span className="sign" style={{ marginRight: '2px' }}>−</span>}
                <span className="whole-part">{fraction.whole}</span>
                <span className="fraction-part">
                    <span className="numerator">{fraction.numerator}</span>
                    <span className="fraction-bar"></span>
                    <span className="denominator">{fraction.denominator}</span>
                </span>
            </span>
        )
    }

    return (
        <span className={`fraction-display ${isCheckNegative ? 'negative' : ''}`}>
            {isCheckNegative && <span className="sign" style={{ marginRight: '2px' }}>−</span>}
            <span className="numerator">{fraction.numerator}</span>
            <span className="fraction-bar"></span>
            <span className="denominator">{fraction.denominator}</span>
        </span>
    )
}
