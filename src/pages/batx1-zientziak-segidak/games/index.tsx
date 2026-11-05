import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { HiddenGame } from '../../dbh3-segidak/games/HiddenGame'
import { SorterGame } from '../../dbh3-segidak/games/SorterGame'
import { StaircaseGame } from '../../dbh3-segidak/games/StaircaseGame'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { BandGame, WhereGame } from './BachSequencesGames'
import { BACH_SEQUENCES_MEMORY_PAIRS, createBachSequencesMemoryBoard } from './boards'
import { BACH_SEQUENCES_DETECTIVE_CASES, bachSequencesDetectiveNames, bachSequencesDetectiveTips, createBachSequencesDetectiveCases } from './detective'
import { BachSequencesGameArt } from './GameArt'
import { BACH_SEQUENCES_GAME_RECORDS_KEY, bachSequencesGameModeForPath, bachSequencesGames, bachSequencesGameSlugs, type BachSequencesGameId } from './info'
import { BachSequencesRaceGame } from './RaceGame'

const info = (id: BachSequencesGameId) => bachSequencesGames.find((game) => game.id === id)!

const components: Record<BachSequencesGameId, (props: GameProps) => JSX.Element> = {
    race: BachSequencesRaceGame,
    where: (props) => <WhereGame {...props} game={info('where')} art={<BachSequencesGameArt game="where" />} />,
    band: (props) => <BandGame {...props} game={info('band')} art={<BachSequencesGameArt game="band" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: <BachSequencesGameArt game="detective" />, cases: BACH_SEQUENCES_DETECTIVE_CASES, createCases: createBachSequencesDetectiveCases, names: bachSequencesDetectiveNames, tips: bachSequencesDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: <BachSequencesGameArt game="memory" />, pairs: BACH_SEQUENCES_MEMORY_PAIRS, createBoard: createBachSequencesMemoryBoard }} />,
    // The 3. DBH games keep their own screens; the hub gives them this unit's progress ids
    hidden: HiddenGame,
    sorter: SorterGame,
    staircase: StaircaseGame
}

const hubGames: HubGame<BachSequencesGameId>[] = bachSequencesGames.map((game) => ({ info: game, art: <BachSequencesGameArt game={game.id} />, component: components[game.id] }))

export function BachSequencesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_SEQUENCES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachSequencesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachSequencesGameSlugs[mode])}
        />
    )
}
