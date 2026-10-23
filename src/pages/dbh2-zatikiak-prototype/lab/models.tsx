import type { CSSProperties } from 'react'
import { mergePace } from './motion'
import './Motion.css'

/**
 * One unit split into `parts`, the first `filled` coloured. `ghostPerPart` draws
 * dashed lines inside every part, showing how it splits into smaller pieces.
 */
export function PartitionBar({
    parts,
    filled,
    ghostPerPart = 1,
    tone = 'stage',
    label
}: {
    parts: number
    filled: number
    ghostPerPart?: number
    tone?: 'stage' | 'second'
    label: string
}) {
    const pieces = Array.from({ length: parts }, (_, index) => index)
    const ghosts = Array.from({ length: Math.max(0, ghostPerPart - 1) }, (_, index) => index + 1)
    return (
        <div className={`fraction-v2-partition ${tone === 'second' ? 'second' : ''}`} role="img" aria-label={label}>
            {pieces.map((piece) => (
                <span className={piece < filled ? 'filled' : ''} key={piece}>
                    {ghosts.map((ghost) => (
                        <i style={{ left: `${(ghost / ghostPerPart) * 100}%` }} key={ghost} aria-hidden="true" />
                    ))}
                </span>
            ))}
        </div>
    )
}

/**
 * One unit split into `parts`, the first `filled` coloured, with its pieces
 * joined in groups of `group`: the lines inside each group turn dashed, one
 * group after another, so simplifying is seen as pieces merging. The end
 * state is the same picture as a PartitionBar of parts/group parts with
 * `group` ghosts in each.
 */
export function MergeBar({ parts, filled, group, label }: { parts: number; filled: number; group: number; label: string }) {
    const groups = parts / group
    const pace = mergePace(groups)
    return (
        <div className="fraction-v2-partition fraction-v2-merge" role="img" aria-label={label}>
            {Array.from({ length: parts }, (_, piece) => <span className={piece < filled ? 'filled' : ''} key={piece} />)}
            {Array.from({ length: parts - 1 }, (_, index) => {
                const cut = index + 1
                const inner = cut % group !== 0
                return (
                    <b
                        className={`${inner ? 'inner' : ''} ${cut < filled ? 'on-filled' : ''}`}
                        style={{ insetInlineStart: `${(cut / parts) * 100}%`, '--delay': `${Math.floor(cut / group) * pace}ms` } as CSSProperties}
                        key={`${parts}:${cut}`}
                        aria-hidden="true"
                    />
                )
            })}
            {group > 1 && Array.from({ length: groups }, (_, index) => (
                <em
                    style={{ insetInlineStart: `${(index / groups) * 100}%`, width: `${100 / groups}%`, '--delay': `${index * pace}ms` } as CSSProperties}
                    key={`${parts}:${group}:${index}`}
                    aria-hidden="true"
                />
            ))}
        </div>
    )
}

export type SegmentTone = 'first' | 'second' | 'removed' | ''

/** Units of equal pieces, each piece painted with its own tone (used for sums and differences) */
export function SegmentBars({ units, label }: { units: SegmentTone[][]; label: string }) {
    const flat = units.flat()
    const perUnit = units[0]?.length ?? 0
    // Each piece's turn among those of its own tone: the added pieces arrive
    // from the first one on, the pieces taken away go from the last one back
    const order = (unit: number, piece: number) => {
        const index = unit * perUnit + piece
        const tone = flat[index]
        return tone === 'removed'
            ? flat.slice(index + 1).filter((item) => item === tone).length
            : flat.slice(0, index).filter((item) => item === tone).length
    }
    return (
        <div className="fraction-v2-segment-bars" role="img" aria-label={label}>
            {units.map((pieces, unit) => {
                // The added pieces come in together from the end of the unit, as a train hooks on
                const firstSecond = pieces.indexOf('second')
                return (
                    <div className="fraction-v2-segment-bar" key={unit}>
                        {pieces.map((tone, piece) => (
                            <span
                                className={tone}
                                key={piece}
                                style={tone ? { '--i': order(unit, piece), '--shift': tone === 'second' ? pieces.length - firstSecond : 0 } as CSSProperties : undefined}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
