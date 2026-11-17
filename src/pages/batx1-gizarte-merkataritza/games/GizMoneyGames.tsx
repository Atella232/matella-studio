import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor, groupDigits } from '../../../utils/numberFormat'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './GizMoneyGames.css'
import { createGapRounds, GAPS_ROUNDS, rightValue, type GapColumn, type GapRound } from './gaps'
import { betterOffer, createOfferRounds, OFFER_ROUNDS, offerTae, type Offer, type OfferRound } from './offer'

/* ==========================================================================
   Zein eskaintza da hobea? and Hutsuneak dituen taula (Merkataritza-
   aritmetika, Batxilergoa 1 · Gizarte Zientziak): the better offer is one
   tap, and then each offer shows its APR worked out; the empty cell of the
   repayment table is chosen among three values, and then the cell is
   worked out from its row.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** Money as each language writes it: 1 234,56 or 1,234.56 */
function money(value: number, language: UnitLanguage, decimals = 2): string {
    const [whole, part] = Math.abs(value).toFixed(decimals).split('.')
    const grouped = groupDigits(whole, language)
    return part ? `${grouped}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${part}` : grouped
}
/** A number for LaTeX: {,} for the comma (the point in Arabic) */
const tex = (value: number, decimals: number, language: UnitLanguage) => value.toFixed(decimals).replace('.', language === 'ar' ? '.' : '{,}')

const PERIOD_WORDS: Record<Offer['periods'], LocalizedText> = {
    1: say('urtean behin', 'pago anual', 'دفع سنوي', 'paid yearly'),
    2: say('seihilekoan', 'pago semestral', 'دفع نصف سنوي', 'paid every six months'),
    4: say('hiruhilekoan', 'pago trimestral', 'دفع ربع سنوي', 'paid quarterly'),
    12: say('hilero', 'pago mensual', 'دفع شهري', 'paid monthly')
}

/* ---------- Which offer is better? ---------- */

