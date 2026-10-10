import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula, Sub, Table, XBar } from '../dbh2-estatistika-v2/figures'
import { COLORS, INK, LINE, MUTED, num, PAPER, SECOND, STAGE, STAGE_TINT } from '../dbh2-estatistika-v2/palette'
import { carRows, classHeights, correlationClouds, glassesTable, gradesA, gradesB, heightIntervals, spellingRows, studyPairs, sunPairs } from './data'
import { boxPlot, correlation, regression, type Pair } from './stats'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — the new lesson
   figures: building intervals from the range, the mean of grouped data,
   percentiles on a cumulative bar, box and whiskers with an outlier,
   variance as squares, σ from a table, the coefficient of variation, a
   cloud of points, four correlations, a regression line, the union of two
   events, a tree without replacement and a contingency table. The sample
   and the histogram reuse the 2. DBH figures. Formulas are written left to
   right in every language; Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** A small axis with ticks and numbers */
function Ruler({ x, y, from, to, ticks, language }: { x: (value: number) => number; y: number; from: number; to: number; ticks: number[]; language: UnitLanguage }) {
    return (
        <g>
            <line x1={x(from)} x2={x(to)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 6} y2={y + 6} stroke={INK} strokeWidth={1.6} />
                    <text x={x(value)} y={y + 24} textAnchor="middle" fontSize={14} fill={INK}>{num(language, value)}</text>
                </g>
            ))}
        </g>
    )
}

/** Axes of a cloud of points with their numbers and names */
function Axes({ x, y, xs, ys, xName, yName, language }: { x: (value: number) => number; y: (value: number) => number; xs: number[]; ys: number[]; xName: LocalizedText; yName: LocalizedText; language: UnitLanguage }) {
    const [x0, x1] = [x(xs[0]), x(xs[xs.length - 1])]
    const [y0, y1] = [y(ys[0]), y(ys[ys.length - 1])]
    return (
        <g>
            {xs.map((value) => <line key={`gx${value}`} x1={x(value)} x2={x(value)} y1={y0} y2={y1} stroke={LINE} strokeWidth={1} />)}
            {ys.map((value) => <line key={`gy${value}`} x1={x0} x2={x1} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />)}
            <line x1={x0} x2={x1 + 10} y1={y0} y2={y0} stroke={INK} strokeWidth={2} />
            <line x1={x0} x2={x0} y1={y0} y2={y1 - 10} stroke={INK} strokeWidth={2} />
            {xs.map((value) => <text key={`nx${value}`} x={x(value)} y={y0 + 20} textAnchor="middle" fontSize={13} fill={MUTED}>{num(language, value)}</text>)}
            {ys.map((value) => <text key={`ny${value}`} x={x0 - 8} y={y(value) + 5} textAnchor="end" fontSize={13} fill={MUTED}>{num(language, value)}</text>)}
            <Label x={x1} y={y0 + 40} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>{pick(language, xName)}</Label>
            <Label x={x0 + 8} y={y1 - 16} fontSize={14} fontWeight={700} fill={INK}>{pick(language, yName)}</Label>
        </g>
    )
}

/** The decimal r written with the comma (point in Arabic) */
const rText = (language: UnitLanguage, r: number) => num(language, Math.round(r * 100) / 100).replace('-', '−')

/* ---------- Building intervals from the range ---------- */

export function IntervalsFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 60 + (value - 145) * 17.5
    const bounds = [...heightIntervals.map((row) => row.from), heightIntervals[heightIntervals.length - 1].to]
    return (
        <Figure height={260} label={pick(language, say('Ibiltartetik tarteetara', 'Del recorrido a los intervalos', 'من المدى إلى الفئات'))}>
            {heightIntervals.map((row, index) => (
                <g key={index}>
                    <rect x={x(row.from) + 2} y={80} width={x(row.to) - x(row.from) - 4} height={36} rx={7} fill={COLORS[index % COLORS.length]} fillOpacity={0.18} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
                    <text x={(x(row.from) + x(row.to)) / 2} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{(row.from + row.to) / 2}</text>
                    <text x={(x(row.from) + x(row.to)) / 2} y={66} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>f = {row.count}</text>
                </g>
            ))}
            <Ruler x={x} y={140} from={145} to={180} ticks={[150, 160, 170, 180]} language={language} />
            {bounds.map((value) => <line key={value} x1={x(value)} x2={x(value)} y1={76} y2={146} stroke={INK} strokeWidth={1.2} strokeDasharray="3 3" />)}
            {[148, 177].map((value) => (
                <g key={value}>
                    <polygon points={`${x(value)},${152} ${x(value) - 7},${166} ${x(value) + 7},${166}`} fill={SECOND} />
                    <text x={x(value)} y={190} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{value}</text>
                </g>
            ))}
            <Formula x={360} y={220} color={STAGE}>r = 177 − 148 = 29 → r′ = 30 → 30 : 6 = 5</Formula>
            <Caption y={250} language={language} text={say('Lehen tartea txikiena baino 0,5 lehenago: ez da daturik muga batean geratzen', 'El primer intervalo empieza 0,5 antes del menor: ningún dato cae en un borde', 'تبدأ الفئة الأولى قبل الأصغر بـ0.5: لا يقع أي بيان على حدّ')} size={14} />
        </Figure>
    )
}

