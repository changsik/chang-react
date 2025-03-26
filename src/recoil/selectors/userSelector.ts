import { selector } from 'recoil';
import signService from '@/apis/signService';

export const userInfo = selector({
    key: 'userInfo',
    get: async ({ }) => {
        //const userData = get(userState);

        try {
            const response = await signService.getUserInfo();
            return response;
        } catch (error) {
            console.log(error);
        }

        // const auth = get(authState);
        // return {
        //     isAuthenticated: !!auth.token,
        //     user: auth.user,
        // };
    },
});