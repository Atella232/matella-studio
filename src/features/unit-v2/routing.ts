import type { UnitSection } from './types.ts'
import { unitV2Paths } from './paths.ts'

export type PracticeMode = 'guided' | 'bank'

/** Where the address points inside a unit */
export interface UnitLocation {
    section: UnitSection
    practiceMode: PracticeMode
    /** Second segment: lesson (learn), lab tool (lab) or lesson whose stage frames the practice */
    detail?: string
}

/** First slug is the canonical one; the rest are Spanish and legacy addresses that still open the section */
const slugs: Array<{ section: UnitSection; mode?: PracticeMode; names: string[] }> = [
    { section: 'diagnostic', names: ['diagnostikoa', 'diagnostico'] },
    { section: 'learn', names: ['teoria'] },
    { section: 'lab', names: ['laborategia', 'laboratorio'] },
    { section: 'practice', mode: 'guided', names: ['praktika', 'practica'] },
    { section: 'practice', mode: 'bank', names: ['ariketak', 'ejercicios'] },
    { section: 'challenges', names: ['erronkak', 'retos', 'misioa'] },
    { section: 'play', names: ['jokuak', 'juegos'] }
]

/** Root of the unit that contains the address (the address itself if no unit matches) */
export function unitBasePath(pathname: string): string {
    return unitV2Paths.find((path) => pathname === path || pathname.startsWith(`${path}/`)) ?? pathname.replace(/\/+$/, '')
}

export function parseUnitPath(pathname: string): UnitLocation {
    const [first, second] = pathname.slice(unitBasePath(pathname).length).split('/').filter(Boolean)
    const match = slugs.find((slug) => slug.names.includes(first ?? ''))
    if (!match) return { section: 'route', practiceMode: 'guided' }
    return { section: match.section, practiceMode: match.mode ?? 'guided', detail: second }
}

/** Canonical address of a section, optionally with a lesson or tool */
export function unitPathFor(base: string, section: UnitSection, detail?: string, practiceMode: PracticeMode = 'guided'): string {
    if (section === 'route') return base
    const slug = slugs.find((item) => item.section === section && (section !== 'practice' || item.mode === practiceMode))
    const path = `${base}/${slug?.names[0] ?? ''}`
    return detail ? `${path}/${detail}` : path
}

export function sectionForPath(pathname: string): UnitSection {
    return parseUnitPath(pathname).section
}

export function practiceModeForPath(pathname: string): PracticeMode {
    return parseUnitPath(pathname).practiceMode
}
