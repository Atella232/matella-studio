import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { binomialPmfDecimal } from '../batx2-zientziak-banaketak/binomial'
import { phiDensity } from '../batx2-zientziak-banaketak/normal'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — lesson figures. Each one
   draws the numbers of its «Let's solve»: the televisions sold, the
   coffees, the raffle, a poll as trials, the app of B(5; 0,3), the votes
   of B(400; 0,2), the leisure spending N(120; 20), a corner of the table,
   the salaries, two marks compared, the slow deliveries, the 95 % band of
   N(90; 15), the bars of B(150; 0,4) and the half step of the continuity
   correction. Bars and bells are computed, never drawn by hand. Formulas
   are written left to right; Arabic words go through Label.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const SECOND_TINT = 'rgba(196, 67, 42, 0.22)'

/** A percentage with the sign where each language puts it */
function percent(language: UnitLanguage, value: string): string {
    const number = num(language, value)
    if (language === 'eu') return `%\u00a0${number}`
    if (language === 'en') return `${number}%`
    if (language === 'ar') return `${number}٪`
    return `${number}\u00a0%`
}

/** A horizontal axis with ticks and their labels */
function Axis({ left, right, y, ticks }: { left: number; right: number; y: number; ticks: Array<{ x: number; label: string; color?: string }> }) {
    return (
        <g>
            <line x1={left} x2={right} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((tick, index) => (
                <g key={index}>
                    <line x1={tick.x} x2={tick.x} y1={y} y2={y + 7} stroke={INK} strokeWidth={1.6} />
                    <text x={tick.x} y={y + 25} textAnchor="middle" fontSize={15} fontWeight={700} fill={tick.color ?? MUTED} direction="ltr">{tick.label}</text>
                </g>
            ))}
        </g>
    )
}

interface BarSpec { value: number; label: string; hot?: boolean; top?: string }

