import { useMemo, type JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createSimilarityMemoryBoard, SIMILARITY_MEMORY_PAIRS } from './boards'
import { SimilarityGameArt } from './GameArt'
import { SIMILARITY_GAME_RECORDS_KEY, similarityGameModeForPath, similarityGames, similarityGameSlugs, type SimilarityGameId } from './info'
import { SimilarityRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { createGeometryDetectiveCases, GEOMETRY_DETECTIVE_CASES, geometryDetectiveNames, geometryDetectiveTips } from '../../dbh4-games/geometryDetective'
import { MapGame, ScaleGame, TowerGame } from '../../dbh4-games/SimilarityGames'

const memoryGame = similarityGames.find((game) => game.id === 'memory')!

const components: Record<SimilarityGameId, (props: GameProps) => JSX.Element> = {
    race: SimilarityRaceGame,
    tower: (props) => <TowerGame {...props} game={similarityGames.find((game) => game.id === 'tower')!} art={<SimilarityGameArt game="tower" language={props.language} />} />,
    map: (props) => <MapGame {...props} game={similarityGames.find((game) => game.id === 'map')!} art={<SimilarityGameArt game="map" language={props.language} />} />,
    scale: (props) => <ScaleGame {...props} game={similarityGames.find((game) => game.id === 'scale')!} art={<SimilarityGameArt game="scale" language={props.language} />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: similarityGames.find((game) => game.id === 'detective')!, art: <SimilarityGameArt game="detective" language={props.language} />, cases: GEOMETRY_DETECTIVE_CASES, createCases: createGeometryDetectiveCases('similarity'), names: geometryDetectiveNames, tips: geometryDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <SimilarityGameArt game="memory" language={props.language} />, pairs: SIMILARITY_MEMORY_PAIRS, createBoard: createSimilarityMemoryBoard }} />
}

const hubGames = (language: UnitLanguage): HubGame<SimilarityGameId>[] => similarityGames.map((info) => ({ info, art: <SimilarityGameArt game={info.id} language={language} />, component: components[info.id] }))

export function SimilarityGames({ language, pathname, openGame, completedIds, onComplete }: {
    language: UnitLanguage
    pathname: string
    openGame: (slug: string | null) => void
    completedIds: number[]
    onComplete: (id: number) => void
}) {
    const games = useMemo(() => hubGames(language), [language])
    return (
        <GamesHub
            language={language}
            games={games}
            recordsKey={SIMILARITY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={similarityGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : similarityGameSlugs[mode])}
        />
    )
}
