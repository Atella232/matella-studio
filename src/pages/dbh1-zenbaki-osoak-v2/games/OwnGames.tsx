import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { createZeroRounds, sumLatex, termsLatex, ZERO_LIMIT, ZERO_ROUNDS, type ZeroRound } from './zeroPairs'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Zero pairs (1. DBH integers): set the result; then the terms become + and
   − counters that cancel in pairs, and what is left is the result.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : value > 0 ? `+${value}` : '0')

/** The counters: + on top, − below, column by column; the pairs fade and the rest stay */
function Counters({ positives, negatives, answer }: { positives: number; negatives: number; answer: number }) {
    const columns = Math.max(positives, negatives)
    const pitch = Math.min(24, 300 / columns)
    const x = (index: number) => 170 - ((columns - 1) * pitch) / 2 + index * pitch
    const pairs = Math.min(positives, negatives)
    const radius = Math.min(10, pitch / 2 - 1)
    const counter = (index: number, y: number, positive: boolean) => (
        <g key={`${positive}-${index}`} className={index < pairs ? 'dbh1-cancel' : 'dbh1-left'}>
            <circle cx={x(index)} cy={y} r={radius} fill={positive ? 'var(--blue-tint, #dde7f7)' : 'var(--coral-tint, #f6d5cc)'} stroke={positive ? 'var(--blue, #2f5fb3)' : 'var(--coral, #d9502e)'} strokeWidth="2" />
            <text x={x(index)} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={positive ? 'var(--blue, #2f5fb3)' : 'var(--coral, #d9502e)'}>{positive ? '+' : '−'}</text>
        </g>
    )
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 170" direction="ltr" aria-hidden="true">
            {Array.from({ length: pairs }, (_, index) => (
                <rect key={index} className="dbh1-cancel" x={x(index) - pitch / 2 + 1} y="30" width={pitch - 2} height="100" rx="8" fill="none" stroke="var(--muted, #6b6b6b)" strokeWidth="1.5" strokeDasharray="4 3" />
            ))}
            {Array.from({ length: positives }, (_, index) => counter(index, 54, true))}
            {Array.from({ length: negatives }, (_, index) => counter(index, 106, false))}
            <text x="170" y="158" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--success, #267b53)">{`= ${signed(answer)}`}</text>
        </svg>
    )
}

function ZeroPlay({ round, language, onAnswer, answered }: RoundProps<ZeroRound>) {
    const l = useGameText(language)
    const [value, setValue] = useState(0)
    const right = value === round.answer
    const written = termsLatex(round.terms)
    const asSum = sumLatex(round.terms)
    const subtracts = round.terms.some((term) => term.op === '-')
    const pairs = Math.min(round.positives, round.negatives)
    const left = Math.abs(round.answer)
    const sign = round.answer > 0 ? '+' : '−'
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Zenbat da?', '¿Cuánto da?', 'كم الناتج؟', 'What is the result?'))}
                <span className="dbh4-big-formula" dir="ltr">{formula(written, language)}</span>
            </p>
            {answered && <Counters positives={round.positives} negatives={round.negatives} answer={round.answer} />}
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={l(say('Emaitza', 'Resultado', 'النتيجة', 'Result'))} value={value} min={-ZERO_LIMIT} max={ZERO_LIMIT} format={signed} onChange={setValue} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(subtracts ? `${written}=${asSum}=${round.answer}` : `${written}=${round.answer}`, language)}</span>
                    {subtracts && `${l(say('Kentzea aurkakoa batzea da.', 'Restar es sumar el opuesto.', 'الطرح هو جمع المعاكس.', 'Subtracting is adding the opposite.'))} `}
                    {l(say(`Ezabatzen diren bikoteak: ${pairs}. Geratzen diren fitxak: ${left} (${sign}).`, `Parejas que se anulan: ${pairs}. Fichas que quedan: ${left} (${sign}).`, `الأزواج التي تُلغى: ${pairs}. القطع الباقية: ${left} (${sign}).`, `Pairs that cancel: ${pairs}. Counters left: ${left} (${sign}).`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function ZeroGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ZERO_ROUNDS,
                rules: [
                    say('Fitxa positibo bat eta negatibo bat batera: 0.', 'Una ficha positiva y una negativa juntas: 0.', 'قطعة موجبة وقطعة سالبة معًا: 0.', 'A positive and a negative counter together: 0.'),
                    say('Kentzea aurkakoa batzea da: $5-(-2)=5+2$.', 'Restar es sumar el opuesto: $5-(-2)=5+2$.', 'الطرح هو جمع المعاكس: $5-(-2)=5+2$.', 'Subtracting is adding the opposite: $5-(-2)=5+2$.'),
                    say('Jarri emaitza eta egiaztatu: gero fitxak bikoteka ezabatzen dira.', 'Pon el resultado y comprueba: después las fichas se anulan por parejas.', 'ضع النتيجة وتحقّق: ثم تُلغى القطع أزواجًا.', 'Set the result and check: then the counters cancel in pairs.')
                ],
                create: createZeroRounds,
                stars: standardStars(ZERO_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: ZeroPlay
            }}
        />
    )
}

/** The art of zero pairs: three + over three −, two pairs boxed */
export function ZeroArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
                <g key={index}>
                    {index < 2 && <rect x={46 + index * 34} y="14" width="30" height="92" rx="8" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />}
                    <circle cx={61 + index * 34} cy="38" r="12" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" />
                    <text x={61 + index * 34} y="44" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--blue)">+</text>
                    {index < 2 && <circle cx={61 + index * 34} cy="82" r="12" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2.5" />}
                    {index < 2 && <text x={61 + index * 34} y="88" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--coral)">−</text>}
                </g>
            ))}
            <text x="196" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">+2</text>
        </svg>
    )
}
