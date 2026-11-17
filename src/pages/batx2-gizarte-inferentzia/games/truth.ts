import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   I-J1 · Egia ala gezurra? (¿Verdadero o falso?): a sentence about a
   confidence interval. Level 1: what the confidence means (fixed
   sentences, half of them true). Level 2: what happens to the interval
   when the level, n or σ change. Level 3: sentences with the numbers of a
   given interval (its midpoint, its error, whether a value fits). Every
   round carries why. Pure logic.
   ========================================================================== */

export const TRUTH_ROUNDS = 8

export interface TruthRound {
    context?: LocalizedText
    sentence: LocalizedText
    truth: boolean
    why: LocalizedText
}

const fact = (sentence: LocalizedText, truth: boolean, why: LocalizedText): TruthRound => ({ sentence, truth, why })

const MEANING: TruthRound[] = [
    fact(say('% 95 mailako tarte bat lortu ondoren, $\\mu$ barruan egoteko probabilitatea $0{,}95$ da.', 'Una vez obtenido un intervalo al 95 %, la probabilidad de que $\\mu$ esté dentro es $0{,}95$.', 'بعد الحصول على فترة عند 95 %، احتمال أن يكون $\\mu$ داخلها هو $0{,}95$.', 'Once a 95% interval is obtained, the probability that $\\mu$ is inside is $0{,}95$.'), false, say('$\\mu$ finkoa da: barruan dago ala ez. $0{,}95$ metodoari dagokio.', '$\\mu$ es fijo: está o no está. El $0{,}95$ es del método.', '$\\mu$ ثابت: إما داخلها أو لا. و$0{,}95$ تخص الطريقة.', '$\\mu$ is fixed: it is in or not. The $0{,}95$ belongs to the method.')),
    fact(say('Lagin asko hartuz gero, % 95 mailako tarteen % 95 inguruk harrapatzen dute $\\mu$.', 'Si se toman muchas muestras, cerca del 95 % de los intervalos al 95 % atrapan $\\mu$.', 'إذا أُخذت عيّنات كثيرة تلتقط نحو 95 % من فترات 95 % القيمة $\\mu$.', 'If many samples are taken, about 95% of the 95% intervals catch $\\mu$.'), true, say('Horixe da konfiantza-maila.', 'Eso es justo el nivel de confianza.', 'هذا هو مستوى الثقة بالضبط.', 'That is exactly the confidence level.')),
    fact(say('Laginaren batez bestekoa, $\\bar{x}$, beti dago tartearen barruan.', 'La media muestral $\\bar{x}$ siempre está dentro del intervalo.', 'متوسط العيّنة $\\bar{x}$ دائمًا داخل الفترة.', 'The sample mean $\\bar{x}$ is always inside the interval.'), true, say('Tartearen erdiko puntua da.', 'Es el punto medio del intervalo.', 'إنه منتصف الفترة.', 'It is the midpoint of the interval.')),
    fact(say('% 95 mailako tartean daude datuen % 95.', 'En el intervalo al 95 % están el 95 % de los datos.', 'في فترة 95 % يقع 95 % من البيانات.', 'The 95% interval holds 95% of the data.'), false, say('Tarteak $\\mu$ estimatzen du, ez datuak: datuak askoz sakabanatuago daude.', 'El intervalo estima $\\mu$, no los datos: los datos están mucho más dispersos.', 'الفترة تقدّر $\\mu$ لا البيانات: البيانات أكثر تشتتًا بكثير.', 'The interval estimates $\\mu$, not the data: the data are far more spread out.')),
    fact(say('Beste lagin batek beste tarte bat emango luke.', 'Otra muestra daría otro intervalo.', 'عيّنة أخرى تعطي فترة أخرى.', 'Another sample would give another interval.'), true, say('$\\bar{x}$ lagin batetik bestera aldatzen da.', '$\\bar{x}$ cambia de una muestra a otra.', '$\\bar{x}$ يتغير من عيّنة إلى أخرى.', '$\\bar{x}$ changes from one sample to another.')),
    fact(say('$\\mu$ aldatu egiten da lagin batetik bestera.', '$\\mu$ cambia de una muestra a otra.', '$\\mu$ يتغير من عيّنة إلى أخرى.', '$\\mu$ changes from one sample to another.'), false, say('$\\mu$ populazioarena da eta finkoa da; tartea da aldatzen dena.', '$\\mu$ es de la población y es fijo; lo que cambia es el intervalo.', '$\\mu$ للمجتمع وهو ثابت؛ والذي يتغير هو الفترة.', '$\\mu$ belongs to the population and is fixed; the interval is what changes.')),
    fact(say('% 99 mailako 100 tartetik, 1 inguruk ez du $\\mu$ harrapatzen.', 'De 100 intervalos al 99 %, alrededor de 1 no atrapa $\\mu$.', 'من 100 فترة عند 99 %، نحو 1 لا تلتقط $\\mu$.', 'Of 100 intervals at 99%, about 1 misses $\\mu$.'), true, say('$100\\cdot 0{,}01=1$', '$100\\cdot 0{,}01=1$', '$100\\cdot 0{,}01=1$', '$100\\cdot 0{,}01=1$')),
    fact(say('% 100 mailako tartea da onena.', 'El mejor intervalo es el del 100 %.', 'أفضل فترة هي فترة 100 %.', 'The best interval is the 100% one.'), false, say('% 100 izateko, tartea infinitua litzateke: ez du ezer esaten.', 'Para el 100 % el intervalo sería infinito: no diría nada.', 'لتكون 100 % يجب أن تكون الفترة لا نهائية: لا تقول شيئًا.', 'For 100% the interval would be endless: it would say nothing.')),
    fact(say('Tarteak $\\mu$ harrapatzen ez badu, kalkuluan akats bat dago.', 'Si el intervalo no atrapa $\\mu$, hay un error de cálculo.', 'إذا لم تلتقط الفترة $\\mu$ فهناك خطأ حسابي.', 'If the interval misses $\\mu$, there is a calculation mistake.'), false, say('Ez: zoriz, tarte batzuek huts egiten dute ($\\alpha$ proportzioan).', 'No: por azar, algunos intervalos fallan (en proporción $\\alpha$).', 'لا: بالصدفة تخطئ بعض الفترات (بنسبة $\\alpha$).', 'No: by chance, some intervals miss (a share $\\alpha$ of them).')),
    fact(say('Estimazio puntualak ez du esaten zenbat huts egin dezakeen.', 'Una estimación puntual no dice cuánto puede fallar.', 'التقدير النقطي لا يقول كم قد يخطئ.', 'A point estimate does not say how far off it may be.'), true, say('Horregatik ematen da tarte bat, errorearekin.', 'Por eso se da un intervalo, con su error.', 'لذلك نعطي فترة بخطئها.', 'That is why an interval is given, with its error.'))
]

