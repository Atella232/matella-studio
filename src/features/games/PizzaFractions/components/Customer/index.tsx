import './Customer.css'

interface CustomerProps {
    avatar: string
    mood: 'neutral' | 'happy' | 'confused' | 'celebrating'
}

export function Customer({ avatar, mood }: CustomerProps) {
    const getReactionEmoji = () => {
        switch (mood) {
            case 'happy':
                return '👍'
            case 'celebrating':
                return '🎉'
            case 'confused':
                return '❓'
            default:
                return null
        }
    }

    return (
        <div className="customer-container">
            <div
                className={`customer-avatar ${mood}`}
                role="img"
                aria-label={`Cliente con expresión ${mood}`}
            >
                {avatar}
            </div>
            {mood !== 'neutral' && (
                <span className="customer-reaction" key={mood}>
                    {getReactionEmoji()}
                </span>
            )}
        </div>
    )
}
