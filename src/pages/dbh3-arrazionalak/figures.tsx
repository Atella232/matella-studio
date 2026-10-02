import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Bar, Figure } from '../dbh2-zatikiak-prototype/figures'
import { LinePoint, RealAxis } from '../dbh4-aplikatuak-errealak/realLine'
import { lineMap } from '../dbh4-aplikatuak-errealak/realLineMap'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — the lesson figures this unit adds to the
   ones it shares with the fractions units (2. DBH) and the real numbers
   units (4. DBH). Words go through <Label> (right to left in Arabic) and
   formulas stay in their own <text>, never mixed with Arabic words.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const LINE = 'var(--line, #d9d2c3)'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const useText = (language: UnitLanguage) => ({ arabic: language === 'ar', t: (text: LocalizedText) => pickText(language, text) })

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/* ---------- 17/6 on the line with Thales' theorem ---------- */

export function ThalesLineFigure({ language }: { language: UnitLanguage }) {
    const { t, arabic } = useText(language)
    const map = lineMap(0, 4, 60, 660, 230)
    const ray = (k: number) => ({ x: map.x(2) + k * 30, y: map.y - k * 24 })
    const last = ray(6)
    const fifth = ray(5)
    const negative = lineMap(-3, 0, 60, 300, 80)
    return (
        <Figure height={316} label={t(say('17/6 = 2 + 5/6 Talesen teoremarekin, eta −12/5 = −2 − 2/5', '17/6 = 2 + 5/6 con el teorema de Tales, y −12/5 = −2 − 2/5', '17/6 = 2 + 5/6 بمبرهنة طاليس و−12/5 = −2 − 2/5'))}>
            <RealAxis map={negative} arabic={arabic} fontSize={14} minor={5} />
            <LinePoint map={negative} value={-12 / 5} name="−12/5" />
            <text x={330} y={86} fontSize={17} fontWeight={700} fill={SECOND}>−12/5 = −2 − 2/5</text>
            <RealAxis map={map} arabic={arabic} fontSize={14} />
            <line x1={map.x(2)} y1={map.y} x2={last.x + 14} y2={last.y - 11} stroke={MUTED} strokeWidth={1.8} />
            {[1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={ray(k).x} cy={ray(k).y} r={3.4} fill={k === 5 ? STAGE : INK} />)}
            <line x1={last.x} y1={last.y} x2={map.x(3)} y2={map.y} stroke={MUTED} strokeWidth={1.8} />
            <line x1={fifth.x} y1={fifth.y} x2={map.x(17 / 6)} y2={map.y} stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 4" />
            <LinePoint map={map} value={17 / 6} name="17/6" color={STAGE} above={false} />
            <text x={90} y={170} fontSize={18} fontWeight={700} fill={STAGE}>17/6 = 2 + 5/6</text>
            <Caption y={306}>{t(say('Zatitu bi zenbaki osoren arteko tartea izendatzaileak adina zati berdinetan', 'Divide el tramo entre dos enteros en tantas partes iguales como indica el denominador', 'قسّم المجال بين عددين صحيحين أجزاء متساوية بعدد المقام'))}</Caption>
        </Figure>
    )
}

/* ---------- The part that is left ---------- */

export function RemainingFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={290} label={t(say('3/8 jan eta gero gainerakoaren 2/5: 3/8 geratzen da', 'Se come 3/8 y después 2/5 de lo que queda: queda 3/8', 'أُكل 3/8 ثم 2/5 مما بقي: يبقى 3/8'))}>
            <Label x={60} y={40} fontSize={16} fontWeight={700} fill={INK}>{t(say('Anek 3/8 jaten du', 'Ane se come 3/8', 'آنه تأكل 3/8'))}</Label>
            <Bar x={60} y={54} width={600} parts={8} filled={3} />
            <Label x={60} y={136} fontSize={16} fontWeight={700} fill={INK}>{t(say('Jonek gainerakoaren 2/5 jaten du', 'Jon se come 2/5 de lo que queda', 'جون يأكل 2/5 مما بقي'))}</Label>
            <Bar x={285} y={150} width={375} parts={5} filled={2} />
            <rect x={60} y={150} width={225} height={40} fill={LINE} stroke={INK} strokeWidth={1.6} />
            <text x={472} y={222} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>2/5 · 5/8 = 2/8</text>
            <text x={360} y={256} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>1 − 3/8 − 2/8 = 3/8</text>
            <Caption y={282}>{t(say('"Gainerakoaren" zatia: biderkatu geratzen den zatikiaz', 'La fracción "de lo que queda": multiplica por la fracción que queda', 'كسر "مما بقي": اضرب في الكسر الباقي'))}</Caption>
        </Figure>
    )
}

/* ---------- The whole from a part ---------- */

export function WholeFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const part = 75
    return (
        <Figure height={270} label={t(say('Osoaren 3/8 45 da: zati bakoitza 15, osoa 120', 'Los 3/8 del total son 45: cada parte es 15 y el total, 120', '3/8 من الكل يساوي 45: كل جزء 15 والكل 120'))}>
            <Label x={60} y={40} fontSize={16} fontWeight={700} fill={INK}>{t(say('Bidaiaren 3/8 45 km dira. Zenbat km ditu bidaiak?', 'Los 3/8 de un viaje son 45 km. ¿Cuántos km tiene el viaje?', '3/8 من رحلة يساوي 45 كم. كم كم طول الرحلة؟'))}</Label>
            <Bar x={60} y={70} width={600} parts={8} filled={3} />
            {Array.from({ length: 8 }, (_, index) => <text key={index} x={60 + part * index + part / 2} y={96} textAnchor="middle" fontSize={15} fontWeight={700} fill={index < 3 ? INK : MUTED}>15</text>)}
            <path d={`M60 114 v12 h${3 * part} v-12`} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={60 + 1.5 * part} y={160} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>45 : 3 = 15</text>
            <text x={360} y={204} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>15 · 8 = 120</text>
            <Caption y={256}>{t(say('Zatitu zenbakitzaileaz zati bat lortzeko; gero, biderkatu izendatzaileaz', 'Divide entre el numerador para tener una parte; después, multiplica por el denominador', 'اقسم على البسط لتحصل على جزء ثم اضرب في المقام'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function RationalsHeroArt() {
    const map = lineMap(-2, 2, 40, 380, 212)
    return (
        <div className="reals-v2-hero-art" aria-hidden="true">
            <svg viewBox="0 0 420 270" role="presentation" direction="ltr">
                <Bar x={30} y={30} width={170} height={44} parts={4} filled={3} />
                <Bar x={30} y={86} width={170} height={44} parts={8} filled={6} />
                <text x={240} y={70} fontSize={30} fontWeight={700} fill={INK}>3/4 = 6/8</text>
                <text x={240} y={118} fontSize={24} fontWeight={700} fill={SECOND}>−5/6 &lt; 2/3</text>
                <RealAxis map={map} />
                <LinePoint map={map} value={-7 / 4} name="−7/4" />
                <LinePoint map={map} value={2 / 3} name="2/3" color={STAGE} />
                <LinePoint map={map} value={1.5} name="3/2" color="var(--success, #267b53)" />
            </svg>
        </div>
    )
}
