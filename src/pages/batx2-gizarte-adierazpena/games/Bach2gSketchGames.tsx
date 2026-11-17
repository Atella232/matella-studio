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
import './Bach2gSketchGames.css'
import { createSheetRounds, SHEET_ROUNDS, type SheetRound } from './sheet'
import { createWhichRounds, WHICH_ROUNDS, type Curve, type WhichRound } from './whichGraph'

/* ==========================================================================
   ¿Qué gráfica es? and Completa la ficha (Funtzioen adierazpena,
   Batxilergoa 2 · Gizarte Zientziak): the first picks one of three small
   graphs, the second one of four lines of a card. After each answer the
   working comes in.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />

/* ---------- ¿Qué gráfica es? ---------- */

/** A small graph on [−4, 4] × [−6, 6], broken at its vertical asymptote */
function MiniGraph({ curve }: { curve: Curve }) {
    const X = (x: number) => 50 + (x / 4) * 44
    const Y = (y: number) => 40 - (y / 6) * 34
    const parts: string[] = []
    let pen = false
    for (let i = 0; i <= 160; i++) {
        const x = -4 + (8 * i) / 160
        const y = curve.fn(x)
        const near = curve.breakAt !== undefined && Math.abs(x - curve.breakAt) < 0.06
        if (!Number.isFinite(y) || near || Math.abs(y) > 9) { pen = false; continue }
        parts.push(`${pen ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`)
        pen = true
    }
    return (
        <svg viewBox="0 0 100 80" aria-hidden="true" direction="ltr">
            <defs><clipPath id={`mini-${curve.key}`}><rect x="2" y="2" width="96" height="76" rx="6" /></clipPath></defs>
            <rect x="2" y="2" width="96" height="76" rx="6" fill="var(--card, #fffcf6)" />
            <line x1="6" x2="94" y1="40" y2="40" stroke="var(--ink, #1d2733)" strokeWidth="1" />
            <line x1="50" x2="50" y1="6" y2="74" stroke="var(--ink, #1d2733)" strokeWidth="1" />
            {curve.breakAt !== undefined && <line x1={X(curve.breakAt)} x2={X(curve.breakAt)} y1="6" y2="74" stroke="var(--muted, #58616e)" strokeWidth="0.8" strokeDasharray="3 3" />}
            <path d={parts.join(' ')} fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="2.6" clipPath={`url(#mini-${curve.key})`} />
        </svg>
    )
}

function WhichPlay({ round, language, onAnswer, answered }: RoundProps<WhichRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da funtzio honen grafikoa?', '¿Cuál es la gráfica de esta función?', 'أي تمثيل لهذه الدالة؟', 'Which is the graph of this function?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options bach2g-sketch-graphs" role="group" aria-label={l(say('Grafikoak', 'Gráficas', 'التمثيلات', 'Graphs'))}>
                {round.options.map((curve, index) => (
                    <button key={curve.key} type="button" disabled={answered} aria-label={`${index + 1}`} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <MiniGraph curve={curve} />
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

export function WhichGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHICH_ROUNDS,
                rules: [
                    say('Funtzio baten formula ematen da, eta hiru grafiko.', 'Te dan la fórmula de una función y tres gráficas.', 'تُعطى صيغة دالة وثلاثة تمثيلات.', 'You get the formula of a function and three graphs.'),
                    say('Begiratu asintotak, adarrak eta muturrak, eta aukeratu berea.', 'Mira asíntotas, ramas y extremos, y elige la suya.', 'انظر إلى المقاربات والفرعين والقيم القصوى واختر تمثيلها.', 'Look at asymptotes, branches and extrema, and pick its own.')
                ],
                create: createWhichRounds,
                stars: standardStars(WHICH_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: WhichPlay
            }}
        />
    )
}

/* ---------- Completa la ficha ---------- */

function SheetPlay({ round, language, onAnswer, answered }: RoundProps<SheetRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <div className="prop3-options bach2g-sketch-options" role="group" aria-label={l(round.prompt)}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(option, language)}
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

export function SheetGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SHEET_ROUNDS,
                rules: [
                    say('Funtzio bat eta haren fitxaren lerro bat ematen dira.', 'Te dan una función y una línea de su ficha.', 'تُعطى دالة وسطر من بطاقتها.', 'You get a function and one line of its card.'),
                    say('Kalkulatu eta aukeratu datu zuzena.', 'Calcula y elige el dato correcto.', 'احسب واختر المعطى الصحيح.', 'Work it out and pick the right fact.')
                ],
                create: createSheetRounds,
                stars: standardStars(SHEET_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: SheetPlay
            }}
        />
    )
}
