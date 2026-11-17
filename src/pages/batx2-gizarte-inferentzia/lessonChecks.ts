import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type InferenceBatx2gTopicId =
    | 'point-estimate' | 'confidence-level' | 'critical-value'
    | 'mean-interval' | 'interpret' | 'interval-to-data'
    | 'error-margin' | 'sample-size' | 'what-changes'
    | 'proportion-interval' | 'proportion-error' | 'proportion-size'
    | 'polls' | 'compare-claim' | 'level-or-size'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const inferenceBatx2gLessonChecks: Record<InferenceBatx2gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'point-estimate': {
        mistake: {
            wrong: say('Laginaren batez bestekoa populazioarena da, zehatz-mehatz.', 'La media de la muestra es exactamente la de la población.', 'متوسط العيّنة هو متوسط المجتمع تمامًا.', 'The sample mean is exactly the population mean.'),
            right: say('$\\bar{x}$ zenbakiak $\\mu$ estimatzen du; beste lagin batek beste balio bat emango luke.', '$\\bar{x}$ estima $\\mu$; otra muestra daría otro valor.', '$\\bar{x}$ يقدّر $\\mu$؛ وعيّنة أخرى تعطي قيمة أخرى.', '$\\bar{x}$ estimates $\\mu$; another sample would give another value.')
        },
        check: {
            prompt: say('250 pertsonatik, 60 pertsonak auto elektrikoa dute. Zein da $p$ zenbakiaren estimazio puntuala?', 'De 250 personas, 60 tienen coche eléctrico. ¿Cuál es la estimación puntual de $p$?', 'من 250 شخصًا لدى 60 سيارة كهربائية. ما التقدير النقطي لـ $p$؟', 'Of 250 people, 60 have an electric car. What is the point estimate of $p$?'),
            options: [same('$0{,}24$'), same('$60$'), same('$0{,}76$')],
            correctIndex: 0,
            explanation: same('$\\hat{p}=\\frac{60}{250}=0{,}24$')
        }
    },
    'confidence-level': {
        mistake: {
            wrong: say('% 95 probabilitatearekin, taulan $0{,}95$ bilatzen da: $1{,}645$.', 'Para el 95 % se busca $0{,}95$ en la tabla: $1{,}645$.', 'لـ 95 % نبحث عن $0{,}95$ في الجدول: $1{,}645$.', 'For 95%, look up $0{,}95$ in the table: $1{,}645$.'),
            right: say('Buztan bakoitzean $\\frac{\\alpha}{2}$ dago: bilatu $0{,}975$, eta $1{,}96$ ateratzen da.', 'En cada cola hay $\\frac{\\alpha}{2}$: busca $0{,}975$ y sale $1{,}96$.', 'في كل ذيل $\\frac{\\alpha}{2}$: ابحث عن $0{,}975$ فتخرج $1{,}96$.', 'Each tail holds $\\frac{\\alpha}{2}$: look up $0{,}975$ and you get $1{,}96$.')
        },
        check: {
            prompt: say('Konfiantza-maila % 90 da. Zenbat da $\\frac{\\alpha}{2}$?', 'El nivel de confianza es del 90 %. ¿Cuánto vale $\\frac{\\alpha}{2}$?', 'مستوى الثقة 90 %. كم يساوي $\\frac{\\alpha}{2}$؟', 'The confidence level is 90%. What is $\\frac{\\alpha}{2}$?'),
            options: [same('$0{,}1$'), same('$0{,}05$'), same('$0{,}95$')],
            correctIndex: 1,
            explanation: same('$\\alpha=0{,}1\\ \\to\\ \\frac{\\alpha}{2}=0{,}05$')
        }
    },
    'critical-value': {
        mistake: {
            wrong: say('% 98 probabilitatearekin, balio kritikoa $0{,}98$ da.', 'Para el 98 %, el valor crítico es $0{,}98$.', 'لـ 98 % القيمة الحرجة هي $0{,}98$.', 'For 98%, the critical value is $0{,}98$.'),
            right: say('$0{,}99$ probabilitatea bilatzen da taularen barruan, eta $2{,}33$ ateratzen da.', 'Se busca la probabilidad $0{,}99$ dentro de la tabla y sale $2{,}33$.', 'نبحث عن الاحتمال $0{,}99$ داخل الجدول فتخرج $2{,}33$.', 'Look for the probability $0{,}99$ inside the table, and you get $2{,}33$.')
        },
        check: {
            prompt: say('% 80 probabilitatearekin, zer probabilitate bilatzen da taulan?', 'Para el 80 %, ¿qué probabilidad se busca en la tabla?', 'لـ 80 %، أي احتمال نبحث عنه في الجدول؟', 'For 80%, what probability do you look up in the table?'),
            options: [same('$0{,}8$'), same('$0{,}1$'), same('$0{,}9$')],
            correctIndex: 2,
            explanation: same('$1-\\frac{0{,}2}{2}=0{,}9$')
        }
    },
    'mean-interval': {
        mistake: {
            wrong: say('Erradioa ${z}_{\\alpha/2}\\cdot\\sigma$ da.', 'El radio es ${z}_{\\alpha/2}\\cdot\\sigma$.', 'نصف القطر ${z}_{\\alpha/2}\\cdot\\sigma$.', 'The radius is ${z}_{\\alpha/2}\\cdot\\sigma$.'),
            right: say('Laginaren batez bestekoaren desbideratzea erabiltzen da: ${z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Se usa la desviación de la media muestral: ${z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'نستعمل انحراف متوسط العيّنة: ${z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Use the deviation of the sample mean: ${z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.')
        },
        check: {
            prompt: say('$\\bar{x}=30$, $\\sigma=6$ eta $n=36$. Zein da $\\mu$ zenbakiaren konfiantza-tartea, % 95 mailan?', '$\\bar{x}=30$, $\\sigma=6$ y $n=36$. ¿Cuál es el intervalo de confianza del 95 % para $\\mu$?', '$\\bar{x}=30$ و$\\sigma=6$ و$n=36$. ما فترة الثقة 95 % لـ $\\mu$؟', '$\\bar{x}=30$, $\\sigma=6$ and $n=36$. What is the 95% confidence interval for $\\mu$?'),
            options: [same('$(28{,}04;\\ 31{,}96)$'), same('$(18{,}24;\\ 41{,}76)$'), same('$(29{,}02;\\ 30{,}98)$')],
            correctIndex: 0,
            explanation: same('$1{,}96\\cdot\\frac{6}{\\sqrt{36}}=1{,}96$')
        }
    },
    interpret: {
        mistake: {
            wrong: say('% 95 probabilitatea dago $\\mu$ zenbakia $(170{,}04;\\ 173{,}96)$ tartean egoteko.', 'Hay un 95 % de probabilidad de que $\\mu$ esté en $(170{,}04;\\ 173{,}96)$.', 'هناك احتمال 95 % أن يكون $\\mu$ في $(170{,}04;\\ 173{,}96)$.', 'There is a 95% probability that $\\mu$ lies in $(170{,}04;\\ 173{,}96)$.'),
            right: say('$\\mu$ finkoa da: tarte hori ona da ala ez. % 95 metodoari dagokio: 100 tartetik 95 inguruk harrapatzen dute $\\mu$.', '$\\mu$ es fijo: ese intervalo acierta o no. El 95 % es del método: de cada 100 intervalos, unos 95 atrapan $\\mu$.', '$\\mu$ ثابت: إما أن تصيبه الفترة أو لا. و95 % تخص الطريقة: من كل 100 فترة تلتقط نحو 95 منها $\\mu$.', '$\\mu$ is fixed: that interval either catches it or not. The 95% belongs to the method: of every 100 intervals, about 95 catch $\\mu$.')
        },
        check: {
            prompt: say('200 tarte egiten dira, % 90 mailan. Zenbatek ez dute $\\mu$ harrapatuko, gutxi gorabehera?', 'Se construyen 200 intervalos al 90 %. ¿Cuántos esperas que no atrapen $\\mu$?', 'تُبنى 200 فترة عند 90 %. كم فترة تتوقع ألا تلتقط $\\mu$؟', '200 intervals are built at 90%. About how many do you expect to miss $\\mu$?'),
            options: [same('$10$'), same('$20$'), same('$180$')],
            correctIndex: 1,
            explanation: same('$200\\cdot 0{,}1=20$')
        }
    },
    'interval-to-data': {
        mistake: {
            wrong: say('Tartearen beheko muga da $\\bar{x}$.', 'La media muestral $\\bar{x}$ es el extremo inferior del intervalo.', 'المتوسط $\\bar{x}$ هو الطرف الأدنى للفترة.', 'The sample mean $\\bar{x}$ is the lower end of the interval.'),
            right: say('$\\bar{x}$ tartearen erdiko puntua da, eta errorea zabaleraren erdia.', '$\\bar{x}$ es el punto medio del intervalo, y el error, la mitad de su anchura.', '$\\bar{x}$ منتصف الفترة، والخطأ نصف عرضها.', '$\\bar{x}$ is the midpoint of the interval, and the error is half its width.')
        },
        check: {
            prompt: say('Konfiantza-tartea $(12{,}4;\\ 15{,}6)$ da. Zenbat da errorea, $E$?', 'El intervalo de confianza es $(12{,}4;\\ 15{,}6)$. ¿Cuánto vale el error $E$?', 'فترة الثقة $(12{,}4;\\ 15{,}6)$. كم يساوي الخطأ $E$؟', 'The confidence interval is $(12{,}4;\\ 15{,}6)$. What is the error $E$?'),
            options: [same('$14$'), same('$3{,}2$'), same('$1{,}6$')],
            correctIndex: 2,
            explanation: same('$E=\\frac{15{,}6-12{,}4}{2}=1{,}6$')
        }
    },
    'error-margin': {
        mistake: {
            wrong: same('$E=z_{\\alpha/2}\\,\\frac{\\sigma}{n}$'),
            right: say('Erroa behar da: $E=z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Hace falta la raíz: $E=z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'يلزم الجذر: $E=z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'You need the root: $E=z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.')
        },
        check: {
            prompt: say('$\\sigma=20$ eta $n=100$. Zenbat da errorea, % 90 mailan?', '$\\sigma=20$ y $n=100$. ¿Cuánto vale el error al 90 %?', '$\\sigma=20$ و$n=100$. كم يساوي الخطأ عند 90 %؟', '$\\sigma=20$ and $n=100$. What is the error at 90%?'),
            options: [same('$32{,}9$'), same('$3{,}29$'), same('$0{,}329$')],
            correctIndex: 1,
            explanation: same('$1{,}645\\cdot\\frac{20}{10}=3{,}29$')
        }
    },
    'sample-size': {
        mistake: {
            wrong: say('$n\\ge 96{,}04$ bada, $96$ pertsona hartzen dira.', 'Si $n\\ge 96{,}04$, se toman $96$ personas.', 'إذا كان $n\\ge 96{,}04$ نأخذ $96$ شخصًا.', 'If $n\\ge 96{,}04$, take $96$ people.'),
            right: say('Gorantz biribiltzen da: $97$ behar dira, $96$ pertsonarekin errorea handiegia da.', 'Se redondea hacia arriba: hacen falta $97$; con $96$ el error se pasa.', 'نقرّب إلى الأعلى: نحتاج $97$؛ فمع $96$ يتجاوز الخطأ الحد.', 'Round up: you need $97$; with $96$ the error is too big.')
        },
        check: {
            prompt: say('Kalkuluak $n\\ge 150{,}06$ ematen du. Zenbat pertsona behar dira?', 'El cálculo da $n\\ge 150{,}06$. ¿Cuántas personas hacen falta?', 'يعطي الحساب $n\\ge 150{,}06$. كم شخصًا نحتاج؟', 'The calculation gives $n\\ge 150{,}06$. How many people are needed?'),
            options: [same('$151$'), same('$150$'), same('$150{,}06$')],
            correctIndex: 0,
            explanation: say('Pertsonak osoak dira eta gorantz biribiltzen da: $151$.', 'Las personas son enteras y se redondea hacia arriba: $151$.', 'الأشخاص أعداد صحيحة ونقرّب إلى الأعلى: $151$.', 'People come whole and you round up: $151$.')
        }
    },
    'what-changes': {
        mistake: {
            wrong: say('$n$ bikoiztean, errorea erdia da.', 'Al duplicar $n$, el error se reduce a la mitad.', 'عند مضاعفة $n$ يصبح الخطأ نصفه.', 'Doubling $n$ halves the error.'),
            right: say('Errorea $\\frac{1}{\\sqrt{n}}$ bezala aldatzen da: erdia izateko, $n$ lau aldiz handiagoa behar da.', 'El error va como $\\frac{1}{\\sqrt{n}}$: para la mitad hace falta $n$ cuatro veces mayor.', 'يتغيّر الخطأ مثل $\\frac{1}{\\sqrt{n}}$: لتنصيفه نحتاج $n$ أكبر بأربع مرات.', 'The error goes like $\\frac{1}{\\sqrt{n}}$: to halve it you need $n$ four times bigger.')
        },
        check: {
            prompt: say('Zerk egiten du errorea txikiago?', '¿Qué hace más pequeño el error?', 'ما الذي يصغّر الخطأ؟', 'What makes the error smaller?'),
            options: [say('$\\sigma$ handiagoa', 'Una $\\sigma$ mayor', '$\\sigma$ أكبر', 'A bigger $\\sigma$'), say('Maila handiagoa', 'Más nivel de confianza', 'مستوى ثقة أعلى', 'A higher confidence level'), say('Lagin handiagoa', 'Una muestra mayor', 'عيّنة أكبر', 'A bigger sample')],
            correctIndex: 2,
            explanation: say('$n$ izendatzailean dago, erro baten barruan: $n$ handitzean, errorea txikitzen da.', '$n$ está en el denominador, bajo una raíz: al crecer $n$, el error baja.', '$n$ في المقام تحت الجذر: كلما كبر $n$ صغر الخطأ.', '$n$ is in the denominator, under a root: as $n$ grows, the error shrinks.')
        }
    },
    'proportion-interval': {
        mistake: {
            wrong: say('Proportzioen tartean, erradioa ${z}_{\\alpha/2}\\cdot\\hat{p}$ da.', 'En el intervalo de proporciones, el radio es ${z}_{\\alpha/2}\\cdot\\hat{p}$.', 'في فترة النسب نصف القطر ${z}_{\\alpha/2}\\cdot\\hat{p}$.', 'In the interval for a proportion, the radius is ${z}_{\\alpha/2}\\cdot\\hat{p}$.'),
            right: say('$\\hat{p}$ aldagaiaren desbideratzea erabiltzen da: ${z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'Se usa la desviación de $\\hat{p}$: ${z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'نستعمل انحراف $\\hat{p}$: ${z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'Use the deviation of $\\hat{p}$: ${z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.')
        },
        check: {
            prompt: say('$\\hat{p}=0{,}5$ eta $n=400$. Zenbat da erradioa, % 95 mailan?', '$\\hat{p}=0{,}5$ y $n=400$. ¿Cuánto vale el radio al 95 %?', '$\\hat{p}=0{,}5$ و$n=400$. كم يساوي نصف القطر عند 95 %؟', '$\\hat{p}=0{,}5$ and $n=400$. What is the radius at 95%?'),
            options: [same('$0{,}049$'), same('$0{,}025$'), same('$0{,}98$')],
            correctIndex: 0,
            explanation: same('$1{,}96\\cdot\\sqrt{\\frac{0{,}25}{400}}=1{,}96\\cdot 0{,}025=0{,}049$')
        }
    },
    'proportion-error': {
        mistake: {
            wrong: same('$E=z_{\\alpha/2}\\,\\frac{\\hat{p}\\hat{q}}{n}$'),
            right: say('Errorea erroarekin doa: $E=z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'El error lleva raíz: $E=z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'الخطأ بالجذر: $E=z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'The error has a root: $E=z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.')
        },
        check: {
            prompt: say('$\\hat{p}=0{,}2$ eta $n=100$. Zenbat da errorea, % 90 mailan?', '$\\hat{p}=0{,}2$ y $n=100$. ¿Cuánto vale el error al 90 %?', '$\\hat{p}=0{,}2$ و$n=100$. كم يساوي الخطأ عند 90 %؟', '$\\hat{p}=0{,}2$ and $n=100$. What is the error at 90%?'),
            options: [same('$0{,}00263$'), same('$0{,}0658$'), same('$0{,}329$')],
            correctIndex: 1,
            explanation: same('$1{,}645\\cdot\\sqrt{\\frac{0{,}16}{100}}=1{,}645\\cdot 0{,}04=0{,}0658$')
        }
    },
    'proportion-size': {
        mistake: {
            wrong: say('Aurretiko daturik ez badago, $\\hat{p}=0$ hartzen da.', 'Si no hay datos previos, se toma $\\hat{p}=0$.', 'إذا لم توجد بيانات سابقة نأخذ $\\hat{p}=0$.', 'With no previous data, take $\\hat{p}=0$.'),
            right: say('$\\hat{p}=0{,}5$ hartzen da, kasurik txarrena: $\\hat{p}\\hat{q}$ handiena da.', 'Se toma $\\hat{p}=0{,}5$, el caso más desfavorable: $\\hat{p}\\hat{q}$ es máximo.', 'نأخذ $\\hat{p}=0{,}5$، أسوأ حالة: يكون $\\hat{p}\\hat{q}$ أكبر ما يمكن.', 'Take $\\hat{p}=0{,}5$, the worst case: $\\hat{p}\\hat{q}$ is as big as it gets.')
        },
        check: {
            prompt: say('Aurretiko daturik gabe, zer balio hartzen du $\\hat{p}\\hat{q}$ biderkadurak?', 'Sin datos previos, ¿qué valor toma $\\hat{p}\\hat{q}$?', 'بلا بيانات سابقة، ما قيمة $\\hat{p}\\hat{q}$؟', 'With no previous data, what value does $\\hat{p}\\hat{q}$ take?'),
            options: [same('$0{,}25$'), same('$0{,}5$'), same('$1$')],
            correctIndex: 0,
            explanation: same('$0{,}5\\cdot 0{,}5=0{,}25$')
        }
    },
    polls: {
        mistake: {
            wrong: say('Inkestak % 40 ematen badu, ± 2 errorearekin, botoen % 40 izango ditu, zehatz.', 'Si la encuesta da el 40 % con un error de ± 2, sacará exactamente el 40 % de los votos.', 'إذا أعطى الاستطلاع 40 % بخطأ ± 2 فسيحصل على 40 % من الأصوات تمامًا.', 'If the poll gives 40% with an error of ± 2, it will get exactly 40% of the votes.'),
            right: say('% 38 eta % 42 artean egongo dela uste da, konfiantza-maila jakin batekin.', 'Se espera entre el 38 % y el 42 %, con un nivel de confianza dado.', 'يُتوقع أن يكون بين 38 % و42 % بمستوى ثقة معيّن.', 'It is expected to be between 38% and 42%, with a given confidence level.')
        },
        check: {
            prompt: say('Inkesta batek % 52 ematen du, ± 3 errorearekin, % 95 mailan. Zein da tartea?', 'Una encuesta da el 52 % con un error de ± 3 al 95 %. ¿Cuál es el intervalo?', 'يعطي استطلاع 52 % بخطأ ± 3 عند 95 %. ما الفترة؟', 'A poll gives 52% with an error of ± 3 at 95%. What is the interval?'),
            options: [same('$(0{,}52;\\ 0{,}55)$'), same('$(0{,}46;\\ 0{,}58)$'), same('$(0{,}49;\\ 0{,}55)$')],
            correctIndex: 2,
            explanation: same('$0{,}52\\pm 0{,}03$')
        }
    },
    'compare-claim': {
        mistake: {
            wrong: say('Baieztatutako balioa tartetik kanpo badago, ezinezkoa da.', 'Si el valor afirmado está fuera del intervalo, es imposible.', 'إذا كانت القيمة المزعومة خارج الفترة فهي مستحيلة.', 'If the claimed value is outside the interval, it is impossible.'),
            right: say('Ez da bateragarria maila horrekin: sinesgarritasun gutxikoa da, ez ezinezkoa.', 'No es compatible con ese nivel: es poco creíble, no imposible.', 'ليست متوافقة عند ذلك المستوى: قليلة المصداقية لا مستحيلة.', 'It is not compatible at that level: hard to believe, not impossible.')
        },
        check: {
            prompt: say('% 95 mailako tartea $(0{,}31;\\ 0{,}39)$ da. Bateragarria da $p=0{,}4$?', 'El intervalo al 95 % es $(0{,}31;\\ 0{,}39)$. ¿Es compatible $p=0{,}4$?', 'فترة 95 % هي $(0{,}31;\\ 0{,}39)$. هل $p=0{,}4$ متوافقة؟', 'The 95% interval is $(0{,}31;\\ 0{,}39)$. Is $p=0{,}4$ compatible?'),
            options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez', 'No', 'لا', 'No'), say('$n$ zenbakiaren araberakoa da', 'Depende de $n$', 'يعتمد على $n$', 'It depends on $n$')],
            correctIndex: 1,
            explanation: say('$0{,}4$ tartetik kanpo dago: ez da bateragarria % 95 mailan.', '$0{,}4$ queda fuera del intervalo: no es compatible al 95 %.', '$0{,}4$ خارج الفترة: ليست متوافقة عند 95 %.', '$0{,}4$ is outside the interval: not compatible at 95%.')
        }
    },
    'level-or-size': {
        mistake: {
            wrong: say('Konfiantza-maila igotzean, errorea txikitzen da.', 'Al subir el nivel de confianza, el error baja.', 'عند رفع مستوى الثقة يقل الخطأ.', 'Raising the confidence level lowers the error.'),
            right: say('Errorea handitzen da, ${z}_{\\alpha/2}$ handiagoa delako; errore bera izateko, $n$ handiagoa behar da.', 'El error sube, porque ${z}_{\\alpha/2}$ es mayor; para el mismo error hace falta más $n$.', 'يزداد الخطأ لأن ${z}_{\\alpha/2}$ أكبر؛ وللحفاظ على الخطأ نحتاج $n$ أكبر.', 'The error goes up, because ${z}_{\\alpha/2}$ is bigger; for the same error you need a bigger $n$.')
        },
        check: {
            prompt: say('$\\sigma=4$, $E\\le 1$ eta % 90 maila. Zenbat pertsona behar dira?', '$\\sigma=4$, $E\\le 1$ y nivel del 90 %. ¿Cuántas personas hacen falta?', '$\\sigma=4$ و$E\\le 1$ ومستوى 90 %. كم شخصًا نحتاج؟', '$\\sigma=4$, $E\\le 1$ and a 90% level. How many people are needed?'),
            options: [same('$43$'), same('$44$'), same('$7$')],
            correctIndex: 1,
            explanation: same('$(1{,}645\\cdot 4)^2=43{,}2964\\ \\to\\ 44$')
        }
    }
}
