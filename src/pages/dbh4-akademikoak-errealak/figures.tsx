import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { LineInterval, LinePoint, RealAxis } from '../dbh4-aplikatuak-errealak/realLine'
import { lineMap } from '../dbh4-aplikatuak-errealak/realLineMap'
import { interval } from '../dbh4-aplikatuak-errealak/reals'
import { interestTable, money } from './percent'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak · 4. DBH (akademikoak) — the lesson figures
   this unit adds to the ones it shares with the applied unit. Every label
   goes through <Label> (right to left in Arabic) and decimal commas become
   points in Arabic through `d()`.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = 'var(--coral-tint, #f8ddd5)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const LINE = 'var(--line, #d9d2c3)'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

/** Picks the text and, in Arabic, writes decimal commas as points */
const useText = (language: UnitLanguage) => {
    const arabic = language === 'ar'
    const d = (text: string) => (arabic ? text.replace(/(\d),(\d)/g, '$1.$2') : text)
    return { arabic, d, t: (text: LocalizedText) => d(pickText(language, text)) }
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={16} fill={tint} stroke={INK} strokeWidth={1.8} />
            {children}
        </g>
    )
}

/** A horizontal arrow with a label above it */
function Arrow({ x1, x2, y, label, color = SECOND }: { x1: number; x2: number; y: number; label: string; color?: string }) {
    return (
        <g>
            <line x1={x1} y1={y} x2={x2 - 10} y2={y} stroke={color} strokeWidth={2.6} />
            <path d={`M${x2} ${y} l-12 -7 v14 z`} fill={color} />
            <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle" fontSize={17} fontWeight={700} fill={color}>{label}</text>
        </g>
    )
}

/* ---------- Ordering rational numbers; there is always another between two ---------- */

export function OrderDensityFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const map = lineMap(0.5, 0.75, 70, 650, 196)
    return (
        <Figure height={290} label={t(say('5,556 < 5,565 < 5,665 eta 1/2 eta 3/4 artean 5/8', '5,556 < 5,565 < 5,665 y 5/8 entre 1/2 y 3/4', '5.556 < 5.565 < 5.665 و5/8 بين 1/2 و3/4'))}>
            <Label x={40} y={40} fontSize={16} fontWeight={700} fill={INK}>{t(say('Hamartarrak: konparatu zifraz zifra, ezkerretik', 'Decimales: compara cifra a cifra, desde la izquierda', 'العشريات: قارن رقمًا برقم من اليسار'))}</Label>
            <text x={40} y={76} fontSize={21} fontWeight={700} fill={INK}>{d('5,556 < 5,565 < 5,665 < 5,69')}</text>
            <Label x={40} y={120} fontSize={16} fontWeight={700} fill={INK}>{t(say('Bi arrazionalen artean beti dago beste bat: erdiko puntua', 'Entre dos racionales siempre hay otro: el punto medio', 'بين عددين نسبيين يوجد دائمًا عدد آخر: نقطة المنتصف'))}</Label>
            <RealAxis map={map} step={0.0625} labels={false} />
            <LinePoint map={map} value={0.5} name="1/2" color={STAGE} />
            <LinePoint map={map} value={0.75} name="3/4" color={STAGE} />
            <LinePoint map={map} value={0.625} name="5/8" />
            <LinePoint map={map} value={0.5625} name="9/16" color={MUSTARD} radius={5.5} fontSize={13} />
            <LinePoint map={map} value={0.6875} name="11/16" color={MUSTARD} radius={5.5} fontSize={13} />
            <text x={map.x(0.5)} y={map.y + 30} textAnchor="middle" fontSize={14} fill={MUTED}>{d('0,5')}</text>
            <text x={map.x(0.625)} y={map.y + 30} textAnchor="middle" fontSize={14} fill={MUTED}>{d('0,625')}</text>
            <text x={map.x(0.75)} y={map.y + 30} textAnchor="middle" fontSize={14} fill={MUTED}>{d('0,75')}</text>
            <text x={360} y={272} textAnchor="middle" fontSize={16} fill={MUTED}>(1/2 + 3/4) : 2 = 5/8</text>
        </Figure>
    )
}

/* ---------- Drawing √10 (Pythagoras) and 4/7 (Thales) on the line ---------- */

