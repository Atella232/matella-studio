import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './SystemsGames.css'
import { written } from '../../batx1-zientziak-errealak/games/race'
import { KIND_WORDS, type SystemKind } from '../system'
import { createCramerRounds, CRAMER_ROUNDS, NAMES, roundSystem, type CramerRound } from './cramerColumns'
import { createRoucheRounds, ROUCHE_OPTIONS, ROUCHE_ROUNDS, type RoucheRound } from './roucheExpress'

/* ==========================================================================
   Rouché espresa and Cramer, zutabez zutabe (Sistemak, Batxilergoa 2 ·
   Zientziak): rounds with one try each. The first shows the ranks, A* or
   a system with a value of a, and three buttons (no solution, one,
   infinitely many); the second shows a system and asks for the
   determinant of an unknown, or its value, among four.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const starsNote = (rounds: number) => say(`3 izar: ${rounds} · 2 izar: ${rounds - 1} · izar 1: ${Math.ceil(rounds / 2)}`, `3 estrellas: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 نجوم: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 stars: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`)

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

/** The buttons of Rouché express: how many solutions */
const COUNT_WORDS: Record<SystemKind, LocalizedText> = {
    inconsistent: say('Bat ere ez', 'Ninguna', 'لا حل', 'None'),
    determined: say('Bat', 'Una', 'حل واحد', 'One'),
    indeterminate: say('Infinitu', 'Infinitas', 'لا نهائية', 'Infinitely many')
}

/* ---------- Rouché express ---------- */

function RouchePlay({ round, language, onAnswer, answered }: RoundProps<RoucheRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    return (
        <>
            <div className="dbh4-big-formula sys-game-shown" dir="ltr">{round.shown.map((latex) => <span key={latex}>{formula(latex, language)}</span>)}</div>
            <p className="prop3-prompt"><MathText text={l(say('Zenbat soluzio ditu sistemak?', '¿Cuántas soluciones tiene el sistema?', 'كم حلًّا للنظام؟', 'How many solutions does the system have?'))} /></p>
            <div className="prop3-options sys-game-three">
                {ROUCHE_OPTIONS.map((kind, index) => (
                    <button key={kind} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{l(COUNT_WORDS[kind])}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(KIND_WORDS[round.kind])} />. <span className="dbh4-worked">{formula(round.why, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function RoucheExpressGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ROUCHE_ROUNDS,
                rules: [
                    say('Sistema bat ikusiko duzu: heinak, $A^*$ matrizea edo $a$ balio bat.', 'Verás un sistema: los rangos, la matriz $A^*$ o un valor de $a$.', 'سترى نظامًا: الرتب أو المصفوفة $A^*$ أو قيمة لـ $a$.', 'You will see a system: the ranks, the matrix $A^*$ or a value of $a$.'),
                    say('Heinak desberdinak: bat ere ez. Berdinak eta ezezagun kopurua: bat. Berdinak baina txikiagoak: infinitu.', 'Rangos distintos: ninguna. Iguales al número de incógnitas: una. Iguales pero menores: infinitas.', 'رتبتان مختلفتان: لا حل. تساويان عدد المجاهيل: حل واحد. متساويتان وأصغر: لا نهائية.', 'Different ranks: none. Equal to the number of unknowns: one. Equal but smaller: infinitely many.')
                ],
                create: createRoucheRounds,
                stars: standardStars(ROUCHE_ROUNDS),
                starsNote: starsNote(ROUCHE_ROUNDS),
                Round: RouchePlay
            }}
        />
    )
}

/* ---------- Cramer, column by column ---------- */

function CramerPlay({ round, language, onAnswer, answered }: RoundProps<CramerRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const name = NAMES[round.unknown]
    const question = round.level < 2
        ? say(`Zein da $|A_${name}|$?`, `¿Cuál es $|A_${name}|$?`, `ما $|A_${name}|$؟`, `Which is $|A_${name}|$?`)
        : say(`Zenbat da $${name}$?`, `¿Cuánto vale $${name}$?`, `كم يساوي $${name}$؟`, `What is $${name}$?`)
    const value = written(round.value) ?? `\\frac{${round.value.numerator}}{${round.value.denominator}}`
    return (
        <>
            <div className="dbh4-big-formula sys-game-shown" dir="ltr">{formula(roundSystem(round), language)}</div>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="prop3-options sys-game-four" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option.latex, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(say(`$B$ zutabea, $${name}$ ezezagunaren zutabean.`, `La columna $B$ en la columna de $${name}$.`, `العمود $B$ في عمود $${name}$.`, `The column $B$ in the column of $${name}$.`))} /> <span className="dbh4-worked">{formula(`${name}=\\frac{|A_${name}|}{|A|}=${value}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function CramerColumnsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CRAMER_ROUNDS,
                rules: [
                    say('Sistema bat eta ezezagun bat ikusiko dituzu.', 'Verás un sistema y una incógnita.', 'سترى نظامًا ومجهولًا.', 'You will see a system and an unknown.'),
                    say('$|A_x|$ determinantean, $B$ zutabea $x$ ezezagunaren zutabearen lekuan doa; beste guztia, $A$ bezala.', 'En $|A_x|$, la columna $B$ ocupa el lugar de la de $x$; lo demás, como en $A$.', 'في $|A_x|$ يحل العمود $B$ محل عمود $x$؛ والباقي كما في $A$.', 'In $|A_x|$, the column $B$ takes the place of that of $x$; the rest, as in $A$.'),
                    say('3. mailan, ezezagunaren balioa: $\\frac{|A_x|}{|A|}$.', 'En el nivel 3, el valor de la incógnita: $\\frac{|A_x|}{|A|}$.', 'في المستوى 3 قيمة المجهول: $\\frac{|A_x|}{|A|}$.', 'In level 3, the value of the unknown: $\\frac{|A_x|}{|A|}$.')
                ],
                create: createCramerRounds,
                stars: standardStars(CRAMER_ROUNDS),
                starsNote: starsNote(CRAMER_ROUNDS),
                Round: CramerPlay
            }}
        />
    )
}
