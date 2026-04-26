import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeEkuazioakLang, pickText, type LocalizedText } from '../content'
import { theoryLabels, theorySections, theoryTabs, type TableRow, type TheoryCard, type TheoryTabId } from './theoryData'
import '../../dbh2-algebra/TheoryPage/TheoryPage.css'

function renderTable(lang: ReturnType<typeof normalizeEkuazioakLang>, headers: LocalizedText[], rows: TableRow[]) {
    return (
        <div className="algebra-table-wrap">
            <table className="algebra-mono-table">
                <thead>
                    <tr>{headers.map((header) => <th key={pickText(lang, header)}>{pickText(lang, header)}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {row.cells.map((cell, cellIndex) => (
                                <td key={`cell-${rowIndex}-${cellIndex}`}><MathText text={pickText(lang, cell)} /></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function TheoryPage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const [activeTab, setActiveTab] = useState<TheoryTabId>('esanahia')
    const section = theorySections[activeTab]

    const renderCard = (card: TheoryCard) => (
        <article key={pickText(lang, card.title)} className="algebra-tcard">
            <div className={`algebra-tcard-icon ${card.tone}`}>{card.icon}</div>
            <h3>{pickText(lang, card.title)}</h3>
            <p><MathText text={pickText(lang, card.body)} /></p>
            {card.formula && (
                <div className={`algebra-formula-box ${card.tone}`}>
                    <MathText text={pickText(lang, card.formula)} />
                </div>
            )}
            {card.steps && (
                <ol className="algebra-steps-list">
                    {card.steps.map((step, index) => (
                        <li key={`step-${index}`}><MathText text={pickText(lang, step)} /></li>
                    ))}
                </ol>
            )}
            {card.examples && (
                <div className={`algebra-example-box ${card.tone}`}>
                    <div className="algebra-example-label">{pickText(lang, theoryLabels.examples)}</div>
                    {card.examples.map((example, index) => (
                        <MathText key={`example-${index}`} text={pickText(lang, example)} />
                    ))}
                </div>
            )}
            {card.note && (
                <div className="algebra-example-box blue">
                    <div className="algebra-example-label">{pickText(lang, theoryLabels.note)}</div>
                    <MathText text={pickText(lang, card.note)} />
                </div>
            )}
        </article>
    )

    return (
        <div className="algebra-theory-page" dir={lang === 'ar' ? 'rtl' : 'ltr'} data-lang={lang}>
            <div className="container">
                <header className="algebra-theory-header">
                    <h1>{pickText(lang, theoryLabels.title)}</h1>
                    <p>{pickText(lang, theoryLabels.subtitle)}</p>
                </header>

                <div className="algebra-tab-nav" role="tablist" aria-label="Ekuazioak theory tabs">
                    {theoryTabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`algebra-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{tab.icon}</span>
                            <span>{pickText(lang, tab.label)}</span>
                        </button>
                    ))}
                </div>

                <section className="algebra-tab-panel">
                    <div className="algebra-content-grid">
                        {section.cards.map(renderCard)}
                    </div>
                    {section.table && (
                        <section className="algebra-theory-wide">
                            <h3>{pickText(lang, section.table.title)}</h3>
                            {renderTable(lang, section.table.headers, section.table.rows)}
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}
