import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './BachStatsGames.css'
import { createStandoutRounds, STANDOUT_ROUNDS, tenths, zText, type StandoutRound } from './standout'
import { chartCv, chartMean, chartSigma, chartValues, createHistogramRounds, HISTOGRAM_ROUNDS, SHAPES, twoPlaces, type HistogramRound, type MiniHistogram } from './whichHistogram'

/* ==========================================================================
   Nork nabarmentzen du gehiago? and Zein histograma? (Estatistika
   unidimentsionala, Batxilergoa 1 · Zientziak): the first shows two or
   three results, each in its group, and asks which one stands out more;
   the second shows three bar charts and asks for the most spread out one,
   the one with the largest CV or the one with a given x̄ and σ.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const NAMES = ['A', 'B', 'C']

/* ---------- Who stands out more? ---------- */

function StandoutPlay({ round, language, onAnswer, answered }: RoundProps<StandoutRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const unit = round.lowerBetter ? '\\ \\text{s}' : ''
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const question = round.lowerBetter
        ? say('Denboretan, gutxiago hobe da. Nork nabarmentzen du gehiago bere taldean?', 'En tiempos, menos es mejor. ¿Quién destaca más en su grupo?', 'في الأزمنة الأقل أفضل. من يتميّز أكثر في مجموعته؟', 'With times, less is better. Who stands out more in their group?')
        : say('Nork nabarmentzen du gehiago bere taldean?', '¿Quién destaca más en su grupo?', 'من يتميّز أكثر في مجموعته؟', 'Who stands out more in their group?')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className={`prop3-options bach-stats-people bach-stats-people-${round.people.length}`} dir="ltr">
                {round.people.map((person, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <strong className="bach-stats-name">{NAMES[index]}</strong>
                        <span>{formula(`x=${tenths(person.value)}${unit}`, language)}</span>
                        <span className="bach-stats-group">{formula(`\\bar{x}=${tenths(person.mean)}`, language)}</span>
                        <span className="bach-stats-group">{formula(`\\sigma=${tenths(person.sd)}`, language)}</span>
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.people.map((person, index) => (
                        <span key={index} className="dbh4-worked">{formula(`z_${NAMES[index]}=\\frac{${tenths(person.value)}-${tenths(person.mean)}}{${tenths(person.sd)}}=${zText(person)}`, language)}</span>
                    ))}
                    <MathText text={l(round.lowerBetter
                        ? say(`${NAMES[round.answer]} da nabarmenena: haren $z$ negatiboena da.`, `Destaca ${NAMES[round.answer]}: su $z$ es la más negativa.`, `يتميّز ${NAMES[round.answer]}: درجته $z$ هي الأكثر سلبية.`, `${NAMES[round.answer]} stands out: their $z$ is the most negative.`)
                        : say(`${NAMES[round.answer]} da nabarmenena: haren $z$ handiena da.`, `Destaca ${NAMES[round.answer]}: su $z$ es la mayor.`, `يتميّز ${NAMES[round.answer]}: درجته $z$ هي الأكبر.`, `${NAMES[round.answer]} stands out: their $z$ is the largest.`))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function StandoutGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: STANDOUT_ROUNDS,
                rules: [
                    say('Emaitza bakoitza bere taldean dago, bere batez bestekoarekin eta bere $\\sigma$ zenbakiarekin.', 'Cada resultado está en su grupo, con su media y su $\\sigma$.', 'كل نتيجة في مجموعتها، بمتوسطها و$\\sigma$ الخاص بها.', 'Each result is in its own group, with its mean and its $\\sigma$.'),
                    say('Gehien nabarmentzen dena ez da beti emaitzarik onena: konparatu $z=\\frac{x-\\bar{x}}{\\sigma}$.', 'El que más destaca no siempre es el mejor resultado: compara $z=\\frac{x-\\bar{x}}{\\sigma}$.', 'الأكثر تميّزًا ليس دائمًا صاحب أفضل نتيجة: قارن $z=\\frac{x-\\bar{x}}{\\sigma}$.', 'The one that stands out most is not always the best result: compare $z=\\frac{x-\\bar{x}}{\\sigma}$.'),
                    say('2. mailan denborak dira: gutxiago hobe, eta $z$ negatiboena irabazten du.', 'En el nivel 2 son tiempos: menos es mejor, y gana la $z$ más negativa.', 'في المستوى 2 أزمنة: الأقل أفضل، وتفوز $z$ الأكثر سلبية.', 'In level 2 they are times: less is better, and the most negative $z$ wins.')
                ],
                create: createStandoutRounds,
                stars: standardStars(STANDOUT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: StandoutPlay
            }}
        />
    )
}

/* ---------- Which histogram? ---------- */

function MiniChart({ chart, name }: { chart: MiniHistogram; name: string }) {
    const counts = SHAPES[chart.shape]
    const values = chartValues(chart)
    return (
        <svg viewBox="0 0 110 96" role="img" aria-label={name} className="bach-stats-mini" direction="ltr">
            {counts.map((count, index) => (
                <g key={index}>
                    <rect x={8 + index * 19} y={70 - count * 10} width={17} height={count * 10} fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth={1.2} />
                    <text x={16.5 + index * 19} y={86} textAnchor="middle" fontSize={10} fill="var(--muted, #58616e)">{values[index]}</text>
                </g>
            ))}
            <line x1={4} x2={106} y1={70} y2={70} stroke="var(--ink, #1d2733)" strokeWidth={1.4} />
        </svg>
    )
}

function HistogramPlay({ round, language, onAnswer, answered }: RoundProps<HistogramRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const target = round.charts[round.answer]
    const question = round.question === 'max-sd'
        ? say('Zeinek du $\\sigma$ handiena?', '¿Cuál tiene la mayor $\\sigma$?', 'أيها له أكبر $\\sigma$؟', 'Which one has the largest $\\sigma$?')
        : round.question === 'min-sd'
            ? say('Zeinek du $\\sigma$ txikiena?', '¿Cuál tiene la menor $\\sigma$?', 'أيها له أصغر $\\sigma$؟', 'Which one has the smallest $\\sigma$?')
            : round.question === 'max-cv'
                ? say('Zeinek du $CV$ handiena?', '¿Cuál tiene el mayor $CV$?', 'أيها له أكبر $CV$؟', 'Which one has the largest $CV$?')
                : say(`Zeinek ditu $\\bar{x}=${twoPlaces(chartMean(target))}$ eta $\\sigma\\approx ${twoPlaces(chartSigma(target))}$?`, `¿Cuál tiene $\\bar{x}=${twoPlaces(chartMean(target))}$ y $\\sigma\\approx ${twoPlaces(chartSigma(target))}$?`, `أيها له $\\bar{x}=${twoPlaces(chartMean(target))}$ و$\\sigma\\approx ${twoPlaces(chartSigma(target))}$؟`, `Which one has $\\bar{x}=${twoPlaces(chartMean(target))}$ and $\\sigma\\approx ${twoPlaces(chartSigma(target))}$?`)
    const measure = (chart: MiniHistogram, index: number) => round.question === 'max-cv'
        ? `CV_${NAMES[index]}\\approx ${twoPlaces(chartCv(chart))}\\quad(\\bar{x}=${twoPlaces(chartMean(chart))},\\ \\sigma\\approx ${twoPlaces(chartSigma(chart))})`
        : round.question === 'match'
            ? `${NAMES[index]}\\quad\\bar{x}=${twoPlaces(chartMean(chart))},\\ \\sigma\\approx ${twoPlaces(chartSigma(chart))}`
            : `\\sigma_${NAMES[index]}\\approx ${twoPlaces(chartSigma(chart))}`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="prop3-options bach-stats-charts" dir="ltr">
                {round.charts.map((chart, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <strong className="bach-stats-name">{NAMES[index]}</strong>
                        <MiniChart chart={chart} name={NAMES[index]} />
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.charts.map((chart, index) => <span key={index} className="dbh4-worked">{formula(measure(chart, index), language)}</span>)}
                    <MathText text={l(round.question === 'max-cv'
                        ? say('$CV=\\frac{\\sigma}{\\bar{x}}$: batez besteko handi batek sakabanatzea txikitzen du, erlatiboki.', '$CV=\\frac{\\sigma}{\\bar{x}}$: una media grande hace pequeña la dispersión, en relación.', '$CV=\\frac{\\sigma}{\\bar{x}}$: المتوسط الكبير يصغّر التشتت نسبيًّا.', '$CV=\\frac{\\sigma}{\\bar{x}}$: a large mean makes the spread small, relatively.')
                        : round.question === 'match'
                            ? say('Batek batez besteko bera du, eta besteak $\\sigma$ bera: bi neurriak begiratu behar dira.', 'Uno tiene la misma media y otro la misma $\\sigma$: hay que mirar las dos medidas.', 'أحدها له المتوسط نفسه والآخر $\\sigma$ نفسه: يجب النظر إلى المقياسين.', 'One has the same mean and another the same $\\sigma$: you have to look at both measures.')
                            : say('Zenbat eta urrunago egon barrak erditik, orduan eta handiagoa da $\\sigma$.', 'Cuanto más lejos del centro están las barras, mayor es $\\sigma$.', 'كلما ابتعدت الأعمدة عن الوسط كبر $\\sigma$.', 'The further the bars are from the centre, the larger $\\sigma$ is.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function HistogramGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HISTOGRAM_ROUNDS,
                rules: [
                    say('Hiru diagrama ikusiko dituzu, hamarna daturekin.', 'Verás tres diagramas, de diez datos cada uno.', 'سترى ثلاثة مخططات، في كل منها عشرة بيانات.', 'You will see three charts, with ten data each.'),
                    say('$\\sigma$ handia da barrak erditik urrun daudenean; $CV=\\frac{\\sigma}{\\bar{x}}$ zatidurak batez bestekoa ere kontuan hartzen du.', '$\\sigma$ es grande cuando las barras están lejos del centro; $CV=\\frac{\\sigma}{\\bar{x}}$ tiene en cuenta también la media.', 'يكون $\\sigma$ كبيرًا عندما تبتعد الأعمدة عن الوسط؛ و$CV=\\frac{\\sigma}{\\bar{x}}$ يراعي المتوسط أيضًا.', '$\\sigma$ is large when the bars are far from the centre; $CV=\\frac{\\sigma}{\\bar{x}}$ also takes the mean into account.'),
                    say('Begiratu ardatzari: balioak mugitu daitezke.', 'Mira el eje: los valores pueden moverse.', 'انظر إلى المحور: قد تتحرك القيم.', 'Look at the axis: the values can move.')
                ],
                create: createHistogramRounds,
                stars: standardStars(HISTOGRAM_ROUNDS),
                starsNote: STARS_NOTE,
                Round: HistogramPlay
            }}
        />
    )
}
