import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   L3 · Escala de magnitudes: the learner predicts the exponent n of the size
   of a real object, a·10ⁿ metres, then checks it on a strip of powers of ten.
   Sizes are rounded to two or three figures; they are orders of magnitude,
   not measurements. Pure state logic.
   ========================================================================== */

export interface ScaleObject {
    id: string
    name: LocalizedText
    /** Mantissa as text with the comma, 1 ≤ a < 10 */
    mantissa: string
    exponent: number
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** Sizes in metres (diameter, length or height), from the atom to the galaxy */
export const scaleObjects: ScaleObject[] = [
    { id: 'atom', name: say('Hidrogeno-atomo baten diametroa', 'El diámetro de un átomo de hidrógeno', 'قطر ذرة الهيدروجين', 'The diameter of a hydrogen atom'), mantissa: '1', exponent: -10 },
    { id: 'virus', name: say('Koronabirus baten diametroa', 'El diámetro de un coronavirus', 'قطر فيروس كورونا', 'The diameter of a coronavirus'), mantissa: '1,2', exponent: -7 },
    { id: 'cell', name: say('Globulu gorri baten diametroa', 'El diámetro de un glóbulo rojo', 'قطر كرية دم حمراء', 'The diameter of a red blood cell'), mantissa: '7', exponent: -6 },
    { id: 'hair', name: say('Ile baten lodiera', 'El grosor de un cabello', 'سُمك شعرة', 'The thickness of a hair'), mantissa: '7', exponent: -5 },
    { id: 'ant', name: say('Inurri baten luzera', 'La longitud de una hormiga', 'طول نملة', 'The length of an ant'), mantissa: '5', exponent: -3 },
    { id: 'person', name: say('Pertsona baten altuera', 'La altura de una persona', 'طول شخص', 'The height of a person'), mantissa: '1,7', exponent: 0 },
    { id: 'tower', name: say('Eiffel dorrearen altuera', 'La altura de la Torre Eiffel', 'ارتفاع برج إيفل', 'The height of the Eiffel Tower'), mantissa: '3,3', exponent: 2 },
    { id: 'everest', name: say('Everesten altuera', 'La altura del Everest', 'ارتفاع إيفرست', 'The height of Everest'), mantissa: '8,8', exponent: 3 },
    { id: 'earth', name: say('Lurraren diametroa', 'El diámetro de la Tierra', 'قطر الأرض', 'The diameter of the Earth'), mantissa: '1,27', exponent: 7 },
    { id: 'sun', name: say('Eguzkiaren diametroa', 'El diámetro del Sol', 'قطر الشمس', 'The diameter of the Sun'), mantissa: '1,39', exponent: 9 },
    { id: 'orbit', name: say('Lurretik Eguzkirako distantzia', 'La distancia de la Tierra al Sol', 'المسافة من الأرض إلى الشمس', 'The distance from the Earth to the Sun'), mantissa: '1,5', exponent: 11 },
    { id: 'lightyear', name: say('Argi-urte bat', 'Un año luz', 'سنة ضوئية', 'A light year'), mantissa: '9,46', exponent: 15 },
    { id: 'galaxy', name: say('Esne Bidearen diametroa', 'El diámetro de la Vía Láctea', 'قطر مجرة درب التبانة', 'The diameter of the Milky Way'), mantissa: '9,5', exponent: 20 }
]

export const SCALE_RANGE = { min: -11, max: 21 } as const

export interface ScaleState {
    object: number
    /** The learner's prediction of the exponent */
    guess: number
    /** The learner pressed "check" for this object and guess */
    revealed: boolean
    /** Objects guessed right so far */
    right: number[]
}

export const initialScaleState: ScaleState = { object: 5, guess: 3, revealed: false, right: [] }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Changing the object or the guess closes the answer: a new prediction is needed */
export const setScale = (state: ScaleState, patch: Partial<Pick<ScaleState, 'object' | 'guess'>>): ScaleState => ({
    ...state,
    object: clamp(patch.object ?? state.object, 0, scaleObjects.length - 1),
    guess: clamp(patch.guess ?? state.guess, SCALE_RANGE.min, SCALE_RANGE.max),
    revealed: false
})

export const scaleCorrect = (state: Pick<ScaleState, 'object' | 'guess'>) => scaleObjects[state.object].exponent === state.guess

/** Checks the prediction; a right one is remembered */
export function revealScale(state: ScaleState): ScaleState {
    const right = scaleCorrect(state) && !state.right.includes(state.object) ? [...state.right, state.object] : state.right
    return { ...state, revealed: true, right }
}

const solved = (state: ScaleState) => state.revealed && scaleCorrect(state)

export const scaleChallenges: LabChallenge<ScaleState>[] = [
    { id: 36301, prompt: say('Asmatu pertsona baten altueraren berretzailea.', 'Acierta el exponente de la altura de una persona.', 'خمّن أس ارتفاع شخص.', 'Get the exponent right for the height of a person.'), hint: say('Metro bat inguru da: $10^{0}$.', 'Es cerca de un metro: $10^{0}$.', 'نحو متر واحد: $10^{0}$.', 'It is close to one metre: $10^{0}$.'), isSolved: (state) => solved(state) && scaleObjects[state.object].id === 'person' },
    { id: 36302, prompt: say('Asmatu globulu gorri baten diametroaren berretzailea.', 'Acierta el exponente del diámetro de un glóbulo rojo.', 'خمّن أس قطر كرية الدم الحمراء.', 'Get the exponent right for the diameter of a red blood cell.'), hint: say('Milimetro baten milarena inguru da: $10^{-6}$.', 'Es una milésima de milímetro, más o menos: $10^{-6}$.', 'نحو جزء من ألف من الملّيمتر: $10^{-6}$.', 'It is about a thousandth of a millimetre: $10^{-6}$.'), isSolved: (state) => solved(state) && scaleObjects[state.object].id === 'cell' },
    { id: 36303, prompt: say('Asmatu $10^{9}$ m baino handiagoa den objektu baten berretzailea.', 'Acierta el exponente de un objeto mayor que $10^{9}$ m.', 'خمّن أس جسم أكبر من $10^{9}$ م.', 'Get the exponent right for an object larger than $10^{9}$ m.'), hint: say('Planetak, izarrak eta galaxiak oso handiak dira.', 'Los astros y las galaxias son enormes.', 'الأجرام والمجرات ضخمة جدًا.', 'Celestial bodies and galaxies are enormous.'), isSolved: (state) => solved(state) && scaleObjects[state.object].exponent >= 9 },
    { id: 36304, prompt: say('Asmatu $10^{-5}$ m baino txikiagoa den objektu baten berretzailea.', 'Acierta el exponente de un objeto menor que $10^{-5}$ m.', 'خمّن أس جسم أصغر من $10^{-5}$ م.', 'Get the exponent right for an object smaller than $10^{-5}$ m.'), hint: say('Berretzaile negatiboa: oso txikia.', 'Exponente negativo: muy pequeño.', 'أس سالب: صغير جدًا.', 'Negative exponent: very small.'), isSolved: (state) => solved(state) && scaleObjects[state.object].exponent < -5 },
    { id: 36305, prompt: say('Asmatu hiru objektu desberdinen berretzailea.', 'Acierta el exponente de tres objetos distintos.', 'خمّن أس ثلاثة أجسام مختلفة.', 'Get the exponent right for three different objects.'), hint: say('Aldatu objektua eta iragarri berriro.', 'Cambia de objeto y vuelve a predecir.', 'غيّر الجسم وتوقّع من جديد.', 'Change the object and predict again.'), isSolved: (state) => state.right.length >= 3 }
]

/** Endless practice: predict the exponent of an object picked at random. It never starts solved. */
export const scaleExtra: LabChallengeMaker<ScaleState> = (random) => {
    const index = scaleObjects.indexOf(pick(random, scaleObjects))
    const object = scaleObjects[index]
    return {
        prompt: { eu: `Asmatu honen berretzailea: ${object.name.eu.toLowerCase()}.`, es: `Acierta el exponente: ${object.name.es.charAt(0).toLowerCase()}${object.name.es.slice(1)}.`, en: `Guess the exponent: ${object.name.en.charAt(0).toLowerCase()}${object.name.en.slice(1)}.`, ar: `خمّن الأس: ${object.name.ar}.` },
        hint: { eu: `Ordena handia: $10^{${object.exponent}}$ m inguru.`, es: `Orden de magnitud: unos $10^{${object.exponent}}$ m.`, en: `Order of magnitude: about $10^{${object.exponent}}$ m.`, ar: `رتبة المقدار: نحو $10^{${object.exponent}}$ م.` },
        isSolved: (state) => state.object === index && solved(state),
        solution: { object: index, guess: object.exponent, revealed: true, right: [] }
    }
}
