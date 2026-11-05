import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 · Zientziak — the
   typical mistake and the «Check it» question of every lesson. Plain data
   (no JSX) so the tests can import it; lessons.tsx merges it into the
   topics. Formulas write \sin, \tan, \csc and \cot (localizeNames gives
   each language its names). The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. The trigonometric values are checked in
   tests/trigonometria-batx1z-content.test.ts.
   ========================================================================== */

export type TrigonometryTopicId =
    | 'radians-review' | 'reciprocal' | 'identities'
    | 'sum-formulas' | 'difference-tangent' | 'known-ratios'
    | 'double-angle' | 'half-angle' | 'sum-to-product'
    | 'basic-equations' | 'quadratic-equations' | 'formula-equations'
    | 'trig-graphs' | 'transformations' | 'periodic-models'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trigonometryLessonChecks: Record<TrigonometryTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The six ratios ---------- */
    'radians-review': {
        mistake: {
            wrong: same('$60°=60\\cdot\\frac{180}{\\pi}$'),
            right: say('Radianetara pasatzeko, bider $\\frac{\\pi}{180}$: $60°=\\frac{\\pi}{3}$.', 'Para pasar a radianes se multiplica por $\\frac{\\pi}{180}$: $60°=\\frac{\\pi}{3}$.', 'للتحويل إلى الراديان نضرب في $\\frac{\\pi}{180}$: $60°=\\frac{\\pi}{3}$.', 'To convert to radians, multiply by $\\frac{\\pi}{180}$: $60°=\\frac{\\pi}{3}$.')
        },
        check: {
            prompt: say('Zenbat gradu dira $\\frac{\\pi}{5}$ rad?', '¿Cuántos grados son $\\frac{\\pi}{5}$ rad?', 'كم درجة تساوي $\\frac{\\pi}{5}$ rad؟', 'How many degrees is $\\frac{\\pi}{5}$ rad?'),
            options: [same('$36°$'), same('$900°$'), same('$72°$')],
            correctIndex: 0,
            explanation: same('$\\frac{180°}{5}=36°$')
        }
    },
    reciprocal: {
        mistake: {
            wrong: same('$\\sec\\alpha=\\frac{1}{\\sin\\alpha}$'),
            right: say('Sekantea kosinuaren alderantzizkoa da: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$. Sinuarena kosekantea da.', 'La secante es la inversa del coseno: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$. La del seno es la cosecante.', 'القاطع مقلوب جيب التمام: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$. ومقلوب الجيب هو قاطع التمام.', 'The secant is the reciprocal of the cosine: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$. That of the sine is the cosecant.')
        },
        check: {
            prompt: say('$\\sin\\alpha=\\frac{2}{3}$ da. Zenbat da $\\csc\\alpha$?', '$\\sin\\alpha=\\frac{2}{3}$. ¿Cuánto vale $\\csc\\alpha$?', '$\\sin\\alpha=\\frac{2}{3}$. كم قيمة $\\csc\\alpha$؟', '$\\sin\\alpha=\\frac{2}{3}$. What is $\\csc\\alpha$?'),
            options: [same('$\\frac{3}{\\sqrt{5}}$'), same('$\\frac{3}{2}$'), same('$-\\frac{2}{3}$')],
            correctIndex: 1,
            explanation: same('$\\csc\\alpha=\\frac{1}{\\sin\\alpha}=\\frac{3}{2}$')
        }
    },
    identities: {
        mistake: {
            wrong: same('$\\frac{\\sin\\alpha+\\cos\\alpha}{\\sin\\alpha}=\\cos\\alpha$'),
            right: say('Faktore bat bakarrik sinplifikatzen da, ez batugai bat: $\\frac{\\sin\\alpha+\\cos\\alpha}{\\sin\\alpha}=1+\\cot\\alpha$.', 'Solo se simplifica un factor, no un sumando: $\\frac{\\sin\\alpha+\\cos\\alpha}{\\sin\\alpha}=1+\\cot\\alpha$.', 'يُختصر العامل فقط لا الحد المجموع: $\\frac{\\sin\\alpha+\\cos\\alpha}{\\sin\\alpha}=1+\\cot\\alpha$.', 'Only a factor cancels, not a term of a sum: $\\frac{\\sin\\alpha+\\cos\\alpha}{\\sin\\alpha}=1+\\cot\\alpha$.')
        },
        check: {
            prompt: say('Zeren berdina da $\\frac{\\sin\\alpha}{\\tan\\alpha}$?', '¿A qué es igual $\\frac{\\sin\\alpha}{\\tan\\alpha}$?', 'ما الذي يساوي $\\frac{\\sin\\alpha}{\\tan\\alpha}$؟', 'What is $\\frac{\\sin\\alpha}{\\tan\\alpha}$ equal to?'),
            options: [same('$\\sin^2\\alpha$'), same('$\\sec\\alpha$'), same('$\\cos\\alpha$')],
            correctIndex: 2,
            explanation: same('$\\sin\\alpha\\cdot\\frac{\\cos\\alpha}{\\sin\\alpha}=\\cos\\alpha$')
        }
    },

    /* ---------- 2. Sums and differences ---------- */
    'sum-formulas': {
        mistake: {
            wrong: same('$\\sin(30°+60°)=\\sin 30°+\\sin 60°$'),
            right: say('Batuketaren sinua ez da sinuen batuketa: $\\sin 90°=1$, baina $\\sin 30°+\\sin 60°\\approx 1{,}37$.', 'El seno de una suma no es la suma de los senos: $\\sin 90°=1$, pero $\\sin 30°+\\sin 60°\\approx 1{,}37$.', 'جيب المجموع ليس مجموع الجيبين: $\\sin 90°=1$، لكن $\\sin 30°+\\sin 60°\\approx 1{,}37$.', 'The sine of a sum is not the sum of the sines: $\\sin 90°=1$, but $\\sin 30°+\\sin 60°\\approx 1{,}37$.')
        },
        check: {
            prompt: say('Zein da $\\cos(\\alpha+\\beta)$ adierazpenaren formula?', '¿Cuál es la fórmula de $\\cos(\\alpha+\\beta)$?', 'ما صيغة $\\cos(\\alpha+\\beta)$؟', 'What is the formula for $\\cos(\\alpha+\\beta)$?'),
            options: [same('$\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$'), same('$\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$'), same('$\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$')],
            correctIndex: 0,
            explanation: say('Batuketaren kosinuak kosinuak biderkatzen ditu eta sinuen biderkadura kentzen du.', 'El coseno de la suma multiplica los cosenos y resta el producto de los senos.', 'جيب تمام المجموع يضرب جيبي التمام ويطرح جداء الجيبين.', 'The cosine of the sum multiplies the cosines and subtracts the product of the sines.')
        }
    },
    'difference-tangent': {
        mistake: {
            wrong: same('$\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}$'),
            right: say('Izendatzailean kontrako zeinua doa: $\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}$.', 'En el denominador va el signo contrario: $\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}$.', 'في المقام الإشارة المعاكسة: $\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}$.', 'The denominator takes the opposite sign: $\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}$.')
        },
        check: {
            prompt: say('Zein da $\\cos(\\alpha-\\beta)$ adierazpenaren formula?', '¿Cuál es la fórmula de $\\cos(\\alpha-\\beta)$?', 'ما صيغة $\\cos(\\alpha-\\beta)$؟', 'What is the formula for $\\cos(\\alpha-\\beta)$?'),
            options: [same('$\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$'), same('$\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$'), same('$\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta$')],
            correctIndex: 1,
            explanation: say('Kenketan, kosinuaren zeinua + bihurtzen da.', 'En la resta, el signo del coseno pasa a +.', 'في الفرق تصير إشارة جيب التمام +.', 'In the difference, the sign of the cosine turns into +.')
        }
    },
    'known-ratios': {
        mistake: {
            wrong: same('$\\sin\\alpha=\\frac{3}{5}\\ \\to\\ \\cos\\alpha=1-\\frac{3}{5}=\\frac{2}{5}$'),
            right: say('Karratuek egiten dute 1: $\\cos\\alpha=\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$.', 'Lo que suma 1 son los cuadrados: $\\cos\\alpha=\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$.', 'مجموع المربعين هو الذي يساوي 1: $\\cos\\alpha=\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$.', 'It is the squares that add up to 1: $\\cos\\alpha=\\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$.')
        },
        check: {
            prompt: say('α eta β zorrotzak dira, $\\sin\\alpha=\\frac{4}{5}$ eta $\\cos\\beta=\\frac{3}{5}$. Zenbat da $\\sin(\\alpha+\\beta)$?', 'α y β son agudos, $\\sin\\alpha=\\frac{4}{5}$ y $\\cos\\beta=\\frac{3}{5}$. ¿Cuánto vale $\\sin(\\alpha+\\beta)$?', 'α وβ حادتان، و$\\sin\\alpha=\\frac{4}{5}$ و$\\cos\\beta=\\frac{3}{5}$. كم قيمة $\\sin(\\alpha+\\beta)$؟', 'α and β are acute, $\\sin\\alpha=\\frac{4}{5}$ and $\\cos\\beta=\\frac{3}{5}$. What is $\\sin(\\alpha+\\beta)$?'),
            options: [same('$\\frac{7}{5}$'), same('$-\\frac{7}{25}$'), same('$\\frac{24}{25}$')],
            correctIndex: 2,
            explanation: same('$\\frac{4}{5}\\cdot\\frac{3}{5}+\\frac{3}{5}\\cdot\\frac{4}{5}=\\frac{24}{25}$')
        }
    },

    /* ---------- 3. Double and half angle ---------- */
    'double-angle': {
        mistake: {
            wrong: same('$\\sin 60°=2\\cdot\\sin 30°=1$'),
            right: say('Bikoitzaren sinua ez da sinuaren bikoitza: $\\sin 60°=2\\sin 30°\\cos 30°=\\frac{\\sqrt{3}}{2}$.', 'El seno del doble no es el doble del seno: $\\sin 60°=2\\sin 30°\\cos 30°=\\frac{\\sqrt{3}}{2}$.', 'جيب الضعف ليس ضعف الجيب: $\\sin 60°=2\\sin 30°\\cos 30°=\\frac{\\sqrt{3}}{2}$.', 'The sine of the double is not double the sine: $\\sin 60°=2\\sin 30°\\cos 30°=\\frac{\\sqrt{3}}{2}$.')
        },
        check: {
            prompt: say('$\\sin\\alpha=\\frac{1}{3}$ da. Zenbat da $\\cos 2\\alpha$?', '$\\sin\\alpha=\\frac{1}{3}$. ¿Cuánto vale $\\cos 2\\alpha$?', '$\\sin\\alpha=\\frac{1}{3}$. كم قيمة $\\cos 2\\alpha$؟', '$\\sin\\alpha=\\frac{1}{3}$. What is $\\cos 2\\alpha$?'),
            options: [same('$\\frac{7}{9}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{9}$')],
            correctIndex: 0,
            explanation: same('$\\cos 2\\alpha=1-2\\cdot\\frac{1}{9}=\\frac{7}{9}$')
        }
    },
    'half-angle': {
        mistake: {
            wrong: same('$\\sin 30°=\\frac{\\sin 60°}{2}$'),
            right: say('Angeluaren erdiak ez du sinuaren erdia ematen: $\\sin 30°=\\frac{1}{2}$, baina $\\frac{\\sin 60°}{2}\\approx 0{,}43$.', 'La mitad del ángulo no da la mitad del seno: $\\sin 30°=\\frac{1}{2}$, pero $\\frac{\\sin 60°}{2}\\approx 0{,}43$.', 'نصف الزاوية لا يعطي نصف الجيب: $\\sin 30°=\\frac{1}{2}$، لكن $\\frac{\\sin 60°}{2}\\approx 0{,}43$.', 'Half the angle does not give half the sine: $\\sin 30°=\\frac{1}{2}$, but $\\frac{\\sin 60°}{2}\\approx 0{,}43$.')
        },
        check: {
            prompt: say('$\\cos\\alpha=\\frac{1}{9}$ da, eta α zorrotza da. Zenbat da $\\sin\\frac{\\alpha}{2}$?', '$\\cos\\alpha=\\frac{1}{9}$ y α es agudo. ¿Cuánto vale $\\sin\\frac{\\alpha}{2}$?', '$\\cos\\alpha=\\frac{1}{9}$ وα حادة. كم قيمة $\\sin\\frac{\\alpha}{2}$؟', '$\\cos\\alpha=\\frac{1}{9}$ and α is acute. What is $\\sin\\frac{\\alpha}{2}$?'),
            options: [same('$\\frac{\\sqrt{5}}{3}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{18}$')],
            correctIndex: 1,
            explanation: same('$\\sqrt{\\frac{1-\\frac{1}{9}}{2}}=\\sqrt{\\frac{4}{9}}=\\frac{2}{3}$')
        }
    },
    'sum-to-product': {
        mistake: {
            wrong: same('$\\sin 50°+\\sin 10°=\\sin 60°$'),
            right: say('Angeluak ez dira batzen: $\\sin 50°+\\sin 10°=2\\sin 30°\\cos 20°=\\cos 20°$.', 'Los ángulos no se suman: $\\sin 50°+\\sin 10°=2\\sin 30°\\cos 20°=\\cos 20°$.', 'الزاويتان لا تُجمعان: $\\sin 50°+\\sin 10°=2\\sin 30°\\cos 20°=\\cos 20°$.', 'The angles are not added: $\\sin 50°+\\sin 10°=2\\sin 30°\\cos 20°=\\cos 20°$.')
        },
        check: {
            prompt: say('Zenbat da $\\cos 165°+\\cos 75°$?', '¿Cuánto vale $\\cos 165°+\\cos 75°$?', 'كم قيمة $\\cos 165°+\\cos 75°$؟', 'What is $\\cos 165°+\\cos 75°$?'),
            options: [same('$\\cos 240°$'), same('$-\\frac{\\sqrt{2}}{2}$'), same('$\\frac{\\sqrt{2}}{2}$')],
            correctIndex: 1,
            explanation: same('$2\\cos 120°\\cos 45°=2\\cdot\\left(-\\frac{1}{2}\\right)\\cdot\\frac{\\sqrt{2}}{2}=-\\frac{\\sqrt{2}}{2}$')
        }
    },

    /* ---------- 4. Equations ---------- */
    'basic-equations': {
        mistake: {
            wrong: same('$\\sin x=\\frac{1}{2}\\ \\to\\ x=30°$'),
            right: say('Sinu bera duen beste angelua falta da: $x=30°$ eta $x=150°$, birak gehituta.', 'Falta el otro ángulo con el mismo seno: $x=30°$ y $x=150°$, más las vueltas.', 'تنقص الزاوية الأخرى التي لها الجيب نفسه: $x=30°$ و$x=150°$، مع الدورات.', 'The other angle with the same sine is missing: $x=30°$ and $x=150°$, plus the turns.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $\\tan x=1$ ekuazioak, 0°-tik 360°-ra?', '¿Cuántas soluciones tiene $\\tan x=1$ entre 0° y 360°?', 'كم حلًّا للمعادلة $\\tan x=1$ بين 0° و360°؟', 'How many solutions does $\\tan x=1$ have between 0° and 360°?'),
            options: [same('$1$'), same('$2$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Tangentea 180° bakoitzean errepikatzen da: $x=45°$ eta $x=225°$.', 'La tangente se repite cada 180°: $x=45°$ y $x=225°$.', 'يتكرر الظل كل 180°: $x=45°$ و$x=225°$.', 'The tangent repeats every 180°: $x=45°$ and $x=225°$.')
        }
    },
    'quadratic-equations': {
        mistake: {
            wrong: same('$\\sin^2x-3\\sin x+2=0\\ \\to\\ \\sin x=1,\\ \\sin x=2$'),
            right: say('$\\sin x=2$ ekuazioak ez du soluziorik: sinua $-1$ eta $1$ artean dago. $\\sin x=1$ bakarrik geratzen da: $x=90°$.', '$\\sin x=2$ no tiene solución: el seno está entre $-1$ y $1$. Solo queda $\\sin x=1$: $x=90°$.', '$\\sin x=2$ لا حل لها: الجيب بين $-1$ و$1$. يبقى فقط $\\sin x=1$: $x=90°$.', '$\\sin x=2$ has no solution: the sine lies between $-1$ and $1$. Only $\\sin x=1$ is left: $x=90°$.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $\\cos^2x=\\frac{1}{4}$ ekuazioak, 0°-tik 360°-ra?', '¿Cuántas soluciones tiene $\\cos^2x=\\frac{1}{4}$ entre 0° y 360°?', 'كم حلًّا للمعادلة $\\cos^2x=\\frac{1}{4}$ بين 0° و360°؟', 'How many solutions does $\\cos^2x=\\frac{1}{4}$ have between 0° and 360°?'),
            options: [same('$2$'), same('$1$'), same('$4$')],
            correctIndex: 2,
            explanation: say('$\\cos x=\\frac{1}{2}$ ekuazioak 60° eta 300° ematen ditu, eta $\\cos x=-\\frac{1}{2}$ ekuazioak, 120° eta 240°.', '$\\cos x=\\frac{1}{2}$ da 60° y 300°, y $\\cos x=-\\frac{1}{2}$, 120° y 240°.', '$\\cos x=\\frac{1}{2}$ تعطي 60° و300°، و$\\cos x=-\\frac{1}{2}$ تعطي 120° و240°.', '$\\cos x=\\frac{1}{2}$ gives 60° and 300°, and $\\cos x=-\\frac{1}{2}$ gives 120° and 240°.')
        }
    },
    'formula-equations': {
        mistake: {
            wrong: same('$\\sin 2x=\\sin x\\ \\to\\ 2\\cos x=1$'),
            right: say('$\\sin x$ adierazpenaz zatitzean, $\\sin x=0$ duten soluzioak galtzen dira: 0° eta 180°.', 'Al dividir entre $\\sin x$ se pierden las soluciones con $\\sin x=0$: 0° y 180°.', 'عند القسمة على $\\sin x$ تضيع الحلول التي فيها $\\sin x=0$: 0° و180°.', 'Dividing by $\\sin x$ loses the solutions with $\\sin x=0$: 0° and 180°.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $\\cos 2x=\\sin x$ ekuazioak, 0°-tik 360°-ra?', '¿Cuántas soluciones tiene $\\cos 2x=\\sin x$ entre 0° y 360°?', 'كم حلًّا للمعادلة $\\cos 2x=\\sin x$ بين 0° و360°؟', 'How many solutions does $\\cos 2x=\\sin x$ have between 0° and 360°?'),
            options: [same('$2$'), same('$3$'), same('$4$')],
            correctIndex: 1,
            explanation: say('$2\\sin^2x+\\sin x-1=0$ ekuaziotik, $\\sin x=\\frac{1}{2}$ (30° eta 150°) eta $\\sin x=-1$ (270°).', 'De $2\\sin^2x+\\sin x-1=0$ sale $\\sin x=\\frac{1}{2}$ (30° y 150°) y $\\sin x=-1$ (270°).', 'من $2\\sin^2x+\\sin x-1=0$ نحصل على $\\sin x=\\frac{1}{2}$ (30° و150°) و$\\sin x=-1$ (270°).', 'From $2\\sin^2x+\\sin x-1=0$ you get $\\sin x=\\frac{1}{2}$ (30° and 150°) and $\\sin x=-1$ (270°).')
        }
    },

    /* ---------- 5. Functions ---------- */
    'trig-graphs': {
        mistake: {
            wrong: say('$\\tan x$ funtzioaren periodoa $2\\pi$ da, sinuarena bezala.', 'El periodo de $\\tan x$ es $2\\pi$, como el del seno.', 'دور $\\tan x$ هو $2\\pi$ مثل دور الجيب.', 'The period of $\\tan x$ is $2\\pi$, like that of the sine.'),
            right: say('Tangentea bira erdi bakoitzean errepikatzen da: $\\tan(x+\\pi)=\\tan x$; beraz, periodoa π da.', 'La tangente se repite cada media vuelta: $\\tan(x+\\pi)=\\tan x$, así que su periodo es π.', 'يتكرر الظل كل نصف دورة: $\\tan(x+\\pi)=\\tan x$، إذن دوره π.', 'The tangent repeats every half turn: $\\tan(x+\\pi)=\\tan x$, so its period is π.')
        },
        check: {
            prompt: say('0 eta $2\\pi$ artean, non ez da existitzen $\\tan x$?', '¿Dónde no existe $\\tan x$ entre 0 y $2\\pi$?', 'أين لا توجد $\\tan x$ بين 0 و$2\\pi$؟', 'Where does $\\tan x$ not exist between 0 and $2\\pi$?'),
            options: [
                say('$x=0$ eta $x=\\pi$ puntuetan', 'En $x=0$ y $x=\\pi$', 'عند $x=0$ و$x=\\pi$', 'At $x=0$ and $x=\\pi$'),
                say('$x=\\frac{\\pi}{2}$ eta $x=\\frac{3\\pi}{2}$ puntuetan', 'En $x=\\frac{\\pi}{2}$ y $x=\\frac{3\\pi}{2}$', 'عند $x=\\frac{\\pi}{2}$ و$x=\\frac{3\\pi}{2}$', 'At $x=\\frac{\\pi}{2}$ and $x=\\frac{3\\pi}{2}$'),
                say('$x=\\pi$ puntuan bakarrik', 'Solo en $x=\\pi$', 'عند $x=\\pi$ فقط', 'Only at $x=\\pi$')
            ],
            correctIndex: 1,
            explanation: say('Ez da existitzen $\\cos x=0$ denean: $\\frac{\\pi}{2}$ eta $\\frac{3\\pi}{2}$ puntuetan.', 'No existe donde $\\cos x=0$: en $\\frac{\\pi}{2}$ y en $\\frac{3\\pi}{2}$.', 'لا توجد حيث $\\cos x=0$: عند $\\frac{\\pi}{2}$ و$\\frac{3\\pi}{2}$.', 'It does not exist where $\\cos x=0$: at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.')
        }
    },
    transformations: {
        mistake: {
            wrong: say('$y=\\sin(2x-\\pi)$: desfasea π da.', '$y=\\sin(2x-\\pi)$: el desfase es π.', '$y=\\sin(2x-\\pi)$: انزياح الطور π.', '$y=\\sin(2x-\\pi)$: the phase shift is π.'),
            right: say('Barrukoa 0 da $x=\\frac{\\pi}{2}$ denean: desfasea $\\frac{\\pi}{2}$ da.', 'Lo de dentro vale 0 en $x=\\frac{\\pi}{2}$: el desfase es $\\frac{\\pi}{2}$.', 'ما في الداخل يساوي 0 عند $x=\\frac{\\pi}{2}$: انزياح الطور $\\frac{\\pi}{2}$.', 'The inside is 0 at $x=\\frac{\\pi}{2}$: the phase shift is $\\frac{\\pi}{2}$.')
        },
        check: {
            prompt: say('Zein da $y=5\\sin\\frac{x}{2}$ funtzioaren periodoa?', '¿Cuál es el periodo de $y=5\\sin\\frac{x}{2}$?', 'ما دور الدالة $y=5\\sin\\frac{x}{2}$؟', 'What is the period of $y=5\\sin\\frac{x}{2}$?'),
            options: [same('$\\pi$'), same('$4\\pi$'), same('$10\\pi$')],
            correctIndex: 1,
            explanation: same('$T=\\frac{2\\pi}{\\frac{1}{2}}=4\\pi$')
        }
    },
    'periodic-models': {
        mistake: {
            wrong: say('20 m-ko diametroko noria: $A=20$', 'Noria de 20 m de diámetro: $A=20$', 'دولاب قطره 20 م: $A=20$', 'A wheel 20 m across: $A=20$'),
            right: say('Anplitudea erradioa da, diametroaren erdia: $A=10$.', 'La amplitud es el radio, la mitad del diámetro: $A=10$.', 'السعة هي نصف قطر الدولاب لا قطره: $A=10$.', 'The amplitude is the radius, half the diameter: $A=10$.')
        },
        check: {
            prompt: say('Magnitude bat 4 eta 10 artean oszilatzen da. Zein da haren anplitudea?', 'Una magnitud oscila entre 4 y 10. ¿Cuál es su amplitud?', 'كمية تتذبذب بين 4 و10. ما سعتها؟', 'A quantity oscillates between 4 and 10. What is its amplitude?'),
            options: [same('$6$'), same('$7$'), same('$3$')],
            correctIndex: 2,
            explanation: same('$A=\\frac{10-4}{2}=3$')
        }
    }
}
