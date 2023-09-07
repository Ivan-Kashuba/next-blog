export function removeLocalStorageKey(key: string) {
    try {
        return localStorage.removeItem(key);
    } catch (error) {}
}
