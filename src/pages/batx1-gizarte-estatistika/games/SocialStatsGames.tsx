import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './SocialStatsGames.css'
import { cumulativeOf, createHuntRounds, HUNT_ROUNDS, huntPercentile, huntPercentOf, huntTex, type HuntRound } from './hunt'
import { acceptedParts, createQualityRounds, faultyCount, QUALITY_ROUNDS, qualityAnswer, qualityTex, qualityTotal, type QualityRound } from './quality'

/* ==========================================================================
   Kalitate-kontrola and Ehizatu pertzentila (Estatistika unidimentsionala,
   Batxilergoa 1 · Gizarte Zientziak): the first shows the lengths of the
   parts of a factory in a histogram with the acceptable stretch and asks
   how many (or what percentage) are faulty; the second shows a cumulative
   percentage polygon and asks for a percentile, the percentile of a value
   or the percentage between two values. Logic in quality.ts and hunt.ts.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
/** A number on a drawing: 12,5 in Basque and Spanish, 12.5 in English and Arabic */
const shown = (value: number, language: UnitLanguage) => {
    const text = String(Math.round(value * 100) / 100)
    return language === 'eu' || language === 'es' ? text.replace('.', ',') : text
}

function Options({ values, answer, language, answered, onPick, picked }: { values: number[]; answer: number; language: UnitLanguage; answered: boolean; onPick: (index: number) => void; picked: number | null }) {
    return (
        <div className="prop3-options social-stats-options" dir="ltr">
            {values.map((value, index) => (
                <button key={index} type="button" disabled={answered} className={!answered ? '' : Math.abs(value - answer) < 1e-9 ? 'right' : index === picked ? 'wrong' : ''} onClick={() => onPick(index)}>
                    {formula(qualityTex(value), language)}
                </button>
            ))}
        </div>
    )
}

/* ---------- Quality control ---------- */

function QualityChart({ round, language, answered }: { round: QualityRound; language: UnitLanguage; answered: boolean }) {
    const end = round.start + 5 * round.width
    const x = (value: number) => 20 + ((value - round.start) / (end - round.start)) * 320
    const top = Math.max(...round.counts)
    const y = (count: number) => 150 - (count / top) * 120
    const parts = acceptedParts(round)
    return (
        <svg viewBox="0 0 360 196" role="img" aria-label="" className="social-stats-chart" direction="ltr">
            <rect x={x(round.low)} y={18} width={x(round.high) - x(round.low)} height={132} fill="var(--success-tint, #d9efe2)" />
            {round.counts.map((count, index) => {
                const from = round.start + index * round.width
                return (
                    <g key={index}>
                        <rect x={x(from)} y={y(count)} width={x(from + round.width) - x(from)} height={150 - y(count)} fill="var(--coral-tint, #f6d5cc)" fillOpacity={0.75} stroke="var(--coral, #c4432a)" strokeWidth={1.4} />
                        <text x={(x(from) + x(from + round.width)) / 2} y={y(count) - 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--ink)">{count}</text>
                        {answered && parts[index] > 0 && parts[index] < count && <text x={(Math.max(x(from), x(round.low)) + Math.min(x(from + round.width), x(round.high))) / 2} y={142} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--success, #267b53)">{shown(parts[index], language)}</text>}
                    </g>
                )
            })}
            <line x1={14} x2={346} y1={150} y2={150} stroke="var(--ink)" strokeWidth={1.6} />
            {Array.from({ length: 6 }, (_, index) => round.start + index * round.width).map((value) => (
                <text key={value} x={x(value)} y={168} textAnchor="middle" fontSize={12} fill="var(--muted)">{value}</text>
            ))}
            {[round.low, round.high].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={14} y2={176} stroke="var(--success, #267b53)" strokeWidth={2.4} strokeDasharray="6 4" />
                    <text x={x(value)} y={192} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--success, #267b53)">{shown(value, language)}</text>
                </g>
            ))}
        </svg>
    )
}

