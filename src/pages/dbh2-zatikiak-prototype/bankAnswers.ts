import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ExerciseAnswer } from '../../features/unit-v2/types.ts'

/*
 * Exercises of the Zatikiak bank with a single numeric result, keyed
 * "section#item". The bank checks these instead of asking the student;
 * the rest (classify, order, justify…) keep the self-assessment.
 */
export const fractionBankAnswers: Record<string, ExerciseAnswer> = {
    'representacion#1': { expected: fraction(7, 12) },
    // The mixed number is the given value: ask for the improper fraction itself
    'representacion#3': {
        expected: fraction(17, 5),
        form: 'simplified',
        formMessage: {
            eu: 'Balioa zuzena da, baina ariketak zatiki inpropio bat eskatzen du: zenbakitzailea izendatzailea baino handiagoa, zati osorik gabe.',
            es: 'El valor es correcto, pero el ejercicio pide una fracción impropia: numerador mayor que el denominador, sin parte entera.',
            ar: 'القيمة صحيحة، لكن التمرين يطلب كسرًا غير حقيقي: بسط أكبر من المقام ومن دون جزء صحيح.'
        }
    },
    'representacion#4': { expected: fraction(29, 6), form: 'mixed' },
    'equivalentes#1': { expected: fraction(12) },
    'equivalentes#2': { expected: fraction(3, 4), form: 'simplified' },
    'equivalentes#4': { expected: fraction(2, 3), form: 'simplified' },
    'equivalentes#6': { expected: fraction(15) },
    'comparacion#6': { expected: fraction(7) },
    'suma-resta#1': { expected: fraction(1, 2) },
    'suma-resta#2': { expected: fraction(7, 12) },
    'suma-resta#3': { expected: fraction(7, 12), form: 'simplified' },
    'suma-resta#4': { expected: fraction(19, 18) },
    'suma-resta#5': { expected: fraction(43, 24) },
    'suma-resta#6': { expected: fraction(-7, 20) },
    'producto-division#1': { expected: fraction(3, 10) },
    'producto-division#2': { expected: fraction(15, 14) },
    'producto-division#3': { expected: fraction(2, 5) },
    'producto-division#4': { expected: fraction(-5, 6) },
    'producto-division#5': { expected: fraction(-1) },
    'producto-division#6': { expected: fraction(120) },
    'potencias#1': { expected: fraction(8, 27) },
    'potencias#2': { expected: fraction(9, 25) },
    'potencias#3': { expected: fraction(2, 3) },
    'potencias#4': { expected: fraction(1, 4) },
    'potencias#5': { expected: fraction(2) },
    'potencias#6': { expected: fraction(-1, 4) },
    'problemas#1': { expected: fraction(5, 12) },
    'problemas#2': { expected: fraction(12) },
    'problemas#3': { expected: fraction(5, 8) },
    'problemas#4': { expected: fraction(138) },
    'problemas#5': { expected: fraction(280) },
    'problemas#6': { expected: fraction(40) }
}
