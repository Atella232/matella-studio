import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { combinatoricsAkStages } from '../lessons'
import { ChooseTool, FactorialTool, GridTool, LettersTool, PascalTool, SlotsTool, TreeTool } from './CombinatoricsAkTools'
import { combinatoricsAkLabTools, type CombinatoricsAkLabToolId } from './labTools'

const toolComponents: Record<CombinatoricsAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    tree: TreeTool,
    factorial: FactorialTool,
    slots: SlotsTool,
    letters: LettersTool,
    choose: ChooseTool,
    pascal: PascalTool,
    grid: GridTool
}

export function CombinatoricsAkLaboratory(props: {
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
            tools={combinatoricsAkLabTools}
            stages={combinatoricsAkStages}
            components={toolComponents}
            title={{ eu: 'Zenbatu idatzi gabe', es: 'Cuenta sin escribir', ar: 'عُدّ دون أن تكتب' }}
        />
    )
}
