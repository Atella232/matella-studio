import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { AXIS_SETS, AXIS_STEP, axisChallenges, axisExtra, axisMax, axisPrediction, initialAxisState, lookRatio, setAxis, trueRatio, type AxisState } from './axis'
import { initialNeededState, MARK_SETS, neededChallenges, neededExtra, neededMarks, neededMean, neededMedian, neededPrediction, setNeeded, type NeededState } from './needed'
import { setPrediction } from './prediction'
import { fans, initialSampleState, POPULATION, SAMPLE_LIMITS, sampleChallenges, sampleExtra, sampleFans, sampleOf, samplePercent, samplePrediction, setSample, type SampleState } from './sample'
import { initialSpinnerState, redProbability, sectors, setSpinner, SPINS, spinnerChallenges, spinnerExtra, spinnerPrediction, spinReds, type SpinnerState } from './spinner'

/* ==========================================================================
   Estatistika eta probabilitatea · 3. DBH — the four tools of this unit:
   a random sample of a school, a chart whose axis does not start at 0,
   the seesaw of the mean (which mark do I need?) and a spinner painted by
   the learner. Each asks for a prediction before it shows the result,
   and each moves with ▶. The board, the readout and the prediction come
   from Segidak 3. DBH.
   ========================================================================== */

const percent = (value: number, language: LabToolProps['language']) => (language === 'en' ? `${dec(value, language, 1)}%` : `% ${dec(value, language, 1)}`)

/* ---------- L1. The sample ---------- */

