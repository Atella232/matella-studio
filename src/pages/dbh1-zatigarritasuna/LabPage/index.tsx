import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DivisorCheckerLab } from '../../../features/labs/DivisorCheckerLab'
import { LcmGcdLab } from '../../../features/labs/LcmGcdLab'
import { DivisibilityRulesLab } from '../../../features/labs/DivisibilityRulesLab'
import './LabPage.css'

type LabType = 'divisorChecker' | 'lcmGcd' | 'rules'

interface LabInfo {
    id: LabType
    icon: string
    label: string
    description: string
    color: string
}

export function LabPageDBH1_Zatigarritasuna() {
    const { t } = useTranslation()
    const [activeLab, setActiveLab] = useState<LabType>('divisorChecker')

    const labs: LabInfo[] = [
        {
            id: 'divisorChecker',
            icon: '🔍',
            label: t('zatigarritasuna.lab.divisorChecker.title'),
            description: t('zatigarritasuna.lab.divisorChecker.desc'),
            color: '#3B82F6'
        },
        {
            id: 'lcmGcd',
            icon: '🧮',
            label: t('zatigarritasuna.lab.lcmGcd.title'),
            description: t('zatigarritasuna.lab.lcmGcd.desc'),
            color: '#10B981'
        },
        {
            id: 'rules',
            icon: '✅',
            label: t('zatigarritasuna.lab.rules.title'),
            description: t('zatigarritasuna.lab.rules.desc'),
            color: '#F59E0B'
        }
    ]

    const renderLab = () => {
        switch (activeLab) {
            case 'divisorChecker':
                return <DivisorCheckerLab />
            case 'lcmGcd':
                return <LcmGcdLab />
            case 'rules':
                return <DivisibilityRulesLab />
        }
    }

    const activeLabInfo = labs.find(l => l.id === activeLab)

    return (
        <div className="lab-page zatigarritasuna-lab">
            <div className="container">
                <header className="lab-header">
                    <h1>🧪 {t('zatigarritasuna.lab.title')}</h1>
                    <p className="lab-instructions">{t('zatigarritasuna.lab.subtitle')}</p>
                </header>

                <nav className="lab-grid" role="tablist" aria-label="Laboratory types">
                    {labs.map((lab) => (
                        <button
                            key={lab.id}
                            role="tab"
                            aria-selected={activeLab === lab.id}
                            aria-controls={`panel-${lab.id}`}
                            id={`tab-${lab.id}`}
                            className={`lab-card ${activeLab === lab.id ? 'active' : ''}`}
                            onClick={() => setActiveLab(lab.id)}
                            style={{ '--lab-color': lab.color } as React.CSSProperties}
                        >
                            <span className="lab-icon">{lab.icon}</span>
                            <span className="lab-name">{lab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="lab-content">
                    <section
                        id={`panel-${activeLab}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeLab}`}
                        className="lab-panel"
                    >
                        <div className="lab-panel-header">
                            <span className="panel-icon">{activeLabInfo?.icon}</span>
                            <div>
                                <h2>{activeLabInfo?.label}</h2>
                                <p>{activeLabInfo?.description}</p>
                            </div>
                        </div>
                        {renderLab()}
                    </section>
                </div>
            </div>
        </div>
    )
}
