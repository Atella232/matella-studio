import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Santillana Aplicadas 4,
   unit 4 and Anaya Aplicadas 4, units 6 and 7: equations with brackets and
   denominators, ages, mixtures and savings, complete and incomplete
   quadratics, discriminants, factored and radical equations, the flat of
   700 € shared by students, linear equations with two unknowns, the three
   kinds of systems, the three methods and problems with coffees, hens and
   rabbits or tickets. Every closed answer is a single number: a solution,
   one unknown of a system, a discriminant or a parameter.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)

export const equationsSystemsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4401,
        prompt: say('Zein da $3x-2=x+4$ ekuazioaren ebazpena?', '¿Cuál es la solución de $3x-2=x+4$?', 'ما حل $3x-2=x+4$؟'),
        options: [same('$x=3$'), same('$x=1$'), same('$x=\\frac{3}{2}$')],
        correctIndex: 0,
        explanation: same('$2x=6\\to x=3$'),
        topic: 'brackets'
    },
    {
        id: 4402,
        prompt: say('Ebatzi $\\frac{x}{2}+\\frac{x}{3}=5$.', 'Resuelve $\\frac{x}{2}+\\frac{x}{3}=5$.', 'حلّ $\\frac{x}{2}+\\frac{x}{3}=5$.'),
        options: [same('$x=30$'), same('$x=6$'), same('$x=\\frac{5}{6}$')],
        correctIndex: 1,
        explanation: say('Biderkatu 6z gai guztiak: $3x+2x=30$, $x=6$.', 'Multiplica todos los términos por 6: $3x+2x=30$, $x=6$.', 'اضرب كل الحدود في 6: $3x+2x=30$، $x=6$.'),
        topic: 'denominators'
    },
    {
        id: 4403,
        prompt: say('Zein dira $x^{2}-5x=0$ ekuazioaren ebazpenak?', '¿Cuáles son las soluciones de $x^{2}-5x=0$?', 'ما حلول $x^{2}-5x=0$؟'),
        options: [same('$x=5$'), same('$x=0,\\ x=-5$'), same('$x=0,\\ x=5$')],
        correctIndex: 2,
        explanation: say('$x(x-5)=0$: faktore bakoitza 0. Ez zatitu x-z.', '$x(x-5)=0$: cada factor, 0. No dividas entre x.', '$x(x-5)=0$: كل عامل 0. لا تقسم على x.'),
        topic: 'incomplete'
    },
    {
        id: 4404,
        prompt: say('Ebatzi $x^{2}-7x+6=0$.', 'Resuelve $x^{2}-7x+6=0$.', 'حلّ $x^{2}-7x+6=0$.'),
        options: [same('$x=6,\\ x=1$'), same('$x=-6,\\ x=-1$'), same('$x=7,\\ x=-1$')],
        correctIndex: 0,
        explanation: same('$x=\\frac{7\\pm\\sqrt{49-24}}{2}=\\frac{7\\pm 5}{2}$'),
        topic: 'formula'
    },
    {
        id: 4405,
        prompt: say('Zenbat ebazpen ditu $x^{2}+x+1=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}+x+1=0$?', 'كم حلًّا للمعادلة $x^{2}+x+1=0$؟'),
        options: [say('Bi', 'Dos', 'اثنان'), say('Bat', 'Una', 'واحد'), say('Bat ere ez', 'Ninguna', 'لا شيء')],
        correctIndex: 2,
        explanation: say('$\\Delta=1-4=-3$, negatiboa: ez dago ebazpenik.', '$\\Delta=1-4=-3$, negativo: no hay solución.', '$\\Delta=1-4=-3$ سالب: لا حل.'),
        topic: 'discriminant'
    },
    {
        id: 4406,
        prompt: say('Ebatzi $\\sqrt{x}=3$.', 'Resuelve $\\sqrt{x}=3$.', 'حلّ $\\sqrt{x}=3$.'),
        options: [same('$x=\\sqrt{3}$'), same('$x=9$'), same('$x=6$')],
        correctIndex: 1,
        explanation: say('Jaso karratura: $x=3^{2}=9$. Egiaztatu: $\\sqrt{9}=3$.', 'Eleva al cuadrado: $x=3^{2}=9$. Comprueba: $\\sqrt{9}=3$.', 'ربّع: $x=3^{2}=9$. تحقّق: $\\sqrt{9}=3$.'),
        topic: 'radical'
    },
    {
        id: 4407,
        prompt: say('$x+y=1$ eta $x+y=3$ sistemak…', 'El sistema $x+y=1$, $x+y=3$…', 'النظام $x+y=1$ و$x+y=3$…'),
        options: [say('ebazpen bakarra du', 'tiene una solución', 'له حل واحد'), say('ez du ebazpenik', 'no tiene solución', 'لا حل له'), say('infinitu ebazpen ditu', 'tiene infinitas soluciones', 'له حلول لا نهاية لها')],
        correctIndex: 1,
        explanation: say('Bi zenbakiren batura ezin da aldi berean 1 eta 3 izan: zuzen paraleloak, bateraezina.', 'La suma de dos números no puede valer 1 y 3 a la vez: rectas paralelas, incompatible.', 'لا يمكن أن يساوي مجموع عددين 1 و3 معًا: مستقيمان متوازيان، غير متوافق.'),
        topic: 'graphic'
    },
    {
        id: 4408,
        prompt: say('Ebatzi $x+y=5$, $x-y=1$.', 'Resuelve $x+y=5$, $x-y=1$.', 'حلّ $x+y=5$ و$x-y=1$.'),
        options: [same('$x=3,\\ y=2$'), same('$x=2,\\ y=3$'), same('$x=4,\\ y=1$')],
        correctIndex: 0,
        explanation: say('Batu: $2x=6$, $x=3$; eta $y=5-3=2$.', 'Suma: $2x=6$, $x=3$; e $y=5-3=2$.', 'اجمع: $2x=6$، $x=3$؛ و$y=5-3=2$.'),
        topic: 'substitution'
    }
]

