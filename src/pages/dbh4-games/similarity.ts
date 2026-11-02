import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { tex } from './geometryDetective.ts'

/* ==========================================================================
   The similarity games of 4. DBH (applied similarity, academic areas):
   · Grow it k times: a measure of a figure or a solid and the ratio k of a
     similar one; lengths go × k, areas × k², volumes × k³. The answer is
     drawn as k² squares or k³ cubes. Level 1: lengths and areas; level 2:
     volumes mixed with areas; level 3: reductions and the way back.
   · Measure the tower: a stick and its shadow, a mirror on the ground or a
     line of sight over a stick; set the height and the ray shows it.
   · The map scale: place a town on the ruler or read a distance.
   ========================================================================== */

/* ---------- Grow it k times ---------- */

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const SCALE_ROUNDS = 6

export type Growth = 'length' | 'area' | 'volume'
export type ScaleContext = 'fence' | 'frame' | 'paint' | 'seeds' | 'photo' | 'water' | 'statue' | 'box'

export const CONTEXT_GROWTH: Record<ScaleContext, Growth> = { fence: 'length', frame: 'length', paint: 'area', seeds: 'area', photo: 'area', water: 'volume', statue: 'volume', box: 'volume' }
export const CONTEXT_UNIT: Record<ScaleContext, string> = { fence: 'm', frame: 'cm', paint: 'L', seeds: 'kg', photo: 'cm^{2}', water: 'L', statue: 'kg', box: 'cm^{3}' }
const POWER: Record<Growth, number> = { length: 1, area: 2, volume: 3 }

export interface ScaleRound {
    context: ScaleContext
    growth: Growth
    /** The ratio of similarity as a fraction: 3 → [3, 1], one half → [1, 2] */
    k: [number, number]
    /** The measure of the first figure; for the way back, the factor of its measure (9 for an area) */
    value: number
    /** The way back: the factor of the area or the volume is given and k is asked */
    inverse: boolean
    options: number[]
    right: number
}

const VALUES: Record<ScaleContext, number[]> = {
    fence: [12, 18, 20, 24, 30, 36, 40],
    frame: [40, 48, 60, 80, 90],
    paint: [2, 3, 4, 5, 6, 8],
    seeds: [2, 3, 4, 5, 6],
    photo: [24, 40, 54, 60, 96, 150],
    water: [2, 3, 4, 5],
    statue: [5, 8, 10, 12, 20],
    box: [10, 20, 50, 100]
}

export const scaleFactor = ([numerator, denominator]: [number, number], growth: Growth) => (numerator / denominator) ** POWER[growth]

function directRound(random: Random, context: ScaleContext, k: [number, number]): ScaleRound | null {
    const growth = CONTEXT_GROWTH[context]
    const denominator = k[1] ** POWER[growth]
    const value = pick(random, VALUES[context].map((base) => base * denominator))
    const right = value * scaleFactor(k, growth)
    // The ratio of lengths, of areas and of volumes, and adding k (or keeping the value when it shrinks)
    const traps = [1, 2, 3].filter((power) => power !== POWER[growth]).map((power) => value * (k[0] / k[1]) ** power)
    const options = [right, ...traps, k[1] === 1 ? value + k[0] : value]
    if (new Set(options).size < 4 || options.some((option) => !Number.isInteger(option * 100) || option <= 0)) return null
    const shuffled = shuffle(random, options)
    return { context, growth, k, value, inverse: false, options: shuffled, right: shuffled.indexOf(right) }
}

function inverseRound(random: Random): ScaleRound {
    const growth: Growth = pick(random, ['area', 'volume'] as const)
    const k = growth === 'area' ? randomInt(random, 2, 6) : randomInt(random, 2, 4)
    const value = k ** POWER[growth]
    // Area: k, the factor itself, half of it (or its double) and its square; volume: k, one more, k² and the factor
    const options = shuffle(random, growth === 'area' ? [k, value, value / 2 === k ? value * 2 : value / 2, value * value] : [k, k + 1, k * k, value])
    const context: ScaleContext = growth === 'area' ? 'photo' : 'box'
    return { context, growth, k: [k, 1], value, inverse: true, options, right: options.indexOf(k) }
}

