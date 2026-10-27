import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import {
    graphAnswered,
    graphMeeting,
    initialRoadGraphState,
    positionsAt,
    roadGraphChallenges,
    roadGraphExtra,
    setRoadGraph,
    type RoadGraphState
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/roadGraph.ts'

const make = (patch: Partial<Omit<RoadGraphState, 'answer' | 'checked' | 'revealed'>>, answer = ''): RoadGraphState => ({ ...initialRoadGraphState, ...patch, answer, checked: answer !== '', revealed: false })

test('proportzionaltasuna 4. DBH ap graph: meetings with and without a late start', () => {
    // The lesson: 240 km at 70 and 110 km/h, together: 80 minutes, 93,3… km from A
    assert.deepEqual(graphMeeting(make({ mode: 'meet', distance: 240, speeds: [70, 110], late: 'none' })), { minutes: fraction(80), km: fraction(280, 3) })
    // The truck leaves first at 80; the car, an hour later at 120: 3 hours after the truck, 240 km away
    assert.deepEqual(graphMeeting(make({ mode: 'chase', distance: 0, speeds: [120, 80], late: 'A', delay: 60 })), { minutes: fraction(180), km: fraction(240) })
    // The car and the motorbike: 300 km, the bike half an hour later
    assert.deepEqual(graphMeeting(make({ mode: 'meet', distance: 300, speeds: [90, 60], late: 'B', delay: 30 }))?.minutes, fraction(132))
    // While B waits, A can reach B's town first
    assert.deepEqual(graphMeeting(make({ mode: 'meet', distance: 60, speeds: [120, 60], late: 'B', delay: 60 }))?.minutes, fraction(30))
    // Same place, same time, nobody faster: they never meet again; a slower follower never catches up
    assert.equal(graphMeeting(make({ mode: 'chase', distance: 0, speeds: [80, 80], late: 'none' })), null)
    assert.equal(graphMeeting(make({ mode: 'chase', distance: 60, speeds: [60, 90], late: 'none' })), null)
    // Positions: the late one stays put
    assert.deepEqual(positionsAt(make({ mode: 'meet', distance: 300, speeds: [90, 60], late: 'B', delay: 30 }), fraction(30)), [fraction(45), fraction(300)])
})

test('proportzionaltasuna 4. DBH ap graph: settings, answers and challenges', () => {
    // Meeting needs some distance; a new case clears the answer
    assert.equal(setRoadGraph(make({ mode: 'chase', distance: 0 }), { mode: 'meet' }).distance, 30)
    const answered = { ...initialRoadGraphState, answer: '114', checked: true }
    assert.ok(graphAnswered(answered))
    assert.equal(setRoadGraph(answered, { delay: 45 }).answer, '')
    assert.equal(setRoadGraph(answered, { speed: [0, 63] }).speeds[0], 60)
    const states = [
        make({ mode: 'chase', distance: 0, speeds: [120, 80], late: 'A', delay: 60 }, '180'),
        make({ mode: 'meet', distance: 300, speeds: [90, 60], late: 'B', delay: 30 }, '132'),
        make({ mode: 'meet', distance: 240, speeds: [70, 110], late: 'none' }, '80'),
        make({ mode: 'meet', distance: 120, speeds: [60, 30], late: 'A', delay: 60 })
    ]
    states.forEach((state, index) => assert.ok(roadGraphChallenges[index].isSolved(state), String(roadGraphChallenges[index].id)))
    assert.ok(!roadGraphChallenges[0].isSolved({ ...states[0], answer: '120' }))
    for (const challenge of roadGraphChallenges) assert.ok(!challenge.isSolved(initialRoadGraphState), String(challenge.id))
})

test('proportzionaltasuna 4. DBH ap graph: endless challenges and texts', () => {
    const prompts = new Set<string>()
    const texts = roadGraphChallenges.flatMap((challenge) => [challenge.prompt, challenge.hint])
    for (let seed = 1; seed <= 400; seed += 1) {
        const challenge = roadGraphExtra(createRandom(seed * 7919))
        assert.ok(challenge.isSolved(challenge.solution), challenge.prompt.es)
        assert.ok(!challenge.isSolved(initialRoadGraphState), `${seed} starts solved`)
        assert.ok(!challenge.isSolved({ ...challenge.solution, answer: '' }), `${seed} without an answer`)
        prompts.add(challenge.prompt.es)
        texts.push(challenge.prompt, challenge.hint)
    }
    assert.ok(prompts.size > 150, String(prompts.size))
    for (const text of texts) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            const line = text[language]
            assert.equal(line.split('$').length % 2, 1, line)
            for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true })
                assert.ok(!/[؀-ۿ]/.test(formula), formula)
            }
            if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k)\b/.test(line), line)
            if (language === 'ar') assert.ok(!/\d,\d/.test(line) && !line.includes('{,}'), line)
        }
    }
})
