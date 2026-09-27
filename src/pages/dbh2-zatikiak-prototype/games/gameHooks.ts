import { useGameRecords as useUnitGameRecords } from '../../../features/unit-v2/games/gameHooks'
import { GAME_RECORDS_KEY } from './records'

export { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'

export const useGameRecords = () => useUnitGameRecords(GAME_RECORDS_KEY)
