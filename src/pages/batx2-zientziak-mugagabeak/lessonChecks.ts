import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: 1/x² taken for a
   logarithm, u′ forgotten, the 1/a of the arctangent lost, the sign of
   −∫v du, the last step of parts left out, the derivative of ln x taken
   for its integral, a fraction integrated without dividing, the
   denominator's logarithm with no partial fractions, a double root read as
   a logarithm, the number of an arctangent lost, dx not changed, the change
   not undone, sin² x treated as a power of x, parts chosen for a composite
   integral and constants missing when integrating twice. Every prompt
   carries two formulas, so that the shared test does not take a whole
   expression for a calculation.
   ========================================================================== */

export type Bach2IndefiniteTopicId =
    | 'table' | 'composed' | 'composed-arcs'
    | 'by-parts' | 'parts-twice' | 'log-arcs'
    | 'division' | 'simple-roots' | 'double-roots' | 'no-roots'
    | 'change' | 'roots-exp' | 'trig-powers'
    | 'choose' | 'conditions'

export const bach2IndefiniteLessonChecks: Record<Bach2IndefiniteTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review ---------- */
    table: {
        mistake: {
            wrong: same('$\\int\\frac{1}{x^2}\\,dx=\\ln|x^2|+k$'),
            right: say('$\\frac{1}{x^2}=x^{-2}$ berretura bat da: $\\int x^{-2}\\,dx=-\\frac{1}{x}+k$. Logaritmoa $\\frac{1}{x}$ zatikiarekin bakarrik ateratzen da.', '$\\frac{1}{x^2}=x^{-2}$ es una potencia: $\\int x^{-2}\\,dx=-\\frac{1}{x}+k$. El logaritmo solo sale con $\\frac{1}{x}$.', '$\\frac{1}{x^2}=x^{-2}$ قوة: $\\int x^{-2}\\,dx=-\\frac{1}{x}+k$. ولا يخرج اللوغاريتم إلا مع $\\frac{1}{x}$.', '$\\frac{1}{x^2}=x^{-2}$ is a power: $\\int x^{-2}\\,dx=-\\frac{1}{x}+k$. The logarithm only comes from $\\frac{1}{x}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\left(4x^3+\\frac{2}{x}\\right)dx$, eta egiaztatu emaitza deribatzean $4x^3+\\frac{2}{x}$ ateratzen dela.', 'Calcula $\\int\\left(4x^3+\\frac{2}{x}\\right)dx$ y comprueba que al derivar el resultado sale $4x^3+\\frac{2}{x}$.', 'احسب $\\int\\left(4x^3+\\frac{2}{x}\\right)dx$ وتحقق من أن اشتقاق النتيجة يعطي $4x^3+\\frac{2}{x}$.', 'Work out $\\int\\left(4x^3+\\frac{2}{x}\\right)dx$ and check that differentiating the result gives $4x^3+\\frac{2}{x}$.'),
            options: [same('$x^4+2\\ln|x|+k$'), same('$x^4-\\frac{2}{x^2}+k$'), same('$12x^2-\\frac{2}{x^2}+k$')],
            correctIndex: 0,
            explanation: say('$\\frac{2}{x}$ zatikiak $2\\ln|x|$ ematen du. Hirugarrena deribatua da, ez integrala.', '$\\frac{2}{x}$ da $2\\ln|x|$. La tercera es la derivada, no la integral.', '$\\frac{2}{x}$ يعطي $2\\ln|x|$. والثالثة هي المشتقة لا التكامل.', '$\\frac{2}{x}$ gives $2\\ln|x|$. The third one is the derivative, not the integral.')
        }
    },
    composed: {
        mistake: {
            wrong: same('$\\int\\cos(5x)\\,dx=\\sin(5x)+k$'),
            right: say('$u\'=5$ falta da: 5 zenbakiaz zatitu behar da. Hau da, $\\int\\cos(5x)\\,dx=\\frac{1}{5}\\sin(5x)+k$.', 'Falta $u\'=5$: hay que dividir entre 5. Es $\\int\\cos(5x)\\,dx=\\frac{1}{5}\\sin(5x)+k$.', 'ينقص $u\'=5$: يجب القسمة على 5. أي $\\int\\cos(5x)\\,dx=\\frac{1}{5}\\sin(5x)+k$.', '$u\'=5$ is missing: you must divide by 5. It is $\\int\\cos(5x)\\,dx=\\frac{1}{5}\\sin(5x)+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int 2x\\sin(x^2)\\,dx$. Deribatuz, $2x\\sin(x^2)$ atera behar da.', 'Calcula $\\int 2x\\sin(x^2)\\,dx$. Al derivar tiene que salir $2x\\sin(x^2)$.', 'احسب $\\int 2x\\sin(x^2)\\,dx$. وبالاشتقاق يجب أن يخرج $2x\\sin(x^2)$.', 'Work out $\\int 2x\\sin(x^2)\\,dx$. Differentiating must give $2x\\sin(x^2)$.'),
            options: [same('$\\cos(x^2)+k$'), same('$-\\cos(x^2)+k$'), same('$-x^2\\cos(x^2)+k$')],
            correctIndex: 1,
            explanation: say('$u=x^2$ eta $u\'=2x$ hartuta, $\\int u\'\\sin u\\,dx=-\\cos u$. Minus zeinua sinuarekin doa.', 'Con $u=x^2$ y $u\'=2x$, $\\int u\'\\sin u\\,dx=-\\cos u$. El signo menos va con el seno.', 'مع $u=x^2$ و$u\'=2x$ يكون $\\int u\'\\sin u\\,dx=-\\cos u$. إشارة السالب تأتي مع الجيب.', 'With $u=x^2$ and $u\'=2x$, $\\int u\'\\sin u\\,dx=-\\cos u$. The minus sign goes with sine.')
        }
    },
    'composed-arcs': {
        mistake: {
            wrong: same('$\\int\\frac{dx}{16+x^2}=\\arctan\\frac{x}{4}+k$'),
            right: say('$\\frac{1}{4}$ falta da: 16 ateratzean $u=\\frac{x}{4}$ eta $u\'=\\frac{1}{4}$. Hau da, $\\frac{1}{4}\\arctan\\frac{x}{4}+k$.', 'Falta $\\frac{1}{4}$: al sacar 16 queda $u=\\frac{x}{4}$ y $u\'=\\frac{1}{4}$. Es $\\frac{1}{4}\\arctan\\frac{x}{4}+k$.', 'ينقص $\\frac{1}{4}$: عند إخراج 16 يبقى $u=\\frac{x}{4}$ و$u\'=\\frac{1}{4}$. أي $\\frac{1}{4}\\arctan\\frac{x}{4}+k$.', '$\\frac{1}{4}$ is missing: taking 16 out leaves $u=\\frac{x}{4}$ and $u\'=\\frac{1}{4}$. It is $\\frac{1}{4}\\arctan\\frac{x}{4}+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\frac{dx}{25+x^2}$, $25$ faktore komun gisa ateraz.', 'Calcula $\\int\\frac{dx}{25+x^2}$ sacando factor común $25$.', 'احسب $\\int\\frac{dx}{25+x^2}$ بإخراج $25$ عاملًا مشتركًا.', 'Work out $\\int\\frac{dx}{25+x^2}$ by taking $25$ out as a common factor.'),
            options: [same('$\\arctan\\frac{x}{5}+k$'), same('$\\frac{1}{25}\\arctan\\frac{x}{5}+k$'), same('$\\frac{1}{5}\\arctan\\frac{x}{5}+k$')],
            correctIndex: 2,
            explanation: say('$\\frac{1}{25}\\cdot 5\\arctan\\frac{x}{5}=\\frac{1}{5}\\arctan\\frac{x}{5}$, $u\'=\\frac{1}{5}$ delako.', '$\\frac{1}{25}\\cdot 5\\arctan\\frac{x}{5}=\\frac{1}{5}\\arctan\\frac{x}{5}$, porque $u\'=\\frac{1}{5}$.', '$\\frac{1}{25}\\cdot 5\\arctan\\frac{x}{5}=\\frac{1}{5}\\arctan\\frac{x}{5}$ لأن $u\'=\\frac{1}{5}$.', '$\\frac{1}{25}\\cdot 5\\arctan\\frac{x}{5}=\\frac{1}{5}\\arctan\\frac{x}{5}$, because $u\'=\\frac{1}{5}$.')
        }
    },

    /* ---------- 2. Integration by parts ---------- */
    'by-parts': {
        mistake: {
            wrong: same('$\\int x\\sin x\\,dx=-x\\cos x-\\sin x+k$'),
            right: say('$v=-\\cos x$ da; beraz, $-\\int v\\,du=+\\int\\cos x\\,dx$. Hau da, $-x\\cos x+\\sin x+k$.', '$v=-\\cos x$, así que $-\\int v\\,du=+\\int\\cos x\\,dx$. Es $-x\\cos x+\\sin x+k$.', '$v=-\\cos x$، لذلك $-\\int v\\,du=+\\int\\cos x\\,dx$. أي $-x\\cos x+\\sin x+k$.', '$v=-\\cos x$, so $-\\int v\\,du=+\\int\\cos x\\,dx$. It is $-x\\cos x+\\sin x+k$.')
        },
        check: {
            prompt: say('$\\int xe^{3x}\\,dx$ zatika kalkulatzeko, zein da $u$? Gogoratu $\\int v\\,du$ errazagoa izan behar dela.', 'Para calcular $\\int xe^{3x}\\,dx$ por partes, ¿cuál es $u$? Recuerda que $\\int v\\,du$ tiene que ser más fácil.', 'لحساب $\\int xe^{3x}\\,dx$ بالتجزئة ما هو $u$؟ تذكّر أن $\\int v\\,du$ يجب أن يكون أسهل.', 'To work out $\\int xe^{3x}\\,dx$ by parts, what is $u$? Remember that $\\int v\\,du$ has to be easier.'),
            options: [same('$u=e^{3x}$'), same('$u=x$'), same('$u=xe^{3x}$')],
            correctIndex: 1,
            explanation: say('$u=x$ hartuta, $du=dx$ eta $v=\\frac{e^{3x}}{3}$: integral berria berehalakoa da. $u=e^{3x}$ hartuta, $x^2$ agertuko litzateke.', 'Con $u=x$ es $du=dx$ y $v=\\frac{e^{3x}}{3}$: la integral nueva es inmediata. Con $u=e^{3x}$ aparecería $x^2$.', 'مع $u=x$ يكون $du=dx$ و$v=\\frac{e^{3x}}{3}$: التكامل الجديد مباشر. ومع $u=e^{3x}$ كان سيظهر $x^2$.', 'With $u=x$, $du=dx$ and $v=\\frac{e^{3x}}{3}$: the new integral is basic. With $u=e^{3x}$, $x^2$ would appear.')
        }
    },
    'parts-twice': {
        mistake: {
            wrong: same('$\\int x^2\\cos x\\,dx=x^2\\sin x+2x\\cos x+k$'),
            right: say('Azken urratsa falta da: $\\int 2\\cos x\\,dx=2\\sin x$. Hau da, $x^2\\sin x+2x\\cos x-2\\sin x+k$.', 'Falta el último paso: $\\int 2\\cos x\\,dx=2\\sin x$. Es $x^2\\sin x+2x\\cos x-2\\sin x+k$.', 'تنقص الخطوة الأخيرة: $\\int 2\\cos x\\,dx=2\\sin x$. أي $x^2\\sin x+2x\\cos x-2\\sin x+k$.', 'The last step is missing: $\\int 2\\cos x\\,dx=2\\sin x$. It is $x^2\\sin x+2x\\cos x-2\\sin x+k$.')
        },
        check: {
            prompt: say('$I=\\int e^x\\sin x\\,dx$ bada eta zatika $I=e^x\\sin x-e^x\\cos x-I$ ateratzen bada, zenbat da $I$?', 'Si $I=\\int e^x\\sin x\\,dx$ y por partes sale $I=e^x\\sin x-e^x\\cos x-I$, ¿cuánto vale $I$?', 'إذا كان $I=\\int e^x\\sin x\\,dx$ وخرج بالتجزئة $I=e^x\\sin x-e^x\\cos x-I$، فكم يساوي $I$؟', 'If $I=\\int e^x\\sin x\\,dx$ and by parts you get $I=e^x\\sin x-e^x\\cos x-I$, what is $I$?'),
            options: [same('$\\frac{e^x(\\sin x-\\cos x)}{2}+k$'), same('$e^x(\\sin x-\\cos x)+k$'), same('$0$')],
            correctIndex: 0,
            explanation: say('Eraman $I$ ezkerrera: $2I=e^x(\\sin x-\\cos x)$, eta zatitu 2 zenbakiaz.', 'Pasa $I$ a la izquierda: $2I=e^x(\\sin x-\\cos x)$, y divide entre 2.', 'انقل $I$ إلى اليسار: $2I=e^x(\\sin x-\\cos x)$، ثم اقسم على 2.', 'Move $I$ to the left: $2I=e^x(\\sin x-\\cos x)$, and divide by 2.')
        }
    },
    'log-arcs': {
        mistake: {
            wrong: same('$\\int\\ln x\\,dx=\\frac{1}{x}+k$'),
            right: say('$\\frac{1}{x}$ zatikia $\\ln x$ funtzioaren deribatua da, ez haren jatorrizkoa. Zatika: $x\\ln x-x+k$.', '$\\frac{1}{x}$ es la derivada de $\\ln x$, no su primitiva. Por partes: $x\\ln x-x+k$.', '$\\frac{1}{x}$ مشتقة $\\ln x$ لا أصليتها. وبالتجزئة: $x\\ln x-x+k$.', '$\\frac{1}{x}$ is the derivative of $\\ln x$, not its antiderivative. By parts: $x\\ln x-x+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\ln(2x)\\,dx$ zatika, $dv=dx$ hartuta.', 'Calcula $\\int\\ln(2x)\\,dx$ por partes con $dv=dx$.', 'احسب $\\int\\ln(2x)\\,dx$ بالتجزئة مع $dv=dx$.', 'Work out $\\int\\ln(2x)\\,dx$ by parts with $dv=dx$.'),
            options: [same('$\\frac{1}{2x}+k$'), same('$x\\ln(2x)-2x+k$'), same('$x\\ln(2x)-x+k$')],
            correctIndex: 2,
            explanation: say('$du=\\frac{2}{2x}\\,dx=\\frac{1}{x}\\,dx$ eta $v=x$: $\\int x\\cdot\\frac{1}{x}\\,dx=x$ geratzen da.', '$du=\\frac{2}{2x}\\,dx=\\frac{1}{x}\\,dx$ y $v=x$: queda $\\int x\\cdot\\frac{1}{x}\\,dx=x$.', '$du=\\frac{2}{2x}\\,dx=\\frac{1}{x}\\,dx$ و$v=x$: يبقى $\\int x\\cdot\\frac{1}{x}\\,dx=x$.', '$du=\\frac{2}{2x}\\,dx=\\frac{1}{x}\\,dx$ and $v=x$: what is left is $\\int x\\cdot\\frac{1}{x}\\,dx=x$.')
        }
    },

    /* ---------- 3. Rational integrals ---------- */
    division: {
        mistake: {
            wrong: same('$\\int\\frac{x^2+1}{x}\\,dx=(x^2+1)\\ln|x|+k$'),
            right: say('Zenbakitzaileak $x$ du: ezin da kanpora atera. Zatitu lehenik, $x+\\frac{1}{x}$, eta $\\frac{x^2}{2}+\\ln|x|+k$ geratzen da.', 'El numerador tiene $x$: no puede salir fuera. Divide primero, $x+\\frac{1}{x}$, y queda $\\frac{x^2}{2}+\\ln|x|+k$.', 'البسط فيه $x$: لا يمكن إخراجه. اقسم أولًا: $x+\\frac{1}{x}$، فيبقى $\\frac{x^2}{2}+\\ln|x|+k$.', 'The numerator has $x$ in it: it cannot come out. Divide first, $x+\\frac{1}{x}$, and you get $\\frac{x^2}{2}+\\ln|x|+k$.')
        },
        check: {
            prompt: say('Zer ateratzen da $\\frac{x^2+5x+7}{x+2}$ zatitzean, $\\int\\frac{x^2+5x+7}{x+2}\\,dx$ integratu aurretik?', '¿Qué se obtiene al dividir $\\frac{x^2+5x+7}{x+2}$, antes de integrar $\\int\\frac{x^2+5x+7}{x+2}\\,dx$?', 'ماذا ينتج عن قسمة $\\frac{x^2+5x+7}{x+2}$ قبل تكامل $\\int\\frac{x^2+5x+7}{x+2}\\,dx$؟', 'What do you get by dividing $\\frac{x^2+5x+7}{x+2}$, before integrating $\\int\\frac{x^2+5x+7}{x+2}\\,dx$?'),
            options: [same('$x+3$'), same('$x+3+\\frac{1}{x+2}$'), same('$x+5+\\frac{7}{x+2}$')],
            correctIndex: 1,
            explanation: say('$(x+2)(x+3)=x^2+5x+6$; hondarra 1 da.', '$(x+2)(x+3)=x^2+5x+6$; el resto es 1.', '$(x+2)(x+3)=x^2+5x+6$؛ والباقي 1.', '$(x+2)(x+3)=x^2+5x+6$; the remainder is 1.')
        }
    },
    'simple-roots': {
        mistake: {
            wrong: same('$\\int\\frac{3}{x^2-1}\\,dx=3\\ln|x^2-1|+k$'),
            right: say('Zenbakitzailea ez da izendatzailearen deribatua. Banatu zatiki sinpleetan: $\\frac{3}{2}\\ln|x-1|-\\frac{3}{2}\\ln|x+1|+k$.', 'El numerador no es la derivada del denominador. Descompón en fracciones simples: $\\frac{3}{2}\\ln|x-1|-\\frac{3}{2}\\ln|x+1|+k$.', 'البسط ليس مشتقة المقام. فكّك إلى كسور بسيطة: $\\frac{3}{2}\\ln|x-1|-\\frac{3}{2}\\ln|x+1|+k$.', 'The numerator is not the derivative of the denominator. Split into partial fractions: $\\frac{3}{2}\\ln|x-1|-\\frac{3}{2}\\ln|x+1|+k$.')
        },
        check: {
            prompt: say('$\\frac{x+7}{(x-1)(x+3)}=\\frac{A}{x-1}+\\frac{B}{x+3}$ berdintzan, zenbat da $A$?', 'En $\\frac{x+7}{(x-1)(x+3)}=\\frac{A}{x-1}+\\frac{B}{x+3}$, ¿cuánto vale $A$?', 'في $\\frac{x+7}{(x-1)(x+3)}=\\frac{A}{x-1}+\\frac{B}{x+3}$، كم يساوي $A$؟', 'In $\\frac{x+7}{(x-1)(x+3)}=\\frac{A}{x-1}+\\frac{B}{x+3}$, what is $A$?'),
            options: [same('$A=-1$'), same('$A=8$'), same('$A=2$')],
            correctIndex: 2,
            explanation: say('$x+7=A(x+3)+B(x-1)$ eta $x=1$ emanda: $8=4A$, beraz $A=2$. $-1$ balioa $B$ da.', 'En $x+7=A(x+3)+B(x-1)$, con $x=1$: $8=4A$, así que $A=2$. El $-1$ es $B$.', 'في $x+7=A(x+3)+B(x-1)$ ومع $x=1$: $8=4A$، إذن $A=2$. و$-1$ هي $B$.', 'In $x+7=A(x+3)+B(x-1)$, with $x=1$: $8=4A$, so $A=2$. The $-1$ is $B$.')
        }
    },
    'double-roots': {
        mistake: {
            wrong: same('$\\int\\frac{4}{(x+1)^2}\\,dx=4\\ln(x+1)^2+k$'),
            right: say('Berretura bat da, ez logaritmo bat: $\\int 4(x+1)^{-2}\\,dx=-\\frac{4}{x+1}+k$.', 'Es una potencia, no un logaritmo: $\\int 4(x+1)^{-2}\\,dx=-\\frac{4}{x+1}+k$.', 'إنها قوة لا لوغاريتم: $\\int 4(x+1)^{-2}\\,dx=-\\frac{4}{x+1}+k$.', 'It is a power, not a logarithm: $\\int 4(x+1)^{-2}\\,dx=-\\frac{4}{x+1}+k$.')
        },
        check: {
            prompt: say('Nola banatzen da $\\frac{3x}{(x-2)^2(x+1)}$, $\\int\\frac{3x}{(x-2)^2(x+1)}\\,dx$ integratzeko?', '¿Cómo se descompone $\\frac{3x}{(x-2)^2(x+1)}$ para integrar $\\int\\frac{3x}{(x-2)^2(x+1)}\\,dx$?', 'كيف نفكك $\\frac{3x}{(x-2)^2(x+1)}$ لتكامل $\\int\\frac{3x}{(x-2)^2(x+1)}\\,dx$؟', 'How do you split $\\frac{3x}{(x-2)^2(x+1)}$ to integrate $\\int\\frac{3x}{(x-2)^2(x+1)}\\,dx$?'),
            options: [same('$\\frac{A}{x-2}+\\frac{B}{(x-2)^2}+\\frac{C}{x+1}$'), same('$\\frac{A}{(x-2)^2}+\\frac{B}{x+1}$'), same('$\\frac{A}{x-2}+\\frac{B}{x+1}$')],
            correctIndex: 0,
            explanation: say('$x=2$ erro bikoitzak bi zatiki eskatzen ditu, eta $x=-1$ erro bakunak bat.', 'La raíz doble $x=2$ pide dos fracciones, y la simple $x=-1$, una.', 'الجذر المضاعف $x=2$ يتطلب كسرين، والبسيط $x=-1$ كسرًا واحدًا.', 'The double root $x=2$ needs two fractions, and the simple one $x=-1$, one.')
        }
    },
    'no-roots': {
        mistake: {
            wrong: same('$\\int\\frac{2x+3}{x^2+1}\\,dx=\\ln(x^2+1)+k$'),
            right: say('3 zenbakia galdu da: $\\frac{2x+3}{x^2+1}=\\frac{2x}{x^2+1}+\\frac{3}{x^2+1}$, eta $\\ln(x^2+1)+3\\arctan x+k$ geratzen da.', 'Se ha perdido el 3: $\\frac{2x+3}{x^2+1}=\\frac{2x}{x^2+1}+\\frac{3}{x^2+1}$, y queda $\\ln(x^2+1)+3\\arctan x+k$.', 'ضاع العدد 3: $\\frac{2x+3}{x^2+1}=\\frac{2x}{x^2+1}+\\frac{3}{x^2+1}$، فيبقى $\\ln(x^2+1)+3\\arctan x+k$.', 'The 3 has been lost: $\\frac{2x+3}{x^2+1}=\\frac{2x}{x^2+1}+\\frac{3}{x^2+1}$, and you get $\\ln(x^2+1)+3\\arctan x+k$.')
        },
        check: {
            prompt: say('$\\frac{2x+7}{x^2+4x+13}$ integratzeko, nola osatzen da $x^2+4x+13$ adierazpenaren karratua?', 'Para integrar $\\frac{2x+7}{x^2+4x+13}$, ¿cómo se completa el cuadrado de $x^2+4x+13$?', 'لتكامل $\\frac{2x+7}{x^2+4x+13}$، كيف نكمل مربع $x^2+4x+13$؟', 'To integrate $\\frac{2x+7}{x^2+4x+13}$, how do you complete the square of $x^2+4x+13$?'),
            options: [same('$(x+4)^2+13$'), same('$(x+2)^2+9$'), same('$(x+2)^2+13$')],
            correctIndex: 1,
            explanation: say('$(x+2)^2=x^2+4x+4$, eta $13-4=9$ falta da.', '$(x+2)^2=x^2+4x+4$, y faltan $13-4=9$.', '$(x+2)^2=x^2+4x+4$، وينقص $13-4=9$.', '$(x+2)^2=x^2+4x+4$, and $13-4=9$ is missing.')
        }
    },

    /* ---------- 4. Substitution ---------- */
    change: {
        mistake: {
            wrong: same('$\\int x\\sqrt{x^2+1}\\,dx=\\int x\\sqrt{t}\\,dx$'),
            right: say('$t=x^2+1$ hartuta, $dx$ ere aldatzen da: $dt=2x\\,dx$; beraz, $x\\,dx=\\frac{dt}{2}$, eta $\\frac{1}{2}\\int\\sqrt{t}\\,dt$ geratzen da.', 'Con $t=x^2+1$ también cambia $dx$: $dt=2x\\,dx$, así que $x\\,dx=\\frac{dt}{2}$ y queda $\\frac{1}{2}\\int\\sqrt{t}\\,dt$.', 'مع $t=x^2+1$ يتغير $dx$ أيضًا: $dt=2x\\,dx$، إذن $x\\,dx=\\frac{dt}{2}$ ويبقى $\\frac{1}{2}\\int\\sqrt{t}\\,dt$.', 'With $t=x^2+1$, $dx$ changes too: $dt=2x\\,dx$, so $x\\,dx=\\frac{dt}{2}$ and you get $\\frac{1}{2}\\int\\sqrt{t}\\,dt$.')
        },
        check: {
            prompt: say('$\\int\\frac{\\sin x}{\\cos^3 x}\\,dx$ integralean $t=\\cos x$ hartzen duzu. Zer bihurtzen da integrala?', 'En $\\int\\frac{\\sin x}{\\cos^3 x}\\,dx$ haces $t=\\cos x$. ¿En qué se convierte la integral?', 'في $\\int\\frac{\\sin x}{\\cos^3 x}\\,dx$ تأخذ $t=\\cos x$. إلامَ يتحول التكامل؟', 'In $\\int\\frac{\\sin x}{\\cos^3 x}\\,dx$ you take $t=\\cos x$. What does the integral become?'),
            options: [same('$\\int\\frac{dt}{t^3}$'), same('$\\int\\frac{\\sin x}{t^3}\\,dt$'), same('$-\\int\\frac{dt}{t^3}$')],
            correctIndex: 2,
            explanation: say('$dt=-\\sin x\\,dx$; beraz, $\\sin x\\,dx=-dt$, eta ez da $x$ bat ere geratzen.', '$dt=-\\sin x\\,dx$, así que $\\sin x\\,dx=-dt$ y no queda ninguna $x$.', '$dt=-\\sin x\\,dx$، إذن $\\sin x\\,dx=-dt$ ولا يبقى أي $x$.', '$dt=-\\sin x\\,dx$, so $\\sin x\\,dx=-dt$ and no $x$ is left.')
        }
    },
    'roots-exp': {
        mistake: {
            wrong: same('$\\int\\frac{e^x}{e^{2x}+1}\\,dx=\\arctan t+k$'),
            right: say('$t=e^x$ aldaketa desegin gabe dago: $\\arctan(e^x)+k$ da. Emaitza $x$ aldagaiaz ematen da.', 'Falta deshacer el cambio $t=e^x$: es $\\arctan(e^x)+k$. El resultado se da en $x$.', 'لم نتراجع عن التعويض $t=e^x$: النتيجة $\\arctan(e^x)+k$. وتُعطى النتيجة بدلالة $x$.', 'The change $t=e^x$ has not been undone: it is $\\arctan(e^x)+k$. The result is given in $x$.')
        },
        check: {
            prompt: say('$\\int x\\sqrt{x-2}\\,dx$ integralean $t^2=x-2$ hartzen duzu. Zer da $dx$?', 'En $\\int x\\sqrt{x-2}\\,dx$ haces $t^2=x-2$. ¿Qué es $dx$?', 'في $\\int x\\sqrt{x-2}\\,dx$ تأخذ $t^2=x-2$. ما $dx$؟', 'In $\\int x\\sqrt{x-2}\\,dx$ you take $t^2=x-2$. What is $dx$?'),
            options: [same('$dx=2t\\,dt$'), same('$dx=dt$'), same('$dx=\\frac{dt}{2t}$')],
            correctIndex: 0,
            explanation: say('$x=t^2+2$; deribatuz, $dx=2t\\,dt$.', '$x=t^2+2$; derivando, $dx=2t\\,dt$.', '$x=t^2+2$، وبالاشتقاق $dx=2t\\,dt$.', '$x=t^2+2$; differentiating, $dx=2t\\,dt$.')
        }
    },
    'trig-powers': {
        mistake: {
            wrong: same('$\\int\\sin^2 x\\,dx=\\frac{\\sin^3 x}{3}+k$'),
            right: say('Ez da $x$ aldagaiaren berretura bat: $\\cos x$ deribatua falta da. Angelu bikoitzarekin: $\\frac{x}{2}-\\frac{\\sin 2x}{4}+k$.', 'No es una potencia de $x$: falta la derivada $\\cos x$. Con el ángulo doble: $\\frac{x}{2}-\\frac{\\sin 2x}{4}+k$.', 'ليست قوة لـ $x$: تنقص المشتقة $\\cos x$. وبضعف الزاوية: $\\frac{x}{2}-\\frac{\\sin 2x}{4}+k$.', 'It is not a power of $x$: the derivative $\\cos x$ is missing. With the double angle: $\\frac{x}{2}-\\frac{\\sin 2x}{4}+k$.')
        },
        check: {
            prompt: say('$\\int\\cos^5 x\\,dx$ integralerako, zein aldaketa komeni da? Gogoratu $\\cos^2 x=1-\\sin^2 x$.', 'Para $\\int\\cos^5 x\\,dx$, ¿qué cambio conviene? Recuerda $\\cos^2 x=1-\\sin^2 x$.', 'لـ $\\int\\cos^5 x\\,dx$، أيّ تعويض يناسب؟ تذكّر $\\cos^2 x=1-\\sin^2 x$.', 'For $\\int\\cos^5 x\\,dx$, which change is best? Remember $\\cos^2 x=1-\\sin^2 x$.'),
            options: [same('$t=\\cos x$'), same('$t=\\sin x$'), same('$t=\\cos 2x$')],
            correctIndex: 1,
            explanation: say('Bereizi $\\cos x$ bat: $\\cos x\\,dx=dt$ da, $t=\\sin x$ hartuta, eta gainerakoa $(1-t^2)^2$ da.', 'Separa un $\\cos x$: con $t=\\sin x$ es $\\cos x\\,dx=dt$, y el resto es $(1-t^2)^2$.', 'افصل $\\cos x$: مع $t=\\sin x$ يكون $\\cos x\\,dx=dt$، والباقي $(1-t^2)^2$.', 'Take one $\\cos x$ apart: with $t=\\sin x$, $\\cos x\\,dx=dt$, and the rest is $(1-t^2)^2$.')
        }
    },

    /* ---------- 5. Method and conditions ---------- */
    choose: {
        mistake: {
            wrong: say('$\\int 2x\\cos(x^2)\\,dx$ zatika, $u=2x$ hartuta.', '$\\int 2x\\cos(x^2)\\,dx$ por partes, con $u=2x$.', '$\\int 2x\\cos(x^2)\\,dx$ بالتجزئة مع $u=2x$.', '$\\int 2x\\cos(x^2)\\,dx$ by parts, with $u=2x$.'),
            right: say('Kanpoan $x^2$ adierazpenaren deribatua dago: konposatua da, $\\sin(x^2)+k$. Zatika integral okerragoa aterako litzateke.', 'Fuera está la derivada de $x^2$: es compuesta, $\\sin(x^2)+k$. Por partes saldría una integral peor.', 'في الخارج مشتقة $x^2$: إنه مركّب، $\\sin(x^2)+k$. وبالتجزئة كان سيخرج تكامل أصعب.', 'The derivative of $x^2$ is outside: it is composite, $\\sin(x^2)+k$. By parts you would get a worse integral.')
        },
        check: {
            prompt: say('Zein metodo komeni da $\\int\\frac{x+1}{x^2-x}\\,dx$ integralerako? Begiratu $x^2-x$ adierazpenari.', '¿Qué método conviene para $\\int\\frac{x+1}{x^2-x}\\,dx$? Fíjate en $x^2-x$.', 'أيّ طريقة تناسب $\\int\\frac{x+1}{x^2-x}\\,dx$؟ انظر إلى $x^2-x$.', 'Which method is best for $\\int\\frac{x+1}{x^2-x}\\,dx$? Look at $x^2-x$.'),
            options: [
                say('Zatikako integrazioa', 'Por partes', 'بالتجزئة', 'By parts'),
                say('Arrazionala: zatiki sinpleak', 'Racional: fracciones simples', 'كسري: كسور بسيطة', 'Rational: partial fractions'),
                say('$t=e^x$ aldaketa', 'Cambio $t=e^x$', 'التعويض $t=e^x$', 'The change $t=e^x$')
            ],
            correctIndex: 1,
            explanation: say('Polinomioen zatidura da, eta $x^2-x=x(x-1)$ erroak 0 eta 1 dira.', 'Es un cociente de polinomios, y $x^2-x=x(x-1)$ tiene raíces 0 y 1.', 'إنه خارج قسمة كثيرَي حدود، و$x^2-x=x(x-1)$ جذراه 0 و1.', 'It is a quotient of polynomials, and $x^2-x=x(x-1)$ has roots 0 and 1.')
        }
    },
    conditions: {
        mistake: {
            wrong: say('$f\'\'(x)=6x$ bada, $f(x)=x^3+k$.', 'Con $f\'\'(x)=6x$, $f(x)=x^3+k$.', 'مع $f\'\'(x)=6x$ يكون $f(x)=x^3+k$.', 'With $f\'\'(x)=6x$, $f(x)=x^3+k$.'),
            right: say('Konstanteak falta dira: bi aldiz integratzean $f\'(x)=3x^2+k_1$ eta $f(x)=x^3+k_1x+k_2$. Bi datu behar dira.', 'Faltan constantes: al integrar dos veces, $f\'(x)=3x^2+k_1$ y $f(x)=x^3+k_1x+k_2$. Hacen falta dos datos.', 'تنقص ثوابت: عند التكامل مرتين $f\'(x)=3x^2+k_1$ و$f(x)=x^3+k_1x+k_2$. تلزم معلومتان.', 'Constants are missing: integrating twice, $f\'(x)=3x^2+k_1$ and $f(x)=x^3+k_1x+k_2$. Two facts are needed.')
        },
        check: {
            prompt: say('$f\'(x)=2x+4$ da, eta $f$ funtzioaren grafikoak $(1,\\,8)$ puntutik pasatzen du. Zein da $f$?', '$f\'(x)=2x+4$ y la gráfica de $f$ pasa por $(1,\\,8)$. ¿Cuál es $f$?', '$f\'(x)=2x+4$ ومنحنى $f$ يمر بالنقطة $(1,\\,8)$. ما $f$؟', '$f\'(x)=2x+4$ and the graph of $f$ goes through $(1,\\,8)$. What is $f$?'),
            options: [same('$x^2+4x+8$'), same('$x^2+4x$'), same('$x^2+4x+3$')],
            correctIndex: 2,
            explanation: say('$f(x)=x^2+4x+k$ eta $f(1)=5+k=8$; beraz, $k=3$.', '$f(x)=x^2+4x+k$ y $f(1)=5+k=8$, así que $k=3$.', '$f(x)=x^2+4x+k$ و$f(1)=5+k=8$، إذن $k=3$.', '$f(x)=x^2+4x+k$ and $f(1)=5+k=8$, so $k=3$.')
        }
    }
}
