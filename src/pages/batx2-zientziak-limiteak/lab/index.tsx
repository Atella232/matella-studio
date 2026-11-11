import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BolzanoTool, DegreesTool, HoleTool, LensTool } from '../../batx1-zientziak-limiteak/lab/BachLimitsTools'
import { EMachineTool } from '../../batx1-zientziak-segidak/lab/BachSequencesTools'
import { bach2LimitsStages } from '../lessons'
import { EpsilonTool, InfinityRaceTool, JointsTool, TheoremTool } from './Bach2LimitsTools'
import { bach2LimitsLabTools, type Bach2LimitsLabToolId } from './labTools'

const toolComponents: Record<Bach2LimitsLabToolId, (props: LabToolProps) => JSX.Element> = {
    lens: LensTool,
    hole: HoleTool,
    degrees: DegreesTool,
    epsilon: EpsilonTool,
    race: InfinityRaceTool,
    'e-machine': EMachineTool,
    joints: JointsTool,
    theorem: TheoremTool,
    bolzano: BolzanoTool
}

export function Bach2LimitsLaboratory(props: {
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
            tools={bach2LimitsLabTools}
            stages={bach2LimitsStages}
            components={toolComponents}
            title={{ eu: 'Bandak, lasterketak eta teoremak', es: 'Bandas, carreras y teoremas', en: 'Bands, races and theorems', ar: 'أشرطة وسباقات ومبرهنات' }}
        />
    )
}
