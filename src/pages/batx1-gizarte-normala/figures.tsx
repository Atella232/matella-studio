import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { binomialPmfDecimal } from '../batx2-zientziak-banaketak/binomial'
import { below, between, phiDensity, tableValue } from '../batx2-zientziak-banaketak/normal'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — lesson figures. Each one
   draws the numbers of its «Let's solve»: the waiting-time histogram, two
   exams on one scale, the train's flat density, the triangle f(x) = 0,08x,
   three bells, the bread's 68–95–99,7 bands, a corner of the table, the
   two equal tails, the coffee's two scales, the top 20 %, the survey's
   bars under their bell, the half step and the 80 heights fitted to
   N(170; 10). Bells and table values are computed (normal.ts). Formulas
   are written left to right in every language; Arabic labels carry words.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const SECOND_TINT = 'rgba(196, 67, 42, 0.25)'
const GREEN = '#267b53'
/** A table value (ten-thousandths) written with four decimals in a language */
const four = (language: UnitLanguage, tenThousandths: number) => num(language, (tenThousandths / 10_000).toFixed(4).replace('.', ','))

/** The bell of N(mean; sd) drawn between from and to on [left, right], its peak at top */
function bell({ left, right, baseline, top, from, to, mean, sd }: { left: number; right: number; baseline: number; top: number; from: number; to: number; mean: number; sd: number }) {
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const peak = phiDensity(0)
    const sy = (value: number) => baseline - (phiDensity((value - mean) / sd) / peak) * (baseline - top)
    const trace = (a: number, b: number, steps = 90) => Array.from({ length: steps + 1 }, (_, index) => a + ((b - a) * index) / steps).map((value, index) => `${index ? 'L' : 'M'}${sx(value).toFixed(1)} ${sy(value).toFixed(1)}`).join(' ')
    const area = (a: number, b: number) => `${trace(a, b, 60)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
    return { sx, sy, curve: trace(from, to, 160), area }
}

/** A horizontal axis with ticks and their labels */
function Axis({ left, right, y, ticks }: { left: number; right: number; y: number; ticks: Array<{ x: number; label: string; color?: string }> }) {
    return (
        <g>
            <line x1={left} x2={right} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((tick, index) => (
                <g key={index}>
                    <line x1={tick.x} x2={tick.x} y1={y} y2={y + 7} stroke={INK} strokeWidth={1.6} />
                    <text x={tick.x} y={y + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={tick.color ?? MUTED} direction="ltr">{tick.label}</text>
                </g>
            ))}
        </g>
    )
}

/* ---------- 1. The histogram as an area ---------- */

export function HistogramFigure({ language }: { language: UnitLanguage }) {
    const classes = [{ a: 0, b: 2, h: 0.15 }, { a: 2, b: 4, h: 0.2 }, { a: 4, b: 6, h: 0.1 }, { a: 6, b: 10, h: 0.025 }]
    const sx = (x: number) => 60 + x * 44
    const sy = (h: number) => 230 - h * 800
    return (
        <Figure height={300} label={pick(language, say('Itxarote-denboren histograma', 'El histograma de los tiempos de espera', 'المدرج التكراري لأزمنة الانتظار', 'The histogram of the waiting times'))}>
            <rect x={sx(3)} y={sy(0.2)} width={sx(4) - sx(3)} height={230 - sy(0.2)} fill={SECOND_TINT} />
            <rect x={sx(4)} y={sy(0.1)} width={sx(5) - sx(4)} height={230 - sy(0.1)} fill={SECOND_TINT} />
            {classes.map((item, index) => <rect key={index} x={sx(item.a)} y={sy(item.h)} width={sx(item.b) - sx(item.a)} height={230 - sy(item.h)} fill="none" stroke={STAGE} strokeWidth={2} />)}
            {classes.map((item, index) => <text key={index} x={(sx(item.a) + sx(item.b)) / 2} y={sy(item.h) - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE} direction="ltr">{num(language, String(item.h).replace('.', ','))}</text>)}
            <Axis left={sx(0) - 6} right={sx(10) + 6} y={230} ticks={[0, 2, 3, 4, 5, 6, 10].map((x) => ({ x: sx(x), label: String(x), color: x === 3 || x === 5 ? SECOND : MUTED }))} />
            <Formula x={620} y={110} size={18} color={SECOND}>P(3 ≤ X ≤ 5)</Formula>
            <Formula x={620} y={146} size={18} color={SECOND}>= {num(language, '0,2')} + {num(language, '0,1')} = {num(language, '0,3')}</Formula>
            <Caption y={290} language={language} text={say('Altuera = proportzioa ÷ zabalera. Azalera gorria = probabilitatea', 'Altura = proporción ÷ anchura. Área roja = probabilidad', 'الارتفاع = النسبة ÷ العرض. المساحة الحمراء = الاحتمال', 'Height = proportion ÷ width. Red area = probability')} size={14} />
        </Figure>
    )
}

/* ---------- 2. Two exams on one scale ---------- */

export function ScoresFigure({ language }: { language: UnitLanguage }) {
    const sx = (z: number) => 360 + z * 120
    return (
        <Figure height={260} label={pick(language, say('Bi azterketa, puntuazio tipikoen eskalan', 'Dos exámenes en la escala de las puntuaciones típicas', 'امتحانان على مقياس الدرجات المعيارية', 'Two exams on the scale of standard scores'))}>
            <Axis left={sx(-2.6)} right={sx(2.6)} y={150} ticks={[-2, -1, 0, 1, 2].map((z) => ({ x: sx(z), label: String(z) }))} />
            <polygon points={`${sx(1.6)},140 ${sx(1.6) - 9},120 ${sx(1.6) + 9},120`} fill={SECOND} />
            <Label x={sx(1.6)} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('Ane', 'Ane', 'آنه', 'Ane'))}</Label>
            <Formula x={sx(1.6)} y={86} size={15} color={SECOND}>{num(language, '1,6')}</Formula>
            <polygon points={`${sx(1.5)},160 ${sx(1.5) - 9},180 ${sx(1.5) + 9},180`} fill={STAGE} />
            <Label x={sx(1.5)} y={202} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, say('Jon', 'Jon', 'جون', 'Jon'))}</Label>
            <Formula x={sx(1.5)} y={224} size={15} color={STAGE}>{num(language, '1,5')}</Formula>
            <Formula x={sx(-1.6)} y={60} size={18} color={INK}>z = (x − μ) / σ</Formula>
            <Caption y={250} language={language} text={say('Biak batez bestekotik gora; Ane urrunago', 'Los dos por encima de la media; Ane, más lejos', 'كلاهما فوق المتوسط؛ وآنه أبعد', 'Both above the mean; Ane, further')} size={14} />
        </Figure>
    )
}

/* ---------- 3. The train's flat density ---------- */

export function DensityFigure({ language }: { language: UnitLanguage }) {
    const sx = (x: number) => 50 + x * 52
    const sy = (h: number) => 220 - h * 600
    return (
        <Figure height={290} label={pick(language, say('Dentsitate laua 2 eta 7 artean', 'La densidad plana entre 2 y 7', 'الكثافة المستوية بين 2 و7', 'The flat density between 2 and 7'))}>
            <rect x={sx(3)} y={sy(0.2)} width={sx(5) - sx(3)} height={220 - sy(0.2)} fill={SECOND_TINT} />
            <polyline points={`${sx(0)},220 ${sx(2)},220 ${sx(2)},${sy(0.2)} ${sx(7)},${sy(0.2)} ${sx(7)},220 ${sx(8.5)},220`} fill="none" stroke={STAGE} strokeWidth={3} />
            <Axis left={sx(0)} right={sx(8.5)} y={220} ticks={[0, 2, 3, 4, 5, 7].map((x) => ({ x: sx(x), label: String(x), color: x === 3 || x === 5 ? SECOND : MUTED }))} />
            <line x1={sx(4)} x2={sx(4)} y1={sy(0.2)} y2={220} stroke={INK} strokeWidth={2} strokeDasharray="4 4" />
            <Formula x={sx(4.5)} y={sy(0.2) - 12} size={16} color={STAGE}>k = {num(language, '0,2')}</Formula>
            <Formula x={600} y={110} size={18} color={SECOND}>2 · {num(language, '0,2')} = {num(language, '0,4')}</Formula>
            <Formula x={600} y={150} size={18} color={INK}>P(X = 4) = 0</Formula>
            <Caption y={280} language={language} text={say('Lerro etenak ez du azalerarik', 'La línea discontinua no tiene área', 'الخط المتقطع لا مساحة له', 'The dashed line has no area')} size={14} />
        </Figure>
    )
}

/* ---------- 4. A triangle density ---------- */

export function TriangleFigure({ language }: { language: UnitLanguage }) {
    const sx = (x: number) => 60 + x * 70
    const sy = (h: number) => 230 - h * 420
    return (
        <Figure height={300} label={pick(language, say('f(x) = 0,08x dentsitatea 0 eta 5 artean', 'La densidad f(x) = 0,08x entre 0 y 5', 'الكثافة f(x) = 0.08x بين 0 و5', 'The density f(x) = 0.08x between 0 and 5'))}>
            <polygon points={`${sx(0)},230 ${sx(2)},${sy(0.16)} ${sx(2)},230`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.5} />
            <polygon points={`${sx(4)},230 ${sx(4)},${sy(0.32)} ${sx(5)},${sy(0.4)} ${sx(5)},230`} fill={SECOND_TINT} />
            <polyline points={`${sx(0)},230 ${sx(5)},${sy(0.4)} ${sx(5)},230`} fill="none" stroke={INK} strokeWidth={3} />
            <Axis left={sx(0) - 6} right={sx(5) + 20} y={230} ticks={[0, 2, 4, 5].map((x) => ({ x: sx(x), label: String(x) }))} />
            <Formula x={sx(1.3)} y={200} size={15} color={STAGE}>{num(language, '0,16')}</Formula>
            <Formula x={sx(4.5)} y={sy(0.42)} size={15} color={SECOND}>{num(language, '0,36')}</Formula>
            <Formula x={620} y={100} size={17} color={INK}>(5 · {num(language, '0,4')}) / 2 = 1</Formula>
            <Formula x={620} y={140} size={17} color={STAGE}>P(X ≤ 2) = {num(language, '0,16')}</Formula>
            <Formula x={620} y={180} size={17} color={SECOND}>P(X ≥ 4) = {num(language, '0,36')}</Formula>
            <Caption y={290} language={language} text={say('Urdina: triangelu txikia. Gorria: osoa ken 4 arteko triangelua', 'Azul: el triángulo pequeño. Rojo: el total menos el triángulo hasta 4', 'الأزرق: المثلث الصغير. الأحمر: الكل ناقص المثلث حتى 4', 'Blue: the small triangle. Red: the total minus the triangle up to 4')} size={13} />
        </Figure>
    )
}

/* ---------- 5. Three bells ---------- */

export function CurvesFigure({ language }: { language: UnitLanguage }) {
    const shapes = [{ mean: 170, sd: 8, color: STAGE, label: 'N(170; 8)' }, { mean: 170, sd: 4, color: SECOND, label: 'N(170; 4)' }, { mean: 155, sd: 8, color: GREEN, label: 'N(155; 8)' }]
    const sx = (x: number) => 40 + ((x - 125) / 75) * 640
    const sy = (value: number) => 230 - value * 1700
    const path = (mean: number, sd: number) => Array.from({ length: 151 }, (_, index) => 125 + index * 0.5).map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(phiDensity((x - mean) / sd) / sd).toFixed(1)}`).join(' ')
    return (
        <Figure height={300} label={pick(language, say('Hiru kanpai normal', 'Tres campanas normales', 'ثلاثة أجراس طبيعية', 'Three normal bells'))}>
            {shapes.map((shape) => <path key={shape.label} d={path(shape.mean, shape.sd)} fill="none" stroke={shape.color} strokeWidth={3} />)}
            <Axis left={sx(125)} right={sx(200)} y={230} ticks={[140, 155, 170, 185].map((x) => ({ x: sx(x), label: String(x) }))} />
            {shapes.map((shape, index) => <Formula key={shape.label} x={600} y={40 + index * 28} size={16} color={shape.color}>{shape.label}</Formula>)}
            <Caption y={288} language={language} text={say('σ txikiagoa: estuagoa eta altuagoa. μ desberdina: beste leku batean', 'σ menor: más estrecha y alta. μ distinta: en otro sitio', 'σ أصغر: أضيق وأعلى. μ مختلف: في موضع آخر', 'Smaller σ: narrower and taller. Different μ: somewhere else')} size={14} />
        </Figure>
    )
}

