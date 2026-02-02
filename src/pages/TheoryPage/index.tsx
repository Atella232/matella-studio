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
    void t // Translation function for future use
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id)
    }

    const sections: TheorySection[] = [
        {
            id: 'definicion',
            title: t('theory.sections.definition'),
            icon: '📐',
            color: '#6366f1',
            content: <DefinicionContent />
        },
        {
            id: 'tipos',
            title: t('theory.sections.types'),
            icon: '📊',
            color: '#06b6d4',
            content: <TiposContent />
        },
        {
            id: 'equivalentes',
            title: t('theory.sections.equivalent'),
            icon: '🔄',
            color: '#f472b6',
            content: <EquivalentesContent />
        },
        {
            id: 'comparacion',
            title: t('theory.sections.compare'),
            icon: '⚖️',
            color: '#8b5cf6',
            content: <ComparacionContent />
        },
        {
            id: 'suma-resta',
            title: t('theory.sections.addSubtract'),
            icon: '➕',
            color: '#10b981',
            content: <SumaRestaContent />
        },
        {
            id: 'multiplicacion',
            title: t('theory.sections.multiply'),
            icon: '✖️',
            color: '#f59e0b',
            content: <MultiplicacionContent />
        },
        {
            id: 'division',
            title: t('theory.sections.divide'),
            icon: '➗',
            color: '#ef4444',
            content: <DivisionContent />
        },
        {
            id: 'potencias',
            title: t('theory.sections.powers'),
            icon: '🔢',
            color: '#ec4899',
            content: <PotenciasContent />
        },
        {
            id: 'operaciones',
            title: t('theory.sections.combined'),
            icon: '🧮',
            color: '#6366f1',
            content: <OperacionesContent />
        },
        {
            id: 'decimales',
            title: t('theory.sections.decimals'),
            icon: '💱',
            color: '#06b6d4',
            content: <DecimalesContent />
        },
        {
            id: 'proporcionalidad',
            title: t('theory.sections.proportionality'),
            icon: '📈',
            color: '#f472b6',
            content: <ProporcionalidadContent />
        },
        {
            id: 'porcentajes',
            title: t('theory.sections.percentages'),
            icon: '%',
            color: '#8b5cf6',
            content: <PorcentajesContent />
        }
    ]

    return (
        <div className="theory-page">
            <div className="container">
                <header className="theory-header">
                    <h1>{t('theory.title')}</h1>
                    <p className="theory-subtitle">
                        {t('theory.subtitle')}
                    </p>
                    <p className="theory-description">
                        {t('theory.description')}
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

// Componentes de contenido para cada sección
function DefinicionContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('theory.content.definition.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.definition.text1" components={{ strong: <strong /> }} />
            </p>

            <div className="fraction-visual">
                <div className="big-fraction">
                    <span className="numerator">3</span>
                    <span className="fraction-line"></span>
                    <span className="denominator">4</span>
                </div>
                <div className="fraction-labels">
                    <span className="label num-label">{t('theory.content.definition.numeratorLabel')}</span>
                    <span className="label den-label">{t('theory.content.definition.denominatorLabel')}</span>
                </div>
            </div>

            <h4>{t('theory.content.definition.meaningsTitle')}</h4>
            <div className="meanings-grid">
                <div className="meaning-card">
                    <h5>{t('theory.content.definition.partWholeTitle')}</h5>
                    <p>{t('theory.content.definition.partWholeText')}</p>
                    <div className="example">
                        <Trans i18nKey="theory.content.definition.partWholeExample" components={{ strong: <strong /> }} />
                    </div>
                </div>

                <div className="meaning-card">
                    <h5>{t('theory.content.definition.quotientTitle')}</h5>
                    <p>{t('theory.content.definition.quotientText')}</p>
                    <div className="example">
                        <Trans i18nKey="theory.content.definition.quotientExample" components={{ strong: <strong /> }} />
                    </div>
                </div>

                <div className="meaning-card">
                    <h5>{t('theory.content.definition.operatorTitle')}</h5>
                    <p>{t('theory.content.definition.operatorText')}</p>
                    <div className="example">
                        <Trans i18nKey="theory.content.definition.operatorExample" components={{ strong: <strong /> }} />
                    </div>
                </div>

                <div className="meaning-card">
                    <h5>{t('theory.content.definition.ratioTitle')}</h5>
                    <p>{t('theory.content.definition.ratioText')}</p>
                    <div className="example">
                        <Trans i18nKey="theory.content.definition.ratioExample" components={{ strong: <strong /> }} />
                    </div>
                </div>
            </div>

            <div className="tip-box">
                <Trans i18nKey="theory.content.definition.tip" components={{ strong: <strong /> }} />
            </div>
        </div>
    )
}

function TiposContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('theory.content.types.title')}</h4>

            <div className="type-cards">
                <div className="type-card proper">
                    <h5>{t('theory.content.types.properTitle')}</h5>
                    <div className="fraction-example">
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">5</span>
                        </span>
                    </div>
                    <p>{t('theory.content.types.properDesc')}</p>
                    <p className="value">{t('theory.content.types.properValue')}</p>
                    <div className="example">{t('theory.content.types.properExample')}</div>
                </div>

                <div className="type-card improper">
                    <h5>{t('theory.content.types.improperTitle')}</h5>
                    <div className="fraction-example">
                        <span className="fraction-display">
                            <span className="num">7</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                    </div>
                    <p>{t('theory.content.types.improperDesc')}</p>
                    <p className="value">{t('theory.content.types.improperValue')}</p>
                    <div className="example">{t('theory.content.types.improperExample')}</div>
                </div>

                <div className="type-card unit">
                    <h5>{t('theory.content.types.unitTitle')}</h5>
                    <div className="fraction-example">
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">n</span>
                        </span>
                    </div>
                    <p>{t('theory.content.types.unitDesc')}</p>
                    <p className="value">{t('theory.content.types.unitValue')}</p>
                    <div className="example">{t('theory.content.types.unitExample')}</div>
                </div>
            </div>

            <h4>{t('theory.content.types.mixedTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.types.mixedText" components={{ strong: <strong /> }} />
            </p>

            <div className="conversion-example">
                <div className="conversion-step">
                    <span className="fraction-display">
                        <span className="num">7</span>
                        <span className="line"></span>
                        <span className="den">4</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="result">{t('theory.content.types.conversionStep1')}</span>
                    <span className="arrow">=</span>
                    <span className="mixed-number">
                        <span className="whole">1</span>
                        <span className="fraction-part">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                    </span>
                </div>
            </div>

            <div className="tip-box">
                <Trans i18nKey="theory.content.types.tip" components={{ strong: <strong /> }} />
            </div>
        </div>
    )
}

function EquivalentesContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('theory.content.equivalent.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.equivalent.text1" components={{ strong: <strong /> }} />
            </p>

            <div className="equivalence-demo">
                <div className="fractions-row">
                    <div className="frac-visual">
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <div className="visual-bar">
                            <div className="filled" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                    <span className="equals">=</span>
                    <div className="frac-visual">
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <div className="visual-bar">
                            <div className="filled" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                    <span className="equals">=</span>
                    <div className="frac-visual">
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                        <div className="visual-bar">
                            <div className="filled" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.equivalent.propTitle')}</h4>
            <p>{t('theory.content.equivalent.propText')}</p>

            <div className="property-box">
                <div className="property-formula">
                    <span className="fraction-display">
                        <span className="num">a</span>
                        <span className="line"></span>
                        <span className="den">b</span>
                    </span>
                    <span className="equals">=</span>
                    <span className="fraction-display">
                        <span className="num">a × c</span>
                        <span className="line"></span>
                        <span className="den">b × c</span>
                    </span>
                    <span className="equals">=</span>
                    <span className="fraction-display">
                        <span className="num">a ÷ c</span>
                        <span className="line"></span>
                        <span className="den">b ÷ c</span>
                    </span>
                </div>
            </div>

            <h4>{t('theory.content.equivalent.exampleTitle')}</h4>
            <div className="example-steps">
                <div className="step">
                    <span className="step-num">1</span>
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="operation">× 2</span>
                    <span className="arrow">→</span>
                    <span className="fraction-display">
                        <span className="num">4</span>
                        <span className="line"></span>
                        <span className="den">6</span>
                    </span>
                </div>
                <div className="step">
                    <span className="step-num">2</span>
                    <span className="fraction-display">
                        <span className="num">4</span>
                        <span className="line"></span>
                        <span className="den">6</span>
                    </span>
                    <span className="operation">× 3</span>
                    <span className="arrow">→</span>
                    <span className="fraction-display">
                        <span className="num">12</span>
                        <span className="line"></span>
                        <span className="den">18</span>
                    </span>
                </div>
            </div>

            <div className="tip-box">
                <Trans i18nKey="theory.content.equivalent.tip" components={{ strong: <strong /> }} />
            </div>
        </div>
    )
}

