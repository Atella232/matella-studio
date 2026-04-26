import type { LocalizedText } from './content'

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard'

export interface ExerciseItemData {
    id: number
    difficulty: ExerciseDifficulty
    question: LocalizedText
    solution: LocalizedText
}

export interface ExerciseSectionData {
    id: string
    title: LocalizedText
    icon: string
    color: string
    count: number
    items: ExerciseItemData[]
}

const t = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const item = (id: number, difficulty: ExerciseDifficulty, question: LocalizedText, solution: LocalizedText): ExerciseItemData => ({ id, difficulty, question, solution })

const significado = [
    item(1, 'easy', t('$x=4$ soluzioa al da $x+6=10$ ekuazioan?', '¿Es $x=4$ solución de $x+6=10$?', 'هل $x=4$ حل للمعادلة $x+6=10$؟'), t('Bai, $4+6=10$.', 'Sí, $4+6=10$.', 'نعم، $4+6=10$.' )),
    item(2, 'easy', t('$x=3$ soluzioa al da $2x+5=13$ ekuazioan?', '¿Es $x=3$ solución de $2x+5=13$?', 'هل $x=3$ حل للمعادلة $2x+5=13$؟'), t('Ez, $2\\cdot3+5=11$.', 'No, $2\\cdot3+5=11$.', 'لا، $2\\cdot3+5=11$.' )),
    item(3, 'easy', t('Adierazi ekuazioaren ezezaguna: $7y-2=19$.', 'Indica la incógnita de la ecuación: $7y-2=19$.', 'حدد المجهول في المعادلة: $7y-2=19$.'), t('Ezezaguna $y$ da.', 'La incógnita es $y$.', 'المجهول هو $y$.' )),
    item(4, 'easy', t('Zenbat kide ditu $3x+1=10$ ekuazioak?', '¿Cuántos miembros tiene $3x+1=10$?', 'كم طرفاً للمعادلة $3x+1=10$؟'), t('Bi kide: $3x+1$ eta $10$.', 'Dos miembros: $3x+1$ y $10$.', 'طرفان: $3x+1$ و $10$.' )),
    item(5, 'medium', t('Zein da $x^2-4=0$ ekuazioaren gradua?', '¿Cuál es el grado de $x^2-4=0$?', 'ما درجة المعادلة $x^2-4=0$؟'), t('Bigarren mailakoa da, gradua 2.', 'Es de segundo grado, grado 2.', 'هي من الدرجة الثانية، درجتها 2.' )),
    item(6, 'medium', t('Egiaztatu $x=-2$ balioa $3x+8=2$ ekuazioan.', 'Comprueba el valor $x=-2$ en $3x+8=2$.', 'تحقق من القيمة $x=-2$ في $3x+8=2$.'), t('$3(-2)+8=2$, beraz soluzioa da.', '$3(-2)+8=2$, por tanto es solución.', '$3(-2)+8=2$، إذن هو حل.' )),
    item(7, 'hard', t('Aurkitu $x$ balioa $5x-1=2x+11$ ekuazioan eta egiaztatu.', 'Encuentra $x$ en $5x-1=2x+11$ y comprueba.', 'أوجد $x$ في $5x-1=2x+11$ وتحقق.'), t('$3x=12$, $x=4$. Egiaztatuz: $19=19$.', '$3x=12$, $x=4$. Comprobando: $19=19$.', '$3x=12$، $x=4$. بالتحقق: $19=19$.' )),
    item(8, 'hard', t('Idatzi bi ekuazio desberdin $x=6$ soluzioa dutenak.', 'Escribe dos ecuaciones distintas cuya solución sea $x=6$.', 'اكتب معادلتين مختلفتين حلّهما $x=6$.'), t('Adibidez: $x+2=8$ eta $3x=18$.', 'Por ejemplo: $x+2=8$ y $3x=18$.', 'مثلاً: $x+2=8$ و $3x=18$.' ))
]

