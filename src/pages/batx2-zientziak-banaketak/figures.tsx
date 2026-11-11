import { fraction } from '../../features/unit-v2/math/fraction'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { binomialPmf, binomialPmfDecimal } from './binomial'
import { phiDensity, tableValue } from './normal'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — lesson figures. Each one draws
   the numbers of its «Let's solve»: the places of two heads in six
   tosses, the families' bars, three coins, the fair's balance, the die
   game, ten trials, the free throws of B(4; 0,7), the phones of
   B(100; 0,2), the bus's flat density, the heights' bell, a corner of the
   normal table, the journey with its two scales, the best 10 %, the bars
   of B(48; 0,25) under their bell and the half step of the continuity
   correction. Bars and bells are computed (binomial.ts, normal.ts), never
   drawn by hand. Formulas are written left to right in every language;
   Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const GOLD = '#e0a100'
const SECOND_TINT = 'rgba(196, 67, 42, 0.22)'

/** A percentage with the sign where each language puts it: % 68,26 · 68,26 % · 68.26% · 68.26٪ */
function percent(language: UnitLanguage, value: string): string {
    const number = num(language, value)
    if (language === 'eu') return `%\u00a0${number}`
    if (language === 'en') return `${number}%`
    if (language === 'ar') return `${number}٪`
    return `${number}\u00a0%`
}

/** An amount of euros: €12 in English, 12 € in the others */
const euros = (language: UnitLanguage, value: number) => (language === 'en' ? `€${value}` : `${value}\u00a0€`)

/** A binomial coefficient drawn as two stacked numbers in big brackets, centred on x */
function Binom({ x, y, n, k, size = 18, color = INK }: { x: number; y: number; n: number; k: number; size?: number; color?: string }) {
    return (
        <g fill={color} fontWeight={700}>
            <text x={x - size * 0.75} y={y + size * 0.55} fontSize={size * 2.2} textAnchor="middle" fontWeight={400}>(</text>
            <text x={x + size * 0.75} y={y + size * 0.55} fontSize={size * 2.2} textAnchor="middle" fontWeight={400}>)</text>
            <text x={x} y={y - size * 0.3} fontSize={size} textAnchor="middle">{n}</text>
            <text x={x} y={y + size * 1.1} fontSize={size} textAnchor="middle">{k}</text>
        </g>
    )
}

/** A horizontal axis with ticks and their labels */
function Axis({ left, right, y, ticks }: { left: number; right: number; y: number; ticks: Array<{ x: number; label: string; color?: string; bold?: boolean }> }) {
    return (
        <g>
            <line x1={left} x2={right} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((tick, index) => (
                <g key={index}>
                    <line x1={tick.x} x2={tick.x} y1={y} y2={y + 7} stroke={INK} strokeWidth={1.6} />
                    <text x={tick.x} y={y + 25} textAnchor="middle" fontSize={15} fontWeight={tick.bold ? 700 : 600} fill={tick.color ?? MUTED} direction="ltr">{tick.label}</text>
                </g>
            ))}
        </g>
    )
}

interface BarSpec { value: number; label: string; color?: string; tint?: string; top?: string }

