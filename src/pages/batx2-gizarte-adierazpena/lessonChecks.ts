import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak — the
   typical mistake and the «Check it» question of every lesson. One wrong
   answer of each question is the lesson's typical mistake: a denominator
   that never vanishes taken out of the domain, x³ + 1 taken for odd, the
   cut with Y read on the X axis, a hole taken for an asymptote, the
   horizontal asymptote with the wrong degrees, an oblique one when the
   degree goes up by two, 1/x «decreasing on ℝ», f'' = 0 taken for an
   inflection, a double root crossed, ln(x + 2) with x > 2.
   ========================================================================== */

export type Bach2gSketchTopicId =
    | 'domain' | 'symmetry' | 'intercepts'
    | 'vertical' | 'horizontal' | 'oblique'
    | 'monotony' | 'concavity' | 'summary'
    | 'polynomial' | 'rational' | 'exp-log'
    | 'absolute-value' | 'describe' | 'from-data'

export const bach2gSketchLessonChecks: Record<Bach2gSketchTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    domain: {
        mistake: {
            wrong: say('$f(x)=\\frac{x}{x^2+1}$ funtzioaren izate-eremua $\\mathbb{R}-\\{-1,1\\}$ da.', 'El dominio de $f(x)=\\frac{x}{x^2+1}$ es $\\mathbb{R}-\\{-1,1\\}$.', 'مجال تعريف $f(x)=\\frac{x}{x^2+1}$ هو $\\mathbb{R}-\\{-1,1\\}$.', 'The domain of $f(x)=\\frac{x}{x^2+1}$ is $\\mathbb{R}-\\{-1,1\\}$.'),
            right: say('$x^2+1$ ez da inoiz zero: $D=\\mathbb{R}$.', '$x^2+1$ nunca vale cero: $D=\\mathbb{R}$.', '$x^2+1$ لا يساوي صفرًا أبدًا: $D=\\mathbb{R}$.', '$x^2+1$ is never zero: $D=\\mathbb{R}$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sqrt{x-2}$ funtzioaren $D$ izate-eremua?', '¿Cuál es el dominio $D$ de $f(x)=\\sqrt{x-2}$?', 'ما مجال التعريف $D$ للدالة $f(x)=\\sqrt{x-2}$؟', 'What is the domain $D$ of $f(x)=\\sqrt{x-2}$?'),
            options: [same('$[2,+\\infty)$'), same('$(2,+\\infty)$'), same('$(-\\infty,2]$')],
            correctIndex: 0,
            explanation: same('$x-2\\ge 0\\ \\to\\ x\\ge 2$')
        }
    },
    symmetry: {
        mistake: {
            wrong: say('$f(x)=x^3+1$ bakoitia da, $x^3$ bakoitia delako.', '$f(x)=x^3+1$ es impar porque $x^3$ es impar.', '$f(x)=x^3+1$ فردية لأن $x^3$ فردية.', '$f(x)=x^3+1$ is odd because $x^3$ is odd.'),
            right: say('$f(-x)=-x^3+1$: ez da $f(x)$ ezta $-f(x)$ ere. Ez du simetriarik.', '$f(-x)=-x^3+1$: no es $f(x)$ ni $-f(x)$. No tiene simetría.', '$f(-x)=-x^3+1$: ليست $f(x)$ ولا $-f(x)$. لا تناظر لها.', '$f(-x)=-x^3+1$: it is neither $f(x)$ nor $-f(x)$. No symmetry.')
        },
        check: {
            prompt: say('Nolakoa da $f(x)=x^4-3x^2$? Kalkulatu $f(-x)$.', '¿Cómo es $f(x)=x^4-3x^2$? Calcula $f(-x)$.', 'كيف تكون $f(x)=x^4-3x^2$؟ احسب $f(-x)$.', 'What kind is $f(x)=x^4-3x^2$? Work out $f(-x)$.'),
            options: [say('Bikoitia', 'Par', 'زوجية', 'Even'), say('Bakoitia', 'Impar', 'فردية', 'Odd'), say('Ez bata ez bestea', 'Ninguna', 'لا هذه ولا تلك', 'Neither')],
            correctIndex: 0,
            explanation: same('$f(-x)=(-x)^4-3(-x)^2=x^4-3x^2=f(x)$')
        }
    },
    intercepts: {
        mistake: {
            wrong: say('$f(x)=\\frac{x+4}{x-2}$ funtzioak $Y$ ardatza $(-4,0)$ puntuan mozten du.', '$f(x)=\\frac{x+4}{x-2}$ corta al eje $Y$ en $(-4,0)$.', '$f(x)=\\frac{x+4}{x-2}$ تقطع محور $Y$ عند $(-4,0)$.', '$f(x)=\\frac{x+4}{x-2}$ cuts the $Y$ axis at $(-4,0)$.'),
            right: say('$(-4,0)$ $X$ ardatzean dago. $Y$ ardatzean $x=0$: $f(0)=-2$, $(0,-2)$.', '$(-4,0)$ está en el eje $X$. En el eje $Y$, $x=0$: $f(0)=-2$, $(0,-2)$.', '$(-4,0)$ على محور $X$. وعلى محور $Y$ يكون $x=0$: $f(0)=-2$، أي $(0,-2)$.', '$(-4,0)$ is on the $X$ axis. On the $Y$ axis, $x=0$: $f(0)=-2$, $(0,-2)$.')
        },
        check: {
            prompt: say('Non mozten du $f(x)=\\frac{x-3}{x+2}$ funtzioak $Y$ ardatza?', '¿Dónde corta $f(x)=\\frac{x-3}{x+2}$ al eje $Y$?', 'أين تقطع $f(x)=\\frac{x-3}{x+2}$ محور $Y$؟', 'Where does $f(x)=\\frac{x-3}{x+2}$ cut the $Y$ axis?'),
            options: [same('$(3,0)$'), same('$\\left(0,-\\frac{3}{2}\\right)$'), same('$\\left(0,\\frac{3}{2}\\right)$')],
            correctIndex: 1,
            explanation: same('$f(0)=\\frac{-3}{2}=-\\frac{3}{2}$')
        }
    },
    vertical: {
        mistake: {
            wrong: say('$f(x)=\\frac{x^2-1}{x-1}$ funtzioak asintota bertikala du $x=1$ zuzenean.', '$f(x)=\\frac{x^2-1}{x-1}$ tiene asíntota vertical en $x=1$.', 'لـ $f(x)=\\frac{x^2-1}{x-1}$ مقارب عمودي عند $x=1$.', '$f(x)=\\frac{x^2-1}{x-1}$ has a vertical asymptote at $x=1$.'),
            right: say('Zero zati zero da: sinplifikatuta $x+1$; zuloa $(1,2)$ puntuan, ez asintota.', 'Es cero entre cero: al simplificar queda $x+1$; un agujero en $(1,2)$, no una asíntota.', 'إنها صفر على صفر: بعد الاختصار تصير $x+1$؛ ثغرة عند $(1,2)$ لا مقارب.', 'It is zero over zero: simplified it is $x+1$; a hole at $(1,2)$, not an asymptote.')
        },
        check: {
            prompt: say('$f(x)=\\frac{2x}{x+4}$ funtzioaren izendatzailea $x+4$ da. Zein da asintota bertikala?', 'El denominador de $f(x)=\\frac{2x}{x+4}$ es $x+4$. ¿Cuál es la asíntota vertical?', 'مقام $f(x)=\\frac{2x}{x+4}$ هو $x+4$. ما المقارب العمودي؟', 'The denominator of $f(x)=\\frac{2x}{x+4}$ is $x+4$. Which is the vertical asymptote?'),
            options: [same('$x=4$'), same('$x=0$'), same('$x=-4$')],
            correctIndex: 2,
            explanation: same('$x+4=0\\ \\to\\ x=-4$')
        }
    },
    horizontal: {
        mistake: {
            wrong: say('$f(x)=\\frac{3x+1}{x^2+2}$ funtzioaren asintota horizontala $y=3$ da.', 'La asíntota horizontal de $f(x)=\\frac{3x+1}{x^2+2}$ es $y=3$.', 'المقارب الأفقي لـ $f(x)=\\frac{3x+1}{x^2+2}$ هو $y=3$.', 'The horizontal asymptote of $f(x)=\\frac{3x+1}{x^2+2}$ is $y=3$.'),
            right: say('Behekoaren maila handiagoa da: $f(x)\\to 0$, asintota $y=0$.', 'El grado de abajo es mayor: $f(x)\\to 0$, asíntota $y=0$.', 'درجة المقام أكبر: $f(x)\\to 0$، والمقارب $y=0$.', 'The bottom degree is bigger: $f(x)\\to 0$, asymptote $y=0$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{4x-1}{2x+3}$ funtzioaren asintota horizontala, $x\\to\\infty$ denean?', '¿Cuál es la asíntota horizontal de $f(x)=\\frac{4x-1}{2x+3}$ cuando $x\\to\\infty$?', 'ما المقارب الأفقي لـ $f(x)=\\frac{4x-1}{2x+3}$ عندما $x\\to\\infty$؟', 'What is the horizontal asymptote of $f(x)=\\frac{4x-1}{2x+3}$ as $x\\to\\infty$?'),
            options: [same('$y=2$'), same('$y=4$'), same('$y=-\\frac{1}{3}$')],
            correctIndex: 0,
            explanation: same('$\\frac{4}{2}=2$')
        }
    },
    oblique: {
        mistake: {
            wrong: say('$f(x)=\\frac{x^3+1}{x-1}$ funtzioak asintota zeiharra du.', '$f(x)=\\frac{x^3+1}{x-1}$ tiene asíntota oblicua.', 'لـ $f(x)=\\frac{x^3+1}{x-1}$ مقارب مائل.', '$f(x)=\\frac{x^3+1}{x-1}$ has an oblique asymptote.'),
            right: say('Goiko maila bi handiagoa da: zatidura parabola bat da, ez zuzen bat. Ez dago asintota zeiharrik.', 'El grado de arriba es dos más: el cociente es una parábola, no una recta. No hay asíntota oblicua.', 'درجة البسط أكبر باثنين: خارج القسمة قطع مكافئ لا مستقيم. فلا مقارب مائل.', 'The top degree is two more: the quotient is a parabola, not a line. There is no oblique asymptote.')
        },
        check: {
            prompt: say('Egin zatiketa: $x^2-2$ zati $x$. Zein da $f(x)=\\frac{x^2-2}{x}$ funtzioaren asintota zeiharra?', 'Divide $x^2-2$ entre $x$. ¿Cuál es la asíntota oblicua de $f(x)=\\frac{x^2-2}{x}$?', 'اقسم $x^2-2$ على $x$. ما المقارب المائل لـ $f(x)=\\frac{x^2-2}{x}$؟', 'Divide $x^2-2$ by $x$. What is the oblique asymptote of $f(x)=\\frac{x^2-2}{x}$?'),
            options: [same('$y=x-2$'), same('$y=2x$'), same('$y=x$')],
            correctIndex: 2,
            explanation: same('$\\frac{x^2-2}{x}=x-\\frac{2}{x}$')
        }
    },
    monotony: {
        mistake: {
            wrong: say('$f(x)=\\frac{1}{x}$ beherakorra da $\\mathbb{R}$ osoan.', '$f(x)=\\frac{1}{x}$ es decreciente en todo $\\mathbb{R}$.', '$f(x)=\\frac{1}{x}$ متناقصة على $\\mathbb{R}$ كلها.', '$f(x)=\\frac{1}{x}$ is decreasing on all of $\\mathbb{R}$.'),
            right: say('$x=0$ ez dago izate-eremuan: beherakorra da $(-\\infty,0)$ tartean eta $(0,+\\infty)$ tartean, bakoitza bere aldetik.', '$x=0$ no está en el dominio: decrece en $(-\\infty,0)$ y en $(0,+\\infty)$, cada uno por su lado.', '$x=0$ ليست في المجال: تتناقص في $(-\\infty,0)$ وفي $(0,+\\infty)$ كلٌّ على حدة.', '$x=0$ is not in the domain: it decreases on $(-\\infty,0)$ and on $(0,+\\infty)$, each on its own.')
        },
        check: {
            prompt: say('$f(x)=\\frac{x}{x^2+4}$ eta $f\'(x)=\\frac{4-x^2}{(x^2+4)^2}$. Non du maximoa?', '$f(x)=\\frac{x}{x^2+4}$ y $f\'(x)=\\frac{4-x^2}{(x^2+4)^2}$. ¿Dónde tiene el máximo?', '$f(x)=\\frac{x}{x^2+4}$ و$f\'(x)=\\frac{4-x^2}{(x^2+4)^2}$. أين القيمة العظمى؟', '$f(x)=\\frac{x}{x^2+4}$ and $f\'(x)=\\frac{4-x^2}{(x^2+4)^2}$. Where is the maximum?'),
            options: [same('$\\left(-2,-\\frac{1}{4}\\right)$'), same('$\\left(2,\\frac{1}{4}\\right)$'), same('$(0,0)$')],
            correctIndex: 1,
            explanation: same('$f(2)=\\frac{2}{8}=\\frac{1}{4}$')
        }
    },
    concavity: {
        mistake: {
            wrong: say('$f(x)=x^4$ funtzioak inflexio-puntua du $x=0$ puntuan, $f\'\'(0)=0$ delako.', '$f(x)=x^4$ tiene un punto de inflexión en $x=0$ porque $f\'\'(0)=0$.', 'لـ $f(x)=x^4$ نقطة انعطاف عند $x=0$ لأن $f\'\'(0)=0$.', '$f(x)=x^4$ has a point of inflection at $x=0$ because $f\'\'(0)=0$.'),
            right: say('$f\'\'(x)=12x^2$ ez da zeinuz aldatzen: beti ahurra da, ez dago inflexiorik.', '$f\'\'(x)=12x^2$ no cambia de signo: siempre es cóncava, no hay inflexión.', '$f\'\'(x)=12x^2$ لا تتغير إشارتها: مقعّرة نحو الأعلى دائمًا ولا انعطاف.', '$f\'\'(x)=12x^2$ does not change sign: always concave up, no inflection.')
        },
        check: {
            prompt: say('$f(x)=x^3+3x^2$ eta $f\'\'(x)=6x+6$. Non da ganbila (∩)?', '$f(x)=x^3+3x^2$ y $f\'\'(x)=6x+6$. ¿Dónde es convexa (∩)?', '$f(x)=x^3+3x^2$ و$f\'\'(x)=6x+6$. أين تكون مقعّرة نحو الأسفل (∩)؟', '$f(x)=x^3+3x^2$ and $f\'\'(x)=6x+6$. Where is it concave down (∩)?'),
            options: [same('$x<-1$'), same('$x>-1$'), same('$x<1$')],
            correctIndex: 0,
            explanation: same('$6x+6<0\\ \\to\\ x<-1$')
        }
    },
    summary: {
        mistake: {
            wrong: say('Fitxa egiteko, lehenik kurba marrazten da eta gero asintotak.', 'Para hacer la ficha se dibuja primero la curva y después las asíntotas.', 'لإنجاز البطاقة يُرسم المنحنى أولًا ثم المقاربات.', 'To make the card, draw the curve first and the asymptotes afterwards.'),
            right: say('Alderantziz: asintotak eta puntuak lehenik; kurbak haiek lotzen ditu.', 'Al revés: primero las asíntotas y los puntos; la curva los une.', 'العكس: المقاربات والنقاط أولًا؛ ثم يربطها المنحنى.', 'The other way round: asymptotes and points first; the curve joins them.')
        },
        check: {
            prompt: say('Funtzio batean $f\'(x)>0$ da $x<0$ denean eta $f\'(x)<0$ $x>0$ denean. Zer dago $x=0$ puntuan?', 'En una función, $f\'(x)>0$ si $x<0$ y $f\'(x)<0$ si $x>0$. ¿Qué hay en $x=0$?', 'في دالة $f\'(x)>0$ إذا $x<0$ و$f\'(x)<0$ إذا $x>0$. ماذا يوجد عند $x=0$؟', 'In a function, $f\'(x)>0$ if $x<0$ and $f\'(x)<0$ if $x>0$. What is there at $x=0$?'),
            options: [say('Minimoa', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Inflexioa', 'Una inflexión', 'انعطاف', 'An inflection'), say('Maximoa', 'Un máximo', 'قيمة عظمى', 'A maximum')],
            correctIndex: 2,
            explanation: say('Gora eta gero behera: maximoa.', 'Sube y después baja: máximo.', 'يصعد ثم ينزل: عظمى.', 'Up and then down: a maximum.')
        }
    },
    polynomial: {
        mistake: {
            wrong: say('$f(x)=(x-1)^2(x+2)$ funtzioak $X$ ardatza zeharkatzen du $x=1$ puntuan.', '$f(x)=(x-1)^2(x+2)$ atraviesa el eje $X$ en $x=1$.', '$f(x)=(x-1)^2(x+2)$ تعبر محور $X$ عند $x=1$.', '$f(x)=(x-1)^2(x+2)$ crosses the $X$ axis at $x=1$.'),
            right: say('$x=1$ erro bikoitza da: grafikoak ardatza ukitzen du eta itzuli egiten da.', '$x=1$ es raíz doble: la gráfica toca el eje y vuelve.', '$x=1$ جذر مضاعف: يمس التمثيل المحور ويعود.', '$x=1$ is a double root: the graph touches the axis and turns back.')
        },
        check: {
            prompt: say('Nora doa $f(x)=-x^3+2x$ funtzioa $x\\to+\\infty$ denean?', '¿Hacia dónde va $f(x)=-x^3+2x$ cuando $x\\to+\\infty$?', 'إلى أين تتجه $f(x)=-x^3+2x$ عندما $x\\to+\\infty$؟', 'Where does $f(x)=-x^3+2x$ go as $x\\to+\\infty$?'),
            options: [same('$-\\infty$'), same('$+\\infty$'), same('$0$')],
            correctIndex: 0,
            explanation: say('Gai nagusia $-x^3$ da: behera.', 'Manda $-x^3$: hacia abajo.', 'الحد الرئيسي $-x^3$: نحو الأسفل.', 'The leading term is $-x^3$: downwards.')
        }
    },
    rational: {
        mistake: {
            wrong: say('$f(x)=\\frac{x^2+2}{x+1}$ funtzioaren asintota horizontala $y=1$ da.', 'La asíntota horizontal de $f(x)=\\frac{x^2+2}{x+1}$ es $y=1$.', 'المقارب الأفقي لـ $f(x)=\\frac{x^2+2}{x+1}$ هو $y=1$.', 'The horizontal asymptote of $f(x)=\\frac{x^2+2}{x+1}$ is $y=1$.'),
            right: say('Goiko maila bat handiagoa da: ez dago horizontalik, zeiharra baizik, $y=x-1$.', 'El grado de arriba es uno más: no hay horizontal, sino oblicua, $y=x-1$.', 'درجة البسط أكبر بواحد: لا أفقي بل مائل $y=x-1$.', 'The top degree is one more: there is no horizontal one, but an oblique one, $y=x-1$.')
        },
        check: {
            prompt: say('Zenbat asintota bertikal ditu $f(x)=\\frac{1}{x^2-9}$ funtzioak? Ebatzi $x^2-9=0$.', '¿Cuántas asíntotas verticales tiene $f(x)=\\frac{1}{x^2-9}$? Resuelve $x^2-9=0$.', 'كم مقاربًا عموديًا للدالة $f(x)=\\frac{1}{x^2-9}$؟ حلّ $x^2-9=0$.', 'How many vertical asymptotes does $f(x)=\\frac{1}{x^2-9}$ have? Solve $x^2-9=0$.'),
            options: [same('$1$'), same('$2$'), same('$0$')],
            correctIndex: 1,
            explanation: same('$x=-3\\qquad x=3$')
        }
    },
    'exp-log': {
        mistake: {
            wrong: say('$f(x)=\\ln(x+2)$ funtzioaren izate-eremua $x>2$ da.', 'El dominio de $f(x)=\\ln(x+2)$ es $x>2$.', 'مجال تعريف $f(x)=\\ln(x+2)$ هو $x>2$.', 'The domain of $f(x)=\\ln(x+2)$ is $x>2$.'),
            right: say('$x+2>0$ behar da: $x>-2$, eta asintota bertikala $x=-2$.', 'Hace falta $x+2>0$: $x>-2$, y la asíntota vertical es $x=-2$.', 'يلزم $x+2>0$: $x>-2$، والمقارب العمودي $x=-2$.', 'You need $x+2>0$: $x>-2$, and the vertical asymptote is $x=-2$.')
        },
        check: {
            prompt: say('Zein asintota du $f(x)=e^{-x}+1$ funtzioak $x\\to+\\infty$ denean?', '¿Qué asíntota tiene $f(x)=e^{-x}+1$ cuando $x\\to+\\infty$?', 'ما مقارب $f(x)=e^{-x}+1$ عندما $x\\to+\\infty$؟', 'Which asymptote does $f(x)=e^{-x}+1$ have as $x\\to+\\infty$?'),
            options: [same('$y=0$'), same('$x=0$'), same('$y=1$')],
            correctIndex: 2,
            explanation: same('$e^{-x}\\to 0\\ \\to\\ f(x)\\to 1$')
        }
    },
    'absolute-value': {
        mistake: {
            wrong: say('$f(x)=|x^2-1|$ funtzioak minimoa du $(0,-1)$ puntuan.', '$f(x)=|x^2-1|$ tiene un mínimo en $(0,-1)$.', 'لـ $f(x)=|x^2-1|$ قيمة صغرى عند $(0,-1)$.', '$f(x)=|x^2-1|$ has a minimum at $(0,-1)$.'),
            right: say('Balio absolutua ez da inoiz negatiboa: zatia gora isladatzen da, eta $(0,1)$ maximo erlatiboa da.', 'El valor absoluto nunca es negativo: el trozo se refleja hacia arriba y $(0,1)$ es un máximo relativo.', 'القيمة المطلقة ليست سالبة أبدًا: ينعكس الجزء إلى الأعلى و$(0,1)$ عظمى محلية.', 'The absolute value is never negative: the piece is reflected upwards and $(0,1)$ is a relative maximum.')
        },
        check: {
            prompt: say('Zenbat da $f(x)=|2x-6|$ funtzioaren balioa $x=1$ puntuan?', '¿Cuánto vale $f(x)=|2x-6|$ en $x=1$?', 'كم تساوي $f(x)=|2x-6|$ عند $x=1$؟', 'What is $f(x)=|2x-6|$ at $x=1$?'),
            options: [same('$4$'), same('$-4$'), same('$8$')],
            correctIndex: 0,
            explanation: same('$|2-6|=|-4|=4$')
        }
    },
    describe: {
        mistake: {
            wrong: say('$V(t)=\\frac{50t}{t^2+25}$ salmentak maximoak dira $t=5$ unean, eta $V(5)=50$.', 'Las ventas $V(t)=\\frac{50t}{t^2+25}$ son máximas en $t=5$, con $V(5)=50$.', 'المبيعات $V(t)=\\frac{50t}{t^2+25}$ أعظمية عند $t=5$ مع $V(5)=50$.', 'Sales $V(t)=\\frac{50t}{t^2+25}$ peak at $t=5$, with $V(5)=50$.'),
            right: say('Maximoa $t=5$ unean da, baina balioa kalkulatu behar da: $V(5)=\\frac{250}{50}=5$.', 'El máximo es en $t=5$, pero hay que calcular el valor: $V(5)=\\frac{250}{50}=5$.', 'العظمى عند $t=5$ لكن يجب حساب القيمة: $V(5)=\\frac{250}{50}=5$.', 'The maximum is at $t=5$, but the value must be worked out: $V(5)=\\frac{250}{50}=5$.')
        },
        check: {
            prompt: say('Erabiltzaileak $U(t)=\\frac{20t}{t^2+1}$ dira. Zer gertatzen da $t\\to+\\infty$ denean?', 'Los usuarios son $U(t)=\\frac{20t}{t^2+1}$. ¿Qué pasa cuando $t\\to+\\infty$?', 'المستخدمون $U(t)=\\frac{20t}{t^2+1}$. ماذا يحدث عندما $t\\to+\\infty$؟', 'The users are $U(t)=\\frac{20t}{t^2+1}$. What happens as $t\\to+\\infty$?'),
            options: [say('20 baliora hurbiltzen dira', 'Se acercan a 20', 'يقتربون من 20', 'They approach 20'), say('Zerora hurbiltzen dira', 'Se acercan a 0', 'يقتربون من 0', 'They approach 0'), say('Gelditu gabe hazten dira', 'Crecen sin parar', 'يزدادون بلا توقف', 'They grow without end')],
            correctIndex: 1,
            explanation: say('Behekoaren maila handiagoa da: $U(t)\\to 0$.', 'El grado de abajo es mayor: $U(t)\\to 0$.', 'درجة المقام أكبر: $U(t)\\to 0$.', 'The bottom degree is bigger: $U(t)\\to 0$.')
        }
    },
    'from-data': {
        mistake: {
            wrong: say('Asintotak $x=3$ eta $y=-1$ badira, eredua $f(x)=3+\\frac{k}{x+1}$ da.', 'Si las asíntotas son $x=3$ e $y=-1$, el modelo es $f(x)=3+\\frac{k}{x+1}$.', 'إذا كان المقاربان $x=3$ و$y=-1$ فالنموذج $f(x)=3+\\frac{k}{x+1}$.', 'If the asymptotes are $x=3$ and $y=-1$, the model is $f(x)=3+\\frac{k}{x+1}$.'),
            right: say('Lekuz aldatu ditu: bertikala izendatzailean eta horizontala batugai gisa, $f(x)=-1+\\frac{k}{x-3}$.', 'Los ha cambiado de sitio: la vertical va en el denominador y la horizontal sumando, $f(x)=-1+\\frac{k}{x-3}$.', 'بدّل موضعيهما: العمودي في المقام والأفقي حدًّا مضافًا، $f(x)=-1+\\frac{k}{x-3}$.', 'They are swapped: the vertical one goes in the denominator and the horizontal one is added, $f(x)=-1+\\frac{k}{x-3}$.')
        },
        check: {
            prompt: say('$f(x)=2+\\frac{k}{x}$ funtzioak $(1,5)$ puntutik igaro behar du. Zenbat da $k$?', '$f(x)=2+\\frac{k}{x}$ tiene que pasar por $(1,5)$. ¿Cuánto vale $k$?', 'يجب أن تمر $f(x)=2+\\frac{k}{x}$ بـ $(1,5)$. كم تساوي $k$؟', '$f(x)=2+\\frac{k}{x}$ must pass through $(1,5)$. What is $k$?'),
            options: [same('$5$'), same('$3$'), same('$7$')],
            correctIndex: 1,
            explanation: same('$2+k=5\\ \\to\\ k=3$')
        }
    }
}
