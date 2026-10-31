import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Funtzioak · 3. DBH — diagnostic, guided practice, exercise bank and
   challenges, after Santillana 3.º ESO units 11–12 and Anaya 3.º ESO units
   8–9 (the books fix the scope and the order; every number here is
   original). Every closed answer has an entry in `functions3Checks`: the
   function it comes from and its data. The worked explanation is written
   from that same entry, so the tests can work every answer out again,
   check every step and check that the data are in the question.
   ========================================================================== */

const n = (value: number): FractionValue => fraction(Math.round(value * 10000), 10000)

export type FunctionCheckKind =
    | 'linear' | 'quadratic' | 'root' | 'range-max' | 'range-min' | 'rate' | 'difference'
    | 'max-of' | 'min-of' | 'vertex-x' | 'vertex-y' | 'slope' | 'ratio' | 'prop-value'
    | 'n-from' | 'line-n' | 'cross-x' | 'cross-y' | 'units-for' | 'root-big' | 'root-small' | 'roots-count'

export interface FunctionCheck {
    kind: FunctionCheckKind
    args: number[]
}

const lineAt = (m: number, b: number, x: number) => m * x + b
const parabolaAt = (a: number, b: number, c: number, x: number) => a * x * x + b * x + c
const roots = (a: number, b: number, c: number) => {
    const delta = b * b - 4 * a * c
    if (delta < 0) return []
    if (delta === 0) return [-b / (2 * a)]
    return [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)].sort((p, q) => p - q)
}

/** The function behind every kind of check */
export function functionAnswer({ kind, args }: FunctionCheck): number {
    const [a, b, c, d] = args
    switch (kind) {
        case 'linear': return lineAt(a, b, c)
        case 'quadratic': return parabolaAt(a, b, c, d)
        case 'root': return -b / a
        case 'range-max': return Math.max(lineAt(a, b, c), lineAt(a, b, d))
        case 'range-min': return Math.min(lineAt(a, b, c), lineAt(a, b, d))
        case 'rate': return a / b
        case 'difference': return b - a
        case 'max-of': return Math.max(...args)
        case 'min-of': return Math.min(...args)
        case 'vertex-x': return -b / (2 * a)
        case 'vertex-y': return parabolaAt(a, b, c, -b / (2 * a))
        case 'slope': return (d - b) / (c - a)
        case 'ratio': return b / a
        case 'prop-value': return (b / a) * c
        case 'n-from': return c - a * b
        case 'line-n': return b - ((d - b) / (c - a)) * a
        case 'cross-x': return (d - b) / (a - c)
        case 'cross-y': return lineAt(a, b, (d - b) / (a - c))
        case 'units-for': return (c - b) / a
        case 'root-big': return roots(a, b, c).at(-1)!
        case 'root-small': return roots(a, b, c)[0]
        case 'roots-count': return roots(a, b, c).length
    }
}

/* ---------- How numbers and expressions are written ---------- */

