import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Zubiaren zaindaria (El guardián del puente, 3. DBH): numbers arrive one
   by one and the learner sends each to the left (rational) or to the right
   (irrational). Level 1 has the clear ones, level 2 the decimals and the
   famous approximations (3,14 and 22/7 are rational, π is not), and level 3
   the traps: products and quotients of roots that turn out whole, and sums
   of roots that do not.
   ========================================================================== */

export const GUARD_ITEMS = 10

export type GuardKind =
    | 'fraction'
    | 'exact-decimal'
    | 'periodic'
    | 'root-exact'
    | 'root-inexact'
    | 'pi'
    | 'endless'
    | 'whole-result'
    | 'irrational-result'

export interface GuardItem {
    latex: string
    rational: boolean
    kind: GuardKind
    /** What the number turns out to be, when the kind shows it (√9 = 3) */
    equals?: string
}

const rational = (latex: string, kind: GuardKind, equals?: string): GuardItem => ({ latex, rational: true, kind, equals })
const irrational = (latex: string, kind: GuardKind, equals?: string): GuardItem => ({ latex, rational: false, kind, equals })

const POOLS: GuardItem[][] = [
    [
        rational('\\frac{3}{4}', 'fraction'), rational('0{,}5', 'exact-decimal', '\\frac{1}{2}'), rational('\\sqrt{9}', 'root-exact', '3'), rational('-\\frac{7}{3}', 'fraction'),
        rational('\\frac{5}{2}', 'fraction'), rational('\\sqrt{16}', 'root-exact', '4'), rational('2{,}75', 'exact-decimal', '\\frac{11}{4}'), rational('\\sqrt{100}', 'root-exact', '10'),
        irrational('\\sqrt{2}', 'root-inexact'), irrational('\\pi', 'pi'), irrational('\\sqrt{3}', 'root-inexact'), irrational('\\sqrt{5}', 'root-inexact'),
        irrational('\\sqrt{7}', 'root-inexact'), irrational('\\sqrt{10}', 'root-inexact')
    ],
    [
        rational('0{,}\\overline{3}', 'periodic', '\\frac{1}{3}'), rational('3{,}14', 'exact-decimal', '\\frac{157}{50}'), rational('\\frac{22}{7}', 'fraction'), rational('1{,}\\overline{27}', 'periodic', '\\frac{14}{11}'),
        rational('2{,}\\overline{5}', 'periodic', '\\frac{23}{9}'), rational('-0{,}8', 'exact-decimal', '-\\frac{4}{5}'), rational('\\sqrt{\\frac{4}{9}}', 'root-exact', '\\frac{2}{3}'), rational('\\sqrt{0{,}25}', 'root-exact', '0{,}5'),
        irrational('\\pi', 'pi'), irrational('\\sqrt{12}', 'root-inexact'), irrational('\\sqrt{20}', 'root-inexact'), irrational('1{,}01001000100001\\ldots', 'endless'),
        irrational('0{,}123456789101112\\ldots', 'endless'), irrational('\\pi+1', 'pi'), irrational('2\\pi', 'pi')
    ],
    [
        rational('\\sqrt{2}\\cdot\\sqrt{8}', 'whole-result', '\\sqrt{16}=4'), rational('(\\sqrt{3})^{2}', 'whole-result', '3'), rational('\\sqrt{12}:\\sqrt{3}', 'whole-result', '\\sqrt{4}=2'), rational('\\sqrt{18}:\\sqrt{2}', 'whole-result', '\\sqrt{9}=3'),
        rational('\\sqrt{5}\\cdot\\sqrt{20}', 'whole-result', '\\sqrt{100}=10'), rational('\\frac{\\sqrt{2}}{\\sqrt{2}}', 'whole-result', '1'),
        irrational('2\\sqrt{2}', 'irrational-result'), irrational('\\sqrt{2}\\cdot\\sqrt{3}', 'irrational-result', '\\sqrt{6}'), irrational('\\sqrt{8}-\\sqrt{2}', 'irrational-result', '2\\sqrt{2}-\\sqrt{2}=\\sqrt{2}'),
        irrational('\\frac{1}{\\sqrt{2}}', 'irrational-result', '\\frac{\\sqrt{2}}{2}'), irrational('\\sqrt{2}+\\sqrt{3}', 'irrational-result'), irrational('3\\pi', 'pi'), irrational('\\sqrt{50}', 'root-inexact', '5\\sqrt{2}')
    ]
]

export const guardPool = (level: number): GuardItem[] => POOLS[level] ?? POOLS[0]

/** Ten different numbers, about half of each kind */
export function createGuardItems(random: Random, level: number): GuardItem[] {
    const pool = guardPool(level)
    const rationals = shuffle(random, pool.filter((item) => item.rational))
    const irrationals = shuffle(random, pool.filter((item) => !item.rational))
    const rationalCount = pick(random, [4, 5, 5, 6])
    return shuffle(random, [...rationals.slice(0, rationalCount), ...irrationals.slice(0, GUARD_ITEMS - rationalCount)])
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })

/** Why the number is rational or irrational */
export function guardWhy(item: GuardItem): LocalizedText {
    const eq = item.equals ? ` $${item.latex}=${item.equals}$.` : ''
    switch (item.kind) {
        case 'fraction': return say('Zatiki bat da: arrazionala.', 'Es una fracción: racional.', 'إنه كسر: نسبي.')
        case 'exact-decimal': return say(`Hamartar zehatza: zatiki bat da.${eq}`, `Decimal exacto: se puede escribir como fracción.${eq}`, `عشري صحيح: يمكن كتابته كسرًا.${eq}`)
        case 'periodic': return say(`Hamartar periodikoa: zatiki sortzailea du.${eq}`, `Decimal periódico: tiene fracción generatriz.${eq}`, `عشري دوري: له كسر مولّد.${eq}`)
        case 'root-exact': return say(`Karratu perfektuaren erroa: zenbaki arrazionala.${eq}`, `Raíz de un cuadrado perfecto: número racional.${eq}`, `جذر مربع كامل: عدد نسبي.${eq}`)
        case 'root-inexact': return say(`Karratu perfektua ez denaren erroa: irrazionala.${eq}`, `Raíz de un número que no es cuadrado perfecto: irracional.${eq}`, `جذر عدد ليس مربعًا كاملًا: غير نسبي.${eq}`)
        case 'pi': return say('$\\pi$ irrazionala da; hari batuz edo biderkatuz ere irrazionala da.', '$\\pi$ es irracional; sumarle algo o multiplicarlo por un racional sigue siendo irracional.', '$\\pi$ غير نسبي؛ وجمعه أو ضربه في نسبي يبقى غير نسبي.')
        case 'endless': return say('Zifra infinituak, periodorik gabe: irrazionala.', 'Infinitas cifras sin periodo: irracional.', 'أرقام لا نهائية بلا دور: غير نسبي.')
        case 'whole-result': return say(`Emaitza zenbaki bat da: arrazionala.${eq}`, `El resultado es un número entero: racional.${eq}`, `النتيجة عدد صحيح: نسبي.${eq}`)
        case 'irrational-result': return say(`Erro irrazionala geratzen da: irrazionala.${eq}`, `Queda una raíz que no sale: irracional.${eq}`, `يبقى جذر لا يخرج: غير نسبي.${eq}`)
    }
}

/** 1 point per right answer */
export function guardStars(score: number): Stars {
    if (score >= 9) return 3
    if (score >= 7) return 2
    if (score >= 5) return 1
    return 0
}
