import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { accepted, differencesOf, estimateOf, expectedOf, FIT_DATA, FIT_P, fitChallenges, fitExtra, fitPrediction, initialFitState, meanOf, percentOf, setFit, totalOf, type FitState } from './fit'
import { ballsOf, dropBalls, emptyBoard, GALTON_LIMITS, galtonBars, galtonChallenges, galtonExtra, galtonPrediction, initialGaltonState, pathsTo, setGalton, type GaltonState } from './galton'
import { gainCents, incomeOf, initialRaffleState, prizesOf, profitOf, RAFFLE_LIMITS, RAFFLE_TICKETS, raffleChallenges, raffleExtra, rafflePrediction, setRaffle, type RaffleState } from './raffle'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — the three tools of this
   unit: the Galton board, the fair raffle and fitting data to a binomial.
   Each asks for a prediction before it shows the result; the Galton board
   drops balls and follows the last one with ▶. Logic in galton.ts,
   raffle.ts and fit.ts.
   ========================================================================== */

/** The readout formulas in a language: Arabic writes the decimal point */
const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
/** A decimal for LaTeX with a comma */
const texNumber = (value: number, digits: number) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', '{,}')
/** Euros where each language writes them: €12 in English, 12 € in the others */
const euros = (language: UnitLanguage, value: string) => (language === 'en' ? `€${value}` : `${value}\u00a0€`)

const sides = {
    '<': say('Erditik ezkerrera', 'A la izquierda del centro', 'يسار الوسط', 'Left of the middle'),
    '=': say('Erdian', 'En el centro', 'في الوسط', 'In the middle'),
    '>': say('Erditik eskuinera', 'A la derecha del centro', 'يمين الوسط', 'Right of the middle')
}

/* ---------- L1. The Galton board ---------- */

