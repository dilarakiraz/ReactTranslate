import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


//useState hooks yapısını kullanarak aşağıdaki durumları tutar.
//bu durumlar kullanıcının seçimlerini ve girdilerini takip etmemizi sağlar
//useEffect,uygulama başlangıcında ve options durumu değiştikçe apıden dilleri çeker.
function App() {

  const [options, setOptions] = useState([])
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    //curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    //axios kütüphanesi kullanılarak çeviri API'sine POST isteği yapılır. API yanıtı, output durumuna kaydedilir ve ekranda gösterilir.
    axios.post('https://libretranslate.de/translate', params,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        console.log(res.data)
        setOutput(res.data.translatedText)
      })
  }

  useEffect(() => {
    axios.get('https://libretranslate.de/languages',
      { headers: { 'accept': 'application/json' } }).then(res => {
        console.log(res.data);
        setOptions(res.data);
      })
  }, [])


  // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  return (
    <div className="App">
      <div className="select-container">
        <div className="select-box">
          <label htmlFor="from-select">From ({from}):</label>
          <select id="from-select" onChange={e => setFrom(e.target.value)}>
            {options.map(opt =>
              <option key={opt.code} value={opt.code}>{opt.name}</option>)}
          </select>
        </div>
        <div className="select-box">
          <label htmlFor="to-select">To ({to}):</label>
          <select id="to-select" onChange={e => setTo(e.target.value)}>
            {options.map(opt =>
              <option key={opt.code} value={opt.code}>{opt.name}</option>)}
          </select>
        </div>
   
      </div>
      <div className="text-area-container">
          <textarea
            className="text-area"
            cols="50"
            rows="8"
            placeholder="Enter text to translate..."
            value={input}
            onChange={e => setInput(e.target.value)}
          ></textarea>
          <textarea
            className="text-area"
            cols="50"
            rows="8"
            readOnly
            value={output}
          ></textarea>

        </div>
        <div className="button-container">
          <button onClick={e => translate()}>Translate</button>
        </div>
    </div>
  );
}

export default App;
