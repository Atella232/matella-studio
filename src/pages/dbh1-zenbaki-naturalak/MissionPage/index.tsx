import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './MissionPage.css'

type Lang = 'es' | 'eu' | 'ar'
type Difficulty = 'nivel1' | 'nivel2' | 'nivel3'

interface ChallengeText {
    title: string
    statement: string
    hints: string[]
    resolution: string[]
    finalAnswer: string
    typicalError: string
}

interface Challenge {
    id: number
    difficulty: Difficulty
    points: number
    validate: (answer: string) => boolean
    text: ChallengeText
}

interface UiText {
    title: string
    subtitle: string
    totalPoints: string
    levelLabel: Record<Difficulty, { label: string; sublabel: string; icon: string; color: string; bgColor: string }>
    back: string
    writeAnswer: string
    check: string
    showHint: string
    showResolution: string
    hideResolution: string
    guided: string
    finalAnswer: string
    typicalError: string
    success: string
    fail: string
    completed: string
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

function normalizeText(input: string) {
    return input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
}

function extractNaturalNumbers(input: string) {
    const matches = input.match(/\d[\d.,]*/g) ?? []
    return matches.map((token) => Number(token.replace(/[.,]/g, '')))
}

const META: Array<{ id: number; difficulty: Difficulty; points: number; validate: (answer: string) => boolean }> = [
    { id: 1, difficulty: 'nivel1', points: 10, validate: (a) => normalizeText(a).replace(/[.,]/g, '') === '407205' },
    {
        id: 2,
        difficulty: 'nivel1',
        points: 10,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            const expected = [149637, 24356000, 82600000, 7000000000, 89678000000]
            return expected.every((value, index) => values[index] === value)
        }
    },
    {
        id: 3,
        difficulty: 'nivel1',
        points: 10,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            return values.includes(25000) && values.includes(73000) && values.includes(380000)
        }
    },
    { id: 4, difficulty: 'nivel2', points: 20, validate: (a) => extractNaturalNumbers(a).includes(328) },
    {
        id: 5,
        difficulty: 'nivel2',
        points: 20,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            return values.includes(14) && values.includes(2)
        }
    },
    {
        id: 6,
        difficulty: 'nivel2',
        points: 20,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            return values.includes(14) && values.includes(20) && values.includes(7)
        }
    },
    { id: 7, difficulty: 'nivel3', points: 30, validate: (a) => normalizeText(a).replace(/[.,]/g, '') === '40001' },
    {
        id: 8,
        difficulty: 'nivel3',
        points: 30,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            return values.includes(149637) && values.includes(150000)
        }
    },
    {
        id: 9,
        difficulty: 'nivel3',
        points: 40,
        validate: (a) => {
            const values = extractNaturalNumbers(a)
            return values.includes(7000) && values.includes(14000) && values.includes(70)
        }
    }
]

