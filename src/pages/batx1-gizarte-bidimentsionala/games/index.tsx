import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { SignGame } from '../../batx1-zientziak-bidimentsionala/games/BivarGames'
import { CloudGame } from '../../dbh4-games/StatisticsGames'
import { createSocialBivarMemoryBoard, SOCIAL_BIVAR_MEMORY_PAIRS } from './boards'
import { createSocialBivarDetectiveCases, SOCIAL_BIVAR_DETECTIVE_CASES, socialBivarDetectiveNames, socialBivarDetectiveTips } from './detective'
import { SocialBivarGameArt } from './GameArt'
import { SOCIAL_BIVAR_GAME_RECORDS_KEY, socialBivarGameModeForPath, socialBivarGames, socialBivarGameSlugs, type SocialBivarGameId } from './info'
import { SocialBivarRaceGame } from './RaceGame'
import { PredictGame, WhichRGame } from './SocialBivarGames'

const info = (id: SocialBivarGameId) => socialBivarGames.find((game) => game.id === id)!
const art = (id: SocialBivarGameId) => <SocialBivarGameArt game={id} />

const components: Record<SocialBivarGameId, (props: GameProps) => JSX.Element> = {
    race: SocialBivarRaceGame,
    'which-r': (props) => <WhichRGame {...props} game={info('which-r')} art={art('which-r')} />,
    predict: (props) => <PredictGame {...props} game={info('predict')} art={art('predict')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOCIAL_BIVAR_DETECTIVE_CASES, createCases: createSocialBivarDetectiveCases, names: socialBivarDetectiveNames, tips: socialBivarDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOCIAL_BIVAR_MEMORY_PAIRS, createBoard: createSocialBivarMemoryBoard }} />,
    // The sign of the covariance of 1.º Ciencias and «guess the correlation» of 4. DBH, with this unit's progress ids
    sign: (props) => <SignGame {...props} game={info('sign')} art={art('sign')} />,
    cloud: (props) => <CloudGame {...props} game={info('cloud')} art={art('cloud')} />
}

const hubGames: HubGame<SocialBivarGameId>[] = socialBivarGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocialBivarGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOCIAL_BIVAR_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socialBivarGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socialBivarGameSlugs[mode])}
        />
    )
}
