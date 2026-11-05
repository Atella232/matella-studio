import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Segidak · Batxilergoa 1 · Zientziak — the new lesson figures: an
   increasing and an alternating sequence, a recurring decimal cut into
   blocks, the squares that add up to the formula, terms that close in on
   their limit (with the band of width ε), three ways of not converging,
   the degrees of a quotient, the sequence that tends to e and continuous
   growth next to yearly growth. Terms, recursion, progressions and the
   infinite sum reuse the 3. DBH figures. Formulas sit in their own <text>
   (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Picks the text; the decimal commas of the numbers become the point in Arabic and English */
const useText = (language: UnitLanguage) => {
    const mark = language === 'ar' ? '.' : decimalSeparatorFor(language)
    const d = (text: string) => text.replace(/(\d),(\d)/g, `$1${mark}$2`)
    return { d, mark, t: (text: LocalizedText) => (language === 'ar' ? d(pickText(language, text)) : pickText(language, text)) }
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A stacked fraction centred on x; y is the fraction bar */
function Frac({ x, y, n, d, size = 22, color = INK }: { x: number; y: number; n: string; d: string; size?: number; color?: string }) {
    const half = Math.max(n.length, d.length) * size * 0.3 + 6
    return (
        <g>
            <F x={x} y={y - 7} anchor="middle" size={size} color={color}>{n}</F>
            <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <F x={x} y={y + size + 2} anchor="middle" size={size} color={color}>{d}</F>
        </g>
    )
}

/** The n axis of a plot of terms, with the labels 1, 5 and 10 */
function TermAxis({ x, y, from, to, labels = [1, 5, 10] }: { x: (n: number) => number; y: number; from: number; to: number; labels?: number[] }) {
    return (
        <g>
            <line x1={from} x2={to - 8} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            <polygon points={`${to},${y} ${to - 12},${y - 6} ${to - 12},${y + 6}`} fill={INK} />
            <F x={to} y={y + 30} anchor="end" size={21} color={MUTED} weight={600}>n</F>
            {labels.map((n) => (
                <g key={n}>
                    <line x1={x(n)} x2={x(n)} y1={y - 6} y2={y + 6} stroke={INK} strokeWidth={2} />
                    <F x={x(n)} y={y + 30} anchor="middle" size={21} color={MUTED} weight={600}>{String(n)}</F>
                </g>
            ))}
        </g>
    )
}

const Dot = ({ x, y, color = STAGE }: { x: number; y: number; color?: string }) => <circle cx={x} cy={y} r={7} fill={color} stroke={INK} strokeWidth={1.2} />

/* ---------- Increasing and alternating ---------- */

export function MonotonyFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const terms = [1, 2, 3, 4, 5, 6]
    const ax = (n: number) => 70 + (n - 1) * 50
    const ay = (v: number) => 250 - v * 180
    const bx = (n: number) => 410 + (n - 1) * 54
    const by = (v: number) => 165 - v * 16
    return (
        <Figure height={330} label={t(say('n/(n + 1) gorakorra da eta 1 zenbakira hurbiltzen da; (−1)ⁿ · n segidak zeinua txandakatzen du', 'n/(n + 1) es creciente y se acerca a 1; (−1)ⁿ · n alterna el signo', 'المتتالية الأولى متزايدة وتقترب من 1، والثانية تناوب الإشارة', 'n/(n + 1) increases towards 1; (−1)ⁿ · n alternates the sign'))}>
            <F x={190} y={40} anchor="middle" size={24} color={STAGE}>aₙ = n/(n + 1)</F>
            <line x1={50} x2={340} y1={ay(1)} y2={ay(1)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <F x={40} y={ay(1) + 7} anchor="end" size={21} color={MUTED}>1</F>
            <line x1={50} x2={340} y1={ay(0)} y2={ay(0)} stroke={INK} strokeWidth={2} />
            <F x={40} y={ay(0) + 7} anchor="end" size={21} color={MUTED}>0</F>
            {terms.map((n) => <Dot key={n} x={ax(n)} y={ay(n / (n + 1))} />)}
            <Label x={190} y={285} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{t(say('gorakorra', 'creciente', 'متزايدة', 'increasing'))}</Label>
            <line x1={370} x2={370} y1={30} y2={290} stroke={MUTED} strokeWidth={1} strokeDasharray="3 5" />
            <F x={550} y={40} anchor="middle" size={24} color={SECOND}>bₙ = (−1)ⁿ · n</F>
            <line x1={395} x2={700} y1={by(0)} y2={by(0)} stroke={INK} strokeWidth={2} />
            {terms.map((n) => {
                const v = n % 2 === 0 ? n : -n
                return (
                    <g key={n}>
                        <line x1={bx(n)} x2={bx(n)} y1={by(0)} y2={by(v)} stroke={SECOND} strokeWidth={2} />
                        <Dot x={bx(n)} y={by(v)} color={SECOND} />
                    </g>
                )
            })}
            <Label x={550} y={285} textAnchor="middle" fontSize={21} fontWeight={700} fill={SECOND}>{t(say('txandakatua', 'alternada', 'متناوبة', 'alternating'))}</Label>
            <Caption y={320}>{t(say('Bi gai jarraituren kenduraren zeinuak erabakitzen du', 'Lo decide el signo de la diferencia entre dos términos seguidos', 'إشارة الفرق بين حدين متتاليين هي التي تحدد', 'The sign of the difference between consecutive terms decides'))}</Caption>
        </Figure>
    )
}

/* ---------- A recurring decimal in blocks ---------- */

export function PeriodicFigure({ language }: { language: UnitLanguage }) {
    const { t, d, mark } = useText(language)
    const blocks = [STAGE, SECOND, MUSTARD]
    const tints = [STAGE_TINT, '#f6d5cc', MUSTARD_TINT]
    const rows = [`0${mark}36`, `0${mark}0036`, `0${mark}000036`]
    return (
        <Figure height={370} label={d(t(say('0,363636… = 0,36 + 0,0036 + 0,000036 + … = 4/11', '0,363636… = 0,36 + 0,0036 + 0,000036 + … = 4/11', 'العدد 0,363636… مجموع كتل، كل كتلة هي السابقة مقسومة على 100', '0,363636… = 0,36 + 0,0036 + 0,000036 + … = 4/11')))}>
            <text x={360} y={58} textAnchor="middle" fontSize={46} fontWeight={700} fill={INK} direction="ltr">
                {`0${mark}`}
                {blocks.map((color, index) => <tspan key={index} fill={color}>36</tspan>)}
                …
            </text>
            {rows.map((row, index) => (
                <g key={row}>
                    <rect x={110} y={86 + index * 58} width={330} height={46} rx={10} fill={tints[index]} stroke={INK} strokeWidth={1.4} />
                    <F x={420} y={119 + index * 58} anchor="end" size={30} color={blocks[index]}>{row}</F>
                    {index < 2 && (
                        <g>
                            <path d={`M 452 ${109 + index * 58} q 36 29 0 58`} fill="none" stroke={MUTED} strokeWidth={2.4} />
                            <polygon points={`452,${167 + index * 58} 466,${159 + index * 58} 462,${173 + index * 58}`} fill={MUTED} />
                            <F x={494} y={148 + index * 58} size={28} color={MUTED}>÷ 100</F>
                        </g>
                    )}
                </g>
            ))}
            <Frac x={290} y={296} n="36" d="99" size={30} />
            <F x={360} y={306} anchor="middle" size={32}>=</F>
            <Frac x={430} y={296} n="4" d="11" size={30} color={SECOND} />
            <Caption y={360}>{t(say('Bi zifrako blokea bada, izendatzailea 99 da', 'Si el bloque tiene dos cifras, el denominador es 99', 'إذا كانت الكتلة من رقمين فالمقام 99', 'If the block has two figures, the denominator is 99'))}</Caption>
        </Figure>
    )
}

/* ---------- The sum of the squares ---------- */

export function SquaresPyramidFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const cell = 26
    const base = 210
    const starts = [36, 86, 162, 266]
    return (
        <Figure height={300} label={t(say('1, 4, 9 eta 16 laukiko karratuak: guztira 30', 'Cuadrados de 1, 4, 9 y 16 casillas: 30 en total', 'مربعات من 1 و4 و9 و16 خانة: المجموع 30', 'Squares of 1, 4, 9 and 16 cells: 30 in all'))}>
            {[1, 2, 3, 4].map((side, index) => (
                <g key={side}>
                    {Array.from({ length: side * side }, (_, k) => (
                        <rect key={k} x={starts[index] + (k % side) * cell} y={base - side * cell + Math.floor(k / side) * cell} width={cell} height={cell} fill={index % 2 === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.2} />
                    ))}
                    <F x={starts[index] + (side * cell) / 2} y={base + 34} anchor="middle" size={23}>{`${side}²`}</F>
                </g>
            ))}
            <F x={560} y={70} anchor="middle" size={24}>1 + 4 + 9 + 16 = 30</F>
            <Frac x={560} y={140} n="n(n + 1)(2n + 1)" d="6" size={22} color={STAGE} />
            <Frac x={560} y={210} n="4 · 5 · 9" d="6" size={22} color={SECOND} />
            <F x={640} y={218} size={24} color={SECOND}>= 30</F>
            <Caption y={288}>{t(say('Lau karratuek 30 lauki dituzte; formulak berdin ematen du', 'Los cuatro cuadrados tienen 30 casillas; la fórmula da lo mismo', 'المربعات الأربعة فيها 30 خانة، والصيغة تعطي العدد نفسه', 'The four squares have 30 cells; the formula gives the same'))}</Caption>
        </Figure>
    )
}

/* ---------- Terms that close in on the limit ---------- */

export function ConvergeFigure({ language, band = false }: { language: UnitLanguage; band?: boolean }) {
    const { t } = useText(language)
    const terms = Array.from({ length: 12 }, (_, index) => index + 1)
    const x = (n: number) => 120 + (n - 1) * 48
    if (!band) {
        const y = (v: number) => 260 - (v - 3) * 95
        return (
            <Figure height={360} label={t(say('(3n + 2)/n segidaren gaiak 3 zenbakira hurbiltzen dira', 'Los términos de (3n + 2)/n se acercan a 3', 'حدود المتتالية تقترب من 3', 'The terms of (3n + 2)/n get close to 3'))}>
                <F x={690} y={50} anchor="end" size={24} color={STAGE}>aₙ = (3n + 2)/n</F>
                <line x1={100} x2={700} y1={y(3)} y2={y(3)} stroke={SECOND} strokeWidth={2.5} strokeDasharray="8 6" />
                <F x={90} y={y(3) + 7} anchor="end" size={22} color={SECOND}>3</F>
                <F x={90} y={y(5) + 7} anchor="end" size={21} color={MUTED}>5</F>
                {terms.map((n) => <Dot key={n} x={x(n)} y={y(3 + 2 / n)} />)}
                <TermAxis x={x} y={300} from={100} to={700} />
                <Caption y={350}>{t(say('Gaiak gero eta gertuago daude 3 zenbakitik', 'Los términos se acercan cada vez más a 3', 'تقترب الحدود من 3 أكثر فأكثر', 'The terms get closer and closer to 3'))}</Caption>
            </Figure>
        )
    }
    const limit = 250
    const y = (offset: number) => limit - offset * 90
    const first = terms.find((n) => 2.4 / n < 0.5)!
    return (
        <Figure height={410} label={t(say('N gaitik aurrera, gai guztiak L − ε eta L + ε arteko bandan daude', 'Desde el término N, todos están en la banda entre L − ε y L + ε', 'ابتداءً من الحد N كل الحدود داخل الشريط', 'From term N on, every term is in the band between L − ε and L + ε'))}>
            <rect x={110} y={y(0.5)} width={590} height={y(-0.5) - y(0.5)} fill={MUSTARD_TINT} />
            <line x1={110} x2={700} y1={limit} y2={limit} stroke={SECOND} strokeWidth={2.5} strokeDasharray="8 6" />
            {[[0.5, 'L + ε'], [0, 'L'], [-0.5, 'L − ε']].map(([offset, name]) => (
                <F key={name} x={100} y={y(offset as number) + 9} anchor="end" size={25} color={offset === 0 ? SECOND : MUTED}>{name}</F>
            ))}
            <line x1={x(first)} x2={x(first)} y1={y(2.4 / first)} y2={340} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" />
            {terms.map((n) => <Dot key={n} x={x(n)} y={y(2.4 / n)} color={n >= first ? STAGE : PAPER} />)}
            <TermAxis x={x} y={340} from={110} to={700} labels={[]} />
            <F x={x(first)} y={372} anchor="middle" size={26} color={STAGE}>N</F>
            <Caption y={400}>{t(say('N gaitik aurrera, gai guztiak bandaren barruan', 'Desde el término N, todos dentro de la banda', 'ابتداءً من الحد N كل الحدود داخل الشريط', 'From term N on, every term is inside the band'))}</Caption>
        </Figure>
    )
}

/* ---------- To +∞, to −∞ or oscillating ---------- */

export function InfiniteLimitFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const terms = [1, 2, 3, 4, 5, 6, 7, 8]
    const panel = (left: number) => (n: number) => left + 20 + (n - 1) * 25
    const [ax, bx, cx] = [panel(20), panel(260), panel(500)]
    const ay = (v: number) => 200 - v * 5
    const by = (v: number) => 110 - v * 9
    const cy = (v: number) => 165 - v * 50
    return (
        <Figure height={330} label={t(say('n² − 5n segida +∞ aldera doa, 3 − 2n segida −∞ aldera, eta (−1)ⁿ segidak oszilatu egiten du', 'n² − 5n tiende a +∞, 3 − 2n tiende a −∞ y (−1)ⁿ oscila', 'الأولى تكبر بلا حد، والثانية تصغر بلا حد، والثالثة تتذبذب', 'n² − 5n tends to +∞, 3 − 2n tends to −∞ and (−1)ⁿ oscillates'))}>
            {[[20, 'n² − 5n', ay(0)], [260, '3 − 2n', by(0)], [500, '(−1)ⁿ', cy(0)]].map(([left, name, zero]) => (
                <g key={name}>
                    <F x={(left as number) + 110} y={40} anchor="middle" size={23} color={INK}>{name}</F>
                    <line x1={(left as number) + 8} x2={(left as number) + 212} y1={zero} y2={zero} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 5" />
                </g>
            ))}
            {terms.map((n) => <Dot key={`a${n}`} x={ax(n)} y={ay(n * n - 5 * n)} />)}
            <F x={ax(3)} y={130} anchor="middle" size={26} color={STAGE}>+∞ ↑</F>
            {terms.map((n) => <Dot key={`b${n}`} x={bx(n)} y={by(3 - 2 * n)} color={SECOND} />)}
            <F x={bx(8) + 10} y={262} anchor="end" size={26} color={SECOND}>−∞ ↓</F>
            {terms.map((n) => <Dot key={`c${n}`} x={cx(n)} y={cy(n % 2 === 0 ? 1 : -1)} color={MUSTARD} />)}
            <Label x={610} y={262} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{t(say('oszilatzailea', 'oscilante', 'متذبذبة', 'oscillating'))}</Label>
            <Caption y={316}>{t(say('Hiru portaera: +∞, −∞ edo limiterik gabe', 'Tres comportamientos: +∞, −∞ o sin límite', 'ثلاث حالات: تكبر بلا حد، أو تصغر بلا حد، أو بلا نهاية', 'Three behaviours: +∞, −∞ or no limit'))}</Caption>
        </Figure>
    )
}