const UI: Record<Lang, UiText> = {
    es: {
        title: 'Erronkak: numeros naturales',
        subtitle: '9 problemas por niveles con pistas graduadas y resolucion guiada.',
        totalPoints: 'puntuacion total',
        levelLabel: {
            nivel1: { label: 'Nivel 1', sublabel: 'Fundamentos', icon: 'N1', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: 'Nivel 2', sublabel: 'Aplicacion', icon: 'N2', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: 'Nivel 3', sublabel: 'Razonamiento', icon: 'N3', color: '#EF4444', bgColor: '#FEE2E2' }
        },
        back: '<- Volver',
        writeAnswer: 'Escribe aqui tu respuesta',
        check: 'Comprobar',
        showHint: 'Mostrar pista',
        showResolution: 'Ver resolucion paso a paso',
        hideResolution: 'Ocultar resolucion',
        guided: 'Resolucion guiada',
        finalAnswer: 'Respuesta final',
        typicalError: 'Error tipico',
        success: 'Respuesta correcta',
        fail: 'Aun no coincide. Revisa pistas y procedimiento.',
        completed: 'Erronka completada'
    },
    eu: {
        title: 'Erronkak: zenbaki naturalak',
        subtitle: '9 problema mailatan, pista progresiboekin eta urratsez urratseko ebazpenarekin.',
        totalPoints: 'puntuazio osoa',
        levelLabel: {
            nivel1: { label: '1. maila', sublabel: 'Oinarriak', icon: 'N1', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: '2. maila', sublabel: 'Aplikazioa', icon: 'N2', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: '3. maila', sublabel: 'Arrazoiketa', icon: 'N3', color: '#EF4444', bgColor: '#FEE2E2' }
        },
        back: '<- Itzuli',
        writeAnswer: 'Idatzi hemen zure erantzuna',
        check: 'Egiaztatu',
        showHint: 'Pista erakutsi',
        showResolution: 'Urratsez urratseko ebazpena ikusi',
        hideResolution: 'Ebazpena ezkutatu',
        guided: 'Ebazpen gidatua',
        finalAnswer: 'Azken erantzuna',
        typicalError: 'Akats tipikoa',
        success: 'Erantzun zuzena',
        fail: 'Oraindik ez dator bat. Berrikusi pistak eta prozedura.',
        completed: 'Erronka osatuta'
    },
    ar: {
        title: 'التحديات: الأعداد الطبيعية',
        subtitle: '9 مسائل بمستويات مع تلميحات تدريجية وحل موجّه.',
        totalPoints: 'مجموع النقاط',
        levelLabel: {
            nivel1: { label: 'المستوى 1', sublabel: 'الأساسيات', icon: 'N1', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: 'المستوى 2', sublabel: 'التطبيق', icon: 'N2', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: 'المستوى 3', sublabel: 'الاستدلال', icon: 'N3', color: '#EF4444', bgColor: '#FEE2E2' }
        },
        back: '<- رجوع',
        writeAnswer: 'اكتب إجابتك هنا',
        check: 'تحقق',
        showHint: 'إظهار تلميح',
        showResolution: 'عرض الحل خطوة بخطوة',
        hideResolution: 'إخفاء الحل',
        guided: 'حل موجّه',
        finalAnswer: 'الإجابة النهائية',
        typicalError: 'خطأ شائع',
        success: 'إجابة صحيحة',
        fail: 'لا تزال غير مطابقة. راجع التلميحات والخطوات.',
        completed: 'تم إنجاز التحدي'
    }
}

