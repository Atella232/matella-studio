import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges from Anaya 1.º ESO unit 15 (variables, frequency tables,
   graphs, mean, median, mode and range) and Santillana 1.º ESO unit 14
   (random experiments, events and Laplace's rule). Answers are numbers or
   fractions; decimals with a comma (a point in Arabic).
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1301,
        prompt: say('Ikastetxeko 600 ikasleetatik 50i galdetu zaie. Zer da 50 ikasle horien multzoa?', 'De los 600 alumnos del instituto se ha preguntado a 50. ¿Qué es el grupo de esos 50?', 'من 600 تلميذ في المدرسة سُئل 50. ماذا تسمّى مجموعة هؤلاء الخمسين؟'),
        options: [say('Populazioa', 'La población', 'المجتمع'), say('Lagina', 'La muestra', 'العيّنة'), say('Banakoa', 'Un individuo', 'فرد')],
        correctIndex: 1,
        explanation: say('Populazioa 600 ikasleak dira; galdetutako zatia, lagina.', 'La población son los 600 alumnos; la parte a la que se pregunta es la muestra.', 'المجتمع هو 600 تلميذ، والجزء الذي سُئل هو العيّنة.'),
        topic: 'study'
    },
    {
        id: 1302,
        prompt: say('Zer motatako aldagaia da «begien kolorea»?', '¿Qué tipo de variable es «el color de ojos»?', 'ما نوع المتغير «لون العينين»؟'),
        options: [say('Kualitatiboa', 'Cualitativa', 'نوعي'), say('Kuantitatibo diskretua', 'Cuantitativa discreta', 'كمي منفصل'), say('Kuantitatibo jarraitua', 'Cuantitativa continua', 'كمي متصل')],
        correctIndex: 0,
        explanation: say('Ez da zenbaki bat, ezaugarri bat baizik: kualitatiboa.', 'No es un número sino una cualidad: cualitativa.', 'ليس عددًا بل صفة: نوعي.'),
        topic: 'variables'
    },
    {
        id: 1303,
        prompt: say('20 ikasletatik 5ek saskibaloia nahiago dute. Zein da maiztasun erlatiboa?', 'De 20 alumnos, 5 prefieren el baloncesto. ¿Cuál es la frecuencia relativa?', 'من 20 تلميذًا يفضّل 5 كرة السلة. ما التكرار النسبي؟'),
        options: [same('$5$'), same('$0{,}25$'), same('$4$')],
        correctIndex: 1,
        explanation: same('$\\frac{5}{20}=0{,}25$'),
        topic: 'frequencies'
    },
    {
        id: 1304,
        prompt: say('20 ikasletatik 8k futbola nahiago dute. Zenbat gradu ditu futbolaren sektoreak?', 'De 20 alumnos, 8 prefieren el fútbol. ¿Cuántos grados mide el sector del fútbol?', 'من 20 تلميذًا يفضّل 8 كرة القدم. كم درجة قطاع كرة القدم؟'),
        options: [same('$8^{\\circ}$'), same('$144^{\\circ}$'), same('$160^{\\circ}$')],
        correctIndex: 1,
        explanation: same('$360\\mathbin{:}20=18\\qquad 8\\cdot 18=144$'),
        topic: 'pie-chart'
    },
    {
        id: 1305,
        prompt: say('Zein da 4, 6, 8 eta 10 datuen batez bestekoa?', '¿Cuál es la media de los datos 4, 6, 8 y 10?', 'ما متوسط البيانات 4 و6 و8 و10؟'),
        options: [same('$7$'), same('$28$'), same('$6$')],
        correctIndex: 0,
        explanation: same('$\\frac{4+6+8+10}{4}=7$'),
        topic: 'mean'
    },
    {
        id: 1306,
        prompt: say('Zein da 2, 7, 5, 9, 2 datuen mediana?', '¿Cuál es la mediana de los datos 2, 7, 5, 9, 2?', 'ما وسيط البيانات 2، 7، 5، 9، 2؟'),
        options: [same('$2$'), same('$5$'), same('$7$')],
        correctIndex: 1,
        explanation: say('Ordenatuta: 2, 2, 5, 7, 9. Erdikoa 5 da (2 moda da).', 'Ordenados: 2, 2, 5, 7, 9. El del centro es 5 (2 es la moda).', 'بعد الترتيب: 2، 2، 5، 7، 9. الأوسط 5 (و2 هو المنوال).'),
        topic: 'median-mode'
    },
    {
        id: 1307,
        prompt: say('Zein da esperimentu aleatorioa?', '¿Cuál es un experimento aleatorio?', 'أيّ تجربة عشوائية؟'),
        options: [say('Dado bat jaurtitzea', 'Lanzar un dado', 'رمي نرد'), say('Ura 100 °C-raino berotzea', 'Calentar agua hasta 100 °C', 'تسخين الماء حتى 100 °C'), say('Harri bat eskutik askatzea', 'Soltar una piedra de la mano', 'إفلات حجر من اليد')],
        correctIndex: 0,
        explanation: say('Dadoaren emaitza ezin da aurretik jakin; beste biak deterministak dira.', 'El resultado del dado no se puede saber antes; los otros dos son deterministas.', 'لا يمكن معرفة نتيجة النرد مسبقًا، أما الأخريان فحتميتان.'),
        topic: 'random'
    },
    {
        id: 1308,
        prompt: say('Dado bat jaurtitzen da. Zein da 3 baino handiagoa ateratzeko probabilitatea?', 'Se lanza un dado. ¿Cuál es la probabilidad de sacar más de 3?', 'يُرمى نرد. ما احتمال الحصول على أكثر من 3؟'),
        options: [same('$\\frac{1}{2}$'), same('$\\frac{1}{3}$'), same('$\\frac{2}{3}$')],
        correctIndex: 0,
        explanation: say('Aldeko kasuak 4, 5 eta 6: $\\frac{3}{6}=\\frac{1}{2}$.', 'Casos favorables 4, 5 y 6: $\\frac{3}{6}=\\frac{1}{2}$.', 'الحالات الملائمة 4 و5 و6: $\\frac{3}{6}=\\frac{1}{2}$.'),
        topic: 'laplace'
    }
]

