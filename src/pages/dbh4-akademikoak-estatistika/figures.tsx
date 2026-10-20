import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula, Sub, Table, XBar } from '../dbh2-estatistika-v2/figures'
import { COLORS, INK, MUTED, num, PAPER, SECOND, STAGE } from '../dbh2-estatistika-v2/palette'
import { classGroups, goalRows, schoolSample, schoolStrata, schoolTotal, sportHours } from './data'
import { boxPlot } from '../dbh4-aplikatuak-estatistika/stats'
import { allocate, joinedMean } from './stats'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — the new lesson figures: a stratified
   sample with proportional allocation, the full frequency table of the
   goals, the mean of two joined classes as a balance, the quartiles by
   position and σ of the goals table. The other lessons reuse the 2. DBH
   and 4. DBH aplikatuak figures. Formulas are written left to right in
   every language; Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const round2 = (value: number) => Math.round(value * 100) / 100

/** fᵢ · xᵢ written with small subscripts */
function Product({ square = false }: { square?: boolean }) {
    return (
        <tspan>
            f<tspan fontSize="0.7em" dy="0.3em">i</tspan>
            <tspan dy="-0.3em"> · x</tspan>
            <tspan fontSize="0.7em" dy="0.3em">i</tspan>
            {square && <tspan dy="-0.6em" fontSize="0.7em">2</tspan>}
        </tspan>
    )
}

/* ---------- Stratified sample with proportional allocation ---------- */

const COURSES = [say('1. DBH', '1.º ESO', 'الأول'), say('2. DBH', '2.º ESO', 'الثاني'), say('3. DBH', '3.º ESO', 'الثالث'), say('4. DBH', '4.º ESO', 'الرابع')]

export function SamplingFigure({ language }: { language: UnitLanguage }) {
    const shares = allocate(schoolStrata.map((row) => row.students), schoolSample)
    return (
        <Figure height={290} label={pick(language, say('Geruzakako laginketa', 'Muestreo estratificado', 'المعاينة الطبقية'))}>
            <Formula x={236} y={28} color={MUTED} size={15}>
                <Sub letter="N" index="i" />
            </Formula>
            <Formula x={560} y={28} color={MUTED} size={15}>
                <Sub letter="n" index="i" />
            </Formula>
            {schoolStrata.map((row, index) => {
                const y = 58 + index * 46
                const width = row.students * 1.4
                return (
                    <g key={row.course}>
                        <Label x={20} y={y + 6} fontSize={15} fontWeight={700} fill={COLORS[index]}>{pick(language, COURSES[index])}</Label>
                        <rect x={110} y={y - 15} width={width} height={30} rx={7} fill={COLORS[index]} fillOpacity={0.18} stroke={COLORS[index]} strokeWidth={2} />
                        <text x={110 + width - 10} y={y + 6} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>{row.students}</text>
                        <line x1={380} x2={420} y1={y} y2={y} stroke={INK} strokeWidth={1.6} />
                        <polygon points={`${428},${y} ${418},${y - 5} ${418},${y + 5}`} fill={INK} />
                        <Formula x={440} y={y + 6} anchor="start" size={16}>
                            60 · {row.students} : 600 = <tspan fill={STAGE}>{shares[index]}</tspan>
                        </Formula>
                    </g>
                )
            })}
            <line x1={430} x2={690} y1={232} y2={232} stroke={INK} strokeWidth={1.2} />
            <Formula x={560} y={254} color={STAGE}>18 + 15 + 14 + 13 = {schoolSample}</Formula>
            <Formula x={200} y={254} color={MUTED} size={15}>N = {schoolTotal} · n = {schoolSample}</Formula>
            <Caption y={282} language={language} text={say('Ikasturte bakoitzak bere tamainaren araberako zatia jartzen du', 'Cada curso aporta una parte proporcional a su tamaño', 'كل صف يساهم بجزء متناسب مع حجمه')} size={14} />
        </Figure>
    )
}

/* ---------- The full frequency table of the goals ---------- */

