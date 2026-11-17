import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { determinanteakGames } from '../../batx2-zientziak-determinanteak/games/info.ts'

/* ==========================================================================
   Determinanteak (Batxilergoa 2 · Gizarte Zientziak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star. Three games of its own (unique prices, quick cofactor
   and the detective of determinants), «What happens to the determinant?»
   of the Ciencias twin with ids of this unit, the race and the memory.
   Block of ids: 142401–142899.
   ========================================================================== */

export type GizarteDeterminanteakGameId = 'race' | 'unique-prices' | 'quick-cofactor' | 'what-happens' | 'detective' | 'memory'

export const GIZARTE_DETERMINANTEAK_GAME_RECORDS_KEY = 'matella-determinanteak-batx2g-game-records'

const twin = (id: 'race' | 'what-happens' | 'memory') => determinanteakGames.find((game) => game.id === id)!
const renumber = (game: GameInfo<string>, first: number) => game.levels.map((level, index) => ({ ...level, progressId: first + index }))

/** What each circuit asks here: no order 4, and the bundles of this unit */
const RACE_DESCRIPTIONS: Array<GameInfo['levels'][number]['description'] | undefined> = [
    { eu: 'ad − bc, Sarrus, x ezezaguna eta sortak.', es: 'ad − bc, Sarrus, la x desconocida y los lotes.', en: 'ad − bc, Sarrus, the unknown x and the bundles.', ar: 'ad − bc وساروس وx المجهول والمجموعات.' },
    undefined,
    { eu: 'Adjuntu bat eta zero asko dituen lerroa.', es: 'Un adjunto y la línea con ceros.', en: 'A cofactor and the line with zeros.', ar: 'متمم جبري والخط ذو الأصفار.' },
    undefined,
    { eu: 'A⁻¹ matrizearen elementu bat, alderantzizkorik gabeko m, |X| eta prezioak finkatzen ez dituen a.', es: 'Un elemento de A⁻¹, la m sin inversa, |X| y la a que deja los precios sin fijar.', en: 'An entry of A⁻¹, the m with no inverse, |X| and the a that leaves the prices unfixed.', ar: 'عنصر من A⁻¹ وm دون معكوس و|X| وa التي لا تحدد الأسعار.' }
]

