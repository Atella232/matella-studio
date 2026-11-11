import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { phiDensity } from '../normal'
import { AREA_ROUNDS, createAreaRounds, type AreaRound, type Region } from './areaGame'
import { BINOMIAL_ROUNDS, binomialLatex, createBinomialRounds, type BinomialRound, type BinomialVerdict } from './binomialGame'
import './DistributionsBatx2Games.css'
import { createHuntRounds, HUNT_ROUNDS, type HuntRound } from './huntGame'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — three games played in rounds:
   is it binomial? (a situation and the verdict, its B(n; p) or its
   formula), which area is it? (three shaded bells) and find it in the
   table (three values of k or x). Logic in binomialGame.ts, areaGame.ts
   and huntGame.ts; every normal value comes from normal.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/* ---------- Is it binomial? ---------- */

const VERDICT_NAMES: Record<BinomialVerdict, ReturnType<typeof say>> = {
    binomial: say('Binomiala da', 'Es binomial', 'إنه ثنائي', 'It is binomial'),
    replacement: say('Ez: itzuli gabe, p aldatu egiten da', 'No: sin devolución, p cambia', 'لا: دون إرجاع يتغيّر p', 'No: without replacement, p changes'),
    notFixed: say('Ez: proba kopurua ez dago finkatuta', 'No: el número de pruebas no está fijo', 'لا: عدد المحاولات غير ثابت', 'No: the number of trials is not fixed'),
    notCount: say('Ez: ez ditu arrakastak zenbatzen', 'No: no cuenta éxitos', 'لا: لا يعدّ النجاحات', 'No: it does not count successes')
}

function BinomialPlay({ round, level, language, onAnswer, answered }: RoundProps<BinomialRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const { situation } = round
    const question = level === 0
        ? say('Binomiala da?', '¿Es binomial?', 'هل هو ثنائي؟', 'Is it binomial?')
        : level === 1
            ? say('Nola banatzen da $X$ aldagaia?', '¿Cómo se distribuye $X$?', 'كيف يتوزع $X$؟', 'How is $X$ distributed?')
            : say(`Zein da $P(X=${round.k})$?`, `¿Cuál es $P(X=${round.k})$?`, `ما $P(X=${round.k})$؟`, `Which is $P(X=${round.k})$?`)
    const verdict = situation.verdict === 'binomial' && situation.n && situation.p
        ? say(`$X\\sim ${binomialLatex(situation.n, situation.p)}$: proba independenteak, bi emaitza eta $p$ bera.`, `$X\\sim ${binomialLatex(situation.n, situation.p)}$: pruebas independientes, dos resultados y la misma $p$.`, `$X\\sim ${binomialLatex(situation.n, situation.p)}$: محاولات مستقلة ونتيجتان و$p$ نفسه.`, `$X\\sim ${binomialLatex(situation.n, situation.p)}$: independent trials, two outcomes and the same $p$.`)
        : VERDICT_NAMES[situation.verdict]
    return (
        <>
            <p className="dist2-situation"><MathText text={l(situation.text)} /></p>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <div className="prop3-options prob2-stack">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>
                        {level === 0 ? l(VERDICT_NAMES[option as BinomialVerdict]) : formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.answer} language={language}><MathText text={l(verdict)} /></RoundVerdict>}
        </>
    )
}

export function BinomialGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BINOMIAL_ROUNDS,
                rules: [
                    say('Binomiala: $n$ proba independente, bi emaitza eta $p$ bera guztietan.', 'Binomial: $n$ pruebas independientes, dos resultados y la misma $p$ en todas.', 'الثنائي: $n$ محاولة مستقلة ونتيجتان و$p$ نفسه في كلها.', 'Binomial: $n$ independent trials, two outcomes and the same $p$ in all of them.'),
                    say('$p$ zenbatzen den emaitzaren probabilitatea da; $q=1-p$.', '$p$ es la probabilidad de lo que se cuenta; $q=1-p$.', '$p$ احتمال ما نعدّه؛ و$q=1-p$.', '$p$ is the probability of what is counted; $q=1-p$.'),
                    say('$P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', '$P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', '$P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', '$P(X=k)=\\binom{n}{k}p^k q^{n-k}$.')
                ],
                create: createBinomialRounds,
                stars: standardStars(BINOMIAL_ROUNDS),
                starsNote: STARS_NOTE,
                Round: BinomialPlay
            }}
        />
    )
}

/* ---------- Which area is it? ---------- */

