import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2DerivativesGames.css'
import { createDerivableRounds, DERIVABLE_BINS, DERIVABLE_ROUNDS, type DerivableBin, type DerivableRound } from './derivable'
import { boardLimit, createHiddenRounds, curveBranches, HIDDEN_ROUNDS, slopeLatex, slopeValue, type HiddenRound } from './hidden'
import { createOnionRounds, isOnionOrder, ONION_ROUNDS, type OnionRound } from './onion'

/* ==========================================================================
   ¿Derivable?, Pela la cebolla and Pendiente escondida (Deribatuak,
   Batxilergoa 2 · Zientziak): the first chooses among three verdicts, the
   second orders three cards and then chooses a derivative, the third
   picks one of three lines drawn through a point of a curve. After each
   answer the reason comes in: the heights and slopes at the joint, the
   layers and the factors, the y′ of the curve at the point.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const signedLatex = (value: number) => String(value)

/* ---------- ¿Derivable? ---------- */

const DERIVABLE_LABELS: Record<DerivableBin, LocalizedText> = {
    smooth: say('Deribagarria', 'Derivable', 'قابلة للاشتقاق', 'Differentiable'),
    corner: say('Jarraitua, punta batekin', 'Continua con pico', 'متصلة بزاوية', 'Continuous with a corner'),
    jump: say('Ez da jarraitua', 'No es continua', 'ليست متصلة', 'Not continuous')
}

function derivableReason(round: DerivableRound): LocalizedText {
    if (round.bin === 'jump') return say('Altuerak ez datoz bat: jauzi bat dago, eta jarraitua ez bada, ez da deribagarria.', 'Las alturas no coinciden: hay un salto, y sin continuidad no es derivable.', 'لا يتطابق الارتفاعان: توجد قفزة، ودون اتصال لا قابلية للاشتقاق.', 'The heights do not match: there is a jump, and without continuity it is not differentiable.')
    if (round.bin === 'corner') return say('Altuera bera, baina malda desberdinak: punta bat.', 'La misma altura, pero pendientes distintas: un pico.', 'الارتفاع نفسه لكن الميلين مختلفان: زاوية.', 'The same height, but different slopes: a corner.')
    return say('Altuera bera eta malda bera: deribagarria da.', 'La misma altura y la misma pendiente: es derivable.', 'الارتفاع نفسه والميل نفسه: قابلة للاشتقاق.', 'The same height and the same slope: it is differentiable.')
}

