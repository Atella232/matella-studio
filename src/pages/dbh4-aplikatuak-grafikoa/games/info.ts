import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio baten grafikoa (4. DBH aplikatuak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type GraphsGameId = 'race' | 'memory' | 'laser' | 'match' | 'detective'

export const GRAPHS_GAME_RECORDS_KEY = 'matella-grafikoa-dbh4ap-game-records'

export const graphsGames: GameInfo<GraphsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Grafikoen lasterketa', es: 'Carrera de gráficas', en: 'Graph race', ar: 'سباق البيانات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 58101, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Straight lines', ar: 'المستقيمات' }, description: { eu: 'Maldak, ebakidurak eta ereduak.', es: 'Pendientes, cortes y modelos.', en: 'Slopes, intercepts and models.', ar: 'الميول والتقاطعات والنماذج.' } },
            { progressId: 58102, stage: 'lines', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Bi puntu, n eta ebaki-puntuak.', es: 'Dos puntos, n y puntos de corte.', en: 'Two points, n and intercepts.', ar: 'نقطتان وn ونقاط التقاطع.' } },
            { progressId: 58103, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Balioak, erpinak eta erroak.', es: 'Valores, vértices y raíces.', en: 'Values, vertices and roots.', ar: 'القيم والرؤوس والجذور.' } },
            { progressId: 58104, stage: 'inverse', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'k, asintotak eta erroak.', es: 'k, asíntotas y raíces.', en: 'k, asymptotes and square roots.', ar: 'k والمقاربات والجذور.' } },
            { progressId: 58105, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Berreturak, hazkundea eta azalera handiena.', es: 'Potencias, crecimiento y área máxima.', en: 'Powers, growth and maximum area.', ar: 'القوى والنمو والمساحة العظمى.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere emaitzarekin.', es: 'Une cada expresión con su resultado.', en: 'Match each expression with its result.', ar: 'صِل كل عبارة بنتيجتها.' },
        skills: { eu: 'Maldak, erpinak eta berreturak', es: 'Pendientes, vértices y potencias', en: 'Slopes, vertices and powers', ar: 'الميول والرؤوس والقوى' },
        levels: [
            { progressId: 58201, stage: 'lines', title: { eu: 'Maldak', es: 'Pendientes', en: 'Slopes', ar: 'الميول' }, description: { eu: '(1, 2) (3, 8) ↔ m = 3', es: '(1, 2) (3, 8) ↔ m = 3', en: '(1, 2) (3, 8) ↔ m = 3', ar: '(1, 2) (3, 8) ↔ m = 3' } },
            { progressId: 58202, stage: 'quadratic', title: { eu: 'Erpinak', es: 'Vértices', en: 'Vertices', ar: 'الرؤوس' }, description: { eu: 'x² − 4x + 3 ↔ V(2, −1)', es: 'x² − 4x + 3 ↔ V(2, −1)', en: 'x² − 4x + 3 ↔ V(2, −1)', ar: 'x² − 4x + 3 ↔ V(2, −1)' } },
            { progressId: 58203, stage: 'exponential', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', en: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } }
        ]
    },
    {
        id: 'laser',
        title: { eu: 'Kurben laserra', es: 'Láser de curvas', en: 'Curve laser', ar: 'ليزر المنحنيات' },
        tagline: { eu: 'Doitu kurbaren parametroak eta jaurti: jomuga guztiak jo behar ditu.', es: 'Ajusta los parámetros de la curva y dispara: tiene que dar en todas las dianas.', en: 'Set the parameters of the curve and fire: it has to hit every target.', ar: 'اضبط معاملات المنحنى وأطلق: يجب أن يصيب كل الأهداف.' },
        skills: { eu: 'Parametroak eta grafikoak', es: 'Parámetros y gráficas', en: 'Parameters and graphs', ar: 'المعاملات والتمثيلات' },
        levels: [
            { progressId: 58301, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'y = mx + n', es: 'y = mx + n', en: 'y = mx + n', ar: 'y = mx + n' } },
            { progressId: 58302, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'y = a(x − h)² + k', es: 'y = a(x − h)² + k', en: 'y = a(x − h)² + k', ar: 'y = a(x − h)² + k' } },
            { progressId: 58303, stage: 'exponential', title: { eu: 'Hiperbolak eta esponentzialak', es: 'Hipérbolas y exponenciales', en: 'Hyperbolas and exponentials', ar: 'الزائدة والأسية' }, description: { eu: 'y = a/(x − h) + k, y = 2^(x − h) + k', es: 'y = a/(x − h) + k, y = 2^(x − h) + k', en: 'y = a/(x − h) + k, y = 2^(x − h) + k', ar: 'y = a/(x − h) + k، y = 2^(x − h) + k' } }
        ]
    },
    {
        id: 'match',
        title: { eu: 'Zein formula da?', es: '¿Qué fórmula es?', en: 'Which formula?', ar: 'أي صيغة؟' },
        tagline: { eu: 'Grafiko bat eta lau formula: aukeratu ona.', es: 'Una gráfica y cuatro fórmulas: elige la buena.', en: 'A graph and four formulas: choose the right one.', ar: 'تمثيل وأربع صيغ: اختر الصحيحة.' },
        skills: { eu: 'Grafikoak eta formulak lotzea', es: 'Relacionar gráficas y fórmulas', en: 'Matching graphs and formulas', ar: 'ربط التمثيلات بالصيغ' },
        levels: [
            { progressId: 58401, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'y = mx + n', es: 'y = mx + n', en: 'y = mx + n', ar: 'y = mx + n' } },
            { progressId: 58402, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'y = a(x − h)² + k', es: 'y = a(x − h)² + k', en: 'y = a(x − h)² + k', ar: 'y = a(x − h)² + k' } },
            { progressId: 58403, stage: 'inverse', title: { eu: 'Hiperbolak eta esponentzialak', es: 'Hipérbolas y exponenciales', en: 'Hyperbolas and exponentials', ar: 'الزائدة والأسية' }, description: { eu: 'y = a/(x − h) + k, y = 2^(x − h) + k', es: 'y = a/(x − h) + k, y = 2^(x − h) + k', en: 'y = a/(x − h) + k, y = 2^(x − h) + k', ar: 'y = a/(x − h) + k، y = 2^(x − h) + k' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Grafikoen detektibea', es: 'Detective de gráficas', en: 'Graphs detective', ar: 'مخبر التمثيلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Grafiko eta funtzioetako akats tipikoak', es: 'Errores típicos con gráficas y funciones', en: 'Common mistakes with graphs and functions', ar: 'الأخطاء الشائعة في التمثيلات والدوال' },
        levels: [
            { progressId: 58501, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda, ordenatua eta perpendikularrak.', es: 'Pendiente, ordenada y perpendiculares.', en: 'Slope, intercept and perpendiculars.', ar: 'الميل والجزء المقطوع والعمودية.' } },
            { progressId: 58502, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina eta ebakidurak.', es: 'Vértice y cortes.', en: 'Vertex and cuts.', ar: 'الرأس والتقاطعات.' } },
            { progressId: 58503, stage: 'exponential', title: { eu: 'Hiperbolak eta esponentzialak', es: 'Hipérbolas y exponenciales', en: 'Hyperbolas and exponentials', ar: 'الزائدة والأسية' }, description: { eu: 'Asintotak eta berreturak.', es: 'Asíntotas y potencias.', en: 'Asymptotes and powers.', ar: 'المقاربات والقوى.' } }
        ]
    }
]

export const graphsGameProgressIds: number[] = levelProgressIds(graphsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const graphsGameSlugs: Record<GraphsGameId, string> = { race: 'lasterketa', memory: 'memoria', laser: 'laserra', match: 'formula', detective: 'detektibea' }

export function graphsGameModeForPath(pathname: string): GraphsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['laserra', 'laser'].includes(game)) return 'laser'
    if (['formula', 'formula-grafica'].includes(game)) return 'match'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
