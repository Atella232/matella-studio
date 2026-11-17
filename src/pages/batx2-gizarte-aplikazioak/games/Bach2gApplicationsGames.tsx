import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2gApplicationsGames.css'
import { createExtremeRounds, EXTREME_KINDS, EXTREME_ROUNDS, type ExtremeKind, type ExtremeRound } from './extremeKind'
import { createOptimizeRounds, OPTIMIZE_ROUNDS, type OptimizeRound } from './optimize'

/* ==========================================================================
   ¿Máximo, mínimo o nada? and Optimiza la empresa (Deribatuaren
   aplikazioak, Batxilergoa 2 · Gizarte Zientziak): the first picks one of
   three answers, the second one of four numbers. After each answer the
   working comes in.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const amount = (value: number, unit: OptimizeRound['unit'], language: UnitLanguage) => {
    const text = groupDigits(String(Math.round(value * 100) / 100), language)
    const number = language === 'eu' || language === 'es' ? text.replace('.', ',') : text
    if (unit === 'units') return number
    return language === 'en' ? `€${number}` : `${number} €`
}

/* ---------- ¿Máximo, mínimo o nada? ---------- */

const KIND_NAMES: Record<ExtremeKind, LocalizedText> = {
    max: say('Maximoa', 'Máximo', 'عظمى', 'Maximum'),
    min: say('Minimoa', 'Mínimo', 'صغرى', 'Minimum'),
    none: say('Ezer ez', 'Nada', 'لا شيء', 'Nothing')
}

function ExtremePlay({ round, language, onAnswer, answered }: RoundProps<ExtremeRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<ExtremeKind | null>(null)
    const choose = (kind: ExtremeKind) => {
        if (answered) return
        setPicked(kind)
        onAnswer(kind === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <div className="dbh4-big-formula bach-lim-big bach2g-app-table" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {EXTREME_KINDS.map((kind) => (
                    <button key={kind} type="button" disabled={answered} className={!answered ? '' : kind === round.answer ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>
                        {l(KIND_NAMES[kind])}
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

export function ExtremeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: EXTREME_ROUNDS,
                rules: [
                    say("Puntu batean $f'=0$ da: zuzen ukitzailea horizontala da.", "En un punto $f'=0$: la tangente es horizontal.", "عند نقطة $f'=0$: المماس أفقي.", "At a point $f'=0$: the tangent is horizontal."),
                    say("Erabaki: maximoa, minimoa ala ezer ez. Begiratu $f'$ zeinuz aldatzen den, edo $f''$.", "Decide: máximo, mínimo o nada. Mira si $f'$ cambia de signo, o $f''$.", "قرّر: عظمى أم صغرى أم لا شيء. انظر هل تتغير إشارة $f'$، أو إلى $f''$.", "Decide: maximum, minimum or nothing. Check whether $f'$ changes sign, or $f''$.")
                ],
                create: createExtremeRounds,
                stars: standardStars(EXTREME_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ExtremePlay
            }}
        />
    )
}

/* ---------- Optimiza la empresa ---------- */

function OptimizePlay({ round, language, onAnswer, answered }: RoundProps<OptimizeRound>) {
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
            <div className="prop3-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {round.options.map((value) => (
                    <button key={value} type="button" dir="ltr" disabled={answered} className={!answered ? '' : value === round.answer ? 'right' : value === picked ? 'wrong' : ''} onClick={() => choose(value)}>
                        {amount(value, round.unit, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.working.split('\\ \\to\\ ').map((part) => <span key={part} dir="ltr" className="bach2g-app-step">{formula(part, language)}</span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function OptimizeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: OPTIMIZE_ROUNDS,
                rules: [
                    say('Enpresa baten problema labur bat ematen da.', 'Te dan un problema corto de una empresa.', 'تُعطى مسألة قصيرة لشركة.', 'You get a short problem of a firm.'),
                    say('Idatzi funtzioa, deribatu, berdindu zerora eta aukeratu zenbakia.', 'Escribe la función, deriva, iguala a cero y elige el número.', 'اكتب الدالة واشتق وساوِ بالصفر ثم اختر العدد.', 'Write the function, differentiate, set it to zero and pick the number.')
                ],
                create: createOptimizeRounds,
                stars: standardStars(OPTIMIZE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: OptimizePlay
            }}
        />
    )
}
