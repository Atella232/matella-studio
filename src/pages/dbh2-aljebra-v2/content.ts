import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebra · 2. DBH — diagnostic, guided practice, exercise bank and
   challenges from Santillana 2.º ESO unit 5 and Anaya 2.º ESO unit 6.
   Answers are numbers: a value, a coefficient, an exponent or a degree.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const algebraDiagnostic: DiagnosticQuestion[] = [
    {
        id: 2501,
        prompt: say('Nola idazten da «zenbaki baten bikoitza gehi 5»?', '¿Cómo se escribe «el doble de un número más 5»?', 'كيف نكتب «ضعف عدد زائد 5»؟'),
        options: [same('$2(x+5)$'), same('$2x+5$'), same('$x^{2}+5$')],
        correctIndex: 1,
        explanation: say('Lehenik bikoitza, $2x$, eta gero 5 batu.', 'Primero el doble, $2x$, y luego se suma 5.', 'أولًا الضعف $2x$ ثم نضيف 5.'),
        topic: 'language'
    },
    {
        id: 2502,
        prompt: say('Zenbat da $x^{2}-3x$ balioa $x=-2$ denean?', '¿Cuánto vale $x^{2}-3x$ para $x=-2$?', 'كم قيمة $x^{2}-3x$ عندما $x=-2$؟'),
        options: [same('$-2$'), same('$10$'), same('$-10$')],
        correctIndex: 1,
        explanation: same('$(-2)^{2}-3\\cdot(-2)=4+6=10$'),
        topic: 'value'
    },
    {
        id: 2503,
        prompt: say('Zein da $-3x^{2}y^{3}$ monomioaren maila?', '¿Cuál es el grado del monomio $-3x^{2}y^{3}$?', 'ما درجة وحيد الحد $-3x^{2}y^{3}$؟'),
        options: [same('$3$'), same('$5$'), same('$-3$')],
        correctIndex: 1,
        explanation: say('Berretzaileen batura: $2+3=5$. −3 koefizientea da.', 'Suma de exponentes: $2+3=5$. −3 es el coeficiente.', 'مجموع الأسس: $2+3=5$. و−3 هو المعامل.'),
        topic: 'monomial'
    },
    {
        id: 2504,
        prompt: say('Zenbat da $2x^{3}\\cdot 4x^{2}$?', '¿Cuánto es $2x^{3}\\cdot 4x^{2}$?', 'كم يساوي $2x^{3}\\cdot 4x^{2}$؟'),
        options: [same('$8x^{6}$'), same('$6x^{5}$'), same('$8x^{5}$')],
        correctIndex: 2,
        explanation: say('Koefizienteak biderkatu ($2\\cdot 4=8$) eta berretzaileak batu ($3+2=5$).', 'Se multiplican los coeficientes ($2\\cdot 4=8$) y se suman los exponentes ($3+2=5$).', 'نضرب المعاملات ($2\\cdot 4=8$) ونجمع الأسس ($3+2=5$).'),
        topic: 'multiply-monomials'
    },
    {
        id: 2505,
        prompt: say('Zenbat da $(3x+1)-(x-4)$?', '¿Cuánto es $(3x+1)-(x-4)$?', 'كم يساوي $(3x+1)-(x-4)$؟'),
        options: [same('$2x-3$'), same('$2x+5$'), same('$4x-3$')],
        correctIndex: 1,
        explanation: say('Minusaren atzean zeinuak aldatu: $3x+1-x+4=2x+5$.', 'Tras el menos cambian los signos: $3x+1-x+4=2x+5$.', 'بعد الناقص تتغيّر الإشارات: $3x+1-x+4=2x+5$.'),
        topic: 'add-polynomials'
    },
    {
        id: 2506,
        prompt: say('Zenbat da $(x+3)^{2}$?', '¿Cuánto es $(x+3)^{2}$?', 'كم يساوي $(x+3)^{2}$؟'),
        options: [same('$x^{2}+9$'), same('$x^{2}+6x+9$'), same('$x^{2}+3x+9$')],
        correctIndex: 1,
        explanation: say('Lehenaren karratua, bikoitza bider biderkadura ($2\\cdot 3x=6x$) eta bigarrenaren karratua.', 'Cuadrado del primero, doble del producto ($2\\cdot 3x=6x$) y cuadrado del segundo.', 'مربع الأول، وضعف الجداء ($2\\cdot 3x=6x$)، ومربع الثاني.'),
        topic: 'square-sum'
    },
    {
        id: 2507,
        prompt: say('Zenbat da $(x+5)(x-5)$?', '¿Cuánto es $(x+5)(x-5)$?', 'كم يساوي $(x+5)(x-5)$؟'),
        options: [same('$x^{2}-25$'), same('$x^{2}+25$'), same('$x^{2}-10x-25$')],
        correctIndex: 0,
        explanation: say('Batura bider kendura: karratuen kendura.', 'Suma por diferencia: diferencia de cuadrados.', 'مجموع في فرق: فرق مربعين.'),
        topic: 'sum-difference'
    },
    {
        id: 2508,
        prompt: say('Atera faktore komuna: $4x^{2}+8x$.', 'Saca factor común: $4x^{2}+8x$.', 'أخرج العامل المشترك: $4x^{2}+8x$.'),
        options: [same('$4(x^{2}+8x)$'), same('$4x(x+2)$'), same('$x(4x+2)$')],
        correctIndex: 1,
        explanation: say('ZKH(4, 8) = 4 eta letra komuna $x$: $4x\\cdot(x+2)$.', 'm.c.d.(4, 8) = 4 y la letra común $x$: $4x\\cdot(x+2)$.', 'ق.م.أ(4، 8) = 4 والحرف المشترك $x$: $4x\\cdot(x+2)$.'),
        topic: 'common-factor'
    }
]

