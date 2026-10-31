import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · El mapa a escala: the learner picks a scale 1 : n and stretches the
   ruler along a route on the map, in halves of a centimetre. The real
   distance is the map distance times n, in centimetres, and then has to be
   changed into metres or kilometres. Before it is shown, the learner
   predicts whether it is less than, exactly or more than 1 km. Pure state
   logic; distances are kept in metres, which are always whole here.
   ========================================================================== */

export const MAP_SCALES = [5000, 10000, 25000, 50000, 100000, 200000] as const
export const MAP_HALVES = { min: 1, max: 24 } as const

export interface MapState {
    /** Index in MAP_SCALES */
    scale: number
    /** The ruler, in halves of a centimetre: 7 is 3,5 cm */
    halves: number
    prediction: Prediction | null
}

export const initialMapState: MapState = { scale: 3, halves: 3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMap(state: MapState, patch: Partial<Omit<MapState, 'prediction'>>): MapState {
    const scale = clamp(patch.scale ?? state.scale, 0, MAP_SCALES.length - 1)
    const halves = clamp(patch.halves ?? state.halves, MAP_HALVES.min, MAP_HALVES.max)
    const same = scale === state.scale && halves === state.halves
    return { scale, halves, prediction: same ? state.prediction : null }
}

export const mapCentimetres = (state: MapState) => state.halves / 2
/** The real distance in centimetres: map · n */
export const mapRealCentimetres = (state: MapState) => mapCentimetres(state) * MAP_SCALES[state.scale]
/** The real distance in metres (always whole: n is a multiple of 200) */
export const mapRealMetres = (state: MapState) => mapRealCentimetres(state) / 100
/** Less than, exactly or more than 1 km? */
export const mapPrediction = (state: MapState): Prediction => compareTo(mapRealMetres(state), 1000)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** 50000 as 50\,000 inside LaTeX */
export const groupedLatex = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')
const scaleLatex = (index: number) => `1\\mathbin{:}${groupedLatex(MAP_SCALES[index])}`
const dec = (value: number) => String(value).replace('.', '{,}')
/** A real distance for a prompt, in LaTeX: 750 m or 2,5 km */
const distanceLatex = (metres: number) => (metres < 1000 ? `${metres}\\ \\mathrm{m}` : `${dec(metres / 1000)}\\ \\mathrm{km}`)

const at = (scale: number, halves: number) => (state: MapState) => state.scale === scale && state.halves === halves

export const mapChallenges: LabChallenge<MapState>[] = [
    { id: 87301, prompt: say('$1\\mathbin{:}50\\,000$ eskalan, neurtu 2 km benetan.', 'A escala $1\\mathbin{:}50\\,000$, mide 2 km reales.', 'بمقياس $1\\mathbin{:}50\\,000$ قِس 2 كم حقيقية.', 'At a scale of $1\\mathbin{:}50\\,000$, measure 2 km in real life.'), hint: say('2 km = $200\\,000$ cm. Zatitu $50\\,000$ zenbakiaz.', '2 km son $200\\,000$ cm. Divide entre $50\\,000$.', '2 كم = $200\\,000$ سم. اقسم على $50\\,000$.', '2 km is $200\\,000$ cm. Divide by $50\\,000$.'), isSolved: at(3, 8) },
    { id: 87302, prompt: say('Mapako 6 cm benetako 12 km izan daitezen, aukeratu eskala.', 'Elige la escala para que 6 cm del mapa sean 12 km reales.', 'اختر المقياس لتكون 6 سم على الخريطة 12 كم حقيقية.', 'Choose the scale so that 6 cm on the map is 12 km in real life.'), hint: say('12 km = $1\\,200\\,000$ cm, eta $1\\,200\\,000\\mathbin{:}6=200\\,000$.', '12 km son $1\\,200\\,000$ cm, y $1\\,200\\,000\\mathbin{:}6=200\\,000$.', '12 كم = $1\\,200\\,000$ سم و$1\\,200\\,000\\mathbin{:}6=200\\,000$.', '12 km is $1\\,200\\,000$ cm, and $1\\,200\\,000\\mathbin{:}6=200\\,000$.'), isSolved: at(5, 12) },
    { id: 87303, prompt: say('$1\\mathbin{:}10\\,000$ eskalan, neurtu 750 m benetan.', 'A escala $1\\mathbin{:}10\\,000$, mide 750 m reales.', 'بمقياس $1\\mathbin{:}10\\,000$ قِس 750 م حقيقية.', 'At a scale of $1\\mathbin{:}10\\,000$, measure 750 m in real life.'), hint: say('750 m = $75\\,000$ cm.', '750 m son $75\\,000$ cm.', '750 م = $75\\,000$ سم.', '750 m is $75\\,000$ cm.'), isSolved: at(1, 15) },
    { id: 87304, prompt: say('Neurtu justu 1 km benetan, mapan 4 cm erabiliz.', 'Mide exactamente 1 km real usando 4 cm del mapa.', 'قِس 1 كم حقيقيًا تمامًا باستعمال 4 سم من الخريطة.', 'Measure exactly 1 km in real life using 4 cm of the map.'), hint: say('$100\\,000\\mathbin{:}4=25\\,000$.', '$100\\,000\\mathbin{:}4=25\\,000$.', '$100\\,000\\mathbin{:}4=25\\,000$.', '$100\\,000\\mathbin{:}4=25\\,000$.'), isSolved: at(2, 8) },
    { id: 87305, prompt: say('Lortu benetako distantzia handiena mapako 5 cm-rekin.', 'Consigue la mayor distancia real con 5 cm del mapa.', 'احصل على أكبر مسافة حقيقية بخمسة سنتيمترات من الخريطة.', 'Get the greatest real distance with 5 cm of the map.'), hint: say('Eskalaren zenbakia zenbat eta handiagoa, orduan eta lur gehiago cm bakoitzeko.', 'Cuanto mayor es el número de la escala, más terreno cabe en cada cm.', 'كلما كبر عدد المقياس اتسع كل سنتيمتر لأرض أكثر.', 'The bigger the scale number, the more ground fits in each cm.'), isSolved: at(5, 10) }
]

/** Endless practice: a real distance to measure at a given scale */
const mapMaker: LabChallengeMaker<MapState> = (random) => {
    const scale = randomInt(random, 0, MAP_SCALES.length - 1)
    const halves = pick(random, [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20])
    const metres = mapRealMetres({ scale, halves, prediction: null })
    return {
        prompt: say(`$${scaleLatex(scale)}$ eskalan, neurtu $${distanceLatex(metres)}$ benetan.`, `A escala $${scaleLatex(scale)}$, mide $${distanceLatex(metres)}$ reales.`, `بمقياس $${scaleLatex(scale)}$ قِس $${distanceLatex(metres)}$ حقيقية.`, `At a scale of $${scaleLatex(scale)}$, measure $${distanceLatex(metres)}$ in real life.`),
        hint: say(`Pasatu cm-tara: $${groupedLatex(metres * 100)}$ cm. Zatitu $${groupedLatex(MAP_SCALES[scale])}$ zenbakiaz.`, `Pásalo a cm: $${groupedLatex(metres * 100)}$ cm. Divide entre $${groupedLatex(MAP_SCALES[scale])}$.`, `حوّلها إلى سنتيمترات: $${groupedLatex(metres * 100)}$ سم. اقسم على $${groupedLatex(MAP_SCALES[scale])}$.`, `Change it into cm: $${groupedLatex(metres * 100)}$ cm. Divide by $${groupedLatex(MAP_SCALES[scale])}$.`),
        isSolved: at(scale, halves),
        solution: { scale, halves, prediction: null }
    }
}

export const mapExtra = freshFrom(initialMapState, mapMaker)
