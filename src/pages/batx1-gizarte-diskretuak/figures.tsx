import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { binomialPmfDecimal, choose } from '../batx2-zientziak-banaketak/binomial'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { coinFaces } from './coins'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — lesson figures. Each
   one draws the numbers of its «Let's solve»: the tree of two draws, the
   four orders of three heads, two coins, the loaded die, the bookshop's
   bars with μ ± σ, the raffle, the Galton board with 4 rows, the test of
   B(5; 0,25), the boxes of B(4; 0,1), two binomials side by side and the
   80 groups of three customers, observed against expected. Binomial bars
   are computed, never drawn by hand. Formulas are written left to right
   in every language; Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const SECOND_TINT = 'rgba(196, 67, 42, 0.22)'
const GREEN = '#267b53'
const GREEN_TINT = 'rgba(38, 123, 83, 0.2)'

/** An amount of euros: €12 in English, 12 € in the others */
const euros = (language: UnitLanguage, value: number | string) => (language === 'en' ? `€${value}` : `${value}\u00a0€`)


interface BarSpec { value: number; label: string; color?: string; tint?: string; top?: string; dashed?: boolean }

/** Bars on a baseline, each with its label under it and, if given, a value over it */
export function Bars({ left, right, baseline, height, max, bars, gap = 0.25, offset = 0, width }: { left: number; right: number; baseline: number; height: number; max: number; bars: BarSpec[]; gap?: number; offset?: number; width?: number }) {
    const step = (right - left) / bars.length
    return (
        <g>
            {bars.map((bar, index) => {
                const h = (bar.value / max) * height
                const w = width ?? step * (1 - gap)
                const x = left + index * step + (step - w) / 2 + offset
                return (
                    <g key={index}>
                        <rect x={x} y={baseline - h} width={w} height={h} fill={bar.tint ?? STAGE_TINT} stroke={bar.color ?? STAGE} strokeWidth={1.8} strokeDasharray={bar.dashed ? '5 4' : undefined} />
                        {bar.top && <text x={x + w / 2} y={baseline - h - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={bar.color ?? INK} direction="ltr">{bar.top}</text>}
                        {bar.label && <text x={x + w / 2} y={baseline + 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{bar.label}</text>}
                    </g>
                )
            })}
            <line x1={left - 6} x2={right + 6} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
        </g>
    )
}

/** A small ball of a colour */
const Ball = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={11} fill={color} stroke={INK} strokeWidth={1.6} />

/* ---------- 1. With and without replacement ---------- */

export function TreeFigure({ language }: { language: UnitLanguage }) {
    const branch = (x1: number, y1: number, x2: number, y2: number, label: string, color = INK) => (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.2} />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={color} direction="ltr">{label}</text>
        </g>
    )
    const tree = (left: number, second: string, title: LocalizedText) => (
        <g>
            <Caption x={left + 140} y={30} language={language} text={title} color={INK} size={16} />
            <circle cx={left + 10} cy={140} r={5} fill={INK} />
            {branch(left + 10, 140, left + 120, 80, '3/5', SECOND)}
            {branch(left + 10, 140, left + 120, 210, '2/5')}
            <Ball x={left + 132} y={80} color={SECOND} />
            <Ball x={left + 132} y={210} color={GREEN} />
            {branch(left + 144, 80, left + 250, 60, second, SECOND)}
            <Ball x={left + 262} y={60} color={SECOND} />
        </g>
    )
    return (
        <Figure height={300} label={pick(language, say('Bi ateraldiren zuhaitza, itzulita eta itzuli gabe', 'El árbol de dos extracciones, con y sin devolución', 'شجرة سحبتين، مع الإرجاع ودونه', 'The tree of two draws, with and without replacement'))}>
            {tree(20, '3/5', say('Itzulita', 'Con devolución', 'مع الإرجاع', 'With replacement'))}
            {tree(380, '2/4', say('Itzuli gabe', 'Sin devolución', 'دون إرجاع', 'Without replacement'))}
            <Formula x={170} y={262} size={19} color={SECOND}>3/5 · 3/5 = 9/25</Formula>
            <Formula x={530} y={262} size={19} color={SECOND}>3/5 · 2/4 = 3/10</Formula>
            <Caption y={292} language={language} text={say('Gorria lehenik eta gorria gero: adarraren probabilitateak biderkatzen dira', 'Roja y luego roja: se multiplican las probabilidades de la rama', 'حمراء ثم حمراء: تُضرب احتمالات الفرع', 'Red and then red: multiply the probabilities along the branch')} size={14} />
        </Figure>
    )
}

/* ---------- 2. How many orders? ---------- */

export function OrdersFigure({ language }: { language: UnitLanguage }) {
    const [head, tail] = coinFaces(language)
    const orders = [3, 2, 1, 0]
    return (
        <Figure height={290} label={pick(language, say('4 botalditan 3 aurpegi ateratzeko lau ordenak', 'Los cuatro órdenes de 3 caras en 4 lanzamientos', 'الترتيبات الأربعة لثلاثة أوجه في 4 رميات', 'The four orders of 3 heads in 4 tosses'))}>
            {orders.map((tailAt, row) => (
                <g key={row}>
                    {[0, 1, 2, 3].map((index) => (
                        <g key={index}>
                            <circle cx={80 + index * 52} cy={50 + row * 50} r={19} fill={index === tailAt ? PAPER : STAGE_TINT} stroke={index === tailAt ? MUTED : STAGE} strokeWidth={2} />
                            <text x={80 + index * 52} y={56 + row * 50} textAnchor="middle" fontSize={17} fontWeight={700} fill={index === tailAt ? MUTED : STAGE}>{index === tailAt ? tail : head}</text>
                        </g>
                    ))}
                    <Formula x={330} y={56 + row * 50} size={17} color={MUTED}>1/16</Formula>
                </g>
            ))}
            <Formula x={530} y={110} size={22} color={STAGE}>C(4, 3) = 4</Formula>
            <Formula x={530} y={160} size={22} color={SECOND}>4 · 1/16 = 1/4</Formula>
            <Caption y={278} language={language} text={say('Gurutzearen tokia aldatzen da; ordena bakoitzak probabilitate bera du', 'Cambia el sitio de la cruz; cada orden tiene la misma probabilidad', 'يتغيّر موضع الظهر؛ ولكل ترتيب الاحتمال نفسه', 'The place of the tail changes; each order has the same probability')} size={14} />
        </Figure>
    )
}

/* ---------- 3. A random variable: two coins ---------- */

export function TwoCoinsFigure({ language }: { language: UnitLanguage }) {
    const quarters = [1, 2, 1]
    return (
        <Figure height={300} label={pick(language, say('Bi txanponen aurpegi kopuruaren banaketa', 'La distribución del número de caras de dos monedas', 'توزيع عدد الأوجه في قطعتي نقود', 'The distribution of the number of heads of two coins'))}>
            <Bars left={110} right={440} baseline={222} height={150} max={2} bars={quarters.map((value, index) => ({ value, label: String(index), top: `${value}/4`, color: index >= 1 ? SECOND : STAGE, tint: index >= 1 ? SECOND_TINT : STAGE_TINT }))} />
            <Label x={275} y={272} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('X = aurpegi kopurua', 'X = número de caras', 'X = عدد الأوجه', 'X = number of heads'))}</Label>
            <Formula x={590} y={110} size={20} color={SECOND}>P(X ≥ 1)</Formula>
            <Formula x={590} y={146} size={20} color={SECOND}>= 2/4 + 1/4 = 3/4</Formula>
            <Formula x={590} y={196} size={16} color={MUTED}>1/4 + 2/4 + 1/4 = 1</Formula>
        </Figure>
    )
}

