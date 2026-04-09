import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { courses, getCourseById } from '../../../data/courses'
import { naturaCourses, getNaturaCourseById } from '../../../data/naturaCourses'
import { fixMaybeText } from '../../../utils/fixText'
import './Navigation.css'

type SubjectId = 'matematika' | 'natura'
type CourseLike = (typeof courses)[number] | (typeof naturaCourses)[number]
type TopicLike = CourseLike['topics'][number]

export function Navigation() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const pathParts = location.pathname.split('/').filter(Boolean)
    const subjectId = (pathParts[0] === 'matematika' || pathParts[0] === 'natura'
        ? pathParts[0]
        : undefined) as SubjectId | undefined

    let courseId: string | undefined
    let topicId: string | undefined
    let currentSection: string | undefined

    if (subjectId && pathParts.length >= 2) {
        courseId = pathParts[1]
        if (pathParts.length >= 3) topicId = pathParts[2]
        if (pathParts.length >= 4) currentSection = pathParts[3]
    }

    const currentCourses = subjectId === 'natura' ? naturaCourses : subjectId === 'matematika' ? courses : []
    const currentCourse = courseId
        ? (subjectId === 'natura' ? getNaturaCourseById(courseId) : getCourseById(courseId))
        : undefined

    const isHomePage = location.pathname === '/'
    const isCoursesPage = Boolean(subjectId && pathParts.length === 1)
    const isTopicsPage = Boolean(subjectId && pathParts.length === 2 && courseId)
    const isContentPage = Boolean(subjectId && pathParts.length >= 3 && courseId && topicId)
    const isMathContentPage = subjectId === 'matematika' && isContentPage

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }

    const getCourseName = (course: CourseLike) => {
        switch (i18n.language) {
            case 'eu': return fixMaybeText(course.nameEu)
            case 'ar': return fixMaybeText(course.nameAr)
            default: return fixMaybeText(course.name)
        }
    }

    const getTopicName = (topic: TopicLike) => {
        switch (i18n.language) {
            case 'eu': return fixMaybeText(topic.nameEu)
            case 'ar': return fixMaybeText(topic.nameAr)
            default: return fixMaybeText(topic.name)
        }
    }

    const getTopicIcon = (topic: TopicLike) => fixMaybeText(topic.icon)

    const subjectTitle = subjectId === 'natura' ? t('subjects.natura.title') : t('subjects.math.title')
    const contentBasePath = subjectId && courseId && topicId ? `/${subjectId}/${courseId}/${topicId}` : ''
    const isAlgebraPage = subjectId === 'matematika' && courseId === 'dbh2' && topicId === 'algebra'
    const exercisesLabel =
        i18n.language === 'ar'
            ? 'التمارين'
            : i18n.language === 'eu'
                ? 'Ariketak'
                : 'Ejercicios'

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    return (
        <nav className="navigation" role="navigation" aria-label="Main navigation" ref={dropdownRef}>
            <ul className="nav-list">
                <li>
                    <Link to="/" className={`nav-link nav-home ${isHomePage ? 'active' : ''}`}>
                        🏠 {t('nav.home')}
                    </Link>
                </li>

                {!isHomePage && (
                    <li>
                        <button
                            className="nav-link nav-back"
                            onClick={() => window.history.back()}
                            aria-label={t('common.back')}
                        >
                            ← {t('common.back')}
                        </button>
                    </li>
                )}

                {isHomePage && (
                    <>
                        <li className="nav-dropdown">
                            <button
                                className={`nav-link dropdown-toggle ${openDropdown === 'math' ? 'open' : ''}`}
                                onClick={() => toggleDropdown('math')}
                            aria-expanded={openDropdown === 'math'}
                        >
                            Σ {t('subjects.math.title')} ▾
                        </button>
                            {openDropdown === 'math' && (
                                <ul className="dropdown-menu glass">
                                    {courses.map((course) => (
                                        <li key={course.id}>
                                            <Link
                                                to={`/matematika/${course.id}`}
                                                className="dropdown-item"
                                                onClick={() => setOpenDropdown(null)}
                                            >
                                                {getCourseName(course)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className="nav-dropdown">
                            <button
                                className={`nav-link dropdown-toggle ${openDropdown === 'natura' ? 'open' : ''}`}
                                onClick={() => toggleDropdown('natura')}
                            aria-expanded={openDropdown === 'natura'}
                        >
                            🌿 {t('subjects.natura.title')} ▾
                        </button>
                            {openDropdown === 'natura' && (
                                <ul className="dropdown-menu glass">
                                    {naturaCourses.map((course) => (
                                        <li key={course.id}>
                                            <Link
                                                to={`/natura/${course.id}`}
                                                className="dropdown-item"
                                                onClick={() => setOpenDropdown(null)}
                                            >
                                                {getCourseName(course)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </>
                )}

                {(isCoursesPage || isTopicsPage || isContentPage) && subjectId && (
                    <li className="nav-dropdown">
                        <button
                            className={`nav-link dropdown-toggle ${openDropdown === 'courses' ? 'open' : ''}`}
                            onClick={() => toggleDropdown('courses')}
                            aria-expanded={openDropdown === 'courses'}
                        >
                            📚 {currentCourse ? getCourseName(currentCourse) : subjectTitle} ▾
                        </button>
                        {openDropdown === 'courses' && (
                            <ul className="dropdown-menu glass">
                                {currentCourses.map((course) => (
                                    <li key={course.id}>
                                        <Link
                                            to={`/${subjectId}/${course.id}`}
                                            className={`dropdown-item ${course.id === courseId ? 'active' : ''}`}
                                            onClick={() => setOpenDropdown(null)}
                                        >
                                            {getCourseName(course)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}

                {(isTopicsPage || isContentPage) && currentCourse && currentCourse.topics.length > 0 && subjectId && (
                    <li className="nav-dropdown">
                        <button
                            className={`nav-link dropdown-toggle ${openDropdown === 'topics' ? 'open' : ''}`}
                            onClick={() => toggleDropdown('topics')}
                            aria-expanded={openDropdown === 'topics'}
                        >
                            📖 {t('nav.topics')} ▾
                        </button>
                        {openDropdown === 'topics' && (
                            <ul className="dropdown-menu glass">
                                {currentCourse.topics.map((topic) => (
                                    <li key={topic.id}>
                                        {topic.active ? (
                                            <Link
                                                to={`/${subjectId}/${courseId}/${topic.id}`}
                                                className={`dropdown-item ${topic.id === topicId ? 'active' : ''}`}
                                                onClick={() => setOpenDropdown(null)}
                                            >
                                                {getTopicIcon(topic)} {getTopicName(topic)}
                                            </Link>
                                        ) : (
                                            <span className="dropdown-item disabled">
                                                {getTopicIcon(topic)} {getTopicName(topic)}
                                                <small>({t('subjects.comingSoon')})</small>
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}

                {isMathContentPage && contentBasePath && (
                    <>
                        <li className="nav-separator">|</li>
                        <li>
                            <Link
                                to={`${contentBasePath}/teoria`}
                                className={`nav-link nav-section ${currentSection === 'teoria' || (!currentSection && topicId) ? 'active' : ''}`}
                            >
                                📚 {t('nav.theory')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${contentBasePath}/laboratorio`}
                                className={`nav-link nav-section ${currentSection === 'laboratorio' || currentSection === 'laborategia' ? 'active' : ''}`}
                            >
                                🔬 {t('nav.lab')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${contentBasePath}/retos`}
                                className={`nav-link nav-section ${currentSection === 'retos' ? 'active' : ''}`}
                            >
                                🎯 {t('nav.challenges')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${contentBasePath}/jokuak`}
                                className={`nav-link nav-section ${currentSection === 'jokuak' ? 'active' : ''}`}
                            >
                                🎮 {t('nav.games')}
                            </Link>
                        </li>
                        {isAlgebraPage && (
                            <li>
                                <Link
                                    to={`${contentBasePath}/ariketak`}
                                    className={`nav-link nav-section ${currentSection === 'ariketak' || currentSection === 'ejercicios' ? 'active' : ''}`}
                                >
                                    📝 {exercisesLabel}
                                </Link>
                            </li>
                        )}
                    </>
                )}
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
