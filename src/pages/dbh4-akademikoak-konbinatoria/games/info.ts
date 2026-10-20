import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Konbinatoria (4. DBH akademikoak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type CombinatoricsAkGameId = 'race' | 'memory'

export const COMBINATORICS_AK_GAME_RECORDS_KEY = 'matella-konbinatoria-dbh4ak-game-records'

export const combinatoricsAkGames: GameInfo<CombinatoricsAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaketaren lasterketa', es: 'Carrera de recuentos', ar: 'سباق العدّ' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 84101, stage: 'counting', title: { eu: 'Zenbatzen', es: 'Contar', ar: 'العدّ' }, description: { eu: 'Menuak, faktorialak eta zatiketak.', es: 'Menús, factoriales y cocientes.', ar: 'الوجبات والمضاريب والقسمة.' } },
            { progressId: 84102, stage: 'variations', title: { eu: 'Aldakuntzak', es: 'Variaciones', ar: 'التراتيب' }, description: { eu: 'Errepikatuz, errepikatu gabe eta zenbakiak.', es: 'Con repetición, sin repetición y números.', ar: 'مع التكرار ودونه والأعداد.' } },
            { progressId: 84103, stage: 'permutations', title: { eu: 'Permutazioak', es: 'Permutaciones', ar: 'التباديل' }, description: { eu: 'Ilarak, blokeak eta letra errepikatuak.', es: 'Filas, bloques y letras repetidas.', ar: 'الصفوف والكتل والأحرف المكررة.' } },
            { progressId: 84104, stage: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', ar: 'التوافيق' }, description: { eu: 'Taldeak, eskuemateak eta simetria.', es: 'Grupos, saludos y simetría.', ar: 'المجموعات والمصافحات والتماثل.' } },
            { progressId: 84105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', ar: 'مسائل' }, description: { eu: 'Diagonalak, bideak eta batzordeak.', es: 'Diagonales, caminos y comisiones.', ar: 'الأقطار والمسارات واللجان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Faktorialak, aldakuntzak eta zenbaki konbinatorioak', es: 'Factoriales, variaciones y números combinatorios', ar: 'المضاريب والتراتيب والأعداد التوافقية' },
        levels: [
            { progressId: 84201, stage: 'counting', title: { eu: 'Faktorialak', es: 'Factoriales', ar: 'المضاريب' }, description: { eu: '5! ↔ 120', es: '5! ↔ 120', ar: '5! ↔ 120' } },
            { progressId: 84202, stage: 'variations', title: { eu: 'Aldakuntzak', es: 'Variaciones', ar: 'التراتيب' }, description: { eu: 'V₅,₂ ↔ 20', es: 'V₅,₂ ↔ 20', ar: 'V₅,₂ ↔ 20' } },
            { progressId: 84203, stage: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', ar: 'التوافيق' }, description: { eu: 'C₆,₂ ↔ 15', es: 'C₆,₂ ↔ 15', ar: 'C₆,₂ ↔ 15' } }
        ]
    }
]

export const combinatoricsAkGameProgressIds: number[] = levelProgressIds(combinatoricsAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const combinatoricsAkGameSlugs: Record<CombinatoricsAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function combinatoricsAkGameModeForPath(pathname: string): CombinatoricsAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
