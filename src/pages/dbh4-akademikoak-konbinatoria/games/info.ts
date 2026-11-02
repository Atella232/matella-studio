import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Konbinatoria (4. DBH akademikoak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type CombinatoricsAkGameId = 'race' | 'memory' | 'model' | 'boxes' | 'detective'

export const COMBINATORICS_AK_GAME_RECORDS_KEY = 'matella-konbinatoria-dbh4ak-game-records'

export const combinatoricsAkGames: GameInfo<CombinatoricsAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaketaren lasterketa', es: 'Carrera de recuentos', en: 'Counting race', ar: 'سباق العدّ' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 84101, stage: 'counting', title: { eu: 'Zenbatzen', es: 'Contar', en: 'Counting', ar: 'العدّ' }, description: { eu: 'Menuak, faktorialak eta zatiketak.', es: 'Menús, factoriales y cocientes.', en: 'Menus, factorials and quotients.', ar: 'الوجبات والمضاريب والقسمة.' } },
            { progressId: 84102, stage: 'variations', title: { eu: 'Aldakuntzak', es: 'Variaciones', en: 'Arrangements', ar: 'التراتيب' }, description: { eu: 'Errepikatuz, errepikatu gabe eta zenbakiak.', es: 'Con repetición, sin repetición y números.', en: 'With repetition, without repetition and numbers.', ar: 'مع التكرار ودونه والأعداد.' } },
            { progressId: 84103, stage: 'permutations', title: { eu: 'Permutazioak', es: 'Permutaciones', en: 'Permutations', ar: 'التباديل' }, description: { eu: 'Ilarak, blokeak eta letra errepikatuak.', es: 'Filas, bloques y letras repetidas.', en: 'Rows, blocks and repeated letters.', ar: 'الصفوف والكتل والأحرف المكررة.' } },
            { progressId: 84104, stage: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' }, description: { eu: 'Taldeak, eskuemateak eta simetria.', es: 'Grupos, saludos y simetría.', en: 'Groups, handshakes and symmetry.', ar: 'المجموعات والمصافحات والتماثل.' } },
            { progressId: 84105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'مسائل' }, description: { eu: 'Diagonalak, bideak eta batzordeak.', es: 'Diagonales, caminos y comisiones.', en: 'Diagonals, paths and committees.', ar: 'الأقطار والمسارات واللجان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Faktorialak, aldakuntzak eta zenbaki konbinatorioak', es: 'Factoriales, variaciones y números combinatorios', en: 'Factorials, arrangements and combinatorial numbers', ar: 'المضاريب والتراتيب والأعداد التوافقية' },
        levels: [
            { progressId: 84201, stage: 'counting', title: { eu: 'Faktorialak', es: 'Factoriales', en: 'Factorials', ar: 'المضاريب' }, description: { eu: '5! ↔ 120', es: '5! ↔ 120', en: '5! ↔ 120', ar: '5! ↔ 120' } },
            { progressId: 84202, stage: 'variations', title: { eu: 'Aldakuntzak', es: 'Variaciones', en: 'Arrangements', ar: 'التراتيب' }, description: { eu: 'V₅,₂ ↔ 20', es: 'V₅,₂ ↔ 20', en: 'V₅,₂ ↔ 20', ar: 'V₅,₂ ↔ 20' } },
            { progressId: 84203, stage: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' }, description: { eu: 'C₆,₂ ↔ 15', es: 'C₆,₂ ↔ 15', en: 'C₆,₂ ↔ 15', ar: 'C₆,₂ ↔ 15' } }
        ]
    },
    {
        id: 'model',
        title: { eu: 'Ordenak axola du?', es: '¿Importa el orden?', en: 'Does order matter?', ar: 'هل يهم الترتيب؟' },
        tagline: { eu: 'Egoera bat: ordena? errepikapena? eta zenbat? Gero, erabaki-zuhaitza.', es: 'Una situación: ¿orden?, ¿repetición? y ¿cuántos? Luego, el árbol de decisión.', en: 'A situation: order? repetition? and how many? Then the decision tree.', ar: 'موقف: ترتيب؟ تكرار؟ وكم؟ ثم شجرة القرار.' },
        skills: { eu: 'Eredua aukeratu', es: 'Elegir el modelo', en: 'Choosing the model', ar: 'اختيار النموذج' },
        levels: [
            { progressId: 84301, stage: 'combinations', title: { eu: 'Ordena ala ez', es: 'Orden o no', en: 'Order or not', ar: 'ترتيب أم لا' }, description: { eu: 'Aldakuntzak eta konbinazioak.', es: 'Variaciones y combinaciones.', en: 'Variations and combinations.', ar: 'التراتيب والتوافيق.' } },
            { progressId: 84302, stage: 'permutations', title: { eu: 'Errepikapena ere bai', es: 'También la repetición', en: 'Repetition too', ar: 'والتكرار أيضًا' }, description: { eu: 'Lau ereduak.', es: 'Los cuatro modelos.', en: 'The four models.', ar: 'النماذج الأربعة.' } },
            { progressId: 84303, stage: 'problems', title: { eu: 'Zenbaki handiak', es: 'Números grandes', en: 'Big numbers', ar: 'أعداد كبيرة' }, description: { eu: 'Eredu guztiak nahastuta.', es: 'Todos los modelos mezclados.', en: 'Every model mixed.', ar: 'كل النماذج مختلطة.' } }
        ]
    },
    {
        id: 'boxes',
        title: { eu: 'Kutxen metodoa', es: 'El método de las casillas', en: 'The box method', ar: 'طريقة الخانات' },
        tagline: { eu: 'Kutxa bakoitzean zenbat aukera? Biderkadurak zenbaketa eman behar du.', es: '¿Cuántas opciones en cada casilla? El producto debe dar la cuenta.', en: 'How many options in each box? The product must give the count.', ar: 'كم خيارًا في كل خانة؟ يجب أن يعطي الجداء العدد.' },
        skills: { eu: 'Biderketaren printzipioa', es: 'Principio de multiplicación', en: 'The multiplication principle', ar: 'مبدأ الضرب' },
        levels: [
            { progressId: 84401, stage: 'counting', title: { eu: 'Errepikapenarekin', es: 'Con repetición', en: 'With repetition', ar: 'مع التكرار' }, description: { eu: 'Kutxa guztiak berdinak.', es: 'Todas las casillas iguales.', en: 'Every box the same.', ar: 'كل الخانات متساوية.' } },
            { progressId: 84402, stage: 'variations', title: { eu: 'Errepikapenik gabe', es: 'Sin repetición', en: 'Without repetition', ar: 'دون تكرار' }, description: { eu: 'Aukera bat gutxiago aldi bakoitzean.', es: 'Una opción menos cada vez.', en: 'One option fewer each time.', ar: 'خيار أقل كل مرة.' } },
            { progressId: 84403, stage: 'problems', title: { eu: 'Baldintzekin', es: 'Con condiciones', en: 'With conditions', ar: 'مع شروط' }, description: { eu: 'Lehenik baldintza duen kutxa.', es: 'Primero la casilla con condición.', en: 'First the box with the condition.', ar: 'أولًا الخانة ذات الشرط.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Konbinatoriaren detektibea', es: 'Detective de combinatoria', en: 'Combinatorics detective', ar: 'مخبر التوافيق' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Zenbaketako akats tipikoak', es: 'Errores típicos al contar', en: 'Common counting mistakes', ar: 'الأخطاء الشائعة في العدّ' },
        levels: [
            { progressId: 84501, stage: 'counting', title: { eu: 'Zenbatzen', es: 'Contar', en: 'Counting', ar: 'العدّ' }, description: { eu: 'Biderkatu, errepikatu eta faktorialak.', es: 'Multiplicar, repetir y factoriales.', en: 'Multiplying, repeating and factorials.', ar: 'الضرب والتكرار والمضروب.' } },
            { progressId: 84502, stage: 'permutations', title: { eu: 'Ereduak', es: 'Modelos', en: 'Models', ar: 'النماذج' }, description: { eu: 'Ordena eta errepikatutako zifrak.', es: 'El orden y las cifras repetidas.', en: 'Order and repeated digits.', ar: 'الترتيب والأرقام المكررة.' } },
            { progressId: 84503, stage: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' }, description: { eu: 'Pascal, taldeak eta errepikapena.', es: 'Pascal, grupos y repetición.', en: 'Pascal, groups and repetition.', ar: 'باسكال والمجموعات والتكرار.' } }
        ]
    }
]

export const combinatoricsAkGameProgressIds: number[] = levelProgressIds(combinatoricsAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const combinatoricsAkGameSlugs: Record<CombinatoricsAkGameId, string> = { race: 'lasterketa', memory: 'memoria', model: 'ordena', boxes: 'kutxak', detective: 'detektibea' }

export function combinatoricsAkGameModeForPath(pathname: string): CombinatoricsAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ordena', 'orden'].includes(game)) return 'model'
    if (['kutxak', 'casillas'].includes(game)) return 'boxes'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
