import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — the new lesson figures: a discount and VAT in both orders,
   growing and falling by a percentage, the exponential and the line
   through two data, «when?» with a logarithm, doubling every T years, the
   logistic S curve and a logarithmic model. Planes count in grid squares;
   xUnit and yUnit say what a square is worth. Formulas sit in their own
   <text>; words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const CARD = 'var(--card, #fffcf6)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A decimal of a formula, with the comma or the point of the language */
const decimal = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/,/g, '.') : text)
/** A number of four or more digits: English writes 12,000, the others 12 000 (from five digits) */
const big = (language: UnitLanguage, value: number) => (language === 'en' ? value.toLocaleString('en-US') : value >= 10000 ? value.toLocaleString('en-US').replace(/,/g, ' ') : String(value))

function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Words({ x, y, children, color = INK, size = 16 }: { x: number; y: number; children: string; color?: string; size?: number }) {
    return <Label x={x} y={y} fontSize={size} fill={color}>{children}</Label>
}

function Frame({ box, cell, ox, oy, labelStep = 1, xUnit = 1, yUnit = 1, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; xUnit?: number; yUnit?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

/** A machine box with its operation */
function Machine({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
    return (
        <g>
            <rect x={x - 62} y={y - 24} width={124} height={48} rx={10} fill={CARD} stroke={color} strokeWidth={2.6} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill={color} direction="ltr">{label}</text>
        </g>
    )
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
    return (
        <g>
            <line x1={x1} y1={y} x2={x2 - 10} y2={y} stroke={MUTED} strokeWidth={2.4} />
            <polygon points={`${x2},${y} ${x2 - 12},${y - 7} ${x2 - 12},${y + 7}`} fill={MUTED} />
        </g>
    )
}

/* ---------- 2.1 A discount and VAT in both orders ---------- */

export function TaxDiscountFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const vat = decimal(language, '·1,21')
    const row = (y: number, first: [string, string], second: [string, string], middle: string, end: string) => (
        <g>
            <F x={40} y={y + 7} size={20}>100</F>
            <Arrow x1={80} x2={118} y={y} />
            <Machine x={182} y={y} label={first[0]} color={first[1]} />
            <Arrow x1={246} x2={290} y={y} />
            <F x={330} y={y + 7} size={20} anchor="middle">{middle}</F>
            <Arrow x1={372} x2={410} y={y} />
            <Machine x={474} y={y} label={second[0]} color={second[1]} />
            <Arrow x1={538} x2={576} y={y} />
            <F x={590} y={y + 7} size={22} color={GREEN}>{end}</F>
        </g>
    )
    return (
        <Figure height={260} label={t(say('Deskontua eta BEZa bi ordenetan: 108,9 € eta 111 €', 'Descuento e IVA en los dos órdenes: 108,9 € y 111 €', 'الخصم والضريبة بالترتيبين: 108.9 € و111 €', 'Discount and VAT in both orders: €108.9 and €111'))}>
            <F x={40} y={40} color={STAGE}>f ∘ g</F>
            <Words x={110} y={40} color={MUTED}>{t(say('lehenik deskontua', 'primero el descuento', 'أولًا الخصم', 'discount first'))}</Words>
            {row(84, ['− 10', SECOND], [vat, STAGE], '90', decimal(language, '108,9'))}
            <F x={40} y={160} color={STAGE}>g ∘ f</F>
            <Words x={110} y={160} color={MUTED}>{t(say('lehenik BEZa', 'primero el IVA', 'أولًا الضريبة', 'VAT first'))}</Words>
            {row(204, [vat, STAGE], ['− 10', SECOND], '121', '111')}
        </Figure>
    )
}

/* ---------- 3.2 Growing and falling by a percentage ---------- */

export function PercentFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in years, y in units of 20 (index 100 at the start)
    return (
        <Figure height={372} label={t(say('% 20 hazten den kopurua eta % 20 jaisten dena, biak 100 baliotik', 'Una cantidad que crece un 20 % y otra que baja un 20 %, las dos desde 100', 'كمية تنمو 20 % وأخرى تنقص 20 %، كلتاهما من 100', 'An amount growing 20 % and one falling 20 %, both from 100'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 12 }} cell={24} ox={50} oy={42} labelStep={2} yUnit={20}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => (100 * 1.2 ** x) / 20, 0, 8, 0.05)} color={GREEN} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => (100 * 0.8 ** x) / 20, 0, 8, 0.05)} color={SECOND} width={4} clip={clip} />
                        <PlanePoint map={map} point={[0, 5]} color={INK} radius={6} />
                    </g>
                )}
            </Frame>
            <F x={330} y={70} color={GREEN}>{`y = 100 · ${decimal(language, '1,2')}ᵗ`}</F>
            <Words x={330} y={100} color={GREEN}>{t(say('% 20 hazi: bider 1,2', 'Crecer un 20 %: por 1,2', 'النمو 20 %: الضرب في 1.2', 'Growing 20 %: times 1.2'))}</Words>
            <F x={330} y={160} color={SECOND}>{`y = 100 · ${decimal(language, '0,8')}ᵗ`}</F>
            <Words x={330} y={190} color={SECOND}>{t(say('% 20 jaitsi: bider 0,8', 'Bajar un 20 %: por 0,8', 'النقص 20 %: الضرب في 0.8', 'Falling 20 %: times 0.8'))}</Words>
            <Words x={330} y={250} color={MUTED}>{t(say('Ez dira simetrikoak: jaitsierak ez du 0 ukitzen', 'No son simétricas: la bajada nunca toca el 0', 'ليستا متناظرتين: التناقص لا يلمس 0', 'They are not mirror images: the fall never touches 0'))}</Words>
        </Figure>
    )
}

