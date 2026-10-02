import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { LineSpecFigure } from '../../dbh4-aplikatuak-errealak/lineFigure'
import { percentGames } from './info'
import { checkPercentPitAnswer, generatePercentRaceQuestion, percentParTime, percentRaceErrorTips, type PercentRaceError, type PercentRaceQuestion } from './race'

const percentRace: RaceRules<PercentRaceError> = {
    game: percentGames.find((item) => item.id === 'race')!,
    generate: generatePercentRaceQuestion,
    checkPit: checkPercentPitAnswer,
    parTime: percentParTime,
    errorTip: (error) => percentRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '17,5',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' },
    figure: (question, language) => {
        const { line } = question as PercentRaceQuestion
        return line ? <div className="reals-race-line"><LineSpecFigure spec={line} language={language} /></div> : null
    }
}

export function PercentRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={percentRace} art={<RealsGameArt game="race" />} />
}
