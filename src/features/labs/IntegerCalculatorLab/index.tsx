import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './IntegerCalculatorLab.css'

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

export function IntegerCalculatorLab() {
    const { t } = useTranslation()
    const [num1, setNum1] = useState<number | ''>('')
    const [num2, setNum2] = useState<number | ''>('')
    const [operation, setOperation] = useState<Operation>('add')
    const [result, setResult] = useState<number | string | null>(null)

    const handleCalculate = () => {
        if (num1 === '' || num2 === '') return

        let res: number | string = 0
        switch (operation) {
            case 'add':
                res = num1 + num2
                break
            case 'subtract':
                res = num1 - num2
                break
            case 'multiply':
                res = num1 * num2
                break
            case 'divide':
                if (num2 === 0) {
                    res = t('zenbakiOsoak.lab.integerCalculator.errorZero')
                } else {
                    res = num1 / num2
                    // round to 2 decimals if not integer
                    if (!Number.isInteger(res)) {
                        res = Number(res.toFixed(2))
                    }
                }
                break
        }
        setResult(res)
    }

    return (
        <div className="integer-calculator-lab">
            <div className="lab-controls glass">
                <div className="input-group">
                    <label htmlFor="int-num1">{t('zenbakiOsoak.lab.integerCalculator.num1')}</label>
                    <input
                        id="int-num1"
                        type="number"
                        value={num1 === '' ? '' : num1}
                        onChange={(e) => setNum1(e.target.value === '' ? '' : Number(e.target.value))}
                        className="glass-input"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="int-operation">{t('zenbakiOsoak.lab.integerCalculator.operation')}</label>
                    <select
                        id="int-operation"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value as Operation)}
                        className="glass-input"
                    >
                        <option value="add">{t('zenbakiOsoak.lab.integerCalculator.add')}</option>
                        <option value="subtract">{t('zenbakiOsoak.lab.integerCalculator.subtract')}</option>
                        <option value="multiply">{t('zenbakiOsoak.lab.integerCalculator.multiply')}</option>
                        <option value="divide">{t('zenbakiOsoak.lab.integerCalculator.divide')}</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="int-num2">{t('zenbakiOsoak.lab.integerCalculator.num2')}</label>
                    <input
                        id="int-num2"
                        type="number"
                        value={num2 === '' ? '' : num2}
                        onChange={(e) => setNum2(e.target.value === '' ? '' : Number(e.target.value))}
                        className="glass-input"
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleCalculate}
                    disabled={num1 === '' || num2 === ''}
                >
                    {t('zenbakiOsoak.lab.integerCalculator.calculate')}
                </button>
            </div>

            {result !== null && (
                <div className={`result-card glass ${typeof result === 'string' ? 'error' : ''}`}>
                    <div className="result-value">
                        {typeof result === 'number' ? (
                            <span className={result < 0 ? 'negative-val' : 'positive-val'}>
                                {result}
                            </span>
                        ) : (
                            <span>{result}</span>
                        )}
                    </div>
                    {typeof result === 'number' && (
                        <p>{t('zenbakiOsoak.lab.integerCalculator.result', { res: result })}</p>
                    )}
                </div>
            )}
        </div>
    )
}
