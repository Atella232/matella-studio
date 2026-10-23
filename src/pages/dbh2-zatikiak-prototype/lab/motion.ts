/* Timing shared by the moving models and the tools that wait for them */

/** Milliseconds between one group and the next as a bar merges: the whole merge takes under a second */
export const mergePace = (groups: number) => Math.min(140, 900 / groups)

/** How long a bar of `parts` takes to merge in groups of `group` */
export const mergeDuration = (parts: number, group: number) => (group > 1 ? (parts / group - 1) * mergePace(parts / group) + 450 : 0)
