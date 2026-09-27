import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'

/* ==========================================================================
   Zatigarritasuna · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges. Exercises follow Santillana 1.º ESO unit 2 (tables of rules,
   groupings, the swimming pool, the ships) and Anaya unit 3. Small numbers,
   lists before factorizations. @GCD, @LCM and @DIV become ZKH, MKT and Zat
   in Basque and Arabic, and m.c.d., m.c.m. and Div in Spanish.
   ========================================================================== */

/** Text per language; formulas inside may use the @GCD/@LCM/@DIV notation */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu: notation(eu).eu, es: notation(es).es, ar: notation(ar).ar })
const same = (value: string): LocalizedText => notation(value)

export const divisibilityIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 901,
        prompt: say('Zein zatiketa da zehatza?', '¿Qué división es exacta?', 'أي قسمة تامة؟'),
        options: [same('$28\\mathbin{:}5$'), same('$36\\mathbin{:}4$'), same('$40\\mathbin{:}6$')],
        correctIndex: 1,
        explanation: say('$36=4\\cdot 9$: hondarra 0 da. Besteetan hondarra 3 eta 4 dira.', '$36=4\\cdot 9$: el resto es 0. En las otras el resto es 3 y 4.', '$36=4\\cdot 9$: الباقي 0. وفي الأخريين الباقي 3 و4.'),
        topic: 'relation'
    },
    {
        id: 902,
        prompt: say('Zein da 6ren multiploa?', '¿Cuál es múltiplo de 6?', 'أي عدد مضاعف لـ 6؟'),
        options: [same('$26$'), same('$16$'), same('$42$')],
        correctIndex: 2,
        explanation: say('$42=6\\cdot 7$. Kontuz: 26 eta 16 6z amaitzen dira, baina $26=6\\cdot 4+2$ eta $16=6\\cdot 2+4$.', '$42=6\\cdot 7$. Cuidado: 26 y 16 acaban en 6, pero $26=6\\cdot 4+2$ y $16=6\\cdot 2+4$.', '$42=6\\cdot 7$. انتبه: 26 و16 ينتهيان بـ 6، لكن $26=6\\cdot 4+2$ و$16=6\\cdot 2+4$.'),
        topic: 'multiples'
    },
    {
        id: 903,
        prompt: say('Zenbat zatitzaile ditu 12k?', '¿Cuántos divisores tiene 12?', 'كم قاسمًا للعدد 12؟'),
        options: [same('$4$'), same('$6$'), same('$5$')],
        correctIndex: 1,
        explanation: say('$@DIV(12)=\\{1,2,3,4,6,12\\}$: sei zatitzaile.', '$@DIV(12)=\\{1,2,3,4,6,12\\}$: seis divisores.', '$@DIV(12)=\\{1,2,3,4,6,12\\}$: ستة قواسم.'),
        topic: 'divisors'
    },
    {
        id: 904,
        prompt: say('Zein da 5ekin zatigarria?', '¿Cuál es divisible por 5?', 'أي عدد يقبل القسمة على 5؟'),
        options: [same('$552$'), same('$355$'), same('$523$')],
        correctIndex: 1,
        explanation: say('355 5ez amaitzen da. Besteak 2z eta 3z amaitzen dira.', '355 acaba en 5. Los otros acaban en 2 y en 3.', 'العدد 355 ينتهي بـ 5. والآخران ينتهيان بـ 2 و3.'),
        topic: 'criteria-digit'
    },
    {
        id: 905,
        prompt: say('Zein da 3rekin zatigarria?', '¿Cuál es divisible por 3?', 'أي عدد يقبل القسمة على 3؟'),
        options: [same('$124$'), same('$231$'), same('$401$')],
        correctIndex: 1,
        explanation: say('$2+3+1=6$, 3ren multiploa. Besteetan batura 7 eta 5 da.', '$2+3+1=6$, múltiplo de 3. En los otros la suma es 7 y 5.', '$2+3+1=6$ وهو مضاعف لـ 3. وفي الآخرين المجموع 7 و5.'),
        topic: 'criteria-sum'
    },
    {
        id: 906,
        prompt: say('Zein da zenbaki lehena?', '¿Cuál es un número primo?', 'أي عدد أولي؟'),
        options: [same('$21$'), same('$29$'), same('$27$')],
        correctIndex: 1,
        explanation: say('29k 1 eta 29 ditu zatitzaile bakarrik. $21=3\\cdot 7$ eta $27=3\\cdot 9$.', '29 solo tiene como divisores 1 y 29. $21=3\\cdot 7$ y $27=3\\cdot 9$.', 'للعدد 29 قاسمان فقط: 1 و29. أما $21=3\\cdot 7$ و$27=3\\cdot 9$.'),
        topic: 'primes'
    },
    {
        id: 907,
        prompt: say('Zein da 24ren deskonposizioa biderkagai lehenetan?', '¿Cuál es la descomposición de 24 en factores primos?', 'ما تحليل 24 إلى عوامل أولية؟'),
        options: [same('$2^{3}\\cdot 3$'), same('$4\\cdot 6$'), same('$2^{2}\\cdot 3^{2}$')],
        correctIndex: 0,
        explanation: say('$24=2\\cdot 2\\cdot 2\\cdot 3=2^{3}\\cdot 3$. $4\\cdot 6$ ez da baliozkoa, 4 eta 6 ez direlako lehenak.', '$24=2\\cdot 2\\cdot 2\\cdot 3=2^{3}\\cdot 3$. $4\\cdot 6$ no vale porque 4 y 6 no son primos.', '$24=2\\cdot 2\\cdot 2\\cdot 3=2^{3}\\cdot 3$. والصيغة $4\\cdot 6$ غير مقبولة لأن 4 و6 ليسا أوليين.'),
        topic: 'factorization'
    },
    {
        id: 908,
        prompt: say('Mikel 3 egunean behin joaten da igerilekura eta Nora 4 egunean behin. Gaur biak joan dira. Zenbat egun barru egingo dute bat berriro?', 'Mikel va a la piscina cada 3 días y Nora cada 4. Hoy han ido los dos. ¿Dentro de cuántos días volverán a coincidir?', 'يذهب ميكيل إلى المسبح كل 3 أيام ونورا كل 4. ذهبا معًا اليوم. بعد كم يومًا سيلتقيان مجددًا؟'),
        options: [say('12 egun', '12 días', '12 يومًا'), say('7 egun', '7 días', '7 أيام'), say('1 egun', '1 día', 'يوم واحد')],
        correctIndex: 0,
        explanation: say('Berriro bat etortzea → MKT. $@LCM(3,4)=12$ egun.', 'Volver a coincidir → m.c.m. $@LCM(3,4)=12$ días.', 'التزامن مجددًا ← م.م.أ. $@LCM(3,4)=12$ يومًا.'),
        topic: 'which'
    }
]

const calculate = (latex: string): LocalizedText => say(`Kalkulatu: ${latex}`, `Calcula: ${latex}`, `احسب: ${latex}`)