/** Bars on a baseline, each with its label under it and, if given, a value over it */
function Bars({ left, right, baseline, height, max, bars, gap = 0.2 }: { left: number; right: number; baseline: number; height: number; max: number; bars: BarSpec[]; gap?: number }) {
    const step = (right - left) / bars.length
    return (
        <g>
            {bars.map((bar, index) => {
                const h = (bar.value / max) * height
                const x = left + index * step + (step * gap) / 2
                const w = step * (1 - gap)
                return (
                    <g key={index}>
                        <rect x={x} y={baseline - h} width={w} height={h} fill={bar.tint ?? STAGE_TINT} stroke={bar.color ?? STAGE} strokeWidth={1.8} />
                        {bar.top && <text x={x + w / 2} y={baseline - h - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={bar.color ?? INK} direction="ltr">{bar.top}</text>}
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

/* ---------- 1. Binomial coefficients: two heads in six tosses ---------- */

export function PositionsFigure({ language }: { language: UnitLanguage }) {
    const rows = [[0, 1], [0, 2], [0, 5], [2, 3], [4, 5]]
    const row6 = [1, 6, 15, 20, 15, 6, 1]
    const row5 = [1, 5, 10, 10, 5, 1]
    return (
        <Figure height={300} label={pick(language, say('6 botalditan 2 aurpegi kokatzeko moduak', 'Las formas de colocar 2 caras en 6 lanzamientos', 'طرق وضع وجهين في 6 رميات', 'The ways of placing 2 heads in 6 tosses'))}>
            {[1, 2, 3, 4, 5, 6].map((toss, index) => <text key={toss} x={52 + index * 44} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{toss}</text>)}
            {rows.map((heads, row) => (
                <g key={row}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <circle key={index} cx={52 + index * 44} cy={56 + row * 38} r={14} fill={heads.includes(index) ? STAGE : PAPER} stroke={INK} strokeWidth={1.6} />
                    ))}
                </g>
            ))}
            <text x={162} y={262} textAnchor="middle" fontSize={22} fontWeight={700} fill={MUTED}>⋮</text>
            <Binom x={440} y={74} n={6} k={2} size={20} color={STAGE} />
            <Formula x={530} y={84} size={22} color={STAGE}>= 15</Formula>
            {row5.map((value, index) => <text key={index} x={430 + index * 44} y={160} textAnchor="middle" fontSize={16} fontWeight={600} fill={MUTED}>{value}</text>)}
            {row6.map((value, index) => (
                <g key={index}>
                    {index === 2 && <circle cx={408 + index * 44} cy={198} r={17} fill="none" stroke={SECOND} strokeWidth={2.4} />}
                    {index === 4 && <circle cx={408 + index * 44} cy={198} r={17} fill="none" stroke={SECOND} strokeWidth={2.4} strokeDasharray="4 3" />}
                    <text x={408 + index * 44} y={204} textAnchor="middle" fontSize={17} fontWeight={700} fill={index === 2 || index === 4 ? SECOND : INK}>{value}</text>
                </g>
            ))}
            <Caption x={540} y={244} language={language} text={say('6. errenkada: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64', 'Fila 6: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64', 'الصف 6: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64', 'Row 6: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64')} size={14} />
            <Caption y={290} language={language} text={say('Urdina = aurpegia. 15 modutatik 5 ikusten dira', 'Azul = cara. Se ven 5 de las 15 formas', 'الأزرق = وجه. تظهر 5 من الطرق الـ 15', 'Blue = heads. 5 of the 15 ways are shown')} size={14} />
        </Figure>
    )
}

/* ---------- 2. Mean and standard deviation: twenty families ---------- */

export function FamiliesFigure({ language }: { language: UnitLanguage }) {
    const shares = ['0,1', '0,3', '0,4', '0,2']
    const left = 120
    const right = 520
    const step = (right - left) / 4
    const at = (value: number) => left + step * (value + 0.5)
    return (
        <Figure height={310} label={pick(language, say('Seme-alaben maiztasun erlatiboak', 'Las frecuencias relativas de los hijos', 'التكرارات النسبية للأبناء', 'The relative frequencies of the children'))}>
            <Bars left={left} right={right} baseline={220} height={160} max={0.4} bars={shares.map((share, index) => ({ value: Number(share.replace(',', '.')), label: String(index), top: num(language, share) }))} />
            <line x1={at(1.7 - 0.9)} x2={at(1.7 + 0.9)} y1={262} y2={262} stroke={SECOND} strokeWidth={3} />
            <line x1={at(0.8)} x2={at(0.8)} y1={254} y2={270} stroke={SECOND} strokeWidth={2.4} />
            <line x1={at(2.6)} x2={at(2.6)} y1={254} y2={270} stroke={SECOND} strokeWidth={2.4} />
            <polygon points={`${at(1.7)},248 ${at(1.7) - 9},266 ${at(1.7) + 9},266`} fill={SECOND} />
            <Formula x={620} y={120} size={20} color={SECOND}>x̄ = {num(language, '1,7')}</Formula>
            <Formula x={620} y={160} size={20} color={SECOND}>σ = {num(language, '0,9')}</Formula>
            <Caption y={300} language={language} text={say('Batez bestekoa oreka-puntua da; marra gorria, x̄ ± σ', 'La media es el punto de equilibrio; la raya roja, x̄ ± σ', 'المتوسط نقطة التوازن؛ والخط الأحمر x̄ ± σ', 'The mean is the balance point; the red line, x̄ ± σ')} size={14} />
        </Figure>
    )
}

/* ---------- 3. Discrete random variable: three coins ---------- */

export function ThreeCoinsFigure({ language }: { language: UnitLanguage }) {
    const eighths = [1, 3, 3, 1]
    return (
        <Figure height={300} label={pick(language, say('Hiru txanponen aurpegi kopuruaren probabilitate-funtzioa', 'La función de probabilidad del número de caras de tres monedas', 'دالة احتمال عدد الأوجه في ثلاث قطع نقود', 'The probability function of the number of heads of three coins'))}>
            <Bars left={110} right={490} baseline={222} height={150} max={3} bars={eighths.map((value, index) => ({ value, label: String(index), top: `${value}/8`, color: index >= 2 ? SECOND : STAGE, tint: index >= 2 ? SECOND_TINT : STAGE_TINT }))} />
            <Label x={300} y={272} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('X = aurpegi kopurua', 'X = número de caras', 'X = عدد الأوجه', 'X = number of heads'))}</Label>
            <Formula x={610} y={110} size={20} color={SECOND}>P(X ≥ 2)</Formula>
            <Formula x={610} y={146} size={20} color={SECOND}>= 3/8 + 1/8 = 1/2</Formula>
            <Formula x={610} y={196} size={16} color={MUTED}>1/8 + 3/8 + 3/8 + 1/8 = 1</Formula>
        </Figure>
    )
}

/* ---------- 4. Mean and variance: the fair's balance ---------- */

export function PrizesFigure({ language }: { language: UnitLanguage }) {
    const left = 120
    const right = 480
    const at = (value: number) => left + ((right - left) * value) / 2
    const weights = [0.3, 0.5, 0.2]
    return (
        <Figure height={316} label={pick(language, say('Batez bestekoa oreka-puntu gisa', 'La media como punto de equilibrio', 'المتوسط نقطة توازن', 'The mean as a balance point'))}>
            {weights.map((weight, value) => (
                <g key={value}>
                    <rect x={at(value) - 26} y={190 - weight * 280} width={52} height={weight * 280} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />
                    <text x={at(value)} y={182 - weight * 280} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{num(language, String(weight).replace('.', ','))}</text>
                    <text x={at(value)} y={216} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{value}</text>
                </g>
            ))}
            <line x1={left - 40} x2={right + 40} y1={192} y2={192} stroke={INK} strokeWidth={4} />
            <polygon points={`${at(0.9)},226 ${at(0.9) - 14},254 ${at(0.9) + 14},254`} fill={SECOND} />
            <Formula x={at(0.9)} y={278} size={18} color={SECOND}>μ = {num(language, '0,9')}</Formula>
            <Formula x={610} y={110} size={18}>σ² = {num(language, '1,3')} − {num(language, '0,81')}</Formula>
            <Formula x={610} y={146} size={18}>= {num(language, '0,49')}</Formula>
            <Formula x={610} y={186} size={20} color={SECOND}>σ = {num(language, '0,7')}</Formula>
            <Caption y={306} language={language} text={say('Probabilitateak pisuak dira: oreka ez dago balio batean', 'Las probabilidades son pesos: el equilibrio no cae en un valor', 'الاحتمالات أوزان: لا يقع التوازن على قيمة', 'The probabilities are weights: the balance is not at a value')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Expected value: the die game ---------- */

export function DieGameFigure({ language }: { language: UnitLanguage }) {
    const prizes = [0, 0, 0, 3, 3, 12]
    return (
        <Figure height={280} label={pick(language, say('Dado-jokoa: aurpegi bakoitzaren saria', 'El juego del dado: el premio de cada cara', 'لعبة النرد: جائزة كل وجه', 'The die game: the prize for each face'))}>
            {prizes.map((prize, index) => {
                const x = 70 + index * 100
                const won = prize > 0
                return (
                    <g key={index}>
                        <rect x={x - 32} y={40} width={64} height={64} rx={12} fill={won ? (prize === 12 ? '#fbebc0' : STAGE_TINT) : PAPER} stroke={INK} strokeWidth={2} />
                        <text x={x} y={84} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>{index + 1}</text>
                        <text x={x} y={134} textAnchor="middle" fontSize={17} fontWeight={700} fill={won ? (prize === 12 ? GOLD : STAGE) : MUTED} direction="ltr">{euros(language, prize)}</text>
                    </g>
                )
            })}
            <Formula x={360} y={186} size={19}>12 · 1/6 + 3 · 2/6 + 0 · 3/6 = 3</Formula>
            <Formula x={360} y={222} size={21} color={SECOND}>E = 3 − 3 = 0</Formula>
            <Caption y={266} language={language} text={say('Jokatzeak 3 euro balio du: batez beste ez da irabazten ez galtzen', 'Jugar cuesta 3 €: de media, ni se gana ni se pierde', 'المشاركة بـ 3 €: في المتوسط لا ربح ولا خسارة', 'Playing costs €3: on average, you neither win nor lose')} size={14} />
        </Figure>
    )
}

/* ---------- 6. Is it binomial? Ten trials ---------- */

export function TrialsFigure({ language }: { language: UnitLanguage }) {
    const rolls = [3, 6, 1, 4, 6, 2, 5, 5, 1, 6]
    const conditions = [
        say('n = 10 proba, finkoa', 'n = 10 pruebas, fijo', 'n = 10 محاولات، ثابت', 'n = 10 trials, fixed'),
        say('Independenteak', 'Independientes', 'مستقلة', 'Independent'),
        say('Beti p = 1/6', 'Siempre p = 1/6', 'دائمًا p = 1/6', 'Always p = 1/6')
    ]
    return (
        <Figure height={270} label={pick(language, say('Dado baten 10 botaldi: seiak arrakastak dira', 'Diez lanzamientos de un dado: los seises son éxitos', 'عشر رميات لنرد: ظهور 6 نجاح', 'Ten rolls of a die: the sixes are successes'))}>
            {rolls.map((roll, index) => {
                const x = 54 + index * 68
                const hit = roll === 6
                return (
                    <g key={index}>
                        <rect x={x - 25} y={34} width={50} height={50} rx={9} fill={hit ? SECOND_TINT : PAPER} stroke={hit ? SECOND : INK} strokeWidth={hit ? 2.6 : 1.6} />
                        <text x={x} y={68} textAnchor="middle" fontSize={22} fontWeight={700} fill={hit ? SECOND : INK}>{roll}</text>
                        <text x={x} y={108} textAnchor="middle" fontSize={18} fontWeight={700} fill={hit ? SECOND : MUTED}>{hit ? '✓' : '✗'}</text>
                    </g>
                )
            })}
            <Formula x={360} y={150} size={21} color={SECOND}>X = 3</Formula>
            {conditions.map((condition, index) => (
                <g key={index}>
                    <rect x={30 + index * 228} y={176} width={204} height={44} rx={10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />
                    <Label x={132 + index * 228} y={204} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, condition)}</Label>
                </g>
            ))}
            <Caption y={256} language={language} text={say('Hiru baldintzak betetzen dira: X ~ B(10; 1/6)', 'Se cumplen las tres condiciones: X ~ B(10; 1/6)', 'تتحقق الشروط الثلاثة: X ~ B(10; 1/6)', 'The three conditions hold: X ~ B(10; 1/6)')} size={14} />
        </Figure>
    )
}

/* ---------- 7. Probabilities in the binomial: four free throws ---------- */

export function FreeThrowsFigure({ language }: { language: UnitLanguage }) {
    const p = fraction(7, 10)
    const values = [0, 1, 2, 3, 4].map((k) => {
        const value = binomialPmf(4, p, k)
        return value.numerator / value.denominator
    })
    const text = (value: number) => num(language, value.toFixed(4).replace('.', ','))
    return (
        <Figure height={300} label={pick(language, say('B(4; 0,7) banaketaren barrak', 'Las barras de B(4; 0,7)', 'أعمدة B(4; 0.7)', 'The bars of B(4; 0.7)'))}>
            <Bars left={70} right={470} baseline={226} height={160} max={0.42} bars={values.map((value, k) => ({ value, label: String(k), top: text(value), color: k === 3 ? SECOND : k === 0 ? MUTED : STAGE, tint: k === 3 ? SECOND_TINT : k === 0 ? PAPER : STAGE_TINT }))} />
            <Formula x={600} y={96} size={19} color={SECOND}>P(X = 3) = {text(values[3])}</Formula>
            <Formula x={600} y={140} size={17}>P(X ≥ 1) = 1 − {text(values[0])}</Formula>
            <Formula x={600} y={174} size={17}>= {text(1 - values[0])}</Formula>
            <Caption y={288} language={language} text={say('Barra guztiek 1 egiten dute batuta; grisa, X = 0, kendu egiten da', 'Todas las barras suman 1; la gris, X = 0, se resta', 'مجموع كل الأعمدة 1؛ والرمادي، X = 0، يُطرح', 'All the bars add up to 1; the grey one, X = 0, is subtracted')} size={14} />
        </Figure>
    )
}

/* ---------- 8. Mean and deviation of the binomial: one hundred phones ---------- */

export function PhonesFigure({ language }: { language: UnitLanguage }) {
    const ks = Array.from({ length: 25 }, (_, index) => index + 8)
    const left = 60
    const right = 660
    const step = (right - left) / ks.length
    const at = (k: number) => left + step * (k - 8 + 0.5)
    return (
        <Figure height={300} label={pick(language, say('B(100; 0,2) banaketa, μ eta σ', 'La B(100; 0,2) con μ y σ', 'التوزيع B(100; 0.2) مع μ وσ', 'B(100; 0.2) with μ and σ'))}>
            <rect x={at(16) - step / 2} y={40} width={step * 9} height={180} fill={SECOND_TINT} opacity={0.6} />
            <Bars left={left} right={right} baseline={220} height={160} max={0.1} gap={0.12} bars={ks.map((k) => ({ value: binomialPmfDecimal(100, 0.2, k), label: k % 4 === 0 ? String(k) : '' }))} />
            <line x1={at(20)} x2={at(20)} y1={34} y2={226} stroke={SECOND} strokeWidth={2.6} strokeDasharray="6 4" />
            <Formula x={at(20)} y={28} size={17} color={SECOND}>μ = 20</Formula>
            <Formula x={at(16)} y={270} size={16} color={SECOND}>μ − σ = 16</Formula>
            <Formula x={at(24)} y={270} size={16} color={SECOND}>μ + σ = 24</Formula>
            <Caption y={294} language={language} text={say('σ = 4: emaitza gehienak 12 eta 28 artean daude', 'σ = 4: casi todos los resultados caen entre 12 y 28', 'σ = 4: تقع معظم النتائج بين 12 و28', 'σ = 4: almost all the results fall between 12 and 28')} size={14} />
        </Figure>
    )
}

/* ---------- 9. Continuous variables: waiting for the bus ---------- */

export function WaitingFigure({ language }: { language: UnitLanguage }) {
    const left = 70
    const right = 590
    const at = (minutes: number) => left + ((right - left) * minutes) / 10
    return (
        <Figure height={290} label={pick(language, say('Itxaron-denboraren dentsitate laua', 'La densidad plana del tiempo de espera', 'الكثافة المستوية لزمن الانتظار', 'The flat density of the waiting time'))}>
            <rect x={at(0)} y={100} width={at(10) - at(0)} height={110} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />
            <rect x={at(0)} y={100} width={at(3) - at(0)} height={110} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2.4} />
            <Formula x={(at(0) + at(3)) / 2} y={162} size={20} color={SECOND}>{num(language, '0,3')}</Formula>
            <Formula x={(at(3) + at(10)) / 2} y={162} size={18} color={STAGE}>{num(language, '0,7')}</Formula>
            <line x1={left - 10} x2={left - 10} y1={100} y2={210} stroke={MUTED} strokeWidth={1.4} />
            <Formula x={left - 18} y={106} size={15} color={MUTED} anchor="end">1/10</Formula>
            <Axis left={left - 20} right={right + 30} y={210} ticks={[0, 3, 5, 10].map((minutes) => ({ x: at(minutes), label: String(minutes), color: minutes === 3 ? SECOND : MUTED, bold: minutes === 3 }))} />
            <circle cx={at(3)} cy={210} r={5} fill={SECOND} />
            <Formula x={650} y={110} size={17}>10 · k = 1</Formula>
            <Formula x={650} y={146} size={17} color={SECOND}>P(X = 3) = 0</Formula>
            <Caption y={276} language={language} text={say('Probabilitatea azalera da: 3 · 1/10 = 0,3; puntu batek ez du azalerarik', 'La probabilidad es área: 3 · 1/10 = 0,3; un punto no tiene área', 'الاحتمال مساحة: 3 · 1/10 = 0.3؛ والنقطة بلا مساحة', 'The probability is area: 3 · 1/10 = 0.3; a point has no area')} size={14} />
        </Figure>
    )
}

/* ---------- 10. The normal distribution: heights ---------- */

export function HeightsFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 220, top: 50, from: 151, to: 199, mean: 175, sd: 7 })
    return (
        <Figure height={300} label={pick(language, say('Altueren kanpaia, N(175; 7)', 'La campana de las alturas, N(175; 7)', 'جرس الأطوال، N(175; 7)', 'The bell of the heights, N(175; 7)'))}>
            <path d={shape.area(168, 182)} fill={STAGE_TINT} />
            <path d={shape.area(189, 199)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Formula x={shape.sx(175)} y={160} size={20} color={STAGE}>{percent(language, '68,26')}</Formula>
            <Formula x={shape.sx(193)} y={170} size={17} color={SECOND}>{percent(language, '2,28')}</Formula>
            <line x1={shape.sx(193)} x2={shape.sx(191.5)} y1={176} y2={212} stroke={SECOND} strokeWidth={1.6} />
            <Axis left={50} right={670} y={220} ticks={[161, 168, 175, 182, 189].map((value) => ({ x: shape.sx(value), label: String(value), color: value === 189 ? SECOND : value === 175 ? INK : MUTED, bold: value !== 161 }))} />
            <Formula x={shape.sx(168)} y={272} size={15} color={MUTED}>μ − σ</Formula>
            <Formula x={shape.sx(182)} y={272} size={15} color={MUTED}>μ + σ</Formula>
            <Formula x={shape.sx(189)} y={272} size={15} color={SECOND}>μ + 2σ</Formula>
        </Figure>
    )
}

/* ---------- 11. The standard normal table ---------- */

export function TableFigure({ language }: { language: UnitLanguage }) {
    const rows = [1.1, 1.2, 1.3]
    const columns = [0.04, 0.05, 0.06]
    const cell = (z: number) => num(language, `0,${tableValue(z)}`)
    const shape = bell({ left: 430, right: 700, baseline: 190, top: 60, from: -3.2, to: 3.2, mean: 0, sd: 1 })
    return (
        <Figure height={280} label={pick(language, say('Normal estandarraren taularen zati bat', 'Un trozo de la tabla de la normal estándar', 'جزء من جدول التوزيع الطبيعي المعياري', 'A piece of the standard normal table'))}>
            <rect x={30} y={40} width={370} height={180} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
            <line x1={30} x2={400} y1={82} y2={82} stroke={INK} strokeWidth={1.6} />
            <line x1={108} x2={108} y1={40} y2={220} stroke={INK} strokeWidth={1.6} />
            <text x={69} y={68} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>z</text>
            {columns.map((column, c) => <text key={c} x={154 + c * 98} y={68} textAnchor="middle" fontSize={16} fontWeight={700} fill={c === 1 ? SECOND : MUTED} direction="ltr">{num(language, `0,0${Math.round(column * 100)}`)}</text>)}
            {rows.map((row, r) => (
                <g key={r}>
                    <text x={69} y={118 + r * 44} textAnchor="middle" fontSize={16} fontWeight={700} fill={r === 1 ? SECOND : MUTED} direction="ltr">{num(language, String(row).replace('.', ','))}</text>
                    {columns.map((column, c) => {
                        const hit = r === 1 && c === 1
                        return (
                            <g key={c}>
                                {hit && <rect x={110} y={93 + r * 44} width={288} height={38} fill="none" />}
                                {hit && <rect x={112 + c * 98} y={95 + r * 44} width={84} height={34} rx={6} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2.2} />}
                                <text x={154 + c * 98} y={118 + r * 44} textAnchor="middle" fontSize={16} fontWeight={hit ? 700 : 500} fill={hit ? SECOND : INK} direction="ltr">{cell(Math.round((row + column) * 100) / 100)}</text>
                            </g>
                        )
                    })}
                </g>
            ))}
            <path d={shape.area(-3.2, 1.25)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.2} />
            <line x1={426} x2={704} y1={190} y2={190} stroke={INK} strokeWidth={1.8} />
            <Formula x={shape.sx(0)} y={212} size={14} color={MUTED}>0</Formula>
            <Formula x={shape.sx(1.25)} y={212} size={14} color={SECOND}>{num(language, '1,25')}</Formula>
            <Formula x={565} y={246} size={17} color={SECOND}>P(Z ≤ {num(language, '1,25')}) = {cell(1.25)}</Formula>
            <Caption x={215} y={252} language={language} text={say('Errenkada: 1,2 · zutabea: 0,05', 'Fila: 1,2 · columna: 0,05', 'الصف: 1.2 · العمود: 0.05', 'Row: 1.2 · column: 0.05')} size={14} />
        </Figure>
    )
}