/* ---------- Mean, median and mode of grouped data ---------- */

export function GroupedMeanFigure({ language }: { language: UnitLanguage }) {
    const rows = heightIntervals.map((row) => {
        const mark = (row.from + row.to) / 2
        return [`${num(language, row.from)}–${num(language, row.to)}`, mark, row.count, mark * row.count]
    })
    return (
        <Figure height={290} label={pick(language, say('Datu multzokatuen batez bestekoa', 'La media de datos agrupados', 'متوسط البيانات المبوّبة'))}>
            <Table
                x0={20}
                y0={30}
                columns={[150, 80, 70, 110]}
                headers={[pick(language, say('tartea', 'intervalo', 'الفئة')), <Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <tspan key="xf">x<tspan fontSize="0.7em" dy="0.3em">i</tspan><tspan dy="-0.3em"> · f</tspan><tspan fontSize="0.7em" dy="0.3em">i</tspan></tspan>]}
                rows={rows}
                rowHeight={27}
                highlight={3}
                language={language}
            />
            <rect x={22} y={30 + 10 + 27 * 3 + 6} width={406} height={25} rx={6} fill="none" stroke={SECOND} strokeWidth={2} />
            <line x1={20} x2={430} y1={212} y2={212} stroke={INK} strokeWidth={1.4} />
            <Formula x={285} y={236}>40</Formula>
            <Formula x={375} y={236} color={STAGE}>6540</Formula>
            <rect x={460} y={60} width={240} height={130} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={580} y={98} size={18}><XBar /> = 6540 : 40</Formula>
            <Formula x={580} y={132} size={21} color={STAGE}><XBar /> = {num(language, 163.5)} cm</Formula>
            <Formula x={580} y={168} size={17} color={SECOND}>Me = Mo ≈ 165</Formula>
            <Caption y={276} language={language} text={say('Klase-marka tarteko datu guztien ordezkaria da · gorriz, 20. datuaren tartea', 'La marca de clase representa a todos los datos del intervalo · en rojo, el intervalo del dato 20.º', 'مركز الفئة يمثّل كل بياناتها · بالأحمر فئة البيان العشرين')} size={14} />
        </Figure>
    )
}

/* ---------- Percentiles on the cumulative percentages ---------- */

export function PercentilesFigure({ language }: { language: UnitLanguage }) {
    const n = carRows.reduce((sum, row) => sum + row.count, 0)
    const cumulative = carRows.map((_, index) => carRows.slice(0, index + 1).reduce((sum, row) => sum + row.count, 0))
    const rows = carRows.map((row, index) => [row.value, row.count, cumulative[index], (cumulative[index] / n) * 100])
    const bar = (percent: number) => 360 + percent * 3.3
    const marks: Array<[number, string]> = [[25, 'Q₁'], [50, 'Me'], [75, 'Q₃'], [90, 'p₉₀']]
    return (
        <Figure height={260} label={pick(language, say('Pertzentilak ehuneko metatuetatik', 'Percentiles desde los porcentajes acumulados', 'المئينات من النسب المتجمّعة'))}>
            <Table
                x0={20}
                y0={34}
                columns={[70, 70, 70, 100]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <Sub key="F" letter="F" index="i" />, pick(language, say('% met.', '% acum.', '% متجمّع'))]}
                rows={rows}
                highlight={3}
                language={language}
            />
            {carRows.map((row, index) => {
                const start = index === 0 ? 0 : (cumulative[index - 1] / n) * 100
                const end = (cumulative[index] / n) * 100
                return (
                    <g key={index}>
                        <rect x={bar(start)} y={80} width={bar(end) - bar(start)} height={40} fill={COLORS[index]} fillOpacity={0.3} stroke={INK} strokeWidth={1.6} />
                        <text x={(bar(start) + bar(end)) / 2} y={106} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{row.value}</text>
                        <text x={bar(end)} y={70} textAnchor="middle" fontSize={12} fill={MUTED}>{num(language, end)}</text>
                    </g>
                )
            })}
            {marks.map(([percent, name]) => (
                <g key={name}>
                    <line x1={bar(percent)} x2={bar(percent)} y1={76} y2={142} stroke={SECOND} strokeWidth={2.4} />
                    <text x={bar(percent)} y={160} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{name}</text>
                </g>
            ))}
            <Formula x={525} y={196} color={STAGE} size={16}>Q₁ = 1 · Me = 1 · Q₃ = 2 · p₉₀ = 3</Formula>
            <Caption y={244} language={language} text={say('pₖ: ehuneko metatuak lehen aldiz k gainditzen duen balioa', 'pₖ: el primer valor cuyo % acumulado supera k', 'pₖ: أول قيمة تتجاوز نسبتها المتجمّعة k')} />
        </Figure>
    )
}

