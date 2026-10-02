import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { rationalsGames } from './info'
import { checkRationalsPitAnswer, generateRationalsRaceQuestion, rationalsParTime, rationalsRaceErrorTips, type RationalsRaceError } from './race'

const rationalsRace: RaceRules<RationalsRaceError> = {
    game: rationalsGames.find((item) => item.id === 'race')!,
    generate: generateRationalsRaceQuestion,
    checkPit: checkRationalsPitAnswer,
    parTime: rationalsParTime,
    errorTip: (error) => rationalsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−7/2',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3 edo 3/2.', es: 'Escribe un número o una fracción, por ejemplo −3 o 3/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 3/2.' },
    pitWrongForm: { eu: 'Idatzi zatiki laburtezin gisa.', es: 'Escríbelo como fracción irreducible.', ar: 'اكتبه كسرًا في أبسط صورة.' }
}

export function RationalsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={rationalsRace} art={<RealsGameArt game="race" caption="3/4 · −5/6 · 7/2" />} />
}
