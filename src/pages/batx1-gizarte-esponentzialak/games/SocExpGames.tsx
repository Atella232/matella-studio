import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../text'
import { applyOrder, CHECKOUT_ROUNDS, createCheckoutRounds, type CheckoutRound, type Operation } from './checkout'
import './SocExpGames.css'
import { createTableRounds, isTableRight, TABLE_ROUNDS, type TableKind, type TableRound } from './table'

/* ==========================================================================
   ¿Lineal o exponencial? and Descuento, IVA y envío (Funtzio esponentzialak
   eta logaritmikoak, Batxilergoa 1 · Gizarte Zientziak): the first shows a
   table and asks for the model and the value at x; the second composes
   operations on a price.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
/** A number for LaTeX with the decimal comma */
const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
/** Euros in words */
const euros = (cents: number, language: UnitLanguage) => {
    const number = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)
    if (language === 'en') return `€${number}`
    return `${language === 'ar' ? number : number.replace('.', ',')} €`
}

function Choices<Value extends string | number>({ values, label, chosen, disabled, onChoose }: { values: Value[]; label: (value: Value) => ReactNode; chosen: Value | null; disabled: boolean; onChoose: (value: Value) => void }) {
    return (
        <div className="soc-exp-choices">
            {values.map((value) => (
                <button key={String(value)} type="button" className={`soc-exp-choice${chosen === value ? ' chosen' : ''}`} aria-pressed={chosen === value} disabled={disabled} onClick={() => onChoose(value)}>{label(value)}</button>
            ))}
        </div>
    )
}

/* ---------- ¿Lineal o exponencial? ---------- */

const KIND: Record<TableKind, LocalizedText> = {
    linear: say('Lineala (kendura bera)', 'Lineal (misma diferencia)', 'خطية (الفرق نفسه)', 'Linear (same difference)'),
    exponential: say('Esponentziala (zatidura bera)', 'Exponencial (mismo cociente)', 'أسية (خارج القسمة نفسه)', 'Exponential (same quotient)')
}

