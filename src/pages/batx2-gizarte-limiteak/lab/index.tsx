import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { DegreesTool, HoleTool, LensTool } from '../../batx1-zientziak-limiteak/lab/BachLimitsTools'
import { JointsTool } from '../../batx2-zientziak-limiteak/lab/Bach2LimitsTools'
import { JoinTool } from '../../dbh4-akademikoak-funtzioak/lab/FunctionsAkTools'
import { bach2gLimitsStages } from '../lessons'
import { AverageCostTool, CompoundTool, TariffTool } from './Bach2gLimitsTools'
import { bach2gLimitsLabTools, type Bach2gLimitsLabToolId } from './labTools'

const toolComponents: Record<Bach2gLimitsLabToolId, (props: LabToolProps) => JSX.Element> = {
    lens: LensTool,
    degrees: DegreesTool,
    compound: CompoundTool,
    hole: HoleTool,
    join: JoinTool,
    joints: JointsTool,
    'average-cost': AverageCostTool,
    tariff: TariffTool
}

export function Bach2gLimitsLaboratory(props: {
    language: UnitLanguage
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}) {
    return (
        <LabShell
            {...props}
            tools={bach2gLimitsLabTools}
            stages={bach2gLimitsStages}
            components={toolComponents}
            title={{ eu: 'Kostuak, tarifak eta interesak', es: 'Costes, tarifas e intereses', en: 'Costs, tariffs and interest', ar: 'تكاليف وتعريفات وفوائد' }}
        />
    )
}
