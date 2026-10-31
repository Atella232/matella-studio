import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ChainTool, CompoundTool, InterestTool, ShareTool } from '../../dbh2-proportzionaltasuna-v2/lab/ProportionDbh2Tools'
import { PercentBarTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/PercentBarTool'
import { MixtureTool, MotionTool, TapsTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/ProportionDbh4ApTools'
import { RuleTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/RuleTool'
import { proportion3Stages } from '../lessons'
import { proportion3LabTools, type Proportion3LabToolId } from './labTools'
import { GearsTool, MapTool, RecipeTool, RectangleTool } from './ProportionTools'

const toolComponents: Record<Proportion3LabToolId, (props: LabToolProps) => JSX.Element> = {
    recipe: RecipeTool,
    map: MapTool,
    rule: RuleTool,
    gears: GearsTool,
    rectangle: RectangleTool,
    compound: CompoundTool,
    share: ShareTool,
    percentbar: PercentBarTool,
    chain: ChainTool,
    interest: InterestTool,
    mixture: MixtureTool,
    motion: MotionTool,
    taps: TapsTool
}

export function Proportion3Laboratory(props: {
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
            tools={proportion3LabTools}
            stages={proportion3Stages}
            components={toolComponents}
            title={{ eu: 'Errezetak, mapak eta engranajeak', es: 'Recetas, mapas y engranajes', en: 'Recipes, maps and gears', ar: 'وصفات وخرائط وتروس' }}
        />
    )
}