export const equationsSystemsPractice: PracticeItem[] = [
    /* ---------- First-degree equations ---------- */
    {
        id: 1, stage: 'first-degree',
        prompt: say('Ebatzi $5-7x+2-6x=10x-7-2x$.', 'Resuelve $5-7x+2-6x=10x-7-2x$.', 'حلّ $5-7x+2-6x=10x-7-2x$.'),
        expected: fraction(2, 3),
        hint: say('Laburtu atal bakoitza: $7-13x=8x-7$.', 'Reduce cada miembro: $7-13x=8x-7$.', 'بسّط كل طرف: $7-13x=8x-7$.'),
        explanation: same('$14=21x\\to x=\\frac{14}{21}=\\frac{2}{3}$')
    },
    {
        id: 2, stage: 'first-degree',
        prompt: say('Ebatzi $10[2x-(x-1)]+3=8x-5(x+3)$.', 'Resuelve $10[2x-(x-1)]+3=8x-5(x+3)$.', 'حلّ $10[2x-(x-1)]+3=8x-5(x+3)$.'),
        expected: n(-4),
        hint: say('Barruko parentesia lehenik: $2x-x+1=x+1$.', 'Primero el paréntesis interior: $2x-x+1=x+1$.', 'القوس الداخلي أولًا: $2x-x+1=x+1$.'),
        explanation: same('$10x+13=3x-15\\to 7x=-28\\to x=-4$')
    },
    {
        id: 3, stage: 'first-degree',
        prompt: say('Ebatzi $\\frac{2x}{5}+\\frac{x}{2}=x+\\frac{3}{10}$.', 'Resuelve $\\frac{2x}{5}+\\frac{x}{2}=x+\\frac{3}{10}$.', 'حلّ $\\frac{2x}{5}+\\frac{x}{2}=x+\\frac{3}{10}$.'),
        expected: n(-3),
        hint: say('MKT(5, 2, 10) = 10. Biderkatu gai guztiak, x ere bai.', 'm.c.m.(5, 2, 10) = 10. Multiplica todos los términos, también la x.', 'م.م.أ(5، 2، 10) = 10. اضرب كل الحدود، حتى x.'),
        explanation: same('$4x+5x=10x+3\\to -x=3\\to x=-3$')
    },
    {
        id: 4, stage: 'first-degree',
        prompt: say('Hiru anaiak urte bateko aldea dute bata bestearekin, eta hirurek 48 urte dituzte guztira. Zenbat urte ditu gazteenak?', 'Tres hermanos se llevan un año cada uno con el siguiente y entre los tres suman 48 años. ¿Cuántos años tiene el pequeño?', 'ثلاثة إخوة بين كل واحد والذي يليه سنة، ومجموع أعمارهم 48 سنة. كم عمر الأصغر؟'),
        expected: n(15),
        hint: say('Adinak: x, $x+1$ eta $x+2$.', 'Edades: x, $x+1$ y $x+2$.', 'الأعمار: x و$x+1$ و$x+2$.'),
        explanation: same('$3x+3=48\\to x=15$')
    },

    /* ---------- Second-degree equations ---------- */
    {
        id: 5, stage: 'quadratic',
        prompt: say('Ebatzi $2x^{2}-50=0$. Zein da ebazpen positiboa?', 'Resuelve $2x^{2}-50=0$. ¿Cuál es la solución positiva?', 'حلّ $2x^{2}-50=0$. ما الحل الموجب؟'),
        expected: n(5),
        hint: say('Askatu $x^{2}$.', 'Despeja $x^{2}$.', 'اعزل $x^{2}$.'),
        explanation: same('$x^{2}=25\\to x=\\pm 5$')
    },
    {
        id: 6, stage: 'quadratic',
        prompt: say('Ebatzi $10x^{2}-3x-1=0$. Zein da ebazpen handiena?', 'Resuelve $10x^{2}-3x-1=0$. ¿Cuál es la mayor solución?', 'حلّ $10x^{2}-3x-1=0$. ما الحل الأكبر؟'),
        expected: fraction(1, 2),
        hint: say('$\\Delta=9+40=49$', '$\\Delta=9+40=49$', '$\\Delta=9+40=49$'),
        explanation: same('$x=\\frac{3\\pm 7}{20}$: $x=\\frac{10}{20}=\\frac{1}{2}$, $x=-\\frac{4}{20}=-\\frac{1}{5}$')
    },
    {
        id: 7, stage: 'quadratic',
        prompt: say('Zenbat da $3x^{2}+5x+11=0$ ekuazioaren diskriminatzailea?', '¿Cuánto vale el discriminante de $3x^{2}+5x+11=0$?', 'كم مميّز $3x^{2}+5x+11=0$؟'),
        expected: n(-107),
        hint: say('$\\Delta=b^{2}-4ac$, $4\\cdot 3\\cdot 11=132$.', '$\\Delta=b^{2}-4ac$, con $4\\cdot 3\\cdot 11=132$.', '$\\Delta=b^{2}-4ac$ مع $4\\cdot 3\\cdot 11=132$.'),
        explanation: say('$\\Delta=25-132=-107$: ez dago ebazpenik.', '$\\Delta=25-132=-107$: no hay solución.', '$\\Delta=25-132=-107$: لا حل.')
    },
    {
        id: 8, stage: 'quadratic',
        prompt: say('Eragiketak egin eta ebatzi $x^{2}+2x=(x+2)(1-x)$. Zein da ebazpen negatiboa?', 'Opera y resuelve $x^{2}+2x=(x+2)(1-x)$. ¿Cuál es la solución negativa?', 'أجرِ العمليات وحلّ $x^{2}+2x=(x+2)(1-x)$. ما الحل السالب؟'),
        expected: n(-2),
        hint: say('$(x+2)(1-x)=-x^{2}-x+2$', '$(x+2)(1-x)=-x^{2}-x+2$', '$(x+2)(1-x)=-x^{2}-x+2$'),
        explanation: same('$2x^{2}+3x-2=0$, $x=\\frac{-3\\pm 5}{4}$: $x=\\frac{1}{2}$, $x=-2$')
    },

    /* ---------- Other equations ---------- */
    {
        id: 9, stage: 'other',
        prompt: say('Ebatzi $(x+1)(3x-5)=0$. Zein da ebazpen positiboa?', 'Resuelve $(x+1)(3x-5)=0$. ¿Cuál es la solución positiva?', 'حلّ $(x+1)(3x-5)=0$. ما الحل الموجب؟'),
        expected: fraction(5, 3),
        hint: say('Faktore bakoitza 0 egin.', 'Iguala a 0 cada factor.', 'اجعل كل عامل 0.'),
        explanation: same('$x=-1$; $3x-5=0\\to x=\\frac{5}{3}$')
    },
    {
        id: 10, stage: 'other',
        prompt: say('Ebatzi $\\sqrt{2x+3}=5$.', 'Resuelve $\\sqrt{2x+3}=5$.', 'حلّ $\\sqrt{2x+3}=5$.'),
        expected: n(11),
        hint: say('Jaso karratura bi atalak.', 'Eleva al cuadrado los dos miembros.', 'ربّع الطرفين.'),
        explanation: same('$2x+3=25\\to x=11$; $\\sqrt{25}=5$ ✓')
    },
    {
        id: 11, stage: 'other',
        prompt: say('Ebatzi $x^{3}-9x=0$. Zein da ebazpen handiena?', 'Resuelve $x^{3}-9x=0$. ¿Cuál es la mayor solución?', 'حلّ $x^{3}-9x=0$. ما الحل الأكبر؟'),
        expected: n(3),
        hint: say('Atera x faktore komun gisa.', 'Saca x factor común.', 'أخرج x عاملًا مشتركًا.'),
        explanation: same('$x(x^{2}-9)=0\\to x=0,\\ x=3,\\ x=-3$')
    },
    {
        id: 12, stage: 'other',
        prompt: say('Bi zenbaki natural jarraien biderkadura 132 da. Zein da txikiena?', 'El producto de dos números naturales consecutivos es 132. ¿Cuál es el menor?', 'جداء عددين طبيعيين متتاليين 132. ما الأصغر؟'),
        expected: n(11),
        hint: say('$x(x+1)=132$', '$x(x+1)=132$', '$x(x+1)=132$'),
        explanation: say('$x^{2}+x-132=0$, $x=\\frac{-1\\pm 23}{2}$: $x=11$ ($-12$ ez da naturala). $11\\cdot 12=132$', '$x^{2}+x-132=0$, $x=\\frac{-1\\pm 23}{2}$: $x=11$ ($-12$ no es natural). $11\\cdot 12=132$', '$x^{2}+x-132=0$، $x=\\frac{-1\\pm 23}{2}$: $x=11$ (‏$-12$ ليس طبيعيًا). $11\\cdot 12=132$')
    },

    /* ---------- Systems ---------- */
    {
        id: 13, stage: 'systems',
        prompt: say('$3x-2y=6$ ekuazioan, zenbat da y x = 4 denean?', 'En la ecuación $3x-2y=6$, ¿cuánto vale y cuando x = 4?', 'في المعادلة $3x-2y=6$، كم y عندما x = 4؟'),
        expected: n(3),
        hint: say('Ordeztu x = 4.', 'Sustituye x = 4.', 'عوّض x = 4.'),
        explanation: same('$12-2y=6\\to y=3$')
    },
    {
        id: 14, stage: 'systems',
        prompt: say('$x+y=6$ eta $x-y=2$ zuzenak puntu batean ebakitzen dira. Zein da puntu horren x?', 'Las rectas $x+y=6$ y $x-y=2$ se cortan en un punto. ¿Cuál es su x?', 'يتقاطع المستقيمان $x+y=6$ و$x-y=2$ في نقطة. ما إحداثيها x؟'),
        expected: n(4),
        hint: say('Bilatu bi ekuazioak betetzen dituen bikotea.', 'Busca la pareja que cumple las dos ecuaciones.', 'ابحث عن الزوج الذي يحقق المعادلتين.'),
        explanation: same('$x=4,\\ y=2$: $4+2=6$, $4-2=2$')
    },
    {
        id: 15, stage: 'systems',
        prompt: say('Ebatzi ordezkapenez $y=3x-1$, $2x+y=9$. Zenbat da y?', 'Resuelve por sustitución $y=3x-1$, $2x+y=9$. ¿Cuánto vale y?', 'حلّ بالتعويض $y=3x-1$ و$2x+y=9$. كم y؟'),
        expected: n(5),
        hint: say('Ordeztu y bigarrenean: $2x+3x-1=9$.', 'Sustituye y en la segunda: $2x+3x-1=9$.', 'عوّض y في الثانية: $2x+3x-1=9$.'),
        explanation: same('$5x-1=9\\to x=2$, $y=3\\cdot 2-1=5$')
    },
    {
        id: 16, stage: 'systems',
        prompt: say('Ebatzi ordezkapenez $x-2y=1$, $3x+y=17$. Zenbat da x?', 'Resuelve por sustitución $x-2y=1$, $3x+y=17$. ¿Cuánto vale x?', 'حلّ بالتعويض $x-2y=1$ و$3x+y=17$. كم x؟'),
        expected: n(5),
        hint: say('Askatu x lehenengoan: $x=1+2y$.', 'Despeja x en la primera: $x=1+2y$.', 'اعزل x في الأولى: $x=1+2y$.'),
        explanation: same('$3(1+2y)+y=17\\to 7y=14\\to y=2$, $x=1+2\\cdot 2=5$')
    },

    /* ---------- Methods and problems ---------- */
    {
        id: 17, stage: 'methods',
        prompt: say('Ebatzi berdinketaz $y=4x-3$, $y=x+6$. Zenbat da y?', 'Resuelve por igualación $y=4x-3$, $y=x+6$. ¿Cuánto vale y?', 'حلّ بالمساواة $y=4x-3$ و$y=x+6$. كم y؟'),
        expected: n(9),
        hint: say('Berdindu: $4x-3=x+6$.', 'Iguala: $4x-3=x+6$.', 'ساوِ: $4x-3=x+6$.'),
        explanation: same('$3x=9\\to x=3$, $y=3+6=9$')
    },
    {
        id: 18, stage: 'methods',
        prompt: say('Ebatzi laburketaz $2x+5y=1$, $3x-5y=14$. Zenbat da y?', 'Resuelve por reducción $2x+5y=1$, $3x-5y=14$. ¿Cuánto vale y?', 'حلّ بالحذف $2x+5y=1$ و$3x-5y=14$. كم y؟'),
        expected: n(-1),
        hint: say('y-ren koefizienteak aurkakoak dira: batu.', 'Los coeficientes de y son opuestos: suma.', 'معاملا y متعاكسان: اجمع.'),
        explanation: same('$5x=15\\to x=3$; $6+5y=1\\to y=-1$')
    },
    {
        id: 19, stage: 'methods',
        prompt: say('Baserri batean oiloak eta untxiak daude: 30 buru eta 80 hanka. Zenbat untxi daude?', 'En una granja hay gallinas y conejos: 30 cabezas y 80 patas. ¿Cuántos conejos hay?', 'في مزرعة دجاج وأرانب: 30 رأسًا و80 رجلًا. كم أرنبًا؟'),
        expected: n(10),
        hint: say('$x+y=30$, $2x+4y=80$', '$x+y=30$, $2x+4y=80$', '$x+y=30$، $2x+4y=80$'),
        explanation: same('$x=30-y$: $60-2y+4y=80\\to 2y=20\\to y=10$')
    },
    {
        id: 20, stage: 'methods',
        prompt: say('Bi zenbakiren batura 45 da eta kendura 13. Zein da handiena?', 'Dos números suman 45 y su diferencia es 13. ¿Cuál es el mayor?', 'مجموع عددين 45 والفرق بينهما 13. ما الأكبر؟'),
        expected: n(29),
        hint: say('$x+y=45$, $x-y=13$: batu.', '$x+y=45$, $x-y=13$: suma.', '$x+y=45$، $x-y=13$: اجمع.'),
        explanation: same('$2x=58\\to x=29$, $y=45-29=16$')
    }
]

