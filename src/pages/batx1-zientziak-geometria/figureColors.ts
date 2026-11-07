import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types.ts'

/* Geometria analitikoa · Batxilergoa 1 · Zientziak — colours and text helpers of the lesson figures (kept apart
   from figureKit.tsx, which only exports components). */

export type Point = [number, number]

export const INK = 'var(--ink, #1d2733)'
export const MUTED = 'var(--muted, #58616e)'
export const STAGE = 'var(--stage, #2f6fdb)'
export const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
export const SECOND = 'var(--second, #c4432a)'
export const GREEN = 'var(--success, #267b53)'
export const GREEN_TINT = 'var(--success-tint, #d9efe2)'
export const CARD = 'var(--card, #fffcf6)'
export const PAPER = '#fffcf6'
export const MUSTARD_TINT = '#fbebc0'
export const SERIF = 'Fraunces, serif'

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
export const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
