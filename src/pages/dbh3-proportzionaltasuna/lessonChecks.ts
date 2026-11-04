import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Proportzionaltasuna · 3. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import
   it; lessons.tsx merges it into the topics. The mistakes are the ones the
   lessons already had; the questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type Proportion3TopicId = 'ratio' | 'proportion' | 'scale' | 'direct' | 'inverse' | 'graphs' | 'compound' | 'direct-share' | 'inverse-share' | 'percent-index' | 'chained' | 'interest' | 'mixtures' | 'motion' | 'work'

export const proportion3LessonChecks: Record<Proportion3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    ratio: {
        mistake: {
            wrong: say('$\\frac{2}{3}$ eta $\\frac{4}{5}$ proportzionalak dira, bietan goiko zenbakiari 1 gehitzen zaiolako behekoa lortzeko.', '$\\frac{2}{3}$ y $\\frac{4}{5}$ son proporcionales, porque en las dos se suma 1 para pasar de arriba abajo.', '$\\frac{2}{3}$ و$\\frac{4}{5}$ متناسبتان لأننا نضيف 1 في الحالتين للانتقال من الأعلى إلى الأسفل.', '$\\frac{2}{3}$ and $\\frac{4}{5}$ are proportional, because in both you add 1 to go from top to bottom.'),
            right: say('Proportzioak zatidurak konparatzen ditu, ez kenketak: $2\\cdot 5=10$ eta $3\\cdot 4=12$, ez dira berdinak.', 'Una proporción compara cocientes, no restas: $2\\cdot 5=10$ y $3\\cdot 4=12$ no son iguales.', 'التناسب يقارن حواصل القسمة لا الفروق: $2\\cdot 5=10$ و$3\\cdot 4=12$ غير متساويين.', 'A proportion compares quotients, not differences: $2\\cdot 5=10$ and $3\\cdot 4=12$ are not equal.')
        },
        check: {
            prompt: say('Zein arrazoi bikotek osatzen du proportzio bat?', '¿Qué pareja de razones forma una proporción?', 'أي زوج من النسب يكوّن تناسبًا؟', 'Which pair of ratios forms a proportion?'),
            options: [same('$\\frac{3}{7}=\\frac{9}{21}$'), same('$\\frac{3}{7}=\\frac{5}{9}$'), same('$\\frac{3}{7}=\\frac{7}{3}$')],
            correctIndex: 0,
            explanation: say('$3\\cdot 21=7\\cdot 9=63$. $\\frac{5}{9}$ zatikian goian eta behean 2 batu dira: $3\\cdot 9=27$ eta $7\\cdot 5=35$.', '$3\\cdot 21=7\\cdot 9=63$. En $\\frac{5}{9}$ se ha sumado 2 arriba y abajo: $3\\cdot 9=27$ y $7\\cdot 5=35$.', '$3\\cdot 21=7\\cdot 9=63$. وفي $\\frac{5}{9}$ أضفنا 2 إلى الأعلى والأسفل: $3\\cdot 9=27$ و$7\\cdot 5=35$.', '$3\\cdot 21=7\\cdot 9=63$. In $\\frac{5}{9}$, 2 was added on top and bottom: $3\\cdot 9=27$ and $7\\cdot 5=35$.')
        }
    },
    proportion: {
        mistake: {
            wrong: say('$\\frac{4}{10}=\\frac{6}{x}$: goian 2 gehitu da, beraz behean ere bai, $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: arriba se ha sumado 2, así que abajo también, $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: أضفنا 2 في الأعلى فنضيفه في الأسفل، $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: 2 was added on top, so add it at the bottom too, $x=12$.'),
            right: say('Proportzioan biderkatzen da, ez batu: $6$ zenbakia $4\\cdot 1{,}5$ da, beraz $x=10\\cdot 1{,}5=15$.', 'En una proporción se multiplica, no se suma: $6$ es $4\\cdot 1{,}5$, así que $x=10\\cdot 1{,}5=15$.', 'في التناسب نضرب ولا نجمع: $6$ هو $4\\cdot 1{,}5$ إذن $x=10\\cdot 1{,}5=15$.', 'In a proportion you multiply, you do not add: $6$ is $4\\cdot 1{,}5$, so $x=10\\cdot 1{,}5=15$.')
        },
        check: {
            prompt: say('Kalkulatu $x$, $\\frac{3}{x}=\\frac{12}{28}$ izan dadin.', 'Calcula $x$ en $\\frac{3}{x}=\\frac{12}{28}$.', 'احسب $x$ في $\\frac{3}{x}=\\frac{12}{28}$.', 'Work out $x$ in $\\frac{3}{x}=\\frac{12}{28}$.'),
            options: [same('$x=19$'), same('$x=7$'), same('$x=112$')],
            correctIndex: 1,
            explanation: say('$3\\cdot 28=12\\cdot x$; beraz, $x=84\\div 12=7$.', '$3\\cdot 28=12\\cdot x$, así que $x=84\\div 12=7$.', '$3\\cdot 28=12\\cdot x$، إذن $x=84\\div 12=7$.', '$3\\cdot 28=12\\cdot x$, so $x=84\\div 12=7$.')
        }
    },
    scale: {
        mistake: {
            wrong: say('$1\\mathbin{:}50\\,000$ eskalan, mapako 3 cm-k 150\u00a0000 km dira.', 'A escala $1\\mathbin{:}50\\,000$, 3 cm del mapa son 150\u00a0000 km.', 'بمقياس $1\\mathbin{:}50\\,000$ تساوي 3 سم على الخريطة 150000 كم.', 'At a scale of $1\\mathbin{:}50\\,000$, 3 cm on the map is 150,000 km.'),
            right: say('Emaitza cm-tan dago: $150\\,000$ cm $=1{,}5$ km. Eskalak ez du unitatea aldatzen.', 'El resultado está en cm: $150\\,000$ cm $=1{,}5$ km. La escala no cambia la unidad.', 'النتيجة بالسنتيمتر: $150\\,000$ سم $=1{,}5$ كم. المقياس لا يغيّر الوحدة.', 'The result is in cm: $150\\,000$ cm $=1{,}5$ km. The scale does not change the unit.')
        },
        check: {
            prompt: say('$1\\mathbin{:}25\\,000$ eskalako mapa batean, bide batek 8 cm neurtzen ditu. Zenbat km ditu benetan?', 'En un mapa a escala $1\\mathbin{:}25\\,000$, un camino mide 8 cm. ¿Cuántos km tiene en realidad?', 'في خريطة بمقياس $1\\mathbin{:}25\\,000$ طول طريق 8 سم. كم كيلومترًا طوله في الواقع؟', 'On a map at scale $1\\mathbin{:}25\\,000$, a path is 8 cm long. How many km long is it really?'),
            options: [say('2 km', '2 km', '2 كم', '2 km'), say('200 km', '200 km', '200 كم', '200 km'), say('20 km', '20 km', '20 كم', '20 km')],
            correctIndex: 0,
            explanation: say('$8\\cdot 25\\,000=200\\,000$ cm, eta 1 km 100 000 cm dira: 2 km.', '$8\\cdot 25\\,000=200\\,000$ cm, y 1 km son 100 000 cm: 2 km.', '$8\\cdot 25\\,000=200\\,000$ سم، و1 كم = 100 000 سم: إذن 2 كم.', '$8\\cdot 25\\,000=200\\,000$ cm, and 1 km is 100,000 cm: 2 km.')
        }
    },
    direct: {
        mistake: {
            wrong: say('Bi magnitude biak hazten badira, zuzenki proportzionalak dira: adina eta altuera, adibidez.', 'Si dos magnitudes crecen a la vez, son directamente proporcionales: la edad y la altura, por ejemplo.', 'إذا كبر مقداران معًا فهما متناسبان طرديًا: العمر والطول مثلًا.', 'If two quantities grow together, they are directly proportional: age and height, for example.'),
            right: say('Hazteaz gain, proportzio berean hazi behar dute: 10 urterekin ez da 5 urterekin baino bi aldiz altuagoa.', 'Además de crecer, tienen que crecer en la misma proporción: con 10 años no se mide el doble que con 5.', 'لا يكفي أن يكبرا، بل يجب أن يكبرا بالنسبة نفسها: في العاشرة لا يكون الطول ضعفه في الخامسة.', 'As well as growing, they must grow in the same proportion: at 10 you are not twice as tall as at 5.')
        },
        check: {
            prompt: say('Zein bikote dira zuzenki proportzionalak?', '¿Qué pareja de magnitudes es directamente proporcional?', 'أي زوج من المقادير متناسب طرديًا؟', 'Which pair of quantities is directly proportional?'),
            options: [say('Pertsona baten adina eta altuera', 'La edad y la altura de una persona', 'عمر شخص وطوله', 'A person’s age and height'), say('Erositako ogi kopurua eta prezioa', 'Las barras de pan compradas y lo que se paga', 'عدد أرغفة الخبز المشتراة والثمن المدفوع', 'The loaves of bread bought and what you pay'), say('Abiadura eta bidaiaren denbora', 'La velocidad y el tiempo de un viaje', 'السرعة وزمن الرحلة', 'The speed and the time of a journey')],
            correctIndex: 1,
            explanation: say('Ogi bikoitzak bikoitz kostatzen du: zatidura (ogi baten prezioa) konstantea da. Adina eta altuera batera hazten dira, baina ez proportzio berean; abiadura eta denbora alderantzizkoak dira.', 'El doble de barras cuesta el doble: el cociente, el precio de una barra, es constante. La edad y la altura crecen a la vez, pero no en la misma proporción; velocidad y tiempo son inversas.', 'ضعف الأرغفة يكلّف الضعف: حاصل القسمة، أي ثمن الرغيف، ثابت. العمر والطول يزدادان معًا لكن ليس بالنسبة نفسها، والسرعة والزمن متناسبان عكسيًا.', 'Twice the loaves cost twice as much: the quotient, the price of one loaf, is constant. Age and height grow together, but not in the same proportion; speed and time are inverse.')
        }
    },
    inverse: {
        mistake: {
            wrong: say('6 margolarik 10 egun; 4 margolarik: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ egun.', '6 pintores, 10 días; 4 pintores: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ días.', '6 دهّانين 10 أيام؛ 4 دهّانين: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ يوم.', '6 painters, 10 days; 4 painters: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ days.'),
            right: say('Hiruko erregela zuzena aplikatu da. Margolari gutxiagok gehiago behar dute: $\\frac{6\\cdot 10}{4}=15$ egun.', 'Se ha aplicado la regla de tres directa. Menos pintores tardan más: $\\frac{6\\cdot 10}{4}=15$ días.', 'طُبّقت القاعدة الطردية. العمال الأقل يحتاجون وقتًا أطول: $\\frac{6\\cdot 10}{4}=15$ يومًا.', 'The direct rule was used. Fewer painters take longer: $\\frac{6\\cdot 10}{4}=15$ days.')
        },
        check: {
            prompt: say('8 kamioik lurra eramaten dute, bakoitzak 15 bidaia eginez. Zenbat bidaia egin beharko ditu bakoitzak 10 kamioi badira?', '8 camiones transportan la tierra haciendo 15 viajes cada uno. ¿Cuántos viajes hará cada uno si son 10 camiones?', 'تنقل 8 شاحنات التراب بـ 15 رحلة لكل منها. كم رحلة ستقوم بها كل شاحنة إذا كانت 10 شاحنات؟', '8 lorries carry the earth in 15 trips each. How many trips will each make if there are 10 lorries?'),
            options: [say('18,75 bidaia', '18,75 viajes', '18.75 رحلة', '18.75 trips'), say('12 bidaia', '12 viajes', '12 رحلة', '12 trips'), say('13 bidaia', '13 viajes', '13 رحلة', '13 trips')],
            correctIndex: 1,
            explanation: say('Kamioi gehiago, bidaia gutxiago: alderantzizkoa. Guztira $8\\cdot 15=120$ bidaia, eta $120\\div 10=12$.', 'Más camiones, menos viajes: inversa. En total $8\\cdot 15=120$ viajes, y $120\\div 10=12$.', 'شاحنات أكثر، رحلات أقل: تناسب عكسي. المجموع $8\\cdot 15=120$ رحلة، و$120\\div 10=12$.', 'More lorries, fewer trips: inverse. In total $8\\cdot 15=120$ trips, and $120\\div 10=12$.')
        }
    },
    graphs: {
        mistake: {
            wrong: say('Grafikoa beherantz doa; beraz, alderantziz proportzionala da.', 'La gráfica baja; por tanto, es inversamente proporcional.', 'التمثيل ينزل؛ إذن هو تناسب عكسي.', 'The graph goes down, so it is inversely proportional.'),
            right: say('Beherantz doan zuzen bat ez da alderantzizkoa: biderkadura konstantea izan behar da, eta grafikoa hiperbola.', 'Una recta que baja no es inversa: el producto tiene que ser constante, y la gráfica una hipérbola.', 'المستقيم النازل ليس عكسيًا: يجب أن يكون حاصل الضرب ثابتًا والتمثيل قطعًا زائدًا.', 'A line going down is not inverse: the product must be constant, and the graph a hyperbola.')
        },
        check: {
            prompt: say('Taula: $x$: 1, 2, 3; $y$: 9, 7, 5. $x$ handitzean, $y$ jaisten da. Zer erlazio da?', 'Tabla: $x$: 1, 2, 3; $y$: 9, 7, 5. Al crecer $x$, $y$ baja. ¿Qué relación es?', 'جدول: $x$: 1، 2، 3؛ $y$: 9، 7، 5. عندما يزداد $x$ ينقص $y$. ما نوع العلاقة؟', 'Table: $x$: 1, 2, 3; $y$: 9, 7, 5. As $x$ grows, $y$ goes down. What relation is it?'),
            options: [say('Zuzena', 'Directa', 'طردي', 'Direct'), say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse'), say('Bat ere ez', 'Ninguna', 'لا هذا ولا ذاك', 'Neither')],
            correctIndex: 2,
            explanation: say('Biderkadurak, 9, 14 eta 15, aldatu egiten dira, eta zatidurak ere bai. Jaistea ez da nahikoa alderantzizkoa izateko.', 'Los productos, 9, 14 y 15, cambian, y los cocientes también. Bajar no basta para ser inversa.', 'حواصل الضرب 9 و14 و15 تتغير، وحواصل القسمة كذلك. ولا يكفي النقصان لتكون العلاقة عكسية.', 'The products, 9, 14 and 15, change, and so do the quotients. Going down is not enough to be inverse.')
        }
    },
    compound: {
        mistake: {
            wrong: say('Magnitude guztiak ezezagunarekin batera konparatu dira: «makina gutxiago eta pieza gehiago, beraz ordu gehiago», eta zatiki guztiak berria/zaharra moduan jarri dira.', 'Se han comparado todas a la vez y se han puesto todas las fracciones como nuevo/viejo.', 'قورنت المقادير كلها معًا ووُضعت كل الكسور على صورة الجديد/القديم.', 'All the quantities were compared at once and every fraction was written as new/old.'),
            right: say('Magnitude bakoitza bakarka konparatzen da ezezagunarekin. Alderantzizkoetan zatikia buelta emanda doa: zaharra/berria.', 'Cada magnitud se compara por separado con la incógnita. En las inversas la fracción va al revés: viejo/nuevo.', 'يُقارن كل مقدار وحده بالمجهول. وفي العكسية يُقلب الكسر: القديم/الجديد.', 'Each quantity is compared with the unknown on its own. For the inverse ones the fraction is turned round: old/new.')
        },
        check: {
            prompt: say('6 langilek 30 m horma egiten dituzte 5 egunetan. Zenbat egun beharko dituzte 3 langilek 24 m egiteko?', '6 obreros hacen 30 m de muro en 5 días. ¿Cuántos días tardarán 3 obreros en hacer 24 m?', 'يبني 6 عمال 30 م من جدار في 5 أيام. كم يومًا يحتاج 3 عمال لبناء 24 م؟', '6 workers build 30 m of wall in 5 days. How many days will 3 workers take to build 24 m?'),
            options: [say('8 egun', '8 días', '8 أيام', '8 days'), say('2 egun', '2 días', 'يومان', '2 days'), say('12,5 egun', '12,5 días', '12.5 يومًا', '12.5 days')],
            correctIndex: 0,
            explanation: say('Langileak: alderantzizkoa, $\\frac{6}{3}$. Metroak: zuzena, $\\frac{24}{30}$. $5\\cdot\\frac{6}{3}\\cdot\\frac{24}{30}=8$.', 'Obreros: inversa, $\\frac{6}{3}$. Metros: directa, $\\frac{24}{30}$. $5\\cdot\\frac{6}{3}\\cdot\\frac{24}{30}=8$.', 'العمال: عكسي $\\frac{6}{3}$. الأمتار: طردي $\\frac{24}{30}$. $5\\cdot\\frac{6}{3}\\cdot\\frac{24}{30}=8$.', 'Workers: inverse, $\\frac{6}{3}$. Metres: direct, $\\frac{24}{30}$. $5\\cdot\\frac{6}{3}\\cdot\\frac{24}{30}=8$.')
        }
    },
    'direct-share': {
        mistake: {
            wrong: say('Hiru pertsona daudenez, bakoitzari $300\\mathbin{:}3=100$ € ematen zaizkio.', 'Como son tres personas, a cada una se le dan $300\\mathbin{:}3=100$ €.', 'لأنهم ثلاثة يُعطى كلٌّ $300\\mathbin{:}3=100$ €.', 'Since there are three people, each one gets $300\\mathbin{:}3=100$ €.'),
            right: say('Hori banaketa berdina da. Proportzionalean, zatitu zenbakien baturaz, ez pertsona kopuruaz.', 'Eso es un reparto a partes iguales. En el proporcional se divide entre la suma de los números, no entre el número de personas.', 'هذا توزيع بالتساوي. وفي التوزيع التناسبي نقسم على مجموع الأعداد لا على عدد الأشخاص.', 'That is an equal share. In a proportional share you divide by the sum of the numbers, not by the number of people.')
        },
        check: {
            prompt: say('90 goxoki banatzen dira bi umeren artean, haien adinekiko zuzenki proportzionalean: 4 eta 6 urte. Zenbat jasotzen ditu nagusiak?', 'Se reparten 90 caramelos entre dos niños de forma directamente proporcional a sus edades, 4 y 6 años. ¿Cuántos recibe el mayor?', 'تُوزَّع 90 حلوى على طفلين توزيعًا طرديًا حسب عمريهما، 4 و6 سنوات. كم يأخذ الأكبر؟', '90 sweets are shared between two children in direct proportion to their ages, 4 and 6. How many does the older one get?'),
            options: [say('54 goxoki', '54 caramelos', '54 حلوى', '54 sweets'), say('45 goxoki', '45 caramelos', '45 حلوى', '45 sweets'), say('36 goxoki', '36 caramelos', '36 حلوى', '36 sweets')],
            correctIndex: 0,
            explanation: say('Zati bat: $90\\div(4+6)=9$. Nagusiak $9\\cdot 6=54$. 45 zati berdinetan banatzea litzateke.', 'Una parte: $90\\div(4+6)=9$. El mayor, $9\\cdot 6=54$. 45 sería repartir a partes iguales.', 'الجزء الواحد: $90\\div(4+6)=9$. والأكبر $9\\cdot 6=54$. أما 45 فهو توزيع بالتساوي.', 'One part: $90\\div(4+6)=9$. The older one, $9\\cdot 6=54$. 45 would be sharing equally.')
        }
    },
    'inverse-share': {
        mistake: {
            wrong: say('Alderantzizkoa denez, banatu zuzenean 2, 3 eta 6 zenbakiekiko eta trukatu emaitzak.', 'Como es inversa, se reparte de forma directa a 2, 3 y 6 y se cambian los resultados de sitio.', 'لأنه عكسي نوزع طرديًا على 2 و3 و6 ثم نبدّل النتائج.', 'Since it is inverse, share directly in proportion to 2, 3 and 6 and swap the results round.'),
            right: say('Trukatzeak ez du balio: 72, 108 eta 180 lortuko lirateke, ez 180, 120 eta 60. Alderantzizkoekin banatu behar da.', 'Cambiar de sitio no sirve: saldrían 72, 108 y 180, no 180, 120 y 60. Hay que repartir con los inversos.', 'التبديل لا ينفع: سنحصل على 72 و108 و180 لا 180 و120 و60. يجب التوزيع على المقلوبات.', 'Swapping does not work: you would get 72, 108 and 180, not 180, 120 and 60. You must share using the reciprocals.')
        },
        check: {
            prompt: say('60 € banatzen dira bi pertsonaren artean, 1 eta 4 zenbakiekiko alderantziz proportzionalean. Zenbat jasotzen du lehenak?', 'Se reparten 60 € entre dos personas de forma inversamente proporcional a 1 y 4. ¿Cuánto recibe la primera?', 'يُوزَّع 60 € على شخصين توزيعًا عكسيًا حسب 1 و4. كم يأخذ الأول؟', '€60 is shared between two people in inverse proportion to 1 and 4. How much does the first one get?'),
            options: [say('12 €', '12 €', '12 €', '€12'), say('30 €', '30 €', '30 €', '€30'), say('48 €', '48 €', '48 €', '€48')],
            correctIndex: 2,
            explanation: say('Alderantzizkoak: 1 eta $\\frac{1}{4}$, bider 4: 4 eta 1. Zati bat $60\\div 5=12$; lehenak $12\\cdot 4=48$.', 'Inversos: 1 y $\\frac{1}{4}$, por 4: 4 y 1. Una parte, $60\\div 5=12$; la primera, $12\\cdot 4=48$.', 'المقلوبان: 1 و$\\frac{1}{4}$، وبالضرب في 4: 4 و1. الجزء الواحد $60\\div 5=12$، والأول $12\\cdot 4=48$.', 'Reciprocals: 1 and $\\frac{1}{4}$, times 4: 4 and 1. One part, $60\\div 5=12$; the first, $12\\cdot 4=48$.')
        }
    },
    'percent-index': {
        mistake: {
            wrong: say('% 15 jaitsi ondoren 51 € balio badu, lehen $51+0{,}15\\cdot 51=58{,}65$ € balio zuen.', 'Si tras bajar un 15 % cuesta 51 €, antes costaba $51+0{,}15\\cdot 51=58{,}65$ €.', 'إذا صار 51 € بعد تخفيض 15٪ فقد كان $51+0{,}15\\cdot 51=58{,}65$ €.', 'If after a 15% discount it costs €51, before it cost $51+0{,}15\\cdot 51=58{,}65$ €.'),
            right: say('% 15 hasierako prezioarena da, ez amaierakoarena. Zatitu indizeaz: $51\\mathbin{:}0{,}85=60$ €.', 'El 15 % es del precio inicial, no del final. Divide entre el índice: $51\\mathbin{:}0{,}85=60$ €.', '15٪ من السعر الأصلي لا النهائي. اقسم على المؤشر: $51\\mathbin{:}0{,}85=60$ €.', 'The 15% is of the original price, not the final one. Divide by the index: $51\\mathbin{:}0{,}85=60$ €.')
        },
        check: {
            prompt: say('Prezio bat % 25 igo da, eta orain 150 € da. Zenbat zen lehen?', 'Un precio sube un 25 % y ahora es de 150 €. ¿Cuánto era antes?', 'ارتفع سعر بنسبة 25٪ وصار 150 €. كم كان من قبل؟', 'A price goes up 25% and is now €150. What was it before?'),
            options: [say('120 €', '120 €', '120 €', '€120'), say('112,50 €', '112,50 €', '112.50 €', '€112.50'), say('125 €', '125 €', '125 €', '€125')],
            correctIndex: 0,
            explanation: say('Zatitu amaierakoa indizeaz: $150\\div 1{,}25=120$. 112,50 € ateratzen da 150 € zenbakiaren % 25 kenduz gero.', 'Divide la final entre el índice: $150\\div 1{,}25=120$. 112,50 € sale al quitar el 25 % de 150 €.', 'اقسم النهائية على المؤشر: $150\\div 1{,}25=120$. أما 112.50 € فينتج عن طرح 25٪ من 150 €.', 'Divide the final amount by the index: $150\\div 1{,}25=120$. €112.50 comes from taking 25% off €150.')
        }
    },
    chained: {
        mistake: {
            wrong: say('% 20 igo eta % 25 jaitsi: guztira $20-25=-5$, % 5 jaitsi da.', 'Sube un 20 % y baja un 25 %: en total $20-25=-5$, baja un 5 %.', 'زيادة 20٪ ونقصان 25٪: المجموع $20-25=-5$ أي نقصان 5٪.', 'Up 20% and down 25%: in total $20-25=-5$, so it is down 5%.'),
            right: say('Ehunekoak ez dira batzen: % 25 prezio berriarena da. Indizeak biderkatu: $1{,}2\\cdot 0{,}75=0{,}9$, % 10 jaitsi da.', 'Los porcentajes no se suman: el 25 % es del precio nuevo. Multiplica los índices: $1{,}2\\cdot 0{,}75=0{,}9$, baja un 10 %.', 'النسب لا تُجمع: 25٪ من السعر الجديد. اضرب المؤشرات: $1{,}2\\cdot 0{,}75=0{,}9$ أي نقصان 10٪.', 'Percentages are not added: the 25% is of the new price. Multiply the indices: $1{,}2\\cdot 0{,}75=0{,}9$, a 10% decrease.')
        },
        check: {
            prompt: say('Artikulu bat % 50 jaisten da, eta gero % 50 igotzen. Nola geratzen da?', 'Un artículo baja un 50 % y después sube un 50 %. ¿Cómo queda?', 'ينخفض ثمن سلعة 50٪ ثم يرتفع 50٪. كيف يصبح؟', 'An item goes down 50% and then up 50%. How does it end up?'),
            options: [say('Hasieran bezala', 'Igual que al principio', 'كما كان في البداية', 'The same as at the start'), say('% 25 merkeago', 'Un 25 % más barato', 'أرخص بـ 25٪', '25% cheaper'), say('% 50 merkeago', 'Un 50 % más barato', 'أرخص بـ 50٪', '50% cheaper')],
            correctIndex: 1,
            explanation: say('Indize osoa: $0{,}5\\cdot 1{,}5=0{,}75$. % 75 geratzen da: % 25 merkeago.', 'Índice total: $0{,}5\\cdot 1{,}5=0{,}75$. Queda el 75 %: un 25 % más barato.', 'المؤشر الكلي: $0{,}5\\cdot 1{,}5=0{,}75$. يبقى 75٪: أي أرخص بـ 25٪.', 'Overall index: $0{,}5\\cdot 1{,}5=0{,}75$. 75% is left: 25% cheaper.')
        }
    },
    interest: {
        mistake: {
            wrong: say('1200 € 8 hilabetez, interes-tasa % 5 dela: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '1200 € al 5 % durante 8 meses: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '1200 € بفائدة 5٪ مدة 8 أشهر: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '€1,200 at 5% for 8 months: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.'),
            right: say('Tasa urtekoa da: 8 hilabete $\\frac{8}{12}$ urte dira. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'El rédito es anual: 8 meses son $\\frac{8}{12}$ de año. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'السعر سنوي: 8 أشهر هي $\\frac{8}{12}$ سنة. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'The rate is per year: 8 months is $\\frac{8}{12}$ of a year. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.')
        },
        check: {
            prompt: say('Zenbat diru egongo da guztira, 500 € % 4 interesarekin 3 urtez uzten badira?', '¿Cuánto dinero habrá en total si se dejan 500 € al 4 % durante 3 años?', 'كم سيكون المال كله إذا أُودع 500 € بنسبة 4٪ لمدة 3 سنوات؟', 'How much money will there be in all if €500 is left at 4% for 3 years?'),
            options: [say('60 €', '60 €', '60 €', '€60'), say('560 €', '560 €', '560 €', '€560'), say('520 €', '520 €', '520 €', '€520')],
            correctIndex: 1,
            explanation: say('$I=\\frac{500\\cdot 4\\cdot 3}{100}=60$ €, eta guztira $500+60=560$ €. 60 € interesa bakarrik da.', '$I=\\frac{500\\cdot 4\\cdot 3}{100}=60$ €, y en total $500+60=560$ €. 60 € es solo el interés.', '$I=\\frac{500\\cdot 4\\cdot 3}{100}=60$ €، والمجموع $500+60=560$ €. و60 € هي الفائدة فقط.', '$I=\\frac{500\\cdot 4\\cdot 3}{100}=60$ €, and in all $500+60=560$ €. €60 is only the interest.')
        }
    },
    mixtures: {
        mistake: {
            wrong: say('Nahastearen prezioa bi prezioen erdia da: $\\frac{8+13}{2}=10{,}50$ €/kg.', 'El precio de la mezcla es la media de los dos: $\\frac{8+13}{2}=10{,}50$ €/kg.', 'سعر الخليط متوسط السعرين: $\\frac{8+13}{2}=10{,}50$ €/كغ.', 'The price of the mixture is the average of the two: $\\frac{8+13}{2}=10{,}50$ €/kg.'),
            right: say('Kafe merke gehiago dago, beraz prezioa merketik hurbilago dago: $\\frac{96+104}{20}=10$ €/kg.', 'Hay más café barato, así que el precio queda más cerca del barato: $\\frac{96+104}{20}=10$ €/kg.', 'البن الرخيص أكثر، فالسعر أقرب إلى الرخيص: $\\frac{96+104}{20}=10$ €/كغ.', 'There is more cheap coffee, so the price is closer to the cheap one: $\\frac{96+104}{20}=10$ €/kg.')
        },
        check: {
            prompt: say('5 €/kg-ko 4 kg nahasten dira 10 €/kg-ko 1 kg-rekin. Zenbat balio du nahasketaren kilo batek?', 'Se mezclan 4 kg de 5 €/kg con 1 kg de 10 €/kg. ¿Cuánto vale un kilo de la mezcla?', 'نخلط 4 كغ بسعر 5 € للكيلوغرام مع 1 كغ بسعر 10 €. كم ثمن كيلوغرام الخليط؟', '4 kg at €5/kg is mixed with 1 kg at €10/kg. How much is a kilo of the mixture worth?'),
            options: [say('7,50 €', '7,50 €', '7.50 €', '€7.50'), say('6 €', '6 €', '6 €', '€6'), say('15 €', '15 €', '15 €', '€15')],
            correctIndex: 1,
            explanation: say('$\\frac{4\\cdot 5+1\\cdot 10}{5}=\\frac{30}{5}=6$ €. 7,50 € bi prezioen batez bestekoa da, baina merkeagoa gehiago dago.', '$\\frac{4\\cdot 5+1\\cdot 10}{5}=\\frac{30}{5}=6$ €. 7,50 € es la media de los precios, pero hay más del barato.', '$\\frac{4\\cdot 5+1\\cdot 10}{5}=\\frac{30}{5}=6$ €. و7.50 € متوسط السعرين، لكن الرخيص أكثر.', '$\\frac{4\\cdot 5+1\\cdot 10}{5}=\\frac{30}{5}=6$ €. €7.50 is the mean of the prices, but there is more of the cheap one.')
        }
    },
    motion: {
        mistake: {
            wrong: say('Elkarrengana doazenean ere abiadurak kentzen dira: $\\frac{210}{80-60}=10{,}5$ h.', 'También cuando van al encuentro se restan las velocidades: $\\frac{210}{80-60}=10{,}5$ h.', 'حتى عند التقابل تُطرح السرعتان: $\\frac{210}{80-60}=10{,}5$ س.', 'Even when they move towards each other, subtract the speeds: $\\frac{210}{80-60}=10{,}5$ h.'),
            right: say('Elkarrengana doazenean bien bideak batzen dira: ordu bakoitzean $80+60=140$ km hurbiltzen dira, $t=1{,}5$ h.', 'Al ir al encuentro se suman los dos caminos: cada hora se acercan $80+60=140$ km, $t=1{,}5$ h.', 'عند التقابل يُجمع الطريقان: تقتربان كل ساعة $80+60=140$ كم، $t=1{,}5$ س.', 'Moving towards each other, both journeys add up: each hour they get $80+60=140$ km closer, $t=1{,}5$ h.')
        },
        check: {
            prompt: say('6 km-ra dauden bi pertsona elkarrengana doaz oinez, 4 km/h-an eta 5 km/h-an. Zenbat behar dute elkartzeko?', 'Dos personas a 6 km de distancia caminan una hacia la otra, a 4 km/h y a 5 km/h. ¿Cuánto tardan en encontrarse?', 'شخصان المسافة بينهما 6 كم يمشي كل منهما نحو الآخر بسرعة 4 كم/س و5 كم/س. كم يستغرقان حتى يلتقيا؟', 'Two people 6 km apart walk towards each other at 4 km/h and 5 km/h. How long do they take to meet?'),
            options: [say('40 minutu', '40 minutos', '40 دقيقة', '40 minutes'), say('6 ordu', '6 horas', '6 ساعات', '6 hours'), say('Ordu eta erdi', 'Hora y media', 'ساعة ونصف', 'An hour and a half')],
            correctIndex: 0,
            explanation: say('Elkarrengana: abiadurak batu, $4+5=9$. $\\frac{6}{9}=\\frac{2}{3}$ ordu, 40 minutu.', 'Al encuentro: se suman las velocidades, $4+5=9$. $\\frac{6}{9}=\\frac{2}{3}$ de hora, 40 minutos.', 'متقابلان: نجمع السرعتين $4+5=9$. و$\\frac{6}{9}=\\frac{2}{3}$ ساعة، أي 40 دقيقة.', 'Towards each other: add the speeds, $4+5=9$. $\\frac{6}{9}=\\frac{2}{3}$ of an hour, 40 minutes.')
        }
    },
    work: {
        mistake: {
            wrong: say('4 ordu eta 12 ordu: elkarrekin $4+12=16$ ordu, edo erdia, 8 ordu.', '4 horas y 12 horas: juntos $4+12=16$ horas, o la media, 8 horas.', '4 ساعات و12 ساعة: معًا $4+12=16$ ساعة أو المتوسط 8 ساعات.', '4 hours and 12 hours: together $4+12=16$ hours, or the average, 8 hours.'),
            right: say('Denborak ez dira batzen: ordu bateko zatiak batzen dira. Elkarrekin 3 ordu, azkarrena bakarrik baino gutxiago.', 'Los tiempos no se suman: se suman las partes de una hora. Juntos, 3 horas, menos que el más rápido solo.', 'الأزمنة لا تُجمع: تُجمع أجزاء الساعة. معًا 3 ساعات، أقل من الأسرع وحده.', 'Times are not added: the parts per hour are. Together, 3 hours, less than the faster one alone.')
        },
        check: {
            prompt: say('Pertsona batek hesi bat 2 orduan margotzen du, eta beste batek 3 orduan. Zenbat behar dute biek batera?', 'Una persona pinta una valla en 2 horas y otra en 3. ¿Cuánto tardan juntas?', 'يطلي شخص سياجًا في ساعتين ويطليه آخر في 3 ساعات. كم يستغرقان معًا؟', 'One person paints a fence in 2 hours and another in 3. How long do they take together?'),
            options: [say('5 ordu', '5 horas', '5 ساعات', '5 hours'), say('2,5 ordu', '2,5 horas', '2.5 ساعة', '2.5 hours'), say('Ordu bat eta 12 minutu', '1 hora y 12 minutos', 'ساعة و12 دقيقة', '1 hour and 12 minutes')],
            correctIndex: 2,
            explanation: say('Ordu batean, $\\frac{1}{2}+\\frac{1}{3}=\\frac{5}{6}$. Hesi osoa $\\frac{6}{5}$ ordutan: ordu bat eta 12 minutu.', 'En una hora, $\\frac{1}{2}+\\frac{1}{3}=\\frac{5}{6}$. La valla entera, en $\\frac{6}{5}$ de hora: 1 hora y 12 minutos.', 'في ساعة $\\frac{1}{2}+\\frac{1}{3}=\\frac{5}{6}$. والسياج كله في $\\frac{6}{5}$ ساعة: ساعة و12 دقيقة.', 'In one hour, $\\frac{1}{2}+\\frac{1}{3}=\\frac{5}{6}$. The whole fence in $\\frac{6}{5}$ of an hour: 1 hour and 12 minutes.')
        }
    }
}
