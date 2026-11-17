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
import { createQuickRounds, QUICK_ROUNDS, quickLatex, type QuickRound } from './quickCofactor'
import { createUniqueRounds, UNIQUE_ROUNDS, uniqueLatex, type UniqueRound, type VerdictOption } from './uniquePrices'

/* ==========================================================================
   Prezio bakarrak? and Adjuntu azkarra (Determinanteak, Batxilergoa 2 ·
   Gizarte Zientziak): rounds with four options and one try each. The
   first shows the quantities of some bundles and asks whether the prices
   can be found (or for which a they cannot); the second, one cofactor or
   one entry of the inverse.
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

/* ---------- Unique prices? ---------- */

const verdictText = (option: VerdictOption): LocalizedText => (option.found
    ? say(`Bai: $|A|=${option.value}$`, `Sí: $|A|=${option.value}$`, `نعم: $|A|=${option.value}$`, `Yes: $|A|=${option.value}$`)
    : say('Ez: $|A|=0$', 'No: $|A|=0$', 'لا: $|A|=0$', 'No: $|A|=0$'))

const UNIQUE_QUESTION = {
    verdict: say('Errenkada bakoitza sorta bat da. Sorten prezioak jakinda, ondoriozta al daitezke produktuen prezioak?', 'Cada fila es un lote. Sabiendo lo que cuestan los lotes, ¿se pueden deducir los precios de los productos?', 'كل صف مجموعة. إذا عرفنا ثمن المجموعات، هل يمكن استنتاج أسعار المنتجات؟', 'Each row is a bundle. Knowing what the bundles cost, can the prices of the products be found?'),
    parameter: say('Errenkada bakoitza sorta bat da. Zein $a$ baliotarako ezin dira prezioak ondorioztatu?', 'Cada fila es un lote. ¿Para qué $a$ no se pueden deducir los precios?', 'كل صف مجموعة. لأي $a$ لا يمكن استنتاج الأسعار؟', 'Each row is a bundle. For which $a$ can the prices not be found?')
}

function UniquePlay({ round, language, onAnswer, answered }: RoundProps<UniqueRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const options = round.level === 2 ? round.values.map((value) => `$a=${value}$`) : round.verdicts.map((option) => l(verdictText(option)))
    return (
        <>
            <div className="dbh4-big-formula mat-equation" dir="ltr">{formula(uniqueLatex(round), language)}</div>
            <p className="prop3-prompt"><MathText text={l(round.level === 2 ? UNIQUE_QUESTION.parameter : UNIQUE_QUESTION.verdict)} /></p>
            <div className="prop3-options">
                {options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}><MathText text={option} /></button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.worked, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function UniquePricesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: UNIQUE_ROUNDS,
                rules: [
                    say('$A$ matrizean, errenkada bakoitza sorta bat da: produktu bakoitzetik zenbat dakarren.', 'En $A$, cada fila es un lote: cuánto trae de cada producto.', 'في $A$ كل صف مجموعة: كم فيها من كل منتج.', 'In $A$, each row is a bundle: how much it has of each product.'),
                    say('$|A|\\neq 0$ bada, prezioak bakarrak dira; $|A|=0$ bada, ezin dira ondorioztatu.', 'Si $|A|\\neq 0$, los precios son únicos; si $|A|=0$, no se pueden deducir.', 'إذا كان $|A|\\neq 0$ فالأسعار وحيدة؛ وإذا كان $|A|=0$ فلا يمكن استنتاجها.', 'If $|A|\\neq 0$, the prices are unique; if $|A|=0$, they cannot be found.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createUniqueRounds,
                stars: standardStars(UNIQUE_ROUNDS),
                starsNote: starsNote(UNIQUE_ROUNDS),
                Round: UniquePlay
            }}
        />
    )
}

/* ---------- Quick cofactor ---------- */

function QuickPlay({ round, language, onAnswer, answered }: RoundProps<QuickRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const i = round.row + 1
    const j = round.column + 1
    const question = round.level === 0
        ? say(`Zenbat da $A_{${i}${j}}$ adjuntua (laukitxoko elementuarena)?`, `¿Cuánto vale el adjunto $A_{${i}${j}}$ (el del elemento recuadrado)?`, `كم يساوي المتمم الجبري $A_{${i}${j}}$ (للعنصر المؤطَّر)؟`, `What is the cofactor $A_{${i}${j}}$ (of the boxed entry)?`)
        : say(`$|A|=${round.det}$. Zenbat da $A^{-1}$ matrizearen $(${i},${j})$ elementua?`, `$|A|=${round.det}$. ¿Cuánto vale el elemento $(${i},${j})$ de $A^{-1}$?`, `$|A|=${round.det}$. كم يساوي العنصر $(${i},${j})$ من $A^{-1}$؟`, `$|A|=${round.det}$. What is the entry $(${i},${j})$ of $A^{-1}$?`)
    return (
        <>
            <div className="dbh4-big-formula mat-equation" dir="ltr">{formula(quickLatex(round), language)}</div>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="prop3-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.worked, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function QuickCofactorGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: QUICK_ROUNDS,
                rules: [
                    say('$A_{ij}$: ezabatu $i$ errenkada eta $j$ zutabea, eta jarri $(-1)^{i+j}$ zeinua.', '$A_{ij}$: tacha la fila $i$ y la columna $j$, y pon el signo $(-1)^{i+j}$.', '$A_{ij}$: احذف الصف $i$ والعمود $j$ وضع الإشارة $(-1)^{i+j}$.', '$A_{ij}$: strike out row $i$ and column $j$, and put the sign $(-1)^{i+j}$.'),
                    say('$A^{-1}$ matrizearen $(i,j)$ elementua $A_{ji}$ da, $|A|$ zenbakiaz zatituta: iraulita.', 'El elemento $(i,j)$ de $A^{-1}$ es $A_{ji}$ dividido entre $|A|$: traspuesto.', 'العنصر $(i,j)$ من $A^{-1}$ هو $A_{ji}$ مقسومًا على $|A|$: منقولًا.', 'Entry $(i,j)$ of $A^{-1}$ is $A_{ji}$ divided by $|A|$: transposed.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createQuickRounds,
                stars: standardStars(QUICK_ROUNDS),
                starsNote: starsNote(QUICK_ROUNDS),
                Round: QuickPlay
            }}
        />
    )
}
