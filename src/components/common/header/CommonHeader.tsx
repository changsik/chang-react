import styles from "./CommonHeader.module.scss"
import { useNavigate } from "react-router-dom"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil";
import { auth } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";

function CommonHeader() {
    const userInfo = useRecoilValue(userState);

    const navigate = useNavigate()
    const moveToPage = () => {
        navigate('/bookmark')
    }

    const moveToSignIn = () => {
        navigate('/sign-in')
    }

    const onSignOut = () => {
        logoutUser();
    }

    const logoutUser = async () => {
        try {
          await signOut(auth);
          // Navigate("/login");  
        } catch (error) {
          console.error("로그아웃 에러 : ", error);
        }
      }

    return (
        <header className={styles.header}>
            <div className={styles.header__logoBox}>
                <img src="src/assets/images/image-logo.png" alt="" className={styles.header__logoBox__logo}></img>
                <span className={styles.header__logoBox__title}>PhotoSplash</span>
            </div>
            <div className={styles.header__profileBox}>
                {userInfo && (<span className={styles.header__profileBox__userName}>{userInfo.userName}</span>)}
                <button className={styles.header__profileBox__button}>사진제출</button>
                <button className={styles.header__profileBox__button} onClick={moveToPage}>북마크</button>
                {!userInfo && (<button className={styles.header__profileBox__button} onClick={moveToSignIn}>로그인</button>)}
                {userInfo && (<button className={styles.header__profileBox__button} onClick={onSignOut}>로그아웃</button>)}                
            </div>
        </header>
    )
}   

export default CommonHeader