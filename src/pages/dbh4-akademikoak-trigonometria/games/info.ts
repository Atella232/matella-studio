import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Trigonometria (4. DBH akademikoak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type TrigonometryGameId = 'race' | 'memory' | 'circle' | 'ratios' | 'detective'

export const TRIGONOMETRY_GAME_RECORDS_KEY = 'matella-trigonometria-dbh4ak-game-records'

export const trigonometryGames: GameInfo<TrigonometryGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Trigonometriaren lasterketa', es: 'Carrera de trigonometría', en: 'Trigonometry race', ar: 'سباق حساب المثلثات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 72101, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', en: 'Ratios', ar: 'النسب' }, description: { eu: 'Hiru aldeetatik, 30°, 45° eta 60°, eta hipotenusa.', es: 'A partir de los tres lados, 30°, 45° y 60°, y la hipotenusa.', en: 'From the three sides, 30°, 45° and 60°, and the hypotenuse.', ar: 'من الأضلاع الثلاثة، و30° و45° و60°، والوتر.' } },
            { progressId: 72102, stage: 'identities', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', en: 'Fundamental relationships', ar: 'العلاقات الأساسية' }, description: { eu: 'Arrazoi batetik besteetara, minutuak eta kalkulagailua.', es: 'De una razón a las demás, minutos y calculadora.', en: 'From one ratio to the others, minutes and calculator.', ar: 'من نسبة إلى البقية، والدقائق والآلة الحاسبة.' } },
            { progressId: 72103, stage: 'solving', title: { eu: 'Triangelu angeluzuzenak', es: 'Triángulos rectángulos', en: 'Right-angled triangles', ar: 'المثلثات القائمة' }, description: { eu: 'Aldeak, angeluak, goratzea eta beheratzea.', es: 'Lados, ángulos, elevación y depresión.', en: 'Sides, angles, angle of elevation and depression.', ar: 'الأضلاع والزوايا والارتفاع والانخفاض.' } },
            { progressId: 72104, stage: 'problems', title: { eu: 'Altuerak eta azalerak', es: 'Alturas y áreas', en: 'Heights and areas', ar: 'الارتفاعات والمساحات' }, description: { eu: 'Behaketa bikoitza, triangeluak eta paralelogramoak.', es: 'Doble observación, triángulos y paralelogramos.', en: 'Double sighting, triangles and parallelograms.', ar: 'الرصد المزدوج والمثلثات ومتوازيات الأضلاع.' } },
            { progressId: 72105, stage: 'circle', title: { eu: 'Zirkunferentzia goniometrikoa', es: 'Circunferencia goniométrica', en: 'Unit circle', ar: 'الدائرة المثلثية' }, description: { eu: 'Zeinuak, lehen koadrantera eta radianak.', es: 'Signos, reducción al primer cuadrante y radianes.', en: 'Signs, reduction to the first quadrant and radians.', ar: 'الإشارات والإرجاع إلى الربع الأول والراديان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Radianak, minutuak eta azalerak', es: 'Radianes, minutos y áreas', en: 'Radians, minutes and areas', ar: 'الراديان والدقائق والمساحات' },
        levels: [
            { progressId: 72201, stage: 'circle', title: { eu: 'Graduak eta radianak', es: 'Grados y radianes', en: 'Degrees and radians', ar: 'الدرجات والراديان' }, description: { eu: '150° ↔ 5π/6', es: '150° ↔ 5π/6', en: '150° ↔ 5π/6', ar: '150° ↔ 5π/6' } },
            { progressId: 72202, stage: 'identities', title: { eu: 'Minutuak eta hamartarrak', es: 'Minutos y decimales', en: 'Minutes and decimals', ar: 'الدقائق والأعداد العشرية' }, description: { eu: '12° 30′ ↔ 12,5°', es: '12° 30′ ↔ 12,5°', en: '12° 30′ ↔ 12.5°', ar: '12° 30′ ↔ 12.5°' } },
            { progressId: 72203, stage: 'problems', title: { eu: 'Triangeluen azalerak', es: 'Áreas de triángulos', en: 'Areas of triangles', ar: 'مساحات المثلثات' }, description: { eu: 'b = 4, c = 6, A = 30° ↔ S = 6', es: 'b = 4, c = 6, A = 30° ↔ S = 6', en: 'b = 4, c = 6, A = 30° ↔ S = 6', ar: 'b = 4, c = 6, A = 30° ↔ S = 6' } }
        ]
    },
    {
        id: 'circle',
        title: { eu: 'Zirkunferentzia goniometrikoa', es: 'La circunferencia goniométrica', en: 'The unit circle', ar: 'الدائرة المثلثية' },
        tagline: { eu: 'Arrazoi bat eta zeinu bat: biratu erradioa α angeluraino. Gero, proiekzioak agertuko dira.', es: 'Una razón y un signo: gira el radio hasta α. Luego aparecen las proyecciones.', en: 'A ratio and a sign: turn the radius to α. Then the projections appear.', ar: 'نسبة وإشارة: أدِر نصف القطر حتى α، ثم تظهر المساقط.' },
        skills: { eu: 'Angeluak eta haien arrazoiak', es: 'Ángulos y sus razones', en: 'Angles and their ratios', ar: 'الزوايا ونسبها' },
        levels: [
            { progressId: 72301, stage: 'circle', title: { eu: 'Lehen koadrantea', es: 'Primer cuadrante', en: 'First quadrant', ar: 'الربع الأول' }, description: { eu: '0°-tik 90°-ra.', es: 'De 0° a 90°.', en: 'From 0° to 90°.', ar: 'من 0° إلى 90°.' } },
            { progressId: 72302, stage: 'circle', title: { eu: 'Lau koadranteak', es: 'Los cuatro cuadrantes', en: 'All four quadrants', ar: 'الأرباع الأربعة' }, description: { eu: 'Zeinuek koadrantea esaten dute.', es: 'Los signos dicen el cuadrante.', en: 'The signs tell the quadrant.', ar: 'الإشارات تحدد الربع.' } },
            { progressId: 72303, stage: 'circle', title: { eu: 'Radianak', es: 'Radianes', en: 'Radians', ar: 'الراديان' }, description: { eu: 'Tangentea ere bai.', es: 'También la tangente.', en: 'The tangent too.', ar: 'والظل أيضًا.' } }
        ]
    },
    {
        id: 'ratios',
        title: { eu: 'Beste arrazoiak', es: 'Las otras razones', en: 'The other ratios', ar: 'النسب الأخرى' },
        tagline: { eu: 'Arrazoi bat eta koadrantea: aukeratu beste biak. Gero, triangelua zirkuluan.', es: 'Una razón y el cuadrante: elige las otras dos. Luego, el triángulo en la circunferencia.', en: 'One ratio and the quadrant: choose the other two. Then the triangle in the circle.', ar: 'نسبة والربع: اختر النسبتين الأخريين، ثم المثلث في الدائرة.' },
        skills: { eu: 'Oinarrizko identitatea eta zeinuak', es: 'Identidad fundamental y signos', en: 'The fundamental identity and signs', ar: 'المتطابقة الأساسية والإشارات' },
        levels: [
            { progressId: 72401, stage: 'identities', title: { eu: 'Lehen koadrantea', es: 'Primer cuadrante', en: 'First quadrant', ar: 'الربع الأول' }, description: { eu: 'Guztiak positiboak.', es: 'Todas positivas.', en: 'All positive.', ar: 'كلها موجبة.' } },
            { progressId: 72402, stage: 'identities', title: { eu: 'Beste koadranteak', es: 'Otros cuadrantes', en: 'Other quadrants', ar: 'أرباع أخرى' }, description: { eu: 'Zeinuak kontuan.', es: 'Cuidado con los signos.', en: 'Mind the signs.', ar: 'انتبه للإشارات.' } },
            { progressId: 72403, stage: 'identities', title: { eu: 'Zeinuetatik', es: 'A partir de signos', en: 'From the signs', ar: 'من الإشارات' }, description: { eu: 'Koadrantea asmatu behar da.', es: 'Hay que deducir el cuadrante.', en: 'Work out the quadrant.', ar: 'استنتج الربع.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Trigonometriaren detektibea', es: 'Detective de trigonometría', en: 'Trigonometry detective', ar: 'مخبر حساب المثلثات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Trigonometriako akats tipikoak', es: 'Errores típicos de trigonometría', en: 'Common mistakes in trigonometry', ar: 'الأخطاء الشائعة في حساب المثلثات' },
        levels: [
            { progressId: 72501, stage: 'ratios', title: { eu: 'Triangelu angeluzuzenak', es: 'Triángulos rectángulos', en: 'Right triangles', ar: 'المثلثات القائمة' }, description: { eu: 'Sinua, kosinua eta tangentea.', es: 'Seno, coseno y tangente.', en: 'Sine, cosine and tangent.', ar: 'الجيب وجيب التمام والظل.' } },
            { progressId: 72502, stage: 'identities', title: { eu: 'Identitateak', es: 'Identidades', en: 'Identities', ar: 'المتطابقات' }, description: { eu: 'Karratuak, zeinuak eta murrizketa.', es: 'Cuadrados, signos y reducción.', en: 'Squares, signs and reduction.', ar: 'المربعات والإشارات والإرجاع.' } },
            { progressId: 72503, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Azalerak, altuerak eta radianak.', es: 'Áreas, alturas y radianes.', en: 'Areas, heights and radians.', ar: 'المساحات والارتفاعات والراديان.' } }
        ]
    }
]

export const trigonometryGameProgressIds: number[] = levelProgressIds(trigonometryGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const trigonometryGameSlugs: Record<TrigonometryGameId, string> = { race: 'lasterketa', memory: 'memoria', circle: 'zirkulua', ratios: 'arrazoiak', detective: 'detektibea' }

export function trigonometryGameModeForPath(pathname: string): TrigonometryGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zirkulua', 'circunferencia'].includes(game)) return 'circle'
    if (['arrazoiak', 'razones'].includes(game)) return 'ratios'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
