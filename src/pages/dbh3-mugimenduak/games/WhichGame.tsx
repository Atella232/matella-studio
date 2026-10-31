import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import type { Point } from '../motion'
import { Motions3GameArt } from './GameArt'
import { motions3Games } from './info'
import { createWhichRounds, WHICH_ROUNDS, whichKinds, whichStars, type MovementKind, type WhichRound } from './which'
import './Games.css'

const game = motions3Games.find((item) => item.id === 'which')!

const NAMES: Record<MovementKind, { eu: string; es: string; en: string; ar: string }> = {
    translation: { eu: 'Lekualdaketa', es: 'Traslación', en: 'Translation', ar: 'انسحاب' },
    rotation: { eu: 'Biraketa', es: 'Giro', en: 'Rotation', ar: 'دوران' },
    reflection: { eu: 'Simetria axiala', es: 'Simetría axial', en: 'Reflection', ar: 'تناظر محوري' },
    homothety: { eu: 'Homotezia', es: 'Homotecia', en: 'Enlargement', ar: 'تحاكٍ' }
}

const WHY: Record<MovementKind, { eu: string; es: string; en: string; ar: string }> = {
    translation: { eu: 'Bandera ez da biratu ezta irauli: lekualdaketa bat da.', es: 'La bandera no ha girado ni se ha dado la vuelta: es una traslación.', en: 'The flag has neither turned nor flipped: it is a translation.', ar: 'لم يدر العلم ولم ينقلب: إنه انسحاب.' },
    rotation: { eu: 'Bandera biratuta dago, baina ez iraulita: biraketa bat da.', es: 'La bandera está girada, pero no dada la vuelta: es un giro.', en: 'The flag is turned but not flipped: it is a rotation.', ar: 'العلم مُدار لكنه غير مقلوب: إنه دوران.' },
    reflection: { eu: 'Bandera iraulita dago, ispiluan bezala: simetria axiala da.', es: 'La bandera está dada la vuelta, como en un espejo: es una simetría axial.', en: 'The flag is flipped, as in a mirror: it is a reflection.', ar: 'العلم مقلوب كما في المرآة: إنه تناظر محوري.' },
    homothety: { eu: 'Banderaren tamaina aldatu da: homotezia bat da.', es: 'La bandera ha cambiado de tamaño: es una homotecia.', en: 'The flag has changed size: it is an enlargement.', ar: 'تغيّر حجم العلم: إنه تحاكٍ.' }
}

const UNIT = 18
const X = (x: number) => 160 + x * UNIT
const Y = (y: number) => 140 - y * UNIT

function Flag({ points, colour, tint }: { points: Point[]; colour: string; tint: string }) {
    const [base, top, end, low] = points
    return (
        <g>
            <line x1={X(base[0])} y1={Y(base[1])} x2={X(top[0])} y2={Y(top[1])} stroke={colour} strokeWidth={3} strokeLinecap="round" />
            <polygon points={[top, end, low].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={tint} stroke={colour} strokeWidth={2.2} strokeLinejoin="round" />
        </g>
    )
}

export function WhichGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<WhichRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<MovementKind | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createWhichRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (kind: MovementKind) => {
        if (picked !== null) return
        setPicked(kind)
        setResults([...results, kind === round.kind])
    }

    const next = () => {
        if (index + 1 >= WHICH_ROUNDS) {
            onResult(level, { stars: whichStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPicked(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Motions3GameArt game="which" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${WHICH_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Bandera urdina eta haren irudia gorria: zer mugimendu da?', es: 'La bandera azul y su imagen roja: ¿qué movimiento es?', en: 'The blue flag and its red image: which movement is it?', ar: 'العلم الأزرق وصورته الحمراء: أي حركة هذه؟' })}</li>
                        <li>{l({ eu: 'Begiratu ea biratuta, iraulita edo handituta dagoen.', es: 'Mira si está girada, dada la vuelta o ampliada.', en: 'Look whether it is turned, flipped or resized.', ar: 'انظر هل هو مُدار أم مقلوب أم مكبَّر.' })}</li>
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
                    stars={whichStars(score)}
                    title={`${score} / ${WHICH_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${WHICH_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.kind
    const kinds = whichKinds(level)
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {WHICH_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: WHICH_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <svg className="mugimenduak-which-board" viewBox="0 0 320 280" direction="ltr" aria-hidden="true">
                {Array.from({ length: 17 }, (_, i) => i - 8).map((value) => (
                    <g key={value}>
                        <line x1={X(value)} x2={X(value)} y1={Y(7)} y2={Y(-7)} stroke={value === 0 ? 'var(--muted)' : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />
                        {Math.abs(value) <= 7 && <line y1={Y(value)} y2={Y(value)} x1={X(-8)} x2={X(8)} stroke={value === 0 ? 'var(--muted)' : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />}
                    </g>
                ))}
                <Flag points={round.flag} colour="var(--blue, #2f6fdb)" tint="var(--blue-tint, #dde7f7)" />
                <Flag points={round.image} colour="var(--coral, #c4432a)" tint="var(--coral-tint, #f6d5cc)" />
            </svg>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Mugimenduak', es: 'Movimientos', en: 'Movements', ar: 'الحركات' })} style={{ gridTemplateColumns: kinds.length === 3 ? 'repeat(3, 1fr)' : '1fr 1fr' }}>
                {kinds.map((kind) => (
                    <button key={kind} type="button" disabled={picked !== null} className={picked === null ? '' : kind === round.kind ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>{l(NAMES[kind])}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> {l(WHY[round.kind])}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= WHICH_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