/* ---------- The degrees of a quotient ---------- */

export function QuotientLimitFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const rows: Array<{ n: string; d: string; top: number; bottom: number; limit: string; color: string }> = [
        { n: '6n² − n', d: '2n² + 5', top: 2, bottom: 2, limit: '3', color: STAGE },
        { n: 'n + 4', d: 'n²', top: 1, bottom: 2, limit: '0', color: MUSTARD },
        { n: 'n³', d: '10n + 1', top: 3, bottom: 1, limit: '+∞', color: SECOND }
    ]
    return (
        <Figure height={380} label={t(say('Mailak alderatu: berdinak, 3; behean handiagoa, 0; goian handiagoa, +∞', 'Comparar grados: iguales, 3; mayor abajo, 0; mayor arriba, +∞', 'قارن الدرجتين لتعرف النهاية', 'Compare the degrees: equal, 3; higher below, 0; higher on top, +∞'))}>
            <Label x={350} y={38} textAnchor="middle" fontSize={24} fontWeight={700} fill={MUTED}>{t(say('maila', 'grado', 'الدرجة', 'degree'))}</Label>
            <Label x={610} y={38} textAnchor="middle" fontSize={24} fontWeight={700} fill={MUTED}>{t(say('limitea', 'límite', 'النهاية', 'limit'))}</Label>
            {rows.map((row, index) => {
                const y = 108 + index * 96
                return (
                    <g key={row.n}>
                        <Frac x={150} y={y} n={row.n} d={row.d} size={30} />
                        {Array.from({ length: row.top }, (_, k) => <rect key={`t${k}`} x={290 + k * 34} y={y - 36} width={28} height={28} rx={5} fill={row.color} stroke={INK} strokeWidth={1.4} />)}
                        {Array.from({ length: row.bottom }, (_, k) => <rect key={`b${k}`} x={290 + k * 34} y={y + 8} width={28} height={28} rx={5} fill={PAPER} stroke={INK} strokeWidth={1.4} />)}
                        <line x1={280} x2={410} y1={y} y2={y} stroke={MUTED} strokeWidth={1.6} />
                        <F x={490} y={y + 11} anchor="middle" size={32} color={MUTED}>→</F>
                        <F x={610} y={y + 13} anchor="middle" size={40} color={row.color}>{row.limit}</F>
                    </g>
                )
            })}
            <Caption y={366}>{t(say('Maila handiena duenak agintzen du', 'Manda el de mayor grado', 'الحد ذو الدرجة الأكبر هو الغالب', 'The higher degree wins'))}</Caption>
        </Figure>
    )
}

