import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
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

function decodeMojibake(input: string) {
    if (!/[ØÙ]/.test(input)) return input
    try {
        const bytes = Uint8Array.from(input, (char) => char.charCodeAt(0))
        return new TextDecoder('utf-8').decode(bytes)
    } catch {
        return input
    }
}

function decodeChallengeText(text: ChallengeText): ChallengeText {
    return {
        title: decodeMojibake(text.title),
        statement: decodeMojibake(text.statement),
        hints: text.hints.map(decodeMojibake),
        resolution: text.resolution.map(decodeMojibake),
        finalAnswer: decodeMojibake(text.finalAnswer),
        typicalError: decodeMojibake(text.typicalError)
    }
}

function decodeUiText(text: UiText): UiText {
    return {
        title: decodeMojibake(text.title),
        subtitle: decodeMojibake(text.subtitle),
        totalPoints: decodeMojibake(text.totalPoints),
        levelLabel: {
            nivel1: {
                ...text.levelLabel.nivel1,
                label: decodeMojibake(text.levelLabel.nivel1.label),
                sublabel: decodeMojibake(text.levelLabel.nivel1.sublabel)
            },
            nivel2: {
                ...text.levelLabel.nivel2,
                label: decodeMojibake(text.levelLabel.nivel2.label),
                sublabel: decodeMojibake(text.levelLabel.nivel2.sublabel)
            },
            nivel3: {
                ...text.levelLabel.nivel3,
                label: decodeMojibake(text.levelLabel.nivel3.label),
                sublabel: decodeMojibake(text.levelLabel.nivel3.sublabel)
            }
        },
        back: decodeMojibake(text.back),
        writeAnswer: decodeMojibake(text.writeAnswer),
        check: decodeMojibake(text.check),
        showHint: decodeMojibake(text.showHint),
        showResolution: decodeMojibake(text.showResolution),
        hideResolution: decodeMojibake(text.hideResolution),
        guided: decodeMojibake(text.guided),
        finalAnswer: decodeMojibake(text.finalAnswer),
        typicalError: decodeMojibake(text.typicalError),
        success: decodeMojibake(text.success),
        fail: decodeMojibake(text.fail),
        completed: decodeMojibake(text.completed)
    }
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
            nivel1: { label: 'Nivel 1', sublabel: 'Fundamentos', icon: '🌱', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: 'Nivel 2', sublabel: 'Aplicacion', icon: '🔥', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: 'Nivel 3', sublabel: 'Razonamiento', icon: '⭐', color: '#EF4444', bgColor: '#FEE2E2' }
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
            nivel1: { label: '1. maila', sublabel: 'Oinarriak', icon: '🌱', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: '2. maila', sublabel: 'Aplikazioa', icon: '🔥', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: '3. maila', sublabel: 'Arrazoiketa', icon: '⭐', color: '#EF4444', bgColor: '#FEE2E2' }
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
        title: 'Ø§Ù„ØªØ­Ø¯ÙŠØ§Øª: Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ©',
        subtitle: '9 Ù…Ø³Ø§Ø¦Ù„ Ø¨Ù…Ø³ØªÙˆÙŠØ§Øª Ù…Ø¹ ØªÙ„Ù…ÙŠØ­Ø§Øª ØªØ¯Ø±ÙŠØ¬ÙŠØ© ÙˆØ­Ù„ Ù…ÙˆØ¬Ù‘Ù‡.',
        totalPoints: 'Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„Ù†Ù‚Ø§Ø·',
        levelLabel: {
            nivel1: { label: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 1', sublabel: 'Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ§Øª', icon: '🌱', color: '#22C55E', bgColor: '#DCFCE7' },
            nivel2: { label: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 2', sublabel: 'Ø§Ù„ØªØ·Ø¨ÙŠÙ‚', icon: '🔥', color: '#F59E0B', bgColor: '#FEF3C7' },
            nivel3: { label: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 3', sublabel: 'Ø§Ù„Ø§Ø³ØªØ¯Ù„Ø§Ù„', icon: '⭐', color: '#EF4444', bgColor: '#FEE2E2' }
        },
        back: '<- Ø±Ø¬ÙˆØ¹',
        writeAnswer: 'Ø§ÙƒØªØ¨ Ø¥Ø¬Ø§Ø¨ØªÙƒ Ù‡Ù†Ø§',
        check: 'ØªØ­Ù‚Ù‚',
        showHint: 'Ø¥Ø¸Ù‡Ø§Ø± ØªÙ„Ù…ÙŠØ­',
        showResolution: 'Ø¹Ø±Ø¶ Ø§Ù„Ø­Ù„ Ø®Ø·ÙˆØ© Ø¨Ø®Ø·ÙˆØ©',
        hideResolution: 'Ø¥Ø®ÙØ§Ø¡ Ø§Ù„Ø­Ù„',
        guided: 'Ø­Ù„ Ù…ÙˆØ¬Ù‘Ù‡',
        finalAnswer: 'Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠØ©',
        typicalError: 'Ø®Ø·Ø£ Ø´Ø§Ø¦Ø¹',
        success: 'Ø¥Ø¬Ø§Ø¨Ø© ØµØ­ÙŠØ­Ø©',
        fail: 'Ù„Ø§ ØªØ²Ø§Ù„ ØºÙŠØ± Ù…Ø·Ø§Ø¨Ù‚Ø©. Ø±Ø§Ø¬Ø¹ Ø§Ù„ØªÙ„Ù…ÙŠØ­Ø§Øª ÙˆØ§Ù„Ø®Ø·ÙˆØ§Øª.',
        completed: 'ØªÙ… Ø¥Ù†Ø¬Ø§Ø² Ø§Ù„ØªØ­Ø¯ÙŠ'
    }
}

const UI_FIXED: Record<Lang, UiText> = {
    es: UI.es,
    eu: UI.eu,
    ar: decodeUiText(UI.ar)
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
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 1 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 1: Ø¨Ù†Ø§Ø¡ Ø¹Ø¯Ø¯ÙŠ Ù…ÙˆØ¶Ø¹ÙŠ',
        statement: 'ÙƒÙˆÙ‘Ù† Ø¹Ø¯Ø¯Ù‹Ø§ Ù…Ù† 6 Ø®Ø§Ù†Ø§Øª Ø¨Ø§Ù„ØªØ±ØªÙŠØ¨: 4ØŒ 0ØŒ 7ØŒ 2ØŒ 0ØŒ 5.',
        hints: ['Ø¶Ø¹ Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ø­Ø³Ø¨ Ø§Ù„Ø±ØªØ¨Ø©.', 'Ø§Ù„Ø£ØµÙØ§Ø± Ù„Ù‡Ø§ Ù…ÙˆØ¶Ø¹ Ø£ÙŠØ¶Ù‹Ø§.', 'Ø§Ù„Ø´ÙƒÙ„ Ù‡Ùˆ 4-0-7-2-0-5.'],
        resolution: ['Ø§Ù„Ø¹Ø¯Ø¯: $$407,205$$.', 'Ø§Ù„ØªØ­Ù„ÙŠÙ„: $$400,000 + 7,000 + 200 + 5$$.'],
        finalAnswer: '$$407,205$$',
        typicalError: 'ÙƒØªØ§Ø¨Ø© $$47,205$$ Ø¨Ø³Ø¨Ø¨ Ø¥Ù‡Ù…Ø§Ù„ Ø±ØªØ¨Ø© Ø¹Ø´Ø±Ø§Øª Ø§Ù„Ø£Ù„ÙˆÙ.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 1 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 2: Ø±ØªØ¨ ÙˆÙ‚Ø§Ø±Ù†',
        statement: 'Ø±ØªØ¨: 82,600,000 ; 89,678,000,000 ; 7,000,000,000 ; 149,637 ; 24,356,000.',
        hints: ['Ø§Ø¨Ø¯Ø£ Ø¨Ø¹Ø¯Ø¯ Ø§Ù„Ø®Ø§Ù†Ø§Øª.', 'Ù„Ø§ ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø§Ù†Ø© Ø§Ù„Ø£Ø®ÙŠØ±Ø© ÙÙ‚Ø·.', 'Ø§Ù„Ø¹Ø¯Ø¯ Ø°Ùˆ 11 Ø®Ø§Ù†Ø© Ù‡Ùˆ Ø§Ù„Ø£ÙƒØ¨Ø±.'],
        resolution: ['$$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$.'],
        finalAnswer: 'Ø§Ù„ØªØ±ØªÙŠØ¨ Ø§Ù„ØµØ­ÙŠØ­ ÙƒÙ…Ø§ ÙÙŠ Ø§Ù„Ø³Ø·Ø± Ø§Ù„Ø³Ø§Ø¨Ù‚',
        typicalError: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„Ø£ÙˆÙ„Ù‰ Ø¯ÙˆÙ† Ø­Ø³Ø§Ø¨ Ø·ÙˆÙ„ Ø§Ù„Ø¹Ø¯Ø¯.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 1 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 3: Ø§Ù„ØªÙ‚Ø±ÙŠØ¨',
        statement: 'Ù‚Ø±Ù‘Ø¨: $$24,963$$ Ø¥Ù„Ù‰ Ø§Ù„Ø¢Ù„Ø§ÙØ› $$72,580$$ Ø¥Ù„Ù‰ Ø§Ù„Ø¢Ù„Ø§ÙØ› $$384,523$$ Ø¥Ù„Ù‰ Ø¹Ø´Ø±Ø§Øª Ø§Ù„Ø¢Ù„Ø§Ù.',
        hints: ['Ø­Ø¯Ø¯ Ø§Ù„Ù…Ø±ØªØ¨Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©.', 'Ø§Ù†Ø¸Ø± ÙÙ‚Ø· Ø¥Ù„Ù‰ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØªØ§Ù„ÙŠ.', 'Ø¶Ø¹ Ø£ØµÙØ§Ø±Ù‹Ø§ ÙÙŠ ÙŠÙ…ÙŠÙ† Ø§Ù„Ù…Ø±ØªØ¨Ø©.'],
        resolution: ['$$24,963 -> 25,000$$', '$$72,580 -> 73,000$$', '$$384,523 -> 380,000$$'],
        finalAnswer: '$$25,000$$ØŒ $$73,000$$ØŒ $$380,000$$',
        typicalError: 'Ø§Ù„Ù†Ø¸Ø± Ø¥Ù„Ù‰ Ø±Ù‚Ù… Ø®Ø§Ø·Ø¦ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„ØªÙ‚Ø±ÙŠØ¨.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 2 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 1: ÙØ§ÙƒÙ‡Ø© ÙÙŠ ØµÙ†Ø§Ø¯ÙŠÙ‚',
        statement: '8 ØµÙ†Ø§Ø¯ÙŠÙ‚ Ø¨ÙˆØ²Ù† 15 ÙƒØº Ùˆ26 ØµÙ†Ø¯ÙˆÙ‚Ù‹Ø§ Ø¨ÙˆØ²Ù† 8 ÙƒØº. ÙƒÙ… ÙƒØº ÙÙŠ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ØŸ',
        hints: ['Ø§ÙØµÙ„ Ù†ÙˆØ¹ÙŠ Ø§Ù„ØµÙ†Ø§Ø¯ÙŠÙ‚.', 'Ø§Ø¬Ù…Ø¹ 20+6.', 'Ø§Ø¬Ù…Ø¹ Ø§Ù„Ù†Ø§ØªØ¬ÙŠÙ†.'],
        resolution: ['$$8\cdot15=120$$', '$$26\cdot8=208$$', 'Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ $$328$$ ÙƒØº.'],
        finalAnswer: '$$328$$ ÙƒØº',
        typicalError: 'Ø®Ù„Ø· ÙƒÙ„ Ø§Ù„Ù…Ø¹Ø·ÙŠØ§Øª Ø¯ÙˆÙ† Ù†Ù…ÙˆØ°Ø¬ Ø­Ø³Ø§Ø¨ÙŠ.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 2 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 2: ØµÙˆØ§Ù†ÙŠ ÙˆØµÙ†Ø§Ø¯ÙŠÙ‚',
        statement: 'Ù…Ø¹ $$1274$$ Ø¨ÙŠØ¶Ø©ØŒ ØµÙˆØ§Ù†ÙŠ Ù…Ù† $$30$$ ÙˆØµÙ†Ø§Ø¯ÙŠÙ‚ Ù…Ù† $$10$$ ØµÙˆØ§Ù†ÙŠ. Ù…Ø§ Ø§Ù„Ù…ØªØ¨Ù‚ÙŠØŸ',
        hints: ['Ø£ÙˆÙ„Ù‹Ø§ Ø¨ÙŠØ¶ -> ØµÙˆØ§Ù†ÙŠ.', 'Ø«Ù… ØµÙˆØ§Ù†ÙŠ -> ØµÙ†Ø§Ø¯ÙŠÙ‚.', 'ÙØ³Ù‘Ø± Ø§Ù„Ø¨Ø§Ù‚ÙŠÙŠÙ†.'],
        resolution: ['$$1274:30 = 42$$ ÙˆØ§Ù„Ø¨Ø§Ù‚ÙŠ $$14$$ Ø¨ÙŠØ¶Ø©.', '$$42:10 = 4$$ ÙˆØ§Ù„Ø¨Ø§Ù‚ÙŠ $$2$$ ØµÙŠÙ†ÙŠØ©.'],
        finalAnswer: '$$14$$ Ø¨ÙŠØ¶Ø© Ùˆ$$2$$ ØµÙŠÙ†ÙŠØ©',
        typicalError: 'Ø®Ù„Ø· Ù…Ø³ØªÙˆÙŠÙŠ Ø§Ù„ÙˆØ­Ø¯Ø§Øª.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 2 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 3: ØªØ±ØªÙŠØ¨ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª',
        statement: 'Ø§Ø­Ø³Ø¨: $$2+3\cdot4$$ØŒ $$(2+3)\cdot4$$ØŒ $$26-5\cdot(2+3)+6$$.',
        hints: ['Ø§Ù„Ø£Ù‚ÙˆØ§Ø³ Ø£ÙˆÙ„Ù‹Ø§.', 'Ø«Ù… Ø§Ù„Ø¶Ø±Ø¨/Ø§Ù„Ù‚Ø³Ù…Ø©.', 'Ø«Ù… Ø§Ù„Ø¬Ù…Ø¹/Ø§Ù„Ø·Ø±Ø­.'],
        resolution: ['$$14$$ØŒ $$20$$ØŒ $$7$$.'],
        finalAnswer: '$$14$$ØŒ $$20$$ØŒ $$7$$',
        typicalError: 'Ø§Ù„Ø­Ø³Ø§Ø¨ Ø­Ø³Ø¨ ØªØ±ØªÙŠØ¨ Ø§Ù„ÙƒØªØ§Ø¨Ø© ÙÙ‚Ø·.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 3 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 1: Ø§Ù„Ø¹Ø¯Ø¯ Ø§Ù„Ù…Ø®ÙÙŠ',
        statement: 'Ø¹Ø¯Ø¯ Ù…Ù† 5 Ø®Ø§Ù†Ø§ØªØŒ Ù…Ø¬Ù…ÙˆØ¹ Ø®Ø§Ù†Ø§ØªÙ‡ $$5$$ØŒ ÙˆØ¹Ù†Ø¯ ØªØ¨Ø¯ÙŠÙ„ Ø§Ù„Ø¢Ø­Ø§Ø¯ Ù…Ø¹ Ø§Ù„Ø¢Ù„Ø§Ù ÙŠØ²ÙŠØ¯ $$999$$.',
        hints: ['Ø§ÙƒØªØ¨ $$999(b-a)=999$$.', 'Ø¥Ø°Ù† $$b-a=1$$.', 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ø­Ø§Ù„Ø© Ù…Ø¬Ù…ÙˆØ¹Ù‡Ø§ 5.'],
        resolution: ['Ø¥Ø­Ø¯Ù‰ Ø§Ù„Ø­Ù„ÙˆÙ„: $$40001$$.', 'ØªØ­Ù‚Ù‚: $$41000-40001=999$$.'],
        finalAnswer: '$$40001$$',
        typicalError: 'Ø§Ù„ØªØ¬Ø±ÙŠØ¨ Ø§Ù„Ø¹Ø´ÙˆØ§Ø¦ÙŠ Ø¯ÙˆÙ† Ù…Ø¹Ø§Ø¯Ù„Ø© Ù…ÙˆØ¶Ø¹ÙŠØ©.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 3 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 2: Ø§Ù„ØªÙ‚Ø±ÙŠØ¨ Ø­Ø³Ø¨ Ø§Ù„Ø³ÙŠØ§Ù‚',
        statement: 'Ù„Ù€ $$149,637$$ ÙŠÙˆØ±ÙˆØŒ Ø£Ø¹Ø· Ù†Ø³Ø®Ø© Ù„Ù„ØªÙ‚Ø±ÙŠØ± Ø§Ù„ÙÙ†ÙŠØŒ ÙˆØ§Ù„Ù…Ø­Ø§Ø¯Ø«Ø©ØŒ ÙˆØ§Ù„Ø¹Ù†ÙˆØ§Ù† Ø§Ù„ØµØ­ÙÙŠ.',
        hints: ['Ù„ÙŠØ³Øª ÙƒÙ„ Ø§Ù„Ø³ÙŠØ§Ù‚Ø§Øª Ø¨Ù†ÙØ³ Ø§Ù„Ø¯Ù‚Ø©.', 'Ø§Ù„ØªÙ‚Ø±ÙŠØ±: Ø¯Ù‚Ø© Ø£Ø¹Ù„Ù‰.', 'Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø©/Ø§Ù„Ø¹Ù†ÙˆØ§Ù†: ØªÙ‚Ø±ÙŠØ¨ ÙˆØ§Ø¶Ø­.'],
        resolution: ['ØªÙ‚Ø±ÙŠØ±: $$149,637$$.', 'Ø³ÙŠØ§Ù‚ Ø¹Ø§Ù…: Ù†Ø­Ùˆ $$150,000$$.'],
        finalAnswer: '$$149,637$$ Ùˆ$$150,000$$ Ø­Ø³Ø¨ Ø§Ù„Ø³ÙŠØ§Ù‚',
        typicalError: 'Ø§Ù„Ø§Ø¹ØªÙ‚Ø§Ø¯ Ø¨ÙˆØ¬ÙˆØ¯ ØªÙ‚Ø±ÙŠØ¨ ÙˆØ­ÙŠØ¯ Ø¯Ø§Ø¦Ù…Ù‹Ø§.'
    },
    {
        title: 'Ø§Ù„Ù…Ø³ØªÙˆÙ‰ 3 - Ø§Ù„Ù…Ø³Ø£Ù„Ø© 3: Ø¥Ù†ØªØ§Ø¬ ÙˆØ¨ÙŠØ¹',
        statement: '200 Ø´Ø¬Ø±Ø©ØŒ 7 ØµÙ†Ø§Ø¯ÙŠÙ‚/Ø´Ø¬Ø±Ø©ØŒ 5 ÙƒØº/ØµÙ†Ø¯ÙˆÙ‚ØŒ 2 ÙŠÙˆØ±Ùˆ/ÙƒØºØŒ ÙˆÙ…Ù†ØµØ§Øª Ù…Ù† 20 ØµÙ†Ø¯ÙˆÙ‚Ù‹Ø§.',
        hints: ['Ø£ÙˆÙ„Ù‹Ø§ Ø¹Ø¯Ø¯ Ø§Ù„ØµÙ†Ø§Ø¯ÙŠÙ‚ Ø§Ù„ÙƒÙ„ÙŠ.', 'Ø«Ù… Ø§Ù„ÙƒÙŠÙ„ÙˆØºØ±Ø§Ù…Ø§Øª ÙˆØ§Ù„Ø¯Ø®Ù„.', 'Ø£Ø®ÙŠØ±Ù‹Ø§ Ø§Ù‚Ø³Ù… Ø§Ù„ØµÙ†Ø§Ø¯ÙŠÙ‚ Ø¹Ù„Ù‰ 20.'],
        resolution: ['Ø§Ù„ØµÙ†Ø§Ø¯ÙŠÙ‚ $$1400$$.', 'Ø§Ù„ÙƒÙŠÙ„ÙˆØºØ±Ø§Ù…Ø§Øª $$7000$$.', 'Ø§Ù„Ø¯Ø®Ù„ $$14,000$$ ÙŠÙˆØ±Ùˆ.', 'Ø§Ù„Ù…Ù†ØµØ§Øª $$70$$ ÙˆØ§Ù„Ø¨Ø§Ù‚ÙŠ $$0$$.'],
        finalAnswer: '$$7000$$ ÙƒØºØŒ $$14,000$$ ÙŠÙˆØ±ÙˆØŒ $$70$$ Ù…Ù†ØµØ©',
        typicalError: 'Ø§Ù„Ø¶Ø±Ø¨ ÙÙŠ 20 Ø¨Ø¯Ù„ Ø§Ù„Ù‚Ø³Ù…Ø© Ø¹Ù†Ø¯ Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ù†ØµØ§Øª.'
    }
]

const AR_TEXT_FIXED = AR_TEXT.map(decodeChallengeText)

function buildChallenges(lang: Lang): Challenge[] {
    const text = lang === 'eu' ? EU_TEXT : lang === 'ar' ? AR_TEXT_FIXED : ES_TEXT
    return META.map((meta, index) => ({ ...meta, text: text[index] }))
}

export function MissionPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const ui = UI_FIXED[lang]
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
                        <h1>🎯 {ui.title}</h1>
                        <p className="mission-subtitle">{ui.subtitle}</p>
                    </header>

                    <div className="points-display glass">
                        <span className="points-icon">🏆</span>
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
            <div className="mission-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
                                        {isDone && <span className="completed-check">✓</span>}
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
                    <p className="challenge-description"><MathText text={currentChallenge.text.statement} /></p>

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
                            <span className="feedback-icon">🎉</span>
                            <p>{ui.success}</p>
                        </div>
                    )}

                    {feedback === 'error' && (
                        <div className="feedback error" role="alert">
                            <span className="feedback-icon">❌</span>
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
                            <p><MathText text={currentChallenge.text.hints[hintIndex]} /></p>
                        </div>
                    )}

                    {showResolution && (
                        <div className="resolution-box">
                            <h3>{ui.guided}</h3>
                            <ol>
                                {currentChallenge.text.resolution.map((step) => (
                                    <li key={step}><MathText text={step} /></li>
                                ))}
                            </ol>
                            <p><strong>{ui.finalAnswer}:</strong> <MathText text={currentChallenge.text.finalAnswer} /></p>
                            <p><strong>{ui.typicalError}:</strong> <MathText text={currentChallenge.text.typicalError} /></p>
                        </div>
                    )}
                </div>

                {completed.includes(currentChallenge.id) && (
                    <div className="success-banner glass">
                        <span>🏆</span>
                        <p>{ui.completed}</p>
                    </div>
                )}
            </div>
        </div>
    )
}


