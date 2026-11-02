import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { lineLatex, numberLatex, signed } from '../functions'
import { Plane, PlaneLine, PlanePoint } from '../plane'
import { createFunctionsDetectiveCases, FUNCTIONS_DETECTIVE_CASES, functionsDetectiveNames, functionsDetectiveTips } from './detective'
import { FunctionsGameArt } from './GameArt'
import { functionsGames, type FunctionsGameId } from './info'
import { createLaserRounds, LASER_BOX, LASER_ROUNDS, laserRight, laserStars, targetsHit, type LaserRound } from './laser'
import '../Functions.css'
import './OwnGames.css'

/* ==========================================================================
   The games of Funtzioak 2. DBH that belong to this topic, besides plot
   the point: the laser (in the shared RoundGame) and the functions
   detective (the shared worked-solution detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: FunctionsGameId) => functionsGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const GREEN = 'var(--success, #267b53)'
const SECOND = 'var(--second, #c4432a)'

/* ---------- The laser ---------- */

/** A slope in a readout: halves as 1/2 */
const slopeText = (value: number) => (Number.isInteger(value) ? signed(value) : `${value < 0 ? '−' : ''}${Math.abs(value * 2)}/2`)

function LaserPlay({ round, language, onAnswer, answered }: RoundProps<LaserRound>) {
    const l = useGameText(language)
    // y = 0 is never a round's laser: the steppers never start on an answer
    const [m, setM] = useState(0)
    const [n, setN] = useState(0)
    const right = laserRight(round, m, n)
    const hit = answered ? targetsHit(round, m, n) : []
    const isHit = (point: readonly [number, number]) => hit.some(([x, y]) => x === point[0] && y === point[1])
    return (
        <>
            <p className="prop3-prompt">
                {round.targets.length === 1
                    ? l(say('Jatorritik pasatzen den laserrak jo behar du jomuga.', 'El láser pasa por el origen y tiene que dar en la diana.', 'الليزر يمر بالأصل ويجب أن يصيب الهدف.', 'The laser goes through the origin and has to hit the target.'))
                    : l(say('Laser bakar batek jo behar ditu jomuga guztiak.', 'Un solo láser tiene que dar en todas las dianas.', 'يجب أن يصيب ليزر واحد كل الأهداف.', 'One single laser has to hit every target.'))}
            </p>
            <div className="func2-plane">
                <Plane box={LASER_BOX} cell={22} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))}>
                    {(map, clip) => (
                        <g>
                            {answered && <PlaneLine map={map} m={m} n={n} color={right ? GREEN : SECOND} clip={clip} />}
                            {answered && !right && <PlaneLine map={map} m={round.m} n={round.n} color={GREEN} dashed width={2.5} clip={clip} />}
                            {round.targets.map((point) => (
                                <g key={`${point[0]}-${point[1]}`}>
                                    <circle cx={map.x(point[0])} cy={map.y(point[1])} r="11" fill="none" stroke={isHit(point) ? GREEN : SECOND} strokeWidth="2.5" />
                                    <PlanePoint map={map} point={point} color={isHit(point) ? GREEN : SECOND} radius={5} />
                                </g>
                            ))}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="func2-readout" dir="ltr">{formula(lineLatex(m, round.fixedN ? 0 : n), language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers">
                        <Stepper label={l(say('Malda (m)', 'Pendiente (m)', 'الميل (m)', 'Slope (m)'))} value={m} min={-4} max={4} step={round.step} format={slopeText} onChange={setM} language={language} />
                        {!round.fixedN && <Stepper label={l(say('Ordenatua (n)', 'Ordenada (n)', 'الجزء المقطوع (n)', 'Intercept (n)'))} value={n} min={-6} max={6} format={signed} onChange={setN} language={language} />}
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Jaurti', 'Disparar', 'أطلق', 'Fire'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(lineLatex(round.m, round.n), language)}{' '}
                    {round.targets.length === 1
                        ? formula(`m=\\frac{${round.targets[0][1]}}{${round.targets[0][0]}}=${numberLatex(round.m)}`, language)
                        : formula(`m=\\frac{${round.targets[1][1]}-${round.targets[0][1] < 0 ? `(${round.targets[0][1]})` : round.targets[0][1]}}{${round.targets[1][0]}-${round.targets[0][0] < 0 ? `(${round.targets[0][0]})` : round.targets[0][0]}}=${numberLatex(round.m)}`, language)}
                    {!right && ` ${l(say('Jo gabeko jomugak gorriz.', 'Las dianas sin tocar, en rojo.', 'الأهداف غير المصابة بالأحمر.', 'Missed targets in red.'))}`}
                </RoundVerdict>
            )}
        </>
    )
}

const laserConfig: RoundGameConfig<LaserRound> = {
    game: info('laser'),
    art: <FunctionsGameArt game="laser" />,
    rounds: LASER_ROUNDS,
    rules: [
        say('Laserra $y=mx+n$ zuzena da. Irakurri jomugetan malda eta ordenatua.', 'El láser es la recta $y=mx+n$. Lee en las dianas la pendiente y la ordenada.', 'الليزر هو المستقيم $y=mx+n$. اقرأ من الأهداف الميل والجزء المقطوع.', 'The laser is the line $y=mx+n$. Read the slope and the intercept from the targets.'),
        say('Jarri m eta n, eta jaurti: orduan bakarrik ikusiko duzu laserra.', 'Pon m y n, y dispara: solo entonces verás el láser.', 'ضع m وn ثم أطلق: عندها فقط سترى الليزر.', 'Set m and n, then fire: only then will you see the laser.'),
        say(`${LASER_ROUNDS} jaurtiketa maila bakoitzean; saiakera bat bakoitzeko.`, `${LASER_ROUNDS} disparos por nivel; un intento en cada uno.`, `${LASER_ROUNDS} طلقات في كل مستوى؛ محاولة واحدة لكل طلقة.`, `${LASER_ROUNDS} shots per level; one try each.`)
    ],
    create: createLaserRounds,
    stars: laserStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: LaserPlay
}

export const LaserGame = (props: GameProps) => <RoundGame {...props} config={laserConfig} />

/* ---------- The functions detective ---------- */

export const FunctionsDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <FunctionsGameArt game="detective" />, cases: FUNCTIONS_DETECTIVE_CASES, createCases: createFunctionsDetectiveCases, names: functionsDetectiveNames, tips: functionsDetectiveTips }}
    />
)
