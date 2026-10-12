import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { QuadraticTool } from '../../dbh2-ekuazioak-v2/lab/EquationsTools'
import { RadicalTool } from '../../dbh4-aplikatuak-ekuazioak/lab/EquationsSystemsTools'
import { equationsInequalitiesStages } from '../lessons'
import { equationsInequalitiesLabTools, type EquationsInequalitiesLabToolId } from './labTools'
import { BiquadraticTool, ExponentialTool, GraphicTool, LinearTool, RootsTool, SignTool, SystemTool, TariffsTool } from './EquationsInequalitiesTools'

const toolComponents: Record<EquationsInequalitiesLabToolId, (props: LabToolProps) => JSX.Element> = {
    quadratic: QuadraticTool,
    roots: RootsTool,
    biquadratic: BiquadraticTool,
    radical: RadicalTool,
    exponential: ExponentialTool,
    linear: LinearTool,
    tariffs: TariffsTool,
    sign: SignTool,
    graphic: GraphicTool,
    system: SystemTool
}

export function EquationsInequalitiesLaboratory(props: {
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
            tools={equationsInequalitiesLabTools}
            stages={equationsInequalitiesStages}
            components={toolComponents}
            title={{ eu: 'Ebatzi, egiaztatu eta marraztu', es: 'Resuelve, comprueba y dibuja', ar: 'حلّ وتحقّق وارسم' }}
        />
    )
}
