import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { createPowerRounds, POWER_ROUNDS, powerLatex, type PowerRound } from './bigPower'
import { chainSize, createDominoRounds, DOMINO_ROUNDS, expressionLatex, expressionSize, type DominoOption, type DominoRound, type Size } from './dominoes'
import './MatricesGames.css'
import { createSolveRounds, SOLVE_ROUNDS, type SolveRound } from './solveX'

/* ==========================================================================
   Dimentsioen dominoa, Askatu X and Berretura erraldoia (Matrizeak,
   Batxilergoa 2 · Zientziak): rounds with four options and one try each.
   The dominoes show each matrix as a tile, rows on the left half and
   columns on the right; solve for X shows an equation and four ways of
   writing X; the giant power shows A, A² and A³ and four candidates for a
   large power.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const starsNote = (rounds: number) => say(`3 izar: ${rounds} · 2 izar: ${rounds - 1} · izar 1: ${Math.ceil(rounds / 2)}`, `3 estrellas: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 نجوم: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 stars: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`)

/** Picks one option, once, and remembers which */
function usePick(onAnswer: (right: boolean) => void, answer: number, answered: boolean) {
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === answer)
    }
    const state = (index: number) => (!answered ? '' : index === answer ? 'right' : index === picked ? 'wrong' : '')
    return { picked, choose, state }
}

/* ---------- Size dominoes ---------- */

function Tile({ size, gap = false, tone }: { size: Size | null; gap?: boolean; tone?: 'left' | 'right' }) {
    if (gap) return <span className="mat-domino mat-domino-gap" aria-hidden="true"><span>?</span><span>?</span></span>
    if (!size) return null
    return <span className={`mat-domino ${tone ? `mat-domino-${tone}` : ''}`}><span>{size[0]}</span><span>{size[1]}</span></span>
}

const sizeLabel = (size: Size) => `${size[0]} × ${size[1]}`

function DominoPlay({ round, language, onAnswer, answered }: RoundProps<DominoRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const cannot = say('Ezin da', 'No se puede', 'لا يمكن', 'It cannot be done')
    const label = (option: DominoOption) => (option === null ? l(cannot) : sizeLabel(option))
    const right = round.options[round.answer]
    return (
        <>
            {round.level < 2 ? (
                <>
                    <div className="mat-domino-chain" dir="ltr" aria-label={round.chain.map((item) => (item ? sizeLabel(item) : '?')).join(' · ')}>
                        {round.chain.map((item, index) => (
                            <span key={index} className="mat-domino-link">
                                {index > 0 && <span className="mat-domino-dot">·</span>}
                                <Tile size={item} gap={item === null} />
                            </span>
                        ))}
                        <span className="mat-domino-dot">=</span>
                        <Tile size={round.target} tone="right" />
                    </div>
                    <p className="prop3-prompt"><MathText text={l(say('Zein fitxak betetzen du hutsunea? Ukitzen diren erdiek berdinak izan behar dute.', '¿Qué ficha llena el hueco? Las mitades que se tocan tienen que ser iguales.', 'أي قطعة تملأ الفراغ؟ يجب أن يتساوى النصفان المتلامسان.', 'Which tile fills the gap? The halves that touch must be equal.'))} /></p>
                </>
            ) : (
                <>
                    <div className="mat-domino-chain" dir="ltr">
                        <span className="mat-domino-name">A</span><Tile size={round.sizes!.A} />
                        <span className="mat-domino-name">B</span><Tile size={round.sizes!.B} />
                    </div>
                    <p className="prop3-prompt"><MathText text={l(say(`Zein dimentsio du $${expressionLatex(round)}$ biderkadurak?`, `¿Qué dimensión tiene $${expressionLatex(round)}$?`, `ما أبعاد $${expressionLatex(round)}$؟`, `What size is $${expressionLatex(round)}$?`))} /></p>
                </>
            )}
            <div className="prop3-options mat-domino-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)} aria-label={label(option)}>
                        {option === null ? l(cannot) : <Tile size={option} />}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.level < 2
                        ? <span className="dbh4-worked">{formula(`${round.chain.map((item) => sizeLatex(item ?? (right as Size))).join('\\cdot ')}\\ \\to\\ ${sizeLatex(chainSize(round.chain.map((item) => item ?? (right as Size)))!)}`, language)}</span>
                        : <span className="dbh4-worked">{expressionWorked(round, language, l(cannot))}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

const sizeLatex = (size: Size) => `(${size[0]}\\times ${size[1]})`

function expressionWorked(round: DominoRound, language: UnitLanguage, cannot: string): ReactNode {
    const e = round.expression!
    const sizes = round.sizes!
    const left = e.leftT ? [sizes[e.left][1], sizes[e.left][0]] as Size : sizes[e.left]
    const right = e.rightT ? [sizes[e.right][1], sizes[e.right][0]] as Size : sizes[e.right]
    const size = expressionSize(round)
    return <>{formula(`${expressionLatex(round)}\\ \\to\\ ${sizeLatex(left)}${sizeLatex(right)}`, language)} {size ? formula(`\\to\\ ${size[0]}\\times ${size[1]}`, language) : <strong>{cannot}</strong>}</>
}

export function DominoGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DOMINO_ROUNDS,
                rules: [
                    say('Matrize bakoitza domino-fitxa bat da: ezkerreko erdia errenkadak dira, eta eskuinekoa zutabeak.', 'Cada matriz es una ficha de dominó: la mitad izquierda son las filas y la derecha, las columnas.', 'كل مصفوفة قطعة دومينو: النصف الأيسر الصفوف والأيمن الأعمدة.', 'Each matrix is a domino tile: the left half is the rows and the right half the columns.'),
                    say('Bi fitxa biderka daitezke ukitzen diren erdiak berdinak badira; emaitzak kanpoko erdiak hartzen ditu.', 'Dos fichas se pueden multiplicar si las mitades que se tocan son iguales; el resultado se queda con las de fuera.', 'يمكن ضرب قطعتين إذا تساوى النصفان المتلامسان؛ والناتج يأخذ النصفين الخارجيين.', 'Two tiles can be multiplied if the touching halves are equal; the result keeps the outer halves.'),
                    say('3. mailan iraulia ere badago: $A^t$ matrizeak bere fitxa biratzen du.', 'En el nivel 3 también hay traspuestas: $A^t$ gira su ficha.', 'في المستوى 3 توجد منقولات أيضًا: $A^t$ تقلب قطعتها.', 'Level 3 has transposes too: $A^t$ turns its tile round.')
                ],
                create: createDominoRounds,
                stars: standardStars(DOMINO_ROUNDS),
                starsNote: starsNote(DOMINO_ROUNDS),
                Round: DominoPlay
            }}
        />
    )
}

