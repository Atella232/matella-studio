import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { Movement } from './where.ts'

/* ==========================================================================
   How each movement of «Where does it land?» is written, with its
   formula in LaTeX. Kept apart from the component so that the tests can
   render every text.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export function movementText(movement: Movement): LocalizedText {
    if (movement.kind === 'translation') {
        const v = `$\\vec{v}=(${movement.vector[0]},${movement.vector[1]})$`
        return say(`Lekualdaketa: ${v}`, `Traslación: ${v}`, `انسحاب: ${v}`, `Translation: ${v}`)
    }
    if (movement.kind === 'rotation') {
        const angle = `$${movement.angle}°$`
        return say(`Biraketa: ${angle}, zentroa $O$`, `Giro: ${angle}, centro $O$`, `دوران: ${angle}، المركز $O$`, `Rotation: ${angle}, centre $O$`)
    }
    if (movement.kind === 'central') {
        const centre = `$(${movement.centre[0]},${movement.centre[1]})$`
        return say(`Simetria zentrala: ${centre}`, `Simetría central: ${centre}`, `تناظر مركزي: ${centre}`, `Central symmetry: ${centre}`)
    }
    const axis = movement.axis
    const line = axis.kind === 'diagonal' ? '$y=x$' : axis.kind === 'horizontal' ? (axis.at === 0 ? '$X$' : `$y=${axis.at}$`) : axis.at === 0 ? '$Y$' : `$x=${axis.at}$`
    return say(`Simetria axiala: ${line}`, `Simetría axial: ${line}`, `تناظر محوري: ${line}`, `Reflection: ${line}`)
}
