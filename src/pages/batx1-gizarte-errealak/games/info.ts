import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachRealsGames } from '../../batx1-zientziak-errealak/games/info.ts'
import type { GizRealsStageId } from '../lessons.tsx'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Gizarte Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Three games of its own (order the economy, the fair
   headline and the detective), the race and the memory, and four games of
   the 1.º Ciencias twin kept as they are there (place on the line, build
   the interval, simplify the radical, find the exponent), with their texts
   and levels but the stages and progress ids of this unit.
   ========================================================================== */

export type GizRealsGameId = 'race' | 'order' | 'headline' | 'detective' | 'memory' | 'place' | 'intervals' | 'radical' | 'log'

export const GIZ_REALS_GAME_RECORDS_KEY = 'matella-errealak-batx1g-game-records'

/** A game of 1.º Ciencias with its texts and levels, the stages and progress ids of this unit */
function reused(id: GizRealsGameId, stages: GizRealsStageId[], firstId: number): GameInfo<GizRealsGameId> {
    const source = bachRealsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const gizRealsGames: GameInfo<GizRealsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Errealen lasterketa', es: 'Carrera de los reales', en: 'Real numbers race', ar: 'سباق الأعداد الحقيقية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 130401, stage: 'numbers', title: { eu: 'Zenbakiak eta multzoak', es: 'Números y conjuntos', en: 'Numbers and sets', ar: 'الأعداد والمجموعات' }, description: { eu: 'Elementuak zenbatu eta zenbakiak sailkatu.', es: 'Contar elementos y clasificar números.', en: 'Count elements and classify numbers.', ar: 'عدّ العناصر وتصنيف الأعداد.' } },
            { progressId: 130402, stage: 'line', title: { eu: 'Zuzen erreala', es: 'La recta real', en: 'The real line', ar: 'المستقيم الحقيقي' }, description: { eu: 'Distantziak, soluzioak eta inguruneak.', es: 'Distancias, soluciones y entornos.', en: 'Distances, solutions and neighbourhoods.', ar: 'المسافات والحلول والجوارات.' } },
            { progressId: 130403, stage: 'radicals', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'Berretzaile zatikiak, faktoreak atera eta arrazionalizatu.', es: 'Exponentes fraccionarios, sacar factores y racionalizar.', en: 'Fractional exponents, taking factors out and rationalising.', ar: 'الأسس الكسرية وإخراج العوامل والإنطاق.' } },
            { progressId: 130404, stage: 'logs', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Balioak, zati osoak eta zifrak.', es: 'Valores, partes enteras y cifras.', en: 'Values, whole-number parts and digits.', ar: 'القيم والأجزاء الصحيحة والأرقام.' } },
            { progressId: 130405, stage: 'errors', title: { eu: 'Erroreak eta idazkera zientifikoa', es: 'Errores y notación científica', en: 'Errors and scientific notation', ar: 'الأخطاء والترميز العلمي' }, description: { eu: 'Zifra esanguratsuak, errore erlatiboa eta berretzaileak.', es: 'Cifras significativas, error relativo y exponentes.', en: 'Significant figures, relative error and exponents.', ar: 'الأرقام المعنوية والخطأ النسبي والأسس.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Ordenatu ekonomia', es: 'Ordena la economía', en: 'Order the economy', ar: 'رتّب الاقتصاد' },
        tagline: { eu: 'Lau datu ekonomiko, modu desberdinetan idatzita: sakatu txikienetik handienera.', es: 'Cuatro datos económicos escritos de formas distintas: tócalos de menor a mayor.', en: 'Four economic figures written in different ways: tap them from smallest to largest.', ar: 'أربعة معطيات اقتصادية مكتوبة بطرق مختلفة: المسها من الأصغر إلى الأكبر.' },
        skills: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' },
        levels: [
            { progressId: 130501, stage: 'errors', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' }, description: { eu: 'Lehenik berretzailea, gero mantisa.', es: 'Primero el exponente, después la mantisa.', en: 'First the exponent, then the mantissa.', ar: 'الأس أولًا ثم الجزء العشري.' } },
            { progressId: 130502, stage: 'errors', title: { eu: 'Modu nahasiak', es: 'Formas mezcladas', en: 'Mixed forms', ar: 'صيغ مختلطة' }, description: { eu: '453 · 10¹¹ eta 0,85 · 10¹²: lehenik zuzendu.', es: '453 · 10¹¹ y 0,85 · 10¹²: primero, corrígelos.', en: '453 · 10¹¹ and 0.85 · 10¹²: put them right first.', ar: '453 · 10¹¹ و0.85 · 10¹²: صحّحها أولًا.' } },
            { progressId: 130503, stage: 'errors', title: { eu: 'Zenbaki txikiak', es: 'Números pequeños', en: 'Small numbers', ar: 'أعداد صغيرة' }, description: { eu: 'Berretzaile negatiboak eta hamartarrak.', es: 'Exponentes negativos y decimales.', en: 'Negative exponents and decimals.', ar: 'أسس سالبة وأعداد عشرية.' } }
        ]
    },
    {
        id: 'headline',
        title: { eu: 'Titular zuzena', es: 'El titular justo', en: 'The fair headline', ar: 'العنوان المنصف' },
        tagline: { eu: 'Datu zehatz bat eta lau titular biribildu: aukeratu laburrena, errore erlatiboa mugaren azpitik badu.', es: 'Un dato exacto y cuatro titulares redondeados: elige el más corto cuyo error relativo no pase del límite.', en: 'An exact figure and four rounded headlines: choose the shortest whose relative error stays under the limit.', ar: 'معطى دقيق وأربعة عناوين مقرّبة: اختر الأقصر الذي لا يتجاوز خطؤه النسبي الحدّ.' },
        skills: { eu: 'Biribiltzea eta errore erlatiboa', es: 'Redondeo y error relativo', en: 'Rounding and relative error', ar: 'التقريب والخطأ النسبي' },
        levels: [
            { progressId: 130601, stage: 'errors', title: { eu: '% 5 baino gutxiago', es: 'Menos del 5 %', en: 'Under 5%', ar: 'أقل من 5 %' }, description: { eu: 'Zifra gutxi nahikoa dira.', es: 'Bastan pocas cifras.', en: 'A few figures are enough.', ar: 'تكفي أرقام قليلة.' } },
            { progressId: 130602, stage: 'errors', title: { eu: '% 1 baino gutxiago', es: 'Menos del 1 %', en: 'Under 1%', ar: 'أقل من 1 %' }, description: { eu: 'Zifra bat gehiago behar da batzuetan.', es: 'A veces hace falta una cifra más.', en: 'Sometimes one more figure is needed.', ar: 'أحيانًا نحتاج رقمًا إضافيًا.' } },
            { progressId: 130603, stage: 'errors', title: { eu: '% 0,1 baino gutxiago', es: 'Menos del 0,1 %', en: 'Under 0.1%', ar: 'أقل من 0.1 %' }, description: { eu: 'Titular zehatzak.', es: 'Titulares precisos.', en: 'Precise headlines.', ar: 'عناوين دقيقة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Errealen detektibea', es: 'Detective de los reales', en: 'Real numbers detective', ar: 'مخبر الأعداد الحقيقية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 130701, stage: 'line', title: { eu: 'Multzoak eta zuzena', es: 'Conjuntos y recta', en: 'Sets and the line', ar: 'المجموعات والمستقيم' }, description: { eu: 'Elementuak, soluzioak eta erradioak.', es: 'Elementos, soluciones y radios.', en: 'Elements, solutions and radii.', ar: 'العناصر والحلول وأنصاف الأقطار.' } },
            { progressId: 130702, stage: 'logs', title: { eu: 'Erroak eta logaritmoak', es: 'Raíces y logaritmos', en: 'Roots and logarithms', ar: 'الجذور واللوغاريتمات' }, description: { eu: 'Indizeak, baturak eta zifrak.', es: 'Índices, sumas y cifras.', en: 'Indexes, sums and digits.', ar: 'الأدلة والمجاميع والأرقام.' } },
            { progressId: 130703, stage: 'errors', title: { eu: 'Erroreak eta berretzaileak', es: 'Errores y exponentes', en: 'Errors and exponents', ar: 'الأخطاء والأسس' }, description: { eu: 'Errore erlatiboa, zifrak eta koma.', es: 'Error relativo, cifras y coma.', en: 'Relative error, figures and the point.', ar: 'الخطأ النسبي والأرقام والفاصلة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: erroa eta bere berretura, logaritmoa eta bere balioa, edo zenbakia eta bere idazkera zientifikoa.', es: 'Encuentra las parejas: una raíz y su potencia, un logaritmo y su valor, o un número y su notación científica.', en: 'Find the pairs: a root and its power, a logarithm and its value, or a number and its scientific notation.', ar: 'جد الأزواج: جذر وقوته، أو لوغاريتم وقيمته، أو عدد وترميزه العلمي.' },
        skills: { eu: 'Erroak, logaritmoak eta idazkera zientifikoa', es: 'Raíces, logaritmos y notación científica', en: 'Roots, logarithms and scientific notation', ar: 'الجذور واللوغاريتمات والترميز العلمي' },
        levels: [
            { progressId: 130801, stage: 'radicals', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: '∛a² ↔ a^(2/3)', es: '∛a² ↔ a^(2/3)', en: '∛a² ↔ a^(2/3)', ar: '∛a² ↔ a^(2/3)' } },
            { progressId: 130802, stage: 'logs', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₃ 9 ↔ 2', es: 'log₃ 9 ↔ 2', en: 'log₃ 9 ↔ 2', ar: 'log₃ 9 ↔ 2' } },
            { progressId: 130803, stage: 'errors', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' }, description: { eu: '0,0045 ↔ 4,5 · 10⁻³', es: '0,0045 ↔ 4,5 · 10⁻³', en: '0.0045 ↔ 4.5 · 10⁻³', ar: '0.0045 ↔ 4.5 · 10⁻³' } }
        ]
    },
    reused('place', ['numbers', 'numbers', 'numbers'], 130811),
    reused('intervals', ['line', 'line', 'line'], 130821),
    reused('radical', ['radicals', 'radicals', 'radicals'], 130831),
    reused('log', ['logs', 'logs', 'logs'], 130841)
]

export const gizRealsGameProgressIds: number[] = levelProgressIds(gizRealsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizRealsGameSlugs: Record<GizRealsGameId, string> = { race: 'lasterketa', order: 'ordenatu', headline: 'titularra', detective: 'detektibea', memory: 'memoria', place: 'zuzena', intervals: 'tartea', radical: 'erroak', log: 'berretzailea' }

export function gizRealsGameModeForPath(pathname: string): GizRealsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ordenatu', 'ordena'].includes(game)) return 'order'
    if (['titularra', 'titular'].includes(game)) return 'headline'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zuzena', 'recta', 'situar', 'kokatu'].includes(game)) return 'place'
    if (['tartea', 'intervalo'].includes(game)) return 'intervals'
    if (['erroak', 'radicales'].includes(game)) return 'radical'
    if (['berretzailea', 'exponente'].includes(game)) return 'log'
    return 'hub'
}
