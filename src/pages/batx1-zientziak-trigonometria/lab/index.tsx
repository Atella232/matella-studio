import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { WaveTool } from '../../dbh4-akademikoak-esponentzialak/lab/ExponentialAkTools'
import { CircleTool, RadianTool } from '../../dbh4-akademikoak-trigonometria/lab/TrigonometryTools'
import { trigonometryStages } from '../lessons'
import { trigonometryBatx1zLabTools, type TrigonometryBatx1zLabToolId } from './labTools'
import { SixTool, SpinTool, SumTool } from './TrigonometryTools'

const toolComponents: Record<TrigonometryBatx1zLabToolId, (props: LabToolProps) => JSX.Element> = {
    radian: RadianTool,
    six: SixTool,
    sum: SumTool,
    circle: CircleTool,
    spin: SpinTool,
    wave: WaveTool
}

export function TrigonometryBatx1zLaboratory(props: {
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
            tools={trigonometryBatx1zLabTools}
            stages={trigonometryStages}
            components={toolComponents}
            title={{ eu: 'Biratu, batu eta ebaki', es: 'Gira, suma y corta', en: 'Turn, add and cut', ar: 'أدِر واجمع واقطع' }}
        />
    )
}
