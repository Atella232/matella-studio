import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — the typical
   mistake and the «Check it» question of every lesson. One wrong answer of
   each question is the lesson's typical mistake: f'(x) left as the slope,
   the line's intercept copied, f' = 0 taken as an extremum, the sign of f
   read instead of the sign of f', the interval of the model forgotten, the
   ends of the interval left out, f'' read the wrong way round, the graph
   of f' read as the graph of f, the profit without the costs, the total
   cost minimised instead of the average one.
   ========================================================================== */

export type Bach2gApplicationsTopicId =
    | 'tangent-line' | 'parallel-tangent' | 'inflection-tangent'
    | 'sign' | 'intervals' | 'growth-context'
    | 'relative' | 'absolute' | 'parameters'
    | 'second-sign' | 'inflection' | 'read-graph'
    | 'max-profit' | 'min-average' | 'max-income'

export const bach2gApplicationsLessonChecks: Record<Bach2gApplicationsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'tangent-line': {
        mistake: {
            wrong: say('$f(x)=x^2$ kurbaren zuzen ukitzailea $x=3$ puntuan $y-9=2x(x-3)$ da.', 'La tangente a $f(x)=x^2$ en $x=3$ es $y-9=2x(x-3)$.', 'مماس $f(x)=x^2$ عند $x=3$ هو $y-9=2x(x-3)$.', 'The tangent to $f(x)=x^2$ at $x=3$ is $y-9=2x(x-3)$.'),
            right: say('Malda zenbaki bat da, $f\'(3)=6$: $y-9=6(x-3)$, hau da, $y=6x-9$.', 'La pendiente es un número, $f\'(3)=6$: $y-9=6(x-3)$, es decir, $y=6x-9$.', 'الميل عدد $f\'(3)=6$: ‏$y-9=6(x-3)$ أي $y=6x-9$.', 'The slope is a number, $f\'(3)=6$: $y-9=6(x-3)$, that is, $y=6x-9$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^3$ kurbaren zuzen ukitzailea $x=1$ puntuan?', '¿Cuál es la tangente a $f(x)=x^3$ en $x=1$?', 'ما مماس $f(x)=x^3$ عند $x=1$؟', 'What is the tangent to $f(x)=x^3$ at $x=1$?'),
            options: [same('$y=3x-2$'), same('$y=3x+1$'), same('$y=x$')],
            correctIndex: 0,
            explanation: same("$f(1)=1\\qquad f'(1)=3\\qquad y-1=3(x-1)$")
        }
    },
    'parallel-tangent': {
        mistake: {
            wrong: say('$y=4x+7$ zuzenaren paraleloa izateko, $f\'(x)=7$ ebatzi behar da.', 'Para ser paralela a $y=4x+7$, hay que resolver $f\'(x)=7$.', 'ليكون موازيًا لـ $y=4x+7$ يجب حل $f\'(x)=7$.', 'To be parallel to $y=4x+7$, you must solve $f\'(x)=7$.'),
            right: say('Malda $x$ aldagaiaren koefizientea da, 4: $f\'(x)=4$ ebazten da.', 'La pendiente es el coeficiente de $x$, 4: se resuelve $f\'(x)=4$.', 'الميل هو معامل $x$ أي 4: نحل $f\'(x)=4$.', 'The slope is the coefficient of $x$, 4: solve $f\'(x)=4$.')
        },
        check: {
            prompt: say('Zein puntutan da $f(x)=x^2-2x$ kurbaren zuzen ukitzailea $y=2x$ zuzenaren paraleloa?', '¿En qué punto la tangente a $f(x)=x^2-2x$ es paralela a $y=2x$?', 'عند أي نقطة يكون مماس $f(x)=x^2-2x$ موازيًا للمستقيم $y=2x$؟', 'At which point is the tangent to $f(x)=x^2-2x$ parallel to $y=2x$?'),
            options: [same('$(0,0)$'), same('$(1,-1)$'), same('$(2,0)$')],
            correctIndex: 2,
            explanation: same("$f'(x)=2x-2=2\\ \\to\\ x=2\\qquad f(2)=0$")
        }
    },
    'inflection-tangent': {
        mistake: {
            wrong: say('Inflexio-puntua aurkitzeko $f\'(x)=0$ ebazten da.', 'Para hallar el punto de inflexión se resuelve $f\'(x)=0$.', 'لإيجاد نقطة الانعطاف نحل $f\'(x)=0$.', 'To find the point of inflection you solve $f\'(x)=0$.'),
            right: say('$f\'=0$ ekuazioak muturrak ematen ditu; inflexioa $f\'\'(x)=0$ ekuaziotik ateratzen da.', '$f\'=0$ da los extremos; la inflexión sale de $f\'\'(x)=0$.', '$f\'=0$ يعطي القيم القصوى؛ أما الانعطاف فيأتي من $f\'\'(x)=0$.', '$f\'=0$ gives the extrema; the inflection comes from $f\'\'(x)=0$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^3-3x^2$ funtzioaren zuzen ukitzailearen malda inflexio-puntuan?', '¿Qué pendiente tiene la tangente a $f(x)=x^3-3x^2$ en su punto de inflexión?', 'ما ميل مماس $f(x)=x^3-3x^2$ عند نقطة انعطافها؟', 'What slope does the tangent to $f(x)=x^3-3x^2$ have at its point of inflection?'),
            options: [same('$0$'), same('$-3$'), same('$-2$')],
            correctIndex: 1,
            explanation: same("$f''(x)=6x-6=0\\ \\to\\ x=1\\qquad f'(1)=3-6=-3$")
        }
    },
    sign: {
        mistake: {
            wrong: say('$f(x)=x^2-4$ beherakorra da $x=1$ puntuan, $f(1)=-3<0$ delako.', '$f(x)=x^2-4$ decrece en $x=1$ porque $f(1)=-3<0$.', '$f(x)=x^2-4$ متناقصة عند $x=1$ لأن $f(1)=-3<0$.', '$f(x)=x^2-4$ decreases at $x=1$ because $f(1)=-3<0$.'),
            right: say('Begiratu behar dena $f\'$ deribatuaren zeinua da: $f\'(1)=2>0$, gorakorra.', 'Hay que mirar el signo de $f\'$: $f\'(1)=2>0$, crece.', 'يجب النظر إلى إشارة $f\'$: ‏$f\'(1)=2>0$ فهي متزايدة.', 'What matters is the sign of $f\'$: $f\'(1)=2>0$, it increases.')
        },
        check: {
            prompt: say('Nolakoa da $f(x)=x^3-12x$ funtzioa $x=1$ puntuan?', '¿Cómo es $f(x)=x^3-12x$ en $x=1$?', 'كيف تكون $f(x)=x^3-12x$ عند $x=1$؟', 'How is $f(x)=x^3-12x$ at $x=1$?'),
            options: [say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'), say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing'), say('Ez bata ez bestea', 'Ni una cosa ni otra', 'لا هذا ولا ذاك', 'Neither')],
            correctIndex: 1,
            explanation: same("$f'(1)=3-12=-9<0$")
        }
    },
    intervals: {
        mistake: {
            wrong: say('$f\'(x)=3x^2-12$ bada, $f$ gorakorra da $x>2$ denean bakarrik.', 'Si $f\'(x)=3x^2-12$, $f$ crece solo cuando $x>2$.', 'إذا كانت $f\'(x)=3x^2-12$ فإن $f$ متزايدة فقط عندما $x>2$.', 'If $f\'(x)=3x^2-12$, $f$ increases only when $x>2$.'),
            right: say('$f\'=0$ da $x=-2$ eta $x=2$ puntuetan: gorakorra $(-\\infty,-2)$ eta $(2,+\\infty)$ tarteetan.', '$f\'=0$ en $x=-2$ y $x=2$: crece en $(-\\infty,-2)$ y en $(2,+\\infty)$.', '$f\'=0$ عند $x=-2$ و$x=2$: متزايدة في $(-\\infty,-2)$ وفي $(2,+\\infty)$.', '$f\'=0$ at $x=-2$ and $x=2$: it increases on $(-\\infty,-2)$ and on $(2,+\\infty)$.')
        },
        check: {
            prompt: say('Non da beherakorra $f(x)=x^3-3x^2$?', '¿Dónde decrece $f(x)=x^3-3x^2$?', 'أين تتناقص $f(x)=x^3-3x^2$؟', 'Where does $f(x)=x^3-3x^2$ decrease?'),
            options: [same('$0<x<2$'), same('$x<0$'), same('$x>2$')],
            correctIndex: 0,
            explanation: same("$f'(x)=3x(x-2)\\qquad f'(1)=-3<0$")
        }
    },
    'growth-context': {
        mistake: {
            wrong: say('$B(t)=t^2-10t$ bada ($0\\le t\\le 4$), irabaziak 5. urtetik aurrera hazten dira.', 'Si $B(t)=t^2-10t$ ($0\\le t\\le 4$), los beneficios crecen a partir del año 5.', 'إذا كانت $B(t)=t^2-10t$ ($0\\le t\\le 4$) فالأرباح تتزايد ابتداءً من السنة 5.', 'If $B(t)=t^2-10t$ ($0\\le t\\le 4$), profits grow from year 5 on.'),
            right: say('Eredua 4 urtera arte baino ez da: tarte osoan $B\'<0$, irabaziak beti jaisten dira.', 'El modelo solo llega al año 4: en todo el intervalo $B\'<0$, los beneficios siempre bajan.', 'النموذج يصل إلى السنة 4 فقط: في الفترة كلها $B\'<0$، فالأرباح تنخفض دائمًا.', 'The model only reaches year 4: on the whole interval $B\'<0$, profits always fall.')
        },
        check: {
            prompt: say('Salmentak $V(t)=-t^2+6t$ dira ($t$ hilabeteetan, $0\\le t\\le 6$). Noiz hazten dira?', 'Las ventas son $V(t)=-t^2+6t$ ($t$ en meses, $0\\le t\\le 6$). ¿Cuándo crecen?', 'المبيعات $V(t)=-t^2+6t$ ($t$ بالأشهر، $0\\le t\\le 6$). متى تتزايد؟', 'Sales are $V(t)=-t^2+6t$ ($t$ in months, $0\\le t\\le 6$). When do they grow?'),
            options: [say('3. hilabetetik 6. hilabetera', 'Del mes 3 al 6', 'من الشهر 3 إلى 6', 'From month 3 to 6'), say('Beti', 'Siempre', 'دائمًا', 'Always'), say('Lehen 3 hilabeteetan', 'Los 3 primeros meses', 'في الأشهر الثلاثة الأولى', 'The first 3 months')],
            correctIndex: 2,
            explanation: same("$V'(t)=-2t+6>0\\ \\to\\ t<3$")
        }
    },
    relative: {
        mistake: {
            wrong: say('$f(x)=x^3$ funtzioak minimoa du $x=0$ puntuan, $f\'(0)=0$ delako.', '$f(x)=x^3$ tiene un mínimo en $x=0$ porque $f\'(0)=0$.', '$f(x)=x^3$ لها قيمة صغرى عند $x=0$ لأن $f\'(0)=0$.', '$f(x)=x^3$ has a minimum at $x=0$ because $f\'(0)=0$.'),
            right: say('$f\'=3x^2$ ez da zeinuz aldatzen: funtzioa beti gorakorra da, ez dago muturrik.', '$f\'=3x^2$ no cambia de signo: la función siempre crece, no hay extremo.', '$f\'=3x^2$ لا تتغير إشارتها: الدالة متزايدة دائمًا، فلا قيمة قصوى.', '$f\'=3x^2$ does not change sign: the function always increases, there is no extremum.')
        },
        check: {
            prompt: say('Zer du $f(x)=x^3-3x$ funtzioak $x=1$ puntuan?', '¿Qué tiene $f(x)=x^3-3x$ en $x=1$?', 'ماذا لـ $f(x)=x^3-3x$ عند $x=1$؟', 'What does $f(x)=x^3-3x$ have at $x=1$?'),
            options: [say('Maximoa', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Minimoa', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Inflexioa', 'Una inflexión', 'انعطاف', 'An inflection')],
            correctIndex: 1,
            explanation: same("$f'(1)=0\\qquad f''(1)=6>0$")
        }
    },
    absolute: {
        mistake: {
            wrong: say('$f(x)=x^2$ funtzioaren maximo absolutua $[-1,3]$ tartean $f(0)=0$ da, hor $f\'=0$ delako.', 'El máximo absoluto de $f(x)=x^2$ en $[-1,3]$ es $f(0)=0$, porque ahí $f\'=0$.', 'القيمة العظمى المطلقة لـ $f(x)=x^2$ على $[-1,3]$ هي $f(0)=0$ لأن $f\'=0$ هناك.', 'The absolute maximum of $f(x)=x^2$ on $[-1,3]$ is $f(0)=0$, because $f\'=0$ there.'),
            right: say('Muturrak ere alderatu behar dira: $f(-1)=1$, $f(0)=0$, $f(3)=9$. Maximoa 9 da.', 'También hay que comparar los extremos: $f(-1)=1$, $f(0)=0$, $f(3)=9$. El máximo es 9.', 'يجب مقارنة الطرفين أيضًا: $f(-1)=1$ و$f(0)=0$ و$f(3)=9$. العظمى 9.', 'The ends must be compared too: $f(-1)=1$, $f(0)=0$, $f(3)=9$. The maximum is 9.')
        },
        check: {
            prompt: say('Zein da $f(x)=6x-x^2$ funtzioaren maximo absolutua $[0,2]$ tartean?', '¿Cuál es el máximo absoluto de $f(x)=6x-x^2$ en $[0,2]$?', 'ما القيمة العظمى المطلقة لـ $f(x)=6x-x^2$ على $[0,2]$؟', 'What is the absolute maximum of $f(x)=6x-x^2$ on $[0,2]$?'),
            options: [same('$9$'), same('$8$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$x=3$ ez dago tartean: $f(0)=0$ eta $f(2)=8$.', '$x=3$ no está en el intervalo: $f(0)=0$ y $f(2)=8$.', '$x=3$ ليست في الفترة: $f(0)=0$ و$f(2)=8$.', '$x=3$ is not in the interval: $f(0)=0$ and $f(2)=8$.')
        }
    },
    parameters: {
        mistake: {
            wrong: say('«Minimoa $(2,5)$ puntuan» baldintzak ekuazio bakarra ematen du: $f\'(2)=0$.', '«Mínimo en $(2,5)$» da una sola ecuación: $f\'(2)=0$.', '«قيمة صغرى عند $(2,5)$» تعطي معادلة واحدة: $f\'(2)=0$.', '«Minimum at $(2,5)$» gives one equation only: $f\'(2)=0$.'),
            right: say('Bi ematen ditu: $f\'(2)=0$ eta, puntutik igarotzen delako, $f(2)=5$.', 'Da dos: $f\'(2)=0$ y, como pasa por el punto, $f(2)=5$.', 'تعطي اثنتين: $f\'(2)=0$، ولأنه يمر بالنقطة $f(2)=5$.', 'It gives two: $f\'(2)=0$ and, as it passes through the point, $f(2)=5$.')
        },
        check: {
            prompt: say('$f(x)=x^2+ax$ funtzioak minimoa du $x=4$ puntuan. Zenbat da $a$?', '$f(x)=x^2+ax$ tiene un mínimo en $x=4$. ¿Cuánto vale $a$?', 'للدالة $f(x)=x^2+ax$ قيمة صغرى عند $x=4$. كم تساوي $a$؟', '$f(x)=x^2+ax$ has a minimum at $x=4$. What is $a$?'),
            options: [same('$4$'), same('$-4$'), same('$-8$')],
            correctIndex: 2,
            explanation: same("$f'(4)=8+a=0\\ \\to\\ a=-8$")
        }
    },
    'second-sign': {
        mistake: {
            wrong: say('$f\'\'(x)>0$ bada, kurba ∩ itxurakoa da.', 'Si $f\'\'(x)>0$, la curva tiene forma de ∩.', 'إذا كانت $f\'\'(x)>0$ فللمنحنى شكل ∩.', 'If $f\'\'(x)>0$, the curve is shaped like ∩.'),
            right: say('Alderantziz: $f\'\'>0$ denean maldak handitzen dira eta kurba ∪ itxurakoa da.', 'Al revés: con $f\'\'>0$ las pendientes aumentan y la curva tiene forma de ∪.', 'العكس: مع $f\'\'>0$ تزداد الميول ويأخذ المنحنى شكل ∪.', 'The other way round: with $f\'\'>0$ the slopes increase and the curve is shaped like ∪.')
        },
        check: {
            prompt: say('Nolakoa da $f(x)=x^3-6x^2$ funtzioa $x=0$ puntuan?', '¿Cómo es $f(x)=x^3-6x^2$ en $x=0$?', 'كيف تكون $f(x)=x^3-6x^2$ عند $x=0$؟', 'How is $f(x)=x^3-6x^2$ at $x=0$?'),
            options: [say('Ahurra (∪)', 'Cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'Concave up (∪)'), say('Ganbila (∩)', 'Convexa (∩)', 'مقعّرة نحو الأسفل (∩)', 'Concave down (∩)'), say('Inflexioa du', 'Tiene una inflexión', 'لها انعطاف', 'It has an inflection')],
            correctIndex: 1,
            explanation: same("$f''(x)=6x-12\\qquad f''(0)=-12<0$")
        }
    },
    inflection: {
        mistake: {
            wrong: say('$V(t)=-t^3+9t^2$ salmentak azkarren hazten dira $t=6$ unean, $V\'(6)=0$ delako.', 'Las ventas $V(t)=-t^3+9t^2$ crecen más deprisa en $t=6$, porque $V\'(6)=0$.', 'المبيعات $V(t)=-t^3+9t^2$ تنمو بأسرع ما يمكن عند $t=6$ لأن $V\'(6)=0$.', 'Sales $V(t)=-t^3+9t^2$ grow fastest at $t=6$, because $V\'(6)=0$.'),
            right: say('$t=6$ unean salmentak gelditu egiten dira. Erritmo handiena inflexioan da: $V\'\'=0$, $t=3$.', 'En $t=6$ las ventas se paran. El mayor ritmo está en la inflexión: $V\'\'=0$, $t=3$.', 'عند $t=6$ تتوقف المبيعات. وأكبر وتيرة عند الانعطاف: $V\'\'=0$، ‏$t=3$.', 'At $t=6$ sales stop growing. The highest pace is at the inflection: $V\'\'=0$, $t=3$.')
        },
        check: {
            prompt: say('Non du $f(x)=x^3-9x^2$ funtzioak inflexio-puntua? Ebatzi $f\'\'(x)=0$.', '¿Dónde tiene $f(x)=x^3-9x^2$ su punto de inflexión? Resuelve $f\'\'(x)=0$.', 'أين نقطة انعطاف $f(x)=x^3-9x^2$؟ حلّ $f\'\'(x)=0$.', 'Where does $f(x)=x^3-9x^2$ have its point of inflection? Solve $f\'\'(x)=0$.'),
            options: [same('$x=6$'), same('$x=0$'), same('$x=3$')],
            correctIndex: 2,
            explanation: same("$f''(x)=6x-18=0\\ \\to\\ x=3$")
        }
    },
    'read-graph': {
        mistake: {
            wrong: say('$f\'$ funtzioaren grafikoa jaisten ari bada, $f$ beherakorra da.', 'Si la gráfica de $f\'$ está bajando, $f$ es decreciente.', 'إذا كان تمثيل $f\'$ ينزل فإن $f$ متناقصة.', 'If the graph of $f\'$ is going down, $f$ is decreasing.'),
            right: say('Begiratu behar dena $f\'$ ardatzaren gainean ala azpian dagoen da. Jaisten ari bada, $f$ ganbila (∩) da.', 'Lo que hay que mirar es si $f\'$ está por encima o por debajo del eje. Si baja, $f$ es convexa (∩).', 'المهم هل $f\'$ فوق المحور أم تحته. وإذا كانت تنزل فإن $f$ مقعّرة نحو الأسفل (∩).', 'What matters is whether $f\'$ is above or below the axis. If it is going down, $f$ is concave down (∩).')
        },
        check: {
            prompt: say('$f\'$ ardatzaren azpian dago $(1,4)$ tartean eta gainean $x>4$ denean. Zer du $f$ funtzioak $x=4$ puntuan?', '$f\'$ está por debajo del eje en $(1,4)$ y por encima cuando $x>4$. ¿Qué tiene $f$ en $x=4$?', '$f\'$ تحت المحور في $(1,4)$ وفوقه عندما $x>4$. ماذا لـ $f$ عند $x=4$؟', '$f\'$ is below the axis on $(1,4)$ and above it when $x>4$. What does $f$ have at $x=4$?'),
            options: [say('Minimoa', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Maximoa', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Inflexioa', 'Una inflexión', 'انعطاف', 'An inflection')],
            correctIndex: 0,
            explanation: say('$f$ jaisten zen eta orain hazten da: minimoa.', '$f$ bajaba y ahora sube: mínimo.', 'كانت $f$ تنزل وهي الآن تصعد: صغرى.', '$f$ was falling and now rises: a minimum.')
        }
    },
    'max-profit': {
        mistake: {
            wrong: say('Prezioa 40 euro bada eta $C(x)=x^2+100$, irabazia $40x$ da eta beti hazten da.', 'Si el precio es 40 € y $C(x)=x^2+100$, el beneficio es $40x$ y siempre crece.', 'إذا كان السعر 40 € و$C(x)=x^2+100$ فالربح $40x$ ويتزايد دائمًا.', 'If the price is €40 and $C(x)=x^2+100$, the profit is $40x$ and it always grows.'),
            right: say('$40x$ diru-sarrerak dira; kostuak kendu behar dira: $B(x)=40x-x^2-100$, maximoa $x=20$ denean.', '$40x$ son los ingresos; hay que restar los costes: $B(x)=40x-x^2-100$, máximo en $x=20$.', '$40x$ هو الإيراد؛ يجب طرح التكاليف: $B(x)=40x-x^2-100$، والعظمى عند $x=20$.', '$40x$ is the income; the costs must be subtracted: $B(x)=40x-x^2-100$, highest at $x=20$.')
        },
        check: {
            prompt: say('$B(x)=-x^2+60x-500$ bada, zein da irabazi handiena?', 'Si $B(x)=-x^2+60x-500$, ¿cuál es el mayor beneficio?', 'إذا كانت $B(x)=-x^2+60x-500$ فما أكبر ربح؟', 'If $B(x)=-x^2+60x-500$, what is the highest profit?'),
            options: [same('$30$'), same('$400$'), same('$900$')],
            correctIndex: 1,
            explanation: same("$B'(x)=-2x+60=0\\ \\to\\ x=30\\qquad B(30)=400$")
        }
    },
    'min-average': {
        mistake: {
            wrong: say('$C(x)=x^2+4x+100$ bada, kostua minimoa da $C\'(x)=0$ denean, $x=-2$.', 'Si $C(x)=x^2+4x+100$, el coste es mínimo cuando $C\'(x)=0$, $x=-2$.', 'إذا كانت $C(x)=x^2+4x+100$ فالتكلفة أصغرية عندما $C\'(x)=0$، ‏$x=-2$.', 'If $C(x)=x^2+4x+100$, the cost is lowest when $C\'(x)=0$, $x=-2$.'),
            right: say('Batez bestekoa minimizatu behar da: $M(x)=x+4+\\frac{100}{x}$, $M\'=0$ denean $x=10$.', 'Hay que minimizar la media: $M(x)=x+4+\\frac{100}{x}$, con $M\'=0$ en $x=10$.', 'يجب تصغير المتوسط: $M(x)=x+4+\\frac{100}{x}$، و$M\'=0$ عند $x=10$.', 'It is the average that must be minimised: $M(x)=x+4+\\frac{100}{x}$, with $M\'=0$ at $x=10$.')
        },
        check: {
            prompt: say('$C(x)=x^2+900$ bada, zenbat unitaterekin da batez besteko kostua minimoa?', 'Si $C(x)=x^2+900$, ¿con cuántas unidades es mínimo el coste medio?', 'إذا كانت $C(x)=x^2+900$ فبكم وحدة يكون متوسط التكلفة أصغريًا؟', 'If $C(x)=x^2+900$, with how many units is the average cost lowest?'),
            options: [same('$30$'), same('$0$'), same('$60$')],
            correctIndex: 0,
            explanation: same("$M(x)=x+\\frac{900}{x}\\qquad M'(x)=1-\\frac{900}{x^2}=0\\ \\to\\ x=30$")
        }
    },
    'max-income': {
        mistake: {
            wrong: say('Sarrera bat 10 euro da eta 400 pertsona etortzen dira; euro bakoitzeko igoerak 20 pertsona galtzen ditu. Diru-sarrerak $10x\\cdot 400$ dira.', 'Una entrada cuesta 10 € y vienen 400 personas; cada euro de subida pierde 20 personas. Los ingresos son $10x\\cdot 400$.', 'التذكرة بـ 10 € ويحضر 400 شخص؛ وكل يورو زيادة يُفقد 20 شخصًا. الإيراد $10x\\cdot 400$.', 'A ticket costs €10 and 400 people come; each euro of rise loses 20 people. The income is $10x\\cdot 400$.'),
            right: say('Prezioa eta jendea biak aldatzen dira: $I(x)=(10+x)(400-20x)$.', 'Cambian el precio y la gente a la vez: $I(x)=(10+x)(400-20x)$.', 'يتغير السعر وعدد الناس معًا: $I(x)=(10+x)(400-20x)$.', 'The price and the people change together: $I(x)=(10+x)(400-20x)$.')
        },
        check: {
            prompt: say('$I(x)=(10+x)(400-20x)$ bada, zenbat euro igo behar da prezioa?', 'Si $I(x)=(10+x)(400-20x)$, ¿cuántos euros hay que subir el precio?', 'إذا كانت $I(x)=(10+x)(400-20x)$ فكم يورو يجب رفع السعر؟', 'If $I(x)=(10+x)(400-20x)$, by how many euros should the price rise?'),
            options: [same('$20$'), same('$5$'), same('$10$')],
            correctIndex: 1,
            explanation: same("$I'(x)=400-20x-200-20x=200-40x=0\\ \\to\\ x=5$")
        }
    }
}
