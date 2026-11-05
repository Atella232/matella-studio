import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   Answers to logarithmic, exponential and absolute value equations are
   written as bare numbers or in words: the test can only evaluate
   polynomials, fractions and roots.
   ========================================================================== */

export type BachEquationsTopicId =
    | 'ruffini-roots' | 'factorize-high' | 'algebraic-fractions'
    | 'high-degree' | 'change-variable' | 'rational-equations'
    | 'radical-equations' | 'absolute-equations'
    | 'exponential-equations' | 'exponential-change' | 'log-equations'
    | 'polynomial-inequalities' | 'rational-inequalities' | 'absolute-inequalities' | 'inequality-systems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachEquationsLessonChecks: Record<BachEquationsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Polynomials ---------- */
    'ruffini-roots': {
        mistake: {
            wrong: say('$x^3-x^2-4x+4$: hautagaiak $\\pm 1$ eta $\\pm 4$', '$x^3-x^2-4x+4$: candidatas $\\pm 1$ y $\\pm 4$', '$x^3-x^2-4x+4$: المرشحة $\\pm 1$ و$\\pm 4$', '$x^3-x^2-4x+4$: candidates $\\pm 1$ and $\\pm 4$'),
            right: say('4 zenbakiaren zatitzaileak $\\pm 1$, $\\pm 2$ eta $\\pm 4$ dira: $\\pm 2$ ere probatu behar da.', 'Los divisores de 4 son $\\pm 1$, $\\pm 2$ y $\\pm 4$: también hay que probar $\\pm 2$.', 'قواسم 4 هي $\\pm 1$ و$\\pm 2$ و$\\pm 4$: يجب تجربة $\\pm 2$ أيضًا.', 'The divisors of 4 are $\\pm 1$, $\\pm 2$ and $\\pm 4$: you must try $\\pm 2$ too.')
        },
        check: {
            prompt: say('Zein da $P(x)=x^3+x^2-4x-4$ polinomioaren erro bat?', '¿Cuál es una raíz de $P(x)=x^3+x^2-4x-4$?', 'ما أحد جذور $P(x)=x^3+x^2-4x-4$؟', 'Which is a root of $P(x)=x^3+x^2-4x-4$?'),
            options: [same('$4$'), same('$-1$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$(-1)^3+(-1)^2-4\\cdot(-1)-4=0$')
        }
    },
    'factorize-high': {
        mistake: {
            wrong: same('$x^4-16=(x^2-4)(x^2+4)$'),
            right: say('Oraindik jarrai daiteke: $x^2-4=(x-2)(x+2)$; $x^2+4$ ez da gehiago deskonposatzen.', 'Aún se puede seguir: $x^2-4=(x-2)(x+2)$; $x^2+4$ ya no se descompone.', 'يمكن المتابعة: $x^2-4=(x-2)(x+2)$، أما $x^2+4$ فلا يتحلل.', 'You can still go on: $x^2-4=(x-2)(x+2)$; $x^2+4$ does not break down any further.')
        },
        check: {
            prompt: say('Zein da $x^3-x^2-x+1$ polinomioaren faktorizazioa?', '¿Cuál es la factorización de $x^3-x^2-x+1$?', 'ما تحليل $x^3-x^2-x+1$؟', 'What is the factorisation of $x^3-x^2-x+1$?'),
            options: [same('$(x-1)^2(x+1)$'), same('$(x-1)(x^2+1)$'), same('$(x+1)^2(x-1)$')],
            correctIndex: 0,
            explanation: same('$x^2(x-1)-(x-1)=(x-1)(x^2-1)=(x-1)^2(x+1)$')
        }
    },
    'algebraic-fractions': {
        mistake: {
            wrong: same('$\\frac{x+6}{x+3}=\\frac{6}{3}=2$'),
            right: say('Faktoreak bakarrik ezaba daitezke: $x$ batugaia da, ez faktorea. $\\frac{x+6}{x+3}$ ez da sinplifikatzen.', 'Solo se tachan factores: $x$ es un sumando, no un factor. $\\frac{x+6}{x+3}$ no se simplifica.', 'لا يُحذف إلا العوامل: $x$ حد في مجموع لا عامل. لا يُبسّط $\\frac{x+6}{x+3}$.', 'Only factors cancel: $x$ is a term of a sum, not a factor. $\\frac{x+6}{x+3}$ does not simplify.')
        },
        check: {
            prompt: say('Sinplifikatu $\\frac{x^2-4x}{x^2-16}$.', 'Simplifica $\\frac{x^2-4x}{x^2-16}$.', 'بسّط $\\frac{x^2-4x}{x^2-16}$.', 'Simplify $\\frac{x^2-4x}{x^2-16}$.'),
            options: [same('$\\frac{x}{x+4}$'), same('$\\frac{-4x}{-16}$'), same('$\\frac{x}{x-4}$')],
            correctIndex: 0,
            explanation: same('$\\frac{x(x-4)}{(x-4)(x+4)}=\\frac{x}{x+4}$')
        }
    },

    /* ---------- 2. Polynomial and rational equations ---------- */
    'high-degree': {
        mistake: {
            wrong: same('$x^3=9x\\ \\to\\ x^2=9\\ \\to\\ x=\\pm 3$'),
            right: say('$x$ zenbakiaz zatitzean $x=0$ galtzen da: $x(x^2-9)=0$ ekuazioak $x=0$, $x=3$ eta $x=-3$ ematen ditu.', 'Al dividir entre $x$ se pierde $x=0$: $x(x^2-9)=0$ da $x=0$, $x=3$ y $x=-3$.', 'عند القسمة على $x$ يضيع الحل $x=0$: تعطي $x(x^2-9)=0$ الحلول $x=0$ و$x=3$ و$x=-3$.', 'Dividing by $x$ loses $x=0$: $x(x^2-9)=0$ gives $x=0$, $x=3$ and $x=-3$.')
        },
        check: {
            prompt: say('Ebatzi $x^3-x^2-6x=0$.', 'Resuelve $x^3-x^2-6x=0$.', 'حُلّ $x^3-x^2-6x=0$.', 'Solve $x^3-x^2-6x=0$.'),
            options: [same('$x=3,\\ x=-2$'), same('$x=0,\\ x=3,\\ x=-2$'), same('$x=0,\\ x=-3,\\ x=2$')],
            correctIndex: 1,
            explanation: same('$x(x-3)(x+2)=0$')
        }
    },
    'change-variable': {
        mistake: {
            wrong: say('$t=x^2$ eta $t=-9$: $x=\\pm 3$', '$t=x^2$ y $t=-9$: $x=\\pm 3$', '$t=x^2$ و$t=-9$: $x=\\pm 3$', '$t=x^2$ and $t=-9$: $x=\\pm 3$'),
            right: say('$x^2=-9$ ekuazioak ez du soluziorik: $t$ negatiboa baztertu egiten da.', '$x^2=-9$ no tiene solución: un $t$ negativo se descarta.', 'ليس للمعادلة $x^2=-9$ حل: يُستبعد $t$ السالب.', '$x^2=-9$ has no solution: a negative $t$ is thrown out.')
        },
        check: {
            prompt: say('Ebatzi $x^4+3x^2-4=0$.', 'Resuelve $x^4+3x^2-4=0$.', 'حُلّ $x^4+3x^2-4=0$.', 'Solve $x^4+3x^2-4=0$.'),
            options: [same('$x=\\pm 1$'), same('$x=\\pm 1,\\ x=\\pm 2$'), same('$x=1$')],
            correctIndex: 0,
            explanation: same('$t^2+3t-4=0\\ \\to\\ t=1,\\ t=-4\\ \\to\\ x=\\pm 1$')
        }
    },
    'rational-equations': {
        mistake: {
            wrong: same('$\\frac{x^2}{x-3}=\\frac{9}{x-3}\\ \\to\\ x=\\pm 3$'),
            right: say('$x=3$ zenbakiak izendatzailea anulatzen du: $x=-3$ bakarrik da soluzioa.', '$x=3$ anula el denominador: solo vale $x=-3$.', '$x=3$ يعدم المقام: الحل الوحيد $x=-3$.', '$x=3$ makes the denominator zero: only $x=-3$ works.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{x-1}=\\frac{1}{x-1}+2$.', 'Resuelve $\\frac{x}{x-1}=\\frac{1}{x-1}+2$.', 'حُلّ $\\frac{x}{x-1}=\\frac{1}{x-1}+2$.', 'Solve $\\frac{x}{x-1}=\\frac{1}{x-1}+2$.'),
            options: [same('$x=1$'), say('Ez du soluziorik', 'No tiene solución', 'ليس لها حل', 'It has no solution'), same('$x=2$')],
            correctIndex: 1,
            explanation: say('$x=2x-1$ ekuaziotik $x=1$ ateratzen da, baina $x=1$ zenbakiak izendatzailea anulatzen du.', 'De $x=2x-1$ sale $x=1$, pero $x=1$ anula el denominador.', 'من $x=2x-1$ نحصل على $x=1$، لكن $x=1$ يعدم المقام.', 'From $x=2x-1$ you get $x=1$, but $x=1$ makes the denominator zero.')
        }
    },

    /* ---------- 3. Radicals and absolute value ---------- */
    'radical-equations': {
        mistake: {
            wrong: same('$\\sqrt{x}+1=3\\ \\to\\ x+1=9$'),
            right: say('Lehenik isolatu erroa: $\\sqrt{x}=2$, $x=4$. Isolatu gabe karratura jasotzean, $(\\sqrt{x}+1)^2=x+2\\sqrt{x}+1$.', 'Primero aísla el radical: $\\sqrt{x}=2$, $x=4$. Al elevar sin aislar, $(\\sqrt{x}+1)^2=x+2\\sqrt{x}+1$.', 'اعزل الجذر أولًا: $\\sqrt{x}=2$، $x=4$. وعند التربيع دون عزل $(\\sqrt{x}+1)^2=x+2\\sqrt{x}+1$.', 'Isolate the radical first: $\\sqrt{x}=2$, $x=4$. Squaring without isolating, $(\\sqrt{x}+1)^2=x+2\\sqrt{x}+1$.')
        },
        check: {
            prompt: say('Ebatzi $\\sqrt{x+7}=x+1$.', 'Resuelve $\\sqrt{x+7}=x+1$.', 'حُلّ $\\sqrt{x+7}=x+1$.', 'Solve $\\sqrt{x+7}=x+1$.'),
            options: [same('$x=2,\\ x=-3$'), same('$x=2$'), same('$x=-3$')],
            correctIndex: 1,
            explanation: say('$x^2+x-6=0$ ekuazioak 2 eta $-3$ ematen ditu; $\\sqrt{4}\\neq -2$, beraz $-3$ baztertzen da.', 'Sale $x^2+x-6=0$, con 2 y $-3$; como $\\sqrt{4}\\neq -2$, el $-3$ se descarta.', 'نحصل على $x^2+x-6=0$ وحلّاها 2 و$-3$؛ وبما أن $\\sqrt{4}\\neq -2$ يُستبعد $-3$.', 'You get $x^2+x-6=0$, with 2 and $-3$; since $\\sqrt{4}\\neq -2$, the $-3$ is thrown out.')
        }
    },
    'absolute-equations': {
        mistake: {
            wrong: same('$|x-4|=3\\ \\to\\ x=7$'),
            right: say('Bi kasu daude: $x-4=3$ eta $x-4=-3$; $x=1$ ere soluzioa da.', 'Hay dos casos: $x-4=3$ y $x-4=-3$; también vale $x=1$.', 'هناك حالتان: $x-4=3$ و$x-4=-3$؛ و$x=1$ حل أيضًا.', 'There are two cases: $x-4=3$ and $x-4=-3$; $x=1$ works too.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $|3x+1|=-2$ ekuazioak?', '¿Cuántas soluciones tiene $|3x+1|=-2$?', 'كم حلًّا للمعادلة $|3x+1|=-2$؟', 'How many solutions does $|3x+1|=-2$ have?'),
            options: [say('Bi', 'Dos', 'حلّان', 'Two'), say('Bat', 'Una', 'حل واحد', 'One'), say('Bat ere ez', 'Ninguna', 'ولا حل', 'None')],
            correctIndex: 2,
            explanation: say('Balio absolutua ez da inoiz negatiboa: $|3x+1|\\ge 0>-2$.', 'Un valor absoluto nunca es negativo: $|3x+1|\\ge 0>-2$.', 'القيمة المطلقة ليست سالبة أبدًا: $|3x+1|\\ge 0>-2$.', 'An absolute value is never negative: $|3x+1|\\ge 0>-2$.')
        }
    },

    /* ---------- 4. Exponential and logarithmic equations ---------- */
    'exponential-equations': {
        mistake: {
            wrong: same('$3^x=7\\ \\to\\ x=\\frac{7}{3}$'),
            right: say('Berretzailea ez da zatituz askatzen: $x=\\frac{\\log 7}{\\log 3}\\approx 1{,}77$.', 'El exponente no se despeja dividiendo: $x=\\frac{\\log 7}{\\log 3}\\approx 1{,}77$.', 'لا يُعزل الأس بالقسمة: $x=\\frac{\\log 7}{\\log 3}\\approx 1{,}77$.', 'You do not free the exponent by dividing: $x=\\frac{\\log 7}{\\log 3}\\approx 1{,}77$.')
        },
        check: {
            prompt: say('Ebatzi $8^x=16$.', 'Resuelve $8^x=16$.', 'حُلّ $8^x=16$.', 'Solve $8^x=16$.'),
            options: [same('$2$'), same('$\\frac{4}{3}$'), same('$\\frac{3}{4}$')],
            correctIndex: 1,
            explanation: same('$2^{3x}=2^4\\ \\to\\ 3x=4$')
        }
    },
    'exponential-change': {
        mistake: {
            wrong: same('$t=2^x,\\ t=-4\\ \\to\\ x=-2$'),
            right: say('$2^x=-4$ ekuazioak ez du soluziorik: beti $2^x>0$.', '$2^x=-4$ no tiene solución: siempre $2^x>0$.', 'ليس للمعادلة $2^x=-4$ حل: دائمًا $2^x>0$.', '$2^x=-4$ has no solution: always $2^x>0$.')
        },
        check: {
            prompt: say('Ebatzi $4^x-5\\cdot 2^x+4=0$.', 'Resuelve $4^x-5\\cdot 2^x+4=0$.', 'حُلّ $4^x-5\\cdot 2^x+4=0$.', 'Solve $4^x-5\\cdot 2^x+4=0$.'),
            options: [say('$x=1$ eta $x=4$', '$x=1$ y $x=4$', '$x=1$ و$x=4$', '$x=1$ and $x=4$'), say('$x=0$ eta $x=2$', '$x=0$ y $x=2$', '$x=0$ و$x=2$', '$x=0$ and $x=2$'), same('$x=2$')],
            correctIndex: 1,
            explanation: same('$t^2-5t+4=0\\ \\to\\ t=1,\\ t=4$')
        }
    },
    'log-equations': {
        mistake: {
            wrong: same('$\\log x-\\log 2=\\log(x-2)$'),
            right: say('Logaritmoen kendura zatiduraren logaritmoa da: $\\log x-\\log 2=\\log\\frac{x}{2}$.', 'La resta de logaritmos es el logaritmo del cociente: $\\log x-\\log 2=\\log\\frac{x}{2}$.', 'فرق اللوغاريتمين هو لوغاريتم خارج القسمة: $\\log x-\\log 2=\\log\\frac{x}{2}$.', 'A difference of logarithms is the logarithm of the quotient: $\\log x-\\log 2=\\log\\frac{x}{2}$.')
        },
        check: {
            prompt: say('Ebatzi $\\log(x+1)+\\log(x-1)=\\log 3$.', 'Resuelve $\\log(x+1)+\\log(x-1)=\\log 3$.', 'حُلّ $\\log(x+1)+\\log(x-1)=\\log 3$.', 'Solve $\\log(x+1)+\\log(x-1)=\\log 3$.'),
            options: [same('$\\pm 2$'), same('$2$'), same('$-2$')],
            correctIndex: 1,
            explanation: say('$x^2-1=3$ ekuazioak $\\pm 2$ ematen du, baina $\\log(-1)$ ez dago: $-2$ baztertzen da.', 'Sale $x^2-1=3$, con $\\pm 2$, pero $\\log(-1)$ no existe: el $-2$ se descarta.', 'نحصل على $x^2-1=3$ وحلّاها $\\pm 2$، لكن $\\log(-1)$ غير موجود: يُستبعد $-2$.', 'You get $x^2-1=3$, with $\\pm 2$, but $\\log(-1)$ does not exist: the $-2$ is thrown out.')
        }
    },

    /* ---------- 5. Inequalities ---------- */
    'polynomial-inequalities': {
        mistake: {
            wrong: same('$x^2>3x\\ \\to\\ x>3$'),
            right: say('Zeinua ezagutzen ez den $x$ zenbakiaz zatitzean soluzioak galtzen dira: $x(x-3)>0$, beraz $(-\\infty,0)\\cup(3,+\\infty)$.', 'Al dividir entre $x$, cuyo signo no se sabe, se pierden soluciones: $x(x-3)>0$ da $(-\\infty,0)\\cup(3,+\\infty)$.', 'عند القسمة على $x$ المجهول الإشارة تضيع حلول: $x(x-3)>0$ تعطي $(-\\infty,0)\\cup(3,+\\infty)$.', 'Dividing by $x$, whose sign is unknown, loses solutions: $x(x-3)>0$ gives $(-\\infty,0)\\cup(3,+\\infty)$.')
        },
        check: {
            prompt: say('Ebatzi $(x+1)(x-4)<0$.', 'Resuelve $(x+1)(x-4)<0$.', 'حُلّ $(x+1)(x-4)<0$.', 'Solve $(x+1)(x-4)<0$.'),
            options: [same('$(-1,4)$'), same('$(-\\infty,-1)\\cup(4,+\\infty)$'), same('$[-1,4]$')],
            correctIndex: 0,
            explanation: say('Bi faktoreek zeinu desberdina dute $-1$ eta 4 artean, eta muturrak ez dira sartzen.', 'Los dos factores tienen distinto signo entre $-1$ y 4, y los extremos no entran.', 'للعاملين إشارتان مختلفتان بين $-1$ و4، والطرفان لا يدخلان.', 'The two factors have different signs between $-1$ and 4, and the endpoints are not included.')
        }
    },
    'rational-inequalities': {
        mistake: {
            wrong: same('$\\frac{2}{x-1}>1\\ \\to\\ 2>x-1$'),
            right: say('$x-1$ positiboa bada bakarrik biderka daiteke. Eraman dena alde batera: $\\frac{3-x}{x-1}>0$, soluzioa $(1,3)$.', 'Multiplicar por $x-1$ solo vale si es positivo. Pasa todo a un lado: $\\frac{3-x}{x-1}>0$, solución $(1,3)$.', 'لا يصح الضرب في $x-1$ إلا إذا كان موجبًا. انقل كل شيء إلى طرف: $\\frac{3-x}{x-1}>0$، والحل $(1,3)$.', 'Multiplying by $x-1$ only works if it is positive. Move everything to one side: $\\frac{3-x}{x-1}>0$, solution $(1,3)$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{x-2}\\le 0$.', 'Resuelve $\\frac{x}{x-2}\\le 0$.', 'حُلّ $\\frac{x}{x-2}\\le 0$.', 'Solve $\\frac{x}{x-2}\\le 0$.'),
            options: [same('$[0,2]$'), same('$[0,2)$'), same('$(0,2)$')],
            correctIndex: 1,
            explanation: say('0 sartzen da (zenbakitzailea 0 da), baina 2 ez: izendatzailea anulatzen du.', 'El 0 entra (el numerador vale 0), pero el 2 no: anula el denominador.', 'يدخل 0 (البسط يساوي 0)، أما 2 فلا: إنه يعدم المقام.', '0 is included (the numerator is 0), but 2 is not: it makes the denominator zero.')
        }
    },
    'absolute-inequalities': {
        mistake: {
            wrong: same('$|x-2|<3\\ \\to\\ x<5$'),
            right: say('Ezkerrekoak falta dira: $-3<x-2<3$, hau da, $(-1,5)$.', 'Faltan los de la izquierda: $-3<x-2<3$, es decir, $(-1,5)$.', 'تنقص القيم من اليسار: $-3<x-2<3$، أي $(-1,5)$.', 'The ones on the left are missing: $-3<x-2<3$, that is, $(-1,5)$.')
        },
        check: {
            prompt: say('Ebatzi $|x-1|>4$.', 'Resuelve $|x-1|>4$.', 'حُلّ $|x-1|>4$.', 'Solve $|x-1|>4$.'),
            options: [same('$(-3,5)$'), same('$(5,+\\infty)$'), same('$(-\\infty,-3)\\cup(5,+\\infty)$')],
            correctIndex: 2,
            explanation: say('$x-1<-4$ edo $x-1>4$: bi zuzenerdi.', '$x-1<-4$ o $x-1>4$: dos semirrectas.', '$x-1<-4$ أو $x-1>4$: نصفا مستقيم.', '$x-1<-4$ or $x-1>4$: two half-lines.')
        }
    },
    'inequality-systems': {
        mistake: {
            wrong: say('$x>1$ eta $x<4$: edozein zenbaki', '$x>1$ y $x<4$: cualquier número', '$x>1$ و$x<4$: أي عدد', '$x>1$ and $x<4$: any number'),
            right: say('Biak batera betetzea ebakidura da: $(1,4)$.', 'Las dos a la vez es la intersección: $(1,4)$.', 'تحقق الاثنتين معًا هو التقاطع: $(1,4)$.', 'Both at once is the intersection: $(1,4)$.')
        },
        check: {
            prompt: say('Ebatzi $2x+1>3$ eta $x-5\\le 0$ inekuazioek osatzen duten sistema.', 'Resuelve el sistema formado por $2x+1>3$ y $x-5\\le 0$.', 'حُلّ النظام المكوّن من $2x+1>3$ و$x-5\\le 0$.', 'Solve the system made of $2x+1>3$ and $x-5\\le 0$.'),
            options: [same('$(1,5]$'), same('$[1,5)$'), same('$(1,+\\infty)$')],
            correctIndex: 0,
            explanation: same('$x>1\\qquad x\\le 5$')
        }
    }
}
