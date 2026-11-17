import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './GizAlgebraGames.css'
import { BOX_ROUNDS, createBoxRounds, type BoxRound } from './boxOffice'
import { createGainRounds, GAIN_ROUNDS, gainBreakEven, gainProfit, gainVerdict, type GainRound, type GainVerdict } from './gain'

/* ==========================================================================
   Koadratu leihatila and Irabazi ala galdu? (Aljebra, Batxilergoa 1 ·
   Gizarte Zientziak): the box office shows its prices, tickets and takings,
   and the count asked for is one tap among three; then the system and its
   solution are shown. The business shows its costs and price, and the
   verdict (or the break-even point) is one tap; then the profit is worked
   out.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const number = (value: number, language: UnitLanguage) => `${value < 0 ? '−' : ''}${groupDigits(String(Math.abs(value)), language)}`

/* ---------- Balance the box office ---------- */

function relationText(round: BoxRound): LocalizedText | null {
    const [a, , c] = round.prices
    if (round.relation.kind === 'times') {
        const times = round.relation.times
        return say(
            `${a} euroko sarrerak ${c} eurokoak baino ${times === 2 ? 'bi' : 'hiru'} aldiz gehiago dira.`,
            `Hay ${times === 2 ? 'el doble' : 'el triple'} de entradas de ${a} euros que de ${c} euros.`,
            `عدد تذاكر ${a} يورو ${times === 2 ? 'ضعف' : 'ثلاثة أضعاف'} عدد تذاكر ${c} يورو.`,
            `There are ${times === 2 ? 'twice' : 'three times'} as many ${a}-euro tickets as ${c}-euro ones.`
        )
    }
    if (round.relation.kind === 'sum') {
        return say(`${a} euroko sarrerak beste bi motetakoak batera adina dira.`, `Hay tantas entradas de ${a} euros como de las otras dos juntas.`, `عدد تذاكر ${a} يورو يساوي عدد النوعين الآخرين معًا.`, `There are as many ${a}-euro tickets as the other two together.`)
    }
    return null
}

