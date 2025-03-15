import CommonHeader from "@/components/common/header/CommonHeader"
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar"
import CommonNav from "@/components/common/navigation/CommonNav"
import CommonFooter from "@/components/common/footer/CommonFooter"
import Card from "./components/Card"

import styles from "./styles/index.module.scss"
import { CardDTO } from "./types/Card"
import { useRecoilValueLoadable } from "recoil"
import { imageData } from "@recoil/selectors/imageSelector"
import DetailDialog from "@components/common/dialog/DetailDialog"
import { useMemo, useState } from "react"

function index() {

    //const imgSelector = useRecoilValue (imageData)
    const imgSelector = useRecoilValueLoadable(imageData)
    const [imgData, setImgData] = useState<CardDTO>();
    const [open, setOpen] = useState<Boolean>(false)

    // const  CARD_LIST = imgSelector.data.results.map((card:CardDTO) => {
    //     return (
    //     <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
    //     )
    // })

    const CARD_LIST = useMemo(() => {
        if(imgSelector.state === "hasValue"){   // loading, hasValue
            const result = imgSelector.contents.map((card:CardDTO) => {
                return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
            })
            return result;
        } else {
            return <div>Loading...</div>
        }
    }, [imgSelector])       

  // const [imgUrls, setImgUrls] = useState([])
  // const getData = async () => {
  //   const API_URL = "https://api.unsplash.com/search/photos"
  //   const API_KEY = "NaGqJpEQmmW-tcDsDPWRu_amyjCSyfk958xKKBNYYIQ"
  //   const PER_PAGE = 30

  //   const searchValue = "Korea";
  //   const pageValue = 100;

  //   try {
  //     const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
  //     console.log(res)
  //     if(res.status === 200){
  //       setImgUrls(res.data.results)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const cardList = imgUrls.map((card:CardDTO) => {
  //   return (
  //     <Card data={card} key={card.id}/>
  //   )
  // })

  // useEffect(()=>{
  //   getData();
  // }, [])

  return (
    <div className={styles.page}>
      {/* {공통 헤더 UI 부분} */}
      <CommonHeader/>

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
      <CommonFooter />

      {open && <DetailDialog data={imgData} handleDialog={setOpen}/>}
    </div>
  )
}

export default index  