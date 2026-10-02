import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { LineSpecFigure } from '../lineFigure'
import { RealsGameArt } from './GameArt'
import { realsGames } from './info'
import { checkRealsPitAnswer, generateRealsRaceQuestion, realsParTime, realsRaceErrorTips, type RealsRaceError, type RealsRaceQuestion } from './race'

const realsRace: RaceRules<RealsRaceError> = {
    game: realsGames.find((item) => item.id === 'race')!,
    generate: generateRealsRaceQuestion,
    checkPit: checkRealsPitAnswer,
    parTime: realsParTime,
    errorTip: (error) => realsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/2',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' },
    figure: (question, language) => {
        const { line } = question as RealsRaceQuestion
        return line ? <div className="reals-race-line"><LineSpecFigure spec={line} language={language} /></div> : null
    }
}

export function RealsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={realsRace} art={<RealsGameArt game="race" />} />
}
