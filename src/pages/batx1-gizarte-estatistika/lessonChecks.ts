import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   typical mistake and the «Check it» question of the lessons that are new
   in Sociales. The lessons borrowed from 1.º Ciencias bring their own.
   Plain data (no JSX) so the tests can import it; lessons.tsx merges it
   into the topics. The questions use new numbers, never those of «Let's
   solve» or of the example, and one wrong answer is the typical mistake.
   ========================================================================== */

export type SocialStatsTopicId =
    | 'unequal-widths'
    | 'group-means'
    | 'cumulative-polygon' | 'grouped-percentiles' | 'percentile-of-value'
    | 'compare-spread'
    | 'quartile-counts' | 'share-between' | 'mean-sd-band'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const socialStatsLessonChecks: Record<SocialStatsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Data and charts ---------- */
    'unequal-widths': {
        mistake: {
            wrong: say('Tarteen zabalera desberdina denean ere, barra bakoitzaren altuera haren maiztasuna da, $f_i$.', 'Aunque los intervalos tengan distinta amplitud, la altura de cada barra es su frecuencia $f_i$.', 'حتى لو اختلف طول الفئات، فارتفاع كل عمود هو تكراره $f_i$.', 'Even when the intervals have different widths, the height of each bar is its frequency $f_i$.'),
            right: say('Maiztasuna azalera da: altuera $\\frac{f_i}{a_i}$ da. Bikoitza zabala den barra batek maiztasun bera badu, erdia altua da.', 'La frecuencia es el área: la altura es $\\frac{f_i}{a_i}$. Una barra el doble de ancha con la misma frecuencia mide la mitad de alto.', 'التكرار هو المساحة: الارتفاع $\\frac{f_i}{a_i}$. والعمود الأعرض بمرتين بالتكرار نفسه ارتفاعه النصف.', 'The frequency is the area: the height is $\\frac{f_i}{a_i}$. A bar twice as wide with the same frequency is half as tall.')
        },
        check: {
            prompt: say('$[50,80)$ tartean 45 pertsona daude. Zer altuera du haren barrak?', 'El intervalo $[50,80)$ tiene 45 personas. ¿Qué altura tiene su barra?', 'في الفئة $[50,80)$ يوجد 45 شخصًا. ما ارتفاع عمودها؟', 'The interval $[50,80)$ has 45 people. How tall is its bar?'),
            options: [same('$45$'), same('$1{,}5$'), same('$15$')],
            correctIndex: 1,
            explanation: say('Zabalera $80-50=30$ da, eta altuera $\\frac{45}{30}=1{,}5$.', 'La amplitud es $80-50=30$ y la altura, $\\frac{45}{30}=1{,}5$.', 'الطول $80-50=30$ والارتفاع $\\frac{45}{30}=1{,}5$.', 'The width is $80-50=30$ and the height, $\\frac{45}{30}=1{,}5$.')
        }
    },

    /* ---------- 2. Measures of centre ---------- */
    'group-means': {
        mistake: {
            wrong: say('Bi taldeen batez bestekoa bien batez bestekoen erdia da: $\\frac{\\bar{x}_A+\\bar{x}_B}{2}$.', 'La media de dos grupos es la mitad de la suma de sus medias: $\\frac{\\bar{x}_A+\\bar{x}_B}{2}$.', 'متوسط مجموعتين هو نصف مجموع متوسطيهما: $\\frac{\\bar{x}_A+\\bar{x}_B}{2}$.', 'The mean of two groups is half the sum of their means: $\\frac{\\bar{x}_A+\\bar{x}_B}{2}$.'),
            right: say('Batez besteko bakoitzak bere taldearen pisua du: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. Erdia taldeak berdinak direnean bakarrik da.', 'Cada media pesa tanto como su grupo: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. Solo es la mitad si los grupos son iguales.', 'كل متوسط يزن بقدر مجموعته: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. ولا يكون النصف إلا إذا تساوت المجموعتان.', 'Each mean weighs as much as its group: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. It is only half the sum when the groups are the same size.')
        },
        check: {
            prompt: say('20 neskaren batez bestekoa 6 da, eta 30 mutilena, 7. Zein da 50 ikasleen batez bestekoa?', 'Las 20 chicas tienen de media 6 y los 30 chicos, 7. ¿Cuál es la media de los 50?', 'متوسط 20 فتاة هو 6 ومتوسط 30 فتى هو 7. ما متوسط الخمسين؟', 'The 20 girls have a mean of 6 and the 30 boys, 7. What is the mean of the 50?'),
            options: [same('$6{,}5$'), same('$6{,}6$'), same('$13$')],
            correctIndex: 1,
            explanation: same('$\\frac{20\\cdot 6+30\\cdot 7}{50}=\\frac{330}{50}=6{,}6$')
        }
    },

    /* ---------- 3. Measures of position ---------- */
    'cumulative-polygon': {
        mistake: {
            wrong: say('Poligonoaren puntuak tarte bakoitzaren klase-markan jartzen dira.', 'Los puntos del polígono se ponen en la marca de clase de cada intervalo.', 'توضع نقاط المضلّع عند مركز كل فئة.', 'The points of the polygon go at the class mark of each interval.'),
            right: say('Tartearen goiko muturrean jartzen dira: balio horretaraino iristen da ehuneko metatua. Lehen puntua lehen tartearen beheko muturra da, % 0 ehunekoarekin.', 'Se ponen en el extremo superior de cada intervalo: hasta ese valor llega el porcentaje acumulado. El primer punto es el extremo inferior del primero, con el 0 %.', 'توضع عند الطرف الأعلى لكل فئة: حتى تلك القيمة تصل النسبة المتجمّعة. والنقطة الأولى هي الطرف الأدنى للفئة الأولى بنسبة 0٪.', 'They go at the upper end of each interval: the cumulative percentage reaches up to that value. The first point is the lower end of the first interval, at 0%.')
        },
        check: {
            prompt: say('Maiztasun metatuak 12, 30, 48 eta 60 dira. Zer ehuneko metatu du bigarren tarteak?', 'Las frecuencias acumuladas son 12, 30, 48 y 60. ¿Qué porcentaje acumulado tiene el segundo intervalo?', 'التكرارات المتجمّعة 12 و30 و48 و60. ما النسبة المتجمّعة للفئة الثانية؟', 'The cumulative frequencies are 12, 30, 48 and 60. What cumulative percentage does the second interval have?'),
            options: [same('$30$'), same('$50$'), same('$18$')],
            correctIndex: 1,
            explanation: say('Ehunekotan, $\\frac{30}{60}\\cdot 100=50$.', 'En porcentaje, $\\frac{30}{60}\\cdot 100=50$.', 'بالنسبة المئوية $\\frac{30}{60}\\cdot 100=50$.', 'As a percentage, $\\frac{30}{60}\\cdot 100=50$.')
        }
    },
    'grouped-percentiles': {
        mistake: {
            wrong: say('Interpolatzean, tarteak arte metatzen den ehunekoaz zatitzen da, $H_i$.', 'Al interpolar se divide entre el porcentaje acumulado hasta el intervalo, $H_i$.', 'عند الاستكمال نقسم على النسبة المتجمّعة حتى الفئة $H_i$.', 'When interpolating you divide by the cumulative percentage up to the interval, $H_i$.'),
            right: say('Tartearen beraren ehunekoaz zatitzen da, $h_i$: tarte horretan poligonoa zenbat igotzen den.', 'Se divide entre el porcentaje del propio intervalo, $h_i$: lo que sube el polígono en ese tramo.', 'نقسم على نسبة الفئة نفسها $h_i$: أي مقدار صعود المضلّع في ذلك الجزء.', 'You divide by the percentage of the interval itself, $h_i$: how much the polygon rises over that stretch.')
        },
        check: {
            prompt: say('$[20,30)$ tartea % 40 metatuan hasten da, eta datuen % 20 ditu. Zenbat da $P_{50}$?', 'El intervalo $[20,30)$ empieza en el 40 % acumulado y tiene el 20 % de los datos. ¿Cuánto vale $P_{50}$?', 'تبدأ الفئة $[20,30)$ عند 40٪ متجمّعة وفيها 20٪ من البيانات. كم قيمة $P_{50}$؟', 'The interval $[20,30)$ starts at 40% cumulative and holds 20% of the data. What is $P_{50}$?'),
            options: [same('$25$'), same('$21{,}7$'), same('$30$')],
            correctIndex: 0,
            explanation: same('$P_{50}=20+\\frac{50-40}{20}\\cdot 10=25$')
        }
    },
    'percentile-of-value': {
        mistake: {
            wrong: say('Balio baten pertzentila haren tartearen goiko muturreko ehuneko metatua da.', 'El percentil de un valor es el porcentaje acumulado del extremo superior de su intervalo.', 'مئين قيمة هو النسبة المتجمّعة عند الطرف الأعلى لفئتها.', 'The percentile of a value is the cumulative percentage at the upper end of its interval.'),
            right: say('Tartearen barruan interpolatzen da: balioa tartearen erdian badago, ehunekoa ere bi muturretako ehunekoen erdian dago.', 'Se interpola dentro del intervalo: si el valor está en la mitad del intervalo, su porcentaje está a mitad de camino entre los de los extremos.', 'نستكمل داخل الفئة: إذا كانت القيمة في منتصف الفئة كانت نسبتها في منتصف المسافة بين نسبتي الطرفين.', 'You interpolate inside the interval: if the value is halfway along the interval, its percentage is halfway between those of the ends.')
        },
        check: {
            prompt: say('$[100,120)$ tartea % 50 eta % 90 artean doa. Zer pertzentil du 110 balioak?', 'El intervalo $[100,120)$ va del 50 % al 90 % acumulado. ¿Qué percentil tiene el valor 110?', 'تمتد الفئة $[100,120)$ من 50٪ إلى 90٪ متجمّعة. ما مئين القيمة 110؟', 'The interval $[100,120)$ runs from 50% to 90% cumulative. What percentile does the value 110 have?'),
            options: [same('$90$'), same('$55$'), same('$70$')],
            correctIndex: 2,
            explanation: same('$k=50+\\frac{110-100}{20}\\cdot 40=70$')
        }
    },

    /* ---------- 4. Measures of spread ---------- */
    'compare-spread': {
        mistake: {
            wrong: say('Barrarik altuena duen banaketa da sakabanatuena.', 'La distribución con la barra más alta es la más dispersa.', 'التوزيع ذو العمود الأعلى هو الأكثر تشتتًا.', 'The distribution with the tallest bar is the most spread out.'),
            right: say('Sakabanatzea datuak batez bestekotik zein urrun dauden da: zenbat eta pisu gehiago muturretan, orduan eta $\\sigma$ handiagoa.', 'La dispersión es lo lejos que están los datos de la media: cuanto más peso en los extremos, mayor $\\sigma$.', 'التشتت هو بُعد البيانات عن المتوسط: كلما زاد الثقل في الطرفين زاد $\\sigma$.', 'Spread is how far the data are from the mean: the more weight at the ends, the larger $\\sigma$.')
        },
        check: {
            prompt: say('Hiru taulak 1 eta 5 arteko balioak dituzte, eta batez bestekoa 3 da hiruretan. Zeinek du $\\sigma$ handiena?', 'Tres tablas tienen valores de 1 a 5 y media 3. ¿Cuál tiene mayor $\\sigma$?', 'لثلاثة جداول قيم من 1 إلى 5 ومتوسط 3. أيها له أكبر $\\sigma$؟', 'Three tables have values from 1 to 5 and mean 3. Which has the largest $\\sigma$?'),
            options: [
                say('Datu guztiak 3 balioan', 'Todos los datos en el 3', 'كل البيانات عند 3', 'All the data at 3'),
                say('Erdia 1 balioan eta erdia 5 balioan', 'La mitad en el 1 y la mitad en el 5', 'النصف عند 1 والنصف عند 5', 'Half at 1 and half at 5'),
                say('Bost balioetan berdin banatuta', 'Repartidos por igual en los cinco valores', 'موزعة بالتساوي على القيم الخمس', 'Spread equally over the five values')
            ],
            correctIndex: 1,
            explanation: say('Erdia 1 balioan eta erdia 5 balioan: datu guztiak batez bestekotik 2 unitatera daude, eta $\\sigma=2$. Guztiak 3 balioan badaude, $\\sigma=0$.', 'La mitad en el 1 y la mitad en el 5: todos los datos están a 2 de la media y $\\sigma=2$. Si todos están en el 3, $\\sigma=0$.', 'النصف عند 1 والنصف عند 5: كل البيانات على بعد 2 من المتوسط و$\\sigma=2$. وإذا كانت كلها عند 3 فإن $\\sigma=0$.', 'Half at 1 and half at 5: every datum is 2 away from the mean and $\\sigma=2$. If they are all at 3, $\\sigma=0$.')
        }
    },

    /* ---------- 5. Interpret ---------- */
    'quartile-counts': {
        mistake: {
            wrong: say('$Q_1$ eta $Me$ artean $Me$ eta $Q_3$ artean baino datu gehiago daude, tartea luzeagoa delako.', 'Entre $Q_1$ y $Me$ hay más datos que entre $Me$ y $Q_3$, porque el tramo es más largo.', 'بين $Q_1$ و$Me$ بيانات أكثر مما بين $Me$ و$Q_3$ لأن الجزء أطول.', 'There are more data between $Q_1$ and $Me$ than between $Me$ and $Q_3$, because the stretch is longer.'),
            right: say('Ondoz ondoko bi kuartilen artean beti dago datuen laurdena, tartea luzea edo motza izan. Tarte luzeak datuak sakabanatuago daudela esan nahi du.', 'Entre dos cuartiles seguidos siempre hay la cuarta parte de los datos, sea largo o corto el tramo. Un tramo largo indica datos más dispersos.', 'بين ربيعيين متتاليين يوجد دائمًا ربع البيانات، طال الجزء أو قصر. والجزء الطويل يدل على بيانات أكثر تشتتًا.', 'Between two consecutive quartiles there is always a quarter of the data, whether the stretch is long or short. A long stretch means the data are more spread out.')
        },
        check: {
            prompt: say('800 familiaren gastuetan, $Q_1=300$ eta $Q_3=500$. Zenbat familiak gastatzen dute 300 eta 500 artean?', 'En los gastos de 800 familias, $Q_1=300$ y $Q_3=500$. ¿Cuántas gastan entre 300 y 500?', 'في نفقات 800 أسرة $Q_1=300$ و$Q_3=500$. كم أسرة تنفق بين 300 و500؟', 'In the spending of 800 families, $Q_1=300$ and $Q_3=500$. How many spend between 300 and 500?'),
            options: [same('$400$'), same('$200$'), same('$600$')],
            correctIndex: 0,
            explanation: say('$Q_1$ eta $Q_3$ artean datuen erdia dago: $0{,}5\\cdot 800=400$.', 'Entre $Q_1$ y $Q_3$ está la mitad de los datos: $0{,}5\\cdot 800=400$.', 'بين $Q_1$ و$Q_3$ نصف البيانات: $0{,}5\\cdot 800=400$.', 'Between $Q_1$ and $Q_3$ lies half the data: $0{,}5\\cdot 800=400$.')
        }
    },
    'share-between': {
        mistake: {
            wrong: say('Muga bat tarte baten barruan erortzen bada, tarte horretako datu guztiak zenbatzen dira.', 'Si un límite cae dentro de un intervalo, se cuentan todos los datos de ese intervalo.', 'إذا وقع حدّ داخل فئة نعدّ كل بيانات تلك الفئة.', 'If a limit falls inside an interval, all the data of that interval are counted.'),
            right: say('Barruan geratzen den zatia bakarrik sartzen da: zabaleraren erdia bada, haren datuen erdia.', 'Solo entra la parte del intervalo que queda dentro: si es la mitad de la amplitud, la mitad de sus datos.', 'لا يدخل إلا الجزء الواقع داخل الحدود: فإن كان نصف الطول فنصف بياناتها.', 'Only the part of the interval that lies inside counts: if it is half the width, half of its data.')
        },
        check: {
            prompt: say('$[0,8)$ tarteak 40 datu ditu. Zenbat daude 0 eta 2 artean, berdin banatuta badaude?', 'El intervalo $[0,8)$ tiene 40 datos. Si están repartidos por igual, ¿cuántos hay entre 0 y 2?', 'في الفئة $[0,8)$ يوجد 40 بيانًا. إذا كانت موزعة بالتساوي، فكم بيانًا بين 0 و2؟', 'The interval $[0,8)$ has 40 data. If they are spread evenly, how many are between 0 and 2?'),
            options: [same('$10$'), same('$40$'), same('$20$')],
            correctIndex: 0,
            explanation: say('2 zabaleraren laurdena da: $\\frac{2}{8}\\cdot 40=10$.', '2 es la cuarta parte de la amplitud: $\\frac{2}{8}\\cdot 40=10$.', '2 هو ربع الطول: $\\frac{2}{8}\\cdot 40=10$.', '2 is a quarter of the width: $\\frac{2}{8}\\cdot 40=10$.')
        }
    },
    'mean-sd-band': {
        mistake: {
            wrong: same('$(\\bar{x}-\\sigma^2,\\ \\bar{x}+\\sigma^2)$'),
            right: say('Bariantza ez, desbideratze tipikoa erabiltzen da, datuen unitate berak dituelako: $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.', 'Se usa la desviación típica, no la varianza, porque tiene las mismas unidades que los datos: $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.', 'نستعمل الانحراف المعياري لا التباين، لأن له وحدات البيانات نفسها: $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.', 'You use the standard deviation, not the variance, because it has the same units as the data: $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.')
        },
        check: {
            prompt: say('$\\bar{x}=30$ eta $\\sigma=4$. Zein da $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tartea?', 'Si $\\bar{x}=30$ y $\\sigma=4$, ¿cuál es el intervalo $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$?', 'إذا كان $\\bar{x}=30$ و$\\sigma=4$ فما الفئة $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$؟', 'If $\\bar{x}=30$ and $\\sigma=4$, what is the interval $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$?'),
            options: [same('$(14,\\,46)$'), same('$(26,\\,34)$'), same('$(28,\\,32)$')],
            correctIndex: 1,
            explanation: same('$30-4=26\\qquad 30+4=34$')
        }
    }
}
