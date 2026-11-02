import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'
import type { TheoryTopicId } from './content.ts'

/* ==========================================================================
   Zatikiak · 2. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; index.tsx
   merges it into the topics. The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. Percentages change with the language (%35 in
   Basque), so they go in the words, never inside $…$.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value })

export const fractionLessonChecks: Record<TheoryTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    meaning: {
        mistake: {
            wrong: say('Pizza bat 8 zati berdinetan banatu dut eta 3 jan ditut: $\\frac{8}{3}$ jan dut.', 'He partido una pizza en 8 trozos iguales y me he comido 3: me he comido $\\frac{8}{3}$.', 'قسّمتُ بيتزا إلى 8 قطع متساوية وأكلت 3: أكلت $\\frac{8}{3}$.', 'I cut a pizza into 8 equal slices and ate 3: I ate $\\frac{8}{3}$.'),
            right: say('Izendatzailea (behean) zenbat zati berdinetan banatu den da: 8. Zenbakitzailea, zenbat hartu diren: $\\frac{3}{8}$.', 'El denominador (abajo) es en cuántas partes iguales se divide: 8. El numerador, cuántas se toman: $\\frac{3}{8}$.', 'المقام (في الأسفل) هو عدد الأجزاء المتساوية: 8. والبسط هو عدد الأجزاء المأخوذة: $\\frac{3}{8}$.', 'The denominator (bottom) is how many equal parts: 8. The numerator is how many you take: $\\frac{3}{8}$.')
        },
        check: {
            prompt: say('2 tarta berdin 5 lagunen artean banatzen dira. Tartaren zer zati jaten du bakoitzak?', 'Se reparten 2 tartas iguales entre 5 amigos. ¿Qué parte de tarta come cada uno?', 'نوزّع كعكتين متساويتين على 5 أصدقاء. ما الجزء الذي يأكله كل واحد؟', '2 identical cakes are shared among 5 friends. What part of a cake does each one eat?'),
            options: [same('$\\frac{2}{5}$'), same('$\\frac{5}{2}$'), same('$\\frac{1}{5}$')],
            correctIndex: 0,
            explanation: say('Zatikia zatiketa bat da: $2\\div 5=\\frac{2}{5}=0{,}4$ tarta bakoitzarentzat.', 'La fracción es una división: $2\\div 5=\\frac{2}{5}=0{,}4$ de tarta para cada uno.', 'الكسر قسمة: $2\\div 5=\\frac{2}{5}=0.4$ من الكعكة لكل واحد.', 'A fraction is a division: $2\\div 5=\\frac{2}{5}=0{,}4$ of a cake each.')
        }
    },
    representation: {
        mistake: {
            wrong: same('$\\frac{23}{4}=5\\frac{3}{5}$'),
            right: say('Hondarra zenbakitzailea da, eta izendatzailea ez da aldatzen: $23=4\\cdot 5+3$; beraz, $\\frac{23}{4}=5\\frac{3}{4}$.', 'El resto es el numerador y el denominador no cambia: $23=4\\cdot 5+3$, así que $\\frac{23}{4}=5\\frac{3}{4}$.', 'الباقي هو البسط والمقام لا يتغيّر: $23=4\\cdot 5+3$، إذن $\\frac{23}{4}=5\\frac{3}{4}$.', 'The remainder is the numerator and the denominator does not change: $23=4\\cdot 5+3$, so $\\frac{23}{4}=5\\frac{3}{4}$.')
        },
        check: {
            prompt: say('Nola idazten da $\\frac{29}{6}$ zenbaki misto gisa?', '¿Cómo se escribe $\\frac{29}{6}$ como número mixto?', 'كيف يُكتب $\\frac{29}{6}$ عددًا كسريًا؟', 'How is $\\frac{29}{6}$ written as a mixed number?'),
            options: [same('$5\\frac{4}{6}$'), same('$4\\frac{5}{4}$'), same('$4\\frac{5}{6}$')],
            correctIndex: 2,
            explanation: say('$29=6\\cdot 4+5$: 4 unitate oso eta 5 seiren. Izendatzailea 6 da oraindik.', '$29=6\\cdot 4+5$: 4 unidades completas y 5 sextos. El denominador sigue siendo 6.', '$29=6\\cdot 4+5$: 4 وحدات كاملة و5 أسداس. ويبقى المقام 6.', '$29=6\\cdot 4+5$: 4 whole units and 5 sixths. The denominator is still 6.')
        }
    },
    equivalence: {
        mistake: {
            wrong: same('$\\frac{2}{5}=\\frac{2+3}{5+3}=\\frac{5}{8}$'),
            right: say('Batzeak balioa aldatzen du. Bi gaiak zenbaki berarekin biderkatu edo zatitu behar dira: $\\frac{2}{5}=\\frac{2\\cdot 3}{5\\cdot 3}=\\frac{6}{15}$.', 'Sumar cambia el valor. Hay que multiplicar o dividir los dos términos por el mismo número: $\\frac{2}{5}=\\frac{2\\cdot 3}{5\\cdot 3}=\\frac{6}{15}$.', 'الجمع يغيّر القيمة. يجب ضرب الحدّين أو قسمتهما على العدد نفسه: $\\frac{2}{5}=\\frac{2\\cdot 3}{5\\cdot 3}=\\frac{6}{15}$.', 'Adding changes the value. Multiply or divide both terms by the same number: $\\frac{2}{5}=\\frac{2\\cdot 3}{5\\cdot 3}=\\frac{6}{15}$.')
        },
        check: {
            prompt: say('Zein zatiki da $\\frac{4}{6}$ zatikiaren baliokidea?', '¿Qué fracción es equivalente a $\\frac{4}{6}$?', 'أيّ كسر يكافئ $\\frac{4}{6}$؟', 'Which fraction is equivalent to $\\frac{4}{6}$?'),
            options: [same('$\\frac{6}{8}$'), same('$\\frac{10}{15}$'), same('$\\frac{4}{12}$')],
            correctIndex: 1,
            explanation: say('Biderkadura gurutzatuak: $4\\cdot 15=6\\cdot 10=60$. $\\frac{6}{8}$ goian eta behean 2 batuz ateratzen da, eta horrek balioa aldatzen du.', 'Productos cruzados: $4\\cdot 15=6\\cdot 10=60$. $\\frac{6}{8}$ sale de sumar 2 arriba y abajo, y eso cambia el valor.', 'الضرب التبادلي: $4\\cdot 15=6\\cdot 10=60$. أما $\\frac{6}{8}$ فيأتي من جمع 2 في الأعلى والأسفل، وهذا يغيّر القيمة.', 'Cross products: $4\\cdot 15=6\\cdot 10=60$. $\\frac{6}{8}$ comes from adding 2 on top and bottom, and that changes the value.')
        }
    },
    simplification: {
        mistake: {
            wrong: say('$\\frac{36}{48}=\\frac{18}{24}$, eta laburtezina da jada.', '$\\frac{36}{48}=\\frac{18}{24}$, y ya es irreducible.', '$\\frac{36}{48}=\\frac{18}{24}$، وهو كسر غير قابل للاختزال.', '$\\frac{36}{48}=\\frac{18}{24}$, and it is already in its simplest form.'),
            right: say('18 eta 24 zenbakiek zatitzaile komunak dituzte oraindik. ZKHz (12) zatituz, urrats bakarrean: $\\frac{36}{48}=\\frac{3}{4}$.', '18 y 24 todavía tienen divisores comunes. Dividiendo entre el m.c.d. (12) se llega en un paso: $\\frac{36}{48}=\\frac{3}{4}$.', 'ما زال للعددين 18 و24 قواسم مشتركة. وبالقسمة على القاسم المشترك الأكبر (12) نصل في خطوة واحدة: $\\frac{36}{48}=\\frac{3}{4}$.', '18 and 24 still have common divisors. Dividing by the GCD (12) gets there in one step: $\\frac{36}{48}=\\frac{3}{4}$.')
        },
        check: {
            prompt: say('Zein zatiki da laburtezina?', '¿Qué fracción es irreducible?', 'أيّ كسر غير قابل للاختزال؟', 'Which fraction is in its simplest form?'),
            options: [same('$\\frac{9}{16}$'), same('$\\frac{21}{35}$'), same('$\\frac{15}{24}$')],
            correctIndex: 0,
            explanation: say('9 eta 16 zenbakiek 1 baino ez dute zatitzaile komun. $\\frac{21}{35}$ zatikia 7 zenbakiaz sinplifika daiteke, eta $\\frac{15}{24}$ zatikia 3 zenbakiaz.', '9 y 16 solo tienen el 1 como divisor común. $\\frac{21}{35}$ se simplifica entre 7 y $\\frac{15}{24}$, entre 3.', 'ليس للعددين 9 و16 قاسم مشترك غير 1. أما $\\frac{21}{35}$ فيُبسَّط بالقسمة على 7، و$\\frac{15}{24}$ بالقسمة على 3.', '9 and 16 have no common divisor but 1. $\\frac{21}{35}$ simplifies by 7 and $\\frac{15}{24}$ by 3.')
        }
    },
    ordering: {
        mistake: {
            wrong: say('$\\frac{3}{8}>\\frac{3}{5}$, 8 zenbakia 5 baino handiagoa delako.', '$\\frac{3}{8}>\\frac{3}{5}$, porque 8 es mayor que 5.', '$\\frac{3}{8}>\\frac{3}{5}$ لأن 8 أكبر من 5.', '$\\frac{3}{8}>\\frac{3}{5}$, because 8 is greater than 5.'),
            right: say('Zenbakitzaile bera dutenean, zenbat eta izendatzaile handiagoa, orduan eta zati txikiagoak: $\\frac{3}{8}<\\frac{3}{5}$.', 'Con el mismo numerador, cuanto mayor es el denominador, más pequeños son los trozos: $\\frac{3}{8}<\\frac{3}{5}$.', 'مع البسط نفسه، كلما كبر المقام صغرت الأجزاء: $\\frac{3}{8}<\\frac{3}{5}$.', 'With the same numerator, the bigger the denominator, the smaller the pieces: $\\frac{3}{8}<\\frac{3}{5}$.')
        },
        check: {
            prompt: say('Zein da handiena?', '¿Cuál es la mayor?', 'أيّها الأكبر؟', 'Which is the greatest?'),
            options: [same('$\\frac{7}{12}$'), same('$\\frac{3}{5}$'), same('$\\frac{5}{8}$')],
            correctIndex: 2,
            explanation: say('Izendatzaile komuna 120 da: $\\frac{7}{12}=\\frac{70}{120}$, $\\frac{3}{5}=\\frac{72}{120}$ eta $\\frac{5}{8}=\\frac{75}{120}$. Zenbaki handienak dituenak ez du zertan handiena izan.', 'Con denominador común 120: $\\frac{7}{12}=\\frac{70}{120}$, $\\frac{3}{5}=\\frac{72}{120}$ y $\\frac{5}{8}=\\frac{75}{120}$. La de números más grandes no tiene por qué ser la mayor.', 'بالمقام المشترك 120: $\\frac{7}{12}=\\frac{70}{120}$ و$\\frac{3}{5}=\\frac{72}{120}$ و$\\frac{5}{8}=\\frac{75}{120}$. الكسر ذو الأعداد الأكبر ليس بالضرورة الأكبر.', 'With the common denominator 120: $\\frac{7}{12}=\\frac{70}{120}$, $\\frac{3}{5}=\\frac{72}{120}$ and $\\frac{5}{8}=\\frac{75}{120}$. The one with the biggest numbers is not necessarily the greatest.')
        }
    },
    'add-subtract': {
        mistake: {
            wrong: same('$\\frac{1}{3}+\\frac{2}{5}=\\frac{3}{8}$'),
            right: say('Izendatzaileak ez dira batzen. Izendatzaile komuna 15 da: $\\frac{5}{15}+\\frac{6}{15}=\\frac{11}{15}$.', 'Los denominadores no se suman. Con denominador común 15: $\\frac{5}{15}+\\frac{6}{15}=\\frac{11}{15}$.', 'لا نجمع المقامات. بالمقام المشترك 15: $\\frac{5}{15}+\\frac{6}{15}=\\frac{11}{15}$.', 'Denominators are not added. With the common denominator 15: $\\frac{5}{15}+\\frac{6}{15}=\\frac{11}{15}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{3}{4}+\\frac{1}{6}$.', 'Calcula $\\frac{3}{4}+\\frac{1}{6}$.', 'احسب $\\frac{3}{4}+\\frac{1}{6}$.', 'Calculate $\\frac{3}{4}+\\frac{1}{6}$.'),
            options: [same('$\\frac{4}{10}$'), same('$\\frac{11}{12}$'), same('$\\frac{4}{24}$')],
            correctIndex: 1,
            explanation: say('4 eta 6 zenbakien MKT 12 da: $\\frac{9}{12}+\\frac{2}{12}=\\frac{11}{12}$.', 'El m.c.m. de 4 y 6 es 12: $\\frac{9}{12}+\\frac{2}{12}=\\frac{11}{12}$.', 'المضاعف المشترك الأصغر للعددين 4 و6 هو 12: $\\frac{9}{12}+\\frac{2}{12}=\\frac{11}{12}$.', 'The LCM of 4 and 6 is 12: $\\frac{9}{12}+\\frac{2}{12}=\\frac{11}{12}$.')
        }
    },
    'multiply-divide': {
        mistake: {
            wrong: same('$\\frac{2}{5}\\div\\frac{3}{4}=\\frac{5}{2}\\cdot\\frac{3}{4}=\\frac{15}{8}$'),
            right: say('Bigarrena alderantzikatzen da, ez lehena: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'Se invierte la segunda, no la primera: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'نقلب الكسر الثاني لا الأول: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.', 'You flip the second one, not the first: $\\frac{2}{5}\\cdot\\frac{4}{3}=\\frac{8}{15}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{5}{6}\\div\\frac{2}{3}$.', 'Calcula $\\frac{5}{6}\\div\\frac{2}{3}$.', 'احسب $\\frac{5}{6}\\div\\frac{2}{3}$.', 'Calculate $\\frac{5}{6}\\div\\frac{2}{3}$.'),
            options: [same('$\\frac{5}{4}$'), same('$\\frac{5}{9}$'), same('$\\frac{4}{5}$')],
            correctIndex: 0,
            explanation: say('Alderantzikatu bigarrena eta biderkatu: $\\frac{5}{6}\\cdot\\frac{3}{2}=\\frac{15}{12}=\\frac{5}{4}$.', 'Invierte la segunda y multiplica: $\\frac{5}{6}\\cdot\\frac{3}{2}=\\frac{15}{12}=\\frac{5}{4}$.', 'اقلب الكسر الثاني ثم اضرب: $\\frac{5}{6}\\cdot\\frac{3}{2}=\\frac{15}{12}=\\frac{5}{4}$.', 'Flip the second one and multiply: $\\frac{5}{6}\\cdot\\frac{3}{2}=\\frac{15}{12}=\\frac{5}{4}$.')
        }
    },
    combined: {
        mistake: {
            wrong: same('$\\frac{1}{3}+\\frac{2}{3}\\cdot\\frac{1}{2}=1\\cdot\\frac{1}{2}=\\frac{1}{2}$'),
            right: say('Lehenik biderketa: $\\frac{2}{3}\\cdot\\frac{1}{2}=\\frac{1}{3}$. Gero batuketa: $\\frac{1}{3}+\\frac{1}{3}=\\frac{2}{3}$.', 'Primero el producto: $\\frac{2}{3}\\cdot\\frac{1}{2}=\\frac{1}{3}$. Después la suma: $\\frac{1}{3}+\\frac{1}{3}=\\frac{2}{3}$.', 'أولًا الضرب: $\\frac{2}{3}\\cdot\\frac{1}{2}=\\frac{1}{3}$. ثم الجمع: $\\frac{1}{3}+\\frac{1}{3}=\\frac{2}{3}$.', 'First the product: $\\frac{2}{3}\\cdot\\frac{1}{2}=\\frac{1}{3}$. Then the sum: $\\frac{1}{3}+\\frac{1}{3}=\\frac{2}{3}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{1}{2}+\\frac{1}{4}\\div\\frac{1}{2}$.', 'Calcula $\\frac{1}{2}+\\frac{1}{4}\\div\\frac{1}{2}$.', 'احسب $\\frac{1}{2}+\\frac{1}{4}\\div\\frac{1}{2}$.', 'Calculate $\\frac{1}{2}+\\frac{1}{4}\\div\\frac{1}{2}$.'),
            options: [same('$\\frac{3}{2}$'), same('$\\frac{5}{8}$'), same('$1$')],
            correctIndex: 2,
            explanation: say('Lehenik zatiketa: $\\frac{1}{4}\\div\\frac{1}{2}=\\frac{1}{4}\\cdot 2=\\frac{1}{2}$. Gero batuketa: $\\frac{1}{2}+\\frac{1}{2}=1$.', 'Primero la división: $\\frac{1}{4}\\div\\frac{1}{2}=\\frac{1}{4}\\cdot 2=\\frac{1}{2}$. Después la suma: $\\frac{1}{2}+\\frac{1}{2}=1$.', 'أولًا القسمة: $\\frac{1}{4}\\div\\frac{1}{2}=\\frac{1}{4}\\cdot 2=\\frac{1}{2}$. ثم الجمع: $\\frac{1}{2}+\\frac{1}{2}=1$.', 'First the division: $\\frac{1}{4}\\div\\frac{1}{2}=\\frac{1}{4}\\cdot 2=\\frac{1}{2}$. Then the sum: $\\frac{1}{2}+\\frac{1}{2}=1$.')
        }
    },
    powers: {
        mistake: {
            wrong: same('$-\\left(\\frac{2}{3}\\right)^{2}=\\frac{4}{9}$'),
            right: say('Parentesirik gabe zeinua ez da berretzen: aurrean geratzen da. $-\\left(\\frac{2}{3}\\right)^{2}=-\\frac{4}{9}$.', 'Sin paréntesis, el signo no se eleva: se queda delante. $-\\left(\\frac{2}{3}\\right)^{2}=-\\frac{4}{9}$.', 'بلا أقواس لا تُرفع الإشارة إلى القوة: تبقى في الأمام. $-\\left(\\frac{2}{3}\\right)^{2}=-\\frac{4}{9}$.', 'Without brackets, the sign is not raised: it stays in front. $-\\left(\\frac{2}{3}\\right)^{2}=-\\frac{4}{9}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\left(-\\frac{1}{3}\\right)^{3}$.', 'Calcula $\\left(-\\frac{1}{3}\\right)^{3}$.', 'احسب $\\left(-\\frac{1}{3}\\right)^{3}$.', 'Calculate $\\left(-\\frac{1}{3}\\right)^{3}$.'),
            options: [same('$\\frac{1}{27}$'), same('$-\\frac{1}{27}$'), same('$-\\frac{1}{9}$')],
            correctIndex: 1,
            explanation: say('Berretzaile bakoitia: zeinua negatiboa geratzen da. Bi gaiak berretzen dira: $3^{3}=27$, beraz $\\left(-\\frac{1}{3}\\right)^{3}=-\\frac{1}{27}$.', 'Exponente impar: el signo queda negativo. Se elevan los dos términos: $3^{3}=27$, así que $\\left(-\\frac{1}{3}\\right)^{3}=-\\frac{1}{27}$.', 'الأس فردي: تبقى الإشارة سالبة. ونرفع الحدّين: $3^{3}=27$، إذن $\\left(-\\frac{1}{3}\\right)^{3}=-\\frac{1}{27}$.', 'Odd exponent: the sign stays negative. Both terms are raised: $3^{3}=27$, so $\\left(-\\frac{1}{3}\\right)^{3}=-\\frac{1}{27}$.')
        }
    },
    'fraction-of': {
        mistake: {
            wrong: say('Klaseko $\\frac{2}{5}$ 12 ikasle dira; beraz, klasean $\\frac{2}{5}\\cdot 12=4{,}8$ ikasle daude.', 'Los $\\frac{2}{5}$ de la clase son 12 alumnos, así que en la clase hay $\\frac{2}{5}\\cdot 12=4{,}8$ alumnos.', '$\\frac{2}{5}$ من الصف هم 12 تلميذًا، إذن في الصف $\\frac{2}{5}\\cdot 12=4.8$ تلميذ.', '$\\frac{2}{5}$ of the class are 12 pupils, so there are $\\frac{2}{5}\\cdot 12=4{,}8$ pupils in the class.'),
            right: say('Hemen zatia ezaguna da eta guztizkoa bilatzen da: bosten bat $12\\div 2=6$ da, eta guztizkoa $5\\cdot 6=30$ ikasle.', 'Aquí se conoce la parte y se busca el total: un quinto es $12\\div 2=6$ y el total, $5\\cdot 6=30$ alumnos.', 'هنا الجزء معلوم والمطلوب الكل: الخُمس هو $12\\div 2=6$، والكل $5\\cdot 6=30$ تلميذًا.', 'Here the part is known and the total is wanted: one fifth is $12\\div 2=6$ and the total, $5\\cdot 6=30$ pupils.')
        },
        check: {
            prompt: say('Liburu baten $\\frac{3}{4}$ irakurri ditut, hau da, $180$ orrialde. Zenbat orrialde ditu liburuak?', 'He leído $\\frac{3}{4}$ de un libro, que son $180$ páginas. ¿Cuántas páginas tiene el libro?', 'قرأتُ $\\frac{3}{4}$ من كتاب، أي $180$ صفحة. كم صفحة في الكتاب؟', 'I have read $\\frac{3}{4}$ of a book, which is $180$ pages. How many pages does the book have?'),
            options: [same('$240$'), same('$135$'), same('$60$')],
            correctIndex: 0,
            explanation: say('Zatia ezaguna da: laurden bat $180\\div 3=60$ da, eta liburu osoa $4\\cdot 60=240$ orrialde.', 'Se conoce la parte: un cuarto es $180\\div 3=60$ y el libro entero, $4\\cdot 60=240$ páginas.', 'الجزء معلوم: الربع هو $180\\div 3=60$، والكتاب كله $4\\cdot 60=240$ صفحة.', 'The part is known: one quarter is $180\\div 3=60$ and the whole book, $4\\cdot 60=240$ pages.')
        }
    },
    percentages: {
        mistake: {
            wrong: say('$\\frac{7}{8}=0{,}875$; beraz, %0,875 da.', '$\\frac{7}{8}=0{,}875$, así que es un 0,875 %.', '$\\frac{7}{8}=0.875$، إذن هو 0.875٪.', '$\\frac{7}{8}=0{,}875$, so it is 0.875%.'),
            right: say('Ehuneko bihurtzeko, 100 zenbakiaz biderkatzen da: $0{,}875\\cdot 100=87{,}5$, hau da, %87,5.', 'Para pasar a porcentaje se multiplica por 100: $0{,}875\\cdot 100=87{,}5$, es decir, 87,5 %.', 'للتحويل إلى نسبة مئوية نضرب في 100: $0.875\\cdot 100=87.5$، أي 87.5٪.', 'To change it into a percentage, multiply by 100: $0{,}875\\cdot 100=87{,}5$, that is, 87.5%.')
        },
        check: {
            prompt: say('Zer ehuneko da $\\frac{3}{20}$?', '¿Qué porcentaje es $\\frac{3}{20}$?', 'ما النسبة المئوية التي يساويها $\\frac{3}{20}$؟', 'What percentage is $\\frac{3}{20}$?'),
            options: [say('%0,15', '0,15 %', '0.15٪', '0.15%'), say('%20', '20 %', '20٪', '20%'), say('%15', '15 %', '15٪', '15%')],
            correctIndex: 2,
            explanation: say('$\\frac{3}{20}=3\\div 20=0{,}15$, eta $0{,}15\\cdot 100=15$: %15 da.', '$\\frac{3}{20}=3\\div 20=0{,}15$, y $0{,}15\\cdot 100=15$: es el 15 %.', '$\\frac{3}{20}=3\\div 20=0.15$، و$0.15\\cdot 100=15$: إنها 15٪.', '$\\frac{3}{20}=3\\div 20=0{,}15$, and $0{,}15\\cdot 100=15$: it is 15%.')
        }
    },
    proportionality: {
        mistake: {
            wrong: say('4 kg laranjak 6 euro balio badute, 10 kg laranjak $6\\cdot 10=60$ euro balio dute.', 'Si 4 kg de naranjas cuestan 6 €, 10 kg cuestan $6\\cdot 10=60$ €.', 'إذا كان ثمن 4 كغ من البرتقال 6 يورو، فثمن 10 كغ هو $6\\cdot 10=60$ يورو.', 'If 4 kg of oranges cost €6, 10 kg cost $6\\cdot 10=60$ euros.'),
            right: say('Lehenik, unitate baten balioa: kilo batek $6\\div 4=1{,}50$ euro balio du; 10 kg laranjak, $10\\cdot 1{,}50=15$ euro.', 'Primero, el valor de una unidad: un kilo cuesta $6\\div 4=1{,}50$ €, y 10 kg, $10\\cdot 1{,}50=15$ €.', 'أولًا قيمة الوحدة: ثمن الكيلو $6\\div 4=1.50$ يورو، وثمن 10 كغ هو $10\\cdot 1.50=15$ يورو.', 'First, the value of one unit: one kilo costs $6\\div 4=1{,}50$ euros, and 10 kg cost $10\\cdot 1{,}50=15$ euros.')
        },
        check: {
            prompt: say('5 boligrafok 4 euro balio badute, zenbat balio dute 8 boligrafok?', 'Si 5 bolígrafos cuestan 4 €, ¿cuánto cuestan 8 bolígrafos?', 'إذا كان ثمن 5 أقلام 4 يورو، فكم ثمن 8 أقلام؟', 'If 5 pens cost €4, how much do 8 pens cost?'),
            options: [say('32 euro', '32 €', '32 يورو', '€32'), say('6,40 euro', '6,40 €', '6.40 يورو', '€6.40'), say('7 euro', '7 €', '7 يورو', '€7')],
            correctIndex: 1,
            explanation: say('Boligrafo batek $4\\div 5=0{,}80$ euro balio du, eta 8 boligrafok $8\\cdot 0{,}80=6{,}40$ euro. 3 boligrafo gehiago dira, baina ez 3 euro gehiago.', 'Un bolígrafo cuesta $4\\div 5=0{,}80$ €, y 8 bolígrafos, $8\\cdot 0{,}80=6{,}40$ €. Son 3 bolígrafos más, pero no 3 € más.', 'ثمن القلم الواحد $4\\div 5=0.80$ يورو، وثمن 8 أقلام $8\\cdot 0.80=6.40$ يورو. إنها 3 أقلام زيادة، لكن ليست 3 يورو زيادة.', 'One pen costs $4\\div 5=0{,}80$ euros, and 8 pens cost $8\\cdot 0{,}80=6{,}40$ euros. That is 3 more pens, but not 3 more euros.')
        }
    }
}
