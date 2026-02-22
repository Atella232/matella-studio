import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './LcmGcdLab.css'

export function LcmGcdLab() {
    const { t } = useTranslation()
    const [num1, setNum1] = useState<number | ''>('')
    const [num2, setNum2] = useState<number | ''>('')
    const [result, setResult] = useState<{ lcm: number, gcd: number } | null>(null)

    const calculateGcd = (a: number, b: number): number => {
        a = Math.abs(a)
        b = Math.abs(b)
        while (b !== 0) {
            let temp = b
            b = a % b
            a = temp
        }
        return a
    }

    const handleCalculate = () => {
        if (num1 !== '' && num2 !== '' && num1 !== 0 && num2 !== 0) {
            const gcdVal = calculateGcd(num1, num2)
            const lcmVal = Math.abs(num1 * num2) / gcdVal
            setResult({ lcm: lcmVal, gcd: gcdVal })
        } else {
            setResult(null)
        }
    }

    return (
        <div className="lcm-gcd-lab">
            <div className="lab-controls glass">
                <div className="input-group">
                    <label htmlFor="lcm-num1">{t('lab.lcmGcd.num1')}</label>
                    <input
                        id="lcm-num1"
                        type="number"
                        min="1"
                        value={num1 === '' ? '' : num1}
                        onChange={(e) => setNum1(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t('lab.lcmGcd.num1Placeholder') as string}
                        className="glass-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="lcm-num2">{t('lab.lcmGcd.num2')}</label>
                    <input
                        id="lcm-num2"
                        type="number"
                        min="1"
                        value={num2 === '' ? '' : num2}
                        onChange={(e) => setNum2(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t('lab.lcmGcd.num2Placeholder') as string}
                        className="glass-input"
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleCalculate}
                    disabled={num1 === '' || num2 === '' || num1 === 0 || num2 === 0}
                >
                    {t('lab.lcmGcd.calculate')}
                </button>
            </div>

            {result !== null && (
                <div className="results-grid">
                    <div className="result-card glass">
                        <h3>{t('lab.lcmGcd.lcm')}</h3>
                        <div className="result-value mkt-val">{result.lcm}</div>
                        <p>{t('lab.lcmGcd.resultLcm', { n1: num1, n2: num2, result: result.lcm })}</p>
                    </div>
                    <div className="result-card glass">
                        <h3>{t('lab.lcmGcd.gcd')}</h3>
                        <div className="result-value zkh-val">{result.gcd}</div>
                        <p>{t('lab.lcmGcd.resultGcd', { n1: num1, n2: num2, result: result.gcd })}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
