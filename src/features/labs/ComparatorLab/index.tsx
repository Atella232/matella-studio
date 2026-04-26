import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ComparatorLab.css'

function drawBar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    value: number,
    fillColor: string,
    strokeColor: string
) {
    // Background
    ctx.fillStyle = '#E2E8F0'
    ctx.fillRect(x, y, width, height)

    // Filled portion
    const fillWidth = Math.min(value, 1) * width
    ctx.fillStyle = fillColor
    ctx.fillRect(x, y, fillWidth, height)

    // Gradient overlay
    const gradient = ctx.createLinearGradient(x, y, x, y + height)
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)')
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, fillWidth, height)

    // Border
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 3
    ctx.strokeRect(x, y, width, height)

    // If value > 1, show overflow indicator
    if (value > 1) {
        ctx.fillStyle = '#EF4444'
        ctx.font = 'bold 14px Inter, sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`×${value.toFixed(2)}`, x + width - 10, y + height / 2 + 5)
    }
}

export function ComparatorLab() {
    const { t } = useTranslation()
    const [num1, setNum1] = useState(2)
    const [den1, setDen1] = useState(3)
    const [num2, setNum2] = useState(3)
    const [den2, setDen2] = useState(4)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const value1 = num1 / den1
    const value2 = num2 / den2
    const comparison = value1 > value2 ? '>' : value1 < value2 ? '<' : '='

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const barWidth = 300
        const barHeight = 60
        const startX = 50
        const gap = 80

        // Draw first fraction bar
        const y1 = 60
        drawBar(ctx, startX, y1, barWidth, barHeight, value1, '#3B82F6', '#1D4ED8')

        // Label for fraction 1
        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 24px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${num1}/${den1}`, startX + barWidth / 2, y1 - 20)

        // Draw second fraction bar
        const y2 = y1 + barHeight + gap
        drawBar(ctx, startX, y2, barWidth, barHeight, value2, '#8B5CF6', '#6D28D9')

        // Label for fraction 2
        ctx.fillText(`${num2}/${den2}`, startX + barWidth / 2, y2 - 20)

        // Draw comparison indicator
        const centerY = (y1 + barHeight + y2) / 2
        ctx.font = 'bold 48px Inter, sans-serif'

        if (comparison === '>') {
            ctx.fillStyle = '#3B82F6'
        } else if (comparison === '<') {
            ctx.fillStyle = '#8B5CF6'
        } else {
            ctx.fillStyle = '#059669'
        }

        ctx.fillText(comparison, startX + barWidth + 40, centerY + 15)

        // Draw decimal values on the right
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillStyle = '#64748b'
        ctx.fillText(`= ${value1.toFixed(3)}`, startX + barWidth + 80, y1 + barHeight / 2 + 6)
        ctx.fillText(`= ${value2.toFixed(3)}`, startX + barWidth + 80, y2 + barHeight / 2 + 6)

    }, [num1, den1, num2, den2, value1, value2, comparison])

    const getComparisonMessage = () => {
        if (comparison === '>') return t('lab.comparator.greater')
        if (comparison === '<') return t('lab.comparator.less')
        return t('lab.comparator.equal')
    }

    const getComparisonExplanation = () => {
        // Cross multiplication method
        const cross1 = num1 * den2
        const cross2 = num2 * den1
        return t('lab.comparator.explanation', {
            num1, den1, num2, den2,
            cross1, cross2,
            symbol: comparison
        })
    }

    return (
        <div className="comparator-lab">
            <div className="comparator-controls">
                <div className="fraction-card glass blue">
                    <h4>{t('lab.comparator.fraction1')}</h4>
                    <div className="big-fraction-display">
                        <span className="num">{num1}</span>
                        <span className="line"></span>
                        <span className="den">{den1}</span>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.numerator')}</label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={num1}
                            onChange={(e) => setNum1(Number(e.target.value))}
                        />
                        <output>{num1}</output>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.denominator')}</label>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={den1}
                            onChange={(e) => setDen1(Number(e.target.value))}
                        />
                        <output>{den1}</output>
                    </div>
                </div>

                <div className="comparison-symbol glass">
                    <span className={`symbol ${comparison === '=' ? 'equal' : comparison === '>' ? 'greater' : 'less'}`}>
                        {comparison}
                    </span>
                </div>

                <div className="fraction-card glass purple">
                    <h4>{t('lab.comparator.fraction2')}</h4>
                    <div className="big-fraction-display">
                        <span className="num">{num2}</span>
                        <span className="line"></span>
                        <span className="den">{den2}</span>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.numerator')}</label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={num2}
                            onChange={(e) => setNum2(Number(e.target.value))}
                        />
                        <output>{num2}</output>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.denominator')}</label>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={den2}
                            onChange={(e) => setDen2(Number(e.target.value))}
                        />
                        <output>{den2}</output>
                    </div>
                </div>
            </div>

            <div className="canvas-container glass">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={280}
                    role="img"
                    aria-label={t('lab.comparator.aria', { num1, den1, symbol: comparison, num2, den2 })}
                />
            </div>

            <div className="comparator-result glass">
                <p className="result-message">{getComparisonMessage()}</p>
                <p className="result-explanation">{getComparisonExplanation()}</p>
            </div>
        </div>
    )
}