export function GaltonTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GaltonState>(initialGaltonState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.rows}-${state.p}`, 1400)
    const bars = galtonBars(state)
    const balls = ballsOf(state)
    const drop = (howMany: number) => {
        setState((s) => dropBalls(s, howMany))
        if (howMany === 1) playback.play()
    }
    const controls = (
        <>
            <Stepper label={l(say('Errenkadak', 'Filas', 'الصفوف', 'Rows'))} value={state.rows} min={GALTON_LIMITS.rows.min} max={GALTON_LIMITS.rows.max} onChange={(rows) => setState((s) => setGalton(s, { rows }))} language={props.language} />
            <Stepper label="p" value={state.p} min={GALTON_LIMITS.p.min} max={GALTON_LIMITS.p.max} format={(tenths) => dec(tenths / 10, props.language, 1)} onChange={(p) => setState((s) => setGalton(s, { p }))} language={props.language} />
            <Stepper label={l(say('Kutxatila', 'Casilla', 'الخانة', 'Bin'))} value={state.selected} min={0} max={state.rows} onChange={(selected) => setState((s) => setGalton(s, { selected }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => drop(10)}>+10</button>
                <button type="button" onClick={() => drop(100)}>+100</button>
                <button type="button" onClick={() => setState((s) => emptyBoard(s))} disabled={balls === 0}>{l(say('Hustu', 'Vaciar', 'إفراغ', 'Empty'))}</button>
            </div>
        </>
    )
    const k = state.selected
    const latex = [`\\binom{${state.rows}}{${k}}=${pathsTo(state, k)}`, `P(${k})\\approx ${texNumber(bars[k], 4)}`, `\\mu=np=${texNumber((state.rows * state.p) / 10, 1)}`]
    const observedShare = balls ? state.counts[k] / balls : 0
    const note = balls
        ? say(`${balls} bola: ${state.counts[k]} ${k}. kutxatilan (% ${dec(100 * observedShare, 'eu', 1)}).`, `${balls} bolas: ${state.counts[k]} en la casilla ${k} (${dec(100 * observedShare, 'es', 1)} %).`, `${balls} كرة: ${state.counts[k]} في الخانة ${k} (${dec(100 * observedShare, 'ar', 1)}٪).`, `${balls} balls: ${state.counts[k]} in bin ${k} (${dec(100 * observedShare, 'en', 1)}%).`)
        : say('Bota bolak eta alderatu barrak teoriarekin.', 'Suelta bolas y compara las barras con la teoría.', 'أسقط كرات وقارن الأعمدة بالنظرية.', 'Drop balls and compare the bars with the theory.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Teoria ikusi aurretik: kutxatila probableena non dago?', 'Antes de ver la teoría: ¿dónde está la casilla más probable?', 'قبل أن ترى النظرية: أين الخانة الأرجح؟', 'Before you see the theory: where is the most likely bin?')}
            labels={sides}
            actual={galtonPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $p$: bola eskuinera gehiagotan joaten bada, pilaketa eskuinera doa.', 'Mira $p$: si la bola va más veces a la derecha, el montón se va a la derecha.', 'انظر إلى $p$: إذا اتجهت الكرة يمينًا أكثر ذهب الكوم يمينًا.', 'Look at $p$: if the ball goes right more often, the pile moves right.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const centre = 180
    const width = Math.min(44, 320 / (state.rows + 1))
    const top = 18
    const dy = Math.min(16, 120 / state.rows)
    const pegX = (row: number, index: number) => centre + (index - row / 2) * width
    const binX = (bin: number) => centre + (bin - state.rows / 2) * width
    const baseline = top + state.rows * dy + 110
    const tallest = Math.max(...bars, balls ? Math.max(...state.counts) / balls : 0)
    const barHeight = (value: number) => (value / tallest) * 92
    // The ball of ▶: after j rows it is j/2 to the left of the moves to the right
    const progress = playback.progress
    let ball: { x: number; y: number } | null = null
    if (progress !== null && state.lastPath.length === state.rows) {
        const steps = progress * state.rows
        const row = Math.min(state.rows - 1, Math.floor(steps))
        const right = state.lastPath.slice(0, row).reduce((sum, move) => sum + move, 0)
        const from = { x: pegX(row, right), y: top + row * dy - 8 }
        const nextRight = right + state.lastPath[row]
        const to = row + 1 < state.rows ? { x: pegX(row + 1, nextRight), y: top + (row + 1) * dy - 8 } : { x: binX(nextRight), y: baseline - 10 }
        const t = Math.min(1, steps - row)
        ball = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={galtonChallenges} extraChallenges={galtonExtra} state={state}>
            <Board height={baseline + 34} label={l(say('Galtonen tresna: iltzeak, kutxatilak eta barrak', 'El aparato de Galton: clavos, casillas y barras', 'جهاز غالتون: المسامير والخانات والأعمدة', 'The Galton board: pins, bins and bars'))}>
                {Array.from({ length: state.rows }, (_, row) => Array.from({ length: row + 1 }, (_, index) => (
                    <circle key={`${row}-${index}`} cx={pegX(row, index)} cy={top + row * dy} r={3} fill={INK} />
                )))}
                {Array.from({ length: state.rows + 2 }, (_, index) => {
                    const x = binX(index - 0.5)
                    return <line key={index} x1={x} x2={x} y1={baseline - 100} y2={baseline} stroke={MUTED} strokeWidth={1} opacity={0.5} />
                })}
                {state.counts.map((count, bin) => {
                    const height = balls ? barHeight(count / balls) : 0
                    const on = bin === state.selected
                    return (
                        <g key={bin} style={{ cursor: 'pointer' }} onClick={() => setState((s) => setGalton(s, { selected: bin }))}>
                            <rect x={binX(bin) - width / 2} y={baseline - 100} width={width} height={100} fill="transparent" />
                            <rect x={binX(bin) - width * 0.38} y={baseline - height} width={width * 0.76} height={height} fill={on ? SECOND_TINT : STAGE_TINT} stroke={on ? SECOND : STAGE} strokeWidth={1.4} />
                            {shown && <rect x={binX(bin) - width * 0.38} y={baseline - barHeight(bars[bin])} width={width * 0.76} height={barHeight(bars[bin])} fill="none" stroke={INK} strokeWidth={1.6} strokeDasharray="4 3" />}
                            <text x={binX(bin)} y={baseline + 16} textAnchor="middle" fontSize={12} fontWeight={700} fill={on ? SECOND : MUTED}>{bin}</text>
                        </g>
                    )
                })}
                <line x1={binX(-0.5)} x2={binX(state.rows + 0.5)} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {ball && <circle cx={ball.x} cy={ball.y} r={6} fill={SECOND} stroke={INK} strokeWidth={1.2} />}
                {!shown && <Hidden x={330} y={baseline - 60} size={20} />}
                <Label x={180} y={baseline + 30} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{shown ? l(say('Etena: teoria. Betea: botatako bolak', 'Discontinua: teoría. Llena: bolas soltadas', 'المتقطع: النظرية. الممتلئ: الكرات المُسقطة', 'Dashed: theory. Filled: balls dropped')) : l(say('Betea: botatako bolak', 'Llena: bolas soltadas', 'الممتلئ: الكرات المُسقطة', 'Filled: balls dropped'))}</Label>
            </Board>
            <PlayButton label={l(say('Bota bola bat', 'Suelta una bola', 'أسقط كرة', 'Drop a ball'))} disabled={false} playing={playback.playing} onPlay={() => drop(1)} />
        </ToolFrame>
    )
}

/* ---------- L2. The fair raffle ---------- */

const gainLatex = (cents: number) => texNumber(cents / 100, 2)

export function RaffleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RaffleState>(initialRaffleState)
    const shown = state.prediction !== null
    const income = incomeOf(state)
    const prizes = prizesOf(state)
    const gain = gainCents(state)
    const profit = profitOf(state)
    const money = (value: number) => euros(props.language, String(value))
    const controls = (
        <>
            <Segmented label={l(say('Txartelak', 'Boletos', 'البطاقات', 'Tickets'))} value={String(state.tickets)} options={RAFFLE_TICKETS.map((value) => ({ value: String(value), label: String(value) }))} onChange={(value) => setState((s) => setRaffle(s, { tickets: Number(value) }))} />
            <Stepper label={l(say('Prezioa', 'Precio', 'الثمن', 'Price'))} value={state.price} min={RAFFLE_LIMITS.price.min} max={RAFFLE_LIMITS.price.max} format={money} onChange={(price) => setState((s) => setRaffle(s, { price }))} language={props.language} />
            <Stepper label={l(say('Sari handia', 'Premio gordo', 'الجائزة الكبرى', 'Top prize'))} value={state.big} min={RAFFLE_LIMITS.big.min} max={RAFFLE_LIMITS.big.max} step={RAFFLE_LIMITS.big.step} format={money} onChange={(big) => setState((s) => setRaffle(s, { big }))} language={props.language} />
            <Stepper label={l(say('Sari txikiak', 'Premios pequeños', 'الجوائز الصغيرة', 'Small prizes'))} value={state.smallCount} min={RAFFLE_LIMITS.smallCount.min} max={RAFFLE_LIMITS.smallCount.max} onChange={(smallCount) => setState((s) => setRaffle(s, { smallCount }))} language={props.language} />
            <Stepper label={l(say('Sari txiki bakoitza', 'Cada premio pequeño', 'كل جائزة صغيرة', 'Each small prize'))} value={state.small} min={RAFFLE_LIMITS.small.min} max={RAFFLE_LIMITS.small.max} step={RAFFLE_LIMITS.small.step} format={money} onChange={(small) => setState((s) => setRaffle(s, { small }))} language={props.language} />
        </>
    )
    const latex = [`\\mu=\\frac{${prizes}}{${state.tickets}}=${gainLatex(gain + 100 * state.price)}`, `\\mu-${state.price}=${gainLatex(gain)}`]
    const verdict = gain < 0
        ? say(`Jokalariaren kontrakoa. Elkarteak ${profit}\u00a0€ irabazten ditu.`, `Desfavorable para el jugador. La asociación gana ${profit}\u00a0€.`, `ضد اللاعب. تربح الجمعية ${profit}\u00a0€.`, `Unfavourable for the player. The association makes €${profit}.`)
        : gain === 0
            ? say('Joko bidezkoa: sartzen den guztia sarietan itzultzen da.', 'Juego justo: todo lo que entra se devuelve en premios.', 'لعبة عادلة: كل ما يدخل يعود جوائز.', 'A fair game: everything that comes in goes back as prizes.')
            : say(`Jokalariaren aldekoa. Elkarteak ${-profit}\u00a0€ galtzen ditu.`, `Favorable al jugador. La asociación pierde ${-profit}\u00a0€.`, `في صالح اللاعب. تخسر الجمعية ${-profit}\u00a0€.`, `Favourable to the player. The association loses €${-profit}.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Kalkulatu aurretik: nolakoa da jokoa jokalariarentzat?', 'Antes de calcular: ¿cómo es el juego para el jugador?', 'قبل الحساب: كيف تبدو اللعبة للاعب؟', 'Before working it out: what is the game like for the player?')}
            labels={{ '<': say('Kontrakoa', 'Desfavorable', 'ضده', 'Unfavourable'), '=': say('Bidezkoa', 'Justo', 'عادلة', 'Fair'), '>': say('Aldekoa', 'Favorable', 'في صالحه', 'Favourable') }}
            actual={rafflePrediction(state)}
            choice={state.prediction}
            tip={say('Alderatu sartzen den dirua (txartelak) eta irteten dena (sariak).', 'Compara el dinero que entra (boletos) con el que sale (premios).', 'قارن المال الداخل (البطاقات) بالخارج (الجوائز).', 'Compare the money coming in (tickets) with the money going out (prizes).')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(verdict)} />
        </Predict>
    )
    const scale = 300 / Math.max(income, prizes, 1)
    const row = (y: number, value: number, label: LocalizedText, color: string, tint: string) => (
        <g>
            <Label x={30} y={y - 8} fontSize={13} fontWeight={700} fill={MUTED}>{l(label)}</Label>
            <rect x={30} y={y} width={Math.max(2, value * scale)} height={30} fill={tint} stroke={color} strokeWidth={1.8} />
            <text x={36 + Math.max(2, value * scale)} y={y + 21} fontSize={14} fontWeight={700} fill={INK} textAnchor={value * scale > 250 ? 'end' : 'start'} dx={value * scale > 250 ? -12 : 0}>{money(value)}</text>
        </g>
    )
    const gainX = (cents: number) => 180 + Math.max(-150, Math.min(150, cents / 2))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={raffleChallenges} extraChallenges={raffleExtra} state={state}>
            <Board height={232} label={l(say('Sartzen den dirua, sarietan irteten dena eta batez besteko irabazia', 'El dinero que entra, el que sale en premios y la ganancia media', 'المال الداخل، والخارج جوائز، والربح المتوسط', 'The money in, the money out in prizes and the mean gain'))}>
                {row(40, income, say(`Sartzen dena: ${state.tickets} · ${state.price}`, `Entra: ${state.tickets} · ${state.price}`, `يدخل: ${state.tickets} · ${state.price}`, `In: ${state.tickets} · ${state.price}`), STAGE, STAGE_TINT)}
                {row(110, prizes, say('Sarietan irteten dena', 'Sale en premios', 'يخرج جوائز', 'Out in prizes'), SECOND, SECOND_TINT)}
                <line x1={30} x2={330} y1={190} y2={190} stroke={INK} strokeWidth={2} />
                {[-300, 0, 300].map((cents) => (
                    <g key={cents}>
                        <line x1={gainX(cents)} x2={gainX(cents)} y1={184} y2={196} stroke={INK} strokeWidth={1.6} />
                        <text x={gainX(cents)} y={214} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{money(cents / 100).replace('-', '−')}</text>
                    </g>
                ))}
                {shown && <polygon points={`${gainX(gain)},186 ${gainX(gain) - 8},170 ${gainX(gain) + 8},170`} fill={gain === 0 ? GREEN : SECOND} />}
                {!shown && <Hidden x={180} y={176} size={20} />}
                <Label x={30} y={166} fontSize={12} fontWeight={700} fill={MUTED}>{l(say('Batez besteko irabazia', 'Ganancia media', 'الربح المتوسط', 'Mean gain'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Fit the data ---------- */

const FIT_NAMES = [say('Bezeroak', 'Clientes', 'الزبائن', 'Customers'), say('Soldadurak', 'Soldaduras', 'اللحامات', 'Welds'), say('Familiak', 'Familias', 'الأسر', 'Families')]

export function FitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FitState>(initialFitState)
    const shown = state.prediction !== null
    const data = FIT_DATA[state.data]
    const total = totalOf(data)
    const expected = expectedOf(data, state.p)
    const differences = differencesOf(data, state.p)
    const largest = Math.max(...differences)
    const percent = percentOf(data, state.p)
    const ok = accepted(data, state.p)
    const controls = (
        <>
            <Segmented label={l(say('Datuak', 'Datos', 'البيانات', 'Data'))} value={String(state.data)} options={FIT_NAMES.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(value) => setState((s) => setFit(s, { data: Number(value) }))} />
            <Stepper label="p" value={state.p} min={FIT_P.min} max={FIT_P.max} step={FIT_P.step} format={(hundredths) => dec(hundredths / 100, props.language, 2)} onChange={(p) => setState((s) => setFit(s, { p }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((s) => setFit(s, { p: estimateOf(FIT_DATA[s.data]) }))}><MathText text={'$p=\\frac{\\bar{x}}{n}$'} /></button>
            </div>
        </>
    )
    const latex = [`\\bar{x}=${texNumber(meanOf(data), 2)}\\qquad n=${data.trials}`, `d_{\\max}\\approx ${texNumber(largest, 2)}`, `\\frac{${texNumber(largest, 2)}}{${total}}\\approx ${texNumber(percent / 100, 4)}`]
    const note = ok
        ? say(`% ${dec(percent, 'eu', 2)} da, % 5 edo gutxiago: doikuntza onartzen da.`, `El ${dec(percent, 'es', 2)} %: no pasa del 5 %, el ajuste se acepta.`, `${dec(percent, 'ar', 2)}٪: لا يتجاوز 5٪، تُقبل المطابقة.`, `${dec(percent, 'en', 2)}%: no more than 5%, the fit is accepted.`)
        : say(`% ${dec(percent, 'eu', 2)} da, % 5 baino gehiago: doikuntza baztertzen da.`, `El ${dec(percent, 'es', 2)} %: pasa del 5 %, el ajuste se rechaza.`, `${dec(percent, 'ar', 2)}٪: يتجاوز 5٪، تُرفض المطابقة.`, `${dec(percent, 'en', 2)}%: more than 5%, the fit is rejected.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('$p=\\frac{\\bar{x}}{n}$ balioarekin, diferentziarik handiena guztizkoaren % 5 baino txikiagoa, berdina ala handiagoa izango da?', 'Con $p=\\frac{\\bar{x}}{n}$, ¿la mayor diferencia será menor, igual o mayor que el 5 % del total?', 'مع $p=\\frac{\\bar{x}}{n}$، هل سيكون أكبر فرق أصغر من 5٪ من الكل أم يساويها أم أكبر؟', 'With $p=\\frac{\\bar{x}}{n}$, will the largest difference be less than, equal to or more than 5% of the total?')}
            labels={{ '<': say('% 5 baino txikiagoa', 'Menor que el 5 %', 'أصغر من 5٪', 'Less than 5%'), '=': say('% 5 justu', 'Justo el 5 %', '5٪ بالضبط', 'Exactly 5%'), '>': say('% 5 baino handiagoa', 'Mayor que el 5 %', 'أكبر من 5٪', 'More than 5%') }}
            actual={fitPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu barren formari: binomial baten itxura dute?', 'Mira la forma de las barras: ¿parecen las de una binomial?', 'انظر إلى شكل الأعمدة: هل تشبه أعمدة توزيع ثنائي؟', 'Look at the shape of the bars: do they look like a binomial\'s?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const left = 30
    const right = 340
    const baseline = 190
    const slot = (right - left) / data.observed.length
    const at = (k: number) => left + slot * (k + 0.5)
    const tallest = Math.max(...data.observed, ...expected)
    const h = (value: number) => (value / tallest) * 140
    const bar = Math.min(28, slot * 0.36)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={fitChallenges} extraChallenges={fitExtra} state={state}>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '0 0 6px' }}>{l(data.title)}</p>
            <Board height={250} label={l(say('Behatutako eta itxarondako barrak', 'Las barras observadas y las esperadas', 'الأعمدة المشاهَدة والمتوقعة', 'The observed and the expected bars'))}>
                {data.observed.map((value, k) => {
                    const biggest = shown && Math.abs(differences[k] - largest) < 1e-9
                    return (
                        <g key={k}>
                            <rect x={at(k) - bar - 1} y={baseline - h(value)} width={bar} height={h(value)} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />
                            <text x={at(k) - bar / 2 - 1} y={baseline - h(value) - 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={STAGE}>{value}</text>
                            {shown && <rect x={at(k) + 1} y={baseline - h(expected[k])} width={bar} height={h(expected[k])} fill={PAPER} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />}
                            {shown && <text x={at(k) + bar / 2 + 1} y={baseline - h(expected[k]) - 5} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND}>{dec(expected[k], props.language, 1)}</text>}
                            <text x={at(k)} y={baseline + 16} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{k}</text>
                            {shown && <text x={at(k)} y={baseline + 36} textAnchor="middle" fontSize={12} fontWeight={700} fill={biggest ? (ok ? GREEN : SECOND) : MUTED}>{dec(differences[k], props.language, 1)}</text>}
                        </g>
                    )
                })}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {!shown && <Hidden x={180} y={baseline + 40} size={20} />}
                {shown && <Label x={180} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{l(say('Beteak: datuak · Etenak: itxaronak · Behean: |dif.|', 'Llenas: datos · Discontinuas: esperados · Abajo: |dif.|', 'الممتلئة: البيانات · المتقطعة: المتوقعة · تحت: |الفرق|', 'Filled: data · Dashed: expected · Below: |diff.|'))}</Label>}
            </Board>
        </ToolFrame>
    )
}
