import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { TrianglesGameArt } from './GameArt'
import { trianglesGames } from './info'
import { checkTrianglesPitAnswer, generateTrianglesRaceQuestion, trianglesParTime, trianglesRaceErrorTips, type TrianglesRaceError } from './race'

const trianglesRace: RaceRules<TrianglesRaceError> = {
    game: trianglesGames.find((item) => item.id === 'race')!,
    generate: generateTrianglesRaceQuestion,
    checkPit: checkTrianglesPitAnswer,
    parTime: trianglesParTime,
    errorTip: (error) => trianglesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '120',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 120, 0,5 edo −5/13.', es: 'Escribe un número o una fracción, por ejemplo 120, 0,5 o −5/13.', en: 'Write a number or a fraction, for example 120, 0.5 or −5/13.', ar: 'اكتب عددًا أو كسرًا، مثل 120 أو 0.5 أو ⁦−5/13⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function TrianglesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={trianglesRace} art={<TrianglesGameArt game="race" />} />
}
