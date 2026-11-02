import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { plainNumber } from '../../dbh4-games/format'
import { columns, COMMA_ROUNDS, createCommaRounds, createPodiumRounds, fits, PLACES, placed, placedLatex, PODIUM_ROUNDS, rightOrder, type CommaRound, type Entry, type PodiumRound } from './decimalRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Move the comma and the podium (1. DBH decimals): shift the digits in the
   place-value table, or tap the decimals in order; then the right table or
   the number line.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS_NOTE = say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3')
/** A decimal written as in class: the comma in Basque and Spanish, the point in English and Arabic */
const written = (text: string, language: UnitLanguage) => (language === 'eu' || language === 'es' ? text.replace('.', ',') : text.replace(',', '.'))

/* ---------- Move the comma ---------- */

/** One row of the place-value table: the digits, the zeros the number needs (lighter) and the comma after the units */
function PlaceRow({ digits, exponent, mark, tone }: { digits: string; exponent: number; mark: string; tone?: 'right' | 'wrong' }) {
    const cells = columns(digits, exponent)
    const top = exponent + digits.length - 1
    return (
        <div className={`dbh1-place-row${tone ? ` ${tone}` : ''}`} dir="ltr">
            {PLACES.map((place, index) => (
                <span key={place} className={`dbh1-place${place === 0 ? ' units' : ''}${cells[index] !== null && (place > top || place < exponent) ? ' filler' : ''}`} data-mark={mark}>{cells[index] ?? ''}</span>
            ))}
        </div>
    )
}

function CommaPlay({ round, language, onAnswer, answered }: RoundProps<CommaRound>) {
    const l = useGameText(language)
    const [exponent, setExponent] = useState(round.start)
    const right = exponent === round.answer
    const mark = language === 'eu' || language === 'es' ? ',' : '.'
    const shift = (step: number) => fits(round.digits, exponent + step) && setExponent(exponent + step)
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Mugitu zifrak ×10 eta ÷10 botoiekin.', 'Mueve las cifras con ×10 y ÷10.', 'حرّك الأرقام بزرّي ×10 و÷10.', 'Move the digits with ×10 and ÷10.'))}
                <span className="dbh4-big-formula" dir="ltr">{formula(`${round.question}=\\ ?`, language)}</span>
                {round.hint && <span className="dbh4-subprompt"><MathText text={l(say(`Zifrak: $${round.hint}$. Jarri koma.`, `Las cifras: $${round.hint}$. Coloca la coma.`, `الأرقام: $${round.hint}$. ضع الفاصلة.`, `The digits: $${round.hint}$. Place the comma.`))} inline /></span>}
            </p>
            <div className="dbh1-places">
                <div className="dbh1-place-row head" dir="ltr">
                    {PLACES.map((place) => <span key={place} className="dbh1-place">{plainNumber(10 ** place, language)}</span>)}
                </div>
                <PlaceRow digits={round.digits} exponent={exponent} mark={mark} tone={answered ? (right ? 'right' : 'wrong') : undefined} />
                {answered && !right && <PlaceRow digits={round.digits} exponent={round.answer} mark={mark} tone="right" />}
            </div>
            <p className="dbh4-readout" dir="ltr">{written(placed(round.digits, exponent), language)}</p>
            {!answered && (
                <>
                    <div className="dbh1-shift" dir="ltr">
                        <button type="button" onClick={() => shift(1)} disabled={!fits(round.digits, exponent + 1)}>×10</button>
                        <button type="button" onClick={() => shift(-1)} disabled={!fits(round.digits, exponent - 1)}>÷10</button>
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(`${round.question}=${placedLatex(round.digits, round.answer)}`, language)}</span>
                    {round.kind === 'power' && l(say('Biderkatzean, zifrak ezkerrera doaz; zatitzean, eskuinera. Zero bakoitzeko toki bat.', 'Al multiplicar, las cifras van a la izquierda; al dividir, a la derecha. Un lugar por cada cero.', 'عند الضرب تنتقل الأرقام إلى اليسار وعند القسمة إلى اليمين، خانة لكل صفر.', 'Multiplying moves the digits left; dividing moves them right. One place for each zero.'))}
                    {round.kind === 'product' && l(say(`Faktoreek ${round.start - round.answer} zifra hamartar dituzte guztira: emaitzak ere bai.`, `Los factores tienen ${round.start - round.answer} cifras decimales en total: el resultado también.`, `للعاملين ${round.start - round.answer} أرقام عشرية في المجموع، وكذلك للنتيجة.`, `The factors have ${round.start - round.answer} decimal places in all: so does the result.`))}
                    {round.kind === 'tenth' && <MathText text={l(say('$\\cdot 0{,}1$ eta $\\div 10$ gauza bera dira; $\\div 0{,}1$ eta $\\cdot 10$ ere bai.', '$\\cdot 0{,}1$ es lo mismo que $\\div 10$; $\\div 0{,}1$, lo mismo que $\\cdot 10$.', '$\\cdot 0.1$ مثل $\\div 10$، و$\\div 0.1$ مثل $\\cdot 10$.', '$\\cdot 0{,}1$ is the same as $\\div 10$; $\\div 0{,}1$ is the same as $\\cdot 10$.'))} inline />}
                </RoundVerdict>
            )}
        </>
    )
}

