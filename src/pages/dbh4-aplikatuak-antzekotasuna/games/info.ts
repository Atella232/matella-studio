import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Antzekotasuna (4. DBH aplikatuak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type SimilarityGameId = 'race' | 'memory' | 'tower' | 'map' | 'scale' | 'detective'

export const SIMILARITY_GAME_RECORDS_KEY = 'matella-antzekotasuna-dbh4ap-game-records'

export const similarityGames: GameInfo<SimilarityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Antzekotasunaren lasterketa', es: 'Carrera de semejanza', en: 'Similarity race', ar: 'سباق التشابه' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 52101, stage: 'thales', title: { eu: 'Tales', es: 'Tales', en: 'Thales', ar: 'طاليس' }, description: { eu: 'Zati ezezagunak eta banaketak.', es: 'Segmentos desconocidos y repartos.', en: 'Unknown segments and divisions.', ar: 'القطع المجهولة والتقسيمات.' } },
            { progressId: 52102, stage: 'similarity', title: { eu: 'Irudi antzekoak', es: 'Figuras semejantes', en: 'Similar figures', ar: 'الأشكال المتشابهة' }, description: { eu: 'Aldeak, arrazoiak eta homoteziak.', es: 'Lados, razones y homotecias.', en: 'Sides, ratios and homotheties.', ar: 'الأضلاع والنسب والتحاكيات.' } },
            { progressId: 52103, stage: 'ratios', title: { eu: 'r, r² eta r³', es: 'r, r² y r³', en: 'r, r² and r³', ar: 'r وr² وr³' }, description: { eu: 'Perimetroak, azalerak eta bolumenak.', es: 'Perímetros, áreas y volúmenes.', en: 'Perimeters, areas and volumes.', ar: 'المحيطات والمساحات والحجوم.' } },
            { progressId: 52104, stage: 'scales', title: { eu: 'Eskalak', es: 'Escalas', en: 'Scales', ar: 'المقاييس' }, description: { eu: 'Mapak, planoak eta maketak.', es: 'Mapas, planos y maquetas.', en: 'Maps, plans and scale models.', ar: 'الخرائط والمخططات والمجسّمات.' } },
            { progressId: 52105, stage: 'heights', title: { eu: 'Altuerak', es: 'Alturas', en: 'Altitudes', ar: 'الارتفاعات' }, description: { eu: 'Itzalak, ispiluak eta ikus-lerroak.', es: 'Sombras, espejos y líneas de visión.', en: 'Shadows, mirrors and lines of sight.', ar: 'الظلال والمرايا وخطوط النظر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu kalkulu bakoitza bere emaitzarekin.', es: 'Une cada cálculo con su resultado.', en: 'Match each calculation with its result.', ar: 'صِل كل حساب بنتيجته.' },
        skills: { eu: 'Tales, arrazoiak eta eskalak', es: 'Tales, razones y escalas', en: 'Thales, ratios and scales', ar: 'طاليس والنسب والمقاييس' },
        levels: [
            { progressId: 52201, stage: 'thales', title: { eu: 'Tales', es: 'Tales', en: 'Thales', ar: 'طاليس' }, description: { eu: '2/4 = 3/x ↔ x = 6', es: '2/4 = 3/x ↔ x = 6', en: '2/4 = 3/x ↔ x = 6', ar: '2/4 = 3/x ↔ x = 6' } },
            { progressId: 52202, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', en: 'Ratios', ar: 'النسب' }, description: { eu: 'r = 3 → A ↔ × 9', es: 'r = 3 → A ↔ × 9', en: 'r = 3 → A ↔ × 9', ar: 'r = 3 → A ↔ × 9' } },
            { progressId: 52203, stage: 'scales', title: { eu: 'Eskalak', es: 'Escalas', en: 'Scales', ar: 'المقاييس' }, description: { eu: '4 cm, 1:50 000 ↔ 2 km', es: '4 cm, 1:50 000 ↔ 2 km', en: '4 cm, 1:50,000 ↔ 2 km', ar: '4 cm, 1:50 000 ↔ 2 km' } }
        ]
    },
    {
        id: 'tower',
        title: { eu: 'Neurtu dorrea', es: 'Mide la torre', en: 'Measure the tower', ar: 'قِس البرج' },
        tagline: { eu: 'Itzalak, ispilu bat edo ikus-lerro bat: jarri altuera eta bota izpia.', es: 'Sombras, un espejo o una línea de visión: pon la altura y lanza el rayo.', en: 'Shadows, a mirror or a line of sight: set the height and cast the ray.', ar: 'ظلال أو مرآة أو خط نظر: ضع الارتفاع وأطلق الشعاع.' },
        skills: { eu: 'Altuerak triangelu antzekoekin', es: 'Alturas con triángulos semejantes', en: 'Heights with similar triangles', ar: 'الارتفاعات بالمثلثات المتشابهة' },
        levels: [
            { progressId: 52301, stage: 'heights', title: { eu: 'Itzalak', es: 'Sombras', en: 'Shadows', ar: 'الظلال' }, description: { eu: 'Metro osoak.', es: 'Metros enteros.', en: 'Whole metres.', ar: 'أمتار كاملة.' } },
            { progressId: 52302, stage: 'heights', title: { eu: 'Ispiluak', es: 'Espejos', en: 'Mirrors', ar: 'المرايا' }, description: { eu: 'Ispiluak eta itzalak, erdiekin.', es: 'Espejos y sombras, con medios.', en: 'Mirrors and shadows, with halves.', ar: 'مرايا وظلال مع الأنصاف.' } },
            { progressId: 52303, stage: 'heights', title: { eu: 'Ikus-lerroak', es: 'Líneas de visión', en: 'Lines of sight', ar: 'خطوط النظر' }, description: { eu: 'Makila baten gainetik begiratuta.', es: 'Mirando por encima de un palo.', en: 'Looking over a stick.', ar: 'بالنظر فوق عصا.' } }
        ]
    },
    {
        id: 'map',
        title: { eu: 'Mapako eskala', es: 'La escala del mapa', en: 'The map scale', ar: 'مقياس الخريطة' },
        tagline: { eu: 'Kokatu herria erregelan edo irakurri benetako distantzia.', es: 'Coloca el pueblo en la regla o lee la distancia real.', en: 'Place the town on the ruler or read the real distance.', ar: 'ضع القرية على المسطرة أو اقرأ المسافة الحقيقية.' },
        skills: { eu: 'Eskalak eta unitateak', es: 'Escalas y unidades', en: 'Scales and units', ar: 'المقاييس والوحدات' },
        levels: [
            { progressId: 52401, stage: 'scales', title: { eu: '1 cm = 1 edo 2 km', es: '1 cm = 1 o 2 km', en: '1 cm = 1 or 2 km', ar: '1 cm = 1 أو 2 km' }, description: { eu: 'Zentimetro osoak.', es: 'Centímetros enteros.', en: 'Whole centimetres.', ar: 'سنتيمترات كاملة.' } },
            { progressId: 52402, stage: 'scales', title: { eu: 'Beste eskala batzuk', es: 'Otras escalas', en: 'Other scales', ar: 'مقاييس أخرى' }, description: { eu: '1 : 50 000 eta 1 : 250 000, erdiekin.', es: '1 : 50 000 y 1 : 250 000, con medios.', en: '1 : 50,000 and 1 : 250,000, with halves.', ar: '1 : 50 000 و1 : 250 000 مع الأنصاف.' } },
            { progressId: 52403, stage: 'scales', title: { eu: 'Etxeen planoak', es: 'Planos de casas', en: 'House plans', ar: 'مخططات البيوت' }, description: { eu: '1 : 50, 1 : 100 eta 1 : 200, metrotan.', es: '1 : 50, 1 : 100 y 1 : 200, en metros.', en: '1 : 50, 1 : 100 and 1 : 200, in metres.', ar: '1 : 50 و1 : 100 و1 : 200 بالأمتار.' } }
        ]
    },
    {
        id: 'scale',
        title: { eu: 'Hazi k bider', es: 'Crece k veces', en: 'Grow it k times', ar: 'كبّره k مرة' },
        tagline: { eu: 'Neurri bat eta k arrazoia: zenbat da irudi antzekoan? Gero, kopiekin beteko da.', es: 'Una medida y la razón k: ¿cuánto es en la figura semejante? Luego se llena de copias.', en: 'A measure and the scale factor k: how much in the similar figure? Then it fills with copies.', ar: 'قياس ونسبة k: كم يصبح في الشكل المشابه؟ ثم يمتلئ بنسخ.' },
        skills: { eu: 'k, k² eta k³', es: 'k, k² y k³', en: 'k, k² and k³', ar: 'k وk² وk³' },
        levels: [
            { progressId: 52501, stage: 'ratios', title: { eu: 'Luzerak eta azalerak', es: 'Longitudes y áreas', en: 'Lengths and areas', ar: 'الأطوال والمساحات' }, description: { eu: 'Hesiak, markoak, pintura eta argazkiak.', es: 'Vallas, marcos, pintura y fotos.', en: 'Fences, frames, paint and photos.', ar: 'الأسوار والإطارات والدهان والصور.' } },
            { progressId: 52502, stage: 'ratios', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Pitxerrak, estatuak eta kaxak.', es: 'Jarras, estatuas y cajas.', en: 'Jugs, statues and boxes.', ar: 'الأباريق والتماثيل والصناديق.' } },
            { progressId: 52503, stage: 'ratios', title: { eu: 'Txikitu eta itzuli', es: 'Reducir y volver', en: 'Shrink and go back', ar: 'التصغير والعودة' }, description: { eu: 'k < 1, eta k-ren bila.', es: 'k < 1, y buscar k.', en: 'k < 1, and finding k.', ar: 'k < 1 وإيجاد k.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Antzekotasunaren detektibea', es: 'Detective de semejanza', en: 'Similarity detective', ar: 'مخبر التشابه' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Antzekotasuneko akats tipikoak', es: 'Errores típicos con la semejanza', en: 'Common mistakes with similarity', ar: 'الأخطاء الشائعة في التشابه' },
        levels: [
            { progressId: 52601, stage: 'thales', title: { eu: 'Tales', es: 'Tales', en: 'Thales', ar: 'طاليس' }, description: { eu: 'Proportzioak eta irudi antzekoak.', es: 'Proporciones y figuras semejantes.', en: 'Proportions and similar figures.', ar: 'التناسبات والأشكال المتشابهة.' } },
            { progressId: 52602, stage: 'scales', title: { eu: 'Arrazoiak eta eskalak', es: 'Razones y escalas', en: 'Ratios and scales', ar: 'النسب والمقاييس' }, description: { eu: 'k², mapak eta planoak.', es: 'k², mapas y planos.', en: 'k², maps and plans.', ar: 'k² والخرائط والمخططات.' } },
            { progressId: 52603, stage: 'heights', title: { eu: 'Altuerak', es: 'Alturas', en: 'Heights', ar: 'الارتفاعات' }, description: { eu: 'Itzalak eta unitateak.', es: 'Sombras y unidades.', en: 'Shadows and units.', ar: 'الظلال والوحدات.' } }
        ]
    }
]

export const similarityGameProgressIds: number[] = levelProgressIds(similarityGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const similarityGameSlugs: Record<SimilarityGameId, string> = { race: 'lasterketa', memory: 'memoria', tower: 'dorrea', map: 'mapa', scale: 'hazi', detective: 'detektibea' }

export function similarityGameModeForPath(pathname: string): SimilarityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['dorrea', 'torre'].includes(game)) return 'tower'
    if (['mapa', 'mapa-escala'].includes(game)) return 'map'
    if (['hazi', 'crece'].includes(game)) return 'scale'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
