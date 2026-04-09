import { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './BiosferaPage.css'

export function NaturaBiosferaPage() {
    const { i18n } = useTranslation()
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const pageSrc = useMemo(() => {
        const fileName =
            i18n.language === 'es'
                ? 'Bioaniztasuna_es.html'
                : i18n.language === 'ar'
                    ? 'Bioaniztasuna_ar.html'
                    : 'index.html'

        return `${import.meta.env.BASE_URL}natura/bioaniztasuna/${fileName}`
    }, [i18n.language])

    const handleLoad = useCallback(() => {
        const iframe = iframeRef.current
        const doc = iframe?.contentDocument
        if (!doc) return

        const embeddedNav = doc.querySelector('.nav') as HTMLElement | null
        if (embeddedNav) {
            embeddedNav.style.display = 'none'
        }
    }, [])

    return (
        <div className="biosfera-page">
            <iframe
                key={pageSrc}
                ref={iframeRef}
                className="biosfera-frame"
                src={pageSrc}
                title="Bioaniztasuna"
                onLoad={handleLoad}
            />
        </div>
    )
}
