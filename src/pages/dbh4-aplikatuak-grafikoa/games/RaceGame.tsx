import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GraphFigure } from '../../dbh2-funtzioak-v2/graphs'
import { GraphsGameArt } from './GameArt'
import { graphsGames } from './info'
import { checkGraphsPitAnswer, generateGraphsRaceQuestion, graphsParTime, graphsRaceErrorTips, type GraphsRaceError, type GraphsRaceQuestion } from './race'

const graphsRace: RaceRules<GraphsRaceError> = {
    game: graphsGames.find((item) => item.id === 'race')!,
    generate: generateGraphsRaceQuestion,
    checkPit: checkGraphsPitAnswer,
    parTime: graphsParTime,
    errorTip: (error) => graphsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3 edo 2,5.', es: 'Escribe un número, por ejemplo −3 o 2,5.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 2.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' },
    figure: (question, language) => {
        const { graph } = question as GraphsRaceQuestion
        return graph ? <div className="functions-race-graph"><GraphFigure spec={graph} language={language} maxHeight={250} /></div> : null
    }
}

export function GraphsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={graphsRace} art={<GraphsGameArt game="race" />} />
}
