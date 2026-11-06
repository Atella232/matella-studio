import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Plane, PlaneLine, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import { ASYMPTOTE_BOX, ASYMPTOTE_ROUNDS, asymptoteValue, createAsymptoteRounds, isAsymptotePick, type AsymptoteRound } from './asymptotes'
import './BachLimitsGames.css'
import { createDiscontinuityRounds, DISCONTINUITY_BOX, DISCONTINUITY_KINDS, DISCONTINUITY_ROUNDS, type DiscontinuityKind, type DiscontinuityRound, type Piece } from './discontinuity'
import { createFormsRounds, FORM_BINS, FORMS_ROUNDS, type FormBin, type FormsRound } from './forms'

/* ==========================================================================
   ¿Indeterminación o no?, Caza las asíntotas and ¿Qué discontinuidad?
   (Limiteak eta jarraitutasuna, Batxilergoa 1 · Zientziak): the first two
   choose among four answers, the second marks cards with lines. After
   each answer the graph comes in: the asymptotes, the hole, the jump.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const RED = 'var(--second, #c4432a)'
const BLUE = 'var(--blue, #2f6fdb)'
const MUTED = 'var(--muted, #58616e)'
type Point = [number, number]

/** A curve sampled in real values, broken where it is not defined, leaves the band or jumps */
function sampled(fn: (x: number) => number | null, from: number, to: number, limit: number, step = 0.02): Point[][] {
    const parts: Point[][] = []
    let current: Point[] = []
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const previous = current[current.length - 1]
        if (y === null || !Number.isFinite(y) || Math.abs(y) > limit || (previous && Math.abs(y - previous[1]) > limit)) {
            if (current.length > 1) parts.push(current)
            current = []
            continue
        }
        current.push([x, y])
    }
    if (current.length > 1) parts.push(current)
    return parts
}

/** ±∞ or a number, for LaTeX */
const limitLatex = (value: number, language: UnitLanguage) => (value === Infinity ? '+\\infty' : value === -Infinity ? '-\\infty' : texDec(value, language, 2))

/* ---------- ¿Indeterminación o no? ---------- */

const BIN_LABELS: Record<FormBin, LocalizedText> = {
    indeterminate: say('Indeterminazioa', 'Indeterminación', 'عدم تعيين', 'Indeterminate'),
    zero: say('0', '0', '0', '0'),
    infinity: say('±∞', '±∞', '±∞', '±∞'),
    number: say('Beste zenbaki bat', 'Otro número', 'عدد آخر', 'Another number')
}

const BIN_REASONS: Record<FormBin, LocalizedText> = {
    indeterminate: say('Indeterminazioa da: ez dakigu zenbat den, eta kalkulatu egin behar da (faktorizatu, konjokatua, mailak edo e).', 'Es una indeterminación: no se sabe cuánto vale y hay que calcular (factorizar, conjugado, grados o e).', 'حالة عدم تعيين: لا نعرف قيمتها ويجب الحساب (التحليل أو المرافق أو الدرجات أو e).', 'It is indeterminate: its value is not known and you have to work it out (factorise, the conjugate, degrees or e).'),
    zero: say('Badakigu: zatidura edo berretura 0 baliora doa.', 'Se sabe: el cociente o la potencia va a 0.', 'معلوم: يتجه خارج القسمة أو القوة إلى 0.', 'It is known: the quotient or the power goes to 0.'),
    infinity: say('Badakigu: infinitura doa; zeinua aztertu behar da.', 'Se sabe: va a infinito; hay que mirar el signo.', 'معلوم: يتجه إلى اللانهاية، ويجب النظر في الإشارة.', 'It is known: it goes to infinity; the sign has to be checked.'),
    number: say('Badakigu: zenbaki bat da, eta hori da limitea.', 'Se sabe: es un número, y ese es el límite.', 'معلوم: إنه عدد وهو النهاية.', 'It is known: it is a number, and that is the limit.')
}

