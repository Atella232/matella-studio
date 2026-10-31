import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { distanceText, isolate, num, scaleText } from './format'
import { Proportion3GameArt } from './GameArt'
import { proportion3Games } from './info'
import { createTreasureRounds, TREASURE_HALVES_MAX, TREASURE_ROUNDS, treasureStars, type TreasureRound } from './treasure'
import './Games.css'

const game = proportion3Games.find((item) => item.id === 'treasure')!

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const CORAL = 'var(--coral, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CM = 12

/** The map: a dashed path from the camp, the ruler under it and the chest at `halves` half-centimetres */
function TreasureMap({ halves, scale, showScale, chest, answer }: { halves: number; scale: number; showScale: boolean; chest: boolean; answer: number | null }) {
    const x0 = 36
    const at = (value: number) => x0 + (value / 2) * CM * 2
    return (
        <svg viewBox="0 0 360 170" direction="ltr" role="img" aria-label={`${halves / 2} cm`} style={{ display: 'block', width: '100%', maxWidth: 520, margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif' }}>
            <rect x={8} y={8} width={344} height={110} rx={10} fill="#efe3c4" stroke={INK} strokeWidth={1.8} />
            <path d="M8 40 C 80 20, 140 70, 220 38 S 330 30, 352 52" fill="none" stroke="#7fb3e0" strokeWidth={8} opacity={0.7} />
            <line x1={x0} x2={at(halves)} y1={84} y2={84} stroke={INK} strokeWidth={2.5} strokeDasharray="3 6" />
            <path d={`M${x0 - 10} 92 l10 -18 l10 18 z`} fill="#cfd9c1" stroke={INK} strokeWidth={1.2} />
            {chest && <text x={at(halves)} y={92} textAnchor="middle" fontSize={22} fontWeight={700} fill={CORAL}>✕</text>}
            {answer !== null && answer !== halves && <text x={at(answer)} y={92} textAnchor="middle" fontSize={22} fontWeight={700} fill={GREEN}>✕</text>}
            {/* The ruler, one tick per half centimetre */}
            <rect x={x0} y={126} width={TREASURE_HALVES_MAX * CM} height={18} fill="#fffcf6" stroke={INK} strokeWidth={1.2} />
            {Array.from({ length: TREASURE_HALVES_MAX + 1 }, (_, i) => (
                <g key={i}>
                    <line x1={at(i)} x2={at(i)} y1={126} y2={i % 2 === 0 ? 138 : 132} stroke={INK} strokeWidth={1} />
                    {i % 4 === 0 && <text x={at(i)} y={160} textAnchor="middle" fontSize={12} fill={MUTED}>{i / 2}</text>}
                </g>
            ))}
            <text x={at(TREASURE_HALVES_MAX) + 6} y={160} fontSize={12} fill={MUTED}>cm</text>
            {showScale && <text x={344} y={110} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>{`1 : ${String(scale).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}</text>}
        </svg>
    )
}

export function TreasureGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<TreasureRound[]>([])
    const [index, setIndex] = useState(0)
    const [halves, setHalves] = useState(4)
    const [picked, setPicked] = useState<number | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createTreasureRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setHalves(4)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const answer = (value: number) => {
        if (picked !== null) return
        setPicked(value)
        setResults([...results, value === round.answer])
    }

    const next = () => {
        if (index + 1 >= TREASURE_ROUNDS) {
            onResult(level, { stars: treasureStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setHalves(4)
        setPicked(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Proportion3GameArt game="treasure" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${TREASURE_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Mapako eskalak dio zenbat balio duen cm batek benetan.', es: 'La escala del mapa dice cuánto vale en la realidad cada cm.', en: 'The map\'s scale says how much each cm is worth in real life.', ar: 'يقول مقياس الخريطة كم يساوي كل سنتيمتر في الحقيقة.' })}</li>
                        <li>{l({ eu: 'Kontuz unitateekin: 1 m = 100 cm eta 1 km = 100 000 cm.', es: 'Cuidado con las unidades: 1 m = 100 cm y 1 km = 100 000 cm.', en: 'Careful with units: 1 m = 100 cm and 1 km = 100,000 cm.', ar: 'انتبه للوحدات: 1 م = 100 سم و1 كم = 100000 سم.' })}</li>
                        <li>{l({ eu: `${TREASURE_ROUNDS} mapa; saiakera bat bakoitzean.`, es: `${TREASURE_ROUNDS} mapas; un intento en cada uno.`, en: `${TREASURE_ROUNDS} maps; one try for each.`, ar: `${TREASURE_ROUNDS} خرائط؛ محاولة واحدة لكل خريطة.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="prop3-game">
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={treasureStars(score)}
                    title={`${score} / ${TREASURE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 asmatu · 2 izar: 5 · izar 1: 3', es: '3 estrellas: 6 aciertos · 2: 5 · 1: 3', en: '3 stars: 6 correct · 2: 5 · 1: 3', ar: '3 نجوم: 6 إجابات صحيحة · 2: 5 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${TREASURE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.answer
    const cm = (value: number) => isolate(`${num(value / 2, language)} ${language === 'ar' ? 'سم' : 'cm'}`, language)
    const place = round.mode === 'place'
    const prompt = place
        ? l({ eu: `Eskala ${scaleText(round.scale, language)}. Altxorra kanpamentutik ${distanceText(round.metres, language)}-ra dago. Jarri kutxa.`, es: `Escala ${scaleText(round.scale, language)}. El tesoro está a ${distanceText(round.metres, language)} del campamento. Coloca el cofre.`, en: `Scale ${scaleText(round.scale, language)}. The treasure is ${distanceText(round.metres, language)} from the camp. Place the chest.`, ar: `المقياس ${scaleText(round.scale, language)}. الكنز على بعد ${distanceText(round.metres, language)} من المخيم. ضع الصندوق.` })
        : round.mode === 'measure'
            ? l({ eu: `Eskala ${scaleText(round.scale, language)}. Mapan, ${cm(round.halves)}. Zenbat da benetan?`, es: `Escala ${scaleText(round.scale, language)}. En el mapa, ${cm(round.halves)}. ¿Cuánto es en la realidad?`, en: `Scale ${scaleText(round.scale, language)}. On the map, ${cm(round.halves)}. How far is it in real life?`, ar: `المقياس ${scaleText(round.scale, language)}. على الخريطة ${cm(round.halves)}. كم المسافة في الحقيقة؟` })
            : l({ eu: `Mapan ${cm(round.halves)} dira, eta benetan ${distanceText(round.metres, language)}. Zein da eskala?`, es: `En el mapa hay ${cm(round.halves)} y en la realidad ${distanceText(round.metres, language)}. ¿Qué escala es?`, en: `On the map it is ${cm(round.halves)} and in real life ${distanceText(round.metres, language)}. What is the scale?`, ar: `على الخريطة ${cm(round.halves)} وفي الحقيقة ${distanceText(round.metres, language)}. ما المقياس؟` })
    const explanation = l({
        eu: `${num(round.halves / 2, language)} · ${String(round.scale)} = ${round.halves * round.scale / 2} cm = ${distanceText(round.metres, language)}`,
        es: `${num(round.halves / 2, language)} · ${String(round.scale)} = ${round.halves * round.scale / 2} cm = ${distanceText(round.metres, language)}`,
        en: `${num(round.halves / 2, language)} · ${String(round.scale)} = ${round.halves * round.scale / 2} cm = ${distanceText(round.metres, language)}`,
        ar: `${num(round.halves / 2, language)} · ${String(round.scale)} = ${round.halves * round.scale / 2} سم = ${distanceText(round.metres, language)}`
    })
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {TREASURE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: TREASURE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">{prompt}</p>
            <TreasureMap halves={place ? halves : round.halves} scale={round.scale} showScale={round.mode !== 'scale'} chest={place || round.mode !== 'place'} answer={place && picked !== null ? round.answer : null} />
            {place && (
                <>
                    <div className="prop3-buttons" role="group" aria-label={l({ eu: 'Mugitu kutxa', es: 'Mueve el cofre', en: 'Move the chest', ar: 'حرّك الصندوق' })} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <button type="button" disabled={picked !== null || halves <= 1} onClick={() => setHalves(halves - 1)}>{isolate(`− ${num(0.5, language)}`, language)}</button>
                        <span className="prop3-sum" style={{ alignSelf: 'center' }}>{cm(halves)}</span>
                        <button type="button" disabled={picked !== null || halves >= TREASURE_HALVES_MAX} onClick={() => setHalves(halves + 1)}>{isolate(`+ ${num(0.5, language)}`, language)}</button>
                    </div>
                    {picked === null && <button type="button" className="fraction-v2-primary" onClick={() => answer(halves)}>{l({ eu: 'Hemen dago!', es: '¡Está aquí!', en: 'It\'s here!', ar: 'إنه هنا!' })}</button>}
                </>
            )}
            {!place && (
                <div className="prop3-options" role="group" aria-label={l({ eu: 'Aukerak', es: 'Opciones', en: 'Options', ar: 'الخيارات' })}>
                    {round.options.map((option) => (
                        <button key={option} type="button" disabled={picked !== null} className={picked === null ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => answer(option)}>
                            {round.mode === 'measure' ? distanceText(option, language) : scaleText(option, language)}
                        </button>
                    ))}
                </div>
            )}
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Altxorra aurkitu duzu!', es: '¡Has encontrado el tesoro!', en: 'You found the treasure!', ar: 'وجدت الكنز!' }) : l({ eu: 'Ez da hor.', es: 'No está ahí.', en: 'It isn\'t there.', ar: 'ليس هناك.' })}</strong></p>
                    <p dir="ltr">{explanation}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= TREASURE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
