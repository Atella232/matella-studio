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
    | 'add-multiply' | 'division' | 'powers-of-i' | 'quadratic-complex'
    | 'modulus-argument' | 'polar-binomial'
    | 'product-quotient' | 'rotations' | 'de-moivre'
    | 'nth-roots' | 'roots-polygons' | 'binomial-equations'

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
    },
    /* ---------- 2. Operations ---------- */
    'add-multiply': {
        mistake: {
            wrong: same('$(3+2i)^2=9+4i^2=5$'),
            right: say('Biderkadura bikoitza falta da: $(3+2i)^2=9+12i+4i^2=5+12i$.', 'Falta el doble producto: $(3+2i)^2=9+12i+4i^2=5+12i$.', 'ينقص ضعف الجداء: $(3+2i)^2=9+12i+4i^2=5+12i$.', 'The double product is missing: $(3+2i)^2=9+12i+4i^2=5+12i$.')
        },
        check: {
            prompt: say('${z}=1+2i$ bada, zenbat da ${z}^2$?', 'Si ${z}=1+2i$, ¿cuánto vale ${z}^2$?', 'إذا كان ${z}=1+2i$، فكم يساوي ${z}^2$؟', 'If ${z}=1+2i$, what is ${z}^2$?'),
            options: [same('$-3$'), same('$-3+4i$'), same('$5+4i$')],
            correctIndex: 1,
            explanation: same('$(1+2i)^2=1+4i+4i^2=-3+4i$')
        }
    },
    division: {
        mistake: {
            wrong: same('$\\frac{6+8i}{2+4i}=3+2i$'),
            right: say('Ez da zatitzen zatiz zati: biderkatu $2-4i$ konjokatuaz, eta $\\frac{44-8i}{20}=\\frac{11}{5}-\\frac{2}{5}i$ ateratzen da.', 'No se divide parte a parte: se multiplica por el conjugado, $2-4i$, y sale $\\frac{44-8i}{20}=\\frac{11}{5}-\\frac{2}{5}i$.', 'لا نقسم جزءًا على جزء: نضرب في المرافق $2-4i$ فنحصل على $\\frac{44-8i}{20}=\\frac{11}{5}-\\frac{2}{5}i$.', 'You do not divide part by part: multiply by the conjugate, $2-4i$, and you get $\\frac{44-8i}{20}=\\frac{11}{5}-\\frac{2}{5}i$.')
        },
        check: {
            prompt: say('${z}=2-i$ bada, zenbat da $\\frac{5}{z}$?', 'Si ${z}=2-i$, ¿cuánto vale $\\frac{5}{z}$?', 'إذا كان ${z}=2-i$، فكم يساوي $\\frac{5}{z}$؟', 'If ${z}=2-i$, what is $\\frac{5}{z}$?'),
            options: [same('$\\frac{5}{2}+5i$'), same('$2+i$'), same('$10+5i$')],
            correctIndex: 1,
            explanation: same('$\\frac{5(2+i)}{(2-i)(2+i)}=\\frac{10+5i}{5}=2+i$')
        }
    },
    'powers-of-i': {
        mistake: {
            wrong: same('$i^{13}=i^{3}=-i$'),
            right: say('Hondarrak agintzen du, ez zatidurak: $13=4\\cdot 3+1$; beraz, $i^{13}=i$.', 'Cuenta el resto, no el cociente: $13=4\\cdot 3+1$, así que $i^{13}=i$.', 'العبرة بالباقي لا بخارج القسمة: $13=4\\cdot 3+1$، لذلك $i^{13}=i$.', 'The remainder counts, not the quotient: $13=4\\cdot 3+1$, so $i^{13}=i$.')
        },
        check: {
            prompt: say('$n=22$ bada, zenbat da $i^n$?', 'Si $n=22$, ¿cuánto vale $i^n$?', 'إذا كان $n=22$، فكم يساوي $i^n$؟', 'If $n=22$, what is $i^n$?'),
            options: [same('$-1$'), same('$i$'), same('$-i$')],
            correctIndex: 0,
            explanation: same('$22=4\\cdot 5+2\\ \\to\\ i^{22}=i^2=-1$')
        }
    },
    'quadratic-complex': {
        mistake: {
            wrong: say('$x^2+2x+5=0$: ez du soluziorik', '$x^2+2x+5=0$: no tiene solución', '$x^2+2x+5=0$: ليس لها حل', '$x^2+2x+5=0$: it has no solution'),
            right: say('Ez du soluzio errealik, baina $\\mathbb{C}$ multzoan bai: $x=-1\\pm 2i$.', 'No tiene solución real, pero en $\\mathbb{C}$ sí: $x=-1\\pm 2i$.', 'ليس لها حل حقيقي، لكن لها حلول في $\\mathbb{C}$: $x=-1\\pm 2i$.', 'It has no real solution, but in $\\mathbb{C}$ it does: $x=-1\\pm 2i$.')
        },
        check: {
            prompt: say('Zein dira $x^2-2x+10=0$ ekuazioaren soluzioak $\\mathbb{C}$ multzoan?', '¿Cuáles son las soluciones de $x^2-2x+10=0$ en $\\mathbb{C}$?', 'ما حلول $x^2-2x+10=0$ في $\\mathbb{C}$؟', 'What are the solutions of $x^2-2x+10=0$ in $\\mathbb{C}$?'),
            options: [say('Ez du soluziorik', 'No tiene', 'ليس لها حلول', 'It has none'), same('$-1\\pm 3i$'), same('$1\\pm 3i$')],
            correctIndex: 2,
            explanation: same('$\\Delta=4-40=-36\\qquad x=\\frac{2\\pm 6i}{2}=1\\pm 3i$')
        }
    },

    /* ---------- 3. Polar form ---------- */
    'modulus-argument': {
        mistake: {
            wrong: say('$-1-i$ zenbakiaren argumentua: 45°', 'El argumento de $-1-i$: 45°', 'عمدة $-1-i$: 45°', 'The argument of $-1-i$: 45°'),
            right: say('Afixua hirugarren koadrantean dago; beraz, argumentua $45°+180°=225°$ da.', 'El afijo está en el tercer cuadrante: el argumento es $45°+180°=225°$.', 'الصورة في الربع الثالث، فالعمدة $45°+180°=225°$.', 'The affix is in the third quadrant: the argument is $45°+180°=225°$.')
        },
        check: {
            prompt: say('${z}=-6+8i$ bada, zenbat da $|{z}|$?', 'Si ${z}=-6+8i$, ¿cuánto vale $|{z}|$?', 'إذا كان ${z}=-6+8i$، فكم يساوي $|{z}|$؟', 'If ${z}=-6+8i$, what is $|{z}|$?'),
            options: [same('$14$'), same('$10$'), same('$2$')],
            correctIndex: 1,
            explanation: same('$|{z}|=\\sqrt{36+64}=\\sqrt{100}=10$')
        }
    },
    'polar-binomial': {
        mistake: {
            wrong: same('$2_{30°}=1+\\sqrt{3}\\,i$'),
            right: say('Zati errealak kosinua darama: $2_{30°}=2\\cos 30°+2i\\sin 30°=\\sqrt{3}+i$.', 'La parte real lleva el coseno: $2_{30°}=2\\cos 30°+2i\\sin 30°=\\sqrt{3}+i$.', 'الجزء الحقيقي يأخذ جيب التمام: $2_{30°}=2\\cos 30°+2i\\sin 30°=\\sqrt{3}+i$.', 'The real part takes the cosine: $2_{30°}=2\\cos 30°+2i\\sin 30°=\\sqrt{3}+i$.')
        },
        check: {
            prompt: say('${z}=6_{90°}$ bada, zein da haren forma binomikoa?', 'Si ${z}=6_{90°}$, ¿cuál es su forma binómica?', 'إذا كان ${z}=6_{90°}$، فما شكله الجبري؟', 'If ${z}=6_{90°}$, what is its binomial form?'),
            options: [same('$6i$'), same('$6$'), same('$-6$')],
            correctIndex: 0,
            explanation: same('$6(\\cos 90°+i\\sin 90°)=6(0+i)=6i$')
        }
    },

    /* ---------- 4. Turns and powers ---------- */
    'product-quotient': {
        mistake: {
            wrong: same('$2_{30°}\\cdot 3_{60°}=6_{1800°}$'),
            right: say('Argumentuak batu egiten dira, ez biderkatu: $2_{30°}\\cdot 3_{60°}=6_{90°}$.', 'Los argumentos se suman, no se multiplican: $2_{30°}\\cdot 3_{60°}=6_{90°}$.', 'تُجمع العُمَد ولا تُضرب: $2_{30°}\\cdot 3_{60°}=6_{90°}$.', 'The arguments add, they do not multiply: $2_{30°}\\cdot 3_{60°}=6_{90°}$.')
        },
        check: {
            prompt: say('${z}=8_{100°}$ eta $w=4_{40°}$ badira, zenbat da $\\frac{z}{w}$?', 'Si ${z}=8_{100°}$ y $w=4_{40°}$, ¿cuánto vale $\\frac{z}{w}$?', 'إذا كان ${z}=8_{100°}$ و$w=4_{40°}$، فكم يساوي $\\frac{z}{w}$؟', 'If ${z}=8_{100°}$ and $w=4_{40°}$, what is $\\frac{z}{w}$?'),
            options: [same('$32_{140°}$'), same('$2_{140°}$'), same('$2_{60°}$')],
            correctIndex: 2,
            explanation: same('$\\left(\\frac{8}{4}\\right)_{100°-40°}=2_{60°}$')
        }
    },
    rotations: {
        mistake: {
            wrong: same('$(3+2i)\\cdot i=2+3i$'),
            right: say('Zeinu bat ere aldatzen da: $(3+2i)\\cdot i=3i+2i^2=-2+3i$.', 'También cambia un signo: $(3+2i)\\cdot i=3i+2i^2=-2+3i$.', 'تتغير إشارة أيضًا: $(3+2i)\\cdot i=3i+2i^2=-2+3i$.', 'A sign changes too: $(3+2i)\\cdot i=3i+2i^2=-2+3i$.')
        },
        check: {
            prompt: say('Zein puntu ateratzen da $(5,\\ 1)$ puntua 180° biratzean, $-1$ zenbakiaz biderkatuz?', '¿Qué punto sale al girar $(5,\\ 1)$ 180°, multiplicando por $-1$?', 'ما النقطة الناتجة عن تدوير $(5,\\ 1)$ بزاوية 180° بالضرب في $-1$؟', 'Which point do you get by turning $(5,\\ 1)$ through 180°, multiplying by $-1$?'),
            options: [same('$(-5,\\ -1)$'), same('$(-1,\\ 5)$'), same('$(5,\\ -1)$')],
            correctIndex: 0,
            explanation: same('$(5+i)\\cdot(-1)=-5-i$')
        }
    },
    'de-moivre': {
        mistake: {
            wrong: same('$(2_{40°})^3=6_{120°}$'),
            right: say('Modulua kubora jasotzen da, ez da bider 3 egiten: $(2_{40°})^3=8_{120°}$.', 'El módulo se eleva al cubo, no se multiplica por 3: $(2_{40°})^3=8_{120°}$.', 'تُرفع الطويلة إلى المكعب ولا تُضرب في 3: $(2_{40°})^3=8_{120°}$.', 'The modulus is cubed, not multiplied by 3: $(2_{40°})^3=8_{120°}$.')
        },
        check: {
            prompt: say('${z}=3_{50°}$ bada, zenbat da ${z}^2$?', 'Si ${z}=3_{50°}$, ¿cuánto vale ${z}^2$?', 'إذا كان ${z}=3_{50°}$، فكم يساوي ${z}^2$؟', 'If ${z}=3_{50°}$, what is ${z}^2$?'),
            options: [same('$6_{100°}$'), same('$9_{100°}$'), same('$9_{2500°}$')],
            correctIndex: 1,
            explanation: same('$(3^2)_{2\\cdot 50°}=9_{100°}$')
        }
    },

    /* ---------- 5. Roots ---------- */
    'nth-roots': {
        mistake: {
            wrong: same('$\\sqrt[3]{27_{60°}}=3_{20°}$'),
            right: say('Hiru erro kubiko daude, ez bakarra: $3_{20°}$, $3_{140°}$ eta $3_{260°}$.', 'Hay tres raíces cúbicas, no una: $3_{20°}$, $3_{140°}$ y $3_{260°}$.', 'هناك ثلاثة جذور تكعيبية لا جذر واحد: $3_{20°}$ و$3_{140°}$ و$3_{260°}$.', 'There are three cube roots, not one: $3_{20°}$, $3_{140°}$ and $3_{260°}$.')
        },
        check: {
            prompt: say('$16_{80°}$ zenbakiaren erro laugarrenetatik, zein argumentu du bigarren koadrantean dagoenak?', 'De las raíces cuartas de $16_{80°}$, ¿qué argumento tiene la que está en el segundo cuadrante?', 'من الجذور الرابعة لـ $16_{80°}$، ما عمدة الجذر الواقع في الربع الثاني؟', 'Of the fourth roots of $16_{80°}$, what is the argument of the one in the second quadrant?'),
            options: [same('$110°$'), same('$20°$'), same('$200°$')],
            correctIndex: 0,
            explanation: say('Argumentuak $20°+90°\\cdot k$ dira; $k=1$ denean, 110°.', 'Los argumentos son $20°+90°\\cdot k$; con $k=1$ sale 110°.', 'العُمَد هي $20°+90°\\cdot k$، ومع $k=1$ نحصل على 110°.', 'The arguments are $20°+90°\\cdot k$; with $k=1$ you get 110°.')
        }
    },
    'roots-polygons': {
        mistake: {
            wrong: say('$16$ zenbakiaren erro laugarrenak: $2_{0°}$, $2_{45°}$, $2_{90°}$ eta $2_{135°}$', 'Raíces cuartas de $16$: $2_{0°}$, $2_{45°}$, $2_{90°}$ y $2_{135°}$', 'الجذور الرابعة لـ $16$: $2_{0°}$ و$2_{45°}$ و$2_{90°}$ و$2_{135°}$', 'Fourth roots of $16$: $2_{0°}$, $2_{45°}$, $2_{90°}$ and $2_{135°}$'),
            right: say('$\\frac{360°}{4}=90°$ banatzen dira: $2_{0°}$, $2_{90°}$, $2_{180°}$ eta $2_{270°}$.', 'Se separan $\\frac{360°}{4}=90°$: $2_{0°}$, $2_{90°}$, $2_{180°}$ y $2_{270°}$.', 'تفصل بينها $\\frac{360°}{4}=90°$: $2_{0°}$ و$2_{90°}$ و$2_{180°}$ و$2_{270°}$.', 'They are $\\frac{360°}{4}=90°$ apart: $2_{0°}$, $2_{90°}$, $2_{180°}$ and $2_{270°}$.')
        },
        check: {
            prompt: say('Jatorrian zentratutako hexagono erregular batek erpin bat du $3_{10°}$ puntuan. Hauetako zein da beste erpin bat?', 'Un hexágono regular centrado en el origen tiene un vértice en $3_{10°}$. ¿Cuál de estos es otro vértice?', 'سداسي منتظم مركزه الأصل وأحد رؤوسه $3_{10°}$. أيّ هذه رأس آخر له؟', 'A regular hexagon centred at the origin has a vertex at $3_{10°}$. Which of these is another vertex?'),
            options: [same('$3_{60°}$'), same('$3_{70°}$'), same('$6_{70°}$')],
            correctIndex: 1,
            explanation: say('Erpinak $\\frac{360°}{6}=60°$ banatzen dira: $3_{10°+60°}=3_{70°}$.', 'Los vértices se separan $\\frac{360°}{6}=60°$: $3_{10°+60°}=3_{70°}$.', 'تفصل بين الرؤوس $\\frac{360°}{6}=60°$: $3_{10°+60°}=3_{70°}$.', 'The vertices are $\\frac{360°}{6}=60°$ apart: $3_{10°+60°}=3_{70°}$.')
        }
    },
    'binomial-equations': {
        mistake: {
            wrong: same('${z}^3=27\\ \\to\\ {z}=3$'),
            right: say('Hori soluzio erreala da, baina $\\mathbb{C}$ multzoan hiru daude: $3_{0°}$, $3_{120°}$ eta $3_{240°}$.', 'Esa es la solución real, pero en $\\mathbb{C}$ hay tres: $3_{0°}$, $3_{120°}$ y $3_{240°}$.', 'هذا هو الحل الحقيقي، لكن في $\\mathbb{C}$ ثلاثة حلول: $3_{0°}$ و$3_{120°}$ و$3_{240°}$.', 'That is the real solution, but in $\\mathbb{C}$ there are three: $3_{0°}$, $3_{120°}$ and $3_{240°}$.')
        },
        check: {
            prompt: say('${z}^6=64$ ekuazioaren soluzioetatik, zenbat dira errealak?', 'De las soluciones de ${z}^6=64$, ¿cuántas son reales?', 'من حلول ${z}^6=64$، كم منها حقيقي؟', 'Of the solutions of ${z}^6=64$, how many are real?'),
            options: [same('$1$'), same('$2$'), same('$6$')],
            correctIndex: 1,
            explanation: say('Sei erroak $2_{0°}$, $2_{60°}$, …, $2_{300°}$ dira; $2_{0°}=2$ eta $2_{180°}=-2$ bakarrik dira errealak.', 'Las seis raíces son $2_{0°}$, $2_{60°}$, …, $2_{300°}$; solo $2_{0°}=2$ y $2_{180°}=-2$ son reales.', 'الجذور الستة هي $2_{0°}$ و$2_{60°}$ و… و$2_{300°}$، والحقيقي منها $2_{0°}=2$ و$2_{180°}=-2$ فقط.', 'The six roots are $2_{0°}$, $2_{60°}$, …, $2_{300°}$; only $2_{0°}=2$ and $2_{180°}=-2$ are real.')
        }
    }
}
