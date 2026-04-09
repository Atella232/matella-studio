import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Navigation } from '../Navigation'
import './Layout.css'

export function Layout() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const isRTL = i18n.language === 'ar'
    const isImmersiveRoute = location.pathname.startsWith('/natura/dbh1/biosfera')

    return (
        <div className="layout" dir={isRTL ? 'rtl' : 'ltr'}>
            <header className="layout-header glass">
                <div className="container header-content">
                    <div className="logo">
                        <span className="logo-icon">Σ</span>
                        <span className="logo-text">Matella</span>
                    </div>
                    <Navigation />
                </div>
            </header>

            <main className={`layout-main ${isImmersiveRoute ? 'immersive' : ''}`}>
                <Outlet />
            </main>

            {!isImmersiveRoute && (
                <footer className="layout-footer">
                    <div className="container">
                        <p>{t('footer.copyright')}</p>
                        <nav className="footer-nav">
                            <a href="/accesibilidad">{t('footer.accessibility')}</a>
                            <a href="/privacidad">{t('footer.privacy')}</a>
                            <a href="/creditos">{t('footer.credits')}</a>
                        </nav>
                    </div>
                </footer>
            )}
        </div>
    )
}