/* ---------- 6. The 68–95–99,7 rule ---------- */

export function SigmaFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 40, right: 680, baseline: 210, top: 40, from: 52, to: 88, mean: 70, sd: 5 })
    return (
        <Figure height={300} label={pick(language, say('N(70; 5) eta haren bandak', 'N(70; 5) y sus bandas', 'N(70; 5) ونطاقاته', 'N(70; 5) and its bands'))}>
            <path d={shape.area(60, 80)} fill={STAGE_TINT} />
            <path d={shape.area(65, 75)} fill={STAGE} fillOpacity={0.35} />
            <path d={shape.area(80, 88)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={3} />
            <Axis left={40} right={680} y={210} ticks={[55, 60, 65, 70, 75, 80, 85].map((x) => ({ x: shape.sx(x), label: String(x), color: x === 80 ? SECOND : MUTED }))} />
            <Formula x={shape.sx(70)} y={150} size={17} color={INK}>{four(language, between(-1, 1))}</Formula>
            <Formula x={shape.sx(70)} y={192} size={15} color={MUTED}>{four(language, between(-2, 2))}</Formula>
            <Formula x={shape.sx(84)} y={170} size={15} color={SECOND}>{four(language, (10_000 - between(-2, 2)) / 2)}</Formula>
            <Caption y={290} language={language} text={say('μ ± σ, μ ± 2σ eta 2σ baino gehiagoko isatsa', 'μ ± σ, μ ± 2σ y la cola más allá de 2σ', 'μ ± σ وμ ± 2σ والذيل بعد 2σ', 'μ ± σ, μ ± 2σ and the tail beyond 2σ')} size={14} />
        </Figure>
    )
}

