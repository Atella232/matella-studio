import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { bachStatsLessonTexts } from '../batx1-zientziak-estatistika/lessonTexts.ts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — what
   changes in the lessons borrowed from 1.º Ciencias. Ciencias gives the
   class mark as the percentile of grouped data; Sociales (Anaya) and this
   unit interpolate on the cumulative percentage polygon (owner's choice,
   2026-11-17). So the borrowed lesson «Quartiles and percentiles» keeps
   everything but the last sentence of its explanation, which points to
   the lessons that interpolate. The Ciencias file is not edited.
   ========================================================================== */

const grouped: LocalizedText = {
    eu: 'Datu multzokatuetan ehuneko metatuen poligonoan interpolatzen da: hurrengo ikasgaietan ikusiko duzu.',
    es: 'Con datos agrupados se interpola en el polígono de porcentajes acumulados: lo verás en las lecciones siguientes.',
    en: 'With grouped data you interpolate on the cumulative percentage polygon: you will see it in the next lessons.',
    ar: 'ومع البيانات المبوّبة نستكمل على مضلّع النسب المتجمّعة: ستراه في الدروس التالية.'
}

const original = bachStatsLessonTexts['quartiles-percentiles'].explanation
const ending: LocalizedText = {
    eu: 'Datu multzokatuetan tartearen marka ematen da.',
    es: 'En datos agrupados se da la marca del intervalo.',
    en: 'For grouped data you give the class mark.',
    ar: 'وفي البيانات المبوّبة نعطي مركز الفئة.'
}

/** The explanation of «Quartiles and percentiles» with the sentence on grouped data changed */
export const quartilesExplanation: LocalizedText = {
    eu: original.eu.replace(ending.eu, grouped.eu),
    es: original.es.replace(ending.es, grouped.es),
    en: original.en.replace(ending.en, grouped.en),
    ar: original.ar.replace(ending.ar, grouped.ar)
}
