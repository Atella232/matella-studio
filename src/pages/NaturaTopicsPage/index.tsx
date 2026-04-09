import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SubjectCard } from '../../components/common/SubjectCard'
import { getNaturaCourseById } from '../../data/naturaCourses'
import { fixMaybeText } from '../../utils/fixText'
import '../TopicsPage/TopicsPage.css'

export function NaturaTopicsPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const { t, i18n } = useTranslation()

    const course = courseId ? getNaturaCourseById(courseId) : undefined

    if (!course) {
        return <Navigate to="/natura" replace />
    }

    const getCourseName = () => {
        switch (i18n.language) {
            case 'eu': return course.nameEu
            case 'ar': return course.nameAr
            default: return course.name
        }
    }

    const getTopicName = (topic: typeof course.topics[0]) => {
        switch (i18n.language) {
            case 'eu': return topic.nameEu
            case 'ar': return topic.nameAr
            default: return topic.name
        }
    }

    const availableLabel =
        i18n.language === 'ar'
            ? 'متاح'
            : i18n.language === 'eu'
                ? 'Eskuragarri'
                : 'Disponible'

    const subtitle =
        i18n.language === 'ar'
            ? `المواضيع المتاحة: ${course.topics.length}`
            : i18n.language === 'eu'
                ? `Eskuragarri dauden gaiak: ${course.topics.length}`
                : `Temas disponibles: ${course.topics.length}`

    return (
        <div className="topics-page">
            <div className="container">
                <header className="topics-header">
                    <div className="topics-breadcrumb">
                        <a href="#/">{t('subjects.natura.title')}</a>
                        <span className="separator">/</span>
                        <a href="#/natura">{fixMaybeText(t('subjects.natura.title'))}</a>
                    </div>
                    <h1 style={{ '--course-color': course.color } as React.CSSProperties}>
                        {fixMaybeText(getCourseName())}
                    </h1>
                    <p className="topics-subtitle">{subtitle}</p>
                </header>

                <div className="topics-grid">
                    {course.topics.map((topic, index) => (
                        <div
                            key={topic.id}
                            className="topic-item"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <SubjectCard
                                to={topic.active ? `/natura/${courseId}/${topic.id}` : undefined}
                                icon={topic.icon}
                                title={fixMaybeText(getTopicName(topic))}
                                description={topic.active ? availableLabel : t('topics.comingSoon')}
                                color={course.color}
                                disabled={!topic.active}
                                disabledLabel={t('subjects.comingSoon')}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
