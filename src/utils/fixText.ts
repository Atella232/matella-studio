const suspiciousMojibake = /[ÃÂØÙðâï]|�/

const cp1252ReverseMap = new Map<number, number>([
    [0x20ac, 0x80],
    [0x201a, 0x82],
    [0x0192, 0x83],
    [0x201e, 0x84],
    [0x2026, 0x85],
    [0x2020, 0x86],
    [0x2021, 0x87],
    [0x02c6, 0x88],
    [0x2030, 0x89],
    [0x0160, 0x8a],
    [0x2039, 0x8b],
    [0x0152, 0x8c],
    [0x017d, 0x8e],
    [0x2018, 0x91],
    [0x2019, 0x92],
    [0x201c, 0x93],
    [0x201d, 0x94],
    [0x2022, 0x95],
    [0x2013, 0x96],
    [0x2014, 0x97],
    [0x02dc, 0x98],
    [0x2122, 0x99],
    [0x0161, 0x9a],
    [0x203a, 0x9b],
    [0x0153, 0x9c],
    [0x017e, 0x9e],
    [0x0178, 0x9f]
])

function encodeWindows1252(text: string): Uint8Array {
    const bytes: number[] = []

    for (const char of text) {
        const codePoint = char.codePointAt(0) ?? 0
        if (codePoint <= 0xff) {
            bytes.push(codePoint)
            continue
        }

        const mapped = cp1252ReverseMap.get(codePoint)
        if (mapped !== undefined) {
            bytes.push(mapped)
            continue
        }

        return new Uint8Array()
    }

    return Uint8Array.from(bytes)
}

export function fixMojibake(text: string): string {
    if (!text || !suspiciousMojibake.test(text)) {
        return text
    }

    let current = text

    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const bytes = encodeWindows1252(current)
            if (bytes.length === 0) {
                return current
            }

            const decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes)
            if (!decoded || decoded === current) {
                return current
            }

            current = decoded
            if (!suspiciousMojibake.test(current)) {
                return current
            }
        } catch {
            return current
        }
    }

    return current
}

export function fixMaybeText(text: string): string {
    return fixMojibake(text)
}

export function normalizeInlineMath(text: string): string {
    return fixMaybeText(text)
        .replace(/\\\(([\s\S]+?)\\\)/g, (_, content: string) => `$${content.trim()}$`)
        .replace(/\\\[([\s\S]+?)\\\]/g, (_, content: string) => `$$${content.trim()}$$`)
        .replace(/\$\$\s+/g, '$$')
        .replace(/\s+\$\$/g, '$$')
        .replace(/\$\s+/g, '$')
        .replace(/\s+\$/g, '$')
}
