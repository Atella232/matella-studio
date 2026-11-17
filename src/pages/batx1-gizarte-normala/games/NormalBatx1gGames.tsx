import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-banaketak/games/DistributionsBatx2Games.css'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { phiDensity } from '../../batx2-zientziak-banaketak/normal'
import { createCutoffRounds, CUTOFF_ROUNDS, cutoffLatex, type CutoffRound } from './cutoffGame'
import { createDensityRounds, DENSITY_ROUNDS, type DensityRound, type DensityVerdict } from './densityGame'
import './NormalBatx1gGames.css'
import { createPercentRounds, endsOf, PERCENT_ROUNDS, type PercentRound } from './percentGame'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — three games played in
   rounds: which percentage? (the 68–95–99,7 rule), is it a density?
   (straight pieces) and the cut-off mark (the table backwards). Logic in
   percentGame.ts, densityGame.ts and cutoffGame.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')
/** Hundredths of a percent (ten-thousandths of 1) as a percentage for LaTeX */
const percentLatex = (tenThousandths: number, language: UnitLanguage) => {
    const value = String(tenThousandths / 100).replace('.', '{,}')
    return language === 'eu' ? `\\%\\,${value}` : `${value}\\,\\%`
}

function Options<Option extends string | number>({ options, answer, answered, onPick, render }: { options: Option[]; answer: number; answered: boolean; onPick: (index: number) => void; render: (option: Option) => ReactNode }) {
    const [picked, setPicked] = useState<number | null>(null)
    return (
        <div className="prop3-options prob2-stack">
            {options.map((option, index) => (
                <button key={String(option)} type="button" disabled={answered} className={choiceClass(answered, index === answer, index === picked)} onClick={() => { if (answered) return; setPicked(index); onPick(index) }}>
                    {render(option)}
                </button>
            ))}
        </div>
    )
}

/** A small bell with the asked interval shaded and its ends written as values of X */
function Bell({ round }: { round: PercentRound }) {
    const sx = (z: number) => 10 + ((z + 3.4) / 6.8) * 300
    const sy = (z: number) => 96 - (phiDensity(z) / phiDensity(0)) * 80
    const trace = (a: number, b: number) => Array.from({ length: 61 }, (_, index) => a + ((b - a) * index) / 60).map((z, index) => `${index ? 'L' : 'M'}${sx(z).toFixed(1)} ${sy(z).toFixed(1)}`).join(' ')
    const from = round.from ?? -3.4
    const to = round.to ?? 3.4
    const ends = endsOf(round)
    return (
        <svg viewBox="0 0 320 124" className="norm1-shape" role="img" aria-label={`N(${round.mean}; ${round.sd})`} direction="ltr">
            <path d={`${trace(from, to)} L${sx(to)} 96 L${sx(from)} 96 Z`} fill="var(--coral, #c4432a)" fillOpacity={0.35} />
            <path d={trace(-3.4, 3.4)} fill="none" stroke="var(--ink)" strokeWidth={2} />
            <line x1={10} x2={310} y1={96} y2={96} stroke="var(--ink)" strokeWidth={1.6} />
            {[-3, -2, -1, 0, 1, 2, 3].map((k) => <text key={k} x={sx(k)} y={114} textAnchor="middle" fontSize={11} fontWeight={k === round.from || k === round.to ? 700 : 500} fill={k === round.from || k === round.to ? 'var(--coral, #c4432a)' : 'var(--muted)'}>{round.mean + k * round.sd}</text>)}
            {ends.from === null && <text x={sx(-3.2)} y={20} fontSize={11} fill="var(--muted)">←</text>}
            {ends.to === null && <text x={sx(3)} y={20} fontSize={11} fill="var(--muted)">→</text>}
        </svg>
    )
}

/* ---------- Which percentage? ---------- */

