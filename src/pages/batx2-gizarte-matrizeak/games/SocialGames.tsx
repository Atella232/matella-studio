import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-matrizeak/games/MatricesGames.css'
import { createHiddenRounds, HIDDEN_ROUNDS, hiddenLatex, hiddenWorked, type HiddenRound } from './hiddenTicket'
import { createWhichRounds, WHICH_ROUNDS, type WhichRound } from './whichProduct'
import './SocialGames.css'

/* ==========================================================================
   Zein biderkadurak kalkulatzen du? and Tiket ezkutua (Matrizeak,
   Batxilergoa 2 · Gizarte Zientziak): rounds with four options and one try
   each. The first shows the named matrices of a story and four
   expressions; the second, a product of quantities and prices with one
   number covered and four candidates for it.
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

/* ---------- Which product works it out? ---------- */

function WhichPlay({ round, language, onAnswer, answered }: RoundProps<WhichRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <ul className="soc-matrices">
                {round.matrices.map((matrix) => (
                    <li key={matrix.name}>
                        <span className="soc-matrix-name" dir="ltr">{formula(`${matrix.name}\\ (${matrix.rows}\\times ${matrix.columns})`, language)}</span>
                        <span>{l(matrix.meaning)}</span>
                    </li>
                ))}
            </ul>
            <p className="prop3-prompt"><MathText text={l(round.question)} /></p>
            <div className="prop3-options mat-solve-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(round.why)} /> <span className="dbh4-worked">{formula(round.right, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function WhichProductGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHICH_ROUNDS,
                rules: [
                    say('Istorio batek matrize batzuk izendatzen ditu: zer diren errenkadak eta zutabeak, eta haien dimentsioa.', 'Una historia nombra unas matrices: qué son sus filas y sus columnas, y su dimensión.', 'قصة تسمّي مصفوفات: ما صفوفها وأعمدتها وما أبعادها.', 'A story names some matrices: what their rows and columns are, and their size.'),
                    say('Aukeratu galdetzen dena kalkulatzen duen adierazpena. Batzuk ezin dira egin; beste batzuek beste zerbait kalkulatzen dute.', 'Elige la expresión que calcula lo que se pregunta. Algunas no se pueden hacer; otras calculan otra cosa.', 'اختر العبارة التي تحسب المطلوب. بعضها لا يمكن حسابه، وبعضها يحسب شيئًا آخر.', 'Choose the expression that works out what is asked. Some cannot be done; others work out something else.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createWhichRounds,
                stars: standardStars(WHICH_ROUNDS),
                starsNote: starsNote(WHICH_ROUNDS),
                Round: WhichPlay
            }}
        />
    )
}

/* ---------- The hidden receipt ---------- */

const HIDDEN_QUESTION: Record<HiddenRound['hidden']['kind'], LocalizedText> = {
    price: say('Bi dendaren kopuruak bider prezioak, eta denda bakoitzak jasotzen duena. Zein da prezio estalia?', 'Las cantidades de dos tiendas por los precios, y lo que ingresa cada una. ¿Cuál es el precio tapado?', 'كميات متجرين في الأسعار وإيراد كل منهما. ما السعر المغطى؟', 'The quantities of two shops times the prices, and what each one takes in. What is the covered price?'),
    quantity: say('Bi dendaren kopuruak bider prezioak, eta denda bakoitzak jasotzen duena. Zein da kopuru estalia?', 'Las cantidades de dos tiendas por los precios, y lo que ingresa cada una. ¿Cuál es la cantidad tapada?', 'كميات متجرين في الأسعار وإيراد كل منهما. ما الكمية المغطاة؟', 'The quantities of two shops times the prices, and what each one takes in. What is the covered quantity?'),
    cost: say('Kopuruak bider (prezioak ken kostuak), eta denda bakoitzak irabazten duena. Zein da kostu estalia?', 'Cantidades por (precios menos costes), y lo que gana cada tienda. ¿Cuál es el coste tapado?', 'الكميات في (الأسعار ناقص التكاليف) وربح كل متجر. ما الكلفة المغطاة؟', 'Quantities times (prices minus costs), and what each shop makes. What is the covered cost?')
}

function HiddenPlay({ round, language, onAnswer, answered }: RoundProps<HiddenRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <div className="dbh4-big-formula mat-equation soc-hidden" dir="ltr">{formula(hiddenLatex(round), language)}</div>
            <p className="prop3-prompt"><MathText text={l(HIDDEN_QUESTION[round.hidden.kind])} /></p>
            <div className="prop3-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{option}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(say(`${round.row + 1}. errenkada:`, `Fila ${round.row + 1}:`, `الصف ${round.row + 1}:`, `Row ${round.row + 1}:`))} /> <span className="dbh4-worked">{formula(hiddenWorked(round), language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function HiddenTicketGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HIDDEN_ROUNDS,
                rules: [
                    say('Kopuruen matrizea (dendak × produktuak) bider prezioen zutabea: denda bakoitzaren guztizkoa.', 'La matriz de cantidades (tiendas × productos) por la columna de precios: el total de cada tienda.', 'مصفوفة الكميات (المتاجر × المنتجات) في عمود الأسعار: مجموع كل متجر.', 'The matrix of quantities (shops × products) times the column of prices: the total of each shop.'),
                    say('Zenbaki bat estalita dago. Erabili errenkada bat: ekuazio bat da, ezezagun bakarrarekin.', 'Hay un número tapado. Usa una fila: es una ecuación con una sola incógnita.', 'هناك عدد مغطى. استعمل صفًّا: إنه معادلة بمجهول واحد.', 'One number is covered. Use one row: it is an equation with a single unknown.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createHiddenRounds,
                stars: standardStars(HIDDEN_ROUNDS),
                starsNote: starsNote(HIDDEN_ROUNDS),
                Round: HiddenPlay
            }}
        />
    )
}
