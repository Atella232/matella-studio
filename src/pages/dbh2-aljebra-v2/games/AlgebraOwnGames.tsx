import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { ALGEBRA_DETECTIVE_CASES, algebraDetectiveNames, algebraDetectiveTips, createAlgebraDetectiveCases } from './detective'
import { AlgebraGameArt } from './GameArt'
import { algebraGames, type AlgebraGameId } from './info'
import { createPyramidRounds, monomialLatex, PYRAMID_ROUNDS, pyramidSolved, pyramidStars, type PyramidRound } from './pyramid'
import './OwnGames.css'

/* ==========================================================================
   The games of Adierazpen aljebraikoak 2. DBH that belong to this topic,
   besides the quick expansion: the pyramid of monomials (in the shared
   RoundGame) and the algebra detective (the shared worked-solution
   detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: AlgebraGameId) => algebraGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />

/* ---------- The pyramid of monomials ---------- */

const ROWS = [[5], [3, 4], [0, 1, 2]]

const RULES: Record<PyramidRound['operation'], LocalizedText> = {
    sum: say('Antzekoak batzeko, koefizienteak batzen dira eta berretzailea ez da aldatzen: $3x^{2}+2x^{2}=5x^{2}$. Behera joateko, kendu.', 'Para sumar semejantes se suman los coeficientes y el exponente no cambia: $3x^{2}+2x^{2}=5x^{2}$. Para bajar, se resta.', 'لجمع المتشابهة تُجمع المعاملات ولا يتغيّر الأس: $3x^{2}+2x^{2}=5x^{2}$. وللنزول نطرح.', 'To add like terms, add the coefficients and keep the exponent: $3x^{2}+2x^{2}=5x^{2}$. To go down, subtract.'),
    product: say('Biderkatzeko, koefizienteak biderkatu eta berretzaileak batu: $2x\\cdot 3x^{2}=6x^{3}$. Behera joateko, zatitu: koefizienteak zatitu eta berretzaileak kendu.', 'Para multiplicar, se multiplican los coeficientes y se suman los exponentes: $2x\\cdot 3x^{2}=6x^{3}$. Para bajar, se divide: coeficientes entre coeficientes y exponentes restados.', 'للضرب نضرب المعاملات ونجمع الأسس: $2x\\cdot 3x^{2}=6x^{3}$. وللنزول نقسم: المعامل على المعامل ونطرح الأسس.', 'To multiply, multiply the coefficients and add the exponents: $2x\\cdot 3x^{2}=6x^{3}$. To go down, divide: coefficient by coefficient, subtracting the exponents.')
}

