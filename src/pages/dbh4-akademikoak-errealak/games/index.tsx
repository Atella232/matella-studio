import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { PlaceGameView } from '../../dbh4-aplikatuak-errealak/games/PlaceGame'
import { createPercentMemoryBoard, PERCENT_MEMORY_PAIRS } from './boards'
import { PERCENT_GAME_RECORDS_KEY, percentGameModeForPath, percentGames, percentGameSlugs, type PercentGameId } from './info'
import { PercentRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { IntervalGame } from '../../dbh4-games/IntervalGame'
import { createRealsDetectiveCases, REALS_DETECTIVE_CASES, realsDetectiveNames, realsDetectiveTips } from '../../dbh4-games/realsDetective'
import { ChainArt, ChainGame } from '../../dbh4-games/PercentGames'

const memoryGame = percentGames.find((game) => game.id === 'memory')!
const placeGame = percentGames.find((game) => game.id === 'place')!

const components: Record<PercentGameId, (props: GameProps) => JSX.Element> = {
    race: PercentRaceGame,
    chain: (props) => <ChainGame {...props} game={percentGames.find((game) => game.id === 'chain')!} art={<ChainArt />} />,
    intervals: (props) => <IntervalGame {...props} game={percentGames.find((game) => game.id === 'intervals')!} art={<RealsGameArt game="intervals" />} track="academic" />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: percentGames.find((game) => game.id === 'detective')!, art: <RealsGameArt game="detective" />, cases: REALS_DETECTIVE_CASES, createCases: createRealsDetectiveCases('academic'), names: realsDetectiveNames, tips: realsDetectiveTips }} />,
    place: (props) => <PlaceGameView {...props} game={placeGame} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <RealsGameArt game="memory" />, pairs: PERCENT_MEMORY_PAIRS, createBoard: createPercentMemoryBoard }} />
}

// The art of the applied unit, but chained percentages are only here
const hubGames: HubGame<PercentGameId>[] = percentGames.map((info) => ({ info, art: info.id === 'chain' ? <ChainArt /> : <RealsGameArt game={info.id} />, component: components[info.id] }))

export function PercentGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PERCENT_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu errealekin eta ehunekoekin', es: 'Juega con reales y porcentajes', en: 'Play with real numbers and percentages', ar: 'العب بالأعداد الحقيقية والنسب' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={percentGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : percentGameSlugs[mode])}
        />
    )
}