/* ---------- Box and whiskers with an outlier ---------- */

export function WhiskersFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 50 + (value - 145) * 11.5
    const box = boxPlot(classHeights)
    const mid = 110
    return (
        <Figure height={280} label={pick(language, say('Kutxa eta biboteak, datu atipiko batekin', 'Caja y bigotes con un dato atípico', 'الصندوق والشاربان مع بيان شاذ'))}>
            {[box.low, box.high].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={44} y2={170} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                    <text x={x(value)} y={36} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{value}</text>
                </g>
            ))}
            <line x1={x(box.min)} x2={x(box.q1)} y1={mid} y2={mid} stroke={INK} strokeWidth={2.4} />
            <line x1={x(box.q3)} x2={x(box.max)} y1={mid} y2={mid} stroke={INK} strokeWidth={2.4} />
            {[box.min, box.max].map((value) => <line key={value} x1={x(value)} x2={x(value)} y1={mid - 14} y2={mid + 14} stroke={INK} strokeWidth={2.4} />)}
            <rect x={x(box.q1)} y={mid - 28} width={x(box.q3) - x(box.q1)} height={56} fill={STAGE} fillOpacity={0.28} stroke={INK} strokeWidth={2.4} />
            <line x1={x(box.median)} x2={x(box.median)} y1={mid - 28} y2={mid + 28} stroke={SECOND} strokeWidth={3.4} />
            {box.outliers.map((value) => <text key={value} x={x(value)} y={mid + 9} textAnchor="middle" fontSize={26} fontWeight={700} fill={SECOND}>*</text>)}
            {[[box.q1, 'Q₁'], [box.median, 'Me'], [box.q3, 'Q₃']].map(([value, name]) => (
                <text key={name} x={x(value as number)} y={mid - 36} textAnchor="middle" fontSize={14} fontWeight={700} fill={name === 'Me' ? SECOND : INK}>{name}</text>
            ))}
            <Ruler x={x} y={180} from={145} to={200} ticks={[150, 160, 170, 180, 190, 200]} language={language} />
            <Formula x={360} y={234} color={STAGE} size={16}>Q₃ − Q₁ = 181 − 171 = 10 → {num(language, 1.5)} · 10 = 15</Formula>
            <Caption y={266} language={language} text={say('Biboteak 156 eta 196 artean geratzen dira; 150 kanpoan dago: datu atipikoa (*)', 'Los bigotes no pasan de 156 y 196; el 150 queda fuera: dato atípico (*)', 'لا يتجاوز الشاربان 156 و196؛ العدد 150 خارجهما: بيان شاذ (*)')} size={14} />
        </Figure>
    )
}

/* ---------- Variance as squares ---------- */