const ES_TEXT: ChallengeText[] = [
    {
        title: 'Nivel 1 - Problema 1: Reconstruccion posicional',
        statement: 'Construye un numero de seis cifras con ordenes: 4, 0, 7, 2, 0, 5.',
        hints: ['Coloca cifras por orden.', 'Los ceros tambien ocupan posicion.', 'La forma es 4-0-7-2-0-5.'],
        resolution: ['Numero: $$407,205$$.', 'Lectura: cuatrocientos siete mil doscientos cinco.', 'Descomposicion: $$400,000 + 7,000 + 200 + 5$$.'],
        finalAnswer: '$$407,205$$',
        typicalError: 'Escribir $$47,205$$ por ignorar la decena de millar.'
    },
    {
        title: 'Nivel 1 - Problema 2: Ordena y compara',
        statement: 'Ordena: 82,600,000 ; 89,678,000,000 ; 7,000,000,000 ; 149,637 ; 24,356,000.',
        hints: ['Empieza contando cifras.', 'No mires solo la ultima cifra.', 'El de 11 cifras sera el mayor.'],
        resolution: ['Orden: $$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$.', 'Mayor y con mas cifras: $$89,678,000,000$$.'],
        finalAnswer: '$$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$',
        typicalError: 'Comparar por dos primeras cifras sin contar longitud.'
    },
    {
        title: 'Nivel 1 - Problema 3: Redondeo',
        statement: 'Redondea: $$24,963$$ a millares; $$72,580$$ a millares; $$384,523$$ a decenas de millar.',
        hints: ['Marca el orden.', 'Mira solo la cifra siguiente.', 'Sustituye el resto por ceros.'],
        resolution: ['$$24,963 -> 25,000$$', '$$72,580 -> 73,000$$', '$$384,523 -> 380,000$$ (a decenas de millar).'],
        finalAnswer: '$$25,000$$, $$73,000$$, $$380,000$$',
        typicalError: 'Mirar la cifra equivocada al redondear.'
    },
    {
        title: 'Nivel 2 - Problema 1: Fruta en cajas',
        statement: '8 cajas de 15 kg y 26 cajas de 8 kg. Cuantos kg en total?',
        hints: ['Separa tipos de caja.', 'Agrupa 20+6.', 'Suma ambos resultados.'],
        resolution: ['$$8\cdot15 = 120$$', '$$(20+6)\cdot8 = 208$$', 'Total: $$328$$ kg.'],
        finalAnswer: '$$328$$ kg',
        typicalError: 'Mezclar todos los datos sin modelo.'
    },
    {
        title: 'Nivel 2 - Problema 2: Bandejas y cajas',
        statement: 'Con $$1274$$ huevos, bandejas de $$30$$ y cajas de $$10$$ bandejas. Que sobra?',
        hints: ['Primero huevos->bandejas.', 'Luego bandejas->cajas.', 'Interpreta ambos restos.'],
        resolution: ['$$1274:30 = 42$$ y resto $$14$$ huevos.', '$$42:10 = 4$$ y resto $$2$$ bandejas.'],
        finalAnswer: '$$14$$ huevos y $$2$$ bandejas',
        typicalError: 'Mezclar niveles de unidades.'
    },
    {
        title: 'Nivel 2 - Problema 3: Jerarquia',
        statement: 'Resuelve: $$2+3\cdot4$$, $$(2+3)\cdot4$$, $$26-5\cdot(2+3)+6$$.',
        hints: ['Parentesis primero.', 'Luego multiplicacion/division.', 'Al final suma/resta.'],
        resolution: ['$$2+3\cdot4=14$$', '$$(2+3)\cdot4=20$$', '$$26-5\cdot(2+3)+6=7$$'],
        finalAnswer: '$$14$$, $$20$$ y $$7$$',
        typicalError: 'Resolver todo en orden de escritura.'
    },
    {
        title: 'Nivel 3 - Problema 1: Numero oculto',
        statement: 'Numero de 5 cifras, suma de cifras $$5$$, y al intercambiar unidades con millares aumenta $$999$$.',
        hints: ['Plantea $$999(b-a)=999$$.', 'Obtienes $$b-a=1$$.', 'Busca caso valido con suma 5.'],
        resolution: ['Una solucion valida: $$40001$$.', 'Comprobacion: $$41000-40001=999$$.'],
        finalAnswer: '$$40001$$',
        typicalError: 'Probar al azar sin ecuacion posicional.'
    },
    {
        title: 'Nivel 3 - Problema 2: Aproximacion por contexto',
        statement: 'Con $$149,637$$ euros, da version para informe, conversacion y titular.',
        hints: ['No todos los contextos piden misma precision.', 'Tecnico: mas preciso.', 'Conversacion/titular: aproximacion clara.'],
        resolution: ['Informe: $$149,637$$ exacto.', 'Conversacion/titular: alrededor de $$150,000$$.'],
        finalAnswer: '$$149,637$$ y $$150,000$$ segun contexto',
        typicalError: 'Pensar que solo existe una aproximacion correcta.'
    },
    {
        title: 'Nivel 3 - Problema 3: Produccion y venta',
        statement: '200 arboles, 7 cajas por arbol, 5 kg por caja, 2 euro/kg y palets de 20 cajas.',
        hints: ['Primero cajas totales.', 'Luego pasa a kg e ingresos.', 'Finalmente divide cajas entre 20.'],
        resolution: ['Cajas: $$1400$$.', 'Kg: $$7000$$.', 'Ingreso: $$14,000$$ euro.', 'Palets: $$70$$ y resto $$0$$.'],
        finalAnswer: '$$7000$$ kg, $$14,000$$ euro, $$70$$ palets',
        typicalError: 'Multiplicar por 20 en vez de dividir para palets.'
    }
]

