import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — the new lesson
   figures: the rules of powers with a factorization, fractional exponents
   as a ladder, equivalent radicals and a common index, products of
   radicals with different indexes, the three ways to rationalize, the
   ladder of powers of 2 read as logarithms, the properties of logarithms
   and the change of base. Powers, scientific notation, roots, extracting
   factors and like radicals reuse the 4. DBH aplikatuak figures. Formulas
   sit in their own <text> (left to right in every language); words go
   through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

/** Picks the text and, in Arabic, writes decimal commas as points */
const useText = (language: UnitLanguage) => {
    const arabic = language === 'ar'
    const d = (text: string) => (arabic ? text.replace(/(\d),(\d)/g, '$1.$2') : text)
    return { d, t: (text: LocalizedText) => d(pickText(language, text)) }
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={16} fill={tint} stroke={INK} strokeWidth={1.8} />
            {children}
        </g>
    )
}

/** A stacked fraction drawn with text, centred on x; y is the bar */
function Frac({ x, y, n, d, size = 20, color = INK }: { x: number; y: number; n: ReactNode; d: ReactNode; size?: number; color?: string }) {
    const half = Math.max(String(n).length, String(d).length) * size * 0.3 + 6
    return (
        <g>
            <F x={x} y={y - 7} anchor="middle" size={size} color={color}>{n}</F>
            <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <F x={x} y={y + size + 2} anchor="middle" size={size} color={color}>{d}</F>
        </g>
    )
}

/** A raised exponent inside a <text>: base, then the small exponent, then back to the line */
const Up = ({ children }: { children: ReactNode }) => (
    <>
        <tspan dy={-11} fontSize="0.62em">{children}</tspan>
        <tspan dy={11}>{'\u200a'}</tspan>
    </>
)

const Arrow = ({ x1, x2, y, color = MUTED }: { x1: number; x2: number; y: number; color?: string }) => (
    <g>
        <line x1={x1} x2={x2 - 8} y1={y} y2={y} stroke={color} strokeWidth={2} />
        <polygon points={`${x2},${y} ${x2 - 10},${y - 6} ${x2 - 10},${y + 6}`} fill={color} />
    </g>
)

/* ---------- Rules of powers ---------- */

export function PowerRulesFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const rules = [
        { rule: 'aᵐ · aⁿ = aᵐ⁺ⁿ', example: '2³ · 2⁴ = 2⁷', name: say('Oinarri bera: batu', 'Misma base: suma', 'الأساس نفسه: اجمع') },
        { rule: 'aᵐ : aⁿ = aᵐ⁻ⁿ', example: '5² : 5⁶ = 5⁻⁴', name: say('Oinarri bera: kendu', 'Misma base: resta', 'الأساس نفسه: اطرح') },
        { rule: '(aᵐ)ⁿ = aᵐ·ⁿ', example: '(3²)⁻³ = 3⁻⁶', name: say('Berreturaren berretura', 'Potencia de potencia', 'قوة القوة') }
    ]
    return (
        <Figure height={290} label={t(say('Berreturen propietateak eta faktorizazioa', 'Propiedades de las potencias y factorización', 'خصائص القوى والتحليل'))}>
            {rules.map((item, index) => (
                <Card key={index} x={24 + index * 228} y={20} width={216} height={124} tint={index === 1 ? MUSTARD_TINT : STAGE_TINT}>
                    <Label x={132 + index * 228} y={48} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{t(item.name)}</Label>
                    <F x={132 + index * 228} y={88} anchor="middle" size={21}>{item.rule}</F>
                    <F x={132 + index * 228} y={124} anchor="middle" size={18} color={SECOND}>{item.example}</F>
                </Card>
            ))}
            <Label x={40} y={182} fontSize={15} fontWeight={700} fill={INK}>{t(say('Oinarri desberdinak: faktorizatu lehenik', 'Bases distintas: factoriza primero', 'أسس مختلفة: حلّل أولًا'))}</Label>
            <F x={40} y={220} size={19}>12³ : 6² = (2² · 3)³ : (2 · 3)² = 2⁶ · 3³ : (2² · 3²)</F>
            <F x={40} y={254} size={21} color={SECOND}>= 2⁴ · 3 = 48</F>
            <Caption y={282}>{t(say('a⁻ⁿ = 1/aⁿ · (a/b)⁻ⁿ = (b/a)ⁿ · a⁰ = 1', 'a⁻ⁿ = 1/aⁿ · (a/b)⁻ⁿ = (b/a)ⁿ · a⁰ = 1', 'a⁻ⁿ = 1/aⁿ · (a/b)⁻ⁿ = (b/a)ⁿ · a⁰ = 1'))}</Caption>
        </Figure>
    )
}

