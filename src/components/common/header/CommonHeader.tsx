import styles from "./CommonHeader.module.scss"

function CommonHeader() {
  return (
    <header className={styles.header}>
         <div className={styles.header__logoBox}>
            <img src="src/assets/images/image-logo.png" alt="" className={styles.header__logoBox__logo}></img>
            <span className={styles.header__logoBox__title}>PhotoSplash</span>
         </div>
         <div className={styles.header__profileBox}>
            <button className={styles.header__profileBox__button}>회원가입</button>
            <button className={styles.header__profileBox__button}>사진제출</button>
            <button className={styles.header__profileBox__button}>북마크</button>
            <span className={styles.header__profileBox__userName}>사용자</span>
         </div>
    </header>
  )
} 

export default CommonHeader