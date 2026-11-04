import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. Points and vectors are
   written left to right in every language.
   ========================================================================== */

export type VectorsTopicId = 'vector-coordinates' | 'vector-operations' | 'parallel-vectors' | 'distance' | 'midpoint' | 'collinear' | 'parametric' | 'continuous' | 'general-explicit' | 'slope' | 'parallel-perpendicular' | 'relative-position' | 'bisector' | 'circle' | 'polygons'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const vectorsLessonChecks: Record<VectorsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'vector-coordinates': {
        mistake: {
            wrong: say('$A(1,4)$ puntutik $B(6,9)$ puntura doan bektorea $(1-6,\\ 4-9)=(-5,-5)$ da.', 'El vector de $A(1,4)$ a $B(6,9)$ es $(1-6,\\ 4-9)=(-5,-5)$.', 'المتجه من $A(1,4)$ إلى $B(6,9)$ هو $(1-6,\\ 4-9)=(-5,-5)$.', 'The vector from $A(1,4)$ to $B(6,9)$ is $(1-6,\\ 4-9)=(-5,-5)$.'),
            right: say('Muturra ken jatorria: $(6-1,\\ 9-4)=(5,5)$. Alderantziz eginda, aurkako bektorea ateratzen da.', 'Extremo menos origen: $(6-1,\\ 9-4)=(5,5)$. Al revés sale el vector opuesto.', 'النهاية ناقص البداية: $(6-1,\\ 9-4)=(5,5)$. وبالعكس نحصل على المتجه المعاكس.', 'End minus start: $(6-1,\\ 9-4)=(5,5)$. The other way round gives the opposite vector.')
        },
        check: {
            prompt: say('Zein da $\\vec{v}=(5,-12)$ bektorearen modulua?', '¿Cuál es el módulo de $\\vec{v}=(5,-12)$?', 'ما طول المتجه $\\vec{v}=(5,-12)$؟', 'What is the magnitude of $\\vec{v}=(5,-12)$?'),
            options: [same('$13$'), same('$17$'), same('$7$')],
            correctIndex: 0,
            explanation: same('$\\sqrt{25+144}=\\sqrt{169}=13$')
        }
    },
    'vector-operations': {
        mistake: {
            wrong: say('$(6,8)-(2,-3)=(4,5)$', '$(6,8)-(2,-3)=(4,5)$', '$(6,8)-(2,-3)=(4,5)$', '$(6,8)-(2,-3)=(4,5)$'),
            right: say('Ken bider ken, gehi: $(6-2,\\ 8-(-3))=(4,11)$.', 'Menos por menos, más: $(6-2,\\ 8-(-3))=(4,11)$.', 'سالب في سالب موجب: $(6-2,\\ 8-(-3))=(4,11)$.', 'Minus a minus is a plus: $(6-2,\\ 8-(-3))=(4,11)$.')
        },
        check: {
            prompt: say('Kalkulatu $-3\\cdot(4,-2)$.', 'Calcula $-3\\cdot(4,-2)$.', 'احسب $-3\\cdot(4,-2)$.', 'Work out $-3\\cdot(4,-2)$.'),
            options: [same('$(-12,-6)$'), same('$(-12,6)$'), same('$(1,-5)$')],
            correctIndex: 1,
            explanation: same('$(-3\\cdot 4,\\ -3\\cdot(-2))=(-12,6)$')
        }
    },
    'parallel-vectors': {
        mistake: {
            wrong: say('$(2,5)$ bektorearen perpendikular bat $(5,2)$ da.', 'Un vector perpendicular a $(2,5)$ es $(5,2)$.', 'متجه عمودي على $(2,5)$ هو $(5,2)$.', 'A vector perpendicular to $(2,5)$ is $(5,2)$.'),
            right: say('Koordenatuak trukatzeaz gain, zeinu bat aldatu behar da: $(-5,2)$, eta $2\\cdot(-5)+5\\cdot 2=0$.', 'Además de intercambiar, hay que cambiar un signo: $(-5,2)$, y $2\\cdot(-5)+5\\cdot 2=0$.', 'إلى جانب التبديل يجب تغيير إشارة واحدة: $(-5,2)$، و$2\\cdot(-5)+5\\cdot 2=0$.', 'Besides swapping, change one sign: $(-5,2)$, and $2\\cdot(-5)+5\\cdot 2=0$.')
        },
        check: {
            prompt: say('$k$ zenbat izan behar da $(3,k)$ eta $(6,10)$ paraleloak izateko?', '¿Cuánto vale $k$ si $(3,k)$ y $(6,10)$ son paralelos?', 'ما قيمة $k$ إذا كان $(3,k)$ و$(6,10)$ متوازيين؟', 'What is $k$ if $(3,k)$ and $(6,10)$ are parallel?'),
            options: [same('$5$'), same('$20$'), same('$2$')],
            correctIndex: 0,
            explanation: same('$3\\cdot 10=6\\cdot k\\ \\to\\ k=5$')
        }
    },
    distance: {
        mistake: {
            wrong: say('$(1,2)$ eta $(4,6)$ puntuen arteko distantzia $(4-1)+(6-2)=7$ da.', 'La distancia de $(1,2)$ a $(4,6)$ es $(4-1)+(6-2)=7$.', 'المسافة بين $(1,2)$ و$(4,6)$ هي $(4-1)+(6-2)=7$.', 'The distance from $(1,2)$ to $(4,6)$ is $(4-1)+(6-2)=7$.'),
            right: say('Distantzia hipotenusa da, ez katetoen batura: $\\sqrt{3^{2}+4^{2}}=5$.', 'La distancia es la hipotenusa, no la suma de los catetos: $\\sqrt{3^{2}+4^{2}}=5$.', 'المسافة هي الوتر لا مجموع الضلعين القائمين: $\\sqrt{3^{2}+4^{2}}=5$.', 'The distance is the hypotenuse, not the sum of the legs: $\\sqrt{3^{2}+4^{2}}=5$.')
        },
        check: {
            prompt: say('Zein da $(-1,2)$ eta $(11,7)$ puntuen arteko distantzia?', '¿Cuál es la distancia entre $(-1,2)$ y $(11,7)$?', 'ما المسافة بين $(-1,2)$ و$(11,7)$؟', 'What is the distance between $(-1,2)$ and $(11,7)$?'),
            options: [same('$17$'), same('$12$'), same('$13$')],
            correctIndex: 2,
            explanation: same('$\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$')
        }
    },
    midpoint: {
        mistake: {
            wrong: say('$(2,8)$ eta $(6,4)$ puntuen erdiko puntua $\\left(\\frac{6-2}{2},\\frac{8-4}{2}\\right)=(2,2)$ da.', 'El punto medio de $(2,8)$ y $(6,4)$ es $\\left(\\frac{6-2}{2},\\frac{8-4}{2}\\right)=(2,2)$.', 'منتصف $(2,8)$ و$(6,4)$ هو $\\left(\\frac{6-2}{2},\\frac{8-4}{2}\\right)=(2,2)$.', 'The midpoint of $(2,8)$ and $(6,4)$ is $\\left(\\frac{6-2}{2},\\frac{8-4}{2}\\right)=(2,2)$.'),
            right: say('Koordenatuak batu egiten dira: $\\left(\\frac{2+6}{2},\\frac{8+4}{2}\\right)=(4,6)$.', 'Las coordenadas se suman: $\\left(\\frac{2+6}{2},\\frac{8+4}{2}\\right)=(4,6)$.', 'الإحداثيات تُجمع: $\\left(\\frac{2+6}{2},\\frac{8+4}{2}\\right)=(4,6)$.', 'The coordinates are added: $\\left(\\frac{2+6}{2},\\frac{8+4}{2}\\right)=(4,6)$.')
        },
        check: {
            prompt: say('Zein da $(4,1)$ puntuaren simetrikoa $O(0,0)$ jatorriarekiko?', '¿Cuál es el simétrico de $(4,1)$ respecto del origen $O(0,0)$?', 'ما نظير $(4,1)$ بالنسبة إلى الأصل $O(0,0)$؟', 'What is the reflection of $(4,1)$ in the origin $O(0,0)$?'),
            options: [same('$(-4,-1)$'), same('$(4,-1)$'), same('$(1,4)$')],
            correctIndex: 0,
            explanation: say('$O$ da erdiko puntua: koordenatu biei zeinua aldatzen zaie.', '$O$ es el punto medio: cambian de signo las dos coordenadas.', '$O$ هو المنتصف: تتغيّر إشارة الإحداثيين.', '$O$ is the midpoint: both coordinates change sign.')
        }
    },
    collinear: {
        mistake: {
            wrong: say('$(1,2)$ eta $(3,6)$ proportzionalak dira; beraz, $A(1,2)$, $B(3,6)$ eta $C(4,9)$ lerrokatuta daude.', '$(1,2)$ y $(3,6)$ son proporcionales, así que $A(1,2)$, $B(3,6)$ y $C(4,9)$ están alineados.', '$(1,2)$ و$(3,6)$ متناسبان، إذن $A(1,2)$ و$B(3,6)$ و$C(4,9)$ على استقامة واحدة.', '$(1,2)$ and $(3,6)$ are proportional, so $A(1,2)$, $B(3,6)$ and $C(4,9)$ are collinear.'),
            right: say('Bektoreak konparatu behar dira, ez puntuak: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(3,7)$ eta $\\frac{3}{2}\\neq\\frac{7}{4}$; ez daude lerrokatuta.', 'Hay que comparar vectores, no puntos: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(3,7)$ y $\\frac{3}{2}\\neq\\frac{7}{4}$; no están alineados.', 'نقارن المتجهات لا النقاط: $\\overrightarrow{AB}=(2,4)$ و$\\overrightarrow{AC}=(3,7)$ و$\\frac{3}{2}\\neq\\frac{7}{4}$؛ ليست على استقامة واحدة.', 'Compare vectors, not points: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(3,7)$ and $\\frac{3}{2}\\neq\\frac{7}{4}$; they are not collinear.')
        },
        check: {
            prompt: say('$k$ zenbat izan behar da $A(0,0)$, $B(1,2)$ eta $C(3,k)$ lerrokatuta egoteko?', '¿Cuánto vale $k$ si $A(0,0)$, $B(1,2)$ y $C(3,k)$ están alineados?', 'ما قيمة $k$ إذا كانت $A(0,0)$ و$B(1,2)$ و$C(3,k)$ على استقامة واحدة؟', 'What is $k$ if $A(0,0)$, $B(1,2)$ and $C(3,k)$ are collinear?'),
            options: [same('$3$'), same('$6$'), same('$5$')],
            correctIndex: 1,
            explanation: same('$\\frac{3}{1}=\\frac{k}{2}\\ \\to\\ k=6$')
        }
    },
    parametric: {
        mistake: {
            wrong: say('$A(1,2)$ eta $B(4,5)$ puntuetatik pasatzen den zuzena: $x=1+4t$, $y=2+5t$.', 'La recta que pasa por $A(1,2)$ y $B(4,5)$ es $x=1+4t$, $y=2+5t$.', 'المستقيم المار بـ $A(1,2)$ و$B(4,5)$ هو $x=1+4t$، $y=2+5t$.', 'The line through $A(1,2)$ and $B(4,5)$ is $x=1+4t$, $y=2+5t$.'),
            right: say('Norabide-bektorea $\\overrightarrow{AB}=(3,3)$ da, ez $B$ puntua: $x=1+3t$, $y=2+3t$.', 'El vector director es $\\overrightarrow{AB}=(3,3)$, no el punto $B$: $x=1+3t$, $y=2+3t$.', 'متجه التوجيه هو $\\overrightarrow{AB}=(3,3)$ لا النقطة $B$: $x=1+3t$، $y=2+3t$.', 'The direction vector is $\\overrightarrow{AB}=(3,3)$, not the point $B$: $x=1+3t$, $y=2+3t$.')
        },
        check: {
            prompt: say('$(5,7)$ puntua $x=1+2t$, $y=3+2t$ zuzenean dago?', '¿Está $(5,7)$ en la recta $x=1+2t$, $y=3+2t$?', 'هل $(5,7)$ على المستقيم $x=1+2t$، $y=3+2t$؟', 'Is $(5,7)$ on the line $x=1+2t$, $y=3+2t$?'),
            options: [say('Bai, $t=2$ balioarekin', 'Sí, con $t=2$', 'نعم، عندما $t=2$', 'Yes, with $t=2$'), say('Ez', 'No', 'لا', 'No'), say('Bai, $t=4$ balioarekin', 'Sí, con $t=4$', 'نعم، عندما $t=4$', 'Yes, with $t=4$')],
            correctIndex: 0,
            explanation: say('$5=1+2t$ eta $7=3+2t$ ekuazioek biek ematen dute $t=2$.', '$5=1+2t$ y $7=3+2t$ dan las dos $t=2$.', '$5=1+2t$ و$7=3+2t$ تعطيان كلتاهما $t=2$.', '$5=1+2t$ and $7=3+2t$ both give $t=2$.')
        }
    },
    continuous: {
        mistake: {
            wrong: say('$\\frac{x-4}{2}=\\frac{y+5}{3}$ zuzena $(-4,5)$ puntutik pasatzen da.', 'La recta $\\frac{x-4}{2}=\\frac{y+5}{3}$ pasa por $(-4,5)$.', 'المستقيم $\\frac{x-4}{2}=\\frac{y+5}{3}$ يمر بـ $(-4,5)$.', 'The line $\\frac{x-4}{2}=\\frac{y+5}{3}$ goes through $(-4,5)$.'),
            right: say('Zenbakiak zeinua aldatuta irakurtzen dira: $(4,-5)$ puntutik pasatzen da.', 'Los números se leen con el signo cambiado: pasa por $(4,-5)$.', 'تُقرأ الأعداد بإشارة معكوسة: يمر بـ $(4,-5)$.', 'Read the numbers with the opposite sign: it goes through $(4,-5)$.')
        },
        check: {
            prompt: say('Zein da $\\frac{x+2}{3}=\\frac{y-7}{6}$ zuzenaren malda?', '¿Cuál es la pendiente de la recta $\\frac{x+2}{3}=\\frac{y-7}{6}$?', 'ما ميل المستقيم $\\frac{x+2}{3}=\\frac{y-7}{6}$؟', 'What is the slope of the line $\\frac{x+2}{3}=\\frac{y-7}{6}$?'),
            options: [same('$\\frac{1}{2}$'), same('$2$'), same('$6$')],
            correctIndex: 1,
            explanation: say('Norabide-bektorea $(3,6)$ da: $m=\\frac{6}{3}=2$.', 'El vector director es $(3,6)$: $m=\\frac{6}{3}=2$.', 'متجه التوجيه $(3,6)$: $m=\\frac{6}{3}=2$.', 'The direction vector is $(3,6)$: $m=\\frac{6}{3}=2$.')
        }
    },
    'general-explicit': {
        mistake: {
            wrong: say('$2x+4y-8=0$ zuzenaren malda 2 da.', 'La pendiente de $2x+4y-8=0$ es 2.', 'ميل $2x+4y-8=0$ هو 2.', 'The slope of $2x+4y-8=0$ is 2.'),
            right: say('Lehenik $y$ askatu: $y=-\\frac{1}{2}x+2$; malda $-\\frac{1}{2}$ da.', 'Primero se despeja $y$: $y=-\\frac{1}{2}x+2$; la pendiente es $-\\frac{1}{2}$.', 'نعزل $y$ أولًا: $y=-\\frac{1}{2}x+2$؛ والميل $-\\frac{1}{2}$.', 'First solve for $y$: $y=-\\frac{1}{2}x+2$; the slope is $-\\frac{1}{2}$.')
        },
        check: {
            prompt: say('$(-B,A)$ bektorea $Ax+By+C=0$ zuzenaren norabide-bektorea da. Zein da $3x-5y+1=0$ zuzenarena?', 'El vector $(-B,A)$ es director de $Ax+By+C=0$. ¿Cuál es el de $3x-5y+1=0$?', 'المتجه $(-B,A)$ متجه توجيه لـ $Ax+By+C=0$. فما متجه $3x-5y+1=0$؟', 'The vector $(-B,A)$ is a direction vector of $Ax+By+C=0$. Which is the one of $3x-5y+1=0$?'),
            options: [same('$(3,-5)$'), same('$(5,3)$'), same('$(-5,3)$')],
            correctIndex: 1,
            explanation: same('$A=3,\\quad B=-5\\ \\to\\ (5,3)$')
        }
    },
    slope: {
        mistake: {
            wrong: say('$A(1,3)$ eta $B(4,9)$ puntuekin, $m=\\frac{4-1}{9-3}=\\frac{1}{2}$.', 'Con $A(1,3)$ y $B(4,9)$, $m=\\frac{4-1}{9-3}=\\frac{1}{2}$.', 'مع $A(1,3)$ و$B(4,9)$: $m=\\frac{4-1}{9-3}=\\frac{1}{2}$.', 'With $A(1,3)$ and $B(4,9)$, $m=\\frac{4-1}{9-3}=\\frac{1}{2}$.'),
            right: say('Goian $y$ letren kendura doa: $m=\\frac{9-3}{4-1}=2$.', 'Arriba va la diferencia de las $y$: $m=\\frac{9-3}{4-1}=2$.', 'في البسط فرق قيم $y$: $m=\\frac{9-3}{4-1}=2$.', 'The difference of the $y$ values goes on top: $m=\\frac{9-3}{4-1}=2$.')
        },
        check: {
            prompt: say('Zein da $(0,4)$ eta $(2,0)$ puntuetatik pasatzen den zuzenaren malda?', '¿Qué pendiente tiene la recta que pasa por $(0,4)$ y $(2,0)$?', 'ما ميل المستقيم المار بـ $(0,4)$ و$(2,0)$؟', 'What is the slope of the line through $(0,4)$ and $(2,0)$?'),
            options: [same('$-2$'), same('$2$'), same('$-\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: same('$m=\\frac{0-4}{2-0}=-2$')
        }
    },
    'parallel-perpendicular': {
        mistake: {
            wrong: say('$y=5x$ zuzenaren perpendikularraren malda $-5$ da.', 'La perpendicular a $y=5x$ tiene pendiente $-5$.', 'العمودي على $y=5x$ ميله $-5$.', 'The perpendicular to $y=5x$ has slope $-5$.'),
            right: say('Alderantzizkoa da, zeinua aldatuta: $-\\frac{1}{5}$, $5\\cdot\\left(-\\frac{1}{5}\\right)=-1$ delako.', 'Es la inversa cambiada de signo: $-\\frac{1}{5}$, porque $5\\cdot\\left(-\\frac{1}{5}\\right)=-1$.', 'هو المقلوب بإشارة معكوسة: $-\\frac{1}{5}$، لأن $5\\cdot\\left(-\\frac{1}{5}\\right)=-1$.', 'It is the reciprocal with the sign changed: $-\\frac{1}{5}$, because $5\\cdot\\left(-\\frac{1}{5}\\right)=-1$.')
        },
        check: {
            prompt: say('Zein da $y=-3x+2$ zuzenaren perpendikular baten malda?', '¿Qué pendiente tiene una perpendicular a $y=-3x+2$?', 'ما ميل مستقيم عمودي على $y=-3x+2$؟', 'What is the slope of a line perpendicular to $y=-3x+2$?'),
            options: [same('$3$'), same('$-\\frac{1}{3}$'), same('$\\frac{1}{3}$')],
            correctIndex: 2,
            explanation: same('$-3\\cdot\\frac{1}{3}=-1$')
        }
    },
    'relative-position': {
        mistake: {
            wrong: say('$y=2x+3$ eta $y=2x-1$ puntu batean mozten dira, jatorriko ordenatu desberdina dutelako.', '$y=2x+3$ e $y=2x-1$ se cortan en un punto, porque tienen distinta ordenada en el origen.', '$y=2x+3$ و$y=2x-1$ يتقاطعان في نقطة لأن الجزء المقطوع مختلف.', '$y=2x+3$ and $y=2x-1$ cross at one point, because their y-intercepts are different.'),
            right: say('Malda bera dute: paraleloak dira eta ez dira inoiz mozten.', 'Tienen la misma pendiente: son paralelas y no se cortan nunca.', 'لهما الميل نفسه: متوازيان ولا يتقاطعان أبدًا.', 'They have the same slope: they are parallel and never cross.')
        },
        check: {
            prompt: say('Nolakoak dira $2x-y=3$ eta $4x-2y=6$ zuzenak?', '¿Cómo son las rectas $2x-y=3$ y $4x-2y=6$?', 'ما وضع المستقيمين $2x-y=3$ و$4x-2y=6$؟', 'How are the lines $2x-y=3$ and $4x-2y=6$ placed?'),
            options: [say('Bat datozenak', 'Coincidentes', 'منطبقان', 'Coincident'), say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting')],
            correctIndex: 0,
            explanation: same('$\\frac{2}{4}=\\frac{-1}{-2}=\\frac{3}{6}$')
        }
    },
    bisector: {
        mistake: {
            wrong: say('$A(1,2)$ eta $B(5,6)$ zuzenkiaren erdibitzailea $A$ puntutik pasatzen da, $AB$ zuzenkiaren perpendikular.', 'La mediatriz de $A(1,2)$ y $B(5,6)$ pasa por $A$, perpendicular a $AB$.', 'محور القطعة بين $A(1,2)$ و$B(5,6)$ يمر بـ $A$ عموديًا على $AB$.', 'The perpendicular bisector of $A(1,2)$ and $B(5,6)$ goes through $A$, perpendicular to $AB$.'),
            right: say('Erdiko puntutik pasatzen da, $(3,4)$ puntutik: horrela, haren puntuak $A$ eta $B$ puntuetatik distantzia berera daude.', 'Pasa por el punto medio, $(3,4)$: así sus puntos están a la misma distancia de $A$ y de $B$.', 'يمر بالمنتصف $(3,4)$: وهكذا تكون نقاطه على المسافة نفسها من $A$ ومن $B$.', 'It goes through the midpoint, $(3,4)$: that way its points are the same distance from $A$ and $B$.')
        },
        check: {
            prompt: say('$AB$ zuzenkiaren erdibitzaileko $P$ puntu batek $d(P,A)=7$ betetzen du. Zenbat da $d(P,B)$?', 'Un punto $P$ de la mediatriz del segmento $AB$ cumple $d(P,A)=7$. ¿Cuánto vale $d(P,B)$?', 'نقطة $P$ على محور القطعة $AB$ تحقق $d(P,A)=7$. فما قيمة $d(P,B)$؟', 'A point $P$ on the perpendicular bisector of the segment $AB$ has $d(P,A)=7$. What is $d(P,B)$?'),
            options: [same('$14$'), same('$7$'), same('$3{,}5$')],
            correctIndex: 1,
            explanation: say('Erdibitzailearen puntuak $A$ eta $B$ puntuetatik distantzia berera daude.', 'Los puntos de la mediatriz están a la misma distancia de $A$ y de $B$.', 'نقاط محور القطعة على المسافة نفسها من $A$ ومن $B$.', 'The points of the perpendicular bisector are the same distance from $A$ and $B$.')
        }
    },
    circle: {
        mistake: {
            wrong: say('$(2,-3)$ zentroko eta 2 erradioko zirkunferentzia $(x+2)^{2}+(y-3)^{2}=4$ da.', 'La circunferencia de centro $(2,-3)$ y radio 2 es $(x+2)^{2}+(y-3)^{2}=4$.', 'الدائرة التي مركزها $(2,-3)$ ونصف قطرها 2 هي $(x+2)^{2}+(y-3)^{2}=4$.', 'The circle with centre $(2,-3)$ and radius 2 is $(x+2)^{2}+(y-3)^{2}=4$.'),
            right: say('Zentroaren koordenatuak kendu egiten dira: $(x-2)^{2}+(y+3)^{2}=4$.', 'Las coordenadas del centro se restan: $(x-2)^{2}+(y+3)^{2}=4$.', 'إحداثيا المركز يُطرحان: $(x-2)^{2}+(y+3)^{2}=4$.', 'The centre\'s coordinates are subtracted: $(x-2)^{2}+(y+3)^{2}=4$.')
        },
        check: {
            prompt: say('$(x-3)^{2}+(y+5)^{2}=16$ zirkunferentziaren zentroa $C$ da. Zein da $C$?', 'La circunferencia $(x-3)^{2}+(y+5)^{2}=16$ tiene centro $C$. ¿Cuál es $C$?', 'الدائرة $(x-3)^{2}+(y+5)^{2}=16$ مركزها $C$. فما $C$؟', 'The circle $(x-3)^{2}+(y+5)^{2}=16$ has centre $C$. What is $C$?'),
            options: [same('$(3,-5)$'), same('$(-3,5)$'), same('$(3,5)$')],
            correctIndex: 0,
            explanation: say('Zentroa $(3,-5)$ da, eta erradioa, 4.', 'El centro es $(3,-5)$, y el radio, 4.', 'المركز $(3,-5)$ ونصف القطر 4.', 'The centre is $(3,-5)$ and the radius 4.')
        }
    },
    polygons: {
        mistake: {
            wrong: say('$ABCD$ paralelogramoan, laugarren erpina $D=A+B-C$ da.', 'En el paralelogramo $ABCD$, el cuarto vértice es $D=A+B-C$.', 'في متوازي الأضلاع $ABCD$ الرأس الرابع $D=A+B-C$.', 'In the parallelogram $ABCD$, the fourth vertex is $D=A+B-C$.'),
            right: say('$\\overrightarrow{AB}=\\overrightarrow{DC}$ denez, $D=A+C-B$: $D$ erpinaren aurkakoa den $B$ kentzen da.', 'Como $\\overrightarrow{AB}=\\overrightarrow{DC}$, $D=A+C-B$: se resta $B$, el vértice opuesto a $D$.', 'بما أن $\\overrightarrow{AB}=\\overrightarrow{DC}$ فإن $D=A+C-B$: يُطرح $B$، الرأس المقابل لـ $D$.', 'Since $\\overrightarrow{AB}=\\overrightarrow{DC}$, $D=A+C-B$: subtract $B$, the vertex opposite $D$.')
        },
        check: {
            prompt: say('$A(0,0)$, $B(4,0)$ eta $C(5,3)$ $ABCD$ paralelogramoaren segidako erpinak dira. Zein da $D$?', '$A(0,0)$, $B(4,0)$ y $C(5,3)$ son vértices consecutivos del paralelogramo $ABCD$. ¿Cuál es $D$?', '$A(0,0)$ و$B(4,0)$ و$C(5,3)$ رؤوس متتالية لمتوازي الأضلاع $ABCD$. فما $D$؟', '$A(0,0)$, $B(4,0)$ and $C(5,3)$ are consecutive vertices of the parallelogram $ABCD$. What is $D$?'),
            options: [same('$(9,3)$'), same('$(4,3)$'), same('$(1,3)$')],
            correctIndex: 2,
            explanation: same('$D=(0+5-4,\\ 0+3-0)=(1,3)$')
        }
    }
}