/* ---------- Fractional exponents ---------- */

export function FractionalFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const rungs = [
        { power: '1/3', radical: '∛8', value: '2' },
        { power: '2/3', radical: '∛8² = (∛8)²', value: '4' },
        { power: '4/3', radical: '∛8⁴ = (∛8)⁴', value: '16' },
        { power: '−1/3', radical: '1 / ∛8', value: '1/2' }
    ]
    return (
        <Figure height={290} label={t(say('Berretzaile zatikia eta erradikala', 'Exponente fraccionario y radical', 'الأس الكسري والجذر'))}>
            <Card x={30} y={18} width={660} height={62} tint={MUSTARD_TINT}>
                <F x={360} y={60} anchor="middle" size={26}>a<Up>m/n</Up> = ⁿ√aᵐ = (ⁿ√a)ᵐ</F>
            </Card>
            {rungs.map((rung, index) => (
                <g key={index}>
                    <F x={80} y={124 + index * 40} size={21} color={STAGE}>8<Up>{rung.power}</Up></F>
                    <Arrow x1={160} x2={210} y={117 + index * 40} />
                    <F x={226} y={124 + index * 40} size={20}>{rung.radical}</F>
                    <Arrow x1={470} x2={520} y={117 + index * 40} />
                    <F x={540} y={124 + index * 40} size={21} color={SECOND}>{rung.value}</F>
                </g>
            ))}
            <Caption y={280}>{t(say('Izendatzailea indizea da, eta zenbakitzailea errokizunaren berretzailea', 'El denominador es el índice y el numerador el exponente del radicando', 'المقام هو الدليل والبسط أس ما تحت الجذر'))}</Caption>
        </Figure>
    )
}

/* ---------- Equivalent radicals and a common index ---------- */

export function EquivalentFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={290} label={t(say('Erradikal baliokideak eta indize komuna', 'Radicales equivalentes e índice común', 'الجذور المتكافئة والدليل المشترك'))}>
            <Card x={24} y={20} width={320} height={220} tint={STAGE_TINT}>
                <Label x={44} y={50} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Sinplifikatu: zatitu biak', 'Simplificar: divide los dos', 'التبسيط: اقسم الاثنين'))}</Label>
                <F x={44} y={100} size={24}>⁶√2⁴ = ³√2²</F>
                <F x={44} y={132} size={15} color={MUTED} weight={400}>6 : 2 = 3 · 4 : 2 = 2</F>
                <F x={44} y={182} size={24}>¹²√5⁸ = ³√5²</F>
                <F x={44} y={214} size={15} color={MUTED} weight={400}>12 : 4 = 3 · 8 : 4 = 2</F>
            </Card>
            <Card x={366} y={20} width={330} height={220} tint={MUSTARD_TINT}>
                <Label x={386} y={50} fontSize={15} fontWeight={700} fill={INK}>{t(say('Konparatu: indize komuna', 'Comparar: índice común', 'المقارنة: دليل مشترك'))}</Label>
                <F x={386} y={92} size={18} color={MUTED} weight={400}>m.c.m.(2, 3) = 6</F>
                <F x={386} y={132} size={22}>√2 = ⁶√2³ = ⁶√8</F>
                <F x={386} y={172} size={22}>∛3 = ⁶√3² = ⁶√9</F>
                <F x={386} y={214} size={22} color={SECOND}>⁶√8 &lt; ⁶√9 → √2 &lt; ∛3</F>
            </Card>
            <Caption y={272}>{t(say('ⁿ√aᵐ = ⁿᵏ√aᵐᵏ: indizea eta berretzailea zenbaki berberaz biderkatu edo zatitu', 'ⁿ√aᵐ = ⁿᵏ√aᵐᵏ: multiplica o divide el índice y el exponente por el mismo número', 'ⁿ√aᵐ = ⁿᵏ√aᵐᵏ: اضرب الدليل والأس أو اقسمهما على العدد نفسه'))}</Caption>
        </Figure>
    )
}

