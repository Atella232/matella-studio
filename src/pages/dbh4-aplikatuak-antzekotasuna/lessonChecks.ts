import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Primes are written ^{\prime}
   (no quote inside the strings); scales such as 1:50\u00a0000 go in the words,
   where «:» is not drawn as ÷. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type SimilarityTopicId = 'thales' | 'divide' | 'thales-position' | 'similar-figures' | 'criteria' | 'homothety' | 'perimeter-ratio' | 'area-ratio' | 'volume-ratio' | 'scale' | 'find-scale' | 'plans' | 'shadows' | 'mirror' | 'sight'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A number with its unit after it: cm, m², L… in Arabic letters there */
const unit = (value: string, latin: string, arabic: string): LocalizedText => say(`$${value}$ ${latin}`, `$${value}$ ${latin}`, `$${value}$ ${arabic}`, `$${value}$ ${latin}`)

export const similarityLessonChecks: Record<SimilarityTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Thales ---------- */
    thales: {
        mistake: {
            wrong: say('Zuzen batean 2 eta 6 zuzenkiak, bestean 3 eta $x$: $\\frac{2}{6}=\\frac{x}{3}$.', 'Segmentos 2 y 6 en una recta, 3 y $x$ en otra: $\\frac{2}{6}=\\frac{x}{3}$.', 'القطعتان 2 و6 على مستقيم، و3 و$x$ على الآخر: $\\frac{2}{6}=\\frac{x}{3}$.', 'Segments 2 and 6 on one line, 3 and $x$ on the other: $\\frac{2}{6}=\\frac{x}{3}$.'),
            right: say('Bakoitza bere parekoarekin: $\\frac{2}{3}=\\frac{6}{x}$; beraz, $x=9$.', 'Cada uno con su correspondiente: $\\frac{2}{3}=\\frac{6}{x}$, así que $x=9$.', 'كل قطعة مع مناظرتها: $\\frac{2}{3}=\\frac{6}{x}$، إذن $x=9$.', 'Each one with its partner: $\\frac{2}{3}=\\frac{6}{x}$, so $x=9$.')
        },
        check: {
            prompt: say('Paralelo batzuek zuzen bat 4 cm eta 6 cm-ko zuzenkitan mozten dute, eta beste bat $6$ cm eta $x$ zuzenkitan. Zenbat da $x$?', 'Unas paralelas cortan una recta en segmentos de 4 cm y 6 cm, y otra en segmentos de $6$ cm y $x$. ¿Cuánto vale $x$?', 'مستقيمات متوازية تقطع مستقيمًا إلى قطعتين 4 سم و6 سم، وآخر إلى $6$ سم و$x$. كم يساوي $x$؟', 'Some parallel lines cut one line into segments of 4 cm and 6 cm, and another into segments of $6$ cm and $x$. What is $x$?'),
            options: [unit('4', 'cm', 'سم'), unit('9', 'cm', 'سم'), unit('8', 'cm', 'سم')],
            correctIndex: 1,
            explanation: say('$\\frac{4}{6}=\\frac{6}{x}$, beraz $4x=36$ eta $x=9$.', '$\\frac{4}{6}=\\frac{6}{x}$, así que $4x=36$ y $x=9$.', '$\\frac{4}{6}=\\frac{6}{x}$، إذن $4x=36$ و$x=9$.', '$\\frac{4}{6}=\\frac{6}{x}$, so $4x=36$ and $x=9$.')
        }
    },
    divide: {
        mistake: {
            wrong: say('14 cm 2 eta 5 zenbakiekiko proportzionalki banatzeko: $14\\div 2=7$ eta $14\\div 5=2{,}8$.', 'Para dividir 14 cm en partes proporcionales a 2 y 5: $14\\div 2=7$ y $14\\div 5=2{,}8$.', 'لتقسيم 14 سم بالتناسب مع 2 و5: $14\\div 2=7$ و$14\\div 5=2{,}8$.', 'To divide 14 cm in proportion to 2 and 5: $14\\div 2=7$ and $14\\div 5=2{,}8$.'),
            right: say('$2+5=7$ zatitan banatzen da: zati bat 2 cm da, eta zatiak 4 cm eta 10 cm.', 'Se reparte en $2+5=7$ partes: cada parte es 2 cm, y los trozos, 4 cm y 10 cm.', 'نقسم إلى $2+5=7$ أجزاء: كل جزء 2 سم، والقطعتان 4 سم و10 سم.', 'Split it into $2+5=7$ parts: each part is 2 cm, and the pieces are 4 cm and 10 cm.')
        },
        check: {
            prompt: say('20 cm-ko zuzenki bat 1 eta 4 zenbakiekiko proportzionalki banatzen da. Zenbat neurtzen du zati handienak?', 'Un segmento de 20 cm se divide en partes proporcionales a 1 y 4. ¿Cuánto mide la parte mayor?', 'تُقسم قطعة طولها 20 سم بالتناسب مع 1 و4. كم طول الجزء الأكبر؟', 'A 20 cm segment is divided in proportion to 1 and 4. How long is the larger part?'),
            options: [unit('5', 'cm', 'سم'), unit('4', 'cm', 'سم'), unit('16', 'cm', 'سم')],
            correctIndex: 2,
            explanation: say('$1+4=5$ zati: zati bakoitza 4 cm, eta handiena $4\\cdot 4=16$ cm.', '$1+4=5$ partes: cada una mide 4 cm, y la mayor, $4\\cdot 4=16$ cm.', '$1+4=5$ أجزاء: كل جزء 4 سم، والأكبر $4\\cdot 4=16$ سم.', '$1+4=5$ parts: each is 4 cm, and the larger one is $4\\cdot 4=16$ cm.')
        }
    },
    'thales-position': {
        mistake: {
            wrong: say('$AB^{\\prime}=4$ eta $B^{\\prime}B=2$ badira: $\\frac{2}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'Con $AB^{\\prime}=4$ y $B^{\\prime}B=2$: $\\frac{2}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'مع $AB^{\\prime}=4$ و$B^{\\prime}B=2$: $\\frac{2}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'With $AB^{\\prime}=4$ and $B^{\\prime}B=2$: $\\frac{2}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.'),
            right: say('Proportzioan alde osoa doa: $AB=4+2=6$, eta $\\frac{6}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'En la proporción va el lado entero: $AB=4+2=6$, y $\\frac{6}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'في التناسب يوضع الضلع كاملًا: $AB=4+2=6$، و$\\frac{6}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.', 'The whole side goes in the proportion: $AB=4+2=6$, and $\\frac{6}{4}=\\frac{BC}{B^{\\prime}C^{\\prime}}$.')
        },
        check: {
            prompt: say('Tales posizioan dauden bi triangelutan, $AB^{\\prime}=3$, $AB=9$ eta $B^{\\prime}C^{\\prime}=2$. Zenbat da $BC$?', 'En dos triángulos en posición de Tales, $AB^{\\prime}=3$, $AB=9$ y $B^{\\prime}C^{\\prime}=2$. ¿Cuánto mide $BC$?', 'في مثلثين في وضع طاليس $AB^{\\prime}=3$ و$AB=9$ و$B^{\\prime}C^{\\prime}=2$. كم طول $BC$؟', 'In two triangles in Thales’ position, $AB^{\\prime}=3$, $AB=9$ and $B^{\\prime}C^{\\prime}=2$. How long is $BC$?'),
            options: [same('$6$'), same('$4$'), same('$3$')],
            correctIndex: 0,
            explanation: say('$\\frac{9}{3}=\\frac{BC}{2}$, beraz $BC=6$. $B^{\\prime}B=6$ zatia erabiltzeak 4 ematen du, eta hori okerra da.', '$\\frac{9}{3}=\\frac{BC}{2}$, así que $BC=6$. Usar el trozo $B^{\\prime}B=6$ da 4, que está mal.', '$\\frac{9}{3}=\\frac{BC}{2}$، إذن $BC=6$. واستعمال الجزء $B^{\\prime}B=6$ يعطي 4، وهو خطأ.', '$\\frac{9}{3}=\\frac{BC}{2}$, so $BC=6$. Using the piece $B^{\\prime}B=6$ gives 4, which is wrong.')
        }
    },
    /* ---------- 2. Similarity ---------- */
    'similar-figures': {
        mistake: {
            wrong: say('2×3 eta 4×5 laukizuzenen angeluak berdinak dira; beraz, antzekoak dira.', 'Los rectángulos de 2×3 y 4×5 tienen los ángulos iguales, así que son semejantes.', 'المستطيلان 2×3 و4×5 لهما الزوايا نفسها، إذن هما متشابهان.', 'The 2×3 and 4×5 rectangles have equal angles, so they are similar.'),
            right: say('Aldeek ere proportzionalak izan behar dute: $\\frac{4}{2}=2$, baina $\\frac{5}{3}\\neq 2$. Ez dira antzekoak.', 'También tienen que ser proporcionales los lados: $\\frac{4}{2}=2$, pero $\\frac{5}{3}\\neq 2$. No son semejantes.', 'يجب أن تكون الأضلاع متناسبة أيضًا: $\\frac{4}{2}=2$، لكن $\\frac{5}{3}\\neq 2$. ليسا متشابهين.', 'The sides have to be proportional too: $\\frac{4}{2}=2$, but $\\frac{5}{3}\\neq 2$. They are not similar.')
        },
        check: {
            prompt: say('Zein laukizuzen da 6 cm × 9 cm-ko laukizuzen baten antzekoa?', '¿Qué rectángulo es semejante a uno de 6 cm por 9 cm?', 'أيّ مستطيل يشابه مستطيلًا أبعاده 6 سم في 9 سم؟', 'Which rectangle is similar to a 6 cm by 9 cm one?'),
            options: [
                say('$8$ cm × $11$ cm', '$8$ cm por $11$ cm', '$8$ سم في $11$ سم', '$8$ cm by $11$ cm'),
                say('$4$ cm × $6$ cm', '$4$ cm por $6$ cm', '$4$ سم في $6$ سم', '$4$ cm by $6$ cm'),
                say('$3$ cm × $9$ cm', '$3$ cm por $9$ cm', '$3$ سم في $9$ سم', '$3$ cm by $9$ cm')
            ],
            correctIndex: 1,
            explanation: say('$\\frac{4}{6}=\\frac{6}{9}=\\frac{2}{3}$: aldeak proportzionalak dira. Bi cm gehitzeak ez du antzekotasunik ematen.', '$\\frac{4}{6}=\\frac{6}{9}=\\frac{2}{3}$: los lados son proporcionales. Sumar 2 cm no da una figura semejante.', '$\\frac{4}{6}=\\frac{6}{9}=\\frac{2}{3}$: الأضلاع متناسبة. وإضافة 2 سم لا تعطي شكلًا مشابهًا.', '$\\frac{4}{6}=\\frac{6}{9}=\\frac{2}{3}$: the sides are proportional. Adding 2 cm does not give a similar shape.')
        }
    },
    criteria: {
        mistake: {
            wrong: say('2, 3, 4 eta 6, 4, 8 aldeko triangeluak: $\\frac{2}{6}\\neq\\frac{3}{4}$; ez dira antzekoak.', 'Triángulos de lados 2, 3, 4 y 6, 4, 8: $\\frac{2}{6}\\neq\\frac{3}{4}$, no son semejantes.', 'مثلثان أضلاعهما 2 و3 و4 و6 و4 و8: $\\frac{2}{6}\\neq\\frac{3}{4}$، ليسا متشابهين.', 'Triangles with sides 2, 3, 4 and 6, 4, 8: $\\frac{2}{6}\\neq\\frac{3}{4}$, they are not similar.'),
            right: say('Lehenik ordenatu: 2, 3, 4 eta 4, 6, 8. $\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$: antzekoak dira.', 'Ordena antes: 2, 3, 4 y 4, 6, 8. $\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$: sí lo son.', 'رتّب أولًا: 2 و3 و4 ثم 4 و6 و8. $\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$: متشابهان.', 'Put them in order first: 2, 3, 4 and 4, 6, 8. $\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$: they are similar.')
        },
        check: {
            prompt: say('Triangelu batek $40°$ eta $75°$-ko angeluak ditu. Zein da haren antzekoa?', 'Un triángulo tiene ángulos de $40°$ y $75°$. ¿Cuál es semejante a él?', 'مثلث زاويتاه $40°$ و$75°$. أيّ مثلث يشابهه؟', 'A triangle has angles of $40°$ and $75°$. Which one is similar to it?'),
            options: [
                say('$40°$ eta $50°$ dituena', 'Uno con $40°$ y $50°$', 'مثلث فيه $40°$ و$50°$', 'One with $40°$ and $50°$'),
                say('$75°$ eta $70°$ dituena', 'Uno con $75°$ y $70°$', 'مثلث فيه $75°$ و$70°$', 'One with $75°$ and $70°$'),
                say('$40°$ eta $65°$ dituena', 'Uno con $40°$ y $65°$', 'مثلث فيه $40°$ و$65°$', 'One with $40°$ and $65°$')
            ],
            correctIndex: 2,
            explanation: say('Hirugarren angelua $180°-40°-75°=65°$ da: $40°$ eta $65°$ dituenak bi angelu berdin ditu.', 'El tercer ángulo es $180°-40°-75°=65°$: el de $40°$ y $65°$ tiene dos ángulos iguales.', 'الزاوية الثالثة $180°-40°-75°=65°$: المثلث الذي فيه $40°$ و$65°$ له زاويتان متساويتان.', 'The third angle is $180°-40°-75°=65°$: the one with $40°$ and $65°$ has two equal angles.')
        }
    },
    homothety: {
        mistake: {
            wrong: say('$OA=4$ eta $OA^{\\prime}=6$: arrazoia $6-4=2$ da.', '$OA=4$ y $OA^{\\prime}=6$: la razón es $6-4=2$.', '$OA=4$ و$OA^{\\prime}=6$: النسبة $6-4=2$.', '$OA=4$ and $OA^{\\prime}=6$: the scale factor is $6-4=2$.'),
            right: say('Arrazoia zatidura bat da: $r=\\frac{6}{4}=1{,}5$.', 'La razón es un cociente: $r=\\frac{6}{4}=1{,}5$.', 'النسبة خارج قسمة: $r=\\frac{6}{4}=1{,}5$.', 'The scale factor is a quotient: $r=\\frac{6}{4}=1{,}5$.')
        },
        check: {
            prompt: say('$0{,}5$ arrazoiko homotezia batean, alde batek 8 cm neurtzen du. Zenbat neurtzen du haren irudiak?', 'En una homotecia de razón $0{,}5$, un lado mide 8 cm. ¿Cuánto mide su imagen?', 'في تحاكٍ نسبته $0{,}5$ طول ضلع 8 سم. كم طول صورته؟', 'In a homothety with scale factor $0{,}5$, a side is 8 cm. How long is its image?'),
            options: [unit('16', 'cm', 'سم'), unit('4', 'cm', 'سم'), unit('7{,}5', 'cm', 'سم')],
            correctIndex: 1,
            explanation: say('Luzera guztiak bider $r$: $8\\cdot 0{,}5=4$ cm. $r<1$ denez, txikitu egiten da.', 'Todas las longitudes por $r$: $8\\cdot 0{,}5=4$ cm. Como $r<1$, se reduce.', 'كل الأطوال في $r$: $8\\cdot 0{,}5=4$ سم. ولأن $r<1$ فإنها تصغر.', 'Every length times $r$: $8\\cdot 0{,}5=4$ cm. Since $r<1$, it shrinks.')
        }
    },
    /* ---------- 3. Ratios ---------- */
    'perimeter-ratio': {
        mistake: {
            wrong: say('2 arrazoiarekin, perimetroa bider 4.', 'Con razón 2, el perímetro se multiplica por 4.', 'بنسبة 2 يُضرب المحيط في 4.', 'With scale factor 2, the perimeter is multiplied by 4.'),
            right: say('Perimetroa luzera bat da: bider $r=2$. Bider 4 azalera da.', 'El perímetro es una longitud: se multiplica por $r=2$. Por 4 es el área.', 'المحيط طول: يُضرب في $r=2$. أما الضرب في 4 فللمساحة.', 'The perimeter is a length: it is multiplied by $r=2$. Times 4 is the area.')
        },
        check: {
            prompt: say('Bi karratu antzekoren perimetroak 12 cm eta 30 cm dira. Zein da antzekotasun-arrazoia?', 'Dos cuadrados semejantes tienen perímetros de 12 cm y 30 cm. ¿Cuál es la razón de semejanza?', 'مربعان متشابهان محيطاهما 12 سم و30 سم. ما نسبة التشابه؟', 'Two similar squares have perimeters of 12 cm and 30 cm. What is the scale factor?'),
            options: [same('$18$'), same('$6{,}25$'), same('$2{,}5$')],
            correctIndex: 2,
            explanation: say('Perimetroen zatidura arrazoia da: $30\\div 12=2{,}5$.', 'El cociente de los perímetros es la razón: $30\\div 12=2{,}5$.', 'خارج قسمة المحيطين هو النسبة: $30\\div 12=2{,}5$.', 'The quotient of the perimeters is the scale factor: $30\\div 12=2{,}5$.')
        }
    },
    'area-ratio': {
        mistake: {
            wrong: say('Aldea hirukoiztean, azalera hirukoiztu egiten da.', 'Si el lado se triplica, el área se triplica.', 'إذا تضاعف الضلع ثلاث مرات تضاعفت المساحة ثلاث مرات.', 'If the side is tripled, the area is tripled.'),
            right: say('Azalera $3^{2}=9$ zenbakiaz biderkatzen da.', 'El área se multiplica por $3^{2}=9$.', 'تُضرب المساحة في $3^{2}=9$.', 'The area is multiplied by $3^{2}=9$.')
        },
        check: {
            prompt: say('12 cm²-ko laukizuzen bat 3 arrazoiarekin handitzen da. Zein da azalera berria?', 'Un rectángulo de 12 cm² se amplía con razón 3. ¿Cuál es el área nueva?', 'مستطيل مساحته 12 سم² يُكبَّر بنسبة 3. ما المساحة الجديدة؟', 'A 12 cm² rectangle is enlarged with scale factor 3. What is the new area?'),
            options: [unit('36', 'cm²', 'سم²'), unit('108', 'cm²', 'سم²'), unit('324', 'cm²', 'سم²')],
            correctIndex: 1,
            explanation: say('Azalerak bider $r^{2}=9$: $12\\cdot 9=108$ cm².', 'Las áreas, por $r^{2}=9$: $12\\cdot 9=108$ cm².', 'المساحات في $r^{2}=9$: $12\\cdot 9=108$ سم².', 'Areas times $r^{2}=9$: $12\\cdot 9=108$ cm².')
        }
    },
    'volume-ratio': {
        mistake: {
            wrong: say('Ertzak bikoizten badira, bolumena bikoiztu egiten da.', 'Si las aristas se duplican, el volumen se duplica.', 'إذا تضاعفت الأحرف تضاعف الحجم.', 'If the edges are doubled, the volume is doubled.'),
            right: say('Bolumena $2^{3}=8$ zenbakiaz biderkatzen da.', 'El volumen se multiplica por $2^{3}=8$.', 'يُضرب الحجم في $2^{3}=8$.', 'The volume is multiplied by $2^{3}=8$.')
        },
        check: {
            prompt: say('1:20 eskalako maketa batek 3 dm³-ko bolumena du. Zein da benetako bolumena?', 'Una maqueta a escala 1:20 tiene un volumen de 3 dm³. ¿Cuál es el volumen real?', 'مجسّم بمقياس 1:20 حجمه 3 دسم³. ما الحجم الحقيقي؟', 'A 1:20 scale model has a volume of 3 dm³. What is the real volume?'),
            options: [unit('60', 'dm³', 'دسم³'), unit('1200', 'dm³', 'دسم³'), unit('24\\,000', 'dm³', 'دسم³')],
            correctIndex: 2,
            explanation: say('Bolumenak bider $20^{3}=8000$: $3\\cdot 8000=24\\,000$ dm³, hau da, 24 m³.', 'Los volúmenes, por $20^{3}=8000$: $3\\cdot 8000=24\\,000$ dm³, es decir, 24 m³.', 'الحجوم في $20^{3}=8000$: $3\\cdot 8000=24\\,000$ دسم³، أي 24 م³.', 'Volumes times $20^{3}=8000$: $3\\cdot 8000=24\\,000$ dm³, that is, 24 m³.')
        }
    },
    /* ---------- 4. Scales ---------- */
    scale: {
        mistake: {
            wrong: say('1:20\u00a0000 eskalan, 3 cm 60\u00a0000 km dira.', 'A escala 1:20\u00a0000, 3 cm son 60\u00a0000 km.', 'بمقياس 1:20\u00a0000، 3 سم هي 60\u00a0000 كم.', 'At a scale of 1:20,000, 3 cm is 60,000 km.'),
            right: say('60\u00a0000 cm dira, hau da, 600 m: aldatu unitatea amaieran.', 'Son 60\u00a0000 cm, es decir, 600 m: cambia la unidad al final.', 'إنها 60\u00a0000 سم، أي 600 م: غيّر الوحدة في النهاية.', 'It is 60,000 cm, that is, 600 m: change the unit at the end.')
        },
        check: {
            prompt: say('1:25\u00a0000 eskalako mapa batean bide batek 8 cm neurtzen ditu. Zenbat neurtzen du benetan?', 'En un mapa a escala 1:25\u00a0000, un camino mide 8 cm. ¿Cuánto mide en realidad?', 'في خريطة بمقياس 1:25\u00a0000 طول طريق 8 سم. كم طوله في الواقع؟', 'On a 1:25,000 map, a path is 8 cm long. How long is it in reality?'),
            options: [unit('200', 'km', 'كم'), unit('2', 'km', 'كم'), unit('20', 'km', 'كم')],
            correctIndex: 1,
            explanation: say('$8\\cdot 25\\,000=200\\,000$ cm, hau da, 2 km.', '$8\\cdot 25\\,000=200\\,000$ cm, que son 2 km.', '$8\\cdot 25\\,000=200\\,000$ سم، أي 2 كم.', '$8\\cdot 25\\,000=200\\,000$ cm, which is 2 km.')
        }
    },
    'find-scale': {
        mistake: {
            wrong: say('Mapako 3 cm 6 km dira: eskala 1:2.', '3 cm del mapa son 6 km: escala 1:2.', '3 سم في الخريطة هي 6 كم: المقياس 1:2.', '3 cm on the map is 6 km: scale 1:2.'),
            right: say('Lehenik unitate bera: 6 km = 600\u00a0000 cm; $600\\,000\\div 3=200\\,000$, eskala 1:200\u00a0000.', 'Primero la misma unidad: 6 km = 600\u00a0000 cm; $600\\,000\\div 3=200\\,000$, escala 1:200\u00a0000.', 'أولًا الوحدة نفسها: 6 كم = 600\u00a0000 سم؛ $600\\,000\\div 3=200\\,000$، المقياس 1:200\u00a0000.', 'First the same unit: 6 km = 600,000 cm; $600\\,000\\div 3=200\\,000$, scale 1:200,000.')
        },
        check: {
            prompt: say('Mapa batean 2 cm 1 km dira. Zein da eskala?', 'En un mapa, 2 cm representan 1 km. ¿Cuál es la escala?', 'في خريطة تمثّل 2 سم مسافة 1 كم. ما المقياس؟', 'On a map, 2 cm stand for 1 km. What is the scale?'),
            options: [say('1:2', '1:2', '1:2', '1:2'), say('1:500', '1:500', '1:500', '1:500'), say('1:50\u00a0000', '1:50\u00a0000', '1:50\u00a0000', '1:50,000')],
            correctIndex: 2,
            explanation: say('1 km = 100\u00a0000 cm, eta $100\\,000\\div 2=50\\,000$.', '1 km = 100\u00a0000 cm, y $100\\,000\\div 2=50\\,000$.', '1 كم = 100\u00a0000 سم، و$100\\,000\\div 2=50\\,000$.', '1 km = 100,000 cm, and $100\\,000\\div 2=50\\,000$.')
        }
    },
    plans: {
        mistake: {
            wrong: say('1:100 eskalan, planoko 6 cm² 600 cm² dira errealitatean.', 'A escala 1:100, 6 cm² del plano son 600 cm² reales.', 'بمقياس 1:100، 6 سم² في المخطط هي 600 سم² في الواقع.', 'At a scale of 1:100, 6 cm² on the plan is 600 cm² in reality.'),
            right: say('Azalerak bider $100^{2}=10\\,000$ doaz: 60\u00a0000 cm², hau da, 6 m².', 'Las áreas van por $100^{2}=10\\,000$: son 60\u00a0000 cm², 6 m².', 'المساحات في $100^{2}=10\\,000$: إنها 60\u00a0000 سم²، أي 6 م².', 'Areas go times $100^{2}=10\\,000$: it is 60,000 cm², 6 m².')
        },
        check: {
            prompt: say('1:10 eskalako plano batean mahai batek 15 cm² hartzen ditu. Zer azalera du benetan?', 'En un plano a escala 1:10, una mesa ocupa 15 cm². ¿Qué área tiene en realidad?', 'في مخطط بمقياس 1:10 تشغل طاولة 15 سم². ما مساحتها الحقيقية؟', 'On a 1:10 plan, a table covers 15 cm². What is its real area?'),
            options: [unit('150', 'cm²', 'سم²'), unit('1500', 'cm²', 'سم²'), unit('15\\,000', 'cm²', 'سم²')],
            correctIndex: 1,
            explanation: say('Azalerak bider $10^{2}=100$: $15\\cdot 100=1500$ cm².', 'Las áreas, por $10^{2}=100$: $15\\cdot 100=1500$ cm².', 'المساحات في $10^{2}=100$: $15\\cdot 100=1500$ سم².', 'Areas times $10^{2}=100$: $15\\cdot 100=1500$ cm².')
        }
    },
    /* ---------- 5. Heights and distances ---------- */
    shadows: {
        mistake: {
            wrong: say('1 m-ko makila batek 50 cm-ko itzala ematen du eta zuhaitz batek 6 m-koa: $\\frac{x}{6}=\\frac{1}{50}$.', 'Un palo de 1 m da 50 cm de sombra y un árbol, 6 m: $\\frac{x}{6}=\\frac{1}{50}$.', 'عصا طولها 1 م ظلها 50 سم وشجرة ظلها 6 م: $\\frac{x}{6}=\\frac{1}{50}$.', 'A 1 m stick casts a 50 cm shadow and a tree a 6 m one: $\\frac{x}{6}=\\frac{1}{50}$.'),
            right: say('Dena unitate berean: 50 cm = $0{,}5$ m, eta $\\frac{x}{6}=\\frac{1}{0{,}5}$; beraz, $x=12$ m.', 'Todo en la misma unidad: 50 cm = $0{,}5$ m, y $\\frac{x}{6}=\\frac{1}{0{,}5}$, así que $x=12$ m.', 'كل شيء بالوحدة نفسها: 50 سم = $0{,}5$ م، و$\\frac{x}{6}=\\frac{1}{0{,}5}$، إذن $x=12$ م.', 'Everything in the same unit: 50 cm = $0{,}5$ m, and $\\frac{x}{6}=\\frac{1}{0{,}5}$, so $x=12$ m.')
        },
        check: {
            prompt: say('2 m-ko zutoin batek 3 m-ko itzala ematen du. Aldi berean, dorre batek 24 m-koa. Zenbat neurtzen du dorreak?', 'Un poste de 2 m da una sombra de 3 m. A la vez, una torre da una sombra de 24 m. ¿Cuánto mide la torre?', 'عمود طوله 2 م ظله 3 م. وفي الوقت نفسه ظل برج 24 م. كم طول البرج؟', 'A 2 m post casts a 3 m shadow. At the same time, a tower casts a 24 m shadow. How tall is the tower?'),
            options: [unit('36', 'm', 'م'), unit('16', 'm', 'م'), unit('23', 'm', 'م')],
            correctIndex: 1,
            explanation: say('$\\frac{x}{24}=\\frac{2}{3}$, beraz $x=16$ m. 36 ateratzen da altuerak eta itzalak trukatzean.', '$\\frac{x}{24}=\\frac{2}{3}$, así que $x=16$ m. Sale 36 si se cambian alturas y sombras.', '$\\frac{x}{24}=\\frac{2}{3}$، إذن $x=16$ م. ويخرج 36 إذا بُدّلت الأطوال والظلال.', '$\\frac{x}{24}=\\frac{2}{3}$, so $x=16$ m. You get 36 if you swap heights and shadows.')
        }
    },
    mirror: {
        mistake: {
            wrong: say('1,70 m-ko pertsona bat (begiak 1,60 m-ra): $\\frac{x}{10}=\\frac{1{,}70}{2}$.', 'Una persona de 1,70 m (ojos a 1,60 m): $\\frac{x}{10}=\\frac{1{,}70}{2}$.', 'شخص طوله 1.70 م (عيناه على ارتفاع 1.60 م): $\\frac{x}{10}=\\frac{1{,}70}{2}$.', 'A person 1.70 m tall (eyes at 1.60 m): $\\frac{x}{10}=\\frac{1{,}70}{2}$.'),
            right: say('Begien altuera erabiltzen da: $\\frac{x}{10}=\\frac{1{,}60}{2}$, $x=8$ m.', 'Se usa la altura de los ojos: $\\frac{x}{10}=\\frac{1{,}60}{2}$, $x=8$ m.', 'نستعمل ارتفاع العينين: $\\frac{x}{10}=\\frac{1{,}60}{2}$، $x=8$ م.', 'Use the height of the eyes: $\\frac{x}{10}=\\frac{1{,}60}{2}$, $x=8$ m.')
        },
        check: {
            prompt: say('Ispilu bat farola batetik 12 m-ra dago. Begiak $1{,}5$ m-ra dituen pertsona batek ispilutik 2 m-ra ikusten du. Zenbat neurtzen du farolak?', 'Un espejo está a 12 m de una farola. Una persona con los ojos a $1{,}5$ m la ve desde 2 m del espejo. ¿Cuánto mide la farola?', 'مرآة على بعد 12 م من عمود إنارة. شخص عيناه على ارتفاع $1{,}5$ م يراه من بعد 2 م عن المرآة. كم طول العمود؟', 'A mirror is 12 m from a lamp post. A person with eyes at $1{,}5$ m sees it from 2 m away from the mirror. How tall is the lamp post?'),
            options: [unit('9', 'm', 'م'), unit('16', 'm', 'م'), unit('10{,}5', 'm', 'م')],
            correctIndex: 0,
            explanation: say('$\\frac{x}{12}=\\frac{1{,}5}{2}$, beraz $x=9$ m.', '$\\frac{x}{12}=\\frac{1{,}5}{2}$, así que $x=9$ m.', '$\\frac{x}{12}=\\frac{1{,}5}{2}$، إذن $x=9$ م.', '$\\frac{x}{12}=\\frac{1{,}5}{2}$, so $x=9$ m.')
        }
    },
    sight: {
        mistake: {
            wrong: say('Begiak kendu gabe: $\\frac{20\\cdot 3}{4}=15$ m.', 'Sin restar los ojos: $\\frac{20\\cdot 3}{4}=15$ m.', 'دون طرح ارتفاع العينين: $\\frac{20\\cdot 3}{4}=15$ م.', 'Without taking off the eyes: $\\frac{20\\cdot 3}{4}=15$ m.'),
            right: say('Triangelu txikiaren altuera $3-1{,}5=1{,}5$ da; gero begiak batzen dira: 9 m.', 'La altura del triángulo pequeño es $3-1{,}5=1{,}5$; después se suman los ojos: 9 m.', 'ارتفاع المثلث الصغير $3-1{,}5=1{,}5$؛ ثم نضيف ارتفاع العينين: 9 م.', 'The height of the small triangle is $3-1{,}5=1{,}5$; then you add the eyes: 9 m.')
        },
        check: {
            prompt: say('Begiak $1{,}5$ m-ra dituen pertsona bat $2{,}5$ m-ko zutoin batetik 3 m-ra dago, eta 12 m-ra dagoen zuhaitz baten punta lerrokatuta ikusten du. Zenbat neurtzen du zuhaitzak?', 'Unos ojos a $1{,}5$ m, a 3 m de un poste de $2{,}5$ m, ven alineada la punta de un árbol que está a 12 m. ¿Cuánto mide el árbol?', 'عينان على ارتفاع $1{,}5$ م، على بعد 3 م من عمود طوله $2{,}5$ م، تريان على استقامة واحدة قمة شجرة على بعد 12 م. كم طول الشجرة؟', 'Eyes at $1{,}5$ m, 3 m from a $2{,}5$ m post, see the top of a tree 12 m away lined up with it. How tall is the tree?'),
            options: [unit('10', 'm', 'م'), unit('4', 'm', 'م'), unit('5{,}5', 'm', 'م')],
            correctIndex: 2,
            explanation: say('Txikia: $2{,}5-1{,}5=1$ eta 3. Handia: $\\frac{12\\cdot 1}{3}=4$, gehi begiak: $4+1{,}5=5{,}5$ m.', 'Pequeño: $2{,}5-1{,}5=1$ y 3. Grande: $\\frac{12\\cdot 1}{3}=4$, más los ojos: $4+1{,}5=5{,}5$ m.', 'الصغير: $2{,}5-1{,}5=1$ و3. الكبير: $\\frac{12\\cdot 1}{3}=4$، زائد العينين: $4+1{,}5=5{,}5$ م.', 'Small: $2{,}5-1{,}5=1$ and 3. Large: $\\frac{12\\cdot 1}{3}=4$, plus the eyes: $4+1{,}5=5{,}5$ m.')
        }
    }
}
