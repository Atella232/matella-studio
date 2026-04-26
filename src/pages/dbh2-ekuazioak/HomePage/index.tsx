import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ekuazioakHome, normalizeEkuazioakLang, pickText } from '../content'
import '../../dbh1-zatikiak/HomePage/HomePage.css'

export function HomePage() {
    const { i18n, t } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>{pickText(lang, ekuazioakHome.title)}</h1>
                    <h2>{pickText(lang, ekuazioakHome.subtitle)}</h2>
                    <p className="hero-description">{pickText(lang, ekuazioakHome.description)}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh2/ekuazioak/teoria" className="btn btn-primary">📚 {t('nav.theory')}</Link>
                        <Link to="/matematika/dbh2/ekuazioak/laboratorio" className="btn btn-primary">⚖️ {t('nav.lab')}</Link>
                        <Link to="/matematika/dbh2/ekuazioak/retos" className="btn btn-secondary">🎯 {t('nav.challenges')}</Link>
                        <Link to="/matematika/dbh2/ekuazioak/ejercicios" className="btn btn-secondary">✍️ {pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' })}</Link>
                        <Link to="/matematika/dbh2/ekuazioak/juegos" className="btn btn-secondary">🎮 {t('nav.games')}</Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{pickText(lang, { eu: 'Zer landuko duzu?', es: '¿Qué vas a trabajar?', ar: 'ماذا ستتدرب؟' })}</h2>
                    <div className="features-grid">
                        <article className="feature-card glass">
                            <div className="feature-icon">📚</div>
                            <h3>{t('nav.theory')}</h3>
                            <p>{pickText(lang, ekuazioakHome.featureTheory)}</p>
                            <Link to="/matematika/dbh2/ekuazioak/teoria" className="feature-link">{pickText(lang, { eu: 'Ikasi →', es: 'Estudiar →', ar: 'ادرس →' })}</Link>
                        </article>
                        <article className="feature-card glass">
                            <div className="feature-icon">⚖️</div>
                            <h3>{t('nav.lab')}</h3>
                            <p>{pickText(lang, ekuazioakHome.featureLab)}</p>
                            <Link to="/matematika/dbh2/ekuazioak/laboratorio" className="feature-link">{pickText(lang, { eu: 'Probatu →', es: 'Probar →', ar: 'جرّب →' })}</Link>
                        </article>
                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('nav.challenges')}</h3>
                            <p>{pickText(lang, ekuazioakHome.featureMissions)}</p>
                            <Link to="/matematika/dbh2/ekuazioak/retos" className="feature-link">{pickText(lang, { eu: 'Erronketara →', es: 'Ir a retos →', ar: 'اذهب للتحديات →' })}</Link>
                        </article>
                        <article className="feature-card glass">
                            <div className="feature-icon">🎮</div>
                            <h3>{t('nav.games')}</h3>
                            <p>{pickText(lang, ekuazioakHome.featureGames)}</p>
                            <Link to="/matematika/dbh2/ekuazioak/juegos" className="feature-link">{pickText(lang, { eu: 'Jokatu →', es: 'Jugar →', ar: 'العب →' })}</Link>
                        </article>
                        <article className="feature-card glass">
                            <div className="feature-icon">✍️</div>
                            <h3>{pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' })}</h3>
                            <p>{pickText(lang, ekuazioakHome.featureExercises)}</p>
                            <Link to="/matematika/dbh2/ekuazioak/ejercicios" className="feature-link">{pickText(lang, { eu: 'Praktikatu →', es: 'Practicar →', ar: 'تدرّب →' })}</Link>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    )
}
