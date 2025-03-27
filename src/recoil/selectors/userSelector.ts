import { selector } from 'recoil';
import signService from '@/apis/signService';

export const userInfo = selector({
    key: 'userInfo',
    get: async ({ }) => {
        try {
            if(localStorage.getItem("token")){
                const response = await signService.getUserInfo();
                return response.data || {};
            }
            return {};
        } catch (error) {
            console.log(error);
        }
    },
});