import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { BANK_LETTERS, BANK_ROUNDS, bankFinals, createBankRounds, bankFormula, bankLesson, bankName, bankOfferTexts, bankPrompt, bankStars, type BankRound } from './bank'
import './Bank.css'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import { moneyText } from './numbers'

const game = proportionDbh4ApGames.find((item) => item.id === 'bank')!

/** Each bank keeps its colour on its card and on its bar */
const COLORS = ['blue', 'green', 'coral'] as const

const toCent = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6

export function ProportionDbh4ApBankGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<BankRound[]>([])
    const [index, setIndex] = useState(0)
    const [chosen, setChosen] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    /** Money left in the bank: what the best offers gave beyond the chosen ones */
    const [lost, setLost] = useState(0)

    const round = rounds[index]
    // Euros in a sentence; in Arabic the amount, its sign and the € stay together, left to right
    const euros = (value: number, sign = '') => (language === 'ar' ? `\u2066${sign}${moneyText(value, language)} €\u2069` : `${sign}${moneyText(value, language)} €`)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createBankRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setChosen(null)
        setScore(0)
        setLost(0)
        setPhase('playing')
    }

    const choose = (offer: number) => {
        if (chosen !== null) return
        const finals = bankFinals(round)
        setChosen(offer)
        if (offer === round.best) setScore((current) => current + 1)
        else setLost((current) => current + finals[round.best] - finals[offer])
    }

    const next = () => {
        if (index + 1 >= BANK_ROUNDS) {
            onResult(level, { stars: bankStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setChosen(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ProportionDbh4ApGameArt game="bank" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${BANK_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Kapital bera eta urte berak: aukeratu diru gehien ematen duen eskaintza.', es: 'El mismo capital y los mismos años: elige la oferta que más dinero da.', ar: 'رأس المال نفسه والسنوات نفسها: اختر العرض الذي يعطي مالًا أكثر.' })}</li>
                        <li>
                            <MathText
                                inline
                                text={l({
                                    eu: 'Kalkulatu: bakuna, $C\\cdot(1+r\\cdot t)$; konposatua, $C\\cdot(1+r)^{t}$; hilean behin, $\\frac{r}{12}$ eta $12t$ aldi.',
                                    es: 'Calcula: simple, $C\\cdot(1+r\\cdot t)$; compuesto, $C\\cdot(1+r)^{t}$; cada mes, $\\frac{r}{12}$ y $12t$ periodos.',
                                    ar: 'احسب: البسيطة $C\\cdot(1+r\\cdot t)$، والمركّبة $C\\cdot(1+r)^{t}$، وكل شهر $\\frac{r}{12}$ و$12t$ فترة.'
                                })}
                            />
                        </li>
                        <li>{l({ eu: `${BANK_ROUNDS} txanda; puntu 1 asmatutako bakoitzeko.`, es: `${BANK_ROUNDS} rondas; 1 punto por cada acierto.`, ar: `${BANK_ROUNDS} جولات؛ نقطة لكل اختيار صحيح.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="bank-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={bankStars(score)}
                    title={`${score} / ${BANK_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 · 2 izar: 5 · izar 1: 4', es: '3 estrellas: 6 · 2: 5 · 1: 4', ar: '3 نجوم: 6 · 2: 5 · 1: 4' })}
                    stats={[
                        { label: l({ eu: 'Asmatutakoak', es: 'Aciertos', ar: 'الاختيارات الصحيحة' }), value: `${score} / ${BANK_ROUNDS}` },
                        { label: l({ eu: 'Bankuan utzitako dirua', es: 'Dinero que dejaste en el banco', ar: 'المال الذي تركته في المصرف' }), value: euros(lost) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>
    const finals = bankFinals(round)
    const interests = finals.map((final) => final - round.capital)
    const most = Math.max(...interests)
    const second = Math.max(...finals.filter((_, position) => position !== round.best))
    const revealed = chosen !== null
    const years = `$${round.years}$`

    return (
        <div className="bank-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {BANK_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <p className="bank-prompt"><MathText text={l(bankPrompt(round))} inline /></p>

            <div className="bank-offers" data-count={round.offers.length}>
                {round.offers.map((offer, position) => {
                    const [kind, rate, when] = bankOfferTexts(offer)
                    const state = !revealed ? '' : position === round.best ? 'best' : position === chosen ? 'missed' : 'other'
                    return (
                        <button type="button" key={position} className={`bank-offer ${state}`} data-color={COLORS[position]} disabled={revealed} onClick={() => choose(position)}>
                            <span className="bank-offer-name">
                                {l(bankName(position))}
                                {revealed && position === round.best && <span className="bank-offer-star" aria-hidden="true">★</span>}
                            </span>
                            <span className="bank-offer-kind">{l(kind)}</span>
                            <span className="bank-offer-rate"><MathText text={l(rate)} inline /></span>
                            <span className="bank-offer-when">{l(when)}</span>
                            {revealed && (
                                <span className="bank-offer-result">
                                    <MathText text={`$${localLatex(bankFormula(round, offer), language)}$`} />
                                    <strong>{euros(finals[position], toCent(finals[position]) ? '= ' : '≈ ')}</strong>
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {revealed && (
                <>
                    <section className="bank-bars" aria-label={l({ eu: 'Interesak', es: 'Intereses', ar: 'الفوائد' })}>
                        <h3><MathText text={l({ eu: `Interesak ${years} urtean`, es: `Intereses en ${years} años`, ar: `الفوائد في ${years} سنوات` })} inline /></h3>
                        {round.offers.map((_, position) => (
                            <div key={position} className={`bank-bar-row ${position === round.best ? 'best' : ''}`} data-color={COLORS[position]}>
                                <span className="bank-bar-name">{l(BANK_LETTERS[position])}</span>
                                <span className="bank-bar-track">
                                    <span className="bank-bar-fill" style={{ width: `${Math.max(3, (100 * interests[position]) / most)}%` }} />
                                </span>
                                <span className="bank-bar-value">{euros(interests[position], '+')}</span>
                            </div>
                        ))}
                    </section>
                    <p className={`bank-verdict ${chosen === round.best ? 'right' : 'wrong'}`}>
                        {chosen === round.best
                            ? l({
                                eu: `Ondo aukeratuta! ${BANK_LETTERS[round.best].eu} bankua da onena: hurrengoak baino ${euros(finals[round.best] - second)} gehiago ematen ditu.`,
                                es: `¡Bien elegido! El ${bankName(round.best).es} da ${euros(finals[round.best] - second)} más que la siguiente oferta.`,
                                ar: `أحسنت الاختيار! ${bankName(round.best).ar} يعطي ${euros(finals[round.best] - second)} أكثر من العرض التالي.`
                            })
                            : l({
                                eu: `Ez: ${BANK_LETTERS[round.best].eu} bankua zen onena; zuk aukeratutakoak baino ${euros(finals[round.best] - finals[chosen])} gehiago ematen zituen.`,
                                es: `No: el mejor era el ${bankName(round.best).es}, que daba ${euros(finals[round.best] - finals[chosen])} más que el que elegiste.`,
                                ar: `لا: الأفضل كان ${bankName(round.best).ar}، ويعطي ${euros(finals[round.best] - finals[chosen])} أكثر من الذي اخترته.`
                            })}
                    </p>
                    <p className="bank-lesson"><MathText text={l(bankLesson(round))} inline /></p>
                    <button type="button" className="fraction-v2-primary bank-next" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= BANK_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                    </button>
                </>
            )}
        </div>
    )
}