export const divisibilityIntroPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'multiples',
        prompt: say('Zein da 6ren bosgarren multiploa (0 kontatu gabe)?', '¿Cuál es el quinto múltiplo de 6 (sin contar el 0)?', 'ما المضاعف الخامس للعدد 6 (دون احتساب 0)؟'),
        expected: fraction(30),
        hint: say('Biderkatu 6 bider 5.', 'Multiplica 6 por 5.', 'اضرب 6 في 5.'),
        explanation: same('$\\mathrm{M}(6)=\\{6,12,18,24,30,\\dots\\}$')
    },
    {
        id: 2,
        stage: 'multiples',
        prompt: say('Zenbat 7ren multiplo daude 30 eta 90 artean?', '¿Cuántos múltiplos de 7 hay entre 30 y 90?', 'كم مضاعفًا لـ 7 بين 30 و90؟'),
        expected: fraction(8),
        hint: say('Lehena $7\\cdot 5=35$ da. Zein da azkena?', 'El primero es $7\\cdot 5=35$. ¿Cuál es el último?', 'الأول $7\\cdot 5=35$. فما الأخير؟'),
        explanation: say('35, 42, 49, 56, 63, 70, 77 eta 84: 8 multiplo ($7\\cdot 5$etik $7\\cdot 12$ra).', '35, 42, 49, 56, 63, 70, 77 y 84: 8 múltiplos (de $7\\cdot 5$ a $7\\cdot 12$).', '35 و42 و49 و56 و63 و70 و77 و84: ثمانية مضاعفات (من $7\\cdot 5$ إلى $7\\cdot 12$).')
    },
    {
        id: 3,
        stage: 'multiples',
        prompt: say('Zenbat zatitzaile ditu 20k?', '¿Cuántos divisores tiene 20?', 'كم قاسمًا للعدد 20؟'),
        expected: fraction(6),
        hint: say('Bilatu bikoteak: $1\\cdot 20$, $2\\cdot 10$…', 'Busca las parejas: $1\\cdot 20$, $2\\cdot 10$…', 'ابحث عن الأزواج: $1\\cdot 20$، $2\\cdot 10$…'),
        explanation: say('$@DIV(20)=\\{1,2,4,5,10,20\\}$: 6 zatitzaile.', '$@DIV(20)=\\{1,2,4,5,10,20\\}$: 6 divisores.', '$@DIV(20)=\\{1,2,4,5,10,20\\}$: ستة قواسم.')
    },
    {
        id: 4,
        stage: 'multiples',
        prompt: say('Zein da $50\\mathbin{:}8$ zatiketaren hondarra?', '¿Cuál es el resto de la división $50\\mathbin{:}8$?', 'ما باقي القسمة $50\\mathbin{:}8$؟'),
        expected: fraction(2),
        hint: same('$8\\cdot 6=48$'),
        explanation: say('$50=8\\cdot 6+2$: hondarra 2 da, beraz 50 ez da 8ren multiploa.', '$50=8\\cdot 6+2$: el resto es 2, así que 50 no es múltiplo de 8.', '$50=8\\cdot 6+2$: الباقي 2، إذن 50 ليس مضاعفًا لـ 8.')
    },
    {
        id: 5,
        stage: 'criteria',
        prompt: say('Zein zifra jarri behar da $47\\square$ zenbakian 10ekin zatigarria izateko?', '¿Qué cifra hay que poner en $47\\square$ para que sea divisible por 10?', 'أي رقم نضع في $47\\square$ ليقبل القسمة على 10؟'),
        expected: fraction(0),
        hint: say('10ekin zatigarriak 0z amaitzen dira.', 'Los divisibles por 10 acaban en 0.', 'الأعداد التي تقبل القسمة على 10 تنتهي بـ 0.'),
        explanation: say('470. 10ekin zatigarria denez, 2rekin eta 5ekin ere bada.', '470. Como es divisible por 10, también lo es por 2 y por 5.', '470. وبما أنه يقبل القسمة على 10 فهو يقبلها على 2 و5 أيضًا.')
    },
    {
        id: 6,
        stage: 'criteria',
        prompt: say('Zein da $5\\square 2$ 3rekin zatigarria egiten duen zifrarik txikiena?', '¿Cuál es la menor cifra que hace $5\\square 2$ divisible por 3?', 'ما أصغر رقم يجعل $5\\square 2$ يقبل القسمة على 3؟'),
        expected: fraction(2),
        hint: say('$5+2=7$. Zenbat falta da 3ren hurrengo multiplora iristeko?', '$5+2=7$. ¿Cuánto falta para el siguiente múltiplo de 3?', '$5+2=7$. كم ينقص للوصول إلى مضاعف 3 التالي؟'),
        explanation: say('$5+2+2=9$: 522. 5 eta 8 ere balio dute, baina 2 da txikiena.', '$5+2+2=9$: 522. También valen 5 y 8, pero 2 es la menor.', '$5+2+2=9$: ‏522. ويصلح أيضًا 5 و8، لكن 2 هو الأصغر.')
    },
    {
        id: 7,
        stage: 'criteria',
        prompt: say('Zenbat dira 2ren multiploak zenbaki hauetatik: 230, 496, 520, 2.080, 2.745 eta 455?', '¿Cuántos son múltiplos de 2 entre estos números: 230, 496, 520, 2.080, 2.745 y 455?', 'كم عددًا من هذه مضاعف لـ 2: ‏230، 496، 520، 2.080، 2.745، 455؟'),
        expected: fraction(4),
        hint: say('Begiratu azken zifrari: bikoitia al da?', 'Mira la última cifra: ¿es par?', 'انظر إلى الرقم الأخير: هل هو زوجي؟'),
        explanation: say('230, 496, 520 eta 2.080 zifra bikoitiz amaitzen dira. 2.745 eta 455 ez.', '230, 496, 520 y 2.080 acaban en cifra par. 2.745 y 455, no.', 'تنتهي 230 و496 و520 و2.080 برقم زوجي، أما 2.745 و455 فلا.')
    },
    {
        id: 8,
        stage: 'criteria',
        prompt: say('Zein zifra falta da $2\\square 4$ zenbakian 9rekin zatigarria izateko?', '¿Qué cifra falta en $2\\square 4$ para que sea divisible por 9?', 'ما الرقم الناقص في $2\\square 4$ ليقبل القسمة على 9؟'),
        expected: fraction(3),
        hint: say('$2+\\square+4$ 9 izan behar da.', '$2+\\square+4$ tiene que dar 9.', 'يجب أن يساوي $2+\\square+4$ العدد 9.'),
        explanation: say('$2+3+4=9$: 234. (Batura 18 izateko 12 behar litzateke, eta ez da zifra bat.)', '$2+3+4=9$: 234. (Para sumar 18 haría falta 12, que no es una cifra.)', '$2+3+4=9$: ‏234. (ولكي يكون المجموع 18 نحتاج 12، وهو ليس رقمًا واحدًا.)')
    },
    {
        id: 9,
        stage: 'primes',
        prompt: say('Zenbat zenbaki lehen daude 70 eta 100 artean?', '¿Cuántos números primos hay entre 70 y 100?', 'كم عددًا أوليًا بين 70 و100؟'),
        expected: fraction(6),
        hint: say('Baztertu bikoitiak, 5ez amaitzen direnak eta 3ren eta 7ren multiploak.', 'Descarta los pares, los que acaban en 5 y los múltiplos de 3 y de 7.', 'استبعد الزوجية والمنتهية بـ 5 ومضاعفات 3 و7.'),
        explanation: say('71, 73, 79, 83, 89 eta 97. Adibidez, $91=7\\cdot 13$ ez da lehena.', '71, 73, 79, 83, 89 y 97. Por ejemplo, $91=7\\cdot 13$ no es primo.', '71 و73 و79 و83 و89 و97. مثلًا $91=7\\cdot 13$ ليس أوليًا.')
    },
    {
        id: 10,
        stage: 'primes',
        prompt: say('$60=2^{a}\\cdot 3\\cdot 5$. Zenbat da $a$?', '$60=2^{a}\\cdot 3\\cdot 5$. ¿Cuánto vale $a$?', '$60=2^{a}\\cdot 3\\cdot 5$. كم قيمة $a$؟'),
        expected: fraction(2),
        hint: say('Zatitu 60 2z behin eta berriro.', 'Divide 60 entre 2 una y otra vez.', 'اقسم 60 على 2 مرة بعد مرة.'),
        explanation: same('$60=2\\cdot 2\\cdot 3\\cdot 5=2^{2}\\cdot 3\\cdot 5$')
    },
    {
        id: 11,
        stage: 'primes',
        prompt: say('Zein zenbaki da $2\\cdot 3^{2}\\cdot 5$?', '¿Qué número es $2\\cdot 3^{2}\\cdot 5$?', 'ما العدد $2\\cdot 3^{2}\\cdot 5$؟'),
        expected: fraction(90),
        hint: same('$3^{2}=9$'),
        explanation: same('$2\\cdot 9\\cdot 5=90$')
    },
    {
        id: 12,
        stage: 'primes',
        prompt: say('$45=3^{2}\\cdot 5$. Zenbat zatitzaile ditu 45ek?', '$45=3^{2}\\cdot 5$. ¿Cuántos divisores tiene 45?', '$45=3^{2}\\cdot 5$. كم قاسمًا للعدد 45؟'),
        expected: fraction(6),
        hint: say('Egin taula: lehen errenkada 1, 3, 9; bigarrena bider 5.', 'Haz la tabla: primera fila 1, 3, 9; la segunda, por 5.', 'ارسم الجدول: الصف الأول 1، 3، 9؛ والثاني مضروبًا في 5.'),
        explanation: say('$@DIV(45)=\\{1,3,5,9,15,45\\}$: 6 zatitzaile.', '$@DIV(45)=\\{1,3,5,9,15,45\\}$: 6 divisores.', '$@DIV(45)=\\{1,3,5,9,15,45\\}$: ستة قواسم.')
    },
    {
        id: 13,
        stage: 'gcd-lcm',
        prompt: calculate('$@GCD(16,24)$'),
        expected: fraction(8),
        hint: say('Idatzi bien zatitzaileak edo deskonposatu: $16=2^{4}$, $24=2^{3}\\cdot 3$.', 'Escribe los divisores de los dos o descompón: $16=2^{4}$, $24=2^{3}\\cdot 3$.', 'اكتب قواسم العددين أو حلّل: $16=2^{4}$، $24=2^{3}\\cdot 3$.'),
        explanation: say('Komuna 2 da, berretzaile txikienarekin: $@GCD(16,24)=2^{3}=8$.', 'El común es el 2, con el menor exponente: $@GCD(16,24)=2^{3}=8$.', 'العامل المشترك 2 بأصغر أس: $@GCD(16,24)=2^{3}=8$.')
    },
    {
        id: 14,
        stage: 'gcd-lcm',
        prompt: calculate('$@GCD(25,30)$'),
        expected: fraction(5),
        hint: say('$@DIV(25)=\\{1,5,25\\}$', '$@DIV(25)=\\{1,5,25\\}$', '$@DIV(25)=\\{1,5,25\\}$'),
        explanation: say('Zatitzaile komunak: 1 eta 5. $@GCD(25,30)=5$.', 'Divisores comunes: 1 y 5. $@GCD(25,30)=5$.', 'القواسم المشتركة: 1 و5. $@GCD(25,30)=5$.')
    },
    {
        id: 15,
        stage: 'gcd-lcm',
        prompt: calculate('$@LCM(6,8)$'),
        expected: fraction(24),
        hint: say('Idatzi 8ren multiploak eta bilatu 6ren multiploa den lehena.', 'Escribe los múltiplos de 8 y busca el primero que sea múltiplo de 6.', 'اكتب مضاعفات 8 وابحث عن أولها الذي هو مضاعف لـ 6.'),
        explanation: say('8, 16, 24… eta 24 6ren multiploa da: $@LCM(6,8)=24$.', '8, 16, 24… y 24 es múltiplo de 6: $@LCM(6,8)=24$.', '8، 16، 24… و24 مضاعف لـ 6: $@LCM(6,8)=24$.')
    },
    {
        id: 16,
        stage: 'gcd-lcm',
        prompt: calculate('$@LCM(10,25)$'),
        expected: fraction(50),
        hint: say('Deskonposatu: $10=2\\cdot 5$, $25=5^{2}$.', 'Descompón: $10=2\\cdot 5$, $25=5^{2}$.', 'حلّل: $10=2\\cdot 5$، $25=5^{2}$.'),
        explanation: say('Guztiak, berretzaile handienarekin: $@LCM(10,25)=2\\cdot 5^{2}=50$.', 'Todos, con el mayor exponente: $@LCM(10,25)=2\\cdot 5^{2}=50$.', 'كل العوامل بأكبر أس: $@LCM(10,25)=2\\cdot 5^{2}=50$.')
    },
    {
        id: 17,
        stage: 'problems',
        prompt: say('Gela batean 24 neska eta 30 mutil daude. Talde berdinak egin nahi dira, neskak eta mutilak nahastu gabe eta ahalik eta talde handienak. Zenbat ikasle izango ditu talde bakoitzak?', 'En un curso hay 24 chicas y 30 chicos. Se quieren hacer grupos iguales, sin mezclar chicas y chicos y lo más grandes posible. ¿Cuántos alumnos tendrá cada grupo?', 'في صف 24 بنتًا و30 ولدًا. نريد تكوين مجموعات متساوية دون خلط البنات بالأولاد، وبأكبر حجم ممكن. كم تلميذًا في كل مجموعة؟'),
        expected: fraction(6),
        hint: say('Taldeetan banatu, soberan utzi gabe → ZKH.', 'Repartir en grupos sin que sobre nadie → m.c.d.', 'التوزيع في مجموعات دون أن يبقى أحد ← ق.م.أ.'),
        explanation: say('$@GCD(24,30)=6$: 6 ikasleko taldeak (4 nesketakoak eta 5 mutilenak).', '$@GCD(24,30)=6$: grupos de 6 alumnos (4 de chicas y 5 de chicos).', '$@GCD(24,30)=6$: مجموعات من 6 تلاميذ (4 للبنات و5 للأولاد).')
    },
    {
        id: 18,
        stage: 'problems',
        prompt: say('Itsasontzi bat portutik 4 egunean behin irteten da eta beste bat 6 egunean behin. Gaur batera irten dira. Zenbat egun barru irtengo dira berriro batera?', 'Un barco sale del puerto cada 4 días y otro cada 6. Hoy han salido juntos. ¿Dentro de cuántos días volverán a salir juntos?', 'تغادر سفينة الميناء كل 4 أيام وأخرى كل 6. غادرتا معًا اليوم. بعد كم يومًا ستغادران معًا مجددًا؟'),
        expected: fraction(12),
        hint: say('Berriro batera → MKT.', 'Volver a coincidir → m.c.m.', 'التزامن مجددًا ← م.م.أ.'),
        explanation: say('$@LCM(4,6)=12$: 12 egun barru.', '$@LCM(4,6)=12$: dentro de 12 días.', '$@LCM(4,6)=12$: بعد 12 يومًا.')
    },
    {
        id: 19,
        stage: 'problems',
        prompt: say('Argi gorri bat 6 segundoan behin pizten da eta berde bat 9 segundoan behin. Batera piztu badira, zenbat segundo pasako dira berriro batera piztu arte?', 'Una luz roja se enciende cada 6 segundos y una verde cada 9. Si se han encendido juntas, ¿cuántos segundos pasarán hasta que vuelvan a coincidir?', 'ضوء أحمر يضيء كل 6 ثوانٍ وأخضر كل 9. إذا أضاءا معًا، فكم ثانية تمر حتى يضيئا معًا مجددًا؟'),
        expected: fraction(18),
        hint: say('Idatzi 9ren multiploak: 9, 18… Zein da 6ren multiploa?', 'Escribe los múltiplos de 9: 9, 18… ¿Cuál es múltiplo de 6?', 'اكتب مضاعفات 9: ‏9، 18… أيها مضاعف لـ 6؟'),
        explanation: say('$@LCM(6,9)=18$: 18 segundo barru.', '$@LCM(6,9)=18$: a los 18 segundos.', '$@LCM(6,9)=18$: بعد 18 ثانية.')
    }
]

