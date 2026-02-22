import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './DivisorCheckerLab.css'

export function DivisorCheckerLab() {
    const { t } = useTranslation()
    const [num, setNum] = useState<number | ''>('')
    const [div, setDiv] = useState<number | ''>('')
    const [result, setResult] = useState<{ isDivisible: boolean, quotient: number, remainder: number } | null>(null)

    const handleCheck = () => {
        if (num !== '' && div !== '' && div !== 0) {
            const isDivisible = num % div === 0
            const quotient = Math.floor(num / div)
            const remainder = num % div
            setResult({ isDivisible, quotient, remainder })
        } else {
            setResult(null)
        }
    }

    return (
        <div className="divisor-checker-lab">
            <div className="lab-controls glass">
                <div className="input-group">
                    <label htmlFor="divisor-number">{t('lab.divisorChecker.number')}</label>
                    <input
                        id="divisor-number"
                        type="number"
                        min="1"
                        value={num === '' ? '' : num}
                        onChange={(e) => setNum(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t('lab.divisorChecker.numberPlaceholder') as string}
                        className="glass-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="divisor-div">{t('lab.divisorChecker.divisor')}</label>
                    <input
                        id="divisor-div"
                        type="number"
                        min="1"
                        value={div === '' ? '' : div}
                        onChange={(e) => setDiv(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t('lab.divisorChecker.divisorPlaceholder') as string}
                        className="glass-input"
                    />
                </div>
                <button className="btn btn-primary" onClick={handleCheck} disabled={num === '' || div === '' || div === 0}>
                    {t('lab.divisorChecker.check')}
                </button>
            </div>

            {result !== null && (
                <div className={`result-container glass ${result.isDivisible ? 'success' : 'error'}`}>
                    <div className="result-icon">
                        {result.isDivisible ? '✅' : '❌'}
                    </div>
                    <div className="result-text">
                        <h3>
                            {result.isDivisible
                                ? t('lab.divisorChecker.isDivisible', { num, div })
                                : t('lab.divisorChecker.isNotDivisible', { num, div })}
                        </h3>
                        <p className="explanation">
                            {t('lab.divisorChecker.explanationFormat', { num, div, quotient: result.quotient, remainder: result.remainder })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