const baliokideak = [
    item(1, 'easy', t('$x+4=9$ ekuaziotik kendu 4 bi aldeetan.', 'Resta 4 a ambos lados de $x+4=9$.', 'اطرح 4 من طرفي $x+4=9$.'), t('$x=5$.', '$x=5$.', '$x=5$.' )),
    item(2, 'easy', t('$3x=24$ ekuaziotik zatitu 3rekin.', 'Divide entre 3 en $3x=24$.', 'اقسم على 3 في $3x=24$.'), t('$x=8$.', '$x=8$.', '$x=8$.' )),
    item(3, 'easy', t('$x-7=2$ ekuazio baliokidea lortu.', 'Obtén una ecuación equivalente a $x-7=2$.', 'احصل على معادلة مكافئة لـ $x-7=2$.'), t('$x=9$.', '$x=9$.', '$x=9$.' )),
    item(4, 'medium', t('Baliokideak al dira $2x=10$ eta $x+1=6$?', '¿Son equivalentes $2x=10$ y $x+1=6$?', 'هل $2x=10$ و $x+1=6$ متكافئتان؟'), t('Bai, biek $x=5$ dute.', 'Sí, ambas tienen $x=5$.', 'نعم، كلاهما له $x=5$.' )),
    item(5, 'medium', t('Baliokideak al dira $x=3$ eta $2x=8$?', '¿Son equivalentes $x=3$ y $2x=8$?', 'هل $x=3$ و $2x=8$ متكافئتان؟'), t('Ez; bigarrenak $x=4$ du.', 'No; la segunda tiene $x=4$.', 'لا؛ الثانية حلها $x=4$.' )),
    item(6, 'medium', t('Osatu: $4x-6=10 \\Rightarrow 4x=\\,?$ ', 'Completa: $4x-6=10 \\Rightarrow 4x=\\,?$', 'أكمل: $4x-6=10 \\Rightarrow 4x=\\,?$'), t('$4x=16$.', '$4x=16$.', '$4x=16$.' )),
    item(7, 'hard', t('Sortu bi ekuazio baliokide $7x-5=16$ ekuaziotik.', 'Crea dos ecuaciones equivalentes a partir de $7x-5=16$.', 'أنشئ معادلتين مكافئتين انطلاقاً من $7x-5=16$.'), t('$7x=21$ eta $x=3$.', '$7x=21$ y $x=3$.', '$7x=21$ و $x=3$.' )),
    item(8, 'hard', t('Zergatik da arriskutsua alde bakarrean bakarrik biderkatzea?', '¿Por qué es peligroso multiplicar solo un lado?', 'لماذا من الخطير الضرب في طرف واحد فقط؟'), t('Oreka apurtzen delako eta soluzioa alda daitekeelako.', 'Porque se rompe el equilibrio y puede cambiar la solución.', 'لأن التوازن ينكسر وقد يتغير الحل.' ))
]

const lehenMaila = [
    item(1, 'easy', t('Ebatzi: $x+9=17$.', 'Resuelve: $x+9=17$.', 'حل: $x+9=17$.'), t('$x=8$.', '$x=8$.', '$x=8$.' )),
    item(2, 'easy', t('Ebatzi: $x-5=12$.', 'Resuelve: $x-5=12$.', 'حل: $x-5=12$.'), t('$x=17$.', '$x=17$.', '$x=17$.' )),
    item(3, 'easy', t('Ebatzi: $6x=42$.', 'Resuelve: $6x=42$.', 'حل: $6x=42$.'), t('$x=7$.', '$x=7$.', '$x=7$.' )),
    item(4, 'easy', t('Ebatzi: $\\frac{x}{4}=3$.', 'Resuelve: $\\frac{x}{4}=3$.', 'حل: $\\frac{x}{4}=3$.'), t('$x=12$.', '$x=12$.', '$x=12$.' )),
    item(5, 'medium', t('Ebatzi: $3x+4=22$.', 'Resuelve: $3x+4=22$.', 'حل: $3x+4=22$.'), t('$3x=18$, $x=6$.', '$3x=18$, $x=6$.', '$3x=18$، $x=6$.' )),
    item(6, 'medium', t('Ebatzi: $5x-8=17$.', 'Resuelve: $5x-8=17$.', 'حل: $5x-8=17$.'), t('$5x=25$, $x=5$.', '$5x=25$, $x=5$.', '$5x=25$، $x=5$.' )),
    item(7, 'hard', t('Ebatzi: $7-2x=19$.', 'Resuelve: $7-2x=19$.', 'حل: $7-2x=19$.'), t('$-2x=12$, $x=-6$.', '$-2x=12$, $x=-6$.', '$-2x=12$، $x=-6$.' )),
    item(8, 'hard', t('Ebatzi: $4x+3=2x+15$.', 'Resuelve: $4x+3=2x+15$.', 'حل: $4x+3=2x+15$.'), t('$2x=12$, $x=6$.', '$2x=12$, $x=6$.', '$2x=12$، $x=6$.' ))
]

