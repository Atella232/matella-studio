import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { objectiveValue, optimum, pointLatex, vertices, withSigns, type HalfPlane, type Point } from '../lp.ts'

/* ==========================================================================
   J4 · Programazio linealaren detektibea: a worked solution of three lines
   with one wrong line, the mistakes of this unit. Level 1 (constraints):
   «at most» written ≥, the hours of A and B swapped, «at least 10 in
   total» written for A alone. Level 2 (vertices): a crossing outside the
   region taken as a vertex, the crossing of the two lines forgotten, the
   system of the crossing solved wrongly. Level 3 (the optimum): the
   largest value taken in a cost problem, the origin taken as the cheapest
   point, a tie read as a single vertex. `right` and `reached` only tell
   the cases apart.
   ========================================================================== */

export type ProgrammingDetectiveError =
    | 'sense-reversed'
    | 'hours-swapped'
    | 'total-as-one'
    | 'outside-vertex'
    | 'missing-vertex'
    | 'wrong-crossing'
    | 'max-for-cost'
    | 'origin-cheapest'
    | 'tie-ignored'

export const programmingDetectiveLevels: ProgrammingDetectiveError[][] = [
    ['sense-reversed', 'hours-swapped', 'total-as-one'],
    ['outside-vertex', 'missing-vertex', 'wrong-crossing'],
    ['max-for-cost', 'origin-cheapest', 'tie-ignored']
]

export const PROGRAMMING_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const L = (a: number, b: number, c: number, sense: HalfPlane['sense'] = '≤'): HalfPlane => ({ a, b, c, sense })

export const programmingDetectiveNames: Record<ProgrammingDetectiveError, LocalizedText> = {
    'sense-reversed': say('«Gehienez» $\\ge$ gisa idatzi du', 'Escribió «como mucho» con $\\ge$', 'كتب «على الأكثر» بـ $\\ge$', 'Wrote «at most» with $\\ge$'),
    'hours-swapped': say('A eta B produktuen orduak trukatu ditu', 'Cambió las horas de A y de B', 'بدّل ساعات A وB', 'Swapped the hours of A and B'),
    'total-as-one': say('«Guztira» produktu bakarrari jarri dio', 'Puso «en total» a un solo producto', 'جعل «إجمالًا» لمنتج واحد', 'Put «in total» on a single product'),
    'outside-vertex': say('Eskualdetik kanpoko ebaki-puntu bat hartu du erpintzat', 'Tomó como vértice un corte que está fuera de la región', 'اعتبر رأسًا تقاطعًا خارج المنطقة', 'Took a crossing outside the region as a vertex'),
    'missing-vertex': say('Bi zuzenen ebaki-puntua ahaztu du', 'Olvidó el corte de las dos rectas', 'نسي تقاطع المستقيمين', 'Forgot where the two lines cross'),
    'wrong-crossing': say('Ebaki-puntuaren sistema gaizki ebatzi du', 'Resolvió mal el sistema del corte', 'حلّ نظام التقاطع خطأ', 'Solved the system of the crossing wrongly'),
    'max-for-cost': say('Kostu-problema batean handiena hartu du', 'En un problema de coste tomó el mayor', 'أخذ الأكبر في مسألة كلفة', 'Took the largest in a cost problem'),
    'origin-cheapest': say('$(0,0)$ hartu du merkeentzat, eskualdean ez dagoen arren', 'Tomó $(0,0)$ como lo más barato aunque no está en la región', 'اعتبر $(0,0)$ الأرخص رغم أنها ليست في المنطقة', 'Took $(0,0)$ as cheapest although it is not in the region'),
    'tie-ignored': say('Berdinketa ikusi gabe, erpin bakarra eman du', 'No vio el empate y dio un solo vértice', 'لم يرَ التعادل وأعطى رأسًا واحدًا', 'Missed the tie and gave a single vertex')
}

