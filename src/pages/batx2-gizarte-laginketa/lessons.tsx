import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AllSamplesFigure, BatteriesFigure, BiasFigure, BiggerSampleFigure, CombFigure, EqualFigure, LuggageFigure, MeanBandFigure, ProportionBandFigure, ProportionBellFigure, ProportionTailFigure, SchoolStrataFigure, SpendingFigure, VotersFigure, WeightsFigure } from './figures'
import { samplingBatx2gLessonChecks, type SamplingBatx2gTopicId } from './lessonChecks'
import { samplingBatx2gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. A
   unit with no twin in Ciencias: Anaya unit 11 (samples), the opening of
   Santillana units 11 and 12 and the first sections of Anaya units 12 and
   13. Population and sample, bias, simple, systematic and stratified
   sampling, the distribution of the sample mean (and of the sum, with the
   central limit theorem), the sample proportion and the characteristic
   intervals of both. All the exercises and numbers are our own; the
   normal values come from the table of 2.º Ciencias. Notation: \bar{X},
   \hat{p}, N(\mu;\,\sigma), \frac{\sigma}{\sqrt{n}}.
   ========================================================================== */

export type SamplingBatx2gStageId = 'sampling' | 'strata' | 'means' | 'proportions' | 'characteristic'

export const samplingBatx2gStages: UnitStage[] = [
    { id: 'sampling', tone: 'blue', title: { eu: 'Populazioa eta lagina', es: 'Población y muestra', en: 'Population and sample', ar: 'المجتمع والعيّنة' } },
    { id: 'strata', tone: 'violet', title: { eu: 'Laginketa geruzatua', es: 'Muestreo estratificado', en: 'Stratified sampling', ar: 'المعاينة الطبقية' } },
    { id: 'means', tone: 'mustard', title: { eu: 'Laginaren batez bestekoa', es: 'La media muestral', en: 'The sample mean', ar: 'متوسط العيّنة' } },
    { id: 'proportions', tone: 'coral', title: { eu: 'Laginaren proportzioa', es: 'La proporción muestral', en: 'The sample proportion', ar: 'نسبة العيّنة' } },
    { id: 'characteristic', tone: 'green', title: { eu: 'Tarte karakteristikoak', es: 'Intervalos característicos', en: 'Characteristic intervals', ar: 'الفترات المميزة' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    population: { unit: 'batx1-zientziak/estadistica', topic: 'population-sample', title: { eu: 'Populazioa, lagina eta aldagaiak', es: 'Población, muestra y variables', en: 'Population, sample and variables', ar: 'المجتمع والعيّنة والمتغيرات' } },
    standardize: { unit: 'batx2-gizarte/binomial-normal', topic: 'standardize', title: { eu: 'Tipifikatzea', es: 'Tipificar', en: 'Standardising', ar: 'التوحيد المعياري' } },
    normal: { unit: 'batx2-gizarte/binomial-normal', topic: 'normal-curve', title: { eu: 'Banaketa normala', es: 'La distribución normal', en: 'The normal distribution', ar: 'التوزيع الطبيعي' } },
    approx: { unit: 'batx2-gizarte/binomial-normal', topic: 'binomial-to-normal', title: { eu: 'Binomiala normalarekin hurbiltzea', es: 'La binomial aproximada por la normal', en: 'The binomial approximated by the normal', ar: 'تقريب الثنائي بالطبيعي' } },
    interval: { unit: 'batx2-gizarte/binomial-normal', topic: 'characteristic-interval', title: { eu: 'Tarte karakteristikoa', es: 'El intervalo característico', en: 'The characteristic interval', ar: 'الفترة المميزة' } },
    mean: { unit: 'batx2-gizarte/binomial-normal', topic: 'mean-variance', title: { eu: 'Batez bestekoa eta desbideratze tipikoa', es: 'Media y desviación típica', en: 'Mean and standard deviation', ar: 'المتوسط والانحراف المعياري' } }
}

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Population and sample ---------- */
    {
        id: 'population-sample',
        stage: 'sampling',
        title: say('Populazioa eta lagina', 'Población y muestra', 'المجتمع والعيّنة', 'Population and sample'),
        goal: say('Populazioa eta lagina bereiztea, eta lagin bat noiz eta zergatik erabiltzen den ulertzea.', 'Distinguir población y muestra, y entender cuándo y por qué se usa una muestra.', 'التمييز بين المجتمع والعيّنة، وفهم متى ولماذا تُستعمل العيّنة.', 'Tell the population from the sample, and understand when and why a sample is used.'),
        needs: [need.population],
        problem: say('Fabrika batek bere baterien iraupena jakin nahi du, eta 50 bateria probatzen ditu agortu arte. Zein da populazioa? Eta lagina? Zergatik ez dira bateria guztiak probatzen?', 'Una fábrica quiere saber cuánto duran sus baterías y prueba 50 hasta que se agotan. ¿Cuál es la población? ¿Y la muestra? ¿Por qué no se prueban todas?', 'تريد مصنع معرفة مدة بطارياته فيجرّب 50 منها حتى تنفد. ما المجتمع؟ وما العيّنة؟ ولماذا لا تُجرَّب كلها؟', 'A factory wants to know how long its batteries last and tests 50 until they run out. What is the population? And the sample? Why are not all of them tested?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Populazioa: fabrikak egiten dituen bateria guztiak.', 'Población: todas las baterías que fabrica la fábrica.', 'المجتمع: كل البطاريات التي يصنعها المصنع.', 'Population: all the batteries the factory makes.') },
            { text: say('Lagina: probatutako 50 baterien multzoa.', 'Muestra: las 50 baterías probadas.', 'العيّنة: البطاريات الخمسون المجرَّبة.', 'Sample: the 50 batteries tested.') },
            { text: say('Proba suntsitzailea da: bateria guztiak probatuz gero, ez litzateke bat ere geratuko saltzeko.', 'La prueba es destructiva: si se probaran todas, no quedaría ninguna para vender.', 'الاختبار متلف: لو جُرّبت كلها لما بقيت واحدة للبيع.', 'The test is destructive: if all were tested, none would be left to sell.') }
        ],
        takeaway: say(
            'Populazioa aztertu nahi den multzo osoa da, eta lagina haren zati bat. Lagina erabiltzen da populazioa handiegia, garestiegia edo eskuraezina denean, edo proba suntsitzailea denean.',
            'La población es todo el conjunto que se quiere estudiar, y la muestra una parte de ella. Se usa una muestra cuando la población es muy grande, cara o inaccesible, o cuando la prueba es destructiva.',
            'المجتمع هو كل المجموعة التي نريد دراستها، والعيّنة جزء منها. وتُستعمل العيّنة عندما يكون المجتمع كبيرًا جدًّا أو مكلفًا أو صعب الوصول، أو عندما يكون الاختبار متلفًا.',
            'The population is the whole set to be studied, and the sample is a part of it. A sample is used when the population is too large, expensive or out of reach, or when the test is destructive.'
        ),
        figure: (language) => <BatteriesFigure language={language} />
    },
    {
        id: 'bias',
        stage: 'sampling',
        title: say('Lagin adierazgarriak eta alborapena', 'Muestras representativas y sesgo', 'العيّنات الممثلة والتحيّز', 'Representative samples and bias'),
        goal: say('Lagin bat adierazgarria den erabakitzea eta alborapenaren arrazoiak aurkitzea.', 'Decidir si una muestra es representativa y encontrar las causas de un sesgo.', 'تقرير ما إذا كانت العيّنة ممثلة وإيجاد أسباب التحيّز.', 'Decide whether a sample is representative and find the causes of a bias.'),
        problem: say('Bizilagunek bidegorri bat nahi duten jakiteko, 100 pertsonari galdetzen zaie kiroldegi baten atean. Lagin adierazgarria da?', 'Para saber si los vecinos quieren un carril bici, se pregunta a 100 personas en la puerta de un polideportivo. ¿Es una muestra representativa?', 'لمعرفة ما إذا كان السكان يريدون مسارًا للدراجات، يُسأل 100 شخص عند باب مركز رياضي. هل العيّنة ممثلة؟', 'To find out whether residents want a cycle lane, 100 people are asked at the door of a sports centre. Is the sample representative?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kiroldegira doazenak kirolariagoak dira, eta bizikleta gehiago erabiltzen dute.', 'Los que van al polideportivo son más deportistas y usan más la bici.', 'مرتادو المركز الرياضي أكثر رياضة ويستعملون الدراجة أكثر.', 'Those who go to the sports centre are sportier and cycle more.') },
            { text: say('Bizilagun batzuek (adinekoek, kirolik egiten ez dutenek) aukera gutxiago dute galdetuak izateko.', 'Algunos vecinos (mayores, quienes no hacen deporte) tienen menos opciones de ser preguntados.', 'لبعض السكان (كبار السن ومن لا يمارسون الرياضة) فرص أقل في أن يُسألوا.', 'Some residents (older people, those who do no sport) are less likely to be asked.') },
            { text: say('Ez da adierazgarria: alborapena dago, emaitzak «bai» aldera makurtzen ditu.', 'No es representativa: hay sesgo, que inclina el resultado hacia el «sí».', 'ليست ممثلة: هناك تحيّز يميل بالنتيجة نحو «نعم».', 'It is not representative: there is a bias that tilts the result towards ‘yes’.') }
        ],
        takeaway: say(
            'Lagin bat adierazgarria da populazioaren antzekoa bada. Horretarako, zoriz aukeratzen da: populazioko kide guztiek aukera bera izan behar dute. Talde batzuk kanpoan uzten dituen aukeraketak alborapena sortzen du.',
            'Una muestra es representativa si se parece a la población. Para ello se elige al azar: todos los miembros de la población deben tener la misma oportunidad. Una elección que deja fuera a algunos grupos produce sesgo.',
            'تكون العيّنة ممثلة إذا شابهت المجتمع. ولذلك تُختار عشوائيًّا: يجب أن تكون لكل أفراد المجتمع الفرصة نفسها. والاختيار الذي يستبعد بعض المجموعات يولّد تحيّزًا.',
            'A sample is representative if it looks like the population. That is why it is chosen at random: every member of the population must have the same chance. A choice that leaves some groups out produces bias.'
        ),
        figure: (language) => <BiasFigure language={language} />
    },
    {
        id: 'simple-systematic',
        stage: 'sampling',
        title: say('Ausazko laginketa sinplea eta sistematikoa', 'Muestreo aleatorio simple y sistemático', 'المعاينة العشوائية البسيطة والمنتظمة', 'Simple and systematic random sampling'),
        goal: say('Lagin bat zozketa bidez eta modu sistematikoan aukeratzea, $h=\\frac{N}{n}$ jauziarekin.', 'Elegir una muestra por sorteo y de forma sistemática, con el salto $h=\\frac{N}{n}$.', 'اختيار عيّنة بالقرعة وبطريقة منتظمة بالقفزة $h=\\frac{N}{n}$.', 'Choose a sample by drawing lots and systematically, with the step $h=\\frac{N}{n}$.'),
        problem: say('600 bazkideko elkarte batek 20 pertsonako lagin sistematiko bat nahi du. Lehenengoa zozketatuta 13 atera da. Zein bazkide aukeratzen dira?', 'Una asociación de 600 socios quiere una muestra sistemática de 20 personas. Al sortear el primero sale el 13. ¿Qué socios se eligen?', 'تريد جمعية من 600 عضو عيّنة منتظمة من 20 شخصًا. عند سحب الأول خرج 13. أي الأعضاء يُختارون؟', 'An association of 600 members wants a systematic sample of 20 people. Drawing the first one gives 13. Which members are chosen?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jauzia: populazioa zati lagina.', 'El salto: población entre muestra.', 'القفزة: المجتمع على العيّنة.', 'The step: population over sample.'), math: same('$h=\\frac{600}{20}=30$') },
            { text: say('Hasi 13 zenbakian eta gehitu 30, behin eta berriz.', 'Empieza en el 13 y suma 30 una y otra vez.', 'ابدأ من 13 وأضف 30 مرة بعد مرة.', 'Start at 13 and add 30 again and again.'), math: same('$13,\\ 43,\\ 73,\\ \\dots$') },
            { text: say('Azkena, hogeigarrena:', 'El último, el vigésimo:', 'الأخير هو العشرون:', 'The last one, the twentieth:'), math: same('$13+19\\cdot 30=583$') }
        ],
        takeaway: say(
            'Ausazko laginketa sinplean, $n$ kide zozketatzen dira $N$ kideen artean. Sistematikoan, $h=\\frac{N}{n}$ jauzia kalkulatzen da, lehenengoa 1 eta $h$ artean zozketatzen da, eta $h$ gehitzen da behin eta berriz.',
            'En el muestreo aleatorio simple se sortean $n$ miembros entre los $N$. En el sistemático se calcula el salto $h=\\frac{N}{n}$, se sortea el primero entre 1 y $h$, y se suma $h$ una y otra vez.',
            'في المعاينة العشوائية البسيطة يُسحب $n$ عضوًا من بين $N$. وفي المنتظمة نحسب القفزة $h=\\frac{N}{n}$، ونسحب الأول بين 1 و$h$، ثم نضيف $h$ مرة بعد مرة.',
            'In simple random sampling, $n$ members are drawn among the $N$. In systematic sampling the step $h=\\frac{N}{n}$ is worked out, the first one is drawn between 1 and $h$, and $h$ is added again and again.'
        ),
        figure: (language) => <CombFigure language={language} />
    },

    /* ---------- 2. Stratified sampling ---------- */
    {
        id: 'proportional-allocation',
        stage: 'strata',
        title: say('Esleipen proportzionala', 'Afijación proporcional', 'التوزيع التناسبي', 'Proportional allocation'),
        goal: say('Lagin geruzatu bat egitea: geruza bakoitzari populazioan duen proportzio bera ematea.', 'Hacer una muestra estratificada: dar a cada estrato la misma proporción que tiene en la población.', 'تكوين عيّنة طبقية: إعطاء كل طبقة النسبة نفسها التي لها في المجتمع.', 'Make a stratified sample: give each stratum the same share it has in the population.'),
        problem: say('Ikastetxe batek 700 ikasle ditu: 330 lehen mailan, 250 bigarrenean eta 120 hirugarrenean. 56 ikasleko lagin bat nahi da, esleipen proportzionalarekin. Zenbat maila bakoitzetik?', 'Un instituto tiene 700 alumnos: 330 en 1.º, 250 en 2.º y 120 en 3.º. Se quiere una muestra de 56 con afijación proporcional. ¿Cuántos de cada curso?', 'في معهد 700 طالب: 330 في الأولى و250 في الثانية و120 في الثالثة. تُراد عيّنة من 56 بالتوزيع التناسبي. كم من كل صف؟', 'A school has 700 students: 330 in year 1, 250 in year 2 and 120 in year 3. A sample of 56 with proportional allocation is wanted. How many from each year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laginaren zatia populazioan:', 'La fracción de la muestra en la población:', 'كسر العيّنة في المجتمع:', 'The sample\'s fraction of the population:'), math: same('$\\frac{56}{700}=0{,}08$') },
            { text: say('Maila bakoitza bider 0,08.', 'Cada curso por 0,08.', 'كل صف في 0.08.', 'Each year times 0.08.'), math: same('$330\\cdot 0{,}08=26{,}4\\qquad 250\\cdot 0{,}08=20\\qquad 120\\cdot 0{,}08=9{,}6$') },
            { text: say('Zati osoek 55 egiten dute; falta den bat hondar handienari: 26, 20 eta 10.', 'Las partes enteras suman 55; el que falta, al mayor resto: 26, 20 y 10.', 'مجموع الأجزاء الصحيحة 55؛ والناقص لصاحب أكبر باقٍ: 26 و20 و10.', 'The whole parts add up to 55; the missing one goes to the largest remainder: 26, 20 and 10.') }
        ],
        takeaway: say(
            'Laginketa geruzatuan, populazioa geruzatan banatzen da (mailak, auzoak, adin-taldeak). Esleipen proportzionalean, geruza bakoitzak $n\\cdot\\frac{N_i}{N}$ kide ditu. Zatiak ez badira osoak, hondar handienei gehitzen zaie falta dena.',
            'En el muestreo estratificado la población se divide en estratos (cursos, barrios, edades). Con afijación proporcional, cada estrato tiene $n\\cdot\\frac{N_i}{N}$ miembros. Si no salen enteros, lo que falta se da a los mayores restos.',
            'في المعاينة الطبقية يُقسَّم المجتمع إلى طبقات (صفوف، أحياء، أعمار). وفي التوزيع التناسبي يكون لكل طبقة $n\\cdot\\frac{N_i}{N}$ عضوًا. وإذا لم تكن الأعداد صحيحة يُعطى الناقص لأكبر البواقي.',
            'In stratified sampling the population is split into strata (years, districts, age groups). With proportional allocation, each stratum gets $n\\cdot\\frac{N_i}{N}$ members. If they are not whole numbers, what is missing goes to the largest remainders.'
        ),
        figure: (language) => <SchoolStrataFigure language={language} />
    },
    {
        id: 'equal-allocation',
        stage: 'strata',
        title: say('Esleipen berdina', 'Afijación igual', 'التوزيع المتساوي', 'Equal allocation'),
        goal: say('Esleipen berdina eta proportzionala konparatzea, eta noiz den egokia geruzatzea.', 'Comparar la afijación igual y la proporcional, y cuándo conviene estratificar.', 'مقارنة التوزيع المتساوي بالتناسبي، ومتى يحسن التقسيم إلى طبقات.', 'Compare equal and proportional allocation, and when stratifying is worth it.'),
        problem: say('Herri batek hiru auzo ditu, 2000, 5000 eta 3000 biztanlerekin. 300 pertsonako lagin bat nahi da. Nola banatzen da esleipen berdinarekin? Eta proportzionalarekin?', 'Un pueblo tiene tres barrios de 2000, 5000 y 3000 habitantes. Se quiere una muestra de 300 personas. ¿Cómo se reparte con afijación igual? ¿Y con proporcional?', 'لقرية ثلاثة أحياء فيها 2000 و5000 و3000 نسمة. تُراد عيّنة من 300 شخص. كيف تُوزَّع بالتوزيع المتساوي؟ وبالتناسبي؟', 'A town has three districts of 2000, 5000 and 3000 people. A sample of 300 is wanted. How is it split with equal allocation? And with proportional?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Esleipen berdina: auzo bakoitzari kopuru bera.', 'Afijación igual: el mismo número a cada barrio.', 'التوزيع المتساوي: العدد نفسه لكل حي.', 'Equal allocation: the same number for each district.'), math: same('$\\frac{300}{3}=100$') },
            { text: say('Proportzionala: lagina populazioaren % 3 da.', 'Proporcional: la muestra es el 3 % de la población.', 'التناسبي: العيّنة 3 % من المجتمع.', 'Proportional: the sample is 3% of the population.'), math: same('$2000\\cdot 0{,}03=60\\qquad 5000\\cdot 0{,}03=150\\qquad 3000\\cdot 0{,}03=90$') }
        ],
        takeaway: say(
            'Esleipen berdinak geruza bakoitzari $\\frac{n}{k}$ kide ematen dizkio, geruza txikiak ere ondo aztertzeko. Proportzionalak populazioaren itxura gordetzen du. Geruzatzea merezi du geruzen artean desberdintasun handiak daudenean.',
            'La afijación igual da $\\frac{n}{k}$ miembros a cada estrato, para estudiar bien también los pequeños. La proporcional conserva la forma de la población. Estratificar merece la pena cuando hay grandes diferencias entre estratos.',
            'يعطي التوزيع المتساوي كل طبقة $\\frac{n}{k}$ عضوًا لدراسة الطبقات الصغيرة جيدًا أيضًا. ويحافظ التناسبي على شكل المجتمع. ويستحق التقسيم إلى طبقات عندما تكون الفروق بينها كبيرة.',
            'Equal allocation gives each stratum $\\frac{n}{k}$ members, so small strata are studied well too. Proportional allocation keeps the shape of the population. Stratifying is worth it when the strata differ a lot.'
        ),
        figure: (language) => <EqualFigure language={language} />
    },

    /* ---------- 3. The sample mean ---------- */
    {
        id: 'all-samples',
        stage: 'means',
        title: say('Lagin posible guztiak', 'Todas las muestras posibles', 'كل العيّنات الممكنة', 'All the possible samples'),
        goal: say('Populazio txiki baten lagin guztiak idaztea eta ikustea haien batez bestekoen batez bestekoa $\\mu$ dela.', 'Escribir todas las muestras de una población pequeña y ver que la media de sus medias es $\\mu$.', 'كتابة كل عيّنات مجتمع صغير ورؤية أن متوسط متوسطاتها هو $\\mu$.', 'Write all the samples of a small population and see that the mean of their means is $\\mu$.'),
        needs: [need.mean],
        problem: say('Populazioa 2, 4 eta 6 zenbakiak dira. Idatzi 2 tamainako lagin guztiak, itzulita, eta kalkulatu haien batez bestekoen batez bestekoa.', 'La población son los números 2, 4 y 6. Escribe todas las muestras de tamaño 2 con reemplazamiento y calcula la media de sus medias.', 'المجتمع هو الأعداد 2 و4 و6. اكتب كل العيّنات ذات الحجم 2 مع الإرجاع واحسب متوسط متوسطاتها.', 'The population is the numbers 2, 4 and 6. Write all the samples of size 2 with replacement and work out the mean of their means.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3\\cdot 3=9$ lagin daude: (2, 2), (2, 4)… (6, 6).', 'Hay $3\\cdot 3=9$ muestras: (2, 2), (2, 4)… (6, 6).', 'هناك $3\\cdot 3=9$ عيّنات: (2، 2) و(2، 4)… (6، 6).', 'There are $3\\cdot 3=9$ samples: (2, 2), (2, 4)… (6, 6).') },
            { text: say('Haien batez bestekoak: 2, 3, 4, 3, 4, 5, 4, 5 eta 6.', 'Sus medias: 2, 3, 4, 3, 4, 5, 4, 5 y 6.', 'متوسطاتها: 2 و3 و4 و3 و4 و5 و4 و5 و6.', 'Their means: 2, 3, 4, 3, 4, 5, 4, 5 and 6.') },
            { text: say('Batez bestekoen batez bestekoa:', 'La media de las medias:', 'متوسط المتوسطات:', 'The mean of the means:'), math: same('$\\frac{36}{9}=4=\\mu$') }
        ],
        takeaway: say(
            'Lagin bakoitzak bere batez bestekoa du, eta lagin batetik bestera aldatzen da. Baina lagin guztien batez bestekoen batez bestekoa populazioaren batez bestekoa da, $\\mu$, eta haiek populazioa baino gutxiago sakabanatzen dira.',
            'Cada muestra tiene su media, que cambia de una muestra a otra. Pero la media de las medias de todas las muestras es la media de la población, $\\mu$, y se dispersan menos que la población.',
            'لكل عيّنة متوسطها، ويتغير من عيّنة إلى أخرى. لكن متوسط متوسطات كل العيّنات هو متوسط المجتمع $\\mu$، وهي أقل تشتتًا من المجتمع.',
            'Each sample has its mean, which changes from one sample to another. But the mean of the means of all the samples is the population mean, $\\mu$, and they are less spread out than the population.'
        ),
        figureAfterSteps: true,
        figure: (language) => <AllSamplesFigure language={language} />
    },
    {
        id: 'sample-mean-distribution',
        stage: 'means',
        title: say('Laginaren batez bestekoaren banaketa', 'La distribución de la media muestral', 'توزيع متوسط العيّنة', 'The distribution of the sample mean'),
        goal: say('$X$ normala bada, $\\bar{X}$ ere normala dela jakitea, $N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$, eta haren probabilitateak kalkulatzea.', 'Saber que si $X$ es normal, $\\bar{X}$ también lo es, $N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$, y calcular sus probabilidades.', 'معرفة أنه إذا كان $X$ طبيعيًّا فإن $\\bar{X}$ طبيعي أيضًا $N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$، وحساب احتمالاته.', 'Know that if $X$ is normal, $\\bar{X}$ is normal too, $N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$, and work out its probabilities.'),
        needs: [need.standardize],
        problem: say('Helduen pisua $N(70;\\,12)$ banaketa da, kilotan. 36 pertsonako laginak hartzen dira. Nola banatzen da $\\bar{X}$? Zein da $P(\\bar{X}>72)$?', 'El peso de los adultos sigue una $N(70;\\,12)$ en kilos. Se toman muestras de 36 personas. ¿Cómo se distribuye $\\bar{X}$? ¿Cuánto vale $P(\\bar{X}>72)$?', 'يتبع وزن البالغين $N(70;\\,12)$ بالكيلوغرام. تؤخذ عيّنات من 36 شخصًا. كيف يتوزع $\\bar{X}$؟ وكم يساوي $P(\\bar{X}>72)$؟', 'Adults\' weight follows an $N(70;\\,12)$ in kilos. Samples of 36 people are taken. How is $\\bar{X}$ distributed? What is $P(\\bar{X}>72)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa bera da, eta desbideratzea $\\sqrt{n}$ aldiz txikiagoa.', 'La media es la misma, y la desviación $\\sqrt{n}$ veces menor.', 'المتوسط نفسه، والانحراف أصغر بـ $\\sqrt{n}$ مرة.', 'The mean is the same, and the deviation $\\sqrt{n}$ times smaller.'), math: same('$\\frac{12}{\\sqrt{36}}=2\\ \\to\\ \\bar{X}\\sim N(70;\\,2)$') },
            { text: say('Tipifikatu eta taula.', 'Tipifica y tabla.', 'وحّد واستعمل الجدول.', 'Standardise and use the table.'), math: same('${z}=\\frac{72-70}{2}=1\\ \\to\\ 1-0{,}8413=0{,}1587$') }
        ],
        takeaway: say(
            '$X\\sim N(\\mu;\\,\\sigma)$ bada, $n$ tamainako laginen batez bestekoa $\\bar{X}\\sim N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$ da. Lagina handiagoa, batez bestekoak $\\mu$ zenbakitik gertuago.',
            'Si $X\\sim N(\\mu;\\,\\sigma)$, la media de las muestras de tamaño $n$ es $\\bar{X}\\sim N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. Cuanto mayor es la muestra, más cerca de $\\mu$ quedan las medias.',
            'إذا كان $X\\sim N(\\mu;\\,\\sigma)$ فإن متوسط العيّنات ذات الحجم $n$ هو $\\bar{X}\\sim N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. وكلما كبرت العيّنة اقتربت المتوسطات من $\\mu$.',
            'If $X\\sim N(\\mu;\\,\\sigma)$, the mean of samples of size $n$ is $\\bar{X}\\sim N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. The bigger the sample, the closer the means stay to $\\mu$.'
        ),
        figure: (language) => <WeightsFigure language={language} />
    },
    {
        id: 'central-limit',
        stage: 'means',
        title: say('Limitearen teorema zentrala', 'El teorema central del límite', 'مبرهنة النهاية المركزية', 'The central limit theorem'),
        goal: say('Populazioa normala ez denean ere, $n\\ge 30$ denean $\\bar{X}$ ia normala dela erabiltzea.', 'Usar que, aunque la población no sea normal, si $n\\ge 30$ la $\\bar{X}$ es casi normal.', 'استعمال أن $\\bar{X}$ يكاد يكون طبيعيًّا إذا كان $n\\ge 30$ حتى لو لم يكن المجتمع طبيعيًّا.', 'Use that, even if the population is not normal, $\\bar{X}$ is almost normal when $n\\ge 30$.'),
        needs: [need.normal],
        problem: say('Aplikazio batean egindako gastuak $\\mu=20$ € eta $\\sigma=15$ € ditu, baina ez da normala. 100 erabiltzaileko lagin bat hartzen da. Zein da $P(\\bar{X}<23)$?', 'El gasto en una aplicación tiene $\\mu=20$ € y $\\sigma=15$ €, pero no es normal. Se toma una muestra de 100 usuarios. ¿Cuánto vale $P(\\bar{X}<23)$?', 'للإنفاق في تطبيق $\\mu=20$ € و$\\sigma=15$ €، لكنه ليس طبيعيًّا. تؤخذ عيّنة من 100 مستخدم. كم يساوي $P(\\bar{X}<23)$؟', 'Spending in an app has $\\mu=20$ € and $\\sigma=15$ €, but it is not normal. A sample of 100 users is taken. What is $P(\\bar{X}<23)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$n=100\\ge 30$: limitearen teorema zentrala.', '$n=100\\ge 30$: teorema central del límite.', '$n=100\\ge 30$: مبرهنة النهاية المركزية.', '$n=100\\ge 30$: central limit theorem.'), math: same('$\\frac{15}{\\sqrt{100}}=1{,}5\\ \\to\\ \\bar{X}\\approx N(20;\\,1{,}5)$') },
            { text: say('Tipifikatu eta taula.', 'Tipifica y tabla.', 'وحّد واستعمل الجدول.', 'Standardise and use the table.'), math: same('${z}=\\frac{23-20}{1{,}5}=2\\ \\to\\ 0{,}9772$') }
        ],
        takeaway: say(
            'Limitearen teorema zentrala: edozein populaziotan, $n\\ge 30$ denean, $\\bar{X}\\approx N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. Horregatik agertzen da normala nonahi lagin handiekin.',
            'Teorema central del límite: en cualquier población, si $n\\ge 30$, $\\bar{X}\\approx N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. Por eso aparece la normal en todas partes con muestras grandes.',
            'مبرهنة النهاية المركزية: في أي مجتمع، إذا كان $n\\ge 30$ فإن $\\bar{X}\\approx N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. لذلك يظهر التوزيع الطبيعي في كل مكان مع العيّنات الكبيرة.',
            'Central limit theorem: in any population, if $n\\ge 30$, $\\bar{X}\\approx N(\\mu;\\,\\frac{\\sigma}{\\sqrt{n}})$. That is why the normal turns up everywhere with large samples.'
        ),
        figure: (language) => <SpendingFigure language={language} />
    },
    {
        id: 'sum-distribution',
        stage: 'means',
        title: say('Lagin baten batura', 'La suma de una muestra', 'مجموع العيّنة', 'The sum of a sample'),
        goal: say('$n$ balioren batura normal batekin hurbiltzea: $N(n\\mu;\\,\\sigma\\sqrt{n})$.', 'Aproximar la suma de $n$ valores por una normal: $N(n\\mu;\\,\\sigma\\sqrt{n})$.', 'تقريب مجموع $n$ قيمة بتوزيع طبيعي: $N(n\\mu;\\,\\sigma\\sqrt{n})$.', 'Approximate the sum of $n$ values by a normal: $N(n\\mu;\\,\\sigma\\sqrt{n})$.'),
        problem: say('Hegazkin bateko maletek $\\mu=18$ kg eta $\\sigma=4$ kg dituzte. 25 maleta kargatzen dira, normal banatuta. Zein da guztira 480 kg baino gehiago izateko probabilitatea?', 'Las maletas de un avión tienen $\\mu=18$ kg y $\\sigma=4$ kg, y se distribuyen normalmente. Se cargan 25 maletas. ¿Qué probabilidad hay de que pesen en total más de 480 kg?', 'لحقائب طائرة $\\mu=18$ kg و$\\sigma=4$ kg وتتوزع توزيعًا طبيعيًّا. تُحمَّل 25 حقيبة. ما احتمال أن يزيد وزنها الكلي على 480 kg؟', 'A plane\'s suitcases have $\\mu=18$ kg and $\\sigma=4$ kg, normally distributed. 25 suitcases are loaded. What is the probability that they weigh more than 480 kg in all?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura: batez bestekoa $n\\mu$, desbideratzea $\\sigma\\sqrt{n}$.', 'La suma: media $n\\mu$, desviación $\\sigma\\sqrt{n}$.', 'المجموع: المتوسط $n\\mu$ والانحراف $\\sigma\\sqrt{n}$.', 'The sum: mean $n\\mu$, deviation $\\sigma\\sqrt{n}$.'), math: same('$25\\cdot 18=450\\qquad 4\\cdot\\sqrt{25}=20$') },
            { text: say('Tipifikatu eta taula.', 'Tipifica y tabla.', 'وحّد واستعمل الجدول.', 'Standardise and use the table.'), math: same('${z}=\\frac{480-450}{20}=1{,}5\\ \\to\\ 1-0{,}9332=0{,}0668$') }
        ],
        takeaway: say(
            '$n$ balio independenteren batura $\\sum X\\approx N(n\\mu;\\,\\sigma\\sqrt{n})$ da, $X$ normala bada edo $n\\ge 30$ bada. Kontuz: desbideratzea $\\sigma\\sqrt{n}$ da, ez $n\\,\\sigma$.',
            'La suma de $n$ valores independientes es $\\sum X\\approx N(n\\mu;\\,\\sigma\\sqrt{n})$, si $X$ es normal o $n\\ge 30$. Cuidado: la desviación es $\\sigma\\sqrt{n}$, no $n\\,\\sigma$.',
            'مجموع $n$ قيمة مستقلة هو $\\sum X\\approx N(n\\mu;\\,\\sigma\\sqrt{n})$ إذا كان $X$ طبيعيًّا أو $n\\ge 30$. انتبه: الانحراف $\\sigma\\sqrt{n}$ لا $n\\,\\sigma$.',
            'The sum of $n$ independent values is $\\sum X\\approx N(n\\mu;\\,\\sigma\\sqrt{n})$, if $X$ is normal or $n\\ge 30$. Careful: the deviation is $\\sigma\\sqrt{n}$, not $n\\,\\sigma$.'
        ),
        figure: (language) => <LuggageFigure language={language} />
    },

    /* ---------- 4. The sample proportion ---------- */
    {
        id: 'sample-proportion',
        stage: 'proportions',
        title: say('Laginaren proportzioa', 'La proporción muestral', 'نسبة العيّنة', 'The sample proportion'),
        goal: say('Lagin batean ezaugarri bat dutenen proportzioa, $\\hat{p}$, kalkulatzea, populazioaren $p$ estimatzeko.', 'Calcular la proporción de la muestra que tiene una característica, $\\hat{p}$, para estimar la $p$ de la población.', 'حساب نسبة من لديهم صفة في العيّنة $\\hat{p}$ لتقدير $p$ في المجتمع.', 'Work out the share of the sample with a feature, $\\hat{p}$, to estimate the population\'s $p$.'),
        problem: say('Inkesta batean 400 pertsonari galdetu zaie, eta 140 autobusez ibiltzen dira. Zein da laginaren proportzioa? Zer estimatzen du?', 'En una encuesta a 400 personas, 140 van en autobús. ¿Cuál es la proporción muestral? ¿Qué estima?', 'في استطلاع شمل 400 شخص، يتنقل 140 بالحافلة. ما نسبة العيّنة؟ وماذا تقدّر؟', 'In a poll of 400 people, 140 travel by bus. What is the sample proportion? What does it estimate?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezaugarria dutenak zati laginaren tamaina.', 'Los que tienen la característica entre el tamaño de la muestra.', 'من لديهم الصفة على حجم العيّنة.', 'Those with the feature over the sample size.'), math: same('$\\hat{p}=\\frac{140}{400}=0{,}35$') },
            { text: say('Biztanle guztietatik autobusez ibiltzen direnen proportzioa estimatzen du, $p$: % 35 inguru.', 'Estima la proporción de toda la población que va en autobús, $p$: cerca del 35 %.', 'تقدّر نسبة كل السكان الذين يتنقلون بالحافلة $p$: نحو 35 %.', 'It estimates the share of the whole population that travels by bus, $p$: about 35%.') }
        ],
        takeaway: say(
            'Laginaren proportzioa $\\hat{p}=\\frac{x}{n}$ da, $x$ ezaugarria dutenak izanik. Populazioaren $p$ ezezagunaren estimazio puntuala da; lagin batetik bestera aldatzen da.',
            'La proporción muestral es $\\hat{p}=\\frac{x}{n}$, con $x$ los que tienen la característica. Es la estimación puntual de la $p$ desconocida de la población; cambia de una muestra a otra.',
            'نسبة العيّنة هي $\\hat{p}=\\frac{x}{n}$ حيث $x$ من لديهم الصفة. وهي التقدير النقطي لـ $p$ المجهول في المجتمع؛ وتتغير من عيّنة إلى أخرى.',
            'The sample proportion is $\\hat{p}=\\frac{x}{n}$, with $x$ those who have the feature. It is the point estimate of the unknown population $p$; it changes from one sample to another.'
        ),
        figure: (language) => <VotersFigure language={language} />
    },
    {
        id: 'proportion-distribution',
        stage: 'proportions',
        title: say('Laginaren proportzioaren banaketa', 'La distribución de la proporción muestral', 'توزيع نسبة العيّنة', 'The distribution of the sample proportion'),
        goal: say('$n$ handia denean, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$ dela jakitea.', 'Saber que, si $n$ es grande, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$.', 'معرفة أنه إذا كان $n$ كبيرًا فإن $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$.', 'Know that, if $n$ is large, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$.'),
        needs: [need.approx],
        problem: say('Biztanleen % 20 begetarianoa da. 400 pertsonako laginak hartzen dira. Nola banatzen da $\\hat{p}$?', 'El 20 % de la población es vegetariana. Se toman muestras de 400 personas. ¿Cómo se distribuye $\\hat{p}$?', '20 % من السكان نباتيون. تؤخذ عيّنات من 400 شخص. كيف يتوزع $\\hat{p}$؟', '20% of the population is vegetarian. Samples of 400 people are taken. How is $\\hat{p}$ distributed?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Egiaztatu baldintzak.', 'Comprueba las condiciones.', 'تحقق من الشرطين.', 'Check the conditions.'), math: same('$np=80\\ge 5\\qquad nq=320\\ge 5$') },
            { text: say('Desbideratze tipikoa:', 'La desviación típica:', 'الانحراف المعياري:', 'The standard deviation:'), math: same('$\\sqrt{\\frac{0{,}2\\cdot 0{,}8}{400}}=\\sqrt{0{,}0004}=0{,}02$') },
            { text: say('Beraz, $\\hat{p}\\approx N(0{,}2;\\,0{,}02)$.', 'Por tanto, $\\hat{p}\\approx N(0{,}2;\\,0{,}02)$.', 'إذن $\\hat{p}\\approx N(0{,}2;\\,0{,}02)$.', 'So $\\hat{p}\\approx N(0{,}2;\\,0{,}02)$.') }
        ],
        takeaway: say(
            '$np\\ge 5$ eta $nq\\ge 5$ badira, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$: laginen proportzioak $p$ zenbakiaren inguruan daude, eta haien sakabanatzea txikiagoa da $n$ handitzean.',
            'Si $np\\ge 5$ y $nq\\ge 5$, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$: las proporciones de las muestras se reparten alrededor de $p$, y su dispersión baja al crecer $n$.',
            'إذا كان $np\\ge 5$ و$nq\\ge 5$ فإن $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$: تتوزع نسب العيّنات حول $p$، ويقل تشتتها كلما كبر $n$.',
            'If $np\\ge 5$ and $nq\\ge 5$, $\\hat{p}\\approx N(p;\\,\\sqrt{\\frac{pq}{n}})$: the sample proportions spread around $p$, and their spread shrinks as $n$ grows.'
        ),
        figure: (language) => <ProportionBellFigure language={language} />
    },
    {
        id: 'proportion-probability',
        stage: 'proportions',
        title: say('Proportzioen probabilitateak', 'Probabilidades de proporciones', 'احتمالات النسب', 'Probabilities of proportions'),
        goal: say('$\\hat{p}$ balio jakin batetik gora edo behera egoteko probabilitatea kalkulatzea.', 'Calcular la probabilidad de que $\\hat{p}$ quede por encima o por debajo de un valor.', 'حساب احتمال أن يقع $\\hat{p}$ فوق قيمة ما أو تحتها.', 'Work out the probability that $\\hat{p}$ is above or below a value.'),
        problem: say('Hautesleen erdia lege baten alde dago. 100 pertsonari galdetuz gero, zein da gutxienez % 60 alde egoteko probabilitatea?', 'La mitad de los votantes está a favor de una ley. Si se pregunta a 100 personas, ¿qué probabilidad hay de que al menos el 60 % esté a favor?', 'نصف الناخبين مع قانون. إذا سُئل 100 شخص، فما احتمال أن يكون 60 % على الأقل معه؟', 'Half the voters support a law. If 100 people are asked, what is the probability that at least 60% support it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\hat{p}$ banaketa:', 'La distribución de $\\hat{p}$:', 'توزيع $\\hat{p}$:', 'The distribution of $\\hat{p}$:'), math: same('$\\sqrt{\\frac{0{,}5\\cdot 0{,}5}{100}}=0{,}05\\ \\to\\ \\hat{p}\\approx N(0{,}5;\\,0{,}05)$') },
            { text: say('Tipifikatu eta taula.', 'Tipifica y tabla.', 'وحّد واستعمل الجدول.', 'Standardise and use the table.'), math: same('${z}=\\frac{0{,}6-0{,}5}{0{,}05}=2\\ \\to\\ 1-0{,}9772=0{,}0228$') }
        ],
        takeaway: say(
            'Proportzioetan ere tipifikatzen da, $\\hat{p}$ aldagaiaren desbideratzeaz zatituz. Lagin handiekin, oso zaila da $\\hat{p}$ zenbakia $p$ zenbakitik urrun egotea.',
            'Con proporciones también se tipifica, dividiendo entre la desviación de $\\hat{p}$. Con muestras grandes es muy difícil que $\\hat{p}$ quede lejos de $p$.',
            'نوحّد في النسب أيضًا بالقسمة على انحراف $\\hat{p}$. ومع العيّنات الكبيرة يصعب جدًّا أن يبتعد $\\hat{p}$ عن $p$.',
            'Proportions are standardised too, dividing by the deviation of $\\hat{p}$. With large samples it is very unlikely that $\\hat{p}$ ends up far from $p$.'
        ),
        figure: (language) => <ProportionTailFigure language={language} />
    },

    /* ---------- 5. Characteristic intervals ---------- */
    {
        id: 'mean-interval',
        stage: 'characteristic',
        title: say('Batez bestekoen tarte karakteristikoa', 'Intervalo característico de las medias', 'الفترة المميزة للمتوسطات', 'Characteristic interval of the means'),
        goal: say('Laginen batez bestekoen probabilitate jakin bat duen tartea aurkitzea: $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Hallar el intervalo que contiene una probabilidad dada de las medias muestrales: $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'إيجاد الفترة التي تحوي احتمالًا معطى من متوسطات العيّنات: $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Find the interval with a given probability for the sample means: $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.'),
        needs: [need.interval],
        problem: say('Altuerak $N(170;\\,10)$ banaketa dira, cm-tan. 25 pertsonako laginak hartzen dira. Aurkitu laginen batez bestekoen tarte karakteristikoa, % 95 probabilitatearekin.', 'Las alturas siguen una $N(170;\\,10)$ en cm. Se toman muestras de 25 personas. Halla el intervalo característico del 95 % para las medias muestrales.', 'تتبع الأطوال $N(170;\\,10)$ بالسنتيمتر. تؤخذ عيّنات من 25 شخصًا. جد الفترة المميزة لـ 95 % لمتوسطات العيّنات.', 'Heights follow an $N(170;\\,10)$ in cm. Samples of 25 people are taken. Find the 95% characteristic interval for the sample means.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoen desbideratzea:', 'La desviación de las medias:', 'انحراف المتوسطات:', 'The deviation of the means:'), math: same('$\\frac{10}{\\sqrt{25}}=2$') },
            { text: say('Erradioa, ${z}_{\\alpha/2}=1{,}96$ zenbakiarekin:', 'El radio, con ${z}_{\\alpha/2}=1{,}96$:', 'نصف القطر مع ${z}_{\\alpha/2}=1{,}96$:', 'The radius, with ${z}_{\\alpha/2}=1{,}96$:'), math: same('$1{,}96\\cdot 2=3{,}92$') },
            { text: say('Tartea:', 'El intervalo:', 'الفترة:', 'The interval:'), math: same('$(170-3{,}92;\\ 170+3{,}92)=(166{,}08;\\ 173{,}92)$') }
        ],
        takeaway: say(
            'Laginen batez bestekoen $1-\\alpha$ probabilitateko tartea $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$ da: banaketa normalaren tarte karakteristikoa, baina $\\frac{\\sigma}{\\sqrt{n}}$ desbideratzearekin.',
            'El intervalo de probabilidad $1-\\alpha$ para las medias muestrales es $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: el intervalo característico de la normal, con desviación $\\frac{\\sigma}{\\sqrt{n}}$.',
            'فترة الاحتمال $1-\\alpha$ لمتوسطات العيّنات هي $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: الفترة المميزة للتوزيع الطبيعي بانحراف $\\frac{\\sigma}{\\sqrt{n}}$.',
            'The interval with probability $1-\\alpha$ for the sample means is $\\mu\\pm z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: the characteristic interval of the normal, with deviation $\\frac{\\sigma}{\\sqrt{n}}$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <MeanBandFigure language={language} />
    },
    {
        id: 'proportion-interval',
        stage: 'characteristic',
        title: say('Proportzioen tarte karakteristikoa', 'Intervalo característico de las proporciones', 'الفترة المميزة للنسب', 'Characteristic interval of the proportions'),
        goal: say('Laginen proportzioen probabilitate jakin bat duen tartea aurkitzea: $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$.', 'Hallar el intervalo que contiene una probabilidad dada de las proporciones muestrales: $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$.', 'إيجاد الفترة التي تحوي احتمالًا معطى من نسب العيّنات: $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$.', 'Find the interval with a given probability for the sample proportions: $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$.'),
        problem: say('Herritarren % 40 egunkari-irakurlea da. 600 pertsonako laginak hartzen dira. Aurkitu $\\hat{p}$ proportzioen tarte karakteristikoa, % 95 probabilitatearekin.', 'El 40 % de la población lee el periódico. Se toman muestras de 600 personas. Halla el intervalo característico del 95 % para $\\hat{p}$.', 'يقرأ 40 % من السكان الصحيفة. تؤخذ عيّنات من 600 شخص. جد الفترة المميزة لـ 95 % لـ $\\hat{p}$.', '40% of the population reads the newspaper. Samples of 600 people are taken. Find the 95% characteristic interval for $\\hat{p}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioen desbideratzea:', 'La desviación de las proporciones:', 'انحراف النسب:', 'The deviation of the proportions:'), math: same('$\\sqrt{\\frac{0{,}4\\cdot 0{,}6}{600}}=\\sqrt{0{,}0004}=0{,}02$') },
            { text: say('Erradioa:', 'El radio:', 'نصف القطر:', 'The radius:'), math: same('$1{,}96\\cdot 0{,}02=0{,}0392$') },
            { text: say('Tartea:', 'El intervalo:', 'الفترة:', 'The interval:'), math: same('$(0{,}4-0{,}0392;\\ 0{,}4+0{,}0392)=(0{,}3608;\\ 0{,}4392)$') }
        ],
        takeaway: say(
            'Laginen proportzioen $1-\\alpha$ probabilitateko tartea $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$ da. % 95 probabilitatearekin, laginen proportzio gehienak tarte horretan geratzen dira.',
            'El intervalo de probabilidad $1-\\alpha$ para las proporciones muestrales es $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. Con el 95 %, casi todas las proporciones de las muestras caen en él.',
            'فترة الاحتمال $1-\\alpha$ لنسب العيّنات هي $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. ومع 95 % تقع فيها معظم نسب العيّنات.',
            'The interval with probability $1-\\alpha$ for the sample proportions is $p\\pm z_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. With 95%, nearly all the sample proportions fall in it.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ProportionBandFigure language={language} />
    },
    {
        id: 'bigger-sample',
        stage: 'characteristic',
        title: say('Lagin handiagoa, tarte estuagoa', 'Más muestra, intervalo más estrecho', 'عيّنة أكبر، فترة أضيق', 'Bigger sample, narrower interval'),
        goal: say('Laginaren tamainak tartearen zabalera nola aldatzen duen ikustea: $n$ lau aldiz handiagoa, tartea erdia.', 'Ver cómo cambia el tamaño de la muestra la anchura del intervalo: $n$ cuatro veces mayor, intervalo la mitad.', 'رؤية كيف يغيّر حجم العيّنة عرض الفترة: $n$ أكبر بأربع مرات، الفترة نصفها.', 'See how the sample size changes the width of the interval: $n$ four times bigger, half the interval.'),
        problem: say('$\\sigma=10$ duen populazio batean, laginaren tamaina 25 izatetik 100 izatera pasatzen da. Zer gertatzen zaio $\\frac{\\sigma}{\\sqrt{n}}$ zenbakiari? Eta % 95 probabilitateko tartearen erradioari?', 'En una población con $\\sigma=10$, el tamaño de la muestra pasa de 25 a 100. ¿Qué le pasa a $\\frac{\\sigma}{\\sqrt{n}}$? ¿Y al radio del intervalo del 95 %?', 'في مجتمع $\\sigma=10$ فيه، ينتقل حجم العيّنة من 25 إلى 100. ماذا يحدث لـ $\\frac{\\sigma}{\\sqrt{n}}$؟ ولنصف قطر فترة 95 %؟', 'In a population with $\\sigma=10$, the sample size goes from 25 to 100. What happens to $\\frac{\\sigma}{\\sqrt{n}}$? And to the radius of the 95% interval?'),
        stepsKind: 'steps',
        steps: [
            { text: say('25 pertsonarekin:', 'Con 25 personas:', 'مع 25 شخصًا:', 'With 25 people:'), math: same('$\\frac{10}{\\sqrt{25}}=2\\qquad 1{,}96\\cdot 2=3{,}92$') },
            { text: say('100 pertsonarekin:', 'Con 100 personas:', 'مع 100 شخص:', 'With 100 people:'), math: same('$\\frac{10}{\\sqrt{100}}=1\\qquad 1{,}96\\cdot 1=1{,}96$') },
            { text: say('Lagina lau aldiz handiagoa da, eta erradioa erdia.', 'La muestra es cuatro veces mayor y el radio, la mitad.', 'العيّنة أكبر بأربع مرات ونصف القطر نصفه.', 'The sample is four times bigger and the radius, half.') }
        ],
        takeaway: say(
            'Tartearen erradioa $\\frac{1}{\\sqrt{n}}$ bezala txikitzen da: erdia izateko, lagina lau aldiz handiagoa behar da; hamarren bat izateko, ehun aldiz handiagoa. Lagin handiak garestiak dira, eta horregatik ez dira infinituak.',
            'El radio del intervalo baja como $\\frac{1}{\\sqrt{n}}$: para reducirlo a la mitad hace falta una muestra cuatro veces mayor; para la décima parte, cien veces mayor. Las muestras grandes son caras, por eso no son infinitas.',
            'يقل نصف قطر الفترة مثل $\\frac{1}{\\sqrt{n}}$: لتنصيفه نحتاج عيّنة أكبر بأربع مرات، ولعُشره عيّنة أكبر بمئة مرة. والعيّنات الكبيرة مكلفة، لذلك ليست لا نهائية.',
            'The radius of the interval shrinks like $\\frac{1}{\\sqrt{n}}$: to halve it you need a sample four times bigger; to cut it to a tenth, a hundred times bigger. Big samples are expensive, which is why they are not endless.'
        ),
        figure: (language) => <BiggerSampleFigure language={language} />
    }
]

export const samplingBatx2gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...samplingBatx2gLessonTexts[topic.id as SamplingBatx2gTopicId], ...samplingBatx2gLessonChecks[topic.id as SamplingBatx2gTopicId] }))
