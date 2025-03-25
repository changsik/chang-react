import { selector } from 'recoil';
import { authState } from '../atoms/authAtom';

export const authSelector = selector({
    key: 'authSelector',
    get: ({ get }) => {
        // const auth = get(authState);
        // return {
        //     isAuthenticated: !!auth.token,
        //     user: auth.user,
        // };
    },
});