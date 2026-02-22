import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './DivisibilityRulesLab.css'

export function DivisibilityRulesLab() {
    const { t } = useTranslation()
    const [num, setNum] = useState<number | ''>('')
    const [results, setResults] = useState<{ rule: number, passes: boolean, text: string }[] | null>(null)

    const checkRules = () => {
        if (num === '') {
            setResults(null)
            return
        }

        const numStr = Math.abs(num).toString()
        const digits = numStr.split('').map(Number)
        const sumOfDigits = digits.reduce((a, b) => a + b, 0)
        const lastDigit = digits[digits.length - 1]

        let altSum = 0
        digits.forEach((d, i) => {
            if (i % 2 === 0) altSum += d
            else altSum -= d
        })

        const newResults = [
            {
                rule: 2,
                passes: lastDigit % 2 === 0,
                text: t('lab.rules.rule2')
            },
            {
                rule: 3,
                passes: sumOfDigits % 3 === 0,
                text: t('lab.rules.rule3')
            },
            {
                rule: 5,
                passes: lastDigit === 0 || lastDigit === 5,
                text: t('lab.rules.rule5')
            },
            {
                rule: 9,
                passes: sumOfDigits % 9 === 0,
                text: t('lab.rules.rule9')
            },
            {
                rule: 10,
                passes: lastDigit === 0,
                text: t('lab.rules.rule10')
            },
            {
                rule: 11,
                passes: altSum % 11 === 0,
                text: t('lab.rules.rule11')
            }
        ]

        setResults(newResults)
    }

    return (
        <div className="divisibility-rules-lab">
            <div className="lab-controls glass">
                <div className="input-group">
                    <label htmlFor="rules-number">{t('lab.rules.number')}</label>
                    <input
                        id="rules-number"
                        type="number"
                        min="1"
                        value={num === '' ? '' : num}
                        onChange={(e) => setNum(e.target.value === '' ? '' : Math.abs(Number(e.target.value)))}
                        placeholder={t('lab.rules.numberPlaceholder') as string}
                        className="glass-input"
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={checkRules}
                    disabled={num === ''}
                >
                    {t('lab.rules.check')}
                </button>
            </div>

            {results !== null && (
                <div className="rules-grid">
                    {results.map(r => (
                        <div key={r.rule} className={`rule-card glass ${r.passes ? 'passes' : 'fails'}`}>
                            <div className="rule-header">
                                <span className="rule-badge">{r.rule}</span>
                                <span className="rule-status">
                                    {r.passes ? t('lab.rules.yes') : t('lab.rules.no')}
                                </span>
                            </div>
                            <p className="rule-text">{r.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
