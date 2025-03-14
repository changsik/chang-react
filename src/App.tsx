import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MainPage from "@pages/index"
// import AboutPage from "@pages/about"

import { RecoilRoot } from "recoil"

import MainPage from "@pages/index/index"
import FirebaseAuth from "@/pages/auth/FirebaseAuth"

function App() {
  // return  <BrowserRouter>
  //   <Routes>
  //     <Route index path="/" element={<MainPage/>}></Route>
  //     <Route index path="/about" element={<AboutPage/>}></Route>
  //   </Routes>
  // </BrowserRouter>
  return ( 
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage/>}></Route>
          <Route index path="/firebase" element={<FirebaseAuth/>}></Route>
        </Routes>
      </BrowserRouter>    
    </RecoilRoot>
  )
}

export default App