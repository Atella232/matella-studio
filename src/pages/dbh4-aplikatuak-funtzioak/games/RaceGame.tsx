import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GraphFigure } from '../../dbh2-funtzioak-v2/graphs'
import { FunctionsGameArt } from './GameArt'
import { functionsGames } from './info'
import { checkFunctionsPitAnswer, functionsParTime, functionsRaceErrorTips, generateFunctionsRaceQuestion, type FunctionsRaceError, type FunctionsRaceQuestion } from './race'

const functionsRace: RaceRules<FunctionsRaceError> = {
    game: functionsGames.find((item) => item.id === 'race')!,
    generate: generateFunctionsRaceQuestion,
    checkPit: checkFunctionsPitAnswer,
    parTime: functionsParTime,
    errorTip: (error) => functionsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3 edo 2,5.', es: 'Escribe un número, por ejemplo −3 o 2,5.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 2.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' },
    figure: (question, language) => {
        const { graph } = question as FunctionsRaceQuestion
        return graph ? <div className="functions-race-graph"><GraphFigure spec={graph} language={language} maxHeight={250} /></div> : null
    }
}

export function FunctionsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={functionsRace} art={<FunctionsGameArt game="race" />} />
}
