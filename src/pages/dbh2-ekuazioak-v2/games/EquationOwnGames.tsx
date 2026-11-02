import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { createEquationDetectiveCases, EQUATION_DETECTIVE_CASES, equationDetectiveNames, equationDetectiveTips } from './detective'
import { EquationsGameArt } from './GameArt'
import { equationsGames, type EquationsGameId } from './info'
import { createPoseRounds, POSE_ROUNDS, poseStars, type PoseRound } from './pose'
import './OwnGames.css'

/* ==========================================================================
   The games of Ekuazioak 2. DBH that belong to this topic, besides the
   quick solving: pose the equation (in the shared RoundGame) and the
   equations detective (the shared worked-solution detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: EquationsGameId) => equationsGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />

/* ---------- Pose the equation ---------- */

function PosePlay({ round, language, onAnswer, answered }: RoundProps<PoseRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.right)
    }
    return (
        <>
            <p className="prop3-prompt eq2-problem">{l(round.text)}</p>
            <div className="prop3-options eq2-equations" role="group" aria-label={l(say('Ekuazioak', 'Ecuaciones', 'المعادلات', 'Equations'))}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : index === round.right ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.right} language={language}>
                    {formula(`x=${round.x}`, language)}{' '}
                    {l(say('Egiaztapena:', 'Comprobación:', 'التحقق:', 'Check:'))} {formula(round.check, language)}{' '}
                    {l(round.answer)}
                </RoundVerdict>
            )}
        </>
    )
}

const poseConfig: RoundGameConfig<PoseRound> = {
    game: info('pose'),
    art: <EquationsGameArt game="pose" />,
    rounds: POSE_ROUNDS,
    rules: [
        say('Irakurri buruketa eta aukeratu esaten duena idazten duen ekuazioa.', 'Lee el problema y elige la ecuación que dice lo mismo.', 'اقرأ المسألة واختر المعادلة التي تقول الشيء نفسه.', 'Read the problem and choose the equation that says the same thing.'),
        say('Kontuz parentesiekin, ondoz ondoko zenbakiekin eta perimetroekin: aukera okerrek akats tipikoak dituzte.', 'Cuidado con los paréntesis, los consecutivos y los perímetros: las opciones malas llevan errores típicos.', 'انتبه للأقواس والأعداد المتتالية والمحيطات: الخيارات الخاطئة فيها أخطاء شائعة.', 'Watch out for brackets, consecutive numbers and perimeters: the wrong options carry typical mistakes.'),
        say(`${POSE_ROUNDS} buruketa maila bakoitzean; saiakera bat bakoitzeko.`, `${POSE_ROUNDS} problemas por nivel; un intento en cada uno.`, `${POSE_ROUNDS} مسائل في كل مستوى؛ محاولة واحدة لكل مسألة.`, `${POSE_ROUNDS} problems per level; one try each.`)
    ],
    create: createPoseRounds,
    stars: poseStars,
    starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
    Round: PosePlay
}

export const PoseGame = (props: GameProps) => <RoundGame {...props} config={poseConfig} />

/* ---------- The equations detective ---------- */

export const EquationDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <EquationsGameArt game="detective" />, cases: EQUATION_DETECTIVE_CASES, createCases: createEquationDetectiveCases, names: equationDetectiveNames, tips: equationDetectiveTips }}
    />
)
