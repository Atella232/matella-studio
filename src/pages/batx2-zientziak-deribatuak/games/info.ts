import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachDerivativesGames } from '../../batx1-zientziak-deribatuak/games/info.ts'
import type { Bach2DerivativesStageId } from '../lessons.tsx'

/* ==========================================================================
   Deribatuak (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (differentiable?, peel the onion,
   the hidden slope) and the detective, the race and the memory, and two
   games of Deribatuak 1.º for the review (match f and f′ and the exact
   tangent), with their texts and levels but the stages and progress ids
   of this unit.
   ========================================================================== */

export type Bach2DerivativesGameId = 'race' | 'derivable' | 'onion' | 'hidden' | 'detective' | 'memory' | 'match' | 'tangent'

export const BACH2_DERIVATIVES_GAME_RECORDS_KEY = 'matella-deribatuak-batx2z-game-records'

/** A Deribatuak 1.º game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'match' | 'tangent', stages: Bach2DerivativesStageId[], firstId: number): GameInfo<Bach2DerivativesGameId> {
    const source = bachDerivativesGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bach2DerivativesGames: GameInfo<Bach2DerivativesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Deribatuen lasterketa', es: 'Carrera de derivadas', en: 'Derivatives race', ar: 'سباق المشتقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 123401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Zuzen ukitzailea, normala eta biderkadura.', es: 'Tangente, normal y producto.', en: 'Tangent, normal and product.', ar: 'المماس والعمودي والجداء.' } },
            { progressId: 123402, stage: 'derivability', title: { eu: 'Deribagarritasuna', es: 'Derivabilidad', en: 'Differentiability', ar: 'قابلية الاشتقاق' }, description: { eu: 'Lotuneak, puntak eta alboko deribatuak.', es: 'Uniones, picos y derivadas laterales.', en: 'Joints, corners and one-sided derivatives.', ar: 'نقاط الالتقاء والزوايا والمشتقتان الجانبيتان.' } },
            { progressId: 123403, stage: 'chain', title: { eu: 'Katea', es: 'Cadena', en: 'Chain', ar: 'السلسلة' }, description: { eu: 'Hiru geruza, taula eta n ordena.', es: 'Tres capas, tabla y orden n.', en: 'Three layers, the table and order n.', ar: 'ثلاث طبقات والجدول والرتبة n.' } },
            { progressId: 123404, stage: 'special', title: { eu: 'Bereziak', es: 'Especiales', en: 'Special', ar: 'خاصة' }, description: { eu: 'Alderantzizkoa eta kurba inplizituak.', es: 'Inversa y curvas implícitas.', en: 'The inverse and implicit curves.', ar: 'الدالة العكسية والمنحنيات الضمنية.' } },
            { progressId: 123405, stage: 'tangents', title: { eu: 'Zuzen ukitzaileak', es: 'Tangentes', en: 'Tangents', ar: 'المماسات' }, description: { eu: 'Horizontalak, koefizienteak eta kanpoko puntua.', es: 'Horizontales, coeficientes y punto exterior.', en: 'Horizontal ones, coefficients and an exterior point.', ar: 'الأفقية والمعاملات والنقطة الخارجية.' } }
        ]
    },
    {
        id: 'derivable',
        title: { eu: 'Deribagarria?', es: '¿Derivable?', en: 'Differentiable?', ar: 'قابلة للاشتقاق؟' },
        tagline: { eu: 'Bi zatiko funtzio bat eta lotune bat: deribagarria da, jarraitua punta batekin, ala ez da jarraitua?', es: 'Una función de dos trozos y una unión: ¿es derivable, continua con pico o no es continua?', en: 'A function in two pieces and a joint: is it differentiable, continuous with a corner or not continuous?', ar: 'دالة من جزأين ونقطة التقاء: هل هي قابلة للاشتقاق، أم متصلة بزاوية، أم غير متصلة؟' },
        skills: { eu: 'Lehenik jarraitutasuna, gero maldak', es: 'Primero la continuidad, después las pendientes', en: 'First continuity, then the slopes', ar: 'الاتصال أولًا ثم الميول' },
        levels: [
            { progressId: 123501, stage: 'derivability', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' }, description: { eu: 'Zuzenak eta parabolak.', es: 'Rectas y parábolas.', en: 'Lines and parabolas.', ar: 'مستقيمات وقطوع مكافئة.' } },
            { progressId: 123502, stage: 'derivability', title: { eu: 'Elementalak', es: 'Elementales', en: 'Elementary', ar: 'الأساسية' }, description: { eu: 'eˣ, ln x, sinua eta 1/x.', es: 'eˣ, ln x, seno y 1/x.', en: 'eˣ, ln x, sine and 1/x.', ar: 'eˣ وln x والجيب و1/x.' } },
            { progressId: 123503, stage: 'derivability', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' }, description: { eu: 'x|x|, |x² − c²| eta zatidurak.', es: 'x|x|, |x² − c²| y cocientes.', en: 'x|x|, |x² − c²| and quotients.', ar: 'x|x| و|x² − c²| وخوارج القسمة.' } }
        ]
    },
    {
        id: 'onion',
        title: { eu: 'Zuritu tipula', es: 'Pela la cebolla', en: 'Peel the onion', ar: 'قشّر البصلة' },
        tagline: { eu: 'Ukitu geruzak kanpotik barrura, eta aukeratu deribatua: geruza bakoitzak faktore bat.', es: 'Toca las capas de fuera adentro y elige la derivada: un factor por capa.', en: 'Tap the layers from outside in and choose the derivative: one factor per layer.', ar: 'المس الطبقات من الخارج إلى الداخل واختر المشتقة: عامل لكل طبقة.' },
        skills: { eu: 'Katearen erregela hiru geruzarekin', es: 'La regla de la cadena con tres capas', en: 'The chain rule with three layers', ar: 'قاعدة السلسلة بثلاث طبقات' },
        levels: [
            { progressId: 123601, stage: 'chain', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Karratua, kuboa eta e, kx barruan.', es: 'Cuadrado, cubo y e, con kx dentro.', en: 'Square, cube and e, with kx inside.', ar: 'المربع والمكعب وe، مع kx في الداخل.' } },
            { progressId: 123602, stage: 'chain', title: { eu: 'Erroak eta logaritmoak', es: 'Raíces y logaritmos', en: 'Roots and logarithms', ar: 'الجذور واللوغاريتمات' }, description: { eu: 'x² barruan.', es: 'Con x² dentro.', en: 'With x² inside.', ar: 'مع x² في الداخل.' } },
            { progressId: 123603, stage: 'chain', title: { eu: 'Denak nahasian', es: 'Todo mezclado', en: 'All mixed', ar: 'الكل مختلط' }, description: { eu: 'Geruza guztiak, x² + c barruan.', es: 'Todas las capas, con x² + c dentro.', en: 'Every layer, with x² + c inside.', ar: 'كل الطبقات، مع x² + c في الداخل.' } }
        ]
    },
    {
        id: 'hidden',
        title: { eu: 'Malda ezkutua', es: 'Pendiente escondida', en: 'The hidden slope', ar: 'الميل المخفي' },
        tagline: { eu: 'Kurba bat, puntu bat eta hiru zuzen: zein da zuzen ukitzailea? Deribatu inplizituki.', es: 'Una curva, un punto y tres rectas: ¿cuál es la tangente? Deriva implícitamente.', en: 'A curve, a point and three lines: which one is the tangent? Differentiate implicitly.', ar: 'منحنى ونقطة وثلاثة مستقيمات: أيها المماس؟ اشتق ضمنيًّا.' },
        skills: { eu: 'Deribazio inplizitua puntu batean', es: 'Derivación implícita en un punto', en: 'Implicit differentiation at a point', ar: 'الاشتقاق الضمني عند نقطة' },
        levels: [
            { progressId: 123651, stage: 'special', title: { eu: 'Zirkunferentziak', es: 'Circunferencias', en: 'Circles', ar: 'الدوائر' }, description: { eu: 'x² + y² = r²', es: 'x² + y² = r²', en: 'x² + y² = r²', ar: 'x² + y² = r²' } },
            { progressId: 123652, stage: 'special', title: { eu: 'Elipseak eta hiperbolak', es: 'Elipses e hipérbolas', en: 'Ellipses and hyperbolas', ar: 'القطوع الناقصة والزائدة' }, description: { eu: 'x² + ky² = d eta xy = k.', es: 'x² + ky² = d y xy = k.', en: 'x² + ky² = d and xy = k.', ar: 'x² + ky² = d وxy = k.' } },
            { progressId: 123653, stage: 'special', title: { eu: 'xy gaiarekin', es: 'Con xy', en: 'With xy', ar: 'مع xy' }, description: { eu: 'x² ± xy + y² = d', es: 'x² ± xy + y² = d', en: 'x² ± xy + y² = d', ar: 'x² ± xy + y² = d' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Deribatuen detektibea', es: 'Detective de derivadas', en: 'Derivatives detective', ar: 'مخبر المشتقات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: '2. mailako akats ohikoak', es: 'Los errores típicos de 2.º', en: 'The typical mistakes of 2nd year', ar: 'الأخطاء الشائعة في السنة الثانية' },
        levels: [
            { progressId: 123701, stage: 'derivability', title: { eu: 'Errepasoa eta puntak', es: 'Repaso y picos', en: 'Review and corners', ar: 'مراجعة وزوايا' }, description: { eu: 'Normala, biderkadura, jauziak eta |g|.', es: 'Normal, producto, saltos y |g|.', en: 'Normal, product, jumps and |g|.', ar: 'العمودي والجداء والقفزات و|g|.' } },
            { progressId: 123702, stage: 'chain', title: { eu: 'Katea', es: 'Cadena', en: 'Chain', ar: 'السلسلة' }, description: { eu: 'Geruzak, u′, zeinua eta n!.', es: 'Capas, u′, signo y n!.', en: 'Layers, u′, the sign and n!.', ar: 'الطبقات وu′ والإشارة وn!.' } },
            { progressId: 123703, stage: 'special', title: { eu: 'Bereziak eta zuzen ukitzaileak', es: 'Especiales y tangentes', en: 'Special ones and tangents', ar: 'الخاصة والمماسات' }, description: { eu: 'Alderantzizkoa, y′, xˣ eta kanpoko puntua.', es: 'Inversa, y′, xˣ y punto exterior.', en: 'The inverse, y′, xˣ and an exterior point.', ar: 'العكسية وy′ وxˣ والنقطة الخارجية.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Deribatuen memoria', es: 'Memoria de derivadas', en: 'Derivatives memory', ar: 'ذاكرة المشتقات' },
        tagline: { eu: 'Egin bikoteak: funtzio bat eta bere deribatua.', es: 'Haz parejas: una función y su derivada.', en: 'Make pairs: a function and its derivative.', ar: 'كوّن أزواجًا: دالة ومشتقتها.' },
        skills: { eu: 'Katea, ondoz ondoko deribatuak eta inplizituak', es: 'Cadena, sucesivas e implícitas', en: 'Chain, successive and implicit', ar: 'السلسلة والمتتالية والضمنية' },
        levels: [
            { progressId: 123801, stage: 'chain', title: { eu: 'Konposatuak', es: 'Compuestas', en: 'Composites', ar: 'المركبة' }, description: { eu: 'e, ln, berreturak eta erroak.', es: 'e, ln, potencias y raíces.', en: 'e, ln, powers and roots.', ar: 'e وln والقوى والجذور.' } },
            { progressId: 123802, stage: 'chain', title: { eu: 'Ondoz ondokoak', es: 'Sucesivas', en: 'Successive', ar: 'المتتالية' }, description: { eu: 'f″, f‴ eta f⁽ⁿ⁾.', es: 'f″, f‴ y f⁽ⁿ⁾.', en: 'f″, f‴ and f⁽ⁿ⁾.', ar: 'f″ وf‴ وf⁽ⁿ⁾.' } },
            { progressId: 123803, stage: 'special', title: { eu: 'Inplizituak', es: 'Implícitas', en: 'Implicit', ar: 'الضمنية' }, description: { eu: 'Kurba bat eta haren y′.', es: 'Una curva y su y′.', en: 'A curve and its y′.', ar: 'منحنى و y′ الخاص به.' } }
        ]
    },
    reused('match', ['review', 'review', 'chain'], 123811),
    reused('tangent', ['review', 'tangents', 'tangents'], 123821)
]

export const bach2DerivativesGameProgressIds: number[] = levelProgressIds(bach2DerivativesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2DerivativesGameSlugs: Record<Bach2DerivativesGameId, string> = { race: 'lasterketa', derivable: 'deribagarria', onion: 'tipula', hidden: 'malda-ezkutua', detective: 'detektibea', memory: 'memoria', match: 'parekatu', tangent: 'ukitzailea' }

export function bach2DerivativesGameModeForPath(pathname: string): Bach2DerivativesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['deribagarria', 'derivable'].includes(game)) return 'derivable'
    if (['tipula', 'cebolla'].includes(game)) return 'onion'
    if (['malda-ezkutua', 'pendiente-escondida'].includes(game)) return 'hidden'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['parekatu', 'empareja'].includes(game)) return 'match'
    if (['ukitzailea', 'tangente'].includes(game)) return 'tangent'
    return 'hub'
}
