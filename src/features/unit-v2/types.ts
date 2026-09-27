import type { ReactNode } from 'react'
import type { AnswerForm, FractionValue } from './math/fraction.ts'

/* ==========================================================================
   Unit engine (V2): every unit (Zatikiak, Zenbaki osoak…) describes its
   content with these types and the engine renders the same experience:
   route, diagnostic, lessons, practice, challenges, lab and games.
   ========================================================================== */

export type UnitLanguage = 'eu' | 'es' | 'ar'

export interface LocalizedText {
    eu: string
    es: string
    ar: string
}

export type UnitSection = 'route' | 'diagnostic' | 'learn' | 'lab' | 'practice' | 'challenges' | 'play'

/** The five notebook colours; each stage of a unit takes one */
export type StageTone = 'blue' | 'violet' | 'mustard' | 'coral' | 'green'

export interface UnitStage {
    id: string
    tone: StageTone
    title: LocalizedText
}

/** One rule, step or case of a lesson, shown as its own card */
export interface LessonStep {
    title?: LocalizedText
    text: LocalizedText
    /** Short worked formula for this step, in LaTeX between $…$ (per language when notation differs) */
    math?: string | LocalizedText
}

export interface UnitTopic {
    id: string
    stage: string
    title: LocalizedText
    goal: LocalizedText
    explanation: LocalizedText
    /**
     * Rules, steps or cases that would otherwise crowd the explanation.
     * 'steps' are numbered and done in order; 'facts' are independent ideas.
     */
    steps?: LessonStep[]
    stepsKind?: 'steps' | 'facts'
    /** Exercise that the numbered steps solve, shown above them so the student knows where they are going */
    problem?: LocalizedText
    /** Worked example, in LaTeX between $…$; per language when the notation differs (Div / Zat) */
    example: string | LocalizedText
    takeaway: LocalizedText
    /** Optional model drawn under the explanation (a number line, a thermometer…) */
    figure?: (language: UnitLanguage) => ReactNode
}

export interface PracticeItem {
    id: number
    stage: string
    prompt: LocalizedText
    expression?: string
    expected: FractionValue
    /** Written form required by the prompt; defaults to any equivalent value */
    answerForm?: AnswerForm
    hint: LocalizedText
    explanation: LocalizedText
}

export interface ChallengeItem extends PracticeItem {
    points: number
    context: 'starter' | 'advanced' | 'master'
}

export interface DiagnosticQuestion {
    id: number
    prompt: LocalizedText
    options: LocalizedText[]
    correctIndex: number
    explanation: LocalizedText
    topic: string
}

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard'

export interface ExerciseItem {
    id: number
    difficulty: ExerciseDifficulty
    question: LocalizedText
    solution: LocalizedText
}

export interface ExerciseSection {
    id: string
    title: LocalizedText
    items: ExerciseItem[]
}

/** How a unit talks about written answers (fractions and integers are written differently) */
export interface AnswerMessages {
    /** Shown above guided practice and challenges */
    note: LocalizedText
    placeholder: (form: AnswerForm) => LocalizedText
    wrongForm: (form: AnswerForm) => LocalizedText
    unreadable: LocalizedText
    /** Default written form of this unit's answers */
    defaultForm: AnswerForm
    inputMode: 'decimal' | 'text' | 'numeric'
    /** Rewrites an answer before it is checked (e.g. drops the point in 15.000) */
    normalizeInput?: (input: string) => string
}

export interface LabRenderProps {
    language: UnitLanguage
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}

export interface GamesRenderProps {
    language: UnitLanguage
    pathname: string
    completedIds: number[]
    onComplete: (id: number) => void
}

export interface UnitDefinition {
    /** Prefix of every progress key in localStorage */
    storagePrefix: string
    coursePath: string
    courseTitle: LocalizedText
    title: LocalizedText
    documentTitle: LocalizedText
    tagline: LocalizedText
    heroArt: ReactNode
    pathSubtitle: LocalizedText
    stages: UnitStage[]
    topics: UnitTopic[]
    answers: AnswerMessages
    /** Advice after a wrong answer in practice, per stage */
    errorByStage: Record<string, LocalizedText>
    diagnostic?: DiagnosticQuestion[]
    guidedPractice?: PracticeItem[]
    exerciseBank?: ExerciseSection[]
    challenges?: ChallengeItem[]
    lab?: {
        description: LocalizedText
        /** Progress ids that count towards the unit (usually the tools' challenges) */
        progressIds: number[]
        /** Lab tool that best illustrates each lesson */
        toolForTopic: Record<string, string | undefined>
        render: (props: LabRenderProps) => ReactNode
    }
    games?: {
        description: LocalizedText
        progressIds: number[]
        /** localStorage key of the game records, cleared with the rest of the progress */
        recordsKey?: string
        render: (props: GamesRenderProps) => ReactNode
    }
}

export function normalizeUnitLanguage(language: string): UnitLanguage {
    if (language.startsWith('ar')) return 'ar'
    if (language.startsWith('es')) return 'es'
    return 'eu'
}

export function pickText(language: UnitLanguage, text: LocalizedText): string {
    return text[language]
}

/** Text that may be the same in every language (a formula) or change with it */
export function pickMaybeText(language: UnitLanguage, text: string | LocalizedText): string {
    return typeof text === 'string' ? text : text[language]
}

export const unitSections: Array<{ id: UnitSection; label: LocalizedText }> = [
    { id: 'route', label: { eu: 'Ibilbidea', es: 'Ruta', ar: 'المسار' } },
    { id: 'diagnostic', label: { eu: 'Diagnostikoa', es: 'Diagnóstico', ar: 'التشخيص' } },
    { id: 'learn', label: { eu: 'Ikasi', es: 'Aprende', ar: 'تعلّم' } },
    { id: 'lab', label: { eu: 'Laborategia', es: 'Laboratorio', ar: 'المختبر' } },
    { id: 'practice', label: { eu: 'Praktikatu', es: 'Practica', ar: 'تدرّب' } },
    { id: 'challenges', label: { eu: 'Erronkak', es: 'Retos', ar: 'التحديات' } },
    { id: 'play', label: { eu: 'Jolastu', es: 'Juega', ar: 'العب' } }
]

/** Sections a unit actually offers, in navigation order */
export function availableSections(unit: UnitDefinition): UnitSection[] {
    return unitSections
        .map((section) => section.id)
        .filter((id) => {
            if (id === 'diagnostic') return Boolean(unit.diagnostic?.length)
            if (id === 'lab') return Boolean(unit.lab)
            if (id === 'practice') return Boolean(unit.guidedPractice?.length || unit.exerciseBank?.length)
            if (id === 'challenges') return Boolean(unit.challenges?.length)
            if (id === 'play') return Boolean(unit.games)
            return true
        })
}

export function exerciseBankSize(unit: UnitDefinition): number {
    return (unit.exerciseBank ?? []).reduce((total, section) => total + section.items.length, 0)
}

/** Everything that counts towards the progress ring of the unit */
export function totalGoals(unit: UnitDefinition): number {
    return (unit.diagnostic?.length ?? 0)
        + unit.topics.length
        + (unit.guidedPractice?.length ?? 0)
        + exerciseBankSize(unit)
        + (unit.challenges?.length ?? 0)
        + (unit.games?.progressIds.length ?? 0)
        + (unit.lab?.progressIds.length ?? 0)
}
