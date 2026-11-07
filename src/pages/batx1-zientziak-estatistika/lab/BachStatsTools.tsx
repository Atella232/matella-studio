import { useRef, useState, type PointerEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { initialTailState, selectTail, setTailCount, TAIL_COUNT_MAX, TAIL_VALUES, tailChallenges, tailExtra, tailMedian, tailModes, tailPercentile, tailPrediction, tailSum, tailTotal, type TailState } from './histogramTail'
import { allData, DATUM_LIMITS, FIXED_TIMES, initialOutlierState, limitsOf, meanOf, outlierChallenges, outlierExtra, outlierKind, outlierPrediction, setOutlier, sigmaOf, type OutlierRule, type OutlierState } from './outlierBand'
import { halfLatex, initialScoreState, SCORE_LIMITS, scoreChallenges, scoreExtra, scorePrediction, setEditing, setScore, zLatex, zScore, zValue, type ScoreState } from './standardScore'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Zientziak — the three
   tools of this unit: the standard score (two marks on their rulers, then
   lined up in standard deviations), «outlier or not?» (a datum dragged
   along the axis with the band x̄ ± 3σ or the fences of the box) and the
   tail of the histogram (bars that pull the mean away from the median).
   Each asks for a prediction before it shows the result; the first two
   move with ▶. Logic in standardScore.ts, outlierBand.ts and
   histogramTail.ts.
   ========================================================================== */

const minus = (text: string) => text.replace(/^-/, '−')

/* ---------- L1. The standard score ---------- */

const NAMES = ['A', 'B'] as const
const GROUP_COLOURS = [STAGE, SECOND] as const
const GROUP_TINTS = [STAGE_TINT, SECOND_TINT] as const

export function StandardScoreTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ScoreState>(initialScoreState)
    const shown = state.prediction !== null
    const key = state.groups.map((group) => `${group.mean}-${group.sd}-${group.mark}`).join('|')
    const playback = usePlayback(key, 1600)
    // Before predicting, both marks sit on a ruler of marks 0–10; afterwards (or while ▶ runs) the rulers line up in σ
    const blend = !shown ? 0 : playback.playing && playback.progress !== null ? playback.progress : 1
    const raw = (halves: number) => 20 + halves * 16
    const aligned = (z: number) => 180 + Math.max(-3.5, Math.min(3.5, z)) * 44
    const at = (group: (typeof state.groups)[number], halves: number) => raw(halves) * (1 - blend) + aligned((halves - group.mean) / group.sd) * blend
    const editing = state.groups[state.editing]
    const format = (halves: number) => dec(halves / 2, props.language, 1)
    const controls = (
        <>
            <Segmented<string> label={l(say('Aldatu', 'Cambiar', 'غيّر', 'Change'))} value={String(state.editing)} options={NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(value) => setState((s) => setEditing(s, Number(value) as 0 | 1))} />
            <Stepper label={l(say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'))} value={editing.mean} min={SCORE_LIMITS.mean.min} max={SCORE_LIMITS.mean.max} format={format} onChange={(mean) => setState((s) => setScore(s, s.editing, { mean }))} language={props.language} />
            <Stepper label="σ" value={editing.sd} min={SCORE_LIMITS.sd.min} max={SCORE_LIMITS.sd.max} format={format} onChange={(sd) => setState((s) => setScore(s, s.editing, { sd }))} language={props.language} />
            <Stepper label={l(say('Nota', 'Nota', 'العلامة', 'Mark'))} value={editing.mark} min={SCORE_LIMITS.mark.min} max={SCORE_LIMITS.mark.max} format={format} onChange={(mark) => setState((s) => setScore(s, s.editing, { mark }))} language={props.language} />
        </>
    )
    const latex = state.groups.map((group, index) => `z_${NAMES[index]}=\\frac{${halfLatex(group.mark)}-${halfLatex(group.mean)}}{${halfLatex(group.sd)}}=${zLatex(zScore(group))}`)
    const prediction = scorePrediction(state)
    const verdict = prediction === '='
        ? say('Biek puntuazio tipiko bera dute: berdin nabarmentzen dira.', 'Las dos tienen la misma puntuación típica: destacan lo mismo.', 'للعلامتين الدرجة المعيارية نفسها: تتميّزان بالقدر نفسه.', 'Both have the same standard score: they stand out the same.')
        : prediction === '<'
            ? say('A notak puntuazio tipiko handiagoa du: gehiago nabarmentzen da bere taldean.', 'La nota A tiene mayor puntuación típica: destaca más en su grupo.', 'للعلامة A درجة معيارية أكبر: تتميّز أكثر في مجموعتها.', 'Mark A has the larger standard score: it stands out more in its group.')
            : say('B notak puntuazio tipiko handiagoa du: gehiago nabarmentzen da bere taldean.', 'La nota B tiene mayor puntuación típica: destaca más en su grupo.', 'للعلامة B درجة معيارية أكبر: تتميّز أكثر في مجموعتها.', 'Mark B has the larger standard score: it stands out more in its group.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zein notak nabarmentzen du gehiago bere taldean?', 'Antes de verlo: ¿qué nota destaca más en su grupo?', 'قبل أن ترى: أي علامة تتميّز أكثر في مجموعتها؟', 'Before you see it: which mark stands out more in its group?')}
            labels={{ '<': say('A', 'A', 'A', 'A'), '=': say('Berdin', 'Igual', 'بالقدر نفسه', 'The same'), '>': say('B', 'B', 'B', 'B') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Ez begiratu notari bakarrik: zenbat desbideratze tipiko dago batez bestekotik?', 'No mires solo la nota: ¿cuántas desviaciones típicas hay hasta la media?', 'لا تنظر إلى العلامة وحدها: كم انحرافًا معياريًّا تبعد عن المتوسط؟', 'Do not look at the mark alone: how many standard deviations is it from the mean?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(verdict)} />
        </Predict>
    )
    const rows = [64, 148]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={scoreChallenges} extraChallenges={scoreExtra} state={state}>
            <Board height={250} label={l(say('Bi notak beren erregeletan', 'Las dos notas en sus reglas', 'العلامتان على مسطرتيهما', 'The two marks on their rulers'))}>
                {state.groups.map((group, index) => {
                    const y = rows[index]
                    const ticks = blend === 1
                        ? [-3, -2, -1, 0, 1, 2, 3].map((z) => ({ x: aligned(z), text: minus(dec((group.mean + z * group.sd) / 2, props.language, 2)), main: z === 0 }))
                        : [0, 2, 4, 6, 8, 10].map((mark) => ({ x: raw(mark * 2), text: String(mark), main: false }))
                    const markX = at(group, group.mark)
                    const meanX = at(group, group.mean)
                    const left = at(group, group.mean - group.sd)
                    const right = at(group, group.mean + group.sd)
                    return (
                        <g key={index}>
                            <text x={8} y={y - 22} fontSize={15} fontWeight={700} fill={GROUP_COLOURS[index]}>{NAMES[index]}</text>
                            <line x1={14} x2={346} y1={y} y2={y} stroke={INK} strokeWidth={1.6} />
                            {ticks.map((tick) => (
                                <g key={`${tick.x}`}>
                                    <line x1={tick.x} x2={tick.x} y1={y - 4} y2={y + 4} stroke={INK} strokeWidth={1.2} />
                                    <text x={tick.x} y={y + 17} textAnchor="middle" fontSize={10} fontWeight={tick.main ? 700 : 400} fill={tick.main ? GREEN : MUTED}>{tick.text}</text>
                                </g>
                            ))}
                            <rect x={Math.min(left, right)} y={y - 18} width={Math.abs(right - left)} height={8} rx={4} fill={GROUP_TINTS[index]} stroke={GROUP_COLOURS[index]} strokeWidth={1} />
                            <text x={(left + right) / 2} y={y - 23} textAnchor="middle" fontSize={10} fill={MUTED}>± σ</text>
                            <polygon points={`${meanX},${y - 2} ${meanX - 6},${y - 10} ${meanX + 6},${y - 10}`} fill={GREEN} />
                            <circle cx={markX} cy={y} r={7} fill={GROUP_TINTS[index]} stroke={GROUP_COLOURS[index]} strokeWidth={2.2} />
                            {shown && blend === 1 && <line x1={markX} x2={markX} y1={y + 8} y2={214} stroke={GROUP_COLOURS[index]} strokeWidth={1.2} strokeDasharray="4 3" />}
                        </g>
                    )
                })}
                {shown && blend === 1 && (
                    <g>
                        <line x1={aligned(-3.5)} x2={aligned(3.5)} y1={214} y2={214} stroke={GREEN} strokeWidth={1.8} />
                        {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
                            <g key={z}>
                                <line x1={aligned(z)} x2={aligned(z)} y1={210} y2={218} stroke={GREEN} strokeWidth={1.4} />
                                <text x={aligned(z)} y={234} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN}>{minus(String(z))}</text>
                            </g>
                        ))}
                        <text x={14} y={234} fontSize={12} fontWeight={700} fill={GREEN}>z</text>
                    </g>
                )}
                {!shown && <Hidden x={180} y={226} size={30} />}
            </Board>
            <PlayButton label={l(say('Lerrokatu σ-tan', 'Alinear en σ', 'حاذِ بـ σ', 'Line up in σ'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>
                {l(say(`A: ${zValue(state.groups[0]) >= 0 ? 'batez bestekoaren gainetik' : 'batez bestekoaren azpitik'} · B: ${zValue(state.groups[1]) >= 0 ? 'gainetik' : 'azpitik'}`, `A: ${zValue(state.groups[0]) >= 0 ? 'por encima de su media' : 'por debajo de su media'} · B: ${zValue(state.groups[1]) >= 0 ? 'por encima' : 'por debajo'}`, `A: ${zValue(state.groups[0]) >= 0 ? 'فوق متوسطها' : 'تحت متوسطها'} · B: ${zValue(state.groups[1]) >= 0 ? 'فوق' : 'تحت'}`, `A: ${zValue(state.groups[0]) >= 0 ? 'above its mean' : 'below its mean'} · B: ${zValue(state.groups[1]) >= 0 ? 'above' : 'below'}`))}
            </p>
        </ToolFrame>
    )
}

/* ---------- L2. Outlier or not? ---------- */

const AXIS = { left: 20, right: 340 }
const toX = (value: number) => AXIS.left + ((value - DATUM_LIMITS.min) / (DATUM_LIMITS.max - DATUM_LIMITS.min)) * (AXIS.right - AXIS.left)

export function OutlierTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<OutlierState>(initialOutlierState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.datum}-${state.rule}`, 4000)
    // While ▶ runs, the datum runs from 0 to 50 and the band follows it; then it goes back to the learner's datum
    const datum = playback.playing && playback.progress !== null ? Math.round(DATUM_LIMITS.min + (DATUM_LIMITS.max - DATUM_LIMITS.min) * playback.progress) : state.datum
    const data = allData(datum)
    const mean = meanOf(data)
    const sigma = sigmaOf(data)
    const [low, high] = limitsOf(datum, state.rule)
    const kind = outlierKind(datum, state.rule)
    const dragging = useRef(false)
    const moveTo = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - box.left) / box.width) * 360
        const value = DATUM_LIMITS.min + ((x - AXIS.left) / (AXIS.right - AXIS.left)) * (DATUM_LIMITS.max - DATUM_LIMITS.min)
        setState((s) => setOutlier(s, { datum: value }))
    }
    const controls = (
        <>
            <Segmented<OutlierRule> label={l(say('Araua', 'Regla', 'القاعدة', 'Rule'))} value={state.rule} options={[{ value: 'sigma', label: 'x̄ ± 3σ' }, { value: 'box', label: l(say('Kutxa', 'Caja', 'الصندوق', 'Box')) }]} onChange={(rule) => setState((s) => setOutlier(s, { rule }))} />
            <Stepper label={l(say('Datua', 'Dato', 'البيان', 'Datum'))} value={state.datum} min={DATUM_LIMITS.min} max={DATUM_LIMITS.max} onChange={(value) => setState((s) => setOutlier(s, { datum: value }))} language={props.language} />
        </>
    )
    const limitsLatex = state.rule === 'sigma'
        ? [`\\bar{x}\\approx ${texDec(mean, props.language, 2)}\\qquad\\sigma\\approx ${texDec(sigma, props.language, 2)}`, `\\bar{x}\\pm 3\\sigma\\ \\to\\ ${texDec(low, props.language, 1)}\\ \\ldots\\ ${texDec(high, props.language, 1)}`]
        : [`Q_1=${texDec(low + 1.5 * ((high - low) / 4), props.language, 2)}\\qquad Q_3=${texDec(high - 1.5 * ((high - low) / 4), props.language, 2)}`, `${texDec(low, props.language, 2)}\\ \\ldots\\ ${texDec(high, props.language, 2)}`]
    const verdict = kind === '='
        ? say(`${datum} datua mugen barruan dago: ez da atipikoa.`, `El dato ${datum} está dentro de los límites: no es atípico.`, `البيان ${datum} داخل الحدّين: ليس شاذًّا.`, `The datum ${datum} is inside the limits: it is not an outlier.`)
        : kind === '>'
            ? say(`${datum} datuak goiko muga gainditzen du: atipikoa da.`, `El dato ${datum} pasa del límite superior: es atípico.`, `البيان ${datum} يتجاوز الحد الأعلى: إنه شاذ.`, `The datum ${datum} is past the upper limit: it is an outlier.`)
            : say(`${datum} datua beheko mugaren azpitik dago: atipikoa da.`, `El dato ${datum} está por debajo del límite inferior: es atípico.`, `البيان ${datum} تحت الحد الأدنى: إنه شاذ.`, `The datum ${datum} is below the lower limit: it is an outlier.`)
    const readout = (
        <Predict
            language={props.language}
            question={state.rule === 'sigma'
                ? say(`Ikusi aurretik: atipikoa al da ${state.datum} datua $\\bar{x}\\pm 3\\sigma$ arauarekin?`, `Antes de verlo: ¿es atípico el dato ${state.datum} con la regla $\\bar{x}\\pm 3\\sigma$?`, `قبل أن ترى: هل البيان ${state.datum} شاذ بقاعدة $\\bar{x}\\pm 3\\sigma$؟`, `Before you see it: is the datum ${state.datum} an outlier with the $\\bar{x}\\pm 3\\sigma$ rule?`)
                : say(`Ikusi aurretik: atipikoa al da ${state.datum} datua kutxaren arauarekin?`, `Antes de verlo: ¿es atípico el dato ${state.datum} con la regla de la caja?`, `قبل أن ترى: هل البيان ${state.datum} شاذ بقاعدة الصندوق؟`, `Before you see it: is the datum ${state.datum} an outlier with the box rule?`)}
            labels={{ '<': say('Bai, behetik', 'Sí, por abajo', 'نعم، من الأسفل', 'Yes, below'), '=': say('Ez', 'No', 'لا', 'No'), '>': say('Bai, goitik', 'Sí, por arriba', 'نعم، من الأعلى', 'Yes, above') }}
            actual={outlierPrediction(state)}
            choice={state.prediction}
            tip={say('Gogoratu datua bera ere kalkuluan sartzen dela: urrun badago, $\\sigma$ handitzen du.', 'Recuerda que el propio dato entra en el cálculo: si está lejos, agranda $\\sigma$.', 'تذكّر أن البيان نفسه يدخل في الحساب: إذا كان بعيدًا كبّر $\\sigma$.', 'Remember the datum itself goes into the calculation: if it is far away, it makes $\\sigma$ bigger.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={limitsLatex} note={l(verdict)} />
        </Predict>
    )
    const stack = new Map<number, number>()
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={outlierChallenges} extraChallenges={outlierExtra} state={state}>
            <div
                style={{ touchAction: 'none', cursor: 'ew-resize' }}
                onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); moveTo(event) }}
                onPointerMove={(event) => { if (dragging.current) moveTo(event) }}
                onPointerUp={() => { dragging.current = false }}
                onPointerCancel={() => { dragging.current = false }}
            >
                <Board height={200} label={l(say('Hemeretzi denbora eta mugitzen den datu bat', 'Diecinueve tiempos y un dato que se mueve', 'تسعة عشر زمنًا وبيان يتحرك', 'Nineteen times and one datum that moves'))}>
                    {shown && (
                        <g>
                            <rect x={toX(Math.max(DATUM_LIMITS.min - 4, low))} y={36} width={Math.max(0, toX(Math.min(DATUM_LIMITS.max + 4, high)) - toX(Math.max(DATUM_LIMITS.min - 4, low)))} height={110} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />
                            {state.rule === 'sigma' && <line x1={toX(mean)} x2={toX(mean)} y1={36} y2={146} stroke={GREEN} strokeWidth={1.4} strokeDasharray="5 4" />}
                            {low >= DATUM_LIMITS.min - 4 && <text x={toX(low)} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN}>{minus(dec(low, props.language, 1))}</text>}
                            {high <= DATUM_LIMITS.max + 4 && <text x={toX(high)} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN}>{dec(high, props.language, 1)}</text>}
                        </g>
                    )}
                    {FIXED_TIMES.map((value, index) => {
                        const level = stack.get(value) ?? 0
                        stack.set(value, level + 1)
                        return <circle key={index} cx={toX(value)} cy={136 - level * 11} r={5} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.4} />
                    })}
                    <line x1={AXIS.left} x2={AXIS.right} y1={150} y2={150} stroke={INK} strokeWidth={1.6} />
                    {[0, 10, 20, 30, 40, 50].map((value) => (
                        <g key={value}>
                            <line x1={toX(value)} x2={toX(value)} y1={146} y2={154} stroke={INK} strokeWidth={1.2} />
                            <text x={toX(value)} y={190} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                        </g>
                    ))}
                    <circle cx={toX(datum)} cy={168} r={9} fill={shown && kind !== '=' ? SECOND_TINT : PAPER} stroke={SECOND} strokeWidth={2.4} />
                    <line x1={toX(datum)} x2={toX(datum)} y1={150} y2={159} stroke={SECOND} strokeWidth={2} />
                    <text x={toX(datum)} y={172} textAnchor="middle" fontSize={9} fontWeight={700} fill={SECOND}>{datum}</text>
                    {!shown && <Hidden x={180} y={80} size={30} />}
                </Board>
            </div>
            <PlayButton label={l(say('Mugitu datua 0 eta 50 artean', 'Mueve el dato de 0 a 50', 'حرّك البيان من 0 إلى 50', 'Move the datum from 0 to 50'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Arrastatu datu gorria ardatzean zehar.', 'Arrastra el dato rojo por el eje.', 'اسحب البيان الأحمر على المحور.', 'Drag the red datum along the axis.'))}</p>
        </ToolFrame>
    )
}

/* ---------- L3. The tail of the histogram ---------- */

const barX = (value: number) => 42 + value * 46

export function HistogramTailTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TailState>(initialTailState)
    const shown = state.prediction !== null
    const total = tailTotal(state.counts)
    const sum = tailSum(state.counts)
    const mean = sum / total
    const median = tailMedian(state.counts)
    const modes = tailModes(state.counts)
    const q1 = tailPercentile(state.counts, 25)
    const q3 = tailPercentile(state.counts, 75)
    const present = TAIL_VALUES.filter((value) => state.counts[value] > 0)
    const prediction = tailPrediction(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Barra', 'Barra', 'العمود', 'Bar'))} value={String(state.selected)} options={TAIL_VALUES.map((value) => ({ value: String(value), label: String(value) }))} onChange={(value) => setState((s) => selectTail(s, Number(value)))} />
            <Stepper label={l(say('Maiztasuna', 'Frecuencia', 'التكرار', 'Frequency'))} value={state.counts[state.selected]} min={0} max={TAIL_COUNT_MAX} onChange={(count) => setState((s) => setTailCount(s, s.selected, count))} language={props.language} />
        </>
    )
    const shape = prediction === '>'
        ? say('Batez bestekoa medianaren eskuinean: isatsa eskuinean dago.', 'La media, a la derecha de la mediana: la cola está a la derecha.', 'المتوسط يمين الوسيط: الذيل في اليمين.', 'The mean is to the right of the median: the tail is on the right.')
        : prediction === '<'
            ? say('Batez bestekoa medianaren ezkerrean: isatsa ezkerrean dago.', 'La media, a la izquierda de la mediana: la cola está a la izquierda.', 'المتوسط يسار الوسيط: الذيل في اليسار.', 'The mean is to the left of the median: the tail is on the left.')
            : say('Batez bestekoa eta mediana bat datoz.', 'La media y la mediana coinciden.', 'المتوسط والوسيط متساويان.', 'The mean and the median are the same.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: non dago batez bestekoa medianarekiko?', 'Antes de verlo: ¿dónde queda la media respecto a la mediana?', 'قبل أن ترى: أين يقع المتوسط بالنسبة إلى الوسيط؟', 'Before you see it: where is the mean compared with the median?')}
            labels={{ '<': say('Ezkerrean', 'A la izquierda', 'يساره', 'To the left'), '=': say('Leku berean', 'En el mismo sitio', 'في المكان نفسه', 'In the same place'), '>': say('Eskuinean', 'A la derecha', 'يمينه', 'To the right') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Begiratu isatsari: datu gutxi batzuk urrun badaude, batez bestekoa haiengana mugitzen da.', 'Mira la cola: si unos pocos datos están lejos, la media se va hacia ellos.', 'انظر إلى الذيل: إذا كانت بيانات قليلة بعيدة اتجه المتوسط نحوها.', 'Look at the tail: if a few data are far away, the mean moves towards them.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={[`\\bar{x}=\\frac{${sum}}{${total}}\\approx ${texDec(mean, props.language, 2)}\\qquad Me=${texDec(median, props.language, 1)}`, `Mo=${modes.join(',\\ ')}`]} note={l(shape)} />
        </Predict>
    )
    const base = 150
    const unit = 12
    const boxY = 196
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tailChallenges} extraChallenges={tailExtra} state={state}>
            <Board height={230} label={l(say('Hilabete batean irakurritako liburuak', 'Libros leídos en un mes', 'الكتب المقروءة في شهر', 'Books read in a month'))}>
                {TAIL_VALUES.map((value) => {
                    const count = state.counts[value]
                    const selected = value === state.selected
                    const mode = shown && modes.includes(value)
                    return (
                        <g key={value} style={{ cursor: 'pointer' }} onClick={() => setState((s) => selectTail(s, value))}>
                            <rect x={barX(value) - 21} y={base - TAIL_COUNT_MAX * unit - 6} width={42} height={TAIL_COUNT_MAX * unit + 30} fill="transparent" />
                            <rect x={barX(value) - 18} y={base - count * unit} width={36} height={count * unit} fill={mode ? SECOND_TINT : STAGE_TINT} stroke={selected ? INK : mode ? SECOND : STAGE} strokeWidth={selected ? 2.6 : 1.4} />
                            <text x={barX(value)} y={base - count * unit - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK}>{count}</text>
                            <text x={barX(value)} y={base + 15} textAnchor="middle" fontSize={12} fontWeight={selected ? 700 : 400} fill={selected ? INK : MUTED}>{value}</text>
                        </g>
                    )
                })}
                <line x1={14} x2={346} y1={base} y2={base} stroke={INK} strokeWidth={1.6} />
                {shown && (
                    <g>
                        <line x1={barX(median)} x2={barX(median)} y1={20} y2={base} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                        <text x={barX(median)} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND}>Me</text>
                        <polygon points={`${barX(mean)},${base + 2} ${barX(mean) - 7},${base + 14} ${barX(mean) + 7},${base + 14}`} fill={GREEN} />
                        <text x={barX(mean)} y={base + 27} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN}>x̄</text>
                        <line x1={barX(present[0])} x2={barX(q1)} y1={boxY + 12} y2={boxY + 12} stroke={INK} strokeWidth={1.6} />
                        <line x1={barX(q3)} x2={barX(present[present.length - 1])} y1={boxY + 12} y2={boxY + 12} stroke={INK} strokeWidth={1.6} />
                        <rect x={barX(q1)} y={boxY} width={Math.max(2, barX(q3) - barX(q1))} height={24} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <line x1={barX(median)} x2={barX(median)} y1={boxY} y2={boxY + 24} stroke={SECOND} strokeWidth={2.4} />
                    </g>
                )}
                {!shown && <Hidden x={180} y={214} size={26} />}
            </Board>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say(`${total} datu. Sakatu barra bat, eta aldatu haren maiztasuna.`, `${total} datos. Toca una barra y cambia su frecuencia.`, `${total} بيانًا. المس عمودًا وغيّر تكراره.`, `${total} data. Tap a bar and change its frequency.`))}</p>
        </ToolFrame>
    )
}