export function SampleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SampleState>(initialSampleState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.size}-${state.draw}`, 2200)
    const picked = sampleOf(state)
    const visible = playback.playing ? picked.slice(0, Math.round((playback.progress ?? 0) * picked.length)) : picked
    const chosen = new Set(shown ? visible : [])
    const count = sampleFans(state)
    const value = samplePercent(state)
    const column = (index: number) => 26 + (index % 20) * 16
    const row = (index: number) => 22 + Math.floor(index / 20) * 16
    const controls = (
        <>
            <Stepper label={l(say('Laginaren tamaina', 'Tamaño de la muestra', 'حجم العيّنة', 'Sample size'))} value={state.size} min={SAMPLE_LIMITS.size.min} max={SAMPLE_LIMITS.size.max} step={SAMPLE_LIMITS.size.step} onChange={(size) => setState((s) => setSample(s, { size }))} language={props.language} />
            <Stepper label={l(say('Lagin zenbakia', 'Muestra número', 'رقم العيّنة', 'Sample number'))} value={state.draw} min={SAMPLE_LIMITS.draw.min} max={SAMPLE_LIMITS.draw.max} onChange={(draw) => setState((s) => setSample(s, { draw }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: laginak % 35 baino gutxiago, % 35 eta % 45 artean ala % 45 baino gehiago emango du?', 'Antes de verlo: ¿la muestra dará menos del 35 %, entre el 35 % y el 45 % o más del 45 %?', 'قبل رؤيتها: هل تعطي العيّنة أقل من 35 % أم بين 35 % و45 % أم أكثر من 45 %؟', 'Before you see it: will the sample give less than 35%, between 35% and 45%, or more than 45%?')}
            labels={{ '<': say('% 35 baino gutxiago', 'Menos del 35 %', 'أقل من 35 %', 'Under 35%'), '=': say('% 35–45', 'Entre 35 y 45 %', 'بين 35 و45 %', '35–45%'), '>': say('% 45 baino gehiago', 'Más del 45 %', 'أكثر من 45 %', 'Over 45%') }}
            actual={samplePrediction(state)}
            choice={state.prediction}
            tip={say('Lagin txikiek huts handiak egin ditzakete; handiak % 40 baliotik hurbil geratzen dira.', 'Las muestras pequeñas pueden fallar mucho; las grandes se quedan cerca del 40 %.', 'العيّنات الصغيرة قد تخطئ كثيرًا؛ والكبيرة تبقى قريبة من 40 %.', 'Small samples can miss by a lot; large ones stay close to 40%.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\frac{${count}}{${state.size}}\\cdot 100=${texDec(value, props.language, 1)}`]}
                note={l(say(`Populazioa: ${POPULATION} ikasle, % 40 futbolzaleak. Laginak ${percent(value, 'eu')} eman du.`, `Población: ${POPULATION} alumnos, el 40 % futboleros. La muestra ha dado el ${percent(value, 'es').replace('% ', '')} %.`, `المجتمع: ${POPULATION} طالب، 40 % منهم يحبون كرة القدم. أعطت العيّنة ${dec(value, 'ar', 1)} %.`, `Population: ${POPULATION} pupils, 40% football fans. The sample gave ${percent(value, 'en')}.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={sampleChallenges} extraChallenges={sampleExtra} state={state}>
            <Board height={250} label={l(say(`${state.size} ikasleko lagina`, `Muestra de ${state.size} alumnos`, `عيّنة من ${state.size} طالبًا`, `Sample of ${state.size} pupils`))}>
                {fans.map((fan, index) => {
                    const inSample = chosen.has(index)
                    return <circle key={index} cx={column(index)} cy={row(index)} r={inSample ? 6.2 : 4.6} fill={fan ? (inSample ? SECOND : SECOND_TINT) : inSample ? STAGE : STAGE_TINT} stroke={inSample ? INK : 'none'} strokeWidth={1} />
                })}
                <text x={26} y={196} fontSize={12} fontWeight={700} fill={MUTED}>{`0`}</text>
                <rect x={40} y={186} width={280} height={14} rx={4} fill="var(--line, #e6dfd1)" />
                <rect x={40} y={186} width={280 * 0.4} height={14} rx={4} fill={SECOND_TINT} />
                <line x1={40 + 280 * 0.4} x2={40 + 280 * 0.4} y1={180} y2={206} stroke={SECOND} strokeWidth={2} />
                <text x={40 + 280 * 0.4} y={176} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND}>40</text>
                <text x={330} y={198} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>100</text>
                {shown
                    ? (
                        <>
                            <rect x={40} y={216} width={(280 * value) / 100} height={14} rx={4} fill={GREEN} opacity={playback.playing ? 0.35 : 1} />
                            <text x={44 + (280 * value) / 100} y={228} fontSize={12} fontWeight={700} fill={GREEN}>{dec(value, props.language, 1)}</text>
                        </>
                    )
                    : <Hidden x={180} y={232} size={20} />}
            </Board>
            <PlayButton label={l(say('Aukeratu lagina', 'Elige la muestra', 'اختر العيّنة', 'Pick the sample'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The misleading axis ---------- */

export function AxisTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AxisState>(initialAxisState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.set}-${state.start}`, 1600)
    const start = playback.playing ? (playback.progress ?? 0) * state.start : state.start
    const [a, b] = AXIS_SETS[state.set]
    const top = b * 1.1
    const base = 230
    const height = (value: number) => ((value - start) / (top - start)) * 190
    const ticks = Array.from({ length: 5 }, (_, index) => start + ((top - start) * index) / 4)
    const controls = (
        <>
            <Segmented label={l(say('Datuak', 'Datos', 'البيانات', 'Data'))} value={String(state.set)} options={AXIS_SETS.map(([x, y], index) => ({ value: String(index), label: `${x} · ${y}` }))} onChange={(value) => setState((s) => setAxis(s, { set: Number(value) }))} />
            <Stepper label={l(say('Ardatza hemen hasten da', 'El eje empieza en', 'يبدأ المحور عند', 'The axis starts at'))} value={state.start} min={0} max={axisMax(state.set)} step={AXIS_STEP} onChange={(value) => setState((s) => setAxis(s, { start: value }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: B-k A baino bi aldiz altuagoa dirudi baino gutxiago, justu bi aldiz ala gehiago?', 'Antes de verlo: ¿B parecerá menos del doble de alta que A, justo el doble o más?', 'قبل رؤيته: هل يبدو B أقل من ضعف A أم ضعفه تمامًا أم أكثر؟', 'Before you see it: will B look less than twice as tall as A, exactly twice or more?')}
            labels={{ '<': say('Bikoitza baino gutxiago', 'Menos del doble', 'أقل من الضعف', 'Less than twice'), '=': say('Justu bikoitza', 'Justo el doble', 'الضعف تمامًا', 'Exactly twice'), '>': say('Bikoitza baino gehiago', 'Más del doble', 'أكثر من الضعف', 'More than twice') }}
            actual={axisPrediction(state)}
            choice={state.prediction}
            tip={say('Marraztutako altuerak: $B-s$ eta $A-s$, ardatza $s$ zenbakian hasten bada.', 'Alturas dibujadas: $B-s$ y $A-s$, si el eje empieza en $s$.', 'الارتفاعات المرسومة: $B-s$ و$A-s$ إذا بدأ المحور عند $s$.', 'Drawn heights: $B-s$ and $A-s$, if the axis starts at $s$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\frac{${b}-${state.start}}{${a}-${state.start}}=${texDec(lookRatio(state), props.language)}`, `\\frac{${b}}{${a}}=${texDec(trueRatio(state), props.language)}`]}
                note={l(say('Lehen lerroa: begiak ikusten duena. Bigarrena: benetako proportzioa, ardatza mugitu arren aldatzen ez dena.', 'Primera línea: lo que ve el ojo. Segunda: la proporción real, que no cambia aunque muevas el eje.', 'السطر الأول: ما تراه العين. الثاني: النسبة الحقيقية التي لا تتغيّر مهما حرّكت المحور.', 'First line: what the eye sees. Second: the true ratio, which does not change when you move the axis.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={axisChallenges} extraChallenges={axisExtra} state={state}>
            <Board height={262} label={l(say(`Ardatza ${state.start} zenbakian hasten da`, `El eje empieza en ${state.start}`, `يبدأ المحور عند ${state.start}`, `The axis starts at ${state.start}`))}>
                <line x1={70} x2={70} y1={30} y2={base} stroke={INK} strokeWidth={1.6} />
                <line x1={70} x2={330} y1={base} y2={base} stroke={INK} strokeWidth={1.6} />
                {ticks.map((value) => (
                    <g key={value}>
                        <line x1={64} x2={330} y1={base - height(value)} y2={base - height(value)} stroke="var(--line, #e6dfd1)" />
                        <text x={60} y={base - height(value) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{dec(value, props.language, 1)}</text>
                    </g>
                ))}
                {start > 0 && <path d={`M 64 ${base - 4} l 6 -4 l 6 4 l 6 -4`} fill="none" stroke={SECOND} strokeWidth={2} />}
                <rect x={110} y={base - height(a)} width={70} height={height(a)} rx={4} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                <text x={145} y={base + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>A</text>
                {shown
                    ? (
                        <>
                            <rect x={220} y={base - height(b)} width={70} height={height(b)} rx={4} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
                            <text x={255} y={base + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>B</text>
                            <text x={255} y={base - height(b) - 6} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND}>{b}</text>
                        </>
                    )
                    : <Hidden x={255} y={150} />}
                <text x={145} y={base - height(a) - 6} textAnchor="middle" fontSize={12} fontWeight={700} fill={STAGE}>{a}</text>
            </Board>
            <PlayButton label={l(say('Mugitu ardatza', 'Mueve el eje', 'حرّك المحور', 'Move the axis'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. Which mark do I need? ---------- */

export function NeededTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<NeededState>(initialNeededState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.set}-${state.mark}`, 1800)
    const before = MARK_SETS[state.set].reduce((sum, value) => sum + value, 0) / 4
    const after = neededMean(state)
    const progress = playback.playing ? (playback.progress ?? 0) : 1
    const fulcrum = shown ? before + (after - before) * Math.min(1, progress * 1.4) : before
    const drop = shown ? Math.min(1, progress * 1.6) : 0
    const X = (value: number) => 30 + value * 30
    const beam = 120
    // Weights stacked when they share a value
    const stack = new Map<number, number>()
    const weights = MARK_SETS[state.set].map((value) => {
        const level = stack.get(value) ?? 0
        stack.set(value, level + 1)
        return { value, level }
    })
    const newLevel = stack.get(state.mark) ?? 0
    const controls = (
        <>
            <Segmented label={l(say('Notak', 'Notas', 'الدرجات', 'Marks'))} value={String(state.set)} options={MARK_SETS.map((marks, index) => ({ value: String(index), label: marks.join(' ') }))} onChange={(value) => setState((s) => setNeeded(s, { set: Number(value) }))} />
            <Stepper label={l(say('Bosgarren nota', 'Quinta nota', 'الدرجة الخامسة', 'Fifth mark'))} value={state.mark} min={0} max={10} onChange={(mark) => setState((s) => setNeeded(s, { mark }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: nota honekin, batez bestekoa 6 baino txikiagoa, 6 ala handiagoa izango da?', 'Antes de verlo: con esta nota, ¿la media será menor que 6, 6 o mayor?', 'قبل رؤيته: بهذه الدرجة هل يكون المتوسط أقل من 6 أم 6 أم أكبر؟', 'Before you see it: with this mark, will the mean be below 6, exactly 6 or above?')}
            labels={{ '<': say('6 baino txikiagoa', 'Menor que 6', 'أقل من 6', 'Below 6'), '=': say('Justu 6', 'Justo 6', '6 تمامًا', 'Exactly 6'), '>': say('6 baino handiagoa', 'Mayor que 6', 'أكبر من 6', 'Above 6') }}
            actual={neededPrediction(state)}
            choice={state.prediction}
            tip={say('Batez bestekoa 6 izateko, bost noten baturak 30 izan behar du.', 'Para tener 6 de media, las cinco notas deben sumar 30.', 'ليكون المتوسط 6 يجب أن يكون مجموع الدرجات الخمس 30.', 'For a mean of 6, the five marks must add up to 30.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\bar{x}=\\frac{${neededMarks(state).join('+')}}{5}=${texDec(after, props.language)}`, `Me=${texDec(neededMedian(state), props.language)}`]}
                note={l(say('Zabuak batez bestekoan hartzen du oreka: alde bateko distantziek eta besteko distantziek berdin pisatzen dute.', 'El balancín se equilibra en la media: las distancias de un lado pesan lo mismo que las del otro.', 'تتوازن الأرجوحة عند المتوسط: المسافات في جهة تزن ما تزنه المسافات في الجهة الأخرى.', 'The seesaw balances at the mean: the distances on one side weigh the same as those on the other.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={neededChallenges} extraChallenges={neededExtra} state={state}>
            <Board height={200} label={l(say('Noten zabua', 'El balancín de las notas', 'أرجوحة الدرجات', 'The seesaw of marks'))}>
                <line x1={X(0)} x2={X(10)} y1={beam} y2={beam} stroke={INK} strokeWidth={4} strokeLinecap="round" />
                {Array.from({ length: 11 }, (_, value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={beam - 4} y2={beam + 4} stroke={INK} strokeWidth={1.4} />
                        <text x={X(value)} y={beam + 18} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                    </g>
                ))}
                <line x1={X(6)} x2={X(6)} y1={30} y2={beam} stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="5 4" />
                {weights.map(({ value, level }, index) => <rect key={index} x={X(value) - 9} y={beam - 20 - level * 20} width={18} height={18} rx={3} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />)}
                {shown
                    ? <rect x={X(state.mark) - 9} y={beam - 20 - newLevel * 20 - (1 - drop) * 70} width={18} height={18} rx={3} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
                    : <Hidden x={X(state.mark)} y={40} size={22} />}
                <polygon points={`${X(fulcrum)},${beam + 3} ${X(fulcrum) - 14},${beam + 34} ${X(fulcrum) + 14},${beam + 34}`} fill={GREEN_TINT} stroke={GREEN} strokeWidth={2} />
                <text x={X(fulcrum)} y={beam + 50} textAnchor="middle" fontSize={12} fontWeight={700} fill={GREEN}>{dec(fulcrum, props.language)}</text>
            </Board>
            <PlayButton label={l(say('Bota nota', 'Suelta la nota', 'أسقط الدرجة', 'Drop the mark'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The spinner ---------- */

export function SpinnerTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SpinnerState>(initialSpinnerState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.red}-${state.blue}-${state.green}-${state.spins}`, 2000)
    const total = sectors(state)
    const colours = [...Array(state.red).fill('red'), ...Array(state.blue).fill('blue'), ...Array(state.green).fill('green')] as Array<'red' | 'blue' | 'green'>
    const fill = { red: SECOND, blue: STAGE, green: GREEN }
    const cx = 110
    const cy = 112
    const radius = 92
    const point = (turn: number, r = radius) => [cx + r * Math.sin(2 * Math.PI * turn), cy - r * Math.cos(2 * Math.PI * turn)]
    const reds = spinReds(state)
    const spun = SPINS[state.spins]
    const pointer = playback.playing ? (playback.progress ?? 0) * 6 + 0.13 : 0.13
    const done = shown && !playback.playing && playback.progress !== null
    const controls = (
        <>
            <Stepper label={l(say('Sektore gorriak', 'Sectores rojos', 'القطاعات الحمراء', 'Red sectors'))} value={state.red} min={0} max={8} onChange={(red) => setState((s) => setSpinner(s, { red }))} language={props.language} />
            <Stepper label={l(say('Sektore urdinak', 'Sectores azules', 'القطاعات الزرقاء', 'Blue sectors'))} value={state.blue} min={0} max={8} onChange={(blue) => setState((s) => setSpinner(s, { blue }))} language={props.language} />
            <Stepper label={l(say('Sektore berdeak', 'Sectores verdes', 'القطاعات الخضراء', 'Green sectors'))} value={state.green} min={0} max={8} onChange={(green) => setState((s) => setSpinner(s, { green }))} language={props.language} />
            <Segmented label={l(say('Jaurtiketak', 'Tiradas', 'الرميات', 'Spins'))} value={String(state.spins)} options={SPINS.map((spins, index) => ({ value: String(index), label: String(spins) }))} onChange={(value) => setState((s) => setSpinner(s, { spins: Number(value) }))} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: gorria ateratzeko probabilitatea erdia baino txikiagoa, erdia ala handiagoa da?', 'Antes de verlo: ¿la probabilidad de rojo es menor que la mitad, la mitad o mayor?', 'قبل رؤيته: هل احتمال الأحمر أقل من النصف أم النصف أم أكبر؟', 'Before you see it: is the probability of red less than a half, a half or more?')}
            labels={{ '<': say('Erdia baino txikiagoa', 'Menor que la mitad', 'أقل من النصف', 'Less than a half'), '=': say('Justu erdia', 'Justo la mitad', 'النصف تمامًا', 'Exactly a half'), '>': say('Erdia baino handiagoa', 'Mayor que la mitad', 'أكبر من النصف', 'More than a half') }}
            actual={spinnerPrediction(state)}
            choice={state.prediction}
            tip={say('Laplace: sektore gorriak zati sektore guztiak.', 'Laplace: sectores rojos entre todos los sectores.', 'لابلاس: القطاعات الحمراء على كل القطاعات.', 'Laplace: red sectors over all the sectors.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`P=\\frac{${state.red}}{${total}}=${texDec(redProbability(state), props.language, 3)}`, done ? `h=\\frac{${reds}}{${spun}}=${texDec(reds / spun, props.language, 3)}` : `h=\\frac{?}{${spun}}`]}
                note={l(say('Jaurtiketa asko eginez gero, maiztasun erlatiboa probabilitatera hurbiltzen da.', 'Con muchas tiradas, la frecuencia relativa se acerca a la probabilidad.', 'مع رميات كثيرة يقترب التكرار النسبي من الاحتمال.', 'With many spins, the relative frequency gets close to the probability.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={spinnerChallenges} extraChallenges={spinnerExtra} state={state}>
            <Board height={226} label={l(say(`Ruleta: ${state.red} gorri, ${state.blue} urdin, ${state.green} berde`, `Ruleta: ${state.red} rojos, ${state.blue} azules, ${state.green} verdes`, `الدولاب: ${state.red} حمراء و${state.blue} زرقاء و${state.green} خضراء`, `Spinner: ${state.red} red, ${state.blue} blue, ${state.green} green`))}>
                {total === 1
                    ? <circle cx={cx} cy={cy} r={radius} fill={fill[colours[0]]} opacity={0.85} stroke={INK} strokeWidth={2} />
                    : colours.map((colour, index) => {
                        const [x1, y1] = point(index / total)
                        const [x2, y2] = point((index + 1) / total)
                        return <path key={index} d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${total === 2 ? 0 : 0} 1 ${x2} ${y2} Z`} fill={fill[colour]} opacity={0.85} stroke="#fff" strokeWidth={2} />
                    })}
                <circle cx={cx} cy={cy} r={radius} fill="none" stroke={INK} strokeWidth={2} />
                <line x1={cx} y1={cy} x2={point(pointer, radius - 16)[0]} y2={point(pointer, radius - 16)[1]} stroke={INK} strokeWidth={4} strokeLinecap="round" />
                <circle cx={cx} cy={cy} r={7} fill={INK} />
                {done
                    ? (
                        <>
                            <rect x={232} y={40} width={30} height={150} rx={4} fill="var(--line, #e6dfd1)" />
                            <rect x={232} y={190 - 150 * (reds / spun)} width={30} height={150 * (reds / spun)} rx={4} fill={SECOND} />
                            <line x1={224} x2={270} y1={190 - 150 * redProbability(state)} y2={190 - 150 * redProbability(state)} stroke={INK} strokeWidth={2} strokeDasharray="4 3" />
                            <text x={300} y={190 - 150 * redProbability(state) + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>P</text>
                            <text x={247} y={210} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND}>h</text>
                        </>
                    )
                    : <Hidden x={262} y={120} />}
            </Board>
            <PlayButton label={l(say('Biratu', 'Gira', 'أدِر', 'Spin'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
