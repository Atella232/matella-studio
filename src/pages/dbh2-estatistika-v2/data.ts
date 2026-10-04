import type { LocalizedText } from '../../features/unit-v2/types'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — the data sets that run through
   the lessons: books read in summer by 20 students (discrete), heights of
   30 students in intervals (continuous) and how 40 students come to school.
   ========================================================================== */

/** Books read in summer: value → number of students (N = 20, mean 1,8, median 2, mode 1) */
export const bookSurvey = [
    { value: 0, count: 3 },
    { value: 1, count: 6 },
    { value: 2, count: 5 },
    { value: 3, count: 4 },
    { value: 4, count: 2 }
]

/** Heights of 30 students in centimetres, grouped in intervals [from, to) (mean 162) */
export const heightClasses = [
    { from: 140, to: 150, count: 3 },
    { from: 150, to: 160, count: 9 },
    { from: 160, to: 170, count: 12 },
    { from: 170, to: 180, count: 6 }
]

/** How 40 students come to school, in percentages */
export const transportSurvey: Array<{ name: LocalizedText; percent: number }> = [
    { name: { eu: 'Oinez', es: 'A pie', ar: 'مشيًا' }, percent: 45 },
    { name: { eu: 'Autobusez', es: 'En autobús', ar: 'بالحافلة' }, percent: 30 },
    { name: { eu: 'Autoz', es: 'En coche', ar: 'بالسيارة' }, percent: 15 },
    { name: { eu: 'Bizikletaz', es: 'En bici', ar: 'بالدراجة' }, percent: 10 }
]
