import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { OGIVE, SHARE, BAND, SPREAD, UNEQUAL } from './data'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   figures of the lessons that are new in Sociales: a histogram with
   intervals of different widths, two groups on a balance, the cumulative
   percentage polygon (built, read at a percentage and read at a value),
   three bar charts with the same mean and different spread, the four
   quarters of a population, the faulty parts of a factory and the band
   x̄ ± σ. Each one draws the numbers of its lesson's «Let's solve» (they
   live in data.ts, so the tests can check them). Formulas sit in their
   own <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A number for the screen: 0,5 in Basque and Spanish, 0.5 in English and Arabic */
const num = (language: UnitLanguage, value: number) => String(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
/** A percentage as each language writes it: % 40, 40 %, 40%, 40٪ */
const pct = (language: UnitLanguage, value: number) => {
    const n = num(language, value)
    return language === 'eu' ? `% ${n}` : language === 'en' ? `${n}%` : language === 'ar' ? `${n}٪` : `${n} %`
}
/** An amount of euros: €20 in English, 20 € in the others */
const euro = (language: UnitLanguage, value: number) => (language === 'en' ? `€${num(language, value)}` : `${num(language, value)} €`)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Axis({ y, from, to, ticks, x, size = 18 }: { y: number; from: number; to: number; ticks: Array<[number, string]>; x: (value: number) => number; size?: number }) {
    return (
        <g>
            <line x1={x(from)} x2={x(to)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map(([value, text]) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 6} y2={y + 6} stroke={INK} strokeWidth={1.6} />
                    <F x={x(value)} y={y + 26} size={size} weight={400}>{text}</F>
                </g>
            ))}
        </g>
    )
}

/* ---------- Different widths: the height is f / a ---------- */

export function UnequalWidthsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 60 + value * 75
    const y = (height: number) => 250 - height * 10
    const ends = [...new Set(UNEQUAL.flatMap((bar) => [bar.from, bar.to]))]
    return (
        <Figure height={330} label={t(say('Histograma: barra bakoitzaren azalera haren maiztasuna da, eta altuera maiztasuna zati zabalera', 'Histograma: el área de cada barra es su frecuencia y la altura, la frecuencia entre la amplitud', 'مدرّج تكراري: مساحة كل عمود تكراره والارتفاع التكرار مقسومًا على الطول', 'Histogram: the area of each bar is its frequency and the height, the frequency divided by the width'))}>
            {UNEQUAL.map((bar, index) => {
                const height = bar.count / (bar.to - bar.from)
                return (
                    <g key={index}>
                        <rect x={x(bar.from)} y={y(height)} width={x(bar.to) - x(bar.from)} height={250 - y(height)} fill={index === UNEQUAL.length - 1 ? CORAL_TINT : STAGE_TINT} stroke={index === UNEQUAL.length - 1 ? SECOND : STAGE} strokeWidth={1.8} />
                        <F x={(x(bar.from) + x(bar.to)) / 2} y={y(height) - 10} size={19} color={index === UNEQUAL.length - 1 ? SECOND : STAGE}>{num(language, height)}</F>
                        {height >= 4 ? <F x={(x(bar.from) + x(bar.to)) / 2} y={(y(height) + 250) / 2 + 7} size={17} weight={400}>f = {bar.count}</F> : <F x={(x(bar.from) + x(bar.to)) / 2} y={238} size={17} weight={400}>f = {bar.count}</F>}
                    </g>
                )
            })}
            <Axis y={250} from={0} to={8} x={x} ticks={ends.map((value) => [value, String(value)])} />
            <Caption y={316}>{t(say('Altuera = maiztasuna : zabalera; azalera da maiztasuna', 'Altura = frecuencia : amplitud; el área es la frecuencia', 'الارتفاع = التكرار ÷ الطول؛ والمساحة هي التكرار', 'Height = frequency ÷ width; the area is the frequency'))}</Caption>
        </Figure>
    )
}

/* ---------- Two groups on a balance ---------- */

