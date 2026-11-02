import { pick, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Gorputzen detektibea (2. DBH): a worked calculation of three lines with
   one wrong line. Level 1: areas (one base only, the height of a pyramid
   used as its apothem, the diameter used as the radius, the base area
   times the height for a lateral area); level 2: volumes (the third of a
   pyramid or a cone forgotten, r² in the sphere, the circumference as
   the area of the base); level 3: capacity (1 cm³ taken as 1 L, 1 m³ as
   100 dm³, the height forgotten, 1 L as 100 mL). Values with π end in
   `\approx` with hundredths.
   ========================================================================== */

export type SolidsDetectiveError =
    | 'one-base'
    | 'height-as-apothem'
    | 'diameter-as-radius'
    | 'volume-as-lateral'
    | 'pyramid-third'
    | 'cone-third'
    | 'sphere-square'
    | 'circumference-as-base'
    | 'cm3-as-litre'
    | 'cubic-hundred'
    | 'height-forgotten'
    | 'litre-hundred-ml'

export const solidsDetectiveLevels: SolidsDetectiveError[][] = [
    ['one-base', 'height-as-apothem', 'diameter-as-radius', 'volume-as-lateral'],
    ['pyramid-third', 'cone-third', 'sphere-square', 'circumference-as-base'],
    ['cm3-as-litre', 'cubic-hundred', 'height-forgotten', 'litre-hundred-ml']
]

export const SOLIDS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    base: say('Oinarria', 'Base', 'القاعدة', 'Base'),
    lateral: say('Alboko azalera', 'Área lateral', 'المساحة الجانبية', 'Lateral area'),
    total: say('Azalera osoa', 'Área total', 'المساحة الكلية', 'Total area'),
    face: say('Alboko aurpegia', 'Cara lateral', 'الوجه الجانبي', 'Lateral face'),
    radius: say('Erradioa', 'Radio', 'نصف القطر', 'Radius'),
    perimeter: say('Oinarriaren perimetroa', 'Perímetro de la base', 'محيط القاعدة', 'Base perimeter'),
    formula: say('Formula', 'Fórmula', 'القانون', 'Formula'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    volume: say('Bolumena', 'Volumen', 'الحجم', 'Volume'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    litres: say('Litrotan', 'En litros', 'باللترات', 'In litres'),
    convert: say('Unitateak aldatu', 'Cambia de unidad', 'حوّل الوحدة', 'Change units'),
    count: say('Zenbat', 'Cuántos', 'كم', 'How many')
}

export const solidsDetectiveNames: Record<SolidsDetectiveError, LocalizedText> = {
    'one-base': say('Oinarri bakarra batu du', 'Sumó una sola base', 'جمع قاعدة واحدة فقط', 'Added only one base'),
    'height-as-apothem': say('Piramidearen altuera erabili du apotemaren ordez', 'Usó la altura de la pirámide en vez de la apotema', 'استعمل ارتفاع الهرم بدل الارتفاع الجانبي', 'Used the height of the pyramid instead of the slant height'),
    'diameter-as-radius': say('Diametroa erradiotzat hartu du', 'Tomó el diámetro como si fuera el radio', 'اعتبر القطر نصف قطر', 'Took the diameter as the radius'),
    'volume-as-lateral': say('Oinarriaren azalera bider altuera egin du, perimetroa bider altuera beharrean', 'Multiplicó el área de la base por la altura, no el perímetro', 'ضرب مساحة القاعدة في الارتفاع لا المحيط', 'Multiplied the base area by the height, not the perimeter'),
    'pyramid-third': say('Piramidearen herena ahaztu du', 'Olvidó el tercio de la pirámide', 'نسي ثلث الهرم', 'Forgot the third in the pyramid'),
    'cone-third': say('Konoaren herena ahaztu du', 'Olvidó el tercio del cono', 'نسي ثلث المخروط', 'Forgot the third in the cone'),
    'sphere-square': say('Esferan erradioa ber bi egin du, ber hiru beharrean', 'En la esfera elevó el radio al cuadrado, no al cubo', 'في الكرة ربّع نصف القطر بدل تكعيبه', 'Squared the radius of the sphere instead of cubing it'),
    'circumference-as-base': say('Zirkunferentziaren luzera erabili du oinarriaren azaleraren ordez', 'Usó la longitud de la circunferencia como área de la base', 'استعمل محيط الدائرة بدل مساحة القاعدة', 'Used the circumference as the area of the base'),
    'cm3-as-litre': say('1 cm³ litro bat dela pentsatu du', 'Pensó que 1 cm³ es un litro', 'ظن أن 1 سم³ لتر', 'Thought that 1 cm³ is a litre'),
    'cubic-hundred': say('1 m³ = 100 dm³ erabili du', 'Usó 1 m³ = 100 dm³', 'استعمل 1 م³ = 100 دسم³', 'Used 1 m³ = 100 dm³'),
    'height-forgotten': say('Altuerarekin biderkatzea ahaztu du', 'Olvidó multiplicar por la altura', 'نسي الضرب في الارتفاع', 'Forgot to multiply by the height'),
    'litre-hundred-ml': say('1 L = 100 mL erabili du', 'Usó 1 L = 100 mL', 'استعمل 1 ل = 100 مل', 'Used 1 L = 100 mL')
}

export const solidsDetectiveTips: Record<SolidsDetectiveError, LocalizedText> = {
    'one-base': say('Prismak eta zilindroak bi oinarri dituzte: $A_{T}=A_{L}+2A_{B}$.', 'Prismas y cilindros tienen dos bases: $A_{T}=A_{L}+2A_{B}$.', 'للمنشور والأسطوانة قاعدتان: $A_{T}=A_{L}+2A_{B}$.', 'Prisms and cylinders have two bases: $A_{T}=A_{L}+2A_{B}$.'),
    'height-as-apothem': say('Alboko aurpegiaren altuera apotema da: $a_{p}^{2}=h^{2}+\\left(\\frac{l}{2}\\right)^{2}$.', 'La altura de la cara lateral es la apotema: $a_{p}^{2}=h^{2}+\\left(\\frac{l}{2}\\right)^{2}$.', 'ارتفاع الوجه الجانبي هو الارتفاع الجانبي: $a_{p}^{2}=h^{2}+\\left(\\frac{l}{2}\\right)^{2}$.', 'The height of a lateral face is the slant height: $a_{p}^{2}=h^{2}+\\left(\\frac{l}{2}\\right)^{2}$.'),
    'diameter-as-radius': say('Erradioa diametroaren erdia da: $r=\\frac{d}{2}$.', 'El radio es la mitad del diámetro: $r=\\frac{d}{2}$.', 'نصف القطر نصف القطر الكامل: $r=\\frac{d}{2}$.', 'The radius is half the diameter: $r=\\frac{d}{2}$.'),
    'volume-as-lateral': say('Alboko azalera: $A_{L}=P_{B}\\cdot h$. $A_{B}\\cdot h$ bolumena da.', 'Área lateral: $A_{L}=P_{B}\\cdot h$. $A_{B}\\cdot h$ es el volumen.', 'المساحة الجانبية: $A_{L}=P_{B}\\cdot h$. أما $A_{B}\\cdot h$ فهو الحجم.', 'Lateral area: $A_{L}=P_{B}\\cdot h$. $A_{B}\\cdot h$ is the volume.'),
    'pyramid-third': say('Piramidea: $V=\\frac{A_{B}\\cdot h}{3}$, oinarri eta altuera bereko prismaren herena.', 'Pirámide: $V=\\frac{A_{B}\\cdot h}{3}$, un tercio del prisma de igual base y altura.', 'الهرم: $V=\\frac{A_{B}\\cdot h}{3}$، ثلث المنشور الذي له القاعدة والارتفاع نفسهما.', 'Pyramid: $V=\\frac{A_{B}\\cdot h}{3}$, a third of the prism with the same base and height.'),
    'cone-third': say('Konoa: $V=\\frac{\\pi r^{2}h}{3}$, zilindroaren herena.', 'Cono: $V=\\frac{\\pi r^{2}h}{3}$, un tercio del cilindro.', 'المخروط: $V=\\frac{\\pi r^{2}h}{3}$، ثلث الأسطوانة.', 'Cone: $V=\\frac{\\pi r^{2}h}{3}$, a third of the cylinder.'),
    'sphere-square': say('Esfera: $V=\\frac{4}{3}\\pi r^{3}$: bolumenean beti hiru luzera biderkatzen dira.', 'Esfera: $V=\\frac{4}{3}\\pi r^{3}$: en un volumen siempre se multiplican tres longitudes.', 'الكرة: $V=\\frac{4}{3}\\pi r^{3}$: في الحجم نضرب دائمًا ثلاثة أطوال.', 'Sphere: $V=\\frac{4}{3}\\pi r^{3}$: a volume always multiplies three lengths.'),
    'circumference-as-base': say('Oinarria zirkulu bat da: $A_{B}=\\pi r^{2}$. $2\\pi r$ haren ertzaren luzera da.', 'La base es un círculo: $A_{B}=\\pi r^{2}$. $2\\pi r$ es la longitud de su borde.', 'القاعدة دائرة: $A_{B}=\\pi r^{2}$. أما $2\\pi r$ فطول محيطها.', 'The base is a circle: $A_{B}=\\pi r^{2}$. $2\\pi r$ is the length of its edge.'),
    'cm3-as-litre': say('$1\\ \\text{dm}^{3}=1\\ \\text{L}$ eta $1\\ \\text{cm}^{3}=1\\ \\text{mL}$.', '$1\\ \\text{dm}^{3}=1\\ \\text{L}$ y $1\\ \\text{cm}^{3}=1\\ \\text{mL}$.', '$1\\ \\text{dm}^{3}=1\\ \\text{L}$ و$1\\ \\text{cm}^{3}=1\\ \\text{mL}$.', '$1\\ \\text{dm}^{3}=1\\ \\text{L}$ and $1\\ \\text{cm}^{3}=1\\ \\text{mL}$.'),
    'cubic-hundred': say('Bolumen-unitateak 1000ka doaz: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$.', 'Las unidades de volumen van de 1000 en 1000: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$.', 'وحدات الحجم تتدرّج بـ 1000: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$.', 'Volume units go up in thousands: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$.'),
    'height-forgotten': say('Oinarriaren azalera ez da bolumena: $V=A_{B}\\cdot h$.', 'El área de la base no es el volumen: $V=A_{B}\\cdot h$.', 'مساحة القاعدة ليست الحجم: $V=A_{B}\\cdot h$.', 'The base area is not the volume: $V=A_{B}\\cdot h$.'),
    'litre-hundred-ml': say('$1\\ \\text{L}=1000\\ \\text{mL}$: mililitroa litroaren milarena da.', '$1\\ \\text{L}=1000\\ \\text{mL}$: el mililitro es la milésima parte del litro.', '$1\\ \\text{L}=1000\\ \\text{mL}$: الملّيلتر جزء من ألف من اللتر.', '$1\\ \\text{L}=1000\\ \\text{mL}$: a millilitre is a thousandth of a litre.')
}

/** A number with at most two decimals, for LaTeX */
export const num = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
/** A multiple of π and its value: 45\pi\approx 141{,}37 */
const pi = (multiple: number) => `${num(multiple)}\\pi\\approx ${num(multiple * Math.PI)}`
const rounded = (value: number) => Math.round(value * 100) / 100
/** A unit after a number in a formula */
const unit = (name: string, cube = false) => `\\,\\text{${name}}${cube ? '^{3}' : ''}`
/** A decimal in a Basque or Spanish sentence; English and Arabic keep the point */
const comma = (value: number) => String(value).replace('.', ',')

type Built = Omit<WorkedCase<SolidsDetectiveError>, 'options'>

function build(random: Random, error: SolidsDetectiveError): Built | null {
    switch (error) {
        case 'one-base': {
            const a = pick(random, [3, 4, 5, 6, 8])
            const b = pick(random, [2, 3, 4, 5])
            const c = pick(random, [5, 6, 7, 10])
            if (a === b) return null
            const base = a * b
            const lateral = 2 * (a + b) * c
            return {
                problem: say(`Ortoedro baten neurriak ${a} cm, ${b} cm eta ${c} cm dira (altuera). Kalkulatu azalera osoa.`, `Un ortoedro mide ${a} cm, ${b} cm y ${c} cm de altura. Calcula su área total.`, `متوازي مستطيلات أبعاده ${a} سم و${b} سم وارتفاعه ${c} سم. احسب مساحته الكلية.`, `A cuboid is ${a} cm by ${b} cm and ${c} cm high. Work out its total surface area.`),
                lines: [
                    line(LABELS.base, `A_{B}=${a}\\cdot ${b}=${base}`),
                    line(LABELS.lateral, `A_{L}=${2 * (a + b)}\\cdot ${c}=${lateral}`),
                    line(LABELS.total, `A_{T}=${lateral}+${base}=${lateral + base}`)
                ],
                wrong: 2,
                error,
                fix: `A_{T}=${lateral}+2\\cdot ${base}=${lateral + 2 * base}`,
                right: lateral + 2 * base,
                reached: lateral + base
            }
        }
        case 'height-as-apothem': {
            const [half, h, apothem] = pick(random, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]] as const)
            const side = 2 * half
            const reachedFace = (side * h) / 2
            return {
                problem: say(`Oinarri karratuko piramide baten oinarriaren aldea ${side} cm da eta altuera ${h} cm. Kalkulatu alboko azalera.`, `Una pirámide de base cuadrada tiene ${side} cm de lado de la base y ${h} cm de altura. Calcula su área lateral.`, `هرم قاعدته مربعة طول ضلعها ${side} سم وارتفاعه ${h} سم. احسب مساحته الجانبية.`, `A square-based pyramid has a base side of ${side} cm and a height of ${h} cm. Work out its lateral area.`),
                lines: [
                    line(LABELS.face, `\\frac{${side}\\cdot ${h}}{2}=${num(reachedFace)}`),
                    line(LABELS.lateral, `A_{L}=4\\cdot ${num(reachedFace)}`),
                    line(LABELS.result, `A_{L}=${num(4 * reachedFace)}`)
                ],
                wrong: 0,
                error,
                fix: `a_{p}=\\sqrt{${h}^{2}+${half}^{2}}=${apothem}\\ \\to\\ A_{L}=4\\cdot\\frac{${side}\\cdot ${apothem}}{2}=${2 * side * apothem}`,
                right: 2 * side * apothem,
                reached: 4 * reachedFace
            }
        }
        case 'diameter-as-radius': {
            const d = pick(random, [4, 6, 8, 10, 12])
            const h = pick(random, [5, 7, 10, 15])
            return {
                problem: say(`Zilindro baten diametroa ${d} cm da eta altuera ${h} cm. Kalkulatu alboko azalera.`, `Un cilindro tiene ${d} cm de diámetro y ${h} cm de altura. Calcula su área lateral.`, `أسطوانة قطرها ${d} سم وارتفاعها ${h} سم. احسب مساحتها الجانبية.`, `A cylinder has a diameter of ${d} cm and a height of ${h} cm. Work out its lateral area.`),
                lines: [
                    line(LABELS.radius, `r=${d}`),
                    line(LABELS.lateral, `A_{L}=2\\pi\\cdot ${d}\\cdot ${h}`),
                    line(LABELS.result, `A_{L}=${pi(2 * d * h)}`)
                ],
                wrong: 0,
                error,
                fix: `r=\\frac{${d}}{2}=${d / 2}\\ \\to\\ A_{L}=${pi(d * h)}`,
                right: rounded(d * h * Math.PI),
                reached: rounded(2 * d * h * Math.PI)
            }
        }
        case 'volume-as-lateral': {
            const l = pick(random, [3, 5, 6, 7, 8])
            const h = pick(random, [9, 10, 12, 15])
            return {
                problem: say(`Oinarri karratuko prisma baten oinarriaren aldea ${l} cm da eta altuera ${h} cm. Kalkulatu alboko azalera.`, `Un prisma de base cuadrada tiene ${l} cm de lado de la base y ${h} cm de altura. Calcula su área lateral.`, `منشور قاعدته مربعة طول ضلعها ${l} سم وارتفاعه ${h} سم. احسب مساحته الجانبية.`, `A square-based prism has a base side of ${l} cm and a height of ${h} cm. Work out its lateral area.`),
                lines: [
                    line(LABELS.base, `A_{B}=${l}^{2}=${l * l}`),
                    line(LABELS.lateral, `A_{L}=${l * l}\\cdot ${h}`),
                    line(LABELS.result, `A_{L}=${l * l * h}`)
                ],
                wrong: 1,
                error,
                fix: `P_{B}=4\\cdot ${l}=${4 * l}\\ \\to\\ A_{L}=${4 * l}\\cdot ${h}=${4 * l * h}`,
                right: 4 * l * h,
                reached: l * l * h
            }
        }
        case 'pyramid-third': {
            const l = pick(random, [3, 6, 9, 4, 5])
            const h = pick(random, [6, 9, 12, 10])
            if ((l * l * h) % 3 !== 0) return null
            return {
                problem: say(`Oinarri karratuko piramide baten oinarriaren aldea ${l} cm da eta altuera ${h} cm. Kalkulatu bolumena.`, `Una pirámide de base cuadrada tiene ${l} cm de lado de la base y ${h} cm de altura. Calcula su volumen.`, `هرم قاعدته مربعة طول ضلعها ${l} سم وارتفاعه ${h} سم. احسب حجمه.`, `A square-based pyramid has a base side of ${l} cm and a height of ${h} cm. Work out its volume.`),
                lines: [
                    line(LABELS.formula, 'V=A_{B}\\cdot h'),
                    line(LABELS.base, `A_{B}=${l}^{2}=${l * l}`),
                    line(LABELS.volume, `V=${l * l}\\cdot ${h}=${l * l * h}`)
                ],
                wrong: 0,
                error,
                fix: `V=\\frac{${l * l}\\cdot ${h}}{3}=${(l * l * h) / 3}`,
                right: (l * l * h) / 3,
                reached: l * l * h
            }
        }
        case 'cone-third': {
            const r = pick(random, [2, 3, 4, 5, 6])
            const h = pick(random, [3, 6, 9, 12])
            return {
                problem: say(`Kono baten erradioa ${r} cm da eta altuera ${h} cm. Kalkulatu bolumena.`, `Un cono tiene ${r} cm de radio y ${h} cm de altura. Calcula su volumen.`, `مخروط نصف قطره ${r} سم وارتفاعه ${h} سم. احسب حجمه.`, `A cone has a radius of ${r} cm and a height of ${h} cm. Work out its volume.`),
                lines: [
                    line(LABELS.formula, 'V=\\pi r^{2}h'),
                    line(LABELS.substitute, `V=\\pi\\cdot ${r}^{2}\\cdot ${h}`),
                    line(LABELS.result, `V=${pi(r * r * h)}`)
                ],
                wrong: 0,
                error,
                fix: `V=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${h}}{3}=${pi((r * r * h) / 3)}`,
                right: rounded((r * r * h * Math.PI) / 3),
                reached: rounded(r * r * h * Math.PI)
            }
        }
        case 'sphere-square': {
            const r = pick(random, [3, 6])
            return {
                problem: say(`Esfera baten erradioa ${r} cm da. Kalkulatu bolumena.`, `Una esfera tiene ${r} cm de radio. Calcula su volumen.`, `كرة نصف قطرها ${r} سم. احسب حجمها.`, `A sphere has a radius of ${r} cm. Work out its volume.`),
                lines: [
                    line(LABELS.formula, 'V=\\frac{4}{3}\\pi r^{3}'),
                    line(LABELS.substitute, `V=\\frac{4}{3}\\pi\\cdot ${r}^{2}`),
                    line(LABELS.result, `V=${pi((4 * r * r) / 3)}`)
                ],
                wrong: 1,
                error,
                fix: `V=\\frac{4}{3}\\pi\\cdot ${r}^{3}=${pi((4 * r ** 3) / 3)}`,
                right: rounded((4 * r ** 3 * Math.PI) / 3),
                reached: rounded((4 * r * r * Math.PI) / 3)
            }
        }
        case 'circumference-as-base': {
            const r = pick(random, [3, 4, 5, 6])
            const h = pick(random, [5, 8, 10])
            return {
                problem: say(`Zilindro baten erradioa ${r} cm da eta altuera ${h} cm. Kalkulatu bolumena.`, `Un cilindro tiene ${r} cm de radio y ${h} cm de altura. Calcula su volumen.`, `أسطوانة نصف قطرها ${r} سم وارتفاعها ${h} سم. احسب حجمها.`, `A cylinder has a radius of ${r} cm and a height of ${h} cm. Work out its volume.`),
                lines: [
                    line(LABELS.base, `A_{B}=2\\pi\\cdot ${r}=${2 * r}\\pi`),
                    line(LABELS.volume, `V=${2 * r}\\pi\\cdot ${h}`),
                    line(LABELS.result, `V=${pi(2 * r * h)}`)
                ],
                wrong: 0,
                error,
                fix: `A_{B}=\\pi\\cdot ${r}^{2}=${r * r}\\pi\\ \\to\\ V=${pi(r * r * h)}`,
                right: rounded(r * r * h * Math.PI),
                reached: rounded(2 * r * h * Math.PI)
            }
        }
        case 'cm3-as-litre': {
            const [a, b, c] = pick(random, [[50, 30, 40], [40, 25, 30], [60, 30, 50], [30, 20, 25], [50, 40, 30]] as const)
            const bottle = pick(random, [2, 3, 5])
            const cubic = a * b * c
            if ((cubic / 1000) % bottle !== 0) return null
            return {
                problem: say(`Arrain-ontzi batek ${a} cm × ${b} cm × ${c} cm neurtzen ditu. Zenbat ${bottle} litroko botila behar dira betetzeko?`, `Una pecera mide ${a} cm × ${b} cm × ${c} cm. ¿Cuántas botellas de ${bottle} L hacen falta para llenarla?`, `حوض سمك أبعاده ${a} سم × ${b} سم × ${c} سم. كم زجاجة سعتها ${bottle} ل نحتاج لملئه؟`, `A fish tank measures ${a} cm × ${b} cm × ${c} cm. How many ${bottle} L bottles does it take to fill it?`),
                lines: [
                    line(LABELS.volume, `${a}\\cdot ${b}\\cdot ${c}=${cubic}${unit('cm', true)}`),
                    line(LABELS.litres, `${cubic}${unit('cm', true)}=${cubic}${unit('L')}`),
                    line(LABELS.count, `${cubic}\\div ${bottle}=${cubic / bottle}`)
                ],
                wrong: 1,
                error,
                fix: `${cubic}${unit('cm', true)}=${cubic / 1000}${unit('L')}\\ \\to\\ ${cubic / 1000}\\div ${bottle}=${cubic / 1000 / bottle}`,
                right: cubic / 1000 / bottle,
                reached: cubic / bottle
            }
        }
        case 'cubic-hundred': {
            const cubic = pick(random, [1.2, 1.5, 2, 2.4, 3])
            const bucket = pick(random, [10, 20, 30])
            if (Math.round(cubic * 1000) % bucket !== 0 || Math.round(cubic * 100) % bucket !== 0) return null
            return {
                problem: say(`Depositu baten edukiera ${comma(cubic)} m³ da. Zenbat ${bucket} litroko ontzi behar dira betetzeko?`, `Un depósito tiene ${comma(cubic)} m³ de capacidad. ¿Cuántos cubos de ${bucket} L hacen falta para llenarlo?`, `خزان سعته ${cubic} م³. كم دلوًا سعته ${bucket} ل نحتاج لملئه؟`, `A tank holds ${cubic} m³. How many ${bucket} L buckets does it take to fill it?`),
                lines: [
                    line(LABELS.convert, `${num(cubic)}${unit('m', true)}=${num(cubic * 100)}${unit('dm', true)}`),
                    line(LABELS.litres, `${num(cubic * 100)}${unit('dm', true)}=${num(cubic * 100)}${unit('L')}`),
                    line(LABELS.count, `${num(cubic * 100)}\\div ${bucket}=${num((cubic * 100) / bucket)}`)
                ],
                wrong: 0,
                error,
                fix: `${num(cubic)}${unit('m', true)}=${num(cubic * 1000)}${unit('L')}\\ \\to\\ ${num(cubic * 1000)}\\div ${bucket}=${num((cubic * 1000) / bucket)}`,
                right: rounded((cubic * 1000) / bucket),
                reached: rounded((cubic * 100) / bucket)
            }
        }
        case 'height-forgotten': {
            const r = pick(random, [1, 1.5, 2, 2.5])
            const h = pick(random, [3, 4, 5, 6])
            const base = rounded(Math.PI * r * r)
            return {
                problem: say(`Ontzi zilindriko baten erradioa ${comma(r)} dm da eta altuera ${h} dm. Zenbat litro sartzen dira?`, `Un recipiente cilíndrico tiene ${comma(r)} dm de radio y ${h} dm de altura. ¿Cuántos litros caben?`, `وعاء أسطواني نصف قطره ${r} دسم وارتفاعه ${h} دسم. كم لترًا يتسع؟`, `A cylindrical container has a radius of ${r} dm and a height of ${h} dm. How many litres does it hold?`),
                lines: [
                    line(LABELS.base, `A_{B}=\\pi\\cdot ${num(r)}^{2}\\approx ${num(base)}`),
                    line(LABELS.volume, `V\\approx ${num(base)}${unit('dm', true)}`),
                    line(LABELS.litres, `${num(base)}${unit('L')}`)
                ],
                wrong: 1,
                error,
                fix: `V\\approx ${num(base)}\\cdot ${h}=${num(base * h)}${unit('dm', true)}\\ \\to\\ ${num(base * h)}${unit('L')}`,
                right: rounded(base * h),
                reached: base
            }
        }
        case 'litre-hundred-ml': {
            const jug = pick(random, [1, 1.5, 2, 3])
            const glass = pick(random, [200, 250])
            if (Math.round(jug * 1000) % glass !== 0) return null
            return {
                problem: say(`${comma(jug)} litroko pitxer bat ${glass} mL-ko basoetan banatzen dugu. Zenbat baso betetzen dira?`, `Repartimos una jarra de ${comma(jug)} L en vasos de ${glass} mL. ¿Cuántos vasos se llenan?`, `نوزّع إبريقًا سعته ${jug} ل على أكواب سعة كل منها ${glass} مل. كم كوبًا نملأ؟`, `We share a ${jug} L jug into ${glass} mL glasses. How many glasses are filled?`),
                lines: [
                    line(LABELS.convert, `${num(jug)}${unit('L')}=${num(jug * 100)}${unit('mL')}`),
                    line(LABELS.count, `${num(jug * 100)}\\div ${glass}`),
                    line(LABELS.result, num((jug * 100) / glass))
                ],
                wrong: 0,
                error,
                fix: `${num(jug)}${unit('L')}=${num(jug * 1000)}${unit('mL')}\\ \\to\\ ${num(jug * 1000)}\\div ${glass}=${num((jug * 1000) / glass)}`,
                right: (jug * 1000) / glass,
                reached: rounded((jug * 100) / glass)
            }
        }
    }
}

export const createSolidsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, solidsDetectiveLevels[levelIndex], SOLIDS_DETECTIVE_CASES, build)
