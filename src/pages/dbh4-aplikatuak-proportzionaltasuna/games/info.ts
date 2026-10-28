import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type ProportionDbh4ApGameId = 'race' | 'memory' | 'detective' | 'bank' | 'road' | 'tank' | 'mix' | 'till'

export const PROPORTION_DBH4AP_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh4ap-game-records'

export const proportionDbh4ApGames: GameInfo<ProportionDbh4ApGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 44101, stage: 'simple', title: { eu: 'Proportzio soila', es: 'Proporcionalidad simple', ar: 'التناسب البسيط' }, description: { eu: 'Laugarren proportzionala eta alderantzizkoa.', es: 'Cuarto proporcional e inversa.', ar: 'الرابع المتناسب والعكسي.' } },
            { progressId: 44102, stage: 'compound', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', ar: 'المركّب والتوزيعات' }, description: { eu: 'Bi magnitude aldi berean eta banaketak.', es: 'Dos magnitudes a la vez y repartos.', ar: 'مقداران معًا والتوزيعات.' } },
            { progressId: 44103, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' }, description: { eu: 'Zatia, osoa, indizeak eta kateatuak.', es: 'La parte, el total, índices y encadenados.', ar: 'الجزء والكل والمؤشرات والمتتالية.' } },
            { progressId: 44104, stage: 'interest', title: { eu: 'Interesa', es: 'Interés', ar: 'الفائدة' }, description: { eu: 'Konposatua aurrera eta atzera, bakuna hilabeteka.', es: 'Compuesto hacia delante y hacia atrás, simple por meses.', ar: 'المركّبة ذهابًا وإيابًا، والبسيطة بالأشهر.' } },
            { progressId: 44105, stage: 'problems', title: { eu: 'Nahasketak, mugikariak eta txorrotak', es: 'Mezclas, móviles y grifos', ar: 'الخلائط والمتحركات والصنابير' }, description: { eu: 'Prezio ertaina, topaketak eta lan bateratua.', es: 'Precio medio, encuentros y trabajo conjunto.', ar: 'السعر المتوسط والتلاقي والعمل المشترك.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Indizeak, kateatuak eta interes konposatua', es: 'Índices, encadenados e interés compuesto', ar: 'المؤشرات والمتتالية والفائدة المركّبة' },
        levels: [
            { progressId: 44201, stage: 'percent', title: { eu: 'Aldakuntza-indizea', es: 'Índice de variación', ar: 'مؤشر التغيّر' }, description: { eu: '−15 % ↔ · 0,85', es: '−15 % ↔ · 0,85', ar: '−15٪ ↔ · 0.85' } },
            { progressId: 44202, stage: 'percent', title: { eu: 'Indize kateatuak', es: 'Índices encadenados', ar: 'المؤشرات المتتالية' }, description: { eu: '1,1 · 0,9 ↔ 0,99', es: '1,1 · 0,9 ↔ 0,99', ar: '1.1 · 0.9 ↔ 0.99' } },
            { progressId: 44203, stage: 'interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', ar: 'الفائدة المركّبة' }, description: { eu: '1000 · 1,1² ↔ 1210', es: '1000 · 1,1² ↔ 1210', ar: '1000 · 1.1² ↔ 1210' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Akatsen detektibea', es: 'Detective de errores', ar: 'محقق الأخطاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', ar: 'في كل حلّ سطر خاطئ: جده وقل ما نوع الخطأ.' },
        skills: { eu: 'Proportzioak, ehunekoak, interesa eta problemak', es: 'Proporciones, porcentajes, interés y problemas', ar: 'التناسب والنسب المئوية والفائدة والمسائل' },
        levels: [
            { progressId: 44301, stage: 'percent', title: { eu: 'Proportzioak eta ehunekoak', es: 'Proporciones y porcentajes', ar: 'التناسب والنسب المئوية' }, description: { eu: 'Zuzena ala alderantzizkoa, ehuneko kateatuak eta atzera egitea.', es: 'Directa o inversa, porcentajes encadenados y volver atrás.', ar: 'طردي أم عكسي، والنسب المتتالية، والرجوع إلى السعر الأصلي.' } },
            { progressId: 44302, stage: 'interest', title: { eu: 'Interesa', es: 'Interés', ar: 'الفائدة' }, description: { eu: 'Hilabeteak, interes konposatua eta aldiak.', es: 'Meses, interés compuesto y periodos.', ar: 'الأشهر والفائدة المركّبة والفترات.' } },
            { progressId: 44303, stage: 'problems', title: { eu: 'Nahasketak, txorrotak eta mugikariak', es: 'Mezclas, grifos y móviles', ar: 'الخلائط والصنابير والمتحركات' }, description: { eu: 'Prezio ertaina, lan bateratua eta abiadurak.', es: 'Precio medio, trabajo conjunto y velocidades.', ar: 'السعر المتوسط والعمل المشترك والسرعات.' } }
        ]
    },
    {
        id: 'bank',
        title: { eu: 'Bankua', es: 'El banco', ar: 'المصرف' },
        tagline: { eu: 'Aukeratu diru gehien ematen dizun eskaintza; gero, barrek erakusten dute zenbat ematen duen bakoitzak.', es: 'Elige la oferta que más dinero te da; después, unas barras muestran lo que da cada una.', ar: 'اختر العرض الذي يعطيك مالًا أكثر؛ ثم تُظهر الأشرطة ما يعطيه كل عرض.' },
        skills: { eu: 'Interes bakuna eta konposatua, tasak eta aldiak', es: 'Interés simple y compuesto, tipos y periodos', ar: 'الفائدة البسيطة والمركّبة والأسعار والفترات' },
        levels: [
            { progressId: 44401, stage: 'interest', title: { eu: 'Bakuna ala konposatua', es: 'Simple o compuesto', ar: 'بسيطة أم مركّبة' }, description: { eu: 'Bi eskaintza: tasak eta urteak.', es: 'Dos ofertas: el tipo y los años.', ar: 'عرضان: السعر والسنوات.' } },
            { progressId: 44402, stage: 'interest', title: { eu: 'Noiz ordaintzen den', es: 'Cada cuánto se paga', ar: 'متى تُضاف الفوائد' }, description: { eu: 'Hilero, hiru hilean behin, sei hilean behin edo urtean behin.', es: 'Cada mes, trimestre, semestre o año.', ar: 'كل شهر أو ثلاثة أشهر أو ستة أشهر أو سنة.' } },
            { progressId: 44403, stage: 'interest', title: { eu: 'Hiru eskaintza', es: 'Tres ofertas', ar: 'ثلاثة عروض' }, description: { eu: 'Denetarik: bakuna, konposatua eta aldiak.', es: 'De todo: simple, compuesto y periodos.', ar: 'من كل نوع: بسيطة ومركّبة وفترات.' } }
        ]
    },
    {
        id: 'road',
        title: { eu: 'Errepideko topaketa', es: 'Encuentro en la carretera', ar: 'لقاء على الطريق' },
        tagline: { eu: 'Jarri bandera bi ibilgailuak elkartuko diren lekuan, eta ikusi bidaia.', es: 'Pon la bandera donde se encontrarán los dos vehículos y mira el viaje.', ar: 'ضع الراية حيث ستلتقي المركبتان، وشاهد الرحلة.' },
        skills: { eu: 'Topaketak, jazarpenak eta irteera berantiarrak', es: 'Encuentros, persecuciones y salidas tardías', ar: 'التلاقي والمطاردة والانطلاق المتأخر' },
        levels: [
            { progressId: 44501, stage: 'problems', title: { eu: 'Elkarrengana', es: 'Al encuentro', ar: 'التلاقي' }, description: { eu: 'Aldi berean abiatzen dira, bata bestearengana.', es: 'Salen a la vez, uno hacia el otro.', ar: 'تنطلقان معًا، كلٌّ نحو الأخرى.' } },
            { progressId: 44502, stage: 'problems', title: { eu: 'Atzetik', es: 'Persecución', ar: 'المطاردة' }, description: { eu: 'Azkarrena atzetik doa eta bestea harrapatzen du.', es: 'El más rápido va detrás y alcanza al otro.', ar: 'الأسرع في الخلف ويلحق بالأخرى.' } },
            { progressId: 44503, stage: 'problems', title: { eu: 'Bata geroago abiatzen da', es: 'Uno sale más tarde', ar: 'إحداهما تنطلق متأخرة' }, description: { eu: 'Lehenik bakarrik doa; gero, biak batera.', es: 'Primero va uno solo; después, los dos.', ar: 'تسير واحدة وحدها أولًا، ثم الاثنتان.' } }
        ]
    },
    {
        id: 'tank',
        title: { eu: 'Bete biltegia', es: 'Llena el depósito', ar: 'املأ الخزان' },
        tagline: { eu: 'Aukeratu zein txorrota ireki biltegia denbora zehatzean betetzeko.', es: 'Elige qué grifos abrir para llenar el depósito en el tiempo exacto.', ar: 'اختر الصنابير التي تفتحها لتملأ الخزان في الوقت المحدد تمامًا.' },
        skills: { eu: 'Lan bateratua: ordu bateko zatiak batu eta kendu', es: 'Trabajo conjunto: sumar y restar partes de una hora', ar: 'العمل المشترك: جمع أجزاء الساعة وطرحها' },
        levels: [
            { progressId: 44601, stage: 'problems', title: { eu: 'Hiru txorrota', es: 'Tres grifos', ar: 'ثلاثة صنابير' }, description: { eu: 'Bi ireki behar dira.', es: 'Hay que abrir dos.', ar: 'يجب فتح اثنين.' } },
            { progressId: 44602, stage: 'problems', title: { eu: 'Lau txorrota', es: 'Cuatro grifos', ar: 'أربعة صنابير' }, description: { eu: 'Bi edo hiru ireki behar dira.', es: 'Hay que abrir dos o tres.', ar: 'يجب فتح اثنين أو ثلاثة.' } },
            { progressId: 44603, stage: 'problems', title: { eu: 'Hustubidearekin', es: 'Con desagüe', ar: 'مع المصرف' }, description: { eu: 'Hustubidea ireki ala ez?', es: '¿Abrir el desagüe o no?', ar: 'هل تفتح المصرف أم لا؟' } }
        ]
    },
    {
        id: 'mix',
        title: { eu: 'Nahasketa perfektua', es: 'Mezcla perfecta', ar: 'الخليط المثالي' },
        tagline: { eu: 'Aukeratu produktu bakoitzetik zenbat jarri, eskatutako prezioa lortzeko; balantzak esango dizu ondo dagoen.', es: 'Elige cuánto poner de cada producto para conseguir el precio pedido; el balancín te dirá si está bien.', ar: 'اختر كم تضع من كل منتج لتحصل على السعر المطلوب؛ وسيخبرك الميزان إن كان صحيحًا.' },
        skills: { eu: 'Nahasketak eta aleazioak: prezio ertaina eta balantza', es: 'Mezclas y aleaciones: precio medio y balancín', ar: 'الخلائط والسبائك: السعر المتوسط والميزان' },
        levels: [
            { progressId: 44701, stage: 'problems', title: { eu: 'Guztira finko', es: 'Total fijo', ar: 'المجموع ثابت' }, description: { eu: 'Banatu kiloak bi produkturen artean.', es: 'Reparte los kilos entre los dos productos.', ar: 'وزّع الكيلوغرامات بين المنتجين.' } },
            { progressId: 44702, stage: 'problems', title: { eu: 'Gehitu', es: 'Añadir', ar: 'الإضافة' }, description: { eu: 'Produktu bat badago: zenbat gehitu bestetik?', es: 'Ya hay un producto: ¿cuánto añades del otro?', ar: 'يوجد منتج: كم تضيف من الآخر؟' } },
            { progressId: 44703, stage: 'problems', title: { eu: 'Urrea', es: 'Oro', ar: 'الذهب' }, description: { eu: 'Urre-aleazioak, gramotan.', es: 'Aleaciones de oro, en gramos.', ar: 'سبائك الذهب بالغرامات.' } }
        ]
    },
    {
        id: 'till',
        title: { eu: 'Dendako kutxa', es: 'La caja de la tienda', ar: 'صندوق المتجر' },
        tagline: { eu: 'Bezeroak zain daude: kobratu prezio zuzena, pazientzia agortu baino lehen.', es: 'Los clientes esperan: cobra el precio justo antes de que se les acabe la paciencia.', ar: 'الزبائن ينتظرون: احسب السعر الصحيح قبل أن ينفد صبرهم.' },
        skills: { eu: 'Deskontuak eta BEZa, aurrera eta atzera', es: 'Descuentos e IVA, hacia delante y hacia atrás', ar: 'الخصومات والضريبة ذهابًا وإيابًا' },
        levels: [
            { progressId: 44801, stage: 'percent', title: { eu: 'Azken prezioa', es: 'Precio final', ar: 'السعر النهائي' }, description: { eu: 'Deskontu bat kendu edo BEZa gehitu.', es: 'Restar un descuento o sumar el IVA.', ar: 'طرح خصم أو إضافة الضريبة.' } },
            { progressId: 44802, stage: 'percent', title: { eu: 'Lehengo prezioa', es: 'Precio original', ar: 'السعر الأصلي' }, description: { eu: 'Atzera: merkatu aurretik edo BEZik gabe.', es: 'Hacia atrás: antes de la rebaja o sin IVA.', ar: 'إلى الخلف: قبل التخفيض أو دون ضريبة.' } },
            { progressId: 44803, stage: 'percent', title: { eu: 'Kateatuak', es: 'Encadenados', ar: 'المتتالية' }, description: { eu: 'Bi aldaketa jarraian, aurrera eta atzera.', es: 'Dos cambios seguidos, hacia delante y hacia atrás.', ar: 'تغيّران متتاليان ذهابًا وإيابًا.' } }
        ]
    }
]

export const proportionDbh4ApGameProgressIds: number[] = levelProgressIds(proportionDbh4ApGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionDbh4ApGameSlugs: Record<ProportionDbh4ApGameId, string> = { race: 'lasterketa', memory: 'memoria', detective: 'detektibea', bank: 'bankua', road: 'errepidea', tank: 'biltegia', mix: 'nahasketa', till: 'kutxa' }

export function proportionDbh4ApGameModeForPath(pathname: string): ProportionDbh4ApGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['bankua', 'banco'].includes(game)) return 'bank'
    if (['errepidea', 'carretera'].includes(game)) return 'road'
    if (['biltegia', 'deposito'].includes(game)) return 'tank'
    if (['nahasketa', 'mezcla'].includes(game)) return 'mix'
    if (['kutxa', 'caja'].includes(game)) return 'till'
    return 'hub'
}
