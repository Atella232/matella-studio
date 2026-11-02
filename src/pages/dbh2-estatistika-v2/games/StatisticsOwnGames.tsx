import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { num } from '../palette'
import { BAG_MAX, BAG_ROUNDS, BALL_COLOURS, bagRight, bagStars, conditionHolds, createBagRounds, type BagCondition, type BagCounts, type BagRound, type BallColour } from './bag'
import { createStatisticsDetectiveCases, STATISTICS_DETECTIVE_CASES, statisticsDetectiveNames, statisticsDetectiveTips } from './detective'
import { StatisticsGameArt } from './GameArt'
import { statisticsGames, type StatisticsGameId } from './info'
import { createMissingRounds, mean, median, MISSING_ROUNDS, missingRight, missingStars, tableMean, type MissingRound } from './missing'
import './OwnGames.css'

/* ==========================================================================
   The three games of Estatistika eta probabilitatea 2. DBH that belong to
   this topic: the missing card and pack the bag (in the shared RoundGame)
   and the statistics detective (the shared worked-solution detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: StatisticsGameId) => statisticsGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const decimal = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')

/* ---------- J1. The missing card ---------- */

const TARGET_NAMES: Record<MissingRound['kind'], LocalizedText> = {
    mean: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'),
    median: say('Mediana', 'Mediana', 'الوسيط', 'Median'),
    frequency: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean')
}

function MissingPlay({ round, language, onAnswer, answered }: RoundProps<MissingRound>) {
    const l = useGameText(language)
    const [hidden, setHidden] = useState(round.kind === 'frequency' ? 1 : round.min)
    const right = missingRight(round, hidden)
    const data = [...round.known, round.answer].sort((a, b) => a - b)
    const worked = round.kind === 'mean'
        ? `\\frac{${[...round.known, round.answer].join('+')}}{5}=${decimal(mean(data))}`
        : round.kind === 'median'
            ? `${data.join('\\le ')}\\ \\to\\ \\frac{${data[2]}+${data[3]}}{2}=${decimal(median(data))}`
            : (() => {
                const frequencies = round.table!.frequencies.map((frequency) => frequency ?? round.answer)
                const total = frequencies.reduce((sum, frequency) => sum + frequency, 0)
                const weighted = round.table!.values.reduce((sum, value, index) => sum + value * frequencies[index], 0)
                return `\\frac{${weighted}}{${total}}=${decimal(tableMean(round.table!.values, frequencies))}`
            })()
    return (
        <>
            <p className="prop3-prompt">
                {l(TARGET_NAMES[round.kind])}: <strong>{num(language, round.target)}</strong>
            </p>
            {round.table ? (
                <table className="stats2-table" dir="ltr">
                    <tbody>
                        <tr><th>{l(say('Anai-arrebak', 'Hermanos', 'الإخوة', 'Siblings'))}</th>{round.table.values.map((value) => <td key={value}>{value}</td>)}</tr>
                        <tr><th>{l(say('Ikasleak', 'Alumnos', 'الطلاب', 'Pupils'))}</th>{round.table.frequencies.map((frequency, index) => <td key={index} className={frequency === null ? 'missing' : ''}>{frequency ?? (answered ? round.answer : '?')}</td>)}</tr>
                    </tbody>
                </table>
            ) : (
                <div className="stats2-cards" dir="ltr">
                    {round.known.map((value, index) => <span key={index} className="stats2-card">{value}</span>)}
                    <span className={`stats2-card hidden${answered ? (right ? ' right' : ' wrong') : ''}`}>{answered ? round.answer : '?'}</span>
                </div>
            )}
            {!answered && (
                <>
                    <Stepper label={round.kind === 'frequency' ? l(say('Falta den maiztasuna', 'Frecuencia que falta', 'التكرار الناقص', 'Missing frequency')) : l(say('Ezkutuko txartela', 'Carta oculta', 'البطاقة المخفية', 'Hidden card'))} value={hidden} min={round.min} max={round.max} onChange={setHidden} language={language} />
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Buelta eman txartelari', 'Da la vuelta', 'اقلب البطاقة', 'Turn it over'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {!right && `${l(say('Zurea', 'El tuyo', 'رقمك', 'Yours'))}: ${hidden}. `}
                    {formula(worked, language)}
                </RoundVerdict>
            )}
        </>
    )
}

