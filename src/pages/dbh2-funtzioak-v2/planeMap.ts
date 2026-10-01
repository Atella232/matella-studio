/* Funtzioak (2. DBH) — plane geometry, kept apart from the SVG components so the tests can load it. */

export interface PlaneBox {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
}

export interface PlaneMap {
    box: PlaneBox
    /** Pixels per unit */
    cell: number
    x: (value: number) => number
    y: (value: number) => number
    width: number
    height: number
}

/** Maps plane coordinates to pixels; (ox, oy) is where the top-left corner of the box lands */
export function planeMap(box: PlaneBox, cell: number, ox = 0, oy = 0): PlaneMap {
    return {
        box,
        cell,
        x: (value) => ox + (value - box.xMin) * cell,
        y: (value) => oy + (box.yMax - value) * cell,
        width: (box.xMax - box.xMin) * cell,
        height: (box.yMax - box.yMin) * cell
    }
}

export const minusSign = (value: number) => (value < 0 ? `−${Math.abs(value)}` : String(value))
