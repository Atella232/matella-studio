import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
    const { t } = useTranslation()

    return (
        <div className="home-page zatigarritasuna-home">
            <section className="hero">
                <div className="container">
                    <h1>{t('zatigarritasuna.home.title')}</h1>
                    <h2>{t('zatigarritasuna.home.subtitle')}</h2>
                    <p className="hero-description">{t('zatigarritasuna.home.description')}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/divisibilidad/teoria" className="btn btn-primary">
                            📚 {t('zatigarritasuna.home.startTheory')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{t('zatigarritasuna.home.features.title')}</h2>
                    <div className="features-grid">
                        <article className="feature-card glass">
                            <div className="feature-icon">🧮</div>
                            <h3>{t('zatigarritasuna.home.features.f1.title')}</h3>
                            <p>{t('zatigarritasuna.home.features.f1.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">⚡</div>
                            <h3>{t('zatigarritasuna.home.features.f2.title')}</h3>
                            <p>{t('zatigarritasuna.home.features.f2.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🧱</div>
                            <h3>{t('zatigarritasuna.home.features.f3.title')}</h3>
                            <p>{t('zatigarritasuna.home.features.f3.desc')}</p>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('zatigarritasuna.home.features.f4.title')}</h3>
                            <p>{t('zatigarritasuna.home.features.f4.desc')}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="curriculum">
                <div className="container">
                    <h2>{t('zatigarritasuna.home.curriculum.title')}</h2>

                    <div className="competencies">
                        <div className="competency-card glass">
                            <span className="competency-icon">🔢</span>
                            <h4>{t('zatigarritasuna.home.curriculum.c1')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">🔄</span>
                            <h4>{t('zatigarritasuna.home.curriculum.c2')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">🧮</span>
                            <h4>{t('zatigarritasuna.home.curriculum.c3')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">🧩</span>
                            <h4>{t('zatigarritasuna.home.curriculum.c4')}</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
