import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Irudi lauak · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges. Exercises follow Santillana 1.º ESO units 10–11 and Anaya
   units 12–13 (the triangles that cannot be built, the quadrilaterals made
   with paper strips, the circles of radii 7 and 10, the chord 9 cm from the
   centre, the tiled room, the path round the garden). Every closed answer
   is a single number: degrees without the ° sign, lengths and areas without
   the unit, and π ≈ 3,14.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const figuresDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1301,
        prompt: say('Zenbat diagonal ditu pentagono batek?', '¿Cuántas diagonales tiene un pentágono?', 'كم قطرًا للمخمس؟'),
        options: [same('$5$'), same('$10$'), same('$2$')],
        correctIndex: 0,
        explanation: say('Erpin bakoitzetik 2; bakoitza bi aldiz zenbatzen da: $\\frac{5\\cdot 2}{2}=5$.', 'De cada vértice salen 2; cada una se cuenta dos veces: $\\frac{5\\cdot 2}{2}=5$.', 'من كل رأس قطران؛ وكل قطر يُحسب مرتين: $\\frac{5\\cdot 2}{2}=5$.'),
        topic: 'diagonals'
    },
    {
        id: 1302,
        prompt: say('Zenbat egiten dute hexagono baten barne-angeluek?', '¿Cuánto suman los ángulos interiores de un hexágono?', 'كم مجموع الزوايا الداخلية للمسدس؟'),
        options: [same('$540^{\\circ}$'), same('$720^{\\circ}$'), same('$1080^{\\circ}$')],
        correctIndex: 1,
        explanation: say('4 triangelutan banatzen da: $(6-2)\\cdot 180^{\\circ}=720^{\\circ}$.', 'Se divide en 4 triángulos: $(6-2)\\cdot 180^{\\circ}=720^{\\circ}$.', 'ينقسم إلى 4 مثلثات: $(6-2)\\cdot 180^{\\circ}=720^{\\circ}$.'),
        topic: 'angle-sum'
    },
    {
        id: 1303,
        prompt: say('Zenbat da oktogono erregularraren angelu zentrala?', '¿Cuánto mide el ángulo central del octógono regular?', 'كم قياس الزاوية المركزية للمثمن المنتظم؟'),
        options: [same('$45^{\\circ}$'), same('$135^{\\circ}$'), same('$60^{\\circ}$')],
        correctIndex: 0,
        explanation: say('$360^{\\circ}\\mathbin{:}8=45^{\\circ}$. $135^{\\circ}$ barne-angelua da.', '$360^{\\circ}\\mathbin{:}8=45^{\\circ}$. $135^{\\circ}$ es el ángulo interior.', '$360^{\\circ}\\mathbin{:}8=45^{\\circ}$. أما $135^{\\circ}$ فهي الزاوية الداخلية.'),
        topic: 'regular-angles'
    },
    {
        id: 1304,
        prompt: say('Zein zuzenkirekin eraiki daiteke triangelu bat?', '¿Con qué segmentos se puede construir un triángulo?', 'بأي قطع يمكن إنشاء مثلث؟'),
        options: [same('2, 3, 6 cm'), same('4, 4, 9 cm'), same('5, 6, 8 cm')],
        correctIndex: 2,
        explanation: say('Alde handiena beste bien batura baino txikiagoa izan behar da: $8<5+6=11$. Besteetan $6>2+3$ eta $9>4+4$.', 'El lado mayor tiene que ser menor que la suma de los otros dos: $8<5+6=11$. En los otros, $6>2+3$ y $9>4+4$.', 'يجب أن يكون الضلع الأكبر أصغر من مجموع الآخرين: $8<5+6=11$. وفي الأخريين $6>2+3$ و$9>4+4$.'),
        topic: 'triangle-exists'
    },
    {
        id: 1305,
        prompt: say('Non dago triangelu angeluzuzen baten zirkunzentroa?', '¿Dónde está el circuncentro de un triángulo rectángulo?', 'أين يقع مركز الدائرة المحيطة بمثلث قائم؟'),
        options: [say('Triangeluaren barruan', 'Dentro del triángulo', 'داخل المثلث'), say('Hipotenusaren erdiko puntuan', 'En el punto medio de la hipotenusa', 'في منتصف الوتر'), say('Triangeluaren kanpoan', 'Fuera del triángulo', 'خارج المثلث')],
        correctIndex: 1,
        explanation: say('Angeluzuzenean zirkunzentroa hipotenusaren erdian dago, eta erradioa hipotenusaren erdia da.', 'En el rectángulo el circuncentro está en la mitad de la hipotenusa, y el radio es la mitad de la hipotenusa.', 'في المثلث القائم يقع مركز الدائرة المحيطة في منتصف الوتر، ونصف قطرها نصف الوتر.'),
        topic: 'centers'
    },
    {
        id: 1306,
        prompt: say('Paralelogramo baten diagonalak berdinak eta perpendikularrak dira. Zer da?', 'Las diagonales de un paralelogramo son iguales y perpendiculares. ¿Qué es?', 'قطرا متوازي أضلاع متساويان ومتعامدان. ما هو؟'),
        options: [say('Erronboa', 'Un rombo', 'معيّن'), say('Laukizuzena', 'Un rectángulo', 'مستطيل'), say('Karratua', 'Un cuadrado', 'مربع')],
        correctIndex: 2,
        explanation: say('Berdinak: laukizuzena. Perpendikularrak: erronboa. Biak batera: karratua.', 'Iguales: rectángulo. Perpendiculares: rombo. Las dos cosas: cuadrado.', 'متساويان: مستطيل. متعامدان: معيّن. الأمران معًا: مربع.'),
        topic: 'quad-diagonals'
    },
    {
        id: 1307,
        prompt: say('Bi zirkunferentziaren erradioak 5 cm eta 3 cm dira, eta zentroak 8 cm-ra daude. Nolakoak dira?', 'Dos circunferencias tienen radios de 5 cm y 3 cm, y sus centros están a 8 cm. ¿Cómo son?', 'نصفا قطري دائرتين 5 سم و3 سم، والبعد بين مركزيهما 8 سم. كيف هما؟'),
        options: [say('Ebakitzaileak', 'Secantes', 'متقاطعتان'), say('Kanpotik ukitzaileak', 'Tangentes exteriores', 'متماستان من الخارج'), say('Barnekoak', 'Interiores', 'متداخلتان')],
        correctIndex: 1,
        explanation: say('$5+3=8$, zentroen arteko distantzia bera: kanpotik ukitzen dira.', '$5+3=8$, justo la distancia entre los centros: se tocan por fuera.', '$5+3=8$، وهو البعد بين المركزين بالضبط: تتماسان من الخارج.'),
        topic: 'two-circles'
    },
    {
        id: 1308,
        prompt: say('Zein da 5 cm eta 3 cm-ko erradioak dituen koroa zirkularraren azalera? ($\\pi\\approx 3{,}14$)', '¿Cuál es el área de la corona circular de radios 5 cm y 3 cm? ($\\pi\\approx 3{,}14$)', 'ما مساحة الحلقة الدائرية التي نصفا قطريها 5 سم و3 سم؟ ($\\pi\\approx 3{,}14$)'),
        options: [same('$12{,}56$ cm²'), same('$50{,}24$ cm²'), same('$25{,}12$ cm²')],
        correctIndex: 1,
        explanation: say('Lehenik karratuak, gero kendu: $3{,}14\\cdot(25-9)=50{,}24$. $3{,}14\\cdot(5-3)^{2}$ okerra da.', 'Primero los cuadrados, luego la resta: $3{,}14\\cdot(25-9)=50{,}24$. $3{,}14\\cdot(5-3)^{2}$ es un error.', 'المربعات أولًا ثم الطرح: $3{,}14\\cdot(25-9)=50{,}24$. أما $3{,}14\\cdot(5-3)^{2}$ فخطأ.'),
        topic: 'sector-ring'
    }
]