export const equationsSystemsChallenges: ChallengeItem[] = [
    /* ---------- First-degree equations ---------- */
    {
        id: 101, stage: 'first-degree', points: 10, context: 'starter',
        prompt: say('Ebatzi $2x-1=x-\\frac{x}{5}$.', 'Resuelve $2x-1=x-\\frac{x}{5}$.', 'حلّ $2x-1=x-\\frac{x}{5}$.'),
        expected: fraction(5, 6),
        hint: say('Biderkatu 5ez gai guztiak.', 'Multiplica por 5 todos los términos.', 'اضرب كل الحدود في 5.'),
        explanation: same('$10x-5=5x-x\\to 6x=5\\to x=\\frac{5}{6}$')
    },
    {
        id: 102, stage: 'first-degree', points: 20, context: 'advanced',
        prompt: say('Bi kafe mota nahastu dira, 7,50 €/kg-koa eta 5,70 €/kg-koa, eta 6,50 €/kg-ko 90 kg lortu dira. Zenbat kg erabili dira garestienetik?', 'Se mezclan dos cafés, de 7,50 €/kg y de 5,70 €/kg, y se obtienen 90 kg a 6,50 €/kg. ¿Cuántos kg se han usado del más caro?', 'خُلط نوعان من القهوة بسعر 7{,}50 €/كغ و5{,}70 €/كغ فحصلنا على 90 كغ بسعر 6{,}50 €/كغ. كم كغ استُعمل من الأغلى؟'),
        expected: n(40),
        hint: say('$7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$', '$7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$', '$7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$'),
        explanation: same('$5{,}7\\cdot 90=513$, $90\\cdot 6{,}5=585$: $1{,}8x=72\\to x=40$')
    },
    {
        id: 103, stage: 'first-degree', points: 30, context: 'advanced',
        prompt: say('Laura egunero esna dagoen denboraren erdia baino ordu bat gutxiago lo egiten du. Zenbat ordu egiten du lo?', 'Laura duerme cada día una hora menos de la mitad del tiempo que está despierta. ¿Cuántas horas duerme?', 'تنام لاورا كل يوم ساعة أقل من نصف الوقت الذي تكون فيه مستيقظة. كم ساعة تنام؟'),
        expected: fraction(22, 3),
        hint: say('Lo: x; esna: $24-x$. $x=\\frac{24-x}{2}-1$', 'Dormida: x; despierta: $24-x$. $x=\\frac{24-x}{2}-1$', 'نائمة: x؛ مستيقظة: $24-x$. $x=\\frac{24-x}{2}-1$'),
        explanation: say('$2x=24-x-2\\to 3x=22\\to x=\\frac{22}{3}$: 7 h eta 20 min.', '$2x=24-x-2\\to 3x=22\\to x=\\frac{22}{3}$: 7 h y 20 min.', '$2x=24-x-2\\to 3x=22\\to x=\\frac{22}{3}$: 7 س و20 د.')
    },

    /* ---------- Second-degree equations ---------- */
    {
        id: 104, stage: 'quadratic', points: 10, context: 'starter',
        prompt: say('Ebatzi $x^{2}-20x+100=0$.', 'Resuelve $x^{2}-20x+100=0$.', 'حلّ $x^{2}-20x+100=0$.'),
        expected: n(10),
        hint: say('Kalkulatu Δ lehenik.', 'Calcula primero Δ.', 'احسب Δ أولًا.'),
        explanation: same('$\\Delta=400-400=0\\to x=\\frac{20}{2}=10$')
    },
    {
        id: 105, stage: 'quadratic', points: 20, context: 'advanced',
        prompt: say('Ebatzi $15x^{2}-11x+2=0$. Zein da ebazpen handiena?', 'Resuelve $15x^{2}-11x+2=0$. ¿Cuál es la mayor solución?', 'حلّ $15x^{2}-11x+2=0$. ما الحل الأكبر؟'),
        expected: fraction(2, 5),
        hint: say('$\\Delta=121-120=1$', '$\\Delta=121-120=1$', '$\\Delta=121-120=1$'),
        explanation: same('$x=\\frac{11\\pm 1}{30}$: $x=\\frac{12}{30}=\\frac{2}{5}$, $x=\\frac{10}{30}=\\frac{1}{3}$')
    },
    {
        id: 106, stage: 'quadratic', points: 30, context: 'advanced',
        prompt: say('Zein c baliorentzat du $x^{2}-6x+c=0$ ekuazioak ebazpen bikoitz bat?', '¿Para qué valor de c tiene $x^{2}-6x+c=0$ una solución doble?', 'لأي قيمة لـc يكون للمعادلة $x^{2}-6x+c=0$ حل مضاعف؟'),
        expected: n(9),
        hint: say('Ebazpen bikoitza: $\\Delta=0$.', 'Solución doble: $\\Delta=0$.', 'حل مضاعف: $\\Delta=0$.'),
        explanation: same('$36-4c=0\\to c=9$; $x^{2}-6x+9=(x-3)^{2}$')
    },

    /* ---------- Other equations ---------- */
    {
        id: 107, stage: 'other', points: 10, context: 'starter',
        prompt: say('Zenbat da $(x-4)(x-6)=0$ ekuazioaren ebazpenen batura?', '¿Cuánto suman las soluciones de $(x-4)(x-6)=0$?', 'كم مجموع حلول $(x-4)(x-6)=0$؟'),
        expected: n(10),
        hint: say('Faktore bakoitza 0 egin.', 'Iguala a 0 cada factor.', 'اجعل كل عامل 0.'),
        explanation: same('$x=4,\\ x=6$: $4+6=10$')
    },
    {
        id: 108, stage: 'other', points: 20, context: 'advanced',
        prompt: say('Ebatzi $x+\\sqrt{x}=6$.', 'Resuelve $x+\\sqrt{x}=6$.', 'حلّ $x+\\sqrt{x}=6$.'),
        expected: n(4),
        hint: say('Utzi erroa bakarrik: $\\sqrt{x}=6-x$. Egiaztatu!', 'Aísla la raíz: $\\sqrt{x}=6-x$. ¡Comprueba!', 'اعزل الجذر: $\\sqrt{x}=6-x$. تحقّق!'),
        explanation: same('$x^{2}-13x+36=0\\to x=9,\\ x=4$; $4+\\sqrt{4}=6$ ✓; $9+\\sqrt{9}=12$ ✗')
    },
    {
        id: 109, stage: 'other', points: 30, context: 'advanced',
        prompt: say('Ikasle talde batek pisu bat alokatzen du 700 €-tan hilean. Bi gehiago balira, bakoitzak 40 € gutxiago ordainduko luke. Zenbat ikasle dira?', 'Un grupo de estudiantes alquila un piso por 700 € al mes. Si fueran dos más, cada uno pagaría 40 € menos. ¿Cuántos son?', 'يستأجر طلاب شقة بـ700 € شهريًا. لو كانوا اثنين أكثر لدفع كل واحد 40 € أقل. كم عددهم؟'),
        expected: n(5),
        hint: say('$(x+2)\\left(\\frac{700}{x}-40\\right)=700$', '$(x+2)\\left(\\frac{700}{x}-40\\right)=700$', '$(x+2)\\left(\\frac{700}{x}-40\\right)=700$'),
        explanation: same('$x^{2}+2x-35=0\\to x=5$; $\\frac{700}{5}=140$, $\\frac{700}{7}=100=140-40$')
    },

    /* ---------- Systems ---------- */
    {
        id: 110, stage: 'systems', points: 10, context: 'starter',
        prompt: say('$x+2y=8$ ekuazioan, zenbat da x y = 3 denean?', 'En $x+2y=8$, ¿cuánto vale x cuando y = 3?', 'في $x+2y=8$، كم x عندما y = 3؟'),
        expected: n(2),
        hint: say('Ordeztu y = 3.', 'Sustituye y = 3.', 'عوّض y = 3.'),
        explanation: same('$x+6=8\\to x=2$')
    },
    {
        id: 111, stage: 'systems', points: 20, context: 'advanced',
        prompt: say('Zein k baliorentzat ditu $x+y=3$, $2x+2y=k$ sistemak infinitu ebazpen?', '¿Para qué valor de k tiene infinitas soluciones el sistema $x+y=3$, $2x+2y=k$?', 'لأي قيمة لـk يكون للنظام $x+y=3$ و$2x+2y=k$ حلول لا نهاية لها؟'),
        expected: n(6),
        hint: say('Bigarren ekuazioak lehenengoa bider 2 izan behar du.', 'La segunda ecuación tiene que ser la primera por 2.', 'يجب أن تكون المعادلة الثانية هي الأولى مضروبة في 2.'),
        explanation: say('$2\\cdot 3=6$: zuzen berdinak, $k=6$.', '$2\\cdot 3=6$: rectas coincidentes, $k=6$.', '$2\\cdot 3=6$: مستقيمان منطبقان، $k=6$.')
    },
    {
        id: 112, stage: 'systems', points: 30, context: 'advanced',
        prompt: say('Ebatzi $\\frac{x}{2}+\\frac{y}{3}=3$, $x-y=1$. Zenbat da x?', 'Resuelve $\\frac{x}{2}+\\frac{y}{3}=3$, $x-y=1$. ¿Cuánto vale x?', 'حلّ $\\frac{x}{2}+\\frac{y}{3}=3$ و$x-y=1$. كم x؟'),
        expected: n(4),
        hint: say('Biderkatu lehenengoa 6z: $3x+2y=18$.', 'Multiplica la primera por 6: $3x+2y=18$.', 'اضرب الأولى في 6: $3x+2y=18$.'),
        explanation: same('$x=y+1$: $5y+3=18\\to y=3$, $x=4$; $\\frac{4}{2}+\\frac{3}{3}=3$')
    },

    /* ---------- Methods and problems ---------- */
    {
        id: 113, stage: 'methods', points: 10, context: 'starter',
        prompt: say('Ebatzi laburketaz $x+y=10$, $x-y=4$. Zenbat da x?', 'Resuelve por reducción $x+y=10$, $x-y=4$. ¿Cuánto vale x?', 'حلّ بالحذف $x+y=10$ و$x-y=4$. كم x؟'),
        expected: n(7),
        hint: say('Batu bi ekuazioak.', 'Suma las dos ecuaciones.', 'اجمع المعادلتين.'),
        explanation: same('$2x=14\\to x=7$, $y=10-7=3$')
    },
    {
        id: 114, stage: 'methods', points: 20, context: 'advanced',
        prompt: say('3 kafe eta 2 kruasan 7,70 € dira, eta kafe bat eta kruasan bat 2,96 €. Zenbat balio du kafe batek, eurotan?', '3 cafés y 2 cruasanes cuestan 7,70 €, y un café y un cruasán, 2,96 €. ¿Cuánto cuesta un café, en euros?', '3 فناجين قهوة و2 كرواسان بـ7{,}70 €، وقهوة وكرواسان بـ2{,}96 €. كم ثمن القهوة باليورو؟'),
        expected: fraction(89, 50),
        hint: say('$3x+2y=7{,}7$, $x+y=2{,}96$: kendu bigarrena bider 2.', '$3x+2y=7{,}7$, $x+y=2{,}96$: resta la segunda por 2.', '$3x+2y=7{,}7$، $x+y=2{,}96$: اطرح الثانية مضروبة في 2.'),
        explanation: same('$x=7{,}7-2\\cdot 2{,}96=1{,}78$; $y=2{,}96-1{,}78=1{,}18$')
    },
    {
        id: 115, stage: 'methods', points: 30, context: 'advanced',
        prompt: say('Zinemako sarrera bat 8 € da helduentzat eta 5 € haurrentzat. 12 sarrera erosi dira 75 €-tan. Zenbat haur-sarrera?', 'Una entrada de cine cuesta 8 € para adultos y 5 € para niños. Se han comprado 12 entradas por 75 €. ¿Cuántas son de niño?', 'تذكرة السينما بـ8 € للكبار و5 € للأطفال. اشتُريت 12 تذكرة بـ75 €. كم منها للأطفال؟'),
        expected: n(7),
        hint: say('$x+y=12$, $8x+5y=75$', '$x+y=12$, $8x+5y=75$', '$x+y=12$، $8x+5y=75$'),
        explanation: same('$8x+5(12-x)=75\\to 3x=15\\to x=5$, $y=12-5=7$')
    }
]