export function GroupMeansFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 60 + (value - 16) * 37.5
    const groups = [{ value: 20, count: 30 }, { value: 28, count: 10 }]
    const mean = groups.reduce((sum, group) => sum + group.value * group.count, 0) / groups.reduce((sum, group) => sum + group.count, 0)
    return (
        <Figure height={320} label={t(say('Bi talde balantza batean: 30 ikasle 20 euroan eta 10 ikasle 28 euroan; oreka 22 euroan', 'Dos grupos en una balanza: 30 alumnos en 20 euros y 10 alumnos en 28 euros; el equilibrio en 22 euros', 'مجموعتان على ميزان: 30 طالبًا عند 20 يورو و10 طلاب عند 28 يورو، والتوازن عند 22 يورو', 'Two groups on a balance: 30 students at 20 euros and 10 students at 28 euros; the balance point at 22 euros'))}>
            {groups.map((group, index) => (
                <g key={group.value}>
                    <rect x={x(group.value) - 34} y={200 - group.count * 4.4} width={68} height={group.count * 4.4} rx={6} fill={index === 0 ? STAGE_TINT : CORAL_TINT} stroke={index === 0 ? STAGE : SECOND} strokeWidth={1.8} />
                    <F x={x(group.value)} y={190 - group.count * 4.4} size={20} color={index === 0 ? STAGE : SECOND}>{group.count}</F>
                </g>
            ))}
            <Axis y={200} from={16} to={32} x={x} ticks={[16, 20, 24, 28, 32].map((value) => [value, euro(language, value)])} />
            <polygon points={`${x(mean)},${204} ${x(mean) - 14},${232} ${x(mean) + 14},${232}`} fill={GREEN} />
            <F x={x(mean)} y={262} size={20} color={GREEN}>x̄ = {euro(language, mean)}</F>
            <Caption y={302}>{t(say('Talde handiak gehiago tiratzen du: oreka ez dago erdian', 'El grupo grande tira más: el equilibrio no está en el centro', 'المجموعة الكبيرة تجذب أكثر: فالتوازن ليس في الوسط', 'The big group pulls harder: the balance point is not in the middle'))}</Caption>
        </Figure>
    )
}

/* ---------- The cumulative percentage polygon ---------- */

export type OgiveMode = 'build' | 'percentile' | 'value'

