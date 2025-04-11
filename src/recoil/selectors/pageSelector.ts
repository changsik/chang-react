import { selectorFamily } from "recoil";
import { paginationState } from "../atoms/pageState";
import axios from "axios";
import { imageData } from "./imageSelector";

 export const paginationSelector = selectorFamily({
    key: 'paginationSelector',
    get: (id) => ({get}) => {
        
        const { page, pageSize } : any = id;
        const pagination = get(paginationState({ page, pageSize }));
        

        const  imageData1 = get(imageData)
        return imageData1;


        //const pagination = get(paginationState(id));
        // 페이지에 따른 데이터를 가져오는 로직 (예: API 호출)
        //return fetchDataForPage(pagination, id);
        //return pagination;
    }   
});

// function async fetchDataForPage(pagination, id) {
//     // 실제 데이터 가져오는 로직을 구현하세요.
//     // 예: API 호출 등
//     const API_URL = "https://api.unsplash.com/search/photos"

//     const searchValue = get(searchState);
//             const pageValue = get(pageState);

//     try {    
//         const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }

//     //return pagination;
// }