function FormsPlay({ round, language, onAnswer, answered }: RoundProps<FormsRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<FormBin | null>(null)
    const choose = (bin: FormBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Ordezkatu buruz: zer ateratzen da?', 'Sustituye de cabeza: ¿qué sale?', 'عوّض ذهنيًّا: ماذا تجد؟', 'Substitute in your head: what do you get?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.limit, language)}</div>
            <div className="prop3-options" role="group" aria-label={l(say('Zer ateratzen da', 'Qué sale', 'ماذا تجد', 'What you get'))}>
                {FORM_BINS.map((bin) => (
                    <button key={bin} type="button" dir={bin === 'zero' || bin === 'infinity' ? 'ltr' : undefined} disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(BIN_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <span className="dbh4-worked">{formula(`\\to\\ ${round.form}`, language)}</span>
                    <MathText text={l(BIN_REASONS[round.bin])} />
                </RoundVerdict>
            )}
        </>
    )
}

export function FormsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: FORMS_ROUNDS,
                rules: [
                    say('Limite bat ematen da. Ez kalkulatu: ordezkatu buruz bakarrik.', 'Te dan un límite. No lo calcules: solo sustituye de cabeza.', 'تُعطى نهاية. لا تحسبها: عوّض ذهنيًّا فقط.', 'You get a limit. Do not work it out: just substitute in your head.'),
                    say('$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$, $1^{\\infty}$ eta $\\infty^{0}$ indeterminazioak dira.', '$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$, $1^{\\infty}$ e $\\infty^{0}$ son indeterminaciones.', '$\\frac{0}{0}$ و$\\frac{\\infty}{\\infty}$ و$\\infty-\\infty$ و$0\\cdot\\infty$ و$1^{\\infty}$ و$\\infty^{0}$ حالات عدم تعيين.', '$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$, $1^{\\infty}$ and $\\infty^{0}$ are indeterminate.'),
                    say('$\\frac{k}{0}$ infinitua da; $\\frac{k}{\\infty}$, 0.', '$\\frac{k}{0}$ es infinito; $\\frac{k}{\\infty}$, 0.', '$\\frac{k}{0}$ لانهائي، و$\\frac{k}{\\infty}$ يساوي 0.', '$\\frac{k}{0}$ is infinite; $\\frac{k}{\\infty}$, 0.')
                ],
                create: createFormsRounds,
                stars: standardStars(FORMS_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: FormsPlay
            }}
        />
    )
}

/* ---------- Caza las asíntotas ---------- */

