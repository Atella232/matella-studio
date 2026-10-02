import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createRealsMemoryBoard, REALS_MEMORY_PAIRS } from './boards'
import { RealsGameArt } from './GameArt'
import { REALS_GAME_RECORDS_KEY, realsGameModeForPath, realsGames, realsGameSlugs, type RealsGameId } from './info'
import { PlaceGame } from './PlaceGame'
import { RealsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = realsGames.find((game) => game.id === 'memory')!

const components: Record<RealsGameId, (props: GameProps) => JSX.Element> = {
    race: RealsRaceGame,
    place: PlaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <RealsGameArt game="memory" />, pairs: REALS_MEMORY_PAIRS, createBoard: createRealsMemoryBoard }} />
}

const hubGames: HubGame<RealsGameId>[] = realsGames.map((info) => ({ info, art: <RealsGameArt game={info.id} />, component: components[info.id] }))

export function RealsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={REALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbaki errealekin', es: 'Juega con los números reales', ar: 'العب بالأعداد الحقيقية' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={realsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : realsGameSlugs[mode])}
        />
    )
}
