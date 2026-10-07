import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { MonomialFigure, PerimeterFigure, TilesFigure } from '../dbh1-aljebra-v2/figures'
import { CommonFactorFigure, PolynomialFigure, ProductAreaFigure, SquareSumFigure } from '../dbh2-aljebra-v2/figures'
import { AlgebraicFractionFigure, FactorizeFigure, LongDivisionFigure, RectangleProblemFigure, RemainderFigure, RootsFigure, RuffiniFigure, SimplifyFigure } from './figures'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — stages and lessons. Follows the class
   textbook (Santillana Aplicadas 4, unit 3 «Polinomios»: monomials and
   their operations, the value of a polynomial, adding, multiplying and
   dividing, Ruffini, the notable identities, roots and factorisation) and
   Anaya Aplicadas 4, unit 5 «Expresiones algebraicas» (algebraic language,
   the remainder theorem, integer roots among the divisors of the constant
   term, algebraic fractions and getting expressions ready for equations).
   The first two stages review 2. DBH with fourth-year exercises; division,
   Ruffini, roots and factorisation are new.
   ========================================================================== */

export type PolynomialsStageId = 'monomials' | 'operations' | 'division' | 'factor' | 'expressions'

export const polynomialsStages: UnitStage[] = [
    { id: 'monomials', tone: 'blue', title: { eu: 'Monomioak eta polinomioak', es: 'Monomios y polinomios', ar: 'وحيدات الحد والحدوديات' } },
    { id: 'operations', tone: 'violet', title: { eu: 'Eragiketak eta identitateak', es: 'Operaciones e identidades', ar: 'العمليات والمتطابقات' } },
    { id: 'division', tone: 'mustard', title: { eu: 'Zatiketa eta Ruffini', es: 'División y Ruffini', ar: 'القسمة وروفيني' } },
    { id: 'factor', tone: 'coral', title: { eu: 'Erroak eta faktorizazioa', es: 'Raíces y factorización', ar: 'الجذور والتحليل' } },
    { id: 'expressions', tone: 'green', title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', ar: 'العبارات الجبرية' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const polynomialsTopics: UnitTopic[] = [
    /* ---------- 1. Monomials and polynomials ---------- */
    {
        id: 'monomials',
        stage: 'monomials',
        title: say('Monomioak eta haien eragiketak', 'Monomios y sus operaciones', 'وحيدات الحد وعملياتها'),
        goal: say('Monomio baten koefizientea, zati literala eta maila ezagutzea, eta monomioak batu, biderkatu eta zatitzea.', 'Reconocer el coeficiente, la parte literal y el grado de un monomio, y sumar, multiplicar y dividir monomios.', 'التعرّف على معامل وحيد الحد وجزئه الحرفي ودرجته، وجمع وحيدات الحد وضربها وقسمتها.'),
        explanation: say(
            'Monomio bat zenbaki bat (koefizientea) eta letra batzuen biderkadura (zati literala) da. Maila letren berretzaileen batura da: $4xy^{2}t$ monomioaren maila $1+2+1=4$ da. Bi monomio antzekoak dira zati literal bera badute. Antzekoak bakarrik batu edo kendu daitezke, koefizienteak batuz: $7x^{2}-3x^{2}+x^{2}=5x^{2}$; $x+x^{3}$ ezin da laburtu. Biderkatzean koefizienteak biderkatu eta oinarri bereko berretzaileak batu: $(3x^{2})\\cdot(5xy)=15x^{3}y$. Zatitzean, koefizienteak zatitu eta berretzaileak kendu: $(20x^{3})\\mathbin{:}(-2x^{2})=-10x$.',
            'Un monomio es el producto de un número (el coeficiente) por unas letras (la parte literal). El grado es la suma de los exponentes de las letras: $4xy^{2}t$ tiene grado $1+2+1=4$. Dos monomios son semejantes si tienen la misma parte literal. Solo se pueden sumar o restar los semejantes, sumando los coeficientes: $7x^{2}-3x^{2}+x^{2}=5x^{2}$; $x+x^{3}$ no se puede reducir. Al multiplicar se multiplican los coeficientes y se suman los exponentes de la misma base: $(3x^{2})\\cdot(5xy)=15x^{3}y$. Al dividir, se dividen los coeficientes y se restan los exponentes: $(20x^{3})\\mathbin{:}(-2x^{2})=-10x$.',
            'وحيد الحد هو جداء عدد (المعامل) في حروف (الجزء الحرفي). والدرجة مجموع أسس الحروف: درجة $4xy^{2}t$ هي $1+2+1=4$. ويكون وحيدا حد متشابهين إذا كان لهما الجزء الحرفي نفسه. ولا نجمع أو نطرح إلا المتشابهة بجمع المعاملات: $7x^{2}-3x^{2}+x^{2}=5x^{2}$؛ أما $x+x^{3}$ فلا تُختصر. وعند الضرب نضرب المعاملات ونجمع أسس الأساس نفسه: $(3x^{2})\\cdot(5xy)=15x^{3}y$. وعند القسمة نقسم المعاملات ونطرح الأسس: $(20x^{3})\\mathbin{:}(-2x^{2})=-10x$.'
        ),
        problem: say('$A=5x^{2}$, $B=4x$ eta $C=-2x^{2}$ badira, kalkulatu $(A\\cdot B)\\mathbin{:}C$.', 'Si $A=5x^{2}$, $B=4x$ y $C=-2x^{2}$, calcula $(A\\cdot B)\\mathbin{:}C$.', 'إذا كان $A=5x^{2}$ و$B=4x$ و$C=-2x^{2}$، فاحسب $(A\\cdot B)\\mathbin{:}C$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura.', 'El producto.', 'الجداء.'), math: same('$5x^{2}\\cdot 4x=20x^{3}$') },
            { text: say('Zatidura: koefizienteak zatitu, berretzaileak kendu.', 'El cociente: divide coeficientes, resta exponentes.', 'القسمة: اقسم المعاملات واطرح الأسس.'), math: same('$20x^{3}\\mathbin{:}(-2x^{2})=-10x$') }
        ],
        example: same('$7x^{2}-3x^{2}+x^{2}=5x^{2}$'),
        takeaway: say('Batu: antzekoak bakarrik. Biderkatu: berretzaileak batu. Zatitu: kendu.', 'Sumar: solo semejantes. Multiplicar: se suman exponentes. Dividir: se restan.', 'الجمع: المتشابهة فقط. الضرب: تُجمع الأسس. القسمة: تُطرح.'),
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'polynomial-value',
        stage: 'monomials',
        title: say('Polinomioak eta zenbakizko balioa', 'Polinomios y valor numérico', 'الحدوديات والقيمة العددية'),
        goal: say('Polinomio baten maila eta gai askea ezagutzea eta $P(a)$ zenbakizko balioa kalkulatzea.', 'Reconocer el grado y el término independiente de un polinomio y calcular su valor numérico $P(a)$.', 'التعرّف على درجة الحدودية وحدّها الثابت وحساب قيمتها العددية $P(a)$.'),
        explanation: say(
            'Polinomio bat antzekoak ez diren monomioen batura da; monomio bakoitza gai bat da. Polinomioaren maila gaien mailarik handiena da, eta gai askea letrarik gabekoa. $P(x)=x^{5}-6x^{2}+3x+1$ polinomioaren maila 5 da eta gai askea 1. Zenbakizko balioa, $P(a)$, x-ren ordez a jarrita lortzen da: $P(x)=x^{3}-x^{2}+3x-1$ bada, $P(2)=8-4+6-1=9$. Negatiboak parentesi artean: $P(-1)=-1-1-3-1=-6$. Lehenik berreturak, gero biderketak eta azkenik batuketak.',
            'Un polinomio es una suma de monomios no semejantes; cada monomio es un término. El grado del polinomio es el mayor de los grados de sus términos, y el término independiente es el que no tiene letra. $P(x)=x^{5}-6x^{2}+3x+1$ tiene grado 5 y término independiente 1. El valor numérico, $P(a)$, se obtiene poniendo a en lugar de x: si $P(x)=x^{3}-x^{2}+3x-1$, $P(2)=8-4+6-1=9$. Los negativos, entre paréntesis: $P(-1)=-1-1-3-1=-6$. Primero las potencias, después los productos y al final las sumas.',
            'الحدودية مجموع وحيدات حد غير متشابهة، وكل وحيد حد منها حدّ. ودرجة الحدودية أكبر درجات حدودها، والحد الثابت هو الذي لا حرف فيه. درجة $P(x)=x^{5}-6x^{2}+3x+1$ هي 5 وحدّها الثابت 1. والقيمة العددية $P(a)$ نحصل عليها بوضع a مكان x: إذا كان $P(x)=x^{3}-x^{2}+3x-1$ فإن $P(2)=8-4+6-1=9$. والسالب بين قوسين: $P(-1)=-1-1-3-1=-6$. القوى أولًا ثم الضرب ثم الجمع.'
        ),
        problem: say('$P(x)=2x^{3}-7x^{2}-17x+10$ bada, kalkulatu $P(-3)$.', 'Si $P(x)=2x^{3}-7x^{2}-17x+10$, calcula $P(-3)$.', 'إذا كان $P(x)=2x^{3}-7x^{2}-17x+10$ فاحسب $P(-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu, parentesiekin.', 'Sustituye, con paréntesis.', 'عوّض مع الأقواس.'), math: same('$2\\cdot(-27)-7\\cdot 9-17\\cdot(-3)+10$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$-54-63+51+10=-56$') }
        ],
        example: same('$P(2)=8-4+6-1=9$'),
        takeaway: say('$P(A)$: ordeztu x, negatiboak parentesi artean, lehenik berreturak.', '$P(A)$: sustituye x, negativos entre paréntesis, primero las potencias.', '$P(A)$: عوّض x، والسالب بين قوسين، والقوى أولًا.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'language',
        stage: 'monomials',
        title: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية'),
        goal: say('Enuntziatuak, perimetroak, azalerak eta bolumenak polinomio gisa adieraztea.', 'Expresar enunciados, perímetros, áreas y volúmenes mediante polinomios.', 'التعبير عن العبارات والمحيطات والمساحات والأحجام بحدوديات.'),
        explanation: say(
            'Letra batek edozein zenbaki adierazten du, eta harekin enuntziatuak itzul daitezke: zenbaki bat gehi haren kuboa, $x+x^{3}$; bi zenbaki natural jarraien batura, $n+(n+1)=2n+1$; hiru zenbaki jarrai, $3x+3$. Ehunekoak indizeekin: x kantitatea % 12 igo bada, $1{,}12x$; % 5 galdu bada, $0{,}95x$. Geometrian: oinarri karratua (x aldea) eta y altuera dituen ortoedroaren bolumena $x^{2}y$ da, eta oinarriaren perimetroa $4x$. Bi zenbakiren kendura 20 bada eta txikiena x, handiena $x+20$ da eta haien biderkadura $x^{2}+20x$.',
            'Una letra representa cualquier número, y con ella se traducen enunciados: un número más su cubo, $x+x^{3}$; la suma de dos naturales consecutivos, $n+(n+1)=2n+1$; tres números consecutivos, $3x+3$. Los porcentajes, con índices: si una cantidad x ha aumentado un 12 %, $1{,}12x$; si ha perdido el 5 %, $0{,}95x$. En geometría: el volumen de un ortoedro de base cuadrada de lado x y altura y es $x^{2}y$, y el perímetro de la base, $4x$. Si la diferencia de dos números es 20 y el menor es x, el mayor es $x+20$ y su producto, $x^{2}+20x$.',
            'يمثّل الحرف أي عدد، وبه نترجم العبارات: عدد زائد مكعّبه $x+x^{3}$؛ مجموع عددين طبيعيين متتاليين $n+(n+1)=2n+1$؛ ثلاثة أعداد متتالية $3x+3$. والنسب بالمؤشرات: إذا زادت كمية x بنسبة 12٪ صارت $1{,}12x$، وإذا خسرت 5٪ صارت $0{,}95x$. وفي الهندسة: حجم متوازي مستطيلات قاعدته مربع ضلعه x وارتفاعه y هو $x^{2}y$، ومحيط القاعدة $4x$. وإذا كان فرق عددين 20 وأصغرهما x فأكبرهما $x+20$ وجداؤهما $x^{2}+20x$.'
        ),
        problem: say('Albertoren aitak 28 urte gehiago ditu. Alberto x urtekoa bada, adierazi bien adinen batura eta kalkulatu x = 12 denean.', 'El padre de Alberto tiene 28 años más que él. Si Alberto tiene x años, expresa la suma de sus edades y calcúlala para x = 12.', 'يكبر والد ألبرتو ابنه بـ28 سنة. إذا كان عمر ألبرتو x فعبّر عن مجموع عمريهما واحسبه عندما x = 12.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aitaren adina.', 'La edad del padre.', 'عمر الأب.'), math: same('$x+28$') },
            { text: say('Batura.', 'La suma.', 'المجموع.'), math: same('$x+(x+28)=2x+28$') },
            { text: say('x = 12.', 'x = 12.', 'x = 12.'), math: same('$2\\cdot 12+28=52$') }
        ],
        example: same('$n+(n+1)=2n+1$'),
        takeaway: say('Izendatu ezezaguna letraz eta idatzi beste guztia harekin.', 'Llama con una letra a la incógnita y escribe todo lo demás con ella.', 'سمِّ المجهول بحرف واكتب كل الباقي به.'),
        figure: (language) => <PerimeterFigure language={language} />
    },

    /* ---------- 2. Operations and identities ---------- */
    {
        id: 'add-subtract',
        stage: 'operations',
        title: say('Polinomioen batuketa eta kenketa', 'Suma y resta de polinomios', 'جمع الحدوديات وطرحها'),
        goal: say('Polinomioak batu eta kentzea, parentesiak kenduz eta antzeko gaiak batuz.', 'Sumar y restar polinomios quitando paréntesis y agrupando términos semejantes.', 'جمع الحدوديات وطرحها بإزالة الأقواس وجمع الحدود المتشابهة.'),
        explanation: say(
            'Bi polinomio batzeko, maila bereko gaiak batzen dira. Kentzeko, kenkizunaren gai guztien zeinua aldatzen da eta gero batu: minus baten atzeko parentesian zeinu guztiak aldatzen dira. $P=x^{5}-3x^{4}+5x+9$ eta $Q=5x^{2}+3x-11$ badira, $P+Q=x^{5}-3x^{4}+5x^{2}+8x-2$ eta $P-Q=x^{5}-3x^{4}-5x^{2}+2x+20$. Lagungarria da bata bestearen azpian idaztea, maila bereko gaiak zutabe berean eta falta direnen tokian hutsunea utzita. Zenbaki batez biderkatzea ere bai: $2P-3Q$, lehenik $2P$ eta $3Q$.',
            'Para sumar dos polinomios se suman los términos del mismo grado. Para restar se cambia el signo de todos los términos del sustraendo y se suma: tras un menos, cambian todos los signos del paréntesis. Si $P=x^{5}-3x^{4}+5x+9$ y $Q=5x^{2}+3x-11$, $P+Q=x^{5}-3x^{4}+5x^{2}+8x-2$ y $P-Q=x^{5}-3x^{4}-5x^{2}+2x+20$. Ayuda escribirlos uno debajo del otro, los términos del mismo grado en la misma columna y un hueco donde falten. También con números delante: $2P-3Q$, primero $2P$ y $3Q$.',
            'لجمع حدوديتين نجمع الحدود ذات الدرجة نفسها. وللطرح نغيّر إشارة كل حدود المطروح ثم نجمع: بعد الناقص تتغيّر كل إشارات القوس. إذا كان $P=x^{5}-3x^{4}+5x+9$ و$Q=5x^{2}+3x-11$ فإن $P+Q=x^{5}-3x^{4}+5x^{2}+8x-2$ و$P-Q=x^{5}-3x^{4}-5x^{2}+2x+20$. ويساعد أن نكتبهما واحدة تحت الأخرى، الحدود ذات الدرجة نفسها في العمود نفسه، مع ترك فراغ للحد الناقص. وكذلك مع الأعداد: $2P-3Q$، أولًا $2P$ و$3Q$.'
        ),
        problem: say('Kendu parentesiak eta laburtu: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.', 'Quita paréntesis y reduce: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.', 'أزل الأقواس وبسّط: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Minusaren atzean zeinuak aldatu.', 'Tras el menos cambian los signos.', 'بعد الناقص تتغيّر الإشارات.'), math: same('$7x^{2}-9x+1-x^{3}+5x^{2}+4+x^{3}-4x^{2}$') },
            { text: say('Antzekoak batu.', 'Agrupa semejantes.', 'اجمع المتشابهة.'), math: same('$8x^{2}-9x+5$') }
        ],
        example: same('$-(x^{3}-4)=-x^{3}+4$'),
        takeaway: say('Minus baten atzean, parentesiko zeinu guztiak aldatu.', 'Tras un menos, cambia todos los signos del paréntesis.', 'بعد الناقص غيّر كل إشارات القوس.'),
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: say('Polinomioen biderketa', 'Multiplicación de polinomios', 'ضرب الحدوديات'),
        goal: say('Monomio bat polinomio batez eta bi polinomio elkarren artean biderkatzea.', 'Multiplicar un monomio por un polinomio y dos polinomios entre sí.', 'ضرب وحيد حد في حدودية وضرب حدوديتين.'),
        explanation: say(
            'Monomio bat polinomio batez biderkatzeko, gai bakoitzaz biderkatzen da (banatze-propietatea): $-5x^{3}\\cdot(3x^{2}+7x+11)=-15x^{5}-35x^{4}-55x^{3}$. Bi polinomio biderkatzeko, lehenengoaren gai bakoitza bigarrenaren gai guztiez biderkatzen da, eta gero antzekoak batu: $(5x^{2}-3)(-5x+2)=-25x^{3}+10x^{2}+15x-6$. Emaitzaren maila bi mailen batura da. Zenbat gai: lehenengoarenak bider bigarrenarenak, laburtu aurretik. Alderantziz ere bai: $x\\cdot P=x^{3}-3x^{2}-5x$ bada, $P=x^{2}-3x-5$.',
            'Para multiplicar un monomio por un polinomio se multiplica por cada término (propiedad distributiva): $-5x^{3}\\cdot(3x^{2}+7x+11)=-15x^{5}-35x^{4}-55x^{3}$. Para multiplicar dos polinomios, cada término del primero se multiplica por todos los del segundo, y luego se agrupan los semejantes: $(5x^{2}-3)(-5x+2)=-25x^{3}+10x^{2}+15x-6$. El grado del resultado es la suma de los grados. Cuántos productos: los términos del primero por los del segundo, antes de reducir. También al revés: si $x\\cdot P=x^{3}-3x^{2}-5x$, entonces $P=x^{2}-3x-5$.',
            'لضرب وحيد حد في حدودية نضربه في كل حد (خاصية التوزيع): $-5x^{3}\\cdot(3x^{2}+7x+11)=-15x^{5}-35x^{4}-55x^{3}$. ولضرب حدوديتين نضرب كل حد من الأولى في كل حدود الثانية ثم نجمع المتشابهة: $(5x^{2}-3)(-5x+2)=-25x^{3}+10x^{2}+15x-6$. ودرجة الناتج مجموع الدرجتين. وعدد الجداءات: حدود الأولى في حدود الثانية قبل التبسيط. وبالعكس أيضًا: إذا كان $x\\cdot P=x^{3}-3x^{2}-5x$ فإن $P=x^{2}-3x-5$.'
        ),
        problem: say('Kalkulatu $(x^{2}-4x+1)\\cdot(-5x+2)$.', 'Calcula $(x^{2}-4x+1)\\cdot(-5x+2)$.', 'احسب $(x^{2}-4x+1)\\cdot(-5x+2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider $-5x$.', 'Por $-5x$.', 'في $-5x$.'), math: same('$-5x^{3}+20x^{2}-5x$') },
            { text: say('Bider 2.', 'Por 2.', 'في 2.'), math: same('$2x^{2}-8x+2$') },
            { text: say('Batu antzekoak.', 'Suma los semejantes.', 'اجمع المتشابهة.'), math: same('$-5x^{3}+22x^{2}-13x+2$') }
        ],
        example: same('$(x+2)(x+3)=x^{2}+5x+6$'),
        takeaway: say('Gai bakoitza gai guztiez; gero antzekoak batu.', 'Cada término por todos; luego agrupa semejantes.', 'كل حد في كل الحدود؛ ثم اجمع المتشابهة.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'identities',
        stage: 'operations',
        title: say('Identitate nabarmenak', 'Igualdades notables', 'المتطابقات الشهيرة'),
        goal: say('Batura baten eta kendura baten karratua eta batura bider kendura zuzenean garatzea.', 'Desarrollar directamente el cuadrado de una suma y de una diferencia y la suma por diferencia.', 'نشر مربع المجموع ومربع الفرق والمجموع في الفرق مباشرة.'),
        explanation: say(
            'Hiru biderkadura hain ohikoak dira, ezen buruz ikasten baitira. Batura baten karratua: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Kendura baten karratua: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Batura bider kendura: $(a+b)(a-b)=a^{2}-b^{2}$. Adibidez, $(3x-2)^{2}=9x^{2}-12x+4$, $(3x^{2}+5)^{2}=9x^{4}+30x^{2}+25$ eta $(2x+3)(2x-3)=4x^{2}-9$. Akatsik ohikoena $2ab$ ahaztea da: $(x+3)^{2}$ ez da $x^{2}+9$. Atzera ere erabiltzen dira faktorizatzeko: $x^{2}-9=(x+3)(x-3)$.',
            'Tres productos son tan frecuentes que se aprenden de memoria. Cuadrado de una suma: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Cuadrado de una diferencia: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Suma por diferencia: $(a+b)(a-b)=a^{2}-b^{2}$. Por ejemplo, $(3x-2)^{2}=9x^{2}-12x+4$, $(3x^{2}+5)^{2}=9x^{4}+30x^{2}+25$ y $(2x+3)(2x-3)=4x^{2}-9$. El error más común es olvidar $2ab$: $(x+3)^{2}$ no es $x^{2}+9$. También se usan al revés para factorizar: $x^{2}-9=(x+3)(x-3)$.',
            'هناك ثلاثة جداءات شائعة جدًا تُحفظ عن ظهر قلب. مربع المجموع: $(a+b)^{2}=a^{2}+2ab+b^{2}$. مربع الفرق: $(a-b)^{2}=a^{2}-2ab+b^{2}$. المجموع في الفرق: $(a+b)(a-b)=a^{2}-b^{2}$. مثلًا $(3x-2)^{2}=9x^{2}-12x+4$ و$(3x^{2}+5)^{2}=9x^{4}+30x^{2}+25$ و$(2x+3)(2x-3)=4x^{2}-9$. وأكثر الأخطاء شيوعًا نسيان $2ab$: $(x+3)^{2}$ ليست $x^{2}+9$. وتُستعمل بالعكس للتحليل: $x^{2}-9=(x+3)(x-3)$.'
        ),
        problem: say('Garatu $(-4x-1)^{2}$.', 'Desarrolla $(-4x-1)^{2}$.', 'انشر $(-4x-1)^{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'Cuadrado del primero.', 'مربع الأول.'), math: same('$(-4x)^{2}=16x^{2}$') },
            { text: say('Bikoitza bider biderkadura.', 'Doble del producto.', 'ضعف الجداء.'), math: same('$2\\cdot(-4x)\\cdot(-1)=8x$') },
            { text: say('Bigarrenaren karratua.', 'Cuadrado del segundo.', 'مربع الثاني.'), math: same('$(-1)^{2}=1$') }
        ],
        example: same('$(3x-2)^{2}=9x^{2}-12x+4$'),
        takeaway: say('$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$; $(A+B)(A-B)=A^{2}-B^{2}$.', '$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$; $(A+B)(A-B)=A^{2}-B^{2}$.', '$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$؛ $(A+B)(A-B)=A^{2}-B^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },

    /* ---------- 3. Division and Ruffini ---------- */
    {
        id: 'long-division',
        stage: 'division',
        title: say('Polinomioen zatiketa', 'División de polinomios', 'قسمة الحدوديات'),
        goal: say('Bi polinomio zatitzea eta emaitza $D=d\\cdot c+r$ moduan egiaztatzea.', 'Dividir dos polinomios y comprobar el resultado como $D=d\\cdot c+r$.', 'قسمة حدوديتين والتحقق من الناتج بالشكل $D=d\\cdot c+r$.'),
        explanation: say(
            'Zenbakiekin bezala: zatikizunaren lehen gaia zatitzailearen lehen gaiaz zatitu (zatiduraren lehen gaia), zatitzailea harekin biderkatu, emaitza aldatutako zeinuarekin azpian idatzi eta batu; eta jarraitu hondarraren maila zatitzailearena baino txikiagoa izan arte. $(3x^{2}-11x+5)\\mathbin{:}(x+6)$: $3x^{2}\\mathbin{:}x=3x$; $3x(x+6)=3x^{2}+18x$; kenduz $-29x+5$; $-29x\\mathbin{:}x=-29$; $-29(x+6)=-29x-174$; kenduz 179. Beraz zatidura $3x-29$ eta hondarra 179: $3x^{2}-11x+5=(x+6)(3x-29)+179$. Zatikizunean gai bat falta bada, utzi tokia (0 koefizientea).',
            'Como con números: se divide el primer término del dividendo entre el primero del divisor (primer término del cociente), se multiplica el divisor por él, se escribe debajo cambiado de signo y se suma; y se sigue hasta que el resto tenga grado menor que el divisor. $(3x^{2}-11x+5)\\mathbin{:}(x+6)$: $3x^{2}\\mathbin{:}x=3x$; $3x(x+6)=3x^{2}+18x$; al restar, $-29x+5$; $-29x\\mathbin{:}x=-29$; $-29(x+6)=-29x-174$; al restar, 179. Así que el cociente es $3x-29$ y el resto 179: $3x^{2}-11x+5=(x+6)(3x-29)+179$. Si en el dividendo falta un término, deja su hueco (coeficiente 0).',
            'كما في الأعداد: نقسم أول حد في المقسوم على أول حد في المقسوم عليه (أول حد في خارج القسمة)، ونضرب المقسوم عليه فيه، ونكتب الناتج تحته بإشارة معاكسة ونجمع؛ ونتابع حتى تصير درجة الباقي أصغر من درجة المقسوم عليه. $(3x^{2}-11x+5)\\mathbin{:}(x+6)$: $3x^{2}\\mathbin{:}x=3x$؛ $3x(x+6)=3x^{2}+18x$؛ بالطرح $-29x+5$؛ $-29x\\mathbin{:}x=-29$؛ $-29(x+6)=-29x-174$؛ بالطرح 179. إذن خارج القسمة $3x-29$ والباقي 179: $3x^{2}-11x+5=(x+6)(3x-29)+179$. وإذا نقص حد في المقسوم فاترك مكانه (المعامل 0).'
        ),
        problem: say('Zatitu $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.', 'Divide $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.', 'اقسم $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen gaia.', 'Primer término.', 'الحد الأول.'), math: same('$6x^{3}\\mathbin{:}3x=2x^{2}$') },
            { text: say('Kendu $2x^{2}(3x+1)$: $18x+3$ geratzen da.', 'Resta $2x^{2}(3x+1)$: queda $18x+3$.', 'اطرح $2x^{2}(3x+1)$: يبقى $18x+3$.'), math: same('$18x\\mathbin{:}3x=6$') },
            { text: say('Hondarra.', 'El resto.', 'الباقي.'), math: same('$18x+3-(18x+6)=-3$') }
        ],
        example: same('$D=d\\cdot c+r$'),
        takeaway: say('Zatikizuna = zatitzailea · zatidura + hondarra.', 'Dividendo = divisor · cociente + resto.', 'المقسوم = المقسوم عليه · خارج القسمة + الباقي.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },
    {
        id: 'ruffini',
        stage: 'division',
        title: say('Ruffiniren erregela', 'La regla de Ruffini', 'قاعدة روفيني'),
        goal: say('Polinomio bat $(x-a)$ binomioaz Ruffiniren erregelaz zatitzea.', 'Dividir un polinomio entre $(x-a)$ con la regla de Ruffini.', 'قسمة حدودية على $(x-a)$ بقاعدة روفيني.'),
        explanation: say(
            'Zatitzailea $x-a$ motakoa denean, koefizienteekin bakarrik egiten da zatiketa. Idatzi zatikizunaren koefiziente guztiak (falta direnen tokian 0), eta ezkerrean a. Jaitsi lehen koefizientea; bider a eta hurrengoaren azpian idatzi; batu; eta errepikatu. Azken zenbakia hondarra da, eta besteak zatiduraren koefizienteak, maila bat txikiagoa. $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$: 1; $1\\cdot 5-7=-2$; $-2\\cdot 5+9=-1$; $-1\\cdot 5-3=-8$. Zatidura $x^{2}-2x-1$, hondarra $-8$. Kontuz zeinuarekin: $x+3$ bada, $a=-3$.',
            'Cuando el divisor es de la forma $x-a$, la división se hace solo con los coeficientes. Escribe todos los coeficientes del dividendo (0 donde falte un término) y a la izquierda a. Baja el primer coeficiente; multiplícalo por a y escríbelo bajo el siguiente; suma; y repite. El último número es el resto, y los demás, los coeficientes del cociente, de un grado menos. $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$: 1; $1\\cdot 5-7=-2$; $-2\\cdot 5+9=-1$; $-1\\cdot 5-3=-8$. Cociente $x^{2}-2x-1$, resto $-8$. Cuidado con el signo: si es $x+3$, $a=-3$.',
            'عندما يكون المقسوم عليه من الشكل $x-a$ نقسم بالمعاملات فقط. اكتب كل معاملات المقسوم (0 مكان الحد الناقص) وa على اليسار. أنزل المعامل الأول، واضربه في a واكتبه تحت التالي، واجمع، وكرّر. آخر عدد هو الباقي، والأعداد الأخرى معاملات خارج القسمة بدرجة أقل بواحد. $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$: 1؛ $1\\cdot 5-7=-2$؛ $-2\\cdot 5+9=-1$؛ $-1\\cdot 5-3=-8$. خارج القسمة $x^{2}-2x-1$ والباقي $-8$. انتبه للإشارة: إذا كان $x+3$ فإن $a=-3$.'
        ),
        problem: say('Ruffiniz: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.', 'Con Ruffini: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.', 'بروفيني: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-3$. Jaitsi 2.', '$a=-3$. Baja el 2.', '$a=-3$. أنزل 2.'), math: same('$2\\cdot(-3)+7=1$') },
            { text: say('Jarraitu.', 'Sigue.', 'تابع.'), math: same('$1\\cdot(-3)+2=-1$') },
            { text: say('Hondarra: 7. Zatidura $2x^{2}+x-1$.', 'Resto: 7. Cociente $2x^{2}+x-1$.', 'الباقي: 7. خارج القسمة $2x^{2}+x-1$.'), math: same('$-1\\cdot(-3)+4=7$') }
        ],
        example: same('$C(x)=x^{2}-2x-1,\\ R=-8$'),
        takeaway: say('Jaitsi, bider a, batu. Azkena hondarra da.', 'Baja, multiplica por a, suma. El último es el resto.', 'أنزل، اضرب في a، اجمع. الأخير هو الباقي.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'division',
        title: say('Hondarraren teorema', 'El teorema del resto', 'مبرهنة الباقي'),
        goal: say('$P(x)\\mathbin{:}(x-a)$ zatiketaren hondarra $P(a)$ dela erabiltzea, eta $P(a)$ Ruffiniz kalkulatzea.', 'Usar que el resto de $P(x)\\mathbin{:}(x-a)$ es $P(a)$, y calcular $P(a)$ con Ruffini.', 'استعمال أن باقي $P(x)\\mathbin{:}(x-a)$ هو $P(a)$، وحساب $P(a)$ بروفيني.'),
        explanation: say(
            '$P(x)=(x-a)\\cdot C(x)+R$ bada eta x-ren ordez a jartzen badugu, $(a-a)=0$ denez, $P(a)=R$ geratzen da. Hori da hondarraren teorema: $P(x)\\mathbin{:}(x-a)$ zatiketaren hondarra polinomioaren balioa da x = a denean. $M(x)=x^{4}-8x^{3}+15x^{2}+7x+8$: $M(4)=256-512+240+28+8=20$, eta Ruffinik ere 20 ematen du. Bi norabideetan balio du: hondarra jakinda, balioa badakigu, eta alderantziz. $P(7)=54$ bada, $P(x)\\mathbin{:}(x-7)$ zatiketaren hondarra 54 da; $P(8)=0$ bada, zatiketa zehatza da.',
            'Si $P(x)=(x-a)\\cdot C(x)+R$ y ponemos a en lugar de x, como $(a-a)=0$, queda $P(a)=R$. Ese es el teorema del resto: el resto de $P(x)\\mathbin{:}(x-a)$ es el valor del polinomio para x = a. $M(x)=x^{4}-8x^{3}+15x^{2}+7x+8$: $M(4)=256-512+240+28+8=20$, y Ruffini también da 20. Funciona en los dos sentidos: sabiendo el resto se sabe el valor, y al revés. Si $P(7)=54$, el resto de $P(x)\\mathbin{:}(x-7)$ es 54; si $P(8)=0$, la división es exacta.',
            'إذا كان $P(x)=(x-a)\\cdot C(x)+R$ ووضعنا a مكان x، فلأن $(a-a)=0$ يبقى $P(a)=R$. هذه مبرهنة الباقي: باقي $P(x)\\mathbin{:}(x-a)$ هو قيمة الحدودية عندما x = a. $M(x)=x^{4}-8x^{3}+15x^{2}+7x+8$: $M(4)=256-512+240+28+8=20$، وروفيني يعطي 20 أيضًا. وتعمل في الاتجاهين: بمعرفة الباقي نعرف القيمة، وبالعكس. إذا كان $P(7)=54$ فباقي $P(x)\\mathbin{:}(x-7)$ هو 54؛ وإذا كان $P(8)=0$ فالقسمة تامة.'
        ),
        problem: say('$P(x)=3x^{3}-5x^{2}-9x+3$. Zein da $P(x)\\mathbin{:}(x+1)$ zatiketaren hondarra?', '$P(x)=3x^{3}-5x^{2}-9x+3$. ¿Cuál es el resto de $P(x)\\mathbin{:}(x+1)$?', '$P(x)=3x^{3}-5x^{2}-9x+3$. ما باقي $P(x)\\mathbin{:}(x+1)$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x+1=x-(-1)$: kalkulatu $P(-1)$.', '$x+1=x-(-1)$: calcula $P(-1)$.', '$x+1=x-(-1)$: احسب $P(-1)$.'), math: same('$3\\cdot(-1)-5\\cdot 1-9\\cdot(-1)+3$') },
            { text: say('Hondarra 4.', 'El resto es 4.', 'الباقي 4.'), math: same('$-3-5+9+3=4$') }
        ],
        example: same('$R=M(4)=20$'),
        takeaway: say('$P(X)\\mathbin{:}(X-A)$ zatiketaren hondarra $=P(A)$.', 'Resto de $P(X)\\mathbin{:}(X-A)$ $=P(A)$.', 'باقي $P(X)\\mathbin{:}(X-A)$ $=P(A)$.'),
        figure: (language) => <RemainderFigure language={language} />
    },

    /* ---------- 4. Roots and factorisation ---------- */
    {
        id: 'roots',
        stage: 'factor',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور الحدودية'),
        goal: say('Zenbaki bat polinomio baten erroa den egiaztatzea eta erro osoak gai askearen zatitzaileen artean bilatzea.', 'Comprobar si un número es raíz de un polinomio y buscar las raíces enteras entre los divisores del término independiente.', 'التحقق من أن عددًا جذر لحدودية والبحث عن الجذور الصحيحة بين قواسم الحد الثابت.'),
        explanation: say(
            'a zenbakia $P(x)$ polinomioaren erroa da $P(a)=0$ bada; orduan $P(x)\\mathbin{:}(x-a)$ zatiketa zehatza da eta $x-a$ faktore bat da. $(x-2)(x+5)(x-6)$ polinomioaren erroak 2, $-5$ eta 6 dira. Koefiziente osoko polinomio baten erro osoak gai askearen zatitzaileak dira: $x^{3}-6x^{2}+11x-6$ polinomioarenak $\\pm 1,\\pm 2,\\pm 3,\\pm 6$ artean daude. Probatu Ruffiniz edo $P(a)$ kalkulatuz: $P(1)=1-6+11-6=0$, beraz 1 erroa da. $x^{3}+2x^{2}+3x+1$ polinomioak ez du erro osorik: 1 eta $-1$ bakarrik dira posible, eta ez dute balio. Gai askerik ez badago, x = 0 erroa da: $x^{4}+x=x(x^{3}+1)$.',
            'El número a es raíz de $P(x)$ si $P(a)=0$; entonces $P(x)\\mathbin{:}(x-a)$ es exacta y $x-a$ es un factor. Las raíces de $(x-2)(x+5)(x-6)$ son 2, $-5$ y 6. Las raíces enteras de un polinomio de coeficientes enteros son divisores del término independiente: las de $x^{3}-6x^{2}+11x-6$ están entre $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. Se prueban con Ruffini o calculando $P(a)$: $P(1)=1-6+11-6=0$, así que 1 es raíz. $x^{3}+2x^{2}+3x+1$ no tiene raíces enteras: solo son posibles 1 y $-1$, y no lo son. Si no hay término independiente, x = 0 es raíz: $x^{4}+x=x(x^{3}+1)$.',
            'يكون العدد a جذرًا لـ$P(x)$ إذا كان $P(a)=0$؛ عندئذ تكون $P(x)\\mathbin{:}(x-a)$ تامة و$x-a$ عاملًا. جذور $(x-2)(x+5)(x-6)$ هي 2 و$-5$ و6. والجذور الصحيحة لحدودية معاملاتها صحيحة هي قواسم الحد الثابت: جذور $x^{3}-6x^{2}+11x-6$ بين $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. ونجرّبها بروفيني أو بحساب $P(a)$: $P(1)=1-6+11-6=0$، فالعدد 1 جذر. أما $x^{3}+2x^{2}+3x+1$ فلا جذور صحيحة لها: الممكن 1 و$-1$ فقط وليسا جذرين. وإذا لم يوجد حد ثابت فإن x = 0 جذر: $x^{4}+x=x(x^{3}+1)$.'
        ),
        problem: say('$x^{3}+2x^{2}-8x$ polinomioak hiru erro oso ditu. Zein da handiena?', 'El polinomio $x^{3}+2x^{2}-8x$ tiene tres raíces enteras. ¿Cuál es la mayor?', 'للحدودية $x^{3}+2x^{2}-8x$ ثلاثة جذور صحيحة. ما أكبرها؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna: x = 0 erroa.', 'Factor común: x = 0 es raíz.', 'العامل المشترك: x = 0 جذر.'), math: same('$x(x^{2}+2x-8)$') },
            { text: say('Probatu 2.', 'Prueba con 2.', 'جرّب 2.'), math: same('$4+4-8=0$') },
            { text: say('Erroak: 0, 2 eta $-4$.', 'Raíces: 0, 2 y $-4$.', 'الجذور: 0 و2 و$-4$.'), math: same('$x(x-2)(x+4)$') }
        ],
        example: same('$P(1)=1-6+11-6=0$'),
        takeaway: say('$P(A)=0$ bada, $A$ erroa da eta $X-A$ faktorea.', 'Si $P(A)=0$, $A$ es raíz y $X-A$ es factor.', 'إذا كان $P(A)=0$ فإن $A$ جذر و$X-A$ عامل.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'common-factor',
        stage: 'factor',
        title: say('Faktore komuna eta identitateak', 'Factor común e identidades', 'العامل المشترك والمتطابقات'),
        goal: say('Polinomioak faktore komuna aterata eta identitate nabarmenak atzera erabiliz deskonposatzea.', 'Descomponer polinomios sacando factor común y usando las igualdades notables al revés.', 'تحليل الحدوديات بإخراج العامل المشترك واستعمال المتطابقات بالعكس.'),
        explanation: say(
            'Faktorizatzea polinomioa biderkadura gisa idaztea da. Lehen urratsa beti: faktore komuna atera (koefizienteen ZKH eta letra komunak berretzaile txikienarekin). $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$. Gero, begiratu parentesia identitate bat den: $x^{2}-4=(x+2)(x-2)$, beraz $3x^{4}-12x^{2}=3x^{2}(x+2)(x-2)$. Beste adibide batzuk: $x^{3}+6x^{2}+9x=x(x+3)^{2}$; $2x^{3}-4x^{2}+2x=2x(x-1)^{2}$; $8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-3)^{2}$. Karratu perfektu bat ezagutzeko: muturreko bi gaiak karratuak dira eta erdikoa haien oinarrien biderkaduraren bikoitza.',
            'Factorizar es escribir el polinomio como un producto. El primer paso, siempre: sacar factor común (m.c.d. de los coeficientes y las letras comunes con el menor exponente). $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$. Después, mira si el paréntesis es una igualdad notable: $x^{2}-4=(x+2)(x-2)$, así que $3x^{4}-12x^{2}=3x^{2}(x+2)(x-2)$. Otros ejemplos: $x^{3}+6x^{2}+9x=x(x+3)^{2}$; $2x^{3}-4x^{2}+2x=2x(x-1)^{2}$; $8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-3)^{2}$. Para reconocer un cuadrado perfecto: los dos extremos son cuadrados y el del medio es el doble del producto de sus bases.',
            'التحليل هو كتابة الحدودية جداءً. الخطوة الأولى دائمًا: إخراج العامل المشترك (ق.م.أ للمعاملات والحروف المشتركة بأصغر أس). $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$. ثم انظر هل ما بين القوسين متطابقة شهيرة: $x^{2}-4=(x+2)(x-2)$، إذن $3x^{4}-12x^{2}=3x^{2}(x+2)(x-2)$. أمثلة أخرى: $x^{3}+6x^{2}+9x=x(x+3)^{2}$؛ $2x^{3}-4x^{2}+2x=2x(x-1)^{2}$؛ $8x^{5}-24x^{4}+18x^{3}=2x^{3}(2x-3)^{2}$. ولمعرفة المربع الكامل: الطرفان مربعان والأوسط ضعف جداء أساسيهما.'
        ),
        problem: say('Deskonposatu $2x^{4}-12x^{3}+18x^{2}$.', 'Descompón $2x^{4}-12x^{3}+18x^{2}$.', 'حلّل $2x^{4}-12x^{3}+18x^{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna.', 'Factor común.', 'العامل المشترك.'), math: same('$2x^{2}(x^{2}-6x+9)$') },
            { text: say('Kendura baten karratua.', 'Cuadrado de una diferencia.', 'مربع فرق.'), math: same('$2x^{2}(x-3)^{2}$') }
        ],
        example: same('$3x^{4}-12x^{2}=3x^{2}(x+2)(x-2)$'),
        takeaway: say('Lehenik faktore komuna; gero identitateak.', 'Primero el factor común; luego las identidades.', 'العامل المشترك أولًا ثم المتطابقات.'),
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factorize',
        stage: 'factor',
        title: say('Ruffiniz faktorizatzea', 'Factorizar con Ruffini', 'التحليل بروفيني'),
        goal: say('Polinomio bat ahalik eta faktore gehienetan deskonposatzea, Ruffini behin eta berriz erabiliz.', 'Descomponer un polinomio en el mayor número posible de factores aplicando Ruffini varias veces.', 'تحليل حدودية إلى أكبر عدد ممكن من العوامل بتطبيق روفيني مرارًا.'),
        explanation: say(
            'Faktore komuna atera ondoren, bilatu erro oso bat gai askearen zatitzaileen artean eta zatitu Ruffiniz: hondarra 0 bada, $(x-a)$ faktorea lortu duzu, eta zatidurarekin jarraitzen da. $x^{3}-6x^{2}+11x-6$: 1 erroa da eta zatidura $x^{2}-5x+6$; 2 ere bai, eta zatidura $x-3$. Beraz $(x-1)(x-2)(x-3)$. Erro bat errepikatu daiteke: $x^{3}+3x^{2}+3x+1=(x+1)^{3}$. 2. mailako zatidura batek erro errealik ez badu, ezin da gehiago deskonposatu: $x^{3}-x^{2}-x-2=(x-2)(x^{2}+x+1)$. Egiaztatu beti biderkatuz.',
            'Tras sacar factor común, busca una raíz entera entre los divisores del término independiente y divide con Ruffini: si el resto es 0, ya tienes el factor $(x-a)$, y se sigue con el cociente. $x^{3}-6x^{2}+11x-6$: 1 es raíz y el cociente es $x^{2}-5x+6$; 2 también, y el cociente es $x-3$. Así que $(x-1)(x-2)(x-3)$. Una raíz puede repetirse: $x^{3}+3x^{2}+3x+1=(x+1)^{3}$. Si un cociente de grado 2 no tiene raíces reales, no se puede descomponer más: $x^{3}-x^{2}-x-2=(x-2)(x^{2}+x+1)$. Comprueba siempre multiplicando.',
            'بعد إخراج العامل المشترك ابحث عن جذر صحيح بين قواسم الحد الثابت واقسم بروفيني: إذا كان الباقي 0 فقد حصلت على العامل $(x-a)$، وتتابع مع خارج القسمة. $x^{3}-6x^{2}+11x-6$: العدد 1 جذر وخارج القسمة $x^{2}-5x+6$؛ و2 أيضًا وخارج القسمة $x-3$. إذن $(x-1)(x-2)(x-3)$. وقد يتكرر الجذر: $x^{3}+3x^{2}+3x+1=(x+1)^{3}$. وإذا لم يكن لخارج قسمة من الدرجة الثانية جذور حقيقية فلا يُحلّل أكثر: $x^{3}-x^{2}-x-2=(x-2)(x^{2}+x+1)$. تحقّق دائمًا بالضرب.'
        ),
        problem: say('Faktorizatu $x^{3}+7x^{2}+14x+8$.', 'Factoriza $x^{3}+7x^{2}+14x+8$.', 'حلّل $x^{3}+7x^{2}+14x+8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-1$ erroa da.', '$-1$ es raíz.', '$-1$ جذر.'), math: same('$-1+7-14+8=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.'), math: same('$x^{2}+6x+8$') },
            { text: say('Haren erroak $-2$ eta $-4$.', 'Sus raíces son $-2$ y $-4$.', 'جذراه $-2$ و$-4$.'), math: same('$(x+1)(x+2)(x+4)$') }
        ],
        example: same('$x^{2}-5x+6=(x-2)(x-3)$'),
        takeaway: say('Faktore komuna, identitateak, eta gero Ruffini hondarra 0 den bitartean.', 'Factor común, identidades y luego Ruffini mientras el resto sea 0.', 'العامل المشترك والمتطابقات ثم روفيني ما دام الباقي 0.'),
        figure: (language) => <FactorizeFigure language={language} />
    },

    /* ---------- 5. Algebraic expressions ---------- */
    {
        id: 'algebraic-fractions',
        stage: 'expressions',
        title: say('Zatiki aljebraikoak', 'Fracciones algebraicas', 'الكسور الجبرية'),
        goal: say('Zatiki aljebraikoak sinplifikatzea eta batzea, faktorizatuz eta izendatzaile komuna bilatuz.', 'Simplificar y sumar fracciones algebraicas factorizando y buscando denominador común.', 'تبسيط الكسور الجبرية وجمعها بالتحليل وإيجاد مقام مشترك.'),
        explanation: say(
            'Zatiki aljebraiko bat bi polinomioren zatidura da. Sinplifikatzeko, faktorizatu zenbakitzailea eta izendatzailea eta ezabatu faktore komunak: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Gaiak ez dira inoiz ezabatzen, faktoreak bakarrik: $\\frac{x+5}{5}$ ez da $x$. Batzeko, izendatzaile bera: $\\frac{x}{3}+\\frac{x}{2}=\\frac{2x}{6}+\\frac{3x}{6}=\\frac{5x}{6}$; $\\frac{1}{x}+\\frac{2}{x^{2}}=\\frac{x+2}{x^{2}}$. Zenbakiekin egiaztatu daiteke: x = 2 denean, $\\frac{8+20}{4+10}=2$.',
            'Una fracción algebraica es el cociente de dos polinomios. Para simplificar, factoriza numerador y denominador y elimina los factores comunes: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Nunca se eliminan sumandos, solo factores: $\\frac{x+5}{5}$ no es $x$. Para sumar, mismo denominador: $\\frac{x}{3}+\\frac{x}{2}=\\frac{2x}{6}+\\frac{3x}{6}=\\frac{5x}{6}$; $\\frac{1}{x}+\\frac{2}{x^{2}}=\\frac{x+2}{x^{2}}$. Se puede comprobar con números: para x = 2, $\\frac{8+20}{4+10}=2$.',
            'الكسر الجبري خارج قسمة حدوديتين. لتبسيطه حلّل البسط والمقام واحذف العوامل المشتركة: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. ولا نحذف الحدود المجموعة أبدًا، بل العوامل فقط: $\\frac{x+5}{5}$ ليست $x$. وللجمع نوحّد المقام: $\\frac{x}{3}+\\frac{x}{2}=\\frac{2x}{6}+\\frac{3x}{6}=\\frac{5x}{6}$؛ $\\frac{1}{x}+\\frac{2}{x^{2}}=\\frac{x+2}{x^{2}}$. ويمكن التحقق بالأعداد: عندما x = 2 يكون $\\frac{8+20}{4+10}=2$.'
        ),
        problem: say('Sinplifikatu $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.', 'Simplifica $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.', 'بسّط $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea.', 'Numerador.', 'البسط.'), math: same('$3(x^{2}-8x+16)=3(x-4)^{2}$') },
            { text: say('Izendatzailea.', 'Denominador.', 'المقام.'), math: same('$3x(x-4)$') },
            { text: say('Ezabatu $3(x-4)$.', 'Elimina $3(x-4)$.', 'احذف $3(x-4)$.'), math: same('$\\frac{x-4}{x}$') }
        ],
        example: same('$\\frac{x}{3}+\\frac{x}{2}=\\frac{5x}{6}$'),
        takeaway: say('Faktorizatu, gero sinplifikatu: faktoreak bai, gaiak ez.', 'Factoriza y luego simplifica: factores sí, sumandos no.', 'حلّل ثم بسّط: العوامل نعم، الحدود المجموعة لا.'),
        figure: (language) => <AlgebraicFractionFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'expressions',
        title: say('Ekuazioetarako prestatzea', 'Preparación para ecuaciones', 'التحضير للمعادلات'),
        goal: say('Adierazpenak parentesiak kenduz, identitateak garatuz eta izendatzaileak kenduz sinplifikatzea.', 'Simplificar expresiones quitando paréntesis, desarrollando identidades y quitando denominadores.', 'تبسيط العبارات بإزالة الأقواس ونشر المتطابقات وحذف المقامات.'),
        explanation: say(
            'Ekuazio bat ebatzi aurretik, bi aldeak sinplifikatzen dira: parentesiak kendu (minus baten atzean zeinuak aldatuz), identitateak garatu eta antzekoak batu. $3(x-1)+5(x-2)-7x=x-13$; $(x-1)(x+1)+(x-2)^{2}-3=2x^{2}-4x$. Izendatzaileak daudenean, adierazpen osoa haien MKTz biderkatzen da, gai bakoitza barne: $4\\cdot\\left(\\frac{2x-3}{2}-\\frac{x+3}{4}+4\\right)=2(2x-3)-(x+3)+16=3x+7$. Kontuz izendatzailearen gaineko minusarekin: zenbakitzaile osoari eragiten dio, $-(x+3)=-x-3$.',
            'Antes de resolver una ecuación se simplifican los dos miembros: se quitan paréntesis (cambiando signos tras un menos), se desarrollan las identidades y se agrupan semejantes. $3(x-1)+5(x-2)-7x=x-13$; $(x-1)(x+1)+(x-2)^{2}-3=2x^{2}-4x$. Si hay denominadores, se multiplica toda la expresión por su m.c.m., término a término: $4\\cdot\\left(\\frac{2x-3}{2}-\\frac{x+3}{4}+4\\right)=2(2x-3)-(x+3)+16=3x+7$. Cuidado con el menos delante de una fracción: afecta a todo el numerador, $-(x+3)=-x-3$.',
            'قبل حل المعادلة نبسّط طرفيها: نزيل الأقواس (مع تغيير الإشارات بعد الناقص)، وننشر المتطابقات، ونجمع المتشابهة. $3(x-1)+5(x-2)-7x=x-13$؛ $(x-1)(x+1)+(x-2)^{2}-3=2x^{2}-4x$. وإذا وُجدت مقامات نضرب العبارة كلها في مضاعفها المشترك الأصغر حدًّا حدًّا: $4\\cdot\\left(\\frac{2x-3}{2}-\\frac{x+3}{4}+4\\right)=2(2x-3)-(x+3)+16=3x+7$. انتبه للناقص أمام الكسر: يؤثر في البسط كله، $-(x+3)=-x-3$.'
        ),
        problem: say('Sinplifikatu $(x+1)^{2}-2x(x+2)+14$.', 'Simplifica $(x+1)^{2}-2x(x+2)+14$.', 'بسّط $(x+1)^{2}-2x(x+2)+14$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu.', 'Desarrolla.', 'انشر.'), math: same('$x^{2}+2x+1-2x^{2}-4x+14$') },
            { text: say('Antzekoak batu.', 'Agrupa semejantes.', 'اجمع المتشابهة.'), math: same('$-x^{2}-2x+15$') }
        ],
        example: same('$-(x+3)=-x-3$'),
        takeaway: say('Parentesiak, identitateak, MKT, eta antzekoak batu.', 'Paréntesis, identidades, m.c.m. y agrupar semejantes.', 'الأقواس والمتطابقات والمضاعف المشترك ثم جمع المتشابهة.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'expressions',
        title: say('Problemak adierazpen aljebraikoekin', 'Problemas con expresiones algebraicas', 'مسائل بالعبارات الجبرية'),
        goal: say('Problema geometrikoak eta zenbakizkoak polinomio baten bidez adieraztea eta haren balioa kalkulatzea.', 'Expresar problemas geométricos y numéricos mediante un polinomio y calcular su valor.', 'التعبير عن مسائل هندسية وعددية بحدودية وحساب قيمتها.'),
        explanation: say(
            'Problema askotan magnitude bat beste baten funtzioan adierazten da. 200 m-ko perimetroko laukizuzen batean, alde bat x bada, bestea $100-x$ da eta azalera $A=x(100-x)=100x-x^{2}$. x = 30 denean, $A=3000-900=2100$ m². Katetoak x eta $x+5$ dituen triangelu angeluzuzenean, hipotenusaren karratua $x^{2}+(x+5)^{2}=2x^{2}+10x+25$. Bi zenbaki jarrairen biderkadura $n(n+1)=n^{2}+n$. Pausoak: ezezaguna izendatu, adierazpena idatzi, sinplifikatu eta, behar bada, zenbakizko balioa kalkulatu.',
            'En muchos problemas una magnitud se expresa en función de otra. En un rectángulo de 200 m de perímetro, si un lado mide x, el otro mide $100-x$ y el área es $A=x(100-x)=100x-x^{2}$. Para x = 30, $A=3000-900=2100$ m². En un triángulo rectángulo de catetos x y $x+5$, el cuadrado de la hipotenusa es $x^{2}+(x+5)^{2}=2x^{2}+10x+25$. El producto de dos números consecutivos, $n(n+1)=n^{2}+n$. Los pasos: nombrar la incógnita, escribir la expresión, simplificarla y, si hace falta, calcular su valor numérico.',
            'في مسائل كثيرة نعبّر عن مقدار بدلالة آخر. في مستطيل محيطه 200 م، إذا كان أحد ضلعيه x فالآخر $100-x$ والمساحة $A=x(100-x)=100x-x^{2}$. وعندما x = 30 تكون $A=3000-900=2100$ م². وفي مثلث قائم ضلعاه القائمان x و$x+5$ يكون مربع الوتر $x^{2}+(x+5)^{2}=2x^{2}+10x+25$. وجداء عددين متتاليين $n(n+1)=n^{2}+n$. والخطوات: تسمية المجهول، وكتابة العبارة، وتبسيطها، وحساب قيمتها العددية عند الحاجة.'
        ),
        problem: say('Laukizuzen baten luzera eta zabalera 11 dm dira guztira. Adierazi azalera x zabaleraren funtzioan eta kalkulatu x = 4 denean.', 'El largo y el ancho de un rectángulo suman 11 dm. Expresa el área en función del ancho x y calcúlala para x = 4.', 'مجموع طول مستطيل وعرضه 11 دسم. عبّر عن المساحة بدلالة العرض x واحسبها عندما x = 4.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Luzera.', 'El largo.', 'الطول.'), math: same('$11-x$') },
            { text: say('Azalera.', 'El área.', 'المساحة.'), math: same('$x(11-x)=11x-x^{2}$') },
            { text: say('x = 4: 28 dm².', 'x = 4: 28 dm².', 'x = 4: 28 دسم².'), math: same('$44-16=28$') }
        ],
        example: same('$x^{2}+(x+5)^{2}=2x^{2}+10x+25$'),
        takeaway: say('Izendatu, idatzi, sinplifikatu eta kalkulatu.', 'Nombra, escribe, simplifica y calcula.', 'سمِّ واكتب وبسّط واحسب.'),
        figure: (language) => <RectangleProblemFigure language={language} />
    }
]
