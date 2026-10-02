import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { LineInterval, LinePoint, RealAxis } from './realLine'
import { lineMap } from './realLineMap'
import { interval, type Interval } from './reals'

/* ==========================================================================
   Zenbaki errealak · 4. DBH (aplikatuak) — lesson figures in the notebook
   style. Every label goes through <Label> (right to left in Arabic) and
   decimal commas become points in Arabic through `d()`.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'

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

/** A stacked fraction drawn with text, centred on x; y is the bar */
function Frac({ x, y, n, d, size = 20, color = INK }: { x: number; y: number; n: ReactNode; d: ReactNode; size?: number; color?: string }) {
    const half = Math.max(String(n).length, String(d).length) * size * 0.3 + 5
    return (
        <g>
            <text x={x} y={y - 6} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{n}</text>
            <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <text x={x} y={y + size + 2} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{d}</text>
        </g>
    )
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={16} fill={tint} stroke={INK} strokeWidth={1.8} />
            {children}
        </g>
    )
}

/* ---------- 1. Fraction of an amount and comparing ---------- */

export function FractionAmountFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const part = 56
    return (
        <Figure height={270} label={t(say('80ren 2/5 = 32 eta 8/5 eta 3/7 konparatuta', '2/5 de 80 = 32 y la comparación de 8/5 y 3/7', '2/5 من 80 = 32 ومقارنة 8/5 و3/7'))}>
            <Label x={40} y={40} fontSize={17} fontWeight={700} fill={INK}>{t(say('80ren 2/5', '2/5 de 80', '2/5 من 80'))}</Label>
            {[0, 1, 2, 3, 4].map((index) => (
                <g key={index}>
                    <rect x={40 + index * part} y={56} width={part} height={50} fill={index < 2 ? STAGE : CARD} opacity={index < 2 ? 0.85 : 1} stroke={INK} strokeWidth={1.8} />
                    <text x={40 + index * part + part / 2} y={88} textAnchor="middle" fontSize={17} fontWeight={700} fill={index < 2 ? CARD : INK}>16</text>
                </g>
            ))}
            <text x={40} y={140} fontSize={18} fill={INK}>80 : 5 = 16</text>
            <text x={40} y={170} fontSize={18} fontWeight={700} fill={SECOND}>2 · 16 = 32</text>
            <Label x={40} y={204} fontSize={15} fill={MUTED}>{t(say('Zatitu izendatzaileaz, biderkatu zenbakitzaileaz', 'Divide entre el denominador y multiplica por el numerador', 'اقسم على المقام واضرب في البسط'))}</Label>
            <Card x={384} y={30} width={316} height={196} tint={MUSTARD_TINT} />
            <Label x={534} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{t(say('Konparatu: izendatzaile bera', 'Comparar: mismo denominador', 'المقارنة: المقام نفسه'))}</Label>
            <Frac x={420} y={124} n="8" d="5" />
            <text x={448} y={131} fontSize={20} fill={INK}>=</text>
            <Frac x={496} y={124} n="56" d="35" color={SECOND} />
            <Frac x={420} y={186} n="3" d="7" />
            <text x={448} y={193} fontSize={20} fill={INK}>=</text>
            <Frac x={496} y={186} n="15" d="35" color={SECOND} />
            <text x={534} y={80} textAnchor="middle" fontSize={14} fill={MUTED}>m.k.t. (5, 7) = 35</text>
            <text x={620} y={128} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>56 &gt; 15</text>
            <text x={620} y={168} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>↓</text>
            <text x={620} y={200} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>8/5 &gt; 3/7</text>
            <Caption y={252}>{t(say('8/5 > 3/7, 56 > 15 delako', '8/5 > 3/7 porque 56 > 15', '8/5 > 3/7 لأن 56 > 15'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. Operations and their order ---------- */

export function FractionOpsFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const steps = [
        { color: STAGE, text: say('1. Parentesiak', '1. Paréntesis', '1. الأقواس') },
        { color: SECOND, text: say('2. Berreturak', '2. Potencias', '2. القوى') },
        { color: MUSTARD, text: say('3. Biderketak eta zatiketak', '3. Multiplicaciones y divisiones', '3. الضرب والقسمة') },
        { color: GREEN, text: say('4. Batuketak eta kenketak', '4. Sumas y restas', '4. الجمع والطرح') }
    ]
    return (
        <Figure height={250} label={t(say('Eragiketen hierarkia zatikiekin', 'Jerarquía de las operaciones con fracciones', 'أولويات العمليات مع الكسور'))}>
            {steps.map((step, index) => (
                <g key={index}>
                    <rect x={36 + index * 20} y={30 + index * 46} width={270} height={38} rx={10} fill={CARD} stroke={step.color} strokeWidth={2.4} />
                    <Label x={52 + index * 20} y={55 + index * 46} fontSize={16} fontWeight={700} fill={step.color}>{t(step.text)}</Label>
                </g>
            ))}
            <Label x={400} y={46} fontSize={16} fontWeight={700} fill={INK}>{t(say('Adibidea', 'Ejemplo', 'مثال'))}</Label>
            <text x={400} y={86} fontSize={19} fill={INK}>2/7 · (1/4 − 3/5) + 1</text>
            <text x={400} y={124} fontSize={19} fill={STAGE}>= 2/7 · (−7/20) + 1</text>
            <text x={400} y={162} fontSize={19} fill={MUSTARD}>= −1/10 + 1</text>
            <text x={400} y={200} fontSize={21} fontWeight={700} fill={GREEN}>= 9/10</text>
            <Caption y={238}>{t(say('Maila bereko eragiketak: ezkerretik eskuinera', 'Operaciones del mismo nivel: de izquierda a derecha', 'العمليات من المستوى نفسه: من اليسار إلى اليمين'))}</Caption>
        </Figure>
    )
}

/* ---------- 3. Integer exponents ---------- */

export function PowersFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const rows: Array<[string, string]> = [['2³', '8'], ['2²', '4'], ['2¹', '2'], ['2⁰', '1'], ['2⁻¹', '1/2'], ['2⁻²', '1/4'], ['2⁻³', '1/8']]
    return (
        <Figure height={262} label={t(say('Berretzailea bat jaistean, 2z zatitzen da', 'Al bajar el exponente uno, se divide entre 2', 'عند إنقاص الأس واحدًا نقسم على 2'))}>
            {rows.map(([power, value], index) => (
                <g key={power}>
                    <rect x={30 + index * 94} y={40} width={84} height={46} rx={10} fill={index >= 4 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                    <text x={72 + index * 94} y={70} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{power}</text>
                    <rect x={30 + index * 94} y={96} width={84} height={46} rx={10} fill={CARD} stroke={INK} strokeWidth={1.6} />
                    <text x={72 + index * 94} y={126} textAnchor="middle" fontSize={20} fontWeight={700} fill={index >= 4 ? SECOND : INK}>{value}</text>
                    {index < rows.length - 1 && <text x={119 + index * 94} y={166} textAnchor="middle" fontSize={14} fill={MUTED}>: 2</text>}
                </g>
            ))}
            {['a⁰ = 1', 'a⁻ⁿ = 1/aⁿ', '(a/b)⁻ⁿ = (b/a)ⁿ'].map((rule, index) => <text key={rule} x={150 + index * 210} y={208} textAnchor="middle" fontSize={21} fontWeight={700} fill={SECOND}>{rule}</text>)}
            <Caption y={246}>{t(say('Berretzaile negatiboak alderantzizkoa adierazten du', 'El exponente negativo indica el inverso', 'الأس السالب يدل على المقلوب'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. From a fraction to a decimal ---------- */

export function DecimalKindsFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const cards = [
        { tint: STAGE_TINT, title: say('Zehatza', 'Exacto', 'منتهٍ'), n: '9', den: '5', value: '1,8', note: say('izend.: 5 → 2 eta 5 soilik', 'den.: 5 → solo 2 y 5', 'المقام: 5 → 2 و5 فقط') },
        { tint: MUSTARD_TINT, title: say('Periodiko hutsa', 'Periódico puro', 'دوري بحت'), n: '2', den: '3', value: '0,666…', note: say('izend.: 3 → ez 2, ez 5', 'den.: 3 → ni 2 ni 5', 'المقام: 3 → لا 2 ولا 5') },
        { tint: STAGE_TINT, title: say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط'), n: '11', den: '6', value: '1,8333…', note: say('izend.: 6 = 2 · 3 → biak', 'den.: 6 = 2 · 3 → de los dos', 'المقام: 6 = 2 · 3 → كلاهما') }
    ]
    return (
        <Figure height={262} label={t(say('Hamartar zehatza, periodiko hutsa eta periodiko mistoa', 'Decimal exacto, periódico puro y periódico mixto', 'عشري منتهٍ ودوري بحت ودوري مختلط'))}>
            {cards.map((card, index) => (
                <Card key={index} x={24 + index * 232} y={24} width={212} height={196} tint={card.tint}>
                    <Label x={130 + index * 232} y={52} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{t(card.title)}</Label>
                    <Frac x={78 + index * 232} y={100} n={card.n} d={card.den} size={22} />
                    <text x={108 + index * 232} y={108} fontSize={22} fill={INK}>=</text>
                    <text x={176 + index * 232} y={108} textAnchor="middle" fontSize={21} fontWeight={700} fill={SECOND}>{d(card.value)}</text>
                    <Label x={130 + index * 232} y={170} textAnchor="middle" fontSize={14} fill={MUTED}>{t(card.note)}</Label>
                    {index === 2 && <text x={130 + index * 232} y={198} textAnchor="middle" fontSize={14} fill={MUTED}>{d('11 : 6 → 5, 2, 2, 2…')}</text>}
                </Card>
            ))}
            <Caption y={248}>{t(say('Hondar bat errepikatzen denean, zifrak ere errepikatzen dira: periodoa', 'Cuando se repite un resto, se repiten las cifras: el periodo', 'عندما يتكرر باقٍ تتكرر الأرقام: إنه الدور'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. Exact decimal to fraction ---------- */

export function ExactFractionFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const digits = ['0', ',', '2', '4', '5']
    return (
        <Figure height={240} label={t(say('0,245 = 245/1000 = 49/200', '0,245 = 245/1000 = 49/200', '0.245 = 245/1000 = 49/200'))}>
            {digits.map((digit, index) => (
                <g key={index}>
                    {digit !== ',' && <rect x={40 + index * 52} y={40} width={44} height={54} rx={8} fill={index >= 2 ? MUSTARD_TINT : CARD} stroke={INK} strokeWidth={1.6} />}
                    <text x={62 + index * 52} y={76} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>{digit === ',' && language === 'ar' ? '.' : digit}</text>
                </g>
            ))}
            <Label x={170} y={124} textAnchor="middle" fontSize={15} fill={MUTED}>{t(say('3 hamartar → 3 zero', '3 decimales → 3 ceros', '3 منازل عشرية → 3 أصفار'))}</Label>
            <Frac x={380} y={74} n="245" d="1000" size={24} />
            <text x={440} y={82} fontSize={24} fill={INK}>=</text>
            <Frac x={510} y={74} n="49" d="200" size={24} color={SECOND} />
            <text x={380} y={150} textAnchor="middle" fontSize={16} fill={MUTED}>245 : 5 = 49</text>
            <text x={540} y={150} textAnchor="middle" fontSize={16} fill={MUTED}>1000 : 5 = 200</text>
            <Label x={360} y={194} textAnchor="middle" fontSize={17} fill={INK}>{t(say('Zenbakitzailea: koma gabeko zenbakia. Izendatzailea: 1 eta hamartar adina zero', 'Numerador: el número sin coma. Denominador: un 1 y tantos ceros como decimales', 'البسط: العدد دون فاصلة. المقام: 1 وأصفار بعدد المنازل العشرية'))}</Label>
            <Caption y={226}>{t(say('Gero, sinplifikatu', 'Después, simplifica', 'ثم بسّط'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. Periodic decimal to fraction ---------- */

export function PeriodicFractionFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const box = (x: number, text: string, fill: string) => (
        <g key={x}>
            <rect x={x} y={44} width={44} height={54} rx={8} fill={fill} stroke={INK} strokeWidth={1.6} />
            <text x={x + 22} y={80} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>{text}</text>
        </g>
    )
    const comma = language === 'ar' ? '.' : ','
    return (
        <Figure height={286} label={t(say('1,8333… hamartarraren zatiki sortzailea: 11/6', 'Fracción generatriz de 1,8333…: 11/6', 'الكسر المولّد للعدد 1.8333…: 11/6'))}>
            {box(40, '1', CARD)}
            <text x={98} y={84} fontSize={28} fontWeight={700} fill={INK}>{comma}</text>
            {box(112, '8', STAGE_TINT)}
            {box(164, '3', MUSTARD_TINT)}
            <text x={222} y={80} fontSize={22} fill={MUTED}>33…</text>
            <line x1={170} y1={36} x2={202} y2={36} stroke={SECOND} strokeWidth={3} />
            <Label x={134} y={124} textAnchor="middle" fontSize={14} fill={STAGE} fontWeight={700}>{t(say('aurreperiodoa', 'anteperiodo', 'ما قبل الدور'))}</Label>
            <Label x={186} y={146} textAnchor="middle" fontSize={14} fill={SECOND} fontWeight={700}>{t(say('periodoa', 'periodo', 'الدور'))}</Label>
            <Label x={330} y={58} fontSize={16} fill={INK}>{t(say('Zenbakitzailea: zifra guztiak − periodoaren aurrekoak', 'Numerador: todas las cifras − las anteriores al periodo', 'البسط: كل الأرقام − الأرقام قبل الدور'))}</Label>
            <text x={330} y={90} fontSize={20} fontWeight={700} fill={INK}>183 − 18 = 165</text>
            <Label x={330} y={128} fontSize={16} fill={INK}>{t(say('Izendatzailea: 9 bat periodoko zifra bakoitzeko,', 'Denominador: un 9 por cada cifra del periodo,', 'المقام: 9 لكل رقم في الدور،'))}</Label>
            <Label x={330} y={150} fontSize={16} fill={INK}>{t(say('eta 0 bat aurreperiodoko bakoitzeko → 90', 'y un 0 por cada cifra del anteperiodo → 90', 'و0 لكل رقم قبل الدور → 90'))}</Label>
            <Frac x={380} y={204} n="165" d="90" size={24} />
            <text x={430} y={212} fontSize={24} fill={INK}>=</text>
            <Frac x={480} y={204} n="11" d="6" size={24} color={SECOND} />
            <text x={150} y={212} textAnchor="middle" fontSize={17} fill={MUTED}>{language === 'ar' ? '0.666… = 6/9 = 2/3' : '0,666… = 6/9 = 2/3'}</text>
            <Caption y={272}>{t(say('Egiaztatu: 11 : 6 = 1,8333…', 'Comprueba: 11 : 6 = 1,8333…', 'تحقق: 11 : 6 = 1.8333…'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. Irrational numbers ---------- */

export function IrrationalFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={290} label={t(say('√2 karratu baten diagonala da eta π zirkunferentziaren eta diametroaren zatidura', '√2 es la diagonal de un cuadrado y π el cociente entre circunferencia y diámetro', '√2 قطر مربع وπ نسبة المحيط إلى القطر'))}>
            <rect x={60} y={50} width={130} height={130} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <line x1={60} y1={180} x2={190} y2={50} stroke={SECOND} strokeWidth={3.6} />
            <text x={125} y={202} textAnchor="middle" fontSize={17} fill={INK}>1</text>
            <text x={44} y={120} textAnchor="middle" fontSize={17} fill={INK}>1</text>
            <text x={140} y={108} fontSize={22} fontWeight={700} fill={SECOND}>√2</text>
            <text x={125} y={236} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{d('√2 = 1,41421356…')}</text>
            <circle cx={420} cy={115} r={66} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <line x1={354} y1={115} x2={486} y2={115} stroke={SECOND} strokeWidth={3} />
            <Label x={420} y={106} textAnchor="middle" fontSize={15} fill={INK}>{t(say('diametroa 1', 'diámetro 1', 'القطر 1'))}</Label>
            <text x={420} y={236} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{d('π = 3,14159265…')}</text>
            <Label x={530} y={70} fontSize={16} fontWeight={700} fill={SECOND}>{t(say('Hamartar infinituak,', 'Decimales infinitos', 'منازل عشرية لا نهائية'))}</Label>
            <Label x={530} y={94} fontSize={16} fontWeight={700} fill={SECOND}>{t(say('periodorik gabe', 'y sin periodo', 'ومن دون دور'))}</Label>
            <Label x={530} y={136} fontSize={15} fill={INK}>{t(say('Ezin dira zatiki gisa', 'No se pueden escribir', 'لا يمكن كتابتها'))}</Label>
            <Label x={530} y={158} fontSize={15} fill={INK}>{t(say('idatzi', 'como fracción', 'على صورة كسر'))}</Label>
            <text x={530} y={196} fontSize={15} fill={MUTED}>√3, √5, √7…</text>
            <Caption y={278}>{t(say('Karratu perfektua ez den zenbaki baten erro karratua irrazionala da', 'La raíz cuadrada de un número que no es cuadrado perfecto es irracional', 'الجذر التربيعي لعدد ليس مربعًا كاملًا عدد غير نسبي'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. Number sets ---------- */

export function NumberSetsFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={300} label={t(say('N, Z eta Q multzoak R-ren barruan, irrazionalekin', 'N, Z y Q dentro de R, con los irracionales', 'N وZ وQ داخل R مع الأعداد غير النسبية'))}>
            <rect x={20} y={20} width={680} height={244} rx={22} fill={CARD} stroke={INK} strokeWidth={2.4} />
            <text x={40} y={50} fontSize={20} fontWeight={700} fill={INK}>ℝ</text>
            <rect x={44} y={62} width={420} height={188} rx={18} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <text x={60} y={88} fontSize={19} fontWeight={700} fill={STAGE}>ℚ</text>
            <rect x={66} y={100} width={250} height={136} rx={16} fill={MUSTARD_TINT} stroke={MUSTARD} strokeWidth={2} />
            <text x={82} y={124} fontSize={19} fontWeight={700} fill={INK}>ℤ</text>
            <rect x={88} y={136} width={120} height={86} rx={14} fill={CARD} stroke={GREEN} strokeWidth={2} />
            <text x={104} y={160} fontSize={19} fontWeight={700} fill={GREEN}>ℕ</text>
            <text x={148} y={198} textAnchor="middle" fontSize={17} fill={INK}>0, 5, 152</text>
            <text x={262} y={170} textAnchor="middle" fontSize={17} fill={INK}>−4</text>
            <text x={262} y={200} textAnchor="middle" fontSize={17} fill={INK}>−104</text>
            <text x={390} y={140} textAnchor="middle" fontSize={17} fill={INK}>13/6</text>
            <text x={390} y={170} textAnchor="middle" fontSize={17} fill={INK}>{d('3,5')}</text>
            <text x={390} y={200} textAnchor="middle" fontSize={17} fill={INK}>{d('2,777…')}</text>
            <rect x={488} y={62} width={192} height={188} rx={18} fill={'var(--coral-tint, #f8ddd5)'} stroke={SECOND} strokeWidth={2} />
            <Label x={584} y={90} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{t(say('Irrazionalak', 'Irracionales', 'غير النسبية'))}</Label>
            <text x={584} y={136} textAnchor="middle" fontSize={18} fill={INK}>√5, π</text>
            <text x={584} y={170} textAnchor="middle" fontSize={18} fill={INK}>1 + √3</text>
            <text x={584} y={204} textAnchor="middle" fontSize={18} fill={INK}>{d('2,1010010001…')}</text>
            <Caption y={290}>{t(say('N ⊂ Z ⊂ Q ⊂ R · arrazionalak eta irrazionalak batera: errealak', 'N ⊂ Z ⊂ Q ⊂ R · racionales e irracionales juntos: los reales', 'N ⊂ Z ⊂ Q ⊂ R · النسبية وغير النسبية معًا: الحقيقية'))}</Caption>
        </Figure>
    )
}

/* ---------- 9. Placing numbers on the real line ---------- */

export function RealLineFigure({ language }: { language: UnitLanguage }) {
    const { t, arabic } = useText(language)
    const map = lineMap(-1, 3, 80, 640, 262)
    const unit = map.x(1) - map.x(0)
    const radius = Math.SQRT2 * unit
    const top = map.y - unit
    return (
        <Figure height={340} label={t(say('√2 zuzen errealean, Pitagorasen teoremarekin', '√2 en la recta real, con el teorema de Pitágoras', '√2 على المستقيم الحقيقي بنظرية فيثاغورس'))}>
            <RealAxis map={map} arabic={arabic} minor={2} />
            <rect x={map.x(0)} y={top} width={unit} height={unit} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <line x1={map.x(0)} y1={map.y} x2={map.x(1)} y2={top} stroke={SECOND} strokeWidth={3.2} />
            <path d={`M${map.x(1)} ${top} A${radius} ${radius} 0 0 1 ${map.x(0) + radius} ${map.y}`} fill="none" stroke={SECOND} strokeWidth={2.2} strokeDasharray="6 5" />
            <text x={map.x(0.32)} y={top + unit * 0.44} fontSize={18} fontWeight={700} fill={SECOND}>√2</text>
            <LinePoint map={map} value={Math.SQRT2} name="√2" above={false} />
            <LinePoint map={map} value={8 / 3} name="8/3" color={STAGE} />
            <Label x={40} y={34} fontSize={15} fill={INK}>{t(say('1 aldeko karratuaren diagonala: √(1² + 1²) = √2', 'Diagonal del cuadrado de lado 1: √(1² + 1²) = √2', 'قطر المربع ذي الضلع 1: √(1² + 1²) = √2'))}</Label>
            <Label x={40} y={58} fontSize={15} fill={INK}>{t(say('Konpasarekin, eraman zuzenera', 'Con el compás, llévala a la recta', 'بالفرجار انقله إلى المستقيم'))}</Label>
            <Label x={40} y={86} fontSize={15} fill={STAGE}>{t(say('8/3 = 2 + 2/3: zatitu [2, 3] hiru zatitan', '8/3 = 2 + 2/3: divide [2, 3] en tres partes', '8/3 = 2 + 2/3: قسّم [2، 3] إلى ثلاثة أجزاء'))}</Label>
            <Caption y={332}>{t(say('Zenbaki erreal bakoitzak puntu bat du zuzenean, eta puntu bakoitzak zenbaki bat', 'Cada número real es un punto de la recta y cada punto, un número real', 'كل عدد حقيقي نقطة على المستقيم وكل نقطة عدد حقيقي'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. Intervals and half-lines ---------- */

export function IntervalsFigure({ language }: { language: UnitLanguage }) {
    const { t, arabic } = useText(language)
    const rows: Array<{ value: Interval; notation: string; inequality: string; name: LocalizedText }> = [
        { value: interval(-2, 4, true, true), notation: '[−2, 4]', inequality: '−2 ≤ x ≤ 4', name: say('itxia', 'cerrado', 'مغلقة') },
        { value: interval(-2, 4, false, false), notation: '(−2, 4)', inequality: '−2 < x < 4', name: say('irekia', 'abierto', 'مفتوحة') },
        { value: interval(-2, 4, true, false), notation: '[−2, 4)', inequality: '−2 ≤ x < 4', name: say('erdi-irekia', 'semiabierto', 'نصف مفتوحة') },
        { value: interval(1, null, false, false), notation: '(1, +∞)', inequality: 'x > 1', name: say('zuzenerdia', 'semirrecta', 'نصف مستقيم') }
    ]
    return (
        <Figure height={318} label={t(say('Tarte itxia, irekia, erdi-irekia eta zuzenerdia', 'Intervalo cerrado, abierto, semiabierto y semirrecta', 'فترة مغلقة ومفتوحة ونصف مفتوحة ونصف مستقيم'))}>
            {rows.map((row, index) => {
                const map = lineMap(-4, 6, 50, 390, 46 + index * 64)
                return (
                    <g key={index}>
                        <RealAxis map={map} step={2} labels={index === rows.length - 1} arabic={arabic} fontSize={13} />
                        <LineInterval map={map} value={row.value} />
                        <text x={440} y={map.y + 6} fontSize={20} fontWeight={700} fill={STAGE}>{row.notation}</text>
                        <text x={540} y={map.y + 6} fontSize={17} fill={INK}>{row.inequality}</text>
                        <Label x={440} y={map.y + 26} fontSize={13} fill={MUTED}>{t(row.name)}</Label>
                    </g>
                )
            })}
            <Caption y={308}>{t(say('[ ] eta ● : muturra barne · ( ) eta ○ : muturra kanpo · ∞ beti parentesiarekin', '[ ] y ● : extremo incluido · ( ) y ○ : extremo excluido · ∞ siempre con paréntesis', '[ ] و● : الطرف داخل · ( ) و○ : الطرف خارج · ∞ دائمًا بقوس'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. Truncating and rounding ---------- */

export function RoundingFigure({ language }: { language: UnitLanguage }) {
    const { t, d, arabic } = useText(language)
    const map = lineMap(82.74, 82.75, 90, 630, 130)
    return (
        <Figure height={270} label={t(say('82,745 trunkatuta 82,74 da eta biribilduta 82,75', '82,745 truncado es 82,74 y redondeado 82,75', '82.745 مبتورًا 82.74 ومقرّبًا 82.75'))}>
            <RealAxis map={map} step={0.001} labelEvery={5} arabic={arabic} fontSize={14} />
            <LinePoint map={map} value={82.745} name={d('82,745')} />
            <path d={`M${map.x(82.745) - 8} ${map.y - 40} Q${map.x(82.742)} ${map.y - 70} ${map.x(82.74) + 4} ${map.y - 14}`} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="5 4" />
            <path d={`M${map.x(82.745) + 8} ${map.y - 40} Q${map.x(82.748)} ${map.y - 70} ${map.x(82.75) - 4} ${map.y - 14}`} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <Label x={map.x(82.741)} y={map.y - 70} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{t(say('trunkatu: moztu', 'truncar: cortar', 'البتر: القطع'))}</Label>
            <Label x={map.x(82.749)} y={map.y - 70} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{t(say('biribildu: hurbilena', 'redondear: el más cercano', 'التقريب: الأقرب'))}</Label>
            <Card x={60} y={180} width={600} height={56} tint={MUSTARD_TINT}>
                <Label x={80} y={214} fontSize={16} fill={INK}>{t(say('Ehunenetara: kendu den lehen zifra 5 edo handiagoa bada, gehitu 1 → 82,75', 'A las centésimas: si la primera cifra suprimida es 5 o mayor, se suma 1 → 82,75', 'إلى الأجزاء من مئة: إذا كان أول رقم محذوف 5 أو أكثر نضيف 1 → 82.75'))}</Label>
            </Card>
            <Caption y={258}>{d(t(say('1,234 → 1,23 biak · 9,007 → 9,00 eta 9,01', '1,234 → 1,23 en los dos · 9,007 → 9,00 y 9,01', '1.234 → 1.23 في الحالتين · 9.007 → 9.00 و9.01')))}</Caption>
        </Figure>
    )
}

/* ---------- 12. Absolute and relative error ---------- */

export function ErrorsFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={262} label={t(say('Errore absolutua 0,005 eta erlatiboa 0,04', 'Error absoluto 0,005 y relativo 0,04', 'الخطأ المطلق 0.005 والنسبي 0.04'))}>
            <Label x={40} y={44} fontSize={16} fill={INK}>{t(say('1 m hari 8 zatitan: zati bakoitza 0,125 m da; 0,12 m hartu dugu', 'Un cable de 1 m en 8 trozos: cada uno mide 0,125 m; tomamos 0,12 m', 'سلك طوله 1 م إلى 8 قطع: كل قطعة 0.125 م؛ أخذنا 0.12 م'))}</Label>
            <Card x={40} y={66} width={300} height={130} tint={STAGE_TINT}>
                <Label x={60} y={96} fontSize={17} fontWeight={700} fill={STAGE}>{t(say('Errore absolutua', 'Error absoluto', 'الخطأ المطلق'))}</Label>
                <text x={60} y={130} fontSize={19} fill={INK}>{d('Eₐ = |0,125 − 0,12|')}</text>
                <text x={60} y={168} fontSize={22} fontWeight={700} fill={SECOND}>{d('= 0,005 m')}</text>
            </Card>
            <Card x={380} y={66} width={300} height={130} tint={MUSTARD_TINT}>
                <Label x={400} y={96} fontSize={17} fontWeight={700} fill={INK}>{t(say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي'))}</Label>
                <text x={400} y={130} fontSize={19} fill={INK}>{d('Eᵣ = 0,005 : 0,125')}</text>
                <text x={400} y={168} fontSize={22} fontWeight={700} fill={SECOND}>{d('= 0,04 → 4 %')}</text>
            </Card>
            <Label x={40} y={226} fontSize={15} fill={INK}>{t(say('Absolutua: zenbat huts egin dugun, unitatetan.', 'Absoluto: cuánto nos hemos equivocado, en unidades.', 'المطلق: مقدار الخطأ بالوحدات.'))}</Label>
            <Label x={40} y={250} fontSize={15} fill={INK}>{t(say('Erlatiboa: hutsegitea balio errealarekin konparatuta; zenbat eta txikiagoa, orduan eta hobea.', 'Relativo: el error comparado con el valor real; cuanto menor, mejor.', 'النسبي: الخطأ مقارنةً بالقيمة الحقيقية؛ كلما صغر كان أفضل.'))}</Label>
        </Figure>
    )
}

/* ---------- 13. Scientific notation ---------- */

export function ScientificFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const hops = (x: number, y: number, count: number, step: number, color: string) => Array.from({ length: count }, (_, index) => (
        <path key={index} d={`M${x + index * step} ${y} q${step / 2} -18 ${step} 0`} fill="none" stroke={color} strokeWidth={2} />
    ))
    return (
        <Figure height={290} label={t(say('83 400 000 = 8,34 · 10⁷ eta 0,00052 = 5,2 · 10⁻⁴', '83 400 000 = 8,34 · 10⁷ y 0,00052 = 5,2 · 10⁻⁴', '83 400 000 = 8.34 · 10⁷ و0.00052 = 5.2 · 10⁻⁴'))}>
            <Label x={40} y={40} fontSize={16} fontWeight={700} fill={INK}>{t(say('Zenbaki handiak: koma ezkerrera, berretzaile positiboa', 'Números grandes: la coma a la izquierda, exponente positivo', 'الأعداد الكبيرة: الفاصلة إلى اليسار والأس موجب'))}</Label>
            <text x={60} y={96} fontSize={28} fontWeight={700} letterSpacing={4} fill={INK}>83400000</text>
            {hops(87, 66, 7, 19.4, STAGE)}
            <text x={340} y={96} fontSize={26} fontWeight={700} fill={STAGE}>{d('= 8,34 · 10⁷')}</text>
            <Label x={560} y={92} fontSize={15} fill={MUTED}>{t(say('7 jauzi', '7 saltos', '7 قفزات'))}</Label>
            <Label x={40} y={150} fontSize={16} fontWeight={700} fill={INK}>{t(say('Zenbaki txikiak: koma eskuinera, berretzaile negatiboa', 'Números pequeños: la coma a la derecha, exponente negativo', 'الأعداد الصغيرة: الفاصلة إلى اليمين والأس سالب'))}</Label>
            <text x={60} y={206} fontSize={28} fontWeight={700} letterSpacing={4} fill={INK}>{d('0,00052')}</text>
            {hops(92, 176, 4, 21, SECOND)}
            <text x={340} y={206} fontSize={26} fontWeight={700} fill={SECOND}>{d('= 5,2 · 10⁻⁴')}</text>
            <Label x={560} y={202} fontSize={15} fill={MUTED}>{t(say('4 jauzi', '4 saltos', '4 قفزات'))}</Label>
            <Caption y={272}>{t(say('a · 10ⁿ, 1 ≤ a < 10 izanik: komaren aurretik zifra bakarra, ez zero', 'a · 10ⁿ con 1 ≤ a < 10: una sola cifra, distinta de cero, delante de la coma', 'a · 10ⁿ حيث 1 ≤ a < 10: رقم واحد غير الصفر قبل الفاصلة'))}</Caption>
        </Figure>
    )
}

/* ---------- 14. Operating in scientific notation ---------- */

export function ScientificOpsFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={270} label={t(say('Biderketa idazkera zientifikoan', 'Multiplicación en notación científica', 'الضرب بالترميز العلمي'))}>
            <text x={360} y={50} textAnchor="middle" fontSize={23} fontWeight={700} fill={INK}>{d('(4 · 10⁻⁷) · (6,3 · 10¹²)')}</text>
            <Card x={60} y={74} width={280} height={88} tint={STAGE_TINT}>
                <Label x={200} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Zenbakiak biderkatu', 'Multiplica los números', 'اضرب الأعداد'))}</Label>
                <text x={200} y={140} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{d('4 · 6,3 = 25,2')}</text>
            </Card>
            <Card x={380} y={74} width={280} height={88} tint={MUSTARD_TINT}>
                <Label x={520} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{t(say('Berretzaileak batu', 'Suma los exponentes', 'اجمع الأسس'))}</Label>
                <text x={520} y={140} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>10⁻⁷⁺¹² = 10⁵</text>
            </Card>
            <text x={360} y={200} textAnchor="middle" fontSize={22} fill={INK}>{d('25,2 · 10⁵ = 2,52 · 10¹ · 10⁵ = ')}<tspan fontWeight={700} fill={SECOND}>{d('2,52 · 10⁶')}</tspan></text>
            <Caption y={246}>{t(say('Zatitzean: zenbakiak zatitu eta berretzaileak kendu. Azkenean, egokitu a: 1 ≤ a < 10', 'Al dividir: divide los números y resta los exponentes. Al final, ajusta a: 1 ≤ a < 10', 'عند القسمة: اقسم الأعداد واطرح الأسس. وفي النهاية اضبط a: 1 ≤ a < 10'))}</Caption>
        </Figure>
    )
}

/* ---------- 15. Roots and fractional exponents ---------- */

export function RootsFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const sup = (text: string) => <tspan dy={-12} fontSize={15}>{text}</tspan>
    const down = <tspan dy={12} fontSize={1}> </tspan>
    return (
        <Figure height={272} label={t(say('Erroa eta berretzaile zatikia: ∛8 = 2 eta 8 ber 2/3 = 4', 'Raíz y exponente fraccionario: ∛8 = 2 y 8 elevado a 2/3 = 4', 'الجذر والأس الكسري: ∛8 = 2 و8 أس 2/3 = 4'))}>
            <path d="M58 104 L72 96 L94 136 L118 52 L236 52" fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <text x={66} y={84} textAnchor="middle" fontSize={24} fontWeight={700} fill={SECOND}>n</text>
            <text x={176} y={112} textAnchor="middle" fontSize={40} fontWeight={700} fill={STAGE}>a</text>
            <Label x={66} y={40} textAnchor="middle" fontSize={14} fill={SECOND} fontWeight={700}>{t(say('indizea', 'índice', 'الدليل'))}</Label>
            <Label x={176} y={160} textAnchor="middle" fontSize={14} fill={STAGE} fontWeight={700}>{t(say('errokizuna', 'radicando', 'ما تحت الجذر'))}</Label>
            <text x={250} y={110} fontSize={30} fill={INK}>= a{sup('1/n')}</text>
            <Label x={410} y={56} fontSize={17} fill={INK}>{t(say('∛8 = 2, 2³ = 8 delako', '∛8 = 2 porque 2³ = 8', '∛8 = 2 لأن 2³ = 8'))}</Label>
            <text x={410} y={92} fontSize={19} fill={INK}>⁴√81 = 3</text>
            <text x={560} y={92} fontSize={19} fill={INK}>⁵√−32 = −2</text>
            <text x={410} y={132} fontSize={19} fill={INK}>8{sup('2/3')}{down} = (∛8)² = 2² = 4</text>
            <Label x={410} y={170} fontSize={15} fill={MUTED}>{t(say('Indize bikoitia: errokizun negatiboak', 'Índice par: un radicando negativo', 'الدليل الزوجي: لا جذر حقيقي'))}</Label>
            <Label x={410} y={192} fontSize={15} fill={MUTED}>{t(say('ez du erro errealik (√−4 ∉ ℝ)', 'no tiene raíz real (√−4 ∉ ℝ)', 'للعدد السالب (√−4 ∉ ℝ)'))}</Label>
            <text x={360} y={248} textAnchor="middle" fontSize={17} fill={MUTED}>a{sup('m/n')}{down} = ⁿ√aᵐ</text>
        </Figure>
    )
}

/* ---------- 16. Simplifying and taking factors out ---------- */

export function SimplifyFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const factors = [['2', '2'], ['2'], ['3', '3']]
    return (
        <Figure height={270} label={t(say('√72 = √(2² · 3² · 2) = 6√2', '√72 = √(2² · 3² · 2) = 6√2', '√72 = √(2² · 3² · 2) = 6√2'))}>
            <text x={60} y={60} fontSize={24} fontWeight={700} fill={INK}>√72 = √(2 · 2 · 2 · 3 · 3)</text>
            {factors.map((group, index) => (
                <g key={index}>
                    <rect x={60 + index * 120} y={92} width={group.length * 40 + 16} height={52} rx={12} fill={group.length === 2 ? MUSTARD_TINT : CARD} stroke={group.length === 2 ? MUSTARD : INK} strokeWidth={2} />
                    <text x={68 + index * 120 + (group.length * 40) / 2} y={126} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{group.join(' · ')}</text>
                    <text x={68 + index * 120 + (group.length * 40) / 2} y={176} textAnchor="middle" fontSize={20} fontWeight={700} fill={group.length === 2 ? SECOND : STAGE}>{group.length === 2 ? `→ ${group[0]}` : '→ √2'}</text>
                </g>
            ))}
            <Label x={430} y={110} fontSize={16} fill={INK}>{t(say('Bikote bakoitza (a²) errotik ', 'Cada pareja (a²) sale de la raíz', 'كل زوج (a²) يخرج من الجذر'))}</Label>
            <Label x={430} y={134} fontSize={16} fill={INK}>{t(say('ateratzen da a gisa', 'como a', 'على صورة a'))}</Label>
            <text x={430} y={186} fontSize={26} fontWeight={700} fill={SECOND}>√72 = 2 · 3 · √2 = 6√2</text>
            <Caption y={250}>{t(say('Erradikal baliokideak: ⁶√8 = ⁶√2³ = √2 (indizea eta berretzailea zenbaki berberaz zatitu)', 'Radicales equivalentes: ⁶√8 = ⁶√2³ = √2 (divide índice y exponente por el mismo número)', 'جذور متكافئة: ⁶√8 = ⁶√2³ = √2 (اقسم الدليل والأس على العدد نفسه)'))}</Caption>
        </Figure>
    )
}

/* ---------- 17. Operating with radicals ---------- */

export function RadicalOpsFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    return (
        <Figure height={280} label={t(say('Erradikal antzekoak batu eta izendatzailea arrazionalizatu', 'Sumar radicales semejantes y racionalizar el denominador', 'جمع الجذور المتشابهة وإنطاق المقام'))}>
            <Card x={30} y={24} width={320} height={210} tint={STAGE_TINT}>
                <Label x={50} y={52} fontSize={16} fontWeight={700} fill={STAGE}>{t(say('Batu: erradikal antzekoak', 'Sumar: radicales semejantes', 'الجمع: جذور متشابهة'))}</Label>
                <text x={50} y={92} fontSize={19} fill={INK}>√18 + √50 − 2√8</text>
                <text x={50} y={130} fontSize={19} fill={INK}>= 3√2 + 5√2 − 4√2</text>
                <text x={50} y={170} fontSize={22} fontWeight={700} fill={SECOND}>= (3 + 5 − 4)√2 = 4√2</text>
                <Label x={50} y={212} fontSize={14} fill={MUTED}>{t(say('√2 + √3 ezin da batu: ez dira antzekoak', '√2 + √3 no se puede sumar: no son semejantes', 'لا يمكن جمع √2 + √3: ليسا متشابهين'))}</Label>
            </Card>
            <Card x={370} y={24} width={320} height={210} tint={MUSTARD_TINT}>
                <Label x={390} y={52} fontSize={16} fontWeight={700} fill={INK}>{t(say('Biderkatu: indize bera', 'Multiplicar: mismo índice', 'الضرب: الدليل نفسه'))}</Label>
                <text x={390} y={88} fontSize={19} fill={INK}>√2 · √18 = √36 = 6</text>
                <Label x={390} y={128} fontSize={16} fontWeight={700} fill={INK}>{t(say('Arrazionalizatu', 'Racionalizar', 'إنطاق المقام'))}</Label>
                <text x={390} y={170} fontSize={21} fill={INK}>2/√3 = 2√3/(√3 · √3)</text>
                <text x={390} y={206} fontSize={22} fontWeight={700} fill={SECOND}>= 2√3 / 3</text>
            </Card>
            <Caption y={262}>{t(say('Antzekoak: indize eta errokizun berdinak. Arrazionalizatu: biderkatu goian eta behean √b-z', 'Semejantes: igual índice y radicando. Racionalizar: multiplica arriba y abajo por √b', 'المتشابهة: الدليل وما تحت الجذر نفسهما. الإنطاق: اضرب البسط والمقام في √b'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function RealsHeroArt() {
    const map = lineMap(-1, 3.5, 70, 350, 190)
    return (
        <div className="reals-v2-hero-art" aria-hidden="true">
            <svg viewBox="0 0 420 270" role="presentation" direction="ltr">
                <rect x="16" y="18" width="388" height="228" rx="26" fill="var(--card, #fffcf6)" stroke="var(--ink, #1d2733)" strokeWidth="2.4" />
                <RealAxis map={map} labels={false} minor={2} />
                <rect x={map.x(0)} y={map.y - 70} width={70} height={70} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink, #1d2733)" strokeWidth="2" />
                <line x1={map.x(0)} y1={map.y} x2={map.x(1)} y2={map.y - 70} stroke="var(--coral, #c4432a)" strokeWidth="4" />
                <path d={`M${map.x(1)} ${map.y - 70} A99 99 0 0 1 ${map.x(0) + 99} ${map.y}`} fill="none" stroke="var(--coral, #c4432a)" strokeWidth="3" strokeDasharray="6 5" />
                <circle cx={map.x(0) + 99} cy={map.y} r="8" fill="var(--coral, #c4432a)" stroke="var(--card, #fffcf6)" strokeWidth="3" />
                <circle cx={map.x(Math.PI)} cy={map.y} r="8" fill="var(--mustard, #e0a100)" stroke="var(--card, #fffcf6)" strokeWidth="3" />
                <text x={map.x(0) + 99} y={map.y + 34} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--coral, #c4432a)">√2</text>
                <text x={map.x(Math.PI)} y={map.y + 34} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink, #1d2733)">π</text>
                <text x="282" y="84" textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--ink, #1d2733)" fontFamily="system-ui, sans-serif">ℚ ∪ 𝕀 = ℝ</text>
            </svg>
        </div>
    )
}
