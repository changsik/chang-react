import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MainPage from "@pages/index"
// import AboutPage from "@pages/about"

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
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<MainPage/>}></Route>
      <Route index path="/firebase" element={<FirebaseAuth/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App