const missingConfig: RoundGameConfig<MissingRound> = {
    game: info('missing'),
    art: <StatisticsGameArt game="missing" />,
    rounds: MISSING_ROUNDS,
    rules: [
        say('Txartel bat buruz behera dago. Aurkitu zein den, emandako batez bestekoa edo mediana lortzeko.', 'Una carta está boca abajo. Descubre cuál es para que salga la media o la mediana que se pide.', 'إحدى البطاقات مقلوبة. اكتشف قيمتها ليخرج المتوسط أو الوسيط المطلوب.', 'One card is face down. Work out what it is so that the data have the mean or median asked for.'),
        say('2. mailan sei datu daude: mediana erdiko bien batez bestekoa da.', 'En el nivel 2 hay seis datos: la mediana es la media de los dos centrales.', 'في المستوى 2 ست قيم: الوسيط متوسط القيمتين الوسطيين.', 'In level 2 there are six data: the median is the mean of the two middle ones.'),
        say('3. mailan maiztasun-taula baten maiztasun bat falta da.', 'En el nivel 3 falta una frecuencia de una tabla.', 'في المستوى 3 ينقص تكرار من جدول.', 'In level 3 a frequency of a table is missing.')
    ],
    create: createMissingRounds,
    stars: missingStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: MissingPlay
}

export const MissingGame = (props: GameProps) => <RoundGame {...props} config={missingConfig} />

/* ---------- J2. Pack the bag ---------- */

const COLOUR_NAMES: Record<BallColour, LocalizedText> = {
    red: say('gorria', 'roja', 'حمراء', 'red'),
    blue: say('urdina', 'azul', 'زرقاء', 'blue'),
    green: say('berdea', 'verde', 'خضراء', 'green')
}
const STEPPER_NAMES: Record<BallColour, LocalizedText> = {
    red: say('Gorriak', 'Rojas', 'الحمراء', 'Red'),
    blue: say('Urdinak', 'Azules', 'الزرقاء', 'Blue'),
    green: say('Berdeak', 'Verdes', 'الخضراء', 'Green')
}
const BALL_FILL: Record<BallColour, string> = { red: '#d9502e', blue: '#2f6fdb', green: '#267b53' }

function conditionText(condition: BagCondition, l: (text: LocalizedText) => string): string {
    if (condition.kind === 'twice') return l(say(`Gorria ateratzea urdina ateratzea baino bi aldiz probableagoa da`, `Sacar roja es el doble de probable que sacar azul`, `سحب الحمراء ضعف احتمال سحب الزرقاء`, `A red ball is twice as likely as a blue one`))
    const p = `$P=${toLatex(fraction(condition.numerator, condition.denominator))}$`
    const colour = l(COLOUR_NAMES[condition.colour])
    if (condition.kind === 'not') return l(say(`Ez ${colour}: ${p}`, `No ${colour}: ${p}`, `ليست ${colour}: ${p}`, `Not ${colour}: ${p}`))
    return l(say(`Bola ${colour}: ${p}`, `Bola ${colour}: ${p}`, `كرة ${colour}: ${p}`, `A ${colour} ball: ${p}`))
}

function BagScene({ counts }: { counts: BagCounts }) {
    const balls = BALL_COLOURS.flatMap((colour) => Array.from({ length: counts[colour] }, () => colour))
    return (
        <svg className="stats2-bag" viewBox="0 0 220 170" aria-hidden="true">
            <path d="M 40 40 Q 30 160 110 160 Q 190 160 180 40 Z" fill="var(--paper-deep, #ece6da)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M 34 40 L 186 40" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
            {balls.map((colour, index) => {
                const row = Math.floor(index / 7)
                const column = index % 7
                return <circle key={index} cx={56 + column * 18 + (row % 2) * 9} cy={146 - row * 17} r="8" fill={BALL_FILL[colour]} stroke="var(--ink)" strokeWidth="1.5" />
            })}
        </svg>
    )
}

