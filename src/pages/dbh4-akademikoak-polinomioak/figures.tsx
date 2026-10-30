import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { RuffiniTable } from '../dbh4-aplikatuak-polinomioak/figures'
import { tartaglia } from './polynomials'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — the new lesson
   figures: Tartaglia's triangle and (a + b)⁴, a remainder with a parameter,
   the order to factorize, the m.c.d. and m.c.m. of two polynomials, where
   an algebraic fraction does not exist, equivalent fractions by crossed
   products, a common denominator, product and quotient, and two taps
   filling one tank. Operations, identities, long division, Ruffini, roots
   and simplifying reuse the 2. DBH and 4. DBH aplikatuak figures. Formulas
   sit in their own <text> (left to right in every language); words go
   through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

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

/** A stacked fraction centred on x; y is the bar; width is the bar length */
function Frac({ x, y, n, d, width, size = 20, color = INK }: { x: number; y: number; n: ReactNode; d: ReactNode; width: number; size?: number; color?: string }) {
    return (
        <g>
            <F x={x} y={y - 8} anchor="middle" size={size} color={color}>{n}</F>
            <line x1={x - width / 2} x2={x + width / 2} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <F x={x} y={y + size + 4} anchor="middle" size={size} color={color}>{d}</F>
        </g>
    )
}

/* ---------- Tartaglia's triangle ---------- */

export function TartagliaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const at = (n: number, k: number) => ({ x: 190 + (k - n / 2) * 46, y: 34 + n * 34 })
    return (
        <Figure height={306} label={t(say('Tartagliaren triangelua eta (a + b)⁴', 'Triángulo de Tartaglia y (a + b)⁴', 'مثلث تارتاليا و(a + b)⁴', 'Tartaglia\'s triangle and (a + b)⁴'))}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
                <g key={n}>
                    <F x={28} y={at(n, 0).y} size={14} color={MUTED} weight={400}>{`n = ${n}`}</F>
                    {n === 4 && <rect x={at(4, 0).x - 22} y={at(4, 0).y - 22} width={4 * 46 + 44} height={30} rx={12} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />}
                    {tartaglia(n).map((value, k) => <F key={k} x={at(n, k).x} y={at(n, k).y} anchor="middle" size={18} color={n === 3 && k > 0 && k < 3 ? STAGE : n === 4 && k === 2 ? SECOND : INK}>{value}</F>)}
                </g>
            ))}
            <path d={`M${at(3, 1).x + 6} ${at(3, 1).y + 6} L${at(4, 2).x - 6} ${at(4, 2).y - 16}`} stroke={STAGE} strokeWidth={1.6} />
            <path d={`M${at(3, 2).x - 6} ${at(3, 2).y + 6} L${at(4, 2).x + 6} ${at(4, 2).y - 16}`} stroke={STAGE} strokeWidth={1.6} />
            <Card x={410} y={22} width={290} height={150} tint={STAGE_TINT}>
                <Label x={555} y={52} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{t(say('Zenbaki bakoitza: goiko bien batura', 'Cada número: suma de los dos de arriba', 'كل عدد: مجموع العددين فوقه', 'Each number: the sum of the two above it.'))}</Label>
                <F x={555} y={88} anchor="middle" size={22} color={SECOND}>3 + 3 = 6</F>
                <Label x={555} y={124} textAnchor="middle" fontSize={14} fill={INK}>{t(say('a-ren berretzailea jaitsi, b-rena igo', 'El exponente de a baja, el de b sube', 'أس a ينقص وأس b يزيد', 'The exponent of a goes down, the exponent of b goes up.'))}</Label>
                <F x={555} y={156} anchor="middle" size={16} color={MUTED} weight={400}>a⁴ · a³b · a²b² · ab³ · b⁴</F>
            </Card>
            <F x={360} y={258} anchor="middle" size={21}>(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴</F>
            <Caption y={292}>{t(say('n. errenkada: (a + b)ⁿ garapenaren koefizienteak', 'Fila n: los coeficientes de (a + b)ⁿ', 'الصف n: معاملات نشر (a + b)ⁿ', 'Row n: the coefficients of (a + b)ⁿ'))}</Caption>
        </Figure>
    )
}