/* ---------- 7. A corner of the table ---------- */

export function TableCornerFigure({ language }: { language: UnitLanguage }) {
    const rows = [1.1, 1.2, 1.3]
    const columns = [0.03, 0.04, 0.05]
    const cell = (row: number, column: number) => four(language, tableValue(Math.round((row + column) * 100) / 100))
    return (
        <Figure height={260} label={pick(language, say('Normalaren taularen zati bat', 'Un trozo de la tabla de la normal', 'جزء من جدول التوزيع الطبيعي', 'A piece of the normal table'))}>
            {columns.map((column, index) => <text key={column} x={260 + index * 120} y={50} textAnchor="middle" fontSize={17} fontWeight={700} fill={index === 1 ? SECOND : MUTED} direction="ltr">{num(language, column.toFixed(2).replace('.', ','))}</text>)}
            {rows.map((row, r) => (
                <g key={row}>
                    <text x={130} y={100 + r * 50} textAnchor="middle" fontSize={17} fontWeight={700} fill={r === 1 ? SECOND : MUTED} direction="ltr">{num(language, row.toFixed(1).replace('.', ','))}</text>
                    {columns.map((column, c) => (
                        <g key={column}>
                            {r === 1 && c === 1 && <rect x={210} y={74 + r * 50} width={100} height={36} rx={8} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} transform={`translate(${c * 120 - 0} 0)`} />}
                            <text x={260 + c * 120} y={100 + r * 50} textAnchor="middle" fontSize={17} fontWeight={r === 1 && c === 1 ? 700 : 500} fill={INK} direction="ltr">{cell(row, column)}</text>
                        </g>
                    ))}
                </g>
            ))}
            <line x1={170} x2={640} y1={62} y2={62} stroke={INK} strokeWidth={1.5} />
            <line x1={180} x2={180} y1={30} y2={230} stroke={INK} strokeWidth={1.5} />
            <Formula x={400} y={250} size={17} color={SECOND}>P(Z ≤ {num(language, '1,24')}) = {four(language, below(1.24))}</Formula>
        </Figure>
    )
}