const CHANGES: TruthRound[] = [
    fact(say('Maila % 90 izatetik % 99 izatera pasatzean, tartea estutu egiten da.', 'Al pasar del 90 % al 99 %, el intervalo se estrecha.', 'عند الانتقال من 90 % إلى 99 % تضيق الفترة.', 'Going from 90% to 99%, the interval gets narrower.'), false, say('Balio kritikoa handitzen da: tartea zabaltzen da.', 'El valor crítico crece: el intervalo se ensancha.', 'تكبر القيمة الحرجة: تتسع الفترة.', 'The critical value grows: the interval widens.')),
    fact(say('$n$ lau aldiz handiagoa bada, errorea erdia da.', 'Si $n$ es cuatro veces mayor, el error es la mitad.', 'إذا كان $n$ أكبر بأربع مرات فالخطأ نصفه.', 'If $n$ is four times bigger, the error is half.'), true, say('$\\sqrt{4}=2$', '$\\sqrt{4}=2$', '$\\sqrt{4}=2$', '$\\sqrt{4}=2$')),
    fact(say('$n$ bikoizten bada, errorea erdia da.', 'Si $n$ se duplica, el error es la mitad.', 'إذا تضاعف $n$ فالخطأ نصفه.', 'If $n$ doubles, the error halves.'), false, say('Errorea $\\sqrt{2}$ zenbakiaz zatitzen da, ez 2 zenbakiaz.', 'El error se divide entre $\\sqrt{2}$, no entre 2.', 'يُقسم الخطأ على $\\sqrt{2}$ لا على 2.', 'The error is divided by $\\sqrt{2}$, not by 2.')),
    fact(say('$\\sigma$ bikoizten bada, errorea bikoizten da.', 'Si $\\sigma$ se duplica, el error se duplica.', 'إذا تضاعف $\\sigma$ تضاعف الخطأ.', 'If $\\sigma$ doubles, the error doubles.'), true, say('$E$ eta $\\sigma$ proportzionalak dira.', '$E$ y $\\sigma$ son proporcionales.', '$E$ و$\\sigma$ متناسبان.', '$E$ and $\\sigma$ are proportional.')),
    fact(say('Lagina handitzean, konfiantza-maila handitzen da.', 'Al agrandar la muestra, sube el nivel de confianza.', 'بتكبير العيّنة يرتفع مستوى الثقة.', 'Making the sample bigger raises the confidence level.'), false, say('Maila guk aukeratzen dugu; lagina handitzean, errorea da txikitzen dena.', 'El nivel lo elegimos nosotros; al agrandar la muestra, lo que baja es el error.', 'نحن نختار المستوى؛ وبتكبير العيّنة يصغر الخطأ.', 'We choose the level; a bigger sample lowers the error.')),
    fact(say('Errore bera mantenduz maila igotzeko, lagin handiagoa behar da.', 'Para subir el nivel manteniendo el error, hace falta más muestra.', 'لرفع المستوى مع الحفاظ على الخطأ نحتاج عيّنة أكبر.', 'To raise the level while keeping the error, you need a bigger sample.'), true, say('$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$ hazten da.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$ crece.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$ يكبر.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$ grows.')),
    fact(say('Proportzioetan, errorea handiena da $\\hat{p}=0{,}5$ denean.', 'En proporciones, el error es máximo cuando $\\hat{p}=0{,}5$.', 'في النسب يكون الخطأ أكبر ما يمكن عندما $\\hat{p}=0{,}5$.', 'For proportions, the error is largest when $\\hat{p}=0{,}5$.'), true, say('$\\hat{p}\\hat{q}$ handiena $0{,}5$ zenbakian dago.', '$\\hat{p}\\hat{q}$ es máximo en $0{,}5$.', '$\\hat{p}\\hat{q}$ أكبر ما يمكن عند $0{,}5$.', '$\\hat{p}\\hat{q}$ is largest at $0{,}5$.')),
    fact(say('Maila jaistean, tarteak $\\mu$ gehiagotan harrapatzen du.', 'Al bajar el nivel, el intervalo atrapa $\\mu$ más veces.', 'بخفض المستوى تلتقط الفترة $\\mu$ مرات أكثر.', 'Lowering the level makes the interval catch $\\mu$ more often.'), false, say('Tartea estuagoa da: gutxiagotan harrapatzen du.', 'El intervalo es más estrecho: acierta menos veces.', 'الفترة أضيق: تصيب مرات أقل.', 'The interval is narrower: it is right less often.')),
    fact(say('$n$ bider 9 egitean, errorea hiru aldiz txikiagoa da.', 'Al multiplicar $n$ por 9, el error es tres veces menor.', 'بضرب $n$ في 9 يصبح الخطأ أصغر بثلاث مرات.', 'Multiplying $n$ by 9 makes the error three times smaller.'), true, say('$\\sqrt{9}=3$', '$\\sqrt{9}=3$', '$\\sqrt{9}=3$', '$\\sqrt{9}=3$')),
    fact(say('Errorea ez dago $\\sigma$ zenbakiaren mende.', 'El error no depende de $\\sigma$.', 'الخطأ لا يعتمد على $\\sigma$.', 'The error does not depend on $\\sigma$.'), false, say('$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: $\\sigma$ zenbakitzailean dago.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: $\\sigma$ está en el numerador.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: $\\sigma$ في البسط.', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: $\\sigma$ is in the numerator.'))
]

/** A round with the numbers of an interval: its midpoint, its error or whether a value fits */
function numberRound(random: Random): TruthRound | null {
    const level = pick(random, [90, 95, 99] as const)
    const z = criticalZ(level)
    const root = pick(random, [4, 5, 10])
    const sd = root * pick(random, [1, 2, 3])
    const mean = 10 * randomInt(random, 3, 20)
    const error = (z * sd) / root
    const low = mean - error
    const high = mean + error
    const d = decimalLatex
    const context = say(`% ${level} mailako tartea: $(${d(low)};\\ ${d(high)})$.`, `Intervalo al ${level} %: $(${d(low)};\\ ${d(high)})$.`, `فترة ${level} %: $(${d(low)};\\ ${d(high)})$.`, `${level}% interval: $(${d(low)};\\ ${d(high)})$.`)
    const kind = pick(random, ['mean', 'error', 'fits'] as const)
    const truth = random() < 0.5
    if (kind === 'mean') {
        const shown = truth ? mean : pick(random, [low, high])
        return { context, sentence: say(`$\\bar{x}=${d(shown)}$`, `$\\bar{x}=${d(shown)}$`, `$\\bar{x}=${d(shown)}$`, `$\\bar{x}=${d(shown)}$`), truth, why: same(`$\\bar{x}=\\frac{${d(low)}+${d(high)}}{2}=${d(mean)}$`) }
    }
    if (kind === 'error') {
        const shown = truth ? error : 2 * error
        return { context, sentence: say(`$E=${d(shown)}$`, `$E=${d(shown)}$`, `$E=${d(shown)}$`, `$E=${d(shown)}$`), truth, why: same(`$E=\\frac{${d(high)}-${d(low)}}{2}=${d(error)}$`) }
    }
    const value = truth ? mean + pick(random, [-0.5, 0.5]) * error : mean + pick(random, [-1, 1]) * (error + pick(random, [1, 2, 3]))
    const shown = Math.round(value * 1000) / 1000
    if (Math.abs(shown - mean) > error - 1e-9 && truth) return null
    return {
        context,
        sentence: say(`$\\mu=${d(shown)}$ balioa bateragarria da.`, `El valor $\\mu=${d(shown)}$ es compatible.`, `القيمة $\\mu=${d(shown)}$ متوافقة.`, `The value $\\mu=${d(shown)}$ is compatible.`),
        truth,
        why: truth ? say('Tartearen barruan dago.', 'Está dentro del intervalo.', 'إنها داخل الفترة.', 'It is inside the interval.') : say('Tartetik kanpo dago.', 'Está fuera del intervalo.', 'إنها خارج الفترة.', 'It is outside the interval.')
    }
}

function same(text: string) {
    return say(text, text, text, text)
}

/** Eight rounds of a level: about half true */
export function createTruthRounds(random: Random, level: number): TruthRound[] {
    if (level < 2) {
        const pool = level === 0 ? MEANING : CHANGES
        const trues = shuffle(random, pool.filter((round) => round.truth)).slice(0, TRUTH_ROUNDS / 2)
        const falses = shuffle(random, pool.filter((round) => !round.truth)).slice(0, TRUTH_ROUNDS / 2)
        return shuffle(random, [...trues, ...falses])
    }
    const rounds: TruthRound[] = []
    for (let attempt = 0; rounds.length < TRUTH_ROUNDS && attempt < 3000; attempt += 1) {
        const round = numberRound(random)
        if (!round || rounds.some((other) => other.sentence.es === round.sentence.es)) continue
        if (rounds.filter((other) => other.truth === round.truth).length >= TRUTH_ROUNDS / 2) continue
        rounds.push(round)
    }
    return rounds
}

export const TRUTH_POOLS = { MEANING, CHANGES }
