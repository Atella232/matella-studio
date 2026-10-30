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
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', en: 'Proportion race', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 44101, stage: 'simple', title: { eu: 'Proportzio soila', es: 'Proporcionalidad simple', en: 'Simple proportion', ar: 'التناسب البسيط' }, description: { eu: 'Laugarren proportzionala eta alderantzizkoa.', es: 'Cuarto proporcional e inversa.', en: 'Fourth proportional and inverse.', ar: 'الرابع المتناسب والعكسي.' } },
            { progressId: 44102, stage: 'compound', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', en: 'Compound proportion and sharing', ar: 'المركّب والتوزيعات' }, description: { eu: 'Bi magnitude aldi berean eta banaketak.', es: 'Dos magnitudes a la vez y repartos.', en: 'Two quantities at once, and sharing.', ar: 'مقداران معًا والتوزيعات.' } },
            { progressId: 44103, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: 'Zatia, osoa, indizeak eta kateatuak.', es: 'La parte, el total, índices y encadenados.', en: 'The part, the whole, index numbers and chained percentages.', ar: 'الجزء والكل والمؤشرات والمتتالية.' } },
            { progressId: 44104, stage: 'interest', title: { eu: 'Interesa', es: 'Interés', en: 'Interest', ar: 'الفائدة' }, description: { eu: 'Konposatua aurrera eta atzera, bakuna hilabeteka.', es: 'Compuesto hacia delante y hacia atrás, simple por meses.', en: 'Compound, forwards and backwards; simple, by month.', ar: 'المركّبة ذهابًا وإيابًا، والبسيطة بالأشهر.' } },
            { progressId: 44105, stage: 'problems', title: { eu: 'Nahasketak, mugikariak eta txorrotak', es: 'Mezclas, móviles y grifos', en: 'Mixtures, moving objects and taps.', ar: 'الخلائط والمتحركات والصنابير' }, description: { eu: 'Prezio ertaina, topaketak eta lan bateratua.', es: 'Precio medio, encuentros y trabajo conjunto.', en: 'Average price, meetings and working together.', ar: 'السعر المتوسط والتلاقي والعمل المشترك.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Lehengo prezioa, aldiak eta interes konposatua', es: 'El precio de antes, periodos e interés compuesto', en: 'The original price, periods and compound interest.', ar: 'السعر السابق والفترات والفائدة المركّبة' },
        levels: [
            { progressId: 44201, stage: 'percent', title: { eu: 'Lehengo prezioa', es: 'El precio de antes', en: 'The original price', ar: 'السعر السابق' }, description: { eu: 'Merkatu edo garestitu aurreko prezioa: 40 : 0,8 = 50.', es: 'El precio antes de una rebaja o una subida: 40 : 0,8 = 50.', en: 'The price before a discount or an increase: 40 : 0.8 = 50.', ar: 'السعر قبل التخفيض أو الزيادة: \u206640 : 0.8 = 50\u2069.' } },
            { progressId: 44202, stage: 'interest', title: { eu: 'Aldiak', es: 'Periodos', en: 'Periods', ar: 'الفترات' }, description: { eu: 'Hilekoa, hiruhilekoa, seihilekoa: aldi bakoitzeko indizea.', es: 'Mensual, trimestral, semestral: el índice de cada periodo.', en: 'Monthly, quarterly, half-yearly: the index for each period.', ar: 'شهريًا وربع سنوي ونصف سنوي: مؤشر كل فترة.' } },
            { progressId: 44203, stage: 'interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', en: 'Compound interest', ar: 'الفائدة المركّبة' }, description: { eu: '1000 · 1,1² ↔ 1210', es: '1000 · 1,1² ↔ 1210', en: '1000 · 1.1² ↔ 1210', ar: '1000 · 1.1² ↔ 1210' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Akatsen detektibea', es: 'Detective de errores', en: 'Error detective', ar: 'محقق الأخطاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each worked solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حلّ سطر خاطئ: جده وقل ما نوع الخطأ.' },
        skills: { eu: 'Proportzioak, ehunekoak, interesa eta problemak', es: 'Proporciones, porcentajes, interés y problemas', en: 'Proportions, percentages, interest and problems.', ar: 'التناسب والنسب المئوية والفائدة والمسائل' },
        levels: [
            { progressId: 44301, stage: 'percent', title: { eu: 'Proportzioak eta ehunekoak', es: 'Proporciones y porcentajes', en: 'Proportions and percentages', ar: 'التناسب والنسب المئوية' }, description: { eu: 'Zuzena ala alderantzizkoa, ehuneko kateatuak eta atzera egitea.', es: 'Directa o inversa, porcentajes encadenados y volver atrás.', en: 'Direct or inverse, chained percentages and working backwards.', ar: 'طردي أم عكسي، والنسب المتتالية، والرجوع إلى السعر الأصلي.' } },
            { progressId: 44302, stage: 'interest', title: { eu: 'Interesa', es: 'Interés', en: 'Interest', ar: 'الفائدة' }, description: { eu: 'Hilabeteak, interes konposatua eta aldiak.', es: 'Meses, interés compuesto y periodos.', en: 'Months, compound interest and periods.', ar: 'الأشهر والفائدة المركّبة والفترات.' } },
            { progressId: 44303, stage: 'problems', title: { eu: 'Nahasketak, txorrotak eta mugikariak', es: 'Mezclas, grifos y móviles', en: 'Mixtures, taps and moving objects.', ar: 'الخلائط والصنابير والمتحركات' }, description: { eu: 'Prezio ertaina, lan bateratua eta abiadurak.', es: 'Precio medio, trabajo conjunto y velocidades.', en: 'Average price, working together and speeds.', ar: 'السعر المتوسط والعمل المشترك والسرعات.' } }
        ]
    },
    {
        id: 'bank',
        title: { eu: 'Bankua', es: 'El banco', en: 'The bank', ar: 'المصرف' },
        tagline: { eu: 'Aukeratu diru gehien ematen dizun eskaintza; gero, barrek erakusten dute zenbat ematen duen bakoitzak.', es: 'Elige la oferta que más dinero te da; después, unas barras muestran lo que da cada una.', en: 'Choose the offer that gives you the most money; then bars show what each one gives.', ar: 'اختر العرض الذي يعطيك مالًا أكثر؛ ثم تُظهر الأشرطة ما يعطيه كل عرض.' },
        skills: { eu: 'Interes bakuna eta konposatua, tasak eta aldiak', es: 'Interés simple y compuesto, tipos y periodos', en: 'Simple and compound interest, rates and periods.', ar: 'الفائدة البسيطة والمركّبة والأسعار والفترات' },
        levels: [
            { progressId: 44401, stage: 'interest', title: { eu: 'Bakuna ala konposatua', es: 'Simple o compuesto', en: 'Simple or compound', ar: 'بسيطة أم مركّبة' }, description: { eu: 'Bi eskaintza: tasak eta urteak.', es: 'Dos ofertas: el tipo y los años.', en: 'Two offers: the rate and the years.', ar: 'عرضان: السعر والسنوات.' } },
            { progressId: 44402, stage: 'interest', title: { eu: 'Noiz ordaintzen den', es: 'Cada cuánto se paga', en: 'How often it is paid', ar: 'متى تُضاف الفوائد' }, description: { eu: 'Hilero, hiru hilean behin, sei hilean behin edo urtean behin.', es: 'Cada mes, trimestre, semestre o año.', en: 'Every month, quarter, half-year or year.', ar: 'كل شهر أو ثلاثة أشهر أو ستة أشهر أو سنة.' } },
            { progressId: 44403, stage: 'interest', title: { eu: 'Hiru eskaintza', es: 'Tres ofertas', en: 'Three offers', ar: 'ثلاثة عروض' }, description: { eu: 'Denetarik: bakuna, konposatua eta aldiak.', es: 'De todo: simple, compuesto y periodos.', en: 'A bit of everything: simple, compound and periods.', ar: 'من كل نوع: بسيطة ومركّبة وفترات.' } }
        ]
    },
    {
        id: 'road',
        title: { eu: 'Errepideko topaketa', es: 'Encuentro en la carretera', en: 'Meeting on the road', ar: 'لقاء على الطريق' },
        tagline: { eu: 'Jarri bandera bi ibilgailuak elkartuko diren lekuan, eta ikusi bidaia.', es: 'Pon la bandera donde se encontrarán los dos vehículos y mira el viaje.', en: 'Place the flag where the two vehicles will meet and watch the journey.', ar: 'ضع الراية حيث ستلتقي المركبتان، وشاهد الرحلة.' },
        skills: { eu: 'Topaketak, jazarpenak eta irteera berantiarrak', es: 'Encuentros, persecuciones y salidas tardías', en: 'Meetings, chases and late departures.', ar: 'التلاقي والمطاردة والانطلاق المتأخر' },
        levels: [
            { progressId: 44501, stage: 'problems', title: { eu: 'Elkarrengana', es: 'Al encuentro', en: 'Towards each other', ar: 'التلاقي' }, description: { eu: 'Aldi berean abiatzen dira, bata bestearengana.', es: 'Salen a la vez, uno hacia el otro.', en: 'They start at the same time, towards each other.', ar: 'تنطلقان معًا، كلٌّ نحو الأخرى.' } },
            { progressId: 44502, stage: 'problems', title: { eu: 'Atzetik', es: 'Persecución', en: 'Chase', ar: 'المطاردة' }, description: { eu: 'Azkarrena atzetik doa eta bestea harrapatzen du.', es: 'El más rápido va detrás y alcanza al otro.', en: 'The faster one follows and catches up with the other.', ar: 'الأسرع في الخلف ويلحق بالأخرى.' } },
            { progressId: 44503, stage: 'problems', title: { eu: 'Bata geroago abiatzen da', es: 'Uno sale más tarde', en: 'One starts later', ar: 'إحداهما تنطلق متأخرة' }, description: { eu: 'Lehenik bakarrik doa; gero, biak batera.', es: 'Primero va uno solo; después, los dos.', en: 'At first only one moves; then both.', ar: 'تسير واحدة وحدها أولًا، ثم الاثنتان.' } }
        ]
    },
    {
        id: 'tank',
        title: { eu: 'Bete biltegia', es: 'Llena el depósito', en: 'Fill the tank', ar: 'املأ الخزان' },
        tagline: { eu: 'Aukeratu zein txorrota ireki biltegia denbora zehatzean betetzeko.', es: 'Elige qué grifos abrir para llenar el depósito en el tiempo exacto.', en: 'Choose which taps to open to fill the tank in exactly the right time.', ar: 'اختر الصنابير التي تفتحها لتملأ الخزان في الوقت المحدد تمامًا.' },
        skills: { eu: 'Lan bateratua: ordu bateko zatiak batu eta kendu', es: 'Trabajo conjunto: sumar y restar partes de una hora', en: 'Working together: add and subtract parts of an hour.', ar: 'العمل المشترك: جمع أجزاء الساعة وطرحها' },
        levels: [
            { progressId: 44601, stage: 'problems', title: { eu: 'Hiru txorrota', es: 'Tres grifos', en: 'Three taps', ar: 'ثلاثة صنابير' }, description: { eu: 'Bi ireki behar dira.', es: 'Hay que abrir dos.', en: 'You need to open two.', ar: 'يجب فتح اثنين.' } },
            { progressId: 44602, stage: 'problems', title: { eu: 'Lau txorrota', es: 'Cuatro grifos', en: 'Four taps', ar: 'أربعة صنابير' }, description: { eu: 'Bi edo hiru ireki behar dira.', es: 'Hay que abrir dos o tres.', en: 'You need to open two or three.', ar: 'يجب فتح اثنين أو ثلاثة.' } },
            { progressId: 44603, stage: 'problems', title: { eu: 'Hustubidearekin', es: 'Con desagüe', en: 'With drain', ar: 'مع المصرف' }, description: { eu: 'Hustubidea ireki ala ez?', es: '¿Abrir el desagüe o no?', en: 'Open the drain or not?', ar: 'هل تفتح المصرف أم لا؟' } }
        ]
    },
    {
        id: 'mix',
        title: { eu: 'Nahasketa perfektua', es: 'Mezcla perfecta', en: 'Perfect mixture', ar: 'الخليط المثالي' },
        tagline: { eu: 'Aukeratu produktu bakoitzetik zenbat jarri, eskatutako prezioa lortzeko; balantzak esango dizu ondo dagoen.', es: 'Elige cuánto poner de cada producto para conseguir el precio pedido; el balancín te dirá si está bien.', en: 'Choose how much of each product to add to get the price asked for; the balance will tell you if it is right.', ar: 'اختر كم تضع من كل منتج لتحصل على السعر المطلوب؛ وسيخبرك الميزان إن كان صحيحًا.' },
        skills: { eu: 'Nahasketak eta aleazioak: prezio ertaina eta balantza', es: 'Mezclas y aleaciones: precio medio y balancín', en: 'Mixtures and alloys: average price and balance', ar: 'الخلائط والسبائك: السعر المتوسط والميزان' },
        levels: [
            { progressId: 44701, stage: 'problems', title: { eu: 'Guztira finko', es: 'Total fijo', en: 'Fixed total', ar: 'المجموع ثابت' }, description: { eu: 'Banatu kiloak bi produkturen artean.', es: 'Reparte los kilos entre los dos productos.', en: 'Share the kilos between the two products.', ar: 'وزّع الكيلوغرامات بين المنتجين.' } },
            { progressId: 44702, stage: 'problems', title: { eu: 'Gehitu', es: 'Añadir', en: 'Add', ar: 'الإضافة' }, description: { eu: 'Produktu bat badago: zenbat gehitu bestetik?', es: 'Ya hay un producto: ¿cuánto añades del otro?', en: 'One product is already there: how much of the other do you add?', ar: 'يوجد منتج: كم تضيف من الآخر؟' } },
            { progressId: 44703, stage: 'problems', title: { eu: 'Urrea', es: 'Oro', en: 'Gold', ar: 'الذهب' }, description: { eu: 'Urre-aleazioak, gramotan.', es: 'Aleaciones de oro, en gramos.', en: 'Gold alloys, in grams.', ar: 'سبائك الذهب بالغرامات.' } }
        ]
    },
    {
        id: 'till',
        title: { eu: 'Dendako kutxa', es: 'La caja de la tienda', en: 'The shop till', ar: 'صندوق المتجر' },
        tagline: { eu: 'Bezeroak zain daude: kobratu prezio zuzena, pazientzia agortu baino lehen.', es: 'Los clientes esperan: cobra el precio justo antes de que se les acabe la paciencia.', en: 'Customers are waiting: charge the exact price before they run out of patience.', ar: 'الزبائن ينتظرون: احسب السعر الصحيح قبل أن ينفد صبرهم.' },
        skills: { eu: 'Deskontuak eta BEZa, aurrera eta atzera', es: 'Descuentos e IVA, hacia delante y hacia atrás', en: 'Discounts and VAT, forwards and backwards', ar: 'الخصومات والضريبة ذهابًا وإيابًا' },
        levels: [
            { progressId: 44801, stage: 'percent', title: { eu: 'Azken prezioa', es: 'Precio final', en: 'Final price', ar: 'السعر النهائي' }, description: { eu: 'Deskontu bat kendu edo BEZa gehitu.', es: 'Restar un descuento o sumar el IVA.', en: 'Subtract a discount or add VAT.', ar: 'طرح خصم أو إضافة الضريبة.' } },
            { progressId: 44802, stage: 'percent', title: { eu: 'Lehengo prezioa', es: 'Precio original', en: 'Original price', ar: 'السعر الأصلي' }, description: { eu: 'Atzera: merkatu aurretik edo BEZik gabe.', es: 'Hacia atrás: antes de la rebaja o sin IVA.', en: 'Backwards: before the discount or without VAT.', ar: 'إلى الخلف: قبل التخفيض أو دون ضريبة.' } },
            { progressId: 44803, stage: 'percent', title: { eu: 'Kateatuak', es: 'Encadenados', en: 'Chained', ar: 'المتتالية' }, description: { eu: 'Bi aldaketa jarraian, aurrera eta atzera.', es: 'Dos cambios seguidos, hacia delante y hacia atrás.', en: 'Two changes in a row, forwards and backwards.', ar: 'تغيّران متتاليان ذهابًا وإيابًا.' } }
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
