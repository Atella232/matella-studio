import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Ekuazioak · 2. DBH — lesson figures in the notebook style: the parts of
   an equation, the ladder of steps, clearing denominators with the lcm,
   the four steps of a problem, the product equal to zero and the three
   cases of the discriminant as parabolas.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/* ---------- The parts of an equation ---------- */

export function EquationPartsFigure({ language }: { language: UnitLanguage }) {
    const terms = [
        { x: 150, text: '3x', note: { eu: 'gaia', es: 'término', ar: 'حد' } },
        { x: 240, text: '− 5', note: { eu: 'gaia', es: 'término', ar: 'حد' } },
        { x: 440, text: 'x', note: { eu: 'ezezaguna', es: 'incógnita', ar: 'المجهول' } },
        { x: 530, text: '+ 7', note: { eu: 'gaia', es: 'término', ar: 'حد' } }
    ]
    return (
        <Figure height={250} label={pick(language, { eu: 'Ekuazio baten zatiak', es: 'Las partes de una ecuación', ar: 'أجزاء المعادلة' })}>
            <rect x={100} y={70} width={200} height={70} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={390} y={70} width={200} height={70} rx={14} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={345} y={118} textAnchor="middle" fontSize={34} fontWeight={700} fill={SECOND}>=</text>
            {terms.map((term, index) => (
                <g key={index}>
                    <text x={term.x} y={116} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{term.text}</text>
                    <line x1={term.x} y1={146} x2={term.x} y2={168} stroke={MUTED} strokeWidth={1.4} />
                    <text x={term.x} y={186} textAnchor="middle" fontSize={14} fill={index === 2 ? SECOND : MUTED} fontWeight={700}>{pick(language, term.note)}</text>
                </g>
            ))}
            <text x={200} y={56} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'lehen atala', es: 'primer miembro', ar: 'الطرف الأول' })}</text>
            <text x={490} y={56} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'bigarren atala', es: 'segundo miembro', ar: 'الطرف الثاني' })}</text>
            <text x={360} y={218} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, { eu: 'Maila 1 · ebazpena: x = 6 (3 · 6 − 5 = 6 + 7)', es: 'Grado 1 · solución: x = 6 (3 · 6 − 5 = 6 + 7)', ar: 'الدرجة 1 · الحل: x = 6 (3 · 6 − 5 = 6 + 7)' })}</text>
            <Caption y={244}>{pick(language, { eu: 'Ebazpenak bi atalak berdin uzten ditu', es: 'La solución hace iguales los dos miembros', ar: 'الحل يجعل الطرفين متساويين' })}</Caption>
        </Figure>
    )
}

/* ---------- The ladder of steps ---------- */

