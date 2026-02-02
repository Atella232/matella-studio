import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './PizzaLab.css'

export function PizzaLab() {
    const { t } = useTranslation()
    const [numerator, setNumerator] = useState(3)
    const [denominator, setDenominator] = useState(8)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const fraction = numerator / denominator

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = 150

        // Draw pizza base
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fillStyle = '#FCD34D'
        ctx.fill()
        ctx.strokeStyle = '#B45309'
        ctx.lineWidth = 4
        ctx.stroke()

        // Draw crust
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2)
        ctx.strokeStyle = '#D97706'
        ctx.lineWidth = 20
        ctx.stroke()

        // Draw slices
        const sliceAngle = (Math.PI * 2) / denominator
        for (let i = 0; i < denominator; i++) {
            const startAngle = i * sliceAngle - Math.PI / 2
            const endAngle = (i + 1) * sliceAngle - Math.PI / 2

            // Fill selected slices
            if (i < numerator) {
                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.arc(centerX, centerY, radius - 15, startAngle, endAngle)
                ctx.closePath()
                ctx.fillStyle = 'rgba(220, 38, 38, 0.6)'
                ctx.fill()

                // Add toppings
                const midAngle = (startAngle + endAngle) / 2
                const toppingDist = radius * 0.5
                const tx = centerX + Math.cos(midAngle) * toppingDist
                const ty = centerY + Math.sin(midAngle) * toppingDist

                // Pepperoni circle
                ctx.beginPath()
                ctx.arc(tx, ty, 12, 0, Math.PI * 2)
                ctx.fillStyle = '#991B1B'
                ctx.fill()
                ctx.strokeStyle = '#7F1D1D'
                ctx.lineWidth = 2
                ctx.stroke()
            }

            // Draw slice lines
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(
                centerX + Math.cos(startAngle) * radius,
                centerY + Math.sin(startAngle) * radius
            )
            ctx.strokeStyle = '#78350F'
            ctx.lineWidth = 2
            ctx.stroke()
        }

        // Center circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
        ctx.fillStyle = '#78350F'
        ctx.fill()

    }, [numerator, denominator])

    return (
        <div className="pizza-lab">
            <div className="lab-controls glass">
                <div className="control-group">
                    <label htmlFor="pizza-numerator">
                        🍕 {t('lab.numerator')}
                    </label>
                    <input
                        id="pizza-numerator"
                        type="range"
                        min="0"
                        max={denominator}
                        value={numerator}
                        onChange={(e) => setNumerator(Number(e.target.value))}
                    />
                    <output>{numerator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="pizza-denominator">
                        🔪 {t('lab.denominator')}
                    </label>
                    <input
                        id="pizza-denominator"
                        type="range"
                        min="2"
                        max="12"
                        value={denominator}
                        onChange={(e) => {
                            const newDenom = Number(e.target.value)
                            setDenominator(newDenom)
                            if (numerator > newDenom) setNumerator(newDenom)
                        }}
                    />
                    <output>{denominator}</output>
                </div>
            </div>

            <div className="canvas-container glass pizza-canvas">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    role="img"
                    aria-label={t('lab.pizza.aria', { den: denominator, num: numerator })}
                />
            </div>

            <div className="pizza-info glass">
                <div className="pizza-fraction-display">
                    <div className="big-fraction">
                        <span className="num">{numerator}</span>
                        <span className="line"></span>
                        <span className="den">{denominator}</span>
                    </div>
                    <span className="equals">=</span>
                    <span className="percentage">{(fraction * 100).toFixed(0)}%</span>
                </div>
                <p className="pizza-text">
                    {numerator === 0
                        ? t('lab.pizza.none')
                        : numerator === denominator
                            ? t('lab.pizza.all')
                            : t('lab.pizza.some', { num: numerator, den: denominator })}
                </p>
            </div>
        </div>
    )
}
