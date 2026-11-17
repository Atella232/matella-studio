import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { phiDensity } from '../batx2-zientziak-banaketak/normal'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — lesson figures, each
   with the numbers of its «Let's solve»: batteries and a sample, a biased
   poll at a sports centre, the comb of a systematic sample, the strata of
   a school, equal and proportional allocation, the nine samples of
   {2, 4, 6}, two bells (X and X̄), the central limit theorem, the sum of
   the luggage, a sample proportion, the bell of p̂, its tail, two
   characteristic intervals and the band that shrinks with n. Formulas
   left to right; Arabic words through Label.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const SECOND_TINT = 'rgba(196, 67, 42, 0.22)'

function Word({ x, y, language, text, size = 15, color = INK, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

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

function bell({ left, right, baseline, top, from, to, mean, sd }: { left: number; right: number; baseline: number; top: number; from: number; to: number; mean: number; sd: number }) {
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const peak = phiDensity(0)
    const sy = (value: number) => baseline - (phiDensity((value - mean) / sd) / peak) * (baseline - top)
    const trace = (a: number, b: number, steps = 90) => Array.from({ length: steps + 1 }, (_, index) => a + ((b - a) * index) / steps).map((value, index) => `${index ? 'L' : 'M'}${sx(value).toFixed(1)} ${sy(value).toFixed(1)}`).join(' ')
    const area = (a: number, b: number) => `${trace(a, b, 60)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
    return { sx, sy, curve: trace(from, to, 160), area }
}

/** A person: head and shoulders */
function Person({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <circle cx={0} cy={-12} r={7} fill={color} stroke={INK} strokeWidth={1.3} />
            <path d="M -11 10 Q -11 -4 0 -4 Q 11 -4 11 10 Z" fill={color} stroke={INK} strokeWidth={1.3} />
        </g>
    )
}

/* ---------- 1. Population and sample: batteries ---------- */

export function BatteriesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('Bateriak: populazioa eta lagina', 'Baterías: población y muestra', 'البطاريات: المجتمع والعيّنة', 'Batteries: population and sample'))}>
            <rect x={30} y={30} width={420} height={190} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            {Array.from({ length: 60 }, (_, index) => {
                const x = 52 + (index % 15) * 26
                const y = 52 + Math.floor(index / 15) * 42
                const tested = index % 15 < 3
                return (
                    <g key={index}>
                        <rect x={x} y={y} width={14} height={28} rx={3} fill={tested ? SECOND : PAPER} stroke={INK} strokeWidth={1.2} />
                        <rect x={x + 4} y={y - 4} width={6} height={4} fill={INK} />
                    </g>
                )
            })}
            <Word x={240} y={248} language={language} text={say('Populazioa: bateria guztiak', 'Población: todas las baterías', 'المجتمع: كل البطاريات', 'Population: all the batteries')} color={STAGE} />
            <Word x={590} y={110} language={language} text={say('Lagina:', 'Muestra:', 'العيّنة:', 'Sample:')} color={SECOND} />
            <Word x={590} y={140} language={language} text={say('50 bateria', '50 baterías', '50 بطارية', '50 batteries')} color={SECOND} />
            <Word x={590} y={180} language={language} text={say('(agortu arte)', '(hasta agotarse)', '(حتى تنفد)', '(until they run out)')} color={MUTED} size={14} />
        </Figure>
    )
}

/* ---------- 2. Bias: the sports centre ---------- */

export function BiasFigure({ language }: { language: UnitLanguage }) {
    const town = Array.from({ length: 24 }, (_, index) => index)
    return (
        <Figure height={280} label={pick(language, say('Kiroldegiko lagina, alborapenarekin', 'La muestra del polideportivo, con sesgo', 'عيّنة المركز الرياضي متحيّزة', 'The sports centre sample, biased'))}>
            <Word x={160} y={30} language={language} text={say('Herria', 'El pueblo', 'البلدة', 'The town')} color={MUTED} />
            {town.map((index) => <Person key={index} x={50 + (index % 8) * 30} y={70 + Math.floor(index / 8) * 46} color={index % 3 === 0 ? SECOND_TINT : index % 3 === 1 ? STAGE_TINT : PAPER} scale={0.9} />)}
            <rect x={400} y={50} width={260} height={150} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Word x={530} y={80} language={language} text={say('Kiroldegiaren atea', 'Puerta del polideportivo', 'باب المركز الرياضي', 'Sports centre door')} color={INK} size={14} />
            {Array.from({ length: 6 }, (_, index) => <Person key={index} x={440 + index * 36} y={140} color={SECOND_TINT} scale={0.9} />)}
            <path d="M 300 130 C 340 130, 360 130, 395 130" stroke={MUTED} strokeWidth={2} fill="none" markerEnd="" />
            <Caption y={250} language={language} text={say('Kirolariak bakarrik iristen dira lagina', 'Solo los deportistas llegan a la muestra', 'لا يصل إلى العيّنة إلا الرياضيون', 'Only the sporty ones reach the sample')} color={SECOND} />
        </Figure>
    )
}

/* ---------- 3. Systematic sampling: the comb ---------- */

export function CombFigure({ language }: { language: UnitLanguage }) {
    const ticks = Array.from({ length: 21 }, (_, index) => index * 30)
    const sx = (value: number) => 40 + (value / 600) * 640
    return (
        <Figure height={230} label={pick(language, say('Lagin sistematikoa: 30 pertsonatik bat', 'Muestra sistemática: uno de cada 30', 'عيّنة منتظمة: واحد من كل 30', 'Systematic sample: one in every 30'))}>
            <line x1={40} x2={680} y1={120} y2={120} stroke={INK} strokeWidth={2} />
            {ticks.map((value) => <line key={value} x1={sx(value)} x2={sx(value)} y1={114} y2={126} stroke={MUTED} strokeWidth={1.2} />)}
            {Array.from({ length: 20 }, (_, index) => 13 + index * 30).map((value) => <line key={value} x1={sx(value)} x2={sx(value)} y1={70} y2={120} stroke={SECOND} strokeWidth={2.4} />)}
            <text x={sx(13)} y={60} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>13</text>
            <text x={sx(43)} y={60} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>43</text>
            <text x={sx(583)} y={60} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>583</text>
            <text x={sx(0)} y={148} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>1</text>
            <text x={sx(600)} y={148} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>600</text>
            <Formula x={360} y={190} size={19} color={SECOND}>h = 600 / 20 = 30</Formula>
        </Figure>
    )
}

/* ---------- 4. Proportional allocation: the school ---------- */

export function SchoolStrataFigure({ language }: { language: UnitLanguage }) {
    const strata = [{ size: 330, take: '26,4', got: 26 }, { size: 250, take: '20', got: 20 }, { size: 120, take: '9,6', got: 10 }]
    const total = 700
    const starts = strata.map((_, index) => 40 + strata.slice(0, index).reduce((sum, item) => sum + (item.size / total) * 640, 0))
    return (
        <Figure height={260} label={pick(language, say('Geruzak eta laginaren banaketa', 'Los estratos y el reparto de la muestra', 'الطبقات وتوزيع العيّنة', 'The strata and how the sample is shared'))}>
            {strata.map((stratum, index) => {
                const width = (stratum.size / total) * 640
                const x = starts[index]
                return (
                    <g key={index}>
                        <rect x={x} y={40} width={width} height={70} fill={index === 2 ? SECOND_TINT : STAGE_TINT} stroke={INK} strokeWidth={2} />
                        <text x={x + width / 2} y={82} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{stratum.size}</text>
                        <text x={x + width / 2} y={140} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED} direction="ltr">{num(language, stratum.take)}</text>
                        <rect x={x + width / 2 - 26} y={154} width={52} height={36} rx={8} fill={PAPER} stroke={index === 2 ? SECOND : STAGE} strokeWidth={2} />
                        <text x={x + width / 2} y={179} textAnchor="middle" fontSize={19} fontWeight={700} fill={index === 2 ? SECOND : STAGE}>{stratum.got}</text>
                    </g>
                )
            })}
            <Caption y={232} language={language} text={say('Falta den bat hondar handienari: 9,6 → 10', 'El que falta, al mayor resto: 9,6 → 10', 'الناقص لأكبر باقٍ: 9.6 → 10', 'The missing one to the largest remainder: 9.6 → 10')} />
        </Figure>
    )
}

/* ---------- 5. Equal and proportional allocation ---------- */

export function EqualFigure({ language }: { language: UnitLanguage }) {
    const sizes = [2000, 5000, 3000]
    const equal = [100, 100, 100]
    const proportional = [60, 150, 90]
    const bar = (values: number[], y: number, color: string, tint: string) => {
        return values.map((value, index) => {
            const width = (value / 300) * 440
            const x = 220 + values.slice(0, index).reduce((sum, item) => sum + (item / 300) * 440, 0)
            return (
                <g key={index}>
                    <rect x={x} y={y} width={width} height={40} fill={tint} stroke={color} strokeWidth={2} />
                    <text x={x + width / 2} y={y + 27} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{value}</text>
                </g>
            )
        })
    }
    return (
        <Figure height={240} label={pick(language, say('Esleipen berdina eta proportzionala', 'Afijación igual y proporcional', 'التوزيع المتساوي والتناسبي', 'Equal and proportional allocation'))}>
            {sizes.map((size, index) => <text key={size} x={220 + index * 150 + 70} y={34} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{size}</text>)}
            <Word x={200} y={77} language={language} text={say('Berdina', 'Igual', 'المتساوي', 'Equal')} anchor="end" color={STAGE} />
            {bar(equal, 50, STAGE, STAGE_TINT)}
            <Word x={200} y={147} language={language} text={say('Proportzionala', 'Proporcional', 'التناسبي', 'Proportional')} anchor="end" color={SECOND} />
            {bar(proportional, 120, SECOND, SECOND_TINT)}
            <Caption y={215} language={language} text={say('Bi kasuetan 300 pertsona', 'En los dos casos, 300 personas', 'في الحالتين 300 شخص', '300 people in both cases')} />
        </Figure>
    )
}

/* ---------- 6. All the samples of {2, 4, 6} ---------- */

export function AllSamplesFigure({ language }: { language: UnitLanguage }) {
    const means = [2, 3, 4, 3, 4, 5, 4, 5, 6]
    const counts = [2, 3, 4, 5, 6].map((value) => means.filter((mean) => mean === value).length)
    return (
        <Figure height={290} label={pick(language, say('9 laginen batez bestekoak', 'Las medias de las 9 muestras', 'متوسطات العيّنات التسع', 'The means of the 9 samples'))}>
            {[2, 3, 4, 5, 6].map((value, index) => {
                const x = 100 + index * 80
                return (
                    <g key={value}>
                        {Array.from({ length: counts[index] }, (_, k) => <circle key={k} cx={x} cy={200 - k * 36} r={15} fill={value === 4 ? SECOND_TINT : STAGE_TINT} stroke={value === 4 ? SECOND : STAGE} strokeWidth={2} />)}
                        <text x={x} y={242} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{value}</text>
                    </g>
                )
            })}
            <line x1={70} x2={450} y1={220} y2={220} stroke={INK} strokeWidth={2} />
            <Formula x={590} y={120} size={18}>μ = 4</Formula>
            <Formula x={590} y={160} size={18} color={SECOND}>36 / 9 = 4</Formula>
            <Caption y={278} language={language} text={say('Batez bestekoak 4 zenbakiaren inguruan biltzen dira', 'Las medias se agrupan alrededor de 4', 'تتجمع المتوسطات حول 4', 'The means gather around 4')} />
        </Figure>
    )
}

/* ---------- 7. X and X̄: weights ---------- */

export function WeightsFigure({ language }: { language: UnitLanguage }) {
    const wide = bell({ left: 60, right: 660, baseline: 210, top: 160, from: 34, to: 106, mean: 70, sd: 12 })
    const narrow = bell({ left: 60, right: 660, baseline: 210, top: 40, from: 34, to: 106, mean: 70, sd: 2 })
    return (
        <Figure height={290} label={pick(language, say('Pisu solteak eta 36ko laginen batez bestekoak', 'Pesos sueltos y medias de muestras de 36', 'أوزان مفردة ومتوسطات عيّنات من 36', 'Single weights and means of samples of 36'))}>
            <path d={narrow.area(72, 76)} fill={SECOND_TINT} />
            <path d={wide.curve} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="6 4" />
            <path d={narrow.curve} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <Axis left={50} right={670} y={210} ticks={[46, 58, 70, 72, 82, 94].map((value) => ({ x: wide.sx(value), label: String(value), color: value === 72 ? SECOND : MUTED }))} />
            <Formula x={wide.sx(46)} y={150} size={15} color={MUTED}>X ~ N(70; 12)</Formula>
            <Formula x={wide.sx(90)} y={70} size={16} color={STAGE}>X̄ ~ N(70; 2)</Formula>
            <Formula x={360} y={270} size={17} color={SECOND}>P(X̄ &gt; 72) = {num(language, '0,1587')}</Formula>
        </Figure>
    )
}

/* ---------- 8. The central limit theorem: spending ---------- */

export function SpendingFigure({ language }: { language: UnitLanguage }) {
    const skew = [26, 40, 30, 20, 13, 8, 5, 3, 2, 1]
    const shape = bell({ left: 380, right: 680, baseline: 210, top: 60, from: 15.5, to: 24.5, mean: 20, sd: 1.5 })
    return (
        <Figure height={290} label={pick(language, say('Populazio asimetriko bat eta haren batez bestekoen kanpaia', 'Una población asimétrica y la campana de sus medias', 'مجتمع غير متماثل وجرس متوسطاته', 'A skewed population and the bell of its means'))}>
            {skew.map((height, index) => <rect key={index} x={40 + index * 28} y={210 - height * 3.5} width={22} height={height * 3.5} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.4} />)}
            <line x1={34} x2={330} y1={210} y2={210} stroke={INK} strokeWidth={2} />
            <Word x={180} y={240} language={language} text={say('Gastu solteak (ez normala)', 'Gastos sueltos (no normal)', 'إنفاق مفرد (غير طبيعي)', 'Single amounts (not normal)')} size={14} color={MUTED} />
            <path d={shape.area(15.5, 23)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={SECOND} strokeWidth={2.6} />
            <line x1={374} x2={686} y1={210} y2={210} stroke={INK} strokeWidth={2} />
            <text x={shape.sx(20)} y={230} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>20</text>
            <text x={shape.sx(23)} y={230} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>23</text>
            <Formula x={530} y={262} size={16} color={SECOND}>X̄ ≈ N(20; {num(language, '1,5')})</Formula>
        </Figure>
    )
}

/* ---------- 9. The sum: luggage ---------- */

export function LuggageFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 50, from: 390, to: 510, mean: 450, sd: 20 })
    return (
        <Figure height={280} label={pick(language, say('25 maleten pisuaren kanpaia', 'La campana del peso de 25 maletas', 'جرس وزن 25 حقيبة', 'The bell of the weight of 25 suitcases'))}>
            <path d={shape.area(480, 510)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Axis left={50} right={670} y={200} ticks={[410, 430, 450, 470, 480, 490].map((value) => ({ x: shape.sx(value), label: String(value), color: value === 480 ? SECOND : MUTED }))} />
            <Formula x={shape.sx(495)} y={150} size={16} color={SECOND}>{num(language, '0,0668')}</Formula>
            <Formula x={360} y={258} size={17}>Σ X ~ N(25 · 18; 4 · √25) = N(450; 20)</Formula>
        </Figure>
    )
}

/* ---------- 10. A sample proportion ---------- */

export function VotersFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('400 pertsona, 140 autobusez', '400 personas, 140 en autobús', '400 شخص، 140 بالحافلة', '400 people, 140 by bus'))}>
            {Array.from({ length: 40 }, (_, index) => <Person key={index} x={60 + (index % 20) * 30} y={60 + Math.floor(index / 20) * 50} color={index < 14 ? SECOND : PAPER} scale={0.85} />)}
            <Word x={360} y={170} language={language} text={say('Ikur bakoitza: 10 pertsona', 'Cada figura: 10 personas', 'كل رمز: 10 أشخاص', 'Each figure: 10 people')} size={14} color={MUTED} />
            <Formula x={360} y={220} size={20} color={SECOND}>p̂ = 140 / 400 = {num(language, '0,35')}</Formula>
        </Figure>
    )
}

/* ---------- 11. The bell of p̂ ---------- */

export function ProportionBellFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 50, from: 0.14, to: 0.26, mean: 0.2, sd: 0.02 })
    return (
        <Figure height={270} label={pick(language, say('p̂ proportzioen kanpaia', 'La campana de las proporciones', 'جرس النسب', 'The bell of the proportions'))}>
            <path d={shape.curve} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <Axis left={50} right={670} y={200} ticks={[0.16, 0.18, 0.2, 0.22, 0.24].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 0.2 ? STAGE : MUTED }))} />
            <Formula x={360} y={256} size={18} color={STAGE}>p̂ ≈ N({num(language, '0,2')}; {num(language, '0,02')})</Formula>
        </Figure>
    )
}

/* ---------- 12. A tail of p̂ ---------- */

export function ProportionTailFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 50, from: 0.35, to: 0.65, mean: 0.5, sd: 0.05 })
    return (
        <Figure height={270} label={pick(language, say('Gutxienez % 60 alde', 'Al menos el 60 % a favor', '60 % على الأقل مع', 'At least 60% in favour'))}>
            <path d={shape.area(0.6, 0.65)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Axis left={50} right={670} y={200} ticks={[0.4, 0.45, 0.5, 0.55, 0.6].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 0.6 ? SECOND : MUTED }))} />
            <Formula x={shape.sx(0.62)} y={150} size={16} color={SECOND}>{num(language, '0,0228')}</Formula>
            <Formula x={360} y={256} size={17}>z = ({num(language, '0,6 − 0,5')}) / {num(language, '0,05')} = 2</Formula>
        </Figure>
    )
}

/* ---------- 13. The characteristic interval of the means ---------- */

export function MeanBandFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 40, from: 163, to: 177, mean: 170, sd: 2 })
    return (
        <Figure height={270} label={pick(language, say('Batez bestekoen tartea, % 95', 'El intervalo de las medias, 95 %', 'فترة المتوسطات، 95 %', 'The interval of the means, 95%'))}>
            <path d={shape.area(166.08, 173.92)} fill={STAGE_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Axis left={50} right={670} y={200} ticks={[166.08, 170, 173.92].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 170 ? INK : SECOND }))} />
            <Formula x={shape.sx(170)} y={150} size={19} color={STAGE}>95 %</Formula>
            <Formula x={360} y={256} size={17}>170 ± {num(language, '1,96')} · 2</Formula>
        </Figure>
    )
}

/* ---------- 14. The characteristic interval of the proportions ---------- */

export function ProportionBandFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 200, top: 40, from: 0.34, to: 0.46, mean: 0.4, sd: 0.02 })
    return (
        <Figure height={270} label={pick(language, say('Proportzioen tartea, % 95', 'El intervalo de las proporciones, 95 %', 'فترة النسب، 95 %', 'The interval of the proportions, 95%'))}>
            <path d={shape.area(0.3608, 0.4392)} fill={STAGE_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <Axis left={50} right={670} y={200} ticks={[0.3608, 0.4, 0.4392].map((value) => ({ x: shape.sx(value), label: num(language, String(value).replace('.', ',')), color: value === 0.4 ? INK : SECOND }))} />
            <Formula x={shape.sx(0.4)} y={150} size={19} color={STAGE}>95 %</Formula>
            <Formula x={360} y={256} size={17}>{num(language, '0,4 ± 1,96 · 0,02')}</Formula>
        </Figure>
    )
}

/* ---------- 15. Bigger sample, narrower interval ---------- */

export function BiggerSampleFigure({ language }: { language: UnitLanguage }) {
    const left = 80
    const right = 640
    const sx = (value: number) => left + ((value - 94) / 12) * (right - left)
    return (
        <Figure height={250} label={pick(language, say('Tartea 25 eta 100 pertsonarekin', 'El intervalo con 25 y con 100 personas', 'الفترة مع 25 ومع 100 شخص', 'The interval with 25 and with 100 people'))}>
            <line x1={sx(100)} x2={sx(100)} y1={30} y2={190} stroke={LINE} strokeWidth={2} />
            <rect x={sx(100 - 3.92)} y={60} width={sx(100 + 3.92) - sx(100 - 3.92)} height={34} rx={8} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <text x={sx(100 + 3.92) + 12} y={83} fontSize={16} fontWeight={700} fill={STAGE} direction="ltr">n = 25</text>
            <rect x={sx(100 - 1.96)} y={130} width={sx(100 + 1.96) - sx(100 - 1.96)} height={34} rx={8} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
            <text x={sx(100 + 1.96) + 12} y={153} fontSize={16} fontWeight={700} fill={SECOND} direction="ltr">n = 100</text>
            <Formula x={360} y={220} size={17}>±{num(language, '3,92')} → ±{num(language, '1,96')}</Formula>
        </Figure>
    )
}

/* ---------- Hero art: a population and a sample ---------- */

export function SamplingBatx2gHeroArt() {
    return (
        <svg viewBox="0 0 240 160" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <rect x={10} y={20} width={130} height={120} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: 20 }, (_, index) => <circle key={index} cx={28 + (index % 5) * 24} cy={40 + Math.floor(index / 5) * 26} r={7} fill={index % 4 === 0 ? SECOND : PAPER} stroke={INK} strokeWidth={1.6} />)}
            <path d="M 150 80 L 172 80" stroke={INK} strokeWidth={2.4} />
            <path d="M 168 74 L 178 80 L 168 86 Z" fill={INK} />
            <circle cx={208} cy={80} r={26} fill={PAPER} stroke={SECOND} strokeWidth={2.4} />
            {[0, 1, 2, 3].map((index) => <circle key={index} cx={198 + (index % 2) * 20} cy={70 + Math.floor(index / 2) * 20} r={6} fill={index === 0 ? SECOND : PAPER} stroke={INK} strokeWidth={1.4} />)}
        </svg>
    )
}
