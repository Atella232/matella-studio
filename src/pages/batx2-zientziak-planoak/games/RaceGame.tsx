import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { LinesPlanesGameArt } from './GameArt'
import { linesPlanesGames } from './info'
import { checkPlanesPitAnswer, generatePlanesRaceQuestion, planesParTime, planesRaceErrorTips, type PlanesRaceError } from './race'

const planesRace: RaceRules<PlanesRaceError> = {
    game: linesPlanesGames.find((item) => item.id === 'race')!,
    generate: generatePlanesRaceQuestion,
    checkPit: checkPlanesPitAnswer,
    parTime: planesParTime,
    errorTip: (error) => planesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function LinesPlanesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={planesRace} art={<LinesPlanesGameArt game="race" />} />
}