export function StepsFigure({ language }: { language: UnitLanguage }) {
    const steps = [
        { math: '3(x − 2) + 1 = x + 7', note: { eu: 'hasiera', es: 'inicio', ar: 'البداية' } },
        { math: '3x − 6 + 1 = x + 7', note: { eu: '1. parentesiak kendu', es: '1. quitar paréntesis', ar: '1. حذف الأقواس' } },
        { math: '3x − x = 7 + 6 − 1', note: { eu: '2. x-ak bildu atal batean', es: '2. agrupar las x en un miembro', ar: '2. جمع x في طرف' } },
        { math: '2x = 12', note: { eu: '3. laburtu', es: '3. reducir', ar: '3. التبسيط' } },
        { math: 'x = 6', note: { eu: '4. x askatu', es: '4. despejar x', ar: '4. عزل x' } }
    ]
    return (
        <Figure height={270} label={pick(language, { eu: 'Ekuazio bat ebazteko urratsak', es: 'Los pasos para resolver una ecuación', ar: 'خطوات حل معادلة' })}>
            {steps.map((step, index) => (
                <g key={index}>
                    <rect x={70 + index * 18} y={18 + index * 46} width={330} height={38} rx={10} fill={index === steps.length - 1 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                    <text x={235 + index * 18} y={44 + index * 46} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{step.math}</text>
                    <text x={420 + index * 18} y={43 + index * 46} fontSize={15} fill={index === 0 ? MUTED : STAGE} fontWeight={700}>{pick(language, step.note)}</text>
                </g>
            ))}
            <Caption y={262}>{pick(language, { eu: '5. Egiaztatu: 3 · 4 + 1 = 13 eta 6 + 7 = 13', es: '5. Comprueba: 3 · 4 + 1 = 13 y 6 + 7 = 13', ar: '5. تحقّق: 3 · 4 + 1 = 13 و6 + 7 = 13' })}</Caption>
        </Figure>
    )
}

/* ---------- Clearing denominators with the lcm ---------- */

export function DenominatorsFigure({ language }: { language: UnitLanguage }) {
    const parts = [
        { x: 150, top: 'x', bottom: '2', times: '6 · x/2 = 3x' },
        { x: 290, top: 'x', bottom: '3', times: '6 · x/3 = 2x' },
        { x: 450, top: '5', bottom: '', times: '6 · 5 = 30' }
    ]
    return (
        <Figure height={260} label={pick(language, { eu: 'x/2 + x/3 = 5, bider 6', es: 'x/2 + x/3 = 5, por 6', ar: 'x/2 + x/3 = 5، في 6' })}>
            {parts.map((part, index) => (
                <g key={index}>
                    {part.bottom ? (
                        <>
                            <text x={part.x} y={70} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{part.top}</text>
                            <line x1={part.x - 22} y1={82} x2={part.x + 22} y2={82} stroke={INK} strokeWidth={2.4} />
                            <text x={part.x} y={112} textAnchor="middle" fontSize={28} fontWeight={700} fill={SECOND} fontFamily="Fraunces, serif">{part.bottom}</text>
                        </>
                    ) : (
                        <text x={part.x} y={94} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{part.top}</text>
                    )}
                    <line x1={part.x} y1={124} x2={part.x} y2={150} stroke={MUTED} strokeWidth={1.6} markerEnd="url(#denominator-arrow)" />
                    <text x={part.x} y={176} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{part.times}</text>
                </g>
            ))}
            <text x={220} y={96} textAnchor="middle" fontSize={26} fill={INK}>+</text>
            <text x={370} y={96} textAnchor="middle" fontSize={26} fill={INK}>=</text>
            <defs>
                <marker id="denominator-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill={MUTED} />
                </marker>
            </defs>
            <text x={600} y={96} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, { eu: 'MKT(2, 3) = 6', es: 'm.c.m.(2, 3) = 6', ar: 'م.م.أ(2، 3) = 6' })}</text>
            <text x={300} y={216} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>3x + 2x = 30 → x = 6</text>
            <Caption y={252}>{pick(language, { eu: 'Gai GUZTIAK biderkatu MKTaz, zenbakiak ere bai', es: 'Multiplica TODOS los términos por el m.c.m., también los números', ar: 'اضرب كل الحدود في م.م.أ، حتى الأعداد' })}</Caption>
        </Figure>
    )
}

/* ---------- The four steps of a problem ---------- */

export function ProblemStepsFigure({ language }: { language: UnitLanguage }) {
    const steps = [
        { title: { eu: '1. Ulertu', es: '1. Comprender', ar: '1. الفهم' }, text: { eu: 'Zer da x?', es: '¿Qué es x?', ar: 'ما x؟' } },
        { title: { eu: '2. Planteatu', es: '2. Plantear', ar: '2. الصياغة' }, text: { eu: '3x − 8 = 25', es: '3x − 8 = 25', ar: '3x − 8 = 25' } },
        { title: { eu: '3. Ebatzi', es: '3. Resolver', ar: '3. الحل' }, text: { eu: 'x = 11', es: 'x = 11', ar: 'x = 11' } },
        { title: { eu: '4. Egiaztatu', es: '4. Comprobar', ar: '4. التحقق' }, text: { eu: '33 − 8 = 25 ✓', es: '33 − 8 = 25 ✓', ar: '33 − 8 = 25 ✓' } }
    ]
    return (
        <Figure height={210} label={pick(language, { eu: 'Buruketa baten lau urratsak', es: 'Los cuatro pasos de un problema', ar: 'الخطوات الأربع لمسألة' })}>
            {steps.map((step, index) => (
                <g key={index}>
                    <rect x={20 + index * 175} y={50} width={150} height={96} rx={14} fill={index === 1 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={2} />
                    <text x={95 + index * 175} y={84} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, step.title)}</text>
                    <text x={95 + index * 175} y={120} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{pick(language, step.text)}</text>
                    {index < steps.length - 1 && <path d={`M${172 + index * 175} 98 L${193 + index * 175} 98`} stroke={INK} strokeWidth={2} />}
                </g>
            ))}
            <text x={360} y={30} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, { eu: '«Zenbaki baten hirukoitzari 8 kenduta, 25 lortzen da»', es: '«Si al triple de un número le restas 8, obtienes 25»', ar: '«إذا طرحت 8 من ثلاثة أضعاف عدد تحصل على 25»' })}</text>
            <Caption y={196}>{pick(language, { eu: 'Amaitzeko, idatzi erantzuna esaldi batean: zenbakia 11 da', es: 'Al final, escribe la respuesta en una frase: el número es 11', ar: 'في النهاية اكتب الجواب في جملة: العدد 11' })}</Caption>
        </Figure>
    )
}

