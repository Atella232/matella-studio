import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { anglesDistancesStages } from '../lessons'
import { anglesDistancesLabTools, type AnglesDistancesLabToolId } from './labTools'
import { FootTool, MirrorTool, ProtractorTool, RulerTool, SkewBoxTool } from './DistancesTools'

const toolComponents: Record<AnglesDistancesLabToolId, (props: LabToolProps) => JSX.Element> = {
    protractor: ProtractorTool,
    foot: FootTool,
    mirror: MirrorTool,
    ruler: RulerTool,
    'skew-box': SkewBoxTool
}

export function AnglesDistancesLaboratory(props: {
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
            tools={anglesDistancesLabTools}
            stages={anglesDistancesStages}
            components={toolComponents}
            title={{ eu: 'Garraiagailua, oina, ispilua, erregela eta kutxa', es: 'El transportador, el pie, el espejo, la regla y la caja', en: 'The protractor, the foot, the mirror, the ruler and the box', ar: 'المنقلة والمسقط والمرآة والمسطرة والصندوق' }}
        />
    )
}
