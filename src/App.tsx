import { useState } from "react";
import {GetHourNow, GetLocationIp} from "./components/LocationData";
import SearchCountry from "./components/CountryData";

function App() {

  const [countrySelected, setCountrySelected] = useState('')
  const [dataCountryVisible, setDataCountryVisible] = useState(false)

  function handleSearchCountry() {
      setDataCountryVisible(true);
  }

  return (
    <div className="App">
        <div className="container">
            <header className="header">
                <nav>
                  <ul>
                    <li>Buscar</li>
                    <li>Contato</li>
                    <li>Sobre</li>
                  </ul>
                </nav>

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

                
            </header>
        </div>
    </div>
  );
}

export default App;
