import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { initialSquareState, setSquare, SQUARE_LIMITS, squareArea, squareChallenges, squareExtra, squareNaive, squarePrediction, type SquareMode, type SquareState } from './binomialSquare'
import { CHIP_DECKS, chipLatex, chipsChallenges, chipsLatex, chipsPrediction, chipsReduced, initialChipsState, randomDeck, reduceChips, setChipsPrediction, startDeck, tapChip, type ChipsState } from './chips'
import { FACTOR_LIMIT, factorChallenges, factorExtra, factorFits, factorPrediction, initialFactorState, setFactor, TRINOMIALS, trinomialLatex, type FactorState } from './factorRectangle'
import { setPrediction } from './prediction'
import { initialMachineState, MACHINE_A, MACHINE_POLYNOMIALS, machineChallenges, machineExtra, machinePrediction, machineRemainder, polyLatex, ruffiniTable, setMachine, valueAt, type MachineState } from './remainderMachine'

/* ==========================================================================
   Polinomioak · 3. DBH — the four tools of this unit: the monomial chips,
   the square of a binomial, the remainder machine and the rectangle that
   factorises. Each asks for a prediction before it shows the result; the
   square and the machine move with ▶. Logic in the .ts files next to this
   one; the board, the readout and the prediction come from Segidak 3. DBH.
   ========================================================================== */

/* ---------- L1. Monomial chips ---------- */

const POWER_COLOURS: Record<number, [string, string]> = { 4: [GREEN, GREEN_TINT], 3: [SECOND, SECOND_TINT], 2: [STAGE, STAGE_TINT], 1: [MUSTARD, MUSTARD_TINT], 0: [MUTED, '#ece6da'] }