/* ---------- 3.3 The exponential and the line through two data ---------- */

export function TwoPointsExpFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // y in units of 20
    return (
        <Figure height={372} label={t(say('80·1,25ˣ esponentziala eta 80 + 20x zuzena: x = 4 denean, 195 eta 160', 'La exponencial 80·1,25ˣ y la recta 80 + 20x: en x = 4, 195 y 160', 'الأسية 80·1.25ˣ والمستقيم 80 + 20x: عند x = 4 القيمتان 195 و160', 'The exponential 80·1.25ˣ and the line 80 + 20x: at x = 4, 195 and 160'))}>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 12 }} cell={24} ox={50} oy={42} yUnit={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => (80 * 1.25 ** x) / 20, 0, 5, 0.05)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[0, 4], [5, 9]]} color={MUTED} width={2.6} dashed clip={clip} />
                        <PlanePoint map={map} point={[0, 4]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[1, 5]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[4, 195.3125 / 20]} color={STAGE} radius={6.5} />
                        <PlanePoint map={map} point={[4, 8]} color={MUTED} radius={6} />
                    </g>
                )}
            </Frame>
            <F x={260} y={70} color={STAGE}>{`y = 80 · ${decimal(language, '1,25')}ˣ`}</F>
            <F x={260} y={106} color={MUTED}>y = 80 + 20x</F>
            <F x={260} y={160} color={STAGE}>{`x = 4 → ${decimal(language, '195,3')}`}</F>
            <F x={260} y={196} color={MUTED}>x = 4 → 160</F>
            <Words x={260} y={250} color={INK}>{t(say('Bi datu berak, bi estimazio oso desberdin', 'Los mismos dos datos, dos estimaciones muy distintas', 'البيانتان نفسهما وتقديران مختلفان جدًّا', 'The same two data, two very different estimates'))}</Words>
        </Figure>
    )
}

/* ---------- 4.3 When? ---------- */

