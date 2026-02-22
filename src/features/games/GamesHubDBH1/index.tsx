import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './GamesHub.css'

interface GameInfo {
    id: string
    icon: string
    titleKey: string
    descriptionKey: string
    path: string
    tags: string[]
    objectives: string[]
}

const GAMES: GameInfo[] = [
    {
        id: 'pizza-fractions',
        icon: '🍕',
        titleKey: 'games.pizzaFractions.title',
        descriptionKey: 'games.pizzaFractions.description',
        path: '/matematika/dbh1/zatikiak/jokuak/pizza',
        tags: ['easyHard'],
        objectives: ['partOfWhole']
    },
    {
        id: 'fraction-memory',
        icon: '🃏',
        titleKey: 'games.fractionMemory.title',
        descriptionKey: 'games.fractionMemory.description',
        path: '/matematika/dbh1/zatikiak/jokuak/memory',
        tags: ['easyExpert'],
        objectives: ['equivalences']
    },
    {
        id: 'fraction-race',
        icon: '🏎️',
        titleKey: 'games.fractionRace.title',
        descriptionKey: 'games.fractionRace.description',
        path: '/matematika/dbh1/zatikiak/jokuak/carrera',
        tags: ['multiplayer'],
        objectives: ['speed']
    }
]

export function GamesHub() {
    const { t } = useTranslation()

    return (
        <div className="games-hub">
            <div className="container">
                <Link to="/matematika/dbh1/zatikiak/teoria" className="back-link">
                    ← {t('common.back')}
                </Link>

                <div className="games-header">
                    <h1>🎮 {t('nav.games')}</h1>
                    <p>{t('games.hub.subtitle')}</p>
                </div>

                <div className="games-grid">
                    {GAMES.map((game) => (
                        <Link key={game.id} to={game.path} className="game-card">
                            <div className="game-card-icon">{game.icon}</div>
                            <h2 className="game-card-title">{t(game.titleKey)}</h2>
                            <p className="game-card-description">{t(game.descriptionKey)}</p>
                            <div className="game-card-meta">
                                {game.tags.map((tag, i) => (
                                    <span key={i} className="game-card-tag">{t(`games.hub.tags.${tag}`)}</span>
                                ))}
                                {game.objectives.map((obj, i) => (
                                    <span key={i} className="game-card-tag objective">{t(`games.hub.objectives.${obj}`)}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
