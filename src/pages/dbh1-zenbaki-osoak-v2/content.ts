import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoak · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges. Exercises come from Santillana 1.º ESO unit 5 (curricular
   adaptation) and Anaya 1.º ESO unit 4, with small numbers and everyday
   situations. Closed bank exercises carry their answer, so the bank checks
   them. Signed numbers inside Arabic text are isolated left-to-right.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value })
/** A signed number (or short expression) kept left-to-right inside Arabic text */
const n = (text: string | number) => `⁦${typeof text === 'number' ? (text > 0 ? `+${text}` : text < 0 ? `−${-text}` : '0') : text}⁩`
const calculate = (latex: string): LocalizedText => say(`Kalkulatu: ${latex}`, `Calcula: ${latex}`, `احسب: ${latex}`)

export const integerIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 901,
        prompt: say('«Zero azpitik lau gradu daude.» Nola idazten da?', '«Hace cuatro grados bajo cero.» ¿Cómo se escribe?', '«الحرارة أربع درجات تحت الصفر.» كيف تُكتب؟'),
        options: [same('$+4\\,^{\\circ}\\mathrm{C}$'), same('$-4\\,^{\\circ}\\mathrm{C}$'), same('$4\\,^{\\circ}\\mathrm{C}$')],
        correctIndex: 1,
        explanation: say('«Zero azpitik» → negatiboa: $-4\\,^{\\circ}\\mathrm{C}$.', '«Bajo cero» → negativo: $-4\\,^{\\circ}\\mathrm{C}$.', '«تحت الصفر» ← سالب: $-4\\,^{\\circ}\\mathrm{C}$.'),
        topic: 'negatives'
    },
    {
        id: 902,
        prompt: say('Zein zenbaki ez da ez positiboa ez negatiboa?', '¿Qué número no es ni positivo ni negativo?', 'أي عدد ليس موجبًا ولا سالبًا؟'),
        options: [same('$0$'), same('$-1$'), same('$+1$')],
        correctIndex: 0,
        explanation: say('Zeroa da erreferentzia: ez da ez positiboa ez negatiboa.', 'El cero es la referencia: no es ni positivo ni negativo.', 'الصفر هو المرجع: ليس موجبًا ولا سالبًا.'),
        topic: 'integer-set'
    },
    {
        id: 903,
        prompt: say('Zein da egia?', '¿Qué es cierto?', 'أيها صحيح؟'),
        options: [same('$-6<-2$'), same('$-6>-2$'), same('$-2<-6$')],
        correctIndex: 0,
        explanation: say('Zuzenean −2 eskuinerago dago: $-6<-2$.', 'En la recta, −2 está más a la derecha: $-6<-2$.', `على المستقيم يقع ${n(-2)} أبعد نحو اليمين: $-6<-2$.`),
        topic: 'compare'
    },
    {
        id: 904,
        prompt: say('Zein da txikiena?', '¿Cuál es el menor?', 'أيها الأصغر؟'),
        options: [same('$-3$'), same('$0$'), same('$-9$')],
        correctIndex: 2,
        explanation: say('−9 da zerotik urrunen dagoen negatiboa: $-9<-3<0$.', '−9 es el negativo más alejado del cero: $-9<-3<0$.', `${n(-9)} هو السالب الأبعد عن الصفر: $-9<-3<0$.`),
        topic: 'order'
    },
    {
        id: 905,
        prompt: same('$\\lvert -7\\rvert =\\ ?$'),
        options: [same('$-7$'), same('$7$'), same('$0$')],
        correctIndex: 1,
        explanation: say('Balio absolutua distantzia da: ez da inoiz negatiboa. $\\lvert -7\\rvert =7$.', 'El valor absoluto es una distancia: nunca es negativo. $\\lvert -7\\rvert =7$.', 'القيمة المطلقة مسافة: ليست سالبة أبدًا. $\\lvert -7\\rvert =7$.'),
        topic: 'absolute'
    },
    {
        id: 906,
        prompt: say('Zein da −12ren aurkakoa?', '¿Cuál es el opuesto de −12?', `ما معاكس ${n(-12)}؟`),
        options: [same('$+12$'), same('$-12$'), same('$0$')],
        correctIndex: 0,
        explanation: say('Aurkakoa lortzeko zeinua aldatzen da: $\\mathrm{Aur}(-12)=+12$.', 'Para el opuesto se cambia el signo: $\\mathrm{Op}(-12)=+12$.', 'للمعاكس نغيّر الإشارة: $\\mathrm{Aur}(-12)=+12$.'),
        topic: 'opposite'
    },
    {
        id: 907,
        prompt: say('Zenbat da $(-8)+(+6)$?', '¿Cuánto es $(-8)+(+6)$?', 'كم يساوي $(-8)+(+6)$؟'),
        options: [same('$-2$'), same('$+2$'), same('$-14$')],
        correctIndex: 0,
        explanation: say('Zeinu desberdinak: $8-6=2$, eta 8 handiagoa da, beraz −.', 'Signos distintos: $8-6=2$, y 8 es mayor, así que −.', 'إشارتان مختلفتان: $8-6=2$، و8 أكبر، إذن −.'),
        topic: 'add-different'
    },
    {
        id: 908,
        prompt: say('Zenbat da $(-5)\\cdot (-3)$?', '¿Cuánto es $(-5)\\cdot (-3)$?', 'كم يساوي $(-5)\\cdot (-3)$؟'),
        options: [same('$-15$'), same('$+15$'), same('$-8$')],
        correctIndex: 1,
        explanation: say('Zeinu bera → +: $(-5)\\cdot (-3)=+15$.', 'Mismo signo → +: $(-5)\\cdot (-3)=+15$.', 'الإشارة نفسها ← +: $(-5)\\cdot (-3)=+15$.'),
        topic: 'multiply'
    }
]

