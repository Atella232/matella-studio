import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — the typical
   mistake and the «Check it» question of the nine lessons of this unit
   (the two of half-planes come from 1.º Ciencias with their own). Plain
   data so the tests can import it; lessons.tsx merges it into the topics.
   New numbers, never those of «Let's solve» or of the example.
   ========================================================================== */

export type ProgramazioaTopicId = 'constraints' | 'vertices' | 'integer-points' | 'level-lines' | 'vertex-method' | 'solution-types' | 'max-profit' | 'min-cost' | 'full-problem'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const programazioaLessonChecks: Record<ProgramazioaTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    constraints: {
        mistake: {
            wrong: say('«Gehienez 40 ordu»: $2x+y\\ge 40$ idatzi dut.', '«Como mucho 40 horas»: he escrito $2x+y\\ge 40$.', '«على الأكثر 40 ساعة»: كتبتُ $2x+y\\ge 40$.', '«At most 40 hours»: I wrote $2x+y\\ge 40$.'),
            right: say('«Gehienez» esan nahi du ez dela pasatzen: $2x+y\\le 40$. «Gutxienez» da $\\ge$.', '«Como mucho» quiere decir que no se pasa: $2x+y\\le 40$. «Al menos» es $\\ge$.', '«على الأكثر» تعني ألا يتجاوز: $2x+y\\le 40$. و«على الأقل» هي $\\ge$.', '«At most» means it does not go over: $2x+y\\le 40$. «At least» is $\\ge$.')
        },
        check: {
            prompt: say('$y$ aulki-kopurua da. «Gutxienez 12 aulki egin behar dira.» Zein da murrizketa?', '$y$ es el número de sillas. «Hay que hacer al menos 12 sillas.» ¿Cuál es la restricción?', '$y$ عدد الكراسي. «يجب صنع 12 كرسيًا على الأقل.» ما القيد؟', '$y$ is the number of chairs. «At least 12 chairs must be made.» What is the constraint?'),
            options: [same('$y\\ge 12$'), same('$y\\le 12$'), same('$x+y\\ge 12$')],
            correctIndex: 0,
            explanation: say('«Gutxienez» 12 edo gehiago da: $y\\ge 12$.', '«Al menos» es 12 o más: $y\\ge 12$.', '«على الأقل» تعني 12 أو أكثر: $y\\ge 12$.', '«At least» is 12 or more: $y\\ge 12$.')
        }
    },
    vertices: {
        mistake: {
            wrong: say('$x+y\\le 6$ eta $x+2y\\le 8$ eskualdean, $(8,0)$ ere erpina da, $x+2y=8$ zuzenaren ebaki-puntua delako.', 'En la región de $x+y\\le 6$ y $x+2y\\le 8$, $(8,0)$ también es vértice, porque es un corte de $x+2y=8$.', 'في منطقة $x+y\\le 6$ و$x+2y\\le 8$ تكون $(8,0)$ رأسًا أيضًا لأنها نقطة تقاطع $x+2y=8$.', 'In the region of $x+y\\le 6$ and $x+2y\\le 8$, $(8,0)$ is a vertex too, because it is where $x+2y=8$ cuts the axis.'),
            right: say('Ebaki-puntu bat erpina da murrizketa guztiak betetzen baditu bakarrik. $(8,0)$ puntuan, $8+0=8>6$: kanpoan dago.', 'Un corte solo es vértice si cumple todas las restricciones. En $(8,0)$, $8+0=8>6$: está fuera.', 'نقطة التقاطع لا تكون رأسًا إلا إذا حققت كل القيود. في $(8,0)$: $8+0=8>6$، فهي خارجها.', 'A crossing is a vertex only if it satisfies every constraint. At $(8,0)$, $8+0=8>6$: it is outside.')
        },
        check: {
            prompt: say('$x+y\\le 8$, $x\\le 6$, $x\\ge 0$ eta $y\\ge 0$ eskualdea. Erpina al da $(6,4)$?', 'Región de $x+y\\le 8$, $x\\le 6$, $x\\ge 0$ e $y\\ge 0$. ¿Es $(6,4)$ un vértice?', 'منطقة $x+y\\le 8$ و$x\\le 6$ و$x\\ge 0$ و$y\\ge 0$. هل $(6,4)$ رأس؟', 'Region of $x+y\\le 8$, $x\\le 6$, $x\\ge 0$ and $y\\ge 0$. Is $(6,4)$ a vertex?'),
            options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez: ez du $x+y\\le 8$ betetzen', 'No: no cumple $x+y\\le 8$', 'لا: لا تحقق $x+y\\le 8$', 'No: it does not satisfy $x+y\\le 8$'), say('Ez: ez dago zuzen batean ere', 'No: no está en ninguna recta', 'لا: ليست على أي مستقيم', 'No: it is on no line')],
            correctIndex: 1,
            explanation: say('$6+4=10>8$. Erpina $(6,2)$ da: $x=6$ eta $x+y=8$ zuzenen ebaki-puntua.', '$6+4=10>8$. El vértice es $(6,2)$: el corte de $x=6$ y $x+y=8$.', '$6+4=10>8$. الرأس هو $(6,2)$: تقاطع $x=6$ و$x+y=8$.', '$6+4=10>8$. The vertex is $(6,2)$: where $x=6$ and $x+y=8$ cross.')
        }
    },
    'integer-points': {
        mistake: {
            wrong: say('Kotxe eta furgoneta kopuruak eskualdeko edozein puntu izan daitezke, $(1{,}5;\\ 2)$ ere bai.', 'El número de coches y de furgonetas puede ser cualquier punto de la región, también $(1{,}5;\\ 2)$.', 'يمكن أن يكون عدد السيارات والشاحنات أي نقطة من المنطقة، حتى $(1.5;\\ 2)$.', 'The numbers of cars and vans can be any point of the region, $(1{,}5;\\ 2)$ too.'),
            right: say('Ezin da kotxe erdi bat alokatu: zenbaki osoko puntuak bakarrik balio dute.', 'No se puede alquilar medio coche: solo valen los puntos de coordenadas enteras.', 'لا يمكن استئجار نصف سيارة: لا تصلح إلا النقاط ذات الإحداثيات الصحيحة.', 'You cannot hire half a car: only the points with whole coordinates count.')
        },
        check: {
            prompt: say('Zenbat puntu oso daude $x\\le 3$, $y\\le 1$, $x\\ge 0$ eta $y\\ge 0$ eskualdean?', '¿Cuántos puntos enteros hay en la región $x\\le 3$, $y\\le 1$, $x\\ge 0$, $y\\ge 0$?', 'كم نقطة صحيحة في المنطقة $x\\le 3$ و$y\\le 1$ و$x\\ge 0$ و$y\\ge 0$؟', 'How many whole points are there in the region $x\\le 3$, $y\\le 1$, $x\\ge 0$, $y\\ge 0$?'),
            options: [same('$3$'), same('$6$'), same('$8$')],
            correctIndex: 2,
            explanation: say('$x$ balioak 0, 1, 2, 3 eta $y$ balioak 0, 1: $4\\cdot 2=8$.', '$x$ puede ser 0, 1, 2, 3 e $y$, 0, 1: $4\\cdot 2=8$.', '$x$ يمكن أن تكون 0 و1 و2 و3 و$y$ تكون 0 و1: $4\\cdot 2=8$.', '$x$ can be 0, 1, 2, 3 and $y$ 0, 1: $4\\cdot 2=8$.')
        }
    },
    'level-lines': {
        mistake: {
            wrong: say('$F=3x+2y$ funtzioaren maila-zuzenak ezberdinak dira $k$ bakoitzean, eta ez dira paraleloak.', 'Las rectas de nivel de $F=3x+2y$ cambian de inclinación con cada $k$.', 'تتغير ميول مستقيمات المستوى لـ $F=3x+2y$ مع كل $k$.', 'The level lines of $F=3x+2y$ change their slope with each $k$.'),
            right: say('$3x+2y=k$ zuzen guztiek malda bera dute; $k$ aldatzean, paraleloan mugitzen dira.', 'Todas las rectas $3x+2y=k$ tienen la misma pendiente; al cambiar $k$, se desplazan en paralelo.', 'كل المستقيمات $3x+2y=k$ لها الميل نفسه؛ وعند تغيير $k$ تنتقل موازية لنفسها.', 'All the lines $3x+2y=k$ have the same slope; when $k$ changes, they move parallel to each other.')
        },
        check: {
            prompt: say('$F=2x+5y$ maximizatzeko, nora mugitzen dira maila-zuzenak $k$ handitzean?', 'Para maximizar $F=2x+5y$, ¿hacia dónde se mueven las rectas de nivel al crecer $k$?', 'لتعظيم $F=2x+5y$، إلى أين تنتقل مستقيمات المستوى عندما تكبر $k$؟', 'To maximise $F=2x+5y$, where do the level lines move as $k$ grows?'),
            options: [say('Jatorrira', 'Hacia el origen', 'نحو المبدأ', 'Towards the origin'), say('Jatorritik urrun, gora eta eskuinera', 'Lejos del origen, arriba y a la derecha', 'بعيدًا عن المبدأ، إلى الأعلى واليمين', 'Away from the origin, up and to the right'), say('Biratu egiten dira', 'Giran', 'تدور', 'They turn')],
            correctIndex: 1,
            explanation: say('$a$ eta $b$ positiboekin, $k$ handitzen da jatorritik urruntzean.', 'Con $a$ y $b$ positivos, $k$ crece al alejarse del origen.', 'مع $a$ و$b$ موجبين تكبر $k$ بالابتعاد عن المبدأ.', 'With $a$ and $b$ positive, $k$ grows as you move away from the origin.')
        }
    },
    'vertex-method': {
        mistake: {
            wrong: say('Eskualdearen erdiko puntu batean, $(1,2)$ puntuan, $F$ handiena izango da.', 'El máximo de $F$ estará en un punto del centro de la región, como $(1,2)$.', 'ستكون القيمة العظمى لـ $F$ في نقطة من وسط المنطقة مثل $(1,2)$.', 'The maximum of $F$ will be at a point in the middle of the region, like $(1,2)$.'),
            right: say('Optimoa beti erpin batean dago (edo bi erpinen arteko alde osoan): erpinetan bakarrik kalkulatu behar da.', 'El óptimo siempre está en un vértice (o en todo un lado entre dos vértices): basta calcular en los vértices.', 'القيمة المثلى دائمًا في رأس (أو على ضلع كامل بين رأسين): يكفي الحساب عند الرؤوس.', 'The optimum is always at a vertex (or along a whole side between two vertices): working out the vertices is enough.')
        },
        check: {
            prompt: say('Erpinak: $(0,0)$, $(4,0)$, $(3,2)$ eta $(0,3)$. Zein da $F=x+2y$ funtzioaren maximoa?', 'Vértices: $(0,0)$, $(4,0)$, $(3,2)$ y $(0,3)$. ¿Cuál es el máximo de $F=x+2y$?', 'الرؤوس: $(0,0)$ و$(4,0)$ و$(3,2)$ و$(0,3)$. ما القيمة العظمى لـ $F=x+2y$؟', 'Vertices: $(0,0)$, $(4,0)$, $(3,2)$ and $(0,3)$. What is the maximum of $F=x+2y$?'),
            options: [same('$6$'), same('$4$'), same('$7$')],
            correctIndex: 2,
            explanation: same('$F(4,0)=4,\\quad F(3,2)=7,\\quad F(0,3)=6$')
        }
    },
    'solution-types': {
        mistake: {
            wrong: say('Bi erpinek $F$ balio bera ematen dute; beraz, ez dago soluziorik.', 'Dos vértices dan el mismo valor de $F$, así que no hay solución.', 'يعطي رأسان القيمة نفسها لـ $F$، إذن لا يوجد حل.', 'Two vertices give the same value of $F$, so there is no solution.'),
            right: say('Bi erpinek balio optimo bera badute, soluzioa anitza da: haien arteko aldeko puntu guztiak.', 'Si dos vértices dan el mismo valor óptimo, la solución es múltiple: todos los puntos del lado entre ellos.', 'إذا أعطى رأسان القيمة المثلى نفسها فالحل متعدد: كل نقاط الضلع بينهما.', 'If two vertices give the same best value, the solution is multiple: every point of the side between them.')
        },
        check: {
            prompt: say('$x+y\\ge 3$, $x\\ge 0$, $y\\ge 0$ eskualdean, ba al du maximorik $F=2x+y$ funtzioak?', 'En la región $x+y\\ge 3$, $x\\ge 0$, $y\\ge 0$, ¿tiene máximo $F=2x+y$?', 'في المنطقة $x+y\\ge 3$ و$x\\ge 0$ و$y\\ge 0$، هل لـ $F=2x+y$ قيمة عظمى؟', 'In the region $x+y\\ge 3$, $x\\ge 0$, $y\\ge 0$, does $F=2x+y$ have a maximum?'),
            options: [say('Bai, $(3,0)$ puntuan', 'Sí, en $(3,0)$', 'نعم، في $(3,0)$', 'Yes, at $(3,0)$'), say('Ez: eskualdea ez da ixten eta $F$ beti handitzen da', 'No: la región no se cierra y $F$ crece sin fin', 'لا: المنطقة لا تنغلق و$F$ تكبر بلا نهاية', 'No: the region does not close and $F$ grows for ever'), say('Bai, $(0,3)$ puntuan', 'Sí, en $(0,3)$', 'نعم، في $(0,3)$', 'Yes, at $(0,3)$')],
            correctIndex: 1,
            explanation: say('Eskualdea eskuinera eta gora irekita dago: $(10,0)$ puntuan $F=20$, $(100,0)$ puntuan $F=200$…', 'La región está abierta a la derecha y arriba: en $(10,0)$, $F=20$; en $(100,0)$, $F=200$…', 'المنطقة مفتوحة يمينًا وأعلى: في $(10,0)$ تكون $F=20$، وفي $(100,0)$ تكون $F=200$…', 'The region is open to the right and upwards: at $(10,0)$, $F=20$; at $(100,0)$, $F=200$…')
        }
    },
    'max-profit': {
        mistake: {
            wrong: say('Irabazi handiena lortzeko, egin produktu garestiena bakarrik, ahal den guztia.', 'Para ganar lo máximo, haz solo el producto que más deja, todo lo que se pueda.', 'لتحقيق أكبر ربح، اصنع فقط المنتج الأكثر ربحًا قدر الإمكان.', 'To make the most profit, make only the product that leaves most, as much as possible.'),
            right: say('Murrizketek mugatzen dute. Kalkulatu $F$ erpin guztietan: askotan, optimoa bi produktuak nahastean dago.', 'Las restricciones lo limitan. Calcula $F$ en todos los vértices: muchas veces el óptimo mezcla los dos productos.', 'القيود تحدّه. احسب $F$ عند كل الرؤوس: كثيرًا ما تجمع القيمة المثلى المنتجين.', 'The constraints limit it. Work out $F$ at every vertex: often the optimum mixes both products.')
        },
        check: {
            prompt: say('Irabazia $F=4x+6y$ da, eta erpinak $(0,0)$, $(5,0)$, $(3,3)$ eta $(0,4)$. Zein da irabazi handiena?', 'El beneficio es $F=4x+6y$ y los vértices, $(0,0)$, $(5,0)$, $(3,3)$ y $(0,4)$. ¿Cuál es el beneficio máximo?', 'الربح $F=4x+6y$ والرؤوس $(0,0)$ و$(5,0)$ و$(3,3)$ و$(0,4)$. ما أكبر ربح؟', 'The profit is $F=4x+6y$ and the vertices are $(0,0)$, $(5,0)$, $(3,3)$ and $(0,4)$. What is the greatest profit?'),
            options: [same('$30$'), same('$24$'), same('$20$')],
            correctIndex: 0,
            explanation: same('$F(5,0)=20,\\quad F(3,3)=30,\\quad F(0,4)=24$')
        }
    },
    'min-cost': {
        mistake: {
            wrong: say('Kostu txikiena $(0,0)$ puntuan dago: ezer ez erostea da merkeena.', 'El coste mínimo está en $(0,0)$: lo más barato es no comprar nada.', 'أقل كلفة في $(0,0)$: الأرخص ألا نشتري شيئًا.', 'The least cost is at $(0,0)$: buying nothing is cheapest.'),
            right: say('$(0,0)$ puntuak ez ditu «gutxienez» murrizketak betetzen: ez dago eskualdean. Minimoa eskualdeko erpin batean dago.', '$(0,0)$ no cumple las restricciones de «al menos»: no está en la región. El mínimo está en un vértice de la región.', '$(0,0)$ لا تحقق قيود «على الأقل»: ليست في المنطقة. والقيمة الصغرى عند رأس من المنطقة.', '$(0,0)$ does not satisfy the «at least» constraints: it is not in the region. The minimum is at a vertex of the region.')
        },
        check: {
            prompt: say('Kostua $F=2x+5y$ da, eta erpinak $(0,6)$, $(2,3)$ eta $(8,0)$. Zein erpinetan dago minimoa?', 'El coste es $F=2x+5y$ y los vértices, $(0,6)$, $(2,3)$ y $(8,0)$. ¿En qué vértice está el mínimo?', 'الكلفة $F=2x+5y$ والرؤوس $(0,6)$ و$(2,3)$ و$(8,0)$. عند أي رأس تكون القيمة الصغرى؟', 'The cost is $F=2x+5y$ and the vertices are $(0,6)$, $(2,3)$ and $(8,0)$. At which vertex is the minimum?'),
            options: [same('$(0,6)$'), same('$(8,0)$'), same('$(2,3)$')],
            correctIndex: 1,
            explanation: same('$F(0,6)=30,\\quad F(2,3)=19,\\quad F(8,0)=16$')
        }
    },
    'full-problem': {
        mistake: {
            wrong: say('Erpinak aurkitu ditut eta $F$ handiena $(60,40)$ puntuan dago; beraz, irabazia 60 eta 40 da.', 'He hallado los vértices y $F$ es máxima en $(60,40)$, así que el beneficio es 60 y 40.', 'وجدتُ الرؤوس وكانت $F$ عظمى في $(60,40)$، إذن الربح 60 و40.', 'I found the vertices and $F$ is greatest at $(60,40)$, so the profit is 60 and 40.'),
            right: say('$(60,40)$ puntuak zenbat egin behar den esaten du; irabazia $F(60,40)$ da. Erantzun biak, unitateekin.', '$(60,40)$ dice cuánto hay que hacer; el beneficio es $F(60,40)$. Responde las dos cosas, con sus unidades.', '$(60,40)$ تقول كم يجب أن نصنع؛ والربح هو $F(60,40)$. أجب عن الأمرين مع الوحدات.', '$(60,40)$ says how much to make; the profit is $F(60,40)$. Answer both, with their units.')
        },
        check: {
            prompt: say('Eskualdea: $x+y\\le 12$, $x\\le 8$ eta $y\\le 6$ ($x,y\\ge 0$). Zenbat da $F=3x+2y$ funtzioaren maximoa?', 'Región: $x+y\\le 12$, $x\\le 8$ e $y\\le 6$ ($x,y\\ge 0$). ¿Cuánto vale el máximo de $F=3x+2y$?', 'المنطقة: $x+y\\le 12$ و$x\\le 8$ و$y\\le 6$ ($x,y\\ge 0$). كم القيمة العظمى لـ $F=3x+2y$؟', 'Region: $x+y\\le 12$, $x\\le 8$ and $y\\le 6$ ($x,y\\ge 0$). What is the maximum of $F=3x+2y$?'),
            options: [same('$32$'), same('$24$'), same('$30$')],
            correctIndex: 0,
            explanation: same('$F(8,0)=24,\\quad F(8,4)=32,\\quad F(6,6)=30,\\quad F(0,6)=12$')
        }
    }
}
