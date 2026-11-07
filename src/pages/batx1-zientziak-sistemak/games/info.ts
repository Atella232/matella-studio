import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { systemsGames } from '../../dbh4-akademikoak-sistemak/games/info.ts'
import type { BachSystemsStageId } from '../lessons.tsx'

/* ==========================================================================
   Ekuazio-sistemak (Batxilergoa 1 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its first
   star. Three games of its own (make the zero, read the last row and the
   detective), the race and the memory, and two games of 4. DBH académicas
   kept for the review (the crossing point and touch the solution), with
   their texts and levels but the stages and progress ids of this unit.
   ========================================================================== */

export type BachSystemsGameId = 'race' | 'zero' | 'last-row' | 'detective' | 'memory' | 'cross' | 'touch'

export const BACH_SYSTEMS_GAME_RECORDS_KEY = 'matella-sistemak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'cross' | 'touch', stages: BachSystemsStageId[], firstId: number): GameInfo<BachSystemsGameId> {
    const source = systemsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachSystemsGames: GameInfo<BachSystemsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Sistemen lasterketa', es: 'Carrera de sistemas', en: 'Systems race', ar: 'سباق الأنظمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 113401, stage: 'linear', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', en: 'Linear systems', ar: 'الأنظمة الخطية' }, description: { eu: 'Hirukoteak, motak eta eragiketak.', es: 'Ternas, tipos y operaciones.', en: 'Triples, types and operations.', ar: 'الثلاثيات والأنواع والعمليات.' } },
            { progressId: 113402, stage: 'gauss', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' }, description: { eu: 'Behetik gora, zeroak eta problemak.', es: 'De abajo arriba, ceros y problemas.', en: 'Bottom up, zeros and problems.', ar: 'من الأسفل إلى الأعلى، والأصفار، والمسائل.' } },
            { progressId: 113403, stage: 'discussion', title: { eu: 'Eztabaida', es: 'Discusión', en: 'Analysis', ar: 'المناقشة' }, description: { eu: 'Azken errenkada, λ eta a.', es: 'Última fila, λ y a.', en: 'Last row, λ and a.', ar: 'الصف الأخير وλ وa.' } },
            { progressId: 113404, stage: 'nonlinear', title: { eu: 'Ez-linealak', es: 'No lineales', en: 'Non-linear', ar: 'غير الخطية' }, description: { eu: 'Batura eta biderkadura, karratuak eta 2ˣ.', es: 'Suma y producto, cuadrados y 2ˣ.', en: 'Sum and product, squares and 2ˣ.', ar: 'المجموع والجداء، والمربعات و2ˣ.' } },
            { progressId: 113405, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: 'Puntu osoak, muga eta azalera.', es: 'Puntos enteros, frontera y área.', en: 'Integer points, boundary and area.', ar: 'النقاط الصحيحة والحد والمساحة.' } }
        ]
    },
    {
        id: 'zero',
        title: { eu: 'Egin zeroa', es: 'Haz el cero', en: 'Make the zero', ar: 'اصنع الصفر' },
        tagline: { eu: 'Aukeratu errenkaden arteko eragiketa pibotearen azpian 0 bat uzten duena: matrizea mailakatuz doa.', es: 'Elige la operación entre filas que deja un 0 bajo el pivote: la matriz se va escalonando.', en: 'Choose the row operation that leaves a 0 under the pivot: the matrix becomes triangular step by step.', ar: 'اختر العملية بين الصفوف التي تترك صفرًا تحت المحور: تصير المصفوفة درجية خطوة خطوة.' },
        skills: { eu: 'Gaussen metodoa matrize zabalduan', es: 'El método de Gauss en la matriz ampliada', en: 'Gaussian elimination on the augmented matrix', ar: 'طريقة غاوس على المصفوفة الموسعة' },
        levels: [
            { progressId: 113501, stage: 'gauss', title: { eu: 'Bi ezezagun', es: 'Dos incógnitas', en: 'Two unknowns', ar: 'مجهولان' }, description: { eu: 'Pibotea 1 da: E₂ + kE₁.', es: 'El pivote es 1: E₂ + kE₁.', en: 'The pivot is 1: E₂ + kE₁.', ar: 'المحور 1: E₂ + kE₁.' } },
            { progressId: 113502, stage: 'gauss', title: { eu: 'Hiru ezezagun', es: 'Tres incógnitas', en: 'Three unknowns', ar: 'ثلاثة مجاهيل' }, description: { eu: 'Hiru urrats matrize bakoitzeko.', es: 'Tres pasos en cada matriz.', en: 'Three steps on each matrix.', ar: 'ثلاث خطوات في كل مصفوفة.' } },
            { progressId: 113503, stage: 'gauss', title: { eu: 'Pibotea ez da 1', es: 'El pivote no es 1', en: 'The pivot is not 1', ar: 'المحور ليس 1' }, description: { eu: 'mE₂ + kE₁, bi zenbakiekin.', es: 'mE₂ + kE₁, con los dos números.', en: 'mE₂ + kE₁, with both numbers.', ar: 'mE₂ + kE₁ بالعددين.' } }
        ]
    },
    {
        id: 'last-row',
        title: { eu: 'Irakurri azken errenkada', es: 'Lee la última fila', en: 'Read the last row', ar: 'اقرأ الصف الأخير' },
        tagline: { eu: 'Sistema bat mailakatuta: soluzio bat, infinitu ala bat ere ez?', es: 'Un sistema ya escalonado: ¿una solución, infinitas o ninguna?', en: 'A system already triangular: one solution, infinitely many or none?', ar: 'نظام درجي: حل واحد أم ما لا نهاية أم لا حل؟' },
        skills: { eu: 'Sistemak eztabaidatzea', es: 'Discutir sistemas', en: 'Analysing systems', ar: 'مناقشة الأنظمة' },
        levels: [
            { progressId: 113601, stage: 'discussion', title: { eu: 'Azken errenkada', es: 'La última fila', en: 'The last row', ar: 'الصف الأخير' }, description: { eu: 'cz = d, 0·z = 0 edo 0·z = 5.', es: 'cz = d, 0·z = 0 o 0·z = 5.', en: 'cz = d, 0·z = 0 or 0·z = 5.', ar: 'cz = d أو 0·z = 0 أو 0·z = 5.' } },
            { progressId: 113602, stage: 'discussion', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Bi zero-errenkada edo z = 0.', es: 'Dos filas de ceros o z = 0.', en: 'Two rows of zeros or z = 0.', ar: 'صفّا أصفار أو z = 0.' } },
            { progressId: 113603, stage: 'discussion', title: { eu: 'Parametroarekin', es: 'Con parámetro', en: 'With a parameter', ar: 'مع وسيط' }, description: { eu: '(a − k)z = d: zein a?', es: '(a − k)z = d: ¿qué a?', en: '(a − k)z = d: which a?', ar: '(a − k)z = d: أي a؟' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Sistemen detektibea', es: 'Detective de sistemas', en: 'Systems detective', ar: 'مخبر الأنظمة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 113701, stage: 'gauss', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' }, description: { eu: 'Gai askea, zeinuak eta biderkatzea.', es: 'Término independiente, signos y multiplicar.', en: 'Constant term, signs and multiplying.', ar: 'الحد الثابت والإشارات والضرب.' } },
            { progressId: 113702, stage: 'discussion', title: { eu: 'Eztabaida', es: 'Discusión', en: 'Analysis', ar: 'المناقشة' }, description: { eu: '0·z = 0, 0·z = 5, a eta λ.', es: '0·z = 0, 0·z = 5, a y λ.', en: '0·z = 0, 0·z = 5, a and λ.', ar: '0·z = 0 و0·z = 5 وa وλ.' } },
            { progressId: 113703, stage: 'nonlinear', title: { eu: 'Ez-linealak eta inekuazioak', es: 'No lineales e inecuaciones', en: 'Non-linear and inequalities', ar: 'غير الخطية والمتراجحات' }, description: { eu: 'x zenbakiaz zatitzea, ±, logaritmoak eta zeinua.', es: 'Dividir entre x, el ±, logaritmos y el signo.', en: 'Dividing by x, the ±, logarithms and the sign.', ar: 'القسمة على x و± واللوغاريتمات والإشارة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: sistema bat eta bere soluzioa, edo azken errenkada bat eta esaten duena.', es: 'Encuentra las parejas: un sistema y su solución, o una última fila y lo que dice.', en: 'Find the pairs: a system and its solution, or a last row and what it says.', ar: 'جد الأزواج: نظام وحله، أو صف أخير وما يقوله.' },
        skills: { eu: 'Soluzioak eta azken errenkadak', es: 'Soluciones y últimas filas', en: 'Solutions and last rows', ar: 'الحلول والصفوف الأخيرة' },
        levels: [
            { progressId: 113801, stage: 'linear', title: { eu: 'Bi ezezagun', es: 'Dos incógnitas', en: 'Two unknowns', ar: 'مجهولان' }, description: { eu: 'Sistema bat ↔ (x, y)', es: 'Un sistema ↔ (x, y)', en: 'A system ↔ (x, y)', ar: 'نظام ↔ (x, y)' } },
            { progressId: 113802, stage: 'discussion', title: { eu: 'Azken errenkada', es: 'La última fila', en: 'The last row', ar: 'الصف الأخير' }, description: { eu: '0 0 3 | 6 ↔ z = 2', es: '0 0 3 | 6 ↔ z = 2', en: '0 0 3 | 6 ↔ z = 2', ar: '0 0 3 | 6 ↔ z = 2' } },
            { progressId: 113803, stage: 'nonlinear', title: { eu: 'Batura eta biderkadura', es: 'Suma y producto', en: 'Sum and product', ar: 'المجموع والجداء' }, description: { eu: 'x + y = 5, xy = 6 ↔ 2 eta 3', es: 'x + y = 5, xy = 6 ↔ 2 y 3', en: 'x + y = 5, xy = 6 ↔ 2 and 3', ar: 'x + y = 5، xy = 6 ↔ 2 و3' } }
        ]
    },
    reused('cross', ['linear', 'linear', 'linear'], 113811),
    reused('touch', ['inequalities', 'inequalities', 'inequalities'], 113821)
]

export const bachSystemsGameProgressIds: number[] = levelProgressIds(bachSystemsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachSystemsGameSlugs: Record<BachSystemsGameId, string> = { race: 'lasterketa', zero: 'zeroa', 'last-row': 'azken-errenkada', detective: 'detektibea', memory: 'memoria', cross: 'ebaki-puntua', touch: 'sakatu-soluzioa' }

export function bachSystemsGameModeForPath(pathname: string): BachSystemsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zeroa', 'cero'].includes(game)) return 'zero'
    if (['azken-errenkada', 'ultima-fila'].includes(game)) return 'last-row'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['ebaki-puntua', 'punto-de-corte'].includes(game)) return 'cross'
    if (['sakatu-soluzioa', 'toca-la-solucion'].includes(game)) return 'touch'
    return 'hub'
}
