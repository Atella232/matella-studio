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
            id: 'conceptos',
            title: t('zatigarritasuna.theory.sections.conceptos'),
            icon: '🎯',
            color: '#6366f1',
            content: <ConceptosContent />
        },
        {
            id: 'criterios',
            title: t('zatigarritasuna.theory.sections.criterios'),
            icon: '⚡',
            color: '#10b981',
            content: <CriteriosContent />
        },
        {
            id: 'primos',
            title: t('zatigarritasuna.theory.sections.primos'),
            icon: '🧱',
            color: '#f59e0b',
            content: <PrimosContent />
        },
        {
            id: 'mcmMcd',
            title: t('zatigarritasuna.theory.sections.mcmMcd'),
            icon: '🧮',
            color: '#ec4899',
            content: <McmMcdContent />
        }
    ]

    return (
        <div className="theory-page zatigarritasuna-theory">
            <div className="container">
                <header className="theory-header">
                    <h1>{t('zatigarritasuna.theory.title')}</h1>
                    <p className="theory-subtitle">
                        {t('zatigarritasuna.theory.subtitle')}
                    </p>
                    <p className="theory-description">
                        {t('zatigarritasuna.theory.description')}
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

function ConceptosContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zatigarritasuna.theory.conceptos.title')}</h4>
            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.conceptos.multiplos.title')}</h5>
                    <p>{t('zatigarritasuna.theory.conceptos.multiplos.text')}</p>
                    <div className="example-text">
                        <Trans i18nKey="zatigarritasuna.theory.conceptos.multiplos.example">
                            <em>Ejemplos: 3, 6, 9, 12... son múltiplos de 3 porque 3×1=3, 3×2=6, 3×3=9, 3×4=12.</em>
                        </Trans>
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.conceptos.divisores.title')}</h5>
                    <p>{t('zatigarritasuna.theory.conceptos.divisores.text')}</p>
                    <div className="example-text">
                        <Trans i18nKey="zatigarritasuna.theory.conceptos.divisores.example">
                            <em>Ejemplos: Los divisores de 12 son 1, 2, 3, 4, 6 y 12.</em>
                        </Trans>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CriteriosContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zatigarritasuna.theory.criterios.title')}</h4>
            <p className="theory-subtitle">{t('zatigarritasuna.theory.criterios.description')}</p>

            <div className="divisibility-table-container">
                <table className="divisibility-table">
                    <thead>
                        <tr>
                            <th>{t('zatigarritasuna.theory.criterios.tableHeaders.divBy')}</th>
                            <th>{t('zatigarritasuna.theory.criterios.tableHeaders.criterion')}</th>
                            <th>{t('zatigarritasuna.theory.criterios.tableHeaders.example')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[2, 3, 5, 9, 10, 11].map(num => (
                            <tr key={num}>
                                <td className="number-col">{num}</td>
                                <td>{t(`zatigarritasuna.theory.criterios.rules.r${num}.text`)}</td>
                                <td className="example-col">{t(`zatigarritasuna.theory.criterios.rules.r${num}.example`)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function PrimosContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zatigarritasuna.theory.primos.title')}</h4>
            <p className="theory-subtitle">{t('zatigarritasuna.theory.primos.subtitle')}</p>

            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.primos.primos.title')}</h5>
                    <p>{t('zatigarritasuna.theory.primos.primos.text')}</p>
                    <div className="example-text">
                        {t('zatigarritasuna.theory.primos.primos.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.primos.compuestos.title')}</h5>
                    <p>{t('zatigarritasuna.theory.primos.compuestos.text')}</p>
                    <div className="example-text">
                        {t('zatigarritasuna.theory.primos.compuestos.example')}
                    </div>
                </div>
            </div>

            <div className="tip-box" style={{ marginTop: 'var(--space-6)' }}>
                <h5>{t('zatigarritasuna.theory.primos.descomposicion.title')}</h5>
                <p>{t('zatigarritasuna.theory.primos.descomposicion.text')}</p>
                <div className="example-text">
                    {t('zatigarritasuna.theory.primos.descomposicion.example')}
                </div>
            </div>
        </div>
    )
}

function McmMcdContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('zatigarritasuna.theory.mcmMcd.title')}</h4>
            <p className="theory-subtitle">{t('zatigarritasuna.theory.mcmMcd.description')}</p>

            <div className="ops-grid">
                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.mcmMcd.mcm.title')}</h5>
                    <p>{t('zatigarritasuna.theory.mcmMcd.mcm.text')}</p>
                    <div className="example-text">
                        {t('zatigarritasuna.theory.mcmMcd.mcm.example')}
                    </div>
                </div>

                <div className="ops-card">
                    <h5>{t('zatigarritasuna.theory.mcmMcd.mcd.title')}</h5>
                    <p>{t('zatigarritasuna.theory.mcmMcd.mcd.text')}</p>
                    <div className="example-text">
                        {t('zatigarritasuna.theory.mcmMcd.mcd.example')}
                    </div>
                </div>
            </div>
        </div>
    )
}
