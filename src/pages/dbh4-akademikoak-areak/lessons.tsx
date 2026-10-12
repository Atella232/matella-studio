import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { ConeFigure, PrismVolumeFigure, PyramidAreaFigure, PyramidVolumeFigure, SphereFigure } from '../dbh2-gorputzak-v2/figures'
import { ApothemFigure } from '../dbh2-pitagoras-v2/figures'
import { PlanFigure, ThalesFigure, ThalesPositionFigure, VolumeRatioFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { CompoundSolidFigure } from '../dbh4-aplikatuak-areak/figures'
import { FrustumFigure, RightTheoremsFigure, SegmentFigure } from './figures'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 6 (regular polygons
   with the apothem found by Pythagoras, sectors, crowns and segments,
   compound figures, areas of polyhedra and round bodies, volumes and
   compound solids, similar figures with ratio k, k² and k³) and Anaya
   4.º Académicas unit 6 (Thales, similar triangles, the altitude and leg
   theorems, the frustums of cone and pyramid as a difference of similar
   solids, models and scales). It builds on the 4. DBH aplikatuak units on
   areas and on similarity and goes further: segments, spherical zones,
   the right-triangle theorems and the frustums. π ≈ 3,14.
   ========================================================================== */

export type AreasSimilarityStageId = 'plane-areas' | 'solid-areas' | 'volumes' | 'similarity' | 'ratios'

export const areasSimilarityStages: UnitStage[] = [
    { id: 'plane-areas', tone: 'blue', title: { eu: 'Irudi lauen azalerak', es: 'Áreas de figuras planas', ar: 'مساحات الأشكال المستوية' } },
    { id: 'solid-areas', tone: 'violet', title: { eu: 'Gorputzen azalerak', es: 'Áreas de los cuerpos', ar: 'مساحات الأجسام' } },
    { id: 'volumes', tone: 'mustard', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' } },
    { id: 'similarity', tone: 'coral', title: { eu: 'Antzekotasuna', es: 'Semejanza', ar: 'التشابه' } },
    { id: 'ratios', tone: 'green', title: { eu: 'Antzekotasun-arrazoia eta eskalak', es: 'Razón de semejanza y escalas', ar: 'نسبة التشابه والمقاييس' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const areasSimilarityTopics: UnitTopic[] = [
    /* ---------- 1. Areas of plane figures ---------- */
    {
        id: 'regular-polygons',
        stage: 'plane-areas',
        title: say('Poligono erregularrak eta apotema', 'Polígonos regulares y apotema', 'المضلعات المنتظمة والعامد'),
        goal: say('Apotema Pitagorasekin aurkitzea eta poligono erregular baten azalera kalkulatzea.', 'Hallar la apotema con Pitágoras y calcular el área de un polígono regular.', 'إيجاد العامد بفيثاغورس وحساب مساحة مضلع منتظم.'),
        explanation: say(
            'Poligono erregular bat $n$ triangelu isoszele berdinetan banatzen da, erpin guztiak zentroarekin lotuz. Triangelu bakoitzaren oinarria aldea da, $l$, eta altuera apotema, $a$; beraz, $A=n\\cdot\\dfrac{l\\cdot a}{2}=\\dfrac{P\\cdot a}{2}$. Apotema ematen ez badute, erradioa $r$, apotema eta alde-erdia triangelu angeluzuzen bat dira, eta erradioa hipotenusa da: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. Hexagono erregularrean erradioa eta aldea berdinak dira: 6 cm-ko aldearekin, $a=\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}2$ eta $A=\\dfrac{36\\cdot 5{,}2}{2}=93{,}6$ cm². Karratuan apotema alde-erdia da, eta triangelu aldeberdinean altueraren herena.',
            'Un polígono regular se divide en $n$ triángulos isósceles iguales uniendo los vértices con el centro. La base de cada triángulo es el lado, $l$, y su altura es la apotema, $a$; por eso $A=n\\cdot\\dfrac{l\\cdot a}{2}=\\dfrac{P\\cdot a}{2}$. Si no dan la apotema, el radio $r$, la apotema y medio lado forman un triángulo rectángulo cuya hipotenusa es el radio: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. En el hexágono regular el radio y el lado son iguales: con 6 cm de lado, $a=\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}2$ y $A=\\dfrac{36\\cdot 5{,}2}{2}=93{,}6$ cm². En el cuadrado la apotema es medio lado, y en el triángulo equilátero, un tercio de la altura.',
            'يُقسم المضلع المنتظم إلى $n$ مثلثات متساوية الساقين ومتطابقة بوصل الرؤوس بالمركز. قاعدة كل مثلث هي الضلع $l$ وارتفاعه هو العامد $a$؛ لذلك $A=n\\cdot\\dfrac{l\\cdot a}{2}=\\dfrac{P\\cdot a}{2}$. وإذا لم يُعطَ العامد، فإن نصف القطر $r$ والعامد ونصف الضلع تكوّن مثلثًا قائمًا وتره نصف القطر: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. وفي المسدس المنتظم يتساوى نصف القطر والضلع: بضلع 6 سم يكون $a=\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}2$ و$A=\\dfrac{36\\cdot 5{,}2}{2}=93{,}6$ سم². وفي المربع العامد نصف الضلع، وفي المثلث المتساوي الأضلاع ثلث الارتفاع.'
        ),
        problem: say('Pentagono erregular baten aldea 6 cm da eta erradioa 5,1 cm. Kalkulatu azalera.', 'Un pentágono regular tiene 6 cm de lado y 5,1 cm de radio. Calcula su área.', 'مخمس منتظم طول ضلعه 6 سم ونصف قطره 5.1 سم. احسب مساحته.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: erradioa hipotenusa, alde-erdia katetoa.', 'Apotema: el radio es la hipotenusa y medio lado un cateto.', 'العامد: نصف القطر هو الوتر ونصف الضلع ضلع قائم.'), math: same('$a=\\sqrt{5{,}1^{2}-3^{2}}\\approx 4{,}12$') },
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.'), math: same('$P=5\\cdot 6=30$') },
            { text: say('Azalera: 61,8 cm².', 'Área: 61,8 cm².', 'المساحة: 61.8 سم².'), math: same('$A=\\dfrac{30\\cdot 4{,}12}{2}=61{,}8$') }
        ],
        example: same('$A=\\dfrac{P\\cdot a}{2}$'),
        takeaway: say('Erradioa, apotema eta alde-erdia: triangelu angeluzuzena. Azalera: P · a / 2.', 'Radio, apotema y medio lado: un triángulo rectángulo. Área: P · a / 2.', 'نصف القطر والعامد ونصف الضلع: مثلث قائم. المساحة: P · a / 2.'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'circle-parts',
        stage: 'plane-areas',
        title: say('Arkua, sektorea eta koroa', 'Arco, sector y corona', 'القوس والقطاع والحلقة'),
        goal: say('Arku baten luzera eta sektore, koroa eta trapezio zirkularren azalera kalkulatzea.', 'Calcular la longitud de un arco y el área de sectores, coronas y trapecios circulares.', 'حساب طول قوس ومساحة القطاعات والحلقات وأشباه المنحرفات الدائرية.'),
        explanation: say(
            '$n°$-ko arku bat zirkunferentziaren $\\frac{n}{360}$ zatia da: $L=\\dfrac{2\\pi r\\cdot n}{360}$. Sektore zirkularra bi erradiok eta arku batek mugatzen dute, eta zirkuluaren zati bera da: $A=\\dfrac{\\pi r^{2}\\cdot n}{360}$. Sektorearen perimetroa arkua gehi bi erradio da. Koroa zirkularra zentro bereko bi zirkuluren artekoa da: $A=\\pi(R^{2}-r^{2})$, eta trapezio zirkularra koroaren $n°$-ko zatia: $A=\\dfrac{\\pi(R^{2}-r^{2})\\cdot n}{360}$. Adibidez, 5 eta 3 erradioko koroa: $3{,}14\\cdot(25-9)=50{,}24$. Kontuz: koroan ez kendu erradioak karratura jaso aurretik, $\\pi(5-3)^{2}$ ez baita berdina.',
            'Un arco de $n°$ es la fracción $\\frac{n}{360}$ de la circunferencia: $L=\\dfrac{2\\pi r\\cdot n}{360}$. El sector circular está limitado por dos radios y un arco, y es la misma fracción del círculo: $A=\\dfrac{\\pi r^{2}\\cdot n}{360}$. El perímetro del sector es el arco más dos radios. La corona circular está entre dos círculos con el mismo centro: $A=\\pi(R^{2}-r^{2})$, y el trapecio circular es la parte de $n°$ de la corona: $A=\\dfrac{\\pi(R^{2}-r^{2})\\cdot n}{360}$. Por ejemplo, la corona de radios 5 y 3: $3{,}14\\cdot(25-9)=50{,}24$. Cuidado: en la corona no restes los radios antes de elevarlos al cuadrado, porque $\\pi(5-3)^{2}$ no es lo mismo.',
            'القوس الذي قياسه $n°$ هو الجزء $\\frac{n}{360}$ من محيط الدائرة: $L=\\dfrac{2\\pi r\\cdot n}{360}$. ويحدّ القطاعَ الدائري نصفا قطر وقوس، وهو الجزء نفسه من القرص: $A=\\dfrac{\\pi r^{2}\\cdot n}{360}$. ومحيط القطاع هو القوس زائد نصفي قطر. والحلقة الدائرية بين قرصين لهما المركز نفسه: $A=\\pi(R^{2}-r^{2})$، وشبه المنحرف الدائري جزء الحلقة الذي قياسه $n°$: $A=\\dfrac{\\pi(R^{2}-r^{2})\\cdot n}{360}$. مثلًا، الحلقة التي نصفا قطريها 5 و3: $3{,}14\\cdot(25-9)=50{,}24$. انتبه: في الحلقة لا تطرح نصفي القطرين قبل تربيعهما، لأن $\\pi(5-3)^{2}$ ليس الشيء نفسه.'
        ),
        problem: say('Kalkulatu 4 cm-ko erradioko eta 45°-ko sektore baten azalera eta perimetroa.', 'Calcula el área y el perímetro de un sector de 45° y 4 cm de radio.', 'احسب مساحة ومحيط قطاع قياسه 45° ونصف قطره 4 سم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('45° zirkuluaren zortzirena da.', '45° es la octava parte del círculo.', '45° ثُمن القرص.'), math: same('$A=\\dfrac{3{,}14\\cdot 4^{2}}{8}=6{,}28$') },
            { text: say('Arkua.', 'El arco.', 'القوس.'), math: same('$L=\\dfrac{2\\cdot 3{,}14\\cdot 4}{8}=3{,}14$') },
            { text: say('Perimetroa: arkua gehi bi erradio.', 'Perímetro: el arco más dos radios.', 'المحيط: القوس زائد نصفي قطر.'), math: same('$P=3{,}14+8=11{,}14$') }
        ],
        example: same('$A=\\dfrac{\\pi r^{2}\\cdot n}{360}$'),
        takeaway: say('Arkua eta sektorea: osoaren n/360. Koroa: π(R² − r²).', 'Arco y sector: n/360 del total. Corona: π(R² − r²).', 'القوس والقطاع: n/360 من الكل. الحلقة: π(R² − r²).'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'segments',
        stage: 'plane-areas',
        title: say('Segmentu zirkularra eta irudi konposatuak', 'Segmento circular y figuras compuestas', 'القطعة الدائرية والأشكال المركّبة'),
        goal: say('Segmentu zirkularraren eta itzaleztatutako eskualdeen azalera sektoreak eta poligonoak batuz edo kenduz kalkulatzea.', 'Calcular el área del segmento circular y de regiones sombreadas sumando o restando sectores y polígonos.', 'حساب مساحة القطعة الدائرية والمناطق المظلّلة بجمع القطاعات والمضلعات أو طرحها.'),
        explanation: say(
            'Segmentu zirkularra korda batek eta arku batek mugatzen dute. Haren azalera ez dago formula batean: sektorea ken bi erradiok eta kordak osatzen duten triangelua da. 90°-ko segmentuan triangelua angeluzuzena da: 4 erradioarekin, $12{,}56-8=4{,}56$. 60°-ko segmentuan triangelua aldeberdina da, eta haren altuera Pitagorasekin ateratzen da. Irudi konposatu batean, banatu ezagutzen dituzun zatitan (karratuak, triangeluak, sektoreak, segmentuak) eta batu, edo osatu irudi handiago bat eta kendu soberan dagoena. «Hosto» klasikoa bi segmentu dira: 4 aldeko karratuan, aurkako bi erpinetan zentroa duten bi lauden artean, $2\\cdot 4{,}56=9{,}12$.',
            'El segmento circular está limitado por una cuerda y un arco. Su área no tiene fórmula propia: es el sector menos el triángulo que forman los dos radios y la cuerda. En el segmento de 90° el triángulo es rectángulo: con radio 4, $12{,}56-8=4{,}56$. En el de 60° el triángulo es equilátero y su altura sale con Pitágoras. En una figura compuesta, descompón en partes conocidas (cuadrados, triángulos, sectores, segmentos) y suma, o completa una figura mayor y resta lo que sobra. La «hoja» clásica son dos segmentos: en un cuadrado de lado 4, entre dos cuartos de círculo con centro en vértices opuestos, $2\\cdot 4{,}56=9{,}12$.',
            'تحدّ القطعةَ الدائرية وترٌ وقوس. وليست لمساحتها صيغة خاصة: هي القطاع ناقص المثلث الذي يكوّنه نصفا القطر والوتر. في قطعة 90° يكون المثلث قائمًا: بنصف قطر 4، $12{,}56-8=4{,}56$. وفي قطعة 60° يكون المثلث متساوي الأضلاع ويُحسب ارتفاعه بفيثاغورس. وفي الشكل المركّب جزّئ إلى أجزاء معروفة (مربعات ومثلثات وقطاعات وقطع) واجمع، أو أكمل شكلًا أكبر واطرح الزائد. و«الورقة» المعروفة قطعتان: في مربع ضلعه 4، بين ربعي دائرتين مركزاهما رأسان متقابلان، $2\\cdot 4{,}56=9{,}12$.'
        ),
        problem: say('4 cm-ko aldeko karratu batean, aurkako bi erpinetan zentroa duten 4 cm-ko erradioko bi zirkulu-laurden marrazten dira. Kalkulatu sortzen duten hostoaren azalera.', 'En un cuadrado de 4 cm de lado se dibujan dos cuartos de círculo de 4 cm de radio con centro en dos vértices opuestos. Calcula el área de la hoja que forman.', 'في مربع ضلعه 4 سم يُرسم ربعا دائرتين نصف قطرهما 4 سم ومركزاهما رأسان متقابلان. احسب مساحة الورقة التي يكوّنانها.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu-laurdena.', 'El cuarto de círculo.', 'ربع القرص.'), math: same('$\\dfrac{3{,}14\\cdot 4^{2}}{4}=12{,}56$') },
            { text: say('Segmentua: laurdena ken triangelua.', 'El segmento: el cuarto menos el triángulo.', 'القطعة: الربع ناقص المثلث.'), math: same('$12{,}56-8=4{,}56$') },
            { text: say('Hostoa bi segmentu dira: 9,12 cm².', 'La hoja son dos segmentos: 9,12 cm².', 'الورقة قطعتان: 9.12 سم².'), math: same('$2\\cdot 4{,}56=9{,}12$') }
        ],
        example: same('$12{,}56-8=4{,}56$'),
        takeaway: say('Segmentua: sektorea ken triangelua. Konposatuak: banatu eta batu, edo osatu eta kendu.', 'Segmento: sector menos triángulo. Compuestas: descompón y suma, o completa y resta.', 'القطعة: القطاع ناقص المثلث. المركّبة: جزّئ واجمع، أو أكمل واطرح.'),
        figure: (language) => <SegmentFigure language={language} />
    },

    /* ---------- 2. Areas of solids ---------- */
    {
        id: 'polyhedra-area',
        stage: 'solid-areas',
        title: say('Prismen eta piramideen azalera', 'Área de prismas y pirámides', 'مساحة المنشورات والأهرام'),
        goal: say('Prisma eta piramide baten alboko azalera eta azalera osoa kalkulatzea, falta diren neurriak Pitagorasekin aurkituz.', 'Calcular el área lateral y total de prismas y pirámides, hallando con Pitágoras las medidas que faltan.', 'حساب المساحة الجانبية والكلية للمنشورات والأهرام، مع إيجاد الأطوال الناقصة بفيثاغورس.'),
        explanation: say(
            'Garapenean ikusten da: prisma zuzen baten alboko aurpegiek laukizuzen bat osatzen dute, oinarriaren perimetroa bider altuera, $A_L=P\\cdot h$, eta azalera osoa $A_T=A_L+2A_B$ da. Piramide erregular baten alboko aurpegiak triangelu isoszeleak dira; haien altuera piramidearen apotema da, $a_p$, eta $A_L=\\dfrac{P\\cdot a_p}{2}$, $A_T=A_L+A_B$. Piramidearen apotema, altuera eta oinarriaren apotema triangelu angeluzuzen bat dira: $a_p=\\sqrt{h^{2}+a_b^{2}}$. Oinarri karratuan $a_b$ alde-erdia da: 6 aldeko eta 4 altuerako piramidean, $a_p=\\sqrt{16+9}=5$. Ez nahastu piramidearen altuera eta apotema.',
            'Se ve en el desarrollo: las caras laterales de un prisma recto forman un rectángulo de base el perímetro de la base y de altura la del prisma, $A_L=P\\cdot h$, y el área total es $A_T=A_L+2A_B$. Las caras laterales de una pirámide regular son triángulos isósceles cuya altura es la apotema de la pirámide, $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$, $A_T=A_L+A_B$. La apotema de la pirámide, su altura y la apotema de la base forman un triángulo rectángulo: $a_p=\\sqrt{h^{2}+a_b^{2}}$. Con base cuadrada, $a_b$ es medio lado: en la pirámide de lado 6 y altura 4, $a_p=\\sqrt{16+9}=5$. No confundas la altura de la pirámide con su apotema.',
            'يظهر ذلك في النشر: تكوّن الأوجه الجانبية للمنشور القائم مستطيلًا قاعدته محيط القاعدة وارتفاعه ارتفاع المنشور، $A_L=P\\cdot h$، والمساحة الكلية $A_T=A_L+2A_B$. والأوجه الجانبية للهرم المنتظم مثلثات متساوية الساقين ارتفاعها عامد الهرم $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$ و$A_T=A_L+A_B$. ويكوّن عامد الهرم وارتفاعه وعامد القاعدة مثلثًا قائمًا: $a_p=\\sqrt{h^{2}+a_b^{2}}$. وفي القاعدة المربعة $a_b$ نصف الضلع: في الهرم الذي ضلعه 6 وارتفاعه 4، $a_p=\\sqrt{16+9}=5$. لا تخلط بين ارتفاع الهرم وعامده.'
        ),
        problem: say('Piramide karratu baten oinarriaren aldea 6 cm da eta altuera 4 cm. Kalkulatu azalera osoa.', 'Una pirámide cuadrangular tiene 6 cm de lado de la base y 4 cm de altura. Calcula su área total.', 'هرم رباعي ضلع قاعدته 6 سم وارتفاعه 4 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Piramidearen apotema.', 'La apotema de la pirámide.', 'عامد الهرم.'), math: same('$a_p=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Alboko azalera.', 'El área lateral.', 'المساحة الجانبية.'), math: same('$A_L=\\dfrac{24\\cdot 5}{2}=60$') },
            { text: say('Gehi oinarria: 96 cm².', 'Más la base: 96 cm².', 'زائد القاعدة: 96 سم².'), math: same('$A_T=60+36=96$') }
        ],
        example: same('$A_L=\\dfrac{P\\cdot a_p}{2}$'),
        takeaway: say('Prisma: P · h + 2 oinarri. Piramidea: P · apotema / 2 + oinarria.', 'Prisma: P · h + 2 bases. Pirámide: P · apotema / 2 + base.', 'المنشور: P · h + قاعدتان. الهرم: P · العامد / 2 + القاعدة.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'round-area',
        stage: 'solid-areas',
        title: say('Zilindroaren eta konoaren azalera', 'Área del cilindro y del cono', 'مساحة الأسطوانة والمخروط'),
        goal: say('Zilindroaren eta konoaren azalera kalkulatzea, sortzailea Pitagorasekin aurkituz.', 'Calcular el área del cilindro y del cono, hallando la generatriz con Pitágoras.', 'حساب مساحة الأسطوانة والمخروط مع إيجاد الراسم بفيثاغورس.'),
        explanation: say(
            'Zilindroaren garapena laukizuzen bat eta bi zirkulu dira; laukizuzenaren oinarria zirkunferentzia da: $A_L=2\\pi r h$ eta $A_T=2\\pi r h+2\\pi r^{2}$. Konoaren garapena sektore zirkular bat eta zirkulu bat dira; sektorearen erradioa sortzailea da, $g$, eta $A_L=\\pi r g$, $A_T=\\pi r g+\\pi r^{2}$. Altuera, erradioa eta sortzailea triangelu angeluzuzen bat dira, sortzailea hipotenusa izanik: $g=\\sqrt{h^{2}+r^{2}}$. 3 erradioko eta 4 altuerako konoan $g=5$. Kono-enbor baten alboko azalera bi konoren arteko kenketa da, edo $\\pi(R+r)g$. Datuetan diametroa badago, hartu erdia.',
            'El desarrollo del cilindro es un rectángulo y dos círculos; la base del rectángulo es la circunferencia: $A_L=2\\pi r h$ y $A_T=2\\pi r h+2\\pi r^{2}$. El desarrollo del cono es un sector circular y un círculo; el radio del sector es la generatriz, $g$, y $A_L=\\pi r g$, $A_T=\\pi r g+\\pi r^{2}$. La altura, el radio y la generatriz forman un triángulo rectángulo cuya hipotenusa es la generatriz: $g=\\sqrt{h^{2}+r^{2}}$. En el cono de radio 3 y altura 4, $g=5$. El área lateral de un tronco de cono es la diferencia de dos conos, o $\\pi(R+r)g$. Si dan el diámetro, toma la mitad.',
            'نشر الأسطوانة مستطيل وقرصان؛ قاعدة المستطيل هي محيط الدائرة: $A_L=2\\pi r h$ و$A_T=2\\pi r h+2\\pi r^{2}$. ونشر المخروط قطاع دائري وقرص؛ نصف قطر القطاع هو الراسم $g$، و$A_L=\\pi r g$ و$A_T=\\pi r g+\\pi r^{2}$. ويكوّن الارتفاع ونصف القطر والراسم مثلثًا قائمًا وتره الراسم: $g=\\sqrt{h^{2}+r^{2}}$. في المخروط الذي نصف قطره 3 وارتفاعه 4، $g=5$. والمساحة الجانبية لجذع المخروط فرق مخروطين، أو $\\pi(R+r)g$. وإذا أُعطي القطر فخذ نصفه.'
        ),
        problem: say('Kono baten erradioa 3 cm da eta altuera 4 cm. Kalkulatu azalera osoa.', 'Un cono tiene 3 cm de radio y 4 cm de altura. Calcula su área total.', 'مخروط نصف قطره 3 سم وارتفاعه 4 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sortzailea.', 'La generatriz.', 'الراسم.'), math: same('$g=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Alboko azalera eta oinarria.', 'Área lateral y base.', 'المساحة الجانبية والقاعدة.'), math: same('$3{,}14\\cdot 3\\cdot 5=47{,}1\\qquad 3{,}14\\cdot 3^{2}=28{,}26$') },
            { text: say('Batu: 75,36 cm².', 'Suma: 75,36 cm².', 'اجمع: 75.36 سم².'), math: same('$47{,}1+28{,}26=75{,}36$') }
        ],
        example: same('$A_L=\\pi r g$'),
        takeaway: say('Zilindroa: 2πrh + 2πr². Konoa: πrg + πr², g = √(h² + r²).', 'Cilindro: 2πrh + 2πr². Cono: πrg + πr², g = √(h² + r²).', 'الأسطوانة: 2πrh + 2πr². المخروط: πrg + πr²، g = √(h² + r²).'),
        figure: (language) => <ConeFigure language={language} />
    },
    {
        id: 'sphere-area',
        stage: 'solid-areas',
        title: say('Esferaren azalera', 'Área de la esfera', 'مساحة الكرة'),
        goal: say('Esferaren, esfera-erdiaren eta zona esferikoaren azalera kalkulatzea, eta azaleratik erradioa aurkitzea.', 'Calcular el área de la esfera, de la semiesfera y de la zona esférica, y hallar el radio a partir del área.', 'حساب مساحة الكرة ونصف الكرة والمنطقة الكروية، وإيجاد نصف القطر من المساحة.'),
        explanation: say(
            'Esferaren azalera erradio bereko lau zirkulurena da: $A=4\\pi r^{2}$. Arkimedesek ikusi zuen esfera inguratzen duen zilindroaren alboko azalera bera dela, $2\\pi r\\cdot 2r$. Horregatik, bi plano paralelok mozten duten zona esferikoak, edo txapel esferikoak, $h$ lodierakoak, zilindroaren banda baten azalera bera du: $A=2\\pi r h$. Esfera-erdi baten gainazal kurbatua $2\\pi r^{2}$ da, eta itxita badago, gehi oinarria, $3\\pi r^{2}$. Azaleratik erradioa ateratzeko, zatitu $4\\pi$-z eta atera erroa: $314=4\\cdot 3{,}14\\cdot r^{2}$ bada, $r^{2}=25$ eta $r=5$.',
            'El área de la esfera es la de cuatro círculos de su mismo radio: $A=4\\pi r^{2}$. Arquímedes vio que coincide con el área lateral del cilindro que la envuelve, $2\\pi r\\cdot 2r$. Por eso una zona esférica, o un casquete, de grosor $h$ entre dos planos paralelos tiene la misma área que la banda del cilindro: $A=2\\pi r h$. La superficie curva de una semiesfera es $2\\pi r^{2}$, y si está cerrada, más la base, $3\\pi r^{2}$. Para sacar el radio a partir del área, divide entre $4\\pi$ y saca la raíz: si $314=4\\cdot 3{,}14\\cdot r^{2}$, $r^{2}=25$ y $r=5$.',
            'مساحة الكرة مساحة أربعة أقراص لها نصف القطر نفسه: $A=4\\pi r^{2}$. ولاحظ أرخميدس أنها تساوي المساحة الجانبية للأسطوانة المحيطة بها، $2\\pi r\\cdot 2r$. لذلك فإن للمنطقة الكروية، أو القبعة الكروية، التي سمكها $h$ بين مستويين متوازيين مساحةَ شريط الأسطوانة نفسها: $A=2\\pi r h$. والسطح المنحني لنصف الكرة $2\\pi r^{2}$، وإذا كان مغلقًا فبإضافة القاعدة $3\\pi r^{2}$. ولإيجاد نصف القطر من المساحة اقسم على $4\\pi$ واستخرج الجذر: إذا كان $314=4\\cdot 3{,}14\\cdot r^{2}$ فإن $r^{2}=25$ و$r=5$.'
        ),
        problem: say('Esfera baten azalera 314 cm² da. Zein da erradioa? Eta 2 cm-ko lodierako zona esferiko baten azalera?', 'Una esfera tiene 314 cm² de área. ¿Cuál es su radio? ¿Y el área de una zona esférica de 2 cm de grosor?', 'مساحة كرة 314 سم². ما نصف قطرها؟ وما مساحة منطقة كروية سمكها 2 سم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 4π-z.', 'Divide entre 4π.', 'اقسم على 4π.'), math: same('$r^{2}=314\\mathbin{:}12{,}56=25$') },
            { text: say('Erroa.', 'La raíz.', 'الجذر.'), math: same('$r=5$') },
            { text: say('Zona: 2πrh.', 'La zona: 2πrh.', 'المنطقة: 2πrh.'), math: same('$2\\cdot 3{,}14\\cdot 5\\cdot 2=62{,}8$') }
        ],
        example: same('$A=4\\pi r^{2}$'),
        takeaway: say('Esfera: 4πr². Zona edo txapela: 2πrh. Esfera-erdi itxia: 3πr².', 'Esfera: 4πr². Zona o casquete: 2πrh. Semiesfera cerrada: 3πr².', 'الكرة: 4πr². المنطقة أو القبعة: 2πrh. نصف الكرة المغلق: 3πr².'),
        figure: (language) => <SphereFigure language={language} />
    },

    /* ---------- 3. Volumes ---------- */
    {
        id: 'prism-cylinder-volume',
        stage: 'volumes',
        title: say('Prisma eta zilindroa', 'Prisma y cilindro', 'المنشور والأسطوانة'),
        goal: say('Prisma eta zilindroen bolumena kalkulatzea eta edukiera litrotan ematea.', 'Calcular el volumen de prismas y cilindros y dar la capacidad en litros.', 'حساب حجم المنشورات والأسطوانات وإعطاء السعة باللترات.'),
        explanation: say(
            'Cavalieriren printzipioaren arabera, altuera bera eta maila bakoitzean ebaki-azalera bera duten bi gorputzek bolumen bera dute. Horregatik, prismaren eta zilindroaren bolumena oinarriaren azalera bider altuera da, zuzenak edo zeiharrak izan: $V=A_B\\cdot h$, eta zilindroan $V=\\pi r^{2}h$. Oinarria poligono erregularra bada, lehenik apotema behar da: 2 aldeko eta 6 altuerako prisma hexagonalean, $a=\\sqrt{3}\\approx 1{,}73$, $A_B=\\dfrac{12\\cdot 1{,}73}{2}=10{,}38$ eta $V=62{,}28$. Edukiera: $1\\ \\text{dm}^{3}=1$ L eta $1\\ \\text{m}^{3}=1000$ L.',
            'Según el principio de Cavalieri, dos cuerpos con la misma altura y la misma área de sección a cada nivel tienen el mismo volumen. Por eso el volumen del prisma y del cilindro es el área de la base por la altura, sean rectos u oblicuos: $V=A_B\\cdot h$, y en el cilindro $V=\\pi r^{2}h$. Si la base es un polígono regular, primero hace falta la apotema: en el prisma hexagonal de lado 2 y altura 6, $a=\\sqrt{3}\\approx 1{,}73$, $A_B=\\dfrac{12\\cdot 1{,}73}{2}=10{,}38$ y $V=62{,}28$. Capacidad: $1\\ \\text{dm}^{3}=1$ L y $1\\ \\text{m}^{3}=1000$ L.',
            'وفق مبدأ كافاليري، لجسمين لهما الارتفاع نفسه ومساحة المقطع نفسها عند كل مستوى الحجمُ نفسه. لذلك فحجم المنشور والأسطوانة هو مساحة القاعدة في الارتفاع، قائمين كانا أو مائلين: $V=A_B\\cdot h$، وفي الأسطوانة $V=\\pi r^{2}h$. وإذا كانت القاعدة مضلعًا منتظمًا فيلزم العامد أولًا: في المنشور السداسي الذي ضلعه 2 وارتفاعه 6، $a=\\sqrt{3}\\approx 1{,}73$ و$A_B=\\dfrac{12\\cdot 1{,}73}{2}=10{,}38$ و$V=62{,}28$. السعة: $1\\ \\text{dm}^{3}=1$ L و$1\\ \\text{m}^{3}=1000$ L.'
        ),
        problem: say('Ur-depósito zilindriko batek 2 m-ko diametroa eta 3 m-ko altuera ditu. Zenbat litro sartzen dira?', 'Un depósito cilíndrico tiene 2 m de diámetro y 3 m de altura. ¿Cuántos litros caben?', 'خزان أسطواني قطره 2 م وارتفاعه 3 م. كم لترًا يسع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioa diametroaren erdia da.', 'El radio es la mitad del diámetro.', 'نصف القطر نصف القطر الكامل.'), math: same('$r=1$') },
            { text: say('Bolumena.', 'El volumen.', 'الحجم.'), math: same('$V=3{,}14\\cdot 1^{2}\\cdot 3=9{,}42$') },
            { text: say('9,42 m³ = 9420 L.', '9,42 m³ = 9420 L.', '9.42 م³ = 9420 لترًا.'), math: same('$9{,}42\\cdot 1000=9420$') }
        ],
        example: same('$V=A_B\\cdot h$'),
        takeaway: say('Prisma eta zilindroa: oinarria bider altuera. 1 dm³ = 1 L.', 'Prisma y cilindro: base por altura. 1 dm³ = 1 L.', 'المنشور والأسطوانة: القاعدة في الارتفاع. 1 dm³ = 1 L.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-cone-volume',
        stage: 'volumes',
        title: say('Piramidea eta konoa', 'Pirámide y cono', 'الهرم والمخروط'),
        goal: say('Piramide eta konoen bolumena kalkulatzea, altuera apotematik edo sortzailetik aterata.', 'Calcular el volumen de pirámides y conos, sacando la altura de la apotema o de la generatriz.', 'حساب حجم الأهرام والمخاريط باستخراج الارتفاع من العامد أو الراسم.'),
        explanation: say(
            'Piramide batek oinarri eta altuera bereko prismaren herena hartzen du, eta konoak zilindroarena: $V=\\dfrac{1}{3}A_B\\cdot h$ eta konoan $V=\\dfrac{1}{3}\\pi r^{2}h$. Bolumenerako altuera behar da, ez apotema edo sortzailea. Ematen ez badute, atera Pitagorasekin: konoan $h=\\sqrt{g^{2}-r^{2}}$, eta piramide karratuan $h=\\sqrt{a_p^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. Adibidez, 6 aldeko eta 5 apotemako piramide karratuan $h=\\sqrt{25-9}=4$ eta $V=\\dfrac{36\\cdot 4}{3}=48$. Kontuz: 3-z zatitzea ahaztea da akats ohikoena.',
            'Una pirámide ocupa un tercio del prisma de igual base y altura, y el cono un tercio del cilindro: $V=\\dfrac{1}{3}A_B\\cdot h$ y en el cono $V=\\dfrac{1}{3}\\pi r^{2}h$. Para el volumen hace falta la altura, no la apotema ni la generatriz. Si no la dan, sácala con Pitágoras: en el cono $h=\\sqrt{g^{2}-r^{2}}$, y en la pirámide cuadrangular $h=\\sqrt{a_p^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. Por ejemplo, en la pirámide cuadrangular de lado 6 y apotema 5, $h=\\sqrt{25-9}=4$ y $V=\\dfrac{36\\cdot 4}{3}=48$. Cuidado: olvidar dividir entre 3 es el error más frecuente.',
            'يشغل الهرم ثلث المنشور الذي له القاعدة والارتفاع نفسهما، والمخروط ثلث الأسطوانة: $V=\\dfrac{1}{3}A_B\\cdot h$ وفي المخروط $V=\\dfrac{1}{3}\\pi r^{2}h$. ويلزم للحجم الارتفاع لا العامد ولا الراسم. وإذا لم يُعطَ فاستخرجه بفيثاغورس: في المخروط $h=\\sqrt{g^{2}-r^{2}}$، وفي الهرم الرباعي $h=\\sqrt{a_p^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. مثلًا، في الهرم الرباعي الذي ضلعه 6 وعامده 5، $h=\\sqrt{25-9}=4$ و$V=\\dfrac{36\\cdot 4}{3}=48$. انتبه: نسيان القسمة على 3 أكثر الأخطاء شيوعًا.'
        ),
        problem: say('Kono baten erradioa 6 cm da eta sortzailea 10 cm. Kalkulatu bolumena.', 'Un cono tiene 6 cm de radio y 10 cm de generatriz. Calcula su volumen.', 'مخروط نصف قطره 6 سم وراسمه 10 سم. احسب حجمه.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera: sortzailea hipotenusa da.', 'La altura: la generatriz es la hipotenusa.', 'الارتفاع: الراسم هو الوتر.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=8$') },
            { text: say('Oinarria bider altuera zati 3.', 'Base por altura entre 3.', 'القاعدة في الارتفاع على 3.'), math: same('$V=\\dfrac{3{,}14\\cdot 6^{2}\\cdot 8}{3}=301{,}44$') },
            { text: say('Bolumena: 301,44 cm³.', 'Volumen: 301,44 cm³.', 'الحجم: 301.44 سم³.') }
        ],
        example: same('$V=\\dfrac{1}{3}A_B\\cdot h$'),
        takeaway: say('Piramidea eta konoa: prismaren eta zilindroaren herena. Altuera, ez apotema.', 'Pirámide y cono: un tercio del prisma y del cilindro. La altura, no la apotema.', 'الهرم والمخروط: ثلث المنشور والأسطوانة. الارتفاع لا العامد.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'sphere-composite',
        stage: 'volumes',
        title: say('Esfera eta gorputz konposatuak', 'Esfera y cuerpos compuestos', 'الكرة والأجسام المركّبة'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuena zatitan banatuz.', 'Calcular el volumen de la esfera y el de cuerpos compuestos descomponiéndolos.', 'حساب حجم الكرة وحجم الأجسام المركّبة بتجزئتها.'),
        explanation: say(
            'Esferaren bolumena inguratzen duen zilindroaren bi heren da: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. 3 erradiokoak $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$ du, eta esfera-erdiak erdia, $\\dfrac{2}{3}\\pi r^{3}$. Gorputz konposatu batean (siloa, izozki-konoa, kapsula…), banatu gorputz ezagunetan eta batu bolumenak; zulo bat badu, kendu. Azalerarekin, berriz, kontuz: bi zatien arteko elkargunea ez da kanpoaldea, eta ez da zenbatzen. Erradioa bolumenetik ateratzeko, erro kubikoa behar da: $\\dfrac{4}{3}\\pi r^{3}=V$ bada, $r=\\sqrt[3]{\\dfrac{3V}{4\\pi}}$.',
            'El volumen de la esfera es dos tercios del cilindro que la envuelve: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. La de radio 3 tiene $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$, y la semiesfera, la mitad, $\\dfrac{2}{3}\\pi r^{3}$. En un cuerpo compuesto (un silo, un cucurucho, una cápsula…), descompón en cuerpos conocidos y suma los volúmenes; si tiene un hueco, réstalo. Con el área, en cambio, cuidado: la unión entre las dos partes no es superficie exterior y no se cuenta. Para sacar el radio a partir del volumen hace falta una raíz cúbica: si $\\dfrac{4}{3}\\pi r^{3}=V$, $r=\\sqrt[3]{\\dfrac{3V}{4\\pi}}$.',
            'حجم الكرة ثلثا الأسطوانة المحيطة بها: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. فللكرة التي نصف قطرها 3 حجم $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$، ولنصف الكرة النصف، $\\dfrac{2}{3}\\pi r^{3}$. وفي الجسم المركّب (صومعة، مخروط مثلّجات، كبسولة…) جزّئ إلى أجسام معروفة واجمع الحجوم؛ وإذا كان فيه تجويف فاطرحه. أما المساحة فانتبه: موضع التقاء الجزأين ليس سطحًا خارجيًا ولا يُحسب. ولإيجاد نصف القطر من الحجم يلزم جذر تكعيبي: إذا كان $\\dfrac{4}{3}\\pi r^{3}=V$ فإن $r=\\sqrt[3]{\\dfrac{3V}{4\\pi}}$.'
        ),
        problem: say('Silo bat 3 m-ko erradioko eta 10 m-ko altuerako zilindro bat da, gainean esfera-erdi bat duela. Kalkulatu bolumena.', 'Un silo es un cilindro de 3 m de radio y 10 m de altura con una semiesfera encima. Calcula su volumen.', 'صومعة أسطوانة نصف قطرها 3 م وارتفاعها 10 م وفوقها نصف كرة. احسب حجمها.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zilindroa.', 'El cilindro.', 'الأسطوانة.'), math: same('$3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$') },
            { text: say('Esfera-erdia: esferaren erdia.', 'La semiesfera: media esfera.', 'نصف الكرة: نصف الكرة الكاملة.'), math: same('$\\dfrac{2}{3}\\cdot 3{,}14\\cdot 3^{3}=56{,}52$') },
            { text: say('Batu: 339,12 m³.', 'Suma: 339,12 m³.', 'اجمع: 339.12 م³.'), math: same('$282{,}6+56{,}52=339{,}12$') }
        ],
        example: same('$V=\\dfrac{4}{3}\\pi r^{3}$'),
        takeaway: say('Esfera: 4/3 πr³. Konposatuak: banatu eta batu; zuloak kendu.', 'Esfera: 4/3 πr³. Compuestos: descompón y suma; los huecos se restan.', 'الكرة: 4/3 πr³. المركّبة: جزّئ واجمع؛ والتجاويف تُطرح.'),
        figure: (language) => <CompoundSolidFigure language={language} />
    },

    /* ---------- 4. Similarity ---------- */
    {
        id: 'thales',
        stage: 'similarity',
        title: say('Talesen teorema', 'Teorema de Tales', 'مبرهنة طاليس'),
        goal: say('Talesen teorema erabiltzea zuzen paraleloek mozten dituzten segmentuak kalkulatzeko.', 'Usar el teorema de Tales para calcular segmentos cortados por rectas paralelas.', 'استعمال مبرهنة طاليس لحساب القطع التي تقطعها مستقيمات متوازية.'),
        explanation: say(
            'Bi zuzen zuzen paralelo batzuek mozten badituzte, zuzen batean sortzen diren segmentuak bestean sortzen direnekiko proportzionalak dira: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. Horrela, segmentu ezezagun bat proportzio batetik ateratzen da: zuzen batean 4 eta 6, eta bestean 5 eta $x$ badira, $\\dfrac{4}{5}=\\dfrac{6}{x}$, eta $x=7{,}5$. Alderantzizkoa ere egia da: segmentuak proportzionalak badira, zuzenak paraleloak dira. Teorema honekin segmentu bat zati berdinetan edo proportzio jakin batean bana daiteke, eta triangelu antzekoen oinarria da.',
            'Si dos rectas son cortadas por varias rectas paralelas, los segmentos que se forman en una son proporcionales a los que se forman en la otra: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. Así, un segmento desconocido sale de una proporción: si en una recta hay 4 y 6, y en la otra 5 y $x$, $\\dfrac{4}{5}=\\dfrac{6}{x}$ y $x=7{,}5$. El recíproco también es cierto: si los segmentos son proporcionales, las rectas son paralelas. Con este teorema se divide un segmento en partes iguales o en una proporción dada, y es la base de los triángulos semejantes.',
            'إذا قطعت مستقيمين عدةُ مستقيمات متوازية، فإن القطع المتكوّنة على أحدهما متناسبة مع المتكوّنة على الآخر: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. وهكذا تُستخرج قطعة مجهولة من تناسب: إذا كان على مستقيم 4 و6 وعلى الآخر 5 و$x$ فإن $\\dfrac{4}{5}=\\dfrac{6}{x}$ و$x=7{,}5$. والعكس صحيح أيضًا: إذا كانت القطع متناسبة فالمستقيمات متوازية. وبهذه المبرهنة تُقسم قطعة إلى أجزاء متساوية أو بنسبة معطاة، وهي أساس المثلثات المتشابهة.'
        ),
        problem: say('Hiru zuzen paralelok zuzen bat 4 cm eta 6 cm-ko segmentuetan mozten dute, eta beste bat 5 cm eta x-ko segmentuetan. Kalkulatu x.', 'Tres rectas paralelas cortan una recta en segmentos de 4 cm y 6 cm, y otra en segmentos de 5 cm y x. Calcula x.', 'ثلاثة مستقيمات متوازية تقطع مستقيمًا إلى قطعتين طولاهما 4 سم و6 سم، ومستقيمًا آخر إلى قطعتين 5 سم وx. احسب x.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.'), math: same('$\\dfrac{4}{5}=\\dfrac{6}{x}$') },
            { text: say('Biderkadura gurutzatua.', 'Producto cruzado.', 'الضرب التبادلي.'), math: same('$4x=30\\ \\to\\ x=7{,}5$') }
        ],
        example: same('$\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$'),
        takeaway: say('Paraleloek mozten dituzten segmentuak proportzionalak dira.', 'Los segmentos que cortan las paralelas son proporcionales.', 'القطع التي تقطعها المتوازيات متناسبة.'),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'similar-triangles',
        stage: 'similarity',
        title: say('Triangelu antzekoak', 'Triángulos semejantes', 'المثلثات المتشابهة'),
        goal: say('Bi triangelu antzekoak diren erabakitzea irizpideekin eta alde ezezagunak kalkulatzea.', 'Decidir con los criterios si dos triángulos son semejantes y calcular lados desconocidos.', 'الحكم بالمعايير على تشابه مثلثين وحساب أضلاع مجهولة.'),
        explanation: say(
            'Bi triangelu antzekoak dira angeluak berdinak eta aldeak proportzionalak badituzte; aldeen arteko zatidura antzekotasun-arrazoia da, $k$. Ez da dena egiaztatu behar; irizpide hauetako bat nahikoa da: bi angelu berdinak; bi alde proportzionalak eta haien arteko angelua berdina; edo hiru aldeak proportzionalak. Triangelu bati alde baten paraleloa den zuzen bat marrazten bazaio, triangelu txikia handiaren antzekoa da (Talesen posizioa): $AB=12$, $AD=4$ eta $AE=5$ badira, $\\dfrac{AC}{5}=\\dfrac{12}{4}$ eta $AC=15$. Horrela neurtzen dira iristen ez garen distantziak: zuhaitz baten altuera itzalarekin, edo ibai baten zabalera.',
            'Dos triángulos son semejantes si tienen los ángulos iguales y los lados proporcionales; el cociente entre lados es la razón de semejanza, $k$. No hace falta comprobarlo todo; basta uno de estos criterios: dos ángulos iguales; dos lados proporcionales y el ángulo comprendido igual; o los tres lados proporcionales. Si a un triángulo se le traza una recta paralela a un lado, el triángulo pequeño es semejante al grande (posición de Tales): si $AB=12$, $AD=4$ y $AE=5$, $\\dfrac{AC}{5}=\\dfrac{12}{4}$ y $AC=15$. Así se miden distancias a las que no se llega: la altura de un árbol con su sombra, o la anchura de un río.',
            'يتشابه مثلثان إذا تساوت زواياهما وتناسبت أضلاعهما؛ ونسبة الأضلاع هي نسبة التشابه $k$. ولا يلزم التحقق من كل شيء؛ يكفي أحد هذه المعايير: زاويتان متساويتان؛ أو ضلعان متناسبان والزاوية المحصورة بينهما متساوية؛ أو الأضلاع الثلاثة متناسبة. وإذا رُسم في مثلث مستقيم يوازي أحد أضلاعه فإن المثلث الصغير يشابه الكبير (وضع طاليس): إذا كان $AB=12$ و$AD=4$ و$AE=5$ فإن $\\dfrac{AC}{5}=\\dfrac{12}{4}$ و$AC=15$. وهكذا تُقاس مسافات لا نصل إليها: ارتفاع شجرة بظلّها، أو عرض نهر.'
        ),
        problem: say('ABC triangeluan, AB = 12 cm. BC-ren paralelo batek AB D puntuan mozten du, AD = 4 cm izanik, eta AC E puntuan, AE = 5 cm izanik. Zenbat neurtzen du AC-k?', 'En el triángulo ABC, AB = 12 cm. Una paralela a BC corta a AB en D, con AD = 4 cm, y a AC en E, con AE = 5 cm. ¿Cuánto mide AC?', 'في المثلث ABC يكون AB = 12 سم. مستقيم يوازي BC يقطع AB في D حيث AD = 4 سم، ويقطع AC في E حيث AE = 5 سم. كم طول AC؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('ADE eta ABC antzekoak dira: Talesen posizioa.', 'ADE y ABC son semejantes: posición de Tales.', 'ADE وABC متشابهان: وضع طاليس.'), math: same('$k=\\dfrac{12}{4}=3$') },
            { text: say('Biderkatu k-z.', 'Multiplica por k.', 'اضرب في k.'), math: same('$AC=3\\cdot 5=15$') }
        ],
        example: same('$\\dfrac{a\'}{a}=\\dfrac{b\'}{b}=\\dfrac{c\'}{c}=k$'),
        takeaway: say('Bi angelu berdin nahikoa dira. Paraleloak triangelu antzekoak sortzen ditu.', 'Bastan dos ángulos iguales. Una paralela forma triángulos semejantes.', 'تكفي زاويتان متساويتان. والمستقيم الموازي يكوّن مثلثين متشابهين.'),
        figure: (language) => <ThalesPositionFigure language={language} />
    },
    {
        id: 'right-theorems',
        stage: 'similarity',
        title: say('Altueraren eta katetoaren teoremak', 'Teoremas de la altura y del cateto', 'مبرهنتا الارتفاع والضلع القائم'),
        goal: say('Triangelu angeluzuzenean hipotenusarekiko altuera eta katetoak proiekzioetatik kalkulatzea.', 'Calcular en un triángulo rectángulo la altura sobre la hipotenusa y los catetos a partir de las proyecciones.', 'حساب الارتفاع على الوتر والضلعين القائمين من المسقطين في المثلث القائم.'),
        explanation: say(
            'Triangelu angeluzuzen batean, hipotenusarekiko altuerak, $h$, hiru triangelu antzeko sortzen ditu, eta hipotenusa bi zatitan banatzen du: katetoen proiekzioak, $m$ eta $n$, $m+n=a$ izanik. Antzekotasunetik bi teorema ateratzen dira. Altueraren teorema: $h^{2}=m\\cdot n$. Katetoaren teorema: kateto bakoitzaren karratua hipotenusa bider haren proiekzioa da, $b^{2}=a\\cdot n$ eta $c^{2}=a\\cdot m$. Katetoak 15 eta 20 badira, $a=25$, $n=\\dfrac{400}{25}=16$, $m=9$ eta $h=\\sqrt{9\\cdot 16}=12$. Bi teoremak batzean Pitagoras ateratzen da berriro: $b^{2}+c^{2}=a(m+n)=a^{2}$.',
            'En un triángulo rectángulo, la altura sobre la hipotenusa, $h$, forma tres triángulos semejantes y divide la hipotenusa en dos partes: las proyecciones de los catetos, $m$ y $n$, con $m+n=a$. De la semejanza salen dos teoremas. Teorema de la altura: $h^{2}=m\\cdot n$. Teorema del cateto: el cuadrado de cada cateto es la hipotenusa por su proyección, $b^{2}=a\\cdot n$ y $c^{2}=a\\cdot m$. Si los catetos miden 15 y 20, $a=25$, $n=\\dfrac{400}{25}=16$, $m=9$ y $h=\\sqrt{9\\cdot 16}=12$. Al sumar los dos teoremas del cateto vuelve a salir Pitágoras: $b^{2}+c^{2}=a(m+n)=a^{2}$.',
            'في المثلث القائم يكوّن الارتفاع على الوتر $h$ ثلاثة مثلثات متشابهة، ويقسم الوتر إلى جزأين: مسقطي الضلعين القائمين $m$ و$n$، حيث $m+n=a$. ومن التشابه تنتج مبرهنتان. مبرهنة الارتفاع: $h^{2}=m\\cdot n$. مبرهنة الضلع القائم: مربع كل ضلع قائم يساوي الوتر في مسقطه، $b^{2}=a\\cdot n$ و$c^{2}=a\\cdot m$. إذا كان الضلعان القائمان 15 و20 فإن $a=25$ و$n=\\dfrac{400}{25}=16$ و$m=9$ و$h=\\sqrt{9\\cdot 16}=12$. وبجمع مبرهنتي الضلع القائم نحصل مجددًا على فيثاغورس: $b^{2}+c^{2}=a(m+n)=a^{2}$.'
        ),
        problem: say('Triangelu angeluzuzen batean, katetoen proiekzioak hipotenusan 20 cm eta 22,05 cm dira. Kalkulatu altuera eta kateto txikia.', 'En un triángulo rectángulo, las proyecciones de los catetos sobre la hipotenusa miden 20 cm y 22,05 cm. Calcula la altura y el cateto menor.', 'في مثلث قائم، مسقطا الضلعين القائمين على الوتر 20 سم و22.05 سم. احسب الارتفاع والضلع القائم الأصغر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altueraren teorema.', 'Teorema de la altura.', 'مبرهنة الارتفاع.'), math: same('$h^{2}=20\\cdot 22{,}05=441\\ \\to\\ h=21$') },
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.'), math: same('$a=20+22{,}05=42{,}05$') },
            { text: say('Katetoaren teorema, proiekzio txikiarekin.', 'Teorema del cateto, con la proyección menor.', 'مبرهنة الضلع القائم بالمسقط الأصغر.'), math: same('$c^{2}=42{,}05\\cdot 20=841\\ \\to\\ c=29$') }
        ],
        example: same('$h^{2}=m\\cdot n$'),
        takeaway: say('Altuera: h² = m · n. Katetoa: b² = a · n, bere proiekzioarekin.', 'Altura: h² = m · n. Cateto: b² = a · n, con su proyección.', 'الارتفاع: h² = m · n. الضلع القائم: b² = a · n بمسقطه.'),
        figure: (language) => <RightTheoremsFigure language={language} />
    },

    /* ---------- 5. Ratio of similarity and scales ---------- */
    {
        id: 'ratio-powers',
        stage: 'ratios',
        title: say('Azalerak eta bolumenak: k² eta k³', 'Áreas y volúmenes: k² y k³', 'المساحات والحجوم: k² وk³'),
        goal: say('Bi irudi edo gorputz antzekoren perimetro, azalera eta bolumenak antzekotasun-arrazoiarekin lotzea.', 'Relacionar perímetros, áreas y volúmenes de figuras y cuerpos semejantes con la razón de semejanza.', 'ربط محيطات ومساحات وحجوم الأشكال والأجسام المتشابهة بنسبة التشابه.'),
        explanation: say(
            'Bi irudi antzekoren arrazoia $k$ bada, luzera guztiak $k$ aldiz handiagoak dira: aldeak, perimetroak, altuerak, diagonalak. Azalerak, ordea, $k^{2}$ aldiz: luzera bi aldiz biderkatzen baitira. Eta bolumenak $k^{3}$ aldiz. 96 cm²-ko azalera eta 48 cm³-ko bolumena dituen piramide batetik $k=0{,}5$ arrazoiko bat egiten bada, haren azalera $0{,}25\\cdot 96=24$ da eta bolumena $0{,}125\\cdot 48=6$. Alderantziz, bolumenen zatidurak $k^{3}$ ematen du, eta $k$ erro kubikoarekin ateratzen da: $\\dfrac{343}{8}$ bada, $k=\\dfrac{7}{2}=3{,}5$.',
            'Si la razón de dos figuras semejantes es $k$, todas las longitudes son $k$ veces mayores: lados, perímetros, alturas, diagonales. Las áreas, en cambio, $k^{2}$ veces, porque se multiplican dos longitudes. Y los volúmenes, $k^{3}$ veces. Si de una pirámide de 96 cm² de área y 48 cm³ de volumen se hace otra de razón $k=0{,}5$, su área es $0{,}25\\cdot 96=24$ y su volumen $0{,}125\\cdot 48=6$. Al revés, el cociente de volúmenes da $k^{3}$, y $k$ sale con la raíz cúbica: si es $\\dfrac{343}{8}$, $k=\\dfrac{7}{2}=3{,}5$.',
            'إذا كانت نسبة شكلين متشابهين $k$ فإن جميع الأطوال أكبر $k$ مرة: الأضلاع والمحيطات والارتفاعات والأقطار. أما المساحات فأكبر $k^{2}$ مرة لأنها حاصل ضرب طولين. والحجوم أكبر $k^{3}$ مرة. إذا صُنع من هرم مساحته 96 سم² وحجمه 48 سم³ هرمٌ آخر بنسبة $k=0{,}5$ فإن مساحته $0{,}25\\cdot 96=24$ وحجمه $0{,}125\\cdot 48=6$. وبالعكس، نسبة الحجوم تعطي $k^{3}$، ويُستخرج $k$ بالجذر التكعيبي: إذا كانت $\\dfrac{343}{8}$ فإن $k=\\dfrac{7}{2}=3{,}5$.'
        ),
        problem: say('Bi gorputz antzekoren bolumenak 8 cm³ eta 343 cm³ dira. Zein da antzekotasun-arrazoia? Txikiaren azalera 12 cm² bada, zenbat da handiarena?', 'Dos cuerpos semejantes tienen 8 cm³ y 343 cm³ de volumen. ¿Cuál es la razón de semejanza? Si el área del pequeño es 12 cm², ¿cuánto es la del grande?', 'جسمان متشابهان حجماهما 8 سم³ و343 سم³. ما نسبة التشابه؟ وإذا كانت مساحة الصغير 12 سم² فكم مساحة الكبير؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumenen zatidura k³ da.', 'El cociente de volúmenes es k³.', 'نسبة الحجوم هي k³.'), math: same('$k^{3}=\\dfrac{343}{8}\\ \\to\\ k=\\dfrac{7}{2}=3{,}5$') },
            { text: say('Azalerak k²-z biderkatzen dira.', 'Las áreas se multiplican por k².', 'المساحات تُضرب في k².'), math: same('$12\\cdot 3{,}5^{2}=147$') }
        ],
        example: same('$k,\\ k^{2},\\ k^{3}$'),
        takeaway: say('Luzerak × k, azalerak × k², bolumenak × k³.', 'Longitudes × k, áreas × k², volúmenes × k³.', 'الأطوال × k، المساحات × k²، الحجوم × k³.'),
        figure: (language) => <VolumeRatioFigure language={language} />
    },
    {
        id: 'frustums',
        stage: 'ratios',
        title: say('Kono- eta piramide-enborrak', 'Troncos de cono y de pirámide', 'جذوع المخاريط والأهرام'),
        goal: say('Enbor baten bolumena bi gorputz antzekoren arteko kenketa gisa kalkulatzea.', 'Calcular el volumen de un tronco como la diferencia de dos cuerpos semejantes.', 'حساب حجم الجذع بوصفه فرق جسمين متشابهين.'),
        explanation: say(
            'Kono bat oinarriaren paraleloa den plano batek mozten badu, goian kono txiki bat geratzen da, handiaren antzekoa, eta behean enbor bat. Enborraren bolumena kono handia ken txikia da. Txikiaren altuera, $x$, antzekotasunetik ateratzen da: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. $R=6$, $r=3$ eta $h=4$ badira, $\\dfrac{x}{3}=\\dfrac{x+4}{6}$, $6x=3x+12$ eta $x=4$; orduan $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$. Piramide-enborra berdin kalkulatzen da, oinarri poligonalekin. Formula zuzena ere badago: $V=\\dfrac{\\pi h}{3}(R^{2}+Rr+r^{2})$, eta emaitza bera ematen du.',
            'Si un plano paralelo a la base corta un cono, arriba queda un cono pequeño, semejante al grande, y abajo un tronco. El volumen del tronco es el cono grande menos el pequeño. La altura del pequeño, $x$, sale de la semejanza: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. Si $R=6$, $r=3$ y $h=4$, $\\dfrac{x}{3}=\\dfrac{x+4}{6}$, $6x=3x+12$ y $x=4$; entonces $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$. El tronco de pirámide se calcula igual, con bases poligonales. También hay una fórmula directa: $V=\\dfrac{\\pi h}{3}(R^{2}+Rr+r^{2})$, que da el mismo resultado.',
            'إذا قطع مستوٍ موازٍ للقاعدة مخروطًا، يبقى في الأعلى مخروط صغير يشابه الكبير، وفي الأسفل جذع. وحجم الجذع هو المخروط الكبير ناقص الصغير. ويُستخرج ارتفاع الصغير $x$ من التشابه: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. إذا كان $R=6$ و$r=3$ و$h=4$ فإن $\\dfrac{x}{3}=\\dfrac{x+4}{6}$ و$6x=3x+12$ و$x=4$؛ وعندئذ $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$. ويُحسب جذع الهرم بالطريقة نفسها بقواعد مضلعة. وتوجد أيضًا صيغة مباشرة: $V=\\dfrac{\\pi h}{3}(R^{2}+Rr+r^{2})$، وتعطي النتيجة نفسها.'
        ),
        problem: say('Piramide-enbor karratu baten oinarrien aldeak 40 cm eta 16 cm dira, eta altuera 9 cm. Kalkulatu bolumena.', 'Un tronco de pirámide cuadrangular tiene bases de 40 cm y 16 cm de lado y 9 cm de altura. Calcula su volumen.', 'جذع هرم رباعي ضلعا قاعدتيه 40 سم و16 سم وارتفاعه 9 سم. احسب حجمه.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Piramide txikiaren altuera, antzekotasunez.', 'Altura de la pirámide pequeña, por semejanza.', 'ارتفاع الهرم الصغير بالتشابه.'), math: same('$\\dfrac{x}{16}=\\dfrac{x+9}{40}\\ \\to\\ x=6$') },
            { text: say('Handia ken txikia.', 'La grande menos la pequeña.', 'الكبير ناقص الصغير.'), math: same('$\\dfrac{1600\\cdot 15}{3}-\\dfrac{256\\cdot 6}{3}=8000-512$') },
            { text: say('Bolumena: 7488 cm³.', 'Volumen: 7488 cm³.', 'الحجم: 7488 سم³.'), math: same('$8000-512=7488$') }
        ],
        example: same('$\\dfrac{x}{r}=\\dfrac{x+h}{R}$'),
        takeaway: say('Enborra = gorputz handia − txikia; txikiaren altuera antzekotasunez.', 'Tronco = cuerpo grande − pequeño; la altura del pequeño, por semejanza.', 'الجذع = الجسم الكبير − الصغير؛ وارتفاع الصغير بالتشابه.'),
        figure: (language) => <FrustumFigure language={language} />
    },
    {
        id: 'models',
        stage: 'ratios',
        title: say('Maketak, planoak eta eskalak', 'Maquetas, planos y escalas', 'المجسّمات والمخططات والمقاييس'),
        goal: say('Eskala batekin luzerak, azalerak eta bolumenak errealitatera eta alderantziz pasatzea.', 'Pasar longitudes, áreas y volúmenes de una escala a la realidad y al revés.', 'تحويل الأطوال والمساحات والحجوم من المقياس إلى الواقع وبالعكس.'),
        explanation: say(
            '$1:n$ eskala batek esan nahi du maketako unitate bat errealitatean $n$ dela: antzekotasun-arrazoia $n$ da. Beraz, luzera errealak $n$ aldiz handiagoak dira, azalerak $n^{2}$ aldiz eta bolumenak $n^{3}$ aldiz. 1:500 eskalako maketa batean 402 cm²-ko oihal bat errealitatean $402\\cdot 250\\,000=100\\,500\\,000$ cm² da, hau da, $10\\,050$ m². Eskala bera aurkitzeko, zatitu neurri erreala maketakoarekin, unitate berean: 30,6 m-ko estatua batek 170 cm-ko pertsona bat irudikatzen badu, $3060\\mathbin{:}170=18$, eskala 18:1 da (handitzea). Unitateak aldatzean kontuz: 1 m² = 10 000 cm² eta 1 m³ = 1 000 000 cm³.',
            'Una escala $1:n$ significa que una unidad de la maqueta es $n$ en la realidad: la razón de semejanza es $n$. Por eso las longitudes reales son $n$ veces mayores, las áreas $n^{2}$ veces y los volúmenes $n^{3}$ veces. En una maqueta a escala 1:500, una tela de 402 cm² es en la realidad $402\\cdot 250\\,000=100\\,500\\,000$ cm², es decir, $10\\,050$ m². Para hallar la escala, divide la medida real entre la de la maqueta, en la misma unidad: si una estatua de 30,6 m representa a una persona de 170 cm, $3060\\mathbin{:}170=18$, la escala es 18:1 (una ampliación). Cuidado al cambiar de unidad: 1 m² = 10 000 cm² y 1 m³ = 1 000 000 cm³.',
            'المقياس $1:n$ يعني أن وحدة في المجسّم تساوي $n$ في الواقع: نسبة التشابه $n$. لذلك تكون الأطوال الحقيقية أكبر $n$ مرة، والمساحات $n^{2}$ مرة، والحجوم $n^{3}$ مرة. في مجسّم بمقياس 1:500، قماش مساحته 402 سم² يساوي في الواقع $402\\cdot 250\\,000=100\\,500\\,000$ سم²، أي $10\\,050$ م². ولإيجاد المقياس اقسم القياس الحقيقي على قياس المجسّم بالوحدة نفسها: إذا كان تمثال طوله 30.6 م يمثّل شخصًا طوله 170 سم فإن $3060\\mathbin{:}170=18$، والمقياس 18:1 (تكبير). وانتبه عند تغيير الوحدة: 1 م² = 10 000 سم² و1 م³ = 1 000 000 سم³.'
        ),
        problem: say('1:200 eskalako maketa batean, eraikin batek 15 cm²-ko lurra hartzen du. Zenbat m² hartzen ditu eraikin errealak?', 'En una maqueta a escala 1:200, un edificio ocupa 15 cm² de suelo. ¿Cuántos m² ocupa el edificio real?', 'في مجسّم بمقياس 1:200 يشغل مبنى 15 سم² من الأرض. كم م² يشغل المبنى الحقيقي؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azalerak n²-z biderkatzen dira.', 'Las áreas se multiplican por n².', 'المساحات تُضرب في n².'), math: same('$15\\cdot 200^{2}=600\\,000$') },
            { text: say('cm²-tik m²-ra: zati 10 000.', 'De cm² a m²: entre 10 000.', 'من سم² إلى م²: على 10 000.'), math: same('$600\\,000\\mathbin{:}10\\,000=60$') }
        ],
        example: same('$1:n$'),
        takeaway: say('1:n eskala: luzerak × n, azalerak × n², bolumenak × n³.', 'Escala 1:n: longitudes × n, áreas × n², volúmenes × n³.', 'المقياس 1:n: الأطوال × n، المساحات × n²، الحجوم × n³.'),
        figure: (language) => <PlanFigure language={language} />
    }
]
