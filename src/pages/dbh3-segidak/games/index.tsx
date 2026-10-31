import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createSequencesMemoryBoard, SEQUENCES_MEMORY_PAIRS } from './boards'
import { DetectiveGame } from './DetectiveGame'
import { SequencesGameArt } from './GameArt'
import { HiddenGame } from './HiddenGame'
import { SEQUENCES_GAME_RECORDS_KEY, sequencesGameModeForPath, sequencesGames, sequencesGameSlugs, type SequencesGameId } from './info'
import { SequencesRaceGame } from './RaceGame'
import { SorterGame } from './SorterGame'
import { StaircaseGame } from './StaircaseGame'

const memoryGame = sequencesGames.find((game) => game.id === 'memory')!

const components: Record<SequencesGameId, (props: GameProps) => JSX.Element> = {
    race: SequencesRaceGame,
    hidden: HiddenGame,
    sorter: SorterGame,
    staircase: StaircaseGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <SequencesGameArt game="memory" />, pairs: SEQUENCES_MEMORY_PAIRS, createBoard: createSequencesMemoryBoard }} />
}

const hubGames: HubGame<SequencesGameId>[] = sequencesGames.map((info) => ({ info, art: <SequencesGameArt game={info.id} />, component: components[info.id] }))

export function SequencesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SEQUENCES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={sequencesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : sequencesGameSlugs[mode])}
        />
    )
}
