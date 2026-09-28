import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Geometria · 1. DBH — lesson figures in the notebook style: lines, angles,
   angle pairs, polygons, triangles and their lines, quadrilaterals, the
   circle, Pythagoras' squares, perimeters and areas.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const rad = (degrees: number) => (degrees * Math.PI) / 180

/** An angle drawn from a vertex: two rays and the arc between them (degrees measured counter-clockwise from the first ray) */
function AngleMark({ x, y, from, size, radius = 26, color = STAGE, label }: { x: number; y: number; from: number; size: number; radius?: number; color?: string; label?: string }) {
    const start = [x + radius * Math.cos(rad(from)), y - radius * Math.sin(rad(from))]
    const end = [x + radius * Math.cos(rad(from + size)), y - radius * Math.sin(rad(from + size))]
    const large = size > 180 ? 1 : 0
    const middle = rad(from + size / 2)
    if (Math.abs(size - 90) < 0.5) {
        const r = radius * 0.6
        const a = [x + r * Math.cos(rad(from)), y - r * Math.sin(rad(from))]
        const b = [x + r * Math.cos(rad(from)) + r * Math.cos(rad(from + 90)), y - r * Math.sin(rad(from)) - r * Math.sin(rad(from + 90))]
        const c = [x + r * Math.cos(rad(from + 90)), y - r * Math.sin(rad(from + 90))]
        return (
            <g>
                <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`} fill="none" stroke={color} strokeWidth={2} />
                {label && <text x={x + (radius + 18) * Math.cos(middle)} y={y - (radius + 18) * Math.sin(middle) + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={color}>{label}</text>}
            </g>
        )
    }
    return (
        <g>
            <path d={`M${start[0]} ${start[1]} A${radius} ${radius} 0 ${large} 0 ${end[0]} ${end[1]}`} fill="none" stroke={color} strokeWidth={2.2} />
            {label && <text x={x + (radius + 18) * Math.cos(middle)} y={y - (radius + 18) * Math.sin(middle) + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={color}>{label}</text>}
        </g>
    )
}

function Ray({ x, y, angle, length }: { x: number; y: number; angle: number; length: number }) {
    return <line x1={x} y1={y} x2={x + length * Math.cos(rad(angle))} y2={y - length * Math.sin(rad(angle))} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
}

/* ---------- Lines: line, ray, segment and positions ---------- */

export function LinesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, { eu: 'Zuzena, zuzerdia, zuzenkia eta zuzenen posizioak', es: 'Recta, semirrecta, segmento y posiciones de rectas', ar: 'المستقيم ونصف المستقيم والقطعة وأوضاع المستقيمات' })}>
            <defs>
                <marker id="geometry-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill={INK} />
                </marker>
            </defs>
            <line x1={40} x2={220} y1={40} y2={40} stroke={INK} strokeWidth={2.4} markerStart="url(#geometry-arrow)" markerEnd="url(#geometry-arrow)" />
            <text x={130} y={70} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'zuzena', es: 'recta', ar: 'مستقيم' })}</text>
            <line x1={270} x2={450} y1={40} y2={40} stroke={INK} strokeWidth={2.4} markerEnd="url(#geometry-arrow)" />
            <circle cx={270} cy={40} r={5} fill={STAGE} />
            <text x={360} y={70} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'zuzerdia', es: 'semirrecta', ar: 'نصف مستقيم' })}</text>
            <line x1={500} x2={680} y1={40} y2={40} stroke={INK} strokeWidth={2.4} />
            <circle cx={500} cy={40} r={5} fill={STAGE} />
            <circle cx={680} cy={40} r={5} fill={STAGE} />
            <text x={590} y={70} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'zuzenkia', es: 'segmento', ar: 'قطعة مستقيمة' })}</text>
            <line x1={60} x2={220} y1={120} y2={120} stroke={STAGE} strokeWidth={2.4} />
            <line x1={60} x2={220} y1={150} y2={150} stroke={STAGE} strokeWidth={2.4} />
            <text x={140} y={190} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'paraleloak', es: 'paralelas', ar: 'متوازيان' })}</text>
            <line x1={290} x2={440} y1={110} y2={170} stroke={STAGE} strokeWidth={2.4} />
            <line x1={290} x2={440} y1={170} y2={110} stroke={STAGE} strokeWidth={2.4} />
            <text x={365} y={190} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'ebakitzaileak', es: 'secantes', ar: 'متقاطعان' })}</text>
            <line x1={520} x2={660} y1={140} y2={140} stroke={STAGE} strokeWidth={2.4} />
            <line x1={590} x2={590} y1={100} y2={176} stroke={STAGE} strokeWidth={2.4} />
            <AngleMark x={590} y={140} from={0} size={90} radius={18} color={SECOND} />
            <text x={590} y={196} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, { eu: 'perpendikularrak', es: 'perpendiculares', ar: 'متعامدان' })}</text>
            <Caption y={236}>{pick(language, { eu: 'Zuzenak ez du ez hasierarik ez amaierarik; zuzenkiak bi mutur ditu', es: 'La recta no tiene principio ni fin; el segmento tiene dos extremos', ar: 'المستقيم لا بداية له ولا نهاية؛ والقطعة لها طرفان' })}</Caption>
        </Figure>
    )
}

/* ---------- Types of angles ---------- */

export function AngleTypesFigure({ language }: { language: UnitLanguage }) {
    const types = [
        { size: 45, name: { eu: 'zorrotza', es: 'agudo', ar: 'حادة' }, note: '< 90°' },
        { size: 90, name: { eu: 'zuzena', es: 'recto', ar: 'قائمة' }, note: '= 90°' },
        { size: 135, name: { eu: 'kamutsa', es: 'obtuso', ar: 'منفرجة' }, note: '> 90°' },
        { size: 180, name: { eu: 'laua', es: 'llano', ar: 'مستقيمة' }, note: '= 180°' }
    ]
    return (
        <Figure height={220} label={pick(language, { eu: 'Angelu motak', es: 'Tipos de ángulos', ar: 'أنواع الزوايا' })}>
            {types.map((type, index) => {
                const x = 60 + index * 170
                return (
                    <g key={type.size}>
                        <Ray x={x} y={130} angle={0} length={100} />
                        <Ray x={x} y={130} angle={type.size} length={type.size === 180 ? 40 : 90} />
                        <AngleMark x={x} y={130} from={0} size={type.size} radius={28} />
                        <circle cx={x} cy={130} r={4} fill={INK} />
                        <text x={x + 40} y={170} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, type.name)}</text>
                        <text x={x + 40} y={192} textAnchor="middle" fontSize={15} fill={STAGE} fontWeight={700}>{type.note}</text>
                    </g>
                )
            })}
            <Caption y={214}>{pick(language, { eu: 'Angeluak graduetan (°) neurtzen dira garraiagailuarekin', es: 'Los ángulos se miden en grados (°) con el transportador', ar: 'تُقاس الزوايا بالدرجات (°) بالمنقلة' })}</Caption>
        </Figure>
    )
}

/* ---------- Complementary and supplementary ---------- */

export function AnglePairsFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={220} label={pick(language, { eu: 'Angelu osagarriak eta betegarriak', es: 'Ángulos complementarios y suplementarios', ar: 'زاويتان متتامتان ومتكاملتان' })}>
            <Ray x={80} y={160} angle={0} length={150} />
            <Ray x={80} y={160} angle={35} length={150} />
            <Ray x={80} y={160} angle={90} length={130} />
            <AngleMark x={80} y={160} from={0} size={35} radius={44} label="35°" />
            <AngleMark x={80} y={160} from={35} size={55} radius={30} color={SECOND} label="55°" />
            <text x={170} y={200} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>35° + 55° = 90°</text>
            <Ray x={500} y={160} angle={0} length={150} />
            <Ray x={500} y={160} angle={180} length={150} />
            <Ray x={500} y={160} angle={120} length={120} />
            <AngleMark x={500} y={160} from={0} size={120} radius={34} label="120°" />
            <AngleMark x={500} y={160} from={120} size={60} radius={50} color={SECOND} label="60°" />
            <text x={500} y={200} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>120° + 60° = 180°</text>
            <text x={170} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'osagarriak', es: 'complementarios', ar: 'متتامتان' })}</text>
            <text x={500} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'betegarriak', es: 'suplementarios', ar: 'متكاملتان' })}</text>
        </Figure>
    )
}

/* ---------- Polygons: elements ---------- */

export function PolygonFigure({ language }: { language: UnitLanguage }) {
    const points: Array<[number, number]> = [[140, 40], [240, 90], [220, 190], [90, 200], [50, 110]]
    const path = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z'
    return (
        <Figure height={240} label={pick(language, { eu: 'Pentagono baten elementuak', es: 'Elementos de un pentágono', ar: 'عناصر مخمس' })}>
            <path d={path} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <line x1={140} y1={40} x2={220} y2={190} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            {points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill={INK} />)}
            <text x={330} y={60} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: '● erpinak: 5', es: '● vértices: 5', ar: '● الرؤوس: 5' })}</text>
            <text x={330} y={95} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: '— aldeak: 5', es: '— lados: 5', ar: '— الأضلاع: 5' })}</text>
            <text x={330} y={130} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, { eu: '- - diagonala', es: '- - diagonal', ar: '- - قطر' })}</text>
            <text x={330} y={165} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'angeluak: 5', es: 'ángulos: 5', ar: 'الزوايا: 5' })}</text>
            <Caption y={232}>{pick(language, { eu: 'Poligonoa: zuzenki-lerro itxi batek mugatutako planoaren zatia', es: 'Polígono: parte del plano limitada por una línea poligonal cerrada', ar: 'المضلع: جزء من المستوي تحدّه خطوط مستقيمة مغلقة' })}</Caption>
        </Figure>
    )
}

/* ---------- Triangles: sum of the angles ---------- */

export function TriangleSumFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, { eu: 'Triangelu baten angeluen batura 180° da', es: 'Los ángulos de un triángulo suman 180°', ar: 'مجموع زوايا المثلث 180°' })}>
            <path d="M80 190 L320 190 L200 50 Z" fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <AngleMark x={80} y={190} from={0} size={49} radius={34} label="A" />
            <AngleMark x={320} y={190} from={131} size={49} radius={34} color={SECOND} label="B" />
            <AngleMark x={200} y={50} from={229} size={82} radius={30} color="var(--mustard, #e0a100)" label="C" />
            <line x1={420} x2={660} y1={150} y2={150} stroke={INK} strokeWidth={2.4} />
            <AngleMark x={540} y={150} from={0} size={49} radius={50} label="A" />
            <AngleMark x={540} y={150} from={49} size={82} radius={50} color="var(--mustard, #e0a100)" label="C" />
            <AngleMark x={540} y={150} from={131} size={49} radius={50} color={SECOND} label="B" />
            <text x={540} y={190} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>A + B + C = 180°</text>
            <Caption y={232}>{pick(language, { eu: 'Hiru angeluak elkartuta angelu laua osatzen dute', es: 'Los tres ángulos juntos forman un ángulo llano', ar: 'الزوايا الثلاث معًا تكوّن زاوية مستقيمة' })}</Caption>
        </Figure>
    )
}

/* ---------- Classifying triangles ---------- */

export function TriangleTypesFigure({ language }: { language: UnitLanguage }) {
    const shapes = [
        { d: 'M40 150 L140 150 L90 63 Z', name: { eu: 'aldeberdina', es: 'equilátero', ar: 'متساوي الأضلاع' } },
        { d: 'M200 150 L290 150 L245 40 Z', name: { eu: 'isoszelea', es: 'isósceles', ar: 'متساوي الساقين' } },
        { d: 'M350 150 L480 150 L380 80 Z', name: { eu: 'eskalenoa', es: 'escaleno', ar: 'مختلف الأضلاع' } },
        { d: 'M540 150 L660 150 L540 60 Z', name: { eu: 'angeluzuzena', es: 'rectángulo', ar: 'قائم الزاوية' } }
    ]
    return (
        <Figure height={220} label={pick(language, { eu: 'Triangelu motak', es: 'Tipos de triángulos', ar: 'أنواع المثلثات' })}>
            {shapes.map((shape) => <path key={shape.d} d={shape.d} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />)}
            <AngleMark x={540} y={150} from={0} size={90} radius={18} color={SECOND} />
            {shapes.map((shape, index) => <text key={index} x={[90, 245, 415, 600][index]} y={180} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, shape.name)}</text>)}
            <Caption y={210}>{pick(language, { eu: 'Aldeen arabera (berdinak) edo angeluen arabera (zorrotza, zuzena, kamutsa)', es: 'Según sus lados (iguales) o según sus ángulos (agudo, recto, obtuso)', ar: 'حسب الأضلاع (المتساوية) أو حسب الزوايا (حادة، قائمة، منفرجة)' })}</Caption>
        </Figure>
    )
}

/* ---------- Pythagoras' squares ---------- */

export function PythagorasFigure({ language }: { language: UnitLanguage }) {
    const cell = 16
    const grid = (x: number, y: number, n: number, color: string) => Array.from({ length: n * n }, (_, index) => (
        <rect key={index} x={x + (index % n) * cell} y={y + Math.floor(index / n) * cell} width={cell} height={cell} fill={color} stroke={INK} strokeWidth={0.8} />
    ))
    return (
        <Figure height={290} label={pick(language, { eu: '3, 4 eta 5eko triangelua: 9 + 16 = 25', es: 'Triángulo 3, 4, 5: 9 + 16 = 25', ar: 'مثلث 3 و4 و5: 9 + 16 = 25' })}>
            <path d="M120 200 L184 200 L120 152 Z" fill="none" stroke={INK} strokeWidth={2.4} />
            {grid(72, 152, 3, 'var(--mustard-tint, #fbebc0)')}
            {grid(120, 200, 4, STAGE_TINT)}
            {/* Square on the hypotenuse: A(120,152) B(184,200) C(232,136) D(168,88), split into 5 × 5 */}
            <polygon points="120,152 184,200 232,136 168,88" fill="var(--second-tint, #f8dcd0)" stroke={INK} strokeWidth={1.6} />
            {[1, 2, 3, 4].map((step) => (
                <g key={step}>
                    <line x1={120 + 12.8 * step} y1={152 + 9.6 * step} x2={168 + 12.8 * step} y2={88 + 9.6 * step} stroke={INK} strokeWidth={0.8} />
                    <line x1={120 + 9.6 * step} y1={152 - 12.8 * step} x2={184 + 9.6 * step} y2={200 - 12.8 * step} stroke={INK} strokeWidth={0.8} />
                </g>
            ))}
            <text x={250} y={120} fontSize={16} fontWeight={700} fill={INK}>5² = 25</text>
            <text x={60} y={180} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>3² = 9</text>
            <text x={152} y={290 - 8} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>4² = 16</text>
            <text x={420} y={90} fontSize={18} fontWeight={700} fill={INK}>{pick(language, { eu: 'katetoak: 3 eta 4', es: 'catetos: 3 y 4', ar: 'الضلعان القائمان: 3 و4' })}</text>
            <text x={420} y={125} fontSize={18} fontWeight={700} fill={INK}>{pick(language, { eu: 'hipotenusa: 5', es: 'hipotenusa: 5', ar: 'الوتر: 5' })}</text>
            <text x={420} y={170} fontSize={22} fontWeight={700} fill={STAGE}>a² = b² + c²</text>
            <text x={420} y={205} fontSize={20} fontWeight={700} fill={INK}>25 = 9 + 16</text>
        </Figure>
    )
}

/* ---------- Quadrilaterals ---------- */

export function QuadrilateralsFigure({ language }: { language: UnitLanguage }) {
    const shapes = [
        { d: 'M30 60 L110 60 L110 140 L30 140 Z', name: { eu: 'karratua', es: 'cuadrado', ar: 'مربع' } },
        { d: 'M150 70 L270 70 L270 140 L150 140 Z', name: { eu: 'laukizuzena', es: 'rectángulo', ar: 'مستطيل' } },
        { d: 'M340 40 L380 100 L340 160 L300 100 Z', name: { eu: 'erronboa', es: 'rombo', ar: 'معيّن' } },
        { d: 'M420 140 L450 70 L550 70 L520 140 Z', name: { eu: 'erronboidea', es: 'romboide', ar: 'متوازي أضلاع' } },
        { d: 'M580 140 L610 70 L660 70 L700 140 Z', name: { eu: 'trapezioa', es: 'trapecio', ar: 'شبه منحرف' } }
    ]
    return (
        <Figure height={220} label={pick(language, { eu: 'Laukiak', es: 'Cuadriláteros', ar: 'الرباعيات' })}>
            {shapes.map((shape, index) => <path key={index} d={shape.d} fill={index < 4 ? STAGE_TINT : 'var(--mustard-tint, #fbebc0)'} stroke={INK} strokeWidth={2.2} />)}
            {shapes.map((shape, index) => <text key={`t${index}`} x={[70, 210, 340, 485, 640][index]} y={185} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, shape.name)}</text>)}
            <Caption y={212}>{pick(language, { eu: 'Urdinak: paralelogramoak (aurkako aldeak paraleloak bikoteka)', es: 'En azul: paralelogramos (lados opuestos paralelos dos a dos)', ar: 'بالأزرق: متوازيات أضلاع (كل ضلعين متقابلين متوازيان)' })}</Caption>
        </Figure>
    )
}

/* ---------- Circle and circumference ---------- */

export function CircleFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, { eu: 'Zirkunferentzia, zirkulua eta haien elementuak', es: 'Circunferencia, círculo y sus elementos', ar: 'الدائرة والقرص وعناصرهما' })}>
            <circle cx={160} cy={120} r={90} fill={STAGE_TINT} stroke={INK} strokeWidth={2.6} />
            <circle cx={160} cy={120} r={4} fill={INK} />
            <line x1={160} y1={120} x2={250} y2={120} stroke={SECOND} strokeWidth={2.4} />
            <line x1={160 - 90 * Math.cos(rad(60))} y1={120 - 90 * Math.sin(rad(60))} x2={160 + 90 * Math.cos(rad(60))} y2={120 + 90 * Math.sin(rad(60))} stroke={STAGE} strokeWidth={2.4} />
            <text x={205} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>r</text>
            <text x={400} y={60} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'Zirkunferentzia: ertza (lerroa)', es: 'Circunferencia: el borde (línea)', ar: 'الدائرة: الحافة (خط)' })}</text>
            <text x={400} y={95} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'Zirkulua: barrualdea ere bai', es: 'Círculo: también el interior', ar: 'القرص: والداخل أيضًا' })}</text>
            <text x={400} y={130} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, { eu: 'r: erradioa', es: 'r: radio', ar: 'r: نصف القطر' })}</text>
            <text x={400} y={165} fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'd = 2r: diametroa', es: 'd = 2r: diámetro', ar: 'd = 2r: القطر' })}</text>
        </Figure>
    )
}

/* ---------- Perimeter ---------- */

export function PerimeterFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={220} label={pick(language, { eu: 'Perimetroa: alde guztien batura', es: 'Perímetro: suma de todos los lados', ar: 'المحيط: مجموع كل الأضلاع' })}>
            <path d="M80 160 L260 160 L220 60 L120 60 Z" fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={170} y={182} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>9 cm</text>
            <text x={170} y={50} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>5 cm</text>
            <text x={82} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>5,4</text>
            <text x={262} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>5,4</text>
            <text x={360} y={100} fontSize={20} fontWeight={700} fill={STAGE}>P = 9 + 5,4 + 5 + 5,4</text>
            <text x={360} y={135} fontSize={20} fontWeight={700} fill={INK}>P = 24,8 cm</text>
            <Caption y={210}>{pick(language, { eu: 'Perimetroa luzera bat da: cm, m… Zirkunferentziarena: L = 2πr', es: 'El perímetro es una longitud: cm, m… El de la circunferencia: L = 2πr', ar: 'المحيط طول: سم، م… ومحيط الدائرة: L = 2πr' })}</Caption>
        </Figure>
    )
}

/* ---------- Areas: rectangle, triangle ---------- */

export function AreaFigure({ language }: { language: UnitLanguage }) {
    const cell = 22
    return (
        <Figure height={240} label={pick(language, { eu: 'Laukizuzenaren azalera eta triangeluarena', es: 'Área del rectángulo y del triángulo', ar: 'مساحة المستطيل والمثلث' })}>
            {Array.from({ length: 18 }, (_, index) => <rect key={index} x={50 + (index % 6) * cell} y={40 + Math.floor(index / 6) * cell} width={cell} height={cell} fill={STAGE_TINT} stroke={INK} strokeWidth={1} />)}
            <rect x={50} y={40} width={6 * cell} height={3 * cell} fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={50 + 3 * cell} y={40 + 3 * cell + 26} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>A = 6 · 3 = 18</text>
            {Array.from({ length: 18 }, (_, index) => <rect key={`t${index}`} x={380 + (index % 6) * cell} y={40 + Math.floor(index / 6) * cell} width={cell} height={cell} fill="none" stroke={MUTED} strokeWidth={0.8} />)}
            <path d={`M380 ${40 + 3 * cell} L${380 + 6 * cell} ${40 + 3 * cell} L${380 + 2 * cell} 40 Z`} fill={STAGE_TINT} fillOpacity={0.8} stroke={INK} strokeWidth={2.4} />
            <line x1={380 + 2 * cell} x2={380 + 2 * cell} y1={40} y2={40 + 3 * cell} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
            <text x={380 + 3 * cell} y={40 + 3 * cell + 26} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>A = (6 · 3) : 2 = 9</text>
            <Caption y={225}>{pick(language, { eu: 'Triangelua bere laukizuzenaren erdia da: oinarria · altuera : 2', es: 'El triángulo es la mitad de su rectángulo: base · altura : 2', ar: 'المثلث نصف مستطيله: القاعدة · الارتفاع : 2' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function GeometryIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 50) rotate(-4)">
                    <rect width={210} height={190} rx={16} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <path d="M30 160 L180 160 L60 50 Z" fill="#dde7f7" stroke={INK} strokeWidth={2.4} />
                    <path d="M42 160 L42 148 L30 148" fill="none" stroke={INK} strokeWidth={1.6} />
                </g>
                <g transform="translate(290 50) rotate(4)">
                    <rect width={180} height={96} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={90} y={62} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">A + B + C = 180°</text>
                </g>
                <g transform="translate(300 180) rotate(-3)">
                    <rect width={170} height={88} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={85} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">a² = b² + c²</text>
                </g>
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <circle cx={60} cy={35} r={22} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <rect x={120} y={14} width={42} height={42} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <path d="M210 56 L260 56 L235 14 Z" fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <path d="M300 56 L330 14 L360 56 L330 70 Z" transform="translate(0 -6)" fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <path d="M390 56 L405 14 L425 14 L435 56 Z" fill="#fffcf6" stroke={INK} strokeWidth={2} />
                </g>
            </svg>
        </div>
    )
}
