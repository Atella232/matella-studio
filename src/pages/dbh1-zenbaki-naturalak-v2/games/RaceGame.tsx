import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { NaturalsGameArt } from './GameArt'
import { naturalsGames } from './info'
import { checkNaturalsPitAnswer, generateNaturalsRaceQuestion, naturalsParTime, naturalsRaceErrorTips, type NaturalsRaceError } from './race'

const naturalsRace: RaceRules<NaturalsRaceError> = {
    game: naturalsGames.find((item) => item.id === 'race')!,
    generate: generateNaturalsRaceQuestion,
    checkPit: checkNaturalsPitAnswer,
    parTime: naturalsParTime,
    errorTip: (error) => naturalsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '15.000',
    pitUnreadable: { eu: 'Idatzi zenbaki natural bat, adibidez 15.000.', es: 'Escribe un número natural, por ejemplo 15.000.', ar: 'اكتب عددًا طبيعيًا، مثل 15.000.' },
    pitWrongForm: { eu: 'Idatzi zenbaki natural gisa.', es: 'Escríbelo como número natural.', ar: 'اكتبه عددًا طبيعيًا.' }
}

export function NaturalsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={naturalsRace} art={<NaturalsGameArt game="race" />} />
}
