import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar"
import CommonNav from "@/components/common/navigation/CommonNav"
import CommonFooter from "@/components/common/footer/CommonFooter"
import Card from "./components/Card"

import styles from "./styles/index.module.scss"
import { CardDTO } from "./types/Card"
import { useRecoilValueLoadable } from "recoil"
import { imageData2 } from "@recoil/selectors/imageSelector2"
import DetailDialog from "@components/common/dialog/DetailDialog"
import { useMemo, useState } from "react"
import Loading from "./components/Loading"
import Pagination from "@/components/common/pagination/Pagination"
import { paginationSelector } from "@/recoil/selectors/pageSelector"

function index() {

    //const imgSelector = useRecoilValue (imageData)
    //const imgSelector = useRecoilValueLoadable(imageData2)
    const [imgData, setImgData] = useState<CardDTO>();
    const [open, setOpen] = useState<Boolean>(false)


    const paginationData = useRecoilValueLoadable(paginationSelector({ id: "notice" }))
    const totPage = 100;

    const CARD_LIST = useMemo(() => {
        if(paginationData.state === "hasValue"){   // loading, hasValue
            const result = paginationData.contents.results.map((card:CardDTO) => {
                return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
            })
            return result;
        } else {
            return <Loading />
        }
    }, [paginationData]) 
    
  //   const CARD_LIST = useMemo(() => {
  //     if(imgSelector.state === "hasValue"){   // loading, hasValue
  //         const result = imgSelector.contents.results.map((card:CardDTO) => {
  //             return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
  //         })
  //         return result;
  //     } else {
  //         return <Loading />
  //     }
  // }, [imgSelector]) 
    
  return (
    <div className={styles.page}>
      {/* {공통 헤더 UI 부분} */}
      {/* <CommonHeader/> */}

      {/* {공통 네비게이션 UI 부분} */}
      <CommonNav/>

      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br/>
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* {검색창 UI부분} */}
            <CommonSearchBar/>
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
      </div>

      {/* 공통 푸터 UI 부분 */}
      {/* <CommonFooter /> */}
      <Pagination id="notice" />

      {open && <DetailDialog data={imgData} handleDialog={setOpen}/>}
    </div>
  )
}

export default index  