export function OgiveFigure({ language, mode }: { language: UnitLanguage; mode: OgiveMode }) {
    const t = useText(language)
    const x = (value: number) => 110 + (value - 20) * 13.5
    const y = (percent: number) => 260 - percent * 2.1
    const points = OGIVE.points
    const path = points.map(([value, percent]) => `${x(value)},${y(percent)}`).join(' ')
    const reads: Array<{ value: number; percent: number; label: string }> = mode === 'build'
        ? [{ value: 40, percent: 40, label: pct(language, 40) }]
        : mode === 'percentile'
            ? [{ value: OGIVE.q1, percent: 25, label: `Q₁ = ${num(language, OGIVE.q1)}` }, { value: OGIVE.median, percent: 50, label: `Me = ${num(language, OGIVE.median)}` }]
            : [{ value: OGIVE.value, percent: OGIVE.valuePercent, label: pct(language, OGIVE.valuePercent) }]
    return (
        <Figure height={340} label={t(say('Ehuneko metatuen poligonoa: adina eta ehuneko metatua', 'Polígono de porcentajes acumulados: edad y porcentaje acumulado', 'مضلّع النسب المتجمّعة: العمر والنسبة المتجمّعة', 'Cumulative percentage polygon: age and cumulative percentage'))}>
            {[0, 25, 50, 75, 100].map((percent) => (
                <g key={percent}>
                    <line x1={x(20)} x2={x(60)} y1={y(percent)} y2={y(percent)} stroke={MUTED} strokeWidth={percent === 0 ? 0 : 0.8} strokeDasharray="3 5" />
                    <F x={x(20) - 12} y={y(percent) + 6} size={16} weight={400} anchor="end">{pct(language, percent)}</F>
                </g>
            ))}
            <line x1={x(20)} x2={x(20)} y1={y(0)} y2={y(100) - 10} stroke={INK} strokeWidth={2} />
            <polyline points={path} fill="none" stroke={STAGE} strokeWidth={3} />
            {points.map(([value, percent]) => <circle key={value} cx={x(value)} cy={y(percent)} r={6} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />)}
            {reads.map((read, index) => (
                <g key={index}>
                    <line x1={x(20)} x2={x(read.value)} y1={y(read.percent)} y2={y(read.percent)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
                    <line x1={x(read.value)} x2={x(read.value)} y1={y(read.percent)} y2={y(0)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
                    <circle cx={x(read.value)} cy={y(read.percent)} r={6} fill={SECOND} />
                    <F x={x(read.value) + 12} y={y(read.percent) - 12 - index * 4} size={19} color={SECOND} anchor="start">{read.label}</F>
                </g>
            ))}
            <Axis y={260} from={20} to={60} x={x} ticks={[20, 30, 40, 50, 60].map((value) => [value, String(value)])} />
            <Caption y={326}>{t(mode === 'build'
                ? say('Puntu bakoitza goiko muturrean: 40 urte baino gutxiago, % 40', 'Cada punto en el extremo superior: menos de 40 años, el 40 %', 'كل نقطة عند الطرف الأعلى: أقل من 40 سنة، 40٪', 'Each point at the upper end: under 40 years old, 40%')
                : mode === 'percentile'
                    ? say('Ehunekotik abiatu, poligonora joan eta jaitsi: horra pertzentila', 'Sal del porcentaje, ve al polígono y baja: ahí está el percentil', 'انطلق من النسبة واذهب إلى المضلّع ثم انزل: هناك المئين', 'Start at the percentage, go across to the polygon and down: there is the percentile')
                    : say('Balioa ezaguna da: igo poligonoraino eta irakurri ehunekoa', 'Se conoce el valor: sube al polígono y lee el porcentaje', 'القيمة معروفة: اصعد إلى المضلّع واقرأ النسبة', 'The value is known: go up to the polygon and read the percentage'))}</Caption>
        </Figure>
    )
}

/* ---------- Same mean, different spread ---------- */

export function CompareSpreadFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={316} label={t(say('Hiru barra-diagrama, batez besteko bera eta sakabanatze desberdina dutenak', 'Tres diagramas de barras con la misma media y distinta dispersión', 'ثلاثة مخططات أعمدة لها المتوسط نفسه وتشتت مختلف', 'Three bar charts with the same mean and different spread'))}>
            {SPREAD.map((chart, index) => {
                const left = 30 + index * 230
                const x = (value: number) => left + 20 + (value - 1) * 36
                return (
                    <g key={chart.name}>
                        <rect x={left} y={20} width={210} height={220} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.4} />
                        <F x={left + 24} y={50} size={21} color={STAGE} anchor="start">{chart.name}</F>
                        {chart.counts.map((count, position) => (
                            count > 0 ? <rect key={position} x={x(position + 1) - 13} y={190 - count * 26} width={26} height={count * 26} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} /> : null
                        ))}
                        <line x1={left + 12} x2={left + 198} y1={190} y2={190} stroke={INK} strokeWidth={1.6} />
                        {[1, 2, 3, 4, 5].map((value) => <F key={value} x={x(value)} y={212} size={16} weight={400}>{value}</F>)}
                        <line x1={x(3)} x2={x(3)} y1={56} y2={190} stroke={GREEN} strokeWidth={2} strokeDasharray="5 4" />
                        <F x={left + 105} y={268} size={19} color={SECOND}>σ ≈ {num(language, Math.round(Math.sqrt(chart.variance) * 100) / 100)}</F>
                    </g>
                )
            })}
            <Caption y={302}>{t(say('Muturretan pisu gehiago, σ handiagoa', 'Más peso en los extremos, mayor σ', 'ثقل أكبر في الطرفين، σ أكبر', 'More weight at the ends, larger σ'))}</Caption>
        </Figure>
    )
}

/* ---------- Four quarters of a population ---------- */

