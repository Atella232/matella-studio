import {
    normalizeUnitLanguage,
    pickLocalizedText,
    type LocalizedText,
    type UnitLanguage
} from '../../../features/units/unitTypes'

export type { LocalizedText } from '../../../features/units/unitTypes'
export type FractionLang = UnitLanguage
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

const euTranslations: Record<string, string> = {
    'Escribe la fracción que representa 7 partes tomadas de 12 partes iguales.': 'Idatzi 12 zati berdinetatik 7 hartzea adierazten duen zatikia.',
    'La fracción es \\(\\dfrac{7}{12}\\): numerador \\(7\\), denominador \\(12\\).': 'Zatikia \\(\\dfrac{7}{12}\\) da: zenbakitzailea \\(7\\), izendatzailea \\(12\\).',
    'Clasifica \\(\\dfrac{5}{8}\\), \\(\\dfrac{9}{4}\\), \\(\\dfrac{6}{6}\\) como propia, impropia o igual a la unidad.': 'Sailkatu \\(\\dfrac{5}{8}\\), \\(\\dfrac{9}{4}\\), \\(\\dfrac{6}{6}\\): propioa, inpropioa edo unitatearen berdina.',
    '\\(\\dfrac{5}{8}\\) es propia, \\(\\dfrac{9}{4}\\) es impropia y \\(\\dfrac{6}{6}=1\\).': '\\(\\dfrac{5}{8}\\) propioa da, \\(\\dfrac{9}{4}\\) inpropioa da eta \\(\\dfrac{6}{6}=1\\).',
    'Convierte \\(3\\dfrac{2}{5}\\) en fracción impropia.': 'Bihurtu \\(3\\dfrac{2}{5}\\) zatiki inpropio.',
    '\\(3\\dfrac{2}{5}=\\dfrac{3\\cdot5+2}{5}=\\dfrac{17}{5}\\).': '\\(3\\dfrac{2}{5}=\\dfrac{3\\cdot5+2}{5}=\\dfrac{17}{5}\\).',
    'Convierte \\(\\dfrac{29}{6}\\) en número mixto.': 'Bihurtu \\(\\dfrac{29}{6}\\) zenbaki misto.',
    '\\(29:6=4\\) y resto \\(5\\), por tanto \\(\\dfrac{29}{6}=4\\dfrac{5}{6}\\).': '\\(29:6=4\\) eta hondarra \\(5\\); beraz, \\(\\dfrac{29}{6}=4\\dfrac{5}{6}\\).',
    'Representa en una recta numérica el valor \\(\\dfrac{11}{4}\\). ¿Entre qué dos enteros está?': 'Adierazi zenbaki-zuzenean \\(\\dfrac{11}{4}\\) balioa. Zein bi zenbaki osoren artean dago?',
    '\\(\\dfrac{11}{4}=2\\dfrac{3}{4}=2{,}75\\). Está entre \\(2\\) y \\(3\\).': '\\(\\dfrac{11}{4}=2\\dfrac{3}{4}=2{,}75\\). \\(2\\) eta \\(3\\) artean dago.',
    'Una unidad se divide en 9 partes. Se toman 14 partes. Escríbelo como fracción impropia y como número mixto.': 'Unitate bat 9 zatitan banatu da. 14 zati hartu dira. Idatzi zatiki inpropio eta zenbaki misto gisa.',
    'Fracción impropia: \\(\\dfrac{14}{9}\\). Número mixto: \\(1\\dfrac{5}{9}\\).': 'Zatiki inpropioa: \\(\\dfrac{14}{9}\\). Zenbaki mistoa: \\(1\\dfrac{5}{9}\\).',
    'Completa una fracción equivalente: \\(\\dfrac{3}{5}=\\dfrac{?}{20}\\).': 'Osatu zatiki baliokidea: \\(\\dfrac{3}{5}=\\dfrac{?}{20}\\).',
    'Multiplicamos por \\(4\\): \\(\\dfrac{3}{5}=\\dfrac{12}{20}\\).': '\\(4\\)z biderkatzen dugu: \\(\\dfrac{3}{5}=\\dfrac{12}{20}\\).',
    'Simplifica \\(\\dfrac{18}{24}\\).': 'Sinplifikatu \\(\\dfrac{18}{24}\\).',
    'Dividimos entre \\(6\\): \\(\\dfrac{18}{24}=\\dfrac{3}{4}\\).': '\\(6\\)z zatitzen dugu: \\(\\dfrac{18}{24}=\\dfrac{3}{4}\\).',
    'Comprueba si \\(\\dfrac{8}{12}\\) y \\(\\dfrac{10}{15}\\) son equivalentes.': 'Egiaztatu \\(\\dfrac{8}{12}\\) eta \\(\\dfrac{10}{15}\\) baliokideak diren.',
    'Sí. \\(8\\cdot15=120\\) y \\(12\\cdot10=120\\).': 'Bai. \\(8\\cdot15=120\\) eta \\(12\\cdot10=120\\).',
    'Reduce \\(\\dfrac{84}{126}\\) a fracción irreducible.': 'Murriztu \\(\\dfrac{84}{126}\\) zatiki laburtezina bihurtu arte.',
    '\\(\\operatorname{mcd}(84,126)=42\\), luego \\(\\dfrac{84}{126}=\\dfrac{2}{3}\\).': '\\(\\operatorname{mcd}(84,126)=42\\); beraz, \\(\\dfrac{84}{126}=\\dfrac{2}{3}\\).',
    'Encuentra dos fracciones equivalentes a \\(\\dfrac{7}{9}\\), una con denominador \\(27\\) y otra con denominador \\(45\\).': 'Aurkitu \\(\\dfrac{7}{9}\\)-ren bi zatiki baliokide: bat izendatzaile \\(27\\)rekin eta bestea \\(45\\)rekin.',
    '\\(\\dfrac{7}{9}=\\dfrac{21}{27}=\\dfrac{35}{45}\\).': '\\(\\dfrac{7}{9}=\\dfrac{21}{27}=\\dfrac{35}{45}\\).',
    'Halla \\(x\\): \\(\\dfrac{x}{36}=\\dfrac{5}{12}\\).': 'Aurkitu \\(x\\): \\(\\dfrac{x}{36}=\\dfrac{5}{12}\\).',
    'Como \\(12\\cdot3=36\\), entonces \\(x=5\\cdot3=15\\).': '\\(12\\cdot3=36\\) denez, \\(x=5\\cdot3=15\\).',
    'Ordena de menor a mayor: \\(\\dfrac{1}{2}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{2}{3}\\).': 'Ordenatu txikienetik handienera: \\(\\dfrac{1}{2}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{2}{3}\\).',
    'Con denominador \\(12\\): \\(\\dfrac{6}{12}<\\dfrac{8}{12}<\\dfrac{9}{12}\\). Orden: \\(\\dfrac{1}{2}<\\dfrac{2}{3}<\\dfrac{3}{4}\\).': 'Izendatzaile \\(12\\)rekin: \\(\\dfrac{6}{12}<\\dfrac{8}{12}<\\dfrac{9}{12}\\). Hurrenkera: \\(\\dfrac{1}{2}<\\dfrac{2}{3}<\\dfrac{3}{4}\\).',
    'Compara \\(\\dfrac{5}{6}\\) y \\(\\dfrac{7}{9}\\).': 'Konparatu \\(\\dfrac{5}{6}\\) eta \\(\\dfrac{7}{9}\\).',
    '\\(5\\cdot9=45\\) y \\(7\\cdot6=42\\), luego \\(\\dfrac{5}{6}>\\dfrac{7}{9}\\).': '\\(5\\cdot9=45\\) eta \\(7\\cdot6=42\\); beraz, \\(\\dfrac{5}{6}>\\dfrac{7}{9}\\).',
    'Ordena: \\(-\\dfrac{3}{5}\\), \\(\\dfrac{1}{2}\\), \\(-\\dfrac{7}{10}\\), \\(0\\).': 'Ordenatu: \\(-\\dfrac{3}{5}\\), \\(\\dfrac{1}{2}\\), \\(-\\dfrac{7}{10}\\), \\(0\\).',
    'Orden: \\(-\\dfrac{7}{10}< -\\dfrac{3}{5}<0<\\dfrac{1}{2}\\).': 'Hurrenkera: \\(-\\dfrac{7}{10}< -\\dfrac{3}{5}<0<\\dfrac{1}{2}\\).',
    'Escribe una fracción entre \\(\\dfrac{2}{5}\\) y \\(\\dfrac{1}{2}\\).': 'Idatzi \\(\\dfrac{2}{5}\\) eta \\(\\dfrac{1}{2}\\) arteko zatiki bat.',
    'Por ejemplo, con denominador \\(20\\): \\(\\dfrac{2}{5}=\\dfrac{8}{20}\\) y \\(\\dfrac{1}{2}=\\dfrac{10}{20}\\). Una posible es \\(\\dfrac{9}{20}\\).': 'Adibidez, izendatzaile \\(20\\)rekin: \\(\\dfrac{2}{5}=\\dfrac{8}{20}\\) eta \\(\\dfrac{1}{2}=\\dfrac{10}{20}\\). Aukera bat \\(\\dfrac{9}{20}\\) da.',
    'Ordena de mayor a menor: \\(\\dfrac{11}{18}\\), \\(\\dfrac{5}{8}\\), \\(\\dfrac{7}{12}\\).': 'Ordenatu handienetik txikienera: \\(\\dfrac{11}{18}\\), \\(\\dfrac{5}{8}\\), \\(\\dfrac{7}{12}\\).',
    'Con denominador \\(72\\): \\(\\dfrac{44}{72}\\), \\(\\dfrac{45}{72}\\), \\(\\dfrac{42}{72}\\). Orden: \\(\\dfrac{5}{8}>\\dfrac{11}{18}>\\dfrac{7}{12}\\).': 'Izendatzaile \\(72\\)rekin: \\(\\dfrac{44}{72}\\), \\(\\dfrac{45}{72}\\), \\(\\dfrac{42}{72}\\). Hurrenkera: \\(\\dfrac{5}{8}>\\dfrac{11}{18}>\\dfrac{7}{12}\\).',
    'Completa con un número entero: \\(\\dfrac{13}{20}<\\dfrac{x}{10}<\\dfrac{4}{5}\\).': 'Osatu zenbaki oso batekin: \\(\\dfrac{13}{20}<\\dfrac{x}{10}<\\dfrac{4}{5}\\).',
    'Pasamos a denominador \\(20\\): \\(\\dfrac{13}{20}<\\dfrac{2x}{20}<\\dfrac{16}{20}\\). Sirven \\(2x=14\\) o \\(15\\); como \\(x\\) entero, \\(x=7\\).': 'Izendatzaile \\(20\\)ra pasatzen dugu: \\(\\dfrac{13}{20}<\\dfrac{2x}{20}<\\dfrac{16}{20}\\). \\(2x=14\\) edo \\(15\\) balio dute; \\(x\\) osoa denez, \\(x=7\\).',
    'Calcula \\(\\dfrac{3}{8}+\\dfrac{1}{8}\\).': 'Kalkulatu \\(\\dfrac{3}{8}+\\dfrac{1}{8}\\).',
    '\\(\\dfrac{3}{8}+\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}\\).': '\\(\\dfrac{3}{8}+\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}\\).',
    'Calcula \\(1-\\dfrac{5}{12}\\).': 'Kalkulatu \\(1-\\dfrac{5}{12}\\).',
    '\\(1=\\dfrac{12}{12}\\), por tanto \\(1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).': '\\(1=\\dfrac{12}{12}\\); beraz, \\(1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).',
    'Calcula y simplifica \\(\\dfrac{5}{6}-\\dfrac{1}{4}\\).': 'Kalkulatu eta sinplifikatu \\(\\dfrac{5}{6}-\\dfrac{1}{4}\\).',
    'm.c.m. \\((6,4)=12\\): \\(\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}\\).': 'm.k.t. \\((6,4)=12\\): \\(\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}\\).',
    'Calcula \\(\\dfrac{2}{3}+\\dfrac{5}{9}-\\dfrac{1}{6}\\).': 'Kalkulatu \\(\\dfrac{2}{3}+\\dfrac{5}{9}-\\dfrac{1}{6}\\).',
    'm.c.m. \\((3,9,6)=18\\): \\(\\dfrac{12}{18}+\\dfrac{10}{18}-\\dfrac{3}{18}=\\dfrac{19}{18}=1\\dfrac{1}{18}\\).': 'm.k.t. \\((3,9,6)=18\\): \\(\\dfrac{12}{18}+\\dfrac{10}{18}-\\dfrac{3}{18}=\\dfrac{19}{18}=1\\dfrac{1}{18}\\).',
    'Calcula \\(2\\dfrac{1}{4}-\\dfrac{5}{6}+\\dfrac{3}{8}\\).': 'Kalkulatu \\(2\\dfrac{1}{4}-\\dfrac{5}{6}+\\dfrac{3}{8}\\).',
    '\\(2\\dfrac{1}{4}=\\dfrac{9}{4}\\). Con denominador \\(24\\): \\(\\dfrac{54}{24}-\\dfrac{20}{24}+\\dfrac{9}{24}=\\dfrac{43}{24}=1\\dfrac{19}{24}\\).': '\\(2\\dfrac{1}{4}=\\dfrac{9}{4}\\). Izendatzaile \\(24\\)rekin: \\(\\dfrac{54}{24}-\\dfrac{20}{24}+\\dfrac{9}{24}=\\dfrac{43}{24}=1\\dfrac{19}{24}\\).',
    'Calcula \\(-\\dfrac{7}{10}+\\dfrac{3}{5}-\\dfrac{1}{4}\\).': 'Kalkulatu \\(-\\dfrac{7}{10}+\\dfrac{3}{5}-\\dfrac{1}{4}\\).',
    'Con denominador \\(20\\): \\(-\\dfrac{14}{20}+\\dfrac{12}{20}-\\dfrac{5}{20}=-\\dfrac{7}{20}\\).': 'Izendatzaile \\(20\\)rekin: \\(-\\dfrac{14}{20}+\\dfrac{12}{20}-\\dfrac{5}{20}=-\\dfrac{7}{20}\\).',
    'Calcula \\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}\\).': 'Kalkulatu \\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}\\).',
    '\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}=\\dfrac{6}{20}=\\dfrac{3}{10}\\).': '\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}=\\dfrac{6}{20}=\\dfrac{3}{10}\\).',
    'Calcula \\(\\dfrac{3}{7}:\\dfrac{2}{5}\\).': 'Kalkulatu \\(\\dfrac{3}{7}:\\dfrac{2}{5}\\).',
    'Dividir es multiplicar por la inversa: \\(\\dfrac{3}{7}\\cdot\\dfrac{5}{2}=\\dfrac{15}{14}\\).': 'Zatitzea alderantzizkoaz biderkatzea da: \\(\\dfrac{3}{7}\\cdot\\dfrac{5}{2}=\\dfrac{15}{14}\\).',
    'Calcula simplificando antes \\(\\dfrac{12}{25}\\cdot\\dfrac{15}{18}\\).': 'Kalkulatu, aurretik sinplifikatuz: \\(\\dfrac{12}{25}\\cdot\\dfrac{15}{18}\\).',
    'Simplificamos cruzado: \\(12/18=2/3\\) y \\(15/25=3/5\\). Resultado \\(\\dfrac{2}{5}\\).': 'Gurutzatuta sinplifikatzen dugu: \\(12/18=2/3\\) eta \\(15/25=3/5\\). Emaitza \\(\\dfrac{2}{5}\\).',
    'Calcula \\(-\\dfrac{4}{9}:\\dfrac{8}{15}\\).': 'Kalkulatu \\(-\\dfrac{4}{9}:\\dfrac{8}{15}\\).',
    '\\(-\\dfrac{4}{9}\\cdot\\dfrac{15}{8}=-\\dfrac{60}{72}=-\\dfrac{5}{6}\\).': '\\(-\\dfrac{4}{9}\\cdot\\dfrac{15}{8}=-\\dfrac{60}{72}=-\\dfrac{5}{6}\\).',
    'Calcula \\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right):\\dfrac{3}{4}\\).': 'Kalkulatu \\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right):\\dfrac{3}{4}\\).',
    '\\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right)=-\\dfrac{3}{4}\\). Después \\(-\\dfrac{3}{4}:\\dfrac{3}{4}=-1\\).': '\\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right)=-\\dfrac{3}{4}\\). Ondoren \\(-\\dfrac{3}{4}:\\dfrac{3}{4}=-1\\).',
    'Si \\(\\dfrac{3}{8}\\) de una cantidad son \\(45\\), ¿cuál es la cantidad total?': 'Kantitate baten \\(\\dfrac{3}{8}\\) \\(45\\) badira, zein da kantitate osoa?',
    'La cantidad es \\(45:\\dfrac{3}{8}=45\\cdot\\dfrac{8}{3}=120\\).': 'Kantitatea \\(45:\\dfrac{3}{8}=45\\cdot\\dfrac{8}{3}=120\\) da.',
    'Calcula \\(\\left(\\dfrac{2}{3}\\right)^3\\).': 'Kalkulatu \\(\\left(\\dfrac{2}{3}\\right)^3\\).',
    '\\(\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}\\).': '\\(\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}\\).',
    'Calcula \\(\\left(-\\dfrac{3}{5}\\right)^2\\).': 'Kalkulatu \\(\\left(-\\dfrac{3}{5}\\right)^2\\).',
    'El exponente es par, así que el resultado es positivo: \\(\\dfrac{9}{25}\\).': 'Berretzailea bikoitia da; beraz, emaitza positiboa da: \\(\\dfrac{9}{25}\\).',
    'Calcula \\(\\dfrac{1}{2}+\\dfrac{3}{4}\\cdot\\dfrac{2}{9}\\).': 'Kalkulatu \\(\\dfrac{1}{2}+\\dfrac{3}{4}\\cdot\\dfrac{2}{9}\\).',
    'Primero producto: \\(\\dfrac{3}{4}\\cdot\\dfrac{2}{9}=\\dfrac{1}{6}\\). Luego \\(\\dfrac{1}{2}+\\dfrac{1}{6}=\\dfrac{2}{3}\\).': 'Lehenik biderketa: \\(\\dfrac{3}{4}\\cdot\\dfrac{2}{9}=\\dfrac{1}{6}\\). Gero \\(\\dfrac{1}{2}+\\dfrac{1}{6}=\\dfrac{2}{3}\\).',
    'Calcula \\(\\left(\\dfrac{5}{6}-\\dfrac{1}{3}\\right)^2\\).': 'Kalkulatu \\(\\left(\\dfrac{5}{6}-\\dfrac{1}{3}\\right)^2\\).',
    'Dentro del paréntesis: \\(\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}\\). Cuadrado: \\(\\dfrac{1}{4}\\).': 'Parentesi barruan: \\(\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}\\). Karratua: \\(\\dfrac{1}{4}\\).',
    'Calcula \\(\\dfrac{2}{3}:\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\).': 'Kalkulatu \\(\\dfrac{2}{3}:\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\).',
    'Paréntesis: \\(\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{1}{3}\\). Entonces \\(\\dfrac{2}{3}:\\dfrac{1}{3}=2\\).': 'Parentesia: \\(\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{1}{3}\\). Beraz, \\(\\dfrac{2}{3}:\\dfrac{1}{3}=2\\).',
    'Calcula \\(-\\dfrac{3}{4}+\\left(\\dfrac{2}{3}\\right)^2:\\dfrac{8}{9}\\).': 'Kalkulatu \\(-\\dfrac{3}{4}+\\left(\\dfrac{2}{3}\\right)^2:\\dfrac{8}{9}\\).',
    '\\(\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}\\). \\(\\dfrac{4}{9}:\\dfrac{8}{9}=\\dfrac{1}{2}\\). Resultado: \\(-\\dfrac{3}{4}+\\dfrac{1}{2}=-\\dfrac{1}{4}\\).': '\\(\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}\\). \\(\\dfrac{4}{9}:\\dfrac{8}{9}=\\dfrac{1}{2}\\). Emaitza: \\(-\\dfrac{3}{4}+\\dfrac{1}{2}=-\\dfrac{1}{4}\\).',
    'Una pizza se divide en 12 porciones. Ainhoa come \\(\\dfrac{1}{3}\\) y Mikel \\(\\dfrac{1}{4}\\). ¿Qué fracción queda?': 'Pizza bat 12 zatitan banatu da. Ainhoak \\(\\dfrac{1}{3}\\) jan du eta Mikelek \\(\\dfrac{1}{4}\\). Zer zatiki geratzen da?',
    'Comen \\(\\dfrac{1}{3}+\\dfrac{1}{4}=\\dfrac{7}{12}\\). Queda \\(1-\\dfrac{7}{12}=\\dfrac{5}{12}\\).': 'Guztira \\(\\dfrac{1}{3}+\\dfrac{1}{4}=\\dfrac{7}{12}\\) jan dute. Geratzen da \\(1-\\dfrac{7}{12}=\\dfrac{5}{12}\\).',
    'En una clase de 30 estudiantes, \\(\\dfrac{2}{5}\\) van al taller de robótica. ¿Cuántos estudiantes son?': '30 ikasleko gela batean, \\(\\dfrac{2}{5}\\) robotika tailerrera doaz. Zenbat ikasle dira?',
    '\\(\\dfrac{2}{5}\\) de \\(30\\) es \\(30\\cdot\\dfrac{2}{5}=12\\).': '\\(30\\)en \\(\\dfrac{2}{5}\\) hau da: \\(30\\cdot\\dfrac{2}{5}=12\\).',
    'Un depósito está lleno en \\(\\dfrac{7}{8}\\). Se gastan \\(\\dfrac{1}{4}\\) del depósito completo. ¿Qué fracción queda llena?': 'Biltegi bat \\(\\dfrac{7}{8}\\) beteta dago. Biltegi osoaren \\(\\dfrac{1}{4}\\) gastatu da. Zer zatiki geratzen da beteta?',
    '\\(\\dfrac{7}{8}-\\dfrac{1}{4}=\\dfrac{7}{8}-\\dfrac{2}{8}=\\dfrac{5}{8}\\).': '\\(\\dfrac{7}{8}-\\dfrac{1}{4}=\\dfrac{7}{8}-\\dfrac{2}{8}=\\dfrac{5}{8}\\).',
    'Un libro tiene 240 páginas. Leire lee \\(\\dfrac{3}{8}\\) el lunes y \\(\\dfrac{1}{5}\\) el martes. ¿Cuántas páginas ha leído en total?': 'Liburu batek 240 orrialde ditu. Leirek astelehenean \\(\\dfrac{3}{8}\\) irakurri du eta asteartean \\(\\dfrac{1}{5}\\). Zenbat orrialde irakurri ditu guztira?',
    'Fracción leída: \\(\\dfrac{3}{8}+\\dfrac{1}{5}=\\dfrac{23}{40}\\). Páginas: \\(240\\cdot\\dfrac{23}{40}=138\\).': 'Irakurritako zatikia: \\(\\dfrac{3}{8}+\\dfrac{1}{5}=\\dfrac{23}{40}\\). Orrialdeak: \\(240\\cdot\\dfrac{23}{40}=138\\).',
    'De una cantidad de dinero se gasta primero \\(\\dfrac{2}{7}\\) y después \\(\\dfrac{3}{5}\\) de lo que quedaba. Al final quedan 80 €. ¿Cuánto había al principio?': 'Diru kopuru batetik lehenengo \\(\\dfrac{2}{7}\\) gastatzen da eta gero geratzen zenaren \\(\\dfrac{3}{5}\\). Azkenean 80 € geratzen dira. Zenbat zegoen hasieran?',
    'Tras gastar \\(\\dfrac{2}{7}\\), queda \\(\\dfrac{5}{7}\\). Después queda \\(\\dfrac{2}{5}\\) de eso: \\(\\dfrac{5}{7}\\cdot\\dfrac{2}{5}=\\dfrac{2}{7}\\). Si \\(\\dfrac{2}{7}\\) son 80 €, el total era \\(80\\cdot\\dfrac{7}{2}=280\\) €.': '\\(\\dfrac{2}{7}\\) gastatu ondoren, \\(\\dfrac{5}{7}\\) geratzen da. Gero horren \\(\\dfrac{2}{5}\\) geratzen da: \\(\\dfrac{5}{7}\\cdot\\dfrac{2}{5}=\\dfrac{2}{7}\\). \\(\\dfrac{2}{7}\\) 80 € badira, guztira \\(80\\cdot\\dfrac{7}{2}=280\\) € ziren.',
    'Un equipo gana \\(\\dfrac{3}{5}\\) de sus partidos, empata \\(\\dfrac{1}{4}\\) y pierde 6. ¿Cuántos partidos jugó?': 'Talde batek partiduen \\(\\dfrac{3}{5}\\) irabazten ditu, \\(\\dfrac{1}{4}\\) berdintzen ditu eta 6 galtzen ditu. Zenbat partida jokatu ditu?',
    'Ganados y empatados suman \\(\\dfrac{3}{5}+\\dfrac{1}{4}=\\dfrac{17}{20}\\). Perdidos: \\(\\dfrac{3}{20}\\). Si \\(\\dfrac{3}{20}=6\\), entonces el total es \\(6\\cdot\\dfrac{20}{3}=40\\).': 'Irabaziak eta berdinduak: \\(\\dfrac{3}{5}+\\dfrac{1}{4}=\\dfrac{17}{20}\\). Galduak: \\(\\dfrac{3}{20}\\). \\(\\dfrac{3}{20}=6\\) bada, guztira \\(6\\cdot\\dfrac{20}{3}=40\\).'
}

