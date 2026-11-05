import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { BounceTool, EndlessBarTool, FrogTool, GaussTool, SticksTool } from '../../dbh3-segidak/lab/SequencesTools'
import { bachSequencesStages } from '../lessons'
import { EMachineTool, FibonacciTool, LimitBandTool } from './BachSequencesTools'
import { bachSequencesLabTools, type BachSequencesLabToolId } from './labTools'

const toolComponents: Record<BachSequencesLabToolId, (props: LabToolProps) => JSX.Element> = {
    sticks: SticksTool,
    fibonacci: FibonacciTool,
    frog: FrogTool,
    gauss: GaussTool,
    bounce: BounceTool,
    bar: EndlessBarTool,
    'limit-band': LimitBandTool,
    'e-machine': EMachineTool
}

export function BachSequencesLaboratory(props: {
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
            tools={bachSequencesLabTools}
            stages={bachSequencesStages}
            components={toolComponents}
            title={{ eu: 'Hazi, hurbildu eta batu', es: 'Crece, acércate y suma', en: 'Grow, close in and add up', ar: 'انمُ واقترب واجمع' }}
        />
    )
}
