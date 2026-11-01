import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { createProportionDetectiveCases, num, PROPORTION_DETECTIVE_CASES, proportionDetectiveNames, proportionDetectiveTips } from './detective'
import { ProportionDbh2GameArt } from './GameArt'
import { proportionDbh2Games, type ProportionDbh2GameId } from './info'
import { createKindRounds, KIND_ROUNDS, kindStars, RELATIONS, type KindRound, type Relation } from './kind'
import { createTagRounds, multiplier, TAG_ROUNDS, tagPrice, tagSolved, tagStars, type TagRound } from './tag'
import { createWorkRounds, daysNeeded, finishesOnTime, totalWork, WORK_LIMITS, WORK_ROUNDS, workStars, type WorkRound } from './work'
import './Games.css'

/* ==========================================================================
   The four games of Proportzionaltasuna eta ehunekoak 2. DBH: the price
   tag, direct or inverse, finish the job and the proportions detective.
   The rounds run in the shared RoundGame; the detective is the shared
   worked-solution detective.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: ProportionDbh2GameId) => proportionDbh2Games.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** Euros with two decimals and the language's decimal mark */
const euros = (value: number, language: UnitLanguage) => `${value.toFixed(2).replace('.', language === 'eu' || language === 'es' ? ',' : '.')} €`
const changeText = (change: number) => `${change > 0 ? '+' : '−'}${Math.abs(change)} %`