export function GoalsTableFigure({ language }: { language: UnitLanguage }) {
    const n = goalRows.reduce((sum, row) => sum + row.count, 0)
    const rows = goalRows.map((row, index) => {
        const cumulative = goalRows.slice(0, index + 1).reduce((sum, item) => sum + item.count, 0)
        return [row.value, row.count, round2(row.count / n), cumulative, round2(cumulative / n)]
    })
    return (
        <Figure height={290} label={pick(language, say('Maiztasun-taula osoa', 'La tabla de frecuencias completa', 'جدول التكرارات الكامل'))}>
            <Table
                x0={20}
                y0={30}
                columns={[80, 80, 100, 90, 100]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <Sub key="h" letter="h" index="i" />, <Sub key="F" letter="F" index="i" />, <Sub key="H" letter="H" index="i" />]}
                rows={rows}
                rowHeight={27}
                highlight={3}
                language={language}
            />
            <line x1={20} x2={470} y1={212} y2={212} stroke={INK} strokeWidth={1.4} />
            <Formula x={140} y={236}>{n}</Formula>
            <Formula x={230} y={236}>1</Formula>
            <rect x={490} y={46} width={210} height={160} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={595} y={82} size={16}>h = 8 : 30 ≈ {num(language, 0.27)}</Formula>
            <Formula x={595} y={116} size={16}>F = 6 + 7 + 8 = 21</Formula>
            <Formula x={595} y={150} size={16} color={STAGE}>H = 21 : 30 = {num(language, 0.7)}</Formula>
            <Formula x={595} y={186} size={15} color={SECOND}>x ≤ 2 → {pick(language, say('% 70', '70 %', '70 %'))}</Formula>
            <Caption y={276} language={language} text={say('F metatzen doa: azkena N da; H-ren azkena, 1', 'F se va acumulando: la última es N; la última H, 1', 'F يتراكم: آخره N، وآخر H يساوي 1')} size={14} />
        </Figure>
    )
}

/* ---------- The mean of two joined classes as a balance ---------- */

export function JoinedMeanFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 120 + (value - 6) * 240
    const centre = joinedMean(classGroups)
    const blocks = classGroups.map((group, index) => ({ ...group, name: index === 0 ? 'A' : 'B', color: COLORS[index === 0 ? 0 : 3], height: group.students * 2.5 }))
    return (
        <Figure height={270} label={pick(language, say('Bi taldeen batez besteko bateratua', 'La media de dos grupos juntos', 'متوسط مجموعتين معًا'))}>
            <Formula x={360} y={26} size={16}>(20 · {num(language, 6.5)} + 30 · {num(language, 7.2)}) : 50 = {num(language, centre)}</Formula>
            <line x1={x(6)} x2={x(8)} y1={140} y2={140} stroke={INK} strokeWidth={4} strokeLinecap="round" />
            {blocks.map((block) => (
                <g key={block.name}>
                    <rect x={x(block.mean) - 34} y={140 - block.height} width={68} height={block.height} rx={6} fill={block.color} fillOpacity={0.22} stroke={block.color} strokeWidth={2} />
                    <text x={x(block.mean)} y={140 - block.height / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{block.students}</text>
                    <text x={x(block.mean)} y={132 - block.height} textAnchor="middle" fontSize={17} fontWeight={700} fill={block.color}>{block.name}</text>
                    <line x1={x(block.mean)} x2={x(block.mean)} y1={142} y2={196} stroke={block.color} strokeWidth={1.4} strokeDasharray="4 4" />
                </g>
            ))}
            <polygon points={`${x(centre)},${143} ${x(centre) - 14},${170} ${x(centre) + 14},${170}`} fill={SECOND} />
            <text x={x(centre)} y={190} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{num(language, centre)}</text>
            <line x1={x(6)} x2={x(8)} y1={206} y2={206} stroke={INK} strokeWidth={2} />
            {[6, 6.5, 7, 7.5, 8].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={200} y2={212} stroke={INK} strokeWidth={1.4} />
                    <text x={x(value)} y={230} textAnchor="middle" fontSize={13} fill={MUTED}>{num(language, value)}</text>
                </g>
            ))}
            <Caption y={258} language={language} text={say('Ez da 6,5 eta 7,2ren erdia: talde handiak gehiago tiratzen du', 'No es el punto medio de 6,5 y 7,2: el grupo grande tira más', 'ليس منتصف 6.5 و7.2: المجموعة الأكبر تجذب أكثر')} size={14} />
        </Figure>
    )
}

/* ---------- Quartiles by position ---------- */

