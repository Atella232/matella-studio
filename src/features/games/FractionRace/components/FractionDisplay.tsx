import type { Fraction, MixedNumber } from '../types'
import { useTranslation } from 'react-i18next'
import { isMixedNumber } from '../utils/fractions'

export function FractionDisplay({ fraction }: { fraction: Fraction | MixedNumber }) {
    const { t } = useTranslation()
    const isCheckNegative = 'isNegative' in fraction && fraction.isNegative
    const signedNumerator = `${isCheckNegative ? '−' : ''}${fraction.numerator}`

    if (isMixedNumber(fraction)) {
        return (
            <span
                className={`fraction-display mixed ${isCheckNegative ? 'negative' : ''}`}
                role="math"
                aria-label={t('games.fractionRace.mixedFractionAria', {
                    whole: `${isCheckNegative ? '−' : ''}${fraction.whole}`,
                    numerator: fraction.numerator,
                    denominator: fraction.denominator
                })}
            >
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
        <span
            className={`fraction-display ${isCheckNegative ? 'negative' : ''}`}
            role="math"
            aria-label={t('games.fractionRace.fractionAria', {
                numerator: signedNumerator,
                denominator: fraction.denominator
            })}
        >
            {isCheckNegative && <span className="sign" style={{ marginRight: '2px' }}>−</span>}
            <span className="numerator">{fraction.numerator}</span>
            <span className="fraction-bar"></span>
            <span className="denominator">{fraction.denominator}</span>
        </span>
    )
}
