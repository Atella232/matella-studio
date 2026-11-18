import type { UnitStage } from '../../features/unit-v2/types.ts'

/* The five stages of Sistemak · Batxilergoa 2 · Gizarte Zientziak, apart so that content.ts and the tests can import them */

export type GizarteSistemakStageId = 'gauss' | 'rouche' | 'cramer' | 'discussion' | 'problems'

export const gizarteSistemakStages: UnitStage[] = [
    { id: 'gauss', tone: 'blue', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' } },
    { id: 'rouche', tone: 'violet', title: { eu: 'Rouché-Frobenius', es: 'Rouché-Frobenius', en: 'Rouché–Frobenius', ar: 'روشيه-فروبينيوس' } },
    { id: 'cramer', tone: 'mustard', title: { eu: 'Cramer eta homogeneoak', es: 'Cramer y homogéneos', en: 'Cramer and homogeneous', ar: 'كرامر والأنظمة المتجانسة' } },
    { id: 'discussion', tone: 'coral', title: { eu: 'Parametro baten araberako eztabaida', es: 'Discusión según un parámetro', en: 'Discussing with a parameter', ar: 'المناقشة حسب وسيط' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]