/* ---------- Products of radicals ---------- */

export function RadicalProductFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={290} label={t(say('Indize desberdineko erradikalak biderkatu', 'Multiplicar radicales de distinto índice', 'ضرب جذور مختلفة الدليل'))}>
            <Label x={40} y={40} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Indize bera: errokizunak elkartu', 'Mismo índice: junta los radicandos', 'الدليل نفسه: اجمع ما تحت الجذر'))}</Label>
            <F x={40} y={76} size={21}>∛4 · ∛6 = ∛24 = ∛(2³ · 3) = 2∛3</F>
            <Label x={40} y={120} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Indize desberdinak: lehenik indize komuna', 'Índices distintos: primero índice común', 'أدلة مختلفة: أولًا دليل مشترك'))}</Label>
            <F x={40} y={156} size={21}>√2 · ∛3 = ⁶√2³ · ⁶√3² = ⁶√(8 · 9) = ⁶√72</F>
            <Card x={40} y={180} width={300} height={62} tint={MUSTARD_TINT}>
                <F x={190} y={220} anchor="middle" size={21}>(∛5)² = ∛5² = ∛25</F>
            </Card>
            <Card x={380} y={180} width={300} height={62} tint={GREEN_TINT}>
                <F x={530} y={220} anchor="middle" size={21}>√(∛2) = ⁶√2</F>
            </Card>
            <Caption y={272}>{t(say('Berretura: errokizuna ber m. Erroaren erroa: indizeak biderkatu', 'Potencia: el radicando a la m. Raíz de raíz: multiplica los índices', 'القوة: ما تحت الجذر أس m. جذر الجذر: اضرب الأدلة'))}</Caption>
        </Figure>
    )
}

/* ---------- Rationalizing a square root ---------- */

export function RationalizeSquareFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={270} label={t(say('Erro karratu bat arrazionalizatu', 'Racionalizar una raíz cuadrada', 'إنطاق جذر تربيعي'))}>
            <Frac x={90} y={110} n="6" d="√3" size={28} />
            <F x={140} y={120} size={28}>·</F>
            <Frac x={196} y={110} n="√3" d="√3" size={28} color={STAGE} />
            <F x={250} y={120} size={28}>=</F>
            <Frac x={330} y={110} n="6√3" d="√3 · √3" size={28} />
            <F x={418} y={120} size={28}>=</F>
            <Frac x={480} y={110} n="6√3" d="3" size={28} />
            <F x={530} y={120} size={28}>=</F>
            <F x={560} y={120} size={30} color={SECOND}>2√3</F>
            <Label x={196} y={186} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{t(say('= 1: balioa ez da aldatzen', '= 1: el valor no cambia', '= 1: لا تتغيّر القيمة'))}</Label>
            <F x={330} y={186} anchor="middle" size={16} color={MUTED} weight={400}>√3 · √3 = 3</F>
            <Caption y={244}>{t(say('Biderkatu goian eta behean izendatzaileko erroaz: erroa desagertzen da', 'Multiplica arriba y abajo por la raíz del denominador: la raíz desaparece', 'اضرب البسط والمقام في جذر المقام: يختفي الجذر'))}</Caption>
        </Figure>
    )
}

/* ---------- Rationalizing a root of another index ---------- */