/* ---------- 12. Standardising: the bus journey on two scales ---------- */

export function BusFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 180, top: 40, from: 25, to: 55, mean: 40, sd: 5 })
    const marks: Array<[number, string]> = [[30, '-2'], [35, '-1'], [40, '0'], [45, '1'], [48, num(language, '1,6')], [50, '2']]
    return (
        <Figure height={300} label={pick(language, say('Bidaiaren kanpaia, x eskalarekin eta z eskalarekin', 'La campana del trayecto con la escala x y la escala z', 'جرس الرحلة بمقياس x ومقياس z', 'The bell of the journey with the x scale and the z scale'))}>
            <path d={shape.area(35, 48)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Formula x={shape.sx(41)} y={140} size={20} color={SECOND}>{num(language, '0,7865')}</Formula>
            <Axis left={50} right={670} y={180} ticks={marks.map(([x]) => ({ x: shape.sx(x), label: String(x), color: x === 35 || x === 48 ? SECOND : MUTED, bold: x === 35 || x === 48 }))} />
            <line x1={50} x2={670} y1={238} y2={238} stroke={STAGE} strokeWidth={2} />
            {marks.map(([x, z], index) => (
                <g key={index}>
                    <line x1={shape.sx(x)} x2={shape.sx(x)} y1={238} y2={245} stroke={STAGE} strokeWidth={1.6} />
                    <text x={shape.sx(x)} y={264} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">{z.replace('-', '−')}</text>
                </g>
            ))}
            <Formula x={30} y={204} size={16} color={MUTED} anchor="start">x</Formula>
            <Formula x={30} y={262} size={16} color={STAGE} anchor="start">z</Formula>
            <Caption y={292} language={language} text={say('z = (x − 40) / 5: eskala berria, azalera bera', 'z = (x − 40) / 5: escala nueva, la misma área', 'z = (x − 40) / 5: مقياس جديد والمساحة نفسها', 'z = (x − 40) / 5: a new scale, the same area')} size={14} />
        </Figure>
    )
}