function Verdict({ right, language, children }: { right: boolean; language: UnitLanguage; children: ReactNode }) {
    const l = useGameText(language)
    return (
        <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`} aria-live="polite">
            <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> {children}
        </p>
    )
}

/* ---------- J1. The price tag ---------- */

function TagPlay({ round, language, onAnswer, answered }: RoundProps<TagRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number[]>([])
    const price = tagPrice(round, chosen)
    const right = tagSolved(round, chosen)
    const toggle = (index: number) => !answered && setChosen((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
    const chain = (indexes: number[]) => `${round.price}${indexes.map((index) => `\\cdot ${num(multiplier(round.stickers[index]))}`).join('')}=${num(tagPrice(round, indexes))}`
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Lortu azken prezio hau:', 'Consigue este precio final:', 'احصل على هذا السعر النهائي:', 'Reach this final price:'))}
                <strong>{euros(round.target, language)}</strong>
            </p>
            <div className={`prop2-tag${answered ? (right ? ' right' : ' wrong') : ''}`} aria-live="polite">
                <span className="prop2-tag-hole" aria-hidden="true" />
                <small>{l(say('Hasierako prezioa', 'Precio inicial', 'السعر الأصلي', 'Starting price'))}: {euros(round.price, language)}</small>
                <strong>{euros(price, language)}</strong>
                <div className="prop2-tag-stuck">{chosen.map((index) => <span key={index}>{changeText(round.stickers[index])}</span>)}</div>
            </div>
            <div className="prop3-options prop2-stickers" role="group" aria-label={l(say('Pegatinak', 'Pegatinas', 'الملصقات', 'Stickers'))}>
                {round.stickers.map((change, index) => (
                    <button key={index} type="button" aria-pressed={chosen.includes(index)} disabled={answered} className={`${change > 0 ? 'up' : 'down'}${answered && round.solution.includes(index) ? ' right' : ''}`} onClick={() => toggle(index)}>
                        {changeText(change)}
                        {answered && <small>{formula(`\\cdot ${num(multiplier(change))}`, language)}</small>}
                    </button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen.length === 0} onClick={() => onAnswer(right)}>{l(say('Itsatsi', 'Pegar', 'ألصق', 'Stick them'))}</button>
                </div>
            )}
            {answered && (
                <Verdict right={right} language={language}>
                    {formula(chain(right ? chosen : round.solution), language)}
                    {!right && ' '}
                    {!right && l(say('Ehunekoak ez dira batzen: indizeak biderkatzen dira.', 'Los porcentajes no se suman: se multiplican los índices.', 'النسب لا تُجمع: تُضرب المؤشرات.', 'Percentages do not add up: the multipliers multiply.'))}
                </Verdict>
            )}
        </>
    )
}

const tagConfig: RoundGameConfig<TagRound> = {
    game: info('tag'),
    art: <ProportionDbh2GameArt game="tag" />,
    rounds: TAG_ROUNDS,
    rules: [
        say('Etiketak hasierako prezioa du. Aukeratu azken prezioa lortzen duten pegatinak.', 'La etiqueta tiene el precio inicial. Elige las pegatinas que dan el precio final.', 'على البطاقة السعر الأصلي. اختر الملصقات التي تعطي السعر النهائي.', 'The tag shows the starting price. Choose the stickers that give the final price.'),
        say('Pegatina bakoitzak bere indizeaz biderkatzen du: $-20\\,\\%$ da $\\cdot 0{,}8$.', 'Cada pegatina multiplica por su índice: $-20\\,\\%$ es $\\cdot 0{,}8$.', 'كل ملصق يضرب في مؤشره: $-20\\,\\%$ يعني $\\cdot 0.8$.', 'Each sticker multiplies by its multiplier: $-20\\,\\%$ is $\\cdot 0{,}8$.'),
        say(`${TAG_ROUNDS} etiketa maila bakoitzean; saiakera bat bakoitzeko.`, `${TAG_ROUNDS} etiquetas por nivel; un intento en cada una.`, `${TAG_ROUNDS} بطاقات في كل مستوى؛ محاولة واحدة لكل بطاقة.`, `${TAG_ROUNDS} tags per level; one try each.`)
    ],
    create: createTagRounds,
    stars: tagStars,
    starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
    Round: TagPlay
}

/* ---------- J2. Direct or inverse ---------- */

const RELATION_NAMES: Record<Relation, LocalizedText> = {
    direct: say('Zuzena', 'Directa', 'طردية', 'Direct'),
    inverse: say('Alderantzizkoa', 'Inversa', 'عكسية', 'Inverse'),
    none: say('Ez bata ez bestea', 'Ninguna', 'لا هذه ولا تلك', 'Neither')
}

function KindPlay({ round, language, onAnswer, answered }: RoundProps<KindRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Relation | null>(null)
    const choose = (relation: Relation) => {
        if (answered) return
        setPicked(relation)
        onAnswer(relation === round.answer)
    }
    return (
        <>
            {round.shown === 'situation'
                ? <p className="prop3-prompt"><strong>{l(round.text)}</strong></p>
                : (
                    <table className="prop2-table" dir="ltr">
                        <tbody>
                            <tr><th>x</th>{round.xs.map((x, index) => <td key={index}>{x}</td>)}</tr>
                            <tr><th>y</th>{round.ys.map((y, index) => <td key={index}>{y}</td>)}</tr>
                        </tbody>
                    </table>
                )}
            <div className="prop3-options prop2-relations" role="group" aria-label={l(say('Erlazioa', 'Relación', 'العلاقة', 'Relation'))}>
                {RELATIONS.map((relation) => (
                    <button key={relation} type="button" disabled={answered} className={!answered ? '' : relation === round.answer ? 'right' : relation === picked ? 'wrong' : ''} onClick={() => choose(relation)}>{l(RELATION_NAMES[relation])}</button>
                ))}
            </div>
            {answered && <Verdict right={picked === round.answer} language={language}><MathText text={l(round.why)} inline /></Verdict>}
        </>
    )
}

const kindConfig: RoundGameConfig<KindRound> = {
    game: info('kind'),
    art: <ProportionDbh2GameArt game="kind" />,
    rounds: KIND_ROUNDS,
    rules: [
        say('Zuzena: bat bikoiztean bestea ere bikoizten da; zatidura konstantea da.', 'Directa: si una se duplica, la otra también; el cociente es constante.', 'طردية: إذا تضاعف أحدهما تضاعف الآخر؛ وخارج القسمة ثابت.', 'Direct: double one and the other doubles; the quotient stays the same.'),
        say('Alderantzizkoa: bat bikoiztean bestea erdira jaisten da; biderkadura konstantea da.', 'Inversa: si una se duplica, la otra se reduce a la mitad; el producto es constante.', 'عكسية: إذا تضاعف أحدهما صار الآخر نصفه؛ وحاصل الضرب ثابت.', 'Inverse: double one and the other halves; the product stays the same.'),
        say('Kontuz: «bata igo eta bestea jaitsi» ez da beti alderantzizkoa.', 'Ojo: «una sube y la otra baja» no siempre es inversa.', 'انتبه: «أحدهما يزيد والآخر ينقص» ليس دائمًا عكسيًا.', 'Careful: “one goes up and the other goes down” is not always inverse.')
    ],
    create: createKindRounds,
    stars: kindStars,
    starsNote: say('3 izar: 8 · 2 izar: 6 · izar 1: 4', '3 estrellas: 8 · 2: 6 · 1: 4', '3 نجوم: 8 · 2: 6 · 1: 4', '3 stars: 8 · 2: 6 · 1: 4'),
    Round: KindPlay
}

/* ---------- J3. Finish the job ---------- */

function WorkPlay({ round, language, onAnswer, answered }: RoundProps<WorkRound>) {
    const l = useGameText(language)
    const [workers, setWorkers] = useState(round.workers)
    const [hours, setHours] = useState(round.fixedHours ?? round.hours)
    const total = totalWork(round)
    const needed = daysNeeded(round, workers, hours)
    const right = finishesOnTime(round, workers, hours)
    const perDay = workers * hours
    const days = Array.from({ length: round.deadline }, (_, index) => index)
    const scale = 300 / Math.max(total, perDay * round.deadline)
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(say(
                    `$${round.workers}$ langilek, egunean $${round.hours}$ ordu, $${round.days}$ egunetan. Amaitu obra $${round.deadline}$ egunetan${round.fixedHours === null ? '.' : `, egunean $${round.fixedHours}$ ordu.`}`,
                    `$${round.workers}$ obreros, $${round.hours}$ horas al día, en $${round.days}$ días. Termina la obra en $${round.deadline}$ días${round.fixedHours === null ? '.' : `, con $${round.fixedHours}$ horas al día.`}`,
                    `$${round.workers}$ عمال، $${round.hours}$ ساعات يوميًا، في $${round.days}$ أيام. أنهِ العمل في $${round.deadline}$ أيام${round.fixedHours === null ? '.' : `، بـ$${round.fixedHours}$ ساعات يوميًا.`}`,
                    `$${round.workers}$ workers, $${round.hours}$ hours a day, in $${round.days}$ days. Finish the job in $${round.deadline}$ days${round.fixedHours === null ? '.' : `, at $${round.fixedHours}$ hours a day.`}`
                ))} inline />
            </p>
            <div className="prop2-work-controls">
                <Stepper label={l(say('Langileak', 'Obreros', 'العمال', 'Workers'))} value={workers} min={WORK_LIMITS.workers.min} max={WORK_LIMITS.workers.max} onChange={(value) => !answered && setWorkers(value)} language={language} />
                {round.fixedHours === null && <Stepper label={l(say('Orduak egunean', 'Horas al día', 'ساعات يوميًا', 'Hours a day'))} value={hours} min={WORK_LIMITS.hours.min} max={WORK_LIMITS.hours.max} onChange={(value) => !answered && setHours(value)} language={language} />}
            </div>
            <svg className="prop2-work" viewBox="0 0 340 92" direction="ltr" aria-hidden="true">
                <rect x={20} y={14} width={total * scale} height={30} rx={4} fill="var(--paper-deep, #ece6da)" stroke="var(--ink)" strokeWidth={2} />
                {answered && days.map((day) => {
                    const from = day * perDay * scale
                    const width = perDay * scale
                    const over = from + width > total * scale + 1e-6
                    return <rect key={day} x={20 + from} y={50} width={width} height={22} fill={over ? 'var(--coral-tint, #f6d5cc)' : day % 2 === 0 ? 'var(--blue-tint, #dde7f7)' : 'var(--success-tint, #d9efe2)'} stroke="var(--ink)" strokeWidth={1.2} />
                })}
                <line x1={20 + total * scale} x2={20 + total * scale} y1={8} y2={82} stroke="var(--coral, #c4432a)" strokeWidth={2} strokeDasharray="5 4" />
            </svg>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Lanean hasi!', '¡A trabajar!', 'إلى العمل!', 'Start work!'))}</button>
                </div>
            )}
            {answered && (
                <Verdict right={right} language={language}>
                    {formula(`${round.workers}\\cdot ${round.hours}\\cdot ${round.days}=${total}`, language)}{' · '}
                    {formula(`\\frac{${total}}{${workers}\\cdot ${hours}}=${num(needed)}`, language)}{' '}
                    {right
                        ? l(say('egun: garaiz!', 'días: ¡a tiempo!', 'أيام: في الموعد!', 'days: on time!'))
                        : needed > round.deadline
                            ? <MathText text={l(say(`egun: berandu. Adibidez: $${round.solution.workers}$ langile, $${round.solution.hours}$ ordu.`, `días: tarde. Por ejemplo: $${round.solution.workers}$ obreros, $${round.solution.hours}$ horas.`, `أيام: متأخر. مثلًا: $${round.solution.workers}$ عمال و$${round.solution.hours}$ ساعات.`, `days: late. For example: $${round.solution.workers}$ workers, $${round.solution.hours}$ hours.`))} inline />
                            : <MathText text={l(say(`egun: ordu soberan. Adibidez: $${round.solution.workers}$ langile, $${round.solution.hours}$ ordu.`, `días: sobran horas. Por ejemplo: $${round.solution.workers}$ obreros, $${round.solution.hours}$ horas.`, `أيام: ساعات زائدة. مثلًا: $${round.solution.workers}$ عمال و$${round.solution.hours}$ ساعات.`, `days: hours to spare. For example: $${round.solution.workers}$ workers, $${round.solution.hours}$ hours.`))} inline />}
                </Verdict>
            )}
        </>
    )
}

const workConfig: RoundGameConfig<WorkRound> = {
    game: info('work'),
    art: <ProportionDbh2GameArt game="work" />,
    rounds: WORK_ROUNDS,
    rules: [
        say('Obrak lan-ordu kopuru jakin bat behar du: langileak bider orduak bider egunak.', 'La obra necesita unas horas de trabajo fijas: obreros por horas por días.', 'يحتاج العمل عددًا ثابتًا من ساعات العمل: العمال × الساعات × الأيام.', 'The job needs a fixed number of working hours: workers times hours times days.'),
        say('Aukeratu langileak (eta 3. mailan, orduak) obra egun horretan justu amaitzeko.', 'Elige los obreros (y en el nivel 3, las horas) para acabar justo ese día.', 'اختر العمال (وفي المستوى 3 الساعات) لإنهاء العمل في ذلك اليوم تمامًا.', 'Choose the workers (and in level 3 the hours) to finish exactly on that day.')
    ],
    create: createWorkRounds,
    stars: workStars,
    starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
    Round: WorkPlay
}

export const TagGame = (props: GameProps) => <RoundGame {...props} config={tagConfig} />
export const KindGame = (props: GameProps) => <RoundGame {...props} config={kindConfig} />
export const WorkGame = (props: GameProps) => <RoundGame {...props} config={workConfig} />
export const ProportionDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: <ProportionDbh2GameArt game="detective" />, cases: PROPORTION_DETECTIVE_CASES, createCases: createProportionDetectiveCases, names: proportionDetectiveNames, tips: proportionDetectiveTips }} />
)
