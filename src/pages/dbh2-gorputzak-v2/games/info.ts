import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Gorputz geometrikoak (2. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Three games belong to this topic (count and Euler, fill the tank and
   the solids detective); the race and the memory are shared engines.
   ========================================================================== */

export type SolidsGameId = 'race' | 'euler' | 'tank' | 'detective' | 'memory'

export const SOLIDS_GAME_RECORDS_KEY = 'matella-gorputzak-dbh2-game-records'

export const solidsGames: GameInfo<SolidsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Gorputzen lasterketa', es: 'Carrera de cuerpos', en: 'Solids race', ar: 'سباق الأجسام' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 34101, stage: 'polyhedra', title: { eu: 'Poliedroak', es: 'Poliedros', en: 'Polyhedra', ar: 'متعددات الأوجه' }, description: { eu: 'Aurpegiak, ertzak, erpinak eta Euler.', es: 'Caras, aristas, vértices y Euler.', en: 'Faces, edges, vertices and Euler.', ar: 'الأوجه والأحرف والرؤوس وأويلر.' } },
            { progressId: 34102, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Kuboak, ortoedroak eta piramideak.', es: 'Cubos, ortoedros y pirámides.', en: 'Cubes, cuboids and pyramids.', ar: 'المكعبات ومتوازيات المستطيلات والأهرامات.' } },
            { progressId: 34103, stage: 'round', title: { eu: 'Biraketa-gorputzak', es: 'Cuerpos de revolución', en: 'Solids of revolution', ar: 'الأجسام الدورانية' }, description: { eu: 'Zilindroa, konoa eta esfera.', es: 'Cilindro, cono y esfera.', en: 'Cylinder, cone and sphere.', ar: 'الأسطوانة والمخروط والكرة.' } },
            { progressId: 34104, stage: 'units', title: { eu: 'Unitateak eta litroak', es: 'Unidades y litros', en: 'Units and litres', ar: 'الوحدات واللترات' }, description: { eu: 'm³, dm³, cm³ eta L.', es: 'm³, dm³, cm³ y L.', en: 'm³, dm³, cm³ and L.', ar: 'm³ وdm³ وcm³ وL.' } },
            { progressId: 34105, stage: 'volume', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Prismak, piramideak, zilindroak, konoak eta esferak.', es: 'Prismas, pirámides, cilindros, conos y esferas.', en: 'Prisms, pyramids, cylinders, cones and spheres.', ar: 'المناشير والأهرامات والأسطوانات والمخاريط والكرات.' } }
        ]
    },
    {
        id: 'euler',
        title: { eu: 'Zenbatu eta Euler', es: 'Cuenta y Euler', en: 'Count and Euler', ar: 'عُدّ وأويلر' },
        tagline: { eu: 'Zenbatu aurpegiak, erpinak eta ertzak, eta egiaztatu Eulerren formularekin.', es: 'Cuenta caras, vértices y aristas, y compruébalo con la fórmula de Euler.', en: 'Count faces, vertices and edges, and check with Euler’s formula.', ar: 'عُدّ الأوجه والرؤوس والأحرف وتحقّق بصيغة أويلر.' },
        skills: { eu: 'Poliedroen elementuak eta Eulerren formula', es: 'Elementos de los poliedros y fórmula de Euler', en: 'Parts of polyhedra and Euler’s formula', ar: 'عناصر متعددات الأوجه وصيغة أويلر' },
        levels: [
            { progressId: 34301, stage: 'polyhedra', title: { eu: 'Prismak eta piramideak', es: 'Prismas y pirámides', en: 'Prisms and pyramids', ar: 'المناشير والأهرامات' }, description: { eu: 'Oinarriak 3 eta 6 alde artean.', es: 'Bases de 3 a 6 lados.', en: 'Bases with 3 to 6 sides.', ar: 'قواعد من 3 إلى 6 أضلاع.' } },
            { progressId: 34302, stage: 'polyhedra', title: { eu: 'Enborrak eta erregularrak', es: 'Troncos y regulares', en: 'Frustums and regular solids', ar: 'الجذوع والمنتظمة' }, description: { eu: 'Alde gehiago, enborrak eta poliedro erregularrak.', es: 'Más lados, troncos y poliedros regulares.', en: 'More sides, frustums and regular polyhedra.', ar: 'أضلاع أكثر وجذوع ومتعددات أوجه منتظمة.' } },
            { progressId: 34303, stage: 'polyhedra', title: { eu: 'Formularekin', es: 'Con la fórmula', en: 'With the formula', ar: 'بالصيغة' }, description: { eu: 'Marrazkirik gabe: bi datu eta Euler.', es: 'Sin dibujo: dos datos y Euler.', en: 'No drawing: two numbers and Euler.', ar: 'دون رسم: معطيان وأويلر.' } }
        ]
    },
    {
        id: 'tank',
        title: { eu: 'Bete depositua', es: 'Llena el depósito', en: 'Fill the tank', ar: 'املأ الخزان' },
        tagline: { eu: 'Kalkulatu zenbat litro sartzen diren eta ireki txorrota: ez gutxiago, ez gehiago.', es: 'Calcula cuántos litros caben y abre el grifo: ni uno más, ni uno menos.', en: 'Work out how many litres fit and turn on the tap: not one more, not one less.', ar: 'احسب كم لترًا يتسع وافتح الصنبور: لا أكثر ولا أقل.' },
        skills: { eu: 'Bolumena eta edukiera', es: 'Volumen y capacidad', en: 'Volume and capacity', ar: 'الحجم والسعة' },
        levels: [
            { progressId: 34401, stage: 'units', title: { eu: 'Dezimetrotan', es: 'En decímetros', en: 'In decimetres', ar: 'بالديسيمترات' }, description: { eu: '1 dm³ = 1 L', es: '1 dm³ = 1 L', en: '1 dm³ = 1 L', ar: '1 dm³ = 1 L' } },
            { progressId: 34402, stage: 'units', title: { eu: 'Zentimetroak eta metroak', es: 'Centímetros y metros', en: 'Centimetres and metres', ar: 'السنتيمترات والأمتار' }, description: { eu: '1000 cm³ = 1 L; 1 m³ = 1000 L', es: '1000 cm³ = 1 L; 1 m³ = 1000 L', en: '1000 cm³ = 1 L; 1 m³ = 1000 L', ar: '1000 cm³ = 1 L؛ 1 m³ = 1000 L' } },
            { progressId: 34403, stage: 'volume', title: { eu: 'Zilindroak', es: 'Cilindros', en: 'Cylinders', ar: 'الأسطوانات' }, description: { eu: 'π r² h, litro osoetara biribilduta.', es: 'π r² h, redondeado a litros.', en: 'π r² h, rounded to the litre.', ar: 'π r² h مقرّبًا إلى اللتر.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Gorputzen detektibea', es: 'Detective de cuerpos', en: 'Solids detective', ar: 'مخبر المجسمات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Azalera, bolumen eta edukieretako akats tipikoak', es: 'Errores típicos de áreas, volúmenes y capacidad', en: 'Common mistakes with areas, volumes and capacity', ar: 'الأخطاء الشائعة في المساحات والحجوم والسعة' },
        levels: [
            { progressId: 34501, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Oinarriak, apotema eta erradioa.', es: 'Bases, apotema y radio.', en: 'Bases, slant height and radius.', ar: 'القواعد والارتفاع الجانبي ونصف القطر.' } },
            { progressId: 34502, stage: 'volume', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Herena, esfera eta zilindroa.', es: 'El tercio, la esfera y el cilindro.', en: 'The third, the sphere and the cylinder.', ar: 'الثلث والكرة والأسطوانة.' } },
            { progressId: 34503, stage: 'units', title: { eu: 'Edukiera', es: 'Capacidad', en: 'Capacity', ar: 'السعة' }, description: { eu: 'Litroak, mililitroak eta metro kubikoak.', es: 'Litros, mililitros y metros cúbicos.', en: 'Litres, millilitres and cubic metres.', ar: 'اللترات والملّيلترات والأمتار المكعبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Unitateak, azalerak eta bolumenak', es: 'Unidades, áreas y volúmenes', en: 'Units, areas and volumes', ar: 'الوحدات والمساحات والحجوم' },
        levels: [
            { progressId: 34201, stage: 'units', title: { eu: 'Unitateak', es: 'Unidades', en: 'Units', ar: 'الوحدات' }, description: { eu: '2,5 m³ ↔ 2500 dm³', es: '2,5 m³ ↔ 2500 dm³', en: '2.5 m³ ↔ 2500 dm³', ar: '2.5 m³ ↔ 2500 dm³' } },
            { progressId: 34202, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: '6 · 4² ↔ 96', es: '6 · 4² ↔ 96', en: '6 · 4² ↔ 96', ar: '6 · 4² ↔ 96' } },
            { progressId: 34203, stage: 'volume', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: '6² · 9 : 3 ↔ 108', es: '6² · 9 : 3 ↔ 108', en: '6² · 9 : 3 ↔ 108', ar: '6² · 9 : 3 ↔ 108' } }
        ]
    }
]

export const solidsGameProgressIds: number[] = levelProgressIds(solidsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const solidsGameSlugs: Record<SolidsGameId, string> = { race: 'lasterketa', euler: 'euler', tank: 'depositua', detective: 'detektibea', memory: 'memoria' }

export function solidsGameModeForPath(pathname: string): SolidsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['euler'].includes(game)) return 'euler'
    if (['depositua', 'deposito'].includes(game)) return 'tank'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
