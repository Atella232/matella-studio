import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ProportionTool } from '../../dbh2-zatikiak-prototype/lab/ProportionTool'
import { proportionStages } from '../lessons'
import { proportionLabTools, PERCENT_MODES, percentChallenges, type ProportionLabToolId } from './labTools'
import { ChangeTool, ClassifyTool, RatioTool, SolveTool, TableTool, UnitTool } from './ProportionTools'

const toolComponents: Record<ProportionLabToolId, (props: LabToolProps) => JSX.Element> = {
    ratio: RatioTool,
    proportion: SolveTool,
    classify: ClassifyTool,
    table: TableTool,
    unit: UnitTool,
    percent: (props) => <ProportionTool {...props} modes={PERCENT_MODES} challenges={percentChallenges} />,
    change: ChangeTool
}

export function ProportionLaboratory(props: {
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
            tools={proportionLabTools}
            stages={proportionStages}
            components={toolComponents}
            title={{ eu: 'Bikoitza → bikoitza ala erdia?', es: '¿Doble → doble o mitad?', ar: 'الضعف ← الضعف أم النصف؟' }}
        />
    )
}
