import { auth } from "@/config/firebaseConfig";
import { sendbird } from "@/config/sendbirdConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignService from "@/apis/signService";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/userState";
import { userInfo } from "@/recoil/selectors/userSelector";

const SignIn = () => {
    const setUser = useSetRecoilState(userState)
    // const userSelector = useRecoilValueLoadable(userInfo)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    //const sb = new SendBird({ appId: '3E4C38E4-4EB5-4089-AA63-72F8B96E36DA' }); // Sendbird Application ID를 입력하세요.

    // 로그인 
    const signIn = async (email:string, password:string) => {
        try {
            // firebase 로그인
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //const token = await userCredential.user.getIdToken();
            //localStorage.setItem('token', token);   // 토큰 저장
          
            // 로그인 후 서버에 필요한 데이터 전송
            const response = await SignService.signIn();
            const userName = response.data.userName;
            setUser(response.data)

            // Sendbird 연결
            connectUser(userCredential.user.uid, userName);

            // 로그인 성공시 홈으로 이동
            navigate('/')

        } catch (error) {
          console.log('로그인 실패 !!')
          console.error("Error during login:", error);
          signInError(error);  
        }
    }

    // 로그인 핸들러
    const signInError = (error:any) => {
        console.log(error.code)
        switch (error.code) {
        case "auth/user-not-found":
            alert("User not found.");
            break;
        case "auth/wrong-password":
            alert("Incorrect password.");
            break;
        case "auth/invalid-email":
            alert("Invalid email.");
            break;
        case "auth/missing-password":
            alert("missing password.");
            break;  
        case "auth/invalid-credential":
            alert("Invalid credential.");
            break;
        default:
            alert("An error occurred.");
        }
    };

    const connectUser = (userId: string, nickname: string) => {
        sendbird.connect(userId, (_user, error) => {
            if (error) {
                console.error('Sendbird connection error:', error);
                return;
            }
            //console.log('Sendbird connected as:', user);

            // 사용자 정보를 업데이트(선택 사항)
            sendbird.updateCurrentUserInfo(nickname, null, (_response, err) => {
            if (err) {
                console.error('Error updating user info:', err);
                return;
            }
                //console.log('Sendbird User info updated:', response);
            });
        });
    };

    const onSignIn = (e) => {
        e.preventDefault();
        signIn(email, password);
      }

    useEffect(() => {

    }, [])  
  
    return (
        <div>
            <div>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
            </div>
            <div>
                <button onClick={onSignIn}>로그인</button>
            </div>
        </div>
    )
}

export default SignIn