const arTranslations: Record<string, string> = {
    'Escribe la fracción que representa 7 partes tomadas de 12 partes iguales.': 'اكتب الكسر الذي يمثل أخذ 7 أجزاء من 12 جزءًا متساويًا.',
    'La fracción es \\(\\dfrac{7}{12}\\): numerador \\(7\\), denominador \\(12\\).': 'الكسر هو \\(\\dfrac{7}{12}\\): البسط \\(7\\)، والمقام \\(12\\).',
    'Clasifica \\(\\dfrac{5}{8}\\), \\(\\dfrac{9}{4}\\), \\(\\dfrac{6}{6}\\) como propia, impropia o igual a la unidad.': 'صنّف \\(\\dfrac{5}{8}\\)، \\(\\dfrac{9}{4}\\)، \\(\\dfrac{6}{6}\\) إلى كسر حقيقي أو غير حقيقي أو يساوي الواحد.',
    '\\(\\dfrac{5}{8}\\) es propia, \\(\\dfrac{9}{4}\\) es impropia y \\(\\dfrac{6}{6}=1\\).': '\\(\\dfrac{5}{8}\\) كسر حقيقي، و\\(\\dfrac{9}{4}\\) غير حقيقي، و\\(\\dfrac{6}{6}=1\\).',
    'Convierte \\(3\\dfrac{2}{5}\\) en fracción impropia.': 'حوّل \\(3\\dfrac{2}{5}\\) إلى كسر غير حقيقي.',
    '\\(3\\dfrac{2}{5}=\\dfrac{3\\cdot5+2}{5}=\\dfrac{17}{5}\\).': '\\(3\\dfrac{2}{5}=\\dfrac{3\\cdot5+2}{5}=\\dfrac{17}{5}\\).',
    'Convierte \\(\\dfrac{29}{6}\\) en número mixto.': 'حوّل \\(\\dfrac{29}{6}\\) إلى عدد كسري.',
    '\\(29:6=4\\) y resto \\(5\\), por tanto \\(\\dfrac{29}{6}=4\\dfrac{5}{6}\\).': '\\(29:6=4\\) والباقي \\(5\\)، إذن \\(\\dfrac{29}{6}=4\\dfrac{5}{6}\\).',
    'Representa en una recta numérica el valor \\(\\dfrac{11}{4}\\). ¿Entre qué dos enteros está?': 'مثّل القيمة \\(\\dfrac{11}{4}\\) على مستقيم الأعداد. بين أي عددين صحيحين تقع؟',
    '\\(\\dfrac{11}{4}=2\\dfrac{3}{4}=2{,}75\\). Está entre \\(2\\) y \\(3\\).': '\\(\\dfrac{11}{4}=2\\dfrac{3}{4}=2{,}75\\). تقع بين \\(2\\) و\\(3\\).',
    'Una unidad se divide en 9 partes. Se toman 14 partes. Escríbelo como fracción impropia y como número mixto.': 'قُسمت وحدة إلى 9 أجزاء. أُخذ 14 جزءًا. اكتب ذلك ككسر غير حقيقي وعدد كسري.',
    'Fracción impropia: \\(\\dfrac{14}{9}\\). Número mixto: \\(1\\dfrac{5}{9}\\).': 'الكسر غير الحقيقي: \\(\\dfrac{14}{9}\\). العدد الكسري: \\(1\\dfrac{5}{9}\\).',
    'Completa una fracción equivalente: \\(\\dfrac{3}{5}=\\dfrac{?}{20}\\).': 'أكمل كسرًا مكافئًا: \\(\\dfrac{3}{5}=\\dfrac{?}{20}\\).',
    'Multiplicamos por \\(4\\): \\(\\dfrac{3}{5}=\\dfrac{12}{20}\\).': 'نضرب في \\(4\\): \\(\\dfrac{3}{5}=\\dfrac{12}{20}\\).',
    'Simplifica \\(\\dfrac{18}{24}\\).': 'بسّط \\(\\dfrac{18}{24}\\).',
    'Dividimos entre \\(6\\): \\(\\dfrac{18}{24}=\\dfrac{3}{4}\\).': 'نقسم على \\(6\\): \\(\\dfrac{18}{24}=\\dfrac{3}{4}\\).',
    'Comprueba si \\(\\dfrac{8}{12}\\) y \\(\\dfrac{10}{15}\\) son equivalentes.': 'تحقق هل \\(\\dfrac{8}{12}\\) و\\(\\dfrac{10}{15}\\) كسران متكافئان.',
    'Sí. \\(8\\cdot15=120\\) y \\(12\\cdot10=120\\).': 'نعم. \\(8\\cdot15=120\\) و\\(12\\cdot10=120\\).',
    'Reduce \\(\\dfrac{84}{126}\\) a fracción irreducible.': 'اختزل \\(\\dfrac{84}{126}\\) إلى كسر غير قابل للاختزال.',
    '\\(\\operatorname{mcd}(84,126)=42\\), luego \\(\\dfrac{84}{126}=\\dfrac{2}{3}\\).': '\\(\\operatorname{mcd}(84,126)=42\\)، إذن \\(\\dfrac{84}{126}=\\dfrac{2}{3}\\).',
    'Encuentra dos fracciones equivalentes a \\(\\dfrac{7}{9}\\), una con denominador \\(27\\) y otra con denominador \\(45\\).': 'أوجد كسرين مكافئين لـ \\(\\dfrac{7}{9}\\)، أحدهما مقامه \\(27\\) والآخر مقامه \\(45\\).',
    '\\(\\dfrac{7}{9}=\\dfrac{21}{27}=\\dfrac{35}{45}\\).': '\\(\\dfrac{7}{9}=\\dfrac{21}{27}=\\dfrac{35}{45}\\).',
    'Halla \\(x\\): \\(\\dfrac{x}{36}=\\dfrac{5}{12}\\).': 'أوجد \\(x\\): \\(\\dfrac{x}{36}=\\dfrac{5}{12}\\).',
    'Como \\(12\\cdot3=36\\), entonces \\(x=5\\cdot3=15\\).': 'بما أن \\(12\\cdot3=36\\)، فإن \\(x=5\\cdot3=15\\).',
    'Ordena de menor a mayor: \\(\\dfrac{1}{2}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{2}{3}\\).': 'رتّب من الأصغر إلى الأكبر: \\(\\dfrac{1}{2}\\)، \\(\\dfrac{3}{4}\\)، \\(\\dfrac{2}{3}\\).',
    'Con denominador \\(12\\): \\(\\dfrac{6}{12}<\\dfrac{8}{12}<\\dfrac{9}{12}\\). Orden: \\(\\dfrac{1}{2}<\\dfrac{2}{3}<\\dfrac{3}{4}\\).': 'بالمقام \\(12\\): \\(\\dfrac{6}{12}<\\dfrac{8}{12}<\\dfrac{9}{12}\\). الترتيب: \\(\\dfrac{1}{2}<\\dfrac{2}{3}<\\dfrac{3}{4}\\).',
    'Compara \\(\\dfrac{5}{6}\\) y \\(\\dfrac{7}{9}\\).': 'قارن بين \\(\\dfrac{5}{6}\\) و\\(\\dfrac{7}{9}\\).',
    '\\(5\\cdot9=45\\) y \\(7\\cdot6=42\\), luego \\(\\dfrac{5}{6}>\\dfrac{7}{9}\\).': '\\(5\\cdot9=45\\) و\\(7\\cdot6=42\\)، إذن \\(\\dfrac{5}{6}>\\dfrac{7}{9}\\).',
    'Ordena: \\(-\\dfrac{3}{5}\\), \\(\\dfrac{1}{2}\\), \\(-\\dfrac{7}{10}\\), \\(0\\).': 'رتّب: \\(-\\dfrac{3}{5}\\)، \\(\\dfrac{1}{2}\\)، \\(-\\dfrac{7}{10}\\)، \\(0\\).',
    'Orden: \\(-\\dfrac{7}{10}< -\\dfrac{3}{5}<0<\\dfrac{1}{2}\\).': 'الترتيب: \\(-\\dfrac{7}{10}< -\\dfrac{3}{5}<0<\\dfrac{1}{2}\\).',
    'Escribe una fracción entre \\(\\dfrac{2}{5}\\) y \\(\\dfrac{1}{2}\\).': 'اكتب كسرًا بين \\(\\dfrac{2}{5}\\) و\\(\\dfrac{1}{2}\\).',
    'Por ejemplo, con denominador \\(20\\): \\(\\dfrac{2}{5}=\\dfrac{8}{20}\\) y \\(\\dfrac{1}{2}=\\dfrac{10}{20}\\). Una posible es \\(\\dfrac{9}{20}\\).': 'مثلًا بالمقام \\(20\\): \\(\\dfrac{2}{5}=\\dfrac{8}{20}\\) و\\(\\dfrac{1}{2}=\\dfrac{10}{20}\\). كسر ممكن هو \\(\\dfrac{9}{20}\\).',
    'Ordena de mayor a menor: \\(\\dfrac{11}{18}\\), \\(\\dfrac{5}{8}\\), \\(\\dfrac{7}{12}\\).': 'رتّب من الأكبر إلى الأصغر: \\(\\dfrac{11}{18}\\)، \\(\\dfrac{5}{8}\\)، \\(\\dfrac{7}{12}\\).',
    'Con denominador \\(72\\): \\(\\dfrac{44}{72}\\), \\(\\dfrac{45}{72}\\), \\(\\dfrac{42}{72}\\). Orden: \\(\\dfrac{5}{8}>\\dfrac{11}{18}>\\dfrac{7}{12}\\).': 'بالمقام \\(72\\): \\(\\dfrac{44}{72}\\)، \\(\\dfrac{45}{72}\\)، \\(\\dfrac{42}{72}\\). الترتيب: \\(\\dfrac{5}{8}>\\dfrac{11}{18}>\\dfrac{7}{12}\\).',
    'Completa con un número entero: \\(\\dfrac{13}{20}<\\dfrac{x}{10}<\\dfrac{4}{5}\\).': 'أكمل بعدد صحيح: \\(\\dfrac{13}{20}<\\dfrac{x}{10}<\\dfrac{4}{5}\\).',
    'Pasamos a denominador \\(20\\): \\(\\dfrac{13}{20}<\\dfrac{2x}{20}<\\dfrac{16}{20}\\). Sirven \\(2x=14\\) o \\(15\\); como \\(x\\) entero, \\(x=7\\).': 'نحوّل إلى المقام \\(20\\): \\(\\dfrac{13}{20}<\\dfrac{2x}{20}<\\dfrac{16}{20}\\). يصلح \\(2x=14\\) أو \\(15\\)؛ وبما أن \\(x\\) صحيح، فإن \\(x=7\\).',
    'Calcula \\(\\dfrac{3}{8}+\\dfrac{1}{8}\\).': 'احسب \\(\\dfrac{3}{8}+\\dfrac{1}{8}\\).',
    '\\(\\dfrac{3}{8}+\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}\\).': '\\(\\dfrac{3}{8}+\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}\\).',
    'Calcula \\(1-\\dfrac{5}{12}\\).': 'احسب \\(1-\\dfrac{5}{12}\\).',
    '\\(1=\\dfrac{12}{12}\\), por tanto \\(1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).': '\\(1=\\dfrac{12}{12}\\)، إذن \\(1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).',
    'Calcula y simplifica \\(\\dfrac{5}{6}-\\dfrac{1}{4}\\).': 'احسب وبسّط \\(\\dfrac{5}{6}-\\dfrac{1}{4}\\).',
    'm.c.m. \\((6,4)=12\\): \\(\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}\\).': 'المضاعف المشترك الأصغر \\((6,4)=12\\): \\(\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}\\).',
    'Calcula \\(\\dfrac{2}{3}+\\dfrac{5}{9}-\\dfrac{1}{6}\\).': 'احسب \\(\\dfrac{2}{3}+\\dfrac{5}{9}-\\dfrac{1}{6}\\).',
    'm.c.m. \\((3,9,6)=18\\): \\(\\dfrac{12}{18}+\\dfrac{10}{18}-\\dfrac{3}{18}=\\dfrac{19}{18}=1\\dfrac{1}{18}\\).': 'المضاعف المشترك الأصغر \\((3,9,6)=18\\): \\(\\dfrac{12}{18}+\\dfrac{10}{18}-\\dfrac{3}{18}=\\dfrac{19}{18}=1\\dfrac{1}{18}\\).',
    'Calcula \\(2\\dfrac{1}{4}-\\dfrac{5}{6}+\\dfrac{3}{8}\\).': 'احسب \\(2\\dfrac{1}{4}-\\dfrac{5}{6}+\\dfrac{3}{8}\\).',
    '\\(2\\dfrac{1}{4}=\\dfrac{9}{4}\\). Con denominador \\(24\\): \\(\\dfrac{54}{24}-\\dfrac{20}{24}+\\dfrac{9}{24}=\\dfrac{43}{24}=1\\dfrac{19}{24}\\).': '\\(2\\dfrac{1}{4}=\\dfrac{9}{4}\\). بالمقام \\(24\\): \\(\\dfrac{54}{24}-\\dfrac{20}{24}+\\dfrac{9}{24}=\\dfrac{43}{24}=1\\dfrac{19}{24}\\).',
    'Calcula \\(-\\dfrac{7}{10}+\\dfrac{3}{5}-\\dfrac{1}{4}\\).': 'احسب \\(-\\dfrac{7}{10}+\\dfrac{3}{5}-\\dfrac{1}{4}\\).',
    'Con denominador \\(20\\): \\(-\\dfrac{14}{20}+\\dfrac{12}{20}-\\dfrac{5}{20}=-\\dfrac{7}{20}\\).': 'بالمقام \\(20\\): \\(-\\dfrac{14}{20}+\\dfrac{12}{20}-\\dfrac{5}{20}=-\\dfrac{7}{20}\\).',
    'Calcula \\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}\\).': 'احسب \\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}\\).',
    '\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}=\\dfrac{6}{20}=\\dfrac{3}{10}\\).': '\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}=\\dfrac{6}{20}=\\dfrac{3}{10}\\).',
    'Calcula \\(\\dfrac{3}{7}:\\dfrac{2}{5}\\).': 'احسب \\(\\dfrac{3}{7}:\\dfrac{2}{5}\\).',
    'Dividir es multiplicar por la inversa: \\(\\dfrac{3}{7}\\cdot\\dfrac{5}{2}=\\dfrac{15}{14}\\).': 'القسمة تعني الضرب في المعكوس: \\(\\dfrac{3}{7}\\cdot\\dfrac{5}{2}=\\dfrac{15}{14}\\).',
    'Calcula simplificando antes \\(\\dfrac{12}{25}\\cdot\\dfrac{15}{18}\\).': 'احسب مع التبسيط أولًا \\(\\dfrac{12}{25}\\cdot\\dfrac{15}{18}\\).',
    'Simplificamos cruzado: \\(12/18=2/3\\) y \\(15/25=3/5\\). Resultado \\(\\dfrac{2}{5}\\).': 'نبسّط تبادليًا: \\(12/18=2/3\\) و\\(15/25=3/5\\). النتيجة \\(\\dfrac{2}{5}\\).',
    'Calcula \\(-\\dfrac{4}{9}:\\dfrac{8}{15}\\).': 'احسب \\(-\\dfrac{4}{9}:\\dfrac{8}{15}\\).',
    '\\(-\\dfrac{4}{9}\\cdot\\dfrac{15}{8}=-\\dfrac{60}{72}=-\\dfrac{5}{6}\\).': '\\(-\\dfrac{4}{9}\\cdot\\dfrac{15}{8}=-\\dfrac{60}{72}=-\\dfrac{5}{6}\\).',
    'Calcula \\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right):\\dfrac{3}{4}\\).': 'احسب \\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right):\\dfrac{3}{4}\\).',
    '\\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right)=-\\dfrac{3}{4}\\). Después \\(-\\dfrac{3}{4}:\\dfrac{3}{4}=-1\\).': '\\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right)=-\\dfrac{3}{4}\\). ثم \\(-\\dfrac{3}{4}:\\dfrac{3}{4}=-1\\).',
    'Si \\(\\dfrac{3}{8}\\) de una cantidad son \\(45\\), ¿cuál es la cantidad total?': 'إذا كان \\(\\dfrac{3}{8}\\) من كمية يساوي \\(45\\)، فما الكمية الكلية؟',
    'La cantidad es \\(45:\\dfrac{3}{8}=45\\cdot\\dfrac{8}{3}=120\\).': 'الكمية هي \\(45:\\dfrac{3}{8}=45\\cdot\\dfrac{8}{3}=120\\).',
    'Calcula \\(\\left(\\dfrac{2}{3}\\right)^3\\).': 'احسب \\(\\left(\\dfrac{2}{3}\\right)^3\\).',
    '\\(\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}\\).': '\\(\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}\\).',
    'Calcula \\(\\left(-\\dfrac{3}{5}\\right)^2\\).': 'احسب \\(\\left(-\\dfrac{3}{5}\\right)^2\\).',
    'El exponente es par, así que el resultado es positivo: \\(\\dfrac{9}{25}\\).': 'الأس زوجي، لذلك النتيجة موجبة: \\(\\dfrac{9}{25}\\).',
    'Calcula \\(\\dfrac{1}{2}+\\dfrac{3}{4}\\cdot\\dfrac{2}{9}\\).': 'احسب \\(\\dfrac{1}{2}+\\dfrac{3}{4}\\cdot\\dfrac{2}{9}\\).',
    'Primero producto: \\(\\dfrac{3}{4}\\cdot\\dfrac{2}{9}=\\dfrac{1}{6}\\). Luego \\(\\dfrac{1}{2}+\\dfrac{1}{6}=\\dfrac{2}{3}\\).': 'أولًا الضرب: \\(\\dfrac{3}{4}\\cdot\\dfrac{2}{9}=\\dfrac{1}{6}\\). ثم \\(\\dfrac{1}{2}+\\dfrac{1}{6}=\\dfrac{2}{3}\\).',
    'Calcula \\(\\left(\\dfrac{5}{6}-\\dfrac{1}{3}\\right)^2\\).': 'احسب \\(\\left(\\dfrac{5}{6}-\\dfrac{1}{3}\\right)^2\\).',
    'Dentro del paréntesis: \\(\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}\\). Cuadrado: \\(\\dfrac{1}{4}\\).': 'داخل القوس: \\(\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}\\). التربيع: \\(\\dfrac{1}{4}\\).',
    'Calcula \\(\\dfrac{2}{3}:\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\).': 'احسب \\(\\dfrac{2}{3}:\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\).',
    'Paréntesis: \\(\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{1}{3}\\). Entonces \\(\\dfrac{2}{3}:\\dfrac{1}{3}=2\\).': 'القوس: \\(\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{1}{3}\\). إذن \\(\\dfrac{2}{3}:\\dfrac{1}{3}=2\\).',
    'Calcula \\(-\\dfrac{3}{4}+\\left(\\dfrac{2}{3}\\right)^2:\\dfrac{8}{9}\\).': 'احسب \\(-\\dfrac{3}{4}+\\left(\\dfrac{2}{3}\\right)^2:\\dfrac{8}{9}\\).',
    '\\(\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}\\). \\(\\dfrac{4}{9}:\\dfrac{8}{9}=\\dfrac{1}{2}\\). Resultado: \\(-\\dfrac{3}{4}+\\dfrac{1}{2}=-\\dfrac{1}{4}\\).': '\\(\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}\\). \\(\\dfrac{4}{9}:\\dfrac{8}{9}=\\dfrac{1}{2}\\). النتيجة: \\(-\\dfrac{3}{4}+\\dfrac{1}{2}=-\\dfrac{1}{4}\\).',
    'Una pizza se divide en 12 porciones. Ainhoa come \\(\\dfrac{1}{3}\\) y Mikel \\(\\dfrac{1}{4}\\). ¿Qué fracción queda?': 'قُسمت بيتزا إلى 12 قطعة. أكلت Ainhoa \\(\\dfrac{1}{3}\\) وأكل Mikel \\(\\dfrac{1}{4}\\). ما الكسر المتبقي؟',
    'Comen \\(\\dfrac{1}{3}+\\dfrac{1}{4}=\\dfrac{7}{12}\\). Queda \\(1-\\dfrac{7}{12}=\\dfrac{5}{12}\\).': 'أكلا \\(\\dfrac{1}{3}+\\dfrac{1}{4}=\\dfrac{7}{12}\\). يتبقى \\(1-\\dfrac{7}{12}=\\dfrac{5}{12}\\).',
    'En una clase de 30 estudiantes, \\(\\dfrac{2}{5}\\) van al taller de robótica. ¿Cuántos estudiantes son?': 'في قسم فيه 30 طالبًا، يذهب \\(\\dfrac{2}{5}\\) إلى ورشة الروبوتات. كم طالبًا؟',
    '\\(\\dfrac{2}{5}\\) de \\(30\\) es \\(30\\cdot\\dfrac{2}{5}=12\\).': '\\(\\dfrac{2}{5}\\) من \\(30\\) هو \\(30\\cdot\\dfrac{2}{5}=12\\).',
    'Un depósito está lleno en \\(\\dfrac{7}{8}\\). Se gastan \\(\\dfrac{1}{4}\\) del depósito completo. ¿Qué fracción queda llena?': 'خزان ممتلئ بمقدار \\(\\dfrac{7}{8}\\). استُهلك \\(\\dfrac{1}{4}\\) من الخزان الكامل. ما الكسر المتبقي ممتلئًا؟',
    '\\(\\dfrac{7}{8}-\\dfrac{1}{4}=\\dfrac{7}{8}-\\dfrac{2}{8}=\\dfrac{5}{8}\\).': '\\(\\dfrac{7}{8}-\\dfrac{1}{4}=\\dfrac{7}{8}-\\dfrac{2}{8}=\\dfrac{5}{8}\\).',
    'Un libro tiene 240 páginas. Leire lee \\(\\dfrac{3}{8}\\) el lunes y \\(\\dfrac{1}{5}\\) el martes. ¿Cuántas páginas ha leído en total?': 'كتاب فيه 240 صفحة. قرأت Leire يوم الاثنين \\(\\dfrac{3}{8}\\) ويوم الثلاثاء \\(\\dfrac{1}{5}\\). كم صفحة قرأت في المجموع؟',
    'Fracción leída: \\(\\dfrac{3}{8}+\\dfrac{1}{5}=\\dfrac{23}{40}\\). Páginas: \\(240\\cdot\\dfrac{23}{40}=138\\).': 'الكسر المقروء: \\(\\dfrac{3}{8}+\\dfrac{1}{5}=\\dfrac{23}{40}\\). الصفحات: \\(240\\cdot\\dfrac{23}{40}=138\\).',
    'De una cantidad de dinero se gasta primero \\(\\dfrac{2}{7}\\) y después \\(\\dfrac{3}{5}\\) de lo que quedaba. Al final quedan 80 €. ¿Cuánto había al principio?': 'من مبلغ من المال صُرف أولًا \\(\\dfrac{2}{7}\\)، ثم صُرف \\(\\dfrac{3}{5}\\) مما تبقى. في النهاية بقي 80 €. كم كان المبلغ في البداية؟',
    'Tras gastar \\(\\dfrac{2}{7}\\), queda \\(\\dfrac{5}{7}\\). Después queda \\(\\dfrac{2}{5}\\) de eso: \\(\\dfrac{5}{7}\\cdot\\dfrac{2}{5}=\\dfrac{2}{7}\\). Si \\(\\dfrac{2}{7}\\) son 80 €, el total era \\(80\\cdot\\dfrac{7}{2}=280\\) €.': 'بعد صرف \\(\\dfrac{2}{7}\\)، يبقى \\(\\dfrac{5}{7}\\). ثم يبقى \\(\\dfrac{2}{5}\\) من ذلك: \\(\\dfrac{5}{7}\\cdot\\dfrac{2}{5}=\\dfrac{2}{7}\\). إذا كان \\(\\dfrac{2}{7}\\) يساوي 80 €، فالمجموع كان \\(80\\cdot\\dfrac{7}{2}=280\\) €.',
    'Un equipo gana \\(\\dfrac{3}{5}\\) de sus partidos, empata \\(\\dfrac{1}{4}\\) y pierde 6. ¿Cuántos partidos jugó?': 'فريق يفوز بـ \\(\\dfrac{3}{5}\\) من مبارياته، ويتعادل في \\(\\dfrac{1}{4}\\)، ويخسر 6. كم مباراة لعب؟',
    'Ganados y empatados suman \\(\\dfrac{3}{5}+\\dfrac{1}{4}=\\dfrac{17}{20}\\). Perdidos: \\(\\dfrac{3}{20}\\). Si \\(\\dfrac{3}{20}=6\\), entonces el total es \\(6\\cdot\\dfrac{20}{3}=40\\).': 'الفوز والتعادل معًا: \\(\\dfrac{3}{5}+\\dfrac{1}{4}=\\dfrac{17}{20}\\). الخسارات: \\(\\dfrac{3}{20}\\). إذا كان \\(\\dfrac{3}{20}=6\\)، فالمجموع \\(6\\cdot\\dfrac{20}{3}=40\\).'
}