export const integerIntroPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'meaning',
        prompt: say('Autoa bigarren sotoan aparkatuta dago. Idatzi solairua zenbaki oso gisa.', 'El coche está aparcado en el segundo sótano. Escribe la planta como número entero.', 'السيارة متوقفة في القبو الثاني. اكتب الطابق عددًا صحيحًا.'),
        expected: fraction(-2),
        hint: say('Beheko solairua 0 da; sotoak zerotik behera daude.', 'La planta baja es el 0; los sótanos están por debajo.', 'الطابق الأرضي هو 0، والأقبية تحته.'),
        explanation: say('Bi solairu zerotik behera: −2.', 'Dos plantas por debajo del cero: −2.', `طابقان تحت الصفر: ${n(-2)}.`)
    },
    {
        id: 2,
        stage: 'meaning',
        prompt: say('Kobazulo bat 55 metroko sakoneran dago. Idatzi zenbaki oso gisa (metrotan).', 'Una cueva está a 55 metros de profundidad. Escríbelo como número entero (en metros).', 'كهف على عمق 55 مترًا. اكتبه عددًا صحيحًا (بالأمتار).'),
        expected: fraction(-55),
        hint: say('Sakonera = lurretik behera.', 'Profundidad = por debajo del suelo.', 'العمق = تحت الأرض.'),
        explanation: say('Zerotik 55 m behera: −55.', '55 m por debajo del cero: −55.', `55 م تحت الصفر: ${n(-55)}.`)
    },
    {
        id: 3,
        stage: 'meaning',
        prompt: say('«Zero gainetik hogeita hamabi gradu gaude.» Idatzi tenperatura zenbaki oso gisa.', '«Estamos a treinta y dos grados sobre cero.» Escribe la temperatura como número entero.', '«الحرارة اثنتان وثلاثون درجة فوق الصفر.» اكتبها عددًا صحيحًا.'),
        expected: fraction(32),
        hint: say('«Zero gainetik» → positiboa.', '«Sobre cero» → positivo.', '«فوق الصفر» ← موجب.'),
        explanation: say('+32 °C.', '+32 °C.', `${n(32)} °م.`)
    },
    {
        id: 4,
        stage: 'line',
        prompt: say('Zenbat zenbaki oso daude −4 baino handiagoak eta +2 baino txikiagoak?', '¿Cuántos números enteros hay mayores que −4 y menores que +2?', `كم عددًا صحيحًا أكبر من ${n(-4)} وأصغر من ${n(2)}؟`),
        expected: fraction(5),
        hint: say('Idatzi denak zuzenean: −3, −2…', 'Escríbelos todos en la recta: −3, −2…', `اكتبها كلها على المستقيم: ${n('−3, −2…')}`),
        explanation: say('$-3,\\ -2,\\ -1,\\ 0,\\ +1$: bost.', '$-3,\\ -2,\\ -1,\\ 0,\\ +1$: cinco.', '$-3,\\ -2,\\ -1,\\ 0,\\ +1$: خمسة.')
    },
    {
        id: 5,
        stage: 'line',
        prompt: say('Zein da handiena: −8, −16, −2, −10?', '¿Cuál es el mayor: −8, −16, −2, −10?', `أيها الأكبر: ${n('−8, −16, −2, −10')}؟`),
        expected: fraction(-2),
        hint: say('Negatiboetan, zerotik hurbilen dagoena da handiena.', 'Entre negativos, el más cercano al cero es el mayor.', 'بين السالبة، الأقرب إلى الصفر هو الأكبر.'),
        explanation: same('$-16<-10<-8<-2$')
    },
    {
        id: 6,
        stage: 'line',
        prompt: say('Hiri batean gehienezko tenperatura +3 °C izan da eta gutxienekoa −4 °C. Zenbat gradu dago bien artean?', 'En una ciudad la máxima ha sido +3 °C y la mínima −4 °C. ¿Cuántos grados hay entre las dos?', `في مدينة كانت العظمى ${n('+3 °C')} والصغرى ${n('−4 °C')}. كم درجة بينهما؟`),
        expected: fraction(7),
        hint: say('Zenbatu termometroan −4tik +3ra: lehenik zerora, gero gora.', 'Cuenta en el termómetro de −4 a +3: primero hasta el cero, luego hacia arriba.', `عدّ على ميزان الحرارة من ${n(-4)} إلى ${n(3)}: أولًا حتى الصفر ثم إلى الأعلى.`),
        explanation: say('4 gradu zeroraino eta 3 gehiago: 7 gradu.', '4 grados hasta el cero y 3 más: 7 grados.', '4 درجات حتى الصفر و3 أخرى: 7 درجات.')
    },
    {
        id: 7,
        stage: 'absolute',
        prompt: calculate('$\\lvert -15\\rvert$'),
        expected: fraction(15),
        hint: say('Kendu zeinua: distantzia da.', 'Quita el signo: es una distancia.', 'احذف الإشارة: إنها مسافة.'),
        explanation: same('$\\lvert -15\\rvert =15$')
    },
    {
        id: 8,
        stage: 'absolute',
        prompt: say('Kalkulatu: $\\mathrm{Aur}(+9)$', 'Calcula: $\\mathrm{Op}(+9)$', 'احسب: $\\mathrm{Aur}(+9)$'),
        expected: fraction(-9),
        hint: say('Aurkakoa: zeinua aldatu.', 'Opuesto: cambia el signo.', 'المعاكس: غيّر الإشارة.'),
        explanation: say('$\\mathrm{Aur}(+9)=-9$', '$\\mathrm{Op}(+9)=-9$', '$\\mathrm{Aur}(+9)=-9$')
    },
    {
        id: 9,
        stage: 'absolute',
        prompt: say('Bi zenbaki aurkako zuzenean 12 unitatera daude bata bestetik. Zein da positiboa?', 'Dos números opuestos están en la recta a 12 unidades uno del otro. ¿Cuál es el positivo?', 'عددان متعاكسان يبعد أحدهما عن الآخر 12 وحدة على المستقيم. ما الموجب منهما؟'),
        expected: fraction(6),
        hint: say('Biak zerotik distantzia berera daude: erdia.', 'Los dos están a la misma distancia del cero: la mitad.', 'كلاهما على البعد نفسه من الصفر: النصف.'),
        explanation: say('$12\\mathbin{:}2=6$: $-6$ eta $+6$.', '$12\\mathbin{:}2=6$: $-6$ y $+6$.', '$12\\mathbin{:}2=6$: $-6$ و$+6$.')
    },
    {
        id: 10,
        stage: 'addsub',
        prompt: calculate('$(-7)+(+11)$'),
        expression: '$(-7)+(+11)$',
        expected: fraction(4),
        hint: say('Zeinu desberdinak: kendu eta irabazlearen zeinua.', 'Signos distintos: resta y pon el signo del que gana.', 'إشارتان مختلفتان: اطرح وضع إشارة الغالب.'),
        explanation: same('$11-7=4 \\;\\Rightarrow\\; +4$')
    },
    {
        id: 11,
        stage: 'addsub',
        prompt: calculate('$(-15)-(+7)$'),
        expression: '$(-15)-(+7)$',
        expected: fraction(-22),
        hint: say('Kentzea = aurkakoa batzea: $(-15)+(-7)$.', 'Restar = sumar el opuesto: $(-15)+(-7)$.', 'الطرح = جمع المعاكس: $(-15)+(-7)$.'),
        explanation: same('$(-15)+(-7)=-22$')
    },
    {
        id: 12,
        stage: 'addsub',
        prompt: calculate('$(+8)-(-12)$'),
        expression: '$(+8)-(-12)$',
        expected: fraction(20),
        hint: say('Negatibo bat kentzea positibo bat batzea da.', 'Restar un negativo es sumar un positivo.', 'طرح سالب يساوي جمع موجب.'),
        explanation: same('$(+8)+(+12)=+20$')
    },
    {
        id: 13,
        stage: 'addsub',
        prompt: calculate('$5-7+19-20+4-3+10$'),
        expression: '$5-7+19-20+4-3+10$',
        expected: fraction(8),
        hint: say('Batu positiboak alde batetik eta negatiboak bestetik.', 'Suma los positivos por un lado y los negativos por otro.', 'اجمع الموجبة وحدها والسالبة وحدها.'),
        explanation: same('$38-30=8$')
    },
    {
        id: 14,
        stage: 'addsub',
        prompt: calculate('$-4-(5-7)-(4+5)$'),
        expression: '$-4-(5-7)-(4+5)$',
        expected: fraction(-11),
        hint: say('Aurretik − duten parentesiek barruko zeinuak aldatzen dituzte.', 'Los paréntesis precedidos de − cambian los signos de dentro.', 'الأقواس المسبوقة بـ − تغيّر الإشارات داخلها.'),
        explanation: same('$-4-5+7-4-5=7-18=-11$')
    },
    {
        id: 15,
        stage: 'addsub',
        prompt: say('Itsaspeko bat 100 metroko sakoneran dago eta 55 metro igotzen da. Zein sakoneratan dago orain?', 'Un submarino está a 100 metros de profundidad y asciende 55 metros. ¿A qué profundidad está ahora?', 'غواصة على عمق 100 متر وصعدت 55 مترًا. على أي عمق هي الآن؟'),
        expected: fraction(-45),
        hint: say('Hasiera −100; igotzea + da.', 'Empieza en −100; subir es +.', `تبدأ عند ${n(-100)}؛ والصعود +.`),
        explanation: same('$(-100)+(+55)=-45$')
    },
    {
        id: 16,
        stage: 'muldiv',
        prompt: calculate('$(+12)\\cdot (-3)$'),
        expression: '$(+12)\\cdot (-3)$',
        expected: fraction(-36),
        hint: say('Zeinu desberdinak → −.', 'Signos distintos → −.', 'إشارتان مختلفتان ← −.'),
        explanation: same('$12\\cdot 3=36 \\;\\Rightarrow\\; -36$')
    },
    {
        id: 17,
        stage: 'muldiv',
        prompt: calculate('$(-77)\\mathbin{:}(-11)$'),
        expression: '$(-77)\\mathbin{:}(-11)$',
        expected: fraction(7),
        hint: say('Zeinu bera → +.', 'Mismo signo → +.', 'الإشارة نفسها ← +.'),
        explanation: same('$77\\mathbin{:}11=7 \\;\\Rightarrow\\; +7$')
    },
    {
        id: 18,
        stage: 'muldiv',
        prompt: say('Osatu: $(+9)\\cdot \\square =-36$', 'Completa: $(+9)\\cdot \\square =-36$', 'أكمل: $(+9)\\cdot \\square =-36$'),
        expected: fraction(-4),
        hint: say('Zatitu: $(-36)\\mathbin{:}(+9)$.', 'Divide: $(-36)\\mathbin{:}(+9)$.', 'اقسم: $(-36)\\mathbin{:}(+9)$.'),
        explanation: same('$(-36)\\mathbin{:}(+9)=-4$')
    },
    {
        id: 19,
        stage: 'muldiv',
        prompt: say('Osatu: $(+42)\\mathbin{:}\\square =-7$', 'Completa: $(+42)\\mathbin{:}\\square =-7$', 'أكمل: $(+42)\\mathbin{:}\\square =-7$'),
        expected: fraction(-6),
        hint: say('Zein zenbakiz zatitu behar da 42, −7 lortzeko? Zeinuak desberdinak izan behar dira.', '¿Entre qué número hay que dividir 42 para obtener −7? Los signos tienen que ser distintos.', 'على أي عدد نقسم 42 لنحصل على −7؟ يجب أن تختلف الإشارتان.'),
        explanation: same('$(+42)\\mathbin{:}(-6)=-7$')
    }
]

