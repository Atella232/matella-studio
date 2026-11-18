import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../text'
import { costLatex, costSlope, createProduceRounds, PRODUCE_MAX, PRODUCE_ROUNDS, profitAt, revenueLatex, revenueSlope, type ProduceRound } from './produce'
import { createRatesRounds, RATES_ROUNDS, type RatesRound } from './rates'
import './SocDerivGames.css'

/* ==========================================================================
   ¿Cuánto producir? and ¿Media o instantánea? (Deribatuak eta haien
   aplikazioak, Batxilergoa 1 · Gizarte Zientziak): the first moves the
   production and shows two bars, the revenue of one more unit and its
   marginal cost, until they are equal; the second asks about the average
   or the instantaneous rate of a function in a context.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const num = (value: number, language: UnitLanguage) => (Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100).replace('.', language === 'eu' || language === 'es' ? '{,}' : '.'))

/* ---------- ¿Cuánto producir? ---------- */

function ProducePlay({ round, language, onAnswer, answered }: RoundProps<ProduceRound>) {
    const l = useGameText(language)
    const [x, setX] = useState(1)
    const right = x === round.answer
    const income = revenueSlope(round, x)
    const cost = costSlope(round, x)
    const scale = Math.max(revenueSlope(round, 0), costSlope(round, PRODUCE_MAX), 1)
    const bar = (value: number) => `${Math.max(2, Math.min(100, (value / scale) * 100))}%`
    const move = (step: number) => setX((value) => Math.min(PRODUCE_MAX, Math.max(1, value + step)))
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zenbat unitatek ematen dute mozkin maximoa? Mugitu ekoizpena eta begiratu barrak.', '¿Cuántas unidades dan el beneficio máximo? Mueve la producción y mira las barras.', 'كم وحدة تعطي الربح الأعظم؟ حرّك الإنتاج وانظر إلى الشريطين.', 'How many units give the greatest profit? Move the production and watch the bars.'))} /></p>
            <div className="dbh4-big-formula">{formula(revenueLatex(round), language)}</div>
            <div className="dbh4-big-formula">{formula(costLatex(round), language)}</div>
            <div className="soc-der-stepper" dir="ltr">
                <button type="button" disabled={answered || x <= 1} onClick={() => move(-5)} aria-label="−5">−5</button>
                <button type="button" disabled={answered || x <= 1} onClick={() => move(-1)} aria-label="−1">−1</button>
                <span className="soc-der-value">{formula(`x=${x}`, language)}</span>
                <button type="button" disabled={answered || x >= PRODUCE_MAX} onClick={() => move(1)} aria-label="+1">+1</button>
                <button type="button" disabled={answered || x >= PRODUCE_MAX} onClick={() => move(5)} aria-label="+5">+5</button>
            </div>
            <div className="soc-der-bars">
                <div className="soc-der-bar-row">
                    <span className="soc-der-bar-label">{formula(`I'(${x})=${num(income, language)}`, language)}</span>
                    <span className="soc-der-bar-track"><span className="soc-der-bar income" style={{ width: bar(income) }} /></span>
                </div>
                <div className="soc-der-bar-row">
                    <span className="soc-der-bar-label">{formula(`C'(${x})=${num(cost, language)}`, language)}</span>
                    <span className="soc-der-bar-track"><span className="soc-der-bar cost" style={{ width: bar(cost) }} /></span>
                </div>
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`I'(x)=C'(x)\\ \\to\\ x=${round.answer}`, language)}</span>
                    <span className="dbh4-worked">{formula(`B(${round.answer})=${num(profitAt(round, round.answer), language)}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function ProduceGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PRODUCE_ROUNDS,
                rules: [
                    say('Urdina: unitate bat gehiagoren diru-sarrera, $I\'(x)$. Gorria: haren kostu marjinala, $C\'(x)$.', 'Azul: el ingreso de una unidad más, $I\'(x)$. Rojo: su coste marginal, $C\'(x)$.', 'الأزرق: إيراد وحدة إضافية $I\'(x)$. والأحمر: تكلفتها الحدية $C\'(x)$.', 'Blue: the revenue of one more unit, $I\'(x)$. Red: its marginal cost, $C\'(x)$.'),
                    say('Urdina luzeagoa den bitartean, gehiago ekoiztea komeni da. Mozkina maximoa da bi barrak berdinak direnean.', 'Mientras la azul es más larga, conviene producir más. El beneficio es máximo cuando las dos barras son iguales.', 'ما دام الأزرق أطول فمن المفيد إنتاج المزيد. ويكون الربح أعظميًّا عندما يتساوى الشريطان.', 'While the blue one is longer, it pays to produce more. The profit is greatest when both bars are equal.'),
                    say('Aukeratu ekoizpena eta egiaztatu.', 'Elige la producción y comprueba.', 'اختر الإنتاج وتحقّق.', 'Choose the production and check.')
                ],
                create: createProduceRounds,
                stars: standardStars(PRODUCE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: ProducePlay
            }}
        />
    )
}

/* ---------- ¿Media o instantánea? ---------- */

function RatesPlay({ round, language, onAnswer, answered }: RoundProps<RatesRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const right = chosen === round.answer
    return (
        <>
            <div className="dbh4-big-formula">{formula(round.latex, language)}</div>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <div className="soc-der-choices">
                {round.options.map((value) => (
                    <button key={value} type="button" className={`soc-der-choice${chosen === value ? ' chosen' : ''}`} aria-pressed={chosen === value} disabled={answered} onClick={() => setChosen(value)}>{formula(num(value, language), language)}</button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function RatesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RATES_ROUNDS,
                rules: [
                    say('Batez besteko tasa: $\\frac{f(b)-f(a)}{b-a}$, tarte batean.', 'Tasa media: $\\frac{f(b)-f(a)}{b-a}$, en un intervalo.', 'المعدل المتوسط: $\\frac{f(b)-f(a)}{b-a}$ في مجال.', 'Average rate: $\\frac{f(b)-f(a)}{b-a}$, on an interval.'),
                    say('Berehalako tasa: $f\'(a)$, une batean.', 'Tasa instantánea: $f\'(a)$, en un instante.', 'المعدل اللحظي: $f\'(a)$ في لحظة.', 'Instantaneous rate: $f\'(a)$, at an instant.'),
                    say('Aukeratu txartel bat eta egiaztatu.', 'Elige una tarjeta y comprueba.', 'اختر بطاقة وتحقّق.', 'Choose a card and check.')
                ],
                create: createRatesRounds,
                stars: standardStars(RATES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: RatesPlay
            }}
        />
    )
}