function DerivablePlay({ round, language, onAnswer, answered }: RoundProps<DerivableRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<DerivableBin | null>(null)
    const choose = (bin: DerivableBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    const { a } = round
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Nolakoa da $f$ funtzioa $x=${a}$ puntuan?`, `¿Cómo es $f$ en $x=${a}$?`, `كيف تكون $f$ عند $x=${a}$؟`, `What is $f$ like at $x=${a}$?`))} /></p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {DERIVABLE_BINS.map((bin) => (
                    <button key={bin} type="button" disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(DERIVABLE_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <span className="dbh4-worked">{formula(`f(${a}^-)=${signedLatex(round.values[0])}\\qquad f(${a}^+)=${signedLatex(round.values[1])}`, language)}</span>
                    {round.bin !== 'jump' && <span className="dbh4-worked">{formula(`f'(${a}^-)=${signedLatex(round.slopes[0])}\\qquad f'(${a}^+)=${signedLatex(round.slopes[1])}`, language)}</span>}
                    <MathText text={l(derivableReason(round))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function DerivableGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DERIVABLE_ROUNDS,
                rules: [
                    say('Lehenik begiratu bi zatien altuerak lotunean: desberdinak badira, ez da jarraitua.', 'Primero mira las alturas de los dos trozos en la unión: si son distintas, no es continua.', 'انظر أولًا إلى ارتفاعي الجزأين عند الالتقاء: إذا اختلفا فليست متصلة.', 'First look at the heights of both pieces at the joint: if they differ, it is not continuous.'),
                    say('Gero, maldak: berdinak badira, deribagarria; desberdinak badira, punta bat.', 'Después, las pendientes: si coinciden, derivable; si no, un pico.', 'ثم الميلان: إذا تساويا فهي قابلة للاشتقاق، وإلا فزاوية.', 'Then the slopes: if they are equal, differentiable; if not, a corner.')
                ],
                create: createDerivableRounds,
                stars: standardStars(DERIVABLE_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: DerivablePlay
            }}
        />
    )
}

/* ---------- Pela la cebolla ---------- */

function OnionPlay({ round, language, onAnswer, answered }: RoundProps<OnionRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string[]>([])
    const [choice, setChoice] = useState<number | null>(null)
    const ordered = isOnionOrder(round, picked)
    const tap = (card: string) => {
        if (answered || picked.includes(card)) return
        const next = [...picked, card]
        setPicked(next)
        if (next.length === 3 && !isOnionOrder(round, next)) onAnswer(false)
    }
    const choose = (index: number) => {
        if (answered) return
        setChoice(index)
        onAnswer(index === round.correct)
    }
    const right = ordered && choice === round.correct
    const cardState = (card: string) => {
        const at = picked.indexOf(card)
        if (!answered) return at >= 0 ? 'marked' : ''
        return round.layers.indexOf(card) === at ? 'right' : 'wrong'
    }
    return (
        <>
            <p className="prop3-prompt">{l(ordered ? say('Orain aukeratu deribatua.', 'Ahora elige la derivada.', 'اختر الآن المشتقة.', 'Now choose the derivative.') : say('Ukitu geruzak kanpotik barrura.', 'Toca las capas de fuera adentro.', 'المس الطبقات من الخارج إلى الداخل.', 'Tap the layers from outside in.'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="bach-lim-cards" dir="ltr" role="group" aria-label={l(say('Geruzak', 'Capas', 'الطبقات', 'Layers'))}>
                {round.cards.map((card) => (
                    <button key={card} type="button" className={`bach-lim-card ${cardState(card)}`} aria-pressed={picked.includes(card)} disabled={answered || picked.includes(card)} onClick={() => tap(card)}>
                        {picked.includes(card) && <span className="bach2-der-order">{picked.indexOf(card) + 1}</span>}
                        {formula(card, language)}
                    </button>
                ))}
            </div>
            {ordered && (
                <div className="prop3-options bach2-der-options" role="group" aria-label={l(say('Deribatua', 'La derivada', 'المشتقة', 'The derivative'))}>
                    {round.options.map((option, index) => (
                        <button key={option} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.correct ? 'right' : index === choice ? 'wrong' : ''} onClick={() => choose(index)}>
                            {formula(option, language)}
                        </button>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`${round.layers[0]}\\ \\to\\ ${round.layers[1]}\\ \\to\\ ${round.layers[2]}`, language)}</span>
                    <span className="dbh4-worked bach2-der-wide">{formula(`f'(x)=${round.options[round.correct]}`, language)}</span>
                    <MathText text={l(say('Geruza bakoitzak faktore bat ematen du, kanpotik barrura.', 'Cada capa da un factor, de fuera adentro.', 'كل طبقة تعطي عاملًا، من الخارج إلى الداخل.', 'Each layer gives a factor, from outside in.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function OnionGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ONION_ROUNDS,
                rules: [
                    say('Lehenik, ukitu hiru geruzak kanpotik barrura; ordena bakarra da zuzena.', 'Primero, toca las tres capas de fuera adentro; solo vale un orden.', 'أولًا المس الطبقات الثلاث من الخارج إلى الداخل؛ ترتيب واحد فقط صحيح.', 'First, tap the three layers from outside in; only one order is right.'),
                    say('Gero, aukeratu deribatua: geruza bakoitzaren deribatua, biderkatuta.', 'Después, elige la derivada: la derivada de cada capa, multiplicadas.', 'ثم اختر المشتقة: مشتقة كل طبقة، مضروبة بعضها في بعض.', 'Then choose the derivative: the derivative of each layer, multiplied.')
                ],
                create: createOnionRounds,
                stars: standardStars(ONION_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: OnionPlay
            }}
        />
    )
}

/* ---------- Pendiente escondida ---------- */

const LETTERS = ['A', 'B', 'C']
const LINE_COLORS = ['var(--stage, #2f6fdb)', '#7a4fc9', 'var(--mustard, #e0a100)']

function HiddenBoard({ round, answered, picked }: { round: HiddenRound; answered: boolean; picked: number | null }) {
    const limit = boardLimit(round.curve)
    const size = 300
    const X = (x: number) => 10 + ((x + limit) * size) / (2 * limit)
    const Y = (y: number) => 10 + ((limit - y) * size) / (2 * limit)
    const [x0, y0] = round.point
    const path = (points: Array<[number, number]>) => points.filter(([, y]) => Math.abs(y) <= limit * 1.5).map(([x, y], index) => `${index ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`).join(' ')
    const inside = ([x, y]: [number, number]) => Math.abs(x) <= limit * 0.85 && Math.abs(y) <= limit * 0.85
    const ticks = Array.from({ length: 2 * limit + 1 }, (_, i) => i - limit)
    return (
        <svg className="bach2-der-board" viewBox="0 0 320 320" direction="ltr" role="img" aria-label={`${round.latex}`}>
            <defs><clipPath id="bach2-der-hidden-clip"><rect x={10} y={10} width={size} height={size} /></clipPath></defs>
            <rect x={10} y={10} width={size} height={size} fill="var(--card, #fffcf6)" stroke="var(--line, #d8d0c2)" />
            {ticks.map((t) => <line key={`gx${t}`} x1={X(t)} x2={X(t)} y1={10} y2={10 + size} stroke="#e6dfd2" strokeWidth={1} />)}
            {ticks.map((t) => <line key={`gy${t}`} y1={Y(t)} y2={Y(t)} x1={10} x2={10 + size} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={X(-limit)} x2={X(limit)} y1={Y(0)} y2={Y(0)} stroke="var(--ink, #1d2733)" strokeWidth={1.4} />
            <line x1={X(0)} x2={X(0)} y1={Y(-limit)} y2={Y(limit)} stroke="var(--ink, #1d2733)" strokeWidth={1.4} />
            <g clipPath="url(#bach2-der-hidden-clip)">
                {curveBranches(round.curve, limit).map((branch, index) => <path key={index} d={path(branch)} fill="none" stroke="var(--ink, #1d2733)" strokeWidth={3} opacity={0.75} />)}
                {round.slopes.map((slope, index) => {
                    const m = slopeValue(slope)
                    const right = answered && index === round.correct
                    const wrong = answered && index === picked && index !== round.correct
                    const color = right ? 'var(--success, #267b53)' : wrong ? 'var(--second, #c4432a)' : LINE_COLORS[index]
                    return <line key={index} x1={X(-limit * 2)} y1={Y(y0 + m * (-limit * 2 - x0))} x2={X(limit * 2)} y2={Y(y0 + m * (limit * 2 - x0))} stroke={color} strokeWidth={right ? 4 : 2.6} />
                })}
            </g>
            {round.slopes.map((slope, index) => {
                const m = slopeValue(slope)
                const norm = Math.hypot(1, m)
                // Along the line, as far as it fits inside the board (each letter at its own distance first)
                const along = (distance: number, sign: number): [number, number] => [x0 + (sign * distance) / norm, y0 + (sign * distance * m) / norm]
                const tries = [0.45 + 0.2 * index, 0.35, 0.25, 0.18].flatMap((share) => [along(limit * share, 1), along(limit * share, -1)])
                const [lx, ly] = tries.find(inside) ?? along(limit * 0.12, 1)
                return (
                    <g key={`label${index}`}>
                        <circle cx={X(lx)} cy={Y(ly)} r={11} fill="var(--card, #fffcf6)" stroke={LINE_COLORS[index]} strokeWidth={2} />
                        <text x={X(lx)} y={Y(ly) + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--ink, #1d2733)">{LETTERS[index]}</text>
                    </g>
                )
            })}
            <circle cx={X(x0)} cy={Y(y0)} r={6} fill="var(--ink, #1d2733)" />
        </svg>
    )
}

function HiddenPlay({ round, language, onAnswer, answered }: RoundProps<HiddenRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.correct)
    }
    const [x0, y0] = round.point
    const right = round.slopes[round.correct]
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Zein da zuzen ukitzailea $(${x0},${y0})$ puntuan?`, `¿Cuál es la tangente en $(${x0},${y0})$?`, `أيها المماس عند $(${x0},${y0})$؟`, `Which one is the tangent at $(${x0},${y0})$?`))} /></p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <HiddenBoard round={round} answered={answered} picked={picked} />
            <div className="prop3-options bach2-der-letters" role="group" aria-label={l(say('Zuzenak', 'Rectas', 'المستقيمات', 'Lines'))}>
                {LETTERS.map((letter, index) => (
                    <button key={letter} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.correct ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {letter}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.correct} language={language}>
                    <span className="dbh4-worked">{formula(round.formula, language)}</span>
                    <span className="dbh4-worked">{formula(`y'(${x0},${y0})=${slopeLatex(right)}`, language)}</span>
                    <MathText text={l(say(`Zuzen ukitzailea ${LETTERS[round.correct]} da.`, `La tangente es la ${LETTERS[round.correct]}.`, `المماس هو ${LETTERS[round.correct]}.`, `The tangent is ${LETTERS[round.correct]}.`))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function HiddenGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HIDDEN_ROUNDS,
                rules: [
                    say('Deribatu bi aldeak $x$ aldagaiarekiko: $y$ duen gai bakoitzak $y\'$ darama.', 'Deriva los dos lados respecto a $x$: cada término con $y$ lleva $y\'$.', 'اشتق الطرفين بالنسبة إلى $x$: كل حد فيه $y$ يحمل $y\'$.', 'Differentiate both sides with respect to $x$: each term with $y$ carries $y\'$.'),
                    say('Askatu $y\'$, ordezkatu puntua eta bilatu malda hori duen zuzena.', 'Despeja $y\'$, sustituye el punto y busca la recta con esa pendiente.', 'استخرج $y\'$ وعوّض النقطة وابحث عن المستقيم الذي له هذا الميل.', 'Solve for $y\'$, substitute the point and look for the line with that slope.')
                ],
                create: createHiddenRounds,
                stars: standardStars(HIDDEN_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: HiddenPlay
            }}
        />
    )
}
