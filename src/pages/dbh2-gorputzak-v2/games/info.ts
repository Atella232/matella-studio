import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Gorputz geometrikoak (2. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type SolidsGameId = 'race' | 'memory'

export const SOLIDS_GAME_RECORDS_KEY = 'matella-gorputzak-dbh2-game-records'

export const solidsGames: GameInfo<SolidsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Gorputzen lasterketa', es: 'Carrera de cuerpos', ar: 'سباق الأجسام' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 34101, stage: 'polyhedra', title: { eu: 'Poliedroak', es: 'Poliedros', ar: 'متعددات الأوجه' }, description: { eu: 'Aurpegiak, ertzak, erpinak eta Euler.', es: 'Caras, aristas, vértices y Euler.', ar: 'الأوجه والأحرف والرؤوس وأويلر.' } },
            { progressId: 34102, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', ar: 'المساحات' }, description: { eu: 'Kuboak, ortoedroak eta piramideak.', es: 'Cubos, ortoedros y pirámides.', ar: 'المكعبات ومتوازيات المستطيلات والأهرامات.' } },
            { progressId: 34103, stage: 'round', title: { eu: 'Biraketa-gorputzak', es: 'Cuerpos de revolución', ar: 'الأجسام الدورانية' }, description: { eu: 'Zilindroa, konoa eta esfera.', es: 'Cilindro, cono y esfera.', ar: 'الأسطوانة والمخروط والكرة.' } },
            { progressId: 34104, stage: 'units', title: { eu: 'Unitateak eta litroak', es: 'Unidades y litros', ar: 'الوحدات واللترات' }, description: { eu: 'm³, dm³, cm³ eta L.', es: 'm³, dm³, cm³ y L.', ar: 'm³ وdm³ وcm³ وL.' } },
            { progressId: 34105, stage: 'volume', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' }, description: { eu: 'Prismak, piramideak, zilindroak, konoak eta esferak.', es: 'Prismas, pirámides, cilindros, conos y esferas.', ar: 'المناشير والأهرامات والأسطوانات والمخاريط والكرات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Unitateak, azalerak eta bolumenak', es: 'Unidades, áreas y volúmenes', ar: 'الوحدات والمساحات والحجوم' },
        levels: [
            { progressId: 34201, stage: 'units', title: { eu: 'Unitateak', es: 'Unidades', ar: 'الوحدات' }, description: { eu: '2,5 m³ ↔ 2500 dm³', es: '2,5 m³ ↔ 2500 dm³', ar: '2.5 m³ ↔ 2500 dm³' } },
            { progressId: 34202, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', ar: 'المساحات' }, description: { eu: '6 · 4² ↔ 96', es: '6 · 4² ↔ 96', ar: '6 · 4² ↔ 96' } },
            { progressId: 34203, stage: 'volume', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' }, description: { eu: '6² · 9 : 3 ↔ 108', es: '6² · 9 : 3 ↔ 108', ar: '6² · 9 : 3 ↔ 108' } }
        ]
    }
]

export const solidsGameProgressIds: number[] = levelProgressIds(solidsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const solidsGameSlugs: Record<SolidsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function solidsGameModeForPath(pathname: string): SolidsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
