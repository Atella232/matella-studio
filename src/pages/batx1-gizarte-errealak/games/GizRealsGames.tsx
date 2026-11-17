import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './GizRealsGames.css'
import { createHeadlineRounds, groupedLatex, HEADLINE_ROUNDS, relativeError, rightOption, type HeadlineRound } from './headline'
import { cardLatex, createOrderRounds, isRightOrder, ORDER_ROUNDS, rightOrder, scientificLatex, type OrderRound } from './order'

/* ==========================================================================
   Ordenatu ekonomia and Titular zuzena (Zenbaki errealak, Batxilergoa 1 ·
   Gizarte Zientziak): the four figures are tapped in order (a number shows
   the place given; «Undo» takes the last one back) and then shown in
   scientific notation; the headline is one tap, and then every headline
   shows its relative error against the limit.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** In an Arabic sentence each formula goes between LRI and PDI, so a number such as 5 761 449 keeps its order */
const isolated = (text: string) => text.replace(/\$[^$]+\$/g, (math) => `⁦${math}⁩`)
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** A percentage for LaTeX: 0{,}8 or 0.8 in Arabic (MathText writes the point in English) */
const percentLatex = (value: number, language: UnitLanguage) => {
    const decimals = value >= 10 ? 1 : value >= 1 ? 2 : 3
    const text = String(Math.round(value * 10 ** decimals) / 10 ** decimals)
    return language === 'ar' ? text : text.replace('.', '{,}')
}

/* ---------- Order the economy ---------- */

function OrderPlay({ round, language, onAnswer, answered }: RoundProps<OrderRound>) {
    const l = useGameText(language)
    const [picks, setPicks] = useState<number[]>([])
    const order = rightOrder(round)
    const right = isRightOrder(round, picks)
    const tap = (index: number) => {
        if (answered || picks.includes(index)) return
        setPicks([...picks, index])
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Sakatu datuak txikienetik handienera.', 'Toca los datos de menor a mayor.', 'المس المعطيات من الأصغر إلى الأكبر.', 'Tap the figures from smallest to largest.'))}</p>
            <div className="prop3-options giz-order-cards">
                {round.cards.map((card, index) => {
                    const place = picks.indexOf(index)
                    const state = answered ? (order.indexOf(index) === place ? 'right' : 'wrong') : ''
                    return (
                        <button type="button" key={index} className={state} disabled={answered || place >= 0} onClick={() => tap(index)} aria-label={`${l(card.label)}: ${cardLatex(card)}`}>
                            <span className="giz-order-label">{l(card.label)}</span>
                            <span className="giz-order-value" dir="ltr">{formula(cardLatex(card), language)}</span>
                            {place >= 0 && <span className="giz-order-place">{place + 1}</span>}
                        </button>
                    )
                })}
            </div>
            {!answered && (
                <div className="prop3-panel giz-order-actions">
                    <button type="button" className="fraction-v2-secondary" disabled={picks.length === 0} onClick={() => setPicks(picks.slice(0, -1))}>{l(say('Desegin', 'Deshacer', 'تراجع', 'Undo'))}</button>
                    <button type="button" className="fraction-v2-primary" disabled={picks.length < round.cards.length} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked giz-order-worked" dir="ltr">{formula(order.map((index) => scientificLatex(round.cards[index])).join('<'), language)}</span>
                    {l(say('Idazkera zientifikoan, lehenik berretzailea konparatzen da, eta berdinak badira, mantisa.', 'En notación científica se compara primero el exponente y, si es igual, la mantisa.', 'في الترميز العلمي نقارن الأس أولًا، وإذا تساوى نقارن الجزء العشري.', 'In scientific notation, compare the exponent first and, if it is the same, the mantissa.'))}
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
                    say('Lau datu ekonomiko ikusiko dituzu, modu desberdinetan idatzita.', 'Verás cuatro datos económicos escritos de formas distintas.', 'سترى أربعة معطيات اقتصادية مكتوبة بطرق مختلفة.', 'You will see four economic figures written in different ways.'),
                    say('Sakatu txikienetik handienera; Desegin botoiak azkena kentzen du.', 'Tócalos de menor a mayor; «Deshacer» quita el último.', 'المسها من الأصغر إلى الأكبر، و«تراجع» يحذف الأخير.', 'Tap them from smallest to largest; «Undo» takes back the last one.'),
                    say('Laguntza: pasatu guztiak idazkera zientifikora.', 'Truco: pásalos todos a notación científica.', 'حيلة: حوّلها كلها إلى الترميز العلمي.', 'Tip: write them all in scientific notation.')
                ],
                create: createOrderRounds,
                stars: standardStars(ORDER_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: OrderPlay
            }}
        />
    )
}