/* ---------- A remainder with a parameter ---------- */

export function ParameterFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('P(x) = 7x³ − 5mx − 2 eta (x + 1): hondarra 5m − 9', 'P(x) = 7x³ − 5mx − 2 entre x + 1: resto 5m − 9', 'P(x) = 7x³ − 5mx − 2 على x + 1: الباقي 5m − 9', 'P(x) = 7x³ − 5mx − 2 divided by x + 1: remainder 5m − 9'))}>
            <F x={360} y={30} anchor="middle" size={20}>P(x) = 7x³ − 5mx − 2</F>
            <RuffiniTable x={90} y={84} root="−1" top={['7', '0', '−5m', '−2']} middle={['', '−7', '7', '5m − 7']} bottom={['7', '−7', '−5m + 7', '5m − 9']} cell={92} />
            <Label x={530} y={128} fontSize={14} fill={MUTED}>{t(say('hondarra', 'resto', 'الباقي', 'remainder'))}</Label>
            <F x={360} y={226} anchor="middle" size={22} color={STAGE}>5m − 9 = −4   →   m = 1</F>
            <Caption y={268}>{t(say('Hondarrak −4 izan behar badu: berdindu eta askatu m', 'Si el resto debe ser −4: se iguala y se despeja m', 'إذا وجب أن يكون الباقي −4: نساوي ونستخرج m', 'If the remainder must be −4: set it equal to −4 and solve for m.'))}</Caption>
            <Caption y={290}>{t(say('Hondarra = P(−1), hondarraren teoremagatik', 'Resto = P(−1), por el teorema del resto', 'الباقي = P(−1) بحسب مبرهنة الباقي', 'Remainder = P(−1), by the remainder theorem.'))}</Caption>
        </Figure>
    )
}

/* ---------- The order to factorize ---------- */

export function FactorStrategyFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [
        { step: say('Polinomioa', 'El polinomio', 'الحدودية', 'The polynomial'), math: 'x⁴ + 2x³ − 23x² − 60x', tint: PAPER },
        { step: say('1. Faktore komuna', '1. Factor común', '1. العامل المشترك', '1. Common factor'), math: '= x(x³ + 2x² − 23x − 60)', tint: STAGE_TINT },
        { step: say('2. Ruffini: x = 5', '2. Ruffini: x = 5', '2. روفيني: x = 5', '2. Ruffini: x = 5'), math: '= x(x − 5)(x² + 7x + 12)', tint: MUSTARD_TINT },
        { step: say('3. 2. mailako ekuazioa', '3. Ecuación de 2.º grado', '3. معادلة الدرجة الثانية', '3. Quadratic equation'), math: '= x(x − 5)(x + 3)(x + 4)', tint: GREEN_TINT }
    ]
    return (
        <Figure height={300} label={t(say('x⁴ + 2x³ − 23x² − 60x = x(x − 5)(x + 3)(x + 4)', 'x⁴ + 2x³ − 23x² − 60x = x(x − 5)(x + 3)(x + 4)', 'x⁴ + 2x³ − 23x² − 60x = x(x − 5)(x + 3)(x + 4)', 'x⁴ + 2x³ − 23x² − 60x = x(x − 5)(x + 3)(x + 4)'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <Card x={20} y={16 + index * 58} width={230} height={46} tint={row.tint}>
                        <Label x={135} y={45 + index * 58} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{t(row.step)}</Label>
                    </Card>
                    <F x={270} y={46 + index * 58} size={21} color={index === 3 ? GREEN : INK}>{row.math}</F>
                </g>
            ))}
            <Caption y={262}>{t(say('Ordena: faktore komuna → identitateak → Ruffini → 2. mailako ekuazioa', 'Orden: factor común → identidades → Ruffini → ecuación de 2.º grado', 'الترتيب: العامل المشترك ← المتطابقات ← روفيني ← معادلة الدرجة الثانية', 'Order: common factor → identities → Ruffini → quadratic equation'))}</Caption>
            <Caption y={286}>{t(say('Erroak: 0, 5, −3 eta −4', 'Raíces: 0, 5, −3 y −4', 'الجذور: 0 و5 و−3 و−4', 'Roots: 0, 5, −3 and −4'))}</Caption>
        </Figure>
    )
}

