import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { localize, say } from '../dbh4-akademikoak-trigonometria/text'
import { standardStars } from './equations'
import { CIRCLE_ROUNDS, CIRCLE_STEP, circleQuestionLatex, createCircleRounds, createRatiosRounds, fractionLatex, givenLatex, radiansLatex, RATIOS_ROUNDS, ratioFraction, ratioName, ratioValue, signsLatex, valueLatex, type CircleRound, type RatiosRound } from './trigonometry'
import './Dbh4Games.css'

/* ==========================================================================
   The unit circle and The other ratios (4. DBH academic trigonometry):
   the angle or the ratios are chosen first; then the projections or the
   triangle in the circle show them. Formulas are written with \sen and \tg
   and `localize` turns them into each language's names.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f5fb3)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const CORAL = 'var(--coral, #d9502e)'
const CENTRE = [160, 128] as const
const RADIUS = 96
const at = (degrees: number, length = RADIUS) => [CENTRE[0] + length * Math.cos((degrees * Math.PI) / 180), CENTRE[1] - length * Math.sin((degrees * Math.PI) / 180)] as const
/** Plain text of an angle: 150° or 5π/6 */
const angleText = (degrees: number, radians: boolean) => (radians ? radiansLatex(degrees).replace(/\\frac\{([^}]*)\}\{([^}]*)\}/, '$1/$2').replace(/\\pi/g, 'π') : `${degrees}°`)
const sineName = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')

function CircleFrame({ language, children }: { language: UnitLanguage; children: ReactNode }) {
    return (
        <svg className="dbh4-scene" viewBox="0 0 320 256" direction="ltr" aria-hidden="true">
            <line x1="40" y1={CENTRE[1]} x2="292" y2={CENTRE[1]} stroke={MUTED} strokeWidth="1.5" />
            <line x1={CENTRE[0]} y1="16" x2={CENTRE[0]} y2="242" stroke={MUTED} strokeWidth="1.5" />
            <circle cx={CENTRE[0]} cy={CENTRE[1]} r={RADIUS} fill="none" stroke={INK} strokeWidth="2.2" />
            {Array.from({ length: 24 }, (_, index) => index * 15).map((degrees) => {
                const [x1, y1] = at(degrees, RADIUS - (degrees % 45 === 0 || degrees % 30 === 0 ? 6 : 3))
                const [x2, y2] = at(degrees, RADIUS + (degrees % 45 === 0 || degrees % 30 === 0 ? 6 : 3))
                return <line key={degrees} x1={x1} y1={y1} x2={x2} y2={y2} stroke={MUTED} strokeWidth="1.2" />
            })}
            <text x="300" y={CENTRE[1] - 6} textAnchor="end" fontSize="13" fontWeight="700" fill={MUTED}>cos</text>
            <text x={CENTRE[0] + 6} y="14" fontSize="13" fontWeight="700" fill={MUTED}>{sineName(language)}</text>
            <text x={CENTRE[0] + RADIUS + 4} y={CENTRE[1] + 16} fontSize="12" fill={MUTED}>1</text>
            <text x={CENTRE[0] - 4} y={CENTRE[1] - RADIUS - 6} textAnchor="end" fontSize="12" fill={MUTED}>1</text>
            {children}
        </svg>
    )
}

/** The arc of α from 0° */
function AngleArc({ degrees, colour }: { degrees: number; colour: string }) {
    if (degrees === 0) return null
    const radius = 26
    const [x, y] = at(degrees, radius)
    return <path d={`M ${CENTRE[0] + radius} ${CENTRE[1]} A ${radius} ${radius} 0 ${degrees > 180 ? 1 : 0} 0 ${x} ${y}`} fill="none" stroke={colour} strokeWidth="2.4" />
}

/* ---------- The unit circle ---------- */

