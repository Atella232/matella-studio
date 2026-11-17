import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak — the typical mistake
   and the «Check it» question of the five lessons of its own. The other
   eleven lessons come from 1.º Ciencias (batx1-zientziak-errealak) with their
   own mistakes and questions. Plain data (no JSX) so the tests can import it.
   ========================================================================== */

export type GizRealsTopicId = 'number-kinds' | 'set-language' | 'radical-power' | 'log-integer' | 'big-numbers'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizRealsLessonChecks: Record<GizRealsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'number-kinds': {
        mistake: {
            wrong: say('$\\sqrt{81}$ irrazionala da, erro bat delako.', '$\\sqrt{81}$ es irracional porque es una raíz.', '$\\sqrt{81}$ غير نسبي لأنه جذر.', '$\\sqrt{81}$ is irrational because it is a root.'),
            right: say('Lehenik sinplifikatu: $\\sqrt{81}=9$, zenbaki arrunta da. Erro bat irrazionala da emaitza zehatza ez denean.', 'Simplifica primero: $\\sqrt{81}=9$, es natural. Una raíz es irracional solo si no sale exacta.', 'بسّط أولًا: $\\sqrt{81}=9$ عدد طبيعي. يكون الجذر غير نسبي فقط إذا لم يكن ناتجه تامًا.', 'Simplify first: $\\sqrt{81}=9$, a natural number. A root is irrational only when it does not come out exact.')
        },
        check: {
            prompt: say('Zenbaki hauetatik, zein ez da erreala?', '¿Cuál de estos números no es real?', 'أيّ هذه الأعداد ليس حقيقيًا؟', 'Which of these numbers is not real?'),
            options: [same('$\\sqrt{-16}$'), same('$\\sqrt[3]{-27}$'), same('$-\\sqrt{16}$')],
            correctIndex: 0,
            explanation: say('$\\sqrt[3]{-27}$ zenbakia $-3$ da, eta $-\\sqrt{16}$ zenbakia $-4$. Baina karratura berretuta $-16$ ematen duen zenbakirik ez dago.', '$\\sqrt[3]{-27}$ es $-3$ y $-\\sqrt{16}$ es $-4$. Pero ningún número al cuadrado da $-16$.', '$\\sqrt[3]{-27}$ يساوي $-3$ و$-\\sqrt{16}$ يساوي $-4$. لكن لا يوجد عدد مربعه $-16$.', '$\\sqrt[3]{-27}$ is $-3$ and $-\\sqrt{16}$ is $-4$. But no number squared gives $-16$.')
        }
    },
    'set-language': {
        mistake: {
            wrong: say('$\\{x\\in\\mathbb{Z}\\mid 2<x\\le 6\\}$ multzoan 2, 3, 4, 5 eta 6 daude.', 'En $\\{x\\in\\mathbb{Z}\\mid 2<x\\le 6\\}$ están el 2, el 3, el 4, el 5 y el 6.', 'في $\\{x\\in\\mathbb{Z}\\mid 2<x\\le 6\\}$ توجد الأعداد 2 و3 و4 و5 و6.', 'The set $\\{x\\in\\mathbb{Z}\\mid 2<x\\le 6\\}$ has 2, 3, 4, 5 and 6.'),
            right: say('$<$ ikurrak muturra kanpoan uzten du: 2 ez dago. Multzoa $\\{3,4,5,6\\}$ da.', 'El signo $<$ deja fuera el extremo: el 2 no entra. El conjunto es $\\{3,4,5,6\\}$.', 'الرمز $<$ يُخرج الطرف: العدد 2 لا يدخل. المجموعة هي $\\{3,4,5,6\\}$.', 'The sign $<$ leaves the endpoint out: 2 is not in. The set is $\\{3,4,5,6\\}$.')
        },
        check: {
            prompt: say('Zenbat elementu ditu $\\{x\\in\\mathbb{N}\\mid 1<x\\le 9\\}$ multzoak?', '¿Cuántos elementos tiene $\\{x\\in\\mathbb{N}\\mid 1<x\\le 9\\}$?', 'كم عنصرًا في $\\{x\\in\\mathbb{N}\\mid 1<x\\le 9\\}$؟', 'How many elements does $\\{x\\in\\mathbb{N}\\mid 1<x\\le 9\\}$ have?'),
            options: [same('$9$'), same('$8$'), same('$7$')],
            correctIndex: 1,
            explanation: say('Zenbaki arrunt hauek: 2, 3, 4, 5, 6, 7, 8 eta 9. Zortzi dira; 1 ez dago barruan.', 'Los naturales del 2 al 9: 2, 3, 4, 5, 6, 7, 8 y 9. Son ocho; el 1 no entra.', 'الأعداد الطبيعية من 2 إلى 9: ‏2 و3 و4 و5 و6 و7 و8 و9. إنها ثمانية، والعدد 1 لا يدخل.', 'The natural numbers from 2 to 9: 2, 3, 4, 5, 6, 7, 8 and 9. There are eight; 1 is not in.')
        }
    },
    'radical-power': {
        mistake: {
            wrong: same('$\\sqrt[3]{x^{2}}=x^{\\frac{3}{2}}$'),
            right: say('Indizea izendatzailera doa eta berretzailea zenbakitzailera: $\\sqrt[3]{x^{2}}=x^{\\frac{2}{3}}$.', 'El índice va al denominador y el exponente al numerador: $\\sqrt[3]{x^{2}}=x^{\\frac{2}{3}}$.', 'الدليل يذهب إلى المقام والأس إلى البسط: $\\sqrt[3]{x^{2}}=x^{\\frac{2}{3}}$.', 'The index goes to the denominator and the exponent to the numerator: $\\sqrt[3]{x^{2}}=x^{\\frac{2}{3}}$.')
        },
        check: {
            prompt: say('Zer da $\\sqrt[4]{a^{3}}\\cdot\\sqrt{a}$ berretura bakar gisa?', '¿Qué es $\\sqrt[4]{a^{3}}\\cdot\\sqrt{a}$ como una sola potencia?', 'ما $\\sqrt[4]{a^{3}}\\cdot\\sqrt{a}$ على صورة قوة واحدة؟', 'What is $\\sqrt[4]{a^{3}}\\cdot\\sqrt{a}$ as a single power?'),
            options: [same('$a^{\\frac{3}{8}}$'), same('$a^{2}$'), same('$a^{\\frac{5}{4}}$')],
            correctIndex: 2,
            explanation: say('Berretzaileak batu: $\\frac{3}{4}+\\frac{1}{2}=\\frac{5}{4}$.', 'Se suman los exponentes: $\\frac{3}{4}+\\frac{1}{2}=\\frac{5}{4}$.', 'تُجمع الأسس: $\\frac{3}{4}+\\frac{1}{2}=\\frac{5}{4}$.', 'Add the exponents: $\\frac{3}{4}+\\frac{1}{2}=\\frac{5}{4}$.')
        }
    },
    'log-integer': {
        mistake: {
            wrong: say('$\\log 0{,}05$ zero eta bat artean dago, $0{,}05$ zero eta bat artean dagoelako.', '$\\log 0{,}05$ está entre 0 y 1 porque $0{,}05$ está entre 0 y 1.', '$\\log 0{,}05$ بين 0 و1 لأن $0{,}05$ بين 0 و1.', '$\\log 0{,}05$ is between 0 and 1 because $0{,}05$ is between 0 and 1.'),
            right: say('Begiratu 10 zenbakiaren berreturei: $10^{-2}<0{,}05<10^{-1}$, beraz $\\log 0{,}05$ zenbakia $-2$ eta $-1$ artean dago.', 'Mira las potencias de 10: $10^{-2}<0{,}05<10^{-1}$, así que $\\log 0{,}05$ está entre $-2$ y $-1$.', 'انظر إلى قوى 10: $10^{-2}<0{,}05<10^{-1}$، إذن $\\log 0{,}05$ بين $-2$ و$-1$.', 'Look at the powers of 10: $10^{-2}<0{,}05<10^{-1}$, so $\\log 0{,}05$ is between $-2$ and $-1$.')
        },
        check: {
            prompt: say('Zein da $\\log_3 200$ logaritmoaren zati osoa?', '¿Cuál es la parte entera de $\\log_3 200$?', 'ما الجزء الصحيح من $\\log_3 200$؟', 'What is the whole-number part of $\\log_3 200$?'),
            options: [same('$66$'), same('$4$'), same('$5$')],
            correctIndex: 1,
            explanation: say('$3^{4}=81$ eta $3^{5}=243$; 200 bien artean dago, beraz $\\log_3 200=4{,}8\\ldots$', '$3^{4}=81$ y $3^{5}=243$; 200 está entre los dos, así que $\\log_3 200=4{,}8\\ldots$', '$3^{4}=81$ و$3^{5}=243$، و200 بينهما، إذن $\\log_3 200=4{,}8\\ldots$', '$3^{4}=81$ and $3^{5}=243$; 200 is between them, so $\\log_3 200=4{,}8\\ldots$')
        }
    },
    'big-numbers': {
        mistake: {
            wrong: same('$56\\cdot 10^{6}=5{,}6\\cdot 10^{5}$'),
            right: say('Koma ezkerrera mugitzean zenbakia txikiagoa da, beraz berretzaileak igo egin behar du: $56\\cdot 10^{6}=5{,}6\\cdot 10^{7}$.', 'Al mover la coma a la izquierda el número se hace más pequeño, así que el exponente tiene que subir: $56\\cdot 10^{6}=5{,}6\\cdot 10^{7}$.', 'عند تحريك الفاصلة إلى اليسار يصغر العدد، لذا يجب أن يزيد الأس: $56\\cdot 10^{6}=5{,}6\\cdot 10^{7}$.', 'Moving the decimal point to the left makes the number smaller, so the exponent has to go up: $56\\cdot 10^{6}=5{,}6\\cdot 10^{7}$.')
        },
        check: {
            prompt: say('Herrialde batek $6\\cdot 10^{9}$ euroko aurrekontua du, eta $1{,}2\\cdot 10^{6}$ biztanle. Zenbat euro dagokio biztanle bakoitzari?', 'Un país tiene un presupuesto de $6\\cdot 10^{9}$ euros y $1{,}2\\cdot 10^{6}$ habitantes. ¿Cuántos euros tocan por habitante?', 'لدولة ميزانية قدرها $6\\cdot 10^{9}$ يورو وعدد سكانها $1{,}2\\cdot 10^{6}$. كم يورو نصيب كل ساكن؟', 'A country has a budget of $6\\cdot 10^{9}$ euros and $1{,}2\\cdot 10^{6}$ inhabitants. How many euros is that per inhabitant?'),
            options: [same('$5\\cdot 10^{3}$'), same('$5\\cdot 10^{15}$'), same('$7{,}2\\cdot 10^{3}$')],
            correctIndex: 0,
            explanation: say('$\\frac{6}{1{,}2}=5$ eta $10^{9-6}=10^{3}$: $5\\cdot 10^{3}$, hau da, 5000 euro.', '$\\frac{6}{1{,}2}=5$ y $10^{9-6}=10^{3}$: $5\\cdot 10^{3}$, es decir, 5000 euros.', '$\\frac{6}{1{,}2}=5$ و$10^{9-6}=10^{3}$: ‏$5\\cdot 10^{3}$، أي 5000 يورو.', '$\\frac{6}{1{,}2}=5$ and $10^{9-6}=10^{3}$: $5\\cdot 10^{3}$, that is, €5,000.')
        }
    }
}