/* ---------- The sequence that tends to e ---------- */

export function ENumberFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const terms = Array.from({ length: 12 }, (_, index) => index + 1)
    const x = (n: number) => 120 + (n - 1) * 48
    const y = (v: number) => 270 - (v - 2) * 260
    return (
        <Figure height={370} label={d(t(say('(1 + 1/n)ⁿ gorakorra da eta e ≈ 2,718 zenbakira hurbiltzen da', '(1 + 1/n)ⁿ crece y se acerca a e ≈ 2,718', 'المتتالية تتزايد وتقترب من e ≈ 2,718', '(1 + 1/n)ⁿ increases towards e ≈ 2,718')))}>
            <F x={120} y={44} size={24} color={STAGE}>(1 + 1/n)ⁿ</F>
            <F x={690} y={60} anchor="end" size={24} color={SECOND}>{d('e ≈ 2,718…')}</F>
            <line x1={100} x2={700} y1={y(Math.E)} y2={y(Math.E)} stroke={SECOND} strokeWidth={2.5} strokeDasharray="8 6" />
            <F x={90} y={y(Math.E) + 7} anchor="end" size={22} color={SECOND}>e</F>
            <F x={90} y={y(2) + 7} anchor="end" size={21} color={MUTED}>2</F>
            {terms.map((n) => <Dot key={n} x={x(n)} y={y((1 + 1 / n) ** n)} />)}
            <TermAxis x={x} y={305} from={100} to={700} />
            <Caption y={360}>{t(say('Gorakorra da, baina ez da inoiz e zenbakira iristen', 'Crece, pero nunca llega a e', 'تتزايد لكنها لا تبلغ e أبدًا', 'It increases but never reaches e'))}</Caption>
        </Figure>
    )
}

