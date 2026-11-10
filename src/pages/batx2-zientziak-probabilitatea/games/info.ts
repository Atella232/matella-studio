import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { probabilityAkGames } from '../../dbh4-akademikoak-probabilitatea/games/info.ts'

/* ==========================================================================
   Probabilitatea (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (independent, exclusive or neither;
   fill in the Venn diagram; who did it?, which ranks the causes given the
   outcome; and the detective of 2.º), the race and the memory, and the
   tree and the contingency table of 4. DBH académicas kept for the review,
   with their texts and levels but the progress ids of this unit.
   ========================================================================== */

export type ProbabilityBatx2GameId = 'race' | 'relation' | 'venn' | 'culprit' | 'detective' | 'memory' | 'tree' | 'table'

export const PROBABILITY_BATX2_GAME_RECORDS_KEY = 'matella-probabilitatea-batx2z-game-records'

const treeSource = probabilityAkGames.find((game) => game.id === 'tree')!
const tableSource = probabilityAkGames.find((game) => game.id === 'table')!

export const probabilityBatx2Games: GameInfo<ProbabilityBatx2GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Probabilitatearen lasterketa', es: 'Carrera de probabilidad', en: 'Probability race', ar: 'سباق الاحتمالات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Lau zirkuitu, etapa bakoitzeko bat', es: 'Cuatro circuitos, uno por etapa', en: 'Four circuits, one per stage', ar: 'أربع حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 128401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Laplace, zuhaitzak eta konbinazioak.', es: 'Laplace, árboles y combinaciones.', en: 'Laplace, trees and combinations.', ar: 'لابلاس والأشجار والتوافيق.' } },
            { progressId: 128402, stage: 'events', title: { eu: 'Gertaeren aljebra', es: 'Álgebra de sucesos', en: 'Algebra of events', ar: 'جبر الأحداث' }, description: { eu: 'Bildura, diferentzia eta De Morgan.', es: 'Unión, diferencia y De Morgan.', en: 'Union, difference and De Morgan.', ar: 'الاتحاد والفرق ودي مورغان.' } },
            { progressId: 128403, stage: 'conditional', title: { eu: 'Baldintzatua', es: 'Condicionada', en: 'Conditional', ar: 'المشروط' }, description: { eu: 'Formula, biderkadura eta independentzia.', es: 'La fórmula, el producto y la independencia.', en: 'The formula, the product and independence.', ar: 'الصيغة والضرب والاستقلال.' } },
            { progressId: 128404, stage: 'bayes', title: { eu: 'Osoa eta Bayes', es: 'Total y Bayes', en: 'Total and Bayes', ar: 'الكلي وبايز' }, description: { eu: 'Bi kausa eta haien a posteriori probabilitateak.', es: 'Dos causas y sus probabilidades a posteriori.', en: 'Two causes and their posterior probabilities.', ar: 'سببان واحتمالاهما البعديان.' } }
        ]
    },
    {
        id: 'relation',
        title: { eu: 'Independenteak, bateraezinak ala ez bata ez bestea?', es: '¿Independientes, incompatibles o ninguna de las dos?', en: 'Independent, mutually exclusive or neither?', ar: 'مستقلان أم متنافيان أم لا هذا ولا ذاك؟' },
        tagline: { eu: 'Datu batzuekin, erabaki nolakoak diren bi gertaera: biderkaduraren proba ala zati komunik ez.', es: 'Con unos datos, decide cómo son dos sucesos: la prueba del producto o ninguna parte común.', en: 'With some data, decide what two events are like: the product test or no common part.', ar: 'ببعض المعطيات قرّر طبيعة حدثين: اختبار الضرب أو لا جزء مشترك.' },
        skills: { eu: 'Independentzia eta bateraezintasuna', es: 'Independencia e incompatibilidad', en: 'Independence and mutual exclusion', ar: 'الاستقلال والتنافي' },
        levels: [
            { progressId: 128501, stage: 'conditional', title: { eu: 'Ebakidura', es: 'La intersección', en: 'The intersection', ar: 'التقاطع' }, description: { eu: 'P(A), P(B) eta P(A ∩ B).', es: 'P(A), P(B) y P(A ∩ B).', en: 'P(A), P(B) and P(A ∩ B).', ar: 'P(A) وP(B) وP(A ∩ B).' } },
            { progressId: 128502, stage: 'conditional', title: { eu: 'Bildura', es: 'La unión', en: 'The union', ar: 'الاتحاد' }, description: { eu: 'Lehenik, ebakidura kalkulatu.', es: 'Primero, calcula la intersección.', en: 'First, work out the intersection.', ar: 'أولًا احسب التقاطع.' } },
            { progressId: 128503, stage: 'conditional', title: { eu: 'Baldintzatua', es: 'La condicionada', en: 'The conditional', ar: 'المشروط' }, description: { eu: 'P(B/A) eta P(B) konparatu.', es: 'Compara P(B/A) con P(B).', en: 'Compare P(B/A) with P(B).', ar: 'قارن P(B/A) بـ P(B).' } }
        ]
    },
    {
        id: 'venn',
        title: { eu: 'Bete Venn diagrama', es: 'Rellena el Venn', en: 'Fill in the Venn diagram', ar: 'املأ مخطط فن' },
        tagline: { eu: 'Hiru datu, lau zona: aurkitu galderaren zona, De Morganekin eta aurkakoekin.', es: 'Tres datos, cuatro zonas: halla la zona que se pregunta, con De Morgan y los contrarios.', en: 'Three data, four zones: find the zone asked for, with De Morgan and the complements.', ar: 'ثلاث معطيات وأربع مناطق: جد المنطقة المطلوبة بدي مورغان والمعاكسات.' },
        skills: { eu: 'Probabilitateak beste batzuetatik', es: 'Probabilidades a partir de otras', en: 'Probabilities from other probabilities', ar: 'احتمالات من احتمالات أخرى' },
        levels: [
            { progressId: 128601, stage: 'events', title: { eu: 'Zonak', es: 'Las zonas', en: 'The zones', ar: 'المناطق' }, description: { eu: 'P(A), P(B) eta ebakidura emanda.', es: 'Con P(A), P(B) y la intersección.', en: 'Given P(A), P(B) and the intersection.', ar: 'مع P(A) وP(B) والتقاطع.' } },
            { progressId: 128602, stage: 'events', title: { eu: 'Bildura eta diferentzia', es: 'Unión y diferencia', en: 'Union and difference', ar: 'الاتحاد والفرق' }, description: { eu: 'Ebakidura ez da ematen.', es: 'La intersección no se da.', en: 'The intersection is not given.', ar: 'التقاطع غير معطى.' } },
            { progressId: 128603, stage: 'events', title: { eu: 'De Morgan', es: 'De Morgan', en: 'De Morgan', ar: 'دي مورغان' }, description: { eu: 'Aurkakoak eta gertaera konposatuak.', es: 'Contrarios y sucesos compuestos.', en: 'Complements and compound events.', ar: 'المعاكسات والأحداث المركّبة.' } }
        ]
    },
    {
        id: 'culprit',
        title: { eu: 'Nork egin du?', es: '¿Quién fue?', en: 'Who did it?', ar: 'من الفاعل؟' },
        tagline: { eu: 'Pieza bat akastuna da: zein makinatatik dator ziurrenik? Gehien ekoizten duena edo gehien huts egiten duena ez da beti.', es: 'Una pieza ha salido defectuosa: ¿de qué máquina viene con más probabilidad? No siempre es la que más fabrica ni la que más falla.', en: 'A part is faulty: which machine most likely made it? It is not always the one that makes most or the one that fails most.', ar: 'قطعة معيبة: من أي آلة جاءت على الأرجح؟ ليست دائمًا الأكثر إنتاجًا ولا الأكثر خطأ.' },
        skills: { eu: 'Bayesen teorema', es: 'El teorema de Bayes', en: 'Bayes\' theorem', ar: 'مبرهنة بايز' },
        levels: [
            { progressId: 128701, stage: 'bayes', title: { eu: 'Bi makina', es: 'Dos máquinas', en: 'Two machines', ar: 'آلتان' }, description: { eu: 'Bide bat edo bestea.', es: 'Un camino u otro.', en: 'One path or the other.', ar: 'مسار أو آخر.' } },
            { progressId: 128702, stage: 'bayes', title: { eu: 'Hiru makina', es: 'Tres máquinas', en: 'Three machines', ar: 'ثلاث آلات' }, description: { eu: 'Hiru bide konparatu.', es: 'Compara tres caminos.', en: 'Compare three paths.', ar: 'قارن ثلاثة مسارات.' } },
            { progressId: 128703, stage: 'bayes', title: { eu: 'Akatsa ala ez', es: 'Defectuosa o no', en: 'Faulty or not', ar: 'معيبة أم لا' }, description: { eu: 'Batzuetan pieza ona da.', es: 'A veces la pieza está bien.', en: 'Sometimes the part is fine.', ar: 'أحيانًا تكون القطعة سليمة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Probabilitatearen detektibea', es: 'Detective de probabilidad', en: 'Probability detective', ar: 'مخبر الاحتمالات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Batxilergoko 2. mailako akats tipikoak', es: 'Los errores típicos de 2.º de Bachillerato', en: 'The typical mistakes of 2nd Bachillerato', ar: 'الأخطاء الشائعة في البكالوريا الثانية' },
        levels: [
            { progressId: 128751, stage: 'events', title: { eu: 'Gertaerak', es: 'Sucesos', en: 'Events', ar: 'الأحداث' }, description: { eu: 'Diferentzia, De Morgan eta «bat bakarrik».', es: 'Diferencia, De Morgan y «solo uno».', en: 'Difference, De Morgan and ‘only one’.', ar: 'الفرق ودي مورغان و«واحد فقط».' } },
            { progressId: 128752, stage: 'conditional', title: { eu: 'Baldintzatua', es: 'Condicionada', en: 'Conditional', ar: 'المشروط' }, description: { eu: 'Zatitu, independentzia eta aurkakoa.', es: 'Dividir, independencia y contrario.', en: 'Dividing, independence and the complement.', ar: 'القسمة والاستقلال والمعاكس.' } },
            { progressId: 128753, stage: 'bayes', title: { eu: 'Bayes', es: 'Bayes', en: 'Bayes', ar: 'بايز' }, description: { eu: 'A priori probabilitatea, alderantzizkoa eta bi denbora.', es: 'La a priori, al revés y dos tiempos.', en: 'The prior, the other way round and two stages.', ar: 'القبلي والعكس والمرحلتان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: probabilitate bat eta haren aurkakoa, biderkaduraren erregela edo Bayesen zatidura.', es: 'Encuentra las parejas: una probabilidad y su contraria, la regla del producto o el cociente de Bayes.', en: 'Find the pairs: a probability and its complement, the multiplication rule or the quotient of Bayes.', ar: 'جد الأزواج: احتمال ومعاكسه، أو قاعدة الضرب، أو خارج قسمة بايز.' },
        skills: { eu: 'Aurkakoak, biderkadurak eta Bayes', es: 'Contrarios, productos y Bayes', en: 'Complements, products and Bayes', ar: 'المعاكسات والجداءات وبايز' },
        levels: [
            { progressId: 128801, stage: 'events', title: { eu: 'Aurkakoak', es: 'Contrarios', en: 'Complements', ar: 'المعاكسات' }, description: { eu: 'P(A ∪ B) ↔ P(Ā ∩ B̄)', es: 'P(A ∪ B) ↔ P(Ā ∩ B̄)', en: 'P(A ∪ B) ↔ P(Ā ∩ B̄)', ar: 'P(A ∪ B) ↔ P(Ā ∩ B̄)' } },
            { progressId: 128802, stage: 'conditional', title: { eu: 'Biderkadura', es: 'Producto', en: 'Product', ar: 'الضرب' }, description: { eu: 'P(A), P(B/A) ↔ P(A ∩ B)', es: 'P(A), P(B/A) ↔ P(A ∩ B)', en: 'P(A), P(B/A) ↔ P(A ∩ B)', ar: 'P(A), P(B/A) ↔ P(A ∩ B)' } },
            { progressId: 128803, stage: 'bayes', title: { eu: 'Bayes', es: 'Bayes', en: 'Bayes', ar: 'بايز' }, description: { eu: 'Bide bat zati guztiak', es: 'Un camino entre todos', en: 'One path over all of them', ar: 'مسار على الكل' } }
        ]
    },
    // The 4. DBH tree and contingency table, with this unit's stages and progress ids
    { ...treeSource, id: 'tree', levels: treeSource.levels.map((level, index) => ({ ...level, stage: 'review', progressId: 128811 + index })) },
    { ...tableSource, id: 'table', levels: tableSource.levels.map((level, index) => ({ ...level, stage: 'conditional', progressId: 128821 + index })) }
]

export const probabilityBatx2GameProgressIds: number[] = levelProgressIds(probabilityBatx2Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const probabilityBatx2GameSlugs: Record<ProbabilityBatx2GameId, string> = { race: 'lasterketa', relation: 'independenteak', venn: 'venn', culprit: 'nork', detective: 'detektibea', memory: 'memoria', tree: 'zuhaitza', table: 'taula' }

export function probabilityBatx2GameModeForPath(pathname: string): ProbabilityBatx2GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['independenteak', 'independientes'].includes(game)) return 'relation'
    if (['venn', 'rellena-venn'].includes(game)) return 'venn'
    if (['nork', 'quien-fue'].includes(game)) return 'culprit'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zuhaitza', 'arbol'].includes(game)) return 'tree'
    if (['taula', 'tabla'].includes(game)) return 'table'
    return 'hub'
}
