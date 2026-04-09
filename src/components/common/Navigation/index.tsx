import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { courses, getCourseById } from '../../../data/courses'
import { fixMaybeText } from '../../../utils/fixText'
import './Navigation.css'

export function Navigation() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Parsear la ruta para detectar contexto
    // Formato: /matematika/courseId/topicId/section
    const pathParts = location.pathname.split('/').filter(Boolean)

    // Detectar courseId y topicId del pathname
    let courseId: string | undefined
    let topicId: string | undefined
    let currentSection: string | undefined

    if (pathParts[0] === 'matematika' && pathParts.length >= 2) {
        courseId = pathParts[1]
        if (pathParts.length >= 3) {
            topicId = pathParts[2]
        }
        if (pathParts.length >= 4) {
            currentSection = pathParts[3]
        }
    }

    const currentCourse = courseId ? getCourseById(courseId) : undefined

    // Detectar el contexto actual basado en la ruta
    const isHomePage = location.pathname === '/'
    const isCoursesPage = location.pathname === '/matematika'
    const isTopicsPage = pathParts[0] === 'matematika' && pathParts.length === 2 && courseId
    const isContentPage = pathParts[0] === 'matematika' && pathParts.length >= 3 && courseId && topicId

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

    const getCourseName = (course: typeof courses[0]) => {
        switch (i18n.language) {
            case 'eu': return fixMaybeText(course.nameEu)
            case 'ar': return fixMaybeText(course.nameAr)
            default: return fixMaybeText(course.name)
        }
    }

    const getTopicName = (topic: typeof courses[0]['topics'][0]) => {
        switch (i18n.language) {
            case 'eu': return fixMaybeText(topic.nameEu)
            case 'ar': return fixMaybeText(topic.nameAr)
            default: return fixMaybeText(topic.name)
        }
    }

    const getTopicIcon = (topic: typeof courses[0]['topics'][0]) => fixMaybeText(topic.icon)

    const isAlgebraPage = courseId === 'dbh2' && topicId === 'algebra'
    const exercisesLabel =
        i18n.language === 'ar'
            ? 'التمارين'
            : i18n.language === 'eu'
                ? 'Ariketak'
                : 'Ejercicios'

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    // Base path para las secciones
    const contentBasePath = courseId && topicId ? `/matematika/${courseId}/${topicId}` : ''

    return (
        <nav className="navigation" role="navigation" aria-label="Main navigation" ref={dropdownRef}>
            <ul className="nav-list">
                {/* Botón Inicio - siempre visible */}
                <li>
                    <Link to="/" className={`nav-link nav-home ${isHomePage ? 'active' : ''}`}>
                        🏠 {t('nav.home')}
                    </Link>
                </li>

                {/* Botón Atrás - visible cuando no estamos en inicio */}
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

                {/* Página principal: mostrar asignaturas con cursos como dropdown */}
                {isHomePage && (
                    <li className="nav-dropdown">
                        <button
                            className={`nav-link dropdown-toggle ${openDropdown === 'math' ? 'open' : ''}`}
                            onClick={() => toggleDropdown('math')}
                            aria-expanded={openDropdown === 'math'}
                        >
                            ∑ {t('subjects.math.title')} ▾
                        </button>
                        {openDropdown === 'math' && (
                            <ul className="dropdown-menu glass">
                                {courses.map(course => (
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
                )}

                {/* En página de cursos, temas o contenido: mostrar dropdown de cursos */}
                {(isCoursesPage || isTopicsPage || isContentPage) && (
                    <li className="nav-dropdown">
                        <button
                            className={`nav-link dropdown-toggle ${openDropdown === 'courses' ? 'open' : ''}`}
                            onClick={() => toggleDropdown('courses')}
                            aria-expanded={openDropdown === 'courses'}
                        >
                            📚 {currentCourse ? getCourseName(currentCourse) : t('courses.title')} ▾
                        </button>
                        {openDropdown === 'courses' && (
                            <ul className="dropdown-menu glass">
                                {courses.map(course => (
                                    <li key={course.id}>
                                        <Link
                                            to={`/matematika/${course.id}`}
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

                {/* En página de temas o contenido: mostrar dropdown de temas */}
                {(isTopicsPage || isContentPage) && currentCourse && (
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
                                {currentCourse.topics.map(topic => (
                                    <li key={topic.id}>
                                        {topic.active ? (
                                            <Link
                                                to={`/matematika/${courseId}/${topic.id}`}
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

                {/* En página de contenido: mostrar secciones del tema */}
                {isContentPage && contentBasePath && (
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
