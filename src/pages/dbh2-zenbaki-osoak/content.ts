import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoak · 2. DBH — diagnostic, guided practice, exercise bank and
   challenges. Notation follows the lessons: Aur(−5) / Op(−5) for the opposite,
   shorthand without brackets, square brackets and ':' for division.
   ========================================================================== */

const same = (value: string) => ({ eu: value, es: value, ar: value })

export const integerDiagnostic: DiagnosticQuestion[] = [
    {
        id: 701,
        prompt: { eu: 'Urpekari bat itsas mailatik 12 m behera dago. Zein zenbakik adierazten du?', es: 'Un buzo está 12 m por debajo del nivel del mar. ¿Qué número lo representa?', ar: 'غوّاص على عمق 12 م تحت سطح البحر. أي عدد يمثّل موقعه؟' },
        options: [same('+12'), same('−12'), same('12')],
        correctIndex: 1,
        explanation: { eu: 'Zerotik (itsas mailatik) behera dago; beraz, zeinu negatiboa: −12.', es: 'Está por debajo del cero (el nivel del mar); por tanto, signo negativo: −12.', ar: 'إنه تحت الصفر (سطح البحر)، لذلك الإشارة سالبة: ⁦−12⁩.' },
        topic: 'negatives'
    },
    {
        id: 702,
        prompt: { eu: 'Zenbat da $\\lvert -9\\rvert$?', es: '¿Cuánto es $\\lvert -9\\rvert$?', ar: 'كم تساوي $\\lvert -9\\rvert$؟' },
        options: [same('−9'), same('0'), same('9')],
        correctIndex: 2,
        explanation: { eu: 'Balio absolutua zerora dagoen distantzia da: 9. Distantzia bat ez da inoiz negatiboa.', es: 'El valor absoluto es la distancia al cero: 9. Una distancia nunca es negativa.', ar: 'القيمة المطلقة هي المسافة إلى الصفر: 9. والمسافة لا تكون سالبة أبدًا.' },
        topic: 'absolute'
    },
    {
        id: 703,
        prompt: { eu: 'Zein da $\\mathrm{Aur}(-7)$?', es: '¿Cuánto es $\\mathrm{Op}(-7)$, el opuesto de −7?', ar: 'ما معاكس ⁦−7⁩؟' },
        options: [same('+7'), same('−7'), same('0')],
        correctIndex: 0,
        explanation: { eu: 'Aurkakoa lortzeko zeinua aldatzen da: $\\mathrm{Aur}(-7)=+7$.', es: 'Para obtener el opuesto se cambia el signo: $\\mathrm{Op}(-7)=+7$.', ar: 'للحصول على المعاكس نغيّر الإشارة: معاكس ⁦−7⁩ هو ⁦+7⁩.' },
        topic: 'opposite'
    },
    {
        id: 704,
        prompt: { eu: 'Zein da handiena?', es: '¿Cuál es el mayor?', ar: 'أي عدد هو الأكبر؟' },
        options: [same('−8'), same('−3'), same('−5')],
        correctIndex: 1,
        explanation: { eu: 'Bi negatiboen artean, zerotik hurbilen dagoena da handiena: −3.', es: 'Entre negativos, el más cercano a cero es el mayor: −3.', ar: 'بين الأعداد السالبة، الأقرب إلى الصفر هو الأكبر: ⁦−3⁩.' },
        topic: 'compare'
    },
    {
        id: 705,
        prompt: { eu: 'Zenbat da $-6+10-7$?', es: '¿Cuánto es $-6+10-7$?', ar: 'كم يساوي $-6+10-7$؟' },
        options: [same('−3'), same('+3'), same('−23')],
        correctIndex: 0,
        explanation: { eu: 'Positiboak: 10. Negatiboak: 6 + 7 = 13. Beraz, 10 − 13 = −3.', es: 'Positivos: 10. Negativos: 6 + 7 = 13. Por tanto, 10 − 13 = −3.', ar: 'الموجبة: 10. السالبة: 6 + 7 = 13. إذن 10 − 13 = ⁦−3⁩.' },
        topic: 'shorthand'
    },
    {
        id: 706,
        prompt: { eu: 'Zenbat da $(-5)-(-9)$?', es: '¿Cuánto es $(-5)-(-9)$?', ar: 'كم يساوي $(-5)-(-9)$؟' },
        options: [same('−14'), same('−4'), same('+4')],
        correctIndex: 2,
        explanation: { eu: 'Kentzea aurkakoa batzea da: $(-5)+(+9)=+4$.', es: 'Restar es sumar el opuesto: $(-5)+(+9)=+4$.', ar: 'الطرح هو جمع المعاكس: $(-5)+(+9)=+4$.' },
        topic: 'subtract'
    },
    {
        id: 707,
        prompt: { eu: 'Zenbat da $(-24)\\mathbin{:}(+6)$?', es: '¿Cuánto es $(-24)\\mathbin{:}(+6)$?', ar: 'كم يساوي $(-24)\\mathbin{:}(+6)$؟' },
        options: [same('+4'), same('−4'), same('−18')],
        correctIndex: 1,
        explanation: { eu: '24 : 6 = 4, eta zeinu desberdinak direnez emaitza negatiboa da: −4.', es: '24 : 6 = 4 y, como los signos son distintos, el resultado es negativo: −4.', ar: '24 : 6 = 4، ولأن الإشارتين مختلفتان فالناتج سالب: ⁦−4⁩.' },
        topic: 'multiply-divide'
    },
    {
        id: 708,
        prompt: { eu: 'Zenbat da $-3+4\\cdot(-2)$?', es: '¿Cuánto es $-3+4\\cdot(-2)$?', ar: 'كم يساوي $-3+4\\cdot(-2)$؟' },
        options: [same('−2'), same('+5'), same('−11')],
        correctIndex: 2,
        explanation: { eu: 'Lehenik biderketa: $4\\cdot(-2)=-8$. Gero $-3-8=-11$.', es: 'Primero el producto: $4\\cdot(-2)=-8$. Después $-3-8=-11$.', ar: 'الضرب أولًا: $4\\cdot(-2)=-8$، ثم $-3-8=-11$.' },
        topic: 'combined'
    }
]

