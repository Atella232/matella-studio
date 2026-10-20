import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readExponentialAnswer } from './answers'
import { exponentialAkChallenges, exponentialAkDiagnostic, exponentialAkExerciseBank, exponentialAkPractice } from './content'
import { ExponentialAkHeroArt } from './figures'
import { exponentialAkStages, exponentialAkTopics } from './lessons'

const esponentzialakUnit: UnitDefinition = {
    storagePrefix: 'matella-esponentzialak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Funtzio esponentzialak, logaritmikoak eta trigonometrikoak', es: 'Funciones exponenciales, logarítmicas y trigonométricas', ar: 'الدوال الأسية واللوغاريتمية والمثلثية' },
    documentTitle: { eu: 'Funtzio esponentzialak · 4. DBH', es: 'Funciones exponenciales · 4.º ESO', ar: 'الدوال الأسية · الصف الرابع' },
    tagline: {
        eu: 'y = aˣ eta haren lekualdaketak, hazkundea eta erdibizitza, ekuazio esponentzialak, logaritmoak eta y = log_a x, sinua, kosinua eta tangentea, anplitudea eta periodoa.',
        es: 'y = aˣ y sus traslaciones, crecimiento y semivida, ecuaciones exponenciales, logaritmos e y = log_a x, seno, coseno y tangente, amplitud y periodo.',
        ar: 'y = aˣ وانسحاباتها، والنمو وعمر النصف، والمعادلات الأسية، واللوغاريتمات وy = log_a x، والجيب وجيب التمام والظل، والسعة والدور.'
    },
    heroArt: <ExponentialAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, berreturetatik uhinetara', es: 'Cinco etapas, de las potencias a las ondas', ar: 'خمس مراحل، من القوى إلى الموجات' },
    stages: exponentialAkStages,
    topics: exponentialAkTopics,
    diagnostic: exponentialAkDiagnostic,
    guidedPractice: exponentialAkPractice,
    exerciseBank: exponentialAkExerciseBank,
    challenges: exponentialAkChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: balioa, berretzailea, parametroa, graduak edo aπ periodoaren a. Adibidez 5, −3, 2,5 edo 2/3.', es: 'Escribe un solo número: el valor, el exponente, el parámetro, los grados o la a del periodo aπ. Por ejemplo 5, −3, 2,5 o 2/3.', ar: 'اكتب عددًا واحدًا: القيمة أو الأس أو الوسيط أو الدرجات أو a في الدور aπ. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 2/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readExponentialAnswer,
        placeholder: () => ({ eu: 'Adib.: 2/3', es: 'Ej.: 2/3', ar: 'مثال: 2/3' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 2/3.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 2/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 2/3.' }
    },
    errorByStage: {
        exponential: { eu: 'a⁻ⁿ = 1/aⁿ eta a⁰ = 1. aˣ⁻ᵖ + q: p eskuinera eta q gora.', es: 'a⁻ⁿ = 1/aⁿ y a⁰ = 1. aˣ⁻ᵖ + q: p a la derecha y q hacia arriba.', ar: 'a⁻ⁿ = 1/aⁿ وa⁰ = 1. aˣ⁻ᵖ + q: p إلى اليمين وq إلى الأعلى.' },
        growth: { eu: 'Ehunekoa faktore bihurtu: % 5 igo → 1,05; % 5 jaitsi → 0,95. Ekuazioak: oinarri bera.', es: 'Pasa el porcentaje a factor: subir 5 % → 1,05; bajar 5 % → 0,95. Ecuaciones: la misma base.', ar: 'حوّل النسبة إلى معامل: زيادة 5 % ← 1.05؛ نقص 5 % ← 0.95. المعادلات: الأساس نفسه.' },
        logarithmic: { eu: 'log_a x = y ⇔ aʸ = x. Barrukoak positiboa izan behar du.', es: 'log_a x = y ⇔ aʸ = x. Lo de dentro tiene que ser positivo.', ar: 'log_a x = y ⇔ aʸ = x. يجب أن يكون ما بالداخل موجبًا.' },
        trigonometric: { eu: 'π rad = 180°. Puntua (cos x, sin x) da; buelta bat kendu (2π) eta begiratu koadranteari.', es: 'π rad = 180°. El punto es (cos x, sen x); quita vueltas (2π) y mira el cuadrante.', ar: 'π rad = 180°. النقطة (cos x, sin x)؛ احذف الدورات (2π) وانظر إلى الربع.' },
        transforms: { eu: 'A · sin x + d: [d − |A|, d + |A|]. sin kx: periodoa 2π/k. tg x: periodoa π.', es: 'A · sen x + d: [d − |A|, d + |A|]. sen kx: periodo 2π/k. tg x: periodo π.', ar: 'A · sin x + d: [d − |A|, d + |A|]. sin kx: الدور 2π/k. tan x: الدور π.' }
    }
}

export function EsponentzialakDbh4AkIntroPage() {
    return <UnitPage unit={esponentzialakUnit} />
}
