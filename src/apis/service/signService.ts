import { getApi, postApi } from "../api"

const signIn = () => {
    return postApi('/api/sign-in/firebase',{});
}

const getUserInfo = () => {
    return getApi('/api/user-info',{});
}

export default {
    signIn,
    getUserInfo
}