export function RepresentFigure({ language }: { language: UnitLanguage }) {
    const { t, arabic } = useText(language)
    const map = lineMap(0, 4, 40, 340, 230)
    const unit = map.x(1) - map.x(0)
    const radius = Math.sqrt(10) * unit
    const top = map.y - unit
    const thales = lineMap(0, 1, 420, 680, 230)
    const ray = (k: number) => ({ x: thales.x0 + k * 30, y: thales.y - k * 21 })
    const seventh = ray(7)
    const fourth = ray(4)
    return (
        <Figure height={326} label={t(say('√10 Pitagorasekin eta 4/7 Talesekin zuzenean', '√10 con Pitágoras y 4/7 con Tales en la recta', '√10 بفيثاغورس و4/7 بطاليس على المستقيم'))}>
            <Label x={40} y={34} fontSize={16} fontWeight={700} fill={INK}>{t(say('√10 = √(3² + 1²)', '√10 = √(3² + 1²)', '√10 = √(3² + 1²)'))}</Label>
            <RealAxis map={map} arabic={arabic} />
            <line x1={map.x(3)} y1={map.y} x2={map.x(3)} y2={top} stroke={INK} strokeWidth={2.4} />
            <line x1={map.x(0)} y1={map.y} x2={map.x(3)} y2={top} stroke={SECOND} strokeWidth={3.2} />
            <path d={`M${map.x(3)} ${top} A${radius} ${radius} 0 0 1 ${map.x(0) + radius} ${map.y}`} fill="none" stroke={SECOND} strokeWidth={2.2} strokeDasharray="6 5" />
            <text x={map.x(3) + 8} y={top + unit / 2 + 6} fontSize={15} fill={INK}>1</text>
            <text x={map.x(1.3)} y={top + 18} fontSize={18} fontWeight={700} fill={SECOND}>√10</text>
            <LinePoint map={map} value={Math.sqrt(10)} name="√10" above={false} />
            <Label x={420} y={34} fontSize={16} fontWeight={700} fill={INK}>{t(say('4/7 Talesen teoremarekin', '4/7 con el teorema de Tales', 'نضع 4/7 بمبرهنة طاليس'))}</Label>
            <line x1={thales.x0 - 14} y1={thales.y} x2={thales.x1 + 14} y2={thales.y} stroke={INK} strokeWidth={2.2} />
            {[0, 1].map((value) => (
                <g key={value}>
                    <line x1={thales.x(value)} y1={thales.y - 9} x2={thales.x(value)} y2={thales.y + 9} stroke={INK} strokeWidth={2} />
                    <text x={thales.x(value)} y={thales.y + 28} textAnchor="middle" fontSize={15} fill={MUTED}>{value}</text>
                </g>
            ))}
            <line x1={thales.x0} y1={thales.y} x2={seventh.x + 12} y2={seventh.y - 8} stroke={MUTED} strokeWidth={1.8} />
            {[1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={ray(k).x} cy={ray(k).y} r={3.4} fill={k === 4 ? STAGE : INK} />)}
            <line x1={seventh.x} y1={seventh.y} x2={thales.x1} y2={thales.y} stroke={MUTED} strokeWidth={1.8} />
            <line x1={fourth.x} y1={fourth.y} x2={thales.x(4 / 7)} y2={thales.y} stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 4" />
            <LinePoint map={thales} value={4 / 7} name="4/7" color={STAGE} above={false} />
            <Caption y={316}>{t(say('Erro bat: triangelu zuzen bat eta konpasa · zatiki bat: zuzen paraleloak', 'Una raíz: un triángulo rectángulo y el compás · una fracción: rectas paralelas', 'الجذر: مثلث قائم وفرجار · الكسر: مستقيمات متوازية'))}</Caption>
        </Figure>
    )
}

/* ---------- Locating an irrational by successive approximations ---------- */

