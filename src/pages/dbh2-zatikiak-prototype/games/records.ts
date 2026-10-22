import type { FractionStageId, LocalizedText } from '../content.ts'
import { levelProgressIds, type GameInfo as UnitGameInfo, type GameLevelInfo as UnitGameLevelInfo } from '../../../features/unit-v2/games/records.ts'

export { gameStars, mergeRecord, parseRecords, recordKey, type GameRecords, type LevelRecord, type Stars } from '../../../features/unit-v2/games/records.ts'

export type GameId = 'race' | 'memory' | 'target' | 'wall' | 'exact' | 'detective' | 'sales'

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
        title: { eu: 'Zatikien lasterketa', es: 'Carrera de fracciones', ar: 'سباق الكسور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Sei zirkuitu, etapa bakoitzeko bat', es: 'Seis circuitos, uno por etapa', ar: 'ست حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 601, stage: 'equivalence', title: { eu: 'Baliokideak', es: 'Equivalentes', ar: 'المتكافئة' }, description: { eu: 'Sinplifikatu eta osatu zatiki baliokideak.', es: 'Simplifica y completa fracciones equivalentes.', ar: 'بسّط الكسور المتكافئة وأكملها.' } },
            { progressId: 602, stage: 'ordering', title: { eu: 'Konparatu', es: 'Comparar', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa aurkitu.', es: 'Encuentra la mayor, la menor y la intermedia.', ar: 'جد الأكبر والأصغر والوسيط.' } },
            { progressId: 603, stage: 'operations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', ar: 'الجمع والطرح' }, description: { eu: 'Izendatzaile komuna eta zeinuak.', es: 'Denominador común y signos.', ar: 'المقام المشترك والإشارات.' } },
            { progressId: 604, stage: 'operations', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', ar: 'الضرب والقسمة' }, description: { eu: 'Biderkatu zuzenean, zatitzeko alderantzikatu.', es: 'Multiplica en línea, invierte para dividir.', ar: 'اضرب مباشرة واقلب للقسمة.' } },
            { progressId: 605, stage: 'operations', title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', ar: 'العمليات المركبة' }, description: { eu: 'Hierarkia, parentesiak eta berreturak.', es: 'Jerarquía, paréntesis y potencias.', ar: 'الأولوية والأقواس والقوى.' } },
            { progressId: 606, stage: 'proportionality', title: { eu: 'Ehunekoak eta kantitateak', es: 'Porcentajes y cantidades', ar: 'النسب المئوية والكميات' }, description: { eu: 'Zatiki baten zatia, ehunekoak eta osoa.', es: 'Fracción de una cantidad, porcentajes y el total.', ar: 'كسر من كمية والنسب المئوية والكل.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', ar: 'الهدف' },
        tagline: { eu: 'Jaurti zatikia zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza la fracción a la recta. Cuanto más cerca, más puntos.', ar: 'ارمِ الكسر على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Estimazioa eta ordena', es: 'Estimación y orden', ar: 'التقدير والترتيب' },
        levels: [
            { progressId: 801, stage: 'meaning', title: { eu: '0 eta 1 artean', es: 'Entre 0 y 1', ar: 'بين 0 و1' }, description: { eu: 'Zatiki propioak, marka gabeko zuzen batean.', es: 'Fracciones propias en una recta sin marcas.', ar: 'كسور عادية على خط بلا علامات.' } },
            { progressId: 802, stage: 'ordering', title: { eu: '0tik 3ra', es: 'De 0 a 3', ar: 'من 0 إلى 3' }, description: { eu: 'Zatiki inpropioak, zenbaki mistoak eta hamartarrak.', es: 'Impropias, números mixtos y decimales.', ar: 'كسور غير عادية وأعداد كسرية وعشرية.' } },
            { progressId: 803, stage: 'ordering', title: { eu: '−2tik 2ra', es: 'De −2 a 2', ar: 'من −2 إلى 2' }, description: { eu: 'Zatiki negatiboak ere bai.', es: 'También fracciones negativas.', ar: 'والكسور السالبة أيضًا.' } }
        ]
    },
    {
        id: 'wall',
        title: { eu: 'Zatiki-horma', es: 'Muro de fracciones', ar: 'جدار الكسور' },
        tagline: { eu: 'Kokatu adreiluak eta osatu zehazki unitate bat balio duten ilarak.', es: 'Coloca los ladrillos y completa filas que valgan exactamente una unidad.', ar: 'ضع الطوب وأكمل صفوفًا تساوي وحدة واحدة تمامًا.' },
        skills: { eu: 'Batuketak eta baliokidetasuna', es: 'Sumas y equivalencia', ar: 'الجمع والتكافؤ' },
        levels: [
            { progressId: 901, stage: 'equivalence', title: { eu: 'Erdiak eta laurdenak', es: 'Medios y cuartos', ar: 'الأنصاف والأرباع' }, description: { eu: '1/2, 1/4 eta 1/8 adreiluak.', es: 'Ladrillos de 1/2, 1/4 y 1/8.', ar: 'طوب 1/2 و1/4 و1/8.' } },
            { progressId: 902, stage: 'equivalence', title: { eu: 'Herenak eta seirenak', es: 'Tercios y sextos', ar: 'الأثلاث والأسداس' }, description: { eu: '1/2, 1/3, 1/4, 1/6 eta 1/12 nahasita.', es: 'Mezcla de 1/2, 1/3, 1/4, 1/6 y 1/12.', ar: 'مزيج من 1/2 و1/3 و1/4 و1/6 و1/12.' } },
            { progressId: 903, stage: 'operations', title: { eu: 'Adreilu handiak', es: 'Ladrillos grandes', ar: 'طوب كبير' }, description: { eu: '2/3, 3/4, 5/12, 3/10… ere agertzen dira.', es: 'También aparecen 2/3, 3/4, 5/12, 3/10…', ar: 'تظهر أيضًا 2/3 و3/4 و5/12 و3/10…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera modu desberdinetan idazten duten kartak.', es: 'Encuentra las cartas que escriben el mismo valor de formas distintas.', ar: 'جد البطاقات التي تكتب القيمة نفسها بطرق مختلفة.' },
        skills: { eu: 'Adierazpenak: zatikia, hamartarra, %', es: 'Representaciones: fracción, decimal, %', ar: 'التمثيلات: كسر، عشري، %' },
        levels: [
            { progressId: 701, stage: 'meaning', title: { eu: 'Bikoteak', es: 'Parejas', ar: 'أزواج' }, description: { eu: '6 bikote: zatikiak, marrazkiak eta hamartarrak.', es: '6 parejas: fracciones, dibujos y decimales.', ar: '6 أزواج: كسور ورسوم وأعداد عشرية.' } },
            { progressId: 702, stage: 'equivalence', title: { eu: 'Adierazpen gehiago', es: 'Más representaciones', ar: 'تمثيلات أكثر' }, description: { eu: '8 bikote: ehunekoak, mistoak eta zuzena.', es: '8 parejas: porcentajes, mixtos y la recta.', ar: '8 أزواج: نسب مئوية وأعداد كسرية وخط الأعداد.' } },
            { progressId: 703, stage: 'proportionality', title: { eu: 'Hirukoteak', es: 'Tríos', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zatikia, hamartarra eta ehunekoa.', es: '6 tríos: fracción, decimal y porcentaje.', ar: '6 ثلاثيات: كسر وعدد عشري ونسبة مئوية.' } }
        ]
    },
    {
        id: 'exact',
        title: { eu: 'Helburu zehatza', es: 'Objetivo exacto', ar: 'الهدف الدقيق' },
        tagline: { eu: 'Konbinatu kartak lau eragiketekin eta iritsi zehazki helburura.', es: 'Combina las cartas con las cuatro operaciones y llega exactamente al objetivo.', ar: 'اجمع البطاقات بالعمليات الأربع وصِل إلى الهدف تمامًا.' },
        skills: { eu: 'Estrategia eta eragiketak', es: 'Estrategia y operaciones', ar: 'الاستراتيجية والعمليات' },
        levels: [
            { progressId: 1001, stage: 'operations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', ar: 'الجمع والطرح' }, description: { eu: 'Lau karta, + eta − bakarrik.', es: 'Cuatro cartas, solo + y −.', ar: 'أربع بطاقات، + و− فقط.' } },
            { progressId: 1002, stage: 'operations', title: { eu: 'Lau eragiketak', es: 'Las cuatro operaciones', ar: 'العمليات الأربع' }, description: { eu: 'Lau karta eta + − · ÷.', es: 'Cuatro cartas y + − · ÷.', ar: 'أربع بطاقات و+ − · ÷.' } },
            { progressId: 1003, stage: 'operations', title: { eu: 'Helburu handia', es: 'Gran objetivo', ar: 'الهدف الكبير' }, description: { eu: 'Bost karta: hiru edo lau erabili beharko dituzu.', es: 'Cinco cartas: tendrás que usar tres o cuatro.', ar: 'خمس بطاقات: ستحتاج إلى ثلاث منها أو أربع.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Akatsen detektibea', es: 'Detective de errores', ar: 'محقّق الأخطاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago. Aurkitu eta esan zein akats den.', es: 'En cada resolución hay una línea mal. Encuéntrala y di qué error es.', ar: 'في كل حلّ سطر خاطئ. جِده وقل ما نوع الخطأ.' },
        skills: { eu: 'Ohiko akatsak', es: 'Errores típicos', ar: 'الأخطاء الشائعة' },
        levels: [
            { progressId: 1101, stage: 'operations', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' }, description: { eu: 'Izendatzaile komuna, zeinuak eta sinplifikazioa.', es: 'Denominador común, signos y simplificación.', ar: 'المقام المشترك والإشارات والاختزال.' } },
            { progressId: 1102, stage: 'operations', title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', ar: 'الضرب والقسمة' }, description: { eu: 'Zuzenean biderkatu eta zatitzeko alderantzikatu.', es: 'Multiplicar en línea e invertir para dividir.', ar: 'الضرب المباشر والقلب للقسمة.' } },
            { progressId: 1103, stage: 'operations', title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', ar: 'العمليات المركبة' }, description: { eu: 'Hierarkia eta berreturak.', es: 'Jerarquía y potencias.', ar: 'الأولوية والقوى.' } }
        ]
    },
    {
        id: 'sales',
        title: { eu: 'Merkealdiak', es: 'Rebajas', ar: 'التخفيضات' },
        tagline: { eu: 'Kalkulatu deskontudun prezioak eta aukeratu benetan merkeena den eskaintza.', es: 'Calcula precios con descuento y elige la oferta que de verdad sale más barata.', ar: 'احسب الأسعار بعد الخصم واختر العرض الأرخص فعلًا.' },
        skills: { eu: 'Ehunekoak eta kantitate baten zatikiak', es: 'Porcentajes y fracciones de una cantidad', ar: 'النسب المئوية وكسور الكميات' },
        levels: [
            { progressId: 1201, stage: 'proportionality', title: { eu: 'Zenbat ordaindu?', es: '¿Cuánto pago?', ar: 'كم أدفع؟' }, description: { eu: 'Deskontuak zatikitan eta ehunekotan: zer ordaindu eta zer aurreztu.', es: 'Descuentos en fracción y en %: lo que pagas y lo que ahorras.', ar: 'خصومات بالكسور والنسب: ما تدفعه وما توفّره.' } },
            { progressId: 1202, stage: 'proportionality', title: { eu: 'Zein eskaintza da hobea?', es: '¿Qué oferta es mejor?', ar: 'أي عرض أفضل؟' }, description: { eu: 'Konparatu %, zatikiak eta 3 × 2 eskaintzak.', es: 'Compara %, fracciones y ofertas 3 × 2.', ar: 'قارن بين النسب والكسور وعروض 3 × 2.' } },
            { progressId: 1203, stage: 'proportionality', title: { eu: 'Kateatuak eta alderantzizkoak', es: 'Encadenados e inversos', ar: 'متتالية وعكسية' }, description: { eu: 'Deskontu bat bestearen gainean eta merkealdien aurreko prezioa.', es: 'Un descuento sobre otro y el precio antes de la rebaja.', ar: 'خصم فوق خصم والسعر قبل التخفيض.' } }
        ]
    }
]

export const gameProgressIds: number[] = levelProgressIds(games)
