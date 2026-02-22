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
            id: 'operaciones',
            title: t('theory.sections.combined'),
            icon: '🧮',
            color: '#6366f1',
            content: <OperacionesContent />
        },
    ]

    return (
        <div className="theory-page">
            <div className="container">
                <header className="theory-header">
                    <h1>{t('theory.title')}</h1>
                    <p className="theory-subtitle">
                        {t('theory.subtitle_dbh1')}
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
                    <span className="priority-text">{t('theory.content.combined.priority3')}</span>
                </div>
                <div className="priority-item">
                    <span className="priority-num">3</span>
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
