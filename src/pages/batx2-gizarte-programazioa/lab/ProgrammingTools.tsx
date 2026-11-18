import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { say } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { constraintLatex, objectiveLatex, objectiveValue, pointLatex, type HalfPlane } from '../lp'
import { RegionPlane } from '../RegionPlane'
import {
    activeConstraints, BUILD_LIMITS, BUILD_SIZE, buildChallenges, buildExtra, buildShape, buildVertices, chooseConstraint, initialBuildState, setConstraint, type BuildState, type RegionShape
} from './buildRegion'
import {
    atOptimum, initialLevelState, levelChallenges, levelExtra, levelOptimum, levelValues, levelVertices, LEVEL_SCENARIOS, loadLevel, meetsRegion, setK, type LevelState
} from './levelLine'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — the two tools
   of this unit: the level line that sweeps the region (and where the
   optimum is) and a region built from up to three constraints. Logic in
   levelLine.ts and buildRegion.ts.
   ========================================================================== */

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F']

/* ---------- L1 · The level line ---------- */

export function LevelLineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LevelState>(initialLevelState)
    const scenario = LEVEL_SCENARIOS[state.scenario]
    const shown = state.prediction !== null
    const points = levelVertices(state)
    const values = levelValues(state)
    const best = levelOptimum(state)
    const bestKeys = new Set(best.at.map((point) => point.join()))
    const controls = (
        <>
            <Segmented<string> label={l(say('Adibidea', 'Ejemplo', 'المثال', 'Example'))} value={String(state.scenario)} options={LEVEL_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadLevel(Number(next)))} />
            <Stepper label="k" value={state.k} min={0} max={scenario.kMax} onChange={(k) => setState((s) => setK(s, k))} language={props.language} />
        </>
    )
    const where: LocalizedText = atOptimum(state)
        ? say('Zuzenak eskualdea uzten du hemen: optimoa da.', 'La recta deja la región aquí: es el óptimo.', 'يغادر المستقيم المنطقة هنا: هذه القيمة المثلى.', 'The line leaves the region here: it is the optimum.')
        : meetsRegion(state)
            ? say('Zuzenak eskualdea mozten du.', 'La recta corta la región.', 'المستقيم يقطع المنطقة.', 'The line cuts the region.')
            : say('Zuzena eskualdetik kanpo dago.', 'La recta está fuera de la región.', 'المستقيم خارج المنطقة.', 'The line is outside the region.')
    const readout = (
        <Predict
            language={props.language}
            question={scenario.goal === 'max' ? say('Ikusi aurretik: non dago maximoa?', 'Antes de verlo: ¿dónde está el máximo?', 'قبل أن ترى: أين القيمة العظمى؟', 'Before you see it: where is the maximum?') : say('Ikusi aurretik: non dago minimoa?', 'Antes de verlo: ¿dónde está el mínimo?', 'قبل أن ترى: أين القيمة الصغرى؟', 'Before you see it: where is the minimum?')}
            labels={scenario.choices}
            actual={scenario.answer}
            choice={state.prediction}
            tip={say('Mugitu zuzena: azkena ukitzen duen puntua da optimoa.', 'Mueve la recta: el último punto que toca es el óptimo.', 'حرّك المستقيم: آخر نقطة يلمسها هي الأمثل.', 'Move the line: the last point it touches is the optimum.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={points.map((point, index) => `F${pointLatex(point)}=${values[index]}`).join(',\\ ')} note={l(where)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={levelChallenges} extraChallenges={levelExtra} state={state}>
            <p className="fraction-v2-lab-readout-note" dir="ltr">{`${objectiveLatex(scenario.objective).replace(/\+/g, ' + ').replace('=', ' = ')} = ${state.k}`}</p>
            <RegionPlane
                label={l(say(`${scenario.name.eu}: eskualdea eta F = ${state.k} zuzena`, `${scenario.name.es}: la región y la recta F = ${state.k}`, `${scenario.name.ar}: المنطقة والمستقيم F = ${state.k}`, `${scenario.name.en}: the region and the line F = ${state.k}`))}
                constraints={scenario.constraints}
                size={scenario.size}
                cell={24}
                vertices={points.map((point, index) => ({ point, name: `${NAMES[index]} ${shown ? `(${objectiveValue(scenario.objective, point)})` : ''}`.trim(), best: shown && bestKeys.has(point.join()) }))}
                level={{ objective: scenario.objective, k: state.k }}
            />
        </ToolFrame>
    )
}

/* ---------- L2 · Build the region ---------- */

const SHAPE_WORDS: Record<RegionShape, LocalizedText> = {
    closed: say('Eskualde itxia', 'Región cerrada', 'منطقة مغلقة', 'Closed region'),
    open: say('Ixten ez den eskualdea', 'Región que no se cierra', 'منطقة لا تنغلق', 'A region that does not close'),
    empty: say('Eskualde hutsa: ez dago soluziorik', 'Región vacía: no hay solución', 'منطقة خالية: لا حل', 'Empty region: no solution')
}

export function BuildRegionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BuildState>(initialBuildState)
    const chosen = state.constraints[state.chosen]
    const points = buildVertices(state)
    const shape = buildShape(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Murrizketa', 'Restricción', 'القيد', 'Constraint'))} value={String(state.chosen)} options={[0, 1, 2].map((index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseConstraint(s, Number(next)))} />
            <Stepper label="a" value={chosen.a} min={BUILD_LIMITS.coefficient.min} max={BUILD_LIMITS.coefficient.max} onChange={(a) => setState((s) => setConstraint(s, { a }))} language={props.language} />
            <Stepper label="b" value={chosen.b} min={BUILD_LIMITS.coefficient.min} max={BUILD_LIMITS.coefficient.max} onChange={(b) => setState((s) => setConstraint(s, { b }))} language={props.language} />
            <Segmented<HalfPlane['sense']> label={l(say('Zeinua', 'Signo', 'الإشارة', 'Sign'))} value={chosen.sense} options={[{ value: '≤', label: '≤' }, { value: '≥', label: '≥' }]} onChange={(sense) => setState((s) => setConstraint(s, { sense }))} />
            <Stepper label="c" value={chosen.c} min={BUILD_LIMITS.c.min} max={BUILD_LIMITS.c.max} onChange={(c) => setState((s) => setConstraint(s, { c }))} language={props.language} />
        </>
    )
    const active = activeConstraints(state)
    const readout = (
        <Readout
            latex={[`\\begin{cases}${[...active.map(constraintLatex), 'x\\ge 0,\\ y\\ge 0'].join('\\\\ ')}\\end{cases}`, points.length ? points.map(pointLatex).join(',\\ ') : '\\varnothing']}
            note={l(say(`${SHAPE_WORDS[shape].eu}. Erpinak: ${points.length}.`, `${SHAPE_WORDS[shape].es}. Vértices: ${points.length}.`, `${SHAPE_WORDS[shape].ar}. الرؤوس: ${points.length}.`, `${SHAPE_WORDS[shape].en}. Vertices: ${points.length}.`))}
        />
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={buildChallenges} extraChallenges={buildExtra} state={state}>
            <RegionPlane
                label={l(say(`Murrizketen eskualdea; ${points.length} erpin`, `La región de las restricciones; ${points.length} vértices`, `منطقة القيود؛ ${points.length} رؤوس`, `The region of the constraints; ${points.length} vertices`))}
                constraints={active}
                size={BUILD_SIZE}
                cell={24}
                vertices={points.map((point, index) => ({ point, name: NAMES[index] }))}
            />
        </ToolFrame>
    )
}
