import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { fraction } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { ZONES } from '../lab/events'
import { hundredthsLatex, pct, probLatex, say, tenthsLatex } from '../lab/probability'
import { VENN, ZONE_PATHS, ZONE_SPOTS } from '../lab/vennGeometry'
import { createCulpritRounds, CULPRIT_ROUNDS, culpritPaths, culpritPosterior, culpritTotal, type CulpritRound } from './culprit'
import './ProbabilityBatx2Games.css'
import { createRelationRounds, RELATION_ROUNDS, relationData, RELATIONS, relationWorked, type Relation, type RelationRound } from './relation'
import { createVennRounds, VENN_ROUNDS, type VennRound } from './vennGame'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — three games played in
   rounds: independent, mutually exclusive or neither (three buttons and
   the product test), fill in the Venn diagram (the zone asked for, shaded
   with a question mark, and three values) and who did it? (two or three
   machines; tap the likeliest one). Logic in relation.ts, vennGame.ts and
   culprit.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/* ---------- Independent, mutually exclusive or neither? ---------- */

const RELATION_NAMES: Record<Relation, ReturnType<typeof say>> = {
    independent: say('Independenteak', 'Independientes', 'مستقلان', 'Independent'),
    exclusive: say('Bateraezinak', 'Incompatibles', 'متنافيان', 'Mutually exclusive'),
    neither: say('Ez bata ez bestea', 'Ninguna de las dos', 'لا هذا ولا ذاك', 'Neither')
}

