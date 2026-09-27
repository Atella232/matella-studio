import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { CriteriaTool } from '../../dbh2-zatigarritasuna/lab/CriteriaTool'
import '../../dbh2-zatigarritasuna/lab/DivisibilityLab.css'
import { JumpsTool } from '../../dbh2-zatigarritasuna/lab/JumpsTool'
import { LadderTool } from '../../dbh2-zatigarritasuna/lab/LadderTool'
import { RectanglesTool } from '../../dbh2-zatigarritasuna/lab/RectanglesTool'
import { SieveTool } from '../../dbh2-zatigarritasuna/lab/SieveTool'
import { SortTool } from '../../dbh2-zatigarritasuna/lab/SortTool'
import { VennTool } from '../../dbh2-zatigarritasuna/lab/VennTool'
import { divisibilityIntroStages } from '../lessons'
import {
    divisibilityIntroLabTools,
    INTRO_CRITERIA,
    introCriteriaChallenges,
    introJumpsChallenges,
    introLadderChallenges,
    introRectanglesChallenges,
    introSieveChallenges,
    introSortChallenges,
    introVennChallenges,
    type DivisibilityIntroLabToolId
} from './labTools'
import { TableTool } from './TableTool'
import './IntroDivisibilityLab.css'

/** The 2. DBH tools with first-year challenges, plus the divisor table */
const toolComponents: Record<DivisibilityIntroLabToolId, (props: LabToolProps) => JSX.Element> = {
    rectangles: (props) => <RectanglesTool {...props} challenges={introRectanglesChallenges} />,
    jumps: (props) => <JumpsTool {...props} challenges={introJumpsChallenges} />,
    criteria: (props) => <CriteriaTool {...props} criteria={INTRO_CRITERIA} challenges={introCriteriaChallenges} />,
    sieve: (props) => <SieveTool {...props} challenges={introSieveChallenges} />,
    ladder: (props) => <LadderTool {...props} challenges={introLadderChallenges} />,
    table: TableTool,
    venn: (props) => <VennTool {...props} challenges={introVennChallenges} />,
    sort: (props) => <SortTool {...props} challenges={introSortChallenges} />
}

export function DivisibilityIntroLaboratory(props: {
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
            tools={divisibilityIntroLabTools}
            stages={divisibilityIntroStages}
            components={toolComponents}
            title={{ eu: 'Ikusi zenbakiak barrutik', es: 'Mira los números por dentro', ar: 'انظر إلى الأعداد من الداخل' }}
        />
    )
}
