import type { LocalizedText, StageTone, UnitLanguage } from '../types.ts'

/* ==========================================================================
   Laboratory shared by every V2 unit: each unit lists its tools and draws
   its own models; the engine provides the picker, the tool frame, the
   controls and the challenges checked against the tool's state.
   ========================================================================== */

export interface LabToolInfo {
    id: string
    stage: string
    /** Lesson opened by "see the lesson" */
    lessonTopic: string
    title: LocalizedText
    observe: LocalizedText
}

/** Props every lab tool receives from the laboratory */
export interface LabToolProps<Tool extends LabToolInfo = LabToolInfo> {
    tool: Tool
    stageLabel: string
    tone?: StageTone
    language: UnitLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: () => void
}

/** A short goal inside a tool, checked against the tool's current state */
export interface LabChallenge<State> {
    id: number
    prompt: LocalizedText
    hint: LocalizedText
    isSolved: (state: State) => boolean
}

/** The learner's typed result in the operation tools */
export interface OperationAnswer {
    /** What the learner typed as the result */
    answer: string
    /** Whether the learner pressed "check" since last editing the answer */
    checked: boolean
    /** Whether the learner chose to see the worked result */
    revealed: boolean
}

export const freshAnswer: OperationAnswer = { answer: '', checked: false, revealed: false }
