import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './NumberLineLab.css'

export function NumberLineLab() {
    const { t } = useTranslation()
    const [numerator, setNumerator] = useState(1)
    const [denominator, setDenominator] = useState(2)
    const [zoomLevel, setZoomLevel] = useState(1)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const fraction = numerator / denominator
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const commonDivisor = gcd(numerator, denominator)
    const simplifiedNum = numerator / commonDivisor
    const simplifiedDen = denominator / commonDivisor

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const width = canvas.width
        const height = canvas.height
        const padding = 60
        const lineY = height / 2
        const lineStart = padding
        const lineEnd = width - padding
        const lineLength = lineEnd - lineStart

        // Draw main number line
        ctx.strokeStyle = '#1e293b'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(lineStart, lineY)
        ctx.lineTo(lineEnd, lineY)
        ctx.stroke()

        // Draw arrow heads
        ctx.beginPath()
        ctx.moveTo(lineEnd - 10, lineY - 5)
        ctx.lineTo(lineEnd, lineY)
        ctx.lineTo(lineEnd - 10, lineY + 5)
        ctx.stroke()

        // Draw tick marks and numbers
        const visibleRange = 2 / zoomLevel
        const tickSpacing = lineLength / visibleRange

        for (let i = 0; i <= visibleRange; i++) {
            const x = lineStart + i * tickSpacing

            // Major tick
            ctx.strokeStyle = '#1e293b'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(x, lineY - 10)
            ctx.lineTo(x, lineY + 10)
            ctx.stroke()

            // Number label
            ctx.fillStyle = '#1e293b'
            ctx.font = '16px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(i.toString(), x, lineY + 35)

            // Draw subdivision ticks for the first unit
            if (i < visibleRange && zoomLevel >= 1) {
                for (let j = 1; j < denominator; j++) {
                    const subX = x + (j / denominator) * tickSpacing
                    ctx.strokeStyle = '#94a3b8'
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(subX, lineY - 5)
                    ctx.lineTo(subX, lineY + 5)
                    ctx.stroke()
                }
            }
        }

        // Draw fraction marker
        const fractionX = lineStart + fraction * tickSpacing

        // Marker circle
        ctx.fillStyle = '#2563eb'
        ctx.beginPath()
        ctx.arc(fractionX, lineY, 8, 0, Math.PI * 2)
        ctx.fill()

        // Marker label
        ctx.fillStyle = '#2563eb'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${numerator}/${denominator}`, fractionX, lineY - 20)

        // Draw zoom indicator
        ctx.fillStyle = '#64748b'
        ctx.font = '14px Inter, sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`Zoom: ${zoomLevel.toFixed(1)}x`, width - 20, 30)

    }, [numerator, denominator, fraction, zoomLevel])

    return (
        <div className="number-line-lab">
            <div className="lab-controls glass">
                <div className="control-group">
                    <label htmlFor="numerator">{t('lab.numerator')}</label>
                    <input
                        id="numerator"
                        type="range"
                        min="0"
                        max="20"
                        value={numerator}
                        onChange={(e) => setNumerator(Number(e.target.value))}
                        aria-valuemin={0}
                        aria-valuemax={20}
                        aria-valuenow={numerator}
                    />
                    <output>{numerator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="denominator">{t('lab.denominator')}</label>
                    <input
                        id="denominator"
                        type="range"
                        min="1"
                        max="20"
                        value={denominator}
                        onChange={(e) => setDenominator(Number(e.target.value))}
                        aria-valuemin={1}
                        aria-valuemax={20}
                        aria-valuenow={denominator}
                    />
                    <output>{denominator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="zoom">{t('lab.zoom')}</label>
                    <input
                        id="zoom"
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(Number(e.target.value))}
                    />
                    <output>{zoomLevel}x</output>
                </div>
            </div>

            <div className="canvas-container glass">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={200}
                    role="img"
                    aria-label={t('lab.numberLineAria', { num: numerator, den: denominator })}
                />
            </div>

            <div className="fraction-info glass">
                <div className="info-item">
                    <span className="info-label">{t('lab.equivalent')}:</span>
                    <span className="fraction-display">
                        <span className="numerator">{numerator}</span>
                        <span className="denominator">{denominator}</span>
                    </span>
                    = {fraction.toFixed(3)}
                </div>
                {commonDivisor > 1 && (
                    <div className="info-item">
                        <span className="info-label">{t('lab.simplified')}:</span>
                        <span className="fraction-display">
                            <span className="numerator">{simplifiedNum}</span>
                            <span className="denominator">{simplifiedDen}</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
