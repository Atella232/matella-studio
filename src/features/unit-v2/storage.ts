import { useEffect, useState } from 'react'

function readList(key: string, fallbackKey?: string): unknown[] {
    try {
        const stored = localStorage.getItem(key) ?? (fallbackKey ? localStorage.getItem(fallbackKey) : null)
        if (!stored) return []
        const parsed: unknown = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function useStoredList<Item>(key: string, isValid: (value: unknown) => value is Item, fallbackKey?: string) {
    const [items, setItems] = useState<Item[]>(() => readList(key, fallbackKey).filter(isValid))

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(items))
        } catch {
            // Storage can be unavailable (private mode); progress then lasts for the session only
        }
    }, [items, key])

    const add = (item: Item) => setItems((current) => current.includes(item) ? current : [...current, item])
    const reset = () => setItems([])
    return { ids: items, addId: add, reset }
}

const isProgressId = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value)

/** Completed exercise ids, kept in the browser */
export function useStoredIds(key: string, fallbackKey?: string) {
    return useStoredList(key, isProgressId, fallbackKey)
}

/** Lessons marked as understood; unknown ids from older versions are dropped */
export function useStoredTopics(key: string, validIds: string[]) {
    const isTopic = (value: unknown): value is string => typeof value === 'string' && validIds.includes(value)
    return useStoredList(key, isTopic)
}