function ComparacionContent() {
    const { t } = useTranslation()
    return (
        <div className="content-section">
            <h4>{t('theory.content.compare.sameDenomTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.compare.sameDenomText" components={{ strong: <strong /> }} />
            </p>

            <div className="comparison-example">
                <span className="fraction-display">
                    <span className="num">3</span>
                    <span className="line"></span>
                    <span className="den">5</span>
                </span>
                <span className="comparison-op">{'>'}</span>
                <span className="fraction-display">
                    <span className="num">2</span>
                    <span className="line"></span>
                    <span className="den">5</span>
                </span>
                <span className="explanation">{t('theory.content.compare.sameDenomExpl')}</span>
            </div>

            <h4>{t('theory.content.compare.diffDenomTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.compare.diffDenomText" components={{ strong: <strong /> }} />
            </p>

            <div className="method-box">
                <h5>{t('theory.content.compare.methodTitle')}</h5>
                <ol>
                    <li>{t('theory.content.compare.methodStep1')}</li>
                    <li>{t('theory.content.compare.methodStep2')}</li>
                    <li>{t('theory.content.compare.methodStep3')}</li>
                </ol>
            </div>

            <div className="example-comparison">
                <p><Trans i18nKey="theory.content.compare.exampleTitle" components={{ strong: <strong /> }} /></p>
                <div className="steps">
                    <div className="step">{t('theory.content.compare.exampleStep1')}</div>
                    <div className="step">
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">8</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                    </div>
                    <div className="step">
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">9</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                    </div>
                    <div className="step conclusion">
                        {t('theory.content.compare.exampleConclusion', { '<': '<' })}
                    </div>
                </div>
            </div>

            <div className="tip-box">
                <Trans i18nKey="theory.content.compare.tip" components={{ strong: <strong /> }} />
            </div>
        </div>
    )
}

function SumaRestaContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.addSubtract.sameDenomTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.addSubtract.sameDenomText" />
            </p>
            <div className="formula-box">
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">c</span>
                </span>
                <span>±</span>
                <span className="fraction-display">
                    <span className="num">b</span>
                    <span className="line"></span>
                    <span className="den">c</span>
                </span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">a ± b</span>
                    <span className="line"></span>
                    <span className="den">c</span>
                </span>
            </div>
            <div className="example-box">
                <div className="example">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span className="operation">+</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                </div>
            </div>

            <h4>{t('theory.content.addSubtract.diffDenomTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.addSubtract.diffDenomText" />
            </p>

            <div className="method-box">
                <h5>{t('theory.content.addSubtract.stepsTitle')}</h5>
                <ol>
                    <li>{t('theory.content.addSubtract.step1')}</li>
                    <li>{t('theory.content.addSubtract.step2')}</li>
                    <li>{t('theory.content.addSubtract.step3')}</li>
                    <li>{t('theory.content.addSubtract.step4')}</li>
                </ol>
            </div>

            <div className="solved-example">
                <p><strong>{t('theory.content.addSubtract.exampleTitle')}</strong></p>
                <div className="expression">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span className="operation">+</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                </div>
                <div className="steps">
                    <div className="step">
                        <span className="step-num">1</span>
                        <span>{t('theory.content.addSubtract.step1')}: </span>
                        <span className="result">6</span>
                    </div>
                    <div className="step">
                        <span className="step-num">2</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                        <span style={{ margin: '0 1rem' }}>,</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                    </div>
                    <div className="step">
                        <span className="step-num">3</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                        <span className="operation">+</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">5</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="tip-box warning">
                <p>
                    <Trans i18nKey="theory.content.addSubtract.warning" />
                </p>
            </div>
        </div>
    )
}

function MultiplicacionContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.multiply.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.multiply.text" />
            </p>

            <div className="formula-box highlight">
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span>×</span>
                <span className="fraction-display">
                    <span className="num">c</span>
                    <span className="line"></span>
                    <span className="den">d</span>
                </span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">a × c</span>
                    <span className="line"></span>
                    <span className="den">b × d</span>
                </span>
            </div>
            <div className="example-box">
                <div className="example">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="operation">×</span>
                    <span className="fraction-display">
                        <span className="num">4</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">2×4</span>
                        <span className="line"></span>
                        <span className="den">3×5</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">8</span>
                        <span className="line"></span>
                        <span className="den">15</span>
                    </span>
                </div>
            </div>

            <h4>{t('theory.content.multiply.simplificationTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.multiply.simplificationText" />
            </p>
            <div className="solved-example">
                <div className="expression">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span className="operation">×</span>
                    <span className="fraction-display">
                        <span className="num">10</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                </div>
                <div className="steps">
                    <div className="step">
                        <span className="step-num">1</span>
                        <span className="fraction-display">
                            <span className="num"><s>2</s></span>
                            <span className="line"></span>
                            <span className="den"><s>5</s></span>
                        </span>
                        <span className="operation">×</span>
                        <span className="fraction-display">
                            <span className="num"><s>10</s></span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                        <span className="arrow">→</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">1</span>
                        </span>
                        <span className="operation">×</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                    </div>
                    <div className="step">
                        <span className="step-num">2</span>
                        <span className="fraction-display">
                            <span className="num">2×2</span>
                            <span className="line"></span>
                            <span className="den">1×3</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">4</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.multiply.fractionOfNumberTitle')}</h4>
            <p>{t('theory.content.multiply.fractionOfNumberText')}</p>
            <div className="example-box">
                <div className="example">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span> de 15 = </span>
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="operation">×</span>
                    <span>15</span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">30</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="result">10</span>
                </div>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.multiply.tip" />
                </p>
            </div>
        </div>
    )
}

function DivisionContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.divide.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.divide.text" />
            </p>

            <div className="formula-box highlight">
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span>÷</span>
                <span className="fraction-display">
                    <span className="num">c</span>
                    <span className="line"></span>
                    <span className="den">d</span>
                </span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span>×</span>
                <span className="fraction-display">
                    <span className="num">d</span>
                    <span className="line"></span>
                    <span className="den">c</span>
                </span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">a × d</span>
                    <span className="line"></span>
                    <span className="den">b × c</span>
                </span>
            </div>

            <h4>{t('theory.content.divide.inverseTitle')}</h4>
            <p>{t('theory.content.divide.inverseText')}</p>
            <div className="example-box">
                <div className="example">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="arrow">→</span>
                    <span className="fraction-display highlight">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                </div>
            </div>

            <div className="solved-example">
                <p><strong>{t('theory.content.divide.exampleTitle')}</strong></p>
                <div className="expression">
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="operation">÷</span>
                    <span className="fraction-display">
                        <span className="num">4</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                </div>
                <div className="steps">
                    <div className="step">
                        <span className="step-num">1</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                        <span className="operation">×</span>
                        <span className="fraction-display highlight">
                            <span className="num">5</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                    </div>
                    <div className="step">
                        <span className="step-num">2</span>
                        <span className="fraction-display">
                            <span className="num">10</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">5</span>
                            <span className="line"></span>
                            <span className="den">6</span>
                        </span>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.divide.integerTitle')}</h4>
            <p>{t('theory.content.divide.integerText')}</p>
            <div className="solved-example">
                <div className="expression">
                    <span className="fraction-display">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span className="operation">÷</span>
                    <span>2</span>
                </div>
                <div className="steps">
                    <div className="step">
                        <span className="step-num">1</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">5</span>
                        </span>
                        <span className="operation">÷</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">1</span>
                        </span>
                    </div>
                    <div className="step">
                        <span className="step-num">2</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">5</span>
                        </span>
                        <span className="operation">×</span>
                        <span className="fraction-display highlight">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <span className="arrow">=</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">10</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.divide.tip" />
                </p>
            </div>
        </div>
    )
}

function PotenciasContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.powers.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.powers.text" />
            </p>

            <div className="formula-box highlight">
                <span className="paren">(</span>
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span className="paren">)</span>
                <span className="power">n</span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">aⁿ</span>
                    <span className="line"></span>
                    <span className="den">bⁿ</span>
                </span>
            </div>
            <div className="example-box">
                <p><strong>{t('theory.content.powers.exampleTitle')}</strong></p>
                <div className="example">
                    <span className="paren">(</span>
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="paren">)</span>
                    <span className="power">²</span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">2²</span>
                        <span className="line"></span>
                        <span className="den">3²</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">4</span>
                        <span className="line"></span>
                        <span className="den">9</span>
                    </span>
                </div>
                <div className="example" style={{ marginTop: '1rem' }}>
                    <span className="paren">(</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span className="paren">)</span>
                    <span className="power">³</span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">1³</span>
                        <span className="line"></span>
                        <span className="den">2³</span>
                    </span>
                    <span className="arrow">=</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">8</span>
                    </span>
                </div>
            </div>

            <h4>{t('theory.content.powers.negativeTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.powers.negativeText" components={{ strong: <strong /> }} />
            </p>

            <div className="formula-box">
                <span className="paren">(</span>
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span className="paren">)</span>
                <span className="power">-n</span>
                <span>=</span>
                <span className="paren">(</span>
                <span className="fraction-display">
                    <span className="num">b</span>
                    <span className="line"></span>
                    <span className="den">a</span>
                </span>
                <span className="paren">)</span>
                <span className="power">n</span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">bⁿ</span>
                    <span className="line"></span>
                    <span className="den">aⁿ</span>
                </span>
            </div>

            <div className="example-box">
                <div className="example">
                    <span className="paren">(</span>
                    <span className="fraction-display">
                        <span className="num">2</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span className="paren">)</span>
                    <span className="power">-2</span>
                    <span>=</span>
                    <span className="paren">(</span>
                    <span className="fraction-display">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span className="paren">)</span>
                    <span className="power">2</span>
                    <span>=</span>
                    <span className="fraction-display">
                        <span className="num">9</span>
                        <span className="line"></span>
                        <span className="den">4</span>
                    </span>
                </div>
            </div>

            <h4>{t('theory.content.powers.rulesTitle')}</h4>
            <div className="rules-grid">
                <div className="rule-card">
                    <h5>{t('theory.content.powers.sameBaseTitle')}</h5>
                    <p className="formula">aⁿ × aᵐ = aⁿ⁺ᵐ</p>
                    <p className="formula">aⁿ ÷ aᵐ = aⁿ⁻ᵐ</p>
                </div>
                <div className="rule-card">
                    <h5>{t('theory.content.powers.sameExpTitle')}</h5>
                    <p className="formula">aⁿ × bⁿ = (a×b)ⁿ</p>
                    <p className="formula">aⁿ ÷ bⁿ = (a÷b)ⁿ</p>
                </div>
                <div className="rule-card">
                    <h5>{t('theory.content.powers.powerOfPowerTitle')}</h5>
                    <p className="formula">(aⁿ)ᵐ = aⁿ×ᵐ</p>
                </div>
            </div>

            <div className="tip-box">
                <Trans i18nKey="theory.content.powers.tip" components={{ strong: <strong /> }} />
            </div>
        </div>
    )
}

function OperacionesContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.combined.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.combined.text" />
            </p>

            <div className="priority-list">
                <div className="priority-item">
                    <span className="priority-num">1</span>
                    <span className="priority-text">{t('theory.content.combined.priority1')}</span>
                </div>
                <div className="priority-item">
                    <span className="priority-num">2</span>
                    <span className="priority-text">{t('theory.content.combined.priority2')}</span>
                </div>
                <div className="priority-item">
                    <span className="priority-num">3</span>
                    <span className="priority-text">{t('theory.content.combined.priority3')}</span>
                </div>
                <div className="priority-item">
                    <span className="priority-num">4</span>
                    <span className="priority-text">{t('theory.content.combined.priority4')}</span>
                </div>
            </div>

            <h4>{t('theory.content.combined.exampleTitle')}</h4>
            <div className="solved-example">
                <div className="expression">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span>+</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span>×</span>
                    <span className="paren">(</span>
                    <span className="fraction-display">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">4</span>
                    </span>
                    <span>-</span>
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span className="paren">)</span>
                </div>

                <div className="steps">
                    <div className="step">
                        <span className="step-num">1</span>
                        <span>{t('theory.content.combined.step1')} </span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>-</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>-</span>
                        <span className="fraction-display">
                            <span className="num">2</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                    </div>

                    <div className="step">
                        <span className="step-num">2</span>
                        <span>{t('theory.content.combined.step2')} </span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">3</span>
                        </span>
                        <span>×</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                    </div>

                    <div className="step">
                        <span className="step-num">3</span>
                        <span>{t('theory.content.combined.step3')} </span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <span>+</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">6</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                        <span>+</span>
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">7</span>
                            <span className="line"></span>
                            <span className="den">12</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="warning-box">
                <p>
                    <Trans i18nKey="theory.content.combined.warning" />
                </p>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.combined.tip" />
                </p>
            </div>
        </div>
    )
}

function DecimalesContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.decimals.fracToDecTitle')}</h4>
            <p>
                <Trans i18nKey="theory.content.decimals.fracToDecText" />
            </p>

            <div className="type-cards">
                <div className="type-card">
                    <h5>{t('theory.content.decimals.methodDirect')}</h5>
                    <div className="fraction-example">
                        <span className="fraction-display">
                            <span className="num">3</span>
                            <span className="line"></span>
                            <span className="den">4</span>
                        </span>
                        <span>= 3 ÷ 4 = 0.75</span>
                    </div>
                </div>
                <div className="type-card">
                    <h5>{t('theory.content.decimals.methodPower10')}</h5>
                    <div className="fraction-example">
                        <span className="fraction-display">
                            <span className="num">1</span>
                            <span className="line"></span>
                            <span className="den">2</span>
                        </span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">5</span>
                            <span className="line"></span>
                            <span className="den">10</span>
                        </span>
                        <span>= 0.5</span>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.decimals.typesTitle')}</h4>
            <div className="decimal-types">
                <div className="type-item">
                    <h5>{t('theory.content.decimals.typeExact')}</h5>
                    <p>{t('theory.content.decimals.typeExactDesc')}</p>
                    <p className="condition">
                        <strong>{t('theory.content.decimals.typeExactCond')}</strong>
                    </p>
                    <div className="example-box">
                        <div className="example">
                            <span className="fraction-display">
                                <span className="num">1</span>
                                <span className="line"></span>
                                <span className="den">2</span>
                            </span>
                            <span>=</span>
                            <span className="result">0.5</span>
                        </div>
                    </div>
                </div>
                <div className="type-item">
                    <h5>{t('theory.content.decimals.typePure')}</h5>
                    <p>{t('theory.content.decimals.typePureDesc')}</p>
                    <p className="condition">
                        <strong>{t('theory.content.decimals.typePureCond')}</strong>
                    </p>
                    <div className="example-box">
                        <div className="example">
                            <span className="fraction-display">
                                <span className="num">1</span>
                                <span className="line"></span>
                                <span className="den">3</span>
                            </span>
                            <span>=</span>
                            <span className="result">0.333...</span>
                        </div>
                    </div>
                </div>
                <div className="type-item">
                    <h5>{t('theory.content.decimals.typeMixed')}</h5>
                    <p>{t('theory.content.decimals.typeMixedDesc')}</p>
                    <p className="condition">
                        <strong>{t('theory.content.decimals.typeMixedCond')}</strong>
                    </p>
                    <div className="example-box">
                        <div className="example">
                            <span className="fraction-display">
                                <span className="num">1</span>
                                <span className="line"></span>
                                <span className="den">6</span>
                            </span>
                            <span>=</span>
                            <span className="result">0.166...</span>
                        </div>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.decimals.decToFracTitle')}</h4>
            <div className="meanings-grid">
                <div className="meaning-card">
                    <h5>{t('theory.content.decimals.stepExact')}</h5>
                    <ol>
                        <li>{t('theory.content.decimals.stepExact1')}</li>
                        <li>{t('theory.content.decimals.stepExact2')}</li>
                        <li>{t('theory.content.decimals.commonStep3')}</li>
                    </ol>
                    <div className="solved-example">
                        <div className="expression">
                            <span>0.75</span>
                            <span className="operation">→</span>
                            <span className="fraction-display highlight">
                                <span className="num">75</span>
                                <span className="line"></span>
                                <span className="den">100</span>
                            </span>
                            <span className="operation">=</span>
                            <span className="fraction-display">
                                <span className="num">3</span>
                                <span className="line"></span>
                                <span className="den">4</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="meaning-card">
                    <h5>{t('theory.content.decimals.stepPure')}</h5>
                    <ol>
                        <li>{t('theory.content.decimals.stepPure1')}</li>
                        <li>{t('theory.content.decimals.stepPure2')}</li>
                        <li>{t('theory.content.decimals.commonStep3')}</li>
                    </ol>
                    <div className="solved-example">
                        <div className="expression">
                            <span>0.333...</span>
                            <span className="operation">→</span>
                            <span className="fraction-display highlight">
                                <span className="num">3</span>
                                <span className="line"></span>
                                <span className="den">9</span>
                            </span>
                            <span className="operation">=</span>
                            <span className="fraction-display">
                                <span className="num">1</span>
                                <span className="line"></span>
                                <span className="den">3</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="meaning-card">
                    <h5>{t('theory.content.decimals.stepMixed')}</h5>
                    <ol>
                        <li>{t('theory.content.decimals.stepMixed1')}</li>
                        <li>{t('theory.content.decimals.stepMixed2')}</li>
                        <li>{t('theory.content.decimals.commonStep3')}</li>
                    </ol>
                    <div className="solved-example">
                        <div className="expression">
                            <span>1.166...</span>
                            <span className="operation">→</span>
                            <span className="fraction-display highlight">
                                <span className="num">116 - 11</span>
                                <span className="line"></span>
                                <span className="den">90</span>
                            </span>
                            <span className="operation">=</span>
                            <span className="fraction-display">
                                <span className="num">105</span>
                                <span className="line"></span>
                                <span className="den">90</span>
                            </span>
                            <span className="operation">=</span>
                            <span className="fraction-display">
                                <span className="num">7</span>
                                <span className="line"></span>
                                <span className="den">6</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.decimals.tip" />
                </p>
            </div>
        </div>
    )
}

function ProporcionalidadContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.proportionality.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.proportionality.text" />
            </p>

            <div className="proportion-box">
                <span className="fraction-display">
                    <span className="num">a</span>
                    <span className="line"></span>
                    <span className="den">b</span>
                </span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">c</span>
                    <span className="line"></span>
                    <span className="den">d</span>
                </span>
                <span>→ a × d = b × c</span>
            </div>

            <h4>{t('theory.content.proportionality.magnitudesTitle')}</h4>
            <div className="magnitude-types">
                <div className="magnitude-card direct">
                    <h5>{t('theory.content.proportionality.directTitle')}</h5>
                    <p>{t('theory.content.proportionality.directText')}</p>
                    <div className="formula">
                        a/b = c/d = k ({t('theory.content.proportionality.constant')})
                    </div>
                    <div className="examples">
                        <p>• {t('theory.content.proportionality.directEx1')}</p>
                        <p>• {t('theory.content.proportionality.directEx2')}</p>
                        <p>• {t('theory.content.proportionality.directEx3')}</p>
                    </div>
                </div>

                <div className="magnitude-card inverse">
                    <h5>{t('theory.content.proportionality.inverseTitle')}</h5>
                    <p>{t('theory.content.proportionality.inverseText')}</p>
                    <div className="formula">
                        a × b = c × d = k ({t('theory.content.proportionality.constant')})
                    </div>
                    <div className="examples">
                        <p>• {t('theory.content.proportionality.inverseEx1')}</p>
                        <p>• {t('theory.content.proportionality.inverseEx2')}</p>
                        <p>• {t('theory.content.proportionality.inverseEx3')}</p>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.proportionality.ruleOfThreeTitle')}</h4>
            <p>{t('theory.content.proportionality.ruleOfThreeText')}</p>

            <div className="rule-three-example">
                <p><Trans i18nKey="theory.content.proportionality.problem" components={{ strong: <strong /> }} /></p>

                <div className="setup">
                    <div className="proportion">
                        <span>3 kg</span>
                        <span>→</span>
                        <span>6€</span>
                    </div>
                    <div className="proportion">
                        <span>5 kg</span>
                        <span>→</span>
                        <span>x€</span>
                    </div>
                </div>

                <div className="solution">
                    <span>x =</span>
                    <span className="fraction-display">
                        <span className="num">5 × 6</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span>=</span>
                    <span className="fraction-display">
                        <span className="num">30</span>
                        <span className="line"></span>
                        <span className="den">3</span>
                    </span>
                    <span>= 10€</span>
                </div>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.proportionality.tip" />
                </p>
            </div>
        </div>
    )
}