function PercentPlay({ round, language, onAnswer, answered }: RoundProps<PercentRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const ends = endsOf(round)
    const interval = ends.from === null ? `X\\le ${ends.to}` : ends.to === null ? `X\\ge ${ends.from}` : `${ends.from}\\le X\\le ${ends.to}`
    return (
        <>
            <p className="prob2-question"><MathText text={l(say(`$X\\sim N(${round.mean};\\,${round.sd})$. Zer ehuneko dago $${interval}$ tartean?`, `$X\\sim N(${round.mean};\\,${round.sd})$. ¿Qué porcentaje hay en $${interval}$?`, `$X\\sim N(${round.mean};\\,${round.sd})$. ما النسبة في $${interval}$؟`, `$X\\sim N(${round.mean};\\,${round.sd})$. What percentage lies in $${interval}$?`))} /></p>
            <Bell round={round} />
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => formula(percentLatex(option, language), language)} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(say('% 68,26, % 95,44 eta % 99,74 $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ eta $\\mu\\pm 3\\sigma$ tarteetan; erdia alde bakoitzean.', 'El 68,26 %, el 95,44 % y el 99,74 % en $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ y $\\mu\\pm 3\\sigma$; la mitad a cada lado.', '68.26٪ و95.44٪ و99.74٪ في $\\mu\\pm\\sigma$ و$\\mu\\pm 2\\sigma$ و$\\mu\\pm 3\\sigma$؛ والنصف في كل جهة.', '68.26%, 95.44% and 99.74% in $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ and $\\mu\\pm 3\\sigma$; half on each side.'))} /></RoundVerdict>}
        </>
    )
}

export function PercentGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PERCENT_ROUNDS,
                rules: [
                    say('$\\mu\\pm\\sigma$: % 68,26. $\\mu\\pm 2\\sigma$: % 95,44. $\\mu\\pm 3\\sigma$: % 99,74.', '$\\mu\\pm\\sigma$: el 68,26 %. $\\mu\\pm 2\\sigma$: el 95,44 %. $\\mu\\pm 3\\sigma$: el 99,74 %.', '$\\mu\\pm\\sigma$: 68.26٪. $\\mu\\pm 2\\sigma$: 95.44٪. $\\mu\\pm 3\\sigma$: 99.74٪.', '$\\mu\\pm\\sigma$: 68.26%. $\\mu\\pm 2\\sigma$: 95.44%. $\\mu\\pm 3\\sigma$: 99.74%.'),
                    say('Kanpaia simetrikoa da: alde bakoitzean erdia.', 'La campana es simétrica: a cada lado, la mitad.', 'الجرس متماثل: في كل جهة النصف.', 'The bell is symmetric: half on each side.')
                ],
                create: createPercentRounds,
                stars: standardStars(PERCENT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: PercentPlay
            }}
        />
    )
}

/* ---------- Is it a density? ---------- */

const VERDICT_NAMES: Record<DensityVerdict, ReturnType<typeof say>> = {
    yes: say('Bai, dentsitate bat da', 'Sí, es una densidad', 'نعم، إنها كثافة', 'Yes, it is a density'),
    area: say('Ez: azalera ez da 1', 'No: el área no es 1', 'لا: المساحة ليست 1', 'No: the area is not 1'),
    negative: say('Ez: zati bat negatiboa da', 'No: una parte es negativa', 'لا: جزء منها سالب', 'No: part of it is negative')
}