/* ---------- 8. Two equal tails ---------- */

export function SymmetryFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 40, right: 680, baseline: 200, top: 40, from: -3.2, to: 3.2, mean: 0, sd: 1 })
    return (
        <Figure height={290} label={pick(language, say('Simetria: bi isats berdinak', 'Simetría: dos colas iguales', 'التماثل: ذيلان متساويان', 'Symmetry: two equal tails'))}>
            <path d={shape.area(-3.2, -0.8)} fill={SECOND_TINT} />
            <path d={shape.area(0.8, 3.2)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={3} />
            <Axis left={40} right={680} y={200} ticks={[-0.8, 0, 0.8, 1.5].map((z) => ({ x: shape.sx(z), label: num(language, String(z).replace('.', ',')).replace('-', '−'), color: Math.abs(z) === 0.8 ? SECOND : MUTED }))} />
            <line x1={shape.sx(1.5)} x2={shape.sx(1.5)} y1={shape.sy(1.5)} y2={200} stroke={STAGE} strokeWidth={2} strokeDasharray="5 4" />
            <Formula x={shape.sx(-2)} y={150} size={16} color={SECOND}>{four(language, below(-0.8))}</Formula>
            <Formula x={shape.sx(2.1)} y={150} size={16} color={SECOND}>{four(language, below(-0.8))}</Formula>
            <Caption y={282} language={language} text={say('−0,8 azpitik eta 0,8 gainetik: azalera bera', 'Por debajo de −0,8 y por encima de 0,8: la misma área', 'تحت −0.8 وفوق 0.8: المساحة نفسها', 'Below −0.8 and above 0.8: the same area')} size={14} />
        </Figure>
    )
}

