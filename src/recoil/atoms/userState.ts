import { atom } from 'recoil';

interface User {
    userId: string,
    email: string,
    userName : string
}

export const userState = atom<User>({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});