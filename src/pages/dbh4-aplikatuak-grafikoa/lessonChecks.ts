import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake. A question about a single
   equation answers with a point that has to lie on it (and no wrong point
   may); otherwise it gives two formulas, so the test does not read the
   answer as an equivalent equation. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type GraphsTopicId = 'proportional' | 'affine' | 'linear-models' | 'slope' | 'line-equation' | 'parallel' | 'parabola' | 'vertex' | 'shifts' | 'inverse' | 'asymptotes' | 'radical' | 'exponential' | 'growth' | 'models'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const graphsLessonChecks: Record<GraphsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Linear functions ---------- */
    proportional: {
        mistake: {
            wrong: say('$(2,\\,8)$ puntutik pasatzen da: $m=\\frac{2}{8}$.', 'Pasa por $(2,\\,8)$: $m=\\frac{2}{8}$.', 'يمر بـ$(2,\\,8)$: $m=\\frac{2}{8}$.', 'It passes through $(2,\\,8)$: $m=\\frac{2}{8}$.'),
            right: say('Malda $y$ zati $x$ da: $m=\\frac{8}{2}=4$.', 'La pendiente es $y$ entre $x$: $m=\\frac{8}{2}=4$.', 'الميل $y$ على $x$: $m=\\frac{8}{2}=4$.', 'The slope is $y$ over $x$: $m=\\frac{8}{2}=4$.')
        },
        check: {
            prompt: say('Zuzen bat jatorritik eta $(4,\\,-12)$ puntutik pasatzen da. Zein da haren ekuazioa?', 'Una recta pasa por el origen y por $(4,\\,-12)$. ¿Cuál es su ecuación?', 'مستقيم يمر بالأصل وبـ$(4,\\,-12)$. ما معادلته؟', 'A line passes through the origin and $(4,\\,-12)$. What is its equation?'),
            options: [same('$y=-\\frac{1}{3}x$'), same('$y=-3x$'), same('$y=3x$')],
            correctIndex: 1,
            explanation: say('$m=\\frac{-12}{4}=-3$: beherakorra da.', '$m=\\frac{-12}{4}=-3$: es decreciente.', '$m=\\frac{-12}{4}=-3$: متناقصة.', '$m=\\frac{-12}{4}=-3$: it is decreasing.')
        }
    },
    affine: {
        mistake: {
            wrong: say('$y=3x+2$ zuzenak X ardatza $(0,\\,2)$ puntuan mozten du.', 'La recta $y=3x+2$ corta al eje X en $(0,\\,2)$.', 'المستقيم $y=3x+2$ يقطع محور X في $(0,\\,2)$.', 'The line $y=3x+2$ crosses the X axis at $(0,\\,2)$.'),
            right: say('$(0,\\,2)$ Y ardatzean dago, $n$ da. X ardatzerako, $y=0$: $3x+2=0$.', '$(0,\\,2)$ está en el eje Y: es $n$. Para el eje X, $y=0$: $3x+2=0$.', '$(0,\\,2)$ على محور Y: إنه $n$. ولمحور X نضع $y=0$: $3x+2=0$.', '$(0,\\,2)$ is on the Y axis: it is $n$. For the X axis, $y=0$: $3x+2=0$.')
        },
        check: {
            prompt: say('Non mozten du Y ardatza $y=4x-7$ zuzenak?', '¿Dónde corta al eje Y la recta $y=4x-7$?', 'أين يقطع المستقيم $y=4x-7$ محور Y؟', 'Where does the line $y=4x-7$ cross the Y axis?'),
            options: [same('$(\\frac{7}{4},\\,0)$'), same('$(0,\\,7)$'), same('$(0,\\,-7)$')],
            correctIndex: 2,
            explanation: say('Y ardatzean $x=0$, eta $y=n=-7$.', 'En el eje Y, $x=0$, e $y=n=-7$.', 'على محور Y يكون $x=0$ و$y=n=-7$.', 'On the Y axis, $x=0$, and $y=n=-7$.')
        }
    },
    'linear-models': {
        mistake: {
            wrong: say('Taxia: 4 € igotzean eta 2 € km-ko: $y=4x+2$.', 'Taxi: 4 € al subir y 2 € por km: $y=4x+2$.', 'سيارة أجرة: 4 € عند الركوب و2 € لكل كم: $y=4x+2$.', 'Taxi: €4 to get in and €2 per km: $y=4x+2$.'),
            right: say('Hasierako balioa $n$ da, eta km bakoitzeko aldaketa $m$: $y=2x+4$.', 'El valor inicial es $n$ y el cambio por km, $m$: $y=2x+4$.', 'القيمة الابتدائية $n$ والتغير لكل كم $m$: $y=2x+4$.', 'The starting value is $n$ and the change per km is $m$: $y=2x+4$.')
        },
        check: {
            prompt: say('Taxi batek 3 € kobratzen ditu igotzean eta $1{,}2$ € km-ko. Zenbat balio du 10 km-ko bidaia batek?', 'Un taxi cobra 3 € al subir y $1{,}2$ € por km. ¿Cuánto cuesta un viaje de 10 km?', 'سيارة أجرة تأخذ 3 € عند الركوب و$1{,}2$ € لكل كم. كم ثمن رحلة 10 كم؟', 'A taxi charges €3 to get in and €$1{,}2$ per km. How much is a 10 km trip?'),
            options: [say('$31{,}2$ €', '$31{,}2$ €', '$31{,}2$ €', '€$31{,}2$'), say('$15$ €', '$15$ €', '$15$ €', '€$15$'), say('$13{,}2$ €', '$13{,}2$ €', '$13{,}2$ €', '€$13{,}2$')],
            correctIndex: 1,
            explanation: say('$y=3+1{,}2x$; $x=10$ denean, $3+12=15$ €.', '$y=3+1{,}2x$; con $x=10$, $3+12=15$ €.', '$y=3+1{,}2x$؛ ومع $x=10$ يكون $3+12=15$ €.', '$y=3+1{,}2x$; with $x=10$, $3+12=15$ euros.')
        }
    },
    /* ---------- 2. Straight lines ---------- */
    slope: {
        mistake: {
            wrong: say('$(1,\\,2)$ eta $(3,\\,8)$ puntuak: $m=\\frac{8-2}{1-3}$.', 'Por $(1,\\,2)$ y $(3,\\,8)$: $m=\\frac{8-2}{1-3}$.', 'المار بـ$(1,\\,2)$ و$(3,\\,8)$: $m=\\frac{8-2}{1-3}$.', 'Through $(1,\\,2)$ and $(3,\\,8)$: $m=\\frac{8-2}{1-3}$.'),
            right: say('Ordena berean kentzen da goian eta behean: $m=\\frac{8-2}{3-1}=3$.', 'Se resta en el mismo orden arriba y abajo: $m=\\frac{8-2}{3-1}=3$.', 'نطرح بالترتيب نفسه في البسط والمقام: $m=\\frac{8-2}{3-1}=3$.', 'Subtract in the same order on top and at the bottom: $m=\\frac{8-2}{3-1}=3$.')
        },
        check: {
            prompt: say('Zein da $(1,\\,5)$ eta $(3,\\,1)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $(1,\\,5)$ y $(3,\\,1)$?', 'ما ميل المستقيم المار بـ$(1,\\,5)$ و$(3,\\,1)$؟', 'What is the slope of the line through $(1,\\,5)$ and $(3,\\,1)$?'),
            options: [same('$-2$'), same('$2$'), same('$-\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: say('$\\frac{1-5}{3-1}=\\frac{-4}{2}=-2$: jaitsi egiten da.', '$\\frac{1-5}{3-1}=\\frac{-4}{2}=-2$: baja.', '$\\frac{1-5}{3-1}=\\frac{-4}{2}=-2$: ينزل.', '$\\frac{1-5}{3-1}=\\frac{-4}{2}=-2$: it goes down.')
        }
    },
    'line-equation': {
        mistake: {
            wrong: say('$m=4$ eta $(1,\\,3)$ puntua: $n$ puntuaren $y$ da, beraz $y=4x+3$.', 'Con $m=4$ y el punto $(1,\\,3)$: $n$ es la $y$ del punto, así que $y=4x+3$.', 'مع $m=4$ والنقطة $(1,\\,3)$: $n$ هو $y$ النقطة، إذن $y=4x+3$.', 'With $m=4$ and the point $(1,\\,3)$: $n$ is the point’s $y$, so $y=4x+3$.'),
            right: say('$n$ ordezkatuz aurkitzen da: $3=4\\cdot 1+n$, $n=-1$, eta $y=4x-1$.', '$n$ se halla sustituyendo: $3=4\\cdot 1+n$, $n=-1$, e $y=4x-1$.', 'نجد $n$ بالتعويض: $3=4\\cdot 1+n$، $n=-1$، و$y=4x-1$.', 'You find $n$ by substituting: $3=4\\cdot 1+n$, $n=-1$, and $y=4x-1$.')
        },
        check: {
            prompt: say('Idatzi $-3$ maldako zuzena, $(2,\\,1)$ puntutik pasatzen dena.', 'Escribe la recta de pendiente $-3$ que pasa por $(2,\\,1)$.', 'اكتب المستقيم الذي ميله $-3$ ويمر بـ$(2,\\,1)$.', 'Write the line with slope $-3$ through $(2,\\,1)$.'),
            options: [same('$y=-3x+1$'), same('$y=-3x-5$'), same('$y=-3x+7$')],
            correctIndex: 2,
            explanation: say('$1=-3\\cdot 2+n$, beraz $n=7$.', '$1=-3\\cdot 2+n$, así que $n=7$.', '$1=-3\\cdot 2+n$، إذن $n=7$.', '$1=-3\\cdot 2+n$, so $n=7$.')
        }
    },
    parallel: {
        mistake: {
            wrong: say('$y=3x+1$ zuzenaren paraleloa: $y=-3x+1$.', 'La paralela a $y=3x+1$: $y=-3x+1$.', 'الموازي لـ$y=3x+1$: $y=-3x+1$.', 'The parallel to $y=3x+1$: $y=-3x+1$.'),
            right: say('Paraleloek malda bera dute, $m=3$: adibidez, $y=3x-2$.', 'Las paralelas tienen la misma pendiente, $m=3$: por ejemplo, $y=3x-2$.', 'للمستقيمات المتوازية الميل نفسه $m=3$: مثلًا $y=3x-2$.', 'Parallel lines have the same slope, $m=3$: for example, $y=3x-2$.')
        },
        check: {
            prompt: say('Zein zuzen da $y=2x-1$ zuzenaren paraleloa eta $(0,\\,5)$ puntutik pasatzen da?', '¿Qué recta es paralela a $y=2x-1$ y pasa por $(0,\\,5)$?', 'أيّ مستقيم يوازي $y=2x-1$ ويمر بـ$(0,\\,5)$؟', 'Which line is parallel to $y=2x-1$ and passes through $(0,\\,5)$?'),
            options: [same('$y=-2x+5$'), same('$y=2x+5$'), same('$y=5x-1$')],
            correctIndex: 1,
            explanation: say('Malda bera, 2, eta Y ardatza 5 puntuan: $y=2x+5$.', 'Misma pendiente, 2, y corte con el eje Y en 5: $y=2x+5$.', 'الميل نفسه 2، والتقاطع مع محور Y عند 5: $y=2x+5$.', 'Same slope, 2, and crossing the Y axis at 5: $y=2x+5$.')
        }
    },
    /* ---------- 3. Parabolas ---------- */
    parabola: {
        mistake: {
            wrong: say('$y=-2x^{2}$ parabolaren adarrak gorantz doaz, $x^{2}$ beti positiboa delako.', 'Las ramas de $y=-2x^{2}$ van hacia arriba, porque $x^{2}$ siempre es positivo.', 'فرعا $y=-2x^{2}$ إلى الأعلى لأن $x^{2}$ موجب دائمًا.', 'The branches of $y=-2x^{2}$ go up, because $x^{2}$ is always positive.'),
            right: say('$a=-2<0$: adarrak beherantz, eta erpina maximoa da. $x^{2}$ bider $-2$ negatiboa da.', '$a=-2<0$: ramas hacia abajo y vértice máximo. $x^{2}$ por $-2$ es negativo.', '$a=-2<0$: الفرعان إلى الأسفل والرأس قيمة عظمى. $x^{2}$ في $-2$ سالب.', '$a=-2<0$: branches down and the vertex is a maximum. $x^{2}$ times $-2$ is negative.')
        },
        check: {
            prompt: say('Nolakoak dira $y=-0{,}5x^{2}$ parabolaren adarrak?', '¿Cómo son las ramas de $y=-0{,}5x^{2}$?', 'كيف فرعا $y=-0{,}5x^{2}$؟', 'What are the branches of $y=-0{,}5x^{2}$ like?'),
            options: [
                say('Gorantz, eta erpina minimoa da', 'Hacia arriba, y el vértice es un mínimo', 'إلى الأعلى، والرأس قيمة صغرى', 'Up, and the vertex is a minimum'),
                say('Beherantz, eta erpina minimoa da', 'Hacia abajo, y el vértice es un mínimo', 'إلى الأسفل، والرأس قيمة صغرى', 'Down, and the vertex is a minimum'),
                say('Beherantz, eta erpina maximoa da', 'Hacia abajo, y el vértice es un máximo', 'إلى الأسفل، والرأس قيمة عظمى', 'Down, and the vertex is a maximum')
            ],
            correctIndex: 2,
            explanation: say('$a<0$: adarrak beherantz; erpina punturik altuena da.', '$a<0$: ramas hacia abajo; el vértice es el punto más alto.', '$a<0$: الفرعان إلى الأسفل؛ والرأس أعلى نقطة.', '$a<0$: branches down; the vertex is the highest point.')
        }
    },
    vertex: {
        mistake: {
            wrong: say('$y=x^{2}-8x+1$ parabolan: $x_V=\\frac{-8}{2}=-4$.', 'En $y=x^{2}-8x+1$: $x_V=\\frac{-8}{2}=-4$.', 'في $y=x^{2}-8x+1$: $x_V=\\frac{-8}{2}=-4$.', 'In $y=x^{2}-8x+1$: $x_V=\\frac{-8}{2}=-4$.'),
            right: say('Formulak $-b$ dauka: $b=-8$ denez, $x_V=\\frac{8}{2}=4$.', 'La fórmula lleva $-b$: con $b=-8$, $x_V=\\frac{8}{2}=4$.', 'في الصيغة $-b$: مع $b=-8$ يكون $x_V=\\frac{8}{2}=4$.', 'The formula has $-b$: with $b=-8$, $x_V=\\frac{8}{2}=4$.')
        },
        check: {
            prompt: say('Zein da $y=x^{2}+6x+5$ parabolaren erpina?', '¿Cuál es el vértice de $y=x^{2}+6x+5$?', 'ما رأس $y=x^{2}+6x+5$؟', 'What is the vertex of $y=x^{2}+6x+5$?'),
            options: [same('$(3,\\,-4)$'), same('$(-3,\\,-4)$'), same('$(-3,\\,4)$')],
            correctIndex: 1,
            explanation: say('$x_V=\\frac{-6}{2}=-3$ eta $y=9-18+5=-4$.', '$x_V=\\frac{-6}{2}=-3$ e $y=9-18+5=-4$.', '$x_V=\\frac{-6}{2}=-3$ و$y=9-18+5=-4$.', '$x_V=\\frac{-6}{2}=-3$ and $y=9-18+5=-4$.')
        }
    },
    shifts: {
        mistake: {
            wrong: say('$y=(x-2)^{2}$ parabola 2 unitate ezkerrera doa.', '$y=(x-2)^{2}$ va 2 unidades a la izquierda.', '$y=(x-2)^{2}$ تنتقل وحدتين إلى اليسار.', '$y=(x-2)^{2}$ moves 2 units to the left.'),
            right: say('Eskuinera doa: lehen $x=0$ zenbakian zegoena orain $x=2$ zenbakian dago.', 'Va a la derecha: lo que estaba en $x=0$ ahora está en $x=2$.', 'تنتقل إلى اليمين: ما كان عند $x=0$ صار عند $x=2$.', 'It moves right: what was at $x=0$ is now at $x=2$.')
        },
        check: {
            prompt: say('Zein da $y=(x+4)^{2}-1$ parabolaren erpina?', '¿Cuál es el vértice de $y=(x+4)^{2}-1$?', 'ما رأس $y=(x+4)^{2}-1$؟', 'What is the vertex of $y=(x+4)^{2}-1$?'),
            options: [same('$(4,\\,-1)$'), same('$(-4,\\,1)$'), same('$(-4,\\,-1)$')],
            correctIndex: 2,
            explanation: say('$(x+4)^{2}=(x-(-4))^{2}$: $p=-4$, eta $q=-1$.', '$(x+4)^{2}=(x-(-4))^{2}$: $p=-4$, y $q=-1$.', '$(x+4)^{2}=(x-(-4))^{2}$: $p=-4$ و$q=-1$.', '$(x+4)^{2}=(x-(-4))^{2}$: $p=-4$, and $q=-1$.')
        }
    },
    /* ---------- 4. Inverse and radical functions ---------- */
    inverse: {
        mistake: {
            wrong: say('$y=\\frac{6}{x}$ hiperbolak bi ardatzak mozten ditu.', 'La hipérbola $y=\\frac{6}{x}$ corta a los dos ejes.', 'القطع الزائد $y=\\frac{6}{x}$ يقطع المحورين.', 'The hyperbola $y=\\frac{6}{x}$ crosses both axes.'),
            right: say('$x=0$ ez dago izate-eremuan, eta $y$ ez da inoiz 0: ardatzak asintotak dira.', '$x=0$ no está en el dominio e $y$ nunca vale 0: los ejes son asíntotas.', '$x=0$ ليس في المجال و$y$ لا يساوي 0 أبدًا: المحوران مقاربان.', '$x=0$ is not in the domain and $y$ is never 0: the axes are asymptotes.')
        },
        check: {
            prompt: say('$x\\cdot y=36$ bada, zenbat da $y$ $x=9$ denean?', 'Si $x\\cdot y=36$, ¿cuánto vale $y$ cuando $x=9$?', 'إذا كان $x\\cdot y=36$ فكم يساوي $y$ عندما $x=9$؟', 'If $x\\cdot y=36$, what is $y$ when $x=9$?'),
            options: [same('$27$'), same('$4$'), same('$324$')],
            correctIndex: 1,
            explanation: say('Biderkadura konstantea da: $y=\\frac{36}{9}=4$.', 'El producto es constante: $y=\\frac{36}{9}=4$.', 'حاصل الضرب ثابت: $y=\\frac{36}{9}=4$.', 'The product is constant: $y=\\frac{36}{9}=4$.')
        }
    },
    asymptotes: {
        mistake: {
            wrong: say('$y=\\frac{1}{x+3}$ funtzioaren asintota bertikala $x=3$ da.', 'La asíntota vertical de $y=\\frac{1}{x+3}$ es $x=3$.', 'المقارب العمودي لـ$y=\\frac{1}{x+3}$ هو $x=3$.', 'The vertical asymptote of $y=\\frac{1}{x+3}$ is $x=3$.'),
            right: say('Izendatzailea $x=-3$ denean anulatzen da: asintota $x=-3$ da.', 'El denominador se anula en $x=-3$: la asíntota es $x=-3$.', 'ينعدم المقام عند $x=-3$: المقارب $x=-3$.', 'The denominator is zero at $x=-3$: the asymptote is $x=-3$.')
        },
        check: {
            prompt: say('Zein dira $y=\\frac{2}{x-5}+3$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{2}{x-5}+3$?', 'ما مقاربا $y=\\frac{2}{x-5}+3$؟', 'What are the asymptotes of $y=\\frac{2}{x-5}+3$?'),
            options: [
                say('$x=5$ eta $y=3$', '$x=5$ e $y=3$', '$x=5$ و$y=3$', '$x=5$ and $y=3$'),
                say('$x=-5$ eta $y=3$', '$x=-5$ e $y=3$', '$x=-5$ و$y=3$', '$x=-5$ and $y=3$'),
                say('$x=3$ eta $y=5$', '$x=3$ e $y=5$', '$x=3$ و$y=5$', '$x=3$ and $y=5$')
            ],
            correctIndex: 0,
            explanation: say('Izendatzailea 0 da $x=5$ denean; batzen den zenbakia 3 da.', 'El denominador es 0 en $x=5$; el número que se suma es 3.', 'المقام 0 عند $x=5$؛ والعدد المضاف 3.', 'The denominator is 0 at $x=5$; the number added is 3.')
        }
    },
    radical: {
        mistake: {
            wrong: say('$y=\\sqrt{x+2}$ funtzioaren izate-eremua $[2,\\,+\\infty)$ da.', 'El dominio de $y=\\sqrt{x+2}$ es $[2,\\,+\\infty)$.', 'مجال $y=\\sqrt{x+2}$ هو $[2,\\,+\\infty)$.', 'The domain of $y=\\sqrt{x+2}$ is $[2,\\,+\\infty)$.'),
            right: say('$x+2\\ge 0$, beraz $x\\ge -2$: $[-2,\\,+\\infty)$, 2 unitate ezkerrera.', '$x+2\\ge 0$, así que $x\\ge -2$: $[-2,\\,+\\infty)$, 2 unidades a la izquierda.', '$x+2\\ge 0$، إذن $x\\ge -2$: $[-2,\\,+\\infty)$، وحدتان إلى اليسار.', '$x+2\\ge 0$, so $x\\ge -2$: $[-2,\\,+\\infty)$, 2 units to the left.')
        },
        check: {
            prompt: say('Zein da $y=\\sqrt{x+6}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\sqrt{x+6}$?', 'ما مجال $y=\\sqrt{x+6}$؟', 'What is the domain of $y=\\sqrt{x+6}$?'),
            options: [same('$[6,\\,+\\infty)$'), same('$(-\\infty,\\,-6]$'), same('$[-6,\\,+\\infty)$')],
            correctIndex: 2,
            explanation: say('Barrukoa $\\ge 0$: $x+6\\ge 0$, beraz $x\\ge -6$.', 'Lo de dentro $\\ge 0$: $x+6\\ge 0$, así que $x\\ge -6$.', 'ما تحت الجذر $\\ge 0$: $x+6\\ge 0$، إذن $x\\ge -6$.', 'The inside $\\ge 0$: $x+6\\ge 0$, so $x\\ge -6$.')
        }
    },
    /* ---------- 5. Exponential functions ---------- */
    exponential: {
        mistake: {
            wrong: same('$y=(-2)^{x}$'),
            right: say('Oinarriak positiboa izan behar du eta ez 1: $(-2)^{\\frac{1}{2}}$ ez dago, eta $1^{x}$ beti 1 da.', 'La base tiene que ser positiva y distinta de 1: $(-2)^{\\frac{1}{2}}$ no existe y $1^{x}$ siempre vale 1.', 'يجب أن يكون الأساس موجبًا ومختلفًا عن 1: $(-2)^{\\frac{1}{2}}$ غير موجود و$1^{x}$ يساوي 1 دائمًا.', 'The base has to be positive and not 1: $(-2)^{\\frac{1}{2}}$ does not exist and $1^{x}$ is always 1.')
        },
        check: {
            prompt: say('Zein puntutatik pasatzen dira funtzio esponentzial guztiak?', '¿Por qué punto pasan todas las funciones exponenciales?', 'بأيّ نقطة تمر كل الدوال الأسية؟', 'Which point do all exponential functions pass through?'),
            options: [same('$(1,\\,0)$'), same('$(0,\\,1)$'), same('$(0,\\,0)$')],
            correctIndex: 1,
            explanation: say('$a^{0}=1$, edozein dela oinarria.', '$a^{0}=1$, sea cual sea la base.', '$a^{0}=1$ أيًّا كان الأساس.', '$a^{0}=1$, whatever the base.')
        }
    },
    growth: {
        mistake: {
            wrong: say('% 5 jaistea $0{,}05$ zenbakiaz biderkatzea da.', 'Bajar un 5 % es multiplicar por $0{,}05$.', 'الانخفاض بنسبة 5٪ ضرب في $0{,}05$.', 'Going down 5% is multiplying by $0{,}05$.'),
            right: say('% 95 geratzen da: $0{,}95$ zenbakiaz biderkatzen da.', 'Queda el 95 %: se multiplica por $0{,}95$.', 'يبقى 95٪: نضرب في $0{,}95$.', '95% is left: multiply by $0{,}95$.')
        },
        check: {
            prompt: say('15 000 euroko auto batek urtero bere balioaren % 10 galtzen du. Zein formulak ematen du haren balioa?', 'Un coche de 15 000 € pierde cada año un 10 % de su valor. ¿Qué fórmula da su valor?', 'سيارة ثمنها 15 000 € تخسر كل سنة 10٪ من قيمتها. أيّ صيغة تعطي قيمتها؟', 'A €15,000 car loses 10% of its value every year. Which formula gives its value?'),
            options: [same('$y=15\\,000\\cdot 0{,}1^{x}$'), same('$y=15\\,000\\cdot 0{,}9^{x}$'), same('$y=15\\,000-0{,}1x$')],
            correctIndex: 1,
            explanation: say('Urtero % 90 geratzen da: bider $0{,}9$, $x$ aldiz.', 'Cada año queda el 90 %: por $0{,}9$, $x$ veces.', 'كل سنة يبقى 90٪: في $0{,}9$ مرات عددها $x$.', 'Each year 90% is left: times $0{,}9$, $x$ times.')
        }
    },
    models: {
        mistake: {
            wrong: say('Urtero % 3 hazten den biztanleria eredu lineala da.', 'Una población que crece un 3 % cada año sigue un modelo lineal.', 'السكان الذين يزيدون 3٪ كل سنة يتبعون نموذجًا خطيًا.', 'A population that grows 3% a year follows a linear model.'),
            right: say('Ehuneko bera da, ez kopuru bera: bider $1{,}03$, esponentziala.', 'Es el mismo porcentaje, no la misma cantidad: por $1{,}03$, exponencial.', 'إنها النسبة نفسها لا الكمية نفسها: في $1{,}03$، أسي.', 'It is the same percentage, not the same amount: times $1{,}03$, exponential.')
        },
        check: {
            prompt: say('Biltegi batek 5 L galtzen ditu beti, orduro. Zein eredu jarraitzen du?', 'Un depósito pierde siempre 5 L cada hora. ¿Qué modelo sigue?', 'خزان يفقد دائمًا 5 لترات كل ساعة. أيّ نموذج يتبع؟', 'A tank always loses 5 L every hour. Which model does it follow?'),
            options: [say('Lineala', 'Lineal', 'خطي', 'Linear'), say('Esponentziala', 'Exponencial', 'أسي', 'Exponential'), say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse')],
            correctIndex: 0,
            explanation: say('Urrats bakoitzean kopuru bera kentzen da: lineala, $m=-5$.', 'Se resta lo mismo en cada paso: lineal, $m=-5$.', 'نطرح الكمية نفسها في كل خطوة: خطي، $m=-5$.', 'The same amount goes in each step: linear, $m=-5$.')
        }
    }
}
