import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
            id: 'concepto',
            title: t('zenbakiOsoak.theory.sections.concepto'),
            icon: '🎯',
            color: '#6366f1',
            content: <ConceptoContent />
        },
        {
            id: 'operaciones',
            title: t('zenbakiOsoak.theory.sections.operaciones'),
            icon: '🧮',
            color: '#10b981',
            content: <OperacionesContent />
        },
        {
            id: 'avanzadas',
            title: t('zenbakiOsoak.theory.sections.avanzadas'),
            icon: '⚡',
            color: '#f59e0b',
            content: <AvanzadasContent />
        }
    ]

    return (
        <div className="theory-page zenbaki-osoak-theory">
            <div className="container">
                <header className="theory-header">
                    <h1>{t('zenbakiOsoak.theory.title')}</h1>
                    <p className="theory-subtitle">
                        {t('zenbakiOsoak.theory.subtitle')}
                    </p>
                    <p className="theory-description">
                        {t('zenbakiOsoak.theory.description')}
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

function ConceptoContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiOsoak.theory.concepto.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiOsoak.theory.concepto.description')}</p>

            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zenbakiOsoak.theory.concepto.recta.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.concepto.recta.text')}</p>
                </div>

                <div className="ops-card">
                    <h5>{t('zenbakiOsoak.theory.concepto.absoluto.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.concepto.absoluto.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.concepto.absoluto.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}

function OperacionesContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiOsoak.theory.operaciones.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiOsoak.theory.operaciones.description')}</p>

            <div className="ops-grid">
                <div className="ops-card warning">
                    <h5>{t('zenbakiOsoak.theory.operaciones.sumaMismo.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.operaciones.sumaMismo.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.operaciones.sumaMismo.example')}
                    </div>
                </div>

                <div className="ops-card success">
                    <h5>{t('zenbakiOsoak.theory.operaciones.sumaDiferente.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.operaciones.sumaDiferente.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.operaciones.sumaDiferente.example')}
                    </div>
                </div>

                <div className="ops-card purple">
                    <h5>{t('zenbakiOsoak.theory.operaciones.resta.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.operaciones.resta.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.operaciones.resta.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}

function AvanzadasContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zenbakiOsoak.theory.avanzadas.title')}</h4>
            <p className="theory-subtitle">{t('zenbakiOsoak.theory.avanzadas.description')}</p>

            <div className="ops-grid">
                <div className="ops-card highlight">
                    <h5>{t('zenbakiOsoak.theory.avanzadas.multDiv.title')}</h5>
                    <p className="rule-text">{t('zenbakiOsoak.theory.avanzadas.multDiv.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.avanzadas.multDiv.example')}
                    </div>
                </div>

                <div className="ops-card secondary">
                    <h5>{t('zenbakiOsoak.theory.avanzadas.combinadas.title')}</h5>
                    <p>{t('zenbakiOsoak.theory.avanzadas.combinadas.text')}</p>
                    <div className="example-text">
                        {t('zenbakiOsoak.theory.avanzadas.combinadas.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}
