import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: the normal with
   slope −f′(a), (uv)′ = u′v′, equal slopes without continuity, a corner
   wherever the inside is 0, only the slopes for the parameters, the
   forgotten inner layer, the missing u′, the lost alternating sign,
   1/f′(b) for the inverse, y² derived as 2y, (xˣ)′ = x·xˣ⁻¹, the height
   taken for the slope, the slope at the exterior point and curves that
   only cross.
   ========================================================================== */

export type Bach2DerivativesTopicId =
    | 'review-tangent' | 'review-rules'
    | 'corners' | 'absolute' | 'parameters'
    | 'three-layers' | 'composite-table' | 'higher-order'
    | 'inverse' | 'implicit' | 'logarithmic'
    | 'coefficients' | 'exterior-point' | 'tangent-curves'

export const bach2DerivativesLessonChecks: Record<Bach2DerivativesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review of 1.º ---------- */
    'review-tangent': {
        mistake: {
            wrong: say('Normalaren malda $-f\'(a)$ da.', 'La normal tiene pendiente $-f\'(a)$.', 'ميل المستقيم العمودي $-f\'(a)$.', 'The normal has slope $-f\'(a)$.'),
            right: say('Normala perpendikularra da: haren malda $-\\frac{1}{f\'(a)}$ da. $f\'(a)=3$ bada, normalaren malda $-\\frac{1}{3}$ da, ez $-3$.', 'La normal es perpendicular: su pendiente es $-\\frac{1}{f\'(a)}$. Si $f\'(a)=3$, la normal tiene pendiente $-\\frac{1}{3}$, no $-3$.', 'العمودي متعامد مع المماس: ميله $-\\frac{1}{f\'(a)}$. إذا كان $f\'(a)=3$ فميل العمودي $-\\frac{1}{3}$ لا $-3$.', 'The normal is perpendicular: its slope is $-\\frac{1}{f\'(a)}$. If $f\'(a)=3$, the normal has slope $-\\frac{1}{3}$, not $-3$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^2$ funtzioaren normalaren malda $x=2$ puntuan?', '¿Cuál es la pendiente de la normal a $f(x)=x^2$ en $x=2$?', 'ما ميل العمودي على $f(x)=x^2$ عند $x=2$؟', 'What is the slope of the normal to $f(x)=x^2$ at $x=2$?'),
            options: [same('$-\\frac{1}{4}$'), same('$-4$'), same('$\\frac{1}{4}$')],
            correctIndex: 0,
            explanation: say('$f\'(2)=4$, eta normalaren malda $-\\frac{1}{4}$ da.', '$f\'(2)=4$, y la normal tiene pendiente $-\\frac{1}{4}$.', '$f\'(2)=4$، وميل العمودي $-\\frac{1}{4}$.', '$f\'(2)=4$, and the normal has slope $-\\frac{1}{4}$.')
        }
    },
    'review-rules': {
        mistake: {
            wrong: same('$(uv)\'=u\'\\cdot v\'$'),
            right: say('Faktore bakoitza txandaka deribatzen da: $(x\\,e^x)\'=e^x+x\\,e^x$, ez $1\\cdot e^x$.', 'Se deriva cada factor por turnos: $(x\\,e^x)\'=e^x+x\\,e^x$, no $1\\cdot e^x$.', 'يُشتق كل عامل بالتناوب: $(x\\,e^x)\'=e^x+x\\,e^x$ لا $1\\cdot e^x$.', 'Each factor is differentiated in turn: $(x\\,e^x)\'=e^x+x\\,e^x$, not $1\\cdot e^x$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x\\ln x$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=x\\ln x$?', 'ما مشتقة $f(x)=x\\ln x$؟', 'What is the derivative of $f(x)=x\\ln x$?'),
            options: [same('$\\frac{1}{x}$'), same('$\\ln x$'), same('$\\ln x+1$')],
            correctIndex: 2,
            explanation: say('Biderkadura: $1\\cdot\\ln x+x\\cdot\\frac{1}{x}=\\ln x+1$.', 'Producto: $1\\cdot\\ln x+x\\cdot\\frac{1}{x}=\\ln x+1$.', 'جداء: $1\\cdot\\ln x+x\\cdot\\frac{1}{x}=\\ln x+1$.', 'Product: $1\\cdot\\ln x+x\\cdot\\frac{1}{x}=\\ln x+1$.')
        }
    },

    /* ---------- 2. Differentiability ---------- */
    corners: {
        mistake: {
            wrong: say('Alboko deribatuak berdinak badira, funtzioa deribagarria da.', 'Si las derivadas laterales coinciden, la función es derivable.', 'إذا تساوت المشتقتان الجانبيتان فالدالة قابلة للاشتقاق.', 'If the one-sided derivatives are equal, the function is differentiable.'),
            right: say('Lehenik jarraitutasuna begiratu behar da. $x<0$ denean $x$ eta $x\\ge 0$ denean $x+1$ badira, bi maldak 1 dira, baina jauzi bat dago: ez da deribagarria 0 puntuan.', 'Antes hay que ver la continuidad. Con $x$ para $x<0$ y $x+1$ para $x\\ge 0$, las dos pendientes son 1, pero hay un salto: no es derivable en 0.', 'يجب النظر أولًا في الاتصال. مع $x$ حين $x<0$ و$x+1$ حين $x\\ge 0$ يكون الميلان 1، لكن توجد قفزة: الدالة غير قابلة للاشتقاق عند 0.', 'First look at continuity. With $x$ for $x<0$ and $x+1$ for $x\\ge 0$, both slopes are 1, but there is a jump: it is not differentiable at 0.')
        },
        check: {
            prompt: say('Deribagarria al da funtzio hau $x=1$ puntuan? $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+1 & x\\ge 1\\end{cases}$', '¿Es derivable en $x=1$ esta función? $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+1 & x\\ge 1\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=1$؟ $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+1 & x\\ge 1\\end{cases}$', 'Is this function differentiable at $x=1$? $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+1 & x\\ge 1\\end{cases}$'),
            options: [
                say('Bai: $f\'(1^-)=f\'(1^+)=2$', 'Sí: $f\'(1^-)=f\'(1^+)=2$', 'نعم: $f\'(1^-)=f\'(1^+)=2$', 'Yes: $f\'(1^-)=f\'(1^+)=2$'),
                say('Ez: ez da jarraitua 1 puntuan', 'No: no es continua en 1', 'لا: ليست متصلة عند 1', 'No: it is not continuous at 1'),
                say('Ez: punta bat du 1 puntuan', 'No: tiene un pico en 1', 'لا: فيها زاوية عند 1', 'No: it has a corner at 1')
            ],
            correctIndex: 1,
            explanation: say('Zatiek 3 eta 2 balio dute $x=1$ puntuan: jauzi bat dago. Jarraitua ez bada, ezin da deribagarria izan.', 'Los trozos valen 3 y 2 en $x=1$: hay un salto. Sin continuidad no puede ser derivable.', 'قيمتا الجزأين 3 و2 عند $x=1$: توجد قفزة. ودون اتصال لا يمكن أن تكون قابلة للاشتقاق.', 'The pieces are worth 3 and 2 at $x=1$: there is a jump. Without continuity it cannot be differentiable.')
        }
    },
    absolute: {
        mistake: {
            wrong: say('$|g(x)|$ funtzioak punta bat du beti $g$ zero den tokian.', '$|g(x)|$ tiene siempre un pico donde $g$ se anula.', 'للدالة $|g(x)|$ زاوية دائمًا حيث تنعدم $g$.', '$|g(x)|$ always has a corner where $g$ is 0.'),
            right: say('Han $g$ funtzioaren malda 0 ez bada bakarrik. $|x^3|$ funtzioak ez du puntarik 0 puntuan: bi alboko deribatuak 0 dira.', 'Solo si allí la pendiente de $g$ no es 0. $|x^3|$ no tiene pico en 0: las dos derivadas laterales valen 0.', 'فقط إذا لم يكن ميل $g$ هناك 0. فالدالة $|x^3|$ ليس لها زاوية عند 0: المشتقتان الجانبيتان تساويان 0.', 'Only if the slope of $g$ there is not 0. $|x^3|$ has no corner at 0: both one-sided derivatives are 0.')
        },
        check: {
            prompt: say('Zenbat puntutan ez da deribagarria $f(x)=|x^2-6x+9|$?', '¿En cuántos puntos no es derivable $f(x)=|x^2-6x+9|$?', 'في كم نقطة تكون $f(x)=|x^2-6x+9|$ غير قابلة للاشتقاق؟', 'At how many points is $f(x)=|x^2-6x+9|$ not differentiable?'),
            options: [same('$0$'), same('$1$'), same('$2$')],
            correctIndex: 0,
            explanation: say('$x^2-6x+9=(x-3)^2\\ge 0$: balio absolutuak ez du ezer aldatzen, eta $f$ deribagarria da $\\mathbb{R}$ osoan.', '$x^2-6x+9=(x-3)^2\\ge 0$: el valor absoluto no cambia nada y $f$ es derivable en todo $\\mathbb{R}$.', '$x^2-6x+9=(x-3)^2\\ge 0$: لا تغيّر القيمة المطلقة شيئًا، و$f$ قابلة للاشتقاق على $\\mathbb{R}$ كلها.', '$x^2-6x+9=(x-3)^2\\ge 0$: the absolute value changes nothing and $f$ is differentiable on all of $\\mathbb{R}$.')
        }
    },
    parameters: {
        mistake: {
            wrong: say('Deribagarria izateko, nahikoa da bi zatien deribatuak berdintzea.', 'Para que sea derivable basta con igualar las derivadas de los dos trozos.', 'لتكون قابلة للاشتقاق يكفي أن نساوي مشتقتي الجزأين.', 'For it to be differentiable it is enough to set the derivatives of the two pieces equal.'),
            right: say('Bi baldintzak behar dira. $x^2$ eta $mx+n$ zatiekin $x=3$ puntuan, maldak $m=6$ ematen du, eta jarraitutasunak, $9=18+n$, $n=-9$.', 'Hacen falta las dos condiciones. Con $x^2$ y $mx+n$ en $x=3$, la pendiente da $m=6$ y la continuidad, $9=18+n$, da $n=-9$.', 'يلزم الشرطان معًا. مع $x^2$ و$mx+n$ عند $x=3$ يعطي الميل $m=6$، ويعطي الاتصال $9=18+n$ أي $n=-9$.', 'Both conditions are needed. With $x^2$ and $mx+n$ at $x=3$, the slope gives $m=6$ and continuity, $9=18+n$, gives $n=-9$.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge 1\\end{cases}$ deribagarria da $x=1$ puntuan. Zenbat dira $m$ eta $n$?', '$f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge 1\\end{cases}$ es derivable en $x=1$. ¿Cuánto valen $m$ y $n$?', '$f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge 1\\end{cases}$ قابلة للاشتقاق عند $x=1$. كم تساوي $m$ و$n$؟', '$f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge 1\\end{cases}$ is differentiable at $x=1$. What are $m$ and $n$?'),
            options: [same('$m=1,\\ n=0$'), say('$m=2$ eta edozein $n$', '$m=2$ y cualquier $n$', '$m=2$ وأي $n$', '$m=2$ and any $n$'), same('$m=2,\\ n=-1$')],
            correctIndex: 2,
            explanation: say('Maldak: $m=2$. Balioak: $1=2+n$, beraz $n=-1$.', 'Pendientes: $m=2$. Valores: $1=2+n$, así que $n=-1$.', 'الميول: $m=2$. القيم: $1=2+n$، إذن $n=-1$.', 'Slopes: $m=2$. Values: $1=2+n$, so $n=-1$.')
        }
    },

    /* ---------- 3. The chain rule in depth ---------- */
    'three-layers': {
        mistake: {
            wrong: same('$(\\cos^2 4x)\'=-2\\cos 4x\\sin 4x$'),
            right: say('Barruko geruza falta da, $4x$: $(\\cos^2 4x)\'=-8\\cos 4x\\sin 4x$, 4 faktorearekin.', 'Falta la capa de dentro, $4x$: $(\\cos^2 4x)\'=-8\\cos 4x\\sin 4x$, con el factor 4.', 'تنقص الطبقة الداخلية $4x$: $(\\cos^2 4x)\'=-8\\cos 4x\\sin 4x$ مع العامل 4.', 'The inner layer $4x$ is missing: $(\\cos^2 4x)\'=-8\\cos 4x\\sin 4x$, with the factor 4.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\ln^2(5x)$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=\\ln^2(5x)$?', 'ما مشتقة $f(x)=\\ln^2(5x)$؟', 'What is the derivative of $f(x)=\\ln^2(5x)$?'),
            options: [same('$2\\ln(5x)$'), same('$\\frac{2\\ln(5x)}{x}$'), same('$\\frac{2\\ln(5x)}{5x}$')],
            correctIndex: 1,
            explanation: say('Hiru faktore: $2\\ln(5x)\\cdot\\frac{1}{5x}\\cdot 5=\\frac{2\\ln(5x)}{x}$.', 'Tres factores: $2\\ln(5x)\\cdot\\frac{1}{5x}\\cdot 5=\\frac{2\\ln(5x)}{x}$.', 'ثلاثة عوامل: $2\\ln(5x)\\cdot\\frac{1}{5x}\\cdot 5=\\frac{2\\ln(5x)}{x}$.', 'Three factors: $2\\ln(5x)\\cdot\\frac{1}{5x}\\cdot 5=\\frac{2\\ln(5x)}{x}$.')
        }
    },
    'composite-table': {
        mistake: {
            wrong: same('$(\\ln(x^2+1))\'=\\frac{1}{x^2+1}$'),
            right: say('$u\'$ falta da: $(\\ln u)\'=\\frac{u\'}{u}$, beraz $(\\ln(x^2+1))\'=\\frac{2x}{x^2+1}$.', 'Falta $u\'$: $(\\ln u)\'=\\frac{u\'}{u}$, así que $(\\ln(x^2+1))\'=\\frac{2x}{x^2+1}$.', 'ينقص $u\'$: $(\\ln u)\'=\\frac{u\'}{u}$، إذن $(\\ln(x^2+1))\'=\\frac{2x}{x^2+1}$.', '$u\'$ is missing: $(\\ln u)\'=\\frac{u\'}{u}$, so $(\\ln(x^2+1))\'=\\frac{2x}{x^2+1}$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\arcsin(2x)$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=\\arcsin(2x)$?', 'ما مشتقة $f(x)=\\arcsin(2x)$؟', 'What is the derivative of $f(x)=\\arcsin(2x)$?'),
            options: [same('$\\frac{2}{\\sqrt{1-4x^2}}$'), same('$\\frac{1}{\\sqrt{1-4x^2}}$'), same('$\\frac{2}{1+4x^2}$')],
            correctIndex: 0,
            explanation: say('$(\\arcsin u)\'=\\frac{u\'}{\\sqrt{1-u^2}}$, $u=2x$ eta $u\'=2$ izanik.', '$(\\arcsin u)\'=\\frac{u\'}{\\sqrt{1-u^2}}$ con $u=2x$ y $u\'=2$.', '$(\\arcsin u)\'=\\frac{u\'}{\\sqrt{1-u^2}}$ مع $u=2x$ و$u\'=2$.', '$(\\arcsin u)\'=\\frac{u\'}{\\sqrt{1-u^2}}$ with $u=2x$ and $u\'=2$.')
        }
    },
    'higher-order': {
        mistake: {
            wrong: same('$\\left(\\frac{1}{x}\\right)^{(n)}=\\frac{n!}{x^{n+1}}$'),
            right: say('Zeinua galdu da: deribatu bakoitzak aldatzen du. $\\left(\\frac{1}{x}\\right)^{(n)}=\\frac{(-1)^n\\,n!}{x^{n+1}}$; adibidez, $\\left(\\frac{1}{x}\\right)\'=-\\frac{1}{x^2}$.', 'Se pierde el signo: cada derivada lo cambia. $\\left(\\frac{1}{x}\\right)^{(n)}=\\frac{(-1)^n\\,n!}{x^{n+1}}$; por ejemplo, $\\left(\\frac{1}{x}\\right)\'=-\\frac{1}{x^2}$.', 'ضاعت الإشارة: كل مشتقة تغيّرها. $\\left(\\frac{1}{x}\\right)^{(n)}=\\frac{(-1)^n\\,n!}{x^{n+1}}$؛ مثلًا $\\left(\\frac{1}{x}\\right)\'=-\\frac{1}{x^2}$.', 'The sign is lost: each derivative changes it. $\\left(\\frac{1}{x}\\right)^{(n)}=\\frac{(-1)^n\\,n!}{x^{n+1}}$; for example, $\\left(\\frac{1}{x}\\right)\'=-\\frac{1}{x^2}$.')
        },
        check: {
            prompt: say('$f(x)=e^{2x}$. Zenbat da $f^{(4)}(0)$?', '$f(x)=e^{2x}$. ¿Cuánto vale $f^{(4)}(0)$?', '$f(x)=e^{2x}$. كم تساوي $f^{(4)}(0)$؟', '$f(x)=e^{2x}$. What is $f^{(4)}(0)$?'),
            options: [same('$8$'), same('$2$'), same('$16$')],
            correctIndex: 2,
            explanation: say('Deribatu bakoitzak 2 biderkatzen du: $f^{(4)}(x)=2^4\\,e^{2x}$ eta $f^{(4)}(0)=16$.', 'Cada derivada multiplica por 2: $f^{(4)}(x)=2^4\\,e^{2x}$ y $f^{(4)}(0)=16$.', 'كل مشتقة تضرب في 2: $f^{(4)}(x)=2^4\\,e^{2x}$ و$f^{(4)}(0)=16$.', 'Each derivative multiplies by 2: $f^{(4)}(x)=2^4\\,e^{2x}$ and $f^{(4)}(0)=16$.')
        }
    },

    /* ---------- 4. Special derivatives ---------- */
    inverse: {
        mistake: {
            wrong: same('$(f^{-1})\'(b)=\\frac{1}{f\'(b)}$'),
            right: say('$f\'$ deribatua $a$ puntuan ebaluatzen da, $f(a)=b$ izanik. $f(x)=x^3$ eta $b=8$ badira, $a=2$ eta $(f^{-1})\'(8)=\\frac{1}{12}$.', 'La derivada $f\'$ se evalúa en $a$, con $f(a)=b$. Con $f(x)=x^3$ y $b=8$: $a=2$ y $(f^{-1})\'(8)=\\frac{1}{12}$.', 'تُقيَّم المشتقة $f\'$ عند $a$ حيث $f(a)=b$. مع $f(x)=x^3$ و$b=8$: $a=2$ و$(f^{-1})\'(8)=\\frac{1}{12}$.', 'The derivative $f\'$ is evaluated at $a$, with $f(a)=b$. With $f(x)=x^3$ and $b=8$: $a=2$ and $(f^{-1})\'(8)=\\frac{1}{12}$.')
        },
        check: {
            prompt: say('$f(x)=x^3+2x$ funtzioak alderantzizkoa du, eta $f(1)=3$. Zenbat da $(f^{-1})\'(3)$?', '$f(x)=x^3+2x$ tiene inversa y $f(1)=3$. ¿Cuánto vale $(f^{-1})\'(3)$?', 'للدالة $f(x)=x^3+2x$ دالة عكسية و$f(1)=3$. كم تساوي $(f^{-1})\'(3)$؟', '$f(x)=x^3+2x$ has an inverse and $f(1)=3$. What is $(f^{-1})\'(3)$?'),
            options: [same('$\\frac{1}{29}$'), same('$5$'), same('$\\frac{1}{5}$')],
            correctIndex: 2,
            explanation: say('$f\'(x)=3x^2+2$ eta $f\'(1)=5$: alderantzizkoaren malda $\\frac{1}{5}$ da.', '$f\'(x)=3x^2+2$ y $f\'(1)=5$: la inversa tiene pendiente $\\frac{1}{5}$.', '$f\'(x)=3x^2+2$ و$f\'(1)=5$: ميل الدالة العكسية $\\frac{1}{5}$.', '$f\'(x)=3x^2+2$ and $f\'(1)=5$: the inverse has slope $\\frac{1}{5}$.')
        }
    },
    implicit: {
        mistake: {
            wrong: same('$(y^3)\'=3y^2$'),
            right: say('$y$ aldagaia $x$ aldagaiaren menpe badago, $y\'$ biderkatu behar da: $(y^3)\'=3y^2\\,y\'$.', 'Si $y$ depende de $x$, hay que multiplicar por $y\'$: $(y^3)\'=3y^2\\,y\'$.', 'إذا كان $y$ متعلقًا بـ $x$ فيجب الضرب في $y\'$: $(y^3)\'=3y^2\\,y\'$.', 'If $y$ depends on $x$, you must multiply by $y\'$: $(y^3)\'=3y^2\\,y\'$.')
        },
        check: {
            prompt: say('Zer ateratzen da $x^2+y^3=9$ deribatzean $x$ aldagaiarekiko?', '¿Qué sale al derivar $x^2+y^3=9$ respecto a $x$?', 'ماذا نحصل عند اشتقاق $x^2+y^3=9$ بالنسبة إلى $x$؟', 'What do you get when differentiating $x^2+y^3=9$ with respect to $x$?'),
            options: [same('$2x+3y^2\\,y\'=0$'), same('$2x+3y^2=0$'), same('$2x+3y^2\\,y\'=9$')],
            correctIndex: 0,
            explanation: say('$y$ duen gai bakoitzak $y\'$ darama, eta 9 zenbakiaren deribatua 0 da.', 'Cada término con $y$ lleva $y\'$, y la derivada de 9 es 0.', 'كل حد فيه $y$ يحمل $y\'$، ومشتقة 9 تساوي 0.', 'Every term with $y$ carries $y\'$, and the derivative of 9 is 0.')
        }
    },
    logarithmic: {
        mistake: {
            wrong: same('$(x^x)\'=x\\cdot x^{x-1}$'),
            right: say('Erregela horrek berretzaile finko bat eskatzen du. Berretzailea aldakorra denean, logaritmoak hartzen dira: $(x^x)\'=x^x(\\ln x+1)$.', 'Esa regla pide un exponente fijo. Con exponente variable se toman logaritmos: $(x^x)\'=x^x(\\ln x+1)$.', 'تلك القاعدة تشترط أسًّا ثابتًا. ومع أس متغير نأخذ اللوغاريتم: $(x^x)\'=x^x(\\ln x+1)$.', 'That rule needs a fixed exponent. With a variable exponent you take logarithms: $(x^x)\'=x^x(\\ln x+1)$.')
        },
        check: {
            prompt: say('$f(x)=x^x$. Zenbat da $f\'(2)$?', '$f(x)=x^x$. ¿Cuánto vale $f\'(2)$?', '$f(x)=x^x$. كم تساوي $f\'(2)$؟', '$f(x)=x^x$. What is $f\'(2)$?'),
            options: [same('$4$'), same('$4(\\ln 2+1)$'), same('$4\\ln 2$')],
            correctIndex: 1,
            explanation: say('$f\'(x)=x^x(\\ln x+1)$, eta 2 puntuan $2^2(\\ln 2+1)$.', '$f\'(x)=x^x(\\ln x+1)$, y en 2 da $2^2(\\ln 2+1)$.', '$f\'(x)=x^x(\\ln x+1)$، وعند 2 نجد $2^2(\\ln 2+1)$.', '$f\'(x)=x^x(\\ln x+1)$, and at 2 it gives $2^2(\\ln 2+1)$.')
        }
    },

    /* ---------- 5. Tangent problems ---------- */
    coefficients: {
        mistake: {
            wrong: say('$x_0$ puntuko zuzen ukitzailea horizontala bada, $f(x_0)=0$.', 'Si la tangente en $x_0$ es horizontal, $f(x_0)=0$.', 'إذا كان المماس عند $x_0$ أفقيًّا فإن $f(x_0)=0$.', 'If the tangent at $x_0$ is horizontal, $f(x_0)=0$.'),
            right: say('Horizontalak malda 0 esan nahi du: $f\'(x_0)=0$. Altuera edozein izan daiteke: $x^2+4x$ funtzioaren zuzen ukitzailea $x=-2$ puntuan $y=-4$ da.', 'Horizontal quiere decir pendiente 0: $f\'(x_0)=0$. La altura puede ser cualquiera: para $x^2+4x$ en $x=-2$ la tangente es $y=-4$.', 'الأفقي يعني ميلًا يساوي 0: $f\'(x_0)=0$. أما الارتفاع فقد يكون أي قيمة: مماس $x^2+4x$ عند $x=-2$ هو $y=-4$.', 'Horizontal means slope 0: $f\'(x_0)=0$. The height can be anything: for $x^2+4x$ at $x=-2$ the tangent is $y=-4$.')
        },
        check: {
            prompt: say('$f(x)=x^2+bx$ funtzioaren zuzen ukitzailea horizontala da $x=1$ puntuan. Zenbat da $b$?', 'La tangente a $f(x)=x^2+bx$ en $x=1$ es horizontal. ¿Cuánto vale $b$?', 'مماس $f(x)=x^2+bx$ عند $x=1$ أفقي. كم تساوي $b$؟', 'The tangent to $f(x)=x^2+bx$ at $x=1$ is horizontal. What is $b$?'),
            options: [same('$-2$'), same('$-1$'), same('$2$')],
            correctIndex: 0,
            explanation: say('Horizontala: $f\'(1)=2+b=0$, beraz $b=-2$.', 'Horizontal: $f\'(1)=2+b=0$, así que $b=-2$.', 'أفقي: $f\'(1)=2+b=0$، إذن $b=-2$.', 'Horizontal: $f\'(1)=2+b=0$, so $b=-2$.')
        }
    },
    'exterior-point': {
        mistake: {
            wrong: say('$P$ puntutik doan zuzen ukitzailearen malda $f\'$ da $P$ puntuaren abzisan.', 'La tangente desde $P$ tiene la pendiente de $f\'$ en la abscisa de $P$.', 'ميل المماس المار بـ $P$ هو $f\'$ عند فاصلة $P$.', 'The tangent from $P$ has the slope $f\'$ at the abscissa of $P$.'),
            right: say('$P$ ez dago kurban: zuzen ukitzaileak beste puntu batean ukitzen du kurba. $x^2$ funtzioan, $(2,3)$ puntutik, $c=1$ edo $c=3$ da, ez $c=2$.', '$P$ no está en la curva: la tangente toca la curva en otro punto. Para $x^2$ desde $(2,3)$, $c=1$ o $c=3$, no $c=2$.', '$P$ لا تقع على المنحنى: يمسّ المماس المنحنى في نقطة أخرى. مع $x^2$ ومن $(2,3)$ نجد $c=1$ أو $c=3$ لا $c=2$.', '$P$ is not on the curve: the tangent touches the curve at another point. For $x^2$ from $(2,3)$, $c=1$ or $c=3$, not $c=2$.')
        },
        check: {
            prompt: say('$f(x)=x^2$ funtzioaren zenbat zuzen ukitzaile igarotzen dira $P(0,1)$ puntutik?', '¿Cuántas tangentes a $f(x)=x^2$ pasan por el punto $P(0,1)$?', 'كم مماسًّا للدالة $f(x)=x^2$ يمر بالنقطة $P(0,1)$؟', 'How many tangents to $f(x)=x^2$ pass through the point $P(0,1)$?'),
            options: [same('$1$'), same('$2$'), same('$0$')],
            correctIndex: 2,
            explanation: say('$c$ puntuko zuzen ukitzailea $P$ puntutik igarotzen da $1-c^2=-2c^2$ bada, hau da, $c^2=-1$: ez dago soluziorik. $P$ parabolaren barruan dago.', 'La tangente en $c$ pasa por $P$ si $1-c^2=-2c^2$, es decir, $c^2=-1$: no hay solución. $P$ está dentro de la parábola.', 'يمر المماس عند $c$ بالنقطة $P$ إذا كان $1-c^2=-2c^2$، أي $c^2=-1$: لا يوجد حل. فالنقطة $P$ داخل القطع المكافئ.', 'The tangent at $c$ passes through $P$ if $1-c^2=-2c^2$, that is, $c^2=-1$: there is no solution. $P$ is inside the parabola.')
        }
    },
    'tangent-curves': {
        mistake: {
            wrong: say('Nahikoa da bi kurbak ebakitzea.', 'Basta con que las dos curvas se corten.', 'يكفي أن يتقاطع المنحنيان.', 'It is enough for the two curves to cross.'),
            right: say('Ebakitzea ez da ukitzaile izatea: malda bera ere behar da. $y=x^2$ eta $y=x$ kurbak $(1,1)$ puntuan ebakitzen dira, baina han maldak 2 eta 1 dira.', 'Cortarse no es ser tangentes: además hace falta la misma pendiente. $y=x^2$ e $y=x$ se cortan en $(1,1)$, pero allí las pendientes son 2 y 1.', 'التقاطع ليس تماسًّا: يلزم أيضًا الميل نفسه. يتقاطع $y=x^2$ و$y=x$ عند $(1,1)$، لكن الميلين هناك 2 و1.', 'Crossing is not being tangent: the same slope is needed too. $y=x^2$ and $y=x$ cross at $(1,1)$, but there the slopes are 2 and 1.')
        },
        check: {
            prompt: say('Zein $a$ baliorako da $y=2x+a$ zuzena $y=x^2$ parabolaren ukitzailea?', '¿Para qué $a$ es la recta $y=2x+a$ tangente a la parábola $y=x^2$?', 'لأي قيمة $a$ يكون المستقيم $y=2x+a$ مماسًّا للقطع المكافئ $y=x^2$؟', 'For which $a$ is the line $y=2x+a$ tangent to the parabola $y=x^2$?'),
            options: [same('$0$'), same('$-1$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Maldak: $2c=2$, $c=1$. Altuerak: $1=2+a$, $a=-1$.', 'Pendientes: $2c=2$, $c=1$. Alturas: $1=2+a$, $a=-1$.', 'الميول: $2c=2$، $c=1$. الارتفاعات: $1=2+a$، $a=-1$.', 'Slopes: $2c=2$, $c=1$. Heights: $1=2+a$, $a=-1$.')
        }
    }
}