export function SuccessiveFigure({ language }: { language: UnitLanguage }) {
    const { t, d, arabic } = useText(language)
    const value = 2 * Math.sqrt(6)
    const rows = [
        { from: 4, to: 5, step: 0.1, y: 66, ends: ['4', '5'] },
        { from: 4.8, to: 4.9, step: 0.01, y: 150, ends: ['4,8', '4,9'] },
        { from: 4.89, to: 4.9, step: 0.001, y: 234, ends: ['4,89', '4,90'] }
    ]
    return (
        <Figure height={312} label={t(say('2√6 = 4,8989… hiru zoomekin', '2√6 = 4,8989… con tres zooms', '2√6 = 4.8989… بثلاثة تكبيرات'))}>
            {rows.map((row, index) => {
                const map = lineMap(row.from, row.to, 70, 520, row.y)
                const next = rows[index + 1]
                return (
                    <g key={index}>
                        <RealAxis map={map} step={row.step} labels={false} arabic={arabic} />
                        <text x={map.x0} y={map.y + 28} textAnchor="middle" fontSize={15} fill={MUTED}>{d(row.ends[0])}</text>
                        <text x={map.x1} y={map.y + 28} textAnchor="middle" fontSize={15} fill={MUTED}>{d(row.ends[1])}</text>
                        {next && <path d={`M${map.x(next.from)} ${map.y + 6} L${70} ${next.y - 10} M${map.x(next.to)} ${map.y + 6} L${520} ${next.y - 10}`} stroke={LINE} strokeWidth={1.6} fill="none" />}
                        <LinePoint map={map} value={value} color={SECOND} radius={6} />
                    </g>
                )
            })}
            <Label x={560} y={72} fontSize={15} fill={INK}>{d('4 < 2√6 < 5')}</Label>
            <Label x={560} y={156} fontSize={15} fill={INK}>{d('4,8 < 2√6 < 4,9')}</Label>
            <Label x={560} y={240} fontSize={15} fill={INK}>{d('4,89 < 2√6 < 4,90')}</Label>
            <text x={360} y={300} textAnchor="middle" fontSize={16} fill={MUTED}>{d('2√6 = 4,898979…')}</text>
        </Figure>
    )
}

/* ---------- Union and intersection of intervals ---------- */

export function IntervalOpsFigure({ language }: { language: UnitLanguage }) {
    const { t, arabic } = useText(language)
    const map = lineMap(-7, 5, 60, 440, 120)
    return (
        <Figure height={260} label={t(say('A = [−5, 3] eta B = (−1, +∞): bildura eta ebakidura', 'A = [−5, 3] y B = (−1, +∞): unión e intersección', 'A = [−5، 3] وB = (−1، +∞): الاتحاد والتقاطع'))}>
            <RealAxis map={map} arabic={arabic} labelEvery={2} fontSize={14} />
            <LineInterval map={map} value={interval(-5, 3, true, true)} lift={22} />
            <LineInterval map={map} value={interval(-1, null, false, false)} color={SECOND} lift={44} />
            <text x={map.x(-5) - 12} y={map.y - 30} textAnchor="end" fontSize={18} fontWeight={700} fill={STAGE}>A</text>
            <text x={map.x(-1) - 12} y={map.y - 52} textAnchor="end" fontSize={18} fontWeight={700} fill={SECOND}>B</text>
            <Card x={500} y={20} width={196} height={70} tint={STAGE_TINT}>
                <Label x={516} y={46} fontSize={15} fontWeight={700} fill={INK}>{t(say('Bildura', 'Unión', 'الاتحاد'))}</Label>
                <text x={680} y={46} textAnchor="end" fontSize={15} fontWeight={700} fill={INK}>A ∪ B</text>
                <text x={516} y={76} fontSize={18} fontWeight={700} fill={STAGE}>[−5, +∞)</text>
            </Card>
            <Card x={500} y={100} width={196} height={70} tint={MUSTARD_TINT}>
                <Label x={516} y={126} fontSize={15} fontWeight={700} fill={INK}>{t(say('Ebakidura', 'Intersección', 'التقاطع'))}</Label>
                <text x={680} y={126} textAnchor="end" fontSize={15} fontWeight={700} fill={INK}>A ∩ B</text>
                <text x={516} y={156} fontSize={18} fontWeight={700} fill={INK}>(−1, 3]</text>
            </Card>
            <Label x={40} y={204} fontSize={15} fill={INK}>{t(say('Bildura: bietako batean dauden zenbakiak · ebakidura: bietan aldi berean daudenak', 'Unión: los números que están en alguno de los dos · intersección: en los dos a la vez', 'الاتحاد: الأعداد الموجودة في إحداهما · التقاطع: الموجودة فيهما معًا'))}</Label>
            <Label x={40} y={234} fontSize={15} fill={MUTED}>{t(say('Ebakidura hutsa izan daiteke:', 'La intersección puede ser vacía:', 'قد يكون التقاطع خاليًا:'))}</Label>
            <text x={680} y={234} textAnchor="end" fontSize={15} fill={MUTED}>[0, 1) ∩ [1, 2] = ∅</text>
        </Figure>
    )
}