export const programmingDetectiveTips: Record<ProgrammingDetectiveError, LocalizedText> = {
    'sense-reversed': say('«Gehienez» $\\le$ da; «gutxienez», $\\ge$.', '«Como mucho» es $\\le$; «al menos», $\\ge$.', '«على الأكثر» هي $\\le$؛ و«على الأقل» هي $\\ge$.', '«At most» is $\\le$; «at least» is $\\ge$.'),
    'hours-swapped': say('Koefiziente bakoitza bere aldagaiarekin doa: A-ren orduak $x$ aldagaiarekin.', 'Cada coeficiente va con su variable: las horas de A, con la $x$.', 'كل معامل مع متغيره: ساعات A مع $x$.', 'Each coefficient goes with its variable: the hours of A with $x$.'),
    'total-as-one': say('«Guztira» bi aldagaien batura da: $x+y$.', '«En total» es la suma de las dos variables: $x+y$.', '«إجمالًا» هو مجموع المتغيرين: $x+y$.', '«In total» is the sum of both variables: $x+y$.'),
    'outside-vertex': say('Ebaki-puntu bakoitzak murrizketa guztiak bete behar ditu.', 'Cada corte tiene que cumplir todas las restricciones.', 'يجب أن يحقق كل تقاطع كل القيود.', 'Each crossing must satisfy every constraint.'),
    'missing-vertex': say('Zuzenen arteko ebaki-puntuak ere erpinak dira.', 'Los cortes entre las rectas también son vértices.', 'نقاط التقاطع بين المستقيمات رؤوس أيضًا.', 'Where the lines cross each other is a vertex too.'),
    'wrong-crossing': say('Egiaztatu ebaki-puntua bi ekuazioetan.', 'Comprueba el corte en las dos ecuaciones.', 'تحقق من التقاطع في المعادلتين.', 'Check the crossing in both equations.'),
    'max-for-cost': say('Kostua minimizatu egiten da: aukeratu txikiena.', 'El coste se minimiza: elige el menor.', 'الكلفة تُصغَّر: اختر الأصغر.', 'A cost is minimised: choose the smallest.'),
    'origin-cheapest': say('«Gutxienez» murrizketekin $(0,0)$ kanpoan dago.', 'Con restricciones de «al menos», $(0,0)$ queda fuera.', 'مع قيود «على الأقل» تبقى $(0,0)$ خارجًا.', 'With «at least» constraints, $(0,0)$ is outside.'),
    'tie-ignored': say('Bi erpinek balio bera badute, haien arteko alde osoa da soluzioa.', 'Si dos vértices dan lo mismo, todo el lado entre ellos es solución.', 'إذا أعطى رأسان القيمة نفسها فالضلع كله بينهما حل.', 'If two vertices give the same, the whole side between them is a solution.')
}

type Built = Omit<WorkedCase<ProgrammingDetectiveError>, 'options'>
const table = (points: Point[], a: number, b: number) => points.map((point) => `F${pointLatex(point)}=${a * point[0] + b * point[1]}`).join(',\\ ')

