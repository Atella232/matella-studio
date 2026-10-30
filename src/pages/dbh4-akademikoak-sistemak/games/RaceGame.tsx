import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SystemsGameArt } from './GameArt'
import { systemsGames } from './info'
import { checkSystemsPitAnswer, systemsParTime, systemsRaceErrorTips, generateSystemsRaceQuestion, type SystemsRaceError } from './race'

const systemsRace: RaceRules<SystemsRaceError> = {
    game: systemsGames.find((item) => item.id === 'race')!,
    generate: generateSystemsRaceQuestion,
    checkPit: checkSystemsPitAnswer,
    parTime: systemsParTime,
    errorTip: (error) => systemsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3 edo 5/2.', es: 'Escribe un número o una fracción, por ejemplo −3 o 5/2.', en: 'Write a number or a fraction, for example −3 or 5/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 5/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SystemsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={systemsRace} art={<SystemsGameArt game="race" />} />
}