/* ---------- 9. The coffee's two scales ---------- */

export function CoffeeFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 40, right: 680, baseline: 180, top: 30, from: 238, to: 262, mean: 250, sd: 4 })
    return (
        <Figure height={300} label={pick(language, say('N(250; 4) eta haren z eskala', 'N(250; 4) y su escala z', 'N(250; 4) ومقياس z', 'N(250; 4) and its z scale'))}>
            <path d={shape.area(238, 256)} fill={STAGE_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={3} />
            <Axis left={40} right={680} y={180} ticks={[242, 246, 250, 254, 256, 258].map((x) => ({ x: shape.sx(x), label: String(x), color: x === 256 ? SECOND : MUTED }))} />
            <Axis left={40} right={680} y={236} ticks={[-2, -1, 0, 1, 1.5, 2].map((z) => ({ x: shape.sx(250 + 4 * z), label: num(language, String(z).replace('.', ',')).replace('-', '−'), color: z === 1.5 ? SECOND : STAGE }))} />
            <Label x={30} y={232} textAnchor="start" fontSize={14} fontWeight={700} fill={STAGE}>z</Label>
            <Formula x={shape.sx(244)} y={130} size={17} color={STAGE}>{four(language, below(1.5))}</Formula>
            <Caption y={292} language={language} text={say('Azalera bera bi eskaletan: gramoak goian, z behean', 'La misma área en dos escalas: gramos arriba, z abajo', 'المساحة نفسها بمقياسين: الغرامات فوق وz تحت', 'The same area on two scales: grams above, z below')} size={14} />
        </Figure>
    )
}

/* ---------- 10. The top 20 % ---------- */

export function CutoffFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 40, right: 680, baseline: 210, top: 40, from: 1.5, to: 10.5, mean: 6, sd: 1.5 })
    return (
        <Figure height={290} label={pick(language, say('Ebaketa-nota: % 20 onena', 'La nota de corte: el 20 % mejor', 'العلامة الدنيا: أفضل 20٪', 'The cut-off: the best 20%'))}>
            <path d={shape.area(1.5, 7.26)} fill={STAGE_TINT} />
            <path d={shape.area(7.26, 10.5)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={3} />
            <Axis left={40} right={680} y={210} ticks={[3, 4.5, 6, 7.26, 9].map((x) => ({ x: shape.sx(x), label: num(language, String(x).replace('.', ',')), color: x === 7.26 ? SECOND : MUTED }))} />
            <Formula x={shape.sx(5.2)} y={170} size={18} color={STAGE}>{num(language, '0,8')}</Formula>
            <Formula x={shape.sx(8.4)} y={180} size={18} color={SECOND}>{num(language, '0,2')}</Formula>
            <Caption y={282} language={language} text={say('Azpitik % 80: k = 0,84, eta x = 6 + 0,84 · 1,5', 'Debajo el 80 %: k = 0,84, y x = 6 + 0,84 · 1,5', 'تحت 80٪: k = 0.84، وx = 6 + 0.84 · 1.5', 'Below, 80%: k = 0.84, and x = 6 + 0.84 · 1.5')} size={14} />
        </Figure>
    )
}

