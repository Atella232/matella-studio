import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { BOTH_LINES, cloudWithR, LINE_XY, PREFERENCE_TABLE, R_CLOUDS } from './data'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   figures of the lessons that are new in Sociales: four clouds with their
   r to be matched, the line of X on Y drawn solved for y with an estimate
   of x, the two lines crossing at the centre of gravity, and a two-way
   table with its marginal and a conditional column. Each one draws the
   numbers of its lesson's «Let's solve» (data.ts). Formulas sit in their
   own <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const LINE = 'var(--line, #d9d2c3)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A number for the screen: 0,5 in Basque and Spanish, 0.5 in English and Arabic */
const num = (language: UnitLanguage, value: number) => String(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language)).replace(/^-/, '−')

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Axes({ x, y, xs, ys, language, size = 15 }: { x: (value: number) => number; y: (value: number) => number; xs: number[]; ys: number[]; language: UnitLanguage; size?: number }) {
    const [x0, x1] = [x(xs[0]), x(xs[xs.length - 1])]
    const [y0, y1] = [y(ys[0]), y(ys[ys.length - 1])]
    return (
        <g>
            {xs.map((value) => <line key={`gx${value}`} x1={x(value)} x2={x(value)} y1={y0} y2={y1} stroke={LINE} strokeWidth={1} />)}
            {ys.map((value) => <line key={`gy${value}`} x1={x0} x2={x1} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />)}
            <line x1={x0} x2={x1 + 12} y1={y0} y2={y0} stroke={INK} strokeWidth={2} />
            <line x1={x0} x2={x0} y1={y0} y2={y1 - 12} stroke={INK} strokeWidth={2} />
            {xs.map((value) => <F key={`nx${value}`} x={x(value)} y={y0 + 22} size={size} weight={400} color={MUTED}>{num(language, value)}</F>)}
            {ys.map((value) => <F key={`ny${value}`} x={x0 - 10} y={y(value) + 5} size={size} weight={400} color={MUTED} anchor="end">{num(language, value)}</F>)}
            <F x={x1 + 22} y={y0 + 6} size={18}>x</F>
            <F x={x0} y={y1 - 20} size={18}>y</F>
        </g>
    )
}

/* ---------- Four clouds and their r ---------- */

export function RCloudsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const names = ['A', 'C', 'D', 'B']
    // Shown in the order A, C, D, B so that the strongest are not side by side
    const order = [0, 2, 3, 1]
    return (
        <Figure height={250} label={t(say('Lau puntu-hodei, A, B, C eta D, korrelazio desberdinekin', 'Cuatro nubes de puntos, A, B, C y D, con distintas correlaciones', 'أربع سحب نقاط A وB وC وD بارتباطات مختلفة', 'Four scatter plots, A, B, C and D, with different correlations'))}>
            {order.map((cloud, panel) => {
                const points = cloudWithR(R_CLOUDS[cloud])
                const ys = points.map(([, value]) => value)
                const [low, high] = [Math.min(...ys), Math.max(...ys)]
                const left = 14 + panel * 176
                const x = (value: number) => left + 18 + (value - 1) * 15
                const y = (value: number) => 190 - ((value - low) / (high - low || 1)) * 140
                return (
                    <g key={panel}>
                        <rect x={left} y={18} width={164} height={196} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.4} />
                        <F x={left + 20} y={44} size={21} color={STAGE} anchor="start">{names[panel]}</F>
                        <line x1={left + 10} x2={left + 156} y1={202} y2={202} stroke={INK} strokeWidth={1.4} />
                        <line x1={left + 10} x2={left + 10} y1={40} y2={202} stroke={INK} strokeWidth={1.4} />
                        {points.map(([a, b], index) => <circle key={index} cx={x(a)} cy={y(b)} r={5.5} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />)}
                    </g>
                )
            })}
            <Caption y={240}>{t(say('Zeinua: gora ala behera. Indarra: zuzenetik zein hurbil', 'El signo: sube o baja. La fuerza: lo pegados a una recta', 'الإشارة: صعود أم هبوط. والقوة: مدى الالتصاق بمستقيم', 'The sign: rises or falls. The strength: how close to a line'))}</Caption>
        </Figure>
    )
}

/* ---------- The line of X on Y, solved for y ---------- */

