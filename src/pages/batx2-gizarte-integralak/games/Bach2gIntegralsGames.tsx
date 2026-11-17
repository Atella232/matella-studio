import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2gIntegralsGames.css'
import { createSignedRounds, SIGNED_KINDS, SIGNED_ROUNDS, type SignedKind, type SignedRound } from './signedArea'
import { createWhichPrimitiveRounds, WHICH_PRIMITIVE_ROUNDS, type WhichPrimitiveRound } from './whichPrimitive'

/* ==========================================================================
   ¿Qué primitiva es? and Área con signo (Integralak, Batxilergoa 2 ·
   Gizarte Zientziak): the first picks one of four antiderivatives, the
   second one of three readings of an integral. After each answer the
   working comes in.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />

/* ---------- ¿Qué primitiva es? ---------- */

function PrimitivePlay({ round, language, onAnswer, answered }: RoundProps<WhichPrimitiveRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da funtzio honen jatorrizko bat?', '¿Cuál es una primitiva de esta función?', 'ما الدالة الأصلية لهذه الدالة؟', 'Which is an antiderivative of this function?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(`f(x)=${round.latex}`, language)}</div>
            <div className="prop3-options bach2g-int-options" role="group" aria-label={l(say('Jatorrizkoak', 'Primitivas', 'الدوال الأصلية', 'Antiderivatives'))}>
                {round.options.map((option, index) => (
                    <button key={option.latex} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(option.latex, language)}
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

export function PrimitiveGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHICH_PRIMITIVE_ROUNDS,
                rules: [
                    say('Funtzio bat eta lau hautagai ematen dira.', 'Te dan una función y cuatro candidatas.', 'تُعطى دالة وأربعة مرشحين.', 'You get a function and four candidates.'),
                    say('Deribatu buruz: deribatua funtzioa bera denean, hori da jatorrizkoa.', 'Deriva de cabeza: cuando la derivada es la función, esa es la primitiva.', 'اشتق ذهنيًا: عندما تكون المشتقة هي الدالة فتلك هي الدالة الأصلية.', 'Differentiate in your head: when the derivative is the function, that is the antiderivative.')
                ],
                create: createWhichPrimitiveRounds,
                stars: standardStars(WHICH_PRIMITIVE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: PrimitivePlay
            }}
        />
    )
}

/* ---------- Área con signo ---------- */

const KIND_NAMES: Record<SignedKind, LocalizedText> = {
    area: say('Bai, hori da azalera', 'Sí, es el área', 'نعم، هذه هي المساحة', 'Yes, it is the area'),
    minus: say('Zeinuz aldatuta', 'Con el signo cambiado', 'بإشارة معكوسة', 'With the sign changed'),
    split: say('Tartea zatitu behar da', 'Hay que partir el intervalo', 'يجب تقسيم الفترة', 'The interval must be split')
}

function SignedPlay({ round, language, onAnswer, answered }: RoundProps<SignedRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<SignedKind | null>(null)
    const choose = (kind: SignedKind) => {
        if (answered) return
        setPicked(kind)
        onAnswer(kind === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <div className="prop3-options bach2g-int-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {SIGNED_KINDS.map((kind) => (
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

export function SignedGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SIGNED_ROUNDS,
                rules: [
                    say('Integral baten balioa ematen da.', 'Te dan el valor de una integral.', 'تُعطى قيمة تكامل.', 'You get the value of an integral.'),
                    say('Kurba ardatzaren gainean, azpian ala bietan dagoen pentsatu, eta erabaki.', 'Piensa si la curva va encima del eje, debajo o en los dos, y decide.', 'فكّر هل المنحنى فوق المحور أم تحته أم في الجهتين، ثم قرّر.', 'Think whether the curve is above the axis, below or both, and decide.')
                ],
                create: createSignedRounds,
                stars: standardStars(SIGNED_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: SignedPlay
            }}
        />
    )
}