/* ---------- Continuous growth next to yearly growth ---------- */

export function ContinuousGrowthFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const x = (years: number) => 90 + years * 58
    const y = (money: number) => 290 - (money - 500) * 0.5
    const euros = (value: string) => (language === 'en' ? `€${d(value)}` : `${d(value)} €`)
    const curve = Array.from({ length: 51 }, (_, k) => {
        const years = k / 5
        return `${k === 0 ? 'M' : 'L'} ${x(years).toFixed(1)} ${y(500 * Math.exp(0.06 * years)).toFixed(1)}`
    }).join(' ')
    const stairs = Array.from({ length: 10 }, (_, k) => {
        const level = y(500 * 1.06 ** k)
        const next = y(500 * 1.06 ** (k + 1))
        return `${k === 0 ? 'M' : 'L'} ${x(k)} ${level.toFixed(1)} L ${x(k + 1)} ${level.toFixed(1)} L ${x(k + 1)} ${next.toFixed(1)}`
    }).join(' ')
    return (
        <Figure height={360} label={d(t(say('500 € 10 urtez: interes jarraituarekin 911,06 €, urterokoarekin 895,42 €', '500 € durante 10 años: con interés continuo 911,06 €, con interés anual 895,42 €', 'بعد 10 سنوات: الفائدة المستمرة تعطي أكثر قليلًا من السنوية', '€500 for 10 years: €911,06 with continuous interest, €895,42 with yearly interest')))}>
            <path d={stairs} fill="none" stroke={SECOND} strokeWidth={2.5} strokeDasharray="6 4" />
            <path d={curve} fill="none" stroke={STAGE} strokeWidth={3.5} />
            <circle cx={x(10)} cy={y(911.06)} r={7} fill={STAGE} stroke={INK} strokeWidth={1.2} />
            <line x1={110} x2={150} y1={46} y2={46} stroke={STAGE} strokeWidth={3.5} />
            <Label x={162} y={53} fontSize={21} fontWeight={700} fill={STAGE}>{t(say(`jarraitua: ${euros('911,06')}`, `continuo: ${euros('911,06')}`, `مستمرة: ${euros('911,06')}`, `continuous: ${euros('911,06')}`))}</Label>
            <line x1={110} x2={150} y1={82} y2={82} stroke={SECOND} strokeWidth={2.5} strokeDasharray="6 4" />
            <Label x={162} y={89} fontSize={21} fontWeight={700} fill={SECOND}>{t(say(`urterokoa: ${euros('895,42')}`, `anual: ${euros('895,42')}`, `سنوية: ${euros('895,42')}`, `yearly: ${euros('895,42')}`))}</Label>
            <F x={80} y={y(500) + 7} anchor="end" size={21} color={MUTED}>500</F>
            <TermAxis x={x} y={310} from={90} to={700} labels={[0, 5, 10]} />
            <Caption y={352}>{t(say('Interes jarraituak urterokoak baino pixka bat gehiago ematen du', 'El interés continuo da un poco más que el anual', 'الفائدة المستمرة تعطي أكثر قليلًا من السنوية', 'Continuous interest gives a little more than yearly interest'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function BachSequencesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={62} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">1, 1, 2, 3, 5, 8</text>
                    <text x={110} y={108} textAnchor="middle" fontSize={26} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">φ ≈ 1.618</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={70} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">aₙ → L</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">S∞ = a₁/(1 − r)</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">(1 + 1/n)ⁿ</text>
                    <text x={115} y={102} textAnchor="middle" fontSize={26} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">→ e</text>
                </g>
            </svg>
        </div>
    )
}