export function LineXYFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const { mx, my, vy, cxy, y: given } = LINE_XY
    const slope = vy / cxy
    const line = (value: number) => my + slope * (value - mx)
    const estimate = mx + (cxy / vy) * (given - my)
    const x = (value: number) => 90 + value * 48
    const y = (value: number) => 270 - value * 13
    return (
        <Figure height={330} label={t(say('X-ren Y-rekiko erregresio-zuzena y askatuta, eta y = 14 balioarekin x-ren estimazioa', 'La recta de X sobre Y con y despejada y la estimación de x para y = 14', 'مستقيم انحدار X على Y بعد عزل y وتقدير x عندما y = 14', 'The line of X on Y solved for y, and the estimate of x for y = 14'))}>
            <Axes x={x} y={y} xs={[0, 2, 4, 6, 8, 10, 12]} ys={[0, 4, 8, 12, 16]} language={language} />
            <line x1={x(1)} y1={y(line(1))} x2={x(9.5)} y2={y(line(9.5))} stroke={SECOND} strokeWidth={3} />
            <circle cx={x(mx)} cy={y(my)} r={7} fill={GREEN} stroke={INK} strokeWidth={1.4} />
            <F x={x(mx) + 12} y={y(my) + 22} size={18} color={GREEN} anchor="start">({mx}, {my})</F>
            <line x1={x(0)} x2={x(estimate)} y1={y(given)} y2={y(given)} stroke={STAGE} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={x(estimate)} x2={x(estimate)} y1={y(given)} y2={y(0)} stroke={STAGE} strokeWidth={2} strokeDasharray="6 5" />
            <circle cx={x(estimate)} cy={y(given)} r={7} fill={STAGE} stroke={INK} strokeWidth={1.4} />
            <F x={x(estimate) + 12} y={y(given) + 6} size={18} color={STAGE} anchor="start">x = {estimate}</F>
            <F x={x(9.6)} y={y(line(9.6)) - 6} size={20} color={SECOND} anchor="start">y = {slope}x − {Math.abs(my - slope * mx)}</F>
            <Caption y={318}>{t(say('y ezaguna da: joan zuzeneraino eta jaitsi x-raino', 'Se conoce y: ve hasta la recta y baja hasta x', 'y معلومة: اذهب إلى المستقيم ثم انزل إلى x', 'y is known: go across to the line and down to x'))}</Caption>
        </Figure>
    )
}

/* ---------- The two lines cross at the centre of gravity ---------- */

export function BothLinesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const [m1, b1] = BOTH_LINES.yx
    const [m2, b2] = BOTH_LINES.xy
    const cx = (b2 - b1) / (m1 - m2)
    const cy = m1 * cx + b1
    const x = (value: number) => 90 + value * 62
    const y = (value: number) => 280 - value * 22
    return (
        <Figure height={340} label={t(say('Bi erregresio-zuzenak (4, 7) puntuan ebakitzen dira', 'Las dos rectas de regresión se cortan en (4, 7)', 'يتقاطع مستقيما الانحدار في (4, 7)', 'The two regression lines cross at (4, 7)'))}>
            <Axes x={x} y={y} xs={[0, 2, 4, 6, 8]} ys={[0, 2, 4, 6, 8, 10]} language={language} />
            <line x1={x(0)} y1={y(b1)} x2={x(7.5)} y2={y(m1 * 7.5 + b1)} stroke={STAGE} strokeWidth={3} />
            <line x1={x(0)} y1={y(b2)} x2={x(6.4)} y2={y(m2 * 6.4 + b2)} stroke={SECOND} strokeWidth={3} />
            <circle cx={x(cx)} cy={y(cy)} r={7} fill={GREEN} stroke={INK} strokeWidth={1.4} />
            <F x={x(cx) + 14} y={y(cy) + 24} size={18} color={GREEN} anchor="start">({num(language, cx)}, {num(language, cy)})</F>
            <F x={x(7.6)} y={y(m1 * 7.6 + b1) + 6} size={18} color={STAGE} anchor="start">Y/X</F>
            <F x={x(6.5)} y={y(m2 * 6.5 + b2) - 6} size={18} color={SECOND} anchor="start">X/Y</F>
            <F x={x(0.3)} y={y(9.6)} size={19} color={STAGE} anchor="start">y = {num(language, m1)}x + {num(language, b1)}</F>
            <F x={x(0.3)} y={y(8.6)} size={19} color={SECOND} anchor="start">y = {num(language, m2)}x + {num(language, b2)}</F>
            <Caption y={330}>{t(say('r² = malda txikiena zati handiena', 'r² = pendiente menor entre la mayor', 'r² = الميل الأصغر ÷ الأكبر', 'r² = smaller slope ÷ larger slope'))}</Caption>
        </Figure>
    )
}

