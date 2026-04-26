import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeAlgebraLang, pickIcon, pickText, type AlgebraLang, type LocalizedText } from '../content'
import {
    factorExamples,
    factorCards,
    languageCards,
    languageRows,
    languageTranslationBlock,
    monomialIntroCards,
    monomialRelationCards,
    monomialRows,
    notableCards,
    notableGeoBlock,
    notableMentalBlock,
    opMonomialRows,
    opMonomialCards,
    opPolynomialCards,
    opPolynomialDivisionBlock,
    polynomialCards,
    theorySectionTitles,
    theoryTabs,
    theoryUiLabels,
    type NotableCardData,
    type TableRow,
    type TheoryCardData,
    type TheoryTabId
} from './theoryData'
import './TheoryPage.css'

function renderLocalizedText(lang: AlgebraLang, text: LocalizedText | string) {
    return typeof text === 'string' ? text : pickText(lang, text)
}

export function TheoryPage() {
    const { i18n } = useTranslation()
    const lang = normalizeAlgebraLang(i18n.language)
    const [activeTab, setActiveTab] = useState<TheoryTabId>('lenguaje')
    const icon = (value: string) => pickIcon(value)
    const ui = theoryUiLabels

    const renderTable = (headers: LocalizedText[], rows: TableRow[]) => (
        <div className="algebra-table-wrap">
            <table className="algebra-mono-table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`${renderLocalizedText(lang, header)}-${index}`}>{pickText(lang, header)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {row.cells.map((cell, cellIndex) => (
                                <td key={`row-${rowIndex}-cell-${cellIndex}`}>
                                    <MathText text={pickText(lang, cell)} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const renderTheoryCard = (card: TheoryCardData) => (
        <article key={pickText(lang, card.title)} className="algebra-tcard">
            <div className={`algebra-tcard-icon ${card.tone}`}>{icon(card.icon)}</div>
            <h3>{pickText(lang, card.title)}</h3>
            {card.body && <p><MathText text={pickText(lang, card.body)} /></p>}

            {card.formula && (
                <div className={`algebra-formula-box ${card.formula.tone} ${card.formula.large ? 'large' : ''}`}>
                    {card.formula.label && <div className="algebra-formula-label">{pickText(lang, card.formula.label)}</div>}
                    <MathText text={pickText(lang, card.formula.text)} />
                </div>
            )}

            {card.mutedLine && (
                <p className="algebra-muted-line">
                    <MathText text={pickText(lang, card.mutedLine)} />
                </p>
            )}

            {card.infoCells && (
                <div className="algebra-info-grid">
                    {card.infoCells.map((cell, index) => (
                        <div key={`${pickText(lang, cell.label)}-${index}`} className="algebra-info-cell">
                            <div className={['val', cell.tone].filter(Boolean).join(' ')}>
                                {cell.math ? <MathText text={cell.value} /> : cell.value}
                            </div>
                            <div className="lbl">{pickText(lang, cell.label)}</div>
                        </div>
                    ))}
                </div>
            )}

            {card.example && (
                <div className={`algebra-example-box ${card.example.tone}`}>
                    <div className="algebra-example-label">{pickText(lang, card.example.label)}</div>
                    {card.example.text && <MathText text={pickText(lang, card.example.text)} />}
                    {card.example.lines?.map((line, index) => (
                        <MathText key={`${pickText(lang, card.example?.label ?? ui.example)}-${index}`} text={pickText(lang, line)} />
                    ))}
                </div>
            )}

            {card.examples?.map((example, index) => (
                <div key={`${pickText(lang, example.label)}-${index}`} className={`algebra-example-box ${example.tone}`}>
                    <div className="algebra-example-label">{pickText(lang, example.label)}</div>
                    {example.text && <MathText text={pickText(lang, example.text)} />}
                    {example.lines?.map((line, lineIndex) => (
                        <MathText key={`${pickText(lang, example.label)}-${lineIndex}`} text={pickText(lang, line)} />
                    ))}
                </div>
            ))}

            {card.steps && (
                <ol className="algebra-steps-list">
                    {card.steps.map((step, index) => (
                        <li key={`${pickText(lang, card.title)}-step-${index}`}>
                            <MathText text={pickText(lang, step)} />
                        </li>
                    ))}
                </ol>
            )}
        </article>
    )

    const renderNotableCard = (card: NotableCardData) => (
        <article key={pickText(lang, card.title)} className={`algebra-notable-card ${card.tone}`}>
            <h4>{pickText(lang, card.title)}</h4>
            <MathText text={card.formula} />
            <div className={`algebra-example-box ${card.tone}`}>
                <div className="algebra-example-label">{pickText(lang, ui.example)}</div>
                <MathText text={card.example} />
            </div>
        </article>
    )

    return (
        <div className="algebra-theory-page" dir={lang === 'ar' ? 'rtl' : 'ltr'} data-lang={lang}>
            <div className="container">
                <header className="algebra-theory-header">
                    <h1>{pickText(lang, ui.headerTitle)}</h1>
                    <p>{pickText(lang, ui.headerSubtitle)}</p>
                </header>

                <div className="algebra-tab-nav" role="tablist" aria-label="Theory tabs">
                    {theoryTabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`algebra-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{icon(tab.icon)}</span>
                            <span>{pickText(lang, tab.label)}</span>
                        </button>
                    ))}
                </div>

                {activeTab === 'lenguaje' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid">
                            {languageCards.map(renderTheoryCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, languageTranslationBlock.title)}</h3>
                            <p className="algebra-wide-desc">{pickText(lang, languageTranslationBlock.description)}</p>
                            {renderTable([ui.statement, ui.expression], languageRows)}
                        </section>
                    </section>
                )}

                {activeTab === 'monomios' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid">
                            {monomialIntroCards.map(renderTheoryCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, theorySectionTitles.completeExamplesTable)}</h3>
                            {renderTable([ui.monomial, ui.coefficient, ui.literalPart, ui.degree], monomialRows)}
                        </section>

                        <div className="algebra-content-grid">
                            {monomialRelationCards.map(renderTheoryCard)}
                        </div>
                    </section>
                )}

                {activeTab === 'opmonomios' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid three">
                            {opMonomialCards.map(renderTheoryCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, theorySectionTitles.monomialOperationsSummary)}</h3>
                            {renderTable([ui.operation, ui.condition, ui.coefficients, ui.exponents, ui.example], opMonomialRows)}
                        </section>
                    </section>
                )}

                {activeTab === 'polinomios' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid">
                            {polynomialCards.map(renderTheoryCard)}
                        </div>
                    </section>
                )}

                {activeTab === 'oppolinomios' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid">
                            {opPolynomialCards.map(renderTheoryCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, opPolynomialDivisionBlock.title)}</h3>
                            <p className="algebra-wide-desc">{pickText(lang, opPolynomialDivisionBlock.description)}</p>
                            <div className="algebra-formula-box purple">
                                <div className="algebra-formula-label">{pickText(lang, ui.example)}</div>
                                <MathText text={opPolynomialDivisionBlock.formula} />
                            </div>
                        </section>
                    </section>
                )}

                {activeTab === 'notables' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-notable-grid">
                            {notableCards.map(renderNotableCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, notableGeoBlock.title)}</h3>
                            <p className="algebra-wide-desc"><MathText text={pickText(lang, notableGeoBlock.description)} /></p>
                            <div className="algebra-geo-demo">
                                <div className="algebra-geo-svg-wrap">
                                    <svg viewBox="0 0 200 200" className="algebra-geo-svg" aria-hidden="true">
                                        <rect x="10" y="10" width="120" height="120" className="geo-a2" rx="4" />
                                        <rect x="130" y="10" width="60" height="120" className="geo-ab" rx="4" />
                                        <rect x="10" y="130" width="120" height="60" className="geo-ab" rx="4" />
                                        <rect x="130" y="130" width="60" height="60" className="geo-b2" rx="4" />
                                        <text x="70" y="75" textAnchor="middle" className="geo-text a2">a²</text>
                                        <text x="160" y="75" textAnchor="middle" className="geo-text ab">ab</text>
                                        <text x="70" y="165" textAnchor="middle" className="geo-text ab">ab</text>
                                        <text x="160" y="165" textAnchor="middle" className="geo-text b2">b²</text>
                                    </svg>
                                </div>
                                <div className="algebra-geo-copy">
                                    <MathText text={notableGeoBlock.formula} />
                                    <div className="algebra-example-box purple">
                                        <div className="algebra-example-label">{pickText(lang, ui.memorize)}</div>
                                        <MathText text={pickText(lang, notableGeoBlock.memorize)} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, notableMentalBlock.title)}</h3>
                            <p className="algebra-wide-desc">{pickText(lang, notableMentalBlock.description)}</p>
                            <div className="algebra-formula-box purple">
                                <div className="algebra-formula-label">{pickText(lang, notableMentalBlock.label)}</div>
                                <MathText text={notableMentalBlock.formula} />
                            </div>
                            <div className="algebra-formula-box blue">
                                <div className="algebra-formula-label">{pickText(lang, ui.anotherExample)}</div>
                                <MathText text={pickText(lang, notableMentalBlock.anotherExample)} />
                            </div>
                        </section>
                    </section>
                )}

                {activeTab === 'factor' && (
                    <section className="algebra-tab-panel">
                        <div className="algebra-content-grid">
                            {factorCards.map(renderTheoryCard)}
                        </div>

                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, theorySectionTitles.factorStepExamples)}</h3>
                            <div className="algebra-content-grid">
                                {factorExamples.map((example, index) => (
                                    <article key={`factor-example-${index}`} className="algebra-tcard simple">
                                        <h3>{pickText(lang, example.title)}</h3>
                                        <div className="algebra-factor-lines">
                                            {example.lines.map((line, lineIndex) => (
                                                <MathText key={`factor-line-${index}-${lineIndex}`} text={pickText(lang, line)} />
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </section>
                )}
            </div>
        </div>
    )
}
