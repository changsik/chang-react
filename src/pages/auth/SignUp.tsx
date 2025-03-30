
import { useEffect, useState } from "react";
import styles from "./styles/SignUp.module.scss";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import SignService from "@/apis/service/signService";
import { useNavigate } from "react-router-dom";
import { sendbird } from "@/config/sendbirdConfig";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/userState";

const SignUp  = () => {
    const setUser = useSetRecoilState(userState)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const navigate = useNavigate();

    // 이메일 / 패스워드 회원가입
    const registerUser = async (email : string, password : string) => {
        try {
            //회원가입 후 로그인 처리( 동일한 이메일일 경우 체크 auth/email-already-in-use )
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log('firebase sign-up :', userCredential);

            // 가입처리 저장처리
            await SignService.signUp("password", userCredential.user.uid, password, 
                                        email, userName, displayName, mobile, gender, birthDate)

            // 로그인 처리
            const response = await SignService.signIn('password');
            setUser(response.data)

            // Sendbird 연결
            connectSendbird(userCredential.user.uid, userName);

            // 로그인 성공시 홈으로 이동
            navigate('/')

        } catch (error:any) {
            console.error("Error during registration:", error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("이미 가입된 이메일입니다.");
                    break;
                default:
                    await signOut(auth)
                    alert("An error occurred.");
            }
        }
    }

    const connectSendbird = (userId: string, nickname: string) => {
        sendbird.connect(userId, (user, error) => {
            if (error) {
                console.error('Sendbird connection error:', error);
                return;
            }
            console.log('Sendbird connected as:', user);
    
            // 사용자 정보를 업데이트(선택 사항)
            if(nickname != null && !user.nickname){
                sendbird.updateCurrentUserInfo(nickname, null, (response, err) => {
                    if (err) {
                        console.error('Error updating user info:', err);
                        return;
                    }
                   console.log('Sendbird User info updated:', response);
                });
            }
        });
    };

    const onSignUp = (e) => {
        e.preventDefault();
        registerUser(email, password);
    }

    useEffect(() => {
        setEmail("kcsic2000@gmail.com")       
        setPassword("kcsic20!") 
        setUserName("김창식")
        setDisplayName("김창식")
        setMobile("010-8821-0409")
        setGender("M")
        setBirthDate("19720521")
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.page__login}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={styles.page__login__input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="Password"
                    required
                    className={styles.page__login__input}
                />
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="UserName"
                    required
                    className={styles.page__login__input}
                />
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="DisplayName"
                    required
                    className={styles.page__login__input}
                />
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="Mobile"
                    required
                    className={styles.page__login__input}
                />
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="Gender"
                    required
                    className={styles.page__login__input}
                />
                <input
                    type="text"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    // onKeyDown={handelKeydown}
                    placeholder="BirthDate"
                    required
                    className={styles.page__login__input}
                />
            </div>
            <div>
                <button onClick={onSignUp} className={styles.page__button}>회원가입</button>
            </div>
        </div>
    );
};

export default SignUp;