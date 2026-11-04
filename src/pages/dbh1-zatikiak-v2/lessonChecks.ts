import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zatikiak · 1. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. ZKH / m.c.d. / GCD go in the words, and a
   question about «a fraction of a number» writes the number as a formula
   too, so the test does not take the fraction alone as the calculation.
   ========================================================================== */

export type FractionsIntroTopicId = 'what' | 'represent' | 'division' | 'types' | 'mixed' | 'line' | 'equivalent' | 'amplify-simplify' | 'compare' | 'add-same' | 'add-different' | 'multiply' | 'divide' | 'fraction-of' | 'problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const fractionsIntroLessonChecks: Record<FractionsIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Meaning ---------- */
    what: {
        mistake: {
            wrong: say('$\\frac{2}{5}$ zatikian, 5 hartzen diren zatiak dira.', 'En $\\frac{2}{5}$, el 5 son las partes que se toman.', 'في $\\frac{2}{5}$ العدد 5 هو عدد الأجزاء المأخوذة.', 'In $\\frac{2}{5}$, the 5 is the parts you take.'),
            right: say('Behean izendatzailea dago: osoa 5 zati berdinetan banatzen da, eta 2 hartzen dira.', 'Abajo va el denominador: el total se divide en 5 partes iguales y se toman 2.', 'المقام في الأسفل: نقسم الكل إلى 5 أجزاء متساوية ونأخذ 2.', 'The denominator goes underneath: the whole is split into 5 equal parts and you take 2.')
        },
        check: {
            prompt: say('Bizkotxo bat 12 zati berdinetan mozten da, eta 5 jaten dira. Zein zatiki jan da?', 'Un bizcocho se corta en 12 trozos iguales y se comen 5. ¿Qué fracción se han comido?', 'تُقطع كعكة إلى 12 قطعة متساوية ويُؤكل منها 5. ما الكسر الذي أُكل؟', 'A sponge cake is cut into 12 equal pieces and 5 are eaten. What fraction has been eaten?'),
            options: [same('$\\frac{5}{12}$'), same('$\\frac{12}{5}$'), same('$\\frac{7}{12}$')],
            correctIndex: 0,
            explanation: say('12 zati berdin (izendatzailea), eta 5 jan dira (zenbakitzailea): $\\frac{5}{12}$.', '12 partes iguales (denominador) y se comen 5 (numerador): $\\frac{5}{12}$.', '12 جزءًا متساويًا (المقام) أُكل منها 5 (البسط): $\\frac{5}{12}$.', '12 equal parts (denominator) and 5 are eaten (numerator): $\\frac{5}{12}$.')
        }
    },
    represent: {
        mistake: {
            wrong: say('Laukizuzen bat tamaina desberdineko 3 zatitan banatu, eta 1 margotzen badut, $\\frac{1}{3}$ marraztu dut.', 'Si divido un rectángulo en 3 trozos de distinto tamaño y coloreo 1, he dibujado $\\frac{1}{3}$.', 'إذا قسمت مستطيلًا إلى 3 قطع مختلفة الحجم ولوّنت واحدة، فقد رسمت $\\frac{1}{3}$.', 'If I split a rectangle into 3 pieces of different sizes and colour 1, I have drawn $\\frac{1}{3}$.'),
            right: say('Zatiek berdinak izan behar dute; bestela, ez dira herenak.', 'Las partes tienen que ser iguales; si no, no son tercios.', 'يجب أن تكون الأجزاء متساوية، وإلا فليست أثلاثًا.', 'The parts have to be equal; if not, they are not thirds.')
        },
        check: {
            prompt: say('Karratu bat 8 zati berdinetan banatuta dago, eta 3 daude margotuta. Zein zatiki geratzen da margotu gabe?', 'Un cuadrado está dividido en 8 partes iguales y hay 3 coloreadas. ¿Qué fracción queda sin colorear?', 'مربع مقسوم إلى 8 أجزاء متساوية، منها 3 ملوّنة. ما الكسر غير الملوّن؟', 'A square is split into 8 equal parts and 3 are coloured in. What fraction is not coloured?'),
            options: [same('$\\frac{3}{8}$'), same('$\\frac{5}{8}$'), same('$\\frac{5}{3}$')],
            correctIndex: 1,
            explanation: say('8 zatietatik 5 daude margotu gabe: $\\frac{5}{8}$.', 'De las 8 partes, 5 están sin colorear: $\\frac{5}{8}$.', 'من الأجزاء الثمانية 5 غير ملوّنة: $\\frac{5}{8}$.', 'Of the 8 parts, 5 are not coloured: $\\frac{5}{8}$.')
        }
    },
    division: {
        mistake: {
            wrong: say('$\\frac{2}{5}=5\\mathbin{:}2=2{,}5$', '$\\frac{2}{5}=5\\mathbin{:}2=2{,}5$', '$\\frac{2}{5}=5\\mathbin{:}2=2.5$', '$\\frac{2}{5}=5\\mathbin{:}2=2{,}5$'),
            right: say('Zenbakitzailea zatitzen da izendatzailearekin: $\\frac{2}{5}=2\\mathbin{:}5=0{,}4$.', 'Se divide el numerador entre el denominador: $\\frac{2}{5}=2\\mathbin{:}5=0{,}4$.', 'نقسم البسط على المقام: $\\frac{2}{5}=2\\mathbin{:}5=0{,}4$.', 'Divide the numerator by the denominator: $\\frac{2}{5}=2\\mathbin{:}5=0{,}4$.')
        },
        check: {
            prompt: say('Zein zenbaki hamartar da $\\frac{3}{5}$?', '¿Qué número decimal es $\\frac{3}{5}$?', 'ما العدد العشري $\\frac{3}{5}$؟', 'Which decimal is $\\frac{3}{5}$?'),
            options: [same('$0{,}6$'), same('$1{,}6$'), same('$0{,}35$')],
            correctIndex: 0,
            explanation: say('$3\\mathbin{:}5=0{,}6$: zenbakitzailea izendatzailearekin zatituta.', '$3\\mathbin{:}5=0{,}6$: el numerador entre el denominador.', '$3\\mathbin{:}5=0{,}6$: البسط مقسومًا على المقام.', '$3\\mathbin{:}5=0{,}6$: the numerator divided by the denominator.')
        }
    },

    /* ---------- 2. Kinds of fractions ---------- */
    types: {
        mistake: {
            wrong: say('$\\frac{6}{5}$ zatikiak 1 baino gutxiago balio du.', '$\\frac{6}{5}$ vale menos que 1.', '$\\frac{6}{5}$ أقل من 1.', '$\\frac{6}{5}$ is less than 1.'),
            right: say('Zenbakitzailea izendatzailea baino handiagoa da: $\\frac{6}{5}>1$, inpropioa da.', 'El numerador es mayor que el denominador: $\\frac{6}{5}>1$, es impropia.', 'البسط أكبر من المقام: $\\frac{6}{5}>1$، فهو كسر غير فعلي.', 'The numerator is bigger than the denominator: $\\frac{6}{5}>1$, it is improper.')
        },
        check: {
            prompt: say('Zein zatiki da 1 baino handiagoa?', '¿Qué fracción es mayor que 1?', 'أيّ كسر أكبر من 1؟', 'Which fraction is greater than 1?'),
            options: [same('$\\frac{8}{9}$'), same('$\\frac{10}{10}$'), same('$\\frac{12}{7}$')],
            correctIndex: 2,
            explanation: say('$\\frac{12}{7}$ zatikian zenbakitzailea handiagoa da: inpropioa. $\\frac{10}{10}=1$ eta $\\frac{8}{9}<1$.', 'En $\\frac{12}{7}$ el numerador es mayor: es impropia. $\\frac{10}{10}=1$ y $\\frac{8}{9}<1$.', 'في $\\frac{12}{7}$ البسط أكبر: كسر غير فعلي. و$\\frac{10}{10}=1$ و$\\frac{8}{9}<1$.', 'In $\\frac{12}{7}$ the numerator is bigger: it is improper. $\\frac{10}{10}=1$ and $\\frac{8}{9}<1$.')
        }
    },
    mixed: {
        mistake: {
            wrong: say('$\\frac{13}{4}=4\\frac{1}{4}$', '$\\frac{13}{4}=4\\frac{1}{4}$', '$\\frac{13}{4}=4\\frac{1}{4}$', '$\\frac{13}{4}=4\\frac{1}{4}$'),
            right: say('Zatitu: $13=4\\cdot 3+1$. 3 unitate dira eta $\\frac{1}{4}$: $3\\frac{1}{4}$.', 'Divide: $13=4\\cdot 3+1$. Son 3 unidades y $\\frac{1}{4}$: $3\\frac{1}{4}$.', 'اقسم: $13=4\\cdot 3+1$. إذن 3 وحدات و$\\frac{1}{4}$: $3\\frac{1}{4}$.', 'Divide: $13=4\\cdot 3+1$. That is 3 wholes and $\\frac{1}{4}$: $3\\frac{1}{4}$.')
        },
        check: {
            prompt: say('Zein zenbaki misto da $\\frac{19}{7}$?', '¿Qué número mixto es $\\frac{19}{7}$?', 'ما العدد الكسري المساوي لـ$\\frac{19}{7}$؟', 'Which mixed number is $\\frac{19}{7}$?'),
            options: [same('$2\\frac{5}{7}$'), same('$5\\frac{2}{7}$'), same('$2\\frac{7}{5}$')],
            correctIndex: 0,
            explanation: say('$19=7\\cdot 2+5$: 2 unitate oso eta $\\frac{5}{7}$.', '$19=7\\cdot 2+5$: 2 unidades completas y $\\frac{5}{7}$.', '$19=7\\cdot 2+5$: وحدتان كاملتان و$\\frac{5}{7}$.', '$19=7\\cdot 2+5$: 2 whole units and $\\frac{5}{7}$.')
        }
    },
    line: {
        mistake: {
            wrong: say('$\\frac{2}{3}$ kokatzeko, 0 eta 2 arteko zuzen osoa 3 zatitan banatzen dut.', 'Para situar $\\frac{2}{3}$, divido toda la recta de 0 a 2 en 3 partes.', 'لوضع $\\frac{2}{3}$ أقسم المستقيم كله من 0 إلى 2 إلى 3 أجزاء.', 'To place $\\frac{2}{3}$, I split the whole line from 0 to 2 into 3 parts.'),
            right: say('Unitate bakoitza banatzen da 3 zatitan: $\\frac{2}{3}$ zatikia 0 eta 1 artean dago, bi heren aurrera.', 'Se divide cada unidad en 3 partes: $\\frac{2}{3}$ está entre 0 y 1, a dos tercios.', 'نقسم كل وحدة إلى 3 أجزاء: يقع $\\frac{2}{3}$ بين 0 و1، بعد ثلثين.', 'Each unit is split into 3 parts: $\\frac{2}{3}$ is between 0 and 1, two thirds along.')
        },
        check: {
            prompt: say('Zuzenean, zein zenbakiren artean dago $\\frac{11}{4}$?', '¿Entre qué números está $\\frac{11}{4}$ en la recta?', 'بين أيّ عددين يقع $\\frac{11}{4}$ على المستقيم؟', 'Between which numbers is $\\frac{11}{4}$ on the line?'),
            options: [say('2 eta 3 artean', 'Entre 2 y 3', 'بين 2 و3', 'Between 2 and 3'), say('11 eta 12 artean', 'Entre 11 y 12', 'بين 11 و12', 'Between 11 and 12'), say('0 eta 1 artean', 'Entre 0 y 1', 'بين 0 و1', 'Between 0 and 1')],
            correctIndex: 0,
            explanation: say('$11=4\\cdot 2+3$: bi unitate oso eta hiru laurden gehiago.', '$11=4\\cdot 2+3$: dos unidades enteras y tres cuartos más.', '$11=4\\cdot 2+3$: وحدتان كاملتان وثلاثة أرباع أخرى.', '$11=4\\cdot 2+3$: two whole units and three quarters more.')
        }
    },

    /* ---------- 3. Equivalence ---------- */
    equivalent: {
        mistake: {
            wrong: say('$\\frac{2}{3}$ eta $\\frac{4}{5}$ baliokideak dira, bi gaiei 2 batu zaielako.', '$\\frac{2}{3}$ y $\\frac{4}{5}$ son equivalentes, porque a los dos términos se les ha sumado 2.', '$\\frac{2}{3}$ و$\\frac{4}{5}$ متكافئان لأننا أضفنا 2 إلى الحدّين.', '$\\frac{2}{3}$ and $\\frac{4}{5}$ are equivalent, because 2 has been added to both terms.'),
            right: say('Batzeak ez du zatiki baliokiderik ematen: $2\\cdot 5=10$ eta $3\\cdot 4=12$ ez dira berdinak.', 'Sumar no da fracciones equivalentes: $2\\cdot 5=10$ y $3\\cdot 4=12$ no son iguales.', 'الجمع لا يعطي كسورًا متكافئة: $2\\cdot 5=10$ و$3\\cdot 4=12$ غير متساويين.', 'Adding does not give equivalent fractions: $2\\cdot 5=10$ and $3\\cdot 4=12$ are not equal.')
        },
        check: {
            prompt: say('Zein zatiki da $\\frac{3}{5}$ zatikiaren baliokidea?', '¿Qué fracción es equivalente a $\\frac{3}{5}$?', 'أيّ كسر يكافئ $\\frac{3}{5}$؟', 'Which fraction is equivalent to $\\frac{3}{5}$?'),
            options: [same('$\\frac{5}{7}$'), same('$\\frac{9}{15}$'), same('$\\frac{6}{8}$')],
            correctIndex: 1,
            explanation: say('Biderkadura gurutzatuak: $3\\cdot 15=45$ eta $5\\cdot 9=45$.', 'Productos cruzados: $3\\cdot 15=45$ y $5\\cdot 9=45$.', 'الضرب التبادلي: $3\\cdot 15=45$ و$5\\cdot 9=45$.', 'Cross products: $3\\cdot 15=45$ and $5\\cdot 9=45$.')
        }
    },
    'amplify-simplify': {
        mistake: {
            wrong: say('$\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14}=\\frac{5}{14}$', '$\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14}=\\frac{5}{14}$', '$\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14}=\\frac{5}{14}$', '$\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14}=\\frac{5}{14}$'),
            right: say('Bi gaiak zatitu behar dira: $\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14\\mathbin{:}2}=\\frac{5}{7}$.', 'Hay que dividir los dos términos: $\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14\\mathbin{:}2}=\\frac{5}{7}$.', 'يجب قسمة الحدّين معًا: $\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14\\mathbin{:}2}=\\frac{5}{7}$.', 'You have to divide both terms: $\\frac{10}{14}=\\frac{10\\mathbin{:}2}{14\\mathbin{:}2}=\\frac{5}{7}$.')
        },
        check: {
            prompt: say('Zein da $\\frac{18}{45}$ zatikiaren zatiki laburtezina?', '¿Cuál es la fracción irreducible de $\\frac{18}{45}$?', 'ما الكسر غير القابل للاختزال المكافئ لـ$\\frac{18}{45}$؟', 'What is the simplest form of $\\frac{18}{45}$?'),
            options: [same('$\\frac{2}{45}$'), same('$\\frac{2}{5}$'), same('$\\frac{9}{15}$')],
            correctIndex: 1,
            explanation: say('ZKH 9 da: $\\frac{18\\mathbin{:}9}{45\\mathbin{:}9}=\\frac{2}{5}$.', 'El m.c.d. es 9: $\\frac{18\\mathbin{:}9}{45\\mathbin{:}9}=\\frac{2}{5}$.', 'ق.م.أ هو 9: $\\frac{18\\mathbin{:}9}{45\\mathbin{:}9}=\\frac{2}{5}$.', 'The GCD is 9: $\\frac{18\\mathbin{:}9}{45\\mathbin{:}9}=\\frac{2}{5}$.')
        }
    },
    compare: {
        mistake: {
            wrong: say('$\\frac{1}{8}>\\frac{1}{5}$, 8 handiagoa delako 5 baino.', '$\\frac{1}{8}>\\frac{1}{5}$, porque 8 es mayor que 5.', '$\\frac{1}{8}>\\frac{1}{5}$ لأن 8 أكبر من 5.', '$\\frac{1}{8}>\\frac{1}{5}$, because 8 is bigger than 5.'),
            right: say('Zenbakitzaile berarekin, izendatzaile txikiena duena da handiena: bostenak zati handiagoak dira. $\\frac{1}{5}>\\frac{1}{8}$.', 'Con el mismo numerador es mayor la de menor denominador: los quintos son trozos más grandes. $\\frac{1}{5}>\\frac{1}{8}$.', 'مع البسط نفسه يكون الأكبر صاحب المقام الأصغر: الأخماس قطع أكبر. $\\frac{1}{5}>\\frac{1}{8}$.', 'With the same numerator, the one with the smaller denominator is bigger: fifths are bigger pieces. $\\frac{1}{5}>\\frac{1}{8}$.')
        },
        check: {
            prompt: say('Zein zatiki da handiena?', '¿Qué fracción es la mayor?', 'أيّ كسر هو الأكبر؟', 'Which fraction is the biggest?'),
            options: [same('$\\frac{2}{3}$'), same('$\\frac{5}{9}$'), same('$\\frac{7}{9}$')],
            correctIndex: 2,
            explanation: say('9 izendatzailearekin: $\\frac{2}{3}=\\frac{6}{9}$. Zenbakitzaileak: $5<6<7$.', 'Con denominador 9: $\\frac{2}{3}=\\frac{6}{9}$. Numeradores: $5<6<7$.', 'بالمقام 9: $\\frac{2}{3}=\\frac{6}{9}$. البسوط: $5<6<7$.', 'With denominator 9: $\\frac{2}{3}=\\frac{6}{9}$. Numerators: $5<6<7$.')
        }
    },

    /* ---------- 4. Operations ---------- */
    'add-same': {
        mistake: {
            wrong: say('$\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{8}$', '$\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{8}$', '$\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{8}$', '$\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{8}$'),
            right: say('Izendatzailea ez da batzen: laurdenak laurdenekin, $\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}$.', 'El denominador no se suma: son cuartos con cuartos, $\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}$.', 'المقام لا يُجمع: أرباع مع أرباع، $\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}$.', 'The denominator is not added: quarters with quarters, $\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{4}{9}+\\frac{2}{9}$?', '¿Cuánto es $\\frac{4}{9}+\\frac{2}{9}$?', 'كم يساوي $\\frac{4}{9}+\\frac{2}{9}$؟', 'What is $\\frac{4}{9}+\\frac{2}{9}$?'),
            options: [same('$\\frac{6}{18}$'), same('$\\frac{6}{9}$'), same('$\\frac{8}{9}$')],
            correctIndex: 1,
            explanation: say('Zenbakitzaileak batzen dira, eta izendatzailea berdin geratzen da: $\\frac{6}{9}=\\frac{2}{3}$.', 'Se suman los numeradores y el denominador se queda: $\\frac{6}{9}=\\frac{2}{3}$.', 'نجمع البسطين ويبقى المقام: $\\frac{6}{9}=\\frac{2}{3}$.', 'Add the numerators and keep the denominator: $\\frac{6}{9}=\\frac{2}{3}$.')
        }
    },
    'add-different': {
        mistake: {
            wrong: say('$\\frac{1}{2}+\\frac{2}{5}=\\frac{3}{7}$', '$\\frac{1}{2}+\\frac{2}{5}=\\frac{3}{7}$', '$\\frac{1}{2}+\\frac{2}{5}=\\frac{3}{7}$', '$\\frac{1}{2}+\\frac{2}{5}=\\frac{3}{7}$'),
            right: say('Lehenik, izendatzaile komuna: $\\frac{5}{10}+\\frac{4}{10}=\\frac{9}{10}$.', 'Primero, común denominador: $\\frac{5}{10}+\\frac{4}{10}=\\frac{9}{10}$.', 'أولًا المقام المشترك: $\\frac{5}{10}+\\frac{4}{10}=\\frac{9}{10}$.', 'First, a common denominator: $\\frac{5}{10}+\\frac{4}{10}=\\frac{9}{10}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{1}{3}+\\frac{1}{4}$?', '¿Cuánto es $\\frac{1}{3}+\\frac{1}{4}$?', 'كم يساوي $\\frac{1}{3}+\\frac{1}{4}$؟', 'What is $\\frac{1}{3}+\\frac{1}{4}$?'),
            options: [same('$\\frac{2}{7}$'), same('$\\frac{7}{12}$'), same('$\\frac{2}{12}$')],
            correctIndex: 1,
            explanation: say('MKT 12 da: $\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}$.', 'El m.c.m. es 12: $\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}$.', 'م.م.أ هو 12: $\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}$.', 'The LCM is 12: $\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}$.')
        }
    },
    multiply: {
        mistake: {
            wrong: say('$3\\cdot\\frac{2}{7}=\\frac{6}{21}$', '$3\\cdot\\frac{2}{7}=\\frac{6}{21}$', '$3\\cdot\\frac{2}{7}=\\frac{6}{21}$', '$3\\cdot\\frac{2}{7}=\\frac{6}{21}$'),
            right: say('3 zenbakia $\\frac{3}{1}$ da: zenbakitzailea bakarrik biderkatzen du, $3\\cdot\\frac{2}{7}=\\frac{6}{7}$.', 'El 3 es $\\frac{3}{1}$: solo multiplica al numerador, $3\\cdot\\frac{2}{7}=\\frac{6}{7}$.', 'العدد 3 هو $\\frac{3}{1}$: يضرب البسط فقط، $3\\cdot\\frac{2}{7}=\\frac{6}{7}$.', 'The 3 is $\\frac{3}{1}$: it only multiplies the numerator, $3\\cdot\\frac{2}{7}=\\frac{6}{7}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{2}{5}\\cdot\\frac{3}{4}$?', '¿Cuánto es $\\frac{2}{5}\\cdot\\frac{3}{4}$?', 'كم يساوي $\\frac{2}{5}\\cdot\\frac{3}{4}$؟', 'What is $\\frac{2}{5}\\cdot\\frac{3}{4}$?'),
            options: [same('$\\frac{6}{20}$'), same('$\\frac{5}{9}$'), same('$\\frac{8}{15}$')],
            correctIndex: 0,
            explanation: say('Goikoak goikoekin eta behekoak behekoekin: $\\frac{2\\cdot 3}{5\\cdot 4}=\\frac{6}{20}=\\frac{3}{10}$.', 'Arriba con arriba y abajo con abajo: $\\frac{2\\cdot 3}{5\\cdot 4}=\\frac{6}{20}=\\frac{3}{10}$.', 'البسط مع البسط والمقام مع المقام: $\\frac{2\\cdot 3}{5\\cdot 4}=\\frac{6}{20}=\\frac{3}{10}$.', 'Top with top and bottom with bottom: $\\frac{2\\cdot 3}{5\\cdot 4}=\\frac{6}{20}=\\frac{3}{10}$.')
        }
    },
    divide: {
        mistake: {
            wrong: say('$\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{3}{14}$', '$\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{3}{14}$', '$\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{3}{14}$', '$\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{3}{14}$'),
            right: say('Hori lerroan biderkatzea da. Zatitzean, gurutzean: $\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{7}{6}$.', 'Eso es multiplicar en línea. Al dividir, en cruz: $\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{7}{6}$.', 'هذا ضرب على الخط. أما في القسمة فبالتقاطع: $\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{7}{6}$.', 'That is multiplying in line. To divide, cross over: $\\frac{1}{2}\\mathbin{:}\\frac{3}{7}=\\frac{7}{6}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{3}{5}\\mathbin{:}\\frac{1}{2}$?', '¿Cuánto es $\\frac{3}{5}\\mathbin{:}\\frac{1}{2}$?', 'كم يساوي $\\frac{3}{5}\\mathbin{:}\\frac{1}{2}$؟', 'What is $\\frac{3}{5}\\mathbin{:}\\frac{1}{2}$?'),
            options: [same('$\\frac{3}{10}$'), same('$\\frac{6}{5}$'), same('$\\frac{5}{6}$')],
            correctIndex: 1,
            explanation: say('Gurutzean: $3\\cdot 2=6$ eta $5\\cdot 1=5$.', 'En cruz: $3\\cdot 2=6$ y $5\\cdot 1=5$.', 'بالتقاطع: $3\\cdot 2=6$ و$5\\cdot 1=5$.', 'Crossing over: $3\\cdot 2=6$ and $5\\cdot 1=5$.')
        }
    },

    /* ---------- 5. Problems ---------- */
    'fraction-of': {
        mistake: {
            wrong: say('60 zenbakiaren $\\frac{2}{3}$: $60\\mathbin{:}2\\cdot 3=90$.', '$\\frac{2}{3}$ de 60 es $60\\mathbin{:}2\\cdot 3=90$.', '$\\frac{2}{3}$ من 60 هو $60\\mathbin{:}2\\cdot 3=90$.', '$\\frac{2}{3}$ of 60 is $60\\mathbin{:}2\\cdot 3=90$.'),
            right: say('Izendatzailearekin zatitzen da eta zenbakitzailearekin biderkatu: $60\\mathbin{:}3\\cdot 2=40$.', 'Se divide entre el denominador y se multiplica por el numerador: $60\\mathbin{:}3\\cdot 2=40$.', 'نقسم على المقام ونضرب في البسط: $60\\mathbin{:}3\\cdot 2=40$.', 'Divide by the denominator and multiply by the numerator: $60\\mathbin{:}3\\cdot 2=40$.')
        },
        check: {
            prompt: say('Zenbat da $42$ zenbakiaren $\\frac{5}{6}$?', '¿Cuánto es $\\frac{5}{6}$ de $42$?', 'كم يساوي $\\frac{5}{6}$ من $42$؟', 'What is $\\frac{5}{6}$ of $42$?'),
            options: [same('$35$'), same('$50$'), same('$7$')],
            correctIndex: 0,
            explanation: say('Zati bat: $42\\mathbin{:}6=7$. Bost zati: $7\\cdot 5=35$.', 'Una parte: $42\\mathbin{:}6=7$. Cinco partes: $7\\cdot 5=35$.', 'جزء واحد: $42\\mathbin{:}6=7$. خمسة أجزاء: $7\\cdot 5=35$.', 'One part: $42\\mathbin{:}6=7$. Five parts: $7\\cdot 5=35$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('20 euroren $\\frac{1}{4}$ gastatu ditu. 5 euro geratzen zaizkio.', 'Gasta $\\frac{1}{4}$ de 20 €. Le quedan 5 €.', 'أنفق $\\frac{1}{4}$ من 20 يورو. بقي معه 5 يورو.', 'He spends $\\frac{1}{4}$ of €20. He has €5 left.'),
            right: say('5 euro gastatutakoa da. Geratzen dena $1-\\frac{1}{4}=\\frac{3}{4}$ da: $20\\mathbin{:}4\\cdot 3=15$ euro.', '5 € es lo gastado. Queda $1-\\frac{1}{4}=\\frac{3}{4}$: $20\\mathbin{:}4\\cdot 3=15$ €.', '5 يورو هي ما أُنفق. والباقي $1-\\frac{1}{4}=\\frac{3}{4}$: $20\\mathbin{:}4\\cdot 3=15$ يورو.', '€5 is what he spent. What is left is $1-\\frac{1}{4}=\\frac{3}{4}$: $20\\mathbin{:}4\\cdot 3=15$.')
        },
        check: {
            prompt: say('Luisek $210$ orrialdeko liburu baten $\\frac{2}{7}$ irakurri du. Zenbat orrialde geratzen zaizkio irakurtzeko?', 'Luis ha leído $\\frac{2}{7}$ de un libro de $210$ páginas. ¿Cuántas páginas le quedan por leer?', 'قرأ لويس $\\frac{2}{7}$ من كتاب فيه $210$ صفحة. كم صفحة بقيت له؟', 'Luis has read $\\frac{2}{7}$ of a $210$-page book. How many pages has he still got to read?'),
            options: [same('$60$'), same('$150$'), same('$140$')],
            correctIndex: 1,
            explanation: say('Geratzen dena $\\frac{5}{7}$ da: $210\\mathbin{:}7\\cdot 5=150$ orrialde.', 'Queda $\\frac{5}{7}$: $210\\mathbin{:}7\\cdot 5=150$ páginas.', 'الباقي $\\frac{5}{7}$: $210\\mathbin{:}7\\cdot 5=150$ صفحة.', 'What is left is $\\frac{5}{7}$: $210\\mathbin{:}7\\cdot 5=150$ pages.')
        }
    }
}