export const figuresPractice: PracticeItem[] = [
    /* ---------- Polygons ---------- */
    {
        id: 1, stage: 'polygons',
        prompt: say('Zenbat diagonal ditu oktogono batek (8 alde)?', '¿Cuántas diagonales tiene un octógono (8 lados)?', 'كم قطرًا للمثمن (8 أضلاع)؟'),
        expected: n(20),
        hint: say('Erpin bakoitzetik $8-3$; gero zati bi.', 'De cada vértice, $8-3$; luego entre dos.', 'من كل رأس $8-3$؛ ثم على اثنين.'),
        explanation: same('$\\frac{8\\cdot 5}{2}=\\frac{40}{2}=20$')
    },
    {
        id: 2, stage: 'polygons',
        prompt: say('Zenbat egiten dute heptagono baten (7 alde) barne-angeluek? Idatzi gradu-kopurua.', '¿Cuánto suman los ángulos interiores de un heptágono (7 lados)? Escribe los grados.', 'كم مجموع الزوايا الداخلية للمسبع (7 أضلاع)؟ اكتب عدد الدرجات.'),
        expected: n(900),
        hint: say('$n-2$ triangelu.', '$n-2$ triángulos.', '$n-2$ مثلثات.'),
        explanation: same('$(7-2)\\cdot 180^{\\circ}=5\\cdot 180^{\\circ}=900^{\\circ}$')
    },
    {
        id: 3, stage: 'polygons',
        prompt: say('Lauki baten hiru angeluak $80^{\\circ}$, $95^{\\circ}$ eta $110^{\\circ}$ dira. Zenbat da laugarrena?', 'Tres ángulos de un cuadrilátero miden $80^{\\circ}$, $95^{\\circ}$ y $110^{\\circ}$. ¿Cuánto mide el cuarto?', 'ثلاث زوايا في رباعي قياساتها $80^{\\circ}$ و$95^{\\circ}$ و$110^{\\circ}$. كم قياس الرابعة؟'),
        expected: n(75),
        hint: say('Laukiaren angeluek $360^{\\circ}$ egiten dute.', 'Los ángulos del cuadrilátero suman $360^{\\circ}$.', 'مجموع زوايا الرباعي $360^{\\circ}$.'),
        explanation: same('$80^{\\circ}+95^{\\circ}+110^{\\circ}=285^{\\circ}\\ \\to\\ 360^{\\circ}-285^{\\circ}=75^{\\circ}$')
    },
    {
        id: 4, stage: 'polygons',
        prompt: say('Zenbat da oktogono erregular baten barne-angelua?', '¿Cuánto mide el ángulo interior de un octógono regular?', 'كم قياس الزاوية الداخلية للمثمن المنتظم؟'),
        expected: n(135),
        hint: say('Batura zati 8.', 'La suma entre 8.', 'المجموع على 8.'),
        explanation: same('$\\frac{(8-2)\\cdot 180^{\\circ}}{8}=\\frac{1080^{\\circ}}{8}=135^{\\circ}$')
    },

    /* ---------- Triangles ---------- */
    {
        id: 5, stage: 'triangles',
        prompt: say('Triangelu baten bi aldeak 5 cm eta 9 cm dira. Zein da hirugarren aldeak izan dezakeen luzera osorik handiena (cm)?', 'Dos lados de un triángulo miden 5 cm y 9 cm. ¿Cuál es la mayor longitud entera (en cm) que puede tener el tercero?', 'ضلعان في مثلث طولاهما 5 سم و9 سم. ما أكبر طول صحيح (بالسم) يمكن أن يكون للضلع الثالث؟'),
        expected: n(13),
        hint: say('Beste bien batura baino txikiagoa.', 'Menor que la suma de los otros dos.', 'أصغر من مجموع الآخرين.'),
        explanation: same('$x<5+9=14\\ \\to\\ x=13$')
    },
    {
        id: 6, stage: 'triangles',
        prompt: say('Triangelu isoszele baten angelu desberdina $50^{\\circ}$ da. Zenbat da oinarriko angelu bakoitza?', 'El ángulo desigual de un triángulo isósceles mide $50^{\\circ}$. ¿Cuánto mide cada ángulo de la base?', 'زاوية الرأس في مثلث متساوي الساقين $50^{\\circ}$. كم قياس كل زاوية من زاويتي القاعدة؟'),
        expected: n(65),
        hint: say('Kendu $180^{\\circ}$-ri eta zatitu bitan.', 'Réstalo de $180^{\\circ}$ y divide entre dos.', 'اطرحها من $180^{\\circ}$ واقسم على اثنين.'),
        explanation: same('$(180^{\\circ}-50^{\\circ})\\mathbin{:}2=130^{\\circ}\\mathbin{:}2=65^{\\circ}$')
    },
    {
        id: 7, stage: 'triangles',
        prompt: say('Triangelu isoszele baten oinarriko angelu bakoitza $72^{\\circ}$ da. Zenbat da angelu desberdina?', 'Cada ángulo de la base de un triángulo isósceles mide $72^{\\circ}$. ¿Cuánto mide el ángulo desigual?', 'كل زاوية من زاويتي القاعدة في مثلث متساوي الساقين $72^{\\circ}$. كم قياس زاوية الرأس؟'),
        expected: n(36),
        hint: say('Oinarriko bi angeluak berdinak dira.', 'Los dos ángulos de la base son iguales.', 'زاويتا القاعدة متساويتان.'),
        explanation: same('$180^{\\circ}-2\\cdot 72^{\\circ}=180^{\\circ}-144^{\\circ}=36^{\\circ}$')
    },
    {
        id: 8, stage: 'triangles',
        prompt: say('Triangelu angeluzuzen baten hipotenusa 10 cm da. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?', 'La hipotenusa de un triángulo rectángulo mide 10 cm. ¿Cuánto mide el radio de la circunferencia circunscrita?', 'وتر مثلث قائم 10 سم. كم نصف قطر الدائرة المحيطة؟'),
        expected: n(5),
        hint: say('Zirkunzentroa hipotenusaren erdian dago.', 'El circuncentro está en la mitad de la hipotenusa.', 'مركز الدائرة المحيطة في منتصف الوتر.'),
        explanation: same('$10\\mathbin{:}2=5$')
    },

    /* ---------- Quadrilaterals and symmetry ---------- */
    {
        id: 9, stage: 'quadrilaterals',
        prompt: say('Paralelogramo baten angelu bat $58^{\\circ}$ da. Zenbat da ondoko angelua?', 'Un ángulo de un paralelogramo mide $58^{\\circ}$. ¿Cuánto mide el ángulo consecutivo?', 'زاوية في متوازي أضلاع قياسها $58^{\\circ}$. كم قياس الزاوية المتتالية معها؟'),
        expected: n(122),
        hint: say('Ondoz ondokoek $180^{\\circ}$ egiten dute.', 'Los consecutivos suman $180^{\\circ}$.', 'مجموع المتتاليتين $180^{\\circ}$.'),
        explanation: same('$180^{\\circ}-58^{\\circ}=122^{\\circ}$')
    },
    {
        id: 10, stage: 'quadrilaterals',
        prompt: say('Trapezio isoszele batean, oinarri handiko angelu bakoitza $70^{\\circ}$ da. Zenbat da oinarri txikiko bakoitza?', 'En un trapecio isósceles, cada ángulo de la base mayor mide $70^{\\circ}$. ¿Cuánto mide cada uno de la base menor?', 'في شبه منحرف متساوي الساقين، كل زاوية من زاويتي القاعدة الكبرى $70^{\\circ}$. كم قياس كل زاوية من زاويتي القاعدة الصغرى؟'),
        expected: n(110),
        hint: say('Alde ez-paralelo bereko bi angeluek $180^{\\circ}$.', 'Los dos ángulos de un mismo lado no paralelo suman $180^{\\circ}$.', 'مجموع زاويتي الضلع غير الموازي نفسه $180^{\\circ}$.'),
        explanation: same('$180^{\\circ}-70^{\\circ}=110^{\\circ}$')
    },
    {
        id: 11, stage: 'quadrilaterals',
        prompt: say('Oktogono erregular batek 8 simetria-ardatz ditu. Zer angelu eratzen dute ondoz ondoko bik?', 'Un octógono regular tiene 8 ejes de simetría. ¿Qué ángulo forman dos contiguos?', 'للمثمن المنتظم 8 محاور تناظر. ما الزاوية بين محورين متجاورين؟'),
        expected: v('22,5'),
        hint: say('Ardatzek $180^{\\circ}$ banatzen dute.', 'Los ejes se reparten $180^{\\circ}$.', 'تتقاسم المحاور $180^{\\circ}$.'),
        explanation: same('$180^{\\circ}\\mathbin{:}8=22{,}5^{\\circ}$')
    },
    {
        id: 12, stage: 'quadrilaterals',
        prompt: say('Lauki baten angeluak $x$, $x$, $2x$ eta $2x$ dira. Zenbat da $x$?', 'Los ángulos de un cuadrilátero miden $x$, $x$, $2x$ y $2x$. ¿Cuánto vale $x$?', 'زوايا رباعي قياساتها $x$ و$x$ و$2x$ و$2x$. كم قيمة $x$؟'),
        expected: n(60),
        hint: say('Guztira $6x$, eta laukiaren angeluek $360^{\\circ}$.', 'En total $6x$, y los ángulos del cuadrilátero suman $360^{\\circ}$.', 'المجموع $6x$، ومجموع زوايا الرباعي $360^{\\circ}$.'),
        explanation: same('$6x=360^{\\circ}\\ \\to\\ x=360^{\\circ}\\mathbin{:}6=60^{\\circ}$')
    },

    /* ---------- Circles ---------- */
    {
        id: 13, stage: 'circles',
        prompt: say('Zuzen ukitzaile bat zirkunferentzia baten zentrotik 7 cm-ra dago. Zenbat da diametroa?', 'Una recta tangente a una circunferencia está a 7 cm del centro. ¿Cuánto mide el diámetro?', 'مستقيم مماس لدائرة يبعد عن مركزها 7 سم. كم طول القطر؟'),
        expected: n(14),
        hint: say('Ukitzailean $d=r$.', 'En la tangente, $d=r$.', 'في المماس $d=r$.'),
        explanation: same('$r=7\\ \\to\\ 2\\cdot 7=14$')
    },
    {
        id: 14, stage: 'circles',
        prompt: say('5 cm eta 3 cm-ko erradioak dituzten bi zirkunferentzia kanpotik ukitzaileak dira. Zer distantziara daude zentroak?', 'Dos circunferencias de radios 5 cm y 3 cm son tangentes exteriores. ¿A qué distancia están sus centros?', 'دائرتان نصفا قطريهما 5 سم و3 سم متماستان من الخارج. كم البعد بين مركزيهما؟'),
        expected: n(8),
        hint: say('Kanpotik ukitzaileak: $d=r_1+r_2$.', 'Tangentes exteriores: $d=r_1+r_2$.', 'متماستان من الخارج: $d=r_1+r_2$.'),
        explanation: same('$5+3=8$')
    },
    {
        id: 15, stage: 'circles',
        prompt: say('9 cm eta 4 cm-ko erradioak dituzten bi zirkunferentzia barrutik ukitzaileak dira. Zer distantziara daude zentroak?', 'Dos circunferencias de radios 9 cm y 4 cm son tangentes interiores. ¿A qué distancia están sus centros?', 'دائرتان نصفا قطريهما 9 سم و4 سم متماستان من الداخل. كم البعد بين مركزيهما؟'),
        expected: n(5),
        hint: say('Barrutik ukitzaileak: $d=r_1-r_2$.', 'Tangentes interiores: $d=r_1-r_2$.', 'متماستان من الداخل: $d=r_1-r_2$.'),
        explanation: same('$9-4=5$')
    },
    {
        id: 16, stage: 'circles',
        prompt: say('Angelu zentral bat $140^{\\circ}$ da. Zenbat da arku bera hartzen duen angelu inskribatua?', 'Un ángulo central mide $140^{\\circ}$. ¿Cuánto mide un ángulo inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها $140^{\\circ}$. كم قياس الزاوية المحيطية التي تحصر القوس نفسه؟'),
        expected: n(70),
        hint: say('Inskribatua zentralaren erdia da.', 'El inscrito es la mitad del central.', 'المحيطية نصف المركزية.'),
        explanation: same('$140^{\\circ}\\mathbin{:}2=70^{\\circ}$')
    },

    /* ---------- Areas ---------- */
    {
        id: 17, stage: 'areas',
        prompt: say('12 cm × 8 cm-ko ohol batek 3 cm-ko aldeko zulo karratu bat du. Zein da oholaren azalera (cm²)?', 'Una tabla de 12 cm × 8 cm tiene un agujero cuadrado de 3 cm de lado. ¿Cuál es el área de la tabla (cm²)?', 'لوح أبعاده 12 سم × 8 سم فيه ثقب مربع طول ضلعه 3 سم. ما مساحة اللوح (سم²)؟'),
        expected: n(87),
        hint: say('Ohola osoa ken zuloa.', 'La tabla entera menos el agujero.', 'اللوح كاملًا ناقص الثقب.'),
        explanation: same('$12\\cdot 8-3\\cdot 3=96-9=87$')
    },
    {
        id: 18, stage: 'areas',
        prompt: say('Kalkulatu 6 cm-ko erradioa eta $60^{\\circ}$-ko angelua dituen sektorearen azalera ($\\pi\\approx 3{,}14$).', 'Calcula el área de un sector de 6 cm de radio y $60^{\\circ}$ ($\\pi\\approx 3{,}14$).', 'احسب مساحة قطاع نصف قطره 6 سم وزاويته $60^{\\circ}$ ($\\pi\\approx 3{,}14$).'),
        expected: v('18,84'),
        hint: say('$60^{\\circ}$ zirkuluaren seirena da.', '$60^{\\circ}$ es la sexta parte del círculo.', '$60^{\\circ}$ سدس القرص.'),
        explanation: same('$\\frac{3{,}14\\cdot 6^{2}\\cdot 60}{360}=\\frac{113{,}04}{6}=18{,}84$')
    },
    {
        id: 19, stage: 'areas',
        prompt: say('Kalkulatu 10 cm eta 6 cm-ko erradioak dituen koroa zirkularraren azalera ($\\pi\\approx 3{,}14$).', 'Calcula el área de la corona circular de radios 10 cm y 6 cm ($\\pi\\approx 3{,}14$).', 'احسب مساحة الحلقة الدائرية التي نصفا قطريها 10 سم و6 سم ($\\pi\\approx 3{,}14$).'),
        expected: v('200,96'),
        hint: say('$\\pi\\cdot(R^{2}-r^{2})$: lehenik karratuak.', '$\\pi\\cdot(R^{2}-r^{2})$: primero los cuadrados.', '$\\pi\\cdot(R^{2}-r^{2})$: المربعات أولًا.'),
        explanation: same('$3{,}14\\cdot(10^{2}-6^{2})=3{,}14\\cdot 64=200{,}96$')
    },
    {
        id: 20, stage: 'areas',
        prompt: say('12 m × 9 m-ko lorategi bat hesiz inguratu nahi da. Metro bakoitzak 5 € balio du. Zenbat balio du hesiak?', 'Se quiere vallar un jardín de 12 m × 9 m. Cada metro de valla cuesta 5 €. ¿Cuánto cuesta la valla?', 'نريد إحاطة حديقة 12 م × 9 م بسياج. ثمن المتر 5 €. كم ثمن السياج؟'),
        expected: n(210),
        hint: say('Inguratu: perimetroa.', 'Rodear: perímetro.', 'الإحاطة: المحيط.'),
        explanation: same('$2\\cdot 12+2\\cdot 9=42\\ \\to\\ 42\\cdot 5=210$')
    }
]

