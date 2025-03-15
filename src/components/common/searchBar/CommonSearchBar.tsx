import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '@recoil/atoms/searchState'
import styles from './CommonSearchBar.module.scss'
import { pageState } from '@/recoil/atoms/pageState'

function CommonSearchBar() {
    const [search, setSearch] = useRecoilState(searchState)
    const [page, setPage] = useRecoilState(pageState)
    const [text, setText] = useState<string>("")

    const onChange = (e) => {
        console.log(e.target.value)
        setText(e.target.value)
    }  

    const onSearch = (e) => {
        if (text === '') {
            // input 태그 안에 빈 값으로 검색하였을 때 => searching default value
            setSearch('Korea')
            setPage(1)
        } else {
            setSearch(text) // 작성한 Input Value 값 할당
            setPage(1)
        }
    }  
    
    const handelKeydown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){  // Enter key
            if(text === ""){
                // input 태그 안에 빈 값으로 검색했을때 => default 값으로 할당
                setSearch("Korea")
                setPage(1)
            } else {
                setSearch(text) // 작성한 input 값으로 할 당
                setPage(1)
            }
        }       
    }

    return (
      <div className={styles.searchBar}>
          <div className={styles.searchBar__search}>
              <input type="text" placeholder="찾으실 이미지를 검색하세요." value={text} className={styles.searchBar__search__input} 
                onChange={onChange} onKeyDown={handelKeydown}/>
              <img src="/src/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
          </div>
      </div>
    )
}

export default CommonSearchBar