export function QuartileCountsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const marks = [450, 600, 750, 900, 1100]
    const x = (value: number) => 50 + (value - 450) * (620 / 650)
    const tints = [STAGE_TINT, GREEN_TINT, GREEN_TINT, STAGE_TINT]
    return (
        <Figure height={280} label={t(say('Kuartilek 400 etxebizitzak lau zati berdinetan banatzen dituzte, 100 etxebizitza zati bakoitzean', 'Los cuartiles parten los 400 pisos en cuatro partes iguales, 100 pisos en cada una', 'تقسم الربيعيات 400 شقة إلى أربعة أجزاء متساوية، 100 شقة في كل جزء', 'The quartiles split the 400 flats into four equal parts, 100 flats in each'))}>
            {marks.slice(0, 4).map((from, index) => (
                <g key={from}>
                    <rect x={x(from)} y={70} width={x(marks[index + 1]) - x(from)} height={70} fill={tints[index]} stroke={INK} strokeWidth={1.6} />
                    <F x={(x(from) + x(marks[index + 1])) / 2} y={112} size={22}>100</F>
                    <F x={(x(from) + x(marks[index + 1])) / 2} y={56} size={17} weight={400} color={MUTED}>{pct(language, 25)}</F>
                </g>
            ))}
            {['Q₁', 'Me', 'Q₃'].map((name, index) => (
                <g key={name}>
                    <line x1={x(marks[index + 1])} x2={x(marks[index + 1])} y1={64} y2={160} stroke={SECOND} strokeWidth={3} />
                    <F x={x(marks[index + 1])} y={186} size={19} color={SECOND}>{name}</F>
                    <F x={x(marks[index + 1])} y={212} size={18} weight={400}>{marks[index + 1]}</F>
                </g>
            ))}
            <Caption y={262}>{t(say('Ondoz ondoko bi kuartilen artean, beti 100 etxebizitza: tartea luzea edo motza izan', 'Entre dos cuartiles seguidos, siempre 100 pisos: sea largo o corto el tramo', 'بين ربيعيين متتاليين دائمًا 100 شقة: طال الجزء أو قصر', 'Between two consecutive quartiles, always 100 flats: long stretch or short'))}</Caption>
        </Figure>
    )
}

/* ---------- The faulty parts: count only what lies inside ---------- */

