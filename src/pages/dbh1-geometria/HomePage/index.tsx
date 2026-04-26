import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import './HomePage.css';

export function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="dbh1-geometria-home">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>📐 {t('geometria.title')}</h1>
                        <p className="subtitle">{t('geometria.subtitle')}</p>
                    </div>
                </header>

                <section className="features-grid">
                    <article className="feature-card glass">
                        <div className="feature-icon">📚</div>
                        <h3>{t('nav.theory')}</h3>
                        <p>{t('geometria.home.theory.description')}</p>
                        <Link to="/matematika/dbh1/geometria/teoria" className="feature-link">{t('geometria.home.theory.link')} →</Link>
                    </article>

                    <article className="feature-card glass">
                        <div className="feature-icon">🧪</div>
                        <h3>{t('nav.lab')}</h3>
                        <p>{t('geometria.home.lab.description')}</p>
                        <Link to="/matematika/dbh1/geometria/laboratorio" className="feature-link">{t('geometria.home.lab.link')} →</Link>
                    </article>
                </section>
            </div>
        </div>
    );
}
