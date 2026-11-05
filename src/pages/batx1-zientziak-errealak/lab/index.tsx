import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { PythagorasTool } from '../../dbh4-akademikoak-errealak/lab/PercentTools'
import { PascalTool } from '../../dbh4-akademikoak-konbinatoria/lab/CombinatoricsAkTools'
import { ChangeBaseTool, CommonTool, ConjugateTool, ExtractTool } from '../../dbh4-akademikoak-potentziak/lab/PowersTools'
import { IntervalsTool, RoundingTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { bachRealsStages } from '../lessons'
import { DistanceTool, ErrorBandTool, SlideRuleTool } from './BachRealsTools'
import { bachRealsLabTools, type BachRealsLabToolId } from './labTools'

const toolComponents: Record<BachRealsLabToolId, (props: LabToolProps) => JSX.Element> = {
    pythagoras: PythagorasTool,
    distance: DistanceTool,
    intervals: IntervalsTool,
    'error-band': ErrorBandTool,
    rounding: RoundingTool,
    extract: ExtractTool,
    common: CommonTool,
    conjugate: ConjugateTool,
    'slide-rule': SlideRuleTool,
    'change-base': ChangeBaseTool,
    pascal: PascalTool
}

export function BachRealsLaboratory(props: {
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
            tools={bachRealsLabTools}
            stages={bachRealsStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, hurbildu eta biderkatu', es: 'Mide, aproxima y multiplica', en: 'Measure, approximate and multiply', ar: 'قِس وقرّب واضرب' }}
        />
    )
}