const parentesiak = [
    item(1, 'easy', t('Ebatzi: $2(x+3)=14$.', 'Resuelve: $2(x+3)=14$.', 'حل: $2(x+3)=14$.'), t('$x+3=7$, $x=4$.', '$x+3=7$, $x=4$.', '$x+3=7$، $x=4$.' )),
    item(2, 'easy', t('Ebatzi: $3(x-1)=12$.', 'Resuelve: $3(x-1)=12$.', 'حل: $3(x-1)=12$.'), t('$x-1=4$, $x=5$.', '$x-1=4$, $x=5$.', '$x-1=4$، $x=5$.' )),
    item(3, 'medium', t('Ebatzi: $2(x+5)=3x+4$.', 'Resuelve: $2(x+5)=3x+4$.', 'حل: $2(x+5)=3x+4$.'), t('$2x+10=3x+4$, $x=6$.', '$2x+10=3x+4$, $x=6$.', '$2x+10=3x+4$، $x=6$.' )),
    item(4, 'medium', t('Ebatzi: $4(x-2)=2x+6$.', 'Resuelve: $4(x-2)=2x+6$.', 'حل: $4(x-2)=2x+6$.'), t('$4x-8=2x+6$, $2x=14$, $x=7$.', '$4x-8=2x+6$, $2x=14$, $x=7$.', '$4x-8=2x+6$، $2x=14$، $x=7$.' )),
    item(5, 'medium', t('Ebatzi: $5-2(x+1)=1$.', 'Resuelve: $5-2(x+1)=1$.', 'حل: $5-2(x+1)=1$.'), t('$5-2x-2=1$, $3-2x=1$, $x=1$.', '$5-2x-2=1$, $3-2x=1$, $x=1$.', '$5-2x-2=1$، $3-2x=1$، $x=1$.' )),
    item(6, 'hard', t('Ebatzi: $3(x-2)+5=2(x+4)$.', 'Resuelve: $3(x-2)+5=2(x+4)$.', 'حل: $3(x-2)+5=2(x+4)$.'), t('$3x-1=2x+8$, $x=9$.', '$3x-1=2x+8$, $x=9$.', '$3x-1=2x+8$، $x=9$.' )),
    item(7, 'hard', t('Ebatzi: $2(3x-1)-4=x+9$.', 'Resuelve: $2(3x-1)-4=x+9$.', 'حل: $2(3x-1)-4=x+9$.'), t('$6x-6=x+9$, $5x=15$, $x=3$.', '$6x-6=x+9$, $5x=15$, $x=3$.', '$6x-6=x+9$، $5x=15$، $x=3$.' )),
    item(8, 'hard', t('Ebatzi: $7-(x-3)=2x+1$.', 'Resuelve: $7-(x-3)=2x+1$.', 'حل: $7-(x-3)=2x+1$.'), t('$10-x=2x+1$, $9=3x$, $x=3$.', '$10-x=2x+1$, $9=3x$, $x=3$.', '$10-x=2x+1$، $9=3x$، $x=3$.' ))
]

