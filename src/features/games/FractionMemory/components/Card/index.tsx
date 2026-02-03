import React, { useMemo } from 'react'
import type { Card as CardType } from '../../types'
import { toDecimalString, toPercentageString } from '../../utils/fractions'
import './Card.css'

interface CardProps {
    card: CardType
    onClick: (cardId: string) => void
    disabled?: boolean
}

export function Card({ card, onClick, disabled }: CardProps) {
    const isFlipped = card.isFlipped || card.isMatched

    const handleClick = () => {
        if (!disabled && !card.isMatched && !card.isFlipped) {
            onClick(card.id)
        }
    }

    return (
        <div
            className={`memory-card ${isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                }
            }}
            aria-label={card.isFlipped ? `${card.numerator}/${card.denominator}` : 'Carta oculta'}
        >
            <div className="card-inner">
                <div className="card-face card-back" />
                <div className="card-face card-front">
                    <CardContent card={card} />
                </div>
            </div>
        </div>
    )
}

interface CardContentProps {
    card: CardType
}

function CardContent({ card }: CardContentProps) {
    switch (card.type) {
        case 'numeric':
            return (
                <div className="fraction-display">
                    <span className="fraction-numerator">{card.numerator}</span>
                    <span className="fraction-line" />
                    <span className="fraction-denominator">{card.denominator}</span>
                </div>
            )

        case 'decimal':
            return (
                <div className="decimal-display">
                    {toDecimalString(card.numerator, card.denominator)}
                </div>
            )

        case 'percentage':
            return (
                <div className="percentage-display">
                    {toPercentageString(card.numerator, card.denominator)}
                </div>
            )

        case 'visual':
            return <VisualFraction numerator={card.numerator} denominator={card.denominator} />

        default:
            return null
    }
}

interface VisualFractionProps {
    numerator: number
    denominator: number
}

function VisualFraction({ numerator, denominator }: VisualFractionProps) {
    const segments = useMemo(() => {
        // Use pie chart for denominators <=8, bar for larger
        if (denominator <= 8) {
            return renderPie(numerator, denominator)
        }
        return renderBar(numerator, denominator)
    }, [numerator, denominator])

    return (
        <div className="visual-display">
            {segments}
        </div>
    )
}

function renderPie(numerator: number, denominator: number): React.ReactElement {
    const segments: React.ReactElement[] = []
    const centerX = 50
    const centerY = 50
    const radius = 40

    for (let i = 0; i < denominator; i++) {
        const startAngle = (i / denominator) * 2 * Math.PI - Math.PI / 2
        const endAngle = ((i + 1) / denominator) * 2 * Math.PI - Math.PI / 2

        const x1 = centerX + radius * Math.cos(startAngle)
        const y1 = centerY + radius * Math.sin(startAngle)
        const x2 = centerX + radius * Math.cos(endAngle)
        const y2 = centerY + radius * Math.sin(endAngle)

        const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0

        const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`

        segments.push(
            <path
                key={i}
                d={pathData}
                className={i < numerator ? 'pie-segment-filled' : 'pie-segment-empty'}
            />
        )
    }

    return (
        <svg viewBox="0 0 100 100">
            {segments}
            <circle cx={centerX} cy={centerY} r={radius} className="pie-outline" />
        </svg>
    )
}

function renderBar(numerator: number, denominator: number): React.ReactElement {
    const barWidth = 90
    const barHeight = 30
    const segmentWidth = barWidth / denominator

    const segments: React.ReactElement[] = []

    for (let i = 0; i < denominator; i++) {
        segments.push(
            <rect
                key={i}
                x={5 + i * segmentWidth}
                y={35}
                width={segmentWidth}
                height={barHeight}
                className={`bar-segment ${i < numerator ? 'bar-segment-filled' : 'bar-segment-empty'}`}
            />
        )
    }

    return (
        <svg viewBox="0 0 100 100">
            {segments}
        </svg>
    )
}