export function CommaGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: COMMA_ROUNDS,
                rules: [
                    say('Koma ez da mugitzen: zifrak mugitzen dira, ×10 ezkerrera eta ÷10 eskuinera.', 'La coma no se mueve: se mueven las cifras, ×10 a la izquierda y ÷10 a la derecha.', 'الفاصلة لا تتحرك: تتحرك الأرقام، ×10 إلى اليسار و÷10 إلى اليمين.', 'The comma stays: the digits move, ×10 to the left and ÷10 to the right.'),
                    say('Zero grisak zenbakiak behar dituen zeroak dira.', 'Los ceros grises son los que el número necesita.', 'الأصفار الرمادية هي التي يحتاجها العدد.', 'The grey zeros are the ones the number needs.'),
                    say('Jarri zifrak eta egiaztatu.', 'Coloca las cifras y comprueba.', 'ضع الأرقام وتحقّق.', 'Place the digits and check.')
                ],
                create: createCommaRounds,
                stars: standardStars(COMMA_ROUNDS),
                starsNote: STARS_NOTE,
                Round: CommaPlay
            }}
        />
    )
}

/* ---------- The podium ---------- */

/** The decimals on a number line: the labels in order on top, a line down to each true place */
function NumberLine({ entries, language }: { entries: Entry[]; language: UnitLanguage }) {
    const sorted = rightOrder(entries)
    const [low, high] = [sorted[0].value, sorted[sorted.length - 1].value]
    const at = (value: number) => 30 + ((value - low) / (high - low)) * 280
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 130" direction="ltr" aria-hidden="true">
            <line x1="20" y1="96" x2="320" y2="96" stroke={INK} strokeWidth="2" />
            {sorted.map((item, index) => {
                const x = 30 + (index * 280) / (sorted.length - 1)
                return (
                    <g key={item.text}>
                        <line x1={x} y1="38" x2={at(item.value)} y2="90" stroke="var(--blue, #2f5fb3)" strokeWidth="1.5" />
                        <circle cx={at(item.value)} cy="96" r="5" fill="var(--blue, #2f5fb3)" />
                        <text x={x} y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>{written(item.text, language)}</text>
                    </g>
                )
            })}
            <text x="30" y="120" textAnchor="middle" fontSize="12" fill="var(--muted, #6b6b6b)">{written(sorted[0].text, language)}</text>
            <text x="310" y="120" textAnchor="middle" fontSize="12" fill="var(--muted, #6b6b6b)">{written(sorted[sorted.length - 1].text, language)}</text>
        </svg>
    )
}

