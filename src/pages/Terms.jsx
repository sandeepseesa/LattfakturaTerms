import React, {useState, useEffect} from 'react'
import './Terms.css'
import axios from 'axios'
import TermsFormat from '../components/TermsFormat';

const Terms = ({lang, setLang}) => {
    const [ter, setTer] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        window.open('', '_self');  
  window.close(); 
  if(!window.close()){
    window.history.back()
  }
    }

    useEffect(()=>{
        getTerms();
    },[])

    const getTerms = async () => {
        try{
        const res = await axios.get('https://lattfaktura.onrender.com/te/getTerms');
        setTer(res.data);
        setLoading(true)
        console.log(res.data)
        } catch(error) {
            console.log(error.message);
        }
    }

  
const s = (ter && (lang == "English" ? ter.en_lang : ter.swe_lang)  || '');

  return (
    <div className="terms">
        <div className="te" >{lang == "English" ? "Terms" : "Villkor"}</div>
        <button className="close-button" onClick={() => handleClose()}>{ lang == "English" ? "Close and Go Back " : "Stäng och gå tillbaka"}</button>
             <div className='content'>
              {/* {loading ? sentences.map((s,i)=> (
               <p key={i} className="inner-text">{s}</p> 
            )) : <p>Loading...</p>} */}
            {loading ? <TermsFormat termsText={s}/> : <p>Loading...</p>}
            </div>
         <button className="close-button" onClick={() => handleClose()}>{ lang == "English" ? "Close and Go Back " : "Stäng och gå tillbaka"}</button>
    </div>
   
  )
}

export default Terms