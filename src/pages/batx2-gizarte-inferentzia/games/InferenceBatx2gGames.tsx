import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games.css'
import { BACKWARDS_ROUNDS, createBackwardsRounds, type BackwardsRound } from './backwards'
import { createTruthRounds, TRUTH_ROUNDS, type TruthRound } from './truth'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — the two round games of
   this unit: true or false? (a sentence about an interval) and from the
   interval to the data (three values to choose from). Logic in truth.ts
   and backwards.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/* ---------- True or false? ---------- */

function TruthPlay({ round, language, onAnswer, answered }: RoundProps<TruthRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<boolean | null>(null)
    const choose = (value: boolean) => {
        if (answered) return
        setPicked(value)
        onAnswer(value === round.truth)
    }
    return (
        <>
            {round.context && <p className="prob2-question"><MathText text={l(round.context)} /></p>}
            <p className="prob2-question"><MathText text={l(round.sentence)} /></p>
            <div className="prop3-options prob2-machines prob2-machines-2">
                {[true, false].map((value) => (
                    <button key={String(value)} type="button" disabled={answered} className={choiceClass(answered, value === round.truth, value === picked)} onClick={() => choose(value)}>{l(value ? say('Egia', 'Verdadero', 'صحيح', 'True') : say('Gezurra', 'Falso', 'خطأ', 'False'))}</button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.truth} language={language}><span><MathText text={l(round.why)} /></span></RoundVerdict>}
        </>
    )
}

export function TruthGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TRUTH_ROUNDS,
                rules: [
                    say('$\\mu$ finkoa da; tartea da lagin batetik bestera aldatzen dena.', '$\\mu$ es fijo; lo que cambia de una muestra a otra es el intervalo.', '$\\mu$ ثابت؛ والذي يتغير من عيّنة إلى أخرى هو الفترة.', '$\\mu$ is fixed; what changes from one sample to another is the interval.'),
                    say('Maila gehiago: tarte zabalagoa. $n$ gehiago: tarte estuagoa.', 'Más nivel: intervalo más ancho. Más $n$: intervalo más estrecho.', 'مستوى أعلى: فترة أعرض. $n$ أكبر: فترة أضيق.', 'A higher level: a wider interval. A bigger $n$: a narrower interval.'),
                    say('3. mailan, $\\bar{x}$ erdiko puntua da eta $E$ zabaleraren erdia.', 'En el nivel 3, $\\bar{x}$ es el punto medio y $E$ la mitad de la anchura.', 'في المستوى 3، $\\bar{x}$ المنتصف و$E$ نصف العرض.', 'In level 3, $\\bar{x}$ is the midpoint and $E$ half the width.')
                ],
                create: createTruthRounds,
                stars: standardStars(TRUTH_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: TruthPlay
            }}
        />
    )
}

/* ---------- From the interval to the data ---------- */

function BackwardsPlay({ round, language, onAnswer, answered }: RoundProps<BackwardsRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const choose = (option: string) => {
        if (answered) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    return (
        <>
            <p className="prob2-question"><MathText text={l(round.prompt)} /></p>
            <div className="prop3-options prob2-three">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={choiceClass(answered, option === round.answer, option === picked)} onClick={() => choose(option)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.work, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function BackwardsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BACKWARDS_ROUNDS,
                rules: [
                    say('$(a;\\ b)$ tartean: $\\bar{x}=\\frac{a+b}{2}$ eta $E=\\frac{b-a}{2}$.', 'En $(a;\\ b)$: $\\bar{x}=\\frac{a+b}{2}$ y $E=\\frac{b-a}{2}$.', 'في $(a;\\ b)$: $\\bar{x}=\\frac{a+b}{2}$ و$E=\\frac{b-a}{2}$.', 'In $(a;\\ b)$: $\\bar{x}=\\frac{a+b}{2}$ and $E=\\frac{b-a}{2}$.'),
                    say('$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: askatu falta dena.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: despeja lo que falte.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: استخرج الناقص.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: solve for what is missing.'),
                    say('Balio kritikoa ezagututa, maila taulatik ateratzen da.', 'Con el valor crítico, el nivel sale de la tabla.', 'بمعرفة القيمة الحرجة يخرج المستوى من الجدول.', 'From the critical value, the level comes out of the table.')
                ],
                create: createBackwardsRounds,
                stars: standardStars(BACKWARDS_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: BackwardsPlay
            }}
        />
    )
}