export function createScaleRound(random: Random, levelIndex: number): ScaleRound {
    for (;;) {
        if (levelIndex === 2 && random() < 0.4) return inverseRound(random)
        const contexts: ScaleContext[] = levelIndex === 0 ? ['fence', 'frame', 'paint', 'seeds', 'photo'] : levelIndex === 1 ? ['water', 'statue', 'box', 'water', 'statue', 'paint', 'photo'] : ['fence', 'paint', 'photo', 'water', 'statue', 'box']
        const context = pick(random, contexts)
        const k: [number, number] = levelIndex < 2 ? [randomInt(random, 2, CONTEXT_GROWTH[context] === 'volume' ? 4 : 5), 1] : [1, CONTEXT_GROWTH[context] === 'volume' ? pick(random, [2, 3]) : pick(random, [2, 3, 4])]
        const round = directRound(random, context, k)
        if (round) return round
    }
}

export function createScaleRounds(random: Random, levelIndex: number): ScaleRound[] {
    const rounds: ScaleRound[] = []
    while (rounds.length < SCALE_ROUNDS) {
        const round = createScaleRound(random, levelIndex)
        // Not two rounds of the same context in a row, and areas or volumes in every level
        if (rounds.length > 0 && rounds[rounds.length - 1].context === round.context) continue
        rounds.push(round)
    }
    if (!rounds.some((round) => round.growth !== 'length')) return createScaleRounds(random, levelIndex)
    return rounds
}

/* ---------- Measure the tower ---------- */

export const TOWER_ROUNDS = 5
/** The highest tower of the stepper; every scene is drawn for it */
export const TOWER_MAX = 20

export type TowerMethod = 'shadow' | 'mirror' | 'sight'

export interface TowerRound {
    method: TowerMethod
    /** The stick, the height of the eyes or the stick of the line of sight, in metres */
    known: number
    /** The stick's shadow, from the person to the mirror, or from the eye to the stick */
    near: number
    /** The tower's shadow, from the mirror to the tower, or from the eye to the tower */
    far: number
    height: number
    step: number
}

const half = (value: number) => Math.abs(value * 2 - Math.round(value * 2)) < 1e-9

export function createTowerRound(random: Random, levelIndex: number, method: TowerMethod): TowerRound {
    for (;;) {
        const known = method === 'shadow' ? pick(random, levelIndex === 0 ? [1, 2] : [1.5, 2, 2.5]) : method === 'mirror' ? pick(random, [1.5, 1.6, 1.8, 2]) : pick(random, [1, 1.5, 2])
        const near = method === 'shadow' ? pick(random, levelIndex === 0 ? [1, 2, 3] : [0.5, 1.5, 2, 2.5, 3]) : method === 'mirror' ? pick(random, [1, 1.5, 2, 2.5, 3]) : pick(random, [2, 3, 4, 5])
        const ratio = randomInt(random, 3, 12)
        const far = near * ratio
        const height = known * ratio
        const step = levelIndex === 0 ? 1 : 0.5
        // Heights the stepper reaches; the tower's shadow or distance fits the scene
        if (height > TOWER_MAX || height < 4 || far > 30 || !half(far)) continue
        if (step === 1 ? !Number.isInteger(height) : !half(height)) continue
        if (levelIndex === 0 && !Number.isInteger(far)) continue
        return { method, known, near, far, height, step }
    }
}

export function createTowerRounds(random: Random, levelIndex: number): TowerRound[] {
    const methods: TowerMethod[] = levelIndex === 0 ? ['shadow', 'shadow', 'shadow', 'shadow', 'shadow'] : levelIndex === 1 ? shuffle(random, ['mirror', 'mirror', 'mirror', 'shadow', 'shadow']) : shuffle(random, ['sight', 'sight', 'sight', 'mirror', 'shadow'])
    return methods.map((method) => createTowerRound(random, levelIndex, method))
}

/** Where the scene puts the stick (or the person), the mirror and the tower, in metres from the left */
export function towerLayout(round: TowerRound) {
    if (round.method === 'shadow') {
        const towerX = round.near + 2
        return { stickX: 0, towerX, extent: towerX + round.far }
    }
    if (round.method === 'mirror') return { stickX: 0, mirrorX: round.near, towerX: round.near + round.far, extent: round.near + round.far }
    return { stickX: round.near, towerX: round.far, extent: round.far }
}

/* ---------- The map scale ---------- */

export const MAP_ROUNDS = 6
/** The ruler of the map, in centimetres */
export const RULER_CM = 10

export interface MapRound {
    /** 1 : scale */
    scale: number
    mode: 'place' | 'read'
    /** The distance on the map */
    cm: number
    unit: 'km' | 'm'
    /** The real distance in the unit */
    real: number
    /** How much one centimetre of the map is in the unit */
    perCm: number
    /** The ruler snaps to this */
    snap: number
}

