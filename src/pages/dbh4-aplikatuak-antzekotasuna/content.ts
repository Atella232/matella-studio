import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — diagnostic, guided practice, exercise
   bank and challenges. Exercises follow Santillana Aplicadas 4, unit 6
   (x/3 = 3,5/4, the segments 3, 9, 13,5 and 16,5, the rectangles 4 × 8
   and 4,8 × 9,6, the triangles 10-12-16 and 12,5-15-20, the hexagons of
   side 3 and 0,5, the areas 16 times larger, the maps 1:300 000 and the
   armchair at 1:20) and the similarity problems of Anaya Aplicadas 4,
   unit 10 (shadows, mirrors, a line of sight). Every closed answer is a
   single number; a scale 1:n is answered with n.
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

const TENTHS = say('Hurbildu hamarrenetara.', 'Aproxima a las décimas.', 'قرّب إلى الأعشار.')
/** A prompt followed by an instruction */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

export const similarityDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4601,
        prompt: say('Paraleloek zuzen batean 2 cm eta 4 cm-ko zatiak mozten dituzte, eta bestean 3 cm eta x. Zenbat da x?', 'Unas paralelas cortan en una recta segmentos de 2 cm y 4 cm, y en otra de 3 cm y x. ¿Cuánto vale x?', 'تقطع متوازيات على مستقيم قطعتين 2 سم و4 سم وعلى آخر 3 سم وx. كم x؟'),
        options: [same('$6$'), same('$5$'), same('$2{,}67$')],
        correctIndex: 0,
        explanation: same('$\\frac{2}{3}=\\frac{4}{x}\\to x=\\frac{3\\cdot 4}{2}=6$'),
        topic: 'thales'
    },
    {
        id: 4602,
        prompt: say('12 cm-ko zuzenki bat 3 zati berdinetan banatzen da. Zenbat neurtzen du zati bakoitzak?', 'Un segmento de 12 cm se divide en 3 partes iguales. ¿Cuánto mide cada parte?', 'تُقسم قطعة طولها 12 سم إلى 3 أجزاء متساوية. كم طول كل جزء؟'),
        options: [same('$3$'), same('$4$'), same('$36$')],
        correctIndex: 1,
        explanation: same('$12\\mathbin{:}3=4$'),
        topic: 'divide'
    },
    {
        id: 4603,
        prompt: say('2 cm × 5 cm eta 4 cm × 10 cm-ko laukizuzenak antzekoak dira. Zein da handiaren eta txikiaren arteko arrazoia?', 'Los rectángulos de 2 cm × 5 cm y 4 cm × 10 cm son semejantes. ¿Cuál es la razón del grande al pequeño?', 'المستطيلان 2 سم × 5 سم و4 سم × 10 سم متشابهان. ما نسبة الكبير إلى الصغير؟'),
        options: [same('$0{,}5$'), same('$3$'), same('$2$')],
        correctIndex: 2,
        explanation: same('$\\frac{4}{2}=\\frac{10}{5}=2$'),
        topic: 'similar-figures'
    },
    {
        id: 4604,
        prompt: say('Triangelu batek 50° eta 60°-ko angeluak ditu, eta beste batek 60° eta 70°-koak. Antzekoak dira?', 'Un triángulo tiene ángulos de 50° y 60°, y otro de 60° y 70°. ¿Son semejantes?', 'لمثلث زاويتان 50° و60° ولآخر 60° و70°. هل هما متشابهان؟'),
        options: [say('Bai', 'Sí', 'نعم'), say('Ez', 'No', 'لا'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن المعرفة')],
        correctIndex: 0,
        explanation: say('Hirugarren angeluak 70° eta 50° dira: hiru angeluak berdinak.', 'Los terceros ángulos son 70° y 50°: los tres ángulos son iguales.', 'الزاويتان الثالثتان 70° و50°: الزوايا الثلاث متساوية.'),
        topic: 'criteria'
    },
    {
        id: 4605,
        prompt: say('Karratu baten aldea bikoizten bada, azalera…', 'Si el lado de un cuadrado se duplica, el área…', 'إذا تضاعف ضلع مربع فإن المساحة…'),
        options: [say('bikoiztu egiten da', 'se duplica', 'تتضاعف'), say('laukoiztu egiten da', 'se cuadruplica', 'تصبح أربعة أضعاف'), say('zortzi bider handitzen da', 'se multiplica por 8', 'تُضرب في 8')],
        correctIndex: 1,
        explanation: same('$2^{2}=4$'),
        topic: 'area-ratio'
    },
    {
        id: 4606,
        prompt: say('Kubo baten ertza hirukoizten bada, bolumena zenbat bider handitzen da?', 'Si la arista de un cubo se triplica, ¿por cuánto se multiplica el volumen?', 'إذا تضاعف حرف مكعب ثلاث مرات فبكم يُضرب الحجم؟'),
        options: [same('$9$'), same('$3$'), same('$27$')],
        correctIndex: 2,
        explanation: same('$3^{3}=27$'),
        topic: 'volume-ratio'
    },
    {
        id: 4607,
        prompt: say('1:100 000 eskalako mapa batean bi puntu 3 cm-ra daude. Zein da benetako distantzia?', 'En un mapa a escala 1:100 000 dos puntos están a 3 cm. ¿Cuál es la distancia real?', 'في خريطة بمقياس 1:100 000 تبعد نقطتان 3 سم. ما المسافة الحقيقية؟'),
        options: [say('3 km', '3 km', '3 كم'), say('300 m', '300 m', '300 م'), say('30 km', '30 km', '30 كم')],
        correctIndex: 0,
        explanation: say('$3\\cdot 100\\,000=300\\,000$ cm, hau da, 3 km.', '$3\\cdot 100\\,000=300\\,000$ cm, es decir, 3 km.', '$3\\cdot 100\\,000=300\\,000$ سم، أي 3 كم.'),
        topic: 'scale'
    },
    {
        id: 4608,
        prompt: say('1 m-ko makila batek 2 m-ko itzala du, eta zuhaitz batek 10 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 1 m da una sombra de 2 m y un árbol, una de 10 m. ¿Cuánto mide el árbol?', 'عصا طولها 1 م ظلها 2 م، وظل شجرة 10 م. كم طول الشجرة؟'),
        options: [same('$5$'), same('$20$'), same('$12$')],
        correctIndex: 0,
        explanation: say('Itzala altueraren bikoitza da: $10\\mathbin{:}2=5$.', 'La sombra es el doble de la altura: $10\\mathbin{:}2=5$.', 'الظل ضعف الارتفاع: $10\\mathbin{:}2=5$.'),
        topic: 'shadows'
    }
]

export const similarityPractice: PracticeItem[] = [
    /* ---------- Thales ---------- */
    {
        id: 1, stage: 'thales',
        prompt: say('Paraleloek $r$ zuzenean 2 cm eta 5 cm-ko zatiak mozten dituzte, eta $s$ zuzenean 3 cm eta x. Kalkulatu x.', 'Unas paralelas cortan en la recta $r$ segmentos de 2 cm y 5 cm, y en $s$ de 3 cm y x. Calcula x.', 'تقطع متوازيات على $r$ قطعتين 2 سم و5 سم وعلى $s$ قطعتين 3 سم وx. احسب x.'),
        expected: v('7,5'),
        hint: same('$\\frac{2}{3}=\\frac{5}{x}$'),
        explanation: same('$x=\\frac{3\\cdot 5}{2}=7{,}5$')
    },
    {
        id: 2, stage: 'thales',
        prompt: say('18 cm-ko zuzenki bat 4 zati berdinetan banatzen da. Zenbat neurtzen du zati bakoitzak?', 'Un segmento de 18 cm se divide en 4 partes iguales. ¿Cuánto mide cada parte?', 'تُقسم قطعة طولها 18 سم إلى 4 أجزاء متساوية. كم طول كل جزء؟'),
        expected: v('4,5'),
        hint: say('Erdizuzenean 4 marka berdin.', 'Cuatro marcas iguales en la semirrecta.', 'أربع علامات متساوية على نصف المستقيم.'),
        explanation: same('$18\\mathbin{:}4=4{,}5$')
    },
    {
        id: 3, stage: 'thales',
        prompt: say("Tales posizioan dauden bi triangelutan, $AB'=5$, $B'B=3$ eta $B'C'=4$. Kalkulatu BC.", "En dos triángulos en posición de Tales, $AB'=5$, $B'B=3$ y $B'C'=4$. Calcula BC.", "في مثلثين في وضع طاليس $AB'=5$ و$B'B=3$ و$B'C'=4$. احسب BC."),
        expected: v('6,4'),
        hint: say('Alde osoa: $AB=5+3=8$.', 'El lado entero: $AB=5+3=8$.', 'الضلع كاملًا: $AB=5+3=8$.'),
        explanation: same('$\\frac{8}{5}=\\frac{BC}{4}\\to BC=\\frac{8\\cdot 4}{5}=6{,}4$')
    },
    {
        id: 4, stage: 'thales',
        prompt: say('Banatu 30 cm-ko zuzenki bat 2, 3 eta 5 zenbakien zati proportzionaletan. Zenbat neurtzen du zati handienak?', 'Divide un segmento de 30 cm en partes proporcionales a 2, 3 y 5. ¿Cuánto mide la parte mayor?', 'قسّم قطعة طولها 30 سم إلى أجزاء متناسبة مع 2 و3 و5. كم طول الجزء الأكبر؟'),
        expected: n(15),
        hint: say('Guztira $2+3+5=10$ zati.', 'En total, $2+3+5=10$ partes.', 'المجموع $2+3+5=10$ أجزاء.'),
        explanation: same('$\\frac{30\\cdot 5}{10}=15$')
    },

    /* ---------- Similar figures ---------- */
    {
        id: 5, stage: 'similarity',
        prompt: say('6 cm × 9 cm-ko laukizuzen baten antzeko batek 10 cm-ko alde laburra du. Zenbat neurtzen du alde luzeak?', 'Un rectángulo semejante a otro de 6 cm × 9 cm tiene el lado corto de 10 cm. ¿Cuánto mide el largo?', 'مستطيل مشابه لمستطيل 6 سم × 9 سم ضلعه القصير 10 سم. كم ضلعه الطويل؟'),
        expected: n(15),
        hint: say('Arrazoia: $10\\mathbin{:}6$.', 'Razón: $10\\mathbin{:}6$.', 'النسبة: $10\\mathbin{:}6$.'),
        explanation: same('$\\frac{9\\cdot 10}{6}=15$')
    },
    {
        id: 6, stage: 'similarity',
        prompt: say('Triangelu baten aldeak 4, 6 eta 7 cm dira. Zenbat neurtzen du 2,5 arrazoiko triangelu antzeko baten alde handienak?', 'Un triángulo tiene lados de 4, 6 y 7 cm. ¿Cuánto mide el lado mayor de un triángulo semejante de razón 2,5?', 'أضلاع مثلث 4 و6 و7 سم. كم أكبر ضلع لمثلث مشابه نسبته 2.5؟'),
        expected: v('17,5'),
        hint: say('Alde guztiak r bider.', 'Todos los lados, por r.', 'كل الأضلاع في r.'),
        explanation: same('$7\\cdot 2{,}5=17{,}5$')
    },
    {
        id: 7, stage: 'similarity',
        prompt: say('3, 4 eta 5 cm-ko triangelu bat eta 6, 8 eta x cm-ko beste bat antzekoak dira. Kalkulatu x.', 'Un triángulo de 3, 4 y 5 cm y otro de 6, 8 y x cm son semejantes. Calcula x.', 'مثلث أضلاعه 3 و4 و5 سم وآخر 6 و8 وx سم متشابهان. احسب x.'),
        expected: n(10),
        hint: say('Arrazoia: $6\\mathbin{:}3$.', 'Razón: $6\\mathbin{:}3$.', 'النسبة: $6\\mathbin{:}3$.'),
        explanation: same('$\\frac{6}{3}=\\frac{8}{4}=2\\to x=5\\cdot 2=10$')
    },
    {
        id: 8, stage: 'similarity',
        prompt: say("O zentroko eta 3 arrazoiko homotezia batean, $OA=2{,}5$ cm. Zenbat da $OA'$?", "En una homotecia de centro O y razón 3, $OA=2{,}5$ cm. ¿Cuánto mide $OA'$?", "في تحاكٍ مركزه O ونسبته 3، $OA=2{,}5$ سم. كم $OA'$؟"),
        expected: v('7,5'),
        hint: same("$OA'=r\\cdot OA$"),
        explanation: same('$3\\cdot 2{,}5=7{,}5$')
    },

    /* ---------- Ratios ---------- */
    {
        id: 9, stage: 'ratios',
        prompt: say('Poligono baten perimetroa 30 cm da. Zein da 0,4 arrazoiko poligono antzeko baten perimetroa?', 'Un polígono tiene 30 cm de perímetro. ¿Cuál es el perímetro de uno semejante de razón 0,4?', 'محيط مضلع 30 سم. ما محيط مضلع مشابه نسبته 0.4؟'),
        expected: n(12),
        hint: say('Perimetroa r bider.', 'El perímetro, por r.', 'المحيط في r.'),
        explanation: same('$30\\cdot 0{,}4=12$')
    },
    {
        id: 10, stage: 'ratios',
        prompt: say('Triangelu baten azalera 12 cm² da. Zein da 3 arrazoiko triangelu antzeko baten azalera?', 'Un triángulo tiene 12 cm² de área. ¿Cuál es el área de uno semejante de razón 3?', 'مساحة مثلث 12 سم². ما مساحة مثلث مشابه نسبته 3؟'),
        expected: n(108),
        hint: say('Azalera r² bider.', 'El área, por r².', 'المساحة في r².'),
        explanation: same('$12\\cdot 3^{2}=108$')
    },
    {
        id: 11, stage: 'ratios',
        prompt: say('Bi irudi antzekoren azaleren arrazoia 25 da. Zein da haien luzeren arrazoia?', 'La razón de las áreas de dos figuras semejantes es 25. ¿Cuál es la razón de sus longitudes?', 'نسبة مساحتي شكلين متشابهين 25. ما نسبة أطوالهما؟'),
        expected: n(5),
        hint: say('Azaleren arrazoia $r^{2}$ da.', 'La razón de las áreas es $r^{2}$.', 'نسبة المساحات $r^{2}$.'),
        explanation: same('$r=\\sqrt{25}=5$')
    },
    {
        id: 12, stage: 'ratios',
        prompt: say('Gorputz baten bolumena 40 cm³ da. Zein da 2 arrazoiko gorputz antzeko baten bolumena?', 'Un cuerpo tiene 40 cm³ de volumen. ¿Cuál es el volumen de uno semejante de razón 2?', 'حجم جسم 40 سم³. ما حجم جسم مشابه نسبته 2؟'),
        expected: n(320),
        hint: say('Bolumena r³ bider.', 'El volumen, por r³.', 'الحجم في r³.'),
        explanation: same('$40\\cdot 2^{3}=320$')
    },

    /* ---------- Scales ---------- */
    {
        id: 13, stage: 'scales',
        prompt: say('1:25 000 eskalako mapa batean, bide batek 8 cm neurtzen ditu. Zenbat km dira?', 'En un mapa a escala 1:25 000 un camino mide 8 cm. ¿Cuántos km son?', 'في خريطة بمقياس 1:25 000 يبلغ طريق 8 سم. كم كيلومترًا؟'),
        expected: n(2),
        hint: say('Biderkatu eta igaro cm-tik km-ra.', 'Multiplica y pasa de cm a km.', 'اضرب وحوّل من سم إلى كم.'),
        explanation: same('$8\\cdot 25\\,000=200\\,000\\quad 200\\,000\\mathbin{:}100\\,000=2$')
    },
    {
        id: 14, stage: 'scales',
        prompt: say('Bi herri 15 km-ra daude. Zenbat cm-ra egongo dira 1:300 000 eskalako mapa batean?', 'Dos pueblos están a 15 km. ¿A cuántos cm estarán en un mapa a escala 1:300 000?', 'تبعد قريتان 15 كم. كم سنتيمترًا تبعدان في خريطة بمقياس 1:300 000؟'),
        expected: n(5),
        hint: same('$15\\ \\text{km}=1\\,500\\,000\\ \\text{cm}$'),
        explanation: same('$1\\,500\\,000\\mathbin{:}300\\,000=5$')
    },
    {
        id: 15, stage: 'scales',
        prompt: say('Mapa batean, 1 cm-k 5 km adierazten ditu. Zein da eskala 1:n moduan? Idatzi n.', 'En un mapa, 1 cm representa 5 km. ¿Cuál es la escala 1:n? Escribe n.', 'في خريطة يمثل 1 سم مسافة 5 كم. ما المقياس 1:n؟ اكتب n.'),
        expected: n(500000),
        hint: say('Jarri 5 km cm-tan.', 'Pon 5 km en cm.', 'حوّل 5 كم إلى سم.'),
        explanation: same('$5\\cdot 100\\,000=500\\,000$')
    },
    {
        id: 16, stage: 'scales',
        prompt: say('1:200 eskalako plano batean, gela batek 3 cm × 2,5 cm neurtzen ditu. Zein da benetako azalera m²-tan?', 'En un plano a escala 1:200 una habitación mide 3 cm × 2,5 cm. ¿Cuál es su área real en m²?', 'في مخطط بمقياس 1:200 تقيس غرفة 3 سم × 2.5 سم. ما مساحتها الحقيقية بالمتر المربع؟'),
        expected: n(30),
        hint: say('Lehenik luzerak: 6 m eta 5 m.', 'Primero las longitudes: 6 m y 5 m.', 'أولًا الأطوال: 6 م و5 م.'),
        explanation: same('$3\\cdot 200=600\\quad 2{,}5\\cdot 200=500\\quad 6\\cdot 5=30$')
    },

    /* ---------- Heights and distances ---------- */
    {
        id: 17, stage: 'heights',
        prompt: say('2 m-ko makila batek 1,5 m-ko itzala du, eta eraikin batek, une berean, 18 m-koa. Zenbat neurtzen du eraikinak?', 'Un palo de 2 m da una sombra de 1,5 m y un edificio, en el mismo momento, una de 18 m. ¿Cuánto mide el edificio?', 'عصا طولها 2 م ظلها 1.5 م، ومبنى ظله في اللحظة نفسها 18 م. كم ارتفاع المبنى؟'),
        expected: n(24),
        hint: same('$\\frac{x}{18}=\\frac{2}{1{,}5}$'),
        explanation: same('$x=\\frac{18\\cdot 2}{1{,}5}=24$')
    },
    {
        id: 18, stage: 'heights',
        prompt: say('Begiak 1,5 m-ra dituen pertsona batek, ispilutik 2,5 m-ra, eraikin baten goialdea ikusten du. Eraikina ispilutik 20 m-ra badago, zenbat neurtzen du?', 'Una persona con los ojos a 1,5 m, a 2,5 m de un espejo, ve en él lo alto de un edificio que está a 20 m del espejo. ¿Cuánto mide el edificio?', 'شخص عيناه على ارتفاع 1.5 م وعلى بعد 2.5 م من مرآة يرى فيها أعلى مبنى يبعد 20 م عن المرآة. كم ارتفاع المبنى؟'),
        expected: n(12),
        hint: same('$\\frac{x}{20}=\\frac{1{,}5}{2{,}5}$'),
        explanation: same('$x=\\frac{20\\cdot 1{,}5}{2{,}5}=12$')
    },
    {
        id: 19, stage: 'heights',
        prompt: say('Begiak 1,6 m-ra dituen pertsona bat 2,6 m-ko zutoin batetik 2 m-ra dago, eta zutoinaren punta eta 30 m-ra dagoen eraikin baten goialdea lerrokatuta ikusten ditu. Zenbat neurtzen du eraikinak?', 'Una persona con los ojos a 1,6 m está a 2 m de un poste de 2,6 m y ve alineados la punta del poste y lo alto de un edificio a 30 m. ¿Cuánto mide el edificio?', 'شخص عيناه على ارتفاع 1.6 م على بعد 2 م من عمود طوله 2.6 م، يرى رأسه وأعلى مبنى على بعد 30 م على استقامة واحدة. كم ارتفاع المبنى؟'),
        expected: v('16,6'),
        hint: say('Triangelu txikiaren altuera: $2{,}6-1{,}6=1$.', 'Altura del triángulo pequeño: $2{,}6-1{,}6=1$.', 'ارتفاع المثلث الصغير: $2{,}6-1{,}6=1$.'),
        explanation: same('$\\frac{30\\cdot 1}{2}=15\\quad 15+1{,}6=16{,}6$')
    },
    {
        id: 20, stage: 'heights',
        prompt: say('Erreka baten zabalera neurtzeko, bi triangelu antzeko marrazten dira. Txikiaren katetoak 3 m eta 4 m dira; handian, 4 m-koari dagokion katetoak 20 m neurtzen ditu. Zein da zabalera (3 m-koari dagokiona)?', 'Para medir el ancho de un río se forman dos triángulos semejantes. El pequeño tiene catetos de 3 m y 4 m; en el grande, el cateto que corresponde al de 4 m mide 20 m. ¿Cuánto mide el ancho (el que corresponde al de 3 m)?', 'لقياس عرض نهر يُرسم مثلثان متشابهان. ضلعا الصغير القائمان 3 م و4 م؛ وفي الكبير يبلغ الضلع المقابل لـ 4 م عشرين مترًا. كم العرض (المقابل لـ 3 م)؟'),
        expected: n(15),
        hint: say('Arrazoia: $20\\mathbin{:}4$.', 'Razón: $20\\mathbin{:}4$.', 'النسبة: $20\\mathbin{:}4$.'),
        explanation: same('$\\frac{20}{4}=5\\to 3\\cdot 5=15$')
    }
]

export const similarityChallenges: ChallengeItem[] = [
    /* ---------- Thales ---------- */
    {
        id: 101, stage: 'thales', points: 10, context: 'starter',
        prompt: say('Kalkulatu x: $\\frac{x}{3}=\\frac{3{,}5}{4}$.', 'Calcula x: $\\frac{x}{3}=\\frac{3{,}5}{4}$.', 'احسب x: $\\frac{x}{3}=\\frac{3{,}5}{4}$.'),
        expected: v('2,625'),
        hint: say('Biderkatu 3z bi aldeak.', 'Multiplica los dos lados por 3.', 'اضرب الطرفين في 3.'),
        explanation: same('$x=\\frac{3\\cdot 3{,}5}{4}=2{,}625$')
    },
    {
        id: 102, stage: 'thales', points: 20, context: 'advanced',
        prompt: say('Paraleloek $s$ zuzenean 3, 9, 13,5 eta 16,5 cm-ko zatiak mozten dituzte, eta $r$ zuzenean, guztira, 14 cm. Zenbat neurtzen du $r$-ko zatirik handienak?', 'Unas paralelas cortan en la recta $s$ segmentos de 3, 9, 13,5 y 16,5 cm, y en $r$, en total, 14 cm. ¿Cuánto mide el mayor segmento de $r$?', 'تقطع متوازيات على $s$ قطعًا 3 و9 و13.5 و16.5 سم، وعلى $r$ ما مجموعه 14 سم. كم أكبر قطعة على $r$؟'),
        expected: v('5,5'),
        hint: say('$s$ osoa: $3+9+13{,}5+16{,}5=42$.', '$s$ entera: $3+9+13{,}5+16{,}5=42$.', '$s$ كاملًا: $3+9+13{,}5+16{,}5=42$.'),
        explanation: same('$\\frac{14}{42}=\\frac{x}{16{,}5}\\to x=\\frac{14\\cdot 16{,}5}{42}=5{,}5$')
    },
    {
        id: 103, stage: 'thales', points: 30, context: 'master',
        prompt: say('Banatu 22 cm-ko zuzenki bat 2, 4 eta 5 zenbakien zati proportzionaletan. Zenbat neurtzen du erdiko zatiak?', 'Divide un segmento de 22 cm en partes proporcionales a 2, 4 y 5. ¿Cuánto mide la parte del medio?', 'قسّم قطعة طولها 22 سم إلى أجزاء متناسبة مع 2 و4 و5. كم طول الجزء الأوسط؟'),
        expected: n(8),
        hint: say('Guztira $2+4+5=11$ zati.', 'En total, $2+4+5=11$ partes.', 'المجموع $2+4+5=11$ جزءًا.'),
        explanation: same('$22\\mathbin{:}11=2\\to 2\\cdot 4=8$')
    },

    /* ---------- Similar figures ---------- */
    {
        id: 104, stage: 'similarity', points: 10, context: 'starter',
        prompt: say('Bi oktogono erregularrek 1,5 cm eta 3 cm-ko aldeak dituzte. Zein da handiaren eta txikiaren arteko arrazoia?', 'Dos octógonos regulares tienen lados de 1,5 cm y 3 cm. ¿Cuál es la razón del grande al pequeño?', 'مثمّنان منتظمان ضلعاهما 1.5 سم و3 سم. ما نسبة الكبير إلى الصغير؟'),
        expected: n(2),
        hint: say('Zatitu alde homologoak.', 'Divide los lados homólogos.', 'اقسم الضلعين المتناظرين.'),
        explanation: same('$3\\mathbin{:}1{,}5=2$')
    },
    {
        id: 105, stage: 'similarity', points: 20, context: 'advanced',
        prompt: say('Bi triangelu antzekotan, 5 cm-ko aldeari 3,5 cm-koa dagokio. Lehenengoaren beste alde batek 8 cm neurtzen ditu. Zenbat neurtzen du bigarreneko alde homologoak?', 'En dos triángulos semejantes, al lado de 5 cm le corresponde uno de 3,5 cm. Otro lado del primero mide 8 cm. ¿Cuánto mide su homólogo en el segundo?', 'في مثلثين متشابهين يقابل الضلعَ 5 سم ضلعٌ 3.5 سم. وضلع آخر في الأول 8 سم. كم يقابله في الثاني؟'),
        expected: v('5,6'),
        hint: same('$\\frac{8}{a}=\\frac{5}{3{,}5}$'),
        explanation: same('$a=\\frac{8\\cdot 3{,}5}{5}=5{,}6$')
    },
    {
        id: 106, stage: 'similarity', points: 30, context: 'master',
        prompt: with_(say('Triangelu angeluzuzen baten katetoak 4 cm eta 7 cm dira. Zenbat neurtzen du 1,6 arrazoiko triangelu antzeko baten hipotenusak?', 'Un triángulo rectángulo tiene catetos de 4 cm y 7 cm. ¿Cuánto mide la hipotenusa de uno semejante de razón 1,6?', 'مثلث قائم ضلعاه القائمان 4 سم و7 سم. كم وتر مثلث مشابه نسبته 1.6؟'), TENTHS),
        expected: v('12,9'),
        hint: say('Katetoak: 6,4 eta 11,2. Gero Pitagoras.', 'Catetos: 6,4 y 11,2. Luego Pitágoras.', 'الضلعان: 6.4 و11.2. ثم فيثاغورس.'),
        explanation: same('$\\sqrt{6{,}4^{2}+11{,}2^{2}}=\\sqrt{166{,}4}\\approx 12{,}9$')
    },

    /* ---------- Ratios ---------- */
    {
        id: 107, stage: 'ratios', points: 10, context: 'starter',
        prompt: say('Hexagono erregular batek 3 cm-ko aldea du eta beste batek 0,5 cm-koa. Zein da haien perimetroen arrazoia?', 'Un hexágono regular tiene 3 cm de lado y otro 0,5 cm. ¿Cuál es la razón de sus perímetros?', 'مسدس منتظم ضلعه 3 سم وآخر 0.5 سم. ما نسبة محيطيهما؟'),
        expected: n(6),
        hint: say('Perimetroen arrazoia aldeena da.', 'La razón de los perímetros es la de los lados.', 'نسبة المحيطات هي نسبة الأضلاع.'),
        explanation: same('$\\frac{6\\cdot 3}{6\\cdot 0{,}5}=6$')
    },
    {
        id: 108, stage: 'ratios', points: 20, context: 'advanced',
        prompt: say('Bi karratu antzekoren azaleren arrazoia 16 da, eta txikiaren aldea 2,5 cm. Zenbat neurtzen du handiaren aldeak?', 'La razón de las áreas de dos cuadrados es 16 y el lado del pequeño mide 2,5 cm. ¿Cuánto mide el lado del grande?', 'نسبة مساحتي مربعين 16 وضلع الصغير 2.5 سم. كم ضلع الكبير؟'),
        expected: n(10),
        hint: say('Luzeren arrazoia: $\\sqrt{16}$.', 'Razón de las longitudes: $\\sqrt{16}$.', 'نسبة الأطوال: $\\sqrt{16}$.'),
        explanation: same('$\\sqrt{16}=4\\to 2{,}5\\cdot 4=10$')
    },
    {
        id: 109, stage: 'ratios', points: 30, context: 'master',
        prompt: say('1:20 eskalako biltegi baten maketak 3 L hartzen ditu. Zenbat m³ hartzen ditu benetako biltegiak?', 'La maqueta de un depósito a escala 1:20 contiene 3 L. ¿Cuántos m³ contiene el depósito real?', 'مجسّم خزان بمقياس 1:20 يسع 3 L. كم مترًا مكعبًا يسع الخزان الحقيقي؟'),
        expected: n(24),
        hint: say('Bolumenak $20^{3}$ bider.', 'Los volúmenes, por $20^{3}$.', 'الحجوم في $20^{3}$.'),
        explanation: say('$3\\cdot 20^{3}=24\\,000$ L, hau da, 24 m³.', '$3\\cdot 20^{3}=24\\,000$ L, es decir, 24 m³.', '$3\\cdot 20^{3}=24\\,000$ L، أي 24 م³.')
    },

    /* ---------- Scales ---------- */
    {
        id: 110, stage: 'scales', points: 10, context: 'starter',
        prompt: say('1:500 000 eskalako mapa batean bi hiri 6 cm-ra daude. Zenbat km daude?', 'En un mapa a escala 1:500 000 dos ciudades están a 6 cm. ¿A cuántos km están?', 'في خريطة بمقياس 1:500 000 تبعد مدينتان 6 سم. كم كيلومترًا تبعدان؟'),
        expected: n(30),
        hint: say('$500\\,000$ cm = 5 km.', '$500\\,000$ cm = 5 km.', '$500\\,000$ سم = 5 كم.'),
        explanation: same('$6\\cdot 5=30$')
    },
    {
        id: 111, stage: 'scales', points: 20, context: 'advanced',
        prompt: say('Mapa batean 6,2 cm-k 372 km adierazten dituzte. Zein da eskala 1:n? Idatzi n.', 'En un mapa, 6,2 cm representan 372 km. ¿Cuál es la escala 1:n? Escribe n.', 'في خريطة تمثل 6.2 سم مسافة 372 كم. ما المقياس 1:n؟ اكتب n.'),
        expected: n(6000000),
        hint: same('$372\\ \\text{km}=37\\,200\\,000\\ \\text{cm}$'),
        explanation: same('$37\\,200\\,000\\mathbin{:}6{,}2=6\\,000\\,000$')
    },
    {
        id: 112, stage: 'scales', points: 30, context: 'master',
        prompt: say('1:250 eskalako plano batean, orube batek 8 cm × 6 cm neurtzen ditu. Zenbat m² ditu?', 'En un plano a escala 1:250 un solar mide 8 cm × 6 cm. ¿Cuántos m² tiene?', 'في مخطط بمقياس 1:250 تقيس قطعة أرض 8 سم × 6 سم. كم مترًا مربعًا مساحتها؟'),
        expected: n(300),
        hint: say('Luzerak: 20 m eta 15 m.', 'Longitudes: 20 m y 15 m.', 'الأطوال: 20 م و15 م.'),
        explanation: same('$8\\cdot 250=2000\\quad 6\\cdot 250=1500\\quad 20\\cdot 15=300$')
    },

    /* ---------- Heights and distances ---------- */
    {
        id: 113, stage: 'heights', points: 10, context: 'starter',
        prompt: say('1,8 m-ko pertsona batek 1,2 m-ko itzala du, eta dorre batek 20 m-koa. Zenbat neurtzen du dorreak?', 'Una persona de 1,8 m da una sombra de 1,2 m y una torre, una de 20 m. ¿Cuánto mide la torre?', 'شخص طوله 1.8 م ظله 1.2 م، وظل برج 20 م. كم ارتفاع البرج؟'),
        expected: n(30),
        hint: same('$\\frac{x}{20}=\\frac{1{,}8}{1{,}2}$'),
        explanation: same('$x=\\frac{20\\cdot 1{,}8}{1{,}2}=30$')
    },
    {
        id: 114, stage: 'heights', points: 20, context: 'advanced',
        prompt: say('Begiak 1,7 m-ra dituen pertsona bat ispilu batetik 2,5 m-ra dago, eta ispilua eraikin batetik 25 m-ra. Ispiluan eraikinaren goialdea ikusten du. Zenbat neurtzen du eraikinak?', 'Una persona con los ojos a 1,7 m está a 2,5 m de un espejo, y el espejo a 25 m de un edificio. Ve en el espejo lo alto del edificio. ¿Cuánto mide el edificio?', 'شخص عيناه على ارتفاع 1.7 م على بعد 2.5 م من مرآة، والمرآة على بعد 25 م من مبنى. يرى في المرآة أعلى المبنى. كم ارتفاعه؟'),
        expected: n(17),
        hint: same('$\\frac{x}{25}=\\frac{1{,}7}{2{,}5}$'),
        explanation: same('$x=\\frac{25\\cdot 1{,}7}{2{,}5}=17$')
    },
    {
        id: 115, stage: 'heights', points: 30, context: 'master',
        prompt: say('Micaelak begiak 1,6 m-ra ditu, eta 2,6 m-ko hesi batetik 3 m-ra dago. Hesiaren goialdea eta 36 m-ra dagoen eraikin baten goialdea lerrokatuta ikusten ditu. Zenbat neurtzen du eraikinak?', 'Micaela tiene los ojos a 1,6 m y está a 3 m de una valla de 2,6 m. Ve alineados lo alto de la valla y lo alto de un edificio que está a 36 m. ¿Cuánto mide el edificio?', 'عينا ميكايلا على ارتفاع 1.6 م وهي على بعد 3 م من سياج ارتفاعه 2.6 م. ترى أعلى السياج وأعلى مبنى على بعد 36 م على استقامة واحدة. كم ارتفاع المبنى؟'),
        expected: v('13,6'),
        hint: say('Kendu begien altuera: hesia $2{,}6-1{,}6=1$.', 'Resta la altura de los ojos: valla $2{,}6-1{,}6=1$.', 'اطرح ارتفاع العينين: السياج $2{,}6-1{,}6=1$.'),
        explanation: same('$\\frac{36\\cdot 1}{3}=12\\quad 12+1{,}6=13{,}6$')
    }
]

export const similarityExerciseBank: ExerciseSection[] = [
    {
        id: 'thales',
        title: say('Talesen teorema', 'Teorema de Tales', 'مبرهنة طاليس'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Kalkulatu x: $\\frac{4}{6}=\\frac{5}{x}$.', 'Calcula x: $\\frac{4}{6}=\\frac{5}{x}$.', 'احسب x: $\\frac{4}{6}=\\frac{5}{x}$.'), solution: same('$x=\\frac{6\\cdot 5}{4}=7{,}5$'), answer: { expected: v('7,5') } },
            { id: 2, difficulty: 'easy', question: say('Banatu 10 cm-ko zuzenki bat 5 zati berdinetan. Zenbat neurtzen du zati bakoitzak?', 'Divide un segmento de 10 cm en 5 partes iguales. ¿Cuánto mide cada parte?', 'قسّم قطعة طولها 10 سم إلى 5 أجزاء متساوية. كم طول كل جزء؟'), solution: same('$10\\mathbin{:}5=2$'), answer: { expected: n(2) } },
            { id: 3, difficulty: 'easy', question: say('3 eta 4 cm-ko zatiak eta 6 eta 8 cm-koak proportzionalak dira?', '¿Son proporcionales los segmentos de 3 y 4 cm y los de 6 y 8 cm?', 'هل القطعتان 3 و4 سم والقطعتان 6 و8 سم متناسبة؟'), solution: say('Bai: $\\frac{3}{6}=\\frac{4}{8}=0{,}5$.', 'Sí: $\\frac{3}{6}=\\frac{4}{8}=0{,}5$.', 'نعم: $\\frac{3}{6}=\\frac{4}{8}=0{,}5$.') },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu x: $\\frac{x}{4}=\\frac{3}{5}$.', 'Calcula x: $\\frac{x}{4}=\\frac{3}{5}$.', 'احسب x: $\\frac{x}{4}=\\frac{3}{5}$.'), solution: same('$x=\\frac{4\\cdot 3}{5}=2{,}4$'), answer: { expected: v('2,4') } },
            { id: 5, difficulty: 'medium', question: say("Tales posizioan, $AB'=3$, $AB=9$ eta $B'C'=2$. Kalkulatu BC.", "En posición de Tales, $AB'=3$, $AB=9$ y $B'C'=2$. Calcula BC.", "في وضع طاليس $AB'=3$ و$AB=9$ و$B'C'=2$. احسب BC."), solution: same('$BC=\\frac{9\\cdot 2}{3}=6$'), answer: { expected: n(6) } },
            { id: 6, difficulty: 'medium', question: say('Kalkulatu x: $\\frac{2}{3{,}5}=\\frac{x}{4{,}2}$.', 'Calcula x: $\\frac{2}{3{,}5}=\\frac{x}{4{,}2}$.', 'احسب x: $\\frac{2}{3{,}5}=\\frac{x}{4{,}2}$.'), solution: same('$x=\\frac{2\\cdot 4{,}2}{3{,}5}=2{,}4$'), answer: { expected: v('2,4') } },
            { id: 7, difficulty: 'medium', question: say('Banatu 30 cm 1, 2 eta 3 zenbakien zati proportzionaletan. Zenbat neurtzen du zati txikienak?', 'Divide 30 cm en partes proporcionales a 1, 2 y 3. ¿Cuánto mide la parte menor?', 'قسّم 30 سم إلى أجزاء متناسبة مع 1 و2 و3. كم أصغر جزء؟'), solution: same('$30\\mathbin{:}6=5$'), answer: { expected: n(5) } },
            { id: 8, difficulty: 'hard', question: say("Tales posizioan, $AC'=4$, $C'C=2$ eta $AB'=5$. Kalkulatu AB.", "En posición de Tales, $AC'=4$, $C'C=2$ y $AB'=5$. Calcula AB.", "في وضع طاليس $AC'=4$ و$C'C=2$ و$AB'=5$. احسب AB."), solution: same('$AC=6\\quad AB=\\frac{6\\cdot 5}{4}=7{,}5$'), answer: { expected: v('7,5') } },
            { id: 9, difficulty: 'hard', question: say('Ebatzi: $\\frac{20}{12}=\\frac{x+4}{x}$.', 'Resuelve: $\\frac{20}{12}=\\frac{x+4}{x}$.', 'حلّ: $\\frac{20}{12}=\\frac{x+4}{x}$.'), solution: say('$20x=12x+48$, beraz $8x=48$ eta $x=6$.', '$20x=12x+48$, así que $8x=48$ y $x=6$.', '$20x=12x+48$، إذن $8x=48$ و$x=6$.'), answer: { expected: n(6) } },
            { id: 10, difficulty: 'hard', question: say('$r$ zuzenak 14 cm ditu eta $s$-k 42 cm, zatiak 3, 9, 13,5 eta 16,5 cm. Zenbat neurtzen du 13,5 cm-koari dagokion $r$-ko zatiak?', 'La recta $r$ mide 14 cm y la $s$ 42 cm, con segmentos de 3, 9, 13,5 y 16,5 cm. ¿Cuánto mide el segmento de $r$ que corresponde al de 13,5 cm?', 'يبلغ $r$ عشرة وأربعة سنتيمترات و$s$ اثنين وأربعين، بقطع 3 و9 و13.5 و16.5 سم. كم القطعة على $r$ المقابلة لـ 13.5 سم؟'), solution: same('$\\frac{14\\cdot 13{,}5}{42}=4{,}5$'), answer: { expected: v('4,5') } }
        ]
    },
    {
        id: 'similarity',
        title: say('Irudi antzekoak', 'Figuras semejantes', 'الأشكال المتشابهة'),
        items: [
            { id: 11, difficulty: 'easy', question: say('6 cm eta 2,4 cm-ko aldeko karratuak. Zein da txikiaren eta handiaren arteko arrazoia?', 'Cuadrados de 6 cm y 2,4 cm de lado. ¿Cuál es la razón del pequeño al grande?', 'مربعان ضلعاهما 6 سم و2.4 سم. ما نسبة الصغير إلى الكبير؟'), solution: same('$2{,}4\\mathbin{:}6=0{,}4$'), answer: { expected: v('0,4') } },
            { id: 12, difficulty: 'easy', question: say('4 × 8 eta 4,8 × 9,6 laukizuzenak. Zein da arrazoia?', 'Rectángulos de 4 × 8 y 4,8 × 9,6. ¿Cuál es la razón?', 'مستطيلان 4 × 8 و4.8 × 9.6. ما النسبة؟'), solution: same('$\\frac{4{,}8}{4}=\\frac{9{,}6}{8}=1{,}2$'), answer: { expected: v('1,2') } },
            { id: 13, difficulty: 'easy', question: say('Laukizuzen guztiak antzekoak dira?', '¿Son semejantes todos los rectángulos?', 'هل كل المستطيلات متشابهة؟'), solution: say('Ez: angeluak berdinak dira, baina 2 × 1 eta 3 × 1 laukizuzenen aldeak ez dira proportzionalak.', 'No: los ángulos son iguales, pero los lados de 2 × 1 y 3 × 1 no son proporcionales.', 'لا: الزوايا متساوية لكن أضلاع 2 × 1 و3 × 1 ليست متناسبة.') },
            { id: 14, difficulty: 'medium', question: say('Triangelu batek 30° eta 70°-ko angeluak ditu, eta beste batek 80° eta 70°-koak. Antzekoak dira?', 'Un triángulo tiene ángulos de 30° y 70° y otro de 80° y 70°. ¿Son semejantes?', 'لمثلث زاويتان 30° و70° ولآخر 80° و70°. هل هما متشابهان؟'), solution: say('Bai: hirugarrenak 80° eta 30° dira, hiru angeluak berdinak.', 'Sí: los terceros son 80° y 30°, los tres ángulos iguales.', 'نعم: الثالثتان 80° و30°، والزوايا الثلاث متساوية.') },
            { id: 15, difficulty: 'medium', question: say('Bi triangeluk angelu bat partekatzen dute; inguruko aldeak 6 eta 8, eta 7,5 eta 11,25. Antzekoak dira?', 'Dos triángulos comparten un ángulo; los lados que lo forman son 6 y 8, y 7,5 y 11,25. ¿Son semejantes?', 'يشترك مثلثان في زاوية؛ الضلعان المحيطان بها 6 و8، و7.5 و11.25. هل هما متشابهان؟'), solution: say('Ez: $\\frac{6}{7{,}5}=0{,}8$ baina $\\frac{8}{11{,}25}$ ez da 0,8.', 'No: $\\frac{6}{7{,}5}=0{,}8$ pero $\\frac{8}{11{,}25}$ no es 0,8.', 'لا: $\\frac{6}{7{,}5}=0{,}8$ لكن $\\frac{8}{11{,}25}$ ليس 0.8.') },
            { id: 16, difficulty: 'medium', question: say('Triangelu baten aldeak 5, 8 eta 10 dira. Antzeko baten alde txikiena 7,5 da. Zenbat neurtzen du handienak?', 'Un triángulo tiene lados 5, 8 y 10. En uno semejante el lado menor mide 7,5. ¿Cuánto mide el mayor?', 'أضلاع مثلث 5 و8 و10. أصغر ضلع لمثلث مشابه 7.5. كم أكبر ضلع؟'), solution: same('$7{,}5\\mathbin{:}5=1{,}5\\to 10\\cdot 1{,}5=15$'), answer: { expected: n(15) } },
            { id: 17, difficulty: 'medium', question: say('Bi heptagono erregularrek 4 cm eta 2,8 cm-ko aldeak dituzte. Zein da txikiaren eta handiaren arteko arrazoia?', 'Dos heptágonos regulares tienen lados de 4 cm y 2,8 cm. ¿Cuál es la razón del pequeño al grande?', 'مسبّعان منتظمان ضلعاهما 4 سم و2.8 سم. ما نسبة الصغير إلى الكبير؟'), solution: same('$2{,}8\\mathbin{:}4=0{,}7$'), answer: { expected: v('0,7') } },
            { id: 18, difficulty: 'hard', question: say("Homotezia batean $OA=4$ eta $OA'=10$. AB = 3 bada, zenbat da A'B'?", "En una homotecia, $OA=4$ y $OA'=10$. Si AB = 3, ¿cuánto mide A'B'?", "في تحاكٍ $OA=4$ و$OA'=10$. إذا كان AB = 3 فكم A'B'؟"), solution: same('$r=10\\mathbin{:}4=2{,}5\\to 3\\cdot 2{,}5=7{,}5$'), answer: { expected: v('7,5') } },
            { id: 19, difficulty: 'hard', question: say('Triangelu isoszele batek 5 cm-ko oinarria du. Zein da 1,8 arrazoiko triangelu antzeko baten oinarria?', 'Un triángulo isósceles tiene 5 cm de base. ¿Cuál es la base de uno semejante de razón 1,8?', 'مثلث متساوي الساقين قاعدته 5 سم. ما قاعدة مثلث مشابه نسبته 1.8؟'), solution: same('$1{,}8\\cdot 5=9$'), answer: { expected: n(9) } },
            { id: 20, difficulty: 'hard', question: say('3, 4 eta 5 cm-ko triangelu baten antzeko batek 15 cm-ko hipotenusa du. Zenbat neurtzen du kateto handienak?', 'Un triángulo semejante al de 3, 4 y 5 cm tiene 15 cm de hipotenusa. ¿Cuánto mide el cateto mayor?', 'مثلث مشابه للمثلث 3 و4 و5 سم وتره 15 سم. كم أكبر ضلع قائم؟'), solution: same('$15\\mathbin{:}5=3\\to 4\\cdot 3=12$'), answer: { expected: n(12) } }
        ]
    },
    {
        id: 'ratios',
        title: say('Perimetroak, azalerak eta bolumenak', 'Perímetros, áreas y volúmenes', 'المحيطات والمساحات والحجوم'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Poligono baten perimetroa 10 cm da. Zein da 3 arrazoiko antzeko baten perimetroa?', 'Un polígono tiene 10 cm de perímetro. ¿Cuál es el de uno semejante de razón 3?', 'محيط مضلع 10 سم. ما محيط مضلع مشابه نسبته 3؟'), solution: same('$10\\cdot 3=30$'), answer: { expected: n(30) } },
            { id: 22, difficulty: 'easy', question: say('Irudi baten azalera 5 cm² da. Zein da 2 arrazoiko antzeko batena?', 'Una figura tiene 5 cm² de área. ¿Cuál es la de una semejante de razón 2?', 'مساحة شكل 5 سم². ما مساحة شكل مشابه نسبته 2؟'), solution: same('$5\\cdot 2^{2}=20$'), answer: { expected: n(20) } },
            { id: 23, difficulty: 'easy', question: say('Gorputz baten bolumena 3 cm³ da. Zein da 2 arrazoiko antzeko batena?', 'Un cuerpo tiene 3 cm³ de volumen. ¿Cuál es el de uno semejante de razón 2?', 'حجم جسم 3 سم³. ما حجم جسم مشابه نسبته 2؟'), solution: same('$3\\cdot 2^{3}=24$'), answer: { expected: n(24) } },
            { id: 24, difficulty: 'medium', question: say('5 × 4 eta 15 × 12 laukizuzenak. Zein da haien azaleren arrazoia?', 'Rectángulos de 5 × 4 y 15 × 12. ¿Cuál es la razón de sus áreas?', 'مستطيلان 5 × 4 و15 × 12. ما نسبة مساحتيهما؟'), solution: same('$\\frac{15\\cdot 12}{5\\cdot 4}=9=3^{2}$'), answer: { expected: n(9) } },
            { id: 25, difficulty: 'medium', question: say('Bi irudi antzekoren azaleren arrazoia 6,25 da. Zein da luzeren arrazoia?', 'La razón de las áreas de dos figuras semejantes es 6,25. ¿Cuál es la de las longitudes?', 'نسبة مساحتي شكلين متشابهين 6.25. ما نسبة الأطوال؟'), solution: same('$\\sqrt{6{,}25}=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 26, difficulty: 'medium', question: say('Pista zirkular baten barruko erradioa 3,5 m da eta kanpokoa 10,5 m. Zenbat bider luzeagoa da kanpoko bira?', 'Una pista circular tiene 3,5 m de radio interior y 10,5 m de exterior. ¿Cuántas veces más larga es la vuelta exterior?', 'مضمار دائري نصف قطره الداخلي 3.5 م والخارجي 10.5 م. كم مرة تطول الدورة الخارجية؟'), solution: same('$\\frac{2\\cdot 3{,}14\\cdot 10{,}5}{2\\cdot 3{,}14\\cdot 3{,}5}=3$'), answer: { expected: n(3) } },
            { id: 27, difficulty: 'medium', question: say('Bi piramide antzekoren bolumenak 8 cm³ eta 27 cm³ dira. Zein da handiaren eta txikiaren altueren arrazoia?', 'Dos pirámides semejantes tienen 8 cm³ y 27 cm³. ¿Cuál es la razón de las alturas del grande al pequeño?', 'هرمان متشابهان حجماهما 8 سم³ و27 سم³. ما نسبة ارتفاع الكبير إلى الصغير؟'), solution: say('$\\frac{27}{8}=r^{3}$, eta $r=\\frac{3}{2}=1{,}5$.', '$\\frac{27}{8}=r^{3}$, y $r=\\frac{3}{2}=1{,}5$.', '$\\frac{27}{8}=r^{3}$، و$r=\\frac{3}{2}=1{,}5$.'), answer: { expected: v('1,5') } },
            { id: 28, difficulty: 'hard', question: say('Plater baten azalera 452,16 cm² da. Barruko zatia antzekoa da, 0,75 arrazoiarekin. Zein da haren azalera?', 'Un plato tiene 452,16 cm² de área. La parte interior es semejante con razón 0,75. ¿Cuál es su área?', 'مساحة صحن 452.16 سم². الجزء الداخلي مشابه بنسبة 0.75. ما مساحته؟'), solution: same('$452{,}16\\cdot 0{,}75^{2}=254{,}34$'), answer: { expected: v('254,34') } },
            { id: 29, difficulty: 'hard', question: say('Kubo baten azalera 24 cm² da. Ertzak hirukoizten badira, zein da azalera berria?', 'Un cubo tiene 24 cm² de superficie. Si se triplican las aristas, ¿cuál es la nueva superficie?', 'مساحة سطح مكعب 24 سم². إذا تضاعفت الأحرف ثلاث مرات فما المساحة الجديدة؟'), solution: same('$24\\cdot 3^{2}=216$'), answer: { expected: n(216) } },
            { id: 30, difficulty: 'hard', question: say('Baloi batek 4,8 L hartzen ditu. Erradioaren erdia duen antzeko batek zenbat L hartzen ditu?', 'Un balón contiene 4,8 L. ¿Cuántos L contiene otro semejante con la mitad de radio?', 'كرة تسع 4.8 L. كم لترًا تسع كرة مشابهة نصف قطرها النصف؟'), solution: same('$4{,}8\\cdot 0{,}5^{3}=0{,}6$'), answer: { expected: v('0,6') } }
        ]
    },
    {
        id: 'scales',
        title: say('Eskalak', 'Escalas', 'المقاييس'),
        items: [
            { id: 31, difficulty: 'easy', question: say('1:100 000 eskalako mapa batean, 4 cm. Zenbat km?', 'En un mapa a escala 1:100 000, 4 cm. ¿Cuántos km?', 'في خريطة بمقياس 1:100 000، 4 سم. كم كيلومترًا؟'), solution: same('$4\\cdot 100\\,000=400\\,000\\quad 400\\,000\\mathbin{:}100\\,000=4$'), answer: { expected: n(4) } },
            { id: 32, difficulty: 'easy', question: say('4,2 m-ko horma bat 1:200 eskalan marraztuta. Zenbat cm?', 'Una pared de 4,2 m dibujada a escala 1:200. ¿Cuántos cm?', 'جدار طوله 4.2 م مرسوم بمقياس 1:200. كم سنتيمترًا؟'), solution: same('$420\\mathbin{:}200=2{,}1$'), answer: { expected: v('2,1') } },
            { id: 33, difficulty: 'easy', question: say('7 km 1:50 000 eskalako mapa batean. Zenbat cm?', '7 km en un mapa a escala 1:50 000. ¿Cuántos cm?', '7 كم في خريطة بمقياس 1:50 000. كم سنتيمترًا؟'), solution: same('$700\\,000\\mathbin{:}50\\,000=14$'), answer: { expected: n(14) } },
            { id: 34, difficulty: 'medium', question: say('350 cm-ko armairu baten replika 17,5 cm-koa da. Zein da eskala 1:n? Idatzi n.', 'La réplica de un armario de 350 cm mide 17,5 cm. ¿Cuál es la escala 1:n? Escribe n.', 'نسخة خزانة طولها 350 سم تبلغ 17.5 سم. ما المقياس 1:n؟ اكتب n.'), solution: same('$350\\mathbin{:}17{,}5=20$'), answer: { expected: n(20) } },
            { id: 35, difficulty: 'medium', question: say('50 km 1:250 000 eskalako mapa batean. Zenbat cm?', '50 km en un mapa a escala 1:250 000. ¿Cuántos cm?', '50 كم في خريطة بمقياس 1:250 000. كم سنتيمترًا؟'), solution: same('$5\\,000\\,000\\mathbin{:}250\\,000=20$'), answer: { expected: n(20) } },
            { id: 36, difficulty: 'medium', question: say('1:500 000 eskalako mapa batean bi herri 6 cm-ra daude. Zenbat cm-ra egongo lirateke 1:60 000 eskalako batean?', 'En un mapa 1:500 000 dos pueblos están a 6 cm. ¿A cuántos cm estarían en uno a escala 1:60 000?', 'في خريطة 1:500 000 تبعد قريتان 6 سم. كم سنتيمترًا تبعدان في خريطة بمقياس 1:60 000؟'), solution: same('$6\\cdot 500\\,000=3\\,000\\,000\\quad 3\\,000\\,000\\mathbin{:}60\\,000=50$'), answer: { expected: n(50) } },
            { id: 37, difficulty: 'medium', question: say('Arku baten maketak 10 cm neurtzen ditu 1:500 eskalan. Zenbat m neurtzen du arkuak?', 'La maqueta de un arco mide 10 cm a escala 1:500. ¿Cuántos m mide el arco?', 'مجسّم قوس طوله 10 سم بمقياس 1:500. كم مترًا طول القوس؟'), solution: same('$10\\cdot 500=5000\\quad 5000\\mathbin{:}100=50$'), answer: { expected: n(50) } },
            { id: 38, difficulty: 'hard', question: say('Bi hiri 450 km-ra daude. Zenbat cm-ra 1:1 500 000 eskalako mapa batean?', 'Dos ciudades están a 450 km. ¿A cuántos cm en un mapa a escala 1:1 500 000?', 'تبعد مدينتان 450 كم. كم سنتيمترًا في خريطة بمقياس 1:1 500 000؟'), solution: same('$45\\,000\\,000\\mathbin{:}1\\,500\\,000=30$'), answer: { expected: n(30) } },
            { id: 39, difficulty: 'hard', question: say('1:100 eskalako plano batean, gela batek 35 cm² ditu. Zenbat m² ditu benetan?', 'En un plano a escala 1:100 una habitación tiene 35 cm². ¿Cuántos m² tiene en realidad?', 'في مخطط بمقياس 1:100 مساحة غرفة 35 سم². كم مترًا مربعًا في الواقع؟'), solution: same('$35\\cdot 100^{2}=350\\,000\\quad 350\\,000\\mathbin{:}10\\,000=35$'), answer: { expected: n(35) } },
            { id: 40, difficulty: 'hard', question: say('1:20 eskalako kaxa baten maketak 2 dm³ ditu. Zenbat m³ ditu kaxa errealak?', 'La maqueta de una caja a escala 1:20 tiene 2 dm³. ¿Cuántos m³ tiene la caja real?', 'مجسّم صندوق بمقياس 1:20 حجمه 2 دسم³. كم مترًا مكعبًا حجم الصندوق الحقيقي؟'), solution: same('$2\\cdot 20^{3}=16\\,000\\quad 16\\,000\\mathbin{:}1000=16$'), answer: { expected: n(16) } }
        ]
    },
    {
        id: 'heights',
        title: say('Altuerak eta distantziak', 'Alturas y distancias', 'الارتفاعات والمسافات'),
        items: [
            { id: 41, difficulty: 'easy', question: say('1 m-ko makila batek 0,8 m-ko itzala du, eta zuhaitz batek 6 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 1 m da una sombra de 0,8 m y un árbol, una de 6 m. ¿Cuánto mide el árbol?', 'عصا 1 م ظلها 0.8 م وظل شجرة 6 م. كم طول الشجرة؟'), solution: same('$\\frac{6\\cdot 1}{0{,}8}=7{,}5$'), answer: { expected: v('7,5') } },
            { id: 42, difficulty: 'easy', question: say('1,7 m-ko pertsona batek 2,5 m-ko itzala du, eta banderaren makilak 10 m-koa. Zenbat neurtzen du makilak?', 'Una persona de 1,7 m da una sombra de 2,5 m y un mástil, una de 10 m. ¿Cuánto mide el mástil?', 'شخص 1.7 م ظله 2.5 م وظل سارية 10 م. كم طول السارية؟'), solution: same('$\\frac{10\\cdot 1{,}7}{2{,}5}=6{,}8$'), answer: { expected: v('6,8') } },
            { id: 43, difficulty: 'easy', question: say('Zergatik dira antzekoak makilaren eta zuhaitzaren triangeluak?', '¿Por qué son semejantes los triángulos del palo y del árbol?', 'لماذا يتشابه مثلثا العصا والشجرة؟'), solution: say('Biek angelu zuzena dute, eta eguzki-izpiak paraleloak direnez, izpien angelua berdina da: bi angelu berdin.', 'Los dos tienen un ángulo recto y, como los rayos del sol son paralelos, el ángulo de los rayos es igual: dos ángulos iguales.', 'لكليهما زاوية قائمة، ولأن أشعة الشمس متوازية فزاوية الأشعة متساوية: زاويتان متساويتان.') },
            { id: 44, difficulty: 'medium', question: say('Ispiluarekin: begiak 1,5 m-ra, ispilura 3 m, eraikinera 24 m. Zenbat neurtzen du eraikinak?', 'Con un espejo: ojos a 1,5 m, 3 m hasta el espejo y 24 m del espejo al edificio. ¿Cuánto mide el edificio?', 'بالمرآة: العينان على 1.5 م، و3 م إلى المرآة، و24 م من المرآة إلى المبنى. كم ارتفاع المبنى؟'), solution: same('$\\frac{24\\cdot 1{,}5}{3}=12$'), answer: { expected: n(12) } },
            { id: 45, difficulty: 'medium', question: say('Talesek: piramidearen itzala zentrotik 219 m zen, eta 1 m-ko makilarena 1,5 m. Zenbat neurtzen zuen piramideak?', 'Tales: la sombra de la pirámide desde el centro medía 219 m y la de un palo de 1 m, 1,5 m. ¿Cuánto medía la pirámide?', 'طاليس: ظل الهرم من المركز 219 م وظل عصا 1 م هو 1.5 م. كم ارتفاع الهرم؟'), solution: same('$\\frac{219\\cdot 1}{1{,}5}=146$'), answer: { expected: n(146) } },
            { id: 46, difficulty: 'medium', question: say('Begiak 1,5 m-ra, 2,5 m-ko zutoina 2 m-ra eta zuhaitza 10 m-ra, lerrokatuta. Zenbat neurtzen du zuhaitzak?', 'Ojos a 1,5 m, un poste de 2,5 m a 2 m y un árbol a 10 m, alineados. ¿Cuánto mide el árbol?', 'العينان على 1.5 م، وعمود 2.5 م على بعد 2 م، وشجرة على بعد 10 م، على استقامة واحدة. كم طول الشجرة؟'), solution: same('$\\frac{10\\cdot 1}{2}=5\\quad 5+1{,}5=6{,}5$'), answer: { expected: v('6,5') } },
            { id: 47, difficulty: 'medium', question: say('Erreka: triangelu txikiaren katetoak 2 m eta 5 m; handian, 5 m-koari dagokiona 40 m. Zein da 2 m-koari dagokiona?', 'Río: catetos del triángulo pequeño 2 m y 5 m; en el grande, el que corresponde al de 5 m mide 40 m. ¿Cuánto mide el que corresponde al de 2 m?', 'نهر: ضلعا المثلث الصغير 2 م و5 م؛ وفي الكبير يقابل 5 م أربعون مترًا. كم يقابل 2 م؟'), solution: same('$40\\mathbin{:}5=8\\to 2\\cdot 8=16$'), answer: { expected: n(16) } },
            { id: 48, difficulty: 'hard', question: say('1,8 m-ko pertsona bat farola batetik 3 m-ra dago, eta haren itzalak 2 m neurtzen ditu. Zenbat neurtzen du farolak?', 'Una persona de 1,8 m está a 3 m de una farola y su sombra mide 2 m. ¿Cuánto mide la farola?', 'شخص 1.8 م يقف على بعد 3 م من عمود إنارة وظله 2 م. كم ارتفاع العمود؟'), solution: say('Farolaren triangeluaren oinarria $3+2=5$: $\\frac{1{,}8\\cdot 5}{2}=4{,}5$.', 'La base del triángulo de la farola es $3+2=5$: $\\frac{1{,}8\\cdot 5}{2}=4{,}5$.', 'قاعدة مثلث العمود $3+2=5$: $\\frac{1{,}8\\cdot 5}{2}=4{,}5$.'), answer: { expected: v('4,5') } },
            { id: 49, difficulty: 'hard', question: say('18 m-ko eraikin bat. Begiak 1,5 m-ra dituen pertsona bat ispilutik 2 m-ra dago. Zein distantziatara dago ispilua eraikinetik?', 'Un edificio mide 18 m. Una persona con los ojos a 1,5 m está a 2 m del espejo. ¿A qué distancia está el espejo del edificio?', 'مبنى ارتفاعه 18 م. شخص عيناه على 1.5 م وعلى بعد 2 م من المرآة. كم تبعد المرآة عن المبنى؟'), solution: same('$\\frac{18\\cdot 2}{1{,}5}=24$'), answer: { expected: n(24) } },
            { id: 50, difficulty: 'hard', question: say('Begiak 1,6 m-ra, 2 m-ko hesia 1 m-ra eta eraikinaren goialdea lerrokatuta, eraikina 15 m-ra. Zenbat neurtzen du eraikinak?', 'Ojos a 1,6 m, una valla de 2 m a 1 m y lo alto de un edificio alineados, con el edificio a 15 m. ¿Cuánto mide el edificio?', 'العينان على 1.6 م، وسياج 2 م على بعد 1 م، وأعلى مبنى على بعد 15 م على استقامة واحدة. كم ارتفاع المبنى؟'), solution: same('$\\frac{15\\cdot 0{,}4}{1}=6\\quad 6+1{,}6=7{,}6$'), answer: { expected: v('7,6') } }
        ]
    }
]
