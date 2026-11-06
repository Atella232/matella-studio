import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. Formulas
   write \sin (localizeNames gives each language its name). The questions
   use new numbers, never those of «Let's solve» or of the example, and one
   of their wrong answers is the lesson's typical mistake. A prompt with a
   complex number carries two formulas or more: the shared tests read i as
   a letter that could take any value. The values are checked in
   tests/konplexuak-batx1z-content.test.ts.
   ========================================================================== */

export type ComplexTopicId =
    | 'imaginary-unit' | 'binomial-form' | 'complex-plane'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const complexLessonChecks: Record<ComplexTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. New numbers ---------- */
    'imaginary-unit': {
        mistake: {
            wrong: same('$\\sqrt{-4}\\cdot\\sqrt{-9}=\\sqrt{36}=6$'),
            right: say('Lehenik idatzi erro bakoitza $i$ unitatearekin: $2i\\cdot 3i=6i^2=-6$.', 'Primero escribe cada raíz con $i$: $2i\\cdot 3i=6i^2=-6$.', 'اكتب أولًا كل جذر بالوحدة $i$: $2i\\cdot 3i=6i^2=-6$.', 'First write each root with $i$: $2i\\cdot 3i=6i^2=-6$.')
        },
        check: {
            prompt: say('Zenbat da $\\sqrt{-25}$, $i$ erabilita?', '¿Cuánto vale $\\sqrt{-25}$, usando $i$?', 'كم يساوي $\\sqrt{-25}$ باستعمال $i$؟', 'What is $\\sqrt{-25}$, using $i$?'),
            options: [same('$-5$'), same('$5i$'), same('$25i$')],
            correctIndex: 1,
            explanation: same('$\\sqrt{-25}=\\sqrt{25}\\cdot\\sqrt{-1}=5i$')
        }
    },
    'binomial-form': {
        mistake: {
            wrong: same('$\\overline{3-5i}=-3+5i$'),
            right: say('Hori aurkakoa da. Konjokatuak zati irudikariaren zeinua bakarrik aldatzen du: $\\overline{3-5i}=3+5i$.', 'Ese es el opuesto. El conjugado solo cambia el signo de la parte imaginaria: $\\overline{3-5i}=3+5i$.', 'هذا هو المعاكس. المرافق يغيّر إشارة الجزء التخيلي فقط: $\\overline{3-5i}=3+5i$.', 'That is the opposite. The conjugate changes only the sign of the imaginary part: $\\overline{3-5i}=3+5i$.')
        },
        check: {
            prompt: say('${z}=-6-i$ bada, zein da $\\overline{z}$?', 'Si ${z}=-6-i$, ¿cuál es $\\overline{z}$?', 'إذا كان ${z}=-6-i$، فما $\\overline{z}$؟', 'If ${z}=-6-i$, what is $\\overline{z}$?'),
            options: [same('$6+i$'), same('$6-i$'), same('$-6+i$')],
            correctIndex: 2,
            explanation: say('Zati erreala berdin geratzen da, eta zati irudikariak zeinua aldatzen du.', 'La parte real se queda igual y la imaginaria cambia de signo.', 'يبقى الجزء الحقيقي كما هو ويغيّر الجزء التخيلي إشارته.', 'The real part stays the same and the imaginary part changes sign.')
        }
    },
    'complex-plane': {
        mistake: {
            wrong: say('$2-3i$ zenbakiaren afixua: $(-3,\\ 2)$', 'El afijo de $2-3i$: $(-3,\\ 2)$', 'صورة $2-3i$: $(-3,\\ 2)$', 'The affix of $2-3i$: $(-3,\\ 2)$'),
            right: say('Lehenik zati erreala doa, ardatz horizontalean: $(2,\\ -3)$.', 'Primero va la parte real, en el eje horizontal: $(2,\\ -3)$.', 'الجزء الحقيقي أولًا، على المحور الأفقي: $(2,\\ -3)$.', 'The real part goes first, on the horizontal axis: $(2,\\ -3)$.')
        },
        check: {
            prompt: say('Zein koadrantetan dago $-4+i$ zenbakiaren konjokatua?', '¿En qué cuadrante está el conjugado de $-4+i$?', 'في أي ربع يقع مرافق $-4+i$؟', 'Which quadrant is the conjugate of $-4+i$ in?'),
            options: [say('Hirugarrenean', 'En el tercero', 'في الثالث', 'The third'), say('Bigarrenean', 'En el segundo', 'في الثاني', 'The second'), say('Laugarrenean', 'En el cuarto', 'في الرابع', 'The fourth')],
            correctIndex: 0,
            explanation: say('Konjokatua $-4-i$ da: zati erreala eta irudikaria negatiboak.', 'El conjugado es $-4-i$: parte real e imaginaria negativas.', 'المرافق هو $-4-i$: الجزآن الحقيقي والتخيلي سالبان.', 'The conjugate is $-4-i$: real and imaginary parts negative.')
        }
    }
}
