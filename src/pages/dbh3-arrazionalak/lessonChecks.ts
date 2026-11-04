import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import
   it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. Arabic writes the
   decimal point. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type RationalsTopicId = 'rational-meaning' | 'equivalent' | 'simplify' | 'compare' | 'line' | 'between' | 'add-sub' | 'mul-div' | 'combined' | 'decimal-kinds' | 'exact-generatrix' | 'periodic-generatrix' | 'fraction-of' | 'remaining' | 'whole-from-part'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const rationalsLessonChecks: Record<RationalsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'rational-meaning': {
        mistake: {
            wrong: say('$\\frac{-8}{-3}$ negatiboa da, bi minus zeinu dituelako.', '$\\frac{-8}{-3}$ es negativa, porque tiene dos signos menos.', '$\\frac{-8}{-3}$ سالب لأن فيه إشارتي ناقص.', '$\\frac{-8}{-3}$ is negative, because it has two minus signs.'),
            right: say('Zeinu bereko gaiek zatiki positiboa ematen dute: $\\frac{-8}{-3}=\\frac{8}{3}$.', 'Dos términos del mismo signo dan una fracción positiva: $\\frac{-8}{-3}=\\frac{8}{3}$.', 'حدّان بالإشارة نفسها يعطيان كسرًا موجبًا: $\\frac{-8}{-3}=\\frac{8}{3}$.', 'Two terms with the same sign give a positive fraction: $\\frac{-8}{-3}=\\frac{8}{3}$.')
        },
        check: {
            prompt: say('Zein zatiki da $-\\frac{2}{7}$ zatikiaren berdina?', '¿Qué fracción es igual a $-\\frac{2}{7}$?', 'أي كسر يساوي $-\\frac{2}{7}$؟', 'Which fraction is equal to $-\\frac{2}{7}$?'),
            options: [same('$\\frac{-2}{-7}$'), same('$\\frac{2}{-7}$'), same('$\\frac{-7}{2}$')],
            correctIndex: 1,
            explanation: say('Zeinu desberdineko gaiekin zatikia negatiboa da: $\\frac{2}{-7}=-\\frac{2}{7}$. $\\frac{-2}{-7}$ positiboa da.', 'Con términos de distinto signo la fracción es negativa: $\\frac{2}{-7}=-\\frac{2}{7}$. $\\frac{-2}{-7}$ es positiva.', 'مع حدين مختلفي الإشارة يكون الكسر سالبًا: $\\frac{2}{-7}=-\\frac{2}{7}$. أما $\\frac{-2}{-7}$ فموجب.', 'With terms of different signs the fraction is negative: $\\frac{2}{-7}=-\\frac{2}{7}$. $\\frac{-2}{-7}$ is positive.')
        }
    },
    equivalent: {
        mistake: {
            wrong: say('Zatiki baliokide bat lortzeko, zenbaki bera batzen zaie goiko eta beheko gaiei: $\\frac{2}{5}=\\frac{4}{7}$.', 'Para obtener una equivalente, se suma el mismo número arriba y abajo: $\\frac{2}{5}=\\frac{4}{7}$.', 'للحصول على كسر مكافئ نضيف العدد نفسه إلى البسط والمقام: $\\frac{2}{5}=\\frac{4}{7}$.', 'To get an equivalent fraction, add the same number on top and bottom: $\\frac{2}{5}=\\frac{4}{7}$.'),
            right: say('Biderkatu edo zatitu egiten da, ez batu: $\\frac{2}{5}=\\frac{4}{10}$, $2\\cdot 10=5\\cdot 4$ delako.', 'Se multiplica o se divide, no se suma: $\\frac{2}{5}=\\frac{4}{10}$, porque $2\\cdot 10=5\\cdot 4$.', 'نضرب أو نقسم ولا نجمع: $\\frac{2}{5}=\\frac{4}{10}$ لأن $2\\cdot 10=5\\cdot 4$.', 'You multiply or divide, not add: $\\frac{2}{5}=\\frac{4}{10}$, because $2\\cdot 10=5\\cdot 4$.')
        },
        check: {
            prompt: say('Zer balio du $x$ ezezagunak $\\frac{x}{12}=\\frac{15}{20}$ izan dadin?', '¿Qué valor de $x$ hace que $\\frac{x}{12}=\\frac{15}{20}$?', 'ما قيمة $x$ التي تجعل $\\frac{x}{12}=\\frac{15}{20}$؟', 'Which value of $x$ makes $\\frac{x}{12}=\\frac{15}{20}$?'),
            options: [same('$x=7$'), same('$x=16$'), same('$x=9$')],
            correctIndex: 2,
            explanation: say('Gurutzeko biderkadurak: $x\\cdot 20=12\\cdot 15=180$; beraz, $x=180\\div 20=9$.', 'Productos cruzados: $x\\cdot 20=12\\cdot 15=180$, así que $x=180\\div 20=9$.', 'حاصلا الضرب التبادلي: $x\\cdot 20=12\\cdot 15=180$، إذن $x=180\\div 20=9$.', 'Cross products: $x\\cdot 20=12\\cdot 15=180$, so $x=180\\div 20=9$.')
        }
    },
    simplify: {
        mistake: {
            wrong: say('$\\frac{36}{48}=\\frac{18}{24}$: sinplifikatuta dago jada.', '$\\frac{36}{48}=\\frac{18}{24}$: ya está simplificada.', '$\\frac{36}{48}=\\frac{18}{24}$: لقد اختُزل الكسر.', '$\\frac{36}{48}=\\frac{18}{24}$: it is already simplified.'),
            right: say('$\\frac{18}{24}$ oraindik 6 zenbakiaz zati daiteke. Zatitu z.k.h.(36, 48) = 12 zenbakiaz: $\\frac{36}{48}=\\frac{3}{4}$.', '$\\frac{18}{24}$ aún se puede dividir entre 6. Divide entre el m.c.d.(36, 48) = 12: $\\frac{36}{48}=\\frac{3}{4}$.', 'ما زال $\\frac{18}{24}$ يقبل القسمة على 6. اقسم على ق.م.أ.(36، 48) = 12: $\\frac{36}{48}=\\frac{3}{4}$.', '$\\frac{18}{24}$ can still be divided by 6. Divide by GCD(36, 48) = 12: $\\frac{36}{48}=\\frac{3}{4}$.')
        },
        check: {
            prompt: say('Zein zenbakiz zatitu behar dira 60 eta 84, zatiki laburtezinera pauso bakarrean iristeko?', '¿Entre qué número hay que dividir 60 y 84 para llegar a la irreducible en un solo paso?', 'على أي عدد نقسم 60 و84 لنصل إلى الكسر غير القابل للاختزال بخطوة واحدة؟', 'Which number should you divide 60 and 84 by to reach the simplest form in a single step?'),
            options: [say('2 zenbakiaz', 'Entre 2', 'على 2', 'By 2'), say('6 zenbakiaz', 'Entre 6', 'على 6', 'By 6'), say('12 zenbakiaz', 'Entre 12', 'على 12', 'By 12')],
            correctIndex: 2,
            explanation: say('z.k.h.(60, 84) = 12, eta $\\frac{60}{84}=\\frac{5}{7}$. 2 edo 6 zenbakiaz zatituta, oraindik sinplifikatu behar da.', 'El m.c.d.(60, 84) = 12, y $\\frac{60}{84}=\\frac{5}{7}$. Entre 2 o entre 6 aún quedaría por simplificar.', 'ق.م.أ.(60، 84) = 12، و$\\frac{60}{84}=\\frac{5}{7}$. وبالقسمة على 2 أو 6 يبقى الاختزال ناقصًا.', 'GCD(60, 84) = 12, and $\\frac{60}{84}=\\frac{5}{7}$. Dividing by 2 or by 6 would leave more simplifying to do.')
        }
    },
    compare: {
        mistake: {
            wrong: say('$-\\frac{4}{5}>-\\frac{2}{5}$, $4>2$ delako.', '$-\\frac{4}{5}>-\\frac{2}{5}$, porque $4>2$.', '$-\\frac{4}{5}>-\\frac{2}{5}$ لأن $4>2$.', '$-\\frac{4}{5}>-\\frac{2}{5}$, because $4>2$.'),
            right: say('Negatiboen artean, balio absolutu handiena duena da txikiena: $-\\frac{4}{5}<-\\frac{2}{5}$.', 'Entre negativas, la de mayor valor absoluto es la menor: $-\\frac{4}{5}<-\\frac{2}{5}$.', 'بين السالبة يكون صاحب القيمة المطلقة الأكبر هو الأصغر: $-\\frac{4}{5}<-\\frac{2}{5}$.', 'Among negatives, the one with the greater absolute value is the smaller: $-\\frac{4}{5}<-\\frac{2}{5}$.')
        },
        check: {
            prompt: say('Zein da txikiena: $-\\frac{3}{10}$, $-\\frac{7}{10}$ ala $-\\frac{1}{2}$?', '¿Cuál es la menor: $-\\frac{3}{10}$, $-\\frac{7}{10}$ o $-\\frac{1}{2}$?', 'أيها الأصغر: $-\\frac{3}{10}$ أم $-\\frac{7}{10}$ أم $-\\frac{1}{2}$؟', 'Which is the smallest: $-\\frac{3}{10}$, $-\\frac{7}{10}$ or $-\\frac{1}{2}$?'),
            options: [same('$-\\frac{3}{10}$'), same('$-\\frac{7}{10}$'), same('$-\\frac{1}{2}$')],
            correctIndex: 1,
            explanation: say('$-\\frac{1}{2}=-\\frac{5}{10}$. Balio absolutu handiena duena, $-\\frac{7}{10}$, dago ezkerren.', '$-\\frac{1}{2}=-\\frac{5}{10}$. La de mayor valor absoluto, $-\\frac{7}{10}$, está más a la izquierda.', '$-\\frac{1}{2}=-\\frac{5}{10}$. وصاحب القيمة المطلقة الأكبر، $-\\frac{7}{10}$، هو الأبعد إلى اليسار.', '$-\\frac{1}{2}=-\\frac{5}{10}$. The one with the greatest absolute value, $-\\frac{7}{10}$, is furthest to the left.')
        }
    },
    line: {
        mistake: {
            wrong: say('$-\\frac{7}{3}=-2-\\frac{1}{3}$; beraz, $-2$ eta $-1$ artean dago.', '$-\\frac{7}{3}=-2-\\frac{1}{3}$, así que está entre $-2$ y $-1$.', '$-\\frac{7}{3}=-2-\\frac{1}{3}$، إذن يقع بين $-2$ و$-1$.', '$-\\frac{7}{3}=-2-\\frac{1}{3}$, so it lies between $-2$ and $-1$.'),
            right: say('$-2$ zenbakiari $\\frac{1}{3}$ kentzean ezkerrerago joaten gara: $-\\frac{7}{3}$ $-3$ eta $-2$ artean dago.', 'Restar $\\frac{1}{3}$ a $-2$ lleva más a la izquierda: $-\\frac{7}{3}$ está entre $-3$ y $-2$.', 'طرح $\\frac{1}{3}$ من $-2$ يأخذنا أبعد إلى اليسار: يقع $-\\frac{7}{3}$ بين $-3$ و$-2$.', 'Subtracting $\\frac{1}{3}$ from $-2$ takes you further left: $-\\frac{7}{3}$ lies between $-3$ and $-2$.')
        },
        check: {
            prompt: say('Zein bi zenbaki osoren artean dago $-\\frac{11}{4}$?', '¿Entre qué dos enteros está $-\\frac{11}{4}$?', 'بين أي عددين صحيحين يقع $-\\frac{11}{4}$؟', 'Between which two integers is $-\\frac{11}{4}$?'),
            options: [say('$-2$ eta $-1$ artean', 'Entre $-2$ y $-1$', 'بين $-2$ و$-1$', 'Between $-2$ and $-1$'), say('$-3$ eta $-2$ artean', 'Entre $-3$ y $-2$', 'بين $-3$ و$-2$', 'Between $-3$ and $-2$'), say('$-4$ eta $-3$ artean', 'Entre $-4$ y $-3$', 'بين $-4$ و$-3$', 'Between $-4$ and $-3$')],
            correctIndex: 1,
            explanation: say('$-\\frac{11}{4}=-2-\\frac{3}{4}=-2{,}75$: $-2$ puntuaren ezkerrean, $-3$ iritsi aurretik.', '$-\\frac{11}{4}=-2-\\frac{3}{4}=-2{,}75$: a la izquierda del $-2$, antes del $-3$.', '$-\\frac{11}{4}=-2-\\frac{3}{4}=-2{,}75$: على يسار $-2$ وقبل $-3$.', '$-\\frac{11}{4}=-2-\\frac{3}{4}=-2{,}75$: to the left of $-2$, before $-3$.')
        }
    },
    between: {
        mistake: {
            wrong: say('$\\frac{3}{7}$ eta $\\frac{4}{7}$ artean ez dago zatikirik: 3 eta 4 artean ez dago zenbakitzailerik.', 'Entre $\\frac{3}{7}$ y $\\frac{4}{7}$ no hay ninguna fracción: no hay numerador entre 3 y 4.', 'لا يوجد كسر بين $\\frac{3}{7}$ و$\\frac{4}{7}$: لا بسط بين 3 و4.', 'There is no fraction between $\\frac{3}{7}$ and $\\frac{4}{7}$: there is no numerator between 3 and 4.'),
            right: say('Anplifikatu: $\\frac{30}{70}$ eta $\\frac{40}{70}$; erdian $\\frac{35}{70}=\\frac{1}{2}$ dago.', 'Amplifica: $\\frac{30}{70}$ y $\\frac{40}{70}$; en medio está $\\frac{35}{70}=\\frac{1}{2}$.', 'وسّع: $\\frac{30}{70}$ و$\\frac{40}{70}$؛ وفي الوسط $\\frac{35}{70}=\\frac{1}{2}$.', 'Amplify: $\\frac{30}{70}$ and $\\frac{40}{70}$; in the middle is $\\frac{35}{70}=\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zein zatiki dago $\\frac{1}{4}$ eta $\\frac{2}{4}$ artean?', '¿Qué fracción está entre $\\frac{1}{4}$ y $\\frac{2}{4}$?', 'أي كسر يقع بين $\\frac{1}{4}$ و$\\frac{2}{4}$؟', 'Which fraction lies between $\\frac{1}{4}$ and $\\frac{2}{4}$?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا يوجد أي كسر', 'None'), same('$\\frac{3}{8}$'), same('$\\frac{2}{3}$')],
            correctIndex: 1,
            explanation: say('Anplifikatu: $\\frac{2}{8}$ eta $\\frac{4}{8}$; erdian $\\frac{3}{8}$ dago. $\\frac{2}{3}$ $\\frac{2}{4}$ baino handiagoa da.', 'Amplifica: $\\frac{2}{8}$ y $\\frac{4}{8}$; en medio está $\\frac{3}{8}$. $\\frac{2}{3}$ es mayor que $\\frac{2}{4}$.', 'وسّع: $\\frac{2}{8}$ و$\\frac{4}{8}$؛ وفي الوسط $\\frac{3}{8}$. أما $\\frac{2}{3}$ فأكبر من $\\frac{2}{4}$.', 'Amplify: $\\frac{2}{8}$ and $\\frac{4}{8}$; in the middle is $\\frac{3}{8}$. $\\frac{2}{3}$ is greater than $\\frac{2}{4}$.')
        }
    },
    'add-sub': {
        mistake: {
            wrong: say('$\\frac{2}{5}+\\frac{1}{3}=\\frac{3}{8}$: zenbakitzaileak zenbakitzaileekin eta izendatzaileak izendatzaileekin.', '$\\frac{2}{5}+\\frac{1}{3}=\\frac{3}{8}$: numeradores con numeradores y denominadores con denominadores.', '$\\frac{2}{5}+\\frac{1}{3}=\\frac{3}{8}$: البسوط مع البسوط والمقامات مع المقامات.', '$\\frac{2}{5}+\\frac{1}{3}=\\frac{3}{8}$: numerators with numerators and denominators with denominators.'),
            right: say('Lehenik izendatzaile komuna: $\\frac{6}{15}+\\frac{5}{15}=\\frac{11}{15}$.', 'Primero, común denominador: $\\frac{6}{15}+\\frac{5}{15}=\\frac{11}{15}$.', 'أولًا المقام المشترك: $\\frac{6}{15}+\\frac{5}{15}=\\frac{11}{15}$.', 'First, a common denominator: $\\frac{6}{15}+\\frac{5}{15}=\\frac{11}{15}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{3}{10}-\\frac{4}{5}$?', '¿Cuánto es $\\frac{3}{10}-\\frac{4}{5}$?', 'كم يساوي $\\frac{3}{10}-\\frac{4}{5}$؟', 'What is $\\frac{3}{10}-\\frac{4}{5}$?'),
            options: [same('$-\\frac{1}{2}$'), same('$-\\frac{1}{5}$'), same('$\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: same('$\\frac{3}{10}-\\frac{8}{10}=-\\frac{5}{10}=-\\frac{1}{2}$')
        }
    },
    'mul-div': {
        mistake: {
            wrong: say('$\\frac{2}{5}\\div\\frac{3}{4}=\\frac{6}{20}$: zuzenean biderkatzen da.', '$\\frac{2}{5}\\div\\frac{3}{4}=\\frac{6}{20}$: se multiplica en línea.', '$\\frac{2}{5}\\div\\frac{3}{4}=\\frac{6}{20}$: نضرب مباشرة.', '$\\frac{2}{5}\\div\\frac{3}{4}=\\frac{6}{20}$: multiply straight across.'),
            right: say('Zatitzean, alderantzizkoaz biderkatzen da: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'Al dividir se multiplica por la inversa: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'عند القسمة نضرب في المقلوب: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'To divide, multiply by the reciprocal: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{5}{6}\\div\\frac{10}{3}$?', '¿Cuánto es $\\frac{5}{6}\\div\\frac{10}{3}$?', 'كم يساوي $\\frac{5}{6}\\div\\frac{10}{3}$؟', 'What is $\\frac{5}{6}\\div\\frac{10}{3}$?'),
            options: [same('$\\frac{25}{9}$'), same('$4$'), same('$\\frac{1}{4}$')],
            correctIndex: 2,
            explanation: same('$\\frac{5}{6}\\cdot\\frac{3}{10}=\\frac{15}{60}=\\frac{1}{4}$')
        }
    },
    combined: {
        mistake: {
            wrong: say('$\\frac{1}{3}+\\frac{2}{3}\\cdot 6=1\\cdot 6=6$: ezkerretik eskuinera.', '$\\frac{1}{3}+\\frac{2}{3}\\cdot 6=1\\cdot 6=6$: de izquierda a derecha.', '$\\frac{1}{3}+\\frac{2}{3}\\cdot 6=1\\cdot 6=6$: من اليسار إلى اليمين.', '$\\frac{1}{3}+\\frac{2}{3}\\cdot 6=1\\cdot 6=6$: from left to right.'),
            right: say('Biderketa batuketaren aurretik doa: $\\frac{1}{3}+4=\\frac{13}{3}$.', 'La multiplicación va antes que la suma: $\\frac{1}{3}+4=\\frac{13}{3}$.', 'الضرب قبل الجمع: $\\frac{1}{3}+4=\\frac{13}{3}$.', 'Multiplication comes before addition: $\\frac{1}{3}+4=\\frac{13}{3}$.')
        },
        check: {
            prompt: say('Zenbat da $2-\\frac{1}{2}\\cdot\\frac{2}{3}$?', '¿Cuánto es $2-\\frac{1}{2}\\cdot\\frac{2}{3}$?', 'كم يساوي $2-\\frac{1}{2}\\cdot\\frac{2}{3}$؟', 'What is $2-\\frac{1}{2}\\cdot\\frac{2}{3}$?'),
            options: [same('$1$'), same('$\\frac{5}{3}$'), same('$\\frac{1}{3}$')],
            correctIndex: 1,
            explanation: say('Lehenik biderketa: $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$; gero, $2-\\frac{1}{3}=\\frac{5}{3}$.', 'Primero el producto: $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$; después, $2-\\frac{1}{3}=\\frac{5}{3}$.', 'الضرب أولًا: $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$، ثم $2-\\frac{1}{3}=\\frac{5}{3}$.', 'First the product: $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$; then $2-\\frac{1}{3}=\\frac{5}{3}$.')
        }
    },
    'decimal-kinds': {
        mistake: {
            wrong: say('$\\frac{6}{15}$ periodikoa da, 15 zenbakiak 3 faktorea duelako.', '$\\frac{6}{15}$ es periódico, porque 15 tiene un 3.', '$\\frac{6}{15}$ دوري لأن في 15 العامل 3.', '$\\frac{6}{15}$ is recurring, because 15 has a factor 3.'),
            right: say('Sinplifikatu lehenik: $\\frac{6}{15}=\\frac{2}{5}=0{,}4$, zehatza.', 'Simplifica primero: $\\frac{6}{15}=\\frac{2}{5}=0{,}4$, exacto.', 'اختزل أولًا: $\\frac{6}{15}=\\frac{2}{5}=0{,}4$، منتهٍ.', 'Simplify first: $\\frac{6}{15}=\\frac{2}{5}=0{,}4$, terminating.')
        },
        check: {
            prompt: say('Zer hamartar mota ematen du $\\frac{9}{12}$ zatikiak?', '¿Qué tipo de decimal da $\\frac{9}{12}$?', 'أي نوع من العشريات يعطيه $\\frac{9}{12}$؟', 'What kind of decimal does $\\frac{9}{12}$ give?'),
            options: [say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'), say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Pure recurring'), say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring')],
            correctIndex: 0,
            explanation: say('$\\frac{9}{12}=\\frac{3}{4}=0{,}75$: 3 faktorea desagertu egiten da sinplifikatzean.', '$\\frac{9}{12}=\\frac{3}{4}=0{,}75$: el 3 se va al simplificar.', '$\\frac{9}{12}=\\frac{3}{4}=0{,}75$: يختفي العامل 3 عند الاختزال.', '$\\frac{9}{12}=\\frac{3}{4}=0{,}75$: the factor 3 goes away when you simplify.')
        }
    },
    'exact-generatrix': {
        mistake: {
            wrong: same('$0{,}08=\\frac{8}{10}$'),
            right: say('Bi hamartar daude; beraz, bi zero: $0{,}08=\\frac{8}{100}=\\frac{2}{25}$.', 'Hay dos decimales, así que dos ceros: $0{,}08=\\frac{8}{100}=\\frac{2}{25}$.', 'هناك منزلتان عشريتان، إذن صفران: $0{,}08=\\frac{8}{100}=\\frac{2}{25}$.', 'There are two decimal places, so two zeros: $0{,}08=\\frac{8}{100}=\\frac{2}{25}$.')
        },
        check: {
            prompt: say('Zein zatiki da $1{,}25$?', '¿Qué fracción es $1{,}25$?', 'أي كسر يساوي $1{,}25$؟', 'Which fraction is $1{,}25$?'),
            options: [same('$\\frac{125}{10}$'), same('$\\frac{5}{4}$'), same('$\\frac{25}{100}$')],
            correctIndex: 1,
            explanation: say('Bi hamartar: $1{,}25=\\frac{125}{100}=\\frac{5}{4}$.', 'Dos decimales: $1{,}25=\\frac{125}{100}=\\frac{5}{4}$.', 'منزلتان عشريتان: $1{,}25=\\frac{125}{100}=\\frac{5}{4}$.', 'Two decimal places: $1{,}25=\\frac{125}{100}=\\frac{5}{4}$.')
        }
    },
    'periodic-generatrix': {
        mistake: {
            wrong: same('$0{,}\\overline{4}=\\frac{4}{10}$'),
            right: say('Periodikoetan, 9 bat periodoko zifra bakoitzeko: $0{,}\\overline{4}=\\frac{4}{9}$.', 'En un periódico, un 9 por cada cifra del periodo: $0{,}\\overline{4}=\\frac{4}{9}$.', 'في العشري الدوري نضع 9 لكل رقم في الدور: $0{,}\\overline{4}=\\frac{4}{9}$.', 'In a recurring decimal, a 9 for each digit of the repeating part: $0{,}\\overline{4}=\\frac{4}{9}$.')
        },
        check: {
            prompt: say('Zein zatiki da $0{,}1\\overline{5}$?', '¿Qué fracción es $0{,}1\\overline{5}$?', 'أي كسر يساوي $0{,}1\\overline{5}$؟', 'Which fraction is $0{,}1\\overline{5}$?'),
            options: [same('$\\frac{15}{99}$'), same('$\\frac{14}{99}$'), same('$\\frac{7}{45}$')],
            correctIndex: 2,
            explanation: say('Periodoa 5 da eta aurreperiodoa 1: $\\frac{15-1}{90}=\\frac{14}{90}=\\frac{7}{45}$.', 'El periodo es 5 y el anteperiodo, 1: $\\frac{15-1}{90}=\\frac{14}{90}=\\frac{7}{45}$.', 'الدور 5 والجزء غير الدوري 1: $\\frac{15-1}{90}=\\frac{14}{90}=\\frac{7}{45}$.', 'The repeating part is 5 and the non-repeating part is 1: $\\frac{15-1}{90}=\\frac{14}{90}=\\frac{7}{45}$.')
        }
    },
    'fraction-of': {
        mistake: {
            wrong: say('30 zenbakiaren $\\frac{2}{5}$ $30\\div 2\\cdot 5=75$ da.', '$\\frac{2}{5}$ de 30 es $30\\div 2\\cdot 5=75$.', '$\\frac{2}{5}$ من 30 هو $30\\div 2\\cdot 5=75$.', '$\\frac{2}{5}$ of 30 is $30\\div 2\\cdot 5=75$.'),
            right: say('Izendatzaileaz zatitu eta zenbakitzaileaz biderkatzen da: $30\\div 5\\cdot 2=12$.', 'Se divide entre el denominador y se multiplica por el numerador: $30\\div 5\\cdot 2=12$.', 'نقسم على المقام ونضرب في البسط: $30\\div 5\\cdot 2=12$.', 'Divide by the denominator and multiply by the numerator: $30\\div 5\\cdot 2=12$.')
        },
        check: {
            prompt: say('28 ikasleko gela batean, $\\frac{3}{4}$ gainditzen dute. Zenbat ikaslek gainditzen dute?', 'En una clase de 28 alumnos, aprueban los $\\frac{3}{4}$. ¿Cuántos aprueban?', 'في صف فيه 28 تلميذًا ينجح $\\frac{3}{4}$ منهم. كم تلميذًا ينجح؟', 'In a class of 28 students, $\\frac{3}{4}$ pass. How many pass?'),
            options: [say('21 ikasle', '21 alumnos', '21 تلميذًا', '21 students'), say('7 ikasle', '7 alumnos', '7 تلاميذ', '7 students'), say('84 ikasle', '84 alumnos', '84 تلميذًا', '84 students')],
            correctIndex: 0,
            explanation: say('$28\\div 4=7$ laurden bakoitzean, eta $7\\cdot 3=21$.', '$28\\div 4=7$ en cada cuarto, y $7\\cdot 3=21$.', '$28\\div 4=7$ في كل ربع، و$7\\cdot 3=21$.', '$28\\div 4=7$ in each quarter, and $7\\cdot 3=21$.')
        }
    },
    remaining: {
        mistake: {
            wrong: say('$\\frac{1}{3}$ gastatzen da eta gero gainerakoaren $\\frac{1}{2}$: guztira, $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$.', 'Se gasta $\\frac{1}{3}$ y luego $\\frac{1}{2}$ de lo que queda: en total, $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$.', 'يُنفَق $\\frac{1}{3}$ ثم $\\frac{1}{2}$ من الباقي: المجموع $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$.', '$\\frac{1}{3}$ is spent and then $\\frac{1}{2}$ of what is left: in total, $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$.'),
            right: say('Gainerakoaren $\\frac{1}{2}$ osoaren $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$ da: $\\frac{2}{3}$ gastatzen dira.', '$\\frac{1}{2}$ de lo que queda es $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$ del total: se gastan $\\frac{2}{3}$.', '$\\frac{1}{2}$ من الباقي هو $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$ من الكل: يُنفَق $\\frac{2}{3}$.', '$\\frac{1}{2}$ of what is left is $\\frac{1}{2}\\cdot\\frac{2}{3}=\\frac{1}{3}$ of the total: $\\frac{2}{3}$ is spent.')
        },
        check: {
            prompt: say('Baratze baten $\\frac{2}{5}$ tomateak dira, eta gainerakoaren $\\frac{1}{3}$ letxugak. Osoaren zer zatiki dira letxugak?', 'En una huerta, $\\frac{2}{5}$ son tomates y $\\frac{1}{3}$ del resto, lechugas. ¿Qué fracción del total son lechugas?', 'في بستان $\\frac{2}{5}$ طماطم و$\\frac{1}{3}$ من الباقي خس. ما كسر الخس من الكل؟', 'In a vegetable patch, $\\frac{2}{5}$ is tomatoes and $\\frac{1}{3}$ of the rest is lettuce. What fraction of the total is lettuce?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{11}{15}$'), same('$\\frac{1}{5}$')],
            correctIndex: 2,
            explanation: say('Gainerakoa $\\frac{3}{5}$ da, eta horren $\\frac{1}{3}$ $\\frac{1}{3}\\cdot\\frac{3}{5}=\\frac{1}{5}$.', 'El resto es $\\frac{3}{5}$, y $\\frac{1}{3}$ de él es $\\frac{1}{3}\\cdot\\frac{3}{5}=\\frac{1}{5}$.', 'الباقي $\\frac{3}{5}$، و$\\frac{1}{3}$ منه هو $\\frac{1}{3}\\cdot\\frac{3}{5}=\\frac{1}{5}$.', 'The rest is $\\frac{3}{5}$, and $\\frac{1}{3}$ of it is $\\frac{1}{3}\\cdot\\frac{3}{5}=\\frac{1}{5}$.')
        }
    },
    'whole-from-part': {
        mistake: {
            wrong: say('Osoaren $\\frac{2}{3}$ 18 dira; beraz, osoa $\\frac{2}{3}\\cdot 18=12$ da.', 'Los $\\frac{2}{3}$ son 18, así que el total es $\\frac{2}{3}\\cdot 18=12$.', '$\\frac{2}{3}$ من الكل 18، إذن الكل $\\frac{2}{3}\\cdot 18=12$.', '$\\frac{2}{3}$ of the total is 18, so the total is $\\frac{2}{3}\\cdot 18=12$.'),
            right: say('Osoa bilatzen da, ez zati bat: $18\\div 2\\cdot 3=27$.', 'Se busca el total, no una parte: $18\\div 2\\cdot 3=27$.', 'المطلوب الكل لا جزء منه: $18\\div 2\\cdot 3=27$.', 'You want the total, not a part: $18\\div 2\\cdot 3=27$.')
        },
        check: {
            prompt: say('Soka baten $\\frac{4}{7}$ 20 m dira. Zenbat neurtzen du soka osoak?', 'Los $\\frac{4}{7}$ de una cuerda miden 20 m. ¿Cuánto mide la cuerda?', '$\\frac{4}{7}$ من حبل طولها 20 م. كم طول الحبل كله؟', '$\\frac{4}{7}$ of a rope is 20 m long. How long is the whole rope?'),
            options: [say('5 m', '5 m', '5 م', '5 m'), say('11,4 m', '11,4 m', '11.4 م', '11.4 m'), say('35 m', '35 m', '35 م', '35 m')],
            correctIndex: 2,
            explanation: say('Zazpiren bat: $20\\div 4=5$ m. Osoa: $5\\cdot 7=35$ m.', 'Un séptimo: $20\\div 4=5$ m. El total: $5\\cdot 7=35$ m.', 'السُّبع: $20\\div 4=5$ م. والكل: $5\\cdot 7=35$ م.', 'One seventh: $20\\div 4=5$ m. The whole: $5\\cdot 7=35$ m.')
        }
    }
}
