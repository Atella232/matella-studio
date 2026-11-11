import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zuzenak eta planoak espazioan (Batxilergoa 2 · Zientziak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star. Four games of their own (twin lines in
   space, classify the pair, the missing plane and the detective), the
   race and the memory.
   ========================================================================== */

export type LinesPlanesGameId = 'race' | 'twins' | 'classify' | 'missing' | 'detective' | 'memory'

export const LINES_PLANES_GAME_RECORDS_KEY = 'matella-planoak-batx2z-game-records'

export const linesPlanesGames: GameInfo<LinesPlanesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zuzen eta planoen lasterketa', es: 'Carrera de rectas y planos', en: 'Race of lines and planes', ar: 'سباق المستقيمات والمستويات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 120401, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Puntuak, norabideak eta ekuazio jarraitua.', es: 'Puntos, directores y la continua.', en: 'Points, directions and the continuous equation.', ar: 'النقاط والاتجاهات والمعادلة المتصلة.' } },
            { progressId: 120402, stage: 'planes', title: { eu: 'Planoak', es: 'Planos', en: 'Planes', ar: 'المستويات' }, description: { eu: 'D, normala eta plano paraleloa.', es: 'La D, el normal y el plano paralelo.', en: 'D, the normal and the parallel plane.', ar: 'D والناظم والمستوى الموازي.' } },
            { progressId: 120403, stage: 'two-lines', title: { eu: 'Bi zuzen', es: 'Dos rectas', en: 'Two lines', ar: 'مستقيمان' }, description: { eu: 'Biderkadura mistoa eta k parametroa.', es: 'Producto mixto y el parámetro k.', en: 'Scalar triple product and the parameter k.', ar: 'الجداء المختلط والوسيط k.' } },
            { progressId: 120404, stage: 'line-plane', title: { eu: 'Zuzena eta planoa', es: 'Recta y plano', en: 'Line and plane', ar: 'مستقيم ومستوى' }, description: { eu: 'Ebaki-puntuaren t eta paraleloak.', es: 'El t del corte y las paralelas.', en: 'The t of the meeting point and parallels.', ar: 't لنقطة التقاطع والتوازي.' } },
            { progressId: 120405, stage: 'planes-position', title: { eu: 'Hiru plano', es: 'Tres planos', en: 'Three planes', ar: 'ثلاثة مستويات' }, description: { eu: 'det M, a parametroa eta plano paraleloak.', es: 'det M, el parámetro a y planos paralelos.', en: 'det M, the parameter a and parallel planes.', ar: 'det M والوسيط a والمستويات المتوازية.' } }
        ]
    },
    {
        id: 'twins',
        title: { eu: 'Zuzen bikiak espazioan', es: 'Rectas gemelas en el espacio', en: 'Twin lines in space', ar: 'مستقيمات توأم في الفضاء' },
        tagline: { eu: 'Zuzen bat lau ekuaziorekin: bakarra da zuzen bera. Aurkitu bikia.', es: 'Una recta y cuatro ecuaciones: solo una es la misma recta. Encuentra la gemela.', en: 'One line and four equations: only one is the same line. Find the twin.', ar: 'مستقيم وأربع معادلات: واحدة فقط هي المستقيم نفسه. اعثر على التوأم.' },
        skills: { eu: 'Puntua zuzenean eta norabide paraleloa', es: 'Un punto de la recta y un director paralelo', en: 'A point on the line and a parallel direction', ar: 'نقطة على المستقيم واتجاه موازٍ' },
        levels: [
            { progressId: 120501, stage: 'lines', title: { eu: 'Jarraitua', es: 'Continua', en: 'Continuous', ar: 'المتصلة' }, description: { eu: 'Bektoriala eta jarraitua.', es: 'Vectorial y continua.', en: 'Vector and continuous.', ar: 'المتجهية والمتصلة.' } },
            { progressId: 120502, stage: 'lines', title: { eu: 'Beste puntu bat', es: 'Otro punto', en: 'Another point', ar: 'نقطة أخرى' }, description: { eu: 'Beste puntu bat eta norabide proportzionala.', es: 'Otro punto y un director proporcional.', en: 'Another point and a proportional direction.', ar: 'نقطة أخرى واتجاه متناسب.' } },
            { progressId: 120503, stage: 'lines', title: { eu: 'Inplizituak', es: 'Implícitas', en: 'Implicit', ar: 'الديكارتية' }, description: { eu: 'Zuzena duten bi plano.', es: 'Dos planos que contienen la recta.', en: 'Two planes that hold the line.', ar: 'مستويان يحويان المستقيم.' } }
        ]
    },
    {
        id: 'classify',
        title: { eu: 'Sailkatu bikotea', es: 'Clasifica la pareja', en: 'Classify the pair', ar: 'صنّف الزوج' },
        tagline: { eu: 'Bi plano, zuzen bat eta plano bat edo bi zuzen: nola daude? Gero ikusi taulan.', es: 'Dos planos, una recta y un plano o dos rectas: ¿cómo están? Después, míralo en el tablero.', en: 'Two planes, a line and a plane or two lines: how are they? Then see it on the board.', ar: 'مستويان، أو مستقيم ومستوى، أو مستقيمان: ما وضعهما؟ ثم شاهده على اللوحة.' },
        skills: { eu: 'Posizio erlatiboak, kalkulu labur batekin', es: 'Posiciones relativas con una cuenta corta', en: 'Relative positions with a short calculation', ar: 'الأوضاع النسبية بحساب قصير' },
        levels: [
            { progressId: 120551, stage: 'planes-position', title: { eu: 'Bi plano', es: 'Dos planos', en: 'Two planes', ar: 'مستويان' }, description: { eu: 'Ebakitzaileak, paraleloak ala bat datozenak.', es: 'Secantes, paralelos o coincidentes.', en: 'Secant, parallel or the same.', ar: 'متقاطعان أو متوازيان أو منطبقان.' } },
            { progressId: 120552, stage: 'line-plane', title: { eu: 'Zuzena eta planoa', es: 'Recta y plano', en: 'Line and plane', ar: 'مستقيم ومستوى' }, description: { eu: 'Zeharkatzen du, paraleloa ala barruan.', es: 'Lo corta, paralela o contenida.', en: 'Through it, parallel or inside.', ar: 'يقطعه أو موازٍ أو داخله.' } },
            { progressId: 120553, stage: 'two-lines', title: { eu: 'Bi zuzen', es: 'Dos rectas', en: 'Two lines', ar: 'مستقيمان' }, description: { eu: 'Ebaki, gurutzatu, paraleloak ala bat.', es: 'Se cortan, se cruzan, paralelas o coinciden.', en: 'Meet, skew, parallel or the same.', ar: 'متقاطعان أو متخالفان أو متوازيان أو منطبقان.' } }
        ]
    },
    {
        id: 'missing',
        title: { eu: 'Falta den planoa', es: 'El plano que falta', en: 'The missing plane', ar: 'المستوى الناقص' },
        tagline: { eu: 'Planoaren ekuazioari zenbaki bat falta zaio: aurkitu, eta taulan ikusiko duzu.', es: 'A la ecuación del plano le falta un número: encuéntralo y lo verás en el tablero.', en: 'The equation of the plane is missing a number: find it and you will see it on the board.', ar: 'ينقص معادلةَ المستوى عدد: أوجده وستراه على اللوحة.' },
        skills: { eu: 'Normala eta D: paraleloak, perpendikularrak, hiru puntu, puntu bat eta zuzen bat', es: 'El normal y la D: paralelos, perpendiculares, tres puntos, un punto y una recta', en: 'The normal and D: parallel, perpendicular, three points, a point and a line', ar: 'الناظم وD: موازٍ، وعمودي، وثلاث نقاط، ونقطة ومستقيم' },
        levels: [
            { progressId: 120601, stage: 'planes', title: { eu: 'Puntu batetik', es: 'Por un punto', en: 'Through a point', ar: 'من نقطة' }, description: { eu: 'Plano paraleloa edo zuzen baten perpendikularra.', es: 'Plano paralelo o perpendicular a una recta.', en: 'Parallel plane or perpendicular to a line.', ar: 'مستوى موازٍ أو عمودي على مستقيم.' } },
            { progressId: 120602, stage: 'planes', title: { eu: 'Hiru puntu', es: 'Tres puntos', en: 'Three points', ar: 'ثلاث نقاط' }, description: { eu: 'Normala biderkadura bektorialarekin.', es: 'El normal con el producto vectorial.', en: 'The normal with the cross product.', ar: 'الناظم بالجداء المتجهي.' } },
            { progressId: 120603, stage: 'line-plane', title: { eu: 'Puntua eta zuzena', es: 'Punto y recta', en: 'Point and line', ar: 'نقطة ومستقيم' }, description: { eu: 'Zuzena duen eta puntutik pasatzen den planoa.', es: 'El plano que contiene la recta y pasa por el punto.', en: 'The plane holding the line and passing through the point.', ar: 'المستوى الذي يحوي المستقيم ويمر بالنقطة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Zuzen eta planoen detektibea', es: 'Detective de rectas y planos', en: 'Lines and planes detective', ar: 'مخبر المستقيمات والمستويات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 120701, stage: 'planes', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Puntua eta norabidea, zeinua, normala eta inplizituak.', es: 'Punto y director, el signo, el normal y las implícitas.', en: 'Point and direction, the sign, the normal and implicit equations.', ar: 'النقطة والاتجاه والإشارة والناظم والديكارتية.' } },
            { progressId: 120702, stage: 'two-lines', title: { eu: 'Posizioak', es: 'Posiciones', en: 'Positions', ar: 'الأوضاع' }, description: { eu: 'Egiaztatu gabeko puntua, biderkadura mistoa eta parametroak.', es: 'El punto sin comprobar, el producto mixto y los parámetros.', en: 'The unchecked point, the triple product and the parameters.', ar: 'النقطة غير المتحقق منها والجداء المختلط والوسطاء.' } },
            { progressId: 120703, stage: 'planes-position', title: { eu: 'Ebakiak eta heinak', es: 'Cortes y rangos', en: 'Meetings and ranks', ar: 'التقاطعات والرتب' }, description: { eu: 't ez da puntua, normalak eta bi heinak.', es: 't no es el punto, los normales y los dos rangos.', en: 't is not the point, the normals and both ranks.', ar: 't ليست النقطة، والناظمات، والرتبتان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ekuazio bat eta bere bektorea edo puntua.', es: 'Encuentra las parejas: una ecuación y su vector o su punto.', en: 'Find the pairs: an equation and its vector or its point.', ar: 'اعثر على الأزواج: معادلة ومتجهها أو نقطتها.' },
        skills: { eu: 'Normala, norabidea eta zuzeneko puntuak', es: 'El normal, el director y los puntos de una recta', en: 'The normal, the direction and the points of a line', ar: 'الناظم ومتجه التوجيه ونقاط المستقيم' },
        levels: [
            { progressId: 120801, stage: 'planes', title: { eu: 'Normala', es: 'Normal', en: 'Normal', ar: 'الناظم' }, description: { eu: '2x − y = 1 ↔ (2, −1, 0)', es: '2x − y = 1 ↔ (2, −1, 0)', en: '2x − y = 1 ↔ (2, −1, 0)', ar: '2x − y = 1 ↔ (2, −1, 0)' } },
            { progressId: 120802, stage: 'lines', title: { eu: 'Norabidea', es: 'Director', en: 'Direction', ar: 'متجه التوجيه' }, description: { eu: '(x − 1)/2 = y/3 = (z + 1)/(−1) ↔ (2, 3, −1)', es: '(x − 1)/2 = y/3 = (z + 1)/(−1) ↔ (2, 3, −1)', en: '(x − 1)/2 = y/3 = (z + 1)/(−1) ↔ (2, 3, −1)', ar: '(x − 1)/2 = y/3 = (z + 1)/(−1) ↔ (2, 3, −1)' } },
            { progressId: 120803, stage: 'lines', title: { eu: 'Zuzeneko puntuak', es: 'Puntos de la recta', en: 'Points of the line', ar: 'نقاط المستقيم' }, description: { eu: '(1, 0, 2) + 2 (1, 1, −1) ↔ (3, 2, 0)', es: '(1, 0, 2) + 2 (1, 1, −1) ↔ (3, 2, 0)', en: '(1, 0, 2) + 2 (1, 1, −1) ↔ (3, 2, 0)', ar: '(1, 0, 2) + 2 (1, 1, −1) ↔ (3, 2, 0)' } }
        ]
    }
]

export const linesPlanesGameProgressIds: number[] = levelProgressIds(linesPlanesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const linesPlanesGameSlugs: Record<LinesPlanesGameId, string> = { race: 'lasterketa', twins: 'zuzen-bikiak', classify: 'sailkatu', missing: 'falta-den-planoa', detective: 'detektibea', memory: 'memoria' }

export function linesPlanesGameModeForPath(pathname: string): LinesPlanesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zuzen-bikiak', 'rectas-gemelas'].includes(game)) return 'twins'
    if (['sailkatu', 'clasifica'].includes(game)) return 'classify'
    if (['falta-den-planoa', 'plano-que-falta'].includes(game)) return 'missing'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
