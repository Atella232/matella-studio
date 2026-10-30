import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ExponentialTool } from '../../dbh4-aplikatuak-grafikoa/lab/GraphsTools'
import { LadderTool } from '../../dbh4-akademikoak-potentziak/lab/PowersTools'
import { CircleTool } from '../../dbh4-akademikoak-trigonometria/lab/TrigonometryTools'
import { exponentialAkStages } from '../lessons'
import { GrowthTool, LogShiftTool, ShiftTool, WaveTool } from './ExponentialAkTools'
import { exponentialAkLabTools, type ExponentialAkLabToolId } from './labTools'

const toolComponents: Record<ExponentialAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    exponential: ExponentialTool,
    shift: ShiftTool,
    growth: GrowthTool,
    ladder: LadderTool,
    'log-shift': LogShiftTool,
    circle: CircleTool,
    wave: WaveTool
}

export function ExponentialAkLaboratory(props: {
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
            tools={exponentialAkLabTools}
            stages={exponentialAkStages}
            components={toolComponents}
            title={{ eu: 'Hazi, tolestu eta uhindu', es: 'Crece, invierte y ondula', en: 'Grow, flip and wave.', ar: 'انمُ واعكس وتموّج' }}
        />
    )
}
