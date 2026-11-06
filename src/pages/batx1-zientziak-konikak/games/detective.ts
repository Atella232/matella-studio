import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { ELLIPSE_TRIPLES, HYPERBOLA_TRIPLES, ellipseLatex, hyperbolaLatex, overOf, point, polynomial, ratio, shiftOf, squareOf } from './conicLatex.ts'

/* ==========================================================================
   J4 · Koniken detektibea (Detective de cónicas): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1,
   loci and the circle: (x − h)² = x² − h², the centre with its signs
   unchanged, r² taken as the radius and the ± forgotten. Level 2, the
   ellipse and the hyperbola: c² = a² + b² in an ellipse, c² = a² − b² in
   a hyperbola, the asymptote slope upside down and the foci on the wrong
   axis. Level 3, the parabola and the conics: the focus at p, the
   directrix on the side of the focus, the vertex with its signs unchanged
   and an ellipse taken as a circle. `right` and `reached` only tell the
   cases apart.
   ========================================================================== */

export type BachConicsDetectiveError =
    | 'square-expansion'
    | 'centre-sign'
    | 'radius-square'
    | 'missing-plusminus'
    | 'ellipse-c-sum'
    | 'hyperbola-c-difference'
    | 'asymptote-inverted'
    | 'major-axis'
    | 'focus-at-p'
    | 'directrix-side'
    | 'vertex-sign'
    | 'conic-type'

export const bachConicsDetectiveLevels: BachConicsDetectiveError[][] = [
    ['square-expansion', 'centre-sign', 'radius-square', 'missing-plusminus'],
    ['ellipse-c-sum', 'hyperbola-c-difference', 'asymptote-inverted', 'major-axis'],
    ['focus-at-p', 'directrix-side', 'vertex-sign', 'conic-type']
]

export const BACH_CONICS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bachConicsDetectiveNames: Record<BachConicsDetectiveError, LocalizedText> = {
    'square-expansion': say('Karratua garatzean biderkadura bikoitza ahaztu du', 'Al desarrollar el cuadrado olvidó el doble producto', 'نسي ضعف الجداء عند نشر المربع', 'Forgot the middle term when expanding the square'),
    'centre-sign': say('Zentroa zeinua aldatu gabe idatzi du', 'Escribió el centro sin cambiar el signo', 'كتب المركز دون تغيير الإشارة', 'Wrote the centre without changing the sign'),
    'radius-square': say('r² erradiotzat hartu du', 'Tomó r² como radio', 'أخذ r² نصف قطر', 'Took r² as the radius'),
    'missing-plusminus': say('± zeinua ahaztu du: bi zuzen daude', 'Olvidó el ±: hay dos rectas', 'نسي ±: هناك مستقيمان', 'Forgot the ±: there are two lines'),
    'ellipse-c-sum': say('Elipsean c² = a² + b² erabili du', 'Usó c² = a² + b² en la elipse', 'استعمل c² = a² + b² في القطع الناقص', 'Used c² = a² + b² in an ellipse'),
    'hyperbola-c-difference': say('Hiperbolan c² = a² − b² erabili du', 'Usó c² = a² − b² en la hipérbola', 'استعمل c² = a² − b² في القطع الزائد', 'Used c² = a² − b² in a hyperbola'),
    'asymptote-inverted': say('Asintoten malda alderantziz hartu du: a/b', 'Tomó la pendiente de las asíntotas al revés: a/b', 'أخذ ميل المقاربين مقلوبًا: a/b', 'Took the slope of the asymptotes upside down: a/b'),
    'major-axis': say('Fokuak X ardatzean jarri ditu, ardatz nagusia bertikala izanik', 'Puso los focos en el eje X con el eje mayor vertical', 'وضع البؤرتين على المحور X والمحور الأكبر رأسي', 'Put the foci on the X axis when the major axis is vertical'),
    'focus-at-p': say('Fokua p distantziara jarri du, ez p/2 distantziara', 'Puso el foco en p, no en p/2', 'وضع البؤرة عند p لا عند p/2', 'Put the focus at p, not at p/2'),
    'directrix-side': say('Zuzentzailea fokuaren alde berean jarri du', 'Puso la directriz del mismo lado que el foco', 'وضع الدليل في جهة البؤرة نفسها', 'Put the directrix on the same side as the focus'),
    'vertex-sign': say('Erpina zeinua aldatu gabe idatzi du', 'Escribió el vértice sin cambiar el signo', 'كتب الرأس دون تغيير الإشارة', 'Wrote the vertex without changing the sign'),
    'conic-type': say('Elipse bat zirkunferentziatzat hartu du', 'Tomó una elipse por una circunferencia', 'ظنّ القطع الناقص دائرة', 'Took an ellipse for a circle')
}