function PodiumPlay({ round, language, onAnswer, answered }: RoundProps<PodiumRound>) {
    const l = useGameText(language)
    const [order, setOrder] = useState<number[]>([])
    const { entries } = round
    const sorted = rightOrder(entries)
    const right = order.length === entries.length && order.every((index, place) => entries[index] === sorted[place])
    return (
        <>
            <p className="prop3-prompt">{l(say('Sakatu zenbakiak txikienetik handienera.', 'Toca los números de menor a mayor.', 'المس الأعداد من الأصغر إلى الأكبر.', 'Tap the numbers from the smallest to the biggest.'))}</p>
            {answered && <NumberLine entries={entries} language={language} />}
            <div className="dbh4-candidates dbh1-podium" dir="ltr">
                {entries.map((item, index) => {
                    const rank = order.indexOf(index)
                    const truth = sorted.indexOf(item)
                    return (
                        <button key={item.text} type="button" disabled={answered || rank >= 0} className={answered ? (rank === truth ? 'found' : 'missed') : rank >= 0 ? 'chosen' : ''} onClick={() => setOrder([...order, index])}>
                            {rank >= 0 && <span className="dbh1-rank">{rank + 1}</span>}
                            {written(item.text, language)}
                        </button>
                    )
                })}
            </div>
            {!answered && (
                <div className="prop3-panel dbh1-podium-panel">
                    <button type="button" className="fraction-v2-secondary" onClick={() => setOrder([])} disabled={order.length === 0}>{l(say('Ezabatu', 'Borrar', 'امسح', 'Clear'))}</button>
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)} disabled={order.length < entries.length}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(sorted.map((item) => item.text.replace('.', '{,}')).join('<'), language)}</span>
                    {l(say('Konparatu zifraz zifra, komatik hasita; zeroak gehitu daitezke: 0,50 > 0,45.', 'Compara cifra a cifra desde la coma; puedes añadir ceros: 0,50 > 0,45.', 'قارن رقمًا برقم بعد الفاصلة، ويمكنك إضافة أصفار: 0.50 > 0.45.', 'Compare digit by digit after the point; you can add zeros: 0.50 > 0.45.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function PodiumGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PODIUM_ROUNDS,
                rules: [
                    say('Lehenik zati osoa; berdina bada, hamarrenak, ehunenak…', 'Primero la parte entera; si es igual, las décimas, las centésimas…', 'أولًا الجزء الصحيح، وإن تساوى فالأجزاء من عشرة ثم من مئة…', 'First the whole part; if it is the same, the tenths, the hundredths…'),
                    say('Zifra gehiago izateak ez du handiago egiten: 0,5 > 0,45.', 'Tener más cifras no lo hace mayor: 0,5 > 0,45.', 'كثرة الأرقام لا تجعله أكبر: 0.5 > 0.45.', 'More digits does not make it bigger: 0.5 > 0.45.'),
                    say('Sakatu ordenan eta egiaztatu: gero, zenbaki-zuzena.', 'Toca en orden y comprueba: luego, la recta numérica.', 'المس بالترتيب وتحقّق: ثم المستقيم العددي.', 'Tap them in order and check: then the number line.')
                ],
                create: createPodiumRounds,
                stars: standardStars(PODIUM_ROUNDS),
                starsNote: STARS_NOTE,
                Round: PodiumPlay
            }}
        />
    )
}

/* ---------- Art ---------- */

/** The art of move the comma: 3,45 in the table and the digits going left */
export function CommaArt() {
    const cells = ['', '3', '4', '5', '']
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {cells.map((digit, index) => (
                <g key={index}>
                    <rect x={20 + index * 36} y="34" width="36" height="44" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                    <text x={38 + index * 36} y="65" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">{digit}</text>
                </g>
            ))}
            <text x="91" y="80" textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--coral)">,</text>
            <path d="M 150 22 H 70 l 8 -6 M 70 22 l 8 6" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" />
            <text x="110" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--blue)" direction="ltr">×10</text>
        </svg>
    )
}

/** The art of the podium: three steps with decimals, written with the language's decimal mark */
export function PodiumArt({ mark }: { mark: (text: string) => string }) {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="80" y="40" width="60" height="70" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="20" y="62" width="60" height="48" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="140" y="78" width="60" height="32" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="110" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{mark('0,5')}</text>
            <text x="50" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{mark('0,45')}</text>
            <text x="170" y="70" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">{mark('0,405')}</text>
        </svg>
    )
}
