import { shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Sailkatzailea (El clasificador, 3. DBH): sequences arrive one by one and
   the learner sends each to «arithmetic», «geometric» or «neither». Level
   1 has clear cases; level 2 decimals, fractions and negative ratios; level
   3 the traps — squares, Fibonacci, alternating signs, a jump that changes
   once, and sequences that add the same number in every other step. No
   constant sequence appears (it would be both). Pure logic.
   ========================================================================== */

export const SORTER_ITEMS = 10

export type SorterKind = 'arithmetic' | 'geometric' | 'neither'

export interface SorterItem {
    latex: string
    kind: SorterKind
    /** d or r when there is one, as LaTeX */
    constant?: string
    /** Why it is neither */
    reason?: 'squares' | 'fibonacci' | 'changes' | 'alternate'
}

const a = (latex: string, d: string): SorterItem => ({ latex, kind: 'arithmetic', constant: d })
const g = (latex: string, r: string): SorterItem => ({ latex, kind: 'geometric', constant: r })
const x = (latex: string, reason: SorterItem['reason']): SorterItem => ({ latex, kind: 'neither', reason })

const POOLS: SorterItem[][] = [
    [
        a('2,\\,5,\\,8,\\,11', '3'), a('20,\\,15,\\,10,\\,5', '-5'), a('1,\\,8,\\,15,\\,22', '7'), a('-3,\\,-1,\\,1,\\,3', '2'),
        g('3,\\,6,\\,12,\\,24', '2'), g('1,\\,4,\\,16,\\,64', '4'), g('80,\\,40,\\,20,\\,10', '\\frac{1}{2}'), g('2,\\,10,\\,50,\\,250', '5'),
        x('1,\\,4,\\,9,\\,16', 'squares'), x('1,\\,2,\\,4,\\,7', 'changes'), x('2,\\,3,\\,5,\\,8', 'fibonacci'), x('5,\\,7,\\,10,\\,14', 'changes')
    ],
    [
        a('0{,}5,\\,1,\\,1{,}5,\\,2', '0{,}5'), a('\\frac{1}{4},\\,\\frac{1}{2},\\,\\frac{3}{4},\\,1', '\\frac{1}{4}'), a('7,\\,4{,}5,\\,2,\\,-0{,}5', '-2{,}5'), a('-12,\\,-8,\\,-4,\\,0', '4'),
        g('5,\\,-10,\\,20,\\,-40', '-2'), g('0{,}1,\\,1,\\,10,\\,100', '10'), g('1,\\,\\frac{1}{3},\\,\\frac{1}{9},\\,\\frac{1}{27}', '\\frac{1}{3}'), g('-2,\\,-6,\\,-18,\\,-54', '3'),
        x('1,\\,\\frac{1}{2},\\,\\frac{1}{3},\\,\\frac{1}{4}', 'changes'), x('0{,}1,\\,0{,}2,\\,0{,}4,\\,0{,}7', 'changes'), x('2,\\,4,\\,8,\\,14', 'changes')
    ],
    [
        a('100,\\,93,\\,86,\\,79', '-7'), a('-1{,}5,\\,0,\\,1{,}5,\\,3', '1{,}5'), a('11,\\,22,\\,33,\\,44', '11'),
        g('1,\\,-1,\\,1,\\,-1', '-1'), g('9,\\,3,\\,1,\\,\\frac{1}{3}', '\\frac{1}{3}'), g('2,\\,2\\sqrt{2},\\,4,\\,4\\sqrt{2}', '\\sqrt{2}'),
        x('0,\\,1,\\,4,\\,9', 'squares'), x('1,\\,1,\\,2,\\,3', 'fibonacci'), x('3,\\,-3,\\,5,\\,-5', 'alternate'), x('2,\\,4,\\,6,\\,10', 'changes'), x('1,\\,3,\\,9,\\,19', 'changes')
    ]
]

export const sorterPool = (level: number): SorterItem[] => POOLS[level] ?? POOLS[0]

/** Ten different sequences with at least two of each kind */
export function createSorterItems(random: Random, level: number): SorterItem[] {
    for (;;) {
        const items = shuffle(random, sorterPool(level)).slice(0, SORTER_ITEMS)
        const counts = (['arithmetic', 'geometric', 'neither'] as const).map((kind) => items.filter((item) => item.kind === kind).length)
        if (counts.every((count) => count >= 2)) return items
    }
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export function sorterWhy(item: SorterItem): LocalizedText {
    if (item.kind === 'arithmetic') return say(`Beti zenbaki bera batzen da: $d=${item.constant}$.`, `Siempre se suma lo mismo: $d=${item.constant}$.`, `نضيف دائمًا العدد نفسه: $d=${item.constant}$.`, `The same number is always added: $d=${item.constant}$.`)
    if (item.kind === 'geometric') return say(`Beti zenbaki beraz biderkatzen da: $r=${item.constant}$.`, `Siempre se multiplica por lo mismo: $r=${item.constant}$.`, `نضرب دائمًا في العدد نفسه: $r=${item.constant}$.`, `It is always multiplied by the same number: $r=${item.constant}$.`)
    switch (item.reason) {
        case 'squares': return say('Karratuak dira: kendurak 1, 3, 5… eta zatidurak aldatzen dira.', 'Son cuadrados: las restas son 1, 3, 5… y los cocientes cambian.', 'إنها مربعات: الفروق 1، 3، 5… وحواصل القسمة تتغير.', 'They are squares: the differences are 1, 3, 5… and the quotients change.')
        case 'fibonacci': return say('Gai bakoitza aurreko bien batura da: ez da batura bera, ez biderketa bera.', 'Cada término es la suma de los dos anteriores: ni se suma ni se multiplica siempre lo mismo.', 'كل حد مجموع الحدين السابقين: لا نجمع ولا نضرب دائمًا العدد نفسه.', 'Each term is the sum of the two before it: it neither adds nor multiplies the same number every time.')
        case 'alternate': return say('Zeinua aldatzen da, baina zatidura ez da beti bera.', 'Cambia de signo, pero el cociente no es siempre el mismo.', 'تتغير الإشارة لكن حاصل القسمة ليس ثابتًا.', 'The sign changes, but the quotient is not always the same.')
        default: return say('Kendurak eta zatidurak aldatzen dira.', 'Las restas y los cocientes cambian.', 'الفروق وحواصل القسمة تتغير.', 'The differences and the quotients change.')
    }
}

export function sorterStars(score: number): Stars {
    if (score >= 9) return 3
    if (score >= 7) return 2
    if (score >= 5) return 1
    return 0
}
