import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Ekuazioak · 3. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The mistakes are the ones the lessons already
   had; the questions use new numbers, never those of «Let's solve» or of
   the example, and one of their wrong answers is the lesson's typical
   mistake. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type Equations3TopicId = 'equations' | 'brackets' | 'denominators' | 'incomplete' | 'formula' | 'discriminant' | 'pairs' | 'graphic' | 'classify' | 'substitution' | 'equalisation' | 'elimination' | 'equation-problems' | 'quadratic-problems' | 'system-problems'

export const equations3LessonChecks: Record<Equations3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    equations: {
        mistake: {
            wrong: say('$2x=10$ ekuaziotik $x=10-2=8$.', 'De $2x=10$ sale $x=10-2=8$.', 'من $2x=10$ نحصل على $x=10-2=8$.', 'From $2x=10$ you get $x=10-2=8$.'),
            right: say('$2x$ 2 bider $x$ da: bi atalak zatitu behar dira, $x=10\\div 2=5$.', '$2x$ es 2 por $x$: hay que dividir los dos miembros, $x=10\\div 2=5$.', '$2x$ هو 2 في $x$: يجب قسمة الطرفين، $x=10\\div 2=5$.', '$2x$ is 2 times $x$: divide both sides, $x=10\\div 2=5$.')
        },
        check: {
            prompt: say('Ebatzi $3x=21$.', 'Resuelve $3x=21$.', 'حلّ $3x=21$.', 'Solve $3x=21$.'),
            options: [same('$x=7$'), same('$x=18$'), same('$x=63$')],
            correctIndex: 0,
            explanation: say('$3x$ 3 bider $x$ da: zatitu bi atalak 3 zenbakiaz, $x=21\\div 3=7$.', '$3x$ es 3 por $x$: divide los dos miembros entre 3, $x=21\\div 3=7$.', '$3x$ تعني 3 في $x$: اقسم الطرفين على 3، $x=21\\div 3=7$.', '$3x$ is 3 times $x$: divide both sides by 3, $x=21\\div 3=7$.')
        }
    },
    brackets: {
        mistake: {
            wrong: say('$-(x-4)=-x-4$', '$-(x-4)=-x-4$', '$-(x-4)=-x-4$', '$-(x-4)=-x-4$'),
            right: say('Minusak parentesiko gai guztiei eragiten die: $-(x-4)=-x+4$.', 'El menos afecta a todos los términos: $-(x-4)=-x+4$.', 'السالب يؤثر في كل الحدود: $-(x-4)=-x+4$.', 'The minus affects every term: $-(x-4)=-x+4$.')
        },
        check: {
            prompt: say('Ebatzi $2(x+3)-(x-1)=10$.', 'Resuelve $2(x+3)-(x-1)=10$.', 'حلّ $2(x+3)-(x-1)=10$.', 'Solve $2(x+3)-(x-1)=10$.'),
            options: [same('$x=5$'), same('$x=3$'), same('$x=1$')],
            correctIndex: 1,
            explanation: say('$2x+6-x+1=10$; beraz, $x+7=10$ eta $x=3$. Minusak $-1$ zenbakiari ere eragiten dio.', '$2x+6-x+1=10$, así que $x+7=10$ y $x=3$. El menos afecta también al $-1$.', '$2x+6-x+1=10$، إذن $x+7=10$ و$x=3$. وإشارة الناقص تؤثر في $-1$ أيضًا.', '$2x+6-x+1=10$, so $x+7=10$ and $x=3$. The minus also affects the $-1$.')
        }
    },
    denominators: {
        mistake: {
            wrong: say('$\\frac{x}{3}+2=5$ bider 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ por 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ في 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ times 3: $x+2=15$.'),
            right: say('Gai guztiak biderkatzen dira, 2 ere bai: $x+6=15$, $x=9$.', 'Se multiplican todos los términos, también el 2: $x+6=15$, $x=9$.', 'تُضرب كل الحدود، حتى 2: $x+6=15$، $x=9$.', 'Every term is multiplied, the 2 as well: $x+6=15$, $x=9$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{4}+2=5$.', 'Resuelve $\\frac{x}{4}+2=5$.', 'حلّ $\\frac{x}{4}+2=5$.', 'Solve $\\frac{x}{4}+2=5$.'),
            options: [same('$x=18$'), same('$x=3$'), same('$x=12$')],
            correctIndex: 2,
            explanation: say('Bider 4 gai guztiak: $x+8=20$, $x=12$. 2 zenbakia biderkatu gabe, 18 aterako litzateke.', 'Por 4 todos los términos: $x+8=20$, $x=12$. Sin multiplicar el 2 saldría 18.', 'نضرب كل الحدود في 4: $x+8=20$ و$x=12$. ودون ضرب 2 يخرج 18.', 'Times 4 on every term: $x+8=20$, $x=12$. Without multiplying the 2 you would get 18.')
        }
    },
    incomplete: {
        mistake: {
            wrong: say('$x^{2}=4x$ eta $x$ ezezagunaz zatitzen dut: $x=4$ bakarrik.', '$x^{2}=4x$, divido entre $x$: solo $x=4$.', '$x^{2}=4x$، أقسم على $x$: $x=4$ فقط.', '$x^{2}=4x$, divide by $x$: only $x=4$.'),
            right: say('$x$ ezezagunaz zatitzean $x=0$ galtzen da. Faktore komuna: $x(x-4)=0$, $x=0$ eta $x=4$.', 'Al dividir entre $x$ se pierde $x=0$. Factor común: $x(x-4)=0$, $x=0$ y $x=4$.', 'بالقسمة على $x$ نفقد $x=0$. العامل المشترك: $x(x-4)=0$، $x=0$ و$x=4$.', 'Dividing by $x$ loses $x=0$. Common factor: $x(x-4)=0$, $x=0$ and $x=4$.')
        },
        check: {
            prompt: say('Ebatzi $x^{2}=6x$.', 'Resuelve $x^{2}=6x$.', 'حلّ $x^{2}=6x$.', 'Solve $x^{2}=6x$.'),
            options: [same('$x=6$'), same('$x=0,\\ x=6$'), same('$x=\\pm 6$')],
            correctIndex: 1,
            explanation: say('Ez zatitu $x$ letraz: $x^{2}-6x=0$, $x(x-6)=0$; beraz, $x=0$ eta $x=6$.', 'No dividas entre $x$: $x^{2}-6x=0$, $x(x-6)=0$, así que $x=0$ y $x=6$.', 'لا تقسم على $x$: ‏$x^{2}-6x=0$ و$x(x-6)=0$، إذن $x=0$ و$x=6$.', 'Do not divide by $x$: $x^{2}-6x=0$, $x(x-6)=0$, so $x=0$ and $x=6$.')
        }
    },
    formula: {
        mistake: {
            wrong: say('$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.'),
            right: say('$b=-4$ da, beraz $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ eta $x=1$.', '$b=-4$, así que $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ y $x=1$.', '$b=-4$، إذن $-b=4$: $x=\\frac{4\\pm 2}{2}$، $x=3$ و$x=1$.', '$b=-4$, so $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ and $x=1$.')
        },
        check: {
            prompt: say('Ebatzi $x^{2}-6x+8=0$.', 'Resuelve $x^{2}-6x+8=0$.', 'حلّ $x^{2}-6x+8=0$.', 'Solve $x^{2}-6x+8=0$.'),
            options: [same('$x=-2,\\ x=-4$'), same('$x=4,\\ x=2$'), same('$x=8,\\ x=1$')],
            correctIndex: 1,
            explanation: say('$b=-6$; beraz, $-b=6$: $x=\\frac{6\\pm 2}{2}$, $x=4$ eta $x=2$.', '$b=-6$, así que $-b=6$: $x=\\frac{6\\pm 2}{2}$, $x=4$ y $x=2$.', '$b=-6$ إذن $-b=6$: ‏$x=\\frac{6\\pm 2}{2}$، ‏$x=4$ و$x=2$.', '$b=-6$, so $-b=6$: $x=\\frac{6\\pm 2}{2}$, $x=4$ and $x=2$.')
        }
    },
    discriminant: {
        mistake: {
            wrong: say('$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, ebazpenik ez.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, no tiene solución.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$، لا حل.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, no solution.'),
            right: say('$c=-8$ da, zeinuarekin: $\\Delta=4+32=36>0$, bi ebazpen.', '$c=-8$, con su signo: $\\Delta=4+32=36>0$, dos soluciones.', '$c=-8$ بإشارته: $\\Delta=4+32=36>0$، حلّان.', '$c=-8$, with its sign: $\\Delta=4+32=36>0$, two solutions.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $x^{2}-3x-10=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}-3x-10=0$?', 'كم حلًا للمعادلة $x^{2}-3x-10=0$؟', 'How many solutions does $x^{2}-3x-10=0$ have?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Bat', 'Una', 'حل واحد', 'One'), say('Bi', 'Dos', 'حلّان', 'Two')],
            correctIndex: 2,
            explanation: say('$c=-10$, bere zeinuarekin: $\\Delta=9+40=49>0$, bi soluzio.', '$c=-10$, con su signo: $\\Delta=9+40=49>0$, dos soluciones.', '$c=-10$ بإشارته: ‏$\\Delta=9+40=49>0$، حلّان.', '$c=-10$, with its sign: $\\Delta=9+40=49>0$, two solutions.')
        }
    },
    pairs: {
        mistake: {
            wrong: say('$(4,1)$ ebazpena da: $x+y=5$ betetzen du.', '$(4,1)$ es solución: cumple $x+y=5$.', '$(4,1)$ حلّ: يحقق $x+y=5$.', '$(4,1)$ is the solution: it satisfies $x+y=5$.'),
            right: say('Bi ekuazioak bete behar ditu: $3\\cdot 4-1=11\\neq 3$, beraz ez da sistemaren ebazpena.', 'Tiene que cumplir las dos: $3\\cdot 4-1=11\\neq 3$, así que no es solución del sistema.', 'يجب أن يحقق الاثنتين: $3\\cdot 4-1=11\\neq 3$، إذن ليس حلًّا للنظام.', 'It must satisfy both: $3\\cdot 4-1=11\\neq 3$, so it is not the solution of the system.')
        },
        check: {
            prompt: say('Zein bikote da $x+y=7$, $x-y=1$ sistemaren soluzioa?', '¿Qué pareja es solución del sistema $x+y=7$, $x-y=1$?', 'أي زوج هو حل النظام $x+y=7$، $x-y=1$؟', 'Which pair solves the system $x+y=7$, $x-y=1$?'),
            options: [same('$(5,2)$'), same('$(4,3)$'), same('$(3,4)$')],
            correctIndex: 1,
            explanation: say('$4+3=7$ eta $4-3=1$: biak betetzen ditu. $(5,2)$ bikoteak lehenengoa bakarrik.', '$4+3=7$ y $4-3=1$: cumple las dos. $(5,2)$ solo cumple la primera.', '$4+3=7$ و$4-3=1$: يحقق المعادلتين. أما $(5,2)$ فيحقق الأولى فقط.', '$4+3=7$ and $4-3=1$: it satisfies both. $(5,2)$ only satisfies the first.')
        }
    },
    graphic: {
        mistake: {
            wrong: say('Ebazpena zuzen batek $y$ ardatza mozten duen puntua da.', 'La solución es donde una recta corta el eje $y$.', 'الحل حيث يقطع أحد المستقيمين محور $y$.', 'The solution is where one line crosses the $y$ axis.'),
            right: say('Ebazpena bi zuzenen arteko ebakidura da, ez ardatzekin.', 'La solución es el corte de las dos rectas entre sí, no con los ejes.', 'الحل تقاطع المستقيمين معًا، لا مع المحورين.', 'The solution is where the two lines cross each other, not the axes.')
        },
        check: {
            prompt: say('$y=2x+5$ zuzenak $y$ ardatza $(0,5)$ puntuan ebakitzen du, eta $y=-x+2$ zuzenak $(0,2)$ puntuan. Bi zuzenak $(-1,3)$ puntuan ebakitzen dira. Zein da sistemaren soluzioa?', 'La recta $y=2x+5$ corta el eje $y$ en $(0,5)$, y la recta $y=-x+2$, en $(0,2)$. Las dos rectas se cortan en $(-1,3)$. ¿Cuál es la solución del sistema?', 'يقطع المستقيم $y=2x+5$ محور $y$ في $(0,5)$، والمستقيم $y=-x+2$ في $(0,2)$. ويتقاطع المستقيمان في $(-1,3)$. ما حل النظام؟', 'The line $y=2x+5$ cuts the $y$ axis at $(0,5)$, and the line $y=-x+2$ at $(0,2)$. The two lines cross at $(-1,3)$. What is the solution of the system?'),
            options: [same('$(0,5)$'), same('$(-1,3)$'), same('$(0,2)$')],
            correctIndex: 1,
            explanation: say('Soluzioa bi zuzenen arteko ebakia da: $(-1,3)$ bietan dago, $2\\cdot(-1)+5=3$ eta $1+2=3$.', 'La solución es el corte entre las dos rectas: $(-1,3)$ está en las dos, $2\\cdot(-1)+5=3$ y $1+2=3$.', 'الحل هو تقاطع المستقيمين: $(-1,3)$ على كليهما، $2\\cdot(-1)+5=3$ و$1+2=3$.', 'The solution is where the two lines cross: $(-1,3)$ is on both, $2\\cdot(-1)+5=3$ and $1+2=3$.')
        }
    },
    classify: {
        mistake: {
            wrong: say('$x+y=4$ eta $2x+2y=8$ desberdinak dira: ebazpen bakarra dute.', '$x+y=4$ y $2x+2y=8$ son distintas: tienen una solución.', '$x+y=4$ و$2x+2y=8$ مختلفتان: لهما حلّ واحد.', '$x+y=4$ and $2x+2y=8$ are different: they have one solution.'),
            right: say('Bigarrena lehena bider 2 da: zuzen bera, infinitu ebazpen.', 'La segunda es la primera por 2: la misma recta, infinitas soluciones.', 'الثانية هي الأولى في 2: المستقيم نفسه، حلول لانهائية.', 'The second is the first times 2: the same line, infinitely many solutions.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $x-2y=1$, $2x-4y=5$ sistemak?', '¿Cuántas soluciones tiene el sistema $x-2y=1$, $2x-4y=5$?', 'كم حلًا للنظام $x-2y=1$، $2x-4y=5$؟', 'How many solutions does the system $x-2y=1$, $2x-4y=5$ have?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Infinitu', 'Infinitas', 'لا نهائية', 'Infinitely many'), say('Bat', 'Una', 'حل واحد', 'One')],
            correctIndex: 0,
            explanation: say('$x$ eta $y$ koefizienteak proportzionalak dira (bider 2), baina gai askeak ez: $5$ ez da $1\\cdot 2$. Zuzen paraleloak.', 'Los coeficientes de $x$ y de $y$ son proporcionales (por 2), pero los términos independientes no: $5$ no es $1\\cdot 2$. Rectas paralelas.', 'معاملات $x$ و$y$ متناسبة (في 2) لكن الحدين الثابتين ليسا كذلك: $5$ ليس $1\\cdot 2$. مستقيمان متوازيان.', 'The coefficients of $x$ and $y$ are proportional (times 2), but the constant terms are not: $5$ is not $1\\cdot 2$. Parallel lines.')
        }
    },
    substitution: {
        mistake: {
            wrong: say('$x=8-2y$ ordezkatzean: $3\\cdot 8-2y-y=3$.', 'Al sustituir $x=8-2y$: $3\\cdot 8-2y-y=3$.', 'عند تعويض $x=8-2y$: $3\\cdot 8-2y-y=3$.', 'Substituting $x=8-2y$: $3\\cdot 8-2y-y=3$.'),
            right: say('Ordezkatutakoa parentesi artean doa: $3(8-2y)=24-6y$.', 'Lo sustituido va entre paréntesis: $3(8-2y)=24-6y$.', 'ما نعوّضه يوضع بين قوسين: $3(8-2y)=24-6y$.', 'What you substitute goes in brackets: $3(8-2y)=24-6y$.')
        },
        check: {
            prompt: say('Ebatzi $x=2y$, $x+y=12$.', 'Resuelve $x=2y$, $x+y=12$.', 'حلّ $x=2y$، $x+y=12$.', 'Solve $x=2y$, $x+y=12$.'),
            options: [same('$x=8,\\ y=4$'), same('$x=4,\\ y=8$'), same('$x=6,\\ y=6$')],
            correctIndex: 0,
            explanation: say('Ordezkatu: $2y+y=12$; beraz, $y=4$ eta $x=2\\cdot 4=8$.', 'Sustituye: $2y+y=12$, así que $y=4$ y $x=2\\cdot 4=8$.', 'عوّض: $2y+y=12$، إذن $y=4$ و$x=2\\cdot 4=8$.', 'Substitute: $2y+y=12$, so $y=4$ and $x=2\\cdot 4=8$.')
        }
    },
    equalisation: {
        mistake: {
            wrong: say('$y=2x+1$ eta $x=-y+7$ berdindu: $2x+1=-y+7$.', 'Igualo $y=2x+1$ y $x=-y+7$: $2x+1=-y+7$.', 'أساوي $y=2x+1$ و$x=-y+7$: $2x+1=-y+7$.', 'I set $y=2x+1$ and $x=-y+7$ equal: $2x+1=-y+7$.'),
            right: say('Ezezagun BERA bakandu behar da bietan; bestela bi ezezagun geratzen dira.', 'Hay que despejar la MISMA incógnita en las dos; si no, quedan dos incógnitas.', 'يجب عزل المجهول نفسه في الاثنتين؛ وإلا يبقى مجهولان.', 'You must isolate the SAME unknown in both; otherwise two unknowns are left.')
        },
        check: {
            prompt: say('Ebatzi $y=x+4$, $y=3x$.', 'Resuelve $y=x+4$, $y=3x$.', 'حلّ $y=x+4$، $y=3x$.', 'Solve $y=x+4$, $y=3x$.'),
            options: [same('$x=6,\\ y=2$'), same('$x=1,\\ y=5$'), same('$x=2,\\ y=6$')],
            correctIndex: 2,
            explanation: say('Berdindu: $x+4=3x$; beraz, $x=2$ eta $y=3\\cdot 2=6$.', 'Iguala: $x+4=3x$, así que $x=2$ e $y=3\\cdot 2=6$.', 'ساوِ: $x+4=3x$، إذن $x=2$ و$y=3\\cdot 2=6$.', 'Set equal: $x+4=3x$, so $x=2$ and $y=3\\cdot 2=6$.')
        }
    },
    elimination: {
        mistake: {
            wrong: say('$5x-y=13$ bider 3: $15x-3y=13$.', '$5x-y=13$ por 3: $15x-3y=13$.', '$5x-y=13$ في 3: $15x-3y=13$.', '$5x-y=13$ times 3: $15x-3y=13$.'),
            right: say('Bi atalak biderkatzen dira, gai askea ere bai: $15x-3y=39$.', 'Se multiplican los dos miembros, también el término independiente: $15x-3y=39$.', 'يُضرب الطرفان، حتى الحد الثابت: $15x-3y=39$.', 'Both sides are multiplied, the constant as well: $15x-3y=39$.')
        },
        check: {
            prompt: say('Ebatzi $x+3y=9$, $2x-3y=0$.', 'Resuelve $x+3y=9$, $2x-3y=0$.', 'حلّ $x+3y=9$، $2x-3y=0$.', 'Solve $x+3y=9$, $2x-3y=0$.'),
            options: [same('$x=3,\\ y=2$'), same('$x=2,\\ y=3$'), same('$x=9,\\ y=0$')],
            correctIndex: 0,
            explanation: say('Batu: $3y$ eta $-3y$ desagertzen dira, $3x=9$, $x=3$. Gero, $3+3y=9$, $y=2$.', 'Suma: $3y$ y $-3y$ desaparecen, $3x=9$, $x=3$. Después, $3+3y=9$, $y=2$.', 'اجمع: يختفي $3y$ و$-3y$، ‏$3x=9$ و$x=3$. ثم $3+3y=9$ و$y=2$.', 'Add: $3y$ and $-3y$ disappear, $3x=9$, $x=3$. Then $3+3y=9$, $y=2$.')
        }
    },
    'equation-problems': {
        mistake: {
            wrong: say('4 urte barru: $x+28=3(x+4)$.', 'Dentro de 4 años: $x+28=3(x+4)$.', 'بعد 4 سنوات: $x+28=3(x+4)$.', 'In 4 years: $x+28=3(x+4)$.'),
            right: say('Urteak amari ere igarotzen zaizkio: $x+28+4=3(x+4)$.', 'Los años también pasan para la madre: $x+28+4=3(x+4)$.', 'السنوات تمرّ على الأم أيضًا: $x+28+4=3(x+4)$.', 'The years pass for the mother too: $x+28+4=3(x+4)$.')
        },
        check: {
            prompt: say('Alaba batek 5 urte ditu eta bere aitak 35. Zenbat urte barru izango ditu aitak alabaren hirukoitza?', 'Una hija tiene 5 años y su padre, 35. ¿Dentro de cuántos años tendrá el padre el triple que ella?', 'عمر بنت 5 سنوات وعمر أبيها 35. بعد كم سنة يصير عمر الأب ثلاثة أمثال عمرها؟', 'A daughter is 5 and her father is 35. In how many years will the father be three times her age?'),
            options: [say('10 urte barru', 'Dentro de 10 años', 'بعد 10 سنوات', 'In 10 years'), say('Inoiz ez', 'Nunca', 'أبدًا', 'Never'), say('20 urte barru', 'Dentro de 20 años', 'بعد 20 سنة', 'In 20 years')],
            correctIndex: 0,
            explanation: say('Urteak bientzat igarotzen dira: $35+x=3(5+x)$; beraz, $35+x=15+3x$ eta $x=10$. Orduan 15 eta 45 urte izango dituzte.', 'Los años pasan para los dos: $35+x=3(5+x)$, así que $35+x=15+3x$ y $x=10$. Tendrán 15 y 45 años.', 'السنوات تمر على الاثنين: $35+x=3(5+x)$، إذن $35+x=15+3x$ و$x=10$. وسيكون عمراهما 15 و45.', 'The years pass for both: $35+x=3(5+x)$, so $35+x=15+3x$ and $x=10$. They will be 15 and 45.')
        }
    },
    'quadratic-problems': {
        mistake: {
            wrong: say('Karratu baten aldea: $x^{2}=49$, $x=\\pm 7$, beraz $-7$ ere bai.', 'Lado de un cuadrado: $x^{2}=49$, $x=\\pm 7$, así que también $-7$.', 'ضلع مربع: $x^{2}=49$، $x=\\pm 7$، إذن $-7$ أيضًا.', 'Side of a square: $x^{2}=49$, $x=\\pm 7$, so $-7$ as well.'),
            right: say('Luzera batek ezin du negatiboa izan: aldea 7 da bakarrik.', 'Una longitud no puede ser negativa: el lado mide solo 7.', 'لا يمكن للطول أن يكون سالبًا: الضلع 7 فقط.', 'A length cannot be negative: the side is only 7.')
        },
        check: {
            prompt: say('Karratu batek 81 cm² ditu. Zenbat neurtzen du aldeak?', 'Un cuadrado tiene 81 cm² de área. ¿Cuánto mide su lado?', 'مساحة مربع 81 سم². كم طول ضلعه؟', 'A square has an area of 81 cm². How long is its side?'),
            options: [say('9 cm eta −9 cm', '9 cm y −9 cm', '9 سم و−9 سم', '9 cm and −9 cm'), say('9 cm', '9 cm', '9 سم', '9 cm'), say('40,5 cm', '40,5 cm', '40.5 سم', '40.5 cm')],
            correctIndex: 1,
            explanation: say('$x^{2}=81$ ekuazioak $x=\\pm 9$ ematen du, baina luzera ezin da negatiboa izan: 9 cm.', '$x^{2}=81$ da $x=\\pm 9$, pero una longitud no puede ser negativa: 9 cm.', '$x^{2}=81$ تعطي $x=\\pm 9$، لكن الطول لا يكون سالبًا: 9 سم.', '$x^{2}=81$ gives $x=\\pm 9$, but a length cannot be negative: 9 cm.')
        }
    },
    'system-problems': {
        mistake: {
            wrong: say('$x+y=40$ eta $x+y=303$.', '$x+y=40$ y $x+y=303$.', '$x+y=40$ و$x+y=303$.', '$x+y=40$ and $x+y=303$.'),
            right: say('Bigarren ekuazioa dirua da: sarrera bakoitza bere prezioaz biderkatu, $9x+6y=303$.', 'La segunda ecuación es de dinero: cada entrada por su precio, $9x+6y=303$.', 'المعادلة الثانية للمال: كل تذكرة في سعرها، $9x+6y=303$.', 'The second equation is about money: each ticket times its price, $9x+6y=303$.')
        },
        check: {
            prompt: say('Gela batean 28 ikasle daude, eta mutilak baino 4 neska gehiago. Zenbat neska daude?', 'En una clase hay 28 alumnos, y hay 4 chicas más que chicos. ¿Cuántas chicas hay?', 'في صف 28 تلميذًا، وعدد البنات يزيد على عدد الأولاد بـ 4. كم بنتًا في الصف؟', 'A class has 28 students, with 4 more girls than boys. How many girls are there?'),
            options: [say('16 neska', '16 chicas', '16 بنتًا', '16 girls'), say('12 neska', '12 chicas', '12 بنتًا', '12 girls'), say('14 neska', '14 chicas', '14 بنتًا', '14 girls')],
            correctIndex: 0,
            explanation: say('$x+y=28$ eta $x-y=4$: batuta, $2x=32$, $x=16$ neska eta $y=12$ mutil.', '$x+y=28$ y $x-y=4$: sumando, $2x=32$, $x=16$ chicas e $y=12$ chicos.', '$x+y=28$ و$x-y=4$: بالجمع $2x=32$، ‏$x=16$ بنتًا و$y=12$ ولدًا.', '$x+y=28$ and $x-y=4$: adding, $2x=32$, $x=16$ girls and $y=12$ boys.')
        }
    }
}