export const algebraPractice: PracticeItem[] = [
    { id: 1, stage: 'language', prompt: say('Segida baten gai orokorra $a_{n}=3n-2$ da. Kalkulatu 20. gaia.', 'El término general de una serie es $a_{n}=3n-2$. Calcula el término 20.', 'الحد العام لمتتالية $a_{n}=3n-2$. احسب الحد العشرين.'), expected: fraction(58), hint: say('Ordeztu n = 20.', 'Sustituye n = 20.', 'عوّض n = 20.'), explanation: same('$3\\cdot 20-2=58$') },
    { id: 2, stage: 'language', prompt: say('Kalkulatu $2x^{2}-3x+1$ balioa $x=-2$ denean.', 'Calcula el valor de $2x^{2}-3x+1$ para $x=-2$.', 'احسب قيمة $2x^{2}-3x+1$ عندما $x=-2$.'), expected: fraction(15), hint: say('$(-2)^{2}=4$', '$(-2)^{2}=4$', '$(-2)^{2}=4$'), explanation: same('$2\\cdot(-2)^{2}-3\\cdot(-2)+1=8+6+1=15$') },
    { id: 3, stage: 'language', prompt: say('Soldata gordina: $S=900+3a+10b$ (a: antzinatasuna urtetan; b: aparteko orduak). Zenbat da a = 8 eta b = 21 badira?', 'Sueldo bruto: $S=900+3a+10b$ (a: antigüedad en años; b: horas extra). ¿Cuánto es si a = 8 y b = 21?', 'الراتب الإجمالي: $S=900+3a+10b$ (a: الأقدمية بالسنوات؛ b: الساعات الإضافية). كم يكون إذا a = 8 وb = 21؟'), expected: fraction(1134), hint: say('Ordeztu bi letrak.', 'Sustituye las dos letras.', 'عوّض الحرفين.'), explanation: same('$900+3\\cdot 8+10\\cdot 21=1\\,134$') },
    { id: 4, stage: 'language', prompt: say('Kalkulatu $-2xy$ balioa $x=3$ eta $y=-5$ direnean.', 'Calcula el valor de $-2xy$ para $x=3$ e $y=-5$.', 'احسب قيمة $-2xy$ عندما $x=3$ و$y=-5$.'), expected: fraction(30), hint: say('Bi negatibo: positiboa.', 'Dos negativos: positivo.', 'سالبان: موجب.'), explanation: same('$-2\\cdot 3\\cdot(-5)=30$') },
    { id: 5, stage: 'monomials', prompt: say('Zein da $-5x^{2}yz$ monomioaren maila?', '¿Cuál es el grado del monomio $-5x^{2}yz$?', 'ما درجة وحيد الحد $-5x^{2}yz$؟'), expected: fraction(4), hint: say('Batu letren berretzaileak.', 'Suma los exponentes de las letras.', 'اجمع أسس الحروف.'), explanation: same('$2+1+1=4$') },
    { id: 6, stage: 'monomials', prompt: say('Laburtu $7a-3a+2a$. Zein da emaitzaren koefizientea?', 'Reduce $7a-3a+2a$. ¿Cuál es el coeficiente del resultado?', 'بسّط $7a-3a+2a$. ما معامل الناتج؟'), expected: fraction(6), hint: say('Antzekoak dira: batu koefizienteak.', 'Son semejantes: suma los coeficientes.', 'هي متشابهة: اجمع المعاملات.'), explanation: same('$7-3+2=6$') },
    { id: 7, stage: 'monomials', prompt: say('Kalkulatu $(4x^{3}y)\\cdot(-2xy)$. Zein da koefizientea?', 'Calcula $(4x^{3}y)\\cdot(-2xy)$. ¿Cuál es el coeficiente?', 'احسب $(4x^{3}y)\\cdot(-2xy)$. ما المعامل؟'), expected: fraction(-8), hint: say('Zeinuen araua.', 'Regla de los signos.', 'قاعدة الإشارات.'), explanation: same('$4\\cdot(-2)=-8$') },
    { id: 8, stage: 'monomials', prompt: say('Kalkulatu $(12x^{5})\\mathbin{:}(3x^{2})$. Zein da x-ren berretzailea?', 'Calcula $(12x^{5})\\mathbin{:}(3x^{2})$. ¿Cuál es el exponente de x?', 'احسب $(12x^{5})\\mathbin{:}(3x^{2})$. ما أس x؟'), expected: fraction(3), hint: say('Zatitzean, berretzaileak kendu.', 'Al dividir se restan los exponentes.', 'عند القسمة نطرح الأسس.'), explanation: same('$5-2=3$') },
    { id: 9, stage: 'polynomials', prompt: say('$P(x)=x^{3}-x^{2}+3x-1$. Kalkulatu P(2).', '$P(x)=x^{3}-x^{2}+3x-1$. Calcula P(2).', '$P(x)=x^{3}-x^{2}+3x-1$. احسب P(2).'), expected: fraction(9), hint: say('Ordeztu x = 2.', 'Sustituye x = 2.', 'عوّض x = 2.'), explanation: same('$8-4+6-1=9$') },
    { id: 10, stage: 'polynomials', prompt: say('Kalkulatu $(5x^{2}-2x-3)-(4x^{2}+3x-1)$. Zein da x-ren koefizientea?', 'Calcula $(5x^{2}-2x-3)-(4x^{2}+3x-1)$. ¿Cuál es el coeficiente de x?', 'احسب $(5x^{2}-2x-3)-(4x^{2}+3x-1)$. ما معامل x؟'), expected: fraction(-5), hint: say('Minusaren atzean zeinuak aldatu.', 'Tras el menos cambian los signos.', 'بعد الناقص تتغيّر الإشارات.'), explanation: same('$-2-3=-5$') },
    { id: 11, stage: 'polynomials', prompt: say('Kalkulatu $3x^{2}\\cdot(2x^{2}-x+4)$. Zein da $x^{3}$-ren koefizientea?', 'Calcula $3x^{2}\\cdot(2x^{2}-x+4)$. ¿Cuál es el coeficiente de $x^{3}$?', 'احسب $3x^{2}\\cdot(2x^{2}-x+4)$. ما معامل $x^{3}$؟'), expected: fraction(-3), hint: say('$3x^{2}\\cdot(-x)$', '$3x^{2}\\cdot(-x)$', '$3x^{2}\\cdot(-x)$'), explanation: same('$3\\cdot(-1)=-3$') },
    { id: 12, stage: 'polynomials', prompt: say('Kalkulatu $(2x-7)\\cdot(3x-4)$. Zein da x-ren koefizientea?', 'Calcula $(2x-7)\\cdot(3x-4)$. ¿Cuál es el coeficiente de x?', 'احسب $(2x-7)\\cdot(3x-4)$. ما معامل x؟'), expected: fraction(-29), hint: say('Bi biderketak ematen dute x: $2x\\cdot(-4)$ eta $-7\\cdot 3x$.', 'Dos productos dan x: $2x\\cdot(-4)$ y $-7\\cdot 3x$.', 'جداءان يعطيان x: $2x\\cdot(-4)$ و$-7\\cdot 3x$.'), explanation: same('$2\\cdot(-4)+(-7)\\cdot 3=-8-21=-29$') },
    { id: 13, stage: 'products', prompt: say('Garatu $(3x+2)^{2}$. Zein da x-ren koefizientea?', 'Desarrolla $(3x+2)^{2}$. ¿Cuál es el coeficiente de x?', 'انشر $(3x+2)^{2}$. ما معامل x؟'), expected: fraction(12), hint: say('Bikoitza bider biderkadura.', 'El doble del producto.', 'ضعف الجداء.'), explanation: same('$2\\cdot 3\\cdot 2=12$') },
    { id: 14, stage: 'products', prompt: say('Garatu $(2x-5)^{2}$. Zein da gai askea?', 'Desarrolla $(2x-5)^{2}$. ¿Cuál es el término independiente?', 'انشر $(2x-5)^{2}$. ما الحد الثابت؟'), expected: fraction(25), hint: say('Bigarrenaren karratua, beti positiboa.', 'El cuadrado del segundo, siempre positivo.', 'مربع الثاني، موجب دائمًا.'), explanation: same('$(-5)^{2}=25$') },
    { id: 15, stage: 'products', prompt: say('Kalkulatu $(x+4)(x-4)$. Zein da gai askea?', 'Calcula $(x+4)(x-4)$. ¿Cuál es el término independiente?', 'احسب $(x+4)(x-4)$. ما الحد الثابت؟'), expected: fraction(-16), hint: say('Karratuen kendura.', 'Diferencia de cuadrados.', 'فرق مربعين.'), explanation: same('$-(4^{2})=-16$') },
    { id: 16, stage: 'products', prompt: say('Kalkulatu buruz $102\\cdot 98$.', 'Calcula de cabeza $102\\cdot 98$.', 'احسب ذهنيًا $102\\cdot 98$.'), expected: fraction(9996), hint: say('$(100+2)(100-2)$', '$(100+2)(100-2)$', '$(100+2)(100-2)$'), explanation: same('$100^{2}-2^{2}=10\\,000-4=9\\,996$') },
    { id: 17, stage: 'factor', prompt: say('$6x^{3}-9x^{2}+3x$ polinomioan, zein da faktore komunaren koefizientea?', 'En $6x^{3}-9x^{2}+3x$, ¿cuál es el coeficiente del factor común?', 'في $6x^{3}-9x^{2}+3x$، ما معامل العامل المشترك؟'), expected: fraction(3), hint: say('ZKH(6, 9, 3)', 'm.c.d.(6, 9, 3)', 'ق.م.أ(6، 9، 3)'), explanation: say('ZKH(6, 9, 3) = 3: $3x\\cdot(2x^{2}-3x+1)$.', 'm.c.d.(6, 9, 3) = 3: $3x\\cdot(2x^{2}-3x+1)$.', 'ق.م.أ(6، 9، 3) = 3: $3x\\cdot(2x^{2}-3x+1)$.') },
    { id: 18, stage: 'factor', prompt: say('Kalkulatu buruz $100^{2}-99^{2}$.', 'Calcula de cabeza $100^{2}-99^{2}$.', 'احسب ذهنيًا $100^{2}-99^{2}$.'), expected: fraction(199), hint: say('Karratuen kendura: batura bider kendura.', 'Diferencia de cuadrados: suma por diferencia.', 'فرق مربعين: مجموع في فرق.'), explanation: same('$(100+99)(100-99)=199$') },
    { id: 19, stage: 'factor', prompt: say('$x^{2}+10x+25=(x+a)^{2}$. Zenbat da a?', '$x^{2}+10x+25=(x+a)^{2}$. ¿Cuánto vale a?', '$x^{2}+10x+25=(x+a)^{2}$. كم a؟'), expected: fraction(5), hint: say('25 zeren karratua da?', '¿De qué número es cuadrado 25?', '25 مربع أي عدد؟'), explanation: say('$25=5^{2}$ eta $2\\cdot 5=10$: $a=5$.', '$25=5^{2}$ y $2\\cdot 5=10$: $a=5$.', '$25=5^{2}$ و$2\\cdot 5=10$: $a=5$.') },
    { id: 20, stage: 'factor', prompt: say('Kalkulatu faktore komuna aterata: $37\\cdot 13+37\\cdot 87$.', 'Calcula sacando factor común: $37\\cdot 13+37\\cdot 87$.', 'احسب بإخراج العامل المشترك: $37\\cdot 13+37\\cdot 87$.'), expected: fraction(3700), hint: say('$37\\cdot(13+87)$', '$37\\cdot(13+87)$', '$37\\cdot(13+87)$'), explanation: same('$37\\cdot(13+87)=3\\,700$') }
]