function BoxPlay({ round, language, onAnswer, answered }: RoundProps<BoxRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const right = round.counts[round.ask]
    const choose = (index: number) => {
        if (answered) return
        setChoice(index)
        onAnswer(round.options[index] === right)
    }
    const letters = ['x', 'y', 'z'].slice(0, round.prices.length)
    const last = round.prices.at(-1)
    const first = round.prices.slice(0, -1)
    const priceList = say(`${first.join(', ')} eta ${last}`, `${first.join(', ')} y ${last}`, `${first.join(' و')} و${last}`, `${first.join(', ')} and ${last}`)
    const relation = relationText(round)
    const equations = [
        `${letters.join('+')}=${round.tickets}`,
        `${round.prices.map((price, index) => `${price}${letters[index]}`).join('+')}=${round.takings}`,
        ...(round.relation.kind === 'times' ? [`x=${round.relation.times}z`] : round.relation.kind === 'sum' ? ['x=y+z'] : [])
    ]
    const solution = letters.map((letter, index) => `${letter}=${round.counts[index]}`).join(',\\ ')
    const asked = round.prices[round.ask]
    return (
        <>
            <div className="giz-box-ticket" aria-hidden="true">
                {round.prices.map((price, index) => <span key={price} className={index === round.ask ? 'giz-box-asked' : ''}>{`${price} €`}</span>)}
            </div>
            <p className="prop3-prompt">{l(say(
                `Antzoki batek ${round.tickets} sarrera saldu ditu, ${priceList.eu} eurotan, eta ${number(round.takings, 'eu')} euro bildu ditu.`,
                `Un teatro ha vendido ${round.tickets} entradas de ${priceList.es} euros y ha recaudado ${number(round.takings, 'es')} euros.`,
                `باع مسرح ${round.tickets} تذكرة بأسعار ${priceList.ar} يورو وجمع ${number(round.takings, 'ar')} يورو.`,
                `A theatre has sold ${round.tickets} tickets at ${priceList.en} euros and taken ${number(round.takings, 'en')} euros.`
            ))}</p>
            {relation && <p className="prop3-prompt giz-box-relation">{l(relation)}</p>}
            <p className="prop3-prompt"><strong>{l(say(`Zenbat sarrera dira ${asked} eurokoak?`, `¿Cuántas entradas son de ${asked} euros?`, `كم تذكرة بسعر ${asked} يورو؟`, `How many tickets are ${asked}-euro ones?`))}</strong></p>
            <div className="prop3-options giz-box-options">
                {round.options.map((option, index) => {
                    const state = answered ? (option === right ? 'right' : index === choice ? 'wrong' : '') : ''
                    return <button type="button" key={option} className={state} disabled={answered} onClick={() => choose(index)} dir="ltr">{option}</button>
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice !== null && round.options[choice] === right} language={language}>
                    {equations.map((equation) => <span key={equation} className="dbh4-worked" dir="ltr">{formula(equation, language)}</span>)}
                    <span className="dbh4-worked" dir="ltr">{formula(solution, language)}</span>
                    {l(say('Egiaztatu: sarrerak eta dirua bat datoz.', 'Comprueba: las entradas y el dinero cuadran.', 'تحقق: التذاكر والمال متطابقان.', 'Check: the tickets and the money add up.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function BoxGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BOX_ROUNDS,
                rules: [
                    say('Antzoki baten leihatila ikusiko duzu: prezioak, sarrerak eta bildutako dirua.', 'Verás la taquilla de un teatro: precios, entradas y lo recaudado.', 'سترى شباك تذاكر مسرح: الأسعار والتذاكر والمال المجموع.', 'You will see a theatre box office: prices, tickets and takings.'),
                    say('Aukeratu hiru zenbakietatik zuzena: saiakera bakarra.', 'Elige el número correcto entre tres: un solo intento.', 'اختر العدد الصحيح من ثلاثة: محاولة واحدة.', 'Choose the right number out of three: one try.'),
                    say('Ezezagun bakoitzeko ekuazio bat: hiru prezio, hiru ekuazio.', 'Una ecuación por incógnita: tres precios, tres ecuaciones.', 'معادلة لكل مجهول: ثلاثة أسعار، ثلاث معادلات.', 'One equation per unknown: three prices, three equations.')
                ],
                create: createBoxRounds,
                stars: standardStars(BOX_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BoxPlay
            }}
        />
    )
}

/* ---------- Earn or lose? ---------- */

const VERDICTS: Array<{ id: GainVerdict; label: LocalizedText }> = [
    { id: 'lose', label: say('Galtzen du', 'Pierde', 'يخسر', 'Loses') },
    { id: 'even', label: say('Berdin', 'Ni gana ni pierde', 'يتعادل', 'Breaks even') },
    { id: 'win', label: say('Irabazten du', 'Gana', 'يربح', 'Earns') }
]

function GainPlay({ round, language, onAnswer, answered }: RoundProps<GainRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<string | null>(null)
    const profitLetter = language === 'en' ? 'P' : 'B'
    const point = gainBreakEven(round)
    const right = round.kind === 'point' ? String(point) : gainVerdict(round)
    const choose = (value: string) => {
        if (answered) return
        setChoice(value)
        onAnswer(value === right)
    }
    const data = round.kind === 'formula'
        ? null
        : say(
            `Kostu finkoak: ${number(round.fixed, 'eu')} euro · unitateko kostua: ${round.cost} euro · prezioa: ${round.price} euro`,
            `Costes fijos: ${number(round.fixed, 'es')} euros · coste por unidad: ${round.cost} euros · precio: ${round.price} euros`,
            `التكاليف الثابتة: ${number(round.fixed, 'ar')} يورو · تكلفة الوحدة: ${round.cost} يورو · السعر: ${round.price} يورو`,
            `Fixed costs: ${number(round.fixed, 'en')} euros · cost per unit: ${round.cost} euros · price: ${round.price} euros`
        )
    const profit = gainProfit(round)
    return (
        <>
            {data && <p className="prop3-prompt">{l(data)}</p>}
            {round.kind === 'formula' && (
                <p className="prop3-prompt giz-gain-formulas" dir="ltr">
                    {formula(`I(x)=${round.price}x\\qquad C(x)=${round.fixed}+${round.cost}x`, language)}
                </p>
            )}
            <p className="prop3-prompt"><strong>{l(round.kind === 'point'
                ? say('Zein da atalasea?', '¿Cuál es el punto muerto?', 'ما نقطة التعادل؟', 'What is the break-even point?')
                : say(`${number(round.units, 'eu')} unitate salduta, zer gertatzen da?`, `Vendiendo ${number(round.units, 'es')} unidades, ¿qué pasa?`, `ببيع ${number(round.units, 'ar')} وحدة، ماذا يحدث؟`, `Selling ${number(round.units, 'en')} units, what happens?`))}</strong></p>
            <div className="prop3-options giz-gain-options">
                {round.kind === 'point'
                    ? round.options.map((option) => {
                        const state = answered ? (String(option) === right ? 'right' : String(option) === choice ? 'wrong' : '') : ''
                        return <button type="button" key={option} className={state} disabled={answered} onClick={() => choose(String(option))} dir="ltr">{number(option, language)}</button>
                    })
                    : VERDICTS.map((verdict) => {
                        const state = answered ? (verdict.id === right ? 'right' : verdict.id === choice ? 'wrong' : '') : ''
                        return <button type="button" key={verdict.id} className={state} disabled={answered} onClick={() => choose(verdict.id)}>{l(verdict.label)}</button>
                    })}
            </div>
            {answered && (
                <RoundVerdict right={choice === right} language={language}>
                    {round.kind === 'point'
                        ? <span className="dbh4-worked" dir="ltr">{formula(`x=\\frac{${round.fixed}}{${round.price}-${round.cost}}=${point}`, language)}</span>
                        : <span className="dbh4-worked" dir="ltr">{formula(`${profitLetter}=${round.price}\\cdot ${round.units}-(${round.fixed}+${round.cost}\\cdot ${round.units})=${profit}`, language)}</span>}
                    {l(say(`Atalasea: ${point} unitate. Hortik gora irabazten da.`, `Punto muerto: ${point} unidades. Por encima, se gana.`, `نقطة التعادل: ${point} وحدة. وفوقها نربح.`, `Break-even: ${point} units. Above it, you earn.`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function GainGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GAIN_ROUNDS,
                rules: [
                    say('Negozio bat ikusiko duzu: kostu finkoak, unitateko kostua eta prezioa.', 'Verás un negocio: costes fijos, coste por unidad y precio.', 'سترى مشروعًا: التكاليف الثابتة وتكلفة الوحدة والسعر.', 'You will see a business: fixed costs, cost per unit and price.'),
                    say('Erabaki irabazten duen, galtzen duen ala berdin geratzen den: saiakera bakarra.', 'Decide si gana, pierde o se queda igual: un solo intento.', 'قرّر هل يربح أم يخسر أم يتعادل: محاولة واحدة.', 'Decide whether it earns, loses or breaks even: one try.'),
                    say('Unitate bakoitzak prezioa ken kostua uzten du.', 'Cada unidad deja el precio menos el coste.', 'كل وحدة تترك السعر ناقص التكلفة.', 'Each unit leaves the price minus the cost.')
                ],
                create: createGainRounds,
                stars: standardStars(GAIN_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: GainPlay
            }}
        />
    )
}
