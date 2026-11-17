import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Formula } from '../dbh2-estatistika-v2/figures'
import { INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { phiDensity } from '../batx2-zientziak-banaketak/normal'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — lesson figures, each
   with the numbers of its «Let's solve»: samples around an unknown μ, the
   bell with its central part and two tails, the critical value of 92 %,
   an interval on an axis (used by several lessons), twenty intervals
   around μ, the error against n, three errors side by side, the parabola
   p̂q̂, a poll with its margins, a claim outside the interval and the two
   sample sizes. Formulas left to right; Arabic words through Label.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const SECOND_TINT = 'rgba(196, 67, 42, 0.22)'
const GREEN = '#267b53'

function Word({ x, y, language, text, size = 15, color = INK, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function bell({ left, right, baseline, top, from, to }: { left: number; right: number; baseline: number; top: number; from: number; to: number }) {
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const sy = (value: number) => baseline - (phiDensity(value) / phiDensity(0)) * (baseline - top)
    const trace = (a: number, b: number, steps = 90) => Array.from({ length: steps + 1 }, (_, index) => a + ((b - a) * index) / steps).map((value, index) => `${index ? 'L' : 'M'}${sx(value).toFixed(1)} ${sy(value).toFixed(1)}`).join(' ')
    const area = (a: number, b: number) => `${trace(a, b, 60)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
    return { sx, curve: trace(from, to, 160), area }
}

/* ---------- 1. The point estimate ---------- */

export function EstimateFigure({ language }: { language: UnitLanguage }) {
    const sx = (value: number) => 80 + ((value - 290) / 40) * 560
    const others = [301, 306, 318, 323, 309]
    return (
        <Figure height={200} label={pick(language, say('Laginen batez bestekoak, μ ezezagunaren inguruan', 'Las medias de las muestras alrededor de μ, desconocida', 'متوسطات العيّنات حول μ المجهولة', 'The sample means around the unknown μ'))}>
            <line x1={60} x2={660} y1={120} y2={120} stroke={INK} strokeWidth={2} />
            <line x1={sx(310)} x2={sx(310)} y1={40} y2={130} stroke={LINE} strokeWidth={2} strokeDasharray="6 5" />
            <Formula x={sx(310)} y={32} size={18} color={MUTED}>μ = ?</Formula>
            {others.map((value) => <circle key={value} cx={sx(value)} cy={120} r={7} fill={PAPER} stroke={MUTED} strokeWidth={2} />)}
            <circle cx={sx(312)} cy={120} r={9} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            <Formula x={sx(312)} y={160} size={17} color={SECOND}>x̄ = 312</Formula>
            <Formula x={sx(300)} y={95} size={15} color={MUTED}>p̂ = {num(language, '0,36')}</Formula>
        </Figure>
    )
}

/* ---------- 2. The confidence level ---------- */

export function LevelFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 190, top: 40, from: -3.4, to: 3.4 })
    return (
        <Figure height={240} label={pick(language, say('Kanpaiaren erdiko zatia eta bi buztanak', 'La parte central de la campana y sus dos colas', 'الجزء الأوسط من الجرس وذيلاه', 'The central part of the bell and its two tails'))}>
            <path d={shape.area(-1.96, 1.96)} fill={STAGE_TINT} />
            <path d={shape.area(-3.4, -1.96)} fill={SECOND_TINT} />
            <path d={shape.area(1.96, 3.4)} fill={SECOND_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <line x1={50} x2={670} y1={190} y2={190} stroke={INK} strokeWidth={2} />
            {[-1.96, 0, 1.96].map((z) => <Formula key={z} x={shape.sx(z)} y={216} size={15} color={z === 0 ? INK : SECOND}>{num(language, String(z).replace('.', ','))}</Formula>)}
            <Formula x={shape.sx(0)} y={140} size={20} color={STAGE}>{num(language, '0,95')}</Formula>
            <Formula x={shape.sx(-2.6)} y={160} size={15} color={SECOND}>{num(language, '0,025')}</Formula>
            <Formula x={shape.sx(2.6)} y={160} size={15} color={SECOND}>{num(language, '0,025')}</Formula>
        </Figure>
    )
}

/* ---------- 3. The critical value of 92 % ---------- */

export function CriticalFigure({ language }: { language: UnitLanguage }) {
    const shape = bell({ left: 60, right: 660, baseline: 170, top: 30, from: -3.4, to: 3.4 })
    return (
        <Figure height={270} label={pick(language, say('0,96 probabilitatea eta haren z', 'La probabilidad 0,96 y su z', 'الاحتمال 0.96 وقيمة z الخاصة به', 'The probability 0.96 and its z'))}>
            <path d={shape.area(-3.4, 1.75)} fill={STAGE_TINT} />
            <path d={shape.curve} fill="none" stroke={INK} strokeWidth={2.6} />
            <line x1={50} x2={670} y1={170} y2={170} stroke={INK} strokeWidth={2} />
            <line x1={shape.sx(1.75)} x2={shape.sx(1.75)} y1={60} y2={176} stroke={SECOND} strokeWidth={2.4} />
            <Formula x={shape.sx(1.75)} y={194} size={16} color={SECOND}>{num(language, '1,75')}</Formula>
            <Formula x={shape.sx(-0.3)} y={130} size={20} color={STAGE}>{num(language, '0,96')}</Formula>
            <rect x={150} y={212} width={420} height={44} rx={8} fill={PAPER} stroke={LINE} strokeWidth={1.6} />
            <Formula x={255} y={240} size={16} color={SECOND}>{num(language, '1,75 → 0,9599')}</Formula>
            <Formula x={465} y={240} size={16} color={MUTED}>{num(language, '1,76 → 0,9608')}</Formula>
        </Figure>
    )
}

/* ---------- An interval on an axis (several lessons) ---------- */

export function IntervalFigure({ language, low, centre, high, caption, relative = false }: { language: UnitLanguage; low: number; centre: number; high: number; caption: string; relative?: boolean }) {
    const pad = (high - low) * 0.45
    const sx = (value: number) => 70 + ((value - (low - pad)) / (high - low + 2 * pad)) * 580
    const label = (value: number) => (relative ? (value === centre ? 'x̄' : `x̄ ${value < centre ? '−' : '+'} ${num(language, String(Math.abs(value - centre)).replace('.', ','))}`) : num(language, String(value).replace('.', ',')))
    return (
        <Figure height={200} label={pick(language, say('Konfiantza-tartea', 'El intervalo de confianza', 'فترة الثقة', 'The confidence interval'))}>
            <line x1={50} x2={670} y1={110} y2={110} stroke={INK} strokeWidth={2} />
            <rect x={sx(low)} y={88} width={sx(high) - sx(low)} height={44} rx={10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={sx(centre)} cy={110} r={7} fill={SECOND} stroke={INK} strokeWidth={1.4} />
            {[low, centre, high].map((value) => <Formula key={value} x={sx(value)} y={value === centre ? 76 : 158} size={15} color={value === centre ? SECOND : STAGE}>{label(value)}</Formula>)}
            <Formula x={360} y={188} size={17}>{num(language, caption)}</Formula>
        </Figure>
    )
}

/* ---------- 5. Twenty intervals around μ ---------- */

export function HundredFigure({ language }: { language: UnitLanguage }) {
    const shifts = [0.4, -0.9, 1.3, -0.2, 0.7, -1.5, 0.1, 1.1, -0.6, 0.9, -1.1, 0.3, 2.4, -0.4, 1.6, -0.8, 0.5, -1.3, 0.2, 1.0]
    const sx = (value: number) => 360 + value * 70
    return (
        <Figure height={290} label={pick(language, say('20 tarte: 19 tartek harrapatzen dute μ', '20 intervalos: 19 atrapan μ', '20 فترة: 19 منها تلتقط μ', '20 intervals: 19 catch μ'))}>
            <line x1={sx(0)} x2={sx(0)} y1={14} y2={262} stroke={INK} strokeWidth={2.4} />
            <Formula x={sx(0)} y={282} size={17}>μ</Formula>
            {shifts.map((shift, index) => {
                const miss = Math.abs(shift) > 1.96
                const y = 22 + index * 12
                return <line key={index} x1={sx(shift - 1.96)} x2={sx(shift + 1.96)} y1={y} y2={y} stroke={miss ? SECOND : STAGE} strokeWidth={miss ? 4 : 3} strokeLinecap="round" />
            })}
            <Formula x={600} y={282} size={15} color={MUTED}>19 / 20</Formula>
        </Figure>
    )
}

/* ---------- 8. The error against n ---------- */

export function SizeFigure({ language }: { language: UnitLanguage }) {
    const sx = (n: number) => 90 + (n / 400) * 560
    const sy = (error: number) => 200 - (error / 6) * 170
    const curve = Array.from({ length: 121 }, (_, index) => 10 + index * 3.25).map((n, index) => `${index ? 'L' : 'M'}${sx(n).toFixed(1)} ${sy((1.96 * 15) / Math.sqrt(n)).toFixed(1)}`).join(' ')
    return (
        <Figure height={250} label={pick(language, say('Errorea n zenbakiaren arabera', 'El error según n', 'الخطأ بحسب n', 'The error against n'))}>
            <line x1={90} x2={660} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={90} x2={90} y1={20} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={90} x2={660} y1={sy(2)} y2={sy(2)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <path d={curve} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <line x1={sx(217)} x2={sx(217)} y1={sy(2)} y2={200} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 4" />
            <circle cx={sx(217)} cy={sy(2)} r={7} fill={SECOND} stroke={INK} strokeWidth={1.4} />
            <Formula x={sx(217)} y={226} size={16} color={SECOND}>217</Formula>
            <Formula x={70} y={sy(2) + 6} size={16} color={SECOND} anchor="end">2</Formula>
            <Formula x={672} y={226} size={16} anchor="end">n</Formula>
            <Formula x={70} y={30} size={16} anchor="end">E</Formula>
        </Figure>
    )
}

/* ---------- 9. Three errors side by side ---------- */

export function ChangesFigure({ language }: { language: UnitLanguage }) {
    const rows = [
        { radius: 1.96, text: '95 %   n = 100', value: '1,96', color: STAGE },
        { radius: 2.575, text: '99 %   n = 100', value: '2,575', color: SECOND },
        { radius: 0.98, text: '95 %   n = 400', value: '0,98', color: GREEN }
    ]
    const sx = (value: number) => 430 + value * 90
    return (
        <Figure height={220} label={pick(language, say('Hiru errore: maila eta laginaren arabera', 'Tres errores según el nivel y la muestra', 'ثلاثة أخطاء بحسب المستوى والعيّنة', 'Three errors by level and sample'))}>
            <line x1={sx(0)} x2={sx(0)} y1={20} y2={200} stroke={LINE} strokeWidth={2} />
            {rows.map((row, index) => {
                const y = 50 + index * 62
                return (
                    <g key={row.text}>
                        <rect x={sx(-row.radius)} y={y - 16} width={sx(row.radius) - sx(-row.radius)} height={32} rx={8} fill={PAPER} stroke={row.color} strokeWidth={2.6} />
                        <Formula x={sx(row.radius) + 10} y={y + 6} size={15} color={row.color} anchor="start">±{num(language, row.value)}</Formula>
                        <Formula x={20} y={y + 6} size={15} anchor="start">{row.text.replace(' %', language === 'en' ? '%' : ' %')}</Formula>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 12. The parabola p̂q̂ ---------- */

export function WorstCaseFigure({ language }: { language: UnitLanguage }) {
    const sx = (p: number) => 110 + p * 500
    const sy = (value: number) => 200 - (value / 0.25) * 150
    const curve = Array.from({ length: 101 }, (_, index) => index / 100).map((p, index) => `${index ? 'L' : 'M'}${sx(p).toFixed(1)} ${sy(p * (1 - p)).toFixed(1)}`).join(' ')
    return (
        <Figure height={250} label={pick(language, say('p̂q̂ handiena 0,5 zenbakian dago', 'p̂q̂ es máximo en 0,5', 'p̂q̂ أكبر ما يمكن عند 0.5', 'p̂q̂ is largest at 0.5'))}>
            <line x1={100} x2={630} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            <path d={curve} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <line x1={sx(0.5)} x2={sx(0.5)} y1={sy(0.25)} y2={200} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 4" />
            <circle cx={sx(0.5)} cy={sy(0.25)} r={7} fill={SECOND} stroke={INK} strokeWidth={1.4} />
            <Formula x={sx(0.5)} y={sy(0.25) - 14} size={16} color={SECOND}>{num(language, '0,25')}</Formula>
            <circle cx={sx(0.2)} cy={sy(0.16)} r={6} fill={PAPER} stroke={STAGE} strokeWidth={2} />
            <Formula x={sx(0.2) - 12} y={sy(0.16) - 10} size={15} color={STAGE} anchor="end">{num(language, '0,16')}</Formula>
            {[0, 0.2, 0.5, 1].map((p) => <Formula key={p} x={sx(p)} y={224} size={15} color={MUTED}>{num(language, String(p).replace('.', ','))}</Formula>)}
            <Formula x={650} y={224} size={16} anchor="start">p̂</Formula>
        </Figure>
    )
}

/* ---------- 13. A poll and its margins ---------- */

export function PollFigure({ language }: { language: UnitLanguage }) {
    const parties = [{ name: 'A', value: 30, color: STAGE }, { name: 'B', value: 28.5, color: SECOND }]
    const sy = (value: number) => 210 - value * 5.4
    const percent = (value: string) => (language === 'eu' ? `% ${value}` : language === 'en' ? `${value}%` : `${value} %`)
    return (
        <Figure height={250} label={pick(language, say('Bi alderdi eta haien errore-marjinak', 'Dos partidos y sus márgenes de error', 'حزبان وهامشا خطئهما', 'Two parties and their margins of error'))}>
            <line x1={120} x2={600} y1={210} y2={210} stroke={INK} strokeWidth={2} />
            {parties.map((party, index) => {
                const x = 240 + index * 220
                return (
                    <g key={party.name}>
                        <rect x={x - 45} y={sy(party.value)} width={90} height={210 - sy(party.value)} fill={party.color} fillOpacity={0.35} stroke={party.color} strokeWidth={2} />
                        <line x1={x} x2={x} y1={sy(party.value + 1.96)} y2={sy(party.value - 1.96)} stroke={INK} strokeWidth={2.4} />
                        <line x1={x - 14} x2={x + 14} y1={sy(party.value + 1.96)} y2={sy(party.value + 1.96)} stroke={INK} strokeWidth={2.4} />
                        <line x1={x - 14} x2={x + 14} y1={sy(party.value - 1.96)} y2={sy(party.value - 1.96)} stroke={INK} strokeWidth={2.4} />
                        <Formula x={x} y={sy(party.value + 1.96) - 10} size={16} color={party.color}>{num(language, percent(String(party.value).replace('.', ',')))}</Formula>
                        <Formula x={x} y={234} size={17}>{party.name}</Formula>
                    </g>
                )
            })}
            <Formula x={600} y={40} size={15} color={MUTED} anchor="end">n = 2500</Formula>
            <Formula x={600} y={62} size={15} color={MUTED} anchor="end">E = ±{num(language, '1,96')}</Formula>
        </Figure>
    )
}

/* ---------- 14. A claim outside the interval ---------- */

export function ClaimFigure({ language }: { language: UnitLanguage }) {
    const sx = (value: number) => 80 + ((value - 476) / 30) * 560
    return (
        <Figure height={200} label={pick(language, say('500 tartetik kanpo dago', '500 queda fuera del intervalo', '500 خارج الفترة', '500 is outside the interval'))}>
            <line x1={60} x2={660} y1={110} y2={110} stroke={INK} strokeWidth={2} />
            <rect x={sx(482.16)} y={88} width={sx(497.84) - sx(482.16)} height={44} rx={10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={sx(490)} cy={110} r={7} fill={STAGE} stroke={INK} strokeWidth={1.4} />
            <Formula x={sx(490)} y={76} size={15} color={STAGE}>490</Formula>
            {[482.16, 497.84].map((value) => <Formula key={value} x={sx(value)} y={158} size={15} color={STAGE}>{num(language, String(value).replace('.', ','))}</Formula>)}
            <circle cx={sx(500)} cy={110} r={9} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            <Formula x={sx(500)} y={76} size={17} color={SECOND}>500</Formula>
            <Word x={sx(500)} y={186} language={language} size={14} color={SECOND} text={say('kanpoan', 'fuera', 'خارج', 'outside')} />
        </Figure>
    )
}

/* ---------- 15. Two sample sizes ---------- */

export function TradeFigure({ language }: { language: UnitLanguage }) {
    const bars = [{ level: '95', n: 97, color: STAGE }, { level: '99', n: 166, color: SECOND }]
    const sy = (n: number) => 200 - n
    const percent = (value: string) => (language === 'eu' ? `% ${value}` : language === 'en' ? `${value}%` : `${value} %`)
    return (
        <Figure height={250} label={pick(language, say('Errore bera, bi maila', 'El mismo error, dos niveles', 'الخطأ نفسه، مستويان', 'The same error, two levels'))}>
            <line x1={160} x2={560} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            {bars.map((bar, index) => {
                const x = 270 + index * 180
                return (
                    <g key={bar.level}>
                        <rect x={x - 50} y={sy(bar.n)} width={100} height={bar.n} fill={bar.color} fillOpacity={0.35} stroke={bar.color} strokeWidth={2} />
                        <Formula x={x} y={sy(bar.n) - 10} size={18} color={bar.color}>n = {bar.n}</Formula>
                        <Formula x={x} y={226} size={17}>{percent(bar.level)}</Formula>
                    </g>
                )
            })}
            <Formula x={360} y={246} size={15} color={MUTED}>E ≤ 2</Formula>
        </Figure>
    )
}

/* ---------- Hero art: intervals around a target ---------- */

export function InferenceBatx2gHeroArt() {
    const shifts = [0.5, -0.8, 1.1, -0.3, 2.3, 0.2]
    return (
        <svg viewBox="0 0 240 160" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <rect x={10} y={14} width={220} height={132} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <line x1={120} x2={120} y1={24} y2={136} stroke={INK} strokeWidth={2.4} />
            {shifts.map((shift, index) => {
                const miss = Math.abs(shift) > 1.96
                return <line key={index} x1={120 + (shift - 1.96) * 22} x2={120 + (shift + 1.96) * 22} y1={36 + index * 18} y2={36 + index * 18} stroke={miss ? SECOND : STAGE} strokeWidth={5} strokeLinecap="round" />
            })}
        </svg>
    )
}