function PorcentajesContent() {
    const { t } = useTranslation();
    return (
        <div className="content-section">
            <h4>{t('theory.content.percentages.title')}</h4>
            <p>
                <Trans i18nKey="theory.content.percentages.text" />
            </p>

            <div className="percent-fraction">
                <span className="percent">n%</span>
                <span>=</span>
                <span className="fraction-display">
                    <span className="num">n</span>
                    <span className="line"></span>
                    <span className="den">100</span>
                </span>
            </div>

            <h4>{t('theory.content.percentages.calcTitle')}</h4>
            <p>{t('theory.content.percentages.calcText')}</p>

            <div className="calculation-examples">
                <div className="example-box">
                    <p><Trans i18nKey="theory.content.percentages.ex1" components={{ strong: <strong /> }} /></p>
                    <div className="example">
                        <span>20%</span>
                        <span className="operation">×</span>
                        <span>50</span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">20</span>
                            <span className="line"></span>
                            <span className="den">100</span>
                        </span>
                        <span className="operation">×</span>
                        <span>50</span>
                        <span>=</span>
                        <span className="fraction-display">
                            <span className="num">1000</span>
                            <span className="line"></span>
                            <span className="den">100</span>
                        </span>
                        <span>=</span>
                        <span className="result">10</span>
                    </div>
                </div>

                <div className="example-box">
                    <p><Trans i18nKey="theory.content.percentages.ex2" components={{ strong: <strong /> }} /></p>
                    <div className="example">
                        <span>15%</span>
                        <span className="operation">×</span>
                        <span>80</span>
                        <span>=</span>
                        <span className="highlight">0.15</span>
                        <span className="operation">×</span>
                        <span>80</span>
                        <span>=</span>
                        <span className="result">12</span>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.percentages.increaseDecreaseTitle')}</h4>
            <div className="increase-decrease">
                <div className="operation-card increase">
                    <h5>{t('theory.content.percentages.increaseTitle')}</h5>
                    <p>{t('theory.content.percentages.increaseFormula')}</p>
                    <div className="solved-example">
                        <p>{t('theory.content.percentages.increaseEx')}</p>
                        <div className="expression">
                            <span>50</span>
                            <span className="operation">×</span>
                            <span className="highlight">1.20</span>
                            <span>=</span>
                            <span className="result">60</span>
                        </div>
                    </div>
                </div>

                <div className="operation-card decrease">
                    <h5>{t('theory.content.percentages.decreaseTitle')}</h5>
                    <p>{t('theory.content.percentages.decreaseFormula')}</p>
                    <div className="solved-example">
                        <p>{t('theory.content.percentages.decreaseEx')}</p>
                        <div className="expression">
                            <span>50</span>
                            <span className="operation">×</span>
                            <span className="highlight">0.80</span>
                            <span>=</span>
                            <span className="result">40</span>
                        </div>
                    </div>
                </div>
            </div>

            <h4>{t('theory.content.percentages.equivTitle')}</h4>
            <div className="equivalents-table">
                <div className="table-row header">
                    <span>{t('theory.content.percentages.headerFraction')}</span>
                    <span>{t('theory.content.percentages.headerDecimal')}</span>
                    <span>{t('theory.content.percentages.headerPercent')}</span>
                </div>
                <div className="table-row">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">2</span>
                    </span>
                    <span>0.5</span>
                    <span>50%</span>
                </div>
                <div className="table-row">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">4</span>
                    </span>
                    <span>0.25</span>
                    <span>25%</span>
                </div>
                <div className="table-row">
                    <span className="fraction-display">
                        <span className="num">3</span>
                        <span className="line"></span>
                        <span className="den">4</span>
                    </span>
                    <span>0.75</span>
                    <span>75%</span>
                </div>
                <div className="table-row">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">5</span>
                    </span>
                    <span>0.2</span>
                    <span>20%</span>
                </div>
                <div className="table-row">
                    <span className="fraction-display">
                        <span className="num">1</span>
                        <span className="line"></span>
                        <span className="den">10</span>
                    </span>
                    <span>0.1</span>
                    <span>10%</span>
                </div>
            </div>

            <div className="tip-box">
                <p>
                    <Trans i18nKey="theory.content.percentages.tip" />
                </p>
            </div>
        </div>
    )
}
