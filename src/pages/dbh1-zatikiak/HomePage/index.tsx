import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
    const { t } = useTranslation()

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>{t('home.title')}</h1>
                    <h2>{t('home.subtitle')}</h2>
                    <p className="hero-description">{t('home.description_dbh1')}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/zatikiak/teoria" className="btn btn-primary">
                            📚 {t('nav.theory')}
                        </Link>
                        <Link to="/matematika/dbh1/zatikiak/laboratorio" className="btn btn-primary">
                            🔬 {t('home.cta.lab')}
                        </Link>
                        <Link to="/matematika/dbh1/zatikiak/retos" className="btn btn-secondary">
                            🎯 {t('home.cta.start')}
                        </Link>
                        <Link to="/matematika/dbh1/zatikiak/jokuak" className="btn btn-secondary">
                            🎮 {t('nav.games')}
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
                            <Link to="/matematika/dbh1/zatikiak/teoria" className="feature-link">{t('home.features.theory.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🔬</div>
                            <h3>{t('home.features.lab.title')}</h3>
                            <p>{t('home.features.lab.description')}</p>
                            <Link to="/matematika/dbh1/zatikiak/laboratorio" className="feature-link">{t('home.features.lab.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('home.features.missions.title')}</h3>
                            <p>{t('home.features.missions.description')}</p>
                            <Link to="/matematika/dbh1/zatikiak/retos" className="feature-link">{t('home.features.missions.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎮</div>
                            <h3>{t('nav.games')}</h3>
                            <p>{t('home.features.games.description')}</p>
                            <Link to="/matematika/dbh1/zatikiak/jokuak" className="feature-link">{t('home.features.games.link')}</Link>
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
                            <span className="competency-icon">🍰</span>
                            <h4>{t('home.curriculum.tags.fractions')}</h4>
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
