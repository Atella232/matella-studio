import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import './HomePage.css';

export function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="dbh1-taulak-grafikoak-home">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>📊 {t('taulakGrafikoak.title')}</h1>
                        <p className="subtitle">{t('taulakGrafikoak.subtitle')}</p>
                    </div>
                </header>

                <div className="hero-content glass">
                    <p className="description">{t('taulakGrafikoak.home.description')}</p>
                </div>

                <section className="features-grid">
                    <article className="feature-card glass">
                        <div className="feature-icon">📚</div>
                        <h3>{t('nav.theory')}</h3>
                        <p>{t('taulakGrafikoak.home.startTheory')}</p>
                        <Link to="/matematika/dbh1/estadistica/teoria" className="feature-link">{t('taulakGrafikoak.home.startTheory')} →</Link>
                    </article>

                    <article className="feature-card glass">
                        <div className="feature-icon">🧪</div>
                        <h3>{t('nav.lab')}</h3>
                        <p>{t('taulakGrafikoak.lab.subtitle')}</p>
                        <Link to="/matematika/dbh1/estadistica/laborategia" className="feature-link">{t('taulakGrafikoak.lab.title')} →</Link>
                    </article>
                </section>
            </div>
        </div>
    );
}
