import { pick, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   J4 · Trigonometriaren detektibea (Detective de trigonometría): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Lines write \sen, \tg, \cosec and \cotg; the game passes localize so
   each language reads its names. Level 1: the six ratios and the sums
   (the secant as 1/sen, the sine of a sum as the sum of the sines, the
   sign of the cosine of a sum, 1 + in the denominator of the tangent);
   level 2: double and half (the double of the sine, the form of cos 2α
   with the wrong ratio, the sign of the half angle, the half of the
   cosine); level 3: equations and functions (the second solution lost,
   the solutions lost by dividing, the period 2π · B, the phase shift
   taken as C). `right` and `reached` are the values the right working and
   the wrong one end at.
   ========================================================================== */

export type TrigonometryDetectiveError =
    | 'reciprocal-swap'
    | 'sum-of-ratios'
    | 'cosine-sign'
    | 'tangent-denominator'
    | 'double-ratio'
    | 'cos-double-form'
    | 'half-sign'
    | 'half-value'
    | 'lost-solution'
    | 'divided-factor'
    | 'period-times'
    | 'phase-c'

export const trigonometryDetectiveLevels: TrigonometryDetectiveError[][] = [
    ['reciprocal-swap', 'sum-of-ratios', 'cosine-sign', 'tangent-denominator'],
    ['double-ratio', 'cos-double-form', 'half-sign', 'half-value'],
    ['lost-solution', 'divided-factor', 'period-times', 'phase-c']
]

export const TRIGONOMETRY_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const frac = (top: number, bottom: number) => {
    const divisor = gcd(Math.abs(top), Math.abs(bottom))
    const [p, q] = [top / divisor, bottom / divisor]
    return q === 1 ? `${p}` : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`
}
function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    solutions: say('Soluzioak', 'Soluciones', 'الحلول', 'Solutions')
}

export const trigonometryDetectiveNames: Record<TrigonometryDetectiveError, LocalizedText> = {
    'reciprocal-swap': say('Sekantea sinuaren alderantzizkotzat hartu du', 'Tomó la secante como la inversa del seno', 'عدّ القاطع مقلوب الجيب', 'Took the secant as the reciprocal of the sine'),
    'sum-of-ratios': say('Batuketaren sinua sinuen batuketatzat hartu du', 'Tomó el seno de la suma como la suma de los senos', 'عدّ جيب المجموع مجموع الجيبين', 'Took the sine of the sum as the sum of the sines'),
    'cosine-sign': say('Batuketaren kosinuan + jarri du, eta − da', 'Puso + en el coseno de la suma, y es −', 'وضع + في جيب تمام المجموع، وهي −', 'Put + in the cosine of the sum, and it is −'),
    'tangent-denominator': say('Tangentearen izendatzailean zeinu okerra jarri du', 'Puso el signo equivocado en el denominador de la tangente', 'وضع إشارة خاطئة في مقام الظل', 'Put the wrong sign in the denominator of the tangent'),
    'double-ratio': say('Angelu bikoitzaren sinua sinuaren bikoitzatzat hartu du', 'Tomó el seno del ángulo doble como el doble del seno', 'عدّ جيب ضعف الزاوية ضعف الجيب', 'Took the sine of the double angle as double the sine'),
    'cos-double-form': say('$\\cos 2\\alpha$ adierazpenean sinuaren forma kosinuarekin erabili du', 'En $\\cos 2\\alpha$ usó la forma del seno con el coseno', 'استعمل في $\\cos 2\\alpha$ صيغة الجيب مع جيب التمام', 'In $\\cos 2\\alpha$ used the sine form with the cosine'),
    'half-sign': say('Angelu erdiaren zeinua α angeluaren koadrantetik hartu du', 'Tomó el signo del ángulo mitad del cuadrante de α', 'أخذ إشارة نصف الزاوية من ربع α', 'Took the sign of the half angle from the quadrant of α'),
    'half-value': say('Angelu erdiaren kosinua kosinuaren erdiatzat hartu du', 'Tomó el coseno del ángulo mitad como la mitad del coseno', 'عدّ جيب تمام نصف الزاوية نصف جيب التمام', 'Took the cosine of the half angle as half the cosine'),
    'lost-solution': say('Biraren bigarren soluzioa ahaztu du', 'Olvidó la segunda solución de la vuelta', 'نسي الحل الثاني في الدورة', 'Forgot the second solution of the turn'),
    'divided-factor': say('Faktore batez zatitu du, eta haren soluzioak galdu ditu', 'Dividió entre un factor y perdió sus soluciones', 'قسم على عامل فأضاع حلوله', 'Divided by a factor and lost its solutions'),
    'period-times': say('Periodoa $2\\pi$ bider B dela pentsatu du', 'Creyó que el periodo es $2\\pi$ por B', 'ظن أن الدور $2\\pi$ في B', 'Thought the period is $2\\pi$ times B'),
    'phase-c': say('Desfasea C dela pentsatu du, eta $-\\frac{C}{B}$ da', 'Creyó que el desfase es C, y es $-\\frac{C}{B}$', 'ظن أن انزياح الطور هو C، وهو $-\\frac{C}{B}$', 'Thought the phase shift is C, and it is $-\\frac{C}{B}$')
}

export const trigonometryDetectiveTips: Record<TrigonometryDetectiveError, LocalizedText> = {
    'reciprocal-swap': say('$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$ eta $\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$ y $\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$ و$\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$.', '$\\sec\\alpha=\\frac{1}{\\cos\\alpha}$ and $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$.'),
    'sum-of-ratios': say('$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$: sinuak eta kosinuak nahasten dira.', '$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$: se mezclan senos y cosenos.', '$\\sen(\\alpha+\\beta)=\\sen\\alpha\\cos\\beta+\\cos\\alpha\\sen\\beta$: تمتزج الجيوب وجيوب التمام.', '$\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$: sines and cosines mix.'),
    'cosine-sign': say('$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: kosinuak zeinua aldatzen du.', '$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: el coseno cambia el signo.', '$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sen\\alpha\\sen\\beta$: جيب التمام يغيّر الإشارة.', '$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$: the cosine changes the sign.'),
    'tangent-denominator': say('Izendatzailean goiko zeinuaren kontrakoa doa: $\\tg(\\alpha+\\beta)=\\frac{\\tg\\alpha+\\tg\\beta}{1-\\tg\\alpha\\tg\\beta}$.', 'En el denominador va el signo contrario al de arriba: $\\tg(\\alpha+\\beta)=\\frac{\\tg\\alpha+\\tg\\beta}{1-\\tg\\alpha\\tg\\beta}$.', 'في المقام الإشارة المعاكسة لإشارة البسط: $\\tg(\\alpha+\\beta)=\\frac{\\tg\\alpha+\\tg\\beta}{1-\\tg\\alpha\\tg\\beta}$.', 'The denominator takes the opposite sign to the top: $\\tan(\\alpha+\\beta)=\\frac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}$.'),
    'double-ratio': say('$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$: kosinua ere behar da.', '$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$: también hace falta el coseno.', '$\\sen 2\\alpha=2\\sen\\alpha\\cos\\alpha$: يلزم جيب التمام أيضًا.', '$\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha$: the cosine is needed too.'),
    'cos-double-form': say('Kosinuarekin, $\\cos 2\\alpha=2\\cos^2\\alpha-1$; sinuarekin, $1-2\\sen^2\\alpha$.', 'Con el coseno, $\\cos 2\\alpha=2\\cos^2\\alpha-1$; con el seno, $1-2\\sen^2\\alpha$.', 'مع جيب التمام $\\cos 2\\alpha=2\\cos^2\\alpha-1$، ومع الجيب $1-2\\sen^2\\alpha$.', 'With the cosine, $\\cos 2\\alpha=2\\cos^2\\alpha-1$; with the sine, $1-2\\sin^2\\alpha$.'),
    'half-sign': say('Zeinua $\\frac{\\alpha}{2}$ angeluaren koadranteak ematen du, ez α angeluarenak.', 'El signo lo da el cuadrante de $\\frac{\\alpha}{2}$, no el de α.', 'الإشارة يعطيها ربع $\\frac{\\alpha}{2}$ لا ربع α.', 'The sign comes from the quadrant of $\\frac{\\alpha}{2}$, not that of α.'),
    'half-value': say('$\\cos\\frac{\\alpha}{2}=\\sqrt{\\frac{1+\\cos\\alpha}{2}}$: erroa eta 1 + behar dira.', '$\\cos\\frac{\\alpha}{2}=\\sqrt{\\frac{1+\\cos\\alpha}{2}}$: hacen falta la raíz y el 1 +.', '$\\cos\\frac{\\alpha}{2}=\\sqrt{\\frac{1+\\cos\\alpha}{2}}$: يلزم الجذر و1 +.', '$\\cos\\frac{\\alpha}{2}=\\sqrt{\\frac{1+\\cos\\alpha}{2}}$: you need the root and the 1 +.'),
    'lost-solution': say('Sinu bera: α eta $180°-\\alpha$; kosinu bera: α eta $360°-\\alpha$.', 'Mismo seno: α y $180°-\\alpha$; mismo coseno: α y $360°-\\alpha$.', 'الجيب نفسه: α و$180°-\\alpha$؛ وجيب التمام نفسه: α و$360°-\\alpha$.', 'Same sine: α and $180°-\\alpha$; same cosine: α and $360°-\\alpha$.'),
    'divided-factor': say('Atera faktore komuna: biderkadura 0 da edozein faktore 0 denean.', 'Saca factor común: el producto vale 0 cuando vale 0 cualquier factor.', 'أخرج العامل المشترك: الجداء يساوي 0 عندما يساوي 0 أي عامل.', 'Take out the common factor: the product is 0 when any factor is 0.'),
    'period-times': say('Periodoa $\\frac{2\\pi}{B}$ da: B handiagoa, uhina estuagoa.', 'El periodo es $\\frac{2\\pi}{B}$: cuanto mayor es B, más apretada va la onda.', 'الدور $\\frac{2\\pi}{B}$: كلما كبر B ضاقت الموجة.', 'The period is $\\frac{2\\pi}{B}$: the larger B, the tighter the wave.'),
    'phase-c': say('Desfasea barrukoa 0 egiten duen $x$ da: $Bx+C=0$.', 'El desfase es la $x$ que hace 0 lo de dentro: $Bx+C=0$.', 'انزياح الطور هو $x$ الذي يجعل ما في الداخل 0: $Bx+C=0$.', 'The phase shift is the $x$ that makes the inside 0: $Bx+C=0$.')
}

type Built = Omit<WorkedCase<TrigonometryDetectiveError>, 'options'>

/** Right triangles with whole sides: the ratios of their acute angles are simple fractions */
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]
/** cos α = c with c = 2t² − 1 and t from a triple, so the root of the half angle is t */
const HALVES: Array<[number, number]> = [[4, 5], [12, 13], [15, 17], [24, 25], [21, 29]]
const NOTABLE_SINES: Array<{ latex: string; angle: number; written: string }> = [
    { latex: '\\frac{1}{2}', angle: 30, written: '2\\sen x=1' },
    { latex: '\\frac{\\sqrt{2}}{2}', angle: 45, written: '\\sqrt{2}\\sen x=1' },
    { latex: '\\frac{\\sqrt{3}}{2}', angle: 60, written: '2\\sen x=\\sqrt{3}' }
]

/** 2π/B written short */
const PERIODS: Record<number, string> = { 2: '\\pi', 3: '\\frac{2\\pi}{3}', 4: '\\frac{\\pi}{2}', 6: '\\frac{\\pi}{3}' }

function build(random: Random, error: TrigonometryDetectiveError): Built | null {
    switch (error) {
        case 'reciprocal-swap': {
            const [p, q, h] = pick(random, TRIPLES)
            return {
                problem: say(`$\\cos\\alpha=\\frac{${q}}{${h}}$ da, eta α zorrotza da. Kalkulatu $\\sec\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$ y α es agudo. Halla $\\sec\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$ وα حادة. أوجد $\\sec\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$ and α is acute. Find $\\sec\\alpha$.`),
                lines: [line(LABELS.data, `\\sen\\alpha=\\frac{${p}}{${h}}`), line(LABELS.formula, `\\sec\\alpha=\\frac{1}{\\sen\\alpha}`), line(LABELS.result, `\\sec\\alpha=\\frac{${h}}{${p}}`)],
                wrong: 1, error, fix: `\\sec\\alpha=\\frac{1}{\\cos\\alpha}\\ \\to\\ \\sec\\alpha=\\frac{${h}}{${q}}`, right: h / q, reached: h / p
            }
        }
        case 'sum-of-ratios': {
            const [[p1, q1, h1], [p2, q2, h2]] = [pick(random, TRIPLES), pick(random, TRIPLES)]
            const right = (p1 * q2 + q1 * p2) / (h1 * h2)
            const reached = p1 / h1 + p2 / h2
            return {
                problem: say(`α eta β zorrotzak dira, $\\sen\\alpha=\\frac{${p1}}{${h1}}$ eta $\\sen\\beta=\\frac{${p2}}{${h2}}$. Kalkulatu $\\sen(\\alpha+\\beta)$.`, `α y β son agudos, $\\sen\\alpha=\\frac{${p1}}{${h1}}$ y $\\sen\\beta=\\frac{${p2}}{${h2}}$. Halla $\\sen(\\alpha+\\beta)$.`, `α وβ حادتان، و$\\sen\\alpha=\\frac{${p1}}{${h1}}$ و$\\sen\\beta=\\frac{${p2}}{${h2}}$. أوجد $\\sen(\\alpha+\\beta)$.`, `α and β are acute, $\\sin\\alpha=\\frac{${p1}}{${h1}}$ and $\\sin\\beta=\\frac{${p2}}{${h2}}$. Find $\\sin(\\alpha+\\beta)$.`),
                lines: [line(LABELS.data, `\\cos\\alpha=\\frac{${q1}}{${h1}},\\ \\cos\\beta=\\frac{${q2}}{${h2}}`), line(LABELS.formula, `\\sen(\\alpha+\\beta)=\\frac{${p1}}{${h1}}+\\frac{${p2}}{${h2}}`), line(LABELS.result, `\\sen(\\alpha+\\beta)=${frac(p1 * h2 + p2 * h1, h1 * h2)}`)],
                wrong: 1, error, fix: `\\frac{${p1}}{${h1}}\\cdot\\frac{${q2}}{${h2}}+\\frac{${q1}}{${h1}}\\cdot\\frac{${p2}}{${h2}}\\ \\to\\ ${frac(p1 * q2 + q1 * p2, h1 * h2)}`, right, reached
            }
        }
        case 'cosine-sign': {
            const [[p1, q1, h1], [p2, q2, h2]] = [pick(random, TRIPLES), pick(random, TRIPLES)]
            const right = (q1 * q2 - p1 * p2) / (h1 * h2)
            const reached = (q1 * q2 + p1 * p2) / (h1 * h2)
            return {
                problem: say(`α eta β zorrotzak dira, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ eta $\\cos\\beta=\\frac{${q2}}{${h2}}$. Kalkulatu $\\cos(\\alpha+\\beta)$.`, `α y β son agudos, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ y $\\cos\\beta=\\frac{${q2}}{${h2}}$. Halla $\\cos(\\alpha+\\beta)$.`, `α وβ حادتان، و$\\cos\\alpha=\\frac{${q1}}{${h1}}$ و$\\cos\\beta=\\frac{${q2}}{${h2}}$. أوجد $\\cos(\\alpha+\\beta)$.`, `α and β are acute, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ and $\\cos\\beta=\\frac{${q2}}{${h2}}$. Find $\\cos(\\alpha+\\beta)$.`),
                lines: [line(LABELS.data, `\\sen\\alpha=\\frac{${p1}}{${h1}},\\ \\sen\\beta=\\frac{${p2}}{${h2}}`), line(LABELS.formula, `\\cos(\\alpha+\\beta)=\\frac{${q1 * q2}}{${h1 * h2}}+\\frac{${p1 * p2}}{${h1 * h2}}`), line(LABELS.result, `\\cos(\\alpha+\\beta)=${frac(q1 * q2 + p1 * p2, h1 * h2)}`)],
                wrong: 1, error, fix: `\\frac{${q1 * q2}}{${h1 * h2}}-\\frac{${p1 * p2}}{${h1 * h2}}\\ \\to\\ ${frac(q1 * q2 - p1 * p2, h1 * h2)}`, right, reached
            }
        }
        case 'tangent-denominator': {
            const a = pick(random, [2, 3, 4, 5])
            const b = pick(random, [1, 2, 3, 4].filter((value) => value !== a))
            return {
                problem: say(`$\\tg\\alpha=${a}$ eta $\\tg\\beta=${b}$ dira. Kalkulatu $\\tg(\\alpha+\\beta)$.`, `$\\tg\\alpha=${a}$ y $\\tg\\beta=${b}$. Halla $\\tg(\\alpha+\\beta)$.`, `$\\tg\\alpha=${a}$ و$\\tg\\beta=${b}$. أوجد $\\tg(\\alpha+\\beta)$.`, `$\\tan\\alpha=${a}$ and $\\tan\\beta=${b}$. Find $\\tan(\\alpha+\\beta)$.`),
                lines: [line(LABELS.formula, `\\tg(\\alpha+\\beta)=\\frac{\\tg\\alpha+\\tg\\beta}{1+\\tg\\alpha\\tg\\beta}`), line(LABELS.step, `\\frac{${a}+${b}}{1+${a * b}}`), line(LABELS.result, `\\tg(\\alpha+\\beta)=${frac(a + b, 1 + a * b)}`)],
                wrong: 0, error, fix: `\\frac{${a}+${b}}{1-${a * b}}\\ \\to\\ ${frac(a + b, 1 - a * b)}`, right: (a + b) / (1 - a * b), reached: (a + b) / (1 + a * b)
            }
        }
        case 'double-ratio': {
            const [p, q, h] = pick(random, TRIPLES)
            return {
                problem: say(`$\\sen\\alpha=\\frac{${p}}{${h}}$ da, eta α zorrotza da. Kalkulatu $\\sen 2\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ y α es agudo. Halla $\\sen 2\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ وα حادة. أوجد $\\sen 2\\alpha$.`, `$\\sin\\alpha=\\frac{${p}}{${h}}$ and α is acute. Find $\\sin 2\\alpha$.`),
                lines: [line(LABELS.data, `\\cos\\alpha=\\frac{${q}}{${h}}`), line(LABELS.formula, `\\sen 2\\alpha=2\\cdot\\frac{${p}}{${h}}`), line(LABELS.result, `\\sen 2\\alpha=${frac(2 * p, h)}`)],
                wrong: 1, error, fix: `2\\cdot\\frac{${p}}{${h}}\\cdot\\frac{${q}}{${h}}\\ \\to\\ ${frac(2 * p * q, h * h)}`, right: (2 * p * q) / (h * h), reached: (2 * p) / h
            }
        }
        case 'cos-double-form': {
            const [, q, h] = pick(random, TRIPLES)
            return {
                problem: say(`$\\cos\\alpha=\\frac{${q}}{${h}}$ da. Kalkulatu $\\cos 2\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$. Halla $\\cos 2\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$. أوجد $\\cos 2\\alpha$.`, `$\\cos\\alpha=\\frac{${q}}{${h}}$. Find $\\cos 2\\alpha$.`),
                lines: [line(LABELS.formula, `\\cos 2\\alpha=1-2\\cos^2\\alpha`), line(LABELS.step, `1-2\\cdot\\frac{${q * q}}{${h * h}}`), line(LABELS.result, `\\cos 2\\alpha=${frac(h * h - 2 * q * q, h * h)}`)],
                wrong: 0, error, fix: `2\\cdot\\frac{${q * q}}{${h * h}}-1\\ \\to\\ ${frac(2 * q * q - h * h, h * h)}`, right: (2 * q * q - h * h) / (h * h), reached: (h * h - 2 * q * q) / (h * h)
            }
        }
        case 'half-sign': {
            const [t, h] = pick(random, HALVES)
            const c = 2 * t * t - h * h
            return {
                problem: say(`$\\cos\\alpha=${frac(c, h * h)}$ da, eta α laugarren koadrantean dago. Kalkulatu $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ y α está en el cuarto cuadrante. Halla $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ وα في الربع الرابع. أوجد $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ and α is in the fourth quadrant. Find $\\cos\\frac{\\alpha}{2}$.`),
                lines: [line(LABELS.data, `135°<\\frac{\\alpha}{2}<180°`), line(LABELS.formula, `\\cos\\frac{\\alpha}{2}=+\\sqrt{\\frac{1+\\cos\\alpha}{2}}`), line(LABELS.result, `\\cos\\frac{\\alpha}{2}=\\frac{${t}}{${h}}`)],
                wrong: 1, error, fix: `\\cos\\frac{\\alpha}{2}<0\\ \\to\\ -\\frac{${t}}{${h}}`, right: -t / h, reached: t / h
            }
        }
        case 'half-value': {
            const [t, h] = pick(random, HALVES)
            const c = 2 * t * t - h * h
            return {
                problem: say(`$\\cos\\alpha=${frac(c, h * h)}$ da, eta α zorrotza da. Kalkulatu $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ y α es agudo. Halla $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ وα حادة. أوجد $\\cos\\frac{\\alpha}{2}$.`, `$\\cos\\alpha=${frac(c, h * h)}$ and α is acute. Find $\\cos\\frac{\\alpha}{2}$.`),
                lines: [line(LABELS.data, `0°<\\frac{\\alpha}{2}<45°`), line(LABELS.formula, `\\cos\\frac{\\alpha}{2}=\\frac{\\cos\\alpha}{2}`), line(LABELS.result, `\\cos\\frac{\\alpha}{2}=${frac(c, 2 * h * h)}`)],
                wrong: 1, error, fix: `\\sqrt{\\frac{1+${frac(c, h * h)}}{2}}\\ \\to\\ \\frac{${t}}{${h}}`, right: t / h, reached: c / (2 * h * h)
            }
        }
        case 'lost-solution': {
            const notable = pick(random, NOTABLE_SINES)
            return {
                problem: say(`Ebatzi $${notable.written}$, 0°-tik 360°-ra.`, `Resuelve $${notable.written}$ entre 0° y 360°.`, `حُلّ $${notable.written}$ بين 0° و360°.`, `Solve $${notable.written}$ between 0° and 360°.`),
                lines: [line(LABELS.step, `\\sen x=${notable.latex}`), line(LABELS.solutions, `x=${notable.angle}°`), line(LABELS.result, `x=${notable.angle}°+k\\cdot 360°`)],
                wrong: 1, error, fix: `x=${notable.angle}°\\ \\to\\ x=${180 - notable.angle}°`, right: 2, reached: 1
            }
        }
        case 'divided-factor': {
            const notable = pick(random, NOTABLE_SINES)
            const k = notable.latex === '\\frac{1}{2}' ? '' : notable.latex === '\\frac{\\sqrt{2}}{2}' ? '\\sqrt{2}' : '\\sqrt{3}'
            return {
                problem: say(`Ebatzi $\\sen 2x=${k}\\cos x$, 0°-tik 360°-ra.`, `Resuelve $\\sen 2x=${k}\\cos x$ entre 0° y 360°.`, `حُلّ $\\sen 2x=${k}\\cos x$ بين 0° و360°.`, `Solve $\\sin 2x=${k}\\cos x$ between 0° and 360°.`),
                lines: [line(LABELS.step, `2\\sen x\\cos x=${k}\\cos x`), line(LABELS.step, `2\\sen x=${k || '1'}`), line(LABELS.solutions, `x=${notable.angle}°,\\ ${180 - notable.angle}°`)],
                wrong: 1, error, fix: `\\cos x\\,(2\\sen x-${k || '1'})=0\\ \\to\\ x=90°,\\ 270°`, right: 4, reached: 2
            }
        }
        case 'period-times': {
            const A = pick(random, [2, 3, 4, 5])
            const B = pick(random, [2, 3, 4, 6])
            const ratio = pick(random, ['\\sen', '\\cos'])
            return {
                problem: say(`Kalkulatu $y=${A}${ratio} ${B}x$ funtzioaren periodoa.`, `Halla el periodo de $y=${A}${ratio} ${B}x$.`, `أوجد دور الدالة $y=${A}${ratio} ${B}x$.`, `Find the period of $y=${A}${ratio} ${B}x$.`),
                lines: [line(LABELS.data, `A=${A},\\ B=${B}`), line(LABELS.formula, `T=2\\pi\\cdot ${B}`), line(LABELS.result, `T=${2 * B}\\pi`)],
                wrong: 1, error, fix: `T=\\frac{2\\pi}{${B}}\\ \\to\\ T=${PERIODS[B]}`, right: (2 * Math.PI) / B, reached: 2 * Math.PI * B
            }
        }
        case 'phase-c': {
            const B = pick(random, [2, 3, 4])
            const m = pick(random, [2, 3, 4, 6])
            return {
                problem: say(`Kalkulatu $y=\\sen\\left(${B}x-\\frac{\\pi}{${m}}\\right)$ funtzioaren desfasea.`, `Halla el desfase de $y=\\sen\\left(${B}x-\\frac{\\pi}{${m}}\\right)$.`, `أوجد انزياح طور الدالة $y=\\sen\\left(${B}x-\\frac{\\pi}{${m}}\\right)$.`, `Find the phase shift of $y=\\sin\\left(${B}x-\\frac{\\pi}{${m}}\\right)$.`),
                lines: [line(LABELS.data, `B=${B},\\ C=-\\frac{\\pi}{${m}}`), line(LABELS.formula, `x_0=-C`), line(LABELS.result, `x_0=\\frac{\\pi}{${m}}`)],
                wrong: 1, error, fix: `${B}x-\\frac{\\pi}{${m}}=0\\ \\to\\ x_0=\\frac{\\pi}{${B * m}}`, right: Math.PI / (B * m), reached: Math.PI / m
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createTrigonometryDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, trigonometryDetectiveLevels[levelIndex], TRIGONOMETRY_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
