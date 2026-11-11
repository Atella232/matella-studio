import test from 'node:test'
import assert from 'node:assert/strict'
import { formulasIn, markFormulas } from '../src/pages/dbh2-funtzioak-v2/rtlFormulas.ts'

const RLM = '\u200F'
const LRE = '\u202A'
const PDF = '\u202C'
const wrapped = (formula: string) => `${RLM}${LRE}${formula}${PDF}${RLM}`

test('rtl formulas: texts without Arabic come back untouched (eu, es and en do not change)', () => {
    for (const text of [
        'Y ardatzarekin: x = 0',
        'Con el eje Y: x = 0',
        'On the y-axis: x = 0',
        '½ · 2 = 1: el valor no cambia',
        'Disko bakoitzaren bolumena: π r² dx',
        'x = 0 → y = 0: pasa por el origen',
        '\u2066x = 0\u2069'
    ]) {
        assert.equal(markFormulas(text), text)
        assert.deepEqual(formulasIn(text), [])
    }
})

test('rtl formulas: each formula is embedded left to right and fenced by RLM', () => {
    assert.equal(markFormulas('مقارب عند x = 0 داخل الفترة'), `مقارب عند ${wrapped('x = 0')} داخل الفترة`)
    assert.equal(markFormulas('قيمة عظمى: x = −2'), `قيمة عظمى: ${wrapped('x = −2')}`)
    assert.equal(markFormulas('حجم كل قرص: π r² dx'), `حجم كل قرص: ${wrapped('π r² dx')}`)
    assert.equal(markFormulas('½ · 2 = 1: لا تتغير القيمة'), `${wrapped('½ · 2 = 1')}: لا تتغير القيمة`)
})

test('rtl formulas: the whole formula, with roots, integrals, primes, exponents and Greek letters', () => {
    const cases: [string, string[]][] = [
        ['∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx: نضرب في 2 في الداخل ونقسم في الخارج', ['∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx', '2']],
        ['f(x) = x² + 3x ومشتقتها f′(x) = 2x + 3', ['f(x) = x² + 3x', 'f′(x) = 2x + 3']],
        ['y = √x وy = √(x + 3) − 2: ثلاث وحدات إلى اليسار', ['y = √x', 'y = √(x + 3) − 2']],
        ['التغيير t = 2ˣ: تعطي t = 4 القيمة x = 2', ['t = 2ˣ', 't = 4', 'x = 2']],
        ['3x + 2y ≤ 12 وx ≥ 0 وy ≥ 0', ['3x + 2y ≤ 12', 'x ≥ 0', 'y ≥ 0']],
        ['حلول z³ = −8 الثلاثة: 1 + √3 i و−2 و1 − √3 i', ['z³ = −8', '1 + √3 i', '−2', '1 − √3 i']],
        ['إشارة دالة: موجبة في (−2, 0) و(4, +∞)', ['(−2, 0)', '(4, +∞)']],
        ['18 000 € − 20 % + 21 % ضريبة = 17 424 €', ['18 000 € − 20 % + 21 %', '17 424 €']],
        ['60 € − 15٪ = 51 €', ['60 € − 15٪ = 51 €']]
    ]
    for (const [text, formulas] of cases) assert.deepEqual(formulasIn(text), formulas, text)
})

test('rtl formulas: arrows and Arabic punctuation separate two formulas', () => {
    assert.deepEqual(formulasIn('x = 0 ← y = 0: يمر بنقطة الأصل'), ['x = 0', 'y = 0'])
    assert.equal(markFormulas('x = 0 ← y = 0: يمر بنقطة الأصل'), `${wrapped('x = 0')} ← ${wrapped('y = 0')}: يمر بنقطة الأصل`)
    assert.deepEqual(formulasIn('التقاطعان: x = 0، y = 0'), ['x = 0', 'y = 0'])
    assert.deepEqual(formulasIn('k = 1، 2، 4، 12'), ['k = 1', '2', '4', '12'])
    assert.deepEqual(formulasIn('x = 0. المستقيم'), ['x = 0'])
})

test('rtl formulas: an interval keeps its Arabic comma, a loose bracket stays in the sentence', () => {
    assert.deepEqual(formulasIn('A = [−5، 3] وB = (−1، +∞): الاتحاد والتقاطع'), ['A = [−5، 3]', 'B = (−1، +∞)'])
    assert.deepEqual(formulasIn('قسّم [2، 3] إلى ثلاثة أجزاء'), ['[2، 3]'])
    assert.deepEqual(formulasIn('معدل التغير في [1, 4]'), ['[1, 4]'])
    assert.equal(markFormulas('الحجم في r³ (1 و8 و27)'), `الحجم في ${wrapped('r³')} (${wrapped('1')} و${wrapped('8')} و${wrapped('27')})`)
    assert.deepEqual(formulasIn('دالة زوجية (y = x² − 2، متناظرة حول محور Y)'), ['y = x² − 2', 'Y'])
    assert.deepEqual(formulasIn('f(t) = t² − 4 (متقطع) و F(x) = x³/3 − 4x (متصل)'), ['f(t) = t² − 4', 'F(x) = x³/3 − 4x'])
})

test('rtl formulas: a sign after an Arabic word joins the word and the number', () => {
    assert.deepEqual(formulasIn('الأوجه + الرؤوس = الأحرف + 2'), ['2'])
    assert.deepEqual(formulasIn('مرتان +6 € وأربع مرات −3 €'), ['+6 €', '−3 €'])
    assert.deepEqual(formulasIn('المساحة: × 100² = × 10 000'), ['× 100² = × 10 000'])
    assert.deepEqual(formulasIn('في الخارج +1: وحدة إلى الأعلى'), ['+1'])
})

test('rtl formulas: the number of a step stays apart from what follows', () => {
    assert.deepEqual(formulasIn('1. n: عندما x = 0 تكون y = 1'), ['1.', 'n', 'x = 0', 'y = 1'])
})

test('rtl formulas: isolates already in the text are replaced by the embedding', () => {
    assert.equal(markFormulas('مع محور \u2066Y: x = 0\u2069'), `مع محور ${wrapped('Y: x = 0')}`)
    assert.equal(markFormulas('المسافة بين \u2066−2\u2069 و5'), `المسافة بين ${wrapped('−2')} و${wrapped('5')}`)
})

test('rtl formulas: Arabic words alone get no marks', () => {
    assert.equal(markFormulas('في نقطة التقاطع تساوي إحدى الإحداثيات صفرًا'), 'في نقطة التقاطع تساوي إحدى الإحداثيات صفرًا')
    assert.equal(markFormulas('كسر "مما بقي": اضرب في الكسر الباقي'), 'كسر "مما بقي": اضرب في الكسر الباقي')
})