function OfferPlay({ round, language, onAnswer, answered }: RoundProps<OfferRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const right = betterOffer(round)
    const choose = (index: number) => {
        if (answered) return
        setChoice(index)
        onAnswer(index === right)
    }
    const question = round.kind === 'deposit'
        ? say('Zein gordailuk ematen du gehiago?', '¿Qué depósito da más?', 'أيّ الوديعتين تعطي أكثر؟', 'Which deposit gives more?')
        : say('Zein mailegu da merkeagoa?', '¿Qué préstamo es más barato?', 'أيّ القرضين أرخص؟', 'Which loan is cheaper?')
    const taeLatex = (offer: Offer) => offer.fee > 0
        ? `\\frac{${tex(1 + offer.rate / 100, 3, language)}}{${tex(1 - offer.fee / 100, 3, language)}}-1\\approx ${tex(offerTae(offer) / 100, 4, language)}`
        : `\\left(1+\\frac{${tex(offer.rate / 100, 3, language)}}{${offer.periods}}\\right)^{${offer.periods}}-1\\approx ${tex(offerTae(offer) / 100, 4, language)}`
    return (
        <>
            <p className="prop3-prompt">{l(question)}</p>
            <div className="prop3-options giz-offer-options">
                {round.offers.map((offer, index) => {
                    const state = answered ? (index === right ? 'right' : index === choice ? 'wrong' : '') : ''
                    return (
                        <button type="button" key={index} className={state} disabled={answered} onClick={() => choose(index)}>
                            <span className="giz-offer-name">{l(say(index === 0 ? 'A eskaintza' : 'B eskaintza', `Oferta ${index === 0 ? 'A' : 'B'}`, `العرض ${index === 0 ? 'A' : 'B'}`, `Offer ${index === 0 ? 'A' : 'B'}`))}</span>
                            <span className="giz-offer-rate" dir="ltr">{`${money(offer.rate, language, Number.isInteger(offer.rate) ? 0 : 1)} %`}</span>
                            <span className="giz-offer-detail">{l(PERIOD_WORDS[offer.periods])}</span>
                            {offer.fee > 0 && <span className="giz-offer-detail">{l(say(`komisioa: % ${money(offer.fee, language, Number.isInteger(offer.fee) ? 0 : 1)}`, `comisión: ${money(offer.fee, language, Number.isInteger(offer.fee) ? 0 : 1)} %`, `العمولة: ${money(offer.fee, language, Number.isInteger(offer.fee) ? 0 : 1)} %`, `fee: ${money(offer.fee, language, Number.isInteger(offer.fee) ? 0 : 1)}%`))}</span>}
                        </button>
                    )
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice === right} language={language}>
                    {round.offers.map((offer, index) => <span key={index} className="dbh4-worked" dir="ltr">{formula(`${index === 0 ? 'A' : 'B'}:\\ ${taeLatex(offer)}`, language)}</span>)}
                    {l(round.kind === 'deposit'
                        ? say('Gordailu batean, urteko tasa baliokide handiena da hobea.', 'En un depósito, gana la TAE más alta.', 'في الوديعة يفوز المعدل الأعلى.', 'For a deposit, the higher APR wins.')
                        : say('Mailegu batean, urteko tasa baliokide txikiena da hobea.', 'En un préstamo, gana la TAE más baja.', 'في القرض يفوز المعدل الأدنى.', 'For a loan, the lower APR wins.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function OfferGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: OFFER_ROUNDS,
                rules: [
                    say('Bi eskaintza ikusiko dituzu: gordailuak edo maileguak.', 'Verás dos ofertas: depósitos o préstamos.', 'سترى عرضين: ودائع أو قروضًا.', 'You will see two offers: deposits or loans.'),
                    say('Sakatu hobea: saiakera bakarra.', 'Toca la mejor: un solo intento.', 'المس الأفضل: محاولة واحدة.', 'Tap the better one: one try.'),
                    say('Konparatu urteko tasa baliokidea, ez iragarritako interesa.', 'Compara la TAE, no el interés anunciado.', 'قارن المعدل السنوي المكافئ لا الفائدة المعلنة.', 'Compare the APR, not the advertised interest.')
                ],
                create: createOfferRounds,
                stars: standardStars(OFFER_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: OfferPlay
            }}
        />
    )
}

/* ---------- The table with gaps ---------- */

const COLUMNS: Array<{ id: GapColumn | 'debt'; title: LocalizedText }> = [
    { id: 'debt', title: say('Zorra', 'Deuda', 'الدين', 'Debt') },
    { id: 'interest', title: say('Interesak', 'Intereses', 'الفوائد', 'Interest') },
    { id: 'repaid', title: say('Amortizazioa', 'Amortiz.', 'الإطفاء', 'Repaid') },
    { id: 'left', title: say('Geratzen da', 'Queda', 'الباقي', 'Left') }
]

function GapsPlay({ round, language, onAnswer, answered }: RoundProps<GapRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const value = rightValue(round)
    const choose = (index: number) => {
        if (answered) return
        setChoice(index)
        onAnswer(round.options[index] === value)
    }
    const row = round.rows[round.year - 1]
    const worked = round.column === 'interest'
        ? `${tex(row.debt, 2, language)}\\cdot ${tex(round.rate / 100, 2, language)}=${tex(row.interest, 2, language)}`
        : round.column === 'repaid'
            ? `${tex(round.payment, 2, language)}-${tex(row.interest, 2, language)}=${tex(row.repaid, 2, language)}`
            : `${tex(row.debt, 2, language)}-${tex(row.repaid, 2, language)}=${tex(row.left, 2, language)}`
    return (
        <>
            <p className="prop3-prompt">{l(say(
                `Mailegua: ${money(round.capital, language, 0)} euro, % ${round.rate}, urtekoa ${money(round.payment, language)} euro. Zein balio falta da?`,
                `Préstamo: ${money(round.capital, language, 0)} euros al ${round.rate} %, anualidad de ${money(round.payment, language)} euros. ¿Qué valor falta?`,
                `القرض: ${money(round.capital, language, 0)} يورو بفائدة ${round.rate} %، والدفعة السنوية ${money(round.payment, language)} يورو. ما القيمة الناقصة؟`,
                `Loan: ${money(round.capital, language, 0)} euros at ${round.rate}%, yearly payment ${money(round.payment, language)} euros. Which value is missing?`
            ))}</p>
            <div className="giz-gaps-table-wrap">
                <table className="giz-gaps-table">
                    <thead>
                        <tr><th>#</th>{COLUMNS.map((column) => <th key={column.id}>{l(column.title)}</th>)}</tr>
                    </thead>
                    <tbody>
                        {round.rows.map((item) => (
                            <tr key={item.year}>
                                <td>{item.year}</td>
                                {COLUMNS.map((column) => {
                                    const hidden = item.year === round.year && column.id === round.column
                                    return <td key={column.id} className={hidden ? 'giz-gap' : ''} dir="ltr">{hidden && !answered ? '?' : money(item[column.id], language)}</td>
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="prop3-options giz-gap-options">
                {round.options.map((option, index) => {
                    const state = answered ? (option === value ? 'right' : index === choice ? 'wrong' : '') : ''
                    return <button type="button" key={index} className={state} disabled={answered} onClick={() => choose(index)} dir="ltr">{money(option, language)}</button>
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice !== null && round.options[choice] === value} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(worked, language)}</span>
                    {l(say('Interesak = zorra bider i; amortizazioa = urtekoa ken interesak; geratzen dena = zorra ken amortizazioa.', 'Intereses = deuda por i; amortización = anualidad menos intereses; queda = deuda menos amortización.', 'الفوائد = الدين في i، والإطفاء = الدفعة ناقص الفوائد، والباقي = الدين ناقص الإطفاء.', 'Interest = debt times i; repaid = payment minus interest; left = debt minus repaid.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function GapsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GAPS_ROUNDS,
                rules: [
                    say('Mailegu baten amortizazio-taula ikusiko duzu, gelaxka bat hutsik.', 'Verás la tabla de amortización de un préstamo con una casilla vacía.', 'سترى جدول إطفاء قرض فيه خانة فارغة.', 'You will see the repayment table of a loan with one empty cell.'),
                    say('Aukeratu hiru balioetatik zuzena: saiakera bakarra.', 'Elige el valor correcto entre tres: un solo intento.', 'اختر القيمة الصحيحة من ثلاث: محاولة واحدة.', 'Choose the right value out of three: one try.'),
                    say('Begiratu lerroari: zorra, interesak, amortizazioa eta geratzen dena.', 'Mira la fila: deuda, intereses, amortización y lo que queda.', 'انظر إلى الصف: الدين والفوائد والإطفاء والباقي.', 'Look at the row: debt, interest, repaid and what is left.')
                ],
                create: createGapRounds,
                stars: standardStars(GAPS_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: GapsPlay
            }}
        />
    )
}