export function createMapRound(random: Random, levelIndex: number, mode: 'place' | 'read'): MapRound {
    const scale = levelIndex === 0 ? pick(random, [100000, 200000]) : levelIndex === 1 ? pick(random, [50000, 250000, 500000]) : pick(random, [50, 100, 200])
    const unit = levelIndex === 2 ? 'm' : 'km'
    const perCm = unit === 'km' ? scale / 100000 : scale / 100
    const snap = levelIndex === 0 ? 1 : 0.5
    const cm = snap * randomInt(random, 2 / snap, RULER_CM / snap)
    return { scale, mode, cm, unit, real: cm * perCm, perCm, snap }
}

export function createMapRounds(random: Random, levelIndex: number): MapRound[] {
    const modes = shuffle(random, ['place', 'place', 'place', 'read', 'read', 'read'] as const)
    const rounds: MapRound[] = []
    for (const mode of modes) {
        let round = createMapRound(random, levelIndex, mode)
        // Not the same distance twice
        while (rounds.some((other) => other.cm === round.cm)) round = createMapRound(random, levelIndex, mode)
        rounds.push(round)
    }
    return rounds
}

/** k as LaTeX: 3 or \\frac{1}{2} */
export const kLatex = ([numerator, denominator]: [number, number]) => (denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`)

/** The question of a round, with its numbers */
export function scalePrompt(round: ScaleRound): LocalizedText {
    const v = tex(round.value)
    const K = `$k=${kLatex(round.k)}$`
    if (round.inverse) {
        return round.growth === 'area'
            ? say(`Argazki bat handitu da eta azalera bider $${v}$ egin da. Zein da antzekotasun-arrazoia, $k$?`, `Una foto se amplía y su área se multiplica por $${v}$. ¿Cuál es la razón de semejanza $k$?`, `كُبّرت صورة فضُربت مساحتها في $${v}$. ما نسبة التشابه $k$؟`, `A photo is enlarged and its area is multiplied by $${v}$. What is the scale factor $k$?`)
            : say(`Kaxa bat handitu da eta bolumena bider $${v}$ egin da. Zein da antzekotasun-arrazoia, $k$?`, `Una caja se amplía y su volumen se multiplica por $${v}$. ¿Cuál es la razón de semejanza $k$?`, `كُبّر صندوق فضُرب حجمه في $${v}$. ما نسبة التشابه $k$؟`, `A box is enlarged and its volume is multiplied by $${v}$. What is the scale factor $k$?`)
    }
    const prompts: Record<ScaleContext, LocalizedText> = {
        fence: say(`Hesi batek lorategi bat inguratzen du: $${v}\\ \\text{m}$. Zenbat metro hesi behar ditu ${K} arrazoiko lorategi antzeko batek?`, `Una valla rodea un jardín: $${v}\\ \\text{m}$. ¿Cuántos metros de valla necesita un jardín semejante con ${K}?`, `سياج يحيط بحديقة طوله $${v}\\ \\text{m}$. كم مترًا من السياج تحتاج حديقة مشابهة نسبتها ${K}؟`, `A fence goes round a garden: $${v}\\ \\text{m}$. How many metres of fence does a similar garden with ${K} need?`),
        frame: say(`Argazki baten markoaren perimetroa: $${v}\\ \\text{cm}$. Zein da ${K} arrazoiko kopia antzekoarena?`, `El marco de una foto mide $${v}\\ \\text{cm}$ de perímetro. ¿Y el de una copia semejante con ${K}?`, `محيط إطار صورة $${v}\\ \\text{cm}$. فما محيط إطار نسخة مشابهة نسبتها ${K}؟`, `A photo frame has a perimeter of $${v}\\ \\text{cm}$. What about a similar copy with ${K}?`),
        paint: say(`Horma bat margotzeko $${v}\\ \\text{L}$ pintura behar dira. Zenbat behar ditu ${K} arrazoiko horma antzeko batek?`, `Pintar una pared gasta $${v}\\ \\text{L}$ de pintura. ¿Cuánta gasta una pared semejante con ${K}?`, `طلاء جدار يحتاج $${v}\\ \\text{L}$ من الدهان. فكم يحتاج جدار مشابه نسبته ${K}؟`, `Painting a wall takes $${v}\\ \\text{L}$ of paint. How much does a similar wall with ${K} take?`),
        seeds: say(`Soro bat ereiteko $${v}\\ \\text{kg}$ hazi erabiltzen dira. Zenbat kg behar dira ${K} arrazoiko soro antzeko baterako?`, `Para sembrar un campo se usan $${v}\\ \\text{kg}$ de semillas. ¿Cuántos kg hacen falta para un campo semejante con ${K}?`, `لزراعة حقل نستعمل $${v}\\ \\text{kg}$ من البذور. فكم نحتاج لحقل مشابه نسبته ${K}؟`, `Sowing a field takes $${v}\\ \\text{kg}$ of seed. How many kg does a similar field with ${K} need?`),
        photo: say(`Argazki baten azalera: $${v}\\ \\text{cm}^{2}$. Zein azalera du ${K} arrazoiko kopia antzeko batek?`, `Una foto tiene un área de $${v}\\ \\text{cm}^{2}$. ¿Qué área tiene una copia semejante con ${K}?`, `مساحة صورة $${v}\\ \\text{cm}^{2}$. فما مساحة نسخة مشابهة نسبتها ${K}؟`, `A photo has an area of $${v}\\ \\text{cm}^{2}$. What is the area of a similar copy with ${K}?`),
        water: say(`Pitxer batean $${v}\\ \\text{L}$ sartzen dira. Zenbat sartzen dira ${K} arrazoiko pitxer antzeko batean?`, `En una jarra caben $${v}\\ \\text{L}$. ¿Cuánto cabe en una jarra semejante con ${K}?`, `سعة إبريق $${v}\\ \\text{L}$. فما سعة إبريق مشابه نسبته ${K}؟`, `A jug holds $${v}\\ \\text{L}$. How much does a similar jug with ${K} hold?`),
        statue: say(`Brontzezko estatua batek $${v}\\ \\text{kg}$ pisatzen ditu. Zenbat pisatzen du ${K} arrazoiko kopia antzeko batek?`, `Una estatua de bronce pesa $${v}\\ \\text{kg}$. ¿Cuánto pesa una copia semejante con ${K}?`, `وزن تمثال من البرونز $${v}\\ \\text{kg}$. فكم وزن نسخة مشابهة نسبتها ${K}؟`, `A bronze statue weighs $${v}\\ \\text{kg}$. How much does a similar copy with ${K} weigh?`),
        box: say(`Kaxa baten bolumena: $${v}\\ \\text{cm}^{3}$. Zein bolumen du ${K} arrazoiko kaxa antzeko batek?`, `Una caja tiene un volumen de $${v}\\ \\text{cm}^{3}$. ¿Qué volumen tiene una caja semejante con ${K}?`, `حجم صندوق $${v}\\ \\text{cm}^{3}$. فما حجم صندوق مشابه نسبته ${K}؟`, `A box has a volume of $${v}\\ \\text{cm}^{3}$. What is the volume of a similar box with ${K}?`)
    }
    return prompts[round.context]
}

/** The question of a map round */
export function mapPrompt(round: MapRound): LocalizedText {
    const scaleLatex = `1\\mathbin{:}${tex(round.scale)}`
    const realLatex = `${tex(round.real)}\\ \\text{${round.unit}}`
    const thing = round.unit === 'km'
        ? say('mapa', 'mapa', 'خريطة', 'map')
        : say('etxe baten planoa', 'plano de una casa', 'مخطط بيت', 'plan of a house')
    return round.mode === 'place'
        ? say(`${thing.eu.charAt(0).toUpperCase()}${thing.eu.slice(1)}, $${scaleLatex}$ eskalan. Errealitatean, A eta B $${realLatex}$ tartera daude. Sakatu erregelan B non doan.`, `Un ${thing.es} a escala $${scaleLatex}$. En la realidad, A y B están a $${realLatex}$. Pulsa en la regla dónde va B.`, `${thing.ar} بمقياس $${scaleLatex}$. في الواقع تبعد A عن B مسافة $${realLatex}$. اضغط على المسطرة حيث تقع B.`, `A ${thing.en} at scale $${scaleLatex}$. In reality, A and B are $${realLatex}$ apart. Tap the ruler where B goes.`)
        : say(`${thing.eu.charAt(0).toUpperCase()}${thing.eu.slice(1)}, $${scaleLatex}$ eskalan. Zenbat dago A-tik B-ra errealitatean?`, `Un ${thing.es} a escala $${scaleLatex}$. ¿Qué distancia hay de A a B en la realidad?`, `${thing.ar} بمقياس $${scaleLatex}$. كم المسافة الحقيقية بين A وB؟`, `A ${thing.en} at scale $${scaleLatex}$. How far is it from A to B in reality?`)
}
