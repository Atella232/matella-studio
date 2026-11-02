import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna (4. DBH akademikoak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star.
   ========================================================================== */

export type AreasSimilarityGameId = 'race' | 'memory' | 'pour' | 'scale' | 'detective'

export const AREAS_SIMILARITY_GAME_RECORDS_KEY = 'matella-areak-dbh4ak-game-records'

export const areasSimilarityGames: GameInfo<AreasSimilarityGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Azalera eta bolumenen lasterketa', es: 'Carrera de áreas y volúmenes', en: 'Areas and volumes race', ar: 'سباق المساحات والحجوم' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 70101, stage: 'plane-areas', title: { eu: 'Irudi lauak', es: 'Figuras planas', en: 'Flat shapes', ar: 'الأشكال المستوية' }, description: { eu: 'Arkuak, poligonoak, koroak, sektoreak eta segmentuak.', es: 'Arcos, polígonos, coronas, sectores y segmentos.', en: 'Arcs, polygons, annuli, sectors and segments.', ar: 'الأقواس والمضلعات والحلقات والقطاعات والقطع.' } },
            { progressId: 70102, stage: 'solid-areas', title: { eu: 'Gorputzen azalerak', es: 'Áreas de cuerpos', en: 'Areas of solids', ar: 'مساحات الأجسام' }, description: { eu: 'Piramideak, konoak, esfera-erdiak eta zona esferikoak.', es: 'Pirámides, conos, semiesferas y zonas esféricas.', en: 'Pyramids, cones, hemispheres and spherical zones.', ar: 'الأهرام والمخاريط وأنصاف الكرات والمناطق الكروية.' } },
            { progressId: 70103, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Sortzailetik eta apotematik, esferak eta gorputz konposatuak.', es: 'Desde la generatriz y la apotema, esferas y cuerpos compuestos.', en: 'From the slant height and the apothem, spheres and composite solids.', ar: 'من الراسم والعامد، والكرات والأجسام المركّبة.' } },
            { progressId: 70104, stage: 'similarity', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' }, description: { eu: 'Tales, irudi antzekoak, altuera eta katetoa.', es: 'Tales, figuras semejantes, altura y cateto.', en: 'Thales, similar figures, altitude and leg.', ar: 'طاليس والأشكال المتشابهة والارتفاع والضلع القائم.' } },
            { progressId: 70105, stage: 'ratios', title: { eu: 'Arrazoiak eta eskalak', es: 'Razones y escalas', en: 'Ratios and scales', ar: 'النسب والمقاييس' }, description: { eu: 'k, k² eta k³, enborrak, planoak eta maketak.', es: 'k, k² y k³, troncos, planos y maquetas.', en: 'k, k² and k³, frustums, plans and scale models.', ar: 'k وk² وk³ والجذوع والمخططات والمجسّمات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere emaitzarekin.', es: 'Une cada carta con su resultado.', en: 'Match each card with its result.', ar: 'صِل كل بطاقة بنتيجتها.' },
        skills: { eu: 'Altuera, k² eta k³, eta bolumenak π-rekin', es: 'Altura, k² y k³, y volúmenes con π', en: 'Height, k² and k³, and volumes with π', ar: 'الارتفاع وk² وk³ والحجوم بدلالة π' },
        levels: [
            { progressId: 70201, stage: 'similarity', title: { eu: 'Altueraren teorema', es: 'Teorema de la altura', en: 'Altitude theorem', ar: 'مبرهنة الارتفاع' }, description: { eu: 'm = 4, n = 9 ↔ h = 6', es: 'm = 4, n = 9 ↔ h = 6', en: 'm = 4, n = 9 ↔ h = 6', ar: 'm = 4, n = 9 ↔ h = 6' } },
            { progressId: 70202, stage: 'ratios', title: { eu: 'k² eta k³', es: 'k² y k³', en: 'k² and k³', ar: 'k² وk³' }, description: { eu: 'k = 3, V₂ : V₁ ↔ 27', es: 'k = 3, V₂ : V₁ ↔ 27', en: 'k = 3, V₂ : V₁ ↔ 27', ar: 'k = 3, V₂ : V₁ ↔ 27' } },
            { progressId: 70203, stage: 'volumes', title: { eu: 'Bolumenak π-rekin', es: 'Volúmenes con π', en: 'Volumes with π', ar: 'الحجوم بدلالة π' }, description: { eu: 'π · 3² · 4 : 3 ↔ 12π', es: 'π · 3² · 4 : 3 ↔ 12π', en: 'π · 3² · 4 : 3 ↔ 12π', ar: 'π · 3² · 4 : 3 ↔ 12π' } }
        ]
    },
    {
        id: 'pour',
        title: { eu: 'Zenbat ontzi?', es: '¿Cuántos vasos?', en: 'How many glasses?', ar: 'كم كأسًا؟' },
        tagline: { eu: 'Bi ontzi eskala berean: zenbat aldiz hustu behar da txikia handia betetzeko?', es: 'Dos recipientes a la misma escala: ¿cuántas veces vacías el pequeño para llenar el grande?', en: 'Two containers drawn to the same scale: how many times do you empty the small one to fill the big one?', ar: 'وعاءان بالمقياس نفسه: كم مرة تفرغ الصغير لتملأ الكبير؟' },
        skills: { eu: 'Bolumenak eta haien arrazoia', es: 'Volúmenes y su razón', en: 'Volumes and their ratio', ar: 'الحجوم ونسبتها' },
        levels: [
            { progressId: 70301, stage: 'volumes', title: { eu: 'Oinarri bera', es: 'La misma base', en: 'The same base', ar: 'القاعدة نفسها' }, description: { eu: 'Konoa zilindroan, piramidea prisman.', es: 'Cono en cilindro, pirámide en prisma.', en: 'Cone into cylinder, pyramid into prism.', ar: 'مخروط في أسطوانة وهرم في منشور.' } },
            { progressId: 70302, stage: 'volumes', title: { eu: 'Beste oinarri bat', es: 'Otra base', en: 'Another base', ar: 'قاعدة أخرى' }, description: { eu: 'r² eta a² kontuan hartuta.', es: 'Cuentan r² y a².', en: 'r² and a² count.', ar: 'يُحسب r² وa².' } },
            { progressId: 70303, stage: 'volumes', title: { eu: 'Esferak', es: 'Esferas', en: 'Spheres', ar: 'الكرات' }, description: { eu: 'Esferak, erdiesferak eta konoak.', es: 'Esferas, semiesferas y conos.', en: 'Spheres, hemispheres and cones.', ar: 'كرات وأنصاف كرات ومخاريط.' } }
        ]
    },
    {
        id: 'scale',
        title: { eu: 'Hazi k bider', es: 'Crece k veces', en: 'Grow it k times', ar: 'كبّره k مرة' },
        tagline: { eu: 'Neurri bat eta k arrazoia: zenbat da irudi antzekoan? Gero, kopiekin beteko da.', es: 'Una medida y la razón k: ¿cuánto es en la figura semejante? Luego se llena de copias.', en: 'A measure and the scale factor k: how much in the similar figure? Then it fills with copies.', ar: 'قياس ونسبة k: كم يصبح في الشكل المشابه؟ ثم يمتلئ بنسخ.' },
        skills: { eu: 'k, k² eta k³', es: 'k, k² y k³', en: 'k, k² and k³', ar: 'k وk² وk³' },
        levels: [
            { progressId: 70401, stage: 'similarity', title: { eu: 'Luzerak eta azalerak', es: 'Longitudes y áreas', en: 'Lengths and areas', ar: 'الأطوال والمساحات' }, description: { eu: 'Hesiak, markoak, pintura eta argazkiak.', es: 'Vallas, marcos, pintura y fotos.', en: 'Fences, frames, paint and photos.', ar: 'الأسوار والإطارات والدهان والصور.' } },
            { progressId: 70402, stage: 'ratios', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Pitxerrak, estatuak eta kaxak.', es: 'Jarras, estatuas y cajas.', en: 'Jugs, statues and boxes.', ar: 'الأباريق والتماثيل والصناديق.' } },
            { progressId: 70403, stage: 'ratios', title: { eu: 'Txikitu eta itzuli', es: 'Reducir y volver', en: 'Shrink and go back', ar: 'التصغير والعودة' }, description: { eu: 'k < 1, eta k-ren bila.', es: 'k < 1, y buscar k.', en: 'k < 1, and finding k.', ar: 'k < 1 وإيجاد k.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Geometriaren detektibea', es: 'Detective de geometría', en: 'Geometry detective', ar: 'مخبر الهندسة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Azalera, bolumen eta antzekotasuneko akats tipikoak', es: 'Errores típicos en áreas, volúmenes y semejanza', en: 'Common mistakes with areas, volumes and similarity', ar: 'الأخطاء الشائعة في المساحات والحجوم والتشابه' },
        levels: [
            { progressId: 70501, stage: 'plane-areas', title: { eu: 'Azalera lauak', es: 'Áreas planas', en: 'Areas of flat shapes', ar: 'المساحات المستوية' }, description: { eu: 'Segmentuak, sektoreak, koroak eta apotemak.', es: 'Segmentos, sectores, coronas y apotemas.', en: 'Segments, sectors, rings and apothems.', ar: 'القطع والقطاعات والحلقات والعوامد.' } },
            { progressId: 70502, stage: 'volumes', title: { eu: 'Gorputzak', es: 'Cuerpos', en: 'Solids', ar: 'الأجسام' }, description: { eu: 'Sortzaileak, altuerak eta gorputz konposatuak.', es: 'Generatrices, alturas y cuerpos compuestos.', en: 'Slant heights, heights and compound solids.', ar: 'الرواسم والارتفاعات والأجسام المركّبة.' } },
            { progressId: 70503, stage: 'ratios', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' }, description: { eu: 'k² eta k³, eta Tales.', es: 'k² y k³, y Tales.', en: 'k² and k³, and Thales.', ar: 'k² وk³ وطاليس.' } }
        ]
    }
]

export const areasSimilarityGameProgressIds: number[] = levelProgressIds(areasSimilarityGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const areasSimilarityGameSlugs: Record<AreasSimilarityGameId, string> = { race: 'lasterketa', memory: 'memoria', pour: 'ontziak', scale: 'hazi', detective: 'detektibea' }

export function areasSimilarityGameModeForPath(pathname: string): AreasSimilarityGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ontziak', 'vasos'].includes(game)) return 'pour'
    if (['hazi', 'crece'].includes(game)) return 'scale'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
