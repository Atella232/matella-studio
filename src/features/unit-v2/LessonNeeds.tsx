import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MathText } from '../../components/MathText'
import { getCourseById, getTopicById } from '../../data/courses'
import { pickText, type LessonNeed, type UnitLanguage } from './types'
import './LessonNeeds.css'

type Named = { name: string; nameEu: string; nameEn: string; nameAr: string }

const nameIn = (language: UnitLanguage, item: Named) =>
    ({ eu: item.nameEu, es: item.name, en: item.nameEn, ar: item.nameAr })[language]

/**
 * «Before you start, review…»: the lessons of earlier units this one builds on, under the goal.
 * Each link names its unit, and its course when it is not the one of the lesson.
 */
export function LessonNeeds({ needs, language, coursePath }: { needs: LessonNeed[]; language: UnitLanguage; coursePath: string }) {
    const currentCourse = coursePath.split('/').filter(Boolean).pop()
    return (
        <p className="lesson-needs">
            <span className="lesson-needs-label">{pickText(language, { eu: 'Hasi aurretik, errepasatu:', es: 'Antes de empezar, repasa:', en: 'Before you start, review:', ar: 'قبل أن تبدأ، راجع:' })}</span>{' '}
            {needs.map((need, index) => {
                const [courseId, unitId] = need.unit.split('/')
                const unit = getTopicById(courseId, unitId)
                const course = courseId !== currentCourse ? getCourseById(courseId) : undefined
                const where = [unit && nameIn(language, unit), course && nameIn(language, course)].filter(Boolean).join(', ')
                return (
                    <Fragment key={`${need.unit}/${need.topic}`}>
                        {index > 0 && '; '}
                        {/* Another unit opens where this page was scrolled: start it at the top */}
                        <Link to={`/matematika/${need.unit}/teoria/${need.topic}`} onClick={() => window.scrollTo({ top: 0 })}><MathText text={pickText(language, need.title)} inline /></Link>
                        {where && <span className="lesson-needs-where"> ({where})</span>}
                    </Fragment>
                )
            })}
        </p>
    )
}
