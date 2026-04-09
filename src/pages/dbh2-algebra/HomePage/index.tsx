import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { algebraHome, normalizeAlgebraLang, pickText } from '../content'
import '../../dbh1-zatikiak/HomePage/HomePage.css'

export function HomePage() {
    const { i18n, t } = useTranslation()
    const lang = normalizeAlgebraLang(i18n.language)

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>{pickText(lang, algebraHome.title)}</h1>
                    <h2>{pickText(lang, algebraHome.subtitle)}</h2>
                    <p className="hero-description">{pickText(lang, algebraHome.description)}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh2/algebra/teoria" className="btn btn-primary">
                            📚 {t('nav.theory')}
                        </Link>
                        <Link to="/matematika/dbh2/algebra/laboratorio" className="btn btn-primary">
                            🔬 {t('nav.lab')}
                        </Link>
                        <Link to="/matematika/dbh2/algebra/retos" className="btn btn-secondary">
                            🎯 {t('nav.challenges')}
                        </Link>
                        <Link to="/matematika/dbh2/algebra/ariketak" className="btn btn-secondary">
                            📝 {pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' })}
                        </Link>
                        <Link to="/matematika/dbh2/algebra/jokuak" className="btn btn-secondary">
                            🎮 {t('nav.games')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{pickText(lang, { eu: 'Zer aurkituko duzu?', es: '¿Qué encontrarás?', ar: 'ماذا ستجد؟' })}</h2>
                    <div className="features-grid">
                        <article className="feature-card glass">
                            <div className="feature-icon">📚</div>
                            <h3>{t('nav.theory')}</h3>
                            <p>{pickText(lang, algebraHome.featureTheory)}</p>
                            <Link to="/matematika/dbh2/algebra/teoria" className="feature-link">{pickText(lang, { eu: 'Ikasi →', es: 'Estudiar →', ar: 'ادرس →' })}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🔬</div>
                            <h3>{t('nav.lab')}</h3>
                            <p>{pickText(lang, algebraHome.featureLab)}</p>
                            <Link to="/matematika/dbh2/algebra/laboratorio" className="feature-link">{pickText(lang, { eu: 'Probatu →', es: 'Probar →', ar: 'جرّب →' })}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎯</div>
                            <h3>{t('nav.challenges')}</h3>
                            <p>{pickText(lang, algebraHome.featureMissions)}</p>
                            <Link to="/matematika/dbh2/algebra/retos" className="feature-link">{pickText(lang, { eu: 'Erronketara →', es: 'Ir a retos →', ar: 'اذهب للتحديات →' })}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">🎮</div>
                            <h3>{t('nav.games')}</h3>
                            <p>{pickText(lang, algebraHome.featureGames)}</p>
                            <Link to="/matematika/dbh2/algebra/jokuak" className="feature-link">{pickText(lang, { eu: 'Jokatu →', es: 'Jugar →', ar: 'العب →' })}</Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">📝</div>
                            <h3>{pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' })}</h3>
                            <p>{pickText(lang, {
                                eu: 'Jatorrizko proiektuko 63 ariketa guztiak, blokez blokeko soluzioekin.',
                                es: 'Los 63 ejercicios del proyecto original, organizados por bloques y con solución.',
                                ar: 'جميع تمارين المشروع الأصلي وعددها 63 تمرينًا، مرتبة حسب الكتل ومع الحل.'
                            })}</p>
                            <Link to="/matematika/dbh2/algebra/ariketak" className="feature-link">{pickText(lang, { eu: 'Praktikatu →', es: 'Practicar →', ar: 'تدرّب →' })}</Link>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    )
}