/* ---------- 13. Reading the table backwards: the best 10 % ---------- */

export function TopTenFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 50, from: 1.5, to: 10.5, mean: 6, sd: 1.5 })
    return (
        <Figure height={290} label={pick(language, say('% 10 onena uzten duen nota', 'La nota que deja el 10 % mejor', 'العلامة التي تترك أفضل 10٪', 'The mark that leaves the best 10%'))}>
            <path d={shape.area(1.5, 7.92)} fill={STAGE_TINT} />
            <path d={shape.area(7.92, 10.5)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <line x1={shape.sx(7.92)} x2={shape.sx(7.92)} y1={shape.sy(7.92) - 14} y2={200} stroke={SECOND} strokeWidth={2.4} />
            <Formula x={shape.sx(5.6)} y={160} size={20} color={STAGE}>{percent(language, '90')}</Formula>
            <Formula x={shape.sx(9.1)} y={150} size={18} color={SECOND}>{percent(language, '10')}</Formula>
            <Axis left={50} right={670} y={200} ticks={[{ x: shape.sx(6), label: '6' }, { x: shape.sx(7.92), label: num(language, '7,92'), color: SECOND, bold: true }]} />
            <Formula x={shape.sx(6)} y={254} size={15} color={STAGE}>z = 0</Formula>
            <Formula x={shape.sx(7.92) + 30} y={254} size={15} color={STAGE}>k = {num(language, '1,28')}</Formula>
            <Caption y={282} language={language} text={say('Taulan 0,9 bilatzen da: 0,8997 da hurbilena', 'Se busca 0,9 en la tabla: el más cercano es 0,8997', 'نبحث عن 0.9 في الجدول: الأقرب 0.8997', 'Look for 0.9 in the table: the closest is 0.8997')} size={14} />
        </Figure>
    )
}

