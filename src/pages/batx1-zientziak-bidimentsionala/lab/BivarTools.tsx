import { useId, useRef, useState, type PointerEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { CELL_LIMITS, expectedCell, independenceChallenges, independenceExtra, independencePrediction, initialIndependenceState, rowTotal, setCell, tableTotal, type IndependenceState } from './independenceTable'
import { initialQuadrantState, movePoint, POINT_COUNT, productSum, QUADRANT_LIMITS, quadrantChallenges, quadrantExtra, quadrantPrediction, quadrantProducts, quadrantStats, selectPoint, type QuadrantState } from './quadrantBoard'
import { initialScissorsState, SCISSORS, scissorsChallenges, scissorsCloud, scissorsExtra, scissorsPrediction, scissorsSlopes, setScissorsR, tenthsLatex, type ScissorsState } from './scissors'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — the three
   tools of this unit: the four quadrants (five points dragged around the
   centre of gravity, each with its signed rectangle), the scissors (the
   two regression lines closing as |r| grows, with ▶) and «independent?»
   (a 2 × 2 table whose rows become bars of 100 %). Each asks for a
   prediction before it shows the result. Logic in quadrantBoard.ts,
   scissors.ts and independenceTable.ts.
   ========================================================================== */

const LINE = '#e3ddd1'
/** The two regression lines keep their colours whatever the stage: blue for y on x, red for x on y */
const BLUE = '#2f6fdb'
const RED = '#c4432a'
const minus = (text: string) => text.replace(/^-/, '−')

/* ---------- L1. The four quadrants ---------- */

const qx = (value: number) => 34 + value * 36
const qy = (value: number) => 236 - value * 25

export function QuadrantsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<QuadrantState>(initialQuadrantState)
    const shown = state.prediction !== null
    const stats = quadrantStats(state)
    const products = quadrantProducts(state)
    const sum = productSum(state)
    const dragging = useRef(false)
    const toBoard = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect()
        const scale = 360 / box.width
        return [(event.clientX - box.left) * scale, (event.clientY - box.top) * scale] as const
    }
    const toValue = ([bx, by]: readonly [number, number]) => [(bx - 34) / 36, (236 - by) / 25] as [number, number]
    const onDown = (event: PointerEvent<HTMLDivElement>) => {
        const point = toBoard(event)
        // The nearest point within reach is picked up; elsewhere, the selected point jumps there
        const distances = state.points.map(([x, y]) => Math.hypot(qx(x) - point[0], qy(y) - point[1]))
        const nearest = distances.indexOf(Math.min(...distances))
        const index = distances[nearest] < 28 ? nearest : state.selected
        dragging.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        setState((s) => movePoint(s, index, toValue(point)))
    }
    const onMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return
        const point = toBoard(event)
        setState((s) => movePoint(s, s.selected, toValue(point)))
    }
    const selected = state.points[state.selected]
    const controls = (
        <>
            <Segmented<string> label={l(say('Puntua', 'Punto', 'النقطة', 'Point'))} value={String(state.selected)} options={state.points.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(value) => setState((s) => selectPoint(s, Number(value)))} />
            <Stepper label="x" value={selected[0]} min={QUADRANT_LIMITS.min} max={QUADRANT_LIMITS.max} onChange={(x) => setState((s) => movePoint(s, s.selected, [x, s.points[s.selected][1]]))} language={props.language} />
            <Stepper label="y" value={selected[1]} min={QUADRANT_LIMITS.min} max={QUADRANT_LIMITS.max} onChange={(y) => setState((s) => movePoint(s, s.selected, [s.points[s.selected][0], y]))} language={props.language} />
        </>
    )
    const prediction = quadrantPrediction(state)
    const latex = [
        `(\\bar{x},\\,\\bar{y})=(${texDec(stats.mx, props.language)},\\,${texDec(stats.my, props.language)})`,
        `\\sigma_{xy}=\\frac{${texDec(sum, props.language)}}{${POINT_COUNT}}=${texDec(stats.cxy, props.language, 3)}`
    ]
    const verdict = prediction === '>'
        ? say('Laukizuzen berdeek irabazten dute: kobariantza positiboa da, eta hodeiak gora egiten du.', 'Ganan los rectángulos verdes: la covarianza es positiva y la nube sube.', 'تغلب المستطيلات الخضراء: التغاير موجب والسحابة تصعد.', 'The green rectangles win: the covariance is positive and the cloud rises.')
        : prediction === '<'
            ? say('Laukizuzen koralek irabazten dute: kobariantza negatiboa da, eta hodeiak behera egiten du.', 'Ganan los rectángulos corales: la covarianza es negativa y la nube baja.', 'تغلب المستطيلات المرجانية: التغاير سالب والسحابة تهبط.', 'The coral rectangles win: the covariance is negative and the cloud falls.')
            : say('Berdeak eta koralak berdintsu: kobariantza 0 da, ez dago mendekotasun linealik.', 'Verdes y corales se compensan: la covarianza es 0, no hay dependencia lineal.', 'تتعادل الخضراء والمرجانية: التغاير 0، ولا يوجد ارتباط خطي.', 'Green and coral balance out: the covariance is 0, there is no linear dependence.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: nolakoa da kobariantza?', 'Antes de verlo: ¿cómo es la covarianza?', 'قبل أن ترى: كيف التغاير؟', 'Before you see it: what is the covariance like?')}
            labels={{ '<': say('Negatiboa', 'Negativa', 'سالب', 'Negative'), '=': say('Zero', 'Cero', 'صفر', 'Zero'), '>': say('Positiboa', 'Positiva', 'موجب', 'Positive') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Begiratu zein koadrantetan dauden puntuak eta zein urrun dauden zentrotik: urrun daudenek gehiago pisatzen dute.', 'Mira en qué cuadrantes están los puntos y a qué distancia del centro: los lejanos pesan más.', 'انظر في أي الأرباع تقع النقاط وكم تبعد عن المركز: البعيدة ترجح أكثر.', 'Look at which quadrants the points are in and how far they are from the centre: the far ones weigh more.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(verdict)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={quadrantChallenges} extraChallenges={quadrantExtra} state={state}>
            <div style={{ touchAction: 'none', cursor: 'grab' }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => { dragging.current = false }} onPointerCancel={() => { dragging.current = false }}>
                <Board height={270} label={l(say('Bost puntu eta haien grabitate-zentroa', 'Cinco puntos y su centro de gravedad', 'خمس نقاط ومركز ثقلها', 'Five points and their centre of gravity'))}>
                    {Array.from({ length: 9 }, (_, value) => (
                        <g key={value}>
                            <line x1={qx(value)} x2={qx(value)} y1={qy(0)} y2={qy(8)} stroke={LINE} strokeWidth={1} />
                            <line x1={qx(0)} x2={qx(8)} y1={qy(value)} y2={qy(value)} stroke={LINE} strokeWidth={1} />
                            <text x={qx(value)} y={qy(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                            <text x={qx(0) - 8} y={qy(value) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{value}</text>
                        </g>
                    ))}
                    <line x1={qx(0)} x2={qx(8)} y1={qy(0)} y2={qy(0)} stroke={INK} strokeWidth={1.6} />
                    <line x1={qx(0)} x2={qx(0)} y1={qy(0)} y2={qy(8)} stroke={INK} strokeWidth={1.6} />
                    {shown && state.points.map(([x, y], index) => {
                        const positive = products[index] > 0
                        return <rect key={`r${index}`} x={Math.min(qx(x), qx(stats.mx))} y={Math.min(qy(y), qy(stats.my))} width={Math.abs(qx(x) - qx(stats.mx))} height={Math.abs(qy(y) - qy(stats.my))} fill={positive ? GREEN_TINT : SECOND_TINT} fillOpacity={0.75} stroke={positive ? GREEN : SECOND} strokeWidth={1.4} />
                    })}
                    <line x1={qx(stats.mx)} x2={qx(stats.mx)} y1={qy(0)} y2={qy(8)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="5 4" />
                    <line x1={qx(0)} x2={qx(8)} y1={qy(stats.my)} y2={qy(stats.my)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="5 4" />
                    {shown && ([['I', 7.6, 7.6], ['II', 0.4, 7.6], ['III', 0.4, 0.4], ['IV', 7.6, 0.4]] as const).map(([name, x, y]) => <text key={name} x={qx(x)} y={qy(y) + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{name}</text>)}
                    {state.points.map(([x, y], index) => (
                        <g key={`p${index}`}>
                            <circle cx={qx(x)} cy={qy(y)} r={9} fill={index === state.selected ? STAGE : PAPER} stroke={STAGE} strokeWidth={2.2} />
                            <text x={qx(x)} y={qy(y) + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={index === state.selected ? PAPER : STAGE}>{index + 1}</text>
                        </g>
                    ))}
                    <circle cx={qx(stats.mx)} cy={qy(stats.my)} r={5} fill={SECOND} stroke={INK} strokeWidth={1.2} />
                    {!shown && <Hidden x={300} y={60} size={28} />}
                </Board>
            </div>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Arrastatu puntuak taulan zehar.', 'Arrastra los puntos por el tablero.', 'اسحب النقاط على اللوحة.', 'Drag the points around the board.'))}</p>
        </ToolFrame>
    )
}

/* ---------- L2. The scissors ---------- */

const sx = (value: number) => 40 + value * 30
const sy = (value: number) => 270 - value * 12.5

export function ScissorsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const clip = useId().replace(/:/g, '')
    const [state, setState] = useState<ScissorsState>(initialScissorsState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.r10}`, 5000)
    // While ▶ runs, r goes from −1 to 1 and the lines turn with it; then they go back to the learner's r
    const running = playback.playing && playback.progress !== null
    const r = running ? -1 + 2 * (playback.progress as number) : state.r10 / 10
    const cloud = scissorsCloud(r)
    const lines = (value: number) => {
        const { myx, mxy } = scissorsSlopes(value)
        return {
            yx: [[0, SCISSORS.my - myx * SCISSORS.mx], [10, SCISSORS.my + myx * (10 - SCISSORS.mx)]] as const,
            xy: [[SCISSORS.mx - mxy * SCISSORS.my, 0], [SCISSORS.mx + mxy * (20 - SCISSORS.my), 20]] as const
        }
    }
    const drawn = lines(r)
    const reference = lines(state.reference10 / 10)
    const { myx, mxy } = scissorsSlopes(state.r10 / 10)
    /** r for LaTeX: the decimal comma in Basque, Spanish and English (MathText writes the point in English), the point in Arabic */
    const tex = (tenths: number) => (props.language === 'ar' ? tenthsLatex(tenths).replace('{,}', '.') : tenthsLatex(tenths))
    const rText = tex(state.r10)
    const controls = (
        <Stepper label="r" value={state.r10} min={-10} max={10} format={(value) => minus(dec(value / 10, props.language, 1))} onChange={(value) => setState((s) => setScissorsR(s, value))} language={props.language} />
    )
    const prediction = scissorsPrediction(state)
    const latex = [
        `m_{yx}=2\\cdot ${rText === '0' ? '0' : `(${rText})`}=${texDec(myx, props.language)}`,
        `m_{xy}=\\frac{${rText}}{2}=${texDec(mxy, props.language)}`,
        `m_{yx}\\cdot m_{xy}=${texDec(myx * mxy, props.language)}=r^2`
    ]
    const verdict = prediction === '<'
        ? say('|r| handiagoa da: guraizeak ixten dira.', '|r| es mayor: las tijeras se cierran.', '|r| أكبر: ينغلق المقصّ.', '|r| is bigger: the scissors close.')
        : prediction === '>'
            ? say('|r| txikiagoa da: guraizeak irekitzen dira.', '|r| es menor: las tijeras se abren.', '|r| أصغر: ينفتح المقصّ.', '|r| is smaller: the scissors open.')
            : say('|r| bera da: angelu bera, noranzkoa aldatu bada ere.', '|r| es el mismo: el mismo ángulo, aunque cambie hacia dónde van.', '|r| نفسه: الزاوية نفسها وإن تغيّر الاتجاه.', '|r| is the same: the same angle, even if the direction changes.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $r=${rText}$ denean, nolakoak dira zuzenak, $r=${tex(state.reference10)}$ denean baino?`, `Antes de verlo: con $r=${rText}$, ¿cómo quedan las rectas respecto a $r=${tex(state.reference10)}$?`, `قبل أن ترى: مع $r=${rText}$ كيف يكون المستقيمان مقارنةً بـ $r=${tex(state.reference10)}$؟`, `Before you see it: with $r=${rText}$, how are the lines compared with $r=${tex(state.reference10)}$?`)}
            labels={{ '<': say('Itxiago', 'Más cerradas', 'أكثر انغلاقًا', 'More closed'), '=': say('Berdin', 'Igual', 'كما هما', 'The same'), '>': say('Irekiago', 'Más abiertas', 'أكثر انفتاحًا', 'More open') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Hodeia zenbat eta estuagoa, orduan eta hurbilago bi zuzenak. Zeinuak noranzkoa bakarrik aldatzen du.', 'Cuanto más estrecha la nube, más juntas las dos rectas. El signo solo cambia hacia dónde van.', 'كلما ضاقت السحابة اقترب المستقيمان. والإشارة تغيّر الاتجاه فقط.', 'The narrower the cloud, the closer the two lines. The sign only changes which way they go.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(verdict)} />
        </Predict>
    )
    const segment = (ends: readonly (readonly [number, number])[], color: string, dashed = false) => (
        <line x1={sx(ends[0][0])} y1={sy(ends[0][1])} x2={sx(ends[1][0])} y2={sy(ends[1][1])} stroke={color} strokeWidth={dashed ? 1.6 : 2.6} strokeDasharray={dashed ? '6 5' : undefined} clipPath={`url(#${clip})`} />
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={scissorsChallenges} extraChallenges={scissorsExtra} state={state}>
            <Board height={300} label={l(say('Hodeia eta bi erregresio-zuzenak', 'La nube y las dos rectas de regresión', 'السحابة ومستقيما الانحدار', 'The cloud and the two regression lines'))}>
                <clipPath id={clip}><rect x={sx(0)} y={sy(20)} width={sx(10) - sx(0)} height={sy(0) - sy(20)} /></clipPath>
                {[0, 2, 4, 6, 8, 10].map((value) => (
                    <g key={`x${value}`}>
                        <line x1={sx(value)} x2={sx(value)} y1={sy(0)} y2={sy(20)} stroke={LINE} strokeWidth={1} />
                        <text x={sx(value)} y={sy(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                    </g>
                ))}
                {[0, 5, 10, 15, 20].map((value) => (
                    <g key={`y${value}`}>
                        <line x1={sx(0)} x2={sx(10)} y1={sy(value)} y2={sy(value)} stroke={LINE} strokeWidth={1} />
                        <text x={sx(0) - 8} y={sy(value) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{value}</text>
                    </g>
                ))}
                <line x1={sx(0)} x2={sx(10)} y1={sy(0)} y2={sy(0)} stroke={INK} strokeWidth={1.6} />
                <line x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(20)} stroke={INK} strokeWidth={1.6} />
                {!running && segment(reference.yx, MUTED, true)}
                {!running && segment(reference.xy, MUTED, true)}
                {cloud.map(([x, y], index) => <circle key={index} cx={sx(x)} cy={sy(y)} r={5} fill={PAPER} stroke={INK} strokeWidth={1.4} />)}
                {(shown || running) && segment(drawn.yx, BLUE)}
                {(shown || running) && segment(drawn.xy, RED)}
                <circle cx={sx(SCISSORS.mx)} cy={sy(SCISSORS.my)} r={5} fill={INK} />
                {(shown || running) && <text x={sx(9.8)} y={sy(19)} textAnchor="end" fontSize={12} fontWeight={700} fill={INK} direction="ltr">r = {minus(dec(r, props.language, 1))}</text>}
                {!shown && !running && <Hidden x={300} y={60} size={28} />}
            </Board>
            <PlayButton label={l(say('Mugitu r −1 eta 1 artean', 'Mueve r de −1 a 1', 'حرّك r من −1 إلى 1', 'Move r from −1 to 1'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Urdina: Y-ren X-rekikoa · gorria: X-ren Y-rekikoa · marra etenak: aurreko r', 'Azul: Y sobre X · roja: X sobre Y · a trazos: el r anterior', 'الأزرق: Y على X · الأحمر: X على Y · المتقطّع: r السابق', 'Blue: Y on X · red: X on Y · dashed: the previous r'))}</p>
        </ToolFrame>
    )
}

/* ---------- L3. Independent? ---------- */

const ROWS = [say('Neskak', 'Chicas', 'البنات', 'Girls'), say('Mutilak', 'Chicos', 'الأولاد', 'Boys')] as const

export function IndependenceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<IndependenceState>(initialIndependenceState)
    const shown = state.prediction !== null
    const total = tableTotal(state)
    const columnYes = state.cells[0][0] + state.cells[1][0]
    const controls = (
        <>
            {([0, 1] as const).flatMap((row) => ([0, 1] as const).map((column) => (
                <Stepper key={`${row}-${column}`} label={`${l(ROWS[row])} · ${l(column === 0 ? say('bai', 'sí', 'نعم', 'yes') : say('ez', 'no', 'لا', 'no'))}`} value={state.cells[row][column]} min={CELL_LIMITS.min} max={CELL_LIMITS.max} onChange={(value) => setState((s) => setCell(s, row, column, value))} language={props.language} />
            )))}
        </>
    )
    const prediction = independencePrediction(state)
    /** = when two decimals say it exactly, ≈ otherwise */
    const equals = (value: number) => (Math.abs(value * 100 - Math.round(value * 100)) < 1e-9 ? '=' : '\\approx ')
    const share = (row: 0 | 1) => {
        if (rowTotal(state, row) === 0) return '—'
        const value = state.cells[row][0] / rowTotal(state, row)
        return `\\frac{${state.cells[row][0]}}{${rowTotal(state, row)}}${equals(value)}${texDec(value, props.language)}`
    }
    const latex = [
        `${share(0)}\\qquad ${share(1)}`,
        total === 0 ? '—' : `\\frac{${rowTotal(state, 0)}\\cdot ${columnYes}}{${total}}${equals(expectedCell(state))}${texDec(expectedCell(state), props.language)}`
    ]
    const verdict = prediction === '='
        ? say('Bi errenkadek «bai» zati bera dute: aldagaiak independenteak dira.', 'Las dos filas tienen la misma parte de «sí»: las variables son independientes.', 'للسطرين نصيب «نعم» نفسه: المتغيران مستقلان.', 'Both rows have the same share of «yes»: the variables are independent.')
        : say('Zatiak desberdinak dira: kirola egitea neska ala mutila izatearen araberakoa da. Bigarren lerroak independentziak eskatuko lukeen gelaxka ematen du.', 'Las partes son distintas: hacer deporte depende de ser chica o chico. La segunda línea da la casilla que pediría la independencia.', 'النصيبان مختلفان: ممارسة الرياضة مرتبطة بكون التلميذ بنتًا أو ولدًا. ويعطي السطر الثاني الخانة التي يتطلبها الاستقلال.', 'The shares are different: doing sport depends on being a girl or a boy. The second line gives the cell that independence would need.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: non da handiagoa «bai» zatia?', 'Antes de verlo: ¿dónde es mayor la parte de «sí»?', 'قبل أن ترى: أين نصيب «نعم» أكبر؟', 'Before you see it: where is the share of «yes» bigger?')}
            labels={{ '<': say('Mutilen artean', 'Entre los chicos', 'بين الأولاد', 'Among the boys'), '=': say('Berdin: independenteak', 'Igual: independientes', 'متساويان: مستقلان', 'The same: independent'), '>': say('Nesken artean', 'Entre las chicas', 'بين البنات', 'Among the girls') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Ez begiratu zenbakiak bakarrik: zatitu errenkada bakoitzaren guztizkoaz.', 'No mires solo los números: divide entre el total de cada fila.', 'لا تنظر إلى الأعداد وحدها: اقسم على مجموع كل سطر.', 'Do not look only at the numbers: divide by the total of each row.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(verdict)} />
        </Predict>
    )
    const columnX = [190, 260, 330]
    const rowY = [52, 80, 108]
    const barLeft = 30
    const barWidth = 300
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={independenceChallenges} extraChallenges={independenceExtra} state={state}>
            <Board height={260} label={l(say('Sarrera bikoitzeko taula eta bi errenkadak barra gisa', 'La tabla de doble entrada y sus dos filas como barras', 'الجدول مزدوج المدخل وسطراه أعمدةً', 'The two-way table and its two rows as bars'))}>
                {[l(say('bai', 'sí', 'نعم', 'yes')), l(say('ez', 'no', 'لا', 'no')), l(say('guztira', 'total', 'المجموع', 'total'))].map((name, index) => <text key={name} x={columnX[index]} y={26} textAnchor="middle" fontSize={12} fontWeight={700} fill={index === 0 ? GREEN : index === 1 ? SECOND : MUTED}>{name}</text>)}
                <line x1={30} x2={350} y1={34} y2={34} stroke={INK} strokeWidth={1.4} />
                <line x1={150} x2={150} y1={12} y2={118} stroke={INK} strokeWidth={1.4} />
                {[...ROWS, say('Guztira', 'Total', 'المجموع', 'Total')].map((name, index) => <text key={index} x={90} y={rowY[index] + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={index < 2 ? STAGE : MUTED}>{l(name)}</text>)}
                {[0, 1].map((row) => [state.cells[row][0], state.cells[row][1], rowTotal(state, row as 0 | 1)].map((value, column) => <text key={`${row}-${column}`} x={columnX[column]} y={rowY[row] + 4} textAnchor="middle" fontSize={13} fontWeight={column === 2 ? 700 : 400} fill={INK}>{value}</text>))}
                {[columnYes, total - columnYes, total].map((value, column) => <text key={`t${column}`} x={columnX[column]} y={rowY[2] + 4} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{value}</text>)}
                <line x1={30} x2={350} y1={94} y2={94} stroke={INK} strokeWidth={1} />
                {([0, 1] as const).map((row) => {
                    const y = 140 + row * 52
                    const sum = rowTotal(state, row)
                    const yes = sum === 0 ? 0 : (state.cells[row][0] / sum) * barWidth
                    return (
                        <g key={row}>
                            <text x={barLeft} y={y - 5} fontSize={11} fontWeight={700} fill={STAGE}>{l(ROWS[row])}</text>
                            {shown && sum > 0
                                ? (
                                    <g>
                                        <rect x={barLeft} y={y} width={yes} height={28} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />
                                        <rect x={barLeft + yes} y={y} width={barWidth - yes} height={28} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.4} />
                                        {yes > 28 && <text x={barLeft + yes / 2} y={y + 18} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN} direction="ltr">{dec(state.cells[row][0] / sum, props.language)}</text>}
                                    </g>
                                )
                                : <rect x={barLeft} y={y} width={barWidth} height={28} fill={PAPER} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />}
                        </g>
                    )
                })}
                {shown && total > 0 && <line x1={barLeft + (columnYes / total) * barWidth} x2={barLeft + (columnYes / total) * barWidth} y1={130} y2={228} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />}
                {shown && <text x={180} y={248} textAnchor="middle" fontSize={11} fill={MUTED}>{l(say('Marra: «bai» zatia guztira', 'Raya: la parte de «sí» en total', 'الخط: نصيب «نعم» في المجموع', 'Line: the share of «yes» overall'))}</text>}
                {!shown && <Hidden x={180} y={190} size={28} />}
            </Board>
        </ToolFrame>
    )
}

