import type { UnitStage } from '../../features/unit-v2/types.ts'

/* The five stages of Programazio lineala · Batxilergoa 2 · Gizarte Zientziak, apart so that content.ts and the tests can import them */

export type ProgramazioaStageId = 'regions' | 'feasible' | 'objective' | 'cases' | 'problems'

export const programazioaStages: UnitStage[] = [
    { id: 'regions', tone: 'blue', title: { eu: 'Inekuazioak eta eskualdeak', es: 'Inecuaciones y regiones', en: 'Inequalities and regions', ar: 'المتراجحات والمناطق' } },
    { id: 'feasible', tone: 'violet', title: { eu: 'Eskualde bideragarria', es: 'La región factible', en: 'The feasible region', ar: 'المنطقة الممكنة' } },
    { id: 'objective', tone: 'mustard', title: { eu: 'Helburu-funtzioa', es: 'La función objetivo', en: 'The objective function', ar: 'دالة الهدف' } },
    { id: 'cases', tone: 'coral', title: { eu: 'Soluzio motak', es: 'Tipos de solución', en: 'Kinds of solution', ar: 'أنواع الحلول' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]