export const bachConicsDetectiveTips: Record<BachConicsDetectiveError, LocalizedText> = {
    'square-expansion': say('$(x-h)^2=x^2-2hx+h^2$', '$(x-h)^2=x^2-2hx+h^2$', '$(x-h)^2=x^2-2hx+h^2$', '$(x-h)^2=x^2-2hx+h^2$'),
    'centre-sign': say('$(x-a)^2+(y-b)^2=r^2$ ekuazioan zentroa $(a,b)$ da: $x+3$ gaiak $-3$ ematen du.', 'En $(x-a)^2+(y-b)^2=r^2$ el centro es $(a,b)$: $x+3$ da $-3$.', 'في $(x-a)^2+(y-b)^2=r^2$ المركز $(a,b)$: ‏$x+3$ تعطي $-3$.', 'In $(x-a)^2+(y-b)^2=r^2$ the centre is $(a,b)$: $x+3$ gives $-3$.'),
    'radius-square': say('Eskuineko zenbakia $r^2$ da: erradioa haren erroa da.', 'El número de la derecha es $r^2$: el radio es su raíz.', 'العدد في الطرف الأيمن هو $r^2$: ونصف القطر جذره.', 'The number on the right is $r^2$: the radius is its root.'),
    'missing-plusminus': say('$|u|=k$ adierazpenak bi aukera ditu: $u=k$ eta $u=-k$.', '$|u|=k$ tiene dos casos: $u=k$ y $u=-k$.', 'للعبارة $|u|=k$ حالتان: $u=k$ و$u=-k$.', '$|u|=k$ has two cases: $u=k$ and $u=-k$.'),
    'ellipse-c-sum': say('Elipsean $a$ da handiena: $c^2=a^2-b^2$.', 'En la elipse $a$ es el mayor: $c^2=a^2-b^2$.', 'في القطع الناقص $a$ هو الأكبر: $c^2=a^2-b^2$.', 'In an ellipse $a$ is the greatest: $c^2=a^2-b^2$.'),
    'hyperbola-c-difference': say('Hiperbolan $c$ da handiena: $c^2=a^2+b^2$.', 'En la hipérbola $c$ es el mayor: $c^2=a^2+b^2$.', 'في القطع الزائد $c$ هو الأكبر: $c^2=a^2+b^2$.', 'In a hyperbola $c$ is the greatest: $c^2=a^2+b^2$.'),
    'asymptote-inverted': say('Asintotak: $y=\\pm\\frac{b}{a}x$.', 'Asíntotas: $y=\\pm\\frac{b}{a}x$.', 'المقاربان: $y=\\pm\\frac{b}{a}x$.', 'Asymptotes: $y=\\pm\\frac{b}{a}x$.'),
    'major-axis': say('Fokuak ardatz nagusian daude: izendatzaile handiena dagoen aldagaiarenean.', 'Los focos están en el eje mayor: el de la variable con el denominador mayor.', 'البؤرتان على المحور الأكبر: محور المتغير ذي المقام الأكبر.', 'The foci are on the major axis: that of the variable with the greater denominator.'),
    'focus-at-p': say('$y^2=2px$: fokua $\\left(\\frac{p}{2},0\\right)$ da.', '$y^2=2px$: el foco es $\\left(\\frac{p}{2},0\\right)$.', '$y^2=2px$: البؤرة $\\left(\\frac{p}{2},0\\right)$.', '$y^2=2px$: the focus is $\\left(\\frac{p}{2},0\\right)$.'),
    'directrix-side': say('Erpina fokuaren eta zuzentzailearen erdian dago: $x=-\\frac{p}{2}$.', 'El vértice está entre el foco y la directriz: $x=-\\frac{p}{2}$.', 'الرأس في المنتصف بين البؤرة والدليل: $x=-\\frac{p}{2}$.', 'The vertex is halfway between the focus and the directrix: $x=-\\frac{p}{2}$.'),
    'vertex-sign': say('$(y-k)^2=2p(x-h)$ parabolan erpina $(h,k)$ da.', 'En $(y-k)^2=2p(x-h)$ el vértice es $(h,k)$.', 'في $(y-k)^2=2p(x-h)$ الرأس $(h,k)$.', 'In $(y-k)^2=2p(x-h)$ the vertex is $(h,k)$.'),
    'conic-type': say('Zirkunferentzian $x^2$ eta $y^2$ gaien koefizienteak berdinak dira.', 'En una circunferencia los coeficientes de $x^2$ e $y^2$ son iguales.', 'في الدائرة يتساوى معاملا $x^2$ و$y^2$.', 'In a circle the coefficients of $x^2$ and $y^2$ are equal.')
}

