import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import { learningStages, type PrototypeLanguage } from '../content'
import { labTools, type LabToolId, type ToolProps } from './labTools'
import { PartsTool } from './PartsTool'
import { ProportionTool } from './ProportionTool'
import { CompareTool } from './CompareTool'
import { EquivalenceTool } from './EquivalenceTool'
import { ProductTool } from './ProductTool'
import { SumTool } from './SumTool'
import { NumberLineTool } from './NumberLineTool'
import { WallTool } from './WallTool'
import './Lab.css'

const toolComponents: Record<LabToolId, (props: ToolProps) => JSX.Element> = {
    parts: PartsTool,
    numberline: NumberLineTool,
    wall: WallTool,
    equivalence: EquivalenceTool,
    compare: CompareTool,
    addsub: SumTool,
    muldiv: ProductTool,
    proportion: ProportionTool
}

export function FractionLaboratory({
    language,
    tool,
    onToolChange,
    completedIds,
    onComplete,
    onOpenLesson
}: {
    language: PrototypeLanguage
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}) {
    return (
        <LabShell
            language={language}
            tools={labTools}
            stages={learningStages}
            components={toolComponents}
            title={{ eu: 'Ikusi balioa, ez soilik ikurra', es: 'Observa el valor, no solo el símbolo', ar: 'شاهد القيمة لا الرمز فقط' }}
            tool={tool}
            onToolChange={onToolChange}
            completedIds={completedIds}
            onComplete={onComplete}
            onOpenLesson={onOpenLesson}
        />
    )
}
