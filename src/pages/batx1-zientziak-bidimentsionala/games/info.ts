import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { statisticsAkGames } from '../../dbh4-akademikoak-estatistika/games/info.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Three games of its own (the sign of the
   covariance, which lines and the detective), the race and the memory,
   and «guess the correlation» of 4. DBH académicas kept for the review,
   with its texts and levels but the progress ids of this unit.
   ========================================================================== */

export type BivarGameId = 'race' | 'sign' | 'lines' | 'detective' | 'memory' | 'cloud'

export const BIVAR_GAME_RECORDS_KEY = 'matella-bidimentsionala-batx1z-game-records'

const cloudSource = statisticsAkGames.find((game) => game.id === 'cloud')!

export const bivarGames: GameInfo<BivarGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Bi aldagaien lasterketa', es: 'Carrera de dos variables', en: 'Two-variable race', ar: 'سباق المتغيرين' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 115401, stage: 'tables', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'Baldintzatuak, marjinalak eta independentzia.', es: 'Condicionadas, marginales e independencia.', en: 'Conditionals, marginals and independence.', ar: 'الشرطية والهامشية والاستقلال.' } },
            { progressId: 115402, stage: 'cloud', title: { eu: 'Hodeia', es: 'La nube', en: 'The cloud', ar: 'السحابة' }, description: { eu: 'Zentroa eta biderkadurak.', es: 'El centro y los productos.', en: 'The centre and the products.', ar: 'المركز والجداءات.' } },
            { progressId: 115403, stage: 'parameters', title: { eu: 'Kobariantza eta r', es: 'Covarianza y r', en: 'Covariance and r', ar: 'التغاير وr' }, description: { eu: 'σxy, r eta unitateak.', es: 'σxy, r y las unidades.', en: 'σxy, r and the units.', ar: 'σxy وr والوحدات.' } },
            { progressId: 115404, stage: 'regression', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda, estimazioak eta r².', es: 'Pendiente, estimaciones y r².', en: 'Slope, estimates and r².', ar: 'الميل والتقديرات وr².' } },
            { progressId: 115405, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Gelaxkak, baturak eta ȳ.', es: 'Casillas, sumas e ȳ.', en: 'Cells, sums and ȳ.', ar: 'الخانات والمجاميع وȳ.' } }
        ]
    },
    {
        id: 'sign',
        title: { eu: 'Kobariantzaren zeinua', es: 'El signo de la covarianza', en: 'The sign of the covariance', ar: 'إشارة التغاير' },
        tagline: { eu: 'Grabitate-zentroa marraztuta: irakurri kobariantzaren zeinua, aurkitu gehien batzen edo kentzen duen puntua, eta kalkulatu σxy.', es: 'Con el centro de gravedad dibujado: lee el signo de la covarianza, encuentra el punto que más suma o resta y calcula σxy.', en: 'With the centre of gravity drawn: read the sign of the covariance, find the point that adds or takes away the most, and work out σxy.', ar: 'مع رسم مركز الثقل: اقرأ إشارة التغاير، وجد النقطة الأكثر إضافة أو طرحًا، واحسب σxy.' },
        skills: { eu: 'Koadranteak eta kobariantza', es: 'Cuadrantes y covarianza', en: 'Quadrants and covariance', ar: 'الأرباع والتغاير' },
        levels: [
            { progressId: 115501, stage: 'cloud', title: { eu: 'Zeinua', es: 'El signo', en: 'The sign', ar: 'الإشارة' }, description: { eu: 'Positiboa, ia zero edo negatiboa.', es: 'Positiva, casi cero o negativa.', en: 'Positive, almost zero or negative.', ar: 'موجب أو قريب من الصفر أو سالب.' } },
            { progressId: 115502, stage: 'cloud', title: { eu: 'Puntu bat', es: 'Un punto', en: 'One point', ar: 'نقطة واحدة' }, description: { eu: 'Zeinek batzen edo kentzen du gehien?', es: '¿Cuál suma o resta más?', en: 'Which one adds or takes away the most?', ar: 'أيها يضيف أو يطرح أكثر؟' } },
            { progressId: 115503, stage: 'parameters', title: { eu: 'Balioa', es: 'El valor', en: 'The value', ar: 'القيمة' }, description: { eu: 'Lau bikote, hiru aukera.', es: 'Cuatro pares, tres opciones.', en: 'Four pairs, three options.', ar: 'أربعة أزواج وثلاثة خيارات.' } }
        ]
    },
    {
        id: 'lines',
        title: { eu: 'Zein zuzen?', es: '¿Qué rectas?', en: 'Which lines?', ar: 'أي مستقيمين؟' },
        tagline: { eu: 'Bi erregresio-zuzen: aurkitu non ebakitzen diren, kalkulatu r eta esan bikotea posible den.', es: 'Dos rectas de regresión: halla dónde se cortan, calcula r y di si el par es posible.', en: 'Two regression lines: find where they cross, work out r and say whether the pair is possible.', ar: 'مستقيما انحدار: جد نقطة تقاطعهما، واحسب r، وقل هل الزوج ممكن.' },
        skills: { eu: 'Bi zuzenak', es: 'Las dos rectas', en: 'The two lines', ar: 'المستقيمان' },
        levels: [
            { progressId: 115601, stage: 'regression', title: { eu: 'Zentroa', es: 'El centro', en: 'The centre', ar: 'المركز' }, description: { eu: 'Non ebakitzen dira?', es: '¿Dónde se cortan?', en: 'Where do they cross?', ar: 'أين يتقاطعان؟' } },
            { progressId: 115602, stage: 'regression', title: { eu: 'r zuzenetatik', es: 'r de las rectas', en: 'r from the lines', ar: 'r من المستقيمين' }, description: { eu: 'Malden biderkadura r² da.', es: 'El producto de las pendientes es r².', en: 'The product of the slopes is r².', ar: 'جداء الميلين هو r².' } },
            { progressId: 115603, stage: 'problems', title: { eu: 'Posible?', es: '¿Posible?', en: 'Possible?', ar: 'ممكن؟' }, description: { eu: 'Zeinu bera eta 1 baino gutxiago.', es: 'El mismo signo y no más de 1.', en: 'The same sign and not more than 1.', ar: 'الإشارة نفسها ولا يتجاوز 1.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Bi aldagaien detektibea', es: 'Detective de dos variables', en: 'Two-variable detective', ar: 'مخبر المتغيرين' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 115701, stage: 'tables', title: { eu: 'Taulak eta hodeia', es: 'Tablas y nube', en: 'Tables and cloud', ar: 'الجداول والسحابة' }, description: { eu: 'Baldintzatuak, marjinalak, independentzia eta zeinuak.', es: 'Condicionadas, marginales, independencia y signos.', en: 'Conditionals, marginals, independence and signs.', ar: 'الشرطية والهامشية والاستقلال والإشارات.' } },
            { progressId: 115702, stage: 'parameters', title: { eu: 'Kobariantza eta r', es: 'Covarianza y r', en: 'Covariance and r', ar: 'التغاير وr' }, description: { eu: 'Kenketa, N, bariantzak eta unitateak.', es: 'La resta, N, las varianzas y las unidades.', en: 'The subtraction, N, the variances and the units.', ar: 'الطرح وN والتباينان والوحدات.' } },
            { progressId: 115703, stage: 'regression', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda, x estimatzea, r eta ȳ.', es: 'Pendiente, estimar x, r e ȳ.', en: 'Slope, estimating x, r and ȳ.', ar: 'الميل وتقدير x وr وȳ.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: biderkadura bat eta haren balioa, kobariantza bat eta haren r, edo bi malden biderkadura eta |r|.', es: 'Encuentra las parejas: un producto y su valor, una covarianza y su r, o el producto de las dos pendientes y |r|.', en: 'Find the pairs: a product and its value, a covariance and its r, or the product of the two slopes and |r|.', ar: 'جد الأزواج: جداء وقيمته، أو تغاير وr الخاص به، أو جداء الميلين و|r|.' },
        skills: { eu: 'Biderkadurak, r eta maldak', es: 'Productos, r y pendientes', en: 'Products, r and slopes', ar: 'الجداءات وr والميلان' },
        levels: [
            { progressId: 115801, stage: 'cloud', title: { eu: 'Biderkadurak', es: 'Productos', en: 'Products', ar: 'الجداءات' }, description: { eu: '(7 − 4)(2 − 6) ↔ −12', es: '(7 − 4)(2 − 6) ↔ −12', en: '(7 − 4)(2 − 6) ↔ −12', ar: '(7 − 4)(2 − 6) ↔ −12' } },
            { progressId: 115802, stage: 'parameters', title: { eu: 'Korrelazioa', es: 'Correlación', en: 'Correlation', ar: 'الارتباط' }, description: { eu: '6 / (2 · 5) ↔ r = 0,6', es: '6 / (2 · 5) ↔ r = 0,6', en: '6 / (2 · 5) ↔ r = 0.6', ar: '6 / (2 · 5) ↔ r = 0.6' } },
            { progressId: 115803, stage: 'regression', title: { eu: 'Maldak', es: 'Pendientes', en: 'Slopes', ar: 'الميلان' }, description: { eu: '0,8 · 0,45 ↔ |r| = 0,6', es: '0,8 · 0,45 ↔ |r| = 0,6', en: '0.8 · 0.45 ↔ |r| = 0.6', ar: '0.8 · 0.45 ↔ |r| = 0.6' } }
        ]
    },
    // «Guess the correlation» of 4. DBH, with this unit's progress ids
    { ...cloudSource, id: 'cloud', levels: cloudSource.levels.map((level, index) => ({ ...level, stage: 'cloud', progressId: 115811 + index })) }
]

export const bivarGameProgressIds: number[] = levelProgressIds(bivarGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bivarGameSlugs: Record<BivarGameId, string> = { race: 'lasterketa', sign: 'zeinua', lines: 'zuzenak', detective: 'detektibea', memory: 'memoria', cloud: 'korrelazioa' }

export function bivarGameModeForPath(pathname: string): BivarGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zeinua', 'signo'].includes(game)) return 'sign'
    if (['zuzenak', 'rectas'].includes(game)) return 'lines'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['korrelazioa', 'correlacion'].includes(game)) return 'cloud'
    return 'hub'
}