function CirclePlay({ round, language, onAnswer, answered }: RoundProps<CircleRound>) {
    const l = useGameText(language)
    const [angle, setAngle] = useState(0)
    const right = angle === round.angle
    const [px, py] = at(angle)
    const [tx, ty] = at(round.angle)
    const sen = ratioValue('sen', round.angle)!
    const cos = ratioValue('cos', round.angle)!
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Biratu erradioa α angeluraino:', 'Gira el radio hasta el ángulo α:', 'أدِر نصف القطر حتى الزاوية α:', 'Turn the radius to the angle α:'))}
                <strong className="dbh4-big-formula">{formula(circleQuestionLatex(round), language)}</strong>
                {round.firstQuadrant && <span className="dbh4-subprompt">{formula('0^{\\circ}\\le\\alpha\\le 90^{\\circ}', language)}</span>}
            </p>
            <CircleFrame language={language}>
                <AngleArc degrees={angle} colour={answered ? (right ? GREEN : RED) : BLUE} />
                {answered && (
                    <g>
                        <line x1={tx} y1={ty} x2={tx} y2={CENTRE[1]} stroke={GREEN} strokeWidth="2" strokeDasharray="5 4" />
                        <line x1={tx} y1={ty} x2={CENTRE[0]} y2={ty} stroke={CORAL} strokeWidth="2" strokeDasharray="5 4" />
                        <line x1={CENTRE[0]} y1={CENTRE[1]} x2={tx} y2={CENTRE[1]} stroke={CORAL} strokeWidth="5" strokeLinecap="round" />
                        <line x1={CENTRE[0]} y1={CENTRE[1]} x2={CENTRE[0]} y2={ty} stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
                        <line x1={CENTRE[0]} y1={CENTRE[1]} x2={tx} y2={ty} stroke={GREEN} strokeWidth="3" />
                        <circle cx={tx} cy={ty} r="6" fill={GREEN} />
                    </g>
                )}
                <line x1={CENTRE[0]} y1={CENTRE[1]} x2={px} y2={py} stroke={answered ? (right ? GREEN : RED) : BLUE} strokeWidth="3.2" />
                <circle cx={px} cy={py} r="7" fill={answered ? (right ? GREEN : RED) : BLUE} stroke={INK} strokeWidth="1.5" />
                <text x="18" y="246" fontSize="16" fontWeight="700" fill={BLUE}>{`α = ${angleText(angle, round.radians)}`}</text>
            </CircleFrame>
            {!answered && (
                <>
                    <div className="func2-steppers">
                        <Stepper label="α" value={angle} min={0} max={360 - CIRCLE_STEP} step={CIRCLE_STEP} format={(value) => angleText(value, round.radians)} onChange={setAngle} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\alpha=${round.angle}^{\\circ}${round.radians ? `=${radiansLatex(round.angle)}\\ \\text{rad}` : ''}`, language)}</span>
                    <span className="dbh4-worked">{formula(`\\sen\\alpha=${valueLatex(sen)},\\ \\ \\cos\\alpha=${valueLatex(cos)}`, language)}</span>
                    {l(say('Kosinua: x ardatzeko proiekzioa; sinua: y ardatzekoa.', 'El coseno es la proyección sobre el eje x; el seno, sobre el eje y.', 'جيب التمام هو المسقط على المحور x، والجيب على المحور y.', 'The cosine is the projection on the x-axis; the sine, on the y-axis.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function UnitCircleGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CIRCLE_ROUNDS,
                rules: [
                    say('Zirkunferentzia goniometrikoan, $\\cos\\alpha$ puntuaren x da eta $\\sen\\alpha$ haren y.', 'En la circunferencia goniométrica, $\\cos\\alpha$ es la x del punto y $\\sen\\alpha$, su y.', 'في الدائرة المثلثية $\\cos\\alpha$ هو x للنقطة و$\\sen\\alpha$ هو y لها.', 'On the unit circle, $\\cos\\alpha$ is the x of the point and $\\sen\\alpha$ its y.'),
                    say('Zeinuek koadrantea esaten dute: ezkerrean kosinua negatiboa da; behean, sinua.', 'Los signos dicen el cuadrante: a la izquierda el coseno es negativo; abajo, el seno.', 'الإشارات تحدد الربع: يسارًا جيب التمام سالب، وأسفلًا الجيب سالب.', 'The signs tell the quadrant: on the left the cosine is negative; below, the sine.'),
                    say('Biratu 15°-ka eta egiaztatu: orduan agertuko dira proiekzioak.', 'Gira de 15° en 15° y comprueba: entonces aparecen las proyecciones.', 'أدِر بخطوات 15° وتحقّق: عندها تظهر المساقط.', 'Turn in steps of 15° and check: then the projections appear.')
                ],
                create: createCircleRounds,
                stars: standardStars(CIRCLE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: CirclePlay
            }}
        />
    )
}

/* ---------- The other ratios ---------- */

const QUADRANT_WORDS: Record<1 | 2 | 3 | 4, LocalizedText> = {
    1: say('lehen koadrantean', 'en el primer cuadrante', 'في الربع الأول', 'in the first quadrant'),
    2: say('bigarren koadrantean', 'en el segundo cuadrante', 'في الربع الثاني', 'in the second quadrant'),
    3: say('hirugarren koadrantean', 'en el tercer cuadrante', 'في الربع الثالث', 'in the third quadrant'),
    4: say('laugarren koadrantean', 'en el cuarto cuadrante', 'في الربع الرابع', 'in the fourth quadrant')
}

function RatiosPlay({ round, language, onAnswer, answered }: RoundProps<RatiosRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<Array<number | null>>(round.asked.map(() => null))
    const right = round.asked.every((asked, index) => chosen[index] === asked.right)
    const [p, q, r] = round.triple
    const sen = ratioFraction('sen', round.triple, round.quadrant)
    const cos = ratioFraction('cos', round.triple, round.quadrant)
    // The triangle in the circle: hypotenuse = radius
    const corner = [CENTRE[0] + (cos[0] / r) * RADIUS, CENTRE[1]] as const
    const top = [corner[0], CENTRE[1] - (sen[0] / r) * RADIUS] as const
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(round.signs
                    ? say(`$${givenLatex(round)}$ eta $${signsLatex(round)}$. Aukeratu beste bi arrazoiak.`, `$${givenLatex(round)}$ y $${signsLatex(round)}$. Elige las otras dos razones.`, `$${givenLatex(round)}$ و$${signsLatex(round)}$. اختر النسبتين الأخريين.`, `$${givenLatex(round)}$ and $${signsLatex(round)}$. Choose the other two ratios.`)
                    : say(`$${givenLatex(round)}$, α ${QUADRANT_WORDS[round.quadrant].eu}. Aukeratu beste bi arrazoiak.`, `$${givenLatex(round)}$, con α ${QUADRANT_WORDS[round.quadrant].es}. Elige las otras dos razones.`, `$${givenLatex(round)}$ وα ${QUADRANT_WORDS[round.quadrant].ar}. اختر النسبتين الأخريين.`, `$${givenLatex(round)}$, with α ${QUADRANT_WORDS[round.quadrant].en}. Choose the other two ratios.`))} inline />
            </p>
            {answered && (
                <CircleFrame language={language}>
                    <polygon points={`${CENTRE[0]},${CENTRE[1]} ${corner[0]},${corner[1]} ${top[0]},${top[1]}`} fill="var(--success-tint, #d9efe2)" stroke={GREEN} strokeWidth="2.6" strokeLinejoin="round" />
                    <circle cx={top[0]} cy={top[1]} r="6" fill={GREEN} />
                    <text x={(CENTRE[0] + corner[0]) / 2} y={CENTRE[1] + (sen[0] > 0 ? 18 : -8)} textAnchor="middle" fontSize="15" fontWeight="700" fill={CORAL}>{`${cos[0] < 0 ? '−' : ''}${q}`}</text>
                    <text x={corner[0] + (cos[0] > 0 ? 8 : -8)} y={(CENTRE[1] + top[1]) / 2 + 5} textAnchor={cos[0] > 0 ? 'start' : 'end'} fontSize="15" fontWeight="700" fill={GREEN}>{`${sen[0] < 0 ? '−' : ''}${p}`}</text>
                    <text x={(CENTRE[0] + top[0]) / 2 + (cos[0] > 0 ? -8 : 8)} y={(CENTRE[1] + top[1]) / 2 - 6} textAnchor={cos[0] > 0 ? 'end' : 'start'} fontSize="15" fontWeight="700" fill={INK}>{r}</text>
                </CircleFrame>
            )}
            {round.asked.map((asked, index) => (
                <div key={asked.ratio} className="dbh4-ratio-row">
                    <span className="dbh4-ratio-name">{formula(`${ratioName(asked.ratio)}\\alpha=`, language)}</span>
                    <div className="dbh4-candidates">
                        {asked.options.map((option, position) => (
                            <button
                                key={position}
                                type="button"
                                disabled={answered}
                                aria-pressed={chosen[index] === position}
                                className={answered ? (position === asked.right ? 'found' : chosen[index] === position ? 'missed' : '') : chosen[index] === position ? 'chosen' : ''}
                                onClick={() => setChosen((previous) => previous.map((value, place) => (place === index ? position : value)))}
                            >
                                {formula(fractionLatex(option), language)}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen.some((value) => value === null)} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\sen\\alpha=${fractionLatex(sen)},\\ \\cos\\alpha=${fractionLatex(cos)},\\ \\tg\\alpha=${fractionLatex(ratioFraction('tg', round.triple, round.quadrant))}`, language)}</span>
                    {l(say(`Triangeluaren aldeak: ${p}, ${q} eta ${r}; zeinuak koadranteak ematen ditu.`, `Los lados del triángulo: ${p}, ${q} y ${r}; los signos los da el cuadrante.`, `أضلاع المثلث: ${p} و${q} و${r}، والإشارات يحددها الربع.`, `The sides of the triangle: ${p}, ${q} and ${r}; the quadrant gives the signs.`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function OtherRatiosGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RATIOS_ROUNDS,
                rules: [
                    say('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ eta $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ y $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ و$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ and $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.'),
                    say('Koadranteak ematen ditu zeinuak: I. guztiak +; II. sinua +; III. tangentea +; IV. kosinua +.', 'El cuadrante da los signos: I, todas +; II, el seno +; III, la tangente +; IV, el coseno +.', 'الربع يعطي الإشارات: الأول كلها +، الثاني الجيب +، الثالث الظل +، الرابع جيب التمام +.', 'The quadrant gives the signs: I, all +; II, sine +; III, tangent +; IV, cosine +.'),
                    say('Aukeratu bi arrazoiak eta egiaztatu: triangelua zirkuluan marraztuko da.', 'Elige las dos razones y comprueba: el triángulo se dibujará en la circunferencia.', 'اختر النسبتين وتحقّق: سيُرسم المثلث في الدائرة.', 'Choose both ratios and check: the triangle is drawn in the circle.')
                ],
                create: createRatiosRounds,
                stars: standardStars(RATIOS_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: RatiosPlay
            }}
        />
    )
}

/** The art of the trigonometry games */
export function TrigArt({ game }: { game: 'circle' | 'ratios' }) {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="40" y1="64" x2="180" y2="64" stroke="var(--muted)" strokeWidth="2" />
            <line x1="110" y1="6" x2="110" y2="118" stroke="var(--muted)" strokeWidth="2" />
            <circle cx="110" cy="64" r="50" fill="none" stroke="var(--ink)" strokeWidth="3" />
            {game === 'circle'
                ? <g><line x1="110" y1="64" x2="67" y2="39" stroke={BLUE} strokeWidth="4" /><circle cx="67" cy="39" r="6" fill={BLUE} /><path d="M 130 64 A 20 20 0 0 0 93 54" fill="none" stroke={BLUE} strokeWidth="3" /></g>
                : <g><polygon points="110,64 70,64 70,34" fill="var(--success-tint, #d9efe2)" stroke={GREEN} strokeWidth="3" /><text x="90" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill={CORAL} direction="ltr">−4</text><text x="62" y="54" textAnchor="end" fontSize="13" fontWeight="700" fill={GREEN}>3</text></g>}
        </svg>
    )
}
