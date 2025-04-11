import { atom, atomFamily } from "recoil";

// 현재 페이지 상태
export const pageState = atom<number>({
    key: 'pageState',
    default: 1
})
  
// 페이지 당 아이템 수
export const pageSizeState = atom<number>({
    key: 'pageSizeState',
    default: 10,
});

// 페이지네이션 스텝
export const pageStepState = atom<number>({
    key: 'pageStepState',
    default: 10,
});

export const paginationState = atomFamily<{ page?: number; pageSize?: number }, { page: number; pageSize: number }>({
    key: 'paginationState',
    default: (params) => ({
        page: params.page || 1, 
        pageSize: params.pageSize || 15
    })
});