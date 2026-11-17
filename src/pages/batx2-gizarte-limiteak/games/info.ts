import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachLimitsGames } from '../../batx1-zientziak-limiteak/games/info.ts'
import type { Bach2gLimitsStageId } from '../lessons.tsx'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 2 · Gizarte Zientziak) games:
   the list shown in the hub, with levels and the unit progress id each
   level earns with its first star. Two games of its own (in the long
   run?, close the tariff), the detective with the mistakes of this unit,
   the race and the memory, and two games of Límites of 1.º (indeterminate
   or not? and which discontinuity?), with their texts and levels but the
   stages and progress ids of this unit.
   ========================================================================== */

export type Bach2gLimitsGameId = 'race' | 'long-run' | 'close-tariff' | 'detective' | 'memory' | 'forms' | 'discontinuity'

export const BACH2G_LIMITS_GAME_RECORDS_KEY = 'matella-limiteak-batx2g-game-records'

/** A Límites 1.º game with its texts and levels, the stages and progress ids of this unit */
function reused(id: Bach2gLimitsGameId, stages: Bach2gLimitsStageId[], firstId: number): GameInfo<Bach2gLimitsGameId> {
    const source = bachLimitsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bach2gLimitsGames: GameInfo<Bach2gLimitsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Limiteen lasterketa', es: 'Carrera de límites', en: 'Limits race', ar: 'سباق النهايات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 145401, stage: 'graph', title: { eu: 'Infinituarekin', es: 'Con el infinito', en: 'With infinity', ar: 'مع اللانهاية' }, description: { eu: 'k/∞ = 0 eta limiteekin eragiketak.', es: 'k/∞ = 0 y operar con límites.', en: 'k/∞ = 0 and working with limits.', ar: 'k/∞ = 0 والحساب بالنهايات.' } },
            { progressId: 145402, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: 'Mailak, konjokatua eta e zenbakia.', es: 'Grados, conjugado y el número e.', en: 'Degrees, the conjugate and the number e.', ar: 'الدرجات والمرافق والعدد e.' } },
            { progressId: 145403, stage: 'point', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: 'Ordezkatu, faktorizatu eta erroak.', es: 'Sustituir, factorizar y raíces.', en: 'Substitute, factorise and roots.', ar: 'التعويض والتحليل والجذور.' } },
            { progressId: 145404, stage: 'continuity', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' }, description: { eu: 'Parametroa, jauzia eta zuloa.', es: 'Parámetro, salto y agujero.', en: 'A parameter, a jump and a hole.', ar: 'الوسيط والقفزة والثقب.' } },
            { progressId: 145405, stage: 'context', title: { eu: 'Ekonomia', es: 'Economía', en: 'Economy', ar: 'الاقتصاد' }, description: { eu: 'Epe luzera, batez besteko kostua eta kuota.', es: 'Largo plazo, coste medio y cuota.', en: 'The long run, average cost and charge.', ar: 'المدى الطويل ومتوسط التكلفة والحصة.' } }
        ]
    },
    {
        id: 'long-run',
        title: { eu: 'Epe luzera?', es: '¿A largo plazo?', en: 'In the long run?', ar: 'على المدى الطويل؟' },
        tagline: { eu: 'Biztanleria, salmentak edo kostuak: itzaltzen doaz, zenbaki batean egonkortzen dira ala mugarik gabe hazten dira?', es: 'Población, ventas o costes: ¿se apagan, se estabilizan en un número o crecen sin límite?', en: 'Population, sales or costs: do they die away, level off at a number or grow without limit?', ar: 'السكان أو المبيعات أو التكاليف: هل تتلاشى أم تستقر عند عدد أم تكبر بلا حد؟' },
        skills: { eu: 'Limiteak infinituan, testuinguruan', es: 'Límites en el infinito, en contexto', en: 'Limits at infinity, in context', ar: 'النهايات عند اللانهاية في سياقها' },
        levels: [
            { progressId: 145501, stage: 'context', title: { eu: 'Ereduak', es: 'Modelos', en: 'Models', ar: 'النماذج' }, description: { eu: 'Biztanleria, salmentak eta ikaskuntza.', es: 'Población, ventas y aprendizaje.', en: 'Population, sales and learning.', ar: 'السكان والمبيعات والتعلّم.' } },
            { progressId: 145502, stage: 'context', title: { eu: 'Batez besteko kostua', es: 'Coste medio', en: 'Average cost', ar: 'متوسط التكلفة' }, description: { eu: 'C(x)/x, hiru kostu motarekin.', es: 'C(x)/x, con tres clases de coste.', en: 'C(x)/x, with three kinds of cost.', ar: 'C(x)/x مع ثلاثة أنواع من التكلفة.' } },
            { progressId: 145503, stage: 'context', title: { eu: 'Nahasian', es: 'Mezclados', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Esponentzialak eta erroak ere bai.', es: 'También exponenciales y raíces.', en: 'Exponentials and roots too.', ar: 'والأسيات والجذور أيضًا.' } }
        ]
    },
    {
        id: 'close-tariff',
        title: { eu: 'Itxi tarifa', es: 'Cierra la tarifa', en: 'Close the tariff', ar: 'أغلق التعريفة' },
        tagline: { eu: 'Tarifa batek jauzi egiten du tarte-aldaketan: aukeratu jauzia kentzen duen balioa.', es: 'Una tarifa salta al cambiar de tramo: elige el valor que quita el salto.', en: 'A tariff jumps where the bracket changes: pick the value that removes the jump.', ar: 'تقفز التعريفة عند تغيّر الشريحة: اختر القيمة التي تزيل القفزة.' },
        skills: { eu: 'Parametrodun jarraitutasuna', es: 'Continuidad con parámetros', en: 'Continuity with parameters', ar: 'الاتصال مع الوسطاء' },
        levels: [
            { progressId: 145601, stage: 'context', title: { eu: 'Kuota finkoa', es: 'La cuota fija', en: 'The fixed charge', ar: 'الحصة الثابتة' }, description: { eu: 'Bi tarte eta k bat.', es: 'Dos tramos y una k.', en: 'Two brackets and a k.', ar: 'شريحتان وk واحدة.' } },
            { progressId: 145602, stage: 'context', title: { eu: 'Prezioa', es: 'El precio', en: 'The price', ar: 'السعر' }, description: { eu: 'Bigarren tarteko prezioa.', es: 'El precio del segundo tramo.', en: 'The price of the second bracket.', ar: 'سعر الشريحة الثانية.' } },
            { progressId: 145603, stage: 'continuity', title: { eu: 'Hiru tarte', es: 'Tres tramos', en: 'Three brackets', ar: 'ثلاث شرائح' }, description: { eu: 'Bi kuota, bata bestearen ondoren.', es: 'Dos cuotas, una tras otra.', en: 'Two charges, one after the other.', ar: 'حصتان، واحدة بعد الأخرى.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Limiteen detektibea', es: 'Detective de límites', en: 'Limits detective', ar: 'مخبر النهايات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: 'Limiteen akats ohikoak', es: 'Los errores típicos de límites', en: 'The typical mistakes with limits', ar: 'الأخطاء الشائعة في النهايات' },
        levels: [
            { progressId: 145701, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: '∞ − ∞, 1^∞, mailak eta zeinua.', es: '∞ − ∞, 1^∞, grados y signo.', en: '∞ − ∞, 1^∞, degrees and sign.', ar: '∞ − ∞ و1^∞ والدرجات والإشارة.' } },
            { progressId: 145702, stage: 'continuity', title: { eu: 'Puntua eta jarraitutasuna', es: 'Punto y continuidad', en: 'Point and continuity', ar: 'النقطة والاتصال' }, description: { eu: 'k/0, 0/0, f(a) eta zatiak.', es: 'k/0, 0/0, f(a) y trozos.', en: 'k/0, 0/0, f(a) and pieces.', ar: 'k/0 و0/0 وf(a) والأجزاء.' } },
            { progressId: 145703, stage: 'context', title: { eu: 'Ekonomia', es: 'Economía', en: 'Economy', ar: 'الاقتصاد' }, description: { eu: 'Epe luzera, kostuak eta tarifak.', es: 'Largo plazo, costes y tarifas.', en: 'The long run, costs and tariffs.', ar: 'المدى الطويل والتكاليف والتعريفات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Limiteen memoria', es: 'Memoria de límites', en: 'Limits memory', ar: 'ذاكرة النهايات' },
        tagline: { eu: 'Egin bikoteak: limite bat eta bere balioa.', es: 'Haz parejas: un límite y su valor.', en: 'Make pairs: a limit and its value.', ar: 'كوّن أزواجًا: نهاية وقيمتها.' },
        skills: { eu: 'Infinituan, e zenbakia eta epe luzera', es: 'En el infinito, el número e y a largo plazo', en: 'At infinity, the number e and the long run', ar: 'عند اللانهاية والعدد e والمدى الطويل' },
        levels: [
            { progressId: 145801, stage: 'infinity', title: { eu: 'x → +∞', es: 'x → +∞', en: 'x → +∞', ar: 'x → +∞' }, description: { eu: 'Zatidurak eta konjokatua.', es: 'Cocientes y conjugado.', en: 'Quotients and the conjugate.', ar: 'خوارج القسمة والمرافق.' } },
            { progressId: 145802, stage: 'infinity', title: { eu: 'Bat infinitura', es: 'Uno a infinito', en: 'One to infinity', ar: 'واحد أس لانهاية' }, description: { eu: 'Limitea eᵃ da.', es: 'El límite es eᵃ.', en: 'The limit is eᵃ.', ar: 'النهاية eᵃ.' } },
            { progressId: 145803, stage: 'context', title: { eu: 'Epe luzera', es: 'A largo plazo', en: 'In the long run', ar: 'على المدى الطويل' }, description: { eu: 'Biztanleria eta batez besteko kostua.', es: 'Población y coste medio.', en: 'Population and average cost.', ar: 'السكان ومتوسط التكلفة.' } }
        ]
    },
    reused('forms', ['point', 'infinity', 'graph'], 145811),
    reused('discontinuity', ['continuity', 'continuity', 'continuity'], 145821)
]

export const bach2gLimitsGameProgressIds: number[] = levelProgressIds(bach2gLimitsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2gLimitsGameSlugs: Record<Bach2gLimitsGameId, string> = { race: 'lasterketa', 'long-run': 'epe-luzera', 'close-tariff': 'itxi-tarifa', detective: 'detektibea', memory: 'memoria', forms: 'indeterminazioak', discontinuity: 'etenuneak' }

export function bach2gLimitsGameModeForPath(pathname: string): Bach2gLimitsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['epe-luzera', 'largo-plazo'].includes(game)) return 'long-run'
    if (['itxi-tarifa', 'cierra-tarifa'].includes(game)) return 'close-tariff'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['indeterminazioak', 'indeterminaciones'].includes(game)) return 'forms'
    if (['etenuneak', 'discontinuidades'].includes(game)) return 'discontinuity'
    return 'hub'
}
