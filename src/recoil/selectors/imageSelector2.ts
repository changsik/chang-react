import { selector } from "recoil";

import axios from "axios";
import { searchState } from "../atoms/searchState";
import { paginationState } from "../atoms/pageState";

const API_URL = "https://api.unsplash.com/search/photos"
const API_KEY = "NaGqJpEQmmW-tcDsDPWRu_amyjCSyfk958xKKBNYYIQ"

 export const imageData2 = selector({
    key: 'imageData2',
    get: async ({get}) => {
        const searchValue = get(searchState);

        const pagination =  get(paginationState({ id: "notice" }))
        console.log('pagination ======== ', pagination) // { page: 1, pageSize: 10 } 형태로 출력됨

        const pageValue = pagination.page; // 페이지 값 가져오기
        const pageSizeValue = pagination.pageSize; // 페이지 사이즈 값 가져오기

        // API 호출
        try {
            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${pageSizeValue}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }

    }
})