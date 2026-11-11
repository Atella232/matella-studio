import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SistemakGameArt } from './GameArt'
import { sistemakGames } from './info'
import { checkSistemakPitAnswer, generateSistemakRaceQuestion, sistemakParTime, sistemakRaceErrorTips, type SistemakRaceError } from './race'

const sistemakRace: RaceRules<SistemakRaceError> = {
    game: sistemakGames.find((item) => item.id === 'race')!,
    generate: generateSistemakRaceQuestion,
    checkPit: checkSistemakPitAnswer,
    parTime: sistemakParTime,
    errorTip: (error) => sistemakRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SistemakRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={sistemakRace} art={<SistemakGameArt game="race" />} />
}
