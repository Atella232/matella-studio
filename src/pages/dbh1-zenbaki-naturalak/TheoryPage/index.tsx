import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import './TheoryPage.css'

interface TheorySection {
    id: string
    title: string
    icon: string
    color: string
    content: React.ReactNode
}

export function TheoryPage() {
    const { t } = useTranslation()
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id)
    }

    const sections: TheorySection[] = [
        {
            id: 'mentalMath',
            title: t('zenbakiNaturalak.theory.sections.mentalMath'),
            icon: '🧠',
            color: '#6366f1',
            content: <MentalMathContent />
        },
        {
            id: 'operations',
            title: t('zenbakiNaturalak.theory.sections.operations'),
            icon: '🧮',
            color: '#10b981',
            content: <OperationsContent />
        },
        {
            id: 'orderOfOperations',
            title: t('zenbakiNaturalak.theory.sections.orderOfOperations'),
            icon: '⚖️',
            color: '#f59e0b',
            content: <OrderOfOperationsContent />
        }
    ]

    return (
        <div className="theory-page zenbaki-naturalak-theory">
            <div className="container">
                <header className="theory-header">
                    <h1>{t('zenbakiNaturalak.theory.title')}</h1>
                    <p className="theory-subtitle">
                        {t('zenbakiNaturalak.theory.subtitle')}
                    </p>
                    <p className="theory-description">
                        {t('zenbakiNaturalak.theory.description')}
                    </p>
                </header>

                <div className="theory-grid">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`theory-card ${expandedSection === section.id ? 'expanded' : ''}`}
                            style={{ '--card-color': section.color } as React.CSSProperties}
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="card-header">
                                <span className="card-icon">{section.icon}</span>
                                <h3 className="card-title">{section.title}</h3>
                                <span className="card-toggle">
                                    {expandedSection === section.id ? '−' : '+'}
                                </span>
                            </div>

                            <div className={`card-content ${expandedSection === section.id ? 'visible' : ''}`}>
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function MentalMathContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiNaturalak.theory.mentalMath.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiNaturalak.theory.mentalMath.subtitle')}</p>
            <p>{t('zenbakiNaturalak.theory.mentalMath.description')}</p>

            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.mentalMath.rounding.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.mentalMath.rounding.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.mentalMath.rounding.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.mentalMath.breakdown.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.mentalMath.breakdown.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.mentalMath.breakdown.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}

function OperationsContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiNaturalak.theory.ops.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiNaturalak.theory.ops.subtitle')}</p>
            <p>{t('zenbakiNaturalak.theory.ops.description')}</p>

            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.ops.addition.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.ops.addition.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.ops.addition.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.ops.subtraction.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.ops.subtraction.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.ops.subtraction.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.ops.multiplication.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.ops.multiplication.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.ops.multiplication.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zenbakiNaturalak.theory.ops.division.title')}</h5>
                    <p>{t('zenbakiNaturalak.theory.ops.division.text')}</p>
                    <div className="example-text">
                        {t('zenbakiNaturalak.theory.ops.division.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}

function OrderOfOperationsContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiNaturalak.theory.order.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiNaturalak.theory.order.subtitle')}</p>
            <p>{t('zenbakiNaturalak.theory.order.description')}</p>

            <h5>{t('zenbakiNaturalak.theory.order.rulesTitle')}</h5>
            <ul className="method-steps">
                <li>
                    <span className="step-number">1</span>
                    <Trans i18nKey="zenbakiNaturalak.theory.order.rule1" components={{ b: <b /> }} />
                </li>
                <li>
                    <span className="step-number">2</span>
                    <Trans i18nKey="zenbakiNaturalak.theory.order.rule2" components={{ b: <b /> }} />
                </li>
                <li>
                    <span className="step-number">3</span>
                    <Trans i18nKey="zenbakiNaturalak.theory.order.rule3" components={{ b: <b /> }} />
                </li>
            </ul>

            <div className="tip-box">
                <strong>{t('zenbakiNaturalak.theory.order.example')}</strong>
                <div className="example-text">
                    {t('zenbakiNaturalak.theory.order.exampleText')}
                </div>
            </div>
        </div>
    )
}