/** Bars on a baseline, each with its label under it and, if given, a value over it */
function Bars({ left, right, baseline, height, max, bars }: { left: number; right: number; baseline: number; height: number; max: number; bars: BarSpec[] }) {
    const step = (right - left) / bars.length
    return (
        <g>
            {bars.map((bar, index) => {
                const h = (bar.value / max) * height
                const x = left + index * step + step * 0.1
                const w = step * 0.8
                return (
                    <g key={index}>
                        <rect x={x} y={baseline - h} width={w} height={h} fill={bar.hot ? SECOND_TINT : STAGE_TINT} stroke={bar.hot ? SECOND : STAGE} strokeWidth={1.8} />
                        {bar.top && <text x={x + w / 2} y={baseline - h - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={bar.hot ? SECOND : INK} direction="ltr">{bar.top}</text>}
                        {bar.label && <text x={x + w / 2} y={baseline + 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{bar.label}</text>}
                    </g>
                )
            })}
            <line x1={left - 6} x2={right + 6} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
        </g>
    )
}

/** The bell of N(mean; sd) drawn between from and to on [left, right], its peak at top */
function bell({ left, right, baseline, top, from, to, mean, sd }: { left: number; right: number; baseline: number; top: number; from: number; to: number; mean: number; sd: number }) {
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const peak = phiDensity(0)
    const sy = (value: number) => baseline - (phiDensity((value - mean) / sd) / peak) * (baseline - top)
    const trace = (a: number, b: number, steps = 90) => Array.from({ length: steps + 1 }, (_, index) => a + ((b - a) * index) / steps).map((value, index) => `${index ? 'L' : 'M'}${sx(value).toFixed(1)} ${sy(value).toFixed(1)}`).join(' ')
    const area = (a: number, b: number) => `${trace(a, b, 60)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
    return { sx, sy, curve: trace(from, to, 160), area }
}

/* ---------- 1. Random variable: televisions ---------- */

export function TelevisionsFigure({ language }: { language: UnitLanguage }) {
    const values = [0.2, 0.4, 0.3, 0.1]
    return (
        <Figure height={290} label={pick(language, say('Egunean saldutako telebisten banaketa', 'La distribución de televisores vendidos al día', 'توزيع أجهزة التلفاز المبيعة يوميًّا', 'The distribution of TVs sold a day'))}>
            <Bars left={80} right={480} baseline={220} height={160} max={0.4} bars={values.map((value, index) => ({ value, label: String(index), hot: index >= 2, top: num(language, String(value).replace('.', ',')) }))} />
            <Formula x={600} y={110} size={18}>k = {num(language, '0,1')}</Formula>
            <Formula x={600} y={160} size={18} color={SECOND}>P(X ≥ 2) = {num(language, '0,4')}</Formula>
            <Caption y={280} language={language} text={say('Barrek 1 egiten dute batuta', 'Las barras suman 1', 'مجموع الأعمدة 1', 'The bars add up to 1')} />
        </Figure>
    )
}

/* ---------- 2. Mean and deviation: coffees ---------- */

export function CafesFigure({ language }: { language: UnitLanguage }) {
    const values = [0.1, 0.3, 0.4, 0.2]
    const left = 80
    const right = 480
    const step = (right - left) / 4
    const meanX = left + step * 1.7 + step / 2
    return (
        <Figure height={300} label={pick(language, say('Kafeen banaketa eta haren oreka-puntua', 'La distribución de los cafés y su punto de equilibrio', 'توزيع فناجين القهوة ونقطة توازنه', 'The distribution of coffees and its balance point'))}>
            <Bars left={left} right={right} baseline={210} height={150} max={0.4} bars={values.map((value, index) => ({ value, label: String(index), top: num(language, String(value).replace('.', ',')) }))} />
            <path d={`M ${meanX} 214 L ${meanX - 14} 240 L ${meanX + 14} 240 Z`} fill={SECOND} />
            <line x1={meanX - 0.9 * step} x2={meanX + 0.9 * step} y1={256} y2={256} stroke={SECOND} strokeWidth={3} />
            <Formula x={600} y={110} size={18} color={SECOND}>μ = {num(language, '1,7')}</Formula>
            <Formula x={600} y={160} size={18}>σ = {num(language, '0,9')}</Formula>
            <Caption y={290} language={language} text={say('Batez bestekoa barren oreka-puntua da', 'La media es el punto de equilibrio de las barras', 'المتوسط نقطة توازن الأعمدة', 'The mean is the balance point of the bars')} />
        </Figure>
    )
}

/* ---------- 3. Expected gain: the raffle ---------- */

export function RaffleFigure({ language }: { language: UnitLanguage }) {
    const euro = (value: number) => (language === 'en' ? `€${value}` : `${value}\u00a0€`)
    const rows = [
        { prize: euro(50), chance: '0,01', part: '0,5' },
        { prize: euro(10), chance: '0,05', part: '0,5' },
        { prize: euro(0), chance: '0,94', part: '0' }
    ]
    return (
        <Figure height={290} label={pick(language, say('Zozketako txartela: sariak eta haien probabilitateak', 'La papeleta de la rifa: premios y probabilidades', 'ورقة اليانصيب: الجوائز واحتمالاتها', 'The raffle ticket: prizes and probabilities'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <rect x={70} y={30 + index * 60} width={160} height={44} rx={10} fill={index < 2 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={2} />
                    <text x={150} y={59 + index * 60} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} direction="ltr">{row.prize}</text>
                    <Formula x={340} y={59 + index * 60} size={18}>× {num(language, row.chance)} = {num(language, row.part)}</Formula>
                </g>
            ))}
            <Formula x={590} y={90} size={18}>{num(language, '0,5 + 0,5 = 1')}</Formula>
            <Formula x={590} y={140} size={20} color={SECOND}>1 − 2 = −1</Formula>
            <Caption y={280} language={language} text={say('Batez beste, txartel bakoitzak euro bat galtzen du', 'En promedio, cada papeleta pierde un euro', 'في المتوسط تخسر كل ورقة يورو واحدًا', 'On average, each ticket loses one euro')} />
        </Figure>
    )
}

/* ---------- 4. Is it binomial? A poll as trials ---------- */

export function SurveyBinomialFigure({ language }: { language: UnitLanguage }) {
    const answers = [1, 0, 0, 1, 0, 1, 0, 0, 0, 1]
    return (
        <Figure height={260} label={pick(language, say('Inkesta bat proba independenteen segida gisa', 'Una encuesta como una serie de pruebas independientes', 'استطلاع كسلسلة تجارب مستقلة', 'A poll as a series of independent trials'))}>
            {answers.map((yes, index) => {
                const x = 60 + index * 62
                return (
                    <g key={index}>
                        <circle cx={x} cy={70} r={22} fill={yes ? SECOND_TINT : PAPER} stroke={yes ? SECOND : INK} strokeWidth={2} />
                        <text x={x} y={77} textAnchor="middle" fontSize={18} fontWeight={700} fill={yes ? SECOND : MUTED}>{yes ? '✓' : '✗'}</text>
                        <text x={x} y={120} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED} direction="ltr">p</text>
                    </g>
                )
            })}
            <Caption y={170} language={language} text={say('Pertsona bakoitza proba bat da: «bai» arrakasta da', 'Cada persona es una prueba: «sí» es un éxito', 'كل شخص تجربة: «نعم» نجاح', 'Each person is a trial: ‘yes’ is a success')} />
            <Caption y={210} language={language} text={say('p bera beti, populazioa handia delako', 'La misma p siempre, porque la población es grande', 'الاحتمال p نفسه دائمًا لأن المجتمع كبير', 'Always the same p, because the population is large')} color={STAGE} />
        </Figure>
    )
}

/* ---------- 5. Binomial probabilities: B(5; 0,3) ---------- */

export function AppFigure({ language }: { language: UnitLanguage }) {
    const bars = Array.from({ length: 6 }, (_, k) => ({ value: binomialPmfDecimal(5, 0.3, k), label: String(k), hot: k === 2, top: k === 2 ? num(language, '0,3087') : undefined }))
    return (
        <Figure height={290} label={pick(language, say('B(5; 0,3) banaketaren barrak', 'Las barras de B(5; 0,3)', 'أعمدة B(5; 0,3)', 'The bars of B(5; 0,3)'))}>
            <Bars left={70} right={470} baseline={220} height={160} max={0.4} bars={bars} />
            <Formula x={600} y={100} size={18}>X ~ B(5; {num(language, '0,3')})</Formula>
            <Formula x={600} y={150} size={17} color={SECOND}>P(X = 2) = {num(language, '0,3087')}</Formula>
            <Formula x={600} y={200} size={17}>P(X ≥ 1) = {num(language, '0,83193')}</Formula>
            <Caption y={280} language={language} text={say('«Gutxienez bat» = 1 ken 0 barra', '«Al menos uno» = 1 menos la barra del 0', '«واحد على الأقل» = 1 ناقص عمود 0', '‘At least one’ = 1 minus the bar of 0')} />
        </Figure>
    )
}

/* ---------- 6. Mean and deviation of the binomial: B(400; 0,2) ---------- */

export function VotersBellFigure({ language }: { language: UnitLanguage }) {
    const from = 52
    const to = 108
    const left = 60
    const right = 660
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const bars = Array.from({ length: to - from + 1 }, (_, index) => from + index)
    const peak = binomialPmfDecimal(400, 0.2, 80)
    return (
        <Figure height={280} label={pick(language, say('B(400; 0,2) banaketaren barrak', 'Las barras de B(400; 0,2)', 'أعمدة B(400; 0,2)', 'The bars of B(400; 0,2)'))}>
            {bars.map((k) => {
                const h = (binomialPmfDecimal(400, 0.2, k) / peak) * 150
                return <rect key={k} x={sx(k) - 4} y={200 - h} width={8} height={h} fill={Math.abs(k - 80) <= 8 ? SECOND_TINT : STAGE_TINT} stroke={Math.abs(k - 80) <= 8 ? SECOND : STAGE} strokeWidth={1} />
            })}
            <Axis left={left} right={right} y={200} ticks={[64, 72, 80, 88, 96].map((value) => ({ x: sx(value), label: String(value), color: value === 80 ? SECOND : MUTED }))} />
            <Formula x={sx(80)} y={34} size={18} color={SECOND}>μ = 80</Formula>
            <Formula x={sx(80)} y={262} size={16}>μ ± σ = 80 ± 8</Formula>
        </Figure>
    )
}

/* ---------- 7. The normal: leisure spending N(120; 20) ---------- */

export function LeisureFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 220, top: 50, from: 60, to: 180, mean: 120, sd: 20 })
    return (
        <Figure height={290} label={pick(language, say('Aisialdi-gastuaren kanpaia, N(120; 20)', 'La campana del gasto en ocio, N(120; 20)', 'جرس الإنفاق على الترفيه، N(120; 20)', 'The bell of leisure spending, N(120; 20)'))}>
            <path d={shape.area(100, 140)} fill={STAGE_TINT} />
            <path d={shape.area(160, 180)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Formula x={shape.sx(120)} y={160} size={20} color={STAGE}>{percent(language, '68,26')}</Formula>
            <Formula x={shape.sx(167)} y={170} size={16} color={SECOND}>{percent(language, '2,28')}</Formula>
            <Axis left={50} right={670} y={220} ticks={[80, 100, 120, 140, 160].map((value) => ({ x: shape.sx(value), label: String(value), color: value === 160 ? SECOND : value === 120 ? INK : MUTED }))} />
            <Formula x={shape.sx(100)} y={272} size={15} color={MUTED}>μ − σ</Formula>
            <Formula x={shape.sx(140)} y={272} size={15} color={MUTED}>μ + σ</Formula>
            <Formula x={shape.sx(160)} y={272} size={15} color={SECOND}>μ + 2σ</Formula>
        </Figure>
    )
}

/* ---------- 8. The table: a corner of N(0; 1) ---------- */

export function TableCornerFigure({ language }: { language: UnitLanguage }) {
    const rows = [{ z: '1,3', values: ['0,9032', '0,9049', '0,9066'] }, { z: '1,4', values: ['0,9192', '0,9207', '0,9222'] }, { z: '1,5', values: ['0,9332', '0,9345', '0,9357'] }]
    const columns = ['0,00', '0,01', '0,02']
    return (
        <Figure height={270} label={pick(language, say('Normalaren taularen zati bat', 'Un trozo de la tabla de la normal', 'جزء من جدول التوزيع الطبيعي', 'A piece of the normal table'))}>
            <rect x={70} y={20} width={480} height={200} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
            <text x={130} y={56} textAnchor="middle" fontSize={17} fontWeight={700} fill={MUTED}>z</text>
            {columns.map((column, index) => <text key={column} x={240 + index * 120} y={56} textAnchor="middle" fontSize={17} fontWeight={700} fill={MUTED} direction="ltr">{num(language, column)}</text>)}
            {rows.map((row, r) => (
                <g key={row.z}>
                    <text x={130} y={106 + r * 46} textAnchor="middle" fontSize={17} fontWeight={700} fill={r === 1 ? SECOND : INK} direction="ltr">{num(language, row.z)}</text>
                    {row.values.map((value, c) => (
                        <g key={c}>
                            {r === 1 && c === 0 && <rect x={190} y={82 + r * 46} width={100} height={34} rx={6} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />}
                            <text x={240 + c * 120} y={106 + r * 46} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK} direction="ltr">{num(language, value)}</text>
                        </g>
                    ))}
                </g>
            ))}
            <line x1={70} x2={550} y1={70} y2={70} stroke={LINE} strokeWidth={1.6} />
            <Formula x={640} y={110} size={17} color={SECOND}>P(Z ≤ {num(language, '1,4')})</Formula>
            <Formula x={640} y={140} size={17} color={SECOND}>= {num(language, '0,9192')}</Formula>
            <Caption y={258} language={language} text={say('Errenkada: 1,4. Zutabea: 0,00', 'Fila: 1,4. Columna: 0,00', 'الصف: 1.4. العمود: 0.00', 'Row: 1.4. Column: 0.00')} />
        </Figure>
    )
}

/* ---------- 9. Standardising: salaries N(1800; 300) ---------- */

export function SalaryFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 190, top: 40, from: 900, to: 2700, mean: 1800, sd: 300 })
    return (
        <Figure height={290} label={pick(language, say('Soldatak eta haien z eskala', 'Los sueldos y su escala z', 'الرواتب ومقياسها z', 'The salaries and their z scale'))}>
            <path d={shape.area(1500, 2250)} fill={STAGE_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Formula x={shape.sx(1850)} y={140} size={20} color={STAGE}>{num(language, '0,7745')}</Formula>
            <Axis left={50} right={670} y={190} ticks={[1200, 1500, 1800, 2100, 2250, 2400].map((value) => ({ x: shape.sx(value), label: String(value), color: value === 2250 || value === 1500 ? SECOND : MUTED }))} />
            <Axis left={50} right={670} y={245} ticks={[-2, -1, 0, 1, 1.5, 2].map((value) => ({ x: shape.sx(1800 + 300 * value), label: num(language, String(value).replace('.', ',')), color: value === 1.5 || value === -1 ? SECOND : MUTED }))} />
            <text x={34} y={250} fontSize={16} fontWeight={700} fill={SECOND}>z</text>
        </Figure>
    )
}

/* ---------- 10. Comparing: Ane and Jon ---------- */

export function CompareFigure({ language }: { language: UnitLanguage }) {
    const z = (value: number) => 360 + value * 120
    return (
        <Figure height={250} label={pick(language, say('Bi emaitza z eskala berean', 'Dos resultados en la misma escala z', 'نتيجتان على مقياس z نفسه', 'Two results on the same z scale'))}>
            <Axis left={80} right={640} y={150} ticks={[-2, -1, 0, 1, 2].map((value) => ({ x: z(value), label: String(value) }))} />
            <circle cx={z(1.25)} cy={150} r={10} fill={SECOND} />
            <Label x={z(1.25)} y={110} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('Ane', 'Ane', 'آنِه', 'Ane'))}</Label>
            <Formula x={z(1.25)} y={86} size={15} color={SECOND}>z = {num(language, '1,25')}</Formula>
            <circle cx={z(1)} cy={150} r={10} fill={STAGE} />
            <Label x={z(1)} y={210} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('Jon', 'Jon', 'جون', 'Jon'))}</Label>
            <Formula x={z(1)} y={234} size={15} color={STAGE}>z = 1</Formula>
            <text x={60} y={155} textAnchor="end" fontSize={16} fontWeight={700} fill={MUTED}>z</text>
        </Figure>
    )
}

/* ---------- 11. The inverse search: slow deliveries N(48; 6) ---------- */

export function DeliveryFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 210, top: 40, from: 30, to: 66, mean: 48, sd: 6 })
    return (
        <Figure height={280} label={pick(language, say('Entrega motelenen % 15', 'El 15 % de las entregas más lentas', 'أبطأ 15 % من التوصيلات', 'The slowest 15% of deliveries'))}>
            <path d={shape.area(30, 54.24)} fill={STAGE_TINT} />
            <path d={shape.area(54.24, 66)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <line x1={shape.sx(54.24)} x2={shape.sx(54.24)} y1={60} y2={210} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <Formula x={shape.sx(44)} y={170} size={19} color={STAGE}>{percent(language, '85')}</Formula>
            <Formula x={shape.sx(60)} y={150} size={17} color={SECOND}>{percent(language, '15')}</Formula>
            <Axis left={50} right={670} y={210} ticks={[36, 42, 48, 54.24, 60].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 54.24 ? SECOND : MUTED }))} />
            <Formula x={360} y={268} size={17} color={SECOND}>x = 48 + {num(language, '1,04')} · 6 = {num(language, '54,24')}</Formula>
        </Figure>
    )
}

/* ---------- 12. The characteristic interval: N(90; 15), 95 % ---------- */

export function ConnectionFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 40, from: 45, to: 135, mean: 90, sd: 15 })
    return (
        <Figure height={280} label={pick(language, say('Tarte karakteristikoa, % 95', 'El intervalo característico del 95 %', 'الفترة المميزة لـ 95 %', 'The 95% characteristic interval'))}>
            <path d={shape.area(60.6, 119.4)} fill={STAGE_TINT} />
            <path d={shape.area(45, 60.6)} fill={SECOND_TINT} />
            <path d={shape.area(119.4, 135)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Formula x={shape.sx(90)} y={150} size={20} color={STAGE}>{percent(language, '95')}</Formula>
            <Formula x={shape.sx(52)} y={170} size={14} color={SECOND}>{num(language, '0,025')}</Formula>
            <Formula x={shape.sx(128)} y={170} size={14} color={SECOND}>{num(language, '0,025')}</Formula>
            <Axis left={50} right={670} y={200} ticks={[60.6, 90, 119.4].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 90 ? INK : SECOND }))} />
            <Formula x={360} y={262} size={17}>90 ± {num(language, '1,96')} · 15</Formula>
        </Figure>
    )
}

/* ---------- 13. Binomial to normal: B(150; 0,4) ---------- */

export function ParcelsFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 210, top: 50, from: 42, to: 78, mean: 60, sd: 6 })
    const peak = binomialPmfDecimal(150, 0.4, 60)
    return (
        <Figure height={270} label={pick(language, say('B(150; 0,4) banaketaren barrak eta N(60; 6) kanpaia', 'Las barras de B(150; 0,4) y la campana N(60; 6)', 'أعمدة B(150; 0,4) وجرس N(60; 6)', 'The bars of B(150; 0,4) and the bell N(60; 6)'))}>
            {Array.from({ length: 37 }, (_, index) => 42 + index).map((k) => {
                const h = (binomialPmfDecimal(150, 0.4, k) / peak) * 160
                return <rect key={k} x={shape.sx(k - 0.5)} y={210 - h} width={shape.sx(k + 0.5) - shape.sx(k - 0.5)} height={h} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1} />
            })}
            <path d={shape.curve} fill="none" stroke={SECOND} strokeWidth={2.8} />
            <Axis left={50} right={670} y={210} ticks={[48, 54, 60, 66, 72].map((value) => ({ x: shape.sx(value), label: String(value), color: value === 60 ? SECOND : MUTED }))} />
            <Formula x={600} y={70} size={17} color={SECOND}>N(60; 6)</Formula>
        </Figure>
    )
}

/* ---------- 14. The continuity correction: at least 58 ---------- */

export function ContinuityFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 50, from: 48, to: 66, mean: 50, sd: 5 })
    const top = (k: number) => 200 - (phiDensity((k - 50) / 5) / phiDensity(0)) * 150
    return (
        <Figure height={270} label={pick(language, say('Jarraitutasun-zuzenketa: 58 barra sartzen da', 'La corrección de continuidad: entra la barra del 58', 'تصحيح الاستمرارية: يدخل عمود 58', 'The continuity correction: the bar of 58 goes in'))}>
            {Array.from({ length: 18 }, (_, index) => 48 + index).map((k) => (
                <rect key={k} x={shape.sx(k - 0.5)} y={top(k)} width={shape.sx(k + 0.5) - shape.sx(k - 0.5)} height={200 - top(k)} fill={k >= 58 ? SECOND_TINT : STAGE_TINT} stroke={k >= 58 ? SECOND : STAGE} strokeWidth={1} />
            ))}
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.4} />
            <line x1={shape.sx(57.5)} x2={shape.sx(57.5)} y1={60} y2={200} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <Axis left={50} right={670} y={200} ticks={[50, 54, 57.5, 62].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 57.5 ? SECOND : MUTED }))} />
            <Formula x={shape.sx(57.5)} y={48} size={16} color={SECOND}>{num(language, '57,5')}</Formula>
            <Formula x={360} y={258} size={16}>P(X ≥ 58) ≈ P(Y ≥ {num(language, '57,5')})</Formula>
        </Figure>
    )
}

/* ---------- Hero art: bars under a bell ---------- */

export function DistributionsBatx2gHeroArt() {
    const heights = [10, 26, 52, 80, 96, 80, 52, 26, 10]
    return (
        <svg viewBox="0 0 240 160" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {heights.map((h, index) => <rect key={index} x={30 + index * 20} y={130 - h} width={16} height={h} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />)}
            <path d="M 20 128 C 70 128, 90 24, 128 24 C 166 24, 186 128, 236 128" fill="none" stroke={SECOND} strokeWidth={3} />
            <line x1={16} x2={232} y1={130} y2={130} stroke={INK} strokeWidth={2.4} />
        </svg>
    )
}