function Shape({ round, language }: { round: DensityRound; language: UnitLanguage }) {
    const sx = (x: number) => 30 + (x / round.base) * 260
    const scale = round.shape === 'line' ? 90 / round.base : 90 / Math.max(round.height / 100, 0.1)
    const sy = (value: number) => 100 - value * scale
    const decimal = (value: number) => String(value).replace('.', language === 'eu' || language === 'es' ? ',' : '.')
    const top = round.height / 100
    const path = round.shape === 'rectangle'
        ? `M${sx(0)} 100 L${sx(0)} ${sy(top)} L${sx(round.base)} ${sy(top)} L${sx(round.base)} 100 Z`
        : round.shape === 'triangle' ? `M${sx(0)} 100 L${sx(round.base)} ${sy(top)} L${sx(round.base)} 100 Z`
            : `M${sx(0)} ${sy(-round.height)} L${sx(round.base)} ${sy(round.base - round.height)}`
    return (
        <svg viewBox="0 0 320 130" className="norm1-shape" role="img" aria-label="f(x)" direction="ltr">
            {round.shape !== 'line' && round.to < round.base && <path d={round.shape === 'rectangle' ? `M${sx(0)} 100 L${sx(0)} ${sy(top)} L${sx(round.to)} ${sy(top)} L${sx(round.to)} 100 Z` : `M${sx(0)} 100 L${sx(round.to)} ${sy((top * round.to) / round.base)} L${sx(round.to)} 100 Z`} fill="var(--coral, #c4432a)" fillOpacity={0.3} />}
            <path d={path} fill={round.shape === 'line' ? 'none' : 'var(--stage-tint, #dde7f7)'} stroke="var(--stage, #2f6fdb)" strokeWidth={2.4} />
            <line x1={20} x2={300} y1={100} y2={100} stroke="var(--ink)" strokeWidth={1.6} />
            {[0, round.base, ...(round.to < round.base ? [round.to] : [])].map((x) => <text key={x} x={sx(x)} y={118} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--muted)">{x}</text>)}
            {round.shape !== 'line' && <text x={sx(round.base) - 4} y={sy(top) + 14} textAnchor="end" fontSize={12} fontWeight={700} fill="var(--stage, #2f6fdb)">{decimal(top)}</text>}
            {round.shape === 'line' && <text x={sx(round.base / 2)} y={20} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--ink)">f(x) = x − {round.height}</text>}
        </svg>
    )
}

function DensityPlay({ round, level, language, onAnswer, answered }: RoundProps<DensityRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const shapeWords = round.shape === 'rectangle' ? say('Laukizuzen bat', 'Un rectángulo', 'مستطيل', 'A rectangle') : round.shape === 'triangle' ? say('Triangelu bat', 'Un triángulo', 'مثلث', 'A triangle') : say('Zuzen bat', 'Una recta', 'مستقيم', 'A straight line')
    const question = level === 0
        ? say('Dentsitate bat da?', '¿Es una densidad?', 'هل هي كثافة؟', 'Is it a density?')
        : level === 1
            ? say('Zein altuerak egiten du dentsitate?', '¿Qué altura la hace densidad?', 'أي ارتفاع يجعلها كثافة؟', 'Which height makes it a density?')
            : say(`Dentsitate bat da. Zenbat da $P(0\\le X\\le ${round.to})$?`, `Es una densidad. ¿Cuánto vale $P(0\\le X\\le ${round.to})$?`, `إنها كثافة. كم يساوي $P(0\\le X\\le ${round.to})$؟`, `It is a density. What is $P(0\\le X\\le ${round.to})$?`)
    return (
        <>
            <p className="dist2-situation"><MathText text={`${l(shapeWords)}, 0 – ${round.base}`} /></p>
            <Shape round={round} language={language} />
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => (level === 0 ? l(VERDICT_NAMES[option as DensityVerdict]) : formula(String((option as number) / 10_000).replace('.', '{,}'), language))} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(say('Laukizuzena: $b\\cdot h$. Triangelua: $\\frac{b\\cdot h}{2}$. Azalera osoa: 1.', 'Rectángulo: $b\\cdot h$. Triángulo: $\\frac{b\\cdot h}{2}$. Área total: 1.', 'المستطيل: $b\\cdot h$. المثلث: $\\frac{b\\cdot h}{2}$. المساحة الكلية: 1.', 'Rectangle: $b\\cdot h$. Triangle: $\\frac{b\\cdot h}{2}$. Total area: 1.'))} /></RoundVerdict>}
        </>
    )
}

