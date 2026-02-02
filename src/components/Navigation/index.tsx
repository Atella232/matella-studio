import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

export function Navigation() {
    const { t, i18n } = useTranslation()
    const location = useLocation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }

    const navItems = [
        { path: '/', label: t('nav.home') },
        { path: '/teoria', label: t('nav.theory') },
        { path: '/laboratorio', label: t('nav.lab') },
        { path: '/retos', label: t('nav.challenges') },
    ]

    return (
        <nav className="navigation" role="navigation" aria-label="Main navigation">
            <ul className="nav-list">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            aria-current={location.pathname === item.path ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="language-selector" role="group" aria-label="Language selection">
                <button
                    onClick={() => changeLanguage('es')}
                    className={i18n.language === 'es' ? 'active' : ''}
                    aria-pressed={i18n.language === 'es'}
                >
                    ES
                </button>
                <button
                    onClick={() => changeLanguage('eu')}
                    className={i18n.language === 'eu' ? 'active' : ''}
                    aria-pressed={i18n.language === 'eu'}
                >
                    EU
                </button>
                <button
                    onClick={() => changeLanguage('ar')}
                    className={i18n.language === 'ar' ? 'active' : ''}
                    aria-pressed={i18n.language === 'ar'}
                >
                    عربي
                </button>
            </div>
        </nav>
    )
}
