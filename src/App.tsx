
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Chatbot from "./assets/chatbot"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chatbot/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
