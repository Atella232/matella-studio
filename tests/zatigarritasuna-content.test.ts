import test from 'node:test'
import assert from 'node:assert/strict'
import { notation } from '../src/pages/dbh2-zatigarritasuna/notation.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import { pickMaybeText } from '../src/features/unit-v2/types.ts'

test('zatigarritasuna: notation follows each textbook', () => {
    const formula = notation('$@GCD(12,18)=6\\quad @LCM(4,6)=12\\quad @DIV(8)$')
    assert.equal(formula.eu, '$\\mathrm{ZKH}(12,18)=6\\quad \\mathrm{MKT}(4,6)=12\\quad \\mathrm{Zat}(8)$')
    assert.equal(formula.es, '$\\text{m.c.d.}(12,18)=6\\quad \\text{m.c.m.}(4,6)=12\\quad \\mathrm{Div}(8)$')
    assert.equal(formula.ar, formula.eu)
    assert.equal(pickMaybeText('es', formula), formula.es)
    assert.equal(pickMaybeText('eu', '$1$'), '$1$')
})

test('zatigarritasuna: the unit is rendered by the V2 engine', () => {
    assert.ok(isUnitV2Path('/matematika/dbh2/divisibilidad'))
    assert.ok(isUnitV2Path('/matematika/dbh2/divisibilidad/teoria'))
    assert.ok(!isUnitV2Path('/matematika/dbh1/divisibilidad'))
})