export const figuresChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'polygons', points: 10, context: 'starter',
        prompt: say('Zenbat diagonal ditu dekagono batek (10 alde)?', '¿Cuántas diagonales tiene un decágono (10 lados)?', 'كم قطرًا للمعشّر (10 أضلاع)؟'),
        expected: n(35),
        hint: say('$\\frac{n\\cdot(n-3)}{2}$ eta $n=10$.', '$\\frac{n\\cdot(n-3)}{2}$ con $n=10$.', '$\\frac{n\\cdot(n-3)}{2}$ مع $n=10$.'),
        explanation: same('$\\frac{10\\cdot 7}{2}=\\frac{70}{2}=35$')
    },
    {
        id: 102, stage: 'polygons', points: 20, context: 'advanced',
        prompt: say('Poligono batek 14 diagonal ditu. Zenbat alde ditu?', 'Un polígono tiene 14 diagonales. ¿Cuántos lados tiene?', 'لمضلع 14 قطرًا. كم ضلعًا له؟'),
        expected: n(7),
        hint: say('Probatu: hexagonoak 9 ditu, eta hurrengoak?', 'Prueba: el hexágono tiene 9, ¿y el siguiente?', 'جرّب: للمسدس 9، فماذا عن التالي؟'),
        explanation: same('$\\frac{7\\cdot 4}{2}=\\frac{28}{2}=14$')
    },
    {
        id: 103, stage: 'polygons', points: 30, context: 'advanced',
        prompt: say('Poligono baten barne-angeluek $1440^{\\circ}$ egiten dute. Zenbat alde ditu?', 'Los ángulos interiores de un polígono suman $1440^{\\circ}$. ¿Cuántos lados tiene?', 'مجموع الزوايا الداخلية لمضلع $1440^{\\circ}$. كم ضلعًا له؟'),
        expected: n(10),
        hint: say('Zenbat triangelu dira? Gehitu 2.', '¿Cuántos triángulos son? Suma 2.', 'كم مثلثًا؟ أضف 2.'),
        explanation: same('$1440^{\\circ}\\mathbin{:}180^{\\circ}=8\\ \\to\\ n=8+2=10$')
    },
    {
        id: 104, stage: 'triangles', points: 10, context: 'starter',
        prompt: say('Triangelu isoszele baten angelu desberdina zuzena da ($90^{\\circ}$). Zenbat da oinarriko bakoitza?', 'El ángulo desigual de un triángulo isósceles es recto ($90^{\\circ}$). ¿Cuánto mide cada ángulo de la base?', 'زاوية الرأس في مثلث متساوي الساقين قائمة ($90^{\\circ}$). كم قياس كل زاوية من زاويتي القاعدة؟'),
        expected: n(45),
        hint: say('$(180^{\\circ}-90^{\\circ})\\mathbin{:}2$.', '$(180^{\\circ}-90^{\\circ})\\mathbin{:}2$.', '$(180^{\\circ}-90^{\\circ})\\mathbin{:}2$.'),
        explanation: same('$(180^{\\circ}-90^{\\circ})\\mathbin{:}2=90^{\\circ}\\mathbin{:}2=45^{\\circ}$')
    },
    {
        id: 105, stage: 'triangles', points: 20, context: 'advanced',
        prompt: say('Triangelu baten bi aldeak 4 cm eta 10 cm dira. Zein da hirugarrenaren luzera osorik txikiena (cm)?', 'Dos lados de un triángulo miden 4 cm y 10 cm. ¿Cuál es la menor longitud entera (en cm) del tercero?', 'ضلعان في مثلث طولاهما 4 سم و10 سم. ما أصغر طول صحيح (بالسم) للضلع الثالث؟'),
        expected: n(7),
        hint: say('10 cm-koa alde handiena bada, beste biek 10 baino gehiago batu behar dute.', 'Si el de 10 cm es el mayor, los otros dos tienen que sumar más de 10.', 'إذا كان ضلع 10 سم هو الأكبر فيجب أن يزيد مجموع الآخرين على 10.'),
        explanation: same('$x>10-4=6\\ \\to\\ x=7$')
    },
    {
        id: 106, stage: 'triangles', points: 30, context: 'advanced',
        prompt: say('Triangelu angeluzuzen baten katetoak 6 cm eta 8 cm dira. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?', 'Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. ¿Cuánto mide el radio de la circunferencia circunscrita?', 'الضلعان القائمان في مثلث قائم 6 سم و8 سم. كم نصف قطر الدائرة المحيطة؟'),
        expected: n(5),
        hint: say('Pitagorasekin hipotenusa; erradioa haren erdia.', 'Con Pitágoras, la hipotenusa; el radio es la mitad.', 'بفيثاغورس الوتر؛ ونصف القطر نصفه.'),
        explanation: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10\\ \\to\\ 10\\mathbin{:}2=5$')
    },
    {
        id: 107, stage: 'quadrilaterals', points: 10, context: 'starter',
        prompt: say('Erronbo baten angelu bat $75^{\\circ}$ da. Zenbat da ondoko angelua?', 'Un ángulo de un rombo mide $75^{\\circ}$. ¿Cuánto mide el consecutivo?', 'زاوية في معيّن قياسها $75^{\\circ}$. كم قياس المتتالية معها؟'),
        expected: n(105),
        hint: say('Erronboa paralelogramoa da.', 'El rombo es un paralelogramo.', 'المعيّن متوازي أضلاع.'),
        explanation: same('$180^{\\circ}-75^{\\circ}=105^{\\circ}$')
    },
    {
        id: 108, stage: 'quadrilaterals', points: 20, context: 'advanced',
        prompt: say('Zer angelu eratzen dute dodekagono erregular baten (12 alde) ondoz ondoko bi simetria-ardatzek?', '¿Qué ángulo forman dos ejes de simetría contiguos de un dodecágono regular (12 lados)?', 'ما الزاوية بين محوري تناظر متجاورين في المضلع المنتظم ذي 12 ضلعًا؟'),
        expected: n(15),
        hint: say('12 ardatz, $180^{\\circ}$ banatzen.', '12 ejes repartiendo $180^{\\circ}$.', '12 محورًا تتقاسم $180^{\\circ}$.'),
        explanation: same('$180^{\\circ}\\mathbin{:}12=15^{\\circ}$')
    },
    {
        id: 109, stage: 'quadrilaterals', points: 30, context: 'advanced',
        prompt: say('Trapezio isoszele batean, oinarri txikiko angelua oinarri handikoaren bikoitza da. Zenbat da oinarri handiko angelua?', 'En un trapecio isósceles, el ángulo de la base menor es el doble que el de la base mayor. ¿Cuánto mide el de la base mayor?', 'في شبه منحرف متساوي الساقين، زاوية القاعدة الصغرى ضعف زاوية القاعدة الكبرى. كم قياس زاوية القاعدة الكبرى؟'),
        expected: n(60),
        hint: say('Alde ez-paralelo bereko bi angeluek $180^{\\circ}$: $x+2x$.', 'Los dos ángulos de un lado no paralelo suman $180^{\\circ}$: $x+2x$.', 'مجموع زاويتي الضلع غير الموازي $180^{\\circ}$: $x+2x$.'),
        explanation: same('$x+2x=3x=180^{\\circ}\\ \\to\\ x=180^{\\circ}\\mathbin{:}3=60^{\\circ}$')
    },
    {
        id: 110, stage: 'circles', points: 10, context: 'starter',
        prompt: say('8 cm eta 5 cm-ko erradioak dituzten bi zirkunferentzia kanpotik ukitzaileak dira. Zer distantziara daude zentroak?', 'Dos circunferencias de radios 8 cm y 5 cm son tangentes exteriores. ¿A qué distancia están sus centros?', 'دائرتان نصفا قطريهما 8 سم و5 سم متماستان من الخارج. كم البعد بين مركزيهما؟'),
        expected: n(13),
        hint: say('$d=r_1+r_2$.', '$d=r_1+r_2$.', '$d=r_1+r_2$.'),
        explanation: same('$8+5=13$')
    },
    {
        id: 111, stage: 'circles', points: 30, context: 'advanced',
        prompt: say('Zirkunferentzia batean inskribatutako triangelu baten alde bat diametroa da. Beste angelu bat $35^{\\circ}$ da. Zenbat da hirugarrena?', 'Un triángulo inscrito en una circunferencia tiene un lado que es un diámetro. Otro ángulo mide $35^{\\circ}$. ¿Cuánto mide el tercero?', 'مثلث محاط بدائرة أحد أضلاعه قطر. وزاوية أخرى فيه $35^{\\circ}$. كم قياس الثالثة؟'),
        expected: n(55),
        hint: say('Diametroaren gaineko angelu inskribatua zuzena da.', 'El ángulo inscrito que abarca el diámetro es recto.', 'الزاوية المحيطية التي تحصر القطر قائمة.'),
        explanation: same('$180^{\\circ}-90^{\\circ}-35^{\\circ}=55^{\\circ}$')
    },
    {
        id: 112, stage: 'circles', points: 20, context: 'advanced',
        prompt: say('Zuzen bat 15 cm-ko erradioko zirkunferentzia baten zentrotik 9 cm-ra pasatzen da. Zenbat da sortzen duen korda?', 'Una recta pasa a 9 cm del centro de una circunferencia de 15 cm de radio. ¿Cuánto mide la cuerda que determina?', 'يمر مستقيم على بعد 9 سم من مركز دائرة نصف قطرها 15 سم. كم طول الوتر الذي يحدده؟'),
        expected: n(24),
        hint: say('Erradioa, distantzia eta kordaren erdia: triangelu angeluzuzena.', 'Radio, distancia y media cuerda: un triángulo rectángulo.', 'نصف القطر والبعد ونصف الوتر: مثلث قائم.'),
        explanation: same('$\\sqrt{15^{2}-9^{2}}=\\sqrt{144}=12\\ \\to\\ 2\\cdot 12=24$')
    },
    {
        id: 113, stage: 'areas', points: 20, context: 'advanced',
        prompt: say('Kalkulatu 9 cm-ko erradioko zirkunferentzia baten $120^{\\circ}$-ko arkuaren luzera ($\\pi\\approx 3{,}14$).', 'Calcula la longitud de un arco de $120^{\\circ}$ en una circunferencia de 9 cm de radio ($\\pi\\approx 3{,}14$).', 'احسب طول قوس $120^{\\circ}$ في دائرة نصف قطرها 9 سم ($\\pi\\approx 3{,}14$).'),
        expected: v('18,84'),
        hint: say('$120^{\\circ}$ zirkunferentziaren herena da.', '$120^{\\circ}$ es un tercio de la circunferencia.', '$120^{\\circ}$ ثلث الدائرة.'),
        explanation: same('$\\frac{2\\cdot 3{,}14\\cdot 9\\cdot 120}{360}=\\frac{56{,}52}{3}=18{,}84$')
    },
    {
        id: 114, stage: 'areas', points: 30, context: 'advanced',
        prompt: say('10 cm-ko aldeko karratu batean zirkulu bat inskribatu da. Zein da karratuaren eta zirkuluaren arteko azalera (lau izkinak)? ($\\pi\\approx 3{,}14$)', 'En un cuadrado de 10 cm de lado se inscribe un círculo. ¿Cuál es el área entre el cuadrado y el círculo (las cuatro esquinas)? ($\\pi\\approx 3{,}14$)', 'رُسم قرص داخل مربع طول ضلعه 10 سم. ما المساحة بين المربع والقرص (الأركان الأربعة)؟ ($\\pi\\approx 3{,}14$)'),
        expected: v('21,5'),
        hint: say('Zirkuluaren erradioa aldearen erdia da.', 'El radio del círculo es la mitad del lado.', 'نصف قطر القرص نصف الضلع.'),
        explanation: same('$10^{2}-3{,}14\\cdot 5^{2}=100-78{,}5=21{,}5$')
    }
]

