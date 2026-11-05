import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { PlaceGameView } from '../../dbh4-aplikatuak-errealak/games/PlaceGame'
import { IntervalGame } from '../../dbh4-games/IntervalGame'
import { LogGame, RadicalGame } from '../../dbh4-games/PowerGames'
import { CoefficientGame, TargetGame } from './BachRealsGames'
import { BACH_REALS_MEMORY_PAIRS, createBachRealsMemoryBoard } from './boards'
import { BACH_REALS_DETECTIVE_CASES, bachRealsDetectiveNames, bachRealsDetectiveTips, createBachRealsDetectiveCases } from './detective'
import { BachRealsGameArt } from './GameArt'
import { BACH_REALS_GAME_RECORDS_KEY, bachRealsGameModeForPath, bachRealsGames, bachRealsGameSlugs, type BachRealsGameId } from './info'
import { BachRealsRaceGame } from './RaceGame'

const info = (id: BachRealsGameId) => bachRealsGames.find((game) => game.id === id)!

const components: Record<BachRealsGameId, (props: GameProps) => JSX.Element> = {
    race: BachRealsRaceGame,
    target: (props) => <TargetGame {...props} game={info('target')} art={<BachRealsGameArt game="target" />} />,
    coefficient: (props) => <CoefficientGame {...props} game={info('coefficient')} art={<BachRealsGameArt game="coefficient" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: <BachRealsGameArt game="detective" />, cases: BACH_REALS_DETECTIVE_CASES, createCases: createBachRealsDetectiveCases, names: bachRealsDetectiveNames, tips: bachRealsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: <BachRealsGameArt game="memory" />, pairs: BACH_REALS_MEMORY_PAIRS, createBoard: createBachRealsMemoryBoard }} />,
    place: (props) => <PlaceGameView {...props} game={info('place')} />,
    intervals: (props) => <IntervalGame {...props} game={info('intervals')} art={<BachRealsGameArt game="intervals" />} track="academic" />,
    radical: (props) => <RadicalGame {...props} game={info('radical')} art={<BachRealsGameArt game="radical" />} />,
    log: (props) => <LogGame {...props} game={info('log')} art={<BachRealsGameArt game="log" />} />
}

const hubGames: HubGame<BachRealsGameId>[] = bachRealsGames.map((game) => ({ info: game, art: <BachRealsGameArt game={game.id} />, component: components[game.id] }))

export function BachRealsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_REALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachRealsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachRealsGameSlugs[mode])}
        />
    )
}
