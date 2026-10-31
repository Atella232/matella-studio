import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-aljebra-v2/lab/Algebra2Lab.css'
import { AreaTool, MachineTool, TilesTool } from '../../dbh2-aljebra-v2/lab/AlgebraTools'
import { RuffiniTool } from '../../dbh4-aplikatuak-polinomioak/lab/PolynomialsTools'
import { polynomialsStages } from '../lessons'
import { polynomials3LabTools, type Polynomials3LabToolId } from './labTools'
import { ChipsTool, FactorTool, RemainderTool, SquareTool } from './PolynomialTools'

const toolComponents: Record<Polynomials3LabToolId, (props: LabToolProps) => JSX.Element> = {
    chips: ChipsTool,
    machine: MachineTool,
    tiles: TilesTool,
    area: AreaTool,
    square: SquareTool,
    ruffini: RuffiniTool,
    remainder: RemainderTool,
    factor: FactorTool
}

export function Polynomials3Laboratory(props: {
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
            tools={polynomials3LabTools}
            stages={polynomialsStages}
            components={toolComponents}
            title={{ eu: 'Fitxak, karratuak eta hondarrak', es: 'Fichas, cuadrados y restos', en: 'Chips, squares and remainders', ar: 'رقاقات ومربعات وبواقٍ' }}
        />
    )
}
