import { useTranslation } from 'react-i18next'
import { SubjectCard } from '../../components/common/SubjectCard'
import { courses } from '../../data/courses'
import { fixMaybeText } from '../../utils/fixText'
import './CoursesPage.css'

export function CoursesPage() {
    const { t, i18n } = useTranslation()

    const getCourseName = (course: typeof courses[0]) => {
        switch (i18n.language) {
            case 'eu': return course.nameEu
            case 'ar': return course.nameAr
            default: return course.name
        }
    }

    const getCourseDescription = (course: typeof courses[0]) => {
        switch (i18n.language) {
            case 'eu': return course.descriptionEu
            case 'ar': return course.descriptionAr
            default: return course.description
        }
    }

    return (
        <div className="courses-page">
            <div className="container">
                <header className="courses-header">
                    <div className="courses-breadcrumb">
                        <a href="#/">{t('subjects.math.title')}</a>
                    </div>
                    <h1>{t('courses.title')}</h1>
                    <p className="courses-subtitle">{t('courses.subtitle')}</p>
                </header>

                <div className="courses-grid">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className="course-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <SubjectCard
                                to={`/matematika/${course.id}`}
                                icon={course.topics[0]?.icon || '📚'}
                                title={fixMaybeText(getCourseName(course))}
                                description={fixMaybeText(getCourseDescription(course))}
                                color={course.color}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
