import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { createShareRounds, createStripsRounds, fracLatex as f, gcd, SHARE_ROUNDS, STRIPS_ROUNDS, valueOf, type ShareRound, type ShareThing, type StripsRound } from './fractionRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Share it out and fraction strips (1. DBH fractions): choose the answer;
   then the things in groups, or the strips cut into the common
   denominator.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** A fraction at full size, for the options and the question */
const big = (n: number, d: number) => `\\dfrac{${n}}{${d}}`
const INK = 'var(--ink, #1d2733)'
const BLUE = 'var(--blue, #2f5fb3)'
const CORAL = 'var(--coral, #d9502e)'
const STARS_NOTE = say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3')

/* ---------- Share it out ---------- */

/** Basque bare and genitive plural, Arabic after a number and with the article */
const THINGS: Record<ShareThing, { eu: [string, string]; es: string; en: string; ar: [string, string] }> = {
    sweets: { eu: ['gozoki', 'gozokien'], es: 'caramelos', en: 'sweets', ar: ['قطعة حلوى', 'قطع الحلوى'] },
    stickers: { eu: ['kromo', 'kromoen'], es: 'cromos', en: 'stickers', ar: ['ملصقًا', 'الملصقات'] },
    pencils: { eu: ['arkatz', 'arkatzen'], es: 'lápices', en: 'pencils', ar: ['قلمًا', 'الأقلام'] }
}

/** The things in d groups; the a groups taken are coloured */
function Groups({ round }: { round: ShareRound }) {
    const { d, a } = round
    const group = round.total / d
    const perRow = d <= 4 ? d : Math.ceil(d / 2)
    const rows = Math.ceil(d / perRow)
    const width = (300 - (perRow - 1) * 8) / perRow
    const columns = group <= 4 ? group : Math.ceil(group / 2)
    return (
        <svg className="dbh4-scene" viewBox={`0 0 340 ${20 + rows * 70}`} direction="ltr" aria-hidden="true">
            {Array.from({ length: d }, (_, index) => {
                const [x, y] = [20 + (index % perRow) * (width + 8), 12 + Math.floor(index / perRow) * 70]
                const taken = index < a
                return (
                    <g key={index}>
                        <rect x={x} y={y} width={width} height="60" rx="10" fill={taken ? 'var(--success-tint, #d9efe2)' : 'var(--card, #fffcf6)'} stroke={taken ? 'var(--success, #267b53)' : INK} strokeWidth={taken ? 3 : 1.5} />
                        {Array.from({ length: group }, (_, dot) => {
                            const row = Math.floor(dot / columns)
                            const lines = Math.ceil(group / columns)
                            return <circle key={dot} cx={x + width / 2 + ((dot % columns) - (columns - 1) / 2) * 14} cy={y + 30 + (row - (lines - 1) / 2) * 16} r="5.5" fill={taken ? 'var(--success, #267b53)' : 'var(--muted, #8a8a8a)'} />
                        })}
                    </g>
                )
            })}
        </svg>
    )
}

