import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type BivarTopicId =
    | 'two-variables' | 'marginal' | 'conditional' | 'independence'
    | 'scatter-dependence' | 'quadrants'
    | 'covariance' | 'correlation-coefficient' | 'units-change'
    | 'regression-yx' | 'estimation' | 'regression-xy' | 'two-lines'
    | 'grouped-pairs' | 'calculation-table' | 'inverse-problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bivarLessonChecks: Record<BivarTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Two-way tables ---------- */
    'two-variables': {
        mistake: {
            wrong: say('Taulak 6 gelaxka ditu; beraz, 6 banako daude.', 'La tabla tiene 6 casillas, así que hay 6 individuos.', 'في الجدول 6 خانات، إذن هناك 6 أفراد.', 'The table has 6 cells, so there are 6 individuals.'),
            right: say('N gelaxka guztien maiztasunen batura da, ez gelaxka kopurua.', 'N es la suma de las frecuencias de todas las casillas, no el número de casillas.', 'N هو مجموع تكرارات كل الخانات، لا عدد الخانات.', 'N is the sum of the frequencies of all the cells, not the number of cells.')
        },
        check: {
            prompt: say('40 bikotetatik, $(2,\\,3)$ bikotea 10 aldiz agertzen da. Zein da haren maiztasun erlatiboa?', 'De 40 pares, el par $(2,\\,3)$ sale 10 veces. ¿Cuál es su frecuencia relativa?', 'من 40 زوجًا يظهر الزوج $(2,\\,3)$ عشر مرات. ما تكراره النسبي؟', 'Out of 40 pairs, the pair $(2,\\,3)$ appears 10 times. What is its relative frequency?'),
            options: [same('$10$'), same('$0{,}25$'), same('$4$')],
            correctIndex: 1,
            explanation: same('$\\frac{10}{40}=0{,}25$')
        }
    },
    marginal: {
        mistake: {
            wrong: say('$\\bar{y}=\\frac{8+12}{2}=10$: guztizkoen batez bestekoa.', '$\\bar{y}=\\frac{8+12}{2}=10$: la media de los totales.', '$\\bar{y}=\\frac{8+12}{2}=10$: متوسط المجموعين.', '$\\bar{y}=\\frac{8+12}{2}=10$: the mean of the totals.'),
            right: say('Guztizkoak maiztasunak dira, ez datuak: $\\bar{y}=\\frac{0\\cdot 8+1\\cdot 12}{20}=0{,}6$.', 'Los totales son frecuencias, no datos: $\\bar{y}=\\frac{0\\cdot 8+1\\cdot 12}{20}=0{,}6$.', 'المجموعان تكراران لا بيانات: $\\bar{y}=\\frac{0\\cdot 8+1\\cdot 12}{20}=0{,}6$.', 'The totals are frequencies, not data: $\\bar{y}=\\frac{0\\cdot 8+1\\cdot 12}{20}=0{,}6$.')
        },
        check: {
            prompt: say('Taula batean, $Y=1$, $Y=2$ eta $Y=3$ zutabeen guztizkoak 5, 3 eta 2 dira. Zenbat da $\\bar{y}$?', 'En una tabla, los totales de las columnas $Y=1$, $Y=2$ e $Y=3$ son 5, 3 y 2. ¿Cuánto vale $\\bar{y}$?', 'في جدول، مجاميع الأعمدة $Y=1$ و$Y=2$ و$Y=3$ هي 5 و3 و2. كم $\\bar{y}$؟', 'In a table, the totals of the columns $Y=1$, $Y=2$ and $Y=3$ are 5, 3 and 2. What is $\\bar{y}$?'),
            options: [same('$1{,}7$'), same('$2$'), same('$\\frac{10}{3}$')],
            correctIndex: 0,
            explanation: same('$\\bar{y}=\\frac{1\\cdot 5+2\\cdot 3+3\\cdot 2}{10}=1{,}7$')
        }
    },
    conditional: {
        mistake: {
            wrong: say('Kirola egiten dutenetatik $\\frac{24}{50}=0{,}48$ gainditzen dute.', 'De los que hacen deporte aprueban $\\frac{24}{50}=0{,}48$.', 'ينجح من ممارسي الرياضة $\\frac{24}{50}=0{,}48$.', 'Of those who do sport, $\\frac{24}{50}=0{,}48$ pass.'),
            right: say('Baldintzatuan errenkadaren guztizkoaz zatitzen da: $\\frac{24}{30}=0{,}8$.', 'En la condicionada se divide entre el total de la fila: $\\frac{24}{30}=0{,}8$.', 'في التوزيع الشرطي نقسم على مجموع السطر: $\\frac{24}{30}=0{,}8$.', 'In the conditional you divide by the row total: $\\frac{24}{30}=0{,}8$.')
        },
        check: {
            prompt: say('Institutu batean 100 ikasle daude; 40 neska dira, eta horietatik 12 betaurrekoekin. Zein da betaurrekoen maiztasun erlatiboa, neska izatea baldintzatuta?', 'En un instituto hay 100 alumnos; 40 son chicas, y 12 de ellas llevan gafas. ¿Qué frecuencia relativa tienen las gafas condicionadas a ser chica?', 'في مدرسة 100 تلميذ، منهم 40 بنتًا، و12 منهن يضعن نظارات. ما التكرار النسبي للنظارات المشروط بأن يكون التلميذ بنتًا؟', 'A school has 100 students; 40 are girls, and 12 of them wear glasses. What is the relative frequency of glasses given that the student is a girl?'),
            options: [same('$0{,}12$'), same('$0{,}4$'), same('$0{,}3$')],
            correctIndex: 2,
            explanation: same('$\\frac{12}{40}=0{,}3$')
        }
    },
    independence: {
        mistake: {
            wrong: say('6 eta 4, eta 3 eta 2 errenkadak ez dira independenteak, haien zenbakiak desberdinak direlako.', 'Las filas 6 y 4, y 3 y 2 no son independientes, porque sus números son distintos.', 'السطران 6 و4، و3 و2 غير مستقلين لأن أعدادهما مختلفة.', 'The rows 6 and 4, and 3 and 2, are not independent, because their numbers are different.'),
            right: say('Proportzionalak dira: $\\frac{6}{10}=\\frac{3}{5}=0{,}6$; beraz, independenteak dira.', 'Son proporcionales: $\\frac{6}{10}=\\frac{3}{5}=0{,}6$; sí son independientes.', 'إنهما متناسبان: $\\frac{6}{10}=\\frac{3}{5}=0{,}6$؛ فهما مستقلان.', 'They are proportional: $\\frac{6}{10}=\\frac{3}{5}=0{,}6$; they are independent.')
        },
        check: {
            prompt: say('Independenteak al dira X eta Y, errenkadak 8 eta 12, eta 6 eta 9 badira?', '¿Son independientes X e Y si las filas son 8 y 12, y 6 y 9?', 'هل X وY مستقلان إذا كان السطران 8 و12، و6 و9؟', 'Are X and Y independent if the rows are 8 and 12, and 6 and 9?'),
            options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez', 'No', 'لا', 'No'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن المعرفة', 'It cannot be known')],
            correctIndex: 0,
            explanation: say('Errenkadak proportzionalak dira: $\\frac{8}{20}=\\frac{6}{15}=0{,}4$.', 'Las filas son proporcionales: $\\frac{8}{20}=\\frac{6}{15}=0{,}4$.', 'السطران متناسبان: $\\frac{8}{20}=\\frac{6}{15}=0{,}4$.', 'The rows are proportional: $\\frac{8}{20}=\\frac{6}{15}=0{,}4$.')
        }
    },

    /* ---------- 2. The scatter plot ---------- */
    'scatter-dependence': {
        mistake: {
            wrong: say('Hodeiak behera egiten du; beraz, mendekotasuna ahula da.', 'La nube baja, así que la dependencia es débil.', 'السحابة تهبط، إذن الارتباط ضعيف.', 'The cloud falls, so the dependence is weak.'),
            right: say('Behera egiteak negatiboa dela esan nahi du; indarra puntuak zuzenetik zein hurbil dauden da.', 'Bajar indica que es negativa; la fuerza depende de lo pegados que estén los puntos a la recta.', 'الهبوط يعني أنه سالب؛ أما القوة فتتعلق بمدى التصاق النقاط بالمستقيم.', 'Falling means it is negative; the strength depends on how close the points are to the line.')
        },
        check: {
            prompt: say('Zer erlazio dago karratu baten aldearen eta haren azaleraren artean?', '¿Qué relación hay entre el lado de un cuadrado y su área?', 'ما العلاقة بين ضلع مربع ومساحته؟', 'What relation is there between the side of a square and its area?'),
            options: [say('Estatistiko sendoa', 'Estadística fuerte', 'إحصائية قوية', 'Strong statistical'), say('Funtzionala', 'Funcional', 'دالية', 'Functional'), say('Ez dago erlaziorik', 'No hay relación', 'لا توجد علاقة', 'There is no relation')],
            correctIndex: 1,
            explanation: say('Azalera $A=l^2$ da: alde bakoitzak azalera bakarra du.', 'El área es $A=l^2$: cada lado da una sola área.', 'المساحة $A=l^2$: لكل ضلع مساحة واحدة.', 'The area is $A=l^2$: each side gives a single area.')
        }
    },
    quadrants: {
        mistake: {
            wrong: say('$(1,\\,2)$ puntuak kendu egiten du, bere bi desbideratzeak negatiboak direlako.', 'El punto $(1,\\,2)$ resta, porque sus dos desviaciones son negativas.', 'النقطة $(1,\\,2)$ تطرح لأن انحرافيها سالبان.', 'The point $(1,\\,2)$ subtracts, because both its deviations are negative.'),
            right: say('Minus bider minus, plus: $(1-3)(2-4)=4$; behean ezkerrean ere batu egiten du.', 'Menos por menos es más: $(1-3)(2-4)=4$; abajo a la izquierda también suma.', 'سالب في سالب موجب: $(1-3)(2-4)=4$؛ فالنقطة في الأسفل يسارًا تجمع أيضًا.', 'Minus times minus is plus: $(1-3)(2-4)=4$; down on the left also adds.')
        },
        check: {
            prompt: say('Grabitate-zentroa $(10,\\,20)$ da. Zein koadrantetan dago $(14,\\,12)$ puntua, eta zer zeinu ematen du?', 'El centro de gravedad es $(10,\\,20)$. ¿En qué cuadrante está el punto $(14,\\,12)$ y qué signo da?', 'مركز الثقل $(10,\\,20)$. في أي ربع تقع النقطة $(14,\\,12)$، وما الإشارة التي تعطيها؟', 'The centre of gravity is $(10,\\,20)$. In which quadrant is the point $(14,\\,12)$, and what sign does it give?'),
            options: [say('IV, negatiboa', 'IV, negativo', 'IV، سالب', 'IV, negative'), say('I, positiboa', 'I, positivo', 'I، موجب', 'I, positive'), say('III, positiboa', 'III, positivo', 'III، موجب', 'III, positive')],
            correctIndex: 0,
            explanation: same('$(14-10)(12-20)=-32$')
        }
    },

    /* ---------- 3. Covariance and correlation ---------- */
    covariance: {
        mistake: {
            wrong: say('$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}$, ezer kendu gabe: $13{,}8$.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}$, sin restar nada: $13{,}8$.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}$ دون طرح شيء: $13{,}8$.', '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}$, without subtracting anything: $13{,}8$.'),
            right: say('Batez bestekoen biderkadura kendu behar da: $13{,}8-12=1{,}8$.', 'Falta restar el producto de las medias: $13{,}8-12=1{,}8$.', 'يجب طرح جداء المتوسطين: $13{,}8-12=1{,}8$.', 'You must subtract the product of the means: $13{,}8-12=1{,}8$.')
        },
        check: {
            prompt: say('$\\frac{\\sum x_i\\,y_i}{N}=20$, $\\bar{x}=3$ eta $\\bar{y}=6$. Zenbat da $\\sigma_{xy}$?', '$\\frac{\\sum x_i\\,y_i}{N}=20$, $\\bar{x}=3$ e $\\bar{y}=6$. ¿Cuánto vale $\\sigma_{xy}$?', '$\\frac{\\sum x_i\\,y_i}{N}=20$ و$\\bar{x}=3$ و$\\bar{y}=6$. كم $\\sigma_{xy}$؟', 'If $\\frac{\\sum x_i\\,y_i}{N}=20$, $\\bar{x}=3$ and $\\bar{y}=6$, what is $\\sigma_{xy}$?'),
            options: [same('$20$'), same('$11$'), same('$2$')],
            correctIndex: 2,
            explanation: same('$\\sigma_{xy}=20-3\\cdot 6=2$')
        }
    },
    'correlation-coefficient': {
        mistake: {
            wrong: say('Bariantzez zatitzen da: $r=\\frac{\\sigma_{xy}}{\\sigma_x^2\\,\\sigma_y^2}$.', 'Se divide entre las varianzas: $r=\\frac{\\sigma_{xy}}{\\sigma_x^2\\,\\sigma_y^2}$.', 'نقسم على التباينين: $r=\\frac{\\sigma_{xy}}{\\sigma_x^2\\,\\sigma_y^2}$.', 'You divide by the variances: $r=\\frac{\\sigma_{xy}}{\\sigma_x^2\\,\\sigma_y^2}$.'),
            right: say('Desbideratze tipikoez: $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$; bariantzekin, r ez litzateke −1 eta 1 artean geratuko.', 'Entre las desviaciones típicas: $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$; con las varianzas, r no quedaría entre −1 y 1.', 'على الانحرافين المعياريين: $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$؛ ومع التباينين لن يبقى r بين −1 و1.', 'By the standard deviations: $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$; with the variances, r would not stay between −1 and 1.')
        },
        check: {
            prompt: say('$\\sigma_{xy}=-9$, $\\sigma_x=2$ eta $\\sigma_y=5$. Zenbat da r?', '$\\sigma_{xy}=-9$, $\\sigma_x=2$ y $\\sigma_y=5$. ¿Cuánto vale r?', '$\\sigma_{xy}=-9$ و$\\sigma_x=2$ و$\\sigma_y=5$. كم r؟', 'If $\\sigma_{xy}=-9$, $\\sigma_x=2$ and $\\sigma_y=5$, what is r?'),
            options: [same('$-0{,}09$'), same('$-0{,}9$'), same('$0{,}9$')],
            correctIndex: 1,
            explanation: same('$r=\\frac{-9}{2\\cdot 5}=-0{,}9$')
        }
    },
    'units-change': {
        mistake: {
            wrong: say('Zentimetrotara pasatzean, r 100 bider egiten da: $r=60$.', 'Al pasar a centímetros, r se multiplica por 100: $r=60$.', 'عند التحويل إلى السنتيمترات يُضرب r في 100: $r=60$.', 'When you change to centimetres, r is multiplied by 100: $r=60$.'),
            right: say('r koefizienteak ez du unitaterik: $0{,}6$ izaten jarraitzen du, eta ez da inoiz 1 baino handiagoa.', 'r no tiene unidades: sigue siendo $0{,}6$, y nunca pasa de 1.', 'ليس لـ r وحدات: يبقى $0{,}6$، ولا يتجاوز 1 أبدًا.', 'r has no units: it is still $0{,}6$, and it never goes above 1.')
        },
        check: {
            prompt: say('Distantziak kilometrotan daudela, korrelazio-koefizientea 0,85 da. Zenbat da distantziak miliatan emanda (kilometro bat ≈ 0,62 milia)?', 'Con las distancias en kilómetros, el coeficiente de correlación es 0,85. ¿Cuánto vale con las distancias en millas (un kilómetro ≈ 0,62 millas)?', 'مع المسافات بالكيلومترات معامل الارتباط 0.85. كم يصبح مع المسافات بالأميال (الكيلومتر ≈ 0.62 ميل)؟', 'With the distances in kilometres, the correlation coefficient is 0.85. What is it with the distances in miles (one kilometre ≈ 0.62 miles)?'),
            options: [same('$0{,}53$'), same('$1{,}37$'), same('$0{,}85$')],
            correctIndex: 2,
            explanation: say('$0{,}62$ zenbaki positiboaz biderkatzeak ez du r aldatzen.', 'Multiplicar por $0{,}62$, que es positivo, no cambia r.', 'الضرب في $0{,}62$ الموجب لا يغيّر r.', 'Multiplying by $0{,}62$, which is positive, does not change r.')
        }
    },

    /* ---------- 4. Regression lines ---------- */
    'regression-yx': {
        mistake: {
            wrong: say('Malda $\\frac{\\sigma_{xy}}{\\sigma_x}$ da, desbideratze tipikoarekin.', 'La pendiente es $\\frac{\\sigma_{xy}}{\\sigma_x}$, con la desviación típica.', 'الميل $\\frac{\\sigma_{xy}}{\\sigma_x}$ بالانحراف المعياري.', 'The slope is $\\frac{\\sigma_{xy}}{\\sigma_x}$, with the standard deviation.'),
            right: say('Bariantzarekin: $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'Con la varianza: $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'بالتباين: $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'With the variance: $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$.')
        },
        check: {
            prompt: say('$\\sigma_{xy}=3$, $\\sigma_x^2=4$ eta $\\sigma_y^2=9$. Zein da Y-ren X-rekiko zuzenaren malda?', '$\\sigma_{xy}=3$, $\\sigma_x^2=4$ y $\\sigma_y^2=9$. ¿Cuál es la pendiente de la recta de Y sobre X?', '$\\sigma_{xy}=3$ و$\\sigma_x^2=4$ و$\\sigma_y^2=9$. ما ميل مستقيم انحدار Y على X؟', 'If $\\sigma_{xy}=3$, $\\sigma_x^2=4$ and $\\sigma_y^2=9$, what is the slope of the line of Y on X?'),
            options: [same('$1{,}5$'), same('$0{,}75$'), same('$\\frac{1}{3}$')],
            correctIndex: 1,
            explanation: same('$m_{yx}=\\frac{3}{4}=0{,}75$')
        }
    },
    estimation: {
        mistake: {
            wrong: say('$r=0{,}2$ izanik, estimazioa ona da, zuzena hodeiaren erditik pasatzen delako.', 'Con $r=0{,}2$ la estimación es buena, porque la recta pasa por el centro de la nube.', 'مع $r=0{,}2$ التقدير جيد لأن المستقيم يمرّ بمركز السحابة.', 'With $r=0{,}2$ the estimate is good, because the line passes through the centre of the cloud.'),
            right: say('r 0 zenbakitik hurbil dagoenean, puntuak zuzenetik urrun daude: ez du zentzurik estimatzeak.', 'Con r cerca de 0 los puntos están lejos de la recta: no tiene sentido estimar.', 'مع r قريب من 0 تكون النقاط بعيدة عن المستقيم: لا معنى للتقدير.', 'With r close to 0 the points are far from the line: there is no point in estimating.')
        },
        check: {
            prompt: say('Zein estimazio da fidagarriena?', '¿Qué estimación es la más fiable?', 'أي تقدير هو الأكثر موثوقية؟', 'Which estimate is the most reliable?'),
            options: [
                say('$r=-0{,}96$, datuen barruan', '$r=-0{,}96$, dentro de los datos', '$r=-0{,}96$، داخل البيانات', '$r=-0{,}96$, within the data'),
                say('$r=0{,}4$, datuen barruan', '$r=0{,}4$, dentro de los datos', '$r=0{,}4$، داخل البيانات', '$r=0{,}4$, within the data'),
                say('$r=0{,}98$, datuetatik oso urrun', '$r=0{,}98$, muy lejos de los datos', '$r=0{,}98$، بعيدًا جدًّا عن البيانات', '$r=0{,}98$, very far from the data')
            ],
            correctIndex: 0,
            explanation: say('|r| 1 zenbakitik hurbil dago, eta datuen barruan estimatzen da. Zeinuak ez du axola.', '|r| está cerca de 1 y se estima dentro de los datos. El signo no importa.', '|r| قريب من 1 والتقدير داخل البيانات. ولا تهمّ الإشارة.', '|r| is close to 1 and the estimate is within the data. The sign does not matter.')
        }
    },
    'regression-xy': {
        mistake: {
            wrong: say('x estimatzeko, x askatzen dut Y-ren X-rekiko zuzenean.', 'Para estimar x, despejo x en la recta de Y sobre X.', 'لتقدير x أعزل x في مستقيم Y على X.', 'To estimate x, I solve the line of Y on X for x.'),
            right: say('Zuzen horrek y-ren erroreak txikitzen ditu; x estimatzeko, X-ren Y-rekiko zuzena erabiltzen da.', 'Esa recta hace pequeños los errores en y; para x se usa la recta de X sobre Y.', 'ذلك المستقيم يصغّر أخطاء y؛ ولتقدير x نستعمل مستقيم X على Y.', 'That line makes the errors in y small; for x you use the line of X on Y.')
        },
        check: {
            prompt: say('$\\sigma_{xy}=6$, $\\sigma_x^2=4$ eta $\\sigma_y^2=12$. Zein koefiziente du X-ren Y-rekiko zuzenak?', '$\\sigma_{xy}=6$, $\\sigma_x^2=4$ y $\\sigma_y^2=12$. ¿Qué coeficiente tiene la recta de X sobre Y?', '$\\sigma_{xy}=6$ و$\\sigma_x^2=4$ و$\\sigma_y^2=12$. ما معامل مستقيم انحدار X على Y؟', 'If $\\sigma_{xy}=6$, $\\sigma_x^2=4$ and $\\sigma_y^2=12$, what coefficient does the line of X on Y have?'),
            options: [same('$1{,}5$'), same('$2$'), same('$0{,}5$')],
            correctIndex: 2,
            explanation: same('$m_{xy}=\\frac{6}{12}=0{,}5$')
        }
    },
    'two-lines': {
        mistake: {
            wrong: say('Koefizienteak biderkatu, eta kito: $r=0{,}9\\cdot 0{,}4=0{,}36$.', 'Se multiplican los coeficientes y ya está: $r=0{,}9\\cdot 0{,}4=0{,}36$.', 'نضرب المعاملين وانتهى: $r=0{,}9\\cdot 0{,}4=0{,}36$.', 'Multiply the coefficients and that is it: $r=0{,}9\\cdot 0{,}4=0{,}36$.'),
            right: say('Biderkadura hori $r^2$ da: $r=\\sqrt{0{,}36}=0{,}6$.', 'Ese producto es $r^2$: $r=\\sqrt{0{,}36}=0{,}6$.', 'ذلك الجداء هو $r^2$: $r=\\sqrt{0{,}36}=0{,}6$.', 'That product is $r^2$: $r=\\sqrt{0{,}36}=0{,}6$.')
        },
        check: {
            prompt: say('Erregresio-zuzenak $y=0{,}5x+3$ eta $x=0{,}5y+1{,}5$ dira. Zenbat da r?', 'Las rectas de regresión son $y=0{,}5x+3$ y $x=0{,}5y+1{,}5$. ¿Cuánto vale r?', 'مستقيما الانحدار هما $y=0{,}5x+3$ و$x=0{,}5y+1{,}5$. كم r؟', 'The regression lines are $y=0{,}5x+3$ and $x=0{,}5y+1{,}5$. What is r?'),
            options: [same('$0{,}25$'), same('$0{,}5$'), same('$1$')],
            correctIndex: 1,
            explanation: same('$r^2=0{,}5\\cdot 0{,}5=0{,}25\\qquad r=0{,}5$')
        }
    },

    /* ---------- 5. Full problems ---------- */
    'grouped-pairs': {
        mistake: {
            wrong: say('$\\frac{10\\cdot 1+10\\cdot 3+20\\cdot 1+20\\cdot 3}{20}$: gelaxka bakoitza behin zenbatzen da.', '$\\frac{10\\cdot 1+10\\cdot 3+20\\cdot 1+20\\cdot 3}{20}$: cada casilla cuenta una vez.', '$\\frac{10\\cdot 1+10\\cdot 3+20\\cdot 1+20\\cdot 3}{20}$: كل خانة تُعدّ مرة واحدة.', '$\\frac{10\\cdot 1+10\\cdot 3+20\\cdot 1+20\\cdot 3}{20}$: each cell counts once.'),
            right: say('Biderkadura bakoitza bere gelaxkaren maiztasunaz biderkatzen da: $6\\cdot 10\\cdot 1$, $2\\cdot 10\\cdot 3$…', 'Cada producto se multiplica por la frecuencia de su casilla: $6\\cdot 10\\cdot 1$, $2\\cdot 10\\cdot 3$…', 'يُضرب كل جداء في تكرار خانته: $6\\cdot 10\\cdot 1$ و$2\\cdot 10\\cdot 3$…', 'Each product is multiplied by the frequency of its cell: $6\\cdot 10\\cdot 1$, $2\\cdot 10\\cdot 3$…')
        },
        check: {
            prompt: say('Gelaxka baten markak $x=15$ eta $y=4$ dira, eta haren maiztasuna 6. Zenbat gehitzen dio $\\sum f_{ij}\\,x_i\\,y_j$ baturari?', 'Una casilla tiene marcas $x=15$ e $y=4$ y frecuencia 6. ¿Cuánto suma a $\\sum f_{ij}\\,x_i\\,y_j$?', 'لخانة المركزان $x=15$ و$y=4$ وتكرارها 6. كم تضيف إلى $\\sum f_{ij}\\,x_i\\,y_j$؟', 'A cell has marks $x=15$ and $y=4$ and frequency 6. How much does it add to $\\sum f_{ij}\\,x_i\\,y_j$?'),
            options: [same('$360$'), same('$60$'), same('$25$')],
            correctIndex: 0,
            explanation: same('$6\\cdot 15\\cdot 4=360$')
        }
    },
    'calculation-table': {
        mistake: {
            wrong: say('$\\sum x^2$ eta $(\\sum x)^2$ berdinak dira: $144$.', '$\\sum x^2$ es lo mismo que $(\\sum x)^2$: $144$.', '$\\sum x^2$ هو نفسه $(\\sum x)^2$: $144$.', '$\\sum x^2$ is the same as $(\\sum x)^2$: $144$.'),
            right: say('Lehenik x bakoitza karratura jasotzen da, eta gero batzen: $1+4+16+25=46$.', 'Primero se eleva cada x al cuadrado y luego se suma: $1+4+16+25=46$.', 'أولًا نربّع كل x ثم نجمع: $1+4+16+25=46$.', 'First square each x, then add: $1+4+16+25=46$.')
        },
        check: {
            prompt: say('$N=5$, $\\sum x=20$ eta $\\sum x^2=90$ badira, zenbat da $\\sigma_x^2$?', 'Con $N=5$, $\\sum x=20$ y $\\sum x^2=90$, ¿cuánto vale $\\sigma_x^2$?', 'مع $N=5$ و$\\sum x=20$ و$\\sum x^2=90$، كم $\\sigma_x^2$؟', 'With $N=5$, $\\sum x=20$ and $\\sum x^2=90$, what is $\\sigma_x^2$?'),
            options: [same('$18$'), same('$14$'), same('$2$')],
            correctIndex: 2,
            explanation: same('$\\sigma_x^2=\\frac{90}{5}-4^2=2$')
        }
    },
    'inverse-problems': {
        mistake: {
            wrong: say('$y=2x-3$ zuzenean, y-ren batez bestekoa gai askea da: $\\bar{y}=-3$.', 'En $y=2x-3$, la media de y es el término independiente: $\\bar{y}=-3$.', 'في $y=2x-3$ متوسط y هو الحد الثابت: $\\bar{y}=-3$.', 'In $y=2x-3$, the mean of y is the constant term: $\\bar{y}=-3$.'),
            right: say('$\\bar{y}$ zuzenaren balioa da $\\bar{x}$ puntuan: $2\\cdot 4-3=5$.', '$\\bar{y}$ es el valor de la recta en $\\bar{x}$: $2\\cdot 4-3=5$.', '$\\bar{y}$ هو قيمة المستقيم عند $\\bar{x}$: $2\\cdot 4-3=5$.', '$\\bar{y}$ is the value of the line at $\\bar{x}$: $2\\cdot 4-3=5$.')
        },
        check: {
            prompt: say('Posible al da $y=1{,}5x+1$ eta $x=0{,}8y-2$ erregresio-zuzenen bikotea?', '¿Es posible el par de rectas de regresión $y=1{,}5x+1$ y $x=0{,}8y-2$?', 'هل زوج مستقيمي الانحدار $y=1{,}5x+1$ و$x=0{,}8y-2$ ممكن؟', 'Is the pair of regression lines $y=1{,}5x+1$ and $x=0{,}8y-2$ possible?'),
            options: [
                say('Ez: $1{,}5\\cdot 0{,}8>1$', 'No: $1{,}5\\cdot 0{,}8>1$', 'لا: $1{,}5\\cdot 0{,}8>1$', 'No: $1{,}5\\cdot 0{,}8>1$'),
                say('Bai, $r=1{,}2$ izanik', 'Sí, con $r=1{,}2$', 'نعم، مع $r=1{,}2$', 'Yes, with $r=1{,}2$'),
                say('Bai, $r=0{,}7$ izanik', 'Sí, con $r=0{,}7$', 'نعم، مع $r=0{,}7$', 'Yes, with $r=0{,}7$')
            ],
            correctIndex: 0,
            explanation: say('$r^2=1{,}5\\cdot 0{,}8=1{,}2$ litzateke, baina $r^2$ ezin da 1 baino handiagoa izan.', 'Sería $r^2=1{,}5\\cdot 0{,}8=1{,}2$, pero $r^2$ no puede pasar de 1.', 'سيكون $r^2=1{,}5\\cdot 0{,}8=1{,}2$، لكن $r^2$ لا يمكن أن يتجاوز 1.', 'It would be $r^2=1{,}5\\cdot 0{,}8=1{,}2$, but $r^2$ cannot be more than 1.')
        }
    }
}
