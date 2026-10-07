import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — diagnostic, guided practice, exercise
   bank and challenges. Exercises follow Santillana Aplicadas 4, unit 3
   (monomial tables, Ruffini divisions, notable identities, factorisations
   with double roots) and Anaya Aplicadas 4, unit 5 (P + Q and 2P − 3Q,
   long division, M(4) = 20, integer roots among the divisors, the fraction
   (x³ + 5x²)/(x² + 5x), preparing expressions for equations, the rectangle
   of 200 m of perimeter). Every closed answer is a single number: a value,
   a coefficient, a remainder, a root or a degree.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)

export const polynomialsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4301,
        prompt: say('Zein da $-2a^{5}b^{2}$ monomioaren maila?', '¿Cuál es el grado del monomio $-2a^{5}b^{2}$?', 'ما درجة وحيد الحد $-2a^{5}b^{2}$؟'),
        options: [same('$5$'), same('$7$'), same('$-2$')],
        correctIndex: 1,
        explanation: say('Berretzaileen batura: $5+2=7$.', 'Suma de los exponentes: $5+2=7$.', 'مجموع الأسس: $5+2=7$.'),
        topic: 'monomials'
    },
    {
        id: 4302,
        prompt: say('$P(x)=x^{3}-x^{2}+3x-1$ bada, zenbat da $P(2)$?', 'Si $P(x)=x^{3}-x^{2}+3x-1$, ¿cuánto vale $P(2)$?', 'إذا كان $P(x)=x^{3}-x^{2}+3x-1$ فكم $P(2)$؟'),
        options: [same('$9$'), same('$5$'), same('$13$')],
        correctIndex: 0,
        explanation: same('$8-4+6-1=9$'),
        topic: 'polynomial-value'
    },
    {
        id: 4303,
        prompt: say('$(x+3)^{2}$ berdin…', '$(x+3)^{2}$ es igual a…', '$(x+3)^{2}$ تساوي…'),
        options: [same('$x^{2}+9$'), same('$x^{2}+3x+9$'), same('$x^{2}+6x+9$')],
        correctIndex: 2,
        explanation: say('Ez ahaztu bikoitza bider biderkadura: $2\\cdot 3x=6x$.', 'No olvides el doble del producto: $2\\cdot 3x=6x$.', 'لا تنسَ ضعف الجداء: $2\\cdot 3x=6x$.'),
        topic: 'identities'
    },
    {
        id: 4304,
        prompt: say('$(x^{2}-4x+1)(-5x+2)$ biderkaduran, zein da $x^{2}$-ren koefizientea?', 'En el producto $(x^{2}-4x+1)(-5x+2)$, ¿cuál es el coeficiente de $x^{2}$?', 'في الجداء $(x^{2}-4x+1)(-5x+2)$، ما معامل $x^{2}$؟'),
        options: [same('$2$'), same('$22$'), same('$20$')],
        correctIndex: 1,
        explanation: same('$x^{2}\\cdot 2+(-4x)\\cdot(-5x)=2x^{2}+20x^{2}=22x^{2}$'),
        topic: 'multiply'
    },
    {
        id: 4305,
        prompt: say('Ruffiniz $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$. Zein da hondarra?', 'Con Ruffini, $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$. ¿Cuál es el resto?', 'بروفيني $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$. ما الباقي؟'),
        options: [same('$-8$'), same('$8$'), same('$-1$')],
        correctIndex: 0,
        explanation: same('$1;\\ -2;\\ -1;\\ -8$'),
        topic: 'ruffini'
    },
    {
        id: 4306,
        prompt: say('$P(7)=54$ bada, zein da $P(x)\\mathbin{:}(x-7)$ zatiketaren hondarra?', 'Si $P(7)=54$, ¿cuál es el resto de $P(x)\\mathbin{:}(x-7)$?', 'إذا كان $P(7)=54$ فما باقي $P(x)\\mathbin{:}(x-7)$؟'),
        options: [same('$0$'), same('$7$'), same('$54$')],
        correctIndex: 2,
        explanation: say('Hondarraren teorema: hondarra $P(7)$ da.', 'Teorema del resto: el resto es $P(7)$.', 'مبرهنة الباقي: الباقي هو $P(7)$.'),
        topic: 'remainder'
    },
    {
        id: 4307,
        prompt: say('Zein ezin da izan $x^{3}+2x^{2}+3x+5$ polinomioaren erro osoa?', '¿Cuál no puede ser una raíz entera de $x^{3}+2x^{2}+3x+5$?', 'أيّ هذه لا يمكن أن يكون جذرًا صحيحًا لـ$x^{3}+2x^{2}+3x+5$؟'),
        options: [same('$-1$'), same('$2$'), same('$5$')],
        correctIndex: 1,
        explanation: say('Erro osoak 5en zatitzaileak dira: $\\pm 1$ eta $\\pm 5$. 2 ez da zatitzailea.', 'Las raíces enteras son divisores de 5: $\\pm 1$ y $\\pm 5$. El 2 no es divisor.', 'الجذور الصحيحة قواسم 5: $\\pm 1$ و$\\pm 5$. والعدد 2 ليس قاسمًا.'),
        topic: 'roots'
    },
    {
        id: 4308,
        prompt: say('Sinplifikatu $\\frac{x^{3}+5x^{2}}{x^{2}+5x}$.', 'Simplifica $\\frac{x^{3}+5x^{2}}{x^{2}+5x}$.', 'بسّط $\\frac{x^{3}+5x^{2}}{x^{2}+5x}$.'),
        options: [same('$x$'), same('$x+1$'), same('$\\frac{x^{3}}{x^{2}}+1$')],
        correctIndex: 0,
        explanation: same('$\\frac{x^{2}(x+5)}{x(x+5)}=x$'),
        topic: 'algebraic-fractions'
    }
]

