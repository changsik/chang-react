import { getApi, postApi } from "../api"

const signIn = (loginType:string) => {
    const param = {loginType}
    return postApi('/api/sign-in/firebase', param);
}

const signUp = (loginType:string, userId:string, pwd:string, 
                email:string, userName:string, displayName:string, 
                mobile:string, gender:string, birthDate:string) => {
    const param = {loginType, userId, pwd, email, userName, displayName, mobile, gender, birthDate}
    return postApi('/api/sign-up/firebase', param);
}

const getUserInfo = () => {
    return getApi('/api/user-info',{});
}

export default {
    signUp,
    signIn,
    getUserInfo
}