/* ---------- m.c.d. and m.c.m. of two polynomials ---------- */

export function GcdLcmFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const chip = (x: number, y: number, text: string, common: boolean) => (
        <g key={`${x}-${y}`}>
            <rect x={x} y={y - 26} width={86} height={36} rx={10} fill={common ? GREEN_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
            <F x={x + 43} y={y} anchor="middle" size={19}>{text}</F>
        </g>
    )
    return (
        <Figure height={310} label={t(say('P = x(x − 2)(x − 5), Q = x²(x − 5): z.k.h. x(x − 5), m.k.t. x²(x − 2)(x − 5)', 'P = x(x − 2)(x − 5), Q = x²(x − 5): m.c.d. x(x − 5), m.c.m. x²(x − 2)(x − 5)', 'P = x(x − 2)(x − 5)، Q = x²(x − 5): ق.م.أ x(x − 5)، م.م.أ x²(x − 2)(x − 5)', 'P = x(x − 2)(x − 5), Q = x²(x − 5): GCD x(x − 5), LCM x²(x − 2)(x − 5)'))}>
            <F x={30} y={50} size={18}>P = x³ − 7x² + 10x =</F>
            {chip(250, 50, 'x', true)}{chip(346, 50, 'x − 2', false)}{chip(442, 50, 'x − 5', true)}
            <F x={30} y={104} size={18}>Q = x³ − 5x² =</F>
            {chip(250, 104, 'x²', true)}{chip(442, 104, 'x − 5', true)}
            <Card x={20} y={134} width={330} height={110} tint={STAGE_TINT}>
                <Label x={185} y={162} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Z.K.H.: komunak, berretzaile txikiena', 'M.C.D.: comunes, menor exponente', 'ق.م.أ: المشتركة بأصغر أس', 'GCD: common factors, lowest exponent'))}</Label>
                <F x={185} y={210} anchor="middle" size={22} color={SECOND}>x(x − 5)</F>
            </Card>
            <Card x={370} y={134} width={330} height={110} tint={MUSTARD_TINT}>
                <Label x={535} y={162} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('M.K.T.: denak, berretzaile handiena', 'M.C.M.: todos, mayor exponente', 'م.م.أ: الكل بأكبر أس', 'LCM: all factors, highest exponent'))}</Label>
                <F x={535} y={210} anchor="middle" size={22} color={SECOND}>x²(x − 2)(x − 5)</F>
            </Card>
            <Caption y={282}>{t(say('Lehenik faktorizatu bi polinomioak, zenbakiekin bezala', 'Primero factoriza los dos polinomios, como con los números', 'حلّل الحدوديتين أولًا كما في الأعداد', 'First factorise both polynomials, as you do with numbers.'))}</Caption>
        </Figure>
    )
}

/* ---------- Where a fraction does not exist ---------- */