const EU_TEXT: ChallengeText[] = [
    {
        title: '1. maila - 1. problema: Rekonstrukzio posizionala',
        statement: 'Sei zifrako zenbaki bat eraiki: 4, 0, 7, 2, 0, 5 ordenetan.',
        hints: ['Zifrak ordenaren arabera jarri.', 'Zeroek ere posizioa dute.', 'Forma: 4-0-7-2-0-5.'],
        resolution: ['Zenbakia: $$407,205$$.', 'Irakurketa eta deskonposizioa: $$400,000 + 7,000 + 200 + 5$$.'],
        finalAnswer: '$$407,205$$',
        typicalError: '$$47,205$$ idaztea, orden bat galduta.'
    },
    {
        title: '1. maila - 2. problema: Ordenatu eta konparatu',
        statement: 'Ordenatu: 82,600,000 ; 89,678,000,000 ; 7,000,000,000 ; 149,637 ; 24,356,000.',
        hints: ['Lehenik zifra kopurua kontatu.', 'Ez begiratu azken zifrari soilik.', '11 zifrakoa handiena da.'],
        resolution: ['$$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$.'],
        finalAnswer: 'Orden zuzena goikoa da',
        typicalError: 'Zenbakiaren luzera ez kontuan hartzea.'
    },
    {
        title: '1. maila - 3. problema: Biribiltzea',
        statement: 'Biribildu: $$24,963$$ milakoetara; $$72,580$$ milakoetara; $$384,523$$ hamarmilakoetara.',
        hints: ['Markatu helburuko ordena.', 'Begiratu hurrengo zifra bakarrik.', 'Jarri zeroak eskuinean.'],
        resolution: ['$$24,963 -> 25,000$$', '$$72,580 -> 73,000$$', '$$384,523 -> 380,000$$'],
        finalAnswer: '$$25,000$$, $$73,000$$, $$380,000$$',
        typicalError: 'Zifra okerra begiratzea.'
    },
    {
        title: '2. maila - 1. problema: Fruta kutxetan',
        statement: '8 kutxa 15 kg-ko eta 26 kutxa 8 kg-ko. Zenbat kg guztira?',
        hints: ['Bi taldeak bereizi.', '20+6 batu.', 'Bi emaitzak batu.'],
        resolution: ['$$8\cdot15=120$$', '$$26\cdot8=208$$', 'Guztira: $$328$$ kg'],
        finalAnswer: '$$328$$ kg',
        typicalError: 'Datuak nahastea eredurik gabe.'
    },
    {
        title: '2. maila - 2. problema: Erretiluak eta kaxak',
        statement: '$$1274$$ arrautza, $$30$$eko erretiluak eta $$10$$ erretiluko kaxak. Zer soberan?',
        hints: ['Lehenik arrautzak->erretiluak.', 'Gero erretiluak->kaxak.', 'Bi hondarrak interpretatu.'],
        resolution: ['$$1274:30 = 42$$ eta hondarra $$14$$.', '$$42:10 = 4$$ eta hondarra $$2$$.'],
        finalAnswer: '$$14$$ arrautza eta $$2$$ erretilu',
        typicalError: 'Unitate-mailak nahastea.'
    },
    {
        title: '2. maila - 3. problema: Hierarkia',
        statement: 'Ebatzi: $$2+3\cdot4$$, $$(2+3)\cdot4$$, $$26-5\cdot(2+3)+6$$.',
        hints: ['Parentesiak lehenik.', 'Ondoren biderketa/zatiketa.', 'Azkenik batuketa/kenketa.'],
        resolution: ['$$14$$, $$20$$ eta $$7$$.'],
        finalAnswer: '$$14$$, $$20$$, $$7$$',
        typicalError: 'Idazketa-ordenan zuzenean kalkulatzea.'
    },
    {
        title: '3. maila - 1. problema: Ezkutuko zenbakia',
        statement: '5 zifrako zenbakia, zifren batura $$5$$, eta trukatzean $$999$$ igotzen da.',
        hints: ['Planteatu $$999(b-a)=999$$.', '$$b-a=1$$ lortzen da.', 'Batura 5 duen kasu baliozkoa bilatu.'],
        resolution: ['Soluzio bat: $$40001$$.', 'Egiaztapena: $$41000-40001=999$$.'],
        finalAnswer: '$$40001$$',
        typicalError: 'Ausaz probatzea eredurik gabe.'
    },
    {
        title: '3. maila - 2. problema: Hurbilketa testuinguruan',
        statement: '$$149,637$$ eurorekin, eman bertsioa txosten teknikorako, elkarrizketarako eta titularrerako.',
        hints: ['Testuinguru bakoitzak zehaztasun maila desberdina du.', 'Txostena: zehaztasun handia.', 'Elkarrizketa/titularra: hurbilketa argia.'],
        resolution: ['Txostena: $$149,637$$.', 'Beste testuinguruetan: $$150,000$$ inguruan.'],
        finalAnswer: '$$149,637$$ eta $$150,000$$',
        typicalError: 'Hurbilketa bakarra dagoela pentsatzea.'
    },
    {
        title: '3. maila - 3. problema: Ekoizpena eta salmenta',
        statement: '200 zuhaitz, 7 kutxa/zuhaitz, 5 kg/kutxa, 2 euro/kg eta 20 kutxako paletak.',
        hints: ['Lehenik kutxa kopurua.', 'Gero kg eta diru-sarrera.', 'Azkenik kutxak 20z zatitu.'],
        resolution: ['Kutxak: $$1400$$.', 'Kg: $$7000$$.', 'Dirua: $$14,000$$ euro.', 'Paletak: $$70$$ eta hondarra $$0$$.'],
        finalAnswer: '$$7000$$ kg, $$14,000$$ euro, $$70$$ palet',
        typicalError: 'Paletetan biderkatu egitea zatitu beharrean.'
    }
]

