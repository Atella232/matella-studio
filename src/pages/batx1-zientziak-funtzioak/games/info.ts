import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { functionsAkGames } from '../../dbh4-akademikoak-funtzioak/games/info.ts'
import { polynomialAkGames } from '../../dbh4-akademikoak-polinomikoak/games/info.ts'
import type { BachFunctionsStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (where does the point go?, put the
   machines in order, undo the machine and the detective), the race and
   the memory, and two games of 4. DBH académicas (paint the domain and the
   curve laser), with their texts and levels but the stages and progress
   ids of this unit.
   ========================================================================== */

export type BachFunctionsGameId = 'race' | 'where' | 'order' | 'undo' | 'detective' | 'memory' | 'domain' | 'laser'

export const BACH_FUNCTIONS_GAME_RECORDS_KEY = 'matella-funtzioak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: BachFunctionsGameId, stages: BachFunctionsStageId[], firstId: number): GameInfo<BachFunctionsGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}
const laser = polynomialAkGames.find((game) => game.id === 'laser')!

/** The curve families of each level of the laser in this unit */
export const BACH_FUNCTIONS_LASER_FAMILIES = [['parabola', 'abs'], ['exp', 'log'], ['inverse', 'abs', 'log']] as const

export const bachFunctionsGames: GameInfo<BachFunctionsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Functions race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 108401, stage: 'study', title: { eu: 'Funtzio baten azterketa', es: 'Estudio de una función', en: 'Studying a function', ar: 'دراسة دالة' }, description: { eu: 'Izate-eremua, bakoitiak eta periodikoak.', es: 'Dominio, impares y periódicas.', en: 'Domain, odd and periodic functions.', ar: 'المجال والفردية والدورية.' } },
            { progressId: 108402, stage: 'transforms', title: { eu: 'Transformazioak', es: 'Transformaciones', en: 'Transformations', ar: 'التحويلات' }, description: { eu: 'f(x + c), f(kx) eta A·f(x) + k.', es: 'f(x + c), f(kx) y A·f(x) + k.', en: 'f(x + c), f(kx) and A·f(x) + k.', ar: 'f(x + c) وf(kx) وA·f(x) + k.' } },
            { progressId: 108403, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'La inversa', en: 'The inverse', ar: 'الدالة العكسية' }, description: { eu: 'Zuzenak, 2ˣ eta arku-funtzioak.', es: 'Rectas, 2ˣ y funciones arco.', en: 'Lines, 2ˣ and arc functions.', ar: 'المستقيمات و2ˣ ودوال القوس.' } },
            { progressId: 108404, stage: 'piecewise', title: { eu: 'Zatika', es: 'A trozos', en: 'Piecewise', ar: 'على أجزاء' }, description: { eu: 'E(x), lotunea eta |f(x)|.', es: 'E(x), la unión y |f(x)|.', en: 'E(x), the joint and |f(x)|.', ar: 'E(x) والالتقاء و|f(x)|.' } },
            { progressId: 108405, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'f ∘ g, f/g eta f·g.', es: 'f ∘ g, f/g y f·g.', en: 'f ∘ g, f/g and f·g.', ar: 'f ∘ g وf/g وf·g.' } }
        ]
    },
    {
        id: 'where',
        title: { eu: 'Non erortzen da puntua?', es: '¿Dónde cae el punto?', en: 'Where does the point land?', ar: 'أين تقع النقطة؟' },
        tagline: { eu: 'f funtzioaren puntu bat eta formula berri bat: sakatu sarean puntua non dagoen orain.', es: 'Un punto de f y una fórmula nueva: toca en la cuadrícula dónde está ahora el punto.', en: 'A point of f and a new formula: tap on the grid where the point is now.', ar: 'نقطة من f وصيغة جديدة: المس على الشبكة موضع النقطة الآن.' },
        skills: { eu: 'Lekualdaketak, islapenak eta luzapenak', es: 'Traslaciones, reflexiones y estiramientos', en: 'Translations, reflections and stretches', ar: 'الانسحابات والانعكاسات والتمديدات' },
        levels: [
            { progressId: 108501, stage: 'transforms', title: { eu: 'Aldaketa bat', es: 'Un cambio', en: 'One change', ar: 'تغيير واحد' }, description: { eu: 'f(x + c), f(x) + k, −f(x) edo f(−x).', es: 'f(x + c), f(x) + k, −f(x) o f(−x).', en: 'f(x + c), f(x) + k, −f(x) or f(−x).', ar: 'f(x + c) أو f(x) + k أو −f(x) أو f(−x).' } },
            { progressId: 108502, stage: 'transforms', title: { eu: 'Bi aldaketa', es: 'Dos cambios', en: 'Two changes', ar: 'تغييران' }, description: { eu: '−2f(x) + 3, f(−x + 1)…', es: '−2f(x) + 3, f(−x + 1)…', en: '−2f(x) + 3, f(−x + 1)…', ar: '−2f(x) + 3، f(−x + 1)…' } },
            { progressId: 108503, stage: 'transforms', title: { eu: 'Kate osoa', es: 'La cadena entera', en: 'The whole chain', ar: 'السلسلة كاملة' }, description: { eu: 'A·f(Bx + c) + k', es: 'A·f(Bx + c) + k', en: 'A·f(Bx + c) + k', ar: 'A·f(Bx + c) + k' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ordenatu makinak', es: 'Ordena las máquinas', en: 'Put the machines in order', ar: 'رتّب الآلات' },
        tagline: { eu: 'Makina batzuk eta helburu bat: jarri ordenan, emaitza bera atera dadin.', es: 'Unas máquinas y una meta: ponlas en orden para que salga lo pedido.', en: 'Some machines and a goal: put them in order so that the right thing comes out.', ar: 'آلات وهدف: رتّبها ليخرج المطلوب.' },
        skills: { eu: 'Funtzioen konposizioa', es: 'Composición de funciones', en: 'Composition of functions', ar: 'تركيب الدوال' },
        levels: [
            { progressId: 108601, stage: 'operations', title: { eu: 'Bi makina', es: 'Dos máquinas', en: 'Two machines', ar: 'آلتان' }, description: { eu: 'Zenbaki bat sartu eta beste bat atera.', es: 'Entra un número y sale otro.', en: 'One number in, another out.', ar: 'يدخل عدد ويخرج آخر.' } },
            { progressId: 108602, stage: 'operations', title: { eu: 'Hiru makina', es: 'Tres máquinas', en: 'Three machines', ar: 'ثلاث آلات' }, description: { eu: 'Sei ordena, bakar bat ona.', es: 'Seis órdenes, uno bueno.', en: 'Six orders, one right.', ar: 'ستة ترتيبات، واحد صحيح.' } },
            { progressId: 108603, stage: 'operations', title: { eu: 'Deskonposatu', es: 'Descompón', en: 'Break it down', ar: 'فكّك' }, description: { eu: 'h(x) = (x − 2)²…', es: 'h(x) = (x − 2)²…', en: 'h(x) = (x − 2)²…', ar: 'h(x) = (x − 2)²…' } }
        ]
    },
    {
        id: 'undo',
        title: { eu: 'Desegin makina', es: 'Deshaz la máquina', en: 'Undo the machine', ar: 'اعكس الآلة' },
        tagline: { eu: 'f makina-kate bat da: eraiki f⁻¹, eragiketa kontrakoekin eta alderantzizko ordenan.', es: 'f es una cadena de máquinas: construye f⁻¹ con las operaciones contrarias y en orden inverso.', en: 'f is a chain of machines: build f⁻¹ with the opposite operations, in reverse order.', ar: 'f سلسلة آلات: ابنِ f⁻¹ بالعمليات المعاكسة وبترتيب معكوس.' },
        skills: { eu: 'Alderantzizko funtzioa', es: 'La función inversa', en: 'The inverse function', ar: 'الدالة العكسية' },
        levels: [
            { progressId: 108651, stage: 'inverse', title: { eu: 'Bi makina', es: 'Dos máquinas', en: 'Two machines', ar: 'آلتان' }, description: { eu: 'f(x) = 2x + 4', es: 'f(x) = 2x + 4', en: 'f(x) = 2x + 4', ar: 'f(x) = 2x + 4' } },
            { progressId: 108652, stage: 'inverse', title: { eu: 'Hiru makina', es: 'Tres máquinas', en: 'Three machines', ar: 'ثلاث آلات' }, description: { eu: 'Zeinu aldaketarekin ere bai.', es: 'También con cambio de signo.', en: 'With a change of sign too.', ar: 'ومع تغيير الإشارة أيضًا.' } },
            { progressId: 108653, stage: 'inverse', title: { eu: 'x³ eta 2ˣ', es: 'x³ y 2ˣ', en: 'x³ and 2ˣ', ar: 'x³ و2ˣ' }, description: { eu: '∛x eta log₂ x deseginez.', es: 'Deshaciendo con ∛x y log₂ x.', en: 'Undoing with ∛x and log₂ x.', ar: 'العكس بـ ∛x وlog₂ x.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Funtzioen detektibea', es: 'Detective de funciones', en: 'Functions detective', ar: 'مخبر الدوال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 108701, stage: 'study', title: { eu: 'Izate-eremua eta transformazioak', es: 'Dominio y transformaciones', en: 'Domain and transformations', ar: 'المجال والتحويلات' }, description: { eu: 'log ≥ 0, izendatzailea, x + a eta bakoitiak.', es: 'log ≥ 0, denominador, x + a e impares.', en: 'log ≥ 0, denominator, x + a and odd functions.', ar: 'log ≥ 0 والمقام وx + a والفردية.' } },
            { progressId: 108702, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'La inversa', en: 'The inverse', ar: 'الدالة العكسية' }, description: { eu: '1/f, ordena, 2ˣ + c eta arku kosinua.', es: '1/f, el orden, 2ˣ + c y el arco coseno.', en: '1/f, the order, 2ˣ + c and the arc cosine.', ar: '1/f والترتيب و2ˣ + c وقوس جيب التمام.' } },
            { progressId: 108703, stage: 'piecewise', title: { eu: 'Zatika eta konposizioa', es: 'A trozos y composición', en: 'Piecewise and composition', ar: 'على أجزاء والتركيب' }, description: { eu: 'E(x), zatia, f ∘ g eta f/g.', es: 'E(x), el trozo, f ∘ g y f/g.', en: 'E(x), the piece, f ∘ g and f/g.', ar: 'E(x) والجزء وf ∘ g وf/g.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: zati osoa eta bere balioa, funtzio bat eta bere alderantzizkoa, edo funtzio bat eta bere izate-eremua.', es: 'Encuentra las parejas: una parte entera y su valor, una función y su inversa, o una función y su dominio.', en: 'Find the pairs: an integer part and its value, a function and its inverse, or a function and its domain.', ar: 'اعثر على الأزواج: جزء صحيح وقيمته، أو دالة وعكسيتها، أو دالة ومجالها.' },
        skills: { eu: 'E(x), alderantzizkoak eta izate-eremuak', es: 'E(x), inversas y dominios', en: 'E(x), inverses and domains', ar: 'E(x) والعكسيات والمجالات' },
        levels: [
            { progressId: 108801, stage: 'piecewise', title: { eu: 'Zati osoa', es: 'Parte entera', en: 'Integer part', ar: 'الجزء الصحيح' }, description: { eu: 'E(−2,4) ↔ −3', es: 'E(−2,4) ↔ −3', en: 'E(−2.4) ↔ −3', ar: 'E(−2.4) ↔ −3' } },
            { progressId: 108802, stage: 'inverse', title: { eu: 'Alderantzizkoak', es: 'Inversas', en: 'Inverses', ar: 'العكسيات' }, description: { eu: '2x + 4 ↔ (x − 4)/2', es: '2x + 4 ↔ (x − 4)/2', en: '2x + 4 ↔ (x − 4)/2', ar: '2x + 4 ↔ (x − 4)/2' } },
            { progressId: 108803, stage: 'study', title: { eu: 'Izate-eremuak', es: 'Dominios', en: 'Domains', ar: 'المجالات' }, description: { eu: 'log(x − 2) ↔ (2, +∞)', es: 'log(x − 2) ↔ (2, +∞)', en: 'log(x − 2) ↔ (2, +∞)', ar: 'log(x − 2) ↔ (2, +∞)' } }
        ]
    },
    reused(functionsAkGames.find((game) => game.id === 'domain')!, 'domain', ['study', 'study', 'study'], 108811),
    {
        ...reused(laser, 'laser', ['transforms', 'inverse', 'transforms'], 108821),
        levels: [
            { progressId: 108821, stage: 'transforms', title: { eu: 'Parabolak eta |x|', es: 'Parábolas y |x|', en: 'Parabolas and |x|', ar: 'القطوع المكافئة و|x|' }, description: { eu: 'a(x − h)² + k eta a|x − h| + k', es: 'a(x − h)² + k y a|x − h| + k', en: 'a(x − h)² + k and a|x − h| + k', ar: 'a(x − h)² + k وa|x − h| + k' } },
            { progressId: 108822, stage: 'inverse', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الأسية واللوغاريتمية' }, description: { eu: 'b^(x − h) + k eta log_b(x − h) + k', es: 'b^(x − h) + k y log_b(x − h) + k', en: 'b^(x − h) + k and log_b(x − h) + k', ar: 'b^(x − h) + k وlog_b(x − h) + k' } },
            { progressId: 108823, stage: 'transforms', title: { eu: 'Nahastuta', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Hiperbolak, |x| eta logaritmoak.', es: 'Hipérbolas, |x| y logaritmos.', en: 'Hyperbolas, |x| and logarithms.', ar: 'القطوع الزائدة و|x| واللوغاريتمات.' } }
        ]
    }
]

export const bachFunctionsGameProgressIds: number[] = levelProgressIds(bachFunctionsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachFunctionsGameSlugs: Record<BachFunctionsGameId, string> = { race: 'lasterketa', where: 'puntua', order: 'makinak', undo: 'desegin', detective: 'detektibea', memory: 'memoria', domain: 'eremua', laser: 'laserra' }

export function bachFunctionsGameModeForPath(pathname: string): BachFunctionsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['puntua', 'punto'].includes(game)) return 'where'
    if (['makinak', 'maquinas'].includes(game)) return 'order'
    if (['desegin', 'deshaz'].includes(game)) return 'undo'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['eremua', 'dominio'].includes(game)) return 'domain'
    if (['laserra', 'laser'].includes(game)) return 'laser'
    return 'hub'
}
