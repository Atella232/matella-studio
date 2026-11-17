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
import { ALLOCATE_ROUNDS, createAllocateRounds, type AllocateRound } from './allocate'
import { BIAS_ROUNDS, createBiasRounds, kindNames, SAMPLING_KINDS, STUDIES, type BiasRound } from './bias'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — the two round games of
   this unit: is it biased? (a plan, three plans or a kind of sampling)
   and split the sample (three allocations to choose from). Logic in
   bias.ts and allocate.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')
const FAIR = say('Ona da', 'Es buena', 'جيدة', 'Fair')
const BIASED = say('Alboratua', 'Sesgada', 'متحيّزة', 'Biased')

/* ---------- Is it biased? ---------- */

function BiasPlay({ round, language, onAnswer, answered }: RoundProps<BiasRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number, right: boolean) => {
        if (answered) return
        setPicked(index)
        onAnswer(right)
    }
    if (round.kind === 'which-kind') {
        const answer = SAMPLING_KINDS.indexOf(round.answer)
        return (
            <>
                <p className="prob2-question">{l(round.text)}</p>
                <div className="prop3-options prob2-machines prob2-machines-2">
                    {SAMPLING_KINDS.map((kind, index) => (
                        <button key={kind} type="button" disabled={answered} className={choiceClass(answered, index === answer, index === picked)} onClick={() => choose(index, index === answer)}>{l(kindNames[kind])}</button>
                    ))}
                </div>
                {answered && <RoundVerdict right={picked === answer} language={language}><span>{l(kindNames[round.answer])}</span></RoundVerdict>}
            </>
        )
    }
    const study = STUDIES[round.study]
    if (round.kind === 'fair-or-not') {
        const plan = study.plans[round.plan]
        return (
            <>
                <p className="prob2-question">{l(study.goal)}</p>
                <p className="prob2-question">{l(plan.text)}</p>
                <div className="prop3-options prob2-machines prob2-machines-2">
                    {[FAIR, BIASED].map((label, index) => (
                        <button key={index} type="button" disabled={answered} className={choiceClass(answered, (index === 0) === round.fair, index === picked)} onClick={() => choose(index, (index === 0) === round.fair)}>{l(label)}</button>
                    ))}
                </div>
                {answered && <RoundVerdict right={(picked === 0) === round.fair} language={language}><span>{plan.why ? l(plan.why) : l(say('Ausazkoa da eta inor ez da kanpoan geratzen.', 'Es al azar y no deja a nadie fuera.', 'عشوائية ولا تستبعد أحدًا.', 'It is random and leaves nobody out.'))}</span></RoundVerdict>}
            </>
        )
    }
    return (
        <>
            <p className="prob2-question">{l(study.goal)}</p>
            <div className="prop3-options prob2-stack">
                {round.order.map((planIndex, index) => (
                    <button key={planIndex} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index, index === round.answer)}>{l(study.plans[planIndex].text)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {study.plans.slice(1).map((plan, index) => <span key={index} className="dbh4-worked">{l(plan.why!)}</span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function BiasGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BIAS_ROUNDS,
                rules: [
                    say('Lagin ona ausazkoa da: populazioko edozeinek du aukera.', 'Una buena muestra es al azar: cualquiera de la población puede salir.', 'العيّنة الجيدة عشوائية: يمكن أن يخرج أي فرد من المجتمع.', 'A fair sample is random: anyone in the population can come out.'),
                    say('Alborapena: talde bat kanpoan geratzen da, edo nahi duenak bakarrik erantzuten du.', 'Sesgo: un grupo queda fuera, o solo responde quien quiere.', 'التحيّز: تُستبعد مجموعة، أو لا يجيب إلا من يريد.', 'Bias: a group is left out, or only those who want to answer do.'),
                    say('3. mailan: sinplea, sistematikoa ($h$ jauzia), geruzatua ala ez ausazkoa.', 'En el nivel 3: simple, sistemático (salto $h$), estratificado o no aleatorio.', 'في المستوى 3: بسيطة أو منتظمة (القفزة $h$) أو طبقية أو غير عشوائية.', 'In level 3: simple, systematic (step $h$), stratified or not random.')
                ],
                create: createBiasRounds,
                stars: standardStars(BIAS_ROUNDS),
                starsNote: STARS_NOTE,
                Round: BiasPlay
            }}
        />
    )
}

/* ---------- Split the sample ---------- */

function AllocatePlay({ round, language, onAnswer, answered }: RoundProps<AllocateRound>) {
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
            <div className="prop3-options prob2-stack">
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

export function AllocateGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ALLOCATE_ROUNDS,
                rules: [
                    say('Geruza bakoitzak bere pisua: $n_i=n\\cdot\\frac{N_i}{N}$.', 'Cada estrato según su peso: $n_i=n\\cdot\\frac{N_i}{N}$.', 'كل طبقة حسب وزنها: $n_i=n\\cdot\\frac{N_i}{N}$.', 'Each stratum by its weight: $n_i=n\\cdot\\frac{N_i}{N}$.'),
                    say('Zatiak ez badira zehatzak, falta direnak hondar handienei.', 'Si las partes no salen exactas, las que faltan van a los mayores restos.', 'إذا لم تكن الحصص مضبوطة فالناقص لأكبر البواقي.', 'If the shares are not exact, the missing ones go to the largest remainders.'),
                    say('Alderantziz: $N_i=n_i\\cdot\\frac{N}{n}$.', 'Al revés: $N_i=n_i\\cdot\\frac{N}{n}$.', 'بالعكس: $N_i=n_i\\cdot\\frac{N}{n}$.', 'Backwards: $N_i=n_i\\cdot\\frac{N}{n}$.')
                ],
                create: createAllocateRounds,
                stars: standardStars(ALLOCATE_ROUNDS),
                starsNote: STARS_NOTE,
                Round: AllocatePlay
            }}
        />
    )
}
