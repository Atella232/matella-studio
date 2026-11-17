import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { HistogramGame } from '../../batx1-zientziak-estatistika/games/BachStatsGames'
import { BoxGame } from '../../dbh4-games/StatisticsGames'
import { createSocialStatsMemoryBoard, SOCIAL_STATS_MEMORY_PAIRS } from './boards'
import { createSocialStatsDetectiveCases, SOCIAL_STATS_DETECTIVE_CASES, socialStatsDetectiveNames, socialStatsDetectiveTips } from './detective'
import { SocialStatsGameArt } from './GameArt'
import { SOCIAL_STATS_GAME_RECORDS_KEY, socialStatsGameModeForPath, socialStatsGames, socialStatsGameSlugs, type SocialStatsGameId } from './info'
import { SocialStatsRaceGame } from './RaceGame'
import { HuntGame, QualityGame } from './SocialStatsGames'

const info = (id: SocialStatsGameId) => socialStatsGames.find((game) => game.id === id)!
const art = (id: SocialStatsGameId) => <SocialStatsGameArt game={id} />

const components: Record<SocialStatsGameId, (props: GameProps) => JSX.Element> = {
    race: SocialStatsRaceGame,
    quality: (props) => <QualityGame {...props} game={info('quality')} art={art('quality')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOCIAL_STATS_DETECTIVE_CASES, createCases: createSocialStatsDetectiveCases, names: socialStatsDetectiveNames, tips: socialStatsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOCIAL_STATS_MEMORY_PAIRS, createBoard: createSocialStatsMemoryBoard }} />,
    // «Which histogram?» of 1.º Ciencias and the 4. DBH box plot, with this unit's progress ids
    histogram: (props) => <HistogramGame {...props} game={info('histogram')} art={art('histogram')} />,
    box: (props) => <BoxGame {...props} game={info('box')} art={art('box')} />
}

const hubGames: HubGame<SocialStatsGameId>[] = socialStatsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocialStatsGames({ language, pathname, openGame, completedIds, onComplete }: {
    language: UnitLanguage
    pathname: string
    openGame: (slug: string | null) => void
    completedIds: number[]
    onComplete: (id: number) => void
}) {
    return (
        <GamesHub
            language={language}
            games={hubGames}
            recordsKey={SOCIAL_STATS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socialStatsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socialStatsGameSlugs[mode])}
        />
    )
}