const izendatzaileak = [
    item(1, 'easy', t('Ebatzi: $\\frac{x}{2}=6$.', 'Resuelve: $\\frac{x}{2}=6$.', 'حل: $\\frac{x}{2}=6$.'), t('$x=12$.', '$x=12$.', '$x=12$.' )),
    item(2, 'easy', t('Ebatzi: $\\frac{x}{5}+1=4$.', 'Resuelve: $\\frac{x}{5}+1=4$.', 'حل: $\\frac{x}{5}+1=4$.'), t('$\\frac{x}{5}=3$, $x=15$.', '$\\frac{x}{5}=3$, $x=15$.', '$\\frac{x}{5}=3$، $x=15$.' )),
    item(3, 'medium', t('Ebatzi: $\\frac{x+2}{3}=5$.', 'Resuelve: $\\frac{x+2}{3}=5$.', 'حل: $\\frac{x+2}{3}=5$.'), t('$x+2=15$, $x=13$.', '$x+2=15$, $x=13$.', '$x+2=15$، $x=13$.' )),
    item(4, 'medium', t('Ebatzi: $\\frac{x}{3}+\\frac{x}{6}=9$.', 'Resuelve: $\\frac{x}{3}+\\frac{x}{6}=9$.', 'حل: $\\frac{x}{3}+\\frac{x}{6}=9$.'), t('MKT 6: $2x+x=54$, $3x=54$, $x=18$.', 'm.c.m. 6: $2x+x=54$, $3x=54$, $x=18$.', 'المضاعف 6: $2x+x=54$، $3x=54$، $x=18$.' )),
    item(5, 'medium', t('Ebatzi: $\\frac{x-1}{4}=3$.', 'Resuelve: $\\frac{x-1}{4}=3$.', 'حل: $\\frac{x-1}{4}=3$.'), t('$x-1=12$, $x=13$.', '$x-1=12$, $x=13$.', '$x-1=12$، $x=13$.' )),
    item(6, 'hard', t('Ebatzi: $\\frac{x}{2}+\\frac{x-3}{3}=5$.', 'Resuelve: $\\frac{x}{2}+\\frac{x-3}{3}=5$.', 'حل: $\\frac{x}{2}+\\frac{x-3}{3}=5$.'), t('MKT 6: $3x+2x-6=30$, $5x=36$, $x=\\frac{36}{5}$.', 'm.c.m. 6: $3x+2x-6=30$, $5x=36$, $x=\\frac{36}{5}$.', 'المضاعف 6: $3x+2x-6=30$، $5x=36$، $x=\\frac{36}{5}$.' )),
    item(7, 'hard', t('Ebatzi: $\\frac{2x+1}{5}=\\frac{x-2}{2}$.', 'Resuelve: $\\frac{2x+1}{5}=\\frac{x-2}{2}$.', 'حل: $\\frac{2x+1}{5}=\\frac{x-2}{2}$.'), t('$2(2x+1)=5(x-2)$, $4x+2=5x-10$, $x=12$.', '$2(2x+1)=5(x-2)$, $4x+2=5x-10$, $x=12$.', '$2(2x+1)=5(x-2)$، $4x+2=5x-10$، $x=12$.' )),
    item(8, 'hard', t('Ebatzi: $\\frac{x+4}{2}-\\frac{x}{3}=5$.', 'Resuelve: $\\frac{x+4}{2}-\\frac{x}{3}=5$.', 'حل: $\\frac{x+4}{2}-\\frac{x}{3}=5$.'), t('MKT 6: $3x+12-2x=30$, $x=18$.', 'm.c.m. 6: $3x+12-2x=30$, $x=18$.', 'المضاعف 6: $3x+12-2x=30$، $x=18$.' ))
]

