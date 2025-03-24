import { auth, googleProvider } from "@config/firebaseConfig";
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, unlink } from "firebase/auth";
import { useState } from "react";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    registerUser(email, password);
  }

  const handleDeleteUser = () => {
    deleteAccount();
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    loginUser(email, password);
  }

  const handleLogout = () => {
    logoutUser();
  };

  const handleToken = () => {
    issueToken();
  };
  
  // 이메일 / 패스워드 회원가입
  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // 회원 삭제
  const deleteAccount = async () => {
    const user = auth.currentUser;
  
    if (user) { // 로그인 상태인 경우에만 삭제 가능
      try {
        await deleteUser(user);
        console.log("User account deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      console.log("No user is logged in.");
    }
  }

  // 재인증 (삭제시)
  const reauthenticateUser = async (password) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
  
    try {
      await reauthenticateWithCredential(user, credential);
      console.log("User reauthenticated.");
    } catch (error) {
      console.error("Error during reauthentication:", error);
    }
  }


  // 로그인 
  const loginUser = async (email, password) => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // userCredential.user.accessToken, userCredential.user.uid
      console.log('로그인 성공 !!')
      console.log("Logged in as:", userCredential.user);
    } catch (error) {
      console.log('로그인 실패 !!')
      console.error("Error during login:", error);
      handleLoginError(error);  
    }
  }

  // 로그인 핸들러
  const handleLoginError = (error) => {
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

  // 로그인 상태 관리 (선택 사항)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
      // 갱신된 토큰은 user.getIdToken(true)를 통해 가져올 수 있음 (자동갱신)
      //const token = user.getIdToken(true);
      //console.log('token = ', token);
    } else {
      console.log("No user is logged in.")
    }
  })

  // 로그아웃
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      // Navigate("/login");  
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  // 토큰 발급 (수동)
  const issueToken = async () => {
    auth.currentUser.getIdToken(true)
      .then((newToken) => {
        console.log("New token:", newToken);
      })
      .catch((error) => {
        console.error("Error refreshing token:", error.message);
        handleTokenError();
      });
  }

  // 토큰 발급 에러 핸들러 (로그인 페이지로 이동처리)
  const handleTokenError = async () => {
    try {
      await signOut(auth);
      console.log("Session expired. User logged out.");
      // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("Error handling token error:", error);
    }
  }


  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  // Google 로그인 함수
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in:", user);
      // 추가적인 사용자 데이터 처리 가능 (예: Firestore에 저장)
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  const reauthenticateGoogleUser = async () => {
    const user = auth.currentUser;
    console.log('user = ', user)
    try {
      const token = await user.getIdToken();
      const credential = GoogleAuthProvider.credential(token);

      await reauthenticateWithCredential(user, credential).then(() => {
        unlink(user, GoogleAuthProvider.PROVIDER_ID).then(() => {
          // Google account unlinked
        }).catch((error) => {
          // An error occurred
          console.error("An error occurred:", error);
        });
      }).catch((error) => {
        // User not re-authenticated
        console.error("User not re-authenticated:", error);
      });

      console.log("User reauthenticated.");
    } catch (error) {
      console.error("Error during reauthentication:", error);
    }
  }

  const deleteGoogleUserAccount = async () => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        await deleteUser(user);
        console.log("User account deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error.code);
        if (error.code === "auth/requires-recent-login") {
           console.log("Reauthentication required.");
           await reauthenticateGoogleUser();
        //deleteGoogleUserAccount(); // 재인증 후 재시도
        }
      }
    } else {
      console.log("No user is currently logged in.");
    }
  };

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
        <button onClick={handleSignUp}>회원가입</button>
        <button onClick={handleDeleteUser}>회원탈퇴</button>
        <button onClick={handleSignIn}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleToken}>토큰 재발급</button>
        <br/><br/>
        <button onClick={handleGoogleSignIn}>Google 회원가입/로그인</button>
        <button onClick={deleteGoogleUserAccount}>Google 회원탈퇴</button>
      </div>
    </div>
  )
}

export default SignUp