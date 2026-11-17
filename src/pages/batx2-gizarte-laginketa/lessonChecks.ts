import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type SamplingBatx2gTopicId =
    | 'population-sample' | 'bias' | 'simple-systematic'
    | 'proportional-allocation' | 'equal-allocation'
    | 'all-samples' | 'sample-mean-distribution' | 'central-limit' | 'sum-distribution'
    | 'sample-proportion' | 'proportion-distribution' | 'proportion-probability'
    | 'mean-interval' | 'proportion-interval' | 'bigger-sample'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const samplingBatx2gLessonChecks: Record<SamplingBatx2gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'population-sample': {
        mistake: {
            wrong: say('Klub bateko 5000 bazkidetatik 1000 bazkideri egindako inkesta populazioa da, jende asko delako.', 'Una encuesta a 1000 de los 5000 socios de un club es la población, porque es mucha gente.', 'استطلاع 1000 من 5000 عضو في نادٍ هو المجتمع لأنه عدد كبير.', 'A poll of 1000 of a club\'s 5000 members is the population, because it is many people.'),
            right: say('Lagin bat da: ez zaie guztiei galdetzen.', 'Es una muestra: no se pregunta a todos.', 'إنها عيّنة: لا يُسأل الجميع.', 'It is a sample: not everyone is asked.')
        },
        check: {
            prompt: say('Klase bateko ikasle guztiak pisatzen dira haien batez besteko pisua jakiteko. Populazioa ala lagina da?', 'Se pesa a todos los alumnos de una clase para conocer su peso medio. ¿Es población o muestra?', 'يُوزن كل طلاب صف لمعرفة متوسط وزنهم. هل هو مجتمع أم عيّنة؟', 'All the students in a class are weighed to find their mean weight. Is it a population or a sample?'),
            options: [say('Populazioa', 'Población', 'مجتمع', 'Population'), say('Lagina', 'Muestra', 'عيّنة', 'Sample'), say('Ez bata ez bestea', 'Ninguna', 'لا هذا ولا ذاك', 'Neither')],
            correctIndex: 0,
            explanation: say('Aztertu nahi den talde osoa neurtzen da: populazioa da.', 'Se mide todo el grupo que se quiere estudiar: es la población.', 'تُقاس كل المجموعة المراد دراستها: إنها المجتمع.', 'The whole group to be studied is measured: it is the population.')
        }
    },
    bias: {
        mistake: {
            wrong: say('Lagin handi bat beti da adierazgarria.', 'Una muestra grande siempre es representativa.', 'العيّنة الكبيرة ممثلة دائمًا.', 'A big sample is always representative.'),
            right: say('Gaizki aukeratzen bada (leku bakar batean), handia izanda ere alborapena du.', 'Si se elige mal (en un solo sitio), aunque sea grande tiene sesgo.', 'إذا اختيرت بشكل سيئ (في مكان واحد) فهي متحيّزة حتى لو كانت كبيرة.', 'If it is chosen badly (in one place only), it is biased however big it is.')
        },
        check: {
            prompt: say('Zeinek du alborapena?', '¿Cuál tiene sesgo?', 'أيها متحيّز؟', 'Which one is biased?'),
            options: [
                say('Erroldako 50 zenbaki zozketatzea', 'Sortear 50 números del censo', 'سحب 50 رقمًا من سجل السكان', 'Drawing 50 numbers from the census'),
                say('Banku batean sartzen diren lehen 50 pertsonei galdetzea', 'Preguntar a los 50 primeros que entran en un banco', 'سؤال أول 50 يدخلون مصرفًا', 'Asking the first 50 people who walk into a bank'),
                say('Erroldako 50 etxebizitza zozketatzea', 'Sortear 50 viviendas del padrón', 'سحب 50 مسكنًا من سجل البلدية', 'Drawing 50 homes from the town register')
            ],
            correctIndex: 1,
            explanation: say('Bankura doazenak ez dira herritar guztien antzekoak, eta ordu horretan lanean daudenak kanpoan geratzen dira.', 'Quienes van al banco no se parecen a toda la población, y quedan fuera los que trabajan a esa hora.', 'مرتادو المصرف لا يشبهون كل السكان، ويُستبعد العاملون في تلك الساعة.', 'Those who go to the bank are not like the whole population, and those working at that time are left out.')
        }
    },
    'simple-systematic': {
        mistake: {
            wrong: say('$N=500$ eta $n=25$: $h=\\frac{25}{500}$.', '$N=500$ y $n=25$: $h=\\frac{25}{500}$.', '$N=500$ و$n=25$: $h=\\frac{25}{500}$.', '$N=500$ and $n=25$: $h=\\frac{25}{500}$.'),
            right: say('Jauzia populazioa zati lagina da: $h=\\frac{500}{25}=20$.', 'El salto es población entre muestra: $h=\\frac{500}{25}=20$.', 'القفزة هي المجتمع على العيّنة: $h=\\frac{500}{25}=20$.', 'The step is population over sample: $h=\\frac{500}{25}=20$.')
        },
        check: {
            prompt: say('800 pertsonatik 40 pertsonako lagin sistematiko bat egiten da, eta 7 zenbakitik hasten da. Zein da bigarren aukeratua?', 'De 800 personas se toma una muestra sistemática de 40 empezando por el 7. ¿Quién es el segundo elegido?', 'تؤخذ عيّنة منتظمة من 40 من بين 800 شخص بدءًا من 7. من المختار الثاني؟', 'A systematic sample of 40 is taken from 800 people, starting at 7. Who is the second one chosen?'),
            options: [same('$8$'), same('$27$'), same('$47$')],
            correctIndex: 1,
            explanation: same('$h=\\frac{800}{40}=20\\qquad 7+20=27$')
        }
    },
    'proportional-allocation': {
        mistake: {
            wrong: say('60 ikasleko lagina 400, 200 eta 200 ikasleko hiru mailetan: 20 bakoitzetik.', 'Muestra de 60 en tres cursos de 400, 200 y 200 alumnos: 20 de cada uno.', 'عيّنة من 60 في ثلاثة صفوف من 400 و200 و200 طالب: 20 من كل صف.', 'A sample of 60 in three years of 400, 200 and 200 students: 20 from each.'),
            right: say('Proportzionala: 30, 15 eta 15, maila bakoitzaren tamainaren arabera.', 'Proporcional: 30, 15 y 15, según el tamaño de cada curso.', 'التناسبي: 30 و15 و15 حسب حجم كل صف.', 'Proportional: 30, 15 and 15, by the size of each year.')
        },
        check: {
            prompt: say('900 bizilagun: 450 A auzoan, 270 B auzoan eta 180 C auzoan. 90 pertsonako lagin proportzionala. Zenbat B auzotik?', '900 vecinos: 450 en A, 270 en B y 180 en C. Muestra proporcional de 90. ¿Cuántos de B?', '900 ساكن: 450 في A و270 في B و180 في C. عيّنة تناسبية من 90. كم من B؟', '900 residents: 450 in A, 270 in B and 180 in C. A proportional sample of 90. How many from B?'),
            options: [same('$30$'), same('$27$'), same('$18$')],
            correctIndex: 1,
            explanation: same('$270\\cdot\\frac{90}{900}=27$')
        }
    },
    'equal-allocation': {
        mistake: {
            wrong: say('Esleipen berdina eta proportzionala gauza bera dira.', 'La afijación igual y la proporcional son lo mismo.', 'التوزيع المتساوي والتناسبي شيء واحد.', 'Equal and proportional allocation are the same thing.'),
            right: say('Geruzak berdinak badira bakarrik. Bestela, berdinak kopuru bera ematen dio bakoitzari.', 'Solo si los estratos son iguales. Si no, la igual da el mismo número a cada uno.', 'فقط إذا تساوت الطبقات. وإلا فالمتساوي يعطي كلًّا العدد نفسه.', 'Only if the strata are equal. Otherwise, equal allocation gives each the same number.')
        },
        check: {
            prompt: say('4 geruza daude eta 200 kideko lagina nahi da esleipen berdinarekin. Zenbat geruza bakoitzetik?', 'Hay 4 estratos y se quiere una muestra de 200 con afijación igual. ¿Cuántos de cada estrato?', 'هناك 4 طبقات وتُراد عيّنة من 200 بالتوزيع المتساوي. كم من كل طبقة؟', 'There are 4 strata and a sample of 200 with equal allocation is wanted. How many from each stratum?'),
            options: [same('$50$'), same('$200$'), same('$800$')],
            correctIndex: 0,
            explanation: same('$\\frac{200}{4}=50$')
        }
    },
    'all-samples': {
        mistake: {
            wrong: say('Laginen batez bestekoen batez bestekoa $\\mu$ baino txikiagoa da.', 'La media de las medias muestrales es menor que $\\mu$.', 'متوسط متوسطات العيّنات أصغر من $\\mu$.', 'The mean of the sample means is less than $\\mu$.'),
            right: say('Zehazki $\\mu$ da: batez bestekoak bi aldeetara banatzen dira.', 'Es justo $\\mu$: las medias se reparten a los dos lados.', 'إنه $\\mu$ بالضبط: تتوزع المتوسطات على الجهتين.', 'It is exactly $\\mu$: the means spread to both sides.')
        },
        check: {
            prompt: say('Populazioa 1, 3 eta 5 da. Zein da 2 tamainako lagin guztien batez bestekoen batez bestekoa?', 'La población es 1, 3 y 5. ¿Cuál es la media de las medias de todas las muestras de tamaño 2?', 'المجتمع هو 1 و3 و5. ما متوسط متوسطات كل العيّنات ذات الحجم 2؟', 'The population is 1, 3 and 5. What is the mean of the means of all the samples of size 2?'),
            options: [same('$9$'), same('$3$'), same('$4{,}5$')],
            correctIndex: 1,
            explanation: say('$\\mu$ bera: $\\frac{1+3+5}{3}=3$.', 'La misma $\\mu$: $\\frac{1+3+5}{3}=3$.', 'الـ $\\mu$ نفسها: $\\frac{1+3+5}{3}=3$.', 'The same $\\mu$: $\\frac{1+3+5}{3}=3$.')
        }
    },
    'sample-mean-distribution': {
        mistake: {
            wrong: say('$X\\sim N(50;\\,8)$ eta $n=16$: $\\bar{X}\\sim N(50;\\,\\frac{8}{16})$.', '$X\\sim N(50;\\,8)$ y $n=16$: $\\bar{X}\\sim N(50;\\,\\frac{8}{16})$.', '$X\\sim N(50;\\,8)$ و$n=16$: $\\bar{X}\\sim N(50;\\,\\frac{8}{16})$.', '$X\\sim N(50;\\,8)$ and $n=16$: $\\bar{X}\\sim N(50;\\,\\frac{8}{16})$.'),
            right: say('$\\sqrt{16}=4$ zenbakiaz zatitzen da: $\\bar{X}\\sim N(50;\\,2)$.', 'Se divide entre $\\sqrt{16}=4$: $\\bar{X}\\sim N(50;\\,2)$.', 'نقسم على $\\sqrt{16}=4$: $\\bar{X}\\sim N(50;\\,2)$.', 'Divide by $\\sqrt{16}=4$: $\\bar{X}\\sim N(50;\\,2)$.')
        },
        check: {
            prompt: say('$X\\sim N(100;\\,20)$ eta $n=25$. Zein da $\\bar{X}$ aldagaiaren desbideratze tipikoa?', '$X\\sim N(100;\\,20)$ y $n=25$. ¿Cuál es la desviación típica de $\\bar{X}$?', '$X\\sim N(100;\\,20)$ و$n=25$. ما الانحراف المعياري لـ $\\bar{X}$؟', '$X\\sim N(100;\\,20)$ and $n=25$. What is the standard deviation of $\\bar{X}$?'),
            options: [same('$0{,}8$'), same('$20$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$\\frac{20}{\\sqrt{25}}=4$')
        }
    },
    'central-limit': {
        mistake: {
            wrong: say('Populazioa normala ez bada, inoiz ezin da normala erabili $\\bar{X}$ aldagaiarentzat.', 'Si la población no es normal, nunca se puede usar la normal para $\\bar{X}$.', 'إذا لم يكن المجتمع طبيعيًّا فلا يمكن أبدًا استعمال الطبيعي لـ $\\bar{X}$.', 'If the population is not normal, the normal can never be used for $\\bar{X}$.'),
            right: say('$n\\ge 30$ bada, bai: limitearen teorema zentrala.', 'Con $n\\ge 30$, sí: teorema central del límite.', 'مع $n\\ge 30$ نعم: مبرهنة النهاية المركزية.', 'With $n\\ge 30$, yes: the central limit theorem.')
        },
        check: {
            prompt: say('Populazio ez-normal batek $\\mu=40$ eta $\\sigma=10$ ditu, eta $n=64$. Zein normalekin hurbiltzen da $\\bar{X}$?', 'Una población no normal tiene $\\mu=40$ y $\\sigma=10$, y $n=64$. ¿Por qué normal se aproxima $\\bar{X}$?', 'لمجتمع غير طبيعي $\\mu=40$ و$\\sigma=10$، و$n=64$. بأي توزيع طبيعي يُقرَّب $\\bar{X}$؟', 'A non-normal population has $\\mu=40$ and $\\sigma=10$, and $n=64$. Which normal approximates $\\bar{X}$?'),
            options: [same('$N(40;\\,10)$'), same('$N(40;\\,1{,}25)$'), same('$N(40;\\,0{,}15625)$')],
            correctIndex: 1,
            explanation: same('$\\frac{10}{\\sqrt{64}}=1{,}25$')
        }
    },
    'sum-distribution': {
        mistake: {
            wrong: say('$\\sigma=3$ duten 16 balioren baturaren desbideratzea: $16\\cdot 3=48$.', 'La desviación de la suma de 16 valores con $\\sigma=3$: $16\\cdot 3=48$.', 'انحراف مجموع 16 قيمة $\\sigma=3$ لكل منها: $16\\cdot 3=48$.', 'The deviation of the sum of 16 values with $\\sigma=3$: $16\\cdot 3=48$.'),
            right: same('$\\sigma\\sqrt{n}=3\\cdot 4=12$')
        },
        check: {
            prompt: say('$\\mu=10$, $\\sigma=2$ eta $n=9$. Zein normal da batura?', '$\\mu=10$, $\\sigma=2$ y $n=9$. ¿Qué normal sigue la suma?', '$\\mu=10$ و$\\sigma=2$ و$n=9$. أي توزيع طبيعي يتبعه المجموع؟', '$\\mu=10$, $\\sigma=2$ and $n=9$. Which normal does the sum follow?'),
            options: [same('$N(90;\\,6)$'), same('$N(90;\\,18)$'), same('$N(10;\\,0{,}6)$')],
            correctIndex: 0,
            explanation: same('$9\\cdot 10=90\\qquad 2\\cdot\\sqrt{9}=6$')
        }
    },
    'sample-proportion': {
        mistake: {
            wrong: say('250 inkestatutatik 50 pertsonak baietz: $\\hat{p}=\\frac{250}{50}=5$.', 'De 250 encuestados, 50 dicen sí: $\\hat{p}=\\frac{250}{50}=5$.', 'من 250 مستطلَعًا قال 50 نعم: $\\hat{p}=\\frac{250}{50}=5$.', 'Of 250 polled, 50 say yes: $\\hat{p}=\\frac{250}{50}=5$.'),
            right: say('Proportzio bat 0 eta 1 artean dago: $\\hat{p}=\\frac{50}{250}=0{,}2$.', 'Una proporción está entre 0 y 1: $\\hat{p}=\\frac{50}{250}=0{,}2$.', 'النسبة بين 0 و1: $\\hat{p}=\\frac{50}{250}=0{,}2$.', 'A proportion lies between 0 and 1: $\\hat{p}=\\frac{50}{250}=0{,}2$.')
        },
        check: {
            prompt: say('500 pertsonatik 175 birziklatzen dute. Zenbat da $\\hat{p}$?', 'De 500 personas, 175 reciclan. ¿Cuánto vale $\\hat{p}$?', 'من 500 شخص يعيد 175 التدوير. كم يساوي $\\hat{p}$؟', 'Of 500 people, 175 recycle. What is $\\hat{p}$?'),
            options: [same('$0{,}65$'), same('$0{,}175$'), same('$0{,}35$')],
            correctIndex: 2,
            explanation: same('$\\frac{175}{500}=0{,}35$')
        }
    },
    'proportion-distribution': {
        mistake: {
            wrong: say('$p=0{,}5$ eta $n=100$: desbideratzea $\\frac{0{,}25}{100}=0{,}0025$.', '$p=0{,}5$ y $n=100$: la desviación es $\\frac{0{,}25}{100}=0{,}0025$.', '$p=0{,}5$ و$n=100$: الانحراف $\\frac{0{,}25}{100}=0{,}0025$.', '$p=0{,}5$ and $n=100$: the deviation is $\\frac{0{,}25}{100}=0{,}0025$.'),
            right: say('Erroa falta da: $\\sqrt{0{,}0025}=0{,}05$.', 'Falta la raíz: $\\sqrt{0{,}0025}=0{,}05$.', 'ينقص الجذر: $\\sqrt{0{,}0025}=0{,}05$.', 'The square root is missing: $\\sqrt{0{,}0025}=0{,}05$.')
        },
        check: {
            prompt: say('$p=0{,}1$ eta $n=900$. Zein da $\\hat{p}$ aldagaiaren desbideratze tipikoa?', '$p=0{,}1$ y $n=900$. ¿Cuál es la desviación típica de $\\hat{p}$?', '$p=0{,}1$ و$n=900$. ما الانحراف المعياري لـ $\\hat{p}$؟', '$p=0{,}1$ and $n=900$. What is the standard deviation of $\\hat{p}$?'),
            options: [same('$0{,}01$'), same('$0{,}0001$'), same('$0{,}1$')],
            correctIndex: 0,
            explanation: same('$\\sqrt{\\frac{0{,}1\\cdot 0{,}9}{900}}=\\sqrt{0{,}0001}=0{,}01$')
        }
    },
    'proportion-probability': {
        mistake: {
            wrong: same('${z}=\\frac{\\hat{p}-p}{\\sqrt{n}}$'),
            right: say('$\\hat{p}$ aldagaiaren desbideratzeaz zatitzen da: ${z}=\\frac{\\hat{p}-p}{\\sqrt{pq/n}}$.', 'Se divide entre la desviación de $\\hat{p}$: ${z}=\\frac{\\hat{p}-p}{\\sqrt{pq/n}}$.', 'نقسم على انحراف $\\hat{p}$: ${z}=\\frac{\\hat{p}-p}{\\sqrt{pq/n}}$.', 'Divide by the deviation of $\\hat{p}$: ${z}=\\frac{\\hat{p}-p}{\\sqrt{pq/n}}$.')
        },
        check: {
            prompt: say('$\\hat{p}\\sim N(0{,}3;\\,0{,}02)$. Zenbat da $P(\\hat{p}\\le 0{,}33)$?', '$\\hat{p}\\sim N(0{,}3;\\,0{,}02)$. ¿Cuánto vale $P(\\hat{p}\\le 0{,}33)$?', '$\\hat{p}\\sim N(0{,}3;\\,0{,}02)$. كم يساوي $P(\\hat{p}\\le 0{,}33)$؟', '$\\hat{p}\\sim N(0{,}3;\\,0{,}02)$. What is $P(\\hat{p}\\le 0{,}33)$?'),
            options: [same('$0{,}0668$'), same('$0{,}9332$'), same('$0{,}33$')],
            correctIndex: 1,
            explanation: same('${z}=\\frac{0{,}33-0{,}3}{0{,}02}=1{,}5\\ \\to\\ 0{,}9332$')
        }
    },
    'mean-interval': {
        mistake: {
            wrong: say('$N(50;\\,10)$ eta $n=100$, % 95: $50\\pm 1{,}96\\cdot 10$.', '$N(50;\\,10)$ y $n=100$, 95 %: $50\\pm 1{,}96\\cdot 10$.', '$N(50;\\,10)$ و$n=100$، 95 %: $50\\pm 1{,}96\\cdot 10$.', '$N(50;\\,10)$ and $n=100$, 95%: $50\\pm 1{,}96\\cdot 10$.'),
            right: say('Batez bestekoen desbideratzea $\\frac{10}{\\sqrt{100}}=1$ da: $(48{,}04;\\ 51{,}96)$.', 'La desviación de las medias es $\\frac{10}{\\sqrt{100}}=1$: $(48{,}04;\\ 51{,}96)$.', 'انحراف المتوسطات $\\frac{10}{\\sqrt{100}}=1$: $(48{,}04;\\ 51{,}96)$.', 'The deviation of the means is $\\frac{10}{\\sqrt{100}}=1$: $(48{,}04;\\ 51{,}96)$.')
        },
        check: {
            prompt: say('$N(80;\\,12)$ eta $n=36$. Zein da batez bestekoen tartearen erradioa, % 95 probabilitatearekin?', '$N(80;\\,12)$ y $n=36$. ¿Cuál es el radio del intervalo del 95 % para las medias?', '$N(80;\\,12)$ و$n=36$. ما نصف قطر فترة 95 % للمتوسطات؟', '$N(80;\\,12)$ and $n=36$. What is the radius of the 95% interval for the means?'),
            options: [same('$23{,}52$'), same('$3{,}92$'), same('$0{,}653$')],
            correctIndex: 1,
            explanation: same('$1{,}96\\cdot\\frac{12}{\\sqrt{36}}=3{,}92$')
        }
    },
    'proportion-interval': {
        mistake: {
            wrong: say('$p=0{,}2$ eta $n=400$, % 95: $0{,}2\\pm 1{,}96\\cdot 0{,}0004$.', '$p=0{,}2$ y $n=400$, 95 %: $0{,}2\\pm 1{,}96\\cdot 0{,}0004$.', '$p=0{,}2$ و$n=400$، 95 %: $0{,}2\\pm 1{,}96\\cdot 0{,}0004$.', '$p=0{,}2$ and $n=400$, 95%: $0{,}2\\pm 1{,}96\\cdot 0{,}0004$.'),
            right: say('Desbideratzea erroa da, $0{,}02$: $0{,}2\\pm 0{,}0392$.', 'La desviación es la raíz, $0{,}02$: $0{,}2\\pm 0{,}0392$.', 'الانحراف هو الجذر $0{,}02$: $0{,}2\\pm 0{,}0392$.', 'The deviation is the square root, $0{,}02$: $0{,}2\\pm 0{,}0392$.')
        },
        check: {
            prompt: say('$p=0{,}5$ eta $n=100$. Zein da proportzioen tartearen erradioa, % 95 probabilitatearekin?', '$p=0{,}5$ y $n=100$. ¿Cuál es el radio del intervalo del 95 % para las proporciones?', '$p=0{,}5$ و$n=100$. ما نصف قطر فترة 95 % للنسب؟', '$p=0{,}5$ and $n=100$. What is the radius of the 95% interval for the proportions?'),
            options: [same('$0{,}098$'), same('$0{,}05$'), same('$0{,}0049$')],
            correctIndex: 0,
            explanation: same('$1{,}96\\cdot 0{,}05=0{,}098$')
        }
    },
    'bigger-sample': {
        mistake: {
            wrong: say('Erradioa erdira jaisteko, lagina bikoiztu behar da.', 'Para reducir el radio a la mitad, se duplica la muestra.', 'لتنصيف نصف القطر نضاعف العيّنة.', 'To halve the radius, double the sample.'),
            right: say('Lau aldiz handiagoa behar da: $\\sqrt{4}=2$.', 'Hay que multiplicarla por 4: $\\sqrt{4}=2$.', 'يجب ضربها في 4: $\\sqrt{4}=2$.', 'It must be multiplied by 4: $\\sqrt{4}=2$.')
        },
        check: {
            prompt: say('Erradioa heren bat izateko, zenbat aldiz handitu behar da $n$?', 'Para que el radio sea la tercera parte, ¿por cuánto hay que multiplicar $n$?', 'ليصبح نصف القطر الثلث، في كم يجب ضرب $n$؟', 'For the radius to be a third, by how much must $n$ be multiplied?'),
            options: [same('$3$'), same('$9$'), same('$27$')],
            correctIndex: 1,
            explanation: same('$\\sqrt{9}=3$')
        }
    }
}