export const integerPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'integers',
        prompt: { eu: 'Igogailua 3. sotoan dago (lurretik behera). Idatzi solairua zenbaki oso gisa.', es: 'El ascensor está en el sótano 3 (bajo el suelo). Escribe la planta como número entero.', ar: 'المصعد في الطابق الثالث تحت الأرض. اكتب الطابق عددًا صحيحًا.' },
        expected: fraction(-3),
        hint: { eu: 'Behe solairua 0 da. Behera doazen solairuak negatiboak dira.', es: 'La planta baja es el 0. Las plantas hacia abajo son negativas.', ar: 'الطابق الأرضي هو 0، والطوابق تحته سالبة.' },
        explanation: { eu: 'Zerotik hiru solairu behera: −3.', es: 'Tres plantas por debajo del cero: −3.', ar: 'ثلاثة طوابق تحت الصفر: ⁦−3⁩.' }
    },
    {
        id: 2,
        stage: 'integers',
        prompt: { eu: 'Zein zenbaki oso dago zenbakizko zuzenean 2ren ezkerrera 5 unitatera?', es: '¿Qué número entero está en la recta 5 unidades a la izquierda del 2?', ar: 'ما العدد الصحيح الواقع على الخط على بعد 5 وحدات يسار العدد 2؟' },
        expected: fraction(-3),
        hint: { eu: 'Ezkerrera mugitzea kentzea da: $2-5$.', es: 'Moverse a la izquierda es restar: $2-5$.', ar: 'التحرك يسارًا يعني الطرح: $2-5$.' },
        explanation: { eu: '2tik 0ra 2 urrats dira; beste 3 urrats ezkerrera: −3.', es: 'Del 2 al 0 hay 2 pasos; 3 pasos más a la izquierda: −3.', ar: 'من 2 إلى 0 خطوتان، ثم 3 خطوات أخرى يسارًا: ⁦−3⁩.' }
    },
    {
        id: 3,
        stage: 'integers',
        prompt: { eu: 'Zenbat zenbaki oso daude −4 eta +3 artean (muturrak kontatu gabe)?', es: '¿Cuántos números enteros hay entre −4 y +3 (sin contar los extremos)?', ar: 'كم عددًا صحيحًا يوجد بين ⁦−4⁩ و⁦+3⁩ (دون حساب الطرفين)؟' },
        expected: fraction(6),
        hint: { eu: 'Idatzi guztiak: −3, −2, … Ez ahaztu zeroa.', es: 'Escríbelos todos: −3, −2, … No olvides el cero.', ar: 'اكتبها كلها: ⁦−3⁩، ⁦−2⁩، … ولا تنسَ الصفر.' },
        explanation: { eu: '−3, −2, −1, 0, +1, +2: sei zenbaki.', es: '−3, −2, −1, 0, +1, +2: seis números.', ar: '⁦−3⁩، ⁦−2⁩، ⁦−1⁩، 0، ⁦+1⁩، ⁦+2⁩: ستة أعداد.' }
    },
    {
        id: 4,
        stage: 'absolute',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$\\lvert -15\\rvert +\\lvert +6\\rvert$',
        expected: fraction(21),
        hint: { eu: 'Lehenik balio absolutuak: zeinurik gabeko zenbakiak.', es: 'Primero los valores absolutos: los números sin signo.', ar: 'احسب أولًا القيمتين المطلقتين: العددان دون إشارة.' },
        explanation: { eu: '$15+6=21$.', es: '$15+6=21$.', ar: '$15+6=21$.' }
    },
    {
        id: 5,
        stage: 'absolute',
        prompt: { eu: 'Kalkulatu: $\\mathrm{Aur}(+11)$.', es: 'Calcula: $\\mathrm{Op}(+11)$.', ar: 'احسب معاكس ⁦+11⁩.' },
        expected: fraction(-11),
        hint: { eu: 'Aurkakoa = zeinua aldatu.', es: 'Opuesto = cambiar el signo.', ar: 'المعاكس = تغيير الإشارة.' },
        explanation: { eu: '$\\mathrm{Aur}(+11)=-11$: zerotik distantzia berera, beste aldean.', es: '$\\mathrm{Op}(+11)=-11$: a la misma distancia del cero, al otro lado.', ar: 'معاكس ⁦+11⁩ هو ⁦−11⁩: على المسافة نفسها من الصفر في الجهة الأخرى.' }
    },
    {
        id: 6,
        stage: 'absolute',
        prompt: { eu: 'Bi zenbaki aurkako 14 unitatera daude bata bestetik zuzenean. Zein da positiboa?', es: 'Dos números opuestos están a 14 unidades el uno del otro en la recta. ¿Cuál es el positivo?', ar: 'عددان متعاكسان تفصل بينهما 14 وحدة على الخط. ما العدد الموجب؟' },
        expected: fraction(7),
        hint: { eu: 'Biak zerotik distantzia berera daude.', es: 'Los dos están a la misma distancia del cero.', ar: 'كلاهما على المسافة نفسها من الصفر.' },
        explanation: { eu: '$14\\mathbin{:}2=7$; beraz, zenbakiak −7 eta +7 dira.', es: '$14\\mathbin{:}2=7$; los números son −7 y +7.', ar: '$14\\mathbin{:}2=7$؛ فالعددان ⁦−7⁩ و⁦+7⁩.' }
    },
    {
        id: 7,
        stage: 'ordering',
        prompt: { eu: 'Zein da txikiena? Idatzi haren balioa.', es: '¿Cuál es el menor? Escribe su valor.', ar: 'ما العدد الأصغر؟ اكتب قيمته.' },
        expression: '$-6,\\;+2,\\;-9,\\;0,\\;-1$',
        expected: fraction(-9),
        hint: { eu: 'Txikiena ezkerrerago dagoena da: begiratu negatiboei.', es: 'El menor es el que está más a la izquierda: mira los negativos.', ar: 'الأصغر هو الأبعد إلى اليسار: انظر إلى الأعداد السالبة.' },
        explanation: { eu: 'Negatiboen artean, balio absolutu handienekoa da txikiena: −9.', es: 'Entre los negativos, el de mayor valor absoluto es el menor: −9.', ar: 'بين السالبة، صاحب القيمة المطلقة الأكبر هو الأصغر: ⁦−9⁩.' }
    },
    {
        id: 8,
        stage: 'ordering',
        prompt: { eu: 'Ordenatu txikienetik handienera. Zein zenbaki geratzen da erdian?', es: 'Ordena de menor a mayor. ¿Qué número queda en el centro?', ar: 'رتّب تصاعديًا. ما العدد الذي يقع في الوسط؟' },
        expression: '$-3,\\;+5,\\;-7,\\;0,\\;+1$',
        expected: fraction(0),
        hint: { eu: 'Lehenik negatiboak, gero zeroa eta azkenik positiboak.', es: 'Primero los negativos, luego el cero y al final los positivos.', ar: 'السالبة أولًا، ثم الصفر، ثم الموجبة.' },
        explanation: { eu: '$-7<-3<0<+1<+5$: erdian 0 dago.', es: '$-7<-3<0<+1<+5$: en el centro está el 0.', ar: '$-7<-3<0<+1<+5$: في الوسط العدد 0.' }
    },
    {
        id: 9,
        stage: 'ordering',
        prompt: { eu: 'Idatzi zenbaki oso negatibo handiena.', es: 'Escribe el mayor número entero negativo.', ar: 'اكتب أكبر عدد صحيح سالب.' },
        expected: fraction(-1),
        hint: { eu: 'Negatiboetan, handiena zerotik hurbilen dagoena da.', es: 'Entre negativos, el mayor es el más cercano al cero.', ar: 'بين السالبة، الأكبر هو الأقرب إلى الصفر.' },
        explanation: { eu: '−1 da zerotik hurbilen dagoen negatiboa.', es: '−1 es el negativo más cercano al cero.', ar: '⁦−1⁩ هو العدد السالب الأقرب إلى الصفر.' }
    },
    {
        id: 10,
        stage: 'addsub',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$(-8)+(+13)$',
        expected: fraction(5),
        hint: { eu: 'Zeinu desberdinak: kendu balio absolutuak eta jarri handienaren zeinua.', es: 'Signos distintos: resta los valores absolutos y pon el signo del mayor.', ar: 'إشارتان مختلفتان: اطرح القيمتين المطلقتين وضع إشارة الأكبر.' },
        explanation: { eu: '$13-8=5$, eta 13 handiagoa denez, zeinua +: $+5$.', es: '$13-8=5$ y, como manda el 13, el signo es +: $+5$.', ar: '$13-8=5$، والإشارة ‎+ لأن 13 هو الأكبر: $+5$.' }
    },
    {
        id: 11,
        stage: 'addsub',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$(+4)-(+11)$',
        expected: fraction(-7),
        hint: { eu: 'Kentzea aurkakoa batzea da: $(+4)+(-11)$.', es: 'Restar es sumar el opuesto: $(+4)+(-11)$.', ar: 'الطرح هو جمع المعاكس: $(+4)+(-11)$.' },
        explanation: { eu: '$(+4)+(-11)=-7$.', es: '$(+4)+(-11)=-7$.', ar: '$(+4)+(-11)=-7$.' }
    },
    {
        id: 12,
        stage: 'addsub',
        prompt: { eu: 'Idatzi modu laburtuan eta kalkulatu.', es: 'Escribe en forma abreviada y calcula.', ar: 'اكتب بالصيغة المختصرة ثم احسب.' },
        expression: '$(-6)-(-10)+(-3)-(+4)$',
        expected: fraction(-3),
        hint: { eu: 'Zeinu berdinak elkarren ondoan: +. Desberdinak: −.', es: 'Signos iguales juntos: +. Distintos: −.', ar: 'إشارتان متشابهتان متجاورتان: ‎+. مختلفتان: ‎−.' },
        explanation: { eu: '$-6+10-3-4$. Positiboak: 10; negatiboak: 13. $10-13=-3$.', es: '$-6+10-3-4$. Positivos: 10; negativos: 13. $10-13=-3$.', ar: '$-6+10-3-4$. الموجبة: 10؛ السالبة: 13. $10-13=-3$.' }
    },
    {
        id: 13,
        stage: 'addsub',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$12-(5-9)+(-3+1)$',
        expected: fraction(14),
        hint: { eu: 'Egin lehenik parentesi barrukoa: $(5-9)$ eta $(-3+1)$.', es: 'Haz primero lo de dentro de los paréntesis: $(5-9)$ y $(-3+1)$.', ar: 'احسب أولًا ما داخل الأقواس: $(5-9)$ و$(-3+1)$.' },
        explanation: { eu: '$12-(-4)+(-2)=12+4-2=14$.', es: '$12-(-4)+(-2)=12+4-2=14$.', ar: '$12-(-4)+(-2)=12+4-2=14$.' }
    },
    {
        id: 14,
        stage: 'muldiv',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$(-6)\\cdot(-7)$',
        expected: fraction(42),
        hint: { eu: 'Zeinu bera → +.', es: 'Mismo signo → +.', ar: 'الإشارة نفسها ← ‎+.' },
        explanation: { eu: '$6\\cdot7=42$ eta zeinu bera dutenez: $+42$.', es: '$6\\cdot7=42$ y, como tienen el mismo signo: $+42$.', ar: '$6\\cdot7=42$، ولأن لهما الإشارة نفسها: $+42$.' }
    },
    {
        id: 15,
        stage: 'muldiv',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$(-48)\\mathbin{:}(+8)$',
        expected: fraction(-6),
        hint: { eu: 'Zeinu desberdinak → −.', es: 'Signos distintos → −.', ar: 'إشارتان مختلفتان ← ‎−.' },
        explanation: { eu: '$48\\mathbin{:}8=6$ eta zeinu desberdinak: $-6$.', es: '$48\\mathbin{:}8=6$ y signos distintos: $-6$.', ar: '$48\\mathbin{:}8=6$ والإشارتان مختلفتان: $-6$.' }
    },
    {
        id: 16,
        stage: 'muldiv',
        prompt: { eu: 'Kalkulatu.', es: 'Calcula.', ar: 'احسب.' },
        expression: '$(-2)\\cdot(+3)\\cdot(-5)$',
        expected: fraction(30),
        hint: { eu: 'Zenbatu negatiboak: bikoitia bada, emaitza positiboa da.', es: 'Cuenta los negativos: si hay un número par, el resultado es positivo.', ar: 'عدّ العوامل السالبة: إذا كان عددها زوجيًا فالناتج موجب.' },
        explanation: { eu: 'Bi negatibo → +. $2\\cdot3\\cdot5=30$: $+30$.', es: 'Dos negativos → +. $2\\cdot3\\cdot5=30$: $+30$.', ar: 'عاملان سالبان ← ‎+. $2\\cdot3\\cdot5=30$: $+30$.' }
    },
    {
        id: 17,
        stage: 'muldiv',
        prompt: { eu: 'Kalkulatu hierarkia errespetatuz.', es: 'Calcula respetando la jerarquía.', ar: 'احسب مع احترام أولوية العمليات.' },
        expression: '$20-3\\cdot(-4)+(-18)\\mathbin{:}(-6)$',
        expected: fraction(35),
        hint: { eu: 'Lehenik biderketa eta zatiketa, gero batuketak eta kenketak.', es: 'Primero el producto y el cociente; después, sumas y restas.', ar: 'الضرب والقسمة أولًا، ثم الجمع والطرح.' },
        explanation: { eu: '$3\\cdot(-4)=-12$ eta $(-18)\\mathbin{:}(-6)=+3$. $20-(-12)+3=20+12+3=35$.', es: '$3\\cdot(-4)=-12$ y $(-18)\\mathbin{:}(-6)=+3$. $20-(-12)+3=20+12+3=35$.', ar: '$3\\cdot(-4)=-12$ و$(-18)\\mathbin{:}(-6)=+3$. $20-(-12)+3=20+12+3=35$.' }
    },
    {
        id: 18,
        stage: 'muldiv',
        prompt: { eu: 'Kalkulatu hierarkia errespetatuz.', es: 'Calcula respetando la jerarquía.', ar: 'احسب مع احترام أولوية العمليات.' },
        expression: '$(-5)-[(+3)-(-4)]\\cdot(-2)$',
        expected: fraction(9),
        hint: { eu: 'Hasi kako zuzenaren barruan: $(+3)-(-4)$.', es: 'Empieza dentro del corchete: $(+3)-(-4)$.', ar: 'ابدأ داخل القوس المعقوف: $(+3)-(-4)$.' },
        explanation: { eu: '$[\\,+7\\,]\\cdot(-2)=-14$. $(-5)-(-14)=-5+14=9$.', es: '$[\\,+7\\,]\\cdot(-2)=-14$. $(-5)-(-14)=-5+14=9$.', ar: '$[\\,+7\\,]\\cdot(-2)=-14$. $(-5)-(-14)=-5+14=9$.' }
    }
]

