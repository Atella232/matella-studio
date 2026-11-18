import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-matrizeak/games/MatricesGames.css'
import '../../batx2-zientziak-sistemak/games/SystemsGames.css'
import { objectiveLatex, optimum, pointLatex, systemLatex, vertices, withSigns, type SolutionKind } from '../lp'
import {
    createExpressRounds, createKindRounds, createVertexRounds, EXPRESS_ROUNDS, KIND_OPTIONS, KIND_ROUNDS, VERTEX_ROUNDS, type ExpressRound, type KindRound, type VertexRound
} from './rounds'

/* ==========================================================================
   Zein erpinek irabazten du?, Murrizketa azkarra and Bakarra, anitza ala
   bat ere ez? (Programazio lineala, Batxilergoa 2 · Gizarte Zientziak):
   rounds with one try each. Logic in rounds.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const starsNote = (rounds: number) => say(`3 izar: ${rounds} · 2 izar: ${rounds - 1} · izar 1: ${Math.ceil(rounds / 2)}`, `3 estrellas: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 نجوم: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 stars: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`)
const ONLY_ONE = say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')

function usePick(onAnswer: (right: boolean) => void, answer: number, answered: boolean) {
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === answer)
    }
    const state = (index: number) => (!answered ? '' : index === answer ? 'right' : index === picked ? 'wrong' : '')
    return { picked, choose, state }
}

const GOAL_WORD = { max: say('Maximizatu', 'Maximiza', 'عظّم', 'Maximise'), min: say('Minimizatu', 'Minimiza', 'صغّر', 'Minimise') }

/* ---------- Which vertex wins? ---------- */

function VertexPlay({ round, language, onAnswer, answered }: RoundProps<VertexRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <div className="dbh4-big-formula sys-game-shown" dir="ltr">{formula(systemLatex(round.constraints), language)}</div>
            <p className="prop3-prompt"><MathText text={`${l(GOAL_WORD[round.goal])} $${objectiveLatex(round.objective)}$ ($x,y\\ge 0$).`} /></p>
            <div className="prop3-options" dir="ltr">
                {round.options.map((point, index) => (
                    <button key={point.join()} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(pointLatex(point), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.options.map((point, index) => `F${pointLatex(point)}=${round.values[index]}`).join(',\\ '), language)}</span>
                    {round.goal === 'min' && <> <MathText text={l(say('$(0,0)$ ez dago eskualdean.', '$(0,0)$ no está en la región.', '$(0,0)$ ليست في المنطقة.', '$(0,0)$ is not in the region.'))} /></>}
                </RoundVerdict>
            )}
        </>
    )
}

export function WhichVertexGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: VERTEX_ROUNDS,
                rules: [
                    say('Eskualde baten murrizketak eta $F$ funtzioa ikusiko dituzu.', 'Verás las restricciones de una región y la función $F$.', 'سترى قيود منطقة والدالة $F$.', 'You will see the constraints of a region and the function $F$.'),
                    say('Aukeratu optimoa ematen duen erpina. Kontuz: puntu batzuk ez daude eskualdean.', 'Elige el vértice que da el óptimo. Ojo: algún punto no está en la región.', 'اختر الرأس الذي يعطي القيمة المثلى. انتبه: بعض النقاط ليست في المنطقة.', 'Choose the vertex that gives the optimum. Careful: some point is not in the region.'),
                    ONLY_ONE
                ],
                create: createVertexRounds,
                stars: standardStars(VERTEX_ROUNDS),
                starsNote: starsNote(VERTEX_ROUNDS),
                Round: VertexPlay
            }}
        />
    )
}

/* ---------- Constraint express ---------- */