function PyramidPlay({ round, language, onAnswer, answered }: RoundProps<PyramidRound>) {
    const l = useGameText(language)
    /** Card index placed on each empty brick */
    const [placed, setPlaced] = useState<Record<number, number | undefined>>({})
    const [selected, setSelected] = useState<number>(round.hidden[0])
    const used = new Set(Object.values(placed).filter((card) => card !== undefined))
    const full = round.hidden.every((brick) => placed[brick] !== undefined)
    const right = pyramidSolved(round, placed)

    const nextEmpty = (current: Record<number, number | undefined>) => round.hidden.find((brick) => current[brick] === undefined)
    const place = (card: number) => {
        if (answered || used.has(card)) return
        const brick = placed[selected] === undefined ? selected : nextEmpty(placed)
        if (brick === undefined) return
        const next = { ...placed, [brick]: card }
        setPlaced(next)
        setSelected(nextEmpty(next) ?? brick)
    }
    const tapBrick = (brick: number) => {
        if (answered || !round.hidden.includes(brick)) return
        if (placed[brick] !== undefined) setPlaced({ ...placed, [brick]: undefined })
        setSelected(brick)
    }

    return (
        <>
            <p className="prop3-prompt">
                {round.operation === 'sum'
                    ? l(say('Adreilu bakoitza azpiko bien batura da.', 'Cada ladrillo es la suma de los dos de debajo.', 'كل لبنة مجموع اللبنتين تحتها.', 'Each brick is the sum of the two below it.'))
                    : l(say('Adreilu bakoitza azpiko bien biderkadura da.', 'Cada ladrillo es el producto de los dos de debajo.', 'كل لبنة جداء اللبنتين تحتها.', 'Each brick is the product of the two below it.'))}
            </p>
            <div className="alg2-pyramid" dir="ltr" role="group" aria-label={l(say('Piramidea', 'La pirámide', 'الهرم', 'The pyramid'))}>
                {ROWS.map((row) => (
                    <div key={row[0]} className="alg2-pyramid-row">
                        {row.map((brick) => {
                            const hidden = round.hidden.includes(brick)
                            const card = placed[brick]
                            const mark = !hidden ? 'given' : answered ? (card !== undefined && round.cards[card].latex === monomialLatex(round.bricks[brick]) ? 'right' : 'wrong') : `${card !== undefined ? 'filled' : 'empty'}${brick === selected ? ' selected' : ''}`
                            return (
                                <button key={brick} type="button" className={`alg2-brick ${mark}`} disabled={!hidden || answered} aria-pressed={hidden && !answered ? brick === selected : undefined} onClick={() => tapBrick(brick)}>
                                    {!hidden ? formula(monomialLatex(round.bricks[brick]), language) : card !== undefined ? formula(round.cards[card].latex, language) : <span aria-hidden="true">?</span>}
                                    {mark === 'wrong' && <small>{formula(monomialLatex(round.bricks[brick]), language)}</small>}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className="prop3-options alg2-cards" role="group" aria-label={l(say('Monomioak', 'Monomios', 'وحيدات الحد', 'Monomials'))}>
                {round.cards.map((card, index) => (
                    <button key={index} type="button" disabled={answered || used.has(index)} className={answered && card.brick !== null ? 'right' : ''} onClick={() => place(index)}>
                        {formula(card.latex, language)}
                    </button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={!full} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(RULES[round.operation])} inline /></RoundVerdict>}
        </>
    )
}

const pyramidConfig: RoundGameConfig<PyramidRound> = {
    game: info('pyramid'),
    art: <AlgebraGameArt game="pyramid" />,
    rounds: PYRAMID_ROUNDS,
    rules: [
        say('Adreilu bakoitza azpiko bi adreiluen batura edo biderkadura da.', 'Cada ladrillo es la suma o el producto de los dos ladrillos de debajo.', 'كل لبنة مجموع اللبنتين تحتها أو جداؤهما.', 'Each brick is the sum or the product of the two bricks below it.'),
        say('Sakatu adreilu huts bat eta gero bere monomioa. Txartel batzuek akats tipikoak dituzte.', 'Toca un ladrillo vacío y luego su monomio. Algunas cartas llevan errores típicos.', 'المس لبنة فارغة ثم وحيدة حدها. بعض البطاقات فيها أخطاء شائعة.', 'Tap an empty brick and then its monomial. Some cards carry typical mistakes.'),
        say(`${PYRAMID_ROUNDS} piramide maila bakoitzean; saiakera bat bakoitzeko.`, `${PYRAMID_ROUNDS} pirámides por nivel; un intento en cada una.`, `${PYRAMID_ROUNDS} أهرامات في كل مستوى؛ محاولة واحدة لكل هرم.`, `${PYRAMID_ROUNDS} pyramids per level; one try each.`)
    ],
    create: createPyramidRounds,
    stars: pyramidStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: PyramidPlay
}

export const PyramidGame = (props: GameProps) => <RoundGame {...props} config={pyramidConfig} />

/* ---------- The algebra detective ---------- */

export const AlgebraDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <AlgebraGameArt game="detective" />, cases: ALGEBRA_DETECTIVE_CASES, createCases: createAlgebraDetectiveCases, names: algebraDetectiveNames, tips: algebraDetectiveTips }}
    />
)