export const polynomialsPractice: PracticeItem[] = [
    /* ---------- Monomials and polynomials ---------- */
    {
        id: 1, stage: 'monomials',
        prompt: say('Laburtu $7x^{4}+\\frac{1}{2}x^{4}+\\frac{2}{3}x^{4}-\\frac{10}{6}x^{4}$. Zein da koefizientea?', 'Reduce $7x^{4}+\\frac{1}{2}x^{4}+\\frac{2}{3}x^{4}-\\frac{10}{6}x^{4}$. ¿Cuál es el coeficiente?', 'بسّط $7x^{4}+\\frac{1}{2}x^{4}+\\frac{2}{3}x^{4}-\\frac{10}{6}x^{4}$. ما المعامل؟'),
        expected: fraction(13, 2),
        hint: say('Antzekoak dira: batu koefizienteak, izendatzaile 6rekin.', 'Son semejantes: suma los coeficientes con denominador 6.', 'متشابهة: اجمع المعاملات بالمقام 6.'),
        explanation: same('$\\frac{42+3+4-10}{6}=\\frac{39}{6}=\\frac{13}{2}$')
    },
    {
        id: 2, stage: 'monomials',
        prompt: say('Kalkulatu $(3xy)^{2}\\mathbin{:}(2x^{2})$. Zein da koefizientea?', 'Calcula $(3xy)^{2}\\mathbin{:}(2x^{2})$. ¿Cuál es el coeficiente?', 'احسب $(3xy)^{2}\\mathbin{:}(2x^{2})$. ما المعامل؟'),
        expected: fraction(9, 2),
        hint: say('$(3xy)^{2}=9x^{2}y^{2}$.', '$(3xy)^{2}=9x^{2}y^{2}$.', '$(3xy)^{2}=9x^{2}y^{2}$.'),
        explanation: same('$9x^{2}y^{2}\\mathbin{:}2x^{2}=\\frac{9}{2}y^{2}$')
    },
    {
        id: 3, stage: 'monomials',
        prompt: say('$Q(x)=x^{4}-12x^{2}-11x+9$. Kalkulatu $Q(3)$.', '$Q(x)=x^{4}-12x^{2}-11x+9$. Calcula $Q(3)$.', '$Q(x)=x^{4}-12x^{2}-11x+9$. احسب $Q(3)$.'),
        expected: n(-51),
        hint: say('$3^{4}=81$', '$3^{4}=81$', '$3^{4}=81$'),
        explanation: same('$81-108-33+9=-51$')
    },
    {
        id: 4, stage: 'monomials',
        prompt: say('Hiru zenbaki jarraien batura $3x+3$ da. Zenbat da x = 14 denean?', 'La suma de tres números consecutivos es $3x+3$. ¿Cuánto vale para x = 14?', 'مجموع ثلاثة أعداد متتالية $3x+3$. كم يساوي عندما x = 14؟'),
        expected: n(45),
        hint: say('$14+15+16$', '$14+15+16$', '$14+15+16$'),
        explanation: same('$3\\cdot 14+3=45$')
    },

    /* ---------- Operations and identities ---------- */
    {
        id: 5, stage: 'operations',
        prompt: say('$P=x^{5}-3x^{4}+5x+9$ eta $Q=5x^{2}+3x-11$. $2P-3Q$ kalkulatuta, zein da gai askea?', '$P=x^{5}-3x^{4}+5x+9$ y $Q=5x^{2}+3x-11$. Al calcular $2P-3Q$, ¿cuál es el término independiente?', '$P=x^{5}-3x^{4}+5x+9$ و$Q=5x^{2}+3x-11$. عند حساب $2P-3Q$، ما الحد الثابت؟'),
        expected: n(51),
        hint: say('$2\\cdot 9$ ken $3\\cdot(-11)$.', '$2\\cdot 9$ menos $3\\cdot(-11)$.', '$2\\cdot 9$ ناقص $3\\cdot(-11)$.'),
        explanation: same('$18-(-33)=51$')
    },
    {
        id: 6, stage: 'operations',
        prompt: say('$(x-3)(2x+5)-4(x^{3}+7x)$ sinplifikatuta, zein da x-ren koefizientea?', 'Al simplificar $(x-3)(2x+5)-4(x^{3}+7x)$, ¿cuál es el coeficiente de x?', 'عند تبسيط $(x-3)(2x+5)-4(x^{3}+7x)$، ما معامل x؟'),
        expected: n(-29),
        hint: say('$5x-6x$ eta $-28x$.', '$5x-6x$ y $-28x$.', '$5x-6x$ و$-28x$.'),
        explanation: same('$5-6-28=-29$')
    },
    {
        id: 7, stage: 'operations',
        prompt: say('Garatu $(3x^{2}+5)^{2}$. Zein da $x^{2}$-ren koefizientea?', 'Desarrolla $(3x^{2}+5)^{2}$. ¿Cuál es el coeficiente de $x^{2}$?', 'انشر $(3x^{2}+5)^{2}$. ما معامل $x^{2}$؟'),
        expected: n(30),
        hint: say('Bikoitza bider biderkadura.', 'El doble del producto.', 'ضعف الجداء.'),
        explanation: same('$2\\cdot 3\\cdot 5=30$')
    },
    {
        id: 8, stage: 'operations',
        prompt: say('$(3x^{2}-7)(3x^{2}+7)$ kalkulatuta, zein da gai askea?', 'Al calcular $(3x^{2}-7)(3x^{2}+7)$, ¿cuál es el término independiente?', 'عند حساب $(3x^{2}-7)(3x^{2}+7)$، ما الحد الثابت؟'),
        expected: n(-49),
        hint: say('Batura bider kendura.', 'Suma por diferencia.', 'مجموع في فرق.'),
        explanation: same('$-(7^{2})=-49$')
    },

    /* ---------- Division and Ruffini ---------- */
    {
        id: 9, stage: 'division',
        prompt: say('Zatitu $(3x^{2}-11x+5)\\mathbin{:}(x+6)$. Zein da hondarra?', 'Divide $(3x^{2}-11x+5)\\mathbin{:}(x+6)$. ¿Cuál es el resto?', 'اقسم $(3x^{2}-11x+5)\\mathbin{:}(x+6)$. ما الباقي؟'),
        expected: n(179),
        hint: say('Zatidura $3x-29$.', 'El cociente es $3x-29$.', 'خارج القسمة $3x-29$.'),
        explanation: same('$5-(-29)\\cdot 6=5+174=179$')
    },
    {
        id: 10, stage: 'division',
        prompt: say('Ruffiniz $(x^{4}-2x^{3}-5x^{2}+3x-6)\\mathbin{:}(x+2)$. Zein da hondarra?', 'Con Ruffini, $(x^{4}-2x^{3}-5x^{2}+3x-6)\\mathbin{:}(x+2)$. ¿Cuál es el resto?', 'بروفيني $(x^{4}-2x^{3}-5x^{2}+3x-6)\\mathbin{:}(x+2)$. ما الباقي؟'),
        expected: n(0),
        hint: say('$a=-2$.', '$a=-2$.', '$a=-2$.'),
        explanation: same('$1;\\ -4;\\ 3;\\ -3;\\ -6+6=0$')
    },
    {
        id: 11, stage: 'division',
        prompt: say('Ruffiniz $(4x^{4}-3x^{3}-x^{2}+5x-1)\\mathbin{:}(x-1)$. Zein da zatiduraren $x^{2}$-ren koefizientea?', 'Con Ruffini, $(4x^{4}-3x^{3}-x^{2}+5x-1)\\mathbin{:}(x-1)$. ¿Cuál es el coeficiente de $x^{2}$ del cociente?', 'بروفيني $(4x^{4}-3x^{3}-x^{2}+5x-1)\\mathbin{:}(x-1)$. ما معامل $x^{2}$ في خارج القسمة؟'),
        expected: n(1),
        hint: say('Jaitsi 4; $4\\cdot 1-3$.', 'Baja el 4; $4\\cdot 1-3$.', 'أنزل 4؛ $4\\cdot 1-3$.'),
        explanation: same('$4;\\ 4-3=1;\\ 1-1=0;\\ 0+5=5;\\ 5-1=4$')
    },
    {
        id: 12, stage: 'division',
        prompt: say('$P(x)=2x^{3}-7x^{2}-17x+10$. Zein da $P(x)\\mathbin{:}(x-5)$ zatiketaren hondarra?', '$P(x)=2x^{3}-7x^{2}-17x+10$. ¿Cuál es el resto de $P(x)\\mathbin{:}(x-5)$?', '$P(x)=2x^{3}-7x^{2}-17x+10$. ما باقي $P(x)\\mathbin{:}(x-5)$؟'),
        expected: n(0),
        hint: say('Hondarra $P(5)$ da.', 'El resto es $P(5)$.', 'الباقي هو $P(5)$.'),
        explanation: same('$P(5)=250-175-85+10=0$')
    },

    /* ---------- Roots and factorisation ---------- */
    {
        id: 13, stage: 'factor',
        prompt: say('$x^{4}-4x^{3}+2x^{2}+5x-4$ polinomioaren erroa da 1, $-3$, 5 ala $-7$? Idatzi erroa dena.', '¿Cuál de los valores 1, $-3$, 5 o $-7$ es raíz de $x^{4}-4x^{3}+2x^{2}+5x-4$? Escribe la que lo sea.', 'أيّ القيم 1 و$-3$ و5 و$-7$ جذر لـ$x^{4}-4x^{3}+2x^{2}+5x-4$؟ اكتبه.'),
        expected: n(1),
        hint: say('Kalkulatu $P(1)$.', 'Calcula $P(1)$.', 'احسب $P(1)$.'),
        explanation: same('$P(1)=1-4+2+5-4=0$')
    },
    {
        id: 14, stage: 'factor',
        prompt: say('$4x^{3}+2x^{2}+5x+7$ polinomioak erro oso bakarra du. Zein?', 'El polinomio $4x^{3}+2x^{2}+5x+7$ tiene una sola raíz entera. ¿Cuál?', 'للحدودية $4x^{3}+2x^{2}+5x+7$ جذر صحيح واحد. ما هو؟'),
        expected: n(-1),
        hint: say('7ren zatitzaileak: $\\pm 1$, $\\pm 7$.', 'Divisores de 7: $\\pm 1$, $\\pm 7$.', 'قواسم 7: $\\pm 1$، $\\pm 7$.'),
        explanation: same('$P(-1)=-4+2-5+7=0$')
    },
    {
        id: 15, stage: 'factor',
        prompt: say('$x^{3}+6x^{2}+9x=x(x+a)^{2}$. Zenbat da a?', '$x^{3}+6x^{2}+9x=x(x+a)^{2}$. ¿Cuánto vale a?', '$x^{3}+6x^{2}+9x=x(x+a)^{2}$. كم a؟'),
        expected: n(3),
        hint: say('Atera x eta begiratu $x^{2}+6x+9$.', 'Saca x y mira $x^{2}+6x+9$.', 'أخرج x وانظر إلى $x^{2}+6x+9$.'),
        explanation: say('$9=3^{2}$ eta $2\\cdot 3=6$: $a=3$.', '$9=3^{2}$ y $2\\cdot 3=6$: $a=3$.', '$9=3^{2}$ و$2\\cdot 3=6$: $a=3$.')
    },
    {
        id: 16, stage: 'factor',
        prompt: say('$x^{4}-2x^{3}-8x^{2}+18x-9=(x-1)^{2}(x+3)(x-b)$. Zenbat da b?', '$x^{4}-2x^{3}-8x^{2}+18x-9=(x-1)^{2}(x+3)(x-b)$. ¿Cuánto vale b?', '$x^{4}-2x^{3}-8x^{2}+18x-9=(x-1)^{2}(x+3)(x-b)$. كم b؟'),
        expected: n(3),
        hint: say('Bi aldiz Ruffini 1ekin: $x^{2}-9$ geratzen da.', 'Dos veces Ruffini con 1: queda $x^{2}-9$.', 'روفيني مرتين بالعدد 1: يبقى $x^{2}-9$.'),
        explanation: same('$x^{2}-9=(x+3)(x-3)\\ \\to\\ b=3$')
    },

    /* ---------- Algebraic expressions ---------- */
    {
        id: 17, stage: 'expressions',
        prompt: say('Sinplifikatu $3(x-1)+5(x-2)-7x$. Zein da gai askea?', 'Simplifica $3(x-1)+5(x-2)-7x$. ¿Cuál es el término independiente?', 'بسّط $3(x-1)+5(x-2)-7x$. ما الحد الثابت؟'),
        expected: n(-13),
        hint: say('$-3$ eta $-10$.', '$-3$ y $-10$.', '$-3$ و$-10$.'),
        explanation: same('$-3-10=-13$')
    },
    {
        id: 18, stage: 'expressions',
        prompt: say('Biderkatu 10ez eta sinplifikatu: $\\frac{3(x+2)}{2}+\\frac{x-1}{5}-\\frac{2(x+1)}{5}-\\frac{37}{10}$. Zein da x-ren koefizientea?', 'Multiplica por 10 y simplifica: $\\frac{3(x+2)}{2}+\\frac{x-1}{5}-\\frac{2(x+1)}{5}-\\frac{37}{10}$. ¿Cuál es el coeficiente de x?', 'اضرب في 10 وبسّط: $\\frac{3(x+2)}{2}+\\frac{x-1}{5}-\\frac{2(x+1)}{5}-\\frac{37}{10}$. ما معامل x؟'),
        expected: n(13),
        hint: say('$15(x+2)+2(x-1)-4(x+1)-37$.', '$15(x+2)+2(x-1)-4(x+1)-37$.', '$15(x+2)+2(x-1)-4(x+1)-37$.'),
        explanation: same('$15+2-4=13$')
    },
    {
        id: 19, stage: 'expressions',
        prompt: say('200 m-ko perimetroko laukizuzen baten azalera $x(100-x)$ da. Zenbat m² x = 30 denean?', 'El área de un rectángulo de 200 m de perímetro es $x(100-x)$. ¿Cuántos m² para x = 30?', 'مساحة مستطيل محيطه 200 م هي $x(100-x)$. كم م² عندما x = 30؟'),
        expected: n(2100),
        hint: say('$30\\cdot 70$', '$30\\cdot 70$', '$30\\cdot 70$'),
        explanation: same('$30\\cdot(100-30)=2100$')
    },
    {
        id: 20, stage: 'expressions',
        prompt: say('Sinplifikatu $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$ eta kalkulatu haren balioa x = 2 denean.', 'Simplifica $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$ y calcula su valor para x = 2.', 'بسّط $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$ واحسب قيمته عندما x = 2.'),
        expected: n(-1),
        hint: say('$\\frac{3(x-4)^{2}}{3x(x-4)}=\\frac{x-4}{x}$.', '$\\frac{3(x-4)^{2}}{3x(x-4)}=\\frac{x-4}{x}$.', '$\\frac{3(x-4)^{2}}{3x(x-4)}=\\frac{x-4}{x}$.'),
        explanation: same('$\\frac{2-4}{2}=-1$')
    }
]

