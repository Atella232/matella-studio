import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Four games belong to this topic (the gearbox, the photocopier, sharing
   the loot, the treasure map); the race and the memory are shared with the
   other units.
   ========================================================================== */

export type Proportion3GameId = 'race' | 'gearbox' | 'copier' | 'loot' | 'treasure' | 'memory'

export const PROPORTION3_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh3-game-records'

export const proportion3Games: GameInfo<Proportion3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', en: 'Proportions race', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 88101, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', en: 'Ratios', ar: 'النسب' }, description: { eu: 'Proportzioak eta eskalak.', es: 'Proporciones y escalas.', en: 'Proportions and scales.', ar: 'التناسبات والمقاييس.' } },
            { progressId: 88102, stage: 'simple', title: { eu: 'Zuzena eta alderantzizkoa', es: 'Directa e inversa', en: 'Direct and inverse', ar: 'الطردي والعكسي' }, description: { eu: 'Prezioak, langileak eta gurpilak.', es: 'Precios, obreros y ruedas.', en: 'Prices, workers and wheels.', ar: 'الأسعار والعمال والعجلات.' } },
            { progressId: 88103, stage: 'compound', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', en: 'Compound and sharing', ar: 'المركّب والتوزيعات' }, description: { eu: 'Banaketa zuzenak eta alderantzizkoak.', es: 'Repartos directos e inversos.', en: 'Direct and inverse sharing.', ar: 'توزيعات طردية وعكسية.' } },
            { progressId: 88104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Indizeak, kateatuak eta interesa.', es: 'Índices, encadenados e interés.', en: 'Indices, successive changes and interest.', ar: 'المؤشرات والمتتالية والفائدة.' } },
            { progressId: 88105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Nahasteak, mugikariak eta txorrotak.', es: 'Mezclas, móviles y grifos.', en: 'Mixtures, moving objects and taps.', ar: 'الخلطات والمتحركات والصنابير.' } }
        ]
    },
    {
        id: 'gearbox',
        title: { eu: 'Kanbio-kaxa', es: 'La caja de cambios', en: 'The gearbox', ar: 'علبة التروس' },
        tagline: { eu: 'Aukeratu gurpil egokia azken gurpilak eskatutako abiaduran bira egin dezan.', es: 'Elige la rueda justa para que la última gire a la velocidad pedida.', en: 'Pick the right wheel so that the last one turns at the speed asked for.', ar: 'اختر العجلة المناسبة لتدور الأخيرة بالسرعة المطلوبة.' },
        skills: { eu: 'Alderantzizko proportzionaltasuna: hortzak bider birak', es: 'Proporcionalidad inversa: dientes por vueltas', en: 'Inverse proportion: teeth times turns', ar: 'التناسب العكسي: الأسنان في الدورات' },
        levels: [
            { progressId: 88301, stage: 'simple', title: { eu: 'Bi gurpil', es: 'Dos ruedas', en: 'Two wheels', ar: 'عجلتان' }, description: { eu: 'A gurpilak B mugitzen du.', es: 'La rueda A mueve la B.', en: 'Wheel A drives wheel B.', ar: 'العجلة A تحرّك B.' } },
            { progressId: 88302, stage: 'simple', title: { eu: 'Erdiko gurpila', es: 'La rueda del medio', en: 'The wheel in the middle', ar: 'العجلة الوسطى' }, description: { eu: 'Erdikoak ez du abiadura aldatzen.', es: 'La del medio no cambia la velocidad.', en: 'The middle one does not change the speed.', ar: 'الوسطى لا تغيّر السرعة.' } },
            { progressId: 88303, stage: 'simple', title: { eu: 'Ardatz bera', es: 'El mismo eje', en: 'The same axle', ar: 'المحور نفسه' }, description: { eu: 'Bi gurpil ardatz berean: bi aldiz.', es: 'Dos ruedas en un eje: dos veces.', en: 'Two wheels on one axle: twice.', ar: 'عجلتان على محور واحد: مرتين.' } }
        ]
    },
    {
        id: 'copier',
        title: { eu: 'Fotokopiagailua', es: 'La fotocopiadora', en: 'The photocopier', ar: 'آلة النسخ' },
        tagline: { eu: 'Handitu eta txikitu argazkia ehunekoekin, neurri zehatzera iritsi arte.', es: 'Amplía y reduce la foto con porcentajes hasta llegar a la medida exacta.', en: 'Enlarge and reduce the photo with percentages until it is exactly the right size.', ar: 'كبّر الصورة وصغّرها بالنسب المئوية حتى تبلغ المقاس الصحيح.' },
        skills: { eu: 'Ehuneko kateatuak: indizeak biderkatzen dira', es: 'Porcentajes encadenados: los índices se multiplican', en: 'Successive percentages: the indices are multiplied', ar: 'النسب المتتالية: تُضرب المؤشرات' },
        levels: [
            { progressId: 88401, stage: 'percent', title: { eu: 'Handitu', es: 'Ampliar', en: 'Enlarge', ar: 'تكبير' }, description: { eu: 'Bi sakatze, igoerak bakarrik.', es: 'Dos pulsaciones, solo aumentos.', en: 'Two presses, increases only.', ar: 'ضغطتان، زيادات فقط.' } },
            { progressId: 88402, stage: 'percent', title: { eu: 'Handitu eta txikitu', es: 'Ampliar y reducir', en: 'Enlarge and reduce', ar: 'تكبير وتصغير' }, description: { eu: 'Bi sakatze, gora eta behera.', es: 'Dos pulsaciones, arriba y abajo.', en: 'Two presses, up and down.', ar: 'ضغطتان، صعودًا ونزولًا.' } },
            { progressId: 88403, stage: 'percent', title: { eu: 'Hiru sakatze', es: 'Tres pulsaciones', en: 'Three presses', ar: 'ثلاث ضغطات' }, description: { eu: 'Zortzi botoi, hiru sakatze.', es: 'Ocho botones, tres pulsaciones.', en: 'Eight buttons, three presses.', ar: 'ثمانية أزرار، ثلاث ضغطات.' } }
        ]
    },
    {
        id: 'loot',
        title: { eu: 'Altxorraren banaketa', es: 'El reparto del botín', en: 'Sharing the loot', ar: 'تقسيم الغنيمة' },
        tagline: { eu: 'Banatu txanponak piraten artean, bidezko moduan: lan egindako egunen arabera edo akatsen arabera.', es: 'Reparte las monedas entre los piratas con justicia: por los días trabajados o por los fallos.', en: 'Share the coins among the pirates fairly: by the days worked or by the mistakes made.', ar: 'وزّع العملات على القراصنة بالعدل: حسب أيام العمل أو حسب الأخطاء.' },
        skills: { eu: 'Banaketa zuzenki eta alderantziz proportzionalak', es: 'Repartos directa e inversamente proporcionales', en: 'Sharing in direct and inverse proportion', ar: 'التوزيع الطردي والعكسي' },
        levels: [
            { progressId: 88501, stage: 'compound', title: { eu: 'Bi pirata', es: 'Dos piratas', en: 'Two pirates', ar: 'قرصانان' }, description: { eu: 'Egunekiko zuzenean.', es: 'Directo a los días.', en: 'In direct proportion to the days.', ar: 'طرديًا مع الأيام.' } },
            { progressId: 88502, stage: 'compound', title: { eu: 'Hiru pirata', es: 'Tres piratas', en: 'Three pirates', ar: 'ثلاثة قراصنة' }, description: { eu: 'Egunekiko zuzenean.', es: 'Directo a los días.', en: 'In direct proportion to the days.', ar: 'طرديًا مع الأيام.' } },
            { progressId: 88503, stage: 'compound', title: { eu: 'Akatsak', es: 'Los fallos', en: 'The mistakes', ar: 'الأخطاء' }, description: { eu: 'Akatsekiko alderantziz.', es: 'Inverso a los fallos.', en: 'In inverse proportion to the mistakes.', ar: 'عكسيًا مع الأخطاء.' } }
        ]
    },
    {
        id: 'treasure',
        title: { eu: 'Altxorraren mapa', es: 'El mapa del tesoro', en: 'The treasure map', ar: 'خريطة الكنز' },
        tagline: { eu: 'Irakurri mapako eskala: jarri kutxa, neurtu bidea edo asmatu eskala.', es: 'Lee la escala del mapa: coloca el cofre, mide el camino o adivina la escala.', en: 'Read the map\'s scale: place the chest, measure the path or work out the scale.', ar: 'اقرأ مقياس الخريطة: ضع الصندوق أو قِس الطريق أو اكتشف المقياس.' },
        skills: { eu: 'Eskalak eta unitateak', es: 'Escalas y unidades', en: 'Scales and units', ar: 'المقاييس والوحدات' },
        levels: [
            { progressId: 88601, stage: 'ratios', title: { eu: 'Jarri kutxa', es: 'Coloca el cofre', en: 'Place the chest', ar: 'ضع الصندوق' }, description: { eu: 'Benetako distantziatik maparako cm-tara.', es: 'De la distancia real a los cm del mapa.', en: 'From the real distance to cm on the map.', ar: 'من المسافة الحقيقية إلى سنتيمترات الخريطة.' } },
            { progressId: 88602, stage: 'ratios', title: { eu: 'Neurtu bidea', es: 'Mide el camino', en: 'Measure the path', ar: 'قِس الطريق' }, description: { eu: 'Mapako cm-etatik benetako distantziara.', es: 'De los cm del mapa a la distancia real.', en: 'From cm on the map to the real distance.', ar: 'من سنتيمترات الخريطة إلى المسافة الحقيقية.' } },
            { progressId: 88603, stage: 'ratios', title: { eu: 'Zein eskala?', es: '¿Qué escala?', en: 'Which scale?', ar: 'أي مقياس؟' }, description: { eu: 'Bi distantziekin, eskala.', es: 'Con las dos distancias, la escala.', en: 'From the two distances, the scale.', ar: 'من المسافتين، المقياس.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu galdera bakoitza bere emaitzarekin.', es: 'Une cada pregunta con su resultado.', en: 'Match each question with its result.', ar: 'صِل كل سؤال بنتيجته.' },
        skills: { eu: 'Proportzioak, ehunekoak eta indizeak buruz', es: 'Proporciones, porcentajes e índices de cabeza', en: 'Proportions, percentages and indices in your head', ar: 'التناسبات والنسب المئوية والمؤشرات ذهنيًا' },
        levels: [
            { progressId: 88201, stage: 'ratios', title: { eu: 'Proportzioak', es: 'Proporciones', en: 'Proportions', ar: 'التناسبات' }, description: { eu: '4/10 = 6/x ↔ 15', es: '4/10 = 6/x ↔ 15', en: '4/10 = 6/x ↔ 15', ar: '4/10 = 6/x ↔ 15' } },
            { progressId: 88202, stage: 'percent', title: { eu: 'Indizeak', es: 'Índices', en: 'Indices', ar: 'المؤشرات' }, description: { eu: '+20 % ↔ 1,2', es: '+20 % ↔ 1,2', en: '+20% ↔ 1.2', ar: '+20٪ ↔ 1.2' } },
            { progressId: 88203, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: '% 15 · 80 ↔ 12', es: '15 % de 80 ↔ 12', en: '15% of 80 ↔ 12', ar: '15٪ من 80 ↔ 12' } }
        ]
    }
]

export const proportion3GameProgressIds: number[] = levelProgressIds(proportion3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportion3GameSlugs: Record<Proportion3GameId, string> = { race: 'lasterketa', gearbox: 'kanbioak', copier: 'fotokopiak', loot: 'altxorra', treasure: 'mapa', memory: 'memoria' }

export function proportion3GameModeForPath(pathname: string): Proportion3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['kanbioak', 'cambios'].includes(game)) return 'gearbox'
    if (['fotokopiak', 'fotocopias'].includes(game)) return 'copier'
    if (['altxorra', 'botin'].includes(game)) return 'loot'
    if (['mapa', 'tesoro'].includes(game)) return 'treasure'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