const problemak = [
    item(1, 'easy', t('Zenbaki bati 8 gehituta 21 lortzen da. Zein da zenbakia?', 'A un número le sumas 8 y obtienes 21. ¿Cuál es?', 'إذا أضفت 8 إلى عدد حصلت على 21. ما العدد؟'), t('$x+8=21$, $x=13$.', '$x+8=21$, $x=13$.', '$x+8=21$، $x=13$.' )),
    item(2, 'easy', t('Zenbaki baten bikoitza 34 da. Zein da?', 'El doble de un número es 34. ¿Cuál es?', 'ضعف عدد يساوي 34. ما العدد؟'), t('$2x=34$, $x=17$.', '$2x=34$, $x=17$.', '$2x=34$، $x=17$.' )),
    item(3, 'medium', t('Zenbaki baten hirukoitzari 5 gehituta 29 lortzen da.', 'Al triple de un número le sumas 5 y obtienes 29.', 'إذا أضفت 5 إلى ثلاثة أمثال عدد حصلت على 29.'), t('$3x+5=29$, $x=8$.', '$3x+5=29$, $x=8$.', '$3x+5=29$، $x=8$.' )),
    item(4, 'medium', t('Anek 4 urte gehiago ditu Ikerrek baino. Biek 30 urte dituzte guztira.', 'Ane tiene 4 años más que Iker. Entre ambos suman 30 años.', 'آني أكبر من إيكير بأربع سنوات. مجموع عمريهما 30 سنة.'), t('Iker: $x$, Ane: $x+4$. $2x+4=30$, $x=13$. Ane 17.', 'Iker: $x$, Ane: $x+4$. $2x+4=30$, $x=13$. Ane 17.', 'إيكير: $x$، آني: $x+4$. $2x+4=30$، $x=13$. آني 17.' )),
    item(5, 'medium', t('Bi sarrera eta 3 euroko edaria 25 euro dira. Zenbat balio du sarrera bakoitzak?', 'Dos entradas y una bebida de 3 euros cuestan 25 euros. ¿Cuánto vale cada entrada?', 'تذكرتان ومشروب بـ3 يورو تساوي 25 يورو. كم ثمن كل تذكرة؟'), t('$2x+3=25$, $x=11$ euro.', '$2x+3=25$, $x=11$ euros.', '$2x+3=25$، $x=11$ يورو.' )),
    item(6, 'hard', t('Laukizuzen baten luzera zabalera baino 3 m handiagoa da eta perimetroa 30 m da.', 'Un rectángulo mide 3 m más de largo que de ancho y su perímetro es 30 m.', 'طول مستطيل أكبر من عرضه بـ3 م ومحيطه 30 م.'), t('Zabalera $x$: $2x+2(x+3)=30$, $x=6$. Luzera 9 m.', 'Ancho $x$: $2x+2(x+3)=30$, $x=6$. Largo 9 m.', 'العرض $x$: $2x+2(x+3)=30$، $x=6$. الطول 9 م.' )),
    item(7, 'hard', t('Kamiseta batek zapi batek baino 14 euro gehiago balio du. Biek 50 euro.', 'Una camiseta cuesta 14 euros más que un pañuelo. Juntos cuestan 50 euros.', 'قميص ثمنه أكثر من منديل بـ14 يورو. المجموع 50 يورو.'), t('Zapia $x$: $x+x+14=50$, $x=18$. Kamiseta 32.', 'Pañuelo $x$: $x+x+14=50$, $x=18$. Camiseta 32.', 'المنديل $x$: $x+x+14=50$، $x=18$. القميص 32.' )),
    item(8, 'hard', t('Sarrerak: heren bat lehen egunean, laurden bat bigarrenean eta 200 geratzen dira. Zenbat ziren?', 'Entradas: un tercio el primer día, un cuarto el segundo y quedan 200. ¿Cuántas había?', 'تذاكر: بيع الثلث في اليوم الأول والربع في الثاني وبقي 200. كم كان العدد؟'), t('$\\frac{x}{3}+\\frac{x}{4}+200=x$, $7x+2400=12x$, $x=480$.', '$\\frac{x}{3}+\\frac{x}{4}+200=x$, $7x+2400=12x$, $x=480$.', '$\\frac{x}{3}+\\frac{x}{4}+200=x$، $7x+2400=12x$، $x=480$.' ))
]