export const integerIntroChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'addsub',
        context: 'starter',
        points: 10,
        prompt: say('Anek 46 € zor ditu eta 60 € kobratu ditu. Zorra ordaindu ondoren, zenbat diru geratzen zaio?', 'Ana tiene una deuda de 46 € y cobra 60 €. Después de pagar la deuda, ¿cuánto dinero le queda?', 'على آنا دين قدره 46 € وقبضت 60 €. بعد سداد الدين، كم يبقى لها؟'),
        expected: fraction(14),
        hint: say('Zorra −46 da; kobratzea +60.', 'La deuda es −46; cobrar es +60.', `الدين ${n(-46)}؛ والقبض ${n(60)}.`),
        explanation: say('$(-46)+(+60)=+14$: 14 € geratzen zaizkio.', '$(-46)+(+60)=+14$: le quedan 14 €.', '$(-46)+(+60)=+14$: يبقى لها 14 €.')
    },
    {
        id: 102,
        stage: 'line',
        context: 'starter',
        points: 10,
        prompt: say('Termometroak −3 °C markatzen zituen 8etan eta +5 °C 14etan. Zenbat gradu igo da tenperatura?', 'El termómetro marcaba −3 °C a las 8 y +5 °C a las 14. ¿Cuántos grados ha subido la temperatura?', `كان ميزان الحرارة يشير إلى ${n('−3 °C')} الساعة 8 و${n('+5 °C')} الساعة 14. كم درجة ارتفعت الحرارة؟`),
        expected: fraction(8),
        hint: say('Azkena ken lehena: $(+5)-(-3)$.', 'Final menos inicial: $(+5)-(-3)$.', 'النهاية ناقص البداية: $(+5)-(-3)$.'),
        explanation: say('$(+5)-(-3)=5+3=8$ gradu.', '$(+5)-(-3)=5+3=8$ grados.', '$(+5)-(-3)=5+3=8$ درجات.')
    },
    {
        id: 103,
        stage: 'muldiv',
        context: 'starter',
        points: 10,
        prompt: say('Urpekari bat minutuan 3 metro jaisten da, gainazaletik hasita. Zein sakoneratan dago 6 minuturen buruan? Idatzi zenbaki oso gisa.', 'Un buzo baja 3 metros cada minuto, empezando en la superficie. ¿A qué profundidad está a los 6 minutos? Escríbelo como número entero.', 'غوّاص ينزل 3 أمتار كل دقيقة بدءًا من السطح. على أي عمق يكون بعد 6 دقائق؟ اكتبه عددًا صحيحًا.'),
        expected: fraction(-18),
        hint: say('Minutu bakoitzean −3.', 'Cada minuto, −3.', `كل دقيقة ${n(-3)}.`),
        explanation: same('$6\\cdot (-3)=-18$ m')
    },
    {
        id: 104,
        stage: 'addsub',
        context: 'advanced',
        points: 20,
        prompt: say('Arkimedes K.a. 287. urtean jaio zen eta K.a. 212an hil zen. Zenbat urte bizi izan zen?', 'Arquímedes nació en el año 287 a. C. y murió en el 212 a. C. ¿Cuántos años vivió?', 'وُلد أرخميدس سنة 287 قبل الميلاد وتوفي سنة 212 قبل الميلاد. كم سنة عاش؟'),
        expected: fraction(75),
        hint: say('K.a. urteak negatiboak dira: −287 eta −212.', 'Los años antes de Cristo son negativos: −287 y −212.', `السنوات قبل الميلاد سالبة: ${n(-287)} و${n(-212)}.`),
        explanation: say('$(-212)-(-287)=-212+287=75$ urte.', '$(-212)-(-287)=-212+287=75$ años.', '$(-212)-(-287)=-212+287=75$ سنة.')
    },
    {
        id: 105,
        stage: 'addsub',
        context: 'advanced',
        points: 20,
        prompt: say('Bigarren sotoan zaude. 5 solairu igo, 4 jaitsi eta 6 igotzen zara. Zein solairutan zaude?', 'Estás en el segundo sótano. Subes 5 plantas, bajas 4 y subes 6. ¿En qué planta estás?', 'أنت في القبو الثاني. تصعد 5 طوابق وتنزل 4 وتصعد 6. في أي طابق أنت؟'),
        expected: fraction(5),
        hint: say('Hasi −2tik eta batu mugimendu bakoitza.', 'Empieza en −2 y suma cada movimiento.', `ابدأ من ${n(-2)} واجمع كل حركة.`),
        explanation: same('$-2+5-4+6=11-6=+5$')
    },
    {
        id: 106,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: say('Kontu batean 120 € dituzu eta 45 euroko 3 faktura ordaintzen dituzu. Zein da saldoa?', 'Tienes 120 € en la cuenta y pagas 3 facturas de 45 €. ¿Cuál es el saldo?', 'في حسابك 120 € ودفعت 3 فواتير قيمة كل منها 45 €. ما الرصيد؟'),
        expected: fraction(-15),
        hint: say('Fakturak: $3\\cdot (-45)$.', 'Las facturas: $3\\cdot (-45)$.', 'الفواتير: $3\\cdot (-45)$.'),
        explanation: say('$120+3\\cdot (-45)=120-135=-15$: gorrian zaude.', '$120+3\\cdot (-45)=120-135=-15$: estás en números rojos.', '$120+3\\cdot (-45)=120-135=-15$: الرصيد سالب.')
    },
    {
        id: 107,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: say('Bost egunetako tenperaturak: −4, −2, 0, +3 eta −7 °C. Zein da batez bestekoa?', 'Temperaturas de cinco días: −4, −2, 0, +3 y −7 °C. ¿Cuál es la media?', `درجات الحرارة لخمسة أيام: ${n('−4, −2, 0, +3, −7')} °م. ما المتوسط؟`),
        expected: fraction(-2),
        hint: say('Batu guztiak eta zatitu 5ez.', 'Súmalas todas y divide entre 5.', 'اجمعها كلها واقسم على 5.'),
        explanation: same('$(-4-2+0+3-7)\\mathbin{:}5=(-10)\\mathbin{:}5=-2$')
    },
    {
        id: 108,
        stage: 'muldiv',
        context: 'advanced',
        points: 20,
        prompt: say('Itsaspeko bat −120 m-ra dago eta sakoneraren erdia igotzen da. Zein sakoneratan dago orain?', 'Un submarino está a −120 m y sube la mitad de su profundidad. ¿A qué profundidad está ahora?', `غواصة عند ${n('−120')} م وصعدت نصف عمقها. على أي عمق هي الآن؟`),
        expected: fraction(-60),
        hint: say('Erdia igo = 60 m igo.', 'Subir la mitad = subir 60 m.', 'صعود النصف = صعود 60 م.'),
        explanation: same('$(-120)+(+60)=-60$ m')
    },
    {
        id: 109,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: say('Lehiaketa batean erantzun zuzen bakoitzak +5 puntu ematen ditu eta oker bakoitzak −3. Mirenek 7 zuzen eta 9 oker izan ditu. Zenbat puntu ditu?', 'En un concurso cada acierto da +5 puntos y cada fallo −3. Miren ha tenido 7 aciertos y 9 fallos. ¿Cuántos puntos tiene?', `في مسابقة تعطي كل إجابة صحيحة ${n(5)} نقاط وكل خطأ ${n(-3)}. أجابت ميرين 7 إجابات صحيحة و9 خاطئة. كم نقطة لديها؟`),
        expected: fraction(8),
        hint: say('$7\\cdot (+5)+9\\cdot (-3)$', '$7\\cdot (+5)+9\\cdot (-3)$', '$7\\cdot (+5)+9\\cdot (-3)$'),
        explanation: same('$7\\cdot (+5)+9\\cdot (-3)=35-27=8$')
    },
    {
        id: 110,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: say('Bi zenbaki osoren batura −3 da eta biderkadura −10. Zein da handiena?', 'Dos números enteros suman −3 y su producto es −10. ¿Cuál es el mayor?', `مجموع عددين صحيحين ${n(-3)} وحاصل ضربهما ${n(-10)}. ما الأكبر؟`),
        expected: fraction(2),
        hint: say('Biderkadura negatiboa: zeinu desberdinak. Probatu 10en zatitzaileekin.', 'Producto negativo: signos distintos. Prueba con los divisores de 10.', 'حاصل الضرب سالب: إشارتان مختلفتان. جرّب قواسم 10.'),
        explanation: same('$(+2)+(-5)=-3 \\qquad (+2)\\cdot (-5)=-10$')
    },
    {
        id: 111,
        stage: 'addsub',
        context: 'master',
        points: 30,
        prompt: say('Batuketa-piramide batean, lauki bakoitza azpiko bien batura da. Oinarria −4, +7 eta −2 da. Zein zenbaki dago goian?', 'En una pirámide de sumas, cada casilla es la suma de las dos de abajo. La base es −4, +7 y −2. ¿Qué número hay arriba?', `في هرم جمع، كل خانة مجموع الخانتين تحتها. القاعدة ${n('−4, +7, −2')}. ما العدد في القمة؟`),
        expected: fraction(8),
        hint: say('Bigarren solairua: $(-4)+(+7)$ eta $(+7)+(-2)$.', 'Segundo piso: $(-4)+(+7)$ y $(+7)+(-2)$.', 'الطابق الثاني: $(-4)+(+7)$ و$(+7)+(-2)$.'),
        explanation: same('$+3 \\quad +5 \\;\\Rightarrow\\; (+3)+(+5)=+8$')
    },
    {
        id: 112,
        stage: 'muldiv',
        context: 'master',
        points: 30,
        prompt: say('Tenperatura +7 °C da eta orduro 2 gradu jaisten da. Zein tenperatura egongo da 6 ordu barru?', 'La temperatura es de +7 °C y baja 2 grados cada hora. ¿Qué temperatura habrá dentro de 6 horas?', `الحرارة ${n('+7 °C')} وتنخفض درجتين كل ساعة. كم ستكون بعد 6 ساعات؟`),
        expected: fraction(-5),
        hint: say('$7+6\\cdot (-2)$', '$7+6\\cdot (-2)$', '$7+6\\cdot (-2)$'),
        explanation: same('$7+6\\cdot (-2)=7-12=-5$ °C')
    }
]

