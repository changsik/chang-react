import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MainPage from "@pages/index"
// import AboutPage from "@pages/about"

import { RecoilRoot } from "recoil"

import MainPage from "@pages/index/index"
import BookmarkPage from "@/pages/bookmark/index"
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
          <Route path="/search/:id" element={<MainPage/>}></Route>
          <Route path="/bookmark" element={<BookmarkPage/>}></Route>
          <Route path="/firebase" element={<FirebaseAuth/>}></Route>
        </Routes>
      </BrowserRouter>    
    </RecoilRoot>
  )
}

export default App