export const algebraChallenges: ChallengeItem[] = [
    { id: 101, stage: 'language', context: 'starter', points: 10, prompt: say('Segida: 5, 9, 13, 17, … Idatzi gai orokorra eta kalkulatu 50. gaia.', 'Serie: 5, 9, 13, 17, … Escribe el término general y calcula el término 50.', 'المتتالية: 5، 9، 13، 17، … اكتب الحد العام واحسب الحد الخمسين.'), expected: fraction(201), hint: say('4 gehiago aldiko: $4n+\\ ?$', 'De 4 en 4: $4n+\\ ?$', 'تزيد 4 كل مرة: $4n+\\ ?$'), explanation: say('$a_{n}=4n+1$, beraz $4\\cdot 50+1=201$.', '$a_{n}=4n+1$, así que $4\\cdot 50+1=201$.', '$a_{n}=4n+1$، إذن $4\\cdot 50+1=201$.') },
    { id: 102, stage: 'language', context: 'starter', points: 10, prompt: say('Laukizuzen baten perimetroa $2x+2y$ da. Zenbat da x = 3,5 cm eta y = 4 cm badira?', 'El perímetro de un rectángulo es $2x+2y$. ¿Cuánto vale si x = 3,5 cm e y = 4 cm?', 'محيط مستطيل $2x+2y$. كم قيمته إذا x = 3.5 سم وy = 4 سم؟'), expected: fraction(15), hint: say('Ordeztu bi letrak.', 'Sustituye las dos letras.', 'عوّض الحرفين.'), explanation: same('$2\\cdot 3{,}5+2\\cdot 4=15$') },
    { id: 103, stage: 'monomials', context: 'starter', points: 10, prompt: say('Karratu baten aldea $3x$ da. Idatzi azalera monomio gisa eta kalkulatu x = 2 denean.', 'El lado de un cuadrado es $3x$. Escribe su área como monomio y calcúlala para x = 2.', 'ضلع مربع $3x$. اكتب مساحته وحيدَ حد واحسبها عندما x = 2.'), expected: fraction(36), hint: say('$(3x)^{2}=9x^{2}$', '$(3x)^{2}=9x^{2}$', '$(3x)^{2}=9x^{2}$'), explanation: same('$9\\cdot 2^{2}=36$') },
    { id: 104, stage: 'products', context: 'starter', points: 10, prompt: say('Kalkulatu buruz $101^{2}$.', 'Calcula de cabeza $101^{2}$.', 'احسب ذهنيًا $101^{2}$.'), expected: fraction(10201), hint: say('$(100+1)^{2}$', '$(100+1)^{2}$', '$(100+1)^{2}$'), explanation: same('$100^{2}+2\\cdot 100+1=10\\,201$') },
    { id: 105, stage: 'polynomials', context: 'advanced', points: 20, prompt: say('$P(x)=2x^{2}+ax-3$ eta $P(2)=11$. Zenbat da a?', '$P(x)=2x^{2}+ax-3$ y $P(2)=11$. ¿Cuánto vale a?', '$P(x)=2x^{2}+ax-3$ و$P(2)=11$. كم a؟'), expected: fraction(3), hint: say('$8+2a-3=11$', '$8+2a-3=11$', '$8+2a-3=11$'), explanation: say('$8+2a-3=11$, $2a=6$, beraz $a=3$. Egiaztatu: $2\\cdot 2^{2}+3\\cdot 2-3=11$.', '$8+2a-3=11$, $2a=6$, así que $a=3$. Comprueba: $2\\cdot 2^{2}+3\\cdot 2-3=11$.', '$8+2a-3=11$، $2a=6$، إذن $a=3$. تحقّق: $2\\cdot 2^{2}+3\\cdot 2-3=11$.') },
    { id: 106, stage: 'language', context: 'advanced', points: 20, prompt: say('Lehen n zenbaki naturalen batura $\\frac{n^{2}+n}{2}$ da. Kalkulatu $1+2+3+\\dots+50$.', 'La suma de los n primeros naturales es $\\frac{n^{2}+n}{2}$. Calcula $1+2+3+\\dots+50$.', 'مجموع أول n عدد طبيعي هو $\\frac{n^{2}+n}{2}$. احسب $1+2+3+\\dots+50$.'), expected: fraction(1275), hint: say('Ordeztu n = 50.', 'Sustituye n = 50.', 'عوّض n = 50.'), explanation: same('$\\frac{50^{2}+50}{2}=1\\,275$') },
    { id: 107, stage: 'products', context: 'advanced', points: 20, prompt: say('Laburtu $(x+3)^{2}-(x-3)^{2}$. Zein da x-ren koefizientea?', 'Reduce $(x+3)^{2}-(x-3)^{2}$. ¿Cuál es el coeficiente de x?', 'بسّط $(x+3)^{2}-(x-3)^{2}$. ما معامل x؟'), expected: fraction(12), hint: say('Garatu biak eta kendu.', 'Desarrolla los dos y resta.', 'انشر الاثنين واطرح.'), explanation: say('$(x^{2}+6x+9)-(x^{2}-6x+9)=12x$, eta $6+6=12$.', '$(x^{2}+6x+9)-(x^{2}-6x+9)=12x$, y $6+6=12$.', '$(x^{2}+6x+9)-(x^{2}-6x+9)=12x$، و$6+6=12$.') },
    { id: 108, stage: 'factor', context: 'advanced', points: 20, prompt: say('Kalkulatu buruz $15\\,743^{2}-15\\,742^{2}$.', 'Calcula de cabeza $15\\,743^{2}-15\\,742^{2}$.', 'احسب ذهنيًا $15\\,743^{2}-15\\,742^{2}$.'), expected: fraction(31485), hint: say('Bi zenbaki jarraitu: kendura 1 da.', 'Dos números seguidos: la diferencia es 1.', 'عددان متتاليان: الفرق 1.'), explanation: same('$15\\,743+15\\,742=31\\,485$') },
    { id: 109, stage: 'polynomials', context: 'advanced', points: 20, prompt: say('Lorategi batek x m-ko zabalera eta (x + 3) m-ko luzera ditu. Idatzi azalera polinomio gisa eta kalkulatu x = 5 denean.', 'Un jardín mide x m de ancho y (x + 3) m de largo. Escribe su área como polinomio y calcúlala para x = 5.', 'حديقة عرضها x م وطولها (x + 3) م. اكتب مساحتها حدوديةً واحسبها عندما x = 5.'), expected: fraction(40), hint: say('$x(x+3)=x^{2}+3x$', '$x(x+3)=x^{2}+3x$', '$x(x+3)=x^{2}+3x$'), explanation: same('$5^{2}+3\\cdot 5=40$') },
    { id: 110, stage: 'language', context: 'master', points: 30, prompt: say('L aldeko ispilu karratu baten prezioa (eurotan) $C=8L+3L^{2}+6$ da, L metrotan. Zenbat balio du 60 cm-ko ispiluak?', 'El precio (en euros) de un espejo cuadrado de lado L es $C=8L+3L^{2}+6$, con L en metros. ¿Cuánto cuesta uno de 60 cm?', 'سعر مرآة مربعة ضلعها L (باليورو) هو $C=8L+3L^{2}+6$، وL بالأمتار. كم ثمن مرآة ضلعها 60 سم؟'), expected: fraction(1188, 100), hint: say('60 cm = 0,6 m.', '60 cm = 0,6 m.', '60 سم = 0.6 م.'), explanation: same('$8\\cdot 0{,}6+3\\cdot 0{,}6^{2}+6=11{,}88$') },
    { id: 111, stage: 'factor', context: 'master', points: 30, prompt: say('Kalkulatu buruz $99^{2}+2\\cdot 99+1$.', 'Calcula de cabeza $99^{2}+2\\cdot 99+1$.', 'احسب ذهنيًا $99^{2}+2\\cdot 99+1$.'), expected: fraction(10000), hint: say('Batura baten karratua da: $(a+b)^{2}$.', 'Es el cuadrado de una suma: $(a+b)^{2}$.', 'إنه مربع مجموع: $(a+b)^{2}$.'), explanation: same('$(99+1)^{2}=10\\,000$') },
    { id: 112, stage: 'products', context: 'master', points: 30, prompt: say('$(a+b)^{2}=49$ eta $ab=10$ badira, zenbat da $a^{2}+b^{2}$?', 'Si $(a+b)^{2}=49$ y $ab=10$, ¿cuánto vale $a^{2}+b^{2}$?', 'إذا كان $(a+b)^{2}=49$ و$ab=10$ فكم $a^{2}+b^{2}$؟'), expected: fraction(29), hint: say('$(a+b)^{2}=a^{2}+b^{2}+2ab$', '$(a+b)^{2}=a^{2}+b^{2}+2ab$', '$(a+b)^{2}=a^{2}+b^{2}+2ab$'), explanation: same('$49-2\\cdot 10=29$') }
]

