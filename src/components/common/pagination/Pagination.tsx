import { useRecoilState } from 'recoil';
import styles from './Pagination.module.scss'
import { pageSizeState, pageState, pageStepState, paginationState } from '@/recoil/atoms/pageState';

const Pagination = () => {
    // const [page, setPage] = useRecoilState(pageState);
    // const [pageSize, setPageSize] =  useRecoilState(pageSizeState);
    const [pageStep, setPageStep] =  useRecoilState(pageStepState);
    const [pagination, setPagination] = useRecoilState(paginationState({ page: 1, pageSize: 15 }));

    

    return (
        <div className={styles.page}>
            <div className={styles.pagination}>
                <button className={styles.pagination__button}>
                    <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" />
                </button>
                {/* <button className={index === page - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} >
                                    {item}
                </button> */}
                <button className={styles.pagination__button}>
                    <img src="/src/assets/icons/icon-arrowRight.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Pagination;

