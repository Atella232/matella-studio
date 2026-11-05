import test from 'node:test'
import assert from 'node:assert/strict'
import { courses } from '../src/data/courses.ts'

/* Bachillerato is split like 4. DBH: Ciencias (Matemáticas I/II) and Ciencias Sociales (Matemáticas Aplicadas a las
   CCSS I/II), one topic per textbook chapter. The old ids batx1 and batx2 are gone: their address falls back to the
   course list. */
const modalities = { 'batx1-zientziak': 17, 'batx1-gizarte': 11, 'batx2-zientziak': 14, 'batx2-gizarte': 13 }

test('batxilergoa: four modalities with their topics, named in the four languages', () => {
    const ids = courses.map((course) => course.id)
    assert.ok(!ids.includes('batx1') && !ids.includes('batx2'))
    for (const [id, count] of Object.entries(modalities)) {
        const course = courses.find((item) => item.id === id)
        assert.ok(course, `${id} is missing`)
        assert.equal(course.topics.length, count, `${id}: ${course.topics.length} topics`)
        assert.equal(new Set(course.topics.map((topic) => topic.id)).size, count, `${id}: repeated topic id`)
        for (const item of [course, ...course.topics]) {
            for (const name of [item.name, item.nameEu, item.nameAr, item.nameEn]) assert.ok(name.trim(), `${id} › ${item.id}: empty name`)
            assert.match(item.nameAr, /[؀-ۿ]/, `${id} › ${item.id}: the Arabic name has no Arabic letters`)
        }
        for (const text of [course.description, course.descriptionEu, course.descriptionAr, course.descriptionEn]) assert.ok(text.trim())
    }
    assert.equal(ids.indexOf('batx1-zientziak') + 1, ids.indexOf('batx1-gizarte'))
    assert.equal(ids.indexOf('batx2-zientziak') + 1, ids.indexOf('batx2-gizarte'))
})
