import styles from "./CommonHeader.module.scss"
import { useNavigate } from "react-router-dom"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilState } from "recoil";
import { auth } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";
import { sendbird } from "@/config/sendbirdConfig";

function CommonHeader() {
    const [user] = useRecoilState(userState);

    const navigate = useNavigate()
    const moveToPage = () => {
        navigate('/bookmark')
    }

    const moveToSignIn = () => {
        navigate('/sign-in')
    }

    const onSignOut = () => {
        logoutUser();
        navigate('/login')
    }

    const logoutUser = async () => {
        try {
            await signOut(auth);
            sendbird.disconnect(()=>{
                console.log('Disconnected from Sendbird');
            });
        } catch (error) {
            console.error("로그아웃 에러 : ", error);
        }
    }

    const moveToChat = () =>  {
        navigate('/chat')
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__logoBox}>
                <img src="src/assets/images/image-logo.png" alt="" className={styles.header__logoBox__logo}></img>
                <span className={styles.header__logoBox__title}>PhotoSplash</span>
            </div>
            <div className={styles.header__profileBox}>
                {user && (<span className={styles.header__profileBox__userName}>{user.userName}</span>)}
                <button className={styles.header__profileBox__button} onClick={moveToChat}>대화방</button>
                <button className={styles.header__profileBox__button}>사진제출</button>
                <button className={styles.header__profileBox__button} onClick={moveToPage}>북마크</button>
                {!user && (<button className={styles.header__profileBox__button} onClick={moveToSignIn}>로그인</button>)}
                {user && (<button className={styles.header__profileBox__button} onClick={onSignOut}>로그아웃</button>)}                
            </div>
        </header>
    )
}   

export default CommonHeader