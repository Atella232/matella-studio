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
                    <p className="hero-subtitle">{t('home.subtitle')}</p>
                    <p className="hero-description">{t('home.description')}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh2/zatikiak/teoria" className="btn btn-primary">
                            📚 {t('nav.theory')}
                        </Link>
                        <Link to="/matematika/dbh2/zatikiak/laboratorio" className="btn btn-primary">
                            🔬 {t('home.cta.lab')}
                        </Link>
                        <Link to="/matematika/dbh2/zatikiak/retos" className="btn btn-secondary">
                            🎯 {t('home.cta.start')}
                        </Link>
                        <Link to="/matematika/dbh2/zatikiak/ejercicios" className="btn btn-secondary">
                            📝 {t('nav.practice')}
                        </Link>
                        <Link to="/matematika/dbh2/zatikiak/juegos" className="btn btn-secondary">
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
                            <Link to="/matematika/dbh2/zatikiak/teoria" className="feature-link">{t('home.features.theory.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🔬</div>
                            <h3>{t('home.features.lab.title')}</h3>
                            <p>{t('home.features.lab.description')}</p>
                            <Link to="/matematika/dbh2/zatikiak/laboratorio" className="feature-link">{t('home.features.lab.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('home.features.missions.title')}</h3>
                            <p>{t('home.features.missions.description')}</p>
                            <Link to="/matematika/dbh2/zatikiak/retos" className="feature-link">{t('home.features.missions.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">📝</div>
                            <h3>{t('nav.practice')}</h3>
                            <p>{t('home.features.exercises.description')}</p>
                            <Link to="/matematika/dbh2/zatikiak/ejercicios" className="feature-link">{t('home.features.exercises.link')}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎮</div>
                            <h3>{t('nav.games')}</h3>
                            <p>{t('home.features.games.description')}</p>
                            <Link to="/matematika/dbh2/zatikiak/juegos" className="feature-link">{t('home.features.games.link')}</Link>
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
                        {t('home.curriculum.description')}
                    </p>

                    <div className="competencies">
                        <div className="competency-tag">{t('home.curriculum.tags.numerical')}</div>
                        <div className="competency-tag">{t('home.curriculum.tags.fractions')}</div>
                        <div className="competency-tag">{t('home.curriculum.tags.proportionality')}</div>
                        <div className="competency-tag">{t('home.curriculum.tags.problemSolving')}</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
