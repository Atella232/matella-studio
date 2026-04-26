import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './EquivalenceLab.css'

export function EquivalenceLab() {
    const { t } = useTranslation()
    void t // Used in labels
    const [baseNumerator, setBaseNumerator] = useState(2)
    const [baseDenominator, setBaseDenominator] = useState(3)
    const [multiplier, setMultiplier] = useState(2)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const equivalentNum = baseNumerator * multiplier
    const equivalentDen = baseDenominator * multiplier

    // Calculate GCD for simplified form
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const commonDivisor = gcd(baseNumerator, baseDenominator)
    const simplifiedNum = baseNumerator / commonDivisor
    const simplifiedDen = baseDenominator / commonDivisor

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const width = canvas.width
        const height = canvas.height
        void height // Canvas height used for layout calculations
        const barHeight = 60
        const barWidth = 300
        const startX = (width - barWidth) / 2
        const startY1 = 80
        const startY2 = 200

        // Draw base fraction bar
        ctx.fillStyle = '#f1f5f9'
        ctx.fillRect(startX, startY1, barWidth, barHeight)

        // Draw base fraction divisions
        const baseSegmentWidth = barWidth / baseDenominator
        for (let i = 0; i <= baseDenominator; i++) {
            const x = startX + i * baseSegmentWidth
            ctx.strokeStyle = '#475569'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(x, startY1)
            ctx.lineTo(x, startY1 + barHeight)
            ctx.stroke()
        }

        // Fill base fraction
        ctx.fillStyle = 'rgba(37, 99, 235, 0.5)'
        ctx.fillRect(startX, startY1, baseSegmentWidth * baseNumerator, barHeight)

        // Draw equivalent fraction bar
        ctx.fillStyle = '#f1f5f9'
        ctx.fillRect(startX, startY2, barWidth, barHeight)

        // Draw equivalent fraction divisions
        const equivSegmentWidth = barWidth / equivalentDen
        for (let i = 0; i <= equivalentDen; i++) {
            const x = startX + i * equivSegmentWidth
            ctx.strokeStyle = '#475569'
            ctx.lineWidth = i % multiplier === 0 ? 2 : 1
            ctx.beginPath()
            ctx.moveTo(x, startY2)
            ctx.lineTo(x, startY2 + barHeight)
            ctx.stroke()
        }

        // Fill equivalent fraction
        ctx.fillStyle = 'rgba(124, 58, 237, 0.5)'
        ctx.fillRect(startX, startY2, equivSegmentWidth * equivalentNum, barHeight)

        // Labels
        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(t('lab.baseFraction') + ':', startX - 150, startY1 + barHeight / 2 + 6)

        ctx.fillStyle = '#2563eb'
        ctx.font = 'bold 24px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${baseNumerator}/${baseDenominator}`, startX + barWidth / 2, startY1 - 20)

        ctx.fillStyle = '#1e293b'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(t('lab.equivalentFraction') + ':', startX - 150, startY2 + barHeight / 2 + 6)

        ctx.fillStyle = '#7c3aed'
        ctx.font = 'bold 24px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${equivalentNum}/${equivalentDen}`, startX + barWidth / 2, startY2 - 20)

        // Multiplier indicator
        ctx.fillStyle = '#059669'
        ctx.font = 'bold 20px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`× ${multiplier}`, startX + barWidth + 50, (startY1 + startY2 + barHeight) / 2)

        // Equal sign
        ctx.fillStyle = '#64748b'
        ctx.font = 'bold 36px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('=', startX + barWidth + 120, (startY1 + startY2 + barHeight) / 2 + 10)

    }, [baseNumerator, baseDenominator, equivalentNum, equivalentDen, multiplier, t])

    return (
        <div className="equivalence-lab">
            <div className="lab-controls glass">
                <div className="control-group">
                    <label htmlFor="base-numerator">{t('lab.numerator')} {t('lab.baseFraction')}</label>
                    <input
                        id="base-numerator"
                        type="range"
                        min="1"
                        max="10"
                        value={baseNumerator}
                        onChange={(e) => setBaseNumerator(Number(e.target.value))}
                    />
                    <output>{baseNumerator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="base-denominator">{t('lab.denominator')} {t('lab.baseFraction')}</label>
                    <input
                        id="base-denominator"
                        type="range"
                        min="1"
                        max="10"
                        value={baseDenominator}
                        onChange={(e) => setBaseDenominator(Number(e.target.value))}
                    />
                    <output>{baseDenominator}</output>
                </div>

                <div className="control-group">
                    <label htmlFor="multiplier">{t('lab.multiplier')}</label>
                    <input
                        id="multiplier"
                        type="range"
                        min="2"
                        max="5"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                    />
                    <output>×{multiplier}</output>
                </div>
            </div>

            <div className="canvas-container glass">
                <canvas
                    ref={canvasRef}
                    width={700}
                    height={320}
                    role="img"
                    aria-label={t('lab.equivalenceAria', {
                        num1: baseNumerator,
                        den1: baseDenominator,
                        num2: equivalentNum,
                        den2: equivalentDen
                    })}
                />
            </div>

            <div className="equivalence-info glass">
                <div className="equivalence-formula">
                    <div className="fraction-step">
                        <span className="fraction-display">
                            <span className="numerator">{baseNumerator}</span>
                            <span className="denominator">{baseDenominator}</span>
                        </span>
                    </div>
                    <span className="operator">×</span>
                    <div className="fraction-step">
                        <span className="fraction-display">
                            <span className="numerator">{multiplier}</span>
                            <span className="denominator">{multiplier}</span>
                        </span>
                    </div>
                    <span className="operator">=</span>
                    <div className="fraction-step result">
                        <span className="fraction-display">
                            <span className="numerator">{equivalentNum}</span>
                            <span className="denominator">{equivalentDen}</span>
                        </span>
                    </div>
                </div>

                {commonDivisor > 1 && (
                    <div className="simplified-form">
                        <p>{t('lab.irreducible')}:</p>
                        <span className="fraction-display">
                            <span className="numerator">{simplifiedNum}</span>
                            <span className="denominator">{simplifiedDen}</span>
                        </span>
                    </div>
                )}
            </div>

            <div className="equivalence-explanation glass">
                <h4>{t('lab.equivPrinciple')}</h4>
                <p>
                    {t('lab.equivPrincipleDesc')}
                </p>
                <p>
                    {t('lab.equivCase', {
                        mult: multiplier,
                        num: equivalentNum,
                        den: equivalentDen,
                        baseNum: baseNumerator,
                        baseDen: baseDenominator
                    })}
                </p>
            </div>
        </div>
    )
}
