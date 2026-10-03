import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { FiguresGameArt } from './GameArt'
import { figuresGames } from './info'
import { checkFiguresPitAnswer, figuresParTime, figuresRaceErrorTips, generateFiguresRaceQuestion, type FiguresRaceError } from './race'

const figuresRace: RaceRules<FiguresRaceError> = {
    game: figuresGames.find((item) => item.id === 'race')!,
    generate: generateFiguresRaceQuestion,
    checkPit: checkFiguresPitAnswer,
    parTime: figuresParTime,
    errorTip: (error) => figuresRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '135',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 135 edo 18,84.', es: 'Escribe un número, por ejemplo 135 o 18,84.', ar: 'اكتب عددًا، مثل 135 أو 18.84.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function FiguresRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={figuresRace} art={<FiguresGameArt game="race" />} />
}
