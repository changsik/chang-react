import { atom } from "recoil";

export const pageState = atom<number>({
    key: 'pageState',
    default: 1
})

// 현재 페이지 상태
export const currentPageState = atom<number>({
    key: 'currentPageState',
    default: 1,
});
  
// 페이지 당 아이템 수
export const itemsPerPageState = atom<number>({
    key: 'itemsPerPageState',
    default: 10,
});

export const pageStepState = atom<number>({
    key: 'pageStepState',
    default: 10,
});