function RelationPlay({ round, language, onAnswer, answered }: RoundProps<RelationRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Relation | null>(null)
    const choose = (relation: Relation) => {
        if (answered) return
        setPicked(relation)
        onAnswer(relation === round.answer)
    }
    const verdict = round.answer === 'independent'
        ? say('$P(A\\cap B)=P(A)\\cdot P(B)$: independenteak.', '$P(A\\cap B)=P(A)\\cdot P(B)$: independientes.', '$P(A\\cap B)=P(A)\\cdot P(B)$: مستقلان.', '$P(A\\cap B)=P(A)\\cdot P(B)$: independent.')
        : round.answer === 'exclusive'
            ? say('$P(A\\cap B)=0$: bateraezinak, eta beraz mendekoak.', '$P(A\\cap B)=0$: incompatibles, y por eso dependientes.', '$P(A\\cap B)=0$: متنافيان، ولذلك تابعان.', '$P(A\\cap B)=0$: mutually exclusive, and so dependent.')
            : say('Zati komuna dago, baina ez da $P(A)\\cdot P(B)$.', 'Hay parte común, pero no es $P(A)\\cdot P(B)$.', 'هناك جزء مشترك لكنه ليس $P(A)\\cdot P(B)$.', 'There is a common part, but it is not $P(A)\\cdot P(B)$.')
    return (
        <>
            <p className="prop3-prompt">
                {relationData(round).map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
            </p>
            <p className="prob2-question"><MathText text={l(say('Nolakoak dira $A$ eta $B$?', '¿Cómo son $A$ y $B$?', 'كيف هما $A$ و$B$؟', 'What are $A$ and $B$ like?'))} /></p>
            <div className="prop3-options prob2-stack">
                {RELATIONS.map((relation) => (
                    <button key={relation} type="button" disabled={answered} className={choiceClass(answered, relation === round.answer, relation === picked)} onClick={() => choose(relation)}>{l(RELATION_NAMES[relation])}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {relationWorked(round).map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
                    <MathText text={l(verdict)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function RelationGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RELATION_ROUNDS,
                rules: [
                    say('Independenteak: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Independientes: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'المستقلان: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Independent: $P(A\\cap B)=P(A)\\cdot P(B)$.'),
                    say('Bateraezinak: $P(A\\cap B)=0$. Ez dira gauza bera.', 'Incompatibles: $P(A\\cap B)=0$. No son lo mismo.', 'المتنافيان: $P(A\\cap B)=0$. وليسا الشيء نفسه.', 'Mutually exclusive: $P(A\\cap B)=0$. They are not the same thing.'),
                    say('2. eta 3. mailetan, lehenik ebakidura kalkulatu.', 'En los niveles 2 y 3, calcula primero la intersección.', 'في المستويين 2 و3 احسب التقاطع أولًا.', 'In levels 2 and 3, work out the intersection first.')
                ],
                create: createRelationRounds,
                stars: standardStars(RELATION_ROUNDS),
                starsNote: STARS_NOTE,
                Round: RelationPlay
            }}
        />
    )
}

/* ---------- Fill in the Venn diagram ---------- */

function VennBoard({ round, answered, language }: { round: VennRound; answered: boolean; language: UnitLanguage }) {
    return (
        <svg viewBox="0 0 360 224" role="img" aria-label="Venn" className="prob2-venn" direction="ltr">
            {ZONES.map((zone, index) => (
                <path key={zone} d={ZONE_PATHS[zone]} fillRule="evenodd" fill={round.asked.zones[index] ? 'var(--coral-tint, #f6d5cc)' : 'var(--card, #fffcf6)'} />
            ))}
            <rect x={VENN.box.x} y={VENN.box.y} width={VENN.box.width} height={VENN.box.height} rx={12} fill="none" stroke="var(--ink)" strokeWidth={2} />
            <circle cx={VENN.a.x} cy={VENN.a.y} r={VENN.r} fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth={2.4} />
            <circle cx={VENN.b.x} cy={VENN.b.y} r={VENN.r} fill="none" stroke="var(--coral, #c4432a)" strokeWidth={2.4} />
            <text x={VENN.a.x - VENN.r * 0.72} y={VENN.a.y - VENN.r * 0.74} textAnchor="middle" fontSize={18} fontWeight={700} fill="var(--blue, #2f6fdb)">A</text>
            <text x={VENN.b.x + VENN.r * 0.72} y={VENN.b.y - VENN.r * 0.74} textAnchor="middle" fontSize={18} fontWeight={700} fill="var(--coral, #c4432a)">B</text>
            {ZONES.map((zone, index) => (
                <text key={zone} x={ZONE_SPOTS[zone].x} y={ZONE_SPOTS[zone].y} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--ink)">
                    {answered ? hundredthsLatex(round.zones[index]).replace('{,}', language === 'ar' || language === 'en' ? '.' : ',') : round.asked.zones[index] ? '?' : ''}
                </text>
            ))}
        </svg>
    )
}

function VennPlay({ round, language, onAnswer, answered }: RoundProps<VennRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (value: number) => {
        if (answered) return
        setPicked(value)
        onAnswer(value === round.answer)
    }
    const asked = `P(${round.asked.latex})`
    const sum = round.asked.zones.map((inside, index) => (inside ? hundredthsLatex(round.zones[index]) : null)).filter(Boolean).join('+')
    return (
        <>
            <p className="prop3-prompt">
                {round.data.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
            </p>
            <VennBoard round={round} answered={answered} language={language} />
            <p className="prob2-question"><MathText text={l(say(`Zenbat da $${asked}$?`, `¿Cuánto vale $${asked}$?`, `كم يساوي $${asked}$؟`, `What is $${asked}$?`))} /></p>
            <div className="prop3-options prob2-three">
                {round.options.map((value) => (
                    <button key={value} type="button" disabled={answered} className={choiceClass(answered, value === round.answer, value === picked)} onClick={() => choose(value)}>{formula(hundredthsLatex(value), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.steps.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
                    <span className="dbh4-worked">{formula(`${asked}=${round.asked.zones.filter(Boolean).length > 1 ? `${sum}=` : ''}${hundredthsLatex(round.answer)}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function VennGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: VENN_ROUNDS,
                rules: [
                    say('Hiru datuk Venn diagramaren lau zonak finkatzen dituzte, eta lauek 1 batzen dute.', 'Tres datos fijan las cuatro zonas del Venn, que suman 1.', 'تحدّد ثلاث معطيات المناطق الأربع لمخطط فن، ومجموعها 1.', 'Three data fix the four zones of the Venn diagram, which add up to 1.'),
                    say('Lehenik ebakidura; gero, galdetutako zonak batu.', 'Primero la intersección; después, suma las zonas que se preguntan.', 'أولًا التقاطع، ثم اجمع المناطق المطلوبة.', 'First the intersection; then add the zones asked for.'),
                    say('De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$ eta $\\overline{A}\\cup\\overline{B}=\\overline{A\\cap B}$.', 'De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$ y $\\overline{A}\\cup\\overline{B}=\\overline{A\\cap B}$.', 'دي مورغان: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$ و$\\overline{A}\\cup\\overline{B}=\\overline{A\\cap B}$.', 'De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$ and $\\overline{A}\\cup\\overline{B}=\\overline{A\\cap B}$.')
                ],
                create: createVennRounds,
                stars: standardStars(VENN_ROUNDS),
                starsNote: STARS_NOTE,
                Round: VennPlay
            }}
        />
    )
}

/* ---------- Who did it? ---------- */

const MACHINES = ['A₁', 'A₂', 'A₃']
const MACHINE_LATEX = ['A_1', 'A_2', 'A_3']

function CulpritPlay({ round, language, onAnswer, answered }: RoundProps<CulpritRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const event = round.faulty ? 'D' : '\\overline{D}'
    const question = round.faulty
        ? say('Pieza bat akastuna da. Zein makinatatik dator ziurrenik?', 'Una pieza ha salido defectuosa. ¿De qué máquina viene con más probabilidad?', 'خرجت قطعة معيبة. من أي آلة جاءت على الأرجح؟', 'A part is faulty. Which machine most likely made it?')
        : say('Pieza bat ondo atera da. Zein makinatatik dator ziurrenik?', 'Una pieza ha salido bien. ¿De qué máquina viene con más probabilidad?', 'خرجت قطعة سليمة. من أي آلة جاءت على الأرجح؟', 'A part is fine. Which machine most likely made it?')
    const paths = culpritPaths(round)
    const total = culpritTotal(round)
    const thousandths = (value: number) => probLatex(fraction(value, 1000))
    return (
        <>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <div className={`prop3-options prob2-machines prob2-machines-${round.shares.length}`} dir="ltr">
                {round.shares.map((share, index) => (
                    <button key={index} type="button" disabled={answered} className={choiceClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>
                        <strong className="prob2-machine">{MACHINES[index]}</strong>
                        <span>{l(say(`Ekoizpena: ${pct(share * 10, 'eu')}`, `Fabrica el ${pct(share * 10, 'es')}`, `تصنع ${pct(share * 10, 'ar')}`, `Makes ${pct(share * 10, 'en')}`))}</span>
                        <span className="prob2-rate">{l(say(`Akatsak: ${pct(round.rates[index], 'eu')}`, `Falla el ${pct(round.rates[index], 'es')}`, `تخطئ ${pct(round.rates[index], 'ar')}`, `Fails ${pct(round.rates[index], 'en')}`))}</span>
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.shares.map((share, index) => (
                        <span key={index} className="dbh4-worked">{formula(`P(${MACHINE_LATEX[index]})\\cdot P(${event}/${MACHINE_LATEX[index]})=${tenthsLatex(share)}\\cdot ${probLatex(fraction(round.faulty ? round.rates[index] : 100 - round.rates[index], 100))}=${thousandths(paths[index])}`, language)}</span>
                    ))}
                    <span className="dbh4-worked">{formula(`P(${MACHINE_LATEX[round.answer]}/${event})=\\frac{${thousandths(paths[round.answer])}}{${thousandths(total)}}=${probLatex(culpritPosterior(round, round.answer))}`, language)}</span>
                    <MathText text={l(say('Bide handienak irabazten du: kausa bider gertatu dena kausa jakinda.', 'Gana el camino más grande: la causa por lo ocurrido sabiendo la causa.', 'يفوز المسار الأكبر: السبب في ما حدث مع العلم بالسبب.', 'The largest path wins: the cause times what happened given the cause.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function CulpritGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CULPRIT_ROUNDS,
                rules: [
                    say('Makina bakoitzak ekoizpenaren zati bat egiten du, eta bere akats-tasa du.', 'Cada máquina hace una parte de la producción y tiene su tasa de fallo.', 'تصنع كل آلة جزءًا من الإنتاج ولها نسبة خطئها.', 'Each machine makes a share of the production and has its own failure rate.'),
                    say('Bayes: konparatu bideak, $P(A_i)\\cdot P(D/A_i)$.', 'Bayes: compara los caminos, $P(A_i)\\cdot P(D/A_i)$.', 'بايز: قارن المسارات $P(A_i)\\cdot P(D/A_i)$.', 'Bayes: compare the paths, $P(A_i)\\cdot P(D/A_i)$.'),
                    say('3. mailan, batzuetan pieza ona da: orduan $P(\\overline{D}/A_i)=1-P(D/A_i)$.', 'En el nivel 3, a veces la pieza está bien: entonces $P(\\overline{D}/A_i)=1-P(D/A_i)$.', 'في المستوى 3 تكون القطعة أحيانًا سليمة: عندئذ $P(\\overline{D}/A_i)=1-P(D/A_i)$.', 'In level 3, sometimes the part is fine: then $P(\\overline{D}/A_i)=1-P(D/A_i)$.')
                ],
                create: createCulpritRounds,
                stars: standardStars(CULPRIT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: CulpritPlay
            }}
        />
    )
}
