import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Aljebra · 2. DBH — lesson figures in the notebook style: a pattern and
   its general term, the parts of a polynomial, the area model of a
   product, the squares of a sum and of a difference, sum by difference
   and the common factor as a rectangle.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = 'var(--second-tint, #f8dcd0)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/* ---------- Algebraic language: a pattern and its general term ---------- */

export function PatternFigure({ language }: { language: UnitLanguage }) {
    const figures = [1, 2, 3, 4]
    return (
        <Figure height={250} label={pick(language, { eu: 'Segida: 1, 4, 7, 10… gai orokorra 3n − 2', es: 'Serie: 1, 4, 7, 10… término general 3n − 2', ar: 'متتالية: 1، 4، 7، 10… الحد العام 3n − 2' })}>
            {figures.map((n, index) => {
                const count = 3 * n - 2
                const x0 = 40 + index * 170
                return (
                    <g key={n}>
                        {Array.from({ length: count }, (_, dot) => {
                            // An L of dots: the corner, then n − 1 up and n − 1 right… plus the arm to the left
                            const arm = Math.floor((dot - 1) / (n - 1 || 1))
                            const step = dot === 0 ? 0 : ((dot - 1) % (n - 1 || 1)) + 1
                            const [dx, dy] = dot === 0 ? [0, 0] : arm === 0 ? [0, -step] : arm === 1 ? [step, 0] : [-step, 0]
                            return <circle key={dot} cx={x0 + 60 + dx * 18} cy={150 + dy * 18} r={7} fill={dot === 0 ? SECOND : STAGE_TINT} stroke={dot === 0 ? SECOND : STAGE} strokeWidth={2} />
                        })}
                        <text x={x0 + 60} y={192} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>n = {n}</text>
                        <text x={x0 + 60} y={214} textAnchor="middle" fontSize={16} fill={STAGE} fontWeight={700}>{count}</text>
                    </g>
                )
            })}
            <text x={680} y={160} textAnchor="middle" fontSize={20} fill={INK}>…</text>
            <Caption y={244}>{pick(language, { eu: 'Urrats bakoitzean 3 puntu gehiago: n. irudiak 3n − 2 puntu ditu', es: 'Cada paso, 3 puntos más: la figura n tiene 3n − 2 puntos', ar: 'كل خطوة 3 نقاط أكثر: للشكل n عدد 3n − 2 من النقاط' })}</Caption>
        </Figure>
    )
}

/* ---------- The parts of a polynomial ---------- */

export function PolynomialFigure({ language }: { language: UnitLanguage }) {
    const terms = [
        { x: 190, text: '4x³', label: { eu: 'maila 3', es: 'grado 3', ar: 'الدرجة 3' } },
        { x: 300, text: '− 2x²', label: { eu: 'koef. −2', es: 'coef. −2', ar: 'المعامل −2' } },
        { x: 410, text: '+ x', label: { eu: 'koef. 1', es: 'coef. 1', ar: 'المعامل 1' } },
        { x: 510, text: '− 7', label: { eu: 'gai askea', es: 'término indep.', ar: 'الحد الثابت' } }
    ]
    return (
        <Figure height={240} label={pick(language, { eu: 'Polinomio baten zatiak', es: 'Las partes de un polinomio', ar: 'أجزاء الحدودية' })}>
            <text x={90} y={112} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">P(x) =</text>
            {terms.map((term, index) => (
                <g key={index}>
                    <rect x={term.x - 48} y={76} width={96} height={52} rx={10} fill={index === 3 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={2} />
                    <text x={term.x} y={112} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{term.text}</text>
                    <line x1={term.x} y1={132} x2={term.x} y2={156} stroke={MUTED} strokeWidth={1.6} />
                    <text x={term.x} y={176} textAnchor="middle" fontSize={15} fill={index === 0 ? SECOND : INK} fontWeight={700}>{pick(language, term.label)}</text>
                </g>
            ))}
            <text x={350} y={48} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, { eu: '4 gai · polinomioaren maila: 3', es: '4 términos · grado del polinomio: 3', ar: '4 حدود · درجة الحدودية: 3' })}</text>
            <Caption y={226}>{pick(language, { eu: 'Maila: berretzailerik handiena. Gai askea: letrarik gabeko gaia', es: 'Grado: el mayor exponente. Término independiente: el que no tiene letra', ar: 'الدرجة: أكبر أس. الحد الثابت: الحد الذي لا حرف فيه' })}</Caption>
        </Figure>
    )
}