/* ---------- Approximating by defect and by excess ---------- */

export function DefectExcessFigure({ language }: { language: UnitLanguage }) {
    const { t, d, arabic } = useText(language)
    const map = lineMap(5.23, 5.24, 90, 600, 80)
    const value = 5.23888
    return (
        <Figure height={250} label={t(say('5,23888… gutxiagoz 5,23 da eta gehiagoz 5,24', '5,23888… por defecto es 5,23 y por exceso 5,24', '5.23888… بالنقصان 5.23 وبالزيادة 5.24'))}>
            <RealAxis map={map} step={0.001} labels={false} arabic={arabic} />
            <text x={map.x0} y={map.y + 30} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{d('5,23')}</text>
            <text x={map.x1} y={map.y + 30} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{d('5,24')}</text>
            <LinePoint map={map} value={value} name={d('5,23888…')} />
            <Label x={map.x0} y={map.y + 56} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('gutxiagoz', 'por defecto', 'بالنقصان'))}</Label>
            <Label x={map.x1 + 40} y={map.y + 56} textAnchor="end" fontSize={15} fontWeight={700} fill={GREEN}>{t(say('gehiagoz = biribiltzea', 'por exceso = redondeo', 'بالزيادة = التقريب'))}</Label>
            <line x1={map.x(value)} y1={map.y + 74} x2={map.x1} y2={map.y + 74} stroke={GREEN} strokeWidth={2.4} />
            <text x={(map.x(value) + map.x1) / 2} y={map.y + 94} textAnchor="middle" fontSize={14} fill={GREEN}>{d('0,00112 < 0,005')}</text>
            <Card x={40} y={190} width={640} height={44} tint={MUSTARD_TINT}>
                <Label x={360} y={218} textAnchor="middle" fontSize={14} fill={INK}>{t(say('Biribiltzean, errorea ez da azken ordenaren unitate erdia baino handiagoa: errore-bornea', 'Al redondear, el error no supera media unidad del último orden: es la cota de error', 'عند التقريب لا يتجاوز الخطأ نصف وحدة آخر منزلة: إنه حدّ الخطأ'))}</Label>
            </Card>
        </Figure>
    )
}

/* ---------- Percent as a fraction and a decimal ---------- */

export function PercentFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const cell = 18
    return (
        <Figure height={262} label={t(say('% 16 = 16/100 = 0,16; 220ren % 16 = 35,2', '16 % = 16/100 = 0,16; el 16 % de 220 = 35,2', '16 % = 16/100 = 0.16؛ 16 % من 220 = 35.2'))}>
            {Array.from({ length: 100 }, (_, index) => (
                <rect key={index} x={40 + (index % 10) * cell} y={34 + Math.floor(index / 10) * cell} width={cell} height={cell} fill={index < 16 ? STAGE : CARD} stroke={LINE} strokeWidth={1} />
            ))}
            <rect x={40} y={34} width={cell * 10} height={cell * 10} fill="none" stroke={INK} strokeWidth={2} />
            <Label x={130} y={240} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{t(say('100etik 16', '16 de cada 100', '16 من كل 100'))}</Label>
            <text x={270} y={92} fontSize={26} fontWeight={700} fill={INK}>{d('16 % = 16/100 = 0,16')}</text>
            <Label x={260} y={132} fontSize={16} fill={INK}>{t(say('Kantitate baten ehunekoa: biderkatu hamartarraz', 'El tanto por ciento de una cantidad: por el decimal', 'النسبة من كمية: اضرب في العشري'))}</Label>
            <text x={260} y={166} fontSize={21} fontWeight={700} fill={SECOND}>{d('16 % · 220 = 0,16 · 220 = 35,2')}</text>
            <Label x={260} y={206} fontSize={16} fill={MUTED}>{t(say('Zer ehuneko da? Zatitu eta bider 100:', '¿Qué porcentaje es? Divide y por 100:', 'ما النسبة؟ اقسم واضرب في 100:'))}</Label>
            <text x={260} y={232} fontSize={17} fill={MUTED}>{d('6/24 = 0,25 → 25 %')}</text>
        </Figure>
    )
}