function SharePlay({ round, language, onAnswer, answered }: RoundProps<ShareRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const { a, d, total, part } = round
    const thing = THINGS[round.thing]
    const fraction = f(a, d)
    const group = total / d
    const prompt = round.inverse
        ? say(`Zure ${thing.eu[1]} $${fraction}$ oparitu dituzu, eta $${part}$ dira. Zenbat ${thing.eu[0]} zenituen?`, `Has regalado $${fraction}$ de tus ${thing.es}, que son $${part}$. ¿Cuántos ${thing.es} tenías?`, `أهديت $${fraction}$ من ${thing.ar[1]}، وهي $${part}$. كم كان لديك؟`, `You gave away $${fraction}$ of your ${thing.en}: that is $${part}$. How many ${thing.en} did you have?`)
        : say(`$${total}$ ${thing.eu[0]} dituzu. Horien $${fraction}$ oparitzen dituzu. Zenbat ${thing.eu[0]} oparitzen dituzu?`, `Tienes $${total}$ ${thing.es}. Regalas $${fraction}$ de ellos. ¿Cuántos ${thing.es} regalas?`, `لديك $${total}$ ${thing.ar[0]}. تهدي $${fraction}$ منها. كم تهدي؟`, `You have $${total}$ ${thing.en}. You give away $${fraction}$ of them. How many ${thing.en} do you give away?`)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            {answered && <Groups round={round} />}
            <div className="dbh4-candidates" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={answered ? (option === round.answer ? 'found' : option === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(option)
                        onAnswer(option === round.answer)
                    }}>
                        {option}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === round.answer} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(round.inverse ? `${part}\\div ${a}=${group}\\ \\to\\ ${group}\\cdot ${d}=${total}` : `${total}\\div ${d}=${group}\\ \\to\\ ${group}\\cdot ${a}=${part}`, language)}</span>
                    {round.inverse
                        ? l(say('Zatitu zenbakitzaileaz talde bat lortzeko; biderkatu izendatzaileaz osoa lortzeko.', 'Divide entre el numerador para un grupo; multiplica por el denominador para el total.', 'نقسم على البسط لنحصل على مجموعة، ونضرب في المقام لنحصل على الكل.', 'Divide by the numerator for one group; multiply by the denominator for the whole.'))
                        : l(say('Izendatzaileak taldeak ematen ditu; zenbakitzaileak, zenbat hartzen diren.', 'El denominador da los grupos; el numerador, cuántos se toman.', 'المقام يعطي عدد المجموعات، والبسط عدد ما نأخذ منها.', 'The denominator gives the groups; the numerator, how many are taken.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function ShareGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SHARE_ROUNDS,
                rules: [
                    say('$24$ zenbakiaren $\\frac{3}{4}$: $24\\div 4=6$ eta $6\\cdot 3=18$.', '$\\frac{3}{4}$ de $24$: $24\\div 4=6$ y $6\\cdot 3=18$.', '$\\frac{3}{4}$ من $24$: $24\\div 4=6$ و$6\\cdot 3=18$.', '$\\frac{3}{4}$ of $24$: $24\\div 4=6$ and $6\\cdot 3=18$.'),
                    say('3. mailan zatia ezagutzen da, eta osoa galdetzen da.', 'En el nivel 3 se conoce la parte y se pregunta el total.', 'في المستوى 3 نعرف الجزء ونسأل عن الكل.', 'In level 3 the part is known and the whole is asked.'),
                    say('Aukeratu erantzuna: gero, gauzak taldeka.', 'Elige la respuesta: luego, las cosas en grupos.', 'اختر الإجابة: ثم الأشياء في مجموعات.', 'Choose the answer: then the things in groups.')
                ],
                create: createShareRounds,
                stars: standardStars(SHARE_ROUNDS),
                starsNote: STARS_NOTE,
                Round: SharePlay
            }}
        />
    )
}

/* ---------- Fraction strips ---------- */

/** One strip from x 60 to 320 cut into `parts`, with coloured cells */
function Strip({ y, parts, cells, label }: { y: number; parts: number; cells: Array<'blue' | 'coral' | 'gone' | null>; label: string }) {
    const width = 260 / parts
    return (
        <g>
            <text x="50" y={y + 21} textAnchor="end" fontSize="15" fontWeight="700" fill={INK}>{label}</text>
            {Array.from({ length: parts }, (_, index) => {
                const kind = cells[index]
                return <rect key={index} x={60 + index * width} y={y} width={width} height="30" fill={kind === 'blue' ? 'var(--blue-tint, #dde7f7)' : kind === 'coral' ? 'var(--coral-tint, #f6d5cc)' : kind === 'gone' ? 'url(#dbh1-gone)' : 'var(--card, #fffcf6)'} stroke={kind === 'blue' ? BLUE : kind === 'coral' ? CORAL : INK} strokeWidth="1.5" />
            })}
        </g>
    )
}

function Strips({ round }: { round: StripsRound }) {
    const { first, second, common, op } = round
    const [x, y] = [(first.n * common) / first.d, (second.n * common) / second.d]
    const fill = (count: number, kind: 'blue' | 'coral') => Array.from({ length: count }, () => kind)
    const result = op === '+'
        ? [...fill(x, 'blue'), ...fill(y, 'coral')]
        : [...fill(x - y, 'blue'), ...Array.from({ length: y }, () => 'gone' as const)]
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 150" direction="ltr" aria-hidden="true">
            <defs>
                <pattern id="dbh1-gone" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="6" height="6" fill="var(--coral-tint, #f6d5cc)" />
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--coral, #d9502e)" strokeWidth="2" />
                </pattern>
            </defs>
            <Strip y={10} parts={first.d} cells={fill(first.n, 'blue')} label={`${first.n}/${first.d}`} />
            <Strip y={54} parts={second.d} cells={fill(second.n, 'coral')} label={`${second.n}/${second.d}`} />
            <Strip y={104} parts={common} cells={result} label={`${op === '+' ? x + y : x - y}/${common}`} />
        </svg>
    )
}