export function SolveTimeFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in years, y in units of 1000 euros
    return (
        <Figure height={372} label={t(say('15 000 · 0,8ᵗ balioa 6000 azpitik jaisten da t ≈ 4,11 denean', 'El valor 15 000 · 0,8ᵗ baja de 6000 en t ≈ 4,11', 'القيمة 15 000 · 0.8ᵗ تنزل تحت 6000 عند t ≈ 4.11', 'The value 15,000 · 0.8ᵗ drops below 6,000 at t ≈ 4.11'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 16 }} cell={18} ox={60} oy={42} labelStep={4} yUnit={1000}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 6], [8, 6]]} color={SECOND} width={2.4} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => 15 * 0.8 ** x, 0, 8, 0.05)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[4.11, 0], [4.11, 6]]} color={MUTED} width={1.8} dashed clip={clip} />
                        <PlanePoint map={map} point={[4.11, 6]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={290} y={70} color={STAGE}>{`V = ${big(language, 15000)} · ${decimal(language, '0,8')}ᵗ`}</F>
            <F x={290} y={110} color={SECOND}>{`V = ${big(language, 6000)}`}</F>
            <F x={290} y={170} color={INK}>{`${decimal(language, '0,8')}ᵗ = ${decimal(language, '0,4')}`}</F>
            <F x={290} y={210} color={INK}>{`t ≈ ${decimal(language, '4,11')}`}</F>
        </Figure>
    )
}

/* ---------- 5.1 Doubling ---------- */

export function DoublingFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const T = Math.log(2) / Math.log(1.05)
    // x in units of 10 years, y in units of the starting amount
    return (
        <Figure height={350} label={t(say('% 5 hazten den biztanleria 14,2 urtean behin bikoizten da', 'Una población que crece un 5 % se duplica cada 14,2 años', 'سكان ينمون 5 % يتضاعفون كل 14.2 سنة', 'A population growing 5 % doubles every 14.2 years'))}>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 9 }} cell={30} ox={44} oy={42} xUnit={10}>
                {(map, clip) => (
                    <g>
                        {[1, 2, 4, 8].map((level) => <PlanePath key={level} map={map} points={[[0, level], [5, level]]} color={MUTED} width={1.4} dashed clip={clip} />)}
                        <PlanePath map={map} points={sampled((x) => 1.05 ** (10 * x), 0, 5, 0.02)} color={STAGE} width={4} clip={clip} />
                        {[0, 1, 2, 3].map((n) => <PlanePoint key={n} map={map} point={[(n * T) / 10, 2 ** n]} color={SECOND} radius={6} />)}
                    </g>
                )}
            </Frame>
            <F x={250} y={70} color={STAGE}>{`${decimal(language, '1,05')}ᵀ = 2`}</F>
            <F x={250} y={108} color={STAGE}>{`T ≈ ${decimal(language, '14,2')}`}</F>
            <F x={250} y={170} color={SECOND}>1 → 2 → 4 → 8</F>
            <Words x={250} y={220} color={MUTED}>{t(say('Urrats guztiek denbora bera dute', 'Todos los pasos tardan lo mismo', 'كل الخطوات تستغرق الزمن نفسه', 'Every step takes the same time'))}</Words>
        </Figure>
    )
}

/* ---------- 5.2 The logistic curve ---------- */

