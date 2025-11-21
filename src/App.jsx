import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import Category from "./pages/Category"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Filter from "./pages/Filter"
import Login from "./pages/Login"

const App=()=>{
  return(
    <>
     <Toaster/>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root></Root>}></Route>
      <Route path="/dashboard" element={<Home></Home>}></Route>
      <Route path="/income" element={<Income></Income>}></Route>
      <Route path="/expense" element={<Expense></Expense>}></Route>
      <Route path="/category" element={<Category></Category>}></Route>
      <Route path="/filter" element={<Filter></Filter>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/filters" element={<Filter></Filter>}></Route>
    </Routes>
    </BrowserRouter>
    </>
    
   
  )
}

const Root=()=>{
  const isAuthenticated=localStorage.getItem("authToken")
  return isAuthenticated?(
    <Navigate to="/dashboard"></Navigate>
  ):(
     <Navigate to="/login"></Navigate>
  )
}

export default App