function StripsPlay({ round, language, onAnswer, answered }: RoundProps<StripsRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const { first, second, common, op } = round
    const [x, y] = [(first.n * common) / first.d, (second.n * common) / second.d]
    const n = op === '+' ? x + y : x - y
    const sign = op === '+' ? '+' : '-'
    const isRight = (index: number) => Math.abs(valueOf(round.options[index]) - round.right) < 1e-9
    const reduced = gcd(n, common) > 1 && n > 0 ? `=${f(n / gcd(n, common), common / gcd(n, common))}` : ''
    const worked = first.d === second.d
        ? `${f(first.n, first.d)}${sign}${f(second.n, second.d)}=${f(n, common)}${reduced}`
        : `${f(first.n, first.d)}${sign}${f(second.n, second.d)}=${f(x, common)}${sign}${f(y, common)}=${f(n, common)}${reduced}`
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Zenbat da?', '¿Cuánto da?', 'كم الناتج؟', 'What is the result?'))}
                <span className="dbh4-big-formula" dir="ltr">{formula(`${big(first.n, first.d)}${sign}${big(second.n, second.d)}`, language)}</span>
            </p>
            {answered && <Strips round={round} />}
            <div className="dbh4-candidates dbh4-fractions" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={answered ? (isRight(index) ? 'found' : index === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(index)
                        onAnswer(isRight(index))
                    }}>
                        {formula(big(option.n, option.d), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen !== null && isRight(chosen)} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(worked, language)}</span>
                    {first.d === second.d
                        ? l(say('Izendatzaile bera: zenbakitzaileak bakarrik batu edo kendu.', 'Mismo denominador: solo se suman o restan los numeradores.', 'المقام نفسه: نجمع البسوط أو نطرحها فقط.', 'Same denominator: only the numerators are added or subtracted.'))
                        : l(say('Lehenik izendatzaile komuna; gero, zenbakitzaileak batu edo kendu.', 'Primero el denominador común; después se suman o restan los numeradores.', 'أولًا المقام المشترك ثم نجمع البسوط أو نطرحها.', 'First the common denominator; then add or subtract the numerators.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function StripsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: STRIPS_ROUNDS,
                rules: [
                    say('Izendatzaile bera: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.', 'Mismo denominador: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.', 'المقام نفسه: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.', 'Same denominator: $\\frac{2}{7}+\\frac{3}{7}=\\frac{5}{7}$.'),
                    say('Izendatzaile desberdinak: $\\frac{1}{2}+\\frac{1}{4}=\\frac{2}{4}+\\frac{1}{4}$.', 'Distinto denominador: $\\frac{1}{2}+\\frac{1}{4}=\\frac{2}{4}+\\frac{1}{4}$.', 'مقامات مختلفة: $\\frac{1}{2}+\\frac{1}{4}=\\frac{2}{4}+\\frac{1}{4}$.', 'Different denominators: $\\frac{1}{2}+\\frac{1}{4}=\\frac{2}{4}+\\frac{1}{4}$.'),
                    say('Aukeratu emaitza: gero, barrak izendatzaile komunean moztuta.', 'Elige el resultado: luego, las tiras cortadas en el denominador común.', 'اختر النتيجة: ثم الأشرطة مقطوعة بالمقام المشترك.', 'Choose the result: then the strips cut into the common denominator.')
                ],
                create: createStripsRounds,
                stars: standardStars(STRIPS_ROUNDS),
                starsNote: STARS_NOTE,
                Round: StripsPlay
            }}
        />
    )
}

/* ---------- Art ---------- */

/** The art of share it out: 12 dots in three groups, two of them taken */
export function ShareArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2].map((group) => (
                <g key={group}>
                    <rect x={14 + group * 66} y="22" width="58" height="62" rx="10" fill={group < 2 ? 'var(--success-tint, #d9efe2)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2.5" />
                    {[0, 1, 2, 3].map((dot) => <circle key={dot} cx={32 + group * 66 + (dot % 2) * 22} cy={42 + Math.floor(dot / 2) * 22} r="7" fill={group < 2 ? 'var(--success, #267b53)' : 'var(--muted)'} />)}
                </g>
            ))}
            <text x="110" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">2/3 · 12 = 8</text>
        </svg>
    )
}

/** The art of fraction strips: 1/2 and 1/4 make 3/4 */
export function StripsArt() {
    const strip = (y: number, parts: number, filled: number, fill: string) => Array.from({ length: parts }, (_, index) => (
        <rect key={`${y}-${index}`} x={30 + index * (160 / parts)} y={y} width={160 / parts} height="22" fill={index < filled ? fill : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />
    ))
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {strip(12, 2, 1, 'var(--blue-tint, #dde7f7)')}
            {strip(46, 4, 1, 'var(--coral-tint, #f6d5cc)')}
            {strip(80, 4, 3, 'var(--success-tint, #d9efe2)')}
        </svg>
    )
}
