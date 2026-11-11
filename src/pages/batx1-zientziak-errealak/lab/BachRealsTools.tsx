import { Label } from '../../dbh2-funtzioak-v2/plane'
import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { DISTANCE_LIMITS, distanceChallenges, distanceExtra, distanceOf, distancePrediction, initialDistanceState, neighbourhoodOf, setDistance, type DistanceState } from './distance'
import { BAND_FIGURES, BAND_VALUES, bandAbsolute, bandApprox, bandBound, bandChallenges, bandExtra, bandInterval, bandPrediction, bandRelative, bandUnit, initialBandState, setBand, type ApproxMode, type BandState } from './errorBand'
import { initialSlideState, setSlide, SLIDE_LIMITS, slideChallenges, slideExtra, slidePrediction, slideResult, slideShift, type SlideOperation, type SlideState } from './slideRule'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Zientziak — the three tools of this
   unit: the distance on the line (a neighbourhood and a point), the slide
   rule (lengths that add are numbers that multiply) and the band of the
   error (a zoomed ruler around an approximation). Each asks for a
   prediction before it shows the result; the slide rule moves with ▶.
   Logic in distance.ts, slideRule.ts and errorBand.ts.
   ========================================================================== */

/** A number as each language writes it: the comma in Basque and Spanish, the point in English and Arabic */
const written = (value: number, decimals: number, language: UnitLanguage) => {
    const text = value.toFixed(Math.max(0, decimals))
    return language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))
}
/** The same number for LaTeX: {,} for the comma (MathText writes the point in English), the point in Arabic */
const tex = (value: number, decimals: number, language: UnitLanguage) => value.toFixed(Math.max(0, decimals)).replace('.', language === 'ar' ? '.' : '{,}')
/** Decimals that show two significant figures of a small positive number */
const twoFigures = (value: number) => (value <= 0 ? 0 : Math.max(0, 1 - Math.floor(Math.log10(value))))
const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))

/* ---------- L1. The distance on the line ---------- */