function AsymptoteGraph({ round, language }: { round: AsymptoteRound; language: UnitLanguage }) {
    const l = useGameText(language)
    const B = ASYMPTOTE_BOX
    const parts = sampled((x) => asymptoteValue(round, x), -B, B, B * 2, 0.01)
    return (
        <div className="bach-lim-plane">
            <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={22} labelStep={2} maxHeight={320} label={l(say('Funtzioaren grafikoa eta asintotak', 'La gráfica y las asíntotas', 'الرسم والمقاربات', 'The graph and the asymptotes'))}>
                {(map, clip) => (
                    <g>
                        {round.verticals.map((d) => <PlanePath key={`v${d}`} map={map} points={[[d, -B], [d, B]]} color={MUTED} width={2} dashed />)}
                        {round.horizontal !== null && <PlanePath map={map} points={[[-B, round.horizontal], [B, round.horizontal]]} color={MUTED} width={2} dashed />}
                        {round.oblique && <PlaneLine map={map} m={round.oblique[0]} n={round.oblique[1]} color={MUTED} width={2} dashed clip={clip} />}
                        {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                        {round.hole && Math.abs(round.hole[1]) <= B && <PlanePoint map={map} point={round.hole} color={BLUE} radius={6} hollow />}
                    </g>
                )}
            </Plane>
        </div>
    )
}

function AsymptotePlay({ round, level, language, onAnswer, answered }: RoundProps<AsymptoteRound>) {
    const l = useGameText(language)
    const [marked, setMarked] = useState<number[]>([])
    const right = isAsymptotePick(round, marked)
    const toggle = (index: number) => setMarked((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
    const state = (index: number) => {
        if (!answered) return marked.includes(index) ? 'marked' : ''
        const card = round.cards[index]
        if (card.right) return marked.includes(index) ? 'right' : 'missed'
        return marked.includes(index) ? 'wrong' : ''
    }
    return (
        <>
            <p className="prop3-prompt">{l(level === 0
                ? say('Markatu asintota bertikal guztiak, eta besterik ez.', 'Marca todas las asíntotas verticales y ninguna más.', 'حدّد كل المقاربات الرأسية ولا شيء غيرها.', 'Mark every vertical asymptote and nothing else.')
                : say('Markatu asintota guztiak, eta besterik ez.', 'Marca todas las asíntotas y ninguna más.', 'حدّد كل المقاربات ولا شيء غيرها.', 'Mark every asymptote and nothing else.'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="bach-lim-cards" dir="ltr" role="group" aria-label={l(say('Zuzenak', 'Rectas', 'المستقيمات', 'Lines'))}>
                {round.cards.map((card, index) => (
                    <button key={card.latex} type="button" className={`bach-lim-card ${state(index)}`} aria-pressed={marked.includes(index)} disabled={answered} onClick={() => toggle(index)}>
                        {formula(card.latex, language)}
                    </button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={marked.length === 0} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(round.cards.filter((card) => card.right).map((card) => card.latex).join('\\qquad '), language)}</span>
                    {round.hole && <MathText text={l(say(`$x=${round.hole[0]}$ puntuan faktorea sinplifikatzen da: zuloa da, ez asintota.`, `En $x=${round.hole[0]}$ el factor se simplifica: es un agujero, no una asíntota.`, `عند $x=${round.hole[0]}$ يُختصر العامل: إنه ثقب لا مقارب.`, `At $x=${round.hole[0]}$ the factor cancels: it is a hole, not an asymptote.`))} />}
                    <AsymptoteGraph round={round} language={language} />
                </RoundVerdict>
            )}
        </>
    )
}

export function AsymptoteGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ASYMPTOTE_ROUNDS,
                rules: [
                    say('Funtzio bat eta zenbait zuzen ematen dira.', 'Te dan una función y unas rectas.', 'تُعطى دالة وبعض المستقيمات.', 'You get a function and some lines.'),
                    say('Bertikala: izendatzailea 0 eta zenbakitzailea ez. Horizontala: maila bera ala behean handiagoa. Zeiharra: goian maila bat gehiago.', 'Vertical: denominador 0 y numerador no. Horizontal: mismo grado o mayor abajo. Oblicua: un grado más arriba.', 'الرأسي: المقام 0 والبسط لا. الأفقي: الدرجة نفسها أو أكبر في المقام. المائل: درجة زائدة في البسط.', 'Vertical: denominator 0 and numerator not. Horizontal: same degree or higher below. Oblique: one degree more on top.'),
                    say('Markatu asintota guztiak eta egiaztatu: bat falta bada edo bat soberan badago, gaizki dago.', 'Marca todas las asíntotas y comprueba: si falta una o sobra una, está mal.', 'حدّد كل المقاربات وتحقّق: إذا نقص واحد أو زاد واحد فالإجابة خاطئة.', 'Mark every asymptote and check: one missing or one too many is wrong.')
                ],
                create: createAsymptoteRounds,
                stars: standardStars(ASYMPTOTE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: AsymptotePlay
            }}
        />
    )
}

/* ---------- ¿Qué discontinuidad? ---------- */

const KIND_LABELS: Record<DiscontinuityKind, LocalizedText> = {
    continuous: say('Jarraitua', 'Continua', 'متصلة', 'Continuous'),
    removable: say('Gaindigarria', 'Evitable', 'قابل للإزالة', 'Removable'),
    jump: say('Jauzi finitua', 'Salto finito', 'قفزة منتهية', 'Finite jump'),
    infinite: say('Jauzi infinitua', 'Salto infinito', 'قفزة لانهائية', 'Infinite jump')
}

function DiscontinuityGraph({ round, language }: { round: DiscontinuityRound; language: UnitLanguage }) {
    const l = useGameText(language)
    const B = DISCONTINUITY_BOX
    const parts = round.pieces.flatMap((piece: Piece) => sampled(piece.fn, Math.max(-B, piece.from), Math.min(B, piece.to), B * 2, 0.01))
    return (
        <div className="bach-lim-plane">
            <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={26} labelStep={1} maxHeight={320} label={l(say(`Funtzioaren grafikoa x = ${round.a} puntuaren inguruan`, `La gráfica alrededor de x = ${round.a}`, `الرسم حول x = ${round.a}`, `The graph around x = ${round.a}`))}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[round.a, -B], [round.a, B]]} color={MUTED} width={1.4} dashed />
                        {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                        {round.open.filter(([, y]) => Math.abs(y) <= B).map((point) => <PlanePoint key={`o${point.join()}`} map={map} point={point} color={BLUE} radius={6} hollow />)}
                        {round.full.filter(([, y]) => Math.abs(y) <= B).map((point) => <PlanePoint key={`f${point.join()}`} map={map} point={point} color={RED} radius={6} />)}
                    </g>
                )}
            </Plane>
        </div>
    )
}