export const algebraExerciseBank: ExerciseSection[] = [
    {
        id: 'language',
        title: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi hizkuntza aljebraikoz: a) zenbaki baten erdia gehi 3; b) zenbaki baten karratua ken bere hirukoitza; c) bi zenbaki jarraituren batura.', 'Escribe en lenguaje algebraico: a) la mitad de un número más 3; b) el cuadrado de un número menos su triple; c) la suma de dos números consecutivos.', 'اكتب باللغة الجبرية: أ) نصف عدد زائد 3؛ ب) مربع عدد ناقص ثلاثة أضعافه؛ ج) مجموع عددين متتاليين.'), solution: same('a) $\\frac{x}{2}+3$; b) $x^{2}-3x$; c) $x+(x+1)=2x+1$') },
            { id: 2, difficulty: 'easy', question: say('Sarak x urte ditu. Idatzi: bere ahizpak 2 urte gehiago; bere amak 25 urte gehiago; bere aitak ahizparen adinaren hirukoitza.', 'Sara tiene x años. Escribe: su hermana tiene 2 años más; su madre, 25 años más; su padre, el triple de la edad de la hermana.', 'عمر سارة x سنة. اكتب: أختها أكبر بسنتين؛ أمها أكبر بـ 25 سنة؛ أبوها ثلاثة أضعاف عمر الأخت.'), solution: same('$x+2,\\ \\ x+25,\\ \\ 3(x+2)$') },
            { id: 3, difficulty: 'medium', question: say('Idatzi segida hauen gai orokorra: a) 1, 4, 9, 16, 25, …; b) 0, 3, 8, 15, 24, …', 'Escribe el término general de estas series: a) 1, 4, 9, 16, 25, …; b) 0, 3, 8, 15, 24, …', 'اكتب الحد العام لهاتين المتتاليتين: أ) 1، 4، 9، 16، 25، …؛ ب) 0، 3، 8، 15، 24، …'), solution: same('a) $a_{n}=n^{2}$; b) $b_{n}=n^{2}-1$') },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu $-4x^{2}$ balioa $x=-3$ denean.', 'Calcula el valor de $-4x^{2}$ para $x=-3$.', 'احسب قيمة $-4x^{2}$ عندما $x=-3$.'), solution: same('$-4\\cdot(-3)^{2}=-4\\cdot 9=-36$'), answer: { expected: fraction(-36) } },
            { id: 5, difficulty: 'medium', question: say('$a_{n}=\\frac{3n+1}{2}$ bada, idatzi lehen bost gaiak.', 'Si $a_{n}=\\frac{3n+1}{2}$, escribe los cinco primeros términos.', 'إذا كان $a_{n}=\\frac{3n+1}{2}$ فاكتب الحدود الخمسة الأولى.'), solution: same('$2,\\ \\frac{7}{2},\\ 5,\\ \\frac{13}{2},\\ 8$') },
            { id: 6, difficulty: 'hard', question: say('Enpresa batean: soldata gordina $S=900+3a+10b$ da, eta PFEZa (% 21) $0{,}21\\cdot S$. Kalkulatu 8 urteko antzinatasuna eta 21 aparteko ordu dituen langilearen PFEZa.', 'En una empresa, el sueldo bruto es $S=900+3a+10b$ y el IRPF (21 %), $0{,}21\\cdot S$. Calcula el IRPF de un empleado con 8 años de antigüedad y 21 horas extra.', 'في شركة الراتب الإجمالي $S=900+3a+10b$ والضريبة (21 %) $0{,}21\\cdot S$. احسب ضريبة موظف أقدميته 8 سنوات وله 21 ساعة إضافية.'), solution: same('$S=900+3\\cdot 8+10\\cdot 21=1\\,134\\qquad 0{,}21\\cdot 1\\,134=238{,}14$'), answer: { expected: fraction(23814, 100) } }
        ]
    },
    {
        id: 'monomials',
        title: say('Monomioak', 'Monomios', 'وحيدات الحد'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Idatzi koefizientea, zati literala eta maila: a) $8a$; b) $-3x$; c) $a^{2}b^{3}$; d) $\\frac{1}{4}xy^{4}$.', 'Escribe coeficiente, parte literal y grado: a) $8a$; b) $-3x$; c) $a^{2}b^{3}$; d) $\\frac{1}{4}xy^{4}$.', 'اكتب المعامل والجزء الحرفي والدرجة: أ) $8a$؛ ب) $-3x$؛ ج) $a^{2}b^{3}$؛ د) $\\frac{1}{4}xy^{4}$.'), solution: say('a) 8, a, 1; b) −3, x, 1; c) 1, $a^{2}b^{3}$, 5; d) $\\frac{1}{4}$, $xy^{4}$, 5.', 'a) 8, a, 1; b) −3, x, 1; c) 1, $a^{2}b^{3}$, 5; d) $\\frac{1}{4}$, $xy^{4}$, 5.', 'أ) 8، a، 1؛ ب) −3، x، 1؛ ج) 1، $a^{2}b^{3}$، 5؛ د) $\\frac{1}{4}$، $xy^{4}$، 5.') },
            { id: 8, difficulty: 'easy', question: say('Laburtu: a) $3x^{2}+6x^{2}$; b) $5a^{2}+a^{2}+2a^{2}$; c) $11x^{2}-6x^{2}$; d) $m^{3}-5m^{3}$.', 'Reduce: a) $3x^{2}+6x^{2}$; b) $5a^{2}+a^{2}+2a^{2}$; c) $11x^{2}-6x^{2}$; d) $m^{3}-5m^{3}$.', 'بسّط: أ) $3x^{2}+6x^{2}$؛ ب) $5a^{2}+a^{2}+2a^{2}$؛ ج) $11x^{2}-6x^{2}$؛ د) $m^{3}-5m^{3}$.'), solution: same('a) $9x^{2}$; b) $8a^{2}$; c) $5x^{2}$; d) $-4m^{3}$') },
            { id: 9, difficulty: 'medium', question: say('Laburtu: $x^{2}+4x+1+2x+3$ eta $5x^{2}+3x-4x^{2}-2x+1$.', 'Reduce: $x^{2}+4x+1+2x+3$ y $5x^{2}+3x-4x^{2}-2x+1$.', 'بسّط: $x^{2}+4x+1+2x+3$ و$5x^{2}+3x-4x^{2}-2x+1$.'), solution: same('$x^{2}+6x+4\\qquad x^{2}+x+1$') },
            { id: 10, difficulty: 'medium', question: say('Biderkatu: a) $(3x)\\cdot(5xy)$; b) $(-2ab)\\cdot(4b)$; c) $(4x^{3}y)\\cdot(xy)$.', 'Multiplica: a) $(3x)\\cdot(5xy)$; b) $(-2ab)\\cdot(4b)$; c) $(4x^{3}y)\\cdot(xy)$.', 'اضرب: أ) $(3x)\\cdot(5xy)$؛ ب) $(-2ab)\\cdot(4b)$؛ ج) $(4x^{3}y)\\cdot(xy)$.'), solution: same('a) $15x^{2}y$; b) $-8ab^{2}$; c) $4x^{4}y^{2}$') },
            { id: 11, difficulty: 'medium', question: say('Zatitu: a) $(10x)\\mathbin{:}(2x)$; b) $(14a^{2})\\mathbin{:}(-7a)$; c) $(27x^{3})\\mathbin{:}(-9x)$.', 'Divide: a) $(10x)\\mathbin{:}(2x)$; b) $(14a^{2})\\mathbin{:}(-7a)$; c) $(27x^{3})\\mathbin{:}(-9x)$.', 'اقسم: أ) $(10x)\\mathbin{:}(2x)$؛ ب) $(14a^{2})\\mathbin{:}(-7a)$؛ ج) $(27x^{3})\\mathbin{:}(-9x)$.'), solution: same('a) $5$; b) $-2a$; c) $-3x^{2}$') },
            { id: 12, difficulty: 'hard', question: say('Kalkulatu eta laburtu: $(6x^{4})\\mathbin{:}(3x^{2})+5x\\cdot 2x$. Zein da $x^{2}$-ren koefizientea?', 'Calcula y reduce: $(6x^{4})\\mathbin{:}(3x^{2})+5x\\cdot 2x$. ¿Cuál es el coeficiente de $x^{2}$?', 'احسب وبسّط: $(6x^{4})\\mathbin{:}(3x^{2})+5x\\cdot 2x$. ما معامل $x^{2}$؟'), solution: say('$2x^{2}+10x^{2}=12x^{2}$: koefizientea $2+10=12$.', '$2x^{2}+10x^{2}=12x^{2}$: coeficiente $2+10=12$.', '$2x^{2}+10x^{2}=12x^{2}$: المعامل $2+10=12$.'), answer: { expected: fraction(12) } }
        ]
    },
    {
        id: 'polynomials',
        title: say('Polinomioak', 'Polinomios', 'الحدوديات'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Adierazi gai kopurua, gai askea eta maila: $P(x)=11x^{3}-5x^{2}-3x+7$.', 'Indica el número de términos, el término independiente y el grado: $P(x)=11x^{3}-5x^{2}-3x+7$.', 'اذكر عدد الحدود والحد الثابت والدرجة: $P(x)=11x^{3}-5x^{2}-3x+7$.'), solution: say('4 gai, gai askea 7, maila 3.', '4 términos, término independiente 7, grado 3.', '4 حدود، الحد الثابت 7، الدرجة 3.') },
            { id: 14, difficulty: 'easy', question: say('$P(x)=x^{3}-x^{2}+3x-1$. Kalkulatu P(0), P(1) eta P(−1).', '$P(x)=x^{3}-x^{2}+3x-1$. Calcula P(0), P(1) y P(−1).', '$P(x)=x^{3}-x^{2}+3x-1$. احسب P(0) وP(1) وP(−1).'), solution: same('$P(0)=-1\\qquad P(1)=1-1+3-1=2\\qquad P(-1)=-1-1-3-1=-6$') },
            { id: 15, difficulty: 'medium', question: say('Kalkulatu $(3x^{2}-5x+2)+(x^{2}-2x+1)$ eta $(6x^{2}-x)-(3x^{2}-5x+6)$.', 'Calcula $(3x^{2}-5x+2)+(x^{2}-2x+1)$ y $(6x^{2}-x)-(3x^{2}-5x+6)$.', 'احسب $(3x^{2}-5x+2)+(x^{2}-2x+1)$ و$(6x^{2}-x)-(3x^{2}-5x+6)$.'), solution: same('$4x^{2}-7x+3\\qquad 3x^{2}+4x-6$') },
            { id: 16, difficulty: 'medium', question: say('Biderkatu: $-3x\\cdot(2x^{3}-x+5)$.', 'Multiplica: $-3x\\cdot(2x^{3}-x+5)$.', 'اضرب: $-3x\\cdot(2x^{3}-x+5)$.'), solution: same('$-6x^{4}+3x^{2}-15x$') },
            { id: 17, difficulty: 'medium', question: say('Zatitu: $(10x^{5}+8x^{3}-6x^{2}+12x)\\mathbin{:}(2x)$.', 'Divide: $(10x^{5}+8x^{3}-6x^{2}+12x)\\mathbin{:}(2x)$.', 'اقسم: $(10x^{5}+8x^{3}-6x^{2}+12x)\\mathbin{:}(2x)$.'), solution: same('$5x^{4}+4x^{2}-3x+6$') },
            { id: 18, difficulty: 'hard', question: say('Kalkulatu $(5x^{2}+7x+1)\\cdot(6x+8)$. Zein da $x^{2}$-ren koefizientea?', 'Calcula $(5x^{2}+7x+1)\\cdot(6x+8)$. ¿Cuál es el coeficiente de $x^{2}$?', 'احسب $(5x^{2}+7x+1)\\cdot(6x+8)$. ما معامل $x^{2}$؟'), solution: say('$30x^{3}+82x^{2}+62x+8$; $x^{2}$: $5\\cdot 8+7\\cdot 6=40+42=82$.', '$30x^{3}+82x^{2}+62x+8$; $x^{2}$: $5\\cdot 8+7\\cdot 6=40+42=82$.', '$30x^{3}+82x^{2}+62x+8$؛ $x^{2}$: $5\\cdot 8+7\\cdot 6=40+42=82$.'), answer: { expected: fraction(82) } }
        ]
    },
    {
        id: 'products',
        title: say('Biderkadura nabarmenak', 'Productos notables', 'المتطابقات الشهيرة'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Garatu: a) $(x+2)^{2}$; b) $(x-3)^{2}$; c) $(x+5)(x-5)$.', 'Desarrolla: a) $(x+2)^{2}$; b) $(x-3)^{2}$; c) $(x+5)(x-5)$.', 'انشر: أ) $(x+2)^{2}$؛ ب) $(x-3)^{2}$؛ ج) $(x+5)(x-5)$.'), solution: same('a) $x^{2}+4x+4$; b) $x^{2}-6x+9$; c) $x^{2}-25$') },
            { id: 20, difficulty: 'easy', question: say('Egia ala gezurra? $(a+b)^{2}=a^{2}+b^{2}$.', '¿Verdadero o falso? $(a+b)^{2}=a^{2}+b^{2}$.', 'صواب أم خطأ؟ $(a+b)^{2}=a^{2}+b^{2}$.'), solution: say('Gezurra: $2ab$ falta da. Adibidez, $(2+3)^{2}=25$ eta $2^{2}+3^{2}=13$.', 'Falso: falta $2ab$. Por ejemplo, $(2+3)^{2}=25$ y $2^{2}+3^{2}=13$.', 'خطأ: ينقص $2ab$. مثلًا $(2+3)^{2}=25$ و$2^{2}+3^{2}=13$.') },
            { id: 21, difficulty: 'medium', question: say('Garatu: a) $(2a+5b)^{2}$; b) $(7-4x)^{2}$; c) $(3a-4a^{2})(3a+4a^{2})$.', 'Desarrolla: a) $(2a+5b)^{2}$; b) $(7-4x)^{2}$; c) $(3a-4a^{2})(3a+4a^{2})$.', 'انشر: أ) $(2a+5b)^{2}$؛ ب) $(7-4x)^{2}$؛ ج) $(3a-4a^{2})(3a+4a^{2})$.'), solution: same('a) $4a^{2}+20ab+25b^{2}$; b) $49-56x+16x^{2}$; c) $9a^{2}-16a^{4}$') },
            { id: 22, difficulty: 'medium', question: say('Garatu $(2x^{2}+5)^{2}$. Zein da $x^{2}$-ren koefizientea?', 'Desarrolla $(2x^{2}+5)^{2}$. ¿Cuál es el coeficiente de $x^{2}$?', 'انشر $(2x^{2}+5)^{2}$. ما معامل $x^{2}$؟'), solution: say('$4x^{4}+20x^{2}+25$: $2\\cdot 2\\cdot 5=20$.', '$4x^{4}+20x^{2}+25$: $2\\cdot 2\\cdot 5=20$.', '$4x^{4}+20x^{2}+25$: $2\\cdot 2\\cdot 5=20$.'), answer: { expected: fraction(20) } },
            { id: 23, difficulty: 'medium', question: say('Kalkulatu buruz: a) $51^{2}$; b) $49^{2}$; c) $31\\cdot 29$.', 'Calcula de cabeza: a) $51^{2}$; b) $49^{2}$; c) $31\\cdot 29$.', 'احسب ذهنيًا: أ) $51^{2}$؛ ب) $49^{2}$؛ ج) $31\\cdot 29$.'), solution: same('a) $2\\,500+100+1=2\\,601$; b) $2\\,500-100+1=2\\,401$; c) $900-1=899$') },
            { id: 24, difficulty: 'hard', question: say('Laburtu $(x+2)^{2}-(x+2)(x-2)$. Zein da emaitza x = 3 denean?', 'Reduce $(x+2)^{2}-(x+2)(x-2)$. ¿Cuál es el resultado para x = 3?', 'بسّط $(x+2)^{2}-(x+2)(x-2)$. ما الناتج عندما x = 3؟'), solution: say('$x^{2}+4x+4-x^{2}+4=4x+8$, eta $4\\cdot 3+8=20$.', '$x^{2}+4x+4-x^{2}+4=4x+8$, y $4\\cdot 3+8=20$.', '$x^{2}+4x+4-x^{2}+4=4x+8$، و$4\\cdot 3+8=20$.'), answer: { expected: fraction(20) } }
        ]
    },
    {
        id: 'factor',
        title: say('Faktore komuna eta faktorizazioa', 'Factor común y factorización', 'العامل المشترك والتحليل'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Atera faktore komuna: a) $6x+9$; b) $4x-12y$; c) $10a-10b+10c$.', 'Saca factor común: a) $6x+9$; b) $4x-12y$; c) $10a-10b+10c$.', 'أخرج العامل المشترك: أ) $6x+9$؛ ب) $4x-12y$؛ ج) $10a-10b+10c$.'), solution: same('a) $3(2x+3)$; b) $4(x-3y)$; c) $10(a-b+c)$') },
            { id: 26, difficulty: 'easy', question: say('Atera faktore komuna: a) $x^{3}+3x^{2}-2x$; b) $5a^{2}+10a-15a^{3}$.', 'Saca factor común: a) $x^{3}+3x^{2}-2x$; b) $5a^{2}+10a-15a^{3}$.', 'أخرج العامل المشترك: أ) $x^{3}+3x^{2}-2x$؛ ب) $5a^{2}+10a-15a^{3}$.'), solution: same('a) $x(x^{2}+3x-2)$; b) $5a(a+2-3a^{2})$') },
            { id: 27, difficulty: 'medium', question: say('Atera faktore komuna: $12xy^{3}z+20x^{3}y^{2}-8x^{2}yz$.', 'Saca factor común: $12xy^{3}z+20x^{3}y^{2}-8x^{2}yz$.', 'أخرج العامل المشترك: $12xy^{3}z+20x^{3}y^{2}-8x^{2}yz$.'), solution: same('$4xy\\cdot(3y^{2}z+5x^{2}y-2xz)$') },
            { id: 28, difficulty: 'medium', question: say('Idatzi karratu gisa: a) $x^{2}+4x+4$; b) $4x^{2}-12x+9$; c) $9x^{2}+6xy+y^{2}$.', 'Escribe como un cuadrado: a) $x^{2}+4x+4$; b) $4x^{2}-12x+9$; c) $9x^{2}+6xy+y^{2}$.', 'اكتب على شكل مربع: أ) $x^{2}+4x+4$؛ ب) $4x^{2}-12x+9$؛ ج) $9x^{2}+6xy+y^{2}$.'), solution: same('a) $(x+2)^{2}$; b) $(2x-3)^{2}$; c) $(3x+y)^{2}$') },
            { id: 29, difficulty: 'medium', question: say('Idatzi batura bider kendura gisa: a) $x^{2}-16$; b) $16z^{2}-25$; c) $36x^{4}-9x^{2}$.', 'Escribe como suma por diferencia: a) $x^{2}-16$; b) $16z^{2}-25$; c) $36x^{4}-9x^{2}$.', 'اكتب على شكل مجموع في فرق: أ) $x^{2}-16$؛ ب) $16z^{2}-25$؛ ج) $36x^{4}-9x^{2}$.'), solution: same('a) $(x+4)(x-4)$; b) $(4z+5)(4z-5)$; c) $(6x^{2}+3x)(6x^{2}-3x)$') },
            { id: 30, difficulty: 'hard', question: say('Kalkulatu buruz: $765^{2}-764^{2}$.', 'Calcula de cabeza: $765^{2}-764^{2}$.', 'احسب ذهنيًا: $765^{2}-764^{2}$.'), solution: same('$(765+764)(765-764)=1\\,529$'), answer: { expected: fraction(1529) } }
        ]
    }
]
