import type { ReactNode } from 'react'
import type { UnitLanguage } from '../../features/unit-v2/types'
import type { GraphSpec } from './functions'
import { GraphFigure } from './graphs'

/* Funtzioak (2. DBH) — turns the GraphSpec of an exercise into the figure the engine draws. */

type WithGraph = { graph?: GraphSpec; solutionGraph?: GraphSpec }
type Drawn = { figure?: (language: UnitLanguage) => ReactNode; solutionFigure?: (language: UnitLanguage) => ReactNode }

const draw = (spec?: GraphSpec) => (spec ? (language: UnitLanguage) => <GraphFigure spec={spec} language={language} /> : undefined)

/** Gives each exercise that carries a graph the figure the engine draws under its prompt */
export function withGraphs<T extends WithGraph>(items: T[]): Array<T & Drawn> {
    return items.map((item) => ({ ...item, figure: draw(item.graph), solutionFigure: draw(item.solutionGraph) }))
}