export const divisibilityIntroChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'multiples',
        context: 'starter',
        points: 10,
        prompt: say('40 lata kutxa berdinetan gorde nahi ditut, bat ere soberan utzi gabe. Zenbat modutan egin dezaket (kutxa bakarra ere kontatuta)?', 'Quiero guardar 40 latas en cajas iguales sin que sobre ninguna. ¿De cuántas maneras puedo hacerlo (contando una sola caja)?', 'أريد وضع 40 علبة في صناديق متساوية دون أن تبقى أي علبة. بكم طريقة يمكنني ذلك (مع احتساب صندوق واحد)؟'),
        expected: fraction(8),
        hint: say('Kutxa kopuru bakoitza 40ren zatitzaile bat da.', 'Cada número de cajas es un divisor de 40.', 'كل عدد من الصناديق قاسم لـ 40.'),
        explanation: say('$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$: 8 modu.', '$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$: 8 maneras.', '$@DIV(40)=\\{1,2,4,5,8,10,20,40\\}$: ثماني طرق.')
    },
    {
        id: 102,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('18 arrosa eta 24 krabelin ditugu. Sorta berdinak egin nahi ditugu, loreak nahastu gabe eta ahalik eta handienak. Zenbat lore izango ditu sorta bakoitzak?', 'Tenemos 18 rosas y 24 claveles. Queremos hacer ramos iguales, sin mezclar flores y lo más grandes posible. ¿Cuántas flores tendrá cada ramo?', 'لدينا 18 وردة و24 قرنفلة. نريد صنع باقات متساوية دون خلط الأزهار، وبأكبر حجم ممكن. كم زهرة في كل باقة؟'),
        expected: fraction(6),
        hint: say('Banatu, soberan utzi gabe, ahalik eta handiena → ZKH.', 'Repartir sin que sobre, lo más grande posible → m.c.d.', 'التوزيع دون أن يبقى شيء بأكبر حجم ← ق.م.أ.'),
        explanation: say('$@GCD(18,24)=6$: 6 loreko sortak (3 arrosazkoak eta 4 krabelinezkoak).', '$@GCD(18,24)=6$: ramos de 6 flores (3 de rosas y 4 de claveles).', '$@GCD(18,24)=6$: باقات من 6 أزهار (3 من الورد و4 من القرنفل).')
    },
    {
        id: 103,
        stage: 'criteria',
        context: 'starter',
        points: 10,
        prompt: say('Zein da 2rekin, 3rekin eta 5ekin zatigarria den hiru zifrako zenbakirik txikiena?', '¿Cuál es el menor número de tres cifras divisible por 2, por 3 y por 5?', 'ما أصغر عدد من ثلاثة أرقام يقبل القسمة على 2 و3 و5؟'),
        expected: fraction(120),
        hint: say('2rekin eta 5ekin: 0z amaitu behar du. Probatu 100, 110, 120…', 'Por 2 y por 5: tiene que acabar en 0. Prueba 100, 110, 120…', 'على 2 و5: يجب أن ينتهي بـ 0. جرّب 100، 110، 120…'),
        explanation: say('100: $1+0+0=1$ ✗. 110: $1+1+0=2$ ✗. 120: $1+2+0=3$ ✓. Emaitza: 120.', '100: $1+0+0=1$ ✗. 110: $1+1+0=2$ ✗. 120: $1+2+0=3$ ✓. Resultado: 120.', '100: $1+0+0=1$ ✗. ‏110: $1+1+0=2$ ✗. ‏120: $1+2+0=3$ ✓. الجواب: 120.')
    },
    {
        id: 104,
        stage: 'problems',
        context: 'starter',
        points: 10,
        prompt: say('Ane 3 egunean behin joaten da liburutegira eta Iker 5 egunean behin. Gaur bat egin dute. Zenbat egun barru egingo dute bat berriro?', 'Ane va a la biblioteca cada 3 días e Iker cada 5. Hoy han coincidido. ¿Dentro de cuántos días volverán a coincidir?', 'تذهب آنه إلى المكتبة كل 3 أيام وإيكر كل 5. التقيا اليوم. بعد كم يومًا سيلتقيان مجددًا؟'),
        expected: fraction(15),
        hint: say('Berriro bat etortzea → MKT.', 'Volver a coincidir → m.c.m.', 'التزامن مجددًا ← م.م.أ.'),
        explanation: say('3 eta 5 lehenak dira: $@LCM(3,5)=3\\cdot 5=15$ egun.', '3 y 5 son primos: $@LCM(3,5)=3\\cdot 5=15$ días.', '3 و5 أوليان: $@LCM(3,5)=3\\cdot 5=15$ يومًا.')
    },
    {
        id: 105,
        stage: 'primes',
        context: 'advanced',
        points: 20,
        prompt: say('Zein da 100 baino txikiagoa den zenbaki lehenik handiena?', '¿Cuál es el mayor número primo menor que 100?', 'ما أكبر عدد أولي أصغر من 100؟'),
        expected: fraction(97),
        hint: say('Hasi 99tik behera eta baztertu bikoitiak eta 3ren multiploak.', 'Empieza en 99 hacia abajo y descarta los pares y los múltiplos de 3.', 'ابدأ من 99 نزولًا واستبعد الزوجية ومضاعفات 3.'),
        explanation: say('$99=9\\cdot 11$ eta 98 bikoitia da. 97 ez da 2rekin, 3rekin, 5ekin edo 7rekin zatigarria: lehena da.', '$99=9\\cdot 11$ y 98 es par. 97 no es divisible por 2, 3, 5 ni 7: es primo.', '$99=9\\cdot 11$ و98 زوجي. والعدد 97 لا يقبل القسمة على 2 أو 3 أو 5 أو 7: إنه أولي.')
    },
    {
        id: 106,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('30 cm, 45 cm eta 60 cm-ko hiru zinta zati berdinetan moztu nahi ditugu, ahalik eta luzeenak eta ezer soberan gabe. Zenbat cm izango ditu zati bakoitzak?', 'Queremos cortar tres cintas de 30 cm, 45 cm y 60 cm en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuántos cm medirá cada trozo?', 'نريد قص ثلاثة أشرطة أطوالها 30 سم و45 سم و60 سم إلى قطع متساوية بأطول ما يمكن دون أن يبقى شيء. كم سنتيمترًا طول كل قطعة؟'),
        expected: fraction(15),
        hint: say('Deskonposatu: $30=2\\cdot 3\\cdot 5$, $45=3^{2}\\cdot 5$, $60=2^{2}\\cdot 3\\cdot 5$.', 'Descompón: $30=2\\cdot 3\\cdot 5$, $45=3^{2}\\cdot 5$, $60=2^{2}\\cdot 3\\cdot 5$.', 'حلّل: $30=2\\cdot 3\\cdot 5$، $45=3^{2}\\cdot 5$، $60=2^{2}\\cdot 3\\cdot 5$.'),
        explanation: say('Komunak 3 eta 5: $@GCD(30,45,60)=3\\cdot 5=15$ cm.', 'Comunes el 3 y el 5: $@GCD(30,45,60)=3\\cdot 5=15$ cm.', 'المشتركة 3 و5: $@GCD(30,45,60)=3\\cdot 5=15$ سم.')
    },
    {
        id: 107,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('300 cm × 420 cm-ko gela bat ahalik eta handienak diren lauza karratuekin estali nahi da, bat ere moztu gabe. Zenbat cm izango ditu lauza bakoitzaren aldeak?', 'Una habitación de 300 cm × 420 cm se quiere cubrir con baldosas cuadradas lo más grandes posible, sin cortar ninguna. ¿Cuántos cm medirá el lado de cada baldosa?', 'نريد تغطية غرفة أبعادها 300 سم × 420 سم ببلاط مربع بأكبر حجم ممكن دون قص أي بلاطة. كم سنتيمترًا طول ضلع كل بلاطة؟'),
        expected: fraction(60),
        hint: say('Aldeak bi neurrien zatitzaile komuna izan behar du, ahalik eta handiena.', 'El lado tiene que ser divisor común de las dos medidas, el mayor posible.', 'يجب أن يكون الضلع قاسمًا مشتركًا للبعدين، وأكبر ما يمكن.'),
        explanation: say('$300=2^{2}\\cdot 3\\cdot 5^{2}$ eta $420=2^{2}\\cdot 3\\cdot 5\\cdot 7$: $@GCD(300,420)=2^{2}\\cdot 3\\cdot 5=60$ cm.', '$300=2^{2}\\cdot 3\\cdot 5^{2}$ y $420=2^{2}\\cdot 3\\cdot 5\\cdot 7$: $@GCD(300,420)=2^{2}\\cdot 3\\cdot 5=60$ cm.', '$300=2^{2}\\cdot 3\\cdot 5^{2}$ و$420=2^{2}\\cdot 3\\cdot 5\\cdot 7$: $@GCD(300,420)=2^{2}\\cdot 3\\cdot 5=60$ سم.')
    },
    {
        id: 108,
        stage: 'problems',
        context: 'advanced',
        points: 20,
        prompt: say('A autobusa 10 minutuan behin irteten da eta B autobusa 12 minutuan behin. 9:00etan batera irten dira. Zenbat minutu barru irtengo dira berriro batera?', 'El autobús A sale cada 10 minutos y el B cada 12. A las 9:00 han salido juntos. ¿Dentro de cuántos minutos volverán a salir juntos?', 'تنطلق الحافلة أ كل 10 دقائق والحافلة ب كل 12. انطلقتا معًا في الساعة 9:00. بعد كم دقيقة ستنطلقان معًا مجددًا؟'),
        expected: fraction(60),
        hint: say('Deskonposatu: $10=2\\cdot 5$, $12=2^{2}\\cdot 3$.', 'Descompón: $10=2\\cdot 5$, $12=2^{2}\\cdot 3$.', 'حلّل: $10=2\\cdot 5$، $12=2^{2}\\cdot 3$.'),
        explanation: say('$@LCM(10,12)=2^{2}\\cdot 3\\cdot 5=60$: 60 minutu barru, 10:00etan.', '$@LCM(10,12)=2^{2}\\cdot 3\\cdot 5=60$: dentro de 60 minutos, a las 10:00.', '$@LCM(10,12)=2^{2}\\cdot 3\\cdot 5=60$: بعد 60 دقيقة، في الساعة 10:00.')
    },
    {
        id: 109,
        stage: 'multiples',
        context: 'advanced',
        points: 20,
        prompt: say('Zenbat 3ren multiplo daude 100 eta 130 artean?', '¿Cuántos múltiplos de 3 hay entre 100 y 130?', 'كم مضاعفًا لـ 3 بين 100 و130؟'),
        expected: fraction(10),
        hint: say('Lehena 102 da ($1+0+2=3$). Zein da azkena?', 'El primero es 102 ($1+0+2=3$). ¿Cuál es el último?', 'الأول 102 ($1+0+2=3$). فما الأخير؟'),
        explanation: say('102, 105, 108, 111, 114, 117, 120, 123, 126 eta 129: 10 multiplo ($3\\cdot 34$tik $3\\cdot 43$ra).', '102, 105, 108, 111, 114, 117, 120, 123, 126 y 129: 10 múltiplos (de $3\\cdot 34$ a $3\\cdot 43$).', '102 و105 و108 و111 و114 و117 و120 و123 و126 و129: عشرة مضاعفات (من $3\\cdot 34$ إلى $3\\cdot 43$).')
    },
    {
        id: 110,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Saski batean 50 eta 70 arteko arrautza daude. 2ka, 3ka edo 4ka taldekatzen badira, ez da bat ere soberan geratzen. Zenbat arrautza daude?', 'En una cesta hay entre 50 y 70 huevos. Si se agrupan de 2 en 2, de 3 en 3 o de 4 en 4, no sobra ninguno. ¿Cuántos huevos hay?', 'في سلة ما بين 50 و70 بيضة. إذا جُمعت 2 و2 أو 3 و3 أو 4 و4 لا يبقى شيء. كم بيضة في السلة؟'),
        expected: fraction(60),
        hint: say('Kopurua 2ren, 3ren eta 4ren multiplo komuna da: $@LCM(2,3,4)$ren multiploa.', 'La cantidad es múltiplo común de 2, 3 y 4: múltiplo del $@LCM(2,3,4)$.', 'العدد مضاعف مشترك لـ 2 و3 و4: أي مضاعف لـ $@LCM(2,3,4)$.'),
        explanation: say('$@LCM(2,3,4)=12$. 12ren multiploak: 48, 60, 72… 50 eta 70 artean 60 bakarrik dago.', '$@LCM(2,3,4)=12$. Múltiplos de 12: 48, 60, 72… Entre 50 y 70 solo está el 60.', '$@LCM(2,3,4)=12$. مضاعفات 12: ‏48، 60، 72… وبين 50 و70 يوجد 60 فقط.')
    },
    {
        id: 111,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Lorak 100 bola baino gutxiago ditu. 4ka, 6ka edo 9ka taldekatzen baditu, ez zaio bat ere soberan geratzen. Gehienez zenbat bola ditu?', 'Lora tiene menos de 100 canicas. Si las agrupa de 4 en 4, de 6 en 6 o de 9 en 9, no le sobra ninguna. ¿Cuántas canicas tiene como máximo?', 'لدى لورا أقل من 100 كرة زجاجية. إذا جمعتها 4 و4 أو 6 و6 أو 9 و9 لا يبقى شيء. ما أكبر عدد ممكن من الكرات لديها؟'),
        expected: fraction(72),
        hint: say('Kalkulatu $@LCM(4,6,9)$ eta haren multiploak.', 'Calcula el $@LCM(4,6,9)$ y sus múltiplos.', 'احسب $@LCM(4,6,9)$ ومضاعفاته.'),
        explanation: say('$@LCM(4,6,9)=2^{2}\\cdot 3^{2}=36$. Multiploak: 36, 72, 108… 100 baino txikiena den handiena 72 da.', '$@LCM(4,6,9)=2^{2}\\cdot 3^{2}=36$. Múltiplos: 36, 72, 108… El mayor menor que 100 es 72.', '$@LCM(4,6,9)=2^{2}\\cdot 3^{2}=36$. المضاعفات: 36، 72، 108… وأكبرها الأصغر من 100 هو 72.')
    },
    {
        id: 112,
        stage: 'problems',
        context: 'master',
        points: 30,
        prompt: say('Talde batean 30 eta 40 arteko ikasle daude. 2ka, 3ka edo 4ka jartzen badira, beti ikasle bat soberan geratzen da. Zenbat ikasle daude?', 'En un grupo hay entre 30 y 40 alumnos. Si se ponen de 2 en 2, de 3 en 3 o de 4 en 4, siempre sobra uno. ¿Cuántos alumnos hay?', 'في مجموعة ما بين 30 و40 تلميذًا. إذا وُضعوا 2 و2 أو 3 و3 أو 4 و4 يبقى دائمًا تلميذ واحد. كم تلميذًا في المجموعة؟'),
        expected: fraction(37),
        hint: say('Bat kenduz gero, taldeak zehatzak dira: kopurua − 1 $@LCM(2,3,4)$ren multiploa da.', 'Si quitas uno, los grupos salen exactos: la cantidad − 1 es múltiplo del $@LCM(2,3,4)$.', 'إذا أزلت تلميذًا تصبح المجموعات تامة: العدد − 1 مضاعف لـ $@LCM(2,3,4)$.'),
        explanation: say('$@LCM(2,3,4)=12$. 12ren multiploak: 24, 36, 48… $36+1=37$ dago 30 eta 40 artean.', '$@LCM(2,3,4)=12$. Múltiplos de 12: 24, 36, 48… $36+1=37$ está entre 30 y 40.', '$@LCM(2,3,4)=12$. مضاعفات 12: ‏24، 36، 48… و$36+1=37$ يقع بين 30 و40.')
    }
]