export function ShareBetweenFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 80 + (value - 40) * 28
    const y = (count: number) => 250 - count * 0.72
    const [low, high] = SHARE.accepted
    return (
        <Figure height={340} label={t(say('Piezen luzeren histograma, onargarrien tartea markatuta', 'Histograma de las longitudes de las piezas, con el tramo aceptable marcado', 'مدرّج أطوال القطع مع تحديد الجزء المقبول', 'Histogram of the lengths of the parts, with the acceptable stretch marked'))}>
            {SHARE.bars.map((bar) => (
                <rect key={bar.from} x={x(bar.from)} y={y(bar.count)} width={x(bar.to) - x(bar.from)} height={250 - y(bar.count)} fill={CORAL_TINT} stroke={SECOND} strokeWidth={1.6} />
            ))}
            {SHARE.bars.map((bar) => {
                const from = Math.max(bar.from, low)
                const to = Math.min(bar.to, high)
                if (to <= from) return null
                const inside = (bar.count * (to - from)) / (bar.to - bar.from)
                return (
                    <g key={`in-${bar.from}`}>
                        <rect x={x(from)} y={y(bar.count)} width={x(to) - x(from)} height={250 - y(bar.count)} fill={GREEN_TINT} stroke={GREEN} strokeWidth={2} />
                        <F x={(x(from) + x(to)) / 2} y={y(bar.count) - 10} size={18} color={GREEN}>{num(language, inside)}</F>
                    </g>
                )
            })}
            {[low, high].map((value) => <line key={value} x1={x(value)} x2={x(value)} y1={50} y2={250} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 5" />)}
            <Axis y={250} from={40} to={60} x={x} ticks={[40, 44, 48, 52, 56, 60].map((value) => [value, String(value)])} />
            {[low, high].map((value) => <F key={value} x={x(value)} y={302} size={19} color={GREEN}>{value}</F>)}
            <Caption y={330}>{t(say('Berdea onargarria da: muturretako tarteetatik, barruko zatia bakarrik', 'Lo verde es aceptable: de los intervalos de los extremos, solo la parte de dentro', 'الأخضر مقبول: ومن فئتي الطرفين الجزء الداخلي فقط', 'Green is acceptable: from the intervals at the ends, only the part inside'))}</Caption>
        </Figure>
    )
}

/* ---------- The band x̄ ± σ ---------- */

export function BandFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 80 + value * 14
    const y = (count: number) => 250 - count * 8
    const low = BAND.mean - BAND.sd
    const high = BAND.mean + BAND.sd
    return (
        <Figure height={340} label={t(say('Itxaron-minutuen histograma eta batez bestekoa ken eta gehi desbideratze tipikoa', 'Histograma de los minutos de espera y la banda de la media menos y más la desviación típica', 'مدرّج دقائق الانتظار والنطاق من المتوسط ناقص الانحراف المعياري إلى المتوسط زائده', 'Histogram of the waiting minutes and the band from the mean minus to the mean plus the standard deviation'))}>
            <rect x={x(low)} y={40} width={x(high) - x(low)} height={210} fill={GREEN_TINT} opacity={0.7} />
            {BAND.bars.map((bar) => (
                <rect key={bar.from} x={x(bar.from)} y={y(bar.count)} width={x(bar.to) - x(bar.from)} height={250 - y(bar.count)} fill="none" stroke={STAGE} strokeWidth={2} />
            ))}
            {BAND.bars.map((bar) => <F key={`f-${bar.from}`} x={(x(bar.from) + x(bar.to)) / 2} y={y(bar.count) - 10} size={18} color={STAGE}>{bar.count}</F>)}
            {[low, high].map((value) => <line key={value} x1={x(value)} x2={x(value)} y1={40} y2={250} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 5" />)}
            <line x1={x(BAND.mean)} x2={x(BAND.mean)} y1={40} y2={250} stroke={SECOND} strokeWidth={2.4} />
            <Axis y={250} from={0} to={40} x={x} ticks={[0, 10, 20, 30, 40].map((value) => [value, String(value)])} />
            <F x={x(low)} y={304} size={18} color={GREEN}>x̄ − σ = {low}</F>
            <F x={x(high)} y={304} size={18} color={GREEN}>x̄ + σ = {high}</F>
            <Caption y={332}>{t(say('Berdearen barruko datuak zenbatzen dira, muturretako tarteak zatituz', 'Se cuentan los datos de dentro del verde partiendo los intervalos de los extremos', 'نعدّ البيانات داخل الأخضر بتقسيم فئتي الطرفين', 'You count the data inside the green by splitting the intervals at the ends'))}</Caption>
        </Figure>
    )
}

/* ---------- The unit's cover ---------- */

export function SocialStatsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <rect x={28} y={86} width={30} height={40} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />
                    <rect x={58} y={50} width={30} height={76} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />
                    <rect x={88} y={70} width={60} height={56} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />
                    <rect x={148} y={110} width={60} height={16} fill="#f6dcd3" stroke="#c4432a" strokeWidth={1.6} />
                    <line x1={20} x2={212} y1={126} y2={126} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(286 36) rotate(4)">
                    <rect width={200} height={150} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <polyline points="24,126 64,112 104,70 144,36 176,26" fill="none" stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={24} x2={124} y1={52} y2={52} stroke="#c4432a" strokeWidth={2} strokeDasharray="5 4" />
                    <line x1={124} x2={124} y1={52} y2={126} stroke="#c4432a" strokeWidth={2} strokeDasharray="5 4" />
                    <circle cx={124} cy={52} r={5} fill="#c4432a" />
                </g>
                <g transform="translate(292 214) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">x̄ ± σ</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={113} y={58} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">Q₁ · Me · Q₃</text>
                    <text x={113} y={98} textAnchor="middle" fontSize={22} fontWeight={700} fill="#267b53" fontFamily="Fraunces, serif" direction="ltr">P₉₀</text>
                </g>
            </svg>
        </div>
    )
}