export const polynomialsChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'monomials', points: 10, context: 'starter',
        prompt: say('Zein da $5xy^{4}+2y^{2}+3x^{3}y^{3}-2xy$ polinomioaren maila?', '¿Cuál es el grado de $5xy^{4}+2y^{2}+3x^{3}y^{3}-2xy$?', 'ما درجة $5xy^{4}+2y^{2}+3x^{3}y^{3}-2xy$؟'),
        expected: n(6),
        hint: say('Gai bakoitzaren maila: berretzaileak batu.', 'Grado de cada término: suma de exponentes.', 'درجة كل حد: مجموع الأسس.'),
        explanation: same('$3+3=6$')
    },
    {
        id: 102, stage: 'monomials', points: 20, context: 'advanced',
        prompt: say('Oinarri karratuko (x aldea) eta y altuerako ortoedro baten bolumena $x^{2}y$ da. Kalkulatu x = 3 eta y = 5 direnean.', 'El volumen de un ortoedro de base cuadrada de lado x y altura y es $x^{2}y$. Calcúlalo para x = 3 e y = 5.', 'حجم متوازي مستطيلات قاعدته مربع ضلعه x وارتفاعه y هو $x^{2}y$. احسبه عندما x = 3 وy = 5.'),
        expected: n(45),
        hint: say('$3^{2}\\cdot 5$', '$3^{2}\\cdot 5$', '$3^{2}\\cdot 5$'),
        explanation: same('$3^{2}\\cdot 5=45$')
    },
    {
        id: 103, stage: 'monomials', points: 30, context: 'advanced',
        prompt: say('$\\frac{x^{2}+2x}{5x}$ zatikiaren balioa x = 5 denean, zenbat da?', '¿Cuánto vale la fracción $\\frac{x^{2}+2x}{5x}$ para x = 5?', 'كم قيمة الكسر $\\frac{x^{2}+2x}{5x}$ عندما x = 5؟'),
        expected: fraction(7, 5),
        hint: say('Ordeztu edo lehenik sinplifikatu: $\\frac{x+2}{5}$.', 'Sustituye, o simplifica antes: $\\frac{x+2}{5}$.', 'عوّض أو بسّط أولًا: $\\frac{x+2}{5}$.'),
        explanation: same('$\\frac{25+10}{25}=\\frac{35}{25}=\\frac{7}{5}$')
    },
    {
        id: 104, stage: 'operations', points: 10, context: 'starter',
        prompt: say('$(5x^{4}-5x^{2}-3x)-(x^{3}+3x^{2}+6x-11)$ kenduta, zein da $x^{2}$-ren koefizientea?', 'Al restar $(5x^{4}-5x^{2}-3x)-(x^{3}+3x^{2}+6x-11)$, ¿cuál es el coeficiente de $x^{2}$?', 'عند طرح $(5x^{4}-5x^{2}-3x)-(x^{3}+3x^{2}+6x-11)$، ما معامل $x^{2}$؟'),
        expected: n(-8),
        hint: say('$-5x^{2}-3x^{2}$', '$-5x^{2}-3x^{2}$', '$-5x^{2}-3x^{2}$'),
        explanation: same('$-5-3=-8$')
    },
    {
        id: 105, stage: 'operations', points: 20, context: 'advanced',
        prompt: say('$4x^{2}\\cdot P=-12x^{5}+4x^{3}-8x^{2}$. Zein da P polinomioaren gai askea?', '$4x^{2}\\cdot P=-12x^{5}+4x^{3}-8x^{2}$. ¿Cuál es el término independiente de P?', '$4x^{2}\\cdot P=-12x^{5}+4x^{3}-8x^{2}$. ما الحد الثابت في P؟'),
        expected: n(-2),
        hint: say('Zatitu gai bakoitza $4x^{2}$-z.', 'Divide cada término entre $4x^{2}$.', 'اقسم كل حد على $4x^{2}$.'),
        explanation: same('$-8x^{2}\\mathbin{:}4x^{2}=-2$')
    },
    {
        id: 106, stage: 'operations', points: 30, context: 'advanced',
        prompt: say('Kalkulatu buruz identitate batekin: $99^{2}$.', 'Calcula de cabeza con una identidad: $99^{2}$.', 'احسب ذهنيًا بمتطابقة: $99^{2}$.'),
        expected: n(9801),
        hint: say('$(100-1)^{2}$', '$(100-1)^{2}$', '$(100-1)^{2}$'),
        explanation: same('$100^{2}-2\\cdot 100+1=10\\,000-200+1=9801$')
    },
    {
        id: 107, stage: 'division', points: 10, context: 'starter',
        prompt: say('Ruffiniz $(x^{5}-32)\\mathbin{:}(x-2)$. Zein da hondarra?', 'Con Ruffini, $(x^{5}-32)\\mathbin{:}(x-2)$. ¿Cuál es el resto?', 'بروفيني $(x^{5}-32)\\mathbin{:}(x-2)$. ما الباقي؟'),
        expected: n(0),
        hint: say('Kalkulatu $2^{5}-32$.', 'Calcula $2^{5}-32$.', 'احسب $2^{5}-32$.'),
        explanation: same('$2^{5}-32=0$')
    },
    {
        id: 108, stage: 'division', points: 20, context: 'advanced',
        prompt: say('$H(-5)=13$ bada, zein da $H(x)\\mathbin{:}(x+5)$ zatiketaren hondarra?', 'Si $H(-5)=13$, ¿cuál es el resto de $H(x)\\mathbin{:}(x+5)$?', 'إذا كان $H(-5)=13$ فما باقي $H(x)\\mathbin{:}(x+5)$؟'),
        expected: n(13),
        hint: say('$x+5=x-(-5)$.', '$x+5=x-(-5)$.', '$x+5=x-(-5)$.'),
        explanation: same('$R=H(-5)=13$')
    },
    {
        id: 109, stage: 'division', points: 30, context: 'advanced',
        prompt: say('Zer balio izan behar du k-k, $x^{3}+kx^{2}-4x+12$ zehazki zatitzeko $(x-2)$-z?', '¿Qué valor debe tener k para que $x^{3}+kx^{2}-4x+12$ sea divisible entre $(x-2)$?', 'ما قيمة k لكي تقبل $x^{3}+kx^{2}-4x+12$ القسمة على $(x-2)$؟'),
        expected: n(-3),
        hint: say('$P(2)=0$ izan behar du.', 'Tiene que ser $P(2)=0$.', 'يجب أن يكون $P(2)=0$.'),
        explanation: same('$8+4k-8+12=0\\ \\to\\ 4k=-12\\ \\to\\ k=-3$')
    },
    {
        id: 110, stage: 'factor', points: 10, context: 'starter',
        prompt: say('Zein da $(x-2)(x+5)(x-6)$ polinomioaren erro txikiena?', '¿Cuál es la menor raíz de $(x-2)(x+5)(x-6)$?', 'ما أصغر جذر لـ$(x-2)(x+5)(x-6)$؟'),
        expected: n(-5),
        hint: say('Faktore bakoitza zero.', 'Cada factor igual a cero.', 'كل عامل يساوي صفرًا.'),
        explanation: same('$x+5=0\\ \\to\\ x=-5$')
    },
    {
        id: 111, stage: 'factor', points: 20, context: 'advanced',
        prompt: say('$x^{4}+2x^{3}-3x^{2}-4x+4=(x-1)^{2}(x+a)^{2}$. Zenbat da a?', '$x^{4}+2x^{3}-3x^{2}-4x+4=(x-1)^{2}(x+a)^{2}$. ¿Cuánto vale a?', '$x^{4}+2x^{3}-3x^{2}-4x+4=(x-1)^{2}(x+a)^{2}$. كم a؟'),
        expected: n(2),
        hint: say('Bi aldiz Ruffini 1ekin: $x^{2}+4x+4$.', 'Dos veces Ruffini con 1: $x^{2}+4x+4$.', 'روفيني مرتين بالعدد 1: $x^{2}+4x+4$.'),
        explanation: same('$x^{2}+4x+4=(x+2)^{2}\\ \\to\\ a=2$')
    },
    {
        id: 112, stage: 'factor', points: 30, context: 'advanced',
        prompt: say('$x^{4}-4x^{3}+3x^{2}+4x-4$ polinomioaren erroen batura (errepikatuak behin bakarrik), zenbat da?', 'La suma de las raíces distintas de $x^{4}-4x^{3}+3x^{2}+4x-4$, ¿cuánto es?', 'ما مجموع الجذور المختلفة لـ$x^{4}-4x^{3}+3x^{2}+4x-4$؟'),
        expected: n(2),
        hint: say('Probatu 1, $-1$ eta 2.', 'Prueba 1, $-1$ y 2.', 'جرّب 1 و$-1$ و2.'),
        explanation: say('$(x-2)^{2}(x+1)(x-1)$: erroak 2, $-1$ eta 1; $2-1+1=2$.', '$(x-2)^{2}(x+1)(x-1)$: raíces 2, $-1$ y 1; $2-1+1=2$.', '$(x-2)^{2}(x+1)(x-1)$: الجذور 2 و$-1$ و1؛ $2-1+1=2$.')
    },
    {
        id: 113, stage: 'expressions', points: 10, context: 'starter',
        prompt: say('Sinplifikatu $10(x-1)+2(x+9)-4(2+3x)$.', 'Simplifica $10(x-1)+2(x+9)-4(2+3x)$.', 'بسّط $10(x-1)+2(x+9)-4(2+3x)$.'),
        expected: n(0),
        hint: say('$10x+2x-12x$ eta $-10+18-8$.', '$10x+2x-12x$ y $-10+18-8$.', '$10x+2x-12x$ و$-10+18-8$.'),
        explanation: same('$10x-10+2x+18-8-12x=0$')
    },
    {
        id: 114, stage: 'expressions', points: 20, context: 'advanced',
        prompt: say('Bi zenbakiren kendura 20 da eta txikiena x. Haren karratuen batura $2x^{2}+40x+400$ da. Zenbat da x = 5 denean?', 'La diferencia de dos números es 20 y el menor es x. La suma de sus cuadrados es $2x^{2}+40x+400$. ¿Cuánto vale para x = 5?', 'فرق عددين 20 وأصغرهما x. مجموع مربعيهما $2x^{2}+40x+400$. كم يساوي عندما x = 5؟'),
        expected: n(650),
        hint: say('Egiaztatu: $5^{2}+25^{2}$.', 'Comprueba: $5^{2}+25^{2}$.', 'تحقّق: $5^{2}+25^{2}$.'),
        explanation: same('$2\\cdot 25+200+400=650=5^{2}+25^{2}$')
    },
    {
        id: 115, stage: 'expressions', points: 30, context: 'advanced',
        prompt: say('Sinplifikatu $\\frac{x^{3}-3x^{2}+7x-21}{x^{2}+7}$ eta kalkulatu haren balioa x = 10 denean.', 'Simplifica $\\frac{x^{3}-3x^{2}+7x-21}{x^{2}+7}$ y calcula su valor para x = 10.', 'بسّط $\\frac{x^{3}-3x^{2}+7x-21}{x^{2}+7}$ واحسب قيمته عندما x = 10.'),
        expected: n(7),
        hint: say('Ruffiniz 3rekin: $(x-3)(x^{2}+7)$.', 'Ruffini con 3: $(x-3)(x^{2}+7)$.', 'روفيني بالعدد 3: $(x-3)(x^{2}+7)$.'),
        explanation: same('$\\frac{(x-3)(x^{2}+7)}{x^{2}+7}=x-3\\ \\to\\ 10-3=7$')
    }
]

