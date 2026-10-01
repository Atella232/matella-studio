import type { ReactNode } from 'react'
import type { UnitLanguage } from '../../features/unit-v2/types'
import { LineSpecFigure } from './lineFigure'
import type { LineSpec } from './realLineMap'

/* Zenbaki errealak (4. DBH) — turns the LineSpec of an exercise into the figure the engine draws. */

type WithLine = { line?: LineSpec; solutionLine?: LineSpec }
type Drawn = { figure?: (language: UnitLanguage) => ReactNode; solutionFigure?: (language: UnitLanguage) => ReactNode }

const draw = (spec?: LineSpec) => (spec ? (language: UnitLanguage) => <LineSpecFigure spec={spec} language={language} /> : undefined)

/** Gives each exercise that carries a real line the figure the engine draws under its prompt */
export function withLines<T extends WithLine>(items: T[]): Array<T & Drawn> {
    return items.map((item) => ({ ...item, figure: draw(item.line), solutionFigure: draw(item.solutionLine) }))
}