/* ---------- A product equal to zero ---------- */

export function ZeroProductFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: 'x(x − 5) = 0', es: 'x(x − 5) = 0', ar: 'x(x − 5) = 0' })}>
            <text x={360} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">x² − 5x = 0 → x · (x − 5) = 0</text>
            <path d="M300 74 L200 130" stroke={INK} strokeWidth={2} />
            <path d="M420 74 L520 130" stroke={INK} strokeWidth={2} />
            <rect x={120} y={134} width={160} height={52} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={400} y={134} width={240} height={52} rx={12} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={200} y={168} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>x = 0</text>
            <text x={520} y={168} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>x − 5 = 0 → x = 5</text>
            <Caption y={220}>{pick(language, { eu: 'Biderkadura bat 0 bada, faktoreetako bat 0 da', es: 'Si un producto vale 0, alguno de sus factores es 0', ar: 'إذا كان الجداء 0 فأحد عوامله 0' })}</Caption>
        </Figure>
    )
}

/* ---------- The three cases of the discriminant ---------- */

export function DiscriminantFigure({ language }: { language: UnitLanguage }) {
    const cases = [
        { cx: 130, shift: 30, label: { eu: 'Δ > 0: bi ebazpen', es: 'Δ > 0: dos soluciones', ar: 'Δ > 0: حلان' } },
        { cx: 360, shift: 0, label: { eu: 'Δ = 0: ebazpen bat', es: 'Δ = 0: una solución', ar: 'Δ = 0: حل واحد' } },
        { cx: 590, shift: -30, label: { eu: 'Δ < 0: ebazpenik ez', es: 'Δ < 0: sin solución', ar: 'Δ < 0: لا حل' } }
    ]
    const axis = 140
    return (
        <Figure height={240} label={pick(language, { eu: 'Diskriminatzailearen hiru kasuak', es: 'Los tres casos del discriminante', ar: 'الحالات الثلاث للمميّز' })}>
            {cases.map((item, index) => {
                const vertex = axis + item.shift
                const path = Array.from({ length: 41 }, (_, step) => {
                    const u = (step - 20) / 20
                    return `${step === 0 ? 'M' : 'L'}${item.cx + u * 80} ${vertex - u * u * 110}`
                }).join(' ')
                return (
                    <g key={index}>
                        <line x1={item.cx - 95} y1={axis} x2={item.cx + 95} y2={axis} stroke={INK} strokeWidth={1.8} />
                        <path d={path} fill="none" stroke={STAGE} strokeWidth={3} />
                        {item.shift > 0 && [-1, 1].map((sign) => <circle key={sign} cx={item.cx + sign * 80 * Math.sqrt(item.shift / 110)} cy={axis} r={6} fill={SECOND} />)}
                        {item.shift === 0 && <circle cx={item.cx} cy={axis} r={6} fill={SECOND} />}
                        <text x={item.cx} y={200} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, item.label)}</text>
                    </g>
                )
            })}
            <Caption y={232}>{pick(language, { eu: 'Δ = b² − 4ac: erro karratuaren barrukoa', es: 'Δ = b² − 4ac: lo que está dentro de la raíz', ar: 'Δ = b² − 4ac: ما تحت الجذر' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function EquationsHeroArt() {
    return (
        <svg viewBox="0 0 240 200" aria-hidden="true" style={{ width: '100%', height: 'auto', maxWidth: 260 }}>
            <polygon points="120,150 100,185 140,185" fill={INK} />
            <line x1={30} y1={120} x2={210} y2={120} stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <line x1={120} y1={120} x2={120} y2={150} stroke={INK} strokeWidth={5} />
            <rect x={40} y={70} width={50} height={50} rx={8} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={65} y={104} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontStyle="italic" fontFamily="Fraunces, serif">x</text>
            {[0, 1, 2].map((index) => <rect key={index} x={140 + index * 22} y={98} width={20} height={22} rx={4} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />)}
            <text x={120} y={44} textAnchor="middle" fontSize={24} fontWeight={700} fill={SECOND} fontFamily="Fraunces, serif">x = ?</text>
        </svg>
    )
}