function DiscontinuityPlay({ round, level, language, onAnswer, answered }: RoundProps<DiscontinuityRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<DiscontinuityKind | null>(null)
    const choose = (kind: DiscontinuityKind) => {
        if (answered) return
        setPicked(kind)
        onAnswer(kind === round.answer)
    }
    const a = round.a
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Zer gertatzen da $x=${a}$ puntuan?`, `¿Qué pasa en $x=${a}$?`, `ماذا يحدث عند $x=${a}$؟`, `What happens at $x=${a}$?`))} /></p>
            {round.latex && <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>}
            {(level === 0 || answered) && <DiscontinuityGraph round={round} language={language} />}
            <div className="prop3-options" role="group" aria-label={l(say('Etenune mota', 'Tipo de discontinuidad', 'نوع الانقطاع', 'Kind of discontinuity'))}>
                {DISCONTINUITY_KINDS.map((kind) => (
                    <button key={kind} type="button" disabled={answered} className={!answered ? '' : kind === round.answer ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>
                        {l(KIND_LABELS[kind])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`\\lim_{x\\to ${a}^-}f(x)=${limitLatex(round.left, language)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`\\lim_{x\\to ${a}^+}f(x)=${limitLatex(round.right, language)}`, language)}</span>
                    {round.value === null
                        ? <MathText text={l(say(`$f(${a})$ ez dago.`, `$f(${a})$ no existe.`, `$f(${a})$ غير موجودة.`, `$f(${a})$ does not exist.`))} />
                        : <span className="dbh4-worked">{formula(`f(${a})=${limitLatex(round.value, language)}`, language)}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function DiscontinuityGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DISCONTINUITY_ROUNDS,
                rules: [
                    say('Funtzio bat eta puntu bat ematen dira.', 'Te dan una función y un punto.', 'تُعطى دالة ونقطة.', 'You get a function and a point.'),
                    say('Alboko limiteak berdinak eta $f(a)$ berdina: jarraitua. Berdinak baina $f(a)$ ez: gaindigarria. Desberdinak: jauzi finitua. Bat infinitua: jauzi infinitua.', 'Laterales iguales y $f(a)$ igual: continua. Iguales pero $f(a)$ no: evitable. Distintos: salto finito. Uno infinito: salto infinito.', 'النهايتان متساويتان و$f(a)$ مثلهما: متصلة. متساويتان و$f(a)$ لا: قابل للإزالة. مختلفتان: قفزة منتهية. إحداهما لانهائية: قفزة لانهائية.', 'One-sided limits equal and $f(a)$ the same: continuous. Equal but $f(a)$ not: removable. Different: finite jump. One infinite: infinite jump.'),
                    say('Erpin bat ez da etenunea: $|x|$ jarraitua da.', 'Un pico no es una discontinuidad: $|x|$ es continua.', 'الزاوية ليست انقطاعًا: $|x|$ متصلة.', 'A corner is not a discontinuity: $|x|$ is continuous.')
                ],
                create: createDiscontinuityRounds,
                stars: standardStars(DISCONTINUITY_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: DiscontinuityPlay
            }}
        />
    )
}
