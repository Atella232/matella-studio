import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './DeterminantsGames.css'
import { createWhatRounds, optionLatex, WHAT_ROUNDS, type WhatRound } from './whatHappens'
import { createZeroRounds, relationLatex, ZERO_ROUNDS, zeroWhy, type ZeroRound } from './zeroOrNot'

/* ==========================================================================
   Zer gertatzen zaio determinanteari? and Zero, kalkulatu gabe?
   (Determinanteak, Batxilergoa 2 · Zientziak): rounds with four options
   and one try each. The first shows what is known and what is asked, and
   four values; the second shows a 3 × 3 determinant and four statements
   about its rows.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const starsNote = (rounds: number) => say(`3 izar: ${rounds} · 2 izar: ${rounds - 1} · izar 1: ${Math.ceil(rounds / 2)}`, `3 estrellas: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 نجوم: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`, `3 stars: ${rounds} · 2: ${rounds - 1} · 1: ${Math.ceil(rounds / 2)}`)

/** Picks one option, once, and remembers which */
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

/* ---------- What happens to the determinant? ---------- */

function WhatPlay({ round, language, onAnswer, answered }: RoundProps<WhatRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const right = optionLatex(round.options[round.answer])
    return (
        <>
            <div className="det-game-given" dir="ltr">{formula(round.given, language)}</div>
            <p className="prop3-prompt"><MathText text={l(say(`Zenbat da $${round.asked}$?`, `¿Cuánto vale $${round.asked}$?`, `كم يساوي $${round.asked}$؟`, `What is $${round.asked}$?`))} /></p>
            <div className="prop3-options det-game-values" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(optionLatex(option), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(round.why)} /> <span className="dbh4-worked">{formula(`${round.asked}=${right}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function WhatHappensGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHAT_ROUNDS,
                rules: [
                    say('$|A|$ ezagutzen duzu, eta matrizeari zerbait egiten zaio.', 'Conoces $|A|$ y a la matriz le hacen algo.', 'تعرف $|A|$ ويُجرى شيء على المصفوفة.', 'You know $|A|$ and something is done to the matrix.'),
                    say('Aukeratu determinante berria, propietateak erabiliz: ez da kalkulatu behar.', 'Elige el nuevo determinante usando las propiedades: no hace falta calcular.', 'اختر المحدد الجديد باستعمال الخواص: لا حاجة إلى الحساب.', 'Choose the new determinant using the properties: no working out needed.'),
                    say('$n$ matrizearen ordena da.', '$n$ es el orden de la matriz.', '$n$ رتبة المصفوفة.', '$n$ is the order of the matrix.')
                ],
                create: createWhatRounds,
                stars: standardStars(WHAT_ROUNDS),
                starsNote: starsNote(WHAT_ROUNDS),
                Round: WhatPlay
            }}
        />
    )
}

/* ---------- Zero without working it out? ---------- */

const matrixOf = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`

function ZeroPlay({ round, language, onAnswer, answered }: RoundProps<ZeroRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const right = round.options[round.answer]
    return (
        <>
            <div className="dbh4-big-formula det-game-matrix" dir="ltr">{formula(`|A|=${matrixOf(round.rows)}`, language)}</div>
            <p className="prop3-prompt"><MathText text={l(say('Zein da egia? Bakarra da.', '¿Qué es cierto? Solo una cosa.', 'ما الصحيح؟ شيء واحد فقط.', 'Which is true? Only one thing.'))} /></p>
            <div className="prop3-options det-game-relations" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(relationLatex(option), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {right === null
                        ? <><MathText text={l(zeroWhy.trap)} /> <span className="dbh4-worked">{formula(`|A|=${round.value}`, language)}</span></>
                        : <><MathText text={l(zeroWhy.zero)} /> <span className="dbh4-worked">{formula(`${relationLatex(right)}\\ \\to\\ |A|=0`, language)}</span></>}
                </RoundVerdict>
            )}
        </>
    )
}

export function ZeroGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ZERO_ROUNDS,
                rules: [
                    say('Determinante bat eta lau esaldi: bakarra da egia.', 'Un determinante y cuatro frases: solo una es cierta.', 'محدد وأربع عبارات: واحدة فقط صحيحة.', 'A determinant and four statements: only one is true.'),
                    say('$E_3=2E_1$ esaldiak esan nahi du 3. errenkada 1. errenkadaren bikoitza dela. Orduan, $|A|=0$.', '$E_3=2E_1$ quiere decir que la fila 3 es el doble de la 1. Entonces $|A|=0$.', '$E_3=2E_1$ تعني أن الصف 3 ضعف الصف 1. عندئذٍ $|A|=0$.', '$E_3=2E_1$ means that row 3 is twice row 1. Then $|A|=0$.'),
                    say('Kontuz tranpekin: zenbaki bakar batek hautsi dezake erlazioa.', 'Cuidado con las trampas: un solo número puede romper la relación.', 'احذر الفخاخ: عدد واحد قد يكسر العلاقة.', 'Watch out for traps: a single number can break the relation.')
                ],
                create: createZeroRounds,
                stars: standardStars(ZERO_ROUNDS),
                starsNote: starsNote(ZERO_ROUNDS),
                Round: ZeroPlay
            }}
        />
    )
}