/* ---------- 14. The binomial looks like a normal: B(48; 0,25) ---------- */

export function BarsBellFigure({ language }: { language: UnitLanguage }) {
    const ks = Array.from({ length: 21 }, (_, index) => index + 2)
    const left = 60
    const right = 660
    const step = (right - left) / ks.length
    const max = 0.14
    const height = 170
    const baseline = 220
    // The density of N(12; 3) on the same scale as the bars: a bar of width 1 has area P(X = k)
    const xAt = (value: number) => left + step * (value - 2 + 0.5)
    const curve = Array.from({ length: 121 }, (_, index) => 1.5 + (21 * index) / 120).map((value, index) => `${index ? 'L' : 'M'}${xAt(value).toFixed(1)} ${(baseline - ((phiDensity((value - 12) / 3) / 3) / max) * height).toFixed(1)}`).join(' ')
    return (
        <Figure height={300} label={pick(language, say('B(48; 0,25) banaketaren barrak eta N(12; 3) kanpaia', 'Las barras de B(48; 0,25) y la campana N(12; 3)', 'أعمدة B(48; 0.25) وجرس N(12; 3)', 'The bars of B(48; 0.25) and the bell N(12; 3)'))}>
            <Bars left={left} right={right} baseline={baseline} height={height} max={max} gap={0.14} bars={ks.map((k) => ({ value: binomialPmfDecimal(48, 0.25, k), label: k % 3 === 0 ? String(k) : '' }))} />
            <path d={curve} fill="none" stroke={SECOND} strokeWidth={3} />
            <Formula x={560} y={70} size={18} color={STAGE}>B(48; {num(language, '0,25')})</Formula>
            <Formula x={560} y={102} size={18} color={SECOND}>N(12; 3)</Formula>
            <Caption y={288} language={language} text={say('np = 12 eta nq = 36: barrek kanpaiari jarraitzen diote', 'np = 12 y nq = 36: las barras siguen la campana', 'np = 12 وnq = 36: تتبع الأعمدة الجرس', 'np = 12 and nq = 36: the bars follow the bell')} size={14} />
        </Figure>
    )
}

