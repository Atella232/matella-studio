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

export type SegmentTone = 'first' | 'second' | 'removed' | ''

/** Units of equal pieces, each piece painted with its own tone (used for sums and differences) */
export function SegmentBars({ units, label }: { units: SegmentTone[][]; label: string }) {
    return (
        <div className="fraction-v2-segment-bars" role="img" aria-label={label}>
            {units.map((pieces, unit) => (
                <div className="fraction-v2-segment-bar" key={unit}>
                    {pieces.map((tone, piece) => <span className={tone} key={piece} />)}
                </div>
            ))}
        </div>
    )
}