function build(random: Random, error: ProgrammingDetectiveError): Built | null {
    switch (error) {
        case 'sense-reversed': {
            const [p, q] = [randomInt(random, 2, 4), randomInt(random, 1, 3)]
            const n = 10 * randomInt(random, 3, 8)
            return {
                problem: say(`A-k ${p} ordu behar ditu eta B-k ${q}; gehienez ${n} ordu daude. Idatzi murrizketa.`, `A necesita ${p} horas y B, ${q}; hay como mucho ${n} horas. Escribe la restricción.`, `يحتاج A إلى ${p} ساعات وB إلى ${q}؛ وتتوفر ${n} ساعة على الأكثر. اكتب القيد.`, `A needs ${p} hours and B ${q}; there are at most ${n} hours. Write the constraint.`),
                lines: [line(LABELS.data, `${p}x+${q}y`), line(LABELS.step, `${p}x+${q}y\\ge ${n}`), line(LABELS.result, `${p}x+${q}y\\ge ${n},\\ x,y\\ge 0`)],
                wrong: 1, error, fix: `${p}x+${q}y\\le ${n}`, right: n, reached: -n
            }
        }
        case 'hours-swapped': {
            const p = randomInt(random, 2, 5)
            const q = p + randomInt(random, 1, 3)
            const n = 10 * randomInt(random, 3, 8)
            return {
                problem: say(`A-k ${p} ordu behar ditu eta B-k ${q}; gehienez ${n} ordu daude. Idatzi murrizketa.`, `A necesita ${p} horas y B, ${q}; hay como mucho ${n} horas. Escribe la restricción.`, `يحتاج A إلى ${p} ساعات وB إلى ${q}؛ وتتوفر ${n} ساعة على الأكثر. اكتب القيد.`, `A needs ${p} hours and B ${q}; there are at most ${n} hours. Write the constraint.`),
                lines: [line(LABELS.data, 'x:\\ A,\\quad y:\\ B'), line(LABELS.step, `${q}x+${p}y\\le ${n}`), line(LABELS.result, `${q}x+${p}y\\le ${n}`)],
                wrong: 1, error, fix: `${p}x+${q}y\\le ${n}`, right: p, reached: q
            }
        }
        case 'total-as-one': {
            const n = randomInt(random, 6, 20)
            return {
                problem: say(`Guztira gutxienez ${n} unitate egin behar dira. Idatzi murrizketa.`, `Hay que hacer al menos ${n} unidades en total. Escribe la restricción.`, `يجب صنع ${n} وحدة على الأقل إجمالًا. اكتب القيد.`, `At least ${n} units must be made in total. Write the constraint.`),
                lines: [line(LABELS.data, 'x:\\ A,\\quad y:\\ B'), line(LABELS.step, `x\\ge ${n}`), line(LABELS.result, `x\\ge ${n},\\ y\\ge 0`)],
                wrong: 1, error, fix: `x+y\\ge ${n}`, right: 2, reached: 1
            }
        }
        case 'outside-vertex': {
            const c1 = randomInt(random, 4, 7)
            const c2 = c1 + randomInt(random, 2, 4)
            const constraints = [L(1, 1, c1), L(1, 2, c2)]
            const points = vertices(withSigns(constraints))
            const max = optimum(withSigns(constraints), { a: 1, b: 2 }, 'max').value!
            const bad: Point = [0, c1]
            if (1 * 0 + 2 * c1 <= max) return null
            return {
                problem: say(`Maximizatu $F=x+2y$, $x+y\\le ${c1}$ eta $x+2y\\le ${c2}$ izanik ($x,y\\ge 0$).`, `Maximiza $F=x+2y$ con $x+y\\le ${c1}$ y $x+2y\\le ${c2}$ ($x,y\\ge 0$).`, `عظّم $F=x+2y$ مع $x+y\\le ${c1}$ و$x+2y\\le ${c2}$ ($x,y\\ge 0$).`, `Maximise $F=x+2y$ with $x+y\\le ${c1}$ and $x+2y\\le ${c2}$ ($x,y\\ge 0$).`),
                lines: [line(LABELS.step, [...points.filter((point) => point[0] !== 0 || point[1] !== 0), bad].map(pointLatex).join(',\\ ')), line(LABELS.step, `F${pointLatex(bad)}=${2 * c1}`), line(LABELS.result, `\\max F=${2 * c1}`)],
                wrong: 0, error, fix: `${pointLatex(bad)}:\\ 0+2\\cdot ${c1}=${2 * c1}>${c2}\\ \\to\\ \\max F=${max}`, right: max, reached: 2 * c1
            }
        }
        case 'missing-vertex': {
            const p = randomInt(random, 2, 4)
            const q = randomInt(random, 2, 4)
            const constraints = [L(1, 1, p + q), L(2, 1, 2 * p + q)]
            const objective = { a: 3, b: 2 }
            const found = optimum(withSigns(constraints), objective, 'max')
            if (found.kind !== 'unique' || found.at[0][0] !== p || found.at[0][1] !== q) return null
            const axes = vertices(withSigns(constraints)).filter((point) => (point[0] === 0) !== (point[1] === 0))
            const reached = Math.max(...axes.map((point) => objectiveValue(objective, point)))
            return {
                problem: say(`Maximizatu $F=3x+2y$, $x+y\\le ${p + q}$ eta $2x+y\\le ${2 * p + q}$ izanik ($x,y\\ge 0$).`, `Maximiza $F=3x+2y$ con $x+y\\le ${p + q}$ y $2x+y\\le ${2 * p + q}$ ($x,y\\ge 0$).`, `عظّم $F=3x+2y$ مع $x+y\\le ${p + q}$ و$2x+y\\le ${2 * p + q}$ ($x,y\\ge 0$).`, `Maximise $F=3x+2y$ with $x+y\\le ${p + q}$ and $2x+y\\le ${2 * p + q}$ ($x,y\\ge 0$).`),
                lines: [line(LABELS.step, ['(0,0)', ...axes.map(pointLatex)].join(',\\ ')), line(LABELS.step, table(axes, 3, 2)), line(LABELS.result, `\\max F=${reached}`)],
                wrong: 0, error, fix: `(${p},${q}):\\ F=${found.value}`, right: found.value!, reached
            }
        }
        case 'wrong-crossing': {
            const p = randomInt(random, 2, 5)
            const q = randomInt(random, 1, 4)
            if (p === q) return null
            const wrong: Point = [q, p]
            return {
                problem: say(`Aurkitu $x+y\\le ${p + q}$ eta $x+2y\\le ${p + 2 * q}$ zuzenen ebaki-puntua.`, `Halla el corte de $x+y\\le ${p + q}$ y $x+2y\\le ${p + 2 * q}$.`, `أوجد تقاطع $x+y\\le ${p + q}$ و$x+2y\\le ${p + 2 * q}$.`, `Find where $x+y\\le ${p + q}$ and $x+2y\\le ${p + 2 * q}$ cross.`),
                lines: [line(LABELS.step, `E_2-E_1:\\ y=${q}`), line(LABELS.step, `x=${q}`), line(LABELS.result, pointLatex(wrong))],
                wrong: 1, error, fix: `x=${p + q}-${q}=${p}\\ \\to\\ (${p},${q})`, right: p, reached: q
            }
        }
        case 'max-for-cost': {
            const constraints = [L(1, 1, 5, '≥'), L(2, 1, 6, '≥')]
            const objective = { a: randomInt(random, 3, 6), b: randomInt(random, 2, 4) }
            const points = vertices(withSigns(constraints))
            const values = points.map((point) => objectiveValue(objective, point))
            const min = Math.min(...values)
            const max = Math.max(...values)
            if (min === max || values.filter((value) => value === min).length > 1) return null
            return {
                problem: say(`Kostua $F=${objective.a}x+${objective.b}y$ da, $x+y\\ge 5$ eta $2x+y\\ge 6$ izanik. Zein da kostu txikiena?`, `El coste es $F=${objective.a}x+${objective.b}y$ con $x+y\\ge 5$ y $2x+y\\ge 6$. ¿Cuál es el coste mínimo?`, `الكلفة $F=${objective.a}x+${objective.b}y$ مع $x+y\\ge 5$ و$2x+y\\ge 6$. ما أقل كلفة؟`, `The cost is $F=${objective.a}x+${objective.b}y$ with $x+y\\ge 5$ and $2x+y\\ge 6$. What is the least cost?`),
                lines: [line(LABELS.step, points.map(pointLatex).join(',\\ ')), line(LABELS.step, table(points, objective.a, objective.b)), line(LABELS.result, `F=${max}`)],
                wrong: 2, error, fix: `\\min F=${min}`, right: min, reached: max
            }
        }
        case 'origin-cheapest': {
            const a = randomInt(random, 2, 5)
            const b = randomInt(random, 2, 5)
            const constraints = [L(1, 1, 4, '≥'), L(1, 3, 6, '≥')]
            const found = optimum(withSigns(constraints), { a, b }, 'min')
            if (found.kind !== 'unique') return null
            return {
                problem: say(`Minimizatu $F=${a}x+${b}y$, $x+y\\ge 4$ eta $x+3y\\ge 6$ izanik.`, `Minimiza $F=${a}x+${b}y$ con $x+y\\ge 4$ y $x+3y\\ge 6$.`, `صغّر $F=${a}x+${b}y$ مع $x+y\\ge 4$ و$x+3y\\ge 6$.`, `Minimise $F=${a}x+${b}y$ with $x+y\\ge 4$ and $x+3y\\ge 6$.`),
                lines: [line(LABELS.step, `(0,0),\\ ${vertices(withSigns(constraints)).map(pointLatex).join(',\\ ')}`), line(LABELS.step, 'F(0,0)=0'), line(LABELS.result, '\\min F=0')],
                wrong: 0, error, fix: `0+0<4\\ \\to\\ (0,0)\\notin R,\\quad \\min F=${found.value}`, right: found.value!, reached: 0
            }
        }
        case 'tie-ignored': {
            const c = randomInt(random, 5, 8)
            const cap = randomInt(random, 2, c - 2)
            const constraints = [L(1, 1, c), L(1, 0, cap)]
            const found = optimum(withSigns(constraints), { a: 1, b: 1 }, 'max')
            if (found.kind !== 'multiple') return null
            return {
                problem: say(`Maximizatu $F=x+y$, $x+y\\le ${c}$ eta $x\\le ${cap}$ izanik ($x,y\\ge 0$).`, `Maximiza $F=x+y$ con $x+y\\le ${c}$ y $x\\le ${cap}$ ($x,y\\ge 0$).`, `عظّم $F=x+y$ مع $x+y\\le ${c}$ و$x\\le ${cap}$ ($x,y\\ge 0$).`, `Maximise $F=x+y$ with $x+y\\le ${c}$ and $x\\le ${cap}$ ($x,y\\ge 0$).`),
                lines: [line(LABELS.step, table(vertices(withSigns(constraints)), 1, 1)), line(LABELS.step, `\\max F=${c}`), line(LABELS.result, pointLatex(found.at[0]))],
                wrong: 2, error, fix: `${found.at.map(pointLatex).join('\\ ')}\\ \\to\\ x+y=${c},\\ 0\\le x\\le ${cap}`, right: 2, reached: 1
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createProgrammingDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, programmingDetectiveLevels[levelIndex], PROGRAMMING_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
