import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { notation } from './notation.ts'

/* ==========================================================================
   Zatigarritasuna · 2. DBH — diagnostic, guided practice, exercise bank and
   challenges. Problems follow Santillana (unit 1) and the class handout on
   ZKH/MKT problems. @GCD, @LCM and @DIV become ZKH, MKT and Zat in Basque
   and Arabic, and m.c.d., m.c.m. and Div in Spanish.
   ========================================================================== */

/** Text per language; formulas inside may use the @GCD/@LCM/@DIV notation */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu: notation(eu).eu, es: notation(es).es, ar: notation(ar).ar })
const same = (value: string): LocalizedText => notation(value)

export const divisibilityDiagnostic: DiagnosticQuestion[] = [
    {
        id: 801,
        prompt: say('Zein zatiketa da zehatza?', '¿Qué división es exacta?', 'أي قسمة تامة؟'),
        options: [same('$35\\mathbin{:}6$'), same('$42\\mathbin{:}7$'), same('$50\\mathbin{:}8$')],
        correctIndex: 1,
        explanation: say('$42=7\\cdot 6$: hondarra 0 da. Besteetan hondarra 5 eta 2 dira.', '$42=7\\cdot 6$: el resto es 0. En las otras el resto es 5 y 2.', '$42=7\\cdot 6$: الباقي 0. وفي الأخريين الباقي 5 و2.'),
        topic: 'relation'
    },
    {
        id: 802,
        prompt: say('Zein da 7ren multiploa?', '¿Cuál es múltiplo de 7?', 'أي عدد مضاعف لـ 7؟'),
        options: [same('$57$'), same('$27$'), same('$49$')],
        correctIndex: 2,
        explanation: say('$49=7\\cdot 7$. Kontuz: 57 eta 27 7z amaitzen dira, baina $57=3\\cdot 19$ eta $27=3\\cdot 9$.', '$49=7\\cdot 7$. Cuidado: 57 y 27 acaban en 7, pero $57=3\\cdot 19$ y $27=3\\cdot 9$.', '$49=7\\cdot 7$. انتبه: 57 و27 ينتهيان بـ 7، لكن $57=3\\cdot 19$ و$27=3\\cdot 9$.'),
        topic: 'multiples'
    },
    {
        id: 803,
        prompt: say('Zenbat zatitzaile ditu 18k?', '¿Cuántos divisores tiene 18?', 'كم قاسمًا للعدد 18؟'),
        options: [same('$4$'), same('$6$'), same('$5$')],
        correctIndex: 1,
        explanation: say('$@DIV(18)=\\{1,2,3,6,9,18\\}$: sei zatitzaile.', '$@DIV(18)=\\{1,2,3,6,9,18\\}$: seis divisores.', '$@DIV(18)=\\{1,2,3,6,9,18\\}$: ستة قواسم.'),
        topic: 'divisors'
    },
    {
        id: 804,
        prompt: say('Zein da 3rekin zatigarria?', '¿Cuál es divisible por 3?', 'أي عدد يقبل القسمة على 3؟'),
        options: [same('$4\\,111$'), same('$2\\,025$'), same('$1\\,000$')],
        correctIndex: 1,
        explanation: say('$2+0+2+5=9$, 3ren multiploa. Besteetan batura 7 eta 1 da.', '$2+0+2+5=9$, múltiplo de 3. En los otros la suma es 7 y 1.', '$2+0+2+5=9$ وهو مضاعف لـ 3. وفي الآخرين المجموع 7 و1.'),
        topic: 'criteria-sum'
    },
    {
        id: 805,
        prompt: say('Zein da zenbaki lehena?', '¿Cuál es un número primo?', 'أي عدد أولي؟'),
        options: [same('$51$'), same('$57$'), same('$53$')],
        correctIndex: 2,
        explanation: say('53k 1 eta 53 ditu zatitzaile bakarrik. $51=3\\cdot 17$ eta $57=3\\cdot 19$.', '53 solo tiene como divisores 1 y 53. $51=3\\cdot 17$ y $57=3\\cdot 19$.', 'للعدد 53 قاسمان فقط: 1 و53. أما $51=3\\cdot 17$ و$57=3\\cdot 19$.'),
        topic: 'primes'
    },
    {
        id: 806,
        prompt: say('Zein da 72ren deskonposizioa biderkagai lehenetan?', '¿Cuál es la descomposición de 72 en factores primos?', 'ما تحليل 72 إلى عوامل أولية؟'),
        options: [same('$2^{3}\\cdot 3^{2}$'), same('$8\\cdot 9$'), same('$2^{2}\\cdot 3^{3}$')],
        correctIndex: 0,
        explanation: say('$72=8\\cdot 9=2^{3}\\cdot 3^{2}$. $8\\cdot 9$ ez da baliozkoa, 8 eta 9 ez direlako lehenak.', '$72=8\\cdot 9=2^{3}\\cdot 3^{2}$. $8\\cdot 9$ no vale porque 8 y 9 no son primos.', '$72=8\\cdot 9=2^{3}\\cdot 3^{2}$. والصيغة $8\\cdot 9$ غير مقبولة لأن 8 و9 ليسا أوليين.'),
        topic: 'factorization'
    },
    {
        id: 807,
        prompt: say('Zenbat da $@GCD(12,18)$?', '¿Cuánto es el $@GCD(12,18)$?', 'كم يساوي $@GCD(12,18)$؟'),
        options: [same('$6$'), same('$36$'), same('$3$')],
        correctIndex: 0,
        explanation: say('$12=2^{2}\\cdot 3$ eta $18=2\\cdot 3^{2}$: komunak berretzaile txikienarekin, $2\\cdot 3=6$. 36 MKT da.', '$12=2^{2}\\cdot 3$ y $18=2\\cdot 3^{2}$: comunes con el menor exponente, $2\\cdot 3=6$. 36 es el m.c.m.', '$12=2^{2}\\cdot 3$ و$18=2\\cdot 3^{2}$: المشتركة بأصغر أس، $2\\cdot 3=6$. أما 36 فهو م.م.أ.'),
        topic: 'gcd'
    },
    {
        id: 808,
        prompt: say('Bi argi 6 eta 8 segundoro pizten dira, eta orain batera piztu dira. Noiz piztuko dira berriro batera?', 'Dos luces se encienden cada 6 y cada 8 segundos, y ahora se han encendido juntas. ¿Cuándo volverán a coincidir?', 'ضوءان يضيئان كل 6 و8 ثوانٍ، وقد أضاءا معًا الآن. متى سيضيئان معًا مجددًا؟'),
        options: [say('24 s barru', 'Dentro de 24 s', 'بعد 24 ث'), say('48 s barru', 'Dentro de 48 s', 'بعد 48 ث'), say('2 s barru', 'Dentro de 2 s', 'بعد 2 ث')],
        correctIndex: 0,
        explanation: say('Berriro bat etortzea → MKT. $@LCM(6,8)=2^{3}\\cdot 3=24$ s.', 'Volver a coincidir → m.c.m. $@LCM(6,8)=2^{3}\\cdot 3=24$ s.', 'التزامن مجددًا ← م.م.أ. $@LCM(6,8)=2^{3}\\cdot 3=24$ ث.'),
        topic: 'which'
    }
]

const calculate = (latex: string): LocalizedText => say(`Kalkulatu: ${latex}`, `Calcula: ${latex}`, `احسب: ${latex}`)

