import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
    const { t } = useTranslation()

    return (
        <div className="home-page zenbaki-osoak-home">
            <section className="hero">
                <div className="container">
                    <h1>{t('zenbakiOsoak.home.title')}</h1>
                    <h2 className="hero-subtitle">{t('zenbakiOsoak.home.subtitle')}</h2>
                    <p className="hero-description">{t('zenbakiOsoak.home.description')}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/numeros-enteros/teoria" className="btn btn-primary">
                            📚 {t('zenbakiOsoak.home.startTheory')}
                        </Link>
                        <Link to="/matematika/dbh1/numeros-enteros/laboratorio" className="btn btn-primary">
                            🔬 {t('zenbakiOsoak.home.startLab')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{t('zenbakiOsoak.home.features.title')}</h2>
                    <div className="features-grid">
                        <article className="feature-card glass highlight-card">
                            <div className="feature-icon">🔬</div>
                            <h3>{t('zenbakiOsoak.home.features.lab.title')}</h3>
                            <p>{t('zenbakiOsoak.home.features.lab.desc')}</p>
                            <Link to="/matematika/dbh1/numeros-enteros/laboratorio" className="feature-link">
                                {t('zenbakiOsoak.home.features.lab.link')} →
                            </Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">❄️</div>
                            <h3>{t('zenbakiOsoak.home.features.f1.title')}</h3>
                            <p>{t('zenbakiOsoak.home.features.f1.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">📏</div>
                            <h3>{t('zenbakiOsoak.home.features.f2.title')}</h3>
                            <p>{t('zenbakiOsoak.home.features.f2.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">➕</div>
                            <h3>{t('zenbakiOsoak.home.features.f3.title')}</h3>
                            <p>{t('zenbakiOsoak.home.features.f3.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">✖️</div>
                            <h3>{t('zenbakiOsoak.home.features.f4.title')}</h3>
                            <p>{t('zenbakiOsoak.home.features.f4.desc')}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="curriculum">
                <div className="container">
                    <h2>{t('zenbakiOsoak.home.curriculum.title')}</h2>

                    <div className="competencies">
                        <div className="competency-card glass">
                            <span className="competency-icon">🏔️</span>
                            <h4>{t('zenbakiOsoak.home.curriculum.c1')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">📈</span>
                            <h4>{t('zenbakiOsoak.home.curriculum.c2')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">↔️</span>
                            <h4>{t('zenbakiOsoak.home.curriculum.c3')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">🧮</span>
                            <h4>{t('zenbakiOsoak.home.curriculum.c4')}</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
