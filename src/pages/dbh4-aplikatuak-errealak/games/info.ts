import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki errealak (4. DBH, aplikatuak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type RealsGameId = 'race' | 'place' | 'memory'

export const REALS_GAME_RECORDS_KEY = 'matella-errealak-dbh4ap-game-records'

export const realsGames: GameInfo<RealsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki errealen lasterketa', es: 'Carrera de números reales', en: 'Real numbers race', ar: 'سباق الأعداد الحقيقية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 41101, stage: 'rational', title: { eu: 'Zatikiak eta berreturak', es: 'Fracciones y potencias', en: 'Fractions and powers', ar: 'الكسور والقوى' }, description: { eu: 'Eragiketak, berretzaile negatiboak eta berreturen arauak.', es: 'Operaciones, exponentes negativos y reglas de las potencias.', en: 'Operations, negative exponents and the rules of powers.', ar: 'العمليات والأسس السالبة وقواعد القوى.' } },
            { progressId: 41102, stage: 'decimals', title: { eu: 'Hamartarrak eta zatikiak', es: 'Decimales y fracciones', en: 'Decimals and fractions', ar: 'العشريات والكسور' }, description: { eu: 'Hamartar motak eta zatiki sortzailea.', es: 'Tipos de decimales y fracción generatriz.', en: 'Types of decimals and generating fraction.', ar: 'أنواع العشريات والكسر المولّد.' } },
            { progressId: 41103, stage: 'reals', title: { eu: 'Irrazionalak eta tarteak', es: 'Irracionales e intervalos', en: 'Irrationals and intervals', ar: 'غير النسبية والفترات' }, description: { eu: 'Zein den irrazionala, tarteak idatzi eta irakurri, erroak kokatu.', es: 'Reconocer irracionales, escribir y leer intervalos, situar raíces.', en: 'Recognise irrationals, write and read intervals, locate roots.', ar: 'تمييز غير النسبية وكتابة الفترات وقراءتها وتحديد الجذور.' } },
            { progressId: 41104, stage: 'approx', title: { eu: 'Hurbilketak eta idazkera zientifikoa', es: 'Aproximaciones y notación científica', en: 'Approximations and scientific notation', ar: 'التقريب والترميز العلمي' }, description: { eu: 'Biribildu, errore absolutua eta 10en berreturak.', es: 'Redondear, error absoluto y potencias de 10.', en: 'Rounding, absolute error and powers of 10.', ar: 'التقريب والخطأ المطلق وقوى 10.' } },
            { progressId: 41105, stage: 'radicals', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', en: 'Roots and radicals', ar: 'الجذور والجذريات' }, description: { eu: 'Erroak kalkulatu, sinplifikatu, batu eta biderkatu.', es: 'Calcular raíces, simplificar, sumar y multiplicar radicales.', en: 'Calculate roots, simplify, add and multiply radicals.', ar: 'حساب الجذور وتبسيط الجذريات وجمعها وضربها.' } }
        ]
    },
    {
        id: 'place',
        title: { eu: 'Kokatu zuzenean', es: 'Sitúa en la recta', en: 'Place on the number line', ar: 'ضعه على المستقيم' },
        tagline: { eu: 'Zortzi zenbaki zuzen errealean: sakatu non dagoen bakoitza. Bi saiakera dituzu zenbaki bakoitzeko.', es: 'Ocho números en la recta real: pulsa dónde está cada uno. Tienes dos intentos por número.', en: 'Eight numbers on the real number line: tap where each one is. You have two tries per number.', ar: 'ثمانية أعداد على المستقيم الحقيقي: اضغط على موضع كل عدد. لديك محاولتان لكل عدد.' },
        skills: { eu: 'Zatikiak, hamartarrak eta irrazionalak zuzenean kokatzea', es: 'Situar fracciones, decimales e irracionales en la recta', en: 'Place fractions, decimals and irrational numbers on the number line.', ar: 'وضع الكسور والعشريات وغير النسبية على المستقيم' },
        levels: [
            { progressId: 41201, stage: 'rational', title: { eu: 'Laurdenak', es: 'Cuartos', en: 'Quarters', ar: 'الأرباع' }, description: { eu: 'Zatikiak eta hamartarrak: 3/4, −1,5, 7/4…', es: 'Fracciones y decimales: 3/4, −1,5, 7/4…', en: 'Fractions and decimals: 3/4, −1.5, 7/4…', ar: 'كسور وعشريات: 3/4 و⁦−1.5⁩ و7/4…' } },
            { progressId: 41202, stage: 'decimals', title: { eu: 'Hamarrenak', es: 'Décimas', en: 'Tenths', ar: 'الأعشار' }, description: { eu: 'Hamarrenetako marrak: 0,7, −1,3, 3/5…', es: 'Marcas de décimas: 0,7, −1,3, 3/5…', en: 'Tenth marks: 0.7, −1.3, 3/5…', ar: 'علامات الأعشار: 0.7 و⁦−1.3⁩ و3/5…' } },
            { progressId: 41203, stage: 'reals', title: { eu: 'Irrazionalak', es: 'Irracionales', en: 'Irrational numbers', ar: 'غير النسبية' }, description: { eu: '√2, √10, π… inguruko hamarrenean.', es: '√2, √10, π… en la décima más próxima.', en: '√2, √10, π… to the nearest tenth.', ar: '√2 و√10 وπ… عند أقرب عُشر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: hamartar periodiko bat eta bere zatikia, zenbaki bat eta bere idazkera zientifikoa edo erro bat sinplifikatuta.', es: 'Encuentra las parejas: un decimal periódico y su fracción, un número y su notación científica o una raíz y su forma simplificada.', en: 'Find the pairs: a recurring decimal and its fraction, a number and its scientific notation, or a root and its simplified form.', ar: 'جد الأزواج: عدد عشري دوري وكسره، أو عدد وترميزه العلمي، أو جذر وصورته المبسطة.' },
        skills: { eu: 'Zatiki sortzailea, 10en berreturak eta erradikalak buruz', es: 'Fracción generatriz, potencias de 10 y radicales de cabeza', en: 'Generating fraction, powers of 10 and mental roots.', ar: 'الكسر المولّد وقوى 10 والجذريات ذهنيًا' },
        levels: [
            { progressId: 41301, stage: 'decimals', title: { eu: 'Zatiki sortzailea', es: 'Fracción generatriz', en: 'Generating fraction', ar: 'الكسر المولّد' }, description: { eu: '0,8333… ↔ 5/6', es: '0,8333… ↔ 5/6', en: '0.8333… ↔ 5/6', ar: '0.8333… ↔ 5/6' } },
            { progressId: 41302, stage: 'approx', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' }, description: { eu: '0,00052 ↔ 5,2 · 10⁻⁴', es: '0,00052 ↔ 5,2 · 10⁻⁴', en: '0.00052 ↔ 5.2 · 10⁻⁴', ar: '0.00052 ↔ 5.2 · 10⁻⁴' } },
            { progressId: 41303, stage: 'radicals', title: { eu: 'Erradikalak', es: 'Radicales', en: 'Radicals', ar: 'الجذريات' }, description: { eu: '√72 ↔ 6√2', es: '√72 ↔ 6√2', en: '√72 ↔ 6√2', ar: '√72 ↔ 6√2' } }
        ]
    }
]

export const realsGameProgressIds: number[] = levelProgressIds(realsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const realsGameSlugs: Record<RealsGameId, string> = { race: 'lasterketa', place: 'zuzena', memory: 'memoria' }

export function realsGameModeForPath(pathname: string): RealsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zuzena', 'recta', 'situar', 'kokatu'].includes(game)) return 'place'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