export const polynomialsExerciseBank: ExerciseSection[] = [
    {
        id: 'monomials',
        title: say('Monomioak eta polinomioak', 'Monomios y polinomios', 'وحيدات الحد والحدوديات'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zein dira $5x^{2}$-ren antzekoak? $7x^{2}$, $5x^{3}$, $5x$, $x^{2}$, $3x^{2}y$.', '¿Cuáles son semejantes a $5x^{2}$? $7x^{2}$, $5x^{3}$, $5x$, $x^{2}$, $3x^{2}y$.', 'أيّها يشابه $5x^{2}$؟ $7x^{2}$، $5x^{3}$، $5x$، $x^{2}$، $3x^{2}y$.'), solution: same('$7x^{2}$ , $x^{2}$') },
            { id: 2, difficulty: 'easy', question: say('Zein da $6n^{3}k$ monomioaren maila?', '¿Cuál es el grado de $6n^{3}k$?', 'ما درجة $6n^{3}k$؟'), solution: same('$3+1=4$'), answer: { expected: n(4) } },
            { id: 3, difficulty: 'easy', question: say('Laburtu $x+7x-x^{2}+3x+5x^{2}-2x^{2}$.', 'Reduce $x+7x-x^{2}+3x+5x^{2}-2x^{2}$.', 'بسّط $x+7x-x^{2}+3x+5x^{2}-2x^{2}$.'), solution: same('$2x^{2}+11x$') },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu $(3x^{2})\\cdot(5xy)$.', 'Calcula $(3x^{2})\\cdot(5xy)$.', 'احسب $(3x^{2})\\cdot(5xy)$.'), solution: same('$15x^{3}y$') },
            { id: 5, difficulty: 'medium', question: say('$P(x)=3x^{3}-5x^{2}-9x+3$. Kalkulatu $P(3)$.', '$P(x)=3x^{3}-5x^{2}-9x+3$. Calcula $P(3)$.', '$P(x)=3x^{3}-5x^{2}-9x+3$. احسب $P(3)$.'), solution: same('$81-45-27+3=12$'), answer: { expected: n(12) } },
            { id: 6, difficulty: 'medium', question: say('$Q(x)=x^{4}-12x^{2}-11x+9$. Kalkulatu $Q(-1)$.', '$Q(x)=x^{4}-12x^{2}-11x+9$. Calcula $Q(-1)$.', '$Q(x)=x^{4}-12x^{2}-11x+9$. احسب $Q(-1)$.'), solution: same('$1-12+11+9=9$'), answer: { expected: n(9) } },
            { id: 7, difficulty: 'medium', question: say('Adierazi: bi zenbaki natural jarraien batura.', 'Expresa: la suma de dos números naturales consecutivos.', 'عبّر: مجموع عددين طبيعيين متتاليين.'), solution: same('$n+(n+1)=2n+1$') },
            { id: 8, difficulty: 'hard', question: say('Zilindro baten altuera 4 m da. Adierazi azalera osoa r erradioaren funtzioan.', 'Un cilindro tiene 4 m de altura. Expresa su área total en función del radio r.', 'ارتفاع أسطوانة 4 م. عبّر عن مساحتها الكلية بدلالة نصف القطر r.'), solution: same('$2\\pi r\\cdot 4+2\\pi r^{2}=2\\pi r(r+4)$') },
            { id: 9, difficulty: 'hard', question: say('$A=5x^{2}$, $B=4x$, $C=-2x^{2}$. Kalkulatu $B^{2}\\mathbin{:}C^{2}$.', '$A=5x^{2}$, $B=4x$, $C=-2x^{2}$. Calcula $B^{2}\\mathbin{:}C^{2}$.', '$A=5x^{2}$، $B=4x$، $C=-2x^{2}$. احسب $B^{2}\\mathbin{:}C^{2}$.'), solution: same('$16x^{2}\\mathbin{:}4x^{4}=\\frac{4}{x^{2}}$') },
            { id: 10, difficulty: 'hard', question: say('x kantitate bat % 12 igo da eta gero % 5 jaitsi. Adierazi amaierako kantitatea eta kalkulatu x = 1000 denean.', 'Una cantidad x sube un 12 % y luego baja un 5 %. Expresa la cantidad final y calcúlala para x = 1000.', 'زادت كمية x بنسبة 12٪ ثم نقصت 5٪. عبّر عن الكمية النهائية واحسبها عندما x = 1000.'), solution: same('$0{,}95\\cdot 1{,}12x=1{,}064x\\ \\to\\ 1064$'), answer: { expected: n(1064) } }
        ]
    },
    {
        id: 'operations',
        title: say('Eragiketak eta identitateak', 'Operaciones e identidades', 'العمليات والمتطابقات'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu $(x^{4}+2x^{3}+5x^{2}-3x)+(4x^{3}-9x^{2}+7x-1)$.', 'Calcula $(x^{4}+2x^{3}+5x^{2}-3x)+(4x^{3}-9x^{2}+7x-1)$.', 'احسب $(x^{4}+2x^{3}+5x^{2}-3x)+(4x^{3}-9x^{2}+7x-1)$.'), solution: same('$x^{4}+6x^{3}-4x^{2}+4x-1$') },
            { id: 12, difficulty: 'easy', question: say('Kalkulatu $x^{2}\\cdot(x^{2}-x+1)$.', 'Calcula $x^{2}\\cdot(x^{2}-x+1)$.', 'احسب $x^{2}\\cdot(x^{2}-x+1)$.'), solution: same('$x^{4}-x^{3}+x^{2}$') },
            { id: 13, difficulty: 'easy', question: say('Garatu $(2x-1)(2x+1)$.', 'Desarrolla $(2x-1)(2x+1)$.', 'انشر $(2x-1)(2x+1)$.'), solution: same('$4x^{2}-1$') },
            { id: 14, difficulty: 'medium', question: say('Kalkulatu $(5x^{2}-3)\\cdot(x^{2}-4x+1)$.', 'Calcula $(5x^{2}-3)\\cdot(x^{2}-4x+1)$.', 'احسب $(5x^{2}-3)\\cdot(x^{2}-4x+1)$.'), solution: same('$5x^{4}-20x^{3}+2x^{2}+12x-3$') },
            { id: 15, difficulty: 'medium', question: say('$3x^{2}(2x^{3}-1)+6(4x^{2}-3)$ sinplifikatuta, zein da $x^{2}$-ren koefizientea?', 'Al simplificar $3x^{2}(2x^{3}-1)+6(4x^{2}-3)$, ¿cuál es el coeficiente de $x^{2}$?', 'عند تبسيط $3x^{2}(2x^{3}-1)+6(4x^{2}-3)$، ما معامل $x^{2}$؟'), solution: same('$6x^{5}-3x^{2}+24x^{2}-18=6x^{5}+21x^{2}-18$'), answer: { expected: n(21) } },
            { id: 16, difficulty: 'medium', question: say('Garatu $(-5+2x)^{2}$.', 'Desarrolla $(-5+2x)^{2}$.', 'انشر $(-5+2x)^{2}$.'), solution: same('$25-20x+4x^{2}$') },
            { id: 17, difficulty: 'medium', question: say('$2\\cdot P=6x^{3}-4x^{2}-8x+2$. Kalkulatu P.', '$2\\cdot P=6x^{3}-4x^{2}-8x+2$. Calcula P.', '$2\\cdot P=6x^{3}-4x^{2}-8x+2$. احسب P.'), solution: same('$P=3x^{3}-2x^{2}-4x+1$') },
            { id: 18, difficulty: 'hard', question: say('$(x-3)(x^{2}+1)-x^{2}(2x^{3}+5x^{2})$ sinplifikatuta, zein da $x^{4}$-ren koefizientea?', 'Al simplificar $(x-3)(x^{2}+1)-x^{2}(2x^{3}+5x^{2})$, ¿cuál es el coeficiente de $x^{4}$?', 'عند تبسيط $(x-3)(x^{2}+1)-x^{2}(2x^{3}+5x^{2})$، ما معامل $x^{4}$؟'), solution: same('$-2x^{5}-5x^{4}+x^{3}-3x^{2}+x-3$'), answer: { expected: n(-5) } },
            { id: 19, difficulty: 'hard', question: say('Kalkulatu buruz $101\\cdot 99$.', 'Calcula de cabeza $101\\cdot 99$.', 'احسب ذهنيًا $101\\cdot 99$.'), solution: same('$(100+1)(100-1)=10\\,000-1=9999$'), answer: { expected: n(9999) } },
            { id: 20, difficulty: 'hard', question: say('$(x+1)^{2}-(x-1)^{2}$ sinplifikatu. Zenbat da x = 25 denean?', 'Simplifica $(x+1)^{2}-(x-1)^{2}$. ¿Cuánto vale para x = 25?', 'بسّط $(x+1)^{2}-(x-1)^{2}$. كم يساوي عندما x = 25؟'), solution: same('$x^{2}+2x+1-x^{2}+2x-1=4x\\ \\to\\ 4\\cdot 25=100$'), answer: { expected: n(100) } }
        ]
    },
    {
        id: 'division',
        title: say('Zatiketa eta Ruffini', 'División y Ruffini', 'القسمة وروفيني'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Ruffiniz $(x^{3}-2x^{2}-4x+30)\\mathbin{:}(x+3)$. Zein da hondarra?', 'Con Ruffini, $(x^{3}-2x^{2}-4x+30)\\mathbin{:}(x+3)$. ¿Cuál es el resto?', 'بروفيني $(x^{3}-2x^{2}-4x+30)\\mathbin{:}(x+3)$. ما الباقي؟'), solution: same('$1;\\ -5;\\ 11;\\ 30-33=-3$'), answer: { expected: n(-3) } },
            { id: 22, difficulty: 'easy', question: say('$P(8)=0$ bada, zer esan daiteke $P(x)\\mathbin{:}(x-8)$ zatiketaz?', 'Si $P(8)=0$, ¿qué se puede decir de $P(x)\\mathbin{:}(x-8)$?', 'إذا كان $P(8)=0$ فماذا نقول عن $P(x)\\mathbin{:}(x-8)$؟'), solution: say('Zehatza da: hondarra 0.', 'Es exacta: el resto es 0.', 'تامة: الباقي 0.') },
            { id: 23, difficulty: 'easy', question: say('$H(5)=18$. Zein da $H(x)\\mathbin{:}(x-5)$ zatiketaren hondarra?', '$H(5)=18$. ¿Cuál es el resto de $H(x)\\mathbin{:}(x-5)$?', '$H(5)=18$. ما باقي $H(x)\\mathbin{:}(x-5)$؟'), solution: same('$R=H(5)=18$'), answer: { expected: n(18) } },
            { id: 24, difficulty: 'medium', question: say('Ruffiniz $(5x^{3}+x^{2}+x-1)\\mathbin{:}(x+1)$. Zein da hondarra?', 'Con Ruffini, $(5x^{3}+x^{2}+x-1)\\mathbin{:}(x+1)$. ¿Cuál es el resto?', 'بروفيني $(5x^{3}+x^{2}+x-1)\\mathbin{:}(x+1)$. ما الباقي؟'), solution: same('$5;\\ -4;\\ 5;\\ -1-5=-6$'), answer: { expected: n(-6) } },
            { id: 25, difficulty: 'medium', question: say('Ruffiniz $(-4x^{3}+3x^{2}-40)\\mathbin{:}(x+2)$. Zein da zatiduraren gai askea?', 'Con Ruffini, $(-4x^{3}+3x^{2}-40)\\mathbin{:}(x+2)$. ¿Cuál es el término independiente del cociente?', 'بروفيني $(-4x^{3}+3x^{2}-40)\\mathbin{:}(x+2)$. ما الحد الثابت في خارج القسمة؟'), solution: same('$-4;\\ 11;\\ -22;\\ 4$'), answer: { expected: n(-22) } },
            { id: 26, difficulty: 'medium', question: say('Zatitu $(5x^{2}+11x-4)\\mathbin{:}(5x-2)$. Zein da zatiduraren gai askea?', 'Divide $(5x^{2}+11x-4)\\mathbin{:}(5x-2)$. ¿Cuál es el término independiente del cociente?', 'اقسم $(5x^{2}+11x-4)\\mathbin{:}(5x-2)$. ما الحد الثابت في خارج القسمة؟'), solution: same('$13x\\mathbin{:}5x=\\frac{13}{5}$'), answer: { expected: fraction(13, 5) } },
            { id: 27, difficulty: 'medium', question: say('Ruffinirekin kalkulatu $2x^{3}-7x^{2}-17x+10$ polinomioaren balioa x = $-2$ denean.', 'Calcula con Ruffini el valor de $2x^{3}-7x^{2}-17x+10$ para x = $-2$.', 'احسب بروفيني قيمة $2x^{3}-7x^{2}-17x+10$ عندما x = $-2$.'), solution: same('$2;\\ -11;\\ 5;\\ 10-10=0$'), answer: { expected: n(0) } },
            { id: 28, difficulty: 'hard', question: say('Ruffiniz $(-2x^{5}+x-2)\\mathbin{:}(x+1)$. Zein da hondarra?', 'Con Ruffini, $(-2x^{5}+x-2)\\mathbin{:}(x+1)$. ¿Cuál es el resto?', 'بروفيني $(-2x^{5}+x-2)\\mathbin{:}(x+1)$. ما الباقي؟'), solution: same('$-2;\\ 2;\\ -2;\\ 2;\\ -1;\\ 1-2=-1$'), answer: { expected: n(-1) } },
            { id: 29, difficulty: 'hard', question: say('$x^{3}+mx-6$ polinomioa $(x-3)$-z zatitzean hondarra 0 da. Zenbat da m?', 'Al dividir $x^{3}+mx-6$ entre $(x-3)$ el resto es 0. ¿Cuánto vale m?', 'عند قسمة $x^{3}+mx-6$ على $(x-3)$ يكون الباقي 0. كم m؟'), solution: same('$27+3m-6=0\\ \\to\\ m=-7$'), answer: { expected: n(-7) } },
            { id: 30, difficulty: 'hard', question: say('Zergatik ematen du Ruffinik $P(a)$? Azaldu $P(x)=(x-a)C(x)+R$ erabiliz.', '¿Por qué Ruffini da $P(a)$? Explícalo con $P(x)=(x-a)C(x)+R$.', 'لماذا يعطي روفيني $P(a)$؟ اشرح باستعمال $P(x)=(x-a)C(x)+R$.'), solution: say('x = a jartzean $(a-a)C(a)=0$, beraz $P(a)=R$.', 'Al poner x = a, $(a-a)C(a)=0$, así que $P(a)=R$.', 'عند وضع x = a يكون $(a-a)C(a)=0$، إذن $P(a)=R$.') }
        ]
    },
    {
        id: 'factor',
        title: say('Erroak eta faktorizazioa', 'Raíces y factorización', 'الجذور والتحليل'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Idatzi 2, $-2$ eta 3 erroak dituen 3. mailako polinomio bat.', 'Escribe un polinomio de tercer grado cuyas raíces sean 2, $-2$ y 3.', 'اكتب حدودية من الدرجة الثالثة جذورها 2 و$-2$ و3.'), solution: same('$(x-2)(x+2)(x-3)$') },
            { id: 32, difficulty: 'easy', question: say('Aurkitu buruz $x^{3}-1$ polinomioaren erro bat.', 'Halla de cabeza una raíz de $x^{3}-1$.', 'جد ذهنيًا جذرًا لـ$x^{3}-1$.'), solution: same('$1^{3}-1=0$'), answer: { expected: n(1) } },
            { id: 33, difficulty: 'easy', question: say('Faktorizatu $x^{3}+6x^{2}+9x$.', 'Factoriza $x^{3}+6x^{2}+9x$.', 'حلّل $x^{3}+6x^{2}+9x$.'), solution: same('$x(x+3)^{2}$') },
            { id: 34, difficulty: 'medium', question: say('Faktorizatu $3x^{4}-12x^{2}$.', 'Factoriza $3x^{4}-12x^{2}$.', 'حلّل $3x^{4}-12x^{2}$.'), solution: same('$3x^{2}(x+2)(x-2)$') },
            { id: 35, difficulty: 'medium', question: say('$x^{4}-2x^{3}-x^{2}-7x+3$ polinomioak erro oso bakarra du. Zein?', 'El polinomio $x^{4}-2x^{3}-x^{2}-7x+3$ tiene una sola raíz entera. ¿Cuál?', 'للحدودية $x^{4}-2x^{3}-x^{2}-7x+3$ جذر صحيح واحد. ما هو؟'), solution: same('$81-54-9-21+3=0$'), answer: { expected: n(3) } },
            { id: 36, difficulty: 'medium', question: say('Faktorizatu $x^{3}-6x^{2}+11x-6$.', 'Factoriza $x^{3}-6x^{2}+11x-6$.', 'حلّل $x^{3}-6x^{2}+11x-6$.'), solution: same('$(x-1)(x-2)(x-3)$') },
            { id: 37, difficulty: 'medium', question: say('Faktorizatu $2x^{4}-12x^{3}+10x^{2}$.', 'Factoriza $2x^{4}-12x^{3}+10x^{2}$.', 'حلّل $2x^{4}-12x^{3}+10x^{2}$.'), solution: same('$2x^{2}(x-1)(x-5)$') },
            { id: 38, difficulty: 'hard', question: say('Faktorizatu $x^{3}-x^{2}-x-2$. Zergatik ezin da gehiago deskonposatu?', 'Factoriza $x^{3}-x^{2}-x-2$. ¿Por qué no se puede descomponer más?', 'حلّل $x^{3}-x^{2}-x-2$. لماذا لا يمكن تحليلها أكثر؟'), solution: say('$(x-2)(x^{2}+x+1)$; $x^{2}+x+1$ ez du erro errealik.', '$(x-2)(x^{2}+x+1)$; $x^{2}+x+1$ no tiene raíces reales.', '$(x-2)(x^{2}+x+1)$؛ ليس لـ$x^{2}+x+1$ جذور حقيقية.') },
            { id: 39, difficulty: 'hard', question: say('Faktorizatu $x^{3}-6x^{2}+12x-8$.', 'Factoriza $x^{3}-6x^{2}+12x-8$.', 'حلّل $x^{3}-6x^{2}+12x-8$.'), solution: same('$(x-2)(x^{2}-4x+4)=(x-2)^{3}$') },
            { id: 40, difficulty: 'hard', question: say('$8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-a)^{2}$. Zenbat da a?', '$8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-a)^{2}$. ¿Cuánto vale a?', '$8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-a)^{2}$. كم a؟'), solution: same('$4x^{2}-12x+9=(2x-3)^{2}\\ \\to\\ a=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'expressions',
        title: say('Adierazpen aljebraikoak', 'Expresiones algebraicas', 'العبارات الجبرية'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Sinplifikatu $2(2x-3)+1-(x-5)$.', 'Simplifica $2(2x-3)+1-(x-5)$.', 'بسّط $2(2x-3)+1-(x-5)$.'), solution: same('$4x-6+1-x+5=3x$') },
            { id: 42, difficulty: 'easy', question: say('Batu: $\\frac{x}{3}+\\frac{x}{2}$.', 'Suma: $\\frac{x}{3}+\\frac{x}{2}$.', 'اجمع: $\\frac{x}{3}+\\frac{x}{2}$.'), solution: same('$\\frac{2x}{6}+\\frac{3x}{6}=\\frac{5x}{6}$') },
            { id: 43, difficulty: 'easy', question: say('Adierazi: Anak Raquelek baino 8 urte gehiago ditu. Bien adinen batura, Raquelek x urte baditu.', 'Expresa: Ana tiene 8 años más que Raquel. La suma de sus edades si Raquel tiene x años.', 'عبّر: تكبر آنا راكيل بثماني سنوات. مجموع عمريهما إذا كان عمر راكيل x.'), solution: same('$x+(x+8)=2x+8$') },
            { id: 44, difficulty: 'medium', question: say('Sinplifikatu $(x+2)(x-3)+x-3$. Zein da gai askea?', 'Simplifica $(x+2)(x-3)+x-3$. ¿Cuál es el término independiente?', 'بسّط $(x+2)(x-3)+x-3$. ما الحد الثابت؟'), solution: same('$x^{2}-x-6+x-3=x^{2}-9$'), answer: { expected: n(-9) } },
            { id: 45, difficulty: 'medium', question: say('Biderkatu 4z eta sinplifikatu: $\\frac{2x-3}{2}-\\frac{x+3}{4}+4+\\frac{x-1}{2}$.', 'Multiplica por 4 y simplifica: $\\frac{2x-3}{2}-\\frac{x+3}{4}+4+\\frac{x-1}{2}$.', 'اضرب في 4 وبسّط: $\\frac{2x-3}{2}-\\frac{x+3}{4}+4+\\frac{x-1}{2}$.'), solution: same('$2(2x-3)-(x+3)+16+2(x-1)=5x+5$') },
            { id: 46, difficulty: 'medium', question: say('Sinplifikatu $\\frac{5x^{3}+20x^{2}}{5x^{2}}$ eta kalkulatu x = 6 denean.', 'Simplifica $\\frac{5x^{3}+20x^{2}}{5x^{2}}$ y calcula su valor para x = 6.', 'بسّط $\\frac{5x^{3}+20x^{2}}{5x^{2}}$ واحسب قيمته عندما x = 6.'), solution: same('$\\frac{5x^{2}(x+4)}{5x^{2}}=x+4\\ \\to\\ 6+4=10$'), answer: { expected: n(10) } },
            { id: 47, difficulty: 'medium', question: say('Txirrindulari bat v abiaduran doa eta beste bat 10 km/h azkarrago dator aurrez aurre. Zer abiaduratan hurbiltzen dira?', 'Un ciclista va a velocidad v y otro viene de frente 10 km/h más rápido. ¿A qué velocidad se acercan?', 'يسير درّاج بسرعة v ويأتي آخر من الاتجاه المقابل أسرع بـ10 كم/س. بأي سرعة يقتربان؟'), solution: same('$v+(v+10)=2v+10$') },
            { id: 48, difficulty: 'hard', question: say('Biderkatu 2z eta sinplifikatu $x(2x+1)-\\frac{x^{2}+1}{2}-3$. Zein da $x^{2}$-ren koefizientea?', 'Multiplica por 2 y simplifica $x(2x+1)-\\frac{x^{2}+1}{2}-3$. ¿Cuál es el coeficiente de $x^{2}$?', 'اضرب في 2 وبسّط $x(2x+1)-\\frac{x^{2}+1}{2}-3$. ما معامل $x^{2}$؟'), solution: same('$4x^{2}+2x-x^{2}-1-6=3x^{2}+2x-7$'), answer: { expected: n(3) } },
            { id: 49, difficulty: 'hard', question: say('Triangelu angeluzuzen baten katetoak x eta $x+5$ dira. Adierazi hipotenusaren karratua eta kalkulatu x = 7 denean.', 'Los catetos de un triángulo rectángulo miden x y $x+5$. Expresa el cuadrado de la hipotenusa y calcúlalo para x = 7.', 'الضلعان القائمان لمثلث قائم x و$x+5$. عبّر عن مربع الوتر واحسبه عندما x = 7.'), solution: same('$2x^{2}+10x+25\\ \\to\\ 98+70+25=193$'), answer: { expected: n(193) } },
            { id: 50, difficulty: 'hard', question: say('Bi zenbaki natural jarraien biderkadura $n^{2}+n$ da. Zein n-rentzat da 132?', 'El producto de dos naturales consecutivos es $n^{2}+n$. ¿Para qué n vale 132?', 'جداء عددين طبيعيين متتاليين $n^{2}+n$. لأي n يساوي 132؟'), solution: same('$11^{2}+11=132$'), answer: { expected: n(11) } }
        ]
    }
]