const AR_TEXT: ChallengeText[] = [
    {
        title: 'المستوى 1 - المسألة 1: بناء عددي موضعي',
        statement: 'كوّن عددًا من 6 خانات بالترتيب: 4، 0، 7، 2، 0، 5.',
        hints: ['ضع الأرقام حسب الرتبة.', 'الأصفار لها موضع أيضًا.', 'الشكل هو 4-0-7-2-0-5.'],
        resolution: ['العدد: $$407,205$$.', 'التحليل: $$400,000 + 7,000 + 200 + 5$$.'],
        finalAnswer: '$$407,205$$',
        typicalError: 'كتابة $$47,205$$ بسبب إهمال رتبة عشرات الألوف.'
    },
    {
        title: 'المستوى 1 - المسألة 2: رتب وقارن',
        statement: 'رتب: 82,600,000 ; 89,678,000,000 ; 7,000,000,000 ; 149,637 ; 24,356,000.',
        hints: ['ابدأ بعدد الخانات.', 'لا تعتمد على الخانة الأخيرة فقط.', 'العدد ذو 11 خانة هو الأكبر.'],
        resolution: ['$$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$.'],
        finalAnswer: 'الترتيب الصحيح كما في السطر السابق',
        typicalError: 'مقارنة القيم الأولى دون حساب طول العدد.'
    },
    {
        title: 'المستوى 1 - المسألة 3: التقريب',
        statement: 'قرّب: $$24,963$$ إلى الآلاف؛ $$72,580$$ إلى الآلاف؛ $$384,523$$ إلى عشرات الآلاف.',
        hints: ['حدد المرتبة المطلوبة.', 'انظر فقط إلى الرقم التالي.', 'ضع أصفارًا في يمين المرتبة.'],
        resolution: ['$$24,963 -> 25,000$$', '$$72,580 -> 73,000$$', '$$384,523 -> 380,000$$'],
        finalAnswer: '$$25,000$$، $$73,000$$، $$380,000$$',
        typicalError: 'النظر إلى رقم خاطئ أثناء التقريب.'
    },
    {
        title: 'المستوى 2 - المسألة 1: فاكهة في صناديق',
        statement: '8 صناديق بوزن 15 كغ و26 صندوقًا بوزن 8 كغ. كم كغ في المجموع؟',
        hints: ['افصل نوعي الصناديق.', 'اجمع 20+6.', 'اجمع الناتجين.'],
        resolution: ['$$8\cdot15=120$$', '$$26\cdot8=208$$', 'المجموع $$328$$ كغ.'],
        finalAnswer: '$$328$$ كغ',
        typicalError: 'خلط كل المعطيات دون نموذج حسابي.'
    },
    {
        title: 'المستوى 2 - المسألة 2: صواني وصناديق',
        statement: 'مع $$1274$$ بيضة، صواني من $$30$$ وصناديق من $$10$$ صواني. ما المتبقي؟',
        hints: ['أولًا بيض -> صواني.', 'ثم صواني -> صناديق.', 'فسّر الباقيين.'],
        resolution: ['$$1274:30 = 42$$ والباقي $$14$$ بيضة.', '$$42:10 = 4$$ والباقي $$2$$ صينية.'],
        finalAnswer: '$$14$$ بيضة و$$2$$ صينية',
        typicalError: 'خلط مستويي الوحدات.'
    },
    {
        title: 'المستوى 2 - المسألة 3: ترتيب العمليات',
        statement: 'احسب: $$2+3\cdot4$$، $$(2+3)\cdot4$$، $$26-5\cdot(2+3)+6$$.',
        hints: ['الأقواس أولًا.', 'ثم الضرب/القسمة.', 'ثم الجمع/الطرح.'],
        resolution: ['$$14$$، $$20$$، $$7$$.'],
        finalAnswer: '$$14$$، $$20$$، $$7$$',
        typicalError: 'الحساب حسب ترتيب الكتابة فقط.'
    },
    {
        title: 'المستوى 3 - المسألة 1: العدد المخفي',
        statement: 'عدد من 5 خانات، مجموع خاناته $$5$$، وعند تبديل الآحاد مع الآلاف يزيد $$999$$.',
        hints: ['اكتب $$999(b-a)=999$$.', 'إذن $$b-a=1$$.', 'ابحث عن حالة مجموعها 5.'],
        resolution: ['إحدى الحلول: $$40001$$.', 'تحقق: $$41000-40001=999$$.'],
        finalAnswer: '$$40001$$',
        typicalError: 'التجريب العشوائي دون معادلة موضعية.'
    },
    {
        title: 'المستوى 3 - المسألة 2: التقريب حسب السياق',
        statement: 'لـ $$149,637$$ يورو، أعط نسخة للتقرير الفني، والمحادثة، والعنوان الصحفي.',
        hints: ['ليست كل السياقات بنفس الدقة.', 'التقرير: دقة أعلى.', 'المحادثة/العنوان: تقريب واضح.'],
        resolution: ['تقرير: $$149,637$$.', 'سياق عام: نحو $$150,000$$.'],
        finalAnswer: '$$149,637$$ و$$150,000$$ حسب السياق',
        typicalError: 'الاعتقاد بوجود تقريب وحيد دائمًا.'
    },
    {
        title: 'المستوى 3 - المسألة 3: إنتاج وبيع',
        statement: '200 شجرة، 7 صناديق/شجرة، 5 كغ/صندوق، 2 يورو/كغ، ومنصات من 20 صندوقًا.',
        hints: ['أولًا عدد الصناديق الكلي.', 'ثم الكيلوغرامات والدخل.', 'أخيرًا اقسم الصناديق على 20.'],
        resolution: ['الصناديق $$1400$$.', 'الكيلوغرامات $$7000$$.', 'الدخل $$14,000$$ يورو.', 'المنصات $$70$$ والباقي $$0$$.'],
        finalAnswer: '$$7000$$ كغ، $$14,000$$ يورو، $$70$$ منصة',
        typicalError: 'الضرب في 20 بدل القسمة عند حساب المنصات.'
    }
]

