import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { add, cross, det3, dot, isZero, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { exactRank, generalLatex, levelLatex } from '../lab/common.ts'
import { continuousLatex } from '../lab/parameterT.ts'

/* ==========================================================================
   J4 · Zuzen eta planoen detektibea (Detective de rectas y planos): a
   worked solution of three lines with one wrong line, the mistakes of
   this unit. Level 1 (equations): point and direction swapped, the sign
   of the point read from the continuous equation, the D taken into the
   normal, a normal taken as the direction of two implicit equations.
   Level 2 (positions): proportional directions taken as the same line,
   not parallel taken as meeting, the same parameter for two lines,
   u · n = 0 taken as parallel. Level 3: the point A forgotten in the
   meeting point, proportional normals taken as the same plane, rg M
   alone, the d of the other plane kept. `right` and `reached` only tell
   the cases apart.
   ========================================================================== */

export type PlanesDetectiveError =
    | 'point-direction'
    | 'continuous-sign'
    | 'normal-with-d'
    | 'implicit-direction'
    | 'proportional-same'
    | 'not-parallel-meet'
    | 'same-parameter'
    | 'contained-parallel'
    | 'forgot-point'
    | 'd-not-compared'
    | 'rank-m-only'
    | 'parallel-plane-d'

export const planesDetectiveLevels: PlanesDetectiveError[][] = [
    ['point-direction', 'continuous-sign', 'normal-with-d', 'implicit-direction'],
    ['proportional-same', 'not-parallel-meet', 'same-parameter', 'contained-parallel'],
    ['forgot-point', 'd-not-compared', 'rank-m-only', 'parallel-plane-d']
]

export const PLANES_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const parallelTo = (a: Vec3, b: Vec3) => isZero(cross(a, b))
const vectorLatex = (point: Vec3, direction: Vec3, parameter = 't') => `${vec(point)}+${parameter}\\,${vec(direction)}`

export const planesDetectiveNames: Record<PlanesDetectiveError, LocalizedText> = {
    'point-direction': say('Puntua eta norabidea trukatu ditu', 'Cambió el punto por el director', 'بدّل النقطة بمتجه التوجيه', 'Swapped the point and the direction'),
    'continuous-sign': say('Puntuaren zeinuak gaizki irakurri ditu', 'Leyó mal los signos del punto', 'أخطأ في قراءة إشارات النقطة', 'Read the signs of the point wrongly'),
    'normal-with-d': say('D zenbakia normalean sartu du', 'Metió la D en el normal', 'أدخل D في الناظم', 'Put D into the normal'),
    'implicit-direction': say('Normal bat hartu du norabidetzat', 'Tomó un normal como director', 'أخذ ناظمًا متجهَ توجيه', 'Took a normal as the direction'),
    'proportional-same': say('Puntua egiaztatu gabe esan du bat datozela', 'Dijo que coinciden sin comprobar un punto', 'قال إنهما منطبقان دون التحقق من نقطة', 'Said they are the same without checking a point'),
    'not-parallel-meet': say('Biderkadura mistoa kalkulatu gabe esan du ebakitzen direla', 'Dijo que se cortan sin el producto mixto', 'قال إنهما متقاطعان دون الجداء المختلط', 'Said they meet without the triple product'),
    'same-parameter': say('Bi zuzenetan parametro bera erabili du', 'Usó el mismo parámetro en las dos rectas', 'استعمل الوسيط نفسه للمستقيمين', 'Used the same parameter for both lines'),
    'contained-parallel': say('$A$ planoan dagoen egiaztatu gabe esan du paraleloa dela', 'Dijo paralela sin mirar si $A$ está en el plano', 'قال موازٍ دون النظر هل $A$ في المستوى', 'Said parallel without checking whether $A$ is on the plane'),
    'forgot-point': say('$A$ puntua batzea ahaztu du', 'Olvidó sumar el punto $A$', 'نسي إضافة النقطة $A$', 'Forgot to add the point $A$'),
    'd-not-compared': say('Gai askeak konparatu gabe esan du bat datozela', 'Dijo que coinciden sin comparar los términos independientes', 'قال إنهما منطبقان دون مقارنة الحدود الثابتة', 'Said they are the same without comparing the constant terms'),
    'rank-m-only': say('$\\operatorname{rg}M$ bakarrik begiratu du', 'Solo miró $\\operatorname{rg}M$', 'نظر إلى $\\operatorname{rg}M$ فقط', 'Only looked at $\\operatorname{rg}M$'),
    'parallel-plane-d': say('Beste planoaren $d$ mantendu du', 'Dejó la $d$ del otro plano', 'أبقى $d$ المستوى الآخر', 'Kept the $d$ of the other plane')
}

export const planesDetectiveTips: Record<PlanesDetectiveError, LocalizedText> = {
    'point-direction': say('$(x,y,{z})=A+t\\,\\vec{u}$: puntua gai askean, norabidea $t$ parametroaren ondoan.', '$(x,y,{z})=A+t\\,\\vec{u}$: el punto suelto, el director junto a $t$.', '$(x,y,{z})=A+t\\,\\vec{u}$: النقطة وحدها، والاتجاه بجانب $t$.', '$(x,y,{z})=A+t\\,\\vec{u}$: the point alone, the direction next to $t$.'),
    'continuous-sign': say('$\\frac{x-a_1}{u_1}$: zenbakitzailean $x+2$ badago, $a_1=-2$.', '$\\frac{x-a_1}{u_1}$: si en el numerador pone $x+2$, $a_1=-2$.', '$\\frac{x-a_1}{u_1}$: إذا كان في البسط $x+2$ فإن $a_1=-2$.', '$\\frac{x-a_1}{u_1}$: if the numerator says $x+2$, then $a_1=-2$.'),
    'normal-with-d': say('Normala $x$, $y$ eta ${z}$ aldagaien koefizienteak dira; ${z}$ falta bada, 0.', 'El normal son los coeficientes de $x$, $y$ y ${z}$; si falta la ${z}$, un 0.', 'الناظم معاملات $x$ و$y$ و${z}$؛ وإن غاب ${z}$ فالمعامل 0.', 'The normal is the coefficients of $x$, $y$ and ${z}$; if ${z}$ is missing, a 0.'),
    'implicit-direction': say('Norabidea bi normalekiko perpendikularra da: $\\vec{n}_1\\times\\vec{n}_2$.', 'El director es perpendicular a los dos normales: $\\vec{n}_1\\times\\vec{n}_2$.', 'الاتجاه عمودي على الناظمين: $\\vec{n}_1\\times\\vec{n}_2$.', 'The direction is perpendicular to both normals: $\\vec{n}_1\\times\\vec{n}_2$.'),
    'proportional-same': say('Norabide proportzionalak: paraleloak edo bat datozenak. Egiaztatu $B$ puntua $r$ zuzenean dagoen.', 'Directores proporcionales: paralelas o coincidentes. Comprueba si $B$ está en $r$.', 'اتجاهان متناسبان: متوازيان أو منطبقان. تحقق هل $B$ على $r$.', 'Proportional directions: parallel or the same. Check whether $B$ is on $r$.'),
    'not-parallel-meet': say('Espazioan, paraleloak ez diren bi zuzen gurutza daitezke: $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ bada bakarrik ebakitzen dira.', 'En el espacio, dos rectas no paralelas pueden cruzarse: se cortan solo si $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'في الفضاء قد يتخالف مستقيمان غير متوازيين: يتقاطعان فقط إذا $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'In space, two lines that are not parallel can be skew: they meet only if $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.'),
    'same-parameter': say('Zuzen bakoitzak bere parametroa: $A+t\\,\\vec{u}=B+\\lambda\\,\\vec{v}$.', 'Cada recta con su parámetro: $A+t\\,\\vec{u}=B+\\lambda\\,\\vec{v}$.', 'لكل مستقيم وسيطه: $A+t\\,\\vec{u}=B+\\lambda\\,\\vec{v}$.', 'Each line with its own parameter: $A+t\\,\\vec{u}=B+\\lambda\\,\\vec{v}$.'),
    'contained-parallel': say('$\\vec{u}\\cdot\\vec{n}=0$ denean, begiratu $A$ planoan dagoen: hala bada, zuzena planoan dago.', 'Con $\\vec{u}\\cdot\\vec{n}=0$, mira si $A$ está en el plano: si lo está, la recta está contenida.', 'عندما $\\vec{u}\\cdot\\vec{n}=0$ انظر هل $A$ في المستوى: إن كانت فالمستقيم محتوى.', 'With $\\vec{u}\\cdot\\vec{n}=0$, see whether $A$ is on the plane: if it is, the line lies in it.'),
    'forgot-point': say('Puntua $P=A+t\\,\\vec{u}$ da, ez $t\\,\\vec{u}$.', 'El punto es $P=A+t\\,\\vec{u}$, no $t\\,\\vec{u}$.', 'النقطة هي $P=A+t\\,\\vec{u}$ لا $t\\,\\vec{u}$.', 'The point is $P=A+t\\,\\vec{u}$, not $t\\,\\vec{u}$.'),
    'd-not-compared': say('Normal proportzionalak: konparatu gai askeak proportzio berean dauden.', 'Normales proporcionales: compara si los términos independientes siguen la misma proporción.', 'ناظمان متناسبان: قارن هل الحدود الثابتة على التناسب نفسه.', 'Proportional normals: check whether the constant terms follow the same proportion.'),
    'rank-m-only': say('Konparatu bi heinak: $\\operatorname{rg}M<\\operatorname{rg}M^*$ bada, ez dago puntu komunik.', 'Compara los dos rangos: si $\\operatorname{rg}M<\\operatorname{rg}M^*$, no hay punto común.', 'قارن الرتبتين: إذا $\\operatorname{rg}M<\\operatorname{rg}M^*$ فلا نقطة مشتركة.', 'Compare the two ranks: if $\\operatorname{rg}M<\\operatorname{rg}M^*$, there is no common point.'),
    'parallel-plane-d': say('Normal bera, baina $d=\\vec{n}\\cdot P$ berriro kalkulatu.', 'El mismo normal, pero $d=\\vec{n}\\cdot P$ hay que calcularla otra vez.', 'الناظم نفسه، لكن يجب حساب $d=\\vec{n}\\cdot P$ من جديد.', 'The same normal, but $d=\\vec{n}\\cdot P$ has to be worked out again.')
}

type Built = Omit<WorkedCase<PlanesDetectiveError>, 'options'>

function build(random: Random, error: PlanesDetectiveError): Built | null {
    switch (error) {
        case 'point-direction': {
            const a = small(random, 3)
            const u = small(random, 3)
            const t = pick(random, [2, -1, 3])
            if (isZero(u) || a[0] === u[0]) return null
            const right = add(a, scale(t, u))
            const reached = add(u, scale(t, a))
            return {
                problem: say(`$A${vec(a)}$ puntutik $\\vec{u}=${vec(u)}$ norabidearekin pasatzen den zuzena: aurkitu $t=${t}$ puntua.`, `Recta por $A${vec(a)}$ con dirección $\\vec{u}=${vec(u)}$: halla el punto de $t=${t}$.`, `المستقيم المار بـ $A${vec(a)}$ باتجاه $\\vec{u}=${vec(u)}$: أوجد النقطة عند $t=${t}$.`, `Line through $A${vec(a)}$ with direction $\\vec{u}=${vec(u)}$: find the point for $t=${t}$.`),
                lines: [line(LABELS.step, `(x,y,{z})=${vectorLatex(u, a)}`), line(LABELS.step, `${vec(u)}+${wrap(t)}\\,${vec(a)}`), line(LABELS.result, vec(reached))],
                wrong: 0, error, fix: `(x,y,{z})=${vectorLatex(a, u)}\\ \\to\\ ${vec(right)}`, right: right[0], reached: reached[0]
            }
        }
        case 'continuous-sign': {
            const a = small(random, 3)
            const u = small(random, 3)
            if (a[0] === 0 || u.some((value) => value === 0) || a.filter((value) => value !== 0).length < 2) return null
            const flipped = scale(-1, a)
            return {
                problem: say(`$r$: $${continuousLatex(a, u)}$. Aurkitu $r$ zuzenaren puntu bat eta $t=1$ puntua.`, `$r$: $${continuousLatex(a, u)}$. Halla un punto de $r$ y el punto de $t=1$.`, `$r$: ‏$${continuousLatex(a, u)}$. أوجد نقطة من $r$ والنقطة عند $t=1$.`, `$r$: $${continuousLatex(a, u)}$. Find a point of $r$ and the point for $t=1$.`),
                lines: [line(LABELS.step, `A=${vec(flipped)}`), line(LABELS.step, `\\vec{u}=${vec(u)}`), line(LABELS.result, `A+\\vec{u}=${vec(add(flipped, u))}`)],
                wrong: 0, error, fix: `A=${vec(a)}\\ \\to\\ A+\\vec{u}=${vec(add(a, u))}`, right: a[0] + u[0], reached: -a[0] + u[0]
            }
        }
        case 'normal-with-d': {
            const n: Vec3 = [randomInt(random, -4, 4), randomInt(random, -4, 4), 0]
            const D = pick(random, [-5, -3, -2, 2, 3, 4, 6])
            if (n[0] === 0 || n[1] === 0) return null
            const wrongNormal: Vec3 = [n[0], n[1], D]
            return {
                problem: say(`Aurkitu $${generalLatex(n, D)}$ planoaren normala eta jatorritik pasatzen den plano paraleloa.`, `Halla el normal de $${generalLatex(n, D)}$ y el plano paralelo por el origen.`, `أوجد ناظم $${generalLatex(n, D)}$ والمستوى الموازي المار بالأصل.`, `Find the normal of $${generalLatex(n, D)}$ and the parallel plane through the origin.`),
                lines: [line(LABELS.step, `\\vec{n}=${vec(wrongNormal)}`), line(LABELS.step, `d=\\vec{n}\\cdot(0,0,0)=0`), line(LABELS.result, generalLatex(wrongNormal, 0))],
                wrong: 0, error, fix: `\\vec{n}=${vec(n)}\\ \\to\\ ${generalLatex(n, 0)}`, right: 0, reached: D
            }
        }
        case 'implicit-direction': {
            const n1 = small(random, 2)
            const n2 = small(random, 2)
            const u = cross(n1, n2)
            if (isZero(u) || n1.filter((value) => value !== 0).length < 2) return null
            const index = [0, 1, 2].find((i) => u[i] !== n1[i])
            if (index === undefined) return null
            const d1 = randomInt(random, -3, 3)
            const d2 = randomInt(random, -3, 3)
            const system = `\\begin{cases}${levelLatex(n1, d1)}\\\\${levelLatex(n2, d2)}\\end{cases}`
            return {
                problem: say(`Aurkitu $r$ zuzenaren norabide bat: $${system}$`, `Halla un director de $r$: $${system}$`, `أوجد متجه توجيه لـ $r$: ‏$${system}$`, `Find a direction of $r$: $${system}$`),
                lines: [line(LABELS.data, `\\vec{n}_1=${vec(n1)},\\ \\vec{n}_2=${vec(n2)}`), line(LABELS.step, `\\vec{u}=\\vec{n}_1`), line(LABELS.result, `\\vec{u}=${vec(n1)}`)],
                wrong: 1, error, fix: `\\vec{u}=\\vec{n}_1\\times\\vec{n}_2=${vec(u)}`, right: u[index], reached: n1[index]
            }
        }
        case 'proportional-same': {
            const a = small(random, 2)
            const u = small(random, 2)
            const k = pick(random, [-1, 2, -2])
            const b = add(a, small(random, 1))
            if (isZero(u) || parallelTo(sub(b, a), u)) return null
            const v = scale(k, u)
            const away = cross(sub(b, a), u)
            const index = [0, 1, 2].find((i) => away[i] !== 0)!
            return {
                problem: say(`$r$: $${vectorLatex(a, u)}$ eta $s$: $${vectorLatex(b, v, '\\lambda')}$. Zer posizio dute?`, `$r$: $${vectorLatex(a, u)}$ y $s$: $${vectorLatex(b, v, '\\lambda')}$. ¿Qué posición tienen?`, `$r$: ‏$${vectorLatex(a, u)}$ و$s$: ‏$${vectorLatex(b, v, '\\lambda')}$. ما وضعهما؟`, `$r$: $${vectorLatex(a, u)}$ and $s$: $${vectorLatex(b, v, '\\lambda')}$. What is their position?`),
                lines: [line(LABELS.step, `${vec(v)}=${wrap(k)}\\,${vec(u)}`), line(LABELS.step, `\\vec{u}\\parallel\\vec{v}`), line(LABELS.result, 'r=s')],
                wrong: 2, error, fix: `\\overrightarrow{AB}=${vec(sub(b, a))}\\nparallel\\vec{u}\\ \\to\\ r\\parallel s`, right: away[index], reached: 0
            }
        }
        case 'not-parallel-meet': {
            const a = small(random, 2)
            const u = small(random, 2)
            const b = small(random, 2)
            const v = small(random, 2)
            const c = cross(u, v)
            const mixed = det3(sub(b, a), u, v) + 0
            if (isZero(c) || mixed === 0) return null
            return {
                problem: say(`$r$: $${vectorLatex(a, u)}$ eta $s$: $${vectorLatex(b, v, '\\lambda')}$. Zer posizio dute?`, `$r$: $${vectorLatex(a, u)}$ y $s$: $${vectorLatex(b, v, '\\lambda')}$. ¿Qué posición tienen?`, `$r$: ‏$${vectorLatex(a, u)}$ و$s$: ‏$${vectorLatex(b, v, '\\lambda')}$. ما وضعهما؟`, `$r$: $${vectorLatex(a, u)}$ and $s$: $${vectorLatex(b, v, '\\lambda')}$. What is their position?`),
                lines: [line(LABELS.step, `\\vec{u}\\times\\vec{v}=${vec(c)}`), line(LABELS.step, `\\vec{u}\\nparallel\\vec{v}`), line(LABELS.result, 'r\\cap s=\\{P\\}')],
                wrong: 2, error, fix: `[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${mixed}\\neq 0`, right: mixed, reached: 0
            }
        }
        case 'same-parameter': {
            const a = small(random, 2)
            const u = small(random, 2)
            const v = small(random, 2)
            const t = pick(random, [1, -1, 2])
            const lambda = pick(random, [1, -1, 2])
            if (t === lambda || isZero(u) || isZero(v) || parallelTo(u, v)) return null
            const p = add(a, scale(t, u))
            const b = sub(p, scale(lambda, v))
            if (b.some((value) => Math.abs(value) > 4)) return null
            return {
                problem: say(`Non ebakitzen dira $r$: $${vectorLatex(a, u)}$ eta $s$: $${vectorLatex(b, v, '\\lambda')}$?`, `¿Dónde se cortan $r$: $${vectorLatex(a, u)}$ y $s$: $${vectorLatex(b, v, '\\lambda')}$?`, `أين يتقاطع $r$: ‏$${vectorLatex(a, u)}$ و$s$: ‏$${vectorLatex(b, v, '\\lambda')}$؟`, `Where do $r$: $${vectorLatex(a, u)}$ and $s$: $${vectorLatex(b, v, '\\lambda')}$ meet?`),
                lines: [line(LABELS.step, 'A+t\\,\\vec{u}=B+t\\,\\vec{v}'), line(LABELS.step, `t\\,${vec(sub(u, v))}=${vec(sub(b, a))}`), line(LABELS.result, 'r\\cap s=\\varnothing')],
                wrong: 0, error, fix: `A+t\\,\\vec{u}=B+\\lambda\\,\\vec{v}\\ \\to\\ t=${t},\\ \\lambda=${lambda}\\ \\to\\ ${vec(p)}`, right: 1, reached: 0
            }
        }
        case 'contained-parallel': {
            const n = small(random, 2)
            const u = small(random, 2)
            const a = small(random, 2)
            if (n.filter((value) => value !== 0).length < 2 || isZero(u) || dot(u, n) !== 0) return null
            const d = dot(n, a) + 0
            return {
                problem: say(`$r$: $${vectorLatex(a, u)}$ eta $\\pi$: $${levelLatex(n, d)}$. Zer posizio dute?`, `$r$: $${vectorLatex(a, u)}$ y $\\pi$: $${levelLatex(n, d)}$. ¿Qué posición tienen?`, `$r$: ‏$${vectorLatex(a, u)}$ و$\\pi$: ‏$${levelLatex(n, d)}$. ما وضعهما؟`, `$r$: $${vectorLatex(a, u)}$ and $\\pi$: $${levelLatex(n, d)}$. What is their position?`),
                lines: [line(LABELS.data, `\\vec{u}=${vec(u)},\\ \\vec{n}=${vec(n)}`), line(LABELS.step, `\\vec{u}\\cdot\\vec{n}=0`), line(LABELS.result, 'r\\parallel\\pi')],
                wrong: 2, error, fix: `\\vec{n}\\cdot A=${d}\\ \\to\\ r\\subset\\pi`, right: 0, reached: 1
            }
        }
        case 'forgot-point': {
            const a = small(random, 2)
            const u = small(random, 2)
            const n = small(random, 2)
            const t = pick(random, [1, 2, -1, -2])
            const along = dot(n, u)
            if (a[0] === 0 || along === 0 || n.filter((value) => value !== 0).length < 2) return null
            const d = dot(n, a) + t * along
            const p = add(a, scale(t, u))
            return {
                problem: say(`Non zeharkatzen du $r$: $${vectorLatex(a, u)}$ zuzenak $\\pi$: $${levelLatex(n, d)}$ planoa?`, `¿Dónde corta $r$: $${vectorLatex(a, u)}$ al plano $\\pi$: $${levelLatex(n, d)}$?`, `أين يقطع $r$: ‏$${vectorLatex(a, u)}$ المستوى $\\pi$: ‏$${levelLatex(n, d)}$؟`, `Where does $r$: $${vectorLatex(a, u)}$ meet $\\pi$: $${levelLatex(n, d)}$?`),
                lines: [line(LABELS.step, `${dot(n, a) + 0}${along < 0 ? '' : '+'}${along}t=${d}`), line(LABELS.step, `t=${t}`), line(LABELS.result, `P=${wrap(t)}\\,${vec(u)}=${vec(scale(t, u))}`)],
                wrong: 2, error, fix: `P=A+${wrap(t)}\\,\\vec{u}=${vec(p)}`, right: p[0], reached: t * u[0]
            }
        }
        case 'd-not-compared': {
            const n1 = small(random, 3)
            const k = pick(random, [2, -1, -2])
            const d1 = randomInt(random, -4, 4)
            const d2 = k * d1 + pick(random, [1, -1, 2])
            if (n1.filter((value) => value !== 0).length < 2) return null
            const n2 = scale(k, n1)
            return {
                problem: say(`$\\pi_1$: $${levelLatex(n1, d1)}$ eta $\\pi_2$: $${levelLatex(n2, d2)}$. Zer posizio dute?`, `$\\pi_1$: $${levelLatex(n1, d1)}$ y $\\pi_2$: $${levelLatex(n2, d2)}$. ¿Qué posición tienen?`, `$\\pi_1$: ‏$${levelLatex(n1, d1)}$ و$\\pi_2$: ‏$${levelLatex(n2, d2)}$. ما وضعهما؟`, `$\\pi_1$: $${levelLatex(n1, d1)}$ and $\\pi_2$: $${levelLatex(n2, d2)}$. What is their position?`),
                lines: [line(LABELS.step, `\\vec{n}_2=${wrap(k)}\\,\\vec{n}_1`), line(LABELS.step, `\\vec{n}_1\\parallel\\vec{n}_2`), line(LABELS.result, '\\pi_1=\\pi_2')],
                wrong: 2, error, fix: `${wrap(k)}\\cdot ${wrap(d1)}=${k * d1}\\neq ${d2}\\ \\to\\ \\pi_1\\parallel\\pi_2`, right: 1, reached: 0
            }
        }
        case 'rank-m-only': {
            const n1 = small(random, 2)
            const n2 = small(random, 2)
            if (parallelTo(n1, n2) || n1.filter((value) => value !== 0).length < 2) return null
            const n3 = add(n1, n2)
            const d1 = randomInt(random, -3, 3)
            const d2 = randomInt(random, -3, 3)
            const d3 = d1 + d2 + pick(random, [1, -1, 2])
            if (parallelTo(n3, n1) || parallelTo(n3, n2) || n3.some((value) => Math.abs(value) > 4)) return null
            const rows = [[...n1, d1], [...n2, d2], [...n3, d3]]
            if (exactRank(rows.map((row) => row.slice(0, 3))) !== 2 || exactRank(rows) !== 3) return null
            return {
                problem: say(`Zer posizio dute $${levelLatex(n1, d1)}$, $${levelLatex(n2, d2)}$ eta $${levelLatex(n3, d3)}$ planoek?`, `¿Qué posición tienen $${levelLatex(n1, d1)}$, $${levelLatex(n2, d2)}$ y $${levelLatex(n3, d3)}$?`, `ما وضع $${levelLatex(n1, d1)}$ و$${levelLatex(n2, d2)}$ و$${levelLatex(n3, d3)}$؟`, `What is the position of $${levelLatex(n1, d1)}$, $${levelLatex(n2, d2)}$ and $${levelLatex(n3, d3)}$?`),
                lines: [line(LABELS.step, '\\det M=0'), line(LABELS.step, '\\operatorname{rg}M=2'), line(LABELS.result, '\\pi_1\\cap\\pi_2\\cap\\pi_3=r')],
                wrong: 2, error, fix: '\\operatorname{rg}M^*=3\\neq\\operatorname{rg}M\\ \\to\\ \\varnothing', right: 3, reached: 2
            }
        }
        case 'parallel-plane-d': {
            const n = small(random, 3)
            const p = small(random, 3)
            const d0 = randomInt(random, -4, 4)
            const right = dot(n, p) + 0
            if (n.filter((value) => value !== 0).length < 2 || right === d0) return null
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntutik pasatzen den eta $${levelLatex(n, d0)}$ planoaren paraleloa den planoa.`, `Halla el plano por $P${vec(p)}$ paralelo a $${levelLatex(n, d0)}$.`, `أوجد المستوى المار بـ $P${vec(p)}$ والموازي لـ $${levelLatex(n, d0)}$.`, `Find the plane through $P${vec(p)}$ parallel to $${levelLatex(n, d0)}$.`),
                lines: [line(LABELS.step, `\\vec{n}=${vec(n)}`), line(LABELS.step, `d=${d0}`), line(LABELS.result, levelLatex(n, d0))],
                wrong: 1, error, fix: `d=\\vec{n}\\cdot P=${right}\\ \\to\\ ${levelLatex(n, right)}`, right, reached: d0
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createPlanesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, planesDetectiveLevels[levelIndex], PLANES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

/** For the tests: every mistake builds a case */
export const buildPlanesDetectiveCase = build