export function LogisticFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const sales = (x: number) => 12000 / (1 + 399 * 1.1 ** -x)
    // x in units of 20 days, y in units of 2000 sales
    return (
        <Figure height={330} label={t(say('Salmenta logistikoak: 30 salmentatik 12 000 sabairantz; 6000 baliora 63. egunean iristen dira', 'Ventas logísticas: de 30 hacia el techo de 12 000; llegan a 6000 el día 63', 'مبيعات لوجستية: من 30 نحو سقف 12 000؛ تبلغ 6000 في اليوم 63', 'Logistic sales: from 30 towards the ceiling of 12,000; they reach 6,000 on day 63'))}>
            <Frame box={{ xMin: 0, xMax: 7, yMin: 0, yMax: 7 }} cell={30} ox={60} oy={42} xUnit={20} yUnit={2000}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 6], [7, 6]]} color={SECOND} width={2.4} dashed clip={clip} />
                        <PlanePath map={map} points={[[0, 3], [3.14, 3]]} color={MUTED} width={1.6} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => sales(20 * x) / 2000, 0, 7, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[62.8 / 20, 3]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={300} y={70} color={SECOND}>{`M = ${big(language, 12000)}`}</F>
            <F x={300} y={110} color={STAGE}>V(0) = 30</F>
            <F x={300} y={150} color={INK}>{`${decimal(language, '1,1')}ˣ = 399`}</F>
            <F x={300} y={190} color={INK}>{`x ≈ ${decimal(language, '62,8')}`}</F>
            <Words x={300} y={240} color={MUTED}>{t(say('Erdian, azkarren hazten da', 'En la mitad crece más deprisa', 'في المنتصف تنمو بأقصى سرعة', 'Halfway up it grows fastest'))}</Words>
        </Figure>
    )
}

/* ---------- 5.3 A logarithmic model ---------- */

export function LogModelFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const customers = (x: number) => 200 + 150 * Math.log10(x)
    // x in units of 200 thousand euros, y in units of 100 customers
    return (
        <Figure height={330} label={t(say('C(x) = 200 + 150 log x: 10 milarekin 350, 100 milarekin 500 eta 1000 milarekin 650 bezero', 'C(x) = 200 + 150 log x: con 10 mil, 350; con 100 mil, 500; con 1000 mil, 650 clientes', 'C(x) = 200 + 150 log x: مع 10 آلاف 350، ومع 100 ألف 500، ومع 1000 ألف 650 عميلًا', 'C(x) = 200 + 150 log x: 350 customers with 10 thousand, 500 with 100 thousand and 650 with 1,000 thousand'))}>
            <Frame box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 8 }} cell={30} ox={56} oy={42} xUnit={200} yUnit={100}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => customers(200 * x) / 100, 0.005, 6, 0.005)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[0.05, 3.5]} color={INK} radius={5.5} />
                        <PlanePoint map={map} point={[0.5, 5]} color={INK} radius={5.5} />
                        <PlanePoint map={map} point={[5, 6.5]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={300} y={70} color={STAGE}>C(x) = 200 + 150 log x</F>
            <F x={300} y={120} color={INK}>C(10) = 350</F>
            <F x={300} y={156} color={INK}>C(100) = 500</F>
            <F x={300} y={192} color={SECOND}>{`C(${big(language, 1000)}) = 650`}</F>
            <Words x={300} y={246} color={MUTED}>{t(say('Bikoiztu ez: bider 10, beti 150 gehiago', 'No duplicar: por 10, siempre 150 más', 'ليس التضاعف: في 10 دائمًا 150 أكثر', 'Not doubling: times 10, always 150 more'))}</Words>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function SocExpHeroArt() {
    const map = planeMap({ xMin: -3, xMax: 7, yMin: -2, yMax: 6 }, 30, 30, 44)
    return (
        <svg viewBox="0 0 360 300" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <rect x={map.x(-3)} y={map.y(6)} width={map.width} height={map.height} fill={CARD} rx={6} />
            <PlaneGrid map={map} labels={false} />
            <PlanePath map={map} points={sampled((x) => 2 ** x, -3, 2.55)} color={STAGE} width={4} />
            <PlanePath map={map} points={sampled((x) => Math.log2(x), 0.02, 7)} color={SECOND} width={4} />
            <PlanePath map={map} points={[[-2, -2], [6, 6]]} color={MUSTARD} width={2.2} dashed />
            <PlanePath map={map} points={sampled((x) => 5 / (1 + 30 * 2 ** -(x + 2)), -3, 7)} color={GREEN} width={3} />
            <PlanePoint map={map} point={[0, 1]} color={STAGE} radius={6} />
            <PlanePoint map={map} point={[1, 0]} color={SECOND} radius={6} />
        </svg>
    )
}
