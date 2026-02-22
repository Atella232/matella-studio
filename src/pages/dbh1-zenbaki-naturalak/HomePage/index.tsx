import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
    const { t } = useTranslation()

    return (
        <div className="home-page zenbaki-naturalak-home">
            <section className="hero">
                <div className="container">
                    <h1>{t('zenbakiNaturalak.home.title')}</h1>
                    <h2 className="hero-subtitle">{t('zenbakiNaturalak.home.subtitle')}</h2>
                    <p className="hero-description">{t('zenbakiNaturalak.home.description')}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/zenbaki-naturalak/teoria" className="btn btn-primary">
                            📚 {t('nav.theory')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{t('home.features.title')}</h2>
                    <div className="features-grid">
                        <article className="feature-card glass">
                            <div className="feature-icon">📚</div>
                            <h3>{t('nav.theory')}</h3>
                            <p>{t('home.features.theory.description')}</p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/teoria" className="feature-link">{t('home.features.theory.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('nav.missions') || 'Erronkak'}</h3>
                            <p>{t('home.features.missions.description') || 'Frogatu zure ezagutzak erronka batzuekin.'}</p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/misioa" className="feature-link">{t('home.features.missions.link') || 'Hasi →'}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">♿</div>
                            <h3>{t('home.features.accessibility.title')}</h3>
                            <p>{t('home.features.accessibility.description')}</p>
                            <Link to="/accesibilidad" className="feature-link">{t('home.features.accessibility.link')}</Link>
                        </article>

                    </div>
                </div>
            </section>

            <section className="curriculum">
                <div className="container">
                    <h2>{t('home.curriculum.title')}</h2>
                    <p className="curriculum-intro">
                        {t('home.curriculum.description_dbh1')}
                    </p>

                    <div className="competencies">
                        <div className="competency-card glass">
                            <span className="competency-icon">🔢</span>
                            <h4>{t('home.curriculum.tags.numerical')}</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">🧩</span>
                            <h4>{t('home.curriculum.tags.problemSolving')}</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
