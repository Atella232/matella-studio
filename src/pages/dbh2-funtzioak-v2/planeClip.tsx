import { useId, type ReactNode } from 'react'
import type { PlaneMap } from './planeMap'

/* Funtzioak (2. DBH) — the clip that keeps a plane's lines inside its box. */

/** A clipPath that keeps lines inside the box; returns its url() for clipPath= */
export function useBoxClip(map: PlaneMap): [ReactNode, string] {
    const id = `plane-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const left = map.x(map.box.xMin)
    const top = map.y(map.box.yMax)
    return [<clipPath id={id} key={id}><rect x={left} y={top} width={map.width} height={map.height} /></clipPath>, `url(#${id})`]
}