export const equationsSystemsExerciseBank: ExerciseSection[] = [
    {
        id: 'first-degree',
        title: say('Lehen mailako ekuazioak', 'Ecuaciones de primer grado', 'معادلات الدرجة الأولى'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Ebatzi $3x+11+2x=5+x-6$.', 'Resuelve $3x+11+2x=5+x-6$.', 'حلّ $3x+11+2x=5+x-6$.'), solution: same('$4x=-12\\to x=-3$'), answer: { expected: n(-3) } },
            { id: 2, difficulty: 'easy', question: say('Ebatzi $5x+4-13x-9-2x=0$.', 'Resuelve $5x+4-13x-9-2x=0$.', 'حلّ $5x+4-13x-9-2x=0$.'), solution: same('$-10x=5\\to x=-\\frac{1}{2}$'), answer: { expected: fraction(-1, 2) } },
            { id: 3, difficulty: 'easy', question: say('Badu ebazpenik $6x-15+3x=x-8+8x+1$ ekuazioak?', '¿Tiene solución $6x-15+3x=x-8+8x+1$?', 'هل للمعادلة $6x-15+3x=x-8+8x+1$ حل؟'), solution: say('$9x-15=9x-7$: x desagertzen da eta 0 = 8 geratzen da; ez du ebazpenik.', '$9x-15=9x-7$: la x desaparece y queda 0 = 8; no tiene solución.', '$9x-15=9x-7$: يختفي x ويبقى 0 = 8؛ لا حل لها.') },
            { id: 4, difficulty: 'medium', question: say('Ebatzi $8+(5x-6)=3x-(x+4)$.', 'Resuelve $8+(5x-6)=3x-(x+4)$.', 'حلّ $8+(5x-6)=3x-(x+4)$.'), solution: same('$5x+2=2x-4\\to 3x=-6\\to x=-2$'), answer: { expected: n(-2) } },
            { id: 5, difficulty: 'medium', question: say('Ebatzi $2x+3=8-3[9-2(3x+5)]$.', 'Resuelve $2x+3=8-3[9-2(3x+5)]$.', 'حلّ $2x+3=8-3[9-2(3x+5)]$.'), solution: same('$2x+3=11+18x\\to -8=16x\\to x=-\\frac{1}{2}$'), answer: { expected: fraction(-1, 2) } },
            { id: 6, difficulty: 'medium', question: say('Ebatzi $\\frac{x-1}{4}=\\frac{x+2}{6}$.', 'Resuelve $\\frac{x-1}{4}=\\frac{x+2}{6}$.', 'حلّ $\\frac{x-1}{4}=\\frac{x+2}{6}$.'), solution: same('$3(x-1)=2(x+2)\\to x=7$'), answer: { expected: n(7) } },
            { id: 7, difficulty: 'medium', question: say('Ebatzi $\\frac{x}{3}+\\frac{x}{4}=7$.', 'Resuelve $\\frac{x}{3}+\\frac{x}{4}=7$.', 'حلّ $\\frac{x}{3}+\\frac{x}{4}=7$.'), solution: same('$4x+3x=84\\to x=12$'), answer: { expected: n(12) } },
            { id: 8, difficulty: 'hard', question: say('Eloisak bere amak baino 26 urte gutxiago ditu, eta bien artean mende erdia. Zenbat urte ditu Eloisak?', 'Eloísa tiene 26 años menos que su madre y entre las dos suman medio siglo. ¿Cuántos años tiene Eloísa?', 'إلويسا أصغر من أمها بـ26 سنة ومجموع عمريهما نصف قرن. كم عمر إلويسا؟'), solution: say('$2x+26=50\\to x=12$; amak $12+26=38$.', '$2x+26=50\\to x=12$; la madre, $12+26=38$.', '$2x+26=50\\to x=12$؛ والأم $12+26=38$.'), answer: { expected: n(12) } },
            { id: 9, difficulty: 'hard', question: say('Bizikleta bat eta musika-ekipo bat 260 €-tan erosi nituen, eta 162 €-tan saldu ditut, bizikletan % 30 eta ekipoan % 40 galduta. Zenbat kostatu zen bizikleta?', 'Compré una bicicleta y un equipo de música por 260 € y los he vendido por 162 €, perdiendo el 30 % con la bici y el 40 % con el equipo. ¿Cuánto costó la bici?', 'اشتريت دراجة وجهاز موسيقى بـ260 € وبعتهما بـ162 € بخسارة 30٪ في الدراجة و40٪ في الجهاز. كم كان ثمن الدراجة؟'), solution: same('$0{,}7x+0{,}6(260-x)=162\\to 0{,}1x=6\\to x=60$'), answer: { expected: n(60) } },
            { id: 10, difficulty: 'hard', question: say('Zenbaki bat % 20 handitu eta 2 kenduz gero, haren zazpiren bat gehituta adina lortzen da. Zein da zenbakia?', 'Aumentando un número un 20 % y restándole 2 se obtiene lo mismo que sumándole su séptima parte. ¿Qué número es?', 'إذا زدنا عددًا بنسبة 20٪ وطرحنا 2 حصلنا على ما نحصل عليه بإضافة سُبعه إليه. ما العدد؟'), solution: same('$1{,}2x-2=x+\\frac{x}{7}\\to 8{,}4x-14=8x\\to x=35$'), answer: { expected: n(35) } }
        ]
    },
    {
        id: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Ebatzi $x^{2}-1=0$.', 'Resuelve $x^{2}-1=0$.', 'حلّ $x^{2}-1=0$.'), solution: same('$x^{2}=1\\to x=\\pm 1$') },
            { id: 12, difficulty: 'easy', question: say('Ebatzi $3x^{2}+5=0$.', 'Resuelve $3x^{2}+5=0$.', 'حلّ $3x^{2}+5=0$.'), solution: say('$x^{2}=-\\frac{5}{3}$: ez dago ebazpenik.', '$x^{2}=-\\frac{5}{3}$: no hay solución.', '$x^{2}=-\\frac{5}{3}$: لا حل.') },
            { id: 13, difficulty: 'easy', question: say('Ebatzi $x^{2}-5x+6=0$. Zein da ebazpen handiena?', 'Resuelve $x^{2}-5x+6=0$. ¿Cuál es la mayor solución?', 'حلّ $x^{2}-5x+6=0$. ما الحل الأكبر؟'), solution: same('$x=\\frac{5\\pm 1}{2}$: $x=3$, $x=2$'), answer: { expected: n(3) } },
            { id: 14, difficulty: 'medium', question: say('Ebatzi $2x^{2}-8x+8=0$.', 'Resuelve $2x^{2}-8x+8=0$.', 'حلّ $2x^{2}-8x+8=0$.'), solution: same('$x^{2}-4x+4=0$, $\\Delta=16-16=0\\to x=2$'), answer: { expected: n(2) } },
            { id: 15, difficulty: 'medium', question: say('Ebatzi $4x^{2}-3=0$.', 'Resuelve $4x^{2}-3=0$.', 'حلّ $4x^{2}-3=0$.'), solution: same('$x^{2}=\\frac{3}{4}\\to x=\\pm\\frac{\\sqrt{3}}{2}$') },
            { id: 16, difficulty: 'medium', question: say('Ebatzi $2x^{2}-7=3x-x^{2}-1$. Zein da ebazpen negatiboa?', 'Resuelve $2x^{2}-7=3x-x^{2}-1$. ¿Cuál es la solución negativa?', 'حلّ $2x^{2}-7=3x-x^{2}-1$. ما الحل السالب؟'), solution: same('$3x^{2}-3x-6=0\\to x^{2}-x-2=0\\to x=\\frac{1\\pm 3}{2}$: $x=2$, $x=-1$'), answer: { expected: n(-1) } },
            { id: 17, difficulty: 'medium', question: say('Kalkulatu $6x^{2}+5x+1=0$ ekuazioaren diskriminatzailea. Zenbat ebazpen ditu?', 'Calcula el discriminante de $6x^{2}+5x+1=0$. ¿Cuántas soluciones tiene?', 'احسب مميّز $6x^{2}+5x+1=0$. كم حلًّا لها؟'), solution: say('$\\Delta=25-24=1$, positiboa: bi ebazpen.', '$\\Delta=25-24=1$, positivo: dos soluciones.', '$\\Delta=25-24=1$ موجب: حلان.'), answer: { expected: n(1) } },
            { id: 18, difficulty: 'hard', question: say('Ebatzi $3x(2-x)-2=4x(x-1)+x^{2}$. Zein da ebazpen txikiena?', 'Resuelve $3x(2-x)-2=4x(x-1)+x^{2}$. ¿Cuál es la menor solución?', 'حلّ $3x(2-x)-2=4x(x-1)+x^{2}$. ما الحل الأصغر؟'), solution: same('$4x^{2}-5x+1=0\\to x=\\frac{5\\pm 3}{8}$: $x=1$, $x=\\frac{2}{8}=\\frac{1}{4}$'), answer: { expected: fraction(1, 4) } },
            { id: 19, difficulty: 'hard', question: say('Ebatzi $15-(x+2)^{2}=(x-3)^{2}+2x$. Zein da ebazpen positiboa?', 'Resuelve $15-(x+2)^{2}=(x-3)^{2}+2x$. ¿Cuál es la solución positiva?', 'حلّ $15-(x+2)^{2}=(x-3)^{2}+2x$. ما الحل الموجب؟'), solution: same('$15-x^{2}-4x-4=x^{2}-6x+9+2x\\to 2x^{2}=2\\to x=\\pm 1$'), answer: { expected: n(1) } },
            { id: 20, difficulty: 'hard', question: say('Ebatzi $x(2x+1)-\\frac{(x-1)^{2}}{2}=3$. Zein da ebazpen negatiboa?', 'Resuelve $x(2x+1)-\\frac{(x-1)^{2}}{2}=3$. ¿Cuál es la solución negativa?', 'حلّ $x(2x+1)-\\frac{(x-1)^{2}}{2}=3$. ما الحل السالب؟'), solution: same('$3x^{2}+4x-7=0\\to x=\\frac{-4\\pm 10}{6}$: $x=1$, $x=-\\frac{14}{6}=-\\frac{7}{3}$'), answer: { expected: fraction(-7, 3) } }
        ]
    },
    {
        id: 'other',
        title: say('Beste ekuazio batzuk', 'Otras ecuaciones', 'معادلات أخرى'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Ebatzi $(x+2)(x-3)=0$.', 'Resuelve $(x+2)(x-3)=0$.', 'حلّ $(x+2)(x-3)=0$.'), solution: same('$x=-2$, $x=3$') },
            { id: 22, difficulty: 'easy', question: say('Ebatzi $\\sqrt{x}-3=0$.', 'Resuelve $\\sqrt{x}-3=0$.', 'حلّ $\\sqrt{x}-3=0$.'), solution: same('$\\sqrt{x}=3\\to x=9$'), answer: { expected: n(9) } },
            { id: 23, difficulty: 'easy', question: say('Ebatzi $x(x^{2}-64)=0$.', 'Resuelve $x(x^{2}-64)=0$.', 'حلّ $x(x^{2}-64)=0$.'), solution: same('$x=0$, $x=8$, $x=-8$') },
            { id: 24, difficulty: 'medium', question: say('Ebatzi $3x(x^{2}+x-2)=0$. Zein da ebazpen txikiena?', 'Resuelve $3x(x^{2}+x-2)=0$. ¿Cuál es la menor solución?', 'حلّ $3x(x^{2}+x-2)=0$. ما الحل الأصغر؟'), solution: same('$x=0$; $x^{2}+x-2=0\\to x=1,\\ x=-2$'), answer: { expected: n(-2) } },
            { id: 25, difficulty: 'medium', question: say('Ebatzi $\\sqrt{4x+5}=x+2$. Zein da ebazpen positiboa?', 'Resuelve $\\sqrt{4x+5}=x+2$. ¿Cuál es la solución positiva?', 'حلّ $\\sqrt{4x+5}=x+2$. ما الحل الموجب؟'), solution: say('$4x+5=x^{2}+4x+4\\to x=\\pm 1$; biek balio dute: $\\sqrt{1}=1$, $\\sqrt{9}=3$.', '$4x+5=x^{2}+4x+4\\to x=\\pm 1$; las dos valen: $\\sqrt{1}=1$, $\\sqrt{9}=3$.', '$4x+5=x^{2}+4x+4\\to x=\\pm 1$؛ كلاهما صحيح: $\\sqrt{1}=1$، $\\sqrt{9}=3$.'), answer: { expected: n(1) } },
            { id: 26, difficulty: 'medium', question: say('Ebatzi $(x+1)(x^{2}-4)=0$. Zein da ebazpen txikiena?', 'Resuelve $(x+1)(x^{2}-4)=0$. ¿Cuál es la menor solución?', 'حلّ $(x+1)(x^{2}-4)=0$. ما الحل الأصغر؟'), solution: same('$x=-1$, $x=2$, $x=-2$'), answer: { expected: n(-2) } },
            { id: 27, difficulty: 'medium', question: say('Nire adina iazko adinaz biderkatuta, duela 4 urteko adina gaurtik 4 urtera izango dudanaz biderkatuta bezainbeste ematen du. Zenbat urte ditut?', 'Si multiplico mi edad por la que tenía el año pasado, obtengo lo mismo que multiplicando la que tenía hace 4 años por la que tendré dentro de 4. ¿Cuántos años tengo?', 'إذا ضربت عمري في عمري في العام الماضي حصلت على ما أحصل عليه بضرب عمري قبل 4 سنوات في عمري بعد 4 سنوات. كم عمري؟'), solution: same('$x^{2}-x=x^{2}-16\\to x=16$'), answer: { expected: n(16) } },
            { id: 28, difficulty: 'hard', question: say('Laukizuzen baten azalera 150 cm² da eta perimetroa 50 cm. Zenbat da alde luzeena?', 'Un rectángulo tiene 150 cm² de área y 50 cm de perímetro. ¿Cuánto mide el lado mayor?', 'مستطيل مساحته 150 سم² ومحيطه 50 سم. كم طول الضلع الأكبر؟'), solution: same('$x(25-x)=150\\to x^{2}-25x+150=0\\to x=15,\\ x=10$'), answer: { expected: n(15) } },
            { id: 29, difficulty: 'hard', question: say('Ebatzi $\\sqrt{2x-1}=x-2$.', 'Resuelve $\\sqrt{2x-1}=x-2$.', 'حلّ $\\sqrt{2x-1}=x-2$.'), solution: same('$x^{2}-6x+5=0\\to x=5,\\ x=1$; $\\sqrt{9}=3$ ✓; $x=1$: $\\sqrt{1}=1\\neq -1$ ✗'), answer: { expected: n(5) } },
            { id: 30, difficulty: 'hard', question: say('22 m-ko altuerako zilindro baten azalera osoa $1110\\pi$ m² da. Zenbat da erradioa?', 'El área total de un cilindro de 22 m de altura es $1110\\pi$ m². ¿Cuánto mide su radio?', 'المساحة الكلية لأسطوانة ارتفاعها 22 م هي $1110\\pi$ م². كم نصف قطرها؟'), solution: same('$2\\pi(r^{2}+22r)=1110\\pi\\to r^{2}+22r-555=0\\to r=\\frac{-22\\pm 52}{2}=15$'), answer: { expected: n(15) } }
        ]
    },
    {
        id: 'systems',
        title: say('Ekuazio-sistemak', 'Sistemas de ecuaciones', 'أنظمة المعادلات'),
        items: [
            { id: 31, difficulty: 'easy', question: say('$(4, 3)$ bikotea $3x-2y=6$ ekuazioaren ebazpena al da?', '¿Es $(4, 3)$ solución de $3x-2y=6$?', 'هل $(4, 3)$ حل لـ$3x-2y=6$؟'), solution: say('$12-6=6$: bai.', '$12-6=6$: sí.', '$12-6=6$: نعم.') },
            { id: 32, difficulty: 'easy', question: say('$x+y=5$ ekuazioan, zenbat da y x = 2 denean?', 'En $x+y=5$, ¿cuánto vale y cuando x = 2?', 'في $x+y=5$، كم y عندما x = 2؟'), solution: same('$2+y=5\\to y=3$'), answer: { expected: n(3) } },
            { id: 33, difficulty: 'easy', question: say('Nolakoa da $x+y=1$, $x+y=3$ sistema?', '¿De qué tipo es el sistema $x+y=1$, $x+y=3$?', 'ما نوع النظام $x+y=1$ و$x+y=3$؟'), solution: say('Bateraezina: zuzen paraleloak, ebazpenik ez.', 'Incompatible: rectas paralelas, sin solución.', 'غير متوافق: مستقيمان متوازيان، لا حل.') },
            { id: 34, difficulty: 'medium', question: say('Ebatzi grafikoki $x+y=4$, $x-y=2$. Zenbat da y?', 'Resuelve gráficamente $x+y=4$, $x-y=2$. ¿Cuánto vale y?', 'حلّ بيانيًا $x+y=4$ و$x-y=2$. كم y؟'), solution: same('$(3, 1)$: $3+1=4$, $3-1=2$'), answer: { expected: n(1) } },
            { id: 35, difficulty: 'medium', question: say('$2x+y=10$ zuzenak X ardatza ebakitzen du (y = 0). Zein x-tan?', 'La recta $2x+y=10$ corta al eje X (y = 0). ¿En qué x?', 'يقطع المستقيم $2x+y=10$ محور X (y = 0). عند أي x؟'), solution: same('$2x=10\\to x=5$'), answer: { expected: n(5) } },
            { id: 36, difficulty: 'medium', question: say('Ebatzi ordezkapenez $x=2y$, $x+y=12$. Zenbat da x?', 'Resuelve por sustitución $x=2y$, $x+y=12$. ¿Cuánto vale x?', 'حلّ بالتعويض $x=2y$ و$x+y=12$. كم x؟'), solution: same('$2y+y=12\\to y=4$, $x=2\\cdot 4=8$'), answer: { expected: n(8) } },
            { id: 37, difficulty: 'medium', question: say('Ebatzi ordezkapenez $3x+y=11$, $x+2y=7$. Zenbat da y?', 'Resuelve por sustitución $3x+y=11$, $x+2y=7$. ¿Cuánto vale y?', 'حلّ بالتعويض $3x+y=11$ و$x+2y=7$. كم y؟'), solution: same('$x+2(11-3x)=7\\to x=3$, $y=11-9=2$'), answer: { expected: n(2) } },
            { id: 38, difficulty: 'hard', question: say('Nolakoa da $x+2y=3$, $2x+4y=6$ sistema?', '¿De qué tipo es el sistema $x+2y=3$, $2x+4y=6$?', 'ما نوع النظام $x+2y=3$ و$2x+4y=6$؟'), solution: say('Bigarrena lehenengoa bider 2 da: zuzen berdinak, bateragarri indeterminatua (infinitu ebazpen).', 'La segunda es la primera por 2: rectas coincidentes, compatible indeterminado (infinitas soluciones).', 'الثانية هي الأولى مضروبة في 2: مستقيمان منطبقان، متوافق غير محدد (حلول لا نهاية لها).') },
            { id: 39, difficulty: 'hard', question: say('Ebatzi $\\frac{x}{3}+y=4$, $x-y=4$. Zenbat da x?', 'Resuelve $\\frac{x}{3}+y=4$, $x-y=4$. ¿Cuánto vale x?', 'حلّ $\\frac{x}{3}+y=4$ و$x-y=4$. كم x؟'), solution: same('$x+3y=12$, $x=4+y$: $4y+4=12\\to y=2$, $x=6$'), answer: { expected: n(6) } },
            { id: 40, difficulty: 'hard', question: say('Zein a baliorentzat ez du ebazpenik $ax+y=2$, $4x+y=5$ sistemak?', '¿Para qué valor de a no tiene solución el sistema $ax+y=2$, $4x+y=5$?', 'لأي قيمة لـa لا حل للنظام $ax+y=2$ و$4x+y=5$؟'), solution: say('Zuzenak paraleloak dira x-ren eta y-ren koefizienteak proportzionalak badira: $a=4$ (eta $2\\neq 5$).', 'Las rectas son paralelas si los coeficientes de x e y son proporcionales: $a=4$ (y $2\\neq 5$).', 'يتوازى المستقيمان إذا تناسب معاملا x وy: $a=4$ (و$2\\neq 5$).'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'methods',
        title: say('Metodoak eta problemak', 'Métodos y problemas', 'الطرق والمسائل'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Ebatzi berdinketaz $y=x+1$, $y=7-x$. Zenbat da y?', 'Resuelve por igualación $y=x+1$, $y=7-x$. ¿Cuánto vale y?', 'حلّ بالمساواة $y=x+1$ و$y=7-x$. كم y؟'), solution: same('$x+1=7-x\\to x=3$, $y=3+1=4$'), answer: { expected: n(4) } },
            { id: 42, difficulty: 'easy', question: say('Ebatzi laburketaz $x+y=9$, $x-y=1$. Zenbat da x?', 'Resuelve por reducción $x+y=9$, $x-y=1$. ¿Cuánto vale x?', 'حلّ بالحذف $x+y=9$ و$x-y=1$. كم x؟'), solution: same('$2x=10\\to x=5$, $y=9-5=4$'), answer: { expected: n(5) } },
            { id: 43, difficulty: 'easy', question: say('Ebatzi laburketaz $2x+3y=12$, $2x-y=4$. Zenbat da x?', 'Resuelve por reducción $2x+3y=12$, $2x-y=4$. ¿Cuánto vale x?', 'حلّ بالحذف $2x+3y=12$ و$2x-y=4$. كم x؟'), solution: same('$4y=8\\to y=2$; $2x-2=4\\to x=3$'), answer: { expected: n(3) } },
            { id: 44, difficulty: 'medium', question: say('Ebatzi berdinketaz $x=3y-2$, $x=y+4$. Zenbat da x?', 'Resuelve por igualación $x=3y-2$, $x=y+4$. ¿Cuánto vale x?', 'حلّ بالمساواة $x=3y-2$ و$x=y+4$. كم x؟'), solution: same('$3y-2=y+4\\to y=3$, $x=3+4=7$'), answer: { expected: n(7) } },
            { id: 45, difficulty: 'medium', question: say('Ebatzi laburketaz $3x+2y=13$, $5x-4y=7$. Zenbat da y?', 'Resuelve por reducción $3x+2y=13$, $5x-4y=7$. ¿Cuánto vale y?', 'حلّ بالحذف $3x+2y=13$ و$5x-4y=7$. كم y؟'), solution: same('$6x+4y=26$; $11x=33\\to x=3$; $9+2y=13\\to y=2$'), answer: { expected: n(2) } },
            { id: 46, difficulty: 'medium', question: say('Ebatzi $2(x+1)-y=5$, $x+y=6$. Zenbat da x?', 'Resuelve $2(x+1)-y=5$, $x+y=6$. ¿Cuánto vale x?', 'حلّ $2(x+1)-y=5$ و$x+y=6$. كم x؟'), solution: same('$2x-y=3$; $3x=9\\to x=3$, $y=6-3=3$'), answer: { expected: n(3) } },
            { id: 47, difficulty: 'medium', question: say('Bi zenbakiren batura 30 da, eta bata bestearen bikoitza. Zein da txikiena?', 'Dos números suman 30 y uno es el doble del otro. ¿Cuál es el menor?', 'مجموع عددين 30 وأحدهما ضعف الآخر. ما الأصغر؟'), solution: same('$x+2x=30\\to x=10$'), answer: { expected: n(10) } },
            { id: 48, difficulty: 'hard', question: say('Baserri batean oiloak eta untxiak daude: 20 buru eta 56 hanka. Zenbat untxi?', 'En una granja hay gallinas y conejos: 20 cabezas y 56 patas. ¿Cuántos conejos?', 'في مزرعة دجاج وأرانب: 20 رأسًا و56 رجلًا. كم أرنبًا؟'), solution: same('$x+y=20$, $2x+4y=56$: $2y=16\\to y=8$, $x=12$'), answer: { expected: n(8) } },
            { id: 49, difficulty: 'hard', question: say('3 heldu eta 2 haurren sarrerak 31 € dira, eta 2 heldu eta 3 haurrenak 29 €. Zenbat balio du heldu-sarrera batek?', 'Las entradas de 3 adultos y 2 niños cuestan 31 €, y las de 2 adultos y 3 niños, 29 €. ¿Cuánto cuesta la de adulto?', 'تذاكر 3 كبار وطفلين بـ31 €، وتذاكر كبيرين و3 أطفال بـ29 €. كم ثمن تذكرة الكبير؟'), solution: same('$9x+6y=93$, $4x+6y=58$: $5x=35\\to x=7$, $y=5$'), answer: { expected: n(7) } },
            { id: 50, difficulty: 'hard', question: say('15 txanpon ditut, 2 €-koak eta 50 zentimokoak, guztira 18 €. Zenbat dira 2 €-koak?', 'Tengo 15 monedas de 2 € y de 50 céntimos, que suman 18 €. ¿Cuántas son de 2 €?', 'لدي 15 قطعة نقدية من فئة 2 € و50 سنتًا مجموعها 18 €. كم قطعة من فئة 2 €؟'), solution: same('$2x+0{,}5(15-x)=18\\to 1{,}5x=10{,}5\\to x=7$'), answer: { expected: n(7) } }
        ]
    }
]
