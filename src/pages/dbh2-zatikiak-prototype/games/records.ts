import type { FractionStageId, LocalizedText } from '../content.ts'
import { levelProgressIds, type GameInfo as UnitGameInfo, type GameLevelInfo as UnitGameLevelInfo } from '../../../features/unit-v2/games/records.ts'

export { gameStars, mergeRecord, parseRecords, recordKey, type GameRecords, type LevelRecord, type Stars } from '../../../features/unit-v2/games/records.ts'

export type GameId = 'race' | 'memory' | 'target' | 'wall' | 'exact' | 'detective' | 'sales' | 'balance' | 'pyramid' | 'train'

export interface GameLevelInfo extends UnitGameLevelInfo {
    stage: FractionStageId
    title: LocalizedText
}

export interface GameInfo extends UnitGameInfo<GameId> {
    levels: GameLevelInfo[]
}

export const GAME_RECORDS_KEY = 'matella-zatikiak-v2-game-records'

export const games: GameInfo[] = [
    {
        id: 'race',
        title: { eu: 'Zatikien lasterketa', es: 'Carrera de fracciones', en: 'Fraction race', ar: 'سباق الكسور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Sei zirkuitu, etapa bakoitzeko bat', es: 'Seis circuitos, uno por etapa', en: 'Six circuits, one per stage', ar: 'ست حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 601, stage: 'equivalence', title: { eu: 'Baliokideak', es: 'Equivalentes', en: 'Equivalent', ar: 'المتكافئة' }, description: { eu: 'Sinplifikatu eta osatu zatiki baliokideak.', es: 'Simplifica y completa fracciones equivalentes.', en: 'Simplify and complete equivalent fractions.', ar: 'بسّط الكسور المتكافئة وأكملها.' } },
            { progressId: 602, stage: 'ordering', title: { eu: 'Konparatu', es: 'Comparar', en: 'Compare', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa aurkitu.', es: 'Encuentra la mayor, la menor y la intermedia.', en: 'Find the largest, the smallest and the one in between.', ar: 'جد الأكبر والأصغر والوسيط.' } },
            { progressId: 603, stage: 'operations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', en: 'Add and subtract', ar: 'الجمع والطرح' }, description: { eu: 'Izendatzaile komuna eta zeinuak.', es: 'Denominador común y signos.', en: 'Common denominator and signs', ar: 'المقام المشترك والإشارات.' } },
            { progressId: 604, stage: 'operations', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', en: 'Multiply and divide', ar: 'الضرب والقسمة' }, description: { eu: 'Biderkatu zuzenean, zatitzeko alderantzikatu.', es: 'Multiplica en línea, invierte para dividir.', en: 'Multiply straight across; invert to divide.', ar: 'اضرب مباشرة واقلب للقسمة.' } },
            { progressId: 605, stage: 'operations', title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', en: 'Combined operations', ar: 'العمليات المركبة' }, description: { eu: 'Hierarkia, parentesiak eta berreturak.', es: 'Jerarquía, paréntesis y potencias.', en: 'Order of operations, brackets and powers', ar: 'الأولوية والأقواس والقوى.' } },
            { progressId: 606, stage: 'proportionality', title: { eu: 'Ehunekoak eta kantitateak', es: 'Porcentajes y cantidades', en: 'Percentages and quantities', ar: 'النسب المئوية والكميات' }, description: { eu: 'Zatiki baten zatia, ehunekoak eta osoa.', es: 'Fracción de una cantidad, porcentajes y el total.', en: 'Fraction of a quantity, percentages and the total', ar: 'كسر من كمية والنسب المئوية والكل.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', en: 'Target', ar: 'الهدف' },
        tagline: { eu: 'Jaurti zatikia zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza la fracción a la recta. Cuanto más cerca, más puntos.', en: 'Throw the fraction onto the number line. The closer, the more points.', ar: 'ارمِ الكسر على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Estimazioa eta ordena', es: 'Estimación y orden', en: 'Estimation and order', ar: 'التقدير والترتيب' },
        levels: [
            { progressId: 801, stage: 'meaning', title: { eu: '0 eta 1 artean', es: 'Entre 0 y 1', en: 'Between 0 and 1', ar: 'بين 0 و1' }, description: { eu: 'Zatiki propioak, marka gabeko zuzen batean.', es: 'Fracciones propias en una recta sin marcas.', en: 'Proper fractions on a number line with no marks.', ar: 'كسور عادية على خط بلا علامات.' } },
            { progressId: 802, stage: 'ordering', title: { eu: '0tik 3ra', es: 'De 0 a 3', en: 'From 0 to 3', ar: 'من 0 إلى 3' }, description: { eu: 'Zatiki inpropioak, zenbaki mistoak eta hamartarrak.', es: 'Impropias, números mixtos y decimales.', en: 'Improper fractions, mixed numbers and decimals', ar: 'كسور غير عادية وأعداد كسرية وعشرية.' } },
            { progressId: 803, stage: 'ordering', title: { eu: '−2tik 2ra', es: 'De −2 a 2', en: 'From −2 to 2', ar: 'من −2 إلى 2' }, description: { eu: 'Zatiki negatiboak ere bai.', es: 'También fracciones negativas.', en: 'Negative fractions as well', ar: 'والكسور السالبة أيضًا.' } }
        ]
    },
    {
        id: 'wall',
        title: { eu: 'Zatiki-horma', es: 'Muro de fracciones', en: 'Fraction wall', ar: 'جدار الكسور' },
        tagline: { eu: 'Kokatu adreiluak eta osatu zehazki unitate bat balio duten ilarak.', es: 'Coloca los ladrillos y completa filas que valgan exactamente una unidad.', en: 'Place the bricks and complete rows that are worth exactly one whole.', ar: 'ضع الطوب وأكمل صفوفًا تساوي وحدة واحدة تمامًا.' },
        skills: { eu: 'Batuketak eta baliokidetasuna', es: 'Sumas y equivalencia', en: 'Sums and equivalence', ar: 'الجمع والتكافؤ' },
        levels: [
            { progressId: 901, stage: 'equivalence', title: { eu: 'Erdiak eta laurdenak', es: 'Medios y cuartos', en: 'Halves and quarters', ar: 'الأنصاف والأرباع' }, description: { eu: '1/2, 1/4 eta 1/8 adreiluak.', es: 'Ladrillos de 1/2, 1/4 y 1/8.', en: 'Bricks of 1/2, 1/4 and 1/8.', ar: 'طوب 1/2 و1/4 و1/8.' } },
            { progressId: 902, stage: 'equivalence', title: { eu: 'Herenak eta seirenak', es: 'Tercios y sextos', en: 'Thirds and sixths', ar: 'الأثلاث والأسداس' }, description: { eu: '1/2, 1/3, 1/4, 1/6 eta 1/12 nahasita.', es: 'Mezcla de 1/2, 1/3, 1/4, 1/6 y 1/12.', en: 'Mix of 1/2, 1/3, 1/4, 1/6 and 1/12.', ar: 'مزيج من 1/2 و1/3 و1/4 و1/6 و1/12.' } },
            { progressId: 903, stage: 'operations', title: { eu: 'Adreilu handiak', es: 'Ladrillos grandes', en: 'Large bricks', ar: 'طوب كبير' }, description: { eu: '2/3, 3/4, 5/12, 3/10… ere agertzen dira.', es: 'También aparecen 2/3, 3/4, 5/12, 3/10…', en: '2/3, 3/4, 5/12, 3/10… also appear.', ar: 'تظهر أيضًا 2/3 و3/4 و5/12 و3/10…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera modu desberdinetan idazten duten kartak.', es: 'Encuentra las cartas que escriben el mismo valor de formas distintas.', en: 'Find the cards that write the same value in different ways.', ar: 'جد البطاقات التي تكتب القيمة نفسها بطرق مختلفة.' },
        skills: { eu: 'Adierazpenak: zatikia, hamartarra, %', es: 'Representaciones: fracción, decimal, %', en: 'Representations: fraction, decimal, %', ar: 'التمثيلات: كسر، عشري، %' },
        levels: [
            { progressId: 701, stage: 'meaning', title: { eu: 'Bikoteak', es: 'Parejas', en: 'Pairs', ar: 'أزواج' }, description: { eu: '6 bikote: zatikiak, marrazkiak eta hamartarrak.', es: '6 parejas: fracciones, dibujos y decimales.', en: '6 pairs: fractions, drawings and decimals.', ar: '6 أزواج: كسور ورسوم وأعداد عشرية.' } },
            { progressId: 702, stage: 'equivalence', title: { eu: 'Adierazpen gehiago', es: 'Más representaciones', en: 'More representations', ar: 'تمثيلات أكثر' }, description: { eu: '8 bikote: ehunekoak, mistoak eta zuzena.', es: '8 parejas: porcentajes, mixtos y la recta.', en: '8 pairs: percentages, mixed numbers and the number line', ar: '8 أزواج: نسب مئوية وأعداد كسرية وخط الأعداد.' } },
            { progressId: 703, stage: 'proportionality', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zatikia, hamartarra eta ehunekoa.', es: '6 tríos: fracción, decimal y porcentaje.', en: '6 trios: fraction, decimal and percentage', ar: '6 ثلاثيات: كسر وعدد عشري ونسبة مئوية.' } }
        ]
    },
    {
        id: 'exact',
        title: { eu: 'Helburu zehatza', es: 'Objetivo exacto', en: 'Exact target', ar: 'الهدف الدقيق' },
        tagline: { eu: 'Konbinatu kartak lau eragiketekin eta iritsi zehazki helburura.', es: 'Combina las cartas con las cuatro operaciones y llega exactamente al objetivo.', en: 'Combine the cards with the four operations and reach the target exactly.', ar: 'اجمع البطاقات بالعمليات الأربع وصِل إلى الهدف تمامًا.' },
        skills: { eu: 'Estrategia eta eragiketak', es: 'Estrategia y operaciones', en: 'Strategy and operations', ar: 'الاستراتيجية والعمليات' },
        levels: [
            { progressId: 1001, stage: 'operations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', en: 'Add and subtract', ar: 'الجمع والطرح' }, description: { eu: 'Lau karta, + eta − bakarrik.', es: 'Cuatro cartas, solo + y −.', en: 'Four cards, only + and −.', ar: 'أربع بطاقات، + و− فقط.' } },
            { progressId: 1002, stage: 'operations', title: { eu: 'Lau eragiketak', es: 'Las cuatro operaciones', en: 'The four operations', ar: 'العمليات الأربع' }, description: { eu: 'Lau karta eta + − · ÷.', es: 'Cuatro cartas y + − · ÷.', en: 'Four cards and + − · ÷.', ar: 'أربع بطاقات و+ − · ÷.' } },
            { progressId: 1003, stage: 'operations', title: { eu: 'Helburu handia', es: 'Gran objetivo', en: 'Big target', ar: 'الهدف الكبير' }, description: { eu: 'Bost karta: hiru edo lau erabili beharko dituzu.', es: 'Cinco cartas: tendrás que usar tres o cuatro.', en: 'Five cards: you will have to use three or four.', ar: 'خمس بطاقات: ستحتاج إلى ثلاث منها أو أربع.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Akatsen detektibea', es: 'Detective de errores', en: 'Error detective', ar: 'محقّق الأخطاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago. Aurkitu eta esan zein akats den.', es: 'En cada resolución hay una línea mal. Encuéntrala y di qué error es.', en: 'In each solution, one line is wrong. Find it and say what the mistake is.', ar: 'في كل حلّ سطر خاطئ. جِده وقل ما نوع الخطأ.' },
        skills: { eu: 'Ohiko akatsak', es: 'Errores típicos', en: 'Common mistakes', ar: 'الأخطاء الشائعة' },
        levels: [
            { progressId: 1101, stage: 'operations', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' }, description: { eu: 'Izendatzaile komuna, zeinuak eta sinplifikazioa.', es: 'Denominador común, signos y simplificación.', en: 'Common denominator, signs and simplification.', ar: 'المقام المشترك والإشارات والاختزال.' } },
            { progressId: 1102, stage: 'operations', title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', en: 'Multiplying and dividing', ar: 'الضرب والقسمة' }, description: { eu: 'Zuzenean biderkatu eta zatitzeko alderantzikatu.', es: 'Multiplicar en línea e invertir para dividir.', en: 'Multiply straight across and invert to divide.', ar: 'الضرب المباشر والقلب للقسمة.' } },
            { progressId: 1103, stage: 'operations', title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', en: 'Combined operations', ar: 'العمليات المركبة' }, description: { eu: 'Hierarkia eta berreturak.', es: 'Jerarquía y potencias.', en: 'Order of operations and powers.', ar: 'الأولوية والقوى.' } }
        ]
    },
    {
        id: 'sales',
        title: { eu: 'Merkealdiak', es: 'Rebajas', en: 'Sales', ar: 'التخفيضات' },
        tagline: { eu: 'Kalkulatu deskontudun prezioak eta aukeratu benetan merkeena den eskaintza.', es: 'Calcula precios con descuento y elige la oferta que de verdad sale más barata.', en: 'Work out the discounted prices and choose the offer that really is the cheapest.', ar: 'احسب الأسعار بعد الخصم واختر العرض الأرخص فعلًا.' },
        skills: { eu: 'Ehunekoak eta kantitate baten zatikiak', es: 'Porcentajes y fracciones de una cantidad', en: 'Percentages and fractions of a quantity', ar: 'النسب المئوية وكسور الكميات' },
        levels: [
            { progressId: 1201, stage: 'proportionality', title: { eu: 'Zenbat ordaindu?', es: '¿Cuánto pago?', en: 'How much do I pay?', ar: 'كم أدفع؟' }, description: { eu: 'Deskontuak zatikitan eta ehunekotan: zer ordaindu eta zer aurreztu.', es: 'Descuentos en fracción y en %: lo que pagas y lo que ahorras.', en: 'Discounts as fractions and as %: what you pay and what you save.', ar: 'خصومات بالكسور والنسب: ما تدفعه وما توفّره.' } },
            { progressId: 1202, stage: 'proportionality', title: { eu: 'Zein eskaintza da hobea?', es: '¿Qué oferta es mejor?', en: 'Which offer is better?', ar: 'أي عرض أفضل؟' }, description: { eu: 'Konparatu %, zatikiak eta 3 × 2 eskaintzak.', es: 'Compara %, fracciones y ofertas 3 × 2.', en: 'Compare %, fractions and 3 for 2 offers.', ar: 'قارن بين النسب والكسور وعروض 3 × 2.' } },
            { progressId: 1203, stage: 'proportionality', title: { eu: 'Kateatuak eta alderantzizkoak', es: 'Encadenados e inversos', en: 'Chained and reverse', ar: 'متتالية وعكسية' }, description: { eu: 'Deskontu bat bestearen gainean eta merkealdien aurreko prezioa.', es: 'Un descuento sobre otro y el precio antes de la rebaja.', en: 'One discount on top of another, and the price before the sale.', ar: 'خصم فوق خصم والسعر قبل التخفيض.' } }
        ]
    },
    {
        id: 'balance',
        title: { eu: 'Balantza', es: 'Balanza', en: 'Balance', ar: 'الميزان' },
        tagline: { eu: 'Orekatu balantza zatikizko pisuekin. Hiru pisaketa besterik ez dituzu: pentsatu pisatu aurretik.', es: 'Equilibra la balanza con pesas de fracciones. Solo tienes tres pesadas: piensa antes de pesar.', en: 'Balance the scale with fraction weights. You only have three weighings: think before you weigh.', ar: 'وازن الميزان بأثقال من الكسور. لديك ثلاث وزنات فقط: فكّر قبل أن تزن.' },
        skills: { eu: 'Baliokidetasuna, batuketak eta kenketak', es: 'Equivalencia, sumas y restas', en: 'Equivalence, addition and subtraction', ar: 'التكافؤ والجمع والطرح' },
        levels: [
            { progressId: 1301, stage: 'equivalence', title: { eu: 'Pisu baliokideak', es: 'Pesas equivalentes', en: 'Equivalent weights', ar: 'أثقال متكافئة' }, description: { eu: 'Pisu bat, familia bereko zatien aurka: erdiak, laurdenak, zortzirenak…', es: 'Una pesa contra trozos de la misma familia: medios, cuartos, octavos…', en: 'One weight against pieces from the same family: halves, quarters, eighths…', ar: 'ثقل واحد مقابل أجزاء من العائلة نفسها: أنصاف وأرباع وأثمان…' } },
            { progressId: 1302, stage: 'operations', title: { eu: 'Batuketak', es: 'Sumas', en: 'Additions', ar: 'الجمع' }, description: { eu: 'Izendatzaile desberdineko bi pisu: zenbat pisatzen dute batera?', es: 'Dos pesas de distinto denominador: ¿cuánto pesan juntas?', en: 'Two weights with different denominators: how much do they weigh together?', ar: 'ثقلان بمقامين مختلفين: كم يزنان معًا؟' } },
            { progressId: 1303, stage: 'operations', title: { eu: 'Falta dena', es: 'Lo que falta', en: 'What is missing', ar: 'ما ينقص' }, description: { eu: 'Bi plateretan daude pisuak: gehitu falta dena, 1 baino gehiago izan arren.', es: 'Hay pesas en los dos platillos: añade lo que falta, aunque pase de 1.', en: 'There are weights on both pans: add what is missing, even if it goes over 1.', ar: 'في الكفتين أثقال: أضف ما ينقص ولو تجاوز 1.' } }
        ]
    },
    {
        id: 'pyramid',
        title: { eu: 'Piramidea', es: 'Pirámide', en: 'Pyramid', ar: 'الهرم' },
        tagline: { eu: 'Adreilu bakoitza azpiko bi adreiluen batura (edo biderkadura) da. Osatu piramidea gorantz eta beherantz.', es: 'Cada ladrillo es la suma (o el producto) de los dos de debajo. Completa la pirámide hacia arriba y hacia abajo.', en: 'Each brick is the sum (or the product) of the two below it. Complete the pyramid upwards and downwards.', ar: 'كل لبنة هي مجموع اللبنتين اللتين تحتها (أو حاصل ضربهما). أكمل الهرم صعودًا ونزولًا.' },
        skills: { eu: 'Batuketak, kenketak eta biderketak', es: 'Sumas, restas y productos', en: 'Additions, subtractions and products', ar: 'الجمع والطرح والضرب' },
        levels: [
            { progressId: 1401, stage: 'operations', title: { eu: 'Gorantz', es: 'Hacia arriba', en: 'Upwards', ar: 'صعودًا' }, description: { eu: 'Beheko ilarako zatikiak familia berekoak dira: batu gorantz.', es: 'Las fracciones de abajo son de la misma familia: suma hacia arriba.', en: 'The fractions below are from the same family: add upwards.', ar: 'كسور الصف السفلي من العائلة نفسها: اجمع صعودًا.' } },
            { progressId: 1402, stage: 'operations', title: { eu: 'Beherantz', es: 'Hacia abajo', en: 'Downwards', ar: 'نزولًا' }, description: { eu: 'Adreilu batzuk kenketaz aurkitzen dira; gero, izendatzaile desberdinekin.', es: 'Algunos ladrillos se encuentran restando; después, con denominadores distintos.', en: 'Some bricks are worked out by subtracting, and then with different denominators.', ar: 'بعض اللبنات تُحسب بالطرح؛ ثم بمقامات مختلفة.' } },
            { progressId: 1403, stage: 'operations', title: { eu: 'Biderkaduren piramidea', es: 'Pirámide de productos', en: 'Product pyramid', ar: 'هرم الضرب' }, description: { eu: 'Adreilu bakoitza biderkadura bat da; beherantz zatitu egiten da, alderantzizkoaz biderkatuz.', es: 'Cada ladrillo es un producto; hacia abajo se divide, multiplicando por la inversa.', en: 'Each brick is a product; going down you divide, multiplying by the reciprocal.', ar: 'كل لبنة حاصل ضرب؛ ونزولًا نقسم بالضرب في المقلوب.' } }
        ]
    },
    {
        id: 'train',
        title: { eu: 'Ordenaren trena', es: 'El tren del orden', en: 'The ordering train', ar: 'قطار الترتيب' },
        tagline: { eu: 'Lotu bagoi bakoitza bere lekuan, trena txikienetik handienera joan dadin.', es: 'Engancha cada vagón en su sitio para que el tren vaya de menor a mayor.', en: 'Hook each carriage into its place so that the train goes from smallest to largest.', ar: 'اربط كل عربة في مكانها ليصبح القطار من الأصغر إلى الأكبر.' },
        skills: { eu: 'Konparatu eta ordenatu', es: 'Comparar y ordenar', en: 'Compare and order', ar: 'المقارنة والترتيب' },
        levels: [
            { progressId: 1501, stage: 'ordering', title: { eu: 'Familia bat', es: 'Una familia', en: 'A family', ar: 'عائلة واحدة' }, description: { eu: 'Erdiak, laurdenak, zortzirenak… edo herenak, seirenak…: izendatzaile komun batekin berehala ordenatzen dira.', es: 'Medios, cuartos, octavos… o tercios, sextos…: con un denominador común se ordenan enseguida.', en: 'Halves, quarters, eighths… or thirds, sixths…: with a common denominator they can be ordered straight away.', ar: 'أنصاف وأرباع وأثمان… أو أثلاث وأسداس…: بمقام مشترك تُرتَّب بسرعة.' } },
            { progressId: 1502, stage: 'ordering', title: { eu: 'Edozein zatiki', es: 'Cualquier fracción', en: 'Any fraction', ar: 'أي كسر' }, description: { eu: 'Izendatzaile desberdinak, zatiki inpropioak eta zenbaki mistoak.', es: 'Denominadores distintos, fracciones impropias y números mixtos.', en: 'Different denominators, improper fractions and mixed numbers.', ar: 'مقامات مختلفة وكسور غير حقيقية وأعداد كسرية.' } },
            { progressId: 1503, stage: 'ordering', title: { eu: 'Negatiboak eta hamartarrak', es: 'Negativos y decimales', en: 'Negatives and decimals', ar: 'السالبة والعشرية' }, description: { eu: '−2 eta 2 artean: zatiki negatiboak, hamartarrak eta mistoak batera.', es: 'Entre −2 y 2: fracciones negativas, decimales y mixtos juntos.', en: 'Between −2 and 2: negative fractions, decimals and mixed numbers together.', ar: 'بين \u2066−2\u2069 و\u20662\u2069: كسور سالبة وأعداد عشرية وكسرية معًا.' } }
        ]
    }
]

export const gameProgressIds: number[] = levelProgressIds(games)