function BagPlay({ round, language, onAnswer, answered }: RoundProps<BagRound>) {
    const l = useGameText(language)
    const [counts, setCounts] = useState<BagCounts>({ red: 0, blue: 0, green: 0 })
    const right = bagRight(round, counts)
    const all = counts.red + counts.blue + counts.green
    return (
        <>
            <ul className="prop3-prompt stats2-conditions">
                {round.conditions.map((condition, index) => (
                    <li key={index} className={answered ? (conditionHolds(condition, counts) ? 'right' : 'wrong') : ''}>
                        <MathText text={conditionText(condition, l)} inline />
                    </li>
                ))}
            </ul>
            <BagScene counts={counts} />
            {!answered && (
                <>
                    <div className="stats2-steppers">
                        {BALL_COLOURS.map((colour) => (
                            <Stepper key={colour} label={l(STEPPER_NAMES[colour])} value={counts[colour]} min={0} max={BAG_MAX} onChange={(value) => setCounts({ ...counts, [colour]: value })} language={language} />
                        ))}
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" disabled={all === 0} onClick={() => onAnswer(right)}>{l(say('Itxi poltsa', 'Cierra la bolsa', 'أغلق الكيس', 'Close the bag'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {BALL_COLOURS.map((colour) => <span key={colour} className="stats2-probability">{l(COLOUR_NAMES[colour])} {formula(`\\frac{${counts[colour]}}{${all}}`, language)}</span>)}
                    {!right && <> {l(say('Adibidez:', 'Por ejemplo:', 'مثلًا:', 'For example:'))} {BALL_COLOURS.map((colour) => `${round.example[colour]} ${l(COLOUR_NAMES[colour])}`).join(l(say(', ', ', ', '، ', ', ')))}.</>}
                </RoundVerdict>
            )}
        </>
    )
}

const bagConfig: RoundGameConfig<BagRound> = {
    game: info('bag'),
    art: <StatisticsGameArt game="bag" />,
    rounds: BAG_ROUNDS,
    rules: [
        say('Sartu bolak poltsan txartelak dioen probabilitatea izan dezaten.', 'Mete bolas en la bolsa para que tenga las probabilidades de la tarjeta.', 'ضع كرات في الكيس ليحقق الاحتمالات المكتوبة على البطاقة.', 'Put balls in the bag so that it has the probabilities on the card.'),
        say('Laplace: aldeko kasuak zati kasu posibleak. Poltsa asko izan daitezke zuzenak.', 'Laplace: casos favorables entre casos posibles. Muchas bolsas pueden ser correctas.', 'لابلاس: الحالات الملائمة على الحالات الممكنة. قد تصلح أكياس كثيرة.', 'Laplace: favourable cases over possible cases. Many bags can be right.'),
        say(`${BAG_ROUNDS} poltsa maila bakoitzean; saiakera bat bakoitzeko.`, `${BAG_ROUNDS} bolsas por nivel; un intento en cada una.`, `${BAG_ROUNDS} أكياس في كل مستوى؛ محاولة واحدة لكل كيس.`, `${BAG_ROUNDS} bags per level; one try each.`)
    ],
    create: createBagRounds,
    stars: bagStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: BagPlay
}

export const BagGame = (props: GameProps) => <RoundGame {...props} config={bagConfig} />

/* ---------- J3. The statistics detective ---------- */

export const StatisticsDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <StatisticsGameArt game="detective" />, cases: STATISTICS_DETECTIVE_CASES, createCases: createStatisticsDetectiveCases, names: statisticsDetectiveNames, tips: statisticsDetectiveTips }}
    />
)
