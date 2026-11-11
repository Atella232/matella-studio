import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. A negative entry of
   a matrix that is not the first of its row is written {-1}: the shared
   lesson test would read «1 -1» as a subtraction.
   ========================================================================== */

export type SistemakTopicId =
    | 'matrix-form' | 'rouche-theorem' | 'rank-classify' | 'geometric-meaning'
    | 'cramer-rule' | 'cramer-indeterminate' | 'inverse-solve'
    | 'homogeneous-trivial' | 'homogeneous-parameter'
    | 'parameter-determinant' | 'parameter-ranks' | 'parameter-solve'
    | 'extra-equations' | 'word-problems' | 'parameter-problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

const SCD = say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent')
const SCI = say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent')
const SI = say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent')

export const sistemakLessonChecks: Record<SistemakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Rouché–Frobenius ---------- */
    'matrix-form': {
        mistake: {
            wrong: say('$\\begin{cases}x+z=2\\\\ y-z=1\\end{cases}$ sisteman, $A=\\begin{pmatrix}1&1\\\\1&{-1}\\end{pmatrix}$.', 'En $\\begin{cases}x+z=2\\\\ y-z=1\\end{cases}$, $A=\\begin{pmatrix}1&1\\\\1&{-1}\\end{pmatrix}$.', 'في $\\begin{cases}x+z=2\\\\ y-z=1\\end{cases}$ تكون $A=\\begin{pmatrix}1&1\\\\1&{-1}\\end{pmatrix}$.', 'In $\\begin{cases}x+z=2\\\\ y-z=1\\end{cases}$, $A=\\begin{pmatrix}1&1\\\\1&{-1}\\end{pmatrix}$.'),
            right: say('Zeroak falta dira, zutabe bat ezezagun bakoitzeko: $A=\\begin{pmatrix}1&0&1\\\\0&1&{-1}\\end{pmatrix}$.', 'Faltan los ceros, una columna por incógnita: $A=\\begin{pmatrix}1&0&1\\\\0&1&{-1}\\end{pmatrix}$.', 'تنقص الأصفار، عمود لكل مجهول: $A=\\begin{pmatrix}1&0&1\\\\0&1&{-1}\\end{pmatrix}$.', 'The zeros are missing, one column per unknown: $A=\\begin{pmatrix}1&0&1\\\\0&1&{-1}\\end{pmatrix}$.')
        },
        check: {
            prompt: say('3 ekuazio eta 2 ezezagun dituen sistema batean, zein dimentsio du $A^*$ matrizeak?', '¿Qué dimensión tiene $A^*$ en un sistema de 3 ecuaciones con 2 incógnitas?', 'ما أبعاد $A^*$ في نظام من 3 معادلات بمجهولين؟', 'What size is $A^*$ in a system of 3 equations in 2 unknowns?'),
            options: [same('$3\\times 3$'), same('$3\\times 2$'), same('$2\\times 3$')],
            correctIndex: 0,
            explanation: say('Errenkada bat ekuazio bakoitzeko, eta zutabe bat ezezagun bakoitzeko gehi $B$ zutabea: $3\\times 3$.', 'Una fila por ecuación y una columna por incógnita, más la de $B$: $3\\times 3$.', 'صف لكل معادلة وعمود لكل مجهول، وعمود $B$: $3\\times 3$.', 'One row per equation and one column per unknown, plus that of $B$: $3\\times 3$.')
        }
    },
    'rouche-theorem': {
        mistake: {
            wrong: say('3 ezezagunekin, $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: bateragarri determinatua.', 'Con 3 incógnitas, $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: compatible determinado.', 'مع 3 مجاهيل، $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: متوافق محدد.', 'With 3 unknowns, $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: consistent and independent.'),
            right: say('Ezezagunen kopuruarekin konparatu behar da: $2<3$, beraz, bateragarri indeterminatua.', 'Hay que comparar con el número de incógnitas: $2<3$, así que es compatible indeterminado.', 'يجب المقارنة بعدد المجاهيل: $2<3$، إذن هو متوافق غير محدد.', 'Compare with the number of unknowns: $2<3$, so it is consistent and dependent.')
        },
        check: {
            prompt: say('3 ezezaguneko sistema batek $\\operatorname{rg}(A)=3$ eta $\\operatorname{rg}(A^*)=3$ ditu. Zer motatakoa da?', 'Un sistema de 3 incógnitas tiene $\\operatorname{rg}(A)=3$ y $\\operatorname{rg}(A^*)=3$. ¿De qué tipo es?', 'نظام بثلاثة مجاهيل فيه $\\operatorname{rg}(A)=3$ و$\\operatorname{rg}(A^*)=3$. ما نوعه؟', 'A system in 3 unknowns has $\\operatorname{rg}(A)=3$ and $\\operatorname{rg}(A^*)=3$. What type is it?'),
            options: [SCD, SCI, SI],
            correctIndex: 0,
            explanation: say('Heinak berdinak dira, eta ezezagunen kopuruaren berdinak: soluzio bakarra.', 'Rangos iguales e iguales al número de incógnitas: una sola solución.', 'رتبتان متساويتان وتساويان عدد المجاهيل: حل واحد.', 'Equal ranks, equal to the number of unknowns: one solution.')
        }
    },
    'rank-classify': {
        mistake: {
            wrong: say('$|A|=0$ da; beraz, sistema bateraezina da.', '$|A|=0$, así que el sistema es incompatible.', '$|A|=0$، إذن النظام غير متوافق.', '$|A|=0$, so the system is inconsistent.'),
            right: say('$|A|=0$ adierazpenak determinatua ez dela esaten du bakarrik: $\\operatorname{rg}(A)$ eta $\\operatorname{rg}(A^*)$ konparatu behar dira.', '$|A|=0$ solo dice que no es determinado: falta comparar $\\operatorname{rg}(A)$ con $\\operatorname{rg}(A^*)$.', '$|A|=0$ يقول فقط إنه غير محدد: يجب مقارنة $\\operatorname{rg}(A)$ بـ $\\operatorname{rg}(A^*)$.', '$|A|=0$ only says it is not independent: you still have to compare $\\operatorname{rg}(A)$ with $\\operatorname{rg}(A^*)$.')
        },
        check: {
            prompt: say('3 ekuazio eta 3 ezezagun dituen sistema batean $|A|\\neq 0$ bada, zer motatakoa da?', 'Si $|A|\\neq 0$ en un sistema de 3 ecuaciones con 3 incógnitas, ¿de qué tipo es?', 'إذا كان $|A|\\neq 0$ في نظام من 3 معادلات بثلاثة مجاهيل فما نوعه؟', 'If $|A|\\neq 0$ in a system of 3 equations in 3 unknowns, what type is it?'),
            options: [SCI, SCD, SI],
            correctIndex: 1,
            explanation: say('$\\operatorname{rg}(A)=3$ da, eta $A^*$ matrizeak ezin du 3 baino gehiago izan: bi heinak 3 dira, ezezagunen kopurua.', '$\\operatorname{rg}(A)=3$ y $A^*$ no puede tener más que 3: los dos rangos valen 3, el número de incógnitas.', '$\\operatorname{rg}(A)=3$ ولا يمكن أن تكون رتبة $A^*$ أكثر من 3: الرتبتان 3، وهو عدد المجاهيل.', '$\\operatorname{rg}(A)=3$ and $A^*$ cannot have more than 3: both ranks are 3, the number of unknowns.')
        }
    },
    'geometric-meaning': {
        mistake: {
            wrong: say('Hiru zuzen, $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$ izanik: hiru ebaki-puntu dituzte.', 'Tres rectas con $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: tienen tres puntos de corte.', 'ثلاثة مستقيمات مع $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: لها ثلاث نقاط تقاطع.', 'Three lines with $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: they have three crossing points.'),
            right: say('Heinak 2 eta berdinak: puntu bakarra dago, hiru zuzenei komuna.', 'Rangos iguales a 2: hay un solo punto, común a las tres rectas.', 'رتبتان تساويان 2: نقطة واحدة مشتركة بين المستقيمات الثلاثة.', 'Both ranks 2: there is a single point, common to all three lines.')
        },
        check: {
            prompt: say('Hiru zuzenek $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$ dituzte. Zenbat puntu dituzte komunean?', 'Tres rectas tienen $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$. ¿Cuántos puntos tienen en común?', 'ثلاثة مستقيمات فيها $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$. كم نقطة مشتركة بينها؟', 'Three lines have $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$. How many points do they have in common?'),
            options: [same('$1$'), same('$0$'), say('Infinitu', 'Infinitos', 'ما لا نهاية', 'Infinitely many')],
            correctIndex: 1,
            explanation: say('Heinak desberdinak: bateraezina; ez dago puntu komunik. Bikoteka ebakitzen dira: triangelu bat osatzen dute.', 'Rangos distintos: incompatible, sin punto común. Se cortan de dos en dos: forman un triángulo.', 'رتبتان مختلفتان: غير متوافق ولا نقطة مشتركة. تتقاطع مثنى مثنى: تشكّل مثلثًا.', 'Different ranks: inconsistent, no common point. They cross in pairs: they make a triangle.')
        }
    },

    /* ---------- 2. Cramer ---------- */
    'cramer-rule': {
        mistake: {
            wrong: same('$x=\\frac{|A|}{|A_x|}$'),
            right: say('Alderantziz da: $|A|$ beti behean doa, $x=\\frac{|A_x|}{|A|}$.', 'Es al revés: $|A|$ va siempre abajo, $x=\\frac{|A_x|}{|A|}$.', 'العكس: $|A|$ في المقام دائمًا، $x=\\frac{|A_x|}{|A|}$.', 'It is the other way round: $|A|$ always goes below, $x=\\frac{|A_x|}{|A|}$.')
        },
        check: {
            prompt: say('$\\begin{cases}x+y=4\\\\ x-y=2\\end{cases}$ sisteman, zenbat da $|A_y|$?', 'En $\\begin{cases}x+y=4\\\\ x-y=2\\end{cases}$, ¿cuánto vale $|A_y|$?', 'في $\\begin{cases}x+y=4\\\\ x-y=2\\end{cases}$، كم يساوي $|A_y|$؟', 'In $\\begin{cases}x+y=4\\\\ x-y=2\\end{cases}$, what is $|A_y|$?'),
            options: [same('$-6$'), same('$-2$'), same('$2$')],
            correctIndex: 1,
            explanation: same('$|A_y|=\\begin{vmatrix}1&4\\\\1&2\\end{vmatrix}=2-4=-2$')
        }
    },
    'cramer-indeterminate': {
        mistake: {
            wrong: say('$|A|=0$ da; beraz, ezin da Cramer erabili, eta sistemak ez du soluziorik.', '$|A|=0$, así que no se puede usar Cramer y el sistema no tiene solución.', '$|A|=0$، إذن لا يمكن استعمال كرامر والنظام بلا حل.', '$|A|=0$, so Cramer cannot be used and the system has no solution.'),
            right: say('Cramer menore ez-nuluan erabiltzen da, hirugarren ezezaguna $\\lambda$ izanik, bigarren atalean: infinitu soluzio daude.', 'Se usa Cramer en el menor no nulo, con la tercera incógnita igual a $\\lambda$ en el segundo miembro: hay infinitas soluciones.', 'يُستعمل كرامر في المحدد الأصغر غير الصفري، والمجهول الثالث يساوي $\\lambda$ في الطرف الثاني: توجد حلول لا نهائية.', 'Use Cramer on the non-zero minor, with the third unknown equal to $\\lambda$ on the right-hand side: there are infinitely many solutions.')
        },
        check: {
            prompt: say('3 ezezaguneko sistema bateragarri indeterminatu batean heina 2 da. Zenbat ezezagun pasatzen dira bigarren atalera?', 'En un sistema compatible indeterminado de 3 incógnitas y rango 2, ¿cuántas incógnitas pasan al segundo miembro?', 'في نظام متوافق غير محدد بثلاثة مجاهيل ورتبته 2، كم مجهولًا ينتقل إلى الطرف الثاني؟', 'In a consistent dependent system in 3 unknowns with rank 2, how many unknowns go to the right-hand side?'),
            options: [same('$2$'), same('$0$'), same('$1$')],
            correctIndex: 2,
            explanation: same('$n-r=3-2=1$')
        }
    },
    'inverse-solve': {
        mistake: {
            wrong: same('$AX=B\\ \\to\\ X=BA^{-1}$'),
            right: say('$A$ matrizea $X$ matrizearen ezkerrean dago: $X=A^{-1}B$.', '$A$ está a la izquierda de $X$: $X=A^{-1}B$.', '$A$ على يسار $X$: $X=A^{-1}B$.', '$A$ is on the left of $X$: $X=A^{-1}B$.')
        },
        check: {
            prompt: say('$A^{-1}=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ eta $B=\\begin{pmatrix}3\\\\1\\end{pmatrix}$ badira, zenbat da $x$?', 'Si $A^{-1}=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ y $B=\\begin{pmatrix}3\\\\1\\end{pmatrix}$, ¿cuánto vale $x$?', 'إذا كان $A^{-1}=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ و$B=\\begin{pmatrix}3\\\\1\\end{pmatrix}$ فكم يساوي $x$؟', 'If $A^{-1}=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ and $B=\\begin{pmatrix}3\\\\1\\end{pmatrix}$, what is $x$?'),
            options: [same('$5$'), same('$3$'), same('$7$')],
            correctIndex: 0,
            explanation: say('$X=A^{-1}B$: lehen errenkada bider $B$, $1\\cdot 3+2\\cdot 1=5$.', '$X=A^{-1}B$: primera fila por $B$, $1\\cdot 3+2\\cdot 1=5$.', '$X=A^{-1}B$: الصف الأول في $B$، $1\\cdot 3+2\\cdot 1=5$.', '$X=A^{-1}B$: first row times $B$, $1\\cdot 3+2\\cdot 1=5$.')
        }
    },

    /* ---------- 3. Homogeneous systems ---------- */
    'homogeneous-trivial': {
        mistake: {
            wrong: say('Sistema homogeneo batean $|A|=0$ da: bateraezina da.', '$|A|=0$ en un sistema homogéneo: es incompatible.', '$|A|=0$ في نظام متجانس: هو غير متوافق.', '$|A|=0$ in a homogeneous system: it is inconsistent.'),
            right: say('Sistema homogeneo bat ez da inoiz bateraezina: $|A|=0$ bada, bateragarri indeterminatua da.', 'Un homogéneo nunca es incompatible: con $|A|=0$ es compatible indeterminado.', 'النظام المتجانس لا يكون غير متوافق أبدًا: مع $|A|=0$ هو متوافق غير محدد.', 'A homogeneous system is never inconsistent: with $|A|=0$ it is consistent and dependent.')
        },
        check: {
            prompt: say('3 ezezaguneko sistema homogeneo batek $|A|=4$ du. Zenbat soluzio ditu?', 'Un sistema homogéneo de 3 incógnitas tiene $|A|=4$. ¿Cuántas soluciones tiene?', 'نظام متجانس بثلاثة مجاهيل فيه $|A|=4$. كم حلًّا له؟', 'A homogeneous system in 3 unknowns has $|A|=4$. How many solutions does it have?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Infinitu', 'Infinitas', 'ما لا نهاية', 'Infinitely many'), say('Bat, tribiala', 'Una, la trivial', 'حل واحد، البديهي', 'One, the trivial one')],
            correctIndex: 2,
            explanation: say('$|A|\\neq 0$: bateragarri determinatua; soluzio bakarra $(0,0,0)$ da.', '$|A|\\neq 0$: compatible determinado; la única solución es $(0,0,0)$.', '$|A|\\neq 0$: متوافق محدد؛ والحل الوحيد $(0,0,0)$.', '$|A|\\neq 0$: consistent and independent; the only solution is $(0,0,0)$.')
        }
    },
    'homogeneous-parameter': {
        mistake: {
            wrong: say('$k=0$ denean, $|A|=0$ da; beraz, sistema bateraezina da.', 'Con $k=0$, $|A|=0$, así que el sistema es incompatible.', 'مع $k=0$ يكون $|A|=0$، إذن النظام غير متوافق.', 'With $k=0$, $|A|=0$, so the system is inconsistent.'),
            right: say('Homogeneoa da: $k=0$ denean, bateragarri indeterminatua da, eta infinitu soluzio ditu.', 'Es homogéneo: con $k=0$ es compatible indeterminado, con infinitas soluciones.', 'إنه متجانس: مع $k=0$ هو متوافق غير محدد وله حلول لا نهائية.', 'It is homogeneous: with $k=0$ it is consistent and dependent, with infinitely many solutions.')
        },
        check: {
            prompt: say('Zein $a$ baliotarako ditu soluzio ez-tribialak $\\begin{cases}x+ay=0\\\\ 3x+6y=0\\end{cases}$ sistemak?', '¿Para qué $a$ tiene soluciones no triviales $\\begin{cases}x+ay=0\\\\ 3x+6y=0\\end{cases}$?', 'لأي $a$ يكون لـ $\\begin{cases}x+ay=0\\\\ 3x+6y=0\\end{cases}$ حلول غير بديهية؟', 'For which $a$ does $\\begin{cases}x+ay=0\\\\ 3x+6y=0\\end{cases}$ have non-trivial solutions?'),
            options: [same('$-2$'), same('$2$'), same('$\\frac{1}{2}$')],
            correctIndex: 1,
            explanation: same('$|A|=6-3a=0\\ \\to\\ a=2$')
        }
    },

    /* ---------- 4. Discussing with a parameter ---------- */
    'parameter-determinant': {
        mistake: {
            wrong: say('$a=1$ denean, $|A|=0$ da: sistema bateraezina da.', 'Con $a=1$, $|A|=0$: el sistema es incompatible.', 'مع $a=1$ يكون $|A|=0$: النظام غير متوافق.', 'With $a=1$, $|A|=0$: the system is inconsistent.'),
            right: say('$|A|=0$ adierazpenak determinatua ez dela esaten du bakarrik; heinei begiratu behar zaie.', '$|A|=0$ solo dice que no es determinado; hay que mirar los rangos.', '$|A|=0$ يقول فقط إنه غير محدد؛ يجب النظر إلى الرتبتين.', '$|A|=0$ only says it is not independent; you have to look at the ranks.')
        },
        check: {
            prompt: say('$|A|=(a-3)(a+1)$ bada, zein $a$ baliotarako da bateragarri determinatua?', 'Si $|A|=(a-3)(a+1)$, ¿para qué valores de $a$ es compatible determinado?', 'إذا كان $|A|=(a-3)(a+1)$ فلأي قيم لـ $a$ يكون متوافقًا محددًا؟', 'If $|A|=(a-3)(a+1)$, for which values of $a$ is it consistent and independent?'),
            options: [same('$a=3,\\ a=-1$'), same('$a\\neq 3,\\ a\\neq -1$'), same('$a\\neq -3,\\ a\\neq 1$')],
            correctIndex: 1,
            explanation: say('$|A|\\neq 0$ da erroetatik kanpo, $3$ eta $-1$ baliotatik kanpo.', '$|A|\\neq 0$ fuera de las raíces $3$ y $-1$.', '$|A|\\neq 0$ خارج الجذرين $3$ و$-1$.', '$|A|\\neq 0$ away from the roots $3$ and $-1$.')
        }
    },
    'parameter-ranks': {
        mistake: {
            wrong: say('$a=-2$ denean, $\\operatorname{rg}(A)=2$ da; beraz, bateragarri indeterminatua da.', 'Con $a=-2$, $\\operatorname{rg}(A)=2$, así que es compatible indeterminado.', 'مع $a=-2$ تكون $\\operatorname{rg}(A)=2$، إذن هو متوافق غير محدد.', 'With $a=-2$, $\\operatorname{rg}(A)=2$, so it is consistent and dependent.'),
            right: say('$A^*$ falta da: $B$ zutabearekin orlatutakoa $-9$ da, $\\operatorname{rg}(A^*)=3$, eta bateraezina da.', 'Falta $A^*$: el orlado con $B$ vale $-9$, $\\operatorname{rg}(A^*)=3$ y es incompatible.', 'ينقص $A^*$: المطوَّق بـ $B$ يساوي $-9$، و$\\operatorname{rg}(A^*)=3$، فهو غير متوافق.', '$A^*$ is missing: the one bordered with $B$ is $-9$, $\\operatorname{rg}(A^*)=3$ and it is inconsistent.')
        },
        check: {
            prompt: say('Balio kritiko batean, 3 ezezagunekin, $\\operatorname{rg}(A)=2$ da, eta $B$ zutabearekin orlatutako guztiak 0 dira. Zer motatakoa da?', 'En un valor crítico, con 3 incógnitas, $\\operatorname{rg}(A)=2$ y todos los orlados con $B$ valen 0. ¿De qué tipo es?', 'عند قيمة حرجة، مع 3 مجاهيل، $\\operatorname{rg}(A)=2$ وكل المطوَّقات بـ $B$ أصفار. ما نوعه؟', 'At a critical value, with 3 unknowns, $\\operatorname{rg}(A)=2$ and every minor bordered with $B$ is 0. What type is it?'),
            options: [SI, SCD, SCI],
            correctIndex: 2,
            explanation: say('$\\operatorname{rg}(A^*)=2=\\operatorname{rg}(A)<3$: infinitu soluzio, parametro batekin.', '$\\operatorname{rg}(A^*)=2=\\operatorname{rg}(A)<3$: infinitas soluciones, con un parámetro.', '$\\operatorname{rg}(A^*)=2=\\operatorname{rg}(A)<3$: حلول لا نهائية بوسيط واحد.', '$\\operatorname{rg}(A^*)=2=\\operatorname{rg}(A)<3$: infinitely many solutions, with one parameter.')
        }
    },
    'parameter-solve': {
        mistake: {
            wrong: say('$x=\\frac{1}{a+2}$ soluzioak $a$ guztietarako balio du.', 'La solución $x=\\frac{1}{a+2}$ vale para todo $a$.', 'الحل $x=\\frac{1}{a+2}$ صالح لكل $a$.', 'The solution $x=\\frac{1}{a+2}$ works for every $a$.'),
            right: say('$a\\neq 1$ eta $a\\neq -2$ direnean bakarrik: $a=-2$ denean ez dago soluziorik, eta $a=1$ denean infinitu daude.', 'Solo para $a\\neq 1$ y $a\\neq -2$: con $a=-2$ no hay solución y con $a=1$ hay infinitas.', 'فقط عندما $a\\neq 1$ و$a\\neq -2$: مع $a=-2$ لا حل، ومع $a=1$ حلول لا نهائية.', 'Only for $a\\neq 1$ and $a\\neq -2$: with $a=-2$ there is no solution and with $a=1$ there are infinitely many.')
        },
        check: {
            prompt: say('$x=\\frac{1}{a+2}$ bada, zenbat da $x$, $a=3$ denean?', 'Con $x=\\frac{1}{a+2}$, ¿cuánto vale $x$ si $a=3$?', 'مع $x=\\frac{1}{a+2}$، كم يساوي $x$ عندما $a=3$؟', 'With $x=\\frac{1}{a+2}$, what is $x$ when $a=3$?'),
            options: [same('$5$'), same('$\\frac{1}{3}$'), same('$\\frac{1}{5}$')],
            correctIndex: 2,
            explanation: same('$x=\\frac{1}{3+2}=\\frac{1}{5}$')
        }
    },

    /* ---------- 5. Problems ---------- */
    'extra-equations': {
        mistake: {
            wrong: say('$A$ matrizea $3\\times 2$ da; beraz, $\\operatorname{rg}(A)=3$.', '$A$ es $3\\times 2$, así que $\\operatorname{rg}(A)=3$.', '$A$ من الأبعاد $3\\times 2$، إذن $\\operatorname{rg}(A)=3$.', '$A$ is $3\\times 2$, so $\\operatorname{rg}(A)=3$.'),
            right: say('Heinak ezin du zutabe kopurua gainditu: $\\operatorname{rg}(A)\\le 2$.', 'El rango no puede pasar del número de columnas: $\\operatorname{rg}(A)\\le 2$.', 'لا يمكن أن تتجاوز الرتبة عدد الأعمدة: $\\operatorname{rg}(A)\\le 2$.', 'The rank cannot exceed the number of columns: $\\operatorname{rg}(A)\\le 2$.')
        },
        check: {
            prompt: say('4 ekuazio eta 3 ezezagun dituen sistema batean, zein da $A$ matrizearen heinik handiena?', 'En un sistema de 4 ecuaciones con 3 incógnitas, ¿qué rango máximo puede tener $A$?', 'في نظام من 4 معادلات بثلاثة مجاهيل، ما أكبر رتبة ممكنة لـ $A$؟', 'In a system of 4 equations in 3 unknowns, what is the largest rank $A$ can have?'),
            options: [same('$4$'), same('$3$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$A$ matrizeak 3 zutabe ditu: heina ezin da 3 baino handiagoa izan.', '$A$ tiene 3 columnas: el rango no puede ser mayor que 3.', 'لـ $A$ ثلاثة أعمدة: لا يمكن أن تزيد الرتبة على 3.', '$A$ has 3 columns: the rank cannot be more than 3.')
        }
    },
    'word-problems': {
        mistake: {
            wrong: say('«Anak Beak baino bi aldiz gehiago du»: $2x=y$.', '«Ana tiene el doble que Bea»: $2x=y$.', '«مع آنا ضعف ما مع بيا»: $2x=y$.', '«Ana has twice as much as Bea»: $2x=y$.'),
            right: say('Bikoitza Anak du: $x=2y$.', 'El doble lo tiene Ana: $x=2y$.', 'الضعف مع آنا: $x=2y$.', 'Ana is the one with twice as much: $x=2y$.')
        },
        check: {
            prompt: say('Bi zenbakiren batura 7 da, eta kendura 3. Zein da handiena?', 'Dos números suman 7 y su diferencia es 3. ¿Cuál es el mayor?', 'مجموع عددين 7 والفرق بينهما 3. ما الأكبر؟', 'Two numbers add up to 7 and their difference is 3. Which is the larger?'),
            options: [same('$4$'), same('$5$'), same('$2$')],
            correctIndex: 1,
            explanation: same('$\\begin{cases}x+y=7\\\\ x-y=3\\end{cases}\\ \\to\\ 2x=10,\\ x=5$')
        }
    },
    'parameter-problems': {
        mistake: {
            wrong: say('Ekuazio bat nahikoa da: bigarrenetik $a=2$ ateratzen da, eta kitto.', 'Basta con una ecuación: de la segunda sale $a=2$, y ya está.', 'تكفي معادلة واحدة: من الثانية نحصل على $a=2$ وانتهى.', 'One equation is enough: the second gives $a=2$, and that is it.'),
            right: say('Ekuazio guztiak egiaztatu behar dira: beste batek beste balio bat emango balu, hirukotea ez litzateke soluzioa izango inolako $a$ baliotarako.', 'Hay que comprobar todas: si otra ecuación diera otro valor, la terna no sería solución para ningún $a$.', 'يجب التحقق من كلها: لو أعطت معادلة أخرى قيمة أخرى لما كانت الثلاثية حلًّا لأي $a$.', 'Check them all: if another equation gave another value, the triple would not be a solution for any $a$.')
        },
        check: {
            prompt: say('Zein $k$ baliotarako da $(1,1)$ $\\begin{cases}x+y=2\\\\ kx-y=3\\end{cases}$ sistemaren soluzioa?', '¿Para qué $k$ es $(1,1)$ solución de $\\begin{cases}x+y=2\\\\ kx-y=3\\end{cases}$?', 'لأي $k$ يكون $(1,1)$ حلًّا لـ $\\begin{cases}x+y=2\\\\ kx-y=3\\end{cases}$؟', 'For which $k$ is $(1,1)$ a solution of $\\begin{cases}x+y=2\\\\ kx-y=3\\end{cases}$?'),
            options: [same('$2$'), same('$3$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$k-1=3\\ \\to\\ k=4$')
        }
    }
}
