import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { TransformTool } from '../../batx1-zientziak-funtzioak/lab/BachFunctionsTools'
import { EMachineTool, LimitBandTool } from '../../batx1-zientziak-segidak/lab/BachSequencesTools'
import { JoinTool } from '../../dbh4-akademikoak-funtzioak/lab/FunctionsAkTools'
import { bachLimitsStages } from '../lessons'
import { BolzanoTool, DegreesTool, HoleTool, LensTool } from './BachLimitsTools'
import { bachLimitsLabTools, type BachLimitsLabToolId } from './labTools'

const toolComponents: Record<BachLimitsLabToolId, (props: LabToolProps) => JSX.Element> = {
    lens: LensTool,
    hole: HoleTool,
    degrees: DegreesTool,
    'limit-band': LimitBandTool,
    'e-machine': EMachineTool,
    transform: TransformTool,
    join: JoinTool,
    bolzano: BolzanoTool
}

export function BachLimitsLaboratory(props: {
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
            tools={bachLimitsLabTools}
            stages={bachLimitsStages}
            components={toolComponents}
            title={{ eu: 'Hurbildu, sinplifikatu eta harrapatu', es: 'Acércate, simplifica y atrapa', en: 'Close in, simplify and trap', ar: 'اقترب واختصر واحصر' }}
        />
    )
}