/* ---------- 11. The survey's bars under their bell ---------- */

export function SurveyFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 40, right: 680, baseline: 220, top: 40, from: 90, to: 160, mean: 125, sd: 10 })
    const peak = binomialPmfDecimal(625, 0.2, 125)
    return (
        <Figure height={290} label={pick(language, say('B(625; 0,2) banaketaren barrak eta N(125; 10)', 'Las barras de B(625; 0,2) y la N(125; 10)', 'أعمدة B(625; 0.2) وN(125; 10)', 'The bars of B(625; 0.2) and N(125; 10)'))}>
            {Array.from({ length: 70 }, (_, index) => 91 + index).map((k) => {
                const h = (binomialPmfDecimal(625, 0.2, k) / peak) * 180
                return <rect key={k} x={shape.sx(k - 0.45)} y={220 - h} width={shape.sx(k + 0.45) - shape.sx(k - 0.45)} height={h} fill={STAGE_TINT} stroke={STAGE} strokeWidth={0.6} />
            })}
            <path d={shape.curve} fill="none" stroke={SECOND} strokeWidth={3} />
            <Axis left={40} right={680} y={220} ticks={[95, 105, 115, 125, 135, 145, 155].map((x) => ({ x: shape.sx(x), label: String(x) }))} />
            <Formula x={560} y={60} size={17} color={SECOND}>N(125; 10)</Formula>
            <Caption y={282} language={language} text={say('Barrak binomiala dira; kanpaia, normala', 'Las barras son la binomial; la campana, la normal', 'الأعمدة هي الثنائي؛ والجرس هو الطبيعي', 'The bars are the binomial; the bell, the normal')} size={14} />
        </Figure>
    )
}

/* ---------- 12. The half step ---------- */

export function HalfStepFigure({ language }: { language: UnitLanguage }) {
    const sx = (x: number) => 60 + (x - 54) * 70
    const scale = 150 / binomialPmfDecimal(100, 0.5, 54)
    return (
        <Figure height={290} label={pick(language, say('Puntu erdia: 58 balioaren barra 57,5 puntuan hasten da', 'El medio punto: la barra del 58 empieza en 57,5', 'نصف الوحدة: يبدأ عمود 58 عند 57.5', 'The half unit: the bar of 58 starts at 57.5'))}>
            {[54, 55, 56, 57, 58, 59, 60, 61, 62].map((k) => {
                const h = binomialPmfDecimal(100, 0.5, k) * scale
                const on = k >= 58
                return <rect key={k} x={sx(k - 0.5)} y={210 - h} width={70} height={h} fill={on ? SECOND_TINT : STAGE_TINT} stroke={on ? SECOND : STAGE} strokeWidth={1.4} />
            })}
            <line x1={sx(57.5)} x2={sx(57.5)} y1={40} y2={210} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <Axis left={sx(53.5)} right={sx(62.5)} y={210} ticks={[54, 56, 58, 60, 62].map((k) => ({ x: sx(k), label: String(k), color: k === 58 ? SECOND : MUTED }))} />
            <Formula x={sx(57.5)} y={32} size={16} color={SECOND}>{num(language, '57,5')}</Formula>
            <Caption y={282} language={language} text={say('Gorriak «gutxienez 58» dira: 57,5 puntutik aurrera', 'En rojo, «al menos 58»: desde 57,5', 'بالأحمر «58 على الأقل»: من 57.5', 'In red, ‘at least 58’: from 57.5')} size={14} />
        </Figure>
    )
}

