import { getApi } from "../api"

const checkAccount =  (id:string) => {
    return getApi('/api/user/check-account' ,{id})
}

export default {
    checkAccount
}