/* ---------- Percentage increases and decreases: the index ---------- */

export function PercentChangeFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const base = 300
    const bar = (y: number, value: number, color: string, tint: string, text: string, index: string) => (
        <g>
            <rect x={60} y={y} width={(base * value) / 100} height={40} rx={8} fill={tint} stroke={color} strokeWidth={2} />
            <text x={70} y={y + 27} fontSize={17} fontWeight={700} fill={INK}>{text}</text>
            <text x={60 + (base * value) / 100 + 14} y={y + 27} fontSize={20} fontWeight={700} fill={color}>{d(index)}</text>
        </g>
    )
    return (
        <Figure height={268} label={t(say('% 21 igotzea: bider 1,21; % 20 jaistea: bider 0,80', 'Subir un 21 %: por 1,21; bajar un 20 %: por 0,80', 'الزيادة 21 %: الضرب في 1.21؛ النقصان 20 %: الضرب في 0.80'))}>
            {bar(30, 100, INK, CARD, '100 %', '× 1')}
            {bar(90, 121, SECOND, SECOND_TINT, '100 % + 21 % = 121 %', '× 1,21')}
            {bar(150, 80, STAGE, STAGE_TINT, '100 % − 20 % = 80 %', '× 0,80')}
            <line x1={60 + base} y1={24} x2={60 + base} y2={196} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
            <Label x={40} y={232} fontSize={16} fontWeight={700} fill={INK}>{t(say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغير'))}</Label>
            <text x={680} y={232} textAnchor="end" fontSize={17} fill={INK}>↑ 1 + p/100     ↓ 1 − p/100</text>
            <Caption y={258}>{d(t(say('Amaierako kantitatea = hasierakoa · indizea', 'Cantidad final = cantidad inicial · índice', 'الكمية النهائية = الكمية الأولية · المؤشر')))}</Caption>
        </Figure>
    )
}

/* ---------- Chained percentages ---------- */

export function ChainedFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const box = (x: number, text: string, tint: string) => (
        <g>
            <rect x={x} y={70} width={150} height={56} rx={12} fill={tint} stroke={INK} strokeWidth={1.8} />
            <text x={x + 75} y={106} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{d(text)}</text>
        </g>
    )
    return (
        <Figure height={266} label={t(say('18 000 € − % 20 + % 21 BEZ = 17 424 €', '18 000 € − 20 % + 21 % de IVA = 17 424 €', '18 000 € − 20 % + 21 % ضريبة = 17 424 €'))}>
            <Label x={40} y={38} fontSize={16} fontWeight={700} fill={INK}>{t(say('Auto bat: % 20ko deskontua eta gero % 21 BEZ', 'Un coche: descuento del 20 % y después 21 % de IVA', 'سيارة: خصم 20 % ثم ضريبة 21 %'))}</Label>
            {box(30, '18 000 €', CARD)}
            <Arrow x1={184} x2={276} y={98} label={d('× 0,80')} color={STAGE} />
            {box(280, '14 400 €', STAGE_TINT)}
            <Arrow x1={434} x2={526} y={98} label={d('× 1,21')} />
            {box(530, '17 424 €', SECOND_TINT)}
            <text x={360} y={176} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{d('0,80 · 1,21 = 0,968')}</text>
            <Label x={360} y={208} textAnchor="middle" fontSize={16} fill={INK}>{t(say('Indizeak biderkatzen dira, ez dira ehunekoak batzen: azkenean % 3,2 merkeago', 'Los índices se multiplican, los porcentajes no se suman: al final, un 3,2 % más barato', 'تُضرب المؤشرات ولا تُجمع النسب: في النهاية أرخص بـ 3.2 %'))}</Label>
            <Caption y={248}>{d(t(say('−20 % + 21 % ≠ +1 %', '−20 % + 21 % ≠ +1 %', '−20 % + 21 % ≠ +1 %')))}</Caption>
        </Figure>
    )
}

/* ---------- From the final amount back to the initial one ---------- */