export const statisticsIntroPractice: PracticeItem[] = [
    { id: 1, stage: 'data', prompt: say('Ikastetxe batean 600 ikasle daude eta % 10i galdetu zaie. Zenbat ikaslek osatzen dute lagina?', 'En un instituto hay 600 alumnos y se ha preguntado al 10 %. ¿Cuántos alumnos forman la muestra?', 'في مدرسة 600 تلميذ وسُئل 10 % منهم. كم تلميذًا في العيّنة؟'), expected: fraction(60), hint: say('% 10 = 10 : 100.', '10 % = 10 : 100.', '10 % = 10 : 100.'), explanation: same('$\\frac{600\\cdot 10}{100}=60$') },
    { id: 2, stage: 'data', prompt: say('Zenbat aldagai kuantitatibo daude zerrenda honetan: altuera, begien kolorea, anai-arreba kopurua, kirol gogokoena, pisua?', '¿Cuántas variables cuantitativas hay en esta lista: altura, color de ojos, número de hermanos, deporte favorito, peso?', 'كم متغيرًا كميًا في هذه القائمة: الطول، لون العينين، عدد الإخوة، الرياضة المفضلة، الوزن؟'), expected: fraction(3), hint: say('Kuantitatiboa: zenbaki bat da.', 'Cuantitativa: es un número.', 'الكمي: عدد.'), explanation: say('Altuera, anai-arreba kopurua eta pisua: 3.', 'Altura, número de hermanos y peso: 3.', 'الطول وعدد الإخوة والوزن: 3.') },
    { id: 3, stage: 'data', prompt: say('Zenbat aldagai diskretu daude: altuera, pisua, anai-arreba kopurua, lasterketa baten denbora, irakurritako liburu kopurua?', '¿Cuántas variables discretas hay: altura, peso, número de hermanos, tiempo de una carrera, número de libros leídos?', 'كم متغيرًا منفصلًا: الطول، الوزن، عدد الإخوة، زمن سباق، عدد الكتب المقروءة؟'), expected: fraction(2), hint: say('Diskretua: zenbatu egiten da.', 'Discreta: se cuenta.', 'المنفصل: يُعَدّ.'), explanation: say('Anai-arreba kopurua eta liburu kopurua: 2. Besteak neurtu egiten dira.', 'Número de hermanos y de libros: 2. Las demás se miden.', 'عدد الإخوة وعدد الكتب: 2. والبقية تُقاس.') },
    { id: 4, stage: 'data', prompt: say('Lagin bat populazioaren % 5 da eta 40 pertsonak osatzen dute. Zenbat pertsona ditu populazioak?', 'Una muestra es el 5 % de la población y la forman 40 personas. ¿Cuántas personas tiene la población?', 'عيّنة تمثّل 5 % من المجتمع وفيها 40 شخصًا. كم شخصًا في المجتمع؟'), expected: fraction(800), hint: say('% 5 = 0,05.', '5 % = 0,05.', '5 % = 0.05.'), explanation: same('$40\\mathbin{:}0{,}05=800$') },
    { id: 5, stage: 'tables', prompt: say('25 ikasleko inkesta batean maiztasun absolutuak 7, 9, 6 eta x dira. Zenbat da x?', 'En una encuesta a 25 alumnos las frecuencias absolutas son 7, 9, 6 y x. ¿Cuánto vale x?', 'في استبيان لـ 25 تلميذًا التكرارات المطلقة 7 و9 و6 وx. كم x؟'), expected: fraction(3), hint: say('Guztiek N dute batuta.', 'Todas suman N.', 'مجموعها كلها N.'), explanation: same('$25-7-9-6=3$') },
    { id: 6, stage: 'tables', prompt: say('40 ikasletatik 10 bizikletaz etortzen dira. Zein da maiztasun erlatiboa?', 'De 40 alumnos, 10 vienen en bici. ¿Cuál es la frecuencia relativa?', 'من 40 تلميذًا يأتي 10 بالدراجة. ما التكرار النسبي؟'), expected: fraction(1, 4), hint: say('fᵢ : N', 'fᵢ : N', 'fᵢ : N'), explanation: same('$\\frac{10}{40}=0{,}25$') },
    { id: 7, stage: 'tables', prompt: say('Maiztasun erlatiboa 0,15 da eta N = 60. Zenbat da maiztasun absolutua?', 'La frecuencia relativa es 0,15 y N = 60. ¿Cuál es la frecuencia absoluta?', 'التكرار النسبي 0.15 وN = 60. ما التكرار المطلق؟'), expected: fraction(9), hint: say('Biderkatu N-z.', 'Multiplica por N.', 'اضرب في N.'), explanation: same('$0{,}15\\cdot 60=9$') },
    { id: 8, stage: 'tables', prompt: say('Datuen % 35 «bai» da. Zein da «bai»-ren maiztasun erlatiboa?', 'El 35 % de los datos es «sí». ¿Cuál es la frecuencia relativa de «sí»?', '35 % من البيانات «نعم». ما التكرار النسبي لـ«نعم»؟'), expected: fraction(35, 100), hint: say('Zatitu 100ez.', 'Divide entre 100.', 'اقسم على 100.'), explanation: same('$35\\mathbin{:}100=0{,}35$') },
    { id: 9, stage: 'graphs', prompt: say('40 ikasletatik 10ek igeriketa nahiago dute. Zenbat gradu ditu sektoreak?', 'De 40 alumnos, 10 prefieren la natación. ¿Cuántos grados mide su sector?', 'من 40 تلميذًا يفضّل 10 السباحة. كم درجة قطاعها؟'), expected: fraction(90), hint: say('hᵢ · 360°', 'hᵢ · 360°', 'hᵢ · 360°'), explanation: same('$\\frac{10}{40}\\cdot 360=90$') },
    { id: 10, stage: 'graphs', prompt: say('Sektore baten angelua 72° da. Zein da haren maiztasun erlatiboa?', 'Un sector mide 72°. ¿Cuál es su frecuencia relativa?', 'قطاع قياسه 72°. ما تكراره النسبي؟'), expected: fraction(1, 5), hint: say('Zatitu 360ez.', 'Divide entre 360.', 'اقسم على 360.'), explanation: same('$72\\mathbin{:}360=0{,}2$') },
    { id: 11, stage: 'graphs', prompt: say('30 datuko sektore-diagrama batean sektore batek 48° ditu. Zenbat datu ditu?', 'En un diagrama de sectores de 30 datos, un sector mide 48°. ¿Cuántos datos tiene?', 'في مخطط دائري لـ 30 قيمة قطاع قياسه 48°. كم قيمة فيه؟'), expected: fraction(4), hint: say('Lehenik, datu bakoitzeko graduak.', 'Primero, los grados de cada dato.', 'أولًا درجات كل قيمة.'), explanation: same('$360\\mathbin{:}30=12\\qquad 48\\mathbin{:}12=4$') },
    { id: 12, stage: 'graphs', prompt: say('Barra-diagrama bateko barrek 6, 9, 4 eta 5 neurtzen dute. Zenbat datu daude?', 'Las barras de un diagrama miden 6, 9, 4 y 5. ¿Cuántos datos hay?', 'أعمدة مخطط ارتفاعاتها 6 و9 و4 و5. كم عدد البيانات؟'), expected: fraction(24), hint: say('Batu altuerak.', 'Suma las alturas.', 'اجمع الارتفاعات.'), explanation: same('$6+9+4+5=24$') },
    { id: 13, stage: 'parameters', prompt: say('Kalkulatu 3, 5, 6, 8, 8 datuen batez bestekoa.', 'Calcula la media de 3, 5, 6, 8, 8.', 'احسب متوسط 3، 5، 6، 8، 8.'), expected: fraction(6), hint: say('Batu eta zatitu 5ez.', 'Suma y divide entre 5.', 'اجمع واقسم على 5.'), explanation: same('$\\frac{3+5+6+8+8}{5}=6$') },
    { id: 14, stage: 'parameters', prompt: say('Aurkitu 12, 7, 15, 9, 10, 8 datuen mediana.', 'Halla la mediana de 12, 7, 15, 9, 10, 8.', 'أوجد وسيط 12، 7، 15، 9، 10، 8.'), expected: fraction(19, 2), hint: say('Ordenatu; datu kopurua bikoitia da.', 'Ordena; el número de datos es par.', 'رتّب؛ عدد البيانات زوجي.'), explanation: say('7, 8, 9, 10, 12, 15 → $\\frac{9+10}{2}=9{,}5$', '7, 8, 9, 10, 12, 15 → $\\frac{9+10}{2}=9{,}5$', '7، 8، 9، 10، 12، 15 ← $\\frac{9+10}{2}=9.5$') },
    { id: 15, stage: 'parameters', prompt: say('Zein da 4, 6, 4, 7, 6, 4, 5 datuen moda?', '¿Cuál es la moda de 4, 6, 4, 7, 6, 4, 5?', 'ما منوال 4، 6، 4، 7، 6، 4، 5؟'), expected: fraction(4), hint: say('Zein errepikatzen da gehien?', '¿Cuál se repite más?', 'أيّها يتكرر أكثر؟'), explanation: say('4 hiru aldiz agertzen da; 6, bi aldiz. Moda 4 da.', 'El 4 aparece tres veces; el 6, dos. La moda es 4.', 'يظهر 4 ثلاث مرات و6 مرتين. المنوال 4.') },
    { id: 16, stage: 'parameters', prompt: say('Aste bateko tenperaturak: 14, 16, 15, 18, 21, 20, 17. Zein da ibiltartea?', 'Temperaturas de una semana: 14, 16, 15, 18, 21, 20, 17. ¿Cuál es el rango?', 'درجات حرارة أسبوع: 14، 16، 15، 18، 21، 20، 17. ما المدى؟'), expected: fraction(7), hint: say('Handiena ken txikiena.', 'Mayor menos menor.', 'الأكبر ناقص الأصغر.'), explanation: same('$21-14=7$') },
    { id: 17, stage: 'probability', prompt: say('Dado bat jaurtitzen da. Zein da zenbaki bikoitia ateratzeko probabilitatea?', 'Se lanza un dado. ¿Cuál es la probabilidad de sacar un número par?', 'يُرمى نرد. ما احتمال الحصول على عدد زوجي؟'), expected: fraction(1, 2), hint: say('Bikoitiak: 2, 4, 6.', 'Pares: 2, 4, 6.', 'الزوجية: 2، 4، 6.'), explanation: same('$\\frac{3}{6}=0{,}5$') },
    { id: 18, stage: 'probability', prompt: say('Poltsa batean 4 bola gorri eta 6 urdin daude. Zein da urdin bat ateratzeko probabilitatea?', 'En una bolsa hay 4 bolas rojas y 6 azules. ¿Cuál es la probabilidad de sacar una azul?', 'في كيس 4 كرات حمراء و6 زرقاء. ما احتمال سحب زرقاء؟'), expected: fraction(3, 5), hint: say('Kasu posibleak: 10.', 'Casos posibles: 10.', 'الحالات الممكنة: 10.'), explanation: same('$\\frac{6}{10}=0{,}6$') },
    { id: 19, stage: 'probability', prompt: say('40 kartako sorta batean 10 urre daude. Zein da urre bat ateratzeko probabilitatea?', 'En una baraja de 40 cartas hay 10 oros. ¿Cuál es la probabilidad de sacar un oro?', 'في مجموعة 40 ورقة لعب 10 أوراق ذهب. ما احتمال سحب ورقة ذهب؟'), expected: fraction(1, 4), hint: say('Aldekoak : posibleak.', 'Favorables : posibles.', 'الملائمة : الممكنة.'), explanation: same('$\\frac{10}{40}=0{,}25$') },
    { id: 20, stage: 'probability', prompt: say('Txanpon bat 200 aldiz bota da eta 94 aldiz atera da aurpegia. Zein da aurpegiaren maiztasun erlatiboa?', 'Se ha lanzado una moneda 200 veces y han salido 94 caras. ¿Cuál es la frecuencia relativa de cara?', 'رُميت قطعة نقود 200 مرة وظهر الوجه 94 مرة. ما التكرار النسبي للوجه؟'), expected: fraction(47, 100), hint: say('Aurpegiak : saiakerak.', 'Caras : lanzamientos.', 'الوجوه : الرميات.'), explanation: same('$\\frac{94}{200}=0{,}47$') }
]