function QualityPlay({ round, language, onAnswer, answered }: RoundProps<QualityRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const answer = qualityAnswer(round)
    const values = round.options.map((option) => option.value)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(Math.abs(values[index] - answer) < 1e-9)
    }
    const low = qualityTex(round.low)
    const high = qualityTex(round.high)
    const total = qualityTotal(round)
    const question = round.percent
        ? say(`${total} pieza neurtu dira, milimetrotan. $${low}$ eta $${high}$ artekoak onargarriak dira. Zer ehuneko da akastuna?`, `Se miden ${total} piezas, en milímetros. Valen las de $${low}$ a $${high}$. ¿Qué porcentaje es defectuoso?`, `قيست ${total} قطعة بالمليمتر. المقبولة ما بين $${low}$ و$${high}$. ما النسبة المعيبة؟`, `${total} parts are measured, in millimetres. Those from $${low}$ to $${high}$ are fine. What percentage is faulty?`)
        : say(`${total} pieza neurtu dira, milimetrotan. $${low}$ eta $${high}$ artekoak onargarriak dira. Zenbat dira akastunak?`, `Se miden ${total} piezas, en milímetros. Valen las de $${low}$ a $${high}$. ¿Cuántas son defectuosas?`, `قيست ${total} قطعة بالمليمتر. المقبولة ما بين $${low}$ و$${high}$. كم قطعة معيبة؟`, `${total} parts are measured, in millimetres. Those from $${low}$ to $${high}$ are fine. How many are faulty?`)
    const parts = acceptedParts(round)
    const inside = parts.filter((part) => part > 0).map((part) => qualityTex(part)).join('+')
    const accepted = total - faultyCount(round)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <QualityChart round={round} language={language} answered={answered} />
            <Options values={values} answer={answer} language={language} answered={answered} onPick={choose} picked={picked} />
            {answered && (
                <RoundVerdict right={picked !== null && Math.abs(values[picked] - answer) < 1e-9} language={language}>
                    <span className="dbh4-worked">{formula(`${inside}=${qualityTex(accepted)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`${total}-${qualityTex(accepted)}=${qualityTex(faultyCount(round))}`, language)}</span>
                    {round.percent && <span className="dbh4-worked">{formula(`\\frac{${qualityTex(faultyCount(round))}}{${total}}\\cdot 100=${qualityTex(answer)}`, language)}</span>}
                    <MathText text={l(say('Muturretako tarteetatik, mugen barruan geratzen den zatia bakarrik onartzen da.', 'De los intervalos de los extremos solo se acepta la parte que queda dentro de los límites.', 'من فئتي الطرفين لا يُقبل إلا الجزء الواقع داخل الحدّين.', 'From the intervals at the ends only the part inside the limits is accepted.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function QualityGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: QUALITY_ROUNDS,
                rules: [
                    say('Lantegiak bi mugaren arteko piezak onartzen ditu; berdea onargarria da.', 'La fábrica acepta las piezas entre dos límites; lo verde es aceptable.', 'يقبل المصنع القطع بين حدّين؛ والأخضر مقبول.', 'The factory accepts the parts between two limits; green is acceptable.'),
                    say('Tarte bakoitzean piezak berdin banatuta daude: muga tarte baten erdian badago, haren piezen erdia sartzen da.', 'En cada intervalo las piezas están repartidas por igual: si un límite cae en la mitad de un intervalo, entra la mitad de sus piezas.', 'القطع موزعة بالتساوي في كل فئة: إذا وقع حدّ في منتصف فئة دخل نصف قطعها.', 'In each interval the parts are spread evenly: if a limit falls halfway along an interval, half of its parts are inside.'),
                    say('Akastunak = guztiak ken onargarriak.', 'Defectuosas = todas menos las aceptables.', 'المعيبة = الكل ناقص المقبولة.', 'Faulty = all minus the acceptable ones.')
                ],
                create: createQualityRounds,
                stars: standardStars(QUALITY_ROUNDS),
                starsNote: STARS_NOTE,
                Round: QualityPlay
            }}
        />
    )
}

/* ---------- Hunt the percentile ---------- */

function HuntChart({ round, language, answered }: { round: HuntRound; language: UnitLanguage; answered: boolean }) {
    const end = round.start + 4 * round.width
    const x = (value: number) => 44 + ((value - round.start) / (end - round.start)) * 296
    const y = (percent: number) => 164 - percent * 1.44
    const cumulative = [0, ...cumulativeOf(round.percents)]
    const points = cumulative.map((percent, index) => [round.start + index * round.width, percent] as const)
    const marks: Array<[number, number]> = round.kind === 'percentile' && round.k !== undefined
        ? [[huntPercentile(round.start, round.width, round.percents, round.k).value, round.k]]
        : round.kind === 'value' && round.x !== undefined
            ? [[round.x, huntPercentOf(round.start, round.width, round.percents, round.x).value]]
            : (round.pair ?? []).map((value) => [value, huntPercentOf(round.start, round.width, round.percents, value).value])
    return (
        <svg viewBox="0 0 360 206" role="img" aria-label="" className="social-stats-chart" direction="ltr">
            {[0, 50, 100].map((percent) => (
                <g key={percent}>
                    <line x1={44} x2={340} y1={y(percent)} y2={y(percent)} stroke="var(--muted)" strokeWidth={0.6} strokeDasharray="3 4" />
                    <text x={38} y={y(percent) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">{percent}</text>
                </g>
            ))}
            <line x1={44} x2={44} y1={12} y2={164} stroke="var(--ink)" strokeWidth={1.6} />
            <line x1={44} x2={344} y1={164} y2={164} stroke="var(--ink)" strokeWidth={1.6} />
            <polyline points={points.map(([value, percent]) => `${x(value)},${y(percent)}`).join(' ')} fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth={2.6} />
            {points.map(([value, percent]) => (
                <g key={value}>
                    <circle cx={x(value)} cy={y(percent)} r={4} fill="var(--card, #fffcf6)" stroke="var(--blue, #2f6fdb)" strokeWidth={2} />
                    {percent > 0 && percent < 100 && <text x={x(value) - 6} y={y(percent) - 8} textAnchor="end" fontSize={12} fontWeight={700} fill="var(--blue, #2f6fdb)">{percent}</text>}
                    <text x={x(value)} y={180} textAnchor="middle" fontSize={12} fill="var(--muted)">{value}</text>
                </g>
            ))}
            {marks.map(([value, percent], index) => (
                <g key={index}>
                    {(round.kind === 'percentile' || answered) && <line x1={44} x2={x(value)} y1={y(percent)} y2={y(percent)} stroke="var(--coral, #c4432a)" strokeWidth={2} strokeDasharray="6 4" />}
                    {(round.kind !== 'percentile' || answered) && <line x1={x(value)} x2={x(value)} y1={y(percent)} y2={164} stroke="var(--coral, #c4432a)" strokeWidth={2} strokeDasharray="6 4" />}
                    {answered && <circle cx={x(value)} cy={y(percent)} r={5} fill="var(--coral, #c4432a)" />}
                    {round.kind !== 'percentile' && <text x={x(value)} y={194} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--coral, #c4432a)">{shown(value, language)}</text>}
                    {round.kind === 'percentile' && <text x={48} y={y(percent) - 4} fontSize={12} fontWeight={700} fill="var(--coral, #c4432a)">{shown(percent, language)}</text>}
                </g>
            ))}
        </svg>
    )
}

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<HuntRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const values = round.options.map((option) => option.value)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(Math.abs(values[index] - round.answer) < 1e-9)
    }
    const question = round.kind === 'percentile'
        ? say(`Zein balio da $P_{${round.k}}$?`, `¿Qué valor es $P_{${round.k}}$?`, `ما قيمة $P_{${round.k}}$؟`, `What value is $P_{${round.k}}$?`)
        : round.kind === 'value'
            ? say(`Zer pertzentil du $${huntTex(round.x!)}$ balioak?`, `¿Qué percentil tiene el valor $${huntTex(round.x!)}$?`, `ما مئين القيمة $${huntTex(round.x!)}$؟`, `What percentile does the value $${huntTex(round.x!)}$ have?`)
            : say(`Zer ehuneko dago $${huntTex(round.pair![0])}$ eta $${huntTex(round.pair![1])}$ artean?`, `¿Qué porcentaje hay entre $${huntTex(round.pair![0])}$ y $${huntTex(round.pair![1])}$?`, `ما النسبة بين $${huntTex(round.pair![0])}$ و$${huntTex(round.pair![1])}$؟`, `What percentage lies between $${huntTex(round.pair![0])}$ and $${huntTex(round.pair![1])}$?`)
    const work = (() => {
        if (round.kind === 'percentile') {
            const found = huntPercentile(round.start, round.width, round.percents, round.k!)
            return [`P_{${round.k}}=${round.start + found.index * round.width}+\\frac{${round.k}-${found.before}}{${round.percents[found.index]}}\\cdot ${round.width}=${huntTex(round.answer)}`]
        }
        const lineFor = (value: number) => {
            const found = huntPercentOf(round.start, round.width, round.percents, value)
            const before = found.index === 0 ? 0 : cumulativeOf(round.percents)[found.index - 1]
            return { latex: `${before}+\\frac{${huntTex(value)}-${round.start + found.index * round.width}}{${round.width}}\\cdot ${round.percents[found.index]}=${huntTex(found.value)}`, value: found.value }
        }
        if (round.kind === 'value') return [`k=${lineFor(round.x!).latex}`]
        const [first, second] = round.pair!.map(lineFor)
        return [first.latex, second.latex, `${huntTex(second.value)}-${huntTex(first.value)}=${huntTex(round.answer)}`]
    })()
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <HuntChart round={round} language={language} answered={answered} />
            <Options values={values} answer={round.answer} language={language} answered={answered} onPick={choose} picked={picked} />
            {answered && (
                <RoundVerdict right={picked !== null && Math.abs(values[picked] - round.answer) < 1e-9} language={language}>
                    {work.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
                    <MathText text={l(say('Tarte baten barruan poligonoa zuzena da: interpolatu, ez hartu muturra edo klase-marka.', 'Dentro de un intervalo el polígono es recto: interpola, no tomes el extremo ni la marca de clase.', 'داخل الفئة المضلّع مستقيم: استكمل ولا تأخذ الطرف ولا المركز.', 'Inside an interval the polygon is straight: interpolate, do not take the end or the class mark.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function HuntGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HUNT_ROUNDS,
                rules: [
                    say('Puntu bakoitzak bere ehuneko metatua dauka idatzita.', 'Cada punto lleva escrito su porcentaje acumulado.', 'يحمل كل نقطة نسبتها المتجمّعة مكتوبة.', 'Each point has its cumulative percentage written on it.'),
                    say('Bi punturen artean poligonoa zuzena da: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'Entre dos puntos el polígono es recto: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'بين نقطتين المضلّع مستقيم: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.', 'Between two points the polygon is straight: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$.'),
                    say('3. mailan, kendu bi balioen ehunekoak.', 'En el nivel 3, resta los porcentajes de los dos valores.', 'في المستوى 3 اطرح نسبتي القيمتين.', 'In level 3, subtract the percentages of the two values.')
                ],
                create: createHuntRounds,
                stars: standardStars(HUNT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: HuntPlay
            }}
        />
    )
}
