import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. The wrong line of a
   mistake writes a wrong equality on purpose: the tests of this unit check
   that it really is wrong. A negative entry of a determinant that is not
   the first of its row is written {-4}: the shared lesson test would read
   «1 -4» as a subtraction.
   ========================================================================== */

export type DeterminanteakTopicId =
    | 'det-two' | 'sarrus' | 'zero-det'
    | 'transpose-swap' | 'scale-row' | 'add-multiple' | 'product-det'
    | 'minors-cofactors' | 'laplace' | 'order-four' | 'det-equations'
    | 'rank-by-minors' | 'rank-parameter-minors'
    | 'adjugate-inverse' | 'inverse-parameter' | 'det-matrix-equations'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const determinanteakLessonChecks: Record<DeterminanteakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Order 2 and 3 ---------- */
    'det-two': {
        mistake: {
            wrong: same('$\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}=1\\cdot 4+2\\cdot 3=10$'),
            right: say('Bigarren diagonala kendu egiten da: $1\\cdot 4-2\\cdot 3=-2$.', 'La diagonal secundaria se resta: $1\\cdot 4-2\\cdot 3=-2$.', 'القطر الثانوي يُطرح: $1\\cdot 4-2\\cdot 3=-2$.', 'The other diagonal is subtracted: $1\\cdot 4-2\\cdot 3=-2$.')
        },
        check: {
            prompt: say('Zenbat da $\\begin{vmatrix}5&2\\\\3&1\\end{vmatrix}$?', '¿Cuánto vale $\\begin{vmatrix}5&2\\\\3&1\\end{vmatrix}$?', 'كم يساوي $\\begin{vmatrix}5&2\\\\3&1\\end{vmatrix}$؟', 'What is $\\begin{vmatrix}5&2\\\\3&1\\end{vmatrix}$?'),
            options: [same('$-1$'), same('$11$'), same('$1$')],
            correctIndex: 0,
            explanation: same('$5\\cdot 1-2\\cdot 3=-1$')
        }
    },
    sarrus: {
        mistake: {
            wrong: same('$\\begin{vmatrix}1&0&0\\\\0&2&1\\\\0&3&1\\end{vmatrix}=2+3=5$'),
            right: say('Beste diagonalaren biderkadurak kendu egiten dira: $2-3=-1$.', 'Los productos de la otra diagonal se restan: $2-3=-1$.', 'حواصل القطر الآخر تُطرح: $2-3=-1$.', 'The products of the other diagonal are subtracted: $2-3=-1$.')
        },
        check: {
            prompt: say('Zenbat da $\\begin{vmatrix}1&1&1\\\\0&2&1\\\\0&0&3\\end{vmatrix}$?', '¿Cuánto vale $\\begin{vmatrix}1&1&1\\\\0&2&1\\\\0&0&3\\end{vmatrix}$?', 'كم يساوي $\\begin{vmatrix}1&1&1\\\\0&2&1\\\\0&0&3\\end{vmatrix}$؟', 'What is $\\begin{vmatrix}1&1&1\\\\0&2&1\\\\0&0&3\\end{vmatrix}$?'),
            options: [same('$5$'), same('$6$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Zeroak diagonalaren azpian: diagonala bakarrik geratzen da, $1\\cdot 2\\cdot 3=6$.', 'Ceros bajo la diagonal: solo queda la diagonal, $1\\cdot 2\\cdot 3=6$.', 'أصفار تحت القطر: يبقى القطر وحده، $1\\cdot 2\\cdot 3=6$.', 'Zeros below the diagonal: only the diagonal is left, $1\\cdot 2\\cdot 3=6$.')
        }
    },
    'zero-det': {
        mistake: {
            wrong: say('Zenbaki bat ere ez da 0; beraz, determinanteak ezin du 0 izan.', 'Ningún número es 0, así que el determinante no puede ser 0.', 'لا عدد يساوي صفرًا، إذن لا يمكن أن يكون المحدد صفرًا.', 'No number is 0, so the determinant cannot be 0.'),
            right: say('$\\begin{vmatrix}1&2\\\\3&6\\end{vmatrix}=6-6=0$: errenkadak proportzionalak dira.', '$\\begin{vmatrix}1&2\\\\3&6\\end{vmatrix}=6-6=0$: las filas son proporcionales.', '$\\begin{vmatrix}1&2\\\\3&6\\end{vmatrix}=6-6=0$: الصفان متناسبان.', '$\\begin{vmatrix}1&2\\\\3&6\\end{vmatrix}=6-6=0$: the rows are proportional.')
        },
        check: {
            prompt: say('Zeinek balio du 0, kalkulatu gabe?', '¿Cuál vale 0 sin calcular?', 'أيها يساوي صفرًا دون حساب؟', 'Which one is 0 without working it out?'),
            options: [same('$\\begin{vmatrix}2&1\\\\1&2\\end{vmatrix}$'), same('$\\begin{vmatrix}1&2\\\\2&1\\end{vmatrix}$'), same('$\\begin{vmatrix}1&2\\\\2&4\\end{vmatrix}$')],
            correctIndex: 2,
            explanation: say('Bigarren errenkada lehenaren bikoitza da.', 'La segunda fila es el doble de la primera.', 'الصف الثاني ضعف الأول.', 'The second row is twice the first.')
        }
    },

    /* ---------- 2. Properties ---------- */
    'transpose-swap': {
        mistake: {
            wrong: say('Bi errenkada trukatzeak ez du determinantea aldatzen: zenbakiak berberak dira.', 'Cambiar dos filas no cambia el determinante: los números son los mismos.', 'تبديل صفين لا يغيّر المحدد: الأعداد نفسها.', 'Swapping two rows does not change the determinant: the numbers are the same.'),
            right: say('Zeinua aldatzen du: $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix}=-1$, baina $\\begin{vmatrix}1&0\\\\0&1\\end{vmatrix}=1$.', 'Cambia el signo: $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix}=-1$, pero $\\begin{vmatrix}1&0\\\\0&1\\end{vmatrix}=1$.', 'تتغير الإشارة: $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix}=-1$، لكن $\\begin{vmatrix}1&0\\\\0&1\\end{vmatrix}=1$.', 'The sign changes: $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix}=-1$, but $\\begin{vmatrix}1&0\\\\0&1\\end{vmatrix}=1$.')
        },
        check: {
            prompt: say('$|A|=6$ bada, zenbat da $A$ matrizearen determinantea, bi errenkada trukatuta?', 'Si $|A|=6$, ¿cuánto vale el determinante de $A$ con dos filas cambiadas?', 'إذا كان $|A|=6$ فكم محدد $A$ بعد تبديل صفين؟', 'If $|A|=6$, what is the determinant of $A$ with two rows swapped?'),
            options: [same('$6$'), same('$-6$'), same('$\\frac{1}{6}$')],
            correctIndex: 1,
            explanation: say('Bi errenkada trukatzean zeinua aldatzen da.', 'Al cambiar dos filas cambia el signo.', 'عند تبديل صفين تتغير الإشارة.', 'Swapping two rows changes the sign.')
        }
    },
    'scale-row': {
        mistake: {
            wrong: say('$3\\times 3$ matrize batean, $|2A|=2|A|$.', 'En una matriz $3\\times 3$, $|2A|=2|A|$.', 'في مصفوفة $3\\times 3$ يكون $|2A|=2|A|$.', 'In a $3\\times 3$ matrix, $|2A|=2|A|$.'),
            right: say('2 zenbakia hiru errenkadetatik ateratzen da: $|2A|=2^3|A|=8|A|$.', 'El 2 sale de cada una de las tres filas: $|2A|=2^3|A|=8|A|$.', 'يخرج 2 من كل صف من الصفوف الثلاثة: $|2A|=2^3|A|=8|A|$.', 'The 2 comes out of each of the three rows: $|2A|=2^3|A|=8|A|$.')
        },
        check: {
            prompt: say('$A$ matrizea $2\\times 2$ da, eta $|A|=5$. Zenbat da $|-A|$?', '$A$ es $2\\times 2$ y $|A|=5$. ¿Cuánto vale $|-A|$?', '$A$ من الأبعاد $2\\times 2$ و$|A|=5$. كم يساوي $|-A|$؟', '$A$ is $2\\times 2$ and $|A|=5$. What is $|-A|$?'),
            options: [same('$-5$'), same('$25$'), same('$5$')],
            correctIndex: 2,
            explanation: same('$|-A|=(-1)^2\\cdot 5=5$')
        }
    },
    'add-multiple': {
        mistake: {
            wrong: say('$E_2-3E_1$ eragiketak determinantea $-3$ zenbakiaz biderkatzen du.', 'Hacer $E_2-3E_1$ multiplica el determinante por $-3$.', 'العملية $E_2-3E_1$ تضرب المحدد في $-3$.', 'Doing $E_2-3E_1$ multiplies the determinant by $-3$.'),
            right: say('Errenkada bati beste baten multiplo bat batzeak ez du aldatzen; $E_2$ ordez $kE_2$ jartzeak biderkatzen du.', 'Sumar a una fila un múltiplo de otra no lo cambia; lo que lo multiplica es cambiar $E_2$ por $kE_2$.', 'إضافة مضاعف صف إلى آخر لا تغيّره؛ الذي يضربه هو تعويض $E_2$ بـ $kE_2$.', 'Adding a multiple of one row to another does not change it; what multiplies it is replacing $E_2$ by $kE_2$.')
        },
        check: {
            prompt: say('$E_2-2E_1$ eta $E_3-E_1$ egin ondoren, $\\begin{vmatrix}2&1&3\\\\0&4&1\\\\0&0&5\\end{vmatrix}$ geratzen da. Zenbat zen hasierako determinantea?', 'Tras $E_2-2E_1$ y $E_3-E_1$ queda $\\begin{vmatrix}2&1&3\\\\0&4&1\\\\0&0&5\\end{vmatrix}$. ¿Cuánto valía el determinante de partida?', 'بعد $E_2-2E_1$ و$E_3-E_1$ يبقى $\\begin{vmatrix}2&1&3\\\\0&4&1\\\\0&0&5\\end{vmatrix}$. كم كان المحدد الأصلي؟', 'After $E_2-2E_1$ and $E_3-E_1$ you are left with $\\begin{vmatrix}2&1&3\\\\0&4&1\\\\0&0&5\\end{vmatrix}$. What was the starting determinant?'),
            options: [same('$40$'), same('$-40$'), same('$10$')],
            correctIndex: 0,
            explanation: say('Eragiketek ez dute aldatzen: $2\\cdot 4\\cdot 5=40$.', 'Las operaciones no lo cambian: $2\\cdot 4\\cdot 5=40$.', 'العمليات لا تغيّره: $2\\cdot 4\\cdot 5=40$.', 'The operations do not change it: $2\\cdot 4\\cdot 5=40$.')
        }
    },
    'product-det': {
        mistake: {
            wrong: same('$|A+B|=|A|+|B|$'),
            right: say('Bi ordenako $A=B=I$ matrizeekin: $|2I|=4$, baina $|I|+|I|=2$.', 'Con $A=B=I$ de orden 2: $|2I|=4$, pero $|I|+|I|=2$.', 'مع $A=B=I$ من الرتبة 2: $|2I|=4$ لكن $|I|+|I|=2$.', 'With $A=B=I$ of order 2: $|2I|=4$, but $|I|+|I|=2$.')
        },
        check: {
            prompt: say('$|A|=4$ bada, zenbat da $|A^2|$?', 'Si $|A|=4$, ¿cuánto vale $|A^2|$?', 'إذا كان $|A|=4$ فكم يساوي $|A^2|$؟', 'If $|A|=4$, what is $|A^2|$?'),
            options: [same('$8$'), same('$4$'), same('$16$')],
            correctIndex: 2,
            explanation: same('$|A^2|=|A|\\cdot|A|=4\\cdot 4=16$')
        }
    },

    /* ---------- 3. Minors and cofactors ---------- */
    'minors-cofactors': {
        mistake: {
            wrong: say('$A_{12}$ adjuntua menorea bera da, zeinurik gabe.', 'El adjunto $A_{12}$ es el menor tal cual, sin signo.', 'المتمم الجبري $A_{12}$ هو المحدد الأصغر كما هو دون إشارة.', 'The cofactor $A_{12}$ is the minor as it is, with no sign.'),
            right: say('$(-1)^{1+2}=-1$ zenbakiaz biderkatu behar da: $i+j$ bakoitia den lekuetan zeinua aldatzen da.', 'Hay que multiplicar por $(-1)^{1+2}=-1$: donde $i+j$ es impar, el signo cambia.', 'يجب الضرب في $(-1)^{1+2}=-1$: حيث $i+j$ فردي تتغير الإشارة.', 'You must multiply by $(-1)^{1+2}=-1$: where $i+j$ is odd, the sign changes.')
        },
        check: {
            prompt: say('Zein zeinu du $A_{32}$ adjuntuak?', '¿Qué signo lleva el adjunto $A_{32}$?', 'ما إشارة المتمم الجبري $A_{32}$؟', 'What sign does the cofactor $A_{32}$ carry?'),
            options: [say('Minus zeinua: menorea, zeinua aldatuta', 'Menos: el menor cambiado de signo', 'سالبة: المحدد الأصغر بإشارة معاكسة', 'Minus: the minor with its sign changed'), say('Plus zeinua: menorea bera', 'Más: el menor tal cual', 'موجبة: المحدد الأصغر كما هو', 'Plus: the minor as it is'), say('Elementuaren araberakoa da', 'Depende del elemento', 'يعتمد على العنصر', 'It depends on the entry')],
            correctIndex: 0,
            explanation: say('$3+2=5$ bakoitia da: $(-1)^5=-1$.', '$3+2=5$ es impar: $(-1)^5=-1$.', '$3+2=5$ فردي: $(-1)^5=-1$.', '$3+2=5$ is odd: $(-1)^5=-1$.')
        }
    },
    laplace: {
        mistake: {
            wrong: say('1. errenkadaren arabera garatzean, menoreak zeinurik gabe batzen ditut: $a_{11}M_{11}+a_{12}M_{12}+a_{13}M_{13}$.', 'Al desarrollar por la fila 1 sumo los menores sin signo: $a_{11}M_{11}+a_{12}M_{12}+a_{13}M_{13}$.', 'عند النشر حسب الصف 1 أجمع المحددات الصغرى دون إشارة: $a_{11}M_{11}+a_{12}M_{12}+a_{13}M_{13}$.', 'Expanding along row 1, I add the minors with no sign: $a_{11}M_{11}+a_{12}M_{12}+a_{13}M_{13}$.'),
            right: say('Adjuntuekin egiten da, zeinuarekin: $a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$, eta $A_{12}=-M_{12}$.', 'Se hace con adjuntos, que llevan signo: $a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$, y $A_{12}=-M_{12}$.', 'يتم بالمتممات الجبرية ذات الإشارة: $a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$، و$A_{12}=-M_{12}$.', 'It is done with cofactors, which carry a sign: $a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}$, and $A_{12}=-M_{12}$.')
        },
        check: {
            prompt: say('Zein lerroren arabera komeni da $\\begin{vmatrix}1&4&2\\\\0&3&0\\\\5&1&6\\end{vmatrix}$ garatzea?', '¿Por qué línea conviene desarrollar $\\begin{vmatrix}1&4&2\\\\0&3&0\\\\5&1&6\\end{vmatrix}$?', 'حسب أي خط يُستحسن نشر $\\begin{vmatrix}1&4&2\\\\0&3&0\\\\5&1&6\\end{vmatrix}$؟', 'Along which line is it best to expand $\\begin{vmatrix}1&4&2\\\\0&3&0\\\\5&1&6\\end{vmatrix}$?'),
            options: [say('1. errenkada', 'La fila 1', 'الصف 1', 'Row 1'), say('3. zutabea', 'La columna 3', 'العمود 3', 'Column 3'), say('2. errenkada', 'La fila 2', 'الصف 2', 'Row 2')],
            correctIndex: 2,
            explanation: say('Bi zero ditu: adjuntu bakarra kalkulatu behar da.', 'Tiene dos ceros: solo hay que calcular un adjunto.', 'فيه صفران: يكفي حساب متمم جبري واحد.', 'It has two zeros: only one cofactor has to be worked out.')
        }
    },
    'order-four': {
        mistake: {
            wrong: say('Sarrusen erregelak 4. ordenarako ere balio du.', 'La regla de Sarrus también sirve para orden 4.', 'قاعدة ساروس صالحة للرتبة 4 أيضًا.', 'Sarrus\' rule works for order 4 too.'),
            right: say('Sarrusek 3. ordenarako bakarrik balio du; 4. ordenan zeroak egiten dira, eta lerro baten arabera garatzen da.', 'Sarrus solo sirve para orden 3; en orden 4 se hacen ceros y se desarrolla por una línea.', 'ساروس للرتبة 3 فقط؛ وفي الرتبة 4 نصنع أصفارًا وننشر حسب خط.', 'Sarrus only works for order 3; in order 4 you make zeros and expand along a line.')
        },
        check: {
            prompt: say('$4\\times 4$ determinante bat bi zero dituen lerro baten arabera garatzean, zenbat 3. ordenako determinante kalkulatu behar dira?', 'Al desarrollar un determinante $4\\times 4$ por una línea con dos ceros, ¿cuántos determinantes de orden 3 hay que calcular?', 'عند نشر محدد $4\\times 4$ حسب خط فيه صفران، كم محددًا من الرتبة 3 يجب حسابه؟', 'When you expand a $4\\times 4$ determinant along a line with two zeros, how many determinants of order 3 do you have to work out?'),
            options: [same('$4$'), same('$2$'), same('$3$')],
            correctIndex: 1,
            explanation: say('Lau elementu ditu, eta bi zero: bi adjuntu geratzen dira.', 'Tiene cuatro elementos y dos son ceros: quedan dos adjuntos.', 'فيه أربعة عناصر صفران منها: يبقى متممان جبريان.', 'It has four entries and two are zeros: two cofactors are left.')
        }
    },
    'det-equations': {
        mistake: {
            wrong: same('$x^2-9=0\\ \\to\\ x=3$'),
            right: say('$x=-3$ ere bai: $x^2=9$ ekuazioak bi soluzio ditu.', 'También $x=-3$: $x^2=9$ tiene dos soluciones.', 'و$x=-3$ أيضًا: للمعادلة $x^2=9$ حلّان.', 'Also $x=-3$: $x^2=9$ has two solutions.')
        },
        check: {
            prompt: say('Zein $x$ baliotarako da zero $\\begin{vmatrix}1&2&3\\\\x&2&3\\\\4&5&6\\end{vmatrix}$, kalkulatu gabe?', '¿Para qué valor de $x$ se anula $\\begin{vmatrix}1&2&3\\\\x&2&3\\\\4&5&6\\end{vmatrix}$ sin calcular?', 'لأي قيمة لـ $x$ ينعدم $\\begin{vmatrix}1&2&3\\\\x&2&3\\\\4&5&6\\end{vmatrix}$ دون حساب؟', 'For which value of $x$ is $\\begin{vmatrix}1&2&3\\\\x&2&3\\\\4&5&6\\end{vmatrix}$ zero, without working it out?'),
            options: [same('$x=0$'), same('$x=1$'), same('$x=2$')],
            correctIndex: 1,
            explanation: say('$x=1$ denean, lehen bi errenkadak berdinak dira.', 'Con $x=1$ las dos primeras filas son iguales.', 'مع $x=1$ يتساوى الصفان الأولان.', 'With $x=1$ the first two rows are equal.')
        }
    },

    /* ---------- 4. Rank by minors ---------- */
    'rank-by-minors': {
        mistake: {
            wrong: say('Begiratzen dudan 2. ordenako lehen menorea 0 da: heina 1 da.', 'El primer menor de orden 2 que miro vale 0: el rango es 1.', 'أول محدد أصغر من الرتبة 2 أنظر إليه يساوي صفرًا: الرتبة 1.', 'The first minor of order 2 I look at is 0: the rank is 1.'),
            right: say('2. ordenako menore guztiak begiratu behar dira; nahikoa da bat 0 ez izatea heina gutxienez 2 izateko.', 'Hay que mirar todos los menores de orden 2; basta uno distinto de 0 para que el rango sea al menos 2.', 'يجب النظر في كل المحددات الصغرى من الرتبة 2؛ يكفي واحد غير صفري لتكون الرتبة 2 على الأقل.', 'You have to look at all the minors of order 2; one that is not 0 is enough for the rank to be at least 2.')
        },
        check: {
            prompt: say('$3\\times 3$ matrize batek $|A|\\neq 0$ du. Zein da haren heina?', 'Una matriz $3\\times 3$ tiene $|A|\\neq 0$. ¿Cuál es su rango?', 'مصفوفة $3\\times 3$ فيها $|A|\\neq 0$. ما رتبتها؟', 'A $3\\times 3$ matrix has $|A|\\neq 0$. What is its rank?'),
            options: [same('$2$'), same('$3$'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن معرفتها', 'It cannot be known')],
            correctIndex: 1,
            explanation: say('3. ordenako menore bat 0 ez da: heina maximoa da.', 'Hay un menor de orden 3 distinto de 0: el rango es máximo.', 'يوجد محدد أصغر من الرتبة 3 غير صفري: الرتبة عظمى.', 'There is a minor of order 3 that is not 0: the rank is full.')
        }
    },
    'rank-parameter-minors': {
        mistake: {
            wrong: say('$a=1$ denean $|A|=0$ da; beraz, $a=1$ denean heina 2 da.', 'Con $a=1$, $|A|=0$, así que con $a=1$ el rango es 2.', 'مع $a=1$ يكون $|A|=0$، إذن مع $a=1$ الرتبة 2.', 'With $a=1$, $|A|=0$, so with $a=1$ the rank is 2.'),
            right: say('$|A|=0$ adierazpenak heina 3 baino txikiagoa dela esaten du bakarrik: begiratu 2. ordenako menoreak (hemen, denak 0 dira, eta heina 1 da).', '$|A|=0$ solo dice que el rango es menor que 3: hay que mirar los menores de orden 2 (aquí todos valen 0 y el rango es 1).', '$|A|=0$ يقول فقط إن الرتبة أقل من 3: يجب النظر في المحددات الصغرى من الرتبة 2 (هنا كلها أصفار والرتبة 1).', '$|A|=0$ only says the rank is less than 3: look at the minors of order 2 (here they are all 0 and the rank is 1).')
        },
        check: {
            prompt: say('$3\\times 3$ matrize batean, $|A|=(m-2)(m+1)$. Zein baliotarako da heina 3?', 'En una matriz $3\\times 3$, $|A|=(m-2)(m+1)$. ¿Para qué valores el rango es 3?', 'في مصفوفة $3\\times 3$ يكون $|A|=(m-2)(m+1)$. لأي القيم تكون الرتبة 3؟', 'In a $3\\times 3$ matrix, $|A|=(m-2)(m+1)$. For which values is the rank 3?'),
            options: [say('$m=2$ edo $m=-1$', '$m=2$ o $m=-1$', '$m=2$ أو $m=-1$', '$m=2$ or $m=-1$'), say('Beti', 'Siempre', 'دائمًا', 'Always'), say('$m\\neq 2$ eta $m\\neq -1$', '$m\\neq 2$ y $m\\neq -1$', '$m\\neq 2$ و$m\\neq -1$', '$m\\neq 2$ and $m\\neq -1$')],
            correctIndex: 2,
            explanation: say('Heina 3 da $|A|\\neq 0$ denean, hau da, $m$ zenbakia ez denean ez 2 ez $-1$.', 'El rango es 3 cuando $|A|\\neq 0$, es decir, cuando $m$ no es ni 2 ni $-1$.', 'الرتبة 3 عندما $|A|\\neq 0$، أي عندما لا يكون $m$ مساويًا 2 ولا $-1$.', 'The rank is 3 when $|A|\\neq 0$, that is, when $m$ is neither 2 nor $-1$.')
        }
    },

    /* ---------- 5. The inverse with the adjugate ---------- */
    'adjugate-inverse': {
        mistake: {
            wrong: say('$A^{-1}=\\frac{1}{|A|}\\operatorname{Adj}(A)$, irauli gabe.', '$A^{-1}=\\frac{1}{|A|}\\operatorname{Adj}(A)$, sin trasponer.', '$A^{-1}=\\frac{1}{|A|}\\operatorname{Adj}(A)$ دون نقل.', '$A^{-1}=\\frac{1}{|A|}\\operatorname{Adj}(A)$, without transposing.'),
            right: say('Irauli egin behar da: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.', 'Hay que trasponer: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.', 'يجب النقل: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.', 'You must transpose: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.')
        },
        check: {
            prompt: say('$|A|=2$ da, eta $(\\operatorname{Adj}A)^t=\\begin{pmatrix}4&2\\\\6&2\\end{pmatrix}$. Zein da $A^{-1}$?', '$|A|=2$ y $(\\operatorname{Adj}A)^t=\\begin{pmatrix}4&2\\\\6&2\\end{pmatrix}$. ¿Cuál es $A^{-1}$?', '$|A|=2$ و$(\\operatorname{Adj}A)^t=\\begin{pmatrix}4&2\\\\6&2\\end{pmatrix}$. ما $A^{-1}$؟', '$|A|=2$ and $(\\operatorname{Adj}A)^t=\\begin{pmatrix}4&2\\\\6&2\\end{pmatrix}$. What is $A^{-1}$?'),
            options: [same('$\\begin{pmatrix}8&4\\\\12&4\\end{pmatrix}$'), same('$\\begin{pmatrix}2&1\\\\3&1\\end{pmatrix}$'), same('$\\begin{pmatrix}4&2\\\\6&2\\end{pmatrix}$')],
            correctIndex: 1,
            explanation: say('Zatitu elementu bakoitza $|A|=2$ zenbakiaz.', 'Divide cada elemento entre $|A|=2$.', 'اقسم كل عنصر على $|A|=2$.', 'Divide each entry by $|A|=2$.')
        }
    },
    'inverse-parameter': {
        mistake: {
            wrong: say('$|A|=m^2+1$ bada, ez du alderantzizkorik $m=-1$ denean.', 'Si $|A|=m^2+1$, no tiene inversa para $m=-1$.', 'إذا كان $|A|=m^2+1$ فليس لها معكوس عندما $m=-1$.', 'If $|A|=m^2+1$, it has no inverse for $m=-1$.'),
            right: say('$m^2+1$ ez da inoiz 0: $A$ matrizeak alderantzizkoa du $m$ guztietarako.', '$m^2+1$ nunca vale 0: $A$ tiene inversa para todo $m$.', '$m^2+1$ لا يساوي صفرًا أبدًا: لـ $A$ معكوس لكل $m$.', '$m^2+1$ is never 0: $A$ has an inverse for every $m$.')
        },
        check: {
            prompt: say('Zein $a$ baliotarako ez du alderantzizkorik $\\begin{pmatrix}a&2\\\\3&6\\end{pmatrix}$ matrizeak?', '¿Para qué valor de $a$ no tiene inversa $\\begin{pmatrix}a&2\\\\3&6\\end{pmatrix}$?', 'لأي قيمة لـ $a$ ليس لـ $\\begin{pmatrix}a&2\\\\3&6\\end{pmatrix}$ معكوس؟', 'For which value of $a$ does $\\begin{pmatrix}a&2\\\\3&6\\end{pmatrix}$ have no inverse?'),
            options: [same('$a=0$'), same('$a=4$'), same('$a=1$')],
            correctIndex: 2,
            explanation: same('$6a-6=0\\ \\to\\ a=1$')
        }
    },
    'det-matrix-equations': {
        mistake: {
            wrong: say('$X$ matrizea $2\\times 2$ da, eta $|2X|=12$; beraz, $|X|=6$.', '$X$ es $2\\times 2$ y $|2X|=12$, así que $|X|=6$.', '$X$ من الأبعاد $2\\times 2$ و$|2X|=12$، إذن $|X|=6$.', '$X$ is $2\\times 2$ and $|2X|=12$, so $|X|=6$.'),
            right: say('$|2X|=2^2|X|=4|X|=12$; beraz, $|X|=3$.', '$|2X|=2^2|X|=4|X|=12$, así que $|X|=3$.', '$|2X|=2^2|X|=4|X|=12$، إذن $|X|=3$.', '$|2X|=2^2|X|=4|X|=12$, so $|X|=3$.')
        },
        check: {
            prompt: say('$|A|=5$ bada, zenbat da $|A^tA|$?', 'Si $|A|=5$, ¿cuánto vale $|A^tA|$?', 'إذا كان $|A|=5$ فكم يساوي $|A^tA|$؟', 'If $|A|=5$, what is $|A^tA|$?'),
            options: [same('$25$'), same('$10$'), same('$5$')],
            correctIndex: 0,
            explanation: same('$|A^tA|=|A^t|\\cdot|A|=5\\cdot 5=25$')
        }
    }
}
