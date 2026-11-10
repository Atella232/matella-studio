import type { Zone } from './events.ts'

/* ==========================================================================
   The Venn diagram of two events drawn on a 360-wide board: the box, the
   two circles, the paths of the four zones (to paint or to click) and
   where the number of each zone goes. Shared by the lab tools and the
   games of the unit. Pure geometry.
   ========================================================================== */

export const VENN = { a: { x: 130, y: 112 }, b: { x: 230, y: 112 }, r: 84, box: { x: 10, y: 10, width: 340, height: 204 } }

const half = VENN.b.x - VENN.a.x
const rise = Math.sqrt(VENN.r ** 2 - (half / 2) ** 2)
const top = { x: (VENN.a.x + VENN.b.x) / 2, y: VENN.a.y - rise }
const bottom = { x: top.x, y: VENN.a.y + rise }
const r = VENN.r

export const ZONE_PATHS: Record<Zone, string> = {
    both: `M ${top.x} ${top.y} A ${r} ${r} 0 0 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 1 ${top.x} ${top.y} Z`,
    onlyA: `M ${top.x} ${top.y} A ${r} ${r} 0 1 0 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 1 ${top.x} ${top.y} Z`,
    onlyB: `M ${top.x} ${top.y} A ${r} ${r} 0 1 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 0 ${top.x} ${top.y} Z`,
    none: `M ${VENN.box.x} ${VENN.box.y} h ${VENN.box.width} v ${VENN.box.height} h ${-VENN.box.width} Z M ${top.x} ${top.y} A ${r} ${r} 0 1 0 ${bottom.x} ${bottom.y} A ${r} ${r} 0 1 0 ${top.x} ${top.y} Z`
}

/** Where the number or the label of each zone goes */
export const ZONE_SPOTS: Record<Zone, { x: number; y: number }> = {
    onlyA: { x: 88, y: 118 },
    both: { x: 180, y: 118 },
    onlyB: { x: 272, y: 118 },
    none: { x: 318, y: 200 }
}
