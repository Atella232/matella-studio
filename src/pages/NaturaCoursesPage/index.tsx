import { useTranslation } from 'react-i18next'
import { SubjectCard } from '../../components/common/SubjectCard'
import { naturaCourses } from '../../data/naturaCourses'
import { fixMaybeText } from '../../utils/fixText'
import '../CoursesPage/CoursesPage.css'

export function NaturaCoursesPage() {
    const { t, i18n } = useTranslation()

    const getCourseName = (course: typeof naturaCourses[0]) => {
        switch (i18n.language) {
            case 'eu': return course.nameEu
            case 'ar': return course.nameAr
            default: return course.name
        }
    }

    const getCourseDescription = (course: typeof naturaCourses[0]) => {
        switch (i18n.language) {
            case 'eu': return course.descriptionEu
            case 'ar': return course.descriptionAr
            default: return course.description
        }
    }

    const subtitle =
        i18n.language === 'ar'
            ? 'اختر المرحلة الدراسية للدخول الى محتوى العلوم الطبيعية.'
            : i18n.language === 'eu'
                ? 'Aukeratu ikasturtea Naturako edukietara sartzeko.'
                : 'Elige el curso para entrar en los contenidos de Natura.'

    return (
        <div className="courses-page">
            <div className="container">
                <header className="courses-header">
                    <div className="courses-breadcrumb">
                        <a href="#/">{t('subjects.natura.title')}</a>
                    </div>
                    <h1>{fixMaybeText(t('subjects.natura.title'))}</h1>
                    <p className="courses-subtitle">{subtitle}</p>
                </header>

                <div className="courses-grid">
                    {naturaCourses.map((course, index) => (
                        <div
                            key={course.id}
                            className="course-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <SubjectCard
                                to={`/natura/${course.id}`}
                                icon={course.topics[0]?.icon || '🌿'}
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
