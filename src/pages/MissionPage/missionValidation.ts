import { answerEquals, fraction, type FractionValue } from '../../features/fractions/fractionMath'

export const MISSION_EXPECTED_ANSWERS: Record<number, FractionValue> = {
    1: fraction(18),
    2: fraction(3, 4),
    3: fraction(3, 8),
    4: fraction(3, 4),
    5: fraction(5, 12),
    6: fraction(5, 3),
    7: fraction(3, 5),
    8: fraction(35),
    9: fraction(18),
    10: fraction(90),
    11: fraction(1200),
    12: fraction(6000)
}

export function validateMissionAnswer(challengeId: number, answer: string): boolean {
    const expected = MISSION_EXPECTED_ANSWERS[challengeId]
    return expected ? answerEquals(answer, expected) : false
}
