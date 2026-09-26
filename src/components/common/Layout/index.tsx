import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Navigation } from '../Navigation'
import './Layout.css'

export function Layout() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const isRTL = i18n.language === 'ar'
    const isPrototypeRoute = location.pathname.startsWith('/prototipo/ekuazioak-v2')
        || location.pathname.startsWith('/matematika/dbh2/zatikiak')
    const isImmersiveRoute = location.pathname.startsWith('/natura/dbh1/biosfera') || isPrototypeRoute
    // Natura keeps its original look; everything else uses "Cuaderno a color" (src/index.css)
    const isClassicTheme = location.pathname.startsWith('/natura')

    useLayoutEffect(() => {
        document.documentElement.dataset.theme = isClassicTheme ? 'classic' : 'cuaderno'
    }, [isClassicTheme])

    useEffect(() => {
        const language = i18n.resolvedLanguage ?? i18n.language
        document.documentElement.lang = language
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    }, [i18n.language, i18n.resolvedLanguage])

    return (
        <div className="layout" dir={isRTL ? 'rtl' : 'ltr'}>
            {!isPrototypeRoute && (
                <header className="layout-header glass">
                    <div className="container header-content">
                        <Link className="logo" to="/" aria-label="Matella">
                            {isClassicTheme ? (
                                <span className="logo-icon">Σ</span>
                            ) : (
                                <span className="logo-mark" aria-hidden="true"><span /><span /><span /><span /></span>
                            )}
                            <span className="logo-text">Matella</span>
                        </Link>
                        <Navigation />
                    </div>
                </header>
            )}

            <main className={`layout-main ${isImmersiveRoute ? 'immersive' : ''}`}>
                <Suspense fallback={<span className="sr-only" role="status" aria-live="polite">…</span>}>
                    <Outlet />
                </Suspense>
            </main>

            {!isImmersiveRoute && (
                <footer className="layout-footer">
                    <div className="container">
                        <p>{t('footer.copyright')}</p>
                        <nav className="footer-nav">
                            <Link to="/accesibilidad">{t('footer.accessibility')}</Link>
                            <Link to="/privacidad">{t('footer.privacy')}</Link>
                            <Link to="/creditos">{t('footer.credits')}</Link>
                        </nav>
                    </div>
                </footer>
            )}
        </div>
    )
}
