import { useState } from "react";
import {GetHourNow, GetLocationIp} from "./components/LocationData/LocationData";
import SearchCountry from "./components/CountryData/CountryData";
import './app.css'


function App() {

  const [countrySelected, setCountrySelected] = useState('')
  const [dataCountryVisible, setDataCountryVisible] = useState(false)

  function handleSearchCountry() {

    //sempre que clicar em pesquisar, vai começar como false
    //para caso fizer um busca bem sucedida e depois outra não.
    setDataCountryVisible(false)
    
    if (countrySelected) {
      setDataCountryVisible(true);
      return
    }
    alert('Digite o nome de um país')
  }

  return (
    <div className="App">
        <div className="container">
            <header className="header">
                <nav className="navHeader">
                  <img src="/globe.png" alt="globe" width={100}/>
                  <ul className="listNav">
                    <li>Buscar</li>
                    <li>Contato</li>
                    <li>Sobre</li>
                  </ul>
                </nav>
            </header>
            <div className="containerInput">
                <div className="mainInput">
                  <input 
                    type="text" 
                    name="country" 
                    id="country" 
                    placeholder="Country"
                    value={countrySelected}
                    onChange={(e) => setCountrySelected(e.target.value)}
                  />
                  <button type="submit" onClick={handleSearchCountry}>
                      Search
                  </button>
                </div>

                <div className="infosIP">
                  <GetHourNow/>
                  <GetLocationIp/>

                  
                  {/* controle para mostrar de primeira as informações */}
                  {dataCountryVisible === true ? (
                    <SearchCountry country={countrySelected} />
                  ):(
                    ''
                  )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
