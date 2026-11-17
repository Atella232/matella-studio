import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake
   and the «Check it» question of the lesson of this unit (the others come
   from the Ciencias twin with their own). Plain data so the tests can
   import it; lessons.tsx merges it into the topic. New numbers, never
   those of «Let's solve» or of the example.
   ========================================================================== */

export type GizarteDeterminanteakTopicId = 'unique-prices'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const gizarteDeterminanteakLessonChecks: Record<GizarteDeterminanteakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'unique-prices': {
        mistake: {
            wrong: say(
                'Bi sorta ditut eta bi prezio falta zaizkit: bi ekuazio eta bi ezezagun. Beraz, prezioak beti ondorioztatzen dira.',
                'Tengo dos lotes y me faltan dos precios: dos ecuaciones y dos incógnitas. Así que los precios siempre se deducen.',
                'لديّ مجموعتان وينقصني سعران: معادلتان ومجهولان. إذن تُستنتج الأسعار دائمًا.',
                'I have two bundles and two prices are missing: two equations and two unknowns. So the prices can always be found.'
            ),
            right: say(
                'Ez beti: $|A|=0$ bada, sorta bat bestearen multiploa da eta ez du informazio berririk ematen. Prezioak bakarrak dira $|A|\\neq 0$ denean bakarrik.',
                'No siempre: si $|A|=0$, un lote es múltiplo del otro y no da información nueva. Los precios son únicos solo cuando $|A|\\neq 0$.',
                'ليس دائمًا: إذا كان $|A|=0$ فإحدى المجموعتين مضاعف للأخرى ولا تعطي معلومة جديدة. والأسعار وحيدة فقط عندما يكون $|A|\\neq 0$.',
                'Not always: if $|A|=0$, one bundle is a multiple of the other and gives no new information. The prices are unique only when $|A|\\neq 0$.'
            )
        },
        check: {
            prompt: say(
                'Sorta batek 2 koaderno eta 3 boligrafo ditu, eta besteak 4 koaderno eta 6 boligrafo. Ondoriozta al daitezke prezioak bi sorten prezioetatik?',
                'Un lote trae 2 cuadernos y 3 bolígrafos, y otro, 4 cuadernos y 6 bolígrafos. ¿Se pueden deducir los precios a partir de lo que cuestan los dos lotes?',
                'مجموعة فيها دفتران و3 أقلام، وأخرى فيها 4 دفاتر و6 أقلام. هل يمكن استنتاج الأسعار مما تكلّفه المجموعتان؟',
                'One bundle has 2 notebooks and 3 pens, and another 4 notebooks and 6 pens. Can the prices be found from what the two bundles cost?'
            ),
            options: [
                say('Bai, $|A|=24$ delako', 'Sí, porque $|A|=24$', 'نعم، لأن $|A|=24$', 'Yes, because $|A|=24$'),
                say('Ez, $|A|=0$ delako', 'No, porque $|A|=0$', 'لا، لأن $|A|=0$', 'No, because $|A|=0$'),
                say('Bai, bi ekuazio daudelako', 'Sí, porque hay dos ecuaciones', 'نعم، لأن هناك معادلتين', 'Yes, because there are two equations')
            ],
            correctIndex: 1,
            explanation: say(
                '$|A|=2\\cdot 6-3\\cdot 4=0$: bigarren sorta lehenaren bikoitza da, eta ez du ezer berririk esaten.',
                '$|A|=2\\cdot 6-3\\cdot 4=0$: el segundo lote es el doble del primero y no dice nada nuevo.',
                '$|A|=2\\cdot 6-3\\cdot 4=0$: المجموعة الثانية ضعف الأولى ولا تقول شيئًا جديدًا.',
                '$|A|=2\\cdot 6-3\\cdot 4=0$: the second bundle is twice the first and says nothing new.'
            )
        }
    }
}