const bigarrenMaila = [
    item(1, 'easy', t('Ebatzi: $x^2=25$.', 'Resuelve: $x^2=25$.', 'حل: $x^2=25$.'), t('$x=5$ edo $x=-5$.', '$x=5$ o $x=-5$.', '$x=5$ أو $x=-5$.' )),
    item(2, 'easy', t('Ebatzi: $x^2-16=0$.', 'Resuelve: $x^2-16=0$.', 'حل: $x^2-16=0$.'), t('$x=4$ edo $x=-4$.', '$x=4$ o $x=-4$.', '$x=4$ أو $x=-4$.' )),
    item(3, 'easy', t('Ebatzi: $x^2+5x=0$.', 'Resuelve: $x^2+5x=0$.', 'حل: $x^2+5x=0$.'), t('$x(x+5)=0$, $x=0$ edo $x=-5$.', '$x(x+5)=0$, $x=0$ o $x=-5$.', '$x(x+5)=0$، $x=0$ أو $x=-5$.' )),
    item(4, 'medium', t('Ebatzi: $x^2-3x=0$.', 'Resuelve: $x^2-3x=0$.', 'حل: $x^2-3x=0$.'), t('$x(x-3)=0$, $x=0$ edo $x=3$.', '$x(x-3)=0$, $x=0$ o $x=3$.', '$x(x-3)=0$، $x=0$ أو $x=3$.' )),
    item(5, 'medium', t('Kalkulatu diskriminatzailea: $x^2-6x+9=0$.', 'Calcula el discriminante: $x^2-6x+9=0$.', 'احسب المميز: $x^2-6x+9=0$.'), t('$\\Delta=36-36=0$. Soluzio bikoitza.', '$\\Delta=36-36=0$. Solución doble.', '$\\Delta=36-36=0$. حل مزدوج.' )),
    item(6, 'medium', t('Ebatzi: $x^2-5x+6=0$.', 'Resuelve: $x^2-5x+6=0$.', 'حل: $x^2-5x+6=0$.'), t('Faktorizatuz: $(x-2)(x-3)=0$, $x=2$ edo $x=3$.', 'Factorizando: $(x-2)(x-3)=0$, $x=2$ o $x=3$.', 'بالتحليل: $(x-2)(x-3)=0$، $x=2$ أو $x=3$.' )),
    item(7, 'hard', t('Ebatzi formularekin: $x^2+2x-8=0$.', 'Resuelve con fórmula: $x^2+2x-8=0$.', 'حل بالقانون: $x^2+2x-8=0$.'), t('$\\Delta=36$, $x=\\frac{-2\\pm6}{2}$; $x=2$ edo $x=-4$.', '$\\Delta=36$, $x=\\frac{-2\\pm6}{2}$; $x=2$ o $x=-4$.', '$\\Delta=36$، $x=\\frac{-2\\pm6}{2}$؛ $x=2$ أو $x=-4$.' )),
    item(8, 'hard', t('Zenbat soluzio erreal ditu $x^2+4x+8=0$ ekuazioak?', '¿Cuántas soluciones reales tiene $x^2+4x+8=0$?', 'كم حلاً حقيقياً للمعادلة $x^2+4x+8=0$؟'), t('$\\Delta=16-32=-16<0$, ez dago soluzio errealik.', '$\\Delta=16-32=-16<0$, no hay soluciones reales.', '$\\Delta=16-32=-16<0$، لا توجد حلول حقيقية.' ))
]

export const ekuazioakExerciseSections: ExerciseSectionData[] = [
    { id: 'significado', title: t('Esanahia eta elementuak', 'Significado y elementos', 'المعنى والعناصر'), icon: '=', color: '#6366f1', count: significado.length, items: significado },
    { id: 'baliokideak', title: t('Ekuazio baliokideak', 'Ecuaciones equivalentes', 'معادلات متكافئة'), icon: '<>', color: '#06b6d4', count: baliokideak.length, items: baliokideak },
    { id: 'lehen-maila', title: t('Lehen mailako ekuazioak', 'Ecuaciones de primer grado', 'معادلات الدرجة الأولى'), icon: 'x', color: '#10b981', count: lehenMaila.length, items: lehenMaila },
    { id: 'parentesiak', title: t('Parentesiak', 'Paréntesis', 'الأقواس'), icon: '()', color: '#f59e0b', count: parentesiak.length, items: parentesiak },
    { id: 'izendatzaileak', title: t('Izendatzaileak', 'Denominadores', 'المقامات'), icon: '⅓', color: '#f472b6', count: izendatzaileak.length, items: izendatzaileak },
    { id: 'problemak', title: t('Problemak ekuazioekin', 'Problemas con ecuaciones', 'مسائل بالمعادلات'), icon: '?', color: '#8b5cf6', count: problemak.length, items: problemak },
    { id: 'bigarren-maila', title: t('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية'), icon: 'x²', color: '#ef4444', count: bigarrenMaila.length, items: bigarrenMaila }
]