export function DomainFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const ox = 360
    const unit = 50
    return (
        <Figure height={300} label={t(say('(x + 1)/(x² − 4) ez dago x = 2 eta x = −2 puntuetan', '(x + 1)/(x² − 4) no existe en x = 2 ni en x = −2', '(x + 1)/(x² − 4) غير معرّف عند x = 2 وx = −2', '(x + 1)/(x² − 4) does not exist at x = 2 or at x = −2'))}>
            <Frac x={110} y={66} n="x + 1" d="x² − 4" width={110} size={24} />
            <F x={190} y={74} size={24} color={MUTED}>→</F>
            <F x={230} y={74} size={21}>x² − 4 = (x + 2)(x − 2) = 0</F>
            <line x1={ox - 6 * unit} x2={ox + 6 * unit} y1={160} y2={160} stroke={INK} strokeWidth={2} />
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((k) => (
                <g key={k}>
                    <line x1={ox + k * unit} x2={ox + k * unit} y1={153} y2={167} stroke={INK} strokeWidth={1.4} />
                    <F x={ox + k * unit} y={190} anchor="middle" size={14} color={MUTED} weight={400}>{k < 0 ? `−${-k}` : `${k}`}</F>
                </g>
            ))}
            {[-2, 2].map((k) => <circle key={k} cx={ox + k * unit} cy={160} r={8} fill={PAPER} stroke={SECOND} strokeWidth={3} />)}
            <F x={ox + 3 * unit} y={140} anchor="middle" size={16} color={GREEN}>4/5</F>
            <circle cx={ox + 3 * unit} cy={160} r={6} fill={GREEN} />
            <F x={360} y={232} anchor="middle" size={20} color={STAGE}>x = 3:  (3 + 1)/(9 − 4) = 4/5</F>
            <Caption y={270}>{t(say('Izendatzailea 0 egiten duten balioetan zatikiak ez du baliorik', 'En los valores que anulan el denominador la fracción no tiene valor', 'عند القيم التي تعدم المقام لا قيمة للكسر', 'At the values that make the denominator 0, the fraction has no value.'))}</Caption>
            <Caption y={292}>{t(say('Beste edozein x-rentzat, zenbakizko balioa kalkulatzen da', 'Para cualquier otro x, se calcula su valor numérico', 'ولأي x آخر نحسب قيمته العددية', 'For any other x, work out its numerical value.'))}</Caption>
        </Figure>
    )
}

/* ---------- Equivalent fractions ---------- */

export function EquivalentFractionsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={290} label={t(say('x/(x + 1) eta (x² − x)/(x² − 1) baliokideak dira', 'x/(x + 1) y (x² − x)/(x² − 1) son equivalentes', 'x/(x + 1) و(x² − x)/(x² − 1) متكافئان', 'x/(x + 1) and (x² − x)/(x² − 1) are equivalent'))}>
            <Frac x={200} y={70} n="x" d="x + 1" width={90} size={24} />
            <F x={300} y={78} anchor="middle" size={24} color={MUTED}>=</F>
            <Frac x={420} y={70} n="x² − x" d="x² − 1" width={110} size={24} />
            <line x1={232} x2={372} y1={40} y2={102} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={232} x2={372} y1={102} y2={40} stroke={STAGE} strokeWidth={2} strokeDasharray="6 5" />
            <F x={500} y={60} size={17} color={SECOND}>x(x² − 1)</F>
            <F x={500} y={104} size={17} color={STAGE}>(x + 1)(x² − x)</F>
            <Card x={60} y={138} width={600} height={70} tint={GREEN_TINT}>
                <F x={360} y={182} anchor="middle" size={21}>x³ − x  =  x³ − x</F>
            </Card>
            <Caption y={244}>{t(say('P/Q eta R/S baliokideak dira P · S = Q · R bada', 'P/Q y R/S son equivalentes si P · S = Q · R', 'P/Q وR/S متكافئان إذا كان P · S = Q · R', 'P/Q and R/S are equivalent if P · S = Q · R'))}</Caption>
            <Caption y={268}>{t(say('Sinplifikatuz ere ikusten da: (x² − x)/(x² − 1) = x/(x + 1)', 'También al simplificar: (x² − x)/(x² − 1) = x/(x + 1)', 'ويظهر كذلك بالتبسيط: (x² − x)/(x² − 1) = x/(x + 1)', 'Also when you simplify: (x² − x)/(x² − 1) = x/(x + 1)'))}</Caption>
        </Figure>
    )
}

/* ---------- A common denominator ---------- */