function buildChallenges(lang: Lang): Challenge[] {
    const text = lang === 'eu' ? EU_TEXT : lang === 'ar' ? AR_TEXT : ES_TEXT
    return META.map((meta, index) => ({ ...meta, text: text[index] }))
}

export function MissionPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const ui = UI[lang]
    const challenges = useMemo(() => buildChallenges(lang), [lang])

    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle')
    const [hintIndex, setHintIndex] = useState(-1)
    const [showResolution, setShowResolution] = useState(false)
    const [completed, setCompleted] = useState<number[]>([])
    const [totalPoints, setTotalPoints] = useState(0)

    const filtered = selectedDifficulty
        ? challenges.filter((item) => item.difficulty === selectedDifficulty)
        : []

    const checkAnswer = () => {
        if (!currentChallenge) return
        const ok = currentChallenge.validate(answer)
        setFeedback(ok ? 'success' : 'error')
        if (ok && !completed.includes(currentChallenge.id)) {
            setCompleted((state) => [...state, currentChallenge.id])
            setTotalPoints((state) => state + currentChallenge.points)
        }
    }

    const openChallenge = (challenge: Challenge) => {
        setCurrentChallenge(challenge)
        setAnswer('')
        setFeedback('idle')
        setHintIndex(-1)
        setShowResolution(false)
    }

    const handleBack = () => {
        if (currentChallenge) setCurrentChallenge(null)
        else setSelectedDifficulty(null)
        setAnswer('')
        setFeedback('idle')
        setHintIndex(-1)
        setShowResolution(false)
    }

    const progress = (difficulty: Difficulty) => {
        const level = challenges.filter((item) => item.difficulty === difficulty)
        const done = level.filter((item) => completed.includes(item.id)).length
        return { done, total: level.length }
    }

    if (!selectedDifficulty) {
        return (
            <div className="mission-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="container">
                    <header className="mission-header">
                        <h1>{ui.title}</h1>
                        <p className="mission-subtitle">{ui.subtitle}</p>
                    </header>

                    <div className="points-display glass">
                        <span className="points-icon">PTS</span>
                        <span className="points-value">{totalPoints}</span>
                        <span className="points-label">{ui.totalPoints}</span>
                    </div>

                    <div className="difficulty-grid">
                        {(Object.keys(ui.levelLabel) as Difficulty[]).map((difficulty) => {
                            const cfg = ui.levelLabel[difficulty]
                            const p = progress(difficulty)
                            return (
                                <button
                                    key={difficulty}
                                    className="difficulty-card glass"
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                    style={{ '--level-color': cfg.color, '--level-bg': cfg.bgColor } as React.CSSProperties}
                                >
                                    <span className="difficulty-icon">{cfg.icon}</span>
                                    <h3>{cfg.label}</h3>
                                    <p className="difficulty-sublabel">{cfg.sublabel}</p>
                                    <div className="difficulty-progress">
                                        <div className="mini-progress-bar">
                                            <div className="mini-progress-fill" style={{ width: `${(p.done / p.total) * 100}%` }} />
                                        </div>
                                        <span>{p.done}/{p.total}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (!currentChallenge) {
        const cfg = ui.levelLabel[selectedDifficulty]
        return (
            <div className="mission-page">
                <div className="container">
                    <button className="back-button" onClick={handleBack}>{ui.back}</button>

                    <header className="mission-header level-header" style={{ '--level-color': cfg.color } as React.CSSProperties}>
                        <span className="level-icon">{cfg.icon}</span>
                        <h1>{cfg.label}</h1>
                        <p className="mission-subtitle">{cfg.sublabel}</p>
                    </header>

                    <div className="challenges-grid">
                        {filtered.map((challenge, index) => {
                            const isDone = completed.includes(challenge.id)
                            return (
                                <button
                                    key={challenge.id}
                                    className={`challenge-card glass ${isDone ? 'completed' : ''}`}
                                    onClick={() => openChallenge(challenge)}
                                    style={{ '--level-color': cfg.color } as React.CSSProperties}
                                >
                                    <span className="challenge-number">{index + 1}</span>
                                    <h4>{challenge.text.title}</h4>
                                    <div className="challenge-meta">
                                        <span className="challenge-points">+{challenge.points} pts</span>
                                        {isDone && <span className="completed-check">OK</span>}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const cfg = ui.levelLabel[currentChallenge.difficulty]

    return (
        <div className="mission-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container">
                <button className="back-button" onClick={handleBack}>{ui.back}</button>

                <div className="challenge-container glass" style={{ '--level-color': cfg.color } as React.CSSProperties}>
                    <div className="challenge-header">
                        <span className="challenge-difficulty-badge" style={{ background: cfg.bgColor, color: cfg.color }}>
                            {cfg.icon} {cfg.label}
                        </span>
                        <span className="challenge-points-badge">+{currentChallenge.points} pts</span>
                    </div>

                    <h2 className="challenge-title">{currentChallenge.text.title}</h2>
                    <p className="challenge-description">{currentChallenge.text.statement}</p>

                    <div className="answer-section">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                                setFeedback('idle')
                            }}
                            placeholder={ui.writeAnswer}
                            className={`answer-input ${feedback !== 'idle' ? feedback : ''}`}
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        />
                        <button onClick={checkAnswer} className="btn btn-primary check-btn">{ui.check}</button>
                    </div>

                    {feedback === 'success' && (
                        <div className="feedback success" role="alert">
                            <span className="feedback-icon">OK</span>
                            <p>{ui.success}</p>
                        </div>
                    )}

                    {feedback === 'error' && (
                        <div className="feedback error" role="alert">
                            <span className="feedback-icon">X</span>
                            <p>{ui.fail}</p>
                        </div>
                    )}

                    <div className="mission-tools-row">
                        <button className="hint-toggle" onClick={() => setHintIndex((v) => Math.min(v + 1, currentChallenge.text.hints.length - 1))}>
                            {ui.showHint} {Math.min(hintIndex + 2, currentChallenge.text.hints.length)}
                        </button>
                        <button className="hint-toggle" onClick={() => setShowResolution((v) => !v)}>
                            {showResolution ? ui.hideResolution : ui.showResolution}
                        </button>
                    </div>

                    {hintIndex >= 0 && (
                        <div className="hint-box">
                            <p>{currentChallenge.text.hints[hintIndex]}</p>
                        </div>
                    )}

                    {showResolution && (
                        <div className="resolution-box">
                            <h3>{ui.guided}</h3>
                            <ol>
                                {currentChallenge.text.resolution.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                            <p><strong>{ui.finalAnswer}:</strong> {currentChallenge.text.finalAnswer}</p>
                            <p><strong>{ui.typicalError}:</strong> {currentChallenge.text.typicalError}</p>
                        </div>
                    )}
                </div>

                {completed.includes(currentChallenge.id) && (
                    <div className="success-banner glass">
                        <span>LOGRO</span>
                        <p>{ui.completed}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
