import { atom } from 'recoil';

interface User {
    uid: string,
    email: string,
    displayName : string
}

export const userState = atom<User>({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});