const text = (es: string, eu = euTranslations[es] ?? es, ar = arTranslations[es] ?? es): LocalizedText => ({ es, eu, ar })

export function normalizeFractionLang(language: string): FractionLang {
    return normalizeUnitLanguage(language)
}

export function pickText(lang: FractionLang, value: LocalizedText): string {
    return pickLocalizedText(lang, value)
}

export const fractionExerciseSections: ExerciseSectionData[] = [
    {
        id: 'representacion',
        title: text('Concepto y representación', 'Kontzeptua eta adierazpena', 'المفهوم والتمثيل'),
        icon: '◴',
        color: '#6366f1',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Escribe la fracción que representa 7 partes tomadas de 12 partes iguales.'),
                solution: text('La fracción es \\(\\dfrac{7}{12}\\): numerador \\(7\\), denominador \\(12\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Clasifica \\(\\dfrac{5}{8}\\), \\(\\dfrac{9}{4}\\), \\(\\dfrac{6}{6}\\) como propia, impropia o igual a la unidad.'),
                solution: text('\\(\\dfrac{5}{8}\\) es propia, \\(\\dfrac{9}{4}\\) es impropia y \\(\\dfrac{6}{6}=1\\).')
            },
            {
                id: 3,
                difficulty: 'easy',
                question: text('Convierte \\(3\\dfrac{2}{5}\\) en fracción impropia.'),
                solution: text('\\(3\\dfrac{2}{5}=\\dfrac{3\\cdot5+2}{5}=\\dfrac{17}{5}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Convierte \\(\\dfrac{29}{6}\\) en número mixto.'),
                solution: text('\\(29:6=4\\) y resto \\(5\\), por tanto \\(\\dfrac{29}{6}=4\\dfrac{5}{6}\\).')
            },
            {
                id: 5,
                difficulty: 'medium',
                question: text('Representa en una recta numérica el valor \\(\\dfrac{11}{4}\\). ¿Entre qué dos enteros está?'),
                solution: text('\\(\\dfrac{11}{4}=2\\dfrac{3}{4}=2{,}75\\). Está entre \\(2\\) y \\(3\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Una unidad se divide en 9 partes. Se toman 14 partes. Escríbelo como fracción impropia y como número mixto.'),
                solution: text('Fracción impropia: \\(\\dfrac{14}{9}\\). Número mixto: \\(1\\dfrac{5}{9}\\).')
            }
        ]
    },
    {
        id: 'equivalentes',
        title: text('Equivalencia y simplificación', 'Baliokidetasuna eta sinplifikazioa', 'التكافؤ والتبسيط'),
        icon: '=',
        color: '#06b6d4',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Completa una fracción equivalente: \\(\\dfrac{3}{5}=\\dfrac{?}{20}\\).'),
                solution: text('Multiplicamos por \\(4\\): \\(\\dfrac{3}{5}=\\dfrac{12}{20}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Simplifica \\(\\dfrac{18}{24}\\).'),
                solution: text('Dividimos entre \\(6\\): \\(\\dfrac{18}{24}=\\dfrac{3}{4}\\).')
            },
            {
                id: 3,
                difficulty: 'easy',
                question: text('Comprueba si \\(\\dfrac{8}{12}\\) y \\(\\dfrac{10}{15}\\) son equivalentes.'),
                solution: text('Sí. \\(8\\cdot15=120\\) y \\(12\\cdot10=120\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Reduce \\(\\dfrac{84}{126}\\) a fracción irreducible.'),
                solution: text('\\(\\operatorname{mcd}(84,126)=42\\), luego \\(\\dfrac{84}{126}=\\dfrac{2}{3}\\).')
            },
            {
                id: 5,
                difficulty: 'medium',
                question: text('Encuentra dos fracciones equivalentes a \\(\\dfrac{7}{9}\\), una con denominador \\(27\\) y otra con denominador \\(45\\).'),
                solution: text('\\(\\dfrac{7}{9}=\\dfrac{21}{27}=\\dfrac{35}{45}\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Halla \\(x\\): \\(\\dfrac{x}{36}=\\dfrac{5}{12}\\).'),
                solution: text('Como \\(12\\cdot3=36\\), entonces \\(x=5\\cdot3=15\\).')
            }
        ]
    },
    {
        id: 'comparacion',
        title: text('Comparación y orden', 'Konparazioa eta ordena', 'المقارنة والترتيب'),
        icon: '<>',
        color: '#8b5cf6',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Ordena de menor a mayor: \\(\\dfrac{1}{2}\\), \\(\\dfrac{3}{4}\\), \\(\\dfrac{2}{3}\\).'),
                solution: text('Con denominador \\(12\\): \\(\\dfrac{6}{12}<\\dfrac{8}{12}<\\dfrac{9}{12}\\). Orden: \\(\\dfrac{1}{2}<\\dfrac{2}{3}<\\dfrac{3}{4}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Compara \\(\\dfrac{5}{6}\\) y \\(\\dfrac{7}{9}\\).'),
                solution: text('\\(5\\cdot9=45\\) y \\(7\\cdot6=42\\), luego \\(\\dfrac{5}{6}>\\dfrac{7}{9}\\).')
            },
            {
                id: 3,
                difficulty: 'medium',
                question: text('Ordena: \\(-\\dfrac{3}{5}\\), \\(\\dfrac{1}{2}\\), \\(-\\dfrac{7}{10}\\), \\(0\\).'),
                solution: text('Orden: \\(-\\dfrac{7}{10}< -\\dfrac{3}{5}<0<\\dfrac{1}{2}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Escribe una fracción entre \\(\\dfrac{2}{5}\\) y \\(\\dfrac{1}{2}\\).'),
                solution: text('Por ejemplo, con denominador \\(20\\): \\(\\dfrac{2}{5}=\\dfrac{8}{20}\\) y \\(\\dfrac{1}{2}=\\dfrac{10}{20}\\). Una posible es \\(\\dfrac{9}{20}\\).')
            },
            {
                id: 5,
                difficulty: 'hard',
                question: text('Ordena de mayor a menor: \\(\\dfrac{11}{18}\\), \\(\\dfrac{5}{8}\\), \\(\\dfrac{7}{12}\\).'),
                solution: text('Con denominador \\(72\\): \\(\\dfrac{44}{72}\\), \\(\\dfrac{45}{72}\\), \\(\\dfrac{42}{72}\\). Orden: \\(\\dfrac{5}{8}>\\dfrac{11}{18}>\\dfrac{7}{12}\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Completa con un número entero: \\(\\dfrac{13}{20}<\\dfrac{x}{10}<\\dfrac{4}{5}\\).'),
                solution: text('Pasamos a denominador \\(20\\): \\(\\dfrac{13}{20}<\\dfrac{2x}{20}<\\dfrac{16}{20}\\). Sirven \\(2x=14\\) o \\(15\\); como \\(x\\) entero, \\(x=7\\).')
            }
        ]
    },
    {
        id: 'suma-resta',
        title: text('Suma y resta', 'Batuketa eta kenketa', 'الجمع والطرح'),
        icon: '+-',
        color: '#10b981',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Calcula \\(\\dfrac{3}{8}+\\dfrac{1}{8}\\).'),
                solution: text('\\(\\dfrac{3}{8}+\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Calcula \\(1-\\dfrac{5}{12}\\).'),
                solution: text('\\(1=\\dfrac{12}{12}\\), por tanto \\(1-\\dfrac{5}{12}=\\dfrac{7}{12}\\).')
            },
            {
                id: 3,
                difficulty: 'medium',
                question: text('Calcula y simplifica \\(\\dfrac{5}{6}-\\dfrac{1}{4}\\).'),
                solution: text('m.c.m. \\((6,4)=12\\): \\(\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Calcula \\(\\dfrac{2}{3}+\\dfrac{5}{9}-\\dfrac{1}{6}\\).'),
                solution: text('m.c.m. \\((3,9,6)=18\\): \\(\\dfrac{12}{18}+\\dfrac{10}{18}-\\dfrac{3}{18}=\\dfrac{19}{18}=1\\dfrac{1}{18}\\).')
            },
            {
                id: 5,
                difficulty: 'hard',
                question: text('Calcula \\(2\\dfrac{1}{4}-\\dfrac{5}{6}+\\dfrac{3}{8}\\).'),
                solution: text('\\(2\\dfrac{1}{4}=\\dfrac{9}{4}\\). Con denominador \\(24\\): \\(\\dfrac{54}{24}-\\dfrac{20}{24}+\\dfrac{9}{24}=\\dfrac{43}{24}=1\\dfrac{19}{24}\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Calcula \\(-\\dfrac{7}{10}+\\dfrac{3}{5}-\\dfrac{1}{4}\\).'),
                solution: text('Con denominador \\(20\\): \\(-\\dfrac{14}{20}+\\dfrac{12}{20}-\\dfrac{5}{20}=-\\dfrac{7}{20}\\).')
            }
        ]
    },
    {
        id: 'producto-division',
        title: text('Multiplicación y división', 'Biderketa eta zatiketa', 'الضرب والقسمة'),
        icon: '×÷',
        color: '#f59e0b',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Calcula \\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}\\).'),
                solution: text('\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{4}=\\dfrac{6}{20}=\\dfrac{3}{10}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Calcula \\(\\dfrac{3}{7}:\\dfrac{2}{5}\\).'),
                solution: text('Dividir es multiplicar por la inversa: \\(\\dfrac{3}{7}\\cdot\\dfrac{5}{2}=\\dfrac{15}{14}\\).')
            },
            {
                id: 3,
                difficulty: 'medium',
                question: text('Calcula simplificando antes \\(\\dfrac{12}{25}\\cdot\\dfrac{15}{18}\\).'),
                solution: text('Simplificamos cruzado: \\(12/18=2/3\\) y \\(15/25=3/5\\). Resultado \\(\\dfrac{2}{5}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Calcula \\(-\\dfrac{4}{9}:\\dfrac{8}{15}\\).'),
                solution: text('\\(-\\dfrac{4}{9}\\cdot\\dfrac{15}{8}=-\\dfrac{60}{72}=-\\dfrac{5}{6}\\).')
            },
            {
                id: 5,
                difficulty: 'hard',
                question: text('Calcula \\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right):\\dfrac{3}{4}\\).'),
                solution: text('\\(\\dfrac{5}{6}\\cdot\\left(-\\dfrac{9}{10}\\right)=-\\dfrac{3}{4}\\). Después \\(-\\dfrac{3}{4}:\\dfrac{3}{4}=-1\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Si \\(\\dfrac{3}{8}\\) de una cantidad son \\(45\\), ¿cuál es la cantidad total?'),
                solution: text('La cantidad es \\(45:\\dfrac{3}{8}=45\\cdot\\dfrac{8}{3}=120\\).')
            }
        ]
    },
    {
        id: 'potencias',
        title: text('Potencias y operaciones combinadas', 'Berreturak eta eragiketa konbinatuak', 'القوى والعمليات المركبة'),
        icon: 'a²',
        color: '#ec4899',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Calcula \\(\\left(\\dfrac{2}{3}\\right)^3\\).'),
                solution: text('\\(\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('Calcula \\(\\left(-\\dfrac{3}{5}\\right)^2\\).'),
                solution: text('El exponente es par, así que el resultado es positivo: \\(\\dfrac{9}{25}\\).')
            },
            {
                id: 3,
                difficulty: 'medium',
                question: text('Calcula \\(\\dfrac{1}{2}+\\dfrac{3}{4}\\cdot\\dfrac{2}{9}\\).'),
                solution: text('Primero producto: \\(\\dfrac{3}{4}\\cdot\\dfrac{2}{9}=\\dfrac{1}{6}\\). Luego \\(\\dfrac{1}{2}+\\dfrac{1}{6}=\\dfrac{2}{3}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Calcula \\(\\left(\\dfrac{5}{6}-\\dfrac{1}{3}\\right)^2\\).'),
                solution: text('Dentro del paréntesis: \\(\\dfrac{5}{6}-\\dfrac{2}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}\\). Cuadrado: \\(\\dfrac{1}{4}\\).')
            },
            {
                id: 5,
                difficulty: 'hard',
                question: text('Calcula \\(\\dfrac{2}{3}:\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\).'),
                solution: text('Paréntesis: \\(\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{1}{3}\\). Entonces \\(\\dfrac{2}{3}:\\dfrac{1}{3}=2\\).')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Calcula \\(-\\dfrac{3}{4}+\\left(\\dfrac{2}{3}\\right)^2:\\dfrac{8}{9}\\).'),
                solution: text('\\(\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}\\). \\(\\dfrac{4}{9}:\\dfrac{8}{9}=\\dfrac{1}{2}\\). Resultado: \\(-\\dfrac{3}{4}+\\dfrac{1}{2}=-\\dfrac{1}{4}\\).')
            }
        ]
    },
    {
        id: 'problemas',
        title: text('Problemas contextualizados', 'Testuinguruko problemak', 'مسائل سياقية'),
        icon: 'ctx',
        color: '#22c55e',
        count: 6,
        items: [
            {
                id: 1,
                difficulty: 'easy',
                question: text('Una pizza se divide en 12 porciones. Ainhoa come \\(\\dfrac{1}{3}\\) y Mikel \\(\\dfrac{1}{4}\\). ¿Qué fracción queda?'),
                solution: text('Comen \\(\\dfrac{1}{3}+\\dfrac{1}{4}=\\dfrac{7}{12}\\). Queda \\(1-\\dfrac{7}{12}=\\dfrac{5}{12}\\).')
            },
            {
                id: 2,
                difficulty: 'easy',
                question: text('En una clase de 30 estudiantes, \\(\\dfrac{2}{5}\\) van al taller de robótica. ¿Cuántos estudiantes son?'),
                solution: text('\\(\\dfrac{2}{5}\\) de \\(30\\) es \\(30\\cdot\\dfrac{2}{5}=12\\).')
            },
            {
                id: 3,
                difficulty: 'medium',
                question: text('Un depósito está lleno en \\(\\dfrac{7}{8}\\). Se gastan \\(\\dfrac{1}{4}\\) del depósito completo. ¿Qué fracción queda llena?'),
                solution: text('\\(\\dfrac{7}{8}-\\dfrac{1}{4}=\\dfrac{7}{8}-\\dfrac{2}{8}=\\dfrac{5}{8}\\).')
            },
            {
                id: 4,
                difficulty: 'medium',
                question: text('Un libro tiene 240 páginas. Leire lee \\(\\dfrac{3}{8}\\) el lunes y \\(\\dfrac{1}{5}\\) el martes. ¿Cuántas páginas ha leído en total?'),
                solution: text('Fracción leída: \\(\\dfrac{3}{8}+\\dfrac{1}{5}=\\dfrac{23}{40}\\). Páginas: \\(240\\cdot\\dfrac{23}{40}=138\\).')
            },
            {
                id: 5,
                difficulty: 'hard',
                question: text('De una cantidad de dinero se gasta primero \\(\\dfrac{2}{7}\\) y después \\(\\dfrac{3}{5}\\) de lo que quedaba. Al final quedan 80 €. ¿Cuánto había al principio?'),
                solution: text('Tras gastar \\(\\dfrac{2}{7}\\), queda \\(\\dfrac{5}{7}\\). Después queda \\(\\dfrac{2}{5}\\) de eso: \\(\\dfrac{5}{7}\\cdot\\dfrac{2}{5}=\\dfrac{2}{7}\\). Si \\(\\dfrac{2}{7}\\) son 80 €, el total era \\(80\\cdot\\dfrac{7}{2}=280\\) €.')
            },
            {
                id: 6,
                difficulty: 'hard',
                question: text('Un equipo gana \\(\\dfrac{3}{5}\\) de sus partidos, empata \\(\\dfrac{1}{4}\\) y pierde 6. ¿Cuántos partidos jugó?'),
                solution: text('Ganados y empatados suman \\(\\dfrac{3}{5}+\\dfrac{1}{4}=\\dfrac{17}{20}\\). Perdidos: \\(\\dfrac{3}{20}\\). Si \\(\\dfrac{3}{20}=6\\), entonces el total es \\(6\\cdot\\dfrac{20}{3}=40\\).')
            }
        ]
    }
]