export function RationalizeIndexFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={280} label={t(say('Beste indize bateko erroa arrazionalizatu', 'Racionalizar una raíz de otro índice', 'إنطاق جذر من دليل آخر'))}>
            <Frac x={80} y={110} n="5" d="∛2" size={28} />
            <F x={130} y={120} size={28}>·</F>
            <Frac x={196} y={110} n="∛2²" d="∛2²" size={28} color={STAGE} />
            <F x={256} y={120} size={28}>=</F>
            <Frac x={346} y={110} n="5∛4" d="∛2³" size={28} />
            <F x={414} y={120} size={28}>=</F>
            <Frac x={490} y={110} n="5∛4" d="2" size={28} color={SECOND} />
            <Card x={140} y={180} width={440} height={56} tint={MUSTARD_TINT}>
                <F x={360} y={216} anchor="middle" size={20}>ⁿ√aᵐ · ⁿ√aⁿ⁻ᵐ = ⁿ√aⁿ = a</F>
            </Card>
            <Caption y={266}>{t(say('Osatu berretzailea indizeraino: ∛2 bider ∛2² ematen du ∛2³ = 2', 'Completa el exponente hasta el índice: ∛2 por ∛2² da ∛2³ = 2', 'أكمل الأس حتى الدليل: ∛2 في ∛2² يعطي ∛2³ = 2'))}</Caption>
        </Figure>
    )
}

/* ---------- The conjugate ---------- */

export function ConjugateFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={290} label={t(say('Konjokatuaz biderkatu', 'Multiplicar por el conjugado', 'الضرب في المرافق'))}>
            <Frac x={100} y={100} n="1" d="√3 − √2" size={26} />
            <F x={170} y={110} size={26}>·</F>
            <Frac x={250} y={100} n="√3 + √2" d="√3 + √2" size={26} color={STAGE} />
            <F x={330} y={110} size={26}>=</F>
            <Frac x={420} y={100} n="√3 + √2" d="3 − 2" size={26} />
            <F x={496} y={110} size={26}>=</F>
            <F x={526} y={110} size={28} color={SECOND}>√3 + √2</F>
            <Card x={70} y={170} width={580} height={62} tint={MUSTARD_TINT}>
                <F x={360} y={210} anchor="middle" size={21}>(a − b)(a + b) = a² − b² → (√3)² − (√2)² = 1</F>
            </Card>
            <Caption y={268}>{t(say('a − b-ren konjokatua a + b da: biderkatzean, erroak desagertzen dira', 'El conjugado de a − b es a + b: al multiplicar, las raíces desaparecen', 'مرافق a − b هو a + b: عند الضرب تختفي الجذور'))}</Caption>
        </Figure>
    )
}

/* ---------- Logarithm: the ladder of powers ---------- */

export function LogDefinitionFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const x = (exponent: number) => 134 + (exponent + 2) * 74
    const values = ['1/4', '1/2', '1', '2', '4', '8', '16', '32']
    return (
        <Figure height={290} label={t(say('Logaritmoa berretzailea da', 'El logaritmo es el exponente', 'اللوغاريتم هو الأس'))}>
            <Label x={58} y={86} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{t(say('berretzailea', 'exponente', 'الأس'))}</Label>
            <Label x={58} y={152} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{t(say('balioa', 'valor', 'القيمة'))}</Label>
            {values.map((value, index) => {
                const exponent = index - 2
                const highlight = exponent === 5
                return (
                    <g key={index}>
                        <circle cx={x(exponent)} cy={80} r={20} fill={highlight ? STAGE : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <F x={x(exponent)} y={87} anchor="middle" size={18} color={highlight ? PAPER : INK}>{String(exponent).replace('-', '−')}</F>
                        <line x1={x(exponent)} x2={x(exponent)} y1={102} y2={126} stroke={MUTED} strokeWidth={1.4} />
                        <rect x={x(exponent) - 28} y={128} width={56} height={36} rx={8} fill={highlight ? SECOND : CARD} fillOpacity={highlight ? 0.85 : 1} stroke={INK} strokeWidth={1.6} />
                        <F x={x(exponent)} y={153} anchor="middle" size={17} color={highlight ? PAPER : INK}>{value}</F>
                    </g>
                )
            })}
            <F x={360} y={208} anchor="middle" size={22} color={SECOND}>log₂ 32 = 5 ⟺ 2⁵ = 32</F>
            <F x={360} y={242} anchor="middle" size={18} color={MUTED} weight={400}>log₂ (1/4) = −2 · log 1000 = 3 · ln e = 1</F>
            <Caption y={276}>{t(say('logₐ b: a zenbatera jaso behar den b lortzeko. Oinarria positiboa eta 1 ez dena', 'logₐ b: a qué hay que elevar a para obtener b. Base positiva y distinta de 1', 'logₐ b: الأس الذي نرفع إليه a لنحصل على b. الأساس موجب ولا يساوي 1'))}</Caption>
        </Figure>
    )
}

