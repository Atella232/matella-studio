import { useTranslation } from 'react-i18next'
import './AccessibilityPage.css'

export function AccessibilityPage() {
    const { t } = useTranslation()

    return (
        <div className="accessibility-page">
            <div className="container">
                <header className="page-header">
                    <h1>{t('accessibility.title')}</h1>
                    <p className="page-description">{t('accessibility.description')}</p>
                </header>

                <section className="dua-section glass">
                    <h2>{t('accessibility.dua.title')}</h2>
                    <p>{t('accessibility.dua.description')}</p>

                    <div className="dua-principles">
                        <article className="principle-card">
                            <div className="principle-icon">👁️</div>
                            <h3>{t('accessibility.dua.perception.title')}</h3>
                            <ul>
                                {(t('accessibility.dua.perception.items', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="principle-card">
                            <div className="principle-icon">✍️</div>
                            <h3>{t('accessibility.dua.action.title')}</h3>
                            <ul>
                                {(t('accessibility.dua.action.items', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="principle-card">
                            <div className="principle-icon">🎯</div>
                            <h3>{t('accessibility.dua.engagement.title')}</h3>
                            <ul>
                                {(t('accessibility.dua.engagement.items', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="wcag-section glass">
                    <h2>{t('accessibility.wcag.title')}</h2>
                    <p>{t('accessibility.wcag.description')}</p>

                    <div className="wcag-checklist">
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>{t('accessibility.wcag.perceptible')}</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>{t('accessibility.wcag.operable')}</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>{t('accessibility.wcag.understandable')}</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>{t('accessibility.wcag.robust')}</span>
                        </div>
                    </div>
                </section>

                <section className="multilingual-section glass">
                    <h2>{t('accessibility.multilingual.title')}</h2>
                    <p>{t('accessibility.multilingual.description')}</p>
                    <ul className="feature-list">
                        <li>{t('accessibility.multilingual.basque')}</li>
                        <li>{t('accessibility.multilingual.spanish')}</li>
                        <li>{t('accessibility.multilingual.arabic')}</li>
                        <li>{t('accessibility.multilingual.glossary')}</li>
                        <li>{t('accessibility.multilingual.cultural')}</li>
                    </ul>
                </section>

                <section className="keyboard-section glass">
                    <h2>{t('accessibility.keyboard.title')}</h2>
                    <table className="keyboard-table">
                        <thead>
                            <tr>
                                <th>{t('accessibility.keyboard.shortcut')}</th>
                                <th>{t('accessibility.keyboard.function')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><kbd>Tab</kbd></td>
                                <td>{t('accessibility.keyboard.tab')}</td>
                            </tr>
                            <tr>
                                <td><kbd>Shift</kbd> + <kbd>Tab</kbd></td>
                                <td>{t('accessibility.keyboard.shiftTab')}</td>
                            </tr>
                            <tr>
                                <td><kbd>Enter</kbd> / <kbd>Espacio</kbd></td>
                                <td>{t('accessibility.keyboard.enter')}</td>
                            </tr>
                            <tr>
                                <td><kbd>Escape</kbd></td>
                                <td>{t('accessibility.keyboard.escape')}</td>
                            </tr>
                            <tr>
                                <td><kbd>←</kbd> <kbd>→</kbd></td>
                                <td>{t('accessibility.keyboard.arrows')}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="contact-section glass">
                    <h2>{t('accessibility.help.title')}</h2>
                    <p>{t('accessibility.help.description')}</p>
                </section>
            </div>
        </div>
    )
}