/* ---------- A two-way table with its marginal and a conditional ---------- */

export function MarginalTableFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const { marks, cells } = PREFERENCE_TABLE
    const heads = [say('Zinema', 'Cine', 'سينما', 'Cinema'), say('Antzerkia', 'Teatro', 'مسرح', 'Theatre'), say('Kirola', 'Deporte', 'رياضة', 'Sport')]
    const ranges = ['[20,30)', '[30,40)', '[40,50)']
    const column = (index: number) => 250 + index * 104
    const row = (index: number) => 112 + index * 50
    const totals = cells.map((line) => line.reduce((sum, value) => sum + value, 0))
    return (
        <Figure height={330} label={t(say('Adina eta zaletasuna: taula, haren marjinala eta kirolaren zutabea', 'Edad y preferencia: la tabla, su marginal y la columna de deporte', 'العمر والتفضيل: الجدول وتوزيعه الهامشي وعمود الرياضة', 'Age and preference: the table, its marginal and the sport column'))}>
            <rect x={column(2) - 48} y={60} width={96} height={row(2) - 50} rx={8} fill={GREEN_TINT} />
            <rect x={column(3) - 48} y={60} width={96} height={row(2) - 50} rx={8} fill={STAGE_TINT} />
            {heads.map((head, index) => <Label key={index} x={column(index)} y={86} textAnchor="middle" fontSize={17} fontWeight={700} fill={index === 2 ? GREEN : INK}>{t(head)}</Label>)}
            <F x={column(3)} y={86} size={18} color={STAGE}>f</F>
            {ranges.map((range, index) => (
                <g key={range}>
                    <F x={66} y={row(index) + 6} size={18} anchor="start">{range}</F>
                    <F x={168} y={row(index) + 6} size={16} weight={400} color={MUTED}>{marks[index]}</F>
                    {cells[index].map((value, position) => <F key={position} x={column(position)} y={row(index) + 6} size={22} color={position === 2 ? GREEN : INK}>{value}</F>)}
                    <F x={column(3)} y={row(index) + 6} size={22} color={STAGE}>{totals[index]}</F>
                </g>
            ))}
            <line x1={50} x2={680} y1={96} y2={96} stroke={INK} strokeWidth={1.4} />
            <F x={168} y={86} size={16} weight={400} color={MUTED}>xᵢ</F>
            <F x={column(3)} y={row(3) + 4} size={19} color={STAGE}>x̄ = 35, σ = 5</F>
            <F x={column(2)} y={row(3) + 4} size={19} color={GREEN}>x̄ = {num(language, 32.5)}</F>
            <Caption y={316}>{t(say('Urdina: x-ren marjinala. Berdea: kirolari baldintzatutako x', 'Azul: la marginal de x. Verde: x condicionada a deporte', 'الأزرق: هامشي x. الأخضر: x المشروط بالرياضة', 'Blue: the marginal of x. Green: x conditioned on sport'))}</Caption>
        </Figure>
    )
}

/* ---------- The unit's cover ---------- */

export function SocialBivarHeroArt() {
    const points = cloudWithR(0.85)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={240} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {points.map(([a, b], index) => <circle key={index} cx={20 + a * 20} cy={150 - b * 15} r={6} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />)}
                    <line x1={30} y1={150 - 2.75 * 15} x2={220} y2={150 - 7.25 * 15} stroke="#c4432a" strokeWidth={3} />
                </g>
                <g transform="translate(296 40) rotate(4)">
                    <rect width={190} height={120} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={95} y={72} textAnchor="middle" fontSize={30} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">r = 0.85</text>
                </g>
                <g transform="translate(292 200) rotate(-3)">
                    <rect width={196} height={120} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={100} x2={170} y2={30} stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={60} y1={100} x2={140} y2={20} stroke="#c4432a" strokeWidth={3} />
                    <circle cx={100} cy={60} r={6} fill="#267b53" />
                </g>
                <g transform="translate(40 240)">
                    <rect width={226} height={120} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={113} y={70} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">σxy / (σx σy)</text>
                </g>
            </svg>
        </div>
    )
}