/* ---------- The fair headline ---------- */

function HeadlinePlay({ round, language, onAnswer, answered }: RoundProps<HeadlineRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const right = rightOption(round)
    const limit = percentLatex(round.limit * 100, language)
    const choose = (index: number) => {
        if (answered) return
        setChoice(index)
        onAnswer(index === right)
    }
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(say(
                    `${round.label.eu}: $${groupedLatex(round.exact)}$. Aukeratu titularrik laburrena, errore erlatiboa $${limit}\\,\\%$ baino txikiagoa badu.`,
                    `${round.label.es}: $${groupedLatex(round.exact)}$. Elige el titular más corto con un error relativo menor que el $${limit}\\,\\%$.`,
                    isolated(`${round.label.ar}: $${groupedLatex(round.exact)}$. اختر أقصر عنوان خطؤه النسبي أقل من $${limit}\\,\\%$.`),
                    `${round.label.en}: $${groupedLatex(round.exact)}$. Choose the shortest headline with a relative error under $${limit}\\,\\%$.`
                ))} />
            </p>
            <div className="prop3-options giz-headline-options">
                {round.options.map((option, index) => {
                    const state = answered ? (index === right ? 'right' : index === choice ? 'wrong' : '') : ''
                    const error = relativeError(round.exact, option.value) * 100
                    return (
                        <button type="button" key={index} className={state} disabled={answered} onClick={() => choose(index)}>
                            <span className="giz-order-value" dir="ltr">{formula(groupedLatex(option.value), language)}</span>
                            {answered && <span className="giz-headline-error" dir="ltr">{formula(`E_r\\approx ${percentLatex(error, language)}\\,\\%`, language)}</span>}
                        </button>
                    )
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice === right} language={language}>
                    {l(say(
                        `Zifra gutxiagorekin, errorea mugatik gora doa; gehiagorekin, titularra behar baino luzeagoa da.`,
                        'Con menos cifras el error pasa del límite; con más, el titular es más largo de lo necesario.',
                        'بأرقام أقل يتجاوز الخطأ الحدّ، وبأرقام أكثر يصبح العنوان أطول من اللازم.',
                        'With fewer figures the error goes over the limit; with more, the headline is longer than needed.'
                    ))}
                </RoundVerdict>
            )}
        </>
    )
}

export function HeadlineGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HEADLINE_ROUNDS,
                rules: [
                    say('Datu zehatz bat eta lau titular biribildu ikusiko dituzu.', 'Verás un dato exacto y cuatro titulares redondeados.', 'سترى معطى دقيقًا وأربعة عناوين مقرّبة.', 'You will see an exact figure and four rounded headlines.'),
                    say('Aukeratu laburrena, errore erlatiboa mugaren azpitik badu: saiakera bakarra.', 'Elige el más corto cuyo error relativo esté por debajo del límite: un solo intento.', 'اختر الأقصر الذي يكون خطؤه النسبي تحت الحدّ: محاولة واحدة.', 'Choose the shortest one whose relative error is under the limit: one try.'),
                    say('Errore erlatiboa = errorea : datu zehatza.', 'Error relativo = error ÷ dato exacto.', 'الخطأ النسبي = الخطأ ÷ المعطى الدقيق.', 'Relative error = error ÷ exact figure.')
                ],
                create: createHeadlineRounds,
                stars: standardStars(HEADLINE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: HeadlinePlay
            }}
        />
    )
}