export const divisibilityPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'multiples',
        prompt: say('Zein da 7ren bosgarren multiploa (0 kontatu gabe)?', '¿Cuál es el quinto múltiplo de 7 (sin contar el 0)?', 'ما المضاعف الخامس للعدد 7 (دون احتساب 0)؟'),
        expected: fraction(35),
        hint: say('Biderkatu 7 bider 5.', 'Multiplica 7 por 5.', 'اضرب 7 في 5.'),
        explanation: say('$\\mathrm{M}(7)=\\{7,14,21,28,35,\\dots\\}$', '$\\mathrm{M}(7)=\\{7,14,21,28,35,\\dots\\}$', '$\\mathrm{M}(7)=\\{7,14,21,28,35,\\dots\\}$')
    },
    {
        id: 2,
        stage: 'multiples',
        prompt: say('Zein da 100 baino handiagoa den 13ren multiplorik txikiena?', '¿Cuál es el menor múltiplo de 13 mayor que 100?', 'ما أصغر مضاعف لـ 13 أكبر من 100؟'),
        expected: fraction(104),
        hint: say('Zatitu 100 : 13 eta begiratu zatidurari.', 'Divide 100 : 13 y fíjate en el cociente.', 'اقسم 100 : 13 وانظر إلى الناتج.'),
        explanation: say('$100\\mathbin{:}13=7$ eta hondarra 9. Hurrengo multiploa $13\\cdot 8=104$.', '$100\\mathbin{:}13=7$ y resto 9. El siguiente múltiplo es $13\\cdot 8=104$.', '$100\\mathbin{:}13=7$ والباقي 9. المضاعف التالي $13\\cdot 8=104$.')
    },
    {
        id: 3,
        stage: 'multiples',
        prompt: say('Zenbat zatitzaile ditu 36k?', '¿Cuántos divisores tiene 36?', 'كم قاسمًا للعدد 36؟'),
        expected: fraction(9),
        hint: say('Bilatu bikoteak: $1\\cdot 36$, $2\\cdot 18$…', 'Busca las parejas: $1\\cdot 36$, $2\\cdot 18$…', 'ابحث عن الأزواج: $1\\cdot 36$، $2\\cdot 18$…'),
        explanation: say('$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$: 9 zatitzaile (6 bikotean behin bakarrik).', '$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$: 9 divisores (el 6 se cuenta una vez).', '$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$: تسعة قواسم (العدد 6 يُحسب مرة واحدة).')
    },
    {
        id: 4,
        stage: 'multiples',
        prompt: say('Zein da $100\\mathbin{:}7$ zatiketaren hondarra?', '¿Cuál es el resto de la división $100\\mathbin{:}7$?', 'ما باقي القسمة $100\\mathbin{:}7$؟'),
        expected: fraction(2),
        hint: say('$7\\cdot 14=98$.', '$7\\cdot 14=98$.', '$7\\cdot 14=98$.'),
        explanation: say('$100=7\\cdot 14+2$: hondarra 2 da, beraz 100 ez da 7ren multiploa.', '$100=7\\cdot 14+2$: el resto es 2, así que 100 no es múltiplo de 7.', '$100=7\\cdot 14+2$: الباقي 2، إذن 100 ليس مضاعفًا لـ 7.')
    },
    {
        id: 5,
        stage: 'criteria',
        prompt: say('Zein zifra jarri behar da $35\\square$ zenbakian 2rekin eta 5ekin zatigarria izateko?', '¿Qué cifra hay que poner en $35\\square$ para que sea divisible por 2 y por 5?', 'أي رقم نضع في $35\\square$ ليقبل القسمة على 2 و5؟'),
        expected: fraction(0),
        hint: say('2rekin: azken zifra bikoitia. 5ekin: 0 edo 5.', 'Por 2: última cifra par. Por 5: 0 o 5.', 'على 2: الرقم الأخير زوجي. على 5: ‏0 أو 5.'),
        explanation: say('Bi baldintzak betetzen dituen zifra bakarra 0 da: 350.', 'La única cifra que cumple las dos condiciones es 0: 350.', 'الرقم الوحيد الذي يحقق الشرطين هو 0: ‏350.')
    },
    {
        id: 6,
        stage: 'criteria',
        prompt: say('Zein zifra falta da $4\\square 2$ zenbakian 9rekin zatigarria izateko?', '¿Qué cifra falta en $4\\square 2$ para que sea divisible por 9?', 'ما الرقم الناقص في $4\\square 2$ ليقبل القسمة على 9؟'),
        expected: fraction(3),
        hint: say('$4+\\square+2$ 9 izan behar da.', '$4+\\square+2$ tiene que dar 9.', 'يجب أن يساوي $4+\\square+2$ العدد 9.'),
        explanation: say('$4+3+2=9$: 432. (Batura 18 izateko 12 behar litzateke, eta ez da zifra bat.)', '$4+3+2=9$: 432. (Para sumar 18 haría falta 12, que no es una cifra.)', '$4+3+2=9$: ‏432. (ولكي يكون المجموع 18 نحتاج 12، وهو ليس رقمًا واحدًا.)')
    },
    {
        id: 7,
        stage: 'criteria',
        prompt: say('Zein da $71\\square$ 3rekin zatigarria egiten duen zifrarik txikiena?', '¿Cuál es la menor cifra que hace $71\\square$ divisible por 3?', 'ما أصغر رقم يجعل $71\\square$ يقبل القسمة على 3؟'),
        expected: fraction(1),
        hint: say('$7+1=8$. Zenbat falta da 3ren hurrengo multiplora iristeko?', '$7+1=8$. ¿Cuánto falta para el siguiente múltiplo de 3?', '$7+1=8$. كم ينقص للوصول إلى مضاعف 3 التالي؟'),
        explanation: say('$7+1+1=9$: 711. 4 eta 7 ere balio dute, baina 1 da txikiena.', '$7+1+1=9$: 711. También valen 4 y 7, pero 1 es la menor.', '$7+1+1=9$: ‏711. ويصلح أيضًا 4 و7، لكن 1 هو الأصغر.')
    },
    {
        id: 8,
        stage: 'criteria',
        prompt: say('Aplikatu 11ren irizpidea 8 294 zenbakiari. Zenbat ematen du kenketak (posizio bikoitiak − bakoitiak)?', 'Aplica el criterio del 11 a 8 294. ¿Cuánto da la resta (lugares pares − impares)?', 'طبّق قاعدة 11 على 8 294. كم ناتج الطرح (المواقع الزوجية − الفردية)؟'),
        expected: fraction(11),
        hint: say('Eskuinetik hasita: 4 (1.), 9 (2.), 2 (3.), 8 (4.).', 'Empezando por la derecha: 4 (1.º), 9 (2.º), 2 (3.º), 8 (4.º).', 'من اليمين: 4 (الأول)، 9 (الثاني)، 2 (الثالث)، 8 (الرابع).'),
        explanation: say('$(9+8)-(4+2)=17-6=11$: 11ren multiploa, beraz 8 294 11rekin zatigarria da ($8\\,294=11\\cdot 754$).', '$(9+8)-(4+2)=17-6=11$: múltiplo de 11, luego 8 294 es divisible por 11 ($8\\,294=11\\cdot 754$).', '$(9+8)-(4+2)=17-6=11$: مضاعف لـ 11، إذن 8 294 يقبل القسمة على 11 ($8\\,294=11\\cdot 754$).')
    },
    {
        id: 9,
        stage: 'criteria',
        prompt: say('7ren irizpidea 581 zenbakiarekin: kendu azken zifra eta kendu haren bikoitza. Zer zenbaki lortzen duzu?', 'Criterio del 7 con 581: quita la última cifra y resta su doble. ¿Qué número obtienes?', 'قاعدة 7 مع 581: احذف الرقم الأخير واطرح ضعفه. ما العدد الناتج؟'),
        expected: fraction(56),
        hint: say('$58-2\\cdot 1$', '$58-2\\cdot 1$', '$58-2\\cdot 1$'),
        explanation: say('$58-2=56=7\\cdot 8$: beraz 581 7rekin zatigarria da ($581=7\\cdot 83$).', '$58-2=56=7\\cdot 8$: luego 581 es divisible por 7 ($581=7\\cdot 83$).', '$58-2=56=7\\cdot 8$: إذن 581 يقبل القسمة على 7 ($581=7\\cdot 83$).')
    },
    {
        id: 10,
        stage: 'primes',
        prompt: say('Zenbat zenbaki lehen daude 20 eta 40 artean?', '¿Cuántos números primos hay entre 20 y 40?', 'كم عددًا أوليًا بين 20 و40؟'),
        expected: fraction(4),
        hint: say('Baztertu bikoitiak eta 3ren eta 5en multiploak.', 'Descarta los pares y los múltiplos de 3 y de 5.', 'استبعد الزوجية ومضاعفات 3 و5.'),
        explanation: say('23, 29, 31 eta 37. (21, 27, 33 eta 39 3ren multiploak dira; 35 5ena.)', '23, 29, 31 y 37. (21, 27, 33 y 39 son múltiplos de 3; 35, de 5.)', '23 و29 و31 و37. (21 و27 و33 و39 مضاعفات لـ 3، و35 لـ 5.)')
    },
    {
        id: 11,
        stage: 'primes',
        prompt: say('$84=2^{a}\\cdot 3\\cdot 7$. Zenbat da $a$?', '$84=2^{a}\\cdot 3\\cdot 7$. ¿Cuánto vale $a$?', '$84=2^{a}\\cdot 3\\cdot 7$. كم قيمة $a$؟'),
        expected: fraction(2),
        hint: say('Zatitu 84 2z behin eta berriz.', 'Divide 84 entre 2 una y otra vez.', 'اقسم 84 على 2 مرة بعد مرة.'),
        explanation: say('$84\\mathbin{:}2=42$, $42\\mathbin{:}2=21$, 21 bakoitia da: $84=2^{2}\\cdot 3\\cdot 7$.', '$84\\mathbin{:}2=42$, $42\\mathbin{:}2=21$, y 21 es impar: $84=2^{2}\\cdot 3\\cdot 7$.', '$84\\mathbin{:}2=42$ و$42\\mathbin{:}2=21$، و21 فردي: $84=2^{2}\\cdot 3\\cdot 7$.')
    },
    {
        id: 12,
        stage: 'primes',
        prompt: say('Zein zenbaki da $2^{3}\\cdot 3\\cdot 5^{2}$?', '¿Qué número es $2^{3}\\cdot 3\\cdot 5^{2}$?', 'ما العدد $2^{3}\\cdot 3\\cdot 5^{2}$؟'),
        expected: fraction(600),
        hint: say('$2^{3}=8$ eta $5^{2}=25$.', '$2^{3}=8$ y $5^{2}=25$.', '$2^{3}=8$ و$5^{2}=25$.'),
        explanation: say('$8\\cdot 3\\cdot 25=24\\cdot 25=600$.', '$8\\cdot 3\\cdot 25=24\\cdot 25=600$.', '$8\\cdot 3\\cdot 25=24\\cdot 25=600$.')
    },
    {
        id: 13,
        stage: 'gcd-lcm',
        prompt: calculate('$@GCD(48,60)$'),
        expected: fraction(12),
        hint: say('$48=2^{4}\\cdot 3$ eta $60=2^{2}\\cdot 3\\cdot 5$.', '$48=2^{4}\\cdot 3$ y $60=2^{2}\\cdot 3\\cdot 5$.', '$48=2^{4}\\cdot 3$ و$60=2^{2}\\cdot 3\\cdot 5$.'),
        explanation: say('Komunak berretzaile txikienarekin: $2^{2}\\cdot 3=12$.', 'Comunes con el menor exponente: $2^{2}\\cdot 3=12$.', 'المشتركة بأصغر أس: $2^{2}\\cdot 3=12$.')
    },
    {
        id: 14,
        stage: 'gcd-lcm',
        prompt: calculate('$@GCD(36,54,90)$'),
        expected: fraction(18),
        hint: say('$36=2^{2}\\cdot 3^{2}$, $54=2\\cdot 3^{3}$, $90=2\\cdot 3^{2}\\cdot 5$.', '$36=2^{2}\\cdot 3^{2}$, $54=2\\cdot 3^{3}$, $90=2\\cdot 3^{2}\\cdot 5$.', '$36=2^{2}\\cdot 3^{2}$، $54=2\\cdot 3^{3}$، $90=2\\cdot 3^{2}\\cdot 5$.'),
        explanation: say('Hiruretan daude 2 eta 3: $2\\cdot 3^{2}=18$. 5 ez da komuna.', 'Están en los tres el 2 y el 3: $2\\cdot 3^{2}=18$. El 5 no es común.', 'العاملان 2 و3 موجودان في الثلاثة: $2\\cdot 3^{2}=18$. أما 5 فليس مشتركًا.')
    },
    {
        id: 15,
        stage: 'gcd-lcm',
        prompt: calculate('$@LCM(12,18)$'),
        expected: fraction(36),
        hint: say('$12=2^{2}\\cdot 3$ eta $18=2\\cdot 3^{2}$.', '$12=2^{2}\\cdot 3$ y $18=2\\cdot 3^{2}$.', '$12=2^{2}\\cdot 3$ و$18=2\\cdot 3^{2}$.'),
        explanation: say('Guztiak berretzaile handienarekin: $2^{2}\\cdot 3^{2}=36$.', 'Todos con el mayor exponente: $2^{2}\\cdot 3^{2}=36$.', 'الكل بأكبر أس: $2^{2}\\cdot 3^{2}=36$.')
    },
    {
        id: 16,
        stage: 'gcd-lcm',
        prompt: calculate('$@LCM(8,12,15)$'),
        expected: fraction(120),
        hint: say('$8=2^{3}$, $12=2^{2}\\cdot 3$, $15=3\\cdot 5$.', '$8=2^{3}$, $12=2^{2}\\cdot 3$, $15=3\\cdot 5$.', '$8=2^{3}$، $12=2^{2}\\cdot 3$، $15=3\\cdot 5$.'),
        explanation: say('$2^{3}\\cdot 3\\cdot 5=120$.', '$2^{3}\\cdot 3\\cdot 5=120$.', '$2^{3}\\cdot 3\\cdot 5=120$.')
    },
    {
        id: 17,
        stage: 'problems',
        prompt: say('60 cm eta 84 cm-ko bi zinta ditugu. Zati berdinetan moztu nahi ditugu, ahalik eta luzeenak eta ezer soberan gabe. Zenbat cm izango ditu zati bakoitzak?', 'Tenemos dos cintas de 60 cm y 84 cm. Queremos cortarlas en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuántos cm medirá cada trozo?', 'لدينا شريطان طولهما 60 سم و84 سم. نريد قصهما إلى قطع متساوية بأطول ما يمكن دون أن يبقى شيء. كم سنتيمترًا سيكون طول كل قطعة؟'),
        expected: fraction(12),
        hint: say('Zatitu, soberakinik gabe, handiena → ZKH.', 'Repartir sin que sobre, lo más grande posible → m.c.d.', 'تقسيم دون باقٍ وبأكبر طول ← ق.م.أ.'),
        explanation: say('$@GCD(60,84)=2^{2}\\cdot 3=12$: zati bakoitzak 12 cm (5 + 7 = 12 zati).', '$@GCD(60,84)=2^{2}\\cdot 3=12$: cada trozo medirá 12 cm (5 + 7 = 12 trozos).', '$@GCD(60,84)=2^{2}\\cdot 3=12$: طول كل قطعة 12 سم (5 + 7 = 12 قطعة).')
    },
    {
        id: 18,
        stage: 'problems',
        prompt: say('Itsasargi bat 12 segundoro pizten da eta beste bat 20 segundoro. Batera piztu badira, zenbat segundo pasako dira berriro batera piztu arte?', 'Un faro se enciende cada 12 segundos y otro cada 20. Si se han encendido juntos, ¿cuántos segundos pasarán hasta que vuelvan a coincidir?', 'منارة تضيء كل 12 ثانية وأخرى كل 20. إذا أضاءتا معًا، فكم ثانية تمر حتى تضيئا معًا مجددًا؟'),
        expected: fraction(60),
        hint: say('Berriro bat etorri → MKT.', 'Volver a coincidir → m.c.m.', 'التزامن مجددًا ← م.م.أ.'),
        explanation: say('$@LCM(12,20)=2^{2}\\cdot 3\\cdot 5=60$: 60 segundo barru (minutu bat).', '$@LCM(12,20)=2^{2}\\cdot 3\\cdot 5=60$: dentro de 60 segundos (un minuto).', '$@LCM(12,20)=2^{2}\\cdot 3\\cdot 5=60$: بعد 60 ثانية (دقيقة واحدة).')
    }
]

