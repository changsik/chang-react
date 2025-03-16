import { useEffect, useState } from 'react';
import styles from './DetailDialog.module.scss';
import { CardDTO, Tag } from '@/pages/index/types/Card';
import toast, {toastConfig} from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({
    theme: 'dark'
})

interface Props {
    data:CardDTO
    handleDialog:(eventValue:boolean)=>void
}

const DetailDialog  = ({ data, handleDialog }:Props ) => {

    const [bookmark, setBookmark] = useState(false);


    // 다이얼로그 닫기
    const closeDialog = () => {
        handleDialog(false)
    }

    // 북마크 추가
    const addBookmark = (selected:CardDTO) => {
        setBookmark(true);    

        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
        if(!getLocalStorage || getLocalStorage === null) {
            console.log('북마크가 없습니다.')
            localStorage.setItem('bookmark', JSON.stringify([selected]))
            toast('해당 이미지를 북마크에 저장하였습니다. 😊')
        } else {
            if(getLocalStorage.findIndex((item:CardDTO)=> item.id === selected.id ) > -1){
                console.log('북마크에 이미 존재합니다.')
                toast('북마크에 이미 존재하는 이미지입니다. 😒')
            } else {
                const res = [...getLocalStorage]
                res.push(selected) 
                localStorage.setItem('bookmark', JSON.stringify(res))
                toast('해당 이미지를 북마크에 저장하였습니다. 😊')
            }   
        }
    }

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
        if(getLocalStorage && getLocalStorage.findIndex((item:CardDTO)=> item.id === data.id ) > -1) {
            setBookmark(true)
        } else if(!getLocalStorage) return
    }, [data.id])


    return (
        <div className={styles.container}>
            <div className={styles.container__dialog}>
                <div className={styles.container__dialog__header}>
                    <div className={styles.close}>
                        <button className={styles.close__button} onClick={closeDialog}>
                            {/* 구글 아이콘 사용 */}
                            <span className="material-symbols-outlined" style={{fontSize:28 + 'px'}}>close</span>                            
                        </button>
                        <img src={data.user.profile_image.small} alt="닫기 버튼" className={styles.close__authorImage} />
                        <span className={styles.close__authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles.bookmark__button} onClick={() => addBookmark(data)}>
                            {/* 구글 아이콘 사용 */}
                            {bookmark === false ? <span className="material-symbols-outlined" style={{fontSize:16 + 'px'}}>북마크</span> 
                                                : <span className="material-symbols-outlined" style={{fontSize:16 + 'px', color:'red'}}>북마크</span>}
                             
                        </button>
                        <button className={styles.bookmark__button}>다운로드</button>
                    </div>
                </div>
                <div className={styles.container__dialog__body}>
                    <img src={data.urls.small} alt="상세이미지" className={styles.image} />
                </div>
                <div className={styles.container__dialog__footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>이미지 크기</span>
                            <span className={styles.infoBox__item__value}>{data.width} X {data.height}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>업로드</span>
                            <span className={styles.infoBox__item__value}>{data.created_at.split("T")[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                            <span className={styles.infoBox__item__value}>{data.updated_at.split("T")[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>다운로드</span>
                            <span className={styles.infoBox__item__value}>{data.likes}</span>
                        </div>        
                    </div>
                    <div className={styles.tagBox}>
                        {data.tags && data.tags.map((tag: Tag) => {
                            return (
                                <div className={styles.tagBox__tag} key={tag.title}>
                                    {tag.title}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailDialog;