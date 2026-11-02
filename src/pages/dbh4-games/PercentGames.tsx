import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { standardStars } from './equations'
import { plainNumber } from './format'
import { tex } from './geometryDetective'
import { CHAIN_ROUNDS, chainFactor, createChainRounds, multiplier, totalChange, type ChainRound } from './percentChain'
import './Dbh4Games.css'

/* ==========================================================================
   Chained percentages (4. DBH academic): choose the total change (or the
   price before); then the price bars go step by step with each multiplier.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const percentLatex = (value: number) => `${value > 0 ? '+' : value < 0 ? '-' : ''}${tex(Math.abs(value))}\\,\\%`
const euros = (value: number) => `${tex(value)}\\ \\text{€}`

function ChainBars({ round, language }: { round: ChainRound; language: UnitLanguage }) {
    const values = round.changes.reduce<number[]>((list, change) => [...list, list[list.length - 1] * multiplier(change)], [round.start])
    const top = Math.max(...values)
    const width = Math.min(70, 260 / values.length - 16)
    return (
        <svg className="dbh4-scene dbh4-scene-short" viewBox="0 0 320 190" direction="ltr" aria-hidden="true">
            <line x1="12" y1="160" x2="308" y2="160" stroke={INK} strokeWidth="2" />
            {values.map((value, index) => {
                const x = 24 + index * ((280 - width) / Math.max(1, values.length - 1))
                const height = (value / top) * 120
                return (
                    <g key={index}>
                        <rect x={x} y={160 - height} width={width} height={height} rx="4" fill={index === 0 ? 'var(--paper-deep, #ece6da)' : index === values.length - 1 ? 'var(--success-tint, #d9efe2)' : 'var(--blue-tint, #dde7f7)'} stroke={INK} strokeWidth="2" />
                        <text x={x + width / 2} y={176} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>{`${plainNumber(Math.round(value * 100) / 100, language)} €`}</text>
                        {index > 0 && <text x={x - 8} y={160 - height - 8} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--blue, #2f5fb3)">{`×${plainNumber(multiplier(round.changes[index - 1]), language)}`}</text>}
                    </g>
                )
            })}
        </svg>
    )
}

function changesText(round: ChainRound): string {
    return round.changes.map((change) => `$${percentLatex(change)}$`).join(', ')
}

function ChainPlay({ round, language, onAnswer, answered }: RoundProps<ChainRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const change = round.changes[0]
    const after = Math.round(round.start * chainFactor(round.changes) * 100) / 100
    const prompt = round.inverse
        ? change > 0
            ? say(`$${tex(change)}\\,\\%$ igo ondoren, prezio bat $${euros(after)}$ da. Zenbat zen lehen?`, `Tras subir un $${tex(change)}\\,\\%$, un precio es $${euros(after)}$. ¿Cuánto era antes?`, `بعد زيادة $${tex(change)}\\,\\%$ صار السعر $${euros(after)}$. كم كان قبلها؟`, `After a $${tex(change)}\\,\\%$ rise, a price is $${euros(after)}$. What was it before?`)
            : say(`$${tex(-change)}\\,\\%$ jaitsi ondoren, prezio bat $${euros(after)}$ da. Zenbat zen lehen?`, `Tras una rebaja del $${tex(-change)}\\,\\%$, un precio es $${euros(after)}$. ¿Cuánto era antes?`, `بعد تخفيض $${tex(-change)}\\,\\%$ صار السعر $${euros(after)}$. كم كان قبله؟`, `After a $${tex(-change)}\\,\\%$ discount, a price is $${euros(after)}$. What was it before?`)
        : say(`$${euros(round.start)}$-ko prezio batek aldaketa hauek ditu: ${changesText(round)}. Zein da aldaketa osoa?`, `Un precio de $${euros(round.start)}$ cambia así: ${changesText(round)}. ¿Cuál es la variación total?`, `سعر قدره $${euros(round.start)}$ يتغير هكذا: ${changesText(round)}. ما التغير الكلي؟`, `A price of $${euros(round.start)}$ changes like this: ${changesText(round)}. What is the total change?`)
    const chain = round.changes.map((value) => tex(multiplier(value))).join('\\cdot ')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            {answered && <ChainBars round={round} language={language} />}
            <div className="dbh4-candidates dbh4-fractions">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={answered ? (index === round.right ? 'found' : index === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(index)
                        onAnswer(index === round.right)
                    }}>
                        {formula(round.inverse ? euros(option) : percentLatex(option), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === round.right} language={language}>
                    <span className="dbh4-worked">{formula(round.inverse ? `${euros(after)}\\div ${tex(multiplier(change))}=${euros(round.start)}` : `${chain}=${tex(chainFactor(round.changes))}\\ \\to\\ ${percentLatex(totalChange(round.changes))}`, language)}</span>
                    {round.inverse
                        ? l(say('Atzera egiteko, zatitu biderkatzaileaz.', 'Para volver atrás, se divide entre el multiplicador.', 'للرجوع نقسم على المضاعِف.', 'To go back, divide by the multiplier.'))
                        : l(say('Ehunekoak ez dira batzen: biderkatzaileak biderkatzen dira.', 'Los porcentajes no se suman: se multiplican los multiplicadores.', 'النسب لا تُجمع: تُضرب المضاعِفات.', 'Percentages are not added: the multipliers are multiplied.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function ChainGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CHAIN_ROUNDS,
                rules: [
                    say('$20\\,\\%$ igotzea $1{,}2$ bider da; $10\\,\\%$ jaistea, $0{,}9$ bider.', 'Subir un $20\\,\\%$ es multiplicar por $1{,}2$; bajar un $10\\,\\%$, por $0{,}9$.', 'زيادة $20\\,\\%$ ضرب في $1{,}2$، وتخفيض $10\\,\\%$ ضرب في $0{,}9$.', 'A $20\\,\\%$ rise multiplies by $1{,}2$; a $10\\,\\%$ discount, by $0{,}9$.'),
                    say('Aldaketa batzuk segidan: biderkatzaileak biderkatu.', 'Varios cambios seguidos: se multiplican los multiplicadores.', 'عدة تغيّرات متتالية: نضرب المضاعِفات.', 'Several changes in a row: multiply the multipliers.'),
                    say('Aukeratu erantzuna: gero, prezioaren barrak urratsez urrats.', 'Elige la respuesta: luego, las barras del precio paso a paso.', 'اختر الإجابة: ثم أعمدة السعر خطوة خطوة.', 'Choose the answer: then the price bars step by step.')
                ],
                create: createChainRounds,
                stars: standardStars(CHAIN_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: ChainPlay
            }}
        />
    )
}

/** The art of chained percentages */
export function ChainArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="10" y1="104" x2="210" y2="104" stroke="var(--ink)" strokeWidth="2.5" />
            {[[24, 60], [92, 72], [160, 54]].map(([x, height], index) => <rect key={x} x={x} y={104 - height} width="40" height={height} rx="4" fill={index === 2 ? 'var(--success-tint, #d9efe2)' : 'var(--blue-tint, #dde7f7)'} stroke="var(--ink)" strokeWidth="2.5" />)}
            <text x="88" y="24" textAnchor="end" fontSize="14" fontWeight="700" fill="var(--blue)" direction="ltr">×1,2</text>
            <text x="156" y="42" textAnchor="end" fontSize="14" fontWeight="700" fill="var(--blue)" direction="ltr">×0,9</text>
        </svg>
    )
}
