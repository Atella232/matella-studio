import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SocialBivarTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — what
   the lessons that are new in Sociales tell. Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of
   the typical mistake. The line of X on Y is written, as Anaya does, also
   solved for y, so that both lines are drawn on the same axes.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const socialBivarLessonTexts: Record<SocialBivarTopicId, LessonTexts> = {
    'reading-r': {
        vocabulary: [
            say('sendoa', 'fuerte', 'قوي', 'strong'),
            say('ahula', 'débil', 'ضعيف', 'weak'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Hodei batean r begiz irakurtzen da: zeinua, hodeia gora ala behera doan; balio absolutua, puntuak zuzen batetik zein hurbil dauden. $|r|$ 1 zenbakitik hurbil badago, mendekotasuna sendoa da; 0 zenbakitik hurbil badago, ahula. $r=\\pm 1$ denean, puntu guztiak zuzen baten gainean daude.',
            'En una nube, r se lee a ojo: el signo, en si la nube sube o baja; el valor absoluto, en lo pegados que están los puntos a una recta. Si $|r|$ está cerca de 1, la dependencia es fuerte; si está cerca de 0, débil. Con $r=\\pm 1$, todos los puntos están sobre una recta.',
            'في السحابة يُقرأ r بالنظر: الإشارة من صعود السحابة أو هبوطها، والقيمة المطلقة من مدى التصاق النقاط بمستقيم. إذا كان $|r|$ قريبًا من 1 فالارتباط قوي، وإذا كان قريبًا من 0 فضعيف. ومع $r=\\pm 1$ تقع كل النقاط على مستقيم.',
            'In a cloud, r is read by eye: the sign, from whether the cloud rises or falls; the absolute value, from how close the points are to a straight line. If $|r|$ is close to 1, the dependence is strong; if close to 0, weak. With $r=\\pm 1$, all the points lie on a line.'
        ),
        examplePrompt: say('Hodei batek gora egiten du, baina nahiko sakabanatuta dago. Zein da bere r: 0,9; 0,5 ala −0,5?', 'Una nube sube pero está bastante dispersa. ¿Cuál es su r: 0,9; 0,5 o −0,5?', 'سحابة تصعد لكنها متفرقة إلى حد ما. ما r الخاص بها: 0.9 أم 0.5 أم ⁦−0.5⁩؟', 'A cloud rises but is quite spread out. What is its r: 0.9, 0.5 or −0.5?'),
        example: '',
        exampleAnswer: say('0,5: positiboa, gora egiten duelako, eta ahula, sakabanatuta dagoelako.', '0,5: positivo porque sube, y débil porque está dispersa.', '0.5: موجب لأنها تصعد، وضعيف لأنها متفرقة.', '0.5: positive because it rises, and weak because it is spread out.')
    },
    'line-xy': {
        definitions: [
            { term: say('Erregresio-koefizientea', 'Coeficiente de regresión', 'معامل الانحدار', 'Regression coefficient'), meaning: say('X-ren Y-rekiko zuzenean, $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$: y unitate bat igotzean x zenbat aldatzen den.', 'En la recta de X sobre Y, $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$: cuánto cambia x al subir y una unidad.', 'في مستقيم X على Y $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$: مقدار تغيّر x عندما تزيد y وحدة.', 'In the line of X on Y, $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$: how much x changes when y goes up by one.') }
        ],
        vocabulary: [
            say('askatu', 'despejar', 'نعزل', 'solve for'),
            say('estimatu', 'estimar', 'التقدير', 'estimate')
        ],
        explanation: say(
            'y-tik x estimatzeko, X-ren Y-rekiko zuzena behar da: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Bestearekin batera marrazteko, y askatzen da: haren malda $\\frac{\\sigma_y^2}{\\sigma_{xy}}$ da, eta hau ere $(\\bar{x},\\bar{y})$ puntutik pasatzen da.',
            'Para estimar x a partir de y hace falta la recta de X sobre Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Para dibujarla junto a la otra se despeja y: su pendiente es $\\frac{\\sigma_y^2}{\\sigma_{xy}}$, y también pasa por $(\\bar{x},\\bar{y})$.',
            'لتقدير x انطلاقًا من y نحتاج إلى مستقيم X على Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. ولرسمه مع الآخر نعزل y: ميله $\\frac{\\sigma_y^2}{\\sigma_{xy}}$، ويمرّ أيضًا بـ $(\\bar{x},\\bar{y})$.',
            'To estimate x from y you need the line of X on Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. To draw it next to the other, solve for y: its slope is $\\frac{\\sigma_y^2}{\\sigma_{xy}}$, and it also passes through $(\\bar{x},\\bar{y})$.'
        ),
        examplePrompt: say('$\\bar{x}=3$, $\\bar{y}=7$, $\\sigma_y^2=5$ eta $\\sigma_{xy}=2$. Estimatu x, $y=12$ denean.', 'Con $\\bar{x}=3$, $\\bar{y}=7$, $\\sigma_y^2=5$ y $\\sigma_{xy}=2$, estima x para $y=12$.', 'مع $\\bar{x}=3$ و$\\bar{y}=7$ و$\\sigma_y^2=5$ و$\\sigma_{xy}=2$ قدّر x عندما $y=12$.', 'With $\\bar{x}=3$, $\\bar{y}=7$, $\\sigma_y^2=5$ and $\\sigma_{xy}=2$, estimate x for $y=12$.'),
        example: same('$x=3+\\frac{2}{5}\\cdot(12-7)=5$'),
        exampleAnswer: say('$x=5$ ateratzen da.', 'Sale $x=5$.', 'نجد $x=5$.', 'It gives $x=5$.')
    },
    'both-lines': {
        vocabulary: [
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient'),
            say('ebaki', 'cortar', 'يتقاطع', 'cross'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            'Bi zuzenak, y askatuta, ardatz berean marrazten dira, eta $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira. Y-ren X-rekikoak $m_{yx}$ malda du; X-ren Y-rekikoak, $\\frac{1}{m_{xy}}$. Beraz, $r^2=m_{yx}\\cdot m_{xy}$ malda txikiena zati handiena da. Zenbat eta itxiago, orduan eta sendoagoa korrelazioa.',
            'Las dos rectas, con y despejada, se dibujan en los mismos ejes y se cortan en $(\\bar{x},\\bar{y})$. La de Y sobre X tiene pendiente $m_{yx}$; la de X sobre Y, $\\frac{1}{m_{xy}}$. Así, $r^2=m_{yx}\\cdot m_{xy}$ es la pendiente menor entre la mayor. Cuanto más cerradas, más fuerte la correlación.',
            'يُرسم المستقيمان بعد عزل y على المحاور نفسها، ويتقاطعان في $(\\bar{x},\\bar{y})$. ميل Y على X هو $m_{yx}$، وميل X على Y هو $\\frac{1}{m_{xy}}$. لذلك $r^2=m_{yx}\\cdot m_{xy}$ هو الميل الأصغر مقسومًا على الأكبر. وكلما انغلقا كان الارتباط أقوى.',
            'The two lines, solved for y, are drawn on the same axes and cross at $(\\bar{x},\\bar{y})$. The line of Y on X has slope $m_{yx}$; that of X on Y, $\\frac{1}{m_{xy}}$. So $r^2=m_{yx}\\cdot m_{xy}$ is the smaller slope divided by the larger. The closer together, the stronger the correlation.'
        ),
        examplePrompt: say('Zuzenak $y=0{,}5x+6$ (Y-ren X-rekiko) eta $y=2x$ (X-ren Y-rekiko) dira. Aurkitu grabitate-zentroa eta r.', 'Las rectas son $y=0{,}5x+6$ (Y sobre X) e $y=2x$ (X sobre Y). Halla el centro de gravedad y r.', 'المستقيمان هما $y=0{,}5x+6$ (Y على X) و$y=2x$ (X على Y). أوجد مركز الثقل وr.', 'The lines are $y=0{,}5x+6$ (Y on X) and $y=2x$ (X on Y). Find the centre of gravity and r.'),
        example: same('$\\begin{gathered}0{,}5x+6=2x\\ \\to\\ x=4,\\ y=8\\\\ r^2=\\frac{0{,}5}{2}=0{,}25\\qquad r=0{,}5\\end{gathered}$'),
        exampleAnswer: say('Grabitate-zentroa $(4,\\,8)$ da, eta $r=0{,}5$: zuzenak nahiko irekita daude.', 'El centro de gravedad es $(4,\\,8)$ y $r=0{,}5$: las rectas están bastante abiertas.', 'مركز الثقل $(4,\\,8)$ و$r=0{,}5$: المستقيمان منفرجان إلى حد ما.', 'The centre of gravity is $(4,\\,8)$ and $r=0{,}5$: the lines are quite open.'),
        why: {
            text: say(
                'Zergatik zatidura? X-ren Y-rekiko zuzenean $x-\\bar{x}=m_{xy}\\,(y-\\bar{y})$ da; y askatzean, malda $\\frac{1}{m_{xy}}$ bihurtzen da. Beraz, $m_{yx}\\cdot m_{xy}=\\frac{m_{yx}}{1/m_{xy}}$: marraztutako bi malden zatidura.',
                '¿Por qué el cociente? En la recta de X sobre Y, $x-\\bar{x}=m_{xy}\\,(y-\\bar{y})$; al despejar y, la pendiente pasa a ser $\\frac{1}{m_{xy}}$. Por eso $m_{yx}\\cdot m_{xy}=\\frac{m_{yx}}{1/m_{xy}}$: el cociente de las dos pendientes dibujadas.',
                'لماذا حاصل القسمة؟ في مستقيم X على Y يكون $x-\\bar{x}=m_{xy}\\,(y-\\bar{y})$؛ وعند عزل y يصير الميل $\\frac{1}{m_{xy}}$. لذلك $m_{yx}\\cdot m_{xy}=\\frac{m_{yx}}{1/m_{xy}}$: حاصل قسمة الميلين المرسومين.',
                'Why the quotient? In the line of X on Y, $x-\\bar{x}=m_{xy}\\,(y-\\bar{y})$; when you solve for y, the slope becomes $\\frac{1}{m_{xy}}$. So $m_{yx}\\cdot m_{xy}=\\frac{m_{yx}}{1/m_{xy}}$: the quotient of the two slopes as drawn.'
            )
        }
    },
    'marginal-measures': {
        definitions: [
            { term: say('Banaketa marjinala', 'Distribución marginal', 'التوزيع الهامشي', 'Marginal distribution'), meaning: say('Aldagai bakarra, bestea kontuan hartu gabe: taularen guztizkoen errenkada edo zutabea.', 'Una sola variable, sin mirar la otra: la fila o la columna de los totales de la tabla.', 'متغير واحد دون النظر إلى الآخر: سطر أو عمود مجاميع الجدول.', 'A single variable, ignoring the other: the row or column of totals of the table.') }
        ],
        vocabulary: [
            say('baldintzazkoa', 'condicionada', 'الشرطي', 'conditional'),
            say('kualitatiboa', 'cualitativa', 'نوعي', 'qualitative'),
            say('moda', 'moda', 'المنوال', 'mode')
        ],
        explanation: say(
            'Sarrera bikoitzeko taula batean, aldagai kuantitatibo baten marjinalak edo baldintzazkoak beste edozein banaketa bezala lantzen dira: klase-markekin, $\\bar{x}$ eta $\\sigma$. Baldintzazkoan, bere errenkada edo zutabearen guztizkoaz zatitzen da. Aldagai kualitatibo batek moda bakarrik du.',
            'En una tabla de doble entrada, la marginal o una condicionada de una variable cuantitativa se trabajan como cualquier distribución: con las marcas de clase, $\\bar{x}$ y $\\sigma$. En la condicionada se divide entre el total de su fila o columna. Una variable cualitativa solo tiene moda.',
            'في جدول مزدوج المدخل يُعامَل التوزيع الهامشي أو الشرطي لمتغير كمي كأي توزيع: بمراكز الفئات و$\\bar{x}$ و$\\sigma$. وفي الشرطي نقسم على مجموع سطره أو عموده. أما المتغير النوعي فليس له إلا المنوال.',
            'In a two-way table, the marginal or a conditional of a quantitative variable are handled like any distribution: with the class marks, $\\bar{x}$ and $\\sigma$. In the conditional you divide by the total of its row or column. A qualitative variable only has a mode.'
        ),
        examplePrompt: say('x adinaren klase-markak 15 eta 25 dira, eta haien errenkadek 6 eta 14 batzen dute. Zein da x-ren batez besteko marjinala?', 'Las marcas de la edad x son 15 y 25, y sus filas suman 6 y 14. ¿Cuál es la media marginal de x?', 'مركزا العمر x هما 15 و25، ومجموعا سطريهما 6 و14. ما المتوسط الهامشي لـ x؟', 'The class marks of the age x are 15 and 25, and their rows add up to 6 and 14. What is the marginal mean of x?'),
        example: same('$\\bar{x}=\\frac{6\\cdot 15+14\\cdot 25}{20}=22$'),
        exampleAnswer: say('Batez besteko marjinala 22 urte da.', 'La media marginal es 22 años.', 'المتوسط الهامشي 22 سنة.', 'The marginal mean is 22 years.')
    }
}