/** A number in LaTeX: decimal comma */
const num = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
/** A number in brackets when it is negative, ready to substitute */
const par = (value: number) => (value < 0 ? `(${num(value)})` : num(value))
/** A number in running text, Basque and Spanish */
const word = (value: number) => String(value).replace('.', ',')
const coef = (value: number, letter: string) => (value === 1 ? letter : value === -1 ? `-${letter}` : `${num(value)}${letter}`)
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${num(value)}` : num(value))
const signedTerm = (value: number, letter: string) => (value === 0 ? '' : value > 0 ? `+${coef(value, letter)}` : coef(value, letter))
/** y = mx + n written out */
export const lin = (m: number, b: number) => (m === 0 ? num(b) : `${coef(m, 'x')}${signed(b)}`)
/** y = ax² + bx + c written out */
export const quad = (a: number, b: number, c: number) => `${coef(a, 'x^{2}')}${signedTerm(b, 'x')}${signed(c)}`

const product = (m: number, x: number) => `${num(m)}\\cdot ${par(x)}`
const lineWork = (m: number, b: number, x: number) => `${product(m, x)}${signed(b)}=${num(lineAt(m, b, x))}`
const parabolaWork = (a: number, b: number, c: number, x: number) =>
    `${num(a)}\\cdot ${par(x)}^{2}${b === 0 ? '' : `${b > 0 ? '+' : ''}${product(b, x)}`}${signed(c)}=${num(parabolaAt(a, b, c, x))}`
const slopeWork = (x1: number, y1: number, x2: number, y2: number) => `m=\\frac{${num(y2)}-${par(y1)}}{${num(x2)}-${par(x1)}}=\\frac{${num(y2 - y1)}}{${num(x2 - x1)}}=${num((y2 - y1) / (x2 - x1))}`
const rootsWork = (a: number, b: number, c: number) => {
    const delta = b * b - 4 * a * c
    const found = roots(a, b, c)
    return `x=\\frac{${num(-b)}\\pm\\sqrt{${num(delta)}}}{${num(2 * a)}}\\ \\to\\ x=${found.map(num).join(',\\ x=')}`
}

/** The worked explanation of every kind of check, in LaTeX, one step per line so that it fits a phone */
export function functionWork(check: FunctionCheck): string {
    const steps = workLine(check).split(/\\quad\\to\\ |\\ \\to\\ |\\quad /)
    return steps.length === 1 ? steps[0] : `\\begin{gathered}${steps.join('\\\\ ')}\\end{gathered}`
}

function workLine({ kind, args }: FunctionCheck): string {
    const [a, b, c, d] = args
    switch (kind) {
        case 'linear': return lineWork(a, b, c)
        case 'quadratic': return parabolaWork(a, b, c, d)
        case 'root': return `${lin(a, b)}=0\\ \\to\\ x=\\frac{${num(-b)}}{${num(a)}}=${num(-b / a)}`
        case 'range-max':
        case 'range-min': return `f(${num(c)})=${lineWork(a, b, c)}\\quad f(${num(d)})=${lineWork(a, b, d)}\\quad\\to\\ ${num(functionAnswer({ kind, args }))}`
        case 'rate': return `\\frac{${num(a)}}{${num(b)}}=${num(a / b)}`
        case 'difference': return `${num(b)}-${par(a)}=${num(b - a)}`
        case 'max-of':
        case 'min-of': return `y=${num(functionAnswer({ kind, args }))}`
        case 'vertex-x': return `x_{v}=\\frac{${num(-b)}}{${num(2 * a)}}=${num(-b / (2 * a))}`
        case 'vertex-y': return `x_{v}=\\frac{${num(-b)}}{${num(2 * a)}}=${num(-b / (2 * a))}\\ \\to\\ ${parabolaWork(a, b, c, -b / (2 * a))}`
        case 'slope': return slopeWork(a, b, c, d)
        case 'ratio': return `m=\\frac{${num(b)}}{${num(a)}}=${num(b / a)}`
        case 'prop-value': return `m=\\frac{${num(b)}}{${num(a)}}=${num(b / a)}\\ \\to\\ ${product(b / a, c)}=${num((b / a) * c)}`
        case 'n-from': return `${num(c)}=${product(a, b)}+n\\ \\to\\ n=${num(c)}-${par(a * b)}=${num(c - a * b)}`
        case 'line-n': {
            const m = (d - b) / (c - a)
            return `${slopeWork(a, b, c, d)}\\ \\to\\ n=${num(b)}-${par(m * a)}=${num(b - m * a)}`
        }
        case 'cross-x': return `${lin(a, b)}=${lin(c, d)}\\ \\to\\ x=\\frac{${num(d - b)}}{${num(a - c)}}=${num((d - b) / (a - c))}`
        case 'cross-y': {
            const x = (d - b) / (a - c)
            return `x=\\frac{${num(d - b)}}{${num(a - c)}}=${num(x)}\\ \\to\\ y=${lineWork(a, b, x)}`
        }
        case 'units-for': return `\\frac{${num(c)}-${par(b)}}{${num(a)}}=${num((c - b) / a)}`
        case 'root-big':
        case 'root-small': return rootsWork(a, b, c)
        case 'roots-count': {
            const delta = b * b - 4 * a * c
            return `\\Delta=${par(b)}^{2}-4\\cdot ${par(a)}\\cdot ${par(c)}=${num(delta)}\\ \\to\\ ${roots(a, b, c).length}`
        }
    }
}

const check = (kind: FunctionCheckKind, ...args: number[]): FunctionCheck => ({ kind, args })

/* ---------- The questions, one builder per kind ---------- */

const valueAsk = (m: number, b: number, x: number) => say(`$f(x)=${lin(m, b)}$. Zenbat da $f(${num(x)})$?`, `$f(x)=${lin(m, b)}$. ¿Cuánto vale $f(${num(x)})$?`, `$f(x)=${lin(m, b)}$. كم يساوي $f(${num(x)})$؟`, `$f(x)=${lin(m, b)}$. What is $f(${num(x)})$?`)
const quadValueAsk = (a: number, b: number, c: number, x: number) => say(`$f(x)=${quad(a, b, c)}$. Zenbat da $f(${num(x)})$?`, `$f(x)=${quad(a, b, c)}$. ¿Cuánto vale $f(${num(x)})$?`, `$f(x)=${quad(a, b, c)}$. كم يساوي $f(${num(x)})$؟`, `$f(x)=${quad(a, b, c)}$. What is $f(${num(x)})$?`)
const excludedAsk = (m: number, b: number) => say(`Zein zenbaki geratzen da $f(x)=\\frac{1}{${lin(m, b)}}$ funtzioaren definizio-eremutik kanpo?`, `¿Qué número queda fuera del dominio de $f(x)=\\frac{1}{${lin(m, b)}}$?`, `أي عدد يقع خارج مجال $f(x)=\\frac{1}{${lin(m, b)}}$؟`, `Which number is left out of the domain of $f(x)=\\frac{1}{${lin(m, b)}}$?`)
const xCutAsk = (m: number, b: number) => say(`$f(x)=${lin(m, b)}$. Zein da X ardatzarekiko ebaki-puntuaren $x$?`, `$f(x)=${lin(m, b)}$. ¿Cuál es la $x$ del punto de corte con el eje X?`, `$f(x)=${lin(m, b)}$. ما $x$ لنقطة التقاطع مع محور X؟`, `$f(x)=${lin(m, b)}$. What is the $x$ of the point where it meets the X axis?`)
const rangeAsk = (m: number, b: number, from: number, to: number, largest: boolean) => say(
    `$f(x)=${lin(m, b)}$ funtzioaren definizio-eremua $[${num(from)},${num(to)}]$ da. Zein da ibilbidearen balio ${largest ? 'handiena' : 'txikiena'}?`,
    `El dominio de $f(x)=${lin(m, b)}$ es $[${num(from)},${num(to)}]$. ¿Cuál es el ${largest ? 'mayor' : 'menor'} valor del recorrido?`,
    `مجال $f(x)=${lin(m, b)}$ هو $[${num(from)},${num(to)}]$. ما ${largest ? 'أكبر' : 'أصغر'} قيمة في المدى؟`,
    `The domain of $f(x)=${lin(m, b)}$ is $[${num(from)},${num(to)}]$. What is the ${largest ? 'largest' : 'smallest'} value of the range?`
)
const rateAsk = (km: number, hours: number) => say(`Grafiko zuzen batek dio ${km} km egin direla ${hours} orduan, abiadura konstantean. Zenbat km orduko?`, `Una gráfica recta muestra ${km} km recorridos en ${hours} horas, a velocidad constante. ¿Cuántos km por hora?`, `يُظهر تمثيل بياني مستقيم قطع ${km} كم في ${hours} ساعات بسرعة ثابتة. كم كيلومترًا في الساعة؟`, `A straight graph shows ${km} km covered in ${hours} hours at a steady speed. How many km per hour?`)
const changeAsk = (from: number, to: number) => say(`Grafikoan, tenperatura $${num(from)}$ °C izatetik $${num(to)}$ °C izatera pasatzen da. Zenbat aldatu da (zeinuarekin)?`, `En la gráfica, la temperatura pasa de $${num(from)}$ °C a $${num(to)}$ °C. ¿Cuánto ha variado (con signo)?`, `في التمثيل البياني تنتقل درجة الحرارة من $${num(from)}$ °C إلى $${num(to)}$ °C. كم تغيّرت (مع الإشارة)؟`, `On the graph, the temperature goes from $${num(from)}$ °C to $${num(to)}$ °C. How much has it changed (with its sign)?`)
const tableAsk = (ys: number[], largest: boolean) => {
    const xs = ys.map((_, index) => index).join(',')
    const values = ys.map(num).join(',')
    return say(
        `Taula: $x=${xs}$ eta $y=${values}$. Zein da $y$ balio ${largest ? 'handiena (maximo absolutua)' : 'txikiena (minimo absolutua)'}?`,
        `Tabla: $x=${xs}$ e $y=${values}$. ¿Cuál es el ${largest ? 'mayor valor de $y$ (máximo absoluto)' : 'menor valor de $y$ (mínimo absoluto)'}?`,
        `الجدول: $x=${xs}$ و$y=${values}$. ما ${largest ? 'أكبر قيمة لـ$y$ (العظمى المطلقة)' : 'أصغر قيمة لـ$y$ (الصغرى المطلقة)'}؟`,
        `Table: $x=${xs}$ and $y=${values}$. What is the ${largest ? 'largest value of $y$ (absolute maximum)' : 'smallest value of $y$ (absolute minimum)'}?`
    )
}
const turnAsk = (a: number, b: number, c: number) => a > 0
    ? say(`$f(x)=${quad(a, b, c)}$ beherakorra da eta gero gorakorra. Zein $x$ baliotan aldatzen da?`, `$f(x)=${quad(a, b, c)}$ decrece y después crece. ¿En qué valor de $x$ cambia?`, `تتناقص $f(x)=${quad(a, b, c)}$ ثم تتزايد. عند أي قيمة لـ$x$ يحدث ذلك؟`, `$f(x)=${quad(a, b, c)}$ decreases and then increases. At what value of $x$ does it change?`)
    : say(`$f(x)=${quad(a, b, c)}$ gorakorra da eta gero beherakorra. Zein $x$ baliotan aldatzen da?`, `$f(x)=${quad(a, b, c)}$ crece y después decrece. ¿En qué valor de $x$ cambia?`, `تتزايد $f(x)=${quad(a, b, c)}$ ثم تتناقص. عند أي قيمة لـ$x$ يحدث ذلك؟`, `$f(x)=${quad(a, b, c)}$ increases and then decreases. At what value of $x$ does it change?`)
const yCutAsk = (a: number, b: number, c: number) => say(`Non mozten du $f(x)=${quad(a, b, c)}$ funtzioak Y ardatza? Eman $y$.`, `¿Dónde corta $f(x)=${quad(a, b, c)}$ al eje Y? Da la $y$.`, `أين تقطع $f(x)=${quad(a, b, c)}$ محور Y؟ أعطِ $y$.`, `Where does $f(x)=${quad(a, b, c)}$ meet the Y axis? Give $y$.`)
const extremeAsk = (a: number, b: number, c: number) => a > 0
    ? say(`Zein da $f(x)=${quad(a, b, c)}$ funtzioaren minimoaren $y$?`, `¿Cuál es la $y$ del mínimo de $f(x)=${quad(a, b, c)}$?`, `ما $y$ للقيمة الصغرى لـ$f(x)=${quad(a, b, c)}$؟`, `What is the $y$ of the minimum of $f(x)=${quad(a, b, c)}$?`)
    : say(`Zein da $f(x)=${quad(a, b, c)}$ funtzioaren maximoaren $y$?`, `¿Cuál es la $y$ del máximo de $f(x)=${quad(a, b, c)}$?`, `ما $y$ للقيمة العظمى لـ$f(x)=${quad(a, b, c)}$؟`, `What is the $y$ of the maximum of $f(x)=${quad(a, b, c)}$?`)
const ratioAsk = (kg: number, euros: number) => say(`${word(kg)} kg sagarrek ${word(euros)} € balio dute. Zein da proportzionaltasun-konstantea (€/kg)?`, `${word(kg)} kg de manzanas cuestan ${word(euros)} €. ¿Cuál es la constante de proporcionalidad (€/kg)?`, `${kg} كغ من التفاح بـ ${euros} يورو. ما ثابت التناسب (يورو/كغ)؟`, `${kg} kg of apples cost ${euros} €. What is the constant of proportionality (€/kg)?`)
const propAsk = (litres: number, km: number, more: number) => say(`Auto batek ${word(litres)} litro erretzen ditu ${word(km)} km-tan, proportzionalki. Zenbat km egiten ditu ${word(more)} litrorekin?`, `Un coche gasta ${word(litres)} litros en ${word(km)} km, de forma proporcional. ¿Cuántos km hace con ${word(more)} litros?`, `تستهلك سيارة ${litres} لترات في ${km} كم بشكل تناسبي. كم كيلومترًا تقطع بـ ${more} لترًا؟`, `A car uses ${litres} litres in ${km} km, in proportion. How many km does it do with ${more} litres?`)
const slopeAsk = (x1: number, y1: number, x2: number, y2: number) => say(`$A=(${num(x1)},${num(y1)})$ eta $B=(${num(x2)},${num(y2)})$. Zein da $AB$ zuzenaren malda?`, `$A=(${num(x1)},${num(y1)})$ y $B=(${num(x2)},${num(y2)})$. ¿Cuál es la pendiente de la recta $AB$?`, `$A=(${num(x1)},${num(y1)})$ و$B=(${num(x2)},${num(y2)})$. ما ميل المستقيم $AB$؟`, `$A=(${num(x1)},${num(y1)})$ and $B=(${num(x2)},${num(y2)})$. What is the slope of the line $AB$?`)
const lineNAsk = (x1: number, y1: number, x2: number, y2: number) => say(`Zuzen bat $(${num(x1)},${num(y1)})$ eta $(${num(x2)},${num(y2)})$ puntuetatik igarotzen da. Zenbat da $n$, $y=mx+n$ ekuazioan?`, `Una recta pasa por $(${num(x1)},${num(y1)})$ y $(${num(x2)},${num(y2)})$. ¿Cuánto vale $n$ en $y=mx+n$?`, `يمر مستقيم بـ$(${num(x1)},${num(y1)})$ و$(${num(x2)},${num(y2)})$. كم يساوي $n$ في $y=mx+n$؟`, `A line goes through $(${num(x1)},${num(y1)})$ and $(${num(x2)},${num(y2)})$. What is $n$ in $y=mx+n$?`)
const parallelAsk = (m: number, other: number, x: number, y: number) => say(`Zuzen bat $y=${lin(m, other)}$ zuzenaren paraleloa da eta $(${num(x)},${num(y)})$ puntutik igarotzen da. Zenbat da haren $n$?`, `Una recta es paralela a $y=${lin(m, other)}$ y pasa por $(${num(x)},${num(y)})$. ¿Cuánto vale su $n$?`, `مستقيم يوازي $y=${lin(m, other)}$ ويمر بـ$(${num(x)},${num(y)})$. كم يساوي $n$ له؟`, `A line is parallel to $y=${lin(m, other)}$ and goes through $(${num(x)},${num(y)})$. What is its $n$?`)
const pointAsk = (m: number, x: number, y: number) => say(`Zuzen batek $m=${num(m)}$ malda du eta $(${num(x)},${num(y)})$ puntutik igarotzen da. Zenbat da $n$?`, `Una recta tiene pendiente $m=${num(m)}$ y pasa por $(${num(x)},${num(y)})$. ¿Cuánto vale $n$?`, `مستقيم ميله $m=${num(m)}$ ويمر بـ$(${num(x)},${num(y)})$. كم يساوي $n$؟`, `A line has slope $m=${num(m)}$ and goes through $(${num(x)},${num(y)})$. What is $n$?`)
const crossAsk = (m1: number, b1: number, m2: number, b2: number, coordinate: 'x' | 'y') => say(`$y=${lin(m1, b1)}$ eta $y=${lin(m2, b2)}$ zuzenak. Zein da ebaki-puntuaren $${coordinate}$?`, `Rectas $y=${lin(m1, b1)}$ e $y=${lin(m2, b2)}$. ¿Cuál es la $${coordinate}$ del punto de corte?`, `المستقيمان $y=${lin(m1, b1)}$ و$y=${lin(m2, b2)}$. ما $${coordinate}$ لنقطة التقاطع؟`, `The lines $y=${lin(m1, b1)}$ and $y=${lin(m2, b2)}$. What is the $${coordinate}$ of the crossing point?`)
const taxiAsk = (perKm: number, start: number, km: number) => say(`Taxi batek ${word(start)} € kobratzen ditu hasteko eta ${word(perKm)} € km bakoitzeko. Zenbat balio du ${word(km)} km-ko bidaiak (€)?`, `Un taxi cobra ${word(start)} € de bajada y ${word(perKm)} € por km. ¿Cuánto cuesta un viaje de ${word(km)} km (€)?`, `تأخذ سيارة أجرة ${start} يورو للانطلاق و${perKm} يورو لكل كيلومتر. كم ثمن رحلة ${km} كم (يورو)؟`, `A taxi charges ${start} € to start and ${perKm} € per km. How much does a ${km} km ride cost (€)?`)
const taxiBackAsk = (perKm: number, start: number, paid: number) => say(`Taxi batek ${word(start)} € kobratzen ditu hasteko eta ${word(perKm)} € km bakoitzeko. Bidaiak ${word(paid)} € balio izan ditu. Zenbat km?`, `Un taxi cobra ${word(start)} € de bajada y ${word(perKm)} € por km. El viaje ha costado ${word(paid)} €. ¿Cuántos km?`, `تأخذ سيارة أجرة ${start} يورو للانطلاق و${perKm} يورو لكل كيلومتر. كلّفت الرحلة ${paid} يورو. كم كيلومترًا؟`, `A taxi charges ${start} € to start and ${perKm} € per km. The ride cost ${paid} €. How many km?`)
const plansAsk = (m1: number, b1: number, m2: number, b2: number) => say(`A tarifa: ${word(b1)} € gehi ${word(m1)} € hilabeteko. B tarifa: ${word(b2)} € gehi ${word(m2)} € hilabeteko. Zenbat hilabetetan balio dute berdin?`, `Tarifa A: ${word(b1)} € más ${word(m1)} € al mes. Tarifa B: ${word(b2)} € más ${word(m2)} € al mes. ¿A cuántos meses cuestan lo mismo?`, `التعريفة A: ${b1} يورو زائد ${m1} يورو في الشهر. التعريفة B: ${b2} يورو زائد ${m2} يورو في الشهر. بعد كم شهرًا تتساويان؟`, `Plan A: ${b1} € plus ${m1} € a month. Plan B: ${b2} € plus ${m2} € a month. After how many months do they cost the same?`)
const vertexAsk = (a: number, b: number, c: number, coordinate: 'x' | 'y') => say(`Zein da $f(x)=${quad(a, b, c)}$ parabolaren erpinaren $${coordinate}$?`, `¿Cuál es la $${coordinate}$ del vértice de $f(x)=${quad(a, b, c)}$?`, `ما $${coordinate}$ لرأس $f(x)=${quad(a, b, c)}$؟`, `What is the $${coordinate}$ of the vertex of $f(x)=${quad(a, b, c)}$?`)
const rootAsk = (a: number, b: number, c: number, larger: boolean) => say(`$f(x)=${quad(a, b, c)}$ parabolak X ardatza bi puntutan mozten du. Zein da $x$ ${larger ? 'handiena' : 'txikiena'}?`, `La parábola $f(x)=${quad(a, b, c)}$ corta al eje X en dos puntos. ¿Cuál es la $x$ ${larger ? 'mayor' : 'menor'}?`, `يقطع القطع المكافئ $f(x)=${quad(a, b, c)}$ محور X في نقطتين. ما ${larger ? 'أكبر' : 'أصغر'} قيمة لـ$x$؟`, `The parabola $f(x)=${quad(a, b, c)}$ meets the X axis at two points. What is the ${larger ? 'larger' : 'smaller'} $x$?`)
const countAsk = (a: number, b: number, c: number) => say(`Zenbat puntutan mozten du $f(x)=${quad(a, b, c)}$ parabolak X ardatza?`, `¿En cuántos puntos corta $f(x)=${quad(a, b, c)}$ al eje X?`, `في كم نقطة يقطع $f(x)=${quad(a, b, c)}$ محور X؟`, `At how many points does $f(x)=${quad(a, b, c)}$ meet the X axis?`)

/* ---------- Hints, one per kind ---------- */

const hints: Record<FunctionCheckKind, LocalizedText> = {
    'linear': say('Ordezkatu $x$ eta kalkulatu.', 'Sustituye $x$ y calcula.', 'عوّض $x$ واحسب.', 'Substitute $x$ and work it out.'),
    'quadratic': say('Negatiboa parentesi artean karratura.', 'El negativo, entre paréntesis al cuadrado.', 'السالب بين قوسين ثم التربيع.', 'Square the negative number in brackets.'),
    'root': say('Izendatzailea edo funtzioa zero: ebatzi.', 'El denominador o la función igual a cero: resuelve.', 'المقام أو الدالة يساوي صفرًا: حلّ.', 'Set the denominator or the function to zero and solve.'),
    'range-max': say('Zuzen batean, muturrak begiratu.', 'En una recta, mira los extremos.', 'في المستقيم انظر إلى الطرفين.', 'On a line, look at the two ends.'),
    'range-min': say('Zuzen batean, muturrak begiratu.', 'En una recta, mira los extremos.', 'في المستقيم انظر إلى الطرفين.', 'On a line, look at the two ends.'),
    'rate': say('Distantzia zati denbora.', 'Distancia entre tiempo.', 'المسافة على الزمن.', 'Distance over time.'),
    'difference': say('Bukaerakoa ken hasierakoa.', 'Final menos inicial.', 'النهائي ناقص الابتدائي.', 'Final minus initial.'),
    'max-of': say('Begiratu $y$ guztiak.', 'Mira todos los $y$.', 'انظر إلى كل قيم $y$.', 'Look at every $y$.'),
    'min-of': say('Begiratu $y$ guztiak; negatiboak txikiagoak dira.', 'Mira todos los $y$; los negativos son menores.', 'انظر إلى كل قيم $y$؛ السالبة أصغر.', 'Look at every $y$; negative ones are smaller.'),
    'vertex-x': same('$x_{v}=\\frac{-b}{2a}$'),
    'vertex-y': say('Lehenik $x_{v}$; gero ordezkatu.', 'Primero $x_{v}$; después sustituye.', 'أولًا $x_{v}$؛ ثم عوّض.', 'First $x_{v}$; then substitute.'),
    'slope': same('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$'),
    'ratio': same('$m=\\frac{y}{x}$'),
    'prop-value': say('Lehenik $m=\\frac{y}{x}$; gero biderkatu.', 'Primero $m=\\frac{y}{x}$; después multiplica.', 'أولًا $m=\\frac{y}{x}$؛ ثم اضرب.', 'First $m=\\frac{y}{x}$; then multiply.'),
    'n-from': say('Ordezkatu puntua $y=mx+n$ ekuazioan.', 'Sustituye el punto en $y=mx+n$.', 'عوّض النقطة في $y=mx+n$.', 'Substitute the point in $y=mx+n$.'),
    'line-n': say('Lehenik malda; gero puntu bat ordezkatu.', 'Primero la pendiente; después sustituye un punto.', 'أولًا الميل؛ ثم عوّض نقطة.', 'First the slope; then substitute a point.'),
    'cross-x': say('Berdindu bi adierazpenak.', 'Iguala las dos expresiones.', 'ساوِ العبارتين.', 'Set the two expressions equal.'),
    'cross-y': say('Lehenik $x$; gero ordezkatu.', 'Primero $x$; después sustituye.', 'أولًا $x$؛ ثم عوّض.', 'First $x$; then substitute.'),
    'units-for': say('Kendu zati finkoa eta zatitu.', 'Quita la parte fija y divide.', 'اطرح الجزء الثابت واقسم.', 'Take away the fixed part and divide.'),
    'root-big': same('$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$'),
    'root-small': same('$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$'),
    'roots-count': same('$\\Delta=b^{2}-4ac$')
}

/* ---------- The data ---------- */

interface Entry {
    check: FunctionCheck
    prompt: LocalizedText
}

const entry = (prompt: LocalizedText, kind: FunctionCheckKind, ...args: number[]): Entry => ({ prompt, check: check(kind, ...args) })

const practiceEntries: Record<number, [string, Entry]> = {
    1: ['graphs', entry(valueAsk(3, -2, 4), 'linear', 3, -2, 4)],
    2: ['graphs', entry(quadValueAsk(1, -4, 0, -3), 'quadratic', 1, -4, 0, -3)],
    3: ['graphs', entry(excludedAsk(1, -6), 'root', 1, -6)],
    4: ['graphs', entry(rateAsk(18, 3), 'rate', 18, 3)],
    5: ['features', entry(tableAsk([3, 7, 9, 4, -2], true), 'max-of', 3, 7, 9, 4, -2)],
    6: ['features', entry(turnAsk(1, -6, 2), 'vertex-x', 1, -6, 2)],
    7: ['features', entry(xCutAsk(4, -12), 'root', 4, -12)],
    8: ['features', entry(yCutAsk(2, -5, 7), 'quadratic', 2, -5, 7, 0)],
    9: ['linear', entry(ratioAsk(4, 10), 'ratio', 4, 10)],
    10: ['linear', entry(propAsk(5, 100, 15), 'prop-value', 5, 100, 15)],
    11: ['linear', entry(slopeAsk(2, 1, 5, 13), 'slope', 2, 1, 5, 13)],
    12: ['linear', entry(valueAsk(-2, 5, -3), 'linear', -2, 5, -3)],
    13: ['lines', entry(lineNAsk(1, 4, 3, 10), 'line-n', 1, 4, 3, 10)],
    14: ['lines', entry(parallelAsk(2, 7, 3, 4), 'n-from', 2, 3, 4)],
    15: ['lines', entry(crossAsk(3, -4, 1, 6, 'x'), 'cross-x', 3, -4, 1, 6)],
    16: ['lines', entry(taxiAsk(1.2, 3.5, 10), 'linear', 1.2, 3.5, 10)],
    17: ['quadratic', entry(vertexAsk(1, -8, 3, 'x'), 'vertex-x', 1, -8, 3)],
    18: ['quadratic', entry(vertexAsk(-1, 6, -5, 'y'), 'vertex-y', -1, 6, -5)],
    19: ['quadratic', entry(rootAsk(1, -3, -10, true), 'root-big', 1, -3, -10)],
    20: ['quadratic', entry(countAsk(1, 2, 5), 'roots-count', 1, 2, 5)]
}

const challengeEntries: Record<number, [string, number, ChallengeItem['context'], Entry]> = {
    101: ['graphs', 10, 'starter', entry(valueAsk(-4, 1, 2), 'linear', -4, 1, 2)],
    102: ['graphs', 20, 'advanced', entry(rangeAsk(-3, 2, -2, 4, true), 'range-max', -3, 2, -2, 4)],
    103: ['graphs', 30, 'master', entry(quadValueAsk(-2, 3, 5, -4), 'quadratic', -2, 3, 5, -4)],
    104: ['features', 10, 'starter', entry(tableAsk([5, 1, -3, -1, 4], false), 'min-of', 5, 1, -3, -1, 4)],
    105: ['features', 20, 'advanced', entry(turnAsk(-2, 12, 1), 'vertex-x', -2, 12, 1)],
    106: ['features', 30, 'master', entry(extremeAsk(1, 4, -5), 'vertex-y', 1, 4, -5)],
    107: ['linear', 10, 'starter', entry(ratioAsk(5, 12), 'ratio', 5, 12)],
    108: ['linear', 20, 'advanced', entry(slopeAsk(-3, 8, 1, -4), 'slope', -3, 8, 1, -4)],
    109: ['linear', 30, 'master', entry(slopeAsk(-2, -3, 6, 1), 'slope', -2, -3, 6, 1)],
    110: ['lines', 10, 'starter', entry(pointAsk(-3, 2, 1), 'n-from', -3, 2, 1)],
    111: ['lines', 20, 'advanced', entry(plansAsk(6, 30, 9, 12), 'cross-x', 6, 30, 9, 12)],
    112: ['lines', 30, 'master', entry(crossAsk(2, -1, -3, 9, 'y'), 'cross-y', 2, -1, -3, 9)],
    113: ['quadratic', 10, 'starter', entry(vertexAsk(2, -12, 5, 'x'), 'vertex-x', 2, -12, 5)],
    114: ['quadratic', 20, 'advanced', entry(rootAsk(1, 2, -15, false), 'root-small', 1, 2, -15)],
    115: ['quadratic', 30, 'master', entry(vertexAsk(-2, 8, 1, 'y'), 'vertex-y', -2, 8, 1)]
}

type BankEntry = [ExerciseItem['difficulty'], Entry]

const bankSections: [string, LocalizedText, BankEntry[]][] = [
    ['graphs', say('Funtzioak eta grafikoak', 'Funciones y gráficas', 'الدوال والتمثيلات البيانية', 'Functions and graphs'), [
        ['easy', entry(valueAsk(2, 3, 5), 'linear', 2, 3, 5)],
        ['easy', entry(valueAsk(5, -1, -2), 'linear', 5, -1, -2)],
        ['easy', entry(quadValueAsk(1, 0, -9, 4), 'quadratic', 1, 0, -9, 4)],
        ['easy', entry(rateAsk(150, 2), 'rate', 150, 2)],
        ['medium', entry(quadValueAsk(1, 3, -2, -2), 'quadratic', 1, 3, -2, -2)],
        ['medium', entry(excludedAsk(2, -10), 'root', 2, -10)],
        ['medium', entry(changeAsk(-4, 9), 'difference', -4, 9)],
        ['medium', entry(rangeAsk(2, -1, -3, 4, false), 'range-min', 2, -1, -3, 4)],
        ['hard', entry(excludedAsk(3, 12), 'root', 3, 12)],
        ['hard', entry(rangeAsk(-0.5, 4, -6, 2, true), 'range-max', -0.5, 4, -6, 2)]
    ]],
    ['features', say('Ezaugarriak', 'Características', 'الخصائص', 'Features'), [
        ['easy', entry(tableAsk([2, 6, 8, 5, 1], true), 'max-of', 2, 6, 8, 5, 1)],
        ['easy', entry(xCutAsk(2, -8), 'root', 2, -8)],
        ['easy', entry(yCutAsk(1, -7, 10), 'quadratic', 1, -7, 10, 0)],
        ['easy', entry(changeAsk(12, 5), 'difference', 12, 5)],
        ['medium', entry(tableAsk([0, -4, -6, -5, 2], false), 'min-of', 0, -4, -6, -5, 2)],
        ['medium', entry(turnAsk(1, 4, -3), 'vertex-x', 1, 4, -3)],
        ['medium', entry(xCutAsk(-3, 15), 'root', -3, 15)],
        ['medium', entry(turnAsk(-1, 10, 0), 'vertex-x', -1, 10, 0)],
        ['hard', entry(extremeAsk(-1, 6, 2), 'vertex-y', -1, 6, 2)],
        ['hard', entry(xCutAsk(4, 10), 'root', 4, 10)]
    ]],
    ['linear', say('Funtzio linealak', 'Funciones lineales', 'الدوال الخطية', 'Linear functions'), [
        ['easy', entry(ratioAsk(3, 7.5), 'ratio', 3, 7.5)],
        ['easy', entry(slopeAsk(0, 2, 3, 11), 'slope', 0, 2, 3, 11)],
        ['easy', entry(valueAsk(4, -3, 2), 'linear', 4, -3, 2)],
        ['easy', entry(propAsk(4, 50, 10), 'prop-value', 4, 50, 10)],
        ['medium', entry(slopeAsk(1, 7, 4, -2), 'slope', 1, 7, 4, -2)],
        ['medium', entry(valueAsk(0.5, 2, 6), 'linear', 0.5, 2, 6)],
        ['medium', entry(ratioAsk(8, 14), 'ratio', 8, 14)],
        ['medium', entry(slopeAsk(-2, 5, 2, 5), 'slope', -2, 5, 2, 5)],
        ['hard', entry(slopeAsk(-5, -1, 3, 5), 'slope', -5, -1, 3, 5)],
        ['hard', entry(propAsk(6, 90, 10), 'prop-value', 6, 90, 10)]
    ]],
    ['lines', say('Zuzenak eta ereduak', 'Rectas y modelos', 'المستقيمات والنماذج', 'Lines and models'), [
        ['easy', entry(pointAsk(2, 3, 9), 'n-from', 2, 3, 9)],
        ['easy', entry(crossAsk(2, 1, 1, 4, 'x'), 'cross-x', 2, 1, 1, 4)],
        ['easy', entry(taxiAsk(2, 4, 6), 'linear', 2, 4, 6)],
        ['easy', entry(lineNAsk(2, 5, 4, 9), 'line-n', 2, 5, 4, 9)],
        ['medium', entry(parallelAsk(-3, 2, 2, 1), 'n-from', -3, 2, 1)],
        ['medium', entry(crossAsk(4, -5, 2, 3, 'y'), 'cross-y', 4, -5, 2, 3)],
        ['medium', entry(taxiBackAsk(1.5, 3, 18), 'units-for', 1.5, 3, 18)],
        ['medium', entry(lineNAsk(-1, 6, 3, -2), 'line-n', -1, 6, 3, -2)],
        ['hard', entry(plansAsk(15, 40, 25, 10), 'cross-x', 15, 40, 25, 10)],
        ['hard', entry(lineNAsk(-4, 1, 2, 4), 'line-n', -4, 1, 2, 4)]
    ]],
    ['quadratic', say('Funtzio koadratikoak', 'Funciones cuadráticas', 'الدوال التربيعية', 'Quadratic functions'), [
        ['easy', entry(vertexAsk(1, -4, 1, 'x'), 'vertex-x', 1, -4, 1)],
        ['easy', entry(yCutAsk(-3, 2, 8), 'quadratic', -3, 2, 8, 0)],
        ['easy', entry(quadValueAsk(2, -1, 3, 2), 'quadratic', 2, -1, 3, 2)],
        ['easy', entry(countAsk(1, -6, 9), 'roots-count', 1, -6, 9)],
        ['medium', entry(vertexAsk(1, 6, 4, 'y'), 'vertex-y', 1, 6, 4)],
        ['medium', entry(rootAsk(1, -5, 6, true), 'root-big', 1, -5, 6)],
        ['medium', entry(countAsk(2, -3, 1), 'roots-count', 2, -3, 1)],
        ['medium', entry(vertexAsk(-1, -4, 3, 'x'), 'vertex-x', -1, -4, 3)],
        ['hard', entry(rootAsk(2, 2, -12, false), 'root-small', 2, 2, -12)],
        ['hard', entry(vertexAsk(3, -12, 7, 'y'), 'vertex-y', 3, -12, 7)]
    ]]
]

/** p: practice, c: challenge, b: bank */
export const functions3Checks: Record<string, FunctionCheck> = {
    ...Object.fromEntries(Object.entries(practiceEntries).map(([id, [, value]]) => [`p${id}`, value.check])),
    ...Object.fromEntries(Object.entries(challengeEntries).map(([id, [, , , value]]) => [`c${id}`, value.check])),
    ...Object.fromEntries(bankSections.flatMap(([, , items]) => items).map(([, value], index) => [`b${index + 1}`, value.check]))
}

const explain = (value: Entry) => same(`$${functionWork(value.check)}$`)

export const functions3Diagnostic: DiagnosticQuestion[] = [
    {
        id: 7001,
        prompt: say('$f(x)=3x-1$. Zenbat da $f(2)$?', '$f(x)=3x-1$. ¿Cuánto vale $f(2)$?', '$f(x)=3x-1$. كم يساوي $f(2)$؟', '$f(x)=3x-1$. What is $f(2)$?'),
        options: [same('$5$'), same('$6$'), same('$1$')],
        correctIndex: 0,
        explanation: same('$3\\cdot 2-1=5$'),
        topic: 'function-concept'
    },
    {
        id: 7002,
        prompt: say('Grafiko batean zati horizontal batek zer esan nahi du?', 'En una gráfica, ¿qué quiere decir un tramo horizontal?', 'في التمثيل البياني، ماذا يعني جزء أفقي؟', 'On a graph, what does a flat stretch mean?'),
        options: [say('Balioa azkar hazten da.', 'El valor crece deprisa.', 'القيمة تزداد بسرعة.', 'The value grows fast.'), say('Balioa ez da aldatzen.', 'El valor no cambia.', 'القيمة لا تتغيّر.', 'The value does not change.'), say('Balioa zero da.', 'El valor es cero.', 'القيمة صفر.', 'The value is zero.')],
        correctIndex: 1,
        explanation: say('Horizontalean $y$ beti berdina da.', 'En horizontal, $y$ es siempre igual.', 'في الأفقي تبقى $y$ نفسها.', 'On a flat stretch, $y$ stays the same.'),
        topic: 'reading-graphs'
    },
    {
        id: 7003,
        prompt: say('Non mozten du $y=2x-6$ zuzenak X ardatza?', '¿Dónde corta $y=2x-6$ al eje X?', 'أين يقطع $y=2x-6$ محور X؟', 'Where does $y=2x-6$ meet the X axis?'),
        options: [same('$(0,-6)$'), same('$(-3,0)$'), same('$(3,0)$')],
        correctIndex: 2,
        explanation: same('$2x-6=0\\ \\to\\ x=3$'),
        topic: 'intercepts'
    },
    {
        id: 7004,
        prompt: say('Zein da proportzionaltasun zuzeneko funtzio bat?', '¿Cuál es una función de proporcionalidad directa?', 'أي دالة تناسب طردي؟', 'Which one is a direct proportion function?'),
        options: [same('$y=x+4$'), same('$y=4x$'), same('$y=x^{2}$')],
        correctIndex: 1,
        explanation: say('$y=mx$ motakoa da eta jatorritik igarotzen da.', 'Es del tipo $y=mx$ y pasa por el origen.', 'من الشكل $y=mx$ ويمر بالأصل.', 'It has the form $y=mx$ and goes through the origin.'),
        topic: 'proportional'
    },
    {
        id: 7005,
        prompt: say('Zein da $(1,3)$ eta $(3,7)$ puntuetatik igarotzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $(1,3)$ y $(3,7)$?', 'ما ميل المستقيم المار بـ$(1,3)$ و$(3,7)$؟', 'What is the slope of the line through $(1,3)$ and $(3,7)$?'),
        options: [same('$2$'), same('$\\frac{1}{2}$'), same('$4$')],
        correctIndex: 0,
        explanation: same('$m=\\frac{7-3}{3-1}=\\frac{4}{2}=2$'),
        topic: 'slope'
    },
    {
        id: 7006,
        prompt: say('$y=-x+5$ eta $y=-x-2$ zuzenak:', 'Las rectas $y=-x+5$ e $y=-x-2$:', 'المستقيمان $y=-x+5$ و$y=-x-2$:', 'The lines $y=-x+5$ and $y=-x-2$:'),
        options: [say('$(0,5)$ puntuan ebakitzen dira.', 'Se cortan en $(0,5)$.', 'يتقاطعان في $(0,5)$.', 'They cross at $(0,5)$.'), say('Elkarzutak dira.', 'Son perpendiculares.', 'متعامدان.', 'They are perpendicular.'), say('Paraleloak dira.', 'Son paralelas.', 'متوازيان.', 'They are parallel.')],
        correctIndex: 2,
        explanation: say('Malda bera, $m=-1$, eta $n$ desberdina.', 'La misma pendiente, $m=-1$, y distinto $n$.', 'الميل نفسه $m=-1$ و$n$ مختلف.', 'The same slope, $m=-1$, and a different $n$.'),
        topic: 'parallel-lines'
    },
    {
        id: 7007,
        prompt: say('$y=-2x^{2}+x+3$ parabola:', 'La parábola $y=-2x^{2}+x+3$:', 'القطع المكافئ $y=-2x^{2}+x+3$:', 'The parabola $y=-2x^{2}+x+3$:'),
        options: [say('Gora irekitzen da.', 'Se abre hacia arriba.', 'ينفتح إلى الأعلى.', 'Opens upwards.'), say('Behera irekitzen da.', 'Se abre hacia abajo.', 'ينفتح إلى الأسفل.', 'Opens downwards.'), say('Zuzen bat da.', 'Es una recta.', 'إنه مستقيم.', 'Is a straight line.')],
        correctIndex: 1,
        explanation: say('$a=-2<0$: behera.', '$a=-2<0$: hacia abajo.', '$a=-2<0$: إلى الأسفل.', '$a=-2<0$: downwards.'),
        topic: 'parabola-shape'
    },
    {
        id: 7008,
        prompt: say('Zein da $y=x^{2}-4x+1$ parabolaren erpinaren $x$?', '¿Cuál es la $x$ del vértice de $y=x^{2}-4x+1$?', 'ما $x$ لرأس $y=x^{2}-4x+1$؟', 'What is the $x$ of the vertex of $y=x^{2}-4x+1$?'),
        options: [same('$-2$'), same('$4$'), same('$2$')],
        correctIndex: 2,
        explanation: same('$x_{v}=\\frac{4}{2}=2$'),
        topic: 'vertex'
    }
]

export const functions3Practice: PracticeItem[] = Object.entries(practiceEntries).map(([id, [stage, value]]) => ({
    id: Number(id),
    stage,
    prompt: value.prompt,
    expected: n(functionAnswer(value.check)),
    hint: hints[value.check.kind],
    explanation: explain(value)
}))

export const functions3Challenges: ChallengeItem[] = Object.entries(challengeEntries).map(([id, [stage, points, context, value]]) => ({
    id: Number(id),
    stage,
    points,
    context,
    prompt: value.prompt,
    expected: n(functionAnswer(value.check)),
    hint: hints[value.check.kind],
    explanation: explain(value)
}))

let bankId = 0
export const functions3ExerciseBank: ExerciseSection[] = bankSections.map(([id, title, items]) => ({
    id,
    title,
    items: items.map(([difficulty, value]) => {
        bankId += 1
        return { id: bankId, difficulty, question: value.prompt, solution: explain(value), answer: { expected: n(functionAnswer(value.check)) } }
    })
}))
