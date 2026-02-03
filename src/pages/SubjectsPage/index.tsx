import { useTranslation } from 'react-i18next'
import { SubjectCard } from '../../components/common/SubjectCard'
import './SubjectsPage.css'

export function SubjectsPage() {
    const { t } = useTranslation()

    return (
        <div className="subjects-page">
            <div className="container">
                <header className="subjects-header">
                    <h1>{t('subjects.title')}</h1>
                    <p className="subjects-subtitle">{t('subjects.subtitle')}</p>
                </header>

                <div className="subjects-grid">
                    <SubjectCard
                        to="/matematicas"
                        icon="∑"
                        title={t('subjects.math.title')}
                        description={t('subjects.math.description')}
                        color="#6366f1"
                    />
                    <SubjectCard
                        icon="🌿"
                        title={t('subjects.natura.title')}
                        description={t('subjects.natura.description')}
                        color="#10b981"
                        disabled
                        disabledLabel={t('subjects.comingSoon')}
                    />
                </div>

                <section className="subjects-info glass">
                    <h2>{t('subjects.about.title')}</h2>
                    <p>{t('subjects.about.text')}</p>
                </section>
            </div>
        </div>
    )
}