export const statisticsIntroChallenges: ChallengeItem[] = [
    { id: 101, stage: 'data', context: 'starter', points: 10, prompt: say('12.000 biztanleko herri batean 300 pertsonako lagina hartu da. Zenbat biztanletik bati galdetu zaio?', 'En un pueblo de 12.000 habitantes se ha tomado una muestra de 300 personas. ¿A uno de cada cuántos habitantes se ha preguntado?', 'في بلدة من 12000 نسمة أُخذت عيّنة من 300 شخص. سُئل واحد من كل كم ساكنًا؟'), expected: fraction(40), hint: say('Zatitu populazioa laginaz.', 'Divide la población entre la muestra.', 'اقسم المجتمع على العيّنة.'), explanation: same('$12\\,000\\mathbin{:}300=40$') },
    { id: 102, stage: 'tables', context: 'starter', points: 10, prompt: say('Taula bateko maiztasun erlatiboak 0,3, 0,25, 0,15 eta x dira. Zenbat da x?', 'Las frecuencias relativas de una tabla son 0,3, 0,25, 0,15 y x. ¿Cuánto vale x?', 'التكرارات النسبية في جدول 0.3 و0.25 و0.15 وx. كم x؟'), expected: fraction(3, 10), hint: say('Guztiek 1 dute batuta.', 'Todas suman 1.', 'مجموعها 1.'), explanation: same('$1-0{,}3-0{,}25-0{,}15=0{,}3$') },
    { id: 103, stage: 'parameters', context: 'starter', points: 10, prompt: say('Lau azterketatan 6, 7, 5 eta 8 atera ditut. Zein da nire batez bestekoa?', 'En cuatro exámenes he sacado 6, 7, 5 y 8. ¿Cuál es mi media?', 'حصلت في أربعة امتحانات على 6 و7 و5 و8. ما متوسطي؟'), expected: fraction(13, 2), hint: say('Batu eta zatitu 4z.', 'Suma y divide entre 4.', 'اجمع واقسم على 4.'), explanation: same('$\\frac{6+7+5+8}{4}=6{,}5$') },
    { id: 104, stage: 'probability', context: 'starter', points: 10, prompt: say('Dado bat jaurtitzen da. Zein da 5 baino gutxiago ateratzeko probabilitatea? (Zatiki gisa)', 'Se lanza un dado. ¿Cuál es la probabilidad de sacar menos de 5? (Como fracción)', 'يُرمى نرد. ما احتمال الحصول على أقل من 5؟ (في صورة كسر)'), expected: fraction(2, 3), hint: say('Aldekoak: 1, 2, 3, 4.', 'Favorables: 1, 2, 3, 4.', 'الملائمة: 1، 2، 3، 4.'), explanation: same('$\\frac{4}{6}=\\frac{2}{3}$') },
    { id: 105, stage: 'parameters', context: 'advanced', points: 20, prompt: say('Bost notaren batez bestekoa 7 da. Lau notak 6, 8, 7 eta 5 dira. Zenbat da bosgarrena?', 'La media de cinco notas es 7. Cuatro de ellas son 6, 8, 7 y 5. ¿Cuánto es la quinta?', 'متوسط خمس علامات 7. أربع منها 6 و8 و7 و5. كم الخامسة؟'), expected: fraction(9), hint: say('Bost noten batura: 5 · 7.', 'La suma de las cinco: 5 · 7.', 'مجموع الخمس: 5 · 7.'), explanation: same('$5\\cdot 7-(6+8+7+5)=9$') },
    { id: 106, stage: 'graphs', context: 'advanced', points: 20, prompt: say('60 ikasleko sektore-diagrama batean sektore batek 90° ditu. Zenbat ikasle dira?', 'En un diagrama de sectores de 60 alumnos, un sector mide 90°. ¿Cuántos alumnos son?', 'في مخطط دائري لـ 60 تلميذًا قطاع قياسه 90°. كم تلميذًا يمثّل؟'), expected: fraction(15), hint: say('90° zirkuluaren laurdena da.', '90° es un cuarto del círculo.', '90° ربع الدائرة.'), explanation: same('$\\frac{90}{360}\\cdot 60=15$') },
    { id: 107, stage: 'probability', context: 'advanced', points: 20, prompt: say('Poltsa batean 3 bola gorri, 5 urdin eta zenbait berde daude. Gorri bat ateratzeko probabilitatea 0,25 da. Zenbat bola berde daude?', 'En una bolsa hay 3 bolas rojas, 5 azules y algunas verdes. La probabilidad de sacar una roja es 0,25. ¿Cuántas bolas verdes hay?', 'في كيس 3 كرات حمراء و5 زرقاء وبعض الخضراء. احتمال سحب حمراء 0.25. كم كرة خضراء؟'), expected: fraction(4), hint: say('Lehenik, zenbat bola dauden guztira.', 'Primero, cuántas bolas hay en total.', 'أولًا كم كرة في المجموع.'), explanation: same('$3\\mathbin{:}0{,}25=12\\qquad 12-3-5=4$') },
    { id: 108, stage: 'tables', context: 'advanced', points: 20, prompt: say('80 pertsonako inkesta batean % 35ek «bai» esan dute eta % 45ek «ez»; gainerakoek ez dakite. Zenbat pertsonak ez dakite?', 'En una encuesta a 80 personas, el 35 % dice «sí» y el 45 % «no»; el resto no sabe. ¿Cuántas personas no saben?', 'في استبيان لـ 80 شخصًا قال 35 % «نعم» و45 % «لا» والباقون لا يعرفون. كم شخصًا لا يعرف؟'), expected: fraction(16), hint: say('Ehunekoek 100 dute batuta.', 'Los porcentajes suman 100.', 'مجموع النسب 100.'), explanation: same('$\\frac{80\\cdot(100-35-45)}{100}=16$') },
    { id: 109, stage: 'parameters', context: 'advanced', points: 20, prompt: say('Anai-arreba kopurua: 0 → 3 ikasle, 1 → 4, 2 → 2, 3 → 1. Zein da batez bestekoa?', 'Número de hermanos: 0 → 3 alumnos, 1 → 4, 2 → 2, 3 → 1. ¿Cuál es la media?', 'عدد الإخوة: 0 ← 3 تلاميذ، 1 ← 4، 2 ← 2، 3 ← 1. ما المتوسط؟'), expected: fraction(11, 10), hint: say('Biderkatu balio bakoitza bere maiztasunaz.', 'Multiplica cada valor por su frecuencia.', 'اضرب كل قيمة في تكرارها.'), explanation: same('$\\frac{0\\cdot 3+1\\cdot 4+2\\cdot 2+3\\cdot 1}{10}=1{,}1$') },
    { id: 110, stage: 'parameters', context: 'master', points: 30, prompt: say('Hiru zenbakiren batez bestekoa 10 da. Laugarren zenbaki bat gehituta, batez bestekoa 12 da. Zein da laugarren zenbakia?', 'La media de tres números es 10. Al añadir un cuarto número, la media pasa a 12. ¿Cuál es el cuarto número?', 'متوسط ثلاثة أعداد 10. وبإضافة عدد رابع يصبح المتوسط 12. ما العدد الرابع؟'), expected: fraction(18), hint: say('Konparatu baturak: 3 · 10 eta 4 · 12.', 'Compara las sumas: 3 · 10 y 4 · 12.', 'قارن المجموعين: 3 · 10 و4 · 12.'), explanation: same('$4\\cdot 12-3\\cdot 10=18$') },
    { id: 111, stage: 'probability', context: 'master', points: 30, prompt: say('Bi txanpon botatzen dira. Zein da bi aurpegi ateratzeko probabilitatea?', 'Se lanzan dos monedas. ¿Cuál es la probabilidad de sacar dos caras?', 'تُرمى قطعتا نقود. ما احتمال ظهور وجهين؟'), expected: fraction(1, 4), hint: say('E = {CC, CX, XC, XX}', 'E = {CC, CX, XC, XX}', 'E = {CC, CX, XC, XX}'), explanation: say('Lau kasu posible, aldeko bat: $\\frac{1}{4}=0{,}25$.', 'Cuatro casos posibles y uno favorable: $\\frac{1}{4}=0{,}25$.', 'أربع حالات ممكنة وحالة ملائمة واحدة: $\\frac{1}{4}=0.25$.') },
    { id: 112, stage: 'probability', context: 'master', points: 30, prompt: say('Bi dado jaurti eta puntuak batzen dira. Zein da 7 ateratzeko probabilitatea? (Zatiki gisa)', 'Se lanzan dos dados y se suman los puntos. ¿Cuál es la probabilidad de sacar 7? (Como fracción)', 'يُرمى نردان وتُجمع النقاط. ما احتمال الحصول على 7؟ (في صورة كسر)'), expected: fraction(1, 6), hint: say('6 · 6 = 36 kasu. Zenbatek ematen dute 7?', '6 · 6 = 36 casos. ¿Cuántos suman 7?', '6 · 6 = 36 حالة. كم منها مجموعه 7؟'), explanation: say('1+6, 2+5, 3+4, 4+3, 5+2, 6+1: $\\frac{6}{36}=\\frac{1}{6}$', '1+6, 2+5, 3+4, 4+3, 5+2, 6+1: $\\frac{6}{36}=\\frac{1}{6}$', '1+6، 2+5، 3+4، 4+3، 5+2، 6+1: $\\frac{6}{36}=\\frac{1}{6}$') }
]

