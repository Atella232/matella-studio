import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2gDerivativesGames.css'
import { createMatchRounds, MATCH_ROUNDS, type Curve, type MatchRound } from './matchSlope'
import { createNextCostRounds, NEXT_COST_ROUNDS, type NextCostRound } from './nextCost'

/* ==========================================================================
   ¿Cuánto cuesta la siguiente? and Une f con f′ (Deribatuak, Batxilergoa 2
   · Gizarte Zientziak): the first picks one of four amounts, the second
   one of three small graphs. After each answer the working comes in.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const amount = (value: number, language: UnitLanguage) => {
    const text = String(Math.round(value * 100) / 100)
    const number = language === 'eu' || language === 'es' ? text.replace('.', ',') : text
    return language === 'en' ? `€${number}` : `${number} €`
}

/* ---------- ¿Cuánto cuesta la siguiente? ---------- */

function NextCostPlay({ round, language, onAnswer, answered }: RoundProps<NextCostRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (value: number) => {
        if (answered) return
        setPicked(value)
        onAnswer(value === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.story)} /></p>
            <div className="prop3-options" role="group" aria-label={l(say('Kostua', 'El coste', 'التكلفة', 'The cost'))}>
                {round.options.map((value) => (
                    <button key={value} type="button" dir="ltr" disabled={answered} className={!answered ? '' : value === round.answer ? 'right' : value === picked ? 'wrong' : ''} onClick={() => choose(value)}>
                        {amount(value, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span dir="ltr">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function NextCostGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: NEXT_COST_ROUNDS,
                rules: [
                    say('Kostu, diru-sarrera edo irabazi bat ematen da, eta produkzio bat.', 'Te dan un coste, un ingreso o un beneficio y una producción.', 'تُعطى تكلفة أو إيراد أو ربح، وإنتاج.', 'You get a cost, an income or a profit, and a production.'),
                    say("Hurrengo unitatea, gutxi gorabehera: $C'(x)$, $I'(x)$ edo $B'(x)$.", "La unidad siguiente, más o menos: $C'(x)$, $I'(x)$ o $B'(x)$.", "الوحدة التالية تقريبًا: $C'(x)$ أو $I'(x)$ أو $B'(x)$.", "The next unit, roughly: $C'(x)$, $I'(x)$ or $B'(x)$.")
                ],
                create: createNextCostRounds,
                stars: standardStars(NEXT_COST_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: NextCostPlay
            }}
        />
    )
}

/* ---------- Une f con f′ ---------- */

/** A small graph on [−3, 3], scaled to fit its values */
function MiniGraph({ curve }: { curve: Curve }) {
    const xs = Array.from({ length: 81 }, (_, i) => -3 + (6 * i) / 80)
    const ys = xs.map(curve.fn).map((y) => Math.max(-30, Math.min(30, y)))
    const top = Math.max(1, ...ys.map(Math.abs))
    const X = (x: number) => 50 + (x / 3) * 44
    const Y = (y: number) => 40 - (y / top) * 32
    const d = xs.map((x, i) => `${i ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(ys[i]).toFixed(1)}`).join(' ')
    return (
        <svg viewBox="0 0 100 80" aria-hidden="true" direction="ltr">
            <rect x="2" y="2" width="96" height="76" rx="6" fill="var(--card, #fffcf6)" />
            <line x1="6" x2="94" y1="40" y2="40" stroke="var(--ink, #1d2733)" strokeWidth="1" />
            <line x1="50" x2="50" y1="6" y2="74" stroke="var(--ink, #1d2733)" strokeWidth="1" />
            <path d={d} fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="2.6" />
        </svg>
    )
}

function MatchPlay({ round, language, onAnswer, answered }: RoundProps<MatchRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da haren deribatuaren grafikoa?', '¿Cuál es la gráfica de su derivada?', 'أي تمثيل هو تمثيل مشتقتها؟', 'Which is the graph of its derivative?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options bach2g-der-graphs" role="group" aria-label="f′">
                {round.options.map((curve, index) => (
                    <button key={curve.latex} type="button" disabled={answered} aria-label={`${index + 1}`} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <MiniGraph curve={curve} />
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span dir="ltr">{formula(`f'(x)=${round.derivative}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function MatchSlopeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MATCH_ROUNDS,
                rules: [
                    say('Funtzio baten formula ematen da, eta hiru grafiko.', 'Te dan la fórmula de una función y tres gráficas.', 'تُعطى صيغة دالة وثلاثة تمثيلات.', 'You get the formula of a function and three graphs.'),
                    say("Deribatu buruz eta aukeratu $f'$ funtzioaren grafikoa.", "Deriva de cabeza y elige la gráfica de $f'$.", "اشتق ذهنيًا واختر تمثيل $f'$.", "Differentiate in your head and pick the graph of $f'$.")
                ],
                create: createMatchRounds,
                stars: standardStars(MATCH_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: MatchPlay
            }}
        />
    )
}