/* ---------- Solve for X ---------- */

function SolvePlay({ round, language, onAnswer, answered }: RoundProps<SolveRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <div className="dbh4-big-formula mat-equation" dir="ltr">{formula(round.equation, language)}</div>
            <p className="prop3-prompt"><MathText text={l(say('Zein da $X$ askatzeko modu zuzena? $A$, $B$ eta $C$ alderantzikagarriak dira.', '¿Cuál es la forma correcta de despejar $X$? $A$, $B$ y $C$ tienen inversa.', 'ما الطريقة الصحيحة لاستخراج $X$؟ لـ $A$ و$B$ و$C$ معكوس.', 'Which is the right way to solve for $X$? $A$, $B$ and $C$ are invertible.'))} /></p>
            <div className="prop3-options mat-solve-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(round.why)} /> <span className="dbh4-worked">{formula(round.options[round.answer], language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function SolveXGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SOLVE_ROUNDS,
                rules: [
                    say('Matrize-ekuazio bat ikusiko duzu, eta $X$ askatzeko lau modu.', 'Verás una ecuación matricial y cuatro formas de despejar $X$.', 'سترى معادلة مصفوفية وأربع طرق لاستخراج $X$.', 'You will see a matrix equation and four ways of solving for $X$.'),
                    say('Matrizeak ez dira zatitzen: $A^{-1}$ matrizeaz biderkatzen da, $A$ dagoen aldetik.', 'Las matrices no se dividen: se multiplica por $A^{-1}$ por el lado donde está $A$.', 'المصفوفات لا تُقسم: نضرب في $A^{-1}$ من الجهة التي فيها $A$.', 'Matrices are not divided: multiply by $A^{-1}$ on the side where $A$ is.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createSolveRounds,
                stars: standardStars(SOLVE_ROUNDS),
                starsNote: starsNote(SOLVE_ROUNDS),
                Round: SolvePlay
            }}
        />
    )
}

/* ---------- Giant power ---------- */

function PowerPlay({ round, language, onAnswer, answered }: RoundProps<PowerRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const n = round.exponent
    const hint = round.period
        ? say(`$A^{${round.period}}=I$; zatitu ${n} zenbakia ${round.period} zenbakiaz eta begiratu hondarrari.`, `$A^{${round.period}}=I$: divide ${n} entre ${round.period} y mira el resto.`, `$A^{${round.period}}=I$: اقسم ${n} على ${round.period} وانظر إلى الباقي.`, `$A^{${round.period}}=I$: divide ${n} by ${round.period} and look at the remainder.`)
        : say('Elementu bat $n$ berretzailearekin hazten da, batuz.', 'Un elemento crece con $n$, sumando.', 'عنصر يكبر مع $n$ بالجمع.', 'An entry grows with $n$, by adding.')
    return (
        <>
            <div className="mat-power-row" dir="ltr">
                {round.shown.map((matrix, index) => (
                    <span key={index} className="mat-power-item">{formula(`${index === 0 ? 'A' : `A^${index + 1}`}=${powerLatex(matrix)}`, language)}</span>
                ))}
            </div>
            <p className="prop3-prompt"><MathText text={l(say(`Zein da $A^{${n}}$?`, `¿Cuál es $A^{${n}}$?`, `ما $A^{${n}}$؟`, `Which is $A^{${n}}$?`))} /></p>
            <div className="prop3-options mat-power-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(powerLatex(option), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(hint)} /> <span className="dbh4-worked">{formula(`A^{${n}}=${powerLatex(round.options[round.answer])}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function BigPowerGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: POWER_ROUNDS,
                rules: [
                    say('$A$, $A^2$ eta $A^3$ ikusiko dituzu.', 'Verás $A$, $A^2$ y $A^3$.', 'سترى $A$ و$A^2$ و$A^3$.', 'You will see $A$, $A^2$ and $A^3$.'),
                    say('Aurkitu eredua: errepikatu egiten dira ($A^k=I$), edo zenbaki bat hazten da.', 'Encuentra el patrón: se repiten ($A^k=I$) o un número crece.', 'جد النمط: تتكرر ($A^k=I$) أو يكبر عدد.', 'Find the pattern: they repeat ($A^k=I$) or a number grows.'),
                    say('Aukeratu berretura erraldoia lau aukeren artean.', 'Elige la potencia gigante entre cuatro opciones.', 'اختر القوة العملاقة من بين أربعة خيارات.', 'Choose the giant power among four options.')
                ],
                create: createPowerRounds,
                stars: standardStars(POWER_ROUNDS),
                starsNote: starsNote(POWER_ROUNDS),
                Round: PowerPlay
            }}
        />
    )
}

