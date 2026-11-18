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
import { KIND_WORDS, type SystemKind } from '../../batx2-zientziak-sistemak/system'
import { BUSINESS_OPTIONS, BUSINESS_ROUNDS, businessLatex, createBusinessRounds, type BusinessRound } from './business'
import { createTranslateRounds, TRANSLATE_ROUNDS, type TranslateRound } from './translate'

/* ==========================================================================
   Zenbat soluzio ditu negozioak? and Itzuli esaldia (Sistemak,
   Batxilergoa 2 · Gizarte Zientziak): rounds with one try each. The first
   shows the A* of some bundles and asks how many sets of prices fit (or,
   in its last level, the price that makes them fit); the second, one
   sentence of a problem and four equations.
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

/* ---------- How many solutions does the business have? ---------- */

const COUNT_WORDS: Record<SystemKind, LocalizedText> = {
    inconsistent: say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'),
    determined: say('Bat', 'Uno', 'واحدة', 'One'),
    indeterminate: say('Infinitu', 'Infinitos', 'لا نهائية', 'Infinitely many')
}

function BusinessPlay({ round, language, onAnswer, answered }: RoundProps<BusinessRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(onAnswer, round.answer, answered)
    const priced = round.level === 2
    return (
        <>
            <div className="dbh4-big-formula sys-game-shown" dir="ltr">{formula(`A^*=${businessLatex(round)}`, language)}</div>
            <p className="prop3-prompt"><MathText text={l(priced
                ? say('3. sorta beste bien batura da. Zenbat balio behar du datuak bat etortzeko?', 'El lote 3 es la suma de los otros dos. ¿Cuánto debe costar para que los datos cuadren?', 'المجموعة 3 مجموع الأخريين. كم يجب أن تكلّف لكي تتوافق المعطيات؟', 'Bundle 3 is the sum of the other two. How much must it cost for the data to fit?')
                : say('Errenkada bat sorta bakoitzeko, eta azken zutabean haren prezioa. Zenbat prezio-multzo datoz bat?', 'Una fila por lote y, en la última columna, lo que cuesta. ¿Cuántos juegos de precios cuadran?', 'صف لكل مجموعة وفي العمود الأخير ثمنها. كم مجموعة أسعار تتوافق؟', 'One row per bundle and, in the last column, what it costs. How many sets of prices fit?'))} /></p>
            {priced ? (
                <div className="prop3-options" dir="ltr">
                    {round.values.map((value, index) => (
                        <button key={value} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{value}</button>
                    ))}
                </div>
            ) : (
                <div className="prop3-options sys-game-three">
                    {BUSINESS_OPTIONS.map((kind, index) => (
                        <button key={kind} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{l(COUNT_WORDS[kind])}</button>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {priced
                        ? <span className="dbh4-worked">{formula(`${round.totals[0]}+${round.totals[1]}=${round.totals[0] + round.totals[1]}`, language)}</span>
                        : <><MathText text={l(KIND_WORDS[round.kind])} />. <span className="dbh4-worked">{formula(`\\operatorname{rg}(A)=${round.rankA},\\ \\operatorname{rg}(A^*)=${round.rankAugmented}`, language)}</span></>}
                </RoundVerdict>
            )}
        </>
    )
}

export function BusinessGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BUSINESS_ROUNDS,
                rules: [
                    say('Errenkada bakoitza sorta bat da; azken zutabean, haren prezioa.', 'Cada fila es un lote; en la última columna, lo que cuesta.', 'كل صف مجموعة؛ وفي العمود الأخير ثمنها.', 'Each row is a bundle; in the last column, what it costs.'),
                    say('$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: bat ere ez. Berdinak eta produktu-kopurua: bat. Berdinak eta txikiagoak: infinitu.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: ninguno. Iguales al número de productos: uno. Iguales y menores: infinitos.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: لا شيء. متساويتان مع عدد المنتجات: واحدة. متساويتان وأصغر: لا نهائية.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: none. Equal to the number of products: one. Equal and smaller: infinitely many.'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createBusinessRounds,
                stars: standardStars(BUSINESS_ROUNDS),
                starsNote: starsNote(BUSINESS_ROUNDS),
                Round: BusinessPlay
            }}
        />
    )
}

/* ---------- Translate the sentence ---------- */

function TranslatePlay({ round, language, onAnswer, answered }: RoundProps<TranslateRound>) {
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
                    <span className="dbh4-worked">{formula(round.right, language)}</span> <MathText text={l(say('Egiaztatu:', 'Comprueba:', 'تحقق:', 'Check:'))} /> <span className="dbh4-worked">{formula(Object.entries(round.sample).filter(([name]) => round.right.includes(name)).map(([name, value]) => `${name}=${String(value).replace('.', '{,}')}`).join(',\\ '), language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function TranslateGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TRANSLATE_ROUNDS,
                rules: [
                    say('Irakurri esaldia eta letren esanahia.', 'Lee la frase y qué significa cada letra.', 'اقرأ الجملة ومعنى كل حرف.', 'Read the sentence and what each letter means.'),
                    say('Aukeratu esaldia esaten duen ekuazioa. Egiaztatu zenbaki batekin: zer da handiagoa?', 'Elige la ecuación que dice la frase. Compruébalo con un número: ¿qué es lo mayor?', 'اختر المعادلة التي تقول الجملة. تحقق بعدد: ما الأكبر؟', 'Choose the equation that says the sentence. Check with a number: which is larger?'),
                    say('Aukera bakarra da zuzena.', 'Solo una opción es correcta.', 'خيار واحد فقط صحيح.', 'Only one option is right.')
                ],
                create: createTranslateRounds,
                stars: standardStars(TRANSLATE_ROUNDS),
                starsNote: starsNote(TRANSLATE_ROUNDS),
                Round: TranslatePlay
            }}
        />
    )
}
