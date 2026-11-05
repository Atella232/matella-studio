import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CriteriaFigure,
    DivideFigure,
    HomothetyFigure,
    MirrorFigure,
    PlanFigure,
    RatiosFigure,
    ScaleFigure,
    ShadowFigure,
    SightFigure,
    SimilarFiguresFigure,
    ThalesFigure,
    ThalesPositionFigure,
    VolumeRatioFigure
} from './figures'
import { similarityLessonChecks, type SimilarityTopicId } from './lessonChecks'
import { similarityLessonTexts } from './lessonTexts'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — stages and lessons, following
   Santillana Aplicadas 4, unit 6 (Semejanza. Aplicaciones: Thales and
   dividing segments, similar figures and triangles, homothety, ratios of
   perimeters and areas, scales) and the similarity part of Anaya Aplicadas
   4, unit 10 (volumes of similar bodies, heights by shadows, mirrors and
   lines of sight).
   ========================================================================== */

export type SimilarityStageId = 'thales' | 'similarity' | 'ratios' | 'scales' | 'heights'

export const similarityStages: UnitStage[] = [
    { id: 'thales', tone: 'blue', title: { eu: 'Talesen teorema', es: 'Teorema de Tales', en: 'Thales\' theorem', ar: 'مبرهنة طاليس' } },
    { id: 'similarity', tone: 'violet', title: { eu: 'Irudi antzekoak', es: 'Figuras semejantes', en: 'Similar figures', ar: 'الأشكال المتشابهة' } },
    { id: 'ratios', tone: 'mustard', title: { eu: 'Perimetroak, azalerak eta bolumenak', es: 'Perímetros, áreas y volúmenes', en: 'Perimeters, areas and volumes', ar: 'المحيطات والمساحات والحجوم' } },
    { id: 'scales', tone: 'coral', title: { eu: 'Eskalak', es: 'Escalas', en: 'Scales', ar: 'المقاييس' } },
    { id: 'heights', tone: 'green', title: { eu: 'Altuerak eta distantziak', es: 'Alturas y distancias', en: 'Heights and distances', ar: 'الارتفاعات والمسافات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Thales ---------- */
    {
        id: 'thales',
        stage: 'thales',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'thales', title: { eu: 'Talesen teorema', es: 'El teorema de Tales', en: 'Thales\' theorem', ar: 'مبرهنة طاليس' } }],
        title: say('Talesen teorema', 'El teorema de Tales', 'مبرهنة طاليس', 'Thales\' theorem'),
        goal: say('Zuzen paraleloek bi zuzenetan mozten dituzten zuzenki-zatiak proportzionalak direla erabiltzea.', 'Usar que los segmentos que determinan unas rectas paralelas sobre dos rectas son proporcionales.', 'استعمال أن القطع التي تحدّدها مستقيمات متوازية على مستقيمين متناسبة.', 'Use the fact that the segments that parallel lines cut on two lines are proportional.'),
        problem: say('Paraleloek $r$ zuzenean 3 cm eta 3,5 cm-ko zatiak mozten dituzte, eta $s$ zuzenean 4 cm eta x. Kalkulatu x.', 'Unas paralelas cortan en la recta $r$ segmentos de 3 cm y 3,5 cm, y en la recta $s$, de 4 cm y x. Calcula x.', 'تقطع متوازيات على المستقيم $r$ قطعتين 3 سم و3.5 سم، وعلى $s$ قطعتين 4 سم وx. احسب x.', 'Some parallel lines cut line $r$ in segments of 3 cm and 3.5 cm, and line $s$ in segments of 4 cm and x. Calculate x.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi proportzioa.', 'Escribe la proporción.', 'اكتب التناسب.', 'Write the proportion.'), math: same('$\\dfrac{3}{4}=\\dfrac{3{,}5}{x}$') },
            { text: say('Gurutzeko biderkadura.', 'Producto en cruz.', 'الضرب التبادلي.', 'Cross-multiplication.'), math: same('$x=\\dfrac{4\\cdot 3{,}5}{3}\\approx 4{,}67$') }
        ],
        takeaway: say('Paraleloek bi zuzenetan mozten dituzten zatiak proportzionalak dira.', 'Las paralelas cortan dos rectas en segmentos proporcionales.', 'المتوازيات تقطع مستقيمين في قطع متناسبة.', 'Parallel lines cut two lines into proportional segments.'),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'thales',
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'direct-share', title: { eu: 'Banaketa zuzenki proportzionala', es: 'Reparto directamente proporcional', en: 'Sharing in direct proportion', ar: 'التوزيع الطردي' } }],
        title: say('Zuzenki bat zatitzea', 'Dividir un segmento', 'تقسيم قطعة', 'Divide a segment'),
        goal: say('Zuzenki bat zati berdinetan edo zati proportzionaletan banatzea Talesen teorema erabiliz.', 'Dividir un segmento en partes iguales o en partes proporcionales usando el teorema de Tales.', 'تقسيم قطعة إلى أجزاء متساوية أو متناسبة باستعمال مبرهنة طاليس.', 'Divide a segment into equal or proportional parts using Thales\' theorem.'),
        problem: say('Banatu 15 cm-ko zuzenki bat 1, 3 eta 5 zenbakien zati proportzionaletan. Zenbat neurtzen du zati handienak?', 'Divide un segmento de 15 cm en partes proporcionales a 1, 3 y 5. ¿Cuánto mide la parte mayor?', 'قسّم قطعة طولها 15 سم إلى أجزاء متناسبة مع 1 و3 و5. كم طول الجزء الأكبر؟', 'Divide a segment of 15 cm into parts proportional to 1, 3 and 5. How long is the largest part?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati guztiak batera.', 'Todas las partes juntas.', 'الأجزاء كلها معًا.', 'All the parts together.'), math: same('$1+3+5=9$') },
            { text: say('Zati handiena: 9 zatitatik 5.', 'La parte mayor: 5 de 9.', 'الجزء الأكبر: 5 من 9.', 'The largest part: 5 out of 9.'), math: same('$\\dfrac{15\\cdot 5}{9}\\approx 8{,}33$') }
        ],
        takeaway: say('Marraztu erdizuzen bat, markatu zati berdinak eta marraztu paraleloak.', 'Traza una semirrecta, marca trozos iguales y traza paralelas.', 'ارسم نصف مستقيم وعلّم أجزاء متساوية وارسم متوازيات.', 'Draw a ray, mark equal pieces and draw parallel lines.'),
        figure: (language) => <DivideFigure language={language} />
    },
    {
        id: 'thales-position',
        stage: 'thales',
        title: say('Triangeluak Tales posizioan', 'Triángulos en posición de Tales', 'مثلثات في وضع طاليس', 'Triangles in Thales\' position'),
        goal: say('Tales posizioan dauden triangeluak ezagutzea eta haien alde ezezagunak kalkulatzea.', 'Reconocer triángulos en posición de Tales y calcular sus lados desconocidos.', 'التعرّف إلى المثلثات في وضع طاليس وحساب أضلاعها المجهولة.', 'Recognise triangles in Thales\' position and calculate their unknown sides.'),
        problem: say('Tales posizioan dauden bi triangelutan, $AB\'=4$, $B\'B=6$ eta $B\'C\'=3$. Kalkulatu BC.', 'En dos triángulos en posición de Tales, $AB\'=4$, $B\'B=6$ y $B\'C\'=3$. Calcula BC.', 'في مثلثين في وضع طاليس $AB\'=4$ و$B\'B=6$ و$B\'C\'=3$. احسب BC.', 'In two triangles in Thales\' position, $AB\'=4$, $B\'B=6$ and $B\'C\'=3$. Calculate BC.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde osoa.', 'El lado entero.', 'الضلع كاملًا.', 'The whole side.'), math: same('$AB=4+6=10$') },
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.', 'Proportion.'), math: same('$\\dfrac{10}{4}=\\dfrac{BC}{3}$') },
            { text: say('BC = 7,5.', 'BC = 7,5.', 'BC = 7.5.', 'BC = 7.5.'), math: same('$BC=\\dfrac{10\\cdot 3}{4}=7{,}5$') }
        ],
        takeaway: say('Angelu berbera eta alde paraleloak: aldeak proportzionalak. Erabili alde osoak.', 'Ángulo común y lados paralelos: lados proporcionales. Usa los lados enteros.', 'زاوية مشتركة وضلعان متوازيان: أضلاع متناسبة. استعمل الأضلاع كاملة.', 'Common angle and parallel sides: proportional sides. Use the whole sides.'),
        figure: (language) => <ThalesPositionFigure language={language} />
    },

    /* ---------- 2. Similar figures ---------- */
    {
        id: 'similar-figures',
        stage: 'similarity',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'similar-triangles', title: { eu: 'Triangelu antzekoak', es: 'Triángulos semejantes', en: 'Similar triangles', ar: 'المثلثات المتشابهة' } }],
        title: say('Irudi antzekoak', 'Figuras semejantes', 'الأشكال المتشابهة', 'Similar figures'),
        goal: say('Bi irudi antzekoak diren erabakitzea eta antzekotasun-arrazoia kalkulatzea eta erabiltzea.', 'Decidir si dos figuras son semejantes y calcular y usar la razón de semejanza.', 'تقرير ما إذا كان شكلان متشابهين وحساب نسبة التشابه واستعمالها.', 'Decide whether two figures are similar, and calculate and use the scale factor.'),
        problem: say('Laukizuzen batek 4 cm eta 8 cm neurtzen ditu; beste batek 4,8 cm eta 9,6 cm. Antzekoak dira? Zein da arrazoia?', 'Un rectángulo mide 4 cm por 8 cm y otro 4,8 cm por 9,6 cm. ¿Son semejantes? ¿Cuál es la razón?', 'مستطيل بعداه 4 سم و8 سم وآخر 4.8 سم و9.6 سم. هل هما متشابهان؟ ما النسبة؟', 'A rectangle measures 4 cm by 8 cm and another 4.8 cm by 9.6 cm. Are they similar? What is the ratio?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu alde homologoak.', 'Compara los lados homólogos.', 'قارن الأضلاع المتناظرة.', 'Compare the corresponding sides.'), math: same('$\\dfrac{4{,}8}{4}=1{,}2\\qquad \\dfrac{9{,}6}{8}=1{,}2$') },
            { text: say('Zatidura bera: antzekoak dira, $r=1{,}2$.', 'Mismo cociente: son semejantes, $r=1{,}2$.', 'خارج القسمة نفسه: متشابهان، $r=1{,}2$.', 'Same ratio: they are similar, $r=1{,}2$.') }
        ],
        takeaway: say('Antzekoak: angelu berdinak eta alde proportzionalak. Zatidura arrazoia da.', 'Semejantes: ángulos iguales y lados proporcionales. El cociente es la razón.', 'متشابهان: زوايا متساوية وأضلاع متناسبة. خارج القسمة هو النسبة.', 'Similar: equal angles and proportional sides. The ratio between them is the scale factor.'),
        figure: (language) => <SimilarFiguresFigure language={language} />
    },
    {
        id: 'criteria',
        stage: 'similarity',
        title: say('Triangeluen irizpideak', 'Criterios de semejanza de triángulos', 'معايير تشابه المثلثات', 'Similarity tests for triangles'),
        goal: say('Hiru irizpideetako bat erabiliz bi triangelu antzekoak direla erabakitzea.', 'Decidir con uno de los tres criterios si dos triángulos son semejantes.', 'تقرير تشابه مثلثين بأحد المعايير الثلاثة.', 'Decide with one of the three tests whether two triangles are similar.'),
        problem: say('Triangelu baten aldeak 10, 12 eta 16 dira, eta beste batenak 12,5, 15 eta 20. Antzekoak dira?', 'Un triángulo tiene lados 10, 12 y 16 y otro 12,5, 15 y 20. ¿Son semejantes?', 'أضلاع مثلث 10 و12 و16 وأضلاع آخر 12.5 و15 و20. هل هما متشابهان؟', 'One triangle has sides 10, 12 and 16, and another has sides 12.5, 15 and 20. Are they similar?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu aldeak ordenan.', 'Divide los lados en orden.', 'اقسم الأضلاع بالترتيب.', 'Divide the sides in order.'), math: same('$\\dfrac{10}{12{,}5}=\\dfrac{12}{15}=\\dfrac{16}{20}=0{,}8$') },
            { text: say('Hiru aldeak proportzionalak: antzekoak dira.', 'Los tres lados proporcionales: son semejantes.', 'الأضلاع الثلاثة متناسبة: متشابهان.', 'The three sides are proportional: they are similar.') }
        ],
        takeaway: say('Bi angelu berdin; edo bi alde proportzional eta angelua; edo hiru alde proportzional.', 'Dos ángulos iguales; o dos lados proporcionales y el ángulo; o tres lados proporcionales.', 'زاويتان متساويتان؛ أو ضلعان متناسبان والزاوية؛ أو ثلاثة أضلاع متناسبة.', 'Two equal angles; or two proportional sides and the angle; or three proportional sides.'),
        figure: (language) => <CriteriaFigure language={language} />
    },
    {
        id: 'homothety',
        stage: 'similarity',
        title: say('Homotezia', 'Homotecia', 'التحاكي', 'Homothety'),
        goal: say('Zentro eta arrazoi bateko homotezia batekin irudi antzekoak marraztea eta kalkulatzea.', 'Dibujar y calcular figuras semejantes con una homotecia de centro y razón dados.', 'رسم أشكال متشابهة وحسابها بتحاكٍ له مركز ونسبة معلومان.', 'Draw and calculate similar figures using a homothety with a given centre and scale factor.'),
        problem: say('O zentroko homotezia batean, $OA=3$ cm eta $OA\'=7{,}5$ cm. Zein da arrazoia? A-tik B-ra 2 cm badaude, zenbat A\'-tik B\'-ra?', 'En una homotecia de centro O, $OA=3$ cm y $OA\'=7{,}5$ cm. ¿Cuál es la razón? Si de A a B hay 2 cm, ¿cuánto hay de A\' a B\'?', 'في تحاكٍ مركزه O، $OA=3$ سم و$OA\'=7{,}5$ سم. ما النسبة؟ إذا كان من A إلى B سنتيمتران فكم من A\' إلى B\'؟', 'In a homothety with centre O, $OA=3$ cm and $OA\'=7{,}5$ cm. What is the scale factor? If the distance from A to B is 2 cm, what is the distance from A\' to B\'?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia.', 'Razón.', 'النسبة.', 'Scale factor.'), math: same('$r=\\dfrac{7{,}5}{3}=2{,}5$') },
            { text: say('Aldeak ere r bider.', 'Los lados, también por r.', 'الأضلاع أيضًا في r.', 'The sides, also times r.'), math: same('$2\\cdot 2{,}5=5$') }
        ],
        takeaway: say('Homotezia: zentro bat eta arrazoi bat. Irudia antzekoa da, alde paraleloekin.', 'Homotecia: un centro y una razón. La imagen es semejante, con lados paralelos.', 'التحاكي: مركز ونسبة. والصورة مشابهة بأضلاع متوازية.', 'Homothety: a centre and a scale factor. The image is similar, with parallel sides.'),
        figure: (language) => <HomothetyFigure language={language} />
    },

    /* ---------- 3. Perimeters, areas and volumes ---------- */
    {
        id: 'perimeter-ratio',
        stage: 'ratios',
        title: say('Perimetroen arrazoia', 'Razón de los perímetros', 'نسبة المحيطات', 'Ratio of the perimeters'),
        goal: say('Irudi antzekoen perimetroen eta luzera guztien arrazoia antzekotasun-arrazoia dela erabiltzea.', 'Usar que la razón de los perímetros y de todas las longitudes de figuras semejantes es la razón de semejanza.', 'استعمال أن نسبة المحيطات وكل الأطوال في الأشكال المتشابهة هي نسبة التشابه.', 'Use the fact that the ratio of the perimeters and of all the lengths of similar figures is the scale factor.'),
        problem: say('Triangelu baten perimetroa 24 cm da. Zein da 1,5 arrazoiko triangelu antzeko baten perimetroa?', 'Un triángulo tiene 24 cm de perímetro. ¿Cuál es el perímetro de uno semejante de razón 1,5?', 'محيط مثلث 24 سم. ما محيط مثلث مشابه نسبته 1.5؟', 'A triangle has a perimeter of 24 cm. What is the perimeter of a similar triangle with scale factor 1.5?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa ere r bider.', 'El perímetro, también por r.', 'المحيط أيضًا في r.', 'The perimeter, also times r.'), math: same('$24\\cdot 1{,}5=36$') }
        ],
        takeaway: say('Luzera guztiak, perimetroa barne, r bider.', 'Todas las longitudes, también el perímetro, por r.', 'كل الأطوال، ومنها المحيط، في r.', 'All lengths, including the perimeter, times r.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'area-ratio',
        stage: 'ratios',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'scale-areas', title: { eu: 'Perimetroak, azalerak eta eskalak', es: 'Perímetros, áreas y escalas', en: 'Perimeters, areas and scales', ar: 'المحيطات والمساحات والمقاييس' } }],
        title: say('Azaleren arrazoia', 'Razón de las áreas', 'نسبة المساحات', 'Ratio of the areas'),
        goal: say('Irudi antzekoen azaleren arrazoia antzekotasun-arrazoiaren karratua dela erabiltzea.', 'Usar que la razón de las áreas de figuras semejantes es el cuadrado de la razón de semejanza.', 'استعمال أن نسبة مساحات الأشكال المتشابهة هي مربع نسبة التشابه.', 'Use the fact that the ratio of the areas of similar figures is the square of the scale factor.'),
        problem: say('Bi poligono antzekoren perimetroen arrazoia 2 da, eta handiaren azalera 120 cm². Zein da txikiaren azalera?', 'La razón de los perímetros de dos polígonos semejantes es 2 y el área del mayor, 120 cm². ¿Cuál es el área del menor?', 'نسبة محيطي مضلعين متشابهين 2 ومساحة الأكبر 120 سم². ما مساحة الأصغر؟', 'The ratio of the perimeters of two similar polygons is 2, and the area of the bigger one is 120 cm². What is the area of the smaller one?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azaleren arrazoia.', 'Razón de las áreas.', 'نسبة المساحات.', 'Ratio of the areas.'), math: same('$r^{2}=2^{2}=4$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$120\\mathbin{:}4=30$') }
        ],
        takeaway: say('Azalerak r² bider. Aldea bikoiztu: azalera lau bider.', 'Las áreas, por r². Lado doble: área cuatro veces.', 'المساحات في r². ضلع مضاعف: مساحة أربعة أضعاف.', 'The areas, times r². Double side: four times the area.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'volume-ratio',
        stage: 'ratios',
        title: say('Bolumenen arrazoia', 'Razón de los volúmenes', 'نسبة الحجوم', 'Ratio of the volumes'),
        goal: say('Gorputz antzekoen bolumenen arrazoia antzekotasun-arrazoiaren kuboa dela erabiltzea.', 'Usar que la razón de los volúmenes de cuerpos semejantes es el cubo de la razón de semejanza.', 'استعمال أن نسبة حجوم الأجسام المتشابهة هي مكعب نسبة التشابه.', 'Use the fact that the ratio of the volumes of similar solids is the cube of the scale factor.'),
        problem: say('Kaxa batek 2 L hartzen ditu. Zenbat hartuko ditu ertz guztiak 1,5 aldiz luzeagoak dituen kaxa antzeko batek?', 'Una caja tiene 2 L de capacidad. ¿Cuánto cabrá en una caja semejante con todas las aristas 1,5 veces más largas?', 'سعة صندوق 2 L. كم يسع صندوق مشابه كل أحرفه أطول بـ 1.5 مرة؟', 'A box has a capacity of 2 L. How much will fit in a similar box with all its edges 1.5 times longer?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumenen arrazoia.', 'Razón de los volúmenes.', 'نسبة الحجوم.', 'Ratio of the volumes.'), math: same('$1{,}5^{3}=3{,}375$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$2\\cdot 3{,}375=6{,}75$') }
        ],
        takeaway: say('Luzerak r, azalerak r², bolumenak r³.', 'Longitudes r, áreas r², volúmenes r³.', 'الأطوال r، والمساحات r²، والحجوم r³.', 'Lengths r, areas r², volumes r³.'),
        figure: (language) => <VolumeRatioFigure language={language} />
    },

    /* ---------- 4. Scales ---------- */
    {
        id: 'scale',
        stage: 'scales',
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'scale', title: { eu: 'Eskalak: planoak eta mapak', es: 'Escalas: planos y mapas', en: 'Scales: plans and maps', ar: 'المقاييس: المخططات والخرائط' } }],
        title: say('Eskala eta mapak', 'Escala y mapas', 'المقياس والخرائط', 'Scale and maps'),
        goal: say('Mapa edo plano bateko distantziak errealitatekoetara eta alderantziz igarotzea eskala erabiliz.', 'Pasar distancias de un mapa o plano a la realidad y al revés usando la escala.', 'تحويل المسافات من الخريطة أو المخطط إلى الواقع وبالعكس باستعمال المقياس.', 'Convert distances on a map or plan into real distances, and back, using the scale.'),
        problem: say('1:300\u00a0000 eskalako mapa batean, bi herri 4 cm-ra daude. Zenbat km daude benetan?', 'En un mapa a escala 1:300 000, dos pueblos están a 4 cm. ¿A cuántos km están en realidad?', 'في خريطة بمقياس 1:300\u00a0000 تبعد قريتان 4 سم. كم كيلومترًا تبعدان في الواقع؟', 'On a map at a scale of 1:300,000, two villages are 4 cm apart. How far apart are they in reality, in km?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu n-z.', 'Multiplica por n.', 'اضرب في n.', 'Multiply by n.'), math: same('$4\\cdot 300\\,000=1\\,200\\,000$') },
            { text: say('cm-tik km-ra: zatitu 100\u00a0000 zenbakiaz.', 'De cm a km: divide entre 100\u00a0000.', 'من سم إلى كم: اقسم على 100\u00a0000.', 'From cm to km: divide by 100,000.'), math: same('$1\\,200\\,000\\mathbin{:}100\\,000=12$') }
        ],
        takeaway: say('Errealitatea = mapa bider n. Gero aldatu unitatea.', 'Realidad = mapa por n. Después cambia la unidad.', 'الواقع = الخريطة في n. ثم غيّر الوحدة.', 'Real = map times n. Then change the unit.'),
        figure: (language) => <ScaleFigure language={language} />
    },
    {
        id: 'find-scale',
        stage: 'scales',
        title: say('Eskala aurkitzea', 'Hallar la escala', 'إيجاد المقياس', 'Find the scale'),
        goal: say('Mapako eta errealitateko distantzia ezagututa eskala kalkulatzea.', 'Calcular la escala conociendo una distancia en el mapa y en la realidad.', 'حساب المقياس بمعرفة مسافة في الخريطة وفي الواقع.', 'Calculate the scale when you know a distance on the map and the real distance.'),
        problem: say('Mapa batean 6,2 cm-k 372 km adierazten dituzte. Zein da eskala?', 'En un mapa, 6,2 cm representan 372 km. ¿Cuál es la escala?', 'في خريطة تمثل 6.2 سم مسافة 372 كم. ما المقياس؟', 'On a map, 6.2 cm represents 372 km. What is the scale?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Unitate berean.', 'En la misma unidad.', 'بالوحدة نفسها.', 'In the same unit.'), math: same('$372\\ \\text{km}=37\\,200\\,000\\ \\text{cm}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$37\\,200\\,000\\mathbin{:}6{,}2=6\\,000\\,000$') },
            { text: say('Eskala 1:6\u00a0000\u00a0000.', 'Escala 1:6\u00a0000\u00a0000.', 'المقياس 1:6\u00a0000\u00a0000.', 'Scale 1:6,000,000.') }
        ],
        takeaway: say('Unitate berean jarri eta zatitu: errealitatea zati mapa.', 'Misma unidad y divide: realidad entre mapa.', 'الوحدة نفسها ثم اقسم: الواقع على الخريطة.', 'Same unit, then divide: real divided by map.'),
        figure: (language) => <ScaleFigure language={language} />
    },
    {
        id: 'plans',
        stage: 'scales',
        title: say('Planoak eta maketak', 'Planos y maquetas', 'المخططات والمجسّمات', 'Plans and models'),
        goal: say('Planoetako azalerak eta maketetako bolumenak eskalarekin kalkulatzea.', 'Calcular áreas en planos y volúmenes en maquetas con la escala.', 'حساب المساحات في المخططات والحجوم في المجسّمات بالمقياس.', 'Calculate areas on plans and volumes of models using the scale.'),
        problem: say('1:50 eskalako plano batean, gela batek 8 cm × 6 cm neurtzen ditu. Zein da benetako azalera m²-tan?', 'En un plano a escala 1:50, una habitación mide 8 cm × 6 cm. ¿Cuál es su área real en m²?', 'في مخطط بمقياس 1:50 تقيس غرفة 8 سم × 6 سم. ما مساحتها الحقيقية بالمتر المربع؟', 'On a plan at a scale of 1:50, a room measures 8 cm × 6 cm. What is its real area in m²?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Luzerak.', 'Longitudes.', 'الأطوال.', 'Lengths.'), math: same('$8\\cdot 50=400\\quad 6\\cdot 50=300$') },
            { text: say('Metrotan: 4 m eta 3 m.', 'En metros: 4 m y 3 m.', 'بالمتر: 4 م و3 م.', 'In metres: 4 m and 3 m.'), math: same('$4\\cdot 3=12$') }
        ],
        takeaway: say('Lehenik luzerak igaro, gero azalera. Azalerak n² bider, bolumenak n³ bider.', 'Primero pasa las longitudes, luego el área. Áreas por n², volúmenes por n³.', 'حوّل الأطوال أولًا ثم المساحة. المساحات في n² والحجوم في n³.', 'First convert the lengths, then the area. Areas multiply by n², volumes by n³.'),
        figure: (language) => <PlanFigure language={language} />
    },

    /* ---------- 5. Heights and distances ---------- */
    {
        id: 'shadows',
        stage: 'heights',
        figureAfterSteps: true,
        title: say('Itzalak', 'Sombras', 'الظلال', 'Shadows'),
        goal: say('Altuera bat itzalen bidez kalkulatzea, triangelu antzekoak erabiliz.', 'Calcular una altura mediante las sombras, usando triángulos semejantes.', 'حساب ارتفاع بواسطة الظلال باستعمال مثلثات متشابهة.', 'Calculate a height using shadows and similar triangles.'),
        problem: say('1,5 m-ko makila batek 2 m-ko itzala du, eta zuhaitz batek, une berean, 12 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 1,5 m da una sombra de 2 m y un árbol, en el mismo momento, una de 12 m. ¿Cuánto mide el árbol?', 'عصا طولها 1.5 م ظلها 2 م، وشجرة ظلها في اللحظة نفسها 12 م. كم طول الشجرة؟', 'A 1.5 m stick casts a 2 m shadow, and at the same moment a tree casts a 12 m shadow. How tall is the tree?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.', 'Proportion.'), math: same('$\\dfrac{x}{12}=\\dfrac{1{,}5}{2}$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x=\\dfrac{12\\cdot 1{,}5}{2}=9$') }
        ],
        takeaway: say('Une berean, altuerak eta itzalak proportzionalak dira.', 'En el mismo momento, alturas y sombras son proporcionales.', 'في اللحظة نفسها تتناسب الارتفاعات والظلال.', 'At the same moment, heights and shadows are proportional.'),
        figure: (language) => <ShadowFigure language={language} />
    },
    {
        id: 'mirror',
        stage: 'heights',
        figureAfterSteps: true,
        title: say('Ispilua', 'El espejo', 'المرآة', 'The mirror'),
        goal: say('Lurrean jarritako ispilu baten bidez altuera bat kalkulatzea.', 'Calcular una altura con un espejo colocado en el suelo.', 'حساب ارتفاع بمرآة موضوعة على الأرض.', 'Calculate a height using a mirror placed on the ground.'),
        problem: say('Ispilu bat eraikin batetik 15 m-ra dago. Pertsona batek, begiak 1,6 m-ra dituela, ispilutik 2 m-ra ikusten du eraikinaren goialdea. Zenbat neurtzen du eraikinak?', 'Un espejo está a 15 m de un edificio. Una persona con los ojos a 1,6 m ve lo alto del edificio estando a 2 m del espejo. ¿Cuánto mide el edificio?', 'مرآة على بعد 15 م من مبنى. يرى شخص عيناه على ارتفاع 1.6 م أعلى المبنى وهو على بعد 2 م من المرآة. كم ارتفاع المبنى؟', 'A mirror is 15 m from a building. A person whose eyes are 1.6 m high can see the top of the building when standing 2 m from the mirror. How tall is the building?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.', 'Proportion.'), math: same('$\\dfrac{x}{15}=\\dfrac{1{,}6}{2}$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x=\\dfrac{15\\cdot 1{,}6}{2}=12$') }
        ],
        takeaway: say('Ispiluan, angelu berdinak: triangelu antzekoak. Erabili begien altuera.', 'En el espejo, ángulos iguales: triángulos semejantes. Usa la altura de los ojos.', 'في المرآة زوايا متساوية: مثلثات متشابهة. استعمل ارتفاع العينين.', 'At the mirror, the angles are equal, so the triangles are similar. Use the eye height.'),
        figure: (language) => <MirrorFigure language={language} />
    },
    {
        id: 'sight',
        stage: 'heights',
        figureAfterSteps: true,
        title: say('Ikus-lerroa eta distantziak', 'Línea de visión y distancias', 'خط النظر والمسافات', 'Line of sight and distances'),
        goal: say('Ikus-lerro batek sortzen dituen triangelu antzekoekin altuerak eta distantziak kalkulatzea.', 'Calcular alturas y distancias con los triángulos semejantes que forma una línea de visión.', 'حساب الارتفاعات والمسافات بالمثلثات المتشابهة التي يكوّنها خط النظر.', 'Calculate heights and distances using the similar triangles formed by a line of sight.'),
        problem: say('Begiak 1,5 m-ra dituen pertsona bat 3 m-ko zutoin batetik 4 m-ra dago, eta zutoinaren punta eta 20 m-ra dagoen eraikin baten goialdea lerrokatuta ikusten ditu. Zenbat neurtzen du eraikinak?', 'Una persona con los ojos a 1,5 m está a 4 m de un poste de 3 m y ve alineados la punta del poste y lo alto de un edificio que está a 20 m. ¿Cuánto mide el edificio?', 'شخص عيناه على ارتفاع 1.5 م يقف على بعد 4 م من عمود طوله 3 م، ويرى رأس العمود وأعلى مبنى على بعد 20 م على استقامة واحدة. كم ارتفاع المبنى؟', 'A person with their eyes 1.5 m high stands 4 m from a 3 m pole, and sees the tip of the pole and the top of a building 20 m away in a straight line. How tall is the building?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Triangelu txikia: $3-1{,}5=1{,}5$ altuera eta 4 oinarria.', 'Triángulo pequeño: altura $3-1{,}5=1{,}5$ y base 4.', 'المثلث الصغير: الارتفاع $3-1{,}5=1{,}5$ والقاعدة 4.', 'Small triangle: height $3-1{,}5=1{,}5$ and base 4.') },
            { text: say('Triangelu handia.', 'Triángulo grande.', 'المثلث الكبير.', 'Big triangle.'), math: same('$\\dfrac{20\\cdot 1{,}5}{4}=7{,}5$') },
            { text: say('Gehitu begien altuera.', 'Suma la altura de los ojos.', 'أضف ارتفاع العينين.', 'Add the eye height.'), math: same('$7{,}5+1{,}5=9$') }
        ],
        takeaway: say('Kendu begien altuera, egin proportzioa eta gehitu berriro.', 'Resta la altura de los ojos, haz la proporción y vuelve a sumarla.', 'اطرح ارتفاع العينين واكتب التناسب ثم أضفه من جديد.', 'Subtract the eye height, set up the proportion and add it back.'),
        figure: (language) => <SightFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const similarityTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...similarityLessonTexts[topic.id as SimilarityTopicId], ...similarityLessonChecks[topic.id as SimilarityTopicId] }))