export function QuartileRuleFigure({ language }: { language: UnitLanguage }) {
    const left = (index: number) => 48 + index * 52
    const cut = (position: number) => left(position) - 1
    const marks = [
        { at: 3, text: <>Q₁ = {num(language, 3.5)}</> },
        { at: 6, text: <>Me = {num(language, 5.5)}</> },
        { at: 9, text: <>Q₃ = {num(language, 7.5)}</> }
    ]
    return (
        <Figure height={260} label={pick(language, say('Kuartilak postuen bidez', 'Cuartiles por posiciones', 'الربيعيات بالمواقع'))}>
            {sportHours.map((value, index) => {
                const outlier = index === sportHours.length - 1
                return (
                    <g key={index}>
                        <rect x={left(index) + 2} y={66} width={46} height={40} rx={7} fill={outlier ? SECOND : STAGE} fillOpacity={outlier ? 0.2 : 0.14} stroke={outlier ? SECOND : STAGE} strokeWidth={1.8} />
                        <text x={left(index) + 25} y={92} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{value}</text>
                        <text x={left(index) + 25} y={126} textAnchor="middle" fontSize={12} fill={MUTED}>{index + 1}</text>
                    </g>
                )
            })}
            {marks.map((mark) => (
                <g key={mark.at}>
                    <line x1={cut(mark.at)} x2={cut(mark.at)} y1={46} y2={134} stroke={SECOND} strokeWidth={2.4} />
                    <Formula x={cut(mark.at)} y={36} size={16} color={SECOND}>{mark.text}</Formula>
                </g>
            ))}
            <Formula x={360} y={168} size={16}>12 · {num(language, 0.25)} = 3 → (3 + 4) : 2 = {num(language, 3.5)}</Formula>
            <Formula x={360} y={198} size={16}>12 · {num(language, 0.75)} = 9 → (7 + 8) : 2 = {num(language, 7.5)}</Formula>
            <Caption y={240} language={language} text={say('N·k/100 osoa bada, datu hori eta hurrengoaren erdia; bestela, hurrengo datua', 'Si N·k/100 es entero, la media de ese dato y el siguiente; si no, el dato siguiente', 'إذا كان N·k/100 صحيحًا فمتوسط ذلك البيان والذي يليه، وإلا فالبيان التالي')} size={14} />
        </Figure>
    )
}

/* ---------- Box and whiskers of the sport hours ---------- */

export function SportBoxFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 60 + (value + 3) * 30
    const box = boxPlot(sportHours)
    const mid = 112
    return (
        <Figure height={290} label={pick(language, say('Kirol-orduen kutxa-diagrama', 'Diagrama de caja de las horas de deporte', 'مخطط صندوق ساعات الرياضة'))}>
            {[box.low, box.high].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={44} y2={176} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                    <text x={x(value)} y={36} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED} direction="ltr">{num(language, value).replace('-', '−')}</text>
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
            <line x1={x(-3)} x2={x(17)} y1={190} y2={190} stroke={INK} strokeWidth={2} />
            {[0, 5, 10, 15].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={184} y2={196} stroke={INK} strokeWidth={1.6} />
                    <text x={x(value)} y={214} textAnchor="middle" fontSize={14} fill={INK}>{value}</text>
                </g>
            ))}
            <Formula x={360} y={246} color={STAGE} size={16}>{num(language, 7.5)} − {num(language, 3.5)} = 4 → {num(language, 1.5)} · 4 = 6</Formula>
            <Caption y={276} language={language} text={say('Biboteak 2 eta 9ra arte; 15ek 13,5 gainditzen du: atipikoa (*)', 'Bigotes hasta 2 y 9; el 15 pasa de 13,5: atípico (*)', 'الشاربان حتى 2 و9؛ العدد 15 يتجاوز 13.5: شاذ (*)')} size={14} />
        </Figure>
    )
}

/* ---------- σ of the goals table ---------- */

