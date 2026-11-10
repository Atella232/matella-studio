import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-deribatuak/games/BachDerivativesGames.css'
import '../../batx1-zientziak-integralak/games/BachIntegralsGames.css'
import './Bach2DefiniteGames.css'
import { BARROW_ROUNDS, createBarrowRounds, type BarrowRound } from './barrow'
import { createDeriveRounds, DERIVE_ROUNDS, type DeriveRound } from './derive'
import { createLimitsRounds, LIMITS_ROUNDS, type LimitsRound } from './limits'

/* ==========================================================================
   ¿Vale Barrow?, Cambia los límites and Deriva la función integral
   (Integral mugatua, Batxilergoa 2 · Zientziak): the first decides whether
   Barrow can be applied, and how much it gives; the second chooses the
   integral in t with the new limits; the third chooses F′(x) of an
   integral function. After each answer the reason comes in. Logic in
   barrow.ts, limits.ts and derive.ts.
   ========================================================================== */

/** A formula in the language's names */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />

function usePick(answered: boolean, onAnswer: (right: boolean) => void, answer: number) {
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === answer)
    }
    const state = (index: number) => (!answered ? '' : index === answer ? 'right' : index === picked ? 'wrong' : '')
    return { picked, choose, state }
}

/* ---------- ¿Vale Barrow? ---------- */

function BarrowPlay({ round, language, onAnswer, answered }: RoundProps<BarrowRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Barrow zuzenean aplika daiteke? Zenbat da?', '¿Se puede aplicar Barrow directamente? ¿Cuánto da?', 'هل تُطبق قاعدة بارو مباشرة؟ وكم يساوي التكامل؟', 'Can Barrow be applied directly? What does it give?'))} /></p>
            <div className="bach-der-big">{formula(round.integral, language)}</div>
            {round.definition && <div className="bach-der-big">{formula(round.definition, language)}</div>}
            <div className="prop3-options bach2-def-answers" role="group" aria-label={l(say('Erantzunak', 'Respuestas', 'الإجابات', 'Answers'))}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}><MathText text={l(option)} /></button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(round.why)} />
                    <span className="dbh4-worked">{formula(round.worked, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function BarrowGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BARROW_ROUNDS,
                rules: [
                    say('Barrow-k $f$ jarraitua behar du $[a,b]$ tartean: bilatu non egiten den zero izendatzailea.', 'Barrow necesita $f$ continua en $[a,b]$: busca dónde se anula el denominador.', 'تحتاج قاعدة بارو إلى $f$ متصلة في $[a,b]$: ابحث أين ينعدم المقام.', 'Barrow needs $f$ continuous on $[a,b]$: look for where the denominator is zero.'),
                    say('Balio absolutu batek edo jauzi batek ez du eragozten: zatitu formula aldatzen den tokian.', 'Un valor absoluto o un salto no lo impiden: parte donde cambia la fórmula.', 'القيمة المطلقة أو القفزة لا تمنعها: قسّم حيث تتغير الصيغة.', 'An absolute value or a jump does not stop it: split where the formula changes.')
                ],
                create: createBarrowRounds,
                stars: standardStars(BARROW_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: BarrowPlay
            }}
        />
    )
}

/* ---------- Cambia los límites ---------- */

function LimitsPlay({ round, language, onAnswer, answered }: RoundProps<LimitsRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`$${round.change}$ aldaketarekin, zein integral ateratzen da?`, `Con $${round.change}$, ¿qué integral sale?`, `مع $${round.change}$، أي تكامل نحصل عليه؟`, `With $${round.change}$, which integral do you get?`))} /></p>
            <div className="bach-der-big">{formula(round.integral, language)}</div>
            <div className="prop3-options bach-int-formulas" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(say('Mugak ere $t$ aldagaira pasatzen dira:', 'Los límites también pasan a $t$:', 'تنتقل الحدود أيضًا إلى $t$:', 'The limits move to $t$ too:'))} />
                    {round.worked.map((line) => <span key={line} className="dbh4-worked">{formula(line, language)}</span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function LimitsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LIMITS_ROUNDS,
                rules: [
                    say('$t=g(x)$ aldaketan, muga berriak $g(a)$ eta $g(b)$ dira.', 'Con $t=g(x)$, los límites nuevos son $g(a)$ y $g(b)$.', 'مع $t=g(x)$ تكون الحدود الجديدة $g(a)$ و$g(b)$.', 'With $t=g(x)$, the new limits are $g(a)$ and $g(b)$.'),
                    say('$dt=g\'(x)\\,dx$: falta den zenbakia kanpora ateratzen da.', '$dt=g\'(x)\\,dx$: el número que falta sale fuera.', '$dt=g\'(x)\\,dx$: العدد الناقص يخرج.', '$dt=g\'(x)\\,dx$: the missing number comes out.')
                ],
                create: createLimitsRounds,
                stars: standardStars(LIMITS_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: LimitsPlay
            }}
        />
    )
}

/* ---------- Deriva la función integral ---------- */

function DerivePlay({ round, language, onAnswer, answered }: RoundProps<DeriveRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zein da $F\'(x)$?', '¿Cuál es $F\'(x)$?', 'ما $F\'(x)$؟', 'What is $F\'(x)$?'))} /></p>
            <div className="bach-der-big">{formula(round.F, language)}</div>
            <div className="prop3-options bach-int-formulas" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(say('Oinarrizko teorema eta katearen erregela:', 'Teorema fundamental y regla de la cadena:', 'المبرهنة الأساسية وقاعدة السلسلة:', 'Fundamental theorem and chain rule:'))} />
                    <span className="dbh4-worked">{formula(round.worked, language)}</span>
                    <span className="dbh4-worked">{formula(round.options[round.answer], language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function DeriveGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: DERIVE_ROUNDS,
                rules: [
                    say('$F(x)=\\int_a^x f(t)\\,dt$ bada, $F\'(x)=f(x)$.', 'Si $F(x)=\\int_a^x f(t)\\,dt$, $F\'(x)=f(x)$.', 'إذا كانت $F(x)=\\int_a^x f(t)\\,dt$ فإن $F\'(x)=f(x)$.', 'If $F(x)=\\int_a^x f(t)\\,dt$, $F\'(x)=f(x)$.'),
                    say('Muga $g(x)$ bada, biderkatu $g\'(x)$ deribatuaz; beheko muga ere aldatzen bada, kendu haren zatia.', 'Si el límite es $g(x)$, multiplica por $g\'(x)$; si también varía el de abajo, resta su parte.', 'إذا كان الحد $g(x)$ فاضرب في $g\'(x)$؛ وإذا تغيّر الحد الأدنى أيضًا فاطرح جزءه.', 'If the limit is $g(x)$, multiply by $g\'(x)$; if the bottom limit varies too, subtract its part.')
                ],
                create: createDeriveRounds,
                stars: standardStars(DERIVE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: DerivePlay
            }}
        />
    )
}