/* ---------- 4. A well-made table: the loaded die ---------- */

export function LoadedDieFigure({ language }: { language: UnitLanguage }) {
    const shares = ['0,15', '0,15', '0,15', '0,1', '0,1', '0,35']
    return (
        <Figure height={300} label={pick(language, say('Dado trukatuaren probabilitateak', 'Las probabilidades del dado trucado', 'احتمالات النرد المغشوش', 'The probabilities of the loaded die'))}>
            <Bars left={60} right={480} baseline={226} height={170} max={0.35} bars={shares.map((share, index) => {
                const even = index % 2 === 1
                const missing = index === 5
                return { value: Number(share.replace(',', '.')), label: String(index + 1), top: num(language, share), color: even ? SECOND : STAGE, tint: even ? SECOND_TINT : STAGE_TINT, dashed: missing }
            })} />
            <Formula x={610} y={96} size={18} color={INK}>P(6) = 1 − {num(language, '0,65')}</Formula>
            <Formula x={610} y={128} size={18} color={INK}>= {num(language, '0,35')}</Formula>
            <Formula x={610} y={186} size={18} color={SECOND}>P(2, 4, 6) = {num(language, '0,6')}</Formula>
            <Caption y={290} language={language} text={say('Gorriak bikoitiak dira; marra etenekoa falta zena', 'En rojo, los pares; la discontinua es la que faltaba', 'بالأحمر الأعداد الزوجية؛ والمتقطع هو الناقص', 'In red, the even numbers; the dashed one is the missing one')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Mean and standard deviation: the bookshop ---------- */

export function MeanSdFigure({ language }: { language: UnitLanguage }) {
    const shares = ['0,2', '0,2', '0,3', '0,3']
    const left = 110
    const right = 470
    const step = (right - left) / 4
    const at = (value: number) => left + step * (value + 0.5)
    return (
        <Figure height={310} label={pick(language, say('Liburu-dendaren banaketa, batez bestekoarekin eta desbideratzearekin', 'La distribución de la librería, con su media y su desviación', 'توزيع المكتبة مع متوسطه وانحرافه', 'The bookshop\'s distribution, with its mean and deviation'))}>
            <Bars left={left} right={right} baseline={210} height={150} max={0.3} bars={shares.map((share, index) => ({ value: Number(share.replace(',', '.')), label: String(index), top: num(language, share) }))} />
            <line x1={at(1.7 - 1.1)} x2={at(1.7 + 1.1)} y1={256} y2={256} stroke={SECOND} strokeWidth={3} />
            <line x1={at(0.6)} x2={at(0.6)} y1={248} y2={264} stroke={SECOND} strokeWidth={2.4} />
            <line x1={at(2.8)} x2={at(2.8)} y1={248} y2={264} stroke={SECOND} strokeWidth={2.4} />
            <polygon points={`${at(1.7)},242 ${at(1.7) - 9},260 ${at(1.7) + 9},260`} fill={SECOND} />
            <Formula x={600} y={110} size={20} color={SECOND}>μ = {num(language, '1,7')}</Formula>
            <Formula x={600} y={150} size={20} color={SECOND}>σ = {num(language, '1,1')}</Formula>
            <Caption y={298} language={language} text={say('Hirukia batez bestekoa da (oreka-puntua); marra gorria, μ ± σ', 'El triángulo es la media (el punto de equilibrio); la raya roja, μ ± σ', 'المثلث هو المتوسط (نقطة التوازن)؛ والخط الأحمر μ ± σ', 'The triangle is the mean (the balance point); the red line, μ ± σ')} size={14} />
        </Figure>
    )
}

/* ---------- 6. The raffle ---------- */

export function RaffleFigure({ language }: { language: UnitLanguage }) {
    const tickets = Array.from({ length: 50 }, (_, index) => index)
    return (
        <Figure height={300} label={pick(language, say('500 txarteleko zozketa', 'La rifa de 500 boletos', 'يانصيب من 500 بطاقة', 'The raffle of 500 tickets'))}>
            {tickets.map((index) => {
                const x = 40 + (index % 10) * 40
                const y = 40 + Math.floor(index / 10) * 34
                const prize = index === 0 ? 'gold' : index < 5 ? 'silver' : ''
                return <rect key={index} x={x} y={y} width={32} height={24} rx={4} fill={prize === 'gold' ? '#e0a100' : prize === 'silver' ? SECOND_TINT : PAPER} stroke={prize ? SECOND : MUTED} strokeWidth={prize ? 2.2 : 1.2} />
            })}
            <Caption x={240} y={230} language={language} text={say('Txartel bakoitza 10 txartel dira: 50 ⋅ 10 = 500', 'Cada boleto dibujado son 10: 50 ⋅ 10 = 500', 'كل بطاقة مرسومة تمثل 10: 50 ⋅ 10 = 500', 'Each ticket drawn stands for 10: 50 ⋅ 10 = 500')} size={13} />
            <rect x={470} y={50} width={28} height={20} rx={4} fill="#e0a100" stroke={SECOND} strokeWidth={2} />
            <Formula x={512} y={66} size={17} anchor="start">{euros(language, 300)} · 1</Formula>
            <rect x={470} y={90} width={28} height={20} rx={4} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
            <Formula x={512} y={106} size={17} anchor="start">{euros(language, 50)} · 4</Formula>
            <Formula x={590} y={160} size={19} color={STAGE}>μ = 500/500 = 1</Formula>
            <Formula x={590} y={196} size={19} color={SECOND}>1 − 2 = −1</Formula>
            <Caption y={286} language={language} text={say('Jokalariak euro 1 galtzen du batez beste txartel bakoitzeko', 'El jugador pierde 1 € de media por boleto', 'يخسر اللاعب 1 € في المتوسط عن كل بطاقة', 'The player loses €1 per ticket on average')} size={14} />
        </Figure>
    )
}

/* ---------- 7. The Galton board ---------- */

export function GaltonFigure({ language }: { language: UnitLanguage }) {
    const rows = 4
    const top = 30
    const gap = 58
    const centre = 240
    const counts = Array.from({ length: rows + 1 }, (_, k) => choose(rows, k))
    const binX = (k: number) => centre + (k - rows / 2) * gap
    const path = [0, 1, 1, 2, 2]
    return (
        <Figure height={320} label={pick(language, say('4 errenkadako Galtonen tresna eta kutxatila bakoitzeko bideak', 'Un aparato de Galton de 4 filas y los caminos a cada casilla', 'جهاز غالتون بأربعة صفوف والمسارات إلى كل خانة', 'A Galton board with 4 rows and the paths to each bin'))}>
            {Array.from({ length: rows }, (_, row) => Array.from({ length: row + 1 }, (_, index) => (
                <circle key={`${row}-${index}`} cx={centre + (index - row / 2) * gap} cy={top + row * 38} r={6} fill={INK} />
            )))}
            {path.slice(0, -1).map((rightJumps, row) => {
                const x1 = centre + (rightJumps - row / 2) * gap
                const x2 = centre + (path[row + 1] - (row + 1) / 2) * gap
                return <line key={row} x1={x1} y1={top + row * 38 - 14} x2={x2} y2={top + (row + 1) * 38 - 14} stroke={SECOND} strokeWidth={2.6} strokeDasharray="6 4" />
            })}
            <Bars left={binX(0) - gap / 2} right={binX(rows) + gap / 2} baseline={268} height={100} max={6} bars={counts.map((value, index) => ({ value, label: String(index), top: String(value), color: index === 2 ? SECOND : STAGE, tint: index === 2 ? SECOND_TINT : STAGE_TINT }))} gap={0.2} />
            <Formula x={570} y={110} size={18} color={STAGE}>1 + 4 + 6 + 4 + 1 = 16</Formula>
            <Formula x={570} y={150} size={20} color={SECOND}>P(2) = 6/16 = 3/8</Formula>
            <Caption y={308} language={language} text={say('Kutxatila = eskuinera egindako jauziak. Marra etena: E Z E Z bidea', 'Casilla = saltos a la derecha. Discontinua: el camino D I D I', 'الخانة = القفزات إلى اليمين. المتقطع: مسار يمين يسار يمين يسار', 'Bin = jumps to the right. Dashed: the path R L R L')} size={14} />
        </Figure>
    )
}

/* ---------- 9. The formula: a test of B(5; 0,25) ---------- */

export function TestBarsFigure({ language }: { language: UnitLanguage }) {
    const values = Array.from({ length: 6 }, (_, k) => binomialPmfDecimal(5, 0.25, k))
    return (
        <Figure height={300} label={pick(language, say('5 galderako testaren barrak', 'Las barras del test de 5 preguntas', 'أعمدة اختبار من 5 أسئلة', 'The bars of the 5-question test'))}>
            <Bars left={70} right={460} baseline={226} height={170} max={0.4} bars={values.map((value, k) => ({ value, label: String(k), top: num(language, value.toFixed(3).replace('.', ',')), color: k === 2 ? SECOND : STAGE, tint: k === 2 ? SECOND_TINT : STAGE_TINT }))} />
            <Formula x={600} y={96} size={19} color={INK}>B(5; {num(language, '0,25')})</Formula>
            <Formula x={600} y={146} size={18} color={SECOND}>P(X = 2) ≈ {num(language, '0,264')}</Formula>
            <Caption x={265} y={280} language={language} text={say('Asmatze kopurua', 'Número de aciertos', 'عدد الإجابات الصحيحة', 'Number right')} size={14} />
        </Figure>
    )
}

/* ---------- 10. At least and more than: boxes of four parts ---------- */

export function PiecesFigure({ language }: { language: UnitLanguage }) {
    const values = ['0,6561', '0,2916', '0,0486', '0,0036', '0,0001']
    return (
        <Figure height={300} label={pick(language, say('Lau piezako kutxa bateko akastunak', 'Las piezas defectuosas de una caja de cuatro', 'القطع المعيبة في صندوق من أربع', 'The faulty parts in a box of four'))}>
            <Bars left={70} right={450} baseline={222} height={160} max={0.66} bars={values.map((value, k) => ({ value: Number(value.replace(',', '.')), label: String(k), top: num(language, value), color: k === 0 ? STAGE : k === 1 ? GREEN : SECOND, tint: k === 0 ? STAGE_TINT : k === 1 ? GREEN_TINT : SECOND_TINT }))} />
            <Formula x={590} y={90} size={17} color={STAGE}>P(X = 0) = {num(language, '0,6561')}</Formula>
            <Formula x={590} y={130} size={17} color={INK}>P(X ≥ 1) = {num(language, '0,3439')}</Formula>
            <Formula x={590} y={170} size={17} color={SECOND}>P(X ≥ 2) = {num(language, '0,0523')}</Formula>
            <Caption y={284} language={language} text={say('Urdina kenduta, «gutxienez 1»; urdina eta berdea kenduta, «1 baino gehiago»', 'Quitando la azul, «al menos 1»; quitando azul y verde, «más de 1»', 'بحذف الأزرق «1 على الأقل»؛ وبحذف الأزرق والأخضر «أكثر من 1»', 'Without the blue, ‘at least 1’; without blue and green, ‘more than 1’')} size={14} />
        </Figure>
    )
}

/* ---------- 11. Mean and spread: two binomials ---------- */

export function SpreadFigure({ language }: { language: UnitLanguage }) {
    const bike = Array.from({ length: 41 }, (_, k) => binomialPmfDecimal(100, 0.2, k))
    const coin = Array.from({ length: 17 }, (_, k) => binomialPmfDecimal(16, 0.5, k))
    const draw = (values: number[], left: number, right: number, mean: number, sd: number, color: string, tint: string, first: number) => {
        const step = (right - left) / values.length
        const at = (value: number) => left + step * (value - first + 0.5)
        const max = Math.max(...values)
        return (
            <g>
                {values.map((value, index) => <rect key={index} x={left + index * step + 1} y={200 - (value / max) * 130} width={step - 2} height={(value / max) * 130} fill={tint} stroke={color} strokeWidth={1} />)}
                <line x1={left - 4} x2={right + 4} y1={200} y2={200} stroke={INK} strokeWidth={2} />
                <line x1={at(mean - sd)} x2={at(mean + sd)} y1={224} y2={224} stroke={color} strokeWidth={3} />
                <polygon points={`${at(mean)},210 ${at(mean) - 8},226 ${at(mean) + 8},226`} fill={color} />
                <text x={at(first)} y={248} textAnchor="middle" fontSize={13} fontWeight={600} fill={MUTED} direction="ltr">{first}</text>
                <text x={at(first + values.length - 1)} y={248} textAnchor="middle" fontSize={13} fontWeight={600} fill={MUTED} direction="ltr">{first + values.length - 1}</text>
            </g>
        )
    }
    return (
        <Figure height={310} label={pick(language, say('Bi binomial eta haien aldakuntza-koefizienteak', 'Dos binomiales y sus coeficientes de variación', 'توزيعان ثنائيان ومعاملا اختلافهما', 'Two binomials and their coefficients of variation'))}>
            {draw(bike.slice(5, 36), 30, 340, 20, 4, STAGE, STAGE_TINT, 5)}
            {draw(coin, 400, 690, 8, 2, SECOND, SECOND_TINT, 0)}
            <Formula x={185} y={44} size={17} color={STAGE}>B(100; {num(language, '0,2')})</Formula>
            <Formula x={545} y={44} size={17} color={SECOND}>B(16; {num(language, '0,5')})</Formula>
            <Formula x={185} y={278} size={16} color={STAGE}>μ = 20 · σ = 4 · CV = {num(language, '0,2')}</Formula>
            <Formula x={545} y={278} size={16} color={SECOND}>μ = 8 · σ = 2 · CV = {num(language, '0,25')}</Formula>
            <Caption y={304} language={language} text={say('Bigarrena sakabanatuagoa da bere batez bestekoarekiko', 'La segunda está más dispersa respecto de su media', 'الثاني أكثر تشتتًا بالنسبة إلى متوسطه', 'The second is more spread out relative to its mean')} size={14} />
        </Figure>
    )
}

/* ---------- 12–14. Fitting: 80 groups of three customers ---------- */

const OBSERVED = [11, 27, 33, 9]
const EXPECTED = [10, 30, 30, 10]

/** Observed bars and, if asked, the expected ones as dashed outlines beside them */
function FitBars({ language, expected, differences }: { language: UnitLanguage; expected: boolean; differences: boolean }) {
    const left = 90
    const right = 470
    const step = (right - left) / 4
    return (
        <g>
            <Bars left={left} right={right} baseline={222} height={160} max={33} bars={OBSERVED.map((value, k) => ({ value, label: String(k), top: String(value) }))} width={expected ? step * 0.36 : undefined} offset={expected ? -step * 0.2 : 0} />
            {expected && <Bars left={left} right={right} baseline={222} height={160} max={33} bars={EXPECTED.map((value) => ({ value, label: '', top: String(value), color: SECOND, tint: 'transparent', dashed: true }))} width={step * 0.36} offset={step * 0.2} />}
            {differences && OBSERVED.map((value, k) => (
                <text key={k} x={left + step * (k + 0.5)} y={268} textAnchor="middle" fontSize={18} fontWeight={700} fill={Math.abs(value - EXPECTED[k]) === 3 ? SECOND : MUTED} direction="ltr">{Math.abs(value - EXPECTED[k])}</text>
            ))}
            {differences && <Caption x={(left + right) / 2} y={294} language={language} text={say('Diferentziak, balio absolutuan', 'Diferencias en valor absoluto', 'الفروق بالقيمة المطلقة', 'Differences in absolute value')} size={14} />}
            <Label x={left - 10} y={40} textAnchor="start" fontSize={14} fontWeight={700} fill={STAGE}>{pick(language, say('Behatuak', 'Observados', 'المشاهَدة', 'Observed'))}</Label>
            {expected && <Label x={left + 120} y={40} textAnchor="start" fontSize={14} fontWeight={700} fill={SECOND}>{pick(language, say('Itxaronak', 'Esperados', 'المتوقعة', 'Expected'))}</Label>}
        </g>
    )
}

export function ObservedFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('3 bezeroko 80 taldeen datuak', 'Los datos de los 80 grupos de 3 clientes', 'بيانات المجموعات الثمانين من 3 زبائن', 'The data of the 80 groups of 3 customers'))}>
            <FitBars language={language} expected={false} differences={false} />
            <Formula x={600} y={110} size={20} color={STAGE}>x̄ = {num(language, '1,5')}</Formula>
            <Formula x={600} y={150} size={20} color={SECOND}>p = {num(language, '1,5')}/3 = {num(language, '0,5')}</Formula>
            <Caption x={280} y={280} language={language} text={say('Erosle kopurua taldeko', 'Compradores por grupo', 'عدد المشترين في المجموعة', 'Buyers per group')} size={14} />
        </Figure>
    )
}

