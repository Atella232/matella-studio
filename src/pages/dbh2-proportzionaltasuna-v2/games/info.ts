import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak (2. DBH) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its first
   star. Four games belong to this topic (the price tag, direct or
   inverse, finish the job and the proportions detective); the race and
   the memory are shared engines. Level descriptions are plain text.
   ========================================================================== */

export type ProportionDbh2GameId = 'race' | 'tag' | 'kind' | 'work' | 'detective' | 'memory'

export const PROPORTION_DBH2_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh2-game-records'

export const proportionDbh2Games: GameInfo<ProportionDbh2GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', en: 'Proportion race', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 22101, stage: 'proportions', title: { eu: 'Proportzioak', es: 'Proporciones', en: 'Proportions', ar: 'التناسبات' }, description: { eu: 'Laugarren proportzionala eta alderantzizkoa.', es: 'Cuarto proporcional e inversa.', en: 'Fourth proportional and inverse.', ar: 'الرابع المتناسب والعكسي.' } },
            { progressId: 22102, stage: 'compound', title: { eu: 'Konposatua', es: 'Compuesta', en: 'Compound', ar: 'المركّب' }, description: { eu: 'Bi magnitude aldi berean.', es: 'Dos magnitudes a la vez.', en: 'Two quantities at once.', ar: 'مقداران معًا.' } },
            { progressId: 22103, stage: 'shares', title: { eu: 'Banaketak', es: 'Repartos', en: 'Sharing out', ar: 'التوزيعات' }, description: { eu: 'Zuzenak eta alderantzizkoak.', es: 'Directos e inversos.', en: 'Direct and inverse.', ar: 'طردية وعكسية.' } },
            { progressId: 22104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Zatia, osoa eta aldakuntza.', es: 'La parte, el total y la variación.', en: 'The part, the whole and the change.', ar: 'الجزء والكل والتغيّر.' } },
            { progressId: 22105, stage: 'changes', title: { eu: 'Indizeak eta interesa', es: 'Índices e interés', en: 'Multipliers and interest', ar: 'المؤشرات والفائدة' }, description: { eu: 'Hasierakoa, kateatuak eta interesa.', es: 'La inicial, encadenados e interés.', en: 'The starting amount, chained changes and interest.', ar: 'الأصلية والمتتالية والفائدة.' } }
        ]
    },
    {
        id: 'tag',
        title: { eu: 'Etiketa', es: 'La etiqueta', en: 'The price tag', ar: 'بطاقة السعر' },
        tagline: { eu: 'Itsatsi deskontu eta igoera egokiak azken prezioa lortzeko.', es: 'Pega los descuentos y subidas justos para llegar al precio final.', en: 'Stick on the right discounts and rises to reach the final price.', ar: 'ألصق التخفيضات والزيادات المناسبة للوصول إلى السعر النهائي.' },
        skills: { eu: 'Aldakuntza-indizeak eta ehuneko kateatuak', es: 'Índices de variación y porcentajes encadenados', en: 'Change multipliers and chained percentages', ar: 'مؤشرات التغيّر والنسب المتتالية' },
        levels: [
            { progressId: 22301, stage: 'percent', title: { eu: 'Pegatina bat edo bi', es: 'Una o dos pegatinas', en: 'One or two stickers', ar: 'ملصق أو اثنان' }, description: { eu: 'Deskontuak eta igoerak: −25 %, +10 %…', es: 'Descuentos y subidas: −25 %, +10 %…', en: 'Discounts and rises: −25%, +10%…', ar: 'تخفيضات وزيادات: −25٪ و+10٪…' } },
            { progressId: 22302, stage: 'changes', title: { eu: 'Tranpa', es: 'La trampa', en: 'The trap', ar: 'الفخ' }, description: { eu: '+20 % eta −20 % ez dira ezer ez.', es: '+20 % y −20 % no se anulan.', en: '+20% and −20% do not cancel out.', ar: '+20٪ و−20٪ لا يلغي أحدهما الآخر.' } },
            { progressId: 22303, stage: 'changes', title: { eu: 'Hiru pegatina', es: 'Tres pegatinas', en: 'Three stickers', ar: 'ثلاثة ملصقات' }, description: { eu: 'BEZa ere bai: +21 %.', es: 'También el IVA: +21 %.', en: 'VAT too: +21%.', ar: 'والضريبة أيضًا: +21٪.' } }
        ]
    },
    {
        id: 'kind',
        title: { eu: 'Zuzena ala alderantzizkoa?', es: '¿Directa o inversa?', en: 'Direct or inverse?', ar: 'طردية أم عكسية؟' },
        tagline: { eu: 'Egoera edo taula bat: zuzena, alderantzizkoa ala ez bata ez bestea?', es: 'Una situación o una tabla: ¿directa, inversa o ninguna?', en: 'A situation or a table: direct, inverse or neither?', ar: 'موقف أو جدول: طردية أم عكسية أم لا هذه ولا تلك؟' },
        skills: { eu: 'Proportzionaltasun motak bereiztea', es: 'Distinguir los tipos de proporcionalidad', en: 'Telling the kinds of proportion apart', ar: 'التمييز بين أنواع التناسب' },
        levels: [
            { progressId: 22401, stage: 'proportions', title: { eu: 'Egoerak', es: 'Situaciones', en: 'Situations', ar: 'المواقف' }, description: { eu: 'Eguneroko bizitzako bikoteak.', es: 'Parejas de la vida diaria.', en: 'Pairs from everyday life.', ar: 'أزواج من الحياة اليومية.' } },
            { progressId: 22402, stage: 'proportions', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'Zatidura ala biderkadura konstantea?', es: '¿Cociente o producto constante?', en: 'Constant quotient or constant product?', ar: 'خارج قسمة ثابت أم حاصل ضرب ثابت؟' } },
            { progressId: 22403, stage: 'proportions', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Igo eta jaitsi, proportzionalak izan gabe.', es: 'Suben y bajan sin ser proporcionales.', en: 'They rise and fall without being proportional.', ar: 'تزيد وتنقص دون أن تكون متناسبة.' } }
        ]
    },
    {
        id: 'work',
        title: { eu: 'Amaitu obra', es: 'Termina la obra', en: 'Finish the job', ar: 'أنهِ العمل' },
        tagline: { eu: 'Aukeratu langileak eta orduak, obra egun horretan justu amaitzeko.', es: 'Elige obreros y horas para acabar la obra justo ese día.', en: 'Choose workers and hours to finish the job exactly on that day.', ar: 'اختر العمال والساعات لإنهاء العمل في ذلك اليوم تمامًا.' },
        skills: { eu: 'Proportzionaltasun konposatua', es: 'Proporcionalidad compuesta', en: 'Compound proportion', ar: 'التناسب المركّب' },
        levels: [
            { progressId: 22501, stage: 'compound', title: { eu: 'Langileak', es: 'Obreros', en: 'Workers', ar: 'العمال' }, description: { eu: 'Ordu berak egunean: langileak bakarrik.', es: 'Las mismas horas al día: solo los obreros.', en: 'Same hours a day: only the workers.', ar: 'الساعات نفسها يوميًا: العمال فقط.' } },
            { progressId: 22502, stage: 'compound', title: { eu: 'Beste ordutegi bat', es: 'Otro horario', en: 'Another schedule', ar: 'جدول آخر' }, description: { eu: 'Egunean beste ordu batzuk.', es: 'Otras horas al día.', en: 'Other hours a day.', ar: 'ساعات يومية أخرى.' } },
            { progressId: 22503, stage: 'compound', title: { eu: 'Zuk erabaki', es: 'Tú decides', en: 'You decide', ar: 'أنت تقرّر' }, description: { eu: 'Langileak eta orduak.', es: 'Obreros y horas.', en: 'Workers and hours.', ar: 'العمال والساعات.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Proportzioen detektibea', es: 'Detective de proporciones', en: 'Proportions detective', ar: 'مخبر التناسب' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Proportzio eta ehunekoetako akats tipikoak', es: 'Errores típicos de proporciones y porcentajes', en: 'Common mistakes with proportions and percentages', ar: 'الأخطاء الشائعة في التناسب والنسب المئوية' },
        levels: [
            { progressId: 22601, stage: 'proportions', title: { eu: 'Proportzioak', es: 'Proporciones', en: 'Proportions', ar: 'التناسبات' }, description: { eu: 'Zuzenak eta alderantzizkoak.', es: 'Directas e inversas.', en: 'Direct and inverse.', ar: 'الطردية والعكسية.' } },
            { progressId: 22602, stage: 'shares', title: { eu: 'Banaketak eta konposatua', es: 'Repartos y compuesta', en: 'Sharing and compound', ar: 'التوزيعات والمركّب' }, description: { eu: 'Banaketak eta bi magnitude.', es: 'Repartos y dos magnitudes.', en: 'Sharing out and two quantities.', ar: 'التوزيعات ومقداران.' } },
            { progressId: 22603, stage: 'changes', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Kateatuak, aldakuntza eta interesa.', es: 'Encadenados, variación e interés.', en: 'Chained changes, change and interest.', ar: 'المتتالية والتغيّر والفائدة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Ehunekoak, indizeak eta kateatuak', es: 'Porcentajes, índices y encadenados', en: 'Percentages, multipliers and chained changes', ar: 'النسب والمؤشرات والمتتالية' },
        levels: [
            { progressId: 22201, stage: 'percent', title: { eu: 'Ehunekoa eta hamartarra', es: 'Porcentaje y decimal', en: 'Percentage and decimal', ar: 'النسبة والعدد العشري' }, description: { eu: '120 % ↔ 1,2', es: '120 % ↔ 1,2', en: '120% ↔ 1.2', ar: '120٪ ↔ 1.2' } },
            { progressId: 22202, stage: 'changes', title: { eu: 'Aldakuntza-indizea', es: 'Índice de variación', en: 'Change multiplier', ar: 'مؤشر التغيّر' }, description: { eu: '−15 % ↔ · 0,85', es: '−15 % ↔ · 0,85', en: '−15% ↔ · 0.85', ar: '−15٪ ↔ · 0.85' } },
            { progressId: 22203, stage: 'changes', title: { eu: 'Indize kateatuak', es: 'Índices encadenados', en: 'Chained multipliers', ar: 'المؤشرات المتتالية' }, description: { eu: '1,1 · 0,9 ↔ 0,99', es: '1,1 · 0,9 ↔ 0,99', en: '1.1 · 0.9 ↔ 0.99', ar: '1.1 · 0.9 ↔ 0.99' } }
        ]
    }
]

export const proportionDbh2GameProgressIds: number[] = levelProgressIds(proportionDbh2Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionDbh2GameSlugs: Record<ProportionDbh2GameId, string> = { race: 'lasterketa', tag: 'etiketa', kind: 'zuzena-alderantzizkoa', work: 'obra', detective: 'detektibea', memory: 'memoria' }

export function proportionDbh2GameModeForPath(pathname: string): ProportionDbh2GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['etiketa', 'etiqueta'].includes(game)) return 'tag'
    if (['zuzena-alderantzizkoa', 'directa-inversa'].includes(game)) return 'kind'
    if (['obra'].includes(game)) return 'work'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
