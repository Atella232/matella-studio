import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { PowersTool, ScientificTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { powersStages } from '../lessons'
import { powersLabTools, type PowersLabToolId } from './labTools'
import { ChangeBaseTool, CommonTool, ConjugateTool, ExtractTool, FractionalTool, LadderTool, RationalizeTool, RulesTool } from './PowersTools'

const toolComponents: Record<PowersLabToolId, (props: LabToolProps) => JSX.Element> = {
    powers: PowersTool,
    rules: RulesTool,
    scientific: ScientificTool,
    fractional: FractionalTool,
    common: CommonTool,
    extract: ExtractTool,
    rationalize: RationalizeTool,
    conjugate: ConjugateTool,
    ladder: LadderTool,
    'change-base': ChangeBaseTool
}

export function PowersLaboratory(props: {
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
            tools={powersLabTools}
            stages={powersStages}
            components={toolComponents}
            title={{ eu: 'Berretu, atera eta arrazionalizatu', es: 'Eleva, extrae y racionaliza', ar: 'ارفع وأخرج وأنطِق' }}
        />
    )
}