export function ChipsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChipsState>(initialChipsState)
    const shown = state.prediction !== null
    const terms = reduceChips(state.original).length
    const controls = (
        <>
            <Segmented label={l(say('Sorta', 'Mazo', 'المجموعة', 'Deck'))} value={String(state.deck)} options={[...CHIP_DECKS.map((_, index) => ({ value: String(index), label: String(index + 1) })), ...(state.deck === -1 ? [{ value: '-1', label: '🎲' }] : [])]} onChange={(deck) => setState(Number(deck) >= 0 ? startDeck(Number(deck)) : state)} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState(randomDeck(createRandom(randomSeed())))}>{`🎲 ${l(say('Sorta berria', 'Mazo nuevo', 'مجموعة جديدة', 'New deck'))}`}</button>
                <button type="button" onClick={() => setState((s) => ({ ...s, chips: s.original.map((chip) => ({ ...chip })), selected: null, refused: false }))}>{l(say('Hasieratik', 'Desde el principio', 'من البداية', 'Start again'))}</button>
            </div>
        </>
    )
    const reduced = chipsReduced(state)
    const note = state.refused
        ? l(say('Ez dira antzekoak: berretzaile desberdina dute, eta ezin dira elkartu.', 'No son semejantes: tienen distinto exponente y no se pueden juntar.', 'ليسا متشابهين: أسّاهما مختلفان ولا يُجمعان.', 'They are not like terms: they have different exponents and cannot be joined.'))
        : reduced
            ? l(say(`Ez dago antzeko gehiago: ${state.chips.length} gai geratu dira.`, `No quedan semejantes: han quedado ${state.chips.length} términos.`, `لا متشابهات بعد الآن: بقي ${state.chips.length} حدود.`, `No like terms are left: ${state.chips.length} terms remain.`))
            : l(say('Sakatu bi fitxa antzeko elkartzeko.', 'Toca dos fichas semejantes para juntarlas.', 'المس رقاقتين متشابهتين لجمعهما.', 'Tap two like chips to join them.'))
    const readout = (
        <Predict
            language={props.language}
            question={say('Hasi aurretik: zenbat gai geratuko dira guztiz laburtzean?', 'Antes de empezar: ¿cuántos términos quedarán al reducirlo del todo?', 'قبل البدء: كم حدًا يبقى بعد الاختصار الكامل؟', 'Before you start: how many terms will be left when it is fully reduced?')}
            labels={{ '<': say('3 baino gutxiago', 'Menos de 3', 'أقل من 3', 'Fewer than 3'), '=': say('Justu 3', 'Justo 3', '3 تمامًا', 'Exactly 3'), '>': say('3 baino gehiago', 'Más de 3', 'أكثر من 3', 'More than 3') }}
            actual={chipsPrediction(state)}
            choice={state.prediction}
            tip={say(`Zenbatu berretzaile desberdinak eta begiratu zeinek ezeztatzen duten elkar: ${terms} gai.`, `Cuenta los exponentes distintos y mira cuáles se anulan: ${terms} términos.`, `عُدّ الأسس المختلفة وانظر أيها يلغي الآخر: ${terms} حدود.`, `Count the different exponents and see which cancel out: ${terms} terms.`)}
            onChoose={(prediction) => setState((s) => setChipsPrediction(s, prediction))}
        >
            <Readout latex={[chipsLatex(state.chips)]} note={note} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={chipsChallenges} state={state}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, padding: '18px 8px', width: '100%', maxWidth: 520, margin: '0 auto' }} role="group" aria-label={l(say('Monomio-fitxak', 'Fichas de monomios', 'رقاقات وحيدات الحد', 'Monomial chips'))}>
                {state.chips.map((chip, index) => {
                    const [colour, tint] = POWER_COLOURS[chip.power] ?? [INK, '#fff']
                    return (
                        <button key={`${index}-${chip.coefficient}-${chip.power}`} type="button" disabled={!shown} onClick={() => setState((s) => tapChip(s, index))} aria-pressed={state.selected === index}
                            style={{ minWidth: 64, minHeight: 52, padding: '6px 10px', borderRadius: 14, border: `${state.selected === index ? 4 : 2}px solid ${colour}`, background: tint, boxShadow: state.selected === index ? `0 0 0 3px ${INK}` : `0 3px 0 ${colour}`, fontSize: 20, cursor: shown ? 'pointer' : 'default', opacity: shown ? 1 : 0.8 }}>
                            <MathText text={`$${chipLatex(chip)}$`} inline />
                        </button>
                    )
                })}
                {state.chips.length === 0 && <span style={{ fontSize: 22, fontWeight: 700 }}>0</span>}
            </div>
        </ToolFrame>
    )
}

/* ---------- L2. The square of a binomial ---------- */

const modeNames: Record<SquareMode, ReturnType<typeof say>> = { sum: say('(a + b)²', '(a + b)²', '\u2066(a + b)²\u2069', '(a + b)²'), diff: say('(a − b)²', '(a − b)²', '\u2066(a − b)²\u2069', '(a − b)²'), product: say('(a + b)(a − b)', '(a + b)(a − b)', '\u2066(a + b)(a − b)\u2069', '(a + b)(a − b)') }