/* ---------- 13–15. 80 heights fitted to N(170; 10) ---------- */

const OBSERVED = [15, 25, 25, 15]
const EXPECTED = [80 * below(-1), 80 * between(-1, 0), 80 * between(0, 1), 80 * (10_000 - below(1))].map((value) => value / 10_000)

export function FitFigure({ language, step }: { language: UnitLanguage; step: 0 | 1 | 2 }) {
    const sx = (x: number) => 60 + (x - 145) * 11.5
    const height = (count: number) => count * 6
    const shape = bell({ left: sx(140), right: sx(200), baseline: 230, top: 230 - 0.03989 * 10 * 80 * 6, from: 140, to: 200, mean: 170, sd: 10 })
    return (
        <Figure height={310} label={pick(language, say('80 altuerak eta N(170; 10)', 'Las 80 estaturas y la N(170; 10)', 'الأطوال الثمانون وN(170; 10)', 'The 80 heights and N(170; 10)'))}>
            {OBSERVED.map((count, index) => {
                const a = 150 + index * 10
                return (
                    <g key={index}>
                        <rect x={sx(a)} y={230 - height(count)} width={sx(a + 10) - sx(a)} height={height(count)} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                        <text x={sx(a + 5)} y={230 - height(count) - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE} direction="ltr">{count}</text>
                        {step >= 1 && <text x={sx(a + 5)} y={step === 2 ? 266 : 266} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{num(language, EXPECTED[index].toFixed(3).replace('.', ','))}</text>}
                    </g>
                )
            })}
            {step >= 1 && <path d={shape.curve} fill="none" stroke={SECOND} strokeWidth={2.4} />}
            <Axis left={sx(145)} right={sx(195)} y={230} ticks={[150, 160, 170, 180, 190].map((x) => ({ x: sx(x), label: String(x) }))} />
            {step === 0 && <Formula x={600} y={100} size={18} color={STAGE}>x̄ = 170 · s = 10</Formula>}
            {step === 1 && <Formula x={610} y={100} size={16} color={SECOND}>80 · {four(language, between(-1, 0))}</Formula>}
            {step === 2 && <Formula x={610} y={100} size={17} color={GREEN}>{num(language, '2,304')} / 80 = {num(language, '0,0288')}</Formula>}
            {step === 2 && <Formula x={610} y={140} size={17} color={GREEN}>{num(language, '0,0288')} &lt; {num(language, '0,05')}</Formula>}
            <Caption y={300} language={language} text={step === 0 ? say('Klase-markak: 155, 165, 175, 185', 'Marcas de clase: 155, 165, 175, 185', 'مراكز الفئات: 155 و165 و175 و185', 'Class marks: 155, 165, 175, 185') : step === 1 ? say('Gorriz, normalak espero dituenak', 'En rojo, lo que espera la normal', 'بالأحمر ما يتوقعه التوزيع الطبيعي', 'In red, what the normal expects') : say('Diferentziarik handiena, % 2,88: doikuntza ona', 'La mayor diferencia, el 2,88 %: buen ajuste', 'أكبر فرق 2.88٪: مطابقة جيدة', 'The largest difference, 2.88%: a good fit')} size={14} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function NormalBatx1gHeroArt() {
    const shape = bell({ left: 24, right: 206, baseline: 128, top: 26, from: -3, to: 3, mean: 0, sd: 1 })
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 40) rotate(-4)">
                    <rect width={230} height={160} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <path d={shape.area(-1, 1)} fill="#dde7f7" />
                    <path d={shape.curve} fill="none" stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={20} x2={210} y1={128} y2={128} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={200} height={140} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={64} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">N(μ; σ)</text>
                    <text x={100} y={104} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">68 · 95 · 99,7</text>
                </g>
                <g transform="translate(296 214) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">z = (x − μ) / σ</text>
                </g>
                <g transform="translate(40 250) rotate(2)">
                    <rect width={230} height={110} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[2, 5, 8, 5, 2].map((value, index) => <rect key={index} x={40 + index * 30} y={92 - value * 8} width={26} height={value * 8} fill={PAPER} stroke={INK} strokeWidth={1.6} />)}
                </g>
            </svg>
        </div>
    )
}
