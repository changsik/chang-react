import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './Pagination.module.scss'
import { pageSizeState, pageState, pageStepState, paginationState } from '@/recoil/atoms/pageState';
import { paginationSelector } from '@/recoil/selectors/pageSelector';
import { useState } from 'react';

const Pagination = ({id}) => {
    //const [step, setStep] = useState(0)
    const [pagination, setPagination] = useRecoilState(paginationState({ id }));
    // const paginationData = useRecoilValue(
    //     paginationSelector({ id:id, page: pagination.page, pageSize: pagination.pageSize })
    // );

    const step = 10;
    const totPage = 100;
    console.log('totPage ======== ', totPage)

    // 페이지 리스트 UI 생성
    const newArr: number[] = new Array()
    for (let i = 1; i <= totPage; i++) {
        newArr.push(i)
    }

    console.log('newArr ======== ', newArr)

    const handlePrev = () => {
        setPagination((prev) => ({
            ...prev,
            page: Math.max(prev.page - 1, 1),
        }));
    };

    const handleNext = () => {
        setPagination((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    const handlePageSizeChange = (newSize) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: newSize,
        }));
    };
    
    //console.log('paginatedData ======== ', paginatedData)  

    return (
        <div className={styles.page}>
            <div className={styles.pagination}>
                <button className={styles.pagination__button}>
                    <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" onClick={handlePrev} />
                </button>
                <span>현재 페이지: {pagination.page}</span>
                {/* <button className={index === page - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} >
                                    {item}
                </button> */}
                <button className={styles.pagination__button}>
                    <img src="/src/assets/icons/icon-arrowRight.svg" alt="" onClick={handleNext} />
                </button>
            </div>
        </div>
    )
}

export default Pagination;

