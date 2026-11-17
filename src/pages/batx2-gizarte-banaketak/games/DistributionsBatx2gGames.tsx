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
import { createCutoffRounds, CUTOFF_ROUNDS, valueLatex, type CutoffRound } from './cutoff'
import { createStandoutRounds, numText, STANDOUT_ROUNDS, zText, type StandoutRound } from './standout'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — the two round games of
   this unit: the cut-off mark (three values or three intervals) and who
   stands out most? (two or three people with their normals). Logic in
   cutoff.ts and standout.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/* ---------- The cut-off mark ---------- */

function CutoffPlay({ round, language, onAnswer, answered }: RoundProps<CutoffRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const choose = (option: string) => {
        if (answered) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    const z = valueLatex(round.z)
    const area = round.side === 'centre' ? `P(Z\\le z_{\\alpha/2})=${valueLatex(1 - (100 - round.k) / 200)}` : `P(Z\\le k)=${valueLatex(1 - round.k / 100)}`
    const work = round.side === 'centre'
        ? `${round.mean}\\pm ${z}\\cdot ${numText(round.sd)}`
        : `x=${round.mean}${round.side === 'top' ? '+' : '-'}${z}\\cdot ${numText(round.sd)}=${round.answer}`
    return (
        <>
            <p className="prob2-question"><MathText text={l(round.prompt)} /></p>
            <div className={`prop3-options ${round.side === 'centre' ? 'prob2-stack' : 'prob2-three'}`}>
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={choiceClass(answered, option === round.answer, option === picked)} onClick={() => choose(option)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`${area}\\ \\to\\ ${round.side === 'centre' ? 'z_{\\alpha/2}' : 'k'}=${z}`, language)}</span>
                    <span className="dbh4-worked">{formula(work, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function CutoffGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CUTOFF_ROUNDS,
                rules: [
                    say('Idatzi beti mugaren azpian geratzen dena: % k onenarentzat, $1-\\frac{k}{100}$.', 'Escribe siempre lo que queda por debajo del corte: para el k % mejor, $1-\\frac{k}{100}$.', 'اكتب دائمًا ما يقع تحت الحد: لأفضل k % هو $1-\\frac{k}{100}$.', 'Always write what lies below the cut: for the best k %, $1-\\frac{k}{100}$.'),
                    say('Desegin tipifikazioa: $x=\\mu+k\\,\\sigma$.', 'Deshaz la tipificación: $x=\\mu+k\\,\\sigma$.', 'اعكس التوحيد: $x=\\mu+k\\,\\sigma$.', 'Undo the standardising: $x=\\mu+k\\,\\sigma$.'),
                    say('Erdiko % k: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'El k % central: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'k % الأوسط: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'The central k %: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.')
                ],
                create: createCutoffRounds,
                stars: standardStars(CUTOFF_ROUNDS),
                starsNote: STARS_NOTE,
                Round: CutoffPlay
            }}
        />
    )
}

/* ---------- Who stands out most? ---------- */

function StandoutPlay({ round, language, onAnswer, answered }: RoundProps<StandoutRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const question = round.unusual
        ? say('Nork du emaitzarik ezohikoena (batez bestekotik urrunen)?', '¿Quién tiene el resultado más inusual (el más lejos de la media)?', 'من لديه النتيجة الأكثر ندرة (الأبعد عن المتوسط)؟', 'Who has the most unusual result (the furthest from the mean)?')
        : say('Nork nabarmentzen du gehiago bere taldean?', '¿Quién destaca más en su grupo?', 'من يتميز أكثر في مجموعته؟', 'Who stands out most in their group?')
    return (
        <>
            <p className="prob2-question">{l(question)}</p>
            <div className={`prop3-options prob2-machines prob2-machines-${round.people.length}`} dir="ltr">
                {round.people.map((person, index) => (
                    <button key={person.name} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>
                        <strong className="prob2-machine">{person.name}</strong>
                        <span>{formula(`x=${numText(person.value)}`, language)}</span>
                        <span>{formula(`N(${numText(person.mean)};\\,${numText(person.sd)})`, language)}</span>
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.people.map((person) => (
                        <span key={person.name} className="dbh4-worked">{formula(`z=\\frac{${numText(person.value)}-${numText(person.mean)}}{${numText(person.sd)}}=${zText(person.z)}`, language)}</span>
                    ))}
                    <MathText text={l(round.unusual ? say('$|z|$ handiena irabazten du.', 'Gana la $|z|$ mayor.', 'تفوز أكبر $|z|$.', 'The biggest $|z|$ wins.') : say('$z$ handiena irabazten du, ez nota handiena.', 'Gana la mayor $z$, no la nota más alta.', 'تفوز أكبر $z$ لا أعلى درجة.', 'The biggest $z$ wins, not the highest mark.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function StandoutGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: STANDOUT_ROUNDS,
                rules: [
                    say('Eskala desberdinak ezin dira zuzenean konparatu: tipifikatu, $z=\\frac{x-\\mu}{\\sigma}$.', 'Escalas distintas no se comparan directamente: tipifica, $z=\\frac{x-\\mu}{\\sigma}$.', 'لا تُقارن المقاييس المختلفة مباشرة: وحّد، $z=\\frac{x-\\mu}{\\sigma}$.', 'Different scales cannot be compared directly: standardise, $z=\\frac{x-\\mu}{\\sigma}$.'),
                    say('Nabarmenena: $z$ handiena.', 'Destaca más: la $z$ mayor.', 'الأكثر تميزًا: أكبر $z$.', 'Stands out most: the biggest $z$.'),
                    say('2. mailan, ezohikoena: $|z|$ handiena.', 'En el nivel 2, el más inusual: la $|z|$ mayor.', 'في المستوى 2 الأكثر ندرة: أكبر $|z|$.', 'In level 2, the most unusual: the biggest $|z|$.')
                ],
                create: createStandoutRounds,
                stars: standardStars(STANDOUT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: StandoutPlay
            }}
        />
    )
}