export const integerChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'absolute',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Matxinsalto bat zuzeneko −6 puntuan dago eta bere posizioaren aurkakora salto egiten du. Zenbat unitate egin ditu?', es: 'Un saltamontes está en el −6 de la recta y salta al opuesto de su posición. ¿Cuántas unidades ha recorrido?', ar: 'جندب عند ⁦−6⁩ على خط الأعداد، ويقفز إلى معاكس موقعه. كم وحدة قطع؟' },
        expected: fraction(12),
        hint: { eu: '$\\mathrm{Aur}(-6)=+6$. Zenbat dago −6tik +6ra?', es: '$\\mathrm{Op}(-6)=+6$. ¿Cuánto hay de −6 a +6?', ar: 'معاكس ⁦−6⁩ هو ⁦+6⁩. كم المسافة من ⁦−6⁩ إلى ⁦+6⁩؟' },
        explanation: { eu: '6 unitate zerora arte eta beste 6 +6ra arte: 12.', es: '6 unidades hasta el cero y otras 6 hasta el +6: 12.', ar: '6 وحدات حتى الصفر و6 أخرى حتى ⁦+6⁩: المجموع 12.' }
    },
    {
        id: 102,
        stage: 'addsub',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Goizeko 7etan termometroak −5 °C markatzen zuen, eta eguerdian +8 °C. Zenbat gradu igo da tenperatura?', es: 'A las 7:00 el termómetro marcaba −5 °C y a mediodía +8 °C. ¿Cuántos grados ha subido?', ar: 'في السابعة صباحًا كانت الحرارة ⁦−5⁩ °م، وعند الظهر ⁦+8⁩ °م. بكم درجة ارتفعت؟' },
        expected: fraction(13),
        hint: { eu: 'Igoera = amaierakoa − hasierakoa: $(+8)-(-5)$.', es: 'Subida = final − inicial: $(+8)-(-5)$.', ar: 'الارتفاع = النهائية − الابتدائية: $(+8)-(-5)$.' },
        explanation: { eu: '$(+8)-(-5)=8+5=13$ gradu.', es: '$(+8)-(-5)=8+5=13$ grados.', ar: '$(+8)-(-5)=8+5=13$ درجة.' }
    },
    {
        id: 103,
        stage: 'addsub',
        context: 'starter',
        points: 10,
        prompt: { eu: 'Itsaspeko bat −120 m-ra dago eta 45 m igotzen da. Zein sakoneratan dago orain? Idatzi zenbaki oso gisa.', es: 'Un submarino está a −120 m y sube 45 m. ¿A qué profundidad está ahora? Escríbelo como número entero.', ar: 'غوّاصة على عمق ⁦−120⁩ م وتصعد 45 م. أين هي الآن؟ اكتب الجواب عددًا صحيحًا.' },
        expected: fraction(-75),
        hint: { eu: 'Igotzea positibo bat batzea da: $-120+45$.', es: 'Subir es sumar un positivo: $-120+45$.', ar: 'الصعود جمع عدد موجب: $-120+45$.' },
        explanation: { eu: '$-120+45=-75$: oraindik itsas mailatik behera dago.', es: '$-120+45=-75$: sigue por debajo del nivel del mar.', ar: '$-120+45=-75$: ما زالت تحت سطح البحر.' }
    },
    {
        id: 104,
        stage: 'ordering',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Aste bateko tenperatura minimoak: −3, +2, −7, 0, +5, −1, +4 °C. Zenbat gradu dago handienaren eta txikienaren artean?', es: 'Temperaturas mínimas de una semana: −3, +2, −7, 0, +5, −1, +4 °C. ¿Cuántos grados hay entre la mayor y la menor?', ar: 'درجات الحرارة الدنيا في أسبوع: ⁦−3⁩، ⁦+2⁩، ⁦−7⁩، 0، ⁦+5⁩، ⁦−1⁩، ⁦+4⁩ °م. كم درجة بين الأعلى والأدنى؟' },
        expected: fraction(12),
        hint: { eu: 'Aurkitu handiena eta txikiena, eta kendu: handiena − txikiena.', es: 'Busca la mayor y la menor y resta: mayor − menor.', ar: 'جد الأكبر والأصغر واطرح: الأكبر − الأصغر.' },
        explanation: { eu: 'Handiena +5 da eta txikiena −7. $(+5)-(-7)=12$.', es: 'La mayor es +5 y la menor −7. $(+5)-(-7)=12$.', ar: 'الأكبر ⁦+5⁩ والأصغر ⁦−7⁩. $(+5)-(-7)=12$.' }
    },
    {
        id: 105,
        stage: 'addsub',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Igogailu bat 4. solairuan dago. 7 solairu jaisten da, 2 igotzen da eta 3 jaisten da. Zein solairutan dago?', es: 'Un ascensor está en la planta 4. Baja 7 plantas, sube 2 y baja 3. ¿En qué planta está?', ar: 'مصعد في الطابق 4. ينزل 7 طوابق ثم يصعد 2 ثم ينزل 3. في أي طابق هو؟' },
        expected: fraction(-4),
        hint: { eu: 'Idatzi modu laburtuan: $4-7+2-3$.', es: 'Escríbelo en forma abreviada: $4-7+2-3$.', ar: 'اكتبها بالصيغة المختصرة: $4-7+2-3$.' },
        explanation: { eu: 'Positiboak: 6; negatiboak: 10. $6-10=-4$: 4. sotoa.', es: 'Positivos: 6; negativos: 10. $6-10=-4$: el sótano 4.', ar: 'الموجبة: 6؛ السالبة: 10. $6-10=-4$: الطابق الرابع تحت الأرض.' }
    },
    {
        id: 106,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Anek 35 € ditu kontuan eta 18 €-ko 3 ordainagiri ordaintzen ditu. Zenbat diru du orain kontuan?', es: 'Ane tiene 35 € en la cuenta y paga 3 recibos de 18 € cada uno. ¿Qué saldo le queda?', ar: 'في حساب آنا 35 € وتدفع 3 فواتير قيمة كل منها 18 €. كم الرصيد الآن؟' },
        expected: fraction(-19),
        hint: { eu: 'Ordainagiri bakoitza −18 da: $35+3\\cdot(-18)$.', es: 'Cada recibo es −18: $35+3\\cdot(-18)$.', ar: 'كل فاتورة ⁦−18⁩: $35+3\\cdot(-18)$.' },
        explanation: { eu: '$3\\cdot(-18)=-54$ eta $35-54=-19$ €: zorra du.', es: '$3\\cdot(-18)=-54$ y $35-54=-19$ €: está en números rojos.', ar: '$3\\cdot(-18)=-54$ و$35-54=-19$ €: الرصيد سالب (دَين).' }
    },
    {
        id: 107,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Tenperatura 3 °C jaisten da orduro. 18:00etan +7 °C daude. Zein tenperatura egongo da 23:00etan?', es: 'La temperatura baja 3 °C cada hora. A las 18:00 hay +7 °C. ¿Qué temperatura habrá a las 23:00?', ar: 'تنخفض الحرارة 3 °م كل ساعة. في الساعة 18:00 كانت ⁦+7⁩ °م. كم ستكون في الساعة 23:00؟' },
        expected: fraction(-8),
        hint: { eu: '18:00etatik 23:00etara 5 ordu daude: $7+5\\cdot(-3)$.', es: 'De 18:00 a 23:00 hay 5 horas: $7+5\\cdot(-3)$.', ar: 'من 18:00 إلى 23:00 خمس ساعات: $7+5\\cdot(-3)$.' },
        explanation: { eu: '$5\\cdot(-3)=-15$ eta $7-15=-8$ °C.', es: '$5\\cdot(-3)=-15$ y $7-15=-8$ °C.', ar: '$5\\cdot(-3)=-15$ و$7-15=-8$ °م.' }
    },
    {
        id: 108,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: { eu: 'Bost egunetako tenperaturak: −4, −1, +3, −6, −2 °C. Zein da batez besteko tenperatura?', es: 'Temperaturas de cinco días: −4, −1, +3, −6, −2 °C. ¿Cuál es la temperatura media?', ar: 'درجات حرارة خمسة أيام: ⁦−4⁩، ⁦−1⁩، ⁦+3⁩، ⁦−6⁩، ⁦−2⁩ °م. ما متوسط الحرارة؟' },
        expected: fraction(-2),
        hint: { eu: 'Batu denak eta zatitu 5ez.', es: 'Súmalas todas y divide entre 5.', ar: 'اجمعها كلها ثم اقسم على 5.' },
        explanation: { eu: '$-4-1+3-6-2=3-13=-10$ eta $(-10)\\mathbin{:}5=-2$ °C.', es: '$-4-1+3-6-2=3-13=-10$ y $(-10)\\mathbin{:}5=-2$ °C.', ar: '$-4-1+3-6-2=3-13=-10$ و$(-10)\\mathbin{:}5=-2$ °م.' }
    },
    {
        id: 109,
        stage: 'addsub',
        context: 'master',
        points: 30,
        prompt: { eu: 'Pitagoras K.a. 570. urtean jaio zen eta K.a. 495. urtean hil zen. Zenbat urte bizi izan zen?', es: 'Pitágoras nació el año 570 a. C. y murió el 495 a. C. ¿Cuántos años vivió?', ar: 'وُلد فيثاغورس سنة 570 ق.م. وتوفي سنة 495 ق.م. كم سنة عاش؟' },
        expected: fraction(75),
        hint: { eu: 'K.a.-ko urteak negatiboak dira: $(-495)-(-570)$.', es: 'Los años a. C. son negativos: $(-495)-(-570)$.', ar: 'السنوات قبل الميلاد سالبة: $(-495)-(-570)$.' },
        explanation: { eu: '$(-495)-(-570)=-495+570=75$ urte.', es: '$(-495)-(-570)=-495+570=75$ años.', ar: '$(-495)-(-570)=-495+570=75$ سنة.' }
    },
    {
        id: 110,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: { eu: 'Lehiaketa batean asmatze bakoitzak +3 puntu ematen ditu eta huts bakoitzak 2 kentzen. Mikelek 7 asmatu ditu eta 12 huts egin. Zenbat puntu ditu?', es: 'En un concurso cada acierto suma 3 puntos y cada fallo resta 2. Mikel acierta 7 y falla 12. ¿Cuántos puntos tiene?', ar: 'في مسابقة، كل إجابة صحيحة تضيف 3 نقاط وكل خطأ يطرح نقطتين. أجاب ميكيل 7 إجابات صحيحة وأخطأ 12 مرة. كم نقطة لديه؟' },
        expected: fraction(-3),
        hint: { eu: '$7\\cdot(+3)+12\\cdot(-2)$.', es: '$7\\cdot(+3)+12\\cdot(-2)$.', ar: '$7\\cdot(+3)+12\\cdot(-2)$.' },
        explanation: { eu: '$21+(-24)=-3$ puntu.', es: '$21+(-24)=-3$ puntos.', ar: '$21+(-24)=-3$ نقاط.' }
    },
    {
        id: 111,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: { eu: 'Urpekari bat −8 m-ra dago. 5 minutuz 4 m jaisten da minutuko, eta gero 12 m igotzen da. Zein sakoneratan dago?', es: 'Un buzo está a −8 m. Durante 5 minutos baja 4 m por minuto y luego sube 12 m. ¿A qué profundidad está?', ar: 'غوّاص على عمق ⁦−8⁩ م. ينزل 4 م في الدقيقة لمدة 5 دقائق ثم يصعد 12 م. أين هو الآن؟' },
        expected: fraction(-16),
        hint: { eu: '$-8+5\\cdot(-4)+12$.', es: '$-8+5\\cdot(-4)+12$.', ar: '$-8+5\\cdot(-4)+12$.' },
        explanation: { eu: '$5\\cdot(-4)=-20$. $-8-20+12=12-28=-16$ m.', es: '$5\\cdot(-4)=-20$. $-8-20+12=12-28=-16$ m.', ar: '$5\\cdot(-4)=-20$. $-8-20+12=12-28=-16$ م.' }
    },
    {
        id: 112,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: { eu: 'Kalkulatu hierarkia errespetatuz.', es: 'Calcula respetando la jerarquía.', ar: 'احسب مع احترام أولوية العمليات.' },
        expression: '$[(-3)\\cdot(+4)-(-6)]\\mathbin{:}(-2)+(-5)\\cdot(-1)$',
        expected: fraction(8),
        hint: { eu: 'Kako barruan: lehenik biderketa, gero kenketa.', es: 'Dentro del corchete: primero el producto y luego la resta.', ar: 'داخل القوس المعقوف: الضرب أولًا ثم الطرح.' },
        explanation: { eu: '$[-12+6]=-6$; $(-6)\\mathbin{:}(-2)=+3$; $(-5)\\cdot(-1)=+5$. $3+5=8$.', es: '$[-12+6]=-6$; $(-6)\\mathbin{:}(-2)=+3$; $(-5)\\cdot(-1)=+5$. $3+5=8$.', ar: '$[-12+6]=-6$؛ $(-6)\\mathbin{:}(-2)=+3$؛ $(-5)\\cdot(-1)=+5$. $3+5=8$.' }
    }
]

