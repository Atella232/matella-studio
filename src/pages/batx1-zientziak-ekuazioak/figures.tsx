import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — the new lesson
   figures: the change of variable (each t taken back to its x, or thrown
   out), the absolute value folded up and cut by a horizontal line (two
   solutions, or the interval under the line) and the sign table of a
   product or a quotient. The other lessons reuse the 4. DBH figures.
   Formulas sit in their own <text> (left to right in every language);
   words go through <Label>, and the Arabic captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = 'var(--success-tint, #d9efe2)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={21} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Arrow({ x1, x2, y, color = MUTED }: { x1: number; x2: number; y: number; color?: string }) {
    return (
        <g>
            <line x1={x1} x2={x2 - 10} y1={y} y2={y} stroke={color} strokeWidth={2.4} />
            <polygon points={`${x2},${y} ${x2 - 12},${y - 6} ${x2 - 12},${y + 6}`} fill={color} />
        </g>
    )
}

/* ---------- The change of variable ---------- */

export function ChangeVariableFigure({ language, kind }: { language: UnitLanguage; kind: 'power' | 'exp' }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const power = kind === 'power'
    const rows = power
        ? [
            { t: 't = 8', how: '∛8', x: 'x = 2', kept: true },
            { t: 't = −1', how: '∛(−1)', x: 'x = −1', kept: true }
        ]
        : [
            { t: 't = 4', how: 'log₂ 4', x: 'x = 2', kept: true },
            { t: 't = −3', how: '2ˣ > 0', x: '', kept: false }
        ]
    return (
        <Figure height={330} label={t(power
            ? say('t = x³ aldaketa: t = 8 eta t = −1 balioek x = 2 eta x = −1 ematen dute', 'El cambio t = x³: t = 8 y t = −1 dan x = 2 y x = −1', 'التغيير t = x³: تعطي t = 8 وt = −1 القيمتين x = 2 وx = −1', 'The change t = x³: t = 8 and t = −1 give x = 2 and x = −1')
            : say('t = 2ˣ aldaketa: t = 4 balioak x = 2 ematen du, eta t = −3 baztertzen da', 'El cambio t = 2ˣ: t = 4 da x = 2 y t = −3 se descarta', 'التغيير t = 2ˣ: تعطي t = 4 القيمة x = 2 وتُستبعد t = −3', 'The change t = 2ˣ: t = 4 gives x = 2 and t = −3 is thrown out'))}>
            <F x={360} y={48} anchor="middle" size={28} color={STAGE}>{power ? 't = x³   →   t² − 7t − 8 = 0' : 't = 2ˣ   →   t² − t − 12 = 0'}</F>
            <Label x={150} y={96} textAnchor="middle" fontSize={21} fontWeight={700} fill={MUTED}>{t(say('t aldagaian', 'En t', 'في t', 'In t'))}</Label>
            <Label x={570} y={96} textAnchor="middle" fontSize={21} fontWeight={700} fill={MUTED}>{t(say('x aldagaian', 'En x', 'في x', 'In x'))}</Label>
            {rows.map((row, index) => {
                const y = 150 + index * 88
                return (
                    <g key={row.t}>
                        <rect x={60} y={y - 30} width={180} height={50} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <F x={150} y={y + 4} anchor="middle" size={26}>{row.t}</F>
                        <Arrow x1={252} x2={478} y={y - 5} color={row.kept ? MUTED : SECOND} />
                        <F x={365} y={y - 18} anchor="middle" size={22} color={row.kept ? MUTED : SECOND}>{row.how}</F>
                        {row.kept
                            ? (
                                <g>
                                    <rect x={490} y={y - 30} width={160} height={50} rx={12} fill={GREEN_TINT} stroke={GREEN} strokeWidth={2} />
                                    <F x={570} y={y + 4} anchor="middle" size={26} color={GREEN}>{row.x}</F>
                                </g>
                            )
                            : (
                                <g>
                                    <rect x={490} y={y - 30} width={160} height={50} rx={12} fill={PAPER} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
                                    <line x1={548} x2={592} y1={y - 22} y2={y + 12} stroke={SECOND} strokeWidth={4} strokeLinecap="round" />
                                    <line x1={592} x2={548} y1={y - 22} y2={y + 12} stroke={SECOND} strokeWidth={4} strokeLinecap="round" />
                                </g>
                            )}
                    </g>
                )
            })}
            <Caption y={318}>{t(power
                ? say('t = x³ eginda, t bakoitzak x bat ematen du', 'Con t = x³, cada t da una sola x', 'مع t = x³ يعطي كل t قيمة واحدة لـ x', 'With t = x³, each t gives a single x')
                : say('2ˣ ez da inoiz negatiboa: t = −3 balioak ez du soluziorik ematen', '2ˣ nunca es negativo: t = −3 no da solución', 'لا تكون القوة سالبة أبدًا: لا تعطي القيمة السالبة حلًّا', '2ˣ is never negative: t = −3 gives no solution'))}</Caption>
        </Figure>
    )
}

