export function setLocalStorageKey<T>(key: string, value: T) {
    try {
        return localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
}