export function ExpectedFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Behatuak eta itxaronak, ondoz ondo', 'Observados y esperados, uno al lado del otro', 'المشاهَدة والمتوقعة جنبًا إلى جنب', 'Observed and expected, side by side'))}>
            <FitBars language={language} expected={true} differences={false} />
            <Formula x={600} y={100} size={18} color={SECOND}>80 · 1/8 = 10</Formula>
            <Formula x={600} y={136} size={18} color={SECOND}>80 · 3/8 = 30</Formula>
            <Caption x={280} y={280} language={language} text={say('Marra etenekoak: B(3; 0,5) banaketak espero dituenak', 'Las discontinuas: lo que espera la B(3; 0,5)', 'المتقطعة: ما يتوقعه التوزيع الثنائي', 'Dashed: what B(3; 0.5) expects')} size={14} />
        </Figure>
    )
}

export function DifferencesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Behatuen eta itxaronen arteko diferentziak', 'Las diferencias entre observados y esperados', 'الفروق بين المشاهَدة والمتوقعة', 'The differences between observed and expected'))}>
            <FitBars language={language} expected={true} differences={true} />
            <Formula x={600} y={100} size={19} color={SECOND}>3/80 = {num(language, '0,0375')}</Formula>
            <Formula x={600} y={140} size={19} color={GREEN}>{num(language, '0,0375')} &lt; {num(language, '0,05')}</Formula>
            <Caption x={600} y={186} language={language} text={say('Doikuntza ona', 'Ajuste bueno', 'مطابقة جيدة', 'A good fit')} color={GREEN} size={16} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function DiscreteBatx1gHeroArt() {
    const bars = [1, 4, 6, 4, 1]
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 40) rotate(-4)">
                    <rect width={230} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[0, 1, 2, 3].map((row) => Array.from({ length: row + 1 }, (_, index) => <circle key={`${row}-${index}`} cx={115 + (index - row / 2) * 30} cy={30 + row * 24} r={4} fill={INK} />))}
                    {bars.map((value, index) => <rect key={index} x={42 + index * 30} y={154 - value * 9} width={26} height={value * 9} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />)}
                    <line x1={30} x2={200} y1={154} y2={154} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={200} height={140} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={64} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">B(n; p)</text>
                    <text x={100} y={104} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">μ = np</text>
                </g>
                <g transform="translate(296 214) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={48} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">xᵢ   0   1   2</text>
                    <text x={98} y={82} textAnchor="middle" fontSize={18} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">pᵢ  ¼  ½  ¼</text>
                </g>
                <g transform="translate(40 250) rotate(2)">
                    <rect width={230} height={110} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={66} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">1 − qⁿ</text>
                </g>
            </svg>
        </div>
    )
}
