import test from 'node:test'
import assert from 'node:assert/strict'
import { clipLine, clipPlane, DEFAULT_VIEW, makeCamera } from '../src/pages/batx2-zientziak-bektoreak/space/camera.ts'
import { cuboid } from '../src/pages/batx2-zientziak-bektoreak/space/scene.ts'
import { boxBetween } from '../src/pages/batx2-zientziak-bektoreak/space/sceneKit.ts'
import { angleDeg, cross, det3, dot, mixed, norm, parallel, primitive, rank, vecLatex, vecText, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'

/* The arithmetic and the camera of the 3D board shared by the Espacio block of 2.º Bachillerato Ciencias
   (Espazioko bektoreak, Zuzenak eta planoak, Angeluak eta distantziak). */

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9

test('space: cross, dot and mixed products', () => {
    assert.deepEqual(cross([1, 2, 0], [3, 1, 2]), [4, -2, -5])
    assert.deepEqual(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1])
    assert.deepEqual(cross([0, 1, 0], [1, 0, 0]), [0, 0, -1])
    assert.equal(dot([2, -1, 3], [1, 4, 2]), 4)
    assert.equal(mixed([1, 2, 0], [0, 1, 3], [2, 0, 1]), 13)
    assert.equal(det3([1, 2, 0], [0, 1, 3], [2, 0, 1]), 13)
    assert.equal(det3([2, 1, 0], [0, 2, 1], [2, 1, 3]), 12)
    assert.ok(near(angleDeg([1, 1, 0], [0, 1, 1]), 60))
    assert.ok(parallel([3, -6, 9], [-2, 4, -6]))
    assert.ok(!parallel([1, 0, 1], [0, 2, 1]))
    assert.deepEqual(primitive([4, -2, 6]), [2, -1, 3])
})

test('space: a cross product is perpendicular to both factors, and the mixed product is the determinant', () => {
    let seed = 7
    const random = () => (seed = (seed * 16807) % 2147483647) % 9 - 4
    for (let trial = 0; trial < 300; trial++) {
        const u: Vec3 = [random(), random(), random()]
        const v: Vec3 = [random(), random(), random()]
        const w: Vec3 = [random(), random(), random()]
        const n = cross(u, v)
        assert.ok(near(dot(n, u), 0) && near(dot(n, v), 0))
        assert.deepEqual(cross(v, u).map((value) => value + 0), n.map((value) => -value + 0))
        assert.ok(near(mixed(u, v, w), det3(u, v, w)) && near(mixed(u, v, w), mixed(v, w, u)) && near(mixed(u, v, w), -mixed(v, u, w)))
        assert.equal(rank([u, v, w]) === 3, det3(u, v, w) !== 0, `${u} ${v} ${w}`)
    }
})

test('space: the rank of small integer matrices', () => {
    assert.equal(rank([[1, 0, 2], [2, 0, 4], [0, 3, 1]]), 2)
    assert.equal(rank([[1, 1, 0], [2, 2, 0], [0, 0, 3], [1, 1, 3]]), 2)
    assert.equal(rank([[1, 2, -1], [2, 1, 0], [1, -1, 1]]), 2)
    assert.equal(rank([[1, 2, -1], [2, 1, 0], [1, -1, 2]]), 3)
    assert.equal(rank([[0, 0, 0], [0, 0, 0]]), 0)
    assert.equal(rank([[2, 4, 6]]), 1)
})

test('space: the textbook view puts x towards you and to the left, y to the right and z up', () => {
    const camera = makeCamera(DEFAULT_VIEW, 5, 360, 300)
    const o = camera.project([0, 0, 0])
    const x = camera.project([1, 0, 0])
    const y = camera.project([0, 1, 0])
    const z = camera.project([0, 0, 1])
    assert.ok(x.x < o.x && x.y > o.y, 'x goes left and down')
    assert.ok(y.x > o.x, 'y goes right')
    assert.ok(z.y < o.y && Math.abs(z.x - o.x) < 1e-9, 'z goes straight up')
    assert.ok(x.depth > 0, 'x comes towards the eye')
    // The axes and their names fit in the drawing whatever the turn
    for (let azimuth = 0; azimuth < 360; azimuth += 15) {
        for (const elevation of [-20, 0, 30, 60, 82]) {
            const turned = makeCamera({ azimuth, elevation }, 5, 360, 300)
            for (const tip of [[5.9, 0, 0], [-5, 0, 0], [0, 5.9, 0], [0, -5, 0], [0, 0, 5.9], [0, 0, -5]] as Vec3[]) {
                const p = turned.project(tip)
                assert.ok(p.x > 0 && p.x < 360 && p.y > 0 && p.y < 300, `${azimuth}° ${elevation}°: ${tip} at ${p.x}, ${p.y}`)
            }
        }
    }
})

test('space: lines and planes are cut by the box of the drawing', () => {
    const cut = clipLine([0, 0, 0], [1, 2, 2], 4)!
    assert.deepEqual(cut.map((point) => point.map((value) => Math.round(value * 1000) / 1000)), [[-2, -4, -4], [2, 4, 4]])
    assert.equal(clipLine([5, 5, 0], [0, 0, 1], 4), null)
    for (const [point, normal] of [[[0, 0, 0], [1, -2, -3]], [[1, 0, 1], [2, 1, 3]], [[0, 0, 2], [0, 0, 1]], [[1, 1, 1], [1, 1, 1]]] as Array<[Vec3, Vec3]>) {
        const corners = clipPlane(point, normal, 3)
        assert.ok(corners.length >= 3 && corners.length <= 6, `${corners.length} corners`)
        for (const corner of corners) {
            assert.ok(Math.abs(dot(normal, corner) - dot(normal, point)) < 1e-6, 'a corner off the plane')
            assert.ok(corner.every((value) => Math.abs(value) <= 3 + 1e-9), 'a corner outside the box')
        }
        // In order around the polygon: each turn has the same sense
        const turns = corners.map((corner, index) => {
            const next = corners[(index + 1) % corners.length]
            const after = corners[(index + 2) % corners.length]
            return dot(cross([next[0] - corner[0], next[1] - corner[1], next[2] - corner[2]], [after[0] - next[0], after[1] - next[1], after[2] - next[2]]), normal)
        })
        assert.ok(turns.every((turn) => turn > 1e-9) || turns.every((turn) => turn < -1e-9), 'corners out of order')
    }
    assert.deepEqual(clipPlane([0, 0, 9], [0, 0, 1], 3), [])
})

test('space: boxes and the way coordinates are written', () => {
    assert.equal(cuboid([3, -2, 4]).length, 12)
    const edges = boxBetween([1, -2, 0], [3, 1, 6])
    assert.equal(edges.length, 12)
    const lengths = edges.map((edge) => (edge.kind === 'segment' ? norm([edge.to[0] - edge.from[0], edge.to[1] - edge.from[1], edge.to[2] - edge.from[2]]) : 0)).sort((a, b) => a - b)
    assert.deepEqual(lengths, [2, 2, 2, 2, 3, 3, 3, 3, 6, 6, 6, 6])
    assert.equal(vecLatex([2, -1, 0]), '(2,-1,0)')
    assert.equal(vecText([2, -1, -0]), '(2, −1, 0)')
})
