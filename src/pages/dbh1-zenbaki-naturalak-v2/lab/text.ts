import type { UnitLanguage } from '../../../features/unit-v2/types.ts'

/** Names of the orders of units, from the units up to the millions */
export const placeNames: Record<UnitLanguage, string[]> = {
    eu: ['unitateak', 'hamarrekoak', 'ehunekoak', 'milakoak', 'hamar milakoak', 'ehun milakoak', 'milioiak'],
    es: ['unidades', 'decenas', 'centenas', 'unidades de millar', 'decenas de millar', 'centenas de millar', 'unidades de millón'],
    ar: ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف', 'مئات الآلاف', 'ملايين']
}
