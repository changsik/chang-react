import { postApi } from "./api"

const signIn = () => {
    return postApi('/api/sign-in/firebase',{});
}

export default {
    signIn
}