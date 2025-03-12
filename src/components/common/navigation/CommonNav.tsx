import { useState } from 'react'
import styles from './CommonNav.module.scss'

interface Navigation {
  index: number,
  path:string,
  label:string,
  searchValue:string,
  isActive:boolean
}

function CommonNav() {
  const [navigation, setNavigation] = useState<Navigation[]>([
    {
      index:0,
      path:'edit',
      label:'보도/편집 전용',
      searchValue:'edit',
      isActive:false
    },
    {
      index:1,
      path:'following',
      label:'팔로잉',
      searchValue:'following',
      isActive:false
    }
  ])

  return (
    <div className={styles.navigation}>
        <div className={styles.navigation__menu}>
            <span className={styles.navigation__menu__label}></span>
        </div>        
    </div>
  )
}

export default CommonNav