export function DensityGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DENSITY_ROUNDS,
                rules: [
                    say('Dentsitate bat ez da inoiz negatiboa, eta haren azpiko azalera osoa 1 da.', 'Una densidad nunca es negativa y el área total bajo ella es 1.', 'الكثافة ليست سالبة أبدًا والمساحة الكلية تحتها 1.', 'A density is never negative and the total area under it is 1.'),
                    say('Probabilitatea azalera da: laukizuzena $b\\cdot h$, triangelua $\\frac{b\\cdot h}{2}$.', 'La probabilidad es un área: rectángulo $b\\cdot h$, triángulo $\\frac{b\\cdot h}{2}$.', 'الاحتمال مساحة: المستطيل $b\\cdot h$ والمثلث $\\frac{b\\cdot h}{2}$.', 'The probability is an area: rectangle $b\\cdot h$, triangle $\\frac{b\\cdot h}{2}$.')
                ],
                create: createDensityRounds,
                stars: standardStars(DENSITY_ROUNDS),
                starsNote: STARS_NOTE,
                Round: DensityPlay
            }}
        />
    )
}

/* ---------- The cut-off mark ---------- */

function CutoffPlay({ round, level, language, onAnswer, answered }: RoundProps<CutoffRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const question = level === 0
        ? say('Zein da $k$, $P(Z\\le k)$ taularen barruan?', '¿Cuál es $k$, buscando $P(Z\\le k)$ dentro de la tabla?', 'ما $k$ بالبحث عن $P(Z\\le k)$ داخل الجدول؟', 'What is $k$, looking up $P(Z\\le k)$ inside the table?')
        : say('Zein da muga-balioa?', '¿Cuál es el valor límite?', 'ما القيمة الحدّية؟', 'What is the limit value?')
    const below = round.top ? 100 - round.percent : round.percent
    const explanation = say(`Azpitik % ${below}: $k=${cutoffLatex(round.k)}$, eta $x=${round.mean}+(${cutoffLatex(round.k)})\\cdot ${round.sd}=${cutoffLatex(round.mean + round.k * round.sd)}$.`, `Por debajo, el ${below} %: $k=${cutoffLatex(round.k)}$, y $x=${round.mean}+(${cutoffLatex(round.k)})\\cdot ${round.sd}=${cutoffLatex(round.mean + round.k * round.sd)}$.`, `تحت ${below}٪: $k=${cutoffLatex(round.k)}$، و$x=${round.mean}+(${cutoffLatex(round.k)})\\cdot ${round.sd}=${cutoffLatex(round.mean + round.k * round.sd)}$.`, `Below, ${below}%: $k=${cutoffLatex(round.k)}$, and $x=${round.mean}+(${cutoffLatex(round.k)})\\cdot ${round.sd}=${cutoffLatex(round.mean + round.k * round.sd)}$.`)
    return (
        <>
            <p className="dist2-situation"><MathText text={`${l(say(`$X\\sim N(${round.mean};\\,${round.sd})$.`, `$X\\sim N(${round.mean};\\,${round.sd})$.`, `$X\\sim N(${round.mean};\\,${round.sd})$.`, `$X\\sim N(${round.mean};\\,${round.sd})$.`))} ${l(round.context)}`} /></p>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => formula(option, language)} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(explanation)} /></RoundVerdict>}
        </>
    )
}

export function CutoffGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CUTOFF_ROUNDS,
                rules: [
                    say('Taulak azpikoa ematen du: gainetik % $p$ bada, bilatu $1-p$.', 'La tabla da lo de debajo: si por encima hay el $p$ %, busca $1-p$.', 'يعطي الجدول ما تحت: إذا كان فوق $p$٪ فابحث عن $1-p$.', 'The table gives what lies below: if $p$% lies above, look up $1-p$.'),
                    say('Azpitik % 50 baino gutxiago badago, $k$ negatiboa da. Gero, $x=\\mu+k\\,\\sigma$.', 'Si por debajo hay menos del 50 %, $k$ es negativo. Después, $x=\\mu+k\\,\\sigma$.', 'إذا كان تحت أقل من 50٪ فـ $k$ سالب. ثم $x=\\mu+k\\,\\sigma$.', 'If less than 50% lies below, $k$ is negative. Then $x=\\mu+k\\,\\sigma$.')
                ],
                create: createCutoffRounds,
                stars: standardStars(CUTOFF_ROUNDS),
                starsNote: STARS_NOTE,
                Round: CutoffPlay
            }}
        />
    )
}