export function SquareTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SquareState>(initialSquareState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.mode}-${state.a}-${state.b}`, 1600)
    // ▶ pulls the pieces apart a little so that each one can be seen
    const gap = playback.progress === null ? 0 : Math.sin(Math.min(1, playback.progress) * Math.PI) * 12
    const { a, b, mode } = state
    const side = mode === 'sum' ? a + b : a
    const u = Math.min(24, 200 / side)
    const x0 = 180 - (side * u) / 2
    const y0 = 20
    const piece = (x: number, y: number, w: number, h: number, fill: string, stroke: string, label: string, dx = 0, dy = 0, dashed = false) => (
        <g transform={`translate(${dx * gap} ${dy * gap})`}>
            <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={2} strokeDasharray={dashed ? '5 4' : undefined} />
            {w > 26 && h > 18 && <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{label}</text>}
        </g>
    )
    const controls = (
        <>
            <Segmented label={l(say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'))} value={mode} options={(['sum', 'diff', 'product'] as SquareMode[]).map((value) => ({ value, label: l(modeNames[value]) }))} onChange={(next) => setState((s) => setSquare(s, { mode: next }))} />
            <Stepper label="a" value={a} min={SQUARE_LIMITS.a.min} max={SQUARE_LIMITS.a.max} onChange={(next) => setState((s) => setSquare(s, { a: next }))} language={props.language} />
            <Stepper label="b" value={b} min={SQUARE_LIMITS.b.min} max={mode === 'sum' ? SQUARE_LIMITS.b.max : Math.min(SQUARE_LIMITS.b.max, a - 1)} onChange={(next) => setState((s) => setSquare(s, { b: next }))} language={props.language} />
        </>
    )
    const area = squareArea(state)
    const latex = mode === 'sum'
        ? ['(a+b)^{2}=a^{2}+2ab+b^{2}', `(${a}+${b})^{2}=${a * a}+${2 * a * b}+${b * b}=${area}`]
        : mode === 'diff'
            ? ['(a-b)^{2}=a^{2}-2ab+b^{2}', `(${a}-${b})^{2}=${a * a}-${2 * a * b}+${b * b}=${area}`]
            : ['(a+b)(a-b)=a^{2}-b^{2}', `(${a}+${b})(${a}-${b})=${a * a}-${b * b}=${area}`]
    const naive = squareNaive(state)
    const note = mode === 'sum'
        ? l(say(`$a^{2}+b^{2}=${naive}$ bakarrik hartuz gero, bi laukizuzenak falta dira: $2ab=${2 * a * b}$.`, `Con solo $a^{2}+b^{2}=${naive}$ faltarían los dos rectángulos: $2ab=${2 * a * b}$.`, `بأخذ $a^{2}+b^{2}=${naive}$ فقط ينقص المستطيلان: $2ab=${2 * a * b}$.`, `With only $a^{2}+b^{2}=${naive}$, the two rectangles would be missing: $2ab=${2 * a * b}$.`))
        : mode === 'diff'
            ? l(say(`$a^{2}$ karratutik bi zerrenda kentzen dira, eta txokoa bi aldiz kendu denez, $b^{2}$ itzultzen da.`, `Al cuadrado $a^{2}$ se le quitan dos tiras; la esquina se quitó dos veces, así que se devuelve $b^{2}$.`, `نزيل من المربع $a^{2}$ شريطين؛ والزاوية أزيلت مرتين فنعيد $b^{2}$.`, `Two strips are taken from the square $a^{2}$; the corner was taken twice, so $b^{2}$ is put back.`))
            : l(say('$a^{2}$ karratuari $b^{2}$ txokoa kentzen zaio; geratzen dena laukizuzen batean berrantolatzen da.', 'Al cuadrado $a^{2}$ se le quita la esquina $b^{2}$; lo que queda se reordena en un rectángulo.', 'نزيل من المربع $a^{2}$ الزاوية $b^{2}$؛ والباقي يُعاد ترتيبه في مستطيل.', 'The corner $b^{2}$ is cut from the square $a^{2}$; what is left can be rearranged into a rectangle.'))
    const readout = (
        <Predict
            language={props.language}
            question={mode === 'product'
                ? say('Emaitza ikusi aurretik: $(a+b)(a-b)$ azalera $a^{2}$ baino handiagoa da?', 'Antes de ver el resultado: ¿el área $(a+b)(a-b)$ es mayor que $a^{2}$?', 'قبل رؤية النتيجة: هل المساحة $(a+b)(a-b)$ أكبر من $a^{2}$؟', 'Before you see the result: is the area $(a+b)(a-b)$ greater than $a^{2}$?')
                : say(`Emaitza ikusi aurretik: $${mode === 'sum' ? '(a+b)^{2}' : '(a-b)^{2}'}$ azalera $a^{2}+b^{2}$ baino handiagoa da?`, `Antes de ver el resultado: ¿el área $${mode === 'sum' ? '(a+b)^{2}' : '(a-b)^{2}'}$ es mayor que $a^{2}+b^{2}$?`, `قبل رؤية النتيجة: هل المساحة $${mode === 'sum' ? '(a+b)^{2}' : '(a-b)^{2}'}$ أكبر من $a^{2}+b^{2}$؟`, `Before you see the result: is the area $${mode === 'sum' ? '(a+b)^{2}' : '(a-b)^{2}'}$ greater than $a^{2}+b^{2}$?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Berdina', 'Igual', 'يساويها', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={squarePrediction(state)}
            choice={state.prediction}
            tip={mode === 'sum'
                ? say('Bi laukizuzenak, $2ab$, gehitzen dira beti.', 'Siempre se añaden los dos rectángulos, $2ab$.', 'يُضاف دائمًا المستطيلان $2ab$.', 'The two rectangles, $2ab$, are always added.')
                : mode === 'diff'
                    ? say('$2ab$ kentzen da, eta $2ab>b^{2}$ da beti, $a>b$ delako.', 'Se resta $2ab$, y $2ab>b^{2}$ siempre, porque $a>b$.', 'نطرح $2ab$ و$2ab>b^{2}$ دائمًا لأن $a>b$.', '$2ab$ is subtracted, and $2ab>b^{2}$ always, because $a>b$.')
                    : say('$b^{2}$ kentzen zaio $a^{2}$ karratuari.', 'A $a^{2}$ se le quita $b^{2}$.', 'نطرح $b^{2}$ من $a^{2}$.', '$b^{2}$ is taken away from $a^{2}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={latex} note={note} />
        </Predict>
    )
    const height = side * u + 64
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={squareChallenges} extraChallenges={squareExtra} state={state}>
            <Board height={height} label={l(modeNames[mode])}>
                {mode === 'sum' && (
                    <g>
                        {piece(x0, y0, a * u, a * u, STAGE_TINT, STAGE, 'a²', -1, -1)}
                        {piece(x0 + a * u, y0, b * u, a * u, SECOND_TINT, SECOND, 'ab', 1, -1)}
                        {piece(x0, y0 + a * u, a * u, b * u, SECOND_TINT, SECOND, 'ab', -1, 1)}
                        {piece(x0 + a * u, y0 + a * u, b * u, b * u, MUSTARD_TINT, MUSTARD, 'b²', 1, 1)}
                    </g>
                )}
                {mode === 'diff' && (
                    <g>
                        {piece(x0, y0, a * u, a * u, '#fff', MUTED, '', 0, 0, true)}
                        {piece(x0, y0, (a - b) * u, (a - b) * u, GREEN_TINT, GREEN, '(a−b)²', -1, -1)}
                        {piece(x0 + (a - b) * u, y0, b * u, a * u, SECOND_TINT, SECOND, 'ab', 1, 0)}
                        {piece(x0, y0 + (a - b) * u, a * u, b * u, SECOND_TINT, SECOND, 'ab', 0, 1)}
                        {piece(x0 + (a - b) * u, y0 + (a - b) * u, b * u, b * u, MUSTARD_TINT, MUSTARD, 'b²', 1, 1)}
                    </g>
                )}
                {mode === 'product' && (
                    <g>
                        {piece(x0, y0, a * u, a * u, STAGE_TINT, STAGE, 'a² − b²')}
                        {piece(x0 + (a - b) * u, y0 + (a - b) * u, b * u, b * u, '#fff', MUTED, 'b²', 1, 1, true)}
                    </g>
                )}
                <text x={x0 - 8} y={y0 + (mode === 'sum' ? a * u : a * u) / 2 + 5} textAnchor="end" fontSize={14} fontWeight={700} fill={STAGE}>a</text>
                {mode === 'sum' && <text x={x0 - 8} y={y0 + a * u + (b * u) / 2 + 5} textAnchor="end" fontSize={14} fontWeight={700} fill={MUSTARD}>b</text>}
                <Label x={180} y={height - 14} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{shown ? `${l(say('Azalera', 'Área', 'المساحة', 'Area'))} = ${area}` : `${l(say('Azalera', 'Área', 'المساحة', 'Area'))} = ?`}</Label>
            </Board>
            <PlayButton label={l(say('Banandu zatiak', 'Separar las piezas', 'افصل القطع', 'Pull the pieces apart'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The remainder machine ---------- */

export function RemainderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MachineState>(initialMachineState)
    const shown = state.prediction !== null
    const coefficients = MACHINE_POLYNOMIALS[state.polynomial]
    const playback = usePlayback(`${state.polynomial}`, 3000)
    const { middle, bottom } = ruffiniTable(coefficients, state.a)
    const remainder = machineRemainder(state)
    // The graph: P(a) for every whole a from −5 to 5; ▶ draws them one by one
    const values = Array.from({ length: 11 }, (_, i) => ({ a: i - 5, value: valueAt(coefficients, i - 5) }))
    const limit = Math.min(30, Math.max(...values.map((point) => Math.abs(point.value))))
    const gx = (a: number) => 40 + (a + 5) * 28
    const gy = (value: number) => 236 - (Math.max(-limit, Math.min(limit, value)) / limit) * 52 - 52
    const swept = playback.progress === null ? (shown ? 11 : 0) : Math.floor(playback.progress * 11)
    const cell = Math.min(52, 270 / coefficients.length)
    const tx = 60
    const controls = (
        <>
            <Segmented label={l(say('Polinomioa', 'Polinomio', 'كثير الحدود', 'Polynomial'))} value={String(state.polynomial)} options={MACHINE_POLYNOMIALS.map((_, index) => ({ value: String(index), label: `P${'₁₂₃₄₅'[index]}` }))} onChange={(polynomial) => setState((s) => setMachine(s, { polynomial: Number(polynomial) }))} />
            <Stepper label="a" value={state.a} min={MACHINE_A.min} max={MACHINE_A.max} onChange={(a) => setState((s) => setMachine(s, { a }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Emaitza ikusi aurretik: $(${polyLatex(coefficients)}):(x-(${state.a}))$ zatiketaren hondarra zer izango da?`, `Antes de ver el resultado: ¿cómo será el resto de $(${polyLatex(coefficients)}):(x-(${state.a}))$?`, `قبل رؤية النتيجة: كيف يكون باقي $(${polyLatex(coefficients)}):(x-(${state.a}))$؟`, `Before you see the result: what will the remainder of $(${polyLatex(coefficients)}):(x-(${state.a}))$ be like?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('Zero', 'Cero', 'صفر', 'Zero'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={machinePrediction(state)}
            choice={state.prediction}
            tip={say(`Hondarra $P(${state.a})$ da: kalkulatu zuzenean.`, `El resto es $P(${state.a})$: calcúlalo directamente.`, `الباقي هو $P(${state.a})$: احسبه مباشرة.`, `The remainder is $P(${state.a})$: work it out directly.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`P(${state.a})=${remainder}`]} note={remainder === 0 ? l(say(`Hondarra 0: $x=${state.a}$ erroa da eta $x-(${state.a})$ faktore bat.`, `Resto 0: $x=${state.a}$ es raíz y $x-(${state.a})$ es un factor.`, `الباقي 0: $x=${state.a}$ جذر و$x-(${state.a})$ عامل.`, `Remainder 0: $x=${state.a}$ is a root and $x-(${state.a})$ is a factor.`)) : l(say('Taularen azken zenbakia eta $P(a)$ beti berdinak dira.', 'El último número de la tabla y $P(a)$ siempre coinciden.', 'آخر عدد في الجدول و$P(a)$ متساويان دائمًا.', 'The last number in the table and $P(a)$ always match.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={machineChallenges} extraChallenges={machineExtra} state={state}>
            <Board height={270} label={l(say(`Ruffiniren taula, a = ${state.a}`, `Tabla de Ruffini con a = ${state.a}`, `جدول روفيني مع a = ${state.a}`, `Ruffini's table with a = ${state.a}`))}>
                <text x={tx - 14} y={64} textAnchor="end" fontSize={17} fontWeight={700} fill={SECOND}>{state.a}</text>
                <line x1={tx - 6} x2={tx - 6} y1={14} y2={76} stroke={INK} strokeWidth={2} />
                <line x1={tx - 6} x2={tx + coefficients.length * cell} y1={76} y2={76} stroke={INK} strokeWidth={2} />
                {coefficients.map((coefficient, index) => {
                    const x = tx + index * cell + cell / 2
                    const last = index === coefficients.length - 1
                    return (
                        <g key={index}>
                            <text x={x} y={34} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{coefficient}</text>
                            {middle[index] !== null && <text x={x} y={64} textAnchor="middle" fontSize={15} fill={MUTED}>{middle[index]}</text>}
                            {last
                                ? (shown ? <text x={x} y={100} textAnchor="middle" fontSize={17} fontWeight={700} fill={remainder === 0 ? GREEN : SECOND}>{bottom[index]}</text> : <Hidden x={x} y={102} size={20} />)
                                : <text x={x} y={100} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{bottom[index]}</text>}
                            {last && <rect x={x - cell / 2 + 4} y={82} width={cell - 8} height={26} fill="none" stroke={remainder === 0 && shown ? GREEN : SECOND} strokeWidth={1.5} />}
                        </g>
                    )
                })}
                <line x1={30} x2={340} y1={gy(0)} y2={gy(0)} stroke={INK} strokeWidth={1.4} />
                {values.map((point) => <text key={point.a} x={gx(point.a)} y={gy(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{point.a}</text>)}
                {values.slice(0, swept).map((point) => <circle key={point.a} cx={gx(point.a)} cy={gy(point.value)} r={point.value === 0 ? 6 : 4} fill={point.value === 0 ? GREEN : STAGE} stroke={INK} strokeWidth={1} opacity={Math.abs(point.value) > limit ? 0.4 : 1} />)}
                {shown && <circle cx={gx(state.a)} cy={gy(remainder)} r={8} fill="none" stroke={SECOND} strokeWidth={2.5} />}
            </Board>
            <PlayButton label={l(say('Probatu a guztiak', 'Probar todos los a', 'جرّب كل قيم a', 'Try every a'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The rectangle that factorises ---------- */

export function FactorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FactorState>(initialFactorState)
    const shown = state.prediction !== null
    const { b, c } = TRINOMIALS[state.trinomial]
    const X = 86
    const u = Math.min(16, (300 - X) / Math.max(state.p, state.q, 1))
    const x0 = 40
    const y0 = 52
    const strips = state.p + state.q
    const units = state.p * state.q
    const fits = factorFits(state)
    const controls = (
        <>
            <Segmented label={l(say('Trinomioa', 'Trinomio', 'ثلاثي الحدود', 'Trinomial'))} value={String(state.trinomial)} options={TRINOMIALS.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(trinomial) => setState((s) => setFactor(s, { trinomial: Number(trinomial) }))} />
            <Stepper label="p" value={state.p} min={0} max={FACTOR_LIMIT} onChange={(p) => setState((s) => setFactor(s, { p }))} language={props.language} />
            <Stepper label="q" value={state.q} min={0} max={FACTOR_LIMIT} onChange={(q) => setState((s) => setFactor(s, { q }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Emaitza ikusi aurretik: $${trinomialLatex(state.trinomial)}$ fitxekin, zer egin daiteke?`, `Antes de ver el resultado: con las fichas de $${trinomialLatex(state.trinomial)}$, ¿qué se puede formar?`, `قبل رؤية النتيجة: برقاقات $${trinomialLatex(state.trinomial)}$ ماذا يمكن أن نكوّن؟`, `Before you see the result: with the tiles of $${trinomialLatex(state.trinomial)}$, what can you make?`)}
            labels={{ '<': say('Ezer ez', 'Nada', 'لا شيء', 'Nothing'), '=': say('Karratu bat', 'Un cuadrado', 'مربعًا', 'A square'), '>': say('Laukizuzen bat', 'Un rectángulo', 'مستطيلًا', 'A rectangle') }}
            actual={factorPrediction(state)}
            choice={state.prediction}
            tip={say(`Bilatu bi zenbaki: batura ${b} eta biderkadura ${c}.`, `Busca dos números que sumen ${b} y multiplicados den ${c}.`, `ابحث عن عددين مجموعهما ${b} وحاصل ضربهما ${c}.`, `Look for two numbers that add up to ${b} and multiply to ${c}.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`(x+${state.p})(x+${state.q})=x^{2}+${strips}x+${units}`]} note={fits ? l(say(`Fitxa guztiak erabili dira: $${trinomialLatex(state.trinomial)}=(x+${state.p})(x+${state.q})$.`, `Se han usado todas las fichas: $${trinomialLatex(state.trinomial)}=(x+${state.p})(x+${state.q})$.`, `استُعملت كل الرقاقات: $${trinomialLatex(state.trinomial)}=(x+${state.p})(x+${state.q})$.`, `All the tiles have been used: $${trinomialLatex(state.trinomial)}=(x+${state.p})(x+${state.q})$.`)) : l(say(`Behar dira ${b} zerrenda eta ${c} karratu txiki; laukizuzen honek ${strips} eta ${units} ditu.`, `Hacen falta ${b} tiras y ${c} cuadraditos; este rectángulo tiene ${strips} y ${units}.`, `يلزم ${b} شرائط و${c} مربعات صغيرة؛ وهذا المستطيل فيه ${strips} و${units}.`, `You need ${b} strips and ${c} small squares; this rectangle has ${strips} and ${units}.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={factorChallenges} extraChallenges={factorExtra} state={state}>
            <Board height={y0 + X + FACTOR_LIMIT * 16 + 30} label={l(say(`(x + ${state.p})(x + ${state.q}) laukizuzena`, `Rectángulo (x + ${state.p})(x + ${state.q})`, `المستطيل (x + ${state.p})(x + ${state.q})`, `Rectangle (x + ${state.p})(x + ${state.q})`))}>
                <Label x={180} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{`x² + ${b}x + ${c}`}</Label>
                <text x={180} y={42} textAnchor="middle" fontSize={13} fill={fits ? GREEN : MUTED}>{shown ? `${strips}/${b} · ${units}/${c}` : '?'}</text>
                <rect x={x0} y={y0} width={X} height={X} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                <text x={x0 + X / 2} y={y0 + X / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>x²</text>
                {Array.from({ length: state.p }, (_, i) => <rect key={`p${i}`} x={x0 + X + i * u} y={y0} width={u} height={X} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.4} />)}
                {Array.from({ length: state.q }, (_, i) => <rect key={`q${i}`} x={x0} y={y0 + X + i * u} width={X} height={u} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.4} />)}
                {Array.from({ length: units }, (_, i) => <rect key={`u${i}`} x={x0 + X + (i % Math.max(state.p, 1)) * u} y={y0 + X + Math.floor(i / Math.max(state.p, 1)) * u} width={u} height={u} fill={MUSTARD_TINT} stroke={MUSTARD} strokeWidth={1.2} />)}
                <text x={x0 + X + (state.p * u) / 2} y={y0 - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{state.p}</text>
                <text x={x0 - 8} y={y0 + X + (state.q * u) / 2 + 5} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND}>{state.q}</text>
            </Board>
        </ToolFrame>
    )
}
