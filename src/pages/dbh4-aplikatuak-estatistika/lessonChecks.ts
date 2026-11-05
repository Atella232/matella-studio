import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. A question
   with a single formula would be read as a calculation, so the questions
   give their numbers in words or write several formulas. Tests in
   tests/lesson-checks.test.ts.
   ========================================================================== */

export type StatisticsTopicId = 'sampling' | 'intervals' | 'charts' | 'central' | 'percentiles' | 'box-plot' | 'variance' | 'table-sd' | 'cv' | 'scatter' | 'correlation' | 'regression' | 'laplace' | 'compound' | 'contingency'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsLessonChecks: Record<StatisticsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Data and graphs ---------- */
    sampling: {
        mistake: {
            wrong: say('Herri batek zer kirol egiten duen jakiteko, kiroldegitik irteten direnei galdetzea.', 'Para saber qué deporte hace un pueblo, preguntar a quienes salen del polideportivo.', 'لمعرفة الرياضة التي يمارسها أهل بلدة، نسأل الخارجين من الملعب.', 'To find out which sport a town does, ask the people leaving the sports centre.'),
            right: say('Lagina zoriz aukeratzen da populazio osotik: horrela talde guztiak daude.', 'La muestra se elige al azar entre toda la población: así están todos los grupos.', 'تُختار العيّنة عشوائيًا من المجتمع كله: هكذا تحضر كل الفئات.', 'The sample is chosen at random from the whole population: that way every group is in it.')
        },
        check: {
            prompt: say('Zein laginek balio du herri bateko bizilagunen iritzia jakiteko?', '¿Qué muestra sirve para conocer la opinión de los vecinos de un pueblo?', 'أيّ عيّنة تصلح لمعرفة رأي سكان بلدة؟', 'Which sample tells you what the people of a village think?'),
            options: [
                say('Jaietara joaten direnak', 'Los que van a las fiestas', 'الذين يحضرون الاحتفالات', 'The people who go to the festivals'),
                say('Erroldatik zoriz aukeratutako bizilagunak', 'Vecinos elegidos al azar en el padrón', 'سكان مختارون عشوائيًا من سجل السكان', 'Residents chosen at random from the register'),
                say('Alkatearen lagunak', 'Los amigos del alcalde', 'أصدقاء رئيس البلدية', 'The mayor\'s friends')
            ],
            correctIndex: 1,
            explanation: say('Zoriz eta populazio osotik: horrela bakarrik daude talde guztiak.', 'Al azar y de toda la población: solo así están todos los grupos.', 'عشوائيًا ومن المجتمع كله: هكذا فقط تحضر كل الفئات.', 'At random and from the whole population: only then is every group in it.')
        }
    },
    intervals: {
        mistake: {
            wrong: say('$r=43$ eta 5 tarte: zabalera $43\\div 5=8{,}6$, muga deserosoekin.', '$r=43$ y 5 intervalos: amplitud $43\\div 5=8{,}6$, con extremos incómodos.', '$r=43$ و5 فئات: الطول $43\\div 5=8{,}6$، بحدود غير مريحة.', '$r=43$ and 5 intervals: width $43\\div 5=8{,}6$, with awkward ends.'),
            right: say('Hartu $r^{\\prime}=45$, 5 zenbakiaz zatigarria: zabalera 9, eta banatu soberakina bi muturretan.', 'Toma $r^{\\prime}=45$, divisible entre 5: amplitud 9, y reparte el exceso entre los dos extremos.', 'خذ $r^{\\prime}=45$ القابل للقسمة على 5: الطول 9، ووزّع الفائض على الطرفين.', 'Take $r^{\\prime}=45$, divisible by 5: width 9, and share the excess between the two ends.')
        },
        check: {
            prompt: say('Datuak 12 eta 49 artean daude, eta 4 tarte nahi dituzu. Zer zabalera hartzen duzu?', 'Los datos van de 12 a 49 y quieres 4 intervalos. ¿Qué amplitud tomas?', 'تمتد البيانات من 12 إلى 49 وتريد 4 فئات. ما الطول الذي تأخذه؟', 'The data go from 12 to 49 and you want 4 intervals. What width do you take?'),
            options: [same('10'), say('9,25', '9,25', '9.25', '9.25'), same('12')],
            correctIndex: 0,
            explanation: say('$49-12=37$; 4 zenbakiaren hurrengo multiploa 40 da, eta $40\\div 4=10$.', '$49-12=37$; el siguiente múltiplo de 4 es 40, y $40\\div 4=10$.', '$49-12=37$؛ المضاعف التالي لـ4 هو 40، و$40\\div 4=10$.', '$49-12=37$; the next multiple of 4 is 40, and $40\\div 4=10$.')
        }
    },
    charts: {
        mistake: {
            wrong: say('Kirol gogokoena histograma batean marraztea.', 'Dibujar el deporte favorito en un histograma.', 'رسم الرياضة المفضلة في مدرّج تكراري.', 'Drawing the favourite sport in a histogram.'),
            right: say('Kirola kualitatiboa da: barrak edo sektoreak. Histograma tarteetarako da.', 'El deporte es cualitativo: barras o sectores. El histograma es para intervalos.', 'الرياضة متغير نوعي: أعمدة أو قطاعات. والمدرّج للفئات.', 'Sport is qualitative: a bar chart or a pie chart. The histogram is for intervals.')
        },
        check: {
            prompt: say('Zer grafiko erabiliko zenuke gela bateko altuerak tarteetan multzokatuta badaude?', '¿Qué gráfico usarías para las alturas de una clase agrupadas en intervalos?', 'أيّ تمثيل تستعمل لأطوال قسم مجمّعة في فئات؟', 'Which graph would you use for a class\'s heights grouped in intervals?'),
            options: [
                say('Sektore-diagrama', 'Un diagrama de sectores', 'مخطط دائري', 'A pie chart'),
                say('Barra meheak, bata bestetik bereizita', 'Barras finas separadas', 'أعمدة رفيعة منفصلة', 'Thin separate bars'),
                say('Histograma', 'Un histograma', 'مدرّج تكراري', 'A histogram')
            ],
            correctIndex: 2,
            explanation: say('Aldagai jarraitua tarteetan: laukizuzen itsatsiak, hau da, histograma.', 'Variable continua en intervalos: rectángulos pegados, es decir, un histograma.', 'متغير متصل في فئات: مستطيلات متلاصقة، أي مدرّج تكراري.', 'A continuous variable in intervals: touching rectangles, that is, a histogram.')
        }
    },
    /* ---------- 2. Centralization and position ---------- */
    central: {
        mistake: {
            wrong: say('Taula batean, balioak batu eta zenbat balio desberdin dauden zatitzea.', 'En una tabla, sumar los valores y dividir entre cuántos valores distintos hay.', 'في جدول، جمع القيم والقسمة على عدد القيم المختلفة.', 'In a table, adding the values and dividing by how many different values there are.'),
            right: say('Balio bakoitza bere maiztasuna adina aldiz zenbatzen da: zatitu $\\sum f_i x_i$ zati $N$.', 'Cada valor cuenta tantas veces como su frecuencia: divide $\\sum f_i x_i$ entre $N$.', 'كل قيمة تُعدّ بقدر تكرارها: اقسم $\\sum f_i x_i$ على $N$.', 'Each value counts as many times as its frequency: divide $\\sum f_i x_i$ by $N$.')
        },
        check: {
            prompt: say('1, 2 eta 3 balioek 5, 3 eta 2 maiztasun dituzte. Zenbat da batez bestekoa?', 'Los valores 1, 2 y 3 tienen frecuencias 5, 3 y 2. ¿Cuánto vale la media?', 'للقيم 1 و2 و3 التكرارات 5 و3 و2. كم يساوي المتوسط؟', 'The values 1, 2 and 3 have frequencies 5, 3 and 2. What is the mean?'),
            options: [same('2'), say('1,7', '1,7', '1.7', '1.7'), say('5,67', '5,67', '5.67', '5.67')],
            correctIndex: 1,
            explanation: same('$\\frac{5+6+6}{10}=1{,}7$')
        }
    },
    percentiles: {
        mistake: {
            wrong: say('$p_{60}$ gisa ehuneko metatua 60 zenbakitik hurbilen duen balioa hartzea.', 'Tomar como $p_{60}$ el valor cuyo porcentaje acumulado está más cerca de 60.', 'أخذ $p_{60}$ القيمة التي نسبتها المتجمّعة أقرب إلى 60.', 'Taking as $p_{60}$ the value whose cumulative percentage is closest to 60.'),
            right: say('$p_{60}$ ehuneko metatuak 60 lehen aldiz gainditzen duen balioa da.', '$p_{60}$ es el primer valor cuyo porcentaje acumulado supera 60.', '$p_{60}$ هو أول قيمة تتجاوز نسبتها المتجمّعة 60.', '$p_{60}$ is the first value whose cumulative percentage goes above 60.')
        },
        check: {
            prompt: say('1, 2, 3, 4 eta 5 balioen ehuneko metatuak 20, 45, 70, 90 eta 100 dira. Zein da hirugarren kuartila?', 'Los porcentajes acumulados de los valores 1, 2, 3, 4 y 5 son 20, 45, 70, 90 y 100. ¿Cuál es el tercer cuartil?', 'النسب المتجمّعة للقيم 1 و2 و3 و4 و5 هي 20 و45 و70 و90 و100. ما الربيعي الثالث؟', 'The cumulative percentages of the values 1, 2, 3, 4 and 5 are 20, 45, 70, 90 and 100. What is the third quartile?'),
            options: [same('3'), same('4'), same('5')],
            correctIndex: 1,
            explanation: say('70 ez da 75 zenbakira iristen; hura gainditzen duen lehena 90 da, 4 balioarena.', '70 no llega a 75; el primero que lo supera es 90, el del 4.', '70 لا تبلغ 75؛ وأول نسبة تتجاوزها 90، وهي للقيمة 4.', '70 does not reach 75; the first one above it is 90, the one for 4.')
        }
    },
    'box-plot': {
        mistake: {
            wrong: say('Biboteak beti datu txikieneraino eta handieneraino luzatzea.', 'Alargar siempre los bigotes hasta el dato menor y el mayor.', 'مدّ الشاربين دائمًا حتى أصغر بيان وأكبره.', 'Always stretching the whiskers to the smallest and the largest value.'),
            right: say('Gehienez kutxa bider 1,5; kanpoan geratzen dena atipikoa da, eta izartxo batez markatzen da.', 'Como mucho 1,5 veces la caja; lo que queda fuera es atípico y se marca con un asterisco.', 'على الأكثر 1.5 مرة طول الصندوق؛ وما يبقى خارجه شاذ ويُعلَّم بنجمة.', 'At most 1.5 times the box; anything outside is an outlier and is marked with an asterisk.')
        },
        check: {
            prompt: say('$Q_1=20$ eta $Q_3=30$ badira, gehienez noraino irits daiteke goiko bibotea?', 'Con $Q_1=20$ y $Q_3=30$, ¿hasta dónde puede llegar como mucho el bigote superior?', 'مع $Q_1=20$ و$Q_3=30$، إلى أين يمكن أن يصل الشارب العلوي على الأكثر؟', 'With $Q_1=20$ and $Q_3=30$, how far can the upper whisker reach at most?'),
            options: [same('35'), same('40'), same('45')],
            correctIndex: 2,
            explanation: same('$30+1{,}5\\cdot 10=45$')
        }
    },
    /* ---------- 3. Spread ---------- */
    variance: {
        mistake: {
            wrong: say('Desbideratzeak karratura jaso gabe batzea: beti 0 ematen dute.', 'Sumar las desviaciones sin elevarlas al cuadrado: siempre da 0.', 'جمع الانحرافات دون تربيعها: الناتج دائمًا 0.', 'Adding the deviations without squaring them: the total is always 0.'),
            right: say('Jaso desbideratze bakoitza karratura, egin karratuen batez bestekoa eta atera erroa $\\sigma$ lortzeko.', 'Eleva al cuadrado cada desviación, haz la media de los cuadrados y saca la raíz para tener $\\sigma$.', 'ربّع كل انحراف، واحسب متوسط المربعات، ثم خذ الجذر لتحصل على $\\sigma$.', 'Square each deviation, take the mean of the squares and then the square root to get $\\sigma$.')
        },
        check: {
            prompt: say('Bi taldek 6 dute batez bestekoa; A taldeak $\\sigma=1$ du eta B taldeak $\\sigma=3$. Zein da homogeneoagoa?', 'Dos grupos tienen media 6; el A tiene $\\sigma=1$ y el B, $\\sigma=3$. ¿Cuál es más homogéneo?', 'لمجموعتين المتوسط 6؛ للمجموعة A $\\sigma=1$ وللمجموعة B $\\sigma=3$. أيهما أكثر تجانسًا؟', 'Two groups have mean 6; group A has $\\sigma=1$ and group B, $\\sigma=3$. Which is more homogeneous?'),
            options: [
                say('A', 'El A', 'A', 'A'),
                say('B', 'El B', 'B', 'B'),
                say('Biak berdin', 'Los dos igual', 'كلاهما بالقدر نفسه', 'Both the same')
            ],
            correctIndex: 0,
            explanation: say('Batez besteko berarekin, $\\sigma$ txikiagoak datuak bilduago daudela esan nahi du.', 'Con la misma media, una $\\sigma$ menor quiere decir datos más agrupados.', 'مع المتوسط نفسه، $\\sigma$ أصغر يعني بيانات أكثر تجمّعًا.', 'With the same mean, a smaller $\\sigma$ means the data are closer together.')
        }
    },
    'table-sd': {
        mistake: {
            wrong: say('$f_i x_i^2$ zutabean $(f_i x_i)^2$ kalkulatzea.', 'Calcular $(f_i x_i)^2$ en la columna $f_i x_i^2$.', 'حساب $(f_i x_i)^2$ في عمود $f_i x_i^2$.', 'Working out $(f_i x_i)^2$ in the $f_i x_i^2$ column.'),
            right: say('$x_i$ bakarrik jasotzen da karratura, eta gero maiztasunaz biderkatzen da.', 'Solo se eleva al cuadrado $x_i$, y después se multiplica por la frecuencia.', 'لا يُربَّع إلا $x_i$، ثم يُضرب في التكرار.', 'Only $x_i$ is squared, and then it is multiplied by the frequency.')
        },
        check: {
            prompt: say('$\\frac{\\sum f_i x_i^2}{N}=20$ eta $\\bar{x}=4$ badira, zenbat da bariantza?', 'Si $\\frac{\\sum f_i x_i^2}{N}=20$ y $\\bar{x}=4$, ¿cuánto vale la varianza?', 'إذا كان $\\frac{\\sum f_i x_i^2}{N}=20$ و$\\bar{x}=4$، فكم يساوي التباين؟', 'If $\\frac{\\sum f_i x_i^2}{N}=20$ and $\\bar{x}=4$, what is the variance?'),
            options: [same('16'), same('4'), same('2')],
            correctIndex: 1,
            explanation: same('$20-4^{2}=4$')
        }
    },
    cv: {
        mistake: {
            wrong: say('Batez bestekoak oso desberdinak izanda ere, $\\sigma$ handiena duenak aldakuntza handiena duela esatea.', 'Decir que varía más la distribución con mayor $\\sigma$, aunque las medias sean muy distintas.', 'القول إن التوزيع ذا $\\sigma$ الأكبر أكثر تغيرًا، مع أن المتوسطين مختلفان جدًا.', 'Saying the distribution with the larger $\\sigma$ varies more, even though the means are very different.'),
            right: say('Batez besteko desberdinekin, konparatu $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'Con medias distintas, compara $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'مع متوسطين مختلفين قارن $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'With different means, compare $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.')
        },
        check: {
            prompt: say('A taldea: $\\bar{x}=50$, $\\sigma=5$. B taldea: $\\bar{x}=10$, $\\sigma=2$. Zeinek du sakabanaketa erlatibo handiagoa?', 'Grupo A: $\\bar{x}=50$, $\\sigma=5$. Grupo B: $\\bar{x}=10$, $\\sigma=2$. ¿Cuál tiene más dispersión relativa?', 'المجموعة A: $\\bar{x}=50$، $\\sigma=5$. المجموعة B: $\\bar{x}=10$، $\\sigma=2$. أيهما تشتته النسبي أكبر؟', 'Group A: $\\bar{x}=50$, $\\sigma=5$. Group B: $\\bar{x}=10$, $\\sigma=2$. Which has more relative spread?'),
            options: [
                say('A', 'El A', 'A', 'A'),
                say('B', 'El B', 'B', 'B'),
                say('Biak berdin', 'Los dos igual', 'كلاهما بالقدر نفسه', 'Both the same')
            ],
            correctIndex: 1,
            explanation: same('$\\frac{5}{50}=0{,}1\\qquad \\frac{2}{10}=0{,}2$')
        }
    },
    /* ---------- 4. Two variables ---------- */
    scatter: {
        mistake: {
            wrong: say('Erlazioa badago, puntu guztiak marra baten gainean daudela pentsatzea.', 'Pensar que, si hay relación, todos los puntos están sobre una línea.', 'الظن أنه إذا وُجدت علاقة فكل النقاط تقع على خط.', 'Thinking that, if there is a relationship, all the points lie on a line.'),
            right: say('Erlazio estatistikoan puntuak marra baten inguruan biltzen dira bakarrik; marraren gainean, erlazio funtzionalean.', 'En una relación estadística los puntos solo se agrupan alrededor de la línea; sobre ella, en una funcional.', 'في العلاقة الإحصائية تتجمّع النقاط حول الخط فقط؛ وعليه في العلاقة الدالية.', 'In a statistical relationship the points only cluster around the line; on it, in a functional one.')
        },
        check: {
            prompt: say('Ikasle batek 4 ordu ikasi eta 6 atera du. Nola marrazten da hodeian?', 'Un alumno estudia 4 horas y saca un 6. ¿Cómo se dibuja en la nube?', 'درس تلميذ 4 ساعات ونال 6. كيف يُرسم في السحابة؟', 'A student studies for 4 hours and gets a 6. How is this drawn in the scatter plot?'),
            options: [
                say('$(6,\\,4)$ puntua', 'El punto $(6,\\,4)$', 'النقطة $(6,\\,4)$', 'The point $(6,\\,4)$'),
                say('6 altuerako barra bat', 'Una barra de altura 6', 'عمود ارتفاعه 6', 'A bar of height 6'),
                say('$(4,\\,6)$ puntua', 'El punto $(4,\\,6)$', 'النقطة $(4,\\,6)$', 'The point $(4,\\,6)$')
            ],
            correctIndex: 2,
            explanation: say('Ikasle bakoitza puntu bat da: $x$ orduak dira eta $y$ nota.', 'Cada alumno es un punto: $x$ son las horas e $y$, la nota.', 'كل تلميذ نقطة: $x$ الساعات و$y$ العلامة.', 'Each student is a point: $x$ is the hours and $y$ the mark.')
        }
    },
    correlation: {
        mistake: {
            wrong: say('$r=-0{,}9$ korrelazio ahula dela uste izatea, negatiboa delako.', 'Creer que $r=-0{,}9$ es una correlación débil porque es negativa.', 'الظن أن $r=-0{,}9$ ارتباط ضعيف لأنه سالب.', 'Believing that $r=-0{,}9$ is a weak correlation because it is negative.'),
            right: say('Zeinuak noranzkoa ematen du; balio absolutua, $0{,}9$, 1 zenbakitik hurbil dago: sendoa da.', 'El signo da el sentido; su valor absoluto, $0{,}9$, está cerca de 1: es fuerte.', 'الإشارة تعطي الاتجاه؛ وقيمته المطلقة $0{,}9$ قريبة من 1: إنه قوي.', 'The sign gives the direction; its absolute value, $0{,}9$, is close to 1: it is strong.')
        },
        check: {
            prompt: say('Zein koefizientek adierazten du korrelazio sendoena?', '¿Qué coeficiente indica la correlación más fuerte?', 'أيّ معامل يدل على أقوى ارتباط؟', 'Which coefficient shows the strongest correlation?'),
            options: [same('$r=0{,}6$'), same('$r=-0{,}92$'), same('$r=0{,}05$')],
            correctIndex: 1,
            explanation: say('Indarra balio absolutuak ematen du: $0{,}92$ da 1 zenbakitik hurbilena.', 'La fuerza la da el valor absoluto: $0{,}92$ es el más cercano a 1.', 'القوة تعطيها القيمة المطلقة: $0{,}92$ الأقرب إلى 1.', 'Strength comes from the absolute value: $0{,}92$ is the closest to 1.')
        }
    },
    regression: {
        mistake: {
            wrong: say('Datuen tartetik kanpo estimatu eta emaitzaz fidatzea.', 'Estimar fuera del intervalo de los datos y fiarse del resultado.', 'التقدير خارج مجال البيانات والوثوق بالنتيجة.', 'Estimating outside the range of the data and trusting the result.'),
            right: say('Tartetik kanpo (estrapolazioa) joera alda daiteke: estimazioa ez da fidagarria.', 'Fuera del intervalo (extrapolación) la tendencia puede cambiar: la estimación no es fiable.', 'خارج المجال (الاستقراء الخارجي) قد يتغير الاتجاه: التقدير غير موثوق.', 'Outside the range (extrapolation) the trend may change: the estimate is not reliable.')
        },
        check: {
            prompt: say('$\\hat{y}=2x+10$ zuzena 0 eta 20 arteko $x$ datuekin lortu da. Zein estimazio da fidagarria?', 'La recta $\\hat{y}=2x+10$ se obtuvo con datos de $x$ entre 0 y 20. ¿Qué estimación es fiable?', 'حُسب المستقيم $\\hat{y}=2x+10$ ببيانات لـ$x$ بين 0 و20. أيّ تقدير موثوق؟', 'The line $\\hat{y}=2x+10$ came from data with $x$ between 0 and 20. Which estimate is reliable?'),
            options: [
                say('15 baliorako: 40 inguru', 'Para 15: unos 40', 'عند 15: نحو 40', 'For 15: about 40'),
                say('50 baliorako: 110 inguru', 'Para 50: unos 110', 'عند 50: نحو 110', 'For 50: about 110'),
                say('Biak', 'Las dos', 'كلاهما', 'Both')
            ],
            correctIndex: 0,
            explanation: say('15 datuen barruan dago; 50 kanpoan: estrapolazioa da.', '15 está dentro de los datos; 50 queda fuera: es una extrapolación.', '15 داخل البيانات؛ و50 خارجها: إنه استقراء خارجي.', '15 is inside the data; 50 is outside: that is extrapolation.')
        }
    },
    /* ---------- 5. Probability ---------- */
    laplace: {
        mistake: {
            wrong: say('Gertaera bateragarriekin $P(A)+P(B)$ batzea, besterik gabe.', 'Sumar $P(A)+P(B)$ sin más con sucesos compatibles.', 'جمع $P(A)+P(B)$ فقط مع حدثين متوافقين.', 'Just adding $P(A)+P(B)$ for compatible events.'),
            right: say('Kendu bien zatia, bi aldiz zenbatu delako: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', 'Resta la parte común, que se ha contado dos veces: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', 'اطرح الجزء المشترك لأنه عُدّ مرتين: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', 'Subtract the common part, which was counted twice: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.')
        },
        check: {
            prompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cap B)=0{,}2$. Zenbat da $P(A\\cup B)$?', '$P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}2$. ¿Cuánto vale $P(A\\cup B)$?', '$P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cap B)=0{,}2$. كم يساوي $P(A\\cup B)$؟', '$P(A)=0{,}5$, $P(B)=0{,}4$ and $P(A\\cap B)=0{,}2$. What is $P(A\\cup B)$?'),
            options: [say('0,9', '0,9', '0.9', '0.9'), say('0,2', '0,2', '0.2', '0.2'), say('0,7', '0,7', '0.7', '0.7')],
            correctIndex: 2,
            explanation: same('$0{,}5+0{,}4-0{,}2=0{,}7$')
        }
    },
    compound: {
        mistake: {
            wrong: say('Itzuli gabe ateratzean, bigarren adarrean probabilitate bera erabiltzea.', 'Al sacar sin devolver, usar la misma probabilidad en la segunda rama.', 'عند السحب دون إرجاع، استعمال الاحتمال نفسه في الفرع الثاني.', 'When drawing without replacement, using the same probability on the second branch.'),
            right: say('Itzuli gabe, kasuak aldatzen dira: bigarren adarrean elementu bat gutxiago dago.', 'Sin devolver, cambian los casos: en la segunda rama hay un elemento menos.', 'دون إرجاع تتغير الحالات: في الفرع الثاني عنصر أقل.', 'Without replacement the cases change: on the second branch there is one item fewer.')
        },
        check: {
            prompt: say('Poltsa batean 3 bola gorri eta 2 berde daude. Bi ateratzen dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?', 'En una bolsa hay 3 bolas rojas y 2 verdes. Se sacan dos sin devolver. ¿Qué probabilidad hay de que las dos sean rojas?', 'في كيس 3 كرات حمراء و2 خضراوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكون كلتاهما حمراء؟', 'A bag has 3 red balls and 2 green ones. Two are drawn without replacement. What is the probability that both are red?'),
            options: [same('$\\frac{3}{10}$'), same('$\\frac{9}{25}$'), same('$\\frac{3}{5}$')],
            correctIndex: 0,
            explanation: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$')
        }
    },
    contingency: {
        mistake: {
            wrong: say('Probabilitate baldintzatuan, guztizko nagusiaz zatitzea.', 'En la condicionada, dividir entre el total general.', 'في الاحتمال المشروط، القسمة على المجموع العام.', 'For a conditional probability, dividing by the grand total.'),
            right: say('$P(A/B)$ kalkulatzean, kasu posibleak B-renak bakarrik dira: zatitu B-ren guztizkoaz.', 'En $P(A/B)$, los casos posibles son solo los de B: divide entre el total de B.', 'في $P(A/B)$ الحالات الممكنة هي حالات B فقط: اقسم على مجموع B.', 'In $P(A/B)$, the possible cases are only those of B: divide by the total of B.')
        },
        check: {
            prompt: say('30 ikasleko gela batean 12 neska daude; haietatik 4 betaurrekodunak dira. Neska dela jakinda, zein da betaurrekoak eramateko probabilitatea?', 'En una clase de 30 hay 12 chicas, y 4 de ellas llevan gafas. Sabiendo que es chica, ¿qué probabilidad hay de que lleve gafas?', 'في قسم من 30 تلميذًا 12 بنتًا، 4 منهن بنظارات. علمًا أنها بنت، ما احتمال أن تلبس نظارات؟', 'A class of 30 has 12 girls, and 4 of them wear glasses. Given that it is a girl, what is the probability that she wears glasses?'),
            options: [same('$\\frac{4}{30}$'), same('$\\frac{12}{30}$'), same('$\\frac{1}{3}$')],
            correctIndex: 2,
            explanation: say('Neskak bakarrik: $\\frac{4}{12}=\\frac{1}{3}$.', 'Solo las chicas: $\\frac{4}{12}=\\frac{1}{3}$.', 'البنات فقط: $\\frac{4}{12}=\\frac{1}{3}$.', 'Only the girls: $\\frac{4}{12}=\\frac{1}{3}$.')
        }
    }
}
