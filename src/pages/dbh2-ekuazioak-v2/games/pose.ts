import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J2 · Planteatu ekuazioa (Plantea la ecuación): a problem and four
   equations; only one says what the problem says. The wrong ones are the
   usual misreadings: the brackets of «the double of the sum», three
   consecutive numbers as x + 2x + 3x, the perimeter with only two sides,
   the angles of a triangle adding up to 90° or 360°, «in 5 years» added to
   only one of the ages... After the answer, the right equation, its
   solution and the check in the problem. Level 1: numbers; level 2: ages
   and money; level 3: geometry. Every solution is a whole number.
   ========================================================================== */

export const POSE_ROUNDS = 6

export interface PoseRound {
    text: LocalizedText
    /** The four equations, the right one among them */
    options: string[]
    right: number
    /** The value of x and what it means in the problem */
    x: number
    answer: LocalizedText
    /** The check in the problem's numbers: 2·12+7=31 */
    check: string
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** Degrees in Arabic text: isolated left to right, or the sign jumps to the other side of the number */
const deg = (value: number) => `\u2066${value}°\u2069`

interface Made {
    text: LocalizedText
    right: string
    wrong: string[]
    x: number
    answer: LocalizedText
    check: string
}

type Template = (random: Random) => Made | null

const NUMBERS: Template[] = [
    // The double of a number plus 7
    (random) => {
        const x = randomInt(random, 4, 20)
        const a = randomInt(random, 3, 12)
        const total = 2 * x + a
        // With x = a, «x + 2·a» would hold too
        if (x === a) return null
        return {
            text: say(`Zenbaki baten bikoitzari ${a} batzen badiozu, ${total} lortzen duzu. Zein da zenbakia?`, `Si al doble de un número le sumas ${a}, obtienes ${total}. ¿Qué número es?`, `إذا أضفت ${a} إلى ضعف عدد حصلت على ${total}. ما العدد؟`, `If you add ${a} to double a number, you get ${total}. What is the number?`),
            right: `2x+${a}=${total}`,
            wrong: [`2(x+${a})=${total}`, `x+2\\cdot ${a}=${total}`, `2x=${total}+${a}`],
            x,
            answer: say(`Zenbakia ${x} da.`, `El número es ${x}.`, `العدد هو ${x}.`, `The number is ${x}.`),
            check: `2\\cdot ${x}+${a}=${total}`
        }
    },
    // The double of the sum of a number and 5
    (random) => {
        const x = randomInt(random, 3, 18)
        const a = randomInt(random, 2, 9)
        const total = 2 * (x + a)
        return {
            text: say(`Zenbaki baten eta ${a} zenbakiaren baturaren bikoitza ${total} da. Zein da zenbakia?`, `El doble de la suma de un número y ${a} es ${total}. ¿Qué número es?`, `ضعف مجموع عدد و${a} يساوي ${total}. ما العدد؟`, `Double the sum of a number and ${a} is ${total}. What is the number?`),
            right: `2(x+${a})=${total}`,
            wrong: [`2x+${a}=${total}`, `x+2\\cdot ${a}=${total}`, `(x+${a})^{2}=${total}`],
            x,
            answer: say(`Zenbakia ${x} da.`, `El número es ${x}.`, `العدد هو ${x}.`, `The number is ${x}.`),
            check: `2(${x}+${a})=${total}`
        }
    },
    // Three consecutive numbers
    (random) => {
        const x = randomInt(random, 8, 40)
        const total = 3 * x + 3
        return {
            text: say(`Ondoz ondoko hiru zenbakiren batura ${total} da. Zein da txikiena?`, `La suma de tres números consecutivos es ${total}. ¿Cuál es el menor?`, `مجموع ثلاثة أعداد متتالية يساوي ${total}. ما أصغرها؟`, `The sum of three consecutive numbers is ${total}. What is the smallest?`),
            right: `x+(x+1)+(x+2)=${total}`,
            wrong: [`x+2x+3x=${total}`, `x+(x+1)+(x+1)=${total}`, `3x+1=${total}`],
            x,
            answer: say(`Zenbakiak ${x}, ${x + 1} eta ${x + 2} dira.`, `Los números son ${x}, ${x + 1} y ${x + 2}.`, `الأعداد هي ${x} و${x + 1} و${x + 2}.`, `The numbers are ${x}, ${x + 1} and ${x + 2}.`),
            check: `${x}+${x + 1}+${x + 2}=${total}`
        }
    },
    // Half a number plus its third part
    (random) => {
        const x = 6 * randomInt(random, 2, 10)
        const total = x / 2 + x / 3
        return {
            text: say(`Zenbaki baten erdiari bere herena batzen badiogu, ${total} lortzen dugu. Zein da zenbakia?`, `La mitad de un número más su tercera parte suman ${total}. ¿Qué número es?`, `نصف عدد مضافًا إليه ثلثه يساوي ${total}. ما العدد؟`, `Half a number plus a third of it makes ${total}. What is the number?`),
            right: `\\frac{x}{2}+\\frac{x}{3}=${total}`,
            wrong: [`2x+3x=${total}`, `\\frac{x}{2}+3x=${total}`, `\\frac{x}{2}\\cdot\\frac{x}{3}=${total}`],
            x,
            answer: say(`Zenbakia ${x} da.`, `El número es ${x}.`, `العدد هو ${x}.`, `The number is ${x}.`),
            check: `\\frac{${x}}{2}+\\frac{${x}}{3}=${x / 2}+${x / 3}=${total}`
        }
    },
    // A number minus its quarter
    (random) => {
        const x = 4 * randomInt(random, 3, 15)
        const total = x - x / 4
        return {
            text: say(`Zenbaki bati bere laurdena kentzen badiogu, ${total} geratzen da. Zein da zenbakia?`, `Si a un número le restamos su cuarta parte, quedan ${total}. ¿Qué número es?`, `إذا طرحنا من عدد ربعه بقي ${total}. ما العدد؟`, `If we take a quarter of a number away from it, ${total} is left. What is the number?`),
            right: `x-\\frac{x}{4}=${total}`,
            wrong: [`\\frac{x}{4}-x=${total}`, `x-4x=${total}`, `x-\\frac{1}{4}=${total}`],
            x,
            answer: say(`Zenbakia ${x} da.`, `El número es ${x}.`, `العدد هو ${x}.`, `The number is ${x}.`),
            check: `${x}-\\frac{${x}}{4}=${x}-${x / 4}=${total}`
        }
    }
]

const AGES_AND_MONEY: Template[] = [
    // Two siblings
    (random) => {
        const x = randomInt(random, 5, 16)
        const a = randomInt(random, 2, 9)
        const total = 2 * x + a
        return {
            text: say(`Anek bere anaiak baino ${a} urte gehiago ditu. Bien artean ${total} urte dituzte. Zenbat urte ditu anaiak?`, `Ana tiene ${a} años más que su hermano. Entre los dos suman ${total} años. ¿Cuántos años tiene el hermano?`, `عمر آنا يزيد على عمر أخيها بـ ${a} سنوات. ومجموع عمريهما ${total} سنة. كم عمر الأخ؟`, `Ana is ${a} years older than her brother. Together they are ${total} years old. How old is the brother?`),
            right: `x+(x+${a})=${total}`,
            wrong: [`x+${a}=${total}`, `x+${a}x=${total}`, `2x=${total}+${a}`],
            x,
            answer: say(`Anaiak ${x} urte ditu eta Anek ${x + a}.`, `El hermano tiene ${x} años y Ana, ${x + a}.`, `عمر الأخ ${x} سنة وعمر آنا ${x + a}.`, `The brother is ${x} and Ana is ${x + a}.`),
            check: `${x}+${x + a}=${total}`
        }
    },
    // Mother three times as old; in k years, twice as old
    (random) => {
        const k = randomInt(random, 6, 15)
        const x = k
        return {
            text: say(`Ama batek bere semeak baino hiru aldiz urte gehiago ditu. ${k} urte barru, bikoitza izango ditu. Zenbat urte ditu semeak orain?`, `Una madre tiene el triple de la edad de su hijo. Dentro de ${k} años tendrá el doble. ¿Cuántos años tiene ahora el hijo?`, `عمر أم ثلاثة أضعاف عمر ابنها. وبعد ${k} سنوات سيصبح ضعفه. كم عمر الابن الآن؟`, `A mother is three times as old as her son. In ${k} years she will be twice as old. How old is the son now?`),
            right: `3x+${k}=2(x+${k})`,
            wrong: [`3x+${k}=2x+${k}`, `3x=2(x+${k})`, `3(x+${k})=2x`],
            x,
            answer: say(`Semeak ${x} urte ditu eta amak ${3 * x}.`, `El hijo tiene ${x} años y la madre, ${3 * x}.`, `عمر الابن ${x} سنة وعمر الأم ${3 * x}.`, `The son is ${x} and the mother is ${3 * x}.`),
            check: `3\\cdot ${x}+${k}=${3 * x + k}=2(${x}+${k})`
        }
    },
    // Notebooks and a book
    (random) => {
        const x = randomInt(random, 2, 6)
        const n = randomInt(random, 3, 8)
        const p = randomInt(random, 8, 20)
        const total = n * x + p
        return {
            text: say(`${n} koaderno berdin eta ${p} euroko liburu bat erosi ditut, eta ${total} euro ordaindu ditut. Zenbat balio du koaderno batek?`, `He comprado ${n} cuadernos iguales y un libro de ${p} €, y he pagado ${total} €. ¿Cuánto cuesta cada cuaderno?`, `اشتريت ${n} دفاتر متماثلة وكتابًا بـ ${p} يورو، ودفعت ${total} يورو. كم ثمن الدفتر الواحد؟`, `I bought ${n} identical notebooks and a book for €${p}, and paid €${total}. How much does each notebook cost?`),
            right: `${n}x+${p}=${total}`,
            wrong: [`${n}(x+${p})=${total}`, `x+${n}\\cdot ${p}=${total}`, `${n}x=${total}+${p}`],
            x,
            answer: say(`Koaderno bakoitzak ${x} euro balio du.`, `Cada cuaderno cuesta ${x} €.`, `ثمن الدفتر الواحد ${x} يورو.`, `Each notebook costs €${x}.`),
            check: `${n}\\cdot ${x}+${p}=${total}`
        }
    },
    // Three friends share money
    (random) => {
        const x = randomInt(random, 5, 20)
        const a = randomInt(random, 3, 10)
        const total = 4 * x + a
        return {
            text: say(`Jonek Pedrok baino bi aldiz diru gehiago du, eta Luisek Pedrok baino ${a} euro gehiago. Hiruren artean ${total} euro dituzte. Zenbat du Pedrok?`, `Jon tiene el doble de dinero que Pedro, y Luis ${a} € más que Pedro. Entre los tres tienen ${total} €. ¿Cuánto tiene Pedro?`, `مع جون ضعف ما مع بيدرو، ومع لويس ${a} يورو أكثر من بيدرو. ومعهم معًا ${total} يورو. كم مع بيدرو؟`, `Jon has twice as much money as Pedro, and Luis has €${a} more than Pedro. Together they have €${total}. How much does Pedro have?`),
            right: `x+2x+(x+${a})=${total}`,
            wrong: [`x+2x+${a}x=${total}`, `x+2+(x+${a})=${total}`, `2x+(x+${a})=${total}`],
            x,
            answer: say(`Pedrok ${x} euro ditu, Jonek ${2 * x} eta Luisek ${x + a}.`, `Pedro tiene ${x} €, Jon ${2 * x} € y Luis ${x + a} €.`, `مع بيدرو ${x} يورو، ومع جون ${2 * x}، ومع لويس ${x + a}.`, `Pedro has €${x}, Jon €${2 * x} and Luis €${x + a}.`),
            check: `${x}+${2 * x}+${x + a}=${total}`
        }
    }
]

const GEOMETRY: Template[] = [
    // Rectangle: length a more than the width, perimeter P
    (random) => {
        const x = randomInt(random, 3, 15)
        const a = randomInt(random, 2, 9)
        const total = 4 * x + 2 * a
        // The area must not happen to equal the perimeter
        if (x * (x + a) === total) return null
        return {
            text: say(`Laukizuzen baten luzera zabalera baino ${a} cm handiagoa da, eta perimetroa ${total} cm da. Zenbat neurtzen du zabalerak?`, `El largo de un rectángulo mide ${a} cm más que el ancho, y su perímetro es ${total} cm. ¿Cuánto mide el ancho?`, `طول مستطيل يزيد على عرضه بـ ${a} سم، ومحيطه ${total} سم. كم يبلغ العرض؟`, `The length of a rectangle is ${a} cm more than its width, and its perimeter is ${total} cm. How wide is it?`),
            right: `2x+2(x+${a})=${total}`,
            wrong: [`x+(x+${a})=${total}`, `2x+(x+${a})=${total}`, `x(x+${a})=${total}`],
            x,
            answer: say(`Zabalerak ${x} cm neurtzen du eta luzerak ${x + a} cm.`, `El ancho mide ${x} cm y el largo, ${x + a} cm.`, `العرض ${x} سم والطول ${x + a} سم.`, `The width is ${x} cm and the length is ${x + a} cm.`),
            check: `2\\cdot ${x}+2\\cdot ${x + a}=${total}`
        }
    },
    // Angles of a triangle
    (random) => {
        const a = pick(random, [10, 20, 30, 40])
        const x = (180 - a) / 4
        if (!Number.isInteger(x)) return null
        return {
            text: say(`Triangelu batean, angelu bat beste baten bikoitza da, eta hirugarrena txikiena baino ${a}° handiagoa. Zenbat neurtzen du txikienak?`, `En un triángulo, un ángulo mide el doble que otro, y el tercero ${a}° más que el menor. ¿Cuánto mide el menor?`, `في مثلث، زاوية ضعف أخرى، والثالثة تزيد على الصغرى بـ ${deg(a)}. كم تبلغ الصغرى؟`, `In a triangle, one angle is twice another, and the third is ${a}° more than the smallest. How big is the smallest?`),
            right: `x+2x+(x+${a})=180`,
            wrong: [`x+2x+(x+${a})=90`, `x+2x+(x+${a})=360`, `x+2x+${a}=180`],
            x,
            answer: say(`Angeluak ${x}°, ${2 * x}° eta ${x + a}° dira.`, `Los ángulos miden ${x}°, ${2 * x}° y ${x + a}°.`, `الزوايا ${deg(x)} و${deg(2 * x)} و${deg(x + a)}.`, `The angles are ${x}°, ${2 * x}° and ${x + a}°.`),
            check: `${x}+${2 * x}+${x + a}=180`
        }
    },
    // Isosceles triangle
    (random) => {
        const x = randomInt(random, 3, 14)
        const a = randomInt(random, 2, 8)
        const total = 3 * x + 2 * a
        return {
            text: say(`Triangelu isoszele baten alde berdinek oinarriak baino ${a} cm gehiago neurtzen dute, eta perimetroa ${total} cm da. Zenbat neurtzen du oinarriak?`, `Los lados iguales de un triángulo isósceles miden ${a} cm más que la base, y el perímetro es ${total} cm. ¿Cuánto mide la base?`, `كل من الضلعين المتساويين في مثلث متساوي الساقين يزيد على القاعدة بـ ${a} سم، والمحيط ${total} سم. كم تبلغ القاعدة؟`, `The equal sides of an isosceles triangle are ${a} cm longer than the base, and the perimeter is ${total} cm. How long is the base?`),
            right: `x+2(x+${a})=${total}`,
            wrong: [`x+(x+${a})=${total}`, `2x+(x+${a})=${total}`, `3x+${a}=${total}`],
            x,
            answer: say(`Oinarriak ${x} cm neurtzen du eta alde berdinek ${x + a} cm.`, `La base mide ${x} cm y los lados iguales, ${x + a} cm.`, `القاعدة ${x} سم والضلعان المتساويان ${x + a} سم.`, `The base is ${x} cm and the equal sides are ${x + a} cm.`),
            check: `${x}+2\\cdot ${x + a}=${total}`
        }
    },
    // A square with a longer side
    (random) => {
        const x = randomInt(random, 2, 15)
        const a = randomInt(random, 2, 6)
        const total = 4 * (x + a)
        // With a side of 4, the square's area equals its perimeter
        if (x + a === 4) return null
        return {
            text: say(`Karratu baten aldeari ${a} cm gehitzen badizkiogu, perimetroa ${total} cm da. Zenbat neurtzen zuen aldeak?`, `Si al lado de un cuadrado le añadimos ${a} cm, su perímetro es ${total} cm. ¿Cuánto medía el lado?`, `إذا أضفنا ${a} سم إلى ضلع مربع صار محيطه ${total} سم. كم كان طول الضلع؟`, `If we add ${a} cm to the side of a square, its perimeter is ${total} cm. How long was the side?`),
            right: `4(x+${a})=${total}`,
            wrong: [`4x+${a}=${total}`, `x+${a}=${total}`, `(x+${a})^{2}=${total}`],
            x,
            answer: say(`Aldeak ${x} cm neurtzen zuen.`, `El lado medía ${x} cm.`, `كان طول الضلع ${x} سم.`, `The side was ${x} cm long.`),
            check: `4(${x}+${a})=4\\cdot ${x + a}=${total}`
        }
    }
]

export const POSE_TEMPLATES: Template[][] = [NUMBERS, AGES_AND_MONEY, GEOMETRY]

export function createPoseRounds(random: Random, levelIndex: number): PoseRound[] {
    const templates = POSE_TEMPLATES[levelIndex]
    // Every template once before any repeats
    const order = Array.from({ length: POSE_ROUNDS }, (_, index) => index % templates.length)
    return shuffle(random, order).map((index) => {
        for (;;) {
            const made = templates[index](random)
            if (!made) continue
            const options = shuffle(random, [made.right, ...made.wrong])
            return { text: made.text, options, right: options.indexOf(made.right), x: made.x, answer: made.answer, check: made.check }
        }
    })
}

export function poseStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
