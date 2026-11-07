import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { localize } from '../text'
import { COMPLEX_MEMORY_PAIRS, createComplexMemoryBoard } from './boards'
import { AffixGame, HuntGame, TwistGame } from './ComplexGames'
import { COMPLEX_DETECTIVE_CASES, complexDetectiveNames, complexDetectiveTips, createComplexDetectiveCases } from './detective'
import { KonplexuakBatx1zGameArt } from './GameArt'
import { KONPLEXUAK_BATX1Z_GAME_RECORDS_KEY, konplexuakBatx1zGameModeForPath, konplexuakBatx1zGames, konplexuakBatx1zGameSlugs, type KonplexuakBatx1zGameId } from './info'
import { KonplexuakBatx1zRaceGame } from './RaceGame'

const info = (id: KonplexuakBatx1zGameId) => konplexuakBatx1zGames.find((game) => game.id === id)!
const art = (id: KonplexuakBatx1zGameId) => <KonplexuakBatx1zGameArt game={id} />

const components: Record<KonplexuakBatx1zGameId, (props: GameProps) => JSX.Element> = {
    race: KonplexuakBatx1zRaceGame,
    affix: (props) => <AffixGame {...props} game={info('affix')} art={art('affix')} />,
    twist: (props) => <TwistGame {...props} game={info('twist')} art={art('twist')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    // The lines write \sen and \tg: each language gets its names before the game draws them
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: COMPLEX_DETECTIVE_CASES, createCases: createComplexDetectiveCases, names: complexDetectiveNames, tips: complexDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: COMPLEX_MEMORY_PAIRS, createBoard: createComplexMemoryBoard }} />
}

const hubGames: HubGame<KonplexuakBatx1zGameId>[] = konplexuakBatx1zGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function KonplexuakBatx1zGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={KONPLEXUAK_BATX1Z_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={konplexuakBatx1zGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : konplexuakBatx1zGameSlugs[mode])}
        />
    )
}