export function VarianceFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 60 + (value - 3) * 46
    const strip = (data: number[], y0: number, name: string, color: string) => {
        const stacks = new Map<number, number>()
        return (
            <g>
                <text x={20} y={y0 + 5} fontSize={18} fontWeight={700} fill={color}>{name}</text>
                <line x1={x(3)} x2={x(11)} y1={y0} y2={y0} stroke={INK} strokeWidth={2} />
                {[3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => <text key={value} x={x(value)} y={y0 + 20} textAnchor="middle" fontSize={12} fill={MUTED}>{value}</text>)}
                <line x1={x(7)} x2={x(7)} y1={y0 - 80} y2={y0 + 6} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 4" />
                {data.map((value, index) => {
                    const side = Math.abs(value - 7) * 14
                    const level = stacks.get(value) ?? 0
                    stacks.set(value, level + 1)
                    return (
                        <g key={index}>
                            {side > 0 && <rect x={x(value) - side / 2} y={y0 - 12 - side} width={side} height={side} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.6} />}
                            <circle cx={x(value)} cy={y0 - 6 - level * 14} r={6} fill={color} stroke={INK} strokeWidth={1.2} />
                        </g>
                    )
                })}
            </g>
        )
    }
    return (
        <Figure height={290} label={pick(language, say('Bariantza: desbideratzeen karratuak', 'Varianza: los cuadrados de las desviaciones', 'التباين: مربعات الانحرافات'))}>
            {strip(gradesA, 110, 'A', STAGE)}
            {strip(gradesB, 220, 'B', COLORS[3])}
            <text x={x(7)} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}><XBar /> = 7</text>
            <Formula x={470} y={70} anchor="start" size={16} color={STAGE}>σ² = (9 + 1 + 0 + 1 + 9) : 5 = 4</Formula>
            <Formula x={470} y={98} anchor="start" size={18} color={STAGE}>σ = 2</Formula>
            <Formula x={470} y={180} anchor="start" size={16} color={COLORS[3]}>σ² = (1 + 0 + 0 + 0 + 1) : 5 = {num(language, 0.4)}</Formula>
            <Formula x={470} y={208} anchor="start" size={18} color={COLORS[3]}>σ ≈ {num(language, 0.63)}</Formula>
            <Caption y={276} language={language} text={say('Batez besteko bera; karratu txikiagoak = datu bilduagoak', 'La misma media; cuadrados más pequeños = datos más agrupados', 'المتوسط نفسه؛ مربعات أصغر = بيانات أكثر تجمّعًا')} />
        </Figure>
    )
}

/* ---------- Standard deviation from a table ---------- */

export function TableDeviationFigure({ language }: { language: UnitLanguage }) {
    const rows = spellingRows.map((row) => [row.value, row.count, row.value * row.count, row.count * row.value ** 2])
    return (
        <Figure height={300} label={pick(language, say('Desbideratze tipikoa taula batetik', 'Desviación típica desde una tabla', 'الانحراف المعياري من جدول'))}>
            <Table
                x0={20}
                y0={30}
                columns={[80, 80, 110, 120]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <tspan key="fx">f<tspan fontSize="0.7em" dy="0.3em">i</tspan><tspan dy="-0.3em"> · x</tspan><tspan fontSize="0.7em" dy="0.3em">i</tspan></tspan>, <tspan key="fx2">f<tspan fontSize="0.7em" dy="0.3em">i</tspan><tspan dy="-0.3em"> · x</tspan><tspan fontSize="0.7em" dy="0.3em">i</tspan><tspan dy="-0.6em" fontSize="0.7em">2</tspan></tspan>]}
                rows={rows}
                rowHeight={27}
                highlight={3}
                language={language}
            />
            <line x1={20} x2={410} y1={212} y2={212} stroke={INK} strokeWidth={1.4} />
            <Formula x={140} y={236}>40</Formula>
            <Formula x={235} y={236}>68</Formula>
            <Formula x={350} y={236} color={STAGE}>214</Formula>
            <rect x={440} y={50} width={260} height={160} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={570} y={86} size={17}><XBar /> = 68 : 40 = {num(language, 1.7)}</Formula>
            <Formula x={570} y={124} size={16}>σ² = 214 : 40 − {num(language, 1.7)}²</Formula>
            <Formula x={570} y={154} size={17} color={STAGE}>σ² = {num(language, 2.46)}</Formula>
            <Formula x={570} y={190} size={19} color={SECOND}>σ ≈ {num(language, 1.57)}</Formula>
            <Caption y={284} language={language} text={say('Bi zutabe berri: fᵢ·xᵢ eta fᵢ·xᵢ²; gero bariantza = karratuen batez bestekoa − batez bestekoaren karratua', 'Dos columnas nuevas: fᵢ·xᵢ y fᵢ·xᵢ²; varianza = media de los cuadrados − cuadrado de la media', 'عمودان جديدان: fᵢ·xᵢ وfᵢ·xᵢ²؛ التباين = متوسط المربعات − مربع المتوسط')} size={13} />
        </Figure>
    )
}

/* ---------- Coefficient of variation ---------- */