export const integerExerciseBank: ExerciseSection[] = [
    {
        id: 'integers',
        title: { eu: 'Zenbaki osoak eta zuzena', es: 'Números enteros y recta', ar: 'الأعداد الصحيحة وخط الأعداد' },
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: { eu: 'Adierazi zenbaki oso batekin: a) lurretik 5 solairu behera; b) 20 € zor ditut; c) zero gainetik 3 gradu.', es: 'Expresa con un número entero: a) cinco plantas bajo tierra; b) debo 20 €; c) 3 grados sobre cero.', ar: 'عبّر بعدد صحيح عن كل حالة: خمسة طوابق تحت الأرض؛ دين قيمته 20 €؛ 3 درجات فوق الصفر.' },
                solution: { eu: 'a) $-5$ b) $-20$ c) $+3$', es: 'a) $-5$ b) $-20$ c) $+3$', ar: '$-5\\qquad -20\\qquad +3$' }
            },
            {
                id: 2,
                difficulty: 'easy',
                question: { eu: 'Sailkatu positibo, negatibo edo ez bata ez bestea: $+7,\\;-3,\\;0,\\;12,\\;-15$.', es: 'Clasifica en positivos, negativos o ninguno de los dos: $+7,\\;-3,\\;0,\\;12,\\;-15$.', ar: 'صنّف إلى موجبة أو سالبة أو لا هذا ولا ذاك: $+7,\\;-3,\\;0,\\;12,\\;-15$.' },
                solution: { eu: 'Positiboak: $+7$ eta $12$. Negatiboak: $-3$ eta $-15$. Zeroa ez da ez positiboa ez negatiboa.', es: 'Positivos: $+7$ y $12$. Negativos: $-3$ y $-15$. El cero no es ni positivo ni negativo.', ar: 'الموجبة: $+7$ و$12$. السالبة: $-3$ و$-15$. الصفر ليس موجبًا ولا سالبًا.' }
            },
            {
                id: 3,
                difficulty: 'easy',
                question: { eu: 'Idatzi −4 eta +2 arteko zenbaki osoak.', es: 'Escribe los números enteros comprendidos entre −4 y +2.', ar: 'اكتب الأعداد الصحيحة الواقعة بين ⁦−4⁩ و⁦+2⁩.' },
                solution: same('$-3,\\;-2,\\;-1,\\;0,\\;+1$')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: { eu: 'Zein zenbaki dago −3ren eskuinera 7 unitatera? Eta ezkerrera 7 unitatera?', es: '¿Qué número está 7 unidades a la derecha de −3? ¿Y 7 unidades a la izquierda?', ar: 'ما العدد الواقع على بعد 7 وحدات يمين ⁦−3⁩؟ وما العدد على بعد 7 وحدات يساره؟' },
                solution: { eu: 'Eskuinera: $-3+7=+4$. Ezkerrera: $-3-7=-10$.', es: 'A la derecha: $-3+7=+4$. A la izquierda: $-3-7=-10$.', ar: 'يمينًا: $-3+7=+4$. يسارًا: $-3-7=-10$.' }
            },
            {
                id: 5,
                difficulty: 'medium',
                question: { eu: 'Arrain bat −15 m-ra dago eta kaio bat +10 m-ra. Zein distantzia dago bien artean?', es: 'Un pez está a −15 m y una gaviota a +10 m. ¿Qué distancia los separa?', ar: 'سمكة على عمق ⁦−15⁩ م ونورس على ارتفاع ⁦+10⁩ م. ما المسافة بينهما؟' },
                solution: { eu: '$15+10=25$ m. Bestela: $(+10)-(-15)=25$ m.', es: '$15+10=25$ m. También: $(+10)-(-15)=25$ m.', ar: '$15+10=25$ م. أو: $(+10)-(-15)=25$ م.' },
                answer: { expected: fraction(25) }
            },
            {
                id: 6,
                difficulty: 'hard',
                question: { eu: 'Zein zenbaki dago zuzenean −9ren eta +3ren erdi-erdian?', es: '¿Qué número está en la recta justo en medio de −9 y +3?', ar: 'ما العدد الواقع تمامًا في منتصف المسافة بين ⁦−9⁩ و⁦+3⁩؟' },
                solution: { eu: 'Distantzia $3-(-9)=12$ da; erdia 6. $-9+6=-3$.', es: 'La distancia es $3-(-9)=12$; la mitad, 6. $-9+6=-3$.', ar: 'المسافة $3-(-9)=12$؛ ونصفها 6. $-9+6=-3$.' },
                answer: { expected: fraction(-3) }
            }
        ]
    },
    {
        id: 'absolute',
        title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', ar: 'القيمة المطلقة والمعاكس' },
        items: [
            {
                id: 7,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: $\\lvert -8\\rvert,\\;\\lvert +13\\rvert,\\;\\lvert 0\\rvert$.', es: 'Calcula: $\\lvert -8\\rvert,\\;\\lvert +13\\rvert,\\;\\lvert 0\\rvert$.', ar: 'احسب: $\\lvert -8\\rvert,\\;\\lvert +13\\rvert,\\;\\lvert 0\\rvert$.' },
                solution: same('$8,\\;13,\\;0$')
            },
            {
                id: 8,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: $\\mathrm{Aur}(+6),\\;\\mathrm{Aur}(-11),\\;\\mathrm{Aur}(0)$.', es: 'Calcula: $\\mathrm{Op}(+6),\\;\\mathrm{Op}(-11),\\;\\mathrm{Op}(0)$.', ar: 'احسب معاكس كلٍّ من: $+6,\\;-11,\\;0$.' },
                solution: same('$-6,\\;+11,\\;0$')
            },
            {
                id: 9,
                difficulty: 'medium',
                question: { eu: 'Zein zenbaki osok dute 5eko balio absolutua?', es: '¿Qué números enteros tienen valor absoluto 5?', ar: 'ما الأعداد الصحيحة التي قيمتها المطلقة 5؟' },
                solution: { eu: 'Bi: $+5$ eta $-5$. Biak zerotik 5 unitatera daude.', es: 'Dos: $+5$ y $-5$. Los dos están a 5 unidades del cero.', ar: 'عددان: $+5$ و$-5$، وكلاهما على بعد 5 وحدات من الصفر.' }
            },
            {
                id: 10,
                difficulty: 'medium',
                question: { eu: 'Kalkulatu: $\\lvert -7\\rvert +\\lvert +3\\rvert -\\lvert -4\\rvert$.', es: 'Calcula: $\\lvert -7\\rvert +\\lvert +3\\rvert -\\lvert -4\\rvert$.', ar: 'احسب: $\\lvert -7\\rvert +\\lvert +3\\rvert -\\lvert -4\\rvert$.' },
                solution: same('$7+3-4=6$'),
                answer: { expected: fraction(6) }
            },
            {
                id: 11,
                difficulty: 'medium',
                question: { eu: 'Sinplifikatu: $-(-(-2))$.', es: 'Simplifica: $-(-(-2))$.', ar: 'بسّط: $-(-(-2))$.' },
                solution: { eu: 'Barrutik kanpora: $-(-2)=+2$ eta $-(+2)=-2$. Emaitza: $-2$.', es: 'De dentro hacia fuera: $-(-2)=+2$ y $-(+2)=-2$. Resultado: $-2$.', ar: 'من الداخل إلى الخارج: $-(-2)=+2$ ثم $-(+2)=-2$. الناتج: $-2$.' },
                answer: { expected: fraction(-2) }
            },
            {
                id: 12,
                difficulty: 'hard',
                question: { eu: 'Egia ala gezurra? a) Balio absolutua ez da inoiz negatiboa. b) $\\mathrm{Aur}(\\mathrm{Aur}(-4))=-4$. c) $\\lvert a\\rvert =\\lvert b\\rvert$ bada, orduan $a=b$.', es: '¿Verdadero o falso? a) El valor absoluto nunca es negativo. b) $\\mathrm{Op}(\\mathrm{Op}(-4))=-4$. c) Si $\\lvert a\\rvert =\\lvert b\\rvert$, entonces $a=b$.', ar: 'صح أم خطأ؟ أ) القيمة المطلقة لا تكون سالبة أبدًا. ب) معاكس معاكس ⁦−4⁩ هو ⁦−4⁩. ج) إذا كان $\\lvert a\\rvert =\\lvert b\\rvert$ فإن $a=b$.' },
                solution: { eu: 'a) Egia: distantzia bat da. b) Egia: bi aldiz zeinua aldatzean, hasierako zenbakia. c) Gezurra: $\\lvert +3\\rvert =\\lvert -3\\rvert$, baina $+3\\neq -3$.', es: 'a) Verdadero: es una distancia. b) Verdadero: al cambiar dos veces el signo se vuelve al número inicial. c) Falso: $\\lvert +3\\rvert =\\lvert -3\\rvert$, pero $+3\\neq -3$.', ar: 'أ) صح: إنها مسافة. ب) صح: تغيير الإشارة مرتين يعيد العدد الأصلي. ج) خطأ: $\\lvert +3\\rvert =\\lvert -3\\rvert$ لكن $+3\\neq -3$.' }
            }
        ]
    },
    {
        id: 'ordering',
        title: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', ar: 'المقارنة والترتيب' },
        items: [
            {
                id: 13,
                difficulty: 'easy',
                question: { eu: 'Idatzi $<$ edo $>$: a) $-5\\;\\square\\;-2$ b) $+3\\;\\square\\;-8$ c) $0\\;\\square\\;-1$.', es: 'Escribe $<$ o $>$: a) $-5\\;\\square\\;-2$ b) $+3\\;\\square\\;-8$ c) $0\\;\\square\\;-1$.', ar: 'ضع $<$ أو $>$ في كل حالة: $-5\\;\\square\\;-2\\qquad +3\\;\\square\\;-8\\qquad 0\\;\\square\\;-1$.' },
                solution: { eu: 'a) $-5<-2$ b) $+3>-8$ c) $0>-1$', es: 'a) $-5<-2$ b) $+3>-8$ c) $0>-1$', ar: '$-5<-2\\qquad +3>-8\\qquad 0>-1$' }
            },
            {
                id: 14,
                difficulty: 'easy',
                question: { eu: 'Ordenatu txikienetik handienera: $+4,\\;-6,\\;0,\\;-1,\\;+2$.', es: 'Ordena de menor a mayor: $+4,\\;-6,\\;0,\\;-1,\\;+2$.', ar: 'رتّب تصاعديًا: $+4,\\;-6,\\;0,\\;-1,\\;+2$.' },
                solution: same('$-6<-1<0<+2<+4$')
            },
            {
                id: 15,
                difficulty: 'medium',
                question: { eu: 'Ordenatu handienetik txikienera: $-12,\\;+7,\\;-3,\\;+15,\\;0,\\;-20$.', es: 'Ordena de mayor a menor: $-12,\\;+7,\\;-3,\\;+15,\\;0,\\;-20$.', ar: 'رتّب تنازليًا: $-12,\\;+7,\\;-3,\\;+15,\\;0,\\;-20$.' },
                solution: same('$+15>+7>0>-3>-12>-20$')
            },
            {
                id: 16,
                difficulty: 'medium',
                question: { eu: 'Idatzi −7 eta −3 arteko hiru zenbaki oso.', es: 'Escribe los tres números enteros que hay entre −7 y −3.', ar: 'اكتب الأعداد الصحيحة الثلاثة الواقعة بين ⁦−7⁩ و⁦−3⁩.' },
                solution: same('$-6,\\;-5,\\;-4$')
            },
            {
                id: 17,
                difficulty: 'medium',
                question: { eu: 'Tenperaturak: Bilbo +8 °C, Mosku −12 °C, Oslo −5 °C, Madril +3 °C. Ordenatu hotzenetik beroenera.', es: 'Temperaturas: Bilbao +8 °C, Moscú −12 °C, Oslo −5 °C, Madrid +3 °C. Ordénalas de la más fría a la más cálida.', ar: 'درجات الحرارة: بلباو ⁦+8⁩ °م، موسكو ⁦−12⁩ °م، أوسلو ⁦−5⁩ °م، مدريد ⁦+3⁩ °م. رتّبها من الأبرد إلى الأدفأ.' },
                solution: { eu: 'Mosku $(-12)$ < Oslo $(-5)$ < Madril $(+3)$ < Bilbo $(+8)$.', es: 'Moscú $(-12)$ < Oslo $(-5)$ < Madrid $(+3)$ < Bilbao $(+8)$.', ar: 'موسكو $(-12)$ < أوسلو $(-5)$ < مدريد $(+3)$ < بلباو $(+8)$.' }
            },
            {
                id: 18,
                difficulty: 'hard',
                question: { eu: 'Zenbat zenbaki oso $x$ betetzen dute $-4<x\\le 2$?', es: '¿Cuántos números enteros $x$ cumplen $-4<x\\le 2$?', ar: 'كم عددًا صحيحًا $x$ يحقق $-4<x\\le 2$؟' },
                solution: { eu: '−4 ez da sartzen eta 2 bai: $-3,-2,-1,0,1,2$. Sei zenbaki.', es: 'El −4 no entra y el 2 sí: $-3,-2,-1,0,1,2$. Seis números.', ar: '⁦−4⁩ غير مشمول و2 مشمول: $-3,-2,-1,0,1,2$. ستة أعداد.' },
                answer: { expected: fraction(6) }
            }
        ]
    },
    {
        id: 'addsub',
        title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' },
        items: [
            {
                id: 19,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: a) $(+7)+(-3)$ b) $(-5)+(-6)$ c) $(-9)+(+4)$.', es: 'Calcula: a) $(+7)+(-3)$ b) $(-5)+(-6)$ c) $(-9)+(+4)$.', ar: 'احسب: $(+7)+(-3)\\qquad (-5)+(-6)\\qquad (-9)+(+4)$' },
                solution: { eu: 'a) $+4$ b) $-11$ c) $-5$', es: 'a) $+4$ b) $-11$ c) $-5$', ar: '$+4\\qquad -11\\qquad -5$' }
            },
            {
                id: 20,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: a) $(+3)-(+8)$ b) $(-2)-(-7)$ c) $(-4)-(+5)$.', es: 'Calcula: a) $(+3)-(+8)$ b) $(-2)-(-7)$ c) $(-4)-(+5)$.', ar: 'احسب: $(+3)-(+8)\\qquad (-2)-(-7)\\qquad (-4)-(+5)$' },
                solution: { eu: 'Aurkakoa batuz: a) $(+3)+(-8)=-5$ b) $(-2)+(+7)=+5$ c) $(-4)+(-5)=-9$.', es: 'Sumando el opuesto: a) $(+3)+(-8)=-5$ b) $(-2)+(+7)=+5$ c) $(-4)+(-5)=-9$.', ar: 'بجمع المعاكس: $(+3)+(-8)=-5\\qquad (-2)+(+7)=+5\\qquad (-4)+(-5)=-9$' }
            },
            {
                id: 21,
                difficulty: 'medium',
                question: { eu: 'Idatzi modu laburtuan eta kalkulatu: $(+6)-(-4)+(-9)-(+3)$.', es: 'Escribe en forma abreviada y calcula: $(+6)-(-4)+(-9)-(+3)$.', ar: 'اكتب بالصيغة المختصرة ثم احسب: $(+6)-(-4)+(-9)-(+3)$.' },
                solution: same('$6+4-9-3=10-12=-2$'),
                answer: { expected: fraction(-2) }
            },
            {
                id: 22,
                difficulty: 'medium',
                question: { eu: 'Kalkulatu: $-8+5-3+12-7$.', es: 'Calcula: $-8+5-3+12-7$.', ar: 'احسب: $-8+5-3+12-7$.' },
                solution: { eu: 'Positiboak: $5+12=17$. Negatiboak: $8+3+7=18$. $17-18=-1$.', es: 'Positivos: $5+12=17$. Negativos: $8+3+7=18$. $17-18=-1$.', ar: 'الموجبة: $5+12=17$. السالبة: $8+3+7=18$. $17-18=-1$.' },
                answer: { expected: fraction(-1) }
            },
            {
                id: 23,
                difficulty: 'hard',
                question: { eu: 'Kalkulatu bi eratara (lehenik barrukoa, eta parentesiak kenduz): $10-(4-9)+(-3+5)$.', es: 'Calcula de las dos formas (primero lo de dentro, y quitando paréntesis): $10-(4-9)+(-3+5)$.', ar: 'احسب بالطريقتين (ما داخل الأقواس أولًا، ثم بحذف الأقواس): $10-(4-9)+(-3+5)$.' },
                solution: { eu: 'Lehenik barrukoa: $10-(-5)+(+2)=10+5+2=17$. Parentesiak kenduz: $10-4+9-3+5=24-7=17$.', es: 'Primero lo de dentro: $10-(-5)+(+2)=10+5+2=17$. Quitando paréntesis: $10-4+9-3+5=24-7=17$.', ar: 'ما داخل الأقواس أولًا: $10-(-5)+(+2)=10+5+2=17$. وبحذف الأقواس: $10-4+9-3+5=24-7=17$.' },
                answer: { expected: fraction(17) }
            },
            {
                id: 24,
                difficulty: 'hard',
                question: { eu: 'Kalkulatu: $-(6-11)-(-2+8)+4$.', es: 'Calcula: $-(6-11)-(-2+8)+4$.', ar: 'احسب: $-(6-11)-(-2+8)+4$.' },
                solution: { eu: '$-(-5)-(+6)+4=5-6+4=3$. Parentesiak kenduz: $-6+11+2-8+4=3$.', es: '$-(-5)-(+6)+4=5-6+4=3$. Quitando paréntesis: $-6+11+2-8+4=3$.', ar: '$-(-5)-(+6)+4=5-6+4=3$. وبحذف الأقواس: $-6+11+2-8+4=3$.' },
                answer: { expected: fraction(3) }
            }
        ]
    },
    {
        id: 'muldiv',
        title: { eu: 'Biderketak, zatiketak eta hierarkia', es: 'Productos, cocientes y jerarquía', ar: 'الضرب والقسمة وأولوية العمليات' },
        items: [
            {
                id: 25,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: a) $(-4)\\cdot(+7)$ b) $(-6)\\cdot(-5)$ c) $(+36)\\mathbin{:}(-9)$.', es: 'Calcula: a) $(-4)\\cdot(+7)$ b) $(-6)\\cdot(-5)$ c) $(+36)\\mathbin{:}(-9)$.', ar: 'احسب: $(-4)\\cdot(+7)\\qquad (-6)\\cdot(-5)\\qquad (+36)\\mathbin{:}(-9)$' },
                solution: { eu: 'a) $-28$ b) $+30$ c) $-4$', es: 'a) $-28$ b) $+30$ c) $-4$', ar: '$-28\\qquad +30\\qquad -4$' }
            },
            {
                id: 26,
                difficulty: 'easy',
                question: { eu: 'Kalkulatu: a) $(-56)\\mathbin{:}(-8)$ b) $(+9)\\cdot(-3)$ c) $(-45)\\mathbin{:}(+5)$.', es: 'Calcula: a) $(-56)\\mathbin{:}(-8)$ b) $(+9)\\cdot(-3)$ c) $(-45)\\mathbin{:}(+5)$.', ar: 'احسب: $(-56)\\mathbin{:}(-8)\\qquad (+9)\\cdot(-3)\\qquad (-45)\\mathbin{:}(+5)$' },
                solution: { eu: 'a) $+7$ b) $-27$ c) $-9$', es: 'a) $+7$ b) $-27$ c) $-9$', ar: '$+7\\qquad -27\\qquad -9$' }
            },
            {
                id: 27,
                difficulty: 'medium',
                question: { eu: 'Kalkulatu: a) $(-2)\\cdot(-3)\\cdot(-4)$ b) $(+60)\\mathbin{:}(-5)\\mathbin{:}(-3)$.', es: 'Calcula: a) $(-2)\\cdot(-3)\\cdot(-4)$ b) $(+60)\\mathbin{:}(-5)\\mathbin{:}(-3)$.', ar: 'احسب: $(-2)\\cdot(-3)\\cdot(-4)\\qquad (+60)\\mathbin{:}(-5)\\mathbin{:}(-3)$' },
                solution: { eu: 'a) Hiru negatibo → −: $-24$. b) Ezkerretik eskuinera: $(-12)\\mathbin{:}(-3)=+4$.', es: 'a) Tres negativos → −: $-24$. b) De izquierda a derecha: $(-12)\\mathbin{:}(-3)=+4$.', ar: 'في الأول ثلاثة عوامل سالبة، فالإشارة ‎−: $-24$. وفي الثاني من اليسار إلى اليمين: $(-12)\\mathbin{:}(-3)=+4$.' }
            },
            {
                id: 28,
                difficulty: 'medium',
                question: { eu: 'Kalkulatu: $8-3\\cdot(-5)$.', es: 'Calcula: $8-3\\cdot(-5)$.', ar: 'احسب: $8-3\\cdot(-5)$.' },
                solution: { eu: 'Lehenik biderketa: $3\\cdot(-5)=-15$. $8-(-15)=8+15=23$.', es: 'Primero el producto: $3\\cdot(-5)=-15$. $8-(-15)=8+15=23$.', ar: 'الضرب أولًا: $3\\cdot(-5)=-15$. $8-(-15)=8+15=23$.' },
                answer: { expected: fraction(23) }
            },
            {
                id: 29,
                difficulty: 'hard',
                question: { eu: 'Kalkulatu: $(-18)\\mathbin{:}(+3)-4\\cdot(-2)+(-7)$.', es: 'Calcula: $(-18)\\mathbin{:}(+3)-4\\cdot(-2)+(-7)$.', ar: 'احسب: $(-18)\\mathbin{:}(+3)-4\\cdot(-2)+(-7)$.' },
                solution: same('$(-6)-(-8)+(-7)=-6+8-7=-5$'),
                answer: { expected: fraction(-5) }
            },
            {
                id: 30,
                difficulty: 'hard',
                question: { eu: 'Kalkulatu: $5-[(-3)+2\\cdot(-4)]\\mathbin{:}(-11)$.', es: 'Calcula: $5-[(-3)+2\\cdot(-4)]\\mathbin{:}(-11)$.', ar: 'احسب: $5-[(-3)+2\\cdot(-4)]\\mathbin{:}(-11)$.' },
                solution: { eu: 'Kako barruan: $-3-8=-11$. $(-11)\\mathbin{:}(-11)=+1$. $5-1=4$.', es: 'Dentro del corchete: $-3-8=-11$. $(-11)\\mathbin{:}(-11)=+1$. $5-1=4$.', ar: 'داخل القوس المعقوف: $-3-8=-11$. $(-11)\\mathbin{:}(-11)=+1$. $5-1=4$.' },
                answer: { expected: fraction(4) }
            }
        ]
    }
]