export const statisticsIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'data',
        title: say('Datuak eta aldagaiak', 'Datos y variables', 'البيانات والمتغيرات'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Sailkatu aldagai hauek: a) kirol gogokoena; b) anai-arreba kopurua; c) altuera; d) jaioterria.', 'Clasifica estas variables: a) deporte favorito; b) número de hermanos; c) altura; d) lugar de nacimiento.', 'صنّف هذه المتغيرات: أ) الرياضة المفضلة؛ ب) عدد الإخوة؛ ج) الطول؛ د) مكان الولادة.'), solution: say('a) kualitatiboa; b) kuantitatibo diskretua; c) kuantitatibo jarraitua; d) kualitatiboa.', 'a) cualitativa; b) cuantitativa discreta; c) cuantitativa continua; d) cualitativa.', 'أ) نوعي؛ ب) كمي منفصل؛ ج) كمي متصل؛ د) نوعي.') },
            { id: 2, difficulty: 'easy', question: say('Udal batek herriko 5.000 familietatik 200i galdetu die zenbat auto dituzten. Zein da populazioa, lagina, banakoa eta aldagaia?', 'Un ayuntamiento pregunta a 200 de las 5.000 familias del pueblo cuántos coches tienen. ¿Cuál es la población, la muestra, el individuo y la variable?', 'سألت بلدية 200 من أصل 5000 أسرة عن عدد سياراتها. ما المجتمع والعيّنة والفرد والمتغير؟'), solution: say('Populazioa: 5.000 familiak. Lagina: 200 familia. Banakoa: familia bakoitza. Aldagaia: auto kopurua (kuantitatibo diskretua).', 'Población: las 5.000 familias. Muestra: 200 familias. Individuo: cada familia. Variable: número de coches (cuantitativa discreta).', 'المجتمع: 5000 أسرة. العيّنة: 200 أسرة. الفرد: كل أسرة. المتغير: عدد السيارات (كمي منفصل).') },
            { id: 3, difficulty: 'medium', question: say('Zergatik erabiltzen da askotan lagin bat populazio osoaren ordez? Jarri adibide bat.', '¿Por qué se usa muchas veces una muestra en lugar de toda la población? Pon un ejemplo.', 'لماذا نستعمل كثيرًا عيّنة بدل المجتمع كله؟ أعطِ مثالًا.'), solution: say('Populazioa oso handia delako, edo garestia edo motela litzatekeelako denei galdetzea. Adibidez, hauteskunde-inkesta batean milaka pertsonari galdetzen zaie, ez milioika.', 'Porque la población es muy grande o sería caro o lento preguntar a todos. Por ejemplo, en una encuesta electoral se pregunta a miles de personas, no a millones.', 'لأن المجتمع كبير جدًا أو لأن سؤال الجميع مكلف أو بطيء. مثلًا في استطلاع انتخابي يُسأل آلاف الأشخاص لا الملايين.') },
            { id: 4, difficulty: 'medium', question: say('Ikastetxeko 800 ikasleetatik % 15i galdetu nahi diegu. Zenbat ikasleri galdetuko diegu?', 'Queremos preguntar al 15 % de los 800 alumnos del instituto. ¿A cuántos alumnos preguntaremos?', 'نريد سؤال 15 % من 800 تلميذ في المدرسة. كم تلميذًا سنسأل؟'), solution: same('$800\\cdot 0{,}15=120$'), answer: { expected: fraction(120) } },
            { id: 5, difficulty: 'medium', question: say('Herriko kirol gogokoena jakiteko, futbol-partida bateko 50 zaleri galdetu diegu. Lagin ona da?', 'Para saber el deporte favorito del pueblo preguntamos a 50 aficionados en un partido de fútbol. ¿Es una buena muestra?', 'لمعرفة الرياضة المفضلة في البلدة سألنا 50 مشجعًا في مباراة كرة قدم. هل هي عيّنة جيدة؟'), solution: say('Ez: zale horiek futbola nahiago izango dute gehienbat. Lagina herritar mota guztiez osatu behar da, zoriz aukeratuta.', 'No: esos aficionados preferirán sobre todo el fútbol. La muestra debe incluir a todo tipo de vecinos, elegidos al azar.', 'لا: هؤلاء المشجعون يفضّلون كرة القدم غالبًا. يجب أن تضم العيّنة كل أنواع السكان مختارين عشوائيًا.') },
            { id: 6, difficulty: 'hard', question: say('Lagin bat populazioaren % 4 da eta 36 pertsonak osatzen dute. Zenbat pertsona ditu populazioak?', 'Una muestra es el 4 % de la población y la forman 36 personas. ¿Cuántas personas tiene la población?', 'عيّنة تمثّل 4 % من المجتمع وفيها 36 شخصًا. كم شخصًا في المجتمع؟'), solution: same('$36\\mathbin{:}0{,}04=900$'), answer: { expected: fraction(900) } }
        ]
    },
    {
        id: 'tables',
        title: say('Maiztasun-taulak', 'Tablas de frecuencias', 'جداول التكرارات'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Egin maiztasun-taula: urdina, gorria, urdina, berdea, urdina, gorria, horia, urdina, berdea, gorria.', 'Haz la tabla de frecuencias: azul, rojo, azul, verde, azul, rojo, amarillo, azul, verde, rojo.', 'أنشئ جدول التكرارات: أزرق، أحمر، أزرق، أخضر، أزرق، أحمر، أصفر، أزرق، أخضر، أحمر.'), solution: say('Urdina 4, gorria 3, berdea 2, horia 1; $4+3+2+1=10$.', 'Azul 4, rojo 3, verde 2, amarillo 1; $4+3+2+1=10$.', 'أزرق 4، أحمر 3، أخضر 2، أصفر 1؛ $4+3+2+1=10$.') },
            { id: 8, difficulty: 'easy', question: say('N = 50 eta fᵢ = 12. Kalkulatu hᵢ eta ehunekoa.', 'N = 50 y fᵢ = 12. Calcula hᵢ y el porcentaje.', 'N = 50 وfᵢ = 12. احسب hᵢ والنسبة المئوية.'), solution: same('$\\frac{12}{50}=0{,}24\\qquad 0{,}24\\cdot 100=24$'), answer: { expected: fraction(24, 100) } },
            { id: 9, difficulty: 'medium', question: say('Osatu: maiztasun absolutuak 5, 8, x eta 3 dira, N = 20. Kalkulatu x eta maiztasun erlatibo guztiak.', 'Completa: las frecuencias absolutas son 5, 8, x y 3, con N = 20. Calcula x y todas las frecuencias relativas.', 'أكمل: التكرارات المطلقة 5 و8 وx و3 وN = 20. احسب x وكل التكرارات النسبية.'), solution: same('$20-5-8-3=4\\qquad 0{,}25+0{,}4+0{,}2+0{,}15=1$'), answer: { expected: fraction(4) } },
            { id: 10, difficulty: 'medium', question: say('Egin maiztasun-taula nota hauekin: 5, 6, 7, 5, 8, 6, 5, 9, 7, 6, 5, 8.', 'Haz la tabla de frecuencias con estas notas: 5, 6, 7, 5, 8, 6, 5, 9, 7, 6, 5, 8.', 'أنشئ جدول التكرارات لهذه العلامات: 5، 6، 7، 5، 8، 6، 5، 9، 7، 6، 5، 8.'), solution: say('5 → 4; 6 → 3; 7 → 2; 8 → 2; 9 → 1. Guztira $4+3+2+2+1=12$.', '5 → 4; 6 → 3; 7 → 2; 8 → 2; 9 → 1. En total $4+3+2+2+1=12$.', '5 ← 4؛ 6 ← 3؛ 7 ← 2؛ 8 ← 2؛ 9 ← 1. المجموع $4+3+2+2+1=12$.') },
            { id: 11, difficulty: 'medium', question: say('hᵢ = 0,35 eta N = 40. Zenbat da fᵢ?', 'hᵢ = 0,35 y N = 40. ¿Cuánto vale fᵢ?', 'hᵢ = 0.35 وN = 40. كم fᵢ؟'), solution: same('$0{,}35\\cdot 40=14$'), answer: { expected: fraction(14) } },
            { id: 12, difficulty: 'hard', question: say('Maiztasun erlatiboak 0,1, 0,3, 0,4 eta 0,2 dira, eta N = 30. Kalkulatu maiztasun absolutuak.', 'Las frecuencias relativas son 0,1, 0,3, 0,4 y 0,2, y N = 30. Calcula las frecuencias absolutas.', 'التكرارات النسبية 0.1 و0.3 و0.4 و0.2 وN = 30. احسب التكرارات المطلقة.'), solution: same('$0{,}1\\cdot 30=3\\qquad 0{,}3\\cdot 30=9\\qquad 0{,}4\\cdot 30=12\\qquad 0{,}2\\cdot 30=6$') }
        ]
    },
    {
        id: 'graphs',
        title: say('Grafikoak', 'Gráficos', 'التمثيلات البيانية'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Zein grafiko erabiliko zenuke: a) aste bateko tenperaturak; b) kirol gogokoenen banaketa ehunekotan?', '¿Qué gráfico usarías para: a) las temperaturas de una semana; b) el reparto en porcentajes de los deportes favoritos?', 'أيّ مخطط تستعمل لـ: أ) درجات حرارة أسبوع؛ ب) توزيع الرياضات المفضلة بالنسب المئوية؟'), solution: say('a) lerro-diagrama (aldaketa denboran); b) sektore-diagrama (osoaren zatiak).', 'a) diagrama de líneas (cambio en el tiempo); b) diagrama de sectores (partes de un total).', 'أ) مخطط خطي (تغيّر مع الزمن)؛ ب) مخطط دائري (أجزاء من الكل).') },
            { id: 14, difficulty: 'easy', question: say('Egin barra-diagrama: urdina 4, gorria 3, berdea 2, horia 1.', 'Haz el diagrama de barras: azul 4, rojo 3, verde 2, amarillo 1.', 'ارسم مخطط الأعمدة: أزرق 4، أحمر 3، أخضر 2، أصفر 1.'), solution: say('Lau barra, 4, 3, 2 eta 1 unitateko altuerarekin; ardatz bertikala 0tik 4ra.', 'Cuatro barras de alturas 4, 3, 2 y 1; eje vertical de 0 a 4.', 'أربعة أعمدة ارتفاعاتها 4 و3 و2 و1؛ والمحور الرأسي من 0 إلى 4.') },
            { id: 15, difficulty: 'medium', question: say('Kalkulatu sektore-diagramako angeluak: urdina 4, gorria 3, berdea 2, horia 1.', 'Calcula los ángulos del diagrama de sectores: azul 4, rojo 3, verde 2, amarillo 1.', 'احسب زوايا المخطط الدائري: أزرق 4، أحمر 3، أخضر 2، أصفر 1.'), solution: same('$360\\mathbin{:}10=36\\qquad 4\\cdot 36=144\\qquad 3\\cdot 36=108\\qquad 2\\cdot 36=72\\qquad 1\\cdot 36=36$') },
            { id: 16, difficulty: 'medium', question: say('Sektore baten angelua 54° da eta N = 40. Zenbat datu ditu sektoreak?', 'Un sector mide 54° y N = 40. ¿Cuántos datos tiene el sector?', 'قطاع قياسه 54° وN = 40. كم قيمة فيه؟'), solution: same('$360\\mathbin{:}40=9\\qquad 54\\mathbin{:}9=6$'), answer: { expected: fraction(6) } },
            { id: 17, difficulty: 'medium', question: say('Lerro-diagrama batean tenperaturak: astelehena 14°, asteartea 16°, asteazkena 15°, osteguna 18°, ostirala 21°. Zenbat gradu igo da astelehenetik ostiralera?', 'En un diagrama de líneas las temperaturas son: lunes 14°, martes 16°, miércoles 15°, jueves 18°, viernes 21°. ¿Cuántos grados ha subido del lunes al viernes?', 'في مخطط خطي درجات الحرارة: الاثنين 14°، الثلاثاء 16°، الأربعاء 15°، الخميس 18°، الجمعة 21°. كم درجة ارتفعت من الاثنين إلى الجمعة؟'), solution: same('$21-14=7$'), answer: { expected: fraction(7) } },
            { id: 18, difficulty: 'hard', question: say('Sektore-diagrama batean A sektoreak 90° ditu, B-k 120° eta C-k gainerakoa. N = 36 bada, zenbat datu ditu C-k?', 'En un diagrama de sectores, A mide 90°, B 120° y C el resto. Si N = 36, ¿cuántos datos tiene C?', 'في مخطط دائري القطاع A قياسه 90° وB قياسه 120° وC الباقي. إذا كان N = 36 فكم قيمة في C؟'), solution: same('$360-90-120=150\\qquad \\frac{150}{360}\\cdot 36=15$'), answer: { expected: fraction(15) } }
        ]
    },
    {
        id: 'parameters',
        title: say('Parametroak', 'Parámetros', 'المقاييس'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Kalkulatu 2, 4, 6, 8, 10 datuen batez bestekoa.', 'Calcula la media de 2, 4, 6, 8, 10.', 'احسب متوسط 2، 4، 6، 8، 10.'), solution: same('$\\frac{2+4+6+8+10}{5}=6$'), answer: { expected: fraction(6) } },
            { id: 20, difficulty: 'easy', question: say('Aurkitu 3, 5, 5, 6, 8, 9, 5 datuen mediana eta moda.', 'Halla la mediana y la moda de 3, 5, 5, 6, 8, 9, 5.', 'أوجد الوسيط والمنوال لـ 3، 5، 5، 6، 8، 9، 5.'), solution: say('Ordenatuta: 3, 5, 5, 5, 6, 8, 9. Mediana 5 eta moda 5.', 'Ordenados: 3, 5, 5, 5, 6, 8, 9. Mediana 5 y moda 5.', 'بعد الترتيب: 3، 5، 5، 5، 6، 8، 9. الوسيط 5 والمنوال 5.') },
            { id: 21, difficulty: 'medium', question: say('Aurkitu 12, 15, 11, 18 datuen mediana.', 'Halla la mediana de 12, 15, 11, 18.', 'أوجد وسيط 12، 15، 11، 18.'), solution: say('11, 12, 15, 18 → $\\frac{12+15}{2}=13{,}5$', '11, 12, 15, 18 → $\\frac{12+15}{2}=13{,}5$', '11، 12، 15، 18 ← $\\frac{12+15}{2}=13.5$'), answer: { expected: fraction(27, 2) } },
            { id: 22, difficulty: 'medium', question: say('Zein da 3, 12, 7, 9, 5 datuen ibiltartea?', '¿Cuál es el rango de 3, 12, 7, 9, 5?', 'ما مدى 3، 12، 7، 9، 5؟'), solution: same('$12-3=9$'), answer: { expected: fraction(9) } },
            { id: 23, difficulty: 'medium', question: say('Kalkulatu batez bestekoa: 1 → 2 aldiz, 2 → 5 aldiz, 3 → 2 aldiz, 4 → behin.', 'Calcula la media: 1 → 2 veces, 2 → 5 veces, 3 → 2 veces, 4 → una vez.', 'احسب المتوسط: 1 ← مرتان، 2 ← 5 مرات، 3 ← مرتان، 4 ← مرة.'), solution: same('$\\frac{1\\cdot 2+2\\cdot 5+3\\cdot 2+4\\cdot 1}{10}=2{,}2$'), answer: { expected: fraction(11, 5) } },
            { id: 24, difficulty: 'hard', question: say('Bost lagunen adinen batez bestekoa 12 urte da. 18 urteko seigarren bat batzen zaie. Zein da batez besteko berria?', 'La media de edad de cinco amigos es 12 años. Se une un sexto de 18 años. ¿Cuál es la nueva media?', 'متوسط أعمار خمسة أصدقاء 12 سنة. انضم إليهم سادس عمره 18 سنة. ما المتوسط الجديد؟'), solution: same('$\\frac{5\\cdot 12+18}{6}=13$'), answer: { expected: fraction(13) } }
        ]
    },
    {
        id: 'probability',
        title: say('Probabilitatea', 'Probabilidad', 'الاحتمال'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Aleatorioak ala deterministak? a) karta bat ateratzea; b) harri bat askatu eta erortzen den ikustea; c) loteria; d) 10 km 5 km/h-an egiteko behar den denbora.', '¿Aleatorios o deterministas? a) sacar una carta; b) soltar una piedra y ver si cae; c) la lotería; d) el tiempo para recorrer 10 km a 5 km/h.', 'عشوائية أم حتمية؟ أ) سحب ورقة لعب؛ ب) إفلات حجر ورؤية هل يسقط؛ ج) اليانصيب؛ د) زمن قطع 10 كم بسرعة 5 كم/س.'), solution: say('a) aleatorioa; b) determinista; c) aleatorioa; d) determinista (2 ordu).', 'a) aleatorio; b) determinista; c) aleatorio; d) determinista (2 horas).', 'أ) عشوائية؛ ب) حتمية؛ ج) عشوائية؛ د) حتمية (ساعتان).') },
            { id: 26, difficulty: 'easy', question: say('Idatzi lagin-espazioa: a) txanpon bat botatzea; b) dado bat jaurtitzea; c) 1etik 5era zenbakitutako bola bat ateratzea.', 'Escribe el espacio muestral: a) lanzar una moneda; b) lanzar un dado; c) sacar una bola numerada del 1 al 5.', 'اكتب فضاء العيّنة: أ) رمي قطعة نقود؛ ب) رمي نرد؛ ج) سحب كرة مرقّمة من 1 إلى 5.'), solution: same('a) $\\{C,X\\}$; b) $\\{1,2,3,4,5,6\\}$; c) $\\{1,2,3,4,5\\}$') },
            { id: 27, difficulty: 'medium', question: say('Dado bat jaurtitzean, idatzi gertaera ziur bat, ezinezko bat eta oinarrizko bat.', 'Al lanzar un dado, escribe un suceso seguro, uno imposible y uno elemental.', 'عند رمي نرد اكتب حدثًا أكيدًا وآخر مستحيلًا وآخر بسيطًا.'), solution: say('Ziurra: «7 baino gutxiago ateratzea». Ezinezkoa: «8 ateratzea». Oinarrizkoa: «5 ateratzea» = {5}.', 'Seguro: «sacar menos de 7». Imposible: «sacar un 8». Elemental: «sacar un 5» = {5}.', 'أكيد: «أقل من 7». مستحيل: «الحصول على 8». بسيط: «الحصول على 5» = {5}.') },
            { id: 28, difficulty: 'medium', question: say('Poltsa batean 5 bola gorri, 3 urdin eta 2 berde daude. Zein da berde bat ateratzeko probabilitatea?', 'En una bolsa hay 5 bolas rojas, 3 azules y 2 verdes. ¿Cuál es la probabilidad de sacar una verde?', 'في كيس 5 كرات حمراء و3 زرقاء و2 خضراوان. ما احتمال سحب خضراء؟'), solution: same('$\\frac{2}{10}=0{,}2$'), answer: { expected: fraction(1, 5) } },
            { id: 29, difficulty: 'medium', question: say('Dado bat jaurtitzean, zein da 3ren multiplo bat ateratzeko probabilitatea?', 'Al lanzar un dado, ¿cuál es la probabilidad de sacar un múltiplo de 3?', 'عند رمي نرد ما احتمال الحصول على مضاعف لـ 3؟'), solution: say('Aldekoak 3 eta 6: $\\frac{2}{6}=\\frac{1}{3}$', 'Favorables 3 y 6: $\\frac{2}{6}=\\frac{1}{3}$', 'الملائمة 3 و6: $\\frac{2}{6}=\\frac{1}{3}$'), answer: { expected: fraction(1, 3) } },
            { id: 30, difficulty: 'hard', question: say('Txanpon bat 50, 500 eta 5.000 aldiz bota da, eta 29, 243 eta 2.507 aurpegi atera dira. Kalkulatu maiztasun erlatiboak. Zer ondorioztatzen duzu?', 'Se lanza una moneda 50, 500 y 5.000 veces y salen 29, 243 y 2.507 caras. Calcula las frecuencias relativas. ¿Qué concluyes?', 'رُميت قطعة نقود 50 و500 و5000 مرة فظهر الوجه 29 و243 و2507 مرة. احسب التكرارات النسبية. ماذا تستنتج؟'), solution: say('$\\frac{29}{50}=0{,}58\\qquad \\frac{243}{500}=0{,}486\\qquad \\frac{2\\,507}{5\\,000}=0{,}5014$. Zenbat eta saiakera gehiago, orduan eta hurbilago 0,5 probabilitatetik.', '$\\frac{29}{50}=0{,}58\\qquad \\frac{243}{500}=0{,}486\\qquad \\frac{2\\,507}{5\\,000}=0{,}5014$. Cuantos más lanzamientos, más cerca de la probabilidad 0,5.', '$\\frac{29}{50}=0.58\\qquad \\frac{243}{500}=0.486\\qquad \\frac{2\\,507}{5\\,000}=0.5014$. كلما زادت الرميات اقتربنا من الاحتمال 0.5.') }
        ]
    }
]