export const integerIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'meaning',
        title: say('Positiboak eta negatiboak', 'Positivos y negativos', 'الموجبة والسالبة'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Adierazi zenbaki osoekin: a) jostailu-saila hirugarren sotoan dago; b) zero azpitik gradu bat dago; c) bankuan 160 € ditut.', 'Expresa con enteros: a) la sección de juguetes está en el tercer sótano; b) hace un grado bajo cero; c) tengo 160 € en el banco.', 'عبّر بأعداد صحيحة: أ) قسم الألعاب في القبو الثالث؛ ب) الحرارة درجة تحت الصفر؛ ج) لديّ 160 € في البنك.'), solution: same('a) $-3$; b) $-1\\,^{\\circ}\\mathrm{C}$; c) $+160$ €') },
            { id: 2, difficulty: 'easy', question: say('Aste bateko tenperaturak: bi gradu zero gainetik, bost gainetik, zero gradu, hiru azpitik, bi gainetik, bat azpitik eta bost gainetik. Idatzi zenbaki osoekin.', 'Temperaturas de una semana: dos sobre cero, cinco sobre cero, cero grados, tres bajo cero, dos sobre cero, uno bajo cero y cinco sobre cero. Escríbelas con enteros.', 'درجات حرارة أسبوع: اثنتان فوق الصفر، خمس فوق الصفر، صفر، ثلاث تحت الصفر، اثنتان فوق الصفر، واحدة تحت الصفر، خمس فوق الصفر. اكتبها بأعداد صحيحة.'), solution: same('$+2,\\ +5,\\ 0,\\ -3,\\ +2,\\ -1,\\ +5$') },
            { id: 3, difficulty: 'medium', question: say('Idatzi egoera bat −10erako eta beste bat +45erako.', 'Escribe una situación para −10 y otra para +45.', `اكتب موقفًا للعدد ${n(-10)} وآخر للعدد ${n(45)}.`), solution: say('Adibidez: −10 → zero azpitik 10 gradu; +45 → 45 € ditut.', 'Por ejemplo: −10 → diez grados bajo cero; +45 → tengo 45 €.', `مثلًا: ${n(-10)} ← عشر درجات تحت الصفر؛ ${n(45)} ← لديّ 45 €.`) },
            { id: 4, difficulty: 'medium', question: say('Sailkatu positiboetan, negatiboetan eta ez batean ez bestean: +4, −7, 0, −11, +8, −1.', 'Clasifica en positivos, negativos y ni una cosa ni otra: +4, −7, 0, −11, +8, −1.', `صنّف إلى موجبة وسالبة وغير ذلك: ${n('+4, −7, 0, −11, +8, −1')}.`), solution: say('Positiboak: +4, +8. Negatiboak: −7, −11, −1. Ez bat ez bestea: 0.', 'Positivos: +4, +8. Negativos: −7, −11, −1. Ni uno ni otro: 0.', `الموجبة: ${n('+4, +8')}. السالبة: ${n('−7, −11, −1')}. غير ذلك: 0.`) },
            { id: 5, difficulty: 'medium', question: say('Eraikin batek 7 solairu, beheko solairua eta 4 soto ditu. Zenbat botoi ditu igogailuak?', 'Un edificio tiene 7 plantas, planta baja y 4 sótanos. ¿Cuántos botones tiene el ascensor?', 'مبنى فيه 7 طوابق وطابق أرضي و4 أقبية. كم زرًا في المصعد؟'), solution: say('+7tik −4ra: $7+1+4=12$ botoi.', 'De +7 a −4: $7+1+4=12$ botones.', `من ${n(7)} إلى ${n(-4)}: $7+1+4=12$ زرًا.`), answer: { expected: fraction(12) } },
            { id: 6, difficulty: 'hard', question: say('Igogailua −3 solairuan dago; 7 solairu igo eta 2 jaisten da. Zein solairutan geratzen da?', 'El ascensor está en la planta −3; sube 7 plantas y baja 2. ¿En qué planta se queda?', `المصعد في الطابق ${n(-3)}؛ صعد 7 طوابق ونزل طابقين. في أي طابق توقف؟`), solution: same('$-3+7-2=+2$'), answer: { expected: fraction(2) } }
        ]
    },
    {
        id: 'line',
        title: say('Zuzena eta ordena', 'Recta y orden', 'المستقيم والترتيب'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Ordenatu txikienetik handienera: +11, −2, +8, 0, −1, +5, −6.', 'Ordena de menor a mayor: +11, −2, +8, 0, −1, +5, −6.', `رتّب من الأصغر إلى الأكبر: ${n('+11, −2, +8, 0, −1, +5, −6')}.`), solution: same('$-6<-2<-1<0<+5<+8<+11$') },
            { id: 8, difficulty: 'easy', question: say('Idatzi > edo <: +5 □ −2; −1 □ 0; −7 □ −4; +10 □ −9.', 'Escribe > o <: +5 □ −2; −1 □ 0; −7 □ −4; +10 □ −9.', `اكتب > أو <: ${n('+5 □ −2; −1 □ 0; −7 □ −4; +10 □ −9')}.`), solution: same('$+5>-2 \\quad -1<0 \\quad -7<-4 \\quad +10>-9$') },
            { id: 9, difficulty: 'medium', question: say('Idatzi −4 baino handiagoak eta +2 baino txikiagoak diren zenbaki oso guztiak.', 'Escribe todos los enteros mayores que −4 y menores que +2.', `اكتب كل الأعداد الصحيحة الأكبر من ${n(-4)} والأصغر من ${n(2)}.`), solution: same('$-3,\\ -2,\\ -1,\\ 0,\\ +1$') },
            { id: 10, difficulty: 'medium', question: say('Gehienezkoa +3 °C eta gutxienekoa −4 °C izan badira, tenperatura hauek izan al daitezke: −2, +4, −5, +1?', 'Si la máxima fue +3 °C y la mínima −4 °C, ¿pudieron marcarse −2, +4, −5 y +1?', `إذا كانت العظمى ${n('+3 °C')} والصغرى ${n('−4 °C')}، فهل أمكن تسجيل ${n('−2, +4, −5, +1')}؟`), solution: say('−2: bai. +4: ez. −5: ez. +1: bai.', '−2: sí. +4: no. −5: no. +1: sí.', `${n(-2)}: نعم. ${n(4)}: لا. ${n(-5)}: لا. ${n(1)}: نعم.`) },
            { id: 11, difficulty: 'medium', question: say('Ordenatu handienetik txikienera: −8, −16, +5, −2, +13, 0, −10.', 'Ordena de mayor a menor: −8, −16, +5, −2, +13, 0, −10.', `رتّب من الأكبر إلى الأصغر: ${n('−8, −16, +5, −2, +13, 0, −10')}.`), solution: same('$+13>+5>0>-2>-8>-10>-16$') },
            { id: 12, difficulty: 'hard', question: say('Zenbat zenbaki oso daude −6ren eta +6ren artean (bi horiek kontatu gabe)?', '¿Cuántos enteros hay entre −6 y +6 (sin contarlos a ellos)?', `كم عددًا صحيحًا بين ${n(-6)} و${n(6)} (دونهما)؟`), solution: say('−5etik +5era: 5 negatibo, zeroa eta 5 positibo = 11.', 'De −5 a +5: 5 negativos, el cero y 5 positivos = 11.', `من ${n(-5)} إلى ${n(5)}: 5 سالبة والصفر و5 موجبة = 11.`), answer: { expected: fraction(11) } }
        ]
    },
    {
        id: 'absolute',
        title: say('Balio absolutua eta aurkakoa', 'Valor absoluto y opuesto', 'القيمة المطلقة والمعاكس'),
        items: [
            { id: 13, difficulty: 'easy', question: same('$\\lvert +10\\rvert \\qquad \\lvert -8\\rvert \\qquad \\lvert -15\\rvert$'), solution: same('$10 \\qquad 8 \\qquad 15$') },
            { id: 14, difficulty: 'easy', question: say('Aurkitu aurkakoa: −3, −12, +9, +8.', 'Halla el opuesto de −3, −12, +9 y +8.', `جد المعاكس: ${n('−3, −12, +9, +8')}.`), solution: same('$+3 \\qquad +12 \\qquad -9 \\qquad -8$') },
            { id: 15, difficulty: 'medium', question: say('Alderatu balio absolutua erabiliz: −5 eta −7; +4 eta +1.', 'Compara usando el valor absoluto: −5 y −7; +4 y +1.', `قارن باستعمال القيمة المطلقة: ${n('−5, −7')}؛ ${n('+4, +1')}.`), solution: say('$\\lvert -5\\rvert <\\lvert -7\\rvert$, beraz $-5>-7$. $\\lvert +4\\rvert >\\lvert +1\\rvert$, beraz $+4>+1$.', '$\\lvert -5\\rvert <\\lvert -7\\rvert$, luego $-5>-7$. $\\lvert +4\\rvert >\\lvert +1\\rvert$, luego $+4>+1$.', '$\\lvert -5\\rvert <\\lvert -7\\rvert$ إذن $-5>-7$. $\\lvert +4\\rvert >\\lvert +1\\rvert$ إذن $+4>+1$.') },
            { id: 16, difficulty: 'medium', question: say('Ordenatu handienetik txikienera: −5, −3, −9, −11, −10.', 'Ordena de mayor a menor: −5, −3, −9, −11, −10.', `رتّب من الأكبر إلى الأصغر: ${n('−5, −3, −9, −11, −10')}.`), solution: same('$-3>-5>-9>-10>-11$') },
            { id: 17, difficulty: 'medium', question: say('Zein zenbakik dute 7ko balio absolutua?', '¿Qué números tienen valor absoluto 7?', 'ما الأعداد التي قيمتها المطلقة 7؟'), solution: say('Bi: +7 eta −7 (aurkakoak).', 'Dos: +7 y −7 (son opuestos).', `عددان: ${n(7)} و${n(-7)} (متعاكسان).`) },
            { id: 18, difficulty: 'hard', question: say('Bi zenbaki aurkako 20 unitatera daude bata bestetik. Zein dira?', 'Dos números opuestos están a 20 unidades uno del otro. ¿Cuáles son?', 'عددان متعاكسان يبعد أحدهما عن الآخر 20 وحدة. ما هما؟'), solution: say('Bakoitza zerotik 10era: +10 eta −10.', 'Cada uno a 10 del cero: +10 y −10.', `كل منهما على بعد 10 من الصفر: ${n(10)} و${n(-10)}.`) }
        ]
    },
    {
        id: 'addsub',
        title: say('Batuketak eta kenketak', 'Sumas y restas', 'الجمع والطرح'),
        items: [
            { id: 19, difficulty: 'easy', question: same('$(+5)+(+10) \\qquad (-5)+(-10) \\qquad (+7)+(-2)$'), solution: same('$+15 \\qquad -15 \\qquad +5$') },
            { id: 20, difficulty: 'easy', question: same('$(+10)-(+5) \\qquad (-1)-(-1) \\qquad (-18)-(+10)$'), solution: same('$+5 \\qquad 0 \\qquad -28$') },
            { id: 21, difficulty: 'medium', question: calculate('$-(8+9-11)$'), solution: same('$-8-9+11=-6$'), answer: { expected: fraction(-6) } },
            { id: 22, difficulty: 'medium', question: calculate('$8-(4-7)$'), solution: same('$8-4+7=11$'), answer: { expected: fraction(11) } },
            { id: 23, difficulty: 'medium', question: calculate('$(-1+2-9)-(5-5)-4+5$'), solution: same('$(-8)-0-4+5=-7$'), answer: { expected: fraction(-7) } },
            { id: 24, difficulty: 'hard', question: say('Goizeko 7etan −5 °C zeuden; eguerdira arte 12 °C igo zen eta gauean 9 °C jaitsi. Zein tenperatura zegoen gauean?', 'A las 7 de la mañana había −5 °C; hasta el mediodía subió 12 °C y por la noche bajó 9 °C. ¿Qué temperatura hacía por la noche?', `الساعة 7 صباحًا كانت ${n('−5 °C')}؛ ارتفعت 12 درجة حتى الظهر وانخفضت 9 درجات ليلًا. كم كانت ليلًا؟`), solution: same('$-5+12-9=-2$ °C'), answer: { expected: fraction(-2) } }
        ]
    },
    {
        id: 'muldiv',
        title: say('Biderketak eta zatiketak', 'Productos y cocientes', 'الضرب والقسمة'),
        items: [
            { id: 25, difficulty: 'easy', question: same('$(+7)\\cdot (+2) \\qquad (-10)\\cdot (+10) \\qquad (-1)\\cdot (-1)$'), solution: same('$+14 \\qquad -100 \\qquad +1$') },
            { id: 26, difficulty: 'easy', question: same('$(+16)\\mathbin{:}(+2) \\qquad (-25)\\mathbin{:}(+5) \\qquad (+12)\\mathbin{:}(-3)$'), solution: same('$+8 \\qquad -5 \\qquad -4$') },
            { id: 27, difficulty: 'medium', question: say('Osatu: $(-7)\\cdot \\square =+21$', 'Completa: $(-7)\\cdot \\square =+21$', 'أكمل: $(-7)\\cdot \\square =+21$'), solution: same('$(+21)\\mathbin{:}(-7)=-3$'), answer: { expected: fraction(-3) } },
            { id: 28, difficulty: 'medium', question: say('Osatu: $\\square \\mathbin{:}(-9)=+6$', 'Completa: $\\square \\mathbin{:}(-9)=+6$', 'أكمل: $\\square \\mathbin{:}(-9)=+6$'), solution: same('$(+6)\\cdot (-9)=-54$'), answer: { expected: fraction(-54) } },
            { id: 29, difficulty: 'medium', question: say('Osatu: $(-30)\\cdot \\square =+30$', 'Completa: $(-30)\\cdot \\square =+30$', 'أكمل: $(-30)\\cdot \\square =+30$'), solution: same('$(+30)\\mathbin{:}(-30)=-1$'), answer: { expected: fraction(-1) } },
            { id: 30, difficulty: 'hard', question: say('Kalkulatu $(-2)\\cdot (-3)\\cdot (-5)$. Aurretik, asmatu zeinua kalkulatu gabe.', 'Calcula $(-2)\\cdot (-3)\\cdot (-5)$. Antes, adivina el signo sin calcular.', 'احسب $(-2)\\cdot (-3)\\cdot (-5)$. قبل ذلك خمّن الإشارة دون حساب.'), solution: say('Hiru negatibo: zeinua −. $(+6)\\cdot (-5)=-30$.', 'Tres negativos: signo −. $(+6)\\cdot (-5)=-30$.', 'ثلاثة سالبة: الإشارة −. $(+6)\\cdot (-5)=-30$.'), answer: { expected: fraction(-30) } }
        ]
    }
]