type Built = Omit<WorkedCase<BachConicsDetectiveError>, 'options'>

/** A fix in rows, so that it fits a phone */
const rows = (...lines: string[]) => `\\begin{gathered}${lines.join('\\\\ ')}\\end{gathered}`

/** «… of r: Ax + By + C = 0» problems */
const named = (name: string, latex: string) => `$${name}$: $${latex}$`
const NORMALS: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, 5, 13]]

function build(random: Random, error: BachConicsDetectiveError): Built | null {
    switch (error) {
        case 'square-expansion': {
            const h = randomInt(random, 1, 5)
            const k = randomInt(random, 1, 5)
            const r = randomInt(random, 1, 5)
            if (h === k) return null
            const equation = `${squareOf('x', h)}+${squareOf('y', k)}=${r * r}`
            return {
                problem: say(`Idatzi $${equation}$ zirkunferentzia forma orokorrean.`, `Escribe en forma general la circunferencia $${equation}$.`, `اكتب الدائرة $${equation}$ بالصيغة العامة.`, `Write the circle $${equation}$ in general form.`),
                lines: [line(LABELS.data, equation), line(LABELS.step, `x^2-${h * h}+y^2-${k * k}=${r * r}`), line(LABELS.result, `${polynomial([[1, 'x^2'], [1, 'y^2'], [-(h * h + k * k + r * r), '']])}=0`)],
                wrong: 1, error, fix: rows(polynomial([[1, 'x^2'], [-2 * h, 'x'], [h * h, '']]), `+${polynomial([[1, 'y^2'], [-2 * k, 'y'], [k * k, '']])}=${r * r}`), right: -2 * h, reached: 0
            }
        }
        case 'centre-sign': {
            const h = randomInt(random, 1, 6)
            const k = -randomInt(random, 1, 6)
            const r = randomInt(random, 2, 6)
            const equation = `${squareOf('x', h)}+${squareOf('y', k)}=${r * r}`
            return {
                problem: say(`Aurkitu $${equation}$ zirkunferentziaren zentroa eta erradioa.`, `Halla el centro y el radio de $${equation}$.`, `أوجد مركز $${equation}$ ونصف قطرها.`, `Find the centre and the radius of $${equation}$.`),
                lines: [line(LABELS.data, equation), line(LABELS.step, point('C', -h, -k)), line(LABELS.result, `r=${r}`)],
                wrong: 1, error, fix: point('C', h, k), right: h, reached: -h
            }
        }
        case 'radius-square': {
            const h = randomInt(random, -4, 4)
            const k = randomInt(random, -4, 4)
            const r = randomInt(random, 2, 6)
            const general = `${polynomial([[1, 'x^2'], [1, 'y^2'], [-2 * h, 'x'], [-2 * k, 'y'], [h * h + k * k - r * r, '']])}=0`
            if (h === 0 && k === 0) return null
            return {
                problem: say(`Aurkitu $${general}$ zirkunferentziaren zentroa eta erradioa.`, `Halla el centro y el radio de $${general}$.`, `أوجد مركز $${general}$ ونصف قطرها.`, `Find the centre and the radius of $${general}$.`),
                lines: [line(LABELS.step, `${squareOf('x', h)}+${squareOf('y', k)}=${r * r}`), line(LABELS.step, point('C', h, k)), line(LABELS.result, `r=${r * r}`)],
                wrong: 2, error, fix: `r=\\sqrt{${r * r}}=${r}`, right: r, reached: r * r
            }
        }
        case 'missing-plusminus': {
            const [A, B, length] = pick(random, NORMALS)
            const C = randomInt(random, -9, 9)
            const d = randomInt(random, 1, 4)
            const lineLatex = polynomial([[A, 'x'], [B, 'y'], [C, '']])
            return {
                problem: say(`Aurkitu ${named('r', `${lineLatex}=0`)} zuzenetik $${d}$ distantziara dauden puntuak.`, `Halla los puntos que están a distancia $${d}$ de ${named('r', `${lineLatex}=0`)}.`, `أوجد النقاط التي تبعد $${d}$ عن ${named('r', `${lineLatex}=0`)}.`, `Find the points at distance $${d}$ from ${named('r', `${lineLatex}=0`)}.`),
                lines: [line(LABELS.step, `\\frac{|${lineLatex}|}{${length}}=${d}`), line(LABELS.step, `${lineLatex}=${d * length}`), line(LABELS.result, `${polynomial([[A, 'x'], [B, 'y'], [C - d * length, '']])}=0`)],
                wrong: 1, error, fix: rows(`${lineLatex}=\\pm ${d * length}`, `\\to\\ ${polynomial([[A, 'x'], [B, 'y'], [C - d * length, '']])}=0`, `${polynomial([[A, 'x'], [B, 'y'], [C + d * length, '']])}=0`), right: 2, reached: 1
            }
        }
        case 'ellipse-c-sum': {
            const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
            const equation = ellipseLatex(a, b, false)
            return {
                problem: say(`Aurkitu $${equation}$ elipsearen fokuak.`, `Halla los focos de la elipse $${equation}$.`, `أوجد بؤرتي القطع الناقص $${equation}$.`, `Find the foci of the ellipse $${equation}$.`),
                lines: [line(LABELS.data, `a=${a}\\quad b=${b}`), line(LABELS.step, `c^2=${a * a}+${b * b}=${a * a + b * b}`), line(LABELS.result, `F(\\pm\\sqrt{${a * a + b * b}},0)`)],
                wrong: 1, error, fix: rows(`c^2=${a * a}-${b * b}=${c * c}`, `\\to\\ F(\\pm ${c},0)`), right: c, reached: Math.sqrt(a * a + b * b)
            }
        }
        case 'hyperbola-c-difference': {
            const [a, b, c] = pick(random, HYPERBOLA_TRIPLES.filter(([x, y]) => x > y))
            const equation = hyperbolaLatex(a, b)
            return {
                problem: say(`Aurkitu $${equation}$ hiperbolaren fokuak.`, `Halla los focos de la hipérbola $${equation}$.`, `أوجد بؤرتي القطع الزائد $${equation}$.`, `Find the foci of the hyperbola $${equation}$.`),
                lines: [line(LABELS.data, `a=${a}\\quad b=${b}`), line(LABELS.step, `c^2=${a * a}-${b * b}=${a * a - b * b}`), line(LABELS.result, `F(\\pm\\sqrt{${a * a - b * b}},0)`)],
                wrong: 1, error, fix: rows(`c^2=${a * a}+${b * b}=${c * c}`, `\\to\\ F(\\pm ${c},0)`), right: c, reached: Math.sqrt(a * a - b * b)
            }
        }
        case 'asymptote-inverted': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 2, 6)
            if (a === b) return null
            const equation = hyperbolaLatex(a, b)
            return {
                problem: say(`Aurkitu $${equation}$ hiperbolaren asintotak.`, `Halla las asíntotas de la hipérbola $${equation}$.`, `أوجد مقاربي القطع الزائد $${equation}$.`, `Find the asymptotes of the hyperbola $${equation}$.`),
                lines: [line(LABELS.data, `a=${a}\\quad b=${b}`), line(LABELS.step, `m=\\frac{${a}}{${b}}`), line(LABELS.result, `y=\\pm ${ratio(a, b)}x`)],
                wrong: 1, error, fix: `m=\\frac{${b}}{${a}}\\ \\to\\ y=\\pm ${ratio(b, a)}x`, right: b / a, reached: a / b
            }
        }
        case 'major-axis': {
            const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
            const equation = ellipseLatex(a, b, true)
            return {
                problem: say(`Aurkitu $${equation}$ elipsearen fokuak.`, `Halla los focos de la elipse $${equation}$.`, `أوجد بؤرتي القطع الناقص $${equation}$.`, `Find the foci of the ellipse $${equation}$.`),
                lines: [line(LABELS.data, `a^2=${a * a}\\quad b^2=${b * b}`), line(LABELS.step, `c=\\sqrt{${a * a}-${b * b}}=${c}`), line(LABELS.result, `F(\\pm ${c},0)`)],
                wrong: 2, error, fix: `F(0,\\pm ${c})`, right: 1, reached: 0
            }
        }
        case 'focus-at-p': {
            const n = pick(random, [4, 6, 8, 10, 12, 16, 20])
            const equation = `y^2=${n}x`
            return {
                problem: say(`Aurkitu $${equation}$ parabolaren fokua.`, `Halla el foco de la parábola $${equation}$.`, `أوجد بؤرة القطع المكافئ $${equation}$.`, `Find the focus of the parabola $${equation}$.`),
                lines: [line(LABELS.data, `2p=${n}`), line(LABELS.step, `p=${ratio(n, 2)}`), line(LABELS.result, `F\\left(${ratio(n, 2)},0\\right)`)],
                wrong: 2, error, fix: `F\\left(\\frac{p}{2},0\\right)=\\left(${ratio(n, 4)},0\\right)`, right: n / 4, reached: n / 2
            }
        }
        case 'directrix-side': {
            const n = pick(random, [2, 4, 6, 8, 10, 12, 16, 20])
            const equation = `y^2=${n}x`
            return {
                problem: say(`Aurkitu $${equation}$ parabolaren zuzentzailea.`, `Halla la directriz de la parábola $${equation}$.`, `أوجد دليل القطع المكافئ $${equation}$.`, `Find the directrix of the parabola $${equation}$.`),
                lines: [line(LABELS.data, `2p=${n}`), line(LABELS.step, `\\frac{p}{2}=${ratio(n, 4)}`), line(LABELS.result, `x=${ratio(n, 4)}`)],
                wrong: 2, error, fix: `x=-${ratio(n, 4)}`, right: -n / 4, reached: n / 4
            }
        }
        case 'vertex-sign': {
            const h = randomInt(random, -5, 5)
            const k = randomInt(random, -5, 5)
            const n = pick(random, [2, 4, 6, 8])
            if (h === 0 || k === 0 || Math.abs(h) === Math.abs(k)) return null
            const equation = `${squareOf('y', k)}=${n}${shiftOf('x', h)}`
            return {
                problem: say(`Aurkitu $${equation}$ parabolaren erpina eta fokua.`, `Halla el vértice y el foco de la parábola $${equation}$.`, `أوجد رأس القطع المكافئ $${equation}$ وبؤرته.`, `Find the vertex and the focus of the parabola $${equation}$.`),
                lines: [line(LABELS.data, `2p=${n}\\quad\\frac{p}{2}=${ratio(n, 4)}`), line(LABELS.step, point('V', -h, -k)), line(LABELS.result, point('F', ratio(-4 * h + n, 4), -k))],
                wrong: 1, error, fix: `${point('V', h, k)}\\qquad ${point('F', ratio(4 * h + n, 4), k)}`, right: h, reached: -h
            }
        }
        case 'conic-type': {
            const [m, b2] = pick(random, [[2, 4], [3, 4], [5, 4], [3, 9], [6, 9], [2, 9]] as Array<[number, number]>)
            const total = b2 * m * m
            const equation = `x^2+${b2}y^2=${total}`
            return {
                problem: say(`Zein konika da $${equation}$?`, `¿Qué cónica es $${equation}$?`, `أي قطع مخروطي هو $${equation}$؟`, `Which conic is $${equation}$?`),
                lines: [line(LABELS.data, equation), line(LABELS.step, `x^2+y^2=${total}`), line(LABELS.result, `r=\\sqrt{${total}}`)],
                wrong: 1, error, fix: `${overOf('x^2', total)}+${overOf('y^2', m * m)}=1`, right: m * m, reached: total
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachConicsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachConicsDetectiveLevels[levelIndex], BACH_CONICS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