export const divisibilityChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('Anek 24 marrubi-gozoki eta 36 limoi-gozoki ditu. Poltsa berdinak egin nahi ditu, zapore bakarrekoak eta ahalik eta gozoki gehienekin. Zenbat gozoki sartuko ditu poltsa bakoitzean?', 'Ane tiene 24 caramelos de fresa y 36 de limón. Quiere hacer bolsas iguales, de un solo sabor y con el mayor número posible de caramelos. ¿Cuántos caramelos pondrá en cada bolsa?', 'لدى آنه 24 حلوى بالفراولة و36 بالليمون. تريد صنع أكياس متساوية بنكهة واحدة وبأكبر عدد ممكن من الحلوى. كم حلوى ستضع في كل كيس؟'),
        expected: fraction(12),
        hint: say('Zatitu eta handiena → ZKH.', 'Repartir y lo más grande → m.c.d.', 'تقسيم وأكبر عدد ← ق.م.أ.'),
        explanation: say('$@GCD(24,36)=12$: 12 gozoki poltsa bakoitzean (2 poltsa marrubi eta 3 limoi).', '$@GCD(24,36)=12$: 12 caramelos por bolsa (2 bolsas de fresa y 3 de limón).', '$@GCD(24,36)=12$: ‏12 حلوى في كل كيس (كيسان بالفراولة و3 بالليمون).')
    },
    {
        id: 102,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('Mikel 4 egunez behin joaten da igerilekura eta Nora 6 egunez behin. Gaur bat egin dute. Zenbat egun barru egingo dute bat berriro?', 'Mikel va a la piscina cada 4 días y Nora cada 6. Hoy han coincidido. ¿Dentro de cuántos días volverán a coincidir?', 'يذهب ميكيل إلى المسبح كل 4 أيام ونورا كل 6. التقيا اليوم. بعد كم يومًا سيلتقيان مجددًا؟'),
        expected: fraction(12),
        hint: say('Berriro bat etorri → MKT.', 'Volver a coincidir → m.c.m.', 'التزامن ← م.م.أ.'),
        explanation: say('$@LCM(4,6)=12$: 12 egun barru.', '$@LCM(4,6)=12$: dentro de 12 días.', '$@LCM(4,6)=12$: بعد 12 يومًا.')
    },
    {
        id: 103,
        stage: 'multiples',
        context: 'starter',
        points: 10,
        prompt: say('24 aulki ilara berdinetan jarri nahi dira. Zenbat modu desberdinetan egin daiteke (ilara bakarra ere kontatuta)?', 'Se quieren colocar 24 sillas en filas iguales. ¿De cuántas formas distintas se puede hacer (contando una sola fila)?', 'نريد ترتيب 24 كرسيًا في صفوف متساوية. بكم طريقة مختلفة يمكن ذلك (مع احتساب صف واحد)؟'),
        expected: fraction(8),
        hint: say('Ilara kopuru bakoitza 24ren zatitzaile bat da.', 'Cada número de filas es un divisor de 24.', 'كل عدد صفوف هو قاسم للعدد 24.'),
        explanation: say('$@DIV(24)=\\{1,2,3,4,6,8,12,24\\}$: 8 modu.', '$@DIV(24)=\\{1,2,3,4,6,8,12,24\\}$: 8 formas.', '$@DIV(24)=\\{1,2,3,4,6,8,12,24\\}$: ‏8 طرق.')
    },
    {
        id: 104,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('360 cm × 240 cm-ko lurzorua ahalik eta handienak diren lauza karratuekin estali nahi da, bat ere moztu gabe. Zenbat cm izango ditu lauza bakoitzaren aldeak?', 'Un suelo de 360 cm × 240 cm se quiere cubrir con baldosas cuadradas lo más grandes posible, sin cortar ninguna. ¿Cuántos cm medirá el lado de cada baldosa?', 'نريد تغطية أرضية مساحتها 360 سم × 240 سم ببلاط مربع بأكبر حجم ممكن دون قص أي بلاطة. كم سنتيمترًا طول ضلع كل بلاطة؟'),
        expected: fraction(120),
        hint: say('Aldeak bi neurriak zatitu behar ditu → ZKH.', 'El lado tiene que dividir las dos medidas → m.c.d.', 'يجب أن يقسم الضلع البعدين كليهما ← ق.م.أ.'),
        explanation: say('$360=2^{3}\\cdot 3^{2}\\cdot 5$, $240=2^{4}\\cdot 3\\cdot 5$ → $@GCD=2^{3}\\cdot 3\\cdot 5=120$ cm (6 lauza).', '$360=2^{3}\\cdot 3^{2}\\cdot 5$, $240=2^{4}\\cdot 3\\cdot 5$ → $@GCD=2^{3}\\cdot 3\\cdot 5=120$ cm (6 baldosas).', '$360=2^{3}\\cdot 3^{2}\\cdot 5$، $240=2^{4}\\cdot 3\\cdot 5$ ← $@GCD=2^{3}\\cdot 3\\cdot 5=120$ سم (6 بلاطات).')
    },
    {
        id: 105,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('78 limoi-gaileta, 130 esne-gaileta eta 156 ezti-gaileta ditugu. Kutxa berdinak bete nahi ditugu, mota bakarrekoak eta ahalik eta gaileta gehienekin. Zenbat kutxa behar dira guztira?', 'Tenemos 78 galletas de limón, 130 de nata y 156 de miel. Queremos llenar cajas iguales, de un solo tipo y con el mayor número posible de galletas. ¿Cuántas cajas hacen falta en total?', 'لدينا 78 بسكويتة بالليمون و130 بالقشدة و156 بالعسل. نريد ملء صناديق متساوية من نوع واحد وبأكبر عدد ممكن. كم صندوقًا نحتاج في المجموع؟'),
        expected: fraction(14),
        hint: say('Kalkulatu lehenik kutxa bakoitzeko gaileta kopurua (ZKH), eta gero kutxak.', 'Calcula primero las galletas por caja (m.c.d.) y después las cajas.', 'احسب أولًا عدد البسكويت في كل صندوق (ق.م.أ) ثم الصناديق.'),
        explanation: say('$@GCD(78,130,156)=2\\cdot 13=26$ gaileta kutxako. $3+5+6=14$ kutxa.', '$@GCD(78,130,156)=2\\cdot 13=26$ galletas por caja. $3+5+6=14$ cajas.', '$@GCD(78,130,156)=2\\cdot 13=26$ بسكويتة في كل صندوق. $3+5+6=14$ صندوقًا.')
    },
    {
        id: 106,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Hiru autobus 8:00etan irten dira batera. Bata 10 minutuz behin irteten da, bestea 15ez behin eta hirugarrena 25ez behin. Zenbat minutu barru irtengo dira berriro batera?', 'Tres autobuses han salido juntos a las 8:00. Uno sale cada 10 minutos, otro cada 15 y el tercero cada 25. ¿Dentro de cuántos minutos volverán a salir juntos?', 'انطلقت ثلاث حافلات معًا في الساعة 8:00. الأولى تنطلق كل 10 دقائق والثانية كل 15 والثالثة كل 25. بعد كم دقيقة ستنطلق معًا مجددًا؟'),
        expected: fraction(150),
        hint: say('$10=2\\cdot 5$, $15=3\\cdot 5$, $25=5^{2}$.', '$10=2\\cdot 5$, $15=3\\cdot 5$, $25=5^{2}$.', '$10=2\\cdot 5$، $15=3\\cdot 5$، $25=5^{2}$.'),
        explanation: say('$@LCM(10,15,25)=2\\cdot 3\\cdot 5^{2}=150$ minutu, hau da, 10:30ean.', '$@LCM(10,15,25)=2\\cdot 3\\cdot 5^{2}=150$ minutos, es decir, a las 10:30.', '$@LCM(10,15,25)=2\\cdot 3\\cdot 5^{2}=150$ دقيقة، أي في الساعة 10:30.')
    },
    {
        id: 107,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('Liburutegi batean 100 eta 140 arteko liburu daude. 4ka, 6ka edo 9ka taldeka daitezke, bat ere soberan gabe. Zenbat liburu daude?', 'En una biblioteca hay entre 100 y 140 libros. Se pueden agrupar de 4 en 4, de 6 en 6 o de 9 en 9 sin que sobre ninguno. ¿Cuántos libros hay?', 'في مكتبة ما بين 100 و140 كتابًا. يمكن تجميعها 4 و4 أو 6 و6 أو 9 و9 دون أن يبقى كتاب. كم كتابًا فيها؟'),
        expected: fraction(108),
        hint: say('Liburu kopurua 4, 6 eta 9ren multiplo komuna da.', 'El número de libros es múltiplo común de 4, 6 y 9.', 'عدد الكتب مضاعف مشترك لـ 4 و6 و9.'),
        explanation: say('$@LCM(4,6,9)=36$. Multiploak: 36, 72, 108, 144… 100 eta 140 artean 108 bakarrik dago.', '$@LCM(4,6,9)=36$. Múltiplos: 36, 72, 108, 144… Entre 100 y 140 solo está 108.', '$@LCM(4,6,9)=36$. مضاعفاته: 36، 72، 108، 144… وبين 100 و140 يوجد 108 فقط.')
    },
    {
        id: 108,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('4 mm-ko bola gorriak, 6 mm-ko berdeak eta 8 mm-ko urdinak ditugu. Kolore bakarreko lepokoak egin nahi ditugu, denak luzera berekoak. Gutxienez zenbat mm izango ditu lepoko bakoitzak?', 'Tenemos bolas rojas de 4 mm, verdes de 6 mm y azules de 8 mm. Queremos hacer collares de un solo color, todos de la misma longitud. ¿Cuántos mm medirá como mínimo cada collar?', 'لدينا كرات حمراء قطرها 4 مم وخضراء 6 مم وزرقاء 8 مم. نريد صنع عقود بلون واحد وبالطول نفسه. كم مليمترًا على الأقل سيكون طول كل عقد؟'),
        expected: fraction(24),
        hint: say('Luzera 4, 6 eta 8ren multiploa da, eta txikiena bilatzen dugu.', 'La longitud es múltiplo de 4, 6 y 8, y buscamos la menor.', 'الطول مضاعف لـ 4 و6 و8، ونبحث عن الأصغر.'),
        explanation: say('$@LCM(4,6,8)=2^{3}\\cdot 3=24$ mm: 6 bola gorri, 4 berde edo 3 urdin lepoko.', '$@LCM(4,6,8)=2^{3}\\cdot 3=24$ mm: 6 bolas rojas, 4 verdes o 3 azules por collar.', '$@LCM(4,6,8)=2^{3}\\cdot 3=24$ مم: 6 كرات حمراء أو 4 خضراء أو 3 زرقاء في العقد.')
    },
    {
        id: 109,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Monikak 450 argazki baino gutxiago ditu. 8ka, 9ka edo 12ka taldekatzen baditu, ez zaio bat ere soberan geratzen. Gehienez zenbat argazki ditu?', 'Mónica tiene menos de 450 fotos. Si las agrupa de 8 en 8, de 9 en 9 o de 12 en 12, no le sobra ninguna. ¿Cuántas fotos tiene como máximo?', 'لدى مونيكا أقل من 450 صورة. إذا جمعتها 8 و8 أو 9 و9 أو 12 و12 لا يبقى شيء. ما أكبر عدد ممكن من الصور لديها؟'),
        expected: fraction(432),
        hint: say('Kalkulatu MKT eta bilatu 450 baino txikiagoa den haren multiplorik handiena.', 'Calcula el m.c.m. y busca su mayor múltiplo menor que 450.', 'احسب م.م.أ وابحث عن أكبر مضاعف له أصغر من 450.'),
        explanation: say('$@LCM(8,9,12)=2^{3}\\cdot 3^{2}=72$. $450\\mathbin{:}72=6$ eta hondarra 18 → $72\\cdot 6=432$ argazki.', '$@LCM(8,9,12)=2^{3}\\cdot 3^{2}=72$. $450\\mathbin{:}72=6$ y resto 18 → $72\\cdot 6=432$ fotos.', '$@LCM(8,9,12)=2^{3}\\cdot 3^{2}=72$. $450\\mathbin{:}72=6$ والباقي 18 ← $72\\cdot 6=432$ صورة.')
    },
    {
        id: 110,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Jonek 200 eta 250 arteko txanpon ditu. 3ka, 5eka edo 7ka taldekatzen baditu, beti 2 soberan geratzen zaizkio. Zenbat txanpon ditu?', 'Jon tiene entre 200 y 250 monedas. Si las agrupa de 3 en 3, de 5 en 5 o de 7 en 7, siempre le sobran 2. ¿Cuántas monedas tiene?', 'لدى جون ما بين 200 و250 قطعة نقدية. إذا جمعها 3 و3 أو 5 و5 أو 7 و7 تبقى دائمًا قطعتان. كم قطعة لديه؟'),
        expected: fraction(212),
        hint: say('2 kendu ondoren, 3, 5 eta 7ren multiplo komuna geratzen da.', 'Quitando las 2 que sobran, queda un múltiplo común de 3, 5 y 7.', 'بعد طرح القطعتين الزائدتين يبقى مضاعف مشترك لـ 3 و5 و7.'),
        explanation: say('$@LCM(3,5,7)=105$. Multiploak: 105, 210, 315… $210+2=212$ bakarrik dago 200 eta 250 artean.', '$@LCM(3,5,7)=105$. Múltiplos: 105, 210, 315… Solo $210+2=212$ está entre 200 y 250.', '$@LCM(3,5,7)=105$. مضاعفاته: 105، 210، 315… والعدد الوحيد بين 200 و250 هو $210+2=212$.')
    },
    {
        id: 111,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('35 m × 25 m-ko lokal bat ahalik eta handienak diren aparkaleku karratuetan banatu nahi da. Zenbat aparkaleku aterako dira?', 'Un local de 35 m × 25 m se quiere dividir en plazas de aparcamiento cuadradas lo más grandes posible. ¿Cuántas plazas saldrán?', 'نريد تقسيم محل مساحته 35 م × 25 م إلى مواقف سيارات مربعة بأكبر حجم ممكن. كم موقفًا سنحصل عليه؟'),
        expected: fraction(35),
        hint: say('Lehenik aldea (ZKH), gero zenbat sartzen diren luzeran eta zabaleran.', 'Primero el lado (m.c.d.) y después cuántas caben a lo largo y a lo ancho.', 'أولًا طول الضلع (ق.م.أ) ثم كم موقفًا يتسع طولًا وعرضًا.'),
        explanation: say('$@GCD(35,25)=5$ m. $35\\mathbin{:}5=7$ eta $25\\mathbin{:}5=5$ → $7\\cdot 5=35$ aparkaleku.', '$@GCD(35,25)=5$ m. $35\\mathbin{:}5=7$ y $25\\mathbin{:}5=5$ → $7\\cdot 5=35$ plazas.', '$@GCD(35,25)=5$ م. $35\\mathbin{:}5=7$ و$25\\mathbin{:}5=5$ ← $7\\cdot 5=35$ موقفًا.')
    },
    {
        id: 112,
        stage: 'gcd-lcm',
        context: 'master',
        points: 30,
        prompt: say('Bi zenbakiren ZKH 6 da eta MKT 72. Zenbakietako bat 18 da. Zein da bestea?', 'El m.c.d. de dos números es 6 y su m.c.m. es 72. Uno de ellos es 18. ¿Cuál es el otro?', 'ق.م.أ لعددين هو 6 وم.م.أ هو 72. أحدهما 18. ما العدد الآخر؟'),
        expected: fraction(24),
        hint: say('Bi zenbakiren biderkadura = ZKH · MKT.', 'El producto de los dos números = m.c.d. · m.c.m.', 'حاصل ضرب العددين = ق.م.أ · م.م.أ.'),
        explanation: say('$18\\cdot b=6\\cdot 72=432$ → $b=24$. Egiaztatu: $@GCD(18,24)=6$ eta $@LCM(18,24)=72$.', '$18\\cdot b=6\\cdot 72=432$ → $b=24$. Comprueba: $@GCD(18,24)=6$ y $@LCM(18,24)=72$.', '$18\\cdot b=6\\cdot 72=432$ ← $b=24$. تحقّق: $@GCD(18,24)=6$ و$@LCM(18,24)=72$.')
    }
]

