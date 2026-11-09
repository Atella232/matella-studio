import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { GaussMachineTool } from '../../batx1-zientziak-sistemak/lab/BachSystemsTools'
import { matrizeakStages } from '../lessons'
import { matrizeakLabTools, type MatrizeakLabToolId } from './labTools'
import { GaussJordanTool, RankSliderTool, RouteMapTool, RowColumnTool } from './MatricesTools'

const toolComponents: Record<MatrizeakLabToolId, (props: LabToolProps) => JSX.Element> = {
    'row-column': RowColumnTool,
    'route-map': RouteMapTool,
    'gauss-machine': GaussMachineTool,
    'rank-slider': RankSliderTool,
    'gauss-jordan': GaussJordanTool
}

export function MatrizeakLaboratory(props: {
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
            tools={matrizeakLabTools}
            stages={matrizeakStages}
            components={toolComponents}
            title={{ eu: 'Biderkatu, mailakatu eta alderantzikatu', es: 'Multiplica, escalona e invierte', en: 'Multiply, reduce and invert', ar: 'اضرب وحوّل واعكس' }}
        />
    )
}