export function VariationFigure({ language }: { language: UnitLanguage }) {
    const firms = [
        { name: 'A', mean: '100 000 €', sigma: '12 500 €', share: 0.125, cv: '12,5' },
        { name: 'B', mean: '15 000 €', sigma: '2 500 €', share: 2500 / 15000, cv: '16,7' }
    ]
    const left = 120
    const width = 320
    return (
        <Figure height={280} label={pick(language, say('Aldakuntza-koefizientea: sakabanaketa erlatiboa', 'Coeficiente de variación: dispersión relativa', 'معامل الاختلاف: التشتت النسبي'))}>
            {firms.map((firm, index) => {
                const y0 = 50 + index * 90
                const band = firm.share * width
                return (
                    <g key={firm.name}>
                        <text x={40} y={y0 + 26} fontSize={22} fontWeight={700} fill={COLORS[index]}>{firm.name}</text>
                        <rect x={left} y={y0} width={width} height={36} rx={6} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <rect x={left + width - band} y={y0 - 6} width={band * 2} height={48} rx={6} fill={COLORS[index]} fillOpacity={0.3} stroke={COLORS[index]} strokeWidth={2} />
                        <line x1={left + width} x2={left + width} y1={y0 - 10} y2={y0 + 46} stroke={INK} strokeWidth={2.4} />
                        <text x={left + width / 2 - 20} y={y0 + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr"><XBar /> = {firm.mean}</text>
                        <text x={left + width} y={y0 + 66} textAnchor="middle" fontSize={14} fontWeight={700} fill={COLORS[index]} direction="ltr">± σ = {firm.sigma}</text>
                        <Formula x={530} y={y0 + 26} anchor="start" size={18} color={COLORS[index]}>CV ≈ {num(language, firm.cv)} %</Formula>
                    </g>
                )
            })}
            <Formula x={360} y={240} color={STAGE} size={16}>CV = σ : <XBar /></Formula>
            <Caption y={268} language={language} text={say('Bi barrak batez besteko berera eskalatuta: B-ren banda zabalagoa da', 'Las dos barras escaladas a la misma media: la banda de B es más ancha', 'العمودان بمقياس المتوسط نفسه: نطاق B أعرض')} />
        </Figure>
    )
}

/* ---------- A cloud of points ---------- */

export function ScatterFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 90 + value * 52
    const y = (value: number) => 230 - value * 19
    const r = correlation(studyPairs)
    return (
        <Figure height={300} label={pick(language, say('Puntu-hodeia: ikasketa-orduak eta nota', 'Nube de puntos: horas de estudio y nota', 'سحابة النقاط: ساعات الدراسة والعلامة'))}>
            <Axes x={x} y={y} xs={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} ys={[0, 2, 4, 6, 8, 10]} xName={say('orduak', 'horas', 'الساعات')} yName={say('nota', 'nota', 'العلامة')} language={language} />
            {studyPairs.map(([hours, grade], index) => <circle key={index} cx={x(hours)} cy={y(grade)} r={7} fill={STAGE} fillOpacity={0.75} stroke={INK} strokeWidth={1.4} />)}
            <Formula x={200} y={64} size={17} color={SECOND}>(5, 8)</Formula>
            <line x1={x(5) - 9} y1={y(8) - 3} x2={232} y2={62} stroke={SECOND} strokeWidth={1.4} />
            <Formula x={640} y={150} size={18} color={STAGE}>r ≈ {rText(language, r)}</Formula>
            <Caption y={290} language={language} text={say('Ikasle bakoitza puntu bat da (x, y) · ordu gehiago, nota hobea', 'Cada alumno es un punto (x, y) · más horas, mejor nota', 'كل تلميذ نقطة (x, y) · ساعات أكثر، علامة أفضل')} />
        </Figure>
    )
}

/* ---------- Four correlations ---------- */

