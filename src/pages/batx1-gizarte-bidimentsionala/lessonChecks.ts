import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   typical mistake and the «Check it» question of the lessons that are new
   in Sociales. The lessons borrowed from 1.º Ciencias bring their own.
   Plain data (no JSX) so the tests can import it; lessons.tsx merges it
   into the topics. The questions use new numbers, never those of «Let's
   solve» or of the example, and one wrong answer is the typical mistake.
   ========================================================================== */

export type SocialBivarTopicId = 'reading-r' | 'line-xy' | 'both-lines' | 'marginal-measures'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const socialBivarLessonChecks: Record<SocialBivarTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'reading-r': {
        mistake: {
            wrong: say('$r=-0{,}8$ korrelazioa $r=0{,}3$ baino ahulagoa da, negatiboa delako.', '$r=-0{,}8$ es una correlación más débil que $r=0{,}3$, porque es negativa.', '$r=-0{,}8$ ارتباط أضعف من $r=0{,}3$ لأنه سالب.', '$r=-0{,}8$ is a weaker correlation than $r=0{,}3$, because it is negative.'),
            right: say('Indarra $|r|$ zenbakiak ematen du: $-0{,}8$ sendoagoa da. Zeinuak hodeia gora ala behera doan bakarrik esaten du.', 'La fuerza la da $|r|$: $-0{,}8$ es más fuerte. El signo solo dice si la nube sube o baja.', 'القوة يعطيها $|r|$: $-0{,}8$ أقوى. والإشارة تقول فقط هل تصعد السحابة أم تهبط.', 'The strength is given by $|r|$: $-0{,}8$ is stronger. The sign only says whether the cloud rises or falls.')
        },
        check: {
            prompt: say('Zein r koefizientek adierazten du mendekotasunik sendoena?', '¿Qué coeficiente r indica la dependencia más fuerte?', 'أي معامل r يدل على أقوى ارتباط؟', 'Which coefficient r shows the strongest dependence?'),
            options: [same('$0{,}7$'), same('$-0{,}85$'), same('$0{,}2$')],
            correctIndex: 1,
            explanation: say('$|-0{,}85|=0{,}85$ da handiena: 1 zenbakitik hurbilen dagoena.', '$|-0{,}85|=0{,}85$ es el mayor: el más cerca de 1.', '$|-0{,}85|=0{,}85$ هو الأكبر: الأقرب إلى 1.', '$|-0{,}85|=0{,}85$ is the largest: the closest to 1.')
        }
    },
    'line-xy': {
        mistake: {
            wrong: say('y-tik x estimatzeko, x askatzen dut Y-ren X-rekiko zuzenean.', 'Para estimar x a partir de y, despejo x en la recta de Y sobre X.', 'لتقدير x انطلاقًا من y أعزل x في مستقيم Y على X.', 'To estimate x from y, I solve the line of Y on X for x.'),
            right: say('X-ren Y-rekiko zuzena erabiltzen da: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Bi zuzenak bat datoz $r=\\pm 1$ denean bakarrik.', 'Se usa la recta de X sobre Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Las dos rectas solo coinciden si $r=\\pm 1$.', 'نستعمل مستقيم X على Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. ولا يتطابق المستقيمان إلا إذا كان $r=\\pm 1$.', 'Use the line of X on Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. The two lines are the same only if $r=\\pm 1$.')
        },
        check: {
            prompt: say('$\\sigma_{xy}=5$ eta $\\sigma_y^2=10$. Zenbat da X-ren Y-rekiko erregresio-koefizientea, $m_{xy}$?', 'Si $\\sigma_{xy}=5$ y $\\sigma_y^2=10$, ¿cuánto vale el coeficiente de regresión de X sobre Y, $m_{xy}$?', 'إذا كان $\\sigma_{xy}=5$ و$\\sigma_y^2=10$ فكم معامل انحدار X على Y، $m_{xy}$؟', 'If $\\sigma_{xy}=5$ and $\\sigma_y^2=10$, what is the regression coefficient of X on Y, $m_{xy}$?'),
            options: [same('$2$'), same('$0{,}5$'), same('$50$')],
            correctIndex: 1,
            explanation: same('$m_{xy}=\\frac{5}{10}=0{,}5$')
        }
    },
    'both-lines': {
        mistake: {
            wrong: say('Marraztutako bi maldak biderkatzen ditut: $0{,}8\\cdot 1{,}25=1$, beraz $r=1$.', 'Multiplico las dos pendientes dibujadas: $0{,}8\\cdot 1{,}25=1$, así que $r=1$.', 'أضرب الميلين المرسومين: $0{,}8\\cdot 1{,}25=1$، إذن $r=1$.', 'I multiply the two slopes as drawn: $0{,}8\\cdot 1{,}25=1$, so $r=1$.'),
            right: say('X-ren Y-rekiko zuzenak, y askatuta, $\\frac{1}{m_{xy}}$ malda du. Beraz, $r^2=m_{yx}\\cdot m_{xy}$ marraztutako bi malden zatidura da.', 'La recta de X sobre Y, con y despejada, tiene pendiente $\\frac{1}{m_{xy}}$. Así que $r^2=m_{yx}\\cdot m_{xy}$ es el cociente de las dos pendientes dibujadas.', 'مستقيم X على Y بعد عزل y ميله $\\frac{1}{m_{xy}}$. لذلك $r^2=m_{yx}\\cdot m_{xy}$ هو حاصل قسمة الميلين المرسومين.', 'The line of X on Y, solved for y, has slope $\\frac{1}{m_{xy}}$. So $r^2=m_{yx}\\cdot m_{xy}$ is the quotient of the two slopes as drawn.')
        },
        check: {
            prompt: say('Y-ren X-rekiko zuzena $y=0{,}6x+1$ da, eta X-ren Y-rekikoa, y askatuta, $y=1{,}5x-8$. Zenbat da $r^2$?', 'La recta de Y sobre X es $y=0{,}6x+1$ y la de X sobre Y, con y despejada, $y=1{,}5x-8$. ¿Cuánto vale $r^2$?', 'مستقيم Y على X هو $y=0{,}6x+1$، ومستقيم X على Y بعد عزل y هو $y=1{,}5x-8$. كم قيمة $r^2$؟', 'The line of Y on X is $y=0{,}6x+1$ and that of X on Y, solved for y, is $y=1{,}5x-8$. What is $r^2$?'),
            options: [same('$0{,}4$'), same('$0{,}9$'), same('$2{,}5$')],
            correctIndex: 0,
            explanation: same('$r^2=\\frac{0{,}6}{1{,}5}=0{,}4$')
        }
    },
    'marginal-measures': {
        mistake: {
            wrong: say('Baldintzazkoaren batez bestekoa taularen $N$ guztizkoaz zatitzen da.', 'La media de la condicionada se divide entre el total $N$ de la tabla.', 'يُقسَم متوسط التوزيع الشرطي على المجموع الكلي $N$ للجدول.', 'The mean of the conditional is divided by the total $N$ of the table.'),
            right: say('Zutabe horren guztizkoaz zatitzen da: baldintzazkoak talde hori bakarrik begiratzen du.', 'Se divide entre el total de esa columna: la condicionada solo mira ese grupo.', 'يُقسَم على مجموع ذلك العمود: فالتوزيع الشرطي لا ينظر إلا إلى تلك المجموعة.', 'It is divided by the total of that column: the conditional only looks at that group.')
        },
        check: {
            prompt: say('Zutabe batean 20 urteko 2 pertsona eta 40 urteko 6 pertsona daude. Zein da x-ren batez bestekoa, zutabe horretara baldintzatuta?', 'En una columna hay 2 personas de 20 años y 6 de 40. ¿Cuál es la media de x condicionada a esa columna?', 'في عمود شخصان عمرهما 20 سنة و6 أشخاص عمرهم 40. ما متوسط x المشروط بذلك العمود؟', 'A column has 2 people aged 20 and 6 aged 40. What is the mean of x conditioned on that column?'),
            options: [same('$35$'), same('$30$'), same('$17{,}5$')],
            correctIndex: 0,
            explanation: same('$\\bar{x}=\\frac{2\\cdot 20+6\\cdot 40}{8}=35$')
        }
    }
}
