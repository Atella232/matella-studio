import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Leku geometrikoak eta konikak · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   A question about a curve always names it with a second formula ($C$,
   $E$, $H$: …), so the test does not read the options as points that must
   lie on that curve.
   ========================================================================== */

export type BachConicsTopicId =
    | 'perpendicular-bisector' | 'angle-bisectors' | 'distance-loci'
    | 'circle-equation' | 'circle-general' | 'circle-line' | 'two-circles'
    | 'ellipse-definition' | 'ellipse-elements' | 'ellipse-shifted'
    | 'hyperbola-definition' | 'hyperbola-asymptotes'
    | 'parabola-definition' | 'parabola-positions' | 'recognize-conic'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachConicsLessonChecks: Record<BachConicsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Loci ---------- */
    'perpendicular-bisector': {
        mistake: {
            wrong: say('$O(0,0)$ eta $B(4,2)$: $(x-4)^2=x^2-16$', '$O(0,0)$ y $B(4,2)$: $(x-4)^2=x^2-16$', '$O(0,0)$ و$B(4,2)$: $(x-4)^2=x^2-16$', '$O(0,0)$ and $B(4,2)$: $(x-4)^2=x^2-16$'),
            right: say('Biderkadura bikoitza falta da: $(x-4)^2=x^2-8x+16$. Erdibitzailea $2x+y-5=0$ da.', 'Falta el doble producto: $(x-4)^2=x^2-8x+16$. La mediatriz es $2x+y-5=0$.', 'ينقص ضعف الجداء: $(x-4)^2=x^2-8x+16$. والمحور هو $2x+y-5=0$.', 'The middle term is missing: $(x-4)^2=x^2-8x+16$. The perpendicular bisector is $2x+y-5=0$.')
        },
        check: {
            prompt: say('Zein puntu dago $A(2,0)$ eta $B(0,4)$ muturreko zuzenkiaren erdibitzailean?', '¿Qué punto está en la mediatriz del segmento de extremos $A(2,0)$ y $B(0,4)$?', 'أي نقطة تقع على محور القطعة التي طرفاها $A(2,0)$ و$B(0,4)$؟', 'Which point is on the perpendicular bisector of the segment with end points $A(2,0)$ and $B(0,4)$?'),
            options: [same('$(3,2)$'), same('$(-1,1)$'), same('$(1,3)$')],
            correctIndex: 1,
            explanation: say('$(-1,1)$ puntutik $A$ eta $B$ puntuetarako distantziak berdinak dira: $(-1-2)^2+1^2=(-1)^2+(1-4)^2=10$.', 'Desde $(-1,1)$ las distancias a $A$ y a $B$ son iguales: $(-1-2)^2+1^2=(-1)^2+(1-4)^2=10$.', 'من $(-1,1)$ المسافتان إلى $A$ و$B$ متساويتان: $(-1-2)^2+1^2=(-1)^2+(1-4)^2=10$.', 'From $(-1,1)$ the distances to $A$ and to $B$ are equal: $(-1-2)^2+1^2=(-1)^2+(1-4)^2=10$.')
        }
    },
    'angle-bisectors': {
        mistake: {
            wrong: say('$x+y-2=0$ eta $7x-y+4=0$ zuzenen erdikaria: $x+y-2=7x-y+4$', 'Bisectriz de $x+y-2=0$ y $7x-y+4=0$: $x+y-2=7x-y+4$', 'منصّف $x+y-2=0$ و$7x-y+4=0$: $x+y-2=7x-y+4$', 'Bisector of $x+y-2=0$ and $7x-y+4=0$: $x+y-2=7x-y+4$'),
            right: say('Zuzen bakoitza bere $\\sqrt{A^2+B^2}$ zenbakiaz zatitzen da, $\\sqrt{2}$ eta $\\sqrt{50}$, eta bi zeinu daude: $5(x+y-2)=\\pm(7x-y+4)$.', 'Cada recta se divide por su $\\sqrt{A^2+B^2}$, $\\sqrt{2}$ y $\\sqrt{50}$, y hay dos signos: $5(x+y-2)=\\pm(7x-y+4)$.', 'يُقسم كل مستقيم على $\\sqrt{A^2+B^2}$ الخاص به، أي $\\sqrt{2}$ و$\\sqrt{50}$، وهناك إشارتان: $5(x+y-2)=\\pm(7x-y+4)$.', 'Each line is divided by its own $\\sqrt{A^2+B^2}$, $\\sqrt{2}$ and $\\sqrt{50}$, and there are two signs: $5(x+y-2)=\\pm(7x-y+4)$.')
        },
        check: {
            prompt: say('Zein puntu dago $r$: $3x+4y=0$ eta $s$: $4x+3y=0$ zuzenetatik distantzia berera?', '¿Qué punto está a la misma distancia de $r$: $3x+4y=0$ y de $s$: $4x+3y=0$?', 'أي نقطة على المسافة نفسها من $r$: $3x+4y=0$ ومن $s$: $4x+3y=0$؟', 'Which point is the same distance from $r$: $3x+4y=0$ and from $s$: $4x+3y=0$?'),
            options: [same('$(1,2)$'), same('$(2,0)$'), same('$(1,1)$')],
            correctIndex: 2,
            explanation: say('$\\frac{|3+4|}{5}=\\frac{|4+3|}{5}$: bi zuzenetatik distantzia bera.', '$\\frac{|3+4|}{5}=\\frac{|4+3|}{5}$: la misma distancia a las dos rectas.', '$\\frac{|3+4|}{5}=\\frac{|4+3|}{5}$: المسافة نفسها إلى المستقيمين.', '$\\frac{|3+4|}{5}=\\frac{|4+3|}{5}$: the same distance to both lines.')
        }
    },
    'distance-loci': {
        mistake: {
            wrong: say('$y=2$ zuzenetik $1$ distantziara: $y=3$ zuzena bakarrik', 'A distancia $1$ de $y=2$: solo la recta $y=3$', 'على بعد $1$ من $y=2$: المستقيم $y=3$ فقط', 'At distance $1$ from $y=2$: only the line $y=3$'),
            right: say('Bi zuzen daude, alde banatan: $y=3$ eta $y=1$.', 'Hay dos rectas, una a cada lado: $y=3$ e $y=1$.', 'هناك مستقيمان، واحد في كل جهة: $y=3$ و$y=1$.', 'There are two lines, one on each side: $y=3$ and $y=1$.')
        },
        check: {
            prompt: say('Zein da $C(1,-3)$ puntutik $4$ distantziara dauden puntuen leku geometrikoa?', '¿Cuál es el lugar geométrico de los puntos que están a distancia $4$ de $C(1,-3)$?', 'ما المحل الهندسي للنقاط التي تبعد $4$ عن $C(1,-3)$؟', 'What is the locus of the points at distance $4$ from $C(1,-3)$?'),
            options: [same('$(x+1)^2+(y-3)^2=16$'), same('$(x-1)^2+(y+3)^2=4$'), same('$(x-1)^2+(y+3)^2=16$')],
            correctIndex: 2,
            explanation: say('$C$ zentroko eta $4$ erradioko zirkunferentzia: $r^2=16$.', 'La circunferencia de centro $C$ y radio $4$: $r^2=16$.', 'الدائرة التي مركزها $C$ ونصف قطرها $4$: $r^2=16$.', 'The circle with centre $C$ and radius $4$: $r^2=16$.')
        }
    },

    /* ---------- 2. The circle ---------- */
    'circle-equation': {
        mistake: {
            wrong: say('$(3,-1)$ zentroa eta $4$ erradioa: $(x+3)^2+(y-1)^2=16$', 'Centro $(3,-1)$ y radio $4$: $(x+3)^2+(y-1)^2=16$', 'المركز $(3,-1)$ ونصف القطر $4$: $(x+3)^2+(y-1)^2=16$', 'Centre $(3,-1)$ and radius $4$: $(x+3)^2+(y-1)^2=16$'),
            right: say('Zentroaren koordenatuak kendu egiten dira: $(x-3)^2+(y+1)^2=16$.', 'Las coordenadas del centro se restan: $(x-3)^2+(y+1)^2=16$.', 'تُطرح إحداثيات المركز: $(x-3)^2+(y+1)^2=16$.', 'The coordinates of the centre are subtracted: $(x-3)^2+(y+1)^2=16$.')
        },
        check: {
            prompt: say('Zein da $C(-2,5)$ zentroko eta $3$ erradioko zirkunferentziaren ekuazioa?', '¿Cuál es la ecuación de la circunferencia de centro $C(-2,5)$ y radio $3$?', 'ما معادلة الدائرة التي مركزها $C(-2,5)$ ونصف قطرها $3$؟', 'What is the equation of the circle with centre $C(-2,5)$ and radius $3$?'),
            options: [same('$(x-2)^2+(y+5)^2=9$'), same('$(x+2)^2+(y-5)^2=9$'), same('$(x+2)^2+(y-5)^2=3$')],
            correctIndex: 1,
            explanation: say('$(x-(-2))^2+(y-5)^2=3^2$, hau da, $(x+2)^2+(y-5)^2=9$.', '$(x-(-2))^2+(y-5)^2=3^2$, es decir, $(x+2)^2+(y-5)^2=9$.', '$(x-(-2))^2+(y-5)^2=3^2$ أي $(x+2)^2+(y-5)^2=9$.', '$(x-(-2))^2+(y-5)^2=3^2$, that is, $(x+2)^2+(y-5)^2=9$.')
        }
    },
    'circle-general': {
        mistake: {
            wrong: say('$x^2+y^2+10x-4y=0$: zentroa $(10,-4)$', '$x^2+y^2+10x-4y=0$: centro $(10,-4)$', '$x^2+y^2+10x-4y=0$: المركز $(10,-4)$', '$x^2+y^2+10x-4y=0$: centre $(10,-4)$'),
            right: say('Zentroa koefizienteen erdia da, zeinua aldatuta: $\\left(-\\frac{10}{2},\\frac{4}{2}\\right)=(-5,2)$.', 'El centro es la mitad de los coeficientes, con el signo cambiado: $\\left(-\\frac{10}{2},\\frac{4}{2}\\right)=(-5,2)$.', 'المركز نصف المعاملين بإشارة معكوسة: $\\left(-\\frac{10}{2},\\frac{4}{2}\\right)=(-5,2)$.', 'The centre is half the coefficients with the sign changed: $\\left(-\\frac{10}{2},\\frac{4}{2}\\right)=(-5,2)$.')
        },
        check: {
            prompt: say('Zein da $x^2+y^2-6x+2y+1=0$ zirkunferentziaren $C$ zentroa?', '¿Cuál es el centro $C$ de la circunferencia $x^2+y^2-6x+2y+1=0$?', 'ما المركز $C$ للدائرة $x^2+y^2-6x+2y+1=0$؟', 'What is the centre $C$ of the circle $x^2+y^2-6x+2y+1=0$?'),
            options: [same('$(-3,1)$'), same('$(-6,2)$'), same('$(3,-1)$')],
            correctIndex: 2,
            explanation: say('$(x-3)^2+(y+1)^2=9$: zentroa $(3,-1)$ eta erradioa $3$.', '$(x-3)^2+(y+1)^2=9$: centro $(3,-1)$ y radio $3$.', '$(x-3)^2+(y+1)^2=9$: المركز $(3,-1)$ ونصف القطر $3$.', '$(x-3)^2+(y+1)^2=9$: centre $(3,-1)$ and radius $3$.')
        }
    },
    'circle-line': {
        mistake: {
            wrong: say('$(x-1)^2+y^2=4$ eta $x=4$ zuzena: $d=3<4$, ebakitzailea', '$(x-1)^2+y^2=4$ y la recta $x=4$: $d=3<4$, secante', '$(x-1)^2+y^2=4$ والمستقيم $x=4$: $d=3<4$، قاطع', '$(x-1)^2+y^2=4$ and the line $x=4$: $d=3<4$, secant'),
            right: say('Erradioarekin konparatu behar da, $r=2$, ez $r^2=4$ zenbakiarekin: $d=3>2$, kanpokoa.', 'Hay que comparar con el radio, $r=2$, no con $r^2=4$: $d=3>2$, exterior.', 'نقارن بنصف القطر $r=2$ لا بـ $r^2=4$: $d=3>2$، خارجي.', 'Compare with the radius, $r=2$, not with $r^2=4$: $d=3>2$, outside.')
        },
        check: {
            prompt: say('Nolakoa da $s$: $3x-4y+5=0$ zuzena $(2,-1)$ zentroko eta $3$ erradioko zirkunferentziarekiko?', '¿Cómo es la recta $s$: $3x-4y+5=0$ respecto de la circunferencia de centro $(2,-1)$ y radio $3$?', 'ما وضع المستقيم $s$: $3x-4y+5=0$ بالنسبة إلى الدائرة التي مركزها $(2,-1)$ ونصف قطرها $3$؟', 'How is the line $s$: $3x-4y+5=0$ placed with respect to the circle with centre $(2,-1)$ and radius $3$?'),
            options: [say('Ebakitzailea', 'Secante', 'قاطع', 'Secant'), say('Ukitzailea', 'Tangente', 'مماس', 'Tangent'), say('Kanpokoa', 'Exterior', 'خارجي', 'Outside')],
            correctIndex: 1,
            explanation: say('$d=\\frac{|6+4+5|}{5}=3$, erradioa bezainbeste.', '$d=\\frac{|6+4+5|}{5}=3$, igual al radio.', '$d=\\frac{|6+4+5|}{5}=3$ يساوي نصف القطر.', '$d=\\frac{|6+4+5|}{5}=3$, equal to the radius.')
        }
    },
    'two-circles': {
        mistake: {
            wrong: say('$4$ eta $1$ erradioak, zentroak $2$ distantziara: $2<4+1$, beraz ebakitzen dira', 'Radios $4$ y $1$, centros a distancia $2$: $2<4+1$, así que se cortan', 'نصفا القطرين $4$ و$1$ والمركزان على بعد $2$: $2<4+1$ إذن تتقاطعان', 'Radii $4$ and $1$, centres at distance $2$: $2<4+1$, so they cut each other'),
            right: say('Kendura ere begiratu behar da: $2<4-1$, beraz bata bestearen barruan dago eta ez dira ukitzen.', 'También hay que mirar la diferencia: $2<4-1$, así que una está dentro de la otra y no se tocan.', 'يجب النظر إلى الفرق أيضًا: $2<4-1$، إذن إحداهما داخل الأخرى ولا تتلامسان.', 'You also have to look at the difference: $2<4-1$, so one is inside the other and they do not touch.')
        },
        check: {
            prompt: say('Nolakoak dira $(0,0)$ eta $(5,0)$ zentroak eta $6$ eta $1$ erradioak dituzten zirkunferentziak?', '¿Cómo son las circunferencias de centros $(0,0)$ y $(5,0)$ y radios $6$ y $1$?', 'ما وضع الدائرتين اللتين مركزاهما $(0,0)$ و$(5,0)$ ونصفا قطريهما $6$ و$1$؟', 'How are the circles with centres $(0,0)$ and $(5,0)$ and radii $6$ and $1$ placed?'),
            options: [say('Barrutik ukitzaileak', 'Tangentes interiores', 'متماستان من الداخل', 'Tangent on the inside'), say('Kanpotik ukitzaileak', 'Tangentes exteriores', 'متماستان من الخارج', 'Tangent on the outside'), say('Ebakitzaileak', 'Secantes', 'متقاطعتان', 'Cutting each other')],
            correctIndex: 0,
            explanation: say('$d=5=6-1$: barrutik ukitzen dira.', '$d=5=6-1$: se tocan por dentro.', '$d=5=6-1$: تتلامسان من الداخل.', '$d=5=6-1$: they touch on the inside.')
        }
    },

    /* ---------- 3. The ellipse ---------- */
    'ellipse-definition': {
        mistake: {
            wrong: same('$\\frac{x^2}{40}+\\frac{y^2}{24}=1$: $c^2=40+24=64$, $c=8$'),
            right: say('Elipsean $a^2=b^2+c^2$: $c^2=40-24=16$, $c=4$.', 'En la elipse $a^2=b^2+c^2$: $c^2=40-24=16$, $c=4$.', 'في القطع الناقص $a^2=b^2+c^2$: $c^2=40-24=16$، $c=4$.', 'In an ellipse $a^2=b^2+c^2$: $c^2=40-24=16$, $c=4$.')
        },
        check: {
            prompt: say('Zenbat da $E$: $\\frac{x^2}{36}+\\frac{y^2}{20}=1$ elipseko edozein puntutik fokuetarako distantzien batura?', '¿Cuánto suman las distancias a los focos de cualquier punto de la elipse $E$: $\\frac{x^2}{36}+\\frac{y^2}{20}=1$?', 'كم مجموع بعدي أي نقطة من القطع الناقص $E$: $\\frac{x^2}{36}+\\frac{y^2}{20}=1$ عن البؤرتين؟', 'What is the sum of the distances to the foci from any point of the ellipse $E$: $\\frac{x^2}{36}+\\frac{y^2}{20}=1$?'),
            options: [same('$6$'), same('$12$'), same('$8$')],
            correctIndex: 1,
            explanation: say('$a^2=36$, beraz $a=6$, eta batura $2a=12$ da.', '$a^2=36$, así que $a=6$ y la suma es $2a=12$.', '$a^2=36$ إذن $a=6$ والمجموع $2a=12$.', '$a^2=36$, so $a=6$ and the sum is $2a=12$.')
        }
    },
    'ellipse-elements': {
        mistake: {
            wrong: same('$\\frac{x^2}{4}+\\frac{y^2}{9}=1$: $a=2$, $b=3$'),
            right: say('$a$ ardatzerdi nagusia da: izendatzaile handiena $9$ da, beraz $a=3$, $b=2$, eta ardatz nagusia bertikala da.', '$a$ es el semieje mayor: el denominador mayor es $9$, así que $a=3$, $b=2$ y el eje mayor es vertical.', '$a$ هو نصف المحور الأكبر: أكبر مقام هو $9$، إذن $a=3$ و$b=2$ والمحور الأكبر رأسي.', '$a$ is the semi-major axis: the greater denominator is $9$, so $a=3$, $b=2$ and the major axis is vertical.')
        },
        check: {
            prompt: say('Non daude $E$: $\\frac{x^2}{9}+\\frac{y^2}{25}=1$ elipsearen fokuak?', '¿Dónde están los focos de la elipse $E$: $\\frac{x^2}{9}+\\frac{y^2}{25}=1$?', 'أين بؤرتا القطع الناقص $E$: $\\frac{x^2}{9}+\\frac{y^2}{25}=1$؟', 'Where are the foci of the ellipse $E$: $\\frac{x^2}{9}+\\frac{y^2}{25}=1$?'),
            options: [same('$(\\pm 4,0)$'), same('$(0,\\pm\\sqrt{34})$'), same('$(0,\\pm 4)$')],
            correctIndex: 2,
            explanation: say('$a^2=25$ zenbakia $y^2$ gaiaren azpian dago: ardatz bertikala, eta $c=\\sqrt{25-9}=4$.', '$a^2=25$ está bajo $y^2$: eje vertical, y $c=\\sqrt{25-9}=4$.', '$a^2=25$ تحت $y^2$: محور رأسي، و$c=\\sqrt{25-9}=4$.', '$a^2=25$ is under $y^2$: vertical axis, and $c=\\sqrt{25-9}=4$.')
        }
    },
    'ellipse-shifted': {
        mistake: {
            wrong: say('$\\frac{(x-1)^2}{36}+\\frac{y^2}{20}=1$: fokuak $(\\pm 4,0)$', '$\\frac{(x-1)^2}{36}+\\frac{y^2}{20}=1$: focos $(\\pm 4,0)$', '$\\frac{(x-1)^2}{36}+\\frac{y^2}{20}=1$: البؤرتان $(\\pm 4,0)$', '$\\frac{(x-1)^2}{36}+\\frac{y^2}{20}=1$: foci $(\\pm 4,0)$'),
            right: say('Fokuak zentroarekin batera lekualdatzen dira, $(1,0)$: $(1\\pm 4,0)$, hau da, $(5,0)$ eta $(-3,0)$.', 'Los focos se trasladan con el centro $(1,0)$: $(1\\pm 4,0)$, es decir, $(5,0)$ y $(-3,0)$.', 'تنتقل البؤرتان مع المركز $(1,0)$: $(1\\pm 4,0)$ أي $(5,0)$ و$(-3,0)$.', 'The foci move with the centre $(1,0)$: $(1\\pm 4,0)$, that is, $(5,0)$ and $(-3,0)$.')
        },
        check: {
            prompt: say('Zein da $E$: $\\frac{(x+4)^2}{9}+\\frac{(y-1)^2}{4}=1$ elipsearen zentroa?', '¿Cuál es el centro de la elipse $E$: $\\frac{(x+4)^2}{9}+\\frac{(y-1)^2}{4}=1$?', 'ما مركز القطع الناقص $E$: $\\frac{(x+4)^2}{9}+\\frac{(y-1)^2}{4}=1$؟', 'What is the centre of the ellipse $E$: $\\frac{(x+4)^2}{9}+\\frac{(y-1)^2}{4}=1$?'),
            options: [same('$(4,-1)$'), same('$(-4,1)$'), same('$(9,4)$')],
            correctIndex: 1,
            explanation: say('$x+4=x-(-4)$ eta $y-1$: zentroa $(-4,1)$ da.', '$x+4=x-(-4)$ e $y-1$: el centro es $(-4,1)$.', '$x+4=x-(-4)$ و$y-1$: المركز $(-4,1)$.', '$x+4=x-(-4)$ and $y-1$: the centre is $(-4,1)$.')
        }
    },

    /* ---------- 4. The hyperbola ---------- */
    'hyperbola-definition': {
        mistake: {
            wrong: same('$\\frac{x^2}{20}-\\frac{y^2}{16}=1$: $c^2=20-16=4$'),
            right: say('Hiperbolan batu egiten dira: $c^2=20+16=36$, $c=6$.', 'En la hipérbola se suman: $c^2=20+16=36$, $c=6$.', 'في القطع الزائد نجمع: $c^2=20+16=36$، $c=6$.', 'In a hyperbola you add them: $c^2=20+16=36$, $c=6$.')
        },
        check: {
            prompt: say('Zenbat balio du $c$ parametroak $H$: $\\frac{x^2}{16}-\\frac{y^2}{9}=1$ hiperbolan?', '¿Cuánto vale $c$ en la hipérbola $H$: $\\frac{x^2}{16}-\\frac{y^2}{9}=1$?', 'كم قيمة $c$ في القطع الزائد $H$: $\\frac{x^2}{16}-\\frac{y^2}{9}=1$؟', 'What is $c$ in the hyperbola $H$: $\\frac{x^2}{16}-\\frac{y^2}{9}=1$?'),
            options: [same('$\\sqrt{7}$'), same('$5$'), same('$25$')],
            correctIndex: 1,
            explanation: say('$c^2=16+9=25$, beraz $c=5$.', '$c^2=16+9=25$, así que $c=5$.', '$c^2=16+9=25$ إذن $c=5$.', '$c^2=16+9=25$, so $c=5$.')
        }
    },
    'hyperbola-asymptotes': {
        mistake: {
            wrong: say('$\\frac{x^2}{9}-\\frac{y^2}{4}=1$: asintotak $y=\\pm\\frac{3}{2}x$', '$\\frac{x^2}{9}-\\frac{y^2}{4}=1$: asíntotas $y=\\pm\\frac{3}{2}x$', '$\\frac{x^2}{9}-\\frac{y^2}{4}=1$: المقاربان $y=\\pm\\frac{3}{2}x$', '$\\frac{x^2}{9}-\\frac{y^2}{4}=1$: asymptotes $y=\\pm\\frac{3}{2}x$'),
            right: say('Malda $\\frac{b}{a}$ da, ez $\\frac{a}{b}$: $y=\\pm\\frac{2}{3}x$.', 'La pendiente es $\\frac{b}{a}$, no $\\frac{a}{b}$: $y=\\pm\\frac{2}{3}x$.', 'الميل $\\frac{b}{a}$ لا $\\frac{a}{b}$: $y=\\pm\\frac{2}{3}x$.', 'The slope is $\\frac{b}{a}$, not $\\frac{a}{b}$: $y=\\pm\\frac{2}{3}x$.')
        },
        check: {
            prompt: say('Zein dira $H$: $\\frac{x^2}{4}-\\frac{y^2}{25}=1$ hiperbolaren asintotak?', '¿Cuáles son las asíntotas de la hipérbola $H$: $\\frac{x^2}{4}-\\frac{y^2}{25}=1$?', 'ما مقاربا القطع الزائد $H$: $\\frac{x^2}{4}-\\frac{y^2}{25}=1$؟', 'What are the asymptotes of the hyperbola $H$: $\\frac{x^2}{4}-\\frac{y^2}{25}=1$?'),
            options: [same('$y=\\pm\\frac{5}{2}x$'), same('$y=\\pm\\frac{2}{5}x$'), same('$y=\\pm\\frac{25}{4}x$')],
            correctIndex: 0,
            explanation: say('$a=2$ eta $b=5$: $y=\\pm\\frac{b}{a}x=\\pm\\frac{5}{2}x$.', '$a=2$ y $b=5$: $y=\\pm\\frac{b}{a}x=\\pm\\frac{5}{2}x$.', '$a=2$ و$b=5$: $y=\\pm\\frac{b}{a}x=\\pm\\frac{5}{2}x$.', '$a=2$ and $b=5$: $y=\\pm\\frac{b}{a}x=\\pm\\frac{5}{2}x$.')
        }
    },

    /* ---------- 5. The parabola and the conics ---------- */
    'parabola-definition': {
        mistake: {
            wrong: say('$y^2=14x$: fokua $(7,0)$', '$y^2=14x$: foco $(7,0)$', '$y^2=14x$: البؤرة $(7,0)$', '$y^2=14x$: focus $(7,0)$'),
            right: say('$2p=14$, beraz $p=7$, eta fokua $\\frac{p}{2}$ distantziara dago: $\\left(\\frac{7}{2},0\\right)$.', '$2p=14$, así que $p=7$, y el foco está en $\\frac{p}{2}$: $\\left(\\frac{7}{2},0\\right)$.', '$2p=14$ إذن $p=7$، والبؤرة عند $\\frac{p}{2}$: $\\left(\\frac{7}{2},0\\right)$.', '$2p=14$, so $p=7$, and the focus is at $\\frac{p}{2}$: $\\left(\\frac{7}{2},0\\right)$.')
        },
        check: {
            prompt: say('Non dago $y^2=8x$ parabolaren $F$ fokua?', '¿Dónde está el foco $F$ de la parábola $y^2=8x$?', 'أين البؤرة $F$ للقطع المكافئ $y^2=8x$؟', 'Where is the focus $F$ of the parabola $y^2=8x$?'),
            options: [same('$(2,0)$'), same('$(4,0)$'), same('$(8,0)$')],
            correctIndex: 0,
            explanation: say('$2p=8$, beraz $p=4$, eta fokua $\\left(\\frac{p}{2},0\\right)=(2,0)$ da.', '$2p=8$, así que $p=4$ y el foco es $\\left(\\frac{p}{2},0\\right)=(2,0)$.', '$2p=8$ إذن $p=4$ والبؤرة $\\left(\\frac{p}{2},0\\right)=(2,0)$.', '$2p=8$, so $p=4$ and the focus is $\\left(\\frac{p}{2},0\\right)=(2,0)$.')
        }
    },
    'parabola-positions': {
        mistake: {
            wrong: say('$(x-3)^2=4(y-1)$: erpina $(-3,-1)$', '$(x-3)^2=4(y-1)$: vértice $(-3,-1)$', '$(x-3)^2=4(y-1)$: الرأس $(-3,-1)$', '$(x-3)^2=4(y-1)$: vertex $(-3,-1)$'),
            right: say('Zenbakiak zeinua aldatuta doaz: $x-3$ eta $y-1$ gaiek $(3,1)$ erpina ematen dute.', 'Los números van con el signo cambiado: $x-3$ e $y-1$ dan el vértice $(3,1)$.', 'تأتي الأعداد بإشارة معكوسة: $x-3$ و$y-1$ تعطيان الرأس $(3,1)$.', 'The numbers come with the sign changed: $x-3$ and $y-1$ give the vertex $(3,1)$.')
        },
        check: {
            prompt: say('Nora irekitzen da $y^2=-5x$ parabola?', '¿Hacia dónde se abre la parábola $y^2=-5x$?', 'إلى أين ينفتح القطع المكافئ $y^2=-5x$؟', 'Which way does the parabola $y^2=-5x$ open?'),
            options: [say('Eskuinera', 'Hacia la derecha', 'نحو اليمين', 'To the right'), say('Ezkerrera', 'Hacia la izquierda', 'نحو اليسار', 'To the left'), say('Behera', 'Hacia abajo', 'نحو الأسفل', 'Downwards')],
            correctIndex: 1,
            explanation: say('$y^2$ gaiarekin ardatza horizontala da, eta $-5<0$: ezkerrera irekitzen da.', 'Con $y^2$ el eje es horizontal, y $-5<0$: se abre hacia la izquierda.', 'مع $y^2$ يكون المحور أفقيًا، و$-5<0$: ينفتح نحو اليسار.', 'With $y^2$ the axis is horizontal, and $-5<0$: it opens to the left.')
        }
    },
    'recognize-conic': {
        mistake: {
            wrong: say('$x^2+4y^2=4$ zirkunferentzia da, $x^2$ eta $y^2$ dituelako', '$x^2+4y^2=4$ es una circunferencia porque tiene $x^2$ e $y^2$', '$x^2+4y^2=4$ دائرة لأن فيها $x^2$ و$y^2$', '$x^2+4y^2=4$ is a circle because it has $x^2$ and $y^2$'),
            right: say('Zirkunferentzian koefizienteak berdinak dira; hemen $1$ eta $4$ dira: $\\frac{x^2}{4}+y^2=1$ elipsea da.', 'En la circunferencia los coeficientes son iguales; aquí son $1$ y $4$: es la elipse $\\frac{x^2}{4}+y^2=1$.', 'في الدائرة يتساوى المعاملان؛ وهنا هما $1$ و$4$: إنه القطع الناقص $\\frac{x^2}{4}+y^2=1$.', 'In a circle the coefficients are equal; here they are $1$ and $4$: it is the ellipse $\\frac{x^2}{4}+y^2=1$.')
        },
        check: {
            prompt: say('Zein konika da $3x^2+3y^2-6x+12y-1=0$?', '¿Qué cónica es $3x^2+3y^2-6x+12y-1=0$?', 'أي قطع مخروطي هو $3x^2+3y^2-6x+12y-1=0$؟', 'Which conic is $3x^2+3y^2-6x+12y-1=0$?'),
            options: [say('Elipse bat', 'Una elipse', 'قطع ناقص', 'An ellipse'), say('Parabola bat', 'Una parábola', 'قطع مكافئ', 'A parabola'), say('Zirkunferentzia bat', 'Una circunferencia', 'دائرة', 'A circle')],
            correctIndex: 2,
            explanation: say('$x^2$ eta $y^2$ gaien koefizienteak berdinak dira; $3$ zenbakiaz zatituta: $x^2+y^2-2x+4y-\\frac{1}{3}=0$.', 'Los coeficientes de $x^2$ e $y^2$ son iguales; dividiendo entre $3$: $x^2+y^2-2x+4y-\\frac{1}{3}=0$.', 'معاملا $x^2$ و$y^2$ متساويان؛ وبالقسمة على $3$: $x^2+y^2-2x+4y-\\frac{1}{3}=0$.', 'The coefficients of $x^2$ and $y^2$ are equal; dividing by $3$: $x^2+y^2-2x+4y-\\frac{1}{3}=0$.')
        }
    }
}