export const divisibilityIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'multiples',
        title: say('Multiploak eta zatitzaileak', 'Múltiplos y divisores', 'المضاعفات والقواسم'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi 36 baino txikiagoak diren 3ren multiploak.', 'Escribe los múltiplos de 3 menores que 36.', 'اكتب مضاعفات 3 الأصغر من 36.'), solution: same('$3,\\ 6,\\ 9,\\ 12,\\ 15,\\ 18,\\ 21,\\ 24,\\ 27,\\ 30,\\ 33$') },
            { id: 2, difficulty: 'easy', question: say('Osatu hitz egokiarekin (multiploa edo zatitzailea): a) 25 … da 5ena; b) 11 … da 33rena; c) 100 … da 25ena; d) 7 … da 63rena.', 'Completa con la palabra adecuada (múltiplo o divisor): a) 25 es … de 5; b) 11 es … de 33; c) 100 es … de 25; d) 7 es … de 63.', 'أكمل بالكلمة المناسبة (مضاعف أو قاسم): أ) 25 … لـ 5؛ ب) 11 … لـ 33؛ ج) 100 … لـ 25؛ د) 7 … لـ 63.'), solution: say('a) multiploa; b) zatitzailea; c) multiploa; d) zatitzailea.', 'a) múltiplo; b) divisor; c) múltiplo; d) divisor.', 'أ) مضاعف؛ ب) قاسم؛ ج) مضاعف؛ د) قاسم.') },
            { id: 3, difficulty: 'easy', question: say('Aurkitu zatitzaile guztiak: a) 16; b) 15; c) 22.', 'Halla todos los divisores de: a) 16; b) 15; c) 22.', 'أوجد كل قواسم: أ) 16؛ ب) 15؛ ج) 22.'), solution: same('a) $\\{1,2,4,8,16\\}$; b) $\\{1,3,5,15\\}$; c) $\\{1,2,11,22\\}$') },
            { id: 4, difficulty: 'medium', question: say('Egia ala gezurra, eta arrazoitu: 15 a) 5en multiploa da; b) 10en zatitzailea da; c) 45en zatitzailea da.', 'Verdadero o falso, razonando: 15 es a) múltiplo de 5; b) divisor de 10; c) divisor de 45.', 'صواب أم خطأ مع التعليل: العدد 15 أ) مضاعف لـ 5؛ ب) قاسم لـ 10؛ ج) قاسم لـ 45.'), solution: say('a) Egia: $15=5\\cdot 3$. b) Gezurra: 15 10 baino handiagoa da. c) Egia: $45=15\\cdot 3$.', 'a) Verdadero: $15=5\\cdot 3$. b) Falso: 15 es mayor que 10. c) Verdadero: $45=15\\cdot 3$.', 'أ) صواب: $15=5\\cdot 3$. ب) خطأ: 15 أكبر من 10. ج) صواب: $45=15\\cdot 3$.') },
            { id: 5, difficulty: 'medium', question: say('María-k 12 litroko garrafa bateko ura litro kopuru bereko ontzietan banatu nahi du. Zenbat ontzi-mota desberdin erabil ditzake (litro osoak)?', 'María quiere repartir el agua de una garrafa de 12 litros en envases con el mismo número de litros. ¿Cuántas capacidades distintas (en litros enteros) puede usar?', 'تريد ماريا توزيع ماء قارورة سعتها 12 لترًا على أوعية متساوية. كم سعة مختلفة (بلترات كاملة) يمكنها استعمالها؟'), solution: say('$@DIV(12)=\\{1,2,3,4,6,12\\}$: 6 edukiera (adibidez, 3 litroko 4 ontzi).', '$@DIV(12)=\\{1,2,3,4,6,12\\}$: 6 capacidades (por ejemplo, 4 envases de 3 litros).', '$@DIV(12)=\\{1,2,3,4,6,12\\}$: ست سعات (مثلًا 4 أوعية من 3 لترات).'), answer: { expected: fraction(6) } },
            { id: 6, difficulty: 'hard', question: say('Zein da 1.000 baino txikiagoa den 8ren multiplorik handiena?', '¿Cuál es el mayor múltiplo de 8 menor que 1.000?', 'ما أكبر مضاعف لـ 8 أصغر من 1.000؟'), solution: say('$1000\\mathbin{:}8=125$ zehatza da, eta 1.000 ez da sartzen. Aurrekoa: $8\\cdot 124=992$.', '$1000\\mathbin{:}8=125$ es exacta, y 1.000 no vale. El anterior: $8\\cdot 124=992$.', '$1000\\mathbin{:}8=125$ قسمة تامة، و1.000 لا يُحسب. السابق: $8\\cdot 124=992$.'), answer: { expected: fraction(992) } }
        ]
    },
    {
        id: 'criteria',
        title: say('Zatigarritasun irizpideak', 'Criterios de divisibilidad', 'قواعد قابلية القسمة'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Esan zenbaki bakoitza 2rekin, 3rekin, 5ekin eta 10ekin zatigarria den: 18, 35, 40, 84, 150.', 'Indica si cada número es divisible por 2, 3, 5 y 10: 18, 35, 40, 84, 150.', 'بيّن هل يقبل كل عدد القسمة على 2 و3 و5 و10: ‏18، 35، 40، 84، 150.'), solution: say('18: 2, 3. 35: 5. 40: 2, 5, 10. 84: 2, 3. 150: 2, 3, 5, 10.', '18: 2, 3. 35: 5. 40: 2, 5, 10. 84: 2, 3. 150: 2, 3, 5, 10.', '18: ‏2، 3. ‏35: ‏5. ‏40: ‏2، 5، 10. ‏84: ‏2، 3. ‏150: ‏2، 3، 5، 10.') },
            { id: 8, difficulty: 'easy', question: say('230, 496, 520, 2.100, 2.745 eta 455 zenbakietatik, zein dira 5en multiploak?', 'De los números 230, 496, 520, 2.100, 2.745 y 455, ¿cuáles son múltiplos de 5?', 'من الأعداد 230، 496، 520، 2.100، 2.745، 455، أيها مضاعف لـ 5؟'), solution: say('230, 520, 2.100, 2.745 eta 455 (0z edo 5ez amaitzen dira).', '230, 520, 2.100, 2.745 y 455 (acaban en 0 o en 5).', '230 و520 و2.100 و2.745 و455 (تنتهي بـ 0 أو 5).') },
            { id: 9, difficulty: 'medium', question: say('Esan zein diren 3ren eta 9ren multiploak: 173, 510, 576, 774, 1.023.', 'Indica cuáles son múltiplos de 3 y cuáles de 9: 173, 510, 576, 774, 1.023.', 'بيّن أيها مضاعف لـ 3 وأيها لـ 9: ‏173، 510، 576، 774، 1.023.'), solution: say('3ren multiploak: 510, 576, 774, 1.023. 9renak: 576 ($5+7+6=18$) eta 774 ($7+7+4=18$). 173: batura 11.', 'Múltiplos de 3: 510, 576, 774, 1.023. De 9: 576 ($5+7+6=18$) y 774 ($7+7+4=18$). 173: suma 11.', 'مضاعفات 3: ‏510، 576، 774، 1.023. ومضاعفات 9: ‏576 ($5+7+6=18$) و774 ($7+7+4=18$). ‏173: المجموع 11.') },
            { id: 10, difficulty: 'medium', question: say('Osatu zifra, adierazitako irizpidea bete dadin: a) $1{.}4\\square 0$ 3rekin; b) $8{.}8\\square 5$ 5ekin; c) $9\\square 6$ 9rekin.', 'Completa la cifra para que se cumpla el criterio: a) $1{.}4\\square 0$ por 3; b) $8{.}8\\square 5$ por 5; c) $9\\square 6$ por 9.', 'أكمل الرقم لتتحقق القاعدة: أ) $1{.}4\\square 0$ على 3؛ ب) $8{.}8\\square 5$ على 5؛ ج) $9\\square 6$ على 9.'), solution: say('a) 1, 4 edo 7 ($1+4+1=6$). b) edozein zifra: 5ez amaitzen da. c) 3 ($9+3+6=18$).', 'a) 1, 4 o 7 ($1+4+1=6$). b) cualquier cifra: acaba en 5. c) 3 ($9+3+6=18$).', 'أ) 1 أو 4 أو 7 ($1+4+1=6$). ب) أي رقم: فهو ينتهي بـ 5. ج) 3 ($9+3+6=18$).') },
            { id: 11, difficulty: 'medium', question: say('108, 123, 162, 215, 328 eta 370 zenbakietatik, zein dira 2ren eta 3ren multiploak aldi berean? 6ren multiploak al dira?', 'De 108, 123, 162, 215, 328 y 370, ¿cuáles son a la vez múltiplos de 2 y de 3? ¿Son múltiplos de 6?', 'من 108، 123، 162، 215، 328، 370، أيها مضاعف لـ 2 و3 معًا؟ وهل هي مضاعفات لـ 6؟'), solution: say('108 eta 162. Bai: $108=6\\cdot 18$ eta $162=6\\cdot 27$.', '108 y 162. Sí: $108=6\\cdot 18$ y $162=6\\cdot 27$.', '108 و162. نعم: $108=6\\cdot 18$ و$162=6\\cdot 27$.') },
            { id: 12, difficulty: 'hard', question: say('Zenbat zifra desberdin jar daitezke $43\\square 79$ zenbakian 3rekin zatigarria izan dadin?', '¿Cuántas cifras distintas se pueden poner en $43\\square 79$ para que sea divisible por 3?', 'كم رقمًا مختلفًا يمكن وضعه في $43\\square 79$ ليقبل القسمة على 3؟'), solution: say('$4+3+7+9=23$. 24, 27 edo 30 lortzeko: 1, 4 edo 7. Hiru zifra.', '$4+3+7+9=23$. Para llegar a 24, 27 o 30: 1, 4 o 7. Tres cifras.', '$4+3+7+9=23$. للوصول إلى 24 أو 27 أو 30: ‏1 أو 4 أو 7. ثلاثة أرقام.'), answer: { expected: fraction(3) } }
        ]
    },
    {
        id: 'primes',
        title: say('Lehenak eta deskonposizioa', 'Primos y descomposición', 'الأعداد الأولية والتحليل'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Sailkatu lehenetan eta konposatuetan: 6, 15, 7, 24, 13, 2, 20, 11, 10.', 'Clasifica en primos y compuestos: 6, 15, 7, 24, 13, 2, 20, 11, 10.', 'صنّف إلى أولية ومؤلفة: ‏6، 15، 7، 24، 13، 2، 20، 11، 10.'), solution: say('Lehenak: 2, 7, 11, 13. Konposatuak: 6, 10, 15, 20, 24.', 'Primos: 2, 7, 11, 13. Compuestos: 6, 10, 15, 20, 24.', 'الأولية: 2، 7، 11، 13. المؤلفة: 6، 10، 15، 20، 24.') },
            { id: 14, difficulty: 'easy', question: say('Deskonposatu biderkagai lehenetan: a) 50; b) 60; c) 45.', 'Descompón en factores primos: a) 50; b) 60; c) 45.', 'حلّل إلى عوامل أولية: أ) 50؛ ب) 60؛ ج) 45.'), solution: same('a) $50=2\\cdot 5^{2}$; b) $60=2^{2}\\cdot 3\\cdot 5$; c) $45=3^{2}\\cdot 5$') },
            { id: 15, difficulty: 'medium', question: say('Futbol talde batek 11 jokalari ditu. a) Zenbat modutan egin daitezke talde berdinak? b) Beste jokalari bat batzen bada?', 'Un equipo de fútbol tiene 11 jugadores. a) ¿De cuántas maneras pueden formar grupos iguales? b) ¿Y si se une otro jugador?', 'فريق كرة قدم فيه 11 لاعبًا. أ) بكم طريقة يمكن تكوين مجموعات متساوية؟ ب) وإذا انضم لاعب آخر؟'), solution: say('a) Bi modu (1eko 11 talde edo 11ko talde bat): 11 lehena da. b) 12 konposatua da: $@DIV(12)=\\{1,2,3,4,6,12\\}$, 6 modu.', 'a) Dos maneras (11 grupos de 1 o un grupo de 11): 11 es primo. b) 12 es compuesto: $@DIV(12)=\\{1,2,3,4,6,12\\}$, 6 maneras.', 'أ) طريقتان (11 مجموعة من 1 أو مجموعة من 11): العدد 11 أولي. ب) العدد 12 مؤلف: $@DIV(12)=\\{1,2,3,4,6,12\\}$، ست طرق.') },
            { id: 16, difficulty: 'medium', question: say('Aurkitu zatitzaile guztiak taularekin: a) $18=2\\cdot 3^{2}$; b) $20=2^{2}\\cdot 5$.', 'Halla todos los divisores con la tabla: a) $18=2\\cdot 3^{2}$; b) $20=2^{2}\\cdot 5$.', 'أوجد كل القواسم بالجدول: أ) $18=2\\cdot 3^{2}$؛ ب) $20=2^{2}\\cdot 5$.'), solution: same('a) $@DIV(18)=\\{1,2,3,6,9,18\\}$; b) $@DIV(20)=\\{1,2,4,5,10,20\\}$') },
            { id: 17, difficulty: 'medium', question: say('Zein zenbaki da $2^{3}\\cdot 3^{2}$?', '¿Qué número es $2^{3}\\cdot 3^{2}$?', 'ما العدد $2^{3}\\cdot 3^{2}$؟'), solution: same('$8\\cdot 9=72$'), answer: { expected: fraction(72) } },
            { id: 18, difficulty: 'hard', question: say('$100=2^{2}\\cdot 5^{2}$. Zenbat zatitzaile ditu 100ek?', '$100=2^{2}\\cdot 5^{2}$. ¿Cuántos divisores tiene 100?', '$100=2^{2}\\cdot 5^{2}$. كم قاسمًا للعدد 100؟'), solution: say('Taulak 3 zutabe eta 3 errenkada ditu: $3\\cdot 3=9$. $@DIV(100)=\\{1,2,4,5,10,20,25,50,100\\}$.', 'La tabla tiene 3 columnas y 3 filas: $3\\cdot 3=9$. $@DIV(100)=\\{1,2,4,5,10,20,25,50,100\\}$.', 'للجدول 3 أعمدة و3 صفوف: $3\\cdot 3=9$. $@DIV(100)=\\{1,2,4,5,10,20,25,50,100\\}$.'), answer: { expected: fraction(9) } }
        ]
    },
    {
        id: 'gcd-lcm',
        title: say('ZKH eta MKT', 'm.c.d. y m.c.m.', 'ق.م.أ و م.م.أ'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Aurkitu zatitzaile komunak: a) 9 eta 12; b) 15 eta 20.', 'Halla los divisores comunes de: a) 9 y 12; b) 15 y 20.', 'أوجد القواسم المشتركة: أ) 9 و12؛ ب) 15 و20.'), solution: same('a) $\\{1,3\\}$, $@GCD(9,12)=3$; b) $\\{1,5\\}$, $@GCD(15,20)=5$') },
            { id: 20, difficulty: 'easy', question: say('Idatzi 4ren eta 6ren lehen bost multiplo komunak.', 'Escribe los cinco primeros múltiplos comunes de 4 y 6.', 'اكتب أول خمسة مضاعفات مشتركة لـ 4 و6.'), solution: say('12, 24, 36, 48, 60. Txikiena: $@LCM(4,6)=12$.', '12, 24, 36, 48, 60. El menor: $@LCM(4,6)=12$.', '12، 24، 36، 48، 60. أصغرها: $@LCM(4,6)=12$.') },
            { id: 21, difficulty: 'medium', question: calculate('$@GCD(24,36)$'), solution: same('$24=2^{3}\\cdot 3,\\ 36=2^{2}\\cdot 3^{2}\\ \\Rightarrow\\ @GCD(24,36)=2^{2}\\cdot 3=12$'), answer: { expected: fraction(12) } },
            { id: 22, difficulty: 'medium', question: calculate('$@LCM(24,36)$'), solution: same('$24=2^{3}\\cdot 3,\\ 36=2^{2}\\cdot 3^{2}\\ \\Rightarrow\\ @LCM(24,36)=2^{3}\\cdot 3^{2}=72$'), answer: { expected: fraction(72) } },
            { id: 23, difficulty: 'medium', question: say('Kalkulatu ZKH eta MKT: a) 9 eta 10; b) 14 eta 42.', 'Calcula el m.c.d. y el m.c.m.: a) 9 y 10; b) 14 y 42.', 'احسب ق.م.أ وم.م.أ: أ) 9 و10؛ ب) 14 و42.'), solution: same('a) $@GCD(9,10)=1$, $@LCM(9,10)=90$; b) $@GCD(14,42)=14$, $@LCM(14,42)=42$') },
            { id: 24, difficulty: 'hard', question: say('Kalkulatu ZKH eta MKT: 28 eta 35.', 'Calcula el m.c.d. y el m.c.m. de 28 y 35.', 'احسب ق.م.أ وم.م.أ للعددين 28 و35.'), solution: same('$28=2^{2}\\cdot 7,\\ 35=5\\cdot 7$: $@GCD(28,35)=7$, $@LCM(28,35)=2^{2}\\cdot 5\\cdot 7=140$') }
        ]
    },
    {
        id: 'problems',
        title: say('Buruketak', 'Problemas', 'المسائل'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Jonek 12 lokomotora ditu eta Peiok 18 hegazkin. Talde berdinak egin nahi dituzte, ahalik eta handienak. Zenbat jostailu izango ditu talde bakoitzak?', 'Juan tiene 12 locomotoras y Pedro 18 aviones. Quieren hacer grupos iguales, lo más grandes posible. ¿Cuántos juguetes tendrá cada grupo?', 'لدى خوان 12 قاطرة ولدى بيدرو 18 طائرة. يريدان تكوين مجموعات متساوية بأكبر حجم ممكن. كم لعبة في كل مجموعة؟'), solution: say('$@GCD(12,18)=6$: 6 jostailuko taldeak.', '$@GCD(12,18)=6$: grupos de 6 juguetes.', '$@GCD(12,18)=6$: مجموعات من 6 ألعاب.'), answer: { expected: fraction(6) } },
            { id: 26, difficulty: 'easy', question: say('Ana 2 egunean behin joaten da igerilekura eta Eva 3 egunean behin. Hilaren 1ean biak joan ziren. Zein egunetan egingo dute bat berriro?', 'Ana va a la piscina cada 2 días y Eva cada 3. El día 1 fueron las dos. ¿Qué día volverán a coincidir?', 'تذهب آنا إلى المسبح كل يومين وإيفا كل 3 أيام. ذهبتا معًا في اليوم 1. في أي يوم ستلتقيان مجددًا؟'), solution: say('$@LCM(2,3)=6$: 6 egun geroago, hilaren 7an.', '$@LCM(2,3)=6$: 6 días después, el día 7.', '$@LCM(2,3)=6$: بعد 6 أيام، في اليوم 7.'), answer: { expected: fraction(7) } },
            { id: 27, difficulty: 'medium', question: say('Hiru itsasontzi portutik irteten dira: bata 4 egunean behin, bestea 5ean behin eta hirugarrena 7an behin. Gaur batera irten badira, zenbat egun barru egingo dute bat berriro?', 'Un barco sale del puerto cada 4 días, otro cada 5 y un tercero cada 7. Si hoy han salido juntos, ¿dentro de cuántos días vuelven a coincidir?', 'تغادر سفينة الميناء كل 4 أيام وأخرى كل 5 وثالثة كل 7. إذا غادرت معًا اليوم، فبعد كم يومًا تلتقي مجددًا؟'), solution: same('$@LCM(4,5,7)=2^{2}\\cdot 5\\cdot 7=140$'), answer: { expected: fraction(140) } },
            { id: 28, difficulty: 'medium', question: say('Liburu-denda batek 36 ipuin eta 48 komiki ditu. Apal berdinetan jarri nahi ditu, mota bakoitza bere apalean eta apal bakoitzean ahalik eta liburu gehien. Zenbat liburu apal bakoitzean? Zenbat apal guztira?', 'Una librería tiene 36 cuentos y 48 cómics. Quiere colocarlos en estantes iguales, cada tipo en su estante y con el mayor número de libros posible. ¿Cuántos libros por estante? ¿Cuántos estantes en total?', 'لدى مكتبة 36 قصة و48 مجلة مصورة. تريد وضعها على رفوف متساوية، كل نوع على رفه، وبأكبر عدد ممكن. كم كتابًا في كل رف؟ وكم رفًا في المجموع؟'), solution: say('$@GCD(36,48)=12$: 12 liburu apal bakoitzean; $3+4=7$ apal.', '$@GCD(36,48)=12$: 12 libros por estante; $3+4=7$ estantes.', '$@GCD(36,48)=12$: ‏12 كتابًا في كل رف؛ $3+4=7$ رفوف.') },
            { id: 29, difficulty: 'hard', question: say('Bi kanpai batera jo dute. Bata 15 minutuan behin jotzen du eta bestea 20an behin. Zenbat minutu barru joko dute berriro batera?', 'Dos campanas han sonado juntas. Una suena cada 15 minutos y otra cada 20. ¿Dentro de cuántos minutos volverán a sonar juntas?', 'دقّ جرسان معًا. الأول يدق كل 15 دقيقة والثاني كل 20. بعد كم دقيقة سيدقان معًا مجددًا؟'), solution: same('$15=3\\cdot 5,\\ 20=2^{2}\\cdot 5\\ \\Rightarrow\\ @LCM(15,20)=2^{2}\\cdot 3\\cdot 5=60$'), answer: { expected: fraction(60) } },
            { id: 30, difficulty: 'hard', question: say('Lorezain batek 45 tulipa gorri eta 60 hori ditu. Ilara berdinetan landatu nahi ditu, kolore bakarrekoak eta ahalik eta luzeenak. Zenbat tulipa ilara bakoitzean?', 'Un jardinero tiene 45 tulipanes rojos y 60 amarillos. Quiere plantarlos en filas iguales, de un solo color y lo más largas posible. ¿Cuántos tulipanes por fila?', 'لدى بستاني 45 زنبقة حمراء و60 صفراء. يريد زراعتها في صفوف متساوية بلون واحد وبأطول ما يمكن. كم زنبقة في كل صف؟'), solution: same('$45=3^{2}\\cdot 5,\\ 60=2^{2}\\cdot 3\\cdot 5\\ \\Rightarrow\\ @GCD(45,60)=3\\cdot 5=15$'), answer: { expected: fraction(15) } }
        ]
    }
]
