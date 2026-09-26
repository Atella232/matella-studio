import { useEffect } from 'react'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './RouteError.css'

export function RouteError() {
    const { t } = useTranslation()
    const error = useRouteError()
    const isNotFound = isRouteErrorResponse(error) && error.status === 404

    useEffect(() => {
        if (!isNotFound) console.error(error)
    }, [error, isNotFound])

    return (
        <section className="route-error container" role="alert">
            <div className="route-error-card glass">
                <span className="route-error-icon" aria-hidden="true">{isNotFound ? '🧭' : '⚠️'}</span>
                <h1>{t(isNotFound ? 'routeError.notFoundTitle' : 'routeError.title')}</h1>
                <p>{t(isNotFound ? 'routeError.notFoundDescription' : 'routeError.description')}</p>
                <div className="route-error-actions">
                    {!isNotFound && (
                        <button type="button" className="route-error-button primary" onClick={() => window.location.reload()}>
                            {t('routeError.retry')}
                        </button>
                    )}
                    <Link to="/" className="route-error-button">
                        {t('routeError.home')}
                    </Link>
                </div>
            </div>
        </section>
    )
}
