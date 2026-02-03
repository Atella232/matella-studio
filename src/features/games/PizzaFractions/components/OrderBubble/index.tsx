import { useTranslation } from 'react-i18next'
import type { FractionOrder } from '../../types'
import './OrderBubble.css'

interface OrderBubbleProps {
    order: FractionOrder
}

export function OrderBubble({ order }: OrderBubbleProps) {
    const { t } = useTranslation()

    return (
        <div className="order-bubble" role="status" aria-live="polite">
            <div className="order-label">
                {t('games.pizzaFractions.wantOrder')}
            </div>
            <div className="order-fraction">
                <span className="fraction-numerator">{order.numerator}</span>
                <span className="fraction-line" aria-hidden="true"></span>
                <span className="fraction-denominator">{order.denominator}</span>
            </div>
            <div className="order-pizza-icon" aria-hidden="true">🍕</div>
        </div>
    )
}