export const gizarteDeterminanteakGames: GameInfo<GizarteDeterminanteakGameId>[] = [
    {
        ...twin('race'),
        id: 'race',
        levels: renumber(twin('race'), 142401).map((level, index) => ({ ...level, description: RACE_DESCRIPTIONS[index] ?? level.description }))
    },
    {
        id: 'unique-prices',
        title: { eu: 'Prezio bakarrak?', es: '¿Hay precios únicos?', en: 'Unique prices?', ar: 'أسعار وحيدة؟' },
        tagline: { eu: 'Sorta batzuen kopuruak dituzu. Ondoriozta al daitezke prezioak? |A| zenbakiak erabakitzen du.', es: 'Tienes las cantidades de unos lotes. ¿Se pueden deducir los precios? Lo decide |A|.', en: 'You have the quantities of some bundles. Can the prices be found? |A| decides.', ar: 'لديك كميات مجموعات. هل يمكن استنتاج الأسعار؟ |A| هو الذي يقرر.' },
        skills: { eu: 'Determinantea eta datu nahikoak', es: 'El determinante y los datos suficientes', en: 'The determinant and enough data', ar: 'المحدد والمعطيات الكافية' },
        levels: [
            { progressId: 142501, stage: 'orders', title: { eu: 'Bi produktu', es: 'Dos productos', en: 'Two products', ar: 'منتجان' }, description: { eu: '2 × 2 sortak', es: 'Lotes 2 × 2', en: '2 × 2 bundles', ar: 'مجموعات 2 × 2' } },
            { progressId: 142502, stage: 'orders', title: { eu: 'Hiru produktu', es: 'Tres productos', en: 'Three products', ar: 'ثلاثة منتجات' }, description: { eu: 'Sarrus eta sorta nahasiak', es: 'Sarrus y lotes mezcla', en: 'Sarrus and mixed bundles', ar: 'ساروس ومجموعات ممزوجة' } },
            { progressId: 142503, stage: 'inverse', title: { eu: 'Parametroa', es: 'El parámetro', en: 'The parameter', ar: 'الوسيط' }, description: { eu: 'Zein a baliotarako ez?', es: '¿Para qué a no?', en: 'For which a not?', ar: 'لأي a لا؟' } }
        ]
    },
    {
        id: 'quick-cofactor',
        title: { eu: 'Adjuntu azkarra', es: 'Adjunto exprés', en: 'Quick cofactor', ar: 'المتمم السريع' },
        tagline: { eu: 'Adjuntu bat edo alderantzizkoaren elementu bat, bakarra aldi bakoitzean: zeinua, iraulia eta |A| zenbakiaz zatitzea ahaztu gabe.', es: 'Un adjunto o un elemento de la inversa, uno cada vez: sin olvidar el signo, la traspuesta ni dividir entre |A|.', en: 'A cofactor or an entry of the inverse, one at a time: without forgetting the sign, the transpose or dividing by |A|.', ar: 'متمم جبري أو عنصر من المعكوس، واحد في كل مرة: دون نسيان الإشارة والنقل والقسمة على |A|.' },
        skills: { eu: 'Adjuntuak eta alderantzizkoa', es: 'Adjuntos e inversa', en: 'Cofactors and the inverse', ar: 'المتممات والمعكوس' },
        levels: [
            { progressId: 142601, stage: 'expansion', title: { eu: 'Adjuntu bat', es: 'Un adjunto', en: 'A cofactor', ar: 'متمم' }, description: { eu: 'Aᵢⱼ, 3 × 3', es: 'Aᵢⱼ, 3 × 3', en: 'Aᵢⱼ, 3 × 3', ar: 'Aᵢⱼ، 3 × 3' } },
            { progressId: 142602, stage: 'inverse', title: { eu: 'Alderantzizkoa, 2 × 2', es: 'Inversa 2 × 2', en: 'Inverse 2 × 2', ar: 'المعكوس 2 × 2' }, description: { eu: '(A⁻¹)ᵢⱼ = Aⱼᵢ / |A|', es: '(A⁻¹)ᵢⱼ = Aⱼᵢ / |A|', en: '(A⁻¹)ᵢⱼ = Aⱼᵢ / |A|', ar: '(A⁻¹)ᵢⱼ = Aⱼᵢ / |A|' } },
            { progressId: 142603, stage: 'inverse', title: { eu: 'Alderantzizkoa, 3 × 3', es: 'Inversa 3 × 3', en: 'Inverse 3 × 3', ar: 'المعكوس 3 × 3' }, description: { eu: 'Iraulita eta zatituta', es: 'Traspuesta y dividida', en: 'Transposed and divided', ar: 'منقولة ومقسومة' } }
        ]
    },
    { ...twin('what-happens'), id: 'what-happens', levels: renumber(twin('what-happens'), 142701) },
    {
        id: 'detective',
        title: { eu: 'Determinanteen detektibea', es: 'Detective de determinantes', en: 'Determinant detective', ar: 'مخبر المحددات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 142801, stage: 'orders', title: { eu: 'Kalkulua', es: 'Cálculo', en: 'Working out', ar: 'الحساب' }, description: { eu: 'ad + bc, Sarrus, |kA|', es: 'ad + bc, Sarrus, |kA|', en: 'ad + bc, Sarrus, |kA|', ar: 'ad + bc وساروس و|kA|' } },
            { progressId: 142802, stage: 'expansion', title: { eu: 'Adjuntuak', es: 'Adjuntos', en: 'Cofactors', ar: 'المتممات' }, description: { eu: 'Zeinua, ezabatzea, garapena', es: 'El signo, el tachado, el desarrollo', en: 'The sign, the striking out, the expansion', ar: 'الإشارة والحذف والنشر' } },
            { progressId: 142803, stage: 'inverse', title: { eu: 'Alderantzizkoa', es: 'Inversa', en: 'Inverse', ar: 'المعكوس' }, description: { eu: 'Irauli gabe, zatitu gabe, |A⁻¹|', es: 'Sin trasponer, sin dividir, |A⁻¹|', en: 'No transpose, no division, |A⁻¹|', ar: 'دون نقل ودون قسمة و|A⁻¹|' } }
        ]
    },
    { ...twin('memory'), id: 'memory', levels: renumber(twin('memory'), 142851) }
]

export const gizarteDeterminanteakGameProgressIds: number[] = levelProgressIds(gizarteDeterminanteakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizarteDeterminanteakGameSlugs: Record<GizarteDeterminanteakGameId, string> = { race: 'lasterketa', 'unique-prices': 'prezio-bakarrak', 'quick-cofactor': 'adjuntu-azkarra', 'what-happens': 'zer-gertatzen-zaio', detective: 'detektibea', memory: 'memoria' }

export function gizarteDeterminanteakGameModeForPath(pathname: string): GizarteDeterminanteakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['prezio-bakarrak', 'precios-unicos'].includes(game)) return 'unique-prices'
    if (['adjuntu-azkarra', 'adjunto-expres'].includes(game)) return 'quick-cofactor'
    if (['zer-gertatzen-zaio', 'que-le-pasa'].includes(game)) return 'what-happens'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
