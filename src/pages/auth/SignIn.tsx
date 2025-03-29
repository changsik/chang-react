import { appleProvider, auth, googleProvider } from "@/config/firebaseConfig";
import { sendbird } from "@/config/sendbirdConfig";
import { deleteUser, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {  useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignService from "@/apis/service/signService";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/userState";

const SignIn = () => {
    const setUser = useSetRecoilState(userState)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation()
    
    // 로그인 
    const signIn = async (email:string, password:string) => {
        try {
            // firebase 로그인
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('firebase login :', userCredential);

            // 로그인 후 서버에 필요한 데이터 전송
            const response = await SignService.signIn();
            setUser(response.data)

            // Sendbird 연결
            const userName = response.data.userName;
            connectSendbird(userCredential.user.uid, userName);

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

    // Google 로그인 함수
    const signInWithGoogle = async () => {
        try {
            // 체크
            // userService.checkAccount()
            
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User signed in:", user);

            // 로그인 후 서버에 필요한 데이터 전송 (계정이 존재하는지 체크)
            const response = await SignService.signIn();
            setUser(response.data)

            // Sendbird 연결
            const userName = response.data.userName;
            connectSendbird(user.uid, userName);

            // 로그인 성공시 홈으로 이동
            navigate('/')

        } catch (error) {
            console.error("Error signing in with Google:", error);

            if (error instanceof Error && (error as any).response?.status === 401) {
                const user = auth.currentUser;
                
                // 강제 로그아웃
                await signOut(auth);

                // 계정삭제 (401 일 경우)
                await deleteUser(user);
            }
        }
    }  

    // Google 로그인 함수
    const signInWithApple = async () => {
        try {
            // 체크
            // userService.checkAccount()
            
            const result = await signInWithPopup(auth, appleProvider);
            const user = result.user;
            console.log("User signed in:", user);

            // 로그인 후 서버에 필요한 데이터 전송 (계정이 존재하는지 체크)
            const response = await SignService.signIn();
            setUser(response.data)

            // Sendbird 연결
            const userName = response.data.userName;
            connectSendbird(user.uid, userName);

            // 로그인 성공시 홈으로 이동
            navigate('/')

        } catch (error) {
            console.error("Error signing in with Google:", error);

            if (error instanceof Error && (error as any).response?.status === 401) {
                const user = auth.currentUser;
                
                // 강제 로그아웃
                await signOut(auth);

                // 계정삭제 (401 일 경우)
                await deleteUser(user);
            }
        }
    }  

    const onSignIn = (e) => {
        e.preventDefault();
        signIn(email, password);
    }
  
    const handelKeydown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){  // Enter key
            signIn(email, password);
        }       
    }

    const onGoogleSignIn = () => {
        signInWithGoogle();
    };

    const onAppleSignIn = () => {
        signInWithApple();
    };

    useEffect(() => {
        if(location.search){
            window.history.pushState({}, '', '/sign-in');
        } 
    }, []);
    
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
                onKeyDown={handelKeydown}
                placeholder="Password"
                required
                />
            </div>
            <div>
                <button onClick={onSignIn}>로그인</button>
                <button onClick={onGoogleSignIn}>구글 로그인</button>
                <button onClick={onAppleSignIn}>애플 로그인</button>
            </div>
        </div>
    )
}

export default SignIn