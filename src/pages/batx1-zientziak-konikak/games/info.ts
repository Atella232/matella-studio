import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Leku geometrikoak eta konikak (Batxilergoa 1 · Zientziak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star. Three games of its own (which conic it is,
   the antenna and the detective), the race and the memory.
   ========================================================================== */

export type BachConicsGameId = 'race' | 'conic' | 'antenna' | 'detective' | 'memory'

export const BACH_CONICS_GAME_RECORDS_KEY = 'matella-konikak-batx1z-game-records'

export const bachConicsGames: GameInfo<BachConicsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Konika lasterketa', es: 'Carrera de cónicas', en: 'Conics race', ar: 'سباق القطوع المخروطية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 107401, stage: 'loci', title: { eu: 'Leku geometrikoak', es: 'Lugares geométricos', en: 'Loci', ar: 'المحلات الهندسية' }, description: { eu: 'Distantziak, paraleloak eta puntu baliokideak.', es: 'Distancias, paralelas y puntos equidistantes.', en: 'Distances, parallels and equidistant points.', ar: 'المسافات والمتوازيات والنقاط المتساوية البعد.' } },
            { progressId: 107402, stage: 'circle', title: { eu: 'Zirkunferentzia', es: 'Circunferencia', en: 'The circle', ar: 'الدائرة' }, description: { eu: 'Zentroa, erradioa eta ukitzailea.', es: 'Centro, radio y tangente.', en: 'Centre, radius and tangent.', ar: 'المركز ونصف القطر والمماس.' } },
            { progressId: 107403, stage: 'ellipse', title: { eu: 'Elipsea', es: 'Elipse', en: 'The ellipse', ar: 'القطع الناقص' }, description: { eu: 'c, eszentrikotasuna eta fokuak.', es: 'c, excentricidad y focos.', en: 'c, eccentricity and foci.', ar: 'c والاختلاف المركزي والبؤرتان.' } },
            { progressId: 107404, stage: 'hyperbola', title: { eu: 'Hiperbola', es: 'Hipérbola', en: 'The hyperbola', ar: 'القطع الزائد' }, description: { eu: 'c, asintotak eta eszentrikotasuna.', es: 'c, asíntotas y excentricidad.', en: 'c, asymptotes and eccentricity.', ar: 'c والمقاربان والاختلاف المركزي.' } },
            { progressId: 107405, stage: 'parabola', title: { eu: 'Parabola', es: 'Parábola', en: 'The parabola', ar: 'القطع المكافئ' }, description: { eu: 'Fokua, zuzentzailea eta fokurako distantzia.', es: 'Foco, directriz y distancia al foco.', en: 'Focus, directrix and distance to the focus.', ar: 'البؤرة والدليل والبعد عن البؤرة.' } }
        ]
    },
    {
        id: 'conic',
        title: { eu: 'Zein konika da?', es: '¿Qué cónica es?', en: 'Which conic is it?', ar: 'أي قطع مخروطي هو؟' },
        tagline: { eu: 'Ekuazio bat agertzen da: esan zein konika den, eta gero aurkitu haren elementu bat.', es: 'Sale una ecuación: di qué cónica es y después encuentra uno de sus elementos.', en: 'An equation appears: say which conic it is, then find one of its elements.', ar: 'تظهر معادلة: قل أي قطع مخروطي هي، ثم أوجد أحد عناصره.' },
        skills: { eu: 'Konikak ekuaziotik ezagutzea', es: 'Reconocer las cónicas por su ecuación', en: 'Recognising conics from their equation', ar: 'التعرف على القطوع المخروطية من معادلاتها' },
        levels: [
            { progressId: 107501, stage: 'circle', title: { eu: 'Jatorrian', es: 'En el origen', en: 'At the origin', ar: 'في الأصل' }, description: { eu: 'Ekuazio laburtuak: erradioa, fokuak eta asintotak.', es: 'Ecuaciones reducidas: radio, focos y asíntotas.', en: 'Reduced equations: radius, foci and asymptotes.', ar: 'المعادلات المختصرة: نصف القطر والبؤر والمقاربات.' } },
            { progressId: 107502, stage: 'ellipse', title: { eu: 'Lekualdatuak', es: 'Trasladadas', en: 'Shifted', ar: 'مُزاحة' }, description: { eu: 'Zentroa edo erpina, zeinua aldatuta.', es: 'El centro o el vértice, con el signo cambiado.', en: 'The centre or the vertex, with the sign changed.', ar: 'المركز أو الرأس بإشارة معكوسة.' } },
            { progressId: 107503, stage: 'parabola', title: { eu: 'Ekuazio orokorra', es: 'Ecuación general', en: 'General equation', ar: 'المعادلة العامة' }, description: { eu: 'Koefizienteak begiratu eta karratuak osatu.', es: 'Mira los coeficientes y completa cuadrados.', en: 'Look at the coefficients and complete the square.', ar: 'انظر إلى المعاملات وأكمل المربعات.' } }
        ]
    },
    {
        id: 'antenna',
        title: { eu: 'Antena', es: 'La antena', en: 'The antenna', ar: 'الهوائي' },
        tagline: { eu: 'Izpiak islatzen dira eta fokura doaz: non jarri behar da hargailua?', es: 'Los rayos se reflejan y van al foco: ¿dónde hay que poner el receptor?', en: 'The rays bounce off and go to the focus: where does the receiver go?', ar: 'تنعكس الأشعة وتتجه إلى البؤرة: أين يوضع المستقبِل؟' },
        skills: { eu: 'Parabolaren eta elipsearen fokuak', es: 'Los focos de la parábola y de la elipse', en: 'The foci of the parabola and the ellipse', ar: 'بؤر القطع المكافئ والقطع الناقص' },
        levels: [
            { progressId: 107601, stage: 'parabola', title: { eu: 'Ekuazioa', es: 'La ecuación', en: 'The equation', ar: 'المعادلة' }, description: { eu: 'Antena y² = 2px da: fokua p/2 distantziara.', es: 'La antena es y² = 2px: el foco, a p/2.', en: 'The dish is y² = 2px: the focus, p/2 away.', ar: 'الهوائي y² = 2px: البؤرة على بعد p/2.' } },
            { progressId: 107602, stage: 'parabola', title: { eu: 'Zabalera eta sakonera', es: 'Ancho y profundidad', en: 'Width and depth', ar: 'العرض والعمق' }, description: { eu: 'Ertzeko puntutik p ateratzen da.', es: 'Del punto del borde sale p.', en: 'p comes from the point on the rim.', ar: 'من نقطة الحافة نحصل على p.' } },
            { progressId: 107603, stage: 'ellipse', title: { eu: 'Ispilu eliptikoa', es: 'El espejo elíptico', en: 'The elliptical mirror', ar: 'المرآة الإهليلجية' }, description: { eu: 'Foku batetik irten eta bestera iristen da.', es: 'Sale de un foco y llega al otro.', en: 'It leaves one focus and reaches the other.', ar: 'يخرج من بؤرة ويصل إلى الأخرى.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Koniken detektibea', es: 'Detective de cónicas', en: 'Conics detective', ar: 'مخبر القطوع المخروطية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 107701, stage: 'circle', title: { eu: 'Lekuak eta zirkunferentzia', es: 'Lugares y circunferencia', en: 'Loci and circle', ar: 'المحلات والدائرة' }, description: { eu: 'Karratua, zentroa, erradioa eta ±.', es: 'El cuadrado, el centro, el radio y el ±.', en: 'The square, the centre, the radius and the ±.', ar: 'المربع والمركز ونصف القطر و±.' } },
            { progressId: 107702, stage: 'hyperbola', title: { eu: 'Elipsea eta hiperbola', es: 'Elipse e hipérbola', en: 'Ellipse and hyperbola', ar: 'القطع الناقص والزائد' }, description: { eu: 'c, asintotak eta ardatz nagusia.', es: 'La c, las asíntotas y el eje mayor.', en: 'The c, the asymptotes and the major axis.', ar: 'c والمقاربان والمحور الأكبر.' } },
            { progressId: 107703, stage: 'parabola', title: { eu: 'Parabola eta konikak', es: 'Parábola y cónicas', en: 'Parabola and conics', ar: 'القطع المكافئ والقطوع المخروطية' }, description: { eu: 'Fokua, zuzentzailea, erpina eta mota.', es: 'Foco, directriz, vértice y tipo.', en: 'Focus, directrix, vertex and type.', ar: 'البؤرة والدليل والرأس والنوع.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: konika bat eta haren zentroa edo fokuak.', es: 'Encuentra las parejas: una cónica y su centro o sus focos.', en: 'Find the pairs: a conic and its centre or foci.', ar: 'اعثر على الأزواج: قطع مخروطي ومركزه أو بؤرتاه.' },
        skills: { eu: 'Zentroa, fokuak eta parabolaren fokua', es: 'Centro, focos y foco de la parábola', en: 'Centre, foci and focus of the parabola', ar: 'المركز والبؤرتان وبؤرة القطع المكافئ' },
        levels: [
            { progressId: 107801, stage: 'circle', title: { eu: 'Zentroa', es: 'Centro', en: 'Centre', ar: 'المركز' }, description: { eu: '(x − 2)² + (y + 1)² = 9 ↔ C(2, −1)', es: '(x − 2)² + (y + 1)² = 9 ↔ C(2, −1)', en: '(x − 2)² + (y + 1)² = 9 ↔ C(2, −1)', ar: '(x − 2)² + (y + 1)² = 9 ↔ C(2, −1)' } },
            { progressId: 107802, stage: 'ellipse', title: { eu: 'Elipsearen fokuak', es: 'Focos de la elipse', en: 'Foci of the ellipse', ar: 'بؤرتا القطع الناقص' }, description: { eu: 'x²/25 + y²/9 = 1 ↔ F(±4, 0)', es: 'x²/25 + y²/9 = 1 ↔ F(±4, 0)', en: 'x²/25 + y²/9 = 1 ↔ F(±4, 0)', ar: 'x²/25 + y²/9 = 1 ↔ F(±4, 0)' } },
            { progressId: 107803, stage: 'parabola', title: { eu: 'Parabolaren fokua', es: 'Foco de la parábola', en: 'Focus of the parabola', ar: 'بؤرة القطع المكافئ' }, description: { eu: 'y² = 8x ↔ F(2, 0)', es: 'y² = 8x ↔ F(2, 0)', en: 'y² = 8x ↔ F(2, 0)', ar: 'y² = 8x ↔ F(2, 0)' } }
        ]
    }
]

export const bachConicsGameProgressIds: number[] = levelProgressIds(bachConicsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachConicsGameSlugs: Record<BachConicsGameId, string> = { race: 'lasterketa', conic: 'zein-konika', antenna: 'antena', detective: 'detektibea', memory: 'memoria' }

export function bachConicsGameModeForPath(pathname: string): BachConicsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zein-konika', 'que-conica'].includes(game)) return 'conic'
    if (['antena', 'antenna'].includes(game)) return 'antenna'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