function TablePlay({ round, language, onAnswer, answered }: RoundProps<TableRound>) {
    const l = useGameText(language)
    const [kind, setKind] = useState<TableKind | null>(null)
    const [value, setValue] = useState<number | null>(null)
    const right = isTableRight(round, kind, value)
    const [v0, v1, v2] = round.values
    const working = round.kind === 'linear'
        ? `${tex(v1)}-${tex(v0)}=${tex(v2)}-${tex(v1)}=${tex(v1 - v0)}`
        : `\\frac{${tex(v1)}}{${tex(v0)}}=\\frac{${tex(v2)}}{${tex(v1)}}=${tex(v1 / v0)}`
    return (
        <>
            <table className="soc-exp-table" dir="ltr">
                <tbody>
                    <tr><th>x</th>{[0, 1, 2, 3, round.target].map((x) => <th key={x}>{x}</th>)}</tr>
                    <tr><th>y</th>{round.values.map((item, index) => <td key={index}>{formula(tex(item), language)}</td>)}<td className="ask">?</td></tr>
                </tbody>
            </table>
            <p className="prop3-prompt"><MathText text={l(say(`Lineala ala esponentziala? Zenbat da $y$, $x=${round.target}$ denean?`, `¿Lineal o exponencial? ¿Cuánto vale $y$ en $x=${round.target}$?`, `خطية أم أسية؟ كم تساوي $y$ عند $x=${round.target}$؟`, `Linear or exponential? What is $y$ at $x=${round.target}$?`))} /></p>
            <Choices<TableKind> values={['linear', 'exponential']} label={(item) => l(KIND[item])} chosen={kind} disabled={answered} onChoose={setKind} />
            <Choices<number> values={round.options} label={(item) => formula(tex(item), language)} chosen={value} disabled={answered} onChoose={setValue} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={kind === null || value === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked"><MathText text={l(KIND[round.kind])} /></span>
                    <span className="dbh4-worked">{formula(working, language)}</span>
                    <span className="dbh4-worked">{formula(`x=${round.target}\\ \\to\\ ${tex(round.answer)}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function TableGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TABLE_ROUNDS,
                rules: [
                    say('Kendurak konstanteak badira, eredua lineala da: batu beti gauza bera.', 'Si las diferencias son constantes, el modelo es lineal: se suma siempre lo mismo.', 'إذا كانت الفروق ثابتة فالنموذج خطي: نضيف الشيء نفسه دائمًا.', 'If the differences are constant, the model is linear: the same is always added.'),
                    say('Zatidurak konstanteak badira, esponentziala: biderkatu beti gauza beraz.', 'Si los cocientes son constantes, es exponencial: se multiplica siempre por lo mismo.', 'إذا كانت خوارج القسمة ثابتة فهو أسي: نضرب دائمًا في الشيء نفسه.', 'If the quotients are constant, it is exponential: always multiply by the same.'),
                    say('Aukeratu eredua eta balioa, eta egiaztatu.', 'Elige el modelo y el valor, y comprueba.', 'اختر النموذج والقيمة وتحقّق.', 'Choose the model and the value, and check.')
                ],
                create: createTableRounds,
                stars: standardStars(TABLE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TablePlay
            }}
        />
    )
}

/* ---------- Descuento, IVA y envío ---------- */

function operationText(operation: Operation, language: UnitLanguage): string {
    const l = (text: LocalizedText) => text[language]
    switch (operation.kind) {
        case 'percent': return l(say(`% ${operation.percent} deskontua`, `Descuento del ${operation.percent} %`, `خصم ${operation.percent} %`, `${operation.percent} % discount`))
        case 'vat': return l(say('BEZa (% 21)', 'IVA (21 %)', 'الضريبة (21 %)', 'VAT (21 %)'))
        case 'minus': return l(say(`${euros(100 * operation.euros, language)} gutxiago`, `${euros(100 * operation.euros, language)} menos`, `${euros(100 * operation.euros, language)} أقل`, `${euros(100 * operation.euros, language)} off`))
        case 'plus': return l(say(`Bidalketa: ${euros(100 * operation.euros, language)}`, `Envío: ${euros(100 * operation.euros, language)}`, `الشحن: ${euros(100 * operation.euros, language)}`, `Delivery: ${euros(100 * operation.euros, language)}`))
    }
}

function CheckoutPlay({ round, language, onAnswer, answered }: RoundProps<CheckoutRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const right = chosen === round.answer
    const first = round.level === 0
    const ops = round.operations.map((operation) => operationText(operation, language))
    const orderLabel = (order: number[]) => order.map((index) => ops[index]).join(' → ')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(first
                ? say(`Prezioa: ${euros(round.price, language)}. Ordena honetan: ${orderLabel(round.orders[0])}. Zein da azken prezioa?`, `Precio: ${euros(round.price, language)}. En este orden: ${orderLabel(round.orders[0])}. ¿Cuál es el precio final?`, `السعر: ${euros(round.price, language)}. بهذا الترتيب: ${orderLabel(round.orders[0])}. ما السعر النهائي؟`, `Price: ${euros(round.price, language)}. In this order: ${orderLabel(round.orders[0])}. What is the final price?`)
                : say(`Prezioa: ${euros(round.price, language)}, eta azkenean ${euros(round.target, language)} ordaindu dira. Zein ordenatan aplikatu dira eragiketak?`, `Precio: ${euros(round.price, language)}, y al final se pagaron ${euros(round.target, language)}. ¿En qué orden se aplicaron las operaciones?`, `السعر: ${euros(round.price, language)}، ودُفع في النهاية ${euros(round.target, language)}. بأي ترتيب طُبّقت العمليات؟`, `Price: ${euros(round.price, language)}, and in the end ${euros(round.target, language)} was paid. In which order were the operations applied?`))} /></p>
            {!first && <div className="soc-exp-ops">{ops.map((text) => <span key={text} className="soc-exp-op">{text}</span>)}</div>}
            <Choices<number> values={(first ? round.options : round.orders).map((_, index) => index)} label={(index) => (first ? euros(round.options[index], language) : orderLabel(round.orders[index]))} chosen={chosen} disabled={answered} onChoose={setChosen} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.orders.map((order, index) => (
                        <span key={index} className="dbh4-worked"><MathText text={`${orderLabel(order)}: ${euros(applyOrder(round, order), language)}`} /></span>
                    ))}
                    {first && <span className="dbh4-worked"><MathText text={l(say('Beste ordenan, beste prezio bat.', 'En el otro orden, otro precio.', 'بالترتيب الآخر سعر آخر.', 'In the other order, another price.'))} /></span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function CheckoutGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CHECKOUT_ROUNDS,
                rules: [
                    say('Eragiketa bakoitza funtzio bat da: lehenik bata, eta haren emaitzari bestea.', 'Cada operación es una función: primero una y al resultado, la otra.', 'كل عملية دالة: أولًا واحدة ثم الأخرى على ناتجها.', 'Each operation is a function: first one, then the other on its result.'),
                    say('Bi biderketak edozein ordenatan berdin; biderketa bat eta batuketa bat, ez.', 'Dos productos dan lo mismo en cualquier orden; un producto y una suma, no.', 'ضربان يعطيان الشيء نفسه بأي ترتيب؛ أما ضرب وجمع فلا.', 'Two products give the same in any order; a product and a sum do not.'),
                    say('Aukeratu txartel bat eta egiaztatu.', 'Elige una tarjeta y comprueba.', 'اختر بطاقة وتحقّق.', 'Choose a card and check.')
                ],
                create: createCheckoutRounds,
                stars: standardStars(CHECKOUT_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: CheckoutPlay
            }}
        />
    )
}
