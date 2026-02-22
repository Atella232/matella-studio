import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IntegerCalculatorLab } from '../../../features/labs/IntegerCalculatorLab'
import './LabPage.css'

type LabType = 'integerCalculator'

interface LabInfo {
    id: LabType
    icon: string
    label: string
    description: string
    color: string
}

export function LabPageDBH1_ZenbakiOsoak() {
    const { t } = useTranslation()
    const [activeLab, setActiveLab] = useState<LabType>('integerCalculator')

    const labs: LabInfo[] = [
        {
            id: 'integerCalculator',
            icon: '🧮',
            label: t('zenbakiOsoak.lab.integerCalculator.title'),
            description: t('zenbakiOsoak.lab.integerCalculator.desc'),
            color: '#3B82F6' // Blue
        }
    ]

    const renderLab = () => {
        switch (activeLab) {
            case 'integerCalculator':
                return <IntegerCalculatorLab />
            default:
                return null
        }
    }

    return (
        <div className="lab-page-container">
            <header className="lab-header">
                <div className="container">
                    <Link to="/matematika/dbh1/numeros-enteros" className="back-link">
                        ← {t('theory.back')}
                    </Link>
                    <h1>{t('zenbakiOsoak.lab.title')}</h1>
                    <p className="subtitle">{t('zenbakiOsoak.lab.subtitle')}</p>
                </div>
            </header>

            <main className="lab-main container">
                <div className="lab-grid">
                    <nav className="lab-navigation glass">
                        <ul>
                            {labs.map(lab => (
                                <li key={lab.id}>
                                    <button
                                        className={`lab-nav-btn ${activeLab === lab.id ? 'active' : ''}`}
                                        onClick={() => setActiveLab(lab.id)}
                                        style={{ '--lab-color': lab.color } as React.CSSProperties}
                                    >
                                        <span className="lab-nav-icon">{lab.icon}</span>
                                        <div className="lab-nav-info">
                                            <h3>{lab.label}</h3>
                                            <p>{lab.description}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <section className="lab-content glass">
                        {renderLab()}
                    </section>
                </div>
            </main>
        </div>
    )
}