export function GoalsVarianceFigure({ language }: { language: UnitLanguage }) {
    const rows = goalRows.map((row) => [row.value, row.count, row.value * row.count, row.count * row.value ** 2])
    return (
        <Figure height={300} label={pick(language, say('Golen desbideratze tipikoa', 'La desviación típica de los goles', 'الانحراف المعياري للأهداف'))}>
            <Table
                x0={20}
                y0={30}
                columns={[80, 80, 110, 120]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <Product key="fx" />, <Product key="fx2" square />]}
                rows={rows}
                rowHeight={27}
                highlight={3}
                language={language}
            />
            <line x1={20} x2={410} y1={212} y2={212} stroke={INK} strokeWidth={1.4} />
            <Formula x={140} y={236}>30</Formula>
            <Formula x={235} y={236}>54</Formula>
            <Formula x={350} y={236} color={STAGE}>150</Formula>
            <rect x={440} y={50} width={260} height={160} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={570} y={86} size={17}><XBar /> = 54 : 30 = {num(language, 1.8)}</Formula>
            <Formula x={570} y={124} size={16}>σ² = 150 : 30 − {num(language, 1.8)}²</Formula>
            <Formula x={570} y={154} size={17} color={STAGE}>σ² = 5 − {num(language, 3.24)} = {num(language, 1.76)}</Formula>
            <Formula x={570} y={190} size={19} color={SECOND}>σ ≈ {num(language, 1.33)}</Formula>
            <Caption y={284} language={language} text={say('Karratuen batez bestekoa ken batez bestekoaren karratua; gero erroa', 'Media de los cuadrados menos el cuadrado de la media; después, la raíz', 'متوسط المربعات ناقص مربع المتوسط؛ ثم الجذر')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

function Card({ x, y, rotate, width, height, fill, children }: { x: number; y: number; rotate: number; width: number; height: number; fill: string; children: ReactNode }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${rotate} ${width / 2} ${height / 2})`}>
            <rect width={width} height={height} rx={18} fill={fill} stroke={INK} strokeWidth={2.4} />
            {children}
        </g>
    )
}

export function StatisticsAkHeroArt() {
    const bars = [3, 6, 9, 7, 4, 2]
    const cloud = [[24, 118], [44, 110], [58, 96], [76, 100], [92, 80], [110, 74], [126, 60], [146, 52], [160, 36]]
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <Card x={34} y={36} rotate={-4} width={230} height={170} fill={PAPER}>
                    <line x1={20} x2={212} y1={146} y2={146} stroke={INK} strokeWidth={2} />
                    {bars.map((value, index) => (
                        <rect key={index} x={26 + index * 30} y={146 - value * 13} width={30} height={value * 13} fill={COLORS[index % 2 === 0 ? 0 : 4]} fillOpacity={0.35} stroke={INK} strokeWidth={1.6} />
                    ))}
                    <polyline points={bars.map((value, index) => `${41 + index * 30},${146 - value * 13}`).join(' ')} fill="none" stroke="#d9502e" strokeWidth={2.4} />
                </Card>
                <Card x={292} y={40} rotate={4} width={196} height={104} fill="#fbebc0">
                    <line x1={22} x2={176} y1={52} y2={52} stroke={INK} strokeWidth={2.4} />
                    {[22, 176].map((at) => <line key={at} x1={at} x2={at} y1={40} y2={64} stroke={INK} strokeWidth={2.4} />)}
                    <rect x={62} y={32} width={70} height={40} fill="#dde7f7" stroke={INK} strokeWidth={2.2} />
                    <line x1={92} x2={92} y1={32} y2={72} stroke="#d9502e" strokeWidth={3} />
                </Card>
                <Card x={300} y={172} rotate={-3} width={184} height={96} fill="#e8e0f7">
                    <text x={92} y={60} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">x̄ · Me · σ</text>
                </Card>
                <Card x={40} y={236} rotate={2} width={232} height={140} fill="#d6eddf">
                    <line x1={18} x2={214} y1={124} y2={124} stroke={INK} strokeWidth={2} />
                    <line x1={18} x2={18} y1={124} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={26} x2={200} y1={120} y2={30} stroke="#d9502e" strokeWidth={3} />
                    {cloud.map(([cx, cy], index) => <circle key={index} cx={cx + 12} cy={cy} r={6} fill="#2f6fdb" fillOpacity={0.7} stroke={INK} strokeWidth={1.2} />)}
                </Card>
                <Card x={310} y={300} rotate={3} width={170} height={70} fill={PAPER}>
                    <text x={85} y={46} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">−1 ≤ r ≤ 1</text>
                </Card>
            </svg>
        </div>
    )
}

