import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
    const [state, setState] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);

            return value ? JSON.parse(value) : initialValue;
        } catch (error) {}
    });

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value);
        } catch (error) {}
    };

    return [state, setValue];
}

export default useLocalStorage;
