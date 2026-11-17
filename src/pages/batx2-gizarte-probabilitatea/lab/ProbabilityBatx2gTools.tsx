import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { INK, MUTED, PAPER, SECOND, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { pct, probLatex, say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { initialPipesState, litresInD, PIPES_LIMITS, PIPES_LITRES, pipesChallenges, pipesExtra, pipesPrediction, posteriorPipe, pD, setEditingPipe, setPipeRate, setPipeShare, sourceLitres, streamsOf, type PipesState } from './pipes'
import { initialSurveyState, isIndependentSurvey, keeps, personOf, pYes, pYesGivenYoung, pYoungGivenYes, setCondition, setSurvey, SURVEY_LIMITS, SURVEY_TOTAL, surveyChallenges, surveyExtra, surveyPrediction, yesOf, type SurveyCondition, type SurveyState } from './survey'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — the two tools of
   this unit: the poll (100 people, a condition that leaves only part of
   them: conditional probability and independence) and the tree of pipes
   (10 000 litres split among three sources: total probability as the
   water that reaches D, Bayes as the share of each pipe). Each asks for a
   prediction before it shows the result; the pipes move with ▶. Logic in
   survey.ts and pipes.ts.
   ========================================================================== */

/** The readout formulas in a language: Arabic writes the decimal point */
const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)

/* ---------- P-L1. The poll ---------- */

/** Fixed colours for the two groups, so they do not change with the stage tone */
const YOUNG = '#2f6fdb'
const YOUNG_TINT = '#dde7f7'
const OLD = '#7a4cc2'
const OLD_TINT = '#ece3f7'

const CONDITIONS: Array<{ value: SurveyCondition; label: ReturnType<typeof say> }> = [
    { value: 'all', label: say('Denak', 'Todos', 'الجميع', 'All') },
    { value: 'young', label: say('Gazteak', 'Jóvenes', 'الشباب', 'Young') },
    { value: 'old', label: say('Helduak', 'Adultos', 'البالغون', 'Adults') },
    { value: 'yes', label: say('Baiezkoak', 'Sí', 'نعم', 'Yes') }
]

export function SurveyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SurveyState>(initialSurveyState)
    const shown = state.prediction !== null
    const old = SURVEY_TOTAL - state.young
    const kept = Array.from({ length: SURVEY_TOTAL }, (_, index) => keeps(state.condition, personOf(state, index))).filter(Boolean).length
    const keptYes = Array.from({ length: SURVEY_TOTAL }, (_, index) => personOf(state, index)).filter((person) => keeps(state.condition, person) && person.yes).length
    const controls = (
        <>
            <Stepper label={l(say('Gazteak', 'Jóvenes', 'الشباب', 'Young'))} value={state.young} min={SURVEY_LIMITS.young.min} max={SURVEY_LIMITS.young.max} step={SURVEY_LIMITS.young.step} onChange={(young) => setState((s) => setSurvey(s, { young }))} language={props.language} />
            <Stepper label={l(say('Bai, gazteak', 'Sí, jóvenes', 'نعم، شباب', 'Yes, young'))} value={state.yesYoung} min={0} max={state.young} step={SURVEY_LIMITS.yes.step} onChange={(yesYoung) => setState((s) => setSurvey(s, { yesYoung }))} language={props.language} />
            <Stepper label={l(say('Bai, helduak', 'Sí, adultos', 'نعم، بالغون', 'Yes, adults'))} value={state.yesOld} min={0} max={old} step={SURVEY_LIMITS.yes.step} onChange={(yesOld) => setState((s) => setSurvey(s, { yesOld }))} language={props.language} />
            <Segmented<SurveyCondition> label={l(say('Baldintza', 'Condición', 'الشرط', 'Condition'))} value={state.condition} options={CONDITIONS.map((option) => ({ value: option.value, label: l(option.label) }))} onChange={(condition) => setState((s) => setCondition(s, condition))} />
        </>
    )
    const reverse = pYoungGivenYes(state)
    const latex = [
        `P(S)=\\frac{${yesOf(state)}}{100}=${probLatex(pYes(state))}`,
        `P(S/G)=\\frac{${state.yesYoung}}{${state.young}}=${probLatex(pYesGivenYoung(state))}`,
        ...(reverse === null ? [] : [`P(G/S)=\\frac{${state.yesYoung}}{${yesOf(state)}}=${probLatex(reverse)}`])
    ]
    const verdict = isIndependentSurvey(state)
        ? say('Bi taldeetan «bai» proportzio bera dago: erantzuna eta adina independenteak dira.', 'En los dos grupos hay la misma proporción de «sí»: la respuesta y la edad son independientes.', 'في المجموعتين النسبة نفسها من «نعم»: الإجابة والعمر مستقلان.', 'Both groups have the same share of ‘yes’: the answer and the age are independent.')
        : say('Gazte izateak «bai» esateko probabilitatea aldatzen du: ez dira independenteak.', 'Ser joven cambia la probabilidad de decir «sí»: no son independientes.', 'كون الشخص شابًّا يغيّر احتمال قول «نعم»: ليسا مستقلين.', 'Being young changes the probability of saying ‘yes’: they are not independent.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: gazteen artean, «bai» proportzioa ($P(S/G)$) txikiagoa, berdina ala handiagoa da guztien artean baino ($P(S)$)?', 'Antes de verlo: entre los jóvenes, ¿la proporción de «sí» ($P(S/G)$) es menor, igual o mayor que entre todos ($P(S)$)?', 'قبل أن ترى: هل نسبة «نعم» بين الشباب ($P(S/G)$) أصغر من نسبتها بين الجميع ($P(S)$) أم تساويها أم أكبر؟', 'Before you see it: among the young, is the share of ‘yes’ ($P(S/G)$) less than, equal to or greater than among everyone ($P(S)$)?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={surveyPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu bi taldeak: zein dauka «bai» proportzio handiagoa?', 'Compara los dos grupos: ¿cuál tiene más proporción de «sí»?', 'قارن المجموعتين: أيهما فيها نسبة أكبر من «نعم»؟', 'Compare the two groups: which has the bigger share of ‘yes’?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(verdict)} />
        </Predict>
    )
    const cell = 26
    const left = 50
    const top = 34
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={surveyChallenges} extraChallenges={surveyExtra} state={state}>
            <Board height={330} label={l(say('100 pertsonaren inkesta', 'La encuesta de 100 personas', 'استطلاع 100 شخص', 'The poll of 100 people'))}>
                <rect x={left - 8} y={top - 8} width={10 * cell + 16} height={(state.young / 10) * cell + 8} rx={8} fill={YOUNG_TINT} />
                <rect x={left - 8} y={top + (state.young / 10) * cell} width={10 * cell + 16} height={(old / 10) * cell + 8} rx={8} fill={OLD_TINT} />
                {Array.from({ length: SURVEY_TOTAL }, (_, index) => {
                    const person = personOf(state, index)
                    const on = keeps(state.condition, person)
                    const x = left + (index % 10) * cell + cell / 2 - 4
                    const y = top + Math.floor(index / 10) * cell + cell / 2 - 4
                    return (
                        <g key={index} opacity={on ? 1 : 0.15}>
                            <circle cx={x} cy={y - 4} r={4} fill={person.yes ? SECOND : PAPER} stroke={person.young ? YOUNG : OLD} strokeWidth={1.6} />
                            <path d={`M ${x - 7} ${y + 9} Q ${x - 7} ${y + 1} ${x} ${y + 1} Q ${x + 7} ${y + 1} ${x + 7} ${y + 9} Z`} fill={person.yes ? SECOND : PAPER} stroke={person.young ? YOUNG : OLD} strokeWidth={1.6} />
                        </g>
                    )
                })}
                <Label x={left - 14} y={top + (state.young / 10) * cell / 2 + 5} textAnchor="end" fontSize={13} fontWeight={700} fill={YOUNG}>G</Label>
                <Label x={180} y={top + 10 * cell + 26} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{shown ? l(say(`Geratzen dira: ${kept}; horietatik «bai»: ${keptYes}`, `Quedan: ${kept}; de ellos, «sí»: ${keptYes}`, `يبقى: ${kept}؛ منهم «نعم»: ${keptYes}`, `Left: ${kept}; of them, ‘yes’: ${keptYes}`)) : l(say(`Geratzen dira: ${kept}`, `Quedan: ${kept}`, `يبقى: ${kept}`, `Left: ${kept}`))}</Label>
                {!shown && <Hidden x={330} y={top + 10 * cell + 26} size={20} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- P-L2. The tree of pipes ---------- */

const PIPE_NAMES = ['A', 'B', 'C'] as const
const PIPE_COLOURS = ['#2f6fdb', '#c4432a', '#b58100'] as const

export function PipesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PipesState>(initialPipesState)
    const shown = state.prediction !== null
    const key = `${state.shares.join('-')}|${state.rates.join('-')}`
    const playback = usePlayback(key, 1800)
    const pour = !shown ? 0 : playback.progress ?? 0
    const sources = sourceLitres(state)
    const streams = streamsOf(state)
    const total = litresInD(state)
    const litres = (value: number) => groupDigits(value, props.language)
    const percent = (value: number) => pct(value, props.language)
    const controls = (
        <>
            <Stepper label="A" value={state.shares[0]} min={PIPES_LIMITS.share.min} max={PIPES_LIMITS.share.max} step={PIPES_LIMITS.share.step} format={percent} onChange={(share) => setState((s) => setPipeShare(s, 0, share))} language={props.language} />
            <Stepper label="B" value={state.shares[1]} min={PIPES_LIMITS.share.min} max={PIPES_LIMITS.share.max} step={PIPES_LIMITS.share.step} format={percent} onChange={(share) => setState((s) => setPipeShare(s, 1, share))} language={props.language} />
            <Segmented<string> label={l(say('Hodia', 'Tubo', 'الأنبوب', 'Pipe'))} value={String(state.editing)} options={PIPE_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(value) => setState((s) => setEditingPipe(s, Number(value) as 0 | 1 | 2))} />
            <Stepper label={`P(D / ${PIPE_NAMES[state.editing]})`} value={state.rates[state.editing]} min={PIPES_LIMITS.rate.min} max={PIPES_LIMITS.rate.max} format={percent} onChange={(rate) => setState((s) => setPipeRate(s, s.editing, rate))} language={props.language} />
        </>
    )
    const latex = [`P(D)=\\frac{${total}}{${PIPES_LITRES}}=${probLatex(pD(state))}`, ...(total === 0 ? [] : PIPE_NAMES.map((name, index) => `P(${name}/D)=${probLatex(posteriorPipe(state, index)!)}`))]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zein hoditik iristen da ur gehien D andelera?', 'Antes de verlo: ¿por qué tubo llega más agua al depósito D?', 'قبل أن ترى: من أي أنبوب يصل أكثر ماء إلى الخزان D؟', 'Before you see it: down which pipe does most water reach tank D?')}
            labels={{ '<': say('A', 'A', 'A', 'A'), '=': say('B', 'B', 'B', 'B'), '>': say('C', 'C', 'C', 'C') }}
            actual={pipesPrediction(state)}
            choice={state.prediction}
            tip={say('Hodi bakoitzak D-ra bidaltzen duena: haren ura bider haren tasa.', 'Lo que cada tubo manda a D: su agua por su tasa.', 'ما يرسله كل أنبوب إلى D: ماؤه في نسبته.', 'What each pipe sends to D: its water times its rate.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('D-ra iristen den ur guztia probabilitate osoa da; hodi bakoitzak jarritako zatia, Bayes.', 'Toda el agua que llega a D es la probabilidad total; la parte que pone cada tubo, Bayes.', 'كل الماء الذي يصل إلى D هو الاحتمال الكلي، والجزء الذي يضعه كل أنبوب هو بايز.', 'All the water that reaches D is the total probability; the part each pipe puts in, Bayes.'))} />
        </Predict>
    )
    const xs = [60, 180, 300]
    const width = (value: number, most: number, widest: number) => Math.max(1.5, (value / most) * widest)
    const tank = { x: 30, y: 282, width: 300, height: 26 }
    const before = (index: number) => streams.slice(0, index).reduce((sum, value) => sum + value, 0)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pipesChallenges} extraChallenges={pipesExtra} state={state}>
            <Board height={330} label={l(say('Hodien zuhaitza', 'El árbol de tuberías', 'شجرة الأنابيب', 'The tree of pipes'))}>
                <rect x={130} y={8} width={100} height={30} rx={8} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                <text x={180} y={29} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{litres(PIPES_LITRES)} L</text>
                {xs.map((x, index) => (
                    <g key={PIPE_NAMES[index]}>
                        <line x1={180} y1={38} x2={x} y2={104} stroke={PIPE_COLOURS[index]} strokeOpacity={0.55} strokeWidth={width(sources[index], 10000, 34)} strokeLinecap="round" />
                        <rect x={x - 26} y={104} width={52} height={40} rx={8} fill={PAPER} stroke={PIPE_COLOURS[index]} strokeWidth={2} />
                        <text x={x} y={122} textAnchor="middle" fontSize={15} fontWeight={700} fill={PIPE_COLOURS[index]}>{PIPE_NAMES[index]}</text>
                        <text x={x} y={138} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{litres(sources[index])}</text>
                        <line x1={x} y1={144} x2={180} y2={222} stroke={PIPE_COLOURS[index]} strokeWidth={width(streams[index], 3000, 18)} strokeLinecap="round" />
                        <text x={(x + 180) / 2 + (index === 1 ? 14 : index === 0 ? -14 : 14)} y={186} textAnchor="middle" fontSize={12} fontWeight={700} fill={PIPE_COLOURS[index]}>{litres(streams[index])}</text>
                    </g>
                ))}
                <rect x={150} y={222} width={60} height={34} rx={8} fill={PAPER} stroke={INK} strokeWidth={2} />
                <text x={180} y={244} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>D</text>
                <rect x={tank.x} y={tank.y} width={tank.width} height={tank.height} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                {shown && total > 0 && streams.map((stream, index) => (
                    <rect key={index} x={tank.x + (tank.width * before(index)) / total} y={tank.y} width={(tank.width * stream * pour) / total} height={tank.height} fill={PIPE_COLOURS[index]} fillOpacity={0.6} />
                ))}
                {shown && pour === 1 && total > 0 && streams.map((stream, index) => stream > 0 && (tank.width * stream) / total > 28 && (
                    <text key={index} x={tank.x + (tank.width * (before(index) + stream / 2)) / total} y={tank.y + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{PIPE_NAMES[index]}</text>
                ))}
                <text x={tank.x + tank.width + 8} y={tank.y + 18} fontSize={13} fontWeight={700} fill={INK}>{shown ? litres(total) : ''}</text>
                {!shown && <Hidden x={tank.x + tank.width / 2} y={tank.y + 21} size={22} />}
            </Board>
            <PlayButton label={l(say('Bildu D-ko ura', 'Junta el agua de D', 'اجمع ماء D', 'Gather the water in D'))} disabled={!shown || total === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