/* ---------- The area model of (x + 2)(x + 3) ---------- */

export function ProductAreaFigure({ language }: { language: UnitLanguage }) {
    const x = 120
    const u = 34
    const left = 230
    const top = 40
    return (
        <Figure height={290} label={pick(language, { eu: '(x + 2)(x + 3) azalera gisa', es: '(x + 2)(x + 3) como un área', ar: '(x + 2)(x + 3) مساحةً' })}>
            <rect x={left} y={top} width={x} height={x} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left + x} y={top} width={3 * u} height={x} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left} y={top + x} width={x} height={2 * u} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left + x} y={top + x} width={3 * u} height={2 * u} fill={SECOND_TINT} stroke={INK} strokeWidth={2} />
            <text x={left + x / 2} y={top + x / 2 + 8} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>x²</text>
            <text x={left + x + 1.5 * u} y={top + x / 2 + 8} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>3x</text>
            <text x={left + x / 2} y={top + x + u + 8} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>2x</text>
            <text x={left + x + 1.5 * u} y={top + x + u + 8} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>6</text>
            <text x={left + x / 2} y={top - 10} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>x</text>
            <text x={left + x + 1.5 * u} y={top - 10} textAnchor="middle" fontSize={18} fill={STAGE} fontWeight={700}>3</text>
            <text x={left - 16} y={top + x / 2 + 6} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>x</text>
            <text x={left - 16} y={top + x + u + 6} textAnchor="middle" fontSize={18} fill={STAGE} fontWeight={700}>2</text>
            <Caption y={282}>{pick(language, { eu: '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6', es: '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6', ar: '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6' })}</Caption>
        </Figure>
    )
}

/* ---------- The square of a sum ---------- */

export function SquareSumFigure({ language }: { language: UnitLanguage }) {
    const a = 130
    const b = 60
    const left = 260
    const top = 30
    return (
        <Figure height={270} label={pick(language, { eu: '(a + b)² karratua lau zatitan', es: 'El cuadrado (a + b)² en cuatro partes', ar: 'المربع (a + b)² في أربعة أجزاء' })}>
            <rect x={left} y={top} width={a} height={a} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left + a} y={top} width={b} height={a} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left} y={top + a} width={a} height={b} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left + a} y={top + a} width={b} height={b} fill={SECOND_TINT} stroke={INK} strokeWidth={2} />
            <text x={left + a / 2} y={top + a / 2 + 8} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>a²</text>
            <text x={left + a + b / 2} y={top + a / 2 + 8} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>ab</text>
            <text x={left + a / 2} y={top + a + b / 2 + 8} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>ab</text>
            <text x={left + a + b / 2} y={top + a + b / 2 + 8} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>b²</text>
            <text x={left + a / 2} y={top - 8} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>a</text>
            <text x={left + a + b / 2} y={top - 8} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>b</text>
            <text x={left - 14} y={top + a / 2 + 6} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>a</text>
            <text x={left - 14} y={top + a + b / 2 + 6} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>b</text>
            <text x={130} y={130} textAnchor="middle" fontSize={17} fill={SECOND} fontWeight={700}>{pick(language, { eu: 'bi ab!', es: '¡dos ab!', ar: 'مرتان ab!' })}</text>
            <Caption y={262}>{pick(language, { eu: '(a + b)² = a² + 2ab + b², ez a² + b²', es: '(a + b)² = a² + 2ab + b², no a² + b²', ar: '(a + b)² = a² + 2ab + b²، وليس a² + b²' })}</Caption>
        </Figure>
    )
}

/* ---------- The square of a difference ---------- */

export function SquareDifferenceFigure({ language }: { language: UnitLanguage }) {
    const a = 180
    const b = 55
    const left = 250
    const top = 30
    const inner = a - b
    return (
        <Figure height={270} label={pick(language, { eu: '(a − b)² karratu handitik', es: '(a − b)² desde el cuadrado grande', ar: '(a − b)² من المربع الكبير' })}>
            <rect x={left} y={top} width={a} height={a} fill="none" stroke={INK} strokeWidth={2} />
            <rect x={left} y={top} width={inner} height={inner} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={left + inner} y={top} width={b} height={a} fill={SECOND_TINT} fillOpacity={0.7} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            <rect x={left} y={top + inner} width={a} height={b} fill={SECOND_TINT} fillOpacity={0.7} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            <rect x={left + inner} y={top + inner} width={b} height={b} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={left + inner / 2} y={top + inner / 2 + 8} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>(a − b)²</text>
            <text x={left + inner + b / 2} y={top + inner / 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>− ab</text>
            <text x={left + inner / 2} y={top + inner + b / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>− ab</text>
            <text x={left + inner + b / 2} y={top + inner + b / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>+ b²</text>
            <text x={left + a / 2} y={top - 8} textAnchor="middle" fontSize={18} fontStyle="italic" fill={STAGE} fontWeight={700}>a</text>
            <text x={120} y={120} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, { eu: 'a² − 2ab', es: 'a² − 2ab', ar: 'a² − 2ab' })}</text>
            <text x={120} y={144} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, { eu: '(b² bi aldiz kendu da)', es: '(b² se quitó dos veces)', ar: '(طُرح b² مرتين)' })}</text>
            <Caption y={262}>{pick(language, { eu: '(a − b)² = a² − 2ab + b²', es: '(a − b)² = a² − 2ab + b²', ar: '(a − b)² = a² − 2ab + b²' })}</Caption>
        </Figure>
    )
}