export function CommonDenominatorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('2/x + 1/(x + 1) = (3x + 2)/(x(x + 1))', '2/x + 1/(x + 1) = (3x + 2)/(x(x + 1))', '2/x + 1/(x + 1) = (3x + 2)/(x(x + 1))', '2/x + 1/(x + 1) = (3x + 2)/(x(x + 1))'))}>
            <Frac x={70} y={60} n="2" d="x" width={40} size={24} />
            <F x={110} y={68} anchor="middle" size={24}>+</F>
            <Frac x={160} y={60} n="1" d="x + 1" width={76} size={24} />
            <F x={222} y={68} anchor="middle" size={24} color={MUTED}>=</F>
            <Frac x={318} y={60} n="2(x + 1)" d="x(x + 1)" width={120} size={22} />
            <F x={398} y={68} anchor="middle" size={24}>+</F>
            <Frac x={470} y={60} n="x" d="x(x + 1)" width={110} size={22} />
            <F x={540} y={68} anchor="middle" size={24} color={MUTED}>=</F>
            <Frac x={622} y={60} n="3x + 2" d="x(x + 1)" width={110} size={22} color={GREEN} />
            <Card x={150} y={128} width={420} height={56} tint={MUSTARD_TINT}>
                <Label x={360} y={162} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{t(say('M.K.T. = x(x + 1)', 'M.C.M. = x(x + 1)', 'م.م.أ = x(x + 1)', 'LCM = x(x + 1)'))}</Label>
            </Card>
            <Caption y={226}>{t(say('Izendatzaileen m.k.t.-a bilatu, eta zenbakitzaile bakoitza falta zaionaz biderkatu', 'Busca el m.c.m. de los denominadores y multiplica cada numerador por lo que le falta', 'ابحث عن م.م.أ للمقامات واضرب كل بسط فيما ينقصه', 'Find the LCM of the denominators and multiply each numerator by whatever its denominator is missing.'))}</Caption>
            <Caption y={250}>{t(say('Gero zenbakitzaileak batu edo kendu', 'Después suma o resta los numeradores', 'ثم اجمع البسوط أو اطرحها', 'Then add or subtract the numerators.'))}</Caption>
            <Caption y={278}>{t(say('Kentzean, parentesia: −(x − 1) = −x + 1', 'Al restar, paréntesis: −(x − 1) = −x + 1', 'عند الطرح استعمل القوس: −(x − 1) = −x + 1', 'When subtracting, use brackets: −(x − 1) = −x + 1'))}</Caption>
        </Figure>
    )
}

/* ---------- Product and quotient ---------- */

export function FractionProductFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={310} label={t(say('Zatiki aljebraikoen biderkadura eta zatidura', 'Producto y cociente de fracciones algebraicas', 'ضرب الكسور الجبرية وقسمتها', 'Product and quotient of algebraic fractions'))}>
            <Card x={14} y={14} width={692} height={124} tint={STAGE_TINT}>
                <Label x={30} y={42} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Biderkadura: goikoak bider goikoak, behekoak bider behekoak', 'Producto: arriba por arriba, abajo por abajo', 'الضرب: البسط في البسط والمقام في المقام', 'Product: top times top, bottom times bottom.'))}</Label>
                <Frac x={80} y={90} n="x² − 1" d="x" width={84} size={20} />
                <F x={136} y={97} anchor="middle" size={20}>·</F>
                <Frac x={186} y={90} n="x²" d="x + 1" width={70} size={20} />
                <F x={240} y={97} anchor="middle" size={20} color={MUTED}>=</F>
                <Frac x={374} y={90} n="(x + 1)(x − 1) · x²" d="x · (x + 1)" width={210} size={20} />
                <F x={500} y={97} anchor="middle" size={20} color={MUTED}>=</F>
                <F x={530} y={97} size={22} color={GREEN}>x(x − 1)</F>
            </Card>
            <Card x={14} y={152} width={692} height={124} tint={MUSTARD_TINT}>
                <Label x={30} y={180} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Zatidura: bigarrena buelta eman eta biderkatu', 'Cociente: da la vuelta a la segunda y multiplica', 'القسمة: اقلب الثاني واضرب', 'Quotient: flip the second fraction and multiply.'))}</Label>
                <Frac x={74} y={228} n="x + 3" d="x" width={70} size={20} />
                <F x={124} y={235} anchor="middle" size={20}>:</F>
                <Frac x={178} y={228} n="x² − 9" d="x²" width={76} size={20} />
                <F x={236} y={235} anchor="middle" size={20} color={MUTED}>=</F>
                <Frac x={374} y={228} n="(x + 3) · x²" d="x(x + 3)(x − 3)" width={200} size={20} />
                <F x={500} y={235} anchor="middle" size={20} color={MUTED}>=</F>
                <Frac x={570} y={228} n="x" d="x − 3" width={80} size={22} color={GREEN} />
            </Card>
            <Caption y={300}>{t(say('Biderkatu aurretik faktorizatu: sinplifikatzea askoz errazagoa da', 'Factoriza antes de multiplicar: simplificar es mucho más fácil', 'حلّل قبل الضرب: يصبح التبسيط أسهل بكثير', 'Factorise before you multiply: simplifying is much easier.'))}</Caption>
        </Figure>
    )
}