/* ---------- The absolute value folded up ---------- */

export function AbsoluteFoldFigure({ language, inequality = false }: { language: UnitLanguage; inequality?: boolean }) {
    const t = (text: LocalizedText) => pickText(language, text)
    // |2x − b| = 5: the equation with b = 3, the inequality with b = 1
    const b = inequality ? 1 : 3
    const level = 5
    const X = (x: number) => 90 + (x + 3) * 68
    const Y = (y: number) => 262 - y * 32
    const left = (b - level) / 2
    const right = (b + level) / 2
    const vertex = b / 2
    // The V of |2x − b| up to the height 7, the top of the drawing
    const fold = `M ${X((b - 7) / 2)} ${Y(7)} L ${X(vertex)} ${Y(0)} L ${X((b + 7) / 2)} ${Y(7)}`
    const name = inequality ? '|2x − 1| < 5' : '|2x − 3| = 5'
    const ticks = [-3, -2, -1, 0, 1, 2, 3, 4, 5]
    const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
    return (
        <Figure height={360} label={t(inequality
            ? say('|2x − 1| < 5: zuzenaren azpiko zatia, −2 eta 3 artean', '|2x − 1| < 5: la parte bajo la recta, entre −2 y 3', '|2x − 1| < 5: الجزء تحت المستقيم بين −2 و3', '|2x − 1| < 5: the part under the line, between −2 and 3')
            : say('|2x − 3| = 5: y = 5 zuzenak bi aldiz mozten du, x = −1 eta x = 4 puntuetan', '|2x − 3| = 5: la recta y = 5 corta dos veces, en x = −1 y x = 4', '|2x − 3| = 5: يقطع المستقيم y = 5 المنحنى مرتين عند x = −1 وx = 4', '|2x − 3| = 5: the line y = 5 cuts twice, at x = −1 and x = 4'))}>
            <F x={X(vertex)} y={42} anchor="middle" size={26} color={STAGE}>{name}</F>
            <line x1={X(-3) - 20} x2={X(5) + 20} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={2} />
            {ticks.map((tick) => (
                <g key={tick}>
                    <line x1={X(tick)} x2={X(tick)} y1={Y(0) - 6} y2={Y(0) + 6} stroke={INK} strokeWidth={1.6} />
                    <F x={X(tick)} y={Y(0) + 30} anchor="middle" size={19} color={MUTED} weight={600}>{minus(tick)}</F>
                </g>
            ))}
            <path d={fold} fill="none" stroke={STAGE} strokeWidth={4} strokeLinejoin="round" />
            <line x1={X(-3) - 10} x2={X(5) + 10} y1={Y(level)} y2={Y(level)} stroke={SECOND} strokeWidth={2.4} strokeDasharray="8 6" />
            <F x={X(5) + 14} y={Y(level) + 8} size={22} color={SECOND}>5</F>
            {inequality && <line x1={X(left)} x2={X(right)} y1={Y(0)} y2={Y(0)} stroke={GREEN} strokeWidth={8} strokeLinecap="butt" />}
            {[left, right].map((x) => (
                <g key={x}>
                    <line x1={X(x)} x2={X(x)} y1={Y(level)} y2={Y(0)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
                    <circle cx={X(x)} cy={Y(level)} r={7} fill={SECOND} stroke={INK} strokeWidth={1.2} />
                    <circle cx={X(x)} cy={Y(0)} r={7} fill={inequality ? PAPER : GREEN} stroke={inequality ? GREEN : INK} strokeWidth={inequality ? 3 : 1.2} />
                </g>
            ))}
            <Caption y={346}>{t(inequality
                ? say('Zuzenaren azpiko zatia: tarte bakarra', 'La parte bajo la recta: un solo intervalo', 'الجزء تحت المستقيم: مجال واحد', 'The part under the line: a single interval')
                : say('Zuzena bi aldiz mozten du: bi soluzio', 'La recta corta dos veces: dos soluciones', 'يقطع المستقيم المنحنى مرتين: حلّان', 'The line cuts twice: two solutions'))}</Caption>
        </Figure>
    )
}

/* ---------- The sign table ---------- */

interface SignRow {
    name: string
    /** The root of the factor */
    root: number
    /** In the denominator: its root is a hole */
    below?: boolean
}

export function SignTableFigure({ language, rational = false }: { language: UnitLanguage; rational?: boolean }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const rows: SignRow[] = rational
        ? [{ name: 'x − 1', root: 1 }, { name: 'x + 2', root: -2, below: true }]
        : [{ name: 'x + 2', root: -2 }, { name: 'x', root: 0 }, { name: 'x − 2', root: 2 }]
    const roots = [...new Set(rows.map((row) => row.root))].sort((a, b) => a - b)
    const columns = [200, ...roots.map((_, index) => 200 + ((index + 1) * 490) / (roots.length + 1)), 690]
    // A point inside each interval, to read the signs from
    const samples = [roots[0] - 1, ...roots.slice(1).map((root, index) => (roots[index] + root) / 2), roots[roots.length - 1] + 1]
    const centres = samples.map((_, index) => (columns[index] + columns[index + 1]) / 2)
    const sign = (value: number) => (value > 0 ? '+' : '−')
    const product = (x: number) => rows.reduce((total, row) => total * (x - row.root), 1)
    const rowY = (index: number) => 112 + index * 52
    const total = rowY(rows.length)
    const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
    const name = rational ? '(x − 1)/(x + 2)' : 'x(x − 2)(x + 2)'
    return (
        <Figure height={total + 78} label={t(rational
            ? say('(x − 1)/(x + 2) zatiduraren zeinuen taula: positiboa −2 baino lehen eta 1 ondoren', 'Tabla de signos de (x − 1)/(x + 2): positivo antes de −2 y después de 1', 'جدول إشارات خارج القسمة: موجب قبل −2 وبعد 1', 'Sign table of (x − 1)/(x + 2): positive before −2 and after 1')
            : say('x(x − 2)(x + 2) biderkaduraren zeinuen taula: positiboa −2 eta 0 artean eta 2 ondoren', 'Tabla de signos de x(x − 2)(x + 2): positivo entre −2 y 0 y después de 2', 'جدول إشارات الجداء: موجب بين −2 و0 وبعد 2', 'Sign table of x(x − 2)(x + 2): positive between −2 and 0 and after 2'))}>
            <line x1={200} x2={690} y1={66} y2={66} stroke={INK} strokeWidth={2} />
            {roots.map((root, index) => (
                <g key={root}>
                    <line x1={columns[index + 1]} x2={columns[index + 1]} y1={58} y2={total + 24} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" />
                    <F x={columns[index + 1]} y={46} anchor="middle" size={23}>{minus(root)}</F>
                </g>
            ))}
            {rows.map((row, index) => (
                <g key={row.name}>
                    <F x={180} y={rowY(index) + 8} anchor="end" size={22} color={row.below ? SECOND : INK}>{row.name}</F>
                    {samples.map((x, column) => <F key={column} x={centres[column]} y={rowY(index) + 9} anchor="middle" size={28} color={x - row.root > 0 ? STAGE : SECOND}>{sign(x - row.root)}</F>)}
                    <F x={columns[roots.indexOf(row.root) + 1]} y={rowY(index) + 8} anchor="middle" size={20} color={MUTED}>{row.below ? '∄' : '0'}</F>
                </g>
            ))}
            <line x1={40} x2={690} y1={total - 26} y2={total - 26} stroke={INK} strokeWidth={1.6} />
            <F x={180} y={total + 8} anchor="end" size={22} color={INK}>{name}</F>
            {samples.map((x, column) => {
                const positive = product(x) > 0
                return (
                    <g key={column}>
                        {positive && <rect x={columns[column] + 6} y={total - 20} width={columns[column + 1] - columns[column] - 12} height={40} rx={8} fill={GREEN_TINT} />}
                        <F x={centres[column]} y={total + 10} anchor="middle" size={30} color={positive ? GREEN : SECOND}>{sign(product(x))}</F>
                    </g>
                )
            })}
            <Caption y={total + 62}>{t(say('Soluzioa: + zeinua duten tarteak', 'La solución: los tramos con +', 'الحل: المجالات ذات الإشارة الموجبة', 'The solution: the stretches with +'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function BachEquationsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={64} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x³ − 4x &gt; 0</text>
                    <text x={110} y={108} textAnchor="middle" fontSize={26} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">−  +  −  +</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={70} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">|2x − 3| = 5</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">√(x + 5) − √x = 1</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">4ˣ − 2ˣ − 12 = 0</text>
                    <text x={115} y={102} textAnchor="middle" fontSize={26} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">t = 2ˣ</text>
                </g>
            </svg>
        </div>
    )
}
