import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachLimitsGames } from '../../batx1-zientziak-limiteak/games/info.ts'
import type { Bach2LimitsStageId } from '../lessons.tsx'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 2 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Three games of its own (who wins?, does the
   theorem ensure it?, hunt the roots) and the detective, the race and the
   memory, and two games of Limiteak 1.º for the review (indeterminate or
   not? and which discontinuity?), with their texts and levels but the
   stages and progress ids of this unit.
   ========================================================================== */

export type Bach2LimitsGameId = 'race' | 'winner' | 'assure' | 'hunt' | 'detective' | 'memory' | 'forms' | 'discontinuity'

export const BACH2_LIMITS_GAME_RECORDS_KEY = 'matella-limiteak-batx2z-game-records'

/** A Limiteak 1.º game with its texts and levels, the stages and progress ids of this unit */
function reused(id: Bach2LimitsGameId, stages: Bach2LimitsStageId[], firstId: number): GameInfo<Bach2LimitsGameId> {
    const source = bachLimitsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bach2LimitsGames: GameInfo<Bach2LimitsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Limiteen lasterketa', es: 'Carrera de límites', en: 'Limits race', ar: 'سباق النهايات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 122401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: '0/0, mailak eta konjokatua.', es: '0/0, grados y conjugado.', en: '0/0, degrees and the conjugate.', ar: '0/0 والدرجات والمرافق.' } },
            { progressId: 122402, stage: 'definition', title: { eu: 'Definizioa', es: 'Definición', en: 'Definition', ar: 'التعريف' }, description: { eu: 'δ, K eta −∞.', es: 'δ, K y −∞.', en: 'δ, K and −∞.', ar: 'δ وK و−∞.' } },
            { progressId: 122403, stage: 'notable', title: { eu: 'Limite nabarmenak', es: 'Límites notables', en: 'Notable limits', ar: 'النهايات الشهيرة' }, description: { eu: 'Sinua, e eta esponentzialak.', es: 'Seno, e y exponenciales.', en: 'Sine, e and exponentials.', ar: 'الجيب وe والأسيات.' } },
            { progressId: 122404, stage: 'continuity', title: { eu: 'Parametroak', es: 'Parámetros', en: 'Parameters', ar: 'الوسطاء' }, description: { eu: 'Bat edo bi parametro lotuneetan.', es: 'Uno o dos parámetros en las uniones.', en: 'One or two parameters at the joints.', ar: 'وسيط أو اثنان عند نقاط الالتقاء.' } },
            { progressId: 122405, stage: 'theorems', title: { eu: 'Teoremak', es: 'Teoremas', en: 'Theorems', ar: 'المبرهنات' }, description: { eu: 'Bolzano eta Weierstrass.', es: 'Bolzano y Weierstrass.', en: 'Bolzano and Weierstrass.', ar: 'بولتسانو وفايرشتراس.' } }
        ]
    },
    {
        id: 'winner',
        title: { eu: 'Nork irabazten du?', es: '¿Quién gana?', en: 'Who wins?', ar: 'من يفوز؟' },
        tagline: { eu: 'Bi infinitu zatidura batean: limitea 0 da, zenbaki bat ala +∞?', es: 'Dos infinitos en un cociente: ¿el límite es 0, un número o +∞?', en: 'Two infinities in a quotient: is the limit 0, a number or +∞?', ar: 'لانهايتان في خارج قسمة: هل النهاية 0 أم عدد أم ‎+∞؟' },
        skills: { eu: 'Logaritmoak, berreketak eta esponentzialak', es: 'Logaritmos, potencias y exponenciales', en: 'Logarithms, powers and exponentials', ar: 'اللوغاريتمات والقوى والأسيات' },
        levels: [
            { progressId: 122501, stage: 'notable', title: { eu: 'Bat goian, bat behean', es: 'Uno arriba, uno abajo', en: 'One on top, one below', ar: 'واحد في البسط وواحد في المقام' }, description: { eu: 'ln x, √x, xⁿ, 2ˣ eta eˣ.', es: 'ln x, √x, xⁿ, 2ˣ y eˣ.', en: 'ln x, √x, xⁿ, 2ˣ and eˣ.', ar: 'ln x و√x وxⁿ و2ˣ وeˣ.' } },
            { progressId: 122502, stage: 'notable', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: 'Gai nagusia bakarrik.', es: 'Solo el término principal.', en: 'Only the leading term.', ar: 'الحد الرئيسي فقط.' } },
            { progressId: 122503, stage: 'notable', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'x¹⁰ eta 1,1ˣ, 2ˣ eta 3ˣ.', es: 'x¹⁰ y 1,1ˣ, 2ˣ y 3ˣ.', en: 'x¹⁰ and 1.1ˣ, 2ˣ and 3ˣ.', ar: 'x¹⁰ و1.1ˣ، و2ˣ و3ˣ.' } }
        ]
    },
    {
        id: 'assure',
        title: { eu: 'Teoremak ziurtatzen al du?', es: '¿Lo asegura el teorema?', en: 'Does the theorem ensure it?', ar: 'هل تضمنه المبرهنة؟' },
        tagline: { eu: 'Funtzio bat, tarte bat eta baieztapen bat: teoremak ziurtatzen du, ala baldintzaren batek huts egiten du?', es: 'Una función, un intervalo y una afirmación: ¿lo asegura el teorema, o falla alguna condición?', en: 'A function, an interval and a claim: does the theorem ensure it, or does a condition fail?', ar: 'دالة وفترة وادعاء: هل تضمنه المبرهنة أم يختل شرط ما؟' },
        skills: { eu: 'Bolzano, tarteko balioak eta Weierstrass', es: 'Bolzano, valores intermedios y Weierstrass', en: 'Bolzano, intermediate values and Weierstrass', ar: 'بولتسانو والقيم الوسيطة وفايرشتراس' },
        levels: [
            { progressId: 122601, stage: 'theorems', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'Bolzano: jarraitua eta zeinu-aldaketa.', es: 'Bolzano: continua y cambio de signo.', en: 'Bolzano: continuous and a change of sign.', ar: 'بولتسانو: متصلة مع تغيّر الإشارة.' } },
            { progressId: 122602, stage: 'theorems', title: { eu: 'Balioak eta muturrak', es: 'Valores y extremos', en: 'Values and extremes', ar: 'القيم والقيم القصوى' }, description: { eu: 'Darboux eta Weierstrass.', es: 'Darboux y Weierstrass.', en: 'Darboux and Weierstrass.', ar: 'داربو وفايرشتراس.' } },
            { progressId: 122603, stage: 'theorems', title: { eu: 'Denak nahasian', es: 'Todo mezclado', en: 'All mixed', ar: 'الكل مختلط' }, description: { eu: 'Logaritmoak, erroak eta tarte irekiak.', es: 'Logaritmos, raíces e intervalos abiertos.', en: 'Logarithms, roots and open intervals.', ar: 'لوغاريتمات وجذور وفترات مفتوحة.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Ehizatu erroak', es: 'Caza raíces', en: 'Hunt the roots', ar: 'اصطد الجذور' },
        tagline: { eu: 'Markatu Bolzanok erro bat ziurtatzen duen [n, n + 1] tarte guztiak, eta besterik ez.', es: 'Marca todos los intervalos [n, n + 1] donde Bolzano asegura una raíz, y ninguno más.', en: 'Mark every interval [n, n + 1] where Bolzano ensures a root, and no other.', ar: 'حدّد كل الفترات [n, n + 1] التي تضمن فيها بولتسانو جذرًا، ولا غيرها.' },
        skills: { eu: 'Zeinu-aldaketak zenbaki osoen artean', es: 'Cambios de signo entre enteros', en: 'Changes of sign between integers', ar: 'تغيّرات الإشارة بين الأعداد الصحيحة' },
        levels: [
            { progressId: 122651, stage: 'theorems', title: { eu: 'Erro bat', es: 'Una raíz', en: 'One root', ar: 'جذر واحد' }, description: { eu: 'Hiru mailakoa, zeinu-aldaketa batekin.', es: 'Una cúbica con un cambio de signo.', en: 'A cubic with one change of sign.', ar: 'تكعيبية بتغيّر واحد في الإشارة.' } },
            { progressId: 122652, stage: 'theorems', title: { eu: 'Hiru erro', es: 'Tres raíces', en: 'Three roots', ar: 'ثلاثة جذور' }, description: { eu: 'Hiru zeinu-aldaketa.', es: 'Tres cambios de signo.', en: 'Three changes of sign.', ar: 'ثلاثة تغيّرات في الإشارة.' } },
            { progressId: 122653, stage: 'theorems', title: { eu: 'Bi kurba', es: 'Dos curvas', en: 'Two curves', ar: 'منحنيان' }, description: { eu: 'f = g, h = f − g erabiliz.', es: 'f = g, con h = f − g.', en: 'f = g, with h = f − g.', ar: 'f = g باستعمال h = f − g.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Limiteen detektibea', es: 'Detective de límites', en: 'Limits detective', ar: 'مخبر النهايات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: '2. mailako akats ohikoak', es: 'Los errores típicos de 2.º', en: 'The typical mistakes of 2nd year', ar: 'الأخطاء الشائعة في السنة الثانية' },
        levels: [
            { progressId: 122701, stage: 'definition', title: { eu: 'Definizioa eta infinituak', es: 'Definición e infinitos', en: 'Definition and infinities', ar: 'التعريف واللانهايات' }, description: { eu: 'δ, ordenak, 1^∞ eta √x².', es: 'δ, órdenes, 1^∞ y √x².', en: 'δ, orders, 1^∞ and √x².', ar: 'δ والرتب و1^∞ و√x².' } },
            { progressId: 122702, stage: 'continuity', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' }, description: { eu: 'Sinua, lotuneak eta muturrak.', es: 'Seno, uniones y extremos.', en: 'Sine, joints and ends.', ar: 'الجيب ونقاط الالتقاء والأطراف.' } },
            { progressId: 122703, stage: 'theorems', title: { eu: 'Teoremak', es: 'Teoremas', en: 'Theorems', ar: 'المبرهنات' }, description: { eu: 'Baldintzak ahaztuta.', es: 'Condiciones olvidadas.', en: 'Forgotten conditions.', ar: 'شروط منسية.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Limiteen memoria', es: 'Memoria de límites', en: 'Limits memory', ar: 'ذاكرة النهايات' },
        tagline: { eu: 'Egin bikoteak: limite bat eta bere balioa.', es: 'Haz parejas: un límite y su valor.', en: 'Make pairs: a limit and its value.', ar: 'كوّن أزواجًا: نهاية وقيمتها.' },
        skills: { eu: '1^∞, −∞ eta esponentzialak', es: '1^∞, −∞ y exponenciales', en: '1^∞, −∞ and exponentials', ar: '1^∞ و−∞ والأسيات' },
        levels: [
            { progressId: 122801, stage: 'notable', title: { eu: 'Bat infinitura', es: 'Uno a infinito', en: 'One to infinity', ar: 'واحد أس لانهاية' }, description: { eu: 'Limitea eᵃ da.', es: 'El límite es eᵃ.', en: 'The limit is eᵃ.', ar: 'النهاية eᵃ.' } },
            { progressId: 122802, stage: 'definition', title: { eu: 'Minus infinitua', es: 'Menos infinito', en: 'Minus infinity', ar: 'سالب لانهاية' }, description: { eu: 'Erroak eta x = −t.', es: 'Raíces y x = −t.', en: 'Roots and x = −t.', ar: 'الجذور وx = −t.' } },
            { progressId: 122803, stage: 'notable', title: { eu: 'x → +∞', es: 'x → +∞', en: 'x → +∞', ar: 'x → +∞' }, description: { eu: 'Gai nagusiak bakarrik.', es: 'Solo los términos principales.', en: 'Only the leading terms.', ar: 'الحدود الرئيسية فقط.' } }
        ]
    },
    reused('forms', ['review', 'review', 'notable'], 122811),
    reused('discontinuity', ['review', 'review', 'review'], 122821)
]

export const bach2LimitsGameProgressIds: number[] = levelProgressIds(bach2LimitsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2LimitsGameSlugs: Record<Bach2LimitsGameId, string> = { race: 'lasterketa', winner: 'nork-irabazi', assure: 'teorema', hunt: 'erroak', detective: 'detektibea', memory: 'memoria', forms: 'indeterminazioak', discontinuity: 'etenuneak' }

export function bach2LimitsGameModeForPath(pathname: string): Bach2LimitsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['nork-irabazi', 'quien-gana'].includes(game)) return 'winner'
    if (['teorema', 'lo-asegura'].includes(game)) return 'assure'
    if (['erroak', 'caza-raices'].includes(game)) return 'hunt'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['indeterminazioak', 'indeterminaciones'].includes(game)) return 'forms'
    if (['etenuneak', 'discontinuidades'].includes(game)) return 'discontinuity'
    return 'hub'
}