export function DistanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DistanceState>(initialDistanceState)
    const shown = state.prediction !== null
    const { left, right } = neighbourhoodOf(state)
    const distance = distanceOf(state)
    const X = (value: number) => 20 + (value + 10) * 16
    const y = 112
    const controls = (
        <>
            <Stepper label={l(say('Erdigunea a', 'Centro a', 'المركز a', 'Centre a'))} value={state.a} min={DISTANCE_LIMITS.a.min} max={DISTANCE_LIMITS.a.max} onChange={(a) => setState((s) => setDistance(s, { a }))} language={props.language} />
            <Stepper label={l(say('Erradioa r', 'Radio r', 'نصف القطر r', 'Radius r'))} value={state.r} min={DISTANCE_LIMITS.r.min} max={DISTANCE_LIMITS.r.max} onChange={(r) => setState((s) => setDistance(s, { r }))} language={props.language} />
            <Stepper label={l(say('Puntua x', 'Punto x', 'النقطة x', 'Point x'))} value={state.x} min={DISTANCE_LIMITS.x.min} max={DISTANCE_LIMITS.x.max} onChange={(x) => setState((s) => setDistance(s, { x }))} language={props.language} />
        </>
    )
    const where = distancePrediction(state)
    const note = where === '<'
        ? say(`$${distance}<${state.r}$: $x$ ingurunearen barruan dago.`, `$${distance}<${state.r}$: $x$ está dentro del entorno.`, `$${distance}<${state.r}$: النقطة $x$ داخل الجوار.`, `$${distance}<${state.r}$: $x$ is inside the neighbourhood.`)
        : where === '='
            ? say(`$${distance}=${state.r}$: $x$ ertzean dago, eta ertza ez da ingurunekoa.`, `$${distance}=${state.r}$: $x$ está en el borde, que no es del entorno.`, `$${distance}=${state.r}$: النقطة $x$ على الحافة، والحافة ليست من الجوار.`, `$${distance}=${state.r}$: $x$ is on the edge, which is not part of the neighbourhood.`)
            : say(`$${distance}>${state.r}$: $x$ ingurunetik kanpo dago.`, `$${distance}>${state.r}$: $x$ está fuera del entorno.`, `$${distance}>${state.r}$: النقطة $x$ خارج الجوار.`, `$${distance}>${state.r}$: $x$ is outside the neighbourhood.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Distantzia ikusi aurretik: non geratuko da $x$?', 'Antes de ver la distancia: ¿dónde quedará $x$?', 'قبل رؤية المسافة: أين ستقع $x$؟', 'Before you see the distance: where will $x$ be?')}
            labels={{ '<': say('Barruan', 'Dentro', 'داخله', 'Inside'), '=': say('Ertzean', 'En el borde', 'على الحافة', 'On the edge'), '>': say('Kanpoan', 'Fuera', 'خارجه', 'Outside') }}
            actual={where}
            choice={state.prediction}
            tip={say('Konparatu $|x-a|$ distantzia $r$ erradioarekin.', 'Compara la distancia $|x-a|$ con el radio $r$.', 'قارن المسافة $|x-a|$ بنصف القطر $r$.', 'Compare the distance $|x-a|$ with the radius $r$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`|x-a|=|${state.x}-(${state.a})|=${distance}`, `E(${state.a},${state.r})=(${left},${right})`]} note={l(note)} />
        </Predict>
    )
    const ticks = Array.from({ length: 21 }, (_, i) => i - 10)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={distanceChallenges} extraChallenges={distanceExtra} state={state}>
            <Board height={170} label={l(say(`E(${state.a}, ${state.r}) ingurunea eta x = ${state.x} puntua`, `El entorno E(${state.a}, ${state.r}) y el punto x = ${state.x}`, `الجوار E(${state.a}, ${state.r}) والنقطة x = ${state.x}`, `The neighbourhood E(${state.a}, ${state.r}) and the point x = ${state.x}`))}>
                <rect x={X(Math.max(-10, left))} y={y - 9} width={X(Math.min(10, right)) - X(Math.max(-10, left))} height={18} fill={STAGE_TINT} />
                <line x1={14} x2={346} y1={y} y2={y} stroke={INK} strokeWidth={2} />
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line x1={X(tick)} x2={X(tick)} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth={tick === 0 ? 2 : 1} />
                        {tick % 2 === 0 && <text x={X(tick)} y={y + 24} textAnchor="middle" fontSize={13} fill={MUTED}>{minus(tick)}</text>}
                    </g>
                ))}
                <line x1={X(left)} x2={X(right)} y1={y} y2={y} stroke={STAGE} strokeWidth={4} />
                {[left, right].map((end) => <circle key={end} cx={X(end)} cy={y} r={6} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />)}
                <circle cx={X(state.a)} cy={y} r={5} fill={STAGE} />
                <text x={X(state.a)} y={y + 44} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>a</text>
                <polygon points={`${X(state.x)},${y - 9} ${X(state.x) + 7},${y} ${X(state.x)},${y + 9} ${X(state.x) - 7},${y}`} fill={SECOND} stroke={INK} strokeWidth={1} />
                <text x={X(state.x)} y={y - 16} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>x</text>
                {shown
                    ? (
                        <g>
                            <line x1={X(state.a)} x2={X(state.x)} y1={54} y2={54} stroke={SECOND} strokeWidth={3} />
                            <line x1={X(state.a)} x2={X(state.a)} y1={46} y2={62} stroke={SECOND} strokeWidth={2} />
                            <line x1={X(state.x)} x2={X(state.x)} y1={46} y2={62} stroke={SECOND} strokeWidth={2} />
                            <text x={180} y={34} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{`|x − a| = ${distance}`}</text>
                        </g>
                    )
                    : <Hidden x={180} y={50} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The slide rule ---------- */

export function SlideRuleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlideState>(initialSlideState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.operation}-${state.a}-${state.b}`, 1200)
    const L = 316
    const x0 = 22
    const X = (value: number) => x0 + L * Math.log10(value)
    const shift = slideShift(state) * L
    // Before the prediction the sliding scale waits at the start; ▶ slides it into place
    const offset = !shown ? 0 : playback.progress === null ? shift : playback.progress * shift
    const result = slideResult(state)
    const times = state.operation === 'times'
    const marks = Array.from({ length: 10 }, (_, i) => i + 1)
    const controls = (
        <>
            <Segmented<SlideOperation> label={l(say('Eragiketa', 'Operación', 'العملية', 'Operation'))} value={state.operation} options={[{ value: 'times', label: '×' }, { value: 'divide', label: '÷' }]} onChange={(operation) => setState((s) => setSlide(s, { operation }))} />
            <Stepper label="a" value={state.a} min={SLIDE_LIMITS.min} max={SLIDE_LIMITS.max} onChange={(a) => setState((s) => setSlide(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={SLIDE_LIMITS.min} max={times ? Math.floor(SLIDE_LIMITS.max / state.a) : state.a} onChange={(b) => setState((s) => setSlide(s, { b }))} language={props.language} />
        </>
    )
    const decimals = Number.isInteger(result) ? 0 : 2
    const readout = (
        <Predict
            language={props.language}
            question={times
                ? say(`Irakurri aurretik: $${state.a}\\cdot ${state.b}$ biderkadura, $${state.a}+${state.b}$ batura baino txikiagoa, berdina edo handiagoa izango da?`, `Antes de leer: ¿el producto $${state.a}\\cdot ${state.b}$ será menor, igual o mayor que la suma $${state.a}+${state.b}$?`, `قبل القراءة: هل يكون الضرب $${state.a}\\cdot ${state.b}$ أصغر من المجموع $${state.a}+${state.b}$ أم يساويه أم أكبر؟`, `Before reading: will the product $${state.a}\\cdot ${state.b}$ be smaller than, equal to or greater than the sum $${state.a}+${state.b}$?`)
                : say(`Irakurri aurretik: $${state.a}\\div ${state.b}$ zatidura, $${state.a}-${state.b}$ kendura baino txikiagoa, berdina edo handiagoa izango da?`, `Antes de leer: ¿el cociente $${state.a}\\div ${state.b}$ será menor, igual o mayor que la resta $${state.a}-${state.b}$?`, `قبل القراءة: هل تكون القسمة $${state.a}\\div ${state.b}$ أصغر من الفرق $${state.a}-${state.b}$ أم تساويه أم أكبر؟`, `Before reading: will the quotient $${state.a}\\div ${state.b}$ be smaller than, equal to or greater than the difference $${state.a}-${state.b}$?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={slidePrediction(state)}
            choice={state.prediction}
            tip={say('Erregelak luzerak batzen ditu, eta luzera horiek logaritmoak dira: $\\log(a\\cdot b)=\\log a+\\log b$. Zenbakiak ez dira batzen.', 'La regla suma longitudes, y esas longitudes son logaritmos: $\\log(a\\cdot b)=\\log a+\\log b$. Los números no se suman.', 'المسطرة تجمع أطوالًا، وهذه الأطوال لوغاريتمات: $\\log(a\\cdot b)=\\log a+\\log b$. أما الأعداد فلا تُجمع.', 'The rule adds lengths, and those lengths are logarithms: $\\log(a\\cdot b)=\\log a+\\log b$. The numbers are not added.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={times
                    ? [`\\log ${state.a}+\\log ${state.b}=\\log ${result}`, `${state.a}\\cdot ${state.b}=${result}`]
                    : [`\\log ${state.a}-\\log ${state.b}=\\log ${tex(result, decimals, props.language)}`, `${state.a}\\div ${state.b}=${tex(result, decimals, props.language)}`]}
                note={l(times
                    ? say('Mugikorraren 1 zenbakia $a$ zenbakiaren gainean: $b$ zenbakiaren azpian biderkadura irakurtzen da.', 'El 1 de la móvil sobre $a$: debajo de $b$ se lee el producto.', 'العدد 1 في المتحركة فوق $a$: تحت $b$ نقرأ الضرب.', 'The 1 of the sliding scale over $a$: the product is read under $b$.')
                    : say('$b$ zenbakia $a$ zenbakiaren gainean: mugikorraren 1 zenbakiaren azpian zatidura irakurtzen da.', 'El $b$ sobre el $a$: debajo del 1 de la móvil se lee el cociente.', 'العدد $b$ فوق $a$: تحت 1 المتحركة نقرأ القسمة.', 'The $b$ over the $a$: the quotient is read under the 1 of the sliding scale.'))}
            />
        </Predict>
    )
    const slidingY = 78
    const fixedY = 132
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={slideChallenges} extraChallenges={slideExtra} state={state}>
            <Board height={200} label={l(say('Kalkulu-erregela: bi eskala logaritmiko', 'La regla de cálculo: dos escalas logarítmicas', 'مسطرة الحساب: سلّمان لوغاريتميان', 'The slide rule: two logarithmic scales'))}>
                <defs>
                    <clipPath id="slide-rule-board"><rect x={0} y={0} width={360} height={200} /></clipPath>
                </defs>
                <rect x={x0 - 8} y={fixedY - 6} width={L + 16} height={46} rx={6} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                {marks.map((mark) => (
                    <g key={mark}>
                        <line x1={X(mark)} x2={X(mark)} y1={fixedY - 6} y2={fixedY + 8} stroke={INK} strokeWidth={1.4} />
                        {mark !== 9 && <text x={X(mark)} y={fixedY + 28} textAnchor="middle" fontSize={13} fill={INK}>{mark}</text>}
                    </g>
                ))}
                <g clipPath="url(#slide-rule-board)">
                    <g transform={`translate(${offset} 0)`}>
                        <rect x={x0 - 8} y={slidingY - 36} width={L + 16} height={46} rx={6} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                        {marks.map((mark) => (
                            <g key={mark}>
                                <line x1={X(mark)} x2={X(mark)} y1={slidingY - 4} y2={slidingY + 10} stroke={INK} strokeWidth={1.4} />
                                {(mark !== 9 || state.b === 9) && <text x={X(mark)} y={slidingY - 12} textAnchor="middle" fontSize={13} fontWeight={mark === 1 || mark === state.b ? 700 : 400} fill={mark === state.b ? SECOND : INK}>{mark}</text>}
                            </g>
                        ))}
                        {shown && <line x1={X(1)} x2={X(state.b)} y1={slidingY + 4} y2={slidingY + 4} stroke={SECOND} strokeWidth={4} />}
                    </g>
                </g>
                {shown && <line x1={X(1)} x2={X(state.a)} y1={fixedY + 2} y2={fixedY + 2} stroke={STAGE} strokeWidth={4} />}
                {shown
                    ? (
                        <g>
                            <line x1={X(result)} x2={X(result)} y1={slidingY - 40} y2={fixedY + 36} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" opacity={playback.playing ? 0.3 : 1} />
                            <text x={Math.min(330, Math.max(30, X(result)))} y={194} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{written(result, decimals, props.language)}</text>
                        </g>
                    )
                    : <Hidden x={180} y={190} size={22} />}
            </Board>
            <PlayButton label={l(say('Lerratu', 'Deslizar', 'حرّك', 'Slide'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The band of the error ---------- */

export function ErrorBandTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BandState>(initialBandState)
    const shown = state.prediction !== null
    const item = BAND_VALUES[state.value]
    const exact = item.value
    const unit = bandUnit(state)
    const approx = bandApprox(state)
    const { low, high } = bandInterval(state)
    const places = Math.max(0, -Math.round(Math.log10(unit)))
    const label = (text: string) => (props.language === 'ar' || props.language === 'en' ? text.replace(',', '.') : text)
    const start = approx - 3 * unit
    const X = (value: number) => 30 + ((value - start) / (6 * unit)) * 300
    const y = 104
    const controls = (
        <>
            <Stepper label={l(say('Zenbakia', 'Número', 'العدد', 'Number'))} value={state.value} min={0} max={BAND_VALUES.length - 1} format={(index) => label(BAND_VALUES[index].label)} onChange={(value) => setState((s) => setBand(s, { value }))} language={props.language} />
            <Segmented<ApproxMode> label={l(say('Nola', 'Cómo', 'الطريقة', 'How'))} value={state.mode} options={[{ value: 'round', label: l(say('Biribildu', 'Redondear', 'تدوير', 'Round')) }, { value: 'truncate', label: l(say('Moztu', 'Truncar', 'قطع', 'Truncate')) }]} onChange={(mode) => setState((s) => setBand(s, { mode }))} />
            <Stepper label={l(say('Zifra esanguratsuak', 'Cifras significativas', 'الأرقام المعنوية', 'Significant figures'))} value={state.figures} min={BAND_FIGURES.min} max={BAND_FIGURES.max} onChange={(figures) => setState((s) => setBand(s, { figures }))} language={props.language} />
        </>
    )
    const absolute = bandAbsolute(state)
    const relative = bandRelative(state) * 100
    const exactLatex = props.language === 'ar' ? item.latex.replace('{,}', '.') : item.latex
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: balio zehatza hurbilketaren azpian ala gainean geratzen da?', 'Antes de verlo: ¿el valor exacto queda por debajo o por encima de la aproximación?', 'قبل أن تراه: هل تقع القيمة الدقيقة تحت التقريب أم فوقه؟', 'Before you see it: is the exact value below or above the approximation?')}
            labels={{ '<': say('Azpian', 'Por debajo', 'تحته', 'Below'), '=': say('Berdina', 'Igual', 'يساويه', 'Equal'), '>': say('Gainean', 'Por encima', 'فوقه', 'Above') }}
            actual={bandPrediction(state)}
            choice={state.prediction}
            tip={say('Moztean, balio zehatza beti geratzen da gainean; biribiltzean, edozein aldetan egon daiteke, unitate erdi bat baino gertuago.', 'Al truncar, el valor exacto siempre queda por encima; al redondear, puede quedar a cualquier lado, a menos de media unidad.', 'عند القطع تبقى القيمة الدقيقة دائمًا فوق التقريب، وعند التدوير قد تكون في أيّ جهة على بعد أقل من نصف وحدة.', 'When truncating, the exact value is always above; when rounding, it can be on either side, less than half a unit away.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${exactLatex}\\approx ${tex(approx, places, props.language)}`, `E_a=${tex(absolute, twoFigures(absolute), props.language)}<${tex(bandBound(state), places + (state.mode === 'round' ? 1 : 0), props.language)}`, `E_r\\approx ${tex(relative, twoFigures(relative), props.language)}\\,\\%`]}
                note={l(state.mode === 'round'
                    ? say('Biribiltzean, bornea azken zifraren unitate erdia da.', 'Al redondear, la cota es media unidad de la última cifra.', 'عند التدوير يكون الحدّ نصف وحدة الرقم الأخير.', 'When rounding, the bound is half a unit of the last figure.')
                    : say('Moztean, bornea azken zifraren unitate osoa da.', 'Al truncar, la cota es una unidad entera de la última cifra.', 'عند القطع يكون الحدّ وحدة كاملة من الرقم الأخير.', 'When truncating, the bound is a whole unit of the last figure.'))}
            />
        </Predict>
    )
    const ticks = Array.from({ length: 7 }, (_, i) => approx + (i - 3) * unit)
    const longLabels = written(approx, places, props.language).length > 6
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bandChallenges} extraChallenges={bandExtra} state={state}>
            <Board height={170} label={l(say('Hurbilketaren inguruko erregela handitua eta errorearen banda', 'La regla ampliada alrededor de la aproximación y la banda del error', 'مسطرة مكبّرة حول التقريب وشريط الخطأ', 'The ruler zoomed in around the approximation and the error band'))}>
                <rect x={X(low)} y={y - 16} width={X(high) - X(low)} height={26} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.2} strokeDasharray="5 4" />
                <line x1={18} x2={342} y1={y} y2={y} stroke={INK} strokeWidth={2} />
                {ticks.map((tick, i) => (
                    <g key={i}>
                        <line x1={X(tick)} x2={X(tick)} y1={y - 7} y2={y + 7} stroke={INK} strokeWidth={i === 3 ? 2 : 1.2} />
                        {(!longLabels || i % 2 === 1) && <text x={X(tick)} y={y + 30} textAnchor="middle" fontSize={12} fill={i === 3 ? STAGE : MUTED} fontWeight={i === 3 ? 700 : 400}>{written(tick, places, props.language)}</text>}
                    </g>
                ))}
                <circle cx={X(approx)} cy={y} r={6} fill={STAGE} stroke={INK} strokeWidth={1} />
                {shown
                    ? (
                        <g>
                            <polygon points={`${X(exact)},${y - 10} ${X(exact) + 7},${y} ${X(exact)},${y + 10} ${X(exact) - 7},${y}`} fill={SECOND} stroke={INK} strokeWidth={1} />
                            <text x={Math.min(320, Math.max(40, X(exact)))} y={y - 32} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{`${label(item.label)} = ${written(exact, Math.min(9, places + 3), props.language)}…`}</text>
                        </g>
                    )
                    : <Hidden x={180} y={60} />}
                <Label x={180} y={y + 54} textAnchor="middle" fontSize={13} fill={MUTED}>{l(say('Banda: balio zehatza non egon daitekeen', 'Banda: dónde puede estar el valor exacto', 'الشريط: حيث يمكن أن تكون القيمة الدقيقة', 'Band: where the exact value can be'))}</Label>
            </Board>
        </ToolFrame>
    )
}
