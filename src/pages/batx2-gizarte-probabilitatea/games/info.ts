import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { probabilityBatx2Games } from '../../batx2-zientziak-probabilitatea/games/info.ts'

/* ==========================================================================
   Probabilitatea (Batxilergoa 2 · Gizarte Zientziak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star. Three games of its own (which cells do I divide?, does
   the order matter?, and the detective of this unit), the race (its own
   counting circuit and the three of 2.º Ciencias) and the memory, and
   «fill in the Venn diagram» and «who did it?» of 2.º Ciencias, with their
   texts and levels but the progress ids of this unit.
   ========================================================================== */

export type ProbabilityBatx2gGameId = 'race' | 'divide' | 'order' | 'detective' | 'venn' | 'culprit' | 'memory'

export const PROBABILITY_BATX2G_GAME_RECORDS_KEY = 'matella-probabilitatea-batx2g-game-records'

const fromCiencias = (id: string) => probabilityBatx2Games.find((game) => game.id === id)!
const raceSource = fromCiencias('race')
const memorySource = fromCiencias('memory')
const vennSource = fromCiencias('venn')
const culpritSource = fromCiencias('culprit')

export const probabilityBatx2gGames: GameInfo<ProbabilityBatx2gGameId>[] = [
    {
        ...raceSource,
        id: 'race',
        levels: [
            { progressId: 150401, stage: 'counting', title: { eu: 'Zenbatzen', es: 'Contar', en: 'Counting', ar: 'العدّ' }, description: { eu: 'Karguak, kodeak, ilarak eta batzordeak.', es: 'Cargos, códigos, colas y comisiones.', en: 'Posts, codes, queues and committees.', ar: 'المناصب والرموز والطوابير واللجان.' } },
            { ...raceSource.levels[1], progressId: 150402 },
            { ...raceSource.levels[2], progressId: 150403 },
            { ...raceSource.levels[3], progressId: 150404 }
        ]
    },
    {
        id: 'divide',
        title: { eu: 'Zeren artean zatitu?', es: '¿Entre cuántos divido?', en: 'What do I divide by?', ar: 'على ماذا أقسم؟' },
        tagline: { eu: 'Inkesta baten taula eta galdera bat: ukitu goian doan laukia eta behean doana.', es: 'La tabla de una encuesta y una pregunta: toca la casilla que va arriba y la que va abajo.', en: 'The table of a poll and a question: tap the cell that goes on top and the one that goes below.', ar: 'جدول استطلاع وسؤال: المس الخانة التي في الأعلى ثم التي في الأسفل.' },
        skills: { eu: 'Taulak eta probabilitate baldintzatua', es: 'Tablas y probabilidad condicionada', en: 'Tables and conditional probability', ar: 'الجداول والاحتمال المشروط' },
        levels: [
            { progressId: 150501, stage: 'conditional', title: { eu: 'Guztien artean', es: 'Del total', en: 'Of everyone', ar: 'من الجميع' }, description: { eu: 'Ezaugarri bat edo biak batera.', es: 'Una característica o las dos a la vez.', en: 'One feature or both at once.', ar: 'صفة واحدة أو الاثنتان معًا.' } },
            { progressId: 150502, stage: 'conditional', title: { eu: 'Errenkada baten barruan', es: 'Dentro de una fila', en: 'Inside a row', ar: 'داخل صف' }, description: { eu: 'Errenkada da osoko berria.', es: 'La fila es el nuevo total.', en: 'The row is the new total.', ar: 'الصف هو الكل الجديد.' } },
            { progressId: 150503, stage: 'conditional', title: { eu: 'Alderantziz', es: 'Al revés', en: 'The other way round', ar: 'بالعكس' }, description: { eu: 'Zutabea ere izan daiteke osoko berria.', es: 'También la columna puede ser el nuevo total.', en: 'The column can be the new total too.', ar: 'يمكن أن يكون العمود هو الكل الجديد أيضًا.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ordenak axola du?', es: '¿Importa el orden?', en: 'Does the order matter?', ar: 'هل يهم الترتيب؟' },
        tagline: { eu: 'Batzordeak, podiumak, PIN kodeak eta ilarak: aukeratu zenbatzeko eredua.', es: 'Comisiones, podios, PIN y colas: elige el modelo para contar.', en: 'Committees, podiums, PINs and queues: choose the model to count with.', ar: 'لجان ومنصّات تتويج ورموز وطوابير: اختر نموذج العدّ.' },
        skills: { eu: 'Aldakuntzak, permutazioak eta konbinazioak', es: 'Variaciones, permutaciones y combinaciones', en: 'Arrangements, permutations and combinations', ar: 'التراتيب والتباديل والتوافيق' },
        levels: [
            { progressId: 150601, stage: 'counting', title: { eu: 'Ordenarekin ala gabe', es: 'Con orden o sin él', en: 'With or without order', ar: 'بترتيب أو دونه' }, description: { eu: 'Aldakuntzak eta konbinazioak.', es: 'Variaciones y combinaciones.', en: 'Arrangements and combinations.', ar: 'التراتيب والتوافيق.' } },
            { progressId: 150602, stage: 'counting', title: { eu: 'Lau ereduak', es: 'Los cuatro modelos', en: 'The four models', ar: 'النماذج الأربعة' }, description: { eu: 'Errepikapena eta permutazioak ere bai.', es: 'También repetición y permutaciones.', en: 'Repetition and permutations too.', ar: 'والتكرار والتباديل أيضًا.' } },
            { progressId: 150603, stage: 'counting', title: { eu: 'Zenbat dira?', es: '¿Cuántos son?', en: 'How many?', ar: 'كم عددها؟' }, description: { eu: 'Aukeratu zenbaki zuzena.', es: 'Elige el número correcto.', en: 'Choose the right number.', ar: 'اختر العدد الصحيح.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Probabilitatearen detektibea', es: 'Detective de probabilidad', en: 'Probability detective', ar: 'مخبر الاحتمالات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Zenbaketa, taulak eta Bayes', es: 'Recuento, tablas y Bayes', en: 'Counting, tables and Bayes', ar: 'العدّ والجداول وبايز' },
        levels: [
            { progressId: 150701, stage: 'counting', title: { eu: 'Zenbatzen', es: 'Contar', en: 'Counting', ar: 'العدّ' }, description: { eu: 'Ordena, errepikapena eta irizpide bera.', es: 'Orden, repetición y mismo criterio.', en: 'Order, repetition and the same method.', ar: 'الترتيب والتكرار والمعيار نفسه.' } },
            { progressId: 150702, stage: 'conditional', title: { eu: 'Taulak eta zuhaitzak', es: 'Tablas y árboles', en: 'Tables and trees', ar: 'الجداول والأشجار' }, description: { eu: 'Osoko berria eta itzuli gabe.', es: 'El nuevo total y sin devolución.', en: 'The new total and without replacement.', ar: 'الكل الجديد ودون إرجاع.' } },
            { progressId: 150703, stage: 'bayes', title: { eu: 'Osoa eta Bayes', es: 'Total y Bayes', en: 'Total and Bayes', ar: 'الكلي وبايز' }, description: { eu: 'Pisuak, a priori eta proba medikoak.', es: 'Pesos, a priori y pruebas médicas.', en: 'Weights, priors and medical tests.', ar: 'الأوزان والقبلي والفحوص الطبية.' } }
        ]
    },
    // «Fill in the Venn diagram» and «Who did it?» of 2.º Ciencias, with this unit's progress ids
    { ...vennSource, id: 'venn', levels: vennSource.levels.map((level, index) => ({ ...level, stage: 'events', progressId: 150811 + index })) },
    { ...culpritSource, id: 'culprit', levels: culpritSource.levels.map((level, index) => ({ ...level, stage: 'bayes', progressId: 150821 + index })) },
    { ...memorySource, id: 'memory', levels: memorySource.levels.map((level, index) => ({ ...level, progressId: 150801 + index })) }
]

export const probabilityBatx2gGameProgressIds: number[] = levelProgressIds(probabilityBatx2gGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const probabilityBatx2gGameSlugs: Record<ProbabilityBatx2gGameId, string> = { race: 'lasterketa', divide: 'zatitu', order: 'ordena', detective: 'detektibea', venn: 'venn', culprit: 'nork', memory: 'memoria' }

export function probabilityBatx2gGameModeForPath(pathname: string): ProbabilityBatx2gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zatitu', 'dividir'].includes(game)) return 'divide'
    if (['ordena', 'orden'].includes(game)) return 'order'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['venn', 'rellena-venn'].includes(game)) return 'venn'
    if (['nork', 'quien-fue'].includes(game)) return 'culprit'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
