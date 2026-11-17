import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { CausesTool, MosaicTool, PeopleTool, ZonesTool } from '../../batx2-zientziak-probabilitatea/lab/ProbabilityBatx2Tools'
import { ChooseTool, SlotsTool } from '../../dbh4-akademikoak-konbinatoria/lab/CombinatoricsAkTools'
import { DrawTool } from '../../dbh4-akademikoak-probabilitatea/lab/ProbabilityAkTools'
import { probabilityBatx2gStages } from '../lessons'
import { probabilityBatx2gLabTools, type ProbabilityBatx2gLabToolId } from './labTools'
import { PipesTool, SurveyTool } from './ProbabilityBatx2gTools'

const toolComponents: Record<ProbabilityBatx2gLabToolId, (props: LabToolProps) => JSX.Element> = {
    slots: SlotsTool,
    choose: ChooseTool,
    draw: DrawTool,
    zones: ZonesTool,
    survey: SurveyTool,
    mosaic: MosaicTool,
    pipes: PipesTool,
    causes: CausesTool,
    people: PeopleTool
}

export function ProbabilityBatx2gLaboratory(props: {
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
            tools={probabilityBatx2gLabTools}
            stages={probabilityBatx2gStages}
            components={toolComponents}
            title={{ eu: 'Zenbatu, galdetu eta isuri', es: 'Cuenta, pregunta y vierte', en: 'Count, ask and pour', ar: 'عُدّ واسأل واسكب' }}
        />
    )
}
