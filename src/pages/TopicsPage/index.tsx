import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SubjectCard } from '../../components/common/SubjectCard'
import { getCourseById } from '../../data/courses'
import './TopicsPage.css'

export function TopicsPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const { t, i18n } = useTranslation()

    const course = courseId ? getCourseById(courseId) : undefined

    if (!course) {
        return <Navigate to="/matematicas" replace />
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

    return (
        <div className="topics-page">
            <div className="container">
                <header className="topics-header">
                    <div className="topics-breadcrumb">
                        <a href="#/">{t('subjects.math.title')}</a>
                        <span className="separator">/</span>
                        <a href="#/matematicas">{t('courses.title')}</a>
                    </div>
                    <h1 style={{ '--course-color': course.color } as React.CSSProperties}>
                        {getCourseName()}
                    </h1>
                    <p className="topics-subtitle">
                        {t('topics.subtitle', { count: course.topics.length })}
                    </p>
                </header>

                <div className="topics-grid">
                    {course.topics.map((topic, index) => (
                        <div
                            key={topic.id}
                            className="topic-item"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <SubjectCard
                                to={topic.active ? `/matematicas/${courseId}/${topic.id}` : undefined}
                                icon={topic.icon}
                                title={getTopicName(topic)}
                                description={topic.active ? t('topics.available') : t('topics.comingSoon')}
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
