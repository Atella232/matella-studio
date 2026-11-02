import { useMemo, type JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createTrigonometryMemoryBoard, TRIGONOMETRY_MEMORY_PAIRS } from './boards'
import { TrigonometryGameArt } from './GameArt'
import { TRIGONOMETRY_GAME_RECORDS_KEY, trigonometryGameModeForPath, trigonometryGames, trigonometryGameSlugs, type TrigonometryGameId } from './info'
import { TrigonometryRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { OtherRatiosGame, UnitCircleGame } from '../../dbh4-games/TrigGames'
import { createTrigDetectiveCases, TRIG_DETECTIVE_CASES, trigDetectiveNames, trigDetectiveTips } from '../../dbh4-games/trigDetective'
import { localize } from '../text'

const memoryGame = trigonometryGames.find((game) => game.id === 'memory')!

const components: Record<TrigonometryGameId, (props: GameProps) => JSX.Element> = {
    race: TrigonometryRaceGame,
    circle: (props) => <UnitCircleGame {...props} game={trigonometryGames.find((game) => game.id === 'circle')!} art={<TrigonometryGameArt game="circle" language={props.language} />} />,
    ratios: (props) => <OtherRatiosGame {...props} game={trigonometryGames.find((game) => game.id === 'ratios')!} art={<TrigonometryGameArt game="ratios" language={props.language} />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: trigonometryGames.find((game) => game.id === 'detective')!, art: <TrigonometryGameArt game="detective" language={props.language} />, cases: TRIG_DETECTIVE_CASES, createCases: createTrigDetectiveCases, names: trigDetectiveNames, tips: trigDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <TrigonometryGameArt game="memory" language={props.language} />, pairs: TRIGONOMETRY_MEMORY_PAIRS, createBoard: createTrigonometryMemoryBoard }} />
}

const hubGames = (language: UnitLanguage): HubGame<TrigonometryGameId>[] => trigonometryGames.map((info) => ({ info, art: <TrigonometryGameArt game={info.id} language={language} />, component: components[info.id] }))

export function TrigonometryGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={TRIGONOMETRY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={trigonometryGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : trigonometryGameSlugs[mode])}
        />
    )
}
