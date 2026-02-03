import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './OperationsLab.css'

type Operation = 'add' | 'subtract'

export function OperationsLab() {
    const { t } = useTranslation()
    const [num1, setNum1] = useState(1)
    const [den1, setDen1] = useState(3)
    const [num2, setNum2] = useState(1)
    const [den2, setDen2] = useState(4)
    const [operation, setOperation] = useState<Operation>('add')
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Calculate LCM
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

    const commonDen = lcm(den1, den2)
    const newNum1 = num1 * (commonDen / den1)
    const newNum2 = num2 * (commonDen / den2)
    const resultNum = operation === 'add' ? newNum1 + newNum2 : newNum1 - newNum2
    const resultDen = commonDen

    // Simplify result
    const resultGcd = gcd(Math.abs(resultNum), resultDen)
    const simplifiedNum = resultNum / resultGcd
    const simplifiedDen = resultDen / resultGcd

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const barWidth = 280
        const barHeight = 40
        const startX = 60
        const gap = 30

        // Draw first fraction bar
        const y1 = 50
        drawFractionBar(ctx, startX, y1, barWidth, barHeight, num1, den1, '#3B82F6', '#1D4ED8')
        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${num1}/${den1}`, startX + barWidth / 2, y1 - 15)

        // Draw operation symbol
        const opY = y1 + barHeight + gap / 2 + 5
        ctx.font = 'bold 32px Inter, sans-serif'
        ctx.fillStyle = operation === 'add' ? '#059669' : '#DC2626'
        ctx.fillText(operation === 'add' ? '+' : '−', startX + barWidth / 2, opY)

        // Draw second fraction bar
        const y2 = y1 + barHeight + gap + 20
        drawFractionBar(ctx, startX, y2, barWidth, barHeight, num2, den2, '#8B5CF6', '#6D28D9')
        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.fillText(`${num2}/${den2}`, startX + barWidth / 2, y2 - 15)

        // Draw equals line
        const lineY = y2 + barHeight + gap
        ctx.strokeStyle = '#94a3b8'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(startX, lineY)
        ctx.lineTo(startX + barWidth, lineY)
        ctx.stroke()

        // Draw result bar
        const y3 = lineY + 30
        const resultColor = resultNum >= 0 ? '#10B981' : '#EF4444'
        const resultColorDark = resultNum >= 0 ? '#047857' : '#B91C1C'

        if (resultNum > 0) {
            drawFractionBar(ctx, startX, y3, barWidth, barHeight, Math.min(resultNum, resultDen), resultDen, resultColor, resultColorDark)
        }

        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 20px Inter, sans-serif'
        ctx.fillText(`${simplifiedNum}/${simplifiedDen}`, startX + barWidth / 2, y3 + barHeight + 30)

    }, [num1, den1, num2, den2, operation, resultNum, simplifiedNum, simplifiedDen])

    function drawFractionBar(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        numerator: number,
        denominator: number,
        fillColor: string,
        strokeColor: string
    ) {
        const segmentWidth = width / denominator

        // Draw filled segments
        for (let i = 0; i < numerator && i < denominator; i++) {
            ctx.fillStyle = fillColor
            ctx.fillRect(x + i * segmentWidth + 1, y + 1, segmentWidth - 2, height - 2)
        }

        // Draw segment borders
        for (let i = 0; i <= denominator; i++) {
            ctx.strokeStyle = strokeColor
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(x + i * segmentWidth, y)
            ctx.lineTo(x + i * segmentWidth, y + height)
            ctx.stroke()
        }

        // Draw outer border
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 3
        ctx.strokeRect(x, y, width, height)
    }

    return (
        <div className="operations-lab">
            <div className="operations-controls">
                <div className="fraction-control glass">
                    <h4>{t('lab.operations.fraction1')}</h4>
                    <div className="control-group">
                        <label>{t('lab.numerator')}</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={num1}
                            onChange={(e) => setNum1(Number(e.target.value))}
                        />
                        <output>{num1}</output>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.denominator')}</label>
                        <input
                            type="range"
                            min="2"
                            max="12"
                            value={den1}
                            onChange={(e) => setDen1(Number(e.target.value))}
                        />
                        <output>{den1}</output>
                    </div>
                </div>

                <div className="operation-selector glass">
                    <button
                        className={`op-btn add ${operation === 'add' ? 'active' : ''}`}
                        onClick={() => setOperation('add')}
                        aria-pressed={operation === 'add'}
                    >
                        + {t('lab.operations.add')}
                    </button>
                    <button
                        className={`op-btn subtract ${operation === 'subtract' ? 'active' : ''}`}
                        onClick={() => setOperation('subtract')}
                        aria-pressed={operation === 'subtract'}
                    >
                        − {t('lab.operations.subtract')}
                    </button>
                </div>

                <div className="fraction-control glass">
                    <h4>{t('lab.operations.fraction2')}</h4>
                    <div className="control-group">
                        <label>{t('lab.numerator')}</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={num2}
                            onChange={(e) => setNum2(Number(e.target.value))}
                        />
                        <output>{num2}</output>
                    </div>
                    <div className="control-group">
                        <label>{t('lab.denominator')}</label>
                        <input
                            type="range"
                            min="2"
                            max="12"
                            value={den2}
                            onChange={(e) => setDen2(Number(e.target.value))}
                        />
                        <output>{den2}</output>
                    </div>
                </div>
            </div>

            <div className="canvas-container glass operations-canvas">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={320}
                    role="img"
                    aria-label={t('lab.operations.aria', {
                        num1, den1,
                        op: operation === 'add' ? t('lab.operations.plus') : t('lab.operations.minus'),
                        num2, den2,
                        resNum: simplifiedNum,
                        resDen: simplifiedDen
                    })}
                />
            </div>

            <div className="operations-steps glass">
                <h4>{t('lab.operations.steps')}</h4>
                <ol>
                    <li>
                        <span className="step-label">MCM({den1}, {den2})</span>
                        <span className="step-result">= {commonDen}</span>
                    </li>
                    <li>
                        <span className="step-label">{num1}/{den1} → {newNum1}/{commonDen}</span>
                    </li>
                    <li>
                        <span className="step-label">{num2}/{den2} → {newNum2}/{commonDen}</span>
                    </li>
                    <li>
                        <span className="step-label">{newNum1} {operation === 'add' ? '+' : '−'} {newNum2}</span>
                        <span className="step-result">= {resultNum}/{resultDen}</span>
                    </li>
                    {resultGcd > 1 && (
                        <li>
                            <span className="step-label">{t('lab.operations.simplified')}</span>
                            <span className="step-result final">= {simplifiedNum}/{simplifiedDen}</span>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}
