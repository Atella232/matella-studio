import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './AreaLab.css'

export function AreaLab() {
    const { t } = useTranslation()
    const [numerator, setNumerator] = useState(3)
    const [denominator, setDenominator] = useState(4)
    const [totalParts, setTotalParts] = useState(12)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const fraction = numerator / denominator
    const partsToHighlight = Math.round(fraction * totalParts)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const width = canvas.width
        const height = canvas.height
        const padding = 40
        const gridWidth = width - padding * 2
        const gridHeight = height - padding * 2

        // Calculate grid dimensions
        const cols = Math.ceil(Math.sqrt(totalParts * 1.5))
        const rows = Math.ceil(totalParts / cols)

        const cellWidth = gridWidth / cols
        const cellHeight = gridHeight / rows

        // Draw grid cells
        for (let i = 0; i < totalParts; i++) {
            const col = i % cols
            const row = Math.floor(i / cols)
            const x = padding + col * cellWidth
            const y = padding + row * cellHeight

            // Fill highlighted cells
            if (i < partsToHighlight) {
                ctx.fillStyle = 'rgba(37, 99, 235, 0.3)'
                ctx.fillRect(x + 2, y + 2, cellWidth - 4, cellHeight - 4)
            }

            // Draw cell border
            ctx.strokeStyle = '#2563eb'
            ctx.lineWidth = 2
            ctx.strokeRect(x, y, cellWidth, cellHeight)

            // Draw cell number
            ctx.fillStyle = '#1e293b'
            ctx.font = '14px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText((i + 1).toString(), x + cellWidth / 2, y + cellHeight / 2)
        }

        // Draw labels
        ctx.fillStyle = '#64748b'
        ctx.font = '16px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(`${t('lab.totalParts')}: ${totalParts}`, padding, height - 10)
        ctx.fillText(`${t('lab.selected')}: ${partsToHighlight}`, padding + 200, height - 10)

    }, [numerator, denominator, totalParts, partsToHighlight])

    return (
        <div className="area-lab">
            <div className="lab-controls glass">
                <div className="control-group">
                    <label htmlFor="area-numerator">{t('lab.numerator')}</label>
                    <input
                        id="area-numerator"
                        type="range"
                        min="1"
                        max="20"
                        value={numerator}
                        onChange={(e) => setNumerator(Number(e.target.value))}
                    />
                    <output>{numerator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="area-denominator">{t('lab.denominator')}</label>
                    <input
                        id="area-denominator"
                        type="range"
                        min="1"
                        max="20"
                        value={denominator}
                        onChange={(e) => setDenominator(Number(e.target.value))}
                    />
                    <output>{denominator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="total-parts">{t('lab.totalParts')}</label>
                    <input
                        id="total-parts"
                        type="range"
                        min="4"
                        max="48"
                        step="4"
                        value={totalParts}
                        onChange={(e) => setTotalParts(Number(e.target.value))}
                    />
                    <output>{totalParts}</output>
                </div>
            </div>

            <div className="canvas-container glass">
                <canvas
                    ref={canvasRef}
                    width={700}
                    height={400}
                    role="img"
                    aria-label={t('lab.areaAria', { num: numerator, den: denominator })}
                />
            </div>

            <div className="fraction-info glass">
                <div className="info-item">
                    <span className="info-label">{t('lab.fraction')}:</span>
                    <span className="fraction-display">
                        <span className="numerator">{numerator}</span>
                        <span className="denominator">{denominator}</span>
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-label">{t('lab.representation')}:</span>
                    <span className="fraction-display">
                        <span className="numerator">{partsToHighlight}</span>
                        <span className="denominator">{totalParts}</span>
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-label">{t('lab.decimalValue')}:</span>
                    <span className="decimal-value">{fraction.toFixed(3)}</span>
                </div>
            </div>

            <div className="area-explanation glass">
                <h4>{t('lab.whatIsIt')}</h4>
                <p>
                    {t('lab.whatIsItDesc', { num: numerator, den: denominator })}
                </p>
                <p>
                    {t('lab.whatIsItEquiv', { total: totalParts, parts: partsToHighlight })}
                </p>
            </div>
        </div>
    )
}