/* ---------- Two taps fill one tank ---------- */

export function TapsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={310} label={t(say('Bi txorrota: 1/x + 1/(x − 3) minutuko', 'Dos grifos: 1/x + 1/(x − 3) por minuto', 'صنبوران: 1/x + 1/(x − 3) في الدقيقة', 'Two taps: 1/x + 1/(x − 3) per minute'))}>
            <rect x={60} y={90} width={200} height={150} fill={PAPER} stroke={INK} strokeWidth={2.4} />
            <rect x={62} y={170} width={196} height={68} fill={STAGE_TINT} />
            <path d="M80 40 h40 v30" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
            <path d="M240 40 h-40 v30" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
            <line x1={120} x2={120} y1={78} y2={168} stroke={STAGE} strokeWidth={4} strokeDasharray="6 6" />
            <line x1={200} x2={200} y1={78} y2={168} stroke={STAGE} strokeWidth={4} strokeDasharray="6 6" />
            <F x={70} y={28} size={18} color={SECOND}>A: x min</F>
            <F x={190} y={28} size={18} color={SECOND}>B: x − 3</F>
            <Card x={300} y={30} width={400} height={120} tint={MUSTARD_TINT}>
                <Label x={500} y={58} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Minutu batean betetzen den zatia', 'Parte que se llena en un minuto', 'الجزء الذي يمتلئ في دقيقة', 'Part filled in one minute'))}</Label>
                <F x={500} y={104} anchor="middle" size={21}>1/x + 1/(x − 3) = (2x − 3)/(x(x − 3))</F>
                <F x={500} y={136} anchor="middle" size={16} color={MUTED} weight={400}>A + B</F>
            </Card>
            <Card x={300} y={166} width={400} height={74} tint={GREEN_TINT}>
                <F x={500} y={212} anchor="middle" size={20} color={GREEN}>x = 6:  1/6 + 1/3 = 1/2</F>
            </Card>
            <Caption y={272}>{t(say('A-k 6 min eta B-k 3 min behar badituzte, biak batera: 2 min', 'Si A tarda 6 min y B 3 min, juntos tardan 2 min', 'إذا احتاج A إلى 6 د وB إلى 3 د فمعًا يحتاجان 2 د', 'If A takes 6 min and B takes 3 min, together they take 2 min.'))}</Caption>
            <Caption y={296}>{t(say('Zatikiak batu: izendatzaile komuna x(x − 3)', 'Suma de fracciones: denominador común x(x − 3)', 'جمع الكسور: المقام المشترك x(x − 3)', 'Adding fractions: common denominator x(x − 3)'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art: Tartaglia, a Ruffini row and a fraction ---------- */

export function PolynomialsFractionsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(26 30) rotate(-4)">
                    <rect width={230} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[0, 1, 2, 3, 4].map((n) => tartaglia(n).map((value, k) => (
                        <text key={`${n}-${k}`} x={115 + (k - n / 2) * 36} y={32 + n * 30} textAnchor="middle" fontSize={17} fontWeight={700} fill={n === 4 ? '#c4432a' : INK}>{value}</text>
                    )))}
                </g>
                <g transform="translate(290 54) rotate(5)">
                    <rect width={200} height={140} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={100} y={56} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>x² − 1</text>
                    <line x1={40} x2={160} y1={70} y2={70} stroke={INK} strokeWidth={2.4} />
                    <text x={100} y={102} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>x + 1</text>
                    <text x={100} y={130} textAnchor="middle" fontSize={18} fontWeight={700} fill="#267b53">= x − 1</text>
                </g>
                <g transform="translate(40 250) rotate(2)">
                    <rect width={440} height={84} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={220} y={52} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>x(x − 5)(x + 3)(x + 4)</text>
                </g>
            </svg>
        </div>
    )
}