export const figuresExerciseBank: ExerciseSection[] = [
    {
        id: 'polygons',
        title: say('Poligonoak: diagonalak eta angeluak', 'Polígonos: diagonales y ángulos', 'المضلعات: الأقطار والزوايا'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zenbat diagonal ateratzen dira heptagono baten erpin batetik?', '¿Cuántas diagonales salen de un vértice de un heptágono?', 'كم قطرًا يخرج من رأس واحد في المسبع؟'), solution: same('$7-3=4$'), answer: { expected: n(4) } },
            { id: 2, difficulty: 'easy', question: say('Zenbat diagonal ditu heptagono batek guztira?', '¿Cuántas diagonales tiene un heptágono en total?', 'كم قطرًا للمسبع في المجموع؟'), solution: same('$\\frac{7\\cdot 4}{2}=\\frac{28}{2}=14$'), answer: { expected: n(14) } },
            { id: 3, difficulty: 'easy', question: say('Zenbat egiten dute pentagono baten barne-angeluek?', '¿Cuánto suman los ángulos interiores de un pentágono?', 'كم مجموع الزوايا الداخلية للمخمس؟'), solution: same('$(5-2)\\cdot 180^{\\circ}=540^{\\circ}$'), answer: { expected: n(540) } },
            { id: 4, difficulty: 'medium', question: say('Osatu taula: 3, 4, 5, 6, 7 eta 8 aldeko poligonoen diagonal kopurua.', 'Completa la tabla: número de diagonales de los polígonos de 3, 4, 5, 6, 7 y 8 lados.', 'أكمل الجدول: عدد أقطار المضلعات ذات 3 و4 و5 و6 و7 و8 أضلاع.'), solution: say('0, 2, 5, 9, 14 eta 20. Aldea gehitzean, diagonal gehiago gehitzen dira: +2, +3, +4, +5, +6.', '0, 2, 5, 9, 14 y 20. Al añadir un lado, se añaden cada vez más: +2, +3, +4, +5, +6.', '0 و2 و5 و9 و14 و20. وكلما أُضيف ضلع زادت الأقطار أكثر: +2، +3، +4، +5، +6.') },
            { id: 5, difficulty: 'medium', question: say('Zenbat da dekagono erregular baten barne-angelua?', '¿Cuánto mide el ángulo interior de un decágono regular?', 'كم قياس الزاوية الداخلية للمعشّر المنتظم؟'), solution: same('$\\frac{(10-2)\\cdot 180^{\\circ}}{10}=\\frac{1440^{\\circ}}{10}=144^{\\circ}$'), answer: { expected: n(144) } },
            { id: 6, difficulty: 'medium', question: say('Zenbat da pentagono erregular baten angelu zentrala?', '¿Cuánto mide el ángulo central de un pentágono regular?', 'كم قياس الزاوية المركزية للمخمس المنتظم؟'), solution: same('$360^{\\circ}\\mathbin{:}5=72^{\\circ}$'), answer: { expected: n(72) } },
            { id: 7, difficulty: 'medium', question: say('Hexagono baten bost angelu $100^{\\circ}$, $120^{\\circ}$, $130^{\\circ}$, $140^{\\circ}$ eta $110^{\\circ}$ dira. Zenbat da seigarrena?', 'Cinco ángulos de un hexágono miden $100^{\\circ}$, $120^{\\circ}$, $130^{\\circ}$, $140^{\\circ}$ y $110^{\\circ}$. ¿Cuánto mide el sexto?', 'خمس زوايا في مسدس قياساتها $100^{\\circ}$ و$120^{\\circ}$ و$130^{\\circ}$ و$140^{\\circ}$ و$110^{\\circ}$. كم قياس السادسة؟'), solution: same('$720^{\\circ}-(100^{\\circ}+120^{\\circ}+130^{\\circ}+140^{\\circ}+110^{\\circ})=720^{\\circ}-600^{\\circ}=120^{\\circ}$'), answer: { expected: n(120) } },
            { id: 8, difficulty: 'hard', question: say('Oktogono erregularrek bakarrik ezin dute zorua lauzatu. Zergatik? Eta oktogonoak eta karratuak nahastuta?', 'Los octógonos regulares solos no pueden embaldosar el suelo. ¿Por qué? ¿Y mezclando octógonos y cuadrados?', 'لا تستطيع المثمنات المنتظمة وحدها تبليط الأرض. لماذا؟ وماذا لو خلطنا مثمنات ومربعات؟'), solution: say('$135^{\\circ}$-k ez du $360^{\\circ}$ zatitzen. Bi oktogono eta karratu bat bai: $135^{\\circ}+135^{\\circ}+90^{\\circ}=360^{\\circ}$.', '$135^{\\circ}$ no divide a $360^{\\circ}$. Dos octógonos y un cuadrado, sí: $135^{\\circ}+135^{\\circ}+90^{\\circ}=360^{\\circ}$.', '$135^{\\circ}$ لا تقسم $360^{\\circ}$. أما مثمنان ومربع فنعم: $135^{\\circ}+135^{\\circ}+90^{\\circ}=360^{\\circ}$.') },
            { id: 9, difficulty: 'hard', question: say('Zein poligono erregularrek du $40^{\\circ}$-ko angelu zentrala? Idatzi alde kopurua.', '¿Qué polígono regular tiene un ángulo central de $40^{\\circ}$? Escribe el número de lados.', 'أي مضلع منتظم زاويته المركزية $40^{\\circ}$؟ اكتب عدد الأضلاع.'), solution: say('$360^{\\circ}\\mathbin{:}40^{\\circ}=9$: eneagonoa.', '$360^{\\circ}\\mathbin{:}40^{\\circ}=9$: el eneágono.', '$360^{\\circ}\\mathbin{:}40^{\\circ}=9$: المتسع.'), answer: { expected: n(9) } },
            { id: 10, difficulty: 'hard', question: say('Poligono baten barne-angeluek $1260^{\\circ}$ egiten dute. Zenbat alde ditu?', 'Los ángulos interiores de un polígono suman $1260^{\\circ}$. ¿Cuántos lados tiene?', 'مجموع الزوايا الداخلية لمضلع $1260^{\\circ}$. كم ضلعًا له؟'), solution: same('$1260^{\\circ}\\mathbin{:}180^{\\circ}=7\\ \\to\\ n=7+2=9$'), answer: { expected: n(9) } }
        ]
    },
    {
        id: 'triangles',
        title: say('Triangeluak', 'Triángulos', 'المثلثات'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Triangelu bat eraiki daiteke 5, 6 eta 12 cm-ko zuzenkiekin?', '¿Se puede construir un triángulo con segmentos de 5, 6 y 12 cm?', 'هل يمكن إنشاء مثلث بقطع أطوالها 5 و6 و12 سم؟'), solution: say('Ez: $5+6=11$, eta 12 handiagoa da.', 'No: $5+6=11$, y 12 es mayor.', 'لا: $5+6=11$، و12 أكبر.') },
            { id: 12, difficulty: 'easy', question: say('Eta 6, 6 eta 3 cm-koekin?', '¿Y con 6, 6 y 3 cm?', 'وبقطع 6 و6 و3 سم؟'), solution: say('Bai: $6<6+3=9$. Isoszelea da.', 'Sí: $6<6+3=9$. Es isósceles.', 'نعم: $6<6+3=9$. إنه متساوي الساقين.') },
            { id: 13, difficulty: 'easy', question: say('Zenbat da triangelu aldeberdin baten angelu bakoitza, 2 cm-koa edo 2 km-koa izan?', '¿Cuánto mide cada ángulo de un triángulo equilátero, sea de 2 cm o de 2 km?', 'كم قياس كل زاوية في مثلث متساوي الأضلاع، سواء كان ضلعه 2 سم أو 2 كم؟'), solution: same('$180^{\\circ}\\mathbin{:}3=60^{\\circ}$'), answer: { expected: n(60) } },
            { id: 14, difficulty: 'medium', question: say('Triangelu isoszele baten angelu desberdina $30^{\\circ}$ da. Zenbat da oinarriko bakoitza?', 'El ángulo desigual de un triángulo isósceles mide $30^{\\circ}$. ¿Cuánto mide cada ángulo de la base?', 'زاوية الرأس في مثلث متساوي الساقين $30^{\\circ}$. كم قياس كل زاوية من زاويتي القاعدة؟'), solution: same('$(180^{\\circ}-30^{\\circ})\\mathbin{:}2=150^{\\circ}\\mathbin{:}2=75^{\\circ}$'), answer: { expected: n(75) } },
            { id: 15, difficulty: 'medium', question: say('Triangelu baten aldeak $a=7$, $b=5$ eta $c=8$ cm dira. Ordenatu haien angeluak txikienetik handienera.', 'Los lados de un triángulo miden $a=7$, $b=5$ y $c=8$ cm. Ordena sus ángulos de menor a mayor.', 'أضلاع مثلث $a=7$ و$b=5$ و$c=8$ سم. رتّب زواياه من الأصغر إلى الأكبر.'), solution: same('$b<a<c\\ \\to\\ \\hat{B}<\\hat{A}<\\hat{C}$') },
            { id: 16, difficulty: 'medium', question: say('Triangelu baten bi angeluak $95^{\\circ}$ eta $88^{\\circ}$ izan daitezke?', '¿Pueden medir $95^{\\circ}$ y $88^{\\circ}$ dos ángulos de un triángulo?', 'هل يمكن أن تكون زاويتان في مثلث $95^{\\circ}$ و$88^{\\circ}$؟'), solution: say('Ez: $95^{\\circ}+88^{\\circ}=183^{\\circ}$, $180^{\\circ}$ baino gehiago.', 'No: $95^{\\circ}+88^{\\circ}=183^{\\circ}$, más de $180^{\\circ}$.', 'لا: $95^{\\circ}+88^{\\circ}=183^{\\circ}$، أكثر من $180^{\\circ}$.') },
            { id: 17, difficulty: 'medium', question: say('Non dago triangelu angeluzuzen baten ortozentroa? Eta angelu-kamutsarena?', '¿Dónde está el ortocentro de un triángulo rectángulo? ¿Y el de un obtusángulo?', 'أين يقع ملتقى ارتفاعات مثلث قائم؟ ومثلث منفرج؟'), solution: say('Angeluzuzenean, angelu zuzeneko erpinean. Angelu-kamutsean, triangeluaren kanpoan.', 'En el rectángulo, en el vértice del ángulo recto. En el obtusángulo, fuera del triángulo.', 'في القائم عند رأس الزاوية القائمة. وفي المنفرج خارج المثلث.') },
            { id: 18, difficulty: 'hard', question: say('Triangelu isoszele baten oinarriko angelu bat $40^{\\circ}$ da. Angelu-zorrotza, angeluzuzena ala angelu-kamutsa da?', 'Un ángulo de la base de un triángulo isósceles mide $40^{\\circ}$. ¿Es acutángulo, rectángulo u obtusángulo?', 'زاوية القاعدة في مثلث متساوي الساقين $40^{\\circ}$. أهو حاد أم قائم أم منفرج؟'), solution: say('Angelu desberdina: $180^{\\circ}-2\\cdot 40^{\\circ}=100^{\\circ}$. Angelu-kamutsa da.', 'El ángulo desigual: $180^{\\circ}-2\\cdot 40^{\\circ}=100^{\\circ}$. Es obtusángulo.', 'زاوية الرأس: $180^{\\circ}-2\\cdot 40^{\\circ}=100^{\\circ}$. إنه منفرج الزاوية.') },
            { id: 19, difficulty: 'hard', question: say('Triangelu angeluzuzen baten katetoak 5 cm eta 12 cm dira. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?', 'Los catetos de un triángulo rectángulo miden 5 cm y 12 cm. ¿Cuánto mide el radio de la circunferencia circunscrita?', 'الضلعان القائمان في مثلث قائم 5 سم و12 سم. كم نصف قطر الدائرة المحيطة؟'), solution: same('$\\sqrt{5^{2}+12^{2}}=\\sqrt{169}=13\\ \\to\\ 13\\mathbin{:}2=6{,}5$'), answer: { expected: v('6,5') } },
            { id: 20, difficulty: 'hard', question: say('Triangelu baten bi aldeak 3 cm eta 8 cm dira. Zein balio oso izan ditzake hirugarrenak?', 'Dos lados de un triángulo miden 3 cm y 8 cm. ¿Qué valores enteros puede tomar el tercero?', 'ضلعان في مثلث 3 سم و8 سم. ما القيم الصحيحة الممكنة للضلع الثالث؟'), solution: say('$8-3<x<8+3$: 6, 7, 8, 9 edo 10 cm.', '$8-3<x<8+3$: 6, 7, 8, 9 o 10 cm.', '$8-3<x<8+3$: 6 أو 7 أو 8 أو 9 أو 10 سم.') }
        ]
    },
    {
        id: 'quadrilaterals',
        title: say('Laukiak eta simetria', 'Cuadriláteros y simetría', 'الرباعيات والتناظر'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Paralelogramo baten angelu bat $80^{\\circ}$ da. Zenbat dira besteak?', 'Un ángulo de un paralelogramo mide $80^{\\circ}$. ¿Cuánto miden los otros?', 'زاوية في متوازي أضلاع $80^{\\circ}$. كم قياس الأخريات؟'), solution: say('Aurkakoa $80^{\\circ}$, eta ondokoak $180^{\\circ}-80^{\\circ}=100^{\\circ}$.', 'El opuesto, $80^{\\circ}$, y los consecutivos, $180^{\\circ}-80^{\\circ}=100^{\\circ}$.', 'المقابلة $80^{\\circ}$، والمتتاليتان $180^{\\circ}-80^{\\circ}=100^{\\circ}$.') },
            { id: 22, difficulty: 'easy', question: say('Zenbat simetria-ardatz ditu: a) laukizuzenak; b) erronboak; c) karratuak; d) erronboideak?', '¿Cuántos ejes de simetría tiene: a) el rectángulo; b) el rombo; c) el cuadrado; d) el romboide?', 'كم محور تناظر لـ: أ) المستطيل؛ ب) المعيّن؛ ج) المربع؛ د) متوازي الأضلاع العادي؟'), solution: say('a) 2; b) 2; c) 4; d) bat ere ez.', 'a) 2; b) 2; c) 4; d) ninguno.', 'أ) 2؛ ب) 2؛ ج) 4؛ د) لا شيء.') },
            { id: 23, difficulty: 'easy', question: say('Zein laukik ditu diagonal perpendikularrak paralelogramoa izan gabe?', '¿Qué cuadrilátero tiene las diagonales perpendiculares sin ser paralelogramo?', 'أي رباعي قطراه متعامدان دون أن يكون متوازي أضلاع؟'), solution: say('Kometak (trapezoide bat).', 'La cometa (un trapezoide).', 'الطائرة الورقية (رباعي عام).') },
            { id: 24, difficulty: 'medium', question: say('Lauki baten hiru angeluak $90^{\\circ}$, $90^{\\circ}$ eta $60^{\\circ}$ dira. Zenbat da laugarrena?', 'Tres ángulos de un cuadrilátero miden $90^{\\circ}$, $90^{\\circ}$ y $60^{\\circ}$. ¿Cuánto mide el cuarto?', 'ثلاث زوايا في رباعي $90^{\\circ}$ و$90^{\\circ}$ و$60^{\\circ}$. كم قياس الرابعة؟'), solution: same('$360^{\\circ}-(90^{\\circ}+90^{\\circ}+60^{\\circ})=360^{\\circ}-240^{\\circ}=120^{\\circ}$'), answer: { expected: n(120) } },
            { id: 25, difficulty: 'medium', question: say('Trapezio angeluzuzen baten angelu kamutsa $125^{\\circ}$ da. Zenbat da zorrotza?', 'El ángulo obtuso de un trapecio rectángulo mide $125^{\\circ}$. ¿Cuánto mide el agudo?', 'الزاوية المنفرجة في شبه منحرف قائم $125^{\\circ}$. كم قياس الحادة؟'), solution: same('$180^{\\circ}-125^{\\circ}=55^{\\circ}$'), answer: { expected: n(55) } },
            { id: 26, difficulty: 'medium', question: say('Bi zuzenki berdin erdian gurutzatu dira, perpendikularrak izan gabe. Muturrak lotuz gero, zer lauki sortzen da? Eta perpendikularrak balira?', 'Dos segmentos iguales se cortan en su punto medio sin ser perpendiculares. Al unir sus extremos, ¿qué cuadrilátero sale? ¿Y si fueran perpendiculares?', 'قطعتان متساويتان تتقاطعان في منتصفيهما دون تعامد. إذا وصلنا أطرافهما فأي رباعي ينتج؟ وإذا كانتا متعامدتين؟'), solution: say('Laukizuzena (diagonal berdinak). Perpendikularrak badira, karratua.', 'Un rectángulo (diagonales iguales). Si son perpendiculares, un cuadrado.', 'مستطيل (قطران متساويان). وإذا كانتا متعامدتين، مربع.') },
            { id: 27, difficulty: 'medium', question: say('Zer angelu eratzen dute hexagono erregular baten ondoz ondoko bi simetria-ardatzek?', '¿Qué ángulo forman dos ejes de simetría contiguos de un hexágono regular?', 'ما الزاوية بين محوري تناظر متجاورين في المسدس المنتظم؟'), solution: same('$180^{\\circ}\\mathbin{:}6=30^{\\circ}$'), answer: { expected: n(30) } },
            { id: 28, difficulty: 'hard', question: say('Erronboide baten angelu bat ondokoa baino $30^{\\circ}$ handiagoa da. Zenbat da txikiena?', 'Un ángulo de un romboide mide $30^{\\circ}$ más que su consecutivo. ¿Cuánto mide el menor?', 'زاوية في متوازي أضلاع أكبر من المتتالية معها بـ$30^{\\circ}$. كم قياس الصغرى؟'), solution: same('$x+x+30^{\\circ}=180^{\\circ}\\ \\to\\ 2x=150^{\\circ}\\ \\to\\ x=75^{\\circ}$'), answer: { expected: n(75) } },
            { id: 29, difficulty: 'hard', question: say('Egia ala gezurra? a) Karratu oro erronboa da. b) Erronbo oro karratua da. c) Laukizuzen oro paralelogramoa da.', '¿Verdadero o falso? a) Todo cuadrado es un rombo. b) Todo rombo es un cuadrado. c) Todo rectángulo es un paralelogramo.', 'صواب أم خطأ؟ أ) كل مربع معيّن. ب) كل معيّن مربع. ج) كل مستطيل متوازي أضلاع.'), solution: say('a) Egia: lau alde berdin ditu. b) Gezurra: erronboaren angeluak ez dira zertan zuzenak izan. c) Egia.', 'a) Verdadero: tiene cuatro lados iguales. b) Falso: los ángulos del rombo no tienen por qué ser rectos. c) Verdadero.', 'أ) صواب: له أربعة أضلاع متساوية. ب) خطأ: زوايا المعيّن ليست قائمة بالضرورة. ج) صواب.') },
            { id: 30, difficulty: 'hard', question: say('Zenbat simetria-ardatz dituzte H, A, F eta O letrek?', '¿Cuántos ejes de simetría tienen las letras H, A, F y O?', 'كم محور تناظر للحروف H وA وF وO؟'), solution: say('H: 2; A: 1; F: bat ere ez; O (zirkulua bada): infinitu.', 'H: 2; A: 1; F: ninguno; O (si es un círculo): infinitos.', 'H: 2؛ A: 1؛ F: لا شيء؛ O (إذا كانت دائرة): عدد لا نهائي.') }
        ]
    },
    {
        id: 'circles',
        title: say('Zirkunferentzia eta posizioak', 'Circunferencia y posiciones', 'الدائرة والأوضاع'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zirkunferentzia baten erradioa 4 cm da, eta zuzen bat zentrotik 4 cm-ra dago. Nolakoa da zuzena?', 'Una circunferencia tiene 4 cm de radio y una recta está a 4 cm del centro. ¿Cómo es la recta?', 'نصف قطر دائرة 4 سم ومستقيم يبعد عن المركز 4 سم. كيف المستقيم؟'), solution: say('Ukitzailea: $d=r$.', 'Tangente: $d=r$.', 'مماس: $d=r$.') },
            { id: 32, difficulty: 'easy', question: say('6 cm-ko erradioa, eta zuzena zentrotik 2 cm-ra. Nolakoa da?', 'Radio de 6 cm y la recta a 2 cm del centro. ¿Cómo es?', 'نصف القطر 6 سم والمستقيم على بعد 2 سم من المركز. كيف هو؟'), solution: say('Ebakitzailea: $2<6$.', 'Secante: $2<6$.', 'قاطع: $2<6$.') },
            { id: 33, difficulty: 'easy', question: say('Angelu inskribatu bat $25^{\\circ}$ da. Zenbat da arku bera hartzen duen zentrala?', 'Un ángulo inscrito mide $25^{\\circ}$. ¿Cuánto mide el central que abarca el mismo arco?', 'زاوية محيطية $25^{\\circ}$. كم قياس المركزية التي تحصر القوس نفسه؟'), solution: same('$2\\cdot 25^{\\circ}=50^{\\circ}$'), answer: { expected: n(50) } },
            { id: 34, difficulty: 'medium', question: say('Bi zirkunferentziaren erradioak 7 cm eta 10 cm dira. Nolakoak dira zentroak a) 9 cm-ra; b) 20 cm-ra; c) 3 cm-ra; d) 17 cm-ra; e) 0 cm-ra badaude?', 'Dos circunferencias tienen radios de 7 cm y 10 cm. ¿Cómo son si sus centros están a a) 9 cm; b) 20 cm; c) 3 cm; d) 17 cm; e) 0 cm?', 'نصفا قطري دائرتين 7 سم و10 سم. كيف هما إذا كان البعد بين المركزين أ) 9 سم؛ ب) 20 سم؛ ج) 3 سم؛ د) 17 سم؛ هـ) 0 سم؟'), solution: say('a) Ebakitzaileak; b) kanpokoak; c) barrutik ukitzaileak; d) kanpotik ukitzaileak; e) zentrokideak.', 'a) Secantes; b) exteriores; c) tangentes interiores; d) tangentes exteriores; e) concéntricas.', 'أ) متقاطعتان؛ ب) متباعدتان؛ ج) متماستان من الداخل؛ د) متماستان من الخارج؛ هـ) متحدتا المركز.') },
            { id: 35, difficulty: 'medium', question: say('6 cm eta 2,5 cm-ko erradioak dituzten bi zirkunferentzia kanpotik ukitzaileak dira. Zer distantziara daude zentroak?', 'Dos circunferencias de radios 6 cm y 2,5 cm son tangentes exteriores. ¿A qué distancia están los centros?', 'دائرتان نصفا قطريهما 6 سم و2.5 سم متماستان من الخارج. كم البعد بين المركزين؟'), solution: same('$6+2{,}5=8{,}5$'), answer: { expected: v('8,5') } },
            { id: 36, difficulty: 'medium', question: say('12 cm eta 7 cm-ko erradioak dituzten bi zirkunferentzia barrutik ukitzaileak dira. Zer distantziara daude zentroak?', 'Dos circunferencias de radios 12 cm y 7 cm son tangentes interiores. ¿A qué distancia están los centros?', 'دائرتان نصفا قطريهما 12 سم و7 سم متماستان من الداخل. كم البعد بين المركزين؟'), solution: same('$12-7=5$'), answer: { expected: n(5) } },
            { id: 37, difficulty: 'medium', question: say('Arku batek zirkunferentziaren laurdena hartzen du. Zenbat da arku hori hartzen duen angelu inskribatua?', 'Un arco es la cuarta parte de la circunferencia. ¿Cuánto mide un ángulo inscrito que abarca ese arco?', 'قوس هو ربع الدائرة. كم قياس الزاوية المحيطية التي تحصره؟'), solution: same('$360^{\\circ}\\mathbin{:}4=90^{\\circ}\\ \\to\\ 90^{\\circ}\\mathbin{:}2=45^{\\circ}$'), answer: { expected: n(45) } },
            { id: 38, difficulty: 'hard', question: say('17 cm-ko erradioko zirkunferentzia batek zuzen bat ebakitzen du, eta korda 16 cm da. Zer distantziara dago zentroa zuzenetik?', 'Una circunferencia de 17 cm de radio corta a una recta, y la cuerda mide 16 cm. ¿A qué distancia está el centro de la recta?', 'دائرة نصف قطرها 17 سم تقطع مستقيمًا، وطول الوتر 16 سم. كم يبعد المركز عن المستقيم؟'), solution: same('$\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$'), answer: { expected: n(15) } },
            { id: 39, difficulty: 'hard', question: say('$r_1=8$ m eta $r_2=5$ m. Nolakoak dira zentroak a) 6 m-ra; b) 13 m-ra; c) 15 m-ra; d) 3 m-ra badaude?', '$r_1=8$ m y $r_2=5$ m. ¿Cómo son si los centros están a a) 6 m; b) 13 m; c) 15 m; d) 3 m?', '$r_1=8$ م و$r_2=5$ م. كيف هما إذا كان البعد بين المركزين أ) 6 م؛ ب) 13 م؛ ج) 15 م؛ د) 3 م؟'), solution: say('a) Ebakitzaileak; b) kanpotik ukitzaileak; c) kanpokoak; d) barrutik ukitzaileak.', 'a) Secantes; b) tangentes exteriores; c) exteriores; d) tangentes interiores.', 'أ) متقاطعتان؛ ب) متماستان من الخارج؛ ج) متباعدتان؛ د) متماستان من الداخل.') },
            { id: 40, difficulty: 'hard', question: say('Izendatu: a) bi erradio eta arku batek mugatutako zatia; b) korda batek eta arku batek mugatutakoa; c) zentro bereko bi zirkunferentziaren artekoa; d) koroa baten zati bat, bi erradiok mugatuta.', 'Nombra: a) la parte limitada por dos radios y un arco; b) la limitada por una cuerda y un arco; c) la que queda entre dos circunferencias con el mismo centro; d) un trozo de corona limitado por dos radios.', 'سمِّ: أ) الجزء المحدود بنصفي قطرين وقوس؛ ب) المحدود بوتر وقوس؛ ج) ما بين دائرتين لهما المركز نفسه؛ د) جزء من حلقة يحدّه نصفا قطرين.'), solution: say('a) Sektore zirkularra; b) segmentu zirkularra; c) koroa zirkularra; d) trapezio zirkularra.', 'a) Sector circular; b) segmento circular; c) corona circular; d) trapecio circular.', 'أ) قطاع دائري؛ ب) قطعة دائرية؛ ج) حلقة دائرية؛ د) شبه منحرف دائري.') }
        ]
    },
    {
        id: 'areas',
        title: say('Irudi konposatuen azalera', 'Áreas de figuras compuestas', 'مساحات الأشكال المركّبة'),
        items: [
            { id: 41, difficulty: 'easy', question: say('L forma bat 8 × 3 cm-ko laukizuzen batek eta 4 × 2 cm-ko beste batek osatzen dute. Zein da azalera (cm²)?', 'Una L está formada por un rectángulo de 8 × 3 cm y otro de 4 × 2 cm. ¿Cuál es su área (cm²)?', 'شكل L مكوّن من مستطيل 8 × 3 سم وآخر 4 × 2 سم. ما مساحته (سم²)؟'), solution: same('$8\\cdot 3+4\\cdot 2=24+8=32$'), answer: { expected: n(32) } },
            { id: 42, difficulty: 'easy', question: say('Kalkulatu 10 cm-ko erradioko zirkulu-erdi baten azalera ($\\pi\\approx 3{,}14$).', 'Calcula el área de un semicírculo de 10 cm de radio ($\\pi\\approx 3{,}14$).', 'احسب مساحة نصف قرص نصف قطره 10 سم ($\\pi\\approx 3{,}14$).'), solution: same('$3{,}14\\cdot 10^{2}\\mathbin{:}2=314\\mathbin{:}2=157$'), answer: { expected: n(157) } },
            { id: 43, difficulty: 'easy', question: say('Azalera ala perimetroa? a) Sukaldeko zorua lauzatu; b) argazki bati markoa jarri; c) belarra erein; d) futbol-zelaia hesiz inguratu.', '¿Área o perímetro? a) Embaldosar el suelo de la cocina; b) poner un marco a una foto; c) sembrar césped; d) vallar un campo de fútbol.', 'مساحة أم محيط؟ أ) تبليط أرضية المطبخ؛ ب) وضع إطار لصورة؛ ج) زرع العشب؛ د) إحاطة ملعب كرة قدم بسياج.'), solution: say('a) Azalera; b) perimetroa; c) azalera; d) perimetroa.', 'a) Área; b) perímetro; c) área; d) perímetro.', 'أ) مساحة؛ ب) محيط؛ ج) مساحة؛ د) محيط.') },
            { id: 44, difficulty: 'medium', question: say('Kalkulatu 12 cm-ko erradioko eta $30^{\\circ}$-ko sektorearen azalera ($\\pi\\approx 3{,}14$).', 'Calcula el área de un sector de 12 cm de radio y $30^{\\circ}$ ($\\pi\\approx 3{,}14$).', 'احسب مساحة قطاع نصف قطره 12 سم وزاويته $30^{\\circ}$ ($\\pi\\approx 3{,}14$).'), solution: same('$\\frac{3{,}14\\cdot 12^{2}\\cdot 30}{360}=\\frac{452{,}16}{12}=37{,}68$'), answer: { expected: v('37,68') } },
            { id: 45, difficulty: 'medium', question: say('Kalkulatu 7 cm eta 4 cm-ko erradioak dituen koroaren azalera ($\\pi\\approx 3{,}14$).', 'Calcula el área de la corona de radios 7 cm y 4 cm ($\\pi\\approx 3{,}14$).', 'احسب مساحة الحلقة التي نصفا قطريها 7 سم و4 سم ($\\pi\\approx 3{,}14$).'), solution: same('$3{,}14\\cdot(49-16)=3{,}14\\cdot 33=103{,}62$'), answer: { expected: v('103,62') } },
            { id: 46, difficulty: 'medium', question: say('Kalkulatu 20 cm-ko erradioko zirkunferentzia baten $90^{\\circ}$-ko arkuaren luzera ($\\pi\\approx 3{,}14$).', 'Calcula la longitud de un arco de $90^{\\circ}$ en una circunferencia de 20 cm de radio ($\\pi\\approx 3{,}14$).', 'احسب طول قوس $90^{\\circ}$ في دائرة نصف قطرها 20 سم ($\\pi\\approx 3{,}14$).'), solution: same('$\\frac{2\\cdot 3{,}14\\cdot 20\\cdot 90}{360}=\\frac{125{,}6}{4}=31{,}4$'), answer: { expected: v('31,4') } },
            { id: 47, difficulty: 'medium', question: say('4 m × 3 m-ko gela bat 20 cm-ko aldeko lauza karratuekin lauzatu nahi da. Zenbat lauza behar dira?', 'Se quiere embaldosar una habitación de 4 m × 3 m con baldosas cuadradas de 20 cm de lado. ¿Cuántas baldosas hacen falta?', 'نريد تبليط غرفة 4 م × 3 م ببلاطات مربعة طول ضلعها 20 سم. كم بلاطة نحتاج؟'), solution: same('$4\\cdot 3=12\\qquad 0{,}2\\cdot 0{,}2=0{,}04\\qquad 12\\mathbin{:}0{,}04=300$'), answer: { expected: n(300) } },
            { id: 48, difficulty: 'hard', question: say('10 m × 6 m-ko lorategi baten inguruan 1 m zabaleko bide bat egin da. Zein da bidearen azalera (m²)?', 'Alrededor de un jardín de 10 m × 6 m se ha hecho un camino de 1 m de ancho. ¿Cuál es el área del camino (m²)?', 'حول حديقة 10 م × 6 م أُنشئ ممر عرضه 1 م. ما مساحة الممر (م²)؟'), solution: say('Kanpoko laukizuzena $12\\times 8$ da: $12\\cdot 8-10\\cdot 6=96-60=36$.', 'El rectángulo exterior es de $12\\times 8$: $12\\cdot 8-10\\cdot 6=96-60=36$.', 'المستطيل الخارجي $12\\times 8$: $12\\cdot 8-10\\cdot 6=96-60=36$.'), answer: { expected: n(36) } },
            { id: 49, difficulty: 'hard', question: say('4 m × 2,5 m-ko horma bat margotu behar da; 1,2 m × 1 m-ko leiho bat du. m² bakoitzak 3 € balio du. Zenbat balio du margotzeak?', 'Hay que pintar una pared de 4 m × 2,5 m que tiene una ventana de 1,2 m × 1 m. Cada m² cuesta 3 €. ¿Cuánto cuesta pintarla?', 'يجب طلاء جدار 4 م × 2.5 م فيه نافذة 1.2 م × 1 م. ثمن المتر المربع 3 €. كم تكلفة الطلاء؟'), solution: same('$4\\cdot 2{,}5-1{,}2\\cdot 1=10-1{,}2=8{,}8\\ \\to\\ 8{,}8\\cdot 3=26{,}4$'), answer: { expected: v('26,4') } },
            { id: 50, difficulty: 'hard', question: say('8 cm-ko aldeko karratu bati 4 cm-ko erradioko lau zirkulu-laurden kendu zaizkio, bat izkina bakoitzean. Zein da geratzen den azalera? ($\\pi\\approx 3{,}14$)', 'A un cuadrado de 8 cm de lado se le quitan cuatro cuartos de círculo de 4 cm de radio, uno en cada esquina. ¿Qué área queda? ($\\pi\\approx 3{,}14$)', 'أُزيلت من مربع طول ضلعه 8 سم أربعة أرباع أقراص نصف قطرها 4 سم، واحد في كل ركن. ما المساحة المتبقية؟ ($\\pi\\approx 3{,}14$)'), solution: say('Lau laurden zirkulu oso bat dira: $8^{2}-3{,}14\\cdot 4^{2}=64-50{,}24=13{,}76$.', 'Cuatro cuartos son un círculo entero: $8^{2}-3{,}14\\cdot 4^{2}=64-50{,}24=13{,}76$.', 'أربعة أرباع تساوي قرصًا كاملًا: $8^{2}-3{,}14\\cdot 4^{2}=64-50{,}24=13{,}76$.'), answer: { expected: v('13,76') } }
        ]
    }
]
