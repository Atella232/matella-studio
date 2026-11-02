import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Probabilitatea (4. DBH akademikoak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type ProbabilityAkGameId = 'race' | 'memory' | 'tree' | 'table' | 'detective'

export const PROBABILITY_AK_GAME_RECORDS_KEY = 'matella-probabilitatea-dbh4ak-game-records'

export const probabilityAkGames: GameInfo<ProbabilityAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Probabilitateen lasterketa', es: 'Carrera de probabilidades', en: 'Probability race', ar: 'سباق الاحتمالات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 86101, stage: 'events', title: { eu: 'Gertaerak', es: 'Sucesos', en: 'Events', ar: 'الأحداث' }, description: { eu: 'Bildura, lagin-espazioa eta aurkakoa.', es: 'Unión, espacio muestral y contrario.', en: 'Union, sample space and complement.', ar: 'الاتحاد وفضاء العيّنة والمعاكس.' } },
            { progressId: 86102, stage: 'probability', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Bi dado, karta-sorta eta bildura.', es: 'Dos dados, la baraja y la unión.', en: 'Two dice, the deck of cards and union.', ar: 'نردان والورق والاتحاد.' } },
            { progressId: 86103, stage: 'compound', title: { eu: 'Esperientzia konposatuak', es: 'Experiencias compuestas', en: 'Compound experiments', ar: 'التجارب المركّبة' }, description: { eu: 'Independenteak, itzuli gabe eta gutxienez behin.', es: 'Independientes, sin devolver y al menos una vez.', en: 'Independent, without replacement and at least once.', ar: 'مستقلة ودون إرجاع ومرة على الأقل.' } },
            { progressId: 86104, stage: 'conditional', title: { eu: 'Baldintzatua', es: 'Condicionada', en: 'Conditional', ar: 'الاحتمال المشروط' }, description: { eu: 'Taulak, formula eta probabilitate osoa.', es: 'Tablas, la fórmula y la probabilidad total.', en: 'Tables, the formula and total probability.', ar: 'الجداول والصيغة والاحتمال الكلي.' } },
            { progressId: 86105, stage: 'counting', title: { eu: 'Zenbatu eta erabaki', es: 'Contar y decidir', en: 'Count and decide', ar: 'العدّ والقرار' }, description: { eu: 'Batera ateratzea, daduak eta itxaropena.', es: 'Sacar a la vez, dados y esperanza.', en: 'Drawing at once, dice and expected value.', ar: 'السحب معًا والنرود والأمل.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Bi dadoren baturak, biderkadurak eta baldintzatuak', es: 'Sumas de dos dados, productos y condicionadas', en: 'Sums of two dice, products and conditional probabilities.', ar: 'مجاميع نردين والجداءات والاحتمالات المشروطة' },
        levels: [
            { progressId: 86201, stage: 'probability', title: { eu: 'Bi dado', es: 'Dos dados', en: 'Two dice', ar: 'نردان' }, description: { eu: 'P(S = 7) ↔ 1/6', es: 'P(S = 7) ↔ 1/6', en: 'P(S = 7) ↔ 1/6', ar: 'P(S = 7) ↔ 1/6' } },
            { progressId: 86202, stage: 'compound', title: { eu: 'Biderkadurak', es: 'Productos', en: 'Products', ar: 'الجداءات' }, description: { eu: '1/2 · 1/6 ↔ 1/12', es: '1/2 · 1/6 ↔ 1/12', en: '1/2 · 1/6 ↔ 1/12', ar: '1/2 · 1/6 ↔ 1/12' } },
            { progressId: 86203, stage: 'conditional', title: { eu: 'Baldintzatuak', es: 'Condicionadas', en: 'Conditional', ar: 'المشروطة' }, description: { eu: '0,12 : 0,3 ↔ 0,4', es: '0,12 : 0,3 ↔ 0,4', en: '0.12 : 0.3 ↔ 0.4', ar: '0.12 : 0.3 ↔ 0.4' } }
        ]
    },
    {
        id: 'tree',
        title: { eu: 'Zuhaitzaren bideak', es: 'Los caminos del árbol', en: 'The paths of the tree', ar: 'مسارات الشجرة' },
        tagline: { eu: 'Bi bola ateratzen dira: ukitu gertaeraren hostoak. Gero, adarren biderkadurak eta batura.', es: 'Se sacan dos bolas: toca las hojas del suceso. Luego, los productos de las ramas y su suma.', en: 'Two balls are drawn: tap the leaves of the event. Then the products of the branches and their sum.', ar: 'نسحب كرتين: المس أوراق الحدث، ثم جداءات الفروع ومجموعها.' },
        skills: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' },
        levels: [
            { progressId: 86301, stage: 'compound', title: { eu: 'Itzulita', es: 'Con devolución', en: 'With replacement', ar: 'مع الإرجاع' }, description: { eu: 'Bi kolore.', es: 'Dos colores.', en: 'Two colours.', ar: 'لونان.' } },
            { progressId: 86302, stage: 'compound', title: { eu: 'Itzuli gabe', es: 'Sin devolución', en: 'Without replacement', ar: 'دون إرجاع' }, description: { eu: 'Bola bat gutxiago.', es: 'Una bola menos.', en: 'One ball fewer.', ar: 'كرة أقل.' } },
            { progressId: 86303, stage: 'compound', title: { eu: 'Hiru kolore', es: 'Tres colores', en: 'Three colours', ar: 'ثلاثة ألوان' }, description: { eu: 'Bederatzi hosto.', es: 'Nueve hojas.', en: 'Nine leaves.', ar: 'تسع أوراق.' } }
        ]
    },
    {
        id: 'table',
        title: { eu: 'Kontingentzia-taula', es: 'La tabla de contingencia', en: 'The contingency table', ar: 'جدول التوافق' },
        tagline: { eu: 'Ukitu zenbakitzailearen gelaxkak eta izendatzailearen guztizkoa.', es: 'Toca las casillas del numerador y el total del denominador.', en: 'Tap the cells of the numerator and the total of the denominator.', ar: 'المس خانات البسط ومجموع المقام.' },
        skills: { eu: 'Taulak eta baldintzapeko probabilitatea', es: 'Tablas y probabilidad condicionada', en: 'Tables and conditional probability', ar: 'الجداول والاحتمال الشرطي' },
        levels: [
            { progressId: 86401, stage: 'probability', title: { eu: 'Laplace', es: 'Laplace', en: 'Laplace', ar: 'لابلاس' }, description: { eu: 'P(A) eta P(A ∩ D).', es: 'P(A) y P(A ∩ D).', en: 'P(A) and P(A ∩ D).', ar: 'P(A) و P(A ∩ D).' } },
            { progressId: 86402, stage: 'events', title: { eu: 'Bilketa', es: 'La unión', en: 'The union', ar: 'الاتحاد' }, description: { eu: 'P(A ∪ D).', es: 'P(A ∪ D).', en: 'P(A ∪ D).', ar: 'P(A ∪ D).' } },
            { progressId: 86403, stage: 'conditional', title: { eu: 'Baldintzapekoa', es: 'Condicionada', en: 'Conditional', ar: 'الشرطي' }, description: { eu: 'P(D/A) eta P(A/D).', es: 'P(D/A) y P(A/D).', en: 'P(D/A) and P(A/D).', ar: 'P(D/A) و P(A/D).' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Probabilitatearen detektibea', es: 'Detective de probabilidad', en: 'Probability detective', ar: 'مخبر الاحتمالات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Probabilitateko akats tipikoak', es: 'Errores típicos de probabilidad', en: 'Common mistakes in probability', ar: 'الأخطاء الشائعة في الاحتمالات' },
        levels: [
            { progressId: 86501, stage: 'probability', title: { eu: 'Laplace', es: 'Laplace', en: 'Laplace', ar: 'لابلاس' }, description: { eu: 'Kasuak, daduak eta bilketa.', es: 'Casos, dados y unión.', en: 'Cases, dice and the union.', ar: 'الحالات والنرود والاتحاد.' } },
            { progressId: 86502, stage: 'compound', title: { eu: 'Konposatuak', es: 'Compuestos', en: 'Compound', ar: 'المركّبة' }, description: { eu: 'Biderkatu, itzuli gabe eta «gutxienez bat».', es: 'Multiplicar, sin devolución y «al menos uno».', en: 'Multiplying, without replacement and «at least one».', ar: 'الضرب ودون إرجاع و«واحد على الأقل».' } },
            { progressId: 86503, stage: 'conditional', title: { eu: 'Baldintzapekoa', es: 'Condicionada', en: 'Conditional', ar: 'الشرطي' }, description: { eu: 'Taldeak eta probabilitate osoa.', es: 'Grupos y probabilidad total.', en: 'Groups and total probability.', ar: 'المجموعات والاحتمال الكلي.' } }
        ]
    }
]

export const probabilityAkGameProgressIds: number[] = levelProgressIds(probabilityAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const probabilityAkGameSlugs: Record<ProbabilityAkGameId, string> = { race: 'lasterketa', memory: 'memoria', tree: 'zuhaitza', table: 'taula', detective: 'detektibea' }

export function probabilityAkGameModeForPath(pathname: string): ProbabilityAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zuhaitza', 'arbol'].includes(game)) return 'tree'
    if (['taula', 'tabla'].includes(game)) return 'table'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