/* ---------- Sum by difference ---------- */

export function SumDifferenceFigure({ language }: { language: UnitLanguage }) {
    const a = 160
    const b = 60
    return (
        <Figure height={250} label={pick(language, { eu: 'a² − b² = (a + b)(a − b)', es: 'a² − b² = (a + b)(a − b)', ar: 'a² − b² = (a + b)(a − b)' })}>
            <rect x={60} y={40} width={a} height={a} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={60 + a - b} y={40 + a - b} width={b} height={b} fill="#fffcf6" stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            <text x={60 + (a - b) / 2} y={40 + (a - b) / 2 + 8} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>a² − b²</text>
            <text x={60 + a - b / 2} y={40 + a - b / 2 + 6} textAnchor="middle" fontSize={16} fill={SECOND} fontWeight={700}>b²</text>
            <text x={300} y={130} textAnchor="middle" fontSize={30} fill={INK}>=</text>
            <rect x={360} y={80} width={a + b} height={a - b} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <text x={360 + (a + b) / 2} y={80 - 10} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>a + b</text>
            <text x={360 + a + b + 34} y={80 + (a - b) / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>a − b</text>
            <line x1={360 + a - b} y1={80} x2={360 + a - b} y2={80 + a - b} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
            <Caption y={242}>{pick(language, { eu: 'Batura bider kendura: (a + b)(a − b) = a² − b²', es: 'Suma por diferencia: (a + b)(a − b) = a² − b²', ar: 'مجموع في فرق: (a + b)(a − b) = a² − b²' })}</Caption>
        </Figure>
    )
}

/* ---------- The common factor as a rectangle ---------- */

export function CommonFactorFigure({ language }: { language: UnitLanguage }) {
    const h = 80
    return (
        <Figure height={230} label={pick(language, { eu: '3x + 6 = 3(x + 2)', es: '3x + 6 = 3(x + 2)', ar: '3x + 6 = 3(x + 2)' })}>
            <rect x={150} y={60} width={220} height={h} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={370} y={60} width={120} height={h} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={260} y={108} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>3x</text>
            <text x={430} y={108} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>6</text>
            <text x={260} y={48} textAnchor="middle" fontSize={20} fontStyle="italic" fontWeight={700} fill={STAGE}>x</text>
            <text x={430} y={48} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>2</text>
            <text x={126} y={106} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>3</text>
            <path d="M150 158 L490 158" stroke={MUTED} strokeWidth={1.6} />
            <text x={320} y={184} textAnchor="middle" fontSize={18} fill={INK} fontWeight={700}>x + 2</text>
            <Caption y={222}>{pick(language, { eu: 'Bi zatiek dute 3 altuera: 3x + 6 = 3 · (x + 2)', es: 'Las dos partes tienen altura 3: 3x + 6 = 3 · (x + 2)', ar: 'للجزأين الارتفاع 3: 3x + 6 = 3 · (x + 2)' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function AlgebraHeroArt() {
    return (
        <svg viewBox="0 0 240 200" aria-hidden="true" style={{ width: '100%', height: 'auto', maxWidth: 260 }}>
            <rect x={40} y={30} width={100} height={100} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <rect x={140} y={30} width={50} height={100} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2.4} />
            <rect x={40} y={130} width={100} height={50} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2.4} />
            <rect x={140} y={130} width={50} height={50} fill={SECOND_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={90} y={88} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">a²</text>
            <text x={165} y={86} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>ab</text>
            <text x={90} y={162} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>ab</text>
            <text x={165} y={162} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>b²</text>
        </svg>
    )
}
