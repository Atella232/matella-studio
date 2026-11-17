import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { BuildTool, MachineTool } from '../../batx2-zientziak-banaketak/lab/DistributionsBatx2Tools'
import { PascalTool } from '../../dbh4-akademikoak-konbinatoria/lab/CombinatoricsAkTools'
import { discreteBatx1gStages } from '../lessons'
import { FitTool, GaltonTool, RaffleTool } from './DiscreteBatx1gTools'
import { discreteBatx1gLabTools, type DiscreteBatx1gLabToolId } from './labTools'

const toolComponents: Record<DiscreteBatx1gLabToolId, (props: LabToolProps) => JSX.Element> = {
    pascal: PascalTool,
    build: BuildTool,
    raffle: RaffleTool,
    galton: GaltonTool,
    machine: MachineTool,
    fit: FitTool
}

export function DiscreteBatx1gLaboratory(props: {
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
            tools={discreteBatx1gLabTools}
            stages={discreteBatx1gStages}
            components={toolComponents}
            title={{ eu: 'Bota, zozkatu eta doitu', es: 'Suelta, sortea y ajusta', en: 'Drop, raffle and fit', ar: 'أسقط واسحب وطابق' }}
        />
    )
}
