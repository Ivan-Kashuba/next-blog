export function getLocalStorageKey(key: string) {
    try {
        return JSON.parse(localStorage.getItem(key) || '');
    } catch (error) {}
}