export function InverseFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={262} label={t(say('C · 0,875 = 98 → C = 98 : 0,875 = 112', 'C · 0,875 = 98 → C = 98 : 0,875 = 112', 'C · 0.875 = 98 → C = 98 : 0.875 = 112'))}>
            <Label x={40} y={38} fontSize={16} fontWeight={700} fill={INK}>{t(say('Heriotzak % 12,5 jaitsi dira eta aurten 98 izan dira.', 'La mortalidad ha bajado un 12,5 % y este año ha habido 98 muertes.', 'انخفضت الوفيات 12.5 % وكانت هذا العام 98.'))}</Label>
            <Label x={40} y={60} fontSize={16} fontWeight={700} fill={INK}>{t(say('Zenbat izan ziren iaz?', '¿Cuántas hubo el año pasado?', 'كم كانت العام الماضي؟'))}</Label>
            <rect x={60} y={80} width={150} height={56} rx={12} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={135} y={116} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>C</text>
            <Arrow x1={214} x2={420} y={96} label={d('× 0,875')} color={STAGE} />
            <rect x={424} y={80} width={150} height={56} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={499} y={116} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>98</text>
            <line x1={420} y1={124} x2={226} y2={124} stroke={SECOND} strokeWidth={2.6} />
            <path d="M214 124 l12 -7 v14 z" fill={SECOND} />
            <text x={317} y={152} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{d(': 0,875')}</text>
            <text x={360} y={196} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{d('C = 98 : 0,875 = 112')}</text>
            <Caption y={240}>{t(say('Atzera egiteko, zatitu indizeaz; ez kendu ehunekoa amaierako kantitateari', 'Para volver atrás, divide entre el índice; no restes el porcentaje a la cantidad final', 'للرجوع اقسم على المؤشر؛ لا تطرح النسبة من الكمية النهائية'))}</Caption>
        </Figure>
    )
}

/* ---------- Simple and compound interest, year by year ---------- */

function InterestBars({ language, compound }: { language: UnitLanguage; compound: boolean }) {
    const { d } = useText(language)
    const table = interestTable(1000, 2, 5)
    const height = (value: number) => (value - 950) * 0.95
    return (
        <g>
            <line x1={50} y1={230} x2={690} y2={230} stroke={INK} strokeWidth={2} />
            {table.map((row) => {
                const value = compound ? row.compound : row.simple
                const x = 70 + row.year * 104
                return (
                    <g key={row.year}>
                        <rect x={x} y={230 - height(value)} width={64} height={height(value)} rx={6} fill={compound ? SECOND_TINT : STAGE_TINT} stroke={compound ? SECOND : STAGE} strokeWidth={1.8} />
                        <text x={x + 32} y={222 - height(value)} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{d(money(value))}</text>
                        <text x={x + 32} y={250} textAnchor="middle" fontSize={14} fill={MUTED}>{row.year}</text>
                    </g>
                )
            })}
        </g>
    )
}

export function SimpleInterestFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={300} label={t(say('1000 € % 2an, interes sinplea: urtero 20 €', '1000 € al 2 %, interés simple: 20 € cada año', '1000 € بنسبة 2 %، فائدة بسيطة: 20 € كل عام'))}>
            <Label x={40} y={34} fontSize={16} fontWeight={700} fill={INK}>{t(say('Interes sinplea: urtero interes bera', 'Interés simple: cada año el mismo interés', 'الفائدة البسيطة: الفائدة نفسها كل عام'))}</Label>
            <text x={680} y={34} textAnchor="end" fontSize={17} fontWeight={700} fill={STAGE}>I = C · r · t / 100</text>
            <InterestBars language={language} compound={false} />
            <text x={360} y={286} textAnchor="middle" fontSize={15} fill={MUTED}>1000 € · 2 % · 5 → I = 1000 · 2 · 5 / 100 = 100 €</text>
        </Figure>
    )
}

export function CompoundInterestFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={300} label={t(say('1000 € % 2an, interes konposatua: urtero bider 1,02', '1000 € al 2 %, interés compuesto: cada año por 1,02', '1000 € بنسبة 2 %، فائدة مركبة: كل عام × 1.02'))}>
            <Label x={40} y={34} fontSize={16} fontWeight={700} fill={INK}>{t(say('Interes konposatua: interesak kapitalari gehitzen zaizkio', 'Interés compuesto: los intereses se suman al capital', 'الفائدة المركبة: تُضاف الفوائد إلى رأس المال'))}</Label>
            <text x={680} y={34} textAnchor="end" fontSize={17} fontWeight={700} fill={SECOND}>{d('× 1,02')}</text>
            <InterestBars language={language} compound />
            <text x={360} y={286} textAnchor="middle" fontSize={15} fill={MUTED}>{d('Cf = Ci · (1 + r/100)ᵗ = 1000 · 1,02⁵ = 1104,08 €')}</text>
        </Figure>
    )
}