function ExpressPlay({ round, language, onAnswer, answered }: RoundProps<ExpressRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <p className="prop3-prompt"><MathText text={`«${l(round.sentence)}»`} /></p>
            <p className="sys-game-letters"><MathText text={l(round.letters)} /></p>
            <div className="prop3-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.right, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function ExpressGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: EXPRESS_ROUNDS,
                rules: [
                    say('«Gehienez» edo «ez du gainditzen» $\\le$ da; «gutxienez», $\\ge$.', '«Como mucho» o «no supera» es $\\le$; «al menos», $\\ge$.', '«على الأكثر» أو «لا يتجاوز» هي $\\le$؛ و«على الأقل» هي $\\ge$.', '«At most» or «does not exceed» is $\\le$; «at least» is $\\ge$.'),
                    say('Begiratu koefiziente bakoitza bere aldagaiarekin doala.', 'Mira que cada coeficiente vaya con su variable.', 'تأكد أن كل معامل مع متغيره.', 'Check that each coefficient goes with its variable.'),
                    ONLY_ONE
                ],
                create: createExpressRounds,
                stars: standardStars(EXPRESS_ROUNDS),
                starsNote: starsNote(EXPRESS_ROUNDS),
                Round: ExpressPlay
            }}
        />
    )
}

/* ---------- Unique, multiple or none? ---------- */

const KIND_WORDS: Record<SolutionKind, LocalizedText> = {
    unique: say('Bakarra', 'Única', 'وحيد', 'Unique'),
    multiple: say('Anitza', 'Múltiple', 'متعدد', 'Multiple'),
    unbounded: say('Optimorik gabe', 'Sin óptimo', 'بلا قيمة مثلى', 'No optimum'),
    empty: say('Eskualde hutsa', 'Región vacía', 'منطقة خالية', 'Empty region')
}

function KindPlay({ round, language, onAnswer, answered }: RoundProps<KindRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const points = vertices(withSigns(round.constraints))
    const found = optimum(withSigns(round.constraints), round.objective, round.goal)
    return (
        <>
            <div className="dbh4-big-formula sys-game-shown" dir="ltr">{formula(systemLatex(round.constraints), language)}</div>
            <p className="prop3-prompt"><MathText text={`${l(GOAL_WORD[round.goal])} $${objectiveLatex(round.objective)}$ ($x,y\\ge 0$).`} /></p>
            <div className="prop3-options">
                {KIND_OPTIONS.map((kind, index) => (
                    <button key={kind} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{l(KIND_WORDS[kind])}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {points.length
                        ? <span className="dbh4-worked">{formula(points.map((point) => `F${pointLatex(point)}=${round.objective.a * point[0] + round.objective.b * point[1]}`).join(',\\ '), language)}</span>
                        : <MathText text={l(say('Ez dago murrizketa guztiak betetzen dituen punturik.', 'Ningún punto cumple todas las restricciones.', 'لا توجد نقطة تحقق كل القيود.', 'No point satisfies every constraint.'))} />}
                    {found.kind === 'unbounded' && <> <MathText text={l(say('Eskualdea ez da ixten $F$ handitzen den aldean.', 'La región no se cierra hacia donde crece $F$.', 'لا تنغلق المنطقة في الجهة التي تكبر فيها $F$.', 'The region does not close where $F$ grows.'))} /></>}
                </RoundVerdict>
            )}
        </>
    )
}

export function SolutionKindGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: KIND_ROUNDS,
                rules: [
                    say('Bakarra: erpin batean. Anitza: bi erpinek balio bera.', 'Única: en un vértice. Múltiple: dos vértices empatan.', 'وحيد: عند رأس. متعدد: يتعادل رأسان.', 'Unique: at one vertex. Multiple: two vertices tie.'),
                    say('Optimorik gabe: eskualdea ez da ixten $F$ hobetzen den aldean. Hutsa: ez dago punturik.', 'Sin óptimo: la región no se cierra hacia donde mejora $F$. Vacía: no hay puntos.', 'بلا قيمة مثلى: لا تنغلق المنطقة حيث تتحسن $F$. خالية: لا توجد نقاط.', 'No optimum: the region does not close where $F$ improves. Empty: there are no points.'),
                    ONLY_ONE
                ],
                create: createKindRounds,
                stars: standardStars(KIND_ROUNDS),
                starsNote: starsNote(KIND_ROUNDS),
                Round: KindPlay
            }}
        />
    )
}