export const divisibilityExerciseBank: ExerciseSection[] = [
    {
        id: 'multiples',
        title: say('Multiploak eta zatitzaileak', 'Múltiplos y divisores', 'المضاعفات والقواسم'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi 9ren lehen bost multiploak.', 'Escribe los cinco primeros múltiplos de 9.', 'اكتب أول خمسة مضاعفات للعدد 9.'), solution: same('$9,\\ 18,\\ 27,\\ 36,\\ 45$') },
            { id: 2, difficulty: 'easy', question: say('91 7ren multiploa al da? Eta 85 6rena?', '¿Es 91 múltiplo de 7? ¿Y 85 de 6?', 'هل 91 مضاعف لـ 7؟ وهل 85 مضاعف لـ 6؟'), solution: say('Bai: $91=7\\cdot 13$. Ez: $85=6\\cdot 14+1$, hondarra 1 da.', 'Sí: $91=7\\cdot 13$. No: $85=6\\cdot 14+1$, el resto es 1.', 'نعم: $91=7\\cdot 13$. لا: $85=6\\cdot 14+1$، والباقي 1.') },
            { id: 3, difficulty: 'easy', question: say('Idatzi 30en zatitzaile guztiak.', 'Escribe todos los divisores de 30.', 'اكتب جميع قواسم 30.'), solution: same('$@DIV(30)=\\{1,2,3,5,6,10,15,30\\}$') },
            { id: 4, difficulty: 'medium', question: say('Idatzi 50 eta 100 arteko 12ren multiploak.', 'Escribe los múltiplos de 12 comprendidos entre 50 y 100.', 'اكتب مضاعفات 12 الواقعة بين 50 و100.'), solution: same('$60,\\ 72,\\ 84,\\ 96$') },
            { id: 5, difficulty: 'medium', question: say('Idatzi 40 eta 60ren zatitzaile komunak.', 'Escribe los divisores comunes de 40 y 60.', 'اكتب القواسم المشتركة لـ 40 و60.'), solution: say('$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$ eta $@DIV(60)=\\{1,2,3,4,5,6,10,12,15,20,30,60\\}$. Komunak: 1, 2, 4, 5, 10, 20.', '$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$ y $@DIV(60)=\\{1,2,3,4,5,6,10,12,15,20,30,60\\}$. Comunes: 1, 2, 4, 5, 10, 20.', '$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$ و$@DIV(60)=\\{1,2,3,4,5,6,10,12,15,20,30,60\\}$. المشتركة: 1، 2، 4، 5، 10، 20.') },
            { id: 6, difficulty: 'hard', question: say('Egia ala gezurra? a) 1 zenbaki guztien zatitzailea da. b) 0 zenbaki guztien multiploa da. c) Zenbaki batek infinitu zatitzaile ditu.', '¿Verdadero o falso? a) 1 es divisor de todos los números. b) 0 es múltiplo de todos los números. c) Un número tiene infinitos divisores.', 'صح أم خطأ؟ أ) العدد 1 قاسم لكل الأعداد. ب) الصفر مضاعف لكل الأعداد. ج) للعدد عدد لا نهائي من القواسم.'), solution: say('a) Egia: $a=1\\cdot a$. b) Egia: $0=a\\cdot 0$. c) Gezurra: zatitzaileak ez dira zenbakia bera baino handiagoak; multiploak dira infinituak.', 'a) Verdadero: $a=1\\cdot a$. b) Verdadero: $0=a\\cdot 0$. c) Falso: los divisores no superan al número; los que son infinitos son los múltiplos.', 'أ) صح: $a=1\\cdot a$. ب) صح: $0=a\\cdot 0$. ج) خطأ: القواسم لا تتجاوز العدد؛ المضاعفات هي غير المنتهية.') }
        ]
    },
    {
        id: 'criteria',
        title: say('Zatigarritasun irizpideak', 'Criterios de divisibilidad', 'قواعد قابلية القسمة'),
        items: [
            { id: 7, difficulty: 'easy', question: say('2 345, 1 710 eta 888: zein dira 2rekin, 5ekin eta 10ekin zatigarriak?', '2 345, 1 710 y 888: ¿cuáles son divisibles por 2, por 5 y por 10?', '2 345 و1 710 و888: أيها يقبل القسمة على 2 و5 و10؟'), solution: say('2 345: 5ekin bakarrik. 1 710: 2rekin, 5ekin eta 10ekin. 888: 2rekin bakarrik.', '2 345: solo por 5. 1 710: por 2, por 5 y por 10. 888: solo por 2.', '2 345: على 5 فقط. 1 710: على 2 و5 و10. 888: على 2 فقط.') },
            { id: 8, difficulty: 'easy', question: say('4 131 3rekin zatigarria al da? Eta 9rekin?', '¿Es 4 131 divisible por 3? ¿Y por 9?', 'هل 4 131 يقبل القسمة على 3؟ وعلى 9؟'), solution: say('$4+1+3+1=9$: bai 3rekin eta bai 9rekin.', '$4+1+3+1=9$: sí por 3 y sí por 9.', '$4+1+3+1=9$: نعم على 3 ونعم على 9.') },
            { id: 9, difficulty: 'medium', question: say('Osatu $5\\square 4$ 3rekin zatigarria izateko. Idatzi aukera guztiak.', 'Completa $5\\square 4$ para que sea divisible por 3. Escribe todas las posibilidades.', 'أكمل $5\\square 4$ ليقبل القسمة على 3. اكتب كل الاحتمالات.'), solution: say('$5+4=9$ dagoeneko 3ren multiploa da; zifrak ere hala izan behar du: 504, 534, 564, 594.', '$5+4=9$ ya es múltiplo de 3; la cifra también tiene que serlo: 504, 534, 564, 594.', '$5+4=9$ مضاعف لـ 3 أصلًا، فيجب أن يكون الرقم كذلك: 504، 534، 564، 594.') },
            { id: 10, difficulty: 'medium', question: say('Aplikatu 11ren irizpidea 7 392 zenbakiari.', 'Aplica el criterio del 11 a 7 392.', 'طبّق قاعدة 11 على 7 392.'), solution: say('Posizio bikoitiak: $9+7=16$. Bakoitiak: $2+3=5$. $16-5=11$ → zatigarria da ($7\\,392=11\\cdot 672$).', 'Lugares pares: $9+7=16$. Impares: $2+3=5$. $16-5=11$ → es divisible ($7\\,392=11\\cdot 672$).', 'المواقع الزوجية: $9+7=16$. الفردية: $2+3=5$. $16-5=11$ ← يقبل القسمة ($7\\,392=11\\cdot 672$).') },
            { id: 11, difficulty: 'medium', question: say('Aplikatu 7ren irizpidea 1 603 zenbakiari.', 'Aplica el criterio del 7 a 1 603.', 'طبّق قاعدة 7 على 1 603.'), solution: say('$160-6=154$; $15-8=7$ → zatigarria da ($1\\,603=7\\cdot 229$).', '$160-6=154$; $15-8=7$ → es divisible ($1\\,603=7\\cdot 229$).', '$160-6=154$؛ $15-8=7$ ← يقبل القسمة ($1\\,603=7\\cdot 229$).') },
            { id: 12, difficulty: 'hard', question: say('Idatzi $2\\square 5$ erako zenbaki bat, 5ekin eta 9rekin zatigarria.', 'Escribe un número de la forma $2\\square 5$ divisible por 5 y por 9.', 'اكتب عددًا على الصورة $2\\square 5$ يقبل القسمة على 5 و9.'), solution: say('5ean amaitzen da (5 ✓). $2+\\square+5=9$ → $\\square=2$: 225.', 'Acaba en 5 (5 ✓). $2+\\square+5=9$ → $\\square=2$: 225.', 'ينتهي بـ 5 (5 ✓). $2+\\square+5=9$ ← $\\square=2$: ‏225.') }
        ]
    },
    {
        id: 'primes',
        title: say('Zenbaki lehenak eta faktorizazioa', 'Primos y factorización', 'الأعداد الأولية والتحليل'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Lehena ala konposatua? 37, 39, 41, 51.', '¿Primo o compuesto? 37, 39, 41, 51.', 'أولي أم مؤلف؟ 37، 39، 41، 51.'), solution: say('37 eta 41 lehenak. $39=3\\cdot 13$ eta $51=3\\cdot 17$ konposatuak.', '37 y 41 son primos. $39=3\\cdot 13$ y $51=3\\cdot 17$ son compuestos.', '37 و41 أوليان. $39=3\\cdot 13$ و$51=3\\cdot 17$ مؤلفان.') },
            { id: 14, difficulty: 'easy', question: say('Deskonposatu 48 biderkagai lehenetan.', 'Descompón 48 en factores primos.', 'حلّل 48 إلى عوامل أولية.'), solution: same('$48=2^{4}\\cdot 3$') },
            { id: 15, difficulty: 'medium', question: say('Deskonposatu 180 biderkagai lehenetan.', 'Descompón 180 en factores primos.', 'حلّل 180 إلى عوامل أولية.'), solution: same('$180=2^{2}\\cdot 3^{2}\\cdot 5$') },
            { id: 16, difficulty: 'medium', question: say('Zuzena al da $90=2\\cdot 5\\cdot 9$?', '¿Es correcta $90=2\\cdot 5\\cdot 9$?', 'هل $90=2\\cdot 5\\cdot 9$ صحيحة؟'), solution: say('Ez: 9 ez da lehena. Zuzena: $90=2\\cdot 3^{2}\\cdot 5$.', 'No: 9 no es primo. La correcta: $90=2\\cdot 3^{2}\\cdot 5$.', 'لا: 9 ليس أوليًا. الصحيح: $90=2\\cdot 3^{2}\\cdot 5$.') },
            { id: 17, difficulty: 'medium', question: say('Zein zenbaki da $2^{2}\\cdot 5\\cdot 7$?', '¿Qué número es $2^{2}\\cdot 5\\cdot 7$?', 'ما العدد $2^{2}\\cdot 5\\cdot 7$؟'), solution: same('$4\\cdot 5\\cdot 7=140$') },
            { id: 18, difficulty: 'hard', question: say('1 001 lehena al da? Erabili 7ren irizpidea.', '¿Es 1 001 primo? Usa el criterio del 7.', 'هل 1 001 أولي؟ استعمل قاعدة 7.'), solution: say('$100-2=98=7\\cdot 14$ → 7rekin zatigarria. $1\\,001=7\\cdot 11\\cdot 13$: konposatua.', '$100-2=98=7\\cdot 14$ → divisible por 7. $1\\,001=7\\cdot 11\\cdot 13$: compuesto.', '$100-2=98=7\\cdot 14$ ← يقبل القسمة على 7. $1\\,001=7\\cdot 11\\cdot 13$: مؤلف.') }
        ]
    },
    {
        id: 'gcd-lcm',
        title: say('ZKH eta MKT', 'm.c.d. y m.c.m.', 'ق.م.أ و م.م.أ'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Kalkulatu zerrendekin $@GCD(8,12)$ eta $@LCM(8,12)$.', 'Calcula con listas el $@GCD(8,12)$ y el $@LCM(8,12)$.', 'احسب بالقوائم $@GCD(8,12)$ و$@LCM(8,12)$.'), solution: say('$@DIV(8)=\\{1,2,4,8\\}$, $@DIV(12)=\\{1,2,3,4,6,12\\}$ → $@GCD=4$. $\\mathrm{M}(8)=\\{8,16,24,\\dots\\}$, $\\mathrm{M}(12)=\\{12,24,\\dots\\}$ → $@LCM=24$.', '$@DIV(8)=\\{1,2,4,8\\}$, $@DIV(12)=\\{1,2,3,4,6,12\\}$ → $@GCD=4$. $\\mathrm{M}(8)=\\{8,16,24,\\dots\\}$, $\\mathrm{M}(12)=\\{12,24,\\dots\\}$ → $@LCM=24$.', '$@DIV(8)=\\{1,2,4,8\\}$، $@DIV(12)=\\{1,2,3,4,6,12\\}$ ← $@GCD=4$. $\\mathrm{M}(8)=\\{8,16,24,\\dots\\}$، $\\mathrm{M}(12)=\\{12,24,\\dots\\}$ ← $@LCM=24$.') },
            { id: 20, difficulty: 'medium', question: calculate('$@GCD(60,90)$, $@LCM(60,90)$'), solution: same('$60=2^{2}\\cdot 3\\cdot 5,\\ 90=2\\cdot 3^{2}\\cdot 5\\ \\Rightarrow\\ @GCD=30,\\ @LCM=180$') },
            { id: 21, difficulty: 'medium', question: calculate('$@GCD(84,105)$, $@LCM(84,105)$'), solution: same('$84=2^{2}\\cdot 3\\cdot 7,\\ 105=3\\cdot 5\\cdot 7\\ \\Rightarrow\\ @GCD=21,\\ @LCM=420$') },
            { id: 22, difficulty: 'medium', question: calculate('$@GCD(18,90,360)$, $@LCM(18,90,360)$'), solution: same('$18=2\\cdot 3^{2},\\ 90=2\\cdot 3^{2}\\cdot 5,\\ 360=2^{3}\\cdot 3^{2}\\cdot 5\\ \\Rightarrow\\ @GCD=18,\\ @LCM=360$') },
            { id: 23, difficulty: 'hard', question: say('16 eta 25 elkarren arteko lehenak al dira? Kalkulatu haien MKT.', '¿Son 16 y 25 primos entre sí? Calcula su m.c.m.', 'هل 16 و25 أوليان فيما بينهما؟ احسب م.م.أ لهما.'), solution: say('$16=2^{4}$, $25=5^{2}$: ez dute biderkagai komunik, $@GCD=1$ → bai. $@LCM=16\\cdot 25=400$.', '$16=2^{4}$, $25=5^{2}$: no tienen factores comunes, $@GCD=1$ → sí. $@LCM=16\\cdot 25=400$.', '$16=2^{4}$، $25=5^{2}$: لا عوامل مشتركة، $@GCD=1$ ← نعم. $@LCM=16\\cdot 25=400$.') },
            { id: 24, difficulty: 'hard', question: say('Egiaztatu 12 eta 18rekin: ZKH · MKT = bi zenbakien biderkadura.', 'Comprueba con 12 y 18 que m.c.d. · m.c.m. = producto de los dos números.', 'تحقّق باستعمال 12 و18 أن ق.م.أ · م.م.أ = حاصل ضرب العددين.'), solution: same('$@GCD(12,18)\\cdot @LCM(12,18)=6\\cdot 36=216=12\\cdot 18$') }
        ]
    },
    {
        id: 'problems',
        title: say('Buruketak', 'Problemas', 'المسائل'),
        items: [
            { id: 25, difficulty: 'easy', question: say('520 cm × 240 cm-ko horma bat ahalik eta handienak diren lauza karratuekin estali nahi da. Zenbat neurtuko du lauzaren aldeak?', 'Una pared de 520 cm × 240 cm se quiere cubrir con baldosas cuadradas lo más grandes posible. ¿Cuánto medirá el lado de cada baldosa?', 'نريد تغطية جدار 520 سم × 240 سم ببلاط مربع بأكبر حجم ممكن. كم يكون طول ضلع البلاطة؟'), solution: say('$@GCD(520,240)=2^{3}\\cdot 5=40$: lauza bakoitzak 40 cm-ko aldea izango du.', '$@GCD(520,240)=2^{3}\\cdot 5=40$: cada baldosa medirá 40 cm de lado.', '$@GCD(520,240)=2^{3}\\cdot 5=40$: طول ضلع كل بلاطة 40 سم.') },
            { id: 26, difficulty: 'easy', question: say('Bi semaforo berdean jartzen dira 30 eta 45 segundoro. Batera jarri badira, noiz jarriko dira berriro batera?', 'Dos semáforos se ponen en verde cada 30 y 45 segundos. Si han coincidido, ¿cuándo volverán a coincidir?', 'إشارتا مرور تصبحان خضراوين كل 30 و45 ثانية. إذا تزامنتا، فمتى تتزامنان مجددًا؟'), solution: say('$@LCM(30,45)=2\\cdot 3^{2}\\cdot 5=90$: 90 segundo barru.', '$@LCM(30,45)=2\\cdot 3^{2}\\cdot 5=90$: dentro de 90 segundos.', '$@LCM(30,45)=2\\cdot 3^{2}\\cdot 5=90$: بعد 90 ثانية.') },
            { id: 27, difficulty: 'medium', question: say('14 ale urdin, 16 laranja eta 10 gorri ditugu. Lepoko berdinak egin nahi ditugu ale guztiekin. Gehienez zenbat lepoko? Zer izango du bakoitzak?', 'Tenemos 14 cuentas azules, 16 naranjas y 10 rojas. Queremos hacer collares iguales con todas las cuentas. ¿Cuántos collares como máximo? ¿Qué llevará cada uno?', 'لدينا 14 خرزة زرقاء و16 برتقالية و10 حمراء. نريد صنع عقود متساوية بكل الخرز. ما أكبر عدد من العقود؟ وماذا في كل عقد؟'), solution: say('$@GCD(14,16,10)=2$: 2 lepoko, bakoitzak 7 urdin, 8 laranja eta 5 gorri.', '$@GCD(14,16,10)=2$: 2 collares, cada uno con 7 azules, 8 naranjas y 5 rojas.', '$@GCD(14,16,10)=2$: عقدان، في كل منهما 7 زرقاء و8 برتقالية و5 حمراء.') },
            { id: 28, difficulty: 'medium', question: say('55 mm-ko kubo urdinekin eta 45 mm-ko kubo gorriekin bi zutabe egiten ditugu. Noiz izango dute altuera bera lehen aldiz? Zenbat kubo zutabe bakoitzean?', 'Con cubos azules de 55 mm y rojos de 45 mm hacemos dos columnas. ¿Cuándo tendrán por primera vez la misma altura? ¿Cuántos cubos tendrá cada una?', 'نبني عمودين: أحدهما بمكعبات زرقاء ارتفاعها 55 مم والآخر بمكعبات حمراء 45 مم. متى يتساوى ارتفاعهما لأول مرة؟ وكم مكعبًا في كل عمود؟'), solution: say('$@LCM(55,45)=3^{2}\\cdot 5\\cdot 11=495$ mm. Urdinak: $495\\mathbin{:}55=9$ kubo; gorriak: $495\\mathbin{:}45=11$ kubo.', '$@LCM(55,45)=3^{2}\\cdot 5\\cdot 11=495$ mm. Azules: $495\\mathbin{:}55=9$ cubos; rojos: $495\\mathbin{:}45=11$ cubos.', '$@LCM(55,45)=3^{2}\\cdot 5\\cdot 11=495$ مم. الزرقاء: $495\\mathbin{:}55=9$ مكعبات؛ الحمراء: $495\\mathbin{:}45=11$ مكعبًا.') },
            { id: 29, difficulty: 'hard', question: say('36 txorizo-ogitarteko eta 84 gazta-ogitarteko ditugu. Poltsa berdinak egin nahi ditugu, mota bakarrekoak eta ahalik eta handienak. Zenbat poltsa?', 'Tenemos 36 bocadillos de chorizo y 84 de queso. Queremos bolsas iguales, de un solo tipo y lo más grandes posible. ¿Cuántas bolsas?', 'لدينا 36 شطيرة بالنقانق و84 بالجبن. نريد أكياسًا متساوية من نوع واحد وبأكبر حجم ممكن. كم كيسًا؟'), solution: say('$@GCD(36,84)=12$ ogitarteko poltsako. $36\\mathbin{:}12=3$ eta $84\\mathbin{:}12=7$ → 10 poltsa.', '$@GCD(36,84)=12$ bocadillos por bolsa. $36\\mathbin{:}12=3$ y $84\\mathbin{:}12=7$ → 10 bolsas.', '$@GCD(36,84)=12$ شطيرة في الكيس. $36\\mathbin{:}12=3$ و$84\\mathbin{:}12=7$ ← 10 أكياس.') },
            { id: 30, difficulty: 'hard', question: say('Hiru txirrindularik itzuli bat 12, 15 eta 20 minututan egiten dute. 10:00etan batera irten dira. Noiz igaroko dira berriro batera irteera-lerrotik?', 'Tres ciclistas dan una vuelta en 12, 15 y 20 minutos. Salen juntos a las 10:00. ¿Cuándo volverán a pasar juntos por la salida?', 'ثلاثة دراجين يُكملون لفة في 12 و15 و20 دقيقة. انطلقوا معًا في الساعة 10:00. متى يمرون معًا بخط الانطلاق مجددًا؟'), solution: say('$@LCM(12,15,20)=2^{2}\\cdot 3\\cdot 5=60$ minutu → 11:00etan.', '$@LCM(12,15,20)=2^{2}\\cdot 3\\cdot 5=60$ minutos → a las 11:00.', '$@LCM(12,15,20)=2^{2}\\cdot 3\\cdot 5=60$ دقيقة ← في الساعة 11:00.') }
        ]
    }
]