/* ---------- 15. The continuity correction: at least 60 heads ---------- */

export function HalfStepFigure({ language }: { language: UnitLanguage }) {
    const ks = Array.from({ length: 15 }, (_, index) => index + 52)
    const left = 60
    const right = 660
    const step = (right - left) / ks.length
    const max = 0.08
    const height = 170
    const baseline = 210
    const xAt = (value: number) => left + step * (value - 52 + 0.5)
    const yAt = (value: number) => baseline - ((phiDensity((value - 50) / 5) / 5) / max) * height
    const trace = (a: number, b: number) => Array.from({ length: 61 }, (_, index) => a + ((b - a) * index) / 60).map((value, index) => `${index ? 'L' : 'M'}${xAt(value).toFixed(1)} ${yAt(value).toFixed(1)}`).join(' ')
    return (
        <Figure height={300} label={pick(language, say('Gutxienez 60 aurpegi: 59,5 puntutik aurrera', 'Al menos 60 caras: desde 59,5', '60 وجهًا على الأقل: من 59.5', 'At least 60 heads: from 59.5'))}>
            <path d={`${trace(59.5, 66.5)} L${xAt(66.5)} ${baseline} L${xAt(59.5)} ${baseline} Z`} fill={SECOND_TINT} />
            <Bars left={left} right={right} baseline={baseline} height={height} max={max} gap={0} bars={ks.map((k) => ({ value: binomialPmfDecimal(100, 0.5, k), label: k % 2 === 0 ? String(k) : '', color: k >= 60 ? SECOND : STAGE, tint: k >= 60 ? 'rgba(196, 67, 42, 0.12)' : 'rgba(221, 231, 247, 0.6)' }))} />
            <path d={trace(51.5, 66.5)} fill="none" stroke={INK} strokeWidth={2.6} />
            <line x1={xAt(59.5)} x2={xAt(59.5)} y1={40} y2={baseline} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <Formula x={xAt(59.5)} y={32} size={17} color={SECOND}>{num(language, '59,5')}</Formula>
            <Formula x={540} y={96} size={17}>z = {num(language, '1,9')}</Formula>
            <Formula x={540} y={128} size={17} color={SECOND}>1 − {num(language, '0,9713')} = {num(language, '0,0287')}</Formula>
            <Caption y={284} language={language} text={say('60 barra 59,5 puntuan hasten da: hortik aurrera zenbatzen da', 'La barra del 60 empieza en 59,5: se cuenta desde ahí', 'يبدأ عمود 60 عند 59.5: نعدّ من هناك', 'The bar of 60 starts at 59.5: count from there')} size={14} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function DistributionsBatx2HeroArt() {
    const shape = bell({ left: 24, right: 206, baseline: 128, top: 26, from: -3, to: 3, mean: 0, sd: 1 })
    const bars = [1, 4, 6, 4, 1]
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
                    {bars.map((value, index) => <rect key={index} x={30 + index * 30} y={116 - value * 14} width={24} height={value * 14} fill={PAPER} stroke={INK} strokeWidth={1.8} />)}
                    <line x1={20} x2={180} y1={116} y2={116} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(296 210) rotate(-3)">
                    <rect width={196} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={62} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">B(n; p)</text>
                </g>
                <g transform="translate(40 236) rotate(2)">
                    <rect width={230} height={120} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={70} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">z = (x − μ) / σ</text>
                </g>
                <g transform="translate(316 330) rotate(3)">
                    <rect width={170} height={52} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={85} y={35} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">N(μ; σ)</text>
                </g>
            </svg>
        </div>
    )
}
