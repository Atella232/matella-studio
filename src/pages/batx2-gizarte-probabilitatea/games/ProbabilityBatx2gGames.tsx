import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { probLatex, say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games.css'
import { cellValue, columnLabels, createDivideRounds, DIVIDE_ROUNDS, divideAnswer, divideQuestion, isRightDivision, rowLabels, type Cell, type DivideRound } from './divide'
import { COUNT_MODELS, countLatex, countOf, createOrderRounds, ORDER_ROUNDS, type CountModel, type OrderRound } from './order'
import './ProbabilityBatx2gGames.css'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — the two games of
   this unit played in rounds: which cells do I divide? (the table of a
   poll; tap the cell on top and then the one below) and does the order
   matter? (the four counting models, or the count itself in level 3).
   Logic in divide.ts and order.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')
const sameCell = (a: Cell | null, b: Cell) => a !== null && a[0] === b[0] && a[1] === b[1]

/* ---------- Which cells do I divide? ---------- */

const TOTAL = say('Guztira', 'Total', 'المجموع', 'Total')

function DividePlay({ round, language, onAnswer, answered }: RoundProps<DivideRound>) {
    const l = useGameText(language)
    const [top, setTop] = useState<Cell | null>(null)
    const [bottom, setBottom] = useState<Cell | null>(null)
    const tap = (cell: Cell) => {
        if (answered) return
        if (top === null) {
            setTop(cell)
            return
        }
        setBottom(cell)
        onAnswer(isRightDivision(round, top, cell))
    }
    const rows = rowLabels(round)
    const columns = columnLabels(round)
    const name = (label: { eu: string; es: string; en: string; ar: string }) => l({ eu: label.eu, es: label.es, en: label.en, ar: label.ar })
    const cellClass = (cell: Cell) => [cell[0] === 2 || cell[1] === 2 ? 'total' : '', sameCell(top, cell) ? 'top' : '', sameCell(bottom, cell) ? 'bottom' : '', answered && (sameCell(round.top, cell) || sameCell(round.bottom, cell)) ? 'right' : ''].filter(Boolean).join(' ')
    const right = answered && top !== null && bottom !== null && isRightDivision(round, top, bottom)
    const step = top === null
        ? say('1. Ukitu goian (zenbakitzailean) doan laukia.', '1. Toca la casilla que va arriba (numerador).', '1. المس الخانة التي في الأعلى (البسط).', '1. Tap the cell that goes on top (numerator).')
        : say('2. Orain, behean (izendatzailean) doana.', '2. Ahora, la que va abajo (denominador).', '2. الآن المس التي في الأسفل (المقام).', '2. Now the one that goes below (denominator).')
    return (
        <>
            <p className="prob2-question">{l(divideQuestion(round))}</p>
            <div className="prob2g-table" dir="ltr">
                <span className="prob2g-head" />
                {[0, 1].map((column) => <span key={column} className="prob2g-head">{name(columns[column])}</span>)}
                <span className="prob2g-head">{l(TOTAL)}</span>
                {[0, 1, 2].map((row) => (
                    <div key={row} style={{ display: 'contents' }}>
                        <span className="prob2g-head">{row === 2 ? l(TOTAL) : name(rows[row])}</span>
                        {[0, 1, 2].map((column) => {
                            const cell: Cell = [row, column]
                            return <button key={column} type="button" disabled={answered} className={cellClass(cell)} onClick={() => tap(cell)}>{groupDigits(cellValue(round, cell), language)}</button>
                        })}
                    </div>
                ))}
            </div>
            {!answered && <p className="prob2g-step">{l(step)}</p>}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\frac{${cellValue(round, round.top)}}{${cellValue(round, round.bottom)}}=${probLatex(divideAnswer(round))}`, language)}</span>
                    <MathText text={l(round.bottom[0] === 2 && round.bottom[1] === 2
                        ? say('Guztien artean galdetzen da: behean, guztizko nagusia.', 'Se pregunta sobre todos: abajo, el total general.', 'السؤال عن الجميع: في الأسفل المجموع العام.', 'The question is about everyone: below, the grand total.')
                        : say('Baldintza da osoko berria: behean, haren errenkadaren edo zutabearen guztizkoa.', 'La condición es el nuevo total: abajo, el total de su fila o columna.', 'الشرط هو الكل الجديد: في الأسفل مجموع صفه أو عموده.', 'The condition is the new total: below, the total of its row or column.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function DivideGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DIVIDE_ROUNDS,
                rules: [
                    say('Probabilitate bat zatiki bat da: goian, galdetzen dena; behean, nondik galdetzen den.', 'Una probabilidad es una fracción: arriba, lo que se pregunta; abajo, de dónde se pregunta.', 'الاحتمال كسر: في الأعلى المطلوب، وفي الأسفل من أين يُسأل.', 'A probability is a fraction: on top, what is asked; below, out of what it is asked.'),
                    say('«Guztien artean»: behean, guztizko nagusia.', '«Del total»: abajo, el total general.', '«من الجميع»: في الأسفل المجموع العام.', '‘Of everyone’: below, the grand total.'),
                    say('«…en artean»: baldintza da osoko berria; behean, haren guztizkoa.', '«Entre los…»: la condición es el nuevo total; abajo, su total.', '«بين…»: الشرط هو الكل الجديد؛ في الأسفل مجموعه.', '‘Among the…’: the condition is the new total; below, its total.')
                ],
                create: createDivideRounds,
                stars: standardStars(DIVIDE_ROUNDS),
                starsNote: STARS_NOTE,
                Round: DividePlay
            }}
        />
    )
}

/* ---------- Does the order matter? ---------- */

const MODEL_NAMES: Record<CountModel, { name: string; text: ReturnType<typeof say> }> = {
    V: { name: 'V', text: say('Ordenarekin, errepikatu gabe', 'Con orden, sin repetir', 'بترتيب ودون تكرار', 'In order, no repeats') },
    VR: { name: 'VR', text: say('Ordenarekin, errepikatuz', 'Con orden, repitiendo', 'بترتيب ومع التكرار', 'In order, with repeats') },
    P: { name: 'P', text: say('Denak ordenatu', 'Ordenar todos', 'ترتيب الجميع', 'All in order') },
    C: { name: 'C', text: say('Ordenarik gabe', 'Sin orden', 'دون ترتيب', 'No order') }
}

function OrderPlay({ round, level, language, onAnswer, answered }: RoundProps<OrderRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<CountModel | number | null>(null)
    const counting = level === 2
    const choose = (value: CountModel | number) => {
        if (answered) return
        setPicked(value)
        onAnswer(counting ? value === countOf(round.model, round.n, round.k) : value === round.model)
    }
    const right = counting ? picked === countOf(round.model, round.n, round.k) : picked === round.model
    const why = {
        V: say('Kargu edo postu desberdinak: ordenak axola du, eta pertsona bat ez da errepikatzen.', 'Cargos o puestos distintos: el orden importa y nadie se repite.', 'مناصب أو مراكز مختلفة: الترتيب مهم ولا يتكرر أحد.', 'Different posts or places: the order matters and nobody repeats.'),
        VR: say('Toki bakoitzean aukera guztiak daude berriro: errepika daiteke.', 'En cada puesto vuelven a estar todas las opciones: se puede repetir.', 'في كل مركز تعود كل الخيارات: يجوز التكرار.', 'Every option is back at each place: things can repeat.'),
        P: say('Denak ordenatzen dira: permutazio bat.', 'Se ordenan todos: una permutación.', 'يُرتَّب الجميع: تبديل.', 'All of them are put in order: a permutation.'),
        C: say('Talde bat da, ez zerrenda bat: ordenak ez du axola.', 'Es un grupo, no una lista: el orden no importa.', 'إنها مجموعة لا قائمة: الترتيب لا يهم.', 'It is a group, not a list: the order does not matter.')
    }[round.model]
    const models = level === 0 ? (['V', 'C'] as CountModel[]) : COUNT_MODELS
    return (
        <>
            <p className="prob2g-situation">{l(round.situation)}</p>
            {counting ? (
                <div className="prop3-options prob2-three">
                    {round.options.map((value) => (
                        <button key={value} type="button" disabled={answered} className={choiceClass(answered, value === countOf(round.model, round.n, round.k), value === picked)} onClick={() => choose(value)}>{groupDigits(value, language)}</button>
                    ))}
                </div>
            ) : (
                <div className="prop3-options prob2g-models">
                    {models.map((model) => (
                        <button key={model} type="button" disabled={answered} className={choiceClass(answered, model === round.model, model === picked)} onClick={() => choose(model)}>
                            <strong className="prob2g-model" dir="ltr">{MODEL_NAMES[model].name}</strong>
                            <span>{l(MODEL_NAMES[model].text)}</span>
                        </button>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(countLatex(round), language)}</span>
                    <MathText text={l(why)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function OrderGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ORDER_ROUNDS,
                rules: [
                    say('Lehen galdera: ordenak axola du? Kargu edo postu desberdinak badaude, bai.', 'Primera pregunta: ¿importa el orden? Si hay cargos o puestos distintos, sí.', 'السؤال الأول: هل يهم الترتيب؟ نعم إذا كانت هناك مناصب أو مراكز مختلفة.', 'First question: does the order matter? Yes, if there are different posts or places.'),
                    say('Bigarren galdera: errepika daiteke? Kode edo erantzun batean bai; pertsona batean ez.', 'Segunda pregunta: ¿se puede repetir? En un código o una respuesta, sí; en una persona, no.', 'السؤال الثاني: هل يجوز التكرار؟ في رمز أو إجابة نعم، وفي شخص لا.', 'Second question: can it repeat? In a code or an answer, yes; in a person, no.'),
                    say('3. mailan, aukeratu zenbaki zuzena.', 'En el nivel 3, elige el número correcto.', 'في المستوى 3 اختر العدد الصحيح.', 'In level 3, choose the right number.')
                ],
                create: createOrderRounds,
                stars: standardStars(ORDER_ROUNDS),
                starsNote: STARS_NOTE,
                Round: OrderPlay
            }}
        />
    )
}