/* ---------- Properties of logarithms ---------- */

export function LogPropertiesFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const rules = [
        { rule: 'log (a · b) = log a + log b', example: 'log 2 + log 50 = log 100 = 2', tint: STAGE_TINT },
        { rule: 'log (a / b) = log a − log b', example: 'log₃ 54 − log₃ 2 = log₃ 27 = 3', tint: MUSTARD_TINT },
        { rule: 'log aⁿ = n · log a', example: 'log₂ 8⁵ = 5 · log₂ 8 = 15', tint: GREEN_TINT }
    ]
    return (
        <Figure height={290} label={t(say('Logaritmoen propietateak', 'Propiedades de los logaritmos', 'خصائص اللوغاريتمات'))}>
            {rules.map((item, index) => (
                <Card key={index} x={30} y={18 + index * 78} width={660} height={66} tint={item.tint}>
                    <F x={54} y={58 + index * 78} size={21}>{item.rule}</F>
                    <F x={670} y={58 + index * 78} anchor="end" size={18} color={SECOND}>{item.example}</F>
                </Card>
            ))}
            <Caption y={272}>{t(say('Biderketa batura bihurtzen da, zatiketa kenketa eta berretura biderketa', 'El producto se convierte en suma, el cociente en resta y la potencia en producto', 'يتحوّل الضرب إلى جمع، والقسمة إلى طرح، والقوة إلى ضرب'))}</Caption>
        </Figure>
    )
}

/* ---------- Change of base ---------- */

export function ChangeBaseFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={290} label={t(say('Oinarri-aldaketa', 'Cambio de base', 'تغيير الأساس'))}>
            <Card x={150} y={18} width={420} height={70} tint={MUSTARD_TINT}>
                <F x={300} y={62} anchor="middle" size={24}>logₐ b =</F>
                <Frac x={440} y={52} n="log b" d="log a" size={22} />
            </Card>
            <F x={60} y={146} size={22}>log₅ 20 =</F>
            <Frac x={220} y={136} n="log 20" d="log 5" size={22} color={STAGE} />
            <F x={286} y={146} size={22}>≈</F>
            <Frac x={360} y={136} n={d('1,301')} d={d('0,699')} size={22} />
            <F x={420} y={146} size={22} color={SECOND}>≈ {d('1,861')}</F>
            <Label x={60} y={210} fontSize={15} fill={MUTED}>{t(say('Egiaztapena:', 'Comprobación:', 'التحقق:'))}</Label>
            <F x={220} y={210} size={20}>5¹ = 5 &lt; 20 &lt; 25 = 5²</F>
            <F x={520} y={210} size={20}>5<Up>{d('1,861')}</Up> ≈ 20</F>
            <Caption y={268}>{t(say('Kalkulagailuak log (10 oinarria) eta ln (e oinarria) ditu; beste oinarriak horiekin kalkulatzen dira', 'La calculadora tiene log (base 10) y ln (base e); las demás bases se calculan con ellas', 'للآلة الحاسبة log (الأساس 10) وln (الأساس e)؛ وتُحسب الأسس الأخرى بهما'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function PowersHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={70} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">2⁻³ = 1/8</text>
                    <text x={110} y={118} textAnchor="middle" fontSize={26} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">8<tspan dy={-12} fontSize={16}>2/3</tspan><tspan dy={12}> = 4</tspan></text>
                </g>
                <g transform="translate(286 40) rotate(4)">
                    <rect width={200} height={120} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={72} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">√2 · ∛3</text>
                </g>
                <g transform="translate(290 190) rotate(-3)">
                    <rect width={190} height={92} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={95} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">6/√3 = 2√3</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={230} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={60} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">log₂ 32 = 5</text>
                    <text x={115} y={104} textAnchor="middle" fontSize={22} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">2⁵ = 32</text>
                </g>
            </svg>
        </div>
    )
}
