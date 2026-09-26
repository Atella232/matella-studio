import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { fixMaybeText } from '../../../utils/fixText'
import './SubjectCard.css'

interface SubjectCardProps {
    to?: string
    icon: string
    title: string
    description: string
    color: string
    disabled?: boolean
    disabledLabel?: string
}

export function SubjectCard({
    to,
    icon,
    title,
    description,
    color,
    disabled = false,
    disabledLabel = 'Próximamente'
}: SubjectCardProps) {
    const cardStyle = { '--card-color': color } as CSSProperties
    const cardContent = (
        <>
            <div className="subject-card-icon" aria-hidden="true">
                {fixMaybeText(icon)}
            </div>
            <div className="subject-card-content">
                <h3 className="subject-card-title">{fixMaybeText(title)}</h3>
                <p className="subject-card-description">{fixMaybeText(description)}</p>
            </div>
            {disabled && (
                <span className="subject-card-badge">{disabledLabel}</span>
            )}
            {!disabled && (
                <span className="subject-card-arrow">→</span>
            )}
        </>
    )

    if (disabled || !to) {
        return (
            <div className={`subject-card glass ${disabled ? 'disabled' : ''}`} style={cardStyle}>
                {cardContent}
            </div>
        )
    }

    return (
        <Link to={to} className="subject-card glass" style={cardStyle}>
            {cardContent}
        </Link>
    )
}
