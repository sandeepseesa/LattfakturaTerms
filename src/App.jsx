import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Terms from './pages/Terms'
function App() {
  const [lang, setLang] = useState("English");


  return (
    <div className="App">
      {/* <div className="bg"></div>    */}
      <img className="bg" src="/lettf_assign2_bg.jpg" />
        <Navbar lang={lang} setLang={setLang} />
        <div>
          <Terms lang={lang} setLang={setLang} />

        </div>
     
    </div>
  )
}

export default App