export function CorrelationFigure({ language }: { language: UnitLanguage }) {
    const names = [
        say('Positiboa, sendoa', 'Positiva fuerte', 'موجب قوي'),
        say('Negatiboa, sendoa', 'Negativa fuerte', 'سالب قوي'),
        say('Ahula', 'Débil', 'ضعيف'),
        say('Ia nulua', 'Casi nula', 'شبه منعدم')
    ]
    return (
        <Figure height={250} label={pick(language, say('Lau korrelazio', 'Cuatro correlaciones', 'أربعة ارتباطات'))}>
            {correlationClouds.map((cloud, index) => {
                const x0 = 18 + index * 176
                const x = (value: number) => x0 + 12 + value * 15
                const y = (value: number) => 180 - value * 14
                return (
                    <g key={index}>
                        <rect x={x0} y={22} width={164} height={170} rx={12} fill="none" stroke={INK} strokeWidth={1.6} />
                        <line x1={x(0)} x2={x(10)} y1={y(0)} y2={y(0)} stroke={MUTED} strokeWidth={1.4} />
                        <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(10.5)} stroke={MUTED} strokeWidth={1.4} />
                        {cloud.map(([a, b], point) => <circle key={point} cx={x(a)} cy={y(b)} r={4.5} fill={COLORS[index]} stroke={INK} strokeWidth={1} />)}
                        <Label x={x0 + 82} y={212} textAnchor="middle" fontSize={14} fontWeight={700} fill={COLORS[index]}>{pick(language, names[index])}</Label>
                        <text x={x0 + 82} y={236} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">r ≈ {rText(language, correlation(cloud as Pair[]))}</text>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- Regression line and estimates ---------- */

export function RegressionFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 80 + value * 34
    const y = (value: number) => 220 - (value - 6) * 17
    const line = regression(sunPairs)
    const at = (value: number) => line.slope * value + line.intercept
    return (
        <Figure height={300} label={pick(language, say('Erregresio-zuzena eta estimazioak', 'Recta de regresión y estimaciones', 'مستقيم الانحدار والتقديرات'))}>
            <rect x={x(10.5)} y={y(16)} width={x(14) - x(10.5)} height={y(6) - y(16)} fill={SECOND} fillOpacity={0.08} />
            <Label x={x(12.25)} y={y(15.3)} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{pick(language, say('fidagarritasun txikia', 'poco fiable', 'موثوقية ضعيفة'))}</Label>
            <Axes x={x} y={y} xs={[0, 2, 4, 6, 8, 10, 12, 14]} ys={[6, 8, 10, 12, 14, 16]} xName={say('eguzki-orduak', 'horas de sol', 'ساعات الشمس')} yName={say('T (°C)', 'T (°C)', 'T (°C)')} language={language} />
            <line x1={x(0)} y1={y(at(0))} x2={x(14)} y2={y(at(14))} stroke={SECOND} strokeWidth={2.6} />
            {sunPairs.map(([hours, temperature], index) => <circle key={index} cx={x(hours)} cy={y(temperature)} r={6.5} fill={STAGE} fillOpacity={0.75} stroke={INK} strokeWidth={1.4} />)}
            <line x1={x(7)} x2={x(7)} y1={y(6)} y2={y(at(7))} stroke={COLORS[3]} strokeWidth={2} strokeDasharray="5 4" />
            <line x1={x(0)} x2={x(7)} y1={y(at(7))} y2={y(at(7))} stroke={COLORS[3]} strokeWidth={2} strokeDasharray="5 4" />
            <circle cx={x(7)} cy={y(at(7))} r={6} fill={COLORS[3]} stroke={INK} strokeWidth={1.4} />
            <Formula x={x(0.4)} y={y(15.4)} anchor="start" size={17} color={SECOND}>ŷ = {num(language, line.slope)}x + {num(language, line.intercept)}</Formula>
            <Formula x={x(0.4)} y={y(13.9)} anchor="start" size={16} color={COLORS[3]}>ŷ(7) = {num(language, at(7))}</Formula>
            <Caption y={290} language={language} text={say('Datuen tartean (0–10 h) estimazioa fidagarria da; kanpoan, ez', 'Dentro del intervalo de datos (0–10 h) la estimación es fiable; fuera, no', 'داخل مجال البيانات (0–10 h) التقدير موثوق؛ وخارجه لا')} />
        </Figure>
    )
}

/* ---------- Union of two events ---------- */

export function UnionFigure({ language }: { language: UnitLanguage }) {
    const faces: Array<[number, number, number]> = [[1, 84, 146], [2, 190, 104], [4, 255, 104], [6, 385, 104], [3, 500, 104], [5, 636, 146]]
    return (
        <Figure height={250} label={pick(language, say('Bi gertaeren bildura', 'Unión de dos sucesos', 'اتحاد حدثين'))}>
            <rect x={40} y={30} width={640} height={150} rx={18} fill="none" stroke={INK} strokeWidth={2} />
            <text x={58} y={58} fontSize={17} fontWeight={700} fill={INK}>E</text>
            <ellipse cx={290} cy={104} rx={150} ry={58} fill={STAGE} fillOpacity={0.14} stroke={STAGE} strokeWidth={2.4} />
            <ellipse cx={450} cy={104} rx={120} ry={58} fill={SECOND} fillOpacity={0.14} stroke={SECOND} strokeWidth={2.4} />
            <Label x={230} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, say('A: bikoitia', 'A: par', 'A: زوجي'))}</Label>
            <Label x={490} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('B: 3ren multiploa', 'B: múltiplo de 3', 'B: مضاعف 3'))}</Label>
            {faces.map(([face, cx, cy]) => (
                <g key={face}>
                    <rect x={cx - 17} y={cy - 17} width={34} height={34} rx={7} fill={PAPER} stroke={INK} strokeWidth={1.8} />
                    <text x={cx} y={cy + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{face}</text>
                </g>
            ))}
            <Formula x={360} y={212} color={STAGE} size={16}>P(A ∪ B) = 3/6 + 2/6 − 1/6 = 4/6 = 2/3</Formula>
            <Caption y={240} language={language} text={say('6 bi gertaeretan dago: behin bakarrik zenbatu behar da', 'El 6 está en los dos sucesos: hay que contarlo una sola vez', 'العدد 6 في الحدثين: يجب عدّه مرة واحدة')} />
        </Figure>
    )
}

/* ---------- Tree without replacement ---------- */

export function CardsTreeFigure({ language }: { language: UnitLanguage }) {
    const other = pick(language, say('ez ♠', 'no ♠', 'ليس ♠'))
    const leaves: Array<{ y: number; first: string; second: string; n: number; d: number; product: string; win?: boolean }> = [
        { y: 40, first: '♠', second: '♠', n: 9, d: 39, product: '90/1560 = 3/52', win: true },
        { y: 100, first: '♠', second: other, n: 30, d: 39, product: '300/1560' },
        { y: 160, first: other, second: '♠', n: 10, d: 39, product: '300/1560' },
        { y: 220, first: other, second: other, n: 29, d: 39, product: '870/1560' }
    ]
    const firsts = [{ y: 70, name: '♠', n: 10 }, { y: 190, name: other, n: 30 }]
    const node = (cx: number, cy: number, text: string, win?: boolean) => (
        <g>
            <rect x={cx - Math.max(26, text.length * 6 + 10)} y={cy - 15} width={2 * Math.max(26, text.length * 6 + 10)} height={30} rx={8} fill={win ? SECOND : STAGE_TINT} fillOpacity={win ? 0.85 : 1} stroke={INK} strokeWidth={1.4} />
            <Label x={cx} y={cy + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={win ? PAPER : INK}>{text}</Label>
        </g>
    )
    return (
        <Figure height={290} label={pick(language, say('Zuhaitz-diagrama itzuli gabe', 'Diagrama de árbol sin devolución', 'مخطط شجري دون إرجاع'))}>
            <circle cx={50} cy={130} r={6} fill={INK} />
            {firsts.map((first, index) => (
                <g key={index}>
                    <line x1={56} y1={130} x2={194} y2={first.y} stroke={index === 0 ? SECOND : INK} strokeWidth={index === 0 ? 3 : 1.6} />
                    <Frac x={118} y={(130 + first.y) / 2 + (index === 0 ? -16 : 16)} n={first.n} d={40} size={14} color={index === 0 ? SECOND : INK} />
                    {node(220, first.y, first.name, index === 0)}
                </g>
            ))}
            {leaves.map((leaf, index) => {
                const parent = firsts[index < 2 ? 0 : 1]
                return (
                    <g key={index}>
                        <line x1={246} y1={parent.y} x2={384} y2={leaf.y} stroke={leaf.win ? SECOND : INK} strokeWidth={leaf.win ? 3 : 1.6} />
                        <Frac x={318} y={(parent.y + leaf.y) / 2 + (leaf.y < parent.y ? -14 : 14)} n={leaf.n} d={leaf.d} size={14} color={leaf.win ? SECOND : INK} />
                        {node(410, leaf.y, leaf.second, leaf.win)}
                        <text x={460} y={leaf.y + 6} fontSize={15} fontWeight={leaf.win ? 700 : 400} fill={leaf.win ? SECOND : MUTED} direction="ltr">{leaf.product}</text>
                    </g>
                )
            })}
            <Formula x={360} y={272} color={SECOND} size={16}>P(♠ ♠) = 10/40 · 9/39 = 3/52</Formula>
        </Figure>
    )
}

/* ---------- Contingency table ---------- */

export function ContingencyFigure({ language }: { language: UnitLanguage }) {
    const [[a, b], [c, d]] = glassesTable
    const columns = [say('Mutilak', 'Chicos', 'الأولاد'), say('Neskak', 'Chicas', 'البنات'), say('Guztira', 'Total', 'المجموع')]
    const rows = [
        { name: say('Betaurrekoekin', 'Con gafas', 'بنظارات'), values: [a, b, a + b] },
        { name: say('Betaurrekorik gabe', 'Sin gafas', 'بلا نظارات'), values: [c, d, c + d] },
        { name: say('Guztira', 'Total', 'المجموع'), values: [a + c, b + d, a + b + c + d] }
    ]
    const colX = [380, 500, 620]
    return (
        <Figure height={260} label={pick(language, say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق'))}>
            <rect x={470} y={26} width={60} height={160} rx={8} fill={STAGE_TINT} />
            <rect x={470} y={64} width={60} height={36} rx={8} fill={SECOND} fillOpacity={0.25} stroke={SECOND} strokeWidth={2} />
            {columns.map((column, index) => (
                <Label key={index} x={colX[index]} y={48} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, column)}</Label>
            ))}
            <line x1={60} x2={680} y1={60} y2={60} stroke={INK} strokeWidth={2} />
            <line x1={310} x2={310} y1={26} y2={186} stroke={INK} strokeWidth={2} />
            <line x1={60} x2={680} y1={146} y2={146} stroke={INK} strokeWidth={1.4} />
            <line x1={560} x2={560} y1={26} y2={186} stroke={INK} strokeWidth={1.4} />
            {rows.map((row, rowIndex) => (
                <g key={rowIndex}>
                    <Label x={80} y={88 + rowIndex * 42} fontSize={16} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    {row.values.map((value, index) => (
                        <text key={index} x={colX[index]} y={88 + rowIndex * 42} textAnchor="middle" fontSize={17} fontWeight={rowIndex === 2 || index === 2 ? 700 : 400} fill={INK}>{value}</text>
                    ))}
                </g>
            ))}
            <Label x={200} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('P(betaurrekoak) = 300/1000 = 0,3', 'P(gafas) = 300/1000 = 0,3', 'احتمال النظارات = 300/1000 = 0.3'))}</Label>
            <Label x={520} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('P(betaurrekoak / neska) = 113/400', 'P(gafas / chica) = 113/400', 'احتمال النظارات علمًا أنها بنت = 113/400'))}</Label>
            <Caption y={250} language={language} text={say('Neska dela jakinda, kasu posibleak 400 neskak dira', 'Sabiendo que es chica, los casos posibles son las 400 chicas', 'علمًا أنها بنت، فالحالات الممكنة هي البنات الأربعمئة')} size={14} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

