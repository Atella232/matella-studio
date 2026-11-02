import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna (1. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type ProportionGameId = 'race' | 'memory' | 'recipe' | 'grid' | 'detective'

export const PROPORTION_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh1-game-records'

export const proportionGames: GameInfo<ProportionGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', en: 'Proportion race', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 16101, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', en: 'Ratios', ar: 'النسب' }, description: { eu: 'Arrazoiaren balioa eta proportzioak.', es: 'El valor de la razón y las proporciones.', en: 'The value of the ratio and proportions.', ar: 'قيمة النسبة والتناسبات.' } },
            { progressId: 16102, stage: 'direct', title: { eu: 'Zuzena', es: 'Directa', en: 'Direct', ar: 'طردي' }, description: { eu: 'Zatitu eta biderkatu.', es: 'Divide y multiplica.', en: 'Divide and multiply.', ar: 'اقسم واضرب.' } },
            { progressId: 16103, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', en: 'Inverse', ar: 'عكسي' }, description: { eu: 'Biderkatu eta zatitu.', es: 'Multiplica y divide.', en: 'Multiply and divide.', ar: 'اضرب واقسم.' } },
            { progressId: 16104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Zatia, ehunekoa eta osoa.', es: 'La parte, el porcentaje y el total.', en: 'The part, the percentage and the total.', ar: 'الجزء والنسبة والكل.' } },
            { progressId: 16105, stage: 'changes', title: { eu: 'Beherapenak eta igoerak', es: 'Rebajas y subidas', en: 'Discounts and increases', ar: 'التخفيضات والزيادات' }, description: { eu: 'Azken prezioa.', es: 'El precio final.', en: 'The final price.', ar: 'السعر النهائي.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Ehunekoak eta proportzioak', es: 'Porcentajes y proporciones', en: 'Percentages and proportions', ar: 'النسب المئوية والتناسبات' },
        levels: [
            { progressId: 16201, stage: 'percent', title: { eu: 'Ehunekoaren formak', es: 'Las formas del porcentaje', en: 'The forms of a percentage', ar: 'صيغ النسبة المئوية' }, description: { eu: '25 % ↔ 1/4 · 9 % ↔ 0,09', es: '25 % ↔ 1/4 · 9 % ↔ 0,09', en: '25% ↔ 1/4 · 9% ↔ 0.09', ar: '25٪ ↔ 1/4 · 9٪ ↔ 0.09' } },
            { progressId: 16202, stage: 'percent', title: { eu: 'Kantitate baten ehunekoa', es: 'Porcentaje de una cantidad', en: 'Percentage of a quantity', ar: 'نسبة من كمية' }, description: { eu: '20 % · 50 ↔ 10', es: '20 % · 50 ↔ 10', en: '20% · 50 ↔ 10', ar: '20٪ · 50 ↔ 10' } },
            { progressId: 16203, stage: 'ratios', title: { eu: 'Proportzioak', es: 'Proporciones', en: 'Proportions', ar: 'التناسبات' }, description: { eu: '3/6 = 7/x ↔ x = 14', es: '3/6 = 7/x ↔ x = 14', en: '3/6 = 7/x ↔ x = 14', ar: '3/6 = 7/x ↔ x = 14' } }
        ]
    },
    {
        id: 'recipe',
        title: { eu: 'Errezeta', es: 'La receta', en: 'The recipe', ar: 'الوصفة' },
        tagline: { eu: 'Errezeta bat pertsona gehiago edo gutxiagorentzat: aukeratu kantitatea eta ikusi errezeta osoa.', es: 'Una receta para más o menos personas: elige la cantidad y mira la receta entera.', en: 'A recipe for more or fewer people: choose the amount and see the whole recipe.', ar: 'وصفة لأشخاص أكثر أو أقل: اختر الكمية وانظر إلى الوصفة كاملة.' },
        skills: { eu: 'Proportzionaltasun zuzena', es: 'Proporcionalidad directa', en: 'Direct proportion', ar: 'التناسب الطردي' },
        levels: [
            { progressId: 16301, stage: 'direct', title: { eu: 'Bikoitza eta erdia', es: 'Doble y mitad', en: 'Double and half', ar: 'الضعف والنصف' }, description: { eu: 'Pertsona bikoitza edo erdia.', es: 'El doble o la mitad de personas.', en: 'Twice or half the people.', ar: 'ضعف عدد الأشخاص أو نصفه.' } },
            { progressId: 16302, stage: 'direct', title: { eu: 'Pertsona bakoitzeko', es: 'Por persona', en: 'Per person', ar: 'لكل شخص' }, description: { eu: 'Edozein pertsona kopuru.', es: 'Cualquier número de personas.', en: 'Any number of people.', ar: 'أي عدد من الأشخاص.' } },
            { progressId: 16303, stage: 'direct', title: { eu: 'Zenbat pertsonarentzat?', es: '¿Para cuántas personas?', en: 'For how many people?', ar: 'لكم شخصًا؟' }, description: { eu: 'Kantitatea ezaguna da.', es: 'Se conoce la cantidad.', en: 'The amount is known.', ar: 'الكمية معروفة.' } }
        ]
    },
    {
        id: 'grid',
        title: { eu: 'Margotu ehunekoa', es: 'Pinta el porcentaje', en: 'Paint the percentage', ar: 'لوّن النسبة' },
        tagline: { eu: 'Laukitxoak margotu: ehuneko bat, igoera bat edo deskontu bat.', es: 'Pinta casillas: un porcentaje, una subida o un descuento.', en: 'Paint squares: a percentage, a rise or a discount.', ar: 'لوّن المربعات: نسبة أو زيادة أو تخفيض.' },
        skills: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' },
        levels: [
            { progressId: 16401, stage: 'percent', title: { eu: '10 eta 20 laukitxo', es: '10 y 20 casillas', en: '10 and 20 squares', ar: '10 و20 مربعًا' }, description: { eu: 'Ehuneko errazak.', es: 'Porcentajes fáciles.', en: 'Easy percentages.', ar: 'نسب سهلة.' } },
            { progressId: 16402, stage: 'percent', title: { eu: '25, 40 eta 50 laukitxo', es: '25, 40 y 50 casillas', en: '25, 40 and 50 squares', ar: '25 و40 و50 مربعًا' }, description: { eu: 'Laukitxo bakoitza ez da 10 %.', es: 'Cada casilla no es el 10 %.', en: 'Each square is not 10 %.', ar: 'كل مربع ليس 10 %.' } },
            { progressId: 16403, stage: 'changes', title: { eu: 'Igoerak eta deskontuak', es: 'Subidas y descuentos', en: 'Rises and discounts', ar: 'الزيادات والتخفيضات' }, description: { eu: 'Prezio berria margotu.', es: 'Pinta el precio nuevo.', en: 'Paint the new price.', ar: 'لوّن السعر الجديد.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Proportzionaltasunaren detektibea', es: 'Detective de proporcionalidad', en: 'Proportionality detective', ar: 'مخبر التناسب' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Proportzioetan akats tipikoak', es: 'Errores típicos de proporcionalidad', en: 'Common proportion mistakes', ar: 'الأخطاء الشائعة في التناسب' },
        levels: [
            { progressId: 16501, stage: 'direct', title: { eu: 'Arrazoiak eta zuzena', es: 'Razones y directa', en: 'Ratios and direct', ar: 'النسب والطردي' }, description: { eu: 'Batu, hiruko erregela eta arrazoiaren ordena.', es: 'Sumar, la regla de tres y el orden de la razón.', en: 'Adding, the rule of three and the order of a ratio.', ar: 'الجمع والقاعدة الثلاثية وترتيب النسبة.' } },
            { progressId: 16502, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', en: 'Inverse', ar: 'العكسي' }, description: { eu: 'Biderkadura konstantea da.', es: 'El producto es constante.', en: 'The product is constant.', ar: 'الجداء ثابت.' } },
            { progressId: 16503, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Deskontuak eta igoerak.', es: 'Descuentos y subidas.', en: 'Discounts and rises.', ar: 'التخفيضات والزيادات.' } }
        ]
    }
]

export const proportionGameProgressIds: number[] = levelProgressIds(proportionGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionGameSlugs: Record<ProportionGameId, string> = { race: 'lasterketa', memory: 'memoria', recipe: 'errezeta', grid: 'ehunekoa', detective: 'detektibea' }

export function proportionGameModeForPath(pathname: string): ProportionGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['errezeta', 'receta'].includes(game)) return 'recipe'
    if (['ehunekoa', 'porcentaje'].includes(game)) return 'grid'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