/* ---------- Simple against compound, in the long run ---------- */

export function InterestCompareFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const table = interestTable(1000, 10, 10)
    const x = (year: number) => 70 + year * 56
    const y = (value: number) => 236 - (value - 1000) * 0.11
    const path = (key: 'simple' | 'compound') => table.map((row, index) => `${index === 0 ? 'M' : 'L'}${x(row.year)} ${y(row[key])}`).join(' ')
    return (
        <Figure height={300} label={t(say('1000 € % 10ean 10 urtez: sinplea 2000 € eta konposatua 2593,74 €', '1000 € al 10 % durante 10 años: simple 2000 € y compuesto 2593,74 €', '1000 € بنسبة 10 % لمدة 10 أعوام: بسيطة 2000 € ومركبة 2593.74 €'))}>
            <line x1={x(0)} y1={236} x2={x(10) + 14} y2={236} stroke={INK} strokeWidth={2} />
            <line x1={x(0)} y1={236} x2={x(0)} y2={40} stroke={INK} strokeWidth={2} />
            {table.map((row) => <text key={row.year} x={x(row.year)} y={256} textAnchor="middle" fontSize={13} fill={MUTED}>{row.year}</text>)}
            <path d={path('simple')} fill="none" stroke={STAGE} strokeWidth={3} />
            <path d={path('compound')} fill="none" stroke={SECOND} strokeWidth={3} />
            {table.map((row) => <circle key={row.year} cx={x(row.year)} cy={y(row.compound)} r={3.4} fill={SECOND} />)}
            <text x={x(10) + 10} y={y(2000) + 6} fontSize={16} fontWeight={700} fill={STAGE}>{d('2000 €')}</text>
            <text x={x(10) + 10} y={y(2593.74) + 6} fontSize={16} fontWeight={700} fill={SECOND}>{d('2593,74 €')}</text>
            <Label x={90} y={60} fontSize={15} fontWeight={700} fill={SECOND}>{t(say('konposatua: kurba (biderkatu)', 'compuesto: curva (se multiplica)', 'المركبة: منحنى (ضرب)'))}</Label>
            <Label x={90} y={84} fontSize={15} fontWeight={700} fill={STAGE}>{t(say('sinplea: zuzena (batu)', 'simple: recta (se suma)', 'البسيطة: خط مستقيم (جمع)'))}</Label>
            <Caption y={288}>{t(say('1000 € % 10ean · urte batean berdin; gero, konposatuak gero eta gehiago ematen du', '1000 € al 10 % · el primer año dan lo mismo; después, el compuesto da cada vez más', 'بنسبة 10 % تتساويان في العام الأول، ثم تعطي المركبة أكثر فأكثر'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function RealsPercentHeroArt() {
    const map = lineMap(0, 3, 50, 370, 226)
    const heights = [40, 52, 66, 82, 100]
    return (
        <div className="reals-v2-hero-art" aria-hidden="true">
            <svg viewBox="0 0 420 270" role="presentation" direction="ltr">
                <rect x={24} y={22} width={170} height={140} rx={16} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                <text x={109} y={84} textAnchor="middle" fontSize={54} fontWeight={700} fill={STAGE}>%</text>
                <text x={109} y={134} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>× 121/100</text>
                <rect x={214} y={22} width={182} height={140} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
                {heights.map((height, index) => <rect key={index} x={232 + index * 30} y={146 - height} width={22} height={height} rx={4} fill={index === heights.length - 1 ? SECOND_TINT : CARD} stroke={index === heights.length - 1 ? SECOND : INK} strokeWidth={1.8} />)}
                <path d="M243 98 Q300 86 355 40" fill="none" stroke={SECOND} strokeWidth={2.6} />
                <RealAxis map={map} labels />
                <LineInterval map={map} value={interval(1, 3, false, true)} lift={26} color={MUSTARD} />
                <LinePoint map={map} value={Math.SQRT2} name="√2" />
                <LinePoint map={map} value={2 / 3} name="2/3" color={STAGE} />
            </svg>
        </div>
    )
}