function Card({ x, y, rotate, width, height, fill, children }: { x: number; y: number; rotate: number; width: number; height: number; fill: string; children: ReactNode }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
            <rect width={width} height={height} rx={16} fill={fill} stroke={INK} strokeWidth={2} />
            {children}
        </g>
    )
}

export function StatisticsHeroArt() {
    const cloud: Pair[] = [[20, 140], [44, 128], [60, 120], [78, 104], [96, 100], [112, 80], [130, 74], [150, 58], [170, 44]]
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <Card x={36} y={40} rotate={-4} width={220} height={180} fill={PAPER}>
                    <line x1={18} x2={204} y1={160} y2={160} stroke={INK} strokeWidth={2} />
                    <line x1={18} x2={18} y1={160} y2={20} stroke={INK} strokeWidth={2} />
                    <line x1={22} x2={200} y1={150} y2={36} stroke="#d9502e" strokeWidth={3} />
                    {cloud.map(([cx, cy], index) => <circle key={index} cx={cx + 14} cy={cy} r={6} fill="#2f6fdb" fillOpacity={0.7} stroke={INK} strokeWidth={1.2} />)}
                </Card>
                <Card x={292} y={36} rotate={4} width={196} height={110} fill="#fbebc0">
                    <line x1={20} x2={176} y1={56} y2={56} stroke={INK} strokeWidth={2.4} />
                    <line x1={50} x2={50} y1={44} y2={68} stroke={INK} strokeWidth={2.4} />
                    <line x1={160} x2={160} y1={44} y2={68} stroke={INK} strokeWidth={2.4} />
                    <rect x={80} y={36} width={56} height={40} fill="#dde7f7" stroke={INK} strokeWidth={2.2} />
                    <line x1={104} x2={104} y1={36} y2={76} stroke="#d9502e" strokeWidth={3} />
                    <text x={22} y={64} fontSize={22} fontWeight={700} fill="#d9502e">*</text>
                </Card>
                <Card x={300} y={176} rotate={-3} width={180} height={92} fill="#e8e0f7">
                    <text x={90} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">σ · CV · r</text>
                </Card>
                <Card x={40} y={290} rotate={0} width={440} height={84} fill="#d6eddf">
                    <circle cx={40} cy={42} r={6} fill={INK} />
                    {[-1, 1].map((side) => (
                        <g key={side}>
                            <line x1={46} y1={42} x2={120} y2={42 + side * 22} stroke={INK} strokeWidth={2} />
                            <circle cx={132} cy={42 + side * 22} r={12} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                            {[-1, 1].map((leaf) => (
                                <g key={leaf}>
                                    <line x1={144} y1={42 + side * 22} x2={214} y2={42 + side * 22 + leaf * 10} stroke={INK} strokeWidth={1.6} />
                                    <circle cx={224} cy={42 + side * 22 + leaf * 10} r={8} fill="#dde7f7" stroke={INK} strokeWidth={1.4} />
                                </g>
                            ))}
                        </g>
                    ))}
                    <text x={330} y={54} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">P(A ∪ B)</text>
                </Card>
            </svg>
        </div>
    )
}