/** A small bell with the shaded region */
function MiniBell({ region, label, decimal }: { region: Region; label: string; decimal: (value: number) => string }) {
    const sx = (z: number) => 8 + ((z + 3.4) / 6.8) * 144
    const sy = (z: number) => 78 - (phiDensity(z) / phiDensity(0)) * 62
    const trace = (a: number, b: number) => Array.from({ length: 41 }, (_, index) => a + ((b - a) * index) / 40).map((z, index) => `${index ? 'L' : 'M'}${sx(z).toFixed(1)} ${sy(z).toFixed(1)}`).join(' ')
    const marks = [...new Set(region.flatMap((part) => [part.from, part.to]).filter((z): z is number => z !== null && z !== 0))].sort((a, b) => a - b)
    const areas = region.map((part) => {
        const from = Math.max(-3.4, part.from ?? -3.4)
        const to = Math.min(3.4, part.to ?? 3.4)
        return `${trace(from, to)} L${sx(to).toFixed(1)} 78 L${sx(from).toFixed(1)} 78 Z`
    })
    return (
        <svg viewBox="0 0 160 92" className="dist2-bell" role="img" aria-label={label} direction="ltr">
            {areas.map((d, index) => <path key={index} d={d} fill="var(--coral, #c4432a)" fillOpacity={0.35} />)}
            <path d={trace(-3.4, 3.4)} fill="none" stroke="var(--ink)" strokeWidth={2} />
            <line x1={8} x2={152} y1={78} y2={78} stroke="var(--ink)" strokeWidth={1.6} />
            <line x1={sx(0)} x2={sx(0)} y1={78} y2={83} stroke="var(--ink)" strokeWidth={1.4} />
            <text x={sx(0)} y={91} textAnchor="middle" fontSize={9} fontWeight={700} fill="var(--muted)">0</text>
            {marks.map((z, index) => {
                // Two marks close together lean apart, so their values never overlap
                const anchor = index + 1 < marks.length && sx(marks[index + 1]) - sx(z) < 34 ? 'end' : index > 0 && sx(z) - sx(marks[index - 1]) < 34 ? 'start' : 'middle'
                const shift = anchor === 'end' ? -2 : anchor === 'start' ? 2 : 0
                return (
                    <g key={index}>
                        <line x1={sx(z)} x2={sx(z)} y1={20} y2={78} stroke="var(--coral, #c4432a)" strokeWidth={1.4} />
                        <text x={sx(z) + shift} y={15} textAnchor={anchor} fontSize={12} fontWeight={700} fill="var(--coral, #c4432a)">{decimal(z).replace('-', '−')}</text>
                    </g>
                )
            })}
        </svg>
    )
}

function AreaPlay({ round, language, onAnswer, answered }: RoundProps<AreaRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const decimal = (value: number) => (language === 'ar' || language === 'en' ? String(value) : String(value).replace('.', ','))
    return (
        <>
            <p className="prop3-prompt"><span className="dbh4-worked">{formula(round.asked, language)}</span></p>
            <p className="prob2-question"><MathText text={l(say('Zein kanpaitan dago ondo itzaleztatuta?', '¿En qué campana está bien sombreada?', 'في أي جرس هي مظللة صحيحًا؟', 'In which bell is it shaded right?'))} /></p>
            <div className="prop3-options dist2-bells">
                {round.regions.map((region, index) => (
                    <button key={index} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>
                        <MiniBell region={region} decimal={decimal} label={region.map((part) => `${part.from === null ? '−∞' : decimal(part.from)} … ${part.to === null ? '∞' : decimal(part.to)}`).join(' · ')} />
                    </button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.answer} language={language}><span className="dbh4-worked">{formula(round.worked, language)}</span></RoundVerdict>}
        </>
    )
}

export function AreaGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: AREA_ROUNDS,
                rules: [
                    say('$P(Z\\le k)$: $k$ puntuaren ezkerreko azalera.', '$P(Z\\le k)$: el área a la izquierda de $k$.', '$P(Z\\le k)$: المساحة على يسار $k$.', '$P(Z\\le k)$: the area to the left of $k$.'),
                    say('$P(Z>k)$: eskuinekoa, aurkakoa.', '$P(Z>k)$: la de la derecha, el contrario.', '$P(Z>k)$: التي على اليمين، المعاكس.', '$P(Z>k)$: the one on the right, the complement.'),
                    say('Begiratu $k$ balioaren zeinuari: negatiboa 0 zenbakiaren ezkerrean dago.', 'Mira el signo de $k$: un negativo está a la izquierda del 0.', 'انظر إلى إشارة $k$: السالب على يسار 0.', 'Look at the sign of $k$: a negative is to the left of 0.')
                ],
                create: createAreaRounds,
                stars: standardStars(AREA_ROUNDS),
                starsNote: STARS_NOTE,
                Round: AreaPlay
            }}
        />
    )
}

/* ---------- Find it in the table ---------- */

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<HuntRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt">{round.data.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}</p>
            <p className="prob2-question"><MathText text={l(round.unknown === 'k' ? say('Zenbat da $k$?', '¿Cuánto vale $k$?', 'كم يساوي $k$؟', 'What is $k$?') : say('Zenbat da $x$?', '¿Cuánto vale $x$?', 'كم يساوي $x$؟', 'What is $x$?'))} /></p>
            <div className="prop3-options prob2-three">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.answer} language={language}>{round.worked.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}</RoundVerdict>}
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
                    say('Taulak $P(Z\\le k)$ ematen du: bilatu probabilitatea barruan eta irakurri $k$.', 'La tabla da $P(Z\\le k)$: busca la probabilidad dentro y lee $k$.', 'يعطي الجدول $P(Z\\le k)$: ابحث عن الاحتمال داخله واقرأ $k$.', 'The table gives $P(Z\\le k)$: look for the probability inside and read $k$.'),
                    say('0,5 baino gutxiago azpitik bada, $k$ negatiboa da.', 'Si por debajo hay menos de 0,5, $k$ es negativo.', 'إذا كان تحتها أقل من 0.5 فإن $k$ سالب.', 'If less than 0.5 lies below, $k$ is negative.'),
                    say('Azkenik, $x=\\mu+k\\,\\sigma$.', 'Al final, $x=\\mu+k\\,\\sigma$.', 'وفي النهاية $x=\\mu+k\\,\\sigma$.', 'Finally, $x=\\mu+k\\,\\sigma$.')
                ],
                create: createHuntRounds,
                stars: standardStars(HUNT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: HuntPlay
            }}
        />
    )
}

